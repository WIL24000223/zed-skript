# Zed Skript - Tree-Sitter Grammar for Skript Language

This repository contains comprehensive documentation for creating a tree-sitter grammar for the **Skript** language, a Minecraft Bukkit/Spigot scripting language used for server automation and custom gameplay mechanics.

## 📚 Documentation Files

### Core Documentation

1. **[TREE_SITTER_GUIDE.md](TREE_SITTER_GUIDE.md)** - **START HERE**
   - Overview of all documentation
   - Key points for grammar development
   - Step-by-step building instructions
   - Testing strategy
   - Common patterns

2. **[GRAMMAR_SPECIFICATION.md](GRAMMAR_SPECIFICATION.md)** - Complete Reference
   - Full language syntax (15 sections)
   - All keywords and operators
   - Control flow structures (if, loop, while)
   - Variables, types, literals
   - String interpolation rules
   - Critical parsing rules
   - Token types for syntax highlighting

3. **[GRAMMAR_RULES.md](GRAMMAR_RULES.md)** - Grammar Definitions
   - BNF-style grammar rules
   - Token definitions for each element
   - Expression hierarchies with precedence
   - Statement and section definitions

4. **[SYNTAX_REFERENCE.txt](SYNTAX_REFERENCE.txt)** - Quick Reference
   - Complete keyword list (organized by category)
   - 11+ detailed syntax examples
   - Indentation rules
   - Regex patterns for key elements
   - 10 common gotchas and special cases
   - Token highlighting priorities

5. **[EXAMPLE.sk](EXAMPLE.sk)** - Real Code Examples
   - Working Skript code for testing
   - Comments section
   - Options configuration
   - Command definitions with properties
   - Event handlers
   - Function definitions with return types
   - Variables (global, local, indexed)
   - Control flow (if/else, loops)
   - String interpolation examples

## 🎯 Quick Start for Grammar Development

### Phase 1: Understand the Language
1. Read [TREE_SITTER_GUIDE.md](TREE_SITTER_GUIDE.md) - Overview section
2. Review [EXAMPLE.sk](EXAMPLE.sk) - See real syntax
3. Skim [GRAMMAR_SPECIFICATION.md](GRAMMAR_SPECIFICATION.md) - Section 1-5

### Phase 2: Detailed Study
1. Study [GRAMMAR_SPECIFICATION.md](GRAMMAR_SPECIFICATION.md) - All sections
2. Reference [GRAMMAR_RULES.md](GRAMMAR_RULES.md) - Rule definitions
3. Check [SYNTAX_REFERENCE.txt](SYNTAX_REFERENCE.txt) - Specific patterns

### Phase 3: Grammar Implementation
1. Create `grammar.js` with tree-sitter DSL (JavaScript)
2. Follow structure in [TREE_SITTER_GUIDE.md](TREE_SITTER_GUIDE.md) - "Building the Grammar" section
3. Test with [EXAMPLE.sk](EXAMPLE.sk)

### Phase 4: Syntax Highlighting
1. Create `queries/highlights.scm` - Define highlight rules
2. Use token scopes from [SYNTAX_REFERENCE.txt](SYNTAX_REFERENCE.txt) - Section 7
3. Test in Zed editor

## 🔑 Key Language Features

### Indentation-Based Blocks
```skript
command /greet:
    description: Say hello
    trigger:
        message "Hello!"
```

### Variables with Interpolation
```skript
set {player_name} to "Steve"
message "Welcome %{player_name}%!"  # Outputs: Welcome Steve!
```

### Events and Handlers
```skript
on player join:
    broadcast "%player% has joined!"
```

### Functions with Types
```skript
function add(a: number, b: number) :: number:
    return a + b
```

### Control Flow
```skript
if player is online:
    loop all players:
        message "Playing!"
```

## 📋 Documentation Summary

| Document | Purpose | Size | Sections |
|----------|---------|------|----------|
| TREE_SITTER_GUIDE.md | Development guide | 5 KB | Overview, Key Points, Building Steps |
| GRAMMAR_SPECIFICATION.md | Complete reference | 15 KB | 15 major sections covering all syntax |
| GRAMMAR_RULES.md | Grammar definitions | 6 KB | 14 rule categories with BNF |
| SYNTAX_REFERENCE.txt | Quick lookup | 6.4 KB | Keywords, examples, gotchas, patterns |
| EXAMPLE.sk | Test code | 1.6 KB | 13 real examples in one file |

