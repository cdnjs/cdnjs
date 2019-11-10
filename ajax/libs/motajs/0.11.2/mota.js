/*!
 * MotaJS v0.11.2
 * http://motapc.js.org/motajs
 *
 * Released under the MIT license
 * https://github.com/motapc97/MotaJS/blob/master/LICENSE.md
 *
 * Project
 * https://github.com/motapc97/MotaJS
 *
 * Date: 2016-02-15T17:33Z
 */
( function( factory ) {

  // AMD
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#anon
  if ( typeof define === "function" && define.amd ) {

    define( function() {
      return factory();
    } );

  // Node.js or CommonJS
  } else if ( typeof exports !== "undefined" ) {

    var mota = factory();

    if ( typeof module !== "undefined" && module.exports ) {
      exports = module.exports = mota;
    }
    exports.mota = mota;

  // Finally, as a browser global
  } else {

    window.mota = factory();

  }

}( function() {

function baseCall( func, context ) {
  return context == null ? func() : func.call( context );
}

function baseApplyNoThis( func, a ) {
  switch ( a.length ) {
    case 0:
      return func();
    case 1:
      return func( a[ 0 ] );
    case 2:
      return func( a[ 0 ], a[ 1 ] );
    case 3:
      return func( a[ 0 ], a[ 1 ], a[ 2 ] );
    case 4:
      return func( a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ] );
    case 5:
      return func( a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ], a[ 4 ] );
    default:
      return func.apply( undefined, a );
  }
}

function baseApplyThis( func, context, a ) {
  switch ( a.length ) {
    case 0:
      return func.call( context );
    case 1:
      return func.call( context, a[ 0 ] );
    case 2:
      return func.call( context, a[ 0 ], a[ 1 ] );
    case 3:
      return func.call( context, a[ 0 ], a[ 1 ], a[ 2 ] );
    case 4:
      return func.call( context, a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ] );
    case 5:
      return func.call( context, a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ], a[ 4 ] );
    default:
      return func.apply( context, a );
  }
}

function apply( func, context, a ) {

  if ( !func ) {
    return;
  }

  if ( !a ) {
    return baseCall( func, context );
  }

  return context == null ? baseApplyNoThis( func, a ) : baseApplyThis( func, context, a );

}

var ObjectCreate = Object.create;

var isArray = Array.isArray;

var toString = ( {} ).toString;

var types = {
  "[object Array]": "array",
  "[object Boolean]": "boolean",
  "[object Date]": "date",
  "[object Error]": "error",
  "[object Function]": "function",
  "[object GeneratorFunction]": "function",
  "[object Number]": "number",
  "[object Object]": "object",
  "[object RegExp]": "regexp",
  "[object String]": "string",
  "[object Symbol]": "symbol"
};

var motaType = function( obj ) {
  var type = typeof obj;
  if ( type === "object" || type === "function" ) {
    return obj === null ? "null" : types[ toString.call( obj ) ] || "object";
  }
  return type;
};

var isObject = function( obj ) {
  return motaType( obj ) === "object";
};

var isObjectLike = function( obj ) {
  var type;
  return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
};

// BASED ON jQuery
var extend = function( target ) {

  var options, name, src, copy, copyType, clone,
      i = 1,
      len = arguments.length,
      deep = false;

  // Handle a deep copy situation
  if ( target === true ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ];
    i++;
  }

  // Handle case when target is not object like
  if ( !isObjectLike( target ) ) {
    return target;
  }

  for ( ; i < len; i++ ) {

    // Only deal with non-null/undefined values
    if ( ( options = arguments[ i ] ) != null ) {

      // Extend the base object
      for ( name in options ) {

        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging objects or arrays
        if ( deep && copy &&
          ( ( copyType = motaType( copy ) ) === "object" || copyType === "array" ) ) {

          if ( copyType === "array" ) {

            clone = src && isArray( src ) ? src : [];

          } else {

            clone = src && isObject( src ) ? src : {};

          }

          // Never move original objects, clone them
          target[ name ] = extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {

          target[ name ] = copy;

        }

      }

    }

  }

  // Return the modified object
  return target;

};

var hasOwn = {}.hasOwnProperty;

var has = function( obj, key ) {
  return obj != null && hasOwn.call( obj, key );
};

var classExtend = function( protoProps, staticProps, optionalNew ) {

  var parent = this, Child, constructor;

  if ( protoProps && has( protoProps, "constructor" ) ) {
    constructor = protoProps.constructor;
  } else {
    constructor = parent;
  }

  if ( optionalNew ) {

    Child = function() {

      var self = ObjectCreate( Child.prototype ),
          result = apply( constructor, self, arguments );

      // Mimic the constructor's `return` behavior
      // https://es5.github.io/#x13.2.2
      return isObjectLike( result ) ? result : self;

    };

  } else {

    Child = function() {
      return apply( constructor, this, arguments );
    };

  }

  // Extend prototype with the prototype of the parent
  Child.prototype = ObjectCreate( parent.prototype );
  Child.prototype.constructor = Child;

  // Extend prototype with given proto props
  if ( protoProps ) {
    extend( Child.prototype, protoProps );
  }

  // Extend static props with the static props of the parent and the given static props
  extend( Child, parent, staticProps );

  // Set a convenience property in case the parent's prototype is needed later
  Child.__super__ = parent.prototype;

  // Return
  return Child;

};

var ArrayProto = [];

var slice = ArrayProto.slice;

var clone = function( target ) {

  var deep, Cotr, result;

  // Handle a deep cloning situation
  if ( target === true && has( arguments, 1 ) ) {
    deep = target;

    // Skip the boolean
    target = arguments[ 1 ];
  }

  if ( !isObjectLike( target ) ) {
    return target;
  }

  switch ( motaType( target ) ) {

    case "array":
      return deep ? extend( deep, [], target ) : slice.call( target );

    case "number":
    case "string":
    case "date":
    case "boolean":
      Cotr = target.constructor;
      return new Cotr( target );

    case "regexp":
      Cotr = target.constructor;
      result = new Cotr( target );
      result.lastIndex = target.lastIndex;
      return result;

    default:
      return deep ? extend( deep, {}, target ) : extend( {}, target );

  }

};

var nativeKeys = Object.keys;

var motaKeys = function( obj, _in ) {

  if ( !isObjectLike( obj ) ) {
    return [];
  }

  if ( _in ) {

    var key, keys = [];

    for ( key in obj ) {
      keys.push( key );
    }

    return keys;

  }

  return nativeKeys( obj );

};

var createAssigner = function( allKeys, voidOnly ) {

  return function( target ) {

    var length = arguments.length, index, options, keys, l, i, key;

    if ( length < 2 || target == null ) {
      return target;
    }

    for ( index = 1; index < length; index++ ) {

      options = arguments[ index ];
      keys = motaKeys( options, allKeys );
      l = keys.length;

      for ( i = 0; i < l; i++ ) {
        key = keys[ i ];
        if ( !voidOnly || target[ key ] === undefined ) {
          target[ key ] = options[ key ];
        }
      }

    }

    return target;

  };

};

var defaults = createAssigner( true, true );

var err = function( funcName, msg ) {
  throw new Error( funcName + " ERROR: " + msg );
};

var SYMBOL = typeof Symbol === "function" ? Symbol : {};

var getSymbol = function( name ) {
  return SYMBOL[ name ] || "@@" + name;
};

var getBySymbol = function( obj, name ) {
  var real = SYMBOL[ name ];
  return real ? obj[ real ] : obj[ "@@" + name ];
};

var setBySymbol = function( obj, name, value ) {

  var real = SYMBOL[ name ];

  if ( real ) {
    obj[ real ] = value;
  }

  obj[ "@@" + name ] = value;
};

var getSpecies = function( fn ) {
  return getBySymbol( fn, "species" ) || fn;
};

var ISENVNODE = (
  typeof global !== "undefined" &&
  global &&
  toString.call( global.process )
) === "[object process]";

var ObjProp$1 = Object.defineProperty;
var symbolSupport = typeof Symbol === "function";

// For some reason, the assertion
// `mota.view.select( window ) === mota.view.select( window )`
// is failing in node v0.12 with jsdom
if ( ISENVNODE && /^v0/.test( process.version ) ) {
  symbolSupport = false;
}

var EXPANDO = ( symbolSupport && Symbol( "mota internal" ) ) ||
  ( "__mota__" + Math.random() ).replace( /0\./g, "" );

var Data = {

  setup: function( obj, name, value, optimize ) {
    var data = obj[ EXPANDO ];
    if ( !data ) {
      data = { // Optimization (to reduce hidden classes)
        vComp: null,
        events: null
      };
      if ( optimize || symbolSupport ) {
        obj[ EXPANDO ] = data;
      } else {

        // Non-enumerable property
        ObjProp$1( obj, EXPANDO, { writable: true, value: data } );
      }
    }
    return data[ name ] ? data[ name ] : ( data[ name ] = value );
  },

  get: function( obj, name ) {
    var data = obj[ EXPANDO ];
    return data && data[ name ];
  }

};

var STR_CACHE_MAX_SIZE = 255;

// Memoizes the return value of a function that accepts one string argument
function memoizeStringOnly( callback, minStrLen ) {

  var cache = {};
  var cacheSize = 0;

  return function( string ) {

    if ( minStrLen === undefined || string.length > minStrLen ) {

      if ( cache[ string ] === undefined ) {

        if ( cacheSize === STR_CACHE_MAX_SIZE ) {
          cache = {};
          cacheSize = 0;
        }

        cache[ string ] = callback( string );
        cacheSize++;

      }

      return cache[ string ];

    }

    return callback( string );

  };

}

// Perf: http://jsperf.com/convert-to-smi/2
function smi( i ) {
  return ( ( i >>> 1 ) & 1073741824 ) | ( i & 3221225471 );
}

var imul = Math.imul;
if ( typeof imul !== "function" || imul( 0xffffffff, 2 ) !== -2 ) {

  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
  imul = function( a, b ) {
    var ah = ( a >>> 16 ) & 0xffff;
    var al = a & 0xffff;
    var bh = ( b >>> 16 ) & 0xffff;
    var bl = b & 0xffff;
    return ( ( al * bl ) + ( ( ( ah * bl + al * bh ) << 16 ) >>> 0 ) | 0 );
  };
}

var hashString = memoizeStringOnly( function( str ) {

  var i = 0, h = 0;

  // Formula: s[0] * 31 ^ (len - 1) + s[1] * 31 ^ (len - 2) + ... + s[len - 1]
  // We make the result between [ 0 , 2^31 [ by dropping high bits
  // http://jsperf.com/hashing-strings

  for ( ; i < str.length; i++ ) {
    h = h * 31 + str.charCodeAt( i ) | 0;
  }

  return smi( h );

}, 16 );

function hashMerge( a, b ) {
  return a ^ b + 2654435769 + ( a << 6 ) + ( a >> 2 ) | 0;
}

function murmurHashOfSize( h, size ) {
  h = imul( h, 3432918353 );
  h = imul( h << 15 | h >>> -15, 461845907 );
  h = imul( h << 13 | h >>> -13, 5 );
  h = ( h + 3864292196 | 0 ) ^ size;
  h = imul( h ^ h >>> 16, 2246822507 );
  h = imul( h ^ h >>> 13, 3266489909 );
  return smi( h ^ h >>> 16 );
}

function hashImmutableObj( obj ) {

  var ordered = false; // TODO
  var keyed = true; // TODO
  var h = ordered ? 1 : 0;

  /* eslint no-nested-ternary: 0 */

  var size = obj.forEach(
    keyed ?
      ordered ?
        function( v, k ) {
          h = 31 * h + hashMerge( hashCode( v ), hashCode( k ) ) | 0;
        } :
        function( v, k ) {
          h = h + hashMerge( hashCode( v ), hashCode( k ) ) | 0;
        } :
      ordered ?
        function( v ) {
          h = 31 * h + hashCode( v ) | 0;
        } :
        function( v ) {
          h = h + hashCode( v ) | 0;
        }
  );

  return murmurHashOfSize( h, size );
}

var objHashUID = 1;

function getHash( o ) {
  return Data.get( o, "hash" );
}

function hashCode( o ) {

  var type, h;

  if ( !o ) {
    return 0;
  }

  if ( typeof o.valueOf === "function" ) {
    o = o.valueOf();
    if ( !o ) {
      return 0;
    }
  }

  if ( o === true ) {
    return 1;
  }

  type = typeof o;

  if ( type === "number" ) {
    h = o | 0;
    if ( h !== o ) {
      h ^= o * 4294967295;
    }
    while ( o > 4294967295 ) {
      o /= 4294967295;
      h ^= o;
    }
    return smi( h );
  }

  if ( type === "string" ) {
    return hashString( o );
  }

  h = getHash( o );

  if ( h !== undefined ) {
    return h;
  }

  if ( typeof o.isImmutable === "function" && o.isImmutable() ) {

    h = hashImmutableObj( o );

  } else {

    h = objHashUID++;
    if ( objHashUID & 1073741824 ) {
      objHashUID = 1;
    }

  }

  Data.setup( o, "hash", h );

  return h;

}

var baseEqual = function( a, b, checkZero ) {

  /* eslint no-self-compare: 0 */

  if ( a === b ) {
    return !checkZero || a !== 0 || 1 / a === 1 / b;
  }

  if ( a !== a ) {
    return b !== b;
  }

  if ( a == null || b == null ) {
    return a === b;
  }

  // Exhaust primitive checks
  var type = typeof a;
  if ( type !== "function" && type !== "object" && typeof b !== "object" ) {
    return false;
  }

  var className = toString.call( a );
  if ( className !== toString.call( b ) ) {
    return false;
  }

  switch ( className ) {

    case "[object RegExp]":
    case "[object String]":

      return "" + a === "" + b;

    case "[object Number]":

      a = +a;
      b = +b;

      if ( a !== a ) {
        return b !== b;
      }

      if ( a === b ) {
        return !checkZero || a !== 0 || 1 / a === 1 / b;
      }

      return false;

    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;

    default:
      return className;

  }

};

var isFunc = function( obj ) {
  return motaType( obj ) === "function";
};

// Optimize `mota.isFunction` if appropriate
// Work around an IE 11 bug
// Work around a Safari 8 bug: in Safari 8 `typeof Int8Array` returns "object"
if ( typeof /./ != "function" && typeof Int8Array != "object" ) {
  isFunc = function( obj ) {
    return typeof obj == "function" || false;
  };
}

var isFunction = isFunc;

var is = function( a, b ) {

  var baseEqResult = baseEqual( a, b, false );

  if ( baseEqResult === true || baseEqResult === false ) {
    return baseEqResult;
  }

  if ( a.size !== b.size ) {
    return false;
  }

  if ( isFunction( a.isMutable ) && !a.isMutable() && isFunction( b.isMutable ) && !b.isMutable() ) {

    var aHash = getHash( a );
    var bHash = getHash( b );

    if ( aHash != null && bHash != null && aHash !== bHash ) {
      return false;
    }

    var equal = true;
    var notSetValue = {};

    a.forEach( function( value, key ) {

      var bValue = b.get( key, notSetValue );

      if ( bValue === notSetValue || !is( value, bValue ) ) {
        return ( equal = false );
      }

    } );

    return equal;

  }

  return false;
};

var isArguments = function( obj ) {
  return toString.call( obj ) === "[object Arguments]";
};

var warn = function( funcName, msg ) {
  console.warn( funcName + " WARNS: " + msg );
};

var window = ( typeof self == "object" && self.self === self && self ) ||
  ( typeof global == "object" && global.global === global && global );

var document = window && window.document;

