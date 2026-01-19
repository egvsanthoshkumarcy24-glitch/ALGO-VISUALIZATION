import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from './ui/common';
import { VisualizerEngine } from './VisualizerEngine';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, ArrowLeft, Loader2, AlertCircle, Settings, Clock, Boxes, Code, ChevronDown, ChevronUp, Gauge } from 'lucide-react';

export function InterviewMode({ problem, onBack }) {
    const [logs, setLogs] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [speed, setSpeed] = useState(1); // 1x speed by default
    const [showFullCode, setShowFullCode] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });
    const timerRef = useRef(null);

    // Form State
    const [inputValues, setInputValues] = useState({});

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const isDark = theme === 'dark';

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

    useEffect(() => {
        if (isPlaying && !isLoading && !error && logs.length > 0) {
            const delay = 1000 / speed; // Speed multiplier affects delay
            timerRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < logs.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, delay);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, logs.length, isLoading, error, speed]);

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
                    <h1 className={`text-2xl font-bold ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500' : 'text-[var(--color-accent-primary)]'} mb-2`}>
                        {problem.title}
                    </h1>
                    <div className="flex gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${problem.difficulty === 'Easy' ? isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-300' :
                                problem.difficulty === 'Medium' ? isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                    isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-300'
                            }`}>
                            {problem.difficulty}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${isDark ? 'bg-[var(--color-bg-tertiary)]' : 'bg-[var(--color-bg-tertiary)]'} text-[var(--color-text-secondary)] border border-[var(--color-border)]`}>
                            {problem.category}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-8">
                    {/* Complexity Info */}
                    <div className={`${isDark ? 'bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)]' : 'bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-accent-primary)]/5'} p-4 rounded-xl border border-[var(--color-border)] space-y-3`}>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">Complexity Analysis</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Time</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{problem.timeComplexity || "N/A"}</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Boxes size={14} className={isDark ? "text-purple-400" : "text-purple-600"} />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Space</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{problem.spaceComplexity || "N/A"}</span>
                            </div>
                        </div>
                    </div>

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
                        <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs overflow-auto leading-relaxed max-h-48">
                            <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.codeSnippet || "// Code coming soon..."}</pre>
                        </div>
                    </div>

                    {/* Full Implementation (Collapsible) */}
                    {problem.fullCode && (
                        <div>
                            <button
                                onClick={() => setShowFullCode(!showFullCode)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2 hover:text-[var(--color-accent-primary)] transition-colors"
                            >
                                <Code size={14} />
                                Full C Implementation
                                {showFullCode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {showFullCode && (
                                <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-accent-primary)]/30 font-mono text-xs overflow-auto leading-relaxed max-h-96">
                                    <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.fullCode}</pre>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Complexity Analysis */}
                    {(problem.timeComplexity || problem.spaceComplexity) && (
                        <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)]">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
                                <Clock size={14} />
                                Complexity Analysis
                            </h3>
                            <div className="space-y-2 text-sm">
                                {problem.timeComplexity && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[var(--color-text-secondary)]">Time:</span>
                                        <code className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded text-[var(--color-accent-primary)] font-mono font-bold">{problem.timeComplexity}</code>
                                    </div>
                                )}
                                {problem.spaceComplexity && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[var(--color-text-secondary)]">Space:</span>
                                        <code className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded text-[var(--color-accent-cyan)] font-mono font-bold">{problem.spaceComplexity}</code>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Beginner's Guide */}
                    <div className="bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-[var(--color-accent-secondary)]/10 p-4 rounded-xl border border-[var(--color-accent-primary)]/20">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-primary)] mb-2 flex items-center gap-2">
                            <Boxes size={14} />
                            Beginner's Tip
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            Watch the visualization step-by-step to understand how the algorithm works. 
                            Use the speed controls to slow down or speed up the execution. 
                            Variables and array states are shown in real-time!
                        </p>
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
                                Step <span className={isDark ? "text-white" : "text-[var(--color-text-primary)]"} >{currentStep + 1}</span> / {logs.length}
                            </div>
                        )}
                    </div>
                </header>

                {/* Canvas */}
                <div className={`flex-1 p-8 flex items-center justify-center ${isDark ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#161b22] via-[#0f1115] to-[#0f1115]' : 'bg-gradient-to-br from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]'} relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'} pointer-events-none`}></div>

                    <div className="z-10 w-full max-w-4xl flex items-center justify-center">
                        {isLoading ? (
                            <div className="text-center flex flex-col items-center gap-4">
                                <Loader2 size={48} className="animate-spin text-[var(--color-accent-primary)] opacity-50" />
                            </div>
                        ) : error ? (
                            <div className={`max-w-md ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-xl p-6 text-center`}>
                                <h3 className={`text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-700'} mb-2`}>Execution Failed</h3>
                                <p className={`text-sm ${isDark ? 'text-red-300/80' : 'text-red-600'} mb-4`}>{error}</p>
                            </div>
                        ) : (
                            <VisualizerEngine step={logs[currentStep]} />
                        )}
                    </div>
                </div>

                {/* Playback Controls */}
                <footer className="h-24 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-md flex items-center justify-center gap-8 relative z-20">
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
                            className="w-16 h-16 rounded-2xl !p-0 flex items-center justify-center text-white shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </Button>
                        <Button variant="ghost" onClick={handleNext} disabled={currentStep === logs.length - 1} className="hover:bg-white/10">
                            <SkipForward size={24} fill="currentColor" />
                        </Button>
                    </div>
                    
                    {/* Speed Control */}
                    <div className={`flex flex-col gap-2 glass-panel px-6 py-3 rounded-2xl transition-opacity duration-300 ${isLoading || error || logs.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <div className="flex items-center gap-3">
                            <Gauge size={16} className="text-[var(--color-accent-primary)]" />
                            <span className="text-xs text-[var(--color-text-secondary)] font-medium min-w-[60px]">Speed: {speed}x</span>
                            <input
                                type="range"
                                min="0.25"
                                max="3"
                                step="0.25"
                                value={speed}
                                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                className="w-32 h-2 bg-[var(--color-bg-tertiary)] rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, var(--color-accent-primary) 0%, var(--color-accent-primary) ${((speed - 0.25) / 2.75) * 100}%, var(--color-bg-tertiary) ${((speed - 0.25) / 2.75) * 100}%, var(--color-bg-tertiary) 100%)`
                                }}
                            />
                        </div>
                        <div className="flex gap-1 text-[9px] text-[var(--color-text-tertiary)] justify-center">
                            <button onClick={() => setSpeed(0.5)} className="px-2 py-0.5 hover:text-[var(--color-accent-primary)] transition-colors">0.5x</button>
                            <button onClick={() => setSpeed(1)} className="px-2 py-0.5 hover:text-[var(--color-accent-primary)] transition-colors">1x</button>
                            <button onClick={() => setSpeed(1.5)} className="px-2 py-0.5 hover:text-[var(--color-accent-primary)] transition-colors">1.5x</button>
                            <button onClick={() => setSpeed(2)} className="px-2 py-0.5 hover:text-[var(--color-accent-primary)] transition-colors">2x</button>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
