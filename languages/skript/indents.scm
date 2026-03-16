; Indentation rules for Skript files.
; Skript uses 4-space / tab indentation for blocks that follow a ':'

; Increase indent after any section header (ends with ':')
[
  (event_header)
  (command_header)
  (function_header)
  (if_statement)
  (else_if_statement)
  (else_statement)
  (loop_statement)
  (while_statement)
] @indent

; Command property headers that have a block (trigger:)
(command_property_header) @indent
