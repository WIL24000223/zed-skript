# SKRIPT TREE-SITTER GRAMMAR REQUIREMENTS

## GRAMMAR RULES NEEDED

### 1. Program Structure
```
program
  └─ (section | comment | blank_line)*
```

### 2. Sections (Top-Level)
```
section
  ├─ options_section
  ├─ command_section
  ├─ event_section
  ├─ function_section
  └─ directive
```

### 3. Options Section
```
options_section
  ├─ "options" ":"
  └─ option_field+

option_field
  ├─ identifier
  ├─ ":"
  └─ (string_literal | number | identifier)
```

### 4. Command Section
```
command_section
  ├─ "command" command_signature
  ├─ command_property*
  └─ trigger_block

command_signature
  └─ "/" identifier (command_argument)*

command_argument
  ├─ "<" (type_annotation)? identifier ">"
  ├─ "[" identifier "]"  // optional
  └─ "<" "..." ">"       // remaining args

command_property
  ├─ "description:" string_literal
  ├─ "usage:" string_literal
  ├─ "permission:" identifier
  ├─ "permission message:" string_literal
  └─ "aliases:" string_literal

trigger_block
  ├─ "trigger:" ":"
  └─ statement+
```

### 5. Event Section
```
event_section
  ├─ "on" event_modifier? event_signature
  ├─ ":"
  └─ statement+

event_modifier
  ├─ "first"
  ├─ "every"
  └─ (adverb)*

event_signature
  └─ event_name (event_clause)*

event_clause
  ├─ "of" entity_expression
  ├─ "in" region_expression
  └─ "at" location_expression
```

### 6. Function Section
```
function_section
  ├─ "function" identifier
  ├─ function_parameters
  ├─ return_type?
  ├─ ":"
  └─ statement+

function_parameters
  ├─ "(" ")"
  ├─ "(" function_param ("," function_param)* ")"

function_param
  ├─ identifier
  ├─ ":"
  └─ type_annotation

return_type
  ├─ "::"
  └─ type_annotation
```

### 7. Statements
```
statement
  ├─ effect_statement
  ├─ conditional_statement
  ├─ loop_statement
  ├─ expression_statement
  └─ variable_statement

effect_statement
  ├─ set_statement
  ├─ add_statement
  ├─ remove_statement
  ├─ delete_statement
  ├─ message_statement
  ├─ broadcast_statement
  ├─ give_statement
  ├─ teleport_statement
  ├─ wait_statement
  ├─ cancel_statement
  ├─ stop_statement
  ├─ return_statement
  └─ custom_effect

set_statement
  ├─ "set"
  ├─ variable_reference
  ├─ "to"
  └─ expression

add_statement
  ├─ "add"
  ├─ expression
  ├─ "to"
  └─ variable_reference

remove_statement
  ├─ "remove"
  ├─ expression
  ├─ "from"
  └─ variable_reference

conditional_statement
  ├─ if_clause
  ├─ else_if_clause*
  └─ else_clause?

if_clause
  ├─ "if"
  ├─ expression
  ├─ ":"
  └─ statement+

else_if_clause
  ├─ "else" "if"
  ├─ expression
  ├─ ":"
  └─ statement+

else_clause
  ├─ "else" ":"
  └─ statement+

loop_statement
  ├─ loop_clause | while_clause | for_clause

loop_clause
  ├─ "loop"
  ├─ loop_iterable
  ├─ ":"
  └─ statement+

loop_iterable
  ├─ "all" entity_type
  ├─ number "times"
  ├─ variable_reference

while_clause
  ├─ "while"
  ├─ expression
  ├─ ":"
  └─ statement+
```

### 8. Expressions
```
expression
  ├─ or_expression

or_expression
  ├─ and_expression ("or" and_expression)*

and_expression
  ├─ not_expression ("and" not_expression)*

not_expression
  ├─ ("not") comparison_expression

comparison_expression
  ├─ additive_expression
  ├─ (comparison_operator additive_expression)*

comparison_operator
  ├─ "=" | "==" | "!=" | "<" | ">" | "<=" | ">="
  ├─ "is" | "is not" | "is a" | "is an"
  ├─ "contains" | "in" | "not in"
  └─ "matches" | "match"

additive_expression
  ├─ multiplicative_expression (("+"|"-") multiplicative_expression)*

multiplicative_expression
  ├─ exponential_expression (("*"|"/"|"%") exponential_expression)*

exponential_expression
  ├─ unary_expression ("^" unary_expression)*

unary_expression
  ├─ ("-") unary_expression
  └─ postfix_expression

postfix_expression
  ├─ primary_expression (index_expression)*

primary_expression
  ├─ variable_reference
  ├─ string_literal
  ├─ number_literal
  ├─ boolean_literal
  ├─ identifier
  ├─ function_call
  ├─ "(" expression ")"
  └─ entity_expression
```

### 9. Variables
```
variable_reference
  ├─ "{" variable_content "}"

variable_content
  ├─ identifier ("::" (variable_key | "*"))*
  └─ "_"? identifier

variable_key
  ├─ "%" expression "%"
  └─ identifier
```

### 10. String Literals
```
string_literal
  ├─ '"' string_content '"'
  ├─ "'" string_content "'"

string_content
  ├─ (string_part | interpolation)*

string_part
  └─ any_character_except_quote_or_%

interpolation
  ├─ "%" expression "%"
```

### 11. Types
```
type_annotation
  ├─ "player" | "entity" | "number" | "string" | "text"
  ├─ "block" | "item" | "location" | "world"
  ├─ "boolean" | "date" | "time span" | "inventory"
  ├─ "list" ("[" type_annotation "]")?
  └─ identifier  // custom type

entity_type
  ├─ "players" | "entities" | "blocks"
  ├─ "online players" | "offline players"
  └─ identifier
```

### 12. Literals
```
number_literal
  ├─ integer
  └─ decimal

integer
  └─ "-"? digit+

decimal
  └─ "-"? digit+ "." digit+

boolean_literal
  ├─ "true" | "false"
  ├─ "yes" | "no"
  └─ "on" | "off"

time_literal
  ├─ number (time_unit)+

time_unit
  ├─ "tick" | "ticks" | "second" | "seconds" | "sec" | "secs"
  ├─ "minute" | "minutes" | "min"
  ├─ "hour" | "hours" | "hr" | "hrs"
  ├─ "day" | "days"
  └─ "week" | "weeks"
```

### 13. Comments and Special Lines
```
comment
  └─ "#" any_text_to_eol

directive
  ├─ "#@require" version
  ├─ "#disable" directive_name
  └─ "#enable" directive_name
```

### 14. Indentation/Blocks
```
block
  ├─ indented_statements

indented_statements
  ├─ (INDENT statement)*
```

