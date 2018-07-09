(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("beautifier", [], factory);
	else if(typeof exports === 'object')
		exports["beautifier"] = factory();
	else
		root["beautifier"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var js_beautify = __webpack_require__(1);
var css_beautify = __webpack_require__(9);
var html_beautify = __webpack_require__(11);

function style_html(html_source, options, js, css) {
  js = js || js_beautify;
  css = css || css_beautify;
  return html_beautify(html_source, options, js, css);
}

module.exports.js = js_beautify;
module.exports.css = css_beautify;
module.exports.html = style_html;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(2).Beautifier;

function js_beautify(js_source_text, options) {
  var beautifier = new Beautifier(js_source_text, options);
  return beautifier.beautify();
}

module.exports = js_beautify;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(4);
var Output = __webpack_require__(5).Output;
var Tokenizer = __webpack_require__(6).Tokenizer;

function remove_redundant_indentation(output, frame) {
  // This implementation is effective but has some issues:
  //     - can cause line wrap to happen too soon due to indent removal
  //           after wrap points are calculated
  // These issues are minor compared to ugly indentation.

  if (frame.multiline_frame ||
    frame.mode === MODE.ForInitializer ||
    frame.mode === MODE.Conditional) {
    return;
  }

  // remove one indent from each line inside this section
  var start_index = frame.start_line_index;

  output.remove_indent(start_index);
}

function in_array(what, arr) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] === what) {
      return true;
    }
  }
  return false;
}

function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

function ltrim(s) {
  return s.replace(/^\s+/g, '');
}

// function rtrim(s) {
//     return s.replace(/\s+$/g, '');
// }


function generateMapFromStrings(list) {
  var result = {};
  for (var x = 0; x < list.length; x++) {
    // make the mapped names underscored instead of dash
    result[list[x].replace(/-/g, '_')] = list[x];
  }
  return result;
}

function sanitizeOperatorPosition(opPosition) {
  opPosition = opPosition || OPERATOR_POSITION.before_newline;

  if (!in_array(opPosition, validPositionValues)) {
    throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
      validPositionValues +
      "\nYou passed in: '" + opPosition + "'");
  }

  return opPosition;
}

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
  BlockStatement: 'BlockStatement', // 'BLOCK'
  Statement: 'Statement', // 'STATEMENT'
  ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
  ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
  ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
  Conditional: 'Conditional', //'(COND-EXPRESSION)',
  Expression: 'Expression' //'(EXPRESSION)'
};

