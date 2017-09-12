(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = exports.Code = exports.Grid = exports.Table = exports.Shape = exports.Button = exports.Checkbox = exports.TextField = undefined;

var _lib = require('./lib');

exports.TextField = _lib.TextField;
exports.Checkbox = _lib.Checkbox;
exports.Button = _lib.Button;
exports.Shape = _lib.Shape;
exports.Table = _lib.Table;
exports.Grid = _lib.Grid;
exports.Code = _lib.Code;
exports.Menu = _lib.Menu;

},{"./lib":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Button.
 */

exports.default = {
  propTypes: {
    type: { type: 'string', expects: ['primary', 'secondary', 'warning'] },
    size: { type: 'string', expects: ['small', 'medium', 'large'] },
    onClick: { type: 'function' },
    label: { type: 'string' }
  },

  render: function render(_ref) {
    var props = _ref.props;
    var label = props.label;
    var size = props.size;
    var type = props.type;
    var onClick = props.onClick;

    var attrs = {
      type: type || 'primary',
      size: size || 'medium',
      class: 'matter-Button',
      onClick: onClick
    };

    return React.createElement(
      'button',
      attrs,
      label
    );
  }
};

},{"virtual-element":28}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checkbox.
 */

exports.default = {
  propTypes: {
    size: { type: 'string', expects: ['small', 'medium', 'large'] },
    onClick: { type: 'function' },
    checked: { type: 'boolean' }
  },

  render: function render(_ref) {
    var props = _ref.props;
    var size = props.size;
    var checked = props.checked;
    var onClick = props.onClick;

    var attrs = {
      class: 'matter-Checkbox',
      size: size || 'medium',
      onClick: onClick,
      checked: checked,
      type: 'checkbox'
    };

    return React.createElement('input', attrs);
  }
};

},{"virtual-element":28}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

var _syntaxHighlighter = require('syntax-highlighter');

var _syntaxHighlighter2 = _interopRequireDefault(_syntaxHighlighter);

var _highlightObjectiveC = require('highlight-objective-c');

var _highlightObjectiveC2 = _interopRequireDefault(_highlightObjectiveC);

var _highlightJavascript = require('highlight-javascript');

var _highlightJavascript2 = _interopRequireDefault(_highlightJavascript);

var _highlightCsharp = require('highlight-csharp');

var _highlightCsharp2 = _interopRequireDefault(_highlightCsharp);

var _highlightPython = require('highlight-python');

var _highlightPython2 = _interopRequireDefault(_highlightPython);

var _highlightJava = require('highlight-java');

var _highlightJava2 = _interopRequireDefault(_highlightJava);

var _highlightBash = require('highlight-bash');

var _highlightBash2 = _interopRequireDefault(_highlightBash);

var _highlightRuby = require('highlight-ruby');

var _highlightRuby2 = _interopRequireDefault(_highlightRuby);

var _highlightYaml = require('highlight-yaml');

var _highlightYaml2 = _interopRequireDefault(_highlightYaml);

var _highlightXml = require('highlight-xml');

var _highlightXml2 = _interopRequireDefault(_highlightXml);

var _highlightPhp = require('highlight-php');

var _highlightPhp2 = _interopRequireDefault(_highlightPhp);

var _highlightCss = require('highlight-css');

var _highlightCss2 = _interopRequireDefault(_highlightCss);

var _highlightGo = require('highlight-go');

var _highlightGo2 = _interopRequireDefault(_highlightGo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Highlight.
 */

/**
 * Languages.
 */

var highlight = new _syntaxHighlighter2.default().use(_highlightPython2.default).use(_highlightCsharp2.default).use(_highlightYaml2.default).use(_highlightJava2.default).use(_highlightRuby2.default).use(_highlightBash2.default).use(_highlightObjectiveC2.default).use(_highlightXml2.default).use(_highlightCss2.default).use(_highlightPhp2.default).use(_highlightJavascript2.default).use(_highlightGo2.default);

/**
 * Code.
 */

exports.default = {
  propTypes: {
    language: { type: 'string' }
  },

  render: function render(_ref) {
    var props = _ref.props;
    var language = props.language;
    var children = props.children;

    var unformattedCode = children[0];
    var formattedCode = highlight.string(unformattedCode, language);

    return React.createElement(
      'div',
      { 'class': 'matter-Code' },
      React.createElement('code', { 'class': 'matter-Code-code', innerHTML: formattedCode })
    );
  }
};

},{"highlight-bash":12,"highlight-csharp":13,"highlight-css":14,"highlight-go":15,"highlight-java":16,"highlight-javascript":17,"highlight-objective-c":18,"highlight-php":19,"highlight-python":20,"highlight-ruby":21,"highlight-xml":22,"highlight-yaml":23,"syntax-highlighter":26,"virtual-element":28}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Grid.
 */

