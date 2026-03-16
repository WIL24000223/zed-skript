; =============================================================================
; Highlights for Skript (.sk files)
; =============================================================================

; ---------------------------------------------------------------------------
; Comments
; ---------------------------------------------------------------------------
(comment) @comment

; ---------------------------------------------------------------------------
; Section headers
; ---------------------------------------------------------------------------

; "options:" keyword
(options_header) @keyword

; "on <event>:"  →  "on" is a keyword, the event name is a label
(event_header "on" @keyword)
(event_header event: (event_name) @label)

; "command /name:" → "command" is a keyword, the command name is a function
(command_header "command" @keyword)
(command_header name: (command_name) @function)
(command_header args: (command_args) @variable.parameter)

; "function name(...):" → "function" is a keyword, name is a function definition
(function_header "function" @keyword)
(function_header name: (function_name) @function)
(function_header "::" @operator)
(function_header return_type: (type_name) @type)

; Command properties (trigger, usage, permission, …)
(command_property_header (command_property) @property)
(command_property_header ":" @punctuation.delimiter)
(command_property_header (line_value) @string.special)

; Parameters: variable name and type
(parameter name: (variable_name) @variable.parameter)
(parameter ":" @punctuation.delimiter)
(parameter type: (type_name) @type)

; ---------------------------------------------------------------------------
; Control flow keywords
; ---------------------------------------------------------------------------
(if_statement "if" @keyword.control)
(else_if_statement "else" @keyword.control)
(else_if_statement "if" @keyword.control)
(else_statement "else" @keyword.control)
(loop_statement "loop" @keyword.control)
(while_statement "while" @keyword.control)
(return_statement "return" @keyword.control)
(stop_statement) @keyword.control
(exit_statement "exit" @keyword.control)
(continue_statement) @keyword.control

; ---------------------------------------------------------------------------
; Effect keywords
; ---------------------------------------------------------------------------
[
  "set"
  "make"
  "add"
  "remove"
  "subtract"
  "give"
  "take"
  "send"
  "message"
  "msg"
  "broadcast"
  "teleport"
  "delete"
  "clear"
  "wait"
  "execute"
  "cancel"
  "event"
  "kill"
  "damage"
  "heal"
  "spawn"
  "log"
  "ban"
  "ip ban"
  "kick"
  "apply"
] @keyword

; ---------------------------------------------------------------------------
; Connective keywords used in effect/condition syntax
; ---------------------------------------------------------------------------
[
  "to"
  "from"
  "by"
  "at"
  "for"
  "of"
  "due to"
  "console"
  "player"
] @keyword.operator

; ---------------------------------------------------------------------------
; Condition keywords (comparison operators)
; ---------------------------------------------------------------------------
(comparison_operator) @operator

; Boolean connectives
[
  "and"
  "or"
  "not"
  "&&"
  "||"
  "!"
] @keyword.operator

; ---------------------------------------------------------------------------
; Variables   {name}  {_local}  {name::index}
; ---------------------------------------------------------------------------
(variable "{" @punctuation.bracket)
(variable "}" @punctuation.bracket)
(variable_inner) @variable

; Option references  {@option}
(option_reference) @variable.special

; ---------------------------------------------------------------------------
; String literals and interpolation
; ---------------------------------------------------------------------------
(string_literal) @string
(string_content) @string
(string_interpolation "%" @string.escape)
(interpolation_content) @embedded

; ---------------------------------------------------------------------------
; Number and boolean literals
; ---------------------------------------------------------------------------
(number_literal) @number
(boolean_literal) @constant.builtin

; ---------------------------------------------------------------------------
; Type names
; ---------------------------------------------------------------------------
(type_name) @type.builtin

; ---------------------------------------------------------------------------
; Arithmetic and concatenation operators
; ---------------------------------------------------------------------------
(binary_expression op: "+" @operator)
(binary_expression op: "-" @operator)
(binary_expression op: "*" @operator)
(binary_expression op: "/" @operator)
(binary_expression op: "^" @operator)
(binary_expression op: "mod" @operator)
(binary_expression op: "~" @operator)
(unary_minus "-" @operator)

; ---------------------------------------------------------------------------
; Function calls
; ---------------------------------------------------------------------------
(function_call name: (function_name) @function.call)
(function_call "(" @punctuation.bracket)
(function_call ")" @punctuation.bracket)

; ---------------------------------------------------------------------------
; Articles used before type names (a, an, the)
; ---------------------------------------------------------------------------
(type_expression "a" @keyword)
(type_expression "an" @keyword)
(type_expression "the" @keyword)
(type_expression "of" @keyword)

; ---------------------------------------------------------------------------
; Punctuation
; ---------------------------------------------------------------------------
":" @punctuation.delimiter
"," @punctuation.delimiter
"(" @punctuation.bracket
")" @punctuation.bracket