function Beautifier(js_source_text, options) {
  "use strict";
  options = options || {};
  js_source_text = js_source_text || '';

  var output;
  var tokens = [],
    token_pos;
  var tokenizer;
  var current_token;
  var last_type, last_last_text, indent_string;
  var flags, previous_flags, flag_store;
  var prefix;

  var handlers, opt;
  var baseIndentString = '';

  handlers = {
    'TK_START_EXPR': handle_start_expr,
    'TK_END_EXPR': handle_end_expr,
    'TK_START_BLOCK': handle_start_block,
    'TK_END_BLOCK': handle_end_block,
    'TK_WORD': handle_word,
    'TK_RESERVED': handle_word,
    'TK_SEMICOLON': handle_semicolon,
    'TK_STRING': handle_string,
    'TK_EQUALS': handle_equals,
    'TK_OPERATOR': handle_operator,
    'TK_COMMA': handle_comma,
    'TK_BLOCK_COMMENT': handle_block_comment,
    'TK_COMMENT': handle_comment,
    'TK_DOT': handle_dot,
    'TK_UNKNOWN': handle_unknown,
    'TK_EOF': handle_eof
  };

  function create_flags(flags_base, mode) {
    var next_indent_level = 0;
    if (flags_base) {
      next_indent_level = flags_base.indentation_level;
      if (!output.just_added_newline() &&
        flags_base.line_indent_level > next_indent_level) {
        next_indent_level = flags_base.line_indent_level;
      }
    }

    var next_flags = {
      mode: mode,
      parent: flags_base,
      last_text: flags_base ? flags_base.last_text : '', // last token text
      last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
      declaration_statement: false,
      declaration_assignment: false,
      multiline_frame: false,
      inline_frame: false,
      if_block: false,
      else_block: false,
      do_block: false,
      do_while: false,
      import_block: false,
      in_case_statement: false, // switch(..){ INSIDE HERE }
      in_case: false, // we're on the exact line with "case 0:"
      case_body: false, // the indented case-action block
      indentation_level: next_indent_level,
      line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
      start_line_index: output.get_line_number(),
      ternary_depth: 0
    };
    return next_flags;
  }

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'js');

  opt = {};

  // compatibility, re
  if (options.brace_style === "expand-strict") { //graceful handling of deprecated option
    options.brace_style = "expand";
  } else if (options.brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
    options.brace_style = "collapse,preserve-inline";
  } else if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
    options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
  } else if (!options.brace_style) { //Nothing exists to set it
    options.brace_style = "collapse";
  }

  //preserve-inline in delimited string will trigger brace_preserve_inline, everything
  //else is considered a brace_style and the last one only will have an effect
  var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
  opt.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
  opt.brace_style = "collapse";
  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] === "preserve-inline") {
      opt.brace_preserve_inline = true;
    } else {
      opt.brace_style = brace_style_split[bs];
    }
  }

  opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  opt.indent_char = options.indent_char ? options.indent_char : ' ';
  opt.eol = options.eol ? options.eol : 'auto';
  opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  opt.unindent_chained_methods = (options.unindent_chained_methods === undefined) ? false : options.unindent_chained_methods;
  opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
  opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
  opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
  opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
  opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
  opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
  opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
  opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
  opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
  opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
  opt.e4x = (options.e4x === undefined) ? false : options.e4x;
  opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
  opt.operator_position = sanitizeOperatorPosition(options.operator_position);

  // For testing of beautify ignore:start directive
  opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

  // force opt.space_after_anon_function to true if opt.jslint_happy
  if (opt.jslint_happy) {
    opt.space_after_anon_function = true;
  }

  if (options.indent_with_tabs) {
    opt.indent_char = '\t';
    opt.indent_size = 1;
  }

  if (opt.eol === 'auto') {
    opt.eol = '\n';
    if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
      opt.eol = js_source_text.match(acorn.lineBreak)[0];
    }
  }

  opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  //----------------------------------
  indent_string = '';
  while (opt.indent_size > 0) {
    indent_string += opt.indent_char;
    opt.indent_size -= 1;
  }

  var preindent_index = 0;
  if (js_source_text && js_source_text.length) {
    while ((js_source_text.charAt(preindent_index) === ' ' ||
        js_source_text.charAt(preindent_index) === '\t')) {
      preindent_index += 1;
    }
    baseIndentString = js_source_text.substring(0, preindent_index);
    js_source_text = js_source_text.substring(preindent_index);
  }

  last_type = 'TK_START_BLOCK'; // last token type
  last_last_text = ''; // pre-last token text
  output = new Output(indent_string, baseIndentString);

  // If testing the ignore directive, start with output disable set to true
  output.raw = opt.test_output_raw;


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

  this.beautify = function() {

    /*jshint onevar:true */
    var sweet_code;
    tokenizer = new Tokenizer(js_source_text, opt, indent_string);
    tokens = tokenizer.tokenize();
    token_pos = 0;

    current_token = get_token();
    while (current_token) {
      handlers[current_token.type]();

      last_last_text = flags.last_text;
      last_type = current_token.type;
      flags.last_text = current_token.text;

      token_pos += 1;
      current_token = get_token();
    }

    sweet_code = output.get_code(opt.end_with_newline, opt.eol);

    return sweet_code;
  };

  function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
    var newlines = local_token.newlines;
    var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
    var temp_token = current_token;

    for (var h = 0; h < local_token.comments_before.length; h++) {
      // The cleanest handling of inline comments is to treat them as though they aren't there.
      // Just continue formatting and the behavior should be logical.
      // Also ignore unknown tokens.  Again, this should result in better behavior.
      current_token = local_token.comments_before[h];
      handle_whitespace_and_comments(current_token, preserve_statement_flags);
      handlers[current_token.type](preserve_statement_flags);
    }
    current_token = temp_token;

    if (keep_whitespace) {
      for (var i = 0; i < newlines; i += 1) {
        print_newline(i > 0, preserve_statement_flags);
      }
    } else {
      if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
        newlines = opt.max_preserve_newlines;
      }

      if (opt.preserve_newlines) {
        if (local_token.newlines > 1) {
          print_newline(false, preserve_statement_flags);
          for (var j = 1; j < newlines; j += 1) {
            print_newline(true, preserve_statement_flags);
          }
        }
      }
    }

  }

  // we could use just string.split, but
  // IE doesn't like returning empty strings
  function split_linebreaks(s) {
    //return s.split(/\x0d\x0a|\x0a/);

    s = s.replace(acorn.allLineBreaks, '\n');
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

  var newline_restricted_tokens = ['async', 'await', 'break', 'continue', 'return', 'throw', 'yield'];

  function allow_wrap_or_preserved_newline(force_linewrap) {
    force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

    // Never wrap the first token on a line
    if (output.just_added_newline()) {
      return;
    }

    var shouldPreserveOrForce = (opt.preserve_newlines && current_token.wanted_newline) || force_linewrap;
    var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

    if (operatorLogicApplies) {
      var shouldPrintOperatorNewline = (
          in_array(flags.last_text, tokenizer.positionable_operators) &&
          in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
        ) ||
        in_array(current_token.text, tokenizer.positionable_operators);
      shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
    }

    if (shouldPreserveOrForce) {
      print_newline(false, true);
    } else if (opt.wrap_line_length) {
      if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
        // These tokens should never have a newline inserted
        // between them and the following expression.
        return;
      }
      var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
        (output.space_before_token ? 1 : 0);
      if (proposed_line_length >= opt.wrap_line_length) {
        print_newline(false, true);
      }
    }
  }

  function print_newline(force_newline, preserve_statement_flags) {
    if (!preserve_statement_flags) {
      if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && (last_type !== 'TK_OPERATOR' || flags.last_text === '--' || flags.last_text === '++')) {
        var next_token = get_token(1);
        while (flags.mode === MODE.Statement &&
          !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
          !flags.do_block) {
          restore_mode();
        }
      }
    }

    if (output.add_new_line(force_newline)) {
      flags.multiline_frame = true;
    }
  }

  function print_token_line_indentation() {
    if (output.just_added_newline()) {
      if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
        output.current_line.push(current_token.whitespace_before);
        output.space_before_token = false;
      } else if (output.set_indent(flags.indentation_level)) {
        flags.line_indent_level = flags.indentation_level;
      }
    }
  }

  function print_token(printable_token) {
    if (output.raw) {
      output.add_raw_token(current_token);
      return;
    }

    if (opt.comma_first && last_type === 'TK_COMMA' &&
      output.just_added_newline()) {
      if (output.previous_line.last() === ',') {
        var popped = output.previous_line.pop();
        // if the comma was already at the start of the line,
        // pull back onto that line and reprint the indentation
        if (output.previous_line.is_empty()) {
          output.previous_line.push(popped);
          output.trim(true);
          output.current_line.pop();
          output.trim();
        }

        // add the comma in front of the next token
        print_token_line_indentation();
        output.add_token(',');
        output.space_before_token = true;
      }
    }

    printable_token = printable_token || current_token.text;
    print_token_line_indentation();
    output.add_token(printable_token);
  }

  function indent() {
    flags.indentation_level += 1;
  }

  function deindent() {
    if (flags.indentation_level > 0 &&
      ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
      flags.indentation_level -= 1;

    }
  }

  function set_mode(mode) {
    if (flags) {
      flag_store.push(flags);
      previous_flags = flags;
    } else {
      previous_flags = create_flags(null, mode);
    }

    flags = create_flags(previous_flags, mode);
  }

  function is_array(mode) {
    return mode === MODE.ArrayLiteral;
  }

  function is_expression(mode) {
    return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
  }

  function restore_mode() {
    if (flag_store.length > 0) {
      previous_flags = flags;
      flags = flag_store.pop();
      if (previous_flags.mode === MODE.Statement) {
        remove_redundant_indentation(output, previous_flags);
      }
    }
  }

  function start_of_object_property() {
    return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
      (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
  }

  function start_of_statement() {
    if (
      (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
      (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
      (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens) && !current_token.wanted_newline) ||
      (last_type === 'TK_RESERVED' && flags.last_text === 'else' &&
        !(current_token.type === 'TK_RESERVED' && current_token.text === 'if' && !current_token.comments_before.length)) ||
      (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
      (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement &&
        !flags.in_case &&
        !(current_token.text === '--' || current_token.text === '++') &&
        last_last_text !== 'function' &&
        current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
      (flags.mode === MODE.ObjectLiteral && (
        (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
    ) {

      set_mode(MODE.Statement);
      indent();

      handle_whitespace_and_comments(current_token, true);

      // Issue #276:
      // If starting a new statement with [if, for, while, do], push to a new line.
      // if (a) if (b) if(c) d(); else e(); else f();
      if (!start_of_object_property()) {
        allow_wrap_or_preserved_newline(
          current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
      }

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

  function each_line_matches_indent(lines, indent) {
    var i = 0,
      len = lines.length,
      line;
    for (; i < len; i++) {
      line = lines[i];
      // allow empty lines to pass through
      if (line && line.indexOf(indent) !== 0) {
        return false;
      }
    }
    return true;
  }

  function is_special_word(word) {
    return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async']);
  }

  function get_token(offset) {
    var index = token_pos + (offset || 0);
    return (index < 0 || index >= tokens.length) ? null : tokens[index];
  }

  function handle_start_expr() {
    // The conditional starts the statement if appropriate.
    if (!start_of_statement()) {
      handle_whitespace_and_comments(current_token);
    }

    var next_mode = MODE.Expression;
    if (current_token.text === '[') {

      if (last_type === 'TK_WORD' || flags.last_text === ')') {
        // this is array index specifier, break immediately
        // a[x], fn()[x]
        if (last_type === 'TK_RESERVED' && in_array(flags.last_text, tokenizer.line_starters)) {
          output.space_before_token = true;
        }
        set_mode(next_mode);
        print_token();
        indent();
        if (opt.space_in_paren) {
          output.space_before_token = true;
        }
        return;
      }

      next_mode = MODE.ArrayLiteral;
      if (is_array(flags.mode)) {
        if (flags.last_text === '[' ||
          (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
          // ], [ goes to new line
          // }, [ goes to new line
          if (!opt.keep_array_indentation) {
            print_newline();
          }
        }
      }

      if (!in_array(last_type, ['TK_START_EXPR', 'TK_END_EXPR', 'TK_WORD', 'TK_OPERATOR'])) {
        output.space_before_token = true;
      }
    } else {
      if (last_type === 'TK_RESERVED') {
        if (flags.last_text === 'for') {
          output.space_before_token = opt.space_before_conditional;
          next_mode = MODE.ForInitializer;
        } else if (in_array(flags.last_text, ['if', 'while'])) {
          output.space_before_token = opt.space_before_conditional;
          next_mode = MODE.Conditional;
        } else if (in_array(flags.last_word, ['await', 'async'])) {
          // Should be a space between await and an IIFE, or async and an arrow function
          output.space_before_token = true;
        } else if (flags.last_text === 'import' && current_token.whitespace_before === '') {
          output.space_before_token = false;
        } else if (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch') {
          output.space_before_token = true;
        }
      } else if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      } else if (last_type === 'TK_WORD') {
        output.space_before_token = false;
      } else {
        // Support preserving wrapped arrow function expressions
        // a.b('c',
        //     () => d.e
        // )
        allow_wrap_or_preserved_newline();
      }

      // function() vs function ()
      // yield*() vs yield* ()
      // function*() vs function* ()
      if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
        (flags.last_text === '*' &&
          (in_array(last_last_text, ['function', 'yield']) ||
            (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {

        output.space_before_token = opt.space_after_anon_function;
      }

    }

    if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
      print_newline();
    } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
      // do nothing on (( and )( and ][ and ]( and .(
      // TODO: Consider whether forcing this is required.  Review failing tests when removed.
      allow_wrap_or_preserved_newline(current_token.wanted_newline);
    }

    set_mode(next_mode);
    print_token();
    if (opt.space_in_paren) {
      output.space_before_token = true;
    }

    // In all cases, if we newline while inside an expression it should be indented.
    indent();
  }

  function handle_end_expr() {
    // statements inside expressions are not valid syntax, but...
    // statements must all be closed when their container closes
    while (flags.mode === MODE.Statement) {
      restore_mode();
    }

    handle_whitespace_and_comments(current_token);

    if (flags.multiline_frame) {
      allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
    }

    if (opt.space_in_paren) {
      if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
        // () [] no inner space in empty parens like these, ever, ref #320
        output.trim();
        output.space_before_token = false;
      } else {
        output.space_before_token = true;
      }
    }
    if (current_token.text === ']' && opt.keep_array_indentation) {
      print_token();
      restore_mode();
    } else {
      restore_mode();
      print_token();
    }
    remove_redundant_indentation(output, previous_flags);

    // do {} while () // no statement required after
    if (flags.do_while && previous_flags.mode === MODE.Conditional) {
      previous_flags.mode = MODE.Expression;
      flags.do_block = false;
      flags.do_while = false;

    }
  }

  function handle_start_block() {
    handle_whitespace_and_comments(current_token);

    // Check if this is should be treated as a ObjectLiteral
    var next_token = get_token(1);
    var second_token = get_token(2);
    if (second_token && (
        (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) ||
        (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
      )) {
      // We don't support TypeScript,but we didn't break it for a very long time.
      // We'll try to keep not breaking it.
      if (!in_array(last_last_text, ['class', 'interface'])) {
        set_mode(MODE.ObjectLiteral);
      } else {
        set_mode(MODE.BlockStatement);
      }
    } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
      // arrow function: (param1, paramN) => { statements }
      set_mode(MODE.BlockStatement);
    } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
      (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import', 'default']))
    ) {
      // Detecting shorthand function syntax is difficult by scanning forward,
      //     so check the surrounding context.
      // If the block is being returned, imported, export default, passed as arg,
      //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
      set_mode(MODE.ObjectLiteral);
    } else {
      set_mode(MODE.BlockStatement);
    }

    var empty_braces = !next_token.comments_before.length && next_token.text === '}';
    var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
      last_type === 'TK_END_EXPR';

    if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
    {
      // search forward for a newline wanted inside this block
      var index = 0;
      var check_token = null;
      flags.inline_frame = true;
      do {
        index += 1;
        check_token = get_token(index);
        if (check_token.wanted_newline) {
          flags.inline_frame = false;
          break;
        }
      } while (check_token.type !== 'TK_EOF' &&
        !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
    }

    if ((opt.brace_style === "expand" ||
        (opt.brace_style === "none" && current_token.wanted_newline)) &&
      !flags.inline_frame) {
      if (last_type !== 'TK_OPERATOR' &&
        (empty_anonymous_function ||
          last_type === 'TK_EQUALS' ||
          (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
        output.space_before_token = true;
      } else {
        print_newline(false, true);
      }
    } else { // collapse || inline_frame
      if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
        if (last_type === 'TK_COMMA' || opt.space_in_paren) {
          output.space_before_token = true;
        }

        if (last_type === 'TK_COMMA' || (last_type === 'TK_START_EXPR' && flags.inline_frame)) {
          allow_wrap_or_preserved_newline();
          previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
          flags.multiline_frame = false;
        }
      }
      if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
        if (last_type === 'TK_START_BLOCK' && !flags.inline_frame) {
          print_newline();
        } else {
          output.space_before_token = true;
        }
      }
    }
    print_token();
    indent();
  }

  function handle_end_block() {
    // statements must all be closed when their container closes
    handle_whitespace_and_comments(current_token);

    while (flags.mode === MODE.Statement) {
      restore_mode();
    }

    var empty_braces = last_type === 'TK_START_BLOCK';

    if (flags.inline_frame && !empty_braces) { // try inline_frame (only set if opt.braces-preserve-inline) first
      output.space_before_token = true;
    } else if (opt.brace_style === "expand") {
      if (!empty_braces) {
        print_newline();
      }
    } else {
      // skip {}
      if (!empty_braces) {
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
    restore_mode();
    print_token();
  }

  function handle_word() {
    if (current_token.type === 'TK_RESERVED') {
      if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
        current_token.type = 'TK_WORD';
      } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
        current_token.type = 'TK_WORD';
      } else if (flags.mode === MODE.ObjectLiteral) {
        var next_token = get_token(1);
        if (next_token.text === ':') {
          current_token.type = 'TK_WORD';
        }
      }
    }

    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
        flags.declaration_statement = true;
      }
    } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
      (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
      last_type !== 'TK_EQUALS' &&
      (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
      handle_whitespace_and_comments(current_token);
      print_newline();
    } else {
      handle_whitespace_and_comments(current_token);
    }

    if (flags.do_block && !flags.do_while) {
      if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
        // do {} ## while ()
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
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
      if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
        flags.else_block = true;
      } else {
        while (flags.mode === MODE.Statement) {
          restore_mode();
        }
        flags.if_block = false;
        flags.else_block = false;
      }
    }

    if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
      print_newline();
      if (flags.case_body || opt.jslint_happy) {
        // switch cases following one another
        deindent();
        flags.case_body = false;
      }
      print_token();
      flags.in_case = true;
      flags.in_case_statement = true;
      return;
    }

    if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
      if (!start_of_object_property()) {
        allow_wrap_or_preserved_newline();
      }
    }

    if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
      if (in_array(flags.last_text, ['}', ';']) ||
        (output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === 'TK_OPERATOR'))) {
        // make sure there is a nice clean space of at least one blank line
        // before a new function definition
        if (!output.just_added_blankline() && !current_token.comments_before.length) {
          print_newline();
          print_newline(true);
        }
      }
      if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
        if (last_type === 'TK_RESERVED' && (
            in_array(flags.last_text, ['get', 'set', 'new', 'export']) ||
            in_array(flags.last_text, newline_restricted_tokens))) {
          output.space_before_token = true;
        } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
          output.space_before_token = true;
        } else {
          print_newline();
        }
      } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
        // foo = function
        output.space_before_token = true;
      } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
        // (function
      } else {
        print_newline();
      }

      print_token();
      flags.last_word = current_token.text;
      return;
    }

    prefix = 'NONE';

    if (last_type === 'TK_END_BLOCK') {

      if (previous_flags.inline_frame) {
        prefix = 'SPACE';
      } else if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
        prefix = 'NEWLINE';
      } else {
        if (opt.brace_style === "expand" ||
          opt.brace_style === "end-expand" ||
          (opt.brace_style === "none" && current_token.wanted_newline)) {
          prefix = 'NEWLINE';
        } else {
          prefix = 'SPACE';
          output.space_before_token = true;
        }
      }
    } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
      // TODO: Should this be for STATEMENT as well?
      prefix = 'NEWLINE';
    } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
      prefix = 'SPACE';
    } else if (last_type === 'TK_STRING') {
      prefix = 'NEWLINE';
    } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
      (flags.last_text === '*' &&
        (in_array(last_last_text, ['function', 'yield']) ||
          (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
      prefix = 'SPACE';
    } else if (last_type === 'TK_START_BLOCK') {
      if (flags.inline_frame) {
        prefix = 'SPACE';
      } else {
        prefix = 'NEWLINE';
      }
    } else if (last_type === 'TK_END_EXPR') {
      output.space_before_token = true;
      prefix = 'NEWLINE';
    }

    if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
      if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
        prefix = 'SPACE';
      } else {
        prefix = 'NEWLINE';
      }

    }

    if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
      if ((!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
          opt.brace_style === "expand" ||
          opt.brace_style === "end-expand" ||
          (opt.brace_style === "none" && current_token.wanted_newline)) &&
        !flags.inline_frame) {
        print_newline();
      } else {
        output.trim(true);
        var line = output.current_line;
        // If we trimmed and there's something other than a close block before us
        // put a newline back in.  Handles '} // comment' scenario.
        if (line.last() !== '}') {
          print_newline();
        }
        output.space_before_token = true;
      }
    } else if (prefix === 'NEWLINE') {
      if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
        // no newline between 'return nnn'
        output.space_before_token = true;
      } else if (last_type !== 'TK_END_EXPR') {
        if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
          // no need to force newline on 'var': for (var x = 0...)
          if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
            // no newline for } else if {
            output.space_before_token = true;
          } else {
            print_newline();
          }
        }
      } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
        print_newline();
      }
    } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
      print_newline(); // }, in lists get a newline treatment
    } else if (prefix === 'SPACE') {
      output.space_before_token = true;
    }
    print_token();
    flags.last_word = current_token.text;

    if (current_token.type === 'TK_RESERVED') {
      if (current_token.text === 'do') {
        flags.do_block = true;
      } else if (current_token.text === 'if') {
        flags.if_block = true;
      } else if (current_token.text === 'import') {
        flags.import_block = true;
      } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
        flags.import_block = false;
      }
    }
  }

  function handle_semicolon() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      // Semicolon can be the start (and end) of a statement
      output.space_before_token = false;
    } else {
      handle_whitespace_and_comments(current_token);
    }

    var next_token = get_token(1);
    while (flags.mode === MODE.Statement &&
      !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
      !flags.do_block) {
      restore_mode();
    }

    // hacky but effective for the moment
    if (flags.import_block) {
      flags.import_block = false;
    }
    print_token();
  }

  function handle_string() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
      // One difference - strings want at least a space before
      output.space_before_token = true;
    } else {
      handle_whitespace_and_comments(current_token);
      if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
        output.space_before_token = true;
      } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
        if (!start_of_object_property()) {
          allow_wrap_or_preserved_newline();
        }
      } else {
        print_newline();
      }
    }
    print_token();
  }

  function handle_equals() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      handle_whitespace_and_comments(current_token);
    }

    if (flags.declaration_statement) {
      // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
      flags.declaration_assignment = true;
    }
    output.space_before_token = true;
    print_token();
    output.space_before_token = true;
  }

  function handle_comma() {
    handle_whitespace_and_comments(current_token, true);

    print_token();
    output.space_before_token = true;
    if (flags.declaration_statement) {
      if (is_expression(flags.parent.mode)) {
        // do not break on comma, for(var a = 1, b = 2)
        flags.declaration_assignment = false;
      }

      if (flags.declaration_assignment) {
        flags.declaration_assignment = false;
        print_newline(false, true);
      } else if (opt.comma_first) {
        // for comma-first, we want to allow a newline before the comma
        // to turn into a newline after the comma, which we will fixup later
        allow_wrap_or_preserved_newline();
      }
    } else if (flags.mode === MODE.ObjectLiteral ||
      (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
      if (flags.mode === MODE.Statement) {
        restore_mode();
      }

      if (!flags.inline_frame) {
        print_newline();
      }
    } else if (opt.comma_first) {
      // EXPR or DO_BLOCK
      // for comma-first, we want to allow a newline before the comma
      // to turn into a newline after the comma, which we will fixup later
      allow_wrap_or_preserved_newline();
    }
  }

  function handle_operator() {
    var isGeneratorAsterisk = current_token.text === '*' &&
      ((last_type === 'TK_RESERVED' && in_array(flags.last_text, ['function', 'yield'])) ||
        (in_array(last_type, ['TK_START_BLOCK', 'TK_COMMA', 'TK_END_BLOCK', 'TK_SEMICOLON']))
      );
    var isUnary = in_array(current_token.text, ['-', '+']) && (
      in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) ||
      in_array(flags.last_text, tokenizer.line_starters) ||
      flags.last_text === ','
    );

    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      var preserve_statement_flags = !isGeneratorAsterisk;
      handle_whitespace_and_comments(current_token, preserve_statement_flags);
    }

    if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
      // "return" had a special handling in TK_WORD. Now we need to return the favor
      output.space_before_token = true;
      print_token();
      return;
    }

    // hack for actionscript's import .*;
    if (current_token.text === '*' && last_type === 'TK_DOT') {
      print_token();
      return;
    }

    if (current_token.text === '::') {
      // no spaces around exotic namespacing syntax operator
      print_token();
      return;
    }

    // Allow line wrapping between operators when operator_position is
    //   set to before or preserve
    if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
      allow_wrap_or_preserved_newline();
    }

    if (current_token.text === ':' && flags.in_case) {
      flags.case_body = true;
      indent();
      print_token();
      print_newline();
      flags.in_case = false;
      return;
    }

    var space_before = true;
    var space_after = true;
    var in_ternary = false;
    if (current_token.text === ':') {
      if (flags.ternary_depth === 0) {
        // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
        space_before = false;
      } else {
        flags.ternary_depth -= 1;
        in_ternary = true;
      }
    } else if (current_token.text === '?') {
      flags.ternary_depth += 1;
    }

    // let's handle the operator_position option prior to any conflicting logic
    if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
      var isColon = current_token.text === ':';
      var isTernaryColon = (isColon && in_ternary);
      var isOtherColon = (isColon && !in_ternary);

      switch (opt.operator_position) {
        case OPERATOR_POSITION.before_newline:
          // if the current token is : and it's not a ternary statement then we set space_before to false
          output.space_before_token = !isOtherColon;

          print_token();

          if (!isColon || isTernaryColon) {
            allow_wrap_or_preserved_newline();
          }

          output.space_before_token = true;
          return;

        case OPERATOR_POSITION.after_newline:
          // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
          //   then print a newline.

          output.space_before_token = true;

          if (!isColon || isTernaryColon) {
            if (get_token(1).wanted_newline) {
              print_newline(false, true);
            } else {
              allow_wrap_or_preserved_newline();
            }
          } else {
            output.space_before_token = false;
          }

          print_token();

          output.space_before_token = true;
          return;

        case OPERATOR_POSITION.preserve_newline:
          if (!isOtherColon) {
            allow_wrap_or_preserved_newline();
          }

          // if we just added a newline, or the current token is : and it's not a ternary statement,
          //   then we set space_before to false
          space_before = !(output.just_added_newline() || isOtherColon);

          output.space_before_token = space_before;
          print_token();
          output.space_before_token = true;
          return;
      }
    }

    if (isGeneratorAsterisk) {
      allow_wrap_or_preserved_newline();
      space_before = false;
      var next_token = get_token(1);
      space_after = next_token && in_array(next_token.type, ['TK_WORD', 'TK_RESERVED']);
    } else if (current_token.text === '...') {
      allow_wrap_or_preserved_newline();
      space_before = last_type === 'TK_START_BLOCK';
      space_after = false;
    } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
      // unary operators (and binary +/- pretending to be unary) special cases

      space_before = false;
      space_after = false;

      // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
      // if there is a newline between -- or ++ and anything else we should preserve it.
      if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
        print_newline(false, true);
      }

      if (flags.last_text === ';' && is_expression(flags.mode)) {
        // for (;; ++i)
        //        ^^^
        space_before = true;
      }

      if (last_type === 'TK_RESERVED') {
        space_before = true;
      } else if (last_type === 'TK_END_EXPR') {
        space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
      } else if (last_type === 'TK_OPERATOR') {
        // a++ + ++b;
        // a - -b
        space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
        // + and - are not unary when preceeded by -- or ++ operator
        // a-- + b
        // a * +b
        // a - -b
        if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
          space_after = true;
        }
      }


      if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
        (flags.last_text === '{' || flags.last_text === ';')) {
        // { foo; --i }
        // foo(); --bar;
        print_newline();
      }
    }

    output.space_before_token = output.space_before_token || space_before;
    print_token();
    output.space_before_token = space_after;
  }

  function handle_block_comment(preserve_statement_flags) {
    if (output.raw) {
      output.add_raw_token(current_token);
      if (current_token.directives && current_token.directives.preserve === 'end') {
        // If we're testing the raw output behavior, do not allow a directive to turn it off.
        output.raw = opt.test_output_raw;
      }
      return;
    }

    if (current_token.directives) {
      print_newline(false, preserve_statement_flags);
      print_token();
      if (current_token.directives.preserve === 'start') {
        output.raw = true;
      }
      print_newline(false, true);
      return;
    }

    // inline block
    if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
      output.space_before_token = true;
      print_token();
      output.space_before_token = true;
      return;
    }

    var lines = split_linebreaks(current_token.text);
    var j; // iterator for this case
    var javadoc = false;
    var starless = false;
    var lastIndent = current_token.whitespace_before;
    var lastIndentLength = lastIndent.length;

    // block comment starts with a new line
    print_newline(false, preserve_statement_flags);
    if (lines.length > 1) {
      javadoc = all_lines_start_with(lines.slice(1), '*');
      starless = each_line_matches_indent(lines.slice(1), lastIndent);
    }

    // first line always indented
    print_token(lines[0]);
    for (j = 1; j < lines.length; j++) {
      print_newline(false, true);
      if (javadoc) {
        // javadoc: reformat and re-indent
        print_token(' ' + ltrim(lines[j]));
      } else if (starless && lines[j].length > lastIndentLength) {
        // starless: re-indent non-empty content, avoiding trim
        print_token(lines[j].substring(lastIndentLength));
      } else {
        // normal comments output raw
        output.add_token(lines[j]);
      }
    }

    // for comments of more than one line, make sure there's a new line after
    print_newline(false, preserve_statement_flags);
  }

  function handle_comment(preserve_statement_flags) {
    if (current_token.wanted_newline) {
      print_newline(false, preserve_statement_flags);
    } else {
      output.trim(true);
    }

    output.space_before_token = true;
    print_token();
    print_newline(false, preserve_statement_flags);
  }

  function handle_dot() {
    if (start_of_statement()) {
      // The conditional starts the statement if appropriate.
    } else {
      handle_whitespace_and_comments(current_token, true);
    }

    if (opt.unindent_chained_methods) {
      deindent();
    }

    if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
      output.space_before_token = false;
    } else {
      // allow preserved newlines before dots in general
      // force newlines on dots after close paren when break_chained - for bar().baz()
      allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
    }

    print_token();
  }

  function handle_unknown(preserve_statement_flags) {
    print_token();

    if (current_token.text[current_token.text.length - 1] === '\n') {
      print_newline(false, preserve_statement_flags);
    }
  }

  function handle_eof() {
    // Unwind any open statements
    while (flags.mode === MODE.Statement) {
      restore_mode();
    }
    handle_whitespace_and_comments(current_token);
  }
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
  var finalOpts = {};
  var name;

  for (name in allOptions) {
    if (name !== targetType) {
      finalOpts[name] = allOptions[name];
    }
  }

  //merge in the per type settings for the targetType
  if (targetType in allOptions) {
    for (name in allOptions[targetType]) {
      finalOpts[name] = allOptions[targetType][name];
    }
  }
  return finalOpts;
}

