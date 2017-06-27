/*!
 * MotaJS v0.14.0
 * http://jdmota.github.io/motajs/
 *
 * Released under the MIT license
 * https://github.com/jdmota/MotaJS/blob/master/LICENSE.md
 *
 * Project
 * https://github.com/jdmota/MotaJS
 *
 * Date: 2016-05-23T18:18Z
 */
( function() {

var nativeObject = Object;

function checkGlobal( value ) {
  return ( value && value.Object === nativeObject ) ? value : null;
}

var freeExports = typeof exports == "object" && exports;

var freeModule = freeExports && typeof module == "object" && module;

var freeGlobal = checkGlobal( typeof global == "object" && global );

var isEnvNode = !!freeGlobal;

var freeSelf = checkGlobal( typeof self == "object" && self );

var freeWindow = checkGlobal( typeof window == "object" && window );

var thisGlobal = checkGlobal( typeof this == "object" && this );

/* eslint no-new-func: 0 */
var root = freeGlobal || freeSelf || thisGlobal || Function( "return this" )();

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

var toString = ( {} ).toString;

function sliceArgs( arr, k ) {
  var newArr = [], i = 0, j = i + k;
  for ( ; j < arr.length; i++, j++ ) {
    newArr[ i ] = arr[ j ];
  }
  return newArr;
}

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

function createObj( proto ) {
  return isObjectLike( proto ) ? ObjectCreate( proto ) : {};
}

function createCtorWrapper( Ctor ) {
  return function() {
    var a = arguments;

    switch ( a.length ) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor( a[ 0 ] );
      case 2:
        return new Ctor( a[ 0 ], a[ 1 ] );
      case 3:
        return new Ctor( a[ 0 ], a[ 1 ], a[ 2 ] );
      case 4:
        return new Ctor( a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ] );
      case 5:
        return new Ctor( a[ 0 ], a[ 1 ], a[ 2 ], a[ 3 ], a[ 4 ] );
      default:
    }

    var self = createObj( Ctor.prototype );
    var result = apply( Ctor, self, a );

    // Mimic the constructor's `return` behavior
    // See https://es5.github.io/#x13.2.2 for more details
    return isObjectLike( result ) ? result : self;
  };
}

function bind( func, thisArg ) {

  var partials, fBound;
  var Ctor = createCtorWrapper( func );

  if ( arguments.length < 3 ) {

    fBound = function() {
      var fn = ( this && this instanceof fBound ) ? Ctor : func;
      return apply( fn, thisArg, sliceArgs( arguments, 0 ) );
    };

  } else {

    partials = sliceArgs( arguments, 2 );

    fBound = function() {

      var args = sliceArgs( partials, 0 );
      var offset = args.length;

      for ( var i = 0; i < arguments.length; i++ ) {
        args[ i + offset ] = arguments[ i ];
      }

      var fn = ( this && this instanceof fBound ) ? Ctor : func;

      return apply( fn, thisArg, args );
    };

  }

  return fBound;

}

function assertFunction( f ) {
  if ( !isFunction( f ) ) {
    throw new TypeError( "Expected a function" );
  }
}

function once( fn ) {
  var called = false, result, func = fn;
  assertFunction( func );
  return function() {
    if ( !called ) {
      called = true;
      result = apply( func, this, sliceArgs( arguments, 0 ) );
      func = undefined;
    }
    return result;
  };
}

function warn( funcName, msg ) {
  if ( typeof console !== "undefined" ) {
    console.error( funcName + " WARNS: " + msg );
  }
}

function deprecated( funcName, msg ) {
  return once( bind( warn, null, funcName, msg || "This function is deprecated." ) );
}

var win = freeWindow;
var doc = win && win.document;

var getWindow = function() {
  return win;
};

var getDocument = function() {
  return doc;
};

var setWindow = function( o ) {
  if ( !isWindow( o ) ) {
    if ( true ) {
      warn( "mota.setWindow", "Please provide a correct window object." );
    }
    return;
  }
  win = o;
  doc = o.document;
};

var hasOwn = {}.hasOwnProperty;
var nativeKeys = Object.keys;
var nativeIsFinite = isFinite;

var symbolProto = typeof Symbol != "undefined" && Symbol ? Symbol.prototype : undefined;

var symbolToString = symbolProto ? symbolProto.toString : undefined;

var nativeGetPrototype = Object.getPrototypeOf;

function getPrototype( obj ) {
  return nativeGetPrototype( Object( obj ) );
}

function has( obj, key ) {
  return obj != null && ( obj.hasOwnProperty === hasOwn ) ? obj.hasOwnProperty( key ) : hasOwn.call( obj, key );
}

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

function motaType( obj ) {
  var type = typeof obj;
  if ( type === "object" || type === "function" ) {
    return obj === null ? "null" : types[ toString.call( obj ) ] || "object";
  }
  return type;
}

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

function isArguments( obj ) {
  return toString.call( obj ) === "[object Arguments]";
}

var isArray = Array.isArray;

var MAX_SAFE_INTEGER = Math.pow( 2, 53 ) - 1;

function isArrayLike( obj ) {

  var length;

  if ( isArray( obj ) ) {
    return true;
  }

  if ( !isObjectLike( obj ) || isFunction( obj ) || isWindow( obj ) ) {
    return false;
  }

  // Ref: http://stackoverflow.com/questions/28155841/misterious-failure-of-jquery-each-and-underscore-each-on-ios
  length = "length" in obj && obj.length;

  return typeof length == "number" && length > -1 && length % 1 == 0 && length <= MAX_SAFE_INTEGER;

}

function isBoolean( obj ) {
  return obj === true || obj === false || motaType( obj ) === "boolean";
}

function isDate( obj ) {
  return motaType( obj ) === "date";
}

var strDoc = "[object HTMLDocument]";
var strDoc2 = "[object Document]";

function isDocument( obj ) {

  var defaultView, doc = getDocument();

  if ( doc && obj === doc ) {
    return true;
  }

  if ( !obj || obj.parentNode !== null || !( defaultView = obj.defaultView ) ) {
    return false;
  }

  // The server side should be safe
  // but with the browser, we need to check the [[Class]] name

  if ( isEnvNode ) {
    return isWindow( defaultView );
  }

  var className = toString.call( obj );
  return className === strDoc || className === strDoc2;

}

function isElement( obj ) {
  return !!obj && obj.nodeType === 1 && typeof obj == "object" && !isPlainObject( obj );
}

function isEmpty( obj ) {
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
}

function isError( obj ) {
  return motaType( obj ) === "error";
}

