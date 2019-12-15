(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function iterator(input) {
  let index = 0, col = 1, line = 1;
  return {
    curr:  (n = 0) => input[index + n],
    end:   ()  => input.length <= index,
    info:  ()  => ({ index, col, line }),
    index: (n) => (n === undefined ? index : index = n),
    next:  ()  => {
      let next = input[index++];
      if (next == '\n') line++, col = 0;
      else col++;
      return next;
    }
  };
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

  comment(value) {
    return {
      type: 'comment',
      value
    }
  },

  psuedo(selector = '') {
    return {
      type: 'psuedo',
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

const bracket_pair = {
  '(': ')',
  '[': ']',
  '{': '}'
};

const is = {
  white_space(c) {
    return /[\s\n\t]/.test(c);
  },
  line_break(c) {
    return /\n/.test(c);
  },
  open_bracket(c) {
    return bracket_pair.hasOwnProperty(c);
  },
  close_bracket_of(c) {
    let pair = bracket_pair[c];
    return p => p == pair;
  },
  number(n) {
    return !isNaN(n);
  }
};

function throw_error(msg, { col, line }) {
  throw new Error(
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

function skip_block(it) {
  let [skipped, c] = [it.curr(), it.curr()];
  let is_close_bracket = is.close_bracket_of(c);
  it.next();
  while (!it.end()) {
    if (is_close_bracket(c = it.curr())) {
      skipped += c;
      break;
    }
    else if (is.open_bracket(c)) {
      skipped += skip_block(it);
    } else {
      skipped += c;
    }
    it.next();
  }
  return skipped;
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
  return read_until(c => is.white_space(c))(it, reset);
}

function read_line(it, reset) {
  return read_until(c => is.line_break(c) || c == '{')(it, reset);
}

function read_step(it) {
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
      step.styles.push(read_rule(it));
      if (it.curr() == '}') break;
    }
    it.next();
  }
  return step;
}

function read_steps(it) {
  const steps = [];
  let c;
  while (!it.end()) {
    if ((c = it.curr()) == '}') break;
    else if (is.white_space(c)) {
      it.next();
      continue;
    }
    else {
      steps.push(read_step(it));
    }
    it.next();
  }
  return steps;
}

function read_keyframes(it) {
  let keyframes = Tokens.keyframes(), c;
  while (!it.end()) {
    if ((c = it.curr()) == '}') break;
    else if (!keyframes.name.length) {
      read_word(it);
      keyframes.name = read_word(it);
      if (keyframes.name == '{') {
        throw_error('missing keyframes name', it.info());
        break;
      }
      continue;
    }
    else if (c == '{') {
      it.next();
      keyframes.steps = read_steps(it);
      break;
    }
    it.next();
  }
  return keyframes;
}

function read_comments(it, flag = {}) {
  let comment = Tokens.comment();
  let c = it.curr();
  if (c != '#') it.next();
  it.next();
  while (!it.end()) {
    if ((c = it.curr()) == '*' && it.curr(1) == '/') break;
    else comment.value += c;
    c = it.curr();
    if (flag.inline) {
      if (c == '\n') return comment;
    } else {
      if (c == '*' && it.curr(1) == '/') break;
    }
    comment.value += c;
    it.next();
  }
  it.next(); it.next();
  return comment;
}

function read_property(it) {
  let prop = '', c;
  while (!it.end()) {
    if ((c = it.curr()) == ':') break;
    else if (!/[a-zA-Z\-@]/.test(c)) {
      throw_error('Syntax error: Bad property name.', it.info());
    }
    else if (!is.white_space(c)) prop += c;
    it.next();
  }
  return prop;
}

function read_quote_block(it, quote) {
  let block = '', c;
  it.next();
  while (!it.end()) {
    if ((c = it.curr()) == quote) {
      if (it.curr(-1) !== '\\') break;
      else block += c;
    }
    else block += c;
    it.next();
  }
  return block;
}

function read_arguments(it) {
  let args = [], group = [], arg = '', c;
  while (!it.end()) {
    if (is.open_bracket(c = it.curr())) {
      arg += skip_block(it);
    }
    else if (/['"]/.test(c)) {
      arg += read_quote_block(it, c);
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
      if (arg.length) {
        if (!group.length) {
          group.push(Tokens.text(get_text_value(arg)));
        } else {
          arg = arg.trimRight();
          if (arg.length) {
            group.push(Tokens.text(arg));
          }
        }
      }

      args.push(group.slice());
      [group, arg] = [[], ''];

      if (c == ')') break;
    }
    else {
      arg += c;
    }

    it.next();
  }

  return args;
}

function read_func(it) {
  let func = Tokens.func(), name = '', c;
  while (!it.end()) {
    if ((c = it.curr()) == ')') break;
    if (c == '(') {
      it.next();
      func.name = name;
      func.arguments = read_arguments(it);
      break;
    }
    else name += c;
    it.next();
  }
  return func;
}

function read_value(it) {
  let text = Tokens.text(), c;
  const value = [];
  while (!it.end()) {
    if ((c = it.curr()) == '\n') {
      it.next();
      continue;
    }
    else if (/[;}]/.test(c)) {
      if (text.value.length) value.push(text);
      text = Tokens.text();
      break;
    }
    else if (c == '@') {
      if (text.value.length) value.push(text);
      text = Tokens.text();
      value.push(read_func(it));
    }
    else if (!is.white_space(c) || !is.white_space(it.curr(-1))) {
      if (c == ':') {
        throw_error('Syntax error: Bad property name.', it.info());
      }
      text.value += c;
    }
    it.next();
  }

  if (text.value.length) value.push(text);

  if (value.length && value[0].value) {
    value[0].value = value[0].value.trimLeft();
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

function read_psuedo(it) {
  let psuedo = Tokens.psuedo(), c;
  while (!it.end()) {
    if ((c = it.curr())== '}') break;
    if (is.white_space(c)) {
      it.next();
      continue;
    }
    else if (!psuedo.selector) {
      psuedo.selector = read_selector(it);
    }
    else {
      psuedo.styles.push(read_rule(it));
      if (it.curr() == '}') break;
    }
    it.next();
  }
  return psuedo;
}

function read_rule(it) {
  let rule = Tokens.rule(), c;
  while (!it.end()) {
    if ((c = it.curr()) == ';') break;
    else if (!rule.property.length) {
      rule.property = read_property(it);
    }
    else {
      rule.value = read_value(it);
      break;
    }
    it.next();
  }
  return rule;
}

function read_cond(it) {
  let cond = Tokens.cond(), c;
  while (!it.end()) {
    if ((c = it.curr()) == '}') break;
    else if (!cond.name.length) {
      Object.assign(cond, read_cond_selector(it));
    }
    else if (c == ':') {
      let psuedo = read_psuedo(it);
      if (psuedo.selector) cond.styles.push(psuedo);
    }
    else if (c == '@' && !read_line(it, true).includes(':')) {
      cond.styles.push(read_cond(it));
    }
    else if (!is.white_space(c)) {
      let rule = read_rule(it);
      if (rule.property) cond.styles.push(rule);
      if (it.curr() == '}') break;
    }
    it.next();
  }
  return cond;
}

function parse(input) {
  const it = iterator(input);
  const Tokens = [];
  while (!it.end()) {
    let c = it.curr();
    if (is.white_space(c)) {
      it.next();
      continue;
    }
    else if (c == '/' && it.curr(1) == '*') {
      Tokens.push(read_comments(it));
    }
    else if (c == '#' || (c == '/' && it.curr(1) == '/')) {
      Tokens.push(read_comments(it, { inline: true }));
    }
    else if (c == ':') {
      let psuedo = read_psuedo(it);
      if (psuedo.selector) Tokens.push(psuedo);
    }
    else if (c == '@' && read_word(it, true) === '@keyframes') {
      let keyframes = read_keyframes(it);
      Tokens.push(keyframes);
    }
    else if (c == '@' && !read_line(it, true).includes(':')) {
      let cond = read_cond(it);
      if (cond.name.length) Tokens.push(cond);
    }
    else if (!is.white_space(c)) {
      let rule = read_rule(it);
      if (rule.property) Tokens.push(rule);
    }
    it.next();
  }
  return Tokens;
}

const units = `
  % cm fr rem em ex in mm pc pt px
  vh vw vmax vmin
  deg grad rad turn
  dpi dpcm dppx
  ms s
`;
const reg_match_unit = new RegExp(
  `(${ units.trim().split(/[\s\n]+/).join('|') })$`
);

function add_unit(fn, unit) {
  return (...args) => {
    args = args.map(remove_unit);
    let result = fn.apply(null, args);
    if (unit) {
      result = result.map(n => n + unit);
    }
    return result;
  }
}

function get_unit(str) {
  if (!str) return '';
  let matched = ''.trim.call(str).match(reg_match_unit);
  return matched ? matched[0] : '';
}

function remove_unit(str) {
  let unit = get_unit(str);
  return unit ? +(str.replace(unit, '')) : str;
}

function values(obj) {
  if (Array.isArray(obj)) return obj;
  return Object.keys(obj).map(k => obj[k]);
}

function apply_args(fn, ...args) {
  return args.reduce((f, arg) =>
    f.apply(null, values(arg)), fn
  );
}

function join_line(arr) {
  return (arr || []).join('\n');
}

function make_array(arr) {
  return Array.isArray(arr) ? arr : [arr];
}

function minmax(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function prefix(rule) {
  return `-webkit-${ rule } ${ rule }`;
}

function only_if(cond, value) {
  return cond ? value : '';
}

const memo_store = {};
function  memo(prefix, fn) {
  return (...args) => {
    let key = prefix + args.join('-');
    if (memo_store[key]) return memo_store[key];
    return (memo_store[key] = fn.apply(null, args));
  }
}

function random(...items) {
  let args = items.reduce((ret, n) => ret.concat(n), []);
  return args[Math.floor(Math.random() * args.length)];
}

function range(start, stop, step) {
  let count = 0;
  let initial = n => (n > 0 && n < 1) ? .1 : 1;
  let length = arguments.length;
  if (length == 1) [start, stop] = [initial(start), start];
  if (length < 3) step = initial(start);
  let range = [];
  while ((step > 0 && start < stop)
    || (step < 0 && start > stop)) {
    range.push(start);
    start += step;
    if (count++ >= 1000) break;
  }
  return range;
}

function unitify(fn) {
  return (...args) => {
    let unit = get_unit(args[0]);
    if (unit) {
      args = args.map(remove_unit);
      return add_unit(fn, unit).apply(null, args);
    }
    return fn.apply(null, args);
  }
}

const [ min, max, total ] = [ 1, 16, 16 * 16 ];

function parse_grid(size) {
  let [x, y] = (size + '')
    .replace(/\s+/g, '')
    .replace(/[,，xX]+/, 'x')
    .split('x')
    .map(Number);

  const max_val = (x == 1 || y == 1) ? total : max;

  const ret = {
    x: minmax(x || min, 1, max_val),
    y: minmax(y || x || min, 1, max_val)
  };

  return Object.assign({}, ret,
    { count: ret.x * ret.y }
  );
}

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
    k = minmax(k, 3, 5);
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
    k = minmax(k, 3, 6);
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
    n = minmax(n, 3, 10);
    return polygon({ split: 240 }, t => [
      ((1 + .2 * cos(n * t)) * cos(t)) * .8,
      ((1 + .2 * cos(n * t)) * sin(t)) * .8
    ]);
  },

  alien(...args) {
    let [a = 1, b = 1, c = 1, d = 1, e = 1]
      = args.map(n => minmax(n, 1, 9));
    return polygon({ split: 480, type: 'evenodd' }, t => [
      (cos(t * a) + cos(t * c) + cos(t * e)) * .31,
      (sin(t * b) + sin(t * d) + sin(t)) * .31
    ]);
  }

};

function infix_to_postfix(input) {
  const op_stack = [], expr = [];
  let tc = '';

  const operator = {
    '*': 3, '/': 3,
    '+': 2, '-': 2,
    '(': 1, ')': 1
  };

  const peek = s => s[s.length - 1];

  for (let c of input) {
    if (/[\d.]/.test(c)) {
      tc += c; continue;
    }

    if (tc.length) {
      expr.push(tc); tc = '';
    }

    if (operator[c]) {
      if (c == '(') {
        op_stack.push(c);
      }

      else if (c == ')') {
        while (op_stack.length && peek(op_stack) != '(') {
          expr.push(op_stack.pop());
        }
        op_stack.pop();
      }

      else {
        while (op_stack.length && operator[peek(op_stack)] >= operator[c]) {
          let op = op_stack.pop();
          if (!/[()]/.test(op)) expr.push(op);
        }
        op_stack.push(c);
      }
    }
  }

  if (tc.length) {
    expr.push(tc);
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
  }
}

function calculate(input) {
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

var Func = {

  index(x, y, count) {
    return _ => count;
  },

  row(x, y, count) {
    return _ => x;
  },

  col(x, y, count) {
    return _ => y;
  },

  pick() {
    return (...args) => random(args);
  },

  rand() {
    return (...args) => random(
      memo('range', unitify(range)).apply(null, args)
    );
  },

  shape() {
    return memo('shape', (type = '', ...args) => {
      type = type.trim();
      if (shapes[type]) {
        return shapes[type].apply(null, args);
      }
    });
  },

  calc() {
    return value => calculate(value);
  }

};

const is_seperator = c => /[,，\s]/.test(c);

function skip_pair(it) {
  let text = it.curr(), c;
  it.next();
  while (!it.end()) {
    text += (c = it.curr());
    if (c == ')') break;
    else if (c == '(') {
      text += skip_pair(it);
    }
    it.next();
  }
  return text;
}

function skip_seperator(it) {
  while (!it.end()) {
    if (!is_seperator(it.curr(1))) break;
    else it.next();
  }
}

function parse$1(input) {
  const it = iterator(input);
  const result = [];
  let group = '';

  while (!it.end()) {
    let c = it.curr();
    if (c == '(') {
      group += skip_pair(it);
    }

    else if (is_seperator(c)) {
      result.push(group);
      group = '';
      skip_seperator(it);
    } else {
      group += c;
    }

    it.next();
  }

  if (group) {
    result.push(group);
  }

  return result;
}

var Property = {

  ['@size'](value, { is_special_selector }) {
    let [w, h = w] = parse$1(value);
    return `
      width: ${ w };
      height: ${ h };
      ${ is_special_selector ? '' : `
        --internal-cell-width: ${ w };
        --internal-cell-height: ${ h };
      `}
    `;
  },
  ['size'](value, options) {
    return this['@size'](value, options);
  },

  ['@min-size'](value) {
    let [w, h = w] = parse$1(value);
    return `min-width: ${ w }; min-height: ${ h };`;
  },
  ['min-size'](value) {
    return this['@min-size'](value);
  },

  ['@max-size'](value) {
    let [w, h = w] = parse$1(value);
    return `max-width: ${ w }; max-height: ${ h };`;
  },
  ['max-size'](value) {
    return this['@max-size'](value);
  },

  ['@place-cell'](value) {
    let [left, top = left] = parse$1(value);
    const map = ({ 'center': '50%', '0': '0%' });
    const bound = '-100vmax';
    left = map[left] || left;
    top = map[top] || top;
    return `
      position: absolute;
      right: ${ bound }; bottom: ${ bound };
      left: calc(${ bound } - 100% + ${ left } * 2);
      top: calc(${ bound } - 100% + ${ top } * 2);
      width: var(--internal-cell-width, 25%);
      height: var(--internal-cell-height, 25%);
      grid-area: unset !important;
      margin: auto !important;
    `;
  },

  ['@grid'](value, options) {
    let [grid, size] = value.split('/').map(s => s.trim());
    return {
      grid: parse_grid(grid),
      size: size ? this['@size'](size, options) : ''
    };
  },

  ['@shape']: memo('shape-property', function(value) {
    let [type, ...args] = parse$1(value);
    return shapes[type]
      ? prefix(`clip-path: ${ shapes[type].apply(null, args) };`)
        + 'overflow: hidden;'
      : '';
  })

};

const is$1 = {
  even: (n) => !!(n % 2),
  odd:  (n) => !(n % 2)
};

var Selector = {

  nth(x, y, count) {
    return n => n == count;
  },

  at(x, y) {
    return (x1, y1) => (x == x1 && y == y1);
  },

  row(x, y) {
    return n => /^(even|odd)$/.test(n) ? is$1[n](x - 1) : (n == x)
  },

  col(x, y) {
    return n => /^(even|odd)$/.test(n) ? is$1[n](y - 1) : (n == y);
  },

  even(x, y, count) {
    return _ => is$1.even(count - 1);
  },

  odd(x, y, count) {
    return _ => is$1.odd(count - 1);
  },

  random() {
    return _ => Math.random() < .5
  }

};

// Expose all Math functions and constants.
const methods = Object.getOwnPropertyNames(Math);

var MathFunc = methods.reduce((expose, n) => {
  expose[n] = () => (...args) => {
    if (typeof Math[n] === 'number') return Math[n];
    return Math[n].apply(null, args.map(eval));
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
    this.reset();
  }

  reset() {
    this.styles = {
      host: '',
      container: '',
      cells: '',
      keyframes: ''
    };
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

  compose_selector(count, psuedo = '') {
    return `.cell:nth-of-type(${ count })${ psuedo }`;
  }

  compose_argument(argument, coords) {
    let result = argument.map(arg => {
      if (arg.type == 'text') {
        return arg.value;
      }
      else if (arg.type == 'func') {
        let fn = this.pick_func(arg.name.substr(1));
        if (fn) {
          let args = arg.arguments.map(n => {
            return this.compose_argument(n, coords);
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
    return value.reduce((result, val) => {
      switch (val.type) {
        case 'text': {
          result += val.value;
          break;
        }
        case 'func': {
          let fn = this.pick_func(val.name.substr(1));
          if (fn) {
            let args = val.arguments.map(arg => {
              return this.compose_argument(arg, coords);
            });
            result += apply_args(fn, coords, args);
          }
        }
      }
      return result;
    }, '');
  }

  compose_rule(token, coords, selector) {
    let prop = token.property;
    let value = this.compose_value(token.value, coords);
    let rule = `${ prop }: ${ value };`;

    if (prop == 'transition') {
      this.props.has_transition = true;
    }

    if (prop == 'clip-path') {
      rule = prefix(rule);
      // fix clip bug
      rule += ';overflow: hidden;';
    }

    if (prop == 'width' || prop == 'height') {
      if (!is_special_selector(selector)) {
        rule += `--internal-cell-${ prop }: ${ value };`;
      }
    }

    if (/^animation(\-name)?$/.test(prop)) {
      this.props.has_animation = true;
      if (coords.count > 1) {
        let { count } = coords;
        switch (prop) {
          case 'animation-name': {
            rule = `${ prop }: ${ this.compose_aname(value, count) };`;
            break;
          }
          case 'animation': {
            let group = (value || '').split(/\s+/);
            group[0] = this.compose_aname(group[0], count);
            rule = `${ prop }: ${ group.join(' ') };`;
          }
        }
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
        default: {
          rule = transformed;
        }
      }
    }

    return rule;
  }

  compose(coords, tokens) {
    (tokens || this.tokens).forEach((token, i) => {
      if (token.skip) return false;
      switch (token.type) {
        case 'rule':
          this.add_rule(
            this.compose_selector(coords.count),
            this.compose_rule(token, coords)
          );
          break;

        case 'psuedo': {
          if (token.selector.startsWith(':doodle')) {
            token.selector = token.selector.replace(/^\:+doodle/, ':host');
          }

          let special = is_special_selector(token.selector);

          if (special) {
            token.skip = true;
          }

          let psuedo = token.styles.map(s =>
            this.compose_rule(s, coords, token.selector)
          );

          let selector = special
            ? token.selector
            : this.compose_selector(coords.count, token.selector);

          this.add_rule(selector, psuedo);
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
            this.keyframes[token.name] = () => `
              ${ join_line(token.steps.map(step => `
                ${ step.name } {
                  ${ join_line(
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
            ${ join_line(this.rules[selector]) }
          }
        `;
      } else {
        let target = is_host_selector(selector) ? 'host' : 'cells';
        this.styles[target] += `
          ${ selector } {
            ${ join_line(this.rules[selector]) }
          }
        `;
      }

      Object.keys(this.keyframes).forEach(name => {
        let aname = this.compose_aname(name, i + 1);
        this.styles.keyframes += `
          ${ only_if(i == 0,
            `@keyframes ${ name } {
              ${ this.keyframes[name]() }
            }`
          )}
          @keyframes ${ aname } {
            ${ this.keyframes[name]() }
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
  rules.compose({ x : 1, y: 1, count: 1 });
  let { grid } = rules.output();
  if (grid) grid_size = grid;
  rules.reset();
  for (let x = 1, count = 0; x <= grid_size.x; ++x) {
    for (let y = 1; y <= grid_size.y; ++y) {
      rules.compose({ x, y, count: ++count});
    }
  }
  return rules.output();
}

const basic = `
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
  }
  .cell {
    position: relative;
    line-height: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

class Doodle extends HTMLElement {
  constructor() {
    super();
    this.doodle = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    setTimeout(() => {
      let compiled;
      if (!this.innerHTML.trim()) {
        return false;
      }
      try {
        let parsed = parse(this.innerHTML);
        this.grid_size = parse_grid(this.getAttribute('grid'));
        compiled = generator(parsed, this.grid_size);
        compiled.grid && (this.grid_size = compiled.grid);
      } catch (e) {
        // clear content before throwing error
        this.innerHTML = '';
        throw new Error(e);
      }
      this.build_grid(compiled);
    });
  }

  build_grid(compiled) {
    const { has_transition, has_animation } = compiled.props;
    const { keyframes, host, container, cells } = compiled.styles;

    this.doodle.innerHTML = `
      <style>${ basic }</style>
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
      <div class="container">
        ${ this.html_cells() }
      </div>
    `;

    if (has_transition || has_animation) {
      setTimeout(() => {
        this.set_style('.style-cells', cells);
      }, 50);
    }
  }

  style_size() {
    return `
      .container {
        grid-template-rows: repeat(${ this.grid_size.x }, 1fr);
        grid-template-columns: repeat(${ this.grid_size.y }, 1fr);
      }
    `;
  }

  html_cells() {
    return '<div class="cell"></div>'
      .repeat(this.grid_size.count);
  }

  set_style(selector, styles) {
    const el = this.shadowRoot.querySelector(selector);
    el && (el.styleSheet
      ? (el.styleSheet.cssText = styles )
      : (el.innerHTML = styles));
  }

  update(styles) {
    if (!styles) styles = this.innerHTML;
    this.innerHTML = styles;

    if (!this.grid_size) {
      this.grid_size = parse_grid(this.getAttribute('grid'));
    }

    const compiled = generator(parse(styles), this.grid_size);

    if (compiled.grid) {
      let { x, y } = compiled.grid;
      if (this.grid_size.x !== x || this.grid_size.y !== y) {
        Object.assign(this.grid_size, compiled.grid);
        return this.build_grid(compiled);
      }
      Object.assign(this.grid_size, compiled.grid);
    }

    else {
      let grid = parse_grid(this.getAttribute('grid'));
      let { x, y } = grid;
      if (this.grid_size.x !== x || this.grid_size.y !== y) {
        Object.assign(this.grid_size, grid);
        return this.build_grid(
          generator(parse(styles), this.grid_size)
        );
      }
    }

    this.set_style('.style-keyframes',
      compiled.styles.keyframes
    );
    this.set_style('.style-container',
        this.style_size()
      + compiled.styles.host
      + compiled.styles.container
    );
    this.set_style('.style-cells',
      compiled.styles.cells
    );
  }

  get grid() {
    return Object.assign({}, this.grid_size);
  }

  set grid(grid) {
    this.setAttribute('grid', grid);
    this.connectedCallback();
  }

  static get observedAttributes() {
    return ['grid'];
  }

  attributeChangedCallback(name, old_val, new_val) {
    if (name == 'grid' && old_val) {
      if (old_val !== new_val) {
        this.grid_size = new_val;
      }
    }
  }
}

customElements.define('css-doodle', Doodle);

})));
