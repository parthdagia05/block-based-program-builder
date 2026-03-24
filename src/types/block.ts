export type BlockType = 'function' | 'loop' | 'variable' | 'literal' | 'expression';

export interface BlockProps {
  name?: string;
  value?: string | number | boolean;
  operator?: string;
  count?: number;
}

export interface Block {
  id: string;
  type: BlockType;
  props: BlockProps;
  children: Block[];
}
