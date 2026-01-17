const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Path to the build directory where C executables are located
const BUILD_DIR = path.join(__dirname, 'build');

app.post('/run/:algorithm', (req, res) => {
    const algorithm = req.params.algorithm;
    const inputs = req.body.inputs || [];

    // Sanitize input to prevent command injection (alphanumeric and hyphens only)
    if (!/^[a-z0-9_-]+$/i.test(algorithm)) {
        return res.status(400).json({ error: "Invalid algorithm name" });
    }

    const executablePath = path.join(BUILD_DIR, `${algorithm}.exe`);

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Construct command with arguments
    // Ensure inputs are safe: basic sanitization (only numbers for now for Two Sum)
    // In a production app, robust sanitization is needed.
    const safeInputs = inputs.map(arg => String(arg).replace(/[^a-zA-Z0-9\-\s,()[\]{}]/g, ''));
    const args = safeInputs.map(arg => `"${arg}"`).join(' ');

    // Execute the C program
    exec(`"${executablePath}" ${args}`, (error, stdout, stderr) => {
        if (error) {
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


    const executablePath = path.join(BUILD_DIR, `${algorithm}.exe`);

    // Check if executable exists
    if (!fs.existsSync(executablePath)) {
        return res.status(404).json({ error: `Algorithm '${algorithm}' not found or not compiled.` });
    }

    // Execute the C program
    exec(`"${executablePath}"`, (error, stdout, stderr) => {
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
