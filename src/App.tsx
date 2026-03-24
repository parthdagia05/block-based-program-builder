import { BlockContainer } from './components/BlockContainer';
import { CodeOutput } from './components/CodeOutput';
import { ControlPanel } from './components/ControlPanel';
import { Toolbar } from './components/Toolbar';
import { ValidationPanel } from './components/ValidationPanel';
import { createSampleProgram, createInvalidSampleProgram } from './core/sampleProgram';
import { useProgram } from './hooks/useProgram';
import './App.css';

function App() {
  const { blocks, errors, invalidBlockIds, code, addRoot, addChild, remove, load, reset } =
    useProgram(createSampleProgram());

  return (
    <div className="app">
      <header className="app-header">
        <h1>MBv4 Program Builder</h1>
      </header>
      <main className="workspace">
        <ControlPanel
          onLoadValid={() => load(createSampleProgram())}
          onLoadInvalid={() => load(createInvalidSampleProgram())}
          onReset={reset}
        />
        <Toolbar onAdd={addRoot} />
        <div className="workspace__columns">
          <div className="workspace__blocks">
            <BlockContainer
              blocks={blocks}
              invalidBlockIds={invalidBlockIds}
              onAddChild={addChild}
              onRemove={remove}
            />
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