function motaIsFinite( obj ) {
  return isNumber( obj ) && nativeIsFinite( obj );
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

function motaIsNaN( obj ) {
  /* eslint eqeqeq: 0 */
  return isNumber( obj ) && obj != +obj;
}

function isNil( obj ) {
  return obj == null;
}

function isNull( obj ) {
  return obj === null;
}

function isNumber( obj ) {
  return motaType( obj ) === "number";
}

function isObject( obj ) {
  return motaType( obj ) === "object";
}

function isObjectLike( obj ) {
  var type;
  return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
}

var funcToString = Function.prototype.toString;
var objectCtorString = funcToString.call( Object );

function isPlainObject( obj ) {

  var proto, Ctor;

  if ( !isObject( obj ) ) {
    return false;
  }

  proto = getPrototype( obj );

  if ( proto === null ) {
    return true;
  }

  Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;

  return (
    typeof Ctor == "function" &&
    Ctor instanceof Ctor &&
    funcToString.call( Ctor ) === objectCtorString
  );

}

function isRegExp( obj ) {
  return motaType( obj ) === "regexp";
}

function isString( obj ) {
  return motaType( obj ) === "string";
}

function isSymbol( obj ) {
  return motaType( obj ) === "symbol";
}

function isUndefined( obj ) {
  return obj === undefined;
}

var strWin = "[object Window]";
var strWin2 = "[object global]"; // Chrome & Opera (and Safari?) + Node

function isWindow( obj ) {

  if ( obj === root ) {
    return true;
  }

  if ( !obj || typeof obj !== "object" ) {
    return false;
  }

  if ( !isEnvNode && obj.window !== obj ) {
    return false;
  }

  var className = toString.call( obj );

  return className === strWin || className === strWin2;

}

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

function createAssigner( assigner, _in, hasCustomizer ) {

  return function( target ) {

    var output = Object( target );
    var len = hasCustomizer ? arguments.length - 1 : arguments.length;
    var customizer = hasCustomizer ? arguments[ len ] : undefined;

    if ( hasCustomizer && typeof customizer !== "function" ) {
      customizer = undefined;
      len++;
    }

    for ( var i = 1; i < len; i++ ) {
      var source = arguments[ i ];
      // Ignore null or undefined sources and prevent infinite loop
      if ( source != null && source !== output ) {
        for ( var key in source ) {
          if ( _in || hasOwn.call( source, key ) ) {
            assigner( output, source, key, customizer );
          }
        }
      }
    }

    return output;

  };

}

function baseSet( target, source, key ) {
  target[ key ] = source[ key ];
}

function baseSetWithCustomizer( target, source, key, customizer ) {
  target[ key ] = customizer ? customizer( target[ key ], source[ key ], key, target, source ) : source[ key ];
}

var assign = createAssigner( baseSet, false, false );

var assignIn = createAssigner( baseSet, true, false );

var assignInWith = createAssigner( baseSetWithCustomizer, true, true );

var assignWith = createAssigner( baseSetWithCustomizer, false, true );

var warning$1 = deprecated( "mota.extend" );

// BASED ON jQuery
function extend( target ) {

  var options, name, src, copy, copyType, clone,
      i = 1,
      len = arguments.length,
      deep = false;

  if ( true ) {
    warning$1();
  }

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

}

var warning = deprecated( "mota.classExtend" );

function classExtend( protoProps, staticProps, optionalNew ) {

  var parent = this, Child, constructor;

  if ( true ) {
    warning();
  }

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

}

var ArrayProto = [];

var slice = ArrayProto.slice;

var warning$2 = deprecated( "mota.clone" );

function clone( target ) {

  var deep, Cotr, result;

  // Handle a deep cloning situation
  if ( target === true && has( arguments, 1 ) ) {
    deep = target;

    // Skip the boolean
    target = arguments[ 1 ];

    if ( true ) {
      warning$2();
    }

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

}

var defaults = createAssigner( function( target, source, key ) {
  if ( target[ key ] === undefined ) {
    target[ key ] = source[ key ];
  }
}, false, false );

function entries( obj ) {

  if ( obj == null ) {
    return [];
  }

  var object = Object( obj );
  var entries = [];

  for ( var key in object ) {
    if ( hasOwn.call( object, key ) ) {
      entries.push( [ key, object[ key ] ] );
    }
  }

  return entries;

}

function entriesIn( obj ) {

  if ( obj == null ) {
    return [];
  }

  var object = Object( obj );
  var entries = [];

  for ( var key in object ) {
    entries.push( [ key, object[ key ] ] );
  }

  return entries;

}

function eq( a, b ) {
  /* eslint no-self-compare: 0 */
  return a === b || ( a !== a && b !== b );
}

function err( funcName, msg ) {
  throw new Error( funcName + " ERROR: " + msg );
}

function baseToString( value ) {
  if ( typeof value == "string" ) {
    return value;
  }
  if ( isSymbol( value ) ) {
    return symbolToString ? symbolToString.call( value ) : "";
  }
  var result = value + "";
  return ( result === "0" && ( 1 / value ) === -Infinity ) ? "-0" : result;
}

function toString$1( value ) {
  return value == null ? "" : baseToString( value );
}

var reUnescapedHtml = /[&<>"'`]/g;
var reHasUnescapedHtml = new RegExp( reUnescapedHtml.source );

var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
  "`": "&#96;"
};

function escapeHtmlChar( c ) {
  return htmlEscapes[ c ];
}

function escape( str ) {
  var string = toString$1( str );
  return ( string && reHasUnescapedHtml.test( string ) ) ? string.replace( reUnescapedHtml, escapeHtmlChar ) : string;
}

var reRegExpChar = /[\\.+*?=^!:${}()[\]|\/]/g;

var reHasRegExpChar = new RegExp( reRegExpChar.source );

function escapeRegExp( str ) {
  var string = toString$1( str );
  return ( string && reHasRegExpChar.test( string ) ) ? string.replace( reRegExpChar, "\\$&" ) : string;
}

function getSpecies( fn ) {
  return getBySymbol( fn, "species" ) || fn;
}

var ObjProp = Object.defineProperty;
var SYMBOL_SUPPORT = typeof Symbol === "function" && !( isEnvNode && /^v0/.test( process.version ) );

var EXPANDO = ( SYMBOL_SUPPORT && Symbol( "mota internal" ) ) ||
  ( "__mota__" + Math.random() ).replace( /0\./g, "" );

function InternalData() {
  this.view = null;
  this.events = null;
}
InternalData.prototype = Object.create( null );

var Data = {

  setup: function( obj, name, value, optimize ) {
    var data = obj[ EXPANDO ];
    if ( !data ) {
      data = new InternalData();
      if ( optimize || SYMBOL_SUPPORT ) {
        obj[ EXPANDO ] = data;
      } else {

        // Non-enumerable property
        ObjProp( obj, EXPANDO, { writable: true, value: data } );
      }
    }
    return data[ name ] ? data[ name ] : ( data[ name ] = value );
  },

  get: function( obj, name ) {
    var data = obj[ EXPANDO ];
    return data && data[ name ];
  },

  remove: function( obj, name ) {
    var data = obj[ EXPANDO ];
    if ( data ) {
      data[ name ] = null;
    }
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
    if ( !nativeIsFinite( o ) ) {
      return o > 0 ? 1 : -1;
    }
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

  if ( typeof o.hashCode === "function" ) {
    return o.hashCode();
  }

  h = objHashUID++;
  if ( objHashUID & 1073741824 ) {
    objHashUID = 1;
  }

  Data.setup( o, "hash", h );

  return h;

}

function identity( v ) {
  return v;
}

function is( a, b ) {

  if ( eq( a, b ) ) {
    return true;
  }

  if ( !a || !b ) {
    return false;
  }

  if ( isFunction( a.valueOf ) && isFunction( b.valueOf ) ) {
    a = a.valueOf();
    b = b.valueOf();
    if ( eq( a, b ) ) {
      return true;
    }
    if ( !a || !b ) {
      return false;
    }
  }

  return isFunction( a.equals ) && isFunction( b.equals ) && a.equals( b );
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

function keyIn( obj ) {

  if ( obj == null ) {
    return [];
  }

  var object = Object( obj );

  var key, keys = [];

  for ( key in object ) {
    keys.push( key );
  }

  return keys;

}

var warning$3 = deprecated( "mota.keys", "The boolean flag is deprecated." );

function motaKeys( obj, _in ) {

  if ( obj == null ) {
    return [];
  }

  if ( true ) {
    if ( _in ) {
      warning$3();
    }
  }

  return _in ? keyIn( obj ) : nativeKeys( Object( obj ) );

}

var eq$1 = function( a, b, aStack, bStack ) {

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
      if ( !( eq$1( a[ length ], b[ length ], aStack, bStack ) ) ) {
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
      if ( !( has( b, key ) && eq$1( a[ key ], b[ key ], aStack, bStack ) ) ) {
        return false;
      }
    }

  }

  aStack.pop();
  bStack.pop();

  return true;

};

function isEqual( a, b ) {
  return eq$1( a, b );
}

function log( funcName, msg ) {
  if ( typeof console !== "undefined" ) {
    console.log( funcName + " LOG: " + msg );
  }
}

function mixinHelper( funcs, original ) {

  return function() {
    for ( var i = 0; i < funcs.length; i++ ) {
      apply( funcs[ i ], this, arguments );
    }
    return apply( original, this, arguments );
  };

}

function mixin( clazz, args ) {

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

}

var _mota = root.mota;

function noConflict() {
  if ( _mota && root.mota === this ) {
    root.mota = _mota;
  }
  return this;
}

function noop() {}

var warning$4 = deprecated( "mota.noPartial" );

function noPartial( func, context ) {
  if ( true ) {
    warning$4();
  }
  return function() {
    return apply( func, context, sliceArgs( arguments, 0 ) );
  };
}

var runAsync = ( function() {

  if (
    typeof process === "object" &&
    process.nextTick &&
    process.toString() === "[object process]"
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

var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g;
var reHasEscapedHtml = new RegExp( reEscapedHtml.source );

var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\"",
  "&#39;": "'",
  "&#96;": "`"
};

function unescapeHtmlChar( c ) {
  return htmlUnescapes[ c ];
}

function unescape( str ) {
  var string = toString$1( str );
  return ( string && reHasEscapedHtml.test( string ) ) ? string.replace( reEscapedHtml, unescapeHtmlChar ) : string;
}

var ids = {};

function uniqueId( p ) {
  var prefix = toString$1( p );
  if ( !ids[ prefix ] ) {
    ids[ prefix ] = 0;
  }
  return prefix + ( ++ids[ prefix ] );
}

function validate( obj, propTypes ) {

  var prop, rule;

  for ( prop in propTypes ) {

    rule = propTypes[ prop ];

    if ( rule && !rule( obj[ prop ], prop, obj ) ) {
      return false;
    }

  }

  return true;

}

function values( obj ) {

  if ( obj == null ) {
    return [];
  }

  var object = Object( obj );
  var values = [];

  for ( var key in object ) {
    if ( hasOwn.call( object, key ) ) {
      values.push( object[ key ] );
    }
  }

  return values;
}

function valuesIn( obj ) {

  if ( obj == null ) {
    return [];
  }

  var object = Object( obj );
  var values = [];

  for ( var key in object ) {
    values.push( object[ key ] );
  }

  return values;
}

var utilities = {
  apply: apply,
  assign: assign,
  assignIn: assignIn,
  assignInWith: assignInWith,
  assignWith: assignWith,
  bind: bind,
  classExtend: classExtend,
  clone: clone,
  defaults: defaults,
  entries: entries,
  entriesIn: entriesIn,
  eq: eq,
  err: err,
  escape: escape,
  escapeRegExp: escapeRegExp,
  extend: extend,
  getSpecies: getSpecies,
  has: has,
  hashCode: hashCode,
  identity: identity,
  is: is,
  isArguments: isArguments,
  isArray: isArray,
  isArrayLike: isArrayLike,
  isAssociative: isAssociative,
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
  isNaN: motaIsNaN,
  isNil: isNil,
  isNull: isNull,
  isNumber: isNumber,
  isObject: isObject,
  isObjectLike: isObjectLike,
  isPlainObject: isPlainObject,
  isRegExp: isRegExp,
  isString: isString,
  isSymbol: isSymbol,
  isUndefined: isUndefined,
  isWindow: isWindow,
  keys: motaKeys,
  keysIn: keyIn,
  log: log,
  mixin: mixin,
  noConflict: noConflict,
  noop: noop,
  noPartial: noPartial,
  once: once,
  runAsync: runAsync,
  pairs: entries, // Alias
  toString: toString$1,
  type: motaType,
  unescape: unescape,
  uniqueId: uniqueId,
  validate: validate,
  values: values,
  valuesIn: valuesIn,
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
      if ( callback( list[ i ] ) === false ) {
        break;
      }
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
      !type || baseEqual( thisListener.type, type ) === true ||
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

EventListenerList.prototype = assign( {

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

  var i, eventListenerList, listeners, listener, results, count = 0;

  if ( !object ) {
    return count;
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

    count = results.length;

    if ( callback ) {
      for ( i = 0; i < count; i++ ) {
        if ( callback( object, eventListenerList, results[ i ], arg ) === false ) {
          break;
        }
      }
    }

  }

  return count;

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

var hasListeners = function( eventType, handler, context ) {
  var count = eventsApi( this, "getFirst", undefined, [ eventType, handler, context ] );
  return count > 0;
};

var eventsApiOff = function( object, eventListenerList, data ) {
  var listener = data.listener;

  // Edge case: unbind a callback in the midst of its firing
  listener.handler = undefined;

  eventListenerList.remove( listener );
};

var off = function( eventType, handler, context ) {
  eventsApi( this, "off", eventsApiOff, [ eventType, handler, context ] );
  return this;
};

var now = Date.now;

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
var reKeyEvent = /^key/;
var rePointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/;
var eventTypes = {
      mousewheel: "wheel",
      DOMMouseScroll: "whell"
    };
var hooks = {
  which: function( e ) {

    /* eslint no-nested-ternary: 0 */

    if ( rePointerEvent.test( e.type ) ) {

      var button = e.button;

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      return !e.which && button !== undefined ?
        button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) :
        e.which;
    }

    if ( reKeyEvent.test( e.type ) ) {
      return e.which == null ? e.charCode == null ? e.keyCode : e.charCode : e.which;
    }

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
    this.originalEvent.stopPropagation();
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = true;
    this.stopPropagation();
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

  event.currentTarget = object;

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
      i = 0;

  updaterStartIgnore();

  while ( i < path.length && !event.isPropagationStopped ) {

    eventsApi( path[ i ], "trigger", forEachEventListener, [ type ], event );

    if ( !event.bubbles ) {
      break;
    }

    i++;

  }

  updaterEndIgnore();

};

var allEventTypes = {};

function shouldRegisterEvent( el ) {
  return ( el.nodeType && el.nodeType !== 3 ) || el === el.window;
}

var events = {
  dispatchEvents: dispatchEvents,
  register: function( el, name ) {

    if ( allEventTypes[ name ] || !shouldRegisterEvent( el ) ) {
      return;
    }

    var ownerDoc = el.ownerDocument;
    var win = ( ownerDoc && ownerDoc.defaultView ) || getWindow();

    if (
      win &&
      win.addEventListener &&
      ( ( "on" + name ) in win || rePointerEvent.test( name ) )
    ) {

      // To listen all events (even those that don't bubble),
      // add the event listener to `window` in the capture phase
      win.addEventListener( name, dispatchEvents, true );

      allEventTypes[ name ] = true;

    }

  }
};

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

  events.register( object, listener.type );

};

var on = function( eventType, handler, context, once ) {
  eventsApi( this, "on", eventsApiOn, [ eventType, handler, context ], once );
  return this;
};

var once$1 = function( eventType, handler, context ) {
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
  eventsApi( this, "trigger", eventsApiTrigger, [ eventType ], sliceArgs( arguments, 1 ) );
  return this;
};

var Events = {
  getListeners: getListeners,
  getMaxListeners: getMaxListeners,
  hasListeners: hasListeners,
  off: off,
  on: on,
  once: once$1,
  setMaxListeners: setMaxListeners,
  trigger: trigger
};

function History( router, callback ) {

  this.router = router;

  this.window = freeWindow;
  this.document = freeWindow && freeWindow.document;
  this.history = freeWindow && freeWindow.history;
  // Just keep support for HTML5-History-API polyfill
  this.location = ( this.history && this.history.location ) || ( freeWindow && freeWindow.location );

  this._started = false;
  this.fragment = "/";

  this.callback = callback || noop;

}

History.prototype = {

  constructor: History,

  getFragment: function() {
    var l = this.location;
    return ( this.fragment = l.pathname + l.search + l.hash );
  },

  triggerRoutes: function( path ) {
    if ( this.router ) {
      this.router.handle( { url: path, method: "GET" }, {}, this.callback );
    }
  },

  checkUrl: function() {
    this.triggerRoutes( this.getFragment() );
  },

  start: function() {
    if ( this.window && !this._started ) {
      this._started = true;
      this.checkUrl();
      Events.on.call( this.window, "popstate", this.checkUrl, this );
    }
  },

  stop: function() {
    if ( this._started ) {
      this._started = false;
      Events.off.call( this.window, "popstate", this.checkUrl, this );
    }
  },

  _nav: function( path, replace ) {
    if ( this._started && this.fragment !== path ) {
      this.fragment = path;
      if ( replace ) {
        this.history.replaceState( {}, this.document.title, path );
      } else {
        this.history.pushState( {}, this.document.title, path );
      }
      this.triggerRoutes( path );
    }
  },

  navigate: function( path ) {
    this._nav( path, false );
  },

  replace: function( path ) {
    this._nav( path, true );
  },

  go: function( v ) {
    this.history.go( v );
  },

  back: function() {
    this.history.back();
  },

  forward: function() {
    this.history.forward();
  }

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
    return false;
  },

  get: function( key, _hash, shift, notSetValue ) {

    var hash = _hash === undefined ? hashCode( key ) : _hash;

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
        return null;
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
    var children = this.children;
    var list = new List( owner );
    var listChildren = list.children;
    for ( var i = 0; i < children.length; i++ ) {
      listChildren[ i ] = children[ i ];
    }
    listChildren[ idx ] = newNode;
    return list;
  },

  cloneSpliceOut: function( owner, idx ) {

    var children = this.children;
    var newLen = children.length - 1;
    var i = 0;

    if ( owner && this.owner === owner ) {
      for ( i = idx; i < newLen; i++ ) {
        children[ i ] = children[ i + 1 ];
      }
      children.pop();
      return this;
    }

    var list = new List( owner );
    var listChildren = list.children;

    for ( ; i < idx; i++ ) {
      listChildren[ i ] = children[ i ];
    }

    for ( ; i < newLen; i++ ) {
      listChildren[ i ] = children[ i + 1 ];
    }

    return list;
  },

  cloneSpliceIn: function( owner, idx, newNode ) {

    var children = this.children;
    var newLen = children.length + 1;
    var i = 0;

    if ( owner && this.owner === owner ) {
      for ( i = newLen - 1; i > idx; i-- ) {
        children[ i ] = children[ i - 1 ];
      }
      children[ idx ] = newNode;
      return this;
    }

    var list = new List( owner );
    var listChildren = list.children;

    for ( ; i < idx; i++ ) {
      listChildren[ i ] = children[ i ];
    }

    listChildren[ i++ ] = newNode;

    for ( ; i < newLen; i++ ) {
      listChildren[ i ] = children[ i - 1 ];
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
    return false;
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
            return null;
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
          return null;
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

function hasListeners$1( map ) {
  var list = Data.get( map, "events" );
  return !!( list && list.length() );
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
    map.__hash = undefined;
  } else {
    map = makeMap( false, newSize, root );
  }

  if ( owner && !silent && hasListeners$1( map ) ) {

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
    var iteratee;
    if ( this.size ) {
      iteratee = createIteratee( callback, thisArg );
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

    if ( hasListeners$1( this ) ) {
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
  },

  hashCode: function() {

    if ( this.__hash !== undefined ) {
      return this.__hash;
    }

    var h = 0;

    this.__root.loop( function( v, k ) {
      h = h + hashMerge( hashCode( v ), hashCode( k ) ) | 0;
    } );

    h = murmurHashOfSize( h, this.size );

    this.__hash = h;

    return h;

  },

  equals: function( other ) {

    if ( this === other ) {
      return true;
    }

    if ( !other || !isMap( other ) || this.size !== other.size ) {
      return false;
    }

    if ( this.size === 0 ) {
      return true;
    }

    if ( this.__hash !== undefined && other.__hash !== undefined && this.__hash !== other.__hash ) {
      return false;
    }

    var equal = true;
    var notSetValue = NOT_SET;

    this.__root.loop( function( value, key ) {

      var bValue = other.get( key, notSetValue );

      if ( bValue === notSetValue || !is( value, bValue ) ) {
        equal = false;
      }

      return !equal;

    } );

    return equal;

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
  if ( obj === INIT ) {
    this.__root = null;
    this.__owner = null;
    this.__changes = null;
    this.__hash = undefined;
    this.size = 0;
    return this;
  }
  return makeMap( true, 0, null ).merge( obj, INIT );
}

function ImmutableMap( obj ) {
  if ( obj === INIT ) {
    this.__root = null;
    this.__owner = null;
    this.__hash = undefined;
    this.size = 0;
    return this;
  }
  return EMPTY_MAP.merge( obj, INIT );
}

Map.isMap = isMap;
ImmutableMap.isMap = isMap;

Map.prototype = new Proto();
ImmutableMap.prototype = new Proto();

// Add event functions to mutable maps
assign( Map.prototype, Events );

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

var ObjProp$1 = Object.defineProperty;
var addNotEnumProp = function( obj, name, value ) {
  ObjProp$1( obj, name, {
    writable: true,
    configurable: true,
    value: value
  } );
};

function SmartQueue() {
  this.first = null;
  this.last = null;
}

SmartQueue.prototype = {

  constructor: SmartQueue,

  push: function( elem ) {
    if ( this.last ) {
      this.last.__next = elem;
    } else {
      this.first = elem;
    }
    this.last = elem;
  },

  isEmpty: function() {
    return this.first == null;
  },

  shift: function() {
    var elem = this.first;
    this.first = elem && elem.__next || null;
    if ( this.first ) {
      elem.__next = undefined; // Prevent memory leak
    }
    if ( this.last === elem ) {
      this.last = null;
    }
    return elem;
  }

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
    !isValidState( state )
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

function _process( self ) {

  var queue = self.queue;

  if ( self.state === PENDING$1 || queue.isEmpty() ) {
    return;
  }

  runAsync( function() {

    while ( !queue.isEmpty() ) {

      var queuedPromise = queue.shift(),
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

// Based on https://github.com/abdulapopoola/Adehun/blob/master/adehun.js
// Also includes some es6 extensions

function fulfillFallBack( value ) {
  return value;
}

function rejectFallBack( reason ) {
  throw reason;
}

function MotaPromise( fn ) {

  var self = this;

  this.value = null;
  this.state = PENDING$1;
  this.queue = new SmartQueue();
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

}

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

MotaPromise.resolve = function( value ) {
  return new MotaPromise( function( resolve ) {
    resolve( value );
  } );
};

MotaPromise.reject = function( reason ) {
  return new MotaPromise( function( resolve, reject ) {
    reject( reason );
  } );
};

MotaPromise.defer = function() {
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

// Alias
MotaPromise.resolved = MotaPromise.resolve;
MotaPromise.rejected = MotaPromise.reject;
MotaPromise.deferred = MotaPromise.defer;

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
      resolve( result );
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

  var observer, cancel, error;

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

          error = new TypeError( cancel + " is not a function" );

        }

      }

    } catch ( e ) {
      error = e;
    }

    if ( error ) {
      return observer.error( error );
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
    var result, handler, error, sub = this.subscriber;
    if ( this._done ) {
      throw reason;
    } else {
      this._done = true;
      try {
        handler = getMethod( sub.error );
        if ( handler ) {
          result = handler.call( sub, reason );
        } else {
          error = reason;
        }
      } catch ( e ) {
        error = e;
      }
      cleanup( this, error );
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

var Observable = function( _subscriber ) {
  if ( !isFunction( _subscriber ) ) {
    throw new TypeError( "Observable initializer must be a function" );
  }
  this._subscriber = _subscriber;
};

var proto = Observable.prototype;

addNotEnumProp( proto, "lift", function( operator ) {
  var source = this;
  var C = getSpecies( this.constructor );
  return new C( function( observer ) {
    return source.subscribe( operator.call( observer ) );
  } );
} );

addNotEnumProp( proto, "subscribe", function( observer ) {
  return new Subscription( observer, this._subscriber );
} );

addNotEnumProp( proto, "toPromise", function() {
  var self = this;
  return new MotaPromise( function( resolve, reject ) {
    self.subscribe( {
      complete: resolve,
      error: reject
    } );
  } );
} );

addNotEnumProp( proto, "forEach", function( fn ) {
  var self = this;
  var thisArg = arguments[ 1 ];
  return new MotaPromise( function( resolve, reject ) {

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

addNotEnumProp( Observable, "from", function( x ) {

  var C = isFunction( this ) ? this : Observable;

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

      var error;

      try {

        if ( isIterable( x ) ) {
          forEach( x, function( item ) {
            if ( done ) {
              return forEach.BREAK;
            }
            observer.next( item );
          } );
        } else {
          error = new Error( x + " is not an Array or Iterable" );
        }

      } catch ( e ) {
        error = e;
      }

      if ( error ) {
        observer.error( error );
      } else {
        observer.complete();
      }

    } );

    return function() {
      done = true;
    };

  } );

} );

addNotEnumProp( Observable, "of", function() {
  var items = arguments;
  var C = isFunction( this ) ? this : Observable;
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

Object.defineProperty( Observable, getSymbol( "species" ), {
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

Multicast.prototype = assign( ObjectCreate( Observable.prototype ), {

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

setBySymbol( Multicast, "species", Observable );

addNotEnumProp( Observable.prototype, "multicast", function( options ) {
  return new Multicast( this, options );
} );

var reClean = /^\/+|\/+$/;
var SLASH_CODE = 47; // "/"

function assertPath( path ) {
  if ( !isString( path ) ) {
    throw new TypeError( "Path must be a string." );
  }
}

// Assume that `p` is a string
function isAbs( p ) {
  return p.charCodeAt( 0 ) === SLASH_CODE;
}

function isAbsolute( p ) {
  assertPath( p );
  return isAbs( p );
}

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

// Assume that `p` is a string
var normalizePre = memoizeStringOnly( function( pathname ) {
  if ( !pathname ) {
    return ".";
  }
  var urlIsAbs = isAbs( pathname ) ? "/" : "";
  var urlArr = pathname.replace( reClean, "/" ).split( "/" );
  return urlIsAbs + normalizeArr( urlArr, !urlIsAbs ).join( "/" );
} );

function normalize( pathname ) {
  assertPath( pathname );
  return normalizePre( pathname );
}

var createReExt = memoizeStringOnly( function( ext ) {
  return new RegExp( escapeRegExp( ext ) + "$" );
} );

function basename( pathname, ext ) {
  assertPath( pathname );
  if ( !pathname ) {
    return "";
  }
  var urlIsAbs = isAbs( pathname ) ? "/" : "";
  var urlArr = pathname.replace( reClean, "/" ).split( "/" );
  var arr = normalizeArr( urlArr, !urlIsAbs );
  var base = arr.pop();
  return ext ? base.replace( createReExt( ext ), "" ) : base;
}

var dirname = memoizeStringOnly( function( pathname ) {
  assertPath( pathname );
  var urlIsAbs = isAbs( pathname ) ? "/" : "";
  var urlArr = pathname.replace( reClean, "/" ).split( "/" );
  var arr = normalizeArr( urlArr, !urlIsAbs );
  arr.pop();
  return ( urlIsAbs + arr.join( "/" ) ) || ".";
} );

var reExt = /([^\/]*)(\.[^\.\/]*)$/;
var reTrailing = /\/+$/;

function extname( pathname ) {
  assertPath( pathname );
  var m = pathname.replace( reTrailing, "" ).match( reExt );
  return m && m[ 2 ] && m[ 1 ] ? m[ 2 ] : "";
}

function join() {

  var i, arg, paths = [];

  for ( i = 0; i < arguments.length; i++ ) {
    arg = arguments[ i ];
    assertPath( arg );
    if ( arg ) {
      paths.push( arg );
    }
  }

  return normalizePre( paths.join( "/" ) );
}

var nativeDecodeParam = decodeURIComponent;

function match( path, pattern, showNumbers ) {

  assertPath( path );

  var name, i = 0,
      result = null,
      regexp = pattern.regexp,
      names = pattern.names,
      match = path.match( regexp );

  if ( pattern.negated ) {
    return match ? null : {};
  }

  if ( match ) {
    result = {};
    for ( ; i < names.length; i++ ) {
      name = names[ i ];
      if ( showNumbers || typeof name !== "number" ) {
        result[ name ] = match[ i + 1 ] ? nativeDecodeParam( match[ i + 1 ] ) : match[ i + 1 ];
      }
    }
  }

  return result;
}

// Adapted from https://github.com/pillarjs/path-to-regexp

var reNormalize = /\/+$/;
var reEscapeGroup = /([=!:$\/()])/g;

var CUSTOM_MATCH_PARAM = "\\(((?:\\\\.|[^()])+)\\)";

var PATH_REGEXP = new RegExp( [

  "(\\\\.)", // Match escaped characters

  "([\\/])?" + // Match prefix: /
  "(?:" +
      "(" +
          "?:\\:(\\w+)" + // Match name
          "(?:" + CUSTOM_MATCH_PARAM + ")?" + // And custom match parameter
        "|" + // or...
          CUSTOM_MATCH_PARAM + // Match unnamed custom match parameter
      ")" +
      "([+*?])?" + // Match parameter suffix
    "|" +
      "(\\*\\*)" + // Match globstar
    "|" +
      "(\\*)" + // Match asterisk
  ")"

].join( "|" ), "g" );

function escapeGroup( group ) {
  return group ? group.replace( reEscapeGroup, "\\$1" ) : "";
}

var NO_DOT = "(?!\\.)";
var DEFAULT_GROUP = "[^\\/]+?";

function processToken( usePrefix, optional, repeat, pattern, allowDots ) {

  var capture = "(?:" + pattern + ")";
  var prefix = allowDots ? "\\/" : "\\/" + NO_DOT;

  if ( repeat ) {
    capture += "(?:" + prefix + capture + ")*";
  }

  if ( optional ) {
    capture = usePrefix ? "(?:" + prefix + "(" + capture + "))?" : "(" + capture + ")?";
  } else {
    capture = usePrefix ? prefix + "(" + capture + ")" : "(" + capture + ")";
  }

  return capture;
}

function processSegment( str, res, index, allowDots ) {

  var usePrefix, suffix, globstar, asterisk, next, route = "";

  usePrefix = !!res[ 2 ];
  suffix = res[ 6 ];
  globstar = res[ 7 ] || suffix === "*";
  asterisk = res[ 8 ];

  // If the prefix isn't followed by another path segment, don't use it
  if ( usePrefix ) {
    next = str.charCodeAt( index );
    if ( next && next !== SLASH_CODE ) {
      route += "\\/";
      usePrefix = false;
    }
  }

  return route + processToken(
    usePrefix,
    globstar || asterisk || suffix === "?", // Optional
    globstar || suffix === "+", // Repeat
    escapeGroup( res[ 4 ] || res[ 5 ] ) || DEFAULT_GROUP, // Pattern
    allowDots
  );

}

var EXCLAMATION_MARK_CODE = 33;

function pathToRegExp( _str, opts ) {

  var names = [], route = "", key = 0, index = 0, offset = 0, res, escaped;

  var negated = _str.charCodeAt( 0 ) === EXCLAMATION_MARK_CODE;

  var caseSensitive = opts && opts.caseSensitive;
  var end = !opts || opts.end === undefined ? true : opts.end;

  var str = ( negated ? _str.slice( 1 ) : _str ).replace( reNormalize, "" ) || "/";

  if ( str === "/" && !end ) {
    str = "";
  }

  var allowDots = opts && opts.dot;

  while ( ( res = PATH_REGEXP.exec( str ) ) ) {

    offset = res.index;
    route += escapeRegExp( str.slice( index, offset ) );
    index = offset + res[ 0 ].length;

    escaped = res[ 1 ];

    if ( escaped ) {
      route += escaped;
    } else {
      route += processSegment( str, res, index, allowDots );
      names.push( res[ 3 ] || key++ );
    }

  }

  if ( index < str.length ) {
    route += escapeRegExp( str.substr( index ) );
  }

  return {
    regexp: new RegExp( "^" + route + "(?:\/(?=$))?" + ( end ? "$" : "(?=\\/|$)" ), caseSensitive ? "" : "i" ),
    names: names,
    negated: negated
  };
}

function getNames( str ) {
  var res, name, names = [];
  while ( ( res = PATH_REGEXP.exec( str ) ) ) {
    name = res[ 3 ];
    if ( name ) {
      names.push( name );
    }
  }
  return names;
}

function relative( fromPath, toPath ) {

  assertPath( fromPath );
  assertPath( toPath );

  var fromParts, toParts, length, samePartsLength, i, outputParts;

  fromParts = normalizeArr( fromPath.split( "/" ), true );
  toParts = normalizeArr( toPath.split( "/" ), true );

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

}

function resolve() {

  var path, resolved = "", i = arguments.length, abs = false;

  // Start from the end
  while ( i-- && !abs ) {

    path = arguments[ i ];

    assertPath( path );

    if ( path ) {

      // Keep resolving until we find an absolute path
      resolved = resolved ? path + "/" + resolved : path;

      abs = isAbs( resolved );

    }

  }

  return normalizePre( resolved );

}

var pathname = {
  basename: basename,
  dirname: dirname,
  extname: extname,
  isAbsolute: isAbsolute,
  join: join,
  match: match,
  normalize: normalize,
  pathToRegExp: pathToRegExp,
  relative: relative,
  resolve: resolve
};

var DEFAULT_PATH = "/";
var DEFAULT_PATTERN = pathToRegExp( DEFAULT_PATH );
var ALL_METHODS = "allMethods";

var reHash = /#.*$/;
var reSearch = /\?.*$/;
var reUrlLeft = /^(https?|ftp):\/\/[^\/\?#;]+/;

function getPathname( url ) {
  var pathname = url && url.replace( reUrlLeft, "" );
  return pathname ? resolve( "/", pathname.replace( reHash, "" ).replace( reSearch, "" ) ) : "/";
}

function getProtohost( url ) {
  var m = url && url.match( reUrlLeft );
  return ( m && m[ 0 ] ) || "";
}

function MethodMiddleware( method, fn ) {
  this.method = method;
  this.fn = fn;
}

MethodMiddleware.prototype._handle = function( req, fnStack, paramsStack, params ) {

  var reqMethod = req.method.toLowerCase();
  var method = this.method;

  if ( params && ( method === reqMethod || method === ALL_METHODS ) ) {
    fnStack.push( this.fn );
    paramsStack.push( params );
  }

};

function Middleware( router ) {
  this.pattern = DEFAULT_PATTERN;
  this.path = DEFAULT_PATH;
  this.router = router;
  this._runThis = this._run.bind( this );
}

Middleware.prototype = {

  constructor: Middleware,

  _handle: function( req, fnStack, paramsStack ) {

    if ( this.pattern.regexp.test( req.pathname ) ) {
      fnStack.push( this._runThis );
      paramsStack.push( null );
    }

  },

  _run: function( req, res, next ) {

    var prevUrl = req.url;
    var prevPathname = req.pathname;
    var protohost = getProtohost( prevUrl );

    if ( this.path !== "/" ) {
      req.pathname = prevPathname.replace( this.pattern.regexp, "" );
      req.url = protohost + req.pathname + prevUrl.substr( protohost.length + prevPathname.length );
    }

    this.router.handle( req, res, function( err ) {

      req.url = prevUrl; // Restore
      req.pathname = prevPathname; // Restore

      next( err === "leave" ? undefined : err );

    } );

  }

};

function ParamMiddleware( name, fn ) {
  this.fn = function( req, res, next ) {
    var params = req.params;
    if ( params && name in params ) {
      fn( req, res, next, params[ name ] );
    }
  };
}

ParamMiddleware.prototype._handle = function( req, fnStack, paramsStack, params ) {
  fnStack.push( this.fn );
  paramsStack.push( params );
};

function callAndCatchErr( func, req, res, next ) {
  try {
    func( req, res, next );
  } catch ( err ) {
    next( err );
  }
}

function deferOnce( next ) {
  var called = false;
  return function( err ) {
    if ( !called ) {
      called = true;
      runAsync( function() {
        next( err );
        next = undefined;
      } );
    }
  };
}

var reTrimUrl = /^\/*(.*?)\/*$/;

function joinPaths( parent, p ) {
  var path = p ? p.replace( reTrimUrl, "$1" ) : "";
  return path && parent !== "/" ? parent + "/" + path : parent + path;
}

function Router( options ) {
  if ( !( this instanceof Router ) ) {
    return new Router( options );
  }
  this.caseSensitive = options && options.caseSensitive;
  this.dot = options && options.dot;
  this.path = DEFAULT_PATH;
  this.pattern = DEFAULT_PATTERN;
  this.names = DEFAULT_PATTERN.names;
  this.routes = [];
  this.params = [];
}

Router.prototype = {

  constructor: Router,

  route: function( path ) {

    var newPath = joinPaths( this.path, path );

    var router = new Router();

    router.path = newPath;

    router.pattern = pathToRegExp( newPath, {
      caseSensitive: this.caseSensitive,
      dot: this.dot,
      end: true
    } );

    router.names = getNames( path );

    this.routes.push( router );

    return router;

  },

  use: function( path, middleware ) {

    if ( path && !middleware ) {
      middleware = path;
      path = "";
    }

    var router = new Middleware(
      isFunction( middleware ) ? new Router()[ ALL_METHODS ]( middleware ) : middleware
    );

    router.path = joinPaths( this.path, path );

    router.pattern = pathToRegExp( router.path, {
      caseSensitive: this.caseSensitive,
      dot: this.dot,
      end: false
    } );

    this.routes.push( router );

    return this;

  },

  param: function( name, fn ) {
    if ( !isFunction( fn ) ) {
      throw new TypeError( "Function is required." );
    }
    if ( this.names.indexOf( name ) < 0 ) {
      throw new TypeError( "There is no parameter with that name in this route's path." );
    }
    this.params.push( new ParamMiddleware( name, fn ) );
    return this;
  },

  handle: function( req, res, callback ) {

    if ( !isFunction( callback ) ) {
      throw new TypeError( "Callback is required." );
    }

    var fnStack = [], paramsStack = [];
    var i = 0, len, next;

    if ( !req.originalUrl ) {
      req.originalUrl = req.url;
    }

    this._handle( req, fnStack, paramsStack );

    len = fnStack.length;

    next = function( err ) {

      if ( err || i >= len ) {

        fnStack = undefined;
        paramsStack = undefined;
        next = undefined;

        callback( err === "leave" ? undefined : err );

      } else {

        req.params = paramsStack[ i ];

        callAndCatchErr( fnStack[ i++ ], req, res, deferOnce( next ) );

      }

    };

    next();

    return this;

  },

  _processParams: function( req, fnStack, paramsStack, params ) {
    var paramRoutes = this.params;
    for ( var i = 0; i < paramRoutes.length; i++ ) {
      paramRoutes[ i ]._handle( req, fnStack, paramsStack, params );
    }
  },

  _handle: function( req, fnStack, paramsStack ) {

    var routes = this.routes;
    var pathname = req.pathname || ( req.pathname = getPathname( req.url ) );

    var params = match( pathname, this.pattern );

    if ( params ) {
      this._processParams( req, fnStack, paramsStack, params );
    }

    for ( var i = 0; i < routes.length; i++ ) {
      routes[ i ]._handle( req, fnStack, paramsStack, params );
    }

  }

};

Router.registerMethod = function( name ) {
  var method = name === ALL_METHODS ? name : name.toLowerCase();
  Router.prototype[ method ] = function( fn ) {
    if ( typeof fn === "string" ) {
      return this.route( fn )[ method ]( arguments[ 1 ] );
    }
    this.routes.push( new MethodMiddleware( name, fn ) );
    return this;
  };
};

[ ALL_METHODS, "get", "post", "put", "delete", "patch" ].forEach( Router.registerMethod );

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

var KEY = "view";
var check = function( el ) {
  if ( el.nodeType && el.nodeType !== 3 ) {
    return 1;
  }
  return el === el.window ? 2 : 0;
};

var motaViewData = {
  add: function( component ) {
    var el = component.el, c = check( el );
    return c && Data.setup( el, KEY, component, c === 1 );
  },
  remove: function( el ) {
    return check( el ) && Data.remove( el, KEY );
  },
  get: function( el ) {
    return check( el ) && Data.get( el, KEY );
  }
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
          "mota.view",
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

  if ( index != null ) {
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

// Example: hyphenateStyleName( "backgroundColor" ) -> "background-color"
function hyphenateStyleName( str ) {
  return str.replace( rUppercase, "-$1" ).toLowerCase();
}

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

    html += " " + name + "=\"" + escape( value ) + "\"";

  } );

  return html;
}

function serializeElement( elem ) {
  var tagName = elem._tagName;
  var html = "<" + tagName + properties( elem );
  html += voidElements[ tagName ] ? " />" : ">" + elem.innerHTML + "</" + tagName + ">";
  return html;
}

function serializeNode( node ) {
  switch ( node.nodeType ) {
    case 3:
      return escape( node.nodeValue );
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

var createEl = function( type, attrs, currEl, renderToString, owner ) {

  var el, namespace, doc = renderToString ? fakeDocument : getDocument();

  if ( typeof type === "string" ) {

    if ( type === "#text" ) {

      el = doc.createTextNode( attrs.text );

    } else if ( type === "#comment" ) {

      el = doc.createComment( "" );

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

var warning$6 = deprecated( "mota.view.styleSet" );

var styleSet = function( elem ) {

  if ( true ) {
    warning$6();
  }

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
    warn( "mota.view", "Invalid attribute name: `" + name + "`" );
  }

  return false;

} );

var cssPrefixes = [ "Webkit", "Moz", "ms" ];

var getEmptyStyle = ( function() {

  var emptyStyle = null;

  return function() {
    if ( emptyStyle ) {
      return emptyStyle;
    }
    var doc = getDocument();
    emptyStyle = doc && doc.createElement( "div" ).style;
    return emptyStyle;
  };

} )();

// CSS properties which accept numbers but are not in units of "px"
var unitlessNumber = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
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
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function toCapName( key ) {
  return key.charAt( 0 ).toUpperCase() + key.substring( 1 );
}

// Return a css property mapped to a potentially vendor prefixed property
var vendorPropName = memoizeStringOnly( function( name ) {

  var capName, i, emptyStyle = getEmptyStyle();

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

  if ( val === 0 || val === "0" || unitlessNumber[ key ] || isNaN( val ) ) {
    return val + "";
  }

  if ( typeof val === "string" ) {
    val = val.trim();
  }

  return val + "px";

}

function setStyle( internal, elem, k, _prevValue, val ) {

  var key = vendorPropName( k );

  if ( !key ) {
    if ( true ) {
      warn( "mota.view", "`" + k + "` is not a style property." );
    }
    return;
  }

  var value = styleValue( key, val );

  if ( elem.style[ key ] !== value ) {
    updaterQueueAttrUpdate( elem, key, value, "style" );
  }

}

forEachObj( unitlessNumber, function( value, key ) {
  unitlessNumber[ vendorPropName( key ) ] = value;
} );

var warning$5 = deprecated(
  "mota.view",
  "Object and array values as class names are deprecated. Use mota.view.classSet explicitly in your `render` function."
);

var diffAttr = function( internal, el, key, elemA, elemB ) {

  var className, eventName;

  switch ( key ) {

    case "key":
    case "children":
    case "childNodes":
    case "innerHTML":
    case "outerHTML":
      return;

    case "dangerousInnerHTML":
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

      if ( true ) {
        if ( typeof elemB !== "string" ) {
          warning$5();
        }
      }

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

        // Remove old if existed
        if ( elemA ) {
          Events.off.call( el, eventName, elemA );
        }

        // Add if new is defined
        if ( elemB ) {
          Events.on.call( el, eventName, elemB );
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

          // Setting `value` or `selectedIndex` on <select> doesn't work before children exist
          // So set it after children have been created
          if ( el.nodeName === "SELECT" && ( key === "value" || key === "selectedIndex" ) ) {
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

var COMMENT = create( "#comment", null, "motajs: empty" );

var updateComponent = function( index, props, renderToString ) {

  var result, cache, thisEl, type, attrs, children, component = this.component;

  result = component.render( create, props ) || COMMENT;
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
    return updaterQueueAttrUpdate(
      thisEl, "nodeValue", children && children.join ? children.join( "\n" ) : ( children || "" ), "prop"
    );
  }

  if ( voidElements[ type ] ) {
    if ( attrs.dangerousInnerHTML != null || children != null ) {
      updaterError(
        "`" + type + "` is a void element tag and must not have `children` or " +
        "use `dangerousInnerHTML`.",
        this.owner
      );
    }
  }

  // DIFF ATTRS
  diffObj( this, thisEl, "cacheAttrs", "cacheAttrsKeys", attrs, diffAttr );

  // DIFF CHILDREN
  if ( voidElements[ type ] || attrs.dangerousInnerHTML != null ) {
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

  // It's `true` when we want to prevent posterior queueing.
  this.dontQueue = false;

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

  diffChildren: diffChildren,

  get: function( index ) {
    var internal = this.array[ index ];
    return internal && internal.component;
  },

  traverse: function( callback ) {
    var i = 0, arr = this.array;
    for ( ; i < this.length; i++ ) {
      callback( arr[ i ] );
    }
  }

};

function warnUpdateAfterUnmount( component, method ) {
  if ( !component.__internal__ ) {
    warn(
      "mota.view." + method,
      "You are calling `" + method + "` after the component has unmounted. " +
      "This might mean you have a memory leak."
    );
    return true;
  }
  return false;
}

function enqueueUpdate( component ) {
  if ( true ) {
    if ( warnUpdateAfterUnmount( component, "enqueueUpdate" ) ) {
      return;
    }
  }
  component.__internal__.queueUpdate();
}

function forceUpdate( component ) {
  if ( true ) {
    if ( warnUpdateAfterUnmount( component, "forceUpdate" ) ) {
      return;
    }
  }
  component.__internal__.queueUpdate( true );
}

function ViewComponent() {
  this.__internal__ = new ViewInternal( this );
  this.el = null;
  this.props = null;
}

var warningUpdate = deprecated( "mota.view.Component.update", "This is deprecated. Use mota.view.enqueueUpdate( component )." );
var warningForceUpdate = deprecated( "mota.view.Component.forceUpdate", "This is deprecated. Use mota.view.forceUpdate( component )." );

assign( ViewComponent.prototype, {
  update: function() {
    if ( true ) {
      warningUpdate();
    }
    enqueueUpdate( this );
  },
  forceUpdate: function() {
    if ( true ) {
      warningForceUpdate();
    }
    forceUpdate( this );
  },
  bindMethodsToThis: function() {

    var name, original,
        methods = this.__methods,
        i = methods && methods.length;

    while ( i-- ) {
      name = methods[ i ];
      original = this[ name ];
      this[ name ] = bind( original, this );
      this[ name ].original = original;
    }

  }
} );

Object.defineProperty( ViewComponent.prototype, "__internal__", { enumerable: false, writable: true } );

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

  proto = assign( Constructor.prototype, proto );

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

function create$1( el ) {
  var component = new ViewInternal();
  component.el = el;
  return motaViewData.add( component );
}

var render = function( placeholder, parent, callback ) {

  var doc = getDocument();

  if ( true ) {
    if ( doc && parent === doc.body ) {
      warn(
        "mota.view.render",
        "You're trying to render a component into `document.body`, " +
        "which is often manipulated by third party scripts. " +
        "This may lead to subtle reconciliation issues."
      );
    }
  }

  var parentComponent = motaViewData.get( parent ) || create$1( parent );

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

  parentComponent.queueUpdate();

  return parentComponent.get( 0 );

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

var select = function( el ) {
  return ( el && motaViewData.get( el ) ) || undefined;
};

var view = {
  classSet: classSet,
  Component: ViewComponent,
  create: create,
  createClass: createClass,
  render: render,
  renderToString: renderToString,
  select: true ? select : undefined,
  styleSet: styleSet,
  enqueueUpdate: enqueueUpdate,
  forceUpdate: forceUpdate,
  dispatchEvents: events.dispatchEvents
};

function mota() {}

forEachObj( {
  VERSION: "0.14.0",
  developmentMode: true
}, function( v, k ) {
  Object.defineProperty( mota, k, {
    value: v
  } );
} );

utilities.assign( mota, utilities, {
  Events: Events,
  History: History,
  Map: Map,
  ImmutableMap: ImmutableMap,
  Observable: Observable,
  pathname: pathname,
  Promise: MotaPromise,
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
        "https://github.com/jdmota/motajs-devtools"
      );
    }
  }
}

// Export

( freeSelf || {} ).mota = mota;

/* global define:true */
if ( typeof define == "function" && typeof define.amd == "object" && define.amd ) {

  define( function() {
    return mota;
  } );

} else if ( freeModule ) {

  ( freeModule.exports = mota ).mota = mota;
  freeExports.mota = mota;

} else {

  root.mota = mota;

}

} ).call( this );
