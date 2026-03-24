import { describe, it, expect } from 'vitest';
import { generate } from '../src/core/codegen';
import {
  createFunction,
  createLoop,
  createVariable,
  createExpression,
  createLiteral,
} from '../src/core/blockFactory';

describe('codegen', () => {
  it('generates a function declaration', () => {
    const program = [createFunction('main', [])];
    const output = generate(program);
    expect(output).toContain('function main()');
    expect(output).toContain('{');
    expect(output).toContain('}');
  });

  it('generates a variable declaration', () => {
    const program = [
      createFunction('main', [
        createVariable('x', 42),
      ]),
    ];
    const output = generate(program);
    expect(output).toContain('let x = 42;');
  });

  it('generates a loop with repeat syntax', () => {
    const program = [
      createFunction('main', [
        createLoop(5, [
          createExpression('move', [createLiteral(10)]),
        ]),
      ]),
    ];
    const output = generate(program);
    expect(output).toContain('repeat(5)');
    expect(output).toContain('move(10)');
  });

  it('generates expression with no args', () => {
    const program = [
      createFunction('main', [
        createExpression('doSomething'),
      ]),
    ];
    const output = generate(program);
    expect(output).toContain('doSomething();');
  });

  it('generates expression with multiple args', () => {
    const program = [
      createFunction('main', [
        createExpression('add', [createLiteral(1), createLiteral(2)]),
      ]),
    ];
    const output = generate(program);
    expect(output).toContain('add(1, 2);');
  });

  it('generates nested structure with proper indentation', () => {
    const program = [
      createFunction('draw', [
        createLoop(4, [
          createExpression('move', [createLiteral(100)]),
        ]),
      ]),
    ];
    const output = generate(program);
    const lines = output.split('\n');
    // function at depth 0
    expect(lines[0]).toBe('function draw() {');
    // loop indented once
    expect(lines[1]).toMatch(/^ {2}repeat\(4\)/);
    // expression indented twice
    expect(lines[2]).toMatch(/^ {4}move\(100\)/);
  });

  it('generates empty body comment for empty containers', () => {
    const program = [createFunction('empty', [])];
    const output = generate(program);
    expect(output).toContain('// empty');
  });

  it('generates multiple top-level blocks separated by blank lines', () => {
    const program = [
      createFunction('a', []),
      createFunction('b', []),
    ];
    const output = generate(program);
    expect(output).toContain('}\n\nfunction b()');
  });
});
