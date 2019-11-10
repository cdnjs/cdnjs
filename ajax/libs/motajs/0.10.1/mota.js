/*!
 * MotaJS v0.10.1
 * http://motapc.js.org/motajs
 *
 * Released under the MIT license
 * https://github.com/motapc97/MotaJS/blob/master/LICENSE.md
 *
 * Project
 * https://github.com/motapc97/MotaJS
 *
 * Date: 2015-10-27T19:56Z
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

var EXPANDO = "__mota__" + ( "" + Math.random() ).replace( /\D/g, "" );
var ObjProp = Object.defineProperty;
function MotaData() {}

MotaData.setup = function( obj, name, value, optimize ) {
  var data = obj[ EXPANDO ];
  if ( !data ) {
    data = new MotaData();
    if ( optimize ) {
      obj[ EXPANDO ] = data;
    } else {

      // Non-enumerable property
      ObjProp( obj, EXPANDO, { writable: true, value: data } );
    }
  }
  return data[ name ] ? data[ name ] : ( data[ name ] = value );
};

MotaData.get = function( obj, name ) {
  var data = obj[ EXPANDO ];
  return data && data[ name ];
};

MotaData.set = function( obj, name, value ) {
  var data = obj[ EXPANDO ];
  return data ? ( data[ name ] = value ) : undefined;
};

MotaData.del = function( obj, name ) {
  var data = obj[ EXPANDO ];
  if ( data && data[ name ] ) {
    data[ name ] = undefined;
    return true;
  }
  return false;
};

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

  var size = obj.forEach(
    keyed ?
      ordered ?
        function( v, k ) { h = 31 * h + hashMerge( hash( v ), hash( k ) ) | 0; } :
        function( v, k ) { h = h + hashMerge( hash( v ), hash( k ) ) | 0; } :
      ordered ?
        function( v ) { h = 31 * h + hash( v ) | 0; } :
        function( v ) { h = h + hash( v ) | 0; }
  );

  return murmurHashOfSize( h, size );

}

var objHashUID = 1;

function getHash( o ) {
  return MotaData.get( o, "hash" );
}

function hash( o ) {

  var type, h;

  // Handle false, null, undefined, 0, ""
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

  MotaData.setup( o, "hash", h );

  return h;

}

var warn = function( funcName, msg ) {
  console.warn( funcName + " WARNS: " + msg );
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

var ids = {};
var uniqueId = function( prefix ) {
  prefix = prefix ? prefix + "" : "";
  if ( !ids[ prefix ] ) {
    ids[ prefix ] = 0;
  }
  return prefix + ( ++ids[ prefix ] );
};

var toString$1 = ( {} ).toString;

var types$1 = {
  "[object Array]": "array",
  "[object Boolean]": "boolean",
  "[object Date]": "date",
  "[object Error]": "error",
  "[object Function]": "function",
  "[object Number]": "number",
  "[object Object]": "object",
  "[object RegExp]": "regexp",
  "[object String]": "string",
  "[object Symbol]": "symbol"
};

var motaType = function( obj ) {
  var type = typeof obj;
  if ( type === "object" || type === "function" ) {
    return obj === null ? "null" : types$1[ toString$1.call( obj ) ] || "object";
  }
  return type;
};

var isObjectLike = function( obj ) {
  var type;
  return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
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

var motaPairs = function( obj ) {
  var keys = motaKeys( obj ),
  length = keys.length,
  pairs = Array( length ),
  i = 0;
  for ( ; i < length ; i++ ) {
    pairs[ i ] = [ keys[ i ], obj[ keys[ i ] ] ];
  }
  return pairs;
};

var ArrayProto = [];

var slice = ArrayProto.slice;

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

var noPartial = function( func, context ) {
  return function() {
    return apply( func, context, slice.call( arguments ) );
  };
};

var ISENVNODE = (
  typeof global !== "undefined" &&
  global &&
  toString.call( global.process )
) === "[object process]";

var strWin = "[object Window]";
var strWin2 = "[object global]";
// Chrome & Opera (and Safari?) + Node

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

  var className = toString$1.call( obj );

  return className === strWin || className === strWin2;

};

var window = ( typeof self == "object" && self.self == self && self ) ||
  ( typeof global == "object" && global.global == global && global );

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

var _mota = window.mota;

var noConflict = function() {
  if ( _mota ) {
    window.mota = _mota;
  }
  return this;
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

var log = function( funcName, msg ) {
  console.log( funcName + " LOG: " + msg );
};

var isUndefined = function( obj ) {
  return obj === void 0;
};

var isString = function( obj ) {
  return motaType( obj ) === "string";
};

var motaIsRegExp = function( obj ) {
  return motaType( obj ) === "regexp";
};

var hasOwn = {}.hasOwnProperty;

var has = function( obj, key ) {
  return obj != null && hasOwn.call( obj, key );
};

var isPlainObject = function( obj ) {

  var ctor;

  // If it's not an object
  // and if `constructor` was overwritten
  if (
    !obj || typeof obj !== "object" ||
    toString$1.call( obj ) !== "[object Object]" || has( obj, "constructor" )
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

var isObject = function( obj ) {
  return motaType( obj ) === "object";
};

var isNumber = function( obj ) {
  return motaType( obj ) === "number";
};

var isNull = function( obj ) {
  return obj === null;
};

var isNil = function( obj ) {
  return obj == null;
};

var motaIsNaN = function( obj ) {
  return obj != +obj && isNumber( obj );
};

var SYMBOL = typeof Symbol === "function" ? Symbol : {};

var getBySymbol = function( obj, name ) {

  var real = SYMBOL[ name ];

  if ( real ) {
    return obj[ real ];
  }

  return obj[ "@@" + name ];

};

var setBySymbol = function( obj, name, value ) {

  var real = SYMBOL[ name ];

  if ( real ) {
    obj[ real ] = value;
  }

  obj[ "@@" + name ] = value;

};

var isArray = Array.isArray;

function isIterable( obj ) {
  return !!obj && isFunction( getBySymbol( obj, "iterator" ) );
}

function isIndexed( obj ) {
  return isArray( obj ) || ( // It seems that [].values doesn't exist in some places
    !!obj && obj.values !== obj.keys &&
    isFunction( obj.values ) && isFunction( obj.keys ) &&
    obj.values === getBySymbol( obj, "iterator" )
  );
}

function isKeyed( obj ) {
  return !!obj && isFunction( obj.entries ) && obj.entries === getBySymbol( obj, "iterator" );
}

function isAssociative( obj ) {
  return isIndexed( obj ) || isKeyed( obj );
}

var motaIsFinite = function( obj ) {
  return isFinite( obj ) && !isNaN( parseFloat( obj ) );
};

var isError = function( obj ) {
  return motaType( obj ) === "error";
};

var baseEqual = function( a, b, checkZero ) {

  if ( a === b ) {
    if ( checkZero ) {
      return a !== 0 || 1 / a == 1 / b;
    }
    return true;
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

  var className = toString$1.call( a );
  if ( className != toString$1.call( b ) ) {
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
        if ( checkZero ) {
          return a !== 0 || 1 / a == 1 / b;
        }
        return true;
      }

      return false;

    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;

  }

  return className;

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

var isArguments = function( obj ) {
  return toString$1.call( obj ) === "[object Arguments]";
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

var isElement = function( obj ) {

  if ( !obj || obj.nodeType !== 1 ) {
    return false;
  }

  // The server side should be safe
  // but with the browser, we need to check the [[Class]] name

  if ( ISENVNODE ) {

    return true;

  } else {

    return toString$1.call( obj ).indexOf( "Element" ) > -1;

  }

};

var strDoc = "[object HTMLDocument]";
var strDoc2 = "[object Document]";
// IE 9 & 10

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

  } else {

    var className = toString$1.call( obj );

    return className === strDoc || className === strDoc2;

  }

};

var isDate = function( obj ) {
  return motaType( obj ) === "date";
};

var isBoolean = function( obj ) {
  return obj === true || obj === false || motaType( obj ) === "boolean";
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

var is = function( a, b ) {

  var baseEqResult = baseEqual( a, b );

  if ( baseEqResult === true || baseEqResult === false ) {
    return baseEqResult;
  }

  if ( a.size !== b.size ) {
    return false;
  }

  if ( a.isMutable && b.isMutable && !a.isMutable() && !b.isMutable() ) {

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

var err$1 = function( funcName, msg ) {
  throw funcName + " ERROR: " + msg;
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

// BASED ON jQuery
var extend = function( target ) {

  var
  options, name, src, copy, copyType, clone,
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

  for ( ; i < len ; i++ ) {

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

var clone$1 = function( target ) {

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

var ObjectCreate = Object.create;

var classExtend = function( protoProps, staticProps, optionalNew ) {

  var
  parent = this,
  Child,
  constructor;

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

var utilities = {
  apply: apply,
  classExtend: classExtend,
  clone: clone$1,
  extend: extend,
  defaults: defaults,
  err: err$1,
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
  isRegExp: motaIsRegExp,
  isString: isString,
  isUndefined: isUndefined,
  isWindow: isWindow,
  keys: motaKeys,
  log: log,
  mixin: mixin,
  noConflict: noConflict,
  noPartial: noPartial,
  pairs: motaPairs,
  type: motaType,
  uniqueId: uniqueId,
  validate: validate,
  warn: warn
};

var now = Date.now;

var inCommonWith = function( parArr1, parArr2 ) {

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
    if ( arr2.indexOf( arr1[ i ] ) !== -1 ) {
      return true;
    }
  }

  return false;

};

var getListeners$1 = function( results, object, events, listener, action ) {

  var
  thisEvent, i, match,
  onlyFirst = action === "getFirst",
  tryToMatch = action === "trigger",
  len = events ? events.length : 0,
  type = listener.type,
  namespaces = listener.namespaces,
  handler = listener.handler,
  context = listener.context;

  for ( i = 0 ; i < len ; i++ ) {

    thisEvent = events[ i ];

    if (
      thisEvent === listener ||
      (
        listener._listener !== true &&
        (
          !type ||
          is( thisEvent.type, type ) ||
          (
            tryToMatch &&
            thisEvent.isRegExp &&
            ( match = type.match( thisEvent.type ) )
          )
        ) &&
        (
          !handler ||
          thisEvent.handler === handler
        ) &&
        (
          !namespaces ||
          namespaces.length === 0 ||
          ( thisEvent.namespaces && inCommonWith( thisEvent.namespaces, namespaces ) )
        ) &&
        (
          !context ||
          thisEvent.context === context
        )
      )
    ) {

      results.push( [ thisEvent, { index: i, match: { string: type, match: match } } ] );

      if ( onlyFirst ) {
        break;
      }

    }

  }

  return results;

};

var rnotwhite = /\S+/g;
var rnamespace = /\.[^.]+/g;
var rtype = /^[^.]+/g;
var MotaEventListener = function( data ) {
  this.type = data.type;
  this.namespaces = data.namespaces;
  this.handler = data.handler;
  this.context = data.context;
  this.isRegExp = data.isRegExp;
  this.once = false;
  this._listener = true;
};
var eventTypes$1 = function( data, result ) {

  var
  i, len,
  eventType = data.eventType,
  handler = data.handler,
  context = data.context,
  type, namespaces, isRegExp,
  eventTypeObj, objType;

  // MotaEventListener { }
  if ( data._listener ) {

    result.push( data );

  } else {

    objType = motaType( eventType );
    isRegExp = objType === "regexp";

    // Handle eventType: /regexp/, handler, context
    if ( isRegExp ) {

      result.push( {
        type: eventType,
        handler: handler,
        context: context,
        isRegExp: isRegExp
      } );

    // Handle eventType: { "type": handler }, undefined, context
    // Handle eventType: { "type": handler }, context
    } else if ( objType === "object" ) {

      eventTypeObj = eventType;

      if ( handler ) {
        context = handler;
      }

      for ( eventType in eventTypeObj ) {

        eventTypes$1( {
          eventType: eventType,
          handler: eventTypeObj[ eventType ],
          context: context
        }, result );

      }

    // Handle eventType: "type1 type2", handler, context
    } else {

      eventType = ( eventType || "" ).match( rnotwhite ) || [ "" ];
      len = eventType.length;

      // Handle multiple events separated by a space
      for ( i = 0 ; i < len ; i++ ) {

        type = ( eventType[ i ].match( rtype ) || [] )[ 0 ];
        namespaces = eventType[ i ].match( rnamespace );

        result.push( {
          type: type,
          namespaces: namespaces,
          handler: handler,
          context: context,
          isRegExp: isRegExp
        } );

      }

    }

  }

  return result;

};
var eventsApi = function( object, action, callback, data, arg ) {

  var i, j, events, types, eventListeners, listener;

  if ( !object ) {
    return;
  }

  events = action === "on" ?
    MotaData.setup( object, "events", [] ) : MotaData.get( object, "events" );

  types = eventTypes$1( data, [] );

  if ( action === "on" ) {

    for ( i = 0; i < types.length; i++ ) {

      if ( !types[ i ].type || !types[ i ].handler ) {
        continue;
      }

      callback(
        object,
        events,
        new MotaEventListener( types[ i ] ),
        undefined,
        arg
      );

    }

  } else {

    eventListeners = [];

    for ( i = 0; i < types.length; i++ ) {
      getListeners$1( eventListeners, object, events, types[ i ], action );
    }

    for ( j = 0; j < eventListeners.length; j++ ) {

      listener = eventListeners[ j ];

      if ( callback( object, events, listener[ 0 ], listener[ 1 ], arg ) === false ) {
        break;
      }

    }

  }

  return object;

};

// Faster than Array#splice()
function spliceOne( list, index ) {
  for ( var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1 ) {
    list[ i ] = list[ k ];
  }
  list.pop();
}

var eventsApiOff = function( object, events, eventListener, data, index ) {

  // Edge case: unbind a callback in the midst of its firing
  eventListener.handler = undefined;

  spliceOne( events, data.index - index.value );

  index.value++;

};

var off = function( eventType, handler, context ) {

  return eventsApi( this, "off", eventsApiOff, {
    eventType: eventType,
    handler: handler,
    context: context
  }, { value: 0 } );

};

var eventsApiTriggerBeforeFiring = function( object, events, eventListener, data ) {

  if ( eventListener.once ) {
    eventListener.handler = undefined;
    eventsApi( object, "off", eventsApiOff, eventListener, { value: 0 } );
  }

};

var eventsApiTrigger = function( object, events, eventListener, data, args ) {

  var handler = eventListener.handler;

  eventsApiTriggerBeforeFiring( object, events, eventListener, data );

  apply(
    handler,
    eventListener.context !== undefined ? eventListener.context : object,
    eventListener.isRegExp ? [ data.match ].concat( args ) : args
  );

};

var trigger = function( eventType ) {

  return eventsApi(
    this, "trigger", eventsApiTrigger, {
      eventType: eventType
    }, slice.call( arguments, 1 )
  );

};

var data = {};
var uid = 1;
var key$1 = "vComp";
var check = function( el ) {
  return el.nodeType && el.nodeType !== 3 ? 1 : el === el.window ? 2 : 0;
};
var motaViewData = {
  add: function( component ) {

    var id, el = component.el, c = check( el );

    if ( c ) {
      id = MotaData.get( el, key$1 );
      if ( !id ) {
        id = uid++;
        MotaData.setup( el, key$1, id, c === 1 );
      }
      return ( data[ id ] = component );
    }

  },
  remove: function( el ) {

    var id = check( el ) && MotaData.get( el, key$1 );

    if ( id ) {
      data[ id ] = undefined;
    }

  },
  get: function( el ) {
    return data[ check( el ) && MotaData.get( el, key$1 ) ];
  }
};

var revent = /^on/;

function BinaryTreeNode( data ) {
  this.data = data;
}

BinaryTreeNode.prototype = {
  add: function( data, comparator ) {

    var c = comparator( this.data, data );

    if ( c > 0 ) {
      if ( this.left ) {
        this.left.add( data, comparator );
      } else {
        this.left = new BinaryTreeNode( data );
      }
    } else {
      if ( this.right ) {
        this.right.add( data, comparator );
      } else {
        this.right = new BinaryTreeNode( data );
      }
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

var BinaryTree = function( comparator ) {
  this.comparator = comparator;
};

BinaryTree.prototype = {
  isEmpty: function() {
    return !this.root;
  },

  add: function( data ) {
    if ( this.root ) {
      this.root.add( data, this.comparator );
    } else {
      this.root = new BinaryTreeNode( data );
    }
  },

  reset: function() {
    this.root = undefined;
  },

  resetAndTraverse: function( callback ) {
    var root = this.root;
    this.root = undefined;
    if ( root ) {
      root.traverse( callback );
    }
  }
};

function Stack() {
  this.first = { __next: undefined };
  this.last = this.first;
}

Stack.prototype = {

  constructor: Stack,

  add: function( obj ) {
    this.last.__next = obj;
    this.last = obj;
  },

  resetAndTraverse: function( callback ) {
    this.last = undefined; // Just to make sure we add nothing while traversing

    var step = this.first;
    while ( ( step = step.__next ) ) {
      callback( step );
    }

    return this.reset();
  },

  reset: function() {
    this.first.__next = undefined;
    this.last = this.first;
  }

};

function insertChildAt( elem, index, parentNode ) {

  // We can rely on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`.
  // However, using `undefined` is not allowed by all
  // browsers so we must replace it with `null`.
  var childNodes = parentNode.childNodes,
      beforeChild = index >= childNodes.length ? null : childNodes.item( index );

  if ( elem !== beforeChild ) {
    parentNode.insertBefore( elem, beforeChild );
  }
}

function dirtyComponentsIteratee( component ) {
  var internal = component.__internal__;
  if ( internal && internal.queued ) { // Make sure this component wasn't updated already
    internal.update( internal.force, null, null, internal.renderToString );
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

  var component = obj.component,
      name = obj.name;

  if ( component[ name ] ) {
    component[ name ]( obj.arg );
  }

}

function comparator( a, b ) {
  return a.__internal__.depth - b.__internal__.depth;
}

function MotaViewUpdater() {
  this.ignore = 0;
  this.flushingUpdates = false;
  this.dirtyComponents = new BinaryTree( comparator );
  this.pendingAttrUpdates = new Stack();
  this.pendingElemDeletions = new Stack();
  this.pendingElemInsertions = new Stack();
  this.pendingElemMoves = new Stack();
  this.pendingEdgeCaseUpdates = new Stack();
  this.pendingCallbacks = new Stack();
}

MotaViewUpdater.prototype = {

  constructor: MotaViewUpdater,

  queueUpdate: function( component ) {
    this.dirtyComponents.add( component );
    this.flushUpdates();
  },

  startIgnore: function() {
    this.ignore++;
  },

  endIgnore: function() {
    this.ignore--;
    this.flushUpdates();
  },

  flushUpdates: function() {

    if ( this.flushingUpdates || this.ignore || this.dirtyComponents.isEmpty() ) {
      return;
    }

    // We are now flushing updates
    this.flushingUpdates = true;

    // Traverse dirty components and reset list
    this.dirtyComponents.resetAndTraverse( dirtyComponentsIteratee );

    // Update attrs and reset stack
    this.pendingAttrUpdates.resetAndTraverse( pendingAttrUpdatesIteratee );

    // Update elements (deletions, insertions, moves) and reset stacks
    this.pendingElemDeletions.resetAndTraverse( pendingElemDeletionsIteratee );
    this.pendingElemInsertions.resetAndTraverse( pendingElemInsertionsMovesIteratee );
    this.pendingElemMoves.resetAndTraverse( pendingElemInsertionsMovesIteratee );

    // Take care of edge cases where we need to update props after mounting children
    this.pendingEdgeCaseUpdates.resetAndTraverse( pendingAttrUpdatesIteratee );

    // Call pending callbacks and reset stack
    this.pendingCallbacks.resetAndTraverse( pendingCallbacksIteratee );

    // We stopped flushing updates
    this.flushingUpdates = false;

    // But check if an update was queued during the previous process
    this.flushUpdates();

  },

  queueAttrUpdate: function( elem, name, value, type ) {
    this.pendingAttrUpdates.add( {
      elem: elem,
      name: name,
      value: value,
      type: type
    } );
  },

  queueElemDeletion: function( elem ) {
    this.pendingElemDeletions.add( {
      elem: elem
    } );
  },

  queueElemInsertion: function( elem, index, parent ) {
    this.pendingElemInsertions.add( {
      elem: elem,
      index: index,
      parent: parent
    } );
  },

  queueElemMove: function( elem, index, parent ) {
    this.pendingElemMoves.add( {
      elem: elem,
      index: index,
      parent: parent
    } );
  },

  queueEdgeCaseUpdate: function( elem, name, value, type ) {
    this.pendingEdgeCaseUpdates.add( {
      elem: elem,
      name: name,
      value: value,
      type: type
    } );
  },

  queueCallback: function( component, name, arg ) {
    if ( !component[ name ] ) {
      return;
    }
    this.pendingCallbacks.add( {
      component: component,
      name: name,
      arg: arg
    } );
  },

  error: function( msg, owner ) {

    var errText = owner ? " Please check the code for the " +
      owner.constructor.displayName + " component." : "";

    this.ignore = 0;
    this.flushingUpdates = false;
    this.dirtyComponents.reset();
    this.pendingAttrUpdates.reset();
    this.pendingElemDeletions.reset();
    this.pendingElemInsertions.reset();
    this.pendingElemMoves.reset();
    this.pendingEdgeCaseUpdates.reset();
    this.pendingCallbacks.reset();

    err$1( "mota.view.Component.update", msg + errText );
  }

};

var updater = new MotaViewUpdater();

var eventProps = {};
var addEventGetter = function( name ) {

  eventProps[ name ] = true;

  Object.defineProperty( MotaViewEvent.prototype, name, {
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
var MotaViewEvent = function( src ) {

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

};
MotaViewEvent.prototype = {
  constructor: MotaViewEvent,
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

var rkeyEvent = /^key/;
var rpointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/;
var eventTypes = {
  mousewheel: "wheel",
  DOMMouseScroll: "whell"
};
var hooks = {
  which: function( e ) {

    if ( rpointerEvent.test( e.type ) ) {

      var button = e.button;

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      return !e.which && button !== undefined ?
        button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) :
        e.which;
    }

    if ( rkeyEvent.test( e.type ) ) {
      return e.which == null ? e.charCode != null ? e.charCode : e.keyCode : e.which;
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
        ( doc && doc.scrollTop || body && body.scrollTop  || 0 ) -
        ( doc && doc.clientTop || body && body.clientTop  || 0 );
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
nativeKeys( hooks ).forEach( addEventGetter );

var forEachEventListener = function( object, events, eventListener, data, event ) {

  var handler = eventListener.handler;

  eventsApiTriggerBeforeFiring( object, events, eventListener, data );

  if ( event.isImmediatePropagationStopped ) {
    return false;
  }

  event.currentTarget = object.el;

  if ( handler ) {
    event.result = apply(
      handler,
      eventListener.context !== undefined ? eventListener.context : object,
      [ event ]
    );
  }

};
var dispatchEvents = function( event ) {

  event = new MotaViewEvent( event );

  var
  target = event.target,
  type = event.type,
  path = event.path,
  i = 0,
  curTargetDOM,
  curTargetCOMPONENT = motaViewData.get( target );

  updater.startIgnore();

  for ( ; i < path.length; i++ ) {

    if ( event.isPropagationStopped ) {
      break;
    }

    curTargetDOM = path[ i ];
    curTargetCOMPONENT = motaViewData.get( curTargetDOM );

    eventsApi(
      curTargetCOMPONENT, "trigger", forEachEventListener, {
        eventType: type,
        handler: undefined,
        context: undefined
      }, event
    );

    if ( !event.bubbles ) {
      break;
    }

  }

  updater.endIgnore();

};
var events$1 = function() {

  var name, eventName, additionalEvents = {
    "pointermove": 1,
    "pointerdown": 1,
    "pointerup": 1,
    "pointerover": 1,
    "pointerout": 1,
    "pointerenter": 1,
    "pointerleave": 1,
    "pointercancel": 1
  };

  if ( window.addEventListener ) {

    // To listen all events (even those that don't bubble),
    // add the event listener to `window` in the capture phase

    for ( name in window ) {
      eventName = name.replace( revent, "" );
      if ( name !== eventName ) {
        if ( !( eventName in additionalEvents ) ) {
          window.addEventListener( eventName, dispatchEvents, true );
        }
      }
    }

    nativeKeys( additionalEvents ).forEach( function( name ) {
      window.addEventListener( name, dispatchEvents, true );
    } );

  }

  return dispatchEvents;

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

var setMaxListeners = function( n ) {

  if ( typeof n !== "number" || n < 0 || isNaN( n ) ) {
    n = undefined;
  }

  MotaData.setup( this, "events", [] )._maxListeners = n;

  return this;
};

var eventsApiOn = function( object, events, eventListener, data, once ) {

  if ( once ) {
    eventListener.once = true;
  }

  events.push( eventListener );

  if ( events.length > events._maxListeners ) {
    warn(
      "mota.Events.on",
      "Possible memory leak detected. Use `setMaxListeners` to increase the limit of listeners."
    );
  }

};

var on = function( eventType, handler, context, once ) {

  return eventsApi( this, "on", eventsApiOn, {
    eventType: eventType,
    handler: handler,
    context: context
  }, once );

};

var once = function( eventType, handler, context ) {
  return on.call( this, eventType, handler, context, true );
};

var eventsApiHas = function( object, events, eventListener, data, result ) {
  result.value = true;
};

var hasListeners = function( eventType, handler, context ) {

  var result = { value: false };

  eventsApi( this, "getFirst", eventsApiHas, {
    eventType: eventType,
    handler: handler,
    context: context
  }, result );

  return result.value;

};

var getMaxListeners = function() {
  var events = MotaData.get( this, "events" );
  var n = events && events._maxListeners;
  return typeof n === "number" ? n : false;
};

var eventsApiGet = function( object, events, eventListener, data, result ) {
  result.push( eventListener );
};

var getListeners = function( eventType, handler, context ) {

  var result = [];

  eventsApi( this, "get", eventsApiGet, {
    eventType: eventType,
    handler: handler,
    context: context
  }, result );

  return result;

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

    for ( i = 0 ; i < childrenLength ; i++ ) {
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

var diffObj = function( component, elem, cacheName, cacheNameKeys, nextObj, func ) {

  // Perf: http://jsperf.com/for-in-vs-object-keys-while-loop

  var key, keys, i;

  var internal = component.__internal__;

  var prevObj = internal[ cacheName ];
  var prevObjKeys = internal[ cacheNameKeys ];
  var nextObjKeys = nativeKeys( nextObj );

  // Remove

  keys = prevObjKeys;
  i = keys.length;

  while ( i-- ) {
    key = keys[ i ];
    if ( nextObj[ key ] === undefined ) {
      func( component, elem, key, prevObj[ key ], undefined );
    }
  }

  // Add or edit

  keys = nextObjKeys;
  i = keys.length;

  while ( i-- ) {
    key = keys[ i ];
    if ( prevObj[ key ] !== nextObj[ key ] ) {
      func( component, elem, key, prevObj[ key ], nextObj[ key ] );
    }
  }

  internal[ cacheName ] = nextObj;
  internal[ cacheNameKeys ] = nextObjKeys;

};

function createIteratee( func, context ) {
  return context == null ? func : function( a, b, c ) {
    return func.call( context, a, b, c );
  };
}

function forEachArrayLike( obj, iteratee ) {
  for ( var i = 0; i < obj.length; i++ ) {
    iteratee( obj[ i ], i, obj );
  }
}

function forEachIdxIterable( obj, iteratee, iterator ) {

  var i = 0, step;

  while ( !( step = iterator.next() ).done ) {
    iteratee( step.value, i, obj );
    i++;
  }

}

function forEachKeyedIterable( obj, iteratee, iterator ) {

  var step, entry;

  while ( !( step = iterator.next() ).done ) {
    entry = step.value;
    iteratee( entry[ 1 ], entry[ 0 ], obj );
  }

}

function forEachObj( obj, iteratee ) {

  var key, i = 0, keys = nativeKeys( obj );

  for ( ; i < keys.length; i++ ) {
    key = keys[ i ];
    iteratee( obj[ key ], key, obj );
  }

}

function forEachNotArrayLike( obj, iteratee, allowObject ) {

  var iteratorFn, iterator;

  if ( typeof obj.forEach === "function" ) {
    return obj.forEach( iteratee );
  }

  iteratorFn = getBySymbol( obj, "iterator" );

  if ( typeof iteratorFn === "function" ) {

    iterator = iteratorFn.call( obj );

    if ( iteratorFn === obj.entries ) {

      // Iterator will provide entry [k,v]
      return forEachKeyedIterable( obj, iteratee, iterator );

    } else {

      return forEachIdxIterable( obj, iteratee, iterator );

    }

  }

  return allowObject !== false ? forEachObj( obj, iteratee ) : undefined;

}

// An universal way to iterate over values in an iterable (the iteration is not breakable)
var forEach = function( obj, func, context, allowObject ) {

  if ( !obj || typeof obj !== "object" ) {
    return;
  }

  var iteratee = createIteratee( func, context );

  return isArray( obj ) || isArrayLike( obj ) ?
    forEachArrayLike( obj, iteratee ) :
    forEachNotArrayLike( obj, iteratee, allowObject );

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

    html += " " + name + "=" + "\"" + escapeAttributeValue( value ) + "\"";

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

function item( idx ) { return this[ idx ]; }

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

var doc$1 = {
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

doc$1.head = doc$1.createElement( "head" );
doc$1.body = doc$1.createElement( "body" );
doc$1.documentElement = doc$1.createElement( "html" );
doc$1.documentElement.insertBefore( doc$1.head );
doc$1.documentElement.insertBefore( doc$1.body );
doc$1.childNodes = [ doc$1.documentElement ];

var fakeDocument = doc$1;

var getDataMota = function( el ) {
  return el.getAttribute( "data-mota" );
};

var setDataMota = function( el, value ) {
  if ( el.setAttribute ) {
    el.setAttribute( "data-mota", value );
  }
  return el;
};

var removeOddElems = function( el ) {

  var i = el.childNodes.length;
  var node;

  while ( i-- ) {
    node = el.childNodes.item( i );
    if ( node.getAttribute && getDataMota( node ) !== "server" ) {
      el.removeChild( node );
    }
  }

};

var exists$1 = function( currEl, newEl, value ) {

  if ( !currEl || ( currEl.getAttribute && getDataMota( currEl ) !== "server" ) ) {
    return setDataMota( newEl, value );
  }

  if (
    currEl.nodeType === newEl.nodeType &&
    currEl.nodeName === newEl.nodeName &&
    currEl.nodeValue === newEl.nodeValue
  ) {
    if ( currEl.nodeName === "HEAD" || currEl.nodeName === "BODY" ) {
      removeOddElems( currEl );
    }
    return setDataMota( currEl, value );
  }

  return setDataMota( newEl, value );

};

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

    el = exists$1( currEl, el, renderToString ? "server" : "client" );

    if ( type === "script" || type === "style" ) {
      updater.error(
        "For security reasons, <script> and <style> elements are not allowed to be created.",
        owner
      );
    }

  } else {

    updater.error(
      "`render` must return an object containing a `type` property " +
      "with a primitive string or it must return `null`.",
      owner
    );

  }

  return el;

};

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Support: Android<4.1
// Make sure we trim BOM and NBSP
var trim = function( str ) {
  return str == null ? "" : ( str + "" ).replace( rtrim, "" );
};

var classSet = function( elem ) {

  var className = "", type, i = 0, len, names, name;

  if ( !elem ) {
    return "";
  }

  type = motaType( elem );

  if ( type === "array" ) {

    len = elem.length;

    for ( ; i < len ; i++ ) {
      if ( elem[ i ] ) {
        className += " " + elem[ i ];
      }
    }

  } else if ( type === "object" ) {

    names = motaKeys( elem );
    len = names.length;

    for ( ; i < len ; i++ ) {
      name = names[ i ];
      if ( elem[ name ] ) {
        className += " " + name;
      }
    }

  } else {

    className = elem + "";

  }

  return trim( className );

};

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
    val = trim( val );
  }

  return val + "px";

}

function setStyle( component, elem, key, _prevValue, value ) {

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
    updater.queueAttrUpdate( elem, key, value, "style" );
  }

}

forEachObj( unitlessNumber, function( value, key ) {
  unitlessNumber[ vendorPropName( key ) ] = value;
} );

var diffAttr = function( component, el, key, elemA, elemB ) {

  var className, eventName;

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
        updater.queueAttrUpdate( el, "innerHTML", elemB.__html, "prop" );
      }

      return;

    case "style":

      return diffObj(
        component,
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
          updater.queueAttrUpdate( el, "class", className, "attr" );
        }

      } else {

        if ( el.className !== className ) {
          updater.queueAttrUpdate( el, "className", className, "prop" );
        }

      }

      return;

    default:

      eventName = key.replace( revent, "" );

      if ( key !== eventName ) {

        eventName = eventName.toLowerCase();

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
          elemB = elemB + "";
        }

        if ( el[ key ] !== elemB ) {

          // Setting value on <select> doesn't work before children exist
          // So set it again after children have been created
          if ( key === "value" && el.nodeName === "SELECT" ) {
            updater.queueEdgeCaseUpdate( el, key, elemB, "prop" );
          } else {
            updater.queueAttrUpdate( el, key, elemB, "prop" );
          }

        }

      } else {

        if ( isAttributeNameSafe( key ) ) {
          updater.queueAttrUpdate( el, key, elemB, "attr" );
        }

      }

      return;

  }

};

var noscript = create( "noscript" );

var updateComponent = function( index, renderToString ) {

  var result, cache, thisEl, type, attrs, children, component = this.component;

  result = component.render( create ) || noscript;
  cache = this.cache;

  if ( cache === result ) {
    return;
  }

  this.cache = result;

  type = result.type;
  attrs = result.props;
  children = attrs.children;

  if ( !component.el ) {
    component.el = createEl(
      type, attrs, this.parentEl.childNodes.item( index ), renderToString, this.owner
    );
  }

  thisEl = component.el;

  if ( !thisEl ) {
    updater.error( "The `el` property is missing.", this.owner );
  }

  if ( cache.type && type !== cache.type ) {
    updater.error(
      "You must not change the type of an component between updates. " +
      "You have changed `" + cache.type + "` to `" + type + "`.",
      this.owner
    );
  }

  if ( type === "#text" ) {
    return updater.queueAttrUpdate( thisEl, "nodeValue", attrs.text, "prop" );
  }

  if ( type === "#comment" ) {
    return updater.queueAttrUpdate( thisEl, "nodeValue", children.join( "\n" ), "prop" );
  }

  if ( voidElements[ type ] ) {
    if ( attrs.daugerousInnerHTML != null || children != null ) {
      updater.error(
        "`" + type + "` is a void element tag and must not have `children` or " +
        "use `daugerousInnerHTML`.",
        this.owner
      );
    }
  }

  // DIFF ATTRS
  diffObj( component, thisEl, "cacheAttrs", "cacheAttrsKeys", attrs, diffAttr );

  // DIFF CHILDREN
  if ( voidElements[ type ] || attrs.daugerousInnerHTML != null ) {
    return;
  }

  this.children.diffChildren( flattenChildren( children ), renderToString );

};

function clean( component ) {

  if ( component.componentWillUnmount ) {
    component.componentWillUnmount();
  }

  var childrenList = component.__internal__.children;

  motaViewData.remove( component.el );

  component.el = component.props = component.__internal__ = undefined;

  childrenList.traverse( clean );

}

var remove$1 = function() {

  var component = this.component;

  this.dontQueue = true;

  this.updater.queueElemDeletion( component.el );

  clean( component );

  this.queued = false;

};

var update$1 = function( force, nextProps, index, renderToString ) {

  var component = this.component, prevProps = component.props, shouldUpdate;

  this.dontQueue = true;

  if ( !nextProps ) {
    nextProps = component.props;
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
      component.props = nextProps;
      this.queued = false;
      this.dontQueue = false;
      return;
    }

  }

  if ( component.componentWillUpdate ) {
    component.componentWillUpdate( nextProps );
  }

  component.props = nextProps;

  this.queued = false;
  this.dontQueue = false;

  this.updateComponent( index, renderToString );

  if ( !force && index != null ) {
    this.updater.queueElemMove( component.el, index, this.parentEl );
  }

  this.updater.queueCallback( component, "componentDidUpdate", prevProps );

};

var init = function( nextProps, owner, parentEl, depth, index, renderToString ) {

  var component = this.component;

  this.dontQueue = true;

  component.props = nextProps;

  if ( component.initialize ) {
    component.initialize();
  }

  if ( component.componentWillMount ) {
    component.componentWillMount();
  }

  this.queued = false;
  this.dontQueue = false;

  this.owner = owner;
  this.depth = depth;
  this.parentEl = parentEl;

  this.updateComponent( index, renderToString );

  motaViewData.add( component );
  this.updater.queueElemInsertion( component.el, index, parentEl );
  this.updater.queueCallback( component, "componentDidMount" );

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
    this.updater.queueUpdate( this.component );

  // If already queued, update `this.force` -> `true` if needed
  // Never update `this.force` from `true` to `false`
  } else if ( force ) {
    this.force = true;
  }

};

var typeId = 0;

var createClass = function( proto ) {

  var name, __methods = [];

  function Constructor() {
    MotaViewComponent.call( this );
  }

  if ( isFunction( proto ) ) {
    proto = {
      render: proto
    };
  }

  if ( !proto || !isFunction( proto.render ) ) {
    err$1(
      "mota.view.createClass",
      "Provide an object with a `render` property containing a function"
    );
  }

  Constructor.displayName = proto.displayName;
  Constructor.validateProps = proto.validateProps;

  for ( name in proto.statics ) {
    Constructor[ name ] = proto.statics[ name ];
  }

  Constructor.prototype = new MotaViewComponent();

  proto = extend( Constructor.prototype, proto );

  for ( name in proto ) {
    if ( isFunction( proto[ name ] ) ) {
      __methods.push( name );
    }
  }

  proto.constructor  = Constructor;
  proto.__methods    = __methods;
  Constructor.__type = typeId++;

  return Constructor;

};

var DefaultClazz;

var createKey = function( placeholder, noKeyIdx ) {

  var key = placeholder.key;
  var type = placeholder.type;
  var typeId = type.__type === undefined ? type : type.__type;

  if ( noKeyIdx[ typeId ] === undefined ) {
    noKeyIdx[ typeId ] = 0;
  }

  return typeId + ( key == null ? ":noKey:" + noKeyIdx[ typeId ]++ : ":key:" + key );

};

function ChildrenList( parentComponent ) {
  this.reset();
  this.parentComponent = parentComponent;
}

ChildrenList.prototype = {

  reset: function() {
    this.array = [];
    this.map = {};
  },

  get: function( index ) {
    return this.array[ index ];
  },

  traverse: function( callback ) {

    var i = 0, arr = this.array;

    for ( ; i < arr.length; i++ ) {
      callback( arr[ i ] );
    }

  },

  diffChildren: function( children, renderToString ) {

    if ( !DefaultClazz ) {
      DefaultClazz = createClass( function() {
        return this.props;
      } );
    }

    var prevArray = this.array,
        prevMap = this.map,
        i = 0, key, component,
        placeholder, typeIsFunc,
        cacheIndex, noKeyIdx = {},
        parentEl = this.parentComponent.el,
        parentCompInternal = this.parentComponent.__internal__,
        parentOwner = parentCompInternal.owner,
        depth = parentCompInternal.depth + 1;

    this.reset();

    for ( ; i < children.length; i++ ) {

      placeholder = children[ i ];

      key = createKey( placeholder, noKeyIdx );
      cacheIndex = prevMap[ key ];

      typeIsFunc = isFunction( placeholder.type );

      // If existed in previous render
      if ( cacheIndex !== undefined ) {

        component = prevArray[ cacheIndex ];
        prevArray[ cacheIndex ] = undefined;

        component.__internal__.update(
          false,
          typeIsFunc ? placeholder.props : placeholder,
          i
        );

      } else {

        component = typeIsFunc ? new placeholder.type() : new DefaultClazz();

        component.__internal__.init(
          typeIsFunc ? placeholder.props : placeholder,
          typeIsFunc ? component : parentOwner,
          parentEl,
          depth,
          i,
          renderToString
        );

      }

      this.array[ i ] = component;
      this.map[ key ] = i;

    }

    i = prevArray.length;

    while ( i-- ) {

      component = prevArray[ i ];

      if ( component ) {
        component.__internal__.remove();
      }

    }

  }

};

var frozenObj = Object.freeze( {} );
var frozenArr = Object.freeze( [] );

var MotaViewInternal = function( component ) {

  this.component = component;

  // It's `true` when this component needs an update.
  // Should be `true` until the initial rendering starts.
  this.queued = false;

  // If the update process should ignore `shouldComponentUpdate`
  this.force = false;

  // If the update process started in `.renderToString`
  this.renderToString = false;

  // Contains all the child components
  this.children = new ChildrenList( component );

  // Depth
  this.depth = 0;

  // Reference for the updater
  this.updater = updater;

};

MotaViewInternal.prototype = {

  constructor: MotaViewInternal,

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

  update: update$1,

  remove: remove$1,

  updateComponent: updateComponent

};

function MotaViewComponent() {
  this.__internal__ = new MotaViewInternal( this );
}

extend( MotaViewComponent.prototype, Events, {
  update: function() {
    this.__internal__.queueUpdate();
  },
  forceUpdate: function() {
    this.__internal__.queueUpdate( true );
  },
  bindMethodsToThis: function() {

    var name, i = this.__methods.length, original;

    while ( i-- ) {
      name = this.__methods[ i ];
      original = this[ name ];
      this[ name ] = noPartial( original, this );
      this[ name ].original = original;
    }

  }
} );

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

  component = new MotaViewComponent();
  component.el = el;

  if ( motaViewData.add( component ) ) {
    return component;
  }

};

var renderToString = function( placeholder ) {

  var parentComponent = new MotaViewComponent();
  parentComponent.el = fakeDocument.createElement( "div" );

  parentComponent.render = function( p ) {
    return p( null, null, placeholder );
  };

  parentComponent.__internal__.queueUpdate( true, true );

  return parentComponent.el.innerHTML;

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
    err$1( "mota.view.render", "`parent` should be an DOM element" );
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

  return parentComponent.__internal__.children.get( 0 );

};

var view = {
  classSet: classSet,
  Component: MotaViewComponent,
  create: create,
  createClass: createClass,
  render: render,
  renderToString: renderToString,
  select: select,
  styleSet: styleSet,
  dispatchEvents: events$1()
};

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
    "(?::(\\d{2,5}))?" + ")?" +

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

  for ( ; i < querys.length ; i++ ) {

    if ( !querys[ i ] ) {
      continue;
    }

    splitted = querys[ i ].split( "=" );

    name = decodeURIComponent( splitted[ 0 ] );
    value = splitted[ 1 ] ? decodeURIComponent( splitted[ 1 ] ) : "";

    if ( query[ name ] !== undefined ) {

			if ( !isArray( query[ name ] ) ) {
        query[ name ] = [ query[ name ], value ];
      } else {
        query[ name ].push( value );
      }

		} else {

      query[ name ] = value;

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

var isAbsolute = function() {
  return this.pathname.charAt( 0 ) === "/";
};

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

var join = function() {

  var i, arg, paths = [];

  for ( i = 0; i < arguments.length; i++ ) {
    arg = arguments[ i ];
    if ( arg && isString( arg ) ) {
      paths.push( arg );
    }
  }

  return MotaPath.normalize( paths.join( "/" ) );

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

  fromPath = new MotaPath( from );
  toPath = new MotaPath( to );

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
    path = new MotaPath( arguments[ i ] );

    // Set `result` as `new MotaPath( arguments[ arguments.length - 1 ] )`
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

function MotaPath( url, parseQuery ) {
  parse.call( this, url, parseQuery );
}

extend( MotaPath.prototype, {
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

MotaPath.format = function( obj ) {
  return format.call( obj );
};

MotaPath.isAbsolute = function( url ) {
  return new MotaPath( url ).isAbsolute();
};

MotaPath.join = join;

MotaPath.normalize = function( url ) {
  return new MotaPath( url ).href;
};

MotaPath.parse = function( url, parseQuery ) {
  return new MotaPath( url, parseQuery );
};

MotaPath.relative = relative;

MotaPath.resolve = resolve;

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
function MotaRouterRoute( name, path, callback, parent ) {

  if ( isFunction( path ) ) {
    callback = path;
    path = name;
    name = undefined;
  }

  if ( !path ) {
    err$1( "mota.Router.route", "Provide a non-empty path" );
  }

  this.name = name;

  this.parent = parent;

  this.path = ( parent.path || "" ) + "/" + path.replace( rstripper, "" );
  this.params = getParams( this.path );

  this.routes = [];

  callback.call( this );

}

MotaRouterRoute.prototype = {

  constructor: MotaRouterRoute,

  normalize: function( url ) {
    return ensureFirstChar( new MotaPath( url ).fragment, "/" );
  },

  route: function( name, path, callback ) {

    var route = new MotaRouterRoute( name, path, callback, this );

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

    var i = 0, len = this.routes.length,
    route, match,

    iteratee = function( param, i ) {
      var name = route.params.names[ i ];
      params[ name ] = param ? decodeURIComponent( param ) : null;
    };

    fragment = this.normalize( fragment );

    if ( this.callback ) {
      this.callback( params, fragment );
    }

    for ( ; i < len ; i++ ) {

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

function MotaRouter() {

  this.routes = [];

  this.history = window.history;

  // To enable support for HTML5-History-API polyfill
  this.location = ( this.history && this.history.location ) || window.location;

  this.window = windowView || ( windowView = view.select( window ) );

  if ( this.initialize ) {
    apply( this.initialize, this, arguments );
  }

}

MotaRouter.extend = classExtend;

extend( MotaRouter.prototype, MotaRouterRoute.prototype, {

  constructor: MotaRouter,

  _join: function( url ) {
    return this.root !== "/" ? this.root + url : url;
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

var PROMISE_SENTINEL = "@@__MOTA_PROMISE__@@";

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function isValidState( s ) {
  return ( s === PENDING || s === REJECTED || s === FULFILLED );
}

function _transition( self, state, value ) {

  if (
    self.state === state ||
    self.state !== PENDING ||
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
      REJECTED,
      new TypeError( "The promise and its value refer to the same object" )
    );

  } else if ( isPromise( x ) ) {

    if ( x.state === PENDING ) {

      x.then( function( val ) {
        _resolve( promise, val );
      }, function( reason ) {
        _transition( promise, REJECTED, reason );
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
                  _transition( promise, REJECTED, r );
                  called = true;
                }
              }
            );

          } else {
            _transition( promise, FULFILLED, x );
            called = true;
          }

      } catch ( e ) {
        if ( !called ) {
          _transition( promise, REJECTED, e );
          called = true;
        }
      }

  } else {

    _transition( promise, FULFILLED, x );

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

  if ( self.state === PENDING ) {
    return;
  }

  runAsync( function() {

    while ( self.queue.length ) {

      var queuedPromise = self.queue.shift(),
          handler = null,
          value;

      if ( self.state === FULFILLED ) {
        handler = queuedPromise.handlers.fulfill;
      } else if ( self.state === REJECTED ) {
        handler = queuedPromise.handlers.reject;
      }

      try {
        value = handler( self.value );
      } catch ( e ) {
        _transition( queuedPromise, REJECTED, e );
        continue;
      }

      _resolve( queuedPromise, value );

    }

  } );

}

// Based of https://github.com/abdulapopoola/Adehun/blob/master/adehun.js
// Also includes some es6 extensions

function fulfillFallBack( value ) {
  return value;
}

function rejectFallBack( reason ) {
  throw reason;
}

var MotaPromise = function( fn ) {

  var self = this;

  this.value = null;
  this.state = PENDING;
  this.queue = [];
  this.handlers = {
    fulfill: fulfillFallBack,
    reject: rejectFallBack
  };

  if ( isFunction( fn ) ) {
    fn( function( value ) {
      _resolve( self, value );
    }, function( reason ) {
      _transition( self, REJECTED, reason );
    } );
  }

};

MotaPromise.prototype[ PROMISE_SENTINEL ] = true;

MotaPromise.prototype.then = function( onFulfilled, onRejected ) {

  var queuedPromise = new MotaPromise();

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
MotaPromise.prototype[ propCatch ] = function( onRejected ) {
  return this.then( null, onRejected );
};

var propFinally = "finally";
MotaPromise.prototype[ propFinally ] = function( f ) {
  return this.then( function( value ) {
    return MotaPromise.resolve( f() ).then( function() {
      return value;
    } );
  }, function( err ) {
    return MotaPromise.resolve( f() ).then( function() {
      throw err;
    } );
  } );
};

function doneErrCallback( err ) {
  runAsync( function() {
    throw err;
  } );
}

MotaPromise.prototype.done = function( onFulfilled, onRejected ) {
  this.then( onFulfilled, onRejected )[ propCatch ]( doneErrCallback );
};

MotaPromise.resolved = MotaPromise.resolve = function( value ) {
  return new MotaPromise( function( resolve ) {
    resolve( value );
  } );
};

MotaPromise.rejected = MotaPromise.reject = function( reason ) {
  return new MotaPromise( function( resolve, reject ) {
    reject( reason );
  } );
};

MotaPromise.deferred = MotaPromise.defer = function() {
  var resolve, reject;

  return {
    promise: new MotaPromise( function( a, b ) {
      resolve = a;
      reject = b;
    } ),
    resolve: resolve,
    reject: reject
  };
};

MotaPromise.all = function( iterable ) {

  return new MotaPromise( function( resolve, reject ) {

    var result = [];
    var remaining = 0;
    var i = 0;

    forEach( iterable, function( val ) {

      var myIndex = i++;
      remaining++;

      MotaPromise.resolve( val ).then( function( val ) {

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

MotaPromise.race = function( iterable ) {

  return new MotaPromise( function( resolve, reject ) {

    forEach( iterable, function( value ) {

      MotaPromise.resolve( value ).then( resolve, reject );

    }, null, false );

  } );

};

var INIT = {};
var SHIFT = 5;
var SIZE = 32;
var MASK = SIZE - 1;
var MAX_INDEX_NODE = SIZE / 2;
var MIN_ARRAY_NODE = SIZE / 4;
var MAP_SENTINEL = "@@__MOTA_MAP__@@";

var isEditable = function( owner ) {
  return owner && this.owner === owner;
};

var forEach$1 = function( func ) {

  var children = this.children,
      i = 0,
      len = children.length,
      child;

  for ( ; i < len; i++ ) {
    child = children[ i ];
    if ( child && child.forEach( func ) === false ) {
      return false;
    }
  }

};

var arraySpliceOut = function( array, idx, canEdit ) {

  var newLen = array.length - 1, newArray, i, after;

  if ( canEdit && idx === newLen ) {
    array.pop();
    return array;
  }

  newArray = new Array( newLen );
  i = after = 0;

  for ( ; i < newLen; i++ ) {
    if ( i === idx ) {
      after = 1;
    }
    newArray[ i ] = array[ i + after ];
  }

  return newArray;

};

var arrayUpdate = function( array, idx, value, canEdit ) {

  var i, len, newArray;

  if ( canEdit ) {

    newArray = array;

  } else {

    i = 0;
    len = array.length;
    newArray = new Array( len );

    for ( ; i < len; i++ ) {
      newArray[ i ] = array[ i ];
    }

  }

  if ( idx !== undefined ) {
    newArray[ idx ] = value;
  }

  return newArray;

};

function Collision( owner, hash, children ) {
  this.owner = owner;
  this.hash = hash;
  this.children = children;
}

extend( Collision.prototype, {

  isLeaf: true,

  isEditable: isEditable,

  forEach: forEach$1,

  lookup: function( shift, h, k, notSetValue ) {

    var i = 0,
        len = this.children.length,
        child;

    for ( ; i < len; i++ ) {

      child = this.children[ i ];

      if ( is( child.key, k ) ) {
        return child.value;
      }

    }

    return notSetValue;

  },

  modify: function( owner, shift, h, k, updater ) {

    if ( h === undefined ) {
      h = hash( k );
    }

    var value, oldValue, removed,
        idx, len,
        exists, children,
        canEdit, newChildren, child;

    if ( h !== this.hash ) {

      value = updater.get( updater.notSetValue );
      removed = value === updater.notSetValue;

      if ( removed ) {
        return this;
      }

      updater.changeValue = true;
      updater.changeSize = true;
      return mergeLeaves( this, owner, shift, new Leaf( owner, h, k, value ) );
    }

    children = this.children;
    idx = 0;
    len = children.length;
    for ( ; idx < len; idx++ ) {

      child = children[ idx ];

      if ( is( child.key, k ) ) {
        oldValue = child.value;
        break;
      }

    }

    exists = idx < len;
    value = updater.get( exists ? oldValue : updater.notSetValue );
    removed = value === updater.notSetValue;

    if ( exists ? child.value === value : removed ) {
      return this;
    }

    updater.changeValue = true;
    if ( removed || !exists ) {
      updater.changeSize = true;
    }

    if ( removed && len === 2 ) {
      child = children[ idx ^ 1 ];
      return new Leaf( owner, this.hash, child.key, child.value );
    }

    canEdit = this.isEditable( owner );
    newChildren = canEdit ? children : arrayUpdate( children );

    if ( exists ) {
      if ( removed ) {
        if ( idx === len - 1 ) {
          newChildren.pop();
        } else {
          newChildren[ idx ] = newChildren.pop();
        }
      } else {
        newChildren[ idx ] = new Leaf( owner, h, k, value );
      }
    } else {
      newChildren.push( new Leaf( owner, h, k, value ) );
    }

    if ( canEdit ) {
      this.children = newChildren;
      return this;
    }

    return new Collision( owner, this.hash, newChildren );

  }

} );

var arraySpliceIn = function( array, idx, value, canEdit ) {

  var newLen = array.length + 1, newArray, i, after;

  if ( canEdit && idx + 1 === newLen ) {
    array[ idx ] = value;
    return array;
  }

  newArray = new Array( newLen );
  i = after = 0;

  for ( ; i < newLen; i++ ) {
    if ( i === idx ) {
      newArray[ i ] = value;
      after = -1;
    } else {
      newArray[ i ] = array[ i + after ];
    }
  }

  return newArray;

};

var pack = function( owner, children, count, removed ) {

  var packed = new Array( count ),
      packedIdx = 0,
      bitmap = 0,
      i = 0,
      bit = 1,
      len = children.length,
      child;

  for ( ; i < len; i++ ) {
    child = children[ i ];
    if ( child && i !== removed ) {
      bitmap |= bit;
      packed[ packedIdx++ ] = child;
    }
    bit <<= 1;
  }

  return new IndexedNode( owner, bitmap, packed );

};

function ArrayNode( owner, count, children ) {
  this.owner = owner;
  this.count = count;
  this.children = children;
}

extend( ArrayNode.prototype, {

  isEditable: isEditable,

  forEach: forEach$1,

  lookup: function( shift, h, k, notSetValue ) {

    if ( h === undefined ) {
      h = hash( k );
    }

    var child = this.children[ ( shift === 0 ? h : h >>> shift ) & MASK ];

    return !child ? notSetValue : child.lookup( shift + SHIFT, h, k, notSetValue );

  },

  modify: function( owner, shift, h, k, updater ) {

    if ( h === undefined ) {
      h = hash( k );
    }

    var idx = ( shift === 0 ? h : h >>> shift ) & MASK,
        children = this.children,
        child = children[ idx ],
        newChild, newCount,
        canEdit, newChildren;

    if ( !child && updater.get( updater.notSetValue ) === updater.notSetValue ) {
      return this;
    }

    newChild = alter( child, owner, shift + SHIFT, h, k, updater );
    if ( newChild === child ) {
      return this;
    }

    newCount = this.count;
    if ( !child ) {
      newCount++;
    } else if ( !newChild ) {
      newCount--;
      if ( newCount < MIN_ARRAY_NODE ) {
        return pack( owner, children, newCount, idx );
      }
    }

    canEdit = this.isEditable( owner );
    newChildren = arrayUpdate( children, idx, newChild, canEdit );

    if ( canEdit ) {
      this.count = newCount;
      this.children = newChildren;
      return this;
    }

    return new ArrayNode( owner, newCount, newChildren );

  }

} );

var popCount = function( x ) {
  x = x - ( ( x >> 1 ) & 1431655765 );
  x = ( x & 858993459 ) + ( ( x >> 2 ) & 858993459 );
  x = ( x + ( x >> 4 ) ) & 252645135;
  x = x + ( x >> 8 );
  x = x + ( x >> 16 );
  return x & 127;
};

var expand = function( owner, children, bitmap, frag, child ) {

  var expanded = new Array( SIZE ), i = 0, count = 0;

  for ( ; bitmap; i++ ) {
    if ( bitmap & 1 ) {
      expanded[ i ] = children[ count ];
      count++;
    }
    bitmap = bitmap >>> 1;
  }

  expanded[ frag ] = child;

  return new ArrayNode( owner, count + 1, expanded );

};

function IndexedNode( owner, bitmap, children ) {
  this.owner = owner;
  this.bitmap = bitmap;
  this.children = children;
}

extend( IndexedNode.prototype, {

  isEditable: isEditable,

  forEach: forEach$1,

  lookup: function( shift, h, k, notSetValue ) {

    if ( h === undefined ) {
      h = hash( k );
    }

    var bit = 1 << ( ( shift === 0 ? h : h >>> shift ) & MASK ),
        bitmap = this.bitmap;

    if ( bitmap & bit ) {

      return this.children[
        popCount( bitmap & ( bit - 1 ) )
      ].lookup( shift + SHIFT, h, k, notSetValue );

    }

    return notSetValue;

  },

  modify: function( owner, shift, h, k, updater ) {

    if ( h === undefined ) {
      h = hash( k );
    }

    var frag = ( shift === 0 ? h : h >>> shift ) & MASK,
        bit = 1 << frag,
        bitmap = this.bitmap,
        exists = ( bitmap & bit ) !== 0,
        idx, len, children,
        child, newChild,
        canEdit, newBitmap,
        newChildren;

    if ( !exists && updater.get( updater.notSetValue ) === updater.notSetValue ) {
      return this;
    }

    idx = popCount( bitmap & ( bit - 1 ) );
    children = this.children;
    child = exists ? children[ idx ] : undefined;
    newChild = alter( child, owner, shift + SHIFT, h, k, updater );

    if ( newChild === child ) {
      return this;
    }

    len = children.length;

    if ( !exists && newChild && len >= MAX_INDEX_NODE ) {
      return expand( owner, children, bitmap, frag, newChild );
    }

    if ( exists && !newChild && len === 2 && children[ idx ^ 1 ].isLeaf ) {
      return children[ idx ^ 1 ];
    }

    if ( exists && newChild && len === 1 && newChild.isLeaf ) {
      return newChild;
    }

    canEdit = this.isEditable( owner );
    newBitmap = exists ? newChild ? bitmap : bitmap ^ bit : bitmap | bit;
    newChildren = exists ? newChild ?
      arrayUpdate( children, idx, newChild, canEdit ) :
      arraySpliceOut( children, idx, canEdit ) :
      arraySpliceIn( children, idx, newChild, canEdit );

    if ( canEdit ) {
      this.bitmap = newBitmap;
      this.children = newChildren;
      return this;
    }

    return new IndexedNode( owner, newBitmap, newChildren );

  }

} );

var mergeLeaves = function( n1, owner, shift, n2 ) {

  var h1 = n1.hash,
      h2 = n2.hash,
      idx1, idx2;

  if ( h1 === h2 ) {
    return new Collision( owner, h1, [ n2, n1 ] );
  }

  idx1 = ( h1 >>> shift ) & MASK;
  idx2 = ( h2 >>> shift ) & MASK;

  return new IndexedNode(
    owner,
    ( 1 << idx1 ) | ( 1 << idx2 ),
    idx1 === idx2 ?
      [ mergeLeaves( n1, owner, shift + SHIFT, n2 ) ] :
      ( idx1 < idx2 ? [ n1, n2 ] : [ n2, n1 ] )
  );

};

function Leaf( owner, hash, key, value ) {
  this.owner = owner;
  this.hash = hash;
  this.key = key;
  this.value = value;
}

extend( Leaf.prototype, {

  isLeaf: true,

  isEditable: isEditable,

  lookup: function( shift, h, k, notSetValue ) {
    return is( this.key, k ) ? this.value : notSetValue;
  },

  modify: function( owner, shift, h, k, updater ) {

    var keyMatch = is( this.key, k ),
        value = updater.get( keyMatch ? this.value : updater.notSetValue ),
        removed = value === updater.notSetValue;

    if ( keyMatch ? this.value === value : removed ) {
      return this;
    }

    updater.changeValue = true;

    if ( removed ) {
      updater.changeSize = true;
      return;
    }

    if ( keyMatch ) {

      if ( this.isEditable( owner ) ) {
        this.value = value;
        return this;
      }

      return new Leaf( owner, this.hash, k, value );

    }

    updater.changeSize = true;

    if ( h === undefined ) {
      h = hash( k );
    }

    return mergeLeaves( this, owner, shift, new Leaf( owner, h, k, value ) );

  },

  forEach: function( func ) {
    return func( this );
  }

} );

var alter = function( child, owner, shift, h, k, updater ) {

  var value;

  if ( !child ) {

    value = updater.get( updater.notSetValue );

    if ( value === updater.notSetValue ) {
      return;
    }

    if ( h === undefined ) {
      h = hash( k );
    }

    updater.changeValue = true;
    updater.changeSize = true;
    return new Leaf( owner, h, k, value );
  }

  return child.modify( owner, shift, h, k, updater );

};

function updaterGet( oldValue ) {
  var func = this.func;
  this.oldValue = oldValue;
  if ( func ) {
    this.value = func( oldValue );
    this.func = undefined;
  }
  return this.value;
}

var MotaMapUpdater = function( func, notSetValue ) {
  return {
    changeSize: false,
    changeValue: false,
    notSetValue: notSetValue,
    func: func,
    get: updaterGet
  };
};

var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;

function createStack( node, prev ) {
  return {
    node: node,
    index: 0,
    prev: prev
  };
}

function returnDone() {
  return { value: undefined, done: true };
}

function returnValue( key, value, type ) {
  return {
    value: type === ITERATE_ENTRIES ? [ key, value ] : type === ITERATE_KEYS ? key : value,
    done: false
  };
}

var MotaMapIterator = function( map, type, reverse ) {
  this.__type = type === undefined ? ITERATE_ENTRIES : type;
  this.__reverse = reverse;
  this.__stack = map.__root && createStack( map.__root );
};

MotaMapIterator.prototype = {
  constructor: MotaMapIterator,
  next: function() {

    var type = this.__type,
        reverse = this.__reverse,
        stack = this.__stack,
        node, children, index, maxIndex, subNode;

    while ( stack ) {

      node = stack.node;
      children = node.children;
      index = stack.index++;

      if ( children ) {

        maxIndex = children.length - 1;

        if ( index <= maxIndex ) {

          subNode = children[ reverse ? maxIndex - index : index ];

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

    return returnDone();

  },
  toString: function() {
    return "[object MotaMap Iterator]";
  }
};

setBySymbol( MotaMapIterator.prototype, "iterator", function() {
  return this;
} );

var NOTHING = {};

function update( self, key, updater, silent ) {

  var isMutable = self.isMutable(),
      value, remove, map, change, changes;

  map = isMutable ? self : makeMap();
  map.__root = alter( self.__root, map.__owner, 0, undefined, key, updater );

  if ( !updater.changeValue ) {
    return self;
  }

  value = updater.value;
  remove = value === updater.notSetValue;

  map.size = self.size + ( updater.changeSize ? remove ? -1 : 1 : 0 );

  if ( !map.size && !isMutable ) {
    return EMPTY_MAP;
  }

  if ( isMutable && silent !== INIT ) {

    change = {
      type: remove ? "delete" : updater.changeSize ? "add" : "update"
    };

    change.key = change.name = key;

    if ( remove ) {

      change.oldValue = updater.oldValue;

    } else {

      change.value = change.newValue = value;

      if ( !updater.changeSize ) {
        change.oldValue = updater.oldValue;
      }

    }

    changes = self.__changes;

    if ( !changes ) {
      changes = self.__changes = [];
    }

    changes.push( change );

    if ( !silent ) {
      self.__triggerChangeEvent();
    }

  }

  return map;

}

var prototype = {

  get: function( key, notSetValue ) {
    var root = this.__root;
    return !root ? notSetValue : root.lookup( 0, undefined, key, notSetValue );
  },

  has: function( key ) {
    return NOTHING !== this.get( key, NOTHING );
  },

  set: function( key, value ) {
    var updater = MotaMapUpdater( undefined, NOTHING );
    updater.value = value;
    return update( this, key, updater );
  },

  remove: function( key ) {
    var updater = MotaMapUpdater( undefined, NOTHING );
    updater.value = NOTHING;
    return update( this, key, updater );
  },

  update: function( key, func, notSetValue ) {
    return update( this, key, MotaMapUpdater( func, notSetValue ) );
  },

  __triggerChangeEvent: function() {

    if ( this.isMutable() ) {

      var changes = this.__changes;
      this.__changes = [];

      if ( changes && changes.length ) {
        this.trigger( "change", changes );
        return true;
      }

    }

    return false;

  },

  clear: function() {

    if ( this.isImmutable() ) {
      return EMPTY_MAP;
    }

    if ( this.hasListeners() ) {

      var changes = this.__changes;

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
    this.__root = undefined;

    this.__triggerChangeEvent();

    return this;

  },

  count: function() {
    return this.size;
  },

  keys: function() {
    return new MotaMapIterator( this, ITERATE_KEYS, false );
  },

  values: function() {
    return new MotaMapIterator( this, ITERATE_VALUES, false );
  },

  entries: function() {
    return new MotaMapIterator( this, ITERATE_ENTRIES, false );
  },

  forEach: function( callback, thisArg ) {

    var iteratee, self = this, i = 0;

    if ( this.size ) {

      iteratee = createIteratee( callback, thisArg );

      this.__root.forEach( function( node ) {
        i++;
        return iteratee( node.value, node.key, self );
      } );

    }

    return i;

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

    var newMap, changed, isArr;

    if ( !obj ) {
      return this;
    }

    if ( this === EMPTY_MAP && isMap( obj ) && obj.isImmutable() ) {
      return obj;
    }

    newMap = this.asMutable();
    changed = false;
    isArr = isArrayLike( obj );

    forEach( obj, function( value, key ) {

      if ( isArr ) {
        key = value[ 0 ];
        value = value[ 1 ];
      }

      var updater = MotaMapUpdater( undefined, NOTHING );
      updater.value = value;

      if ( silent === INIT ) {

        update( newMap, key, updater, silent );

        if ( updater.changeValue ) {
          changed = true;
        }

      } else {

        update( newMap, key, updater, true );

      }

    } );

    if ( changed || newMap.__triggerChangeEvent() ) {
      return newMap === this ? newMap : newMap.asImmutable();
    }

    return this;

  }

};

prototype[ MAP_SENTINEL ] = true;
prototype.pairs = prototype.entries;
prototype.unset = prototype.delete = prototype.remove;

function isMap( obj ) {
  return !!( obj && obj[ MAP_SENTINEL ] );
}

function MotaMap( obj ) {
  if ( obj === INIT ) {
    return this;
  }
  return makeMap( true, 0, undefined ).merge( obj, INIT );
}

function MotaImmutableMap( obj ) {
  if ( obj === INIT ) {
    return this;
  }
  return EMPTY_MAP.merge( obj, INIT );
}

MotaMap.isMap = isMap;
MotaImmutableMap.isMap = isMap;

function extendProto( proto, obj ) {
  extend( proto, obj );
  setBySymbol( proto, "get", obj.get );
  setBySymbol( proto, "iterator", obj.entries );
}

extendProto( MotaMap.prototype, prototype );
extendProto( MotaImmutableMap.prototype, prototype );

// Add event functions to mutable maps
extend( MotaMap.prototype, Events );

function makeMap( mutable, size, root ) {
  var map = mutable ? new MotaMap( INIT ) : new MotaImmutableMap( INIT );
  map.size = size || 0;
  map.__root = root;
  if ( mutable ) {
    map.__owner = {};
  }
  return map;
}

var EMPTY_MAP = makeMap( false, 0, undefined );

function defineProp( obj, name, value, enumerable ) {
  Object.defineProperty( obj, name, {
    configurable: false,
    enumerable: enumerable,
    value: value,
    writable: false
  } );
}

function mota() {}

defineProp( mota, "VERSION", "0.10.1", true );
defineProp( mota, "true", true, false );
defineProp( mota, "developmentMode", true, false );

utilities.hashCode = hash;

utilities.extend( mota, utilities, {
  Events: Events,
  Map: MotaMap,
  ImmutableMap: MotaImmutableMap,
  path: MotaPath,
  Promise: MotaPromise,
  Router: MotaRouter,
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
