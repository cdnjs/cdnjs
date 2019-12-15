/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.4 (2019-04-23)
 */
(function () {
var charmap = (function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var fireInsertCustomChar = function (editor, chr) {
      return editor.fire('insertCustomChar', { chr: chr });
    };
    var Events = { fireInsertCustomChar: fireInsertCustomChar };

    var insertChar = function (editor, chr) {
      var evtChr = Events.fireInsertCustomChar(editor, chr).chr;
      editor.execCommand('mceInsertContent', false, evtChr);
    };
    var Actions = { insertChar: insertChar };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getCharMap = function (editor) {
      return editor.settings.charmap;
    };
    var getCharMapAppend = function (editor) {
      return editor.settings.charmap_append;
    };
    var Settings = {
      getCharMap: getCharMap,
      getCharMapAppend: getCharMapAppend
    };

    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isFunction = isType('function');

    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i, xs);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i]))
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      var output = map(xs, f);
      return flatten(output);
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var isArray = global$1.isArray;
    var UserDefined = 'User Defined';
    var getDefaultCharMap = function () {
      return [
        {
          name: 'Currency',
          characters: [
            [
              36,
              'dollar sign'
            ],
            [
              162,
              'cent sign'
            ],
            [
              8364,
              'euro sign'
            ],
            [
              163,
              'pound sign'
            ],
            [
              165,
              'yen sign'
            ],
            [
              164,
              'currency sign'
            ],
            [
              8352,
              'euro-currency sign'
            ],
            [
              8353,
              'colon sign'
            ],
            [
              8354,
              'cruzeiro sign'
            ],
            [
              8355,
              'french franc sign'
            ],
            [
              8356,
              'lira sign'
            ],
            [
              8357,
              'mill sign'
            ],
            [
              8358,
              'naira sign'
            ],
            [
              8359,
              'peseta sign'
            ],
            [
              8360,
              'rupee sign'
            ],
            [
              8361,
              'won sign'
            ],
            [
              8362,
              'new sheqel sign'
            ],
            [
              8363,
              'dong sign'
            ],
            [
              8365,
              'kip sign'
            ],
            [
              8366,
              'tugrik sign'
            ],
            [
              8367,
              'drachma sign'
            ],
            [
              8368,
              'german penny symbol'
            ],
            [
              8369,
              'peso sign'
            ],
            [
              8370,
              'guarani sign'
            ],
            [
              8371,
              'austral sign'
            ],
            [
              8372,
              'hryvnia sign'
            ],
            [
              8373,
              'cedi sign'
            ],
            [
              8374,
              'livre tournois sign'
            ],
            [
              8375,
              'spesmilo sign'
            ],
            [
              8376,
              'tenge sign'
            ],
            [
              8377,
              'indian rupee sign'
            ],
            [
              8378,
              'turkish lira sign'
            ],
            [
              8379,
              'nordic mark sign'
            ],
            [
              8380,
              'manat sign'
            ],
            [
              8381,
              'ruble sign'
            ],
            [
              20870,
              'yen character'
            ],
            [
              20803,
              'yuan character'
            ],
            [
              22291,
              'yuan character, in hong kong and taiwan'
            ],
            [
              22278,
              'yen/yuan character variant one'
            ]
          ]
        },
        {
          name: 'Text',
          characters: [
            [
              169,
              'copyright sign'
            ],
            [
              174,
              'registered sign'
            ],
            [
              8482,
              'trade mark sign'
            ],
            [
              8240,
              'per mille sign'
            ],
            [
              181,
              'micro sign'
            ],
            [
              183,
              'middle dot'
            ],
            [
              8226,
              'bullet'
            ],
            [
              8230,
              'three dot leader'
            ],
            [
              8242,
              'minutes / feet'
            ],
            [
              8243,
              'seconds / inches'
            ],
            [
              167,
              'section sign'
            ],
            [
              182,
              'paragraph sign'
            ],
            [
              223,
              'sharp s / ess-zed'
            ]
          ]
        },
        {
          name: 'Quotations',
          characters: [
            [
              8249,
              'single left-pointing angle quotation mark'
            ],
            [
              8250,
              'single right-pointing angle quotation mark'
            ],
            [
              171,
              'left pointing guillemet'
            ],
            [
              187,
              'right pointing guillemet'
            ],
            [
              8216,
              'left single quotation mark'
            ],
            [
              8217,
              'right single quotation mark'
            ],
            [
              8220,
              'left double quotation mark'
            ],
            [
              8221,
              'right double quotation mark'
            ],
            [
              8218,
              'single low-9 quotation mark'
            ],
            [
              8222,
              'double low-9 quotation mark'
            ],
            [
              60,
              'less-than sign'
            ],
            [
              62,
              'greater-than sign'
            ],
            [
              8804,
              'less-than or equal to'
            ],
            [
              8805,
              'greater-than or equal to'
            ],
            [
              8211,
              'en dash'
            ],
            [
              8212,
              'em dash'
            ],
            [
              175,
              'macron'
            ],
            [
              8254,
              'overline'
            ],
            [
              164,
              'currency sign'
            ],
            [
              166,
              'broken bar'
            ],
            [
              168,
              'diaeresis'
            ],
            [
              161,
              'inverted exclamation mark'
            ],
            [
              191,
              'turned question mark'
            ],
            [
              710,
              'circumflex accent'
            ],
            [
              732,
              'small tilde'
            ],
            [
              176,
              'degree sign'
            ],
            [
              8722,
              'minus sign'
            ],
            [
              177,
              'plus-minus sign'
            ],
            [
              247,
              'division sign'
            ],
            [
              8260,
              'fraction slash'
            ],
            [
              215,
              'multiplication sign'
            ],
            [
              185,
              'superscript one'
            ],
            [
              178,
              'superscript two'
            ],
            [
              179,
              'superscript three'
            ],
            [
              188,
              'fraction one quarter'
            ],
            [
              189,
              'fraction one half'
            ],
            [
              190,
              'fraction three quarters'
            ]
          ]
        },
        {
          name: 'Mathematical',
          characters: [
            [
              402,
              'function / florin'
            ],
            [
              8747,
              'integral'
            ],
            [
              8721,
              'n-ary sumation'
            ],
            [
              8734,
              'infinity'
            ],
            [
              8730,
              'square root'
            ],
            [
              8764,
              'similar to'
            ],
            [
              8773,
              'approximately equal to'
            ],
            [
              8776,
              'almost equal to'
            ],
            [
              8800,
              'not equal to'
            ],
            [
              8801,
              'identical to'
            ],
            [
              8712,
              'element of'
            ],
            [
              8713,
              'not an element of'
            ],
            [
              8715,
              'contains as member'
            ],
            [
              8719,
              'n-ary product'
            ],
            [
              8743,
              'logical and'
            ],
            [
              8744,
              'logical or'
            ],
            [
              172,
              'not sign'
            ],
            [
              8745,
              'intersection'
            ],
            [
              8746,
              'union'
            ],
            [
              8706,
              'partial differential'
            ],
            [
              8704,
              'for all'
            ],
            [
              8707,
              'there exists'
            ],
            [
              8709,
              'diameter'
            ],
            [
              8711,
              'backward difference'
            ],
            [
              8727,
              'asterisk operator'
            ],
            [
              8733,
              'proportional to'
            ],
            [
              8736,
              'angle'
            ]
          ]
        },
        {
          name: 'Extended Latin',
          characters: [
            [
              192,
              'A - grave'
            ],
            [
              193,
              'A - acute'
            ],
            [
              194,
              'A - circumflex'
            ],
            [
              195,
              'A - tilde'
            ],
            [
              196,
              'A - diaeresis'
            ],
            [
              197,
              'A - ring above'
            ],
            [
              256,
              'A - macron'
            ],
            [
              198,
              'ligature AE'
            ],
            [
              199,
              'C - cedilla'
            ],
            [
              200,
              'E - grave'
            ],
            [
              201,
              'E - acute'
            ],
            [
              202,
              'E - circumflex'
            ],
            [
              203,
              'E - diaeresis'
            ],
            [
              274,
              'E - macron'
            ],
            [
              204,
              'I - grave'
            ],
            [
              205,
              'I - acute'
            ],
            [
              206,
              'I - circumflex'
            ],
            [
              207,
              'I - diaeresis'
            ],
            [
              298,
              'I - macron'
            ],
            [
              208,
              'ETH'
            ],
            [
              209,
              'N - tilde'
            ],
            [
              210,
              'O - grave'
            ],
            [
              211,
              'O - acute'
            ],
            [
              212,
              'O - circumflex'
            ],
            [
              213,
              'O - tilde'
            ],
            [
              214,
              'O - diaeresis'
            ],
            [
              216,
              'O - slash'
            ],
            [
              332,
              'O - macron'
            ],
            [
              338,
              'ligature OE'
            ],
            [
              352,
              'S - caron'
            ],
            [
              217,
              'U - grave'
            ],
            [
              218,
              'U - acute'
            ],
            [
              219,
              'U - circumflex'
            ],
            [
              220,
              'U - diaeresis'
            ],
            [
              362,
              'U - macron'
            ],
            [
              221,
              'Y - acute'
            ],
            [
              376,
              'Y - diaeresis'
            ],
            [
              562,
              'Y - macron'
            ],
            [
              222,
              'THORN'
            ],
            [
              224,
              'a - grave'
            ],
            [
              225,
              'a - acute'
            ],
            [
              226,
              'a - circumflex'
            ],
            [
              227,
              'a - tilde'
            ],
            [
              228,
              'a - diaeresis'
            ],
            [
              229,
              'a - ring above'
            ],
            [
              257,
              'a - macron'
            ],
            [
              230,
              'ligature ae'
            ],
            [
              231,
              'c - cedilla'
            ],
            [
              232,
              'e - grave'
            ],
            [
              233,
              'e - acute'
            ],
            [
              234,
              'e - circumflex'
            ],
            [
              235,
              'e - diaeresis'
            ],
            [
              275,
              'e - macron'
            ],
            [
              236,
              'i - grave'
            ],
            [
              237,
              'i - acute'
            ],
            [
              238,
              'i - circumflex'
            ],
            [
              239,
              'i - diaeresis'
            ],
            [
              299,
              'i - macron'
            ],
            [
              240,
              'eth'
            ],
            [
              241,
              'n - tilde'
            ],
            [
              242,
              'o - grave'
            ],
            [
              243,
              'o - acute'
            ],
            [
              244,
              'o - circumflex'
            ],
            [
              245,
              'o - tilde'
            ],
            [
              246,
              'o - diaeresis'
            ],
            [
              248,
              'o slash'
            ],
            [
              333,
              'o macron'
            ],
            [
              339,
              'ligature oe'
            ],
            [
              353,
              's - caron'
            ],
            [
              249,
              'u - grave'
            ],
            [
              250,
              'u - acute'
            ],
            [
              251,
              'u - circumflex'
            ],
            [
              252,
              'u - diaeresis'
            ],
            [
              363,
              'u - macron'
            ],
            [
              253,
              'y - acute'
            ],
            [
              254,
              'thorn'
            ],
            [
              255,
              'y - diaeresis'
            ],
            [
              563,
              'y - macron'
            ],
            [
              913,
              'Alpha'
            ],
            [
              914,
              'Beta'
            ],
            [
              915,
              'Gamma'
            ],
            [
              916,
              'Delta'
            ],
            [
              917,
              'Epsilon'
            ],
            [
              918,
              'Zeta'
            ],
            [
              919,
              'Eta'
            ],
            [
              920,
              'Theta'
            ],
            [
              921,
              'Iota'
            ],
            [
              922,
              'Kappa'
            ],
            [
              923,
              'Lambda'
            ],
            [
              924,
              'Mu'
            ],
            [
              925,
              'Nu'
            ],
            [
              926,
              'Xi'
            ],
            [
              927,
              'Omicron'
            ],
            [
              928,
              'Pi'
            ],
            [
              929,
              'Rho'
            ],
            [
              931,
              'Sigma'
            ],
            [
              932,
              'Tau'
            ],
            [
              933,
              'Upsilon'
            ],
            [
              934,
              'Phi'
            ],
            [
              935,
              'Chi'
            ],
            [
              936,
              'Psi'
            ],
            [
              937,
              'Omega'
            ],
            [
              945,
              'alpha'
            ],
            [
              946,
              'beta'
            ],
            [
              947,
              'gamma'
            ],
            [
              948,
              'delta'
            ],
            [
              949,
              'epsilon'
            ],
            [
              950,
              'zeta'
            ],
            [
              951,
              'eta'
            ],
            [
              952,
              'theta'
            ],
            [
              953,
              'iota'
            ],
            [
              954,
              'kappa'
            ],
            [
              955,
              'lambda'
            ],
            [
              956,
              'mu'
            ],
            [
              957,
              'nu'
            ],
            [
              958,
              'xi'
            ],
            [
              959,
              'omicron'
            ],
            [
              960,
              'pi'
            ],
            [
              961,
              'rho'
            ],
            [
              962,
              'final sigma'
            ],
            [
              963,
              'sigma'
            ],
            [
              964,
              'tau'
            ],
            [
              965,
              'upsilon'
            ],
            [
              966,
              'phi'
            ],
            [
              967,
              'chi'
            ],
            [
              968,
              'psi'
            ],
            [
              969,
              'omega'
            ]
          ]
        },
        {
          name: 'Symbols',
          characters: [
            [
              8501,
              'alef symbol'
            ],
            [
              982,
              'pi symbol'
            ],
            [
              8476,
              'real part symbol'
            ],
            [
              978,
              'upsilon - hook symbol'
            ],
            [
              8472,
              'Weierstrass p'
            ],
            [
              8465,
              'imaginary part'
            ]
          ]
        },
        {
          name: 'Arrows',
          characters: [
            [
              8592,
              'leftwards arrow'
            ],
            [
              8593,
              'upwards arrow'
            ],
            [
              8594,
              'rightwards arrow'
            ],
            [
              8595,
              'downwards arrow'
            ],
            [
              8596,
              'left right arrow'
            ],
            [
              8629,
              'carriage return'
            ],
            [
              8656,
              'leftwards double arrow'
            ],
            [
              8657,
              'upwards double arrow'
            ],
            [
              8658,
              'rightwards double arrow'
            ],
            [
              8659,
              'downwards double arrow'
            ],
            [
              8660,
              'left right double arrow'
            ],
            [
              8756,
              'therefore'
            ],
            [
              8834,
              'subset of'
            ],
            [
              8835,
              'superset of'
            ],
            [
              8836,
              'not a subset of'
            ],
            [
              8838,
              'subset of or equal to'
            ],
            [
              8839,
              'superset of or equal to'
            ],
            [
              8853,
              'circled plus'
            ],
            [
              8855,
              'circled times'
            ],
            [
              8869,
              'perpendicular'
            ],
            [
              8901,
              'dot operator'
            ],
            [
              8968,
              'left ceiling'
            ],
            [
              8969,
              'right ceiling'
            ],
            [
              8970,
              'left floor'
            ],
            [
              8971,
              'right floor'
            ],
            [
              9001,
              'left-pointing angle bracket'
            ],
            [
              9002,
              'right-pointing angle bracket'
            ],
            [
              9674,
              'lozenge'
            ],
            [
              9824,
              'black spade suit'
            ],
            [
              9827,
              'black club suit'
            ],
            [
              9829,
              'black heart suit'
            ],
            [
              9830,
              'black diamond suit'
            ],
            [
              8194,
              'en space'
            ],
            [
              8195,
              'em space'
            ],
            [
              8201,
              'thin space'
            ],
            [
              8204,
              'zero width non-joiner'
            ],
            [
              8205,
              'zero width joiner'
            ],
            [
              8206,
              'left-to-right mark'
            ],
            [
              8207,
              'right-to-left mark'
            ]
          ]
        }
      ];
    };
    var charmapFilter = function (charmap) {
      return global$1.grep(charmap, function (item) {
        return isArray(item) && item.length === 2;
      });
    };
    var getCharsFromSetting = function (settingValue) {
      if (isArray(settingValue)) {
        return [].concat(charmapFilter(settingValue));
      }
      if (typeof settingValue === 'function') {
        return settingValue();
      }
      return [];
    };
    var extendCharMap = function (editor, charmap) {
      var userCharMap = Settings.getCharMap(editor);
      if (userCharMap) {
        charmap = [{
            name: UserDefined,
            characters: getCharsFromSetting(userCharMap)
          }];
      }
      var userCharMapAppend = Settings.getCharMapAppend(editor);
      if (userCharMapAppend) {
        var userDefinedGroup = global$1.grep(charmap, function (cg) {
          return cg.name === UserDefined;
        });
        if (userDefinedGroup.length) {
          userDefinedGroup[0].characters = [].concat(userDefinedGroup[0].characters).concat(getCharsFromSetting(userCharMapAppend));
          return charmap;
        }
        return [].concat(charmap).concat({
          name: UserDefined,
          characters: getCharsFromSetting(userCharMapAppend)
        });
      }
      return charmap;
    };
    var getCharMap$1 = function (editor) {
      var groups = extendCharMap(editor, getDefaultCharMap());
      return groups.length > 1 ? [{
          name: 'All',
          characters: bind(groups, function (g) {
            return g.characters;
          })
        }].concat(groups) : groups;
    };
    var CharMap = { getCharMap: getCharMap$1 };

    var get = function (editor) {
      var getCharMap = function () {
        return CharMap.getCharMap(editor);
      };
      var insertChar = function (chr) {
        Actions.insertChar(editor, chr);
      };
      return {
        getCharMap: getCharMap,
        insertChar: insertChar
      };
    };
    var Api = { get: get };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var last = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (timer !== null)
          domGlobals.clearTimeout(timer);
        timer = domGlobals.setTimeout(function () {
          fn.apply(null, args);
          timer = null;
        }, rate);
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };

    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var charMatches = function (charCode, name, lowerCasePattern) {
      if (contains(String.fromCharCode(charCode).toLowerCase(), lowerCasePattern)) {
        return true;
      } else {
        return contains(name.toLowerCase(), lowerCasePattern) || contains(name.toLowerCase().replace(/\s+/g, ''), lowerCasePattern);
      }
    };
    var scan = function (group, pattern) {
      var matches = [];
      var lowerCasePattern = pattern.toLowerCase();
      each(group.characters, function (g) {
        if (charMatches(g[0], g[1], lowerCasePattern)) {
          matches.push(g);
        }
      });
      return map(matches, function (m) {
        return {
          text: m[1],
          value: String.fromCharCode(m[0]),
          icon: String.fromCharCode(m[0])
        };
      });
    };
    var Scan = { scan: scan };

    var patternName = 'pattern';
    var open = function (editor, charMap) {
      var makeGroupItems = function () {
        return [
          {
            label: 'Search',
            type: 'input',
            name: patternName
          },
          {
            type: 'collection',
            name: 'results'
          }
        ];
      };
      var makeTabs = function () {
        return map(charMap, function (charGroup) {
          return {
            title: charGroup.name,
            items: makeGroupItems()
          };
        });
      };
      var currentTab = charMap.length === 1 ? Cell(UserDefined) : Cell('All');
      var makePanel = function () {
        return {
          type: 'panel',
          items: makeGroupItems()
        };
      };
      var makeTabPanel = function () {
        return {
          type: 'tabpanel',
          tabs: makeTabs()
        };
      };
      var scanAndSet = function (dialogApi, pattern) {
        find(charMap, function (group) {
          return group.name === currentTab.get();
        }).each(function (f) {
          var items = Scan.scan(f, pattern);
          dialogApi.setData({ results: items });
        });
      };
      var SEARCH_DELAY = 40;
      var updateFilter = last(function (dialogApi) {
        var pattern = dialogApi.getData().pattern;
        scanAndSet(dialogApi, pattern);
      }, SEARCH_DELAY);
      var body = charMap.length === 1 ? makePanel() : makeTabPanel();
      var initialData = {
        pattern: '',
        results: Scan.scan(charMap[0], '')
      };
      var bridgeSpec = {
        title: 'Special Character',
        size: 'normal',
        body: body,
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
          }],
        initialData: initialData,
        onAction: function (api, details) {
          if (details.name === 'results') {
            Actions.insertChar(editor, details.value);
            api.close();
          }
        },
        onTabChange: function (dialogApi, title) {
          currentTab.set(title);
          updateFilter.throttle(dialogApi);
        },
        onChange: function (dialogApi, changeData) {
          if (changeData.name === patternName) {
            updateFilter.throttle(dialogApi);
          }
        }
      };
      editor.windowManager.open(bridgeSpec);
    };
    var Dialog = { open: open };

    var register = function (editor, charMap) {
      editor.addCommand('mceShowCharmap', function () {
        Dialog.open(editor, charMap);
      });
    };
    var Commands = { register: register };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var init = function (editor, all) {
      editor.ui.registry.addAutocompleter('charmap', {
        ch: ':',
        columns: 'auto',
        minChars: 2,
        fetch: function (pattern, maxResults) {
          return new global$2(function (resolve, reject) {
            resolve(Scan.scan(all, pattern));
          });
        },
        onAction: function (autocompleteApi, rng, value) {
          editor.selection.setRng(rng);
          editor.insertContent(value);
          autocompleteApi.hide();
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('charmap', {
        icon: 'insert-character',
        tooltip: 'Special character',
        onAction: function () {
          return editor.execCommand('mceShowCharmap');
        }
      });
      editor.ui.registry.addMenuItem('charmap', {
        icon: 'insert-character',
        text: 'Special character...',
        onAction: function () {
          return editor.execCommand('mceShowCharmap');
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('charmap', function (editor) {
      var charMap = CharMap.getCharMap(editor);
      Commands.register(editor, charMap);
      Buttons.register(editor);
      init(editor, charMap[0]);
      return Api.get(editor);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
