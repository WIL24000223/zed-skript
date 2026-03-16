/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Tree-sitter grammar for the Skript language.
 *
 * Skript is a Bukkit/Spigot plugin that lets server admins write scripts (.sk
 * files) using a natural-language-like syntax.
 *
 * This grammar is optimised for syntax highlighting rather than full semantic
 * analysis.  It intentionally keeps the rules simple and conflict-free by
 * treating indented blocks as flat sequences of lines and relying on the
 * `word` property to keep keywords from being swallowed by identifier tokens.
 */
module.exports = grammar({
  name: "skript",

  // Horizontal whitespace and block comments are ignored everywhere.
  extras: ($) => [/[ \t]+/, $.comment],

  // The "word" token lets tree-sitter know about identifier boundaries so
  // that keyword tokens are not erroneously matched inside identifiers.
  word: ($) => $.word_token,

  conflicts: ($) => [
    [$.expression, $.send_effect],
    [$.expression, $.give_effect],
    [$.expression, $.kill_effect],
    [$.expression, $.heal_effect],
    [$.expression, $.spawn_effect],
    [$.expression, $.wait_effect],
    [$.expression, $.delete_effect],
  ],

  rules: {
    // -------------------------------------------------------------------------
    // Top-level: a script is a sequence of lines / sections.
    // -------------------------------------------------------------------------
    program: ($) => repeat(choice($.section_header, $.statement, $.blank_line)),

    blank_line: (_) => /\r?\n/,

    // -------------------------------------------------------------------------
    // Section headers  (first token on a line, followed by ':' then newline)
    // -------------------------------------------------------------------------
    section_header: ($) =>
      choice(
        $.options_header,
        $.event_header,
        $.command_header,
        $.function_header,
        $.command_property_header,
      ),

    // "options:"
    options_header: (_) =>
      seq(alias(/[oO][pP][tT][iI][oO][nN][sS]/, "options"), ":", /\r?\n/),

    // "on <event_name>:"
    event_header: ($) =>
      seq(
        "on",
        field("event", $.event_name),
        ":",
        /\r?\n/,
      ),

    // The event name may contain spaces (e.g. "player join", "block break")
    event_name: (_) => /[a-zA-Z][a-zA-Z0-9 _]*/,

    // "command /name [<args>]:"
    command_header: ($) =>
      seq(
        "command",
        field("name", $.command_name),
        optional(field("args", $.command_args)),
        ":",
        /\r?\n/,
      ),

    command_name: (_) => /\/[a-zA-Z][a-zA-Z0-9_\-]*/,

    command_args: (_) => /(\s*(<[^>]*>|\[[^\]]*\]))+/,

    // Properties of command blocks (trigger:, usage:, permission:, …)
    command_property_header: ($) =>
      seq(
        alias(
          choice(
            "trigger",
            "usage",
            "description",
            "aliases",
            "permission message",
            "permission",
            "cooldown message",
            "cooldown bypass",
            "cooldown",
            "executable by",
          ),
          $.command_property,
        ),
        ":",
        optional($.line_value),
        /\r?\n/,
      ),

    // Arbitrary value text on the same line as a command property (not parsed deeply)
    line_value: (_) => /[^\r\n]+/,

    // "function name(params) [:: type]:"
    function_header: ($) =>
      seq(
        "function",
        field("name", $.function_name),
        "(",
        optional(field("params", $.parameter_list)),
        ")",
        optional(seq("::", field("return_type", $.type_name))),
        ":",
        /\r?\n/,
      ),

    function_name: ($) => $.word_token,

    parameter_list: ($) => seq($.parameter, repeat(seq(",", $.parameter))),

    parameter: ($) =>
      seq(
        field("name", $.variable_name),
        ":",
        field("type", $.type_name),
      ),

    variable_name: ($) => $.word_token,

    // -------------------------------------------------------------------------
    // Statements  (one logical action per line)
    // -------------------------------------------------------------------------
    statement: ($) =>
      seq(
        choice(
          $.if_statement,
          $.else_if_statement,
          $.else_statement,
          $.loop_statement,
          $.while_statement,
          $.return_statement,
          $.stop_statement,
          $.exit_statement,
          $.continue_statement,
          $.set_effect,
          $.add_effect,
          $.remove_effect,
          $.give_effect,
          $.take_effect,
          $.send_effect,
          $.broadcast_effect,
          $.teleport_effect,
          $.delete_effect,
          $.wait_effect,
          $.execute_effect,
          $.cancel_effect,
          $.kill_effect,
          $.damage_effect,
          $.heal_effect,
          $.spawn_effect,
          $.log_effect,
          $.ban_effect,
          $.kick_effect,
          $.apply_effect,
          $.expression,
        ),
        /\r?\n/,
      ),

    // -------  Control flow  --------------------------------------------------

    if_statement: ($) =>
      seq("if", $.condition, ":"),

    else_if_statement: ($) =>
      seq("else", "if", $.condition, ":"),

    else_statement: (_) => seq("else", ":"),

    loop_statement: ($) =>
      seq("loop", $.expression, ":"),

    while_statement: ($) =>
      seq("while", $.condition, ":"),

    return_statement: ($) =>
      seq("return", optional($.expression)),

    stop_statement: (_) => "stop",

    exit_statement: ($) =>
      seq("exit", optional($.expression)),

    continue_statement: (_) => "continue",

    // -------  Effects  -------------------------------------------------------

    set_effect: ($) =>
      seq(
        choice("set", "make"),
        $.expression,
        choice("to", "="),
        $.expression,
      ),

    add_effect: ($) =>
      seq("add", $.expression, "to", $.expression),

    remove_effect: ($) =>
      seq(choice("remove", "subtract"), $.expression, "from", $.expression),

    give_effect: ($) =>
      seq("give", $.expression, $.expression),

    take_effect: ($) =>
      seq("take", $.expression, "from", $.expression),

    send_effect: ($) =>
      seq(
        choice("send", "message", "msg"),
        $.expression,
        optional(seq("to", $.expression)),
      ),

    broadcast_effect: ($) =>
      seq(
        "broadcast",
        $.expression,
        optional(seq("to", $.expression)),
      ),

    teleport_effect: ($) =>
      seq(
        "teleport",
        $.expression,
        choice("to", "at"),
        $.expression,
      ),

    delete_effect: ($) =>
      seq(choice("delete", "clear"), $.expression),

    wait_effect: ($) => seq("wait", $.expression),

    execute_effect: ($) =>
      seq(
        "execute",
        optional(choice("console", "player")),
        "command",
        $.expression,
      ),

    cancel_effect: (_) => seq("cancel", "event"),

    kill_effect: ($) => seq("kill", $.expression),

    damage_effect: ($) =>
      seq("damage", $.expression, "by", $.expression),

    heal_effect: ($) =>
      seq("heal", $.expression, optional(seq("by", $.expression))),

    spawn_effect: ($) =>
      seq("spawn", $.expression, optional(seq("at", $.expression))),

    log_effect: ($) =>
      seq("log", $.expression, optional(seq("to", $.expression))),

    ban_effect: ($) =>
      seq(
        choice("ban", "ip ban"),
        $.expression,
        optional(seq("due to", $.expression)),
      ),

    kick_effect: ($) =>
      seq(
        "kick",
        $.expression,
        optional(seq("due to", $.expression)),
      ),

    apply_effect: ($) =>
      seq(
        "apply",
        $.expression,
        "to",
        $.expression,
        optional(seq("for", $.expression)),
      ),

    // -------------------------------------------------------------------------
    // Conditions
    // -------------------------------------------------------------------------
    condition: ($) =>
      prec.left(
        choice(
          $.not_condition,
          $.conjunction,
          $.comparison,
          $.expression,
        ),
      ),

    not_condition: ($) => prec(10, seq(choice("not", "!"), $.condition)),

    conjunction: ($) =>
      prec.left(
        1,
        seq($.condition, choice("and", "or", "&&", "||"), $.condition),
      ),

    comparison: ($) =>
      seq($.expression, $.comparison_operator, $.expression),

    comparison_operator: (_) =>
      choice(
        "=",
        "!=",
        "<",
        ">",
        "<=",
        ">=",
        "is greater than or equal to",
        "is less than or equal to",
        "is greater than",
        "is less than",
        "is not set",
        "isn't set",
        "is set",
        "doesn't contain",
        "is not in",
        "isn't in",
        "doesn't match",
        "is not",
        "isn't",
        "contains",
        "matches",
        "is in",
        "is a",
        "is",
      ),

    // -------------------------------------------------------------------------
    // Expressions
    // -------------------------------------------------------------------------
    expression: ($) =>
      choice(
        $.binary_expression,
        $.unary_minus,
        $.primary_expression,
      ),

    binary_expression: ($) =>
      prec.left(
        2,
        seq(
          $.expression,
          field("op", choice("+", "-", "*", "/", "^", "mod", "~")),
          $.expression,
        ),
      ),

    unary_minus: ($) => prec(5, seq("-", $.primary_expression)),

    primary_expression: ($) =>
      choice(
        $.variable,
        $.option_reference,
        $.string_literal,
        $.number_literal,
        $.boolean_literal,
        $.type_expression,
        $.function_call,
        $.paren_expression,
        $.word_token,
      ),

    paren_expression: ($) =>
      seq("(", $.expression, ")"),

    // -------------------------------------------------------------------------
    // Variables
    // -------------------------------------------------------------------------
    variable: ($) =>
      seq("{", field("name", $.variable_inner), "}"),

    variable_inner: ($) =>
      seq(
        optional("_"),
        /[a-zA-Z_][a-zA-Z0-9_.@ \-']*/,
        optional(seq("::", $.variable_index)),
      ),

    variable_index: ($) =>
      choice($.variable, /[a-zA-Z0-9_']+/),

    option_reference: (_) =>
      seq("{@", /[A-Za-z_][A-Za-z0-9_ \-]*/, "}"),

    // -------------------------------------------------------------------------
    // Literals
    // -------------------------------------------------------------------------
    string_literal: ($) =>
      seq(
        '"',
        repeat(choice($.string_content, $.string_interpolation)),
        '"',
      ),

    string_content: (_) => /[^"%\r\n\\]+/,

    string_interpolation: ($) =>
      seq("%", $.interpolation_content, "%"),

    interpolation_content: ($) =>
      choice(
        $.variable,
        $.function_call,
        $.number_literal,
        $.word_token,
      ),

    number_literal: (_) =>
      token(
        choice(
          /\d+\.\d+/,
          /\d+/,
        ),
      ),

    boolean_literal: (_) =>
      choice("true", "false", "yes", "no"),

    type_expression: ($) =>
      seq(
        optional(choice("a", "an", "the")),
        $.type_name,
        optional(seq("of", $.expression)),
      ),

    function_call: ($) =>
      seq(
        field("name", $.function_name),
        token.immediate("("),
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        ")",
      ),

    // -------------------------------------------------------------------------
    // Type names
    // -------------------------------------------------------------------------
    type_name: (_) =>
      choice(
        "player",
        "players",
        "entity",
        "entities",
        "living entity",
        "living entities",
        "mob",
        "mobs",
        "item",
        "items",
        "block",
        "blocks",
        "world",
        "worlds",
        "location",
        "locations",
        "vector",
        "vectors",
        "number",
        "numbers",
        "integer",
        "integers",
        "string",
        "strings",
        "text",
        "boolean",
        "booleans",
        "object",
        "objects",
        "slot",
        "slots",
        "inventory",
        "inventories",
        "damage cause",
        "biome",
        "biomes",
        "enchantment",
        "enchantments",
        "potion effect",
        "potion effects",
        "color",
        "colors",
        "time",
        "timespan",
        "date",
        "chunk",
        "chunks",
        "projectile",
        "projectiles",
        "experience",
        "gamemode",
        "gamemodes",
        "material",
        "materials",
        "sound",
        "sounds",
      ),

    // -------------------------------------------------------------------------
    // Base word token (used as `word` and as identifier)
    // -------------------------------------------------------------------------
    word_token: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // -------------------------------------------------------------------------
    // Comments  # text until end of line
    // -------------------------------------------------------------------------
    comment: (_) => /#[^\r\n]*/,
  },
});
