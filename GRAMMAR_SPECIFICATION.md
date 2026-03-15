# SKRIPT LANGUAGE: COMPLETE GRAMMAR SPECIFICATION FOR TREE-SITTER

## Overview
Skript is a Minecraft Bukkit/Spigot scripting language with Python-like indentation-based syntax. It uses a trigger-event model similar to event listeners in programming.

---

## 1. CORE SYNTAX STRUCTURE

### File Format
- Extension: `.sk`
- Character encoding: UTF-8
- Case-insensitive for keywords (except string values)
- Indentation-based (required for blocks)

### Top-Level Structure
```
[directives]
[options section]
[function definitions]
[command definitions]
[event handlers]
```

---

## 2. FUNDAMENTAL ELEMENTS

### A. Comments
- **Syntax:** `# comment text`
- Single-line only
- Extends to end of line
- Can appear anywhere

### B. Directives
- **Syntax:** `#@require VERSION` or `#disable DIRECTIVE`
- Appear at file start
- Examples:
  - `#@require 2.5`
  - `#disable variable case override`

### C. Whitespace & Indentation
- Blocks indicated by `:` at end of line
- **Required indentation** for block contents
- Standard: 4 spaces per level (or 1 tab)
- Blank lines are allowed

---

## 3. MAIN SECTIONS

### A. OPTIONS SECTION

**Syntax:**
```
options:
    key: value
    key: value
```

**Common Options:**
- `prefix: TEXT` - Message prefix
- `permission message: TEXT` - Custom permission denied message
- `command path: BOOLEAN` - Enable/disable command path
- `case sensitive: BOOLEAN` - Case sensitivity for commands
- And many more...

**Key Point:** All values after colon are treated as the option value

---

### B. COMMAND SECTION

**Syntax:**
```
command /name <arg1> [arg2]:
    description: TEXT
    usage: TEXT
    permission: PERM.NODE
    permission message: TEXT
    aliases: /alias1, /alias2
    trigger:
        [statements]
```

**Command Arguments:**
- Required: `<name>` or `<type: name>`
- Optional: `[name]`
- Remaining text: `<...>`
- Access via: `arg 1`, `arg 2`, `argument 1`, etc.

**Command Properties (all optional):**
- `description:` - Help text
- `usage:` - Usage help
- `permission:` - Required permission node
- `permission message:` - Denial message
- `aliases:` - Alternative command names

**Trigger Block:**
- Keyword: `trigger:` (with colon)
- Contains statements (indented)
- Executes when command runs

---

### C. EVENT SECTION

**Syntax:**
```
on [modifier] event_type [of/in/at clause]:
    [statements]
```

**Event Modifiers:**
- `first` - Only first occurrence
- `every` / `passively` - All occurrences

**Event Examples:**
- `on player join:`
- `on player quit:`
- `on damage of player:`
- `on right click on block:`
- `on any damage:`
- `on place of block:`
- `on chat:`
- `on command:`

**Event Variables (context-dependent):**
- `player` - The player in the event
- `victim` - In damage events
- `attacker` - In damage events
- `clicked block` - In click events
- `clicked entity` - In entity click events
- `event` - The event object itself

---

### D. FUNCTION SECTION

**Syntax:**
```
function name(param: type, param2: type) :: return_type:
    [statements]
    return value
```

**Components:**
- Function name: identifier (case-insensitive)
- Parameters: `(name: type, name2: type)` - optional
- Return type: `:: TYPE` - optional
- Body: Indented statements
- Return: `return VALUE` (explicit or implicit)

**Example:**
```
function greet(p: player) :: text:
    return "Hello %{p}%!"

function add_numbers(a: number, b: number) :: number:
    return a + b
```

---

## 4. VARIABLES

### Types of Variables

**Global Variables:**
- Format: `{name}`
- Persist across reloads
- Accessible everywhere

**Local Variables:**
- Format: `{_name}` (underscore prefix)
- Exist only in current scope
- Function/event local

### Variable Syntax

**Basic:**
```
{variable_name}
{_local_variable}
```

**With Indices:**
```
{variable::%player%}
{variable::%player%::key}
{variable::%player%::*}          # All elements (list)
{variable::%player%::1}           # Specific index
```

**Index Types:**
- `%expression%` - Expression-based key
- `identifier` - String key
- `*` - List wildcard (all elements)
- `1`, `2`, etc. - Numeric indices

### Variable Operations

```
set {var} to value
add value to {var}
remove value from {var}
subtract value from {var}
multiply {var} by value
divide {var} by value
delete {var}
```

---

## 5. DATA TYPES

### Built-in Types

**Primary Types:**
- `player` - Player entity
- `entity` - Any entity
- `block` - Block in world
- `item` - Item stack
- `location` - 3D position
- `world` - Game world
- `number` - Integer or decimal
- `string` / `text` - Text
- `boolean` - true/false

**Complex Types:**
- `inventory` - Inventory storage
- `list` - Collection of items
- `date` - Date/time
- `time span` - Duration

**Type Annotations:**
```
function test(p: player) :: text:
    ...

command /give <item: item>:
    ...
```

---

## 6. CONTROL FLOW

