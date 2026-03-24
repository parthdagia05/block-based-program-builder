import { useMemo } from 'react';
import { BlockContainer } from './components/BlockContainer';
import { ValidationPanel } from './components/ValidationPanel';
import { createSampleProgram } from './core/sampleProgram';
import { validate } from './core/validator';
import './App.css';

const sampleProgram = createSampleProgram();

function App() {
  const errors = useMemo(() => validate(sampleProgram), []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MBv4 Program Builder</h1>
      </header>
      <main className="workspace">
        <BlockContainer blocks={sampleProgram} />
        <ValidationPanel errors={errors} />
      </main>
    </div>
  );
}

export default App;