**Total: ~34 KB of documentation**

## 🎨 Syntax Highlighting Support

The grammar supports highlighting for:
- Keywords (control flow, declarations, operators)
- Variables (global, local, indexed)
- String literals with interpolation
- Comments
- Numbers, booleans, colors
- Built-in types
- Operators and punctuation

Token scopes defined in [SYNTAX_REFERENCE.txt](SYNTAX_REFERENCE.txt) Section 7.

## 📖 Language Overview

**Skript** is a domain-specific language (DSL) for Minecraft server scripting:

- **Syntax**: Python-like indentation-based
- **Typing**: Dynamic with optional type annotations
- **Variables**: Global `{var}` and local `{_var}`
- **Events**: Event-driven programming model
- **Functions**: First-class functions with return types
- **Interpolation**: String interpolation with `%...%`
- **Case Sensitivity**: Keywords are case-insensitive

### Core Concepts

1. **Sections**: Options, Commands, Events, Functions
2. **Statements**: Effects (set, message, give, etc.)
3. **Expressions**: Full operator precedence, comparisons
4. **Variables**: Indexed, nested, list operations
5. **Types**: player, entity, block, item, location, number, string, etc.

## 🔗 File Organization

```
zed-skript/
├── README.md                          # This file
├── TREE_SITTER_GUIDE.md              # START HERE - Development guide
├── GRAMMAR_SPECIFICATION.md          # Complete syntax reference
├── GRAMMAR_RULES.md                  # Grammar rule definitions
├── SYNTAX_REFERENCE.txt              # Quick reference and examples
└── EXAMPLE.sk                         # Real code examples for testing
```

## ✅ What's Included

### Comprehensive Syntax Coverage
- ✅ All keywords (30+)
- ✅ All operators (arithmetic, logical, comparison)
- ✅ All control flow structures
- ✅ Variable declaration and indexing
- ✅ String literals with interpolation
- ✅ Type annotations
- ✅ Function definitions
- ✅ Command definitions with properties
- ✅ Event handlers with modifiers
- ✅ Options sections
- ✅ Comments and directives

### Real Examples
- ✅ Working script code
- ✅ All major syntax patterns
- ✅ Edge cases and gotchas

### Grammar Rules
- ✅ BNF-style definitions
- ✅ Expression precedence
- ✅ Token specifications
- ✅ Section structures

### Development Guide
- ✅ Step-by-step building instructions
- ✅ Testing strategy
- ✅ Common patterns to match
- ✅ Next steps for implementation

## 🚀 Next Steps

1. **Read**: Start with [TREE_SITTER_GUIDE.md](TREE_SITTER_GUIDE.md)
2. **Study**: Review [GRAMMAR_SPECIFICATION.md](GRAMMAR_SPECIFICATION.md)
3. **Implement**: Create `grammar.js` following the guide
4. **Test**: Use [EXAMPLE.sk](EXAMPLE.sk) for validation
5. **Highlight**: Create highlighting queries for Zed
6. **Deploy**: Integrate with Zed editor

## 📝 Critical Parsing Rules

1. **Colons mark block start** - `command /test:` not `command /test`
2. **Indentation is required** - For block contents
3. **Variables use braces** - `{var}` with optional `::` indices
4. **String interpolation** - `%expr%` only in quoted strings
5. **Type annotations** - `param: type` and `:: return_type`

## 🎯 Use Cases

This documentation is ideal for:
- Building syntax highlighting for Skript in Zed
- Creating IDEs for Skript development
- Implementing Skript linters or formatters
- Learning Skript language structure
- Documenting DSL design patterns

## 📞 Questions & References

For tree-sitter implementation:
- https://tree-sitter.github.io/
- https://tree-sitter.github.io/tree-sitter/creating-parsers

For Skript language information:
- Skript is a Bukkit/Spigot addon
- Used for server scripting in Minecraft
- Syntax similar to English with Python-like indentation

## 📄 License

This documentation is provided as reference material for implementing Skript language support.

---

**Last Updated**: March 15, 2024
**Status**: Comprehensive documentation complete and ready for implementation
