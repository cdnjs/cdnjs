(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var is = {
  even: (n) => !!(n % 2),
  odd:  (n) => !(n % 2)
};

function nth(x, y, count) {
  return n => n == count;
}

function at(x, y) {
  return (x1, y1) => (x == x1 && y == y1);
}

function row(x) {
  return n => /^(even|odd)$/.test(n) ? is[n](x) : (n == x)
}

function col(x, y) {
  return n => /^(even|odd)$/.test(n) ? is[n](y) : (n == y);
}

function even(x, y, count) {
  return _ => is.even(count - 1);
}

function odd(x, y, count) {
  return _ => is.odd(count - 1);
}


var cond = Object.freeze({
  nth: nth,
  at: at,
  row: row,
  col: col,
  even: even,
  odd: odd
});

function index(x, y, count) {
  return _ => count;
}

function row$1(x) {
  return _ => x;
}

function col$1(x, y) {
  return _ => y;
}

function any() {
  return function(...args) {
    return random.apply(null, args);
  }
}

function rand() {
  return function(...args) {
    return random(memo(unitify(range)).apply(null, args));
  }
}

function random(...items) {
  let args = items.reduce((ret, n) => ret.concat(n), []);
  return args[Math.floor(Math.random() * args.length)];
}

function memo(fn) {
  return function(...args) {
    const memo = {};
    let key = args.join('-');
    if (memo[key]) return memo[key];
    return (memo[key] = fn.apply(null, args));
  }
}

function range(start, stop, step) {
  let count = 0;
  let initial = n => (n > 0 && n < 1) ? .1 : 1;
  let length = arguments.length;
  if (length == 1) [start, stop] = [initial(start), start];
  if (length < 3) step = initial(stop);
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
  return function(...args) {
    let unit = get_unit(args[0]);
    if (unit) {
      args = args.map(remove_unit);
      return add_unit(fn, unit).apply(null, args);
    }
    return fn.apply(null, args);
  }
}

function add_unit(fn, unit) {
  return function(...args) {
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
  let unit = /(%|cm|em|ex|in|mm|pc|pt|px|vh|vw|vmin|deg|ms|s)$/;
  let matched = ''.trim.call(str).match(unit);
  return matched ? matched[0] : '';
}

function remove_unit(str) {
  let unit = get_unit(str);
  return unit ? +(str.replace(unit, '')) : str;
}


var func = Object.freeze({
  index: index,
  row: row$1,
  col: col$1,
  any: any,
  rand: rand
});

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

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

class Rules {
  constructor(tokens) {
    this.tokens = tokens;
    this.rules = {};
    this.props = {};
    this.styles = {
      host: '', cells: ''
    };
  }
  add_rule(selector, rule) {
    var rules = this.rules[selector];
    if (!rules) {
      rules = this.rules[selector] = [];
    }
    rules.push.apply(rules, make_array(rule));
  }
  compose_selector(count, psudo = '') {
    return `.cell:nth-of-type(${ count }) .shape${ psudo }`;
  }
  compose_value(value, coords) {
    return value.reduce((result, val) => {
      switch (val.type) {
        case 'text': {
          result += val.value;
          break;
        }
        case 'function': {
          var fn = func[val.name.substr(1)];
          if (fn) {
            result += apply_args(
              fn, coords, val.arguments
            );
          }
        }
      }
      return result;
    }, '');
  }
  compose_rule(token, coords) {
    var property = token.property;
    var value = this.compose_value(token.value, coords);
    if (property == 'transition') {
      this.props.has_transition = true;
    }
    return `${ property }: ${ value };`;
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

        case 'psudo': {
          if (token.selector.startsWith(':doodle')) {
            token.selector =
              token.selector.replace(/^\:+doodle/, ':host');
          }

          var is_host_selector =
            token.selector.startsWith(':host');

          if (is_host_selector) {
            token.skip = true;
          }

          var psudo_rules = token.styles.map(s =>
            this.compose_rule(s, coords)
          );

          var selector = is_host_selector
            ? token.selector
            : this.compose_selector(coords.count, token.selector);

          this.add_rule(selector, psudo_rules);
          break;
        }

        case 'cond':
          var fn = cond[token.name.substr(1)];
          if (fn) {
            var result = apply_args(fn, coords, token.arguments);
            if (result) {
              this.compose(coords, token.styles);
            }
          }
          break;
      }
    });
  }

  output() {
    Object.keys(this.rules).forEach(selector => {
      var is_host = selector.startsWith(':host');
      const target = is_host ? 'host': 'cells';
      this.styles[target] += `
        ${ selector } {
          ${ join_line(this.rules[selector]) }
        }
      `;
    });
    return {
      props: this.props,
      styles: this.styles
    }
  }
}

