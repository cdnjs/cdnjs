import { C as ConverterBehavior } from './converter-e3ae0909.js';
import './index-e74c1c40.js';

const COM$1 = 'com';
const KEY$1 = 'key';
const NAM$1 = 'nam';
const NUM$1 = 'num';
const PCT$1 = 'pct';
const REX$1 = 'rex';
const SPC$1 = 'spc';
const STR$1 = 'str';
const UNK$1 = 'unk';
const PLS$1 = 'pls';
const MNS$1 = 'mns';
const MRK$1 = 'mrk';
const IMP$1 = 'imp';
const KEYWORD_RE = /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/;
const TOKEN_RES = [
  [MRK$1, /#\[\[.+?]]#/],
  [IMP$1, /!\[\[.+?]]!/],
  [PLS$1, /(^|\n)\+\s.+($|\n)/],
  [MNS$1, /(^|\n)-\s.+($|\n)/],
  [NUM$1, /#([0-9a-f]{6}|[0-9a-f]{3})\b/],
  [COM$1, /(\/\/|#).*?(?=\n|$)/],
  [COM$1, /\/\*[\s\S]*?\*\//],
  [COM$1, /<!--[\s\S]*?-->/],
  [REX$1, /\/(\\\/|[^\n])*?\/(?=[^\w])/], // lgtm [js/redos]
  [STR$1, /(['"])(\\\1|[\s\S])*?\1/],
  [NUM$1, /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/],
  [SPC$1, /\s+/],
  [NAM$1, /[\w-$]+/],
  [PCT$1, /[\\.,:;+\-*\/=<>()[\]{}|?!&@~]/],
  [UNK$1, /./]
];

function tokenize(text) {
  const tokens = [];
  const len = TOKEN_RES.length;

  let prefer_div_over_re = false;

  while (text) {
    for (let i = 0; i < len; i += 1) {
      let m = TOKEN_RES[i][1].exec(text);
      if (!m || m.index !== 0) {
        continue;
      }

      let cls = TOKEN_RES[i][0];
      if (cls === REX$1 && prefer_div_over_re) {
        continue;
      }

      let tok = m[0];

      if (cls === NAM$1 && KEYWORD_RE.test(tok)) {
        cls = KEY$1;
      }
      if (cls === SPC$1) {
        if (tok.indexOf('\n') >= 0) {
          prefer_div_over_re = false;
        }
      } else {
        prefer_div_over_re = cls === NUM$1 || cls === NAM$1;
      }

      text = text.slice(tok.length);
      tokens.push([cls, tok]);
      break;
    }
  }

  return tokens;
}

const SYMBOL_MAP = {
  pls: '+',
  mns: '+',
};

const ATTR_MAP = {
  pls: 'plus',
  mns: 'minus',
};

function codeToMarkup(str, enumerate, themes) {
  const lines = str.split('\n');

  if (lines[0] && !lines[0].trim()) {
    lines.splice(0, 1);
  }

  if (lines[lines.length - 1] && !lines[lines.length - 1].trim()) {
    lines.splice(-1, 1);
  }

  const firstLine = lines
    .find(line => line.trim().length);

  if (!firstLine) return '';

  const tab = firstLine.match(/^\s*/)[0];

  if (tab) {
    str = lines.map(str => str.replace(tab, '')).join('\n');
  }

  let number = 0;

  let numSize = 2;

  const tokens = tokenize(str);

  if (enumerate) {
    let linesNum = 1;

    tokens.forEach(token => {
      if (token[0] === 'spc') {
        const match = token[1].match(/\n/g);

        if (match) {
          linesNum += match.length;
        }
      }
    });

    numSize = 1 + String(linesNum).length;
  }

  function getColorAttrs(tok) {
    return Object.keys(themes[tok]).reduce((str, attr) => {
      const value = themes[tok][attr];

      str += `${attr}="${value}" `;

      return str;
    }, '');
  }

  function getNumber(firstLine) {
    const numSpaces = ' '.repeat(numSize - String(number + 1).length);

    return `${!firstLine ? '\n' : ''}<nu-el ${getColorAttrs(COM$1)} before="${++number}.${numSpaces}"></nu-el>`;
  }

  return tokens.reduce(function (html, token) {
    let id = token[0];
    let attr = ATTR_MAP[id] ? ` ${ATTR_MAP[id]}` : '';
    let value = SYMBOL_MAP[id] ? token[1].slice(2) : token[1];

    if (enumerate && id === SPC$1) {
      value = value.replace(/\n/g, s => getNumber());
    }

    if (id === MRK$1 || id === IMP$1) {
      value = value.replace(/([!#]\[\[|]][!#])/g, '');
    }

    return html + `<nu-el ${getColorAttrs(token[0])}${attr}>${value}</nu-el>`;
  }, enumerate ? getNumber(true) : '');
}

let themesDeclared = false;

const COM = 'com';
const KEY = 'key';
const NAM = 'nam';
const NUM = 'num';
const PCT = 'pct';
const REX = 'rex';
const SPC = 'spc';
const STR = 'str';
const UNK = 'unk';
const PLS = 'pls';
const MNS = 'mns';
const MRK = 'mrk';
const IMP = 'imp';

const NAMES = [COM, KEY, NAM, NUM, PCT, REX, SPC, STR, UNK, PLS, MNS, MRK, IMP];
const THEME_ATTRS = {};

class CodeBehavior extends ConverterBehavior {
  static get converter() {
    return codeToMarkup;
  }

  init() {
    this.props.enumerate = (val) => {
      if (this.observe) {
        setTimeout(() => this.observe());
      }

      return val != null;
    };

    if (!themesDeclared) {
      declareThemes();
    }

    super.init();
  }

  apply(container, content, converter) {
    if (!converter) return;

    container.innerHTML = converter(
      content,
      this.enumerate,
      THEME_ATTRS,
    );
  }

  prepareContent(content) {
    const str = content || '';

    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/(^|\n)\s*(?=\n$)/g, '')
      .replace(/\n\s*(?=(\n$|$))/g, '')
      .replace(/^\n/, '')
      .replace(/\n$/, '');
  }
}

function declareThemes() {
  themesDeclared = true;

  NAMES.forEach(name => {
    THEME_ATTRS[name] = { style: `color: var(--${name}-color, var(--main-text-color)); background-color: var(--${name}-bg-color, transparent)` };

    if (name === MRK || name === IMP) {
      THEME_ATTRS[name].radius = '.5x';
    }
  });
}

export default CodeBehavior;
export { NAMES, THEME_ATTRS };
