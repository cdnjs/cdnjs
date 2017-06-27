/* babelfish 1.1.1 nodeca/babelfish */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Babelfish = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


var parser = require('./parser');
var plural = require('plurals-cldr');

function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj)   { return _class(obj) === '[object String]'; }
function isNumber(obj)   { return !isNaN(obj) && isFinite(obj); }
function isBoolean(obj)  { return obj === true || obj === false; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }
function isObject(obj)   { return _class(obj) === '[object Object]'; }

/*istanbul ignore next*/
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
/*istanbul ignore next*/
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

/*istanbul ignore next*/
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
    if (val && typeof val === 'object') {
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
  var fb = self._fallbacks[locale] || [ self._defaultLocale ];
  var fb_key;

  for (var i = 0, l = fb.length; i < l; i++) {
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


function pluralizer(lang, val, forms) {
  var idx = plural.indexOf(lang, val);

  if (idx === -1) {
    return format('[pluralizer for "%s" locale not found]', lang);
  }

  if (typeof forms[idx] === 'undefined') {
    return format('[plural form %d ("%s") not found in translation]',
                      idx, plural.forms(lang)[idx]);
  }

  return forms[idx];
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
    if (fl < 0) {
      throw new TypeError('Invalid flatten level (should be >= 0).');
    }
  } else {
    fl = Infinity;
  }

  if (isObject(translation) && (fl > 0)) {
    // recursive object walk, until flattenLevel allows
    forEach(translation, function (val, key) {
      self.addPhrase(locale, phrase + '.' + key, val, fl - 1);
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
    throw new Error("Default locale can't have fallbacks");
  }

  var fb = isArray(fallbacks) ? fallbacks.slice() : [ fallbacks ];
  if (fb[fb.length - 1] !== def) { fb.push(def); }

  this._fallbacks[locale] = fb;
  this._fallbacks_cache = {};
};


var CAN_HAVE_DIRECTIVES_RE = /#\{|\(\(|\\\\/;

// Compiles given string into function. Used to compile phrases,
// which contains `plurals`, `variables`, etc.
function compile(self, str, locale) {
  var nodes, buf, key, strict_exec, forms_exec, plurals_cache;

  // Quick check to avoid parse in most cases :)
  if (!CAN_HAVE_DIRECTIVES_RE.test(str)) { return str; }

  nodes = parser.parse(str);

  if (nodes.length === 1 && nodes[0].type === 'literal') {
    return nodes[0].text;
  }

  // init cache instance for plural parts, if not exists yet.
  if (!self._plurals_cache[locale]) {
    self._plurals_cache[locale] = new BabelFish(locale);
  }
  plurals_cache = self._plurals_cache[locale];

  buf = [];
  buf.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]);
  buf.push('params = flatten(params);');

  forEach(nodes, function (node) {
    if (node.type === 'literal') {
      buf.push(format('str += %j;', node.text));
      return;
    }

    if (node.type === 'variable') {
      key = node.anchor;
      buf.push(format(
        'str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];',
        key, key, key
      ));
      return;
    }

    // should never happen
    /*istanbul ignore next*/
    if (node.type !== 'plural') { throw new Error('Unknown node type'); }

    //
    // Compile plural
    //

    key = node.anchor;
    // check if plural parts are plain strings or executable,
    // and add executable to "cache" instance of babelfish
    // plural part text will be used as translation key
    strict_exec = {};
    forEach(node.strict, function (text, k) {
      var parsed = parser.parse(text);
      if (parsed.length === 1 && parsed[0].type === 'literal') {
        strict_exec[k] = false;
        // patch with unescaped value for direct extract
        node.strict[k] = parsed[0].text;
        return;
      }

      strict_exec[k] = true;
      if (!plurals_cache.hasPhrase(locale, text, true)) {
        plurals_cache.addPhrase(locale, text, text);
      }
    });

    forms_exec = {};
    forEach(node.forms, function (text, idx) {
      var parsed = parser.parse(text), unescaped;
      if (parsed.length === 1 && parsed[0].type === 'literal') {
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
    /*eslint-disable space-in-parens*/
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
  });

  buf.push('return str;');

  /*eslint-disable no-new-func*/
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
  if (isNumber(params) || isString(params)) {
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


/**
 *  BabelFish#getLocale(locale, phrase) -> String|null
 *  - locale (String): Locale of translation
 *  - phrase (String): Phrase ID, e.g. `app.forums.replies_count`
 *  - noFallback (Boolean): Disable search in fallbacks
 *
 *  Similar to [[BabelFish#hasPhrase]], but returns real locale of requested
 *  phrase, or `null` if nothing found. Can be useful for dynamic dependencies
 *  init. For example, when you fetch i10n config as single object and create
 *  phrases from it's content.
 **/
BabelFish.prototype.getLocale = function _getLocale(locale, phrase, noFallback) {
  if (noFallback) {
    return this._storage.hasOwnProperty(makePhraseKey(locale, phrase)) ? locale : null;
  }

  var key = searchPhraseKey(this, locale, phrase);

  return key ? key.split(keySeparator, 2)[0] : null;
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

  var out = {
    fallback: {},
    locales: result
  };

  // Get fallback rule. Cut auto-added fallback to default locale
  var fallback = (self._fallbacks[locale] || []).slice(0, -1);
  if (fallback.length) {
    out.fallback[locale] = fallback;
  }

  return JSON.stringify(out);
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
    self.setFallback(locale, rule);
  });
};

// export module
module.exports = BabelFish;

},{"./parser":2,"plurals-cldr":3}],2:[function(require,module,exports){
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

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = peg$FAILED,
        peg$c2 = "((",
        peg$c3 = { type: "literal", value: "((", description: "\"((\"" },
        peg$c4 = "))",
        peg$c5 = { type: "literal", value: "))", description: "\"))\"" },
        peg$c6 = null,
        peg$c7 = function(forms, anchor) {
              return {
                type:   'plural',
                forms:  regularForms(forms),
                strict: strictForms(forms),
                anchor: anchor || 'count'
              };
            },
        peg$c8 = "|",
        peg$c9 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c10 = function(part, more) {
              return [part].concat(more);
            },
        peg$c11 = function(part) {
              return [part];
            },
        peg$c12 = "=",
        peg$c13 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c14 = /^[0-9]/,
        peg$c15 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c16 = " ",
        peg$c17 = { type: "literal", value: " ", description: "\" \"" },
        peg$c18 = function(strict, form) {
              return {
                strict: strict.join(''),
                text: form.join('')
              }
            },
        peg$c19 = function() {
              return {
                text: text()
              };
            },
        peg$c20 = "\\",
        peg$c21 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c22 = /^[\\|)(]/,
        peg$c23 = { type: "class", value: "[\\\\|)(]", description: "[\\\\|)(]" },
        peg$c24 = function(char) {
              return char;
            },
        peg$c25 = void 0,
        peg$c26 = { type: "any", description: "any character" },
        peg$c27 = function() {
              return text();
            },
        peg$c28 = ":",
        peg$c29 = { type: "literal", value: ":", description: "\":\"" },
        peg$c30 = function(name) {
              return name;
            },
        peg$c31 = "#{",
        peg$c32 = { type: "literal", value: "#{", description: "\"#{\"" },
        peg$c33 = "}",
        peg$c34 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c35 = function(anchor) {
              return {
                type:   'variable',
                anchor: anchor
              };
            },
        peg$c36 = ".",
        peg$c37 = { type: "literal", value: ".", description: "\".\"" },
        peg$c38 = function() {
              return text()
            },
        peg$c39 = /^[a-zA-Z_$]/,
        peg$c40 = { type: "class", value: "[a-zA-Z_$]", description: "[a-zA-Z_$]" },
        peg$c41 = /^[a-zA-Z0-9_$]/,
        peg$c42 = { type: "class", value: "[a-zA-Z0-9_$]", description: "[a-zA-Z0-9_$]" },
        peg$c43 = function(lc) { return lc; },
        peg$c44 = function(literal_chars) {
              return {
                type: 'literal',
                text: literal_chars.join('')
              };
            },
        peg$c45 = /^[\\#()|]/,
        peg$c46 = { type: "class", value: "[\\\\#()|]", description: "[\\\\#()|]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
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

    function peg$parsestart() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseliteral();
      if (s1 === peg$FAILED) {
        s1 = peg$parseplural();
        if (s1 === peg$FAILED) {
          s1 = peg$parsevariable();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseliteral();
        if (s1 === peg$FAILED) {
          s1 = peg$parseplural();
          if (s1 === peg$FAILED) {
            s1 = peg$parsevariable();
          }
        }
      }

      return s0;
    }

    function peg$parseplural() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c3); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseplural_forms();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c4) {
            s3 = peg$c4;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseplural_anchor();
            if (s4 === peg$FAILED) {
              s4 = peg$c6;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c7(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseplural_forms() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseplural_part();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 124) {
          s2 = peg$c8;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseplural_forms();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c10(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseplural_part();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c11(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseplural_part() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c12;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c14.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c14.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
          }
        } else {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c16;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c6;
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseplural_char();
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseplural_char();
              }
            } else {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseplural_char();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseplural_char();
          }
        } else {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseplural_char() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c24(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 124) {
          s2 = peg$c8;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c4) {
            s2 = peg$c4;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c25;
        } else {
          peg$currPos = s1;
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c27();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      }

      return s0;
    }

    function peg$parseplural_anchor() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s1 = peg$c28;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseidentifier();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c30(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsevariable() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseidentifier();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s3 = peg$c33;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c34); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseidentifier() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseidentifier_part();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c36;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseidentifier();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseidentifier();
            }
          } else {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c38();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseidentifier_part();
      }

      return s0;
    }

    function peg$parseidentifier_part() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c41.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c42); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c41.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c27();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseliteral() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parseplural();
      if (s4 === peg$FAILED) {
        s4 = peg$parsevariable();
      }
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = peg$c25;
      } else {
        peg$currPos = s3;
        s3 = peg$c1;
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parseliteral_char();
        if (s4 !== peg$FAILED) {
          peg$reportedPos = s2;
          s3 = peg$c43(s4);
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c1;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c1;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseplural();
          if (s4 === peg$FAILED) {
            s4 = peg$parsevariable();
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c25;
          } else {
            peg$currPos = s3;
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseliteral_char();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s2;
              s3 = peg$c43(s4);
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c1;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c1;
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c44(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseliteral_char() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c24(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        if (input.length > peg$currPos) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
      }

      return s0;
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


    peg$result = peg$startRuleFunction();

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

},{}],3:[function(require,module,exports){
/*
 * Plural functions support (cardinal & ordinal forms)
 *
 * Autogenerated from CLDR:
 *
 *   Version:   26
 *   $Revision: 10807 $
 */

'use strict';


// pluralizers cache
var s = {};

function normalize(loc) {
  var l;
  if (s[loc]) { return loc; }
  l = loc.toLowerCase().replace('_', '-');
  if (s[l]) { return l; }
  l = l.split('-')[0];
  if (s[l]) { return l; }
  return null;
}

function forms(loc) {
  var l = normalize(loc);
  return s[l] ? s[l].c : null;
}

function indexOf(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return -1;
  }

  if (!s[l].cFn) {
    return 0;
  }

  var sval  = String(value),
      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
      v = f.length,
      n = +value,
      i = +(sval.split('.')[0]),
      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

  return s[l].cFn(n, i, v, +f, t);
}

function plural(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return null;
  }
  return s[l].c[indexOf(l, value)];
}


function o_forms(loc) {
  var l = normalize(loc);
  return s[l] ? s[l].o : null;
}

function o_indexOf(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return -1;
  }

  if (!s[l].oFn) {
    return 0;
  }

  var sval  = String(value),
      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
      v = f.length,
      n = +value,
      i = +(sval.split('.')[0]),
      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

  return s[l].oFn(n, i, v, +f, t);
}

function ordinal(loc, value) {
  var l = normalize(loc);
  if (!s[l]) {
    return null;
  }
  return s[l].o[o_indexOf(l, value)];
}

module.exports                  = plural;
module.exports.indexOf          = indexOf;
module.exports.forms            = forms;
module.exports.ordinal          = ordinal;
module.exports.ordinal.indexOf  = o_indexOf;
module.exports.ordinal.forms    = o_forms;


////////////////////////////////////////////////////////////////////////////////

var FORMS = [ 'zero', 'one', 'two', 'few', 'many', 'other' ];

function unpack(i) { return FORMS[i]; }

// adds given `rule` pluralizer for given `locales` into `storage`
function add(locales, rule) {
  var i;

  rule.c = rule.c ? rule.c.map(unpack) : [ 'other' ];
  rule.o = rule.o ? rule.o.map(unpack) : [ 'other' ];

  for (i = 0; i < locales.length; i++) {
    s[locales[i]] = rule;
  }
}

function B(x, y, val) { return x <= val && val <= y && val % 1 === 0; }
function IN(set, val) { return set.indexOf(val) >= 0; }


add([ 'af', 'asa', 'bem', 'bez', 'bg', 'brx', 'cgg', 'chr', 'ckb', 'dv', 'ee', 'el', 'eo', 'es', 'eu', 'fo', 'fur', 'gsw', 'ha', 'haw', 'jgo', 'jmc', 'kaj', 'kcg', 'kkj', 'kl', 'ks', 'ksb', 'ku', 'ky', 'lb', 'lg', 'mas', 'mgo', 'ml', 'mn', 'nah', 'nb', 'nd', 'nn', 'nnh', 'no', 'nr', 'ny', 'nyn', 'om', 'or', 'os', 'pap', 'ps', 'rm', 'rof', 'rwk', 'saq', 'seh', 'sn', 'so', 'ss', 'ssy', 'st', 'syr', 'ta', 'te', 'teo', 'tig', 'tk', 'tn', 'tr', 'ts', 'ug', 'uz', 've', 'vo', 'vun', 'wae', 'xh', 'xog' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'ak', 'bh', 'guw', 'ln', 'mg', 'nso', 'pa', 'ti', 'wa' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 1, n) ? 0 : 1;
  }
});

