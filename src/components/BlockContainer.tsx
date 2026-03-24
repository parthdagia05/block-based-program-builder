import { Block as BlockModel } from '../types/block';
import { Block } from './Block';

interface BlockContainerProps {
  blocks: BlockModel[];
  invalidBlockIds?: Set<string>;
  onAddChild?: (parentId: string, child: BlockModel) => void;
  onRemove?: (blockId: string) => void;
}

export function BlockContainer({ blocks, invalidBlockIds, onAddChild, onRemove }: BlockContainerProps) {
  if (blocks.length === 0) {
    return <p className="empty-message">No blocks yet. Start building your program!</p>;
  }

  return (
    <div className="block-container">
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          invalidBlockIds={invalidBlockIds}
          onAddChild={onAddChild}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
