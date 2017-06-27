(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Taggd = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":22}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":23}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-integer"), __esModule: true };
},{"core-js/library/fn/number/is-integer":24}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-nan"), __esModule: true };
},{"core-js/library/fn/number/is-nan":25}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/parse-float"), __esModule: true };
},{"core-js/library/fn/number/parse-float":26}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":27}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":28}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":29}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/entries"), __esModule: true };
},{"core-js/library/fn/object/entries":30}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":31}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":32}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":33}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":34}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":35}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":8}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":10,"../core-js/object/get-prototype-of":11}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":7,"../core-js/object/set-prototype-of":12,"../helpers/typeof":21}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":21}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":1,"../core-js/is-iterable":2}],21:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":13,"../core-js/symbol/iterator":14}],22:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":102,"../modules/es6.string.iterator":115,"../modules/web.dom.iterable":120}],23:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":103,"../modules/es6.string.iterator":115,"../modules/web.dom.iterable":120}],24:[function(require,module,exports){
require('../../modules/es6.number.is-integer');
module.exports = require('../../modules/_core').Number.isInteger;
},{"../../modules/_core":42,"../../modules/es6.number.is-integer":105}],25:[function(require,module,exports){
require('../../modules/es6.number.is-nan');
module.exports = require('../../modules/_core').Number.isNaN;
},{"../../modules/_core":42,"../../modules/es6.number.is-nan":106}],26:[function(require,module,exports){
require('../../modules/es6.number.parse-float');
module.exports = parseFloat;
},{"../../modules/es6.number.parse-float":107}],27:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":42,"../../modules/es6.object.assign":108}],28:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":42,"../../modules/es6.object.create":109}],29:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":42,"../../modules/es6.object.define-property":110}],30:[function(require,module,exports){
require('../../modules/es7.object.entries');
module.exports = require('../../modules/_core').Object.entries;
},{"../../modules/_core":42,"../../modules/es7.object.entries":117}],31:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":42,"../../modules/es6.object.get-own-property-descriptor":111}],32:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":42,"../../modules/es6.object.get-prototype-of":112}],33:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":42,"../../modules/es6.object.set-prototype-of":113}],34:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":42,"../../modules/es6.object.to-string":114,"../../modules/es6.symbol":116,"../../modules/es7.symbol.async-iterator":118,"../../modules/es7.symbol.observable":119}],35:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":99,"../../modules/es6.string.iterator":115,"../../modules/web.dom.iterable":120}],36:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],37:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],38:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":59}],39:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":91,"./_to-iobject":93,"./_to-length":94}],40:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":41,"./_wks":100}],41:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],42:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],43:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":36}],44:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],45:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":50}],46:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":51,"./_is-object":59}],47:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],48:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":74,"./_object-keys":77,"./_object-pie":78}],49:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":42,"./_ctx":43,"./_global":51,"./_hide":53}],50:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],51:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],52:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],53:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":45,"./_object-dp":69,"./_property-desc":82}],54:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":51}],55:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":45,"./_dom-create":46,"./_fails":50}],56:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":41}],57:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":41}],58:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":59}],59:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],60:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":53,"./_object-create":68,"./_property-desc":82,"./_set-to-string-tag":85,"./_wks":100}],61:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":49,"./_has":52,"./_hide":53,"./_iter-create":60,"./_iterators":63,"./_library":65,"./_object-gpo":75,"./_redefine":83,"./_set-to-string-tag":85,"./_wks":100}],62:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],63:[function(require,module,exports){
module.exports = {};
},{}],64:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":77,"./_to-iobject":93}],65:[function(require,module,exports){
module.exports = true;
},{}],66:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":50,"./_has":52,"./_is-object":59,"./_object-dp":69,"./_uid":97}],67:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":50,"./_iobject":56,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_to-object":95}],68:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":38,"./_dom-create":46,"./_enum-bug-keys":47,"./_html":54,"./_object-dps":70,"./_shared-key":86}],69:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":38,"./_descriptors":45,"./_ie8-dom-define":55,"./_to-primitive":96}],70:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":38,"./_descriptors":45,"./_object-dp":69,"./_object-keys":77}],71:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":45,"./_has":52,"./_ie8-dom-define":55,"./_object-pie":78,"./_property-desc":82,"./_to-iobject":93,"./_to-primitive":96}],72:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":73,"./_to-iobject":93}],73:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":47,"./_object-keys-internal":76}],74:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],75:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":52,"./_shared-key":86,"./_to-object":95}],76:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":39,"./_has":52,"./_shared-key":86,"./_to-iobject":93}],77:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":47,"./_object-keys-internal":76}],78:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],79:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":42,"./_export":49,"./_fails":50}],80:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":77,"./_object-pie":78,"./_to-iobject":93}],81:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":51,"./_string-trim":89,"./_string-ws":90}],82:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],83:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":53}],84:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":38,"./_ctx":43,"./_is-object":59,"./_object-gopd":71}],85:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":52,"./_object-dp":69,"./_wks":100}],86:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":87,"./_uid":97}],87:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":51}],88:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":44,"./_to-integer":92}],89:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":44,"./_export":49,"./_fails":50,"./_string-ws":90}],90:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],91:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":92}],92:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],93:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":44,"./_iobject":56}],94:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":92}],95:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":44}],96:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":59}],97:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],98:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":42,"./_global":51,"./_library":65,"./_object-dp":69,"./_wks-ext":99}],99:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":100}],100:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":51,"./_shared":87,"./_uid":97}],101:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":40,"./_core":42,"./_iterators":63,"./_wks":100}],102:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":38,"./_core":42,"./core.get-iterator-method":101}],103:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":40,"./_core":42,"./_iterators":63,"./_wks":100}],104:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":37,"./_iter-define":61,"./_iter-step":62,"./_iterators":63,"./_to-iobject":93}],105:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":49,"./_is-integer":58}],106:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":49}],107:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":49,"./_parse-float":81}],108:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":49,"./_object-assign":67}],109:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":49,"./_object-create":68}],110:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":45,"./_export":49,"./_object-dp":69}],111:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":71,"./_object-sap":79,"./_to-iobject":93}],112:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":75,"./_object-sap":79,"./_to-object":95}],113:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":49,"./_set-proto":84}],114:[function(require,module,exports){

},{}],115:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":61,"./_string-at":88}],116:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":38,"./_descriptors":45,"./_enum-keys":48,"./_export":49,"./_fails":50,"./_global":51,"./_has":52,"./_hide":53,"./_is-array":57,"./_keyof":64,"./_library":65,"./_meta":66,"./_object-create":68,"./_object-dp":69,"./_object-gopd":71,"./_object-gopn":73,"./_object-gopn-ext":72,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_property-desc":82,"./_redefine":83,"./_set-to-string-tag":85,"./_shared":87,"./_to-iobject":93,"./_to-primitive":96,"./_uid":97,"./_wks":100,"./_wks-define":98,"./_wks-ext":99}],117:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":49,"./_object-to-array":80}],118:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":98}],119:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":98}],120:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":51,"./_hide":53,"./_iterators":63,"./_wks":100,"./es6.array.iterator":104}],121:[function(require,module,exports){
// http://stackoverflow.com/questions/442404/dynamically-retrieve-the-position-x-y-of-an-html-element
module.exports = function(el) {
  if (el.getBoundingClientRect) {
      return el.getBoundingClientRect();
  }
  else {
    var x = 0, y = 0;
    do {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
    } 
    while (el = el.offsetParent);

    return { "left": x, "top": y }
  }
}
},{}],122:[function(require,module,exports){

/**
 * get the window's scrolltop.
 * 
 * @return {Number}
 */

module.exports = function(){
  if (window.pageYOffset) return window.pageYOffset;
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

},{}],123:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = require('../util/event-emitter');
var ObjectIs = require('../util/object-is');
var TypeErrorMessage = require('../util/type-error-message');

var Tag = function (_EventEmitter) {
  (0, _inherits3.default)(Tag, _EventEmitter);

  /**
   * Create a new Tag instance
   * @param {{ x: Number, y: Number }} position - The tag’s coordinates
   * @param {String|Function} text - The tag’s content
   * @param {Object} [buttonAttributes = {}] - The button’s attributes
   * @param {Object} [popupAttributes = {}] - The popup’s attributes
   */
  function Tag(position, text) {
    var buttonAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var popupAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck3.default)(this, Tag);

    if (!ObjectIs.ofType(position, 'object') || Array.isArray(position)) {
      throw new TypeError(TypeErrorMessage.getObjectMessage(position));
    } else if (!('x' in position) || !('y' in position)) {
      throw new Error(position + ' should have x and y property');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call(this));

    _this.wrapperElement = document.createElement('div');
    _this.wrapperElement.classList.add('taggd__wrapper');

    _this.buttonElement = document.createElement('button');
    _this.buttonElement.classList.add('taggd__button');

    _this.popupElement = document.createElement('span');
    _this.popupElement.classList.add('taggd__popup');

    _this.wrapperElement.appendChild(_this.buttonElement);
    _this.wrapperElement.appendChild(_this.popupElement);

    _this.isControlsEnabled = false;
    _this.inputLabelElement = undefined;
    _this.buttonSaveElement = undefined;
    _this.buttonDeleteElement = undefined;

    _this.buttonSaveElementClickHandler = function () {
      return _this.setText(_this.inputLabelElement.value);
    };
    _this.buttonDeleteElementClickHandler = function () {
      _this.emit('taggd.tag.delete', _this);
    };

    _this.text = undefined;

    _this.setButtonAttributes(buttonAttributes);
    _this.setPopupAttributes(popupAttributes);
    _this.setPosition(position.x, position.y);
    _this.setText(text);

    _this.hide();
    return _this;
  }

  /**
   * Subscribe to an event.
   * @param {String} eventName - The event to subscribe to.
   * @param {Function} handler - The handler to execute.
   * @return {Taggd} Current Taggd instance
   */


  (0, _createClass3.default)(Tag, [{
    key: 'on',
    value: function on(eventName, handler) {
      return (0, _get3.default)(Tag.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tag.prototype), 'on', this).call(this, eventName, handler);
    }

    /**
     * Unsubscribe from an event.
     * @param {String} eventName - The event to unsubscribe from.
     * @param {Function} handler - The handler that was used to subscribe.
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'off',
    value: function off(eventName, handler) {
      return (0, _get3.default)(Tag.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tag.prototype), 'off', this).call(this, eventName, handler);
    }

    /**
     * Subscribe to an event and unsubscribe once triggered.
     * @param {String} eventName - The event to subscribe to.
     * @param {Function} handler - The handler to execute.
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'once',
    value: function once(eventName, handler) {
      return (0, _get3.default)(Tag.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tag.prototype), 'once', this).call(this, eventName, handler);
    }

    /**
     * Test whether the tag is hidden or not
     * @return {Boolean} A boolean indicating the tag’s state
     */

  }, {
    key: 'isHidden',
    value: function isHidden() {
      return this.popupElement.style.display === 'none';
    }

    /**
     * Show the tag
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'show',
    value: function show() {
      var isCanceled = !this.emit('taggd.tag.show', this);

      if (!isCanceled) {
        this.popupElement.style.display = '';
        this.emit('taggd.tag.shown', this);
      }

      return this;
    }

    /**
     * Hide the tag
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'hide',
    value: function hide() {
      var isCanceled = !this.emit('taggd.tag.hide', this);

      if (!isCanceled) {
        this.popupElement.style.display = 'none';
        this.emit('taggd.tag.hidden', this);
      }

      return this;
    }

    /**
     * Set the tag’s text
     * @param {String|Function} text - The tag’s content
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'setText',
    value: function setText(text) {
      if (!ObjectIs.ofType(text, 'string') && !ObjectIs.function(text)) {
        throw new TypeError(TypeErrorMessage.getMessage(text, 'a string or a function'));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

      if (!isCanceled) {
        if (ObjectIs.function(text)) {
          this.text = text(this);
        } else {
          this.text = text;
        }

        if (!this.isControlsEnabled) {
          this.popupElement.innerHTML = this.text;
        } else {
          this.inputLabelElement.value = this.text;
        }

        this.emit('taggd.tag.changed', this);
      }

      return this;
    }

    /**
     * Set the tag’s position
     * @param {Number} x - The tag’s x-coordinate
     * @param {Number} y - The tag’s y-coordinate
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      if (!ObjectIs.number(x)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(x));
      }
      if (!ObjectIs.number(y)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(y));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

      if (!isCanceled) {
        var positionStyle = Tag.getPositionStyle(x, y);

        this.wrapperElement.style.left = positionStyle.left;
        this.wrapperElement.style.top = positionStyle.top;

        this.emit('taggd.tag.changed', this);
      }

      return this;
    }

    /**
     * Set the tag button’s attributes
     * @param {Object} atttributes = {} - The attributes to set
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'setButtonAttributes',
    value: function setButtonAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

      if (!isCanceled) {
        Tag.setElementAttributes(this.buttonElement, attributes);
        this.emit('taggd.tag.changed', this);
      }

      return this;
    }

    /**
     * Set the tag popup’s attributes
     * @param {Object} atttributes = {} - The attributes to set
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'setPopupAttributes',
    value: function setPopupAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

      if (!isCanceled) {
        Tag.setElementAttributes(this.popupElement, attributes);
        this.emit('taggd.tag.changed', this);
      }

      return this;
    }

    /**
     * Enables the tag controls
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'enableControls',
    value: function enableControls() {
      this.isControlsEnabled = true;

      this.inputLabelElement = document.createElement('input');
      this.buttonSaveElement = document.createElement('button');
      this.buttonDeleteElement = document.createElement('button');

      this.inputLabelElement.classList.add('taggd__editor-input');
      this.buttonSaveElement.classList.add('taggd__editor-button', 'taggd__editor-button--save');
      this.buttonDeleteElement.classList.add('taggd__editor-button', 'taggd__editor-button--delete');

      this.buttonSaveElement.innerHTML = Tag.LABEL_BUTTON_SAVE;
      this.buttonDeleteElement.innerHTML = Tag.LABEL_BUTTON_DELETE;

      this.buttonSaveElement.addEventListener('click', this.buttonSaveElementClickHandler);
      this.buttonDeleteElement.addEventListener('click', this.buttonDeleteElementClickHandler);

      this.popupElement.innerHTML = '';
      this.popupElement.appendChild(this.inputLabelElement);
      this.popupElement.appendChild(this.buttonSaveElement);
      this.popupElement.appendChild(this.buttonDeleteElement);

      // Set input content
      this.setText(this.text);
      return this;
    }

    /**
     * Disabled the tag controls
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'disableControls',
    value: function disableControls() {
      this.isControlsEnabled = false;

      this.inputLabelElement = undefined;
      this.buttonSaveElement = undefined;
      this.buttonDeleteElement = undefined;

      // Remove elements and set set content
      this.setText(this.text);
      return this;
    }

    /**
     * Get a Taggd.createFromObject-compatible object
     * @return {Object} A object for JSON
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      function getAttributes(rawAttributes) {
        var attributes = {};

        Array.prototype.forEach.call(rawAttributes, function (attribute) {
          if (attribute.name === 'class' || attribute.name === 'style') {
            return;
          }

          attributes[attribute.name] = attribute.value;
        });

        return attributes;
      }

      return {
        position: {
          x: parseFloat(this.wrapperElement.style.left) / 100,
          y: parseFloat(this.wrapperElement.style.top) / 100
        },
        text: this.text,
        buttonAttributes: getAttributes(this.buttonElement.attributes),
        popupAttributes: getAttributes(this.popupElement.attributes)
      };
    }

    /**
     * Set element attributes
     * @param {DomNode} element - The element the attributes should be set to
     * @param {Object} [attributes = {}] - A map of attributes to set
     * @return {DomNode} The original element
     */

  }], [{
    key: 'setElementAttributes',
    value: function setElementAttributes(element) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
      }

      (0, _entries2.default)(attributes).forEach(function (attribute) {
        var _attribute = (0, _slicedToArray3.default)(attribute, 2),
            attributeName = _attribute[0],
            attributeValue = _attribute[1];

        if (attributeName === 'class' && element.getAttribute(attributeName)) {
          var classValue = element.getAttribute(attributeName) + ' ' + attributeValue;
          element.setAttribute(attributeName, classValue);
          return;
        }

        element.setAttribute(attributeName, attributeValue);
      });

      return element;
    }

    /**
     * Get the position style
     * @param {Number} x - The tag’s x-coordinate
     * @param {Number} y - The tag’s y-coordinate
     * @return {Object} The style
     */

  }, {
    key: 'getPositionStyle',
    value: function getPositionStyle(x, y) {
      if (!ObjectIs.number(x)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(x));
      }
      if (!ObjectIs.number(y)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(y));
      }

      return {
        left: x * 100 + '%',
        top: y * 100 + '%'
      };
    }

    /**
     * Create a tag from object
     * @param {Object} object - The object containing all information
     * @return {Tag} The created Tag instance
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(object) {
      return new Tag(object.position, object.text, object.buttonAttributes, object.popupAttributes);
    }
  }]);
  return Tag;
}(EventEmitter);

/**
 * Label for a new tag
 * @const
 * @type {String}
 * @ignore
 */


