import { Block as BlockType } from '../types/block';
import { isContainerBlock } from '../core/blockConfig';
import { createExpression, createLoop, createVariable } from '../core/blockFactory';
import './Block.css';

interface BlockComponentProps {
  block: BlockType;
  depth?: number;
  onAddChild?: (parentId: string, child: BlockType) => void;
  onRemove?: (blockId: string) => void;
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

export function Block({ block, depth = 0, onAddChild, onRemove }: BlockComponentProps) {
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
        <span className="block__actions">
          {container && onAddChild && (
            <select
              className="block__add-select"
              value=""
              onChange={(e) => {
                const type = e.target.value;
                if (!type) return;
                let child: BlockType;
                switch (type) {
                  case 'loop':       child = createLoop(5); break;
                  case 'variable':   child = createVariable('x', 0); break;
                  default:           child = createExpression('move'); break;
                }
                onAddChild(block.id, child);
              }}
            >
              <option value="">+ child</option>
              <option value="expression">Expression</option>
              <option value="loop">Loop</option>
              <option value="variable">Variable</option>
            </select>
          )}
          {onRemove && (
            <button className="block__remove-btn" onClick={() => onRemove(block.id)}>
              ×
            </button>
          )}
        </span>
      </div>
      {container && (
        <div className="block__body">
          {hasChildren ? (
            block.children.map((child) => (
              <Block
                key={child.id}
                block={child}
                depth={depth + 1}
                onAddChild={onAddChild}
                onRemove={onRemove}
              />
            ))
          ) : (
            <span className="block__empty">empty</span>
          )}
        </div>
      )}
    </div>
  );
}
