import React, { useState } from 'react';
import { PROBLEMS, CATEGORIES } from '../data/problems';
import { Card, Button } from './ui/common';
import { ArrowRight, Code2, Cpu, Clock, Boxes } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard({ onSelectProblem }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const categories = ["All", ...Object.values(CATEGORIES)];

    const filteredProblems = selectedCategory === "All"
        ? PROBLEMS
        : PROBLEMS.filter(p => p.category === selectedCategory);

    const isDark = theme === 'dark';

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white pb-20">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--color-accent-primary)] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.08]'} blur-[120px] rounded-full pointer-events-none`} />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className={`text-6xl md:text-7xl font-extrabold tracking-tight mb-6 ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500' : 'text-[var(--color-text-primary)]'}`}>
                            Master <span className="text-[var(--color-accent-primary)]">Algorithms</span>
                        </h1>
                        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            Visualize, understand, and conquer standard interview problems with
                            <span className="text-[var(--color-text-primary)] font-medium"> interactive step-by-step executions</span>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-6 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-2 justify-center min-w-max">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? isDark ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-accent-primary)] text-white'
                                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problems Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((problem) => (
                    <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            className={`h-full flex flex-col group hover:border-[var(--color-accent-primary)]/50 transition-all cursor-pointer relative overflow-hidden ${isDark ? '' : 'shadow-md hover:shadow-lg'}`}
                            onClick={() => onSelectProblem(problem)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-transparent ${isDark ? 'to-[var(--color-bg-tertiary)]' : 'to-[var(--color-accent-primary)]/5'} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${problem.difficulty === 'Easy' ? isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-300' :
                                                problem.difficulty === 'Medium' ? isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                                    isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-300'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${isDark ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'}`}>
                                            {problem.category}
                                        </span>
                                    </div>
                                    <Code2 size={20} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                                    {problem.title}
                                </h3>

                                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-6 flex-1">
                                    {problem.description}
                                </p>

                                <div className={`grid grid-cols-2 gap-2 mt-auto text-xs text-[var(--color-text-secondary)] font-mono ${isDark ? 'border-t border-[var(--color-border)]' : 'border-t border-[var(--color-border)]'} pt-4`}>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>Time: <span className="text-[var(--color-text-primary)]">{problem.timeComplexity}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Boxes size={14} />
                                        <span>Space: <span className="text-[var(--color-text-primary)]">{problem.spaceComplexity}</span></span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredProblems.length === 0 && (
                <div className="text-center py-20 text-[var(--color-text-secondary)]">
                    <p className="text-lg">No problems found in this category yet.</p>
                </div>
            )}
        </div>
    );
}
