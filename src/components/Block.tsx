import { Block as BlockType } from '../types/block';
import './Block.css';

interface BlockComponentProps {
  block: BlockType;
}

function getBlockLabel(block: BlockType): string {
  switch (block.type) {
    case 'function':
      return `function ${block.props.name ?? ''}`;
    case 'loop':
      return `loop (${block.props.count ?? '?'})`;
    case 'variable':
      return `var ${block.props.name} = ${block.props.value}`;
    case 'literal':
      return `${block.props.value}`;
    case 'expression':
      return `${block.props.operator ?? 'expr'}`;
  }
}

export function Block({ block }: BlockComponentProps) {
  const hasChildren = block.children.length > 0;

  return (
    <div className={`block block--${block.type}`}>
      <div className="block__header">
        <span className="block__type">{block.type}</span>
        <span className="block__label">{getBlockLabel(block)}</span>
      </div>
      {hasChildren && (
        <div className="block__children">
          {block.children.map((child) => (
            <Block key={child.id} block={child} />
          ))}
        </div>
      )}
    </div>
  );
}
