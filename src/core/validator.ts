import { Block } from '../types/block';

export interface ValidationError {
  blockId: string;
  message: string;
}

type ValidationRule = (block: Block, declaredVars: Set<string>) => ValidationError[];

const rules: ValidationRule[] = [
  // Function must have a name
  (block) => {
    if (block.type === 'function' && !block.props.name) {
      return [{ blockId: block.id, message: 'Function is missing a name' }];
    }
    return [];
  },

  // Loop must have children
  (block) => {
    if (block.type === 'loop' && block.children.length === 0) {
      return [{ blockId: block.id, message: 'Loop has no body — it does nothing' }];
    }
    return [];
  },

  // Loop count must be a positive number
  (block) => {
    if (block.type === 'loop' && (block.props.count === undefined || block.props.count <= 0)) {
      return [{ blockId: block.id, message: 'Loop must have a positive count' }];
    }
    return [];
  },

  // Variable must have a name and value
  (block) => {
    if (block.type === 'variable') {
      if (!block.props.name) {
        return [{ blockId: block.id, message: 'Variable is missing a name' }];
      }
      if (block.props.value === undefined) {
        return [{ blockId: block.id, message: `Variable "${block.props.name}" has no value` }];
      }
    }
    return [];
  },

  // Variable must be declared before usage (basic: check expressions referencing undeclared names)
  (block, declaredVars) => {
    if (block.type === 'expression' && block.props.operator) {
      // If the operator looks like a variable reference and isn't declared
      const name = block.props.operator;
      // Only flag single-word lowercase names that aren't common built-in operations
      const builtins = new Set(['move', 'turn', 'print', 'wait', 'penUp', 'penDown']);
      if (/^[a-z][a-zA-Z0-9]*$/.test(name) && !builtins.has(name) && !declaredVars.has(name)) {
        return [{ blockId: block.id, message: `"${name}" is used but not declared in this scope` }];
      }
    }
    return [];
  },
];

function validateBlock(block: Block, declaredVars: Set<string>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Run all rules on this block
  for (const rule of rules) {
    errors.push(...rule(block, declaredVars));
  }

  // Track variable declarations for scope
  const scopeVars = new Set(declaredVars);
  if (block.type === 'variable' && block.props.name) {
    scopeVars.add(block.props.name);
  }

  // Validate children with accumulated scope
  for (const child of block.children) {
    errors.push(...validateBlock(child, scopeVars));
    // Siblings can see earlier declarations
    if (child.type === 'variable' && child.props.name) {
      scopeVars.add(child.props.name);
    }
  }

  return errors;
}

export function validate(program: Block[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const topLevelVars = new Set<string>();

  // Collect top-level function names so they can call each other
  for (const block of program) {
    if (block.type === 'function' && block.props.name) {
      topLevelVars.add(block.props.name);
    }
  }

  for (const block of program) {
    errors.push(...validateBlock(block, topLevelVars));
  }

  return errors;
}
