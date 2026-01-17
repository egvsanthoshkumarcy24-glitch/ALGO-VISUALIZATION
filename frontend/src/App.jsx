import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { InterviewMode } from './components/InterviewMode';

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <>
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