add([ 'am', 'fa', 'kn', 'zu' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  }
});

add([ 'ar' ], {
  c: [ 0, 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    var n100 = n % 100;
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : B(3, 10, n100) ? 3 : B(11, 99, n100) ? 4 : 5;
  }
});

add([ 'ast', 'de', 'et', 'fi', 'fy', 'gl', 'ji', 'nl', 'sw', 'ur', 'yi' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  }
});

add([ 'az' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 3, 4, 5 ],
  oFn: function (n, i) {
    var i10 = i % 10, i100 = i % 100, i1000 = i % 1000;
    return IN([ 1, 2, 5, 7, 8 ], i10) || IN([ 20, 50, 70, 80 ], i100) ? 0 : IN([ 3, 4 ], i10) || IN([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i1000) ? 1 : i === 0 || i10 === 6 || IN([ 40, 60, 90 ], i100) ? 2 : 3;
  }
});

add([ 'be' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && n100 !== 11 ? 0 : B(2, 4, n10) && !B(12, 14, n100) ? 1 : n10 === 0 || B(5, 9, n10) || B(11, 14, n100) ? 2 : 3;
  }
});

add([ 'bm', 'bo', 'dz', 'id', 'ig', 'ii', 'in', 'ja', 'jbo', 'jv', 'jw', 'kde', 'kea', 'km', 'ko', 'lkt', 'my', 'nqo', 'root', 'sah', 'ses', 'sg', 'th', 'to', 'wo', 'yo', 'zh' ], {
});