exports.default = {
  render: function render(_ref) {
    var props = _ref.props;

    return React.createElement(
      'ul',
      { 'class': 'matter-Grid' },
      props.children
    );
  }
};

},{"virtual-element":28}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = exports.Code = exports.Grid = exports.Table = exports.Shape = exports.Button = exports.Checkbox = exports.TextField = undefined;

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TextField = _textField2.default;
exports.Checkbox = _checkbox2.default;
exports.Button = _button2.default;
exports.Shape = _shape2.default;
exports.Table = _table2.default;
exports.Grid = _grid2.default;
exports.Code = _code2.default;
exports.Menu = _menu2.default;

},{"./button":2,"./checkbox":3,"./code":4,"./grid":5,"./menu":7,"./shape":8,"./table":9,"./text-field":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Menu.
 */

exports.default = {
  propTypes: {
    onChange: { type: 'function' },
    items: { type: 'array' }
  },

  render: function render(_ref, updateState) {
    var props = _ref.props;
    var state = _ref.state;
    var items = props.items;
    var onChange = props.onChange;
    var defaultActive = props.defaultActive;
    var activeItem = state.activeItem;

    var currentItem = activeItem || defaultActive || items[0];

    var menuItems = items.map(function (item) {
      return React.createElement(
        'div',
        { 'class': 'matter-Menu-item', onClick: onClick, active: currentItem === item },
        React.createElement(
          'span',
          null,
          item
        )
      );

      function onClick() {
        updateState({ activeItem: item });
        if (onChange) onChange(item);
      }
    });

    return React.createElement(
      'div',
      { 'class': 'matter-Menu' },
      menuItems
    );
  }
};

},{"virtual-element":28}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shape.
 */

exports.default = {
  propTypes: {
    color: { type: 'string' },
    space: { type: 'string' },
    kind: { type: 'string' },
    size: { type: 'string' }
  },

  render: function render(_ref, updateState) {
    var props = _ref.props;
    var state = _ref.state;
    var children = props.children;
    var color = props.color;
    var space = props.space;
    var kind = props.kind;
    var size = props.size;

    var attrs = {
      class: 'matter-Shape',
      kind: kind || 'rectangle',
      space: space || 'medium',
      size: size || 'medium',
      color: color
    };

    return React.createElement(
      'div',
      attrs,
      children
    );
  }
};

},{"virtual-element":28}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Table.
 */

exports.default = {
  propTypes: {
    rows: { type: 'array' }
  },

  render: function render(_ref, setState) {
    var props = _ref.props;
    var state = _ref.state;
    var rows = props.rows;

    var tableRows = rows.map(function (row) {
      var rowCells = row.map(function (cell) {
        return React.createElement(
          'td',
          { 'class': 'matter-Table-cell', colspan: '1', rowspan: '1' },
          React.createElement(
            'span',
            null,
            cell
          )
        );
      });

      return React.createElement(
        'tr',
        { 'class': 'matter-Table-row' },
        rowCells
      );
    });

    return React.createElement(
      'table',
      { 'class': 'matter-Table', cellpadding: '0', cellspacing: '0' },
      React.createElement(
        'tbody',
        null,
        tableRows
      )
    );
  }
};

},{"virtual-element":28}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TextField.
 */