module.exports.mergeOpts = mergeOpts;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
  // permit $ (36) and @ (64). @ is used in ES7 decorators.
  if (code < 65) return code === 36 || code === 64;
  // 65 through 91 are uppercase letters.
  if (code < 91) return true;
  // permit _ (95).
  if (code < 97) return code === 95;
  // 97 through 123 are lowercase letters.
  if (code < 123) return true;
  return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
  var _character_count = 0;
  // use indent_count as a marker for lines that have preserved indentation
  var _indent_count = -1;

  var _items = [];
  var _empty = true;

  this.set_indent = function(level) {
    _character_count = parent.baseIndentLength + level * parent.indent_length;
    _indent_count = level;
  };

  this.get_character_count = function() {
    return _character_count;
  };

  this.is_empty = function() {
    return _empty;
  };

  this.last = function() {
    if (!this._empty) {
      return _items[_items.length - 1];
    } else {
      return null;
    }
  };

  this.push = function(input) {
    _items.push(input);
    _character_count += input.length;
    _empty = false;
  };

  this.pop = function() {
    var item = null;
    if (!_empty) {
      item = _items.pop();
      _character_count -= item.length;
      _empty = _items.length === 0;
    }
    return item;
  };

  this.remove_indent = function() {
    if (_indent_count > 0) {
      _indent_count -= 1;
      _character_count -= parent.indent_length;
    }
  };

  this.trim = function() {
    while (this.last() === ' ') {
      _items.pop();
      _character_count -= 1;
    }
    _empty = _items.length === 0;
  };

  this.toString = function() {
    var result = '';
    if (!this._empty) {
      if (_indent_count >= 0) {
        result = parent.indent_cache[_indent_count];
      }
      result += _items.join('');
    }
    return result;
  };
}

