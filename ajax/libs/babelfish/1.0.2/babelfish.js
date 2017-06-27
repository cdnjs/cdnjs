/* babelfish 1.0.2 nodeca/babelfish */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Babelfish=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = _dereq_('./lib/babelfish');

},{"./lib/babelfish":2}],2:[function(_dereq_,module,exports){
/**
 *  class BabelFish
 *
 *  Internalization and localization library that makes i18n and l10n fun again.
 *
 *  ##### Example
 *
 *  ```javascript
 *  var BabelFish = require('babelfish'),
 *      i18n = new BabelFish();
 *  ```
 *
 *  or
 *
 *  ```javascript
 *  var babelfish = require('babelfish'),
 *      i18n = babelfish();
 *  ```
 **/


'use strict';


var parser = _dereq_('./babelfish/parser');
var pluralizer = _dereq_('./babelfish/pluralizer');

function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj)   { return _class(obj) === '[object String]'; }
function isNumber(obj)   { return !isNaN(obj) && isFinite(obj); }
function isBoolean(obj)  { return obj === true || obj === false; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }
function isObject(obj)   { return _class(obj) === '[object Object]'; }

var isArray = Array.isArray || function _isArray(obj) {
  return _class(obj) === '[object Array]';
};


////////////////////////////////////////////////////////////////////////////////
// The following two utilities (forEach and extend) are modified from Underscore
//
// http://underscorejs.org
//
// (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//
// Underscore may be freely distributed under the MIT license
////////////////////////////////////////////////////////////////////////////////


var nativeForEach = Array.prototype.forEach;


// The cornerstone, an `each` implementation, aka `forEach`.
// Handles objects with the built-in `forEach`, arrays, and raw objects.
// Delegates to **ECMAScript 5**'s native `forEach` if available.
function forEach(obj, iterator, context) {
  if (obj === null) {
    return;
  }
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i += 1) {
      iterator.call(context, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        iterator.call(context, obj[key], key, obj);
      }
    }
  }
}


var formatRegExp = /%[sdj%]/g;

function format(f) {
  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') { return '%'; }
    if (i >= len) { return x; }
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  return str;
}


// helpers
////////////////////////////////////////////////////////////////////////////////


// Last resort locale, that exists for sure
var GENERIC_LOCALE = 'en';


// flatten(obj) -> Object
//
// Flattens object into one-level dictionary.
//
// ##### Example
//
//     var obj = {
//       abc: { def: 'foo' },
//       hij: 'bar'
//     };
//
//     flatten(obj);
//     // -> { 'abc.def': 'foo', 'hij': 'bar' };
//
function flatten(obj) {
  var params = {};

  forEach(obj || {}, function (val, key) {
    if (val && 'object' === typeof val) {
      forEach(flatten(val), function (sub_val, sub_key) {
        params[key + '.' + sub_key] = sub_val;
      });
      return;
    }

    params[key] = val;
  });

  return params;
}


var keySeparator = '#@$';

function makePhraseKey(locale, phrase) {
  return locale + keySeparator + phrase;
}


function searchPhraseKey(self, locale, phrase) {
  var key = makePhraseKey(locale, phrase);
  var storage = self._storage;

  // direct search first
  if (storage.hasOwnProperty(key)) { return key; }

  // don't try follbacks for default locale
  if (locale === self._defaultLocale) { return null; }

  // search via fallback map cache
  var fb_cache = self._fallbacks_cache;
  if (fb_cache.hasOwnProperty(key)) { return fb_cache[key]; }

  // scan fallbacks & cache result
  var fb = self._fallbacks[locale] || [self._defaultLocale];
  var fb_key;

  for (var i=0, l=fb.length; i<l; i++) {
    fb_key = makePhraseKey(fb[i], phrase);
    if (storage.hasOwnProperty(fb_key)) {
      // found - update cache and return result
      fb_cache[key] = fb_key;
      return fb_cache[key];
    }
  }

  // mark fb_cache entry empty for fast lookup on next request
  fb_cache[key] = null;
  return null;
}


// public api (module)
////////////////////////////////////////////////////////////////////////////////


/**
 *  new BabelFish([defaultLocale = 'en'])
 *
 *  Initiates new instance of BabelFish.
 *
 *  __Note!__ you can omit `new` for convenience, direct call will return
 * new instance too.
 **/
