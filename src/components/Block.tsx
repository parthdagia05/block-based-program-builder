import { Block as BlockType } from '../types/block';
import { isContainerBlock } from '../core/blockConfig';
import './Block.css';

interface BlockComponentProps {
  block: BlockType;
  depth?: number;
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

export function Block({ block, depth = 0 }: BlockComponentProps) {
  const container = isContainerBlock(block.type);
  const hasChildren = block.children.length > 0;

  const classNames = [
    'block',
    `block--${block.type}`,
    container ? 'block--container' : 'block--leaf',
    `block--depth-${Math.min(depth, 4)}`,
  ].join(' ');

  return (
    <div className={classNames}>
      <div className="block__header">
        <span className="block__type">{block.type}</span>
        <span className="block__label">{getBlockLabel(block)}</span>
      </div>
      {container && (
        <div className="block__body">
          {hasChildren ? (
            block.children.map((child) => (
              <Block key={child.id} block={child} depth={depth + 1} />
            ))
          ) : (
            <span className="block__empty">empty</span>
          )}
        </div>
      )}
    </div>
  );
}