add([ 'bn' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return IN([ 1, 5, 7, 8, 9, 10 ], n) ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
  }
});

add([ 'br' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    var n10 = n % 10, n100 = n % 100, n1000000 = n % 1000000;
    return n10 === 1 && !IN([ 11, 71, 91 ], n100) ? 0 : n10 === 2 && !IN([ 12, 72, 92 ], n100) ? 1 : (B(3, 4, n10) || n10 === 9) && (!B(10, 19, n100) && !B(70, 79, n100) && !B(90, 99, n100)) ? 2 : n !== 0 && n1000000 === 0 ? 3 : 4;
  }
});

add([ 'bs', 'hr', 'sh', 'sr' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, i100 = i % 100, f10 = f % 10, f100 = f % 100;
    return v === 0 && i10 === 1 && i100 !== 11 || f10 === 1 && f100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) || B(2, 4, f10) && !B(12, 14, f100) ? 1 : 2;
  }
});

add([ 'ca' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    return IN([ 1, 3 ], n) ? 0 : n === 2 ? 1 : n === 4 ? 2 : 3;
  }
});

add([ 'cs', 'sk' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : B(2, 4, i) && v === 0 ? 1 : v !== 0 ? 2 : 3;
  }
});

add([ 'cy' ], {
  c: [ 0, 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : n === 6 ? 4 : 5;
  },
  o: [ 0, 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return IN([ 0, 7, 8, 9 ], n) ? 0 : n === 1 ? 1 : n === 2 ? 2 : IN([ 3, 4 ], n) ? 3 : IN([ 5, 6 ], n) ? 4 : 5;
  }
});