function BabelFish(defaultLocale) {
  if (!(this instanceof BabelFish)) { return new BabelFish(defaultLocale); }

  this._defaultLocale = defaultLocale ? String(defaultLocale) : GENERIC_LOCALE;

  // hash of locale => [ fallback1, fallback2, ... ] pairs
  this._fallbacks = {};

  // fallback cache for each phrase
  //
  // {
  //   locale_key: fallback_key
  // }
  //
  // fallback_key can be null if search failed
  //
  this._fallbacks_cache = {};

  // storage of compiled translations
  //
  // {
  //   locale + @#$ + phrase_key: {
  //     locale:      locale name - can be different for fallbacks
  //     translation: original translation phrase or data variable/object
  //     raw:         true/false - does translation contain plain data or
  //                  string to compile
  //     compiled:    copiled translation fn or plain string
  //   }
  //   ...
  // }
  //
  this._storage = {};

  // cache for complex plural parts (with params)
  //
  // {
  //   language: new BabelFish(language)
  // }
  //
  this._plurals_cache = {};
}


// public api (instance)
////////////////////////////////////////////////////////////////////////////////


/**
 *  BabelFish#addPhrase(locale, phrase, translation [, flattenLevel]) -> BabelFish
 *  - locale (String): Locale of translation
 *  - phrase (String|Null): Phrase ID, e.g. `apps.forum`
 *  - translation (String|Object|Array|Number|Boolean): Translation or an object
 *    with nested phrases, or a pure object.
 *  - flattenLevel (Number|Boolean): Optional, 0..infinity. `Infinity` by default.
 *    Define "flatten" deepness for loaded object.  You can also use
 *    `true` as `0` or `false` as `Infinity`.
 *
 *
 *  ##### Flatten & using JS objects
 *
 *  By default all nested properties are normalized to strings like "foo.bar.baz",
 *  and if value is string, it will be compiled with babelfish notation.
 *  If deepness is above `flattenLevel` OR value is not object and not string,
 *  it will be used "as is". Note, only JSON stringifiable data should be used.
 *
 *  In short: you can safely pass `Array`, `Number` or `Boolean`. For objects you
 *  should define flatten level or disable it compleetely, to work with pure data.
 *
 *  Pure objects can be useful to prepare bulk data for external libraries, like
 *  calendars, time/date generators and so on.
 *
 *  ##### Example
 *
 *  ```javascript
 *  i18n.addPhrase('ru-RU',
 *    'apps.forums.replies_count',
 *    '#{count} %{ответ|ответа|ответов}:count в теме');
 *
 *  // equals to:
 *  i18n.addPhrase('ru-RU',
 *    'apps.forums',
 *    { replies_count: '#{count} %{ответ|ответа|ответов}:count в теме' });
 *  ```
 **/
BabelFish.prototype.addPhrase = function _addPhrase(locale, phrase, translation, flattenLevel) {
  var self = this, fl;

  // Calculate flatten level. Infinity by default
  if (isBoolean(flattenLevel)) {
    fl = flattenLevel ? Infinity : 0;
  } else if (isNumber(flattenLevel)) {
    fl = Math.floor(flattenLevel);
    fl = (fl < 0) ? 0 : fl;
  } else {
    fl = Infinity;
  }

  if (isObject(translation) && (fl > 0)) {
    // recursive object walk, until flattenLevel allows
    forEach(translation, function (val, key) {
      self.addPhrase(locale, phrase + '.' + key, val, fl-1);
    });
    return;
  }

  if (isString(translation)) {
    this._storage[makePhraseKey(locale, phrase)] = {
      translation: translation,
      locale: locale,
      raw: false
    };
  } else if (isArray(translation) ||
             isNumber(translation) ||
             isBoolean(translation) ||
             (fl === 0 && isObject(translation))) {
    // Pure objects are stored without compilation
    // Limit allowed types.
    this._storage[makePhraseKey(locale, phrase)] = {
      translation: translation,
      locale: locale,
      raw: true
    };
  } else {
    // `Regex`, `Date`, `Uint8Array` and others types will
    //  fuckup `stringify()`. Don't allow here.
    // `undefined` also means wrong param in real life.
    // `null` can be allowed when examples from real life available.
    throw new TypeError('Invalid translation - [String|Object|Array|Number|Boolean] expected.');
  }

  self._fallbacks_cache = {};
};


