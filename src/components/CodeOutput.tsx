import './CodeOutput.css';

interface CodeOutputProps {
  code: string;
}

export function CodeOutput({ code }: CodeOutputProps) {
  return (
    <div className="code-output">
      <div className="code-output__header">Generated Code</div>
      <pre className="code-output__pre">{code}</pre>
    </div>
  );
}
