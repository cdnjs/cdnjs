/*
 * Copyright (C) 2007-2012 Diego Perini
 * All rights reserved.
 *
 * nwmatcher-base.js - A fast CSS selector engine and matcher
 *
 * Author: Diego Perini <diego.perini at gmail com>
 * Version: 1.3.0
 * Created: 20070722
 * Release: 20121203
 *
 * License:
 *  http://javascript.nwbox.com/NWMatcher/MIT-LICENSE
 * Download:
 *  http://javascript.nwbox.com/NWMatcher/nwmatcher.js
 */

(function(global, factory) {

  if (typeof module === 'object' && typeof exports === 'object') {
    module.exports = function (browserGlobal) {
      var exports = { };
      factory(browserGlobal, exports);
      return exports;
    };
  } else {
    if (!global.NW) {
      global.NW = { };
    }
    if (!global.NW.Dom) {
      global.NW.Dom = { };
    }
    factory(global, global.NW.Dom);
  }

})(this, function(global, exports) {

  var version = 'nwmatcher-1.3.0',

  Dom = exports,

  doc = global.document,
  root = doc.documentElement,

  slice = [ ].slice,

  isSingleMatch,
  isSingleSelect,

  lastSlice,
  lastContext,
  lastPosition,

  lastMatcher,
  lastSelector,

  lastPartsMatch,
  lastPartsSelect,

  prefixes = '[#.:]?',
  operators = '([~*^$|!]?={1})',
  whitespace = '[\\x20\\t\\n\\r\\f]*',
  combinators = '[\\x20]|[>+~][^>+~]',
  pseudoparms = '(?:[-+]?\\d*n)?[-+]?\\d*',

  quotedvalue = '"[^"]*"' + "|'[^']*'",
  skipgroup = '\\[.*\\]|\\(.*\\)|\\{.*\\}',

  encoding = '(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)',
  identifier = '(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+',

  attrcheck = '(' + quotedvalue + '|' + identifier + ')',
  attributes = whitespace + '(' + encoding + '+:?' + encoding + '+)' +
    whitespace + '(?:' + operators + whitespace + attrcheck + ')?' + whitespace,

  attrmatcher = attributes.replace(attrcheck, '([\\x22\\x27]*)((?:\\\\?.)*?)\\3'),

  pseudoclass = '((?:' +
    pseudoparms + '|' + quotedvalue + '|' +
    prefixes + '|' + encoding + '+|' +
    '\\[' + attributes + '\\]|' +
    '\\(.+\\)|' + whitespace + '|' +
    ',)+)',

  extensions = '.+',

  standardValidator =
    '(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])' +
    '(' +
    '\\*' +
    '|(?:' + prefixes + identifier + ')' +
    '|' + combinators +
    '|\\[' + attributes + '\\]' +
    '|\\(' + pseudoclass + '\\)' +
    '|\\{' + extensions + '\\}' +
    '|(?:,|' + whitespace + ')' +
    ')+',

  extendedValidator = standardValidator.replace(pseudoclass, '.*'),

  reValidator = RegExp(standardValidator, 'g'),

  reTrimSpaces = RegExp('^' +
    whitespace + '|' + whitespace + '$', 'g'),

  reSplitGroup = RegExp('(' +
    '[^,\\\\()[\\]]+' +
    '|\\[[^[\\]]*\\]|\\[.*\\]' +
    '|\\([^()]+\\)|\\(.*\\)' +
    '|\\{[^{}]+\\}|\\{.*\\}' +
    '|\\\\.' +
    ')+', 'g'),

  reSplitToken = RegExp('(' +
    '\\[' + attributes + '\\]|' +
    '\\(' + pseudoclass + '\\)|' +
    '[^\\x20>+~]|\\\\.)+', 'g'),

  reWhiteSpace = /[\x20\t\n\r\f]+/g,

  reOptimizeSelector = RegExp(identifier + '|^$'),

  ATTR_URIDATA = {
    action: 2, cite: 2, codebase: 2, data: 2, href: 2,
    longdesc: 2, lowsrc: 2, src: 2, usemap: 2
  },

  Selectors = { },

  Operators = {
     '=': "n=='%m'",
    '^=': "n.indexOf('%m')==0",
    '*=': "n.indexOf('%m')>-1",
    '|=': "(n+'-').indexOf('%m-')==0",
    '~=': "(' '+n+' ').indexOf(' %m ')>-1",
    '$=': "n.substr(n.length-'%m'.length)=='%m'"
  },

  Optimize = {
    ID: RegExp('^\\*?#(' + encoding + '+)|' + skipgroup),
    TAG: RegExp('^(' + encoding + '+)|' + skipgroup),
    CLASS: RegExp('^\\*?\\.(' + encoding + '+$)|' + skipgroup)
  },

  Patterns = {
    universal: /^\*(.*)/,
    id: RegExp('^#(' + encoding + '+)(.*)'),
    tagName: RegExp('^(' + encoding + '+)(.*)'),
    className: RegExp('^\\.(' + encoding + '+)(.*)'),
    attribute: RegExp('^\\[' + attrmatcher + '\\](.*)'),
    children: /^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,
    adjacent: /^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,
    relative: /^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,
    ancestor: /^[\x20\t\n\r\f]+(.*)/
  },

  QUIRKS_MODE,
  XML_DOCUMENT,

  GEBTN = 'getElementsByTagName' in doc,
  GEBCN = 'getElementsByClassName' in doc,

  IE_LT_9 = typeof doc.addEventListener != 'function',

  INSENSITIVE_MAP = {
    'href': 1, 'lang': 1, 'src': 1, 'style': 1, 'title': 1,
    'type': 1, 'xmlns': 1, 'xml:lang': 1, 'xml:space': 1
  },

  REFLECTED = { 'value': 1, 'checked': 1, 'selected': 1 },

  TO_UPPER_CASE = IE_LT_9 ? '.toUpperCase()' : '',

  ACCEPT_NODE = 'r[r.length]=c[k];if(f&&false===f(c[k]))break main;else continue main;',
  REJECT_NODE = IE_LT_9 ? 'if(e.nodeName<"A")continue;' : '',

  Config = {
    CACHING: false,
    SIMPLENOT: true,
    USE_HTML5: true,
    VERBOSITY: true
  },

  configure =
    function(option) {
      if (typeof option == 'string') { return Config[option]; }
      if (typeof option != 'object') { return false; }
      for (var i in option) {
        Config[i] = !!option[i];
        if (i == 'SIMPLENOT') {
          matchContexts = { };
          matchResolvers = { };
          selectContexts = { };
          selectResolvers = { };
        }
      }
      reValidator = RegExp(Config.SIMPLENOT ?
        standardValidator : extendedValidator, 'g');
      return true;
    },

  concatCall =
    function(data, elements, callback) {
      var i = -1, element;
      while ((element = elements[++i])) {
        if (false === callback(data[data.length] = element)) { break; }
      }
      return data;
    },

  emit =
    function(message) {
      if (Config.VERBOSITY) { throw Error(message); }
      if (global.console && global.console.log) {
        global.console.log(message);
      }
    },

  switchContext =
    function(from, force) {
      var oldDoc = doc;
      lastContext = from;
      doc = from.ownerDocument || from;
      if (force || oldDoc !== doc) {
        root = doc.documentElement;
        XML_DOCUMENT = doc.createElement('DiV').nodeName == 'DiV';
        QUIRKS_MODE = !XML_DOCUMENT &&
          typeof doc.compatMode == 'string' ?
          doc.compatMode.indexOf('CSS') < 0 :
          (function() {
            var style = document.createElement('div').style;
            return style && (style.width = 1) && style.width == '1px';
          })();

        Config.CACHING && Dom.setCache(true, doc);
      }
    },

  byIdRaw =
    function(id, elements) {
      var i = 0, element = null;
      while ((element = elements[i])) {
        if (element.getAttribute('id') == id) {
          break;
        }
        ++i;
      }
      return element;
    },

  _byId = !('fileSize' in doc) ?
    function(id, from) {
      id = id.replace(/\\([^\\]{1})/g, '$1');
      return from.getElementById && from.getElementById(id) ||
        byIdRaw(id, from.getElementsByTagName('*'));
    } :
    function(id, from) {
      var element = null;
      id = id.replace(/\\([^\\]{1})/g, '$1');
      if (XML_DOCUMENT || from.nodeType != 9) {
        return byIdRaw(id, from.getElementsByTagName('*'));
      }
      if ((element = from.getElementById(id)) &&
        element.name == id && from.getElementsByName) {
        return byIdRaw(id, from.getElementsByName(id));
      }
      return element;
    },

  byId =
    function(id, from) {
      switchContext(from || (from = doc));
      return _byId(id, from);
    },

  getAttr =
    function(node, attribute) {
      return (
        ATTR_URIDATA[attribute] ? node.getAttribute(attribute, 2) || '' :
          ((node = node.attributes[attribute]) && node.value) || '');
    },

  compile =
    function(selector, source, mode) {

      var parts = typeof selector == 'string' ? selector.match(reSplitGroup) : selector;

      typeof source == 'string' || (source = '');

      if (parts.length == 1) {
        source += compileSelector(parts[0], mode ? ACCEPT_NODE : 'f&&f(k);return true;', mode);
      } else {
        var i = -1, seen = { }, token;
        while ((token = parts[++i])) {
          token = token.replace(reTrimSpaces, '');
          if (!seen[token] && (seen[token] = true)) {
            source += compileSelector(token, mode ? ACCEPT_NODE : 'f&&f(k);return true;', mode);
          }
        }
      }

      if (mode)
        return Function('c,s,r,d,h,g,f,v',
          'var N,n,x=0,k=-1,e;main:while((e=c[++k])){' + source + '}return r;');
      else
        return Function('e,s,r,d,h,g,f,v',
          'var N,n,x=0,k=e;' + source + 'return false;');
    },

  FILTER =
    'var z=v[@]||(v[@]=[]),l=z.length-1;' +
    'while(l>=0&&z[l]!==e)--l;' +
    'if(l!==-1){break;}' +
    'z[z.length]=e;',

  compileSelector =
    function(selector, source, mode) {

      var k = 0, expr, match, name, result, status, test, type;

      while (selector) {

        k++;

        if ((match = selector.match(Patterns.universal))) {
          expr = '';
        }

        else if ((match = selector.match(Patterns.id))) {
          source = 'if(' + (XML_DOCUMENT ?
            's.getAttr(e,"id")' :
            '(e.submit?s.getAttr(e,"id"):e.id)') +
            '=="' + match[1] + '"' +
            '){' + source + '}';
        }

        else if ((match = selector.match(Patterns.tagName))) {
          source = 'if(e.nodeName' + (XML_DOCUMENT ?
            '=="' + match[1] + '"' : TO_UPPER_CASE +
            '=="' + match[1].toUpperCase() + '"') +
            '){' + source + '}';
        }

        else if ((match = selector.match(Patterns.className))) {
          source = 'if((n=' + (XML_DOCUMENT ?
            'e.getAttribute("class")' : 'e.className') +
            ')&&n.length&&(" "+' + (QUIRKS_MODE ? 'n.toLowerCase()' : 'n') +
            '.replace(' + reWhiteSpace + '," ")+" ").indexOf(" ' +
            (QUIRKS_MODE ? match[1].toLowerCase() : match[1]) + ' ")>-1' +
            '){' + source + '}';
        }

        else if ((match = selector.match(Patterns.attribute))) {
          if (match[2] && !Operators[match[2]]) {
            emit('Unsupported operator in attribute selectors "' + selector + '"');
            return '';
          }
          name = match[1].toLowerCase();
          if (match[2] && match[4] && (type = Operators[match[2]])) {
            test = name in INSENSITIVE_MAP;
            match[4] = match[4].replace(/(\x22|\x27)/g, '\\$1');
            match[4] = match[4].replace(/\\([0-9a-f]{2,2})/, '\\x$1');
            type = type.replace(/\%m/g,  match[4].toLowerCase());
            expr = 'n=s.getAttr(e,"' + name + '").toLowerCase();';
          } else if (!match[2]) {
            if (REFLECTED[name]) {
              test = 'default' + name.charAt(0).toUpperCase() + name.slice(1);
              expr = 'n=e["' + test + '"];';
              type = 'n';
            } else {
              expr = 'n=e.attributes["' + name + '"];';
              type = IE_LT_9 ? 'n&&n.specified' : 'n';
            }
          } else if (match[2] == '!=' || match[2] == '=') {
            expr = 'n=e.attributes["' + name + '"];';
            match[4] = match[4].replace(/(\x22|\x27)/g, '\\$1');
            type = 'n&&n.value' + match[2] + '="' + match[4] + '"';
          } else {
            expr = '';
            type = 'false';
          }
          source = expr + 'if(' + type + '){' + source + '}';
        }

        else if ((match = selector.match(Patterns.adjacent))) {
          source = (mode ? '' : FILTER.replace(/@/g, k)) + source;
          source = 'var N' + k + '=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){' + source + 'break;}}e=N' + k + ';';
        }

        else if ((match = selector.match(Patterns.relative))) {
          source = (mode ? '' : FILTER.replace(/@/g, k)) + source;
          source = 'var N' + k + '=e;e=e.parentNode.firstChild;while(e&&e!==N' + k + '){if(e.nodeName>"@"){' + source + '}e=e.nextSibling;}e=N' + k + ';';
        }

        else if ((match = selector.match(Patterns.children))) {
          source = (mode ? '' : FILTER.replace(/@/g, k)) + source;
          source = 'var N' + k + '=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){' + source + 'break;}e=N' + k + ';';
        }

        else if ((match = selector.match(Patterns.ancestor))) {
          source = (mode ? '' : FILTER.replace(/@/g, k)) + source;
          source = 'var N' + k + '=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){' + source + '}e=N' + k + ';';
        }

        else {

          expr = false;
          status = false;
          for (expr in Selectors) {
            if ((match = selector.match(Selectors[expr].Expression)) && match[1]) {
              result = Selectors[expr].Callback(match, source);
              source = result.source;
              status = result.status;
              if (status) { break; }
            }
          }

          if (!status) {
            emit('Unknown pseudo-class selector "' + selector + '"');
            return '';
          }

          if (!expr) {
            emit('Unknown token in selector "' + selector + '"');
            return '';
          }

        }

        if (!match) {
          emit('Invalid syntax in selector "' + selector + '"');
          return '';
        }

        selector = match && match[match.length - 1];
      }

      return source;
    },

  match =
    function(element, selector, from, callback) {

      var parts;

      if (!(element && element.nodeName > '@')) {
        emit('Invalid element argument');
        return false;
      } else if (!selector || typeof selector != 'string') {
        emit('Invalid selector argument');
        return false;
      } else if (lastContext !== from) {
        switchContext(from || (from = element.ownerDocument));
      }

      selector = selector.replace(reTrimSpaces, '');

      Config.SHORTCUTS && (selector = NW.Dom.shortcuts(selector, element, from));

      if (lastMatcher != selector) {
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleMatch = (parts = selector.match(reSplitGroup)).length < 2;
          lastMatcher = selector;
          lastPartsMatch = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return false;
        }
      } else parts = lastPartsMatch;

      if (!matchResolvers[selector] || matchContexts[selector] !== from) {
        matchResolvers[selector] = compile(isSingleMatch ? [selector] : parts, '', false);
        matchContexts[selector] = from;
      }

      return matchResolvers[selector](element, Snapshot, [ ], doc, root, from, callback, { });
    },

  first =
    function(selector, from) {
      return select(selector, from, function() { return false; })[0] || null;
    },

  select =
    function(selector, from, callback) {

      var i, changed, element, elements, parts, token, original = selector;

      if (arguments.length === 0) {
        emit('Not enough arguments');
        return [ ];
      } else if (typeof selector != 'string') {
        return [ ];
      } else if (!(/[>+~*\w\u00a1-\uffff]/.test(selector))) {
        emit('Invalid or illegal selector string');
        return [ ];
      } else if (from && !(/1|9|11/).test(from.nodeType)) {
        emit('Invalid or illegal context element');
        return [ ];
      } else if (lastContext !== from) {
        switchContext(from || (from = doc));
      }

      if (Config.CACHING && (elements = Dom.loadResults(original, from, doc, root))) {
        return callback ? concatCall([ ], elements, callback) : elements;
      }

      selector = selector.replace(reTrimSpaces, '');

      Config.SHORTCUTS && (selector = NW.Dom.shortcuts(selector, from));

      if ((changed = lastSelector != selector)) {
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleSelect = (parts = selector.match(reSplitGroup)).length < 2;
          lastSelector = selector;
          lastPartsSelect = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return [ ];
        }
      } else parts = lastPartsSelect;

      if (from.nodeType == 11) {

        elements = from.childNodes;

      } else if (isSingleSelect) {

        if (changed) {
          parts = selector.match(reSplitToken);
          token = parts[parts.length - 1];
          lastSlice = token.split(':not')[0];
          lastPosition = selector.length - token.length;
        }

        if ((parts = lastSlice.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, from))) {
            if (match(element, selector)) {
              callback && callback(element);
              elements = [ element ];
            } else elements = [ ];
          }
        }

        else if ((parts = selector.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, doc))) {
            if ('#' + token == selector) {
              callback && callback(element);
              elements = [ element ];
            } else if (/[>+~]/.test(selector)) {
              from = element.parentNode;
            } else {
              from = element;
            }
          } else elements = [ ];
        }

        if (elements) {
          Config.CACHING && Dom.saveResults(original, from, doc, elements);
          return elements;
        }

        if (!XML_DOCUMENT && GEBTN && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = from.getElementsByTagName(token)).length === 0) return [ ];
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

        else if (!XML_DOCUMENT && GEBCN && (parts = lastSlice.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = from.getElementsByClassName(token.replace(/\\([^\\]{1})/g, '$1'))).length === 0) return [ ];
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token,
              reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1)) ? '' : '*');
        }

      }

      if (!elements) {
        if (IE_LT_9) {
          elements = /^(?:applet|object)$/i.test(from.nodeName) ?
            from.childNodes : from.all;
        } else {
          elements = from.getElementsByTagName('*');
        }
      }

      if (!selectResolvers[selector] || selectContexts[selector] !== from) {
        selectResolvers[selector] = compile(isSingleSelect ? [selector] : parts, REJECT_NODE, true);
        selectContexts[selector] = from;
      }

      elements = selectResolvers[selector](elements, Snapshot, [ ], doc, root, from, callback, { });

      Config.CACHING && Dom.saveResults(original, from, doc, elements);

      return elements;
    },

  matchContexts = { },
  matchResolvers = { },

  selectContexts = { },
  selectResolvers = { },

  Snapshot = {
    byId: _byId,
    match: match,
    select: select,
    getAttr: getAttr
  };

  Tokens = {
    prefixes: prefixes,
    encoding: encoding,
    operators: operators,
    whitespace: whitespace,
    identifier: identifier,
    attributes: attributes,
    combinators: combinators,
    pseudoclass: pseudoclass,
    pseudoparms: pseudoparms,
    quotedvalue: quotedvalue
  };

  Dom.ACCEPT_NODE = ACCEPT_NODE;

  Dom.emit = emit;

  Dom.byId = byId;
  Dom.match = match;
  Dom.first = first;
  Dom.select = select;
  Dom.compile = compile;
  Dom.configure = configure;

  Dom.Config = Config;
  Dom.Operators = Operators;
  Dom.Selectors = Selectors;
  Dom.Snapshot = Snapshot;
  Dom.Tokens = Tokens;

  Dom.setCache = function() { return; };
  Dom.loadResults = function() { return; };
  Dom.saveResults = function() { return; };

  Dom.shortcuts = function(x) { return x; };

  Dom.registerOperator =
    function(symbol, resolver) {
      Operators[symbol] || (Operators[symbol] = resolver);
    };

  Dom.registerSelector =
    function(name, rexp, func) {
      Selectors[name] || (Selectors[name] = {
        Expression: rexp,
        Callback: func
      });
    };

  switchContext(doc, true);

});
