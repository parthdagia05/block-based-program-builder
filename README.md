# MBv4 Program Builder

A block-based visual programming system that models program structure as an AST, renders blocks with nested hierarchy, validates structure in real time, and generates readable pseudo-code.

Built as a demonstration of how visual programming environments work under the hood - from data modeling to rendering to code generation.

## Features

- **Block AST Model** - Programs are represented as a recursive tree of typed blocks (function, loop, variable, literal, expression)
- **Visual Block Rendering** - Color-coded blocks with nested indentation, container/leaf distinction, and depth-based styling
- **Real-time Validation** - Modular rule engine checks structure (missing names, empty loops, undeclared references) with scoped variable tracking
- **Live Code Generation** - Block tree is converted to formatted pseudo-code, updating instantly on every change
- **Interactive Editing** - Add/remove blocks at any level, load sample programs, reset workspace
- **Error Highlighting** - Invalid blocks are visually marked with red borders alongside a detailed error panel

## Tech Stack

- React 18
- TypeScript (strict)
- Vite
- Vitest (testing)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Tests cover the three core modules:
- **blockFactory** - Block creation and ID generation
- **validator** - Error detection for invalid structures, passes for valid ones
- **codegen** - Output format, indentation, and structure mapping

## Architecture

```
User Action → State (useProgram hook) → Core Logic → UI
                                         ├── validator → errors + highlighting
                                         └── codegen   → pseudo-code output
```

All state is managed in a single hook with immutable tree updates. Validation and code generation are derived via `useMemo`. See [docs/technical-spec.md](docs/technical-spec.md) for details.

## Project Structure

```
src/
  types/          # TypeScript type definitions (Block, BlockType, BlockProps)
  core/           # Business logic (factory, validator, codegen, config)
  hooks/          # useProgram — central state management
  components/     # React UI (Block, Toolbar, ControlPanel, ValidationPanel, CodeOutput)
docs/
  functional-spec.md   # What the system does, rules, examples
  technical-spec.md    # Architecture, data flow, design decisions
tests/
  blockFactory.test.ts
  validator.test.ts
  codegen.test.ts
```


