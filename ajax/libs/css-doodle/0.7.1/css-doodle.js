(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function iterator(input) {
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

  // I'll make it work first
  function parse(it) {
    let word = '', marks = [];
    let groups = [], result = {};

    while(!it.end()) {
      let c = it.curr();
      if (c == '(') {
        marks.push(c);
        word = '';
      }
      else if (c == ')' || c == ',') {
        if (/^\-\-.+/.test(word)) {
          if (!result.name) {
            result.name = word;
          } else {
            if (!result.alternative) {
              result.alternative = [];
            }
            result.alternative.push({
              name: word
            });
          }
        }

        if (c == ')') {
          if (marks[marks.length - 1] == '(') {
            marks.pop();
          } else {
            throw new Error('bad match');
          }
        }

        if (c == ',') {
          if (!marks.length) {
            groups.push(result);
            result = {};
          }
        }

        word = '';
      }
      else if (!/\s/.test(c)) {
        word += c;
      }
      it.next();
    }

    if (marks.length) {
      return [];
    }

    if (result.name) {
      groups.push(result);
    }
    return groups;
  }

  function parse_var(input) {
    input = input.trim();
    let result = [];
    if (!/^var\(/.test(input)) {
      return result;
    }
    let it = iterator(input);
    try {
      result = parse(it);
    } catch (e) {
      console.error(e && e.message || 'Bad variables.');
    }
    return result;
  }

  function make_array(arr) {
    return Array.isArray(arr) ? arr : [arr];
  }

  function join(arr, spliter = '\n') {
    return (arr || []).join(spliter);
  }

  function last(arr) {
    return arr[arr.length - 1];
  }

  function first(arr) {
    return arr[0];
  }

  function shuffle(arr) {
    let ret = Array.from ? Array.from(arr) : arr.slice();
    let m = arr.length;
    while (m) {
      let i = ~~(Math.random() * m--);
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

  const is = {
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

  function throw_error(msg, { col, line }) {
    console.error(
      `(at line ${ line }, column ${ col }) ${ msg }`
    );
  }

  function get_text_value(input) {
    if (input.trim().length) {
      return is.number(+input) ? +input : input.trim()
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
    let check = c => is.line_break(c) || c == '{';
    return read_until(check)(it, reset);
  }

  function read_step(it, extra) {
    let c, step = Tokens.step();
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      if (is.white_space(c)) {
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
      else if (is.white_space(c)) {
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

  function read_property(it) {
    let prop = '', c;
    while (!it.end()) {
      if ((c = it.curr()) == ':') break;
      else if (!is.white_space(c)) prop += c;
      it.next();
    }
    return prop;
  }

  function read_arguments(it) {
    let args = [], group = [], stack = [], arg = '', c;
    while (!it.end()) {
      c = it.curr();

      if ((/[\('"`]/.test(c) && it.curr(-1) !== '\\')) {
        if (stack.length) {
          if (c != '(' && c === last(stack)) {
            stack.pop();
          } else {
            stack.push(c);
          }
        } else {
          stack.push(c);
        }
        arg += c;
      }
      else if (c == '@') {
        if (!group.length) {
          arg = arg.trimLeft();
        }
        if (arg.length) {
          group.push(Tokens.text(arg));
          arg = '';
        }
        group.push(read_func(it));
      }
      else if (/[,)]/.test(c)) {
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
              if (arg.length) {
                group.push(Tokens.text(arg));
              }
            }
          }

          args.push(normalize_argument(group));
          [group, arg] = [[], ''];

          if (c == ')') break;
        }
      }
      else {
        arg += c;
      }
      it.next();
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
    let ed = last(result) || {};
    if (ft.type == 'text' && ed.type == 'text') {
      let cf = first(ft.value);
      let ce  = last(ed.value);
      if (typeof ft.value == 'string' && typeof ed.value == 'string') {
        if (is.pair(cf) && is.pair_of(cf, ce)) {
          ft.value = ft.value.slice(1);
          ed.value = ed.value.slice(0, ed.value.length - 1);
        }
      }
    }
    return result;
  }

  function read_func(it) {
    let func = Tokens.func();
    let extra = '', name = '', c;
    while (!it.end()) {
      if ((c = it.curr()) == ')') break;
      if (c == '(') {
        it.next();
        func.name = name;
        func.arguments = read_arguments(it);
        if (/\d$/.test(name)) {
          func.name = name.split(/\d+/)[0];
          extra = name.split(/\D+/)[1];
        }
        if (extra.length) {
          func.arguments.unshift([{
            type: 'text',
            value: extra
          }]);
        }
        func.position = it.info().index;
        break;
      }
      else name += c;
      it.next();
    }
    return func;
  }

  function read_value(it) {
    let text = Tokens.text(), idx = 0, skip = true, c;
    const value = [], stack = [];
    value[idx] = [];

    while (!it.end()) {
      c = it.curr();

      if (skip && is.white_space(c)) {
        it.next();
        continue;
      } else {
        skip = false;
      }

      if (c == '\n' && !is.white_space(it.curr(-1))) {
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
      else if (/[;}]/.test(c)) {
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
      else if (!is.white_space(c) || !is.white_space(it.curr(-1))) {
        if (c == '(') stack.push(c);
        if (c == ')') stack.pop();
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
      else if (!is.white_space(c)) {
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
      else if (!is.white_space(c)) selector.name += c;
      it.next();
    }
    return selector;
  }

  function read_pseudo(it, extra) {
    let pseudo = Tokens.pseudo(), c;
    while (!it.end()) {
      if ((c = it.curr()) == '}') break;
      if (is.white_space(c)) {
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
    let rule = Tokens.rule(), c;
    while (!it.end()) {
      if ((c = it.curr()) == ';') break;
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
      else if (!is.white_space(c)) {
        let rule = read_rule(it, extra);
        if (rule.property) cond.styles.push(rule);
        if (it.curr() == '}') break;
      }
      it.next();
    }
    return cond;
  }

  function read_property_value(extra, name) {
    let rule = '';
    if (extra && extra.get_custom_property_value) {
      rule = extra.get_custom_property_value(name);
    }
    return rule;
  }

  function evaluate_value(values, extra) {
    values.forEach && values.forEach(v => {
      if (v.type == 'text' && v.value) {
        let vars = parse_var(v.value);
        v.value = vars.reduce((ret, p) => {
          let rule = '', other = '', parsed;
          rule = read_property_value(extra, p.name);
          if (!rule && p.alternative) {
            p.alternative.every(n => {
              other = read_property_value(extra, n.name);
              if (other) {
                rule = other;
                return false;
              }
            });
          }
          try {
            parsed = parse$1(rule, extra);
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

  function parse$1(input, extra) {
    const it = iterator(input);
    const Tokens = [];
    while (!it.end()) {
      let c = it.curr();
      if (is.white_space(c)) {
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
      else if (!is.white_space(c)) {
        let rule = read_rule(it, extra);
        if (rule.property) Tokens.push(rule);
      }
      it.next();
    }
    return Tokens;
  }

  function apply_args(fn, ...args) {
    return args.reduce((f, arg) =>
      f.apply(null, make_array(arg)), fn
    );
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

  function lazy(fn) {
    let wrap = () => fn;
    wrap.lazy = true;
    return wrap;
  }

  function sequence(count, fn) {
    let ret = [];
    for (let i = 0; i < count; ++i) {
      ret.push(fn(i));
    }
    return ret;
  }

  function cell_id(x, y, z) {
    return 'cell-' + x + '-' + y + '-' + z;
  }

  const [ min, max, total ] = [ 1, 32, 32 * 32 ];

  function parse_grid(size) {
    let [x, y, z] = (size + '')
      .replace(/\s+/g, '')
      .replace(/[,，xX]+/g, 'x')
      .split('x')
      .map(Number);

    const max_xy = (x == 1 || y == 1) ? total : max;
    const max_z = (x == 1 && y == 1) ? total : min;

    const ret = {
      x: clamp(x || min, 1, max_xy),
      y: clamp(y || x || min, 1, max_xy),
      z: clamp(z || min, 1, max_z)
    };

    return Object.assign({}, ret,
      { count: ret.x * ret.y * ret.z }
    );
  }

  function create_svg_url(svg, id) {
    if (id) {
      let blob = new Blob([svg], { type: 'image/svg+xml' });
      let url = URL.createObjectURL(blob);
      return `url(${ url }#${ id })`;
    }
    else {
      let encoded = encodeURIComponent(svg);
      return `url("data:image/svg+xml;utf8,${ encoded }")`;
    }
  }

  function normalize_svg(input) {
    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    if (!input.includes('<svg')) {
      input = `<svg ${ xmlns }>${ input }</svg>`;
    }
    if (!input.includes('xmlns')) {
      input = input.replace(/<svg([\s>])/, `<svg ${ xmlns }$1`);
    }
    return input;
  }

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function rand(start = 0, end = start) {
    if (arguments.length == 1) {
      start = start < 1 ? .1 : 1;
    }
    return lerp(start, end, Math.random());
  }

  function pick(...items) {
    let args = items.reduce((acc, n) => acc.concat(n), []);
    return args[~~(Math.random() * args.length)];
  }

  function unique_id(prefix = '') {
    return prefix + Math.random().toString(32).substr(2);
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

  function calc(input) {
    const expr = infix_to_postfix(input), stack = [];
    while (expr.length) {
      let top = expr.shift();
      if (/\d+/.test(top)) stack.push(top);
      else {
        let right = stack.pop();
        let left = stack.pop();
        stack.push(compute(
          top, Number(left), Number(right)
        ));
      }
    }
    return stack[0];
  }

  const operator = {
    '*': 3, '/': 3, '%': 3,
    '+': 2, '-': 2,
    '(': 1, ')': 1
  };

  function get_tokens(input) {
    let expr = String(input);
    let tokens = [], num = '';

    for (let i = 0; i < expr.length; ++i) {
      let c = expr[i];

      if (operator[c]) {
        if (c == '-' && expr[i - 1] == 'e') {
          num += c;
        }
        else if (!tokens.length && !num.length && /[+-]/.test(c)) {
          num += c;
        } else {
          let { type, value } = last(tokens) || {};
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
        num += c;
      }
    }

    if (num.length) {
      tokens.push({ type: 'number', value: num });
    }

    return tokens;
  }

  function infix_to_postfix(input) {
    let tokens = get_tokens(input);
    const op_stack = [], expr = [];

    for (let i = 0; i < tokens.length; ++i) {
      let { type, value } = tokens[i];
      if (type == 'number') {
        expr.push(value);
      }

      else if (type == 'operator') {
        if (value == '(') {
          op_stack.push(value);
        }

        else if (value == ')') {
          while (op_stack.length && last(op_stack) != '(') {
            expr.push(op_stack.pop());
          }
          op_stack.pop();
        }

        else {
          while (op_stack.length && operator[last(op_stack)] >= operator[value]) {
            let op = op_stack.pop();
            if (!/[()]/.test(op)) expr.push(op);
          }
          op_stack.push(value);
        }
      }
    }

    while (op_stack.length) {
      expr.push(op_stack.pop());
    }

    return expr;
  }

  function compute(op, a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '%': return a % b;
    }
  }

  const store = {};

  function memo$1(prefix, fn) {
    return (...args) => {
      let key = prefix + args.join('-');
      if (store[key]) return store[key];
      return (store[key] = fn.apply(null, args));
    }
  }

  function expand(fn) {
    return (...args) => fn.apply(null, flat_map(args, n =>
      String(n).startsWith('[') ? build_range(n) : n
    ));
  }

  function Type(type, value) {
    return { type, value };
  }

  function get_tokens$1(input) {
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

  const build_range = memo$1('build_range', (input) => {
    let tokens = get_tokens$1(input);
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

  const { cos, sin, sqrt, pow, PI } = Math;
  const DEG = PI / 180;

  function polygon(option, fn) {
    if (typeof arguments[0] == 'function') {
      fn = option;
      option = {};
    }

    if (!fn) {
      fn = t => [ cos(t), sin(t) ];
    }

    let split = option.split || 120;
    let scale = option.scale || 1;
    let start = DEG * (option.start || 0);
    let deg = option.deg ? (option.deg * DEG) : (PI / (split / 2));
    let points = [];

    for (let i = 0; i < split; ++i) {
      let t = start + deg * i;
      let [x, y] = fn(t);
      points.push(
        ((x * 50 * scale) + 50 + '% ') +
        ((y * 50 * scale) + 50 + '%')
      );
    }

    return option.type
      ? `polygon(${ option.type }, ${ points.join(',') })`
      : `polygon(${ points.join(',') })`;
  }

  function rotate(x, y, deg) {
    let rad = DEG * deg;
    return [
      x * cos(rad) - y * sin(rad),
      y * cos(rad) + x * sin(rad)
    ];
  }

  const shapes =  {

    circle() {
      return 'circle(49%)';
    },

    triangle() {
      return polygon({ split: 3, start: -90 }, t => [
        cos(t) * 1.1,
        sin(t) * 1.1 + .2
      ]);
    },

    rhombus() {
      return polygon({ split: 4 });
    },

    pentagon() {
      return polygon({ split: 5, start: 54 });
    },

    hexgon() {
      return polygon({ split: 6, start: 30 });
    },

    hexagon() {
      return polygon({ split: 6, start: 30 });
    },

    heptagon() {
      return polygon({ split: 7, start: -90 });
    },

    octagon() {
      return polygon({ split: 8, start: 22.5 });
    },

    star() {
      return polygon({ split: 5, start: 54, deg: 144 });
    },

    diamond() {
      return 'polygon(50% 5%, 80% 50%, 50% 95%, 20% 50%)';
    },

    cross() {
      return `polygon(
      5% 35%,  35% 35%, 35% 5%,  65% 5%,
      65% 35%, 95% 35%, 95% 65%, 65% 65%,
      65% 95%, 35% 95%, 35% 65%, 5% 65%
    )`;
    },

    clover(k = 3) {
      k = clamp(k, 3, 5);
      if (k == 4) k = 2;
      return polygon({ split: 240 }, t => {
        let x = cos(k * t) * cos(t);
        let y = cos(k * t) * sin(t);
        if (k == 3) x -= .2;
        if (k == 2) {
          x /= 1.1;
          y /= 1.1;
        }
        return [x, y];
      });
    },

    hypocycloid(k = 3) {
      k = clamp(k, 3, 6);
      let m = 1 - k;
      return polygon({ scale: 1 / k  }, t => {
        let x = m * cos(t) + cos(m * (t - PI));
        let y = m * sin(t) + sin(m * (t - PI));
        if (k == 3) {
          x = x * 1.1 - .6;
          y = y * 1.1;
        }
        return [x, y];
      });
    },

    astroid() {
      return shapes.hypocycloid(4);
    },

    infinity() {
      return polygon(t => {
        let a = .7 * sqrt(2) * cos(t);
        let b = (pow(sin(t), 2) + 1);
        return [
          a / b,
          a * sin(t) / b
        ]
      });
    },

    heart() {
      return polygon(t => {
        let x = .75 * pow(sin(t), 3);
        let y =
            cos(1 * t) * (13 / 18)
          - cos(2 * t) * (5 / 18)
          - cos(3 * t) / 18
          - cos(4 * t) / 18;
        return rotate(
          x * 1.2,
          (y + .2) * 1.1,
          180
        );
      });
    },

    bean() {
      return polygon(t => {
        let [a, b] = [pow(sin(t), 3), pow(cos(t), 3)];
        return rotate(
          (a + b) * cos(t) * 1.3 - .45,
          (a + b) * sin(t) * 1.3 - .45,
          -90
        );
      });
    },

    bicorn() {
      return polygon(t => rotate(
        cos(t),
        pow(sin(t), 2) / (2 + sin(t)) - .5,
        180
      ));
    },

    pear() {
      return polygon(t => [
        sin(t),
        (1 + sin(t)) * cos(t) / 1.4
      ]);
    },

    fish() {
      return polygon(t => [
        cos(t) - pow(sin(t), 2) / sqrt(2),
        sin(2 * t) / 2
      ]);
    },

    whale() {
      return polygon({ split: 240 }, t => {
        let r = 3.4 * (pow(sin(t), 2) - .5) * cos(t);
        return rotate(
          cos(t) * r + .75,
          sin(t) * r * 1.2,
          180
        );
      });
    },

    bud(n = 3) {
      n = clamp(n, 3, 10);
      return polygon({ split: 240 }, t => [
        ((1 + .2 * cos(n * t)) * cos(t)) * .8,
        ((1 + .2 * cos(n * t)) * sin(t)) * .8
      ]);
    },

    alien(...args) {
      let [a = 1, b = 1, c = 1, d = 1, e = 1]
        = args.map(n => clamp(n, 1, 9));
      return polygon({ split: 480, type: 'evenodd' }, t => [
        (cos(t * a) + cos(t * c) + cos(t * e)) * .31,
        (sin(t * b) + sin(t * d) + sin(t)) * .31
      ]);
    }

  };

  const Expose = {

    index({ count }) {
      return _ => count;
    },

    row({ x }) {
      return _ => x;
    },

    col({ y }) {
      return _ => y;
    },

    depth({ z }) {
      return _ => z;
    },

    size({ grid }) {
      return _ => grid.count;
    },

    ['size-row']({ grid }) {
      return _ => grid.x;
    },

    ['size-col']({ grid }) {
      return _ => grid.y;
    },

    ['size-depth']({ grid }) {
      return _ => grid.z;
    },

    n({ idx }) {
      return _ => idx || 0;
    },

    pick({ context }) {
      return expand((...args) => (
        context.last_pick = pick(args)
      ));
    },

    ['pick-n']({ idx, context, position }) {
      let counter = 'pn-counter' + position;
      return expand((...args) => {
        if (!context[counter]) context[counter] = 0;
        context[counter] += 1;
        let max = args.length;
        let pos = ((idx === undefined ? context[counter] : idx) - 1) % max;
        return context.last_pick = args[pos];
      });
    },

    ['pick-d']({ idx, context, position }) {
      let counter = 'pd-counter' + position;
      let values = 'pd-values' + position;
      return expand((...args) => {
        if (!context[counter]) context[counter] = 0;
        context[counter] += 1;
        if (!context[values]) {
          context[values] = shuffle(args);
        }
        let max = args.length;
        let pos = ((idx === undefined ? context[counter] : idx) - 1) % max;
        return context.last_pick = context[values][pos];
      });
    },

    ['last-pick']({ context }) {
      return () => context.last_pick;
    },

    multiple: lazy((n, action) => {
      if (!action || !n) return '';
      let count = clamp(n(), 0, 65536);
      return sequence(count, i => action(i + 1)).join(',');
    }),

    ['multiple-with-space']: lazy((n, action) => {
      if (!action || !n) return '';
      let count = clamp(n(), 0, 65536);
      return sequence(count, i => action(i + 1)).join(' ');
    }),

    repeat: lazy((n, action) => {
      if (!action || !n) return '';
      let count = clamp(n(), 0, 65536);
      return sequence(count, i => action(i + 1)).join('');
    }),

    rand({ context }) {
      return (...args) => {
        let transform_type = args.every(is_letter)
          ? by_charcode
          : by_unit;
        let value = transform_type(rand).apply(null, args);
        return context.last_rand = value;
      };
    },

    ['rand-int']({ context }) {
      return (...args) => {
        let transform_type = args.every(is_letter)
          ? by_charcode
          : by_unit;
        let value = parseInt(
          transform_type(rand).apply(null, args)
        );
        return context.last_rand = value;
      }
    },

    ['last-rand']({ context }) {
      return () => context.last_rand;
    },

    calc() {
      return value => calc(value);
    },

    hex() {
      return value => parseInt(value).toString(16);
    },

    svg: lazy(input => {
      if (input === undefined) return '';
      let svg = normalize_svg(input().trim());
      return create_svg_url(svg);
    }),

    ['svg-filter']: lazy(input => {
      if (input === undefined) return '';
      let id = unique_id('filter-');
      let svg = normalize_svg(input().trim())
        .replace(
          /<filter([\s>])/,
          `<filter id="${ id }"$1`
        );
      return create_svg_url(svg, id);
    }),

    var() {
      return value => `var(${ value })`;
    },

    shape() {
      return memo('shape-function', (type = '', ...args) => {
        type = type.trim();
        if (typeof shapes[type] === 'function') {
          return shapes[type](args);
        }
        return '';
      });
    }

  };

  var Func = alias_for(Expose, {
    'm':  'multiple',
    'ms': 'multiple-with-space',

    'r':  'rand',
    'ri': 'rand-int',
    'lr': 'last-rand',

    'p':  'pick',
    'pn': 'pick-n',
    'pd': 'pick-d',
    'lp': 'last-pick',

    'i':  'index',
    'x':  'row',
    'y':  'col',
    'z':  'depth',

    'size-x': 'size-row',
    'size-y': 'size-col',
    'size-z': 'size-depth',

    // legacy names
    'multi': 'multiple',
    'pick-by-turn': 'pick-n',
    'max-row': 'size-row',
    'max-col': 'size-col'
  });

  const is_seperator = c => /[,，\s]/.test(c);

  function skip_seperator(it) {
    while (!it.end()) {
      if (!is_seperator(it.curr(1))) break;
      else it.next();
    }
  }

  function parse$2(input) {
    const it = iterator(input);
    const result = [], stack = [];
    let group = '';

    while (!it.end()) {
      let c = it.curr();
      if (c == '(') {
        group += c;
        stack.push(c);
      }

      else if (c == ')') {
        group += c;
        if (stack.length) {
          stack.pop();
        }
      }

      else if (stack.length) {
        group += c;
      }

      else if (is_seperator(c)) {
        result.push(group);
        group = '';
        skip_seperator(it);
      }

      else {
        group += c;
      }

      it.next();
    }

    if (group) {
      result.push(group);
    }

    return result;
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

  var Property = {

    ['@size'](value, { is_special_selector }) {
      let [w, h = w] = parse$2(value);
      return `
      width: ${ w };
      height: ${ h };
      ${ is_special_selector ? '' : `
        --internal-cell-width: ${ w };
        --internal-cell-height: ${ h };
      `}
    `;
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
        'center': '50%', '0': '0%',
        'left': '0%', 'right': '100%',
        'top': '50%', 'bottom': '50%'
      };
      let map_top_bottom = {
        'center': '50%', '0': '0%',
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
        margin-left: calc(${ cw } / -2) !important;
        margin-top: calc(${ ch } / -2) !important;
        grid-area: unset !important;
      `;
      }
    })(),

    ['@grid'](value, options) {
      let [grid, size] = value.split('/').map(s => s.trim());
      return {
        grid: parse_grid(grid),
        size: size ? this['@size'](size, options) : ''
      };
    },

    ['@shape']: memo$1('shape-property', value => {
      let [type, ...args] = parse$2(value);
      let prop = 'clip-path';
      if (!shapes[type]) return '';
      let rules = `${ prop }: ${ shapes[type].apply(null, args) };`;
      return prefixer(prop, rules) + 'overflow: hidden;';
    }),

    ['@use'](rules) {
      if (rules.length > 2) {
        return rules;
      }
    }

  };

  function build_expr(expr) {
    return n => String(expr)
      .replace(/(\d+)(n)/g, '$1*' + n)
      .replace(/n/g, n);
  }

  function nth(input, curr, max) {
    let expr = build_expr(input);
    for (let i = 0; i <= max; ++i) {
      if (calc(expr(i)) == curr) return true;
    }
  }

  const is$1 = {
    even: n => !!(n % 2),
    odd:  n => !(n % 2)
  };

  function even_or_odd(expr) {
    return /^(even|odd)$/.test(expr);
  }

  var Selector = {

    at({ x, y }) {
      return (x1, y1) => (x == x1 && y == y1);
    },

    nth({ count, grid }) {
      return (...exprs) => exprs.some(expr =>
        even_or_odd(expr)
          ? is$1[expr](count - 1)
          : nth(expr, count, grid.count)
      );
    },

    row({ x, grid }) {
      return (...exprs) => exprs.some(expr =>
        even_or_odd(expr)
          ? is$1[expr](x - 1)
          : nth(expr, x, grid.x)
      );
    },

    col({ y, grid }) {
      return (...exprs) => exprs.some(expr =>
        even_or_odd(expr)
          ? is$1[expr](y - 1)
          : nth(expr, y, grid.y)
      );
    },

    even({ count }) {
      return _ => is$1.even(count - 1);
    },

    odd({ count }) {
      return _ => is$1.odd(count - 1);
    },

    random() {
      return (ratio = .5) => {
        if (ratio >= 1 && ratio <= 0) ratio = .5;
        return Math.random() < ratio;
      }
    }

  };

  // Expose all Math functions and constants.
  const methods = Object.getOwnPropertyNames(Math);

  var MathFunc = methods.reduce((expose, n) => {
    expose[n] = () => (...args) => {
      if (typeof Math[n] === 'number') return Math[n];
      return Math[n].apply(null, args.map(calc));
    };
    return expose;
  }, {});

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

    constructor(tokens) {
      this.tokens = tokens;
      this.rules = {};
      this.props = {};
      this.keyframes = {};
      this.grid = null;
      this.coords = [];
      this.reset();
    }

    reset() {
      this.styles = {
        host: '',
        container: '',
        cells: '',
        keyframes: ''
      };
      this.coords = [];
      for (let key in this.rules) {
        if (key.startsWith('#cell')) {
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
      return Func[name] || MathFunc[name];
    }

    compose_aname(...args) {
      return args.join('-');
    }

    compose_selector({ x, y, z}, pseudo = '') {
      return `#${ cell_id(x, y, z) }${ pseudo }`;
    }

    compose_argument(argument, coords, idx) {
      let result = argument.map(arg => {
        if (arg.type == 'text') {
          return arg.value;
        }
        else if (arg.type == 'func') {
          let fn = this.pick_func(arg.name.substr(1));
          if (fn) {
            coords.idx = idx;
            coords.position = arg.position;
            let args = arg.arguments.map(n => {
              return fn.lazy
                ? idx => this.compose_argument(n, coords, idx)
                : this.compose_argument(n, coords, idx);
            });
            return apply_args(fn, coords, args);
          }
        }
      });

      return (result.length >= 2)
        ? result.join('')
        : result[0];
    }

    compose_value(value, coords) {
      if (!value || !value.reduce) return '';
      return value.reduce((result, val) => {
        switch (val.type) {
          case 'text': {
            result += val.value;
            break;
          }
          case 'func': {
            let fname = val.name.substr(1);
            let fn = this.pick_func(fname);
            if (fn) {
              coords.position = val.position;
              let args = val.arguments.map(arg => {
                if (fn.lazy) {
                  return idx => this.compose_argument(arg, coords, idx);
                } else {
                  return this.compose_argument(arg, coords);
                }
              });
              result += apply_args(fn, coords, args);
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

      if (prop == 'content') {
        if (!/["']|^none$|^(var|counter|counters|attr)\(/.test(value)) {
          value = `'${ value }'`;
        }
      }

      if (prop == 'transition') {
        this.props.has_transition = true;
      }

      let rule = `${ prop }: ${ value };`;
      rule = prefixer(prop, rule);

      if (prop == 'clip-path') {
        // fix clip bug
        rule += ';overflow: hidden;';
      }

      if (prop == 'width' || prop == 'height') {
        if (!is_special_selector(selector)) {
          rule += `--internal-cell-${ prop }: ${ value };`;
        }
      }

      if (Property[prop]) {
        let transformed = Property[prop](value, {
          is_special_selector: is_special_selector(selector)
        });
        switch (prop) {
          case '@grid': {
            if (is_host_selector(selector)) {
              this.grid = transformed.grid;
              rule = transformed.size || '';
            }
            break;
          }
          case '@place-cell': {
            if (!is_host_selector(selector)) {
              rule = transformed;
            }
          }
          case '@use': {
            if (token.value.length) {
              this.compose(coords, token.value);
            }
            rule = Property[prop](token.value);
          }
          default: {
            rule = transformed;
          }
        }
      }

      return rule;
    }

    compose(coords, tokens) {
      this.coords.push(coords);
      (tokens || this.tokens).forEach((token, i) => {
        if (token.skip) return false;
        switch (token.type) {
          case 'rule':
            this.add_rule(
              this.compose_selector(coords),
              this.compose_rule(token, coords)
            );
            break;

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
            let fn = Selector[token.name.substr(1)];
            if (fn) {
              let args = token.arguments.map(arg => {
                return this.compose_argument(arg, coords);
              });
              let result = apply_args(fn, coords, args);
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
          this.styles[target] += `
          ${ selector } {
            ${ join(this.rules[selector]) }
          }
        `;
        }
      });

      let keyframes = Object.keys(this.keyframes);
      this.coords.forEach((coords, i) => {
        keyframes.forEach(name => {
          let aname = this.compose_aname(name, coords.count);
          this.styles.keyframes += `
          ${ maybe(i == 0,
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

      return {
        props: this.props,
        styles: this.styles,
        grid: this.grid
      }
    }
  }

  function generator(tokens, grid_size) {
    let rules = new Rules(tokens);
    let context = {};
    rules.compose({
      x: 1, y: 1, z: 1, count: 1, context: {},
      grid: { x: 1, y: 1, z: 1, count: 1 }
    });
    let { grid } = rules.output();
    if (grid) grid_size = grid;
    rules.reset();

    if (grid_size.z == 1) {
      for (let x = 1, count = 0; x <= grid_size.x; ++x) {
        for (let y = 1; y <= grid_size.y; ++y) {
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

  class Doodle extends HTMLElement {
    constructor() {
      super();
      this.doodle = this.attachShadow({ mode: 'open' });
      this.extra = {
        get_custom_property_value: this.get_custom_property_value.bind(this)
      };
    }
    connectedCallback() {
      setTimeout(() => {
        let compiled;
        let use = this.getAttribute('use') || '';
        if (use) use = `@use:${ use };`;
        if (!this.innerHTML.trim() && !use) return false;
        try {
          let parsed = parse$1(use + this.innerHTML, this.extra);
          this.grid_size = parse_grid(this.getAttribute('grid'));
          compiled = generator(parsed, this.grid_size);
          compiled.grid && (this.grid_size = compiled.grid);
          this.build_grid(compiled);
        } catch (e) {
          this.innerHTML = '';
          console.error(e && e.message || 'Error in css-doodle.');
        }
      });
    }

    get_custom_property_value(name) {
      return getComputedStyle(this).getPropertyValue(name)
        .trim()
        .replace(/^\(|\)$/g, '');
    }

    cell(x, y, z) {
      let cell = document.createElement('div');
      cell.id = cell_id(x, y, z);
      return cell;
    }

    build_grid(compiled) {
      const { has_transition, has_animation } = compiled.props;
      const { keyframes, host, container, cells } = compiled.styles;

      this.doodle.innerHTML = `
      <style>
        ${ this.style_basic() }
      </style>
      <style class="style-keyframes">
        ${ keyframes }
      </style>
      <style class="style-container">
        ${ this.style_size() }
        ${ host }
        ${ container }
      </style>
      <style class="style-cells">
        ${ (has_transition || has_animation) ? '' : cells }
      </style>
      <div class="container"></div>
    `;

      this.doodle.querySelector('.container')
        .appendChild(this.html_cells());

      if (has_transition || has_animation) {
        setTimeout(() => {
          this.set_style('.style-cells', cells);
        }, 50);
      }
    }

    inherit_props(p) {
      return get_props(/grid/)
        .map(n => `${ n }: inherit;`)
        .join('');
    }

    style_basic() {
      return `
      :host {
        display: block;
        visibility: visible;
        width: 1em;
        height: 1em;
      }
      .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        ${ this.inherit_props() }
      }
      .container div:empty {
        position: relative;
        line-height: 1;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
    }

    style_size() {
      let { x, y } = this.grid_size;
      return `
      :host {
        grid-template-rows: repeat(${ x }, 1fr);
        grid-template-columns: repeat(${ y }, 1fr);
      }
    `;
    }

    html_cells() {
      let { x, y, z } = this.grid_size;
      let root = document.createDocumentFragment();
      if (z == 1) {
        for (let i = 1; i <= x; ++i) {
          for (let j = 1; j <= y; ++j) {
            root.appendChild(this.cell(i, j, 1));
          }
        }
      }
      else {
        let temp = null;
        for (let i = 1; i <= z; ++i) {
          let cell = this.cell(1, 1, i);
          (temp || root).appendChild(cell);
          temp = cell;
        }
        temp = null;
      }
      return root;
    }

    set_style(selector, styles) {
      const el = this.shadowRoot.querySelector(selector);
      el && (el.styleSheet
        ? (el.styleSheet.cssText = styles )
        : (el.innerHTML = styles));
    }

    update(styles) {
      let use = this.getAttribute('use') || '';
      if (use) use = `@use:${ use };`;

      if (!styles) styles = this.innerHTML;
      this.innerHTML = styles;

      if (!this.grid_size) {
        this.grid_size = parse_grid(this.getAttribute('grid'));
      }

      const compiled = generator(parse$1(use + styles, this.extra), this.grid_size);

      if (compiled.grid) {
        let { x, y, z } = compiled.grid;
        let { x: gx, y: gy, z: gz } = this.grid_size;
        if (gx !== x || gy !== y || gz !== z) {
          Object.assign(this.grid_size, compiled.grid);
          return this.build_grid(compiled);
        }
        Object.assign(this.grid_size, compiled.grid);
      }

      else {
        let grid = parse_grid(this.getAttribute('grid'));
        let { x, y, z } = grid;
        let { x: gx, y: gy, z: gz } = this.grid_size;
        if (gx !== x || gy !== y || gz !== z) {
          Object.assign(this.grid_size, grid);
          return this.build_grid(
            generator(parse$1(use + styles, this.extra), this.grid_size)
          );
        }
      }

      this.set_style('.style-keyframes',
        compiled.styles.keyframes
      );

      if (compiled.props.has_animation) {
        this.set_style('.style-cells', '');
        this.set_style('.style-container', '');
      }

      setTimeout(() => {
        this.set_style('.style-container',
            this.style_size()
          + compiled.styles.host
          + compiled.styles.container
        );
        this.set_style('.style-cells',
          compiled.styles.cells
        );
      });
    }

    get grid() {
      return Object.assign({}, this.grid_size);
    }

    set grid(grid) {
      this.setAttribute('grid', grid);
      this.connectedCallback();
    }

    get use() {
      return this.getAttribute('use');
    }

    set use(use) {
      this.setAttribute('use', use);
      this.connectedCallback();
    }

    static get observedAttributes() {
      return ['grid', 'use'];
    }

    attributeChangedCallback(name, old_val, new_val) {
      if (old_val == new_val) {
        return false;
      }
      if (name == 'grid' && old_val) {
        this.grid = new_val;
      }
      if (name == 'use' && old_val) {
        this.use = new_val;
      }
    }
  }

  customElements.define('css-doodle', Doodle);

}));