function Output(indent_string, baseIndentString) {
  baseIndentString = baseIndentString || '';
  this.indent_cache = [baseIndentString];
  this.baseIndentLength = baseIndentString.length;
  this.indent_length = indent_string.length;
  this.raw = false;

  var lines = [];
  this.baseIndentString = baseIndentString;
  this.indent_string = indent_string;
  this.previous_line = null;
  this.current_line = null;
  this.space_before_token = false;

  this.add_outputline = function() {
    this.previous_line = this.current_line;
    this.current_line = new OutputLine(this);
    lines.push(this.current_line);
  };

  // initialize
  this.add_outputline();


  this.get_line_number = function() {
    return lines.length;
  };

  // Using object instead of string to allow for later expansion of info about each line
  this.add_new_line = function(force_newline) {
    if (this.get_line_number() === 1 && this.just_added_newline()) {
      return false; // no newline on start of file
    }

    if (force_newline || !this.just_added_newline()) {
      if (!this.raw) {
        this.add_outputline();
      }
      return true;
    }

    return false;
  };

  this.get_code = function(end_with_newline, eol) {
    var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

    if (end_with_newline) {
      sweet_code += '\n';
    }

    if (eol !== '\n') {
      sweet_code = sweet_code.replace(/[\n]/g, eol);
    }

    return sweet_code;
  };

  this.set_indent = function(level) {
    // Never indent your first output indent at the start of the file
    if (lines.length > 1) {
      while (level >= this.indent_cache.length) {
        this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
      }

      this.current_line.set_indent(level);
      return true;
    }
    this.current_line.set_indent(0);
    return false;
  };

  this.add_raw_token = function(token) {
    for (var x = 0; x < token.newlines; x++) {
      this.add_outputline();
    }
    this.current_line.push(token.whitespace_before);
    this.current_line.push(token.text);
    this.space_before_token = false;
  };

  this.add_token = function(printable_token) {
    this.add_space_before_token();
    this.current_line.push(printable_token);
  };

  this.add_space_before_token = function() {
    if (this.space_before_token && !this.just_added_newline()) {
      this.current_line.push(' ');
    }
    this.space_before_token = false;
  };

  this.remove_indent = function(index) {
    var output_length = lines.length;
    while (index < output_length) {
      lines[index].remove_indent();
      index++;
    }
  };

  this.trim = function(eat_newlines) {
    eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

    this.current_line.trim(indent_string, baseIndentString);

    while (eat_newlines && lines.length > 1 &&
      this.current_line.is_empty()) {
      lines.pop();
      this.current_line = lines[lines.length - 1];
      this.current_line.trim();
    }

    this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
  };

  this.just_added_newline = function() {
    return this.current_line.is_empty();
  };

  this.just_added_blankline = function() {
    if (this.just_added_newline()) {
      if (lines.length === 1) {
        return true; // start of the file and newline = blank
      }

      var line = lines[lines.length - 2];
      return line.is_empty();
    }
    return false;
  };
}

module.exports.Output = Output;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var InputScanner = __webpack_require__(7).InputScanner;
var Token = __webpack_require__(8).Token;
var acorn = __webpack_require__(4);

function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

function in_array(what, arr) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] === what) {
      return true;
    }
  }
  return false;
}

