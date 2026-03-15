# Skript Tree-Sitter Grammar Development Guide

## Quick Start

This repository contains comprehensive documentation for building a tree-sitter grammar for the Skript language. Use the following files as references:

### Main Documentation Files

1. **GRAMMAR_SPECIFICATION.md** - Complete grammar specification
   - Full language syntax rules
   - All keywords and operators
   - Control flow structures
   - Examples and gotchas

2. **GRAMMAR_RULES.md** - Grammar rule definitions
   - BNF-style grammar rules
   - Token definitions
   - Expression hierarchies

3. **SYNTAX_REFERENCE.txt** - Quick syntax reference
   - Common patterns
   - Token highlight priorities
   - Regex patterns for key elements

4. **EXAMPLE.sk** - Real Skript code examples
   - Working script examples
   - Various syntax patterns
   - Can be used for testing

## Key Points for Grammar Development

### 1. Core Language Features
- **Indentation-based blocks** - Colons (`:`) mark block start
- **Case-insensitive keywords** - But preserve case for identifiers
- **String interpolation** - `%expression%` inside quoted strings
- **Variables with indices** - `{var::%key%}` with recursive interpolation
- **Type annotations** - `param: type` and `:: return_type`

### 2. Top-Level Sections
```
[directives]        # #@require, #disable
[options]           # options: key: value
[functions]         # function name(...) :: type:
[commands]          # command /name:
[events]            # on event:
```

### 3. Critical Grammar Rules

#### Variables
- Global: `{identifier}`
- Local: `{_identifier}`
- Indexed: `{id::%expr%}` or `{id::key}`
- List: `{id::*}`
- Nesting allowed in indices

#### Strings
- Quoted: `"text"` or `'text'`
- With interpolation: `"text %{var}% more"`
- Colors: `&a`, `&c`, etc.

#### Expressions
- Precedence: `()` > `^` > `*,/,%` > `+,-` > comparison > `not` > `and` > `or`
- Comparison: `=`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `is`, `is not`, `is a`
- Keywords: `and`, `or`, `not`, `contains`, `in`, `matches`

#### Blocks
- Start with `:` on same line
- Require indentation
- Can nest multiple levels

### 4. Edge Cases & Gotchas

1. **Multi-word types**: `time span`, `time span` are single type tokens
2. **Event modifiers**: `on [modifier] event_type:`
3. **Command arguments**: `<arg>`, `[arg]`, `<type: arg>`, `<...>`
4. **String interpolation**: Expressions inside `%...%` must handle all expression types
5. **Variable indices**: Can contain arbitrary expressions with nested interpolation
6. **Comments**: Can appear at end of any line after `#`
7. **Optional semicolons**: Lines terminated by newline or `:`
8. **Case sensitivity**: Keywords are case-insensitive, values are not

### 5. Token Scopes for Syntax Highlighting

Recommended token scopes for Zed editor:

```
keyword.control          - if, else, while, loop, stop, return
keyword.declaration      - command, on, function, options
keyword.operator         - and, or, not, is, contains, in
constant.numeric         - Numbers
constant.language        - true, false, yes, no, on, off
string.quoted.double     - "..."
string.quoted.single     - '...'
string.interpolation     - %(expr)%
variable                 - {variables}
comment.line             - # comments
entity.name.function     - Function names
support.type             - player, entity, block, etc.
punctuation.definition   - Colons, braces, brackets
```

## Document Structure

### GRAMMAR_SPECIFICATION.md
- Overview of Skript
- All fundamental syntax elements
- Sections (options, commands, events, functions)
- Variables and data types
- Control flow (if, loop, while)
- Expressions and operators
- String literals and interpolation
- Built-in literals and constants
- Common statements and effects
- Complete keyword list
- Full example script
- Critical parsing rules
- Token types for highlighting

### GRAMMAR_RULES.md
- Program structure rules
- Section definitions
- Options section grammar
- Command section grammar
- Event section grammar
- Function section grammar
- Statement definitions
- Expression rules (precedence)
- Variable definitions
- String literal rules
- Type annotations
- Number and boolean literals
- Comment and directive rules

### SYNTAX_REFERENCE.txt
- Keyword list (control, declaration, modifiers, effects, types, expressions)
- Detailed syntax examples (11+ examples)
- Indentation rules
- Regex patterns for key elements
- Common gotchas and special cases (10 rules)
- Token highlighting priorities
- Token scopes for Zed editor

### EXAMPLE.sk
- Real working Skript code
- Comments and basic structure
- Options section
- Commands with properties
- Event handlers
- Variable operations
- Functions with return types
- Conditional statements
- Loops (for and while)
- String interpolation
- Type operations
- List operations

## Building the Grammar

### Step 1: Define Base Tokens
- Comments: `# .*$`
- Keywords: case-insensitive matching
- Numbers: integers and decimals
- Identifiers: alphanumeric + underscore
- Strings: single and double quoted with interpolation

### Step 2: Define Literals
- Numbers, booleans, colors
- Time spans
- String literals with interpolation

### Step 3: Define Variables
- Format: `{...}`
- Support indices with `::` and `%...%`
- Allow nesting

### Step 4: Define Expressions
- Build expression hierarchy (precedence)
- Handle operators at each level
- Support function calls, variables, literals

### Step 5: Define Statements
- Variable assignments
- Effects (message, set, add, etc.)
- Control flow (if, loop, while)
- Return statements

### Step 6: Define Sections
- Options
- Commands (with arguments and properties)
- Events (with modifiers and clauses)
- Functions (with parameters and return types)

### Step 7: Define Program Structure
- Directives at top
- Sections in any order
- Comments anywhere

### Step 8: Test and Refine
- Test with EXAMPLE.sk
- Validate all syntax patterns
- Handle edge cases

## Common Patterns to Match

### Commands
```
command /name <arg> [optional]:
    description: TEXT
    permission: NODE
    trigger:
        [statements]
```

### Events
```
on [modifier] event_type [of/in/at clause]:
    [statements]
```

### Functions
```
function name(param: type) :: return_type:
    [statements]
    return value
```

### Conditionals
```
if condition:
    [statements]
else if condition:
    [statements]
else:
    [statements]
```

### Loops
```
loop iterable:
    [statements]

while condition:
    [statements]
```

### Variables
```
{global_variable}
{_local_variable}
{indexed::%player%}
{list::*}
```

### Strings
```
"String with %{var}% interpolation"
'Also works with single quotes'
"Color codes: &c red &a green"
```

## Testing Strategy

1. Test each section type independently
2. Test operators and precedence
3. Test variable references and interpolation
4. Test string parsing with special characters
5. Test nested blocks with indentation
6. Test edge cases (empty blocks, special characters, etc.)
7. Test full scripts from EXAMPLE.sk

## References

For tree-sitter documentation, see:
- https://tree-sitter.github.io/
- https://tree-sitter.github.io/tree-sitter/creating-parsers
- Grammar files are typically `grammar.js` in tree-sitter repositories

## Next Steps

1. Review all documentation files
2. Create `grammar.js` with tree-sitter DSL
3. Create test cases in `test/highlights.sk`
4. Build and test the grammar
5. Create syntax highlighting queries in `queries/highlights.scm`
6. Test with Zed editor integration

