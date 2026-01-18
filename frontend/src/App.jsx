import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { InterviewMode } from './components/InterviewMode';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to dark
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {selectedProblem ? (
        <InterviewMode
          problem={selectedProblem}
          onBack={() => setSelectedProblem(null)}
        />
      ) : (
        <Dashboard onSelectProblem={setSelectedProblem} />
      )}
    </>
  );
}

export default App;
