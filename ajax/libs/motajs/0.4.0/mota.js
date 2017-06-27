/*!
 * MotaJS v0.4.0
 * http://motapc97.github.io/motajs/
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Project
 * https://github.com/motapc97/MotaJS/
 *
 * Date: 2015-01-19T13:23Z
 */
/* jshint ignore:start */
(function ( root , factory ) {

  // Set up MotaJS appropriately for the environment. Start with AMD.
  if ( typeof define === "function" && define.amd ) {

    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#anon
    define(function(){
      return factory( root );
    });

  // Next for Node.js or CommonJS.
  } else if ( typeof exports !== "undefined" ) {

    if ( typeof module !== "undefined" && module.exports ) {
      exports = module.exports = factory( root );
    }
    exports.mota = factory( root );

  // Finally, as a browser global.
  } else {

    root.mota = factory( root );

  }

// Pass this if window is not defined yet
}( typeof window !== "undefined" ? window : this , function ( root ) {
/* jshint ignore:end */

var

// DEV

DEV = {},

EXPOSE = function ( name , obj ) {
  DEV[ name ] = obj;
},

// Save the previous value of the `mota` variable.
_mota = root.mota,

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

// mota
mota;

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

// mota
mota = function(){};

var motaData = function(){};

motaData.setup = function ( obj , name , value ) {
  var data = obj.__mota__ || ( obj.__mota__ = new motaData() );
  return name ? ( data[ name ] ? data[ name ] : ( data[ name ] = value ) ) : data;
};

motaData.get = function ( obj , name ) {
  var data = obj.__mota__;
  return name ? data && data[ name ] : data;
};

motaData.set = function ( obj , name , value ) {
  var data = obj.__mota__;
  return data ? ( data[ name ] = value ) : undefined;
};

motaData.del = function ( obj , name ) {
  var data = obj.__mota__;
  return name && data ? delete data[ name ] : delete obj.__mota__;
};

EXPOSE( "motaData" , motaData );

mota.VERSION = "0.4.0";

// http://jsperf.com/test-call-vs-apply/73
mota.apply = function ( func , context , a ) {

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

mota.classExtend = function ( protoProps , staticProps , optionalNew ) {

  var
  parent = this,
  child,
  constructor,
  Surrogate;

  if ( protoProps && mota.has( protoProps , "constructor" ) ) {
    constructor = protoProps.constructor;
  } else {
    constructor = parent;
  }

  if ( optionalNew ) {

    child = function ( ref , args ) {

      if ( this instanceof child ) {

        if ( ref === REFERENCE ) {

          return mota.apply( constructor , this , args );

        } else {

          return mota.apply( constructor , this , arguments );

        }

      } else {

        return new child( REFERENCE , arguments );

      }

    };

  } else {

    child = function(){
      return mota.apply( constructor , this , arguments );
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
    mota.extend( child.prototype , protoProps );
  }

  // Extend static props with the static props of the parent and the given static props
  mota.extend( child , parent , staticProps );

  // Set a convenience property in case the parent's prototype is needed later
  child.__super__ = parent.prototype;

  // Return
  return child;

};

mota.clone = function ( target ) {

  var deep, Cotr, result;

  // Handle a deep cloning situation
  if ( target === true && mota.has( arguments , 1 ) ) {
    deep = target;
    // Skip the boolean
    target = arguments[ 1 ];
  }

  if ( !mota.isObjectLike( target ) ) {
    return target;
  }

  switch ( mota.type( target ) ) {

    case "array" :
      return deep ? mota.extend( deep , [] , target ) : slice.call( target );

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
      return deep ? mota.extend( deep , {} , target ) : mota.extend( {} , target );

  }

};

// BASED ON jQuery.each
mota.each = function ( obj , callback ) {

  var i, length, breaker = mota.each.breaker;

  if ( mota.isArrayLike( obj ) ) {

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

mota.each.breaker = false;

mota.err = function ( funcName , msg ) {
  throw funcName + " ERROR: " + msg;
};

// BASED ON jQuery.extend
mota.extend = function ( target ) {

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
        if ( deep && copy && ( (copyType = mota.type( copy )) === "object" || copyType === "array" ) ) {

          if ( copyType === "array" ) {

            clone = src && mota.isArray( src ) ? src : [];

          } else {

            clone = src && mota.isObject( src ) ? src : {};

          }

          // Never move original objects, clone them
          target[ name ] = mota.extend( deep , clone , copy );

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

mota.has = function ( obj , key ) {
  /* jshint eqnull: true */
  return obj != null && hasOwn.call( obj , key );
};

// ADAPTATION FROM _.keys
mota.keys = function ( obj , _in ) {

  if ( !mota.isObjectLike( obj ) ) {
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
      if ( mota.has( obj , key ) ) {
        keys.push( key );
      }
    }
  }

  return keys;

};

mota.log = function ( funcName , msg ) {
  console.log( funcName + " LOG: " + msg );
};

mota.noConflict = function(){
  if ( _mota ) root.mota = _mota;
  return this;
};

mota.now = Date.now || function(){
  return +( new Date() );
};

// BASED ON _.pairs
mota.pairs = function ( obj ) {
  var keys = mota.keys( obj ),
  length = keys.length,
  pairs = Array( length ),
  i = 0;
  for ( ; i < length ; i++ ) {
    pairs[ i ] = [ keys[ i ] , obj[ keys[ i ] ] ];
  }
  return pairs;
};

mota.proxy = function ( context , method ) {

  var args, proxy, methodType = mota.type( method );

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
mota.uniqueId = function ( prefix ) {
  prefix = prefix ? prefix + "" : "";
  if ( !ids[ prefix ] ) {
    ids[ prefix ] = 0;
  }
  return prefix + (++ids[ prefix ]);
};

mota.isArguments = function ( obj ) {
  return toString.call( obj ) === "[object Arguments]";
};

// Define a fallback version of the method in browsers (ahem, IE), where
// there isn't any inspectable "Arguments" type.
if ( !mota.isArguments( arguments ) ) {
  mota.isArguments = function ( obj ) {
    return mota.has( obj , "callee" );
  };
}

mota.isArray = nativeIsArray || function ( obj ) {
  return mota.type( obj ) === "array";
};

// BASED ON an internal function of jQuery
mota.isArrayLike = function ( obj ) {

  if ( !obj || mota.isFunction( obj ) || mota.isWindow( obj ) || mota.isString( obj ) ) {
    return false;
  }

  var length = obj.length;

  return mota.isArray( obj ) || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;

};

mota.isBoolean = function ( obj ) {
  return obj === true || obj === false || mota.type( obj ) === "boolean";
};

mota.isDate = function ( obj ) {
  return mota.type( obj ) === "date";
};

var strDoc = "[object HTMLDocument]",
strDoc2 = "[object Document]"; // IE 9 & 10

mota.isDocument = function ( obj ) {

  if ( !obj ) {
    return false;
  }

  var className = toString.call( obj );

  return className === strDoc || className === strDoc2;

};

mota.isElement = function ( obj ) {
  return !!( obj && obj.nodeType === 1 );
};

// BASED ON _.isEmpty
mota.isEmpty = function ( obj ) {
  /* jshint eqnull: true */
  if ( obj == null ) {
    return true;
  }
  if ( mota.isArray( obj ) || mota.isString( obj ) || mota.isArguments( obj ) ) {
    return obj.length === 0;
  }
  for ( var key in obj ) {
    if ( mota.has( obj , key ) ) {
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
      ( !mota.isPlainObject( a ) || !mota.isPlainObject( b ) )
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
    var keys = mota.keys( a ), key;
    length = keys.length;

    // Ensure that both objects contain the same number of properties before comparing deep equality
    if ( mota.keys( b ).length !== length ) {
      return false;
    }

    while ( length-- ) {
      // Deep compare each member
      key = keys[ length ];
      if ( !( mota.has( b , key ) && eq( a[ key ] , b[ key ] , aStack , bStack ) ) ) {
        return false;
      }
    }

  }

  // Remove the first object from the stack of traversed objects
  aStack.pop();
  bStack.pop();

  return true;

};

mota.isEqual = function ( a , b ) {
  return eq( a , b , [] , [] );
};

mota.isError = function ( obj ) {
  return mota.type( obj ) === "error";
};

mota.isFinite = function ( obj ) {
  return isFinite( obj ) && !isNaN( parseFloat( obj ) );
};

mota.isFunction = function ( obj ) {
  return mota.type( obj ) === "function";
};

// Optimize `mota.isFunction` if appropriate
// Work around an IE 11 bug
// Work around a Safari 8 bug: in Safari 8 `typeof Int8Array` returns "object"
if ( typeof /./ != "function" && typeof Int8Array != "object" ) {
  mota.isFunction = function ( obj ) {
    return typeof obj == "function" || false;
  };
}

mota.isNaN = function ( obj ) {
  return obj !== +obj && mota.isNumber( obj );
};

mota.isNull = function ( obj ) {
  return obj === null;
};

mota.isNumber = function ( obj ) {
  return mota.type( obj ) === "number";
};

mota.isObject = function ( obj ) {
  return mota.type( obj ) === "object";
};

mota.isObjectLike = function ( obj ) {
  var type;
  return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
};

mota.isPlainObject = function ( obj ) {

  var ctor;

  // If it's not an object
  if ( !mota.isObject( obj ) ) {
    return false;
  }

  // If constructor is null or undefined
  if ( !(ctor = obj.constructor) ) {
    // If object hasn't own 'constructor'
    // e.g. 'Object.create( null )'
    return !mota.has( obj , "constructor" );
  }

  // If has constructor
  // {}.constructor        instanceof {}.constructor        > true
  // (new Foo).constructor instanceof (new Foo).constructor > false
  return ctor instanceof ctor;

};

mota.isRegExp = function ( obj ) {
  return mota.type( obj ) === "regexp";
};

mota.isString = function ( obj ) {
  return mota.type( obj ) === "string";
};

mota.isUndefined = function ( obj ) {
  return obj === void 0;
};

var strWin = "[object Window]",
strWin2 = "[object global]"; // Chrome & Opera (and Safari?)

mota.isWindow = function ( obj ) {

  if ( !obj || obj !== obj.window ) {
    return false;
  }

  var className = toString.call( obj );

  return className === strWin || className === strWin2;

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
mota.type = function ( obj ) {
  /* jshint eqnull: true */
  if ( obj == null ) {
    return obj + "";
  }
  var type = typeof obj;
  return type === "object" || type === "function" ?
    class2type[ toString.call( obj ) ] || "object" :
    type;
};

mota.events = {};

var
NOOPARR = [],
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

// Get the event listeners and add an `index` prop
getListeners = function ( self , type , namespaces , handler , context ) {

  var
  results = [],
  events, thisEvent, i = 0, len;

  events = motaData.get( self , "events" );
  len = events ? events.length : 0;

  // Return 'false' instead of an empty array
  if ( !len ) {
    return false;
  }

  for ( ; i < len ; i++ ) {

    thisEvent = events[ i ];

    if (
      (
        !type || // If 'type' was not provided, return true
        thisEvent.type === type // Otherwise, check if it's equal
      ) &&
      (
        !handler ||
        thisEvent.handler === handler
      ) &&
      (
        !namespaces ||
        namespaces.length === 0 ||
        ( thisEvent.namespaces && inCommonWith( thisEvent.namespaces , namespaces ) )
      ) &&
      (
        !context ||
        thisEvent.context === context
      )
    ) {

      thisEvent.index = i;

      results.push( thisEvent );

    }

  }

  // Return 'false' instead of an empty array
  if ( results.length === 0 ) {
    return false;
  }

  return results;

},

motaEventListener = function ( type , namespaces , handler , context ) {
  this.type = type;
  this.namespaces = namespaces; // dots are included e.g. [ ".name1" , ".name2" ]
  this.handler = handler;
  this.context = context;
};

// DEV
EXPOSE( "getListeners" , getListeners );

mota.events.off = function ( types , handler , context ) {

  var type, namespaces, t, eventListeners, j, events = motaData.get( this , "events" );

  // Be sure that we have a place to store the data
  if ( !events ) return this;

  // Handle multiple events separated by a space
  types = ( types || "" ).match( rnotwhite ) || [ "" ];
  t = types.length;

  while ( t-- ) {

    type = ( types[ t ].match( rtype ) || NOOPARR )[ 0 ];
    namespaces = types[ t ].match( rnamespace );

    eventListeners = getListeners( this , type , namespaces , handler , context );

    if ( !eventListeners ) continue;

    j = eventListeners.length;

    while ( j-- ) {

      events.splice( eventListeners[ j ].index , 1 );

    }

  }

  return this;

};

mota.events.on = function ( types , handler , context ) {

  // Be sure that types were provided
  if ( !types ) return this;

  // Be sure that an handler is provided
  if ( !handler ) return this;

  var type, namespaces, t,
  // Be sure that we have a place to store the data
  events = motaData.setup( this , "events" , [] );

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
    events.push( new motaEventListener( type , namespaces , handler , context ) );

  }

  return this;

};

mota.events.trigger = function ( types ) {

  var type, namespaces, t, eventListeners, j, len, thisEvent, args;

  // Be sure that we have a place to store the data
  if ( !motaData.get( this , "events" ) ) return this;

  args = slice.call( arguments , 1 );

  // Handle multiple events separated by a space
  types = ( types || "" ).match( rnotwhite ) || [ "" ];
  t = types.length;

  while ( t-- ) {

    type = ( types[ t ].match( rtype ) || NOOPARR )[ 0 ];
    namespaces = types[ t ].match( rnamespace );

    eventListeners = getListeners( this , type , namespaces );

    if ( !eventListeners ) continue;

    j = 0;
    len = eventListeners.length;

    for ( ; j < len ; j++ ) {

      thisEvent = eventListeners[ j ];

      /* jshint eqnull: true */
      mota.apply(
        thisEvent.handler,
        thisEvent.context != null ? thisEvent.context : this,
        args
      );

    }

  }

  return this;

};

mota.Model = function ( attributes ) {

  this.attributes = {};
  this.setAll( attributes );

  if ( this.initialize ) {
    this.initialize.apply( this , arguments );
  }

};

mota.Model.extend = mota.classExtend;

mota.Model.prototype = {
  constructor : mota.Model
};

mota.extend( mota.Model.prototype , mota.events );

var modelCachePath = {};

var modelPath = function ( path ) {
  if ( mota.isString( path ) ) {
    return ( modelCachePath[ path ] = path = modelCachePath[ path ] || path.split( "." ) );
  }
  return path;
};

var modelFromPath = function ( obj , path ) {

  path = modelPath( path );

  if ( !path || !path.length ) {
    return obj;
  }

  var i = 0, j = path.length - 1,
  exists = false, parent, parentPath, value, name;

  while ( mota.has( obj , path[ i ] ) && i < j ) {

    obj = obj[ path[ i ] ];

    i++;

  }

  /* jshint eqnull: true */
  if ( i === j && obj != null ) {

    parent = obj;

    parentPath = slice.call( path , 0 , -1 );

    name = path[ i ];

    value = obj[ name ];

    exists = mota.has( obj , name );

  }

  return {
    parent: parent,
    parentPath: parentPath,
    name: name,
    value: value,
    exists: exists
  };

};

mota.Model.prototype.clear = function(){

  var changes = [], self = this;

  mota.each( mota.keys( this.attributes ) , function ( i , key ) {

    var change = modelSet.call( self , key , null , true );

    if ( change ) {
      changes.push( change );
    }

  } );

  if ( changes.length ) {
    this.trigger( "change" , changes );
  }

  return this;

};

mota.Model.prototype.clone = function(){
  return new this.constructor( mota.pairs( this.attributes ) );
};

mota.Model.prototype.get = function ( path ) {
  return modelFromPath( this.attributes , path ).value;
};

mota.Model.prototype.has = function ( path ) {
  return modelFromPath( this.attributes , path ).exists;
};

var modelSet = function ( path , val , unset ) {

  var parent, parentPath, oldValue, exists, name, current, change, data, type = null;

  /* jshint eqnull: true */
  if ( path == null ) {
    return this;
  }

  current = this.attributes;
  path = modelPath( path );

  data = modelFromPath( current , path );

  parent = data.parent;
  parentPath = data.parentPath;
  oldValue = data.value;
  exists = data.exists;
  name = data.name;

  /* jshint eqnull: true */
  if ( parent == null ) {
    return this;
  }

  // Delete
  if ( unset ) {

    if ( exists ) {

      type = "delete";

    }

  // Add
  } else if ( !exists ) {

    type = "add";

  // Update
  } else if ( !mota.isEqual( oldValue , val ) ) {

    type = "update";

  }

  // If something will change
  if ( type ) {

    switch ( type ) {

      case "add" :

        change = _splice.call( this , parentPath , true , name , 0 , val );

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

    change = change || {
      model : this,
      path : path,
      name : name,
      object : parent,
      oldValue : oldValue,
      newValue : !unset ? val : undefined,
      type : type
    };

    if ( type === "add" ) {
      delete change.oldValue;
    }

    if ( type === "delete" ) {
      delete change.newValue;
    }

    return change;

  }

};

mota.Model.prototype.set = function ( key , val , unset ) {

  var change = modelSet.call( this , key , val , unset );

  if ( change ) {
    this.trigger( "change" , [ change ] );
  }

  return this;

};

mota.Model.prototype.setAll = function ( attrs , unset ) {

  var changes = [], self = this;

  mota.each( attrs , function(){

    var change = modelSet.call( self , this[ 0 ] , this[ 1 ] , unset );

    if ( change ) {
      changes.push( change );
    }

  } );

  if ( changes.length ) {
    this.trigger( "change" , changes );
  }

  return this;

};

var _splice = function ( path , set , index , howmany , val ) {

  var added, addedCount, removed, removedCount,
  args, argsLen, index2,
  object = modelFromPath( this.attributes , path ).value,
  objectLen;

  if ( !mota.isArray( object ) ) {
    return;
  }

  index2 = index - 0;

  if ( mota.isNaN( index2 ) ) {
    return;
  }

  objectLen = object.length;

  if ( set && index2 < objectLen ) {
    return;
  }

  args = slice.call( arguments , 2 ); // index, howmany, add...
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
    removed = splice.apply( object , args );
  }

  removedCount = removed.length;

  // If changed something
  if ( removedCount || addedCount ) {

    added = slice.call( object , index2 , addedCount );

    return {
      model        : this,
      path         : path,
      added        : added,
      addedCount   : addedCount,
      index        : index2,
      object       : object,
      removed      : removed,
      removedCount : removedCount,
      type         : "splice"
    };

  }

};

mota.Model.prototype.splice = function ( path , index , howmany ) {

  var changes, args;

  path = modelPath( path );
  args = slice.call( arguments );
  splice.call( args , 1 , 0 , false ); // set = false

  changes = [ _splice.apply( this , args ) ];

  if ( changes[ 0 ] ) {

    this.trigger( "change" , changes );

    return changes[ 0 ].removed;

  }

};

mota.Model.prototype.unset = function ( path ) {
  return this.set( path , null , true );
};

mota.Model.prototype.unsetAll = function ( attrs ) {
  return this.setAll( attrs , true );
};

/* jshint ignore:start */
(function ( mota ) {
/* jshint ignore:end */

if ( typeof document === "undefined" ) {
  return;
}

mota.view = {};

var motaViewMap = function ( kind ) {
  this.kind = kind;
  this.list = [];
};

motaViewMap.prototype = {
  constructor: motaViewMap,
  add: function ( component ) {

    var el = component.el;

    if ( this.get( el ) ) {
      return true;
    }

    var i = component.mapIndex = this.list.length;

    this.list[ i ] = component;

    if ( el.setAttribute ) {
      el.setAttribute( "data-mota" , i );
    }

    return true;

  },
  remove: function ( component ) {

    var el = component.el;

    this.list[ component.mapIndex ] = null;

    if ( el.removeAttribute ) {
      el.removeAttribute( "data-mota" );
    }

    // Prevent memory leaks (clean all references)
    mota.each( component , function ( name ) {
      component[ name ] = undefined;
    } );

    return true;

  },
  get: function ( el ) {

    var component, i, list = this.list;

    if ( el.getAttribute ) {

      component = list[ el.getAttribute( "data-mota" ) ];

      if ( component && component.el === el ) {
        return component;
      }

    } else {

      i = list.length;

      while ( i-- ) {

        if ( list[ i ].el === el ) {
          return list[ i ];
        }

      }

    }

  }
};

var mapElements = new motaViewMap( "element" );
var mapWindows = new motaViewMap( "window" );
var mapDocuments = new motaViewMap( "document" );

var motaViewMaps = function(){
  this.kinds = {};
};

motaViewMaps.prototype = {
  constructor: motaViewMaps,
  push: function ( map ) {
    this.kinds[ map.kind ] = map;
  },
  add: function ( component ) {

    var el = component.el;

    if ( mota.isElement( el ) ) {
      return this.kinds.element.add( component );
    }

    if ( mota.isWindow( el ) ) {
      return this.kinds.window.add( component );
    }

    if ( mota.isDocument( el ) ) {
      return this.kinds.document.add( component );
    }

  },
  remove: function ( component ) {

    var el = component.el;

    if ( mota.isElement( el ) ) {
      return this.kinds.element.remove( component );
    }

    if ( mota.isWindow( el ) ) {
      return this.kinds.window.remove( component );
    }

    if ( mota.isDocument( el ) ) {
      return this.kinds.document.remove( component );
    }

  },
  get: function ( el ) {

    if ( mota.isElement( el ) ) {
      return this.kinds.element.get( el );
    }

    if ( mota.isWindow( el ) ) {
      return this.kinds.window.get( el );
    }

    if ( mota.isDocument( el ) ) {
      return this.kinds.document.get( el );
    }

  }
};

var maps = new motaViewMaps();

maps.push( mapElements );
maps.push( mapWindows );
maps.push( mapDocuments );

motaViewComponent = function ( el ) {
  if ( !( this instanceof motaViewComponent ) ) {
    return new motaViewComponent( el );
  }
  this.setEl( el );
};

motaViewComponent.prototype = {
  constructor: motaViewComponent,
  setEl: function ( el ) {
    this.setEl = null; // `setEl` should only be called once
    return ( this.el = el || document.createElement( this.tagName ) );
  },
  update: function(){
    render( this );
  }
};

mota.extend( motaViewComponent.prototype , mota.events );

var selfClosingTags = ("area base br col command embed hr img " +
"input keygen link meta param source track wbr").split(" "),

_createClass = function ( Constructor , tagName , proto ) {

  mota.extend( proto , {
    constructor : Constructor,
    tagName : tagName,
    selfClosingTag : indexOf.call( selfClosingTags , tagName ) !== -1
  } );

  return mota.classExtend.call( motaViewComponent , proto , null , true );

};

mota.view.createClass = function ( tagName , proto ) {

  if ( !mota.isString( tagName ) ) {
    mota.err( "mota.view.createClass" , "Tag name should be a string" );
  }

  var Constructor = function ( props ) {
    this.props = props;
    this.key = props && props.key;
  };

  return _createClass( Constructor , tagName , proto );

};

mota.view.select = function ( el ) {

  if ( !el ) {
    return;
  }

  var component = maps.get( el ) || new motaViewComponent( el );

  if ( maps.add( component ) ) {
    return component;
  }

};

mota.view.appendTo = function ( component , parent ) {

  if ( !( component instanceof motaViewComponent ) ) {
    mota.err( "mota.view.appendTo" , "Provide a valid component" );
  }

  var parentComponent = mota.view.select( parent );

  if ( !parentComponent ) {
    mota.err( "mota.view.appendTo" , "Provide a valid parent" );
  }

  parentComponent.render = function(){
    return [ null , component ];
  };
  
  parentComponent.update();

};

var EMPTYOBJ = {},

revent = /^on/,

diff_attrs = function ( component ) {

  var newAttrs = component.newAttrs,
  prevAttrs = component.prevAttrs,
  el = component.el, key;

  prevAttrs = prevAttrs || EMPTYOBJ;
  newAttrs  = newAttrs  || EMPTYOBJ;

  for ( key in prevAttrs ) {

    if ( key in newAttrs ) {

      if ( !mota.isEqual( prevAttrs[ key ] , newAttrs[ key ] ) ) {

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
          mota.events.off.call( component , eventName , elemA );
        }

        // Add if new is defined
        if ( elemB ) {
          mota.events.on.call( component , eventName , elemB );
        }

      } else if ( key in el ) {

        el[ key ] = elemB;

      } else if ( key != "data-mota" ) {

        if ( elemB ) {
          el.setAttribute( key , elemB + "" );
        } else {
          el.removeAttribute( key );
        }

      }

  }

},

cssPrefixes = [ "Webkit", "Moz", "ms" ],

/**
* CSS properties which accept numbers but are not in units of "px".
*/

unitlessNumber = {
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG
  fillOpacity: true,
  strokeOpacity: true
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

setStyle = function ( el , key , value ) {

  var style = el.style, needsPx;

  /* jshint eqnull: true */
  value = ( value == null || typeof value === "boolean" || value === "" ) ? "" : value;

  key = vendorPropName( key , style );

  needsPx = !( key in unitlessNumber ) && mota.isNumber( value );

  value = needsPx ? value + "px" : trim.call( value + "" );

  if ( style[ key ] != value ) {
    style[ key ] = value;
  }

},

diff_attrs_style = function ( el , prevStyle , newStyle ) {

  var key;

  prevStyle = prevStyle || EMPTYOBJ;
  newStyle  = newStyle  || EMPTYOBJ;

  for ( key in prevStyle ) {

    if ( key in newStyle ) {

      if ( !mota.isEqual( prevStyle[ key ] , newStyle[ key ] ) ) {

        setStyle( el , key , newStyle[ key ] );

      }

    } else {

      setStyle( el , key , null );

    }

  }

  for ( key in newStyle ) {

    if ( !( key in prevStyle ) ) {

      setStyle( el , key , newStyle[ key ] );

    }

  }

};

var equalComponent = function ( A , B ) {

  // If same
  if ( A === B ) {
    return true;
  }

  // If both are strings
  if ( mota.isString( A ) && mota.isString( B ) ) {
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

      if ( !mota.isString( elemA ) ) {

        // Preserve the correct component
        // (because we later overwrite '.prevDom' with '.newDom')
        component.newDom[ y ] = elemA; // !important

        elemA.props = elemB.props; // !important

        // Render
        render( elemA );

      } else if ( elemA != elemB ) {

        componentElChildNodes[ xx ].nodeValue = elemB;

      }

      break;

    case INSERTION :

      if ( !mota.isString( elem ) ) {

        el = elem.setEl(); // only create dom elements here

        // Add to the map
        mapElements.add( elem );

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

      if ( !mota.isString( elem ) ) {

        componentEl.removeChild( elem.el );

        // Remove from map
        mapElements.remove( elem );

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

  // `diff_dom_make` is called for each element of the shortest edit script

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

  // Optimize some cases
  if ( ALen === 1 && BLen === 1 ) {
    if ( equalComponent( A[ 0 ] , B[ 0 ] ) ) {
      diff_dom_make( component , A[ 0 ] , EQUAL , 0 , 0 , 0 );
      return;
    }
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

mota.view.dom = {};

mota.each( ("a abbr address area article aside audio b base bdi bdo big blockquote body br " +
"button canvas caption cite code col colgroup command data datalist dd del details dfn dialog " +
"div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 " +
"head header hr html i iframe img input ins kbd keygen label legend li link " +
"main map mark menu menuitem meta meter nav noscript object ol optgroup option " +
"output p param picture pre progress q rp rt rtc ruby s samp script section select small " +
"source span strong style sub summary sup table tbody td template textarea tfoot th " +
"thead time title tr track u ul var video wbr " +
// SVG
"circle defs ellipse g line linearGradient mask path " +
"pattern polygon polyline radialGradient rect stop svg text tspan").split(" ") , function ( i , tagName ) {

  var Constructor = function(){
    this.props = slice.call( arguments );
    this.key = this.props && this.props[ 0 ] && this.props[ 0 ].key;
  };

  var proto = {
    render : function(){
      return this.props;
    }
  };

  mota.view.dom[ tagName ] = _createClass( Constructor , tagName , proto );

} );

// Info: https://docs.webplatform.org/wiki/concepts/Pointer_Events

var motaViewEvent = function ( src , props ) {

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
    mota.extend( this , props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || mota.now();

};

motaViewEvent.prototype = {
  constructor : motaViewEvent,
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
rpointerEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
eventTypes = {

  "mousedown" : "pointerdown",
  "touchstart" : "pointerdown",
  "MSPointerDown" : "pointerdown",

  "mouseup" : "pointerup",
  "touchend" : "pointerup",
  "MSPointerUp" : "pointerup",

  "mousemove" : "pointermove",
  "touchmove" : "pointermove",
  "MSPointerMove" : "pointermove",

  "mouseover" : "pointerover",
  "touchenter" : "pointerover",
  "MSPointerOver" : "pointerover",

  "mouseout" : "pointerout",
  "touchleave" : "pointerout",
  "MSPointerOut" : "pointerout",

  "mouseenter" : "pointerenter",

  "mouseleave" : "pointerleave",

  "mousecancel" : "pointercancel",
  "touchcancel" : "pointercancel",
  "MSPointerCancel" : "pointercancel",

  "MSGotPointerCapture" : "gotpointercapture",
  "MSLostPointerCapture" : "lostpointercapture",

  "mousewheel" : "wheel",
  "DOMMouseScroll" : "whell"

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
    event = new motaViewEvent( originalEvent );

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
  handlers, handlerObj, events, eventListeners,
  i, j, k, len,
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

    curTargetCOMPONENT = maps.get( curTargetDOM );

    if ( start ) {

      start = false;

      event.targetComponent = curTargetCOMPONENT || mota.view.select( curTargetDOM );

    }

    if ( !curTargetCOMPONENT ) {
      continue;
    }

    if ( !event.bubbles ) {
      event.stopPropagation();
    }

    eventListeners = getListeners( curTargetCOMPONENT , event.type );

    if ( !eventListeners ) continue;

    events = motaData.get( curTargetCOMPONENT , "events" );

    j = 0;
    len = eventListeners.length;

    for ( ; j < len ; j++ ) {

      if ( event.isImmediatePropagationStopped ) break;

      event.currentTarget = curTargetDOM;
      event.currentTargetComponent = curTargetCOMPONENT;

      event.handlerObj = handlerObj = eventListeners[ j ];

      event.result = handlerObj.handler.call(
        /* jshint eqnull: true */
        handlerObj.context != null ? handlerObj.context : curTargetCOMPONENT ,
        event
      );

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

  var init = component.initialize;

  if ( init ) {
    // Destroy `initialize` first
    // Prevents infinite loop when doing something like this:
    // this.model = new mota.Model();
    // this.model.on( "change" , this.update , this );
    // this.model.set( "list" , [] );
    component.initialize = null;
    init.call( component );
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
})( mota );
/* jshint ignore:end */

/* jshint ignore:start */
(function ( mota ) {
/* jshint ignore:end */

if ( typeof document === "undefined" ) {
  return;
}

mota.ui = {};

// Some shortcuts

var

dom = mota.view.dom,

a = dom.a,
b = dom.b,
br = dom.br,
button = dom.button,
div = dom.div,
em = dom.em,
form = dom.form,
h1 = dom.h1,
h2 = dom.h2,
h3 = dom.h3,
h4 = dom.h4,
h5 = dom.h5,
h6 = dom.h6,
i = dom.i,
img = dom.img,
input = dom.input,
li = dom.li,
small = dom.small,
span = dom.span,
strong = dom.strong,
style = dom.style,
table = dom.table,
tbody = dom.tbody,
td = dom.td,
textarea = dom.textarea,
tfoot = dom.tfoot,
th = dom.th,
thead = dom.thead,
tr = dom.tr,
u = dom.u,
ul = dom.ul;

/* jshint ignore:start */
})( mota );
/* jshint ignore:end */

/* jshint ignore:start */
  return mota;
}));
/* jshint ignore:end */