function generator(tokens, size) {
  var rules = new Rules(tokens);
  for (var x = 1, count = 0; x <= size.x; ++x) {
    for (var y = 1; y <= size.y; ++y) {
      rules.compose({ x, y, count: ++count});
    }
  }
  return rules.output();
}

const struct = {
  func:    () => ({ type: 'function', name: '', arguments: [] }),
  text:    () => ({ type: 'text', value: '' }),
  psudo:   () => ({ type: 'psudo', selector: '', styles: [] }),
  cond:    () => ({ type: 'cond', name: '', styles: [], arguments: [] }),
  rule:    () => ({ type: 'rule', property: '', value: [] }),
  comment: () => ({ type: 'comment', value: ''})
};

const bracket_pair = {
  '(': ')',
  '[': ']',
  '{': '}'
};

const is$1 = {
  white_space(c) {
    return /[\s\n\t]/.test(c);
  },
  open_bracket(c) {
    return bracket_pair.hasOwnProperty(c);
  },
  close_bracket_of(c) {
    var pair = bracket_pair[c];
    return p => p == pair;
  },
  number(n) {
    return !isNaN(n);
  }
};

function iterator(input) {
  var index = 0, col = 1, line = 1;
  return {
    curr:  (n = 0) => input[index + n],
    end:   () => input.length <= index,
    info:  () => ({ index, col, line }),
    next:  () => {
      var next = input[index++];
      if (next == '\n') line++, col = 0;
      else col++;
      return next;
    }
  };
}

function throw_error(msg, { col, line }) {
  throw new Error(
    `(at line ${ line }, column ${ col }) ${ msg }`
  );
}

function skip_block(it) {
  var [skipped, c] = [it.curr(), it.curr()];
  var is_close_bracket = is$1.close_bracket_of(c);
  it.next();
  while (!it.end()) {
    if (is_close_bracket(c = it.curr())) {
      skipped += c;
      break;
    }
    else if (is$1.open_bracket(c)) {
      skipped += skip_block(it);
    } else {
      skipped += c;
    }
    it.next();
  }
  return skipped;
}

function read_comments(it, flag = {}) {
  var comment = struct.comment();
  var c = it.curr();
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
  var prop = '', c;
  while (!it.end()) {
    if ((c = it.curr()) == ':') break;
    else if (!/[a-zA-Z\-]/.test(c)) {
      throw_error('Syntax error: Bad property name.', it.info());
    }
    else if (!is$1.white_space(c)) prop += c;
    it.next();
  }
  return prop;
}

function read_quote_block(it, quote) {
  var block = '', c;
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
  var args = [], arg = '', c;
  while (!it.end()) {
    if (is$1.open_bracket(c = it.curr())) {
      arg += skip_block(it);
    }
    else if (/['"]/.test(c)) {
      arg += read_quote_block(it, c);
    }
    else if (/[,)]/.test(c)) {
      if (arg.length) {
        args.push(is$1.number(+arg) ? +arg : arg);
        arg = '';
      }
      if (c == ')') break;
    }
    else if (!is$1.white_space(c)) {
      arg += c;
    }
    it.next();
  }
  return args;
}

function read_func(it) {
  var func = struct.func(), name = '', c;
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
  var text = struct.text(), c;
  const value = [];
  while (!it.end()) {
    if ((c = it.curr()) == '\n') {
      it.next();
      continue;
    }
    else if (/[;}]/.test(c)) {
      if (text.value.length) value.push(text);
      text = struct.text();
      break;
    }
    else if (c == '@') {
      if (text.value.length) value.push(text);
      text = struct.text();
      value.push(read_func(it));
    }
    else if (!is$1.white_space(c) || !is$1.white_space(it.curr(-1))) {
      if (c == ':') {
        throw_error('Syntax error: Bad property name.', it.info());
      }
      text.value += c;
    }
    it.next();
  }
  if (text.value.length) value.push(text);
  return value;
}

function read_selector(it) {
  var selector = '', c;
  while (!it.end()) {
    if ((c = it.curr())== '{') break;
    else if (!is$1.white_space(c)) selector += c;
    it.next();
  }
  return selector;
}

