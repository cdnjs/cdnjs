/*!
 * MotaJS v0.8.1
 * http://motapc.js.org/motajs
 *
 * Released under the MIT license
 * https://github.com/motapc97/MotaJS/blob/master/LICENSE.md
 *
 * Project
 * https://github.com/motapc97/MotaJS
 *
 * Date: 2015-06-27T18:39Z
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
  var apply = function( func, context, a ) {

    // http://jsperf.com/test-call-vs-apply/73

    var len = a && a.length;

    if ( !func ) {
      return;
    }

    if ( !len ) {
      return func.call( context );
    }

    switch ( len ) {

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

  };

  var ObjectCreate = Object.create;

  var isArray = Array.isArray;

  var toString = ( {} ).toString;

  var types = {
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Function]": "function",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object RegExp]": "regexp",
    "[object String]": "string"
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

  var hasOwn = {}.hasOwnProperty;

  var utilities_has__has = function( obj, key ) {
    return obj != null && hasOwn.call( obj, key );
  };

  var classExtend = function( protoProps, staticProps, optionalNew ) {

    var
    parent = this,
    Child,
    constructor;

    if ( protoProps && utilities_has__has( protoProps, "constructor" ) ) {
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

  var utilities_clone__clone = function( target ) {

    var deep, Cotr, result;

    // Handle a deep cloning situation
    if ( target === true && utilities_has__has( arguments, 1 ) ) {
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
    throw funcName + " ERROR: " + msg;
  };

  
  var
  EXPANDO = "__mota__" + ( "" + Math.random() ).replace( /\D/g, "" ),
  ObjProp = Object.defineProperty;

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
    return name ? ( data[ name ] ? data[ name ] : ( data[ name ] = value ) ) : data;
  };

  MotaData.get = function( obj, name ) {
    var data = obj[ EXPANDO ];
    return name ? data && data[ name ] : data;
  };

  MotaData.set = function( obj, name, value ) {
    var data = obj[ EXPANDO ];
    return data ? ( data[ name ] = value ) : undefined;
  };

  MotaData.del = function( obj, name ) {
    var data = obj[ EXPANDO ];
    if ( data ) {
      if ( name ) {
        if ( data[ name ] != null ) {
          return !( data[ name ] = undefined );
        }
      } else {
        return !!( obj[ EXPANDO ] = new MotaData() );
      }
    }
    return false;
  };

  
  var weakMap = typeof WeakMap === "function" ? new WeakMap() : undefined;
  var objHashUID = 1;

  var STR_HASH_CACHE_MIN_STRLEN = 16;
  var STR_HASH_CACHE_MAX_SIZE = 255;
  var STR_HASH_CACHE_SIZE = 0;
  var strHashCache = {};

  // http://jsperf.com/convert-to-smi/2
  function smi( i ) {
    return ( ( i >>> 1 ) & 1073741824 ) | ( i & 3221225471 );
  }

  var imul = Math.imul;
  if ( typeof imul !== "function" || imul( 0xffffffff, 2 ) !== -2 ) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
    imul = function( a, b ) {
      var ah = ( a >>> 16 ) & 0xffff;
      var al = a & 0xffff;
      var bh = ( b >>> 16 ) & 0xffff;
      var bl = b & 0xffff;
      return ( ( al * bl ) + ( ( ( ah * bl + al * bh ) << 16 ) >>> 0 ) | 0 );
    };
  }

  function hashString( str ) {

    var i, len = str.length,
        cache = len > STR_HASH_CACHE_MIN_STRLEN,
        h = cache && strHashCache[ str ];

    if ( !h && h !== 0 ) {

      // s[0] * 31 ^ (len - 1) + s[1] * 31 ^ (len - 2) + ... + s[len - 1]
      // We make the result between [ 0 , 2^31 [ by dropping high bits
      // http://jsperf.com/hashing-strings
      h = 0;
      i = 0;

      for ( ; i < len ; i++ ) {
        h = h * 31 + str.charCodeAt( i ) | 0;
      }

      h = smi( h );

      if ( cache ) {

        if ( STR_HASH_CACHE_SIZE === STR_HASH_CACHE_MAX_SIZE ) {
          STR_HASH_CACHE_SIZE = 0;
          strHashCache = {};
        }

        STR_HASH_CACHE_SIZE++;
        strHashCache[ str ] = h;

      }

    }

    return h;

  }

  function hashMerge( a, b ) {
    return a ^ b + 2654435769 + ( a << 6 ) + ( a >> 2 ) | 0;
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

    // murmurHashOfSize

    h = imul( h, 3432918353 );
    h = imul( h << 15 | h >>> -15, 461845907 );
    h = imul( h << 13 | h >>> -13, 5 );
    h = ( h + 3864292196 | 0 ) ^ size;
    h = imul( h ^ h >>> 16, 2246822507 );
    h = imul( h ^ h >>> 13, 3266489909 );
    h = smi( h ^ h >>> 16 );

    return h;

  }

  function getHash( o ) {
    return weakMap ? weakMap.get( o ) : MotaData.get( o, "hash" );
  }

  function hash( o ) {

    var type, h;

    // false, null, undefined, 0, ""
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

    if ( weakMap ) {
      weakMap.set( o, h );
    } else {
      MotaData.setup( o, "hash", h );
    }

    return h;

  }

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

    var className = toString.call( a );
    if ( className != toString.call( b ) ) {
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

  var isArguments = function( obj ) {
    return toString.call( obj ) === "[object Arguments]";
  };

  var ISENVNODE = (
    typeof global !== "undefined" &&
    global &&
    toString.call( global.process )
  ) === "[object process]";

  var strWin = "[object Window]",
  strWin2 = "[object global]"; // Chrome & Opera (and Safari?) + Node

  var isWindow = function( obj ) {

    if ( !obj || typeof obj !== "object" ) {
      return false;
    }

    if ( !ISENVNODE && obj.window !== obj ) {
      return false;
    }

    var className = toString.call( obj );

    return className === strWin || className === strWin2;

  };

  var MAX_ARRAY_INDEX = Math.pow( 2, 53 ) - 1;

  var isArrayLike = function( obj ) {

    var type = motaType( obj ), length;

    if ( type === "array" ) {
      return true;
    }

    if ( type !== "object" || isWindow( obj ) ) {
      return false;
    }

    // http://stackoverflow.com/questions/28155841/misterious-failure-of-jquery-each-and-underscore-each-on-ios
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

  var strDoc = "[object HTMLDocument]",
  strDoc2 = "[object Document]"; // IE 9 & 10

  var isDocument = function( obj ) {

    var defaultView;

    if ( !obj || obj.parentNode !== null || !( defaultView = obj.defaultView ) ) {
      return false;
    }

    // The server side should be safe
    // but with the browser, we need to check the [[Class]] name

    if ( ISENVNODE ) {

      return isWindow( defaultView );

    } else {

      var className = toString.call( obj );

      return className === strDoc || className === strDoc2;

    }

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

      return toString.call( obj ).indexOf( "Element" ) > -1;

    }

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
      if ( utilities_has__has( obj, key ) ) {
        return false;
      }
    }
    return true;
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

  var isPlainObject = function( obj ) {

    var ctor;

    // If it's not an object
    // and if `constructor` was overwritten
    if (
      !obj || typeof obj !== "object" ||
      toString.call( obj ) !== "[object Object]" || utilities_has__has( obj, "constructor" )
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
        if ( !( utilities_has__has( b, key ) && eq( a[ key ], b[ key ], aStack, bStack ) ) ) {
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

  var motaIsFinite = function( obj ) {
    return isFinite( obj ) && !isNaN( parseFloat( obj ) );
  };

  var isNumber = function( obj ) {
    return motaType( obj ) === "number";
  };

  var motaIsNaN = function( obj ) {
    return obj !== +obj && isNumber( obj );
  };

  var isNull = function( obj ) {
    return obj === null;
  };

  var motaIsRegExp = function( obj ) {
    return motaType( obj ) === "regexp";
  };

  var isUndefined = function( obj ) {
    return obj === void 0;
  };

  var log = function( funcName, msg ) {
    console.log( funcName + " LOG: " + msg );
  };

  var window = ( typeof self == "object" && self.self == self && self ) ||
    ( typeof global == "object" && global.global == global && global );

  var document = window && window.document;

  var setWindow = function( win ) {
    window = win;
    document = win && win.document;
  };

  var _mota = window.mota;

  var noConflict = function() {
    if ( _mota ) {
      window.mota = _mota;
    }
    return this;
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

  var warn = function( funcName, msg ) {
    if ( console.warn ) {
      console.warn( funcName + " WARNS: " + msg );
    } else {
      console.log( funcName + " WARNS: " + msg );
    }
  };

  var utilities = {
    apply: apply,
    classExtend: classExtend,
    clone: utilities_clone__clone,
    extend: extend,
    defaults: defaults,
    err: err,
    has: utilities_has__has,
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
    isNaN: motaIsNaN,
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
    noConflict: noConflict,
    pairs: motaPairs,
    type: motaType,
    uniqueId: uniqueId,
    validate: validate,
    warn: warn
  };

  var indexOf = ArrayProto.indexOf;

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
      if ( indexOf.call( arr2, arr1[ i ] ) !== -1 ) {
        return true;
      }
    }

    return false;

  };

  var helper_getListeners__getListeners = function( object, events, listener, action ) {

    var
    results = [], thisEvent, i, match,
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

  var

  rnotwhite = /\S+/g,
  rnamespace = /\.[^.]+/g,
  rtype = /^[^.]+/g,

  MotaEventListener = function( data ) {
    this.type = data.type;
    this.namespaces = data.namespaces;
    this.handler = data.handler;
    this.context = data.context;
    this.isRegExp = data.isRegExp;
    this.once = false;
    this._listener = true;
  },

  helper_eventsApi__eventTypes = function( data, result ) {

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

      // eventType: /regexp/, handler, context
      if ( isRegExp ) {

        result.push( {
          type: eventType,
          handler: handler,
          context: context,
          isRegExp: isRegExp
        } );

      // eventType: { "type": handler }, undefined, context
      // eventType: { "type": handler }, context
      } else if ( objType === "object" ) {

        eventTypeObj = eventType;

        if ( handler ) {
          context = handler;
        }

        for ( eventType in eventTypeObj ) {

          helper_eventsApi__eventTypes( {
            eventType: eventType,
            handler: eventTypeObj[ eventType ],
            context: context
          }, result );

        }

      // eventType: "type1 type2", handler, context
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

    types = helper_eventsApi__eventTypes( data, [] );

    for ( i = 0; i < types.length; i++ ) {

      if ( action === "on" ) {

        if ( !types[ i ].type || !types[ i ].handler ) {
          continue;
        }

        callback.call(
          object,
          events,
          new MotaEventListener( types[ i ] ),
          undefined,
          arg
        );

      } else {

        eventListeners = helper_getListeners__getListeners( object, events, types[ i ], action );

        for ( j = 0; j < eventListeners.length; j++ ) {

          listener = eventListeners[ j ];

          if ( callback.call( object, events, listener[ 0 ], listener[ 1 ], arg ) === false ) {
            break;
          }

        }

      }

    }

    return object;

  };

  var eventsApiGet = function( events, eventListener, data, result ) {
    result.push( eventListener );
  };

  var events_getListeners__getListeners = function( eventType, handler, context ) {

    var result = [];

    eventsApi( this, "get", eventsApiGet, {
      eventType: eventType,
      handler: handler,
      context: context
    }, result );

    return result;

  };

  var eventsApiHas = function( events, eventListener, data, result ) {
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

  function spliceOne( list, index ) {
    for ( var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1 ) {
      list[ i ] = list[ k ];
    }
    list.pop();
  }

  var eventsApiOff = function( events, eventListener, data, index ) {

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

  var eventsApiOn = function( events, eventListener, data, once ) {

    if ( once ) {
      eventListener.once = true;
    }

    events.push( eventListener );

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

  var eventsApiTriggerBeforeFiring = function( events, eventListener, data ) {

    if ( eventListener.once ) {
      eventListener.handler = undefined;
      eventsApi( this, "off", eventsApiOff, eventListener, { value: 0 } );
    }

  };

  var eventsApiTrigger = function( events, eventListener, data, args ) {

    var handler = eventListener.handler;

    eventsApiTriggerBeforeFiring.call( this, events, eventListener, data );

    apply(
      handler,
      eventListener.context !== undefined ? eventListener.context : this,
      args
    );

  };

  var trigger = function( eventType ) {

    return eventsApi(
      this, "trigger", eventsApiTrigger, {
        eventType: eventType
      }, slice.call( arguments, 1 )
    );

  };

  var eventsApiTriggerMatch = function( events, eventListener, data, args ) {
    eventsApiTrigger( events, eventListener, data, [ data.match ].concat( args ) );
  };

  var triggerMatch = function( eventType ) {

    return eventsApi(
      this, "trigger", eventsApiTriggerMatch, {
        eventType: eventType
      }, slice.call( arguments, 1 )
    );

  };

  var events_main__events = {
    getListeners: events_getListeners__getListeners,
    hasListeners: hasListeners,
    off: off,
    on: on,
    once: once,
    trigger: trigger,
    triggerMatch: triggerMatch
  };

  var SHIFT = 5;
  var SIZE = 32;
  var MASK = SIZE - 1;
  var MAX_INDEX_NODE = SIZE / 2;
  var MIN_ARRAY_NODE = SIZE / 4;
  var NOTHING = {};

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

  var helper_forEach__forEach = function( f, z ) {

    var children = this.children,
        i = 0,
        len = children.length,
        child;

    for ( ; i < len; i++ ) {
      child = children[ i ];
      if ( child && child.forEach( f, z ) === false ) {
        return false;
      }
    }

  };

  var isEditable = function( owner ) {
    return this.owner === owner && owner.mutable;
  };

  function Collision( owner, hash, children ) {
    this.owner = owner;
    this.hash = hash;
    this.children = children;
  }

  extend( Collision.prototype, {

    isLeaf: true,

    isEditable: isEditable,

    forEach: helper_forEach__forEach,

    lookup: function( shift, h, k ) {

      var i = 0,
          len = this.children.length,
          child;

      for ( ; i < len; i++ ) {

        child = this.children[ i ];

        if ( is( child.key, k ) ) {
          return child.value;
        }

      }

      return NOTHING;

    },

    modify: function( owner, shift, h, k, updater, ref ) {

      var value,
          removed = updater === NOTHING,
          idx, len,
          exists, children,
          isEditable, newChildren, child;

      if ( h !== this.hash ) {
        if ( removed ) {
          return this;
        }

        value = updater( ref.notSetValue );

        ref.changeValue = true;
        ref.newValue = value;
        ref.changeSize = true;
        return mergeLeaves( this, owner, shift, new Leaf( owner, h, k, value ) );
      }

      children = this.children;
      idx = 0;
      len = children.length;
      for ( ; idx < len; idx++ ) {

        child = children[ idx ];

        if ( is( child.key, k ) ) {
          ref.oldValue = child.value;
          break;
        }

      }

      exists = idx < len;
      value = removed ? updater : updater( exists ? ref.oldValue : ref.notSetValue );

      if ( exists ? child.value === value : removed ) {
        return this;
      }

      ref.changeValue = true;
      ref.newValue = value;
      if ( removed || !exists ) {
        ref.changeSize = true;
      }

      if ( removed && len === 2 ) {
        child = children[ idx ^ 1 ];
        return new Leaf( owner, this.hash, child.key, child.value );
      }

      isEditable = this.isEditable( owner );
      newChildren = isEditable ? children : arrayUpdate( children );

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

      if ( isEditable ) {
        this.children = newChildren;
        return this;
      }

      return new Collision( owner, this.hash, newChildren );

    }

  } );

  var alter = function( child, owner, shift, h, k, updater, ref ) {

    if ( !child ) {
      if ( updater === NOTHING ) {
        return child;
      }
      ref.changeValue = true;
      ref.changeSize = true;
      ref.newValue = updater( ref.notSetValue );
      return new Leaf( owner, h, k, ref.newValue );
    }

    return child.modify( owner, shift, h, k, updater, ref );

  };

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

    forEach: helper_forEach__forEach,

    lookup: function( shift, h, k ) {

      var child = this.children[ ( h >>> shift ) & MASK ];

      return !child ? NOTHING : child.lookup( shift + SHIFT, h, k );

    },

    modify: function( owner, shift, h, k, updater, ref ) {

      var removed = updater === NOTHING,
          idx = ( h >>> shift ) & MASK,
          children = this.children,
          child = children[ idx ],
          newChild, newCount,
          isEditable, newChildren;

      if ( removed && !child ) {
        return this;
      }

      newChild = alter( child, owner, shift + SHIFT, h, k, updater, ref );
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

      isEditable = this.isEditable( owner );
      newChildren = arrayUpdate( children, idx, newChild, isEditable );

      if ( isEditable ) {
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

    forEach: helper_forEach__forEach,

    lookup: function( shift, h, k ) {

      var bit = 1 << ( ( h >>> shift ) & MASK ),
          bitmap = this.bitmap;

      if ( bitmap & bit ) {

        return this.children[
          popCount( bitmap & ( bit - 1 ) )
        ].lookup( shift + SHIFT, h, k );

      }

      return NOTHING;

    },

    modify: function( owner, shift, h, k, updater, ref ) {

      var frag = ( h >>> shift ) & MASK,
          bit = 1 << frag,
          bitmap = this.bitmap,
          exists = ( bitmap & bit ) !== 0,
          idx, len, children,
          child, newChild,
          isEditable, newBitmap,
          newChildren;

      if ( !exists && updater === NOTHING ) {
        return this;
      }

      idx = popCount( bitmap & ( bit - 1 ) );
      children = this.children;
      child = exists ? children[ idx ] : undefined;
      newChild = alter( child, owner, shift + SHIFT, h, k, updater, ref );

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

      isEditable = this.isEditable( owner );
      newBitmap = exists ? newChild ? bitmap : bitmap ^ bit : bitmap | bit;
      newChildren = exists ? newChild ?
        arrayUpdate( children, idx, newChild, isEditable ) :
        arraySpliceOut( children, idx, isEditable ) :
        arraySpliceIn( children, idx, newChild, isEditable );

      if ( isEditable ) {
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

    lookup: function( shift, h, k ) {
      return is( this.key, k ) ? this.value : NOTHING;
    },

    modify: function( owner, shift, h, k, updater, ref ) {

      var removed = updater === NOTHING,
          keyMatch = is( this.key, k ),
          value = removed ? updater : updater( keyMatch ? this.value : ref.notSetValue );

      if ( keyMatch ? this.value === value : removed ) {
        return this;
      }

      ref.changeValue = true;
      ref.newValue = value;
      ref.oldValue = this.value;

      if ( removed ) {
        ref.changeSize = true;
        return;
      }

      if ( keyMatch ) {

        if ( this.isEditable( owner ) ) {
          this.value = value;
          return this;
        }

        return new Leaf( owner, this.hash, k, value );

      }

      ref.changeSize = true;
      return mergeLeaves( this, owner, shift, new Leaf( owner, h, k, value ) );

    },

    forEach: function( func, z ) {
      return func( z, this );
    }

  } );

  function MotaMap( obj ) {
    return isMap( obj ) ? obj : makeMap( true ).merge( obj, INIT );
  }

  function MotaMapOwner( mutable ) {
    this.mutable = !!mutable;
    this.type = "map";
  }

  var

  INIT = {},

  isMap = MotaMap.isMap = function( map ) {
    return !!( map && map.__owner && map.__owner.type === "map" );
  },

  makeMap = function( mutable, size, root ) {
    var map = ObjectCreate( MotaMapPrototype );
    map.size = size || 0;
    map.__root = root;
    map.__owner = new MotaMapOwner( mutable );
    return map;
  },

  buildFuncs = {
    pairs: function( arr, node ) {
      arr.push( [ node.key, node.value ] );
    },
    keys: function( arr, node ) {
      arr.push( node.key );
    },
    values: function( arr, node ) {
      arr.push( node.value );
    }
  },

  factory = function( name ) {

    var __name = "__" + name,
        func = buildFuncs[ name ];

    return function() {

      if ( this[ __name ] !== undefined && this.isImmutable() ) {
        return this[ __name ];
      }

      var arr = [];

      if ( this.__root ) {
        this.__root.forEach( func, arr );
      }

      return ( this[ __name ] = arr );

    };

  },

  Map_main__forEach = function( obj, callback ) {

    var objType = obj && motaType( obj ),
    key, i, len;

    if ( objType === "object" ) {

      if ( typeof obj.forEach === "function" ) {
        return obj.forEach( callback );
      }

      for ( key in obj ) {
        callback.call( null, obj[ key ], key );
      }

    } else if ( objType === "array" ) {

      i = 0;
      len = obj.length;

      for ( ; i < len ; i++ ) {
        callback.call( null, obj[ i ][ 1 ], obj[ i ][ 0 ] );
      }

    }

  },

  MotaMapPrototype = extend( MotaMap.prototype, events_main__events, {

    get: function( key, notSetValue ) {

      var root = this.__root,
          value = !root ? NOTHING : root.lookup( 0, hash( key ), key );

      return value === NOTHING ? notSetValue : value;

    },

    has: function( key ) {

      var root = this.__root,
          value = !root ? NOTHING : root.lookup( 0, hash( key ), key );

      return NOTHING !== value;

    },

    set: function( key, value, silent ) {
      return this.update( key, function() { return value; } );
    },

    remove: function( key ) {
      return this.update( key, NOTHING );
    },

    update: function( key, updater, notSetValue, silent ) {

      var ref = { changeSize: false, changeValue: false, notSetValue: notSetValue },
          remove = updater === NOTHING,
          isMutable = this.isMutable(),
          map, change, changes;

      if ( isMutable ) {
        map = this;
      } else {
        map = makeMap();
      }

      if ( this.__root ) {

        map.__root = this.__root.modify( map.__owner, 0, hash( key ), key, updater, ref );

      } else if ( !remove ) {

        ref.changeValue = true;
        ref.changeSize = true;
        ref.newValue = updater( ref.notSetValue );
        map.__root = new Leaf( map.__owner, hash( key ), key, ref.newValue );

      }

      if ( !ref.changeValue ) {
        return silent === INIT ? ref : this;
      }

      map.size = this.size + ( ref.changeSize ? remove ? -1 : 1 : 0 );

      if ( silent === INIT ) {
        return ref;
      }

      if ( !map.size && !isMutable ) {
        return EMPTY_MAP;
      }

      if ( isMutable ) {

        change = {
          type: remove ? "delete" : ref.changeSize ? "add" : "update"
        };

        change.key = change.name = key;

        if ( remove ) {

          change.oldValue = ref.oldValue;

        } else {

          change.value = change.newValue = ref.newValue;

          if ( !ref.changeSize ) {
            change.oldValue = ref.oldValue;
          }

        }

        changes = this.__changes;

        if ( !changes ) {
          changes = this.__changes = [];
        }

        changes.push( change );

        if ( !silent ) {
          this.__triggerChangeEvent();
        }

      }

      return map;

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

    pairs: factory( "pairs" ),

    keys: factory( "keys" ),

    values: factory( "values" ),

    forEach: function( callback, thisArg ) {

      var self = this, i = 0;

      if ( this.size ) {
        this.__root.forEach( function( z, node ) {
          i++;
          return callback.call( thisArg, node.value, node.key, self );
        } );
      }

      return i;

    },

    isMutable: function() {
      return this.__owner.mutable;
    },

    isImmutable: function() {
      return !this.isMutable();
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

      if ( !obj ) {
        return this;
      }

      var newMap = this.asMutable(), changed = false;

      Map_main__forEach( obj, function( value, key ) {

        var ref;

        if ( silent === INIT ) {

          ref = newMap.update( key, function() { return value; }, undefined, silent );

          if ( ref.changeValue ) {
            changed = true;
          }

        } else {

          newMap.update( key, function() { return value; }, undefined, true );

        }

      } );

      if ( changed || newMap.__triggerChangeEvent() ) {
        return newMap === this ? newMap : newMap.asImmutable();
      }

      return this;

    }

  } ),

  EMPTY_MAP = makeMap( false );

  MotaMap.prototype.entries = MotaMap.prototype.pairs;
  MotaMap.prototype.unset = MotaMap.prototype.remove;
  MotaMap.prototype.delete = MotaMap.prototype.remove;

  var clear = function() {
    return this.unsetAll( motaPairs( this.attributes ) );
  };

  var Model_clone__clone = function() {
    return new this.constructor( motaPairs( this.attributes ) );
  };

  var modelCachePath = {};

  var modelFromPath = function( obj, path ) {

    if ( isString( path ) ) {
      path = modelCachePath[ path ] || ( modelCachePath[ path ] = path.split( "." ) );
    }

    if ( !path || !path.length ) {
      return obj;
    }

    var i = 0, j = path.length - 1,
    exists = false, parent, parentPath, value, name;

    while ( utilities_has__has( obj, path[ i ] ) && i < j ) {

      obj = obj[ path[ i ] ];

      i++;

    }

    if ( i === j && obj != null ) {

      parent = obj;

      parentPath = slice.call( path, 0, -1 );

      name = path[ i ];

      value = obj[ name ];

      exists = utilities_has__has( obj, name );

    }

    return {
      path: path,
      parent: parent,
      parentPath: parentPath,
      name: name,
      value: value,
      exists: exists
    };

  };

  var get = function( path ) {
    return modelFromPath( this.attributes, path ).value;
  };

  var Model_has__has = function( path ) {
    return modelFromPath( this.attributes, path ).exists;
  };

  var _splice = ArrayProto.splice;

  var modelSplice = function( path, set, index, howmany, val ) {

    var added, addedCount, removed, removedCount,
    args, argsLen, index2, objectLen,
    data = modelFromPath( this.attributes, path ),
    object = data.value;

    path = data.path;

    if ( !isArray( object ) ) {
      return;
    }

    index2 = index - 0;

    if ( motaIsNaN( index2 ) ) {
      return;
    }

    objectLen = object.length;

    if ( set && index2 < objectLen ) {
      return;
    }

    if ( index2 < 0 ) {
      index2 = objectLen + index2;
    }

    args = slice.call( arguments, 2 ); // index, howmany, add...
    argsLen = args.length;

    addedCount = argsLen < 2 ? 0 : argsLen - 2; // (add...).length

    while ( index2 && objectLen < index2 ) {
      index2--;
      if ( set ) {
        addedCount++;
      }
    }

    if ( set ) {
      object[ index ] = val;
      removed = [];
    } else {
      removed = apply( _splice, object, args );
    }

    removedCount = removed.length;

    // If changed something
    if ( removedCount || addedCount ) {

      // Doing `added = slice.call( object, index2, addedCount );` doesn't work sometimes
      added = slice.call( slice.call( object, index2 ), 0, addedCount );

      return {
        model: this,
        path: path,
        added: added,
        addedCount: addedCount,
        index: index2,
        object: object,
        removed: removed,
        removedCount: removedCount,
        type: "splice"
      };

    }

  };

  var modelSet = function( path, val, unset ) {

    var parent, parentPath, oldValue, exists, name, change, data, type = null;

    if ( path == null ) {
      return this;
    }

    data = modelFromPath( this.attributes, path );

    parent = data.parent;

    if ( parent == null ) {
      return this;
    }

    path = data.path;
    parentPath = data.parentPath;
    oldValue = data.value;
    exists = data.exists;
    name = data.name;

    // Delete
    if ( unset ) {

      if ( exists ) {

        type = "delete";

      }

    // Add
    } else if ( !exists ) {

      type = "add";

    // Update
    } else if ( !isEqual( oldValue, val ) ) {

      type = "update";

    }

    // If something will change
    if ( type ) {

      switch ( type ) {

        case "add" :

          change = modelSplice.call( this, parentPath, true, name, 0, val );

          if ( !change ) {

            parent[ name ] = val;

          } else {

            type = "splice";

          }

          break;

        case "update" :

          parent[ name ] = val;

          break;

        case "delete" :

          delete parent[ name ];

          break;

      }

      if ( !change ) {

        change = {
          model: this,
          path: path,
          name: name,
          object: parent,
          type: type
        };

        if ( type !== "add" ) {
          change.oldValue = oldValue;
        }

        if ( type !== "delete" ) {
          change.newValue = !unset ? val : undefined;
        }

      }

      return change;

    }

  };

  var set = function( key, val, unset ) {

    var change = modelSet.call( this, key, val, unset );

    if ( change ) {
      this.trigger( "change", [ change ] );
    }

    return this;

  };

  var setAll = function( attrs, unset ) {

    var changes = [], self = this;

    if ( attrs ) {
      attrs.forEach( function( attr ) {

        var change = modelSet.call( self, attr[ 0 ], attr[ 1 ], unset );

        if ( change ) {
          changes.push( change );
        }

      } );
    }

    if ( changes.length ) {
      this.trigger( "change", changes );
    }

    return this;

  };

  var splice = function( path, index, howmany ) {

    var changes, args;

    args = slice.call( arguments );
    _splice.call( args, 1, 0, false ); // set = false

    changes = [ apply( modelSplice, this, args ) ];

    if ( changes[ 0 ] ) {

      this.trigger( "change", changes );

      return changes[ 0 ].removed;

    }

  };

  var unset = function( path ) {
    return this.set( path, null, true );
  };

  var unsetAll = function( attrs ) {
    return this.setAll( attrs, true );
  };

  function MotaModel( attributes ) {

    this.attributes = {};
    this.setAll( attributes );

    if ( this.initialize ) {
      apply( this.initialize, this, arguments );
    }

    warn( "mota.Model", "Model is deprecated. Use `mota.Map` instead." );

  }

  MotaModel.extend = classExtend;

  extend( MotaModel.prototype, events_main__events, {
    clear: clear,
    clone: Model_clone__clone,
    get: get,
    has: Model_has__has,
    set: set,
    setAll: setAll,
    splice: splice,
    unset: unset,
    unsetAll: unsetAll
  } );

  var rescape = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  var roptional = /\((.*?)\)/g; // (optional)
  var rnamed = /(\(\?)?:\w+/g; // :named
  var rsplat = /\*\w+/g; // *splat
  var rparams = /(?:(\(\?)?:\w+)|(?:\*\w+)/g; // :named, *splat

  var rleadslash = /^\/+/;
  var rtrailslash = /\/+$/;
  var vars__rhash = /#.*/;
  var rsearch = /\?.*/;

  var rWebUrl = new RegExp(
    "^(?:" +

      // protocol identifier
      "(?:((?:https?|ftp):)//)" +

      // user:pass authentication
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

        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +

        // domain name
        "(?:(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*)?" +

        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))?" +
      ")" +

      // port number
      "(?::(\\d{2,5}))?" + ")?" +

      // resource path
      "(/?\\S*)?" +
    "$", "i"
  );

  var parse = function( url, parseQuery ) {

    var match, parsed, query, querys, i, name, value, splitted;

    match = ( url || "" ).match( rWebUrl ) || [];

    parsed = {
      auth: match[ 2 ] || "",
      hash: "",
      hostname: match[ 3 ] || "",
      port: match[ 4 ] || "",
      protocol: match[ 1 ] || "",
      search: ""
    };

    parsed.pathname = ( match[ 5 ] || "" ).replace( vars__rhash, function( h ) {

      parsed.hash = h || "";

      return "";

    } ).replace( rsearch, function( s ) {

      parsed.search = s || "";

      return "";

    } ).replace( rleadslash, "/" );

    if ( parsed.pathname !== "/" ) {
      parsed.pathname = parsed.pathname.replace( rtrailslash, "" );
    }

    parsed.path = parsed.pathname + parsed.search;

    parsed.host = parsed.hostname + ( parsed.port ? ":" + parsed.port : "" );

    parsed.href = "";

    if ( parsed.host ) {

      parsed.href += parsed.protocol + "//";

      if ( parsed.auth ) {
        parsed.href += parsed.auth + "@";
      }

      parsed.href += parsed.host;

    }

    parsed.fragment = parsed.path + parsed.hash;

    parsed.href += parsed.fragment;

    query = parsed.query = parsed.search.substring( 1 );

    if ( parseQuery ) {

      querys = query.split( "&" );
      i = 0;

      query = parsed.query = {};

      for ( ; i < querys.length ; i++ ) {

        splitted = querys[ i ].split( "=" );

        name = decodeURIComponent( splitted[ 0 ] );
        value = splitted[ 1 ] ? decodeURIComponent( splitted[ 1 ] ) : true;

        query[ name ] = value;

      }

    }

    return parsed;

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

    var query = "", key, name, value;

    for ( key in obj ) {

      name = encodeURIComponent( key );
      value = encodeURIComponent( obj[ key ] );

      query += "&" + name + ( value !== "true" ? "=" + value : "" );

    }

    return query.substring( 1 );

  }

  var format = function( obj ) {

    var url = "", pathname, queryStr;

    if ( obj.protocol ) {
      url += ensureLastChar( obj.protocol, ":" ) + "//";
    }

    if ( obj.auth ) {
      url += obj.auth + "@";
    }

    // host will be used in place of hostname and port
    if ( obj.host ) {

      url += obj.host;

    } else {

      // hostname will only be used if host is absent
      if ( obj.hostname ) {
        url += obj.hostname;
      }

      // port will only be used if host is absent
      if ( obj.port ) {
        url += ":" + obj.port;
      }

    }

    if ( obj.pathname ) {

      pathname = obj.pathname.replace( rleadslash, "/" );
      pathname = url ? ensureFirstChar( pathname, "/" ) : pathname;

      url += pathname !== "/" ? pathname.replace( rtrailslash, "" ) : pathname;

    }

    // search will be used in place of query
    if ( obj.search ) {

      url += ensureFirstChar( obj.search, "?" );

    // query will only be used if search is absent
    } else if ( obj.query ) {

      queryStr = queryStringFromObj( obj.query );

      if ( queryStr ) {
        url += "?" + obj.query;
      }

    }

    if ( obj.hash ) {
      url += ensureFirstChar( obj.hash, "#" );
    }

    return url;

  };

  var normalizeArr = function( res, urlArr, bool ) {

    var i, p;

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

  };

  var path_normalize__normalize = function( url ) {

    var urlArr, urlIsAbs, res = [];

    url = parse( url );
    urlArr = url.pathname.split( "/" );
    urlIsAbs = url.pathname.charAt( 0 ) === "/" ? "/" : "";

    normalizeArr( res, urlArr, !urlIsAbs );

    url.pathname = urlIsAbs + res.join( "/" );

    return format( url );

  };

  var resolve = function( base, url ) {

    var i, p, baseArr, urlArr, baseIsAbs, urlIsAbs;

    base = parse( base );
    url = parse( url );

    urlArr = url.pathname.split( "/" );

    baseIsAbs = base.pathname.charAt( 0 ) === "/" ? "/" : "";
    urlIsAbs = url.pathname.charAt( 0 ) === "/" ? "/" : "";

    if ( urlIsAbs ) {
      baseArr = [ "", "" ];
    } else {
      baseArr = base.pathname.split( "/" );
    }

    normalizeArr( baseArr, urlArr );

    base.pathname = baseIsAbs + urlIsAbs + baseArr.join( "/" );
    base.search = url.search;
    base.hash = url.hash;

    return format( base );

  };

  var join = function() {

    var i, arg, paths = [];

    for ( i = 0; i < arguments.length; i++ ) {
      arg = arguments[ i ];
      if ( arg && isString( arg ) ) {
        paths.push( arg );
      }
    }

    return path_normalize__normalize( paths.join( "/" ) );

  };

  function MotaPath( url ) {

  }

  MotaPath.parse = parse;
  MotaPath.resolve = resolve;
  MotaPath.format = format;
  MotaPath.normalize = path_normalize__normalize;
  MotaPath.join = join;

  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  // Support: Android<4.1
  // Make sure we trim BOM and NBSP
  var trim = function() {
    return this == null ? "" : ( this + "" ).replace( rtrim, "" );
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

    return trim.call( className );

  };

  var
  data = {},
  uid = 1,
  key = "vComp", // view component
  check = function( el ) {
    return el.nodeType && el.nodeType !== 3 ? 1 : el === el.window ? 2 : 0;
  };

  var motaViewData = {
    add: function( component ) {

      var id, el = component.el, c = check( el );

      if ( c ) {
        id = MotaData.get( el, key );
        if ( !id ) {
          id = uid++;
          MotaData.setup( el, key, id, c === 1 );
        }
        return ( data[ id ] = component );
      }

    },
    remove: function( el ) {

      var id = check( el ) && MotaData.get( el, key );

      if ( id ) {
        data[ id ] = null;
      }

    },
    get: function( el ) {
      return data[ check( el ) && MotaData.get( el, key ) ];
    }
  };

  
  var revent = /^on/;

  var styleSet = function( elem ) {
    if ( isArray( elem ) ) {
      return apply( extend, null, [ {} ].concat( elem ) );
    }
    return elem;
  };

  var cssPrefixes = [ "Webkit", "Moz", "ms" ],

  emptyStyle = document ? document.createElement( "div" ).style : {},

  // CSS properties which accept numbers but are not in units of "px"
  unitlessNumber = {
    boxFlex: 1,
    boxFlexGroup: 1,
    columnCount: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    fontWeight: 1,
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
    strokeDashoffset: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  },

  toCapName = function( key ) {
    return key.charAt( 0 ).toUpperCase() + key.substring( 1 );
  },

  cssProps = {},

  // Return a css property mapped to a potentially vendor prefixed property
  vendorPropName = function( name ) {

    var capName, i, origName = name;

    if ( cssProps[ name ] !== undefined ) {
      return cssProps[ name ];
    }

    // Shortcut for names that are not vendor prefixed
    if ( name in emptyStyle ) {
      cssProps[ name ] = name;
      return name;
    }

    // Check for vendor prefixed names
    capName = toCapName( name );
    i = cssPrefixes.length;

    while ( i-- ) {
      name = cssPrefixes[ i ] + capName;
      if ( name in emptyStyle ) {
        cssProps[ origName ] = name;
        return name;
      }
    }

    cssProps[ origName ] = false;

  },

  setStyle = function( style, _key, _value ) {

    var value, key, needsPx;

    key = vendorPropName( _key );

    if ( !key ) {

      // if DEVELOPMENT_MODE
      warn( "mota.view.Component.update", "`" + _key + "` is not a style property." ); // endif

      return;
    }

    value = _value == null || typeof _value === "boolean" ? "" : _value;

    needsPx = unitlessNumber[ key ] !== 1 && isNumber( value );

    value = needsPx ? value + "px" : trim.call( value + "" );

    if ( style[ key ] !== value ) {
      style[ key ] = value;
    }

  };

  motaKeys( unitlessNumber ).forEach( function( key ) {

    var i = cssPrefixes.length;

    while ( i-- ) {
      unitlessNumber[ cssPrefixes[ i ] + toCapName( key ) ] = 1;
    }

  } );

  var diffAttr = function( component, el, key, elemA, elemB ) {

    var i, className, eventName, style, styleRule, styleRules;

    if ( elemA === elemB ) {
      return;
    }

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
          el.innerHTML = elemB.__html;
        }

        return;

      case "style":

        style = el.style;

        elemA = styleSet( elemA ) || {};
        elemB = styleSet( elemB ) || {};

        // http://jsperf.com/for-in-vs-object-keys-while-loop

        styleRules = motaKeys( elemB );
        i = styleRules.length;

        while ( i-- ) {
          styleRule = styleRules[ i ];
          if ( elemA[ styleRule ] !== elemB[ styleRule ] ) {
            setStyle( style, styleRule, elemB[ styleRule ] );
          }
        }

        styleRules = motaKeys( elemA );
        i = styleRules.length;

        while ( i-- ) {
          styleRule = styleRules[ i ];
          if ( elemB[ styleRule ] === undefined ) {
            setStyle( style, styleRule, null );
          }
        }

        return;

      case "class":
      case "className":

        className = classSet( elemB );

        if ( el.nodeName === "svg" ) {

          if ( el.getAttribute( "class" ) !== className ) {
            el.setAttribute( "class", className );
          }

        } else {

          if ( el.className !== className ) {
            el.className = className;
          }

        }

        return;

      default:

        eventName = key.replace( revent, "" );

        if ( key !== eventName ) {

          eventName = eventName.toLowerCase();

          // Remove old if existed
          if ( elemA ) {
            events_main__events.off.call( component, eventName, elemA );
          }

          // Add if new is defined
          if ( elemB ) {
            events_main__events.on.call( component, eventName, elemB );
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

          // This check is also important when setting `value`,
          // to prevent cursor placement to break
          if ( el[ key ] !== elemB ) {
            el[ key ] = elemB;
          }

        } else {

          if ( elemB ) {
            el.setAttribute( key, elemB + "" );
          } else {
            el.removeAttribute( key );
          }

        }

        return;

    }

  };

  var typeId = 0;

  var createClass = function( proto ) {

    var name, __methods = [];

    function Constructor() {
      if ( this.initialize ) {
        apply( this.initialize, this, arguments );
      }
    }

    Constructor.displayName = proto.displayName;
    proto.displayName = undefined;

    if ( !proto || !isFunction( proto.render ) ) {
      err(
        "mota.view.createClass",
        "Provide an object with a `render` property containing a function"
      );
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

  var DefaultClazz = createClass( {
    render: function() {
      return this.props;
    }
  } );

  var diffChildren = function(
    self, children, noKeyIdx,
    prevChildren, prevChildrenMap,
    moves, insertions,
    newChildren, newChildrenMap,
    index, thisElChildNodes,
    data, tmpData
  ) {

    var placeholder, objType, props,
    pHType, pHTypeIsFunc,
    typeId, key, cacheIndex, component, prevComponent,
    i = 0, len = children ? children.length : i;

    for ( ; i < len ; i++ ) {

      placeholder = children[ i ];

      if ( placeholder == null || placeholder === false || placeholder === "" ) {
        continue;
      }

      objType = motaType( placeholder );

      if ( objType === "array" ) {

        index = diffChildren(
          self, placeholder, noKeyIdx,
          prevChildren, prevChildrenMap,
          moves, insertions,
          newChildren, newChildrenMap,
          index, thisElChildNodes,
          data, tmpData
        );

        continue;

      } else if ( objType !== "object" ) {

        placeholder = {
          type: "#textNode",
          text: placeholder + ""
        };

      }

      props = placeholder.props || {};

      pHType = placeholder.type;
      pHTypeIsFunc = isFunction( pHType );

      typeId = pHTypeIsFunc ? pHType.__type : pHType;

      if ( noKeyIdx[ typeId ] == null ) {
        noKeyIdx[ typeId ] = 0;
      }

      key = typeId + ( props.key == null ? ":noKey:" + noKeyIdx[ typeId ]++ : ":key:" + props.key );

      cacheIndex = prevChildrenMap && prevChildrenMap[ key ];

      // If existed in previous render
      if ( cacheIndex != null ) {

        prevComponent = prevChildren[ cacheIndex ];

        if ( prevChildren ) {

          // http://jsperf.com/for-delete-vs-for-undefined
          prevChildren[ cacheIndex ] = undefined;
        }

        component = prevComponent;

        // !important
        if ( !pHTypeIsFunc ) {
          component.props = placeholder;
        } else {
          component.props = component.componentWillReceiveProps( props );
        }

        moves.push( {
          component: component,
          index: index
        } );

      } else {

        if ( !pHTypeIsFunc ) {
          component = new DefaultClazz();
          component.props = placeholder;
        } else {
          component = new placeholder.type();
          component.props = component.componentWillReceiveProps( props );
        }

        update.call( component, data, {
          init: true,
          owner: pHTypeIsFunc ? component : self.__owner,
          currEl: thisElChildNodes[ index ]
        } );

        insertions.push( {
          component: component,
          index: index
        } );

      }

      newChildren[ index ] = component;
      newChildrenMap[ key ] = index;

      index++;

    }

    return index;

  };

  var create = function( type, config, children ) {

    var props = {}, propName, childrenLength, childArray, i, placeholder;

    if ( config != null ) {

      for ( propName in config ) {
        if ( utilities_has__has( config, propName ) ) {
          props[ propName ] = config[ propName ];

          // if DEVELOPMENT_MODE
          try {
            Object.freeze( props[ propName ] );
          } catch ( e ) { } // endif
        }
      }

    }

    childrenLength = arguments.length - 2;

    if ( childrenLength === 1 ) {

      props.children = isArray( children ) ? children : [ children ];

    } else if ( childrenLength > 1 ) {

      childArray = Array( childrenLength );

      for ( i = 0 ; i < childrenLength ; i++ ) {
        childArray[ i ] = arguments[ i + 2 ];
      }

      props.children = childArray;

    }

    // if DEVELOPMENT_MODE
    Object.freeze( props ); // endif

    placeholder = {
      type: type,
      props: props,
      __isPlaceholder: true
    };

    // if DEVELOPMENT_MODE
    Object.freeze( placeholder ); // endif

    return placeholder;

  };

  var voidElementTags = {
    area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1,
    img: 1, input: 1, keygen: 1, link: 1, menuitem: 1, meta: 1,
    param: 1, source: 1, track: 1, wbr: 1
  },

  clean = function( component ) {

    if ( component.componentWillUnmount ) {
      component.componentWillUnmount();
    }

    var children = component.__cache.children, i = children && children.length;

    motaViewData.remove( component.el );

    component.el = component.props = component.__cache = component.__owner = undefined;

    while ( i-- ) {
      clean( children[ i ] );
    }

  },

  setDataMota = function( el, data ) {
    var value = data && data.renderToString ? "server" : "client";
    if ( el && el.getAttribute ) {
      el.setAttribute( "data-mota", value );
    }
    return el;
  },

  exists = function( current, newEl, data ) {

    if ( !current || ( current.getAttribute && current.getAttribute( "data-mota" ) !== "server" ) ) {
      return setDataMota( newEl, data );
    }

    if (
      current.nodeType === newEl.nodeType &&
      current.nodeName === newEl.nodeName &&
      current.nodeValue === newEl.nodeValue
    ) {
      return setDataMota( current, data );
    }

    return setDataMota( newEl, data );

  };

  var update = function( data, tmpData ) {

    if ( !this.__cache ) {
      this.__cache = {};
    }

    if ( !tmpData ) {
      tmpData = {};
    }

    if ( tmpData.init && this.componentWillMount ) {
      this.componentWillMount();
    }

    var
    thisEl   = this.el,
    result   = this.render( create ) || {},
    type     = result.type,
    attrs    = result.props || {},
    children = attrs.children,

    cache = this.__cache,
    cacheResult = cache.result,
    cacheProps,

    errText,

    namespace, text,
    thisElChildNodes,
    prevChildren, prevChildrenMap,
    newChildren, newChildrenMap,
    insertions, moves, action, actionIdx,
    noKeyIdx, i, len,
    fragment, nextSibling, el,
    component, prevComponent,
    ignoreProps, ignoreChildren,

    prevAttrs, attrName, attrNames;

    if ( cacheResult === result ) {
      return;
    }

    cacheProps = cacheResult && cacheResult.props;
    ignoreProps = cacheProps === attrs;
    ignoreChildren = ( cacheProps && cacheProps.children ) === children;

    cache.result = result;

    if ( tmpData.init ) {
      this.__owner = tmpData.owner;
    }

    errText = this.__owner ? "Please check the code for the " +
      this.__owner.constructor.displayName + " component." : "";

    if ( tmpData.init ) {

      if ( typeof type === "string" ) {

        cache.type = type;

        if ( type === "#textNode" ) {

          thisEl = document.createTextNode( result.text );

        } else {

          if ( type === "script" || type === "style" ) {
            err(
              "mota.view.Component.update",
              "For security reasons, <script> and <style> elements are not allowed. " +
              errText
            );
          }

          if ( attrs.xmlns ) {
            namespace = attrs.xmlns;
          } else if ( type === "svg" ) {
            namespace = "http://www.w3.org/2000/svg";
          } else if ( type === "math" ) {
            namespace = "http://www.w3.org/1998/Math/MathML";
          }

          if ( namespace ) {
            thisEl = document.createElementNS( namespace, type );
          } else {
            thisEl = document.createElement( type );
          }

        }

        thisEl = this.el = exists( tmpData.currEl, thisEl, data );

        // Add data
        motaViewData.add( this );

      } else {

        err(
          "mota.view.Component.update",
          "`render` must return an object containing a `type` property " +
          "with a primitive string. " + errText
        );

      }

    }

    if ( !thisEl ) {
      err(
        "mota.view.Component.update",
        "The `el` property is missing"
      );
    }

    if ( type !== cache.type ) {
      err(
        "mota.view.Component.update",
        "You must not change the type of an component between updates. " +
        "You have changed '" + cache.type + "' to '" + type + "'. " +
        errText
      );
    }

    if ( voidElementTags[ type ] ) {
      if ( attrs.daugerousInnerHTML != null || ( children != null && children.length > 0 ) ) {
        err(
          "mota.view.Component.update",
          type + " is a void element tag and must not have `children` or " +
          "use `daugerousInnerHTML`. " +
          errText
        );
      }
    }

    if ( type === "#textNode" ) {
      text = result.text;
      if ( text != thisEl.nodeValue ) {
        thisEl.nodeValue = text;
      }
      return;
    }

    // DIFF ATTRS

    if ( ignoreProps ) {

      // We can leave here because `props` also contains the `children`
      return;
    }

    prevAttrs = cache.attrs || {};

    // http://jsperf.com/for-in-vs-object-keys-while-loop

    attrNames = motaKeys( attrs );
    i = attrNames.length;

    while ( i-- ) {
      attrName = attrNames[ i ];
      diffAttr( this, thisEl, attrName, prevAttrs[ attrName ], attrs[ attrName ] );
    }

    attrNames = motaKeys( prevAttrs );
    i = attrNames.length;

    while ( i-- ) {
      attrName = attrNames[ i ];
      if ( attrs[ attrName ] === undefined ) {
        diffAttr( this, thisEl, attrName, prevAttrs[ attrName ] );
      }
    }

    cache.attrs = attrs;

    // DIFF CHILDREN

    if ( ignoreChildren || voidElementTags[ type ] || attrs.daugerousInnerHTML != null ) {
      return;
    }

    prevChildren = cache.children;
    prevChildrenMap = cache.childrenMap;
    newChildren = [];
    newChildrenMap = {};
    insertions = [];
    moves = [];
    thisElChildNodes = thisEl.childNodes;
    noKeyIdx = {};

    diffChildren(
      this, children, noKeyIdx,
      prevChildren, prevChildrenMap,
      moves, insertions,
      newChildren, newChildrenMap,
      0, thisElChildNodes,
      data, tmpData
    );

    cache.children = newChildren;
    cache.childrenMap = newChildrenMap;

    // Do deletions first, then insertions, then moves
    // In this way, the number of DOM operations is reduced

    // DELETIONS

    i = prevChildren ? prevChildren.length : 0;

    while ( i-- ) {

      prevComponent = prevChildren[ i ];

      if ( !prevComponent ) {
        continue;
      }

      // If a completly new element is to be inserted in the same position
      // Don't remove the current one, just `replaceChild` later on

      component = newChildren[ i ];

      if ( !component || component.el.parentNode ) {

        // Otherwise, we are free to just remove this one

        prevChildren[ i ] = null; // !important

        thisEl.removeChild( prevComponent.el );

        clean( prevComponent );

      }

    }

    // INSERTIONS

    if ( !( prevChildren && prevChildren.length ) && newChildren.length > 10 ) {

      // Optimize for initial renders
      fragment = document.createDocumentFragment();
    }

    i = 0;
    len = insertions.length;

    for ( ; i < len ; i++ ) {

      if ( ISENVNODE ) { // work around a jsdom bug
        thisElChildNodes = thisEl.childNodes;
      }

      action = insertions[ i ];
      actionIdx = action.index;
      component = action.component;
      nextSibling = thisElChildNodes[ actionIdx ];
      el = component.el;

      if ( fragment ) {

        fragment.insertBefore( el, null );

      } else {

        prevComponent = prevChildren && prevChildren[ actionIdx ];

        // Replace or Insert
        if ( prevComponent ) {

          prevChildren[ actionIdx ] = null;

          thisEl.replaceChild( el, prevComponent.el );

          clean( prevComponent );

        } else {

          thisEl.insertBefore( el, nextSibling || null );

        }

      }

      if ( component.componentDidMount ) {
        component.componentDidMount();
      }

    }

    // MOVES

    i = 0;
    len = moves.length;

    for ( ; i < len ; i++ ) {

      if ( ISENVNODE ) { // work around a jsdom bug
        thisElChildNodes = thisEl.childNodes;
      }

      action = moves[ i ];
      component = action.component;
      nextSibling = thisElChildNodes[ action.index ];
      el = component.el;

      if ( component.shouldComponentUpdate && !component.shouldComponentUpdate() ) {
        continue;
      }

      if ( component.componentWillUpdate ) {
        component.componentWillUpdate();
      }

      // Update
      update.call( component, data );

      // Move
      if ( nextSibling !== el ) {
        thisEl.insertBefore( el, nextSibling || null );
      }

      if ( component.componentDidUpdate ) {
        component.componentDidUpdate();
      }

    }

    if ( fragment ) {
      thisEl.insertBefore( fragment, null );
    }

    // Setting value on <select> doesn't work before children exist
    // So set it again after children have been created
    if ( type === "select" ) {
      diffAttr( this, thisEl, "value", prevAttrs.value, attrs.value );
    }

  };

  function MotaViewComponent() {}

  extend( MotaViewComponent.prototype, events_main__events, {
    update: function() {
      update.call( this );
    },
    componentWillReceiveProps: function( newProps ) {
      return newProps;
    },
    bindMethodsToThis: function() {

      var name, i = this.__methods.length, original;

      while ( i-- ) {
        name = this.__methods[ i ];
        original = this[ name ];
        this[ name ] = original.bind( this );
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

  var render = function( placeholder, parent, callback ) {

    if ( placeholder && placeholder.__isPlaceholder !== true ) {
      err(
        "mota.view.render",
        "Please provide a valid placeholder created with `mota.view.create`."
      );
    }

    // if DEVELOPMENT_MODE
    if ( document && parent === document.body ) {
      warn(
        "mota.view.render",
        "You're trying to render a component into `document.body`, " +
        "which is often manipulated by third party scripts. " +
        "This may lead to subtle reconciliation issues."
      );
    } // endif

    var parentComponent = select( parent );

    if ( !parentComponent ) {
      err( "mota.view.render", "`parent` should be an DOM element" );
    }

    parentComponent.render = function() {
      return {
        props: { children: [ placeholder ] }
      };
    };

    parentComponent.update();

    if ( isFunction( callback ) ) {
      callback();
    }

    return parentComponent.__cache.children[ 0 ];

  };

  var renderToString = function( placeholder ) {

    var parentComponent = select( document.createElement( "div" ) );

    parentComponent.render = function() {
      return {
        props: { children: [ placeholder ] }
      };
    };

    update.call( parentComponent, { renderToString: true } );

    return parentComponent.el.innerHTML;

  };

  var now = Date.now;

  var eventProps = {},

  addEventGetter = function( name ) {

    eventProps[ name ] = true;

    Object.defineProperty( MotaViewEvent.prototype, name, {
      enumerable: true,
      configurable: true,

      get: function() {
        var value, hook;

        if ( this.originalEvent ) {
          hook = hooks[ name ];
          value = hook ? hook( this.originalEvent ) : this.originalEvent[ name ];
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

  },

  MotaViewEvent = function( src ) {

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
    if ( this.type in view_events__eventTypes ) {
      this.type = view_events__eventTypes[ this.type ];
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

  var

  rkeyEvent = /^key/,
  rpointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/,
  view_events__eventTypes = {
    mousewheel: "wheel",
    DOMMouseScroll: "whell"
  },

  hooks = {
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
    pageX: function( event ) {

      var eventDoc, doc, body;

      if ( event.pageX == null && event.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        return event.clientX +
          ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
          ( doc && doc.clientLeft || body && body.clientLeft || 0 );
      }

      return event.pageX;

    },
    pageY: function( event ) {

      var eventDoc, doc, body;

      if ( event.pageY == null && event.clientY != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        return event.clientY +
          ( doc && doc.scrollTop || body && body.scrollTop  || 0 ) -
          ( doc && doc.clientTop || body && body.clientTop  || 0 );
      }

      return event.pageY;

    }
  };

  motaKeys( hooks ).forEach( addEventGetter );

  var getNext = function( current, target ) {
    if ( !current ) {
      return target;
    }
    if ( current.parentNode ) {
      return current.parentNode;
    }
    if ( isDocument( current ) ) {
      return current.defaultView;
    }
  },

  forEachEventListener = function( events, eventListener, data, event ) {

    var handler = eventListener.handler;

    eventsApiTriggerBeforeFiring.call( this, events, eventListener, data );

    if ( event.isImmediatePropagationStopped ) {
      return false;
    }

    event.currentTarget = this.el;

    if ( handler ) {
      event.result = handler.call(
        eventListener.context !== undefined ? eventListener.context : this,
        event
      );
    }

  },

  dispatchEvents = function( event ) {

    event = new MotaViewEvent( event );

    var
    target = event.target,
    type = event.type,
    curTargetDOM, curTargetCOMPONENT;

    while ( !event.isPropagationStopped && ( curTargetDOM = getNext( curTargetDOM, target ) ) ) {

      if ( !event.bubbles ) {
        event.stopPropagation();
      }

      curTargetCOMPONENT = motaViewData.get( curTargetDOM );

      eventsApi(
        curTargetCOMPONENT, "trigger", forEachEventListener, {
          eventType: type,
          handler: undefined,
          context: undefined
        }, event
      );

    }

  },

  additionalEvents = {
    "pointermove": 1,
    "pointerdown": 1,
    "pointerup": 1,
    "pointerover": 1,
    "pointerout": 1,
    "pointerenter": 1,
    "pointerleave": 1,
    "pointercancel": 1
  };

  
  var view_events__events = function() {

    if ( window.addEventListener ) {

      var name, eventName;

      for ( name in window ) {
        eventName = name.replace( revent, "" );
        if ( name !== eventName ) {
          if ( !( eventName in additionalEvents ) ) {
            window.addEventListener( eventName, dispatchEvents );
          }
        }
      }

      motaKeys( additionalEvents ).forEach( function( name ) {
        window.addEventListener( name, dispatchEvents );
      } );

    }

  };

  view_events__events();

  var view = {
    classSet: classSet,
    Component: MotaViewComponent,
    create: create,
    createClass: createClass,
    render: render,
    renderToString: renderToString,
    select: select,
    styleSet: styleSet
  };

  var helper_normalize__normalize = function( fragment ) {
    return resolve( "/", fragment );
  };

  var

  rstripper = /^\/+|\/+$/g,

  cache = {},

  replace = function( str ) {
    return str.replace( rescape, "\\$&" )
              .replace( roptional, "(?:$1)?" )
              .replace( rnamed, function( match, optional ) {
                return optional ? match : "([^/?]+)";
              } )
              .replace( rsplat, "([^?]*)" );
  },

  getParams = function( str ) {

    var regexp, names, params = cache[ str ];

    if ( params ) {
      return params;
    }

    regexp = new RegExp( "^" + replace( str ) );
    names = ( str.match( rparams ) || [] ).map( function( name ) {
      return name.slice( 1 );
    } );
    params = {
      regexp: regexp,
      names: names
    };

    return ( cache[ str ] = params );

  };

  
  function MotaRouterRoute( name, path, callback, parent ) {

    if ( !name ) {
      err( "mota.Router.route", "Provide a name for this route" );
    }

    if ( !path ) {
      err( "mota.Router.route", "Provide a non-empty path" );
    }

    this.name = name;

    this.parent = parent;

    this.path = ( parent.path || "" ) + "/" + path.replace( rstripper, "" );
    this.params = getParams( this.path );

    this.routes    = [];
    this.routesMap = {};

    if ( isFunction( callback ) ) {
      callback.call( this );
    }

  }

  MotaRouterRoute.prototype = {

    constructor: MotaRouterRoute,

    normalize: helper_normalize__normalize,

    route: function( name, path, callback ) {

      var route = new MotaRouterRoute( name, path, callback, this );

      if ( this.routesMap[ route.name ] ) {
        motaErr( "mota.Router.route", "There is already a route with the name `" + name + "`" );
      }

      this.routes.push( route );
      this.routesMap[ route.name ] = route;

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

  var Router_main__rhash = /#(.*)$/;

  function MotaRouter() {

    this.routes    = [];
    this.routesMap = {};

    this.location = window.location;
    this.history = window.history;
    this.window = view.select( window );
    this._hasPushState = !!( this.history && this.history.pushState );

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

    atRoot: function() {
      if ( this.location.search ) {
        return false;
      }
      return this.root === this.normalize( this.location.pathname );
    },

    checkUrl: function( e ) {

      // After a "hashchange" event, this callback becames ansync
      // And `location.href` might change,
      // So, using `event.newURL` becames more reliable
      if ( e && e.type === "hashchange" ) {
        return this.triggerRoutes( this.fragment = this.getHash( e.newURL ) );
      }
      return this.triggerRoutes( this.fragment = this.getFragment() );
    },

    getHash: function( href ) {

      // Cannot use location.hash directly due to bug
      // in Firefox where location.hash will always be decoded
      var match = ( href || this.location.href ).match( Router_main__rhash );
      return this.normalize( match ? match[ 1 ] : "" );
    },

    getPath: function() {
      var root = this.root,
      path = this.location.pathname + this.location.search;

      if ( path.indexOf( root ) === 0 ) {
        path = path.slice( root.length );
      }
      return this.normalize( path );
    },

    getFragment: function() {
      return this.normalize( this._hasPushState ? this.getPath() : this.getHash() );
    },

    start: function( options ) {

      if ( this._started ) {
        return;
      }
      this._started = true;

      this.root = this.normalize( options && options.root );

      var fragment = this.getFragment();

      // Handle transition from hashChange to pushState or vice versa
      if ( !this._hasPushState && !this.atRoot() ) {

        this.location.replace( this._join( "/#" + this.getPath() ) );

        // Return immediately as browser will do redirect to new url
        // No need to trigger routes
        return;

      } else if ( this._hasPushState && this.atRoot() ) {

        // `navigate` will trigger routes
        this.navigate( this.getHash(), { replace: true } );

      } else {

        // We should trigger the routes...
        this.triggerRoutes( fragment );

        // ...and set `fragment` since we don't call `navigate`
        this.fragment = fragment;

      }

      this.window.on( this._hasPushState ? "popstate" : "hashchange", this.checkUrl, this );

    },

    stop: function() {

      if ( !this._started ) {
        return;
      }
      this._started = false;

      this.window.off( this._hasPushState ? "popstate" : "hashchange", this.checkUrl, this );

    },

    navigate: function( fragment, options ) {

      var href;

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

      if ( this._hasPushState ) {

        this.history[
          options.replace ? "replaceState" : "pushState"
        ]( {}, document.title, this._join( fragment ) );

        this.triggerRoutes( fragment );

      } else {

        if ( options.replace ) {
          href = location.href.replace( /(javascript:|#).*$/, "" );
          this.location.replace( href + "#" + fragment );
        } else {

          // Some browsers require that `hash` contains a leading #
          this.location.hash = "#" + fragment;
        }

        // `triggerRoutes` will be called after the `hashchange` event

      }

    }

  } );

  function mota() {}

  mota.VERSION = "0.8.1";

  utilities.extend( mota, utilities, {
    hashCode: hash,
    events: events_main__events,
    Map: MotaMap,
    Model: MotaModel,
    path: MotaPath,
    Router: MotaRouter,
    util: utilities,
    view: view,
    setWindow: setWindow
  } );

  
  mota.developmentMode = false;

  // if DEVELOPMENT_MODE
  mota.developmentMode = true; // endif

  return mota;

} ) );
