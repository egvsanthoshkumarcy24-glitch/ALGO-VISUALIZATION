const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Configuration
const EXECUTION_TIMEOUT = 5000; // 5 seconds max execution time
const MAX_INPUT_LENGTH = 1000; // Maximum characters per input
const MAX_INPUTS = 100; // Maximum number of inputs

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Path to the build directory where C executables are located
const BUILD_DIR = path.join(__dirname, 'build');

// Input validation helper
function validateInputs(inputs) {
    if (!Array.isArray(inputs)) {
        return { valid: false, error: 'Inputs must be an array' };
    }
    
    if (inputs.length === 0) {
        return { valid: false, error: 'Please provide input values. The input cannot be empty.' };
    }
    
    if (inputs.length > MAX_INPUTS) {
        return { valid: false, error: `Too many inputs. Maximum ${MAX_INPUTS} allowed.` };
    }
    
    for (let i = 0; i < inputs.length; i++) {
        const input = String(inputs[i]);
        if (input.length > MAX_INPUT_LENGTH) {
            return { valid: false, error: `Input ${i + 1} is too long. Maximum ${MAX_INPUT_LENGTH} characters.` };
        }
    }
    
    return { valid: true };
}

app.post('/run/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;
    const inputs = req.body.inputs || [];

    // Sanitize input to prevent command injection (alphanumeric and hyphens only)
    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm name" });
    }

    // Validate inputs
    const validation = validateInputs(inputs);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }

    const executablePath = path.join(BUILD_DIR, algorithm);

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Construct command with arguments
    // Ensure inputs are safe: basic sanitization (only numbers for now for Two Sum)
    // In a production app, robust sanitization is needed.
    const safeInputs = inputs.map(arg => String(arg).replace(/[^a-zA-Z0-9\-\s,()[\]{}]/g, ''));
    const args = safeInputs.map(arg => `"${arg}"`).join(' ');

    // Execute the C program with timeout
    const child = exec(`${executablePath} ${args}`, {
        timeout: EXECUTION_TIMEOUT,
        maxBuffer: 1024 * 1024 // 1MB buffer
    }, (error, stdout, stderr) => {
        if (error) {
            if (error.killed) {
                return res.status(408).json({ 
                    error: "Execution timeout",
                    details: `Algorithm took longer than ${EXECUTION_TIMEOUT / 1000} seconds.`
                });
            }
            console.error(`Error executing ${algorithm}:`, error);
            console.error(`Stderr:`, stderr);
            return res.status(500).json({ error: "Execution failed", details: stderr });
        }

        try {
            const steps = JSON.parse(stdout);
            res.json(steps);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Stdout:", stdout);
            res.status(500).json({
                error: "Failed to parse algorithm output",
                details: "Output was not valid JSON",
                rawOutput: stdout
            });
        }
    });
});

// Original GET handler for backwards compatibility or simple runs
app.get('/run/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;
    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm name" });
    }


    const executablePath = path.join(BUILD_DIR, algorithm);

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Execute the C program
    exec(executablePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ${algorithm}:`, error);
            return res.status(500).json({ error: "Execution failed", details: stderr });
        }

        try {
            // The C program should output valid JSON to stdout
            const steps = JSON.parse(stdout);
            res.json(steps);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Stdout:", stdout);
            res.status(500).json({
                error: "Failed to parse algorithm output",
                details: "Output was not valid JSON",
                rawOutput: stdout
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