var setWindow = function( win ) {
  if ( !isWindow( win ) ) {
    if ( true ) {
      warn( "mota.setWindow", "Please provide a correct window or global object." );
    }
    return;
  }
  window = win;
  document = win.document;
};

var strWin = "[object Window]";
var strWin2 = "[object global]"; // Chrome & Opera (and Safari?) + Node

var isWindow = function( obj ) {

  if ( obj === window ) {
    return true;
  }

  if ( !obj || typeof obj !== "object" ) {
    return false;
  }

  if ( !ISENVNODE && obj.window !== obj ) {
    return false;
  }

  var className = toString.call( obj );

  return className === strWin || className === strWin2;

};

// Ref: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
var MAX_ARRAY_INDEX = Math.pow( 2, 53 ) - 1;

var isArrayLike = function( obj ) {

  var type = motaType( obj ), length;

  if ( type === "array" ) {
    return true;
  }

  if ( type !== "object" || isWindow( obj ) ) {
    return false;
  }

  // Ref: http://stackoverflow.com/questions/28155841/misterious-failure-of-jquery-each-and-underscore-each-on-ios
  length = "length" in obj && obj.length;

  if ( length === 0 ) {
    return true;
  }

  return typeof length === "number" &&
    length > 0 && length <= MAX_ARRAY_INDEX && ( length - 1 ) in obj;

};

var isBoolean = function( obj ) {
  return obj === true || obj === false || motaType( obj ) === "boolean";
};

var isDate = function( obj ) {
  return motaType( obj ) === "date";
};

var strDoc = "[object HTMLDocument]";
var strDoc2 = "[object Document]";

var isDocument = function( obj ) {

  var defaultView;

  if ( obj === document ) {
    return true;
  }

  if ( !obj || obj.parentNode !== null || !( defaultView = obj.defaultView ) ) {
    return false;
  }

  // The server side should be safe
  // but with the browser, we need to check the [[Class]] name

  if ( ISENVNODE ) {
    return isWindow( defaultView );
  }

  var className = toString.call( obj );
  return className === strDoc || className === strDoc2;

};

var isElement = function( obj ) {

  if ( !obj || obj.nodeType !== 1 ) {
    return false;
  }

  // The server side should be safe
  // but with the browser, we need to check the [[Class]] name

  if ( ISENVNODE ) {
    return true;
  }

  return toString.call( obj ).indexOf( "Element" ) > -1;

};

var isString = function( obj ) {
  return motaType( obj ) === "string";
};

var isEmpty = function( obj ) {
  if ( obj == null ) {
    return true;
  }
  if ( isArray( obj ) || isString( obj ) || isArguments( obj ) ) {
    return obj.length === 0;
  }
  for ( var key in obj ) {
    if ( has( obj, key ) ) {
      return false;
    }
  }
  return true;
};

var isPlainObject = function( obj ) {

  var ctor;

  // If it's not an object
  // and if `constructor` was overwritten
  if (
    !obj || typeof obj !== "object" ||
    toString.call( obj ) !== "[object Object]" || has( obj, "constructor" )
  ) {
    return false;
  }

  // If constructor is null or undefined
  // e.g. 'Object.create( null )'
  if ( !( ctor = obj.constructor ) ) {
    return true;
  }

  // If has constructor (and if it's a function)
  // {}.constructor        instanceof {}.constructor        > true
  // (new Foo).constructor instanceof (new Foo).constructor > false
  return isFunction( ctor ) && ctor instanceof ctor;

};

var eq = function( a, b, aStack, bStack ) {

  var baseEqResult = baseEqual( a, b, true );

  if ( baseEqResult === true || baseEqResult === false ) {
    return baseEqResult;
  }

  var areArrays = baseEqResult === "[object Array]";

  if ( !areArrays ) {

    // Handle functions
    if ( typeof a != "object" || typeof b != "object" ) {
      return false;
    }

    var aCtor = a.constructor, bCtor = b.constructor;
    if (

      // Different constructors
      aCtor !== bCtor &&

      // And one of them is not a plain object
      ( !isPlainObject( a ) || !isPlainObject( b ) )
    ) {
      return false;
    }

  }

  // If we are here, means that we are working with:
  // arrays, or plain objects, or objects with the same constructor

  // Initializing stack of traversed objects
  // It's done here since we only need them for objects and arrays comparison
  aStack = aStack || [];
  bStack = bStack || [];

  // Detect cyclic structures
  var length = aStack.length;
  while ( length-- ) {
    if ( aStack[ length ] === a ) {
      return bStack[ length ] === b;
    }
  }

  aStack.push( a );
  bStack.push( b );

  if ( areArrays ) {

    length = a.length;
    if ( length !== b.length ) {
      return false;
    }

    while ( length-- ) {
      if ( !( eq( a[ length ], b[ length ], aStack, bStack ) ) ) {
        return false;
      }
    }

  } else {

    var keys = motaKeys( a ), key;
    length = keys.length;

    if ( motaKeys( b ).length !== length ) {
      return false;
    }

    while ( length-- ) {
      key = keys[ length ];
      if ( !( has( b, key ) && eq( a[ key ], b[ key ], aStack, bStack ) ) ) {
        return false;
      }
    }

  }

  aStack.pop();
  bStack.pop();

  return true;

};

var isEqual = function( a, b ) {
  return eq( a, b );
};

var isError = function( obj ) {
  return motaType( obj ) === "error";
};

var isNumber = function( obj ) {
  return motaType( obj ) === "number";
};

var nativeIsFinite = isFinite;

var motaIsFinite = function( obj ) {
  return isNumber( obj ) && nativeIsFinite( obj );
};

var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;

var DONE = Object.freeze( { value: undefined, done: true } );

function getIterator( obj ) {
  var real = SYMBOL.iterator;
  return real ? obj[ real ]() : obj[ "@@iterator" ]();
}

function getIteratorFn( obj ) {
  var real = SYMBOL.iterator;
  return real ? obj[ real ] : obj[ "@@iterator" ];
}

function setIteratorFn( obj, func ) {

  var real = SYMBOL.iterator;

  if ( real ) {
    obj[ real ] = func;
  }

  obj[ "@@iterator" ] = func;
}

function createIterableClass( clazz, IteratorFn, iteratorType ) {
  var proto = clazz.prototype;
  proto.entries = function() {
    return new IteratorFn( this, ITERATE_ENTRIES );
  };
  proto.values = function() {
    return new IteratorFn( this, ITERATE_VALUES );
  };
  proto.keys = function() {
    return new IteratorFn( this, ITERATE_KEYS );
  };
  setIteratorFn( proto, proto[ iteratorType ] );
}

function isIterable( obj ) {
  return isArray( obj ) || (
    !!obj && isFunction( getIteratorFn( obj ) )
  );
}

function isIndexed( obj ) {
  return isArray( obj ) || ( // It seems that [].values doesn't exist in some places
    !!obj && obj.values !== obj.keys &&
    isFunction( obj.values ) && isFunction( obj.keys ) &&
    obj.values === getIteratorFn( obj )
  );
}

function isKeyed( obj ) {
  return !!obj && isFunction( obj.entries ) && obj.entries === getIteratorFn( obj );
}

function isAssociative( obj ) {
  return isIndexed( obj ) || isKeyed( obj );
}

var motaIsNaN = function( obj ) {
  /* eslint eqeqeq: 0 */
  return obj != +obj && isNumber( obj );
};

var isNil = function( obj ) {
  return obj == null;
};

var isNull = function( obj ) {
  return obj === null;
};

var isRegExp = function( obj ) {
  return motaType( obj ) === "regexp";
};

var isUndefined = function( obj ) {
  return obj === undefined;
};

var log = function( funcName, msg ) {
  console.log( funcName + " LOG: " + msg );
};

function mixinHelper( funcs, original ) {

  return function() {
    for ( var i = 0; i < funcs.length; i++ ) {
      apply( funcs[ i ], this, arguments );
    }
    return apply( original, this, arguments );
  };

}

var mixin = function( clazz, args ) {

  var prototype = clazz && clazz.prototype, methods = {}, arg, name, original;

  if ( !prototype ) {
    return clazz;
  }

  for ( var i = 0; i < args.length; i++ ) {

    arg = args[ i ];

    for ( name in arg ) {

      if ( !methods[ name ] ) {
        methods[ name ] = [];
      }

      methods[ name ].push( arg[ name ] );

    }

  }

  for ( name in methods ) {
    original = prototype[ name ];
    prototype[ name ] = mixinHelper( methods[ name ], isFunction( original ) && original );
  }

  return clazz;

};

var _mota = window.mota;

var noConflict = function() {
  if ( _mota ) {
    window.mota = _mota;
  }
  return this;
};

var noop = function() {};

function sliceArgs( arr, k ) {
  var newArr = [], i = 0, j = i + k;
  for ( ; j < arr.length; i++, j++ ) {
    newArr[ i ] = arr[ j ];
  }
  return newArr;
}

var noPartial = function( func, context ) {
  return function() {
    return apply( func, context, sliceArgs( arguments, 0 ) );
  };
};

var pairs = function( obj ) {
  var keys = motaKeys( obj ),
      length = keys.length,
      pairs = Array( length ),
      i = 0;
  for ( ; i < length; i++ ) {
    pairs[ i ] = [ keys[ i ], obj[ keys[ i ] ] ];
  }
  return pairs;
};

var ids = {};
var uniqueId = function( prefix ) {
  prefix = prefix ? prefix + "" : "";
  if ( !ids[ prefix ] ) {
    ids[ prefix ] = 0;
  }
  return prefix + ( ++ids[ prefix ] );
};

var validate = function( obj, propTypes ) {

  var prop, rule;

  for ( prop in propTypes ) {

    rule = propTypes[ prop ];

    if ( rule && !rule( obj[ prop ], prop, obj ) ) {
      return false;
    }

  }

  return true;

};

var utilities = {
  apply: apply,
  classExtend: classExtend,
  clone: clone,
  extend: extend,
  defaults: defaults,
  err: err,
  getSpecies: getSpecies,
  has: has,
  is: is,
  isArguments: isArguments,
  isArray: isArray,
  isArrayLike: isArrayLike,
  isBoolean: isBoolean,
  isDate: isDate,
  isDocument: isDocument,
  isElement: isElement,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isError: isError,
  isFinite: motaIsFinite,
  isFunction: isFunction,

  isIterable: isIterable,
  isIndexed: isIndexed,
  isKeyed: isKeyed,
  isAssociative: isAssociative,

  isNaN: motaIsNaN,
  isNil: isNil,
  isNull: isNull,
  isNumber: isNumber,
  isObject: isObject,
  isObjectLike: isObjectLike,
  isPlainObject: isPlainObject,
  isRegExp: isRegExp,
  isString: isString,
  isUndefined: isUndefined,
  isWindow: isWindow,
  keys: motaKeys,
  log: log,
  mixin: mixin,
  noConflict: noConflict,
  noop: noop,
  noPartial: noPartial,
  pairs: pairs,
  type: motaType,
  uniqueId: uniqueId,
  validate: validate,
  warn: warn
};

function EventListener( type, namespaces, handler, context, isRegExp ) {
  this.type = type;
  this.namespaces = namespaces;
  this.handler = handler;
  this.context = context;
  this.isRegExp = isRegExp;
  this.once = false;
  this._index = -1;
}

var rnotwhite = /\S+/g;
var rnamespace = /\.[^.]+/g;
var rtype = /^[^.]+/g;

function buildListeners( params, result ) {

  var i, noopArr = [],
      eventType = params[ 0 ],
      handler = params[ 1 ],
      context = params[ 2 ],
      type, namespaces,
      objType = motaType( eventType ),
      isRegExp = objType === "regexp";

  // Handle eventType: /regexp/, handler, context
  if ( isRegExp ) {

    result.push( new EventListener( eventType, undefined, handler, context, isRegExp ) );

  // Handle eventType: { "type": handler }, undefined, context
  // Handle eventType: { "type": handler }, context
  } else if ( objType === "object" ) {

    if ( handler ) {
      context = handler;
    }

    for ( type in eventType ) {
      buildListeners( [ type, eventType[ type ], context ], result );
    }

  // Handle eventType: "type1 type2", handler, context
  } else {

    eventType = ( eventType || "" ).match( rnotwhite ) || [ "" ];

    // Handle multiple events separated by a space
    for ( i = 0; i < eventType.length; i++ ) {

      type = ( eventType[ i ].match( rtype ) || noopArr )[ 0 ];
      namespaces = eventType[ i ].match( rnamespace );

      result.push( new EventListener( type, namespaces, handler, context, isRegExp ) );

    }

  }

  return result;

}

var SmartListProto = {

  length: function() {
    return this.arr.length;
  },

  add: function( obj ) {
    obj._index = this.arr.push( obj ) - 1;
  },

  remove: function( obj ) {
    var list = this.arr;
    for ( var i = obj._index, k = i + 1, n = list.length; k < n; i += 1, k += 1 ) {
      list[ i ] = list[ k ];
      list[ i ]._index = i;
    }
    list.pop();
  },

  forEach: function( callback ) {
    var list = this.arr;
    for ( var i = 0, len = list.length; i < len; i++ ) {
      callback( list[ i ] );
    }
  },

  safeForEach: function( callback ) {
    var list = this.arr;
    var i = 0;
    var len = list.length;
    var newList = [];
    for ( ; i < len; i++ ) {
      newList.push( list[ i ] );
    }
    for ( i = 0; i < len; i++ ) {
      callback( newList[ i ] );
    }
  }

};

function inCommonWith( parArr1, parArr2 ) {
  var arr1, arr2, i;

  if ( parArr1.length > parArr2.length ) {
    // I want arr1 to be the one that has less length
    arr1 = parArr2;
    arr2 = parArr1;
  } else {
    arr1 = parArr1;
    arr2 = parArr2;
  }

  i = arr1.length;

  while ( i-- ) {
    if ( arr2.indexOf( arr1[ i ] ) > -1 ) {
      return true;
    }
  }

  return false;
}

function getMatch( thisListener, otherListener, type, namespaces, handler, context, tryToMatch ) {

  var match;
  var didMatch = (
    (
      !type || is( thisListener.type, type ) ||
      (
        tryToMatch &&
        thisListener.isRegExp &&
        ( match = type.match( thisListener.type ) )
      )
    ) &&
    (
      !handler || thisListener.handler === handler
    ) &&
    (
      !namespaces || namespaces.length === 0 ||
      ( thisListener.namespaces && inCommonWith( thisListener.namespaces, namespaces ) )
    ) &&
    (
      !context || thisListener.context === context
    )
  );

  return match === undefined ? didMatch : match;

}

function EventListenerList() {
  this.arr = [];
  this._maxListeners = undefined;
}

EventListenerList.prototype = extend( {

  constructor: EventListenerList,

  getListeners: function( results, otherListener, action ) {

    var onlyFirst = action === "getFirst",
        tryToMatch = action === "trigger",
        type = otherListener.type,
        namespaces = otherListener.namespaces,
        handler = otherListener.handler,
        context = otherListener.context;

    this.forEach( function( listener ) {
      var match = getMatch( listener, otherListener, type, namespaces, handler, context, tryToMatch );
      if ( match ) {
        results.push( { listener: listener, string: type, match: match } );
        if ( onlyFirst ) {
          return false;
        }
      }
    } );

  }

}, SmartListProto );

function setup( obj ) {
  return Data.setup( obj, "events", new EventListenerList() );
}

