/*!
 * MotaJS v0.16.2
 * http://jdmota.github.io/motajs/
 *
 * Released under the MIT license
 * https://github.com/jdmota/MotaJS/blob/master/LICENSE.md
 *
 * Project
 * https://github.com/jdmota/MotaJS
 *
 * Date: 2016-07-21T12:28Z
 */
( function() {

var nativeObject = Object;

function checkGlobal( value ) {
  return ( value && value.Object === nativeObject ) ? value : null;
}

var freeExports = typeof exports == "object" && exports;

var freeModule = freeExports && typeof module == "object" && module;

var moduleExports = freeModule && freeModule.exports === freeExports;

var freeGlobal = checkGlobal( typeof global == "object" && global );

var isEnvNode = !!freeGlobal;

var freeSelf = checkGlobal( typeof self == "object" && self );

var freeWindow = checkGlobal( typeof window == "object" && window );

/* eslint no-new-func: 0 */
var root = freeGlobal || freeSelf || Function( "return this" )();

var d = Object.defineProperty;

var hasOwn = {}.hasOwnProperty;
var objectProto = Object.prototype;
var nativeKeys = Object.keys;
var nativeIsFinite = isFinite;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

var ObjectGetOwnSymbols = Object.getOwnPropertySymbols;
var getSymbols;

if ( ObjectGetOwnSymbols ) {
  getSymbols = function( object ) {
    return ObjectGetOwnSymbols( Object( object ) );
  };
}

var getOwnPropertySymbols = getSymbols;

function baseAssigner( setter, output, source, _in, customizer, srcIndex, _stack ) {

  var stack = _stack;

  for ( var key in source ) {
    if ( _in || hasOwn.call( source, key ) ) {
      stack = setter( output, source, key, customizer, srcIndex, stack );
    }
  }

  if ( getOwnPropertySymbols ) {
    var symbols = getOwnPropertySymbols( source );
    for ( var j = 0; j < symbols.length; j++ ) {
      var symbol = symbols[ j ];
      if ( propIsEnumerable.call( source, symbol ) ) {
        stack = setter( output, source, symbol, customizer, srcIndex, stack );
      }
    }
  }

}

function createAssigner( assigner, setter, _in, hasCustomizer ) {

  return function( target ) {

    var output = Object( target );
    var len = hasCustomizer ? arguments.length - 1 : arguments.length;
    var customizer = hasCustomizer ? arguments[ len ] : undefined;

    if ( hasCustomizer && typeof customizer !== "function" ) {
      customizer = undefined;
      len++;
    }

    for ( var i = 0; i < len; i++ ) {

      var source = arguments[ i + 1 ];

      // Ignore null or undefined sources and prevent infinite loop
      if ( source != null && source !== output ) {
        assigner( setter, output, source, _in, customizer, i );
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

var assign = createAssigner( baseAssigner, baseSet, false, false );

var assignIn = createAssigner( baseAssigner, baseSet, true, false );

var assignInWith = createAssigner( baseAssigner, baseSetWithCustomizer, true, true );

var assignWith = createAssigner( baseAssigner, baseSetWithCustomizer, false, true );

var PRIVATE_METHODS = {};

function EXPOSE( name, obj ) {
  PRIVATE_METHODS[ name ] = obj;
}

var tagsList = [
  "Arguments",
  "Array",
  "Boolean",
  "Date",
  "Error",
  "Function",
  "GeneratorFunction",
  "Map",
  "Number",
  "Object",
  "Promise",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "DataView"
];

var tagTypeArrayList = [
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array"
];

var tags = {};
var typedArrayTags = {};
var isTypedArrayMap = {};

tagsList.forEach( function( name ) {
  tags[ name ] = "[object " + name + "]";
} );

tagTypeArrayList.forEach( function( name ) {
  var tag = "[object " + name + "]";
  typedArrayTags[ name ] = tags[ name ] = tag;
  isTypedArrayMap[ tag ] = true;
} );

var _toString = ( {} ).toString;

var getTag = function( obj ) {
  return _toString.call( obj );
};

var SYMBOL_SUPPORT = typeof Symbol === "function" && !( isEnvNode && /^v0/.test( process.version ) );

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

var symbolProto = SYMBOL ? SYMBOL.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

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
    return obj === null ? "null" : types[ getTag( obj ) ] || "object";
  }
  return type;
}

var isFunc = function( obj ) {
  return typeof obj == "function" || false;
};

// Work around an IE 11 bug
// Work around a Safari 8 bug: `typeof Int8Array` returns "object"
if ( typeof /./ == "function" || typeof Int8Array == "object" ) {
  isFunc = function( obj ) {
    return motaType( obj ) === "function";
  };
}

var isFunction = isFunc;

function isArguments( obj ) {
  return getTag( obj ) === tags.Arguments;
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

var BUFFER = moduleExports ? freeGlobal.Buffer : undefined;
var nativeIsBuffer = BUFFER ? BUFFER.isBuffer : undefined;

var isBuffer = nativeIsBuffer || function() {
  return false;
};

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

  var className = getTag( obj );
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

function isTypedArray( obj ) {
  return typeof obj == "object" && typeof obj.length == "number" && !!isTypedArrayMap[ getTag( obj ) ];
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

  var className = getTag( obj );

  return className === strWin || className === strWin2;

}

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
        d( obj, EXPANDO, { writable: true, value: data } );
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

function EventListener( type, namespaces, handler, context, isRegExp ) {
  this.type = type;
  this.namespaces = namespaces;
  this.handler = handler;
  this.context = context;
  this.isRegExp = isRegExp;
  this.once = false;
  this._index = -1;
}

var reNotwhite = /\S+/g;
var reNamespace = /\.[^.]+/g;
var reType = /^[^.]+/g;

function buildListeners( eventType, handler, context, result ) {

  var i, noopArr = [ "" ],
      eventTypes, type, namespaces,
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
      buildListeners( type, eventType[ type ], context, result );
    }

  // Handle eventType: "type1 type2", handler, context
  } else {

    eventTypes = ( eventType || "" ).match( reNotwhite ) || noopArr;

    // Handle multiple events separated by a space
    for ( i = 0; i < eventTypes.length; i++ ) {

      type = eventTypes[ i ];

      namespaces = type.match( reNamespace );
      type = ( type.match( reType ) || noopArr )[ 0 ];

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
  var arr1, arr2, i = 0;

  if ( parArr1.length > parArr2.length ) {
    // I want arr1 to be the one that has less length
    arr1 = parArr2;
    arr2 = parArr1;
  } else {
    arr1 = parArr1;
    arr2 = parArr2;
  }

  for ( ; i < arr1.length; i++ ) {
    if ( arr2.indexOf( arr1[ i ] ) > -1 ) {
      return true;
    }
  }

  return false;
}

function typeEquals( a, b ) {
  return a === b || ( "" + a === "" + b && motaType( a ) === motaType( b ) );
}

function getMatch( thisListener, type, namespaces, handler, context, tryToMatch ) {

  var match;
  var didMatch = (
    (
      !type || typeEquals( thisListener.type, type ) ||
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
      var match = getMatch( listener, type, namespaces, handler, context, tryToMatch );
      if ( match ) {
        results.push( { listener: listener, string: type, match: match } );
        return !onlyFirst;
      }
    } );

  }

}, SmartListProto );

function setup( obj ) {
  return Data.setup( obj, "events", new EventListenerList() );
}

var eventsApi = function( object, action, callback, eventType, handler, context, arg ) {

  var i, eventListenerList, listeners, listener, results, count = 0;

  eventListenerList = action === "on" ? setup( object ) : Data.get( object, "events" );

  if ( !eventListenerList ) {
    return count;
  }

  listeners = buildListeners( eventType, handler, context, [] );

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

  } else {

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

function getListeners( eventType, handler, context ) {
  var result = [];
  eventsApi( this, "get", eventsApiGet, eventType, handler, context, result );
  return result;
}

function getMaxListeners() {
  var events = Data.get( this, "events" );
  var n = events && events._maxListeners;
  return typeof n === "number" ? n : false;
}

function hasListeners( eventType, handler, context ) {
  var count = eventsApi( this, "getFirst", undefined, eventType, handler, context );
  return count > 0;
}

var eventsApiOff = function( object, eventListenerList, data ) {
  var listener = data.listener;

  // Edge case: unbind a callback in the midst of its firing
  listener.handler = undefined;

  eventListenerList.remove( listener );
};

function off( eventType, handler, context ) {
  eventsApi( this, "off", eventsApiOff, eventType, handler, context );
  return this;
}

function noop() {}

var on;

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

  on.hook( object, listener.type );

};

on = function( eventType, handler, context, once ) {
  eventsApi( this, "on", eventsApiOn, eventType, handler, context, once );
  return this;
};

on.hook = noop;

var on$1 = on;

function once$1( eventType, handler, context ) {
  return on$1.call( this, eventType, handler, context, true );
}

function setMaxListeners( n ) {
  setup( this )._maxListeners = typeof n !== "number" || n < 0 || isNaN( n ) ? undefined : n;
  return this;
}

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

function trigger( eventType ) {
  eventsApi( this, "trigger", eventsApiTrigger, eventType, undefined, undefined, sliceArgs( arguments, 1 ) );
  return this;
}

var Events = {
  getListeners: getListeners,
  getMaxListeners: getMaxListeners,
  hasListeners: hasListeners,
  off: off,
  on: on$1,
  once: once$1,
  setMaxListeners: setMaxListeners,
  trigger: trigger
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
    return ( this.fragment = normalize( l.pathname ) + l.search + l.hash );
  },

  triggerRoutes: function( path ) {
    if ( this.router ) {
      this.router.handle( { url: path, method: "GET" }, {}, this.callback );
    }
  },

  checkUrl: function() {
    this.triggerRoutes( this.getFragment() );
  },

  start: function( opts ) {
    if ( this.window && !this._started ) {
      this._started = true;
      if ( !opts || !opts.ignoreCurrent ) {
        this.checkUrl();
      } else {
        this.getFragment();
      }
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
    var pathname = normalize( path );
    if ( this._started && this.fragment !== pathname ) {
      this.fragment = pathname;
      if ( replace ) {
        this.history.replaceState( {}, this.document.title, pathname );
      } else {
        this.history.pushState( {}, this.document.title, pathname );
      }
      this.triggerRoutes( pathname );
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

function eq( a, b ) {
  /* eslint no-self-compare: 0 */
  return a === b || ( a !== a && b !== b );
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

var addNotEnumProp = function( obj, name, value ) {
  d( obj, name, {
    writable: true,
    configurable: true,
    value: value
  } );
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

function isSubClosed( sub ) {
  return sub._observer === undefined;
}

function closeSub( sub, error ) {
  if ( isSubClosed( sub ) ) {
    return;
  }
  sub._observer = undefined;
  cleanupSub( sub, error );
}

function cleanupSub( subscription, error ) {
  var clean = subscription._cleanup;
  if ( clean ) {
    subscription._cleanup = undefined;
    if ( error ) {
      try {
        clean();
      } catch ( e ) {}
    } else {
      clean();
    }
  }
  if ( error ) {
    throw error;
  }
}

var Observer = function( sub ) {
  this.sub = sub;
};

var proto = Observer.prototype = {};

function handleNext( sub, value ) {

  var result, handler, observer = sub._observer;

  if ( !isSubClosed( sub ) ) {
    try {
      handler = getMethod( observer.next );
      if ( handler ) {
        result = handler.call( observer, value );
      }
    } catch ( e ) {
      closeSub( sub, e );
    }
  }

  return result;

}

function handleComplete( sub, value ) {

  var result, handler, observer = sub._observer;

  if ( !isSubClosed( sub ) ) {
    sub._observer = undefined;
    try {
      handler = getMethod( observer.complete );
      if ( handler ) {
        result = handler.call( observer, value );
      }
    } catch ( e ) {
      cleanupSub( sub, e );
    }
    cleanupSub( sub );
  }

  return result;

}

function handleError( sub, reason ) {

  var result, handler, error, observer = sub._observer;

  if ( isSubClosed( sub ) ) {
    throw reason;
  } else {
    sub._observer = undefined;
    try {
      handler = getMethod( observer.error );
      if ( handler ) {
        result = handler.call( observer, reason );
      } else {
        error = reason;
      }
    } catch ( e ) {
      error = e;
    }
    cleanupSub( sub, error );
  }

  return result;

}

addNotEnumProp( proto, "next", function( value ) {
  return handleNext( this.sub, value );
} );

addNotEnumProp( proto, "complete", function( value ) {
  return handleComplete( this.sub, value );
} );

addNotEnumProp( proto, "error", function( reason ) {
  return handleError( this.sub, reason );
} );

d( proto, "closed", {
  get: function() {
    return isSubClosed( this.sub );
  },
  configurable: true
} );

function getSpecies( fn ) {
  return getBySymbol( fn, "species" ) || fn;
}

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

function initObservable( fn, observer ) {
  var cancel = fn( observer );
  if ( cancel != null ) {
    if ( isFunction( cancel.unsubscribe ) ) {
      cancel = cancel.unsubscribe.bind( cancel );
    } else if ( !isFunction( cancel ) ) {
      throw new TypeError( cancel + " is not a function" );
    }
  }
  return cancel;
}

var Subscription = function( observer, fn, _unsub ) {

  var cleanup, error, start;

  if ( Object( observer ) !== observer ) {
    throw new TypeError( "Observer must be an object" );
  }

  this._cleanup = undefined;
  this._observer = observer;
  this._index = -1;
  this._unsub = _unsub;

  start = getMethod( observer.start );

  if ( start ) {
    start.call( observer, this );
  }

  if ( isSubClosed( this ) ) {
    return;
  }

  observer = new Observer( this );

  if ( !_unsub ) {

    try {
      cleanup = initObservable( fn, observer );
    } catch ( e ) {
      error = e;
    }

    if ( error ) {
      return observer.error( error );
    }
  }

  this._cleanup = cleanup;

  // If the stream is already finished, then perform cleanup
  if ( isSubClosed( this ) ) {
    cleanupSub( this );
  }

};

var proto$2 = Subscription.prototype = {};

addNotEnumProp( proto$2, "unsubscribe", function() {
  if ( isSubClosed( this ) ) {
    return;
  }
  if ( this._unsub ) {
    this._unsub( this );
  }
  closeSub( this );
} );

d( proto$2, "closed", {
  get: function() {
    return isSubClosed( this );
  },
  configurable: true
} );

var Observable = function( _subscriber ) {
  if ( !isFunction( _subscriber ) ) {
    throw new TypeError( "Observable initializer must be a function" );
  }
  this._subscriber = _subscriber;
};

var proto$1 = Observable.prototype;

addNotEnumProp( proto$1, "lift", function( operator ) {
  var source = this;
  var C = getSpecies( this.constructor );
  return new C( function( observer ) {
    return source.subscribe( operator.call( observer ) );
  } );
} );

addNotEnumProp( proto$1, "subscribe", function( observer ) {
  return new Subscription(
    isFunction( observer ) ? {
      next: observer,
      error: arguments[ 1 ],
      complete: arguments[ 2 ]
    } : observer,
    this._subscriber
  );
} );

addNotEnumProp( proto$1, "toPromise", function() {
  var self = this;
  return new MotaPromise( function( resolve, reject ) {
    self.subscribe( {
      complete: resolve,
      error: reject
    } );
  } );
} );

addNotEnumProp( proto$1, "forEach", function( fn ) {
  var self = this;
  var thisArg = arguments[ 1 ];
  return new MotaPromise( function( resolve, reject ) {

    if ( !isFunction( fn ) ) {
      throw new TypeError( fn + " is not a function" );
    }

    self.subscribe( {
      _subscription: null,
      start: function( sub ) {
        this._subscription = sub;
      },
      next: function( value ) {
        var sub = this._subscription;
        if ( sub.closed ) {
          return;
        }
        try {
          return fn.call( thisArg, value );
        } catch ( e ) {
          reject( e );
          sub.unsubscribe();
        }
      },
      error: reject,
      complete: resolve
    } );

  } );
} );

addNotEnumProp( proto$1, "map", function( fn ) {
  if ( !isFunction( fn ) ) {
    throw new TypeError( fn + " is not a function" );
  }
  return this.lift( new MapOperator( fn, arguments[ 1 ] ) );
} );

addNotEnumProp( proto$1, "filter", function( fn ) {
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

  if ( !isIterable( x ) ) {
    throw new TypeError( x + " is not observable" );
  }

  return new C( function( observer ) {

    forEach( x, function( item ) {
      observer.next( item );
      if ( observer.closed ) {
        return forEach.BREAK;
      }
    } );

    observer.complete();

  } );

} );

addNotEnumProp( Observable, "of", function() {
  var items = arguments;
  var C = isFunction( this ) ? this : Observable;
  return new C( function( observer ) {
    for ( var i = 0; i < items.length; i++ ) {
      observer.next( items[ i ] );
      if ( observer.closed ) {
        return;
      }
    }
    observer.complete();
  } );
} );

addNotEnumProp( proto$1, getSymbol( "observable" ), function() {
  return this;
} );

d( Observable, getSymbol( "species" ), {
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
      handleNext( sub, v );
    } );
  },

  error: function( e ) {
    var multicast = this.multicast;
    multicast._state = REJECTED;
    multicast._value = e;
    multicast._subs.safeForEach( function( sub ) {
      handleError( sub, e );
    } );
    multicast._subs = null;
  },

  complete: function( v ) {
    var multicast = this.multicast;
    multicast._state = FULFILLED;
    multicast._value = v;
    multicast._subs.safeForEach( function( sub ) {
      handleComplete( sub, v );
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

    if ( isFunction( observer ) ) {
      observer = {
        next: observer,
        error: arguments[ 1 ],
        complete: arguments[ 2 ]
      };
    }

    if ( this._state === PENDING ) {

      sub = new Subscription( observer, null, this._cancel );
      this._subs.add( sub );

    } else {

      sub = new Subscription( observer, noop );

      if ( this._state === FULFILLED ) {
        handleComplete( sub, this._value );
      } else {
        handleError( sub, this._value );
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

function toString( value ) {
  return value == null ? "" : baseToString( value );
}

var reRegExpChar = /[\\.+*?=^!:${}()[\]|\/]/g;

var reHasRegExpChar = new RegExp( reRegExpChar.source );

function escapeRegExp( str ) {
  var string = toString( str );
  return ( string && reHasRegExpChar.test( string ) ) ? string.replace( reRegExpChar, "\\$&" ) : string;
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

    runAsync( next );

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

var KEY = "view";

function check( el ) {
  if ( el.nodeType && el.nodeType !== 3 ) {
    return 1;
  }
  return el === el.window ? 2 : 0;
}

var motaViewData = {
  add: function( el, component ) {
    var c = check( el );
    return c && Data.setup( el, KEY, component, c === 1 );
  },
  remove: function( el ) {
    return check( el ) && Data.remove( el, KEY );
  },
  get: function( el ) {
    return check( el ) && Data.get( el, KEY );
  }
};

function keys( obj ) {
  if ( obj == null ) {
    return [];
  }
  return nativeKeys( Object( obj ) );
}

function classSet( elem ) {

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

    names = keys( elem );
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

}

function ViewComponent() {
  this.__internal__ = null;
  this.props = null;
}

d( ViewComponent.prototype, "__internal__", { enumerable: false, writable: true } );

function err( funcName, msg ) {
  throw new Error( funcName + " ERROR: " + msg );
}

function createClass( proto ) {

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

  for ( var name in proto.statics ) {
    Constructor[ name ] = proto.statics[ name ];
  }

  Constructor.prototype = new ViewComponent();

  proto = assign( Constructor.prototype, proto );
  proto.constructor = Constructor;

  return Constructor;

}

function Blank() {}
Blank.prototype = ObjectCreate( null );

var VOID_ELEMENTS = {
  "#text": true, "#comment": true,
  area: true, base: true, br: true, col: true, command: true,
  embed: true, hr: true, img: true, input: true, keygen: true,
  link: true, menuitem: true, meta: true, param: true,
  source: true, track: true, wbr: true
};

function init( type, nextProps, ref, parentInternal, key, index ) {

  var component = this.component;

  this.index = index;
  this.parentInternal = parentInternal;
  this.parentEl = parentInternal.el;

  this.key = key;

  if ( !component ) { // If we are working with a "native component"
    this.owner = parentInternal.owner;
    this.depth = parentInternal.depth;
    dom.setType( type, nextProps );
    motaViewData.add( this.el, this );
    if ( ref ) {
      ref( this.el );
    }
    return;
  }

  
  // If we are working with a custom component
  this.owner = component;
  this.depth = parentInternal.depth + 1;

  this.dontQueue = true;

  this.props = component.props = this.validateProps( nextProps );

  if ( component.initialize ) {
    component.initialize();
  }

  if ( ref ) {
    ref( component );
  }

  if ( component.componentWillMount ) {
    component.componentWillMount();
  }

  this.queued = false;
  this.dontQueue = false;

  component.render( dom, this.props );

  if ( !this.el ) {
    this.updater.error( "You must use `setType` inside the render method." );
  }

  motaViewData.add( this.el, component );

  if ( component.componentDidMount ) {
    this.updater.queueCallback( component, "componentDidMount" );
  }

}

function queueUpdate( force ) {

  if ( this.dontQueue ) {
    return;
  }

  // If not queued yet, queue
  if ( !this.queued ) {
    this.queued = true;
    this.force = !!force;
    this.updater.queueUpdate( this );

  // If already queued, update `this.force` -> `true` if needed
  // Never update `this.force` from `true` to `false`
  } else if ( force ) {
    this.force = true;
  }

}

function clean( self ) {

  var component = self.component || self;

  self.dontQueue = true;
  self.queued = false;

  if ( component.componentWillUnmount ) {
    component.componentWillUnmount();
  }

  motaViewData.remove( self.el );

  self.el = component.__internal__ = null;

  self.traverse( clean );

}

function remove() {
  this.updater.queueElemDeletion( this.el );
  clean( this );
}

function update( _props ) {

  var component = this.component, prevProps = this.props, shouldUpdate, nextProps = _props, value;

  if ( this.type === "#text" || this.type === "#comment" ) {
    value = nextProps ? nextProps + "" : "";
    if ( this.el.nodeValue !== value ) {
      this.updater.queueAttrUpdate( this, "nodeValue", value, "prop" );
    }
    return;
  }

  if ( !component ) {
    return;
  }

  this.dontQueue = true;

  if ( nextProps == null ) {

    nextProps = this.props;

  } else {

    nextProps = this.validateProps( nextProps );

    if ( component.componentWillReceiveProps ) {
      component.componentWillReceiveProps( nextProps );
    }

  }

  if ( !this.force && component.shouldComponentUpdate ) {

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

      // After closing the element, this values will be reset
      // Just simulate that a reconciliation happened
      this.itIndex = this.length;
      this.newAttrs = this.prevAttrs;
      this.prevAttrs = null;
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

  component.render( dom, nextProps );

  if ( component.componentDidUpdate ) {
    this.updater.queueCallback( component, "componentDidUpdate", prevProps );
  }

}

function ViewInternal( root, component ) {

  this.root = root;
  this.updater = root.updater;

  // For "native" components, this is null
  this.component = component;

  this.__internal__ = component ? null : this;

  // It's `true` when this component needs an update.
  // Should be `true` until the initial rendering starts.
  this.queued = false;

  // It's `true` when we want to prevent posterior queueing
  this.dontQueue = false;

  // If the update process should ignore `shouldComponentUpdate`
  this.force = false;

  // Contains all the child components
  this.array = null;
  this.map = null;
  this.length = 0;

  this.isNativeMounted = false;
  this.justCreated = true;

  this.depth = -1;

  this.type = undefined;
  this.hasAttrs = true;
  this.isVoid = false;

  this.parentInternal = null;
  this.parentEl = null;

  this.key = undefined;
  this.index = 0;

  this.el = null;
  this.props = null;

  this.itIndex = 0;
  this.itEl = null;
  this.noKeyIdx = null;
  this.textBuffer = "";
  this.didSomeMove = false;

  this.newAttrs = null;
  this.prevAttrs = null;

}

ViewInternal.prototype = {

  constructor: ViewInternal,

  validateProps: function( p ) {
    var comp = this.component;
    var validate = comp.constructor && comp.constructor.validateProps;
    var props = p || {};
    return ( validate && validate( props ) ) || props;
  },

  initVars: function( t ) {

    var type = t.toLowerCase();

    this.type = type;
    this.hasAttrs = type !== "#text" && type !== "#comment";
    this.isVoid = VOID_ELEMENTS[ type ] || false;

    if ( !this.isVoid ) {
      this.array = [];
      this.map = new Blank();
    }
  },

  // Only call this on non-void components
  resetTmp: function() {
        this.itIndex = 0;
    this.itEl = null;
    this.noKeyIdx = null;
    this.textBuffer = "";
    this.didSomeMove = false;
  },

  queueUpdate: queueUpdate,

  init: init,

  update: update,

  remove: remove,

  traverse: function( callback ) {
    var i = 0, arr = this.array;
    for ( ; i < this.length; i++ ) {
      callback( arr[ i ] );
    }
  }

};

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
  var string = toString( str );
  return ( string && reHasUnescapedHtml.test( string ) ) ? string.replace( reUnescapedHtml, escapeHtmlChar ) : string;
}

var reUppercase = /([A-Z])/g;

// Example: hyphenateStyleName( "backgroundColor" ) -> "background-color"
function hyphenateStyleName( str ) {
  return str.replace( reUppercase, "-$1" ).toLowerCase();
}

function stylify( style ) {

  var attr = "", name;

  for ( name in style ) {
    attr += hyphenateStyleName( name ) + ": " + style[ name ] + ";";
  }

  return attr;
}

function properties( elem ) {

  var html = "", attrs = elem._attrs, name, value;

  attrs.style = stylify( elem.style );

  for ( name in attrs ) {
    value = attrs[ name ];
    if ( !value ) {
      continue;
    }
    html += " " + name + "=\"" + escape( value ) + "\"";
  }

  return html;
}

function serializeElement( elem ) {
  var tagName = elem._tagName;
  var html = "<" + tagName + properties( elem );
  if ( tagName === "menuitem" ) {
    html += "></menuitem>";
  } else if ( VOID_ELEMENTS[ tagName ] ) {
    html += ">";
  } else {
    html += ">" + elem.innerHTML + "</" + tagName + ">";
  }
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

function Element( tagName ) {
  this._tagName = ( tagName + "" ).toLowerCase();
  this._attrs = {};
  this.nodeType = 1;
  this.nodeName = this._tagName.toUpperCase();
  this.childNodes = [];
  this.style = {};
}

Element.prototype = {
  insertBefore: function( elem ) {
        this.childNodes.push( elem );
  },
  setAttribute: function( name, value ) {
        this._attrs[ name ] = value;
  },
  setAttributeNS: function( ns, name, value ) {
        this._attrs[ name ] = value;
  },
  getAttribute: function( name ) {
    return this._attrs[ name ];
  }
};

d( Element.prototype, "innerHTML", {
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

var fakeDocument = {
  createElement: function( tagName ) {
    return new Element( tagName );
  },
  createElementNS: function( namespace, tagName ) {
    return new Element( tagName );
  },
  createTextNode: function( value ) {
    return new TextNode( value );
  },
  createComment: function( value ) {
    return new Comment( value );
  }
};

var DOMNamespaces = {
  math: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function createEl( curr, props, currEl, renderToString ) {

  var namespace, doc, parentEl, type = curr.type;

  if ( currEl ) {

    
    if ( type !== currEl.nodeName.toLowerCase() ) {
      var errorText = " Expected '" + type + "' but found '" + currEl.nodeName.toLowerCase() + "'.";
      curr.updater.error( "The pre-rendered markup did not match the component being rendered." + errorText );
    }

    curr.isNativeMounted = true;
    return currEl;
  }

  doc = renderToString ? fakeDocument : getDocument();

  if ( type === "#text" ) {
    return doc.createTextNode( props || "" );
  }

  if ( type === "#comment" ) {
    return doc.createComment( props || "" );
  }

  parentEl = curr.parentEl;

  if ( parentEl.nodeName === "foreignObject" ) {
    namespace = null;
  } else {
    namespace = DOMNamespaces[ type ] || parentEl.namespaceURI;
  }

  if ( namespace ) {
    return doc.createElementNS( namespace, type );
  }

  return doc.createElement( type );

}

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
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

function toCapName( key ) {
  return key.charAt( 0 ).toUpperCase() + key.substring( 1 );
}

// Return a css property mapped to a potentially vendor prefixed property
var vendorPropName = memoizeStringOnly( function( key ) {

  var capName, i, name = key, emptyStyle = getEmptyStyle();

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

forEachObj( unitlessNumber, function( value, key ) {
  unitlessNumber[ vendorPropName( key ) ] = value;
} );

function styleValue( key, val ) {

  if ( val == null || typeof val === "boolean" || val === "" ) {
    return "";
  }

  if ( typeof val === "number" && val !== 0 && !unitlessNumber[ key ] ) {
    return val + "px";
  }

  return ( val + "" ).trim();

}

function styleEmpty( obj ) {
  if ( !obj ) {
    return true;
  }
  /* eslint no-unused-vars: 0 */
  for ( var name in obj ) {
    return false;
  }
  return true;
}

function styleMutator( curr, newObj, prevStyle ) {

  var key, name, value, el = curr.el, newStyle = null;

  if ( styleEmpty( newObj ) ) {
    if ( !styleEmpty( prevStyle ) ) {
      curr.updater.queueAttrUpdate( curr, "style", null, "attr" );
    }
    return;
  }

  newStyle = {};

  for ( key in newObj ) {

    name = vendorPropName( key );

    if ( !name ) {
      if ( true ) {
        warn( "mota.view.dom.attr", "`" + key + "` is not a style property." );
      }
      continue;
    }

    value = styleValue( name, newObj[ name ] );

    if ( value ) {
      if ( prevStyle ) {
        if ( prevStyle[ name ] !== value ) {
          curr.updater.queueAttrUpdate( curr, name, value, "style" );
        }
        prevStyle[ name ] = undefined;
      } else {
        curr.updater.queueAttrUpdate( curr, name, value, "style" );
      }
      newStyle[ name ] = value;
    }

  }

  if ( prevStyle ) {
    for ( key in prevStyle ) {
      if ( prevStyle[ key ] ) {
        curr.updater.queueAttrUpdate( curr, key, "", "style" );
      }
    }
  }

  return newStyle;

}

var mutators;

var NOT_PROPS = {
  list: true,
  form: true,
  type: true,
  width: true,
  height: true
};

var reEvent = /^on/;

var normalizeStr = function( val ) {
  return val || val === 0 ? val + "" : undefined;
};

var setAttribute = function( name, curr, val, prevValue ) {

  var value = normalizeStr( val );

  if ( value !== prevValue ) {
    curr.updater.queueAttrUpdate( curr, name, value, "attr" );
  }

  return value;

};

var setSelectProp = function( name, curr, val, prevValue ) {

  var value;

  if ( curr.el.nodeName !== "SELECT" ) {
    return mutators._default( name, curr, val, prevValue );
  }

  value = normalizeStr( val );

  if ( value !== prevValue ) {
    // Setting `value` or `selectedIndex` on <select> doesn't work before children exist
    // So set it after children have been created
    curr.updater.queueEdgeCaseUpdate( curr, name, value || "", "prop" );
  }

  return value;

};

mutators = {

  _default: function( name, curr, val, prevValue ) {

    var el = curr.el;
    var eventName = name.replace( reEvent, "" );

    if ( name !== eventName ) {

      eventName = eventName.toLowerCase();

      if ( prevValue !== val ) {
        if ( prevValue ) {
          off.call( el, eventName, prevValue );
        }
        if ( val ) {
          on$1.call( el, eventName, val );
        }
      }

      return val || undefined;
    }

    if ( el[ name ] !== undefined && !NOT_PROPS[ name ] ) {
      if ( val !== prevValue ) {
        curr.updater.queueAttrUpdate( curr, name, val, "prop" );
      }
      return val;
    }

    if ( isObjectLike( val ) ) {
      if ( true ) {
        warn(
          "mota.view.dom.attr",
          "You are providing an object or function to the attribute `" + name + "`"
        );
      }
      return;
    }

    return setAttribute( name, curr, val, prevValue );

  },

  id: function( curr, val, prevValue ) {
    return setAttribute( "id", curr, val, prevValue );
  },

  class: function( curr, val, prevValue ) {
    return setAttribute( "class", curr, val, prevValue );
  },

  dangerousInnerHTML: function( curr, val, prevValue ) {

    var newHtml = val && val.__html;

    if ( curr.isVoid ) {
      curr.updater.error( curr.type + " is a void element and must not use dangerousInnerHTML." );
    }

    newHtml = normalizeStr( newHtml );

    if ( newHtml !== prevValue ) {
      curr.updater.queueAttrUpdate( curr, "innerHTML", newHtml || "", "prop" );
    }

    return newHtml;

  },

  defaultValue: function( curr, val, prevValue ) {

    var nodeName = curr.el.nodeName;

    if ( nodeName === "INPUT" || nodeName === "SELECT" ) {
      if ( !curr.justCreated ) {
        return prevValue;
      }
      return setAttribute( "value", curr, val, prevValue );
    }

    return mutators._default( "defaultValue", curr, val, prevValue );
  },

  value: function( curr, val, prevValue ) {

    var nodeName = curr.el.nodeName, value, str;

    if ( nodeName === "INPUT" ) {
      value = normalizeStr( val );
      if ( value !== prevValue ) {
        str = value || "";
        // To not break cursor placement
        if ( curr.el.value !== str ) {
          curr.updater.queueAttrUpdate( curr, "value", str, "prop" );
        }
      }
      return value;
    }

    return setSelectProp( "value", curr, val, prevValue );
  },

  selectedIndex: function( curr, val, prevValue ) {
    return setSelectProp( "selectedIndex", curr, val, prevValue );
  },

  style: styleMutator

};

var mutators$1 = mutators;

var current = null;
var root$1 = null;
var updater = null;
var isFirstRender = false;
var renderToString = false;
var ignore = 0;

function assertHasCurrent() {
  if ( !current ) {
    err( "mota.view.dom", "Cannot call this outside of a patch." );
  }
}

function assertNotVoid() {
  if ( current.isVoid ) {
    updater.error( current.type + " is a void element." );
  }
}

function getCurrent() {
  return current;
}

function setCurrent( c ) {
  if ( c && current ) {
    updater.error( "Can't set a new context." );
  }
  current = c;
  if ( c ) {
    root$1 = c.root;
    updater = c.root.updater;
    isFirstRender = root$1.isFirstRender;
    renderToString = root$1.renderToString;
  }
}

var typeUID = 1;

function createKey( typeIsFunction, type, key, noKeyIdx ) {

  var typeId;

  if ( typeIsFunction ) {
    if ( !type.__type ) {
      type.__type = typeUID++;
    }
    typeId = type.__type;
  } else {
    typeId = type;
  }

  if ( noKeyIdx[ typeId ] == null ) {
    noKeyIdx[ typeId ] = 0;
  }

  return typeId + ( key == null ? ":noKey:" + noKeyIdx[ typeId ]++ : ":key:" + key );

}

function handleText( parent ) {
  var text = parent.textBuffer;
  if ( text ) {
    parent.textBuffer = "";
    elVoid( "#text", undefined, text );
  }
}

function initInternal( typeIsFunction, type, props, ref, parent, key, i ) {
  var component, internal;

  if ( typeIsFunction ) {
    /* eslint new-cap: 0 */
    component = new type();
    internal = component.__internal__ = new ViewInternal( root$1, component );
  } else {
    internal = new ViewInternal( root$1, null );
  }

  current = internal;
  internal.init( type, props, ref, parent, key, i );

  return internal;
}

function updateInternal( internal, props, isConst ) {
  if ( isConst ) {
    ignore++;
  } else {
    current = internal;
    internal.update( props );
  }
  return internal.component;
}

function elOpen( type, _key, props, ref, isConst ) {

  var parent = current, array, map, i, typeIsFunction, key, noKeyIdx,
      freeSpot = 0, currCompInternal, compInternal;

  if ( ignore ) {
    ignore++;
    return;
  }

  assertHasCurrent();
  assertNotVoid();
  handleText( parent );

  if ( !type ) {
    updater.error( "dom.open", "Provide a type." );
  }

  array = parent.array;
  map = parent.map;
  noKeyIdx = parent.noKeyIdx || ( parent.noKeyIdx = {} );
  i = parent.itIndex++;
  typeIsFunction = isFunction( type );
  key = createKey( typeIsFunction, type, _key, noKeyIdx );
  currCompInternal = array[ i ];

  if ( currCompInternal && currCompInternal.key === key ) {
    if ( parent.didSomeMove ) {
      updater.queueElemMove( currCompInternal );
    }
    return updateInternal( currCompInternal, props, isConst );
  }

  parent.didSomeMove = true;

  compInternal = map[ key ];

  // Check to see if the node has moved within the parent
  if ( compInternal ) {

    freeSpot = compInternal.index;
    compInternal.index = i;
    updater.queueElemMove( compInternal );
    updateInternal( compInternal, props, isConst );

  } else {

    freeSpot = parent.length++;
    compInternal = initInternal( typeIsFunction, type, props, ref, parent, key, i );
    map[ key ] = compInternal;

  }

  // The one that is in `i`, move it to a free spot
  if ( currCompInternal ) {
    array[ currCompInternal.index = freeSpot ] = currCompInternal;
  }

  // Place this component in the correct index
  array[ i ] = compInternal;

  return compInternal.component;

}

function elConst( type, key, props, ref ) {
  return elOpen( type, key, props, ref, true );
}

function finishAttrs( curr ) {

  var prevAttrs = curr.prevAttrs;
  var prevValue, name, mutator;

  if ( prevAttrs ) {
    for ( name in prevAttrs ) {
      prevValue = prevAttrs[ name ];
      if ( prevValue !== undefined ) {
        mutator = mutators$1[ name ];
        if ( mutator ) {
          mutator( curr, undefined, prevValue );
        } else {
          mutators$1._default( name, curr, undefined, prevValue );
        }
      }
    }
  }

  curr.prevAttrs = curr.newAttrs;
  curr.newAttrs = null;

}

function finishChildren( curr ) {

  var i = curr.itIndex;
  var newLen = i;
  var array = curr.array;
  var map = curr.map;
  var internal;

  // Remove remaining
  for ( ; i < curr.length; i++ ) {
    internal = array[ i ];
    array[ i ] = null;
    map[ internal.key ] = null;
    internal.remove();
  }

  curr.length = newLen;
  curr.resetTmp();

}

// Not public, but used by the updater
function finishJob( curr ) {

  if ( curr.hasAttrs ) {
    finishAttrs( curr );
  }

  if ( !curr.isVoid ) {
    handleText( curr );
    finishChildren( curr );
  }

  curr.justCreated = false;

}

function elClose() {

  var curr = current;

  if ( ignore ) {
    ignore--;
    return;
  }

  assertHasCurrent();

  finishJob( curr );

  if ( !curr.isNativeMounted ) {
    updater.queueElemInsertion( curr );
  }

  current = curr.parentInternal;

}

function elVoid( type, key, props, ref ) {
  var component = elOpen( type, key, props, ref );
  elClose();
  return component;
}

var NOT_ALLOWED = {
  children: true,
  childNodes: true,
  innerHTML: true,
  outerHTML: true
};

var NORMALIZE_ATTR_NAME = {
  className: "class",
  dangerouslySetInnerHTML: "dangerousInnerHTML"
};

function attrChecks( curr, _name ) {

  assertHasCurrent();

  if ( curr.itIndex > 0 ) {
    updater.error( "dom.attr", "You can only call this before any .open() call." );
  }

  if ( !_name ) {
    updater.error( "dom.attr", "Provide a name." );
  }

  var name = NORMALIZE_ATTR_NAME[ _name ] || _name;

  if ( NOT_ALLOWED[ name ] ) {
    updater.error( "dom.attr", "\"" + _name + "\" is not an accepted name." );
  }

  if ( curr.newAttrs && curr.newAttrs[ name ] !== undefined ) {
    updater.error( "dom.attr", "You are setting \"" + _name + "\" more than once." );
  }

  return name;
}

function attr( _name, value ) {

  if ( ignore ) {
    return;
  }

  var curr = current;
  var name = attrChecks( curr, _name );

  if ( value === undefined ) {
    return;
  }

  var mutator = mutators$1[ name ];
  var prevAttrs = curr.prevAttrs;
  var newAttrs = curr.newAttrs || ( curr.newAttrs = new Blank() );
  var prevValue = prevAttrs ? prevAttrs[ name ] : undefined;
  var newValue;

  if ( mutator ) {
    newValue = mutator( curr, value, prevValue );
  } else {
    newValue = mutators$1._default( name, curr, value, prevValue );
  }

  if ( newValue !== undefined ) {
    newAttrs[ name ] = newValue;
  }

  if ( prevValue !== undefined ) {
    prevAttrs[ name ] = undefined;
  }

}

function text( value ) {
  if ( ignore ) {
    return;
  }
  assertHasCurrent();
  assertNotVoid();
  current.textBuffer += value;
}

function getCurrentNode( curr ) {

  var currEl, parent;

  if ( isFirstRender && root$1.reuseMarkup ) {
    parent = curr.parentInternal;

    // The value of `itIndex` was already incremented in `elOpen`
    // so check for the value `1` instead of `0`
    if ( parent.itIndex === 1 ) {
      currEl = parent.el.firstChild;
    } else {
      currEl = parent.itEl;
    }

    if ( !currEl ) {
      // To make `createEl` throw an error
      currEl = { nodeName: "" };
    }

    parent.itEl = currEl.nextSibling;
  }

  return currEl;
}

function setType( type, props ) {

  var curr = current;

  assertHasCurrent();

  if ( !curr.el ) {

    if ( !type || typeof type !== "string" ) {
      updater.error( "dom.setType", "Provide a valid string type." );
    }

    curr.initVars( type );
    curr.el = createEl( curr, props, getCurrentNode( curr ), renderToString );
  }

}

var dom = {
  open: elOpen,
  const: elConst,
  close: elClose,
  void: elVoid,
  text: text,
  t: text,
  attr: attr,
  a: attr,
  setType: setType
};

var now = Date.now;

var eventProps = {};
var reKeyEvent = /^key/;
var rePointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

var hooks = {
  which: function( e ) {

    /* eslint no-nested-ternary: 0 */

    var button = e.button;

    if ( !e.which && button !== undefined && rePointerEvent.test( e.type ) ) {

      // Add which for click: 1 === left; 2 === middle; 3 === right
      return button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) );
    }

    // Add which for key events
    if ( e.which == null && reKeyEvent.test( e.type ) ) {
      return e.charCode == null ? e.keyCode : e.charCode;
    }

    return e.which;

  },
  path: function( event ) {

    // This will run in the capture phase so, don't use `event.path`
    // because at this point it's `[ Window ]`

    var elem = event.target, path = [ elem ];

    while ( ( elem = elem.parentNode || elem.defaultView ) ) {
      path.push( elem );
    }

    return path;
  }
};

var addEventGetter = function( name ) {

  eventProps[ name ] = true;

  d( ViewEvent.prototype, name, {
    enumerable: true,
    configurable: true,

    get: function() {
      var hook = hooks[ name ];
      var value = hook ? hook( this.originalEvent ) : this.originalEvent[ name ];
      return ( this[ name ] = value );
    },

    set: function( value ) {
      d( this, name, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
      } );
    }
  } );

};

function ViewEvent( src ) {

  var target = src.target;

  this.originalEvent = src;
  this.type = src.type;
  this.currentTarget = src.currentTarget;
  this.relatedTarget = src.relatedTarget;

  // Support: Safari <=6 - 7 only
  // Target should not be a text node
  if ( target.nodeType === 3 ) {
    this.target = target.parentNode;
  } else {
    this.target = target;
  }

  // Create a timestamp if event doesn't have one
  if ( !this.timeStamp ) {
    this.timeStamp = now();
  }

  for ( var name in this.originalEvent ) {
    if ( !eventProps[ name ] && this[ name ] == null ) {
      addEventGetter( name );
    }
  }

}

ViewEvent.prototype = {
  constructor: ViewEvent,
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,
  stopPropagation: function() {
    this.isPropagationStopped = returnTrue;
    this.originalEvent.stopPropagation();
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = returnTrue;
    this.stopPropagation();
  },
  preventDefault: function() {
    this.isDefaultPrevented = returnTrue;
    this.originalEvent.preventDefault();
  }
};

nativeKeys( hooks ).forEach( addEventGetter );

var forEachEventListener = function( object, eventListenerList, data, event ) {

  var listener = data.listener;
  var handler = listener.handler;

  if ( event.isImmediatePropagationStopped() ) {
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

  var event = new ViewEvent( nativeEvent );
  var type = event.type;
  var path = event.path;
  var i = 0;

  var comp = motaViewData.get( event.target );
  var internal = comp && comp.__internal__;
  var updater = internal && internal.updater;

  if ( updater ) {
    updater.startIgnore();
  }

  while ( i < path.length && !event.isPropagationStopped() ) {

    eventsApi( path[ i ], "trigger", forEachEventListener, type, undefined, undefined, event );

    if ( !event.bubbles ) {
      break;
    }

    i++;

  }

  if ( updater ) {
    updater.endIgnore();
  }

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

function findDOMNode( component ) {
  return component.__internal__.el;
}

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

  notEmpty: function() {
    return this.root;
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

function getNamespace( name ) {
  if ( name.lastIndexOf( "xml:", 0 ) === 0 ) {
    return "http://www.w3.org/XML/1998/namespace";
  }
  if ( name.lastIndexOf( "xlink:", 0 ) === 0 ) {
    return "http://www.w3.org/1999/xlink";
  }
}

function getAttr( el, name ) {
  var attrNS = getNamespace( name );
  if ( attrNS ) {
    return el.getAttributeNS( attrNS, name );
  }
  return el.getAttribute( name );
}

function applyAttr( el, name, value ) {
  var attrNS;
  if ( value == null ) {
    el.removeAttribute( name );
  } else {
    attrNS = getNamespace( name );
    if ( attrNS ) {
      el.setAttributeNS( attrNS, name, value );
    } else {
      el.setAttribute( name, value );
    }
  }
}

function applyAttrUpdate( el, name, value, type ) {
  if ( type === "attr" ) {
    applyAttr( el, name, value );
  } else if ( type === "prop" ) {
    el[ name ] = value;
  } else if ( type === "style" ) {
    el.style[ name ] = value;
  }
}

function needsUpdate( el, name, value, type ) {
  if ( type === "attr" ) {
    return getAttr( el, name ) !== value;
  }
  if ( type === "prop" ) {
    return el[ name ] !== value;
  }
  return el.style[ name ] !== value;
}

function remove$1( elem ) {
  elem.parentNode.removeChild( elem );
}

function insertOrMove( internal ) {

  var el = internal.el;
  var parent = internal.parentInternal;
  var parentNode = parent.el;
  var previous = parent.array[ internal.index - 1 ];
  var next = previous ? previous.el.nextSibling : parentNode.firstChild;

  internal.isNativeMounted = true;

  if ( el !== next ) {
    parentNode.insertBefore( el, next || null );
  }

}

function dirtyComponentsIteratee( internal ) {
  if ( internal.queued ) { // Make sure this component wasn't updated already
    setCurrent( internal );
    internal.update( null );
    finishJob( internal );
    setCurrent( null );
  }
}

function pendingAttrUpdatesIteratee( update ) {
  applyAttrUpdate( update.el, update.name, update.value, update.type );
}

function pendingCallbacksIteratee( obj ) {
  obj.component[ obj.name ]( obj.arg );
}

function errText( owner ) {
  return owner ? " Please check the code for the " + owner.constructor.displayName + " component." : "";
}

function queueAttrUpdate( arr, el, name, value, type ) {
  arr.push( {
    el: el,
    name: name,
    value: value,
    type: type
  } );
}

function Updater() {
  this.ignore = 0;
  this.allowFlush = true;
  this.dirtyComponents = new BinaryTree();
  this.pendingAttrUpdates = [];
  this.pendingElemDeletions = [];
  this.pendingElemInsertions = [];
  this.pendingElemMoves = [];
  this.pendingEdgeCaseUpdates = [];
  this.pendingCallbacks = [];
}

Updater.prototype = {

  _internalFlush: function() {
    this.allowFlush = false;

    // Traverse dirty components and reset list
    this.dirtyComponents.resetAndTraverse( dirtyComponentsIteratee );

    // Update attrs
    forEachArrayLike( this.pendingAttrUpdates, pendingAttrUpdatesIteratee );

    // Update elements (deletions, insertions, moves)
    forEachArrayLike( this.pendingElemDeletions, remove$1 );
    forEachArrayLike( this.pendingElemInsertions, insertOrMove );
    forEachArrayLike( this.pendingElemMoves, insertOrMove );

    // Take care of edge cases where we need to update props after mounting children
    forEachArrayLike( this.pendingEdgeCaseUpdates, pendingAttrUpdatesIteratee );

    // Call pending callbacks
    forEachArrayLike( this.pendingCallbacks, pendingCallbacksIteratee );

    // Reset
    this.pendingAttrUpdates.length = 0;
    this.pendingElemDeletions.length = 0;
    this.pendingElemInsertions.length = 0;
    this.pendingElemMoves.length = 0;
    this.pendingEdgeCaseUpdates.length = 0;
    this.pendingCallbacks.length = 0;

    this.allowFlush = true;
  },

  flushUpdates: function() {

    if ( this.allowFlush ) {

      // Keep checking if updates were queued
      // because more updates might be queued in component lifecycle methods
      while ( !this.ignore && this.dirtyComponents.notEmpty() ) {
        this._internalFlush();
      }

    }

  },

  queueAttrUpdate: function( internal, name, value, type ) {
    var el = internal.el;
    if ( el.parentNode ) {
      if ( internal.root.isFirstRender && !needsUpdate( el, name, value, type ) ) {
        return;
      }
      queueAttrUpdate( this.pendingAttrUpdates, el, name, value, type );
    } else {
      // Apply changes directly if the node is not in the DOM yet
      applyAttrUpdate( el, name, value, type );
    }
  },

  queueElemDeletion: function( elem ) {
    this.pendingElemDeletions.push( elem );
  },

  queueElemInsertion: function( compInternal ) {
    if ( compInternal.parentInternal.isNativeMounted ) {
      this.pendingElemInsertions.push( compInternal );
    } else {
      // Apply changes directly if the parent node is not in the DOM yet
      insertOrMove( compInternal );
    }
  },

  queueElemMove: function( compInternal ) {
    this.pendingElemMoves.push( compInternal );
  },

  queueEdgeCaseUpdate: function( curr, name, value, type ) {
    queueAttrUpdate( this.pendingEdgeCaseUpdates, curr.el, name, value, type );
  },

  queueCallback: function( component, name, arg ) {
    this.pendingCallbacks.push( {
      component: component,
      name: name,
      arg: arg
    } );
  },

  queueUpdate: function( internal ) {
    this.dirtyComponents.add( internal );
    this.flushUpdates();
  },

  startIgnore: function() {
    this.ignore++;
  },

  endIgnore: function() {
    this.ignore--;
    this.flushUpdates();
  },

  error: function( methodName, msg ) {

    var owner = getCurrent().owner;
    setCurrent( null );

    switch ( arguments.length ) {
      case 2:
        err( "mota.view." + methodName, msg + errText( owner ) );
        break;
      case 1:
        err( "mota.view", methodName + errText( owner ) );
        break;
      default:
        err( "mota.view", methodName );
    }

  }

};

function RootComponent( el ) {
  this.isFirstRender = true;
  this.renderToString = false;
  this.props = null;
  this.reuseMarkup = !!el.firstChild;
  this.updater = new Updater();
  this.__internal__ = new ViewInternal( this, this );
  this.__internal__.el = el;
  this.__internal__.isNativeMounted = true;
  this.__internal__.initVars( el.nodeName );
}

function create( el ) {
  return motaViewData.add( el, new RootComponent( el ) );
}

function render( fn, parent, callback ) {

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

  var parentComponent = motaViewData.get( parent ) || create( parent );

  if ( !parentComponent ) {
    err( "mota.view.render", "`parent` should be an DOM element" );
  }

  parentComponent.render = fn;

  if ( isFunction( callback ) ) {
    parentComponent.componentDidUpdate = function() {
      this.isFirstRender = false;
      this.componentDidUpdate = undefined;
      callback();
    };
  } else {
    parentComponent.componentDidUpdate = function() {
      this.isFirstRender = false;
    };
  }

  parentComponent.__internal__.queueUpdate( false );

}

function FakeRootComponent() {
  this.isFirstRender = true;
  this.renderToString = true;
  this.props = null;
  this.reuseMarkup = false;
  this.updater = new Updater();
  this.__internal__ = new ViewInternal( this, this );
  this.__internal__.el = fakeDocument.createElement( "div" );
  this.__internal__.initVars( "div" );
}

function renderToString$1( fn ) {
  var parentComponent = new FakeRootComponent();
  var internal = parentComponent.__internal__;
  parentComponent.render = fn;
  internal.queueUpdate( false );
  return internal.el.innerHTML;
}

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

var view = {
  classSet: classSet,
  Component: ViewComponent,
  createClass: createClass,
  dom: dom,
  findDOMNode: findDOMNode,
  render: render,
  renderToString: renderToString$1,
  select: true ? function( el ) {
    return motaViewData.get( el );
  } : undefined,
  enqueueUpdate: enqueueUpdate,
  forceUpdate: forceUpdate,
  dispatchEvents: events.dispatchEvents,
  registerEvent: events.register,
  updater: {
    startIgnore: function( comp ) {
      comp.__internal__.updater.startIgnore();
    },
    endIgnore: function( comp ) {
      comp.__internal__.updater.endIgnore();
    }
  }
};

function bindAll( object, methods ) {

  var i, key;

  for ( i = 0; i < methods.length; i++ ) {
    key = methods[ i ];
    object[ key ] = bind( object[ key ], object );
  }

  return object;
}

function copyArray( result, array ) {
  var i = 0;
  for ( ; i < array.length; i++ ) {
    result[ i ] = array[ i ];
  }
  return result;
}

var Stack = ( typeof root.Map == "undefined" ? Map : root.Map );

function assignProps( result, isDeep, obj, customizer, stack ) {
  if ( isDeep ) {
    stack.set( obj, result );
    assignWith( result, obj, function( objValue, srcValue, key, object, source ) {
      return baseClone( srcValue, true, customizer, key, source, stack );
    } );
  } else {
    assign( result, obj );
  }
  return result;
}

var cloners = {};

var cloneArrayBuffer = cloners[ tags.ArrayBuffer ] = function( obj ) {
  var result = new obj.constructor( obj.byteLength );
  new Uint8Array( result ).set( new Uint8Array( obj ) );
  return result;
};

cloners[ tags.Boolean ] = cloners[ tags.Date ] = function( obj ) {
  return new obj.constructor( +obj );
};

cloners[ tags.DataView ] = function( obj, isDeep ) {
  var buffer = isDeep ? cloneArrayBuffer( obj.buffer ) : obj.buffer;
  return new obj.constructor( buffer, obj.byteOffset, obj.byteLength );
};

cloners[ tags.Number ] = cloners[ tags.String ] = function( obj ) {
  return new obj.constructor( obj );
};

var reFlags = /\w*$/;

cloners[ tags.RegExp ] = function( obj ) {
  var result = new obj.constructor( obj.source, reFlags.exec( obj ) );
  result.lastIndex = obj.lastIndex;
  return result;
};

cloners[ tags.Symbol ] = function( obj ) {
  return symbolValueOf ? Object( symbolValueOf.call( obj ) ) : {};
};

function initCloneArray( array ) {

  var length = array.length;
  var result = array.constructor( length );

  // Add properties assigned by `RegExp#exec`
  if ( length && typeof array[ 0 ] == "string" && has( array, "index" ) ) {
    result.index = array.index;
    result.input = array.input;
  }

  return result;

}

function deepCloneArray( result, array, customizer, stack ) {

  var i = 0;

  stack.set( array, result );

  for ( ; i < result.length; i++ ) {
    result[ i ] = baseClone( array[ i ], true, customizer, i, array, stack );
  }

  return result;
}

function cloneBuffer( buffer, isDeep ) {
  if ( isDeep ) {
    return buffer.slice();
  }
  var result = new buffer.constructor( buffer.length );
  buffer.copy( result );
  return result;
}

function cloneTypedArray( obj, isDeep ) {
  var buffer = isDeep ? cloneArrayBuffer( obj.buffer ) : obj.buffer;
  return new obj.constructor( buffer, obj.byteOffset, obj.length );
}

function cloneMap( obj, isDeep, customizer, stack ) {
  var map = new obj.constructor();
  if ( isDeep ) {
    stack.set( obj, map );
  }
  obj.forEach( function( value, key ) {
    map.set( key, isDeep ? baseClone( value, true, customizer, key, obj, stack ) : value );
  } );
  return map;
}

function cloneSet( obj, isDeep, customizer, stack ) {
  var set = new obj.constructor();
  if ( isDeep ) {
    stack.set( obj, set );
  }
  obj.forEach( function( value ) {
    set.add( isDeep ? baseClone( value, true, customizer, value, obj, stack ) : value );
  } );
  return set;
}

function baseClone( value, isDeep, customizer, key, object, _stack ) {

  var result, tag, isFunc, handler, stacked, stack = _stack;

  if ( customizer ) {
    result = object ? customizer( value, key, object, stack ) : customizer( value );
    if ( result !== undefined ) {
      return result;
    }
  }

  if ( !isObjectLike( value ) ) {
    return value;
  }

  if ( isDeep ) {
    if ( stack ) {
      stacked = stack.get( value );
      if ( stacked ) {
        return stacked;
      }
    } else {
      stack = new Stack();
    }
  }

  if ( isArray( value ) ) {
    result = initCloneArray( value );
    if ( !isDeep ) {
      return copyArray( result, value );
    }
    return deepCloneArray( result, value, customizer, stack );
  }

  if ( isBuffer( value ) ) {
    return cloneBuffer( value, isDeep );
  }

  tag = getTag( value );

  if ( isTypedArrayMap[ tag ] ) {
    return cloneTypedArray( value, isDeep );
  }

  if ( tag === tags.Map ) {
    return cloneMap( value, isDeep, customizer, stack );
  }

  if ( tag === tags.Set ) {
    return cloneSet( value, isDeep, customizer, stack );
  }

  isFunc = isFunction( value );

  if ( tag === tags.Object || tag === tags.Arguments || ( isFunc && !object ) ) {
    result = isFunc || !isFunction( value.constructor ) ? {} : createObj( getPrototype( value ) );
  } else {
    handler = cloners[ tag ];
    if ( handler ) {
      result = handler( value, isDeep, customizer, stack );
    }
  }

  if ( result ) {
    return assignProps( result, isDeep, value, customizer, stack );
  }

  return object ? value : {};

}

var clone = function( target ) {
  return baseClone( target, false );
};

var cloneDeep = function( target ) {
  return baseClone( target, true );
};

var cloneWith = function( target, customizer ) {
  return baseClone( target, false, customizer );
};

var cloneDeepWith = function( target, customizer ) {
  return baseClone( target, true, customizer );
};

function toPlainObject( value ) {
  var output = {};
  var object = Object( value );
  for ( var name in object ) {
    output[ name ] = object[ name ];
  }
  return output;
}

function mergeValue( obj, key, value ) {
  if ( value !== undefined || ( typeof key == "number" && !( key in obj ) ) ) {
    obj[ key ] = value;
  }
}

function baseMerge( setter, target, source, _in, customizer, srcIndex, _stack ) {

  var stack = _stack;

  if ( isArray( source ) || isTypedArray( source ) ) {
    for ( var i = 0; i < source.length; i++ ) {
      stack = setter( target, source, i, customizer, srcIndex, stack );
    }
  } else {
    baseAssigner( setter, target, source, true, customizer, srcIndex, stack );
  }

}

function baseDeepMerge( target, source, key, customizer, srcIndex, _stack ) {

  var objValue = target[ key ];
  var srcValue = source[ key ];
  var stack = _stack;
  var stacked, newValue, shouldRecurse;

  if ( !isObjectLike( srcValue ) ) {
    newValue = customizer ? customizer( objValue, srcValue, key, target, source, stack ) : undefined;
    if ( newValue === undefined ) {
      newValue = srcValue;
    }
    mergeValue( target, key, newValue );
    return stack;
  }

  if ( !stack ) {
    stack = new Stack();
  }
  stacked = stack.get( srcValue );

  if ( stacked ) {
    mergeValue( target, key, stacked );
    return stack;
  }

  newValue = customizer ? customizer( objValue, srcValue, key, target, source, stack ) : undefined;

  shouldRecurse = newValue === undefined;

  if ( shouldRecurse ) {

    newValue = srcValue;
    if ( isArray( srcValue ) || isTypedArray( srcValue ) ) {
      if ( isArray( objValue ) ) {
        newValue = objValue;
      } else if ( isArrayLike( objValue ) ) {
        newValue = copyArray( [], objValue );
      } else {
        shouldRecurse = false;
        newValue = baseClone( srcValue, true );
      }
    } else if ( isPlainObject( srcValue ) || isArguments( srcValue ) ) {
      if ( isArguments( objValue ) ) {
        newValue = toPlainObject( objValue );
      } else if ( !isObjectLike( objValue ) || ( srcIndex && isFunction( objValue ) ) ) {
        shouldRecurse = false;
        newValue = baseClone( srcValue, true );
      } else {
        newValue = objValue;
      }
    } else {
      shouldRecurse = false;
    }

  }

  if ( shouldRecurse ) {
    stack.set( srcValue, newValue );
    baseMerge( baseDeepMerge, newValue, srcValue, true, customizer, srcIndex, stack );
    stack.delete( srcValue );
  }

  mergeValue( target, key, newValue );

  return stack;

}

function shouldSet( objValue, target, key ) {
  return objValue === undefined || ( eq( objValue, objectProto[ key ] ) && !hasOwn.call( target, key ) );
}

function baseDefaults( target, source, key ) {

  var objValue = target[ key ];

  if ( shouldSet( objValue, target, key ) ) {
    target[ key ] = source[ key ];
  }

}

// This is a customizer for `baseMerge`
function mergeDefaults( objValue, srcValue, key, target, source, stack ) {

  if ( isObjectLike( objValue ) && isObjectLike( srcValue ) ) {
    stack.set( srcValue, objValue );
    baseMerge( baseDeepMerge, objValue, srcValue, true, mergeDefaults, undefined, stack );
    stack.delete( srcValue );
  }

  if ( shouldSet( objValue, target, key ) ) {
    // Return `undefined` to let `merge` handle this
    return;
  }

  return objValue;
}

function baseDefaultsDeep( target, source, key, customizer, srcIndex, stack ) {
  return baseDeepMerge( target, source, key, mergeDefaults, srcIndex, stack );
}

var defaults = createAssigner( baseAssigner, baseDefaults, true, false );

var defaultsDeep = createAssigner( baseMerge, baseDefaultsDeep, true, false );

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

function identity( v ) {
  return v;
}

function equalObjects( a, b, customizer, stack ) {

  var aKeys = keys( a );
  var bKeys = keys( b );
  var length = aKeys.length;

  if ( length !== bKeys.length ) {
    return false;
  }

  var stacked = stack.get( a );
  if ( stacked && stack.get( b ) ) {
    return stacked === b;
  }

  var result = true;
  var skipCtor = false;
  var key, i = 0;

  stack.set( a, b );
  stack.set( b, a );

  for ( ; i < length; i++ ) {

    key = aKeys[ i ];

    if ( has( b, key ) && baseEqual( a[ key ], b[ key ], customizer, key, a, b, stack ) ) {
      if ( !skipCtor && key === "constructor" ) {
        skipCtor = true;
      }
    } else {
      result = false;
      break;
    }

  }

  if ( result && !skipCtor ) {

    var aCtor = a.constructor;
    var bCtor = b.constructor;

    // For non-plain objects, constructors should be equal
    if ( aCtor !== bCtor && !( isPlainObject( a ) && isPlainObject( b ) ) ) {
      result = false;
    }

  }

  stack.delete( a );
  stack.delete( b );

  return result;
}

function equalArrays( a, b, customizer, stack, isUnordered ) {

  var result = true;
  var i = 0;
  var length = a.length;

  if ( length !== b.length ) {
    return false;
  }

  var stacked = stack.get( a );
  if ( stacked && stack.get( b ) ) {
    return stacked === b;
  }

  var seen = isUnordered && new Stack();

  stack.set( a, b );
  stack.set( b, a );

  for ( ; i < length; i++ ) {

    var aValue = a[ i ];
    var bValue = b[ i ];
    var compared;

    if ( customizer ) {
      compared = customizer( aValue, bValue, i, a, b, stack );
      if ( compared ) {
        continue;
      }
      if ( compared !== undefined ) {
        result = false;
        break;
      }
    }

    if ( isUnordered ) {

      var j = 0;
      var some = false;
      for ( ; j < b.length; j++ ) {
        if ( !seen.has( j ) && baseEqualDeep( aValue, b[ j ], customizer, stack ) ) {
          seen.set( j, true );
          some = true;
          break;
        }
      }

      if ( !some ) {
        result = false;
        break;
      }

    } else if ( !baseEqualDeep( aValue, bValue, customizer, stack ) ) {
      result = false;
      break;
    }

  }

  stack.delete( a );
  stack.delete( b );

  return result;

}

function iterableToArray( hasEntries, obj ) {
  var arr = new Array( obj.size );
  var i = 0;
  obj.forEach( function( value, key ) {
    arr[ i++ ] = hasEntries ? [ key, value ] : value;
  } );
  return arr;
}

function iterableEquals( hasEntries, a, b, customizer, stack ) {
  if ( a.size !== b.size ) {
    return false;
  }
  var stacked = stack.get( a );
  if ( stacked && stack.get( b ) ) {
    return stacked === b;
  }
  stack.set( a, b );
  stack.set( b, a );
  var result = equalArrays(
    iterableToArray( hasEntries, a ),
    iterableToArray( hasEntries, b ),
    customizer,
    stack,
    true
  );
  stack.delete( a );
  stack.delete( b );
  return result;
}

function equalByTag( a, b, tag, customizer, stack ) {

  switch ( tag ) {

    case tags.DataView:
      if ( a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset ) {
        return false;
      }
      a = a.buffer;
      b = b.buffer;

    /* eslint no-fallthrough: 0 */
    case tags.ArrayBuffer:
      return a.byteLength === b.byteLength && baseEqual( new Uint8Array( a ), new Uint8Array( b ) );

    case tags.Boolean:
    case tags.Date:
    case tags.Number:
      return eq( +a, +b );

    case tags.Error:
      return a.name === b.name && a.message === b.message;

    case tags.RegExp:
    case tags.String:
      return a + "" === b + "";

    case tags.Map:
    case tags.Set:
      return iterableEquals( tag === tags.Map, a, b, customizer, stack );

    case tags.Symbol:
      if ( symbolValueOf ) {
        return symbolValueOf.call( a ) === symbolValueOf.call( b );
      }

    default:
  }

  return false;
}

function baseEqualDeep( a, b, customizer, _stack ) {

  var aIsArr, bIsArr;
  var stack = _stack;
  var aTag, bTag;

  if ( a === b ) {
    return true;
  }
  if ( a == null || b == null || !( isObjectLike( a ) || isObjectLike( b ) ) ) {
    /* eslint no-self-compare: 0 */
    return a !== a && b !== b;
  }

  aIsArr = isArray( a );
  bIsArr = isArray( b );

  if ( aIsArr ) {
    aTag = tags.Array;
  } else {
    aTag = getTag( a );
    aTag = aTag === tags.Arguments ? tags.Object : aTag;
  }

  if ( bIsArr ) {
    bTag = tags.Array;
  } else {
    bTag = getTag( b );
    bTag = bTag === tags.Arguments ? tags.Object : bTag;
  }

  if ( aTag !== bTag ) {
    return false;
  }

  if ( !stack ) {
    stack = new Stack();
  }

  if ( aTag !== tags.Object ) {
    return aIsArr || isTypedArray( a ) ? equalArrays( a, b, customizer, stack ) : equalByTag( a, b, aTag, customizer, stack );
  }

  return equalObjects( a, b, customizer, stack );

}

function baseEqual( a, b, customizer, key, aParent, bParent, stack ) {
  if ( customizer ) {
    var comparison = aParent ? customizer( a, b, key, aParent, bParent, stack ) : customizer( a, b );
    if ( comparison !== undefined ) {
      return !!comparison;
    }
  }
  return baseEqualDeep( a, b, customizer, stack );
}

function isEqual( a, b ) {
  return baseEqual( a, b );
}

function isEqualWith( a, b, customizer ) {
  return baseEqual( a, b, customizer );
}

function keysIn( obj ) {

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

function log( funcName, msg ) {
  if ( typeof console !== "undefined" ) {
    console.log( funcName + " LOG: " + msg );
  }
}

var merge = createAssigner( baseMerge, baseDeepMerge, true, false );

var mergeWith = createAssigner( baseMerge, baseDeepMerge, true, true );

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
  var string = toString( str );
  return ( string && reHasEscapedHtml.test( string ) ) ? string.replace( reEscapedHtml, unescapeHtmlChar ) : string;
}

var ids = {};

function uniqueId( p ) {
  var prefix = toString( p );
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

function mota() {}

d( mota, "VERSION", { value: "0.16.2" } );
d( mota, "developmentMode", { value: true } );

mota.setWindow = setWindow;

var util = {
  apply: apply,
  assign: assign,
  assignIn: assignIn,
  assignInWith: assignInWith,
  assignWith: assignWith,
  bind: bind,
  bindAll: bindAll,
  clone: clone,
  cloneDeep: cloneDeep,
  cloneDeepWith: cloneDeepWith,
  cloneWith: cloneWith,
  defaults: defaults,
  defaultsDeep: defaultsDeep,
  entries: entries,
  entriesIn: entriesIn,
  eq: eq,
  err: err,
  escape: escape,
  escapeRegExp: escapeRegExp,
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
  isBuffer: isBuffer,
  isDate: isDate,
  isDocument: isDocument,
  isElement: isElement,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isEqualWith: isEqualWith,
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
  isTypedArray: isTypedArray,
  isUndefined: isUndefined,
  isWindow: isWindow,
  keys: keys,
  keysIn: keysIn,
  log: log,
  merge: merge,
  mergeWith: mergeWith,
  mixin: mixin,
  noConflict: noConflict,
  noop: noop,
  once: once,
  runAsync: runAsync,
  pairs: entries,
  toString: toString,
  type: motaType,
  unescape: unescape,
  uniqueId: uniqueId,
  validate: validate,
  values: values,
  valuesIn: valuesIn,
  warn: warn
};

assign( mota, util, {
  Events: Events,
  History: History,
  Map: Map,
  ImmutableMap: ImmutableMap,
  Observable: Observable,
  pathname: pathname,
  Promise: MotaPromise,
  Router: Router,
  view: view,
  util: util
} );

Events.on.hook = view.registerEvent;

// Export

( freeSelf || {} ).mota = mota;

/* global define:true */
if ( typeof define == "function" && typeof define.amd == "object" && define.amd ) {

  define( function() {
    return mota;
  } );

} else if ( freeModule ) {

  ( freeModule.exports = mota ).mota = mota;
  freeModule.exports.default = mota;
  freeExports.mota = mota;

} else {

  root.mota = mota;

}

} ).call( this );
