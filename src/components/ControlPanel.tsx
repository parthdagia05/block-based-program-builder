import './ControlPanel.css';

interface ControlPanelProps {
  onLoadValid: () => void;
  onLoadInvalid: () => void;
  onReset: () => void;
}

export function ControlPanel({ onLoadValid, onLoadInvalid, onReset }: ControlPanelProps) {
  return (
    <div className="control-panel">
      <span className="control-panel__label">Program:</span>
      <button className="control-panel__btn control-panel__btn--valid" onClick={onLoadValid}>
        Load Valid Program
      </button>
      <button className="control-panel__btn control-panel__btn--invalid" onClick={onLoadInvalid}>
        Load Invalid Program
      </button>
      <button className="control-panel__btn control-panel__btn--reset" onClick={onReset}>
        Reset Program
      </button>
    </div>
  );
}
