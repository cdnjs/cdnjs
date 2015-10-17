/*!
 * MotaJS v0.3.4
 * http://motapc97.github.io/motajs/
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Project
 * https://github.com/motapc97/MotaJS/
 *
 * Date: 2014-12-27T22:56Z
 */
/* jshint ignore:start */
(function(){
/* jshint ignore:end */

// DEV
var EXPOSE = function(){};

var

// Establish the root object, `window` in the browser, or `exports` on the server.
root = this,

// Save the previous value of the `m` variable.
_m = root.m,

// Things we need

ArrayProto       = Array.prototype,
ObjProto         = Object.prototype,
FuncProto        = Function.prototype,

push             = ArrayProto.push,
slice            = ArrayProto.slice,
splice           = ArrayProto.splice,
concat           = ArrayProto.concat,
indexOf          = ArrayProto.indexOf,
toString         = ObjProto.toString,
hasOwn           = ObjProto.hasOwnProperty,
trim             = String.prototype.trim,

nativeIsArray    = Array.isArray,
nativeKeys       = Object.keys,

// m
m;

// BASED ON `jQuery.trim`

// Support: Android<4.1
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

if ( "\uFEFF\xA0".trim() !== "" ) {

  // Support: Android<4.1
  trim = function(){
    /* jshint eqnull: true */
    return this == null ?
    "" :
    ( this + "" ).replace( rtrim , "" );
  };

}

// m
m = function(){};

// Export the `m` object for **Node.js**, with
// backwards-compatibility for the old `require()` API. If we're in
// the browser, add `m` as a global object.
if ( typeof exports !== "undefined" ) {
  if ( typeof module !== "undefined" && module.exports ) {
    exports = module.exports = m;
  }
  exports.m = m;
} else {
  root.m = m;
}

m.VERSION = "0.3.4";

// http://jsperf.com/test-call-vs-apply/73
m.apply = function ( func , context , a ) {

  var len = a && a.length;

  if ( !a || !len ) {
    return func.call( context );
  }

  switch ( len ) {

    case 1:
      return func.call( context , a[ 0 ] );
    case 2:
      return func.call( context , a[ 0 ] , a[ 1 ] );
    case 3:
      return func.call( context , a[ 0 ] , a[ 1 ] , a[ 2 ] );
    case 4:
      return func.call( context , a[ 0 ] , a[ 1 ] , a[ 2 ] , a[ 3 ] );
    case 5:
      return func.call( context , a[ 0 ] , a[ 1 ] , a[ 2 ] , a[ 3 ] , a[ 4 ] );
    default:
      return func.apply( context , a );

  }

};

var REFERENCE = {};

m.classExtend = function ( protoProps , staticProps , optionalNew ) {

  var
  parent = this,
  child,
  constructor,
  Surrogate;

  if ( protoProps && m.has( protoProps , "constructor" ) ) {
    constructor = protoProps.constructor;
  } else {
    constructor = parent;
  }

  if ( optionalNew ) {

    child = function ( ref , args ) {

      if ( this instanceof child ) {

        if ( ref === REFERENCE ) {

          return constructor.apply( this , args );

        } else {

          return constructor.apply( this , arguments );

        }

      } else {

        return new child( REFERENCE , arguments );

      }

    };

  } else {

    child = function(){
      return constructor.apply( this , arguments );
    };

  }

  // Extend prototype with the prototype of the parent
  Surrogate = function(){
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  // Extend prototype with given proto props
  if ( protoProps ) {
    m.extend( child.prototype , protoProps );
  }

  // Extend static props with the static props of the parent and the given static props
  m.extend( child , parent , staticProps );

  // Set a convenience property in case the parent's prototype is needed later
  child.__super__ = parent.prototype;

  // Return
  return child;

};

m.clone = function ( target ) {

  var deep, Cotr, result;

  // Handle a deep cloning situation
  if ( target === true && m.has( arguments , 1 ) ) {
    deep = target;
    // Skip the boolean
    target = arguments[ 1 ];
  }

  if ( !m.isObjectLike( target ) ) {
    return target;
  }

  switch ( m.type( target ) ) {

    case "array" :
      return deep ? m.extend( deep , [] , target ) : slice.call( target );

    case "number" :
    case "string" :
    case "date" :
    case "boolean" :
      Cotr = target.constructor;
      return new Cotr( target );

    case "regexp" :
      Cotr = target.constructor;
      result = new Cotr( target );
      result.lastIndex = target.lastIndex;
      return result;

    default :
      return deep ? m.extend( deep , {} , target ) : m.extend( {} , target );

  }

};

// BASED ON jQuery.each
m.each = function ( obj , callback ) {

  var i, length, breaker = m.each.breaker;

  if ( m.isArrayLike( obj ) ) {

    length = obj.length;

    for ( i = 0 ; i < length ; i++ ) {
      if ( callback.call( obj[ i ] , i , obj[ i ] ) === breaker ) {
        break;
      }
    }

  } else {

    for ( i in obj ) {
      if ( callback.call( obj[ i ] , i , obj[ i ] ) === breaker ) {
        break;
      }
    }

  }

  return obj;

};

m.each.breaker = false;

m.err = function ( funcName , msg ) {
  throw funcName + " ERROR: " + msg;
};

// BASED ON jQuery.extend
m.extend = function ( target ) {

  var
  options, name, src, copy, copyType, clone,
  targetType,
  i = 1,
  len = arguments.length,
  deep = false;

  // Handle a deep copy situation
  if ( target === true ) {
    deep = target;
    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Check type
  targetType = typeof target;

  // Handle case when target is a string or something (possible in deep copy)
  if ( targetType !== "object" && targetType !== "function" ) {
    target = {};
  }

  for ( ; i < len ; i++ ) {

    // Only deal with non-null/undefined values
    /* jshint eqnull: true */
    if ( (options = arguments[ i ]) != null ) {

      // Extend the base object
      for ( name in options ) {

        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging objects or arrays
        if ( deep && copy && ( (copyType = m.type( copy )) === "object" || copyType === "array" ) ) {

          if ( copyType === "array" ) {

            clone = src && m.isArray( src ) ? src : [];

          } else {

            clone = src && m.isObject( src ) ? src : {};

          }

          // Never move original objects, clone them
          target[ name ] = m.extend( deep , clone , copy );

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

m.has = function ( obj , key ) {
  /* jshint eqnull: true */
  return obj != null && hasOwn.call( obj , key );
};

// ADAPTATION FROM _.keys
m.keys = function ( obj , _in ) {

  if ( !m.isObjectLike( obj ) ) {
    return [];
  }

  if ( !_in && nativeKeys ) {
    return nativeKeys( obj );
  }

  var key, keys = [];

  for ( key in obj ) {
    if ( _in ) {
      keys.push( key );
    } else {
      if ( m.has( obj , key ) ) {
        keys.push( key );
      }
    }
  }

  return keys;

};

m.log = function ( funcName , msg ) {
  console.log( funcName + " LOG: " + msg );
};

m.noConflict = function(){
  if ( _m ) root.m = _m;
  return this;
};

m.now = Date.now || function(){
  return +( new Date() );
};

m.proxy = function ( context , method ) {

  var args, proxy, methodType = m.type( method );

  if ( methodType === "string" ) {

    if ( !context ) {
      return null;
    }

    method = context[ method ];

  } else if ( methodType !== "function" ) {

    return null;

  }

  /* jshint eqnull: true */
  if ( context != null ) {

    if ( arguments.length > 2 ) {

      args = slice.call( arguments , 2 );

      proxy = function(){
        return method.apply( context , args.concat( slice.call( arguments ) ) );
      };

    } else {

      proxy = function(){
        return method.apply( context , arguments );
      };

    }

  } else {

    if ( arguments.length > 2 ) {

      args = slice.call( arguments , 2 );

      proxy = function(){
        return method.apply( this , args.concat( slice.call( arguments ) ) );
      };

    } else {

      proxy = function(){
        return method.apply( this , arguments );
      };

    }

  }

  return proxy;

};

var ids = {};
m.uniqueId = function ( prefix ) {
  prefix = prefix ? prefix + "" : "";
  if ( !ids[ prefix ] ) {
    ids[ prefix ] = 0;
  }
  return prefix + (++ids[ prefix ]);
};

m.isArguments = function ( obj ) {
  return toString.call( obj ) === "[object Arguments]";
};

// Define a fallback version of the method in browsers (ahem, IE), where
// there isn't any inspectable "Arguments" type.
if ( !m.isArguments( arguments ) ) {
  m.isArguments = function ( obj ) {
    return m.has( obj , "callee" );
  };
}

m.isArray = nativeIsArray || function ( obj ) {
  return m.type( obj ) === "array";
};

// BASED ON an internal function of jQuery
m.isArrayLike = function ( obj ) {

  if ( !obj || m.isFunction( obj ) || m.isWindow( obj ) || m.isString( obj ) ) {
    return false;
  }

  var length = obj.length;

  return m.isArray( obj ) || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;

};

m.isBoolean = function ( obj ) {
  return obj === true || obj === false || m.type( obj ) === "boolean";
};

m.isDate = function ( obj ) {
  return m.type( obj ) === "date";
};

m.isElement = function ( obj ) {
  return !!( obj && obj.nodeType === 1 );
};

// BASED ON _.isEmpty
m.isEmpty = function ( obj ) {
  /* jshint eqnull: true */
  if ( obj == null ) {
    return true;
  }
  if ( m.isArray( obj ) || m.isString( obj ) || m.isArguments( obj ) ) {
    return obj.length === 0;
  }
  for ( var key in obj ) {
    if ( m.has( obj , key ) ) {
      return false;
    }
  }
  return true;
};

// BASED ON _.isEqual

// Perform a deep comparison to check if two objects are equal.
var eq = function ( a , b , aStack , bStack ) {

  // If same objects
  //// If it's not zero: true
  //// If it's zero:
  ////// If 1 / a == 1 / b
  ////// Consider that `0` and `-0` are different
  if ( a === b ) return a !== 0 || 1 / a == 1 / b;

  // Remember that `null == undefined`
  // If one of them is null/undefined, check if they are really equal
  /* jshint eqnull: true */
  if ( a == null || b == null ) return a === b;

  // If they have a different `[[Class]]` name, they are different
  var className = toString.call( a );
  if ( className != toString.call( b ) ) {
    return false;
  }

  // They have the same `[[Class]]` name, so...
  switch ( className ) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]":
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object String]":
      // "5" == new String("5")
      // new String("5") != new String("5")
      return "" + a === "" + b;
    case "[object Number]":
      a = +a;
      b = +b;
      // NaN !== NaN
      // `a` is NaN      // `b` is also NaN
      if ( a !== a ) return b !== b;
      // Consider that `0` and `-0` are different
      return a === 0 ? 1 / a === 1 / b : a === b;
    case "[object Date]":
    case "[object Boolean]":
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations
      // Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent
      return +a === +b;
  }

  var areArrays = className === "[object Array]";

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
      ( !m.isPlainObject( a ) || !m.isPlainObject( b ) )
    ) {
      return false;
    }

  }

  // If we are here, means that we are working with:
  // arrays, or plain objects, or objects with the same constructor

  // Detect cyclic structures
  var length = aStack.length;
  while ( length-- ) {
    if ( aStack[ length ] === a ) {
      return bStack[ length ] === b;
    }
  }

  // Add the first object to the stack of traversed objects
  aStack.push( a );
  bStack.push( b );

  // Recursively compare objects and arrays
  if ( areArrays ) {

    // Compare array lengths to determine if a deep comparison is necessary
    length = a.length;
    if ( length !== b.length ) {
      return false;
    }

    // Deep compare the contents, ignoring non-numeric properties
    while ( length-- ) {
      if ( !( eq( a[ length ] , b[ length ] , aStack , bStack ) ) ) {
        return false;
      }
    }

  } else {

    // Deep compare objects
    var keys = m.keys( a ), key;
    length = keys.length;

    // Ensure that both objects contain the same number of properties before comparing deep equality
    if ( m.keys( b ).length !== length ) {
      return false;
    }

    while ( length-- ) {
      // Deep compare each member
      key = keys[ length ];
      if ( !( m.has( b , key ) && eq( a[ key ] , b[ key ] , aStack , bStack ) ) ) {
        return false;
      }
    }

  }

  // Remove the first object from the stack of traversed objects
  aStack.pop();
  bStack.pop();

  return true;

};

m.isEqual = function ( a , b ) {
  return eq( a , b , [] , [] );
};

m.isError = function ( obj ) {
  return m.type( obj ) === "error";
};

m.isFinite = function ( obj ) {
  return isFinite( obj ) && !isNaN( parseFloat( obj ) );
};

m.isFunction = function ( obj ) {
  return m.type( obj ) === "function";
};

// Optimize `m.isFunction` if appropriate
// Work around an IE 11 bug
// Work around a Safari 8 bug: in Safari 8 `typeof Int8Array` returns "object"
if ( typeof /./ != "function" && typeof Int8Array != "object" ) {
  m.isFunction = function ( obj ) {
    return typeof obj == "function" || false;
  };
}

m.isNaN = function ( obj ) {
  return obj !== +obj && m.isNumber( obj );
};

m.isNull = function ( obj ) {
  return obj === null;
};

m.isNumber = function ( obj ) {
  return m.type( obj ) === "number";
};

m.isObject = function ( obj ) {
  return m.type( obj ) === "object";
};

m.isObjectLike = function ( obj ) {
  var type;
  return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
};

m.isPlainObject = function ( obj ) {

  var ctor;

  // If it's not an object
  if ( !m.isObject( obj ) ) {
    return false;
  }

  // If constructor is null or undefined
  if ( !(ctor = obj.constructor) ) {
    // If object hasn't own 'constructor'
    // e.g. 'Object.create( null )'
    return !m.has( obj , "constructor" );
  }

  // If has constructor
  // {}.constructor        instanceof {}.constructor        > true
  // (new Foo).constructor instanceof (new Foo).constructor > false
  return ctor instanceof ctor;

};

m.isRegExp = function ( obj ) {
  return m.type( obj ) === "regexp";
};

m.isString = function ( obj ) {
  return m.type( obj ) === "string";
};

m.isUndefined = function ( obj ) {
  return obj === void 0;
};

var
strWin = "[object Window]",
strWinConst = "function Window() { [native code] }",
_toString = root.toString;

m.isWindow = function ( obj ) {

  var constructor;

  /* jshint eqnull: true */
  if ( obj == null || obj !== obj.window ) {
    return false;
  }

  try {

    return _toString.call( obj ) === strWin;

  } catch ( e ) { // IE

    constructor = obj.constructor;

    if ( !constructor || !constructor.toString || m.has( obj , "constructor" ) ) {
      return false;
    }

    return constructor.toString() === strWinConst;

  }

};

var class2type = {
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

// BASED ON jQuery.type
m.type = function ( obj ) {
  /* jshint eqnull: true */
  if ( obj == null ) {
    return obj + "";
  }
  var type = typeof obj;
  return type === "object" || type === "function" ?
    class2type[ toString.call( obj ) ] || "object" :
    type;
};

/* Events */

// A module that can be mixed in to *any object* in order to provide it with
// custom events.
//
//   var object = {};
//   m.extend( object , m.events );
//   object.on( "expand" , function(){ alert("expanded"); } );
//   object.trigger( "expand" );
//

/* Events */
m.events = {};

var
rnotwhite = /\S+/g,
rtype = /^[^.]+/g,
rnamespace = /\.[^.]+/g,
inCommonWith = function ( parArr1 , parArr2 ) {

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
    if ( indexOf.call( arr2 , arr1[i] ) !== -1 ) {
      return true;
    }
  }

  return false;

},
/*
 * Get the indexes of the events listeners
 * that correspond with the type, namespaces and handler of that object
 *
 * If one of the parameters is "true", it will just check if that parameter
 * exists on the event listener
 *
 * namespaces work like the classes in CSS
 *   e.g. if I trigger "change", it will trigger "change.namespace1" also
 */
getListeners = function ( self , type , namespaces , handler ) {

  var
  results = [],
  events, thisEvent, i;

  if ( !self.__m__ ) {
    return false;
  }

  events = self.__m__.events;
  i = events ? events.length : 0;

  // Return 'false' instead of an empty array
  if ( !i ) {
    return false;
  }

  while ( i-- ) {

    thisEvent = events[ i ];

    if (
      (
        !type || // If 'type' was not provided, return true
        thisEvent.type === type || // Otherwise, check if it's equal
        (type === true && thisEvent.type) // If the parameter provided is 'true',
        // just check if 'type' exists
      ) &&
      (
        !handler ||
        thisEvent.handler === handler ||
        (handler === true && thisEvent.handler)
      ) &&
      (
        !namespaces ||
        namespaces.length === 0 ||
        (namespaces === true && thisEvent.namespaces) ||
        (thisEvent.namespaces && inCommonWith( thisEvent.namespaces , namespaces ))
      )
    ) {

      results.push( i );

    }

  }

  // Return 'false' instead of an empty array
  if ( results.length === 0 ) {
    return false;
  }

  return results;

};

/*
How data is stored:

this.__m__.events = [
  {
    type: "",
    namespaces : [], // save the dots e.g. ".name1",".name2"
    handler : Function,
    data : {},
    index : 0
  }
]
*/

// DEV
EXPOSE( "getListeners" , getListeners );

m.events.off = function ( types , handler ) {

  // Be sure that we have a place to store the data
  if ( !this.__m__ ) return this;
  if ( !this.__m__.events ) return this;

  var type, namespaces, t, eventIndexes, j, p = 0, noopArr = [];

  // Handle multiple events separated by a space
  types = ( types || "" ).match( rnotwhite ) || [ "" ];
  t = types.length;

  while ( t-- ) {

    type = ( types[ t ].match( rtype ) || noopArr )[ 0 ];
    namespaces = types[ t ].match( rnamespace );

    eventIndexes = getListeners( this , type , namespaces , handler );

    if ( !eventIndexes ) continue;

    j = eventIndexes.length;

    p = 0;

    while ( j-- ) {

      this.__m__.events.splice( eventIndexes[ j ] - p , 1 );

      ++p;

    }

  }

  return this;

};

m.events.on = function ( types , handler , data ) {

  // Be sure that types were provided
  if ( !types ) return this;

  // Be sure that an handler is provided
  if ( !handler ) return this;

  // Be sure that we have a place to store the data
  if ( !this.__m__ ) this.__m__ = {};
  if ( !this.__m__.events ) this.__m__.events = [];

  var type, namespaces, t;

  // Handle multiple events separated by a space
  types = ( types || "" ).match( rnotwhite ) || [ "" ];
  t = types.length;

  while ( t-- ) {

    type = types[ t ].match( rtype );

    if ( !type ) {
      continue;
    }

    type = type[ 0 ];
    namespaces = types[ t ].match( rnamespace ) || undefined;

    // Save
    this.__m__.events.push({
      type : type,
      namespaces : namespaces,
      handler : handler,
      data : data
    });

  }

  return this;

};

m.events.trigger = function ( types ) {

  // Be sure that we have a place to store the data
  if ( !this.__m__ ) return this;
  if ( !this.__m__.events ) return this;

  var type, namespaces, t, eventIndexes, j,
  args = slice.call( arguments , 1 ),
  a1 = args[ 0 ],
  a2 = args[ 1 ],
  a3 = args[ 2 ],
  noopArr = [];

  // Handle multiple events separated by a space
  types = ( types || "" ).match( rnotwhite ) || [ "" ];
  t = types.length;

  while ( t-- ) {

    type = ( types[ t ].match( rtype ) || noopArr )[ 0 ];
    namespaces = types[ t ].match( rnamespace );

    // "getListeners()" returns an array with the indexes of the listeners inverted
    // The loop inside 'switch' will also invert the order
    // So, the handlers will be executed in the same order they were binded

    eventIndexes = getListeners( this , type , namespaces );

    if ( !eventIndexes ) continue;

    j = eventIndexes.length;

    switch ( args.length ) {
      case 0: while ( j-- ) this.__m__.events[ eventIndexes[ j ] ].handler.call( this ); break;
      case 1: while ( j-- ) this.__m__.events[ eventIndexes[ j ] ].handler.call( this , a1 ); break;
      case 2: while ( j-- ) this.__m__.events[ eventIndexes[ j ] ].handler.call( this , a1 , a2 ); break;
      case 3: while ( j-- ) this.__m__.events[ eventIndexes[ j ] ].handler.call( this , a1 , a2 , a3 ); break;
      default: while ( j-- ) this.__m__.events[ eventIndexes[ j ] ].handler.apply( this , args ); break;
    }

  }

  return this;

};

/* Model */

m.Model = function ( attributes ) {

  this.attributes = {};
  this.set( attributes );

  this.cid = m.uniqueId( "c" );

  if ( this.initialize ) {
    this.initialize.apply( this , arguments );
  }

};

m.Model.fromPath = function ( obj , path , mode , val ) {

  path = m.isString( path ) ? path.split( "." ) : path;

  if ( !path || !path.length ) {
    return obj;
  }

  var i = 0, len = path.length - 1;

  while ( obj && i < len ) {
    obj = obj[ path[ i ] ];
    i++;
  }

  switch ( mode ) {

    case "has" :
      return m.has( obj , path[ i ] );

    case "set" :
      if ( obj ) obj[ path[ i ] ] = val;
      break;

    case "unset" :
      if ( obj ) delete obj[ path[ i ] ];
      break;

  }

  return obj ? obj[ path[ i ] ] : undefined;

};

m.Model.extend = m.classExtend;

m.Model.prototype = {
  constructor : m.Model
};

m.extend( m.Model.prototype , m.events );

m.Model.prototype.clear = function(){
  var attrs = {}, key;
  for ( key in this.attributes ) {
    attrs[ key ] = undefined;
  }
  return this.set( attrs , true );
};

m.Model.prototype.clone = function(){
  return new this.constructor( this.attributes );
};

m.Model.prototype.get = function ( path ) {
  return m.Model.fromPath( this.attributes , path );
};

m.Model.prototype.has = function ( path ) {
  return m.Model.fromPath( this.attributes , path , "has" );
};

m.Model.prototype.set = function ( key , val , unset ) {

  var oldValue, name, path, pathArr, parentPathArr,
  parent, attrs, changes, change, current, type;

  /* jshint eqnull: true */
  if ( key == null ) return this;

  // Handle both `"key", value` and `{key: value}` -style arguments
  if ( typeof key === "object" ) {
    attrs = key;
    unset = val;
  } else {
    (attrs = {})[ key ] = val;
  }

  // Run validation
  if ( this.validate && !this.validate( attrs ) ) return false;

  changes = [];

  current = this.attributes;

  // For each `set` attribute, update or delete the current value
  for ( path in attrs ) {

    // Reduces the need to '.split(".")' (because m.Model.fromPath accepts arrays)
    pathArr = m.isString( path ) ? path.split( "." ) : path;

    val = attrs[ path ];

    oldValue = this.get( pathArr );

    // Reset type
    type = null;

    // Reset change
    change = null;

    // Delete
    if ( unset ) {

      if ( this.has( pathArr ) ) {

        type = "delete";

      }

      // Add
    } else if ( !unset && !this.has( pathArr ) ) {

      type = "add";

      // Update
    } else if ( !m.isEqual( oldValue , val ) ) {

      type = "update";

    }

    // If changed something
    if ( type ) {

      // Parent & Name
      parentPathArr = slice.call( pathArr );
      name = parentPathArr.pop();
      parent = m.Model.fromPath( current , parentPathArr );

      switch ( type ) {

        case "add" :

          if ( m.isArray( parent ) && !m.isNaN( name - 0 ) ) {
            change = this._splice( parentPathArr.toString() , name , 0 , val );
          } else {
            m.Model.fromPath( current , pathArr , "set" , val );
          }
          break;

        case "update" :

          m.Model.fromPath( current , pathArr , "set" , val );
          break;

        case "delete" :

          m.Model.fromPath( current , pathArr , "unset" );
          break;

      }

      change = change || {
        model : this,
        path : path,
        name : name,
        object : parent,
        oldValue : oldValue,
        newValue : !unset ? val : undefined,
        type : type
      };

      changes.push( change );

    }

  }

  // Trigger all relevant attribute changes
  if ( changes.length ) this.trigger( "change" , changes );

  return this;

};

var _splice = function ( path , index /* , howmanytodelete */ ) {

  var change, object, oldLength, added, addedCount, removed, removedCount;

  object = m.Model.fromPath( this.attributes , path );

  index = index - 0;

  while ( index && !m.has( object , index - 1 ) ) {
    index--;
  }

  oldLength = object.length;
  removed = splice.apply( object , slice.call( arguments , 1 ) );
  removedCount = removed.length;

  // If changed something
  if ( removedCount || oldLength !== object.length ) {

    added = slice.call( arguments , 3 );
    addedCount = added.length;

    change = {
      model        : this,
      path         : path,
      added        : added,
      addedCount   : addedCount,
      index        : index,
      object       : object,
      removed      : removed,
      removedCount : removedCount,
      type         : "splice"
    };

  }

  return change;

};

m.Model.prototype.splice = function(){

  var changes = [ _splice.apply( this , arguments ) ];

  if ( changes[ 0 ] ) {

    // Trigger all relevant attribute changes
    this.trigger( "change" , changes );

    return changes[ 0 ].removed;

  }

};

m.Model.prototype.unset = function ( attr ) {

  if ( typeof attr === "object" ) {

    return this.set( attr , true );

  } else {

    return this.set( attr , undefined , true );

  }

};

/* jshint ignore:start */
(function ( m ) {
/* jshint ignore:end */

if ( typeof document === "undefined" ) {
  return;
}

m.view = {};


var map = [],

mapAdd = function ( component ) {
  if ( mapGet( component.el ) ) return;
  var i = component.mapIndex = map.length;
  map[ i ] = component;
  component.el.setAttribute( "data-m" , i );
},

mapRemove = function ( component ) {
  map[ component.mapIndex ] = null;
  component.el.removeAttribute( "data-m" );
  // Prevent memory leaks (clean all references)
  m.each( component , function ( name ) {
    component[ name ] = undefined;
  } );
},

mapGet = function ( el ) {
  if ( el === window ) {
    return map[ 0 ];
  }
  var component = el.getAttribute ? map[ el.getAttribute( "data-m" ) ] : undefined;
  return component && component.el === el ? component : undefined;
};

(function ( el ) {
  var
  Constructor = function(){},
  component = new Constructor();
  component.el = el;
  map[ 0 ] = component;
})( window );

var selfClosingTags = ("area base br col command embed hr img " +
"input keygen link meta param source track wbr").split(" "),

rootComponents = [], rootParents = [];

// Core

m.view.appendTo = function ( component , parent ) {

  var index = indexOf.call( rootParents , parent );

  if ( index !== -1 && rootComponents[ index ].constructor === component.constructor ) {

    rootComponents[ index ].props = component.props;
    rootComponents[ index ].update();

    return;

  }

  rootComponents.push( component );
  rootParents.push( parent );

  // Set dom element
  component.setEl();

  // Render
  render( component );

  // Add to DOM
  parent.appendChild( component.el );

};

var _setEl = function ( el ) {

  this.el = el || document.createElement( this.tagName );

  mapAdd( this );

  this.setEl = null; // useful for debugging

  return this.el;

};

m.view.createClass = function ( tagName , proto ) {

  if ( !tagName ) {
    m.err( "m.view.createClass" , "Please provide a tag name" );
  }

  var Constructor = function ( props ) {
    this.props = props;
  };

  Constructor.prototype = m.extend( {} , proto , {
    constructor : Constructor,
    tagName : tagName,
    setEl : _setEl,
    selfClosingTag : indexOf.call( selfClosingTags , tagName ) !== -1,
    _init : false,
    dom : false
  } );

  return function ( props ) {
    return new Constructor( props );
  };

};

m.view.select = function ( el ) {

  if ( !el ) {
    return;
  }

  var Constructor, component;

  if ( ( component = mapGet( el ) ) ) {
    return component;
  }

  Constructor = function(){};
  component = new Constructor();

  _setEl.call( component , el );

  return component;

};

var EMPTYOBJ = {},

revent = /^on/,

cssPrefixes = [ "Webkit", "Moz", "ms" ],

diff_attrs = function ( component ) {

  var newAttrs = component.newAttrs,
  prevAttrs = component.prevAttrs,
  el = component.el, key;

  prevAttrs = prevAttrs || EMPTYOBJ;
  newAttrs  = newAttrs  || EMPTYOBJ;

  for ( key in prevAttrs ) {

    if ( key in newAttrs ) {

      if ( !m.isEqual( prevAttrs[ key ] , newAttrs[ key ] ) ) {

        eachAttr( component , el , key , prevAttrs[ key ] , newAttrs[ key ] );

      }

    } else {

      eachAttr( component , el , key , prevAttrs[ key ] );

    }

  }

  for ( key in newAttrs ) {

    if ( !( key in prevAttrs ) ) {

      eachAttr( component , el , key , prevAttrs[ key ] , newAttrs[ key ] );

    }

  }

},

eachAttr = function ( component , el , key , elemA , elemB ) {

  var className, id, eventName;

  switch ( key ) {

    case "style" :

      diff_attrs_style( el , elemA , elemB );

      break;

    case "className" :

      className = trim.call( elemB );

      // To prevent unnecessary rendering
      if ( className != el.className ) {
        el.className = className;
      }

      break;

    case "classes" :

      className = trim.call( elemB.join(" ") );

      // To prevent unnecessary rendering
      if ( className != el.className ) {
        el.className = className;
      }

      break;

    case "id" :

      id = trim.call( elemB );

      // To prevent unnecessary rendering
      if ( el.id != elemB ) {
        el.id = elemB;
      }

      break;

    case "value" :

      el.value = elemB;

      break;

    default :

      if ( revent.test( key ) ) {

        eventName = trim.call( key.replace( revent , "" ) );

        // Remove old if existed
        if ( elemA ) {
          m.events.off.call( component , eventName , elemA );
        }

        // Add if new is defined
        if ( elemB ) {
          m.events.on.call( component , eventName , elemB );
        }

        break;

      }

      if ( key != "data-m" ) {

        if ( elemB ) {
          el.setAttribute( key , elemB + "" );
        } else {
          el.removeAttribute( key );
        }

      }

      if ( key in el ) {
        el[ key ] = elemB;
      }

  }

},

// BASED ON JQUERY
// Return a css property mapped to a potentially vendor prefixed property
vendorPropName = function ( name , style ) {

  // Shortcut for names that are not vendor prefixed
  if ( name in style ) {
    return name;
  }

  // Check for vendor prefixed names
  var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ) {
      return name;
    }
  }

  return origName;

},

diff_attrs_style = function ( el , prevStyle , newStyle ) {

  var key;

  prevStyle = prevStyle || EMPTYOBJ;
  newStyle  = newStyle  || EMPTYOBJ;

  for ( key in prevStyle ) {

    if ( key in newStyle ) {

      if ( !m.isEqual( prevStyle[ key ] , newStyle[ key ] ) ) {

        el.style[ vendorPropName( key , el.style ) ] = newStyle[ key ];

      }

    } else {

      el.style[ vendorPropName( key , el.style ) ] = null;

    }

  }

  for ( key in newStyle ) {

    if ( !( key in prevStyle ) ) {

      el.style[ vendorPropName( key , el.style ) ] = newStyle[ key ];

    }

  }

};

var equalComponent = function ( A , B ) {

  // If same
  if ( A === B ) {
    return true;
  }

  // If both are strings
  if ( m.isString( A ) && m.isString( B ) ) {
    return true;
  }

  // If same key
  // If same component class
  return A.key == B.key && A.constructor === B.constructor;

},

diff_dom_make = function ( component , elem , t , x , y , adjust ) {

  if ( elem === null ) { // !important (see render.js line 30)
    return;
  }

  var componentEl = component.el,
  componentElChildNodes = componentEl.childNodes,
  xx = x + adjust - 1, // !important (see render.js line 30)
  elemA, elemB, el, nextSibling;

  switch ( t ) {

    case EQUAL :

      elemA = component.prevDom[ x ];
      elemB = component.newDom[ y ];

      if ( !m.isString( elemA ) ) {

        // Preserve the correct component
        // (because we later overwrite '.prevDom' with '.newDom')
        component.newDom[ y ] = elemA;

        if ( elemA.dom !== true ) {

          if ( !m.isEqual( elemA.props , elemB.props ) ) {

            elemA.props = elemB.props; // !important

            // Render
            render( elemA );

          }

        } else {

          elemA.props = elemB.props; // !important

          // Render
          render( elemA );

        }

      } else if ( elemA != elemB ) {

        componentElChildNodes[ xx ].nodeValue = elemB;

      }

      break;

    case INSERTION :

      if ( !m.isString( elem ) ) {

        el = elem.setEl(); // only create dom elements here

        // Render
        render( elem );

      } else {

        el = document.createTextNode( elem );

      }

      nextSibling = componentElChildNodes[ xx ];

      if ( nextSibling ) {
        componentEl.insertBefore( el , nextSibling );
      } else {
        componentEl.appendChild( el );
      }

      break;

    case DELETION :

      if ( !m.isString( elem ) ) {

        componentEl.removeChild( elem.el );

        // Remove from map
        mapRemove( elem );

      } else {

        componentEl.removeChild( componentElChildNodes[ xx ] );

      }

      break;

  }

};

// BASED ON https://github.com/cubicdaiya/onp/blob/master/javascript/onp.js
// INFO HERE http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf

var

EQUAL = 0,
DELETION = -1,
INSERTION = 1,

P = function ( x , y , k ) {
  return {
    x : x,
    y : y,
    k : k
  };
},

EMPTYARR = [],

diff_dom = function ( component, A , B ) {

  // `make` is called for each element of the shortest edit script

  // VARS

  var a, b, M, N,
      reverse  = false,
      ALen     = A ? A.length : 0,
      BLen     = B ? B.length : 0,
      i        = 0,
      adjust   = 0,
      path, pathposi,
      len, snake,
      delta, deltaPlus1, deltaMinus1,
      fp, p, r, epc, k,
      x_idx, y_idx, px_idx, py_idx,
      epcY_epcX, py_px;

  if ( ALen === 0 && BLen === 0 ) {
    return;
  }

  if ( ALen === 0 ) {
    for ( ; i < BLen ; i++ ) {
      diff_dom_make( component , B[ i ] , INSERTION , 0 , i , i /* adjust++ */ );
    }
    return;
  }

  if ( BLen === 0 ) {
    for ( ; i < ALen ; i++ ) {
      diff_dom_make( component , A[ i ] , DELETION , i , 0 , -i /* adjust-- */ );
    }
    return;
  }

  // Make sure:
  // M = a.length
  // N = b.length
  // N >= M

  if ( BLen >= ALen ) {
    a       = A;
    b       = B;
  } else {
    a       = B;
    b       = A;
    reverse = true;
  }

  M = a.length;
  N = b.length;

  // ALGORITHM

  snake = function ( k , p , pp ) {

    var r, x, y;

    if ( p > pp ) {
      r = path[ k - 1 ];
      y = p;
    } else {
      r = path[ k + 1 ];
      y = pp;
    }

    x = y - k;

    while ( x < M && y < N && equalComponent( a[ x ] , b[ y ] ) ) {
      ++x;
      ++y;
    }

    pathposi[ path[ k ] = pathposi.length ] = P( x , y , r );

    return y;

  };

  delta    = N - M;
  fp       = [];
  path     = [];
  pathposi = [];

  deltaPlus1 = delta + 1;
  deltaMinus1 = delta - 1;

  for ( i = -M + 1 ; i <= N + 1 ; ++i ) {
    fp[ i ] = path[ i ] = -1;
  }

  p = -1;

  do {

    ++p;

    for ( k = -p ; k <= deltaMinus1 ; ++k ) {
      fp[ k ] = snake( k , fp[ k - 1 ] + 1 , fp[ k + 1 ] );
    }

    for ( k = delta + p ; k >= deltaPlus1 ; --k ) {
      fp[ k ] = snake( k , fp[ k - 1 ] + 1 , fp[ k + 1 ] );
    }

    fp[ delta ] = snake( delta , fp[ deltaMinus1 ] + 1 , fp[ deltaPlus1 ] );

  } while ( fp[ delta ] !== N );

  // ed = delta + 2 * p;

  r = path[ delta ];

  // RECORD SEQ

  epc = [];
  while ( r !== -1 ) {
    epc[ epc.length ] = P( pathposi[ r ].x , pathposi[ r ].y , null );
    r = pathposi[ r ].k;
  }

  i = epc.length;

  x_idx  = y_idx  = 1;
  px_idx = py_idx = 0;

  while ( i-- ) {

    while ( px_idx < epc[ i ].x || py_idx < epc[ i ].y ) {

      epcY_epcX = epc[ i ].y - epc[ i ].x;
      py_px = py_idx - px_idx;

      if ( epcY_epcX > py_px ) {

        if ( reverse ) {

          diff_dom_make( component , b[ py_idx ] , DELETION , py_idx , px_idx , adjust-- );

        } else {

          diff_dom_make( component , b[ py_idx ] , INSERTION , px_idx , py_idx , adjust++ );

        }

        ++y_idx;
        ++py_idx;

      } else if ( epcY_epcX !== py_px ) { // epcY_epcX < py_px

        if ( reverse ) {

          diff_dom_make( component , a[ px_idx ] , INSERTION , py_idx , px_idx , adjust++ );

        } else {

          diff_dom_make( component , a[ px_idx ] , DELETION , px_idx , py_idx , adjust-- );

        }

        ++x_idx;
        ++px_idx;

      } else {

        if ( reverse ) {

          diff_dom_make( component , a[ px_idx ] , EQUAL , py_idx , px_idx , adjust );

        } else {

          diff_dom_make( component , a[ px_idx ] , EQUAL , px_idx , py_idx , adjust );

        }

        ++x_idx;
        ++y_idx;
        ++px_idx;
        ++py_idx;

      }

    }

  }

};

m.view.dom = {};

m.each( ("a abbr address area article aside audio b base bdi bdo big blockquote body br " +
"button canvas caption cite code col colgroup command data datalist dd del details dfn dialog " +
"div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 " +
"head header hr html i iframe img input ins kbd keygen label legend li link " +
"main map mark menu menuitem meta meter nav noscript object ol optgroup option " +
"output p param picture pre progress q rp rt ruby s samp script section select small " +
"source span strong style sub summary sup table tbody td textarea tfoot th " +
"thead time title tr track u ul var video wbr").split(" ") , function ( i , tagName ) {

  var Constructor = function ( props ) {
    this.props = props;
  };

  Constructor.prototype = {
    constructor : Constructor,
    tagName : tagName,
    setEl : _setEl,
    selfClosingTag : indexOf.call( selfClosingTags , tagName ) !== -1,
    dom : true,
    render : function(){
      return this.props;
    }
  };

  m.view.dom[ tagName ] = function(){
    return new Constructor( slice.call( arguments ) );
  };

} );

/* Events */

/*
pointermove: a pointer moves, similar to touchmove or mousemove.
pointerdown: a pointer is activated, or a device button held.
pointerup: a pointer is deactivated, or a device button released.
pointerover: a pointer has moved onto an element.
pointerout: a pointer is no longer on an element it once was.
pointerenter: a pointer enters the bounding box of an element.
pointerleave: a pointer leaves the bounding box of an element.
pointercancel: a pointer will no longer generate events
*/

// Fast reference for me
var mComponentEvent = function ( src , props ) {

  // Event object
  if ( src && src.type ) {

    this.originalEvent = src;
    this.type = src.type;

  // Event type
  } else {

    this.type = src;

  }

  // Support pointer events
  if ( this.type in eventTypes ) {
    this.type = eventTypes[ this.type ];
  }

  // Put explicitly provided properties onto the event object
  if ( props ) {
    m.extend( this , props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || m.now();

};

mComponentEvent.prototype = {
  constructor : mComponentEvent,
  isDefaultPrevented : false,
  isPropagationStopped : false,
  isImmediatePropagationStopped : false,
  stopPropagation : function(){
    this.isPropagationStopped = true;
  },
  stopImmediatePropagation : function(){
    this.isPropagationStopped = true;
    this.isImmediatePropagationStopped = true;
  },
  preventDefault : function(){
    this.isDefaultPrevented = true;
    this.originalEvent.preventDefault();
  }
};

var
rnotwhite = /\S+/g,
rkeyEvent = /^key/,
rpointerEvent = /^(?:mouse|pointer|contextmenu)|click/,
eventTypes = {
  "mousemove" : "pointermove",
  "touchmove" : "pointermove",
  "mousedown" : "pointerdown",
  "touchstart" : "pointerdown",
  "mouseup" : "pointerup",
  "touchend" : "pointerup",
  "mouseover" : "pointerover",
  "touchenter" : "pointerover",
  "mouseout" : "pointerout",
  "touchleave" : "pointerout",
  "mousewheel" : "wheel"
},
// BASED ON jQuery
helpers = {
  fixHooks : {},
  // Includes some event props shared by KeyEvent and MouseEvent
  props : "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
  keyHooks : {
    props: "char charCode key keyCode".split(" "),
    filter: function ( event , original ) {
      // Add which for key events
      /* jshint eqnull: true */
      if ( event.which == null ) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }
      return event;
    }
  },
  pointerHooks : {
    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
    filter: function ( event , original ) {

      var
      eventDoc,
      doc, body,
      button = original.button,
      fromElement = original.fromElement;

      // Calculate pageX/Y if missing and clientX/Y available
      /* jshint eqnull: true */
      if ( event.pageX == null && original.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Find correct target in mobile
      if ( event.originalEvent.changedTouches && event.originalEvent.changedTouches[0] ) {
        event.target = document.elementFromPoint(
          event.originalEvent.changedTouches[0].clientX,
          event.originalEvent.changedTouches[0].clientY
        );
      }

      // Add relatedTarget, if necessary
      if ( !event.relatedTarget && fromElement ) {
        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
      }

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      if ( !event.which && button !== undefined ) {
        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
      }

      return event;

    }
  },
  // Create a writable copy of the event object and normalize some properties
  fix: function ( event ) {

    var
    i,
    prop,
    copy,
    type = event.type,
    originalEvent = event,
    fixHook = this.fixHooks[ type ];

    if ( !fixHook ) {
      // This will add new fix hooks, with the exact name, so that later we don't need to test again
      this.fixHooks[ type ] = fixHook =
        rpointerEvent.test( type ) ? this.pointerHooks :
        rkeyEvent.test( type ) ? this.keyHooks :
        {};
    }

    // Copy of all properties
    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

    // Create new event
    event = new mComponentEvent( originalEvent );

    // Add props
    i = copy.length;
    while ( i-- ) {
      prop = copy[ i ];
      event[ prop ] = originalEvent[ prop ];
    }

		// All events should have a target
    if ( !event.target ) {
      event.target = originalEvent.srcElement || document;
    }

    // Target should not be a text node
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    // Make sure 'metaKey' is a boolean
    event.metaKey = !!event.metaKey;

    // Apply fix hook and return
    return fixHook.filter ? fixHook.filter( event , originalEvent ) : event;
  }
};

var eachTime = function ( event ) {

  event = helpers.fix( event );

  var
  curTargetDOM, curTargetCOMPONENT,
  handlers, handlerObj,
  i, j, k,
  len,
  start = true;

  function getNext(){
    if ( start ) {
      curTargetDOM = event.target;
    } else if ( curTargetDOM.parentNode ) {
      curTargetDOM = curTargetDOM.parentNode;
    } else if ( curTargetDOM === document ) {
      curTargetDOM = window;
    } else {
      curTargetDOM = null;
    }
    return curTargetDOM;
  }

  // Bubble or Propagate system here
  while ( !event.isPropagationStopped && getNext() ) {

    if ( start ) {
      start = false;
    }

    curTargetCOMPONENT = mapGet( curTargetDOM );

    if ( !curTargetCOMPONENT ) {
      continue;
    }

    if ( !event.bubbles ) {
      event.stopPropagation();
    }

    // "getListeners()" returns an array with the indexes of the listeners inverted
    // The loop will also invert the order
    // So, the handlers will be executed in the same order they were binded

    eventIndexes = getListeners( curTargetCOMPONENT , event.type );

    if ( !eventIndexes ) continue;

    j = eventIndexes.length;

    while ( j-- && !event.isImmediatePropagationStopped ) {

      event.currentTarget = curTargetDOM;

      event.handlerObj = handlerObj = curTargetCOMPONENT.__m__.events[ eventIndexes[ j ] ];

      event.data = handlerObj.data;

      // Normal dispatch
      event.result = handlerObj.handler.call( curTargetCOMPONENT , event );

    }

  }

};

(function ( root ) {
  var name, ron = /^on/;
  for ( name in root ) {
    if ( name.match( ron ) ) {
      root.addEventListener( name.replace( ron , "" ) , eachTime );
    }
  }
})( window );

var render = function ( component ) {

  if ( !component.dom && !component._init ) {

    component.model = new m.Model();

    component.update = function(){
      if ( component._init ) {
        render( component );
      }
    };

    if ( component.initialize ) {
      component.initialize();
    }

    component.model.on( "change" , component.update );

    component._init = true;

  }

  var result = component.render ? component.render() : [];

  component.newAttrs = result[ 0 ];

  // Diff dom
  if ( !component.selfClosingTag ) {

    result[ 0 ] = null; // instead of `result.shift();` !important for performance
    component.newDom = result;

    diff_dom( component , component.prevDom , component.newDom );

    component.prevDom = component.newDom;

  }

  // Diff attrs
  diff_attrs( component );

  component.prevAttrs = component.newAttrs;

  // Clean up
  delete component.newDom;
  delete component.newAttrs;

};

/* jshint ignore:start */
})( m );
/* jshint ignore:end */

/* jshint ignore:start */
(function ( m ) {
/* jshint ignore:end */

if ( typeof document === "undefined" ) {
  return;
}

m.ui = {};


// Shortcuts

var

a = m.view.dom.a,
b = m.view.dom.b,
br = m.view.dom.br,
button = m.view.dom.button,
div = m.view.dom.div,
em = m.view.dom.em,
form = m.view.dom.form,
h1 = m.view.dom.h1,
h2 = m.view.dom.h2,
h3 = m.view.dom.h3,
h4 = m.view.dom.h4,
h5 = m.view.dom.h5,
h6 = m.view.dom.h6,
i = m.view.dom.i,
img = m.view.dom.img,
input = m.view.dom.input,
li = m.view.dom.li,
small = m.view.dom.small,
span = m.view.dom.span,
strong = m.view.dom.strong,
style = m.view.dom.style,
table = m.view.dom.table,
tbody = m.view.dom.tbody,
td = m.view.dom.td,
textarea = m.view.dom.textarea,
tfoot = m.view.dom.tfoot,
th = m.view.dom.th,
thead = m.view.dom.thead,
tr = m.view.dom.tr,
u = m.view.dom.u,
ul = m.view.dom.ul;

/* jshint ignore:start */
})( m );
/* jshint ignore:end */

/* Outro */

  if ( typeof DEV !== "undefined" ) m.DEV = DEV;

  if ( typeof define === "function" && define.amd ) {
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#anon
    define(function(){
      return m;
    });
  }

/* jshint ignore:start */
}.call(this));
/* jshint ignore:end */