var eventsApi = function( object, action, callback, params, arg ) {

  var i, eventListenerList, listeners, listener, results;

  if ( !object ) {
    return;
  }

  eventListenerList = action === "on" ? setup( object ) : Data.get( object, "events" );

  listeners = buildListeners( params, [] );

  if ( action === "on" ) {

    for ( i = 0; i < listeners.length; i++ ) {
      listener = listeners[ i ];
      if ( listener.type && listener.handler ) {
        callback(
          object,
          eventListenerList,
          { listener: listener },
          arg
        );
      }
    }

  } else if ( eventListenerList ) {

    results = [];

    for ( i = 0; i < listeners.length; i++ ) {
      eventListenerList.getListeners( results, listeners[ i ], action );
    }

    for ( i = 0; i < results.length; i++ ) {
      if ( callback( object, eventListenerList, results[ i ], arg ) === false ) {
        break;
      }
    }

  }

  return object;

};

var eventsApiGet = function( object, eventListenerList, data, result ) {
  var listener = data.listener;
  result.push( {
    type: listener.type,
    namespaces: listener.namespaces,
    handler: listener.handler,
    context: listener.context,
    once: listener.once,
    isRegExp: listener.isRegExp
  } );
};

var getListeners = function( eventType, handler, context ) {
  var result = [];
  eventsApi( this, "get", eventsApiGet, [ eventType, handler, context ], result );
  return result;
};

var getMaxListeners = function() {
  var events = Data.get( this, "events" );
  var n = events && events._maxListeners;
  return typeof n === "number" ? n : false;
};

var eventsApiHas = function( object, eventListenerList, data, result ) {
  result.value = true;
  return false;
};

var hasListeners = function( eventType, handler, context ) {
  var result = { value: false };
  eventsApi( this, "getFirst", eventsApiHas, [ eventType, handler, context ], result );
  return result.value;
};

var eventsApiOff = function( object, eventListenerList, data ) {
  var listener = data.listener;

  // Edge case: unbind a callback in the midst of its firing
  listener.handler = undefined;

  eventListenerList.remove( listener );
};

var off = function( eventType, handler, context ) {
  return eventsApi( this, "off", eventsApiOff, [ eventType, handler, context ] );
};

var now = Date.now;

var data = {};
var uid = 1;
var key = "vComp";
var check = function( el ) {
      if ( el.nodeType && el.nodeType !== 3 ) {
        return 1;
      }
      return el === el.window ? 2 : 0;
    };
var motaViewData = {
  add: function( component ) {

    var id, el = component.el, c = check( el );

    if ( c ) {
      id = Data.get( el, key );
      if ( !id ) {
        id = uid++;
        Data.setup( el, key, id, c === 1 );
      }
      return ( data[ id ] = component );
    }

  },
  remove: function( el ) {

    var id = check( el ) && Data.get( el, key );

    if ( id ) {
      data[ id ] = null;
    }

  },
  get: function( el ) {
    return data[ check( el ) && Data.get( el, key ) ];
  }
};

var BREAK = {};

function createIteratee( func, context ) {
  return context == null ? func : function( a, b, c ) {
    return func.call( context, a, b, c );
  };
}

function forEachArrayLike( obj, iteratee ) {
  for ( var i = 0; i < obj.length; i++ ) {
    if ( iteratee( obj[ i ], i, obj ) === BREAK ) {
      return;
    }
  }
}

function forEachIdxIterable( obj, iteratee, iterator ) {

  var i = 0, step;

  while ( !( step = iterator.next() ).done ) {
    if ( iteratee( step.value, i, obj ) === BREAK ) {
      return;
    }
    i++;
  }

}

function forEachKeyedIterable( obj, iteratee, iterator ) {

  var step, entry;

  while ( !( step = iterator.next() ).done ) {
    entry = step.value;
    if ( iteratee( entry[ 1 ], entry[ 0 ], obj ) === BREAK ) {
      break;
    }
  }

}

function forEachObj( obj, iteratee ) {

  var key, i = 0, keys = nativeKeys( obj );

  for ( ; i < keys.length; i++ ) {
    key = keys[ i ];
    if ( iteratee( obj[ key ], key, obj ) === BREAK ) {
      return;
    }
  }

}

function forEachNotArrayLike( obj, iteratee, allowObject ) {

  var iteratorFn, iterator;

  // if ( isFunction( obj.forEach ) ) {
  //  return obj.forEach( iteratee );
  // }

  iteratorFn = getIteratorFn( obj );

  if ( isFunction( iteratorFn ) ) {

    iterator = getIterator( obj );

    if ( iteratorFn === obj.entries ) {

      // Iterator will provide entry [k,v]
      return forEachKeyedIterable( obj, iteratee, iterator );

    }

    return forEachIdxIterable( obj, iteratee, iterator );

  }

  return allowObject === false ? undefined : forEachObj( obj, iteratee );

}

// An universal way to iterate over values in an iterable
var forEach = function( obj, func, context, allowObject ) {

  if ( !obj || typeof obj !== "object" ) {
    return;
  }

  var iteratee = createIteratee( func, context );

  return isArray( obj ) || isArrayLike( obj ) ?
    forEachArrayLike( obj, iteratee ) :
    forEachNotArrayLike( obj, iteratee, allowObject );

};

forEach.BREAK = BREAK;

function BinaryTreeNode( data ) {
  this.data = data;
  this.left = null;
  this.right = null;
}

BinaryTreeNode.prototype = {
  add: function( data ) {
    if ( this.data.depth - data.depth > 0 ) {
      this.addLeft( data );
    } else {
      this.addRight( data );
    }
  },

  addLeft: function( data ) {
    var left = this.left;
    if ( left ) {
      left.add( data );
    } else {
      this.left = new BinaryTreeNode( data );
    }
  },

  addRight: function( data ) {
    var right = this.right;
    if ( right ) {
      right.add( data );
    } else {
      this.right = new BinaryTreeNode( data );
    }
  },

  traverse: function( callback ) {

    var left = this.left;
    var right = this.right;

    if ( left ) {
      left.traverse( callback );
    }

    callback( this.data );

    if ( right ) {
      right.traverse( callback );
    }

  }
};

var BinaryTree = function() {
  this.root = null;
};

BinaryTree.prototype = {
  isEmpty: function() {
    return !this.root;
  },

  add: function( data ) {
    if ( this.root ) {
      this.root.add( data );
    } else {
      this.root = new BinaryTreeNode( data );
    }
  },

  reset: function() {
    this.root = null;
  },

  resetAndTraverse: function( callback ) {
    var root = this.root;
    this.root = null;
    if ( root ) {
      root.traverse( callback );
    }
  }
};

function insertChildAt( elem, index, parentNode ) {

  // We can rely on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`.
  // However, using `undefined` is not allowed by all
  // browsers so we must replace it with `null`.
  // In Safari, .childNodes[index] can return a DOM node with id={index} so we
  // use .item() instead which is immune to this bug.
  var childNodes = parentNode.childNodes,
      beforeChild = index >= childNodes.length ? null : childNodes.item( index );

  if ( elem !== beforeChild ) {
    parentNode.insertBefore( elem, beforeChild );
  }
}

function dirtyComponentsIteratee( internal ) {
  if ( internal.queued ) { // Make sure this component wasn't updated already
    internal.update( null, null, internal.renderToString );
  }
}

function pendingAttrUpdatesIteratee( update ) {

  var elem = update.elem,
      name = update.name,
      value = update.value,
      type = update.type;

  if ( type === "attr" ) {

    if ( value == null ) {
      elem.removeAttribute( name );
    } else {
      elem.setAttribute( name, value + "" );
    }

  } else if ( type === "prop" ) {

    elem[ name ] = value;

  } else if ( type === "style" ) {

    elem.style[ name ] = value;

  }

}

function pendingElemDeletionsIteratee( update ) {
  var elem = update.elem;
  elem.parentNode.removeChild( elem );
}

function pendingElemInsertionsMovesIteratee( update ) {
  return insertChildAt( update.elem, update.index, update.parent );
}

function pendingCallbacksIteratee( obj ) {
  obj.component[ obj.name ]( obj.arg );
}

// Updater

var ignore = 0;
var flushingUpdates = false;
var dirtyComponents = new BinaryTree();
var pendingAttrUpdates = [];
var pendingElemDeletions = [];
var pendingElemInsertions = [];
var pendingElemMoves = [];
var pendingEdgeCaseUpdates = [];
var pendingCallbacks = [];

var updaterFlushUpdates = function() {

  if ( flushingUpdates || ignore || dirtyComponents.isEmpty() ) {
    return;
  }

  // We are now flushing updates
  flushingUpdates = true;

  // Traverse dirty components and reset list
  dirtyComponents.resetAndTraverse( dirtyComponentsIteratee );

  // Update attrs and reset stack
  forEachArrayLike( pendingAttrUpdates, pendingAttrUpdatesIteratee );

  // Update elements (deletions, insertions, moves) and reset stacks
  forEachArrayLike( pendingElemDeletions, pendingElemDeletionsIteratee );
  forEachArrayLike( pendingElemInsertions, pendingElemInsertionsMovesIteratee );
  forEachArrayLike( pendingElemMoves, pendingElemInsertionsMovesIteratee );

  // Take care of edge cases where we need to update props after mounting children
  forEachArrayLike( pendingEdgeCaseUpdates, pendingAttrUpdatesIteratee );

  // Call pending callbacks and reset stack
  forEachArrayLike( pendingCallbacks, pendingCallbacksIteratee );

  // Reset
  pendingAttrUpdates.length = 0;
  pendingElemDeletions.length = 0;
  pendingElemInsertions.length = 0;
  pendingElemMoves.length = 0;
  pendingEdgeCaseUpdates.length = 0;
  pendingCallbacks.length = 0;

  // We stopped flushing updates
  flushingUpdates = false;

  // But check if an update was queued during the previous process
  updaterFlushUpdates();

};

var updaterQueueAttrUpdate = function( elem, name, value, type ) {
  pendingAttrUpdates.push( {
    elem: elem,
    name: name,
    value: value,
    type: type
  } );
};

var updaterQueueElemDeletion = function( elem ) {
  pendingElemDeletions.push( {
    elem: elem,
    index: null,
    parent: null
  } );
};

var updaterQueueElemInsertion = function( elem, index, parent ) {
  pendingElemInsertions.push( {
    elem: elem,
    index: index,
    parent: parent
  } );
};

var updaterQueueElemMove = function( elem, index, parent ) {
  pendingElemMoves.push( {
    elem: elem,
    index: index,
    parent: parent
  } );
};

var updaterQueueEdgeCaseUpdate = function( elem, name, value, type ) {
  pendingEdgeCaseUpdates.push( {
    elem: elem,
    name: name,
    value: value,
    type: type
  } );
};

var updaterQueueCallback = function( component, name, arg ) {
  pendingCallbacks.push( {
    component: component,
    name: name,
    arg: arg
  } );
};

var updaterError = function( msg, owner ) {

  var errText = owner ? " Please check the code for the " +
    owner.constructor.displayName + " component." : "";

  ignore = 0;
  flushingUpdates = false;
  dirtyComponents.reset();
  pendingAttrUpdates.length = 0;
  pendingElemDeletions.length = 0;
  pendingElemInsertions.length = 0;
  pendingElemMoves.length = 0;
  pendingEdgeCaseUpdates.length = 0;
  pendingCallbacks.length = 0;

  err( "mota.view.Component.update", msg + errText );
};

var updaterQueueUpdate = function( internal ) {
  dirtyComponents.add( internal );
  updaterFlushUpdates();
};

var updaterStartIgnore = function() {
  ignore++;
};

var updaterEndIgnore = function() {
  ignore--;
  updaterFlushUpdates();
};

var eventProps = {};
var rkeyEvent = /^key/;
var rpointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/;
var eventTypes = {
      mousewheel: "wheel",
      DOMMouseScroll: "whell"
    };
var hooks = {
  which: function( e ) {

    /* eslint no-nested-ternary: 0 */

    if ( rpointerEvent.test( e.type ) ) {

      var button = e.button;

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      return !e.which && button !== undefined ?
        button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) :
        e.which;
    }

    if ( rkeyEvent.test( e.type ) ) {
      return e.which == null ? e.charCode == null ? e.keyCode : e.charCode : e.which;
    }

  },
  pageX: function( event, target ) {

    var eventDoc, doc, body;

    if ( event.pageX == null && event.clientX != null ) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      return event.clientX +
        ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
        ( doc && doc.clientLeft || body && body.clientLeft || 0 );
    }

    return event.pageX;

  },
  pageY: function( event, target ) {

    var eventDoc, doc, body;

    if ( event.pageY == null && event.clientY != null ) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      return event.clientY +
        ( doc && doc.scrollTop || body && body.scrollTop || 0 ) -
        ( doc && doc.clientTop || body && body.clientTop || 0 );
    }

    return event.pageY;

  },
  path: function( event, target ) {

    // This will run in the capture phase so, don't use `event.path`
    // because at this point it's `[ Window ]`

    var elem = target, path = [ elem ];

    while ( ( elem = elem.parentNode || elem.defaultView ) ) {
      path.push( elem );
    }

    return path;
  }
};

var addEventGetter = function( name ) {

  eventProps[ name ] = true;

  Object.defineProperty( ViewEvent.prototype, name, {
    enumerable: true,
    configurable: true,

    get: function() {
      var value, hook;

      if ( this.originalEvent ) {
        hook = hooks[ name ];
        value = hook ? hook( this.originalEvent, this.target ) : this.originalEvent[ name ];
      }

      return ( this[ name ] = value );
    },

    set: function( value ) {
      Object.defineProperty( this, name, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
      } );
    }
  } );

};

function ViewEvent( src ) {

  var name, target;

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

  // Event type
  } else {
    this.type = src;
  }

  for ( name in this.originalEvent ) {
    if ( !eventProps[ name ] && this[ name ] == null ) {
      addEventGetter( name );
    }
  }

  // Fix type
  if ( this.type in eventTypes ) {
    this.type = eventTypes[ this.type ];
  }

  // Create a timestamp if event doesn't have one
  if ( !this.timeStamp ) {
    this.timeStamp = now();
  }

  target = this.target;

  // Support: Safari 6.0+
  // Target should not be a text node
  if ( target && target.nodeType === 3 ) {
    this.target = target.parentNode;
  }

}

ViewEvent.prototype = {
  constructor: ViewEvent,
  isDefaultPrevented: false,
  isPropagationStopped: false,
  isImmediatePropagationStopped: false,
  stopPropagation: function() {
    this.isPropagationStopped = true;
  },
  stopImmediatePropagation: function() {
    this.isPropagationStopped = true;
    this.isImmediatePropagationStopped = true;
  },
  preventDefault: function() {
    this.isDefaultPrevented = true;
    this.originalEvent.preventDefault();
  }
};

nativeKeys( hooks ).forEach( addEventGetter );

var forEachEventListener = function( object, eventListenerList, data, event ) {

  var listener = data.listener;
  var handler = listener.handler;

  if ( event.isImmediatePropagationStopped ) {
    return false;
  }

  if ( listener.once ) {
    eventsApiOff( object, eventListenerList, data );
  }

  event.currentTarget = object.el;

  event.result = apply(
    handler,
    listener.context === undefined ? object : listener.context,
    listener.isRegExp ? [ { string: data.string, match: data.match }, event ] : [ event ]
  );

};

var dispatchEvents = function( nativeEvent ) {

  var event = new ViewEvent( nativeEvent ),
      type = event.type,
      path = event.path,
      i = 0,
      component;

  updaterStartIgnore();

  for ( ; i < path.length && !event.isPropagationStopped; i++ ) {

    component = motaViewData.get( path[ i ] );

    if ( component ) {
      eventsApi( component, "trigger", forEachEventListener, [ type ], event );
    }

    if ( !event.bubbles ) {
      break;
    }

  }

  updaterEndIgnore();

};