Tag.LABEL_NEW_TAG = 'New tag';
/**
 * Label for save button
 * @const
 * @type {String}
 * @ignore
 */
Tag.LABEL_BUTTON_SAVE = 'save';
/**
 * Label for delete button
 * @const
 * @type {String}
 */
Tag.LABEL_BUTTON_DELETE = 'delete';

module.exports = Tag;

},{"../util/event-emitter":126,"../util/object-is":127,"../util/type-error-message":128,"babel-runtime/core-js/object/entries":9,"babel-runtime/core-js/object/get-prototype-of":11,"babel-runtime/helpers/classCallCheck":15,"babel-runtime/helpers/createClass":16,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19,"babel-runtime/helpers/slicedToArray":20}],124:[function(require,module,exports){
'use strict';

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getElementOffset = require('offset');
var getScrollTop = require('scrolltop');

var Tag = require('./Tag');
var EventEmitter = require('../util/event-emitter');
var ObjectIs = require('../util/object-is');
var TypeErrorMessage = require('../util/type-error-message');

var Taggd = function (_EventEmitter) {
  (0, _inherits3.default)(Taggd, _EventEmitter);

  /**
   * Create a new taggd instance
   * @param {HTMLElement} image - The image to wrap
   * @param {Object} [options = {}] - The [options]{@link https://doclets.io/timseverien/taggd/master/options}
   * @param {Array} [data = []] - The [tags]{@link https://timseverien.github.io/taggd/v3/generator}
   */
  function Taggd(image) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    (0, _classCallCheck3.default)(this, Taggd);

    if (!image instanceof Element) {
      throw new TypeError(TypeErrorMessage.getMessage(image, Element));
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (Taggd.__proto__ || (0, _getPrototypeOf2.default)(Taggd)).call(this));

    _this.wrapper = document.createElement('div');
    _this.wrapper.classList.add('taggd');

    image.classList.add('taggd__image');

    image.parentElement.insertBefore(_this.wrapper, image);
    image.parentElement.removeChild(image);
    _this.wrapper.appendChild(image);

    _this.image = image;
    _this.options = {};
    _this.tags = [];

    _this.imageClickHandler = function (e) {
      var scrollTop = getScrollTop();
      var offset = getElementOffset(_this.image);

      var position = {
        x: (e.pageX - offset.left) / _this.image.width,
        y: (e.pageY - offset.top - scrollTop) / _this.image.height
      };

      var tag = new Tag(position, Tag.LABEL_NEW_TAG);
      tag.enableControls();

      _this.addTag(tag);
    };

    _this.setOptions(options);
    _this.setTags(data);
    return _this;
  }

  /**
   * Subscribe to an event.
   * @param {String} eventName - The event to subscribe to.
   * @param {Function} handler - The handler to execute.
   * @return {Taggd} Current Taggd instance
   */


  (0, _createClass3.default)(Taggd, [{
    key: 'on',
    value: function on(eventName, handler) {
      return (0, _get3.default)(Taggd.prototype.__proto__ || (0, _getPrototypeOf2.default)(Taggd.prototype), 'on', this).call(this, eventName, handler);
    }

    /**
     * Unsubscribe from an event.
     * @param {String} eventName - The event to unsubscribe from.
     * @param {Function} handler - The handler that was used to subscribe.
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'off',
    value: function off(eventName, handler) {
      return (0, _get3.default)(Taggd.prototype.__proto__ || (0, _getPrototypeOf2.default)(Taggd.prototype), 'off', this).call(this, eventName, handler);
    }

    /**
     * Subscribe to an event and unsubscribe once triggered.
     * @param {String} eventName - The event to subscribe to.
     * @param {Function} handler - The handler to execute.
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'once',
    value: function once(eventName, handler) {
      return (0, _get3.default)(Taggd.prototype.__proto__ || (0, _getPrototypeOf2.default)(Taggd.prototype), 'once', this).call(this, eventName, handler);
    }

    /**
     * Set taggd options
     * @param {Object} options - The options to set
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      if (!ObjectIs.ofType(options, 'object') || Array.isArray(options)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(options));
      }

      this.options = (0, _assign2.default)(this.options, Taggd.DEFAULT_OPTIONS, options);
      return this;
    }

    /**
     * Add a single tag
     * @param {Taggd.Tag} tag - The tag to add
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'addTag',
    value: function addTag(tag) {
      var _this2 = this;

      if (!ObjectIs.ofInstance(tag, Tag)) {
        throw new TypeError(TypeErrorMessage.getTagMessage(tag));
      }

      var isCanceled = !this.emit('taggd.tag.add', this, tag);
      var hideTimeout = void 0;

      /**
       * Test whether the event’s target is the button Element
       * @param {Event} e - The event object
       * @return {Boolean} Whether the event’s target is the button element
       */
      var isTargetButton = function isTargetButton(e) {
        return e.target === tag.buttonElement;
      };
      var clearTimeout = function clearTimeout() {
        if (hideTimeout) {
          window.clearTimeout(hideTimeout);
          hideTimeout = undefined;
        }
      };

      if (!isCanceled) {
        // Add events to show/hide tags
        // If show and hide event are identical, set show/hide mode to toggle
        if (this.options.show === this.options.hide) {
          tag.buttonElement.addEventListener(this.options.show, function (e) {
            if (!isTargetButton(e)) return;

            clearTimeout();

            if (tag.isHidden()) {
              tag.show();
            } else {
              tag.hide();
            }
          });
        } else {
          tag.buttonElement.addEventListener(this.options.show, function (e) {
            if (!isTargetButton(e)) return;

            clearTimeout();
            tag.show();
          });
          tag.buttonElement.addEventListener(this.options.hide, function (e) {
            if (!isTargetButton(e)) return;

            clearTimeout();

            // If the use moves the mouse between the button and popup, a delay should give some time
            // to do just that. This only applies to the mouseleave event.
            if (_this2.options.hide === 'mouseleave') {
              hideTimeout = window.setTimeout(function () {
                return tag.hide();
              }, _this2.options.hideDelay);
            } else {
              tag.hide();
            }
          });

          // Force visibility if user interacts with the popup element
          if (this.options.hide === 'mouseleave') {
            tag.popupElement.addEventListener('mouseover', function () {
              return clearTimeout();
            });
            tag.popupElement.addEventListener('mouseleave', function () {
              return tag.hide();
            });
          }
        }

        tag.once('taggd.tag.delete', function () {
          var tagIndex = _this2.tags.indexOf(tag);

          if (tagIndex >= 0) {
            _this2.deleteTag(tagIndex);
          }
        });

        // Route all tag events through taggd instance
        tag.onAnything(function (eventName) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [eventName, _this2].concat(args));
        });

        this.tags.push(tag);
        this.wrapper.appendChild(tag.wrapperElement);

        this.emit('taggd.tag.added', this, tag);
      }

      return this;
    }

    /**
     * Get a single tag by index
     * @param  {Number} index - The index of the desired tag
     * @return {Taggd.Tag} The tag to get
     */

  }, {
    key: 'getTag',
    value: function getTag(index) {
      if (!(0, _isInteger2.default)(index)) {
        throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
      }

      return this.tags[index];
    }

    /**
     * Delete a single tag by index
     * @param {Number} index - The index of the desired tag
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'deleteTag',
    value: function deleteTag(index) {
      if (!(0, _isInteger2.default)(index)) {
        throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
      }

      if (!this.tags[index]) {
        throw new Error('Tag at index ' + index + ' does not exist.');
      }

      var tag = this.tags[index];
      var isCanceled = !this.emit('taggd.tag.delete', this, tag);

      if (!isCanceled) {
        this.wrapper.removeChild(tag.wrapperElement);
        this.tags.splice(index, 1);

        this.emit('taggd.tag.deleted', this, tag);
      }

      return this;
    }

    /**
     * Set all tags
     * @param {Taggd.Tag[]} tags An array of tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'setTags',
    value: function setTags(tags) {
      this.deleteTags();
      this.addTags(tags);
      return this;
    }

    /**
     * Add multiple tags
     * @param {Taggd.Tag[]} tags - An array of tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'addTags',
    value: function addTags(tags) {
      var _this3 = this;

      if (!Array.isArray(tags)) {
        throw new TypeError(TypeErrorMessage.getArrayMessage(tags, 'Taggd.Tag'));
      }

      tags.forEach(function (tag) {
        return _this3.addTag(tag);
      });
      return this;
    }

    /**
     * Get all tags
     * @return {Taggd.Tag[]} All tags of this Taggd instance
     */

  }, {
    key: 'getTags',
    value: function getTags() {
      return this.tags;
    }

    /**
     * Remove all tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'deleteTags',
    value: function deleteTags() {
      while (this.tags.length > 0) {
        this.deleteTag(0);
      }
      return this;
    }

    /**
     * Iterate and replace all tags
     * @param {Function} callback - The callback to execute for all tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'map',
    value: function map(callback) {
      if (!ObjectIs.function(callback)) {
        throw new TypeError(TypeErrorMessage.getFunctionMessage(callback));
      }

      this.tags = this.tags.map(callback);
      return this;
    }

    /**
     * Clean up memory
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var isCanceled = !this.emit('taggd.destroy', this);

      if (!isCanceled) {
        this.deleteTags();
      }

      return this;
    }

    /**
     * Enable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'enableEditorMode',
    value: function enableEditorMode() {
      var isCanceled = !this.emit('taggd.editor.enable', this);

      if (!isCanceled) {
        this.image.addEventListener('click', this.imageClickHandler);
        this.getTags().forEach(function (tag) {
          return tag.enableControls();
        });
      }

      return this;
    }

    /**
     * Disable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'disableEditorMode',
    value: function disableEditorMode() {
      var isCanceled = !this.emit('taggd.editor.disable', this);

      if (!isCanceled) {
        this.image.removeEventListener('click', this.imageClickHandler);
        this.getTags().forEach(function (tag) {
          return tag.disableControls();
        });
      }

      return this;
    }
  }]);
  return Taggd;
}(EventEmitter);

/**
 * Default options for all Taggd instances
 * @const
 * @type {Object}
 * @ignore
 */


Taggd.DEFAULT_OPTIONS = {
  show: 'mouseenter',
  hide: 'mouseleave',
  hideDelay: 500
};

module.exports = Taggd;
module.exports.Tag = Tag;

window.Taggd = module.exports;

},{"../util/event-emitter":126,"../util/object-is":127,"../util/type-error-message":128,"./Tag":123,"babel-runtime/core-js/number/is-integer":3,"babel-runtime/core-js/object/assign":6,"babel-runtime/core-js/object/get-prototype-of":11,"babel-runtime/helpers/classCallCheck":15,"babel-runtime/helpers/createClass":16,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19,"offset":121,"scrolltop":122}],125:[function(require,module,exports){
'use strict';

var _Tag = require('./classes/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Taggd = require('./classes/Taggd');

var _Taggd2 = _interopRequireDefault(_Taggd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Taggd2.default.Tag = _Tag2.default;

module.exports = _Taggd2.default;

},{"./classes/Tag":123,"./classes/Taggd":124}],126:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_WILDCARD = '*';

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3.default)(this, EventEmitter);

    this.handlers = {};
  }

  (0, _createClass3.default)(EventEmitter, [{
    key: 'onAnything',
    value: function onAnything(handler) {
      this.on(EVENT_WILDCARD, handler);
    }
  }, {
    key: 'on',
    value: function on(eventName, handler) {
      if (!this.handlers[eventName]) {
        this.handlers[eventName] = [];
      }

      this.handlers[eventName].push(handler);
    }
  }, {
    key: 'off',
    value: function off(eventName, handler) {
      if (!this.handlers[eventName]) return;

      var handlerIndex = this.handlers[eventName].indexOf(handler);

      if (handlerIndex >= 0) {
        this.handlers[eventName].splice(handlerIndex, 1);
      }
    }
  }, {
    key: 'once',
    value: function once(eventName, handler) {
      var _this = this;

      this.on(eventName, function () {
        handler.apply(undefined, arguments);
        _this.off(eventName, handler);
      });
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var isCanceled = false;

      if (this.handlers[EVENT_WILDCARD]) {
        this.handlers[EVENT_WILDCARD].forEach(function (eventHandler) {
          var returnValue = eventHandler.apply(undefined, [eventName].concat(args));
          isCanceled = returnValue !== undefined && !returnValue || isCanceled;
        });
      }

      if (this.handlers[eventName]) {
        this.handlers[eventName].forEach(function (eventHandler) {
          var returnValue = eventHandler.apply(undefined, args);
          isCanceled = returnValue !== undefined && !returnValue || isCanceled;
        });
      }

      return !isCanceled;
    }
  }]);
  return EventEmitter;
}();

