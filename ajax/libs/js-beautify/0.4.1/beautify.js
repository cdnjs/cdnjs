/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>

  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy   !jslint_happy
            ---------------------------------
             function ()      function()

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "expand-strict"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.

            expand-strict: put brace on own line even in such cases:

                var a =
                {
                    a: 5,
                    b: 6
                }
            This mode may break your scripts - e.g "return { a: 1 }" will be broken into two lines, so beware.

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/
function js_beautify(js_source_text, options) {
    "use strict";
    var beautifier = new Beautifier(js_source_text, options);
    return beautifier.beautify();
}

function Beautifier(js_source_text, options) {
    "use strict";
    var input, output, token_text, last_type, last_text, last_last_text, last_word, flags, flag_store, indent_string;
    var whitespace, wordchar, punct, parser_pos, line_starters, digits;
    var prefix, token_type;
    var wanted_newline, n_newlines, output_wrapped, output_space_before_token, whitespace_before_token;
    var input_length;
    var handlers, MODE, opt;
    var preindent_string = '';

    whitespace = "\n\r\t ".split('');
    wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
    digits = '0123456789'.split('');

    punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::';
    punct += ' <%= <% %> <?= <? ?>'; // try to be a good boy and try not to break the markup language identifiers
    punct = punct.split(' ');

    // words which should always start on new line.
    line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');

    MODE = {
        BlockStatement: 'BlockStatement', // 'BLOCK'
        Statement: 'Statement', // 'STATEMENT'
        ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
        ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
        ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
        Conditional: 'Conditional', //'(COND-EXPRESSION)',
        Expression: 'Expression' //'(EXPRESSION)'
    };

    handlers = {
        'TK_START_EXPR': handle_start_expr,
        'TK_END_EXPR': handle_end_expr,
        'TK_START_BLOCK': handle_start_block,
        'TK_END_BLOCK': handle_end_block,
        'TK_WORD': handle_word,
        'TK_SEMICOLON': handle_semicolon,
        'TK_STRING': handle_string,
        'TK_EQUALS': handle_equals,
        'TK_OPERATOR': handle_operator,
        'TK_COMMA': handle_comma,
        'TK_BLOCK_COMMENT': handle_block_comment,
        'TK_INLINE_COMMENT': handle_inline_comment,
        'TK_COMMENT': handle_comment,
        'TK_DOT': handle_dot,
        'TK_UNKNOWN': handle_unknown
    };


    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};
    opt = {};

    // compatibility
    if (options.space_after_anon_function !== undefined && options.jslint_happy === undefined) {
        options.jslint_happy = options.space_after_anon_function;
    }
    if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
    }
    opt.brace_style = options.brace_style ? options.brace_style : (opt.brace_style ? opt.brace_style : "collapse");

    opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    opt.indent_char = options.indent_char ? options.indent_char : ' ';
    opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
    opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
    opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
    opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
    opt.space_before_conditional= (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
    opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);

    //----------------------------------
    indent_string = '';
    while (opt.indent_size > 0) {
        indent_string += opt.indent_char;
        opt.indent_size -= 1;
    }

    while (js_source_text && (js_source_text.charAt(0) === ' ' || js_source_text.charAt(0) === '\t')) {
        preindent_string += js_source_text.charAt(0);
        js_source_text = js_source_text.substring(1);
    }
    input = js_source_text;
    // cache the source's length.
    input_length = js_source_text.length;

    last_word = ''; // last 'TK_WORD' passed
    last_type = 'TK_START_EXPR'; // last token type
    last_text = ''; // last token text
    last_last_text = ''; // pre-last token text
    output = [];
    output_wrapped = false;
    output_space_before_token = false;
    whitespace_before_token = [];

    // Stack of parsing/formatting states, including MODE.
    // We tokenize, parse, and output in an almost purely a forward-only stream of token input
    // and formatted output.  This makes the beautifier less accurate than full parsers
    // but also far more tolerant of syntax errors.
    //
    // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
    // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
    // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
    // most full parsers would die, but the beautifier gracefully falls back to
    // MODE.BlockStatement and continues on.
    flag_store = [];
    set_mode(MODE.BlockStatement);

    parser_pos = 0;

    this.beautify = function () {
        /*jshint onevar:true */
        var t, i, keep_whitespace, sweet_code;

        while (true) {
            t = get_next_token();
            token_text = t[0];
            token_type = t[1];

            if (token_type === 'TK_EOF') {
                break;
            }

            keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);

            if (keep_whitespace) {
                for (i = 0; i < n_newlines; i += 1) {
                    print_newline(true);
                }
            } else {
                wanted_newline = n_newlines > 0;
                if (opt.max_preserve_newlines && n_newlines > opt.max_preserve_newlines) {
                    n_newlines = opt.max_preserve_newlines;
                }

                if (opt.preserve_newlines) {
                    if (n_newlines > 1) {
                        print_newline();
                        for (i = 1; i < n_newlines; i += 1) {
                            print_newline(true);
                        }
                    }
                }
            }

            handlers[token_type]();

            // The cleanest handling of inline comments is to treat them as though they aren't there.
            // Just continue formatting and the behavior should be logical.
            // Also ignore unknown tokens.  Again, this should result in better behavior.
            if (token_type !== 'TK_INLINE_COMMENT' && token_type !== 'TK_COMMENT' &&
                token_type !== 'TK_UNKNOWN') {
                last_last_text = last_text;
                last_type = token_type;
                last_text = token_text;
            }
        }

        sweet_code = preindent_string + output.join('').replace(/[\r\n ]+$/, '');
        return sweet_code;
    };

    function trim_output(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;
        while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string || output[output.length - 1] === preindent_string || (eat_newlines && (output[output.length - 1] === '\n' || output[output.length - 1] === '\r')))) {
            output.pop();
        }
    }

    function trim(s) {
        return s.replace(/^\s\s*|\s\s*$/, '');
    }

    // we could use just string.split, but
    // IE doesn't like returning empty strings

    function split_newlines(s) {
        //return s.split(/\x0d\x0a|\x0a/);

        s = s.replace(/\x0d/g, '');
        var out = [],
            idx = s.indexOf("\n");
        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }
        if (s.length) {
            out.push(s);
        }
        return out;
    }

    function just_added_newline() {
        return output.length && output[output.length - 1] === "\n";
    }

    function _last_index_of(arr, find) {
        var i = arr.length - 1;
        if (i < 0) {
            i += arr.length;
        }
        if (i > arr.length - 1) {
            i = arr.length - 1;
        }
        for (i++; i-- > 0;) {
            if (i in arr && arr[i] === find) {
                return i;
            }
        }
        return -1;
    }

    function allow_wrap_or_preserved_newline(force_linewrap) {
        force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;
        if (opt.wrap_line_length && !force_linewrap) {
            var current_line = '';
            var proposed_line_length = 0;
            var start_line = _last_index_of(output, '\n') + 1;
            // never wrap the first token of a line.
            if (start_line < output.length) {
                current_line = output.slice(start_line).join('');
                proposed_line_length = current_line.length + token_text.length +
                    (output_space_before_token ? 1 : 0);
                if (proposed_line_length >= opt.wrap_line_length) {
                    force_linewrap = true;
                }
            }
        }
        if (((opt.preserve_newlines && wanted_newline) || force_linewrap) && !just_added_newline()) {
            print_newline(false, true);
            output_wrapped = true;
            wanted_newline = false;
        }
    }

    function print_newline(force_newline, preserve_statement_flags) {
        output_wrapped = false;
        output_space_before_token = false;

        if (!preserve_statement_flags) {
            if (last_text !== ';') {
                while (flags.mode === MODE.Statement && !flags.if_block) {
                    restore_mode();
                }
            }
        }

        if (flags.mode === MODE.ArrayLiteral) {
            flags.multiline_array = true;
        }


        if (!output.length) {
            return; // no newline on start of file
        }

        if (force_newline || !just_added_newline()) {
            output.push("\n");
        }
    }

    function print_token_line_indentation() {
        if (just_added_newline()) {
            if (opt.keep_array_indentation && is_array(flags.mode) && whitespace_before_token.length) {
                output.push(whitespace_before_token.join('') + '');
            } else {
                if (preindent_string) {
                    output.push(preindent_string);
                }

                print_indent_string(flags.indentation_level);
                print_indent_string(flags.var_line && flags.var_line_reindented);
                print_indent_string(output_wrapped);
            }
        }
    }

    function print_indent_string(level) {
        if (level === undefined) {
            level = 1;
        } else if (typeof level !== 'number') {
            level = level ? 1 : 0;
        }

        // Never indent your first output indent at the start of the file
        if (last_text !== '') {
            for (var i = 0; i < level; i += 1) {
                output.push(indent_string);
            }
        }
    }

    function print_token_space_before() {
        if (output_space_before_token && output.length) {
            var last_output = output[output.length - 1];
            if (!just_added_newline() && last_output !== ' ' && last_output !== indent_string) { // prevent occassional duplicate space
                output.push(' ');
            }
        }
    }

    function print_token(printable_token) {
        printable_token = printable_token || token_text;
        print_token_line_indentation();
        output_wrapped = false;
        print_token_space_before();
        output_space_before_token = false;
        output.push(printable_token);
    }

    function indent() {
        flags.indentation_level += 1;
    }

    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
        }
        flags = {
            previous_mode: flags ? flags.mode : MODE.BlockStatement,
            mode: mode,
            var_line: false,
            var_line_tainted: false,
            var_line_reindented: false,
            in_html_comment: false,
            multiline_array: false,
            if_block: false,
            do_block: false,
            do_while: false,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            indentation_level: (flags ? flags.indentation_level + ((flags.var_line && flags.var_line_reindented) ? 1 : 0) : 0),
            ternary_depth: 0
        };
    }

    function is_array(mode) {
        return mode === MODE.ArrayLiteral;
    }

    function is_expression(mode) {
        return in_array(mode, [MODE.ArrayLiteral, MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }

    function restore_mode() {
        if (flag_store.length > 0) {
            var mode = flags.mode;
            flags = flag_store.pop();
            flags.previous_mode = mode;
        }
    }

    function start_of_statement() {
        if (
        (last_text === 'do' ||
            (last_text === 'else' && token_text !== 'if') ||
            (last_type === 'TK_END_EXPR' && (flags.previous_mode === MODE.ForInitializer || flags.previous_mode === MODE.Conditional)))) {
            allow_wrap_or_preserved_newline();
            set_mode(MODE.Statement);
            indent();
            output_wrapped = false;
            return true;
        }
        return false;
    }

    function all_lines_start_with(lines, c) {
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    function is_special_word(word) {
        return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    function in_array(what, arr) {
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }

    function unescape_string(s) {
        var esc = false,
            out = '',
            pos = 0,
            s_hex = '',
            escaped = 0,
            c;

        while (esc || pos < s.length) {

            c = s.charAt(pos);
            pos++;

            if (esc) {
                esc = false;
                if (c === 'x') {
                    // simple hex-escape \x24
                    s_hex = s.substr(pos, 2);
                    pos += 2;
                } else if (c === 'u') {
                    // unicode-escape, \u2134
                    s_hex = s.substr(pos, 4);
                    pos += 4;
                } else {
                    // some common escape, e.g \n
                    out += '\\' + c;
                    continue;
                }
                if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
                    // some weird escaping, bail out,
                    // leaving whole string intact
                    return s;
                }

                escaped = parseInt(s_hex, 16);

                if (escaped >= 0x00 && escaped < 0x20) {
                    // leave 0x00...0x1f escaped
                    if (c === 'x') {
                        out += '\\x' + s_hex;
                    } else {
                        out += '\\u' + s_hex;
                    }
                    continue;
                } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                    // single-quote, apostrophe, backslash - escape these
                    out += '\\' + String.fromCharCode(escaped);
                } else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
                    // we bail out on \x7f..\xff,
                    // leaving whole string escaped,
                    // as it's probably completely binary
                    return s;
                } else {
                    out += String.fromCharCode(escaped);
                }
            } else if (c === '\\') {
                esc = true;
            } else {
                out += c;
            }
        }
        return out;
    }

    function is_next(find) {
        var local_pos = parser_pos;
        var c = input.charAt(local_pos);
        while (in_array(c, whitespace) && c !== find) {
            local_pos++;
            if (local_pos >= input_length) {
                return false;
            }
            c = input.charAt(local_pos);
        }
        return c === find;
    }

    function get_next_token() {
        var i, resulting_string;

        n_newlines = 0;

        if (parser_pos >= input_length) {
            return ['', 'TK_EOF'];
        }

        wanted_newline = false;
        whitespace_before_token = [];

        var c = input.charAt(parser_pos);
        parser_pos += 1;

        while (in_array(c, whitespace)) {

            if (c === '\n') {
                n_newlines += 1;
                whitespace_before_token = [];
            } else if (n_newlines) {
                if (c === indent_string) {
                    whitespace_before_token.push(indent_string);
                } else if (c !== '\r') {
                    whitespace_before_token.push(' ');
                }
            }

            if (parser_pos >= input_length) {
                return ['', 'TK_EOF'];
            }

            c = input.charAt(parser_pos);
            parser_pos += 1;
        }

        if (in_array(c, wordchar)) {
            if (parser_pos < input_length) {
                while (in_array(input.charAt(parser_pos), wordchar)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos === input_length) {
                        break;
                    }
                }
            }

            // small and surprisingly unugly hack for 1E-10 representation
            if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {

                var sign = input.charAt(parser_pos);
                parser_pos += 1;

                var t = get_next_token();
                c += sign + t[0];
                return [c, 'TK_WORD'];
            }

            if (c === 'in') { // hack for 'in' operator
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            var comment = '';
            // peek for comment /* ... */
            var inline_comment = true;
            if (input.charAt(parser_pos) === '*') {
                parser_pos += 1;
                if (parser_pos < input_length) {
                    while (parser_pos < input_length && !(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/')) {
                        c = input.charAt(parser_pos);
                        comment += c;
                        if (c === "\n" || c === "\r") {
                            inline_comment = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            break;
                        }
                    }
                }
                parser_pos += 2;
                if (inline_comment && n_newlines === 0) {
                    return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
                } else {
                    return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                }
            }
            // peek for comment // ...
            if (input.charAt(parser_pos) === '/') {
                comment = c;
                while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
                    comment += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input_length) {
                        break;
                    }
                }
                return [comment, 'TK_COMMENT'];
            }

        }

        if (c === "'" || c === '"' || // string
        (c === '/' &&
            ((last_type === 'TK_WORD' && is_special_word(last_text)) ||
            (last_type === 'TK_END_EXPR' && in_array(flags.previous_mode, [MODE.Conditional, MODE.ForInitializer])) ||
            (in_array(last_type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
        ]))))) { // regexp
            var sep = c,
                esc = false,
                has_char_escapes = false;

            resulting_string = c;

            if (parser_pos < input_length) {
                if (sep === '/') {
                    //
                    // handle regexp separately...
                    //
                    var in_char_class = false;
                    while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (!esc) {
                            esc = input.charAt(parser_pos) === '\\';
                            if (input.charAt(parser_pos) === '[') {
                                in_char_class = true;
                            } else if (input.charAt(parser_pos) === ']') {
                                in_char_class = false;
                            }
                        } else {
                            esc = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }

                } else {
                    //
                    // and handle string also separately
                    //
                    while (esc || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (esc) {
                            if (input.charAt(parser_pos) === 'x' || input.charAt(parser_pos) === 'u') {
                                has_char_escapes = true;
                            }
                            esc = false;
                        } else {
                            esc = input.charAt(parser_pos) === '\\';
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }

                }
            }

            parser_pos += 1;
            resulting_string += sep;

            if (has_char_escapes && opt.unescape_strings) {
                resulting_string = unescape_string(resulting_string);
            }

            if (sep === '/') {
                // regexps may have modifiers /regexp/MOD , so fetch those, too
                while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
                    resulting_string += input.charAt(parser_pos);
                    parser_pos += 1;
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {


            if (output.length === 0 && input.charAt(parser_pos) === '!') {
                // shebang
                resulting_string = c;
                while (parser_pos < input_length && c !== '\n') {
                    c = input.charAt(parser_pos);
                    resulting_string += c;
                    parser_pos += 1;
                }
                return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
            }



            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
                do {
                    c = input.charAt(parser_pos);
                    sharp += c;
                    parser_pos += 1;
                } while (parser_pos < input_length && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
                    sharp += '[]';
                    parser_pos += 2;
                } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
                    sharp += '{}';
                    parser_pos += 2;
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
            parser_pos += 3;
            c = '<!--';
            while (input.charAt(parser_pos) !== '\n' && parser_pos < input_length) {
                c += input.charAt(parser_pos);
                parser_pos++;
            }
            flags.in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
            flags.in_html_comment = false;
            parser_pos += 2;
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            return [c, 'TK_DOT'];
        }

        if (in_array(c, punct)) {
            while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
                c += input.charAt(parser_pos);
                parser_pos += 1;
                if (parser_pos >= input_length) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            } else if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }

    function handle_start_expr() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        }

        if (token_text === '[') {

            if (last_type === 'TK_WORD' || last_text === ')') {
                // this is array index specifier, break immediately
                // a[x], fn()[x]
                if (in_array(last_text, line_starters)) {
                    output_space_before_token = true;
                }
                set_mode(MODE.Expression);
                print_token();
                return;
            }

            if (is_array(flags.mode)) {
                if ((last_text === '[') ||
                    (last_last_text === ']' && last_text === ',')) {
                    // ], [ goes to new line
                    if (!opt.keep_array_indentation) {
                        print_newline();
                    }
                }
            }

        } else {
            if (last_text === 'for') {
                set_mode(MODE.ForInitializer);
            } else if (in_array(last_text, ['if', 'while'])) {
                set_mode(MODE.Conditional);
            } else {
                set_mode(MODE.Expression);
            }
        }

        if (last_text === ';' || last_type === 'TK_START_BLOCK') {
            print_newline();
        } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_text === '.') {
            if (wanted_newline) {
                print_newline();
            }
            // do nothing on (( and )( and ][ and ]( and .(
        } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
            output_space_before_token = true;
        } else if (last_word === 'function' || last_word === 'typeof') {
            // function() vs function ()
            if (opt.jslint_happy) {
                output_space_before_token = true;
            }
        } else if (in_array(last_text, line_starters) || last_text === 'catch') {
            if (opt.space_before_conditional) {
                output_space_before_token = true;
            }
        }

        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (token_text === '(') {
            if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (flags.mode !== MODE.ObjectLiteral) {
                    allow_wrap_or_preserved_newline();
                }
            }
        }
        print_token();
        if (token_text === '[') {
            set_mode(MODE.ArrayLiteral);
            indent();
        }
    }

    function handle_end_expr() {
        // statements inside expressions are not valid syntax, but...
        // statements must all be closed when their container closes
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        if (token_text === ']' && is_array(flags.mode) && flags.multiline_array && !opt.keep_array_indentation) {
            print_newline();
        }
        restore_mode();
        print_token();

        // do {} while () // no statement required after
        if (flags.do_while && flags.previous_mode === MODE.Conditional) {
            flags.previous_mode = MODE.Expression;
            flags.do_block = false;
            flags.do_while = false;

        }
    }

    function handle_start_block() {
        set_mode(MODE.BlockStatement);

        var empty_braces = is_next('}');

        if (opt.brace_style === "expand-strict") {
            if (!empty_braces) {
                print_newline();
            }
        } else if (opt.brace_style === "expand") {
            if (last_type !== 'TK_OPERATOR') {
                if (last_type === 'TK_EQUALS' ||
                    (is_special_word(last_text) && last_text !== 'else')) {
                    output_space_before_token = true;
                } else {
                    print_newline();
                }
            }
        } else { // collapse
            if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                if (last_type === 'TK_START_BLOCK') {
                    print_newline();
                } else {
                    output_space_before_token = true;
                }
            } else {
                // if TK_OPERATOR or TK_START_EXPR
                if (is_array(flags.previous_mode) && last_text === ',') {
                    if (last_last_text === '}') {
                        // }, { in array context
                        output_space_before_token = true;
                    } else {
                        print_newline(); // [a, b, c, {
                    }
                }
            }
        }
        print_token();
        indent();
    }

    function handle_end_block() {
        // statements must all be closed when their container closes
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }
        restore_mode();
        if (opt.brace_style === "expand" || opt.brace_style === "expand-strict") {
            if (last_text !== '{') {
                print_newline();
            }
        } else {
            // skip {}
            if (last_type !== 'TK_START_BLOCK') {
                if (is_array(flags.mode) && opt.keep_array_indentation) {
                    // we REALLY need a newline here, but newliner would skip that
                    opt.keep_array_indentation = false;
                    print_newline();
                    opt.keep_array_indentation = true;

                } else {
                    print_newline();
                }
            }
        }
        print_token();
    }

    function handle_word() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else if (wanted_newline && last_type !== 'TK_OPERATOR' && last_type !== 'TK_EQUALS' && (opt.preserve_newlines || last_text !== 'var')) {
            print_newline();
        }

        if (flags.do_block && !flags.do_while) {
            if (token_text === 'while') {
                // do {} ## while ()
                output_space_before_token = true;
                print_token();
                output_space_before_token = true;
                flags.do_while = true;
                return;
            } else {
                // do {} should always have while as the next word.
                // if we don't see the expected while, recover
                print_newline();
                flags.do_block = false;
            }
        }

        // if may be followed by else, or not
        // Bare/inline ifs are tricky
        // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
        if (flags.if_block) {
            if (token_text !== 'else') {
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                flags.if_block = false;
            }
        }

        if (token_text === 'function') {
            if (flags.var_line && last_type !== 'TK_EQUALS') {
                flags.var_line_reindented = true;
            }
            if ((just_added_newline() || last_text === ';') && last_text !== '{' && last_type !== 'TK_BLOCK_COMMENT' && last_type !== 'TK_COMMENT') {
                // make sure there is a nice clean space of at least one blank line
                // before a new function definition
                n_newlines = just_added_newline() ? n_newlines : 0;
                if (!opt.preserve_newlines) {
                    n_newlines = 1;
                }

                for (var i = 0; i < 2 - n_newlines; i++) {
                    print_newline(true);
                }
            }
            if (last_type === 'TK_WORD') {
                if (last_text === 'get' || last_text === 'set' || last_text === 'new' || last_text === 'return') {
                    output_space_before_token = true;
                } else {
                    print_newline();
                }
            } else if (last_type === 'TK_OPERATOR' || last_text === '=') {
                // foo = function
                output_space_before_token = true;
            } else if (is_expression(flags.mode)) {
                // (function
            } else {
                print_newline();
            }

            print_token();
            last_word = token_text;
            return;
        }

        if (token_text === 'case' || (token_text === 'default' && flags.in_case_statement)) {
            print_newline();
            if (flags.case_body) {
                // switch cases following one another
                flags.indentation_level--;
                flags.case_body = false;
            }
            print_token();
            flags.in_case = true;
            flags.in_case_statement = true;
            return;
        }

        prefix = 'NONE';

        if (last_type === 'TK_END_BLOCK') {
            if (!in_array(token_text, ['else', 'catch', 'finally'])) {
                prefix = 'NEWLINE';
            } else {
                if (opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "expand-strict") {
                    prefix = 'NEWLINE';
                } else {
                    prefix = 'SPACE';
                    output_space_before_token = true;
                }
            }
        } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
            // TODO: Should this be for STATEMENT as well?
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_STRING') {
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_WORD') {
            prefix = 'SPACE';
        } else if (last_type === 'TK_START_BLOCK') {
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_END_EXPR') {
            output_space_before_token = true;
            prefix = 'NEWLINE';
        }

        if (in_array(token_text, line_starters) && last_text !== ')') {
            if (last_text === 'else') {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }

        }

        if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
            if (flags.mode !== MODE.ObjectLiteral) {
                allow_wrap_or_preserved_newline();
            }
        }

        if (in_array(token_text, ['else', 'catch', 'finally'])) {
            if (last_type !== 'TK_END_BLOCK' || opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "expand-strict") {
                print_newline();
            } else {
                trim_output(true);
                output_space_before_token = true;
            }
        } else if (prefix === 'NEWLINE') {
            if (is_special_word(last_text)) {
                // no newline between 'return nnn'
                output_space_before_token = true;
            } else if (last_type !== 'TK_END_EXPR') {
                if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                    // no need to force newline on 'var': for (var x = 0...)
                    if (token_text === 'if' && last_word === 'else' && last_text !== '{') {
                        // no newline for } else if {
                        output_space_before_token = true;
                    } else {
                        flags.var_line = false;
                        flags.var_line_reindented = false;
                        print_newline();
                    }
                }
            } else if (in_array(token_text, line_starters) && last_text !== ')') {
                flags.var_line = false;
                flags.var_line_reindented = false;
                print_newline();
            }
        } else if (is_array(flags.mode) && last_text === ',' && last_last_text === '}') {
            print_newline(); // }, in lists get a newline treatment
        } else if (prefix === 'SPACE') {
            output_space_before_token = true;
        }
        print_token();
        last_word = token_text;

        if (token_text === 'var') {
            flags.var_line = true;
            flags.var_line_reindented = false;
            flags.var_line_tainted = false;
        }

        if (token_text === 'do') {
            flags.do_block = true;
        }

        if (token_text === 'if') {
            flags.if_block = true;
        }
    }

    function handle_semicolon() {
        while (flags.mode === MODE.Statement && !flags.if_block) {
            restore_mode();
        }
        print_token();
        flags.var_line = false;
        flags.var_line_reindented = false;
        if (flags.mode === MODE.ObjectLiteral) {
            // if we're in OBJECT mode and see a semicolon, its invalid syntax
            // recover back to treating this as a BLOCK
            flags.mode = MODE.BlockStatement;
        }
    }

    function handle_string() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // One difference - strings want at least a space before
            output_space_before_token = true;
        } else if (last_type === 'TK_WORD') {
            output_space_before_token = true;
        } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
            if (flags.mode !== MODE.ObjectLiteral) {
                allow_wrap_or_preserved_newline();
            }
        } else {
            print_newline();
        }
        print_token();
    }

    function handle_equals() {
        if (flags.var_line) {
            // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
            flags.var_line_tainted = true;
        }
        output_space_before_token = true;
        print_token();
        output_space_before_token = true;
    }

    function handle_comma() {
        if (flags.var_line) {
            if (is_expression(flags.mode) || last_type === 'TK_END_BLOCK') {
                // do not break on comma, for(var a = 1, b = 2)
                flags.var_line_tainted = false;
            }

            if (flags.var_line) {
                flags.var_line_reindented = true;
            }

            print_token();

            if (flags.var_line_tainted) {
                flags.var_line_tainted = false;
                print_newline();
            } else {
                output_space_before_token = true;
            }
            return;
        }

        if (last_type === 'TK_END_BLOCK' && flags.mode !== "(EXPRESSION)") {
            print_token();
            if (flags.mode === MODE.ObjectLiteral && last_text === '}') {
                print_newline();
            } else {
                output_space_before_token = true;
            }
        } else {
            if (flags.mode === MODE.ObjectLiteral) {
                print_token();
                print_newline();
            } else {
                // EXPR or DO_BLOCK
                print_token();
                output_space_before_token = true;
            }
        }
    }

    function handle_operator() {
        var space_before = true;
        var space_after = true;
        if (is_special_word(last_text)) {
            // "return" had a special handling in TK_WORD. Now we need to return the favor
            output_space_before_token = true;
            print_token();
            return;
        }

        // hack for actionscript's import .*;
        if (token_text === '*' && last_type === 'TK_DOT' && !last_last_text.match(/^\d+$/)) {
            print_token();
            return;
        }

        if (token_text === ':' && flags.in_case) {
            flags.case_body = true;
            indent();
            print_token();
            print_newline();
            flags.in_case = false;
            return;
        }

        if (token_text === '::') {
            // no spaces around exotic namespacing syntax operator
            print_token();
            return;
        }

        if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(last_text, line_starters) || last_text === ','))) {
            // unary operators (and binary +/- pretending to be unary) special cases

            space_before = false;
            space_after = false;

            if (last_text === ';' && is_expression(flags.mode)) {
                // for (;; ++i)
                //        ^^^
                space_before = true;
            }
            if (last_type === 'TK_WORD' && in_array(last_text, line_starters)) {
                space_before = true;
            }

            if ((flags.mode === MODE.BlockStatement || flags.mode === MODE.Statement) && (last_text === '{' || last_text === ';')) {
                // { foo; --i }
                // foo(); --bar;
                print_newline();
            }
        } else if (token_text === ':') {
            if (flags.ternary_depth === 0) {
                if (flags.mode === MODE.BlockStatement) {
                    flags.mode = MODE.ObjectLiteral;
                }
                space_before = false;
            } else {
                flags.ternary_depth -= 1;
            }
        } else if (token_text === '?') {
            flags.ternary_depth += 1;
        }
        output_space_before_token = output_space_before_token || space_before;
        print_token();
        output_space_before_token = space_after;
    }

    function handle_block_comment() {
        var lines = split_newlines(token_text);
        var j; // iterator for this case

        if (all_lines_start_with(lines.slice(1), '*')) {
            // javadoc: reformat and reindent
            print_newline(false, true);
            print_token(lines[0]);
            for (j = 1; j < lines.length; j++) {
                print_newline(false, true);
                print_token(' ' + trim(lines[j]));
            }

        } else {

            // simple block comment: leave intact
            if (lines.length > 1) {
                // multiline comment block starts with a new line
                print_newline(false, true);
            } else {
                // single-line /* comment */ stays where it is
                if (last_type === 'TK_END_BLOCK') {
                    print_newline(false, true);
                } else {
                    output_space_before_token = true;
                }

            }

            print_token(lines[0]);
            output.push("\n");
            for (j = 1; j < lines.length; j++) {
                output.push(lines[j]);
                output.push("\n");
            }

        }

        if (!is_next('\n')) {
            print_newline(false, true);
        }
    }

    function handle_inline_comment() {
        output_space_before_token = true;
        print_token();
        output_space_before_token = true;
    }

    function handle_comment() {
        if (wanted_newline) {
            print_newline(false, true);
        }
        if (last_text === ',' && !wanted_newline) {
            trim_output(true);
        }

        output_space_before_token = true;
        print_token();
        print_newline(false, true);
    }

    function handle_dot() {
        if (is_special_word(last_text)) {
            output_space_before_token = true;
        } else {
            // allow preserved newlines before dots in general
            // force newlines on dots after close paren when break_chained - for bar().baz()
            allow_wrap_or_preserved_newline(last_text === ')' && opt.break_chained_methods);
        }

        print_token();
    }

    function handle_unknown() {
        print_token();
        if (token_text[token_text.length - 1] === '\n') {
            print_newline();
        }
    }
}


// Add support for CommonJS. Just put this file somewhere on your require.paths
// and you will be able to `var js_beautify = require("beautify").js_beautify`.
if (typeof exports !== "undefined") {
    exports.js_beautify = js_beautify;
}