add([ 'da' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f, t) {
    return n === 1 || t !== 0 && IN([ 0, 1 ], i) ? 0 : 1;
  }
});

add([ 'dsb', 'hsb' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n, i, v, f) {
    var i100 = i % 100, f100 = f % 100;
    return v === 0 && i100 === 1 || f100 === 1 ? 0 : v === 0 && i100 === 2 || f100 === 2 ? 1 : v === 0 && B(3, 4, i100) || B(3, 4, f100) ? 2 : 3;
  }
});

add([ 'en' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && n100 !== 11 ? 0 : n10 === 2 && n100 !== 12 ? 1 : n10 === 3 && n100 !== 13 ? 2 : 3;
  }
});

add([ 'ff', 'kab' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return IN([ 0, 1 ], i) ? 0 : 1;
  }
});

add([ 'fil', 'tl' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, f10 = f % 10;
    return v === 0 && IN([ 1, 2, 3 ], i) || v === 0 && !IN([ 4, 6, 9 ], i10) || v !== 0 && !IN([ 4, 6, 9 ], f10) ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'fr', 'hy' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return IN([ 0, 1 ], i) ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'ga' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : n === 2 ? 1 : B(3, 6, n) ? 2 : B(7, 10, n) ? 3 : 4;
  }
});

