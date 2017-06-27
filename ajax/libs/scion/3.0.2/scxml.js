(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

_dereq_(295);

_dereq_(296);

_dereq_(2);

/* eslint max-len: 0 */

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

// Should be removed in the next major release:

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2,"295":295,"296":296}],2:[function(_dereq_,module,exports){
_dereq_(119);
module.exports = _dereq_(23).RegExp.escape;
},{"119":119,"23":23}],3:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(_dereq_,module,exports){
var cof = _dereq_(18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"18":18}],5:[function(_dereq_,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _dereq_(117)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)_dereq_(40)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"117":117,"40":40}],6:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],7:[function(_dereq_,module,exports){
var isObject = _dereq_(49);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"49":49}],8:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = _dereq_(109)
  , toIndex  = _dereq_(105)
  , toLength = _dereq_(108);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"105":105,"108":108,"109":109}],9:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = _dereq_(109)
  , toIndex  = _dereq_(105)
  , toLength = _dereq_(108);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"105":105,"108":108,"109":109}],10:[function(_dereq_,module,exports){
var forOf = _dereq_(37);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"37":37}],11:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_(107)
  , toLength  = _dereq_(108)
  , toIndex   = _dereq_(105);
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
},{"105":105,"107":107,"108":108}],12:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_(25)
  , IObject  = _dereq_(45)
  , toObject = _dereq_(109)
  , toLength = _dereq_(108)
  , asc      = _dereq_(15);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"108":108,"109":109,"15":15,"25":25,"45":45}],13:[function(_dereq_,module,exports){
var aFunction = _dereq_(3)
  , toObject  = _dereq_(109)
  , IObject   = _dereq_(45)
  , toLength  = _dereq_(108);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"108":108,"109":109,"3":3,"45":45}],14:[function(_dereq_,module,exports){
var isObject = _dereq_(49)
  , isArray  = _dereq_(47)
  , SPECIES  = _dereq_(117)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"117":117,"47":47,"49":49}],15:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _dereq_(14);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"14":14}],16:[function(_dereq_,module,exports){
'use strict';
var aFunction  = _dereq_(3)
  , isObject   = _dereq_(49)
  , invoke     = _dereq_(44)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"3":3,"44":44,"49":49}],17:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_(18)
  , TAG = _dereq_(117)('toStringTag')
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
},{"117":117,"18":18}],18:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(_dereq_,module,exports){
'use strict';
var dP          = _dereq_(67).f
  , create      = _dereq_(66)
  , redefineAll = _dereq_(86)
  , ctx         = _dereq_(25)
  , anInstance  = _dereq_(6)
  , defined     = _dereq_(27)
  , forOf       = _dereq_(37)
  , $iterDefine = _dereq_(53)
  , step        = _dereq_(55)
  , setSpecies  = _dereq_(91)
  , DESCRIPTORS = _dereq_(28)
  , fastKey     = _dereq_(62).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"25":25,"27":27,"28":28,"37":37,"53":53,"55":55,"6":6,"62":62,"66":66,"67":67,"86":86,"91":91}],20:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = _dereq_(17)
  , from    = _dereq_(10);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"10":10,"17":17}],21:[function(_dereq_,module,exports){
'use strict';
var redefineAll       = _dereq_(86)
  , getWeak           = _dereq_(62).getWeak
  , anObject          = _dereq_(7)
  , isObject          = _dereq_(49)
  , anInstance        = _dereq_(6)
  , forOf             = _dereq_(37)
  , createArrayMethod = _dereq_(12)
  , $has              = _dereq_(39)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"12":12,"37":37,"39":39,"49":49,"6":6,"62":62,"7":7,"86":86}],22:[function(_dereq_,module,exports){
'use strict';
var global            = _dereq_(38)
  , $export           = _dereq_(32)
  , redefine          = _dereq_(87)
  , redefineAll       = _dereq_(86)
  , meta              = _dereq_(62)
  , forOf             = _dereq_(37)
  , anInstance        = _dereq_(6)
  , isObject          = _dereq_(49)
  , fails             = _dereq_(34)
  , $iterDetect       = _dereq_(54)
  , setToStringTag    = _dereq_(92)
  , inheritIfRequired = _dereq_(43);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"32":32,"34":34,"37":37,"38":38,"43":43,"49":49,"54":54,"6":6,"62":62,"86":86,"87":87,"92":92}],23:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],24:[function(_dereq_,module,exports){
'use strict';
var $defineProperty = _dereq_(67)
  , createDesc      = _dereq_(85);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"67":67,"85":85}],25:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_(3);
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
},{"3":3}],26:[function(_dereq_,module,exports){
'use strict';
var anObject    = _dereq_(7)
  , toPrimitive = _dereq_(110)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"110":110,"7":7}],27:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_(34)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"34":34}],29:[function(_dereq_,module,exports){
var isObject = _dereq_(49)
  , document = _dereq_(38).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"38":38,"49":49}],30:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],31:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_(76)
  , gOPS    = _dereq_(73)
  , pIE     = _dereq_(77);
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
},{"73":73,"76":76,"77":77}],32:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , core      = _dereq_(23)
  , hide      = _dereq_(40)
  , redefine  = _dereq_(87)
  , ctx       = _dereq_(25)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
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
},{"23":23,"25":25,"38":38,"40":40,"87":87}],33:[function(_dereq_,module,exports){
var MATCH = _dereq_(117)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"117":117}],34:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],35:[function(_dereq_,module,exports){
'use strict';
var hide     = _dereq_(40)
  , redefine = _dereq_(87)
  , fails    = _dereq_(34)
  , defined  = _dereq_(27)
  , wks      = _dereq_(117);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"117":117,"27":27,"34":34,"40":40,"87":87}],36:[function(_dereq_,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = _dereq_(7);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"7":7}],37:[function(_dereq_,module,exports){
var ctx         = _dereq_(25)
  , call        = _dereq_(51)
  , isArrayIter = _dereq_(46)
  , anObject    = _dereq_(7)
  , toLength    = _dereq_(108)
  , getIterFn   = _dereq_(118)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"108":108,"118":118,"25":25,"46":46,"51":51,"7":7}],38:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],39:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],40:[function(_dereq_,module,exports){
var dP         = _dereq_(67)
  , createDesc = _dereq_(85);
module.exports = _dereq_(28) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"28":28,"67":67,"85":85}],41:[function(_dereq_,module,exports){
module.exports = _dereq_(38).document && document.documentElement;
},{"38":38}],42:[function(_dereq_,module,exports){
module.exports = !_dereq_(28) && !_dereq_(34)(function(){
  return Object.defineProperty(_dereq_(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"28":28,"29":29,"34":34}],43:[function(_dereq_,module,exports){
var isObject       = _dereq_(49)
  , setPrototypeOf = _dereq_(90).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"49":49,"90":90}],44:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],45:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"18":18}],46:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_(56)
  , ITERATOR   = _dereq_(117)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"117":117,"56":56}],47:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"18":18}],48:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = _dereq_(49)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"49":49}],49:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],50:[function(_dereq_,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = _dereq_(49)
  , cof      = _dereq_(18)
  , MATCH    = _dereq_(117)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"117":117,"18":18,"49":49}],51:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_(7);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"7":7}],52:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_(66)
  , descriptor     = _dereq_(85)
  , setToStringTag = _dereq_(92)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_(40)(IteratorPrototype, _dereq_(117)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"117":117,"40":40,"66":66,"85":85,"92":92}],53:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_(58)
  , $export        = _dereq_(32)
  , redefine       = _dereq_(87)
  , hide           = _dereq_(40)
  , has            = _dereq_(39)
  , Iterators      = _dereq_(56)
  , $iterCreate    = _dereq_(52)
  , setToStringTag = _dereq_(92)
  , getPrototypeOf = _dereq_(74)
  , ITERATOR       = _dereq_(117)('iterator')
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
},{"117":117,"32":32,"39":39,"40":40,"52":52,"56":56,"58":58,"74":74,"87":87,"92":92}],54:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_(117)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"117":117}],55:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],56:[function(_dereq_,module,exports){
module.exports = {};
},{}],57:[function(_dereq_,module,exports){
var getKeys   = _dereq_(76)
  , toIObject = _dereq_(107);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"107":107,"76":76}],58:[function(_dereq_,module,exports){
module.exports = false;
},{}],59:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],60:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],61:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],62:[function(_dereq_,module,exports){
var META     = _dereq_(114)('meta')
  , isObject = _dereq_(49)
  , has      = _dereq_(39)
  , setDesc  = _dereq_(67).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_dereq_(34)(function(){
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
},{"114":114,"34":34,"39":39,"49":49,"67":67}],63:[function(_dereq_,module,exports){
var Map     = _dereq_(149)
  , $export = _dereq_(32)
  , shared  = _dereq_(94)('metadata')
  , store   = shared.store || (shared.store = new (_dereq_(255)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"149":149,"255":255,"32":32,"94":94}],64:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , macrotask = _dereq_(104).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"104":104,"18":18,"38":38}],65:[function(_dereq_,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _dereq_(76)
  , gOPS     = _dereq_(73)
  , pIE      = _dereq_(77)
  , toObject = _dereq_(109)
  , IObject  = _dereq_(45)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || _dereq_(34)(function(){
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
},{"109":109,"34":34,"45":45,"73":73,"76":76,"77":77}],66:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_(7)
  , dPs         = _dereq_(68)
  , enumBugKeys = _dereq_(30)
  , IE_PROTO    = _dereq_(93)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_(41).appendChild(iframe);
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

},{"29":29,"30":30,"41":41,"68":68,"7":7,"93":93}],67:[function(_dereq_,module,exports){
var anObject       = _dereq_(7)
  , IE8_DOM_DEFINE = _dereq_(42)
  , toPrimitive    = _dereq_(110)
  , dP             = Object.defineProperty;

exports.f = _dereq_(28) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
},{"110":110,"28":28,"42":42,"7":7}],68:[function(_dereq_,module,exports){
var dP       = _dereq_(67)
  , anObject = _dereq_(7)
  , getKeys  = _dereq_(76);

module.exports = _dereq_(28) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"28":28,"67":67,"7":7,"76":76}],69:[function(_dereq_,module,exports){
// Forced replacement prototype accessors methods
module.exports = _dereq_(58)|| !_dereq_(34)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete _dereq_(38)[K];
});
},{"34":34,"38":38,"58":58}],70:[function(_dereq_,module,exports){
var pIE            = _dereq_(77)
  , createDesc     = _dereq_(85)
  , toIObject      = _dereq_(107)
  , toPrimitive    = _dereq_(110)
  , has            = _dereq_(39)
  , IE8_DOM_DEFINE = _dereq_(42)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = _dereq_(28) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"107":107,"110":110,"28":28,"39":39,"42":42,"77":77,"85":85}],71:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_(107)
  , gOPN      = _dereq_(72).f
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

},{"107":107,"72":72}],72:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = _dereq_(75)
  , hiddenKeys = _dereq_(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"30":30,"75":75}],73:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],74:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_(39)
  , toObject    = _dereq_(109)
  , IE_PROTO    = _dereq_(93)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"109":109,"39":39,"93":93}],75:[function(_dereq_,module,exports){
var has          = _dereq_(39)
  , toIObject    = _dereq_(107)
  , arrayIndexOf = _dereq_(11)(false)
  , IE_PROTO     = _dereq_(93)('IE_PROTO');

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
},{"107":107,"11":11,"39":39,"93":93}],76:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_(75)
  , enumBugKeys = _dereq_(30);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"30":30,"75":75}],77:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],78:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_(32)
  , core    = _dereq_(23)
  , fails   = _dereq_(34);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"23":23,"32":32,"34":34}],79:[function(_dereq_,module,exports){
var getKeys   = _dereq_(76)
  , toIObject = _dereq_(107)
  , isEnum    = _dereq_(77).f;
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
},{"107":107,"76":76,"77":77}],80:[function(_dereq_,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = _dereq_(72)
  , gOPS     = _dereq_(73)
  , anObject = _dereq_(7)
  , Reflect  = _dereq_(38).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"38":38,"7":7,"72":72,"73":73}],81:[function(_dereq_,module,exports){
var $parseFloat = _dereq_(38).parseFloat
  , $trim       = _dereq_(102).trim;

module.exports = 1 / $parseFloat(_dereq_(103) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"102":102,"103":103,"38":38}],82:[function(_dereq_,module,exports){
var $parseInt = _dereq_(38).parseInt
  , $trim     = _dereq_(102).trim
  , ws        = _dereq_(103)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"102":102,"103":103,"38":38}],83:[function(_dereq_,module,exports){
'use strict';
var path      = _dereq_(84)
  , invoke    = _dereq_(44)
  , aFunction = _dereq_(3);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"3":3,"44":44,"84":84}],84:[function(_dereq_,module,exports){
module.exports = _dereq_(38);
},{"38":38}],85:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],86:[function(_dereq_,module,exports){
var redefine = _dereq_(87);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"87":87}],87:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , hide      = _dereq_(40)
  , has       = _dereq_(39)
  , SRC       = _dereq_(114)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_dereq_(23).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"114":114,"23":23,"38":38,"39":39,"40":40}],88:[function(_dereq_,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],89:[function(_dereq_,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],90:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = _dereq_(49)
  , anObject = _dereq_(7);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_(25)(Function.call, _dereq_(70).f(Object.prototype, '__proto__').set, 2);
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
},{"25":25,"49":49,"7":7,"70":70}],91:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_(38)
  , dP          = _dereq_(67)
  , DESCRIPTORS = _dereq_(28)
  , SPECIES     = _dereq_(117)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"117":117,"28":28,"38":38,"67":67}],92:[function(_dereq_,module,exports){
var def = _dereq_(67).f
  , has = _dereq_(39)
  , TAG = _dereq_(117)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"117":117,"39":39,"67":67}],93:[function(_dereq_,module,exports){
var shared = _dereq_(94)('keys')
  , uid    = _dereq_(114);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"114":114,"94":94}],94:[function(_dereq_,module,exports){
var global = _dereq_(38)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"38":38}],95:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_(7)
  , aFunction = _dereq_(3)
  , SPECIES   = _dereq_(117)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"117":117,"3":3,"7":7}],96:[function(_dereq_,module,exports){
var fails = _dereq_(34);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"34":34}],97:[function(_dereq_,module,exports){
var toInteger = _dereq_(106)
  , defined   = _dereq_(27);
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
},{"106":106,"27":27}],98:[function(_dereq_,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = _dereq_(50)
  , defined  = _dereq_(27);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"27":27,"50":50}],99:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , fails   = _dereq_(34)
  , defined = _dereq_(27)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"27":27,"32":32,"34":34}],100:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = _dereq_(108)
  , repeat   = _dereq_(101)
  , defined  = _dereq_(27);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"101":101,"108":108,"27":27}],101:[function(_dereq_,module,exports){
'use strict';
var toInteger = _dereq_(106)
  , defined   = _dereq_(27);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"106":106,"27":27}],102:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , defined = _dereq_(27)
  , fails   = _dereq_(34)
  , spaces  = _dereq_(103)
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
},{"103":103,"27":27,"32":32,"34":34}],103:[function(_dereq_,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],104:[function(_dereq_,module,exports){
var ctx                = _dereq_(25)
  , invoke             = _dereq_(44)
  , html               = _dereq_(41)
  , cel                = _dereq_(29)
  , global             = _dereq_(38)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"18":18,"25":25,"29":29,"38":38,"41":41,"44":44}],105:[function(_dereq_,module,exports){
var toInteger = _dereq_(106)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"106":106}],106:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],107:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_(45)
  , defined = _dereq_(27);
module.exports = function(it){
  return IObject(defined(it));
};
},{"27":27,"45":45}],108:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_(106)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"106":106}],109:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_(27);
module.exports = function(it){
  return Object(defined(it));
};
},{"27":27}],110:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_(49);
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
},{"49":49}],111:[function(_dereq_,module,exports){
'use strict';
if(_dereq_(28)){
  var LIBRARY             = _dereq_(58)
    , global              = _dereq_(38)
    , fails               = _dereq_(34)
    , $export             = _dereq_(32)
    , $typed              = _dereq_(113)
    , $buffer             = _dereq_(112)
    , ctx                 = _dereq_(25)
    , anInstance          = _dereq_(6)
    , propertyDesc        = _dereq_(85)
    , hide                = _dereq_(40)
    , redefineAll         = _dereq_(86)
    , toInteger           = _dereq_(106)
    , toLength            = _dereq_(108)
    , toIndex             = _dereq_(105)
    , toPrimitive         = _dereq_(110)
    , has                 = _dereq_(39)
    , same                = _dereq_(89)
    , classof             = _dereq_(17)
    , isObject            = _dereq_(49)
    , toObject            = _dereq_(109)
    , isArrayIter         = _dereq_(46)
    , create              = _dereq_(66)
    , getPrototypeOf      = _dereq_(74)
    , gOPN                = _dereq_(72).f
    , getIterFn           = _dereq_(118)
    , uid                 = _dereq_(114)
    , wks                 = _dereq_(117)
    , createArrayMethod   = _dereq_(12)
    , createArrayIncludes = _dereq_(11)
    , speciesConstructor  = _dereq_(95)
    , ArrayIterators      = _dereq_(130)
    , Iterators           = _dereq_(56)
    , $iterDetect         = _dereq_(54)
    , setSpecies          = _dereq_(91)
    , arrayFill           = _dereq_(9)
    , arrayCopyWithin     = _dereq_(8)
    , $DP                 = _dereq_(67)
    , $GOPD               = _dereq_(70)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"105":105,"106":106,"108":108,"109":109,"11":11,"110":110,"112":112,"113":113,"114":114,"117":117,"118":118,"12":12,"130":130,"17":17,"25":25,"28":28,"32":32,"34":34,"38":38,"39":39,"40":40,"46":46,"49":49,"54":54,"56":56,"58":58,"6":6,"66":66,"67":67,"70":70,"72":72,"74":74,"8":8,"85":85,"86":86,"89":89,"9":9,"91":91,"95":95}],112:[function(_dereq_,module,exports){
'use strict';
var global         = _dereq_(38)
  , DESCRIPTORS    = _dereq_(28)
  , LIBRARY        = _dereq_(58)
  , $typed         = _dereq_(113)
  , hide           = _dereq_(40)
  , redefineAll    = _dereq_(86)
  , fails          = _dereq_(34)
  , anInstance     = _dereq_(6)
  , toInteger      = _dereq_(106)
  , toLength       = _dereq_(108)
  , gOPN           = _dereq_(72).f
  , dP             = _dereq_(67).f
  , arrayFill      = _dereq_(9)
  , setToStringTag = _dereq_(92)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"106":106,"108":108,"113":113,"28":28,"34":34,"38":38,"40":40,"58":58,"6":6,"67":67,"72":72,"86":86,"9":9,"92":92}],113:[function(_dereq_,module,exports){
var global = _dereq_(38)
  , hide   = _dereq_(40)
  , uid    = _dereq_(114)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"114":114,"38":38,"40":40}],114:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],115:[function(_dereq_,module,exports){
var global         = _dereq_(38)
  , core           = _dereq_(23)
  , LIBRARY        = _dereq_(58)
  , wksExt         = _dereq_(116)
  , defineProperty = _dereq_(67).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"116":116,"23":23,"38":38,"58":58,"67":67}],116:[function(_dereq_,module,exports){
exports.f = _dereq_(117);
},{"117":117}],117:[function(_dereq_,module,exports){
var store      = _dereq_(94)('wks')
  , uid        = _dereq_(114)
  , Symbol     = _dereq_(38).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"114":114,"38":38,"94":94}],118:[function(_dereq_,module,exports){
var classof   = _dereq_(17)
  , ITERATOR  = _dereq_(117)('iterator')
  , Iterators = _dereq_(56);
module.exports = _dereq_(23).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"117":117,"17":17,"23":23,"56":56}],119:[function(_dereq_,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = _dereq_(32)
  , $re     = _dereq_(88)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"32":32,"88":88}],120:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = _dereq_(32);

$export($export.P, 'Array', {copyWithin: _dereq_(8)});

_dereq_(5)('copyWithin');
},{"32":32,"5":5,"8":8}],121:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $every  = _dereq_(12)(4);

$export($export.P + $export.F * !_dereq_(96)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],122:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = _dereq_(32);

$export($export.P, 'Array', {fill: _dereq_(9)});

_dereq_(5)('fill');
},{"32":32,"5":5,"9":9}],123:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $filter = _dereq_(12)(2);

$export($export.P + $export.F * !_dereq_(96)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],124:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = _dereq_(32)
  , $find   = _dereq_(12)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);
},{"12":12,"32":32,"5":5}],125:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = _dereq_(32)
  , $find   = _dereq_(12)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);
},{"12":12,"32":32,"5":5}],126:[function(_dereq_,module,exports){
'use strict';
var $export  = _dereq_(32)
  , $forEach = _dereq_(12)(0)
  , STRICT   = _dereq_(96)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],127:[function(_dereq_,module,exports){
'use strict';
var ctx            = _dereq_(25)
  , $export        = _dereq_(32)
  , toObject       = _dereq_(109)
  , call           = _dereq_(51)
  , isArrayIter    = _dereq_(46)
  , toLength       = _dereq_(108)
  , createProperty = _dereq_(24)
  , getIterFn      = _dereq_(118);

$export($export.S + $export.F * !_dereq_(54)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"108":108,"109":109,"118":118,"24":24,"25":25,"32":32,"46":46,"51":51,"54":54}],128:[function(_dereq_,module,exports){
'use strict';
var $export       = _dereq_(32)
  , $indexOf      = _dereq_(11)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"11":11,"32":32,"96":96}],129:[function(_dereq_,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = _dereq_(32);

$export($export.S, 'Array', {isArray: _dereq_(47)});
},{"32":32,"47":47}],130:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_(5)
  , step             = _dereq_(55)
  , Iterators        = _dereq_(56)
  , toIObject        = _dereq_(107);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_(53)(Array, 'Array', function(iterated, kind){
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
},{"107":107,"5":5,"53":53,"55":55,"56":56}],131:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = _dereq_(32)
  , toIObject = _dereq_(107)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (_dereq_(45) != Object || !_dereq_(96)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"107":107,"32":32,"45":45,"96":96}],132:[function(_dereq_,module,exports){
'use strict';
var $export       = _dereq_(32)
  , toIObject     = _dereq_(107)
  , toInteger     = _dereq_(106)
  , toLength      = _dereq_(108)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"106":106,"107":107,"108":108,"32":32,"96":96}],133:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $map    = _dereq_(12)(1);

$export($export.P + $export.F * !_dereq_(96)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],134:[function(_dereq_,module,exports){
'use strict';
var $export        = _dereq_(32)
  , createProperty = _dereq_(24);

// WebKit Array.of isn't generic
$export($export.S + $export.F * _dereq_(34)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"24":24,"32":32,"34":34}],135:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(96)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"13":13,"32":32,"96":96}],136:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(96)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"13":13,"32":32,"96":96}],137:[function(_dereq_,module,exports){
'use strict';
var $export    = _dereq_(32)
  , html       = _dereq_(41)
  , cof        = _dereq_(18)
  , toIndex    = _dereq_(105)
  , toLength   = _dereq_(108)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * _dereq_(34)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"105":105,"108":108,"18":18,"32":32,"34":34,"41":41}],138:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $some   = _dereq_(12)(3);

$export($export.P + $export.F * !_dereq_(96)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],139:[function(_dereq_,module,exports){
'use strict';
var $export   = _dereq_(32)
  , aFunction = _dereq_(3)
  , toObject  = _dereq_(109)
  , fails     = _dereq_(34)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !_dereq_(96)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"109":109,"3":3,"32":32,"34":34,"96":96}],140:[function(_dereq_,module,exports){
_dereq_(91)('Array');
},{"91":91}],141:[function(_dereq_,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = _dereq_(32);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"32":32}],142:[function(_dereq_,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = _dereq_(32)
  , fails   = _dereq_(34)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"32":32,"34":34}],143:[function(_dereq_,module,exports){
'use strict';
var $export     = _dereq_(32)
  , toObject    = _dereq_(109)
  , toPrimitive = _dereq_(110);

$export($export.P + $export.F * _dereq_(34)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"109":109,"110":110,"32":32,"34":34}],144:[function(_dereq_,module,exports){
var TO_PRIMITIVE = _dereq_(117)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))_dereq_(40)(proto, TO_PRIMITIVE, _dereq_(26));
},{"117":117,"26":26,"40":40}],145:[function(_dereq_,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  _dereq_(87)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"87":87}],146:[function(_dereq_,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = _dereq_(32);

$export($export.P, 'Function', {bind: _dereq_(16)});
},{"16":16,"32":32}],147:[function(_dereq_,module,exports){
'use strict';
var isObject       = _dereq_(49)
  , getPrototypeOf = _dereq_(74)
  , HAS_INSTANCE   = _dereq_(117)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))_dereq_(67).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"117":117,"49":49,"67":67,"74":74}],148:[function(_dereq_,module,exports){
var dP         = _dereq_(67).f
  , createDesc = _dereq_(85)
  , has        = _dereq_(39)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || _dereq_(28) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"28":28,"39":39,"67":67,"85":85}],149:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);

// 23.1 Map Objects
module.exports = _dereq_(22)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"19":19,"22":22}],150:[function(_dereq_,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = _dereq_(32)
  , log1p   = _dereq_(60)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"32":32,"60":60}],151:[function(_dereq_,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = _dereq_(32)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"32":32}],152:[function(_dereq_,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = _dereq_(32)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"32":32}],153:[function(_dereq_,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = _dereq_(32)
  , sign    = _dereq_(61);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"32":32,"61":61}],154:[function(_dereq_,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"32":32}],155:[function(_dereq_,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = _dereq_(32)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"32":32}],156:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = _dereq_(32)
  , $expm1  = _dereq_(59);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"32":32,"59":59}],157:[function(_dereq_,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = _dereq_(32)
  , sign      = _dereq_(61)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"32":32,"61":61}],158:[function(_dereq_,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = _dereq_(32)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"32":32}],159:[function(_dereq_,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = _dereq_(32)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * _dereq_(34)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"32":32,"34":34}],160:[function(_dereq_,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"32":32}],161:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {log1p: _dereq_(60)});
},{"32":32,"60":60}],162:[function(_dereq_,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"32":32}],163:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {sign: _dereq_(61)});
},{"32":32,"61":61}],164:[function(_dereq_,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = _dereq_(32)
  , expm1   = _dereq_(59)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * _dereq_(34)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"32":32,"34":34,"59":59}],165:[function(_dereq_,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = _dereq_(32)
  , expm1   = _dereq_(59)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"32":32,"59":59}],166:[function(_dereq_,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"32":32}],167:[function(_dereq_,module,exports){
'use strict';
var global            = _dereq_(38)
  , has               = _dereq_(39)
  , cof               = _dereq_(18)
  , inheritIfRequired = _dereq_(43)
  , toPrimitive       = _dereq_(110)
  , fails             = _dereq_(34)
  , gOPN              = _dereq_(72).f
  , gOPD              = _dereq_(70).f
  , dP                = _dereq_(67).f
  , $trim             = _dereq_(102).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(_dereq_(66)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = _dereq_(28) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _dereq_(87)(global, NUMBER, $Number);
}
},{"102":102,"110":110,"18":18,"28":28,"34":34,"38":38,"39":39,"43":43,"66":66,"67":67,"70":70,"72":72,"87":87}],168:[function(_dereq_,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = _dereq_(32);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"32":32}],169:[function(_dereq_,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = _dereq_(32)
  , _isFinite = _dereq_(38).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"32":32,"38":38}],170:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = _dereq_(32);

$export($export.S, 'Number', {isInteger: _dereq_(48)});
},{"32":32,"48":48}],171:[function(_dereq_,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = _dereq_(32);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"32":32}],172:[function(_dereq_,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = _dereq_(32)
  , isInteger = _dereq_(48)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"32":32,"48":48}],173:[function(_dereq_,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = _dereq_(32);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"32":32}],174:[function(_dereq_,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = _dereq_(32);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"32":32}],175:[function(_dereq_,module,exports){
var $export     = _dereq_(32)
  , $parseFloat = _dereq_(81);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"32":32,"81":81}],176:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , $parseInt = _dereq_(82);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"32":32,"82":82}],177:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , toInteger    = _dereq_(106)
  , aNumberValue = _dereq_(4)
  , repeat       = _dereq_(101)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !_dereq_(34)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"101":101,"106":106,"32":32,"34":34,"4":4}],178:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , $fails       = _dereq_(34)
  , aNumberValue = _dereq_(4)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"32":32,"34":34,"4":4}],179:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_(32);

$export($export.S + $export.F, 'Object', {assign: _dereq_(65)});
},{"32":32,"65":65}],180:[function(_dereq_,module,exports){
var $export = _dereq_(32)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: _dereq_(66)});
},{"32":32,"66":66}],181:[function(_dereq_,module,exports){
var $export = _dereq_(32);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !_dereq_(28), 'Object', {defineProperties: _dereq_(68)});
},{"28":28,"32":32,"68":68}],182:[function(_dereq_,module,exports){
var $export = _dereq_(32);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_(28), 'Object', {defineProperty: _dereq_(67).f});
},{"28":28,"32":32,"67":67}],183:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],184:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = _dereq_(107)
  , $getOwnPropertyDescriptor = _dereq_(70).f;

_dereq_(78)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"107":107,"70":70,"78":78}],185:[function(_dereq_,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
_dereq_(78)('getOwnPropertyNames', function(){
  return _dereq_(71).f;
});
},{"71":71,"78":78}],186:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = _dereq_(109)
  , $getPrototypeOf = _dereq_(74);

_dereq_(78)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"109":109,"74":74,"78":78}],187:[function(_dereq_,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = _dereq_(49);

_dereq_(78)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"49":49,"78":78}],188:[function(_dereq_,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = _dereq_(49);

_dereq_(78)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"49":49,"78":78}],189:[function(_dereq_,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = _dereq_(49);

_dereq_(78)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"49":49,"78":78}],190:[function(_dereq_,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = _dereq_(32);
$export($export.S, 'Object', {is: _dereq_(89)});
},{"32":32,"89":89}],191:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_(109)
  , $keys    = _dereq_(76);

_dereq_(78)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"109":109,"76":76,"78":78}],192:[function(_dereq_,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],193:[function(_dereq_,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],194:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_(32);
$export($export.S, 'Object', {setPrototypeOf: _dereq_(90).set});
},{"32":32,"90":90}],195:[function(_dereq_,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = _dereq_(17)
  , test    = {};
test[_dereq_(117)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  _dereq_(87)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"117":117,"17":17,"87":87}],196:[function(_dereq_,module,exports){
var $export     = _dereq_(32)
  , $parseFloat = _dereq_(81);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"32":32,"81":81}],197:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , $parseInt = _dereq_(82);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"32":32,"82":82}],198:[function(_dereq_,module,exports){
'use strict';
var LIBRARY            = _dereq_(58)
  , global             = _dereq_(38)
  , ctx                = _dereq_(25)
  , classof            = _dereq_(17)
  , $export            = _dereq_(32)
  , isObject           = _dereq_(49)
  , aFunction          = _dereq_(3)
  , anInstance         = _dereq_(6)
  , forOf              = _dereq_(37)
  , speciesConstructor = _dereq_(95)
  , task               = _dereq_(104).set
  , microtask          = _dereq_(64)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_dereq_(117)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_(86)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
_dereq_(92)($Promise, PROMISE);
_dereq_(91)(PROMISE);
Wrapper = _dereq_(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_(54)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"104":104,"117":117,"17":17,"23":23,"25":25,"3":3,"32":32,"37":37,"38":38,"49":49,"54":54,"58":58,"6":6,"64":64,"86":86,"91":91,"92":92,"95":95}],199:[function(_dereq_,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = _dereq_(32)
  , aFunction = _dereq_(3)
  , anObject  = _dereq_(7)
  , rApply    = (_dereq_(38).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !_dereq_(34)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
},{"3":3,"32":32,"34":34,"38":38,"7":7}],200:[function(_dereq_,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = _dereq_(32)
  , create     = _dereq_(66)
  , aFunction  = _dereq_(3)
  , anObject   = _dereq_(7)
  , isObject   = _dereq_(49)
  , fails      = _dereq_(34)
  , bind       = _dereq_(16)
  , rConstruct = (_dereq_(38).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"16":16,"3":3,"32":32,"34":34,"38":38,"49":49,"66":66,"7":7}],201:[function(_dereq_,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = _dereq_(67)
  , $export     = _dereq_(32)
  , anObject    = _dereq_(7)
  , toPrimitive = _dereq_(110);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * _dereq_(34)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"110":110,"32":32,"34":34,"67":67,"7":7}],202:[function(_dereq_,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = _dereq_(32)
  , gOPD     = _dereq_(70).f
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"32":32,"7":7,"70":70}],203:[function(_dereq_,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = _dereq_(32)
  , anObject = _dereq_(7);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
_dereq_(52)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"32":32,"52":52,"7":7}],204:[function(_dereq_,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = _dereq_(70)
  , $export  = _dereq_(32)
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"32":32,"7":7,"70":70}],205:[function(_dereq_,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = _dereq_(32)
  , getProto = _dereq_(74)
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"32":32,"7":7,"74":74}],206:[function(_dereq_,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = _dereq_(70)
  , getPrototypeOf = _dereq_(74)
  , has            = _dereq_(39)
  , $export        = _dereq_(32)
  , isObject       = _dereq_(49)
  , anObject       = _dereq_(7);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"32":32,"39":39,"49":49,"7":7,"70":70,"74":74}],207:[function(_dereq_,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = _dereq_(32);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"32":32}],208:[function(_dereq_,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = _dereq_(32)
  , anObject      = _dereq_(7)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"32":32,"7":7}],209:[function(_dereq_,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = _dereq_(32);

$export($export.S, 'Reflect', {ownKeys: _dereq_(80)});
},{"32":32,"80":80}],210:[function(_dereq_,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = _dereq_(32)
  , anObject           = _dereq_(7)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"32":32,"7":7}],211:[function(_dereq_,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = _dereq_(32)
  , setProto = _dereq_(90);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"32":32,"90":90}],212:[function(_dereq_,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = _dereq_(67)
  , gOPD           = _dereq_(70)
  , getPrototypeOf = _dereq_(74)
  , has            = _dereq_(39)
  , $export        = _dereq_(32)
  , createDesc     = _dereq_(85)
  , anObject       = _dereq_(7)
  , isObject       = _dereq_(49);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"32":32,"39":39,"49":49,"67":67,"7":7,"70":70,"74":74,"85":85}],213:[function(_dereq_,module,exports){
var global            = _dereq_(38)
  , inheritIfRequired = _dereq_(43)
  , dP                = _dereq_(67).f
  , gOPN              = _dereq_(72).f
  , isRegExp          = _dereq_(50)
  , $flags            = _dereq_(36)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(_dereq_(28) && (!CORRECT_NEW || _dereq_(34)(function(){
  re2[_dereq_(117)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  _dereq_(87)(global, 'RegExp', $RegExp);
}

_dereq_(91)('RegExp');
},{"117":117,"28":28,"34":34,"36":36,"38":38,"43":43,"50":50,"67":67,"72":72,"87":87,"91":91}],214:[function(_dereq_,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(_dereq_(28) && /./g.flags != 'g')_dereq_(67).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _dereq_(36)
});
},{"28":28,"36":36,"67":67}],215:[function(_dereq_,module,exports){
// @@match logic
_dereq_(35)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"35":35}],216:[function(_dereq_,module,exports){
// @@replace logic
_dereq_(35)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"35":35}],217:[function(_dereq_,module,exports){
// @@search logic
_dereq_(35)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"35":35}],218:[function(_dereq_,module,exports){
// @@split logic
_dereq_(35)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = _dereq_(50)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"35":35,"50":50}],219:[function(_dereq_,module,exports){
'use strict';
_dereq_(214);
var anObject    = _dereq_(7)
  , $flags      = _dereq_(36)
  , DESCRIPTORS = _dereq_(28)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  _dereq_(87)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(_dereq_(34)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"214":214,"28":28,"34":34,"36":36,"7":7,"87":87}],220:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);

// 23.2 Set Objects
module.exports = _dereq_(22)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"19":19,"22":22}],221:[function(_dereq_,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
_dereq_(99)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"99":99}],222:[function(_dereq_,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
_dereq_(99)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"99":99}],223:[function(_dereq_,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
_dereq_(99)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"99":99}],224:[function(_dereq_,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
_dereq_(99)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"99":99}],225:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $at     = _dereq_(97)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"32":32,"97":97}],226:[function(_dereq_,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = _dereq_(32)
  , toLength  = _dereq_(108)
  , context   = _dereq_(98)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * _dereq_(33)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"108":108,"32":32,"33":33,"98":98}],227:[function(_dereq_,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
_dereq_(99)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"99":99}],228:[function(_dereq_,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
_dereq_(99)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"99":99}],229:[function(_dereq_,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
_dereq_(99)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"99":99}],230:[function(_dereq_,module,exports){
var $export        = _dereq_(32)
  , toIndex        = _dereq_(105)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"105":105,"32":32}],231:[function(_dereq_,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = _dereq_(32)
  , context  = _dereq_(98)
  , INCLUDES = 'includes';

$export($export.P + $export.F * _dereq_(33)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"32":32,"33":33,"98":98}],232:[function(_dereq_,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
_dereq_(99)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"99":99}],233:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_(97)(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_(53)(String, 'String', function(iterated){
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
},{"53":53,"97":97}],234:[function(_dereq_,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
_dereq_(99)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"99":99}],235:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , toIObject = _dereq_(107)
  , toLength  = _dereq_(108);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"107":107,"108":108,"32":32}],236:[function(_dereq_,module,exports){
var $export = _dereq_(32);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _dereq_(101)
});
},{"101":101,"32":32}],237:[function(_dereq_,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
_dereq_(99)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"99":99}],238:[function(_dereq_,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = _dereq_(32)
  , toLength    = _dereq_(108)
  , context     = _dereq_(98)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * _dereq_(33)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"108":108,"32":32,"33":33,"98":98}],239:[function(_dereq_,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
_dereq_(99)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"99":99}],240:[function(_dereq_,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
_dereq_(99)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"99":99}],241:[function(_dereq_,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
_dereq_(99)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"99":99}],242:[function(_dereq_,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
_dereq_(102)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"102":102}],243:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = _dereq_(38)
  , has            = _dereq_(39)
  , DESCRIPTORS    = _dereq_(28)
  , $export        = _dereq_(32)
  , redefine       = _dereq_(87)
  , META           = _dereq_(62).KEY
  , $fails         = _dereq_(34)
  , shared         = _dereq_(94)
  , setToStringTag = _dereq_(92)
  , uid            = _dereq_(114)
  , wks            = _dereq_(117)
  , wksExt         = _dereq_(116)
  , wksDefine      = _dereq_(115)
  , keyOf          = _dereq_(57)
  , enumKeys       = _dereq_(31)
  , isArray        = _dereq_(47)
  , anObject       = _dereq_(7)
  , toIObject      = _dereq_(107)
  , toPrimitive    = _dereq_(110)
  , createDesc     = _dereq_(85)
  , _create        = _dereq_(66)
  , gOPNExt        = _dereq_(71)
  , $GOPD          = _dereq_(70)
  , $DP            = _dereq_(67)
  , $keys          = _dereq_(76)
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
  _dereq_(72).f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_(77).f  = $propertyIsEnumerable;
  _dereq_(73).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_(58)){
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_(40)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"107":107,"110":110,"114":114,"115":115,"116":116,"117":117,"28":28,"31":31,"32":32,"34":34,"38":38,"39":39,"40":40,"47":47,"57":57,"58":58,"62":62,"66":66,"67":67,"7":7,"70":70,"71":71,"72":72,"73":73,"76":76,"77":77,"85":85,"87":87,"92":92,"94":94}],244:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , $typed       = _dereq_(113)
  , buffer       = _dereq_(112)
  , anObject     = _dereq_(7)
  , toIndex      = _dereq_(105)
  , toLength     = _dereq_(108)
  , isObject     = _dereq_(49)
  , ArrayBuffer  = _dereq_(38).ArrayBuffer
  , speciesConstructor = _dereq_(95)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * _dereq_(34)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

_dereq_(91)(ARRAY_BUFFER);
},{"105":105,"108":108,"112":112,"113":113,"32":32,"34":34,"38":38,"49":49,"7":7,"91":91,"95":95}],245:[function(_dereq_,module,exports){
var $export = _dereq_(32);
$export($export.G + $export.W + $export.F * !_dereq_(113).ABV, {
  DataView: _dereq_(112).DataView
});
},{"112":112,"113":113,"32":32}],246:[function(_dereq_,module,exports){
_dereq_(111)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],247:[function(_dereq_,module,exports){
_dereq_(111)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],248:[function(_dereq_,module,exports){
_dereq_(111)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],249:[function(_dereq_,module,exports){
_dereq_(111)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],250:[function(_dereq_,module,exports){
_dereq_(111)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],251:[function(_dereq_,module,exports){
_dereq_(111)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],252:[function(_dereq_,module,exports){
_dereq_(111)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],253:[function(_dereq_,module,exports){
_dereq_(111)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],254:[function(_dereq_,module,exports){
_dereq_(111)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"111":111}],255:[function(_dereq_,module,exports){
'use strict';
var each         = _dereq_(12)(0)
  , redefine     = _dereq_(87)
  , meta         = _dereq_(62)
  , assign       = _dereq_(65)
  , weak         = _dereq_(21)
  , isObject     = _dereq_(49)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _dereq_(22)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"12":12,"21":21,"22":22,"49":49,"62":62,"65":65,"87":87}],256:[function(_dereq_,module,exports){
'use strict';
var weak = _dereq_(21);

// 23.4 WeakSet Objects
_dereq_(22)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"21":21,"22":22}],257:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = _dereq_(32)
  , $includes = _dereq_(11)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_dereq_(5)('includes');
},{"11":11,"32":32,"5":5}],258:[function(_dereq_,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = _dereq_(32)
  , microtask = _dereq_(64)()
  , process   = _dereq_(38).process
  , isNode    = _dereq_(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"18":18,"32":32,"38":38,"64":64}],259:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = _dereq_(32)
  , cof     = _dereq_(18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"18":18,"32":32}],260:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(32);

$export($export.P + $export.R, 'Map', {toJSON: _dereq_(20)('Map')});
},{"20":20,"32":32}],261:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"32":32}],262:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"32":32}],263:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"32":32}],264:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"32":32}],265:[function(_dereq_,module,exports){
'use strict';
var $export         = _dereq_(32)
  , toObject        = _dereq_(109)
  , aFunction       = _dereq_(3)
  , $defineProperty = _dereq_(67);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"109":109,"28":28,"3":3,"32":32,"67":67,"69":69}],266:[function(_dereq_,module,exports){
'use strict';
var $export         = _dereq_(32)
  , toObject        = _dereq_(109)
  , aFunction       = _dereq_(3)
  , $defineProperty = _dereq_(67);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"109":109,"28":28,"3":3,"32":32,"67":67,"69":69}],267:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = _dereq_(32)
  , $entries = _dereq_(79)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"32":32,"79":79}],268:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = _dereq_(32)
  , ownKeys        = _dereq_(80)
  , toIObject      = _dereq_(107)
  , gOPD           = _dereq_(70)
  , createProperty = _dereq_(24);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"107":107,"24":24,"32":32,"70":70,"80":80}],269:[function(_dereq_,module,exports){
'use strict';
var $export                  = _dereq_(32)
  , toObject                 = _dereq_(109)
  , toPrimitive              = _dereq_(110)
  , getPrototypeOf           = _dereq_(74)
  , getOwnPropertyDescriptor = _dereq_(70).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"109":109,"110":110,"28":28,"32":32,"69":69,"70":70,"74":74}],270:[function(_dereq_,module,exports){
'use strict';
var $export                  = _dereq_(32)
  , toObject                 = _dereq_(109)
  , toPrimitive              = _dereq_(110)
  , getPrototypeOf           = _dereq_(74)
  , getOwnPropertyDescriptor = _dereq_(70).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"109":109,"110":110,"28":28,"32":32,"69":69,"70":70,"74":74}],271:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = _dereq_(32)
  , $values = _dereq_(79)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"32":32,"79":79}],272:[function(_dereq_,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = _dereq_(32)
  , global      = _dereq_(38)
  , core        = _dereq_(23)
  , microtask   = _dereq_(64)()
  , OBSERVABLE  = _dereq_(117)('observable')
  , aFunction   = _dereq_(3)
  , anObject    = _dereq_(7)
  , anInstance  = _dereq_(6)
  , redefineAll = _dereq_(86)
  , hide        = _dereq_(40)
  , forOf       = _dereq_(37)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

_dereq_(91)('Observable');
},{"117":117,"23":23,"3":3,"32":32,"37":37,"38":38,"40":40,"6":6,"64":64,"7":7,"86":86,"91":91}],273:[function(_dereq_,module,exports){
var metadata                  = _dereq_(63)
  , anObject                  = _dereq_(7)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"63":63,"7":7}],274:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"63":63,"7":7}],275:[function(_dereq_,module,exports){
var Set                     = _dereq_(220)
  , from                    = _dereq_(10)
  , metadata                = _dereq_(63)
  , anObject                = _dereq_(7)
  , getPrototypeOf          = _dereq_(74)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"10":10,"220":220,"63":63,"7":7,"74":74}],276:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , getPrototypeOf         = _dereq_(74)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7,"74":74}],277:[function(_dereq_,module,exports){
var metadata                = _dereq_(63)
  , anObject                = _dereq_(7)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"63":63,"7":7}],278:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7}],279:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , getPrototypeOf         = _dereq_(74)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7,"74":74}],280:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7}],281:[function(_dereq_,module,exports){
var metadata                  = _dereq_(63)
  , anObject                  = _dereq_(7)
  , aFunction                 = _dereq_(3)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"3":3,"63":63,"7":7}],282:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(32);

$export($export.P + $export.R, 'Set', {toJSON: _dereq_(20)('Set')});
},{"20":20,"32":32}],283:[function(_dereq_,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = _dereq_(32)
  , $at     = _dereq_(97)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"32":32,"97":97}],284:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = _dereq_(32)
  , defined     = _dereq_(27)
  , toLength    = _dereq_(108)
  , isRegExp    = _dereq_(50)
  , getFlags    = _dereq_(36)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

_dereq_(52)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"108":108,"27":27,"32":32,"36":36,"50":50,"52":52}],285:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(32)
  , $pad    = _dereq_(100);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"100":100,"32":32}],286:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(32)
  , $pad    = _dereq_(100);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"100":100,"32":32}],287:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(102)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"102":102}],288:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(102)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"102":102}],289:[function(_dereq_,module,exports){
_dereq_(115)('asyncIterator');
},{"115":115}],290:[function(_dereq_,module,exports){
_dereq_(115)('observable');
},{"115":115}],291:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-global
var $export = _dereq_(32);

$export($export.S, 'System', {global: _dereq_(38)});
},{"32":32,"38":38}],292:[function(_dereq_,module,exports){
var $iterators    = _dereq_(130)
  , redefine      = _dereq_(87)
  , global        = _dereq_(38)
  , hide          = _dereq_(40)
  , Iterators     = _dereq_(56)
  , wks           = _dereq_(117)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"117":117,"130":130,"38":38,"40":40,"56":56,"87":87}],293:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , $task   = _dereq_(104);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"104":104,"32":32}],294:[function(_dereq_,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = _dereq_(38)
  , $export    = _dereq_(32)
  , invoke     = _dereq_(44)
  , partial    = _dereq_(83)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"32":32,"38":38,"44":44,"83":83}],295:[function(_dereq_,module,exports){
_dereq_(243);
_dereq_(180);
_dereq_(182);
_dereq_(181);
_dereq_(184);
_dereq_(186);
_dereq_(191);
_dereq_(185);
_dereq_(183);
_dereq_(193);
_dereq_(192);
_dereq_(188);
_dereq_(189);
_dereq_(187);
_dereq_(179);
_dereq_(190);
_dereq_(194);
_dereq_(195);
_dereq_(146);
_dereq_(148);
_dereq_(147);
_dereq_(197);
_dereq_(196);
_dereq_(167);
_dereq_(177);
_dereq_(178);
_dereq_(168);
_dereq_(169);
_dereq_(170);
_dereq_(171);
_dereq_(172);
_dereq_(173);
_dereq_(174);
_dereq_(175);
_dereq_(176);
_dereq_(150);
_dereq_(151);
_dereq_(152);
_dereq_(153);
_dereq_(154);
_dereq_(155);
_dereq_(156);
_dereq_(157);
_dereq_(158);
_dereq_(159);
_dereq_(160);
_dereq_(161);
_dereq_(162);
_dereq_(163);
_dereq_(164);
_dereq_(165);
_dereq_(166);
_dereq_(230);
_dereq_(235);
_dereq_(242);
_dereq_(233);
_dereq_(225);
_dereq_(226);
_dereq_(231);
_dereq_(236);
_dereq_(238);
_dereq_(221);
_dereq_(222);
_dereq_(223);
_dereq_(224);
_dereq_(227);
_dereq_(228);
_dereq_(229);
_dereq_(232);
_dereq_(234);
_dereq_(237);
_dereq_(239);
_dereq_(240);
_dereq_(241);
_dereq_(141);
_dereq_(143);
_dereq_(142);
_dereq_(145);
_dereq_(144);
_dereq_(129);
_dereq_(127);
_dereq_(134);
_dereq_(131);
_dereq_(137);
_dereq_(139);
_dereq_(126);
_dereq_(133);
_dereq_(123);
_dereq_(138);
_dereq_(121);
_dereq_(136);
_dereq_(135);
_dereq_(128);
_dereq_(132);
_dereq_(120);
_dereq_(122);
_dereq_(125);
_dereq_(124);
_dereq_(140);
_dereq_(130);
_dereq_(213);
_dereq_(219);
_dereq_(214);
_dereq_(215);
_dereq_(216);
_dereq_(217);
_dereq_(218);
_dereq_(198);
_dereq_(149);
_dereq_(220);
_dereq_(255);
_dereq_(256);
_dereq_(244);
_dereq_(245);
_dereq_(250);
_dereq_(253);
_dereq_(254);
_dereq_(248);
_dereq_(251);
_dereq_(249);
_dereq_(252);
_dereq_(246);
_dereq_(247);
_dereq_(199);
_dereq_(200);
_dereq_(201);
_dereq_(202);
_dereq_(203);
_dereq_(206);
_dereq_(204);
_dereq_(205);
_dereq_(207);
_dereq_(208);
_dereq_(209);
_dereq_(210);
_dereq_(212);
_dereq_(211);
_dereq_(257);
_dereq_(283);
_dereq_(286);
_dereq_(285);
_dereq_(287);
_dereq_(288);
_dereq_(284);
_dereq_(289);
_dereq_(290);
_dereq_(268);
_dereq_(271);
_dereq_(267);
_dereq_(265);
_dereq_(266);
_dereq_(269);
_dereq_(270);
_dereq_(260);
_dereq_(282);
_dereq_(291);
_dereq_(259);
_dereq_(261);
_dereq_(263);
_dereq_(262);
_dereq_(264);
_dereq_(273);
_dereq_(274);
_dereq_(276);
_dereq_(275);
_dereq_(278);
_dereq_(277);
_dereq_(279);
_dereq_(280);
_dereq_(281);
_dereq_(258);
_dereq_(272);
_dereq_(294);
_dereq_(293);
_dereq_(292);
module.exports = _dereq_(23);
},{"120":120,"121":121,"122":122,"123":123,"124":124,"125":125,"126":126,"127":127,"128":128,"129":129,"130":130,"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"188":188,"189":189,"190":190,"191":191,"192":192,"193":193,"194":194,"195":195,"196":196,"197":197,"198":198,"199":199,"200":200,"201":201,"202":202,"203":203,"204":204,"205":205,"206":206,"207":207,"208":208,"209":209,"210":210,"211":211,"212":212,"213":213,"214":214,"215":215,"216":216,"217":217,"218":218,"219":219,"220":220,"221":221,"222":222,"223":223,"224":224,"225":225,"226":226,"227":227,"228":228,"229":229,"23":23,"230":230,"231":231,"232":232,"233":233,"234":234,"235":235,"236":236,"237":237,"238":238,"239":239,"240":240,"241":241,"242":242,"243":243,"244":244,"245":245,"246":246,"247":247,"248":248,"249":249,"250":250,"251":251,"252":252,"253":253,"254":254,"255":255,"256":256,"257":257,"258":258,"259":259,"260":260,"261":261,"262":262,"263":263,"264":264,"265":265,"266":266,"267":267,"268":268,"269":269,"270":270,"271":271,"272":272,"273":273,"274":274,"275":275,"276":276,"277":277,"278":278,"279":279,"280":280,"281":281,"282":282,"283":283,"284":284,"285":285,"286":286,"287":287,"288":288,"289":289,"290":290,"291":291,"292":292,"293":293,"294":294}],296:[function(_dereq_,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
;(function(global,factory){if(typeof define==="function"&&define.amd){define(["module","exports"],factory);}else if(typeof exports!=="undefined"){factory(module,exports);}else{var mod={exports:{}};factory(mod,mod.exports);global.scxml=mod.exports;}})(this,function(module,exports){"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.scxml=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(require,module,exports){(function(process){var _marked=[genStates].map(regeneratorRuntime.mark);/**
 * Accept a scjson document as input, either from a file or via stdin.
 * Generate a JavaScript module as output.
 * This module should be customizable:
    * plain object literal if appropriate
    * simple self-invoking function (for use in scion-scxml)
    * UMD in probably all other cases. although we could make it CommonJS/AMD/etc.
 */var to_js_identifier=require("text-to-js-identifier");//TODO: optimization: if the scjson does not contain a datamodel or any actions, then just dump out the object literal as the module
//TODO: we should also encode the document name. accept as command-line argument, or embed it in the scjson itself, maybe?
var printTrace=false;function generateFnName(actionType,action){return'$'+actionType+'_l'+action.$line+'_c'+action.$column;}var FN_ARGS='(_event)';var SCRIPT_SRC_FN_PREFIX='script_src';var stripNsPrefixRe=/^(?:{(?:[^}]*)})?(.*)$/;function stripAttrNsPrefix(attrName){var m=attrName.match(stripNsPrefixRe);return m[1];}function generateFnDeclaration(fnName,fnBody,action){if(printTrace)console.log('generateFnDeclaration',fnName,fnBody);return'function '+fnName+FN_ARGS+'{\n'+fnBody+'\n'+'};\n'+fnName+'.tagname=\''+action.$type+'\';\n'+fnName+'.line='+action.$line+';\n'+fnName+'.column='+action.$column+';\n';}function generateFnCall(fnName){if(printTrace)console.log('generateFnCall',fnName);return fnName+'.apply(this, arguments)';}ModuleBuilder.prototype.generateActionFunction=function(action){if(printTrace)console.log('generateActionFunction',action);var fnName=generateFnName(action.$type,action);var fnBody=actionTags[action.$type]?actionTags[action.$type](action,this):actionTags['custom'](action,this);var fnDec=generateFnDeclaration(fnName,fnBody,action);this.fnDecAccumulator.push(fnDec);return fnName;};ModuleBuilder.prototype.generateExpressionFunction=function(expressionType,exprObj){if(printTrace)console.log('generateExpressionFunction',expressionType,exprObj);var fnName=generateFnName(expressionType,exprObj);var fnBody='return '+exprObj.expr+';';var fnDec=generateFnDeclaration(fnName,fnBody,exprObj);this.fnDecAccumulator.push(fnDec);return fnName;};ModuleBuilder.prototype.generateAttributeExpression=function(attrContainer,attrName){if(printTrace)console.log('generateAttributeExpression',attrContainer,attrName);return this.generateExpressionFunction(stripAttrNsPrefix(attrName),attrContainer[attrName]);};var REFERENCE_MARKER='__UNQUOTE__',REFERENCE_MARKER_RE=new RegExp('"'+REFERENCE_MARKER+'(.*)'+REFERENCE_MARKER+'"','g');//TODO: need to split this into two parts: one that declares the variables in the datamodel at the top of the module scope,
//and another single function that inits the model needs to contain a reference to this init function,
//and the interpreter must know about it. should be optional.
//call it $scion_init_datamodel.
function generateDatamodelDeclaration(datamodelAccumulator){if(!datamodelAccumulator.length){return undefined;}return'var '+datamodelAccumulator.map(function(data){return data.id;}).join(", ")+";";}var SERIALIZE_DATAMODEL_FN_NAME='$serializeDatamodel';function generateDatamodelSerializerFn(datamodelAccumulator){return'function '+SERIALIZE_DATAMODEL_FN_NAME+'(){\n'+'   return {\n'+datamodelAccumulator.map(function(data){return'  "'+data.id+'" : '+data.id;}).join(',\n')+'\n'+'   };\n'+'}';}var DESERIALIZE_DATAMODEL_FN_NAME='$deserializeDatamodel',DESERIALIZE_DATAMODEL_FN_ARG='$serializedDatamodel';function generateDatamodelDeserializerFn(datamodelAccumulator){return'function '+DESERIALIZE_DATAMODEL_FN_NAME+'('+DESERIALIZE_DATAMODEL_FN_ARG+'){\n'+datamodelAccumulator.map(function(data){return'  '+data.id+' = '+DESERIALIZE_DATAMODEL_FN_ARG+'["'+data.id+'"];';}).join('\n')+'\n'+'    '+EARLY_BINDING_DATAMODEL_GUARD+' = true;\n'+//set the guard condition to true
'}';}var EARLY_BINDING_DATAMODEL_FN_NAME='$initEarlyBindingDatamodel';var EARLY_BINDING_DATAMODEL_GUARD='$scion_early_binding_datamodel_has_fired';//TODO: make this function more clever and accept the datamodel as an action
function generateEarlyBindingDatamodelInitFn(builder){//this guard guarantees it will only fire once
return'var '+EARLY_BINDING_DATAMODEL_GUARD+' = false;\n'+(builder.datamodelAccumulator.length?'function '+EARLY_BINDING_DATAMODEL_FN_NAME+FN_ARGS+'{\n'+'    if(!'+EARLY_BINDING_DATAMODEL_GUARD+'){\n'+//invoke all datamodel expresions
builder.datamodelAccumulator.filter(function(data){return data.expr;}).map(function(data){return'  '+data.id+' = '+generateFnCall(builder.generateExpressionFunction('data',data.expr))+';\n';},builder).join('')+'        '+EARLY_BINDING_DATAMODEL_GUARD+' = true; '+'\n'+'    }\n'+'}':'');}function generateSmObjectLiteral(rootState){//pretty simple
return JSON.stringify(rootState,undefined,1).replace(REFERENCE_MARKER_RE,'$1');}function dumpFunctionDeclarations(fnDecAccumulator){//simple
return fnDecAccumulator.join('\n');}function dumpHeader(strict){var d=new Date();var strictStr=strict?"'use strict';\n":"";return strictStr+'//Generated on '+d.toLocaleDateString()+' '+d.toLocaleTimeString()+' by the SCION SCXML compiler';}function generateFactoryFunctionWrapper(o,name,options){var parts=[o.sendString,o.sendIdLocationString,o.earlyBindingFnDeclaration,o.datamodelDeserializerFnDeclaration,o.datamodelSerializerFnDeclaration,o.actionFunctionDeclarations,'return '+o.objectLiteralString+';'];var program;if(options.debug){program=parts.join('\n\n').split('\n').map(function(line){return'    '+line;}).join('\n');}else{program=parts.join('\n');}return'(function (_x,_sessionid,_ioprocessors,In){\n'+'   var _name = \''+name+'\';'+//'console.log(_x,_sessionid,_name,_ioprocessors,In);\n' +
program+'})';}ModuleBuilder.prototype.generateModule=function(){var rootState=this.rootState;var options=this.options;//TODO: enumerate these module types
if(this.datamodelAccumulator.length){//generalize him as an entry action on the root state
rootState.onEntry=rootState.onEntry||[];//make sure that datamodel initialization fn comes before all other entry actions
rootState.onEntry=[markAsReference(EARLY_BINDING_DATAMODEL_FN_NAME)].concat(rootState.onEntry);}//attach datamodel serialization functions
rootState[DESERIALIZE_DATAMODEL_FN_NAME]=markAsReference(DESERIALIZE_DATAMODEL_FN_NAME);rootState[SERIALIZE_DATAMODEL_FN_NAME]=markAsReference(SERIALIZE_DATAMODEL_FN_NAME);//console.log('rootState.rootScripts',rootState.rootScripts);
//TODO: support other module formats (AMD, UMD, module pattern)
var o={headerString:dumpHeader(options.strict),sendString:this.documentHasSendAction?getDelayInMs.toString():'',sendIdLocationString:this.documentHasSendActionWithIdlocationAttribute?generateIdlocationGenerator(this.sendIdAccumulator):'',earlyBindingFnDeclaration:generateEarlyBindingDatamodelInitFn(this),datamodelDeserializerFnDeclaration:generateDatamodelDeserializerFn(this.datamodelAccumulator),datamodelSerializerFnDeclaration:generateDatamodelSerializerFn(this.datamodelAccumulator),actionFunctionDeclarations:dumpFunctionDeclarations(this.fnDecAccumulator)};delete rootState.rootScripts;//this doesn't need to be in there
o.objectLiteralString=generateSmObjectLiteral(rootState);var s=o.headerString+'\n'+generateFactoryFunctionWrapper(o,rootState.name,options);return s;};function markAsReference(fnName){return REFERENCE_MARKER+fnName+REFERENCE_MARKER;}ModuleBuilder.prototype.replaceActions=function(actionContainer,actionPropertyName){if(actionContainer[actionPropertyName]){var actions=Array.isArray(actionContainer[actionPropertyName])?actionContainer[actionPropertyName]:[actionContainer[actionPropertyName]];actionContainer[actionPropertyName]=actions.map(this.generateActionFunction,this).map(markAsReference);if(actionContainer[actionPropertyName].length===1){actionContainer[actionPropertyName]=actionContainer[actionPropertyName][0];}}};ModuleBuilder.prototype.visitState=function(){var genValue=this.stateGen.next();if(genValue.done){this._finish();return;}var state=genValue.value;//accumulate datamodels
if(state.datamodel){this.datamodelAccumulator.push.apply(this.datamodelAccumulator,state.datamodel);}if(state.onExit)this.replaceActions(state,'onExit');if(state.onEntry)this.replaceActions(state,'onEntry');if(state.transitions){for(var i=0,len=state.transitions.length;i<len;i++){var transition=state.transitions[i];this.replaceActions(transition,'onTransition');if(transition.cond){transition.cond=markAsReference(this.generateAttributeExpression(transition,'cond'));}}}//clean up as we go
delete state.datamodel;setImmediate(function(self){self.visitState();},this);};/**
 * The uncooked SCION module
 * @param {string} [name]  The name of the module derived from the scxml root element's name attribute
 * @param {string} datamodel The raw datamodel declarations
 * @param {Array<ScriptNode>} rootScripts A collection of 0 or more script nodes
 *   Each node contains a src property which references an external js resource
 *   or a content property which references a string containing the uncooked js
 * @param {string} scxmlModule A massive string containing the generated scxml program
 *   less the parts enumerated above
 */function SCJsonRawModule(name,datamodel,rootScripts,scxmlModule){this.name=name;this.datamodel=datamodel;this.rootScripts=rootScripts;this.module=scxmlModule;}function genStates(state){var j,len;return regeneratorRuntime.wrap(function genStates$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return state;case 2:if(!state.states){_context.next=9;break;}j=0,len=state.states.length;case 4:if(!(j<len)){_context.next=9;break;}return _context.delegateYield(genStates(state.states[j]),"t0",6);case 6:j++;_context.next=4;break;case 9:case"end":return _context.stop();}}},_marked[0],this);}function ModuleBuilder(docUrl,rootState,options){this.docUrl=docUrl;this.rootState=rootState;if(!rootState.rootScripts){rootState.rootScripts=[];}this.externalActionScripts=new Set();this.options=options;this.datamodelAccumulator=[];this.fnDecAccumulator=[];this.sendIdAccumulator=[];this.documentHasSendAction=false;this.documentHasSendActionWithIdlocationAttribute=false;this.resolve=undefined;this.reject=undefined;this.stateGen=genStates(this.rootState);}ModuleBuilder.prototype.build=function(){var self=this;return new Promise(function(resolve,reject){self.resolve=resolve;self.reject=reject;self.visitState();});};ModuleBuilder.prototype._finish=function(){// grab the root scripts before generateDatamodelDeclaration hackily deletes them
var rootScripts=this.rootState.rootScripts;var dataModel=generateDatamodelDeclaration(this.datamodelAccumulator);var scxmlModule=this.generateModule();var jsModule=new SCJsonRawModule(this.rootState.name,dataModel,rootScripts,scxmlModule);this.resolve(jsModule);};function startTraversal(docUrl,rootState,options){if(!options){options={};}var moduleBuilder=new ModuleBuilder(docUrl,rootState,options);return moduleBuilder.build();}ModuleBuilder.prototype.safelyAddVariableToDatamodelAccumulator=function(variableName,lineNum,colNum){if(!this.datamodelAccumulator.some(function(data){return data.id===variableName;})){// add datamodel declaration to the accumulator
this.datamodelAccumulator.push({$line:lineNum,$col:colNum,id:variableName});}};/**
 * Handles an externally referenced script within an executable content block
 * @param  {object} action The script action
 * @return {string} A call to the named function that will be injected at model preparation time
 * @see document-string-to-model#prepare
 */ModuleBuilder.prototype.handleExternalActionScript=function(action){// base the generated function name on the fully-qualified url, NOT on its position in the file
var fnName=to_js_identifier(action.src);// Only load the script once. It will be evaluated as many times as it is referenced.
if(!this.externalActionScripts.has(action.src)){this.externalActionScripts.add(action.src);action.$wrap=function(body){return generateFnDeclaration(fnName,body,action);};this.rootState.rootScripts.push(action);}return generateFnCall(fnName);};function getVariableNameForShallowCopy(builder){//Assign a number higher than current total number of variables in accumulator
return'$scionArray_'+builder.datamodelAccumulator.length+1;}var actionTags={"script":function script(action,builder){if(action.src){return builder.handleExternalActionScript(action);}else{return action.content;}},"assign":function assign(action,builder){return action.location.expr+" = "+generateFnCall(builder.generateAttributeExpression(action,'expr'))+";";},"log":function log(action,builder){var params=[];if(action.label){params.push(JSON.stringify(action.label));}else if(action.labelexpr){// extends SCXML 1.0
params.push(generateFnCall(builder.generateAttributeExpression(action,'labelexpr')));}else{// always push *something* so the interpreter context
// can differentiate between label and message
params.push('null');}if(action.expr){params.push(generateFnCall(builder.generateAttributeExpression(action,'expr')));}return"this.log("+params.join(",")+");";},"if":function _if(action,builder){var s="";var ifCondExprName=builder.generateAttributeExpression(action,'cond');s+="if("+generateFnCall(ifCondExprName)+"){\n";var childNodes=action.actions;for(var i=0;i<childNodes.length;i++){var child=childNodes[i];if(child.$type==="elseif"||child.$type==="else"){break;}else{s+='    '+generateFnCall(builder.generateActionFunction(child))+';\n';}}//process if/else-if, and recurse
for(;i<childNodes.length;i++){child=childNodes[i];if(child.$type==="elseif"){s+="}else if("+generateFnCall(builder.generateAttributeExpression(child,'cond'))+"){\n";}else if(child.$type==="else"){s+="}";break;}else{s+='    '+generateFnCall(builder.generateActionFunction(child))+';\n';}}for(;i<childNodes.length;i++){child=childNodes[i];//this should get encountered first
if(child.$type==="else"){s+="else{\n";}else{s+='    '+generateFnCall(builder.generateActionFunction(child))+';\n';}}s+="}";return s;},"elseif":function elseif(){throw new Error("Encountered unexpected elseif tag.");},"else":function _else(){throw new Error("Encountered unexpected else tag.");},"raise":function raise(action){return"this.raise({ name:"+JSON.stringify(action.event)+", data : {}});";},"cancel":function cancel(action){return"this.cancel("+JSON.stringify(action.sendid)+");";},"send":function send(action,builder){builder.documentHasSendAction=true;//set the global flag
function processAttr(container,attr){if(attr==='id'){builder.sendIdAccumulator.push(container[attr]);}var exprName=attr+'expr';if(attr==='idlocation'){builder.documentHasSendActionWithIdlocationAttribute=true;var fakeExpr=JSON.parse(JSON.stringify(container));//FIXME: overwriting this variable is a bit ugly.
//if we're going to generate this expr on the fly, it would be better to clone the container.
container[attr].expr=container[attr].expr+'='+generateFnCall(GENERATE_SENDID_FN_NAME);var fnName=builder.generateAttributeExpression(container,attr);return generateFnCall(fnName);}else if(container[exprName]){var fnName=builder.generateAttributeExpression(container,exprName);return generateFnCall(fnName);}else if(container[attr]){return JSON.stringify(container[attr]);}else{return null;}}function constructSendEventData(action){//content and @contentexpr has priority over namelist and params
if(action.content){return'            '+JSON.stringify(action.content);//TODO: inline it if content is pure JSON. call custom attribute 'contentType'?
}else if(action.contentexpr){return generateFnCall(builder.generateAttributeExpression(action,'contentexpr'));}else{var props=[];//namelist
if(action.namelist){action.namelist.expr.trim().split(/ +/).forEach(function(name){props.push('"'+name+'"'+":"+name);//FIXME: should add some kind of stack trace here. this is hard, though, because it aggregates multiple expressions to a single line/column
});}//params
if(action.params&&action.params.length){action.params.forEach(function(param){if(param.expr){props.push('"'+param.name+'"'+":"+generateFnCall(builder.generateAttributeExpression(param,'expr')));}else if(param.location){props.push('"'+param.name+'"'+":"+generateFnCall(builder.generateAttributeExpression(param,'location')));}});}return"{\n"+props.join(',\n')+"}\n";}}var target=processAttr(action,'target'),targetVariableName='_scionTargetRef',targetDeclaration='var '+targetVariableName+' = '+target+';\n';var event="{\n"+"  target: "+targetVariableName+",\n"+"  name: "+processAttr(action,'event')+",\n"+"  type: "+processAttr(action,'type')+",\n"+"  data: \n"+constructSendEventData(action)+",\n"+"  origin: _sessionid\n"+"}";var sendId;if(action.id){sendId=processAttr(action,'id');}else if(action.idlocation){sendId=processAttr(action,'idlocation');}else{sendId='null';}var send=targetDeclaration+"if("+targetVariableName+" === '#_internal'){\n"+"     this.raise(\n"+event+");\n"+"}else{\n"+"     this.send(\n"+event+", \n"+"       {\n"+"           delay: getDelayInMs("+processAttr(action,'delay')+"),\n"+//TODO: delay needs to be parsed at runtime
"           sendid: "+sendId+"\n"+"       });\n"+"}";return send;},"foreach":function foreach(action,builder){//FIXME: the index variable could shadow the datamodel. We should pick a unique temperorary variable name
var index=action.index||"$i",item=action.item,arr=action.array.expr,foreachFnNames=action.actions?action.actions.map(builder.generateActionFunction,builder):[];[action.item,action.index,action.array.expr].forEach(function(variableNameToDeclare){if(variableNameToDeclare){builder.safelyAddVariableToDatamodelAccumulator(variableNameToDeclare,action.$line,action.$column);}});var shallowArrayName=getVariableNameForShallowCopy(builder);var forEachContents='var '+shallowArrayName+' = '+arr+';\n'+'if(Array.isArray('+shallowArrayName+')){\n'+'    for('+index+' = 0; '+index+' < '+shallowArrayName+'.length;'+index+'++){\n'+'       '+item+' = '+shallowArrayName+'['+index+'];\n'+foreachFnNames.map(function(fnName){return'       '+generateFnCall(fnName)+';';}).join('\n')+'\n'+'    }\n'+'} else{\n'+'    for('+index+' in '+shallowArrayName+'){\n'+'        if('+shallowArrayName+'.hasOwnProperty('+index+')){\n'+'           '+item+' = '+shallowArrayName+'['+index+'];\n'+foreachFnNames.map(function(fnName){return'           '+generateFnCall(fnName)+';';}).join('\n')+'\n'+'        }\n'+'    }\n'+'}';return forEachContents;},"custom":function custom(action){var customTagConfig={name:'Sandbox.action',data:action};return"postMessage("+JSON.stringify(customTagConfig,null,4)+");";}};function getDelayInMs(delayString){if(typeof delayString==='string'){if(delayString.slice(-2)==="ms"){return parseFloat(delayString.slice(0,-2));}else if(delayString.slice(-1)==="s"){return parseFloat(delayString.slice(0,-1))*1000;}else if(delayString.slice(-1)==="m"){return parseFloat(delayString.slice(0,-1))*1000*60;}else{return parseFloat(delayString);}}else if(typeof delayString==='number'){return delayString;}else{return 0;}}//flow through the code and
//generate idlocationGenerator if we find
var GENERATE_SENDID_FN_NAME='$generateSendId';function generateIdlocationGenerator(sendIdAccumulator){return'var $sendIdCounter = 0;\n'+'var $sendIdAccumulator = '+JSON.stringify(sendIdAccumulator)+';\n'+'function '+GENERATE_SENDID_FN_NAME+'(){\n'+'  var sendid;\n'+'  do{\n'+'    sendid = "$scion.sendid" + $sendIdCounter++;\n'+//make sure we don't clobber an existing sendid
'  } while($sendIdAccumulator.indexOf(sendid) > -1)\n'+'  return sendid;\n'+'}';}module.exports=startTraversal;//for executing directly under node.js
if(require.main===module){//TODO: clean up command-line interface so that we do not expose unnecessary cruft
var usage='Usage: $0 [ FILE | - ]';var argv=require('optimist').usage(usage).argv;var input=argv._[0];if(!input){console.error(usage);process.exit(1);}else if(input==='-'){//read from stdin or file
process.stdin.setEncoding('utf8');process.stdin.resume();var jsonString='';process.stdin.on('data',function(s){jsonString+=s;});process.stdin.on('end',go);}else{var fs=require('fs');jsonString=fs.readFileSync(input,'utf8');go(input);}}function go(docUrl){if(!docUrl){docUrl='';}startTraversal(docUrl,JSON.parse(jsonString),{debug:true}).then(function resolved(jsModule){console.log(jsModule.module);},function rejected(err){console.error(err);});}}).call(this,require('_process'));},{"_process":23,"fs":12,"optimist":56,"text-to-js-identifier":61}],2:[function(require,module,exports){(function(process){//TODO: resolve data/@src and script/@src. either here, or in a separate module.
//TODO: remove nodejs dependencies
//TODO: decide on a friendly, portable interface to this module. streaming is possible, but maybe not very portable.
var sax=require("sax"),strict=true,// set to false for html-mode
parser;function merge(o1,o2){Object.keys(o2).forEach(function(k){o1[k]=o2[k];});return o1;}function getNormalizedAttributeName(attr){return attr.uri?'{'+attr.uri+'}'+attr.local:attr.local;}function copyNsAttrObj(o){var r={};Object.keys(o).forEach(function(k){var attr=o[k];r[getNormalizedAttributeName(attr)]=attr.value;});return r;}function transform(xmlString){parser=sax.parser(strict,{trim:true,xmlns:true});var rootJson,currentJson,expressionAttributeCache,//we cache them because in sax-js attributes get processed before the nodes they're attached to,
//and this is the only way we can capture their row/col numbers.
//so when we finally find one, it gets popped off the stack.
jsonStack=[],allTransitions=[];//we keep a reference to these so we can clean up the onTransition property later
function createActionJson(node){var action=merge({$line:parser.line,$column:parser.column,$type:node.local},copyNsAttrObj(node.attributes));//console.log('action node',node);
var actionContainer;if(Array.isArray(currentJson)){//this will be onExit and onEntry
currentJson.push(action);}else if(currentJson.$type==='scxml'&&action.$type==='script'){//top-level script
currentJson.rootScripts=currentJson.rootScripts||[];currentJson.rootScripts.push(action);}else{//if it's any other action
currentJson.actions=currentJson.actions||[];currentJson.actions.push(action);}return currentJson=action;}function createDataJson(node){currentJson=merge({$line:parser.line,$column:parser.column,$type:'data'},copyNsAttrObj(node.attributes));return currentJson;}function createStateJson(node){var state=copyNsAttrObj(node.attributes);if(state.type){state.isDeep=state.type==='deep'?true:false;}//"state" is the default, so you don't need to explicitly write it
if(node.local!=='state'&&node.local!=='schema')state.$type=node.local;if(currentJson){if(!currentJson.states){currentJson.states=[];}currentJson.states.push(state);}return currentJson=state;}function createTransitionJson(node){var transition=copyNsAttrObj(node.attributes);//target can either be a string, an array (for multiple targets, e.g. targeting, or undefined
if(transition.target){//console.log('transition',transition);
transition.target=transition.target.trim().split(/\s+/);if(transition.target.length===1){transition.target=transition.target[0];}}if(currentJson){if(!currentJson.transitions){currentJson.transitions=[];}currentJson.transitions.push(transition);}allTransitions.push(transition);return currentJson=transition;}function createExpression(value){return{$line:parser.line,$column:parser.column,expr:value};}var tagActions={"scxml":function scxml(node){return rootJson=createStateJson(node);},"initial":createStateJson,"history":createStateJson,"state":createStateJson,"parallel":createStateJson,"final":createStateJson,//transitions/action containers
"transition":createTransitionJson,"onentry":function onentry(node){currentJson=currentJson.onEntry=currentJson.onEntry||[];},"onexit":function onexit(node){currentJson=currentJson.onExit=currentJson.onExit||[];},//actions
"foreach":createActionJson,"raise":createActionJson,"log":createActionJson,"assign":createActionJson,"validate":createActionJson,"script":createActionJson,"cancel":createActionJson,//TODO: deal with namelist
//TODO: decide how to deal with location expressions, as opposed to regular expressions
"send":createActionJson,//children of send
"param":function param(node){//TODO: figure out how to deal with param and param/@expr and param/@location
currentJson.params=currentJson.params||[];var attr=copyNsAttrObj(node.attributes);currentJson.params.push(attr);currentJson=attr;},"content":function content(){if(expressionAttributeCache.expr){currentJson.contentexpr=merge({},expressionAttributeCache.expr);}},//these are treated a bit special - TODO: normalize/decide on a representation
"if":createActionJson,"elseif":createActionJson,"else":createActionJson,//data
"datamodel":function datamodel(node){//console.log('datamodel currentJson',currentJson);
currentJson=currentJson.datamodel=[];},"data":function data(node){//console.log('data currentJson',currentJson);
currentJson.push(createDataJson(node));}//TODO: these
//"invoke":,
//"finalize":,
//"donedata":
};expressionAttributeCache={};//TODO: put in onstart or something like that
parser.onopentag=function(node){//console.log("open tag",node.local);
if(tagActions[node.local]){tagActions[node.local](node);jsonStack.push(currentJson);//console.log('current json now',currentJson,jsonStack.length);
//merge in the current expression attribute cache
merge(currentJson,expressionAttributeCache);expressionAttributeCache={};//clear the expression attribute cache
}else{createActionJson(node);jsonStack.push(currentJson);merge(currentJson,expressionAttributeCache);expressionAttributeCache={};}};var EXPRESSION_ATTRS=['cond','array','location','namelist','idlocation'];parser.onclosetag=function(tag){//console.log("close tag",tag);
var localName=tag.split(':').pop();// if(tagActions[localName]){
jsonStack.pop();currentJson=jsonStack[jsonStack.length-1];//console.log('current json now',currentJson,jsonStack.length);
// }
};parser.onattribute=function(attr){//if attribute name ends with 'expr' or is one of the other ones enumerated above
//then cache him and his position
if(attr.name.match(/^.*expr$/)||EXPRESSION_ATTRS.indexOf(attr.name)>-1){expressionAttributeCache[getNormalizedAttributeName(attr)]=createExpression(attr.value);}};parser.onerror=function(e){// an error happened.
throw e;};parser.ontext=function(t){//the only text we care about is that inside of <script> and <content>
if(currentJson&&currentJson.$type){if(currentJson.$type==='script'){currentJson.content=t;//I don't think we need a separate expression for this w/ line/col mapping
}else if(currentJson.$type==='send'){currentJson.content=t;}else if(currentJson.$type==='data'){currentJson.content={$line:currentJson.$line,$column:currentJson.$column,expr:t};}else{currentJson.content=t;}}};parser.oncdata=function(t){currentJson.content=t;};parser.onend=function(){//do some scrubbing of root attributes
delete rootJson.xmlns;//delete rootJson.type;     //it can be useful to leave in 'type' === 'scxml'
delete rootJson.version;if(typeof rootJson.datamodel==='string')delete rootJson.datamodel;//this would happen if we have, e.g. state.datamodel === 'ecmascript'
//change the property name of transition event to something nicer
allTransitions.forEach(function(transition){transition.onTransition=transition.actions;delete transition.actions;});};parser.write(xmlString).close();return rootJson;}module.exports=transform;//for executing diretly under node.js
if(require.main===module){//TODO: allow reading from stdin directly
//TODO: use saxjs's support for streaming API.
console.log(JSON.stringify(transform(require('fs').readFileSync(process.argv[2],'utf8')),4,4));}}).call(this,require('_process'));},{"_process":23,"fs":12,"sax":59}],3:[function(require,module,exports){var platform=require('../../runtime/platform-bootstrap/node/platform');var fileUtils={read:function read(filePath,docUrl,context,cb){var result={error:null,content:''};if(docUrl){filePath=platform.url.resolve(docUrl,filePath);}platform.getResourceFromUrl(filePath,function(err,text,mimeType){if(err){result.error="Error downloading document \""+filePath+"\", "+(err.message||err);//TODO kill the process if file is not present
}else{result.content=text;}cb(result);},context);}};module.exports=fileUtils;},{"../../runtime/platform-bootstrap/node/platform":9}],4:[function(require,module,exports){'use strict';var esprima=require('esprima');var fileUtils=require('./file-utils');var systemVariables=["_event","_sessionid","_name","_ioprocessors","_x"];var scJsonAnalyzer={analyze:function analyze(scJson,docUrl,context,done){var changes=[],syntaxErrors=[],asyncCount=0,waitingForAsync=false,reportCompileErrors=context.reportAllErrors===true;function processState(state){if(state.datamodel)processActions(state,'datamodel');if(state.onExit)processActions(state,'onExit');if(state.onEntry)processActions(state,'onEntry');if(state.transitions){processActions(state,'transitions',state);state.transitions.forEach(function(transition,i){if(transition.onTransition){processActions(transition,'onTransition');}});}if(state.rootScripts){processActions(state,'rootScripts');}if(state.states)state.states.forEach(function(substate,i){processState(substate);});}function processActions(actionContainer,name,state){if(Array.isArray(actionContainer[name])){Object.keys(actionContainer[name]).forEach(function(i){checkAction(actionContainer[name],i,actionContainer[name][i].$type||name,state);if(actionContainer[name][i].actions)processActions(actionContainer[name][i],'actions');});}else{checkAction(actionContainer,name,name,state);}}function checkAction(action,propertyName,$type,state){if(actionTags[$type]){var errors=actionTags[$type](action[propertyName],function(errors,override){if(override){handleError(action,propertyName,errors,$type,state,override);}else if(errors.length>0){handleError(action,propertyName,errors,$type,state);}asyncDone();});if(errors){if(errors.override){handleError(action,propertyName,errors.errors,$type,state,errors.override);}else if(errors.length>0){handleError(action,propertyName,errors,$type,state);}}}}var actionTags={'data':function data(node,done){//If there is an external file and
//src attribute starting exactly with "file:"
if(node.src&&node.src.indexOf('file:')===0){asyncStarted();getFileContents(node.src.substring(5),function(error,content){if(error){done([error]);}else{delete node.src;node.expr={$column:node.$column,$line:node.$line,expr:normalizeWhitespace(content)};done(null,node);}});}else if(node.content){var errors=validateJavascriptAssignment(node.id,node.content);if(errors.length>0){node.content.expr=normalizeWhitespace(node.content.expr);}node.expr=node.content;delete node.content;return{override:node,errors:errors};}else{return validateJavascriptAssignment(node.id,node.expr);}},'assign':function assign(node){if(node.location&&node.expr){return validateJavascriptAssignment(node.location,node.expr);}return[];},'transitions':function transitions(node){if(node.cond){// return validateJavascriptCondition(node.cond);
var errors=validateJavascriptCondition(node.cond);if(errors.length){//Assume illegal booleans as false, send override
//https://github.com/jbeard4/scxml-test-framework/blob/2.0.0/test/w3c-ecma/test309.txml.scxml
node.cond.expr='false';return{override:node,errors:errors};}}return[];},'if':function _if(node){return validateJavascriptCondition(node.cond);},'ifelse':function ifelse(node){return validateJavascriptCondition(node.cond);},'script':function script(node,done){if(node.src){// DO NOT inline the external script here. that MUST be done
// each time the parent document is requested
}else if(node.content){return validateArbitraryJavascript(node.content);}},'log':function log(node){if(node.expr){return validateJavascriptExpression(node.expr,true);}return[];},'send':function send(node){if(node.$type){return validateJavascriptExpression(node.expr);}return[];},'foreach':function foreach(node){var errors=[];if(node.item){var results=validateJavascriptIdentifier(node.item);if(results&&results.length>0){errors=errors.concat(results);}}if(node.index){var results=validateJavascriptIdentifier(node.index);if(results&&results.length>0){errors=errors.concat(results);}}if(node.array){var results=validateJavascriptExpression(node.array);if(results&&results.length>0){errors=errors.concat(results);}}return errors;}};function validateJavascriptAssignment(leftHand,rightHand){var errors=[];var leftHandCheck=validateArbitraryJavascript(leftHand);var rightHandCheck=validateArbitraryJavascript(extractJavascript(leftHand)+' = '+extractJavascript(rightHand));if(leftHandCheck.length){errors.push(leftHandCheck);}else if(rightHandCheck.length){errors.push(rightHandCheck);}else if(systemVariables.indexOf(extractJavascript(leftHand))!==-1){errors.push('You can\'t change system variables: '+leftHand);}return errors;}function validateJavascriptCondition(condition){return validateArbitraryJavascript(condition);}function validateJavascriptExpression(js,allowLiteral){return validateArbitraryJavascript(js,allowLiteral);}function validateJavascriptIdentifier(js){js=extractJavascript(js);var errors=validateArbitraryJavascript(js);if(errors.length)return errors;var syntaxTree=esprima.parse(js,{});if(syntaxTree.body[0].expression.type!=='Identifier'){return['Illegal identifier: '+js];}}function validateArbitraryJavascript(js,allowLiteral){js=extractJavascript(js);if(allowLiteral){js='_lhs = '+js;}var errors=[];try{var syntaxTree=esprima.parse(js,{});traverseSyntaxTree(syntaxTree,errors);}catch(e){errors.push(e.message);}return errors;}var treeTypes={"AssignmentExpression":function AssignmentExpression(tree,errors){//Check if assignee is a system variable in for statement
if(tree.init&&tree.init.left&&systemVariables.indexOf(tree.init.left.name)!==-1){errors.push('You can\'t change system variables: '+tree.init.left.name);}//Check if assignee is a system variable in expressions
if(tree.expression&&tree.expression.left&&systemVariables.indexOf(tree.expression.left.name)!==-1){errors.push('You can\'t change system variables: '+tree.expression.left.name);}}};function traverseSyntaxTree(tree,errors){Object.keys(tree).forEach(function(i){if(tree[i]&&_typeof(tree[i])==='object'){if(tree[i].type&&treeTypes[tree[i].type]){treeTypes[tree[i].type](tree,errors);}//Go deeper into the child nodes
traverseSyntaxTree(tree[i],errors);}});}function getFileContents(filePath,done){//docUrl and context are coming from top function.
fileUtils.read(filePath,docUrl,context,function(fileContent){done(fileContent.error,fileContent.content);});}function handleError(node,property,errors,$type,state,override){if(reportCompileErrors&&errors&&errors.length){var n=node[property];syntaxErrors.push({tagname:n.$type,line:n.$line,column:n.$column,reason:errors.join('; ')});}var errorNode={$line:node[property].$line,$column:node[property].$column,$type:'raise',event:'error.execution',data:{message:errors?errors.join(', '):''}};changes.push({old:node,prop:property,$type:$type,new:override,state:state,error:errorNode});}function extractJavascript(attribute){//Just a workaround for esprima parsing.
if((typeof attribute==="undefined"?"undefined":_typeof(attribute))==='object'){attribute=attribute.expr;}return attribute;}function normalizeWhitespace(str){return JSON.stringify(str.replace(/^\s+|\s+$|\s+(?=\s)/g,'').replace(/\s/g," "));}function commitChanges(scJson,errors){changes.forEach(function(change){if(change.$type==='data'&&!change.new){delete scJson.datamodel;scJson.onEntry=[change.new||change.error];}else if(change.$type==='script'&&!change.new&&scJson.rootScripts){delete scJson.rootScripts;scJson.onEntry=[change.error];}else if(change.$type==='transitions'){if(!change.state.onEntry)change.state.onEntry=[];change.state.onEntry.push(change.error);change.old[change.prop]=change.new;}else{change.old[change.prop]=change.new||change.error;}});}function asyncStarted(){asyncCount++;}function asyncDone(){asyncCount--;//If we are only waiting for async processes
if(waitingForAsync&&asyncCount===0){completeAnalysis();}}function completeAnalysis(){if(syntaxErrors.length){scJson=undefined;}else{commitChanges(scJson);}done({scJson:scJson,errors:syntaxErrors});}processState(scJson,'scJson');if(asyncCount===0){completeAnalysis();}else{//Wait for async processes to end
waitingForAsync=true;}}};module.exports=scJsonAnalyzer;},{"./file-utils":3,"esprima":11}],5:[function(require,module,exports){module.exports={scxmlToScjson:require('../compiler/scxml-to-scjson'),scjsonToModule:require('../compiler/scjson-to-module'),scJsonAnalyzer:require('../compiler/static-analysis/scjson-analyzer')};},{"../compiler/scjson-to-module":1,"../compiler/scxml-to-scjson":2,"../compiler/static-analysis/scjson-analyzer":4}],6:[function(require,module,exports){/*
     Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
*/"use strict";var compilerInternals=require('./compiler-internals'),platform=require('./platform-bootstrap/node/platform'),fs=require('fs'),vm=require('vm'),assert=require('assert');var scxmlToScjson=compilerInternals.scxmlToScjson,scjsonToModule=compilerInternals.scjsonToModule,scJsonAnalyzer=compilerInternals.scJsonAnalyzer;/**
 * Compile the raw scxml document into a compiled JS module
 * Top-level scripts are extracted so that they can be compiled and executed independently
 * @param  {string}   url       The url of the scxml document
 * @param  {string}   docString The raw scxml document to be parsed
 * @param  {Function} cb        The callback to invoke once the document has been parsed
 * @param  {object}   [hostContext]   Context provided by the interpreter host
 */function documentStringToModel(url,docString,cb,hostContext){if((typeof hostContext==="undefined"?"undefined":_typeof(hostContext))!=='object'||hostContext===null){hostContext={};}var scJson=scxmlToScjson(docString);scJsonAnalyzer.analyze(scJson,url,hostContext,function(result){if(result.errors.length){cb(result.errors);return;};createModule(url,result.scJson,hostContext,cb);});}function fetchScript(scriptInfo,hostContext){return new Promise(function(resolve,reject){platform.getScriptFromUrl(scriptInfo.src,function(err,compiledScript,mimeType){if(err){reject(err);}else{scriptInfo.compiled=compiledScript;resolve(scriptInfo);}},hostContext,{lineOffset:scriptInfo.$line,columnOffset:scriptInfo.$column,$wrap:scriptInfo.$wrap});});}/**
 * Compile the generated scxml module and any embedded or external scripts
 * @param  {string}   docUrl        The scxml document url
 * @param  {SCJsonRawModule}   rawModule      The raw SCION module created by scjson-to-module
 * @param  {object}   [hostContext]   Context provided by the interpreter host
 * @param  {Function} cb            Callback to invoke with the compiled module or an error
 */function compileModule(docUrl,rawModule,hostContext,cb){var promiseOffset=2;var rootScripts=rawModule.rootScripts;var scriptCount=rootScripts.length;var promises=new Array(scriptCount+promiseOffset);for(var i=0;i<scriptCount;i++){var curScript=rootScripts[i];if(curScript.src){curScript.src=platform.url.resolve(docUrl,curScript.src);// defer the fetch until SCModel.prepare
promises[i+promiseOffset]=Promise.resolve(curScript);}else{promises[i+promiseOffset]=new Promise(function(resolve,reject){try{var content=curScript.content;delete curScript.content;var compiledScript=platform.module.compileScript(content,{filename:docUrl,lineOffset:curScript.$line,columnOffset:curScript.$column});curScript.compiled=compiledScript;resolve(curScript);}catch(e){reject(e);}});}}promises[0]=new Promise(function(resolve,reject){try{var compiledModule=platform.module.compileScript(rawModule.module,{filename:docUrl});resolve(compiledModule);}catch(e){reject(e);}});promises[1]=new Promise(function(resolve,reject){if(!rawModule.datamodel){resolve(undefined);}else{try{var compiledDatamodel=platform.module.compileScript(rawModule.datamodel,{filename:docUrl});resolve(compiledDatamodel);}catch(e){reject(e);}}});Promise.all(promises).then(function compileSuccess(scripts){var compiledModule=scripts.shift();var datamodelDecl=scripts.shift();var model=new SCModel(rawModule.name,datamodelDecl,rootScripts,compiledModule);cb(null,model);},function compileError(err){cb(err);});}function SCModel(name,datamodel,rootScripts,scxmlModule){this.name=name;this.datamodel=datamodel;this.rootScripts=rootScripts;this.module=scxmlModule;}/**
 * Prepares an scxml model for execution by binding it to an execution context
 * @param  {object} [executionContext] The execution context  (e.g. v8 VM sandbox).
 *   If not provided, a bare bones context is constructed
 * @param  {Function} cb  Callback to execute with the prepared model or an error
 *   The prepared model is a function to be passed into a SCION StateChart object
 * @param  {object} [hostContext]  Context provided by the interpreter host
 */SCModel.prototype.prepare=function(cb,executionContext,hostContext){if(!executionContext){executionContext=platform.module.createExecutionContext();}if(!vm.isContext(executionContext)){executionContext=vm.createContext(executionContext);}if((typeof hostContext==="undefined"?"undefined":_typeof(hostContext))!=='object'||hostContext===null){hostContext={};}var scriptCount=this.rootScripts.length;var scriptPromises=new Array(scriptCount);for(var i=0;i<scriptCount;i++){var curScript=this.rootScripts[i];if(curScript.src){// script url already resolved in compileModule
scriptPromises[i]=fetchScript(curScript,hostContext);}else{assert(curScript.compiled);scriptPromises[i]=Promise.resolve(curScript);}}var self=this;Promise.all(scriptPromises).then(function resolved(scripts){try{if(self.datamodel){self.datamodel.runInContext(executionContext);}for(var _i2=0;_i2<scriptCount;_i2++){self.rootScripts[_i2].compiled.runInContext(executionContext);}var modelFn=self.module.runInContext(executionContext);cb(undefined,modelFn);}catch(e){cb(e);}},function rejected(err){cb(err);});};function createModule(url,scJson,hostContext,cb){if(platform.debug){console.log('scjson',JSON.stringify(scJson,undefined,2));if(!hostContext.hasOwnProperty('debug')){hostContext.debug=true;}}scjsonToModule(url,scJson,hostContext).then(function resolved(rawModule){if(platform.debug&&rawModule.name){fs.writeFileSync('/var/tmp/'+rawModule.name+'.scion',rawModule.module);}compileModule(url,rawModule,hostContext,cb);},function rejected(err){cb(err);});}module.exports=documentStringToModel;},{"./compiler-internals":5,"./platform-bootstrap/node/platform":9,"assert":13,"fs":12,"vm":62}],7:[function(require,module,exports){/*
     Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
*/"use strict";var platform=require('./platform-bootstrap/node/platform'),documentStringToModel=require('./document-string-to-model');/**
 * Includes options passed to the model compiler as well as 
 *   data passed along to the platform-specific resource-fetching API. 
 * @typedef {object} ModelContext
 * @property {boolean} [reportAllErrors=false] Indicates whether or not data model (aka JavaScript) 
 *   compilation errors cause the callback to be invoked with errors. By default these errors
 *   are raised to the offending document as error.execution events.
 *//**
  * @param {string} url URL of the SCXML document to retrieve and convert to a model
  * @param {function} cb callback to invoke with an error or the model
  * @param {ModelContext} [context] The model compiler context
  */function urlToModel(url,cb,context){platform.http.get(url,function(err,doc){if(err){cb(err,null);}else{documentStringToModel(url,doc,cb,context);}},context);}/**
  * @param {string} url file system path of the SCXML document to retrieve and convert to a model
  * @param {function} cb callback to invoke with an error or the model
  * @param {ModelContext} [context] The model compiler context
  */function pathToModel(url,cb,context){context=context||{};context.isLoadedFromFile=true;//this is useful later on for setting up require() when eval'ing the generated code 
platform.fs.get(url,function(err,doc){if(err){cb(err,null);}else{documentStringToModel(url,doc,cb,context);}},context);}/**
  * @param document SCXML document to convert to a model
  * @param {function} cb callback to invoke with an error or the model
  * @param {ModelContext} [context] The model compiler context
  */function documentToModel(doc,cb,context){var s=platform.dom.serializeToString(doc);documentStringToModel(null,s,cb,context);}//export standard interface
module.exports={pathToModel:pathToModel,urlToModel:urlToModel,documentStringToModel:documentStringToModel,documentToModel:documentToModel,ext:{platform:platform,compilerInternals:require('./compiler-internals')//expose
},scion:require('scion-core')};},{"./compiler-internals":5,"./document-string-to-model":6,"./platform-bootstrap/node/platform":9,"scion-core":60}],8:[function(require,module,exports){/*
     Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
*/"use strict";/**
 * This module contains some utility functions for getting stuff in node.js.
 */var http=require('http'),urlM=require('url'),fs=require('fs');function httpGet(url,cb){var options=urlM.parse(url);http.get(options,function(res){var s="";res.on('data',function(d){s+=d;});res.on('end',function(){if(res.statusCode===200){cb(null,s);}else{cb(new Error('HTTP code '+res.statusCode+' : '+s));}});}).on('error',function(e){cb(e);});}function getResource(url,cb,context){var urlObj=urlM.parse(url);if(urlObj.protocol==='http:'||url.protocol==='https:'||typeof window!=='undefined'//are we actually in the browser?
){httpGet(url,cb);}else if(!urlObj.protocol){//assume filesystem
fs.readFile(url,'utf8',cb);}else{//pass in error for unrecognized protocol
cb(new Error("Unrecognized protocol"));}}module.exports={getResource:getResource,httpGet:httpGet};},{"fs":12,"http":44,"url":51}],9:[function(require,module,exports){(function(process){/*
     Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
*/"use strict";var fs=require('fs'),_get=require('./get'),pathModule=require('path'),vm=require('vm'),url=require('./url'),Module=require('module');module.exports={//used in parsing
http:{get:function get(url,cb){_get.httpGet(url,cb);}},fs:{get:function get(path,cb,context){fs.readFile(path,'utf8',cb);}},getResourceFromUrl:_get.getResource,getScriptFromUrl:function getScriptFromUrl(url,cb,context,scriptInfo){_get.getResource(url,function(err,content){if(err){cb(err);return;}if(typeof scriptInfo.$wrap==='function'){content=scriptInfo.$wrap(content);}var options=Object.assign({filename:url},scriptInfo);try{var script=new vm.Script(content,options);cb(undefined,script);}catch(e){cb(e);}},context);},path:require('path'),//same API
url:{resolve:url.resolve},module:{createLocalExecutionContext:function createLocalExecutionContext(docPath,sandbox){if(!sandbox){sandbox={console:console};sandbox.global=sandbox;}var ctx=vm.createContext(sandbox);ctx.__filename=docPath;ctx.__dirname=pathModule.dirname(ctx.__filename);//set it up so that require is relative to file
var _module=ctx.module=new Module(docPath);var _require=ctx.require=function(path){return Module._load(path,_module,true);};_module.filename=ctx.__filename;_require.paths=_module.paths=Module._nodeModulePaths(process.cwd());_require.resolve=function(request){return Module._resolveFilename(request,_module);};return ctx;},/**
         * create a context in which to execute javascript
         * @param  {object} [sandbox] An object to contextify
         * @return {object} An execution context
         * @see {@link https://nodejs.org/dist/latest-v4.x/docs/api/vm.html#vm_vm_createcontext_sandbox}
         */createExecutionContext:function createExecutionContext(sandbox,hostContext){return vm.createContext(sandbox);},/**
         * Create a compiled script object
         * @param  {string} src     The js source to compile
         * @param  {object} options compilation options
         * @param  {string} options.filename The path to the file associated with the source
         * @param  {number} options.lineOffset The offset to the line number in the scxml document
         * @param  {number} options.columnOffset The offset to the column number in the scxml document
         * @return {Script} A Script object which implements a runInContext method
         * @see {@link https://nodejs.org/dist/latest-v4.x/docs/api/vm.html#vm_class_script}
         */compileScript:function compileScript(src,options){return new vm.Script(src,options);},eval:function _eval(s,fileName,context){context=context||{};fileName=fileName||'';//TODO: if filename starts with 'http', substitute a default require
// https://247inc.atlassian.net/browse/OMNI-3
// create an isolated sandbox per session
var sandbox={};sandbox.global=sandbox;var ctx=vm.createContext(sandbox);if(context.isLoadedFromFile){ctx.__filename=fileName;ctx.__dirname=pathModule.dirname(ctx.__filename);//set it up so that require is relative to file
var _module=ctx.module=new Module(fileName);var _require=ctx.require=function(path){return Module._load(path,_module,true);};_module.filename=ctx.__filename;_require.paths=_module.paths=Module._nodeModulePaths(process.cwd());_require.resolve=function(request){return Module._resolveFilename(request,_module);};}else{//otherwise (e.g., loaded via http, or from document string), choose a sensible default
ctx.require=context.require||//user-specified require
require.main&&//main module's require
require.main.require&&require.main.require.bind(require.main)||require;//this module's require
}//set up default require and module.exports
return vm.runInContext(s,ctx,fileName);}},dom:{serializeToString:function serializeToString(node){throw new Error('Platform method dom.serializeToString is not supported.');//return (new xmldom.XMLSerializer()).serializeToString(node);
}},log:console.log};}).call(this,require('_process'));},{"./get":8,"./url":10,"_process":23,"fs":12,"module":12,"path":22,"vm":62}],10:[function(require,module,exports){/*
     Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
*/"use strict";var urlModule=require('url');module.exports={getPathFromUrl:function getPathFromUrl(url){var oUrl=urlModule.parse(url);return oUrl.pathname;},changeUrlPath:function changeUrlPath(url,newPath){var oUrl=urlModule.parse(url);oUrl.path=oUrl.pathname=newPath;return urlModule.format(oUrl);},resolve:function resolve(base,target){return urlModule.resolve(base,target);}};},{"url":51}],11:[function(require,module,exports){/*
  Copyright (c) jQuery Foundation, Inc. and Contributors, All Rights Reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/(function(root,factory){'use strict';// Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
// Rhino, and plain browser loading.
/* istanbul ignore next */if(typeof define==='function'&&define.amd){define(['exports'],factory);}else if(typeof exports!=='undefined'){factory(exports);}else{factory(root.esprima={});}})(this,function(exports){'use strict';var Token,TokenName,FnExprTokens,Syntax,PlaceHolders,Messages,Regex,source,strict,index,lineNumber,lineStart,hasLineTerminator,lastIndex,lastLineNumber,lastLineStart,startIndex,startLineNumber,startLineStart,scanning,length,lookahead,state,extra,isBindingElement,isAssignmentTarget,firstCoverInitializedNameError;Token={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9,Template:10};TokenName={};TokenName[Token.BooleanLiteral]='Boolean';TokenName[Token.EOF]='<end>';TokenName[Token.Identifier]='Identifier';TokenName[Token.Keyword]='Keyword';TokenName[Token.NullLiteral]='Null';TokenName[Token.NumericLiteral]='Numeric';TokenName[Token.Punctuator]='Punctuator';TokenName[Token.StringLiteral]='String';TokenName[Token.RegularExpression]='RegularExpression';TokenName[Token.Template]='Template';// A function following one of those tokens is an expression.
FnExprTokens=['(','{','[','in','typeof','instanceof','new','return','case','delete','throw','void',// assignment operators
'=','+=','-=','*=','/=','%=','<<=','>>=','>>>=','&=','|=','^=',',',// binary/unary operators
'+','-','*','/','%','++','--','<<','>>','>>>','&','|','^','!','~','&&','||','?',':','===','==','>=','<=','<','>','!=','!=='];Syntax={AssignmentExpression:'AssignmentExpression',AssignmentPattern:'AssignmentPattern',ArrayExpression:'ArrayExpression',ArrayPattern:'ArrayPattern',ArrowFunctionExpression:'ArrowFunctionExpression',BlockStatement:'BlockStatement',BinaryExpression:'BinaryExpression',BreakStatement:'BreakStatement',CallExpression:'CallExpression',CatchClause:'CatchClause',ClassBody:'ClassBody',ClassDeclaration:'ClassDeclaration',ClassExpression:'ClassExpression',ConditionalExpression:'ConditionalExpression',ContinueStatement:'ContinueStatement',DoWhileStatement:'DoWhileStatement',DebuggerStatement:'DebuggerStatement',EmptyStatement:'EmptyStatement',ExportAllDeclaration:'ExportAllDeclaration',ExportDefaultDeclaration:'ExportDefaultDeclaration',ExportNamedDeclaration:'ExportNamedDeclaration',ExportSpecifier:'ExportSpecifier',ExpressionStatement:'ExpressionStatement',ForStatement:'ForStatement',ForOfStatement:'ForOfStatement',ForInStatement:'ForInStatement',FunctionDeclaration:'FunctionDeclaration',FunctionExpression:'FunctionExpression',Identifier:'Identifier',IfStatement:'IfStatement',ImportDeclaration:'ImportDeclaration',ImportDefaultSpecifier:'ImportDefaultSpecifier',ImportNamespaceSpecifier:'ImportNamespaceSpecifier',ImportSpecifier:'ImportSpecifier',Literal:'Literal',LabeledStatement:'LabeledStatement',LogicalExpression:'LogicalExpression',MemberExpression:'MemberExpression',MetaProperty:'MetaProperty',MethodDefinition:'MethodDefinition',NewExpression:'NewExpression',ObjectExpression:'ObjectExpression',ObjectPattern:'ObjectPattern',Program:'Program',Property:'Property',RestElement:'RestElement',ReturnStatement:'ReturnStatement',SequenceExpression:'SequenceExpression',SpreadElement:'SpreadElement',Super:'Super',SwitchCase:'SwitchCase',SwitchStatement:'SwitchStatement',TaggedTemplateExpression:'TaggedTemplateExpression',TemplateElement:'TemplateElement',TemplateLiteral:'TemplateLiteral',ThisExpression:'ThisExpression',ThrowStatement:'ThrowStatement',TryStatement:'TryStatement',UnaryExpression:'UnaryExpression',UpdateExpression:'UpdateExpression',VariableDeclaration:'VariableDeclaration',VariableDeclarator:'VariableDeclarator',WhileStatement:'WhileStatement',WithStatement:'WithStatement',YieldExpression:'YieldExpression'};PlaceHolders={ArrowParameterPlaceHolder:'ArrowParameterPlaceHolder'};// Error messages should be identical to V8.
Messages={UnexpectedToken:'Unexpected token %0',UnexpectedNumber:'Unexpected number',UnexpectedString:'Unexpected string',UnexpectedIdentifier:'Unexpected identifier',UnexpectedReserved:'Unexpected reserved word',UnexpectedTemplate:'Unexpected quasi %0',UnexpectedEOS:'Unexpected end of input',NewlineAfterThrow:'Illegal newline after throw',InvalidRegExp:'Invalid regular expression',UnterminatedRegExp:'Invalid regular expression: missing /',InvalidLHSInAssignment:'Invalid left-hand side in assignment',InvalidLHSInForIn:'Invalid left-hand side in for-in',InvalidLHSInForLoop:'Invalid left-hand side in for-loop',MultipleDefaultsInSwitch:'More than one default clause in switch statement',NoCatchOrFinally:'Missing catch or finally after try',UnknownLabel:'Undefined label \'%0\'',Redeclaration:'%0 \'%1\' has already been declared',IllegalContinue:'Illegal continue statement',IllegalBreak:'Illegal break statement',IllegalReturn:'Illegal return statement',StrictModeWith:'Strict mode code may not include a with statement',StrictCatchVariable:'Catch variable may not be eval or arguments in strict mode',StrictVarName:'Variable name may not be eval or arguments in strict mode',StrictParamName:'Parameter name eval or arguments is not allowed in strict mode',StrictParamDupe:'Strict mode function may not have duplicate parameter names',StrictFunctionName:'Function name may not be eval or arguments in strict mode',StrictOctalLiteral:'Octal literals are not allowed in strict mode.',StrictDelete:'Delete of an unqualified identifier in strict mode.',StrictLHSAssignment:'Assignment to eval or arguments is not allowed in strict mode',StrictLHSPostfix:'Postfix increment/decrement may not have eval or arguments operand in strict mode',StrictLHSPrefix:'Prefix increment/decrement may not have eval or arguments operand in strict mode',StrictReservedWord:'Use of future reserved word in strict mode',TemplateOctalLiteral:'Octal literals are not allowed in template strings.',ParameterAfterRestParameter:'Rest parameter must be last formal parameter',DefaultRestParameter:'Unexpected token =',ObjectPatternAsRestParameter:'Unexpected token {',DuplicateProtoProperty:'Duplicate __proto__ fields are not allowed in object literals',ConstructorSpecialMethod:'Class constructor may not be an accessor',DuplicateConstructor:'A class may only have one constructor',StaticPrototype:'Classes may not have static property named prototype',MissingFromClause:'Unexpected token',NoAsAfterImportNamespace:'Unexpected token',InvalidModuleSpecifier:'Unexpected token',IllegalImportDeclaration:'Unexpected token',IllegalExportDeclaration:'Unexpected token',DuplicateBinding:'Duplicate binding %0'};// See also tools/generate-unicode-regex.js.
Regex={// ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,// ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
NonAsciiIdentifierPart:/[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/};// Ensure the condition is true, otherwise throw an error.
// This is only to have a better contract semantic, i.e. another safety net
// to catch a logic error. The condition shall be fulfilled in normal case.
// Do NOT use this to enforce a certain condition on any user input.
function assert(condition,message){/* istanbul ignore if */if(!condition){throw new Error('ASSERT: '+message);}}function isDecimalDigit(ch){return ch>=0x30&&ch<=0x39;// 0..9
}function isHexDigit(ch){return'0123456789abcdefABCDEF'.indexOf(ch)>=0;}function isOctalDigit(ch){return'01234567'.indexOf(ch)>=0;}function octalToDecimal(ch){// \0 is not octal escape sequence
var octal=ch!=='0',code='01234567'.indexOf(ch);if(index<length&&isOctalDigit(source[index])){octal=true;code=code*8+'01234567'.indexOf(source[index++]);// 3 digits are only allowed when string starts
// with 0, 1, 2, 3
if('0123'.indexOf(ch)>=0&&index<length&&isOctalDigit(source[index])){code=code*8+'01234567'.indexOf(source[index++]);}}return{code:code,octal:octal};}// ECMA-262 11.2 White Space
function isWhiteSpace(ch){return ch===0x20||ch===0x09||ch===0x0B||ch===0x0C||ch===0xA0||ch>=0x1680&&[0x1680,0x180E,0x2000,0x2001,0x2002,0x2003,0x2004,0x2005,0x2006,0x2007,0x2008,0x2009,0x200A,0x202F,0x205F,0x3000,0xFEFF].indexOf(ch)>=0;}// ECMA-262 11.3 Line Terminators
function isLineTerminator(ch){return ch===0x0A||ch===0x0D||ch===0x2028||ch===0x2029;}// ECMA-262 11.6 Identifier Names and Identifiers
function fromCodePoint(cp){return cp<0x10000?String.fromCharCode(cp):String.fromCharCode(0xD800+(cp-0x10000>>10))+String.fromCharCode(0xDC00+(cp-0x10000&1023));}function isIdentifierStart(ch){return ch===0x24||ch===0x5F||// $ (dollar) and _ (underscore)
ch>=0x41&&ch<=0x5A||// A..Z
ch>=0x61&&ch<=0x7A||// a..z
ch===0x5C||// \ (backslash)
ch>=0x80&&Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));}function isIdentifierPart(ch){return ch===0x24||ch===0x5F||// $ (dollar) and _ (underscore)
ch>=0x41&&ch<=0x5A||// A..Z
ch>=0x61&&ch<=0x7A||// a..z
ch>=0x30&&ch<=0x39||// 0..9
ch===0x5C||// \ (backslash)
ch>=0x80&&Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));}// ECMA-262 11.6.2.2 Future Reserved Words
function isFutureReservedWord(id){switch(id){case'enum':case'export':case'import':case'super':return true;default:return false;}}function isStrictModeReservedWord(id){switch(id){case'implements':case'interface':case'package':case'private':case'protected':case'public':case'static':case'yield':case'let':return true;default:return false;}}function isRestrictedWord(id){return id==='eval'||id==='arguments';}// ECMA-262 11.6.2.1 Keywords
function isKeyword(id){switch(id.length){case 2:return id==='if'||id==='in'||id==='do';case 3:return id==='var'||id==='for'||id==='new'||id==='try'||id==='let';case 4:return id==='this'||id==='else'||id==='case'||id==='void'||id==='with'||id==='enum';case 5:return id==='while'||id==='break'||id==='catch'||id==='throw'||id==='const'||id==='yield'||id==='class'||id==='super';case 6:return id==='return'||id==='typeof'||id==='delete'||id==='switch'||id==='export'||id==='import';case 7:return id==='default'||id==='finally'||id==='extends';case 8:return id==='function'||id==='continue'||id==='debugger';case 10:return id==='instanceof';default:return false;}}// ECMA-262 11.4 Comments
function addComment(type,value,start,end,loc){var comment;assert(typeof start==='number','Comment must have valid position');state.lastCommentStart=start;comment={type:type,value:value};if(extra.range){comment.range=[start,end];}if(extra.loc){comment.loc=loc;}extra.comments.push(comment);if(extra.attachComment){extra.leadingComments.push(comment);extra.trailingComments.push(comment);}if(extra.tokenize){comment.type=comment.type+'Comment';if(extra.delegate){comment=extra.delegate(comment);}extra.tokens.push(comment);}}function skipSingleLineComment(offset){var start,loc,ch,comment;start=index-offset;loc={start:{line:lineNumber,column:index-lineStart-offset}};while(index<length){ch=source.charCodeAt(index);++index;if(isLineTerminator(ch)){hasLineTerminator=true;if(extra.comments){comment=source.slice(start+offset,index-1);loc.end={line:lineNumber,column:index-lineStart-1};addComment('Line',comment,start,index-1,loc);}if(ch===13&&source.charCodeAt(index)===10){++index;}++lineNumber;lineStart=index;return;}}if(extra.comments){comment=source.slice(start+offset,index);loc.end={line:lineNumber,column:index-lineStart};addComment('Line',comment,start,index,loc);}}function skipMultiLineComment(){var start,loc,ch,comment;if(extra.comments){start=index-2;loc={start:{line:lineNumber,column:index-lineStart-2}};}while(index<length){ch=source.charCodeAt(index);if(isLineTerminator(ch)){if(ch===0x0D&&source.charCodeAt(index+1)===0x0A){++index;}hasLineTerminator=true;++lineNumber;++index;lineStart=index;}else if(ch===0x2A){// Block comment ends with '*/'.
if(source.charCodeAt(index+1)===0x2F){++index;++index;if(extra.comments){comment=source.slice(start+2,index-2);loc.end={line:lineNumber,column:index-lineStart};addComment('Block',comment,start,index,loc);}return;}++index;}else{++index;}}// Ran off the end of the file - the whole thing is a comment
if(extra.comments){loc.end={line:lineNumber,column:index-lineStart};comment=source.slice(start+2,index);addComment('Block',comment,start,index,loc);}tolerateUnexpectedToken();}function skipComment(){var ch,start;hasLineTerminator=false;start=index===0;while(index<length){ch=source.charCodeAt(index);if(isWhiteSpace(ch)){++index;}else if(isLineTerminator(ch)){hasLineTerminator=true;++index;if(ch===0x0D&&source.charCodeAt(index)===0x0A){++index;}++lineNumber;lineStart=index;start=true;}else if(ch===0x2F){// U+002F is '/'
ch=source.charCodeAt(index+1);if(ch===0x2F){++index;++index;skipSingleLineComment(2);start=true;}else if(ch===0x2A){// U+002A is '*'
++index;++index;skipMultiLineComment();}else{break;}}else if(start&&ch===0x2D){// U+002D is '-'
// U+003E is '>'
if(source.charCodeAt(index+1)===0x2D&&source.charCodeAt(index+2)===0x3E){// '-->' is a single-line comment
index+=3;skipSingleLineComment(3);}else{break;}}else if(ch===0x3C){// U+003C is '<'
if(source.slice(index+1,index+4)==='!--'){++index;// `<`
++index;// `!`
++index;// `-`
++index;// `-`
skipSingleLineComment(4);}else{break;}}else{break;}}}function scanHexEscape(prefix){var i,len,ch,code=0;len=prefix==='u'?4:2;for(i=0;i<len;++i){if(index<length&&isHexDigit(source[index])){ch=source[index++];code=code*16+'0123456789abcdef'.indexOf(ch.toLowerCase());}else{return'';}}return String.fromCharCode(code);}function scanUnicodeCodePointEscape(){var ch,code;ch=source[index];code=0;// At least, one hex digit is required.
if(ch==='}'){throwUnexpectedToken();}while(index<length){ch=source[index++];if(!isHexDigit(ch)){break;}code=code*16+'0123456789abcdef'.indexOf(ch.toLowerCase());}if(code>0x10FFFF||ch!=='}'){throwUnexpectedToken();}return fromCodePoint(code);}function codePointAt(i){var cp,first,second;cp=source.charCodeAt(i);if(cp>=0xD800&&cp<=0xDBFF){second=source.charCodeAt(i+1);if(second>=0xDC00&&second<=0xDFFF){first=cp;cp=(first-0xD800)*0x400+second-0xDC00+0x10000;}}return cp;}function getComplexIdentifier(){var cp,ch,id;cp=codePointAt(index);id=fromCodePoint(cp);index+=id.length;// '\u' (U+005C, U+0075) denotes an escaped character.
if(cp===0x5C){if(source.charCodeAt(index)!==0x75){throwUnexpectedToken();}++index;if(source[index]==='{'){++index;ch=scanUnicodeCodePointEscape();}else{ch=scanHexEscape('u');cp=ch.charCodeAt(0);if(!ch||ch==='\\'||!isIdentifierStart(cp)){throwUnexpectedToken();}}id=ch;}while(index<length){cp=codePointAt(index);if(!isIdentifierPart(cp)){break;}ch=fromCodePoint(cp);id+=ch;index+=ch.length;// '\u' (U+005C, U+0075) denotes an escaped character.
if(cp===0x5C){id=id.substr(0,id.length-1);if(source.charCodeAt(index)!==0x75){throwUnexpectedToken();}++index;if(source[index]==='{'){++index;ch=scanUnicodeCodePointEscape();}else{ch=scanHexEscape('u');cp=ch.charCodeAt(0);if(!ch||ch==='\\'||!isIdentifierPart(cp)){throwUnexpectedToken();}}id+=ch;}}return id;}function getIdentifier(){var start,ch;start=index++;while(index<length){ch=source.charCodeAt(index);if(ch===0x5C){// Blackslash (U+005C) marks Unicode escape sequence.
index=start;return getComplexIdentifier();}else if(ch>=0xD800&&ch<0xDFFF){// Need to handle surrogate pairs.
index=start;return getComplexIdentifier();}if(isIdentifierPart(ch)){++index;}else{break;}}return source.slice(start,index);}function scanIdentifier(){var start,id,type;start=index;// Backslash (U+005C) starts an escaped character.
id=source.charCodeAt(index)===0x5C?getComplexIdentifier():getIdentifier();// There is no keyword or literal with only one character.
// Thus, it must be an identifier.
if(id.length===1){type=Token.Identifier;}else if(isKeyword(id)){type=Token.Keyword;}else if(id==='null'){type=Token.NullLiteral;}else if(id==='true'||id==='false'){type=Token.BooleanLiteral;}else{type=Token.Identifier;}return{type:type,value:id,lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}// ECMA-262 11.7 Punctuators
function scanPunctuator(){var token,str;token={type:Token.Punctuator,value:'',lineNumber:lineNumber,lineStart:lineStart,start:index,end:index};// Check for most common single-character punctuators.
str=source[index];switch(str){case'(':if(extra.tokenize){extra.openParenToken=extra.tokenValues.length;}++index;break;case'{':if(extra.tokenize){extra.openCurlyToken=extra.tokenValues.length;}state.curlyStack.push('{');++index;break;case'.':++index;if(source[index]==='.'&&source[index+1]==='.'){// Spread operator: ...
index+=2;str='...';}break;case'}':++index;state.curlyStack.pop();break;case')':case';':case',':case'[':case']':case':':case'?':case'~':++index;break;default:// 4-character punctuator.
str=source.substr(index,4);if(str==='>>>='){index+=4;}else{// 3-character punctuators.
str=str.substr(0,3);if(str==='==='||str==='!=='||str==='>>>'||str==='<<='||str==='>>='){index+=3;}else{// 2-character punctuators.
str=str.substr(0,2);if(str==='&&'||str==='||'||str==='=='||str==='!='||str==='+='||str==='-='||str==='*='||str==='/='||str==='++'||str==='--'||str==='<<'||str==='>>'||str==='&='||str==='|='||str==='^='||str==='%='||str==='<='||str==='>='||str==='=>'){index+=2;}else{// 1-character punctuators.
str=source[index];if('<>=!+-*%&|^/'.indexOf(str)>=0){++index;}}}}}if(index===token.start){throwUnexpectedToken();}token.end=index;token.value=str;return token;}// ECMA-262 11.8.3 Numeric Literals
function scanHexLiteral(start){var number='';while(index<length){if(!isHexDigit(source[index])){break;}number+=source[index++];}if(number.length===0){throwUnexpectedToken();}if(isIdentifierStart(source.charCodeAt(index))){throwUnexpectedToken();}return{type:Token.NumericLiteral,value:parseInt('0x'+number,16),lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}function scanBinaryLiteral(start){var ch,number;number='';while(index<length){ch=source[index];if(ch!=='0'&&ch!=='1'){break;}number+=source[index++];}if(number.length===0){// only 0b or 0B
throwUnexpectedToken();}if(index<length){ch=source.charCodeAt(index);/* istanbul ignore else */if(isIdentifierStart(ch)||isDecimalDigit(ch)){throwUnexpectedToken();}}return{type:Token.NumericLiteral,value:parseInt(number,2),lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}function scanOctalLiteral(prefix,start){var number,octal;if(isOctalDigit(prefix)){octal=true;number='0'+source[index++];}else{octal=false;++index;number='';}while(index<length){if(!isOctalDigit(source[index])){break;}number+=source[index++];}if(!octal&&number.length===0){// only 0o or 0O
throwUnexpectedToken();}if(isIdentifierStart(source.charCodeAt(index))||isDecimalDigit(source.charCodeAt(index))){throwUnexpectedToken();}return{type:Token.NumericLiteral,value:parseInt(number,8),octal:octal,lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}function isImplicitOctalLiteral(){var i,ch;// Implicit octal, unless there is a non-octal digit.
// (Annex B.1.1 on Numeric Literals)
for(i=index+1;i<length;++i){ch=source[i];if(ch==='8'||ch==='9'){return false;}if(!isOctalDigit(ch)){return true;}}return true;}function scanNumericLiteral(){var number,start,ch;ch=source[index];assert(isDecimalDigit(ch.charCodeAt(0))||ch==='.','Numeric literal must start with a decimal digit or a decimal point');start=index;number='';if(ch!=='.'){number=source[index++];ch=source[index];// Hex number starts with '0x'.
// Octal number starts with '0'.
// Octal number in ES6 starts with '0o'.
// Binary number in ES6 starts with '0b'.
if(number==='0'){if(ch==='x'||ch==='X'){++index;return scanHexLiteral(start);}if(ch==='b'||ch==='B'){++index;return scanBinaryLiteral(start);}if(ch==='o'||ch==='O'){return scanOctalLiteral(ch,start);}if(isOctalDigit(ch)){if(isImplicitOctalLiteral()){return scanOctalLiteral(ch,start);}}}while(isDecimalDigit(source.charCodeAt(index))){number+=source[index++];}ch=source[index];}if(ch==='.'){number+=source[index++];while(isDecimalDigit(source.charCodeAt(index))){number+=source[index++];}ch=source[index];}if(ch==='e'||ch==='E'){number+=source[index++];ch=source[index];if(ch==='+'||ch==='-'){number+=source[index++];}if(isDecimalDigit(source.charCodeAt(index))){while(isDecimalDigit(source.charCodeAt(index))){number+=source[index++];}}else{throwUnexpectedToken();}}if(isIdentifierStart(source.charCodeAt(index))){throwUnexpectedToken();}return{type:Token.NumericLiteral,value:parseFloat(number),lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}// ECMA-262 11.8.4 String Literals
function scanStringLiteral(){var str='',quote,start,ch,unescaped,octToDec,octal=false;quote=source[index];assert(quote==='\''||quote==='"','String literal must starts with a quote');start=index;++index;while(index<length){ch=source[index++];if(ch===quote){quote='';break;}else if(ch==='\\'){ch=source[index++];if(!ch||!isLineTerminator(ch.charCodeAt(0))){switch(ch){case'u':case'x':if(source[index]==='{'){++index;str+=scanUnicodeCodePointEscape();}else{unescaped=scanHexEscape(ch);if(!unescaped){throw throwUnexpectedToken();}str+=unescaped;}break;case'n':str+='\n';break;case'r':str+='\r';break;case't':str+='\t';break;case'b':str+='\b';break;case'f':str+='\f';break;case'v':str+='\x0B';break;case'8':case'9':str+=ch;tolerateUnexpectedToken();break;default:if(isOctalDigit(ch)){octToDec=octalToDecimal(ch);octal=octToDec.octal||octal;str+=String.fromCharCode(octToDec.code);}else{str+=ch;}break;}}else{++lineNumber;if(ch==='\r'&&source[index]==='\n'){++index;}lineStart=index;}}else if(isLineTerminator(ch.charCodeAt(0))){break;}else{str+=ch;}}if(quote!==''){index=start;throwUnexpectedToken();}return{type:Token.StringLiteral,value:str,octal:octal,lineNumber:startLineNumber,lineStart:startLineStart,start:start,end:index};}// ECMA-262 11.8.6 Template Literal Lexical Components
function scanTemplate(){var cooked='',ch,start,rawOffset,terminated,head,tail,restore,unescaped;terminated=false;tail=false;start=index;head=source[index]==='`';rawOffset=2;++index;while(index<length){ch=source[index++];if(ch==='`'){rawOffset=1;tail=true;terminated=true;break;}else if(ch==='$'){if(source[index]==='{'){state.curlyStack.push('${');++index;terminated=true;break;}cooked+=ch;}else if(ch==='\\'){ch=source[index++];if(!isLineTerminator(ch.charCodeAt(0))){switch(ch){case'n':cooked+='\n';break;case'r':cooked+='\r';break;case't':cooked+='\t';break;case'u':case'x':if(source[index]==='{'){++index;cooked+=scanUnicodeCodePointEscape();}else{restore=index;unescaped=scanHexEscape(ch);if(unescaped){cooked+=unescaped;}else{index=restore;cooked+=ch;}}break;case'b':cooked+='\b';break;case'f':cooked+='\f';break;case'v':cooked+='\v';break;default:if(ch==='0'){if(isDecimalDigit(source.charCodeAt(index))){// Illegal: \01 \02 and so on
throwError(Messages.TemplateOctalLiteral);}cooked+='\0';}else if(isOctalDigit(ch)){// Illegal: \1 \2
throwError(Messages.TemplateOctalLiteral);}else{cooked+=ch;}break;}}else{++lineNumber;if(ch==='\r'&&source[index]==='\n'){++index;}lineStart=index;}}else if(isLineTerminator(ch.charCodeAt(0))){++lineNumber;if(ch==='\r'&&source[index]==='\n'){++index;}lineStart=index;cooked+='\n';}else{cooked+=ch;}}if(!terminated){throwUnexpectedToken();}if(!head){state.curlyStack.pop();}return{type:Token.Template,value:{cooked:cooked,raw:source.slice(start+1,index-rawOffset)},head:head,tail:tail,lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}// ECMA-262 11.8.5 Regular Expression Literals
function testRegExp(pattern,flags){// The BMP character to use as a replacement for astral symbols when
// translating an ES6 "u"-flagged pattern to an ES5-compatible
// approximation.
// Note: replacing with '\uFFFF' enables false positives in unlikely
// scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
// pattern that would not be detected by this substitution.
var astralSubstitute="￿",tmp=pattern;if(flags.indexOf('u')>=0){tmp=tmp// Replace every Unicode escape sequence with the equivalent
// BMP character or a constant ASCII code point in the case of
// astral symbols. (See the above note on `astralSubstitute`
// for more information.)
.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g,function($0,$1,$2){var codePoint=parseInt($1||$2,16);if(codePoint>0x10FFFF){throwUnexpectedToken(null,Messages.InvalidRegExp);}if(codePoint<=0xFFFF){return String.fromCharCode(codePoint);}return astralSubstitute;})// Replace each paired surrogate with a single ASCII symbol to
// avoid throwing on regular expressions that are only valid in
// combination with the "u" flag.
.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,astralSubstitute);}// First, detect invalid regular expressions.
try{RegExp(tmp);}catch(e){throwUnexpectedToken(null,Messages.InvalidRegExp);}// Return a regular expression object for this pattern-flag pair, or
// `null` in case the current environment doesn't support the flags it
// uses.
try{return new RegExp(pattern,flags);}catch(exception){return null;}}function scanRegExpBody(){var ch,str,classMarker,terminated,body;ch=source[index];assert(ch==='/','Regular expression literal must start with a slash');str=source[index++];classMarker=false;terminated=false;while(index<length){ch=source[index++];str+=ch;if(ch==='\\'){ch=source[index++];// ECMA-262 7.8.5
if(isLineTerminator(ch.charCodeAt(0))){throwUnexpectedToken(null,Messages.UnterminatedRegExp);}str+=ch;}else if(isLineTerminator(ch.charCodeAt(0))){throwUnexpectedToken(null,Messages.UnterminatedRegExp);}else if(classMarker){if(ch===']'){classMarker=false;}}else{if(ch==='/'){terminated=true;break;}else if(ch==='['){classMarker=true;}}}if(!terminated){throwUnexpectedToken(null,Messages.UnterminatedRegExp);}// Exclude leading and trailing slash.
body=str.substr(1,str.length-2);return{value:body,literal:str};}function scanRegExpFlags(){var ch,str,flags,restore;str='';flags='';while(index<length){ch=source[index];if(!isIdentifierPart(ch.charCodeAt(0))){break;}++index;if(ch==='\\'&&index<length){ch=source[index];if(ch==='u'){++index;restore=index;ch=scanHexEscape('u');if(ch){flags+=ch;for(str+="\\u";restore<index;++restore){str+=source[restore];}}else{index=restore;flags+='u';str+="\\u";}tolerateUnexpectedToken();}else{str+='\\';tolerateUnexpectedToken();}}else{flags+=ch;str+=ch;}}return{value:flags,literal:str};}function scanRegExp(){var start,body,flags,value;scanning=true;lookahead=null;skipComment();start=index;body=scanRegExpBody();flags=scanRegExpFlags();value=testRegExp(body.value,flags.value);scanning=false;if(extra.tokenize){return{type:Token.RegularExpression,value:value,regex:{pattern:body.value,flags:flags.value},lineNumber:lineNumber,lineStart:lineStart,start:start,end:index};}return{literal:body.literal+flags.literal,value:value,regex:{pattern:body.value,flags:flags.value},start:start,end:index};}function collectRegex(){var pos,loc,regex,token;skipComment();pos=index;loc={start:{line:lineNumber,column:index-lineStart}};regex=scanRegExp();loc.end={line:lineNumber,column:index-lineStart};/* istanbul ignore next */if(!extra.tokenize){// Pop the previous token, which is likely '/' or '/='
if(extra.tokens.length>0){token=extra.tokens[extra.tokens.length-1];if(token.range[0]===pos&&token.type==='Punctuator'){if(token.value==='/'||token.value==='/='){extra.tokens.pop();}}}extra.tokens.push({type:'RegularExpression',value:regex.literal,regex:regex.regex,range:[pos,index],loc:loc});}return regex;}function isIdentifierName(token){return token.type===Token.Identifier||token.type===Token.Keyword||token.type===Token.BooleanLiteral||token.type===Token.NullLiteral;}// Using the following algorithm:
// https://github.com/mozilla/sweet.js/wiki/design
function advanceSlash(){var regex,previous,check;function testKeyword(value){return value&&value.length>1&&value[0]>='a'&&value[0]<='z';}previous=extra.tokenValues[extra.tokens.length-1];regex=previous!==null;switch(previous){case'this':case']':regex=false;break;case')':check=extra.tokenValues[extra.openParenToken-1];regex=check==='if'||check==='while'||check==='for'||check==='with';break;case'}':// Dividing a function by anything makes little sense,
// but we have to check for that.
regex=false;if(testKeyword(extra.tokenValues[extra.openCurlyToken-3])){// Anonymous function, e.g. function(){} /42
check=extra.tokenValues[extra.openCurlyToken-4];regex=check?FnExprTokens.indexOf(check)<0:false;}else if(testKeyword(extra.tokenValues[extra.openCurlyToken-4])){// Named function, e.g. function f(){} /42/
check=extra.tokenValues[extra.openCurlyToken-5];regex=check?FnExprTokens.indexOf(check)<0:true;}}return regex?collectRegex():scanPunctuator();}function advance(){var cp,token;if(index>=length){return{type:Token.EOF,lineNumber:lineNumber,lineStart:lineStart,start:index,end:index};}cp=source.charCodeAt(index);if(isIdentifierStart(cp)){token=scanIdentifier();if(strict&&isStrictModeReservedWord(token.value)){token.type=Token.Keyword;}return token;}// Very common: ( and ) and ;
if(cp===0x28||cp===0x29||cp===0x3B){return scanPunctuator();}// String literal starts with single quote (U+0027) or double quote (U+0022).
if(cp===0x27||cp===0x22){return scanStringLiteral();}// Dot (.) U+002E can also start a floating-point number, hence the need
// to check the next character.
if(cp===0x2E){if(isDecimalDigit(source.charCodeAt(index+1))){return scanNumericLiteral();}return scanPunctuator();}if(isDecimalDigit(cp)){return scanNumericLiteral();}// Slash (/) U+002F can also start a regex.
if(extra.tokenize&&cp===0x2F){return advanceSlash();}// Template literals start with ` (U+0060) for template head
// or } (U+007D) for template middle or template tail.
if(cp===0x60||cp===0x7D&&state.curlyStack[state.curlyStack.length-1]==='${'){return scanTemplate();}// Possible identifier start in a surrogate pair.
if(cp>=0xD800&&cp<0xDFFF){cp=codePointAt(index);if(isIdentifierStart(cp)){return scanIdentifier();}}return scanPunctuator();}function collectToken(){var loc,token,value,entry;loc={start:{line:lineNumber,column:index-lineStart}};token=advance();loc.end={line:lineNumber,column:index-lineStart};if(token.type!==Token.EOF){value=source.slice(token.start,token.end);entry={type:TokenName[token.type],value:value,range:[token.start,token.end],loc:loc};if(token.regex){entry.regex={pattern:token.regex.pattern,flags:token.regex.flags};}if(extra.tokenValues){extra.tokenValues.push(entry.type==='Punctuator'||entry.type==='Keyword'?entry.value:null);}if(extra.tokenize){if(!extra.range){delete entry.range;}if(!extra.loc){delete entry.loc;}if(extra.delegate){entry=extra.delegate(entry);}}extra.tokens.push(entry);}return token;}function lex(){var token;scanning=true;lastIndex=index;lastLineNumber=lineNumber;lastLineStart=lineStart;skipComment();token=lookahead;startIndex=index;startLineNumber=lineNumber;startLineStart=lineStart;lookahead=typeof extra.tokens!=='undefined'?collectToken():advance();scanning=false;return token;}function peek(){scanning=true;skipComment();lastIndex=index;lastLineNumber=lineNumber;lastLineStart=lineStart;startIndex=index;startLineNumber=lineNumber;startLineStart=lineStart;lookahead=typeof extra.tokens!=='undefined'?collectToken():advance();scanning=false;}function Position(){this.line=startLineNumber;this.column=startIndex-startLineStart;}function SourceLocation(){this.start=new Position();this.end=null;}function WrappingSourceLocation(startToken){this.start={line:startToken.lineNumber,column:startToken.start-startToken.lineStart};this.end=null;}function Node(){if(extra.range){this.range=[startIndex,0];}if(extra.loc){this.loc=new SourceLocation();}}function WrappingNode(startToken){if(extra.range){this.range=[startToken.start,0];}if(extra.loc){this.loc=new WrappingSourceLocation(startToken);}}WrappingNode.prototype=Node.prototype={processComment:function processComment(){var lastChild,innerComments,leadingComments,trailingComments,bottomRight=extra.bottomRightStack,i,comment,last=bottomRight[bottomRight.length-1];if(this.type===Syntax.Program){if(this.body.length>0){return;}}/**
             * patch innnerComments for properties empty block
             * `function a() {/** comments **\/}`
             */if(this.type===Syntax.BlockStatement&&this.body.length===0){innerComments=[];for(i=extra.leadingComments.length-1;i>=0;--i){comment=extra.leadingComments[i];if(this.range[1]>=comment.range[1]){innerComments.unshift(comment);extra.leadingComments.splice(i,1);extra.trailingComments.splice(i,1);}}if(innerComments.length){this.innerComments=innerComments;//bottomRight.push(this);
return;}}if(extra.trailingComments.length>0){trailingComments=[];for(i=extra.trailingComments.length-1;i>=0;--i){comment=extra.trailingComments[i];if(comment.range[0]>=this.range[1]){trailingComments.unshift(comment);extra.trailingComments.splice(i,1);}}extra.trailingComments=[];}else{if(last&&last.trailingComments&&last.trailingComments[0].range[0]>=this.range[1]){trailingComments=last.trailingComments;delete last.trailingComments;}}// Eating the stack.
while(last&&last.range[0]>=this.range[0]){lastChild=bottomRight.pop();last=bottomRight[bottomRight.length-1];}if(lastChild){if(lastChild.leadingComments){leadingComments=[];for(i=lastChild.leadingComments.length-1;i>=0;--i){comment=lastChild.leadingComments[i];if(comment.range[1]<=this.range[0]){leadingComments.unshift(comment);lastChild.leadingComments.splice(i,1);}}if(!lastChild.leadingComments.length){lastChild.leadingComments=undefined;}}}else if(extra.leadingComments.length>0){leadingComments=[];for(i=extra.leadingComments.length-1;i>=0;--i){comment=extra.leadingComments[i];if(comment.range[1]<=this.range[0]){leadingComments.unshift(comment);extra.leadingComments.splice(i,1);}}}if(leadingComments&&leadingComments.length>0){this.leadingComments=leadingComments;}if(trailingComments&&trailingComments.length>0){this.trailingComments=trailingComments;}bottomRight.push(this);},finish:function finish(){if(extra.range){this.range[1]=lastIndex;}if(extra.loc){this.loc.end={line:lastLineNumber,column:lastIndex-lastLineStart};if(extra.source){this.loc.source=extra.source;}}if(extra.attachComment){this.processComment();}},finishArrayExpression:function finishArrayExpression(elements){this.type=Syntax.ArrayExpression;this.elements=elements;this.finish();return this;},finishArrayPattern:function finishArrayPattern(elements){this.type=Syntax.ArrayPattern;this.elements=elements;this.finish();return this;},finishArrowFunctionExpression:function finishArrowFunctionExpression(params,defaults,body,expression){this.type=Syntax.ArrowFunctionExpression;this.id=null;this.params=params;this.defaults=defaults;this.body=body;this.generator=false;this.expression=expression;this.finish();return this;},finishAssignmentExpression:function finishAssignmentExpression(operator,left,right){this.type=Syntax.AssignmentExpression;this.operator=operator;this.left=left;this.right=right;this.finish();return this;},finishAssignmentPattern:function finishAssignmentPattern(left,right){this.type=Syntax.AssignmentPattern;this.left=left;this.right=right;this.finish();return this;},finishBinaryExpression:function finishBinaryExpression(operator,left,right){this.type=operator==='||'||operator==='&&'?Syntax.LogicalExpression:Syntax.BinaryExpression;this.operator=operator;this.left=left;this.right=right;this.finish();return this;},finishBlockStatement:function finishBlockStatement(body){this.type=Syntax.BlockStatement;this.body=body;this.finish();return this;},finishBreakStatement:function finishBreakStatement(label){this.type=Syntax.BreakStatement;this.label=label;this.finish();return this;},finishCallExpression:function finishCallExpression(callee,args){this.type=Syntax.CallExpression;this.callee=callee;this.arguments=args;this.finish();return this;},finishCatchClause:function finishCatchClause(param,body){this.type=Syntax.CatchClause;this.param=param;this.body=body;this.finish();return this;},finishClassBody:function finishClassBody(body){this.type=Syntax.ClassBody;this.body=body;this.finish();return this;},finishClassDeclaration:function finishClassDeclaration(id,superClass,body){this.type=Syntax.ClassDeclaration;this.id=id;this.superClass=superClass;this.body=body;this.finish();return this;},finishClassExpression:function finishClassExpression(id,superClass,body){this.type=Syntax.ClassExpression;this.id=id;this.superClass=superClass;this.body=body;this.finish();return this;},finishConditionalExpression:function finishConditionalExpression(test,consequent,alternate){this.type=Syntax.ConditionalExpression;this.test=test;this.consequent=consequent;this.alternate=alternate;this.finish();return this;},finishContinueStatement:function finishContinueStatement(label){this.type=Syntax.ContinueStatement;this.label=label;this.finish();return this;},finishDebuggerStatement:function finishDebuggerStatement(){this.type=Syntax.DebuggerStatement;this.finish();return this;},finishDoWhileStatement:function finishDoWhileStatement(body,test){this.type=Syntax.DoWhileStatement;this.body=body;this.test=test;this.finish();return this;},finishEmptyStatement:function finishEmptyStatement(){this.type=Syntax.EmptyStatement;this.finish();return this;},finishExpressionStatement:function finishExpressionStatement(expression){this.type=Syntax.ExpressionStatement;this.expression=expression;this.finish();return this;},finishForStatement:function finishForStatement(init,test,update,body){this.type=Syntax.ForStatement;this.init=init;this.test=test;this.update=update;this.body=body;this.finish();return this;},finishForOfStatement:function finishForOfStatement(left,right,body){this.type=Syntax.ForOfStatement;this.left=left;this.right=right;this.body=body;this.finish();return this;},finishForInStatement:function finishForInStatement(left,right,body){this.type=Syntax.ForInStatement;this.left=left;this.right=right;this.body=body;this.each=false;this.finish();return this;},finishFunctionDeclaration:function finishFunctionDeclaration(id,params,defaults,body,generator){this.type=Syntax.FunctionDeclaration;this.id=id;this.params=params;this.defaults=defaults;this.body=body;this.generator=generator;this.expression=false;this.finish();return this;},finishFunctionExpression:function finishFunctionExpression(id,params,defaults,body,generator){this.type=Syntax.FunctionExpression;this.id=id;this.params=params;this.defaults=defaults;this.body=body;this.generator=generator;this.expression=false;this.finish();return this;},finishIdentifier:function finishIdentifier(name){this.type=Syntax.Identifier;this.name=name;this.finish();return this;},finishIfStatement:function finishIfStatement(test,consequent,alternate){this.type=Syntax.IfStatement;this.test=test;this.consequent=consequent;this.alternate=alternate;this.finish();return this;},finishLabeledStatement:function finishLabeledStatement(label,body){this.type=Syntax.LabeledStatement;this.label=label;this.body=body;this.finish();return this;},finishLiteral:function finishLiteral(token){this.type=Syntax.Literal;this.value=token.value;this.raw=source.slice(token.start,token.end);if(token.regex){this.regex=token.regex;}this.finish();return this;},finishMemberExpression:function finishMemberExpression(accessor,object,property){this.type=Syntax.MemberExpression;this.computed=accessor==='[';this.object=object;this.property=property;this.finish();return this;},finishMetaProperty:function finishMetaProperty(meta,property){this.type=Syntax.MetaProperty;this.meta=meta;this.property=property;this.finish();return this;},finishNewExpression:function finishNewExpression(callee,args){this.type=Syntax.NewExpression;this.callee=callee;this.arguments=args;this.finish();return this;},finishObjectExpression:function finishObjectExpression(properties){this.type=Syntax.ObjectExpression;this.properties=properties;this.finish();return this;},finishObjectPattern:function finishObjectPattern(properties){this.type=Syntax.ObjectPattern;this.properties=properties;this.finish();return this;},finishPostfixExpression:function finishPostfixExpression(operator,argument){this.type=Syntax.UpdateExpression;this.operator=operator;this.argument=argument;this.prefix=false;this.finish();return this;},finishProgram:function finishProgram(body,sourceType){this.type=Syntax.Program;this.body=body;this.sourceType=sourceType;this.finish();return this;},finishProperty:function finishProperty(kind,key,computed,value,method,shorthand){this.type=Syntax.Property;this.key=key;this.computed=computed;this.value=value;this.kind=kind;this.method=method;this.shorthand=shorthand;this.finish();return this;},finishRestElement:function finishRestElement(argument){this.type=Syntax.RestElement;this.argument=argument;this.finish();return this;},finishReturnStatement:function finishReturnStatement(argument){this.type=Syntax.ReturnStatement;this.argument=argument;this.finish();return this;},finishSequenceExpression:function finishSequenceExpression(expressions){this.type=Syntax.SequenceExpression;this.expressions=expressions;this.finish();return this;},finishSpreadElement:function finishSpreadElement(argument){this.type=Syntax.SpreadElement;this.argument=argument;this.finish();return this;},finishSwitchCase:function finishSwitchCase(test,consequent){this.type=Syntax.SwitchCase;this.test=test;this.consequent=consequent;this.finish();return this;},finishSuper:function finishSuper(){this.type=Syntax.Super;this.finish();return this;},finishSwitchStatement:function finishSwitchStatement(discriminant,cases){this.type=Syntax.SwitchStatement;this.discriminant=discriminant;this.cases=cases;this.finish();return this;},finishTaggedTemplateExpression:function finishTaggedTemplateExpression(tag,quasi){this.type=Syntax.TaggedTemplateExpression;this.tag=tag;this.quasi=quasi;this.finish();return this;},finishTemplateElement:function finishTemplateElement(value,tail){this.type=Syntax.TemplateElement;this.value=value;this.tail=tail;this.finish();return this;},finishTemplateLiteral:function finishTemplateLiteral(quasis,expressions){this.type=Syntax.TemplateLiteral;this.quasis=quasis;this.expressions=expressions;this.finish();return this;},finishThisExpression:function finishThisExpression(){this.type=Syntax.ThisExpression;this.finish();return this;},finishThrowStatement:function finishThrowStatement(argument){this.type=Syntax.ThrowStatement;this.argument=argument;this.finish();return this;},finishTryStatement:function finishTryStatement(block,handler,finalizer){this.type=Syntax.TryStatement;this.block=block;this.guardedHandlers=[];this.handlers=handler?[handler]:[];this.handler=handler;this.finalizer=finalizer;this.finish();return this;},finishUnaryExpression:function finishUnaryExpression(operator,argument){this.type=operator==='++'||operator==='--'?Syntax.UpdateExpression:Syntax.UnaryExpression;this.operator=operator;this.argument=argument;this.prefix=true;this.finish();return this;},finishVariableDeclaration:function finishVariableDeclaration(declarations){this.type=Syntax.VariableDeclaration;this.declarations=declarations;this.kind='var';this.finish();return this;},finishLexicalDeclaration:function finishLexicalDeclaration(declarations,kind){this.type=Syntax.VariableDeclaration;this.declarations=declarations;this.kind=kind;this.finish();return this;},finishVariableDeclarator:function finishVariableDeclarator(id,init){this.type=Syntax.VariableDeclarator;this.id=id;this.init=init;this.finish();return this;},finishWhileStatement:function finishWhileStatement(test,body){this.type=Syntax.WhileStatement;this.test=test;this.body=body;this.finish();return this;},finishWithStatement:function finishWithStatement(object,body){this.type=Syntax.WithStatement;this.object=object;this.body=body;this.finish();return this;},finishExportSpecifier:function finishExportSpecifier(local,exported){this.type=Syntax.ExportSpecifier;this.exported=exported||local;this.local=local;this.finish();return this;},finishImportDefaultSpecifier:function finishImportDefaultSpecifier(local){this.type=Syntax.ImportDefaultSpecifier;this.local=local;this.finish();return this;},finishImportNamespaceSpecifier:function finishImportNamespaceSpecifier(local){this.type=Syntax.ImportNamespaceSpecifier;this.local=local;this.finish();return this;},finishExportNamedDeclaration:function finishExportNamedDeclaration(declaration,specifiers,src){this.type=Syntax.ExportNamedDeclaration;this.declaration=declaration;this.specifiers=specifiers;this.source=src;this.finish();return this;},finishExportDefaultDeclaration:function finishExportDefaultDeclaration(declaration){this.type=Syntax.ExportDefaultDeclaration;this.declaration=declaration;this.finish();return this;},finishExportAllDeclaration:function finishExportAllDeclaration(src){this.type=Syntax.ExportAllDeclaration;this.source=src;this.finish();return this;},finishImportSpecifier:function finishImportSpecifier(local,imported){this.type=Syntax.ImportSpecifier;this.local=local||imported;this.imported=imported;this.finish();return this;},finishImportDeclaration:function finishImportDeclaration(specifiers,src){this.type=Syntax.ImportDeclaration;this.specifiers=specifiers;this.source=src;this.finish();return this;},finishYieldExpression:function finishYieldExpression(argument,delegate){this.type=Syntax.YieldExpression;this.argument=argument;this.delegate=delegate;this.finish();return this;}};function recordError(error){var e,existing;for(e=0;e<extra.errors.length;e++){existing=extra.errors[e];// Prevent duplicated error.
/* istanbul ignore next */if(existing.index===error.index&&existing.message===error.message){return;}}extra.errors.push(error);}function constructError(msg,column){var error=new Error(msg);try{throw error;}catch(base){/* istanbul ignore else */if(Object.create&&Object.defineProperty){error=Object.create(base);Object.defineProperty(error,'column',{value:column});}}finally{return error;}}function createError(line,pos,description){var msg,column,error;msg='Line '+line+': '+description;column=pos-(scanning?lineStart:lastLineStart)+1;error=constructError(msg,column);error.lineNumber=line;error.description=description;error.index=pos;return error;}// Throw an exception
function throwError(messageFormat){var args,msg;args=Array.prototype.slice.call(arguments,1);msg=messageFormat.replace(/%(\d)/g,function(whole,idx){assert(idx<args.length,'Message reference must be in range');return args[idx];});throw createError(lastLineNumber,lastIndex,msg);}function tolerateError(messageFormat){var args,msg,error;args=Array.prototype.slice.call(arguments,1);/* istanbul ignore next */msg=messageFormat.replace(/%(\d)/g,function(whole,idx){assert(idx<args.length,'Message reference must be in range');return args[idx];});error=createError(lineNumber,lastIndex,msg);if(extra.errors){recordError(error);}else{throw error;}}// Throw an exception because of the token.
function unexpectedTokenError(token,message){var value,msg=message||Messages.UnexpectedToken;if(token){if(!message){msg=token.type===Token.EOF?Messages.UnexpectedEOS:token.type===Token.Identifier?Messages.UnexpectedIdentifier:token.type===Token.NumericLiteral?Messages.UnexpectedNumber:token.type===Token.StringLiteral?Messages.UnexpectedString:token.type===Token.Template?Messages.UnexpectedTemplate:Messages.UnexpectedToken;if(token.type===Token.Keyword){if(isFutureReservedWord(token.value)){msg=Messages.UnexpectedReserved;}else if(strict&&isStrictModeReservedWord(token.value)){msg=Messages.StrictReservedWord;}}}value=token.type===Token.Template?token.value.raw:token.value;}else{value='ILLEGAL';}msg=msg.replace('%0',value);return token&&typeof token.lineNumber==='number'?createError(token.lineNumber,token.start,msg):createError(scanning?lineNumber:lastLineNumber,scanning?index:lastIndex,msg);}function throwUnexpectedToken(token,message){throw unexpectedTokenError(token,message);}function tolerateUnexpectedToken(token,message){var error=unexpectedTokenError(token,message);if(extra.errors){recordError(error);}else{throw error;}}// Expect the next token to match the specified punctuator.
// If not, an exception will be thrown.
function expect(value){var token=lex();if(token.type!==Token.Punctuator||token.value!==value){throwUnexpectedToken(token);}}/**
     * @name expectCommaSeparator
     * @description Quietly expect a comma when in tolerant mode, otherwise delegates
     * to <code>expect(value)</code>
     * @since 2.0
     */function expectCommaSeparator(){var token;if(extra.errors){token=lookahead;if(token.type===Token.Punctuator&&token.value===','){lex();}else if(token.type===Token.Punctuator&&token.value===';'){lex();tolerateUnexpectedToken(token);}else{tolerateUnexpectedToken(token,Messages.UnexpectedToken);}}else{expect(',');}}// Expect the next token to match the specified keyword.
// If not, an exception will be thrown.
function expectKeyword(keyword){var token=lex();if(token.type!==Token.Keyword||token.value!==keyword){throwUnexpectedToken(token);}}// Return true if the next token matches the specified punctuator.
function match(value){return lookahead.type===Token.Punctuator&&lookahead.value===value;}// Return true if the next token matches the specified keyword
function matchKeyword(keyword){return lookahead.type===Token.Keyword&&lookahead.value===keyword;}// Return true if the next token matches the specified contextual keyword
// (where an identifier is sometimes a keyword depending on the context)
function matchContextualKeyword(keyword){return lookahead.type===Token.Identifier&&lookahead.value===keyword;}// Return true if the next token is an assignment operator
function matchAssign(){var op;if(lookahead.type!==Token.Punctuator){return false;}op=lookahead.value;return op==='='||op==='*='||op==='/='||op==='%='||op==='+='||op==='-='||op==='<<='||op==='>>='||op==='>>>='||op==='&='||op==='^='||op==='|=';}function consumeSemicolon(){// Catch the very common case first: immediately a semicolon (U+003B).
if(source.charCodeAt(startIndex)===0x3B||match(';')){lex();return;}if(hasLineTerminator){return;}// FIXME(ikarienator): this is seemingly an issue in the previous location info convention.
lastIndex=startIndex;lastLineNumber=startLineNumber;lastLineStart=startLineStart;if(lookahead.type!==Token.EOF&&!match('}')){throwUnexpectedToken(lookahead);}}// Cover grammar support.
//
// When an assignment expression position starts with an left parenthesis, the determination of the type
// of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
// or the first comma. This situation also defers the determination of all the expressions nested in the pair.
//
// There are three productions that can be parsed in a parentheses pair that needs to be determined
// after the outermost pair is closed. They are:
//
//   1. AssignmentExpression
//   2. BindingElements
//   3. AssignmentTargets
//
// In order to avoid exponential backtracking, we use two flags to denote if the production can be
// binding element or assignment target.
//
// The three productions have the relationship:
//
//   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
//
// with a single exception that CoverInitializedName when used directly in an Expression, generates
// an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
// first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
//
// isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
// effect the current flags. This means the production the parser parses is only used as an expression. Therefore
// the CoverInitializedName check is conducted.
//
// inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
// the flags outside of the parser. This means the production the parser parses is used as a part of a potential
// pattern. The CoverInitializedName check is deferred.
function isolateCoverGrammar(parser){var oldIsBindingElement=isBindingElement,oldIsAssignmentTarget=isAssignmentTarget,oldFirstCoverInitializedNameError=firstCoverInitializedNameError,result;isBindingElement=true;isAssignmentTarget=true;firstCoverInitializedNameError=null;result=parser();if(firstCoverInitializedNameError!==null){throwUnexpectedToken(firstCoverInitializedNameError);}isBindingElement=oldIsBindingElement;isAssignmentTarget=oldIsAssignmentTarget;firstCoverInitializedNameError=oldFirstCoverInitializedNameError;return result;}function inheritCoverGrammar(parser){var oldIsBindingElement=isBindingElement,oldIsAssignmentTarget=isAssignmentTarget,oldFirstCoverInitializedNameError=firstCoverInitializedNameError,result;isBindingElement=true;isAssignmentTarget=true;firstCoverInitializedNameError=null;result=parser();isBindingElement=isBindingElement&&oldIsBindingElement;isAssignmentTarget=isAssignmentTarget&&oldIsAssignmentTarget;firstCoverInitializedNameError=oldFirstCoverInitializedNameError||firstCoverInitializedNameError;return result;}// ECMA-262 13.3.3 Destructuring Binding Patterns
function parseArrayPattern(params,kind){var node=new Node(),elements=[],rest,restNode;expect('[');while(!match(']')){if(match(',')){lex();elements.push(null);}else{if(match('...')){restNode=new Node();lex();params.push(lookahead);rest=parseVariableIdentifier(kind);elements.push(restNode.finishRestElement(rest));break;}else{elements.push(parsePatternWithDefault(params,kind));}if(!match(']')){expect(',');}}}expect(']');return node.finishArrayPattern(elements);}function parsePropertyPattern(params,kind){var node=new Node(),key,keyToken,computed=match('['),init;if(lookahead.type===Token.Identifier){keyToken=lookahead;key=parseVariableIdentifier();if(match('=')){params.push(keyToken);lex();init=parseAssignmentExpression();return node.finishProperty('init',key,false,new WrappingNode(keyToken).finishAssignmentPattern(key,init),false,true);}else if(!match(':')){params.push(keyToken);return node.finishProperty('init',key,false,key,false,true);}}else{key=parseObjectPropertyKey();}expect(':');init=parsePatternWithDefault(params,kind);return node.finishProperty('init',key,computed,init,false,false);}function parseObjectPattern(params,kind){var node=new Node(),properties=[];expect('{');while(!match('}')){properties.push(parsePropertyPattern(params,kind));if(!match('}')){expect(',');}}lex();return node.finishObjectPattern(properties);}function parsePattern(params,kind){if(match('[')){return parseArrayPattern(params,kind);}else if(match('{')){return parseObjectPattern(params,kind);}else if(matchKeyword('let')){if(kind==='const'||kind==='let'){tolerateUnexpectedToken(lookahead,Messages.UnexpectedToken);}}params.push(lookahead);return parseVariableIdentifier(kind);}function parsePatternWithDefault(params,kind){var startToken=lookahead,pattern,previousAllowYield,right;pattern=parsePattern(params,kind);if(match('=')){lex();previousAllowYield=state.allowYield;state.allowYield=true;right=isolateCoverGrammar(parseAssignmentExpression);state.allowYield=previousAllowYield;pattern=new WrappingNode(startToken).finishAssignmentPattern(pattern,right);}return pattern;}// ECMA-262 12.2.5 Array Initializer
function parseArrayInitializer(){var elements=[],node=new Node(),restSpread;expect('[');while(!match(']')){if(match(',')){lex();elements.push(null);}else if(match('...')){restSpread=new Node();lex();restSpread.finishSpreadElement(inheritCoverGrammar(parseAssignmentExpression));if(!match(']')){isAssignmentTarget=isBindingElement=false;expect(',');}elements.push(restSpread);}else{elements.push(inheritCoverGrammar(parseAssignmentExpression));if(!match(']')){expect(',');}}}lex();return node.finishArrayExpression(elements);}// ECMA-262 12.2.6 Object Initializer
function parsePropertyFunction(node,paramInfo,isGenerator){var previousStrict,body;isAssignmentTarget=isBindingElement=false;previousStrict=strict;body=isolateCoverGrammar(parseFunctionSourceElements);if(strict&&paramInfo.firstRestricted){tolerateUnexpectedToken(paramInfo.firstRestricted,paramInfo.message);}if(strict&&paramInfo.stricted){tolerateUnexpectedToken(paramInfo.stricted,paramInfo.message);}strict=previousStrict;return node.finishFunctionExpression(null,paramInfo.params,paramInfo.defaults,body,isGenerator);}function parsePropertyMethodFunction(){var params,method,node=new Node(),previousAllowYield=state.allowYield;state.allowYield=false;params=parseParams();state.allowYield=previousAllowYield;state.allowYield=false;method=parsePropertyFunction(node,params,false);state.allowYield=previousAllowYield;return method;}function parseObjectPropertyKey(){var token,node=new Node(),expr;token=lex();// Note: This function is called only from parseObjectProperty(), where
// EOF and Punctuator tokens are already filtered out.
switch(token.type){case Token.StringLiteral:case Token.NumericLiteral:if(strict&&token.octal){tolerateUnexpectedToken(token,Messages.StrictOctalLiteral);}return node.finishLiteral(token);case Token.Identifier:case Token.BooleanLiteral:case Token.NullLiteral:case Token.Keyword:return node.finishIdentifier(token.value);case Token.Punctuator:if(token.value==='['){expr=isolateCoverGrammar(parseAssignmentExpression);expect(']');return expr;}break;}throwUnexpectedToken(token);}function lookaheadPropertyName(){switch(lookahead.type){case Token.Identifier:case Token.StringLiteral:case Token.BooleanLiteral:case Token.NullLiteral:case Token.NumericLiteral:case Token.Keyword:return true;case Token.Punctuator:return lookahead.value==='[';}return false;}// This function is to try to parse a MethodDefinition as defined in 14.3. But in the case of object literals,
// it might be called at a position where there is in fact a short hand identifier pattern or a data property.
// This can only be determined after we consumed up to the left parentheses.
//
// In order to avoid back tracking, it returns `null` if the position is not a MethodDefinition and the caller
// is responsible to visit other options.
function tryParseMethodDefinition(token,key,computed,node){var value,options,methodNode,params,previousAllowYield=state.allowYield;if(token.type===Token.Identifier){// check for `get` and `set`;
if(token.value==='get'&&lookaheadPropertyName()){computed=match('[');key=parseObjectPropertyKey();methodNode=new Node();expect('(');expect(')');state.allowYield=false;value=parsePropertyFunction(methodNode,{params:[],defaults:[],stricted:null,firstRestricted:null,message:null},false);state.allowYield=previousAllowYield;return node.finishProperty('get',key,computed,value,false,false);}else if(token.value==='set'&&lookaheadPropertyName()){computed=match('[');key=parseObjectPropertyKey();methodNode=new Node();expect('(');options={params:[],defaultCount:0,defaults:[],firstRestricted:null,paramSet:{}};if(match(')')){tolerateUnexpectedToken(lookahead);}else{state.allowYield=false;parseParam(options);state.allowYield=previousAllowYield;if(options.defaultCount===0){options.defaults=[];}}expect(')');state.allowYield=false;value=parsePropertyFunction(methodNode,options,false);state.allowYield=previousAllowYield;return node.finishProperty('set',key,computed,value,false,false);}}else if(token.type===Token.Punctuator&&token.value==='*'&&lookaheadPropertyName()){computed=match('[');key=parseObjectPropertyKey();methodNode=new Node();state.allowYield=true;params=parseParams();state.allowYield=previousAllowYield;state.allowYield=false;value=parsePropertyFunction(methodNode,params,true);state.allowYield=previousAllowYield;return node.finishProperty('init',key,computed,value,true,false);}if(key&&match('(')){value=parsePropertyMethodFunction();return node.finishProperty('init',key,computed,value,true,false);}// Not a MethodDefinition.
return null;}function parseObjectProperty(hasProto){var token=lookahead,node=new Node(),computed,key,maybeMethod,proto,value;computed=match('[');if(match('*')){lex();}else{key=parseObjectPropertyKey();}maybeMethod=tryParseMethodDefinition(token,key,computed,node);if(maybeMethod){return maybeMethod;}if(!key){throwUnexpectedToken(lookahead);}// Check for duplicated __proto__
if(!computed){proto=key.type===Syntax.Identifier&&key.name==='__proto__'||key.type===Syntax.Literal&&key.value==='__proto__';if(hasProto.value&&proto){tolerateError(Messages.DuplicateProtoProperty);}hasProto.value|=proto;}if(match(':')){lex();value=inheritCoverGrammar(parseAssignmentExpression);return node.finishProperty('init',key,computed,value,false,false);}if(token.type===Token.Identifier){if(match('=')){firstCoverInitializedNameError=lookahead;lex();value=isolateCoverGrammar(parseAssignmentExpression);return node.finishProperty('init',key,computed,new WrappingNode(token).finishAssignmentPattern(key,value),false,true);}return node.finishProperty('init',key,computed,key,false,true);}throwUnexpectedToken(lookahead);}function parseObjectInitializer(){var properties=[],hasProto={value:false},node=new Node();expect('{');while(!match('}')){properties.push(parseObjectProperty(hasProto));if(!match('}')){expectCommaSeparator();}}expect('}');return node.finishObjectExpression(properties);}function reinterpretExpressionAsPattern(expr){var i;switch(expr.type){case Syntax.Identifier:case Syntax.MemberExpression:case Syntax.RestElement:case Syntax.AssignmentPattern:break;case Syntax.SpreadElement:expr.type=Syntax.RestElement;reinterpretExpressionAsPattern(expr.argument);break;case Syntax.ArrayExpression:expr.type=Syntax.ArrayPattern;for(i=0;i<expr.elements.length;i++){if(expr.elements[i]!==null){reinterpretExpressionAsPattern(expr.elements[i]);}}break;case Syntax.ObjectExpression:expr.type=Syntax.ObjectPattern;for(i=0;i<expr.properties.length;i++){reinterpretExpressionAsPattern(expr.properties[i].value);}break;case Syntax.AssignmentExpression:expr.type=Syntax.AssignmentPattern;reinterpretExpressionAsPattern(expr.left);break;default:// Allow other node type for tolerant parsing.
break;}}// ECMA-262 12.2.9 Template Literals
function parseTemplateElement(option){var node,token;if(lookahead.type!==Token.Template||option.head&&!lookahead.head){throwUnexpectedToken();}node=new Node();token=lex();return node.finishTemplateElement({raw:token.value.raw,cooked:token.value.cooked},token.tail);}function parseTemplateLiteral(){var quasi,quasis,expressions,node=new Node();quasi=parseTemplateElement({head:true});quasis=[quasi];expressions=[];while(!quasi.tail){expressions.push(parseExpression());quasi=parseTemplateElement({head:false});quasis.push(quasi);}return node.finishTemplateLiteral(quasis,expressions);}// ECMA-262 12.2.10 The Grouping Operator
function parseGroupExpression(){var expr,expressions,startToken,i,params=[];expect('(');if(match(')')){lex();if(!match('=>')){expect('=>');}return{type:PlaceHolders.ArrowParameterPlaceHolder,params:[],rawParams:[]};}startToken=lookahead;if(match('...')){expr=parseRestElement(params);expect(')');if(!match('=>')){expect('=>');}return{type:PlaceHolders.ArrowParameterPlaceHolder,params:[expr]};}isBindingElement=true;expr=inheritCoverGrammar(parseAssignmentExpression);if(match(',')){isAssignmentTarget=false;expressions=[expr];while(startIndex<length){if(!match(',')){break;}lex();if(match('...')){if(!isBindingElement){throwUnexpectedToken(lookahead);}expressions.push(parseRestElement(params));expect(')');if(!match('=>')){expect('=>');}isBindingElement=false;for(i=0;i<expressions.length;i++){reinterpretExpressionAsPattern(expressions[i]);}return{type:PlaceHolders.ArrowParameterPlaceHolder,params:expressions};}expressions.push(inheritCoverGrammar(parseAssignmentExpression));}expr=new WrappingNode(startToken).finishSequenceExpression(expressions);}expect(')');if(match('=>')){if(expr.type===Syntax.Identifier&&expr.name==='yield'){return{type:PlaceHolders.ArrowParameterPlaceHolder,params:[expr]};}if(!isBindingElement){throwUnexpectedToken(lookahead);}if(expr.type===Syntax.SequenceExpression){for(i=0;i<expr.expressions.length;i++){reinterpretExpressionAsPattern(expr.expressions[i]);}}else{reinterpretExpressionAsPattern(expr);}expr={type:PlaceHolders.ArrowParameterPlaceHolder,params:expr.type===Syntax.SequenceExpression?expr.expressions:[expr]};}isBindingElement=false;return expr;}// ECMA-262 12.2 Primary Expressions
function parsePrimaryExpression(){var type,token,expr,node;if(match('(')){isBindingElement=false;return inheritCoverGrammar(parseGroupExpression);}if(match('[')){return inheritCoverGrammar(parseArrayInitializer);}if(match('{')){return inheritCoverGrammar(parseObjectInitializer);}type=lookahead.type;node=new Node();if(type===Token.Identifier){if(state.sourceType==='module'&&lookahead.value==='await'){tolerateUnexpectedToken(lookahead);}expr=node.finishIdentifier(lex().value);}else if(type===Token.StringLiteral||type===Token.NumericLiteral){isAssignmentTarget=isBindingElement=false;if(strict&&lookahead.octal){tolerateUnexpectedToken(lookahead,Messages.StrictOctalLiteral);}expr=node.finishLiteral(lex());}else if(type===Token.Keyword){if(!strict&&state.allowYield&&matchKeyword('yield')){return parseNonComputedProperty();}if(!strict&&matchKeyword('let')){return node.finishIdentifier(lex().value);}isAssignmentTarget=isBindingElement=false;if(matchKeyword('function')){return parseFunctionExpression();}if(matchKeyword('this')){lex();return node.finishThisExpression();}if(matchKeyword('class')){return parseClassExpression();}throwUnexpectedToken(lex());}else if(type===Token.BooleanLiteral){isAssignmentTarget=isBindingElement=false;token=lex();token.value=token.value==='true';expr=node.finishLiteral(token);}else if(type===Token.NullLiteral){isAssignmentTarget=isBindingElement=false;token=lex();token.value=null;expr=node.finishLiteral(token);}else if(match('/')||match('/=')){isAssignmentTarget=isBindingElement=false;index=startIndex;if(typeof extra.tokens!=='undefined'){token=collectRegex();}else{token=scanRegExp();}lex();expr=node.finishLiteral(token);}else if(type===Token.Template){expr=parseTemplateLiteral();}else{throwUnexpectedToken(lex());}return expr;}// ECMA-262 12.3 Left-Hand-Side Expressions
function parseArguments(){var args=[],expr;expect('(');if(!match(')')){while(startIndex<length){if(match('...')){expr=new Node();lex();expr.finishSpreadElement(isolateCoverGrammar(parseAssignmentExpression));}else{expr=isolateCoverGrammar(parseAssignmentExpression);}args.push(expr);if(match(')')){break;}expectCommaSeparator();}}expect(')');return args;}function parseNonComputedProperty(){var token,node=new Node();token=lex();if(!isIdentifierName(token)){throwUnexpectedToken(token);}return node.finishIdentifier(token.value);}function parseNonComputedMember(){expect('.');return parseNonComputedProperty();}function parseComputedMember(){var expr;expect('[');expr=isolateCoverGrammar(parseExpression);expect(']');return expr;}// ECMA-262 12.3.3 The new Operator
function parseNewExpression(){var callee,args,node=new Node();expectKeyword('new');if(match('.')){lex();if(lookahead.type===Token.Identifier&&lookahead.value==='target'){if(state.inFunctionBody){lex();return node.finishMetaProperty('new','target');}}throwUnexpectedToken(lookahead);}callee=isolateCoverGrammar(parseLeftHandSideExpression);args=match('(')?parseArguments():[];isAssignmentTarget=isBindingElement=false;return node.finishNewExpression(callee,args);}// ECMA-262 12.3.4 Function Calls
function parseLeftHandSideExpressionAllowCall(){var quasi,expr,args,property,startToken,previousAllowIn=state.allowIn;startToken=lookahead;state.allowIn=true;if(matchKeyword('super')&&state.inFunctionBody){expr=new Node();lex();expr=expr.finishSuper();if(!match('(')&&!match('.')&&!match('[')){throwUnexpectedToken(lookahead);}}else{expr=inheritCoverGrammar(matchKeyword('new')?parseNewExpression:parsePrimaryExpression);}for(;;){if(match('.')){isBindingElement=false;isAssignmentTarget=true;property=parseNonComputedMember();expr=new WrappingNode(startToken).finishMemberExpression('.',expr,property);}else if(match('(')){isBindingElement=false;isAssignmentTarget=false;args=parseArguments();expr=new WrappingNode(startToken).finishCallExpression(expr,args);}else if(match('[')){isBindingElement=false;isAssignmentTarget=true;property=parseComputedMember();expr=new WrappingNode(startToken).finishMemberExpression('[',expr,property);}else if(lookahead.type===Token.Template&&lookahead.head){quasi=parseTemplateLiteral();expr=new WrappingNode(startToken).finishTaggedTemplateExpression(expr,quasi);}else{break;}}state.allowIn=previousAllowIn;return expr;}// ECMA-262 12.3 Left-Hand-Side Expressions
function parseLeftHandSideExpression(){var quasi,expr,property,startToken;assert(state.allowIn,'callee of new expression always allow in keyword.');startToken=lookahead;if(matchKeyword('super')&&state.inFunctionBody){expr=new Node();lex();expr=expr.finishSuper();if(!match('[')&&!match('.')){throwUnexpectedToken(lookahead);}}else{expr=inheritCoverGrammar(matchKeyword('new')?parseNewExpression:parsePrimaryExpression);}for(;;){if(match('[')){isBindingElement=false;isAssignmentTarget=true;property=parseComputedMember();expr=new WrappingNode(startToken).finishMemberExpression('[',expr,property);}else if(match('.')){isBindingElement=false;isAssignmentTarget=true;property=parseNonComputedMember();expr=new WrappingNode(startToken).finishMemberExpression('.',expr,property);}else if(lookahead.type===Token.Template&&lookahead.head){quasi=parseTemplateLiteral();expr=new WrappingNode(startToken).finishTaggedTemplateExpression(expr,quasi);}else{break;}}return expr;}// ECMA-262 12.4 Postfix Expressions
function parsePostfixExpression(){var expr,token,startToken=lookahead;expr=inheritCoverGrammar(parseLeftHandSideExpressionAllowCall);if(!hasLineTerminator&&lookahead.type===Token.Punctuator){if(match('++')||match('--')){// ECMA-262 11.3.1, 11.3.2
if(strict&&expr.type===Syntax.Identifier&&isRestrictedWord(expr.name)){tolerateError(Messages.StrictLHSPostfix);}if(!isAssignmentTarget){tolerateError(Messages.InvalidLHSInAssignment);}isAssignmentTarget=isBindingElement=false;token=lex();expr=new WrappingNode(startToken).finishPostfixExpression(token.value,expr);}}return expr;}// ECMA-262 12.5 Unary Operators
function parseUnaryExpression(){var token,expr,startToken;if(lookahead.type!==Token.Punctuator&&lookahead.type!==Token.Keyword){expr=parsePostfixExpression();}else if(match('++')||match('--')){startToken=lookahead;token=lex();expr=inheritCoverGrammar(parseUnaryExpression);// ECMA-262 11.4.4, 11.4.5
if(strict&&expr.type===Syntax.Identifier&&isRestrictedWord(expr.name)){tolerateError(Messages.StrictLHSPrefix);}if(!isAssignmentTarget){tolerateError(Messages.InvalidLHSInAssignment);}expr=new WrappingNode(startToken).finishUnaryExpression(token.value,expr);isAssignmentTarget=isBindingElement=false;}else if(match('+')||match('-')||match('~')||match('!')){startToken=lookahead;token=lex();expr=inheritCoverGrammar(parseUnaryExpression);expr=new WrappingNode(startToken).finishUnaryExpression(token.value,expr);isAssignmentTarget=isBindingElement=false;}else if(matchKeyword('delete')||matchKeyword('void')||matchKeyword('typeof')){startToken=lookahead;token=lex();expr=inheritCoverGrammar(parseUnaryExpression);expr=new WrappingNode(startToken).finishUnaryExpression(token.value,expr);if(strict&&expr.operator==='delete'&&expr.argument.type===Syntax.Identifier){tolerateError(Messages.StrictDelete);}isAssignmentTarget=isBindingElement=false;}else{expr=parsePostfixExpression();}return expr;}function binaryPrecedence(token,allowIn){var prec=0;if(token.type!==Token.Punctuator&&token.type!==Token.Keyword){return 0;}switch(token.value){case'||':prec=1;break;case'&&':prec=2;break;case'|':prec=3;break;case'^':prec=4;break;case'&':prec=5;break;case'==':case'!=':case'===':case'!==':prec=6;break;case'<':case'>':case'<=':case'>=':case'instanceof':prec=7;break;case'in':prec=allowIn?7:0;break;case'<<':case'>>':case'>>>':prec=8;break;case'+':case'-':prec=9;break;case'*':case'/':case'%':prec=11;break;default:break;}return prec;}// ECMA-262 12.6 Multiplicative Operators
// ECMA-262 12.7 Additive Operators
// ECMA-262 12.8 Bitwise Shift Operators
// ECMA-262 12.9 Relational Operators
// ECMA-262 12.10 Equality Operators
// ECMA-262 12.11 Binary Bitwise Operators
// ECMA-262 12.12 Binary Logical Operators
function parseBinaryExpression(){var marker,markers,expr,token,prec,stack,right,operator,left,i;marker=lookahead;left=inheritCoverGrammar(parseUnaryExpression);token=lookahead;prec=binaryPrecedence(token,state.allowIn);if(prec===0){return left;}isAssignmentTarget=isBindingElement=false;token.prec=prec;lex();markers=[marker,lookahead];right=isolateCoverGrammar(parseUnaryExpression);stack=[left,token,right];while((prec=binaryPrecedence(lookahead,state.allowIn))>0){// Reduce: make a binary expression from the three topmost entries.
while(stack.length>2&&prec<=stack[stack.length-2].prec){right=stack.pop();operator=stack.pop().value;left=stack.pop();markers.pop();expr=new WrappingNode(markers[markers.length-1]).finishBinaryExpression(operator,left,right);stack.push(expr);}// Shift.
token=lex();token.prec=prec;stack.push(token);markers.push(lookahead);expr=isolateCoverGrammar(parseUnaryExpression);stack.push(expr);}// Final reduce to clean-up the stack.
i=stack.length-1;expr=stack[i];markers.pop();while(i>1){expr=new WrappingNode(markers.pop()).finishBinaryExpression(stack[i-1].value,stack[i-2],expr);i-=2;}return expr;}// ECMA-262 12.13 Conditional Operator
function parseConditionalExpression(){var expr,previousAllowIn,consequent,alternate,startToken;startToken=lookahead;expr=inheritCoverGrammar(parseBinaryExpression);if(match('?')){lex();previousAllowIn=state.allowIn;state.allowIn=true;consequent=isolateCoverGrammar(parseAssignmentExpression);state.allowIn=previousAllowIn;expect(':');alternate=isolateCoverGrammar(parseAssignmentExpression);expr=new WrappingNode(startToken).finishConditionalExpression(expr,consequent,alternate);isAssignmentTarget=isBindingElement=false;}return expr;}// ECMA-262 14.2 Arrow Function Definitions
function parseConciseBody(){if(match('{')){return parseFunctionSourceElements();}return isolateCoverGrammar(parseAssignmentExpression);}function checkPatternParam(options,param){var i;switch(param.type){case Syntax.Identifier:validateParam(options,param,param.name);break;case Syntax.RestElement:checkPatternParam(options,param.argument);break;case Syntax.AssignmentPattern:checkPatternParam(options,param.left);break;case Syntax.ArrayPattern:for(i=0;i<param.elements.length;i++){if(param.elements[i]!==null){checkPatternParam(options,param.elements[i]);}}break;case Syntax.YieldExpression:break;default:assert(param.type===Syntax.ObjectPattern,'Invalid type');for(i=0;i<param.properties.length;i++){checkPatternParam(options,param.properties[i].value);}break;}}function reinterpretAsCoverFormalsList(expr){var i,len,param,params,defaults,defaultCount,options,token;defaults=[];defaultCount=0;params=[expr];switch(expr.type){case Syntax.Identifier:break;case PlaceHolders.ArrowParameterPlaceHolder:params=expr.params;break;default:return null;}options={paramSet:{}};for(i=0,len=params.length;i<len;i+=1){param=params[i];switch(param.type){case Syntax.AssignmentPattern:params[i]=param.left;if(param.right.type===Syntax.YieldExpression){if(param.right.argument){throwUnexpectedToken(lookahead);}param.right.type=Syntax.Identifier;param.right.name='yield';delete param.right.argument;delete param.right.delegate;}defaults.push(param.right);++defaultCount;checkPatternParam(options,param.left);break;default:checkPatternParam(options,param);params[i]=param;defaults.push(null);break;}}if(strict||!state.allowYield){for(i=0,len=params.length;i<len;i+=1){param=params[i];if(param.type===Syntax.YieldExpression){throwUnexpectedToken(lookahead);}}}if(options.message===Messages.StrictParamDupe){token=strict?options.stricted:options.firstRestricted;throwUnexpectedToken(token,options.message);}if(defaultCount===0){defaults=[];}return{params:params,defaults:defaults,stricted:options.stricted,firstRestricted:options.firstRestricted,message:options.message};}function parseArrowFunctionExpression(options,node){var previousStrict,previousAllowYield,body;if(hasLineTerminator){tolerateUnexpectedToken(lookahead);}expect('=>');previousStrict=strict;previousAllowYield=state.allowYield;state.allowYield=true;body=parseConciseBody();if(strict&&options.firstRestricted){throwUnexpectedToken(options.firstRestricted,options.message);}if(strict&&options.stricted){tolerateUnexpectedToken(options.stricted,options.message);}strict=previousStrict;state.allowYield=previousAllowYield;return node.finishArrowFunctionExpression(options.params,options.defaults,body,body.type!==Syntax.BlockStatement);}// ECMA-262 14.4 Yield expression
function parseYieldExpression(){var argument,expr,delegate,previousAllowYield;argument=null;expr=new Node();delegate=false;expectKeyword('yield');if(!hasLineTerminator){previousAllowYield=state.allowYield;state.allowYield=false;delegate=match('*');if(delegate){lex();argument=parseAssignmentExpression();}else{if(!match(';')&&!match('}')&&!match(')')&&lookahead.type!==Token.EOF){argument=parseAssignmentExpression();}}state.allowYield=previousAllowYield;}return expr.finishYieldExpression(argument,delegate);}// ECMA-262 12.14 Assignment Operators
function parseAssignmentExpression(){var token,expr,right,list,startToken;startToken=lookahead;token=lookahead;if(!state.allowYield&&matchKeyword('yield')){return parseYieldExpression();}expr=parseConditionalExpression();if(expr.type===PlaceHolders.ArrowParameterPlaceHolder||match('=>')){isAssignmentTarget=isBindingElement=false;list=reinterpretAsCoverFormalsList(expr);if(list){firstCoverInitializedNameError=null;return parseArrowFunctionExpression(list,new WrappingNode(startToken));}return expr;}if(matchAssign()){if(!isAssignmentTarget){tolerateError(Messages.InvalidLHSInAssignment);}// ECMA-262 12.1.1
if(strict&&expr.type===Syntax.Identifier){if(isRestrictedWord(expr.name)){tolerateUnexpectedToken(token,Messages.StrictLHSAssignment);}if(isStrictModeReservedWord(expr.name)){tolerateUnexpectedToken(token,Messages.StrictReservedWord);}}if(!match('=')){isAssignmentTarget=isBindingElement=false;}else{reinterpretExpressionAsPattern(expr);}token=lex();right=isolateCoverGrammar(parseAssignmentExpression);expr=new WrappingNode(startToken).finishAssignmentExpression(token.value,expr,right);firstCoverInitializedNameError=null;}return expr;}// ECMA-262 12.15 Comma Operator
function parseExpression(){var expr,startToken=lookahead,expressions;expr=isolateCoverGrammar(parseAssignmentExpression);if(match(',')){expressions=[expr];while(startIndex<length){if(!match(',')){break;}lex();expressions.push(isolateCoverGrammar(parseAssignmentExpression));}expr=new WrappingNode(startToken).finishSequenceExpression(expressions);}return expr;}// ECMA-262 13.2 Block
function parseStatementListItem(){if(lookahead.type===Token.Keyword){switch(lookahead.value){case'export':if(state.sourceType!=='module'){tolerateUnexpectedToken(lookahead,Messages.IllegalExportDeclaration);}return parseExportDeclaration();case'import':if(state.sourceType!=='module'){tolerateUnexpectedToken(lookahead,Messages.IllegalImportDeclaration);}return parseImportDeclaration();case'const':return parseLexicalDeclaration({inFor:false});case'function':return parseFunctionDeclaration(new Node());case'class':return parseClassDeclaration();}}if(matchKeyword('let')&&isLexicalDeclaration()){return parseLexicalDeclaration({inFor:false});}return parseStatement();}function parseStatementList(){var list=[];while(startIndex<length){if(match('}')){break;}list.push(parseStatementListItem());}return list;}function parseBlock(){var block,node=new Node();expect('{');block=parseStatementList();expect('}');return node.finishBlockStatement(block);}// ECMA-262 13.3.2 Variable Statement
function parseVariableIdentifier(kind){var token,node=new Node();token=lex();if(token.type===Token.Keyword&&token.value==='yield'){if(strict){tolerateUnexpectedToken(token,Messages.StrictReservedWord);}if(!state.allowYield){throwUnexpectedToken(token);}}else if(token.type!==Token.Identifier){if(strict&&token.type===Token.Keyword&&isStrictModeReservedWord(token.value)){tolerateUnexpectedToken(token,Messages.StrictReservedWord);}else{if(strict||token.value!=='let'||kind!=='var'){throwUnexpectedToken(token);}}}else if(state.sourceType==='module'&&token.type===Token.Identifier&&token.value==='await'){tolerateUnexpectedToken(token);}return node.finishIdentifier(token.value);}function parseVariableDeclaration(options){var init=null,id,node=new Node(),params=[];id=parsePattern(params,'var');// ECMA-262 12.2.1
if(strict&&isRestrictedWord(id.name)){tolerateError(Messages.StrictVarName);}if(match('=')){lex();init=isolateCoverGrammar(parseAssignmentExpression);}else if(id.type!==Syntax.Identifier&&!options.inFor){expect('=');}return node.finishVariableDeclarator(id,init);}function parseVariableDeclarationList(options){var opt,list;opt={inFor:options.inFor};list=[parseVariableDeclaration(opt)];while(match(',')){lex();list.push(parseVariableDeclaration(opt));}return list;}function parseVariableStatement(node){var declarations;expectKeyword('var');declarations=parseVariableDeclarationList({inFor:false});consumeSemicolon();return node.finishVariableDeclaration(declarations);}// ECMA-262 13.3.1 Let and Const Declarations
function parseLexicalBinding(kind,options){var init=null,id,node=new Node(),params=[];id=parsePattern(params,kind);// ECMA-262 12.2.1
if(strict&&id.type===Syntax.Identifier&&isRestrictedWord(id.name)){tolerateError(Messages.StrictVarName);}if(kind==='const'){if(!matchKeyword('in')&&!matchContextualKeyword('of')){expect('=');init=isolateCoverGrammar(parseAssignmentExpression);}}else if(!options.inFor&&id.type!==Syntax.Identifier||match('=')){expect('=');init=isolateCoverGrammar(parseAssignmentExpression);}return node.finishVariableDeclarator(id,init);}function parseBindingList(kind,options){var list=[parseLexicalBinding(kind,options)];while(match(',')){lex();list.push(parseLexicalBinding(kind,options));}return list;}function tokenizerState(){return{index:index,lineNumber:lineNumber,lineStart:lineStart,hasLineTerminator:hasLineTerminator,lastIndex:lastIndex,lastLineNumber:lastLineNumber,lastLineStart:lastLineStart,startIndex:startIndex,startLineNumber:startLineNumber,startLineStart:startLineStart,lookahead:lookahead,tokenCount:extra.tokens?extra.tokens.length:0};}function resetTokenizerState(ts){index=ts.index;lineNumber=ts.lineNumber;lineStart=ts.lineStart;hasLineTerminator=ts.hasLineTerminator;lastIndex=ts.lastIndex;lastLineNumber=ts.lastLineNumber;lastLineStart=ts.lastLineStart;startIndex=ts.startIndex;startLineNumber=ts.startLineNumber;startLineStart=ts.startLineStart;lookahead=ts.lookahead;if(extra.tokens){extra.tokens.splice(ts.tokenCount,extra.tokens.length);}}function isLexicalDeclaration(){var lexical,ts;ts=tokenizerState();lex();lexical=lookahead.type===Token.Identifier||match('[')||match('{')||matchKeyword('let')||matchKeyword('yield');resetTokenizerState(ts);return lexical;}function parseLexicalDeclaration(options){var kind,declarations,node=new Node();kind=lex().value;assert(kind==='let'||kind==='const','Lexical declaration must be either let or const');declarations=parseBindingList(kind,options);consumeSemicolon();return node.finishLexicalDeclaration(declarations,kind);}function parseRestElement(params){var param,node=new Node();lex();if(match('{')){throwError(Messages.ObjectPatternAsRestParameter);}params.push(lookahead);param=parseVariableIdentifier();if(match('=')){throwError(Messages.DefaultRestParameter);}if(!match(')')){throwError(Messages.ParameterAfterRestParameter);}return node.finishRestElement(param);}// ECMA-262 13.4 Empty Statement
function parseEmptyStatement(node){expect(';');return node.finishEmptyStatement();}// ECMA-262 12.4 Expression Statement
function parseExpressionStatement(node){var expr=parseExpression();consumeSemicolon();return node.finishExpressionStatement(expr);}// ECMA-262 13.6 If statement
function parseIfStatement(node){var test,consequent,alternate;expectKeyword('if');expect('(');test=parseExpression();expect(')');consequent=parseStatement();if(matchKeyword('else')){lex();alternate=parseStatement();}else{alternate=null;}return node.finishIfStatement(test,consequent,alternate);}// ECMA-262 13.7 Iteration Statements
function parseDoWhileStatement(node){var body,test,oldInIteration;expectKeyword('do');oldInIteration=state.inIteration;state.inIteration=true;body=parseStatement();state.inIteration=oldInIteration;expectKeyword('while');expect('(');test=parseExpression();expect(')');if(match(';')){lex();}return node.finishDoWhileStatement(body,test);}function parseWhileStatement(node){var test,body,oldInIteration;expectKeyword('while');expect('(');test=parseExpression();expect(')');oldInIteration=state.inIteration;state.inIteration=true;body=parseStatement();state.inIteration=oldInIteration;return node.finishWhileStatement(test,body);}function parseForStatement(node){var init,forIn,initSeq,initStartToken,test,update,left,right,kind,declarations,body,oldInIteration,previousAllowIn=state.allowIn;init=test=update=null;forIn=true;expectKeyword('for');expect('(');if(match(';')){lex();}else{if(matchKeyword('var')){init=new Node();lex();state.allowIn=false;declarations=parseVariableDeclarationList({inFor:true});state.allowIn=previousAllowIn;if(declarations.length===1&&matchKeyword('in')){init=init.finishVariableDeclaration(declarations);lex();left=init;right=parseExpression();init=null;}else if(declarations.length===1&&declarations[0].init===null&&matchContextualKeyword('of')){init=init.finishVariableDeclaration(declarations);lex();left=init;right=parseAssignmentExpression();init=null;forIn=false;}else{init=init.finishVariableDeclaration(declarations);expect(';');}}else if(matchKeyword('const')||matchKeyword('let')){init=new Node();kind=lex().value;if(!strict&&lookahead.value==='in'){init=init.finishIdentifier(kind);lex();left=init;right=parseExpression();init=null;}else{state.allowIn=false;declarations=parseBindingList(kind,{inFor:true});state.allowIn=previousAllowIn;if(declarations.length===1&&declarations[0].init===null&&matchKeyword('in')){init=init.finishLexicalDeclaration(declarations,kind);lex();left=init;right=parseExpression();init=null;}else if(declarations.length===1&&declarations[0].init===null&&matchContextualKeyword('of')){init=init.finishLexicalDeclaration(declarations,kind);lex();left=init;right=parseAssignmentExpression();init=null;forIn=false;}else{consumeSemicolon();init=init.finishLexicalDeclaration(declarations,kind);}}}else{initStartToken=lookahead;state.allowIn=false;init=inheritCoverGrammar(parseAssignmentExpression);state.allowIn=previousAllowIn;if(matchKeyword('in')){if(!isAssignmentTarget){tolerateError(Messages.InvalidLHSInForIn);}lex();reinterpretExpressionAsPattern(init);left=init;right=parseExpression();init=null;}else if(matchContextualKeyword('of')){if(!isAssignmentTarget){tolerateError(Messages.InvalidLHSInForLoop);}lex();reinterpretExpressionAsPattern(init);left=init;right=parseAssignmentExpression();init=null;forIn=false;}else{if(match(',')){initSeq=[init];while(match(',')){lex();initSeq.push(isolateCoverGrammar(parseAssignmentExpression));}init=new WrappingNode(initStartToken).finishSequenceExpression(initSeq);}expect(';');}}}if(typeof left==='undefined'){if(!match(';')){test=parseExpression();}expect(';');if(!match(')')){update=parseExpression();}}expect(')');oldInIteration=state.inIteration;state.inIteration=true;body=isolateCoverGrammar(parseStatement);state.inIteration=oldInIteration;return typeof left==='undefined'?node.finishForStatement(init,test,update,body):forIn?node.finishForInStatement(left,right,body):node.finishForOfStatement(left,right,body);}// ECMA-262 13.8 The continue statement
function parseContinueStatement(node){var label=null,key;expectKeyword('continue');// Optimize the most common form: 'continue;'.
if(source.charCodeAt(startIndex)===0x3B){lex();if(!state.inIteration){throwError(Messages.IllegalContinue);}return node.finishContinueStatement(null);}if(hasLineTerminator){if(!state.inIteration){throwError(Messages.IllegalContinue);}return node.finishContinueStatement(null);}if(lookahead.type===Token.Identifier){label=parseVariableIdentifier();key='$'+label.name;if(!Object.prototype.hasOwnProperty.call(state.labelSet,key)){throwError(Messages.UnknownLabel,label.name);}}consumeSemicolon();if(label===null&&!state.inIteration){throwError(Messages.IllegalContinue);}return node.finishContinueStatement(label);}// ECMA-262 13.9 The break statement
function parseBreakStatement(node){var label=null,key;expectKeyword('break');// Catch the very common case first: immediately a semicolon (U+003B).
if(source.charCodeAt(lastIndex)===0x3B){lex();if(!(state.inIteration||state.inSwitch)){throwError(Messages.IllegalBreak);}return node.finishBreakStatement(null);}if(hasLineTerminator){if(!(state.inIteration||state.inSwitch)){throwError(Messages.IllegalBreak);}}else if(lookahead.type===Token.Identifier){label=parseVariableIdentifier();key='$'+label.name;if(!Object.prototype.hasOwnProperty.call(state.labelSet,key)){throwError(Messages.UnknownLabel,label.name);}}consumeSemicolon();if(label===null&&!(state.inIteration||state.inSwitch)){throwError(Messages.IllegalBreak);}return node.finishBreakStatement(label);}// ECMA-262 13.10 The return statement
function parseReturnStatement(node){var argument=null;expectKeyword('return');if(!state.inFunctionBody){tolerateError(Messages.IllegalReturn);}// 'return' followed by a space and an identifier is very common.
if(source.charCodeAt(lastIndex)===0x20){if(isIdentifierStart(source.charCodeAt(lastIndex+1))){argument=parseExpression();consumeSemicolon();return node.finishReturnStatement(argument);}}if(hasLineTerminator){// HACK
return node.finishReturnStatement(null);}if(!match(';')){if(!match('}')&&lookahead.type!==Token.EOF){argument=parseExpression();}}consumeSemicolon();return node.finishReturnStatement(argument);}// ECMA-262 13.11 The with statement
function parseWithStatement(node){var object,body;if(strict){tolerateError(Messages.StrictModeWith);}expectKeyword('with');expect('(');object=parseExpression();expect(')');body=parseStatement();return node.finishWithStatement(object,body);}// ECMA-262 13.12 The switch statement
function parseSwitchCase(){var test,consequent=[],statement,node=new Node();if(matchKeyword('default')){lex();test=null;}else{expectKeyword('case');test=parseExpression();}expect(':');while(startIndex<length){if(match('}')||matchKeyword('default')||matchKeyword('case')){break;}statement=parseStatementListItem();consequent.push(statement);}return node.finishSwitchCase(test,consequent);}function parseSwitchStatement(node){var discriminant,cases,clause,oldInSwitch,defaultFound;expectKeyword('switch');expect('(');discriminant=parseExpression();expect(')');expect('{');cases=[];if(match('}')){lex();return node.finishSwitchStatement(discriminant,cases);}oldInSwitch=state.inSwitch;state.inSwitch=true;defaultFound=false;while(startIndex<length){if(match('}')){break;}clause=parseSwitchCase();if(clause.test===null){if(defaultFound){throwError(Messages.MultipleDefaultsInSwitch);}defaultFound=true;}cases.push(clause);}state.inSwitch=oldInSwitch;expect('}');return node.finishSwitchStatement(discriminant,cases);}// ECMA-262 13.14 The throw statement
function parseThrowStatement(node){var argument;expectKeyword('throw');if(hasLineTerminator){throwError(Messages.NewlineAfterThrow);}argument=parseExpression();consumeSemicolon();return node.finishThrowStatement(argument);}// ECMA-262 13.15 The try statement
function parseCatchClause(){var param,params=[],paramMap={},key,i,body,node=new Node();expectKeyword('catch');expect('(');if(match(')')){throwUnexpectedToken(lookahead);}param=parsePattern(params);for(i=0;i<params.length;i++){key='$'+params[i].value;if(Object.prototype.hasOwnProperty.call(paramMap,key)){tolerateError(Messages.DuplicateBinding,params[i].value);}paramMap[key]=true;}// ECMA-262 12.14.1
if(strict&&isRestrictedWord(param.name)){tolerateError(Messages.StrictCatchVariable);}expect(')');body=parseBlock();return node.finishCatchClause(param,body);}function parseTryStatement(node){var block,handler=null,finalizer=null;expectKeyword('try');block=parseBlock();if(matchKeyword('catch')){handler=parseCatchClause();}if(matchKeyword('finally')){lex();finalizer=parseBlock();}if(!handler&&!finalizer){throwError(Messages.NoCatchOrFinally);}return node.finishTryStatement(block,handler,finalizer);}// ECMA-262 13.16 The debugger statement
function parseDebuggerStatement(node){expectKeyword('debugger');consumeSemicolon();return node.finishDebuggerStatement();}// 13 Statements
function parseStatement(){var type=lookahead.type,expr,labeledBody,key,node;if(type===Token.EOF){throwUnexpectedToken(lookahead);}if(type===Token.Punctuator&&lookahead.value==='{'){return parseBlock();}isAssignmentTarget=isBindingElement=true;node=new Node();if(type===Token.Punctuator){switch(lookahead.value){case';':return parseEmptyStatement(node);case'(':return parseExpressionStatement(node);default:break;}}else if(type===Token.Keyword){switch(lookahead.value){case'break':return parseBreakStatement(node);case'continue':return parseContinueStatement(node);case'debugger':return parseDebuggerStatement(node);case'do':return parseDoWhileStatement(node);case'for':return parseForStatement(node);case'function':return parseFunctionDeclaration(node);case'if':return parseIfStatement(node);case'return':return parseReturnStatement(node);case'switch':return parseSwitchStatement(node);case'throw':return parseThrowStatement(node);case'try':return parseTryStatement(node);case'var':return parseVariableStatement(node);case'while':return parseWhileStatement(node);case'with':return parseWithStatement(node);default:break;}}expr=parseExpression();// ECMA-262 12.12 Labelled Statements
if(expr.type===Syntax.Identifier&&match(':')){lex();key='$'+expr.name;if(Object.prototype.hasOwnProperty.call(state.labelSet,key)){throwError(Messages.Redeclaration,'Label',expr.name);}state.labelSet[key]=true;labeledBody=parseStatement();delete state.labelSet[key];return node.finishLabeledStatement(expr,labeledBody);}consumeSemicolon();return node.finishExpressionStatement(expr);}// ECMA-262 14.1 Function Definition
function parseFunctionSourceElements(){var statement,body=[],token,directive,firstRestricted,oldLabelSet,oldInIteration,oldInSwitch,oldInFunctionBody,node=new Node();expect('{');while(startIndex<length){if(lookahead.type!==Token.StringLiteral){break;}token=lookahead;statement=parseStatementListItem();body.push(statement);if(statement.expression.type!==Syntax.Literal){// this is not directive
break;}directive=source.slice(token.start+1,token.end-1);if(directive==='use strict'){strict=true;if(firstRestricted){tolerateUnexpectedToken(firstRestricted,Messages.StrictOctalLiteral);}}else{if(!firstRestricted&&token.octal){firstRestricted=token;}}}oldLabelSet=state.labelSet;oldInIteration=state.inIteration;oldInSwitch=state.inSwitch;oldInFunctionBody=state.inFunctionBody;state.labelSet={};state.inIteration=false;state.inSwitch=false;state.inFunctionBody=true;while(startIndex<length){if(match('}')){break;}body.push(parseStatementListItem());}expect('}');state.labelSet=oldLabelSet;state.inIteration=oldInIteration;state.inSwitch=oldInSwitch;state.inFunctionBody=oldInFunctionBody;return node.finishBlockStatement(body);}function validateParam(options,param,name){var key='$'+name;if(strict){if(isRestrictedWord(name)){options.stricted=param;options.message=Messages.StrictParamName;}if(Object.prototype.hasOwnProperty.call(options.paramSet,key)){options.stricted=param;options.message=Messages.StrictParamDupe;}}else if(!options.firstRestricted){if(isRestrictedWord(name)){options.firstRestricted=param;options.message=Messages.StrictParamName;}else if(isStrictModeReservedWord(name)){options.firstRestricted=param;options.message=Messages.StrictReservedWord;}else if(Object.prototype.hasOwnProperty.call(options.paramSet,key)){options.stricted=param;options.message=Messages.StrictParamDupe;}}options.paramSet[key]=true;}function parseParam(options){var token,param,params=[],i,def;token=lookahead;if(token.value==='...'){param=parseRestElement(params);validateParam(options,param.argument,param.argument.name);options.params.push(param);options.defaults.push(null);return false;}param=parsePatternWithDefault(params);for(i=0;i<params.length;i++){validateParam(options,params[i],params[i].value);}if(param.type===Syntax.AssignmentPattern){def=param.right;param=param.left;++options.defaultCount;}options.params.push(param);options.defaults.push(def);return!match(')');}function parseParams(firstRestricted){var options;options={params:[],defaultCount:0,defaults:[],firstRestricted:firstRestricted};expect('(');if(!match(')')){options.paramSet={};while(startIndex<length){if(!parseParam(options)){break;}expect(',');}}expect(')');if(options.defaultCount===0){options.defaults=[];}return{params:options.params,defaults:options.defaults,stricted:options.stricted,firstRestricted:options.firstRestricted,message:options.message};}function parseFunctionDeclaration(node,identifierIsOptional){var id=null,params=[],defaults=[],body,token,stricted,tmp,firstRestricted,message,previousStrict,isGenerator,previousAllowYield;previousAllowYield=state.allowYield;expectKeyword('function');isGenerator=match('*');if(isGenerator){lex();}if(!identifierIsOptional||!match('(')){token=lookahead;id=parseVariableIdentifier();if(strict){if(isRestrictedWord(token.value)){tolerateUnexpectedToken(token,Messages.StrictFunctionName);}}else{if(isRestrictedWord(token.value)){firstRestricted=token;message=Messages.StrictFunctionName;}else if(isStrictModeReservedWord(token.value)){firstRestricted=token;message=Messages.StrictReservedWord;}}}state.allowYield=!isGenerator;tmp=parseParams(firstRestricted);params=tmp.params;defaults=tmp.defaults;stricted=tmp.stricted;firstRestricted=tmp.firstRestricted;if(tmp.message){message=tmp.message;}previousStrict=strict;body=parseFunctionSourceElements();if(strict&&firstRestricted){throwUnexpectedToken(firstRestricted,message);}if(strict&&stricted){tolerateUnexpectedToken(stricted,message);}strict=previousStrict;state.allowYield=previousAllowYield;return node.finishFunctionDeclaration(id,params,defaults,body,isGenerator);}function parseFunctionExpression(){var token,id=null,stricted,firstRestricted,message,tmp,params=[],defaults=[],body,previousStrict,node=new Node(),isGenerator,previousAllowYield;previousAllowYield=state.allowYield;expectKeyword('function');isGenerator=match('*');if(isGenerator){lex();}state.allowYield=!isGenerator;if(!match('(')){token=lookahead;id=!strict&&!isGenerator&&matchKeyword('yield')?parseNonComputedProperty():parseVariableIdentifier();if(strict){if(isRestrictedWord(token.value)){tolerateUnexpectedToken(token,Messages.StrictFunctionName);}}else{if(isRestrictedWord(token.value)){firstRestricted=token;message=Messages.StrictFunctionName;}else if(isStrictModeReservedWord(token.value)){firstRestricted=token;message=Messages.StrictReservedWord;}}}tmp=parseParams(firstRestricted);params=tmp.params;defaults=tmp.defaults;stricted=tmp.stricted;firstRestricted=tmp.firstRestricted;if(tmp.message){message=tmp.message;}previousStrict=strict;body=parseFunctionSourceElements();if(strict&&firstRestricted){throwUnexpectedToken(firstRestricted,message);}if(strict&&stricted){tolerateUnexpectedToken(stricted,message);}strict=previousStrict;state.allowYield=previousAllowYield;return node.finishFunctionExpression(id,params,defaults,body,isGenerator);}// ECMA-262 14.5 Class Definitions
function parseClassBody(){var classBody,token,isStatic,hasConstructor=false,body,method,computed,key;classBody=new Node();expect('{');body=[];while(!match('}')){if(match(';')){lex();}else{method=new Node();token=lookahead;isStatic=false;computed=match('[');if(match('*')){lex();}else{key=parseObjectPropertyKey();if(key.name==='static'&&(lookaheadPropertyName()||match('*'))){token=lookahead;isStatic=true;computed=match('[');if(match('*')){lex();}else{key=parseObjectPropertyKey();}}}method=tryParseMethodDefinition(token,key,computed,method);if(method){method['static']=isStatic;// jscs:ignore requireDotNotation
if(method.kind==='init'){method.kind='method';}if(!isStatic){if(!method.computed&&(method.key.name||method.key.value.toString())==='constructor'){if(method.kind!=='method'||!method.method||method.value.generator){throwUnexpectedToken(token,Messages.ConstructorSpecialMethod);}if(hasConstructor){throwUnexpectedToken(token,Messages.DuplicateConstructor);}else{hasConstructor=true;}method.kind='constructor';}}else{if(!method.computed&&(method.key.name||method.key.value.toString())==='prototype'){throwUnexpectedToken(token,Messages.StaticPrototype);}}method.type=Syntax.MethodDefinition;delete method.method;delete method.shorthand;body.push(method);}else{throwUnexpectedToken(lookahead);}}}lex();return classBody.finishClassBody(body);}function parseClassDeclaration(identifierIsOptional){var id=null,superClass=null,classNode=new Node(),classBody,previousStrict=strict;strict=true;expectKeyword('class');if(!identifierIsOptional||lookahead.type===Token.Identifier){id=parseVariableIdentifier();}if(matchKeyword('extends')){lex();superClass=isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);}classBody=parseClassBody();strict=previousStrict;return classNode.finishClassDeclaration(id,superClass,classBody);}function parseClassExpression(){var id=null,superClass=null,classNode=new Node(),classBody,previousStrict=strict;strict=true;expectKeyword('class');if(lookahead.type===Token.Identifier){id=parseVariableIdentifier();}if(matchKeyword('extends')){lex();superClass=isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);}classBody=parseClassBody();strict=previousStrict;return classNode.finishClassExpression(id,superClass,classBody);}// ECMA-262 15.2 Modules
function parseModuleSpecifier(){var node=new Node();if(lookahead.type!==Token.StringLiteral){throwError(Messages.InvalidModuleSpecifier);}return node.finishLiteral(lex());}// ECMA-262 15.2.3 Exports
function parseExportSpecifier(){var exported,local,node=new Node(),def;if(matchKeyword('default')){// export {default} from 'something';
def=new Node();lex();local=def.finishIdentifier('default');}else{local=parseVariableIdentifier();}if(matchContextualKeyword('as')){lex();exported=parseNonComputedProperty();}return node.finishExportSpecifier(local,exported);}function parseExportNamedDeclaration(node){var declaration=null,isExportFromIdentifier,src=null,specifiers=[];// non-default export
if(lookahead.type===Token.Keyword){// covers:
// export var f = 1;
switch(lookahead.value){case'let':case'const':declaration=parseLexicalDeclaration({inFor:false});return node.finishExportNamedDeclaration(declaration,specifiers,null);case'var':case'class':case'function':declaration=parseStatementListItem();return node.finishExportNamedDeclaration(declaration,specifiers,null);}}expect('{');while(!match('}')){isExportFromIdentifier=isExportFromIdentifier||matchKeyword('default');specifiers.push(parseExportSpecifier());if(!match('}')){expect(',');if(match('}')){break;}}}expect('}');if(matchContextualKeyword('from')){// covering:
// export {default} from 'foo';
// export {foo} from 'foo';
lex();src=parseModuleSpecifier();consumeSemicolon();}else if(isExportFromIdentifier){// covering:
// export {default}; // missing fromClause
throwError(lookahead.value?Messages.UnexpectedToken:Messages.MissingFromClause,lookahead.value);}else{// cover
// export {foo};
consumeSemicolon();}return node.finishExportNamedDeclaration(declaration,specifiers,src);}function parseExportDefaultDeclaration(node){var declaration=null,expression=null;// covers:
// export default ...
expectKeyword('default');if(matchKeyword('function')){// covers:
// export default function foo () {}
// export default function () {}
declaration=parseFunctionDeclaration(new Node(),true);return node.finishExportDefaultDeclaration(declaration);}if(matchKeyword('class')){declaration=parseClassDeclaration(true);return node.finishExportDefaultDeclaration(declaration);}if(matchContextualKeyword('from')){throwError(Messages.UnexpectedToken,lookahead.value);}// covers:
// export default {};
// export default [];
// export default (1 + 2);
if(match('{')){expression=parseObjectInitializer();}else if(match('[')){expression=parseArrayInitializer();}else{expression=parseAssignmentExpression();}consumeSemicolon();return node.finishExportDefaultDeclaration(expression);}function parseExportAllDeclaration(node){var src;// covers:
// export * from 'foo';
expect('*');if(!matchContextualKeyword('from')){throwError(lookahead.value?Messages.UnexpectedToken:Messages.MissingFromClause,lookahead.value);}lex();src=parseModuleSpecifier();consumeSemicolon();return node.finishExportAllDeclaration(src);}function parseExportDeclaration(){var node=new Node();if(state.inFunctionBody){throwError(Messages.IllegalExportDeclaration);}expectKeyword('export');if(matchKeyword('default')){return parseExportDefaultDeclaration(node);}if(match('*')){return parseExportAllDeclaration(node);}return parseExportNamedDeclaration(node);}// ECMA-262 15.2.2 Imports
function parseImportSpecifier(){// import {<foo as bar>} ...;
var local,imported,node=new Node();imported=parseNonComputedProperty();if(matchContextualKeyword('as')){lex();local=parseVariableIdentifier();}return node.finishImportSpecifier(local,imported);}function parseNamedImports(){var specifiers=[];// {foo, bar as bas}
expect('{');while(!match('}')){specifiers.push(parseImportSpecifier());if(!match('}')){expect(',');if(match('}')){break;}}}expect('}');return specifiers;}function parseImportDefaultSpecifier(){// import <foo> ...;
var local,node=new Node();local=parseNonComputedProperty();return node.finishImportDefaultSpecifier(local);}function parseImportNamespaceSpecifier(){// import <* as foo> ...;
var local,node=new Node();expect('*');if(!matchContextualKeyword('as')){throwError(Messages.NoAsAfterImportNamespace);}lex();local=parseNonComputedProperty();return node.finishImportNamespaceSpecifier(local);}function parseImportDeclaration(){var specifiers=[],src,node=new Node();if(state.inFunctionBody){throwError(Messages.IllegalImportDeclaration);}expectKeyword('import');if(lookahead.type===Token.StringLiteral){// import 'foo';
src=parseModuleSpecifier();}else{if(match('{')){// import {bar}
specifiers=specifiers.concat(parseNamedImports());}else if(match('*')){// import * as foo
specifiers.push(parseImportNamespaceSpecifier());}else if(isIdentifierName(lookahead)&&!matchKeyword('default')){// import foo
specifiers.push(parseImportDefaultSpecifier());if(match(',')){lex();if(match('*')){// import foo, * as foo
specifiers.push(parseImportNamespaceSpecifier());}else if(match('{')){// import foo, {bar}
specifiers=specifiers.concat(parseNamedImports());}else{throwUnexpectedToken(lookahead);}}}else{throwUnexpectedToken(lex());}if(!matchContextualKeyword('from')){throwError(lookahead.value?Messages.UnexpectedToken:Messages.MissingFromClause,lookahead.value);}lex();src=parseModuleSpecifier();}consumeSemicolon();return node.finishImportDeclaration(specifiers,src);}// ECMA-262 15.1 Scripts
function parseScriptBody(){var statement,body=[],token,directive,firstRestricted;while(startIndex<length){token=lookahead;if(token.type!==Token.StringLiteral){break;}statement=parseStatementListItem();body.push(statement);if(statement.expression.type!==Syntax.Literal){// this is not directive
break;}directive=source.slice(token.start+1,token.end-1);if(directive==='use strict'){strict=true;if(firstRestricted){tolerateUnexpectedToken(firstRestricted,Messages.StrictOctalLiteral);}}else{if(!firstRestricted&&token.octal){firstRestricted=token;}}}while(startIndex<length){statement=parseStatementListItem();/* istanbul ignore if */if(typeof statement==='undefined'){break;}body.push(statement);}return body;}function parseProgram(){var body,node;peek();node=new Node();body=parseScriptBody();return node.finishProgram(body,state.sourceType);}function filterTokenLocation(){var i,entry,token,tokens=[];for(i=0;i<extra.tokens.length;++i){entry=extra.tokens[i];token={type:entry.type,value:entry.value};if(entry.regex){token.regex={pattern:entry.regex.pattern,flags:entry.regex.flags};}if(extra.range){token.range=entry.range;}if(extra.loc){token.loc=entry.loc;}tokens.push(token);}extra.tokens=tokens;}function tokenize(code,options,delegate){var toString,tokens;toString=String;if(typeof code!=='string'&&!(code instanceof String)){code=toString(code);}source=code;index=0;lineNumber=source.length>0?1:0;lineStart=0;startIndex=index;startLineNumber=lineNumber;startLineStart=lineStart;length=source.length;lookahead=null;state={allowIn:true,allowYield:true,labelSet:{},inFunctionBody:false,inIteration:false,inSwitch:false,lastCommentStart:-1,curlyStack:[]};extra={};// Options matching.
options=options||{};// Of course we collect tokens here.
options.tokens=true;extra.tokens=[];extra.tokenValues=[];extra.tokenize=true;extra.delegate=delegate;// The following two fields are necessary to compute the Regex tokens.
extra.openParenToken=-1;extra.openCurlyToken=-1;extra.range=typeof options.range==='boolean'&&options.range;extra.loc=typeof options.loc==='boolean'&&options.loc;if(typeof options.comment==='boolean'&&options.comment){extra.comments=[];}if(typeof options.tolerant==='boolean'&&options.tolerant){extra.errors=[];}try{peek();if(lookahead.type===Token.EOF){return extra.tokens;}lex();while(lookahead.type!==Token.EOF){try{lex();}catch(lexError){if(extra.errors){recordError(lexError);// We have to break on the first error
// to avoid infinite loops.
break;}else{throw lexError;}}}tokens=extra.tokens;if(typeof extra.errors!=='undefined'){tokens.errors=extra.errors;}}catch(e){throw e;}finally{extra={};}return tokens;}function parse(code,options){var program,toString;toString=String;if(typeof code!=='string'&&!(code instanceof String)){code=toString(code);}source=code;index=0;lineNumber=source.length>0?1:0;lineStart=0;startIndex=index;startLineNumber=lineNumber;startLineStart=lineStart;length=source.length;lookahead=null;state={allowIn:true,allowYield:true,labelSet:{},inFunctionBody:false,inIteration:false,inSwitch:false,lastCommentStart:-1,curlyStack:[],sourceType:'script'};strict=false;extra={};if(typeof options!=='undefined'){extra.range=typeof options.range==='boolean'&&options.range;extra.loc=typeof options.loc==='boolean'&&options.loc;extra.attachComment=typeof options.attachComment==='boolean'&&options.attachComment;if(extra.loc&&options.source!==null&&options.source!==undefined){extra.source=toString(options.source);}if(typeof options.tokens==='boolean'&&options.tokens){extra.tokens=[];}if(typeof options.comment==='boolean'&&options.comment){extra.comments=[];}if(typeof options.tolerant==='boolean'&&options.tolerant){extra.errors=[];}if(extra.attachComment){extra.range=true;extra.comments=[];extra.bottomRightStack=[];extra.trailingComments=[];extra.leadingComments=[];}if(options.sourceType==='module'){// very restrictive condition for now
state.sourceType=options.sourceType;strict=true;}}try{program=parseProgram();if(typeof extra.comments!=='undefined'){program.comments=extra.comments;}if(typeof extra.tokens!=='undefined'){filterTokenLocation();program.tokens=extra.tokens;}if(typeof extra.errors!=='undefined'){program.errors=extra.errors;}}catch(e){throw e;}finally{extra={};}return program;}// Sync with *.json manifests.
exports.version='2.7.2';exports.tokenize=tokenize;exports.parse=parse;// Deep copy.
/* istanbul ignore next */exports.Syntax=function(){var name,types={};if(typeof Object.create==='function'){types=Object.create(null);}for(name in Syntax){if(Syntax.hasOwnProperty(name)){types[name]=Syntax[name];}}if(typeof Object.freeze==='function'){Object.freeze(types);}return types;}();});/* vim: set sw=4 ts=4 et tw=80 : */},{}],12:[function(require,module,exports){},{}],13:[function(require,module,exports){// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util=require('util/');var pSlice=Array.prototype.slice;var hasOwn=Object.prototype.hasOwnProperty;// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.
var assert=module.exports=ok;// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })
assert.AssertionError=function AssertionError(options){this.name='AssertionError';this.actual=options.actual;this.expected=options.expected;this.operator=options.operator;if(options.message){this.message=options.message;this.generatedMessage=false;}else{this.message=getMessage(this);this.generatedMessage=true;}var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace){Error.captureStackTrace(this,stackStartFunction);}else{// non v8 browsers so we can have a stacktrace
var err=new Error();if(err.stack){var out=err.stack;// try to strip useless frames
var fn_name=stackStartFunction.name;var idx=out.indexOf('\n'+fn_name);if(idx>=0){// once we have located the function frame
// we need to strip out everything before it (and its line)
var next_line=out.indexOf('\n',idx+1);out=out.substring(next_line+1);}this.stack=out;}}};// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError,Error);function replacer(key,value){if(util.isUndefined(value)){return''+value;}if(util.isNumber(value)&&!isFinite(value)){return value.toString();}if(util.isFunction(value)||util.isRegExp(value)){return value.toString();}return value;}function truncate(s,n){if(util.isString(s)){return s.length<n?s:s.slice(0,n);}else{return s;}}function getMessage(self){return truncate(JSON.stringify(self.actual,replacer),128)+' '+self.operator+' '+truncate(JSON.stringify(self.expected,replacer),128);}// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.
// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.
function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction});}// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail=fail;// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.
function ok(value,message){if(!value)fail(value,true,message,'==',assert.ok);}assert.ok=ok;// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);
assert.equal=function equal(actual,expected,message){if(actual!=expected)fail(actual,expected,message,'==',assert.equal);};// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);
assert.notEqual=function notEqual(actual,expected,message){if(actual==expected){fail(actual,expected,message,'!=',assert.notEqual);}};// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);
assert.deepEqual=function deepEqual(actual,expected,message){if(!_deepEqual(actual,expected)){fail(actual,expected,message,'deepEqual',assert.deepEqual);}};function _deepEqual(actual,expected){// 7.1. All identical values are equivalent, as determined by ===.
if(actual===expected){return true;}else if(util.isBuffer(actual)&&util.isBuffer(expected)){if(actual.length!=expected.length)return false;for(var i=0;i<actual.length;i++){if(actual[i]!==expected[i])return false;}return true;// 7.2. If the expected value is a Date object, the actual value is
// equivalent if it is also a Date object that refers to the same time.
}else if(util.isDate(actual)&&util.isDate(expected)){return actual.getTime()===expected.getTime();// 7.3 If the expected value is a RegExp object, the actual value is
// equivalent if it is also a RegExp object with the same source and
// properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
}else if(util.isRegExp(actual)&&util.isRegExp(expected)){return actual.source===expected.source&&actual.global===expected.global&&actual.multiline===expected.multiline&&actual.lastIndex===expected.lastIndex&&actual.ignoreCase===expected.ignoreCase;// 7.4. Other pairs that do not both pass typeof value == 'object',
// equivalence is determined by ==.
}else if(!util.isObject(actual)&&!util.isObject(expected)){return actual==expected;// 7.5 For all other Object pairs, including Array objects, equivalence is
// determined by having the same number of owned properties (as verified
// with Object.prototype.hasOwnProperty.call), the same set of keys
// (although not necessarily the same order), equivalent values for every
// corresponding key, and an identical 'prototype' property. Note: this
// accounts for both named and indexed properties on Arrays.
}else{return objEquiv(actual,expected);}}function isArguments(object){return Object.prototype.toString.call(object)=='[object Arguments]';}function objEquiv(a,b){if(util.isNullOrUndefined(a)||util.isNullOrUndefined(b))return false;// an identical 'prototype' property.
if(a.prototype!==b.prototype)return false;// if one is a primitive, the other must be same
if(util.isPrimitive(a)||util.isPrimitive(b)){return a===b;}var aIsArgs=isArguments(a),bIsArgs=isArguments(b);if(aIsArgs&&!bIsArgs||!aIsArgs&&bIsArgs)return false;if(aIsArgs){a=pSlice.call(a);b=pSlice.call(b);return _deepEqual(a,b);}var ka=objectKeys(a),kb=objectKeys(b),key,i;// having the same number of owned properties (keys incorporates
// hasOwnProperty)
if(ka.length!=kb.length)return false;//the same set of keys (although not necessarily the same order),
ka.sort();kb.sort();//~~~cheap key test
for(i=ka.length-1;i>=0;i--){if(ka[i]!=kb[i])return false;}//equivalent values for every corresponding key, and
//~~~possibly expensive deep test
for(i=ka.length-1;i>=0;i--){key=ka[i];if(!_deepEqual(a[key],b[key]))return false;}return true;}// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);
assert.notDeepEqual=function notDeepEqual(actual,expected,message){if(_deepEqual(actual,expected)){fail(actual,expected,message,'notDeepEqual',assert.notDeepEqual);}};// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);
assert.strictEqual=function strictEqual(actual,expected,message){if(actual!==expected){fail(actual,expected,message,'===',assert.strictEqual);}};// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
assert.notStrictEqual=function notStrictEqual(actual,expected,message){if(actual===expected){fail(actual,expected,message,'!==',assert.notStrictEqual);}};function expectedException(actual,expected){if(!actual||!expected){return false;}if(Object.prototype.toString.call(expected)=='[object RegExp]'){return expected.test(actual);}else if(actual instanceof expected){return true;}else if(expected.call({},actual)===true){return true;}return false;}function _throws(shouldThrow,block,expected,message){var actual;if(util.isString(expected)){message=expected;expected=null;}try{block();}catch(e){actual=e;}message=(expected&&expected.name?' ('+expected.name+').':'.')+(message?' '+message:'.');if(shouldThrow&&!actual){fail(actual,expected,'Missing expected exception'+message);}if(!shouldThrow&&expectedException(actual,expected)){fail(actual,expected,'Got unwanted exception'+message);}if(shouldThrow&&actual&&expected&&!expectedException(actual,expected)||!shouldThrow&&actual){throw actual;}}// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);
assert.throws=function(block,/*optional*/error,/*optional*/message){_throws.apply(this,[true].concat(pSlice.call(arguments)));};// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow=function(block,/*optional*/message){_throws.apply(this,[false].concat(pSlice.call(arguments)));};assert.ifError=function(err){if(err){throw err;}};var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){if(hasOwn.call(obj,key))keys.push(key);}return keys;};},{"util/":54}],14:[function(require,module,exports){arguments[4][12][0].apply(exports,arguments);},{"dup":12}],15:[function(require,module,exports){(function(global){/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 *//* eslint-disable no-proto */'use strict';var base64=require('base64-js');var ieee754=require('ieee754');var isArray=require('isarray');exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?global.TYPED_ARRAY_SUPPORT:typedArraySupport();/*
 * Export kMaxLength after typed array support is determined.
 */exports.kMaxLength=kMaxLength();function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function foo(){return 42;}};return arr.foo()===42&&// typed array instances can be augmented
typeof arr.subarray==='function'&&// chrome 9-10 lack `subarray`
arr.subarray(1,1).byteLength===0;// ie10 has broken `subarray`
}catch(e){return false;}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?0x7fffffff:0x3fffffff;}function createBuffer(that,length){if(kMaxLength()<length){throw new RangeError('Invalid typed array length');}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
that=new Uint8Array(length);that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
if(that===null){that=new Buffer(length);}that.length=length;}return that;}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function Buffer(arg,encodingOrOffset,length){if(!Buffer.TYPED_ARRAY_SUPPORT&&!(this instanceof Buffer)){return new Buffer(arg,encodingOrOffset,length);}// Common case.
if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new Error('If encoding is specified then the first argument must be a string');}return allocUnsafe(this,arg);}return from(this,arg,encodingOrOffset,length);}Buffer.poolSize=8192;// not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment=function(arr){arr.__proto__=Buffer.prototype;return arr;};function from(that,value,encodingOrOffset,length){if(typeof value==='number'){throw new TypeError('"value" argument must not be a number');}if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){return fromArrayBuffer(that,value,encodingOrOffset,length);}if(typeof value==='string'){return fromString(that,value,encodingOrOffset);}return fromObject(that,value);}/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/Buffer.from=function(value,encodingOrOffset,length){return from(null,value,encodingOrOffset,length);};if(Buffer.TYPED_ARRAY_SUPPORT){Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;if(typeof Symbol!=='undefined'&&Symbol.species&&Buffer[Symbol.species]===Buffer){// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true});}}function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be a number');}}function alloc(that,size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(that,size);}if(fill!==undefined){// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding==='string'?createBuffer(that,size).fill(fill,encoding):createBuffer(that,size).fill(fill);}return createBuffer(that,size);}/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/Buffer.alloc=function(size,fill,encoding){return alloc(null,size,fill,encoding);};function allocUnsafe(that,size){assertSize(size);that=createBuffer(that,size<0?0:checked(size)|0);if(!Buffer.TYPED_ARRAY_SUPPORT){for(var i=0;i<size;++i){that[i]=0;}}return that;}/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */Buffer.allocUnsafe=function(size){return allocUnsafe(null,size);};/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */Buffer.allocUnsafeSlow=function(size){return allocUnsafe(null,size);};function fromString(that,string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8';}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding');}var length=byteLength(string,encoding)|0;that=createBuffer(that,length);var actual=that.write(string,encoding);if(actual!==length){// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
that=that.slice(0,actual);}return that;}function fromArrayLike(that,array){var length=checked(array.length)|0;that=createBuffer(that,length);for(var i=0;i<length;i+=1){that[i]=array[i]&255;}return that;}function fromArrayBuffer(that,array,byteOffset,length){array.byteLength;// this throws if `array` is not a valid ArrayBuffer
if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('\'offset\' is out of bounds');}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('\'length\' is out of bounds');}if(byteOffset===undefined&&length===undefined){array=new Uint8Array(array);}else if(length===undefined){array=new Uint8Array(array,byteOffset);}else{array=new Uint8Array(array,byteOffset,length);}if(Buffer.TYPED_ARRAY_SUPPORT){// Return an augmented `Uint8Array` instance, for best performance
that=array;that.__proto__=Buffer.prototype;}else{// Fallback: Return an object instance of the Buffer class
that=fromArrayLike(that,array);}return that;}function fromObject(that,obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;that=createBuffer(that,len);if(that.length===0){return that;}obj.copy(that,0,0,len);return that;}if(obj){if(typeof ArrayBuffer!=='undefined'&&obj.buffer instanceof ArrayBuffer||'length'in obj){if(typeof obj.length!=='number'||isnan(obj.length)){return createBuffer(that,0);}return fromArrayLike(that,obj);}if(obj.type==='Buffer'&&isArray(obj.data)){return fromArrayLike(that,obj.data);}}throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');}function checked(length){// Note: cannot use `length < kMaxLength` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(length>=kMaxLength()){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+kMaxLength().toString(16)+' bytes');}return length|0;}function SlowBuffer(length){if(+length!=length){// eslint-disable-line eqeqeq
length=0;}return Buffer.alloc(+length);}Buffer.isBuffer=function isBuffer(b){return!!(b!=null&&b._isBuffer);};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('Arguments must be Buffers');}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'latin1':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return true;default:return false;}};Buffer.concat=function concat(list,length){if(!isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers');}if(list.length===0){return Buffer.alloc(0);}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer,pos);pos+=buf.length;}return buffer;};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length;}if(typeof ArrayBuffer!=='undefined'&&typeof ArrayBuffer.isView==='function'&&(ArrayBuffer.isView(string)||string instanceof ArrayBuffer)){return string.byteLength;}if(typeof string!=='string'){string=''+string;}var len=string.length;if(len===0)return 0;// Use a for loop to avoid recursion
var loweredCase=false;for(;;){switch(encoding){case'ascii':case'latin1':case'binary':return len;case'utf8':case'utf-8':case undefined:return utf8ToBytes(string).length;case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return len*2;case'hex':return len>>>1;case'base64':return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;// assume utf8
encoding=(''+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if(start===undefined||start<0){start=0;}// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if(start>this.length){return'';}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return'';}// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end>>>=0;start>>>=0;if(end<=start){return'';}if(!encoding)encoding='utf8';while(true){switch(encoding){case'hex':return hexSlice(this,start,end);case'utf8':case'utf-8':return utf8Slice(this,start,end);case'ascii':return asciiSlice(this,start,end);case'latin1':case'binary':return latin1Slice(this,start,end);case'base64':return base64Slice(this,start,end);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(encoding+'').toLowerCase();loweredCase=true;}}}// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits');}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this;};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits');}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this;};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits');}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this;};Buffer.prototype.toString=function toString(){var length=this.length|0;if(length===0)return'';if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments);};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');if(this===b)return true;return Buffer.compare(this,b)===0;};Buffer.prototype.inspect=function inspect(){var str='';var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString('hex',0,max).match(/.{2}/g).join(' ');if(this.length>max)str+=' ... ';}return'<Buffer '+str+'>';};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError('Argument must be a Buffer');}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index');}if(thisStart>=thisEnd&&start>=end){return 0;}if(thisStart>=thisEnd){return-1;}if(start>=end){return 1;}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){// Empty buffer means no match
if(buffer.length===0)return-1;// Normalize byteOffset
if(typeof byteOffset==='string'){encoding=byteOffset;byteOffset=0;}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff;}else if(byteOffset<-0x80000000){byteOffset=-0x80000000;}byteOffset=+byteOffset;// Coerce to Number.
if(isNaN(byteOffset)){// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
byteOffset=dir?0:buffer.length-1;}// Normalize byteOffset: negative offsets start from the end of the buffer
if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return-1;}// Normalize val
if(typeof val==='string'){val=Buffer.from(val,encoding);}// Finally, search either indexOf (if dir is true) or lastIndexOf
if(Buffer.isBuffer(val)){// Special case: looking for empty string/buffer always fails
if(val.length===0){return-1;}return arrayIndexOf(buffer,val,byteOffset,encoding,dir);}else if(typeof val==='number'){val=val&0xFF;// Search for a byte value [0-255]
if(Buffer.TYPED_ARRAY_SUPPORT&&typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);}throw new TypeError('val must be string, number or Buffer');}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1;}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i];}else{return buf.readUInt16BE(i*indexSize);}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize;}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break;}}if(found)return i;}}return-1;}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1;};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true);};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false);};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else{length=Number(length);if(length>remaining){length=remaining;}}// must be an even number of digits
var strLen=string.length;if(strLen%2!==0)throw new TypeError('Invalid hex string');if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(isNaN(parsed))return i;buf[offset+i]=parsed;}return i;}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length);}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length);}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length);}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);}Buffer.prototype.write=function write(string,offset,length,encoding){// Buffer#write(string)
if(offset===undefined){encoding='utf8';length=this.length;offset=0;// Buffer#write(string, encoding)
}else if(length===undefined&&typeof offset==='string'){encoding=offset;length=this.length;offset=0;// Buffer#write(string, offset[, length][, encoding])
}else if(isFinite(offset)){offset=offset|0;if(isFinite(length)){length=length|0;if(encoding===undefined)encoding='utf8';}else{encoding=length;length=undefined;}// legacy write(string, encoding, offset, length) - remove in v0.13
}else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds');}if(!encoding)encoding='utf8';var loweredCase=false;for(;;){switch(encoding){case'hex':return hexWrite(this,string,offset,length);case'utf8':case'utf-8':return utf8Write(this,string,offset,length);case'ascii':return asciiWrite(this,string,offset,length);case'latin1':case'binary':return latin1Write(this,string,offset,length);case'base64':// Warning: maxLength not taken into account in base64Write
return base64Write(this,string,offset,length);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(''+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)};};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf);}else{return base64.fromByteArray(buf.slice(start,end));}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>0xEF?4:firstByte>0xDF?3:firstByte>0xBF?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;if(tempCodePoint>0x7F){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint;}}}}if(codePoint===null){// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint=0xFFFD;bytesPerSequence=1;}else if(codePoint>0xFFFF){// encode to utf16 (surrogate pair dance)
codePoint-=0x10000;res.push(codePoint>>>10&0x3FF|0xD800);codePoint=0xDC00|codePoint&0x3FF;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res);}// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH=0x1000;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints);// avoid extra slice()
}// Decode in chunks to avoid "call stack size exceeded".
var res='';var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F);}return ret;}function latin1Slice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out='';for(var i=start;i<end;++i){out+=toHex(buf[i]);}return out;}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res='';for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res;}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT){newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;}else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,undefined);for(var i=0;i<sliceLen;++i){newBuf[i]=this[i+start];}}return newBuf;};/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}return val;};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=0x100)){val+=this[offset+--byteLength]*mul;}return val;};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);return this[offset];};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8;};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1];};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*0x1000000;};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*0x1000000+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3]);};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset|0;byteLength=byteLength|0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=0x100)){val+=this[offset+--i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readInt8=function readInt8(offset,noAssert){if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&0x80))return this[offset];return(0xff-this[offset]+1)*-1;};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24;};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3];};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4);};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4);};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8);};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8);};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError('Index out of range');}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;byteLength=byteLength|0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0xff,0);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);this[offset]=value&0xff;return offset+1;};function objectWriteUInt16(buf,value,offset,littleEndian){if(value<0)value=0xffff+value+1;for(var i=0,j=Math.min(buf.length-offset,2);i<j;++i){buf[offset+i]=(value&0xff<<8*(littleEndian?i:1-i))>>>(littleEndian?i:1-i)*8;}}Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};function objectWriteUInt32(buf,value,offset,littleEndian){if(value<0)value=0xffffffff+value+1;for(var i=0,j=Math.min(buf.length-offset,4);i<j;++i){buf[offset+i]=value>>>(littleEndian?i:3-i)*8&0xff;}}Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&0xff;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset|0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);if(value<0)value=0xff+value+1;this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;}else{objectWriteUInt16(this,value,offset,true);}return offset+2;};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>8;this[offset+1]=value&0xff;}else{objectWriteUInt16(this,value,offset,false);}return offset+2;};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value&0xff;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;}else{objectWriteUInt32(this,value,offset,true);}return offset+4;};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset|0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(value<0)value=0xffffffff+value+1;if(Buffer.TYPED_ARRAY_SUPPORT){this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;}else{objectWriteUInt32(this,value,offset,false);}return offset+4;};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range');if(offset<0)throw new RangeError('Index out of range');}function writeFloat(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4;}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert);};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert);};function writeDouble(buf,value,offset,littleEndian,noAssert){if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8;}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert);};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert);};// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;// Copy 0 bytes; we're done
if(end===start)return 0;if(target.length===0||this.length===0)return 0;// Fatal error conditions
if(targetStart<0){throw new RangeError('targetStart out of bounds');}if(start<0||start>=this.length)throw new RangeError('sourceStart out of bounds');if(end<0)throw new RangeError('sourceEnd out of bounds');// Are we oob?
if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){// descending copy from end
for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else if(len<1000||!Buffer.TYPED_ARRAY_SUPPORT){// ascending copy from start
for(i=0;i<len;++i){target[i+targetStart]=this[i+start];}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart);}return len;};// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill=function fill(val,start,end,encoding){// Handle string cases:
if(typeof val==='string'){if(typeof start==='string'){encoding=start;start=0;end=this.length;}else if(typeof end==='string'){encoding=end;end=this.length;}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code;}}if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string');}if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}}else if(typeof val==='number'){val=val&255;}// Invalid ranges are not set to a default, so can range check early.
if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index');}if(end<=start){return this;}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val;}}else{var bytes=Buffer.isBuffer(val)?val:utf8ToBytes(new Buffer(val,encoding).toString());var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this;};// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(str){// Node strips out invalid characters like \n and \t from the string, base64-js does not
str=stringtrim(str).replace(INVALID_BASE64_RE,'');// Node converts strings with length < 2 to ''
if(str.length<2)return'';// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
while(str.length%4!==0){str=str+'=';}return str;}function stringtrim(str){if(str.trim)return str.trim();return str.replace(/^\s+|\s+$/g,'');}function toHex(n){if(n<16)return'0'+n.toString(16);return n.toString(16);}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);// is surrogate component
if(codePoint>0xD7FF&&codePoint<0xE000){// last char was a lead
if(!leadSurrogate){// no lead yet
if(codePoint>0xDBFF){// unexpected trail
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}else if(i+1===length){// unpaired lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}// valid lead
leadSurrogate=codePoint;continue;}// 2 leads in a row
if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);leadSurrogate=codePoint;continue;}// valid surrogate pair
codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;}else if(leadSurrogate){// valid bmp char, but last char was a lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);}leadSurrogate=null;// encode utf8
if(codePoint<0x80){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<0x800){if((units-=2)<0)break;bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80);}else if(codePoint<0x10000){if((units-=3)<0)break;bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else if(codePoint<0x110000){if((units-=4)<0)break;bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else{throw new Error('Invalid code point');}}return bytes;}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i)&0xFF);}return byteArray;}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str){return base64.toByteArray(base64clean(str));}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i;}function isnan(val){return val!==val;// eslint-disable-line no-self-compare
}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"base64-js":16,"ieee754":17,"isarray":18}],16:[function(require,module,exports){'use strict';exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;function init(){var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}revLookup['-'.charCodeAt(0)]=62;revLookup['_'.charCodeAt(0)]=63;}init();function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4');}// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
placeHolders=b64[len-2]==='='?2:b64[len-1]==='='?1:0;// base64 is 4/3 + up to two characters of the original data
arr=new Arr(len*3/4-placeHolders);// if there are placeholders, only get up to the last complete 4 chars
l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&0xFF;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&0xFF;}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&0xFF;arr[L++]=tmp&0xFF;}return arr;}function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp));}return output.join('');}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;// if we have 1 byte left, pad 2 bytes
var output='';var parts=[];var maxChunkLength=16383;// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}// pad the end with zeros, but make sure to not forget the extra bytes
if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&0x3F];output+='==';}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&0x3F];output+=lookup[tmp<<2&0x3F];output+='=';}parts.push(output);return parts.join('');}},{}],17:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity;}else{m=m+Math.pow(2,mLen);e=e-eBias;}return(s?-1:1)*m*Math.pow(2,e-mLen);};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else{value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};},{}],18:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]';};},{}],19:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined;}module.exports=EventEmitter;// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners=10;// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError('n must be a positive number');this._maxListeners=n;return this;};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};// If there is no 'error' event listener then throw.
if(type==='error'){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er;// Unhandled 'error' event
}else{// At least give some kind of context to the user
var err=new Error('Uncaught, unspecified "error" event. ('+er+')');err.context=er;throw err;}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){// fast cases
case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;// slower
default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args);}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++){listeners[i].apply(this,args);}}return true;};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events)this._events={};// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
if(this._events.newListener)this.emit('newListener',type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])// Optimize the case of one listener. Don't need the extra array object.
this._events[type]=listener;else if(isObject(this._events[type]))// If we've already got an array, just append.
this._events[type].push(listener);else// Adding the second element, need to change to array.
this._events[type]=[this._events[type],listener];// Check for listener leak
if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners;}else{m=EventEmitter.defaultMaxListeners;}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error('(node) warning: possible EventEmitter memory '+'leak detected. %d listeners added. '+'Use emitter.setMaxListeners() to increase limit.',this._events[type].length);if(typeof console.trace==='function'){// not supported in IE 10
console.trace();}}}return this;};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError('listener must be a function');var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments);}}g.listener=listener;this.on(type,g);return this;};// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError('listener must be a function');if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit('removeListener',type,listener);}else if(isObject(list)){for(i=length;i-->0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break;}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type];}else{list.splice(position,1);}if(this._events.removeListener)this.emit('removeListener',type,listener);}return this;};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;// not listening for removeListener, no need to emit
if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this;}// emit removeListener for all listeners on all events
if(arguments.length===0){for(key in this._events){if(key==='removeListener')continue;this.removeAllListeners(key);}this.removeAllListeners('removeListener');this._events={};return this;}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners);}else if(listeners){// LIFO order
while(listeners.length){this.removeListener(type,listeners[listeners.length-1]);}}delete this._events[type];return this;};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret;};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length;}return 0;};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type);};function isFunction(arg){return typeof arg==='function';}function isNumber(arg){return typeof arg==='number';}function isObject(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&arg!==null;}function isUndefined(arg){return arg===void 0;}},{}],20:[function(require,module,exports){if(typeof Object.create==='function'){// implementation from standard node.js 'util' module
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});};}else{// old school shim for old browsers
module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;};}},{}],21:[function(require,module,exports){/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports=function(obj){return obj!=null&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer);};function isBuffer(obj){return!!obj.constructor&&typeof obj.constructor.isBuffer==='function'&&obj.constructor.isBuffer(obj);}// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj){return typeof obj.readFloatLE==='function'&&typeof obj.slice==='function'&&isBuffer(obj.slice(0,0));}},{}],22:[function(require,module,exports){(function(process){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts,allowAboveRoot){// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}return parts;}// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function splitPath(filename){return splitPathRe.exec(filename).slice(1);};// path.resolve([from ...], to)
// posix version
exports.resolve=function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();// Skip empty and invalid entries
if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';}// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)
// Normalize the path
resolvedPath=normalizeArray(filter(resolvedPath.split('/'),function(p){return!!p;}),!resolvedAbsolute).join('/');return(resolvedAbsolute?'/':'')+resolvedPath||'.';};// path.normalize(path)
// posix version
exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==='/';// Normalize the path
path=normalizeArray(filter(path.split('/'),function(p){return!!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}if(path&&trailingSlash){path+='/';}return(isAbsolute?'/':'')+path;};// posix version
exports.isAbsolute=function(path){return path.charAt(0)==='/';};// posix version
exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}return p;}).join('/'));};// path.relative(from, to)
// posix version
exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}if(start>end)return[];return arr.slice(start,end-start+1);}var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');};exports.sep='/';exports.delimiter=':';exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){// No dirname whatsoever
return'.';}if(dir){// It has a dirname, strip trailing slash
dir=dir.substr(0,dir.length-1);}return root+dir;};exports.basename=function(path,ext){var f=splitPath(path)[2];// TODO: make this comparison case-insensitive on windows?
if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}return f;};exports.extname=function(path){return splitPath(path)[3];};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i]);}return res;}// String.prototype.substr - negative index don't work in IE8
var substr='ab'.substr(-1)==='b'?function(str,start,len){return str.substr(start,len);}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len);};}).call(this,require('_process'));},{"_process":23}],23:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;(function(){try{cachedSetTimeout=setTimeout;}catch(e){cachedSetTimeout=function cachedSetTimeout(){throw new Error('setTimeout is not defined');};}try{cachedClearTimeout=clearTimeout;}catch(e){cachedClearTimeout=function cachedClearTimeout(){throw new Error('clearTimeout is not defined');};}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],24:[function(require,module,exports){(function(global){/*! https://mths.be/punycode v1.4.1 by @mathias */;(function(root){/** Detect free variables */var freeExports=(typeof exports==="undefined"?"undefined":_typeof(exports))=='object'&&exports&&!exports.nodeType&&exports;var freeModule=(typeof module==="undefined"?"undefined":_typeof(module))=='object'&&module&&!module.nodeType&&module;var freeGlobal=(typeof global==="undefined"?"undefined":_typeof(global))=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal;}/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var punycode,/** Highest positive signed 32-bit float value */maxInt=2147483647,// aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,// 0x80
delimiter='-',// '\x2D'
/** Regular expressions */regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,// unprintable ASCII chars + non-ASCII chars
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,// RFC 3490 separators
/** Error messages */errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},/** Convenience shortcuts */baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,/** Temporary variable */key;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function error(type){throw new RangeError(errors[type]);}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}return result;}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
result=parts[0]+'@';string=parts[1];}// Avoid `split(regex)` for IE8 compatibility. See #17.
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);return output;}).join('');}/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}if(codePoint-65<26){return codePoint-65;}if(codePoint-97<26){return codePoint-97;}return base;}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function digitToBasic(digit,flag){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return digit+22+75*(digit<26)-((flag!=0)<<5);}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;/* no initialization */delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function decode(input){// Don't use UCS-2
var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,/** Cached calculation results */baseMinusT;// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}for(j=0;j<basic;++j){// if it's not a basic code point
if(input.charCodeAt(j)>=0x80){error('not-basic');}output.push(input.charCodeAt(j));}// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(index=basic>0?basic+1:0;index<inputLength;)/* no final expression */{// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(oldi=i,w=1,k=base;;/* no condition */k+=base){if(index>=inputLength){error('invalid-input');}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break;}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}w*=baseMinusT;}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
if(floor(i/out)>maxInt-n){error('overflow');}n+=floor(i/out);i%=out;// Insert `n` at position `i` of the output
output.splice(i++,0,n);}return ucs2encode(output);}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],/** `inputLength` will hold the number of code points in `input`. */inputLength,/** Cached calculation results */handledCPCountPlusOne,baseMinusT,qMinusT;// Convert the input in UCS-2 to Unicode
input=ucs2decode(input);// Cache the length
inputLength=input.length;// Initialize the state
n=initialN;delta=0;bias=initialBias;// Handle the basic code points
for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}handledCPCount=basicLength=output.length;// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.
// Finish the basic string - if it is not empty - with a delimiter
if(basicLength){output.push(delimiter);}// Main encoding loop:
while(handledCPCount<inputLength){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}if(currentValue==n){// Represent delta as a generalized variable-length integer
for(q=delta,k=base;;/* no condition */k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break;}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}++delta;++n;}return output.join('');}/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}/*--------------------------------------------------------------------------*//** Define the public API */punycode={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */'version':'1.4.1',/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */'ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};/** Expose `punycode` */// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(typeof define=='function'&&_typeof(define.amd)=='object'&&define.amd){define('punycode',function(){return punycode;});}else if(freeExports&&freeModule){if(module.exports==freeExports){// in Node.js, io.js, or RingoJS v0.8.0+
freeModule.exports=punycode;}else{// in Narwhal or RingoJS v0.7.0-
for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{// in Rhino or a web browser
root.punycode=punycode;}})(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],25:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}var len=qs.length;// maxKeys <= 0 means that we should not limit keys count
if(maxKeys>0&&len>maxKeys){len=maxKeys;}for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};},{}],26:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';var stringifyPrimitive=function stringifyPrimitive(v){switch(typeof v==="undefined"?"undefined":_typeof(v)){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}if((typeof obj==="undefined"?"undefined":_typeof(obj))==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}return res;}var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}return res;};},{}],27:[function(require,module,exports){'use strict';exports.decode=exports.parse=require('./decode');exports.encode=exports.stringify=require('./encode');},{"./decode":25,"./encode":26}],28:[function(require,module,exports){module.exports=require("./lib/_stream_duplex.js");},{"./lib/_stream_duplex.js":29}],29:[function(require,module,exports){// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';/*<replacement>*/var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){keys.push(key);}return keys;};/*</replacement>*/module.exports=Duplex;/*<replacement>*/var processNextTick=require('process-nextick-args');/*</replacement>*//*<replacement>*/var util=require('core-util-is');util.inherits=require('inherits');/*</replacement>*/var Readable=require('./_stream_readable');var Writable=require('./_stream_writable');util.inherits(Duplex,Readable);var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===false)this.readable=false;if(options&&options.writable===false)this.writable=false;this.allowHalfOpen=true;if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;this.once('end',onend);}// the no-half-open enforcer
function onend(){// if we allow half-open state, or if the writable side ended,
// then we're ok.
if(this.allowHalfOpen||this._writableState.ended)return;// no more data can be written.
// But allow more writes to happen in this tick.
processNextTick(onEndNT,this);}function onEndNT(self){self.end();}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i);}}},{"./_stream_readable":31,"./_stream_writable":33,"core-util-is":35,"inherits":20,"process-nextick-args":37}],30:[function(require,module,exports){// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';module.exports=PassThrough;var Transform=require('./_stream_transform');/*<replacement>*/var util=require('core-util-is');util.inherits=require('inherits');/*</replacement>*/util.inherits(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};},{"./_stream_transform":32,"core-util-is":35,"inherits":20}],31:[function(require,module,exports){(function(process){'use strict';module.exports=Readable;/*<replacement>*/var processNextTick=require('process-nextick-args');/*</replacement>*//*<replacement>*/var isArray=require('isarray');/*</replacement>*/Readable.ReadableState=ReadableState;/*<replacement>*/var EE=require('events').EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length;};/*</replacement>*//*<replacement>*/var Stream;(function(){try{Stream=require('st'+'ream');}catch(_){}finally{if(!Stream)Stream=require('events').EventEmitter;}})();/*</replacement>*/var Buffer=require('buffer').Buffer;/*<replacement>*/var bufferShim=require('buffer-shims');/*</replacement>*//*<replacement>*/var util=require('core-util-is');util.inherits=require('inherits');/*</replacement>*//*<replacement>*/var debugUtil=require('util');var debug=void 0;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream');}else{debug=function debug(){};}/*</replacement>*/var StringDecoder;util.inherits(Readable,Stream);var hasPrependListener=typeof EE.prototype.prependListener==='function';function prependListener(emitter,event,fn){if(hasPrependListener)return emitter.prependListener(event,fn);// This is a brutally ugly hack to make sure that our error handler
// is attached before any userland ones.  NEVER DO THIS. This is here
// only because this code needs to continue to work with older versions
// of Node.js that do not include the prependListener() method. The goal
// is to eventually remove this hack.
if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}var Duplex;function ReadableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;// cast to ints.
this.highWaterMark=~~this.highWaterMark;this.buffer=[];this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// when piping, we only care about 'readable' events that happen
// after read()ing all the bytes and not getting any pushback.
this.ranOut=false;// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain=0;// if true, a maybeReadMore has been scheduled
this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}var Duplex;function Readable(options){Duplex=Duplex||require('./_stream_duplex');if(!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this);// legacy
this.readable=true;if(options&&typeof options.read==='function')this._read=options.read;Stream.call(this);}// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push=function(chunk,encoding){var state=this._readableState;if(!state.objectMode&&typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=bufferShim.from(chunk,encoding);encoding='';}}return readableAddChunk(this,state,chunk,encoding,false);};// Unshift should *always* be something directly out of read()
Readable.prototype.unshift=function(chunk){var state=this._readableState;return readableAddChunk(this,state,chunk,'',true);};Readable.prototype.isPaused=function(){return this._readableState.flowing===false;};function readableAddChunk(stream,state,chunk,encoding,addToFront){var er=chunkInvalid(state,chunk);if(er){stream.emit('error',er);}else if(chunk===null){state.reading=false;onEofChunk(stream,state);}else if(state.objectMode||chunk&&chunk.length>0){if(state.ended&&!addToFront){var e=new Error('stream.push() after EOF');stream.emit('error',e);}else if(state.endEmitted&&addToFront){var _e=new Error('stream.unshift() after end event');stream.emit('error',_e);}else{var skipAdd;if(state.decoder&&!addToFront&&!encoding){chunk=state.decoder.write(chunk);skipAdd=!state.objectMode&&chunk.length===0;}if(!addToFront)state.reading=false;// Don't add to the buffer if we've decoded to an empty string chunk and
// we're not in object mode
if(!skipAdd){// if we want the data now, just emit it.
if(state.flowing&&state.length===0&&!state.sync){stream.emit('data',chunk);stream.read(0);}else{// update the buffer info.
state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}}maybeReadMore(stream,state);}}else if(!addToFront){state.reading=false;}return needMoreData(state);}// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0);}// backwards compatibility.
Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this;};// Don't raise the hwm > 8MB
var MAX_HWM=0x800000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM;}else{// Get the next highest power of 2
n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n;}function howMuchToRead(n,state){if(state.length===0&&state.ended)return 0;if(state.objectMode)return n===0?0:1;if(n===null||isNaN(n)){// only flow one buffer at a time
if(state.flowing&&state.buffer.length)return state.buffer[0].length;else return state.length;}if(n<=0)return 0;// If we're asking for more than the target buffer level,
// then raise the water mark.  Bump up to the next highest
// power of 2, to prevent increasing it excessively in tiny
// amounts.
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);// don't have that much.  return null, unless we've ended.
if(n>state.length){if(!state.ended){state.needReadable=true;return 0;}else{return state.length;}}return n;}// you can override either this method, or the async _read(n) below.
Readable.prototype.read=function(n){debug('read',n);var state=this._readableState;var nOrig=n;if(typeof n!=='number'||n>0)state.emittedReadable=false;// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null;}n=howMuchToRead(n,state);// if we've ended, and we're now clear, then finish it up.
if(n===0&&state.ended){if(state.length===0)endReadable(this);return null;}// All the actual chunk generation logic needs to be
// *below* the call to _read.  The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.
// Note that this may be asynchronous, or synchronous.  Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead=state.needReadable;debug('need readable',doRead);// if we currently have less than the highWaterMark, then also read some
if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug('length less than watermark',doRead);}// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if(state.ended||state.reading){doRead=false;debug('reading or ended',doRead);}if(doRead){debug('do read');state.reading=true;state.sync=true;// if the length is currently zero, then we *need* a readable event.
if(state.length===0)state.needReadable=true;// call internal read method
this._read(state.highWaterMark);state.sync=false;}// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if(doRead&&!state.reading)n=howMuchToRead(nOrig,state);var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=true;n=0;}state.length-=n;// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if(state.length===0&&!state.ended)state.needReadable=true;// If we tried to read() past the EOF, then emit end on the next tick.
if(nOrig!==n&&state.ended&&state.length===0)endReadable(this);if(ret!==null)this.emit('data',ret);return ret;};function chunkInvalid(state,chunk){var er=null;if(!Buffer.isBuffer(chunk)&&typeof chunk!=='string'&&chunk!==null&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}return er;}function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;// emit 'readable' now to make sure it gets picked up.
emitReadable(stream);}// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream){var state=stream._readableState;state.needReadable=false;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=true;if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream);}}function emitReadable_(stream){debug('emit readable');stream.emit('readable');flow(stream);}// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;processNextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug('maybeReadMore read 0');stream.read(0);if(len===state.length)// didn't get any data, stop spinning.
break;else len=state.length;}state.readingMore=false;}// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read=function(n){this.emit('error',new Error('not implemented'));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break;}state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:cleanup;if(state.endEmitted)processNextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable){debug('onunpipe');if(readable===src){cleanup();}}function onend(){debug('onend');dest.end();}// when the dest drains, it reduces the awaitDrain counter
// on the source.  This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=false;function cleanup(){debug('cleanup');// cleanup event handlers once the pipe is broken
dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',cleanup);src.removeListener('data',ondata);cleanedUp=true;// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}src.on('data',ondata);function ondata(chunk){debug('ondata');var ret=dest.write(chunk);if(false===ret){// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',src._readableState.awaitDrain);src._readableState.awaitDrain++;}src.pause();}}// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)dest.emit('error',er);}// Make sure our error handler is attached before userland ones.
prependListener(dest,'error',onerror);// Both close and finish should trigger unpipe, but only once.
function onclose(){dest.removeListener('finish',onfinish);unpipe();}dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe();}dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest);}// tell the dest that it's being piped to
dest.emit('pipe',src);// start the flow if it hasn't been started already.
if(!state.flowing){debug('pipe resume');src.resume();}return dest;};function pipeOnDrain(src){return function(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=true;flow(src);}};}Readable.prototype.unpipe=function(dest){var state=this._readableState;// if we're not piping anywhere, then do nothing.
if(state.pipesCount===0)return this;// just one destination.  most common case.
if(state.pipesCount===1){// passed in one, but it's not the right one.
if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;// got a match.
state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit('unpipe',this);return this;}// slow case. multiple pipe destinations.
if(!dest){// remove all.
var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var _i=0;_i<len;_i++){dests[_i].emit('unpipe',this);}return this;}// try to find the right one.
var i=indexOf(state.pipes,dest);if(i===-1)return this;state.pipes.splice(i,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this);return this;};// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);// If listening to data, and it has not explicitly been paused,
// then call resume to start the flow of data on the next tick.
if(ev==='data'&&false!==this._readableState.flowing){this.resume();}if(ev==='readable'&&!this._readableState.endEmitted){var state=this._readableState;if(!state.readableListening){state.readableListening=true;state.emittedReadable=false;state.needReadable=true;if(!state.reading){processNextTick(nReadingNextTick,this);}else if(state.length){emitReadable(this,state);}}}return res;};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0);}// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');state.flowing=true;resume(this,state);}return this;};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;processNextTick(resume_,stream,state);}}function resume_(stream,state){if(!state.reading){debug('resume read 0');stream.read(0);}state.resumeScheduled=false;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(false!==this._readableState.flowing){debug('pause');this._readableState.flowing=false;this.emit('pause');}return this;};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);if(state.flowing){do{var chunk=stream.read();}while(null!==chunk&&state.flowing);}}// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap=function(stream){var state=this._readableState;var paused=false;var self=this;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)self.push(chunk);}self.push(null);});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);// don't skip over falsy values in objectMode
if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=self.push(chunk);if(!ret){paused=true;stream.pause();}});// proxy all the other methods.
// important when wrapping filters and duplexes.
for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function(method){return function(){return stream[method].apply(stream,arguments);};}(i);}}// proxy certain important events.
var events=['error','close','destroy','pause','resume'];forEach(events,function(ev){stream.on(ev,self.emit.bind(self,ev));});// when we try to consume some more bytes, simply unpause the
// underlying stream.
self._read=function(n){debug('wrapped _read',n);if(paused){paused=false;stream.resume();}};return self;};// exposed for testing purposes only.
Readable._fromList=fromList;// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n,state){var list=state.buffer;var length=state.length;var stringMode=!!state.decoder;var objectMode=!!state.objectMode;var ret;// nothing in the list, definitely empty.
if(list.length===0)return null;if(length===0)ret=null;else if(objectMode)ret=list.shift();else if(!n||n>=length){// read it all, truncate the array.
if(stringMode)ret=list.join('');else if(list.length===1)ret=list[0];else ret=Buffer.concat(list,length);list.length=0;}else{// read just some of it.
if(n<list[0].length){// just take a part of the first list item.
// slice is the same for buffers and strings.
var buf=list[0];ret=buf.slice(0,n);list[0]=buf.slice(n);}else if(n===list[0].length){// first list is a perfect match
ret=list.shift();}else{// complex case.
// we have enough to cover it, but it spans past the first buffer.
if(stringMode)ret='';else ret=bufferShim.allocUnsafe(n);var c=0;for(var i=0,l=list.length;i<l&&c<n;i++){var _buf=list[0];var cpy=Math.min(n-c,_buf.length);if(stringMode)ret+=_buf.slice(0,cpy);else _buf.copy(ret,c,0,cpy);if(cpy<_buf.length)list[0]=_buf.slice(cpy);else list.shift();c+=cpy;}}}return ret;}function endReadable(stream){var state=stream._readableState;// If we get here before consuming all the bytes, then that is a
// bug in node.  Should never happen.
if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!state.endEmitted){state.ended=true;processNextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){// Check that we didn't get one last unshift.
if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit('end');}}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i);}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i;}return-1;}}).call(this,require('_process'));},{"./_stream_duplex":29,"_process":23,"buffer":15,"buffer-shims":34,"core-util-is":35,"events":19,"inherits":20,"isarray":36,"process-nextick-args":37,"string_decoder/":50,"util":14}],32:[function(require,module,exports){// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';module.exports=Transform;var Duplex=require('./_stream_duplex');/*<replacement>*/var util=require('core-util-is');util.inherits=require('inherits');/*</replacement>*/util.inherits(Transform,Duplex);function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data);};this.needTransform=false;this.transforming=false;this.writecb=null;this.writechunk=null;this.writeencoding=null;}function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=false;var cb=ts.writecb;if(!cb)return stream.emit('error',new Error('no writecb in Transform class'));ts.writechunk=null;ts.writecb=null;if(data!==null&&data!==undefined)stream.push(data);cb(er);var rs=stream._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){stream._read(rs.highWaterMark);}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState=new TransformState(this);// when the writable side finishes, then flush out anything remaining.
var stream=this;// start out asking for a readable event once data is transformed.
this._readableState.needReadable=true;// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync=false;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush;}this.once('prefinish',function(){if(typeof this._flush==='function')this._flush(function(er){done(stream,er);});else done(stream);});}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding);};// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform=function(chunk,encoding,cb){throw new Error('Not implemented');};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else{// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform=true;}};function done(stream,er){if(er)return stream.emit('error',er);// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
var ws=stream._writableState;var ts=stream._transformState;if(ws.length)throw new Error('Calling transform done when ws.length != 0');if(ts.transforming)throw new Error('Calling transform done when still transforming');return stream.push(null);}},{"./_stream_duplex":29,"core-util-is":35,"inherits":20}],33:[function(require,module,exports){(function(process){// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';module.exports=Writable;/*<replacement>*/var processNextTick=require('process-nextick-args');/*</replacement>*//*<replacement>*/var asyncWrite=!process.browser&&['v0.10','v0.9.'].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;/*</replacement>*/Writable.WritableState=WritableState;/*<replacement>*/var util=require('core-util-is');util.inherits=require('inherits');/*</replacement>*//*<replacement>*/var internalUtil={deprecate:require('util-deprecate')};/*</replacement>*//*<replacement>*/var Stream;(function(){try{Stream=require('st'+'ream');}catch(_){}finally{if(!Stream)Stream=require('events').EventEmitter;}})();/*</replacement>*/var Buffer=require('buffer').Buffer;/*<replacement>*/var bufferShim=require('buffer-shims');/*</replacement>*/util.inherits(Writable,Stream);function nop(){}function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null;}var Duplex;function WritableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};// object stream flag to indicate whether or not this stream
// contains buffers or objects.
this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;// the point at which write() starts returning false
// Note: 0 is a valid value, means that we always return false if
// the entire buffer is not flushed immediately on write()
var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;// cast to ints.
this.highWaterMark=~~this.highWaterMark;this.needDrain=false;// at the start of calling end()
this.ending=false;// when end() has been called, and returned
this.ended=false;// when 'finish' is emitted
this.finished=false;// should we decode strings into buffers before passing to _write?
// this is here so that some node-core streams can optimize string
// handling at a lower level.
var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// not an actual buffer we keep track of, but a measurement
// of how much we're waiting to get pushed to some underlying
// socket or file.
this.length=0;// a flag to see when we're in the middle of a write.
this.writing=false;// when true all writes will be buffered until .uncork() call
this.corked=0;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// a flag to know if we're processing previously buffered items, which
// may call the _write() callback in the same tick, so that we don't
// end up in an overlapped onwrite situation.
this.bufferProcessing=false;// the callback that's passed to _write(chunk,cb)
this.onwrite=function(er){onwrite(stream,er);};// the callback that the user supplies to write(chunk,encoding,cb)
this.writecb=null;// the amount that is being written when _write is called.
this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;// number of pending user-supplied write callbacks
// this must be 0 before 'finish' can be emitted
this.pendingcb=0;// emit prefinish if the only thing we're waiting for is _write cbs
// This is relevant for synchronous Transform streams
this.prefinished=false;// True if the error was already emitted and should not be thrown again
this.errorEmitted=false;// count buffered requests
this.bufferedRequestCount=0;// allocate the first CorkedRequest, there is always
// one allocated and free to use, and we maintain at most two
this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function writableStateGetBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out;};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function(){return this.getBuffer();},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.')});}catch(_){}})();var Duplex;function Writable(options){Duplex=Duplex||require('./_stream_duplex');// Writable ctor is applied to Duplexes, though they're not
// instanceof Writable, they're instanceof Readable.
if(!(this instanceof Writable)&&!(this instanceof Duplex))return new Writable(options);this._writableState=new WritableState(options,this);// legacy.
this.writable=true;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;}Stream.call(this);}// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe=function(){this.emit('error',new Error('Cannot pipe, not readable'));};function writeAfterEnd(stream,cb){var er=new Error('write after end');// TODO: defer error events consistently everywhere, not just the cb
stream.emit('error',er);processNextTick(cb,er);}// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream,state,chunk,cb){var valid=true;var er=false;// Always throw error if a null is written
// if we are not in object mode then throw
// if it is not a buffer, string, or undefined.
if(chunk===null){er=new TypeError('May not write null values to stream');}else if(!Buffer.isBuffer(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}if(er){stream.emit('error',er);processNextTick(cb,er);valid=false;}return valid;}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;if(typeof encoding==='function'){cb=encoding;encoding=null;}if(Buffer.isBuffer(chunk))encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,chunk,encoding,cb);}return ret;};Writable.prototype.cork=function(){var state=this._writableState;state.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){// node::ParseEncoding() requires lower case.
if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new TypeError('Unknown encoding: '+encoding);this._writableState.defaultEncoding=encoding;return this;};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){chunk=bufferShim.from(chunk,encoding);}return chunk;}// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream,state,chunk,encoding,cb){chunk=decodeChunk(state,chunk,encoding);if(Buffer.isBuffer(chunk))encoding='buffer';var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;// we must ensure that previous needDrain will not be reset to false.
if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest=new WriteReq(chunk,encoding,cb);if(last){last.next=state.lastBufferedRequest;}else{state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else{doWrite(stream,state,false,len,chunk,encoding,cb);}return ret;}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync)processNextTick(cb,er);else cb(er);stream._writableState.errorEmitted=true;stream.emit('error',er);}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{// Check if we're actually ready to finish, but don't emit yet
var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){/*<replacement>*/asyncWrite(afterWrite,stream,state,finished,cb);/*</replacement>*/}else{afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit('drain');}}// if there's something in the buffer waiting, then process it
function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){// Fast case, write everything using _writev()
var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;while(entry){buffer[count]=entry;entry=entry.next;count+=1;}doWrite(stream,state,true,state.length,buffer,'',holder.finish);// doWrite is almost always async, defer these to save a bit of time
// as the hot path ends with doWrite
state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else{state.corkedRequestsFree=new CorkedRequest(state);}}else{// Slow case, write chunks one-by-one
while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;// if we didn't call the onwrite immediately, then
// it means that we need to wait until it does.
// also, that means that the chunk and cb are currently
// being processed, so move the buffer counter past them.
if(state.writing){break;}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequestCount=0;state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new Error('not implemented'));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==='function'){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);// .end() fully uncorks
if(state.corked){state.corked=1;this.uncork();}// ignore unnecessary end() calls.
if(!state.ending&&!state.finished)endWritable(this,state,cb);};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;}function prefinish(stream,state){if(!state.prefinished){state.prefinished=true;stream.emit('prefinish');}}function finishMaybe(stream,state){var need=needFinish(state);if(need){if(state.pendingcb===0){prefinish(stream,state);state.finished=true;stream.emit('finish');}else{prefinish(stream,state);}}return need;}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)processNextTick(cb);else stream.once('finish',cb);}state.ended=true;stream.writable=false;}// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(err){var entry=_this.entry;_this.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}if(state.corkedRequestsFree){state.corkedRequestsFree.next=_this;}else{state.corkedRequestsFree=_this;}};}}).call(this,require('_process'));},{"./_stream_duplex":29,"_process":23,"buffer":15,"buffer-shims":34,"core-util-is":35,"events":19,"inherits":20,"process-nextick-args":37,"util-deprecate":38}],34:[function(require,module,exports){(function(global){'use strict';var buffer=require('buffer');var Buffer=buffer.Buffer;var SlowBuffer=buffer.SlowBuffer;var MAX_LEN=buffer.kMaxLength||2147483647;exports.alloc=function alloc(size,fill,encoding){if(typeof Buffer.alloc==='function'){return Buffer.alloc(size,fill,encoding);}if(typeof encoding==='number'){throw new TypeError('encoding must not be number');}if(typeof size!=='number'){throw new TypeError('size must be a number');}if(size>MAX_LEN){throw new RangeError('size is too large');}var enc=encoding;var _fill=fill;if(_fill===undefined){enc=undefined;_fill=0;}var buf=new Buffer(size);if(typeof _fill==='string'){var fillBuf=new Buffer(_fill,enc);var flen=fillBuf.length;var i=-1;while(++i<size){buf[i]=fillBuf[i%flen];}}else{buf.fill(_fill);}return buf;};exports.allocUnsafe=function allocUnsafe(size){if(typeof Buffer.allocUnsafe==='function'){return Buffer.allocUnsafe(size);}if(typeof size!=='number'){throw new TypeError('size must be a number');}if(size>MAX_LEN){throw new RangeError('size is too large');}return new Buffer(size);};exports.from=function from(value,encodingOrOffset,length){if(typeof Buffer.from==='function'&&(!global.Uint8Array||Uint8Array.from!==Buffer.from)){return Buffer.from(value,encodingOrOffset,length);}if(typeof value==='number'){throw new TypeError('"value" argument must not be a number');}if(typeof value==='string'){return new Buffer(value,encodingOrOffset);}if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){var offset=encodingOrOffset;if(arguments.length===1){return new Buffer(value);}if(typeof offset==='undefined'){offset=0;}var len=length;if(typeof len==='undefined'){len=value.byteLength-offset;}if(offset>=value.byteLength){throw new RangeError('\'offset\' is out of bounds');}if(len>value.byteLength-offset){throw new RangeError('\'length\' is out of bounds');}return new Buffer(value.slice(offset,offset+len));}if(Buffer.isBuffer(value)){var out=new Buffer(value.length);value.copy(out,0,0,value.length);return out;}if(value){if(Array.isArray(value)||typeof ArrayBuffer!=='undefined'&&value.buffer instanceof ArrayBuffer||'length'in value){return new Buffer(value);}if(value.type==='Buffer'&&Array.isArray(value.data)){return new Buffer(value.data);}}throw new TypeError('First argument must be a string, Buffer, '+'ArrayBuffer, Array, or array-like object.');};exports.allocUnsafeSlow=function allocUnsafeSlow(size){if(typeof Buffer.allocUnsafeSlow==='function'){return Buffer.allocUnsafeSlow(size);}if(typeof size!=='number'){throw new TypeError('size must be a number');}if(size>=MAX_LEN){throw new RangeError('size is too large');}return new SlowBuffer(size);};}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"buffer":15}],35:[function(require,module,exports){(function(Buffer){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg){if(Array.isArray){return Array.isArray(arg);}return objectToString(arg)==='[object Array]';}exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean';}exports.isBoolean=isBoolean;function isNull(arg){return arg===null;}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null;}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number';}exports.isNumber=isNumber;function isString(arg){return typeof arg==='string';}exports.isString=isString;function isSymbol(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='symbol';}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0;}exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==='[object RegExp]';}exports.isRegExp=isRegExp;function isObject(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&arg!==null;}exports.isObject=isObject;function isDate(d){return objectToString(d)==='[object Date]';}exports.isDate=isDate;function isError(e){return objectToString(e)==='[object Error]'||e instanceof Error;}exports.isError=isError;function isFunction(arg){return typeof arg==='function';}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||(typeof arg==="undefined"?"undefined":_typeof(arg))==='symbol'||// ES6 symbol
typeof arg==='undefined';}exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o);}}).call(this,{"isBuffer":require("../../../../insert-module-globals/node_modules/is-buffer/index.js")});},{"../../../../insert-module-globals/node_modules/is-buffer/index.js":21}],36:[function(require,module,exports){arguments[4][18][0].apply(exports,arguments);},{"dup":18}],37:[function(require,module,exports){(function(process){'use strict';if(!process.version||process.version.indexOf('v0.')===0||process.version.indexOf('v1.')===0&&process.version.indexOf('v1.8.')!==0){module.exports=nextTick;}else{module.exports=process.nextTick;}function nextTick(fn,arg1,arg2,arg3){if(typeof fn!=='function'){throw new TypeError('"callback" argument must be a function');}var len=arguments.length;var args,i;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function afterTickOne(){fn.call(null,arg1);});case 3:return process.nextTick(function afterTickTwo(){fn.call(null,arg1,arg2);});case 4:return process.nextTick(function afterTickThree(){fn.call(null,arg1,arg2,arg3);});default:args=new Array(len-1);i=0;while(i<args.length){args[i++]=arguments[i];}return process.nextTick(function afterTick(){fn.apply(null,args);});}}}).call(this,require('_process'));},{"_process":23}],38:[function(require,module,exports){(function(global){/**
 * Module exports.
 */module.exports=deprecate;/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */function deprecate(fn,msg){if(config('noDeprecation')){return fn;}var warned=false;function deprecated(){if(!warned){if(config('throwDeprecation')){throw new Error(msg);}else if(config('traceDeprecation')){console.trace(msg);}else{console.warn(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;}/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */function config(name){// accessing global.localStorage can trigger a DOMException in sandboxed iframes
try{if(!global.localStorage)return false;}catch(_){return false;}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==='true';}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],39:[function(require,module,exports){module.exports=require("./lib/_stream_passthrough.js");},{"./lib/_stream_passthrough.js":30}],40:[function(require,module,exports){(function(process){var Stream=function(){try{return require('st'+'ream');// hack to fix a circular dependency issue when used with browserify
}catch(_){}}();exports=module.exports=require('./lib/_stream_readable.js');exports.Stream=Stream||exports;exports.Readable=exports;exports.Writable=require('./lib/_stream_writable.js');exports.Duplex=require('./lib/_stream_duplex.js');exports.Transform=require('./lib/_stream_transform.js');exports.PassThrough=require('./lib/_stream_passthrough.js');if(!process.browser&&process.env.READABLE_STREAM==='disable'&&Stream){module.exports=Stream;}}).call(this,require('_process'));},{"./lib/_stream_duplex.js":29,"./lib/_stream_passthrough.js":30,"./lib/_stream_readable.js":31,"./lib/_stream_transform.js":32,"./lib/_stream_writable.js":33,"_process":23}],41:[function(require,module,exports){module.exports=require("./lib/_stream_transform.js");},{"./lib/_stream_transform.js":32}],42:[function(require,module,exports){module.exports=require("./lib/_stream_writable.js");},{"./lib/_stream_writable.js":33}],43:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports=Stream;var EE=require('events').EventEmitter;var inherits=require('inherits');inherits(Stream,EE);Stream.Readable=require('readable-stream/readable.js');Stream.Writable=require('readable-stream/writable.js');Stream.Duplex=require('readable-stream/duplex.js');Stream.Transform=require('readable-stream/transform.js');Stream.PassThrough=require('readable-stream/passthrough.js');// Backwards-compat with node 0.4.x
Stream.Stream=Stream;// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.
function Stream(){EE.call(this);}Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(false===dest.write(chunk)&&source.pause){source.pause();}}}source.on('data',ondata);function ondrain(){if(source.readable&&source.resume){source.resume();}}dest.on('drain',ondrain);// If the 'end' option is not supplied, dest.end() will be called when
// source gets the 'end' or 'close' events.  Only dest.end() once.
if(!dest._isStdio&&(!options||options.end!==false)){source.on('end',onend);source.on('close',onclose);}var didOnEnd=false;function onend(){if(didOnEnd)return;didOnEnd=true;dest.end();}function onclose(){if(didOnEnd)return;didOnEnd=true;if(typeof dest.destroy==='function')dest.destroy();}// don't leave dangling pipes when there are errors.
function onerror(er){cleanup();if(EE.listenerCount(this,'error')===0){throw er;// Unhandled stream error in pipe.
}}source.on('error',onerror);dest.on('error',onerror);// remove all the event listeners that were added.
function cleanup(){source.removeListener('data',ondata);dest.removeListener('drain',ondrain);source.removeListener('end',onend);source.removeListener('close',onclose);source.removeListener('error',onerror);dest.removeListener('error',onerror);source.removeListener('end',cleanup);source.removeListener('close',cleanup);dest.removeListener('close',cleanup);}source.on('end',cleanup);source.on('close',cleanup);dest.on('close',cleanup);dest.emit('pipe',source);// Allow for unix-like usage: A.pipe(B).pipe(C)
return dest;};},{"events":19,"inherits":20,"readable-stream/duplex.js":28,"readable-stream/passthrough.js":39,"readable-stream/readable.js":40,"readable-stream/transform.js":41,"readable-stream/writable.js":42}],44:[function(require,module,exports){(function(global){var ClientRequest=require('./lib/request');var extend=require('xtend');var statusCodes=require('builtin-status-codes');var url=require('url');var http=exports;http.request=function(opts,cb){if(typeof opts==='string')opts=url.parse(opts);else opts=extend(opts);// Normally, the page is loaded from http or https, so not specifying a protocol
// will result in a (valid) protocol-relative url. However, this won't work if
// the protocol is something else, like 'file:'
var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?'http:':'';var protocol=opts.protocol||defaultProtocol;var host=opts.hostname||opts.host;var port=opts.port;var path=opts.path||'/';// Necessary for IPv6 addresses
if(host&&host.indexOf(':')!==-1)host='['+host+']';// This may be a relative url. The browser should always be able to interpret it correctly.
opts.url=(host?protocol+'//'+host:'')+(port?':'+port:'')+path;opts.method=(opts.method||'GET').toUpperCase();opts.headers=opts.headers||{};// Also valid opts.auth, opts.mode
var req=new ClientRequest(opts);if(cb)req.on('response',cb);return req;};http.get=function get(opts,cb){var req=http.request(opts,cb);req.end();return req;};http.Agent=function(){};http.Agent.defaultMaxSockets=4;http.STATUS_CODES=statusCodes;http.METHODS=['CHECKOUT','CONNECT','COPY','DELETE','GET','HEAD','LOCK','M-SEARCH','MERGE','MKACTIVITY','MKCOL','MOVE','NOTIFY','OPTIONS','PATCH','POST','PROPFIND','PROPPATCH','PURGE','PUT','REPORT','SEARCH','SUBSCRIBE','TRACE','UNLOCK','UNSUBSCRIBE'];}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./lib/request":46,"builtin-status-codes":48,"url":51,"xtend":55}],45:[function(require,module,exports){(function(global){exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream);exports.blobConstructor=false;try{new Blob([new ArrayBuffer(1)]);exports.blobConstructor=true;}catch(e){}var xhr=new global.XMLHttpRequest();// If location.host is empty, e.g. if this page/worker was loaded
// from a Blob, then use example.com to avoid an error
xhr.open('GET',global.location.host?'/':'https://example.com');function checkTypeSupport(type){try{xhr.responseType=type;return xhr.responseType===type;}catch(e){}return false;}// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer=typeof global.ArrayBuffer!=='undefined';var haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);exports.arraybuffer=haveArrayBuffer&&checkTypeSupport('arraybuffer');// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport('ms-stream');exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&checkTypeSupport('moz-chunked-arraybuffer');exports.overrideMimeType=isFunction(xhr.overrideMimeType);exports.vbArray=isFunction(global.VBArray);function isFunction(value){return typeof value==='function';}xhr=null;// Help gc
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],46:[function(require,module,exports){(function(process,global,Buffer){var capability=require('./capability');var inherits=require('inherits');var response=require('./response');var stream=require('readable-stream');var toArrayBuffer=require('to-arraybuffer');var IncomingMessage=response.IncomingMessage;var rStates=response.readyStates;function decideMode(preferBinary){if(capability.fetch){return'fetch';}else if(capability.mozchunkedarraybuffer){return'moz-chunked-arraybuffer';}else if(capability.msstream){return'ms-stream';}else if(capability.arraybuffer&&preferBinary){return'arraybuffer';}else if(capability.vbArray&&preferBinary){return'text:vbarray';}else{return'text';}}var ClientRequest=module.exports=function(opts){var self=this;stream.Writable.call(self);self._opts=opts;self._body=[];self._headers={};if(opts.auth)self.setHeader('Authorization','Basic '+new Buffer(opts.auth).toString('base64'));Object.keys(opts.headers).forEach(function(name){self.setHeader(name,opts.headers[name]);});var preferBinary;if(opts.mode==='prefer-streaming'){// If streaming is a high priority but binary compatibility and
// the accuracy of the 'content-type' header aren't
preferBinary=false;}else if(opts.mode==='allow-wrong-content-type'){// If streaming is more important than preserving the 'content-type' header
preferBinary=!capability.overrideMimeType;}else if(!opts.mode||opts.mode==='default'||opts.mode==='prefer-fast'){// Use binary if text streaming may corrupt data or the content-type header, or for speed
preferBinary=true;}else{throw new Error('Invalid value for opts.mode');}self._mode=decideMode(preferBinary);self.on('finish',function(){self._onFinish();});};inherits(ClientRequest,stream.Writable);ClientRequest.prototype.setHeader=function(name,value){var self=this;var lowerName=name.toLowerCase();// This check is not necessary, but it prevents warnings from browsers about setting unsafe
// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
// http-browserify did it, so I will too.
if(unsafeHeaders.indexOf(lowerName)!==-1)return;self._headers[lowerName]={name:name,value:value};};ClientRequest.prototype.getHeader=function(name){var self=this;return self._headers[name.toLowerCase()].value;};ClientRequest.prototype.removeHeader=function(name){var self=this;delete self._headers[name.toLowerCase()];};ClientRequest.prototype._onFinish=function(){var self=this;if(self._destroyed)return;var opts=self._opts;var headersObj=self._headers;var body;if(opts.method==='POST'||opts.method==='PUT'||opts.method==='PATCH'){if(capability.blobConstructor){body=new global.Blob(self._body.map(function(buffer){return toArrayBuffer(buffer);}),{type:(headersObj['content-type']||{}).value||''});}else{// get utf8 string
body=Buffer.concat(self._body).toString();}}if(self._mode==='fetch'){var headers=Object.keys(headersObj).map(function(name){return[headersObj[name].name,headersObj[name].value];});global.fetch(self._opts.url,{method:self._opts.method,headers:headers,body:body,mode:'cors',credentials:opts.withCredentials?'include':'same-origin'}).then(function(response){self._fetchResponse=response;self._connect();},function(reason){self.emit('error',reason);});}else{var xhr=self._xhr=new global.XMLHttpRequest();try{xhr.open(self._opts.method,self._opts.url,true);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}// Can't set responseType on really old browsers
if('responseType'in xhr)xhr.responseType=self._mode.split(':')[0];if('withCredentials'in xhr)xhr.withCredentials=!!opts.withCredentials;if(self._mode==='text'&&'overrideMimeType'in xhr)xhr.overrideMimeType('text/plain; charset=x-user-defined');Object.keys(headersObj).forEach(function(name){xhr.setRequestHeader(headersObj[name].name,headersObj[name].value);});self._response=null;xhr.onreadystatechange=function(){switch(xhr.readyState){case rStates.LOADING:case rStates.DONE:self._onXHRProgress();break;}};// Necessary for streaming in Firefox, since xhr.response is ONLY defined
// in onprogress, not in onreadystatechange with xhr.readyState = 3
if(self._mode==='moz-chunked-arraybuffer'){xhr.onprogress=function(){self._onXHRProgress();};}xhr.onerror=function(){if(self._destroyed)return;self.emit('error',new Error('XHR error'));};try{xhr.send(body);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}}};/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */function statusValid(xhr){try{var status=xhr.status;return status!==null&&status!==0;}catch(e){return false;}}ClientRequest.prototype._onXHRProgress=function(){var self=this;if(!statusValid(self._xhr)||self._destroyed)return;if(!self._response)self._connect();self._response._onXHRProgress();};ClientRequest.prototype._connect=function(){var self=this;if(self._destroyed)return;self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode);self.emit('response',self._response);};ClientRequest.prototype._write=function(chunk,encoding,cb){var self=this;self._body.push(chunk);cb();};ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){var self=this;self._destroyed=true;if(self._response)self._response._destroyed=true;if(self._xhr)self._xhr.abort();// Currently, there isn't a way to truly abort a fetch.
// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
};ClientRequest.prototype.end=function(data,encoding,cb){var self=this;if(typeof data==='function'){cb=data;data=undefined;}stream.Writable.prototype.end.call(self,data,encoding,cb);};ClientRequest.prototype.flushHeaders=function(){};ClientRequest.prototype.setTimeout=function(){};ClientRequest.prototype.setNoDelay=function(){};ClientRequest.prototype.setSocketKeepAlive=function(){};// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders=['accept-charset','accept-encoding','access-control-request-headers','access-control-request-method','connection','content-length','cookie','cookie2','date','dnt','expect','host','keep-alive','origin','referer','te','trailer','transfer-encoding','upgrade','user-agent','via'];}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":45,"./response":47,"_process":23,"buffer":15,"inherits":20,"readable-stream":40,"to-arraybuffer":49}],47:[function(require,module,exports){(function(process,global,Buffer){var capability=require('./capability');var inherits=require('inherits');var stream=require('readable-stream');var rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};var IncomingMessage=exports.IncomingMessage=function(xhr,response,mode){var self=this;stream.Readable.call(self);self._mode=mode;self.headers={};self.rawHeaders=[];self.trailers={};self.rawTrailers=[];// Fake the 'close' event, but only once 'end' fires
self.on('end',function(){// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
process.nextTick(function(){self.emit('close');});});if(mode==='fetch'){var header,_i,_it;var reader;(function(){var read=function read(){reader.read().then(function(result){if(self._destroyed)return;if(result.done){self.push(null);return;}self.push(new Buffer(result.value));read();});};self._fetchResponse=response;self.url=response.url;self.statusCode=response.status;self.statusMessage=response.statusText;// backwards compatible version of for (<item> of <iterable>):
// for (var <item>,_i,_it = <iterable>[Symbol.iterator](); <item> = (_i = _it.next()).value,!_i.done;)
for(_it=response.headers[Symbol.iterator]();header=(_i=_it.next()).value,!_i.done;){self.headers[header[0].toLowerCase()]=header[1];self.rawHeaders.push(header[0],header[1]);}// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
reader=response.body.getReader();read();})();}else{self._xhr=xhr;self._pos=0;self.url=xhr.responseURL;self.statusCode=xhr.status;self.statusMessage=xhr.statusText;var headers=xhr.getAllResponseHeaders().split(/\r?\n/);headers.forEach(function(header){var matches=header.match(/^([^:]+):\s*(.*)/);if(matches){var key=matches[1].toLowerCase();if(key==='set-cookie'){if(self.headers[key]===undefined){self.headers[key]=[];}self.headers[key].push(matches[2]);}else if(self.headers[key]!==undefined){self.headers[key]+=', '+matches[2];}else{self.headers[key]=matches[2];}self.rawHeaders.push(matches[1],matches[2]);}});self._charset='x-user-defined';if(!capability.overrideMimeType){var mimeType=self.rawHeaders['mime-type'];if(mimeType){var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);if(charsetMatch){self._charset=charsetMatch[1].toLowerCase();}}if(!self._charset)self._charset='utf-8';// best guess
}}};inherits(IncomingMessage,stream.Readable);IncomingMessage.prototype._read=function(){};IncomingMessage.prototype._onXHRProgress=function(){var self=this;var xhr=self._xhr;var response=null;switch(self._mode){case'text:vbarray':// For IE9
if(xhr.readyState!==rStates.DONE)break;try{// This fails in IE8
response=new global.VBArray(xhr.responseBody).toArray();}catch(e){}if(response!==null){self.push(new Buffer(response));break;}// Falls through in IE8	
case'text':try{// This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
response=xhr.responseText;}catch(e){self._mode='text:vbarray';break;}if(response.length>self._pos){var newData=response.substr(self._pos);if(self._charset==='x-user-defined'){var buffer=new Buffer(newData.length);for(var i=0;i<newData.length;i++){buffer[i]=newData.charCodeAt(i)&0xff;}self.push(buffer);}else{self.push(newData,self._charset);}self._pos=response.length;}break;case'arraybuffer':if(xhr.readyState!==rStates.DONE)break;response=xhr.response;self.push(new Buffer(new Uint8Array(response)));break;case'moz-chunked-arraybuffer':// take whole
response=xhr.response;if(xhr.readyState!==rStates.LOADING||!response)break;self.push(new Buffer(new Uint8Array(response)));break;case'ms-stream':response=xhr.response;if(xhr.readyState!==rStates.LOADING)break;var reader=new global.MSStreamReader();reader.onprogress=function(){if(reader.result.byteLength>self._pos){self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));self._pos=reader.result.byteLength;}};reader.onload=function(){self.push(null);};// reader.onerror = ??? // TODO: this
reader.readAsArrayBuffer(response);break;}// The ms-stream case handles end separately in reader.onload()
if(self._xhr.readyState===rStates.DONE&&self._mode!=='ms-stream'){self.push(null);}};}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":45,"_process":23,"buffer":15,"inherits":20,"readable-stream":40}],48:[function(require,module,exports){module.exports={"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"};},{}],49:[function(require,module,exports){var Buffer=require('buffer').Buffer;module.exports=function(buf){// If the buffer is backed by a Uint8Array, a faster version will work
if(buf instanceof Uint8Array){// If the buffer isn't a subarray, return the underlying ArrayBuffer
if(buf.byteOffset===0&&buf.byteLength===buf.buffer.byteLength){return buf.buffer;}else if(typeof buf.buffer.slice==='function'){// Otherwise we need to get a proper copy
return buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength);}}if(Buffer.isBuffer(buf)){// This is the slow version that will work with any Buffer
// implementation (even in old browsers)
var arrayCopy=new Uint8Array(buf.length);var len=buf.length;for(var i=0;i<len;i++){arrayCopy[i]=buf[i];}return arrayCopy.buffer;}else{throw new Error('Argument must be a Buffer');}};},{"buffer":15}],50:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var Buffer=require('buffer').Buffer;var isBufferEncoding=Buffer.isEncoding||function(encoding){switch(encoding&&encoding.toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':case'raw':return true;default:return false;}};function assertEncoding(encoding){if(encoding&&!isBufferEncoding(encoding)){throw new Error('Unknown encoding: '+encoding);}}// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder=exports.StringDecoder=function(encoding){this.encoding=(encoding||'utf8').toLowerCase().replace(/[-_]/,'');assertEncoding(encoding);switch(this.encoding){case'utf8':// CESU-8 represents each of Surrogate Pair by 3-bytes
this.surrogateSize=3;break;case'ucs2':case'utf16le':// UTF-16 represents each of Surrogate Pair by 2-bytes
this.surrogateSize=2;this.detectIncompleteChar=utf16DetectIncompleteChar;break;case'base64':// Base-64 stores 3 bytes in 4 chars, and pads the remainder.
this.surrogateSize=3;this.detectIncompleteChar=base64DetectIncompleteChar;break;default:this.write=passThroughWrite;return;}// Enough space to store all bytes of a single character. UTF-8 needs 4
// bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
this.charBuffer=new Buffer(6);// Number of bytes received for the current incomplete multi-byte character.
this.charReceived=0;// Number of bytes expected for the current incomplete multi-byte character.
this.charLength=0;};// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write=function(buffer){var charStr='';// if our last write ended with an incomplete multibyte character
while(this.charLength){// determine how many remaining bytes this buffer has to offer for this char
var available=buffer.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:buffer.length;// add the new bytes to the char buffer
buffer.copy(this.charBuffer,this.charReceived,0,available);this.charReceived+=available;if(this.charReceived<this.charLength){// still not enough chars in this buffer? wait for more ...
return'';}// remove bytes belonging to the current character from the buffer
buffer=buffer.slice(available,buffer.length);// get the character that was split
charStr=this.charBuffer.slice(0,this.charLength).toString(this.encoding);// CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
var charCode=charStr.charCodeAt(charStr.length-1);if(charCode>=0xD800&&charCode<=0xDBFF){this.charLength+=this.surrogateSize;charStr='';continue;}this.charReceived=this.charLength=0;// if there are no more bytes in this buffer, just emit our char
if(buffer.length===0){return charStr;}break;}// determine and set charLength / charReceived
this.detectIncompleteChar(buffer);var end=buffer.length;if(this.charLength){// buffer the incomplete character bytes we got
buffer.copy(this.charBuffer,0,buffer.length-this.charReceived,end);end-=this.charReceived;}charStr+=buffer.toString(this.encoding,0,end);var end=charStr.length-1;var charCode=charStr.charCodeAt(end);// CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
if(charCode>=0xD800&&charCode<=0xDBFF){var size=this.surrogateSize;this.charLength+=size;this.charReceived+=size;this.charBuffer.copy(this.charBuffer,size,0,size);buffer.copy(this.charBuffer,0,0,size);return charStr.substring(0,end);}// or just emit the charStr
return charStr;};// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar=function(buffer){// determine how many bytes we have to check at the end of this buffer
var i=buffer.length>=3?3:buffer.length;// Figure out if one of the last i bytes of our buffer announces an
// incomplete char.
for(;i>0;i--){var c=buffer[buffer.length-i];// See http://en.wikipedia.org/wiki/UTF-8#Description
// 110XXXXX
if(i==1&&c>>5==0x06){this.charLength=2;break;}// 1110XXXX
if(i<=2&&c>>4==0x0E){this.charLength=3;break;}// 11110XXX
if(i<=3&&c>>3==0x1E){this.charLength=4;break;}}this.charReceived=i;};StringDecoder.prototype.end=function(buffer){var res='';if(buffer&&buffer.length)res=this.write(buffer);if(this.charReceived){var cr=this.charReceived;var buf=this.charBuffer;var enc=this.encoding;res+=buf.slice(0,cr).toString(enc);}return res;};function passThroughWrite(buffer){return buffer.toString(this.encoding);}function utf16DetectIncompleteChar(buffer){this.charReceived=buffer.length%2;this.charLength=this.charReceived?2:0;}function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3;this.charLength=this.charReceived?3:0;}},{"buffer":15}],51:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';var punycode=require('punycode');var util=require('./util');exports.parse=urlParse;exports.resolve=urlResolve;exports.resolveObject=urlResolveObject;exports.format=urlFormat;exports.Url=Url;function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,// Special case for a simple path URL
simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims=['<','>','"','`',' ','\r','\n','\t'],// RFC 2396: characters not allowed for various reasons.
unwise=['{','}','|','\\','^','`'].concat(delims),// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape=['\''].concat(unwise),// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars=['%','/','?',';','#'].concat(autoEscape),hostEndingChars=['/','?','#'],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,// protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol={'javascript':true,'javascript:':true},// protocols that never have a hostname.
hostlessProtocol={'javascript':true,'javascript:':true},// protocols that always contain a // bit.
slashedProtocol={'http':true,'https':true,'ftp':true,'gopher':true,'file':true,'http:':true,'https:':true,'ftp:':true,'gopher:':true,'file:':true},querystring=require('querystring');function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&util.isObject(url)&&url instanceof Url)return url;var u=new Url();u.parse(url,parseQueryString,slashesDenoteHost);return u;}Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!util.isString(url)){throw new TypeError("Parameter 'url' must be a string, not "+(typeof url==="undefined"?"undefined":_typeof(url)));}// Copy chrome, IE, opera backslash-handling behavior.
// Back slashes before the query string get converted to forward slashes
// See: https://code.google.com/p/chromium/issues/detail?id=25916
var queryIndex=url.indexOf('?'),splitter=queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',uSplit=url.split(splitter),slashRegex=/\\/g;uSplit[0]=uSplit[0].replace(slashRegex,'/');url=uSplit.join(splitter);var rest=url;// trim before proceeding.
// This is to support parse stuff like "  http://foo.com  \n"
rest=rest.trim();if(!slashesDenoteHost&&url.split('#').length===1){// Try fast path regexp
var simplePath=simplePathPattern.exec(rest);if(simplePath){this.path=rest;this.href=rest;this.pathname=simplePath[1];if(simplePath[2]){this.search=simplePath[2];if(parseQueryString){this.query=querystring.parse(this.search.substr(1));}else{this.query=this.search.substr(1);}}else if(parseQueryString){this.search='';this.query={};}return this;}}var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto;rest=rest.substr(proto.length);}// figure out if it's got a host
// user@server is *always* interpreted as a hostname, and url
// resolution will treat //foo/bar as host=foo,path=bar because that's
// how the browser resolves relative URLs.
if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes=rest.substr(0,2)==='//';if(slashes&&!(proto&&hostlessProtocol[proto])){rest=rest.substr(2);this.slashes=true;}}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){// there's a hostname.
// the first instance of /, ?, ;, or # ends the host.
//
// If there is an @ in the hostname, then non-host chars *are* allowed
// to the left of the last @ sign, unless some host-ending character
// comes *before* the @-sign.
// URLs are obnoxious.
//
// ex:
// http://a@b@c/ => user:a@b host:c
// http://a@b?@c => user:a host:c path:/?@c
// v0.12 TODO(isaacs): This is not quite how Chrome does things.
// Review our test case against browsers more comprehensively.
// find the first instance of any hostEndingChars
var hostEnd=-1;for(var i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// at this point, either we have an explicit point where the
// auth portion cannot go past, or the last @ char is the decider.
var auth,atSign;if(hostEnd===-1){// atSign can be anywhere.
atSign=rest.lastIndexOf('@');}else{// atSign must be in auth portion.
// http://a@b/c@d => host:b auth:a path:/c@d
atSign=rest.lastIndexOf('@',hostEnd);}// Now we have a portion which is definitely the auth.
// Pull that off.
if(atSign!==-1){auth=rest.slice(0,atSign);rest=rest.slice(atSign+1);this.auth=decodeURIComponent(auth);}// the host is the remaining to the left of the first non-host char
hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// if we still have not hit it, then the entire thing is a host.
if(hostEnd===-1)hostEnd=rest.length;this.host=rest.slice(0,hostEnd);rest=rest.slice(hostEnd);// pull out port.
this.parseHost();// we've indicated that there is a hostname,
// so even if it's empty, it has to be present.
this.hostname=this.hostname||'';// if hostname begins with [ and ends with ]
// assume that it's an IPv6 address.
var ipv6Hostname=this.hostname[0]==='['&&this.hostname[this.hostname.length-1]===']';// validate a little.
if(!ipv6Hostname){var hostparts=this.hostname.split(/\./);for(var i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(!part)continue;if(!part.match(hostnamePartPattern)){var newpart='';for(var j=0,k=part.length;j<k;j++){if(part.charCodeAt(j)>127){// we replace non-ASCII char with a temporary placeholder
// we need this to make sure size of hostname is not
// broken by replacing non-ASCII by nothing
newpart+='x';}else{newpart+=part[j];}}// we test again with ASCII char only
if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i);var notHost=hostparts.slice(i+1);var bit=part.match(hostnamePartStart);if(bit){validParts.push(bit[1]);notHost.unshift(bit[2]);}if(notHost.length){rest='/'+notHost.join('.')+rest;}this.hostname=validParts.join('.');break;}}}}if(this.hostname.length>hostnameMaxLen){this.hostname='';}else{// hostnames are always lower case.
this.hostname=this.hostname.toLowerCase();}if(!ipv6Hostname){// IDNA Support: Returns a punycoded representation of "domain".
// It only converts parts of the domain name that
// have non-ASCII characters, i.e. it doesn't matter if
// you call it with a domain that already is ASCII-only.
this.hostname=punycode.toASCII(this.hostname);}var p=this.port?':'+this.port:'';var h=this.hostname||'';this.host=h+p;this.href+=this.host;// strip [ and ] from the hostname
// the host field still retains them, though
if(ipv6Hostname){this.hostname=this.hostname.substr(1,this.hostname.length-2);if(rest[0]!=='/'){rest='/'+rest;}}}// now rest is set to the post-host stuff.
// chop off any delim chars.
if(!unsafeProtocol[lowerProto]){// First, make 100% sure that any "autoEscape" chars get
// escaped, even if encodeURIComponent doesn't think they
// need to be.
for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];if(rest.indexOf(ae)===-1)continue;var esc=encodeURIComponent(ae);if(esc===ae){esc=escape(ae);}rest=rest.split(ae).join(esc);}}// chop off from the tail first.
var hash=rest.indexOf('#');if(hash!==-1){// got a fragment string.
this.hash=rest.substr(hash);rest=rest.slice(0,hash);}var qm=rest.indexOf('?');if(qm!==-1){this.search=rest.substr(qm);this.query=rest.substr(qm+1);if(parseQueryString){this.query=querystring.parse(this.query);}rest=rest.slice(0,qm);}else if(parseQueryString){// no query string, but parseQueryString still requested
this.search='';this.query={};}if(rest)this.pathname=rest;if(slashedProtocol[lowerProto]&&this.hostname&&!this.pathname){this.pathname='/';}//to support http.request
if(this.pathname||this.search){var p=this.pathname||'';var s=this.search||'';this.path=p+s;}// finally, reconstruct the href based on what has been validated.
this.href=this.format();return this;};// format a parsed object into a url string
function urlFormat(obj){// ensure it's an object, and not a string url.
// If it's an obj, this is a no-op.
// this way, you can call url_format() on strings
// to clean up potentially wonky urls.
if(util.isString(obj))obj=urlParse(obj);if(!(obj instanceof Url))return Url.prototype.format.call(obj);return obj.format();}Url.prototype.format=function(){var auth=this.auth||'';if(auth){auth=encodeURIComponent(auth);auth=auth.replace(/%3A/i,':');auth+='@';}var protocol=this.protocol||'',pathname=this.pathname||'',hash=this.hash||'',host=false,query='';if(this.host){host=auth+this.host;}else if(this.hostname){host=auth+(this.hostname.indexOf(':')===-1?this.hostname:'['+this.hostname+']');if(this.port){host+=':'+this.port;}}if(this.query&&util.isObject(this.query)&&Object.keys(this.query).length){query=querystring.stringify(this.query);}var search=this.search||query&&'?'+query||'';if(protocol&&protocol.substr(-1)!==':')protocol+=':';// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
// unless they had them to begin with.
if(this.slashes||(!protocol||slashedProtocol[protocol])&&host!==false){host='//'+(host||'');if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;}else if(!host){host='';}if(hash&&hash.charAt(0)!=='#')hash='#'+hash;if(search&&search.charAt(0)!=='?')search='?'+search;pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match);});search=search.replace('#','%23');return protocol+host+pathname+search+hash;};function urlResolve(source,relative){return urlParse(source,false,true).resolve(relative);}Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,false,true)).format();};function urlResolveObject(source,relative){if(!source)return relative;return urlParse(source,false,true).resolveObject(relative);}Url.prototype.resolveObject=function(relative){if(util.isString(relative)){var rel=new Url();rel.parse(relative,false,true);relative=rel;}var result=new Url();var tkeys=Object.keys(this);for(var tk=0;tk<tkeys.length;tk++){var tkey=tkeys[tk];result[tkey]=this[tkey];}// hash is always overridden, no matter what.
// even href="" will remove it.
result.hash=relative.hash;// if the relative url is empty, then there's nothing left to do here.
if(relative.href===''){result.href=result.format();return result;}// hrefs like //foo/bar always cut to the protocol.
if(relative.slashes&&!relative.protocol){// take everything except the protocol from relative
var rkeys=Object.keys(relative);for(var rk=0;rk<rkeys.length;rk++){var rkey=rkeys[rk];if(rkey!=='protocol')result[rkey]=relative[rkey];}//urlParse appends trailing / to urls like http://www.example.com
if(slashedProtocol[result.protocol]&&result.hostname&&!result.pathname){result.path=result.pathname='/';}result.href=result.format();return result;}if(relative.protocol&&relative.protocol!==result.protocol){// if it's a known url protocol, then changing
// the protocol does weird things
// first, if it's not file:, then we MUST have a host,
// and if there was a path
// to begin with, then we MUST have a path.
// if it is file:, then the host is dropped,
// because that's known to be hostless.
// anything else is assumed to be absolute.
if(!slashedProtocol[relative.protocol]){var keys=Object.keys(relative);for(var v=0;v<keys.length;v++){var k=keys[v];result[k]=relative[k];}result.href=result.format();return result;}result.protocol=relative.protocol;if(!relative.host&&!hostlessProtocol[relative.protocol]){var relPath=(relative.pathname||'').split('/');while(relPath.length&&!(relative.host=relPath.shift())){}if(!relative.host)relative.host='';if(!relative.hostname)relative.hostname='';if(relPath[0]!=='')relPath.unshift('');if(relPath.length<2)relPath.unshift('');result.pathname=relPath.join('/');}else{result.pathname=relative.pathname;}result.search=relative.search;result.query=relative.query;result.host=relative.host||'';result.auth=relative.auth;result.hostname=relative.hostname||relative.host;result.port=relative.port;// to support http.request
if(result.pathname||result.search){var p=result.pathname||'';var s=result.search||'';result.path=p+s;}result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;}var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',isRelAbs=relative.host||relative.pathname&&relative.pathname.charAt(0)==='/',mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split('/')||[],relPath=relative.pathname&&relative.pathname.split('/')||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];// if the url is a non-slashed url, then relative
// links like ../.. should be able
// to crawl up to the hostname, as well.  This is strange.
// result.protocol has already been set by now.
// Later on, put the first path part into the host field.
if(psychotic){result.hostname='';result.port=null;if(result.host){if(srcPath[0]==='')srcPath[0]=result.host;else srcPath.unshift(result.host);}result.host='';if(relative.protocol){relative.hostname=null;relative.port=null;if(relative.host){if(relPath[0]==='')relPath[0]=relative.host;else relPath.unshift(relative.host);}relative.host=null;}mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}if(isRelAbs){// it's absolute.
result.host=relative.host||relative.host===''?relative.host:result.host;result.hostname=relative.hostname||relative.hostname===''?relative.hostname:result.hostname;result.search=relative.search;result.query=relative.query;srcPath=relPath;// fall through to the dot-handling below.
}else if(relPath.length){// it's relative
// throw away the existing file, and take the new path instead.
if(!srcPath)srcPath=[];srcPath.pop();srcPath=srcPath.concat(relPath);result.search=relative.search;result.query=relative.query;}else if(!util.isNullOrUndefined(relative.search)){// just pull out the search.
// like href='?foo'.
// Put this after the other two cases because it simplifies the booleans
if(psychotic){result.hostname=result.host=srcPath.shift();//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}result.search=relative.search;result.query=relative.query;//to support http.request
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.href=result.format();return result;}if(!srcPath.length){// no path at all.  easy.
// we've already handled the other stuff above.
result.pathname=null;//to support http.request
if(result.search){result.path='/'+result.search;}else{result.path=null;}result.href=result.format();return result;}// if a url ENDs in . or .., then it must get a trailing slash.
// however, if it ends in anything else non-slashy,
// then it must NOT get a trailing slash.
var last=srcPath.slice(-1)[0];var hasTrailingSlash=(result.host||relative.host||srcPath.length>1)&&(last==='.'||last==='..')||last==='';// strip single dots, resolve double dots to parent dir
// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=srcPath.length;i>=0;i--){last=srcPath[i];if(last==='.'){srcPath.splice(i,1);}else if(last==='..'){srcPath.splice(i,1);up++;}else if(up){srcPath.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(!mustEndAbs&&!removeAllDots){for(;up--;up){srcPath.unshift('..');}}if(mustEndAbs&&srcPath[0]!==''&&(!srcPath[0]||srcPath[0].charAt(0)!=='/')){srcPath.unshift('');}if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){srcPath.push('');}var isAbsolute=srcPath[0]===''||srcPath[0]&&srcPath[0].charAt(0)==='/';// put the host back
if(psychotic){result.hostname=result.host=isAbsolute?'':srcPath.length?srcPath.shift():'';//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}mustEndAbs=mustEndAbs||result.host&&srcPath.length;if(mustEndAbs&&!isAbsolute){srcPath.unshift('');}if(!srcPath.length){result.pathname=null;result.path=null;}else{result.pathname=srcPath.join('/');}//to support request.http
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.auth=relative.auth||result.auth;result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;};Url.prototype.parseHost=function(){var host=this.host;var port=portPattern.exec(host);if(port){port=port[0];if(port!==':'){this.port=port.substr(1);}host=host.substr(0,host.length-port.length);}if(host)this.hostname=host;};},{"./util":52,"punycode":24,"querystring":27}],52:[function(require,module,exports){'use strict';module.exports={isString:function isString(arg){return typeof arg==='string';},isObject:function isObject(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&arg!==null;},isNull:function isNull(arg){return arg===null;},isNullOrUndefined:function isNullOrUndefined(arg){return arg==null;}};},{}],53:[function(require,module,exports){module.exports=function isBuffer(arg){return arg&&(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&typeof arg.copy==='function'&&typeof arg.fill==='function'&&typeof arg.readUInt8==='function';};},{}],54:[function(require,module,exports){(function(process,global){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]));}return objects.join(' ');}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==='%%')return'%';if(i>=len)return x;switch(x){case'%s':return String(args[i++]);case'%d':return Number(args[i++]);case'%j':try{return JSON.stringify(args[i++]);}catch(_){return'[Circular]';}default:return x;}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=' '+x;}else{str+=' '+inspect(x);}}return str;};// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate=function(fn,msg){// Allow for deprecating things in the process of starting up.
if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments);};}if(process.noDeprecation===true){return fn;}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg);}else if(process.traceDeprecation){console.trace(msg);}else{console.error(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||'';set=set.toUpperCase();if(!debugs[set]){if(new RegExp('\\b'+set+'\\b','i').test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error('%s %d: %s',set,pid,msg);};}else{debugs[set]=function(){};}}return debugs[set];};/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 *//* legacy: obj, showHidden, depth, colors*/function inspect(obj,opts){// default options
var ctx={seen:[],stylize:stylizeNoColor};// legacy...
if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){// legacy...
ctx.showHidden=opts;}else if(opts){// got an "options" object
exports._extend(ctx,opts);}// set default options
if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth);}exports.inspect=inspect;// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors={'bold':[1,22],'italic':[3,23],'underline':[4,24],'inverse':[7,27],'white':[37,39],'grey':[90,39],'black':[30,39],'blue':[34,39],'cyan':[36,39],'green':[32,39],'magenta':[35,39],'red':[31,39],'yellow':[33,39]};// Don't use 'blue' not visible on cmd.exe
inspect.styles={'special':'cyan','number':'yellow','boolean':'yellow','undefined':'grey','null':'bold','string':'green','date':'magenta',// "name": intentionally not styling
'regexp':'red'};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return"\u001b["+inspect.colors[style][0]+'m'+str+"\u001b["+inspect.colors[style][1]+'m';}else{return str;}}function stylizeNoColor(str,styleType){return str;}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true;});return hash;}function formatValue(ctx,value,recurseTimes){// Provide a hook for user-specified inspect functions.
// Check that value is an object with an inspect function on it
if(ctx.customInspect&&value&&isFunction(value.inspect)&&// Filter out the util module, it's inspect function is special
value.inspect!==exports.inspect&&// Also filter out any prototype objects using the circular check.
!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes);}return ret;}// Primitive types cannot have properties
var primitive=formatPrimitive(ctx,value);if(primitive){return primitive;}// Look up the keys of the object.
var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value);}// IE doesn't make error fields non-enumerable
// http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
if(isError(value)&&(keys.indexOf('message')>=0||keys.indexOf('description')>=0)){return formatError(value);}// Some type of object without properties can be shortcutted.
if(keys.length===0){if(isFunction(value)){var name=value.name?': '+value.name:'';return ctx.stylize('[Function'+name+']','special');}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),'date');}if(isError(value)){return formatError(value);}}var base='',array=false,braces=['{','}'];// Make Array say that they are Array
if(isArray(value)){array=true;braces=['[',']'];}// Make functions say that they are functions
if(isFunction(value)){var n=value.name?': '+value.name:'';base=' [Function'+n+']';}// Make RegExps say that they are RegExps
if(isRegExp(value)){base=' '+RegExp.prototype.toString.call(value);}// Make dates with properties first say the date
if(isDate(value)){base=' '+Date.prototype.toUTCString.call(value);}// Make error with message first say the error
if(isError(value)){base=' '+formatError(value);}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1];}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else{return ctx.stylize('[Object]','special');}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}ctx.seen.pop();return reduceToSingleString(output,base,braces);}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize('undefined','undefined');if(isString(value)){var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').replace(/'/g,"\\'").replace(/\\"/g,'"')+'\'';return ctx.stylize(simple,'string');}if(isNumber(value))return ctx.stylize(''+value,'number');if(isBoolean(value))return ctx.stylize(''+value,'boolean');// For some reason typeof null is "object", so special case here.
if(isNull(value))return ctx.stylize('null','null');}function formatError(value){return'['+Error.prototype.toString.call(value)+']';}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true));}else{output.push('');}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true));}});return output;}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize('[Getter/Setter]','special');}else{str=ctx.stylize('[Getter]','special');}}else{if(desc.set){str=ctx.stylize('[Setter]','special');}}if(!hasOwnProperty(visibleKeys,key)){name='['+key+']';}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null);}else{str=formatValue(ctx,desc.value,recurseTimes-1);}if(str.indexOf('\n')>-1){if(array){str=str.split('\n').map(function(line){return'  '+line;}).join('\n').substr(2);}else{str='\n'+str.split('\n').map(function(line){return'   '+line;}).join('\n');}}}else{str=ctx.stylize('[Circular]','special');}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str;}name=JSON.stringify(''+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,'name');}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,'string');}}return name+': '+str;}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf('\n')>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},0);if(length>60){return braces[0]+(base===''?'':base+'\n ')+' '+output.join(',\n  ')+' '+braces[1];}return braces[0]+base+' '+output.join(', ')+' '+braces[1];}// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar){return Array.isArray(ar);}exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean';}exports.isBoolean=isBoolean;function isNull(arg){return arg===null;}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null;}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number';}exports.isNumber=isNumber;function isString(arg){return typeof arg==='string';}exports.isString=isString;function isSymbol(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='symbol';}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0;}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==='[object RegExp]';}exports.isRegExp=isRegExp;function isObject(arg){return(typeof arg==="undefined"?"undefined":_typeof(arg))==='object'&&arg!==null;}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==='[object Date]';}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==='[object Error]'||e instanceof Error);}exports.isError=isError;function isFunction(arg){return typeof arg==='function';}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||(typeof arg==="undefined"?"undefined":_typeof(arg))==='symbol'||// ES6 symbol
typeof arg==='undefined';}exports.isPrimitive=isPrimitive;exports.isBuffer=require('./support/isBuffer');function objectToString(o){return Object.prototype.toString.call(o);}function pad(n){return n<10?'0'+n.toString(10):n.toString(10);}var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];// 26 Feb 16:19:34
function timestamp(){var d=new Date();var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(':');return[d.getDate(),months[d.getMonth()],time].join(' ');}// log is just a thin wrapper to console.log that prepends a timestamp
exports.log=function(){console.log('%s - %s',timestamp(),exports.format.apply(exports,arguments));};/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */exports.inherits=require('inherits');exports._extend=function(origin,add){// Don't do anything if add isn't an object
if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]];}return origin;};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./support/isBuffer":53,"_process":23,"inherits":20}],55:[function(require,module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){var target={};for(var i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}},{}],56:[function(require,module,exports){(function(process){var path=require('path');var minimist=require('minimist');var wordwrap=require('wordwrap');/*  Hack an instance of Argv with process.argv into Argv
    so people can do
        require('optimist')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
        require('optimist').argv
    to get a parsed version of process.argv.
*/var inst=Argv(process.argv.slice(2));Object.keys(inst).forEach(function(key){Argv[key]=typeof inst[key]=='function'?inst[key].bind(inst):inst[key];});var exports=module.exports=Argv;function Argv(processArgs,cwd){var self={};if(!cwd)cwd=process.cwd();self.$0=process.argv.slice(0,2).map(function(x){var b=rebase(cwd,x);return x.match(/^\//)&&b.length<x.length?b:x;}).join(' ');if(process.env._!=undefined&&process.argv[1]==process.env._){self.$0=process.env._.replace(path.dirname(process.execPath)+'/','');}var options={boolean:[],string:[],alias:{},default:[]};self.boolean=function(bools){options.boolean.push.apply(options.boolean,[].concat(bools));return self;};self.string=function(strings){options.string.push.apply(options.string,[].concat(strings));return self;};self.default=function(key,value){if((typeof key==="undefined"?"undefined":_typeof(key))==='object'){Object.keys(key).forEach(function(k){self.default(k,key[k]);});}else{options.default[key]=value;}return self;};self.alias=function(x,y){if((typeof x==="undefined"?"undefined":_typeof(x))==='object'){Object.keys(x).forEach(function(key){self.alias(key,x[key]);});}else{options.alias[x]=(options.alias[x]||[]).concat(y);}return self;};var demanded={};self.demand=function(keys){if(typeof keys=='number'){if(!demanded._)demanded._=0;demanded._+=keys;}else if(Array.isArray(keys)){keys.forEach(function(key){self.demand(key);});}else{demanded[keys]=true;}return self;};var usage;self.usage=function(msg,opts){if(!opts&&(typeof msg==="undefined"?"undefined":_typeof(msg))==='object'){opts=msg;msg=null;}usage=msg;if(opts)self.options(opts);return self;};function fail(msg){self.showHelp();if(msg)console.error(msg);process.exit(1);}var checks=[];self.check=function(f){checks.push(f);return self;};var descriptions={};self.describe=function(key,desc){if((typeof key==="undefined"?"undefined":_typeof(key))==='object'){Object.keys(key).forEach(function(k){self.describe(k,key[k]);});}else{descriptions[key]=desc;}return self;};self.parse=function(args){return parseArgs(args);};self.option=self.options=function(key,opt){if((typeof key==="undefined"?"undefined":_typeof(key))==='object'){Object.keys(key).forEach(function(k){self.options(k,key[k]);});}else{if(opt.alias)self.alias(key,opt.alias);if(opt.demand)self.demand(key);if(typeof opt.default!=='undefined'){self.default(key,opt.default);}if(opt.boolean||opt.type==='boolean'){self.boolean(key);}if(opt.string||opt.type==='string'){self.string(key);}var desc=opt.describe||opt.description||opt.desc;if(desc){self.describe(key,desc);}}return self;};var wrap=null;self.wrap=function(cols){wrap=cols;return self;};self.showHelp=function(fn){if(!fn)fn=console.error;fn(self.help());};self.help=function(){var keys=Object.keys(Object.keys(descriptions).concat(Object.keys(demanded)).concat(Object.keys(options.default)).reduce(function(acc,key){if(key!=='_')acc[key]=true;return acc;},{}));var help=keys.length?['Options:']:[];if(usage){help.unshift(usage.replace(/\$0/g,self.$0),'');}var switches=keys.reduce(function(acc,key){acc[key]=[key].concat(options.alias[key]||[]).map(function(sw){return(sw.length>1?'--':'-')+sw;}).join(', ');return acc;},{});var switchlen=longest(Object.keys(switches).map(function(s){return switches[s]||'';}));var desclen=longest(Object.keys(descriptions).map(function(d){return descriptions[d]||'';}));keys.forEach(function(key){var kswitch=switches[key];var desc=descriptions[key]||'';if(wrap){desc=wordwrap(switchlen+4,wrap)(desc).slice(switchlen+4);}var spadding=new Array(Math.max(switchlen-kswitch.length+3,0)).join(' ');var dpadding=new Array(Math.max(desclen-desc.length+1,0)).join(' ');var type=null;if(options.boolean[key])type='[boolean]';if(options.string[key])type='[string]';if(!wrap&&dpadding.length>0){desc+=dpadding;}var prelude='  '+kswitch+spadding;var extra=[type,demanded[key]?'[required]':null,options.default[key]!==undefined?'[default: '+JSON.stringify(options.default[key])+']':null].filter(Boolean).join('  ');var body=[desc,extra].filter(Boolean).join('  ');if(wrap){var dlines=desc.split('\n');var dlen=dlines.slice(-1)[0].length+(dlines.length===1?prelude.length:0);body=desc+(dlen+extra.length>wrap-2?'\n'+new Array(wrap-extra.length+1).join(' ')+extra:new Array(wrap-extra.length-dlen+1).join(' ')+extra);}help.push(prelude+body);});help.push('');return help.join('\n');};Object.defineProperty(self,'argv',{get:function get(){return parseArgs(processArgs);},enumerable:true});function parseArgs(args){var argv=minimist(args,options);argv.$0=self.$0;if(demanded._&&argv._.length<demanded._){fail('Not enough non-option arguments: got '+argv._.length+', need at least '+demanded._);}var missing=[];Object.keys(demanded).forEach(function(key){if(!argv[key])missing.push(key);});if(missing.length){fail('Missing required arguments: '+missing.join(', '));}checks.forEach(function(f){try{if(f(argv)===false){fail('Argument check failed: '+f.toString());}}catch(err){fail(err);}});return argv;}function longest(xs){return Math.max.apply(null,xs.map(function(x){return x.length;}));}return self;};// rebase an absolute path to a relative one with respect to a base directory
// exported for tests
exports.rebase=rebase;function rebase(base,dir){var ds=path.normalize(dir).split('/').slice(1);var bs=path.normalize(base).split('/').slice(1);for(var i=0;ds[i]&&ds[i]==bs[i];i++){}ds.splice(0,i);bs.splice(0,i);var p=path.normalize(bs.map(function(){return'..';}).concat(ds).join('/')).replace(/\/$/,'').replace(/^$/,'.');return p.match(/^[.\/]/)?p:'./'+p;};}).call(this,require('_process'));},{"_process":23,"minimist":57,"path":22,"wordwrap":58}],57:[function(require,module,exports){module.exports=function(args,opts){if(!opts)opts={};var flags={bools:{},strings:{}};[].concat(opts['boolean']).filter(Boolean).forEach(function(key){flags.bools[key]=true;});var aliases={};Object.keys(opts.alias||{}).forEach(function(key){aliases[key]=[].concat(opts.alias[key]);aliases[key].forEach(function(x){aliases[x]=[key].concat(aliases[key].filter(function(y){return x!==y;}));});});[].concat(opts.string).filter(Boolean).forEach(function(key){flags.strings[key]=true;if(aliases[key]){flags.strings[aliases[key]]=true;}});var defaults=opts['default']||{};var argv={_:[]};Object.keys(flags.bools).forEach(function(key){setArg(key,defaults[key]===undefined?false:defaults[key]);});var notFlags=[];if(args.indexOf('--')!==-1){notFlags=args.slice(args.indexOf('--')+1);args=args.slice(0,args.indexOf('--'));}function setArg(key,val){var value=!flags.strings[key]&&isNumber(val)?Number(val):val;setKey(argv,key.split('.'),value);(aliases[key]||[]).forEach(function(x){setKey(argv,x.split('.'),value);});}for(var i=0;i<args.length;i++){var arg=args[i];if(/^--.+=/.test(arg)){// Using [\s\S] instead of . because js doesn't support the
// 'dotall' regex modifier. See:
// http://stackoverflow.com/a/1068308/13216
var m=arg.match(/^--([^=]+)=([\s\S]*)$/);setArg(m[1],m[2]);}else if(/^--no-.+/.test(arg)){var key=arg.match(/^--no-(.+)/)[1];setArg(key,false);}else if(/^--.+/.test(arg)){var key=arg.match(/^--(.+)/)[1];var next=args[i+1];if(next!==undefined&&!/^-/.test(next)&&!flags.bools[key]&&(aliases[key]?!flags.bools[aliases[key]]:true)){setArg(key,next);i++;}else if(/^(true|false)$/.test(next)){setArg(key,next==='true');i++;}else{setArg(key,flags.strings[key]?'':true);}}else if(/^-[^-]+/.test(arg)){var letters=arg.slice(1,-1).split('');var broken=false;for(var j=0;j<letters.length;j++){var next=arg.slice(j+2);if(next==='-'){setArg(letters[j],next);continue;}if(/[A-Za-z]/.test(letters[j])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(next)){setArg(letters[j],next);broken=true;break;}if(letters[j+1]&&letters[j+1].match(/\W/)){setArg(letters[j],arg.slice(j+2));broken=true;break;}else{setArg(letters[j],flags.strings[letters[j]]?'':true);}}var key=arg.slice(-1)[0];if(!broken&&key!=='-'){if(args[i+1]&&!/^(-|--)[^-]/.test(args[i+1])&&!flags.bools[key]&&(aliases[key]?!flags.bools[aliases[key]]:true)){setArg(key,args[i+1]);i++;}else if(args[i+1]&&/true|false/.test(args[i+1])){setArg(key,args[i+1]==='true');i++;}else{setArg(key,flags.strings[key]?'':true);}}}else{argv._.push(flags.strings['_']||!isNumber(arg)?arg:Number(arg));}}Object.keys(defaults).forEach(function(key){if(!hasKey(argv,key.split('.'))){setKey(argv,key.split('.'),defaults[key]);(aliases[key]||[]).forEach(function(x){setKey(argv,x.split('.'),defaults[key]);});}});notFlags.forEach(function(key){argv._.push(key);});return argv;};function hasKey(obj,keys){var o=obj;keys.slice(0,-1).forEach(function(key){o=o[key]||{};});var key=keys[keys.length-1];return key in o;}function setKey(obj,keys,value){var o=obj;keys.slice(0,-1).forEach(function(key){if(o[key]===undefined)o[key]={};o=o[key];});var key=keys[keys.length-1];if(o[key]===undefined||typeof o[key]==='boolean'){o[key]=value;}else if(Array.isArray(o[key])){o[key].push(value);}else{o[key]=[o[key],value];}}function isNumber(x){if(typeof x==='number')return true;if(/^0x[0-9a-f]+$/i.test(x))return true;return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);}},{}],58:[function(require,module,exports){var wordwrap=module.exports=function(start,stop,params){if((typeof start==="undefined"?"undefined":_typeof(start))==='object'){params=start;start=params.start;stop=params.stop;}if((typeof stop==="undefined"?"undefined":_typeof(stop))==='object'){params=stop;start=start||params.start;stop=undefined;}if(!stop){stop=start;start=0;}if(!params)params={};var mode=params.mode||'soft';var re=mode==='hard'?/\b/:/(\S+\s+)/;return function(text){var chunks=text.toString().split(re).reduce(function(acc,x){if(mode==='hard'){for(var i=0;i<x.length;i+=stop-start){acc.push(x.slice(i,i+stop-start));}}else acc.push(x);return acc;},[]);return chunks.reduce(function(lines,rawChunk){if(rawChunk==='')return lines;var chunk=rawChunk.replace(/\t/g,'    ');var i=lines.length-1;if(lines[i].length+chunk.length>stop){lines[i]=lines[i].replace(/\s+$/,'');chunk.split(/\n/).forEach(function(c){lines.push(new Array(start+1).join(' ')+c.replace(/^\s+/,''));});}else if(chunk.match(/\n/)){var xs=chunk.split(/\n/);lines[i]+=xs.shift();xs.forEach(function(c){lines.push(new Array(start+1).join(' ')+c.replace(/^\s+/,''));});}else{lines[i]+=chunk;}return lines;},[new Array(start+1).join(' ')]).join('\n');};};wordwrap.soft=wordwrap;wordwrap.hard=function(start,stop){return wordwrap(start,stop,{mode:'hard'});};},{}],59:[function(require,module,exports){(function(Buffer){;(function(sax){// wrapper for non-node envs
sax.parser=function(strict,opt){return new SAXParser(strict,opt);};sax.SAXParser=SAXParser;sax.SAXStream=SAXStream;sax.createStream=createStream;// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
sax.MAX_BUFFER_LENGTH=64*1024;var buffers=['comment','sgmlDecl','textNode','tagName','doctype','procInstName','procInstBody','entity','attribName','attribValue','cdata','script'];sax.EVENTS=['text','processinginstruction','sgmldeclaration','doctype','comment','opentagstart','attribute','opentag','closetag','opencdata','cdata','closecdata','error','end','ready','script','opennamespace','closenamespace'];function SAXParser(strict,opt){if(!(this instanceof SAXParser)){return new SAXParser(strict,opt);}var parser=this;clearBuffers(parser);parser.q=parser.c='';parser.bufferCheckPosition=sax.MAX_BUFFER_LENGTH;parser.opt=opt||{};parser.opt.lowercase=parser.opt.lowercase||parser.opt.lowercasetags;parser.looseCase=parser.opt.lowercase?'toLowerCase':'toUpperCase';parser.tags=[];parser.closed=parser.closedRoot=parser.sawRoot=false;parser.tag=parser.error=null;parser.strict=!!strict;parser.noscript=!!(strict||parser.opt.noscript);parser.state=S.BEGIN;parser.strictEntities=parser.opt.strictEntities;parser.ENTITIES=parser.strictEntities?Object.create(sax.XML_ENTITIES):Object.create(sax.ENTITIES);parser.attribList=[];// namespaces form a prototype chain.
// it always points at the current tag,
// which protos to its parent tag.
if(parser.opt.xmlns){parser.ns=Object.create(rootNS);}// mostly just for error reporting
parser.trackPosition=parser.opt.position!==false;if(parser.trackPosition){parser.position=parser.line=parser.column=0;}emit(parser,'onready');}if(!Object.create){Object.create=function(o){function F(){}F.prototype=o;var newf=new F();return newf;};}if(!Object.keys){Object.keys=function(o){var a=[];for(var i in o){if(o.hasOwnProperty(i))a.push(i);}return a;};}function checkBufferLength(parser){var maxAllowed=Math.max(sax.MAX_BUFFER_LENGTH,10);var maxActual=0;for(var i=0,l=buffers.length;i<l;i++){var len=parser[buffers[i]].length;if(len>maxAllowed){// Text/cdata nodes can get big, and since they're buffered,
// we can get here under normal conditions.
// Avoid issues by emitting the text node now,
// so at least it won't get any bigger.
switch(buffers[i]){case'textNode':closeText(parser);break;case'cdata':emitNode(parser,'oncdata',parser.cdata);parser.cdata='';break;case'script':emitNode(parser,'onscript',parser.script);parser.script='';break;default:error(parser,'Max buffer length exceeded: '+buffers[i]);}}maxActual=Math.max(maxActual,len);}// schedule the next check for the earliest possible buffer overrun.
var m=sax.MAX_BUFFER_LENGTH-maxActual;parser.bufferCheckPosition=m+parser.position;}function clearBuffers(parser){for(var i=0,l=buffers.length;i<l;i++){parser[buffers[i]]='';}}function flushBuffers(parser){closeText(parser);if(parser.cdata!==''){emitNode(parser,'oncdata',parser.cdata);parser.cdata='';}if(parser.script!==''){emitNode(parser,'onscript',parser.script);parser.script='';}}SAXParser.prototype={end:function end(){_end(this);},write:write,resume:function resume(){this.error=null;return this;},close:function close(){return this.write(null);},flush:function flush(){flushBuffers(this);}};var Stream;try{Stream=require('stream').Stream;}catch(ex){Stream=function Stream(){};}var streamWraps=sax.EVENTS.filter(function(ev){return ev!=='error'&&ev!=='end';});function createStream(strict,opt){return new SAXStream(strict,opt);}function SAXStream(strict,opt){if(!(this instanceof SAXStream)){return new SAXStream(strict,opt);}Stream.apply(this);this._parser=new SAXParser(strict,opt);this.writable=true;this.readable=true;var me=this;this._parser.onend=function(){me.emit('end');};this._parser.onerror=function(er){me.emit('error',er);// if didn't throw, then means error was handled.
// go ahead and clear error, so we can write again.
me._parser.error=null;};this._decoder=null;streamWraps.forEach(function(ev){Object.defineProperty(me,'on'+ev,{get:function get(){return me._parser['on'+ev];},set:function set(h){if(!h){me.removeAllListeners(ev);me._parser['on'+ev]=h;return h;}me.on(ev,h);},enumerable:true,configurable:false});});}SAXStream.prototype=Object.create(Stream.prototype,{constructor:{value:SAXStream}});SAXStream.prototype.write=function(data){if(typeof Buffer==='function'&&typeof Buffer.isBuffer==='function'&&Buffer.isBuffer(data)){if(!this._decoder){var SD=require('string_decoder').StringDecoder;this._decoder=new SD('utf8');}data=this._decoder.write(data);}this._parser.write(data.toString());this.emit('data',data);return true;};SAXStream.prototype.end=function(chunk){if(chunk&&chunk.length){this.write(chunk);}this._parser.end();return true;};SAXStream.prototype.on=function(ev,handler){var me=this;if(!me._parser['on'+ev]&&streamWraps.indexOf(ev)!==-1){me._parser['on'+ev]=function(){var args=arguments.length===1?[arguments[0]]:Array.apply(null,arguments);args.splice(0,0,ev);me.emit.apply(me,args);};}return Stream.prototype.on.call(me,ev,handler);};// character classes and tokens
var whitespace='\r\n\t ';// this really needs to be replaced with character classes.
// XML allows all manner of ridiculous numbers and digits.
var number='0124356789';var letter='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';// (Letter | "_" | ":")
var quote='\'"';var attribEnd=whitespace+'>';var CDATA='[CDATA[';var DOCTYPE='DOCTYPE';var XML_NAMESPACE='http://www.w3.org/XML/1998/namespace';var XMLNS_NAMESPACE='http://www.w3.org/2000/xmlns/';var rootNS={xml:XML_NAMESPACE,xmlns:XMLNS_NAMESPACE};// turn all the string character sets into character class objects.
whitespace=charClass(whitespace);number=charClass(number);letter=charClass(letter);// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
// This implementation works on strings, a single character at a time
// as such, it cannot ever support astral-plane characters (10000-EFFFF)
// without a significant breaking change to either this  parser, or the
// JavaScript language.  Implementation of an emoji-capable xml parser
// is left as an exercise for the reader.
var nameStart=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;var nameBody=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;var entityStart=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;var entityBody=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/;quote=charClass(quote);attribEnd=charClass(attribEnd);function charClass(str){return str.split('').reduce(function(s,c){s[c]=true;return s;},{});}function isRegExp(c){return Object.prototype.toString.call(c)==='[object RegExp]';}function is(charclass,c){return isRegExp(charclass)?!!c.match(charclass):charclass[c];}function not(charclass,c){return!is(charclass,c);}var S=0;sax.STATE={BEGIN:S++,// leading byte order mark or whitespace
BEGIN_WHITESPACE:S++,// leading whitespace
TEXT:S++,// general stuff
TEXT_ENTITY:S++,// &amp and such.
OPEN_WAKA:S++,// <
SGML_DECL:S++,// <!BLARG
SGML_DECL_QUOTED:S++,// <!BLARG foo "bar
DOCTYPE:S++,// <!DOCTYPE
DOCTYPE_QUOTED:S++,// <!DOCTYPE "//blah
DOCTYPE_DTD:S++,// <!DOCTYPE "//blah" [ ...
DOCTYPE_DTD_QUOTED:S++,// <!DOCTYPE "//blah" [ "foo
COMMENT_STARTING:S++,// <!-
COMMENT:S++,// <!--
COMMENT_ENDING:S++,// <!-- blah -
COMMENT_ENDED:S++,// <!-- blah --
CDATA:S++,// <![CDATA[ something
CDATA_ENDING:S++,// ]
CDATA_ENDING_2:S++,// ]]
PROC_INST:S++,// <?hi
PROC_INST_BODY:S++,// <?hi there
PROC_INST_ENDING:S++,// <?hi "there" ?
OPEN_TAG:S++,// <strong
OPEN_TAG_SLASH:S++,// <strong /
ATTRIB:S++,// <a
ATTRIB_NAME:S++,// <a foo
ATTRIB_NAME_SAW_WHITE:S++,// <a foo _
ATTRIB_VALUE:S++,// <a foo=
ATTRIB_VALUE_QUOTED:S++,// <a foo="bar
ATTRIB_VALUE_CLOSED:S++,// <a foo="bar"
ATTRIB_VALUE_UNQUOTED:S++,// <a foo=bar
ATTRIB_VALUE_ENTITY_Q:S++,// <foo bar="&quot;"
ATTRIB_VALUE_ENTITY_U:S++,// <foo bar=&quot
CLOSE_TAG:S++,// </a
CLOSE_TAG_SAW_WHITE:S++,// </a   >
SCRIPT:S++,// <script> ...
SCRIPT_ENDING:S++// <script> ... <
};sax.XML_ENTITIES={'amp':'&','gt':'>','lt':'<','quot':'"','apos':"'"};sax.ENTITIES={'amp':'&','gt':'>','lt':'<','quot':'"','apos':"'",'AElig':198,'Aacute':193,'Acirc':194,'Agrave':192,'Aring':197,'Atilde':195,'Auml':196,'Ccedil':199,'ETH':208,'Eacute':201,'Ecirc':202,'Egrave':200,'Euml':203,'Iacute':205,'Icirc':206,'Igrave':204,'Iuml':207,'Ntilde':209,'Oacute':211,'Ocirc':212,'Ograve':210,'Oslash':216,'Otilde':213,'Ouml':214,'THORN':222,'Uacute':218,'Ucirc':219,'Ugrave':217,'Uuml':220,'Yacute':221,'aacute':225,'acirc':226,'aelig':230,'agrave':224,'aring':229,'atilde':227,'auml':228,'ccedil':231,'eacute':233,'ecirc':234,'egrave':232,'eth':240,'euml':235,'iacute':237,'icirc':238,'igrave':236,'iuml':239,'ntilde':241,'oacute':243,'ocirc':244,'ograve':242,'oslash':248,'otilde':245,'ouml':246,'szlig':223,'thorn':254,'uacute':250,'ucirc':251,'ugrave':249,'uuml':252,'yacute':253,'yuml':255,'copy':169,'reg':174,'nbsp':160,'iexcl':161,'cent':162,'pound':163,'curren':164,'yen':165,'brvbar':166,'sect':167,'uml':168,'ordf':170,'laquo':171,'not':172,'shy':173,'macr':175,'deg':176,'plusmn':177,'sup1':185,'sup2':178,'sup3':179,'acute':180,'micro':181,'para':182,'middot':183,'cedil':184,'ordm':186,'raquo':187,'frac14':188,'frac12':189,'frac34':190,'iquest':191,'times':215,'divide':247,'OElig':338,'oelig':339,'Scaron':352,'scaron':353,'Yuml':376,'fnof':402,'circ':710,'tilde':732,'Alpha':913,'Beta':914,'Gamma':915,'Delta':916,'Epsilon':917,'Zeta':918,'Eta':919,'Theta':920,'Iota':921,'Kappa':922,'Lambda':923,'Mu':924,'Nu':925,'Xi':926,'Omicron':927,'Pi':928,'Rho':929,'Sigma':931,'Tau':932,'Upsilon':933,'Phi':934,'Chi':935,'Psi':936,'Omega':937,'alpha':945,'beta':946,'gamma':947,'delta':948,'epsilon':949,'zeta':950,'eta':951,'theta':952,'iota':953,'kappa':954,'lambda':955,'mu':956,'nu':957,'xi':958,'omicron':959,'pi':960,'rho':961,'sigmaf':962,'sigma':963,'tau':964,'upsilon':965,'phi':966,'chi':967,'psi':968,'omega':969,'thetasym':977,'upsih':978,'piv':982,'ensp':8194,'emsp':8195,'thinsp':8201,'zwnj':8204,'zwj':8205,'lrm':8206,'rlm':8207,'ndash':8211,'mdash':8212,'lsquo':8216,'rsquo':8217,'sbquo':8218,'ldquo':8220,'rdquo':8221,'bdquo':8222,'dagger':8224,'Dagger':8225,'bull':8226,'hellip':8230,'permil':8240,'prime':8242,'Prime':8243,'lsaquo':8249,'rsaquo':8250,'oline':8254,'frasl':8260,'euro':8364,'image':8465,'weierp':8472,'real':8476,'trade':8482,'alefsym':8501,'larr':8592,'uarr':8593,'rarr':8594,'darr':8595,'harr':8596,'crarr':8629,'lArr':8656,'uArr':8657,'rArr':8658,'dArr':8659,'hArr':8660,'forall':8704,'part':8706,'exist':8707,'empty':8709,'nabla':8711,'isin':8712,'notin':8713,'ni':8715,'prod':8719,'sum':8721,'minus':8722,'lowast':8727,'radic':8730,'prop':8733,'infin':8734,'ang':8736,'and':8743,'or':8744,'cap':8745,'cup':8746,'int':8747,'there4':8756,'sim':8764,'cong':8773,'asymp':8776,'ne':8800,'equiv':8801,'le':8804,'ge':8805,'sub':8834,'sup':8835,'nsub':8836,'sube':8838,'supe':8839,'oplus':8853,'otimes':8855,'perp':8869,'sdot':8901,'lceil':8968,'rceil':8969,'lfloor':8970,'rfloor':8971,'lang':9001,'rang':9002,'loz':9674,'spades':9824,'clubs':9827,'hearts':9829,'diams':9830};Object.keys(sax.ENTITIES).forEach(function(key){var e=sax.ENTITIES[key];var s=typeof e==='number'?String.fromCharCode(e):e;sax.ENTITIES[key]=s;});for(var s in sax.STATE){sax.STATE[sax.STATE[s]]=s;}// shorthand
S=sax.STATE;function emit(parser,event,data){parser[event]&&parser[event](data);}function emitNode(parser,nodeType,data){if(parser.textNode)closeText(parser);emit(parser,nodeType,data);}function closeText(parser){parser.textNode=textopts(parser.opt,parser.textNode);if(parser.textNode)emit(parser,'ontext',parser.textNode);parser.textNode='';}function textopts(opt,text){if(opt.trim)text=text.trim();if(opt.normalize)text=text.replace(/\s+/g,' ');return text;}function error(parser,er){closeText(parser);if(parser.trackPosition){er+='\nLine: '+parser.line+'\nColumn: '+parser.column+'\nChar: '+parser.c;}er=new Error(er);parser.error=er;emit(parser,'onerror',er);return parser;}function _end(parser){if(parser.sawRoot&&!parser.closedRoot)strictFail(parser,'Unclosed root tag');if(parser.state!==S.BEGIN&&parser.state!==S.BEGIN_WHITESPACE&&parser.state!==S.TEXT){error(parser,'Unexpected end');}closeText(parser);parser.c='';parser.closed=true;emit(parser,'onend');SAXParser.call(parser,parser.strict,parser.opt);return parser;}function strictFail(parser,message){if((typeof parser==="undefined"?"undefined":_typeof(parser))!=='object'||!(parser instanceof SAXParser)){throw new Error('bad call to strictFail');}if(parser.strict){error(parser,message);}}function newTag(parser){if(!parser.strict)parser.tagName=parser.tagName[parser.looseCase]();var parent=parser.tags[parser.tags.length-1]||parser;var tag=parser.tag={name:parser.tagName,attributes:{}};// will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
if(parser.opt.xmlns){tag.ns=parent.ns;}parser.attribList.length=0;emitNode(parser,'onopentagstart',tag);}function qname(name,attribute){var i=name.indexOf(':');var qualName=i<0?['',name]:name.split(':');var prefix=qualName[0];var local=qualName[1];// <x "xmlns"="http://foo">
if(attribute&&name==='xmlns'){prefix='xmlns';local='';}return{prefix:prefix,local:local};}function attrib(parser){if(!parser.strict){parser.attribName=parser.attribName[parser.looseCase]();}if(parser.attribList.indexOf(parser.attribName)!==-1||parser.tag.attributes.hasOwnProperty(parser.attribName)){parser.attribName=parser.attribValue='';return;}if(parser.opt.xmlns){var qn=qname(parser.attribName,true);var prefix=qn.prefix;var local=qn.local;if(prefix==='xmlns'){// namespace binding attribute. push the binding into scope
if(local==='xml'&&parser.attribValue!==XML_NAMESPACE){strictFail(parser,'xml: prefix must be bound to '+XML_NAMESPACE+'\n'+'Actual: '+parser.attribValue);}else if(local==='xmlns'&&parser.attribValue!==XMLNS_NAMESPACE){strictFail(parser,'xmlns: prefix must be bound to '+XMLNS_NAMESPACE+'\n'+'Actual: '+parser.attribValue);}else{var tag=parser.tag;var parent=parser.tags[parser.tags.length-1]||parser;if(tag.ns===parent.ns){tag.ns=Object.create(parent.ns);}tag.ns[local]=parser.attribValue;}}// defer onattribute events until all attributes have been seen
// so any new bindings can take effect. preserve attribute order
// so deferred events can be emitted in document order
parser.attribList.push([parser.attribName,parser.attribValue]);}else{// in non-xmlns mode, we can emit the event right away
parser.tag.attributes[parser.attribName]=parser.attribValue;emitNode(parser,'onattribute',{name:parser.attribName,value:parser.attribValue});}parser.attribName=parser.attribValue='';}function openTag(parser,selfClosing){if(parser.opt.xmlns){// emit namespace binding events
var tag=parser.tag;// add namespace info to tag
var qn=qname(parser.tagName);tag.prefix=qn.prefix;tag.local=qn.local;tag.uri=tag.ns[qn.prefix]||'';if(tag.prefix&&!tag.uri){strictFail(parser,'Unbound namespace prefix: '+JSON.stringify(parser.tagName));tag.uri=qn.prefix;}var parent=parser.tags[parser.tags.length-1]||parser;if(tag.ns&&parent.ns!==tag.ns){Object.keys(tag.ns).forEach(function(p){emitNode(parser,'onopennamespace',{prefix:p,uri:tag.ns[p]});});}// handle deferred onattribute events
// Note: do not apply default ns to attributes:
//   http://www.w3.org/TR/REC-xml-names/#defaulting
for(var i=0,l=parser.attribList.length;i<l;i++){var nv=parser.attribList[i];var name=nv[0];var value=nv[1];var qualName=qname(name,true);var prefix=qualName.prefix;var local=qualName.local;var uri=prefix===''?'':tag.ns[prefix]||'';var a={name:name,value:value,prefix:prefix,local:local,uri:uri};// if there's any attributes with an undefined namespace,
// then fail on them now.
if(prefix&&prefix!=='xmlns'&&!uri){strictFail(parser,'Unbound namespace prefix: '+JSON.stringify(prefix));a.uri=prefix;}parser.tag.attributes[name]=a;emitNode(parser,'onattribute',a);}parser.attribList.length=0;}parser.tag.isSelfClosing=!!selfClosing;// process the tag
parser.sawRoot=true;parser.tags.push(parser.tag);emitNode(parser,'onopentag',parser.tag);if(!selfClosing){// special case for <script> in non-strict mode.
if(!parser.noscript&&parser.tagName.toLowerCase()==='script'){parser.state=S.SCRIPT;}else{parser.state=S.TEXT;}parser.tag=null;parser.tagName='';}parser.attribName=parser.attribValue='';parser.attribList.length=0;}function closeTag(parser){if(!parser.tagName){strictFail(parser,'Weird empty close tag.');parser.textNode+='</>';parser.state=S.TEXT;return;}if(parser.script){if(parser.tagName!=='script'){parser.script+='</'+parser.tagName+'>';parser.tagName='';parser.state=S.SCRIPT;return;}emitNode(parser,'onscript',parser.script);parser.script='';}// first make sure that the closing tag actually exists.
// <a><b></c></b></a> will close everything, otherwise.
var t=parser.tags.length;var tagName=parser.tagName;if(!parser.strict){tagName=tagName[parser.looseCase]();}var closeTo=tagName;while(t--){var close=parser.tags[t];if(close.name!==closeTo){// fail the first time in strict mode
strictFail(parser,'Unexpected close tag');}else{break;}}// didn't find it.  we already failed for strict, so just abort.
if(t<0){strictFail(parser,'Unmatched closing tag: '+parser.tagName);parser.textNode+='</'+parser.tagName+'>';parser.state=S.TEXT;return;}parser.tagName=tagName;var s=parser.tags.length;while(s-->t){var tag=parser.tag=parser.tags.pop();parser.tagName=parser.tag.name;emitNode(parser,'onclosetag',parser.tagName);var x={};for(var i in tag.ns){x[i]=tag.ns[i];}var parent=parser.tags[parser.tags.length-1]||parser;if(parser.opt.xmlns&&tag.ns!==parent.ns){// remove namespace bindings introduced by tag
Object.keys(tag.ns).forEach(function(p){var n=tag.ns[p];emitNode(parser,'onclosenamespace',{prefix:p,uri:n});});}}if(t===0)parser.closedRoot=true;parser.tagName=parser.attribValue=parser.attribName='';parser.attribList.length=0;parser.state=S.TEXT;}function parseEntity(parser){var entity=parser.entity;var entityLC=entity.toLowerCase();var num;var numStr='';if(parser.ENTITIES[entity]){return parser.ENTITIES[entity];}if(parser.ENTITIES[entityLC]){return parser.ENTITIES[entityLC];}entity=entityLC;if(entity.charAt(0)==='#'){if(entity.charAt(1)==='x'){entity=entity.slice(2);num=parseInt(entity,16);numStr=num.toString(16);}else{entity=entity.slice(1);num=parseInt(entity,10);numStr=num.toString(10);}}entity=entity.replace(/^0+/,'');if(numStr.toLowerCase()!==entity){strictFail(parser,'Invalid character entity');return'&'+parser.entity+';';}return String.fromCodePoint(num);}function beginWhiteSpace(parser,c){if(c==='<'){parser.state=S.OPEN_WAKA;parser.startTagPosition=parser.position;}else if(not(whitespace,c)){// have to process this as a text node.
// weird, but happens.
strictFail(parser,'Non-whitespace before first tag.');parser.textNode=c;parser.state=S.TEXT;}}function charAt(chunk,i){var result='';if(i<chunk.length){result=chunk.charAt(i);}return result;}function write(chunk){var parser=this;if(this.error){throw this.error;}if(parser.closed){return error(parser,'Cannot write after close. Assign an onready handler.');}if(chunk===null){return _end(parser);}if((typeof chunk==="undefined"?"undefined":_typeof(chunk))==='object'){chunk=chunk.toString();}var i=0;var c='';while(true){c=charAt(chunk,i++);parser.c=c;if(!c){break;}if(parser.trackPosition){parser.position++;if(c==='\n'){parser.line++;parser.column=0;}else{parser.column++;}}switch(parser.state){case S.BEGIN:parser.state=S.BEGIN_WHITESPACE;if(c==="﻿"){continue;}beginWhiteSpace(parser,c);continue;case S.BEGIN_WHITESPACE:beginWhiteSpace(parser,c);continue;case S.TEXT:if(parser.sawRoot&&!parser.closedRoot){var starti=i-1;while(c&&c!=='<'&&c!=='&'){c=charAt(chunk,i++);if(c&&parser.trackPosition){parser.position++;if(c==='\n'){parser.line++;parser.column=0;}else{parser.column++;}}}parser.textNode+=chunk.substring(starti,i-1);}if(c==='<'&&!(parser.sawRoot&&parser.closedRoot&&!parser.strict)){parser.state=S.OPEN_WAKA;parser.startTagPosition=parser.position;}else{if(not(whitespace,c)&&(!parser.sawRoot||parser.closedRoot)){strictFail(parser,'Text data outside of root node.');}if(c==='&'){parser.state=S.TEXT_ENTITY;}else{parser.textNode+=c;}}continue;case S.SCRIPT:// only non-strict
if(c==='<'){parser.state=S.SCRIPT_ENDING;}else{parser.script+=c;}continue;case S.SCRIPT_ENDING:if(c==='/'){parser.state=S.CLOSE_TAG;}else{parser.script+='<'+c;parser.state=S.SCRIPT;}continue;case S.OPEN_WAKA:// either a /, ?, !, or text is coming next.
if(c==='!'){parser.state=S.SGML_DECL;parser.sgmlDecl='';}else if(is(whitespace,c)){// wait for it...
}else if(is(nameStart,c)){parser.state=S.OPEN_TAG;parser.tagName=c;}else if(c==='/'){parser.state=S.CLOSE_TAG;parser.tagName='';}else if(c==='?'){parser.state=S.PROC_INST;parser.procInstName=parser.procInstBody='';}else{strictFail(parser,'Unencoded <');// if there was some whitespace, then add that in.
if(parser.startTagPosition+1<parser.position){var pad=parser.position-parser.startTagPosition;c=new Array(pad).join(' ')+c;}parser.textNode+='<'+c;parser.state=S.TEXT;}continue;case S.SGML_DECL:if((parser.sgmlDecl+c).toUpperCase()===CDATA){emitNode(parser,'onopencdata');parser.state=S.CDATA;parser.sgmlDecl='';parser.cdata='';}else if(parser.sgmlDecl+c==='--'){parser.state=S.COMMENT;parser.comment='';parser.sgmlDecl='';}else if((parser.sgmlDecl+c).toUpperCase()===DOCTYPE){parser.state=S.DOCTYPE;if(parser.doctype||parser.sawRoot){strictFail(parser,'Inappropriately located doctype declaration');}parser.doctype='';parser.sgmlDecl='';}else if(c==='>'){emitNode(parser,'onsgmldeclaration',parser.sgmlDecl);parser.sgmlDecl='';parser.state=S.TEXT;}else if(is(quote,c)){parser.state=S.SGML_DECL_QUOTED;parser.sgmlDecl+=c;}else{parser.sgmlDecl+=c;}continue;case S.SGML_DECL_QUOTED:if(c===parser.q){parser.state=S.SGML_DECL;parser.q='';}parser.sgmlDecl+=c;continue;case S.DOCTYPE:if(c==='>'){parser.state=S.TEXT;emitNode(parser,'ondoctype',parser.doctype);parser.doctype=true;// just remember that we saw it.
}else{parser.doctype+=c;if(c==='['){parser.state=S.DOCTYPE_DTD;}else if(is(quote,c)){parser.state=S.DOCTYPE_QUOTED;parser.q=c;}}continue;case S.DOCTYPE_QUOTED:parser.doctype+=c;if(c===parser.q){parser.q='';parser.state=S.DOCTYPE;}continue;case S.DOCTYPE_DTD:parser.doctype+=c;if(c===']'){parser.state=S.DOCTYPE;}else if(is(quote,c)){parser.state=S.DOCTYPE_DTD_QUOTED;parser.q=c;}continue;case S.DOCTYPE_DTD_QUOTED:parser.doctype+=c;if(c===parser.q){parser.state=S.DOCTYPE_DTD;parser.q='';}continue;case S.COMMENT:if(c==='-'){parser.state=S.COMMENT_ENDING;}else{parser.comment+=c;}continue;case S.COMMENT_ENDING:if(c==='-'){parser.state=S.COMMENT_ENDED;parser.comment=textopts(parser.opt,parser.comment);if(parser.comment){emitNode(parser,'oncomment',parser.comment);}parser.comment='';}else{parser.comment+='-'+c;parser.state=S.COMMENT;}continue;case S.COMMENT_ENDED:if(c!=='>'){strictFail(parser,'Malformed comment');// allow <!-- blah -- bloo --> in non-strict mode,
// which is a comment of " blah -- bloo "
parser.comment+='--'+c;parser.state=S.COMMENT;}else{parser.state=S.TEXT;}continue;case S.CDATA:if(c===']'){parser.state=S.CDATA_ENDING;}else{parser.cdata+=c;}continue;case S.CDATA_ENDING:if(c===']'){parser.state=S.CDATA_ENDING_2;}else{parser.cdata+=']'+c;parser.state=S.CDATA;}continue;case S.CDATA_ENDING_2:if(c==='>'){if(parser.cdata){emitNode(parser,'oncdata',parser.cdata);}emitNode(parser,'onclosecdata');parser.cdata='';parser.state=S.TEXT;}else if(c===']'){parser.cdata+=']';}else{parser.cdata+=']]'+c;parser.state=S.CDATA;}continue;case S.PROC_INST:if(c==='?'){parser.state=S.PROC_INST_ENDING;}else if(is(whitespace,c)){parser.state=S.PROC_INST_BODY;}else{parser.procInstName+=c;}continue;case S.PROC_INST_BODY:if(!parser.procInstBody&&is(whitespace,c)){continue;}else if(c==='?'){parser.state=S.PROC_INST_ENDING;}else{parser.procInstBody+=c;}continue;case S.PROC_INST_ENDING:if(c==='>'){emitNode(parser,'onprocessinginstruction',{name:parser.procInstName,body:parser.procInstBody});parser.procInstName=parser.procInstBody='';parser.state=S.TEXT;}else{parser.procInstBody+='?'+c;parser.state=S.PROC_INST_BODY;}continue;case S.OPEN_TAG:if(is(nameBody,c)){parser.tagName+=c;}else{newTag(parser);if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else{if(not(whitespace,c)){strictFail(parser,'Invalid character in tag name');}parser.state=S.ATTRIB;}}continue;case S.OPEN_TAG_SLASH:if(c==='>'){openTag(parser,true);closeTag(parser);}else{strictFail(parser,'Forward-slash in opening tag not followed by >');parser.state=S.ATTRIB;}continue;case S.ATTRIB:// haven't read the attribute name yet.
if(is(whitespace,c)){continue;}else if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else if(is(nameStart,c)){parser.attribName=c;parser.attribValue='';parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_NAME:if(c==='='){parser.state=S.ATTRIB_VALUE;}else if(c==='>'){strictFail(parser,'Attribute without value');parser.attribValue=parser.attribName;attrib(parser);openTag(parser);}else if(is(whitespace,c)){parser.state=S.ATTRIB_NAME_SAW_WHITE;}else if(is(nameBody,c)){parser.attribName+=c;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_NAME_SAW_WHITE:if(c==='='){parser.state=S.ATTRIB_VALUE;}else if(is(whitespace,c)){continue;}else{strictFail(parser,'Attribute without value');parser.tag.attributes[parser.attribName]='';parser.attribValue='';emitNode(parser,'onattribute',{name:parser.attribName,value:''});parser.attribName='';if(c==='>'){openTag(parser);}else if(is(nameStart,c)){parser.attribName=c;parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');parser.state=S.ATTRIB;}}continue;case S.ATTRIB_VALUE:if(is(whitespace,c)){continue;}else if(is(quote,c)){parser.q=c;parser.state=S.ATTRIB_VALUE_QUOTED;}else{strictFail(parser,'Unquoted attribute value');parser.state=S.ATTRIB_VALUE_UNQUOTED;parser.attribValue=c;}continue;case S.ATTRIB_VALUE_QUOTED:if(c!==parser.q){if(c==='&'){parser.state=S.ATTRIB_VALUE_ENTITY_Q;}else{parser.attribValue+=c;}continue;}attrib(parser);parser.q='';parser.state=S.ATTRIB_VALUE_CLOSED;continue;case S.ATTRIB_VALUE_CLOSED:if(is(whitespace,c)){parser.state=S.ATTRIB;}else if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else if(is(nameStart,c)){strictFail(parser,'No whitespace between attributes');parser.attribName=c;parser.attribValue='';parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_VALUE_UNQUOTED:if(not(attribEnd,c)){if(c==='&'){parser.state=S.ATTRIB_VALUE_ENTITY_U;}else{parser.attribValue+=c;}continue;}attrib(parser);if(c==='>'){openTag(parser);}else{parser.state=S.ATTRIB;}continue;case S.CLOSE_TAG:if(!parser.tagName){if(is(whitespace,c)){continue;}else if(not(nameStart,c)){if(parser.script){parser.script+='</'+c;parser.state=S.SCRIPT;}else{strictFail(parser,'Invalid tagname in closing tag.');}}else{parser.tagName=c;}}else if(c==='>'){closeTag(parser);}else if(is(nameBody,c)){parser.tagName+=c;}else if(parser.script){parser.script+='</'+parser.tagName;parser.tagName='';parser.state=S.SCRIPT;}else{if(not(whitespace,c)){strictFail(parser,'Invalid tagname in closing tag');}parser.state=S.CLOSE_TAG_SAW_WHITE;}continue;case S.CLOSE_TAG_SAW_WHITE:if(is(whitespace,c)){continue;}if(c==='>'){closeTag(parser);}else{strictFail(parser,'Invalid characters in closing tag');}continue;case S.TEXT_ENTITY:case S.ATTRIB_VALUE_ENTITY_Q:case S.ATTRIB_VALUE_ENTITY_U:var returnState;var buffer;switch(parser.state){case S.TEXT_ENTITY:returnState=S.TEXT;buffer='textNode';break;case S.ATTRIB_VALUE_ENTITY_Q:returnState=S.ATTRIB_VALUE_QUOTED;buffer='attribValue';break;case S.ATTRIB_VALUE_ENTITY_U:returnState=S.ATTRIB_VALUE_UNQUOTED;buffer='attribValue';break;}if(c===';'){parser[buffer]+=parseEntity(parser);parser.entity='';parser.state=returnState;}else if(is(parser.entity.length?entityBody:entityStart,c)){parser.entity+=c;}else{strictFail(parser,'Invalid character in entity name');parser[buffer]+='&'+parser.entity+c;parser.entity='';parser.state=returnState;}continue;default:throw new Error(parser,'Unknown state: '+parser.state);}}// while
if(parser.position>=parser.bufferCheckPosition){checkBufferLength(parser);}return parser;}/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */if(!String.fromCodePoint){(function(){var stringFromCharCode=String.fromCharCode;var floor=Math.floor;var fromCodePoint=function fromCodePoint(){var MAX_SIZE=0x4000;var codeUnits=[];var highSurrogate;var lowSurrogate;var index=-1;var length=arguments.length;if(!length){return'';}var result='';while(++index<length){var codePoint=Number(arguments[index]);if(!isFinite(codePoint)||// `NaN`, `+Infinity`, or `-Infinity`
codePoint<0||// not a valid Unicode code point
codePoint>0x10FFFF||// not a valid Unicode code point
floor(codePoint)!==codePoint// not an integer
){throw RangeError('Invalid code point: '+codePoint);}if(codePoint<=0xFFFF){// BMP code point
codeUnits.push(codePoint);}else{// Astral code point; split in surrogate halves
// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
codePoint-=0x10000;highSurrogate=(codePoint>>10)+0xD800;lowSurrogate=codePoint%0x400+0xDC00;codeUnits.push(highSurrogate,lowSurrogate);}if(index+1===length||codeUnits.length>MAX_SIZE){result+=stringFromCharCode.apply(null,codeUnits);codeUnits.length=0;}}return result;};if(Object.defineProperty){Object.defineProperty(String,'fromCodePoint',{value:fromCodePoint,configurable:true,writable:true});}else{String.fromCodePoint=fromCodePoint;}})();}})(typeof exports==='undefined'?this.sax={}:exports);}).call(this,require("buffer").Buffer);},{"buffer":15,"stream":43,"string_decoder":50}],60:[function(require,module,exports){//   Copyright 2011-2012 Jacob Beard, INFICON, and other SCION contributors
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
var extend=Object.assign||function(to,from){Object.keys(from).forEach(function(k){to[k]=from[k];});return to;};var STATE_TYPES={BASIC:0,COMPOSITE:1,PARALLEL:2,HISTORY:3,INITIAL:4,FINAL:5};var ioProcessorTypes={'scxml':{location:'http://www.w3.org/TR/scxml/#SCXMLEventProcessor'},'basichttp':{location:'http://www.w3.org/TR/scxml/#BasicHTTPEventProcessor'},'dom':{location:'http://www.w3.org/TR/scxml/#DOMEventProcessor'},'publish':{location:'https://github.com/jbeard4/SCION#publish'}};function transitionWithTargets(t){return t.targets;}function stateExitComparator(s1,s2){return s2.depth-s1.depth;}function stateEntryComparator(s1,s2){return s1.depth-s2.depth;}function transitionComparator(t1,t2){return t1.documentOrder-t2.documentOrder;}function initializeModel(rootState){var transitions=[],idToStateMap=new Map(),documentOrder=0;//TODO: need to add fake ids to anyone that doesn't have them
//FIXME: make this safer - break into multiple passes
var idCount={};function generateId(type){if(idCount[type]===undefined)idCount[type]=0;var count=idCount[type]++;return'$generated-'+type+'-'+count;}function wrapInFakeRootState(state){return{$deserializeDatamodel:state.$deserializeDatamodel||function(){},$serializeDatamodel:state.$serializeDatamodel||function(){return null;},$idToStateMap:idToStateMap,//keep this for handy deserialization of serialized configuration
states:[{$type:'initial',transitions:[{target:state}]},state]};}var statesWithInitialAttributes=[];function traverse(ancestors,state){//add to global transition and state id caches
if(state.transitions)transitions.push.apply(transitions,state.transitions);//populate state id map
if(state.id){if(idToStateMap.has(state.id))throw new Error('Redefinition of state id '+state.id);idToStateMap.set(state.id,state);}//create a default type, just to normalize things
//this way we can check for unsupported types below
state.$type=state.$type||'state';//add ancestors and depth properties
state.ancestors=ancestors;state.depth=ancestors.length;state.parent=ancestors[0];//add some information to transitions
state.transitions=state.transitions||[];for(var j=0,len=state.transitions.length;j<len;j++){var transition=state.transitions[j];transition.documentOrder=documentOrder++;transition.source=state;};//recursive step
if(state.states){var ancs=[state].concat(ancestors);for(var j=0,len=state.states.length;j<len;j++){traverse(ancs,state.states[j]);}}//setup fast state type
switch(state.$type){case'parallel':state.typeEnum=STATE_TYPES.PARALLEL;break;case'initial':state.typeEnum=STATE_TYPES.INITIAL;break;case'history':state.typeEnum=STATE_TYPES.HISTORY;break;case'final':state.typeEnum=STATE_TYPES.FINAL;break;case'state':case'scxml':if(state.states&&state.states.length){state.typeEnum=STATE_TYPES.COMPOSITE;}else{state.typeEnum=STATE_TYPES.BASIC;}break;default:throw new Error('Unknown state type: '+state.$type);}//descendants property on states will now be populated. add descendants to this state
if(state.states){state.descendants=state.states.concat(state.states.map(function(s){return s.descendants;}).reduce(function(a,b){return a.concat(b);},[]));}else{state.descendants=[];}var initialChildren;if(state.typeEnum===STATE_TYPES.COMPOSITE){//set up initial state
if(typeof state.initial==='string'){statesWithInitialAttributes.push(state);}else{//take the first child that has initial type, or first child
initialChildren=state.states.filter(function(child){return child.$type==='initial';});state.initialRef=initialChildren.length?initialChildren[0]:state.states[0];checkInitialRef(state);}}//hook up history
if(state.typeEnum===STATE_TYPES.COMPOSITE||state.typeEnum===STATE_TYPES.PARALLEL){var historyChildren=state.states.filter(function(s){return s.$type==='history';});state.historyRef=historyChildren[0];}//now it's safe to fill in fake state ids
if(!state.id){state.id=generateId(state.$type);idToStateMap.set(state.id,state);}//normalize onEntry/onExit, which can be single fn or array
if(state.onEntry&&!Array.isArray(state.onEntry)){state.onEntry=[state.onEntry];}if(state.onExit&&!Array.isArray(state.onExit)){state.onExit=[state.onExit];}}//TODO: convert events to regular expressions in advance
function checkInitialRef(state){if(!state.initialRef)throw new Error('Unable to locate initial state for composite state: '+state.id);}function connectIntialAttributes(){for(var j=0,len=statesWithInitialAttributes.length;j<len;j++){var s=statesWithInitialAttributes[j];s.initialRef=idToStateMap.get(s.initial);checkInitialRef(s);}}var RX_WHITESPACE=/\s+/;function connectTransitionGraph(){//normalize as with onEntry/onExit
for(var i=0,len=transitions.length;i<len;i++){var t=transitions[i];if(t.onTransition&&!Array.isArray(t.onTransition)){t.onTransition=[t.onTransition];}//normalize "event" attribute into "events" attribute
if(typeof t.event==='string'){t.events=t.event.trim().split(RX_WHITESPACE);}delete t.event;if(t.targets||typeof t.target==='undefined'){//targets have already been set up
continue;}if(typeof t.target==='string'){var target=idToStateMap.get(t.target);if(!target)throw new Error('Unable to find target state with id '+t.target);t.target=target;t.targets=[t.target];}else if(Array.isArray(t.target)){t.targets=t.target.map(function(target){if(typeof target==='string'){target=idToStateMap.get(target);if(!target)throw new Error('Unable to find target state with id '+t.target);return target;}else{return target;}});}else if(_typeof(t.target)==='object'){t.targets=[t.target];}else{throw new Error('Transition target has unknown type: '+t.target);}}//hook up LCA - optimization
for(var i=0,len=transitions.length;i<len;i++){var t=transitions[i];if(t.targets)t.lcca=getLCCA(t.source,t.targets[0]);//FIXME: we technically do not need to hang onto the lcca. only the scope is used by the algorithm
t.scope=getScope(t);//console.log('scope',t.source.id,t.scope.id,t.targets);
}}function getScope(transition){//Transition scope is normally the least common compound ancestor (lcca).
//Internal transitions have a scope equal to the source state.
var transitionIsReallyInternal=transition.type==='internal'&&transition.source.parent&&//root state won't have parent
transition.targets&&//does it target its descendants
transition.targets.every(function(target){return transition.source.descendants.indexOf(target)>-1;});if(!transition.targets){return transition.source;}else if(transitionIsReallyInternal){return transition.source;}else{return transition.lcca;}}function getLCCA(s1,s2){//console.log('getLCCA',s1, s2);
var commonAncestors=[];for(var j=0,len=s1.ancestors.length;j<len;j++){var anc=s1.ancestors[j];//console.log('s1.id',s1.id,'anc',anc.id,'anc.typeEnum',anc.typeEnum,'s2.id',s2.id);
if(anc.typeEnum===STATE_TYPES.COMPOSITE&&anc.descendants.indexOf(s2)>-1){commonAncestors.push(anc);}};//console.log('commonAncestors',s1.id,s2.id,commonAncestors.map(function(s){return s.id;}));
if(!commonAncestors.length)throw new Error("Could not find LCA for states.");return commonAncestors[0];}//main execution starts here
//FIXME: only wrap in root state if it's not a compound state
var fakeRootState=wrapInFakeRootState(rootState);//I wish we had pointer semantics and could make this a C-style "out argument". Instead we return him
traverse([],fakeRootState);connectTransitionGraph();connectIntialAttributes();return fakeRootState;}/* begin tiny-events: https://github.com/ZauberNerd/tiny-events */function EventEmitter(){this._listeners={};this._listeners['*']=[];}EventEmitter.prototype.on=function _on(type,listener){if(!Array.isArray(this._listeners[type])){this._listeners[type]=[];}if(this._listeners[type].indexOf(listener)===-1){this._listeners[type].push(listener);}return this;};EventEmitter.prototype.once=function _once(type,listener){var self=this;function __once(){for(var args=[],i=0;i<arguments.length;i+=1){args[i]=arguments[i];}self.off(type,__once);listener.apply(self,args);}__once.listener=listener;return this.on(type,__once);};EventEmitter.prototype.off=function _off(type,listener){if(!Array.isArray(this._listeners[type])){return this;}if(typeof listener==='undefined'){this._listeners[type]=[];return this;}var index=this._listeners[type].indexOf(listener);if(index===-1){for(var i=0;i<this._listeners[type].length;i+=1){if(this._listeners[type][i].listener===listener){index=i;break;}}}this._listeners[type].splice(index,1);return this;};EventEmitter.prototype.emit=function _emit(type){var args=Array.prototype.slice.call(arguments);var modifiedArgs=args.slice(1);var listeners=this._listeners[type];var j,len;if(Array.isArray(listeners)){for(j=0,len=listeners.length;j<len;j++){listeners[j].apply(this,modifiedArgs);}}//special '*' event
listeners=this._listeners['*'];for(j=0,len=listeners.length;j<len;j++){listeners[j].apply(this,args);}return this;};/* end tiny-events *//* begin ArraySet *//** @constructor */function ArraySet(l){l=l||[];this.o=new Set(l);}ArraySet.prototype={add:function add(x){this.o.add(x);},remove:function remove(x){return this.o["delete"](x);},union:function union(l){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=l.o[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var v=_step.value;this.o.add(v);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]();}}finally{if(_didIteratorError){throw _iteratorError;}}}return this;},difference:function difference(l){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=l.o[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var v=_step2.value;this.o["delete"](v);}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2["return"]){_iterator2["return"]();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}return this;},contains:function contains(x){return this.o.has(x);},iter:function iter(){return Array.from(this.o);},isEmpty:function isEmpty(){return!this.o.size;},size:function size(){return this.o.size;},equals:function equals(s2){if(this.o.size!==s2.size()){return false;}var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=this.o[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var v=_step3.value;if(!s2.contains(v)){return false;}}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3["return"]){_iterator3["return"]();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}return true;},toString:function toString(){return"Set("+Array.from(this.o).toString()+")";}};var scxmlPrefixTransitionSelector=function(){var eventNameReCache={};function eventNameToRe(name){return new RegExp("^"+name.replace(/\./g,"\\.")+"(\\.[0-9a-zA-Z]+)*$");}function retrieveEventRe(name){return eventNameReCache[name]?eventNameReCache[name]:eventNameReCache[name]=eventNameToRe(name);}function nameMatch(t,event){return event&&event.name&&(t.events.indexOf("*")>-1?true:t.events.filter(function(tEvent){return retrieveEventRe(tEvent).test(event.name);}).length);}return function(state,event,evaluator){return state.transitions.filter(function(t){return(!t.events||nameMatch(t,event))&&(!t.cond||evaluator(t.cond));});};}();//model accessor functions
var query={getAncestors:function getAncestors(s,root){var ancestors,index,state;index=s.ancestors.indexOf(root);if(index>-1){return s.ancestors.slice(0,index);}else{return s.ancestors;}},/** @this {model} */getAncestorsOrSelf:function getAncestorsOrSelf(s,root){return[s].concat(this.getAncestors(s,root));},getDescendantsOrSelf:function getDescendantsOrSelf(s){return[s].concat(s.descendants);},/** @this {model} */isOrthogonalTo:function isOrthogonalTo(s1,s2){//Two control states are orthogonal if they are not ancestrally
//related, and their smallest, mutual parent is a Concurrent-state.
return!this.isAncestrallyRelatedTo(s1,s2)&&this.getLCA(s1,s2).typeEnum===STATE_TYPES.PARALLEL;},/** @this {model} */isAncestrallyRelatedTo:function isAncestrallyRelatedTo(s1,s2){//Two control states are ancestrally related if one is child/grandchild of another.
return this.getAncestorsOrSelf(s2).indexOf(s1)>-1||this.getAncestorsOrSelf(s1).indexOf(s2)>-1;},/** @this {model} */getLCA:function getLCA(s1,s2){var commonAncestors=this.getAncestors(s1).filter(function(a){return a.descendants.indexOf(s2)>-1;},this);return commonAncestors[0];}};//priority comparison functions
function getTransitionWithHigherSourceChildPriority(_arg){var t1=_arg[0],t2=_arg[1];//compare transitions based first on depth, then based on document order
if(t1.source.depth<t2.source.depth){return t2;}else if(t2.source.depth<t1.source.depth){return t1;}else{if(t1.documentOrder<t2.documentOrder){return t1;}else{return t2;}}}function initializeModelGeneratorFn(modelFn,opts,interpreter){opts.x=opts.x||{};return modelFn.call(interpreter,opts.x,opts.sessionid,opts.ioprocessors,interpreter.isIn.bind(interpreter));}function deserializeSerializedConfiguration(serializedConfiguration,idToStateMap){return serializedConfiguration.map(function(id){var state=idToStateMap.get(id);if(!state)throw new Error('Error loading serialized configuration. Unable to locate state with id '+id);return state;});}function deserializeHistory(serializedHistory,idToStateMap){var o={};Object.keys(serializedHistory).forEach(function(sid){o[sid]=serializedHistory[sid].map(function(id){var state=idToStateMap.get(id);if(!state)throw new Error('Error loading serialized history. Unable to locate state with id '+id);return state;});});return o;}/** @const */var printTrace=false;/** @constructor */function BaseInterpreter(modelOrFnGenerator,opts){EventEmitter.call(this);this._scriptingContext=opts.interpreterScriptingContext||(opts.InterpreterScriptingContext?new opts.InterpreterScriptingContext(this):{});var model;if(typeof modelOrFnGenerator==='function'){model=initializeModelGeneratorFn(modelOrFnGenerator,opts,this);}else if(typeof modelOrFnGenerator==='string'){model=JSON.parse(modelOrFnGenerator);}else{model=modelOrFnGenerator;}this._model=initializeModel(model);//console.log(require('util').inspect(this._model,false,4));
this.opts=opts||{};this.opts.console=opts.console||(typeof console==='undefined'?{log:function log(){}}:console);//rely on global console if this console is undefined
this.opts.Set=this.opts.Set||ArraySet;this.opts.priorityComparisonFn=this.opts.priorityComparisonFn||getTransitionWithHigherSourceChildPriority;this.opts.transitionSelector=this.opts.transitionSelector||scxmlPrefixTransitionSelector;this._scriptingContext.log=this._scriptingContext.log||function log(){if(this.opts.console.log.apply){this.opts.console.log.apply(this.opts.console,arguments);}else{//console.log on older IE does not support Function.apply, so just pass him the first argument. Best we can do for now.
this.opts.console.log(Array.prototype.slice.apply(arguments).join(','));}}.bind(this);//set up default scripting context log function
this._internalEventQueue=[];//check if we're loading from a previous snapshot
if(opts.snapshot){this._configuration=new this.opts.Set(deserializeSerializedConfiguration(opts.snapshot[0],this._model.$idToStateMap));this._historyValue=deserializeHistory(opts.snapshot[1],this._model.$idToStateMap);this._isInFinalState=opts.snapshot[2];this._model.$deserializeDatamodel(opts.snapshot[3]);//load up the datamodel
}else{this._configuration=new this.opts.Set();this._historyValue={};this._isInFinalState=false;}//SCXML system variables:
this._x={_sessionId:opts.sessionId||null,_name:model.name||opts.name||null,_ioprocessors:opts.ioprocessors||null};}BaseInterpreter.prototype=extend(beget(EventEmitter.prototype),{/** @expose */start:function start(){//perform big step without events to take all default transitions and reach stable initial state
if(printTrace)this.opts.console.log("performing initial big step");//We effectively need to figure out states to enter here to populate initial config. assuming root is compound state makes this simple.
//but if we want it to be parallel, then this becomes more complex. so when initializing the model, we add a 'fake' root state, which
//makes the following operation safe.
this._configuration.add(this._model.initialRef);this._performBigStep();return this.getConfiguration();},/**
     * Starts the interpreter asynchronously
     * @param  {Function} cb Callback invoked with an error or the interpreter's stable configuration
     * @expose
     */startAsync:function startAsync(cb){if(typeof cb!=='function'){cb=nop;}if(printTrace)this.opts.console.log("performing initial big step");this._configuration.add(this._model.initialRef);this._performBigStepAsync(null,cb);},/** @expose */getConfiguration:function getConfiguration(){return this._configuration.iter().map(function(s){return s.id;});},/** @expose */getFullConfiguration:function getFullConfiguration(){return this._configuration.iter().map(function(s){return[s].concat(query.getAncestors(s));},this).reduce(function(a,b){return a.concat(b);},[]).//flatten
map(function(s){return s.id;}).reduce(function(a,b){return a.indexOf(b)>-1?a:a.concat(b);},[]);//uniq
},/** @expose */isIn:function isIn(stateName){return this.getFullConfiguration().indexOf(stateName)>-1;},/** @expose */isFinal:function isFinal(stateName){return this._isInFinalState;},/** @private */_performBigStep:function _performBigStep(e){this.emit('onBigStepBegin');if(e)this._internalEventQueue.push(e);var keepGoing=true;while(keepGoing){var currentEvent=this._internalEventQueue.shift()||null;this.emit('onSmallStepBegin',currentEvent);var selectedTransitions=this._performSmallStep(currentEvent);keepGoing=!selectedTransitions.isEmpty();}this._isInFinalState=this._configuration.iter().every(function(s){return s.typeEnum===STATE_TYPES.FINAL;});this.emit('onBigStepEnd');},_performBigStepAsync:function _performBigStepAsync(event,cb){if(event){this._internalEventQueue.push(event);}var self=this;function doBigStep(eventToEmit){var selectedTransitions;try{self.emit(eventToEmit);var currentEvent=self._internalEventQueue.shift()||null;self.emit('onSmallStepBegin',currentEvent);selectedTransitions=self._performSmallStep(currentEvent);self.emit('onSmallStepEnd',currentEvent);}catch(err){cb(err);return;}if(!selectedTransitions.isEmpty()){// keep going, but be nice (yield) to the process
// TODO: for compat with non-node, non-mozilla
// allow the context to provide the defer task function
self.emit('onBigStepSuspend');setImmediate(doBigStep,'onBigStepResume');}else{self._isInFinalState=self._configuration.iter().every(function(s){return s.typeEnum===STATE_TYPES.FINAL;});self.emit('onBigStepEnd');cb(undefined,self.getConfiguration());}}doBigStep('onBigStepBegin');},/** @private */_performSmallStep:function _performSmallStep(currentEvent){if(printTrace)this.opts.console.log("selecting transitions with currentEvent: ",currentEvent);var selectedTransitions=this._selectTransitions(currentEvent);if(printTrace)this.opts.console.log("selected transitions: ",selectedTransitions);if(!selectedTransitions.isEmpty()){if(printTrace)this.opts.console.log("sorted transitions: ",selectedTransitions);//we only want to enter and exit states from transitions with targets
//filter out targetless transitions here - we will only use these to execute transition actions
var selectedTransitionsWithTargets=new this.opts.Set(selectedTransitions.iter().filter(transitionWithTargets));var exitedTuple=this._getStatesExited(selectedTransitionsWithTargets),basicStatesExited=exitedTuple[0],statesExited=exitedTuple[1];var enteredTuple=this._getStatesEntered(selectedTransitionsWithTargets),basicStatesEntered=enteredTuple[0],statesEntered=enteredTuple[1];if(printTrace)this.opts.console.log("basicStatesExited ",basicStatesExited);if(printTrace)this.opts.console.log("basicStatesEntered ",basicStatesEntered);if(printTrace)this.opts.console.log("statesExited ",statesExited);if(printTrace)this.opts.console.log("statesEntered ",statesEntered);var eventsToAddToInnerQueue=new this.opts.Set();//update history states
if(printTrace)this.opts.console.log("executing state exit actions");for(var j=0,len=statesExited.length;j<len;j++){var stateExited=statesExited[j];if(printTrace||this.opts.logStatesEnteredAndExited)this.opts.console.log("exiting ",stateExited.id);//invoke listeners
this.emit('onExit',stateExited.id);if(stateExited.onExit!==undefined){for(var exitIdx=0,exitLen=stateExited.onExit.length;exitIdx<exitLen;exitIdx++){this._evaluateAction(currentEvent,stateExited.onExit[exitIdx]);}}var f;if(stateExited.historyRef){if(stateExited.historyRef.isDeep){f=function f(s0){return s0.typeEnum===STATE_TYPES.BASIC&&stateExited.descendants.indexOf(s0)>-1;};}else{f=function f(s0){return s0.parent===stateExited;};}//update history
this._historyValue[stateExited.historyRef.id]=statesExited.filter(f);}}// -> Concurrency: Number of transitions: Multiple
// -> Concurrency: Order of transitions: Explicitly defined
var sortedTransitions=selectedTransitions.iter().sort(transitionComparator);if(printTrace)this.opts.console.log("executing transitition actions");for(var stxIdx=0,len=sortedTransitions.length;stxIdx<len;stxIdx++){var transition=sortedTransitions[stxIdx];var targetIds=transition.targets&&transition.targets.map(function(target){return target.id;});this.emit('onTransition',transition.source.id,targetIds);if(transition.onTransition!==undefined){for(var txIdx=0,txLen=transition.onTransition.length;txIdx<txLen;txIdx++){this._evaluateAction(currentEvent,transition.onTransition[txIdx]);}}}if(printTrace)this.opts.console.log("executing state enter actions");for(var enterIdx=0,enterLen=statesEntered.length;enterIdx<enterLen;enterIdx++){var stateEntered=statesEntered[enterIdx];if(printTrace||this.opts.logStatesEnteredAndExited)this.opts.console.log("entering",stateEntered.id);this.emit('onEntry',stateEntered.id);if(stateEntered.onEntry!==undefined){for(var entryIdx=0,entryLen=stateEntered.onEntry.length;entryIdx<entryLen;entryIdx++){this._evaluateAction(currentEvent,stateEntered.onEntry[entryIdx]);}}}if(printTrace)this.opts.console.log("updating configuration ");if(printTrace)this.opts.console.log("old configuration ",this._configuration);//update configuration by removing basic states exited, and adding basic states entered
this._configuration.difference(basicStatesExited);this._configuration.union(basicStatesEntered);if(printTrace)this.opts.console.log("new configuration ",this._configuration);//add set of generated events to the innerEventQueue -> Event Lifelines: Next small-step
if(!eventsToAddToInnerQueue.isEmpty()){if(printTrace)this.opts.console.log("adding triggered events to inner queue ",eventsToAddToInnerQueue);this._internalEventQueue.push(eventsToAddToInnerQueue);}}//if selectedTransitions is empty, we have reached a stable state, and the big-step will stop, otherwise will continue -> Maximality: Take-Many
return selectedTransitions;},/** @private */_evaluateAction:function _evaluateAction(currentEvent,actionRef){try{return actionRef.call(this._scriptingContext,currentEvent);//SCXML system variables
}catch(e){var err={tagname:actionRef.tagname,line:actionRef.line,column:actionRef.column,reason:e.message};this._internalEventQueue.push({"name":"error.execution",data:err});this.emit('onError',err);}},/** @private */_getStatesExited:function _getStatesExited(transitions){var statesExited=new this.opts.Set();var basicStatesExited=new this.opts.Set();//States exited are defined to be active states that are
//descendants of the scope of each priority-enabled transition.
//Here, we iterate through the transitions, and collect states
//that match this condition. 
var transitionList=transitions.iter();for(var txIdx=0,txLen=transitionList.length;txIdx<txLen;txIdx++){var transition=transitionList[txIdx];var scope=transition.scope,desc=scope.descendants;//For each state in the configuration
//is that state a descendant of the transition scope?
//Store ancestors of that state up to but not including the scope.
var configList=this._configuration.iter();for(var cfgIdx=0,cfgLen=configList.length;cfgIdx<cfgLen;cfgIdx++){var state=configList[cfgIdx];if(desc.indexOf(state)>-1){basicStatesExited.add(state);statesExited.add(state);var ancestors=query.getAncestors(state,scope);for(var ancIdx=0,ancLen=ancestors.length;ancIdx<ancLen;ancIdx++){statesExited.add(ancestors[ancIdx]);}}}}var sortedStatesExited=statesExited.iter().sort(stateExitComparator);return[basicStatesExited,sortedStatesExited];},/** @private */_getStatesEntered:function _getStatesEntered(transitions){var o={statesToEnter:new this.opts.Set(),basicStatesToEnter:new this.opts.Set(),statesProcessed:new this.opts.Set(),statesToProcess:[]};//do the initial setup
var transitionList=transitions.iter();for(var txIdx=0,txLen=transitionList.length;txIdx<txLen;txIdx++){var transition=transitionList[txIdx];for(var targetIdx=0,targetLen=transition.targets.length;targetIdx<targetLen;targetIdx++){this._addStateAndAncestors(transition.targets[targetIdx],transition.scope,o);}}//loop and add states until there are no more to add (we reach a stable state)
var s;/*jsl:ignore*/while(s=o.statesToProcess.pop()){/*jsl:end*/this._addStateAndDescendants(s,o);}//sort based on depth
var sortedStatesEntered=o.statesToEnter.iter().sort(stateEntryComparator);return[o.basicStatesToEnter,sortedStatesEntered];},/** @private */_addStateAndAncestors:function _addStateAndAncestors(target,scope,o){//process each target
this._addStateAndDescendants(target,o);//and process ancestors of targets up to the scope, but according to special rules
var ancestors=query.getAncestors(target,scope);for(var ancIdx=0,ancLen=ancestors.length;ancIdx<ancLen;ancIdx++){var s=ancestors[ancIdx];if(s.typeEnum===STATE_TYPES.COMPOSITE){//just add him to statesToEnter, and declare him processed
//this is to prevent adding his initial state later on
o.statesToEnter.add(s);o.statesProcessed.add(s);}else{//everything else can just be passed through as normal
this._addStateAndDescendants(s,o);}}},/** @private */_addStateAndDescendants:function _addStateAndDescendants(s,o){if(o.statesProcessed.contains(s))return;if(s.typeEnum===STATE_TYPES.HISTORY){if(s.id in this._historyValue){this._historyValue[s.id].forEach(function(stateFromHistory){this._addStateAndAncestors(stateFromHistory,s.parent,o);},this);}else{o.statesToEnter.add(s);o.basicStatesToEnter.add(s);}}else{o.statesToEnter.add(s);if(s.typeEnum===STATE_TYPES.PARALLEL){o.statesToProcess.push.apply(o.statesToProcess,s.states.filter(function(s){return s.typeEnum!==STATE_TYPES.HISTORY;}));}else if(s.typeEnum===STATE_TYPES.COMPOSITE){o.statesToProcess.push(s.initialRef);}else if(s.typeEnum===STATE_TYPES.INITIAL||s.typeEnum===STATE_TYPES.BASIC||s.typeEnum===STATE_TYPES.FINAL){o.basicStatesToEnter.add(s);}}o.statesProcessed.add(s);},/** @private */_selectTransitions:function _selectTransitions(currentEvent){if(this.opts.onlySelectFromBasicStates){var states=this._configuration.iter();}else{var statesAndParents=new this.opts.Set();//get full configuration, unordered
//this means we may select transitions from parents before states
var configList=this._configuration.iter();for(var idx=0,len=configList.length;idx<len;idx++){var basicState=configList[idx];statesAndParents.add(basicState);var ancestors=query.getAncestors(basicState);for(var ancIdx=0,ancLen=ancestors.length;ancIdx<ancLen;ancIdx++){statesAndParents.add(ancestors[ancIdx]);}}states=statesAndParents.iter();}var usePrefixMatchingAlgorithm=currentEvent&&currentEvent.name&&currentEvent.name.search(".");var transitionSelector=usePrefixMatchingAlgorithm?scxmlPrefixTransitionSelector:this.opts.transitionSelector;var enabledTransitions=new this.opts.Set();var e=this._evaluateAction.bind(this,currentEvent);for(var stateIdx=0,stateLen=states.length;stateIdx<stateLen;stateIdx++){var transitions=transitionSelector(states[stateIdx],currentEvent,e);for(var txIdx=0,len=transitions.length;txIdx<len;txIdx++){enabledTransitions.add(transitions[txIdx]);}}var priorityEnabledTransitions=this._selectPriorityEnabledTransitions(enabledTransitions);if(printTrace)this.opts.console.log("priorityEnabledTransitions",priorityEnabledTransitions);return priorityEnabledTransitions;},/** @private */_selectPriorityEnabledTransitions:function _selectPriorityEnabledTransitions(enabledTransitions){var priorityEnabledTransitions=new this.opts.Set();var tuple=this._getInconsistentTransitions(enabledTransitions),consistentTransitions=tuple[0],inconsistentTransitionsPairs=tuple[1];priorityEnabledTransitions.union(consistentTransitions);if(printTrace)this.opts.console.log("enabledTransitions",enabledTransitions);if(printTrace)this.opts.console.log("consistentTransitions",consistentTransitions);if(printTrace)this.opts.console.log("inconsistentTransitionsPairs",inconsistentTransitionsPairs);if(printTrace)this.opts.console.log("priorityEnabledTransitions",priorityEnabledTransitions);while(!inconsistentTransitionsPairs.isEmpty()){enabledTransitions=new this.opts.Set(inconsistentTransitionsPairs.iter().map(function(t){return this.opts.priorityComparisonFn(t);},this));tuple=this._getInconsistentTransitions(enabledTransitions);consistentTransitions=tuple[0];inconsistentTransitionsPairs=tuple[1];priorityEnabledTransitions.union(consistentTransitions);if(printTrace)this.opts.console.log("enabledTransitions",enabledTransitions);if(printTrace)this.opts.console.log("consistentTransitions",consistentTransitions);if(printTrace)this.opts.console.log("inconsistentTransitionsPairs",inconsistentTransitionsPairs);if(printTrace)this.opts.console.log("priorityEnabledTransitions",priorityEnabledTransitions);}return priorityEnabledTransitions;},/** @private */_getInconsistentTransitions:function _getInconsistentTransitions(transitions){var allInconsistentTransitions=new this.opts.Set();var inconsistentTransitionsPairs=new this.opts.Set();var transitionList=transitions.iter();if(printTrace)this.opts.console.log("transitions",transitionList);for(var i=0;i<transitionList.length;i++){for(var j=i+1;j<transitionList.length;j++){var t1=transitionList[i];var t2=transitionList[j];if(this._conflicts(t1,t2)){allInconsistentTransitions.add(t1);allInconsistentTransitions.add(t2);inconsistentTransitionsPairs.add([t1,t2]);}}}var consistentTransitions=transitions.difference(allInconsistentTransitions);return[consistentTransitions,inconsistentTransitionsPairs];},/** @private */_conflicts:function _conflicts(t1,t2){return!this._isArenaOrthogonal(t1,t2);},/** @private */_isArenaOrthogonal:function _isArenaOrthogonal(t1,t2){if(printTrace)this.opts.console.log("transition scopes",t1.scope,t2.scope);var isOrthogonal=query.isOrthogonalTo(t1.scope,t2.scope);if(printTrace)this.opts.console.log("transition scopes are orthogonal?",isOrthogonal);return isOrthogonal;},/*
        registerListener provides a generic mechanism to subscribe to state change and runtime error notifications.
        Can be used for logging and debugging. For example, can attach a logger that simply logs the state changes.
        Or can attach a network debugging client that sends state change notifications to a debugging server.
    
        listener is of the form:
        {
          onEntry : function(stateId){},
          onExit : function(stateId){},
          onTransition : function(sourceStateId,targetStatesIds[]){},
          onError: function(errorInfo){},
          onBigStepBegin: function(){},
          onBigStepResume: function(){},
          onBigStepSuspend: function(){},
          onBigStepEnd: function(){}
          onSmallStepBegin: function(event){},
          onSmallStepEnd: function(){}
        }
    *///TODO: refactor this to be event emitter? 
/** @expose */registerListener:function registerListener(listener){if(listener.onEntry)this.on('onEntry',listener.onEntry);if(listener.onExit)this.on('onExit',listener.onExit);if(listener.onTransition)this.on('onTransition',listener.onTransition);if(listener.onError)this.on('onError',listener.onError);if(listener.onBigStepBegin)this.on('onBigStepBegin',listener.onBigStepBegin);if(listener.onBigStepSuspend)this.on('onBigStepSuspend',listener.onBigStepSuspend);if(listener.onBigStepResume)this.on('onBigStepResume',listener.onBigStepResume);if(listener.onSmallStepBegin)this.on('onSmallStepBegin',listener.onSmallStepBegin);if(listener.onSmallStepEnd)this.on('onSmallStepEnd',listener.onSmallStepEnd);if(listener.onBigStepEnd)this.on('onBigStepEnd',listener.onBigStepEnd);},/** @expose */unregisterListener:function unregisterListener(listener){if(listener.onEntry)this.off('onEntry',listener.onEntry);if(listener.onExit)this.off('onExit',listener.onExit);if(listener.onTransition)this.off('onTransition',listener.onTransition);if(listener.onError)this.off('onError',listener.onError);if(listener.onBigStepBegin)this.off('onBigStepBegin',listener.onBigStepBegin);if(listener.onBigStepSuspend)this.off('onBigStepSuspend',listener.onBigStepSuspend);if(listener.onBigStepResume)this.off('onBigStepResume',listener.onBigStepResume);if(listener.onSmallStepBegin)this.off('onSmallStepBegin',listener.onSmallStepBegin);if(listener.onSmallStepEnd)this.off('onSmallStepEnd',listener.onSmallStepEnd);if(listener.onBigStepEnd)this.off('onBigStepEnd',listener.onBigStepEnd);},/** @expose */getAllTransitionEvents:function getAllTransitionEvents(){var events={};function getEvents(state){if(state.transitions){for(var txIdx=0,txLen=state.transitions.length;txIdx<txLen;txIdx++){events[state.transitions[txIdx].event]=true;}}if(state.states){for(var stateIdx=0,stateLen=state.states.length;stateIdx<stateLen;stateIdx++){getEvents(state.states[stateIdx]);}}}getEvents(this._model);return Object.keys(events);},/** @expose *//**
      Three things capture the current snapshot of a running SCION interpreter:

      * basic configuration (the set of basic states the state machine is in)
      * history state values (the states the state machine was in last time it was in the parent of a history state)
      * the datamodel
      
      Note that this assumes that the method to serialize a scion.SCXML
      instance is not called when the interpreter is executing a big-step (e.g. after
      scion.SCXML.prototype.gen is called, and before the call to gen returns). If
      the serialization method is called during the execution of a big-step, then the
      inner event queue must also be saved. I do not expect this to be a common
      requirement however, and therefore I believe it would be better to only support
      serialization when the interpreter is not executing a big-step.
    */getSnapshot:function getSnapshot(){if(this._isStepping)throw new Error('getSnapshot cannot be called while interpreter is executing a big-step');return[this.getConfiguration(),this._serializeHistory(),this._isInFinalState,this._model.$serializeDatamodel()];},_serializeHistory:function _serializeHistory(){var o={};Object.keys(this._historyValue).forEach(function(sid){o[sid]=this._historyValue[sid].map(function(state){return state.id;});},this);return o;}});/**
 * @constructor
 * @extends BaseInterpreter
 */function Statechart(model,opts){opts=opts||{};opts.ioprocessors={};//Create all supported Event I/O processor nodes.
//TODO fix location after implementing actual processors
for(var processorType in ioProcessorTypes){opts.ioprocessors[processorType]=ioProcessorTypes[processorType];}opts.InterpreterScriptingContext=opts.InterpreterScriptingContext||InterpreterScriptingContext;this._isStepping=false;BaseInterpreter.call(this,model,opts);//call super constructor
}function beget(o){function F(){}F.prototype=o;return new F();}/**
 * Do nothing
 */function nop(){}//Statechart.prototype = Object.create(BaseInterpreter.prototype);
//would like to use Object.create here, but not portable, but it's too complicated to use portably
Statechart.prototype=beget(BaseInterpreter.prototype);/** @expose */Statechart.prototype.gen=function(evtObjOrName,optionalData){var currentEvent;switch(typeof evtObjOrName==="undefined"?"undefined":_typeof(evtObjOrName)){case'string':currentEvent={name:evtObjOrName,data:optionalData};break;case'object':if(typeof evtObjOrName.name==='string'){currentEvent=evtObjOrName;}else{throw new Error('Event object must have "name" property of type string.');}break;default:throw new Error('First argument to gen must be a string or object.');}if(this._isStepping)throw new Error('Cannot call gen during a big-step');//otherwise, kick him off
this._isStepping=true;this._performBigStep(currentEvent);this._isStepping=false;return this.getConfiguration();};/**
 * Injects an external event into the interpreter asynchronously
 * @param  {object}   currentEvent The event to inject
 * @param {string} currentEvent.name The name of the event
 * @param {string} [currentEvent.data] The event data
 * @param  {Function} cb Callback invoked with an error or the interpreter's stable configuration
 * @expose
 */Statechart.prototype.genAsync=function(currentEvent,cb){if((typeof currentEvent==="undefined"?"undefined":_typeof(currentEvent))!=='object'||!currentEvent||typeof currentEvent.name!=='string'){throw new Error('expected currentEvent to be an Object with a name');}if(this._isStepping){throw new Error('Cannot call gen during a big-step');}if(typeof cb!=='function'){cb=nop;}this._isStepping=true;var self=this;this._performBigStepAsync(currentEvent,function(err,config){self._isStepping=false;cb(err,config);});};function InterpreterScriptingContext(interpreter){this._interpreter=interpreter;this._timeoutMap={};}//Regex from:
//  http://daringfireball.net/2010/07/improved_regex_for_matching_urls
//  http://stackoverflow.com/a/6927878
var validateUriRegex=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;//TODO: consider whether this is the API we would like to expose
InterpreterScriptingContext.prototype={raise:function raise(event){this._interpreter._internalEventQueue.push(event);},send:function send(event,options){//TODO: move these out
function validateSend(event,options,sendAction){if(event.target){var targetIsValidUri=validateUriRegex.test(event.target);if(!targetIsValidUri){return this.raise({name:"error.execution",data:'Target is not valid URI',sendid:options.sendid});}}var eventProcessorTypes=Object.keys(ioProcessorTypes).map(function(k){return ioProcessorTypes[k].location;});if(eventProcessorTypes.indexOf(event.type)===-1){return this.raise({name:"error.execution",data:'Unsupported event processor type',sendid:options.sendid});}sendAction.call(this,event,options);}function defaultSendAction(event,options){if(typeof setTimeout==='undefined')throw new Error('Default implementation of Statechart.prototype.send will not work unless setTimeout is defined globally.');var timeoutId=setTimeout(this._interpreter.gen.bind(this._interpreter,event),options.delay||0);if(options.sendid)this._timeoutMap[options.sendid]=timeoutId;}function publish(){this._interpreter.emit(event.name,event.data);}event.type=event.type||ioProcessorTypes.scxml.location;//choose send function
var sendFn;if(event.type==='https://github.com/jbeard4/SCION#publish'){sendFn=publish;}else if(this._interpreter.opts.customSend){sendFn=this._interpreter.opts.customSend;}else{sendFn=defaultSendAction;}options=options||{};if(printTrace)this._interpreter.opts.console.log("sending event",event.name,"with content",event.data,"after delay",options.delay);validateSend.call(this,event,options,sendFn);},cancel:function cancel(sendid){if(this._interpreter.opts.customCancel){return this._interpreter.opts.customCancel.apply(this,[sendid]);}if(typeof clearTimeout==='undefined')throw new Error('Default implementation of Statechart.prototype.cancel will not work unless setTimeout is defined globally.');if(sendid in this._timeoutMap){if(printTrace)this._interpreter.opts.console.log("cancelling ",sendid," with timeout id ",this._timeoutMap[sendid]);clearTimeout(this._timeoutMap[sendid]);}}};module.exports={/** @expose */BaseInterpreter:BaseInterpreter,/** @expose */Statechart:Statechart,/** @expose */ArraySet:ArraySet,/** @expose */STATE_TYPES:STATE_TYPES,/** @expose */initializeModel:initializeModel,/** @expose */InterpreterScriptingContext:InterpreterScriptingContext,/** @expose */ioProcessorTypes:ioProcessorTypes};},{}],61:[function(require,module,exports){(function(){var JS_ILLEGAL_IDENTIFIER_CHARS,JS_KEYWORDS,WRAPPER_PREFIX,WRAPPER_REGEX,WRAPPER_SUFFIX,char_wrapper,to_js_identifier,wrapper;JS_KEYWORDS=["break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","instanceof","interface","let","new","null","package","private","protected","public","return","static","switch","super","this","throw","true","try","typeof","undefined","var","void","while","with","yield"];JS_ILLEGAL_IDENTIFIER_CHARS={"~":"tilde","`":"backtick","!":"exclamationmark","@":"at","#":"pound","%":"percent","^":"carat","&":"amperstand","*":"asterisk","(":"leftparen",")":"rightparen","-":"dash","+":"plus","=":"equals","{":"leftcurly","}":"rightcurly","[":"leftsquare","]":"rightsquare","|":"pipe","\\":"backslash","\"":"doublequote","'":"singlequote",":":"colon",";":"semicolon","<":"leftangle",">":"rightangle",",":"comma",".":"period","?":"questionmark","/":"forwardslash"," ":"space","\t":"tab","\n":"newline","\r":"carriagereturn"};WRAPPER_PREFIX="_$";WRAPPER_SUFFIX="_";WRAPPER_REGEX=/_\$[^_]+_/g;wrapper=function wrapper(text){return""+WRAPPER_PREFIX+text+WRAPPER_SUFFIX;};char_wrapper=function char_wrapper(char){var txt,_ref;txt=(_ref=JS_ILLEGAL_IDENTIFIER_CHARS[char])!=null?_ref:"ASCII_"+char.charCodeAt(0);return wrapper(txt);};to_js_identifier=function to_js_identifier(text){if(JS_KEYWORDS.indexOf(text)>=0)return wrapper(text);if(text.length===0)return wrapper("null");return text.replace(WRAPPER_REGEX,wrapper).replace(/^\d/,char_wrapper).replace(/[^\w\$]/g,char_wrapper);};if((typeof module!=="undefined"&&module!==null?module.exports:void 0)!=null){module.exports=to_js_identifier;}else if(typeof ender!=="undefined"&&ender!==null){ender.ender({to_js_identifier:to_js_identifier});}else{this.to_js_identifier=to_js_identifier;}}).call(this);},{}],62:[function(require,module,exports){var indexOf=require('indexof');var Object_keys=function Object_keys(obj){if(Object.keys)return Object.keys(obj);else{var res=[];for(var key in obj){res.push(key);}return res;}};var forEach=function forEach(xs,fn){if(xs.forEach)return xs.forEach(fn);else for(var i=0;i<xs.length;i++){fn(xs[i],i,xs);}};var defineProp=function(){try{Object.defineProperty({},'_',{});return function(obj,name,value){Object.defineProperty(obj,name,{writable:true,enumerable:false,configurable:true,value:value});};}catch(e){return function(obj,name,value){obj[name]=value;};}}();var globals=['Array','Boolean','Date','Error','EvalError','Function','JSON','Math','NaN','Number','Object','RangeError','ReferenceError','RegExp','String','SyntaxError','TypeError','URIError','decodeURI','decodeURIComponent','encodeURI','encodeURIComponent','escape','eval','isFinite','isNaN','parseFloat','parseInt','undefined','unescape'];function Context(){var iframe=document.createElement('iframe');if(!iframe.style)iframe.style={};iframe.style.display='none';document.body.appendChild(iframe);Object.defineProperty(this,"_iframe",{enumerable:false,writable:true});this._iframe=iframe;}Context.prototype={};var Script=exports.Script=function NodeScript(code){if(!(this instanceof Script))return new Script(code);this.code=code;};Script.prototype.runInContext=function(context){if(!(context instanceof Context)){throw new TypeError("needs a 'context' argument.");}var win=context._iframe.contentWindow;var wEval=win.eval,wExecScript=win.execScript;if(!wEval&&wExecScript){// win.eval() magically appears when this is called in IE:
wExecScript.call(win,'null');wEval=win.eval;}forEach(Object_keys(context),function(key){win[key]=context[key];});forEach(globals,function(key){if(context[key]){win[key]=context[key];}});var winKeys=Object_keys(win);var res=wEval.call(win,this.code);forEach(Object_keys(win),function(key){// Avoid copying circular objects like `top` and `window` by only
// updating existing context properties or new properties in the `win`
// that was only introduced after the eval.
if(key in context||indexOf(winKeys,key)===-1){context[key]=win[key];}});forEach(globals,function(key){if(!(key in context)){defineProp(context,key,win[key]);}});return res;};Script.prototype.runInThisContext=function(){return eval(this.code);// maybe...
};Script.prototype.runInNewContext=function(context){var ctx=Script.createContext(context);var res=this.runInContext(ctx);forEach(Object_keys(ctx),function(key){context[key]=ctx[key];});return res;};forEach(Object_keys(Script.prototype),function(name){exports[name]=Script[name]=function(code){var s=Script(code);return s[name].apply(s,[].slice.call(arguments,1));};});exports.createScript=function(code){return exports.Script(code);};exports.createContext=Script.createContext=function(context){var copy=new Context();if((typeof context==="undefined"?"undefined":_typeof(context))==='object'){forEach(Object_keys(context),function(key){copy[key]=context[key];copy._iframe.contentWindow[key]=context[key];});}return copy;};exports.isContext=function(sandbox){return sandbox instanceof Context;};},{"indexof":63}],63:[function(require,module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i;}return-1;};},{}]},{},[7])(7);});});
//# sourceMappingURL=scxml.js.map
