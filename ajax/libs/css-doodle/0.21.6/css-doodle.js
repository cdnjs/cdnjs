/*! css-doodle@0.21.6 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CSSDoodle = factory());
}(this, (function () { 'use strict';

  /**
   * This is totally rewrite for the old parser module
   * I'll improve and replace them little by little.
   */

  const symbols$1 = [
    ':', ';', ',', '(', ')', '[', ']',
    '{', '}', 'π', '±', '+', '-', '*',
    '/', '%', '"', "'", '`', '@',
  ];

  const is$2 = {
    escape: c => c == '\\',
    space:  c => /[\r\n\t\s]/.test(c),
    digit:  c => /^[0-9]$/.test(c),
    sign:   c => /^[+-]$/.test(c),
    dot:    c => c == '.',
    quote:  c => /^["'`]$/.test(c),
    symbol: c => symbols$1.includes(c),
    hexNum: c => /^[0-9a-f]$/i.test(c),
    hex:           (a, b, c) => a == '0' && is$2.letter(b, 'x') && is$2.hexNum(c),
    expWithSign:   (a, b, c) => is$2.letter(a, 'e') && is$2.sign(b) && is$2.digit(c),
    exp:           (a, b) => is$2.letter(a, 'e') && is$2.digit(b),
    dots:          (a, b) => is$2.dot(a) && is$2.dot(b),
    letter:        (a, b) => String(a).toLowerCase() == String(b).toLowerCase(),
    comment:       (a, b) => a == '/' && b == '*',
    selfClosedTag: (a, b) => a == '/' && b == '>',
    closedTag:     (a, b) => a == '<' && b == '/',
  };

  class Token {
    constructor({ type, value, pos, status }) {
      this.type = type;
      this.value = value;
      this.pos = pos;
      if (status) {
        this.status = status;
      }
    }
    isSymbol(...values) {
      let isSymbol = this.type == 'Symbol';
      if (!values.length) return isSymbol;
      return values.some(c => c === this.value);
    }
    isSpace() {
      return this.type == 'Space';
    }
    isNumber() {
      return this.type == 'Number';
    }
    isWord() {
      return this.type == 'Word';
    }
  }

  function iterator$1(input) {
    let pointer = -1;
    let max = input.length;
    let col = -1, row = 0;
    return {
      curr(n = 0) {
        return input[pointer + n];
      },
      next(n = 1) {
        let next = input[pointer += n];
        if (next == '\n') row++, col = 0;
        else col += n;
        return next;
      },
      end() {
        return pointer >= max;
      },
      get() {
        return {
          prev:  input[pointer - 1],
          curr:  input[pointer + 0],
          next:  input[pointer + 1],
          next2: input[pointer + 2],
          next3: input[pointer + 3],
          pos:   [col, row],
        }
      }
    }
  }

  function skipComments(iter) {
    while (iter.next()) {
      let { curr, prev } = iter.get();
      if (is$2.comment(curr, prev)) break;
    }
  }

  function ignoreSpacingSymbol(value) {
     return [':', ';', ',', '{', '}', '(', ')', '[', ']'].includes(value);
  }

  function readWord(iter) {
    let temp = '';
    while (!iter.end()) {
      let { curr, next } = iter.get();
      temp += curr;
      let isBreak = is$2.symbol(next) || is$2.space(next) || is$2.digit(next);
      if (temp.length && isBreak) {
        if (!is$2.closedTag(curr, next)) break;
      }
      iter.next();
    }
    return temp.trim();
  }

  function readSpaces(iter) {
    let temp = '';
    while (!iter.end()) {
      let { curr, next } = iter.get();
      temp += curr;
      if (!is$2.space(next)) break;
      iter.next();
    }
    return temp;
  }

  function readNumber(iter) {
    let temp = '';
    let hasDot = false;
    while (!iter.end()) {
      let { curr, next, next2, next3 } = iter.get();
      temp += curr;
      if (hasDot && is$2.dot(next)) break;
      if (is$2.dot(curr)) hasDot = true;
      if (is$2.dots(next, next2)) break;
      if (is$2.expWithSign(next, next2, next3)) {
        temp += iter.next() + iter.next();
      }
      else if (is$2.exp(next, next2)) {
        temp += iter.next();
      }
      else if (!is$2.digit(next) && !is$2.dot(next)) {
        break;
      }
      iter.next();
    }
    return temp;
  }

  function readHexNumber(iter) {
    let temp = '0x';
    iter.next(2);
    while (!iter.end()) {
      let { curr, next } = iter.get();
      temp += curr;
      if (!is$2.hexNum(next)) break;
      iter.next();
    }
    return temp;
  }

  function last$3(array) {
    return array[array.length - 1];
  }

  function scan(source) {
    let iter = iterator$1(String(source).trim());
    let tokens = [];
    let quoteStack = [];

    while (iter.next()) {
      let { prev, curr, next, next2, pos } = iter.get();
      if (is$2.comment(curr, next)) {
        skipComments(iter);
      }
      else if (is$2.hex(curr, next, next2)) {
        let num = readHexNumber(iter);
        tokens.push(new Token({
          type: 'Number', value: num, pos
        }));
      }
      else if (is$2.digit(curr) || (
          is$2.digit(next) && is$2.dot(curr) && !is$2.dots(prev, curr))) {
        let num = readNumber(iter);
        tokens.push(new Token({
          type: 'Number', value: num, pos
        }));
      }
      else if (is$2.symbol(curr) && !is$2.selfClosedTag(curr, next)) {
        let lastToken = last$3(tokens);
        // negative
        if (curr === '-' && is$2.digit(next) && (!lastToken || !lastToken.isNumber())) {
          let num = readNumber(iter);
          tokens.push(new Token({
            type: 'Number', value: num, pos
          }));
          continue;
        }

        let token = {
          type: 'Symbol', value: curr, pos
        };
        // Escaped symbols
        if (quoteStack.length && is$2.escape(lastToken.value)) {
          tokens.pop();
          let word = readWord(iter);
          if (word.length) {
            tokens.push(new Token({
              type: 'Word', value: word, pos
            }));
          }
        }
        else {
          if (is$2.quote(curr)) {
            let lastQuote = last$3(quoteStack);
            if (lastQuote == curr) {
              quoteStack.pop();
              token.status = 'close';
            } else {
              quoteStack.push(curr);
              token.status = 'open';
            }
          }

          tokens.push(new Token(token));
        }
      }
      else if (is$2.space(curr)) {
        let spaces = readSpaces(iter);
        let lastToken = last$3(tokens);
        let { next } = iter.get();

        // Reduce unnecessary spaces
        if (!quoteStack.length && lastToken) {
          if (ignoreSpacingSymbol(lastToken.value) || ignoreSpacingSymbol(next)) {
            continue;
          } else {
            spaces = ' ';
          }
        }
        if (tokens.length && (next && next.trim())) {
          tokens.push(new Token({
            type: 'Space', value: spaces, pos
          }));
        }
      }
      else {
        let word = readWord(iter);
        if (word.length) {
          tokens.push(new Token({
            type: 'Word', value: word, pos
          }));
        }
      }
    }

    // Remove last space token
    let lastToken = last$3(tokens);
    if (lastToken && lastToken.isSpace()) {
      tokens.length = tokens.length - 1;
    }
    return tokens;
  }

  function parse$6(input) {
    let iter = iterator$1(scan(input));
    return walk$1(iter);
  }

  function walk$1(iter) {
    let rules = [];
    while (iter.next()) {
      let { curr, next } = iter.get();
      if (curr.value === 'var') {
        if (next && next.isSymbol('(')) {
          iter.next();
          let rule = parseVar(iter);
          if (isValid(rule.name)) {
            rules.push(rule);
          }
        }
      } else if (rules.length && !curr.isSymbol(',')) {
        break;
      }
    }
    return rules;
  }

  function parseVar(iter) {
    let ret = {};
    let tokens = [];
    while (iter.next()) {
      let { curr, next } = iter.get();
      if (curr.isSymbol(')', ';') && !ret.name) {
        ret.name = joinTokens$2(tokens);
        break;
      }
      else if (curr.isSymbol(',')) {
        if (ret.name === undefined) {
          ret.name = joinTokens$2(tokens);
          tokens = [];
        }
        if (ret.name) {
          ret.fallback = walk$1(iter);
        }
      } else {
        tokens.push(curr);
      }
    }
    return ret;
  }

  function joinTokens$2(tokens) {
    return tokens.map(n => n.value).join('');
  }

  function isValid(name) {
    if (name === undefined) return false;
    if (name.length <= 2) return false;
    if (name.substr(2).startsWith('-')) return false;
    if (!name.startsWith('--')) return false;
    return true;
  }

  function List(random) {

    function make_array(arr) {
      return Array.isArray(arr) ? arr : [arr];
    }

    function join(arr, spliter = '\n') {
      return (arr || []).join(spliter);
    }

    function last(arr, n = 1) {
      return arr[arr.length - n];
    }

    function first(arr) {
      return arr[0];
    }

    function clone(arr) {
      return JSON.parse(JSON.stringify(arr));
    }

    function shuffle(arr) {
      let ret = Array.from ? Array.from(arr) : arr.slice();
      let m = arr.length;
      while (m) {
        let i = ~~(random() * m--);
        let t = ret[m];
        ret[m] = ret[i];
        ret[i] = t;
      }
      return ret;
    }

    function flat_map(arr, fn) {
      if (Array.prototype.flatMap) return arr.flatMap(fn);
      return arr.reduce((acc, x) => acc.concat(fn(x)), []);
    }

    function remove_empty_values(arr) {
      return arr.filter(v => (
        v !== undefined &&
        v !== null &&
        String(v).trim().length
      ));
    }

    return {
      make_array,
      join,
      last,
      first,
      clone,
      shuffle,
      flat_map,
      remove_empty_values
    }
  }

  let { first, last: last$2, clone } = List();

  const Tokens = {
    func(name = '') {
      return {
        type: 'func',
        name,
        arguments: []
      };
    },
    argument() {
      return {
        type: 'argument',
        value: []
      };
    },
    text(value = '') {
      return {
        type: 'text',
        value
      };
    },
    pseudo(selector = '') {
      return {
        type: 'pseudo',
        selector,
        styles: []
      };
    },
    cond(name = '') {
      return {
        type: 'cond',
        name,
        styles: [],
        arguments: []
      };
    },
    rule(property = '') {
      return {
        type: 'rule',
        property,
        value: []
      };
    },
    keyframes(name = '') {
      return {
        type: 'keyframes',
        name,
        steps: []
      }
    },

    step(name = '') {
      return {
        type: 'step',
        name,
        styles: []
      }
    }
  };

  const is$1 = {
    white_space(c) {
      return /[\s\n\t]/.test(c);
    },
    line_break(c) {
      return /\n/.test(c);
    },
    number(n) {
      return !isNaN(n);
    },
    pair(n) {
      return ['"', '(', ')', "'"].includes(n);
    },
    pair_of(c, n) {
      return ({ '"': '"', "'": "'", '(': ')' })[c] == n;
    }
  };

  // This should not be in the parser
  // but I'll leave it here until the rewriting
  const symbols = {
    'π': Math.PI,
    '∏': Math.PI
  };

  function composible(name) {
    return ['@canvas', '@shaders', '@doodle'].includes(name);
  }

  function iterator(input = '') {
    let index = 0, col = 1, line = 1;
    return {
      curr(n = 0) {
        return input[index + n];
      },
      end() {
        return input.length <= index;
      },
      info() {
        return { index, col, line };
      },
      index(n) {
        return (n === undefined ? index : index = n);
      },
      next() {
        let next = input[index++];
        if (next == '\n') line++, col = 0;
        else col++;
        return next;
      }
    };
  }

  function throw_error(msg, { col, line }) {
    console.warn(
      `(at line ${ line }, column ${ col }) ${ msg }`
    );
  }

  function get_text_value(input) {
    if (input.trim().length) {
      return is$1.number(+input) ? +input : input.trim()
    } else {
      return input;
    }
  }

  function read_until(fn) {
    return function(it, reset) {
      let index = it.index();
      let word = '';
      while (!it.end()) {
        let c = it.next();
        if (fn(c)) break;
        else word += c;
      }
      if (reset) {
        it.index(index);
      }
      return word;
    }
  }

  function read_word(it, reset) {
    let check = c => /[^\w@]/.test(c);
    return read_until(check)(it, reset);
  }

  function read_keyframe_name(it) {
    return read_until(c => /[\s\{]/.test(c))(it);
  }

  function read_line(it, reset) {
    let check = c => is$1.line_break(c) || c == '{';
    return read_until(check)(it, reset);
  }

  function read_step(it, extra) {
    let c, step = Tokens.step();
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      if (is$1.white_space(c)) {
        it.next();
        continue;
      }
      else if (!step.name.length) {
        step.name = read_selector(it);
      }
      else {
        step.styles.push(read_rule(it, extra));
        if (it.curr() == '}') break;
      }
      it.next();
    }
    return step;
  }

  function read_steps(it, extra) {
    const steps = [];
    let c;
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      else if (is$1.white_space(c)) {
        it.next();
        continue;
      }
      else {
        steps.push(read_step(it, extra));
      }
      it.next();
    }
    return steps;
  }

  function read_keyframes(it, extra) {
    let keyframes = Tokens.keyframes(), c;
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      else if (!keyframes.name.length) {
        read_word(it);
        keyframes.name = read_keyframe_name(it);
        if (!keyframes.name.length) {
          throw_error('missing keyframes name', it.info());
          break;
        }
        continue;
      }
      else if (c == '{') {
        it.next();
        keyframes.steps = read_steps(it, extra);
        break;
      }
      it.next();
    }
    return keyframes;
  }

  function read_comments(it, flag = {}) {
    it.next();
    while (!it.end()) {
      let c = it.curr();
      if (flag.inline) {
        if (c == '\n') break;
      }
      else {
        if ((c = it.curr()) == '*' && it.curr(1) == '/') break;
      }
      it.next();
    }
    if (!flag.inline) {
      it.next(); it.next();
    }
  }

  function skip_tag(it) {
    it.next();
    while(!it.end()) {
      let c = it.curr();
      if (c == '>') break;
      it.next();
    }
  }

  function read_property(it) {
    let prop = '', c;
    while (!it.end()) {
      if ((c = it.curr()) == ':') break;
      else if (!is$1.white_space(c)) prop += c;
      it.next();
    }
    return prop;
  }

  function read_arguments(it, composition, doodle) {
    let args = [], group = [], stack = [], arg = '', c;
    while (!it.end()) {
      c = it.curr();
      if ((/[\('"`]/.test(c) && it.curr(-1) !== '\\')) {
        if (stack.length) {
          if (c != '(' && c === last$2(stack)) {
            stack.pop();
          } else {
            stack.push(c);
          }
        } else {
          stack.push(c);
        }
        arg += c;
      }
      else if (c == '@' && !doodle) {
        if (!group.length) {
          arg = arg.trimLeft();
        }
        if (arg.length) {
          group.push(Tokens.text(arg));
          arg = '';
        }
        group.push(read_func(it));
      }
      else if (doodle && /[)]/.test(c) || (!doodle && /[,)]/.test(c))) {
        if (stack.length) {
          if (c == ')') {
            stack.pop();
          }
          arg += c;
        }

        else {
          if (arg.length) {
            if (!group.length) {
              group.push(Tokens.text(get_text_value(arg)));
            } else {
              group.push(Tokens.text(arg));
            }

            if (arg.startsWith('±') && !doodle) {
              let raw = arg.substr(1);
              let cloned = clone(group);
              last$2(cloned).value = '-' + raw;
              args.push(normalize_argument(cloned));
              last$2(group).value = raw;
            }
          }

          args.push(normalize_argument(group));

          [group, arg] = [[], ''];

          if (c == ')') break;
        }
      }
      else {
        if (symbols[c] && !/[0-9]/.test(it.curr(-1))) {
          c = symbols[c];
        }
        arg += c;
      }

      if (composition && (it.curr(1) == ')' || !/[0-9a-zA-Z_\-.]/.test(it.curr())) && !stack.length) {
        if (group.length) {
          args.push(normalize_argument(group));
        }
        break;
      }
      else {
        it.next();
      }
    }
    return args;
  }

  function normalize_argument(group) {
    let result = group.map(arg => {
      if (arg.type == 'text' && typeof arg.value == 'string') {
        let value = String(arg.value);
        if (value.includes('`')) {
          arg.value = value = value.replace(/`/g, '"');
        }
        arg.value = value.replace(/\n+|\s+/g, ' ');
      }
      return arg;
    });

    let ft = first(result) || {};
    let ed = last$2(result) || {};
    if (ft.type == 'text' && ed.type == 'text') {
      let cf = first(ft.value);
      let ce  = last$2(ed.value);
      if (typeof ft.value == 'string' && typeof ed.value == 'string') {
        if (is$1.pair_of(cf, ce)) {
          ft.value = ft.value.slice(1);
          ed.value = ed.value.slice(0, ed.value.length - 1);
          result.cluster = true;
        }
      }
    }

    return result;
  }

  function seperate_func_name(name) {
    let fname = '', extra = '';
    if ((/\D$/.test(name) && !/\d+x\d+/.test(name)) || Math[name.substr(1)]) {
      return { fname: name, extra }
    }
    for (let i = name.length - 1; i >= 0; i--) {
      let c = name[i];
      let prev = name[i - 1];
      let next = name[i + 1];
      if (/[\d.]/.test(c) || ((c == 'x') && /\d/.test(prev) && /\d/.test(next))) {
        extra = c + extra;
      } else {
        fname = name.substring(0, i + 1);
        break;
      }
    }
    return { fname, extra };
  }

  function read_func(it) {
    let func = Tokens.func();
    let name = '@', c;
    let has_argument = false;
    it.next();

    while (!it.end()) {
      c = it.curr();
      let composition = (c == '.' && it.curr(1) == '@');
      let next = it.curr(1);
      if (c == '(' || composition) {
        has_argument = true;
        it.next();
        func.arguments = read_arguments(it, composition, composible(name));
        break;
      } else if (!has_argument && next !== '(' && !/[0-9a-zA-Z_\-.]/.test(next)) {
        name += c;
        break;
      }
      else {
        name += c;
      }
      it.next();
    }

    let { fname, extra } = seperate_func_name(name);
    func.name = fname;

    if (extra.length) {
      func.arguments.unshift([{
        type: 'text',
        value: extra
      }]);
    }

    func.position = it.info().index;
    return func;
  }

  function read_value(it) {
    let text = Tokens.text(), idx = 0, skip = true, c;
    const value = [], stack = [];
    value[idx] = [];

    while (!it.end()) {
      c = it.curr();

      if (skip && is$1.white_space(c)) {
        it.next();
        continue;
      } else {
        skip = false;
      }

      if (c == '\n' && !is$1.white_space(it.curr(-1))) {
        text.value += ' ';
      }
      else if (c == ',' && !stack.length) {
        if (text.value.length) {
          value[idx].push(text);
          text = Tokens.text();
        }
        value[++idx] = [];
        skip = true;
      }
      else if (/[;}<]/.test(c)) {
        if (text.value.length) {
          value[idx].push(text);
          text = Tokens.text();
        }
        break;
      }
      else if (c == '@') {
        if (text.value.length) {
          value[idx].push(text);
          text = Tokens.text();
        }
        value[idx].push(read_func(it));
      }
      else if (!is$1.white_space(c) || !is$1.white_space(it.curr(-1))) {
        if (c == '(') stack.push(c);
        if (c == ')') stack.pop();

        if (symbols[c] && !/[0-9]/.test(it.curr(-1))) {
          c = symbols[c];
        }

        text.value += c;
      }
      it.next();
    }
    if (text.value.length) {
      value[idx].push(text);
    }
    return value;
  }

  function read_selector(it) {
    let selector = '', c;
    while (!it.end()) {
      if ((c = it.curr()) == '{') break;
      else if (!is$1.white_space(c)) {
        selector += c;
      }
      it.next();
    }
    return selector;
  }

  function read_cond_selector(it) {
    let selector = { name: '', arguments: [] }, c;
    while (!it.end()) {
      if ((c = it.curr()) == '(') {
        it.next();
        selector.arguments = read_arguments(it);
      }
      else if (/[){]/.test(c)) break;
      else if (!is$1.white_space(c)) selector.name += c;
      it.next();
    }
    return selector;
  }

  function read_pseudo(it, extra) {
    let pseudo = Tokens.pseudo(), c;
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      if (is$1.white_space(c)) {
        it.next();
        continue;
      }
      else if (!pseudo.selector) {
        pseudo.selector = read_selector(it);
      }
      else {
        let rule = read_rule(it, extra);
        if (rule.property == '@use') {
          pseudo.styles = pseudo.styles.concat(
            rule.value
          );
        } else {
          pseudo.styles.push(rule);
        }
        if (it.curr() == '}') break;
      }
      it.next();
    }
    return pseudo;
  }

  function read_rule(it, extra) {
    let rule = Tokens.rule();
    while (!it.end()) {
      if ((it.curr()) == ';') break;
      else if (!rule.property.length) {
        rule.property = read_property(it);
        if (rule.property == '@use') {
          rule.value = read_var(it, extra);
          break;
        }
      }
      else {
        rule.value = read_value(it);
        break;
      }
      it.next();
    }
    return rule;
  }

  function read_cond(it, extra) {
    let cond = Tokens.cond(), c;
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      else if (!cond.name.length) {
        Object.assign(cond, read_cond_selector(it));
      }
      else if (c == ':') {
        let pseudo = read_pseudo(it);
        if (pseudo.selector) cond.styles.push(pseudo);
      }
      else if (c == '@' && !read_line(it, true).includes(':')) {
        cond.styles.push(read_cond(it));
      }
      else if (!is$1.white_space(c)) {
        let rule = read_rule(it, extra);
        if (rule.property) cond.styles.push(rule);
        if (it.curr() == '}') break;
      }
      it.next();
    }
    return cond;
  }

  function read_variable(extra, name) {
    let rule = '';
    if (extra && extra.get_variable) {
      rule = extra.get_variable(name);
    }
    return rule;
  }

  function evaluate_value(values, extra) {
    values.forEach && values.forEach(v => {
      if (v.type == 'text' && v.value) {
        let vars = parse$6(v.value);
        v.value = vars.reduce((ret, p) => {
          let rule = '', other = '', parsed;
          rule = read_variable(extra, p.name);
          if (!rule && p.fallback) {
            p.fallback.every(n => {
              other = read_variable(extra, n.name);
              if (other) {
                rule = other;
                return false;
              }
            });
          }
          try {
            parsed = parse$5(rule, extra);
          } catch (e) { }
          if (parsed) {
            ret.push.apply(ret, parsed);
          }
          return ret;
        }, []);
      }
      if (v.type == 'func' && v.arguments) {
        v.arguments.forEach(arg => {
          evaluate_value(arg, extra);
        });
      }
    });
  }

  function read_var(it, extra) {
    it.next();
    let groups = read_value(it) || [];
    return groups.reduce((ret, group) => {
      evaluate_value(group, extra);
      let [token] = group;
      if (token.value && token.value.length) {
        ret.push(...token.value);
      }
      return ret;
    }, []);
  }

  function parse$5(input, extra) {
    const it = iterator(input);
    const Tokens = [];
    while (!it.end()) {
      let c = it.curr();
      if (is$1.white_space(c)) {
        it.next();
        continue;
      }
      else if (c == '/' && it.curr(1) == '*') {
        read_comments(it);
      }
      else if (c == '/' && it.curr(1) == '/') {
        read_comments(it, { inline: true });
      }
      else if (c == ':') {
        let pseudo = read_pseudo(it, extra);
        if (pseudo.selector) Tokens.push(pseudo);
      }
      else if (c == '@' && read_word(it, true) === '@keyframes') {
        let keyframes = read_keyframes(it, extra);
        Tokens.push(keyframes);
      }
      else if (c == '@' && !read_line(it, true).includes(':')) {
        let cond = read_cond(it, extra);
        if (cond.name.length) Tokens.push(cond);
      }
      else if (c == '<') {
        skip_tag(it);
      }
      else if (!is$1.white_space(c)) {
        let rule = read_rule(it, extra);
        if (rule.property) Tokens.push(rule);
      }
      it.next();
    }
    return Tokens;
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function maybe(cond, value) {
    if (!cond) return '';
    return (typeof value === 'function') ? value() : value;
  }

  function range(start, stop, step) {
    let count = 0, old = start;
    let initial = n => (n > 0 && n < 1) ? .1 : 1;
    let length = arguments.length;
    if (length == 1) [start, stop] = [initial(start), start];
    if (length < 3) step = initial(start);
    let range = [];
    while ((step >= 0 && start <= stop)
      || (step < 0 && start > stop)) {
      range.push(start);
      start += step;
      if (count++ >= 1000) break;
    }
    if (!range.length) range.push(old);
    return range;
  }

  function alias_for(obj, names) {
    Object.keys(names).forEach(n => {
      obj[n] = obj[names[n]];
    });
    return obj;
  }

  function is_letter(c) {
    return /^[a-zA-Z]$/.test(c);
  }

  function is_nil(s) {
    return s === undefined || s === null;
  }

  function is_invalid_number(v) {
    return is_nil(v) || Number.isNaN(v);
  }

  function is_empty(value) {
    return is_nil(value) || value === '';
  }

  function lazy(fn) {
    let wrap = () => fn;
    wrap.lazy = true;
    return wrap;
  }

  function sequence(count, fn) {
    let [x, y = 1] = String(count).split('x');
    x = clamp(parseInt(x) || 1, 1, 65536);
    y = clamp(parseInt(y) || 1, 1, 65536);
    let max = x * y;
    let ret = [];
    let index = 1;
    for (let i = 1; i <= y; ++i) {
      for (let j = 1; j <= x; ++j) {
        ret.push(fn(index++, j, i, max));
      }
    }
    return ret;
  }

  function cell_id(x, y, z) {
    return 'c-' + x + '-' + y + '-' + z;
  }

  function get_value(input) {
    while (input && input.value) {
      return get_value(input.value);
    }
    return is_nil(input) ? '' : input;
  }

  function normalize_png_name(name) {
    let prefix = is_nil(name)
      ? Date.now()
      : String(name).replace(/\/.png$/g, '');
    return prefix + '.png';
  }

  function cache_image(src, fn, delay = 0) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = function() {
      setTimeout(fn, delay);
    };
  }

  function is_safari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  function un_entity(code) {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = code;
    return textarea.value;
  }

  function entity(code) {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function make_tag_function(fn) {
    let get_value = v => is_nil(v) ? '' : v;
    return (input, ...vars) => {
      let string = input.reduce((s, c, i) => s + c + get_value(vars[i]), '');
      return fn(string);
    };
  }

  const [ min, max, total ] = [ 1, 32, 32 * 32 ];

  function parse_grid(size) {
    let [x, y, z] = (size + '')
      .replace(/\s+/g, '')
      .replace(/[,，xX]+/g, 'x')
      .split('x')
      .map(n => parseInt(n));

    const max_xy = (x == 1 || y == 1) ? total : max;
    const max_z = (x == 1 && y == 1) ? total : min;

    const ret = {
      x: clamp(x || min, 1, max_xy),
      y: clamp(y || x || min, 1, max_xy),
      z: clamp(z || min, 1, max_z)
    };

    return Object.assign({}, ret, {
      count: ret.x * ret.y * ret.z,
      ratio: ret.x / ret.y
    });
  }

  function parse$4(input) {
    let iter = iterator$1(removeParens(scan(input)));
    let stack = [];
    let tokens = [];
    let identifier;
    let line;
    let result = {
      textures: [],
    };
    while (iter.next()) {
      let { curr, next } = iter.get();
      if (curr.isSymbol('{')) {
        if (!stack.length) {
          let name = joinToken$1(tokens);
          if (isIdentifier(name)) {
            identifier = name;
            tokens = [];
          } else {
            tokens.push(curr);
          }
        } else {
          tokens.push(curr);
        }
        stack.push('{');
      }
      else if (curr.isSymbol('}')) {
        stack.pop();
        if (!stack.length && identifier) {
          let value = joinToken$1(tokens);
          if (identifier && value.length) {
            if (identifier.startsWith('texture')) {
              result.textures.push({
                name: identifier,
                value
              });
            } else {
              result[identifier] = value;
            }
            tokens = [];
          }
          identifier = null;
        } else {
          tokens.push(curr);
        }
      }
      else {
        if (!is_empty(line) && line != curr.pos[1]) {
          tokens.push(lineBreak());
          line = null;
        }
        if (curr.isWord() && curr.value.startsWith('#')) {
          tokens.push(lineBreak());
          line = next.pos[1];
        }
        tokens.push(curr);
      }
    }

    if (is_empty(result.fragment)) {
      return {
        fragment: joinToken$1(tokens),
        textures: []
      }
    }
    return result;
  }

  function isIdentifier(name) {
    return /^texture\w*$|^(fragment|vertex)$/.test(name);
  }

  function lineBreak() {
    return new Token({ type: 'LineBreak', value: '\n' });
  }

  function removeParens(tokens) {
    let head = tokens[0];
    let last = tokens[tokens.length - 1];
    while (head && head.isSymbol('(') && last && last.isSymbol(')')) {
      tokens = tokens.slice(1, tokens.length - 1);
      head = tokens[0];
      last = tokens[tokens.length - 1];
    }
    return tokens;
  }

  function joinToken$1(tokens) {
    return removeParens(tokens).map(n => n.value).join('');
  }

  const NS = 'http://www.w3.org/2000/svg';
  const NSXLink = 'http://www.w3.org/1999/xlink';

  function create_svg_url(svg, id) {
    let encoded = encodeURIComponent(svg) + (id ? `#${ id }` : '');
    return `url("data:image/svg+xml;utf8,${ encoded }")`;
  }

  function normalize_svg(input) {
    const xmlns = `xmlns="${ NS }"`;
    const xmlnsXLink = `xmlns:xlink="${ NSXLink }"`;
    if (!input.includes('<svg')) {
      input = `<svg ${ xmlns } ${ xmlnsXLink }>${ input }</svg>`;
    }
    if (!input.includes('xmlns')) {
      input = input.replace(/<svg([\s>])/, `<svg ${ xmlns } ${ xmlnsXLink }$1`);
    }
    return input;
  }

  function svg_to_png(svg, width, height, scale) {
    return new Promise((resolve, reject) => {
      let source = `data:image/svg+xml;utf8,${ encodeURIComponent(svg) }`;
      function action() {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = source;

        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');

          let dpr = window.devicePixelRatio || 1;
          /* scale with devicePixelRatio only when the scale equals 1 */
          if (scale != 1) {
            dpr = 1;
          }

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          try {
            canvas.toBlob(blob => {
              resolve({
                blob,
                source,
                url: URL.createObjectURL(blob)
              });
            });
          } catch (e) {
            reject(e);
          }
        };
      }

      if (is_safari()) {
        cache_image(source, action, 200);
      } else {
        action();
      }
    });
  }

  function generate_svg(token, element, parent) {
    if (!element) {
      element = document.createDocumentFragment();
    }
    if (token.type === 'block') {
      try {
        let el = document.createElementNS(NS, token.name);
        if (el) {
          token.value.forEach(t => {
            generate_svg(t, el, token);
          });
          element.appendChild(el);
        }
      } catch (e) {}
    }
    if (token.type === 'statement') {
      if (parent && parent.name == 'text' && token.name === 'content') {
        element.textContent = token.value;
      } else {
        try {
          let ns = token.name.startsWith('xlink:') ? NSXLink : NS;
          element.setAttributeNS(ns, token.name, token.value);
        } catch (e) {}
      }
    }
    if (!parent) {
      let child = element.childNodes[0];
      return child && child.outerHTML || '';
    }
    return element;
  }

  function random_func(random) {

    function lerp(start, end, t) {
      return start * (1 - t) + end * t;
    }

    function rand(start = 0, end) {
      if (arguments.length == 1) {
        [start, end] = [0, start];
      }
      return lerp(start, end, random());
    }

    function nrand(mean = 0, scale = 1) {
      let u1 = 0, u2 = 0;
      //Convert [0,1) to (0,1)
      while (u1 === 0) u1 = random();
      while (u2 === 0) u2 = random();
      const R = Math.sqrt(-2.0 * Math.log(u1));
      const t = 2.0 * Math.PI * u2;
      const u0 = R * Math.cos(t);
      return mean + scale * u0;
    }

    function pick( ...items) {
      let args = items.reduce((acc, n) => acc.concat(n), []);
      return args[~~(random() * args.length)];
    }

    function unique_id(prefix = '') {
      return prefix + Math.random().toString(32).substr(2);
    }

    return {
      lerp,
      rand,
      nrand,
      pick,
      unique_id
    };

  }

  function by_unit(fn) {
    return (...args) => {
      let unit = get_unit(args);
      return restore(fn, unit).apply(null, args);
    }
  }

  function restore(fn, unit) {
    return (...args) => {
      args = args.map(str => Number(
        String(str).replace(/\D+$/g, '')
      ));
      let result = fn.apply(null, args);
      if (!unit.length) {
        return result;
      }
      if (Array.isArray(result)) {
        return result.map(n => n + unit);
      }
      return result + unit;
    }
  }

  function get_unit(values) {
    let unit = '';
    values.some(str => {
      let input = String(str).trim();
      if (!input) return '';
      let matched = input.match(/\d(\D+)$/);
      return (unit = matched ? matched[1] : '');
    });
    return unit;
  }

  function by_charcode(fn) {
    return (...args) => {
      let codes = args.map(n => String(n).charCodeAt(0));
      let result = fn.apply(null, codes);
      return Array.isArray(result)
        ? result.map(n => String.fromCharCode(n))
        : String.fromCharCode(result);
    }
  }

  /**
   * Based on the Shunting-yard algorithm.
   */
  let { last: last$1 } = List();

  const default_context = {
    'π': Math.PI,
    gcd: (a, b) => {
      while (b) [a, b] = [b, a % b];
      return a;
    }
  };

  function calc(input, context) {
    const expr = infix_to_postfix(input);
    return calc$1(expr, Object.assign({}, default_context, context));
  }

  const operator = {
    '^': 7,
    '*': 6, '/': 6, '÷': 6, '%': 6,
    '&': 5, '|': 5,
    '+': 4, '-': 4,
    '<': 3, '<<': 3,
    '>': 3, '>>': 3,
    '=': 3, '==': 3,
    '≤': 3, '<=': 3,
    '≥': 3, '>=': 3,
    '≠': 3, '!=': 3,
    '∧': 2, '&&': 2,
    '∨': 2, '||': 2,
    '(': 1 , ')': 1,
  };

  function calc$1(expr, context, repeat = []) {
    let stack = [];
    while (expr.length) {
      let { name, value, type } = expr.shift();
      if (type === 'variable') {
        let result = context[value];
        if (is_invalid_number(result)) {
          result = Math[value];
        }
        if (is_invalid_number(result)) {
          result = expand$1(value, context);
        }
        if (is_invalid_number(result)) {
          if (/^\-\D/.test(value)) {
            result = expand$1('-1' + value.substr(1), context);
          }
        }
        if (result === undefined) {
          result = 0;
        }
        if (typeof result !== 'number') {
          repeat.push(result);
          if (is_cycle(repeat)) {
            result = 0;
            repeat = [];
          } else {
            result = calc$1(infix_to_postfix(result), context, repeat);
          }
        }
        stack.push(result);
      }
      else if (type === 'function') {
        let negative = false;
        if (/^\-/.test(name)) {
          negative = true;
          name = name.substr(1);
        }
        let output = value.map(v => calc$1(v, context));
        let fns = name.split('.');
        let fname;
        while (fname = fns.pop()) {
          if (!fname) continue;
          let fn = context[fname] || Math[fname];
          output = (typeof fn === 'function')
            ? (Array.isArray(output) ? fn(...output) : fn(output))
            : 0;
        }
        if (negative) {
          output = -1 * output;
        }
        stack.push(output);
      } else {
        if (/\d+/.test(value)) stack.push(value);
        else {
          let right = stack.pop();
          let left = stack.pop();
          stack.push(compute(
            value, Number(left), Number(right)
          ));
        }
      }
    }
    return Number(stack[0]) || 0;
  }

  function get_tokens$1(input) {
    let expr = String(input);
    let tokens = [], num = '';

    for (let i = 0; i < expr.length; ++i) {
      let c = expr[i];
      if (operator[c]) {
        let last_token = last$1(tokens);
        if (c == '=' && last_token && /^[!<>=]$/.test(last_token.value)) {
          last_token.value += c;
        }
        else if (/^[|&<>]$/.test(c) && last_token && last_token.value == c) {
          last_token.value += c;
        }
        else if (c == '-' && expr[i - 1] == 'e') {
          num += c;
        }
        else if (!tokens.length && !num.length && /[+-]/.test(c)) {
          num += c;
        } else {
          let { type, value } = last_token || {};
          if (type == 'operator'
              && !num.length
              && /[^()]/.test(c)
              && /[^()]/.test(value)) {
            num += c;
          } else {
            if (num.length) {
              tokens.push({ type: 'number', value: num });
              num = '';
            }
            tokens.push({ type: 'operator', value: c });
          }
        }
      }
      else if (/\S/.test(c)) {
        if (c == ',') {
          tokens.push({ type: 'number', value: num });
          num = '';
          tokens.push({ type: 'comma', value: c });
        } else if (c == '!') {
          tokens.push({ type: 'number', value: num });
          tokens.push({ type: 'operator', value: c });
          num = '';
        } else {
          num += c;
        }
      }
    }

    if (num.length) {
      tokens.push({ type: 'number', value: num });
    }
    return tokens;
  }

  function infix_to_postfix(input) {
    let tokens = get_tokens$1(input);
    const op_stack = [], expr = [];

    for (let i = 0; i < tokens.length; ++i) {
      let { type, value } = tokens[i];
      let next = tokens[i + 1] || {};
      if (type == 'number') {
        if (next.value == '(' && /[^\d.\-]/.test(value)) {
          let func_body = '';
          let stack = [];
          let values = [];

          i += 1;
          while (tokens[i++] !== undefined) {
            let token = tokens[i];
            if (token === undefined) break;
            let c = token.value;
            if (c == ')') {
              if (!stack.length) break;
              stack.pop();
              func_body += c;
            }
            else {
              if (c == '(') stack.push(c);
              if (c == ',' && !stack.length) {
                let arg = infix_to_postfix(func_body);
                if (arg.length) values.push(arg);
                func_body = '';
              } else {
                func_body += c;
              }
            }
          }

          if (func_body.length) {
            values.push(infix_to_postfix(func_body));
          }

          expr.push({
            type: 'function',
            name: value,
            value: values
          });
        }
        else if (/[^\d.\-]/.test(value)) {
          expr.push({ type: 'variable', value });
        }
        else {
          expr.push({ type: 'number', value });
        }
      }

      else if (type == 'operator') {
        if (value == '(') {
          op_stack.push(value);
        }

        else if (value == ')') {
          while (op_stack.length && last$1(op_stack) != '(') {
            expr.push({ type: 'operator', value: op_stack.pop() });
          }
          op_stack.pop();
        }

        else {
          while (op_stack.length && operator[last$1(op_stack)] >= operator[value]) {
            let op = op_stack.pop();
            if (!/[()]/.test(op)) expr.push({ type: 'operator', value: op });
          }
          op_stack.push(value);
        }
      }
    }

    while (op_stack.length) {
      expr.push({ type: 'operator', value: op_stack.pop() });
    }

    return expr;
  }

  function compute(op, a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '%': return a % b;
      case '|': return a | b;
      case '&': return a & b;
      case '<': return a < b;
      case '>': return a > b;
      case '^': return Math.pow(a, b);
      case '÷': case '/': return a / b;
      case '=': case '==': return a == b;
      case '≤': case '<=': return a <= b;
      case '≥': case '>=': return a >= b;
      case '≠': case '!=': return a != b;
      case '∧': case '&&': return a && b;
      case '∨': case '||': return a || b;
      case '<<': return a << b;
      case '>>': return a >> b;
    }
  }

  function expand$1(value, context) {
    let [_, num, variable] = value.match(/([\d.\-]+)(.*)/) || [];
    let v = context[variable];
    if (v === undefined) {
      return v;
    }
    if (typeof v === 'number') {
      return Number(num) * v;
    } else {
      return num * calc$1(infix_to_postfix(v), context);
    }
  }

  function is_cycle(array) {
    return (array[0] == array[2] && array[1] == array[3]);
  }

  const store = {};

  function memo(prefix, fn) {
    return (...args) => {
      let key = prefix + args.join('-');
      if (store[key]) return store[key];
      return (store[key] = fn.apply(null, args));
    }
  }

  const { last, flat_map } = List();

  function expand(fn) {
    return (...args) => fn.apply(null, flat_map(args, n =>
      String(n).startsWith('[') ? build_range(n) : n
    ));
  }

  function Type(type, value) {
    return { type, value };
  }

  function get_tokens(input) {
    let expr = String(input);
    let tokens = [], stack = [];
    if (!expr.startsWith('[') || !expr.endsWith(']')) {
      return tokens;
    }

    for (let i = 1; i < expr.length - 1; ++i) {
      let c = expr[i];
      if (c == '-' && expr[i - 1] == '-') {
        continue;
      }
      if (c == '-') {
        stack.push(c);
        continue;
      }
      if (last(stack) == '-') {
        stack.pop();
        let from = stack.pop();
        tokens.push(from
          ? Type('range', [ from, c ])
          : Type('char', c)
        );
        continue;
      }
      if (stack.length) {
        tokens.push(Type('char', stack.pop()));
      }
      stack.push(c);
    }
    if (stack.length) {
      tokens.push(Type('char', stack.pop()));
    }
    return tokens;
  }

  const build_range = memo('build_range', (input) => {
    let tokens = get_tokens(input);
    return flat_map(tokens, ({ type, value }) => {
      if (type == 'char') return value;
      let [ from, to ] = value;
      let reverse = false;
      if (from > to) {
        [from, to] = [ to, from ];
        reverse = true;
      }
      let result = by_charcode(range)(from, to);
      if (reverse) result.reverse();
      return result;
    });
  });

  class Node {
    constructor(data) {
      this.prev = this.next = null;
      this.data = data;
    }
  }

  class Stack {
    constructor(limit = 20) {
      this._limit = limit;
      this._size = 0;
    }

    push(data) {
      if (this._size >= this._limit) {
        this.root = this.root.next;
        this.root.prev = null;
      }

      let node = new Node(data);

      if (!this.root) {
        this.root = this.tail = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }

      this._size++;
    }

    last(n = 1) {
      let node = this.tail;
      while (--n) {
        if (!node.prev) break;
        node = node.prev;
      }
      return node.data;
    }
  }

  function parse$3(input) {
    let iter = iterator$1(scan(input));
    let commands = {};
    let tokens = [];
    let name;
    let negative = false;
    while (iter.next()) {
      let { prev, curr, next } = iter.get();
      if (curr.isSymbol(':') && !name) {
        name = joinTokens$1(tokens);
        tokens = [];
      } else if (curr.isSymbol(';') && name) {
        commands[name] = transformNegative(name, joinTokens$1(tokens), negative);
        tokens = [];
        name = null;
        negative = false;
      } else if (!curr.isSymbol(';')) {
        let prevMinus = prev && prev.isSymbol('-');
        let nextMinus = next && next.isSymbol('-');
        let currMinus = curr.isSymbol('-');
        if (!name && !tokens.length && currMinus && !prevMinus && !nextMinus) {
          if (next && next.isSymbol(':')) {
            tokens.push(curr);
          } else {
            negative = true;
          }
        } else {
          tokens.push(curr);
        }
      }
    }

    if (tokens.length && name) {
      commands[name] = transformNegative(name, joinTokens$1(tokens), negative);
    }

    return commands;
  }

  function transformNegative(name, value, negative) {
    if (name === 'fill-rule') {
      return value;
    }
    return negative ? `-1 * (${ value })` : value;
  }

  function joinTokens$1(tokens) {
    return tokens.map(n => n.value).join('');
  }

  const { cos, sin, atan2, PI } = Math;

  const _ = make_tag_function(c => {
    return create_shape_points(
      parse$3(c), {min: 3, max: 3600}
    );
  });

  const shapes = {
    circle: () => _`
    split: 180;
    scale: .99
  `,

    triangle: () => _`
    rotate: 30;
    scale: 1.1;
    move: 0 .2
  `,

    pentagon: () => _`
    split: 5;
    rotate: 54
  `,

    hexagon: () => _`
    split: 6;
    rotate: 30;
    scale: .98
  `,

    octagon: () => _`
    split: 8;
    rotat: 22.5;
    scale: .99
  `,

    star: () => _`
    split: 10;
    r: cos(5t);
    rotate: -18;
    scale: .99
  `,

    infinity: () => _`
    split: 180;
    scale: .99;
    x: cos(t)*.99 / (sin(t)^2 + 1);
    y: x * sin(t)
  `,

    heart: () => _`
    split: 180;
    rotate: 180;
    a: cos(t)*13/18 - cos(2t)*5/18;
    b: cos(3t)/18 + cos(4t)/18;
    x: (.75 * sin(t)^3) * 1.2;
    y: (a - b + .2) * -1.1
  `,

    bean: () => _`
    split: 180;
    r: sin(t)^3 + cos(t)^3;
    move: -.35 .35;
  `,

    bicorn: () => _`
    split: 180;
    x: cos(t);
    y: sin(t)^2 / (2 + sin(t)) - .5
  `,

    drop: () => _`
    split: 180;
    rotate: 90;
    scale: .95;
    x: sin(t);
    y: (1 + sin(t)) * cos(t) / 1.6
  `,

    fish: () => _`
    split: 240;
    x: cos(t) - sin(t)^2 / sqrt(2) - .04;
    y: sin(2t)/2
  `,

    whale: () => _`
    split: 240;
    rotate: 180;
    R: 3.4 * (sin(t)^2 - .5) * cos(t);
    x: cos(t) * R + .75;
    y: sin(t) * R * 1.2
  `,

    windmill:  () => _`
    split: 18;
    R: seq(.618, 1, 0);
    T: seq(t-.55, t, t);
    x: R * cos(T);
    y: R * sin(T)
  `,

    vase: () => _`
    split: 240;
    scale: .3;
    x: sin(4t) + sin(t) * 1.4;
    y: cos(t) + cos(t) * 4.8 + .3
  `,

    clover: (k = 3) => {
      k = clamp(k, 3, 5);
      if (k == 4) k = 2;
      return _`
      split: 240;
      r: cos(${k}t);
      scale: .98
    `;
    },

    hypocycloid: (k = 3) => {
      k = clamp(k, 3, 5);
      let scale = [0, 0, 0, .34, .25, .19][k];
      return _`
      split: 240;
      scale: ${scale};
      k: ${k};
      x: (k-1)*cos(t) + cos((k-1)*t);
      y: (k-1)*sin(t) - sin((k-1)*t)
    `;
    },

    bud: (k = 3) => {
      k = clamp(k, 3, 10);
      return _`
      split: 240;
      scale: .8;
      r: 1 + .2 * cos(${k}t)
    `;
    },
  };

  function create_polygon_points(option, fn) {
    if (typeof arguments[0] == 'function') {
      fn = option;
      option = {};
    }

    if (!fn) {
      fn = t => [ cos(t), sin(t) ];
    }

    let split = option.split || 180;
    let turn = option.turn || 1;
    let frame = option.frame;
    let fill = option['fill'] || option['fill-rule'];

    let rad = (PI * 2) * turn / split;
    let points = [];
    let first_point, first_point2;

    if (fill == 'nonzero' || fill == 'evenodd') {
      points.push(fill);
    }

    let factor = (option.scale === undefined) ? 1 : option.scale;
    let add = ([x1, y1]) => {
      let [x, y] = scale(x1, -y1, factor);
      if (!option.absolute) {
        x = (x + 1) * 50 + '%';
        y = (y + 1) * 50 + '%';
      }
      points.push(x + ' ' + y);
    };

    for (let i = 0; i < split; ++i) {
      let t = rad * i;
      let point = fn(t, i);
      if (!i) first_point = point;
      add(point);
    }

    if (frame !== undefined) {
      add(first_point);
      let w = frame / 100;
      if (turn > 1) w *= 2;
      if (w == 0) w = .002;
      for (let i = 0; i < split; ++i) {
        let t = -rad * i;
        let [x, y, dx = 0, dy = 0] = fn(t, i);
        let theta = atan2(y + dy, x - dx);
        let point = [
          x - w * cos(theta),
          y - w * sin(theta)
        ];
        if (!i) first_point2 = point;
        add(point);
      }
      add(first_point2);
      add(first_point);
    }

    return points;
  }

  function rotate(x, y, deg) {
    let rad = -PI / 180 * deg;
    return [
      x * cos(rad) - y * sin(rad),
      y * cos(rad) + x * sin(rad)
    ];
  }

  function translate(x, y, offset) {
    let [dx, dy = dx] = String(offset).split(/[,\s]+/).map(Number);
    return [
      x + (dx || 0),
      y - (dy || 0),
      dx,
      dy
    ];
  }

  function scale(x, y, factor) {
    let [fx, fy = fx] = String(factor).split(/[,\s]+/).map(Number);
    return [
      x * fx,
      y * fy
    ];
  }

  function create_shape_points(props, {min, max}) {
    let split = clamp(parseInt(props.vertices || props.points || props.split) || 0, min, max);
    let option = Object.assign({}, props, { split });
    let px = is_empty(props.x) ? 'cos(t)' : props.x;
    let py = is_empty(props.y) ? 'sin(t)' : props.y;
    let pr = is_empty(props.r) ? ''       : props.r;

    if (props.degree) {
      props.rotate = props.degree;
    }

    if (props.origin) {
      props.move = props.origin;
    }

    return create_polygon_points(option, (t, i) => {
      let context = Object.assign({}, props, {
        't': t,
        'θ': t,
        'seq': (...list) => {
          if (!list.length) return '';
          return list[i % list.length];
        },
        'range': (a, b = 0) => {
          a = Number(a) || 0;
          b = Number(b) || 0;
          if (a > b) [a, b] = [b, a];
          let step = Math.abs(b - a) / (split - 1);
          return a + step * i;
        }
      });
      let x = calc(px, context);
      let y = calc(py, context);
      let dx = 0;
      let dy = 0;
      if (pr) {
        let r = calc(pr, context);
        x = r * Math.cos(t);
        y = r * Math.sin(t);
      }
      if (props.rotate) {
        [x, y] = rotate(x, y, Number(props.rotate) || 0);
      }
      if (props.move) {
        [x, y, dx, dy] = translate(x, y, props.move);
      }
      return [x, y, dx, dy];
    });
  }

  function parse$2(input, noSpace) {
    let group = [];
    let tokens = [];
    let parenStack = [];
    let quoteStack = [];

    if (is_empty(input)) {
      return group;
    }

    let iter = iterator$1(scan(input));

    function isSeperator(token) {
      if (noSpace) {
        return token.isSymbol(',');
      }
      return token.isSymbol(',') || token.isSpace();
    }

    while (iter.next()) {
      let { prev, curr, next }  = iter.get();
      if (curr.isSymbol('(')) {
        parenStack.push(curr.value);
      }
      if (curr.isSymbol(')')) {
        parenStack.pop();
      }
      if (curr.status === 'open') {
        quoteStack.push(curr.value);
      }
      if (curr.status === 'close') {
        quoteStack.pop();
      }
      if (isSeperator(curr) && !parenStack.length && !quoteStack.length) {
        group.push(joinTokens(tokens));
        tokens = [];
      } else {
        tokens.push(curr);
      }
    }

    if (tokens.length) {
      group.push(joinTokens(tokens));
    }

    return group;
  }

  function joinTokens(tokens) {
    return tokens.map(n => n.value).join('');
  }

  function readStatement(iter, token) {
    let fragment = [];
    while (iter.next()) {
      let { curr, next } = iter.get();
      let isStatementBreak = !next || curr.isSymbol(';') || next.isSymbol('}');
      fragment.push(curr);
      if (isStatementBreak) {
        break;
      }
    }
    if (fragment.length) {
      token.value = joinToken(fragment);
    }
    return token;
  }

  function walk(iter, parentToken) {
    let rules = [];
    let fragment = [];
    let tokenType = parentToken && parentToken.type || '';

    while (iter.next()) {
      let { prev, curr, next } = iter.get();
      let isBlockBreak = !next || curr.isSymbol('}');

      if (tokenType === 'block' && isBlockBreak) {
        if (!next && rules.length && !curr.isSymbol('}')) {
          rules[rules.length - 1].value += (';' + curr.value);
        }
        parentToken.value = rules;
        break;
      }
      else if (curr.isSymbol('{')) {
        let selectors = getGroups(fragment, token => token.isSpace());
        if (!selectors.length) {
          continue;
        }
        let tokenName = selectors.pop();
        let block = resolveId(walk(iter, {
          type: 'block',
          name: tokenName,
          value: []
        }));
        while (tokenName = selectors.pop()) {
          block = resolveId({
            type: 'block',
            name: tokenName,
            value: [block]
          });
        }
        rules.push(block);
        fragment = [];
      }
      else if (
        curr.isSymbol(':')
        && !isSpecialProperty(prev, next)
        && fragment.length
      ) {
        let props = getGroups(fragment, token => token.isSymbol(','));
        let value = readStatement(iter, {
          type: 'statement',
          name: 'unkown',
          value: ''
        });
        props.forEach(prop => {
          rules.push(Object.assign({}, value, { name: prop }));
        });
        if (tokenType == 'block') {
          parentToken.value = rules;
        }
        fragment = [];
      }
      else if (curr.isSymbol(';')) {
        if (rules.length && fragment.length) {
          rules[rules.length - 1].value += (';' + joinToken(fragment));
          fragment = [];
        }
      } else {
        fragment.push(curr);
      }
    }

    if (rules.length && tokenType == 'block') {
      parentToken.value = rules;
    }
    return tokenType ? parentToken : rules;
  }

  function isSpecialProperty(prev, next) {
    const names = [
      'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role',
      'xlink:show',    'xlink:title',   'xlink:type',
      'xml:base',      'xml:lang',      'xml:space',
    ];
    let prevValue = prev && prev.value;
    let nextValue = next && next.value;
    return names.includes(prevValue + ':' + nextValue);
  }

  function joinToken(tokens) {
    return tokens
      .filter((token, i) => {
        if (token.isSymbol(';', '}') && i === tokens.length - 1) return false;
        return true;
      })
      .map(n => n.value).join('');
  }

  function resolveId(block) {
    let name = block.name || '';
    let [tokenName, ...ids] = name.split(/#/);
    let id = ids[ids.length - 1];
    if (id) {
      block.name = tokenName;
      block.value.push({
        type: 'statement',
        name: 'id',
        value: id,
      });
    }
    return block;
  }

  function getGroups(tokens, fn) {
    let group = [];
    let temp = [];
    tokens.forEach(token => {
      if (fn(token)) {
        group.push(joinToken(temp));
        temp = [];
      } else {
        temp.push(token);
      }
    });
    if (temp.length) {
      group.push(joinToken(temp));
    }
    return group;
  }

  function parse$1(source, root) {
    let iter = iterator$1(scan(source));
    let tokens = walk(iter, root || {
      type: 'block',
      name: 'svg',
      value: []
    });
    return tokens;
  }

  const commands = 'MmLlHhVvCcSsQqTtAaZz';
  const relatives = 'mlhvcsqtaz';

  function parse(input) {
    let iter = iterator$1(scan(input));
    let temp = {};
    let result = {
      commands: [],
      valid: true
    };
    while (iter.next()) {
      let { curr } = iter.get();
      if (curr.isSpace() || curr.isSymbol(',')) {
        continue;
      }
      if (curr.isWord()) {
        if (temp.name) {
          result.commands.push(temp);
          temp = {};
        }
        temp.name = curr.value;
        temp.value = [];
        if (!commands.includes(curr.value)) {
          temp.type = 'unknown';
          result.valid = false;
        } else if (relatives.includes(curr.value)) {
          temp.type = 'relative';
        } else {
          temp.type = 'absolute';
        }
      } else if (temp.value) {
        let value = curr.value;
        if (curr.isNumber()) {
          value = Number(curr.value);
        }
        temp.value.push(value);
      } else if (!temp.name) {
        result.valid = false;
      }
    }
    if (temp.name) {
      result.commands.push(temp);
    }
    return result;
  }

  const uniform_time = {
    'name': 'cssd-uniform-time',
    'animation-name': 'cssd-uniform-time-animation',
    'animation-duration': '31536000000', /* one year in ms */
    'animation-iteration-count': 'infinite',
    'animation-delay': '0s',
    'animation-direction': 'normal',
    'animation-fill-mode': 'none',
    'animation-play-state': 'running',
    'animation-timing-function': 'linear',
  };

  uniform_time['animation'] = `
  ${ uniform_time['animation-duration'] }ms
  ${ uniform_time['animation-timing-function'] }
  ${ uniform_time['animation-delay'] }
  ${ uniform_time['animation-iteration-count'] }
  ${ uniform_time['animation-name'] }
`;

  function get_exposed(random) {
    const { shuffle } = List(random);
    const { pick, rand, nrand, unique_id } = random_func(random);

    const Expose = {

      index({ count }) {
        return _ => count;
      },

      row({ y }) {
        return _ => y;
      },

      col({ x }) {
        return _ => x;
      },

      depth({ z }) {
        return _ => z;
      },

      size({ grid }) {
        return _ => grid.count;
      },

      ['size-row']({ grid }) {
        return _ => grid.y;
      },

      ['size-col']({ grid }) {
        return _ => grid.x;
      },

      ['size-depth']({ grid }) {
        return _ => grid.z;
      },

      id({ x, y, z }) {
        return _ => cell_id(x, y, z);
      },

      n({ extra }) {
        return n => extra ? (extra[0] + (Number(n) || 0)) : '@n';
      },

      nx({ extra }) {
        return n => extra ? (extra[1] + (Number(n) || 0)) : '@nx';
      },

      ny({ extra }) {
        return n => extra ? (extra[2] + (Number(n) || 0)) : '@ny';
      },

      N({ extra }) {
        return n => extra ? (extra[3] + (Number(n) || 0)) : '@N';
      },

      repeat: (
        make_sequence('')
      ),

      multiple: (
        make_sequence(',')
      ),

      ['multiple-with-space']: (
        make_sequence(' ')
      ),

      pick({ context }) {
        return expand((...args) => {
          return push_stack(context, 'last_pick', pick(args));
        });
      },

      ['pick-n']({ context, extra, position }) {
        let counter = 'pn-counter' + position;
        return expand((...args) => {
          if (!context[counter]) context[counter] = 0;
          context[counter] += 1;
          let max = args.length;
          let [idx = context[counter]] = extra || [];
          let pos = (idx - 1) % max;
          let value = args[pos];
          return push_stack(context, 'last_pick', value);
        });
      },

      ['pick-d']({ context, extra, position }) {
        let counter = 'pd-counter' + position;
        let values = 'pd-values' + position;
        return expand((...args) => {
          if (!context[counter]) context[counter] = 0;
          context[counter] += 1;
          if (!context[values]) {
            context[values] = shuffle(args);
          }
          let max = args.length;
          let [idx = context[counter]] = extra || [];
          let pos = (idx - 1) % max;
          let value = context[values][pos];
          return push_stack(context, 'last_pick', value);
        });
      },

      ['last-pick']({ context }) {
        return (n = 1) => {
          let stack = context.last_pick;
          return stack ? stack.last(n) : '';
        };
      },

      rand({ context }) {
        return (...args) => {
          let transform_type = args.every(is_letter)
            ? by_charcode
            : by_unit;
          let value = transform_type(rand).apply(null, args);
          return push_stack(context, 'last_rand', value);
        };
      },

      nrand({ context }) {
        return (...args) => {
          let transform_type = args.every(is_letter)
            ? by_charcode
            : by_unit;
          let value = transform_type(nrand).apply(null, args);
          return push_stack(context, 'last_rand', value);
        };
      },

      ['rand-int']({ context }) {
        return (...args) => {
          let transform_type = args.every(is_letter)
            ? by_charcode
            : by_unit;
          let rand_int = (...args) => Math.round(rand(...args));
          let value = transform_type(rand_int).apply(null, args);
          return push_stack(context, 'last_rand', value);
        }
      },

      ['nrand-int']({ context }) {
        return (...args) => {
          let transform_type = args.every(is_letter)
            ? by_charcode
            : by_unit;
          let nrand_int = (...args) => Math.round(nrand(...args));
          let value = transform_type(nrand_int).apply(null, args);
          return push_stack(context, 'last_rand', value);
        }
      },

      ['last-rand']({ context }) {
        return (n = 1) => {
          let stack = context.last_rand;
          return stack ? stack.last(n) : '';
        };
      },

      stripe() {
        return (...input) => {
          let colors = input.map(get_value);
          let max = colors.length;
          let default_count = 0;
          let custom_sizes = [];
          let prev;
          if (!max) {
            return '';
          }
          colors.forEach(step => {
            let [_, size] = parse$2(step);
            if (size !== undefined) custom_sizes.push(size);
            else default_count += 1;
          });
          let default_size = custom_sizes.length
            ? `(100% - ${custom_sizes.join(' - ')}) / ${default_count}`
            : `100% / ${max}`;
          return colors.map((step, i) => {
            if (custom_sizes.length) {
              let [color, size] = parse$2(step);
              let prefix = prev ? (prev + ' + ') : '';
              prev = prefix + (size !== undefined ? size : default_size);
              return `${color} 0 calc(${ prev })`
            }
            return `${step} 0 ${100 / max * (i + 1)}%`
          })
          .join(',');
        }
      },

      reflect() {
        return (...input) => {
          return [
            ...input,
            ...input.slice(0, -1).reverse()
          ].join(',');
        }
      },

      calc() {
        return value => calc(get_value(value));
      },

      hex() {
        return value => parseInt(get_value(value)).toString(16);
      },

      svg: lazy((...args) => {
        let value = args.map(input => get_value(input()).trim()).join(',');
        if (!value.startsWith('<')) {
          let parsed = parse$1(value);
          value = generate_svg(parsed);
        }
        let svg = normalize_svg(value);
        return create_svg_url(svg);
      }),

      ['svg-filter']: lazy((...args) => {
        let value = args.map(input => get_value(input()).trim()).join(',');
        let id = unique_id('filter-');
        if (!value.startsWith('<')) {
          let parsed = parse$1(value, {
            type: 'block',
            name: 'filter'
          });
          value = generate_svg(parsed);
        }
        let svg = normalize_svg(value).replace(
          /<filter([\s>])/,
          `<filter id="${ id }"$1`
        );
        return create_svg_url(svg, id);
      }),

      var() {
        return value => `var(${ get_value(value) })`;
      },

      t() {
        return value => `var(--${ uniform_time.name })`;
      },

      plot({ count, context, extra, position, grid }) {
        let key = 'offset-points' + position;
        return commands => {
          let [idx = count, _, __, max = grid.count] = extra || [];
          if (!context[key]) {
            let config = parse$3(commands);
            config.points = max;
            context[key] = create_shape_points(config, {min: 1, max: 65536});
          }
          return context[key][idx - 1];
        };
      },

      Plot({ count, context, extra, position, grid }) {
        let key = 'offset-points' + position;
        return commands => {
          let [idx = count, _, __, max = grid.count] = extra || [];
          if (!context[key]) {
            let config = parse$3(commands);
            config.points = max;
            config.absolute = true;
            context[key] = create_shape_points(config, {min: 1, max: 65536});
          }
          return context[key][idx - 1];
        };
      },

      shape() {
        return memo('shape-function', (type = '', ...args) => {
          type = String(type).trim();
          let points = [];
          if (type.length) {
            if (typeof shapes[type] === 'function') {
              points = shapes[type](args);
            } else {
              let commands = type;
              let rest = args.join(',');
              if (rest.length) {
                commands = type + ',' + rest;
              }
              let config = parse$3(commands);
              points = create_shape_points(config, {min: 3, max: 3600});
            }
          }
          return `polygon(${points.join(',')})`;
        });
      },

      doodle() {
        return value => value;
      },

      shaders() {
        return value => value;
      },

      canvas() {
        return value => value;
      },

      path() {
        return value => value;
      },

      invert() {
        return commands => {
          let parsed = parse(commands);
          if (!parsed.valid) return commands;
          return parsed.commands.map(({ name, value }) => {
            switch (name) {
              case 'v': return 'h' + value.join(' ');
              case 'V': return 'H' + value.join(' ');
              case 'h': return 'v' + value.join(' ');
              case 'H': return 'V' + value.join(' ');
              default:  return name + value.join(' ');
            }
          }).join(' ');
        };
      },

      flipH() {
        return commands => {
          let parsed = parse(commands);
          if (!parsed.valid) return commands;
          return parsed.commands.map(({ name, value }) => {
            switch (name) {
              case 'h':
              case 'H': return name + value.map(flip_value).join(' ');
              default:  return name + value.join(' ');
            }
          }).join(' ');
        };
      },

      flipV() {
        return commands => {
          let parsed = parse(commands);
          if (!parsed.valid) return commands;
          return parsed.commands.map(({ name, value }) => {
            switch (name) {
              case 'v':
              case 'V': return name + value.map(flip_value).join(' ');
              default:  return name + value.join(' ');
            }
          }).join(' ');
        };
      },

      flip(...args) {
        let flipH = Expose.flipH(...args);
        let flipV = Expose.flipV(...args);
        return commands => {
          return flipV(flipH(commands));
        }
      },

      reverse(...args) {
        return commands => {
          let parsed = parse(commands);
          if (!parsed.valid) return commands;
          return parsed.commands.reverse().map(({ name, value }) => {
            return name + value.join(' ');
          }).join(' ');
        }
      },

    };

    function make_sequence(c) {
      return lazy((n, ...actions) => {
        if (!actions || !n) return '';
        let count = get_value(n());
        let evaluated = calc(count);
        if (evaluated === 0) {
          evaluated = count;
        }
        return sequence(
          evaluated,
          (...args) => {
            return actions.map(action => {
              return get_value(action(...args))
            }).join(',');
          }
        ).join(c);
      });
    }

    function push_stack(context, name, value) {
      if (!context[name]) context[name] = new Stack();
      context[name].push(value);
      return value;
    }

    function flip_value(num) {
      return -1 * num;
    }

    return alias_for(Expose, {
      'm': 'multiple',
      'M': 'multiple-with-space',

      'r':    'rand',
      'rn':   'nrand',
      'ri':   'rand-int',
      'rni':  'nrand-int',
      'lr':   'last-rand',

      'p':  'pick',
      'pn': 'pick-n',
      'pd': 'pick-d',
      'lp': 'last-pick',

      'rep': 'repeat',

      'i': 'index',
      'x': 'col',
      'y': 'row',
      'z': 'depth',

      'I': 'size',
      'X': 'size-col',
      'Y': 'size-row',
      'Z': 'size-depth',

      'flipv': 'flipV',
      'fliph': 'flipH',

      // legacy names, keep them before 1.0
      'nr': 'rn',
      'nri': 'nri',
      'ms': 'multiple-with-space',
      's':  'size',
      'sx': 'size-col',
      'sy': 'size-row',
      'sz': 'size-depth',
      'size-x': 'size-col',
      'size-y': 'size-row',
      'size-z': 'size-depth',
      'multi': 'multiple',
      'pick-by-turn': 'pick-n',
      'max-row': 'size-row',
      'max-col': 'size-col',
      'offset': 'plot',
      'Offset': 'Plot',
      'point': 'plot',
      'Point': 'Plot',

      // error prone
      'stripes': 'stripe',
      'strip':   'stripe',
    });
  }

  let all = [];

  function get_props(arg) {
    if (!all.length) {
      let props = new Set();
      for (let n in document.head.style) {
        if (!n.startsWith('-')) {
          props.add(n.replace(/[A-Z]/g, '-$&').toLowerCase());
        }
      }
      if (!props.has('grid-gap')) {
        props.add('grid-gap');
      }
      all = Array.from(props);
    }
    return (arg && arg.test)
      ? all.filter(n => arg.test(n))
      : all;
  }

  function build_mapping(prefix) {
    let reg = new RegExp(`\\-?${ prefix }\\-?`);
    return get_props(reg)
      .map(n => n.replace(reg, ''))
      .reduce((obj, n) => { return obj[n] = n, obj }, {});
  }

  const props_webkit_mapping = build_mapping('webkit');
  const props_moz_mapping = build_mapping('moz');

  function prefixer(prop, rule) {
    if (props_webkit_mapping[prop]) {
      return `-webkit-${ rule } ${ rule }`;
    }
    else if (props_moz_mapping[prop]) {
      return `-moz-${ rule } ${ rule }`;
    }
    return rule;
  }

  const presets = {

   '4a0': [ 1682, 2378 ],
   '2a0': [ 1189, 1682 ],
    a0:   [ 841, 1189 ],
    a1:   [ 594, 841 ],
    a2:   [ 420, 594 ],
    a3:   [ 297, 420 ],
    a4:   [ 210, 297 ],
    a5:   [ 148, 210 ],
    a6:   [ 105, 148 ],
    a7:   [ 74, 105 ],
    a8:   [ 52, 74 ],
    a9:   [ 37, 52 ],
    a10:  [ 26, 37 ],

    b0:  [ 1000, 1414 ],
    b1:  [ 707, 1000 ],
    b2:  [ 500, 707 ],
    b3:  [ 353, 500 ],
    b4:  [ 250, 353 ],
    b5:  [ 176, 250 ],
    b6:  [ 125, 176 ],
    b7:  [ 88, 125 ],
    b8:  [ 62, 88 ],
    b9:  [ 44, 62 ],
    b10: [ 31, 44 ],
    b11: [ 22, 32 ],
    b12: [ 16, 22 ],

    c0:  [ 917, 1297 ],
    c1:  [ 648, 917 ],
    c2:  [ 458, 648 ],
    c3:  [ 324, 458 ],
    c4:  [ 229, 324 ],
    c5:  [ 162, 229 ],
    c6:  [ 114, 162 ],
    c7:  [ 81, 114 ],
    c8:  [ 57, 81 ],
    c9:  [ 40, 57 ],
    c10: [ 28, 40 ],
    c11: [ 22, 32 ],
    c12: [ 16, 22 ],

    d0: [ 764, 1064 ],
    d1: [ 532, 760 ],
    d2: [ 380, 528 ],
    d3: [ 264, 376 ],
    d4: [ 188, 260 ],
    d5: [ 130, 184 ],
    d6: [ 92, 126 ],

    letter:   [ 216, 279 ],
    postcard: [ 100, 148 ],
    poster:   [ 390, 540 ],
  };

  const modes = {
    portrait: 'p',
    pt: 'p',
    p: 'p',

    landscape: 'l',
    ls: 'l',
    l: 'l',
  };

  const unit = 'mm';

  function get_preset(name, mode) {
    name = String(name).toLowerCase();

    // Default to landscape mode
    let [h, w] = presets[name] || [];

    if (modes[mode] == 'p') {
      [w, h] = [h, w];
    }

    return [w, h].map(n => n + unit);
  }

  function is_preset(name) {
    return !!presets[name];
  }

  var Property = {

    ['@size'](value, { is_special_selector, grid }) {
      let [w, h = w] = parse$2(value);
      if (is_preset(w)) {
        [w, h] = get_preset(w, h);
      }
      let styles = `
      width: ${ w };
      height: ${ h };
    `;
      if (is_special_selector) {
        if (w === 'auto' || h === 'auto') {
          styles += `aspect-ratio: ${ grid.ratio };`;
        }
      } else {
        styles += `
        --internal-cell-width: ${ w };
        --internal-cell-height: ${ h };
      `;
      }
      return styles;
    },

    ['@min-size'](value) {
      let [w, h = w] = parse$2(value);
      return `min-width: ${ w }; min-height: ${ h };`;
    },

    ['@max-size'](value) {
      let [w, h = w] = parse$2(value);
      return `max-width: ${ w }; max-height: ${ h };`;
    },

    ['@place-cell']: (() => {
      let map_left_right = {
        'center': '50%',
        'left': '0%', 'right': '100%',
        'top': '50%', 'bottom': '50%'
      };
      let map_top_bottom = {
        'center': '50%',
        'top': '0%', 'bottom': '100%',
        'left': '50%', 'right': '50%',
      };

      return value => {
        let [left, top = '50%'] = parse$2(value);
        left = map_left_right[left] || left;
        top = map_top_bottom[top] || top;
        const cw = 'var(--internal-cell-width, 25%)';
        const ch = 'var(--internal-cell-height, 25%)';
        return `
        position: absolute;
        left: ${ left };
        top: ${ top };
        width: ${ cw };
        height: ${ ch };
        margin-left: calc(${ cw } / -2);
        margin-top: calc(${ ch } / -2);
        grid-area: unset;
      `;
      }
    })(),

    ['@grid'](value, options) {
      let [grid, ...size] = value.split('/').map(s => s.trim());
      size = size.join(' / ');
      return {
        grid: parse_grid(grid),
        size: size ? this['@size'](size, options) : ''
      };
    },

    ['@shape']: memo('shape-property', value => {
      let [type, ...args] = parse$2(value);
      let prop = 'clip-path';
      if (typeof shapes[type] !== 'function') return '';
      let points = shapes[type](...args);
      let rules = `${ prop }: polygon(${points.join(',')});`;
      return prefixer(prop, rules) + 'overflow: hidden;';
    }),

    ['@use'](rules) {
      if (rules.length > 2) {
        return rules;
      }
    }

  };

  function nth(input, curr, max) {
    for (let i = 0; i <= max; ++i) {
      if (calc(input, { n: i }) == curr) return true;
    }
  }

  const is = {
    even: n => !(n % 2),
    odd:  n => !!(n % 2)
  };

  function even_or_odd(expr) {
    return /^(even|odd)$/.test(expr);
  }

  function Selector(random) {

    return {

      at({ x, y }) {
        return (x1, y1) => (x == x1 && y == y1);
      },

      nth({ count, grid }) {
        return (...exprs) => exprs.some(expr =>
          even_or_odd(expr)
            ? is[expr](count)
            : nth(expr, count, grid.count)
        );
      },

      row({ y, grid }) {
        return (...exprs) => exprs.some(expr =>
          even_or_odd(expr)
            ? is[expr](y)
            : nth(expr, y, grid.y)
        );
      },

      col({ x, grid }) {
        return (...exprs) => exprs.some(expr =>
          even_or_odd(expr)
            ? is[expr](x)
            : nth(expr, x, grid.x)
        );
      },

      even({ count, grid, y }) {
        return arg => {
          if (arg === 'cross' && is.even(grid.x)) {
            let m = is.even(y) ? 'odd' : 'even';
            return is[m](count);
          } else {
            return is.even(count);
          }
        }
      },

      odd({ count, grid, y}) {
        return arg => {
          if (arg === 'cross' && is.even(grid.x)) {
            let m = is.even(y) ? 'even' : 'odd';
            return is[m](count);
          } else {
            return is.odd(count);
          }
        }
      },

      random() {
        return (ratio = .5) => {
          if (ratio >= 1 && ratio <= 0) ratio = .5;
          return random() < ratio;
        }
      },

      match({ count, grid, x, y }) {
        return expr => {
          return !!calc('(' + expr + ')', {
            x, X: grid.x,
            y, Y: grid.y,
            i: count, I: grid.count,
            random,
          });
        }
      }

    }
  }

  // Expose all Math functions and constants.
  const methods = Object.getOwnPropertyNames(Math);

  var MathFunc = methods.reduce((expose, n) => {
    expose[n] = () => (...args) => {
      args = args.map(get_value);
      if (typeof Math[n] === 'number') return Math[n];
      return Math[n].apply(null, args.map(calc));
    };
    return expose;
  }, {});

  const initial = {
    length: '0px',
    number: 0,
    color: 'black',
    url: 'url()',
    image: 'url()',
    integer: 0,
    angle: '0deg',
    time: '0ms',
    resolution: '0dpi',
    percentage: '0%',
    'length-percentage': '0%',
    'transform-function': 'translate(0)',
    'transform-list': 'translate(0)',
    'custom-ident': '_'
  };

  function get_definition(name) {
    let type = String(name).substr(2).split('-')[0];
    if (initial[type] !== undefined) {
      return {
        name: name,
        syntax: `<${type}> | <${type}>+ | <${type}>#`,
        initialValue: initial[type],
        inherits: false
      }
    }
  }

  let { join, make_array, remove_empty_values } = List();

  function is_host_selector(s) {
    return /^\:(host|doodle)/.test(s);
  }

  function is_parent_selector(s) {
    return /^\:(container|parent)/.test(s);
  }

  function is_special_selector(s) {
    return is_host_selector(s) || is_parent_selector(s);
  }

  class Rules {

    constructor(tokens, random) {
      this.tokens = tokens;
      this.rules = {};
      this.props = {};
      this.keyframes = {};
      this.grid = null;
      this.is_grid_defined = false;
      this.coords = [];
      this.doodles = {};
      this.canvas = {};
      this.shaders = {};
      this.paths = {};
      this.reset();
      this.Func = get_exposed(random);
      this.Selector = Selector(random);
      this.custom_properties = {};
      this.uniforms = {};
      this.unique_id = random_func(random).unique_id;
    }

    reset() {
      this.styles = {
        host: '',
        container: '',
        cells: '',
        keyframes: ''
      };
      this.coords = [];
      this.doodles = {};
      this.canvas = {};
      this.shaders = {};
      for (let key in this.rules) {
        if (key.startsWith('#c')) {
          delete this.rules[key];
        }
      }
    }

    add_rule(selector, rule) {
      let rules = this.rules[selector];
      if (!rules) {
        rules = this.rules[selector] = [];
      }
      rules.push.apply(rules, make_array(rule));
    }

    pick_func(name) {
      return this.Func[name] || MathFunc[name];
    }

    apply_func(fn, coords, args) {
      let _fn = fn(...make_array(coords));
      let input = [];
      args.forEach(arg => {
        let type = typeof arg.value;
        let is_string_or_number = (type === 'number' || type === 'string');

        if (!arg.cluster && (is_string_or_number)) {
          input.push(...parse$2(arg.value, true));
        }
        else {
          if (typeof arg === 'function') {
            input.push(arg);
          }
          else if (!is_nil(arg.value)) {
            let value = get_value(arg.value);
            input.push(value);
          }
        }
      });
      input = remove_empty_values(input);
      let result = _fn(...make_array(input));
      return result;
    }

    compose_aname(...args) {
      return args.join('-');
    }

    compose_selector({ x, y, z}, pseudo = '') {
      return `#${ cell_id(x, y, z) }${ pseudo }`;
    }

    is_composable(name) {
      return ['doodle', 'shaders', 'canvas'].includes(name);
    }

    compose_argument(argument, coords, extra = []) {
      let result = argument.map(arg => {
        if (arg.type === 'text') {
          return arg.value;
        }
        else if (arg.type === 'func') {
          let fname = arg.name.substr(1);
          let fn = this.pick_func(fname);

          if (typeof fn === 'function') {
            if (fname === 't') {
              this.uniforms.time = true;
            }
            if (this.is_composable(fname)) {
              let value = get_value((arg.arguments[0] || [])[0]);
              if (!is_nil(value)) {
                switch (fname) {
                  case 'doodle':
                    return this.compose_doodle(value);
                  case 'shaders':
                    return this.compose_shaders(value, coords);
                  case 'canvas':
                    return this.compose_canvas(value, coords);
                }
              }
            }
            coords.extra = extra;
            coords.position = arg.position;
            let args = arg.arguments.map(n => {
              return fn.lazy
                ? (...extra) => this.compose_argument(n, coords, extra)
                : this.compose_argument(n, coords, extra);
            });
            let value = this.apply_func(fn, coords, args);
            if (fname == 'path') {
              return this.compose_path(value);
            }
            return value;
          }
        }
      });

      return {
        cluster: argument.cluster,
        value: (result.length >= 2 ? ({ value: result.join('') }) : result[0])
      }
    }

    compose_doodle(doodle) {
      let id = this.unique_id('doodle');
      this.doodles[id] = doodle;
      return '${' + id + '}';
    }

    compose_shaders(shader, {x, y, z}) {
      let id = this.unique_id('shader');
      this.shaders[id] = {
        shader,
        cell: cell_id(x, y, z)
      };
      return '${' + id + '}';
    }

    compose_canvas(code, {x, y, z}) {
      let id = this.unique_id('canvas');
      this.canvas[id] = {
        code,
        cell: cell_id(x, y, z)
      };
      return '${' + id + '}';
    }

    compose_path(commands) {
      let id = this.unique_id('path');
      this.paths[id] = {
        id,
        commands
      };
      return '${' + id + '}';
    }

    compose_value(value, coords) {
      if (!Array.isArray(value)) {
        return '';
      }
      return value.reduce((result, val) => {
        switch (val.type) {
          case 'text': {
            result += val.value;
            break;
          }
          case 'func': {
            let fname = val.name.substr(1);
            let fn = this.pick_func(fname);
            if (typeof fn === 'function') {
              if (fname === 't') {
                this.uniforms.time = true;
              }
              if (this.is_composable(fname)) {
                let value = get_value((val.arguments[0] || [])[0]);
                if (!is_nil(value)) {
                  switch (fname) {
                    case 'doodle':
                      result += this.compose_doodle(value); break;
                    case 'shaders':
                      result += this.compose_shaders(value, coords); break;
                    case 'canvas':
                      result += this.compose_canvas(value, coords); break;
                  }
                }
              } else {
                coords.position = val.position;
                let args = val.arguments.map(arg => {
                  return fn.lazy
                    ? (...extra) => this.compose_argument(arg, coords, extra)
                    : this.compose_argument(arg, coords);
                });

                let output = this.apply_func(fn, coords, args);
                if (!is_nil(output)) {
                  if (fname == 'path') {
                    result += this.compose_path(output);
                  } else {
                    result += output;
                  }
                }
              }
            }
          }
        }
        return result;
      }, '');
    }

    compose_rule(token, _coords, selector) {
      let coords = Object.assign({}, _coords);
      let prop = token.property;
      let value_group = token.value.reduce((ret, v) => {
        let composed = this.compose_value(v, coords);
        if (composed) ret.push(composed);
        return ret;
      }, []);

      let value = value_group.join(', ');

      if (/^animation(\-name)?$/.test(prop)) {
        this.props.has_animation = true;

        if (is_host_selector(selector)) {
          let prefix = uniform_time[prop];
          if (prefix && value) {
            value =  prefix + ',' + value;
          }
        }

        if (coords.count > 1) {
          let { count } = coords;
          switch (prop) {
            case 'animation-name': {
              value = value_group
                .map(n => this.compose_aname(n, count))
                .join(', ');
              break;
            }
            case 'animation': {
              value = value_group
                .map(n => {
                  let group = (n || '').split(/\s+/);
                  group[0] = this.compose_aname(group[0], count);
                  return group.join(' ');
                })
                .join(', ');
            }
          }
        }
      }

      if (prop === 'content') {
        if (!/["']|^none$|^(var|counter|counters|attr)\(/.test(value)) {
          value = `'${ value }'`;
        }
      }

      if (prop === 'transition') {
        this.props.has_transition = true;
      }

      let rule = `${ prop }: ${ value };`;
      rule = prefixer(prop, rule);

      if (prop === 'clip-path') {
        // fix clip bug
        rule += ';overflow: hidden;';
      }

      if (prop === 'width' || prop === 'height') {
        if (!is_special_selector(selector)) {
          rule += `--internal-cell-${ prop }: ${ value };`;
        }
      }

      if (prop === 'background' && (value.includes('shader') || value.includes('canvas'))) {
        rule += 'background-size: 100% 100%;';
      }

      if (/^\-\-/.test(prop)) {
        this.custom_properties[prop] = value;
      }

      if (Property[prop]) {
        let transformed = Property[prop](value, {
          is_special_selector: is_special_selector(selector),
          grid: coords.grid
        });
        switch (prop) {
          case '@grid': {
            if (is_host_selector(selector)) {
              rule = transformed.size || '';
            } else {
              rule = '';
              if (!this.is_grid_defined) {
                transformed = Property[prop](value, {
                  is_special_selector: true,
                  grid: coords.grid
                });
                this.add_rule(':host', transformed.size || '');
              }
            }
            this.grid = coords.grid;
            this.is_grid_defined = true;
            break;
          }
          case '@place-cell': {
            if (!is_host_selector(selector)) {
              rule = transformed;
            }
            break;
          }
          case '@use': {
            if (token.value.length) {
              this.compose(coords, token.value);
            }
            rule = '';
            break;
          }
          default: {
            rule = transformed;
          }
        }
      }

      return rule;
    }

    pre_compose_rule(token, _coords) {
      let coords = Object.assign({}, _coords);
      let prop = token.property;

      switch (prop) {
        case '@grid': {
          let value_group = token.value.reduce((ret, v) => {
            let composed = this.compose_value(v, coords);
            if (composed) ret.push(composed);
            return ret;
          }, []);
          let value = value_group.join(', ');
          let transformed = Property[prop](value, {});
          this.grid = transformed.grid;
          break;
        }
        case '@use': {
          if (token.value.length) {
            this.pre_compose(coords, token.value);
          }
          break;
        }
      }
    }

    pre_compose(coords, tokens) {
      (tokens || this.tokens).forEach(token => {
        switch (token.type) {
          case 'rule': {
            this.pre_compose_rule(token, coords);
            break;
          }
          case 'pseudo': {
            if (is_host_selector(token.selector)) {
              (token.styles || []).forEach(token => {
                this.pre_compose_rule(token, coords);
              });
            }
            break;
          }
        }
      });
    }

    compose(coords, tokens, initial) {
      this.coords.push(coords);
      (tokens || this.tokens).forEach((token, i) => {
        if (token.skip) return false;
        if (initial && this.grid) return false;

        switch (token.type) {
          case 'rule': {
            this.add_rule(
              this.compose_selector(coords),
              this.compose_rule(token, coords)
            );
            break;
          }

          case 'pseudo': {
            if (token.selector.startsWith(':doodle')) {
              token.selector = token.selector.replace(/^\:+doodle/, ':host');
            }
            let special = is_special_selector(token.selector);
            if (special) {
              token.skip = true;
            }
            token.selector.split(',').forEach(selector => {
              let pseudo = token.styles.map(s =>
                this.compose_rule(s, coords, selector)
              );
              let composed = special
                ? selector
                : this.compose_selector(coords, selector);
              this.add_rule(composed, pseudo);
            });

            break;
          }

          case 'cond': {
            let fn = this.Selector[token.name.substr(1)];
            if (fn) {
              let args = token.arguments.map(arg => {
                return this.compose_argument(arg, coords);
              });
              let result = this.apply_func(fn, coords, args);
              if (result) {
                this.compose(coords, token.styles);
              }
            }
            break;
          }

          case 'keyframes': {
            if (!this.keyframes[token.name]) {
              this.keyframes[token.name] = coords => `
              ${ join(token.steps.map(step => `
                ${ step.name } {
                  ${ join(
                    step.styles.map(s => this.compose_rule(s, coords))
                  )}
                }
              `)) }
            `;
            }
          }
        }
      });
    }

    output() {
      Object.keys(this.rules).forEach((selector, i) => {
        if (is_parent_selector(selector)) {
          this.styles.container += `
          .container {
            ${ join(this.rules[selector]) }
          }
        `;
        } else {
          let target = is_host_selector(selector) ? 'host' : 'cells';
          let value = join(this.rules[selector]).trim();
          let name = (target === 'host') ? `${ selector }, .host` : selector;
          this.styles[target] += `${ name } { ${ value  } }`;
        }
      });

      let keyframes = Object.keys(this.keyframes);

      if (this.uniforms.time) {
        this.styles.container += `
        :host, .host {
          animation: ${ uniform_time.animation };
        }
      `;
        this.styles.keyframes += `
       @keyframes ${ uniform_time['animation-name'] } {
         from { --${ uniform_time.name }: 0 }
         to { --${ uniform_time.name }: ${ uniform_time['animation-duration'] } }
       }
      `;
      }

      this.coords.forEach((coords, i) => {
        keyframes.forEach(name => {
          let aname = this.compose_aname(name, coords.count);
          this.styles.keyframes += `
          ${ maybe(i === 0,
            `@keyframes ${ name } {
              ${ this.keyframes[name](coords) }
            }`
          )}
          @keyframes ${ aname } {
            ${ this.keyframes[name](coords) }
          }
        `;
        });
      });

      let definitions = [];
      Object.keys(this.custom_properties).forEach(name => {
        let def = get_definition(name);
        if (def) {
          definitions.push(def);
        }
      });

      return {
        props: this.props,
        styles: this.styles,
        grid: this.grid,
        doodles: this.doodles,
        shaders: this.shaders,
        paths: this.paths,
        canvas: this.canvas,
        definitions: definitions,
        uniforms: this.uniforms
      }
    }

  }

  function generator(tokens, grid_size, random) {
    let rules = new Rules(tokens, random);
    let context = {};

    rules.pre_compose({
      x: 1, y: 1, z: 1, count: 1, context: {},
      grid: { x: 1, y: 1, z: 1, count: 1 }
    });

    let { grid } = rules.output();
    if (grid) grid_size = grid;
    rules.reset();

    if (grid_size.z == 1) {
      for (let y = 1, count = 0; y <= grid_size.y; ++y) {
        for (let x = 1; x <= grid_size.x; ++x) {
          rules.compose({
            x, y, z: 1,
            count: ++count, grid: grid_size, context
          });
        }
      }
    }
    else {
      for (let z = 1, count = 0; z <= grid_size.z; ++z) {
        rules.compose({
          x: 1, y: 1, z,
          count: ++count, grid: grid_size, context
        });
      }
    }

    return rules.output();
  }

  /*
  Copyright 2019 David Bau.
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

  var global = window;
  var math = Math;
  var pool = [];

  //
  // The following constants are related to IEEE 754 limits.
  //

  var width = 256,        // each RC4 output is 0 <= x < 256
      chunks = 6,         // at least six RC4 outputs for each double
      digits = 52,        // there are 52 significant digits in a double
      rngname = 'random', // rngname: name for Math.random and Math.seedrandom
      startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto;         // node.js crypto module, initialized at the bottom.

  //
  // seedrandom()
  // This is the seedrandom function described above.
  //
  function seedrandom(seed, options, callback) {
    var key = [];
    options = (options == true) ? { entropy: true } : (options || {});

    // Flatten the seed string or build one from local entropy if needed.
    var shortseed = mixkey(flatten(
      options.entropy ? [seed, tostring(pool)] :
      (seed == null) ? autoseed() : seed, 3), key);

    // Use the seed to initialize an ARC4 generator.
    var arc4 = new ARC4(key);

    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    var prng = function() {
      var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
          d = startdenom,                 //   and denominator d = 2 ^ 48.
          x = 0;                          //   and no 'extra last byte'.
      while (n < significance) {          // Fill up all significant digits by
        n = (n + x) * width;              //   shifting numerator and
        d *= width;                       //   denominator and generating a
        x = arc4.g(1);                    //   new least-significant-byte.
      }
      while (n >= overflow) {             // To avoid rounding up, before adding
        n /= 2;                           //   last byte, shift everything
        d /= 2;                           //   right using integer math until
        x >>>= 1;                         //   we have exactly the desired bits.
      }
      return (n + x) / d;                 // Form the number within [0, 1).
    };

    prng.int32 = function() { return arc4.g(4) | 0; };
    prng.quick = function() { return arc4.g(4) / 0x100000000; };
    prng.double = prng;

    // Mix the randomness into accumulated entropy.
    mixkey(tostring(arc4.S), pool);

    // Calling convention: what to return as a function of prng, seed, is_math.
    return (options.pass || callback ||
        function(prng, seed, is_math_call, state) {
          if (state) {
            // Load the arc4 state from the given state if it has an S array.
            if (state.S) { copy(state, arc4); }
            // Only provide the .state method if requested via options.state.
            prng.state = function() { return copy(arc4, {}); };
          }

          // If called as a method of Math (Math.seedrandom()), mutate
          // Math.random because that is how seedrandom.js has worked since v1.0.
          if (is_math_call) { math[rngname] = prng; return seed; }

          // Otherwise, it is a newer calling convention, so return the
          // prng directly.
          else return prng;
        })(
    prng,
    shortseed,
    'global' in options ? options.global : (this == math),
    options.state);
  }

  //
  // ARC4
  //
  // An ARC4 implementation.  The constructor takes a key in the form of
  // an array of at most (width) integers that should be 0 <= x < (width).
  //
  // The g(count) method returns a pseudorandom integer that concatenates
  // the next (count) outputs from ARC4.  Its return value is a number x
  // that is in the range 0 <= x < (width ^ count).
  //
  function ARC4(key) {
    var t, keylen = key.length,
        me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

    // The empty key [] is treated as [0].
    if (!keylen) { key = [keylen++]; }

    // Set up S using the standard key scheduling algorithm.
    while (i < width) {
      s[i] = i++;
    }
    for (i = 0; i < width; i++) {
      s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
      s[j] = t;
    }

    // The "g" method returns the next (count) outputs as one number.
    (me.g = function(count) {
      // Using instance members instead of closure state nearly doubles speed.
      var t, r = 0,
          i = me.i, j = me.j, s = me.S;
      while (count--) {
        t = s[i = mask & (i + 1)];
        r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
      }
      me.i = i; me.j = j;
      return r;
      // For robust unpredictability, the function call below automatically
      // discards an initial batch of values.  This is called RC4-drop[256].
      // See http://google.com/search?q=rsa+fluhrer+response&btnI
    })(width);
  }

  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  function copy(f, t) {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();
    return t;
  }
  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  function flatten(obj, depth) {
    var result = [], typ = (typeof obj), prop;
    if (depth && typ == 'object') {
      for (prop in obj) {
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
    return (result.length ? result : typ == 'string' ? obj : obj + '\0');
  }

  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  function mixkey(seed, key) {
    var stringseed = seed + '', smear, j = 0;
    while (j < stringseed.length) {
      key[mask & j] =
        mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
    }
    return tostring(key);
  }

  //
  // autoseed()
  // Returns an object for autoseeding, using window.crypto and Node crypto
  // module if available.
  //
  function autoseed() {
    try {
      var out;
      if (nodecrypto && (out = nodecrypto.randomBytes)) ; else {
        out = new Uint8Array(width);
        (global.crypto || global.msCrypto).getRandomValues(out);
      }
      return tostring(out);
    } catch (e) {
      var browser = global.navigator,
          plugins = browser && browser.plugins;
      return [+new Date, global, plugins, global.screen, tostring(pool)];
    }
  }

  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  function tostring(a) {
    return String.fromCharCode.apply(0, a);
  }

  //
  // When seedrandom.js is loaded, we immediately mix a few bits
  // from the built-in RNG into the entropy pool.  Because we do
  // not want to interfere with deterministic PRNG state later,
  // seedrandom will not call math.random on its own again after
  // initialization.
  //
  mixkey(math.random(), pool);

  function create_shader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }
  function create_program(gl, vss, fss) {
    let vs = create_shader(gl, gl.VERTEX_SHADER, vss);
    let fs = create_shader(gl, gl.FRAGMENT_SHADER, fss);
    let prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Link failed: ' + gl.getProgramInfoLog(prog));
      console.warn('vs info-log: ' + gl.getShaderInfoLog(vs));
      console.warn('fs info-log: ' + gl.getShaderInfoLog(fs));
    }
    return prog;
  }

  function add_uniform(fragment, uniform) {
    if (!fragment.includes(uniform)) {
      return uniform + '\n' + fragment;
    }
    return fragment;
  }

  const fragment_head = `
  precision highp float;
`;

  const default_vertex_shader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

  /* https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL */
  function load_texture(gl, image, i) {
    const texture = gl.createTexture();
    gl.activeTexture(gl['TEXTURE' + i]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  function draw_shader(shaders, width, height) {
    let canvas = document.createElement('canvas');
    let ratio = window.devicePixelRatio || 1;
    width *= ratio;
    height *= ratio;
    canvas.width = width;
    canvas.height = height;

    let gl = canvas.getContext('webgl')
      || canvas.getContext('exprimental-webgl');
    if (!gl) return Promise.resolve('');

    // resolution uniform
    let fragment = add_uniform(shaders.fragment || '', 'uniform vec2 u_resolution;');
    // texture uniform
    shaders.textures.forEach(n => {
      let uniform = `uniform sampler2D ${ n.name };`;
      fragment =  add_uniform(fragment, uniform);
    });

    let program = create_program(
      gl,
      shaders.vertex || default_vertex_shader,
      fragment_head + fragment
    );

    /* position in vertex shader */
    let positionAttributeLocation = gl.getAttribLocation(program, 'position');
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let vertices = [-1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    /* resolve uniforms */
    gl.uniform2fv(gl.getUniformLocation(program, "u_resolution"), [width, height]);
    shaders.textures.forEach((n, i) => {
      load_texture(gl, n.value, i);
      gl.uniform1i(gl.getUniformLocation(program, n.name), i);
    });

    // two triangles to form a rectangle
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // resolve image data in 72dpi :(
    return Promise.resolve(canvas.toDataURL());
  }

  function draw_canvas(code, width, height, random) {
    code = un_entity(code);

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let ratio = window.devicePixelRatio || 1;

    canvas.style.width = canvas.width +'px';
    canvas.style.height = canvas.height +'px';
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    try {
      let fn = new Function(`return (ctx, width, height, random) => {${code}}`)();
      fn(ctx, width, height, random);
    } catch(e) {
      // ignore
    }
    return Promise.resolve(canvas.toDataURL());
  }

  function get_all_variables(element) {
    let ret = {};
    if (element.computedStyleMap) {
      for (let [prop, value] of element.computedStyleMap()) {
        if (prop.startsWith('--')) {
          ret[prop] = value[0][0];
        }
      }
    } else {
      let styles = getComputedStyle(element);
      for (let prop of styles) {
        if (prop.startsWith('--')) {
          ret[prop] = styles.getPropertyValue(prop);
        }
      }
    }
    return inline(ret);
  }

  function get_variable(element, name) {
    return getComputedStyle(element).getPropertyValue(name)
      .trim()
      .replace(/^\(|\)$/g, '');

  }

  function inline(map) {
    let result = [];
    for (let prop in map) {
      result.push(prop + ':' + map[prop]);
    }
    return result.join(';');
  }

  class Doodle extends HTMLElement {
    constructor() {
      super();
      this.doodle = this.attachShadow({ mode: 'open' });
      this.extra = {
        get_variable: name => get_variable(this, name)
      };
    }

    connectedCallback(again) {
      if (/^(complete|interactive|loaded)$/.test(document.readyState)) {
        this.load(again);
      } else {
        setTimeout(() => this.load(again));
      }
    }

    update(styles) {
      let use = this.get_use();
      if (!styles) styles = un_entity(this.innerHTML);
      this.innerHTML = styles;

      if (!this.grid_size) {
        this.grid_size = this.get_grid();
      }

      let { x: gx, y: gy, z: gz } = this.grid_size;

      const compiled = this.generate(
        parse$5(use + styles, this.extra)
      );

      if (!this.shadowRoot.innerHTML) {
        Object.assign(this.grid_size, compiled.grid);
        return this.build_grid(compiled, compiled.grid);
      }

      if (compiled.grid) {
        let { x, y, z } = compiled.grid;
        if (gx !== x || gy !== y || gz !== z) {
          Object.assign(this.grid_size, compiled.grid);
          return this.build_grid(compiled, compiled.grid);
        }
        Object.assign(this.grid_size, compiled.grid);
      }
      else {
        let grid = this.get_grid();
        let { x, y, z } = grid;
        if (gx !== x || gy !== y || gz !== z) {
          Object.assign(this.grid_size, grid);
          return this.build_grid(
            this.generate(parse$5(use + styles, this.extra)),
            grid
          );
        }
      }

      let svg_paths = this.build_svg_paths(compiled.paths);
      if (svg_paths) {
        let defs = this.shadowRoot.querySelector('.svg-defs');
        if (defs) {
          defs.innerHTML = svg_paths;
        }
      }

      if (compiled.uniforms.time) {
        this.register_uniform_time();
      }

      let replace = this.replace(compiled);

      this.set_content('.style-keyframes', replace(compiled.styles.keyframes));

      if (compiled.props.has_animation) {
        this.set_content('.style-cells', '');
        this.set_content('.style-container', '');
      }

      setTimeout(() => {
        this.set_content('.style-container', replace(
            get_grid_styles(this.grid_size)
          + compiled.styles.host
          + compiled.styles.container
        ));
        this.set_content('.style-cells', replace(compiled.styles.cells));
      });
    }

    get grid() {
      return Object.assign({}, this.grid_size);
    }

    set grid(grid) {
      this.attr('grid', grid);
      this.connectedCallback(true);
    }

    get seed() {
      return this._seed_value;
    }

    set seed(seed) {
      this.attr('seed', seed);
      this.connectedCallback(true);
    }

    get use() {
      return this.attr('use');
    }

    set use(use) {
      this.attr('use', use);
      this.connectedCallback(true);
    }

    static get observedAttributes() {
      return ['grid', 'use', 'seed'];
    }

    attributeChangedCallback(name, old_val, new_val) {
      if (old_val == new_val) {
        return false;
      }
      let observed = ['grid', 'use', 'seed'].includes(name);
      if (observed && !is_nil(old_val)) {
        this[name] = new_val;
      }
    }

    get_grid() {
      return parse_grid(this.attr('grid'));
    }

    get_use() {
      let use = this.attr('use') || '';
      if (use) use = `@use:${ use };`;
      return use;
    }

    attr(name, value) {
      if (arguments.length === 1) {
        return this.getAttribute(name);
      }
      if (arguments.length === 2) {
        this.setAttribute(name, value);
        return value;
      }
    }

    generate(parsed) {
      let grid = this.get_grid();
      let seed = this.attr('seed') || this.attr('data-seed');

      if (is_nil(seed)) {
        seed = Date.now();
      }

      seed = String(seed);
      this._seed_value = seed;

      let random = this.random = seedrandom(seed);
      let compiled = this.compiled = generator(parsed, grid, random);
      return compiled;
    }

    doodle_to_image(code, options, fn) {
      if (typeof options === 'function') {
        fn = options;
        options = null;
      }
      let parsed = parse$5(code, this.extra);
      let _grid = parse_grid({});
      let compiled = generator(parsed, _grid, this.random);
      let grid = compiled.grid ? compiled.grid : _grid;
      const { keyframes, host, container, cells } = compiled.styles;
      let svg_defs = this.build_svg_paths(compiled.paths);

      let replace = this.replace(compiled);
      let grid_container = create_grid(grid);

      let size = (options && options.width && options.height)
        ? `width="${ options.width }" height="${ options.height }"`
        : '';

      replace(`
      <svg ${ size } xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <foreignObject width="100%" height="100%">
          <div class="host" xmlns="http://www.w3.org/1999/xhtml">
            <style>
              ${ get_basic_styles() }
              ${ get_grid_styles(grid) }
              ${ host }
              ${ container }
              ${ cells }
              ${ keyframes }
            </style>
            <svg xmlns="http://www.w3.org/2000/svg" style="width:0; height:0">
              <defs class="svg-defs">${ svg_defs }</defs>
            </svg>
            ${ grid_container }
          </div>
        </foreignObject>
      </svg>
    `).then(result => {
        let source =`data:image/svg+xml;base64,${ window.btoa(unescape(encodeURIComponent(result))) }`;
        if (is_safari()) {
          cache_image(source);
        }
        fn(source);
      });
    }

    canvas_to_image({ code, cell }, fn) {
      let element = this.doodle.getElementById(cell);
      let { width, height } = element && element.getBoundingClientRect() || {
        width: 0, height: 0
      };
      draw_canvas(code, width, height, this.random).then(fn);
    }

    shader_to_image({ shader, cell }, fn) {
      let parsed = parse$4(shader);
      let element = this.doodle.getElementById(cell);
      let { width, height } = element && element.getBoundingClientRect() || {
        width: 0, height: 0
      };
      let ratio = window.devicePixelRatio || 1;

      if (!parsed.textures.length) {
        draw_shader(parsed, width, height).then(fn);
      }
      // Need to bind textures first
      else {
        let transforms = parsed.textures.map(texture => {
          return new Promise(resolve => {
            this.doodle_to_image(texture.value, { width, height }, src => {
              let img = new Image();
              img.width = width * ratio;
              img.height = height * ratio;
              img.onload = () => resolve({ name: texture.name, value: img });
              img.src = src;
            });
          });
        });
        Promise.all(transforms).then(textures => {
          parsed.textures = textures;
          draw_shader(parsed, width, height).then(fn);
        });
      }
    }

    load(again) {
      if (!again) {
        if (this.hasAttribute('click-to-update')) {
          this.addEventListener('click', e => this.update());
        }
      }
      let use = this.get_use();
      let parsed = parse$5(use + un_entity(this.innerHTML), this.extra);
      let compiled = this.generate(parsed);

      this.grid_size = compiled.grid
        ? compiled.grid
        : this.get_grid();

      this.build_grid(compiled, this.grid_size);
    }

    replace({ doodles, shaders, paths, canvas }) {
      let doodle_ids = Object.keys(doodles);
      let shader_ids = Object.keys(shaders);
      let path_ids = Object.keys(paths);
      let canvas_ids = Object.keys(canvas);
      return input => {
        if (!doodle_ids.length && !shader_ids.length && !path_ids.length && !canvas_ids.length) {
          return Promise.resolve(input);
        }

        let mappings = [].concat(
          doodle_ids.map(id => {
            if (input.includes(id)) {
              return new Promise(resolve => {
                this.doodle_to_image(doodles[id], value => resolve({ id, value }));
              });
            } else {
              return Promise.resolve('');
            }
          }),
          shader_ids.map(id => {
            if (input.includes(id)) {
              return new Promise(resolve => {
                this.shader_to_image(shaders[id], value => resolve({ id, value }));
              });
            } else {
              return Promise.resolve('');
            }
          }),
          canvas_ids.map(id => {
            if (input.includes(id)) {
              return new Promise(resolve => {
                this.canvas_to_image(canvas[id], value => resolve({ id, value }));
              });
            } else {
              return Promise.resolve('');
            }
          }),
          path_ids.map(id => {
            if (input.includes(id)) {
              return Promise.resolve({ id, value: '#' + id });
            } else {
              return Promise.resolve('');
            }
          })
        );

        return Promise.all(mappings).then(mapping => {
          if (input.replaceAll) {
            mapping.forEach(({ id, value }) => {
              input = input.replaceAll('${' + id + '}', `url(${value})`);
            });
          } else {
            mapping.forEach(({ id, value }) => {
              input = input.replace('${' + id + '}', `url(${value})`);
            });
          }
          return input;
        });
      }
    }

    build_grid(compiled, grid) {
      const { has_transition, has_animation } = compiled.props;
      let has_delay = (has_transition || has_animation);

      const { keyframes, host, container, cells } = compiled.styles;
      let style_container = get_grid_styles(grid) + host + container;
      let style_cells = has_delay ? '' : cells;
      let svg_defs = this.build_svg_paths(compiled.paths);

      const { uniforms } = compiled;

      let replace = this.replace(compiled);

      this.doodle.innerHTML = `
      <style>${ get_basic_styles(uniforms) }</style>
      <style class="style-keyframes">${ keyframes }</style>
      <style class="style-container">${ style_container }</style>
      <style class="style-cells">${ style_cells }</style>
      <svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0">
        <defs class="svg-defs">${ svg_defs }</defs>
      </svg>
      ${ create_grid(grid) }
    `;

      this.set_content('.style-container', replace(style_container));

      if (has_delay) {
        setTimeout(() => {
          this.set_content('.style-cells', replace(cells));
        }, 50);
      } else {
        this.set_content('.style-cells', replace(cells));
      }

      // might be removed in the future
      const definitions = compiled.definitions;
      if (window.CSS && window.CSS.registerProperty) {
        try {
          if (uniforms.time) {
            this.register_uniform_time();
          }
          definitions.forEach(CSS.registerProperty);
        } catch (e) { }
      }
    }

    build_svg_paths(paths) {
      let names = Object.keys(paths || {});
      return names.map(name => `
      <clipPath id="${ paths[name].id }" clipPathUnits="objectBoundingBox">
        <path d="${ paths[name].commands }" />
      </clipPath>
    `).join('');
    }

    register_uniform_time() {
      if (!this.is_uniform_time_registered) {
        try {
          CSS.registerProperty({
            name: '--' + uniform_time.name,
            syntax: '<number>',
            initialValue: 0,
            inherits: true
          });
        } catch (e) {}
        this.is_uniform_time_registered = true;
      }
    }

    export({ scale, name, download, detail } = {}) {
      return new Promise((resolve, reject) => {
        let variables = get_all_variables(this);
        let html = this.doodle.innerHTML;

        let { width, height } = this.getBoundingClientRect();
        scale = parseInt(scale) || 1;

        let w = width * scale;
        let h = height * scale;

        let svg = minify(`
        <svg xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 ${ width } ${ height }"
          ${ is_safari() ? '' : `width="${ w }px" height="${ h }px"` }
        >
          <foreignObject width="100%" height="100%">
            <div
              class="host"
              xmlns="http://www.w3.org/1999/xhtml"
              style="width: ${ width }px; height: ${ height }px; "
            >
              <style>.host { ${entity(variables)} }</style>
              ${ html }
            </div>
          </foreignObject>
        </svg>
      `);

        if (download || detail) {
          svg_to_png(svg, w, h, scale)
            .then(({ source, url, blob }) => {
              resolve({
                width: w, height: h, svg, blob, source
              });
              if (download) {
                let a = document.createElement('a');
                a.download = normalize_png_name(name);
                a.href = url;
                a.click();
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          resolve({
            width: w, height: h, svg: svg
          });
        }
      });
    }

    set_content(selector, styles) {
      if (styles instanceof Promise) {
        styles.then(value => {
          this.set_content(selector, value);
        });
      } else {
        const el = this.shadowRoot.querySelector(selector);
        el && (el.styleSheet
          ? (el.styleSheet.cssText = styles )
          : (el.innerHTML = styles));
      }
    }
  }

  if (!customElements.get('css-doodle')) {
    customElements.define('css-doodle', Doodle);
  }

  function get_basic_styles(uniforms = {}) {
    const inherited_grid_props = get_props(/grid/)
      .map(n => `${ n }: inherit;`)
      .join('');
    return `
    * {
      box-sizing: border-box
    }
    *::after, *::before {
      box-sizing: inherit
    }
    :host, .host {
      display: block;
      visibility: visible;
      width: auto;
      height: auto;
      --${ uniform_time.name }: 0
    }
    :host([hidden]), .host[hidden] {
      display: none
    }
    .container {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      ${ inherited_grid_props }
    }
    cell:empty {
      position: relative;
      line-height: 1;
      display: grid;
      place-items: center
    }
    svg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `;
  }

  function get_grid_styles(grid_obj) {
    let { x, y } = grid_obj || {};
    return `
    :host, .host {
      grid-template-rows: repeat(${ y }, 1fr);
      grid-template-columns: repeat(${ x }, 1fr);
    }
  `;
  }

  function minify(input) {
    return input
      .replace(/\n\s+|^\s+|\n+/g, ' ')
      .trim();
  }

  function create_cell(x, y, z) {
    let cell = document.createElement('cell');
    cell.id = cell_id(x, y, z);
    return cell;
  }

  function create_grid(grid_obj) {
    let { x, y, z } = grid_obj || {};
    let grid = document.createElement('grid');
    let root = document.createDocumentFragment();
    if (z == 1) {
      for (let j = 1; j <= y; ++j) {
        for (let i = 1; i <= x; ++i) {
          root.appendChild(create_cell(i, j, 1));
        }
      }
    }
    else {
      let temp = null;
      for (let i = 1; i <= z; ++i) {
        let cell = create_cell(1, 1, i);
        (temp || root).appendChild(cell);
        temp = cell;
      }
      temp = null;
    }
    grid.className = 'container';
    grid.appendChild(root);
    return grid.outerHTML;
  }

  const CSSDoodle = make_tag_function(rules => {
    let doodle = document.createElement('css-doodle');
    if (doodle.update) {
      doodle.update(rules);
    }
    return doodle;
  });

  return CSSDoodle;

})));
