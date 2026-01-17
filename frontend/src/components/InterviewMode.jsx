import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from './ui/common';
import { VisualizerEngine } from './VisualizerEngine';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, ArrowLeft, Loader2, AlertCircle, Settings } from 'lucide-react';

export function InterviewMode({ problem, onBack }) {
    const [logs, setLogs] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Default false, wait for user or auto-run
    const [error, setError] = useState(null);
    const timerRef = useRef(null);

    // Form State
    const [inputValues, setInputValues] = useState({});

    // Initialize inputs from default values
    useEffect(() => {
        if (problem?.inputs) {
            const defaults = {};
            problem.inputs.forEach(input => {
                defaults[input.name] = input.defaultValue;
            });
            setInputValues(defaults);
            // Auto-run on load with defaults
            handleRun(defaults);
        } else {
            handleRun({});
        }
    }, [problem.id]);

    // Speed constants
    const STEP_DELAY = 1000;

    const handleRun = async (values = inputValues) => {
        setIsLoading(true);
        setError(null);
        setIsPlaying(false);

        try {
            // Prepare inputs for API
            // For Two Sum specifically: target is first arg, then array elements
            // We need a way to map named inputs to command line args order.
            // For now, hardcode mapping for Two Sum or assume order in registry matches?
            // Let's rely on specific logic or assume inputs array order in registry maps to args order?
            // BETTER: Map generic values to a flat array based on `problem.inputs` order, 
            // but `two_sum.c` expects `target` then `nums`. 
            // In registry I put target first.

            let apiInputs = [];
            if (problem.inputs) {
                apiInputs = problem.inputs.flatMap(input => {
                    const val = values[input.name];
                    if (input.type === 'array') {
                        return val.split(',').map(s => s.trim()).filter(s => s !== "");
                    }
                    return [val];
                });
            }

            const response = await fetch(`http://localhost:3001/run/${problem.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputs: apiInputs })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Failed to execute: ${response.statusText}`);
            }

            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                // If it's empty, maybe just finished? Or error?
                // For visualization we generally expect steps.
                console.warn("No steps returned");
            }
            setLogs(data);
            setCurrentStep(0);

        } catch (err) {
            console.error("Run Error:", err);
            setError(err.message);
            setLogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isPlaying && !isLoading && !error && logs.length > 0) {
            timerRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < logs.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, STEP_DELAY);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, logs.length, isLoading, error]);

    const handleNext = () => {
        setIsPlaying(false);
        if (currentStep < logs.length - 1) setCurrentStep(c => c + 1);
    };

    const handlePrev = () => {
        setIsPlaying(false);
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleInputChange = (name, value) => {
        setInputValues(prev => ({ ...prev, [name]: value }));
    };

    if (!problem) return null;

    return (
        <div className="flex h-screen w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
            {/* Left Sidebar: Problem Info & Inputs */}
            <aside className="w-1/4 h-full border-r border-[var(--color-border)] flex flex-col bg-[var(--color-bg-secondary)]">
                <div className="p-6 pb-4 border-b border-[var(--color-border)]">
                    <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-sm text-[var(--color-text-secondary)] pl-0 gap-1 hover:bg-transparent hover:text-[var(--color-accent-primary)]">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Button>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        {problem.title}
                    </h1>
                    <div className="flex gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            {problem.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                            {problem.category}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-8">
                    {/* Description */}
                    <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                            {problem.description}
                        </p>
                    </div>

                    {/* Inputs Configuration */}
                    {problem.inputs && (
                        <div className="space-y-4 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)]">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                                <Settings size={14} />
                                Configuration
                            </div>

                            {problem.inputs.map(input => (
                                <div key={input.name} className="space-y-1.5">
                                    <label className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide font-medium ml-1">
                                        {input.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={inputValues[input.name] || ''}
                                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors font-mono"
                                    />
                                </div>
                            ))}

                            <Button
                                onClick={() => handleRun()}
                                disabled={isLoading}
                                className="w-full justify-center mt-2 bg-[var(--color-accent-primary)] hover:bg-blue-600 text-white border-0"
                            >
                                {isLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Play size={16} className="mr-2 fill-current" />}
                                Visualize
                            </Button>
                        </div>
                    )}

                    {/* Code Snippet */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Solution Code</h3>
                        <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs overflow-auto leading-relaxed">
                            <pre className="whitespace-pre">{problem.codeSnippet || "// Code coming soon..."}</pre>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area: Visualization */}
            <main className="flex-1 h-full flex flex-col relative bg-[var(--color-bg-primary)]">
                {/* Header / Toolbar */}
                <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-8 bg-[var(--color-bg-primary)]/80 backdrop-blur z-20">
                    <div className="flex items-center gap-4">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                                <span className="text-xs">Processing Algorithm...</span>
                            </div>
                        ) : error ? (
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertCircle size={16} />
                                <span className="text-xs text-red-400">Execution Error</span>
                            </div>
                        ) : (
                            <div className="font-mono text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] px-3 py-1 rounded-md border border-[var(--color-border)]">
                                Step <span className="text-white font-bold">{currentStep + 1}</span> / {logs.length}
                            </div>
                        )}
                    </div>
                </header>

                {/* Canvas */}
                <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#161b22] via-[#0f1115] to-[#0f1115] relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

                    <div className="z-10 w-full max-w-4xl flex items-center justify-center">
                        {isLoading ? (
                            <div className="text-center flex flex-col items-center gap-4">
                                <Loader2 size={48} className="animate-spin text-[var(--color-accent-primary)] opacity-50" />
                            </div>
                        ) : error ? (
                            <div className="max-w-md bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                                <h3 className="text-lg font-bold text-red-400 mb-2">Execution Failed</h3>
                                <p className="text-sm text-red-300/80 mb-4">{error}</p>
                            </div>
                        ) : (
                            <VisualizerEngine step={logs[currentStep]} />
                        )}
                    </div>
                </div>

                {/* Playback Controls */}
                <footer className="h-24 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-md flex items-center justify-center relative z-20">
                    <div className={`flex items-center gap-6 glass-panel px-8 py-3 rounded-2xl transition-opacity duration-300 ${isLoading || error || logs.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <Button variant="ghost" onClick={handleReset} title="Reset" className="hover:bg-white/10">
                            <RefreshCw size={20} />
                        </Button>
                        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="hover:bg-white/10">
                            <SkipBack size={24} fill="currentColor" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-2xl !p-0 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all text-white"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </Button>
                        <Button variant="ghost" onClick={handleNext} disabled={currentStep === logs.length - 1} className="hover:bg-white/10">
                            <SkipForward size={24} fill="currentColor" />
                        </Button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