var allEventTypes = {};

var events = {
  dispatchEvents: dispatchEvents,
  register: function( name ) {

    // var win = component.el.ownerDocument.defaultView;

    if (
      !allEventTypes[ name ] &&
      window.addEventListener &&
      ( ( "on" + name ) in window || /^pointer/.test( name ) )
    ) {

      // To listen all events (even those that don't bubble),
      // add the event listener to `window` in the capture phase
      window.addEventListener( name, dispatchEvents, true );

      allEventTypes[ name ] = true;

    }

  }
};

var SENTINEL = "@@__MOTA_VIEW_COMPONENT__@@";

function isViewComponent( obj ) {
  return !!( obj && obj[ SENTINEL ] );
}

function addSentinel( func ) {
  func.prototype[ SENTINEL ] = true;
}

var eventsApiOn = function( object, eventListenerList, data, once ) {

  var listener = data.listener;

  if ( once ) {
    listener.once = true;
  }

  eventListenerList.add( listener );

  if ( eventListenerList.length() > eventListenerList._maxListeners ) {
    warn(
      "mota.Events.on",
      "Possible memory leak detected. Use `setMaxListeners` to increase the limit of listeners."
    );
  }

  if ( isViewComponent( object ) ) {
    events.register( listener.type );
  }

};

var on = function( eventType, handler, context, once ) {
  return eventsApi( this, "on", eventsApiOn, [ eventType, handler, context ], once );
};

var once = function( eventType, handler, context ) {
  return on.call( this, eventType, handler, context, true );
};

var setMaxListeners = function( n ) {

  if ( typeof n !== "number" || n < 0 || isNaN( n ) ) {
    n = undefined;
  }

  setup( this )._maxListeners = n;

  return this;
};

var eventsApiTrigger = function( object, eventListenerList, data, args ) {

  var listener = data.listener;
  var handler = listener.handler;

  if ( listener.once ) {
    eventsApiOff( object, eventListenerList, data );
  }

  apply(
    handler,
    listener.context === undefined ? object : listener.context,
    listener.isRegExp ? [ { string: data.string, match: data.match } ].concat( args ) : args
  );
};

var trigger = function( eventType ) {
  return eventsApi( this, "trigger", eventsApiTrigger, [ eventType ], sliceArgs( arguments, 1 ) );
};

var Events = {
  getListeners: getListeners,
  getMaxListeners: getMaxListeners,
  hasListeners: hasListeners,
  off: off,
  on: on,
  once: once,
  setMaxListeners: setMaxListeners,
  trigger: trigger
};

var INIT = {};
var NOT_SET = {};
var SHIFT = 5;
var SIZE = 32;
var MASK = SIZE - 1;
var MAP_SENTINEL = "@@__MOTA_MAP__@@";

function List( owner ) {
  this.children = []; // new Array( 32 )
  this.owner = owner;
  this.bitmap = 0;
}

function popCount( x ) {
  x -= ( x >> 1 ) & 1431655765;
  x = ( x & 858993459 ) + ( ( x >> 2 ) & 858993459 );
  x = ( x + ( x >> 4 ) ) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}

List.prototype = {

  isLeaf: false,

  loop: function( fn, map ) {
    var children = this.children, i = 0;
    for ( ; i < children.length; i++ ) {
      if ( children[ i ].loop( fn, map ) === true ) {
        return true;
      }
    }
  },

  get: function( key, hash, shift, notSetValue ) {

    if ( hash === undefined ) {
      hash = hashCode( key );
    }

    var bit = 1 << ( ( shift === 0 ? hash : hash >>> shift ) & MASK ),
        bitmap = this.bitmap;

    return ( bitmap & bit ) === 0 ? notSetValue :
      this.children[ popCount( bitmap & ( bit - 1 ) ) ].get( key, hash, shift + SHIFT, notSetValue );
  },

  modify: function( key, value, hash, shift, owner, ref ) {

    var list = this, step, bit, bitmap,
        exists, idx, len, newNode, prevNode,
        children = this.children, maybeLeaf;

    // Get each 5 sequence bit starting from the end
    step = ( shift === 0 ? hash : hash >>> shift ) & MASK;

    bit = 1 << step;
    bitmap = this.bitmap;
    exists = ( bitmap & bit ) !== 0;

    if ( !exists && value === NOT_SET ) {
      return this;
    }

    idx = popCount( bitmap & ( bit - 1 ) );

    if ( exists ) {
      prevNode = this.children[ idx ];
      newNode = prevNode.modify( key, value, hash, shift + SHIFT, owner, ref );
    } else {
      ref.changeValue = true;
      ref.changeSize = true;
      newNode = new Leaf( key, value, hash, owner );
    }

    if ( !newNode ) {
      len = children.length;
      if ( len === 1 ) {
        return;
      }
      maybeLeaf = children[ idx ^ 1 ];
      if ( len === 2 && maybeLeaf.isLeaf ) {
        return maybeLeaf;
      }
    }

    if ( newNode !== prevNode ) {
      /* eslint no-nested-ternary: 0 */
      list = exists ? newNode ?
        this.cloneUpdate( owner, idx, newNode ) :
        this.cloneSpliceOut( owner, idx ) :
        this.cloneSpliceIn( owner, idx, newNode );
      list.bitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    }

    return list;
  },

  cloneUpdate: function( owner, idx, newNode ) {
    if ( owner && this.owner === owner ) {
      this.children[ idx ] = newNode;
      return this;
    }
    var node = new List( owner );
    var children = this.children;
    for ( var i = 0; i < children.length; i++ ) {
      node.children[ i ] = i === idx ? newNode : children[ i ];
    }
    return node;
  },

  cloneSpliceOut: function( owner, idx ) {

    var children = this.children;
    var newLen = children.length - 1;
    var i = 0, after = 0;

    if ( owner && this.owner === owner ) {
      for ( i = idx; i < newLen; i++ ) {
        children[ i ] = children[ i + 1 ];
      }
      children.pop();
      return this;
    }

    var list = new List( owner );

    for ( ; i < newLen; i++ ) {
      if ( i === idx ) {
        after = 1;
      }
      list.children[ i ] = children[ i + after ];
    }

    return list;
  },

  cloneSpliceIn: function( owner, idx, newNode ) {

    var children = this.children;
    var newLen = children.length + 1;
    var i = 0, after = 0;

    if ( owner && this.owner === owner ) {
      for ( i = newLen - 1; i > idx; i-- ) {
        children[ i ] = children[ i - 1 ];
      }
      children[ idx ] = newNode;
      return this;
    }

    var list = new List( owner );

    for ( ; i < newLen; i++ ) {
      if ( i === idx ) {
        list.children[ i ] = newNode;
        after = -1;
      } else {
        list.children[ i ] = children[ i + after ];
      }
    }

    return list;
  }

};

function mergeLeaves( owner, shift, node1, node2 ) {

  var hash1 = node1.hash;
  var hash2 = node2.hash;

  var list = new List( owner );
  var children = list.children;

  var step1 = ( shift === 0 ? hash1 : hash1 >>> shift ) & MASK;
  var step2 = ( shift === 0 ? hash2 : hash2 >>> shift ) & MASK;

  list.bitmap = ( 1 << step1 ) | ( 1 << step2 );

  if ( step1 < step2 ) {
    children[ 0 ] = node1;
    children[ 1 ] = node2;
  } else if ( step1 > step2 ) {
    children[ 0 ] = node2;
    children[ 1 ] = node1;
  } else {
    children[ 0 ] = mergeLeaves( owner, shift + SHIFT, node1, node2 );
  }

  return list;

}

function Collision( hash, owner, node1, node2 ) {
  this.children = [ node1, node2 ];
  this.hash = hash;
  this.owner = owner;
}

Collision.prototype = {

  isLeaf: true,

  loop: function( fn, map ) {
    var children = this.children, i = 0;
    for ( ; i < children.length; i++ ) {
      if ( children[ i ].loop( fn, map ) === true ) {
        return true;
      }
    }
  },

  get: function( key, hash, shift, notSetValue ) {
    var children = this.children, i = children.length, node;
    while ( i-- ) {
      node = children[ i ];
      if ( is( node.key, key ) ) {
        return node.value;
      }
    }
    return notSetValue;
  },

  modify: function( key, value, hash, shift, owner, ref ) {

    var node = this, children, child, childFound, newChild, i = 0, len, removed = value === NOT_SET;

    if ( this.hash === hash ) {

      children = this.children;
      len = children.length;

      for ( ; i < len; i++ ) {
        child = children[ i ];
        if ( child && is( key, child.key ) ) {
          childFound = child;
          break;
        }
      }

      if ( childFound ? childFound.value === value : removed ) {
        return this;
      }

      ref.changeValue = true;
      if ( removed || !childFound ) {
        ref.changeSize = true;
      }

      if ( childFound ) {

        newChild = childFound.modify( key, value, hash, shift, owner, ref );

        if ( !newChild ) {
          if ( len === 2 ) {
            return children[ i ^ 1 ];
          }
          if ( len === 1 ) {
            return;
          }
          node = this.clone( owner );
          if ( i === len - 1 ) {
            node.children.pop();
          } else {
            node.children[ i ] = node.children.pop();
          }
          return node;
        }

        node = this.clone( owner );
        node.children[ i ] = newChild;
        return node;
      }

      node = this.clone( owner );
      node.children[ i ] = new Leaf( key, value, hash, owner );
      return node;
    }

    if ( removed ) {
      return this;
    }

    ref.changeValue = true;
    ref.changeSize = true;
    return mergeLeaves( owner, shift, this, new Leaf( key, value, hash, owner ) );
  },

  clone: function( owner ) {
    if ( owner && this.owner === owner ) {
      return this;
    }
    var children = this.children;
    var node = new Collision( this.hash, owner, children[ 0 ], children[ 1 ] );
    for ( var i = 3; i < children.length; i++ ) {
      node.children[ i ] = children[ i ];
    }
    return node;
  }

};

function Leaf( key, value, hash, owner ) {
  this.key = key;
  this.value = value;
  this.hash = hash;
  this.owner = owner;
}

Leaf.prototype = {

  isLeaf: true,

  loop: function( fn, map ) {
    return fn( this.value, this.key, map );
  },

  get: function( key, hash, shift, notSetValue ) {
    return is( this.key, key ) ? this.value : notSetValue;
  },

  modify: function( key, value, hash, shift, owner, ref ) {

    var node = this;

    if ( this.hash === hash ) {
      if ( is( key, this.key ) ) {
        if ( this.value === value ) {
          return this;
        }
        ref.changeValue = true;
        ref.oldValue = this.value;
        if ( value === NOT_SET ) {
          ref.changeSize = true;
          return;
        }
        node = this.clone( owner );
        node.value = value;
        return node;
      }
      if ( value === NOT_SET ) {
        return this;
      }
      ref.changeValue = true;
      ref.changeSize = true;
      return new Collision( hash, owner, this, new Leaf( key, value, hash, owner ) );
    }

    if ( value === NOT_SET ) {
      return this;
    }

    ref.changeValue = true;
    ref.changeSize = true;
    return mergeLeaves( owner, shift, this, new Leaf( key, value, hash, owner ) );
  },

  clone: function( owner ) {
    return owner && this.owner === owner ? this : new Leaf( this.key, this.value, this.hash, owner );
  }

};

function createStack( node, prev ) {
  return {
    node: node,
    index: 0,
    prev: prev
  };
}

function returnValue( key, value, type ) {
  /* eslint no-nested-ternary: 0 */
  return {
    value: type === ITERATE_ENTRIES ? [ key, value ] : type === ITERATE_KEYS ? key : value,
    done: false
  };
}

var MapIterator = function( map, type ) {
  this.__type = type;
  this.__stack = map.__root && createStack( map.__root );
};

MapIterator.prototype = {
  constructor: MapIterator,
  next: function() {

    var type = this.__type,
        stack = this.__stack,
        node, children, index, maxIndex, subNode;

    while ( stack ) {

      node = stack.node;
      children = node.children;
      index = stack.index++;

      if ( children ) {

        maxIndex = children.length - 1;

        if ( index <= maxIndex ) {

          // - reverse ? maxIndex - index : index
          subNode = children[ index ];

          if ( subNode ) {
            if ( !subNode.children ) {
              return returnValue( subNode.key, subNode.value, type );
            }
            stack = this.__stack = createStack( subNode, stack );
          }

          continue;
        }

      } else if ( index === 0 ) {

        return returnValue( node.key, node.value, type );

      }

      stack = this.__stack = this.__stack.prev;

    }

    return DONE;

  },
  toString: function() {
    return "[object Map Iterator]";
  }
};

setBySymbol( MapIterator.prototype, "iterator", function() {
  return this;
} );

var REF = {
  changeValue: false,
  changeSize: false,
  oldValue: undefined
};

function makeRef() {
  REF.changeValue = false;
  REF.changeSize = false;
  REF.oldValue = undefined;
  return REF;
}

function set( map, key, value, silent ) {

  var h = hashCode( key ),
      owner = map.__owner,
      remove = value === NOT_SET,
      root = map.__root,
      newSize = 0,
      ref = makeRef(),
      change,
      changes;

  if ( root ) {
    root = map.__root.modify( key, value, h, 0, owner, ref );
  } else if ( !remove ) {
    ref.changeValue = true;
    ref.changeSize = true;
    root = new Leaf( key, value, h, owner );
  }

  if ( !ref.changeValue ) {
    return map;
  }

  /* eslint no-nested-ternary: 0 */
  newSize = map.size + ( ref.changeSize ? remove ? -1 : 1 : 0 );

  if ( !newSize && !owner ) {
    return EMPTY_MAP;
  }

  if ( owner ) {
    map.__root = root;
    map.size = newSize;
  } else {
    map = makeMap( false, newSize, root );
  }

  if ( owner && !silent ) {

    /* eslint no-nested-ternary: 0 */
    change = {
      type: remove ? "delete" : ref.changeSize ? "add" : "update",
      key: key
    };

    // Alias
    change.name = key;

    if ( remove ) {

      change.oldValue = ref.oldValue;

    } else {

      change.value = change.newValue = value;

      if ( !ref.changeSize ) {
        change.oldValue = ref.oldValue;
      }

    }

    changes = map.__changes;

    if ( !changes ) {
      changes = map.__changes = [];
    }

    changes.push( change );

  }

  return map;
}

function Proto() {}