function Tokenizer(input_string, opts) {

  var whitespace = "\n\r\t ".split('');
  var digit = /[0-9]/;
  var digit_bin = /[01]/;
  var digit_oct = /[01234567]/;
  var digit_hex = /[0123456789abcdefABCDEF]/;

  this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
  var punct = this.positionable_operators.concat(
    // non-positionable operators - these do not follow operator position settings
    '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...'.split(' '));

  // words which should always start on new line.
  this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
  var reserved_words = this.line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

  //  /* ... */ comment ends with nearest */ or end of file
  var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

  // comment ends just before nearest linefeed or end of file
  var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

  var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
  var directive_pattern = / (\w+)[:](\w+)/g;
  var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

  var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

  var n_newlines, whitespace_before_token, in_html_comment, tokens;
  var input;

  this.tokenize = function() {
    input = new InputScanner(input_string);
    in_html_comment = false;
    tokens = [];

    var next, last;
    var token_values;
    var open = null;
    var open_stack = [];
    var comments = [];

    while (!(last && last.type === 'TK_EOF')) {
      token_values = tokenize_next();
      next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
      while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
        if (next.type === 'TK_BLOCK_COMMENT') {
          next.directives = token_values[2];
        }
        comments.push(next);
        token_values = tokenize_next();
        next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
      }

      if (comments.length) {
        next.comments_before = comments;
        comments = [];
      }

      if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
        next.parent = last;
        open_stack.push(open);
        open = next;
      } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
        (open && (
          (next.text === ']' && open.text === '[') ||
          (next.text === ')' && open.text === '(') ||
          (next.text === '}' && open.text === '{')))) {
        next.parent = open.parent;
        next.opened = open;

        open = open_stack.pop();
      }

      tokens.push(next);
      last = next;
    }

    return tokens;
  };

  function get_directives(text) {
    if (!text.match(directives_block_pattern)) {
      return null;
    }

    var directives = {};
    directive_pattern.lastIndex = 0;
    var directive_match = directive_pattern.exec(text);

    while (directive_match) {
      directives[directive_match[1]] = directive_match[2];
      directive_match = directive_pattern.exec(text);
    }

    return directives;
  }

  function tokenize_next() {
    var resulting_string;
    var whitespace_on_this_line = [];

    n_newlines = 0;
    whitespace_before_token = '';

    var c = input.next();

    if (c === null) {
      return ['', 'TK_EOF'];
    }

    var last_token;
    if (tokens.length) {
      last_token = tokens[tokens.length - 1];
    } else {
      // For the sake of tokenizing we can pretend that there was on open brace to start
      last_token = new Token('TK_START_BLOCK', '{');
    }

    while (in_array(c, whitespace)) {

      if (acorn.newline.test(c)) {
        if (!(c === '\n' && input.peek(-2) === '\r')) {
          n_newlines += 1;
          whitespace_on_this_line = [];
        }
      } else {
        whitespace_on_this_line.push(c);
      }

      c = input.next();

      if (c === null) {
        return ['', 'TK_EOF'];
      }
    }

    if (whitespace_on_this_line.length) {
      whitespace_before_token = whitespace_on_this_line.join('');
    }

    if (digit.test(c) || (c === '.' && input.testChar(digit))) {
      var allow_decimal = true;
      var allow_e = true;
      var allow_bigint = true;
      var local_digit = digit;

      if (c === '0' && input.testChar(/[XxOoBb]/)) {
        // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
        allow_decimal = false;
        allow_e = false;
        if (input.testChar(/[Bb]/)) {
          local_digit = digit_bin;
        } else if (input.testChar(/[Oo]/)) {
          local_digit = digit_oct;
        } else {
          local_digit = digit_hex;
        }
        c += input.next();
      } else if (c === '.') {
        // Already have a decimal for this literal, don't allow another
        allow_decimal = false;
        allow_bigint = false;
      } else {
        // we know this first loop will run.  It keeps the logic simpler.
        c = '';
        input.back();
      }

      // Add the digits
      while (input.testChar(local_digit)) {
        c += input.next();

        if (allow_decimal && input.peek() === '.') {
          c += input.next();
          allow_decimal = false;
          allow_bigint = false;
        }

        // a = 1.e-7 is valid, so we test for . then e in one loop
        if (allow_e && input.testChar(/[Ee]/)) {
          c += input.next();

          if (input.testChar(/[+-]/)) {
            c += input.next();
          }

          allow_e = false;
          allow_decimal = false;
          allow_bigint = false;
        }
      }

      if (allow_bigint && input.peek() === 'n') {
        c += input.next();
      }

      return [c, 'TK_WORD'];
    }

    if (acorn.isIdentifierStart(input.peekCharCode(-1))) {
      if (input.hasNext()) {
        while (acorn.isIdentifierChar(input.peekCharCode())) {
          c += input.next();
          if (!input.hasNext()) {
            break;
          }
        }
      }

      if (!(last_token.type === 'TK_DOT' ||
          (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) &&
        in_array(c, reserved_words)) {
        if (c === 'in' || c === 'of') { // hack for 'in' and 'of' operators
          return [c, 'TK_OPERATOR'];
        }
        return [c, 'TK_RESERVED'];
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
      var comment_match;
      // peek for comment /* ... */
      if (input.peek() === '*') {
        input.next();
        comment_match = input.match(block_comment_pattern);
        comment = '/*' + comment_match[0];
        var directives = get_directives(comment);
        if (directives && directives.ignore === 'start') {
          comment_match = input.match(directives_end_ignore_pattern);
          comment += comment_match[0];
        }
        comment = comment.replace(acorn.allLineBreaks, '\n');
        return [comment, 'TK_BLOCK_COMMENT', directives];
      }
      // peek for comment // ...
      if (input.peek() === '/') {
        input.next();
        comment_match = input.match(comment_pattern);
        comment = '//' + comment_match[0];
        return [comment, 'TK_COMMENT'];
      }

    }

    var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

    if (c === '`' || c === "'" || c === '"' || // string
      (
        (c === '/') || // regexp
        (opts.e4x && c === "<" && input.test(startXmlRegExp, -1)) // xml
      ) && ( // regex and xml can only appear in specific locations during parsing
        (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
        (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
          last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
        (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
          'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
        ]))
      )) {

      var sep = c,
        esc = false,
        has_char_escapes = false;

      resulting_string = c;

      if (sep === '/') {
        //
        // handle regexp
        //
        var in_char_class = false;
        while (input.hasNext() &&
          ((esc || in_char_class || input.peek() !== sep) &&
            !input.testChar(acorn.newline))) {
          resulting_string += input.peek();
          if (!esc) {
            esc = input.peek() === '\\';
            if (input.peek() === '[') {
              in_char_class = true;
            } else if (input.peek() === ']') {
              in_char_class = false;
            }
          } else {
            esc = false;
          }
          input.next();
        }
      } else if (opts.e4x && sep === '<') {
        //
        // handle e4x xml literals
        //

        var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
        input.back();
        var xmlStr = '';
        var match = input.match(startXmlRegExp);
        if (match) {
          // Trim root tag to attempt to
          var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
          var isCurlyRoot = rootTag.indexOf('{') === 0;
          var depth = 0;
          while (match) {
            var isEndTag = !!match[1];
            var tagName = match[2];
            var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
            if (!isSingletonTag &&
              (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
              if (isEndTag) {
                --depth;
              } else {
                ++depth;
              }
            }
            xmlStr += match[0];
            if (depth <= 0) {
              break;
            }
            match = input.match(xmlRegExp);
          }
          // if we didn't close correctly, keep unformatted.
          if (!match) {
            xmlStr += input.match(/[\s\S]*/g)[0];
          }
          xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
          return [xmlStr, "TK_STRING"];
        }
      } else {
        //
        // handle string
        //
        var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
          // Template strings can travers lines without escape characters.
          // Other strings cannot
          var current_char;
          while (input.hasNext()) {
            current_char = input.peek();
            if (!(esc || (current_char !== delimiter &&
                (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
              break;
            }

            // Handle \r\n linebreaks after escapes or in template strings
            if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
              if (current_char === '\r' && input.peek(1) === '\n') {
                input.next();
                current_char = input.peek();
              }
              resulting_string += '\n';
            } else {
              resulting_string += current_char;
            }

            if (esc) {
              if (current_char === 'x' || current_char === 'u') {
                has_char_escapes = true;
              }
              esc = false;
            } else {
              esc = current_char === '\\';
            }

            input.next();

            if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
              if (delimiter === '`') {
                parse_string('}', allow_unescaped_newlines, '`');
              } else {
                parse_string('`', allow_unescaped_newlines, '${');
              }

              if (input.hasNext()) {
                resulting_string += input.next();
              }
            }
          }
        };

        if (sep === '`') {
          parse_string('`', true, '${');
        } else {
          parse_string(sep);
        }
      }

      if (has_char_escapes && opts.unescape_strings) {
        resulting_string = unescape_string(resulting_string);
      }

      if (input.peek() === sep) {
        resulting_string += sep;
        input.next();

        if (sep === '/') {
          // regexps may have modifiers /regexp/MOD , so fetch those, too
          // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
          while (input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {
            resulting_string += input.next();
          }
        }
      }
      return [resulting_string, 'TK_STRING'];
    }

    if (c === '#') {

      if (tokens.length === 0 && input.peek() === '!') {
        // shebang
        resulting_string = c;
        while (input.hasNext() && c !== '\n') {
          c = input.next();
          resulting_string += c;
        }
        return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
      }



      // Spidermonkey-specific sharp variables for circular references
      // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
      // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
      var sharp = '#';
      if (input.hasNext() && input.testChar(digit)) {
        do {
          c = input.next();
          sharp += c;
        } while (input.hasNext() && c !== '#' && c !== '=');
        if (c === '#') {
          //
        } else if (input.peek() === '[' && input.peek(1) === ']') {
          sharp += '[]';
          input.next();
          input.next();
        } else if (input.peek() === '{' && input.peek(1) === '}') {
          sharp += '{}';
          input.next();
          input.next();
        }
        return [sharp, 'TK_WORD'];
      }
    }

    if (c === '<' && (input.peek() === '?' || input.peek() === '%')) {
      input.back();
      var template_match = input.match(template_pattern);
      if (template_match) {
        c = template_match[0];
        c = c.replace(acorn.allLineBreaks, '\n');
        return [c, 'TK_STRING'];
      }
    }

    if (c === '<' && input.match(/\!--/g)) {
      c = '<!--';
      while (input.hasNext() && !input.testChar(acorn.newline)) {
        c += input.next();
      }
      in_html_comment = true;
      return [c, 'TK_COMMENT'];
    }

    if (c === '-' && in_html_comment && input.match(/->/g)) {
      in_html_comment = false;
      return ['-->', 'TK_COMMENT'];
    }

    if (c === '.') {
      if (input.peek() === '.' && input.peek(1) === '.') {
        c += input.next() + input.next();
        return [c, 'TK_OPERATOR'];
      }
      return [c, 'TK_DOT'];
    }

    if (in_array(c, punct)) {
      while (input.hasNext() && in_array(c + input.peek(), punct)) {
        c += input.next();
        if (!input.hasNext()) {
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


  function unescape_string(s) {
    // You think that a regex would work for this
    // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
    //         return String.fromCharCode(parseInt(val, 16));
    //     })
    // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
    var out = '',
      escaped = 0;

    var input_scan = new InputScanner(s);
    var matched = null;

    while (input_scan.hasNext()) {
      // Keep any whitespace, non-slash characters
      // also keep slash pairs.
      matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

      if (matched) {
        out += matched[0];
      }

      if (input_scan.peek() === '\\') {
        input_scan.next();
        if (input_scan.peek() === 'x') {
          matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
        } else if (input_scan.peek() === 'u') {
          matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
        } else {
          out += '\\';
          if (input_scan.hasNext()) {
            out += input_scan.next();
          }
          continue;
        }

        // If there's some error decoding, return the original string
        if (!matched) {
          return s;
        }

        escaped = parseInt(matched[1], 16);

        if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
          // we bail out on \x7f..\xff,
          // leaving whole string escaped,
          // as it's probably completely binary
          return s;
        } else if (escaped >= 0x00 && escaped < 0x20) {
          // leave 0x00...0x1f escaped
          out += '\\' + matched[0];
          continue;
        } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
          // single-quote, apostrophe, backslash - escape these
          out += '\\' + String.fromCharCode(escaped);
        } else {
          out += String.fromCharCode(escaped);
        }
      }
    }

    return out;
  }
}

module.exports.Tokenizer = Tokenizer;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function InputScanner(input) {
  var _input = input || '';
  var _input_length = _input.length;
  var _position = 0;

  this.back = function() {
    _position -= 1;
  };

  this.hasNext = function() {
    return _position < _input_length;
  };

  this.next = function() {
    var val = null;
    if (this.hasNext()) {
      val = _input.charAt(_position);
      _position += 1;
    }
    return val;
  };

  this.peek = function(index) {
    var val = null;
    index = index || 0;
    index += _position;
    if (index >= 0 && index < _input_length) {
      val = _input.charAt(index);
    }
    return val;
  };

  this.peekCharCode = function(index) {
    var val = 0;
    index = index || 0;
    index += _position;
    if (index >= 0 && index < _input_length) {
      val = _input.charCodeAt(index);
    }
    return val;
  };

  this.test = function(pattern, index) {
    index = index || 0;
    pattern.lastIndex = _position + index;
    return pattern.test(_input);
  };

  this.testChar = function(pattern, index) {
    var val = this.peek(index);
    return val !== null && pattern.test(val);
  };

  this.match = function(pattern) {
    pattern.lastIndex = _position;
    var pattern_match = pattern.exec(_input);
    if (pattern_match && pattern_match.index === _position) {
      _position += pattern_match[0].length;
    } else {
      pattern_match = null;
    }
    return pattern_match;
  };
}


module.exports.InputScanner = InputScanner;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function Token(type, text, newlines, whitespace_before, parent) {
  this.type = type;
  this.text = text;

  // comments_before are
  // comments that have a new line before them
  // and may or may not have a newline after
  // this is a set of comments before
  this.comments_before = /* inline comment*/ [];


  this.comments_after = []; // no new line before and newline after
  this.newlines = newlines || 0;
  this.wanted_newline = newlines > 0;
  this.whitespace_before = whitespace_before || '';
  this.parent = parent || null;
  this.opened = null;
  this.directives = null;
}

module.exports.Token = Token;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(10).Beautifier;

function css_beautify(source_text, options) {
  var beautifier = new Beautifier(source_text, options);
  return beautifier.beautify();
}

module.exports = css_beautify;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(4);
var Output = __webpack_require__(5).Output;


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

function Beautifier(source_text, options) {
  source_text = source_text || '';
  options = options || {};

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'css');

  var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  var indentCharacter = options.indent_char || ' ';
  var preserve_newlines = (options.preserve_newlines === undefined) ? false : options.preserve_newlines;
  var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
  var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
  var space_around_combinator = (options.space_around_combinator === undefined) ? false : options.space_around_combinator;
  space_around_combinator = space_around_combinator || ((options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator);
  var eol = options.eol ? options.eol : 'auto';

  if (options.indent_with_tabs) {
    indentCharacter = '\t';
    indentSize = 1;
  }

  if (eol === 'auto') {
    eol = '\n';
    if (source_text && lineBreak.test(source_text || '')) {
      eol = source_text.match(lineBreak)[0];
    }
  }

  eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  // HACK: newline parsing inconsistent. This brute force normalizes the input.
  source_text = source_text.replace(allLineBreaks, '\n');

  // tokenizer
  var whiteRe = /^\s+$/;

  var pos = -1,
    ch;
  var parenLevel = 0;

  function next() {
    ch = source_text.charAt(++pos);
    return ch || '';
  }

  function peek(index) {
    index = index || 0;
    index += pos + 1;
    var result = source_text.charAt(index) || '';
    return result;
  }

  function peekIgnoreWhitespace(index) {
    var prev_pos = pos;
    eatWhitespace();
    var result = peek(index);
    pos = prev_pos - 1;
    next();
    return result;
  }

  function eatString(endChars) {
    var start = pos;
    while (next()) {
      if (ch === "\\") {
        next();
      } else if (endChars.indexOf(ch) !== -1) {
        break;
      } else if (ch === "\n") {
        break;
      }
    }
    return source_text.substring(start, pos + 1);
  }

  function peekString(endChar) {
    var prev_pos = pos;
    var str = eatString(endChar);
    pos = prev_pos - 1;
    next();
    return str;
  }

  // Skips any white space in the source text from the current position.
  // When allowAtLeastOneNewLine is true, will output new lines for each
  // newline character found; if the user has preserve_newlines off, only
  // the first newline will be output
  function eatWhitespace(allowAtLeastOneNewLine) {
    var result = whiteRe.test(peek());
    var isFirstNewLine = true;

    while (whiteRe.test(peek())) {
      next();
      if (allowAtLeastOneNewLine && ch === '\n') {
        if (preserve_newlines || isFirstNewLine) {
          isFirstNewLine = false;
          output.add_new_line(true);
        }
      }
    }
    return result;
  }

  function skipWhitespace() {
    var result = '';
    if (ch && whiteRe.test(ch)) {
      result = ch;
    }
    while (whiteRe.test(next())) {
      result += ch;
    }
    return result;
  }

  function eatComment(singleLine) {
    var start = pos;
    if (!singleLine) {
      next();
    }
    while (next()) {
      if (!singleLine && ch === "*" && peek() === "/") {
        next();
        break;
      } else if (singleLine && peek() === "\n") {
        break;
      }
    }

    return source_text.substring(start, pos) + ch;
  }


  function lookBack(str) {
    return source_text.substring(pos - str.length, pos).toLowerCase() ===
      str;
  }

  // Nested pseudo-class if we are insideRule
  // and the next special character found opens
  // a new block
  function foundNestedPseudoClass() {
    var openParen = 0;
    for (var i = pos + 1; i < source_text.length; i++) {
      var ch = source_text.charAt(i);
      if (ch === "{") {
        return true;
      } else if (ch === '(') {
        // pseudoclasses can contain ()
        openParen += 1;
      } else if (ch === ')') {
        if (openParen === 0) {
          return false;
        }
        openParen -= 1;
      } else if (ch === ";" || ch === "}") {
        return false;
      }
    }
    return false;
  }

  // printer
  var baseIndentString = '';
  var preindent_index = 0;
  if (source_text && source_text.length) {
    while ((source_text.charAt(preindent_index) === ' ' ||
        source_text.charAt(preindent_index) === '\t')) {
      preindent_index += 1;
    }
    baseIndentString = source_text.substring(0, preindent_index);
    source_text = source_text.substring(preindent_index);
  }


  var singleIndent = new Array(indentSize + 1).join(indentCharacter);
  var indentLevel;
  var nestedLevel;
  var output;

  function print_string(output_string) {
    if (output.just_added_newline()) {
      output.set_indent(indentLevel);
    }
    output.add_token(output_string);
  }

  function preserveSingleSpace(isAfterSpace) {
    if (isAfterSpace) {
      output.space_before_token = true;
    }
  }

  function indent() {
    indentLevel++;
  }

  function outdent() {
    if (indentLevel > 0) {
      indentLevel--;
    }
  }

  /*_____________________--------------------_____________________*/

  this.beautify = function() {
    // reset
    output = new Output(singleIndent, baseIndentString);
    indentLevel = 0;
    nestedLevel = 0;

    pos = -1;
    ch = null;
    parenLevel = 0;

    var insideRule = false;
    var insidePropertyValue = false;
    var enteringConditionalGroup = false;
    var insideAtExtend = false;
    var top_ch = '';
    var last_top_ch = '';

    while (true) {
      var whitespace = skipWhitespace();
      var isAfterSpace = whitespace !== '';
      last_top_ch = top_ch;
      top_ch = ch;

      if (!ch) {
        break;
      } else if (ch === '/' && peek() === '*') {
        // /* css comment */
        // Always start block comments on a new line.
        // This handles scenarios where a block comment immediately
        // follows a property definition on the same line or where
        // minified code is being beautified.
        output.add_new_line();
        print_string(eatComment(false));

        // Ensures any new lines following the comment are preserved
        eatWhitespace(true);

        // Block comments are followed by a new line so they don't
        // share a line with other properties
        output.add_new_line();
      } else if (ch === '/' && peek() === '/') {
        // // single line comment
        // Preserves the space before a comment
        // on the same line as a rule
        output.space_before_token = true;
        print_string(eatComment(true));

        // Ensures any new lines following the comment are preserved
        eatWhitespace(true);
      } else if (ch === '@') {
        preserveSingleSpace(isAfterSpace);

        // deal with less propery mixins @{...}
        if (peek() === '{') {
          print_string(eatString('}'));
        } else {
          print_string(ch);

          // strip trailing space, if present, for hash property checks
          var variableOrRule = peekString(": ,;{}()[]/='\"");

          if (variableOrRule.match(/[ :]$/)) {
            // we have a variable or pseudo-class, add it and insert one space before continuing
            next();
            variableOrRule = eatString(": ").replace(/\s$/, '');
            print_string(variableOrRule);
            output.space_before_token = true;
          }

          variableOrRule = variableOrRule.replace(/\s$/, '');

          if (variableOrRule === 'extend') {
            insideAtExtend = true;
          }

          // might be a nesting at-rule
          if (variableOrRule in this.NESTED_AT_RULE) {
            nestedLevel += 1;
            if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
              enteringConditionalGroup = true;
            }
          }
        }
      } else if (ch === '#' && peek() === '{') {
        preserveSingleSpace(isAfterSpace);
        print_string(eatString('}'));
      } else if (ch === '{') {
        if (peekIgnoreWhitespace() === '}') {
          eatWhitespace();
          next();
          output.space_before_token = true;
          print_string("{}");

          eatWhitespace(true);
          output.add_new_line();

          if (newline_between_rules && indentLevel === 0 && !output.just_added_blankline()) {
            output.add_new_line(true);
          }
        } else {
          indent();
          output.space_before_token = true;
          print_string(ch);
          eatWhitespace(true);
          output.add_new_line();

          // when entering conditional groups, only rulesets are allowed
          if (enteringConditionalGroup) {
            enteringConditionalGroup = false;
            insideRule = (indentLevel > nestedLevel);
          } else {
            // otherwise, declarations are also allowed
            insideRule = (indentLevel >= nestedLevel);
          }
        }
      } else if (ch === '}') {
        outdent();
        output.add_new_line();
        print_string(ch);
        insideRule = false;
        insidePropertyValue = false;
        if (nestedLevel) {
          nestedLevel--;
        }

        eatWhitespace(true);
        output.add_new_line();

        if (newline_between_rules && indentLevel === 0 && !output.just_added_blankline()) {
          output.add_new_line(true);
        }
      } else if (ch === ":") {
        eatWhitespace();
        if ((insideRule || enteringConditionalGroup) &&
          !(lookBack("&") || foundNestedPseudoClass()) &&
          !lookBack("(") && !insideAtExtend) {
          // 'property: value' delimiter
          // which could be in a conditional group query
          print_string(':');
          if (!insidePropertyValue) {
            insidePropertyValue = true;
            output.space_before_token = true;
          }
        } else {
          // sass/less parent reference don't use a space
          // sass nested pseudo-class don't use a space

          // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
          if (lookBack(" ")) {
            output.space_before_token = true;
          }
          if (peek() === ":") {
            // pseudo-element
            next();
            print_string("::");
          } else {
            // pseudo-class
            print_string(':');
          }
        }
      } else if (ch === '"' || ch === '\'') {
        preserveSingleSpace(isAfterSpace);
        print_string(eatString(ch));
      } else if (ch === ';') {
        insidePropertyValue = false;
        insideAtExtend = false;
        print_string(ch);
        eatWhitespace(true);

        // This maintains single line comments on the same
        // line. Block comments are also affected, but
        // a new line is always output before one inside
        // that section
        if (peek() !== '/') {
          output.add_new_line();
        }
      } else if (ch === '(') { // may be a url
        if (lookBack("url")) {
          print_string(ch);
          eatWhitespace();
          if (next()) {
            if (ch !== ')' && ch !== '"' && ch !== '\'') {
              print_string(eatString(')'));
            } else {
              pos--;
              parenLevel++;
            }
          }
        } else {
          parenLevel++;
          preserveSingleSpace(isAfterSpace);
          print_string(ch);
          eatWhitespace();
        }
      } else if (ch === ')') {
        print_string(ch);
        parenLevel--;
      } else if (ch === ',') {
        print_string(ch);
        eatWhitespace(true);
        if (selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
          output.add_new_line();
        } else {
          output.space_before_token = true;
        }
      } else if ((ch === '>' || ch === '+' || ch === '~') &&
        !insidePropertyValue && parenLevel < 1) {
        //handle combinator spacing
        if (space_around_combinator) {
          output.space_before_token = true;
          print_string(ch);
          output.space_before_token = true;
        } else {
          print_string(ch);
          eatWhitespace();
          // squash extra whitespace
          if (ch && whiteRe.test(ch)) {
            ch = '';
          }
        }
      } else if (ch === ']') {
        print_string(ch);
      } else if (ch === '[') {
        preserveSingleSpace(isAfterSpace);
        print_string(ch);
      } else if (ch === '=') { // no whitespace before or after
        eatWhitespace();
        print_string('=');
        if (whiteRe.test(ch)) {
          ch = '';
        }
      } else if (ch === '!') { // !important
        print_string(' ');
        print_string(ch);
      } else {
        preserveSingleSpace(isAfterSpace);
        print_string(ch);
      }
    }

    var sweetCode = output.get_code(end_with_newline, eol);

    return sweetCode;
  };

  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  this.NESTED_AT_RULE = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    // also in CONDITIONAL_GROUP_RULE below
    "@media": true,
    "@supports": true,
    "@document": true
  };
  this.CONDITIONAL_GROUP_RULE = {
    "@media": true,
    "@supports": true,
    "@document": true
  };
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(12).Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
  var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
  return beautifier.beautify();
}

module.exports = style_html;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(4);


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

// function trim(s) {
//     return s.replace(/^\s+|\s+$/g, '');
// }

function ltrim(s) {
  return s.replace(/^\s+/g, '');
}

function rtrim(s) {
  return s.replace(/\s+$/g, '');
}

function Beautifier(html_source, options, js_beautify, css_beautify) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.
  html_source = html_source || '';
  options = options || {};

  var multi_parser,
    indent_inner_html,
    indent_body_inner_html,
    indent_head_inner_html,
    indent_size,
    indent_character,
    wrap_line_length,
    brace_style,
    inline_tags,
    unformatted,
    content_unformatted,
    preserve_newlines,
    max_preserve_newlines,
    indent_handlebars,
    wrap_attributes,
    wrap_attributes_indent_size,
    is_wrap_attributes_force,
    is_wrap_attributes_force_expand_multiline,
    is_wrap_attributes_force_aligned,
    is_wrap_attributes_aligned_multiple,
    end_with_newline,
    extra_liners,
    eol;

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'html');

  // backwards compatibility to 1.3.4
  if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
    (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
    options.wrap_line_length = options.max_char;
  }

  indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
  indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
  indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
  indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
  indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
  brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
  wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
  inline_tags = options.inline || [
    // https://www.w3.org/TR/html5/dom.html#phrasing-content
    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
    'video', 'wbr', 'text',
    // prexisting - not sure of full effect of removing, leaving in
    'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
  ];
  unformatted = options.unformatted || [];
  content_unformatted = options.content_unformatted || [
    'pre', 'textarea'
  ];
  preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  max_preserve_newlines = preserve_newlines ?
    (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
    0;
  indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
  wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
  wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
  is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
  is_wrap_attributes_force_expand_multiline = (wrap_attributes === 'force-expand-multiline');
  is_wrap_attributes_force_aligned = (wrap_attributes === 'force-aligned');
  is_wrap_attributes_aligned_multiple = (wrap_attributes === 'aligned-multiple');
  end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
    options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
    options.extra_liners.split(',') : 'head,body,/html'.split(',');
  eol = options.eol ? options.eol : 'auto';

  if (options.indent_with_tabs) {
    indent_character = '\t';
    indent_size = 1;
  }

  if (eol === 'auto') {
    eol = '\n';
    if (html_source && lineBreak.test(html_source || '')) {
      eol = html_source.match(lineBreak)[0];
    }
  }

  eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  // HACK: newline parsing inconsistent. This brute force normalizes the input.
  html_source = html_source.replace(allLineBreaks, '\n');

  function Parser() {

    this.pos = 0; //Parser position
    this.token = '';
    this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
    this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
      parent: 'parent1',
      parentcount: 1,
      parent1: ''
    };
    this.last_token = {
      text: '',
      type: ''
    };
    this.token_text = '';
    this.newlines = 0;
    this.indent_content = indent_inner_html;
    this.indent_body_inner_html = indent_body_inner_html;
    this.indent_head_inner_html = indent_head_inner_html;

    this.Utils = { //Uilities made available to the various functions
      whitespace: "\n\r\t ".split(''),

      single_token: options.void_elements || [
        // HTLM void elements - aka self-closing tags - aka singletons
        // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
        'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
        // NOTE: Optional tags - are not understood.
        // https://www.w3.org/TR/html5/syntax.html#optional-tags
        // The rules for optional tags are too complex for a simple list
        // Also, the content of these tags should still be indented in many cases.
        // 'li' is a good exmple.

        // Doctype and xml elements
        '!doctype', '?xml',
        // ?php and ?= tags
        '?php', '?=',
        // other tags that were in this list, keeping just in case
        'basefont', 'isindex'
      ],
      extra_liners: extra_liners, //for tags that need a line of whitespace before them
      in_array: function(what, arr) {
        for (var i = 0; i < arr.length; i++) {
          if (what === arr[i]) {
            return true;
          }
        }
        return false;
      },
    };

    // Return true if the given text is composed entirely of whitespace.
    this.is_whitespace = function(text) {
      for (var n = 0; n < text.length; n++) {
        if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
          return false;
        }
      }
      return true;
    };

    this.traverse_whitespace = function() {
      var input_char = '';

      input_char = this.input.charAt(this.pos);
      if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
        this.newlines = 0;
        while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
            this.newlines += 1;
          }

          this.pos++;
          input_char = this.input.charAt(this.pos);
        }
        return true;
      }
      return false;
    };

    // Append a space to the given content (string array) or, if we are
    // at the wrap_line_length, append a newline/indentation.
    // return true if a newline was added, false if a space was added
    this.space_or_wrap = function(content) {
      if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
        this.print_newline(false, content);
        this.print_indentation(content);
        return true;
      } else {
        this.line_char_count++;
        content.push(' ');
        return false;
      }
    };

    this.get_content = function() { //function to capture regular content between tags
      var input_char = '',
        token = {
          text: '',
          type: 'TK_CONTENT'
        },
        content = [],
        handlebarsStarted = 0;

      while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
        if (this.pos >= this.input.length) {
          if (!content.length) {
            token.type = 'TK_EOF';
          }
          break;
        }

        if (handlebarsStarted < 2 && this.traverse_whitespace()) {
          this.space_or_wrap(content);
          continue;
        }

        input_char = this.input.charAt(this.pos);

        if (indent_handlebars) {
          if (input_char === '{') {
            handlebarsStarted += 1;
          } else if (handlebarsStarted < 2) {
            handlebarsStarted = 0;
          }

          if (input_char === '}' && handlebarsStarted > 0) {
            if (handlebarsStarted-- === 0) {
              break;
            }
          }
          // Handlebars parsing is complicated.
          // {{#foo}} and {{/foo}} are formatted tags.
          // {{something}} should get treated as content, except:
          // {{else}} specifically behaves like {{#if}} and {{/if}}
          var peek3 = this.input.substr(this.pos, 3);
          if (peek3 === '{{#' || peek3 === '{{/') {
            // These are tags and not content.
            break;
          } else if (peek3 === '{{!') {
            token = this.get_tag();
            token.type = 'TK_TAG_HANDLEBARS_COMMENT';
            return token;
          } else if (this.input.substr(this.pos, 2) === '{{') {
            if (this.get_tag(true).text === '{{else}}') {
              break;
            }
          }
        }

        this.pos++;
        this.line_char_count++;
        content.push(input_char); //letter at-a-time (or string) inserted to an array
      }
      token.text = content.join('');
      return token;
    };

    this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
      if (this.pos === this.input.length) {
        return { text: '', type: 'TK_EOF' };
      }
      var content = '';
      var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
      reg_match.lastIndex = this.pos;
      var reg_array = reg_match.exec(this.input);
      var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
      if (this.pos < end_script) { //get everything in between the script tags
        content = this.input.substring(this.pos, end_script);
        this.pos = end_script;
      }
      return { text: content, type: 'TK_' + name };
    };

    this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
      if (this.tags[tag + 'count']) { //check for the existence of this tag type
        this.tags[tag + 'count']++;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      } else { //otherwise initialize this tag type
        this.tags[tag + 'count'] = 1;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
      this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
    };

    this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
      if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
        while (temp_parent) { //till we reach '' (the initial value);
          if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
            break;
          }
          temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
        }
        if (temp_parent) { //if we caught something
          this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
          this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
        }
        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
        if (this.tags[tag + 'count'] === 1) {
          delete this.tags[tag + 'count'];
        } else {
          this.tags[tag + 'count']--;
        }
      }
    };

    this.indent_to_tag = function(tag) {
      // Match the indentation level to the last use of this tag, but don't remove it.
      if (!this.tags[tag + 'count']) {
        return;
      }
      var temp_parent = this.tags.parent;
      while (temp_parent) {
        if (tag + this.tags[tag + 'count'] === temp_parent) {
          break;
        }
        temp_parent = this.tags[temp_parent + 'parent'];
      }
      if (temp_parent) {
        this.indent_level = this.tags[tag + this.tags[tag + 'count']];
      }
    };

    this.get_tag = function(peek) { //function to get a full tag and parse its type
      var input_char = '',
        token = {
          text: '',
          type: '',
          tag_type: '',
          tag_name: '',
          is_inline_tag: false,
          is_opening_tag: false,
          is_closing_tag: false
        },
        content = [],
        comment = '',
        space = false,
        first_attr = true,
        has_wrapped_attrs = false,
        tag_start, tag_end,
        tag_start_char,
        orig_pos = this.pos,
        orig_line_char_count = this.line_char_count,
        is_tag_closed = false,
        tail;

      peek = peek !== undefined ? peek : false;

      do {
        if (this.pos >= this.input.length) {
          if (peek) {
            this.pos = orig_pos;
            this.line_char_count = orig_line_char_count;
          }
          if (content.length) {
            token.text = content.join('');
          } else {
            token.type = 'TK_EOF';
          }

          return token;
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
          space = true;
          continue;
        }

        if (input_char === "'" || input_char === '"') {
          input_char += this.get_unformatted(input_char);
          space = true;
        }

        if (input_char === '=') { //no space before =
          space = false;
        }
        tail = this.input.substr(this.pos - 1);
        if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
          if (tail.match(/^\/?\s*>/)) {
            space = false;
            is_tag_closed = true;
            this.print_newline(false, content);
            this.print_indentation(content);
          }
        }
        if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
          //no space after = or before >
          var wrapped = this.space_or_wrap(content);
          var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
          space = false;

          if (is_wrap_attributes_force && input_char !== '/') {
            var force_first_attr_wrap = false;
            if (is_wrap_attributes_force_expand_multiline && first_attr) {
              var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
              force_first_attr_wrap = !is_only_attribute;
            }
            if (!first_attr || force_first_attr_wrap) {
              this.print_newline(false, content);
              this.print_indentation(content);
              indentAttrs = true;
            }
          }
          if (indentAttrs) {
            has_wrapped_attrs = true;

            //indent attributes an auto, forced, aligned or forced-align line-wrap
            var alignment_size = wrap_attributes_indent_size;
            if (is_wrap_attributes_force_aligned || is_wrap_attributes_aligned_multiple) {
              alignment_size = content.indexOf(' ') + 1;
            }

            for (var count = 0; count < alignment_size; count++) {
              // only ever further indent with spaces since we're trying to align characters
              content.push(' ');
            }
          }
          if (first_attr) {
            for (var i = 0; i < content.length; i++) {
              if (content[i] === ' ') {
                first_attr = false;
                break;
              }
            }
          }
        }

        if (indent_handlebars && tag_start_char === '<') {
          // When inside an angle-bracket tag, put spaces around
          // handlebars not inside of strings.
          if ((input_char + this.input.charAt(this.pos)) === '{{') {
            input_char += this.get_unformatted('}}');
            if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
              input_char = ' ' + input_char;
            }
            space = true;
          }
        }

        if (input_char === '<' && !tag_start_char) {
          tag_start = this.pos - 1;
          tag_start_char = '<';
        }

        if (indent_handlebars && !tag_start_char) {
          if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
            if (input_char === '#' || input_char === '/' || input_char === '!') {
              tag_start = this.pos - 3;
            } else {
              tag_start = this.pos - 2;
            }
            tag_start_char = '{';
          }
        }

        this.line_char_count++;
        content.push(input_char); //inserts character at-a-time (or string)

        if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
          // We treat all comments as literals, even more than preformatted tags
          // we just look for the appropriate close tag
          content = [this.get_comment(tag_start)];
          break;
        }

        if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
          // We treat all comments as literals, even more than preformatted tags
          // we just look for the appropriate close tag
          content = [this.get_comment(tag_start)];
          break;
        }

        if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
          break;
        }
      } while (input_char !== '>');

      var tag_complete = content.join('');
      var tag_index;
      var tag_offset;

      // must check for space first otherwise the tag could have the first attribute included, and
      // then not un-indent correctly
      if (tag_complete.search(/\s/) !== -1) { //if there's whitespace, thats where the tag name ends
        tag_index = tag_complete.search(/\s/);
      } else if (tag_complete.charAt(0) === '{') {
        tag_index = tag_complete.indexOf('}');
      } else { //otherwise go with the tag ending
        tag_index = tag_complete.indexOf('>');
      }
      if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
        tag_offset = 1;
      } else {
        tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
      }
      var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
      token.is_closing_tag = tag_check.charAt(0) === '/';
      token.tag_name = token.is_closing_tag ? tag_check.substr(1) : tag_check;
      token.is_inline_tag = this.Utils.in_array(token.tag_name, inline_tags);


      if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
        this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
        token.tag_type = 'SINGLE';
        token.is_closing_tag = true;
      } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
        if (!peek) {
          this.indent_to_tag('if');
          token.tag_type = 'HANDLEBARS_ELSE';
          this.indent_content = true;
          this.traverse_whitespace();
        }
      } else if (this.Utils.in_array(tag_check, unformatted) ||
        this.Utils.in_array(tag_check, content_unformatted)) {
        // do not reformat the "unformatted" or "content_unformatted" tags
        if (this.Utils.in_array(tag_check, unformatted)) {
          content = [this.input.slice(tag_start, this.pos)];
        }
        comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
        content.push(comment);
        tag_end = this.pos - 1;
        token.tag_type = 'SINGLE';
        token.is_closing_tag = true;
      } else if (tag_check === 'script' &&
        (tag_complete.search('type') === -1 ||
          (tag_complete.search('type') > -1 &&
            tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1))) {
        if (!peek) {
          this.record_tag(tag_check);
          token.tag_type = 'SCRIPT';
        }
      } else if (tag_check === 'style' &&
        (tag_complete.search('type') === -1 ||
          (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
        if (!peek) {
          this.record_tag(tag_check);
          token.tag_type = 'STYLE';
        }
      } else if (tag_check.charAt(0) === '!') { //peek for <! comment
        // for comments content is already correct.
        if (!peek) {
          token.tag_type = 'SINGLE';
          this.traverse_whitespace();
        }
      } else if (!peek) {
        if (token.is_closing_tag) { //this tag is a double tag so check for tag-ending
          this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
          token.tag_type = 'END';
        } else { //otherwise it's a start-tag
          this.record_tag(tag_check); //push it on the tag stack
          if (tag_check.toLowerCase() !== 'html') {
            this.indent_content = true;
          }
          token.tag_type = 'START';
          token.is_opening_tag = true;
        }

        // Allow preserving of newlines after a start or end tag
        if (this.traverse_whitespace()) {
          this.space_or_wrap(content);
        }

        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
          this.print_newline(false, this.output);
          if (this.output.length && this.output[this.output.length - 2] !== '\n') {
            this.print_newline(true, this.output);
          }
        }
      }

      if (peek) {
        this.pos = orig_pos;
        this.line_char_count = orig_line_char_count;
      }

      token.text = content.join('');
      token.type = 'TK_TAG_' + token.tag_type;

      return token; //returns fully formatted tag
    };

    this.get_comment = function(start_pos) { //function to return comment content in its entirety
      // this is will have very poor perf, but will work for now.
      var comment = '',
        delimiter = '>',
        matched = false;

      this.pos = start_pos;
      var input_char = this.input.charAt(this.pos);
      this.pos++;

      while (this.pos <= this.input.length) {
        comment += input_char;

        // only need to check for the delimiter if the last chars match
        if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
          comment.indexOf(delimiter) !== -1) {
          break;
        }

        // only need to search for custom delimiter for the first few characters
        if (!matched) {
          matched = comment.length > 10;
          if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
            delimiter = '<![endif]>';
            matched = true;
          } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
            delimiter = ']]>';
            matched = true;
          } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
            delimiter = ']>';
            matched = true;
          } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
            delimiter = '-->';
            matched = true;
          } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
            delimiter = '--}}';
            matched = true;
          } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
            if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
              delimiter = '}}';
              matched = true;
            }
          } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
            delimiter = '?>';
            matched = true;
          } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
            delimiter = '%>';
            matched = true;
          }
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;
      }

      return comment;
    };

    function tokenMatcher(delimiter) {
      var token = '';

      var add = function(str) {
        var newToken = token + str.toLowerCase();
        token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
      };

      var doesNotMatch = function() {
        return token.indexOf(delimiter) === -1;
      };

      return {
        add: add,
        doesNotMatch: doesNotMatch
      };
    }

    this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
      if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
        return '';
      }
      var input_char = '';
      var content = '';
      var space = true;

      var delimiterMatcher = tokenMatcher(delimiter);

      do {

        if (this.pos >= this.input.length) {
          return content;
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (!space) {
            this.line_char_count--;
            continue;
          }
          if (input_char === '\n' || input_char === '\r') {
            content += '\n';
            /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            */
            this.line_char_count = 0;
            continue;
          }
        }
        content += input_char;
        delimiterMatcher.add(input_char);
        this.line_char_count++;
        space = true;

        if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
          // Handlebars expressions in strings should also be unformatted.
          content += this.get_unformatted('}}');
          // Don't consider when stopping for delimiters.
        }
      } while (delimiterMatcher.doesNotMatch());

      return content;
    };

    this.get_token = function() { //initial handler for token-retrieval
      var token;
      if (this.last_token.type === 'TK_TAG_SCRIPT' || this.last_token.type === 'TK_TAG_STYLE') { //check if we need to format javascript
        var type = this.last_token.type.substr(7);
        token = this.get_contents_to(type);
      } else if (this.current_mode === 'CONTENT') {
        token = this.get_content();
      } else if (this.current_mode === 'TAG') {
        token = this.get_tag();
      }
      return token;
    };

    this.get_full_indent = function(level) {
      level = this.indent_level + level || 0;
      if (level < 1) {
        return '';
      }

      return Array(level + 1).join(this.indent_string);
    };

    this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

      this.input = js_source || ''; //gets the input for the Parser

      // HACK: newline parsing inconsistent. This brute force normalizes the input.
      this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

      this.output = [];
      this.indent_character = indent_character;
      this.indent_string = '';
      this.indent_size = indent_size;
      this.brace_style = brace_style;
      this.indent_level = 0;
      this.wrap_line_length = wrap_line_length;
      this.line_char_count = 0; //count to see if wrap_line_length was exceeded

      for (var i = 0; i < this.indent_size; i++) {
        this.indent_string += this.indent_character;
      }

      this.print_newline = function(force, arr) {
        if (!arr || !arr.length) {
          return;
        }
        if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
          this.line_char_count = 0;
          if ((arr[arr.length - 1] !== '\n')) {
            arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
          }
          arr.push('\n');
        }
      };

      this.print_indentation = function(arr) {
        for (var i = 0; i < this.indent_level; i++) {
          arr.push(this.indent_string);
          this.line_char_count += this.indent_string.length;
        }
      };

      this.print_token = function(text) {
        // Avoid printing initial whitespace.
        if (this.is_whitespace(text) && !this.output.length) {
          return;
        }
        if (text || text !== '') {
          if (this.output.length && this.output[this.output.length - 1] === '\n') {
            this.print_indentation(this.output);
            text = ltrim(text);
          }
        }
        this.print_token_raw(text);
      };

      this.print_token_raw = function(text) {
        // If we are going to print newlines, truncate trailing
        // whitespace, as the newlines will represent the space.
        if (this.newlines > 0) {
          text = rtrim(text);
        }

        if (text && text !== '') {
          if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
            // unformatted tags can grab newlines as their last character
            this.output.push(text.slice(0, -1));
            this.print_newline(false, this.output);
          } else {
            this.output.push(text);
          }
        }

        for (var n = 0; n < this.newlines; n++) {
          this.print_newline(n > 0, this.output);
        }
        this.newlines = 0;
      };

      this.indent = function() {
        this.indent_level++;
      };

      this.unindent = function() {
        if (this.indent_level > 0) {
          this.indent_level--;
        }
      };
    };
    return this;
  }

  /*_____________________--------------------_____________________*/

  this.beautify = function() {
    multi_parser = new Parser(); //wrapping functions Parser
    multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
    var token = null;
    var last_tag_token = {
      text: '',
      type: '',
      tag_name: '',
      is_opening_tag: false,
      is_closing_tag: false,
      is_inline_tag: false
    };
    while (true) {
      token = multi_parser.get_token();

      if (token.type === 'TK_EOF') {
        break;
      }

      switch (token.type) {
        case 'TK_TAG_START':
          if (!last_tag_token.is_inline_tag && !token.is_inline_tag) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(token.text);
          if (multi_parser.indent_content) {
            if ((multi_parser.indent_body_inner_html || token.tag_name !== 'body') &&
              (multi_parser.indent_head_inner_html || token.tag_name !== 'head')) {

              multi_parser.indent();
            }

            multi_parser.indent_content = false;
          }
          last_tag_token = token;
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_STYLE':
        case 'TK_TAG_SCRIPT':
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(token.text);
          last_tag_token = token;
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_END':
          if (!token.is_inline_tag) {
            //Print new line only if the tag has no content and has child
            if (!(!last_tag_token.is_closing_tag &&
                token.tag_name === last_tag_token.tag_name &&
                !multi_parser.Utils.in_array(token.tag_name, content_unformatted)
              ) &&
              !last_tag_token.is_inline_tag
            ) {
              multi_parser.print_newline(false, multi_parser.output);
            }
          }
          multi_parser.print_token(token.text);
          last_tag_token = token;
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_SINGLE':
          // Don't add a newline before elements that should remain unformatted.
          var tag_check = token.text.match(/^\s*<([a-z-]+)/i);
          if (token.tag_name === '!--' && multi_parser.last_token.is_closing_tag && token.text.indexOf('\n') === -1) {
            //Do nothing. Leave comments on same line.
          } else if (!tag_check ||
            !multi_parser.Utils.in_array(tag_check[1], inline_tags) &&
            !multi_parser.Utils.in_array(tag_check[1], unformatted)
          ) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(token.text);
          last_tag_token = token;
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_HANDLEBARS_ELSE':
          // Don't add a newline if opening {{#if}} tag is on the current line
          var foundIfOnCurrentLine = false;
          for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
            if (multi_parser.output[lastCheckedOutput] === '\n') {
              break;
            } else {
              if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                foundIfOnCurrentLine = true;
                break;
              }
            }
          }
          if (!foundIfOnCurrentLine) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(token.text);
          if (multi_parser.indent_content) {
            multi_parser.indent();
            multi_parser.indent_content = false;
          }
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_HANDLEBARS_COMMENT':
          multi_parser.print_token(token.text);
          multi_parser.current_mode = 'TAG';
          break;
        case 'TK_CONTENT':
          multi_parser.print_token(token.text);
          multi_parser.current_mode = 'TAG';
          if (!token.text) {
            continue;
          }
          break;
        case 'TK_STYLE':
        case 'TK_SCRIPT':
          if (token.text !== '') {
            multi_parser.print_newline(false, multi_parser.output);
            var text = token.text,
              _beautifier,
              script_indent_level = 1;
            if (token.type === 'TK_SCRIPT') {
              _beautifier = typeof js_beautify === 'function' && js_beautify;
            } else if (token.type === 'TK_STYLE') {
              _beautifier = typeof css_beautify === 'function' && css_beautify;
            }

            if (options.indent_scripts === "keep") {
              script_indent_level = 0;
            } else if (options.indent_scripts === "separate") {
              script_indent_level = -multi_parser.indent_level;
            }

            var indentation = multi_parser.get_full_indent(script_indent_level);
            if (_beautifier) {

              // call the Beautifier if avaliable
              var Child_options = function() {
                this.eol = '\n';
              };
              Child_options.prototype = options;
              var child_options = new Child_options();
              text = _beautifier(text.replace(/^\s*/, indentation), child_options);
            } else {
              // simply indent the string otherwise
              var white = text.match(/^\s*/)[0];
              var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
              var reindent = multi_parser.get_full_indent(script_indent_level - _level);
              text = text.replace(/^\s*/, indentation)
                .replace(/\r\n|\r|\n/g, '\n' + reindent)
                .replace(/\s+$/, '');
            }
            if (text) {
              multi_parser.print_token_raw(text);
              multi_parser.print_newline(true, multi_parser.output);
            }
          }
          multi_parser.current_mode = 'TAG';
          break;
        default:
          // We should not be getting here but we don't want to drop input on the floor
          // Just output the text and move on
          if (token.text !== '') {
            multi_parser.print_token(token.text);
          }
          break;
      }
      multi_parser.last_token = token;

    }
    var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

    // establish end_with_newline
    if (end_with_newline) {
      sweet_code += '\n';
    }

    if (eol !== '\n') {
      sweet_code = sweet_code.replace(/[\n]/g, eol);
    }

    return sweet_code;
  };
}

module.exports.Beautifier = Beautifier;

/***/ })
/******/ ]);
});