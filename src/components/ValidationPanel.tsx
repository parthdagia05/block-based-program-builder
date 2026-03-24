import { ValidationError } from '../core/validator';
import './ValidationPanel.css';

interface ValidationPanelProps {
  errors: ValidationError[];
}

export function ValidationPanel({ errors }: ValidationPanelProps) {
  if (errors.length === 0) {
    return (
      <div className="validation-panel validation-panel--ok">
        No errors found.
      </div>
    );
  }

  return (
    <div className="validation-panel validation-panel--errors">
      <strong>{errors.length} error{errors.length > 1 ? 's' : ''} found:</strong>
      <ul>
        {errors.map((error, i) => (
          <li key={`${error.blockId}-${i}`}>
            <code>{error.blockId}</code>: {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