### Conditional: If/Else

**Syntax:**
```
if condition:
    [statements]
else if condition:
    [statements]
else:
    [statements]
```

**Example:**
```
if player is a zombie:
    message "You are a zombie"
else if player is a skeleton:
    message "You are a skeleton"
else:
    message "You are a player"
```

### Loop: Loop

**Syntax:**
```
loop iterable:
    [statements]
```

**Iterables:**
- `all players` - All online players
- `all entities` - All loaded entities
- `all blocks in region` - All blocks in region
- `NUMBER times` - Repeat N times
- Variable list - Iterate list

**Loop Variables:**
- `loop-value` - Current value
- `loop-player` - Current player
- `loop-block` - Current block
- `loop-number` - Current iteration number

**Example:**
```
loop all online players:
    message "Hi %loop-value%!"

loop 10 times:
    broadcast "Count: %loop-number%"
```

### Loop: While

**Syntax:**
```
while condition:
    [statements]
```

**Example:**
```
set {counter} to 10
while {counter} > 0:
    message "%{counter}%"
    subtract 1 from {counter}
    wait 1 second
```

### Loop Control

```
stop                 # Stop execution immediately
loop-continue        # Skip to next iteration
break                # Break from loop (some contexts)
```

---

## 7. EXPRESSIONS & OPERATORS

### Arithmetic Operators
| Operator | Example | Result |
|----------|---------|--------|
| `+` | `5 + 3` | `8` |
| `-` | `5 - 3` | `2` |
| `*` | `5 * 3` | `15` |
| `/` | `6 / 3` | `2` |
| `%` | `10 % 3` | `1` |
| `^` | `2 ^ 3` | `8` |

### Comparison Operators
| Operator | Meaning |
|----------|---------|
| `=` or `==` | Equals |
| `!=` or `<>` | Not equals |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less or equal |
| `>=` | Greater or equal |

### Logical Operators
| Operator | Example |
|----------|---------|
| `and` | `a > 5 and b < 10` |
| `or` | `a = 1 or a = 2` |
| `not` | `not (player is online)` |

### Comparison Keywords
| Operator | Meaning |
|----------|---------|
| `is` | Equals |
| `is not` | Not equals |
| `is a` | Type check |
| `is an` | Type check (alternative) |
| `contains` | Contains element |
| `in` | Element in collection |
| `not in` | Not in collection |
| `matches` | Regex match |

### Operator Precedence (High to Low)
1. Parentheses: `()`
2. Exponent: `^`
3. Multiplication/Division: `*`, `/`, `%`
4. Addition/Subtraction: `+`, `-`
5. Comparison: `<`, `>`, `<=`, `>=`, `==`, `!=`
6. Logical NOT: `not`
7. Logical AND: `and`
8. Logical OR: `or`

---

## 8. STRING LITERALS & INTERPOLATION

### String Syntax
```
"text"
'text'
```

**Features:**
- Can use single or double quotes
- Support color codes: `&a`, `&c`, `&b`, etc.
- Interpolation with `%expression%`

### Interpolation

```
"%player%"              # Variable (implicit)
"%{var}%"              # Variable (explicit)
"%arg 1%"              # Command argument
"%5 + 3%"              # Expression
"%func(player)%"       # Function call
```

**Rules:**
- Interpolation only inside quoted strings
- Expressions evaluated at runtime
- Multiple interpolations allowed

**Example:**
```
set {name} to "Steve"
set {level} to 5
message "Player %{name}% is level %{level}%!"
# Output: Player Steve is level 5!
```

---

## 9. LITERALS & CONSTANTS

### Numbers
```
5              # Integer
-42            # Negative
3.14           # Decimal
-1.5           # Negative decimal
```

### Booleans
```
true / false
yes / no
on / off
```

### Time Spans
```
1 tick / 5 ticks
1 second / 30 seconds / 1 sec
1 minute / 5 minutes / 1 min
1 hour / 2 hours / 1 hr
1 day / 7 days
1 week / 4 weeks
1 month / 1 year
```

### Colors (Minecraft)
```
&0 = Black
&1 = Dark Blue
&2 = Dark Green
&3 = Dark Cyan
&4 = Dark Red
&5 = Purple
&6 = Orange
&7 = Light Gray
&8 = Dark Gray
&9 = Blue
&a = Green
&b = Cyan
&c = Red
&d = Magenta
&e = Yellow
&f = White
```

---

## 10. COMMON STATEMENTS & EFFECTS

### Message Effects
```
message "text"              # To command sender
send "text" to player       # To specific player
broadcast "text"            # To all players
```

### Variable Effects
```
set {var} to value
add value to {var}
remove value from {var}
subtract value from {var}
multiply {var} by value
divide {var} by value
delete {var}
```

### Item Effects
```
give player item_name
give player item_name (quantity times)
remove item_name from player
clear player's inventory
equip player with helmet
```

### Entity Effects
```
teleport player to location
teleport player to other_player
shoot arrow from player
spawn zombie at location
heal player (amount hearts)
```

### Event Control
```
cancel event
cancel [damage event]        # Specific event type
stop                         # Stop execution
```

