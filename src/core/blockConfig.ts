import { BlockType } from '../types/block';

interface BlockTypeConfig {
  label: string;
  isContainer: boolean;
}

const blockTypeConfigs: Record<BlockType, BlockTypeConfig> = {
  function:   { label: 'function',   isContainer: true },
  loop:       { label: 'loop',       isContainer: true },
  expression: { label: 'expression', isContainer: true },
  variable:   { label: 'variable',   isContainer: false },
  literal:    { label: 'literal',    isContainer: false },
};

export function getBlockConfig(type: BlockType): BlockTypeConfig {
  return blockTypeConfigs[type];
}

export function isContainerBlock(type: BlockType): boolean {
  return blockTypeConfigs[type].isContainer;
}