var prototype = Proto.prototype = {

  get: function( key, notSetValue ) {
    var root = this.__root;
    return root ? root.get( key, undefined, 0, notSetValue ) : notSetValue;
  },

  has: function( key ) {
    return NOT_SET !== this.get( key, NOT_SET );
  },

  set: function( key, value ) {
    return set( this, key, value ).__triggerChangeEvent();
  },

  remove: function( key ) {
    return this.set( key, NOT_SET );
  },

  update: function( key, func, notSetValue ) {
    var value = func( this.get( key, notSetValue ) );
    return this.set( key, value === notSetValue ? NOT_SET : value );
  },

  forEach: function( callback, thisArg ) {
    if ( this.size ) {
      var iteratee = createIteratee( callback, thisArg );
      this.__root.loop( function( value, key, map ) {
        iteratee( value, key, map );
      }, this );
    }
  },

  find: function( callback, thisArg ) {

    var iteratee, result;

    if ( this.size ) {

      iteratee = createIteratee( callback, thisArg );

      this.__root.loop( function( value, key, map ) {
        var r = iteratee( value, key, map );
        if ( r === true ) {
          result = value;
        }
        return r;
      }, this );

    }

    return result;
  },

  clear: function() {

    if ( this.isImmutable() ) {
      return EMPTY_MAP;
    }

    var changes = this.__changes;

    if ( this.hasListeners() ) {
      if ( !changes ) {
        changes = this.__changes = [];
      }
      this.forEach( function( value, key ) {
        changes.push( {
          type: "delete",
          key: key,
          name: key,
          oldValue: value
        } );
      } );
    }

    this.size = 0;
    this.__root = null;
    return this.__triggerChangeEvent();
  },

  count: function() {
    return this.size;
  },

  __triggerChangeEvent: function() {
    if ( this.isMutable() ) {
      var changes = this.__changes;
      if ( changes && changes.length ) {
        this.trigger( "change", changes );
        this.__changes.length = 0;
      }
    }
    return this;
  },

  isMutable: function() {
    return !!this.__owner;
  },

  isImmutable: function() {
    return !this.__owner;
  },

  asMutable: function() {
    if ( this.isMutable() ) {
      return this;
    }
    return makeMap( true, this.size, this.__root );
  },

  asImmutable: function() {
    if ( !this.isMutable() ) {
      return this;
    }
    if ( this.size ) {
      return makeMap( false, this.size, this.__root );
    }
    return EMPTY_MAP;
  },

  clone: function() {
    return this.isImmutable() ? this : makeMap( true, this.size, this.__root );
  },

  merge: function( obj, silent ) {

    var newMap, isImmutable, changed, isArr;

    if ( !obj || obj === EMPTY_MAP ) {
      return this;
    }

    if ( this === EMPTY_MAP && isMap( obj ) && obj.isImmutable() ) {
      return obj;
    }

    newMap = this.asMutable();
    isImmutable = this.isImmutable();
    changed = false;
    isArr = isArrayLike( obj );

    forEach( obj, function( value, key ) {

      if ( isArr ) {
        set( newMap, value[ 0 ], value[ 1 ], isImmutable || silent === INIT );
      } else {
        set( newMap, key, value, isImmutable || silent === INIT );
      }

      if ( REF.changeValue ) {
        changed = true;
      }

    } );

    if ( !changed ) {
      return this;
    }

    return isImmutable ? newMap.asImmutable() : this.__triggerChangeEvent();
  }

};

prototype[ MAP_SENTINEL ] = true;
setBySymbol( prototype, "get", prototype.get );

createIterableClass( Proto, MapIterator, "entries" );

prototype.pairs = prototype.entries;
prototype.unset = prototype.delete = prototype.remove;

function isMap( obj ) {
  return !!( obj && obj[ MAP_SENTINEL ] );
}

function Map( obj ) {
  this.__root = null;
  this.__owner = null;
  this.__changes = null;
  this.size = 0;
  if ( obj === INIT ) {
    return this;
  }
  return makeMap( true, 0, null ).merge( obj, INIT );
}

function ImmutableMap( obj ) {
  this.__root = null;
  this.__owner = null;
  this.size = 0;
  if ( obj === INIT ) {
    return this;
  }
  return EMPTY_MAP.merge( obj, INIT );
}

Map.isMap = isMap;
ImmutableMap.isMap = isMap;

Map.prototype = new Proto();
ImmutableMap.prototype = new Proto();

// Add event functions to mutable maps
extend( Map.prototype, Events );

function makeMap( mutable, size, root ) {
  var map = mutable ? new Map( INIT ) : new ImmutableMap( INIT );
  map.size = size || 0;
  map.__root = root;
  if ( mutable ) {
    map.__owner = {};
  }
  return map;
}

/* eslint no-use-before-define: 0 */
var EMPTY_MAP = makeMap( false, 0, null );

var ObjProp = Object.defineProperty;
var addNotEnumProp = function( obj, name, value ) {
  ObjProp( obj, name, {
    writable: true,
    configurable: true,
    value: value
  } );
};

var PROMISE_SENTINEL = "@@__MOTA_PROMISE__@@";

var PENDING$1 = 0;
var FULFILLED$1 = 1;
var REJECTED$1 = 2;

function isValidState( s ) {
  return ( s === PENDING$1 || s === REJECTED$1 || s === FULFILLED$1 );
}

function _transition( self, state, value ) {

  if (
    self.state === state ||
    self.state !== PENDING$1 ||
    !isValidState( state ) ||
    arguments.length !== 3
  ) {
    return;
  }

  self.value = value;
  self.state = state;
  _process( self );

}

function isPromise( obj ) {
  return !!( obj && obj[ PROMISE_SENTINEL ] );
}

function _resolve( promise, x ) {

  if ( promise === x ) {

    _transition(
      promise,
      REJECTED$1,
      new TypeError( "The promise and its value refer to the same object" )
    );

  } else if ( isPromise( x ) ) {

    if ( x.state === PENDING$1 ) {

      x.then( function( val ) {
        _resolve( promise, val );
      }, function( reason ) {
        _transition( promise, REJECTED$1, reason );
      } );

    } else {

      _transition( promise, x.state, x.value );

    }

  } else if ( isObjectLike( x ) || isFunction( x ) ) {

    var called = false, thenHandler;

    try {

      thenHandler = x.then;

      if ( isFunction( thenHandler ) ) {

        thenHandler.call(
          x,
          function( y ) {
            if ( !called ) {
              _resolve( promise, y );
              called = true;
            }
          },
          function( r ) {
            if ( !called ) {
              _transition( promise, REJECTED$1, r );
              called = true;
            }
          }
        );

      } else {
        _transition( promise, FULFILLED$1, x );
        called = true;
      }

    } catch ( e ) {
      if ( !called ) {
        _transition( promise, REJECTED$1, e );
        called = true;
      }
    }

  } else {

    _transition( promise, FULFILLED$1, x );

  }

}

var runAsync = ( function() {

  if (
    typeof process === "object" &&
    process.toString() === "[object process]" &&
    process.nextTick
  ) {
    return function( fn ) {
      process.nextTick( fn );
    };
  }

  if ( typeof setImmediate === "function" ) {
    return function( fn ) {
      setImmediate( fn );
    };
  }

  return function( fn ) {
    setTimeout( fn, 0 );
  };

} )();

function _process( self ) {

  if ( self.state === PENDING$1 || !self.queue.length ) {
    return;
  }

  runAsync( function() {

    while ( self.queue.length ) {

      var queuedPromise = self.queue.shift(),
          handler = null,
          value;

      if ( self.state === FULFILLED$1 ) {
        handler = queuedPromise.handlers.fulfill;
      } else if ( self.state === REJECTED$1 ) {
        handler = queuedPromise.handlers.reject;
      }

      try {
        value = handler( self.value );
      } catch ( e ) {
        _transition( queuedPromise, REJECTED$1, e );
        continue;
      }

      _resolve( queuedPromise, value );

    }

  } );

}

// Based of https://github.com/abdulapopoola/Adehun/blob/master/adehun.js
// Also includes some es6 extensions

/* eslint no-extend-native: 0 */

function fulfillFallBack( value ) {
  return value;
}

function rejectFallBack( reason ) {
  throw reason;
}

var Promise = function( fn ) {

  var self = this;

  this.value = null;
  this.state = PENDING$1;
  this.queue = [];
  this.handlers = {
    fulfill: fulfillFallBack,
    reject: rejectFallBack
  };

  var resolveFn = function( value ) {
    _resolve( self, value );
  };

  var rejectFn = function( reason ) {
    _transition( self, REJECTED$1, reason );
  };

  if ( isFunction( fn ) ) {
    try {
      fn( resolveFn, rejectFn );
    } catch ( e ) {
      rejectFn( e );
    }
  }

};

Promise.prototype[ PROMISE_SENTINEL ] = true;

Promise.prototype.then = function( onFulfilled, onRejected ) {

  var queuedPromise = new Promise();

  if ( isFunction( onFulfilled ) ) {
    queuedPromise.handlers.fulfill = onFulfilled;
  }

  if ( isFunction( onRejected ) ) {
    queuedPromise.handlers.reject = onRejected;
  }

  this.queue.push( queuedPromise );
  _process( this );

  return queuedPromise;

};

var propCatch = "catch";
Promise.prototype[ propCatch ] = function( onRejected ) {
  return this.then( null, onRejected );
};

var propFinally = "finally";
Promise.prototype[ propFinally ] = function( f ) {
  return this.then( function( value ) {
    return Promise.resolve( f() ).then( function() {
      return value;
    } );
  }, function( err ) {
    return Promise.resolve( f() ).then( function() {
      throw err;
    } );
  } );
};

function doneErrCallback( err ) {
  runAsync( function() {
    throw err;
  } );
}

Promise.prototype.done = function( onFulfilled, onRejected ) {
  this.then( onFulfilled, onRejected )[ propCatch ]( doneErrCallback );
};

Promise.resolved = Promise.resolve = function( value ) {
  return new Promise( function( resolve ) {
    resolve( value );
  } );
};

Promise.rejected = Promise.reject = function( reason ) {
  return new Promise( function( resolve, reject ) {
    reject( reason );
  } );
};

Promise.deferred = Promise.defer = function() {
  var resolve, reject;

  return {
    promise: new Promise( function( a, b ) {
      resolve = a;
      reject = b;
    } ),
    resolve: resolve,
    reject: reject
  };
};

Promise.all = function( iterable ) {

  return new Promise( function( resolve, reject ) {

    var result = [];
    var remaining = 0;
    var i = 0;

    forEach( iterable, function( val ) {

      var myIndex = i++;
      remaining++;

      Promise.resolve( val ).then( function( val ) {

        result[ myIndex ] = val;
        remaining--;

        if ( remaining === 0 ) {
          resolve( result );
        }

      }, reject );

    }, null, false );

    // The iterable was empty
    if ( i === 0 ) {
      return resolve( result );
    }

  } );

};

Promise.race = function( iterable ) {

  return new Promise( function( resolve, reject ) {

    forEach( iterable, function( value ) {

      Promise.resolve( value ).then( resolve, reject );

    }, null, false );

  } );

};

var FilterSubscriber = function( observer, fn, thisArg ) {
  this.observer = observer;
  this.fn = fn;
  this.thisArg = thisArg;
};

FilterSubscriber.prototype = {

  next: function( value ) {
    try {
      if ( !this.fn.call( this.thisArg, value ) ) {
        return;
      }
    } catch ( e ) {
      return this.observer.error( e );
    }
    return this.observer.next( value );
  },

  complete: function( value ) {
    return this.observer.complete( value );
  },

  error: function( value ) {
    return this.observer.error( value );
  }

};

var FilterOperator = function( fn, thisArg ) {
  this.fn = fn;
  this.thisArg = thisArg;
};

FilterOperator.prototype.call = function( observer ) {
  return new FilterSubscriber( observer, this.fn, this.thisArg );
};

var MapSubscriber = function( observer, fn, thisArg ) {
  this.observer = observer;
  this.fn = fn;
  this.thisArg = thisArg;
};

MapSubscriber.prototype = {

  next: function( value ) {
    var value2;
    try {
      value2 = this.fn.call( this.thisArg, value );
    } catch ( e ) {
      return this.observer.error( e );
    }
    return this.observer.next( value2 );
  },

  complete: function( value ) {
    return this.observer.complete( value );
  },

  error: function( value ) {
    return this.observer.error( value );
  }

};

var MapOperator = function( fn, thisArg ) {
  this.fn = fn;
  this.thisArg = thisArg;
};

MapOperator.prototype.call = function( observer ) {
  return new MapSubscriber( observer, this.fn, this.thisArg );
};

var Observer = function( sub ) {
  this.sub = sub;
};

var proto$1 = Observer.prototype = {};

addNotEnumProp( proto$1, "next", function( value ) {
  return this.sub._next( value );
} );

addNotEnumProp( proto$1, "complete", function( value ) {
  return this.sub._complete( value );
} );

addNotEnumProp( proto$1, "error", function( reason ) {
  return this.sub._error( reason );
} );

var Subscription = function( subscriber, fn, _unsub ) {

  var observer, cancel;

  if ( Object( subscriber ) !== subscriber ) {
    throw new TypeError( "Subscriber must be an object" );
  }

  observer = new Observer( this );

  this.subscriber = subscriber;
  this._done = false;
  this._index = -1;
  this._unsub = _unsub;

  if ( !_unsub ) {

    try {

      cancel = fn( observer );

      if ( cancel != null ) {

        if ( isFunction( cancel.unsubscribe ) ) {

          cancel = cancel.unsubscribe.bind( cancel );

        } else if ( !isFunction( cancel ) ) {

          throw new TypeError( cancel + " is not a function" );

        }

      }

    } catch ( e ) {
      return observer.error( e );
    }

  }

  this.cancel = cancel;

  // If the stream is already finished, then perform cleanup again
  // because the `cancel` function was not available at the time
  if ( this._done ) {
    cleanup( this );
  }

};

function getMethod( value ) {
  if ( value == null ) {
    return;
  }
  if ( !isFunction( value ) ) {
    throw new TypeError( value + " is not a function" );
  }
  return value;
}

function cleanup( subscription, error ) {
  var cancel = subscription.cancel;
  subscription._done = true;
  subscription.subscriber = null;
  if ( cancel ) {
    subscription.cancel = null;
    if ( error ) {
      try {
        cancel();
      } catch ( e ) {}
    } else {
      cancel();
    }
  }
  if ( error ) {
    throw error;
  }
}

Subscription.prototype = {

  _next: function( value ) {
    var result, handler, sub = this.subscriber;
    if ( !this._done ) {
      try {
        handler = getMethod( sub.next );
        if ( handler ) {
          result = handler.call( sub, value );
        }
      } catch ( e ) {
        cleanup( this, e );
      }
    }
    return result;
  },

  _complete: function( value ) {
    var result, handler, sub = this.subscriber;
    if ( !this._done ) {
      this._done = true;
      try {
        handler = getMethod( sub.complete );
        if ( handler ) {
          result = handler.call( sub, value );
        }
      } catch ( e ) {
        cleanup( this, e );
      }
      cleanup( this );
    }
    return result;
  },

  _error: function( reason ) {
    var result, handler, sub = this.subscriber;
    if ( this._done ) {
      throw reason;
    } else {
      this._done = true;
      try {
        handler = getMethod( sub.error );
        if ( handler ) {
          result = handler.call( sub, reason );
        } else {
          throw reason;
        }
      } catch ( e ) {
        cleanup( this, e );
      }
      cleanup( this );
    }
    return result;
  },

  unsubscribe: function() {
    if ( this._done ) {
      return;
    }
    if ( this._unsub ) {
      this._unsub( this );
    }
    cleanup( this );
  }

};

var Observable$1 = function( _subscriber ) {
  if ( !isFunction( _subscriber ) ) {
    throw new TypeError( "Observable initializer must be a function" );
  }
  this._subscriber = _subscriber;
};

var proto = Observable$1.prototype;

addNotEnumProp( proto, "lift", function( operator ) {
  var source = this;
  var C = getSpecies( this.constructor );
  var observable = new C( function( observer ) {
    return source.subscribe( operator.call( observer ) );
  } );
  return observable;
} );

addNotEnumProp( proto, "subscribe", function( observer ) {
  return new Subscription( observer, this._subscriber );
} );

addNotEnumProp( proto, "toPromise", function() {
  var self = this;
  return new Promise( function( resolve, reject ) {
    self.subscribe( {
      complete: resolve,
      error: reject
    } );
  } );
} );

addNotEnumProp( proto, "forEach", function( fn ) {
  var self = this;
  var thisArg = arguments[ 1 ];
  return new Promise( function( resolve, reject ) {

    if ( !isFunction( fn ) ) {
      throw new TypeError( fn + " is not a function" );
    }

    var hasError = false;

    var subscription = self.subscribe( {
      next: function( value ) {
        if ( hasError ) {
          return;
        }
        try {
          return fn.call( thisArg, value );
        } catch ( e ) {
          hasError = true;
          reject( e );
          if ( subscription ) {
            subscription.unsubscribe();
          }
        }
      },
      error: reject,
      complete: resolve
    } );

    if ( hasError ) {
      subscription.unsubscribe();
    }

  } );
} );

