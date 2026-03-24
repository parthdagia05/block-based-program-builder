import { Block } from '../types/block';
import {
  createFunction,
  createLoop,
  createVariable,
  createExpression,
} from '../core/blockFactory';
import './Toolbar.css';

interface ToolbarProps {
  onAdd: (block: Block) => void;
}

const blockPresets: { label: string; create: () => Block }[] = [
  { label: '+ Function',   create: () => createFunction('myFunction') },
  { label: '+ Loop',       create: () => createLoop(5) },
  { label: '+ Variable',   create: () => createVariable('x', 0) },
  { label: '+ Expression', create: () => createExpression('move') },
];

export function Toolbar({ onAdd }: ToolbarProps) {
  return (
    <div className="toolbar">
      <span className="toolbar__label">Add block:</span>
      {blockPresets.map((preset) => (
        <button
          key={preset.label}
          className="toolbar__btn"
          onClick={() => onAdd(preset.create())}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
