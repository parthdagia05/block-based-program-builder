import { BlockContainer } from './components/BlockContainer';
import { createSampleProgram } from './core/sampleProgram';
import './App.css';

const sampleProgram = createSampleProgram();

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>MBv4 Program Builder</h1>
      </header>
      <main className="workspace">
        <BlockContainer blocks={sampleProgram} />
      </main>
    </div>
  );
}

export default App;