addNotEnumProp( proto, "map", function( fn ) {
  if ( !isFunction( fn ) ) {
    throw new TypeError( fn + " is not a function" );
  }
  return this.lift( new MapOperator( fn, arguments[ 1 ] ) );
} );

addNotEnumProp( proto, "filter", function( fn ) {
  if ( !isFunction( fn ) ) {
    throw new TypeError( fn + " is not a function" );
  }
  return this.lift( new FilterOperator( fn, arguments[ 1 ] ) );
} );

addNotEnumProp( Observable$1, "from", function( x ) {

  var C = isFunction( this ) ? this : Observable$1;

  if ( x == null ) {
    throw new TypeError( x + " is not an object" );
  }

  var method = getBySymbol( x, "observable" );

  if ( method != null ) {

    if ( !isFunction( method ) ) {
      throw new TypeError( method + " is not a function" );
    }

    var observable = method.call( x );

    if ( Object( observable ) !== observable ) {
      throw new TypeError( observable + " is not an object" );
    }

    if ( observable.constructor === C ) {
      return observable;
    }

    return new C( function( observer ) {
      return observable.subscribe( observer );
    } );
  }

  return new C( function( observer ) {

    var done = false;

    runAsync( function() {

      if ( done ) {
        return;
      }

      try {

        if ( isIterable( x ) ) {
          forEach( x, function( item ) {
            if ( done ) {
              return forEach.BREAK;
            }
            observer.next( item );
          } );
        } else {
          throw new Error( x + " is not an Array or Iterable" );
        }

      } catch ( e ) {
        observer.error( e );
        return;
      }

      observer.complete();

    } );

    return function() {
      done = true;
    };

  } );

} );

addNotEnumProp( Observable$1, "of", function() {
  var items = arguments;
  var C = isFunction( this ) ? this : Observable$1;
  return new C( function( observer ) {

    var done = false;

    runAsync( function() {

      if ( done ) {
        return;
      }

      for ( var i = 0; i < items.length; i++ ) {

        observer.next( items[ i ] );

        if ( done ) {
          return;
        }
      }

      observer.complete();

    } );

    return function() {
      done = true;
    };

  } );
} );

addNotEnumProp( proto, getSymbol( "observable" ), function() {
  return this;
} );

Object.defineProperty( Observable$1, getSymbol( "species" ), {
  get: function() {
    return this;
  },
  configurable: true
} );

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function SubsList() {
  this.arr = [];
}
SubsList.prototype = SmartListProto;

function MulticastSubscriber( multicast ) {
  this.multicast = multicast;
}

MulticastSubscriber.prototype = {

  next: function( v ) {
    this.multicast._subs.safeForEach( function( sub ) {
      sub._next( v );
    } );
  },

  error: function( e ) {
    var multicast = this.multicast;
    multicast._state = REJECTED;
    multicast._value = e;
    multicast._subs.safeForEach( function( sub ) {
      sub._error( e );
    } );
    multicast._subs = null;
  },

  complete: function( v ) {
    var multicast = this.multicast;
    multicast._state = FULFILLED;
    multicast._value = v;
    multicast._subs.safeForEach( function( sub ) {
      sub._complete( v );
    } );
    multicast._subs = null;
  }

};

function eachCancel( sub ) {
  var subscription = this._subscription;
  var subs = this._subs;
  if ( subs ) {
    subs.remove( sub );
    if ( subscription && this._refCount && !subs.length() ) {
      subscription.unsubscribe();
    }
  }
}

var Multicast = function( source, options ) {
  this._state = PENDING;
  this._value = undefined;
  this._subs = new SubsList();
  this._subscription = null;
  this._source = source;
  this._refCount = options && options.refCount;
  this._cancel = eachCancel.bind( this );
};

Multicast.prototype = extend( ObjectCreate( Observable$1.prototype ), {

  constructor: Multicast,

  subscribe: function( observer ) {

    var sub;

    if ( this._state === PENDING ) {

      sub = new Subscription( observer, null, this._cancel );
      this._subs.add( sub );

    } else {

      sub = new Subscription( observer, noop );

      if ( this._state === FULFILLED ) {
        sub._complete( this._value );
      } else {
        sub._error( this._value );
      }

    }

    if ( this._refCount && !this._subscription ) {
      this.connect();
    }

    return sub;
  },

  connect: function() {
    this._subscription = this._subscription || this._source.subscribe( new MulticastSubscriber( this ) );
    return this._subscription;
  }

} );

setBySymbol( Multicast, "species", Observable$1 );

addNotEnumProp( Observable$1.prototype, "multicast", function( options ) {
  return new Multicast( this, options );
} );

var Observable = Observable$1;

var rescape = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var roptional = /\((.*?)\)/g; // -> (optional)
var rnamed = /(\(\?)?:\w+/g; // -> :named
var rsplat = /\*\w+/g; // -> *splat
var rparams = /(?:(\(\?)?:\w+)|(?:\*\w+)/g; // -> :named or *splat

var rleadslash = /^\/+/;
var rtrailslash = /\/+$/;
var rhash = /#.*/;
var rsearch = /\?.*/;

var normalizeArr = function( urlArr, bool ) {

  var i, p, res = [];

  for ( i = 0; i < urlArr.length; i++ ) {

    p = urlArr[ i ];

    if ( !p || p === "." ) {
      continue;
    }

    if ( p === ".." ) {
      if ( res.length && res[ res.length - 1 ] !== ".." ) {
        res.pop();
      } else if ( bool ) {
        res.push( ".." );
      }
    } else {
      res.push( p );
    }

  }

  return res;

};

var normalizePathname = memoizeStringOnly( function( pathname ) {

  var urlIsAbs, urlArr;

  urlIsAbs = pathname.charAt( 0 ) === "/" ? "/" : "";
  urlArr = pathname.replace( rleadslash, "/" ).replace( rtrailslash, urlIsAbs ).split( "/" );

  return urlIsAbs + normalizeArr( urlArr, !urlIsAbs ).join( "/" );

} );

function ensureFirstChar( str, char ) {
  if ( str.charAt( 0 ) === char ) {
    return str;
  }
  return char + str;
}

function ensureLastChar( str, char ) {
  if ( str.charAt( str.length - 1 ) === char ) {
    return str;
  }
  return str + char;
}

function queryStringFromObj( obj ) {

  if ( typeof obj === "string" ) {
    return obj;
  }

  var query = "", key, name, value, valueEncoded, i;

  for ( key in obj ) {

    name = encodeURIComponent( key );

    value = obj[ key ];

    if ( isArray( value ) ) {

      for ( i = 0; i < value.length; i++ ) {
        valueEncoded = value[ i ] ? encodeURIComponent( value[ i ] ) : "";
        query += "&" + name + "=" + valueEncoded;
      }

    } else {

      valueEncoded = value ? encodeURIComponent( value ) : "";
      query += "&" + name + "=" + valueEncoded;

    }

  }

  return query.substring( 1 );

}

var format = function() {

  var url = "", queryStr;

  if ( this.protocol ) {
    url += ensureLastChar( this.protocol, ":" ) + "//";
  }

  if ( this.auth ) {
    url += this.auth + "@";
  }

  // Host will be used in place of hostname and port
  if ( this.host ) {

    url += this.host;

  } else {

    // Hostname will only be used if host is absent
    if ( this.hostname ) {
      url += this.hostname;
    }

    // Port will only be used if host is absent
    if ( this.port ) {
      url += ":" + this.port;
    }

  }

  if ( this.pathname ) {
    url += normalizePathname( this.pathname );
  }

  // Search will be used in place of query
  if ( this.search ) {

    url += ensureFirstChar( this.search, "?" );

  // Query will only be used if search is absent
  } else if ( this.query ) {

    queryStr = queryStringFromObj( this.query );

    if ( queryStr ) {
      url += "?" + queryStr;
    }

  }

  if ( this.hash ) {
    url += ensureFirstChar( this.hash, "#" );
  }

  return url;

};

var isAbsolute = function() {
  return this.pathname.charAt( 0 ) === "/";
};

var join = function() {

  var i, arg, paths = [];

  for ( i = 0; i < arguments.length; i++ ) {
    arg = arguments[ i ];
    if ( arg && isString( arg ) ) {
      paths.push( arg );
    }
  }

  return Path.normalize( paths.join( "/" ) );

};

// Adapted from Diego's Perini (http://www.iport.it) work
// https://gist.github.com/dperini/729294
// Changes:
// - Add capture groups
// - Consider url with only resource path valid
// - Make domain name and TLD identifier optional to allow use of "localhost"
var rWebUrl = new RegExp(
  "^(?:" +

    // Protocol identifier
    "(?:((?:https?|ftp):)//)" +

    // Authentication: user:pass
    "(?:(\\S+(?::\\S*)?)@)?" +
    "(" +

      // IP address exclusion
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +

      // IP address dotted notation octets
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +

      // Host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +

      // Domain name
      "(?:(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*)?" +

      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))?" +
    ")" +

    // Port number
    "(?::(\\d{2,5}))?)?" +

    // Resource path
    "(/?\\S*)?" +
  "$", "i"
);

function queryObjFromString( string ) {

  var query = {}, querys, i = 0, splitted, name, value;

  if ( !string ) {
    return query;
  }

  querys = string.split( "&" );

  for ( ; i < querys.length; i++ ) {

    if ( !querys[ i ] ) {
      continue;
    }

    splitted = querys[ i ].split( "=" );

    name = decodeURIComponent( splitted[ 0 ] );
    value = splitted[ 1 ] ? decodeURIComponent( splitted[ 1 ] ) : "";

    if ( query[ name ] === undefined ) {

      query[ name ] = value;

    } else if ( isArray( query[ name ] ) ) {

      query[ name ].push( value );

    } else {

      query[ name ] = [ query[ name ], value ];

    }

  }

  return query;

}

var parse = function( url, parseQuery ) {

  var self = this, match = ( url || "" ).match( rWebUrl ) || [];

  this.auth = match[ 2 ] || "";
  this.hash = "";
  this.hostname = match[ 3 ] || "";
  this.port = match[ 4 ] || "";
  this.protocol = match[ 1 ] || "";
  this.search = "";

  this.host = this.hostname + ( this.port ? ":" + this.port : "" );

  this.pathname = ( match[ 5 ] || "" ).replace( rhash, function( h ) {

    self.hash = h || "";

    return "";

  } ).replace( rsearch, function( s ) {

    self.search = s || "";

    return "";

  } );

  this.pathname = normalizePathname( this.pathname );

  if ( this.hostname && !this.pathname ) {
    this.pathname = "/";
  }

  this.path = this.pathname + this.search;

  this.fragment = this.path + this.hash;

  this.query = this.search.substring( 1 );

  if ( parseQuery ) {
    this.query = queryObjFromString( this.query );
  }

  this.href = this.format();

  return this;

};

var trimArr = function( arr ) {

  var lastIndex = arr.length - 1, start = 0, end = lastIndex;

  for ( ; start <= lastIndex; start++ ) {
    if ( arr[ start ] ) {
      break;
    }
  }

  for ( ; end >= 0; end-- ) {
    if ( arr[ end ] ) {
      break;
    }
  }

  if ( start === 0 && end === lastIndex ) {
    return arr;
  }

  if ( start > end ) {
    return [];
  }

  return arr.slice( start, end + 1 );
};

var relative = function( from, to ) {

  var fromPath, toPath, fromParts, toParts, length, samePartsLength, i, outputParts;

  fromPath = new Path( from );
  toPath = new Path( to );

  fromParts = trimArr( fromPath.pathname.split( "/" ) );
  toParts = trimArr( toPath.pathname.split( "/" ) );

  length = Math.min( fromParts.length, toParts.length );
  samePartsLength = length;
  for ( i = 0; i < length; i++ ) {
    if ( fromParts[ i ] !== toParts[ i ] ) {
      samePartsLength = i;
      break;
    }
  }

  outputParts = [];
  for ( i = samePartsLength; i < fromParts.length; i++ ) {
    outputParts.push( ".." );
  }

  outputParts = outputParts.concat( toParts.slice( samePartsLength ) );

  return outputParts.join( "/" );

};

var resolve = function() {

  var path,
      resolvedPathname = "",
      resolvedAbsolute = false,
      i = arguments.length,
      result;

  // Loop from the end
  while ( i-- ) {

    // Ignore empty entries
    if ( arguments[ i ] === "" ) {
      continue;
    }

    // Parse the string
    path = new Path( arguments[ i ] );

    // Set `result` as `new Path( arguments[ arguments.length - 1 ] )`
    if ( !result ) {
      result = path;
    }

    // Keep resolving until we find an absolute path
    if ( !resolvedAbsolute ) {
      resolvedPathname = path.pathname + "/" + resolvedPathname;
      resolvedAbsolute = path.isAbsolute();
    }

    // Now, find the host
    // Note that if `path.host` exists, `resolvedAbsolute` is true so,
    // after we find the host, we can break the loop
    if ( path.host ) {
      result.host = path.host;
      result.protocol = path.protocol;
      break;
    }

  }

  resolvedPathname = normalizeArr( resolvedPathname.split( "/" ), !resolvedAbsolute ).join( "/" );

  result.pathname = ( resolvedAbsolute ? "/" : "" ) + resolvedPathname;

  return result.format();

};

function Path( url, parseQuery ) {
  parse.call( this, url, parseQuery );
}

extend( Path.prototype, {
  format: format,
  isAbsolute: isAbsolute,
  parse: parse,
  toObject: function() {

    var obj = {}, keys = nativeKeys( this ), i = 0;

    for ( ; i < keys.length; i++ ) {
      obj[ keys[ i ] ] = this[ keys[ i ] ];
    }

    return obj;

  }
} );

Path.format = function( obj ) {
  return format.call( obj );
};

Path.isAbsolute = function( url ) {
  return new Path( url ).isAbsolute();
};

Path.join = join;

Path.normalize = function( url ) {
  return new Path( url ).href;
};

Path.parse = function( url, parseQuery ) {
  return new Path( url, parseQuery );
};

Path.relative = relative;

Path.resolve = resolve;

var classSet = function( elem ) {

  var className = "", type, i = 0, len, names, name;

  if ( !elem ) {
    return "";
  }

  type = motaType( elem );

  if ( type === "array" ) {

    len = elem.length;

    for ( ; i < len; i++ ) {
      if ( elem[ i ] ) {
        className += " " + elem[ i ];
      }
    }

  } else if ( type === "object" ) {

    names = motaKeys( elem );
    len = names.length;

    for ( ; i < len; i++ ) {
      name = names[ i ];
      if ( elem[ name ] ) {
        className += " " + name;
      }
    }

  } else {

    className = elem + "";

  }

  return className.trim();

};

var TYPE_SYMBOL = (
  typeof Symbol === "function" && Symbol.for && Symbol.for( "mota.view.create" )
) || 0xeac7;

var isValidPlaceholder = function( obj ) {
  return (
    obj && typeof obj === "object" && obj.$$typeof === TYPE_SYMBOL
  );
};

