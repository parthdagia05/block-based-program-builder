import { BlockContainer } from './components/BlockContainer';
import { CodeOutput } from './components/CodeOutput';
import { Toolbar } from './components/Toolbar';
import { ValidationPanel } from './components/ValidationPanel';
import { createSampleProgram } from './core/sampleProgram';
import { useProgram } from './hooks/useProgram';
import './App.css';

function App() {
  const { blocks, errors, code, addRoot, addChild, remove } = useProgram(createSampleProgram());

  return (
    <div className="app">
      <header className="app-header">
        <h1>MBv4 Program Builder</h1>
      </header>
      <main className="workspace">
        <Toolbar onAdd={addRoot} />
        <div className="workspace__columns">
          <div className="workspace__blocks">
            <BlockContainer blocks={blocks} onAddChild={addChild} onRemove={remove} />
            <ValidationPanel errors={errors} />
          </div>
          <div className="workspace__output">
            <CodeOutput code={code} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