/**
 *  BabelFish#setFallback(locale, fallbacks) -> BabelFish
 *  - locale (String): Target locale
 *  - fallbacks (Array): List of fallback locales
 *
 *  Set fallbacks for given locale.
 *
 *  When `locale` has no translation for the phrase, `fallbacks[0]` will be
 *  tried, if translation still not found, then `fallbacks[1]` will be tried
 *  and so on. If none of fallbacks have translation,
 *  default locale will be tried as last resort.
 *
 *  ##### Errors
 *
 *  - throws `Error`, when `locale` equals default locale
 *
 *  ##### Example
 *
 *  ```javascript
 *  i18n.setFallback('ua-UK', ['ua', 'ru']);
 *  ```
 **/
BabelFish.prototype.setFallback = function _setFallback(locale, fallbacks) {
  var def = this._defaultLocale;

  if (def === locale) {
    throw new Error('Default locale can\'t have fallbacks');
  }

  var fb = isArray(fallbacks) ? fallbacks.slice() : [fallbacks];
  if (fb[fb.length-1] !== def) { fb.push(def); }

  this._fallbacks[locale] = fb;
  this._fallbacks_cache = {};
};


// Compiles given string into function. Used to compile phrases,
// which contains `plurals`, `variables`, etc.
function compile(self, str, locale) {
  var nodes, buf, key, strict_exec, forms_exec, plurals_cache;

  // Quick check to avoid parse in most cases :)
  if (str.indexOf('#{') === -1 &&
      str.indexOf('((') === -1 &&
      str.indexOf('\\') === -1) {
    return str;
  }

  nodes = parser.parse(str);

  if (1 === nodes.length && 'literal' === nodes[0].type) {
    return nodes[0].text;
  }

  // init cache instance for plural parts, if not exists yet.
  if (!self._plurals_cache[locale]) {
    self._plurals_cache[locale] = new BabelFish(locale);
  }
  plurals_cache = self._plurals_cache[locale];

  buf = [];
  buf.push(['var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;']);
  buf.push('params = flatten(params);');

  forEach(nodes, function (node) {
    if ('literal' === node.type) {
      buf.push(format('str += %j;', node.text));
      return;
    }

    if ('variable' === node.type) {
      key = node.anchor;
      buf.push(format(
        'str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];',
        key, key, key
      ));
      return;
    }

    if ('plural' === node.type) {
      key = node.anchor;
      // check if plural parts are plain strings or executable,
      // and add executable to "cache" instance of babelfish
      // plural part text will be used as translation key
      strict_exec = {};
      forEach(node.strict, function (text, key) {
        if (text === '') {
          strict_exec[key] = false;
          return;
        }
        var parsed = parser.parse(text);
        if (1 === parsed.length && 'literal' === parsed[0].type) {
          strict_exec[key] = false;
          // patch with unescaped value for direct extract
          node.strict[key] = parsed[0].text;
          return;
        }

        strict_exec[key] = true;
        if (!plurals_cache.hasPhrase(locale, text, true)) {
          plurals_cache.addPhrase(locale, text, text);
        }
      });

      forms_exec = {};
      forEach(node.forms, function (text, idx) {
        if (text === '') {
          forms_exec[''] = false;
          return;
        }
        var parsed = parser.parse(text), unescaped;
        if (1 === parsed.length && 'literal' === parsed[0].type) {
          // patch with unescaped value for direct extract
          unescaped = parsed[0].text;
          node.forms[idx] = unescaped;
          forms_exec[unescaped] = false;
          return;
        }

        forms_exec[text] = true;
        if (!plurals_cache.hasPhrase(locale, text, true)) {
          plurals_cache.addPhrase(locale, text, text);
        }
      });

      buf.push(format('loc = %j;', locale));
      buf.push(format('loc_plzr = %j;', locale.split(/[-_]/)[0]));
      buf.push(format('anchor = params[%j];', key));
      buf.push(format('cache = this._plurals_cache[loc];'));
      buf.push(format('strict = %j;', node.strict));
      buf.push(format('strict_exec = %j;', strict_exec));
      buf.push(format('forms = %j;', node.forms));
      buf.push(format('forms_exec = %j;', forms_exec));
      buf.push(       'if (+(anchor) != anchor) {');
      buf.push(format('  str += "[invalid plurals amount: %s(" + anchor + ")]";', key));
      buf.push(       '} else {');
      buf.push(       '  if (strict[anchor] !== undefined) {');
      buf.push(       '    plrl = strict[anchor];');
      buf.push(       '    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;');
      buf.push(       '  } else {');
      buf.push(       '    plrl = pluralizer(loc_plzr, +anchor, forms);');
      buf.push(       '    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;');
      buf.push(       '  }');
      buf.push(       '}');
      return;
    }

    // should never happen
    throw new Error('Unknown node type');
  });

  buf.push('return str;');

  /*jslint evil:true*/
  return new Function('params', 'flatten', 'pluralizer', buf.join('\n'));
}


