import { Block as BlockModel } from '../types/block';
import { Block } from './Block';

interface BlockContainerProps {
  blocks: BlockModel[];
  onAddChild?: (parentId: string, child: BlockModel) => void;
  onRemove?: (blockId: string) => void;
}

export function BlockContainer({ blocks, onAddChild, onRemove }: BlockContainerProps) {
  if (blocks.length === 0) {
    return <p className="empty-message">No blocks yet. Start building your program!</p>;
  }

  return (
    <div className="block-container">
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onAddChild={onAddChild}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
