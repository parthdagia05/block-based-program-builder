# Technical Specification

## Architecture Overview

The system follows a unidirectional data flow pattern:

```
User Action → State (useProgram) → Core Logic → UI Render
                                    ├── validator.ts → errors
                                    └── codegen.ts   → code string
```

All state lives in a single React hook (`useProgram`). Mutations produce new immutable copies of the block tree. Validation and code generation are derived values computed via `useMemo` on every state change.

## Block as AST

The central data structure is the `Block` interface:

```typescript
interface Block {
  id: string;          // Unique identifier (auto-generated)
  type: BlockType;     // 'function' | 'loop' | 'variable' | 'literal' | 'expression'
  props: BlockProps;   // Type-specific properties (name, value, operator, count)
  children: Block[];   // Nested child blocks (empty array for leaf blocks)
}
```

This is a recursive tree structure — essentially an Abstract Syntax Tree (AST) for the visual program. Every block has the same shape, which makes traversal, validation, and code generation uniform.

### Container vs Leaf

The distinction is defined in `blockConfig.ts`:

- **Container blocks** (`function`, `loop`, `expression`) — can have children, rendered with a body area.
- **Leaf blocks** (`variable`, `literal`) — cannot have children, rendered compactly.

This separation drives both rendering logic and what interactions are available (only containers show the "add child" dropdown).

## Data Flow

### State Management

`useProgram` hook manages the block tree with these operations:

| Operation  | Effect                                    |
|-----------|-------------------------------------------|
| `addRoot` | Appends a block at the top level          |
| `addChild`| Appends a child to a specific parent block |
| `remove`  | Removes a block and all its descendants   |
| `load`    | Replaces the entire program               |
| `reset`   | Clears all blocks                         |

All operations create new state via immutable tree transformations — no mutation.

### Derived State

On every state change, two derived values are recomputed:

1. **`errors`** — `validate(blocks)` walks the tree and returns `ValidationError[]`
2. **`code`** — `generate(blocks)` walks the tree and returns a pseudo-code string

Both are memoized with `useMemo` to avoid unnecessary recomputation.

### Validation Flow

```
validate(blocks)
  → collect top-level function names
  → for each block: run all rules, track scope
  → return ValidationError[]
  → derive invalidBlockIds (Set<string>)
  → pass to Block components for red highlighting
```

Rules are modular functions stored in an array. Adding a new rule is a single array entry.

### Code Generation Flow

```
generate(blocks)
  → for each block: dispatch to type-specific generator
  → generators handle indentation and recursion
  → return formatted string
```

## File Map

```
src/
  types/
    block.ts              # Block, BlockType, BlockProps interfaces
  core/
    blockFactory.ts       # Factory functions for creating blocks
    blockConfig.ts        # Container vs leaf configuration
    validator.ts          # Validation engine (rule-based, scoped)
    codegen.ts            # Block tree → pseudo-code generator
    sampleProgram.ts      # Valid and invalid sample programs
  hooks/
    useProgram.ts         # Central state hook (blocks, errors, code)
  components/
    App.tsx               # Root layout
    ControlPanel.tsx      # Load/reset buttons
    Toolbar.tsx           # Add root-level blocks
    BlockContainer.tsx    # Root block list
    Block.tsx             # Recursive block renderer
    ValidationPanel.tsx   # Error display
    CodeOutput.tsx        # Generated code display
```

## Design Decisions

1. **Uniform block shape** — All blocks share the same `Block` interface rather than using discriminated unions per type. This keeps traversal simple at the cost of optional props. The tradeoff is worthwhile because most operations (rendering, validation, codegen) need to walk the full tree generically.

2. **Immutable state** — All tree operations produce new objects. This makes React's change detection reliable and avoids bugs from shared mutable state. The tree is small enough that full copies are performant.

3. **Rule-based validation** — Rules are independent functions in an array rather than a monolithic validator. This makes it trivial to add, remove, or reorder rules without touching other logic.

4. **No external state library** — `useState` + `useMemo` is sufficient for this scale. Adding Redux/Zustand would add complexity without benefit.

5. **No CSS framework** — Plain CSS with BEM-style naming keeps the bundle small and avoids framework lock-in. Each component owns its own CSS file.

6. **Pseudo-code output** — The code generator produces readable pseudo-code (`repeat`, `let`) rather than targeting a real language. This keeps the output accessible and avoids language-specific edge cases.
