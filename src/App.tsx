import { BlockContainer } from './components/BlockContainer';
import { Toolbar } from './components/Toolbar';
import { ValidationPanel } from './components/ValidationPanel';
import { createSampleProgram } from './core/sampleProgram';
import { useProgram } from './hooks/useProgram';
import './App.css';

function App() {
  const { blocks, errors, addRoot, addChild, remove } = useProgram(createSampleProgram());

  return (
    <div className="app">
      <header className="app-header">
        <h1>MBv4 Program Builder</h1>
      </header>
      <main className="workspace">
        <Toolbar onAdd={addRoot} />
        <BlockContainer blocks={blocks} onAddChild={addChild} onRemove={remove} />
        <ValidationPanel errors={errors} />
      </main>
    </div>
  );
}

export default App;
