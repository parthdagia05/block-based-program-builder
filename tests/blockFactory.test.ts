import { describe, it, expect } from 'vitest';
import {
  createBlock,
  createFunction,
  createLoop,
  createVariable,
  createLiteral,
  createExpression,
} from '../src/core/blockFactory';

describe('blockFactory', () => {
  it('createBlock creates a block with correct structure', () => {
    const block = createBlock('function', { name: 'test' });
    expect(block.id).toMatch(/^block_\d+$/);
    expect(block.type).toBe('function');
    expect(block.props.name).toBe('test');
    expect(block.children).toEqual([]);
  });

  it('createFunction sets type and name', () => {
    const block = createFunction('myFunc');
    expect(block.type).toBe('function');
    expect(block.props.name).toBe('myFunc');
  });

  it('createFunction accepts children', () => {
    const child = createLiteral(42);
    const block = createFunction('myFunc', [child]);
    expect(block.children).toHaveLength(1);
    expect(block.children[0].type).toBe('literal');
  });

  it('createLoop sets type and count', () => {
    const block = createLoop(10);
    expect(block.type).toBe('loop');
    expect(block.props.count).toBe(10);
  });

  it('createVariable sets name and value', () => {
    const block = createVariable('x', 42);
    expect(block.type).toBe('variable');
    expect(block.props.name).toBe('x');
    expect(block.props.value).toBe(42);
  });

  it('createLiteral sets value', () => {
    const block = createLiteral('hello');
    expect(block.type).toBe('literal');
    expect(block.props.value).toBe('hello');
  });

  it('createExpression sets operator and children', () => {
    const arg = createLiteral(5);
    const block = createExpression('move', [arg]);
    expect(block.type).toBe('expression');
    expect(block.props.operator).toBe('move');
    expect(block.children).toHaveLength(1);
  });

  it('generates unique ids', () => {
    const a = createBlock('literal', { value: 1 });
    const b = createBlock('literal', { value: 2 });
    expect(a.id).not.toBe(b.id);
  });
});
