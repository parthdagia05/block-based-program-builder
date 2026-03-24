import { Block } from '../types/block';

const INDENT = '  ';

function indent(depth: number): string {
  return INDENT.repeat(depth);
}

function generateBlock(block: Block, depth: number): string {
  switch (block.type) {
    case 'function':
      return generateFunction(block, depth);
    case 'loop':
      return generateLoop(block, depth);
    case 'variable':
      return generateVariable(block, depth);
    case 'literal':
      return generateLiteral(block);
    case 'expression':
      return generateExpression(block, depth);
  }
}

function generateFunction(block: Block, depth: number): string {
  const name = block.props.name || 'unnamed';
  const body = generateBody(block.children, depth + 1);
  return `${indent(depth)}function ${name}() {\n${body}${indent(depth)}}`;
}

function generateLoop(block: Block, depth: number): string {
  const count = block.props.count ?? 0;
  const body = generateBody(block.children, depth + 1);
  return `${indent(depth)}repeat(${count}) {\n${body}${indent(depth)}}`;
}

function generateVariable(block: Block, depth: number): string {
  const name = block.props.name || 'x';
  const value = block.props.value ?? 0;
  return `${indent(depth)}let ${name} = ${JSON.stringify(value)};`;
}

function generateLiteral(block: Block): string {
  return JSON.stringify(block.props.value ?? 0);
}

function generateExpression(block: Block, depth: number): string {
  const op = block.props.operator || 'noop';
  if (block.children.length === 0) {
    return `${indent(depth)}${op}();`;
  }
  const args = block.children.map((child) => generateBlock(child, 0)).join(', ');
  return `${indent(depth)}${op}(${args});`;
}

function generateBody(blocks: Block[], depth: number): string {
  if (blocks.length === 0) {
    return `${indent(depth)}// empty\n`;
  }
  return blocks.map((b) => generateBlock(b, depth)).join('\n') + '\n';
}

export function generate(program: Block[]): string {
  return program.map((block) => generateBlock(block, 0)).join('\n\n') + '\n';
}