/**
 *  BabelFish#translate(locale, phrase[, params]) -> String
 *  - locale (String): Locale of translation
 *  - phrase (String): Phrase ID, e.g. `app.forums.replies_count`
 *  - params (Object|Number|String): Params for translation. `Number` & `String`
 *    will be  coerced to `{ count: X, value: X }`
 *
 *  ##### Example
 *
 *  ```javascript
 *  i18n.addPhrase('ru-RU',
 *     'apps.forums.replies_count',
 *     '#{count} ((ответ|ответа|ответов)) в теме');
 *
 *  // ...
 *
 *  i18n.translate('ru-RU', 'app.forums.replies_count', { count: 1 });
 *  i18n.translate('ru-RU', 'app.forums.replies_count', 1});
 *  // -> '1 ответ'
 *
 *  i18n.translate('ru-RU', 'app.forums.replies_count', { count: 2 });
 *  i18n.translate('ru-RU', 'app.forums.replies_count', 2);
 *  // -> '2 ответa'
 *  ```
 **/
BabelFish.prototype.translate = function _translate(locale, phrase, params) {
  var key = searchPhraseKey(this, locale, phrase);
  var data;

  if (!key) {
    return locale + ': No translation for [' + phrase + ']';
  }

  data = this._storage[key];

  // simple string or other pure object
  if (data.raw) { return data.translation; }

  // compile data if not done yet
  if (!data.hasOwnProperty('compiled')) {
    // We should use locale from phrase, because of possible fallback,
    // to keep plural locales in sync.
    data.compiled = compile(this, data.translation, data.locale);
  }

  // return simple string immediately
  if (!isFunction(data.compiled)) {
    return data.compiled;
  }

  //
  // Generate "complex" phrase
  //

  // Sugar: coerce numbers & strings to { count: X, value: X }
  if (isNumber(params) || isString (params)) {
    params = { count: params, value: params };
  }

  return data.compiled.call(this, params, flatten, pluralizer);
};


/**
 *  BabelFish#hasPhrase(locale, phrase) -> Boolean
 *  - locale (String): Locale of translation
 *  - phrase (String): Phrase ID, e.g. `app.forums.replies_count`
 *  - noFallback (Boolean): Disable search in fallbacks
 *
 *  Returns whenever or not there's a translation of a `phrase`.
 **/
BabelFish.prototype.hasPhrase = function _hasPhrase(locale, phrase, noFallback) {
  return noFallback ?
    this._storage.hasOwnProperty(makePhraseKey(locale, phrase))
  :
    searchPhraseKey(this, locale, phrase) ? true : false;
};


/** alias of: BabelFish#translate
 *  BabelFish#t(locale, phrase[, params]) -> String
 **/
BabelFish.prototype.t = BabelFish.prototype.translate;


/**
 *  BabelFish#stringify(locale) -> String
 *  - locale (String): Locale of translation
 *
 *  Returns serialized locale data, uncluding fallbacks.
 *  It can be loaded back via `load()` method.
 **/
BabelFish.prototype.stringify = function _stringify(locale) {
  var self = this;

  // Collect unique keys
  var unique = {};

  forEach(this._storage, function (val, key) {
    unique[key.split(keySeparator)[1]] = true;
  });

  // Collect phrases (with fallbacks)
  var result = {};

  forEach(unique, function(val, key) {
    var k = searchPhraseKey(self, locale, key);
    // if key was just a garbage from another
    // and doesn't fit into fallback chain for current locale - skip it
    if (!k) { return; }
    // create namespace if not exists
    var l = self._storage[k].locale;
    if (!result[l]) { result[l] = {}; }
    result[l][key] = self._storage[k].translation;
  });

  // Get fallback rule. Cut auto-added fallback to default locale
  var fallback = (self._fallbacks[locale] || []).pop();

  return JSON.stringify({

    fallback: { locale: fallback },
    locales: result
  });
};


/**
 *  BabelFish#load(data)
 *  - data (Object|String) - data from `stringify()` method, as object or string.
 *
 *  Batch load phrases data, prepared with `stringify()` method.
 *  Useful at browser side.
 **/