module.exports = EventEmitter;

},{"babel-runtime/helpers/classCallCheck":15,"babel-runtime/helpers/createClass":16}],127:[function(require,module,exports){
'use strict';

var _parseFloat = require('babel-runtime/core-js/number/parse-float');

var _parseFloat2 = _interopRequireDefault(_parseFloat);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  /**
   * Check wheter an object is an instance of type
   * @param {Object} object - The object to test
   * @param {Object} type - The class to test
   * @return {Boolean}
   */
  ofInstance: function ofInstance(object, type) {
    return object instanceof type;
  },

  /**
   * Check whether an object is equals to given type
   * @param {Object} object - The object to test
   * @param {String} type - The type to test
   * @return {Boolean}
   */
  ofType: function ofType(object, type) {
    return (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === type;
  },

  /**
   * Check whether given object is a function
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  function: function _function(object) {
    return typeof object === 'function';
  },

  /**
   * Check whether given object is a Number
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  number: function number(object) {
    return !(0, _isNan2.default)((0, _parseFloat2.default)(object));
  }
};

},{"babel-runtime/core-js/number/is-nan":4,"babel-runtime/core-js/number/parse-float":5,"babel-runtime/helpers/typeof":21}],128:[function(require,module,exports){
'use strict';

var TypeErrorMessage = {
  /**
   * Get the TypeError message
   * @param {Object} object - The tested object
   * @param {String} expectedType - A string describing the expected type
   * @return {String} The error message
   */
  getMessage: function getMessage(object, expectedType) {
    return object + ' should be ' + expectedType;
  },

  /**
   * Get the TypeError Array message
   * @param {Object} object - The tested object
   * @param {String} expectedType - The expected type of all array items
   * @return {String} The error message
   */
  getArrayMessage: function getArrayMessage(object, expectedType) {
    if (expectedType) {
      return TypeErrorMessage.getTypeErrorMessage(object, 'an array of ' + expectedType);
    }
    return TypeErrorMessage.getTypeErrorMessage(object, 'an array');
  },

  /**
   * Get the TypeError Function message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getFunctionMessage: function getFunctionMessage(object) {
    return TypeErrorMessage.getTypeErrorMessage(object, 'a function');
  },

  /**
   * Get the TypeError Integer message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getIntegerMessage: function getIntegerMessage(object) {
    return TypeErrorMessage.getTypeErrorMessage(object, 'an integer');
  },

  /**
   * Get the TypeError Float message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getFloatMessage: function getFloatMessage(object) {
    return TypeErrorMessage.getTypeErrorMessage(object, 'a floating number');
  },

  /**
   * Get the TypeError Object message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getObjectMessage: function getObjectMessage(object) {
    return TypeErrorMessage.getTypeErrorMessage(object, 'an object');
  },

  /**
   * Get the TypeError Taggd.Tag message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getTagMessage: function getTagMessage(object) {
    return TypeErrorMessage.getTypeErrorMessage(object, 'a tag');
  },

  /**
   * Get TypeError message
   * @param {Object} object - The tested object
   * @param {String} message - The type message
   * @return {String} The error message
   */
  getTypeErrorMessage: function getTypeErrorMessage(object, message) {
    return object + ' is not a ' + message;
  }
};

module.exports = TypeErrorMessage;

},{}]},{},[125])(125)
});