var create = function( type, config, children ) {

  var props = {},
      propName,
      key = null,
      childArray,
      i,
      childrenLength,
      placeholder,
      validateProps = type && type.validateProps;

  if ( config != null ) {

    key = config.key === undefined ? null : "" + config.key;

    for ( propName in config ) {
      if ( propName !== "key" && has( config, propName ) ) {
        props[ propName ] = config[ propName ];
      }
    }

  }

  childrenLength = arguments.length - 2;

  if ( childrenLength === 1 ) {

    props.children = children;

  } else if ( childrenLength > 1 ) {

    childArray = Array( childrenLength );

    for ( i = 0; i < childrenLength; i++ ) {
      childArray[ i ] = arguments[ i + 2 ];
    }

    props.children = childArray;

  }

  if ( validateProps ) {
    props = validateProps( props ) || {};
  }

  placeholder = {
    $$typeof: TYPE_SYMBOL,
    type: type,
    key: key,
    props: props
  };

  if ( true ) {
    Object.freeze( props );
    Object.freeze( placeholder );
  }

  return placeholder;

};

var createKey = function( placeholder, noKeyIdx ) {

  var key = placeholder.key;
  var type = placeholder.type;
  var typeId = type.__type === undefined ? type : type.__type;

  if ( noKeyIdx[ typeId ] === undefined ) {
    noKeyIdx[ typeId ] = 0;
  }

  return typeId + ( key == null ? ":noKey:" + noKeyIdx[ typeId ]++ : ":key:" + key );

};

var diffChildren = function( children, renderToString ) {

  var array = this.array,
      map = this.map,
      i = 0,
      placeholder = null,
      key = "",
      noKeyIdx = {},
      currCompInternal = null,
      compInternal = null,
      typeIsFunc = false,
      newLen = 0,
      freeSpot = 0;

  for ( ; i < children.length; i++ ) {

    placeholder = children[ i ];
    typeIsFunc = isFunction( placeholder.type );
    key = createKey( placeholder, noKeyIdx );
    currCompInternal = array[ i ];

    if ( currCompInternal && currCompInternal.key === key ) {

      // Just update
      currCompInternal.update( typeIsFunc ? placeholder.props : placeholder, i );

    } else {

      compInternal = map[ key ];

      // Check to see if the node has moved within the parent
      if ( compInternal ) {

        freeSpot = compInternal.index;

        // Just update
        compInternal.update( typeIsFunc ? placeholder.props : placeholder, i );

      } else {

        freeSpot = this.length++;

        // Create the node if it doesn't exist
        /* eslint new-cap: 0 */
        compInternal = typeIsFunc ? new placeholder.type().__internal__ : new ViewInternal();

        compInternal.init(
          typeIsFunc ? placeholder.props : placeholder, this, i, key, renderToString
        );

      }

      // The one that is in `i`, move it to a free spot
      if ( currCompInternal ) {
        array[ currCompInternal.index = freeSpot ] = currCompInternal;
      }

      // Place this component in the correct index
      array[ i ] = compInternal;

      // Save in map
      map[ key ] = compInternal;

    }

  }

  newLen = i;

  // Remove remaning
  for ( ; i < this.length; i++ ) {
    currCompInternal = array[ i ];
    currCompInternal.remove();
    map[ currCompInternal.key ] = null;
    array[ i ] = null;
  }

  this.length = newLen;

};

var init = function( nextProps, parentInternal, index, key, renderToString ) {

  var component = this.component;

  this.dontQueue = true;

  this.props = component.props = nextProps;

  if ( component.initialize ) {
    component.initialize();
  }

  if ( component.componentWillMount ) {
    component.componentWillMount();
  }

  this.queued = false;
  this.dontQueue = false;

  this.parentInternal = parentInternal;
  this.parentEl = parentInternal.el;

  if ( this === component ) { // If we are working with a "native component"
    this.owner = parentInternal.owner;
    this.depth = parentInternal.depth;
  } else { // If we are working with a custom component
    this.owner = component;
    this.depth = parentInternal.depth + 1;
  }

  // Save its index
  this.index = index;

  // Save its key
  this.key = key;

  this.updateComponent( index, nextProps, renderToString );

  motaViewData.add( component );
  updaterQueueElemInsertion( this.el, index, this.parentEl );

  if ( component.componentDidMount ) {
    updaterQueueCallback( component, "componentDidMount" );
  }

};

var queueUpdate = function( force, renderToString ) {

  if ( this.dontQueue ) {
    return;
  }

  // If not queued yet, queue
  if ( !this.queued ) {
    this.queued = true;
    this.force = !!force;
    this.renderToString = !!renderToString;
    updaterQueueUpdate( this );

  // If already queued, update `this.force` -> `true` if needed
  // Never update `this.force` from `true` to `false`
  } else if ( force ) {
    this.force = true;
  }

};

function clean( componentInternal ) {

  var component = componentInternal.component;

  componentInternal.dontQueue = true;
  componentInternal.queued = false;

  if ( component.componentWillUnmount ) {
    component.componentWillUnmount();
  }

  motaViewData.remove( componentInternal.el );

  // Important: settting `__internal__` to `null` is important
  // not only to prevent memory leaks
  // but to see if the component has unmounted
  component.el = component.__internal__ = null;

  componentInternal.traverse( clean );

}

var remove = function() {
  updaterQueueElemDeletion( this.el );
  clean( this );
};

var update = function( nextProps, index, renderToString ) {

  var component = this.component, prevProps = this.props, force = this.force, shouldUpdate;

  // Save its index
  this.index = index;

  this.dontQueue = true;

  if ( !nextProps ) {
    nextProps = this.props;
  } else if ( component.componentWillReceiveProps ) {
    component.componentWillReceiveProps( nextProps );
  }

  if ( !force && component.shouldComponentUpdate ) {

    shouldUpdate = component.shouldComponentUpdate( nextProps );

    if ( true ) {
      if ( shouldUpdate !== true && shouldUpdate !== false ) {
        warn(
          "mota.view.Component.update",
          "Make sure `shouldComponentUpdate` returns `true` or `false`. " +
          "It returned `" + shouldUpdate + "`."
        );
      }
    }

    if ( shouldUpdate === false ) {
      this.props = component.props = nextProps;
      this.queued = false;
      this.dontQueue = false;
      return;
    }

  }

  if ( component.componentWillUpdate ) {
    component.componentWillUpdate( nextProps );
  }

  this.props = component.props = nextProps;

  this.queued = false;
  this.dontQueue = false;
  this.force = false;

  this.updateComponent( index, nextProps, renderToString );

  if ( !force && index != null ) {
    updaterQueueElemMove( this.el, index, this.parentEl );
  }

  if ( component.componentDidUpdate ) {
    updaterQueueCallback( component, "componentDidUpdate", prevProps );
  }

};

var diffObj = function( internal, elem, cacheName, cacheNameKeys, nextObj, func ) {

  // Perf: http://jsperf.com/for-in-vs-object-keys-while-loop

  var key, keys, i;
  var prevObj = internal[ cacheName ];
  var prevObjKeys = internal[ cacheNameKeys ];
  var nextObjKeys = nativeKeys( nextObj );

  // Remove

  keys = prevObjKeys;
  i = keys.length;

  while ( i-- ) {
    key = keys[ i ];
    if ( nextObj[ key ] === undefined ) {
      func( internal, elem, key, prevObj[ key ], undefined );
    }
  }

  // Add or edit

  keys = nextObjKeys;
  i = keys.length;

  while ( i-- ) {
    key = keys[ i ];
    if ( prevObj[ key ] !== nextObj[ key ] ) {
      func( internal, elem, key, prevObj[ key ], nextObj[ key ] );
    }
  }

  internal[ cacheName ] = nextObj;
  internal[ cacheNameKeys ] = nextObjKeys;

};

var flattenChildrenImpl = function( p, array, callback ) {

  var lastIndex, before;

  if ( p == null || p === false || p === true || p === "" ) {
    return;
  }

  if ( isValidPlaceholder( p ) ) {
    array.push( p );
    return;
  }

  if ( typeof p === "object" ) {
    forEach( p, callback, null, false );
    return;
  }

  lastIndex = array.length - 1;
  before = lastIndex > -1 && array[ lastIndex ];

  // Join all text children
  if ( before.type === "#text" ) {

    before.props.text += p + "";

  } else {

    array.push( {
      type: "#text",
      props: {
        text: p + ""
      }
    } );

  }

};

var flattenChildren = function( children ) {

  var array = [];

  if ( children != null ) {

    var callback = function( p ) {
      flattenChildrenImpl( p, array, callback );
    };

    callback( children );

  }

  return array;

};

var voidElements = {
  area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1,
  hr: 1, img: 1, input: 1, keygen: 1, link: 1, menuitem: 1,
  meta: 1, param: 1, source: 1, track: 1, wbr: 1
};

var rUppercase = /([A-Z])/g;
var rAmp = /&/g;
var rLt = /</g;
var rGt = />/g;
var rQuot = /"/g;

// Example: hyphenateStyleName( "backgroundColor" ) -> "background-color"
var hyphenateStyleName = memoizeStringOnly( function( str ) {
  return str.replace( rUppercase, "-$1" ).toLowerCase();
} );

var escapeText = memoizeStringOnly( function( str ) {
  return str.replace( rAmp, "&amp;" ).replace( rLt, "&lt;" ).replace( rGt, "&gt;" );
} );

var escapeAttributeValue = memoizeStringOnly( function( str ) {
  return escapeText( str ).replace( rQuot, "&quot;" );
} );

function stylify( style ) {

  var attr = "";

  forEachObj( style, function( value, name ) {

    if ( !value ) {
      return;
    }

    attr += hyphenateStyleName( name ) + ":" + value + ";";

  } );

  return attr;

}

function properties( elem ) {

  var html = "";

  elem._attrs.style = elem.style;
  elem._attrs.class = elem.className || elem._attrs.class;

  forEachObj( elem._attrs, function( value, name ) {

    if ( name === "style" ) {
      value = stylify( value );
    }

    if ( !value ) {
      return;
    }

    html += " " + name + "=\"" + escapeAttributeValue( value ) + "\"";

  } );

  return html;
}

function serializeElement( elem ) {

  var tagName = elem._tagName;
  var html = "<" + tagName + properties( elem );

  if ( voidElements[ tagName ] ) {

    html += " />";

  } else {

    html += ">" + getInnerHTML( elem ) + "</" + tagName + ">";

  }

  return html;

}

function serializeNode( node ) {
  switch ( node.nodeType ) {
    case 3:
      return escapeText( node.nodeValue );
    case 8:
      return "<!--" + node.nodeValue + "-->";
    default:
      return serializeElement( node );
  }
}

function getInnerHTML( elem ) {

  var i = 0;
  var html = "";
  var childNodes = elem.childNodes;

  for ( ; i < childNodes.length; i++ ) {
    html += serializeNode( childNodes[ i ] );
  }

  return html;

}

function item( idx ) {
  return this[ idx ];
}

function Element( tagName ) {

  this._tagName = ( tagName + "" ).toLowerCase();
  this._attrs = {};

  this.nodeType = 1;
  this.className = "";
  this.childNodes = [];
  this.childNodes.item = item;
  this.style = {};

}

Element.prototype = {
  insertBefore: function( elem, before ) {
    if ( true ) {
      if ( before != null ) {
        err( "mota.view", "This internal method should only be used to append elements." );
      }
    }
    this.childNodes.push( elem );
  },
  setAttribute: function( name, value ) {
    this._attrs[ name ] = value + "";
  },
  getAttribute: function( name ) {
    return this._attrs[ name ];
  }
};

Object.defineProperty( Element.prototype, "innerHTML", {
  get: function() {
    if ( this._innerHTML === undefined ) {
      this._innerHTML = getInnerHTML( this );
    }
    return this._innerHTML;
  },
  set: function( value ) {
    this._innerHTML = value;
    return value;
  }
} );

function TextNode( value ) {
  this.nodeValue = value + "";
  this.nodeType = 3;
  this.nodeName = "#text";
}

function Comment( value ) {
  this.nodeValue = value + "";
  this.nodeType = 8;
  this.nodeName = "#comment";
}

var doc = {
  nodeType: 9,
  createElement: function( tagName ) {
    return new Element( tagName );
  },
  createElementNS: function( namespace, tagName ) {
    var elem = new Element( tagName );
    elem._attrs.xmlns = namespace;
    return elem;
  },
  createTextNode: function( value ) {
    return new TextNode( value );
  },
  createComment: function( value ) {
    return new Comment( value );
  }
};

doc.head = doc.createElement( "head" );
doc.body = doc.createElement( "body" );
doc.documentElement = doc.createElement( "html" );
doc.documentElement.insertBefore( doc.head );
doc.documentElement.insertBefore( doc.body );
doc.childNodes = [ doc.documentElement ];

var fakeDocument = doc;

var createEl = function( type, attrs, currEl, renderToString, owner ) {

  var el, namespace, children = attrs.children, doc = renderToString ? fakeDocument : document;

  if ( typeof type === "string" ) {

    if ( type === "#text" ) {

      el = doc.createTextNode( attrs.text );

    } else if ( type === "#comment" ) {

      el = doc.createComment( children.join( "\n" ) );

    } else {

      if ( attrs.xmlns ) {
        namespace = attrs.xmlns;
      } else if ( type === "svg" ) {
        namespace = "http://www.w3.org/2000/svg";
      } else if ( type === "math" ) {
        namespace = "http://www.w3.org/1998/Math/MathML";
      }

      if ( namespace ) {
        el = doc.createElementNS( namespace, type );
      } else {
        el = doc.createElement( type );
      }

    }

    if ( currEl && !motaViewData.get( currEl ) ) {
      if (
        currEl.nodeType === el.nodeType &&
        currEl.nodeName === el.nodeName &&
        currEl.nodeValue === el.nodeValue
      ) {
        el = currEl;
      }
    }

    if ( type === "script" || type === "style" ) {
      updaterError(
        "For security reasons, <script> and <style> elements are not allowed to be created.",
        owner
      );
    }

  } else {

    updaterError(
      "`render` must return an object containing a `type` property " +
      "with a primitive string or it must return `null`.",
      owner
    );

  }

  return el;

};

var styleSet = function( elem ) {

  if ( isArray( elem ) ) {

    var result = baseApplyNoThis( extend, [ {} ].concat( elem ) );

    if ( true ) {
      Object.freeze( result );
    }

    return result;
  }

  return elem && typeof elem === "object" ? elem : {};
};

var revent = /^on/;

var VALID_ATTRIBUTE_NAME_REGEX = /^[a-zA-Z_][\w\.\-]*$/;

var isAttributeNameSafe = memoizeStringOnly( function( name ) {

  if ( VALID_ATTRIBUTE_NAME_REGEX.test( name ) ) {
    return true;
  }

  if ( true ) {
    warn( "mota.view.Component.update", "Invalid attribute name: `" + name + "`" );
  }

  return false;

} );

var cssPrefixes = [ "Webkit", "Moz", "ms" ];

var emptyStyle = document ? document.createElement( "div" ).style : false;

// CSS properties which accept numbers but are not in units of "px"
var unitlessNumber = {
  animationIterationCount: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  fontWeight: 1,
  gridRow: 1,
  gridColumn: 1,
  lineClamp: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,

  // SVG
  fillOpacity: 1,
  stopOpacity: 1,
  strokeDashoffset: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function toCapName( key ) {
  return key.charAt( 0 ).toUpperCase() + key.substring( 1 );
}

// Return a css property mapped to a potentially vendor prefixed property
var vendorPropName = memoizeStringOnly( function( name ) {

  var capName, i;

  if ( !emptyStyle ) {
    return name;
  }

  // Shortcut for names that are not vendor prefixed
  if ( name in emptyStyle ) {
    return name;
  }

  // Check for vendor prefixed names
  capName = toCapName( name );
  i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in emptyStyle ) {
      return name;
    }
  }

  return false;

} );