exports.default = {
  propTypes: {
    placeholder: { type: 'string' }
  },

  render: function render(_ref) {
    var props = _ref.props;
    var state = _ref.state;
    var placeholder = props.placeholder;

    var attrs = {
      class: 'matter-TextField',
      placeholder: placeholder
    };

    return React.createElement('input', attrs);
  }
};

},{"virtual-element":28}],11:[function(require,module,exports){
'use strict'

/**
 * Expose `arrayFlatten`.
 */
module.exports = arrayFlatten

/**
 * Recursive flatten function with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {Number} depth
 * @return {Array}
 */
function flattenWithDepth (array, result, depth) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (depth > 0 && Array.isArray(value)) {
      flattenWithDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Recursive flatten function. Omitting depth is slightly faster.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
function flattenForever (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenForever(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Flatten an array, with the ability to define a depth.
 *
 * @param  {Array}  array
 * @param  {Number} depth
 * @return {Array}
 */
function arrayFlatten (array, depth) {
  if (depth == null) {
    return flattenForever(array, [])
  }

  return flattenWithDepth(array, [], depth)
}

},{}],12:[function(require,module,exports){

/**
 * Expose `bash`
 */

module.exports = bash;

/**
 * Add `bash` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function bash(highlight){
  highlight.language('sh', bash);
  highlight.language('bash', bash);
  highlight.language('shellscript', bash);
}

/**
 * Comments
 */

bash.comment = /(#.*?$)/m

/**
 * Strings
 */

bash.string = /(("|')(\\?.)*?\2)/;

/**
 * Keywords
 */

bash.keyword = /\b(if|then|else|elif|fi|for|in|do|done|select|case|continue|esac|while|until|return|export|declare|typeset|local|readonly)\b/;

/**
 * Operators
 */

bash.operator = /(;|&&?|\|\||=[=~]?|!=?|&lt;|&gt;|\|)/;

/**
 * Builtins
 */

bash.builtin = /\b(alias|bg|bind|break|builtin|caller|cd|command|compgen|complete|dirs|disown|echo|enable|eval|exec|exit|false|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|read|readonly|set|shift|shopt|source|suspend|test|times|trap|true|type|ulimit|umask|unalias|unset|wait)\b/;
},{}],13:[function(require,module,exports){

/**
 * Expose `csharp`
 */

module.exports = csharp;

/**
 * Add `csharp` as a plugin.
 *
 * @param {Highlight} highlight
 * @api public
 */

function csharp(highlight){
  highlight.language('csharp', csharp);
  highlight.language('c-sharp', csharp);
  highlight.language('c#', csharp);
}

/**
 * Booleans
 */

csharp.boolean = /\b(true|false)\b/;

/**
 * Comments
 */

csharp.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Classes
 */

csharp.class = /class +(\w+)/;
csharp.class.children = { keyword: /class/ };

/**
 * Strings
 */

csharp.string = /("(\\?.)*?")/

/**
 * Keywords
 */

csharp.keyword = /\b(abstract|base|bool|break|byte|case|catch|char|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|lock|long|namespace|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|stackalloc|static|string|struct|switch|this|throw|try|uint|ulong|unsafe|ushort|using|virtual|void|volatile|while)\b/;

/**
 * Numbers
 */

csharp.number = /\b[-+]?(0x[\da-f]+|\d*\.?\d+(e-?\d+)?)\b/;

/**
 * Method
 */

csharp.method = /(\w+) *\(/;
csharp.method.children = { punctuation: /\(/ };

/**
 * Operators
 */

csharp.operator = /(await|as|is|new|typeof|checked|unchecked|default|delegate|sizeof|->|[-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

csharp.punctuation = /[{}[\];(),.:]/;
},{}],14:[function(require,module,exports){

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight CSS code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight.language('css', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Comments.
 */

grammar.comment = /\/\*[\w\W]*?\*\//m;

/**
 * Strings.
 */

grammar.string = /("|').*?\1/;

/**
 * @-rules.
 */

grammar['at-rule'] = /@[\w-]+\b/;

/**
 * Selectors.
 */

grammar.selector = {
  pattern: /[^\{\}\s][^\{\};]*?\{/,
  children: {
    class: /\.[-.\w]+/,
    id: /#[-\w]+/,
    'pseudo-element': /:(after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+(\(.*\))?/,
    punctuation: /\{/
  }
};

/**
 * Functions.
 */

grammar.function = {
  pattern: /[\w-]+\(/,
  children: {
    punctuation: /\(/
  }
};

/**
 * Properties.
 */

grammar.property = /[\w-]+(?=\s*:)/;

/**
 * Keywords.
 */

grammar.keyword = /[\b|!]important|initial|inherit|none|transparent\b/;

/**
 * Numbers.
 */

grammar.number = /(#[A-Fa-f\d]{3,8}|\b\d*\.?\d+)/;

/**
 * Operators.
 */

grammar.operator = /[-+\/*%^]/;

/**
 * Punctuation.
 */

grammar.punctuation = /[{}(),:;]/;

/**
 * Constant.
 */

grammar.constant = /(?!\d)(ch|cm|deg|dpcm|dpi|dppx|em|ex|grad|Hz|kHz|in|mm|pc|pt|px|rad|rem|s|ms|turn|vh|vmax|vmin|vw)\b/;

},{}],15:[function(require,module,exports){

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight go code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight.language('go', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Strings.
 */

grammar.string = /(("|')(\\?.)*?\2)/;

/**
 * Comments.
 */

grammar.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Booleans.
 */

grammar.boolean = /\b(true|false)\b/;

/**
 * Keywords.
 */

grammar.keyword = /\b(break|default|func|interface|select|case|defer|go|map|struct|chan}else}goto}package|switch|const|fallthrough|if|range|type|continue|for|import|return|var)\b/;

/**
 * Functions.
 *
 * Children are set separately to maintain ordering.
 */

grammar.function = {
  pattern: /(\w+)\(/,
  children: {}
};

grammar.function.children.class = /\b([A-Z]\w*)\b/;
grammar.function.children.function = /(\w+)/;
grammar.function.children.punctuation = /\(/;

/**
 * Numbers.
 */

grammar.number = /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/;

/**
 * Operators.
 */

grammar.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation.
 */

grammar.punctuation = /[{}[\];(),.:]/;
},{}],16:[function(require,module,exports){

/**
 * Expose `java`
 */

module.exports = java;

/**
 * Add `java` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function java(highlight){
  highlight.language('java', java);
}

/**
 * Boolean
 */

java.boolean = /\b(true|false)\b/;

/**
 * Comment
 */

java.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Class
 */

java.class = /class +(\w+)/;
java.class.children = { keyword: /class/ };

/**
 * Keywords
 */

java.keyword = /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|protected|public|return|static|staticfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/;

/**
 * Number
 */

java.number = /\b[-+]?(0[bx][\da-f]+|\d*\.?\d+(e-?\d+)?)\b/;

/**
 * String
 */

java.string = /("(\\?.)*?")/;

/**
 * Method
 */

java.method = /(\w+) *\(/;
java.method.children = { punctuation: /\(/ };

/**
 * Operator
 */

java.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

java.punctuation = /[{}[\];(),.:]/;
},{}],17:[function(require,module,exports){

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight Javascript code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight
    .language('javascript', grammar)
    .language('js', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Strings.
 */

grammar.string = /(("|')(\\?.)*?\2)/;

/**
 * Comments.
 */

grammar.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Booleans.
 */

grammar.boolean = /\b(true|false)\b/;

/**
 * Keywords.
 */

grammar.keyword = /\b(break|catch|continue|delete|do|else|finally|for|function|if|in|instanceof|let|new|null|return|this|self|throw|try|typeof|var|while|with|yield)\b/;

/**
 * Constants.
 */

grammar.constant = /\b(document|window|global)\b/;

/**
 * Functions.
 *
 * Children are set separately to maintain ordering.
 */

grammar.function = {
  pattern: /(\w+)\(/,
  children: {}
};

grammar.function.children.class = /\b([A-Z]\w*)\b/;
grammar.function.children.function = /(\w+)/;
grammar.function.children.punctuation = /\(/;

/**
 * Numbers.
 */

grammar.number = /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/;

/**
 * Operators.
 */

grammar.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation.
 */

grammar.punctuation = /[{}[\];(),.:]/;
},{}],18:[function(require,module,exports){

/**
 * Expose `objectiveC`
 */

module.exports = objectiveC;

/**
 * Add `Objective-C` as a plugin.
 *
 * @param {Highlight} highlight
 * @api public
 */

function objectiveC(highlight){
  highlight
    .language('objective-c', objectiveC)
    .language('objc', objectiveC);
}

/**
 * Methods
 */

objectiveC.method = /\[\w+ (\w+)\]/;

/**
 * Booleans
 */

objectiveC.boolean = /\b(yes|no|true|false)\b/i;

/**
 * Comments
 */

objectiveC.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$)/m;

/**
 * Classes
 */

objectiveC.class = /@(implementation|interface|class) +(\w+)/;
objectiveC.class.children = { keyword: /@(implementation|interface|class)/ };

/**
 * Keywords
 */

objectiveC.keyword = /\b(void|char|short|int|long|float|double|signed|unsigned|id|const|volatile|in|out|inout|bycopy|byref|oneway|self|super)\b/;

/**
 * Numbers
 */

objectiveC.number = /\b@?[-+]?(0x[A-Fa-f0-9]+|\d+)\b/;

/**
 * Strings
 */

objectiveC.string = /(@?"(\\?.)*?")/;

/**
 * Operator
 */

objectiveC.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

objectiveC.punctuation = /[{}[\];(),.:]/;
},{}],19:[function(require,module,exports){

/**
 * Expose `php`
 */

module.exports = php;

/**
 * Add `php` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function php(highlight){
  highlight.language('php', php);
  highlight.language('PHP', php);
}

/**
 * Booleans
 */

php.boolean = /\b(true|false)\b/;

/**
 * Comments
 */

php.comment = /(?!\\{2})(\/\*[\w\W]*?\*\/|\/\/.*?$|#.*?$)/m;

/**
 * Classes
 */

php.class = /class +(\w+)/;
php.class.children = { keyword: /class/ };

/**
 * Keywords
 */

php.keyword = /\b(__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/;

/**
 * Numbers
 */

php.number = /\b[-+]?(0x[0-9a-fA-F]|0[0-7]+|0b[01]+|[1-9][0-9]*)\b/;

/**
 * String
 */

php.string = /(("|')(\\?.)*?\2)/;

/**
 * Functions
 */

php.function = /(\w+) *\(/;
php.function.children = { punctuation: /\(/ };

/**
 * Operators
 */

php.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

php.punctuation = /[{}[\];(),.]/;
},{}],20:[function(require,module,exports){

/**
 * Expose `python`
 */

module.exports = python;

/**
 * Add `python` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function python(highlight){
  highlight.language('python', python);
}

/**
 * Comments
 */

python.comment = /(?!\\{2})(#.*?$)/m;

/**
 * Strings
 */

python.string = /(("""|"|')(\\?.)*?\2)/;

/**
 * Booleans
 */

python.boolean = /\b(True|False)\b/;

/**
 * Keywords
 */

python.keyword = /\b(and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield)\b/;


/**
 * Classes
 */

python.class = /class +(\w+)/;
python.class.children = { keyword: /class/ };

/**
 * Functions
 */

python.function = /(\w+) *\(/;
python.function.children = { punctuation: /\(/ };
/**
 * Numbers
 */

python.number = /\b[-+]?(0x[a-fA-F0-9]+|0b[0-1]+|0[0-7]+|[1-9][0-9]*)\b/;

/**
 * Operators
 */

python.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%|\*\*?=)/;

/**
 * Punctuation
 */

python.punctuation = /[{}[\];(),.:]/;
},{}],21:[function(require,module,exports){

/**
 * Expose `ruby`
 */

module.exports = ruby;

/**
 * Add `ruby` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function ruby(highlight){
  highlight.language('ruby', ruby);
}

/**
 * Booleans
 */

ruby.boolean = /\b(true|false)\b/;

/**
 * Strings
 */

ruby.string = /(("|')(\\?.)*?\2)/;

/**
 * Comments
 */

ruby.comment = /(?!\\{2})(#.*?$)/m;

/**
 * Classes
 */

ruby.class = /class +(\w+)/;
ruby.class.children = { keyword: /class/ };

/**
 * Keywords
 */

ruby.keyword = /\b(alias|and|begin|break|case|catch|class|def|do|elsif|else|fail|ensure|for|end|if|in|module|next|not|or|raise|redo|rescue|retry|return|then|throw|super|unless|undef|until|when|while|yield)\b/;

/**
 * Numbers
 */

ruby.number = /\b[-+]?(0x[a-fA-F0-9]+|0b[0-1_]+|0[0-7]*|[1-9][0-9_eE.]*)\b/;

/**
 * Functions
 */

ruby.function = /(\w+) *\(/;
ruby.function.children = { punctuation: /\(/ };

/**
 * Operator
 */

ruby.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\|{1,2}|\?|\*|\/|\~|\^|\%)/;

/**
 * Punctuation
 */

ruby.punctuation = /[{}[\];(),.:]/;

},{}],22:[function(require,module,exports){

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to highlight XML code.
 *
 * @param {Highlight} highlight
 */

function plugin(highlight){
  highlight
    .language('xml', grammar)
    .language('html', grammar);
}

/**
 * Grammar.
 */

var grammar = {};

/**
 * Comments.
 */

grammar.comment = /<!--[\w\W]*?-->/m;

/**
 * Entities.
 */

grammar.entity = /&#?[\dA-Za-z]{1,8};/;

/**
 * Doctypes.
 */

grammar.doctype = /<!DOCTYPE.+?>/i;

/**
 * CDATA.
 */

grammar.cdata = /<!\[CDATA\[[\w\W]*?]]>/i;

/**
 * Prologs.
 */

grammar.prolog = /<\?.+?\?>/;

/**
 * Tags. Children declared separately to maintain order.
 */

var children = {
  string: /('|")[\w\W]*?\1/,
  punctuation: /(^<\/?|\/?>$|=)/,
  name: /^[\w:-]+/,
  attribute: /[\w:-]+/
};

grammar.tag = {
  pattern: /<\/?[\w:-]+\s*(\s+[\w:-]+(=(("|')[\w\W]*\4|[^\s'">=]+))?\s*)*\/?>/,
  children: children
};
},{}],23:[function(require,module,exports){

/**
 * Expose `yaml`
 */

module.exports = yaml;

/**
 * Add `yaml` as a language.
 *
 * @param {Highlight} highlight
 * @api public
 */

function yaml(highlight){
  highlight.language('yml', yaml);
  highlight.language('yaml', yaml);
}

/**
 * Boolean
 */

yaml.boolean = /\b(Yes|No)\b/;

/**
 * Numbers
 */

yaml.number = /\b(\d*\.\d+)\b/;

/**
 * Comments
 */

yaml.comment = /(#[^\n]*)/;

/**
 * Keywords
 */

yaml.keyword = /(\w+):/;
yaml.keyword.children = { punctuation: /:/ };

/**
 * Punctuation
 */

yaml.punctuation = /([:|>?])/;

/**
 * Strings
 */

yaml.string = /(("|')(\\?.)*?\2)/;

},{}],24:[function(require,module,exports){
module.exports = exports = require('./lib/sliced');

},{"./lib/sliced":25}],25:[function(require,module,exports){

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}


},{}],26:[function(require,module,exports){

var escape = require('escape-html');

/**
 * Expose `Highlight`.
 */

module.exports = Highlight;

/**
 * Initialize a new `Highlight` instance.
 */

function Highlight(){
  if (!(this instanceof Highlight)) return new Highlight();
  this.languages = {};
  this.prefix('Highlight-');
}

/**
 * Use a `plugin` function.
 *
 * @param {Function} plugin
 * @return {Highlight}
 */

Highlight.prototype.use = function(plugin){
  plugin(this);
  return this;
};

/**
 * Get or set the highlighted class `prefix`.
 *
 * @param {String} prefix
 * @return {Highlight or String}
 */

Highlight.prototype.prefix = function(prefix){
  if (!arguments.length) return this._prefix;
  this._prefix = prefix;
  return this;
}

/**
 * Define a new `language` with a `grammar`.
 *
 * @param {String} language
 * @param {Object} grammar
 * @return {Highlight}
 */

Highlight.prototype.language = function(language, grammar){
  this.languages[language] = grammar;
  return this;
};

/**
 * Highlight an HTML `string` of a given `language`.
 *
 * @param {String} string
 * @param {String} language
 * @return {String}
 */

Highlight.prototype.string = function(string, language){
  var ast = this.parse(string, language);
  var str = this.stringify(ast);
  return str;
};

/**
 * Highlight an `el`, with optional `language`.
 *
 * @param {Element or String} el
 * @param {String} language (optional)
 */

Highlight.prototype.element = function(el, language){
  if ('string' == typeof el) el = document.querySelector(el);
  var str = this.string(el.textContent, language || lang(el));
  el.innerHTML = str;
};

/**
 * Highlight an array of `els`, with optional `language`.
 *
 * @param {Array or String} els
 * @param {String} language (optional)
 */

Highlight.prototype.elements = function(els, language){
  if ('string' == typeof els) els = document.querySelectorAll(els);
  for (var i = 0, el; el = els[i]; i++) this.element(el, language);
};

/**
 * Highlight all elements in the DOM with language attributes.
 */

Highlight.prototype.all = function(){
  this.elements('[data-language]');
  this.elements('[class*="language-"]');
  this.elements('[class*="lang-"]');
};

/**
 * Parse a `string` with a given language's `grammar`, returning an AST.
 *
 * @param {String} string
 * @param {String or Object} grammar
 * @return {Array}
 */

Highlight.prototype.parse = function(string, grammar){
  if ('string' == typeof grammar) {
    var lang = grammar;
    grammar = this.languages[lang];
    if (!grammar) throw new Error('unknown language "' + lang + '"');
  }

  if (!grammar) throw new Error('must provide a grammar');
  if (!string) return [];
  var ret = [string];

  for (var key in grammar) {
    if (!grammar.hasOwnProperty(key)) continue;

    var rule = grammar[key];
    var regexp = rule.pattern || rule;

    for (var i = 0; i < ret.length; i++) {
      var str = ret[i];
      if ('object' == typeof str) continue;
      var m = regexp.exec(str);
      if (!m) continue;

      var contents = m[0];
      var before = str.slice(0, m.index);
      var after = str.slice(m.index + contents.length);
      var args = [i, 1];
      var token = {
        type: key,
        value: rule.children ? this.parse(contents, rule.children) : contents
      };

      if (before) args.push(before);
      args.push(token);
      if (after) args.push(after);
      ret.splice.apply(ret, args);
    }
  }

  return ret;
}

/**
 * Stringify a given `ast`.
 *
 * @param {Array} ast
 * @return {String}
 */

Highlight.prototype.stringify = function(ast){
  var prefix = this.prefix();
  var self = this;

  return ast.map(function(t){
    if ('string' == typeof t) return escape(t);
    var type = t.type;
    var value = 'object' == typeof t.value
      ? self.stringify(t.value)
      : escape(t.value);
    return '<span class="' + prefix + type + '">' + value + '</span>';
  }).join('');
};

/**
 * Language class matcher.
 */

var matcher = /\blang(?:uage)?-([\w-.]+)\b/i;

/**
 * Get the code language for a given `el`. First look for a `data-language`
 * attribute, then a `language-*` class, then search up the DOM tree for them.
 *
 * @param {Element} el
 * @return {String}
 */

function lang(el){
  if (!el) return;
  var m;
  if (el.hasAttribute('data-language')) return el.getAttribute('data-language');
  if (m = matcher.exec(el.className)) return m[1];
  return language(el.parentNode);
}

},{"escape-html":27}],27:[function(require,module,exports){
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

'use strict';

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

},{}],28:[function(require,module,exports){
/**
 * Module dependencies.
 */

var slice = require('sliced')
var flatten = require('array-flatten')

/**
 * This function lets us create virtual nodes using a simple
 * syntax. It is compatible with JSX transforms so you can use
 * JSX to write nodes that will compile to this function.
 *
 * let node = element('div', { id: 'foo' }, [
 *   element('a', { href: 'http://google.com' }, 'Google')
 * ])
 *
 * You can leave out the attributes or the children if either
 * of them aren't needed and it will figure out what you're
 * trying to do.
 */

module.exports = element

/**
 * Create virtual trees of components.
 *
 * This creates the nicer API for the user.
 * It translates that friendly API into an actual tree of nodes.
 *
 * @param {*} type
 * @param {Object} attributes
 * @param {Array} children
 * @return {Object}
 * @api public
 */

function element (type, attributes, children) {
  // Default to div with no args
  if (!type) {
    throw new TypeError('element() needs a type.')
  }

  // Skipped adding attributes and we're passing
  // in children instead.
  if (arguments.length === 2 && (typeof attributes === 'string' || Array.isArray(attributes))) {
    children = [ attributes ]
    attributes = {}
  }

  // Account for JSX putting the children as multiple arguments.
  // This is essentially just the ES6 rest param
  if (arguments.length > 2) {
    children = slice(arguments, 2)
  }

  children = children || []
  attributes = attributes || {}

  // Flatten nested child arrays. This is how JSX compiles some nodes.
  children = flatten(children, 2)

  // Filter out any `undefined` elements
  children = children.filter(function (i) { return typeof i !== 'undefined' })

  // if you pass in a function, it's a `Component` constructor.
  // otherwise it's an element.
  return {
    type: type,
    children: children,
    attributes: attributes
  }
}

},{"array-flatten":11,"sliced":24}]},{},[1]);