BabelFish.prototype.load = function _load(data) {
  var self = this;

  if (isString(data)) { data = JSON.parse(data); }

  forEach(data.locales, function (phrases, locale) {
    forEach(phrases, function(translation, key) {
      self.addPhrase(locale, key, translation, 0);
    });
  });

  forEach(data.fallback, function (rule, locale) {
    if (rule.length) { self.setFallback(locale, rule); }
  });
};

// export module
module.exports = BabelFish;

},{"./babelfish/parser":3,"./babelfish/pluralizer":4}],3:[function(_dereq_,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleIndices = { start: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          [],
          peg$FAILED,
          "((",
          { type: "literal", value: "((", description: "\"((\"" },
          "))",
          { type: "literal", value: "))", description: "\"))\"" },
          null,
          function(forms, anchor) {
                return {
                  type:   'plural',
                  forms:  regularForms(forms),
                  strict: strictForms(forms),
                  anchor: anchor || 'count'
                };
              },
          "|",
          { type: "literal", value: "|", description: "\"|\"" },
          function(part, more) {
                return [part].concat(more);
              },
          function(part) {
                return [part];
              },
          "=",
          { type: "literal", value: "=", description: "\"=\"" },
          /^[0-9]/,
          { type: "class", value: "[0-9]", description: "[0-9]" },
          " ",
          { type: "literal", value: " ", description: "\" \"" },
          function(strict, form) {
                return {
                  strict: strict.join(''),
                  text: form.join('')
                }
              },
          function() {
                return {
                  text: text()
                };
              },
          "\\",
          { type: "literal", value: "\\", description: "\"\\\\\"" },
          /^[\\|)(]/,
          { type: "class", value: "[\\\\|)(]", description: "[\\\\|)(]" },
          function(char) {
                return char;
              },
          void 0,
          { type: "any", description: "any character" },
          function() {
                return text();
              },
          ":",
          { type: "literal", value: ":", description: "\":\"" },
          function(name) {
                return name;
              },
          "#{",
          { type: "literal", value: "#{", description: "\"#{\"" },
          "}",
          { type: "literal", value: "}", description: "\"}\"" },
          function(anchor) {
                return {
                  type:   'variable',
                  anchor: anchor
                };
              },
          ".",
          { type: "literal", value: ".", description: "\".\"" },
          function() {
                return text()
              },
          /^[a-zA-Z_$]/,
          { type: "class", value: "[a-zA-Z_$]", description: "[a-zA-Z_$]" },
          /^[a-zA-Z0-9_$]/,
          { type: "class", value: "[a-zA-Z0-9_$]", description: "[a-zA-Z0-9_$]" },
          function(lc) { return lc; },
          function(literal_chars) {
                return {
                  type: 'literal',
                  text: literal_chars.join('')
                };
              },
          /^[\\#()]/,
          { type: "class", value: "[\\\\#()]", description: "[\\\\#()]" }
        ],

        peg$bytecode = [
          peg$decode("  7)*) \"7!*# \"7&,/&7)*) \"7!*# \"7&\""),
          peg$decode("!.\"\"\"2\"3#+S$7\"+I%.$\"\"2$3%+9%7%*# \" &+)%4$6'$\"\" %$$# !$## !$\"# !\"# !"),
          peg$decode("!7#+C$.(\"\"2(3)+3%7\"+)%4#6*#\"\" %$## !$\"# !\"# !*/ \"!7#+' 4!6+!! %"),
          peg$decode("!.,\"\"2,3-+}$  0.\"\"1!3/+,$,)&0.\"\"1!3/\"\"\" !+X%.0\"\"2031*# \" &+B%  7$+&$,#&7$\"\"\" !+)%4$62$\"\" %$$# !$## !$\"# !\"# !*= \"!  7$+&$,#&7$\"\"\" !+& 4!63! %"),
          peg$decode("!.4\"\"2435+8$06\"\"1!37+(%4\"68\"! %$\"# !\"# !*a \"!!8.(\"\"2(3)*) \".$\"\"2$3%9*$$\"\" 9\"# !+6$-\"\"1!3:+'%4\"6;\" %$\"# !\"# !"),
          peg$decode("!.<\"\"2<3=+2$7'+(%4\"6>\"! %$\"# !\"# !"),
          peg$decode("!.?\"\"2?3@+B$7'+8%.A\"\"2A3B+(%4#6C#!!%$## !$\"# !\"# !"),
          peg$decode("!7(+P$.D\"\"2D3E+@%  7'+&$,#&7'\"\"\" !+'%4#6F# %$## !$\"# !\"# !*# \"7("),
          peg$decode("!0G\"\"1!3H+E$  0I\"\"1!3J,)&0I\"\"1!3J\"+'%4\"6;\" %$\"# !\"# !"),
          peg$decode("!  !!87!*# \"7&9*$$\"\" 9\"# !+2$7*+(%4\"6K\"! %$\"# !\"# !+T$,Q&!!87!*# \"7&9*$$\"\" 9\"# !+2$7*+(%4\"6K\"! %$\"# !\"# !\"\"\" !+' 4!6L!! %"),
          peg$decode("!.4\"\"2435+8$0M\"\"1!3N+(%4\"68\"! %$\"# !\"# !*( \"-\"\"1!3:")
        ],

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$decode(s) {
      var bc = new Array(s.length), i;

      for (i = 0; i < s.length; i++) {
        bc[i] = s.charCodeAt(i) - 32;
      }

      return bc;
    }

    function peg$parseRule(index) {
      var bc    = peg$bytecode[index],
          ip    = 0,
          ips   = [],
          end   = bc.length,
          ends  = [],
          stack = [],
          params, i;

      function protect(object) {
        return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
      }

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(protect(peg$consts[bc[ip + 1]]));
              ip += 2;
              break;

            case 1:
              stack.push(peg$currPos);
              ip++;
              break;

            case 2:
              stack.pop();
              ip++;
              break;

            case 3:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 4:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 5:
              stack.splice(-2, 1);
              ip++;
              break;

            case 6:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 7:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 8:
              stack.pop();
              stack.push(input.substring(stack[stack.length - 1], peg$currPos));
              ip++;
              break;

            case 9:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 10:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 11:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 12:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 14:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 15:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 16:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 17:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 18:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 19:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 20:
              peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 21:
              peg$reportedPos = peg$currPos;
              ip++;
              break;

            case 22:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
              for (i = 0; i < bc[ip + 3]; i++) {
                params[i] = stack[stack.length - 1 - params[i]];
              }

              stack.splice(
                stack.length - bc[ip + 2],
                bc[ip + 2],
                peg$consts[bc[ip + 1]].apply(null, params)
              );

              ip += 4 + bc[ip + 3];
              break;

            case 23:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 24:
              peg$silentFails++;
              ip++;
              break;

            case 25:
              peg$silentFails--;
              ip++;
              break;

            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }

        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }

      return stack[0];
    }


      function regularForms(forms) {
        var result = [];
        for (var i=0; i<forms.length; i++) {
          if (forms[i].strict === undefined) { result.push(forms[i].text); }
        }
        return result;
      }
      function strictForms(forms) {
        var result = {};
        for (var i=0; i<forms.length; i++) {
          if (forms[i].strict !== undefined) { result[forms[i].strict] = forms[i].text; }
        }
        return result;
      }


    peg$result = peg$parseRule(peg$startRuleIndex);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

},{}],4:[function(_dereq_,module,exports){
//
// CLDR Version 21
// http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
//
// Charts: http://cldr.unicode.org/index/charts
// Latest: http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
//
// TODO: update to latest
//
'use strict';


// pluralizers cache
var PLURALIZERS = {};


module.exports = function pluralize(lang, count, forms) {
  var idx;

  if (!PLURALIZERS[lang]) {
    return '[pluralizer for (' + lang + ') not exists]';
  }

  idx = PLURALIZERS[lang](count);

  if (undefined === forms[idx]) {
    return '[plural form N' + idx + ' not found in translation]';
  }

  return forms[idx];
};


// HELPERS
////////////////////////////////////////////////////////////////////////////////


// adds given `rule` pluralizer for given `locales` into `storage`
function add(locales, rule) {
  var i;
  for (i = 0; i < locales.length; i += 1) {
    PLURALIZERS[locales[i]] = rule;
  }
}

// check if number is int or float
function is_int(input) {
  return (0 === input % 1);
}

// PLURALIZATION RULES
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// Azerbaijani, Bambara, Burmese, Chinese, Dzongkha, Georgian, Hungarian, Igbo,
// Indonesian, Japanese, Javanese, Kabuverdianu, Kannada, Khmer, Korean,
// Koyraboro Senni, Lao, Makonde, Malay, Persian, Root, Sakha, Sango,
// Sichuan Yi, Thai, Tibetan, Tonga, Turkish, Vietnamese, Wolof, Yoruba

add(['az', 'bm', 'my', 'zh', 'dz', 'ka', 'hu', 'ig',
  'id', 'ja', 'jv', 'kea', 'kn', 'km', 'ko',
  'ses', 'lo', 'kde', 'ms', 'fa', 'root', 'sah', 'sg',
  'ii',  'th', 'bo', 'to', 'tr', 'vi', 'wo', 'yo'], function () {
  return 0;
});


// Manx

add(['gv'], function (n) {
  var m10 = n % 10, m20 = n % 20;

  if ((m10 === 1 || m10 === 2 || m20 === 0) && is_int(n)) {
    return 0;
  }

  return 1;
});


// Central Morocco Tamazight

add(['tzm'], function (n) {
  if (n === 0 || n === 1 || (11 <= n && n <= 99 && is_int(n))) {
    return 0;
  }

  return 1;
});


// Macedonian

add(['mk'], function (n) {
  if ((n % 10 === 1) && (n !== 11) && is_int(n)) {
    return 0;
  }

  return 1;
});


// Akan, Amharic, Bihari, Filipino, Gun, Hindi,
// Lingala, Malagasy, Northern Sotho, Tagalog, Tigrinya, Walloon

add(['ak', 'am', 'bh', 'fil', 'guw', 'hi',
  'ln', 'mg', 'nso', 'tl', 'ti', 'wa'], function (n) {
  return (n === 0 || n === 1) ? 0 : 1;
});


// Afrikaans, Albanian, Basque, Bemba, Bengali, Bodo, Bulgarian, Catalan,
// Cherokee, Chiga, Danish, Divehi, Dutch, English, Esperanto, Estonian, Ewe,
// Faroese, Finnish, Friulian, Galician, Ganda, German, Greek, Gujarati, Hausa,
// Hawaiian, Hebrew, Icelandic, Italian, Kalaallisut, Kazakh, Kurdish,
// Luxembourgish, Malayalam, Marathi, Masai, Mongolian, Nahuatl, Nepali,
// Norwegian, Norwegian Bokmål, Norwegian Nynorsk, Nyankole, Oriya, Oromo,
// Papiamento, Pashto, Portuguese, Punjabi, Romansh, Saho, Samburu, Soga,
// Somali, Spanish, Swahili, Swedish, Swiss German, Syriac, Tamil, Telugu,
// Turkmen, Urdu, Walser, Western Frisian, Zulu

add(['af', 'sq', 'eu', 'bem', 'bn', 'brx', 'bg', 'ca',
  'chr', 'cgg', 'da', 'dv', 'nl', 'en', 'eo', 'et', 'ee',
  'fo', 'fi', 'fur', 'gl', 'lg', 'de', 'el', 'gu', 'ha',
  'haw', 'he', 'is', 'it', 'kl', 'kk', 'ku',
  'lb', 'ml', 'mr', 'mas', 'mn', 'nah', 'ne',
  'no', 'nb', 'nn', 'nyn', 'or', 'om',
  'pap', 'ps', 'pt', 'pa', 'rm', 'ssy', 'saq', 'xog',
  'so', 'es', 'sw', 'sv', 'gsw', 'syr', 'ta', 'te',
  'tk', 'ur', 'wae', 'fy', 'zu'], function (n) {
  return (1 === n) ? 0 : 1;
});


// Latvian

add(['lv'], function (n) {
  if (n === 0) {
    return 0;
  }

  if ((n % 10 === 1) && (n % 100 !== 11) && is_int(n)) {
    return 1;
  }

  return 2;
});


// Colognian

add(['ksh'], function (n) {
  return (n === 0) ? 0 : ((n === 1) ? 1 : 2);
});


// Cornish, Inari Sami, Inuktitut, Irish, Lule Sami, Northern Sami,
// Sami Language, Skolt Sami, Southern Sami

add(['kw', 'smn', 'iu', 'ga', 'smj', 'se',
  'smi', 'sms', 'sma'], function (n) {
  return (n === 1) ? 0 : ((n === 2) ? 1 : 2);
});


// Belarusian, Bosnian, Croatian, Russian, Serbian, Serbo-Croatian, Ukrainian

add(['be', 'bs', 'hr', 'ru', 'sr', 'sh', 'uk'], function (n) {
  var m10 = n % 10, m100 = n % 100;

  if (!is_int(n)) {
    return 3;
  }

  // one → n mod 10 is 1 and n mod 100 is not 11;
  if (1 === m10 && 11 !== m100) {
    return 0;
  }

  // few → n mod 10 in 2..4 and n mod 100 not in 12..14;
  if (2 <= m10 && m10 <= 4 && !(12 <= m100 && m100 <= 14)) {
    return 1;
  }

  // many → n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14;
/*  if (0 === m10 || (5 <= m10 && m10 <= 9) || (11 <= m100 && m100 <= 14)) {
    return 2;
  }

  // other
  return 3;*/
  return 2;
});


// Polish

add(['pl'], function (n) {
  var m10 = n % 10, m100 = n % 100;

  if (!is_int(n)) {
    return 3;
  }

  // one → n is 1;
  if (n === 1) {
    return 0;
  }

  // few → n mod 10 in 2..4 and n mod 100 not in 12..14;
  if (2 <= m10 && m10 <= 4 && !(12 <= m100 && m100 <= 14)) {
    return 1;
  }

  // many → n is not 1 and n mod 10 in 0..1 or
  // n mod 10 in 5..9 or n mod 100 in 12..14
  // (all other except partials)
  return 2;
});


// Lithuanian

add(['lt'], function (n) {
  var m10 = n % 10, m100 = n % 100;

  if (!is_int(n)) {
    return 2;
  }

  // one → n mod 10 is 1 and n mod 100 not in 11..19
  if (m10 === 1 && !(11 <= m100 && m100 <= 19)) {
    return 0;
  }

  // few → n mod 10 in 2..9 and n mod 100 not in 11..19
  if (2 <= m10 && m10 <= 9 && !(11 <= m100 && m100 <= 19)) {
    return 1;
  }

  // other
  return 2;
});


// Tachelhit

add(['shi'], function (n) {
  return (0 <= n && n <= 1) ? 0 : ((is_int(n) && 2 <= n && n <= 10) ? 1 : 2);
});


// Moldavian, Romanian

add(['mo', 'ro'], function (n) {
  var m100 = n % 100;

  if (!is_int(n)) {
    return 2;
  }

  // one → n is 1
  if (n === 1) {
    return 0;
  }

  // few → n is 0 OR n is not 1 AND n mod 100 in 1..19
  if (n === 0 || (1 <= m100 && m100 <= 19)) {
    return 1;
  }

  // other
  return 2;
});


// Czech, Slovak

add(['cs', 'sk'], function (n) {
  // one → n is 1
  if (n === 1) {
    return 0;
  }

  // few → n in 2..4
  if (n === 2 || n === 3 || n === 4) {
    return 1;
  }

  // other
  return 2;
});



// Slovenian

add(['sl'], function (n) {
  var m100 = n % 100;

  if (!is_int(n)) {
    return 3;
  }

  // one → n mod 100 is 1
  if (m100 === 1) {
    return 0;
  }

  // one → n mod 100 is 2
  if (m100 === 2) {
    return 1;
  }

  // one → n mod 100 in 3..4
  if (m100 === 3 || m100 === 4) {
    return 2;
  }

  // other
  return 3;
});


// Maltese

add(['mt'], function (n) {
  var m100 = n % 100;

  if (!is_int(n)) {
    return 3;
  }

  // one → n is 1
  if (n === 1) {
    return 0;
  }

  // few → n is 0 or n mod 100 in 2..10
  if (n === 0 || (2 <= m100 && m100 <= 10)) {
    return 1;
  }

  // many → n mod 100 in 11..19
  if (11 <= m100 && m100 <= 19) {
    return 2;
  }

  // other
  return 3;
});


// Arabic

add(['ar'], function (n) {
  var m100 = n % 100;

  if (!is_int(n)) {
    return 5;
  }

  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  // few → n mod 100 in 3..10
  if (3 <= m100 && m100 <= 10) {
    return 3;
  }

  // many → n mod 100 in 11..99
  if (11 <= m100 && m100 <= 99) {
    return 4;
  }

  // other
  return 5;
});


// Breton, Welsh

add(['br', 'cy'], function (n) {

  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n === 3) {
    return 3;
  }
  if (n === 6) {
    return 4;
  }

  return 5;
});


// FRACTIONAL PARTS - SPECIAL CASES
////////////////////////////////////////////////////////////////////////////////


// French, Fulah, Kabyle

add(['fr', 'ff', 'kab'], function (n) {
  return (0 <= n && n < 2) ? 0 : 1;
});


// Langi

add(['lag'], function (n) {
  return (n === 0) ? 0 : ((0 < n && n < 2) ? 1 : 2);
});


},{}]},{},[1])
(1)
});