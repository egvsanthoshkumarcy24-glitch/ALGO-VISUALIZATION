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

                <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                            What does this algorithm do?
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {problem.description}
                        </p>
                        <div className="bg-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/30 rounded-lg p-3">
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
                                <span className="text-[var(--color-accent-cyan)] text-sm">ℹ️</span>
                                <span>
                                    {problem.id === 'bubble_sort' && "Great for beginners! Bubble sort is simple to understand but slow for large datasets. Best used for teaching purposes."}
                                    {problem.id === 'merge_sort' && "One of the most efficient sorting algorithms! Always runs in O(n log n) time, making it reliable for large datasets."}
                                    {problem.id === 'quick_sort' && "The most popular sorting algorithm! Usually very fast, though worst-case performance can be slow with poor pivot choices."}
                                    {problem.id === 'binary_search' && "Incredibly fast search! Works only on sorted arrays but finds elements in logarithmic time - perfect for large datasets."}
                                    {(problem.id === 'bfs' || problem.id === 'dfs') && `${problem.id === 'bfs' ? 'BFS' : 'DFS'} is fundamental for graph problems! Used in pathfinding, social networks, web crawlers, and more.`}
                                    {!['bubble_sort', 'merge_sort', 'quick_sort', 'binary_search', 'bfs', 'dfs'].includes(problem.id) && "Understanding this algorithm will help you solve many real-world programming problems!"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Complexity Info */}
                    <div className={`${isDark ? 'bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)]' : 'bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-accent-primary)]/5'} p-4 rounded-xl border border-[var(--color-border)] space-y-3`}>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">⚡ Performance</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Time</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{problem.timeComplexity || "N/A"}</span>
                                <span className="text-[9px] text-[var(--color-text-tertiary)] mt-1">How fast it runs</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Boxes size={14} className={isDark ? "text-purple-400" : "text-purple-600"} />
                                    <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">Space</span>
                                </div>
                                <span className={`text-sm font-mono font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{problem.spaceComplexity || "N/A"}</span>
                                <span className="text-[9px] text-[var(--color-text-tertiary)] mt-1">Memory needed</span>
                            </div>
                        </div>
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
                                className="w-full justify-center mt-2 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white border-0"
                            >
                                {isLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Play size={16} className="mr-2 fill-current" />}
                                Visualize
                            </Button>
                        </div>
                    )}

                    {/* Code Snippet */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                            <Code size={16} className="text-[var(--color-accent-primary)]" />
                            Core Algorithm
                        </h3>
                        <p className="text-xs text-[var(--color-text-tertiary)]">Main function that implements the logic</p>
                        <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs overflow-auto leading-relaxed max-h-48">
                            <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.codeSnippet || "// Code coming soon..."}</pre>
                        </div>
                    </div>

                    {/* Full Implementation (Collapsible) */}
                    {problem.fullCode && (
                        <div className="space-y-2">
                            <button
                                onClick={() => setShowFullCode(!showFullCode)}
                                className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors w-full"
                            >
                                <Code size={16} className="text-[var(--color-accent-secondary)]" />
                                Complete Implementation
                                <span className="text-xs text-[var(--color-text-tertiary)] ml-auto mr-2">(with helper functions)</span>
                                {showFullCode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {showFullCode && (
                                <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-accent-primary)]/30 font-mono text-xs overflow-auto leading-relaxed max-h-96">
                                    <pre className="whitespace-pre text-[var(--color-text-primary)]">{problem.fullCode}</pre>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Beginner's Guide */}
                    <div className="bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-[var(--color-accent-secondary)]/10 p-5 rounded-xl border border-[var(--color-accent-primary)]/30 space-y-3">
                        <h3 className="text-sm font-bold tracking-wide text-[var(--color-accent-primary)] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                            </svg>
                            How to Use This Visualizer
                        </h3>
                        <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-[var(--color-accent-green)] font-bold">①</span>
                                <span><strong className="text-[var(--color-text-primary)]">Configure inputs</strong> above and click "Visualize"</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[var(--color-accent-green)] font-bold">②</span>
                                <span><strong className="text-[var(--color-text-primary)]">Watch step-by-step</strong> - each step shows what the algorithm is doing</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[var(--color-accent-green)] font-bold">③</span>
                                <span><strong className="text-[var(--color-text-primary)]">Adjust speed</strong> using the slider below (slower = easier to follow)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[var(--color-accent-green)] font-bold">④</span>
                                <span><strong className="text-[var(--color-text-primary)]">Highlighted elements</strong> show what's being compared or changed</span>
                            </li>
                        </ul>
                        <div className="pt-2 border-t border-[var(--color-accent-primary)]/20">
                            <p className="text-xs text-[var(--color-accent-cyan)] font-medium">💡 Tip: Try running with small arrays first to understand the pattern!</p>
                        </div>
                    </div>

                    {/* Key Concepts - Algorithm Specific */}
                    <div className="bg-gradient-to-br from-[var(--color-accent-pink)]/5 to-[var(--color-accent-cyan)]/5 p-5 rounded-xl border-2 border-[var(--color-accent-pink)]/30 space-y-3">
                        <h3 className="text-sm font-bold tracking-wide text-[var(--color-accent-pink)] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            What to Watch For
                        </h3>
                        <div className="space-y-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            {problem.id === 'bubble_sort' && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🔄</span>
                                        <span><strong>Multiple passes:</strong> Notice how the algorithm makes several passes through the array</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">⬆️</span>
                                        <span><strong>Bubbling up:</strong> Watch how the largest element "bubbles" to the end in each pass</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🔁</span>
                                        <span><strong>Adjacent comparisons:</strong> Elements are only compared with their immediate neighbors</span>
                                    </p>
                                </>
                            )}
                            {problem.id === 'merge_sort' && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">✂️</span>
                                        <span><strong>Divide phase:</strong> Watch how the array splits into smaller and smaller pieces</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🔀</span>
                                        <span><strong>Merge phase:</strong> See how sorted pieces combine back together in order</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">📊</span>
                                        <span><strong>Recursion tree:</strong> Each level represents a recursion depth (splits then merges)</span>
                                    </p>
                                </>
                            )}
                            {problem.id === 'quick_sort' && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🎯</span>
                                        <span><strong>Pivot selection:</strong> One element is chosen as the "pivot" (usually the last element)</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">⚖️</span>
                                        <span><strong>Partitioning:</strong> Elements smaller than pivot go left, larger go right</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🔄</span>
                                        <span><strong>Recursive sorting:</strong> Each partition is then sorted the same way</span>
                                    </p>
                                </>
                            )}
                            {problem.id === 'binary_search' && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">📍</span>
                                        <span><strong>Middle element:</strong> Always check the middle element first</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">✂️</span>
                                        <span><strong>Halving:</strong> Search space is cut in half after each comparison</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">⚡</span>
                                        <span><strong>Speed advantage:</strong> Notice how few steps it takes compared to linear search</span>
                                    </p>
                                </>
                            )}
                            {(problem.id === 'bfs' || problem.id === 'dfs') && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🌳</span>
                                        <span><strong>Traversal order:</strong> Watch the sequence nodes are visited</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🎯</span>
                                        <span><strong>Discovery:</strong> Notice when each node is first discovered vs fully explored</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">📊</span>
                                        <span><strong>{problem.id === 'bfs' ? 'Level by level' : 'Depth first'}:</strong> {problem.id === 'bfs' ? 'Goes through all neighbors before going deeper' : 'Goes as deep as possible before backtracking'}</span>
                                    </p>
                                </>
                            )}
                            {!['bubble_sort', 'merge_sort', 'quick_sort', 'binary_search', 'bfs', 'dfs'].includes(problem.id) && (
                                <>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">👀</span>
                                        <span><strong>Watch carefully:</strong> Observe how elements are compared and moved</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">🔍</span>
                                        <span><strong>Pattern recognition:</strong> Try to identify the strategy the algorithm uses</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-pink)] font-bold">⏸️</span>
                                        <span><strong>Use pause:</strong> Pause at any step to study what's happening</span>
                                    </p>
                                </>
                            )}
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
                                Step <span className="text-[var(--color-text-primary)]">{currentStep + 1}</span> / {logs.length}
                            </div>
                        )}
                    </div>
                </header>

                {/* Canvas */}
                <div className={`flex-1 p-8 flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] relative overflow-hidden`}>
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
                        <Button variant="ghost" onClick={handleReset} title="Reset" className="hover:bg-[var(--color-bg-tertiary)]">
                            <RefreshCw size={20} />
                        </Button>
                        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="hover:bg-[var(--color-bg-tertiary)]">
                            <SkipBack size={24} fill="currentColor" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-2xl !p-0 flex items-center justify-center text-white shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </Button>
                        <Button variant="ghost" onClick={handleNext} disabled={currentStep === logs.length - 1} className="hover:bg-[var(--color-bg-tertiary)]">
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
