import { Block, BlockType, BlockProps } from '../types/block';

let nextId = 1;

function generateId(): string {
  return `block_${nextId++}`;
}

export function createBlock(
  type: BlockType,
  props: BlockProps = {},
  children: Block[] = [],
): Block {
  return {
    id: generateId(),
    type,
    props,
    children,
  };
}

export function createFunction(name: string, children: Block[] = []): Block {
  return createBlock('function', { name }, children);
}

export function createLoop(count: number, children: Block[] = []): Block {
  return createBlock('loop', { count }, children);
}

export function createVariable(name: string, value: string | number | boolean): Block {
  return createBlock('variable', { name, value });
}

export function createLiteral(value: string | number | boolean): Block {
  return createBlock('literal', { value });
}

export function createExpression(operator: string, children: Block[] = []): Block {
  return createBlock('expression', { operator }, children);
}
