# Functional Specification

## Overview

MBv4 Program Builder is a block-based programming environment where users compose programs by assembling visual blocks. Each block represents a programming construct (function, loop, variable, etc.). The system validates the program structure in real time and generates readable pseudo-code from the block tree.

## Supported Block Types

| Block Type   | Role                         | Container? | Required Props         |
|-------------|------------------------------|------------|------------------------|
| `function`  | Defines a named procedure    | Yes        | `name`                 |
| `loop`      | Repeats children N times     | Yes        | `count` (positive int) |
| `expression`| Calls an operation or function | Yes      | `operator`             |
| `variable`  | Declares a named value       | No         | `name`, `value`        |
| `literal`   | Represents a raw value       | No         | `value`                |

**Container blocks** can hold child blocks in their body. **Leaf blocks** cannot.

## Validation Rules

The system enforces the following rules and reports errors in real time:

1. **Function must have a name** — anonymous functions are not allowed.
2. **Loop must have children** — an empty loop body is flagged as it does nothing.
3. **Loop count must be positive** — zero or negative counts are invalid.
4. **Variable must have a name and value** — incomplete declarations are flagged.
5. **Undeclared reference check** — expressions that reference names not declared in the current scope are flagged. Built-in operations (`move`, `turn`, `print`, `wait`, `penUp`, `penDown`) are exempt.

### Scope Rules

- Variables declared by earlier siblings are visible to later siblings.
- Top-level function names are collected first, so functions can call each other regardless of order.
- Each function body creates its own scope.

## User Interactions

- **Control Panel**: Load a valid sample program, load an invalid sample program, or reset to empty.
- **Toolbar**: Add root-level blocks (Function, Loop, Variable, Expression).
- **Add Child**: Container blocks have a dropdown to append a child (Expression, Loop, or Variable).
- **Remove**: Every block has a remove button that deletes it and all its children.

## Code Generation

The block tree is converted to pseudo-code using these mappings:

| Block Type   | Output Pattern                          |
|-------------|------------------------------------------|
| `function`  | `function name() { ... }`               |
| `loop`      | `repeat(count) { ... }`                 |
| `variable`  | `let name = value;`                     |
| `literal`   | The raw value (used as expression args)  |
| `expression`| `operator(args);`                       |

### Example

Given this block structure:

```
function drawSquare
  variable size = 100
  loop(4)
    move(100)
    turn(90)
```

The generated output is:

```
function drawSquare() {
  let size = 100;
  repeat(4) {
    move(100);
    turn(90);
  }
}
```

## Error Display

- Invalid blocks are highlighted with a red border in the block tree.
- A validation panel below the blocks lists all errors with the affected block ID and message.
- When there are no errors, a green "No errors found" message is shown.
