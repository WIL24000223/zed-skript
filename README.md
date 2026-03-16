# zed-skript

A [Zed](https://zed.dev) extension that adds syntax highlighting for the
[Skript](https://github.com/SkriptLang/Skript) language — the scripting
plugin for Bukkit/Spigot Minecraft servers.

## Features

Syntax highlighting for `.sk` files, including:

- Comments (`# …`)
- Section headers (`on <event>:`, `command /name:`, `function name():`)
- Control flow keywords (`if`, `else`, `loop`, `while`, `return`, `stop`, …)
- Effect keywords (`set`, `send`, `broadcast`, `teleport`, `give`, `kill`, …)
- Variables (`{varName}`, `{_local}`, `{list::index}`)
- Option references (`{@optionName}`)
- String literals with `%expression%` interpolation
- Type names (`player`, `number`, `string`, `location`, …)
- Boolean and number literals
- Function calls and definitions

## Installation

### From the Zed Extension Registry

1. Open Zed
2. Open **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **Skript**
4. Click **Install**

### Manual / Development Installation

```bash
git clone https://github.com/WIL24000223/zed-skript \
  ~/.config/zed/extensions/skript
```

## Usage

Open any `.sk` file — Zed will automatically apply Skript syntax highlighting.

## Grammar

This extension bundles its own [tree-sitter](https://tree-sitter.github.io/tree-sitter/)
grammar for Skript.  The grammar source lives in `grammar.js`; the compiled
parser is generated into `src/parser.c`.

To regenerate the parser after modifying `grammar.js`:

```bash
npm install
npx tree-sitter generate
```

## License

MIT