function read_cond_selector(it) {
  var selector = { name: '', arguments: [] }, c;
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

function read_psudo(it) {
  var psudo = struct.psudo(), c;
  while (!it.end()) {
    if ((c = it.curr())== '}') break;
    if (is$1.white_space(c)) {
      it.next();
      continue;
    }
    else if (!psudo.selector) psudo.selector = read_selector(it);
    else psudo.styles.push(read_rule(it));
    it.next();
  }
  return psudo;
}

function read_rule(it) {
  var rule = struct.rule(), c;
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
  var cond = struct.cond(), c;
  while (!it.end()) {
    if ((c = it.curr()) == '}') break;
    else if (!cond.name.length) {
      Object.assign(cond, read_cond_selector(it));
    }
    else if (c == ':') {
      var psudo = read_psudo(it);
      if (psudo.selector) cond.styles.push(psudo);
    }
    else if (c == '@') {
      cond.styles.push(read_cond(it));
    }
    else if (!is$1.white_space(c)) {
      var rule = read_rule(it);
      if (rule.property) cond.styles.push(rule);
    }
    it.next();
  }
  return cond;
}

function tokenizer(input) {
  const it = iterator(input);
  const tokens = [];
  while (!it.end()) {
    var c = it.curr();
    if (is$1.white_space(c)) {
      it.next();
      continue;
    }
    else if (c == '/' && it.curr(1) == '*') {
      tokens.push(read_comments(it));
    }
    else if (c == '#' || (c == '/' && it.curr(1) == '/')) {
      tokens.push(read_comments(it, { inline: true }));
    }
    else if (c == ':') {
      var psudo = read_psudo(it);
      if (psudo.selector) tokens.push(psudo);
    }
    else if (c == '@') {
      var cond = read_cond(it);
      if (cond.name.length) tokens.push(cond);
    }
    else if (!is$1.white_space(c)) {
      var rule = read_rule(it);
      if (rule.property) tokens.push(rule);
    }
    it.next();
  }
  return tokens;
}

function compile(input, size) {
  return generator(tokenizer(input), size);
}

const MIN = 1;
const MAX = 16;

function parse_size(size) {
  let [x, y] = (size + '')
    .replace(/\s+/g, '')
    .replace(/[,，xX]+/, 'x')
    .split('x')
    .map(Number);

  const ret = {
    x: clamp(x || MIN, 1, MAX),
    y: clamp(y || x || MIN, 1, MAX)
  };

  return Object.assign({}, ret,
    { count: ret.x * ret.y }
  );
}

const basic = `
  :host {
    display: block;
    visibility: visible;
    width: 1em;
    height: 1em;
    will-change: transform
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%
  }
  .container:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden
  }
  .cell {
    position: relative;
    float: left;
    line-height: 0;
    box-sizing: border-box
  }
  .shape {
    box-sizing: border-box;
    line-height: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center
  }
`;

class Doodle extends HTMLElement {
  constructor() {
    super();
    this.doodle = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    setTimeout(() => {
      if (!this.innerHTML.trim()) {
        return false;
      }

      let compiled;

      try {
        compiled = compile(
          this.innerHTML,
          this.size = parse_size(this.getAttribute('grid'))
        );
      } catch (e) {
        // clear content before throwing error
        this.innerHTML = '';
        throw new Error(e);
      }

      const { has_transition } = compiled.props;

      this.doodle.innerHTML = `
        <style>${ basic }</style>
        <style class="style-container">
          ${ this.style_size() }
          ${ compiled.styles.host }
        </style>
        <style class="style-cells">
          ${ has_transition ? '' : compiled.styles.cells }
        </style>
        <div class="container">
          ${ this.html_cells() }
        </div>
      `;

      if (has_transition) {
        setTimeout(() => {
          this.set_style('.style-cells',
            compiled.styles.cells
          );
        }, 50);
      }
    });
  }

  style_size() {
    return `
      .cell {
        width: ${ 100 / this.size.x + '%' };
        height: ${ 100 / this.size.y + '%' };
      }
    `;
  }

  html_cells() {
    const cell = `
      <div class="cell">
        <div class="shape"></div>
      </div>
    `;
    return cell.repeat(this.size.count);
  }

  set_style(selector, styles) {
    const el = this.shadowRoot.querySelector(selector);
    el && (el.styleSheet
      ? (el.styleSheet.cssText = styles )
      : (el.innerHTML = styles));
  }

  update(styles) {
    if (!styles) {
      return false;
    }
    if (!this.size) {
      this.size = parse_size(this.getAttribute('grid'));
    }
    const compiled = compile(styles, this.size);
    this.set_style('.style-container',
      this.style_size() + compiled.styles.host
    );
    this.set_style('.style-cells',
      compiled.styles.cells
    );
    this.innerHTML = styles;
  }

  refresh() {
    this.update(this.innerHTML);
  }

  get grid() {
    return Object.assign({}, this.size);
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
        this.grid = new_val;
      }
    }
  }
}

customElements.define('css-doodle', Doodle);

})));