function styleValue( key, val ) {

  if ( val == null || typeof val === "boolean" || val === "" ) {
    return "";
  }

  if ( val === 0 || unitlessNumber[ key ] || isNaN( val ) ) {
    return val + "";
  }

  if ( typeof val === "string" ) {
    val = val.trim();
  }

  return val + "px";

}

function setStyle( internal, elem, key, _prevValue, value ) {

  var originalKey = key;

  key = vendorPropName( key );

  if ( !key ) {
    if ( true ) {
      warn( "mota.view.Component.update", "`" + originalKey + "` is not a style property." );
    }
    return;
  }

  value = styleValue( key, value );

  if ( elem.style[ key ] !== value ) {
    updaterQueueAttrUpdate( elem, key, value, "style" );
  }

}

forEachObj( unitlessNumber, function( value, key ) {
  unitlessNumber[ vendorPropName( key ) ] = value;
} );

var diffAttr = function( internal, el, key, elemA, elemB ) {

  var className, eventName, component;

  switch ( key ) {

    case "key":
    case "data-mota":
    case "children":
    case "childNodes":
    case "innerHTML":
    case "outerHTML":

      return;

    case "daugerousInnerHTML":
    case "dangerouslySetInnerHTML":

      if ( elemA && elemB && elemA.__html === elemB.__html ) {
        return;
      }

      if ( elemB && el.innerHTML !== elemB.__html ) {
        updaterQueueAttrUpdate( el, "innerHTML", elemB.__html, "prop" );
      }

      return;

    case "style":

      return diffObj(
        internal,
        el,
        "cacheStyle",
        "cacheStyleKeys",
        styleSet( elemB ),
        setStyle
      );

    case "class":
    case "className":

      className = classSet( elemB );

      if ( el.nodeName === "svg" ) {

        if ( el.getAttribute( "class" ) !== className ) {
          updaterQueueAttrUpdate( el, "class", className, "attr" );
        }

      } else if ( el.className !== className ) {
        updaterQueueAttrUpdate( el, "className", className, "prop" );
      }

      return;

    default:

      eventName = key.replace( revent, "" );

      if ( key !== eventName ) {

        eventName = eventName.toLowerCase();
        component = internal.component;

        // Remove old if existed
        if ( elemA ) {
          Events.off.call( component, eventName, elemA );
        }

        // Add if new is defined
        if ( elemB ) {
          Events.on.call( component, eventName, elemB );
        }

      } else if (
        key in el &&
        !(
          key === "list" ||
          key === "form" ||
          key === "type" ||
          key === "width" ||
          key === "height"
        )
      ) {

        if ( key === "value" ) {
          elemB += "";
        }

        if ( el[ key ] !== elemB ) {

          // Setting value on <select> doesn't work before children exist
          // So set it again after children have been created
          if ( key === "value" && el.nodeName === "SELECT" ) {
            updaterQueueEdgeCaseUpdate( el, key, elemB, "prop" );
          } else {
            updaterQueueAttrUpdate( el, key, elemB, "prop" );
          }

        }

      } else if ( isAttributeNameSafe( key ) ) {
        updaterQueueAttrUpdate( el, key, elemB, "attr" );
      }

      return;

  }

};

var noscript = create( "noscript" );

var updateComponent = function( index, props, renderToString ) {

  var result, cache, thisEl,
      type, attrs, children,
      component = this.component;

  result = component.render( create, props ) || noscript;
  cache = this.cache;

  if ( cache === result ) {
    return;
  }

  this.cache = result;

  type = result.type;
  attrs = result.props;
  children = attrs.children;

  if ( !this.el ) {
    this.el = component.el = createEl(
      type, attrs, this.parentEl.childNodes.item( index ), renderToString, this.owner
    );
  }

  thisEl = this.el;

  if ( cache.type && type !== cache.type ) {
    updaterError(
      "You must not change the type of an component between updates. " +
      "You have changed `" + cache.type + "` to `" + type + "`.",
      this.owner
    );
  }

  if ( type === "#text" ) {
    if ( thisEl.nodeValue === attrs.text ) {
      return;
    }
    return updaterQueueAttrUpdate( thisEl, "nodeValue", attrs.text, "prop" );
  }

  if ( type === "#comment" ) {
    return updaterQueueAttrUpdate( thisEl, "nodeValue", children.join( "\n" ), "prop" );
  }

  if ( voidElements[ type ] ) {
    if ( attrs.daugerousInnerHTML != null || children != null ) {
      updaterError(
        "`" + type + "` is a void element tag and must not have `children` or " +
        "use `daugerousInnerHTML`.",
        this.owner
      );
    }
  }

  // DIFF ATTRS
  diffObj( this, thisEl, "cacheAttrs", "cacheAttrsKeys", attrs, diffAttr );

  // DIFF CHILDREN
  if ( voidElements[ type ] || attrs.daugerousInnerHTML != null ) {
    return;
  }

  this.diffChildren( flattenChildren( children ), renderToString );

};

var frozenObj = Object.freeze( {} );
var frozenArr = Object.freeze( [] );

var ViewInternal = function( component ) {

  this.component = component || this;

  this.__internal__ = this;

  // It's `true` when this component needs an update.
  // Should be `true` until the initial rendering starts.
  this.queued = false;

  // If the update process should ignore `shouldComponentUpdate`
  this.force = false;

  // If the update process started in `.renderToString`
  this.renderToString = false;

  // Contains all the child components
  this.array = [];
  this.map = {};
  this.length = 0;

  this.depth = -1;

  this.parentInternal = null;
  this.parentEl = null;

  this.key = "";
  this.index = 0;

  this.el = null;
  this.props = null;

};

ViewInternal.prototype = {

  constructor: ViewInternal,

  // Only for "native" components
  render: function() {
    return this.props;
  },

  updater: {
    startIgnore: updaterStartIgnore,
    endIgnore: updaterEndIgnore
  },

  // Cache
  // Note: objects in cache are immutable,
  // so we can safely add default values in the prototype

  // Contains what was returned by `render` the last time
  cache: create(),

  // Attrs object
  cacheAttrs: frozenObj,

  // Keys of attrs object
  cacheAttrsKeys: frozenArr,

  // Style object
  cacheStyle: frozenObj,

  // Keys of style object
  cacheStyleKeys: frozenArr,

  queueUpdate: queueUpdate,

  init: init,

  update: update,

  remove: remove,

  updateComponent: updateComponent,

  get: function( index ) {
    var internal = this.array[ index ];
    return internal && internal.component;
  },

  traverse: function( callback ) {
    var i = 0, arr = this.array;
    for ( ; i < this.length; i++ ) {
      callback( arr[ i ] );
    }
  },

  diffChildren: diffChildren

};

addSentinel( ViewInternal );

function ViewComponent() {
  this.__internal__ = new ViewInternal( this );
  this.el = null;
  this.props = null;
}

function warnUpdateAfterUnmount( component, method ) {
  if ( !component.__internal__ ) {
    warn(
      "mota.view.Component.update",
      "You are calling `" + method + "` after the component has unmounted. " +
      "This might mean you have a memory leak."
    );
    return true;
  }
}

extend( ViewComponent.prototype, Events, {
  update: function() {
    if ( true ) {
      if ( warnUpdateAfterUnmount( this, "update" ) ) {
        return;
      }
    }
    this.__internal__.queueUpdate();
  },
  forceUpdate: function() {
    if ( true ) {
      if ( warnUpdateAfterUnmount( this, "forceUpdate" ) ) {
        return;
      }
    }
    this.__internal__.queueUpdate( true );
  },
  bindMethodsToThis: function() {

    var name, original,
        methods = this.__methods,
        i = methods && methods.length;

    while ( i-- ) {
      name = methods[ i ];
      original = this[ name ];
      this[ name ] = noPartial( original, this );
      this[ name ].original = original;
    }

  }
} );

addSentinel( ViewComponent );

var typeId = 0;

var createClass = function( proto ) {

  var name, __methods = [];

  function Constructor() {
    ViewComponent.call( this );
  }

  if ( isFunction( proto ) ) {
    proto = {
      render: proto
    };
  }

  if ( !proto || !isFunction( proto.render ) ) {
    err(
      "mota.view.createClass",
      "Provide an object with a `render` property containing a function"
    );
  }

  Constructor.displayName = proto.displayName;
  Constructor.validateProps = proto.validateProps;

  for ( name in proto.statics ) {
    Constructor[ name ] = proto.statics[ name ];
  }

  Constructor.prototype = new ViewComponent();

  proto = extend( Constructor.prototype, proto );

  for ( name in proto ) {
    if ( isFunction( proto[ name ] ) ) {
      __methods.push( name );
    }
  }

  proto.constructor = Constructor;
  proto.__methods = __methods;
  Constructor.__type = typeId++;

  return Constructor;

};

var select = function( el, dontForce ) {

  if ( !el ) {
    return;
  }

  var component = motaViewData.get( el );

  if ( component ) {
    return component;
  }

  if ( dontForce ) {
    return;
  }

  component = new ViewComponent();
  component.el = el;
  component.__internal__.el = el;

  if ( motaViewData.add( component ) ) {
    return component;
  }

};

var render = function( placeholder, parent, callback ) {

  if ( true ) {
    if ( document && parent === document.body ) {
      warn(
        "mota.view.render",
        "You're trying to render a component into `document.body`, " +
        "which is often manipulated by third party scripts. " +
        "This may lead to subtle reconciliation issues."
      );
    }
  }

  var parentComponent = select( parent );

  if ( !parentComponent ) {
    err( "mota.view.render", "`parent` should be an DOM element" );
  }

  parentComponent.render = function( p ) {
    return p( null, null, placeholder );
  };

  if ( isFunction( callback ) ) {
    parentComponent.componentDidUpdate = function() {
      this.componentDidUpdate = undefined;
      callback();
    };
  }

  parentComponent.update();

  return parentComponent.__internal__.get( 0 );

};

var renderToString = function( placeholder ) {

  var parentComponent = new ViewComponent();
  parentComponent.el = parentComponent.__internal__.el = fakeDocument.createElement( "div" );

  parentComponent.render = function( p ) {
    return p( null, null, placeholder );
  };

  parentComponent.__internal__.queueUpdate( true, true );

  return parentComponent.el.innerHTML;

};

var view = {
  classSet: classSet,
  Component: ViewComponent,
  create: create,
  createClass: createClass,
  render: render,
  renderToString: renderToString,
  select: select,
  styleSet: styleSet,
  dispatchEvents: events.dispatchEvents
};

var rstripper = /^\/+|\/+$/g;

var replace = function( str ) {
  return str.replace( rescape, "\\$&" )
            .replace( roptional, "(?:$1)?" )
            .replace( rnamed, function( match, optional ) {
              return optional ? match : "([^/?]+)";
            } )
            .replace( rsplat, "([^?]*)" );
};

var getParams = memoizeStringOnly( function( str ) {

  var regexp = new RegExp( "^" + replace( str ) );

  var names = ( str.match( rparams ) || [] ).map( function( name ) {
    return name.slice( 1 );
  } );

  return {
    regexp: regexp,
    names: names
  };

} );

function RouterRoute( name, path, callback, parent ) {

  if ( isFunction( path ) ) {
    callback = path;
    path = name;
    name = undefined;
  }

  if ( !path ) {
    err( "mota.Router.route", "Provide a non-empty path" );
  }

  this.name = name;

  this.parent = parent;

  this.path = ( parent.path || "" ) + "/" + path.replace( rstripper, "" );
  this.params = getParams( this.path );

  this.routes = [];

  callback.call( this );

}

RouterRoute.prototype = {

  constructor: RouterRoute,

  normalize: function( url ) {
    return ensureFirstChar( new Path( url ).fragment, "/" );
  },

  route: function( name, path, callback ) {

    var route = new RouterRoute( name, path, callback, this );

    this.routes.push( route );

    return this;
  },

  setCallback: function( f ) {
    this.callback = f;
    return this;
  },

  setDefaultCallback: function( f ) {
    this.defaultCallback = f;
    return this;
  },

  triggerRoutes: function( fragment, params ) {

    var i = 0, len = this.routes.length, route, match;

    var iteratee = function( param, i ) {
      var name = route.params.names[ i ];
      params[ name ] = param ? decodeURIComponent( param ) : null;
    };

    fragment = this.normalize( fragment );

    if ( this.callback ) {
      this.callback( params, fragment );
    }

    for ( ; i < len; i++ ) {

      route = this.routes[ i ];

      match = fragment.match( route.params.regexp );

      if ( match ) {

        params = {};
        match.slice( 1 ).forEach( iteratee );

        route.triggerRoutes( fragment, params );

        return;

      }

    }

    if ( this.defaultCallback ) {
      this.defaultCallback( fragment );
    }

  }

};

var windowView;

function Router() {

  this.routes = [];

  this.history = window.history;

  // To enable support for HTML5-History-API polyfill
  this.location = ( this.history && this.history.location ) || window.location;

  this.window = windowView || ( windowView = view.select( window ) );

  if ( this.initialize ) {
    apply( this.initialize, this, arguments );
  }

}

Router.extend = classExtend;

extend( Router.prototype, RouterRoute.prototype, {

  constructor: Router,

  _join: function( url ) {
    return this.root === "/" ? url : this.root + url;
  },

  checkUrl: function() {
    return this.triggerRoutes( this.getFragment() );
  },

  getFragment: function() {
    var root = this.root,
        location = this.location,
        path = location.pathname + location.search + location.hash;

    if ( path.indexOf( root ) === 0 ) {
      path = path.slice( root.length );
    }
    return ( this.fragment = this.normalize( path ) );
  },

  start: function( options ) {

    if ( this._started ) {
      return;
    }
    this._started = true;

    this.root = this.normalize( options && options.root );

    this.checkUrl();

    this.window.on( "popstate", this.checkUrl, this );

  },

  stop: function() {
    if ( this._started ) {
      this._started = false;
      this.window.off( "popstate", this.checkUrl, this );
    }
  },

  navigate: function( fragment, options ) {

    if ( !this._started ) {
      return false;
    }

    if ( !options || options === true ) {
      options = {
        replace: !!options
      };
    }

    fragment = this.normalize( fragment );

    if ( this.fragment === fragment ) {
      return;
    }
    this.fragment = fragment;

    this.history[
      options.replace ? "replaceState" : "pushState"
    ]( {}, document.title, this._join( fragment ) );

    this.triggerRoutes( fragment );

  },

  redirect: function( oldUrl, newUrl ) {
    var callback = this.navigate.bind( this, newUrl );
    this.route( oldUrl, function() {
      this.setCallback( callback );
    } );
  }

} );

function defineProp( obj, name, value, enumerable ) {
  Object.defineProperty( obj, name, {
    configurable: false,
    enumerable: enumerable,
    value: value,
    writable: false
  } );
}

function mota() {}

defineProp( mota, "VERSION", "0.11.2", true );
defineProp( mota, "true", true, false );
defineProp( mota, "developmentMode", true, false );

utilities.hashCode = hashCode;

utilities.extend( mota, utilities, {
  Events: Events,
  Map: Map,
  ImmutableMap: ImmutableMap,
  Observable: Observable,
  path: Path,
  Promise: Promise,
  Router: Router,
  util: utilities,
  view: view,
  setWindow: setWindow
} );

if ( true ) {
  if ( typeof navigator !== "undefined" && navigator.userAgent.indexOf( "Chrome" ) > -1 ) {
    if ( typeof __MOTAJS_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ) {
      console.debug(
        "Download the MotaJS DevTools for a better development experience: " +
        "https://github.com/motapc97/motajs-devtools"
      );
    }
  }
}

  return mota;

} ) );
