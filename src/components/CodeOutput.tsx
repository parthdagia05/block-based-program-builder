import { useState } from 'react';
import './CodeOutput.css';

interface CodeOutputProps {
  code: string;
}

export function CodeOutput({ code }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="code-output">
      <div className="code-output__header">
        <span>Generated Code</span>
        <button className="code-output__copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="code-output__pre">{code}</pre>
    </div>
  );
}
