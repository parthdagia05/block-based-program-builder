import { useCallback, useMemo, useState } from 'react';
import { Block } from '../types/block';
import { generate } from '../core/codegen';
import { validate, ValidationError } from '../core/validator';

function addChildToBlock(blocks: Block[], parentId: string, child: Block): Block[] {
  return blocks.map((block) => {
    if (block.id === parentId) {
      return { ...block, children: [...block.children, child] };
    }
    if (block.children.length > 0) {
      return { ...block, children: addChildToBlock(block.children, parentId, child) };
    }
    return block;
  });
}

function removeBlock(blocks: Block[], blockId: string): Block[] {
  return blocks
    .filter((block) => block.id !== blockId)
    .map((block) => ({
      ...block,
      children: removeBlock(block.children, blockId),
    }));
}

export function useProgram(initial: Block[]) {
  const [blocks, setBlocks] = useState(initial);

  const addRoot = useCallback((block: Block) => {
    setBlocks((prev) => [...prev, block]);
  }, []);

  const addChild = useCallback((parentId: string, child: Block) => {
    setBlocks((prev) => addChildToBlock(prev, parentId, child));
  }, []);

  const remove = useCallback((blockId: string) => {
    setBlocks((prev) => removeBlock(prev, blockId));
  }, []);

  const errors: ValidationError[] = useMemo(() => validate(blocks), [blocks]);
  const code: string = useMemo(() => generate(blocks), [blocks]);

  return { blocks, errors, code, addRoot, addChild, remove };
}
