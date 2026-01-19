import React, { useState, useEffect } from 'react';
import { Button } from './ui/common';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Tutorial steps for each algorithm
const TUTORIALS = {
    bubble_sort: {
        title: "Bubble Sort Tutorial",
        steps: [
            {
                title: "Welcome to Bubble Sort!",
                content: "Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly comparing adjacent elements and swapping them if they're in the wrong order.",
                highlight: "description",
                checkpoint: "Do you understand what adjacent elements means?"
            },
            {
                title: "How It Works",
                content: "The algorithm makes multiple passes through the array. In each pass, the largest unsorted element 'bubbles up' to its correct position at the end.",
                highlight: "visualization",
                checkpoint: "Can you see how elements move in pairs?"
            },
            {
                title: "Watch the First Pass",
                content: "Click 'Visualize' and watch the first pass. Notice how the algorithm compares each pair of adjacent elements from left to right.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see elements being compared?"
            },
            {
                title: "Observe the Pattern",
                content: "Use the speed slider to slow down the animation. Watch how after each pass, one more element is in its final sorted position at the end.",
                highlight: "speed",
                checkpoint: "Can you identify which element is sorted after each pass?"
            },
            {
                title: "Time Complexity",
                content: "Bubble Sort has O(n²) time complexity because it needs nested loops. It's great for learning but not efficient for large datasets.",
                highlight: "complexity",
                checkpoint: "Do you understand why it's O(n²)?"
            }
        ]
    },
    merge_sort: {
        title: "Merge Sort Tutorial",
        steps: [
            {
                title: "Welcome to Merge Sort!",
                content: "Merge Sort is a divide-and-conquer algorithm. It splits the array into smaller pieces, sorts them, then merges them back together.",
                highlight: "description",
                checkpoint: "Do you understand the divide-and-conquer strategy?"
            },
            {
                title: "The Divide Phase",
                content: "First, the algorithm recursively divides the array into halves until each piece has only one element. Single elements are already sorted!",
                highlight: "visualization",
                checkpoint: "Can you visualize the splitting process?"
            },
            {
                title: "Watch the Visualization",
                content: "Click 'Visualize' and observe how the array splits. Use the step controls to move forward and backward through the process.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the array being divided?"
            },
            {
                title: "The Merge Phase",
                content: "After dividing, pairs of sorted subarrays are merged together in order. This is where the actual sorting happens!",
                highlight: "visualization",
                checkpoint: "Can you see how sorted pieces combine?"
            },
            {
                title: "Efficiency",
                content: "Merge Sort always runs in O(n log n) time, making it much faster than Bubble Sort for large datasets. The trade-off is it needs O(n) extra space.",
                highlight: "complexity",
                checkpoint: "Do you understand the time/space trade-off?"
            }
        ]
    },
    binary_search: {
        title: "Binary Search Tutorial",
        steps: [
            {
                title: "Welcome to Binary Search!",
                content: "Binary Search is incredibly fast but requires a SORTED array. It finds elements by repeatedly halving the search space.",
                highlight: "description",
                checkpoint: "Do you understand why the array must be sorted?"
            },
            {
                title: "The Middle Element",
                content: "The algorithm always checks the middle element first. If it's your target, done! If not, you can eliminate half the array.",
                highlight: "visualization",
                checkpoint: "Can you see the advantage of starting in the middle?"
            },
            {
                title: "Watch It Work",
                content: "Set a target value and click 'Visualize'. Watch how the search space shrinks by half with each comparison.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you observe the halving behavior?"
            },
            {
                title: "Left or Right?",
                content: "If the target is smaller than the middle, search the left half. If larger, search the right half. Simple decision, huge impact!",
                highlight: "visualization",
                checkpoint: "Can you predict which half will be searched?"
            },
            {
                title: "Logarithmic Speed",
                content: "O(log n) means doubling the array size only adds one more step. In an array of 1 million items, Binary Search finds any element in ~20 steps!",
                highlight: "complexity",
                checkpoint: "Do you appreciate how fast logarithmic time is?"
            }
        ]
    }
};

export function GuidedTutorial({ algorithm, onClose, onAction }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [showCheckpoint, setShowCheckpoint] = useState(false);
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

    const isDark = theme === 'dark';
    const tutorial = TUTORIALS[algorithm?.id];

    if (!tutorial) return null;

    const currentStepData = tutorial.steps[currentStep];
    const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

    const handleNext = () => {
        if (currentStepData.action && onAction) {
            onAction(currentStepData.action);
        }
        if (currentStep < tutorial.steps.length - 1) {
            setCompletedSteps(new Set([...completedSteps, currentStep]));
            setCurrentStep(currentStep + 1);
            setShowCheckpoint(false);
        } else {
            // Tutorial complete
            setCompletedSteps(new Set([...completedSteps, currentStep]));
            setShowCheckpoint(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setShowCheckpoint(false);
        }
    };

    const handleCheckpoint = (understood) => {
        if (understood) {
            handleNext();
        } else {
            setShowCheckpoint(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                role="dialog"
                aria-labelledby="tutorial-title"
                aria-modal="true"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`max-w-2xl w-full mx-4 rounded-2xl shadow-2xl ${
                        isDark ? 'bg-[var(--color-bg-secondary)]' : 'bg-white'
                    } border border-[var(--color-border)]`}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-[var(--color-accent-primary)]" size={24} />
                            <h2 id="tutorial-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                                {tutorial.title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                            aria-label="Close tutorial"
                        >
                            <X size={20} className="text-[var(--color-text-secondary)]" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-[var(--color-text-secondary)]">
                                Step {currentStep + 1} of {tutorial.steps.length}
                            </span>
                        </div>
                        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                                {currentStepData.title}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                {currentStepData.content}
                            </p>

                            {/* Checkpoint Question */}
                            {currentStepData.checkpoint && showCheckpoint && (
                                <div className={`p-4 rounded-lg border-2 ${
                                    isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-300'
                                }`}>
                                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                                        ✓ Checkpoint: {currentStepData.checkpoint}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            onClick={() => handleCheckpoint(true)}
                                            className="flex-1"
                                        >
                                            Yes, I understand
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleCheckpoint(false)}
                                            className="flex-1"
                                        >
                                            Let me review
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Step Indicators */}
                        <div className="flex gap-2 mt-6">
                            {tutorial.steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-1 h-1 rounded-full transition-all ${
                                        completedSteps.has(idx)
                                            ? 'bg-[var(--color-accent-green)]'
                                            : idx === currentStep
                                            ? 'bg-[var(--color-accent-primary)]'
                                            : 'bg-[var(--color-bg-tertiary)]'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-[var(--color-border)] flex justify-between">
                        <Button
                            variant="ghost"
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="gap-2"
                        >
                            <ArrowLeft size={16} />
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (currentStepData.checkpoint && !showCheckpoint) {
                                    setShowCheckpoint(true);
                                } else {
                                    handleNext();
                                }
                            }}
                            className="gap-2"
                        >
                            {currentStep === tutorial.steps.length - 1 ? (
                                <>
                                    Complete <CheckCircle size={16} />
                                </>
                            ) : (
                                <>
                                    Next <ArrowRight size={16} />
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
