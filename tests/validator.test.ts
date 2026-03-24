import { describe, it, expect } from 'vitest';
import { validate } from '../src/core/validator';
import {
  createFunction,
  createLoop,
  createVariable,
  createExpression,
  createLiteral,
} from '../src/core/blockFactory';

describe('validator', () => {
  it('passes a valid program with no errors', () => {
    const program = [
      createFunction('main', [
        createVariable('x', 10),
        createLoop(3, [
          createExpression('move', [createLiteral(5)]),
        ]),
      ]),
    ];
    const errors = validate(program);
    expect(errors).toHaveLength(0);
  });

  it('detects function missing a name', () => {
    const program = [createFunction('')];
    const errors = validate(program);
    expect(errors.some((e) => e.message.includes('missing a name'))).toBe(true);
  });

  it('detects empty loop', () => {
    const program = [
      createFunction('main', [
        createLoop(5, []),
      ]),
    ];
    const errors = validate(program);
    expect(errors.some((e) => e.message.includes('no body'))).toBe(true);
  });

  it('detects loop with non-positive count', () => {
    const program = [
      createFunction('main', [
        createLoop(0, [createExpression('move')]),
      ]),
    ];
    const errors = validate(program);
    expect(errors.some((e) => e.message.includes('positive count'))).toBe(true);
  });

  it('detects undeclared reference', () => {
    const program = [
      createFunction('main', [
        createExpression('undeclaredThing'),
      ]),
    ];
    const errors = validate(program);
    expect(errors.some((e) => e.message.includes('not declared'))).toBe(true);
  });

  it('allows built-in operations without declaration', () => {
    const program = [
      createFunction('main', [
        createExpression('move', [createLiteral(10)]),
        createExpression('turn', [createLiteral(90)]),
      ]),
    ];
    const errors = validate(program);
    expect(errors).toHaveLength(0);
  });

  it('allows functions to call each other', () => {
    const program = [
      createFunction('helper', [
        createExpression('move', [createLiteral(1)]),
      ]),
      createFunction('main', [
        createExpression('helper'),
      ]),
    ];
    const errors = validate(program);
    expect(errors).toHaveLength(0);
  });

  it('detects variable with missing name', () => {
    const program = [
      createFunction('main', [
        createVariable('', 10),
      ]),
    ];
    const errors = validate(program);
    expect(errors.some((e) => e.message.includes('missing a name'))).toBe(true);
  });
});