add([ 'gd' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n) {
    return IN([ 1, 11 ], n) ? 0 : IN([ 2, 12 ], n) ? 1 : (B(3, 10, n) || B(13, 19, n)) ? 2 : 3;
  }
});

add([ 'gu', 'hi' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
  }
});

add([ 'gv' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 ? 0 : v === 0 && i10 === 2 ? 1 : v === 0 && IN([ 0, 20, 40, 60, 80 ], i100) ? 2 : v !== 0 ? 3 : 4;
  }
});

add([ 'he', 'iw' ], {
  c: [ 1, 2, 4, 5 ],
  cFn: function (n, i, v) {
    var n10 = n % 10;
    return i === 1 && v === 0 ? 0 : i === 2 && v === 0 ? 1 : v === 0 && !B(0, 10, n) && n10 === 0 ? 2 : 3;
  }
});

add([ 'hu' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return IN([ 1, 5 ], n) ? 0 : 1;
  }
});

add([ 'is' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f, t) {
    var i10 = i % 10, i100 = i % 100;
    return t === 0 && i10 === 1 && i100 !== 11 || t !== 0 ? 0 : 1;
  }
});

add([ 'it' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 4, 5 ],
  oFn: function (n) {
    return IN([ 11, 8, 80, 800 ], n) ? 0 : 1;
  }
});

add([ 'iu', 'kw', 'naq', 'se', 'sma', 'smi', 'smj', 'smn', 'sms' ], {
  c: [ 1, 2, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : n === 2 ? 1 : 2;
  }
});