### Timing
```
wait 1 second
wait 10 ticks
```

### Flow Control
```
return value                 # Return from function
stop                         # Stop execution
loop-continue               # Next iteration
```

---

## 11. COMPLETE KEYWORD LIST

### Control Keywords
if, else, else if, while, loop, loop-continue, stop, return, function, command, on, options, trigger

### Modifier Keywords
first, every, passively, canceled

### Type Keywords
player, entity, block, item, location, number, string, text, boolean, date, time span, world, inventory, list

### Effect Keywords
set, add, remove, delete, give, take, teleport, message, send, broadcast, cancel, wait, return, heal, shoot, spawn, equip, clear, make, modify

### Logical Keywords
and, or, not, is, is a, is an, is not, contains, in, not in, matches, match

### Other Keywords
of, to, from, with, at, in, by, trigger, description, usage, permission, aliases, true, false, yes, no, on, off

---

## 12. COMPLETE EXAMPLE SCRIPT

```skript
#@require 2.5

options:
    prefix: &7[&bServer&7]
    permission message: &cYou don't have permission!

# Greet function
function greet_player(p: player) :: text:
    return "Welcome, %{p}%!"

# Greet command
command /greet [player]:
    description: Greet a player
    usage: /greet [player]
    permission: greet.cmd
    trigger:
        if arg 1 exists:
            set {target} to arg 1
        else:
            set {target} to player
        message greet_player({target})

# Track joins
on player join:
    set {join_time::%player%} to now
    add 1 to {join_count}
    message "Welcome! Total joins: %{join_count}%"
    if {vip_list::*} contains player:
        broadcast "%player% (VIP) has joined!"

# PVP Protection
on damage of player:
    if attacker is a player:
        if victim is a player:
            if {pvp_enabled} is false:
                cancel event
                message "PVP is disabled!" to attacker

# Give items command
command /giveall <item>:
    permission: admin.giveall
    trigger:
        loop all online players:
            give loop-player {_item}
            message "You received %{_item}%!" to loop-player
        broadcast "%player% gave everyone %{_item}%!"

# Countdown command
command /countdown <number>:
    trigger:
        set {count} to arg 1
        while {count} > 0:
            broadcast "Counting: %{count}%"
            subtract 1 from {count}
            wait 1 second
        broadcast "Countdown finished!"
```

---

## 13. CRITICAL PARSING RULES

### Rule 1: Colons Mark Block Start
```
# Correct
command /test:
    trigger:
        message "Hi"

# Wrong
command /test
    trigger
        message "Hi"
```

### Rule 2: Indentation is Required
```
# Correct
if condition:
    message "Yes"
    message "Really"

# Wrong
if condition:
message "Yes"
message "Really"
```

### Rule 3: Variables Have Special Syntax
```
# Global: {name}
# Local: {_name}
# Indexed: {name::%key%}
# List wildcard: {name::*}
```

### Rule 4: String Interpolation
```
# Correct
message "Value: %{var}%"
message "Expression: %5 + 3%"

# Wrong
message Value: {var}
message %{var}%
```

### Rule 5: Type Annotations
```
# Correct
function test(p: player) :: text:
command /give <item: item>:

# Wrong
function test(player p) :: text:
command /give <item>:  (no type)
```

### Rule 6: Arguments Pattern
```
# Correct
arg 1, arg 2, argument 1, argument 2

# Wrong
args[0], args[1], arg0, arg1
```

---

## 14. TOKEN TYPES FOR HIGHLIGHTING

For tree-sitter, define these token types:

```
keyword
  - keyword.control (if, while, loop, stop)
  - keyword.declaration (command, on, function)
  - keyword.operator (and, or, not, is)

constant
  - constant.numeric (numbers)
  - constant.language (true, false, yes, no)

string
  - string.quoted.double
  - string.quoted.single
  - string.interpolation (%(expr)%)

variable
  - variable.other (global {var})
  - variable.local ({_var})

comment
  - comment.line

function
  - entity.name.function (function names)

type
  - support.type (player, entity, etc.)

punctuation
  - punctuation.definition (colons, braces, brackets)
```

---

## 15. IMPORTANT GOTCHAS FOR GRAMMAR

1. **Variable indices can contain arbitrary expressions**
   - `{var::%player% + 1%}`
   - `{var::%{key}%}`
   - Need to handle recursion in interpolation

2. **String interpolation nesting**
   - `"Text %{var::%{player}%}%"` - nested interpolation
   - Parser must track interpolation context

3. **Multi-word event types**
   - `on player join` (not `onplayerjoin`)
   - Need to match entire event phrase

4. **Case-insensitive keywords**
   - Keywords match regardless of case
   - But identifiers preserve case

5. **Optional semicolons/terminators**
   - Lines can be terminated by newline or colon
   - No explicit statement terminator needed

6. **Comments anywhere**
   - Comments can appear at end of any line
   - Or on their own line

7. **Type syntax variations**
   - `time span` (two words)
   - Single-word types too
   - Need whitespace-aware matching

8. **Command arguments complex**
   - `<arg>` required
   - `[arg]` optional
   - `<type: arg>` with type
   - `<...>` remaining text

