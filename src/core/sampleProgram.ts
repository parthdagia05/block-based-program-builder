import { Block } from '../types/block';
import {
  createFunction,
  createLoop,
  createVariable,
  createLiteral,
  createExpression,
} from './blockFactory';

/**
 * Sample program structure representing:
 *
 * function drawSquare {
 *   variable size = 100
 *   loop(4) {
 *     move(size)
 *     turn(90)
 *   }
 * }
 *
 * function main {
 *   variable count = 3
 *   loop(count) {
 *     drawSquare()
 *   }
 * }
 */
export function createSampleProgram(): Block[] {
  const drawSquare = createFunction('drawSquare', [
    createVariable('size', 100),
    createLoop(4, [
      createExpression('move', [createLiteral(100)]),
      createExpression('turn', [createLiteral(90)]),
    ]),
  ]);

  const main = createFunction('main', [
    createVariable('count', 3),
    createLoop(3, [
      createExpression('drawSquare'),
    ]),
  ]);

  return [drawSquare, main];
}