add([ 'ka' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 4, 5 ],
  oFn: function (n, i) {
    var i100 = i % 100;
    return i === 1 ? 0 : i === 0 || (B(2, 20, i100) || i100 === 40 || i100 === 60 || i100 === 80) ? 1 : 2;
  }
});

add([ 'kk' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 4, 5 ],
  oFn: function (n) {
    var n10 = n % 10;
    return n10 === 6 || n10 === 9 || n10 === 0 && n !== 0 ? 0 : 1;
  }
});

add([ 'ksh' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : 2;
  }
});

add([ 'lag' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n, i) {
    return n === 0 ? 0 : IN([ 0, 1 ], i) && n !== 0 ? 1 : 2;
  }
});

add([ 'lo', 'ms', 'vi' ], {
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'lt' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v, f) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && !B(11, 19, n100) ? 0 : B(2, 9, n10) && !B(11, 19, n100) ? 1 : f !== 0 ? 2 : 3;
  }
});

add([ 'lv', 'prg' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n, i, v, f) {
    var n10 = n % 10, n100 = n % 100, f100 = f % 100, f10 = f % 10;
    return n10 === 0 || B(11, 19, n100) || v === 2 && B(11, 19, f100) ? 0 : n10 === 1 && n100 !== 11 || v === 2 && f10 === 1 && f100 !== 11 || v !== 2 && f10 === 1 ? 1 : 2;
  }
});

add([ 'mk' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, f10 = f % 10;
    return v === 0 && i10 === 1 || f10 === 1 ? 0 : 1;
  },
  o: [ 1, 2, 4, 5 ],
  oFn: function (n, i) {
    var i10 = i % 10, i100 = i % 100;
    return i10 === 1 && i100 !== 11 ? 0 : i10 === 2 && i100 !== 12 ? 1 : IN([ 7, 8 ], i10) && !IN([ 17, 18 ], i100) ? 2 : 3;
  }
});

add([ 'mo', 'ro' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i, v) {
    var n100 = n % 100;
    return i === 1 && v === 0 ? 0 : v !== 0 || n === 0 || n !== 1 && B(1, 19, n100) ? 1 : 2;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'mr' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : 3;
  }
});

add([ 'mt' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n) {
    var n100 = n % 100;
    return n === 1 ? 0 : n === 0 || B(2, 10, n100) ? 1 : B(11, 19, n100) ? 2 : 3;
  }
});

add([ 'ne' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return B(1, 4, n) ? 0 : 1;
  }
});

add([ 'pl' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return i === 1 && v === 0 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i !== 1 && B(0, 1, i10) || v === 0 && B(5, 9, i10) || v === 0 && B(12, 14, i100) ? 2 : 3;
  }
});

add([ 'pt' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 2, n) && n !== 2 ? 0 : 1;
  }
});

add([ 'pt-pt' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return n === 1 && v === 0 ? 0 : 1;
  }
});

add([ 'ru' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
  }
});

add([ 'shi' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : B(2, 10, n) ? 1 : 2;
  }
});

add([ 'si' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    return IN([ 0, 1 ], n) || i === 0 && f === 1 ? 0 : 1;
  }
});

add([ 'sl' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n, i, v) {
    var i100 = i % 100;
    return v === 0 && i100 === 1 ? 0 : v === 0 && i100 === 2 ? 1 : v === 0 && B(3, 4, i100) || v !== 0 ? 2 : 3;
  }
});

add([ 'sq' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 4, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n === 1 ? 0 : n10 === 4 && n100 !== 14 ? 1 : 2;
  }
});

add([ 'sv' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return IN([ 1, 2 ], n10) && !IN([ 11, 12 ], n100) ? 0 : 1;
  }
});

add([ 'tzm' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 1, n) || B(11, 99, n) ? 0 : 1;
  }
});

add([ 'uk' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
  },
  o: [ 3, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 3 && n100 !== 13 ? 0 : 1;
  }
});

////////////////////////////////////////////////////////////////////////////////

},{}],"/":[function(require,module,exports){
module.exports = require('./lib/babelfish');

},{"./lib/babelfish":1}]},{},[])("/")
});