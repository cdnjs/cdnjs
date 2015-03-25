(function ( root , factory ) {

  // AMD
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#anon
  if ( typeof define === "function" && define.amd ) {

    define(function(){
      return factory( root );
    });

  // Node.js or CommonJS
  } else if ( typeof exports !== "undefined" ) {

    if ( typeof module !== "undefined" && module.exports ) {
      exports = module.exports = factory;
    }
    exports.mota = factory;

  // Finally, as a browser global
  } else {

    root.mota = factory( root );

  }

// Pass this if window is not defined yet
}( typeof window !== "undefined" ? window : this , function ( root ) {

  // `require( "motajs" )( undefined );`
  if ( !root ) {
    root = this;
  }

  // Necessary for view/PEP.js to work

  var

  window = root,
  document = root.document,
  Element = window.Element;

  if ( !window.navigator ) {
    window.navigator = {};
  }

  // DEV Testing
  var ISTESTING = false;
  // http://jsperf.com/test-call-vs-apply/73
  var motaApply = function ( func , context , a ) {
  
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

  var nativeIsArray = Array.isArray;

  var ObjProto = Object.prototype;

  var toString = ObjProto.toString;

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
  var motaType = function ( obj ) {
    if ( obj == null ) {
      return obj + "";
    }
    var type = typeof obj;
    return type === "object" || type === "function" ?
      class2type[ toString.call( obj ) ] || "object" :
      type;
  };

  var motaIsArray = nativeIsArray || function ( obj ) {
    return motaType( obj ) === "array";
  };

  var motaIsObject = function ( obj ) {
    return motaType( obj ) === "object";
  };

  var motaExtend = function ( target ) {
  
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
          if ( deep && copy && ( (copyType = motaType( copy )) === "object" || copyType === "array" ) ) {
  
            if ( copyType === "array" ) {
  
              clone = src && motaIsArray( src ) ? src : [];
  
            } else {
  
              clone = src && motaIsObject( src ) ? src : {};
  
            }
  
            // Never move original objects, clone them
            target[ name ] = motaExtend( deep , clone , copy );
  
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

  var hasOwn = ObjProto.hasOwnProperty;

  var motaHas = function ( obj , key ) {
    return obj != null && hasOwn.call( obj , key );
  };

  var REFERENCE = {};
  
  var classExtend = function ( protoProps , staticProps , optionalNew ) {
  
    var
    parent = this,
    Child,
    constructor,
    Surrogate;
  
    if ( protoProps && motaHas( protoProps , "constructor" ) ) {
      constructor = protoProps.constructor;
    } else {
      constructor = parent;
    }
  
    if ( optionalNew ) {
  
      Child = function ( ref , args ) {
  
        if ( this instanceof Child ) {
  
          if ( ref === REFERENCE ) {
  
            return motaApply( constructor , this , args );
  
          } else {
  
            return motaApply( constructor , this , arguments );
  
          }
  
        } else {
  
          return new Child( REFERENCE , arguments );
  
        }
  
      };
  
    } else {
  
      Child = function(){
        return motaApply( constructor , this , arguments );
      };
  
    }
  
    // Extend prototype with the prototype of the parent
    Surrogate = function(){
      this.constructor = Child;
    };
    Surrogate.prototype = parent.prototype;
    Child.prototype = new Surrogate();
  
    // Extend prototype with given proto props
    if ( protoProps ) {
      motaExtend( Child.prototype , protoProps );
    }
  
    // Extend static props with the static props of the parent and the given static props
    motaExtend( Child , parent , staticProps );
  
    // Set a convenience property in case the parent's prototype is needed later
    Child.__super__ = parent.prototype;
  
    // Return
    return Child;
  
  };

  var ArrayProto = Array.prototype;

  var slice = ArrayProto.slice;

  var motaIsObjectLike = function ( obj ) {
    var type;
    return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
  };

  var clone__default = function ( target ) {
  
    var deep, Cotr, result;
  
    // Handle a deep cloning situation
    if ( target === true && motaHas( arguments , 1 ) ) {
      deep = target;
      // Skip the boolean
      target = arguments[ 1 ];
    }
  
    if ( !motaIsObjectLike( target ) ) {
      return target;
    }
  
    switch ( motaType( target ) ) {
  
      case "array" :
        return deep ? motaExtend( deep , [] , target ) : slice.call( target );
  
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
        return deep ? motaExtend( deep , {} , target ) : motaExtend( {} , target );
  
    }
  
  };

  var nativeKeys = Object.keys;

  var motaKeys = function ( obj , _in ) {
  
    if ( !motaIsObjectLike( obj ) ) {
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
        if ( motaHas( obj , key ) ) {
          keys.push( key );
        }
      }
    }
  
    return keys;
  
  };

  var strWin = "[object Window]",
  strWin2 = "[object global]"; // Chrome & Opera (and Safari?) + Node

  var motaIsWindow = function ( obj ) {

    if ( !obj || typeof obj !== "object" ) {
      return false;
    }

    var className = toString.call( obj );

    return className === strWin || className === strWin2;

  };

  var MAX_ARRAY_INDEX = Math.pow( 2 , 53 ) - 1;
  
  var motaIsArrayLike = function ( obj ) {
  
    var type = motaType( obj ), length;
  
    if ( type === "array" ) {
      return true;
    }
  
    if ( type !== "object" || motaIsWindow( obj ) ) {
      return false;
    }
  
    length = obj.length;
  
    if ( length === 0 ) {
      return true;
    }
  
    return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX && ( length - 1 ) in obj;
  
  };

  function motaEach ( obj , callback , context ) {
  
    var i, length, keys, hasContext = context !== undefined;
  
    if ( motaIsArrayLike( obj ) ) {
  
      length = obj.length;
  
      for ( i = 0 ; i < length ; i++ ) {
        if ( !hasContext ) {
          context = obj[ i ];
        }
        if ( callback.call( context , i , obj[ i ] ) === false ) {
          break;
        }
      }
  
    } else {
  
      keys = motaKeys( obj );
      length = keys.length;
  
      for ( i = 0 ; i < length ; i++ ) {
        if ( !hasContext ) {
          context = obj[ keys[ i ] ];
        }
        if ( callback.call( context , keys[ i ] , obj[ keys[ i ] ] ) === false ) {
          break;
        }
      }
  
    }
  
    return obj;
  
  }
  
  var each = motaEach;

  var err = function ( funcName , msg ) {
    throw funcName + " ERROR: " + msg;
  };

  var log = function ( funcName , msg ) {
    console.log( funcName + " LOG: " + msg );
  };

  // Save the previous value of the `mota` variable
  var _mota = root.mota;

  var noConflict = function(){
    if ( _mota ) root.mota = _mota;
    return this;
  };

  var now = Date.now || function(){
    return +( new Date() );
  };

  var pairs = function ( obj ) {
    var keys = motaKeys( obj ),
    length = keys.length,
    pairs = Array( length ),
    i = 0;
    for ( ; i < length ; i++ ) {
      pairs[ i ] = [ keys[ i ] , obj[ keys[ i ] ] ];
    }
    return pairs;
  };

  var proxy = function ( context , method ) {
  
    var args, proxy, methodType = motaType( method );
  
    if ( methodType === "string" ) {
  
      if ( !context ) {
        return null;
      }
  
      method = context[ method ];
  
    } else if ( methodType !== "function" ) {
  
      return null;
  
    }
  
    if ( context !== undefined ) {
  
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
  var uniqueId = function ( prefix ) {
    prefix = prefix ? prefix + "" : "";
    if ( !ids[ prefix ] ) {
      ids[ prefix ] = 0;
    }
    return prefix + (++ids[ prefix ]);
  };

  var VERSION = "0.5.0";

  var core = {};

  core.apply = motaApply;

  core.classExtend = classExtend;

  core.clone = clone__default;

  core.each = each;

  core.err = err;

  core.extend = motaExtend;

  core.has = motaHas;

  core.keys = motaKeys;

  core.log = log;

  core.noConflict = noConflict;

  core.now = now;

  core.pairs = pairs;

  core.proxy = proxy;

  core.uniqueId = uniqueId;

  core.VERSION = VERSION;

  var motaEvents = {};

  var EMPTYARRAY = [];

  var rnotwhite = /\S+/g;

  var DEV = {};

  function EXPOSE ( name , obj ) {
    DEV[ name ] = obj;
  }

  var EXPANDO = "__mota__" + now();

  function addProp ( obj , value ) {
    var descriptor = {};
    try {
      // Non-enumerable, non-writable property
      descriptor[ EXPANDO ] = { configurable: true, value: value };
      Object.defineProperties( obj , descriptor );
    } catch ( e ) {
      obj[ EXPANDO ] = value;
    }
    return value;
  }

  function MotaData(){}

  MotaData.setup = function ( obj , name , value ) {
    var data = obj[ EXPANDO ] || addProp( obj , new MotaData() );
    return name ? ( data[ name ] ? data[ name ] : ( data[ name ] = value ) ) : data;
  };

  MotaData.get = function ( obj , name ) {
    var data = obj[ EXPANDO ];
    return name ? data && data[ name ] : data;
  };

  MotaData.set = function ( obj , name , value ) {
    var data = obj[ EXPANDO ];
    return data ? ( data[ name ] = value ) : undefined;
  };

  MotaData.del = function ( obj , name ) {
    var data = obj[ EXPANDO ];
    return name && data ? delete data[ name ] : delete obj[ EXPANDO ];
  };

  EXPOSE( "MotaData" , MotaData );

  var indexOf = ArrayProto.indexOf;

  var inCommonWith = function ( parArr1 , parArr2 ) {
  
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
  
  };

  var getListeners = function ( self , type , namespaces , handler , context ) {
  
    var
    results = [],
    events, thisEvent, i = 0, len;
  
    events = MotaData.get( self , "events" );
    len = events ? events.length : 0;
  
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
  
    return results;
  
  };

  var rnamespace = /\.[^.]+/g;

  var rtype = /^[^.]+/g;

  var MotaEventListener = function ( type , namespaces , handler , context ) {
    this.type = type;
    this.namespaces = namespaces; // dots are included e.g. [ ".name1" , ".name2" ]
    this.handler = handler;
    this.context = context;
  };

  var eventsApi = function ( object , action , callback , eventType , handler , context ) {
  
    var i, j, len, len2, type, namespaces, eventListeners;
  
    // Handle multiple events separated by a space
    eventType = ( eventType || "" ).match( rnotwhite ) || [ "" ];
    len = eventType.length;
  
    for ( i = 0 ; i < len ; i++ ) {
  
      type = ( eventType[ i ].match( rtype ) || EMPTYARRAY )[ 0 ];
      namespaces = eventType[ i ].match( rnamespace );
  
      if ( action === "on" ) {
  
        callback.call( object , new MotaEventListener( type , namespaces , handler , context ) );
  
      } else {
  
        eventListeners = getListeners( object , type , namespaces , handler , context );
  
        len2 = eventListeners.length;
  
        for ( j = 0 ; j < len2 ; j++ ) {
  
          callback.call( object , eventListeners[ j ] );
  
        }
  
      }
  
    }
  
  };

  var events_getListeners = function ( eventType , handler , context ) {

    var result = [];

    eventsApi( this , "get" , function ( eventListener ) {

      result.push( eventListener );

    } , eventType , handler , context );

    return result;

  };

  var off = function ( eventType , handler , context ) {

    var events = MotaData.get( this , "events" ), i = 0;

    if ( !events ) {
      return this;
    }

    eventsApi( this , "off" , function ( eventListener ) {

      events.splice( eventListener.index - i , 1 );

      i++;

    } , eventType , handler , context );

    return this;

  };

  var on = function ( eventType , handler , context , once ) {
  
    // Be sure that types were provided
    if ( !eventType ) return this;
  
    // Be sure that an handler is provided
    if ( !handler ) return this;
  
    var self = this,
    // Be sure that we have a place to store the data
    events = MotaData.setup( this , "events" , [] );
  
    eventsApi( this , "on" , function ( eventListener ) {
  
      if ( once ) {
  
        var oldHandler = eventListener.handler,
        type = eventListener.type,
  
        newHandler = function(){
          off.call( self , type , newHandler );
          oldHandler.apply( this , arguments );
        };
  
        eventListener.handler = newHandler;
  
      }
  
      events.push( eventListener );
  
    } , eventType , handler , context );
  
    return this;
  
  };

  var once = function ( eventType , handler , context ) {
    return on.call( this , eventType , handler , context , true );
  };

  var trigger = function ( eventType ) {

    var args = slice.call( arguments , 1 );

    eventsApi( this , "trigger" , function ( eventListener ) {

      motaApply(
        eventListener.handler,
        eventListener.context !== undefined ? eventListener.context : this,
        args
      );

    } , eventType );

    return this;

  };

  motaEvents.getListeners = events_getListeners;
  
  motaEvents.off = off;
  
  motaEvents.on = on;
  
  motaEvents.once = once;
  
  motaEvents.trigger = trigger;
  
  var main = motaEvents;

  var MotaModel = function ( attributes ) {
  
    this.attributes = {};
    this.setAll( attributes );
  
    if ( this.initialize ) {
      this.initialize.apply( this , arguments );
    }
  
  };
  
  MotaModel.extend = classExtend;
  
  MotaModel.prototype = {
    constructor: MotaModel
  };
  
  motaExtend( MotaModel.prototype , main );

  var clear = function(){
    return this.unsetAll( pairs( this.attributes ) );
  };

  var model_clone = function(){
    return new this.constructor( pairs( this.attributes ) );
  };

  var motaIsString = function ( obj ) {
    return motaType( obj ) === "string";
  };

  var modelCachePath = {};

  var modelFromPath = function ( obj , path ) {

    if ( motaIsString( path ) ) {
      path = modelCachePath[ path ] || ( modelCachePath[ path ] = path.split( "." ) );
    }

    if ( !path || !path.length ) {
      return obj;
    }

    var i = 0, j = path.length - 1,
    exists = false, parent, parentPath, value, name;

    while ( motaHas( obj , path[ i ] ) && i < j ) {

      obj = obj[ path[ i ] ];

      i++;

    }

    if ( i === j && obj != null ) {

      parent = obj;

      parentPath = slice.call( path , 0 , -1 );

      name = path[ i ];

      value = obj[ name ];

      exists = motaHas( obj , name );

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

  var get = function ( path ) {
    return modelFromPath( this.attributes , path ).value;
  };

  var has = function ( path ) {
    return modelFromPath( this.attributes , path ).exists;
  };

  var splice = ArrayProto.splice;

  var motaIsNumber = function ( obj ) {
    return motaType( obj ) === "number";
  };

  var motaIsNaN = function ( obj ) {
    return obj !== +obj && motaIsNumber( obj );
  };

  var modelSplice = function ( path , set , index , howmany , val ) {
  
    var added, addedCount, removed, removedCount,
    args, argsLen, index2, objectLen,
    data = modelFromPath( this.attributes , path ),
    object = data.value;
  
    path = data.path;
  
    if ( !motaIsArray( object ) ) {
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
  
      // Doing `added = slice.call( object , index2 , addedCount );` doesn't work sometimes
      added = slice.call( slice.call( object , index2 ) , 0 , addedCount );
  
      return {
        model       : this,
        path        : path,
        added       : added,
        addedCount  : addedCount,
        index       : index2,
        object      : object,
        removed     : removed,
        removedCount: removedCount,
        type        : "splice"
      };
  
    }
  
  };

  var motaIsFunction = function ( obj ) {
    return motaType( obj ) === "function";
  };
  
  // Optimize `mota.isFunction` if appropriate
  // Work around an IE 11 bug
  // Work around a Safari 8 bug: in Safari 8 `typeof Int8Array` returns "object"
  if ( typeof /./ != "function" && typeof Int8Array != "object" ) {
    motaIsFunction = function ( obj ) {
      return typeof obj == "function" || false;
    };
  }

  var motaIsPlainObject = function ( obj ) {
  
    var ctor;
  
    // If it's not an object
    // and if `constructor` was overwritten
    if ( !obj || typeof obj !== "object" || toString.call( obj ) !== "[object Object]" || motaHas( obj , "constructor" ) ) {
      return false;
    }
  
    // If constructor is null or undefined
    // e.g. 'Object.create( null )'
    if ( !(ctor = obj.constructor) ) {
      return true;
    }
  
    // If has constructor (and if it's a function)
    // {}.constructor        instanceof {}.constructor        > true
    // (new Foo).constructor instanceof (new Foo).constructor > false
    return motaIsFunction( ctor ) && ctor instanceof ctor;
  
  };

  var eq = function ( a , b , aStack , bStack ) {
  
    // If same objects
    //// If it's not zero: true
    //// If it's zero:
    ////// If 1 / a == 1 / b
    ////// Consider that `0` and `-0` are different
    if ( a === b ) return a !== 0 || 1 / a == 1 / b;
  
    // Remember that `null == undefined`
    // If one of them is null/undefined, check if they are really equal
    if ( a == null || b == null ) return a === b;
  
    // If they have a different `[[Class]]` name, they are different
    var className = motaType( a );
    if ( className != motaType( b ) ) {
      return false;
    }
  
    // They have the same `[[Class]]` name, so...
    switch ( className ) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case "regexp":
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case "string":
        // "5" == new String("5")
        // new String("5") != new String("5")
        return "" + a === "" + b;
      case "number":
        a = +a;
        b = +b;
        // NaN !== NaN
        // `a` is NaN      // `b` is also NaN
        if ( a !== a ) return b !== b;
        // Consider that `0` and `-0` are different
        return a === 0 ? 1 / a === 1 / b : a === b;
      case "date":
      case "boolean":
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations
        // Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent
        return +a === +b;
    }
  
    var areArrays = className === "array";
  
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
        ( !motaIsPlainObject( a ) || !motaIsPlainObject( b ) )
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
      var keys = motaKeys( a ), key;
      length = keys.length;
  
      // Ensure that both objects contain the same number of properties before comparing deep equality
      if ( motaKeys( b ).length !== length ) {
        return false;
      }
  
      while ( length-- ) {
        // Deep compare each member
        key = keys[ length ];
        if ( !( motaHas( b , key ) && eq( a[ key ] , b[ key ] , aStack , bStack ) ) ) {
          return false;
        }
      }
  
    }
  
    // Remove the first object from the stack of traversed objects
    aStack.pop();
    bStack.pop();
  
    return true;
  
  };
  
  var motaIsEqual = function ( a , b ) {
    return eq( a , b );
  };

  var modelSet = function ( path , val , unset ) {
  
    var parent, parentPath, oldValue, exists, name, change, data, type = null;
    
    if ( path == null ) {
      return this;
    }
  
    data = modelFromPath( this.attributes , path );
  
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
    } else if ( !motaIsEqual( oldValue , val ) ) {
  
      type = "update";
  
    }
  
    // If something will change
    if ( type ) {
  
      switch ( type ) {
  
        case "add" :
  
          change = modelSplice.call( this , parentPath , true , name , 0 , val );
  
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

  var set = function ( key , val , unset ) {
  
    var change = modelSet.call( this , key , val , unset );
  
    if ( change ) {
      this.trigger( "change" , [ change ] );
    }
  
    return this;
  
  };

  var setAll = function ( attrs , unset ) {
  
    var changes = [];
  
    each( attrs , function ( i , attr ) {
  
      var change = modelSet.call( this , attr[ 0 ] , attr[ 1 ] , unset );
  
      if ( change ) {
        changes.push( change );
      }
  
    } , this );
  
    if ( changes.length ) {
      this.trigger( "change" , changes );
    }
  
    return this;
  
  };

  var model_splice = function ( path , index , howmany ) {
  
    var changes, args;
  
    args = slice.call( arguments );
    splice.call( args , 1 , 0 , false ); // set = false
  
    changes = [ modelSplice.apply( this , args ) ];
  
    if ( changes[ 0 ] ) {
  
      this.trigger( "change" , changes );
  
      return changes[ 0 ].removed;
  
    }
  
  };

  var unset = function ( path ) {
    return this.set( path , null , true );
  };

  var unsetAll = function ( attrs ) {
    return this.setAll( attrs , true );
  };

  MotaModel.prototype.clear = clear;
  
  MotaModel.prototype.clone = model_clone;
  
  MotaModel.prototype.get = get;
  
  MotaModel.prototype.has = has;
  
  MotaModel.prototype.set = set;
  
  MotaModel.prototype.setAll = setAll;
  
  MotaModel.prototype.splice = model_splice;
  
  MotaModel.prototype.unset = unset;
  
  MotaModel.prototype.unsetAll = unsetAll;
  
  var Model = MotaModel;

  var motaView = {};

  var document__default = root.document;

  var ISENVNODE = (
    typeof global !== "undefined" &&
    global &&
    toString.call( global.process )
  ) === "[object process]";

  var strDoc = "[object HTMLDocument]",
  strDoc2 = "[object Document]"; // IE 9 & 10

  var motaIsDocument = function ( obj ) {

    if ( !obj || obj.parentNode !== null ) {
      return false;
    }

    // The server side should be safe
    // but with the browser, we need to check the [[Class]] name

    if ( ISENVNODE ) {

      return motaIsWindow( obj.defaultView );

    } else {

      var className = toString.call( obj );

      return className === strDoc || className === strDoc2;

    }

  };

  var motaIsElement = function ( obj ) {
  
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

  function check ( el ) {
    return motaIsElement( el ) || motaIsWindow( el ) || motaIsDocument( el );
  }

  var data__default = {
    add: function ( component ) {
      return check( component.el ) && MotaData.setup( component.el , "component" , component );
    },
    remove: function ( component ) {
      return check( component.el ) && MotaData.del( component.el , "component" );
    },
    get: function ( el ) {
      return check( el ) && MotaData.get( el , "component" );
    }
  };

  var setEl = function ( el ) {
    return (
      this.el = el ||
      ( this.tagName === "#textNode" ?
        document__default.createTextNode( this.props.text ) :
        document__default.createElement( this.tagName || "div" ) )
    );
  };

  var diff_dom = function ( component , dom ) {

    var

    componentEl = component.el,
    // [1] Can't use this because of a bug in jsdom
    // componentElChildNodes = componentEl.childNodes,

    cache = component._cache,
    cacheMap = component._cacheMap,

    deletions = cache, insertions = [], moves = [],

    newCache = [], newCacheMap = {},

    noKeyIdx = 0,

    i, len, _tmp, type, object, nextSibling, el, key, cacheMapKey;

    i = 0;
    len = dom ? dom.length : i;

    for ( ; i < len ; i++ ) {

      _tmp = dom[ i ];

      // Flatten array

      type = motaType( _tmp );

      if ( type === "array" ) {

        dom = dom.concat.apply( [] , dom );
        // Check current index again and flatten until
        // there are no more nested arrays at that index
        i--;
        len = dom.length;

        continue;

      } else if ( type === "string" ) {

        _tmp = dom[ i ] = {
          tagName: "#textNode",
          props: {
            text: _tmp
          }
        };

      }

      key = _tmp.key == null ? "noKey" + noKeyIdx++ : "key" + _tmp.key;
      cacheMapKey = cacheMap && cacheMap[ key ];

      if ( cacheMapKey ) {

        if ( deletions ) delete deletions[ cacheMapKey.index ];

        object = {
          index: i,
          from: cacheMapKey.index,
          component: cacheMapKey.component
        };

        // !important
        object.component.props = _tmp.props;

        moves.push( object );

      } else {

        object = {
          index: i,
          component: _tmp
        };

        insertions.push( object );

      }

      // Prepare for next render
      newCache[ i ] = newCacheMap[ key ] = object;

    }

    component._cache = newCache;
    component._cacheMap = newCacheMap;

    // DELETIONS

    for ( i in deletions ) {

      _tmp = deletions[ i ].component;

      componentEl.removeChild( _tmp.el );

      // Remove data
      data__default.remove( _tmp );

    }

    // INSERTIONS

    i = 0;
    len = insertions.length;

    for ( ; i < len ; i++ ) {

      _tmp = insertions[ i ];

      nextSibling = componentEl.childNodes[ _tmp.index ]; // [1]
      el = setEl.call( _tmp.component ); // only create dom elements here

      // Add data
      data__default.add( _tmp.component );

      // Render
      update.call( _tmp.component );

      // Insert
      componentEl.insertBefore( el , nextSibling || null );

    }

    // MOVES

    i = 0;
    len = moves.length;

    for ( ; i < len ; i++ ) {

      _tmp = moves[ i ];

      nextSibling = componentEl.childNodes[ _tmp.index ]; // [1]
      el = _tmp.component.el;

      // Render
      update.call( _tmp.component );

      // Move
      if ( nextSibling !== el ) {
        componentEl.insertBefore( el , nextSibling || null );
      }

    }

  };

  var EMPTYOBJ = {};

  // BASED ON jQuery
  
  // Support: Android<4.1
  // Make sure we trim BOM and NBSP
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  
  var trim = function(){
    return this == null ?
      "" :
      ( this + "" ).replace( rtrim , "" );
  };

  var revent = /^on/;

  var diff_attrs = function ( component , _newAttrs ) {

    var _prevAttrs = component._prevAttrs,
    el = component.el, key;

    _prevAttrs = _prevAttrs || EMPTYOBJ;
    _newAttrs  = _newAttrs  || EMPTYOBJ;

    for ( key in _prevAttrs ) {

      if ( key in _newAttrs ) {

        if ( !motaIsEqual( _prevAttrs[ key ] , _newAttrs[ key ] ) ) {

          eachAttr( component , el , key , _prevAttrs[ key ] , _newAttrs[ key ] );

        }

      } else {

        eachAttr( component , el , key , _prevAttrs[ key ] );

      }

    }

    for ( key in _newAttrs ) {

      if ( !( key in _prevAttrs ) ) {

        eachAttr( component , el , key , _prevAttrs[ key ] , _newAttrs[ key ] );

      }

    }

    component._prevAttrs = _newAttrs;

  },

  eachAttr = function ( component , el , key , elemA , elemB ) {

    var className, eventName;

    switch ( key ) {

      case "key":
      case "innerHTML":

        break;

      case "daugerousInnerHTML":

        if ( elemB && elemB.__html ) {
          el.innerHTML = elemB.__html;
        }

        break;

      case "style" :

        diff_attrs_style( el , elemA , elemB );

        break;

      case "class" :
      case "className" :

        if ( motaIsArray( elemB ) ) {
          className = trim.call( elemB.join(" ") );
        } else {
          className = trim.call( elemB + "" );
        }

        // To prevent unnecessary rendering
        if ( className !== el.className ) {
          el.className = className;
        }

        break;

      default :

        if ( revent.test( key ) ) {

          eventName = trim.call( key.replace( revent , "" ) );

          // Remove old if existed
          if ( elemA ) {
            main.off.call( component , eventName , elemA );
          }

          // Add if new is defined
          if ( elemB ) {
            main.on.call( component , eventName , elemB );
          }

        } else if ( key in el && !( key === "list" || key === "form" || key === "type" ) ) {

          // This check is also important when setting `value`,
          // to prevent cursor placement to break
          if ( el[ key ] != elemB ) {
            el[ key ] = elemB;
          }

        } else {

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

  // BASED ON jQuery
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
    
    value = ( value == null || typeof value === "boolean" || value === "" ) ? "" : value;

    key = vendorPropName( key , style );

    needsPx = !( key in unitlessNumber ) && motaIsNumber( value );

    value = needsPx ? value + "px" : trim.call( value + "" );

    if ( style[ key ] !== value ) {
      style[ key ] = value;
    }

  },

  diff_attrs_style = function ( el , prevStyle , newStyle ) {

    var key;

    prevStyle = prevStyle || EMPTYOBJ;
    newStyle  = newStyle  || EMPTYOBJ;

    for ( key in prevStyle ) {

      if ( key in newStyle ) {

        if ( !motaIsEqual( prevStyle[ key ] , newStyle[ key ] ) ) {

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

  var selfClosingTags = {
    area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1,
    input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
  };

  var update = function(){

    if ( this.tagName === "#textNode" ) {
      var text = this.props.text;
      if ( text !== this.el.nodeValue ) {
        this.el.nodeValue = text;
      }
      return;
    }

    var init = this.initialize;

    if ( init ) {
      // Destroy `initialize` first
      // Prevents infinite loop when doing something like this:
      // this.model = new mota.Model();
      // this.model.on( "change" , this.update , this );
      // this.model.set( "list" , [] );
      this.initialize = null;
      init.call( this );
    }

    var result = this.render ? this.render() : null;

    // Diff attrs
    diff_attrs( this , result && result[ 0 ] );

    // Diff dom
    if ( !selfClosingTags[ this.tagName ] ) {
      diff_dom( this , result && result[ 1 ] );
    }

  };

  var MotaViewComponent = function ( el ) {
    setEl.call( this , el );
  };

  MotaViewComponent.extend = classExtend;

  MotaViewComponent.prototype = {
    constructor: MotaViewComponent,
    update: update
  };

  motaExtend( MotaViewComponent.prototype , main );

  var motaViewSelect = function ( el ) {

    if ( !el ) {
      return;
    }

    var component = data__default.get( el ) || new MotaViewComponent( el );

    if ( data__default.add( component ) ) {
      return component;
    }

  };

  var appendTo = function ( component , parent ) {

    if ( !( component instanceof MotaViewComponent ) ) {
      err( "mota.view.appendTo" , "Provide a valid component" );
    }

    var parentComponent = motaViewSelect( parent );

    if ( !parentComponent ) {
      err( "mota.view.appendTo" , "Provide a valid parent" );
    }

    component.key = 0;

    parentComponent.render = function(){
      return [ null , [ component ] ];
    };

    parentComponent.update();

  };

  var createClass = function ( Constructor , tagName , proto ) {

    proto = proto || {};

    motaExtend( proto , {
      constructor: Constructor,
      tagName: tagName
    } );

    return MotaViewComponent.extend( proto , null , true );

  };

  var view_createClass = function ( tagName , proto ) {

    if ( !motaIsString( tagName ) ) {
      err( "mota.view.createClass" , "Tag name should be a string" );
    }

    var Constructor = function ( props ) {
      this.props = props;
      var key = props && props.key;
      if ( key != null ) {
        this.key = key;
        delete this.props.key;
      }
    };

    return createClass( Constructor , tagName , proto );

  };

  var motaViewDom = {};

  each( ("a abbr address area article aside audio b base bdi bdo big blockquote body br " +
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
      var key = this.props && this.props[ 0 ] && this.props[ 0 ].key;
      if ( key != null ) {
        this.key = key;
        delete this.props[ 0 ].key;
      }
    };

    var proto = {
      render : function(){
        return this.props;
      }
    };

    motaViewDom[ tagName ] = createClass( Constructor , tagName , proto );

  } );

  var dom__default = motaViewDom;

  var MotaViewEvent = function ( src , props ) {

    // Event object
    if ( src && src.type ) {

      this.originalEvent = src;
      this.type = src.type;

    // Event type
    } else {

      this.type = src;

    }

    // Add props
    for ( var prop in this.originalEvent ) {
      if ( this[ prop ] == null ) {
        this[ prop ] = this.originalEvent[ prop ];
      }
    }

    // Support pointer events
    if ( this.type in eventTypes ) {
      this.type = eventTypes[ this.type ];
    }

    // Put explicitly provided properties onto the event object
    if ( props ) {
      motaExtend( this , props );
    }

    // Create a timestamp if event doesn't have one
    if ( !this.timeStamp ) {
      this.timeStamp = now();
    }

  };

  MotaViewEvent.prototype = {
    constructor: MotaViewEvent,
    isDefaultPrevented: false,
    isPropagationStopped: false,
    isImmediatePropagationStopped: false,
    stopPropagation: function(){
      this.isPropagationStopped = true;
    },
    stopImmediatePropagation: function(){
      this.isPropagationStopped = true;
      this.isImmediatePropagationStopped = true;
    },
    preventDefault: function(){
      this.isDefaultPrevented = true;
      this.originalEvent.preventDefault();
    }
  };

  var
  rkeyEvent = /^key/,
  rpointerEvent = /^(?:mouse|touch|pointer|contextmenu|drag|drop)|click/,
  eventTypes = {
    mousewheel: "wheel",
    DOMMouseScroll: "whell"
  },
  // BASED ON jQuery
  helpers = {
    fixHooks: {},
    noop: function ( event ) {
      return event;
    },
    keyHooks: function ( event , original ) {
      // Add which for key events
      if ( event.which == null ) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }
      return event;
    },
    pointerHooks: function ( event , original ) {

      var
      eventDoc,
      doc, body,
      button = original.button,
      fromElement = original.fromElement;

      // Calculate pageX/Y if missing and clientX/Y available
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

    },
    // Create a writable copy of the event object and normalize some properties
    fix: function ( event ) {

      var
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[ type ];

      if ( !fixHook ) {
        this.fixHooks[ type ] = fixHook =
          rpointerEvent.test( type ) ? this.pointerHooks :
          rkeyEvent.test( type ) ? this.keyHooks :
          this.noop;
      }

      // Create new event
      event = new MotaViewEvent( originalEvent );

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
      return fixHook ? fixHook( event , originalEvent ) : event;
    }
  };

  var

  todoInEachEvent = {
    /*pointerdown: function ( event ) {
      // this: current target element
    }*/
  },

  getNext = function ( current , event ) {
    if ( !current ) {
      return event.target;
    }
    if ( current.parentNode ) {
      return current.parentNode;
    }
    if ( motaIsDocument( current ) ) {
      return current.defaultView;
    }
    return null;
  },

  dispatchEvents = function ( event ) {

    event = helpers.fix( event );

    var
    type = event.type,
    curTargetDOM, curTargetCOMPONENT,
    handlers, handlerObj, eventListeners,
    i, j, k, len;

    // Bubble or Propagate system here
    while ( ( curTargetDOM = getNext( curTargetDOM , event ) ) ) {

      if ( type in todoInEachEvent ) {
        todoInEachEvent[ type ].call( curTargetDOM , event );
      } else if ( event.isPropagationStopped ){
        break;
      }

      if ( !event.isPropagationStopped ) {

        curTargetCOMPONENT = data__default.get( curTargetDOM );

        if ( !curTargetCOMPONENT ) {
          continue;
        }

        if ( !event.bubbles ) {
          event.stopPropagation();
        }

        eventListeners = getListeners( curTargetCOMPONENT , type );

        if ( !eventListeners ) continue;

        j = 0;
        len = eventListeners.length;

        if ( !event.targetComponent ) {
          event.targetComponent = motaViewSelect( event.target );
        }

        for ( ; j < len ; j++ ) {

          if ( event.isImmediatePropagationStopped ) break;

          event.currentTarget = curTargetDOM;
          event.currentTargetComponent = curTargetCOMPONENT;

          event.handlerObj = handlerObj = eventListeners[ j ];

          event.result = handlerObj.handler.call(
            handlerObj.context !== undefined ? handlerObj.context : curTargetCOMPONENT ,
            event
          );

        }

      }

    }

  };

  var events__name,
  additionalEvents = [
    "pointermove",
    "pointerdown",
    "pointerup",
    "pointerover",
    "pointerout",
    "pointerenter",
    "pointerleave",
    "pointercancel"
  ],
  events__i = additionalEvents.length;

  if ( root.addEventListener ) {

    for ( events__name in root ) {
      if (
        events__name !== ( events__name = events__name.replace( revent , "" ) ) &&
        indexOf.call( additionalEvents , events__name ) === -1
      ) {
        root.addEventListener( events__name , dispatchEvents );
      }
    }

    while ( events__i-- ) {
      root.addEventListener( additionalEvents[ events__i ] , dispatchEvents );
    }

  }

  var events__default = {};

  /*!
   * PEP v0.0.0 | https://github.com/jquery/PEP
   * Copyright jQuery Foundation and other contributors | http://jquery.org/license
   */
    /**
     * This module implements an map of pointer states
     */
    var USE_MAP = window.Map && window.Map.prototype.forEach;
    var POINTERS_FN = function(){ return this.size; };
    function PointerMap() {
      if (USE_MAP) {
        var m = new Map();
        m.pointers = POINTERS_FN;
        return m;
      } else {
        this.keys = [];
        this.values = [];
      }
    }

    PointerMap.prototype = {
      set: function(inId, inEvent) {
        var i = this.keys.indexOf(inId);
        if (i > -1) {
          this.values[i] = inEvent;
        } else {
          this.keys.push(inId);
          this.values.push(inEvent);
        }
      },
      has: function(inId) {
        return this.keys.indexOf(inId) > -1;
      },
      'delete': function(inId) {
        var i = this.keys.indexOf(inId);
        if (i > -1) {
          this.keys.splice(i, 1);
          this.values.splice(i, 1);
        }
      },
      get: function(inId) {
        var i = this.keys.indexOf(inId);
        return this.values[i];
      },
      clear: function() {
        this.keys.length = 0;
        this.values.length = 0;
      },
      // return value, key, map
      forEach: function(callback, thisArg) {
        this.values.forEach(function(v, i) {
          callback.call(thisArg, v, this.keys[i], this);
        }, this);
      },
      pointers: function() {
        return this.keys.length;
      }
    };

    var CLONE_PROPS = [
      // MouseEvent
      'bubbles',
      'cancelable',
      'view',
      'detail',
      'screenX',
      'screenY',
      'clientX',
      'clientY',
      'ctrlKey',
      'altKey',
      'shiftKey',
      'metaKey',
      'button',
      'relatedTarget',
      // DOM Level 3
      'buttons',
      // PointerEvent
      'pointerId',
      'width',
      'height',
      'pressure',
      'tiltX',
      'tiltY',
      'pointerType',
      'hwTimestamp',
      'isPrimary',
      // event instance
      'type',
      'target',
      'currentTarget',
      'which',
      'pageX',
      'pageY',
      'timeStamp'
    ];

    var CLONE_DEFAULTS = [
      // MouseEvent
      false,
      false,
      null,
      null,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
      // DOM Level 3
      0,
      // PointerEvent
      0,
      0,
      0,
      0,
      0,
      0,
      '',
      0,
      false,
      // event instance
      '',
      null,
      null,
      0,
      0,
      0,
      0
    ];

    var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');

    /**
     * This module is for normalizing events. Mouse and Touch events will be
     * collected here, and fire PointerEvents that have the same semantics, no
     * matter the source.
     * Events fired:
     *   - pointerdown: a pointing is added
     *   - pointerup: a pointer is removed
     *   - pointermove: a pointer is moved
     *   - pointerover: a pointer crosses into an element
     *   - pointerout: a pointer leaves an element
     *   - pointercancel: a pointer will no longer generate events
     */
    var dispatcher = {
      pointermap: new PointerMap(),
      eventMap: Object.create(null),
      captureInfo: Object.create(null),
      // Scope objects for native events.
      // This exists for ease of testing.
      eventSources: Object.create(null),
      eventSourceList: [],
      /**
       * Add a new event source that will generate pointer events.
       *
       * `inSource` must contain an array of event names named `events`, and
       * functions with the names specified in the `events` array.
       * @param {string} name A name for the event source
       * @param {Object} source A new source of platform events.
       */
      registerSource: function(name, source) {
        var s = source;
        var newEvents = s.events;
        if (newEvents) {
          newEvents.forEach(function(e) {
            if (s[e]) {
              this.eventMap[e] = s[e].bind(s);
            }
          }, this);
          this.eventSources[name] = s;
          this.eventSourceList.push(s);
        }
      },
      register: function(element) {
        var l = this.eventSourceList.length;
        for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {
          // call eventsource register
          es.register.call(es, element);
        }
      },
      unregister: function(element) {
        var l = this.eventSourceList.length;
        for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {
          // call eventsource register
          es.unregister.call(es, element);
        }
      },
      contains: /*scope.external.contains || */function(container, contained) {
        return container.contains(contained);
      },
      // EVENTS
      down: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointerdown', inEvent);
      },
      move: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointermove', inEvent);
      },
      up: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointerup', inEvent);
      },
      enter: function(inEvent) {
        inEvent.bubbles = false;
        this.fireEvent('pointerenter', inEvent);
      },
      leave: function(inEvent) {
        inEvent.bubbles = false;
        this.fireEvent('pointerleave', inEvent);
      },
      over: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointerover', inEvent);
      },
      out: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointerout', inEvent);
      },
      cancel: function(inEvent) {
        inEvent.bubbles = true;
        this.fireEvent('pointercancel', inEvent);
      },
      leaveOut: function(event) {
        this.out(event);
        if (!this.contains(event.target, event.relatedTarget)) {
          this.leave(event);
        }
      },
      enterOver: function(event) {
        this.over(event);
        if (!this.contains(event.target, event.relatedTarget)) {
          this.enter(event);
        }
      },
      // LISTENER LOGIC
      eventHandler: function(inEvent) {
        // This is used to prevent multiple dispatch of pointerevents from
        // platform events. This can happen when two elements in different scopes
        // are set up to create pointer events, which is relevant to Shadow DOM.
        if (inEvent._handledByPE) {
          return;
        }
        var type = inEvent.type;
        var fn = this.eventMap && this.eventMap[type];
        if (fn) {
          fn(inEvent);
        }
        inEvent._handledByPE = true;
      },
      // set up event listeners
      listen: function(target, events) {
        events.forEach(function(e) {
          this.addEvent(target, e);
        }, this);
      },
      // remove event listeners
      unlisten: function(target, events) {
        events.forEach(function(e) {
          this.removeEvent(target, e);
        }, this);
      },
      addEvent: /*scope.external.addEvent || */function(target, eventName) {
        target.addEventListener(eventName, this.boundHandler);
      },
      removeEvent: /*scope.external.removeEvent || */function(target, eventName) {
        target.removeEventListener(eventName, this.boundHandler);
      },
      // EVENT CREATION AND TRACKING
      /**
       * Creates a new Event of type `inType`, based on the information in
       * `inEvent`.
       *
       * @param {string} inType A string representing the type of event to create
       * @param {Event} inEvent A platform event with a target
       * @return {Event} A PointerEvent of type `inType`
       */
      makeEvent: function(inType, inEvent) {
        // relatedTarget must be null if pointer is captured
        if (this.captureInfo[inEvent.pointerId]) {
          inEvent.relatedTarget = null;
        }
        var e = new PointerEvent(inType, inEvent);
        if (inEvent.preventDefault) {
          e.preventDefault = inEvent.preventDefault;
        }
        e._target = e._target || inEvent.target;
        return e;
      },
      // make and dispatch an event in one call
      fireEvent: function(inType, inEvent) {
        var e = this.makeEvent(inType, inEvent);
        return this.dispatchEvent(e);
      },
      /**
       * Returns a snapshot of inEvent, with writable properties.
       *
       * @param {Event} inEvent An event that contains properties to copy.
       * @return {Object} An object containing shallow copies of `inEvent`'s
       *    properties.
       */
      cloneEvent: function(inEvent) {
        var eventCopy = Object.create(null), p;
        for (var i = 0; i < CLONE_PROPS.length; i++) {
          p = CLONE_PROPS[i];
          eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];
          // Work around SVGInstanceElement shadow tree
          // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
          // This is the behavior implemented by Firefox.
          if (HAS_SVG_INSTANCE && (p === 'target' || p === 'relatedTarget')) {
            if (eventCopy[p] instanceof SVGElementInstance) {
              eventCopy[p] = eventCopy[p].correspondingUseElement;
            }
          }
        }
        // keep the semantics of preventDefault
        if (inEvent.preventDefault) {
          eventCopy.preventDefault = function() {
            inEvent.preventDefault();
          };
        }
        return eventCopy;
      },
      getTarget: function(inEvent) {
        // if pointer capture is set, route all events for the specified pointerId
        // to the capture target
        return this.captureInfo[inEvent.pointerId] || inEvent._target;
      },
      setCapture: function(inPointerId, inTarget) {
        if (this.captureInfo[inPointerId]) {
          this.releaseCapture(inPointerId);
        }
        this.captureInfo[inPointerId] = inTarget;
        var e = document.createEvent('Event');
        e.initEvent('gotpointercapture', true, false);
        e.pointerId = inPointerId;
        this.implicitRelease = this.releaseCapture.bind(this, inPointerId);
        document.addEventListener('pointerup', this.implicitRelease);
        document.addEventListener('pointercancel', this.implicitRelease);
        e._target = inTarget;
        this.asyncDispatchEvent(e);
      },
      releaseCapture: function(inPointerId) {
        var t = this.captureInfo[inPointerId];
        if (t) {
          var e = document.createEvent('Event');
          e.initEvent('lostpointercapture', true, false);
          e.pointerId = inPointerId;
          this.captureInfo[inPointerId] = undefined;
          document.removeEventListener('pointerup', this.implicitRelease);
          document.removeEventListener('pointercancel', this.implicitRelease);
          e._target = t;
          this.asyncDispatchEvent(e);
        }
      },
      /**
       * Dispatches the event to its target.
       *
       * @param {Event} inEvent The event to be dispatched.
       * @return {Boolean} True if an event handler returns true, false otherwise.
       */
      dispatchEvent: /*scope.external.dispatchEvent || */function(inEvent) {
        var t = this.getTarget(inEvent);
        if (t) {
          return t.dispatchEvent(inEvent);
        }
      },
      asyncDispatchEvent: function(inEvent) {
        requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
      }
    };
    dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);

    var targeting = {
      shadow: function(inEl) {
        if (inEl) {
          return inEl.shadowRoot || inEl.webkitShadowRoot;
        }
      },
      canTarget: function(shadow) {
        return shadow && Boolean(shadow.elementFromPoint);
      },
      targetingShadow: function(inEl) {
        var s = this.shadow(inEl);
        if (this.canTarget(s)) {
          return s;
        }
      },
      olderShadow: function(shadow) {
        var os = shadow.olderShadowRoot;
        if (!os) {
          var se = shadow.querySelector('shadow');
          if (se) {
            os = se.olderShadowRoot;
          }
        }
        return os;
      },
      allShadows: function(element) {
        var shadows = [], s = this.shadow(element);
        while(s) {
          shadows.push(s);
          s = this.olderShadow(s);
        }
        return shadows;
      },
      searchRoot: function(inRoot, x, y) {
        if (inRoot) {
          var t = inRoot.elementFromPoint(x, y);
          var st, sr, os;
          // is element a shadow host?
          sr = this.targetingShadow(t);
          while (sr) {
            // find the the element inside the shadow root
            st = sr.elementFromPoint(x, y);
            if (!st) {
              // check for older shadows
              sr = this.olderShadow(sr);
            } else {
              // shadowed element may contain a shadow root
              var ssr = this.targetingShadow(st);
              return this.searchRoot(ssr, x, y) || st;
            }
          }
          // light dom element is the target
          return t;
        }
      },
      owner: function(element) {
        var s = element;
        // walk up until you hit the shadow root or document
        while (s.parentNode) {
          s = s.parentNode;
        }
        // the owner element is expected to be a Document or ShadowRoot
        if (s.nodeType != Node.DOCUMENT_NODE && s.nodeType != Node.DOCUMENT_FRAGMENT_NODE) {
          s = document;
        }
        return s;
      },
      findTarget: function(inEvent) {
        var x = inEvent.clientX, y = inEvent.clientY;
        // if the listener is in the shadow root, it is much faster to start there
        var s = this.owner(inEvent.target);
        // if x, y is not in this root, fall back to document search
        if (!s.elementFromPoint(x, y)) {
          s = document;
        }
        return this.searchRoot(s, x, y);
      }
    };

    /**
     * This module uses Mutation Observers to dynamically adjust which nodes will
     * generate Pointer Events.
     *
     * All nodes that wish to generate Pointer Events must have the attribute
     * `touch-action` set to `none`.
     */
    var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
    var map = Array.prototype.map.call.bind(Array.prototype.map);
    var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
    var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
    var MO = window.MutationObserver || window.WebKitMutationObserver;
    var SELECTOR = '[touch-action]';
    var OBSERVER_INIT = {
      subtree: true,
      childList: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['touch-action']
    };

    function Installer(add, remove, changed, binder) {
      this.addCallback = add.bind(binder);
      this.removeCallback = remove.bind(binder);
      this.changedCallback = changed.bind(binder);
      if (MO) {
        this.observer = new MO(this.mutationWatcher.bind(this));
      }
    }

    Installer.prototype = {
      watchSubtree: function(target) {
        // Only watch scopes that can target find, as these are top-level.
        // Otherwise we can see duplicate additions and removals that add noise.
        //
        // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
        // a removal without an insertion when a node is redistributed among
        // shadows. Since it all ends up correct in the document, watching only
        // the document will yield the correct mutations to watch.
        if (targeting.canTarget(target)) {
          this.observer.observe(target, OBSERVER_INIT);
        }
      },
      enableOnSubtree: function(target) {
        this.watchSubtree(target);
        if (target === document && document.readyState !== 'complete') {
          this.installOnLoad();
        } else {
          this.installNewSubtree(target);
        }
      },
      installNewSubtree: function(target) {
        forEach(this.findElements(target), this.addElement, this);
      },
      findElements: function(target) {
        if (target.querySelectorAll) {
          return target.querySelectorAll(SELECTOR);
        }
        return [];
      },
      removeElement: function(el) {
        this.removeCallback(el);
      },
      addElement: function(el) {
        this.addCallback(el);
      },
      elementChanged: function(el, oldValue) {
        this.changedCallback(el, oldValue);
      },
      concatLists: function(accum, list) {
        return accum.concat(toArray(list));
      },
      // register all touch-action = none nodes on document load
      installOnLoad: function() {
        document.addEventListener('readystatechange', function() {
          if (document.readyState === 'complete') {
            this.installNewSubtree(document);
          }
        }.bind(this));
      },
      isElement: function(n) {
        return n.nodeType === Node.ELEMENT_NODE;
      },
      flattenMutationTree: function(inNodes) {
        // find children with touch-action
        var tree = map(inNodes, this.findElements, this);
        // make sure the added nodes are accounted for
        tree.push(filter(inNodes, this.isElement));
        // flatten the list
        return tree.reduce(this.concatLists, []);
      },
      mutationWatcher: function(mutations) {
        mutations.forEach(this.mutationHandler, this);
      },
      mutationHandler: function(m) {
        if (m.type === 'childList') {
          var added = this.flattenMutationTree(m.addedNodes);
          added.forEach(this.addElement, this);
          var removed = this.flattenMutationTree(m.removedNodes);
          removed.forEach(this.removeElement, this);
        } else if (m.type === 'attributes') {
          this.elementChanged(m.target, m.oldValue);
        }
      }
    };

    if (!MO) {
      Installer.prototype.watchSubtree = function(){
        console.warn('PointerEventsPolyfill: MutationObservers not found, touch-action will not be dynamically detected');
      };
    }

    /**
     * This is the constructor for new PointerEvents.
     *
     * New Pointer Events must be given a type, and an optional dictionary of
     * initialization properties.
     *
     * Due to certain platform requirements, events returned from the constructor
     * identify as MouseEvents.
     *
     * @constructor
     * @param {String} inType The type of the event to create.
     * @param {Object} [inDict] An optional dictionary of initial event properties.
     * @return {Event} A new PointerEvent of type `inType` and initialized with properties from `inDict`.
     */
    var MOUSE_PROPS = [
      'bubbles',
      'cancelable',
      'view',
      'detail',
      'screenX',
      'screenY',
      'clientX',
      'clientY',
      'ctrlKey',
      'altKey',
      'shiftKey',
      'metaKey',
      'button',
      'relatedTarget',
      'pageX',
      'pageY'
    ];

    var MOUSE_DEFAULTS = [
      false,
      false,
      null,
      null,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
      0,
      0
    ];

    function PointerEvent__PointerEvent(inType, inDict) {
      inDict = inDict || Object.create(null);

      var e = document.createEvent('Event');
      e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);

      // define inherited MouseEvent properties
      // skip bubbles and cancelable since they're set above in initEvent()
      for(var i = 2, p; i < MOUSE_PROPS.length; i++) {
        p = MOUSE_PROPS[i];
        e[p] = inDict[p] || MOUSE_DEFAULTS[i];
      }
      e.buttons = inDict.buttons || 0;

      // Spec requires that pointers without pressure specified use 0.5 for down
      // state and 0 for up state.
      var pressure = 0;
      if (inDict.pressure) {
        pressure = inDict.pressure;
      } else {
        pressure = e.buttons ? 0.5 : 0;
      }

      // add x/y properties aliased to clientX/Y
      e.x = e.clientX;
      e.y = e.clientY;

      // define the properties of the PointerEvent interface
      e.pointerId = inDict.pointerId || 0;
      e.width = inDict.width || 0;
      e.height = inDict.height || 0;
      e.pressure = pressure;
      e.tiltX = inDict.tiltX || 0;
      e.tiltY = inDict.tiltY || 0;
      e.pointerType = inDict.pointerType || '';
      e.hwTimestamp = inDict.hwTimestamp || 0;
      e.isPrimary = inDict.isPrimary || false;
      return e;
    }

    var PointerEvent__default = PointerEvent__PointerEvent;

    function shadowSelector(v) {
      return 'body /shadow-deep/ ' + selector(v);
    }
    function selector(v) {
      return '[touch-action="' + v + '"]';
    }
    function rule(v) {
      return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + '; touch-action-delay: none; }';
    }
    var attrib2css = [
      'none',
      'auto',
      'pan-x',
      'pan-y',
      {
        rule: 'pan-x pan-y',
        selectors: [
          'pan-x pan-y',
          'pan-y pan-x'
        ]
      }
    ];
    var styles = '';
    // only install stylesheet if the browser has touch action support
    var head = document.head;
    var hasNativePE = window.PointerEvent || window.MSPointerEvent;
    // only add shadow selectors if shadowdom is supported
    var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;

    function applyAttributeStyles() {
      if (hasNativePE) {
        attrib2css.forEach(function(r) {
          if (String(r) === r) {
            styles += selector(r) + rule(r) + '\n';
            if (hasShadowRoot) {
              styles += shadowSelector(r) + rule(r) + '\n';
            }
          } else {
            styles += r.selectors.map(selector) + rule(r.rule) + '\n';
            if (hasShadowRoot) {
              styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\n';
            }
          }
        });

        var el = document.createElement('style');
        el.textContent = styles;
        document.head.appendChild(el);
      }
    }

    var mouseEvents__pointermap = dispatcher.pointermap;
    // radius around touchend that swallows mouse events
    var DEDUP_DIST = 25;

    var WHICH_TO_BUTTONS = [0, 1, 4, 2];

    var HAS_BUTTONS = false;
    try {
      HAS_BUTTONS = new MouseEvent('test', {buttons: 1}).buttons === 1;
    } catch (e) {}

    // handler block for native mouse events
    var mouseEvents = {
      POINTER_ID: 1,
      POINTER_TYPE: 'mouse',
      events: [
        'mousedown',
        'mousemove',
        'mouseup',
        'mouseover',
        'mouseout'
      ],
      register: function(target) {
        dispatcher.listen(target, this.events);
      },
      unregister: function(target) {
        dispatcher.unlisten(target, this.events);
      },
      lastTouches: [],
      // collide with the global mouse listener
      isEventSimulatedFromTouch: function(inEvent) {
        var lts = this.lastTouches;
        var x = inEvent.clientX, y = inEvent.clientY;
        for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {
          // simulated mouse events will be swallowed near a primary touchend
          var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
          if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
            return true;
          }
        }
      },
      prepareEvent: function(inEvent) {
        var e = dispatcher.cloneEvent(inEvent);
        // forward mouse preventDefault
        var pd = e.preventDefault;
        e.preventDefault = function() {
          inEvent.preventDefault();
          pd();
        };
        e.pointerId = this.POINTER_ID;
        e.isPrimary = true;
        e.pointerType = this.POINTER_TYPE;
        if (!HAS_BUTTONS) {
          e.buttons = WHICH_TO_BUTTONS[e.which] || 0;
        }
        return e;
      },
      mousedown: function(inEvent) {
        if (!this.isEventSimulatedFromTouch(inEvent)) {
          var p = mouseEvents__pointermap.has(this.POINTER_ID);
          // TODO(dfreedman) workaround for some elements not sending mouseup
          // http://crbug/149091
          if (p) {
            this.cancel(inEvent);
          }
          var e = this.prepareEvent(inEvent);
          mouseEvents__pointermap.set(this.POINTER_ID, inEvent);
          dispatcher.down(e);
        }
      },
      mousemove: function(inEvent) {
        if (!this.isEventSimulatedFromTouch(inEvent)) {
          var e = this.prepareEvent(inEvent);
          dispatcher.move(e);
        }
      },
      mouseup: function(inEvent) {
        if (!this.isEventSimulatedFromTouch(inEvent)) {
          var p = mouseEvents__pointermap.get(this.POINTER_ID);
          if (p && p.button === inEvent.button) {
            var e = this.prepareEvent(inEvent);
            dispatcher.up(e);
            this.cleanupMouse();
          }
        }
      },
      mouseover: function(inEvent) {
        if (!this.isEventSimulatedFromTouch(inEvent)) {
          var e = this.prepareEvent(inEvent);
          dispatcher.enterOver(e);
        }
      },
      mouseout: function(inEvent) {
        if (!this.isEventSimulatedFromTouch(inEvent)) {
          var e = this.prepareEvent(inEvent);
          dispatcher.leaveOut(e);
        }
      },
      cancel: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.cancel(e);
        this.cleanupMouse();
      },
      cleanupMouse: function() {
        mouseEvents__pointermap['delete'](this.POINTER_ID);
      }
    };

    var captureInfo = dispatcher.captureInfo;
    var findTarget = targeting.findTarget.bind(targeting);
    var allShadows = targeting.allShadows.bind(targeting);
    var touchEvents__pointermap = dispatcher.pointermap;
    var touchMap = Array.prototype.map.call.bind(Array.prototype.map);
    // This should be long enough to ignore compat mouse events made by touch
    var DEDUP_TIMEOUT = 2500;
    var CLICK_COUNT_TIMEOUT = 200;
    var ATTRIB = 'touch-action';
    var INSTALLER;
    // The presence of touch event handlers blocks scrolling, and so we must be careful to
    // avoid adding handlers unnecessarily.  Chrome plans to add a touch-action-delay property
    // (crbug.com/329559) to address this, and once we have that we can opt-in to a simpler
    // handler registration mechanism.  Rather than try to predict how exactly to opt-in to
    // that we'll just leave this disabled until there is a build of Chrome to test.
    var HAS_TOUCH_ACTION_DELAY = false;

    // handler block for native touch events
    var touchEvents = {
      events: [
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel'
      ],
      register: function(target) {
        if (HAS_TOUCH_ACTION_DELAY) {
          dispatcher.listen(target, this.events);
        } else {
          INSTALLER.enableOnSubtree(target);
        }
      },
      unregister: function(target) {
        if (HAS_TOUCH_ACTION_DELAY) {
          dispatcher.unlisten(target, this.events);
        } else {
          // TODO(dfreedman): is it worth it to disconnect the MO?
        }
      },
      elementAdded: function(el) {
        var a = el.getAttribute(ATTRIB);
        var st = this.touchActionToScrollType(a);
        if (st) {
          el._scrollType = st;
          dispatcher.listen(el, this.events);
          // set touch-action on shadows as well
          allShadows(el).forEach(function(s) {
            s._scrollType = st;
            dispatcher.listen(s, this.events);
          }, this);
        }
      },
      elementRemoved: function(el) {
        el._scrollType = undefined;
        dispatcher.unlisten(el, this.events);
        // remove touch-action from shadow
        allShadows(el).forEach(function(s) {
          s._scrollType = undefined;
          dispatcher.unlisten(s, this.events);
        }, this);
      },
      elementChanged: function(el, oldValue) {
        var a = el.getAttribute(ATTRIB);
        var st = this.touchActionToScrollType(a);
        var oldSt = this.touchActionToScrollType(oldValue);
        // simply update scrollType if listeners are already established
        if (st && oldSt) {
          el._scrollType = st;
          allShadows(el).forEach(function(s) {
            s._scrollType = st;
          }, this);
        } else if (oldSt) {
          this.elementRemoved(el);
        } else if (st) {
          this.elementAdded(el);
        }
      },
      scrollTypes: {
        EMITTER: 'none',
        XSCROLLER: 'pan-x',
        YSCROLLER: 'pan-y',
        SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
      },
      touchActionToScrollType: function(touchAction) {
        var t = touchAction;
        var st = this.scrollTypes;
        if (t === 'none') {
          return 'none';
        } else if (t === st.XSCROLLER) {
          return 'X';
        } else if (t === st.YSCROLLER) {
          return 'Y';
        } else if (st.SCROLLER.exec(t)) {
          return 'XY';
        }
      },
      POINTER_TYPE: 'touch',
      firstTouch: null,
      isPrimaryTouch: function(inTouch) {
        return this.firstTouch === inTouch.identifier;
      },
      setPrimaryTouch: function(inTouch) {
        // set primary touch if there no pointers, or the only pointer is the mouse
        if (touchEvents__pointermap.pointers() === 0 || (touchEvents__pointermap.pointers() === 1 && touchEvents__pointermap.has(1))) {
          this.firstTouch = inTouch.identifier;
          this.firstXY = {X: inTouch.clientX, Y: inTouch.clientY};
          this.scrolling = false;
          this.cancelResetClickCount();
        }
      },
      removePrimaryPointer: function(inPointer) {
        if (inPointer.isPrimary) {
          this.firstTouch = null;
          this.firstXY = null;
          this.resetClickCount();
        }
      },
      clickCount: 0,
      resetId: null,
      resetClickCount: function() {
        var fn = function() {
          this.clickCount = 0;
          this.resetId = null;
        }.bind(this);
        this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
      },
      cancelResetClickCount: function() {
        if (this.resetId) {
          clearTimeout(this.resetId);
        }
      },
      typeToButtons: function(type) {
        var ret = 0;
        if (type === 'touchstart' || type === 'touchmove') {
          ret = 1;
        }
        return ret;
      },
      touchToPointer: function(inTouch) {
        var cte = this.currentTouchEvent;
        var e = dispatcher.cloneEvent(inTouch);
        // Spec specifies that pointerId 1 is reserved for Mouse.
        // Touch identifiers can start at 0.
        // Add 2 to the touch identifier for compatibility.
        var id = e.pointerId = inTouch.identifier + 2;
        e.target = captureInfo[id] || findTarget(e);
        e.bubbles = true;
        e.cancelable = true;
        e.detail = this.clickCount;
        e.button = 0;
        e.buttons = this.typeToButtons(cte.type);
        e.width = inTouch.webkitRadiusX || inTouch.radiusX || 0;
        e.height = inTouch.webkitRadiusY || inTouch.radiusY || 0;
        e.pressure = inTouch.webkitForce || inTouch.force || 0.5;
        e.isPrimary = this.isPrimaryTouch(inTouch);
        e.pointerType = this.POINTER_TYPE;
        // forward touch preventDefaults
        var self = this;
        e.preventDefault = function() {
          self.scrolling = false;
          self.firstXY = null;
          cte.preventDefault();
        };
        return e;
      },
      processTouches: function(inEvent, inFunction) {
        var tl = inEvent.changedTouches;
        this.currentTouchEvent = inEvent;
        for (var i = 0, t; i < tl.length; i++) {
          t = tl[i];
          inFunction.call(this, this.touchToPointer(t));
        }
      },
      // For single axis scrollers, determines whether the element should emit
      // pointer events or behave as a scroller
      shouldScroll: function(inEvent) {
        if (this.firstXY) {
          var ret;
          var scrollAxis = inEvent.currentTarget._scrollType;
          if (scrollAxis === 'none') {
            // this element is a touch-action: none, should never scroll
            ret = false;
          } else if (scrollAxis === 'XY') {
            // this element should always scroll
            ret = true;
          } else {
            var t = inEvent.changedTouches[0];
            // check the intended scroll axis, and other axis
            var a = scrollAxis;
            var oa = scrollAxis === 'Y' ? 'X' : 'Y';
            var da = Math.abs(t['client' + a] - this.firstXY[a]);
            var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);
            // if delta in the scroll axis > delta other axis, scroll instead of
            // making events
            ret = da >= doa;
          }
          this.firstXY = null;
          return ret;
        }
      },
      findTouch: function(inTL, inId) {
        for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
          if (t.identifier === inId) {
            return true;
          }
        }
      },
      // In some instances, a touchstart can happen without a touchend. This
      // leaves the pointermap in a broken state.
      // Therefore, on every touchstart, we remove the touches that did not fire a
      // touchend event.
      // To keep state globally consistent, we fire a
      // pointercancel for this "abandoned" touch
      vacuumTouches: function(inEvent) {
        var tl = inEvent.touches;
        // pointermap.pointers() should be < tl.length here, as the touchstart has not
        // been processed yet.
        if (touchEvents__pointermap.pointers() >= tl.length) {
          var d = [];
          touchEvents__pointermap.forEach(function(value, key) {
            // Never remove pointerId == 1, which is mouse.
            // Touch identifiers are 2 smaller than their pointerId, which is the
            // index in pointermap.
            if (key !== 1 && !this.findTouch(tl, key - 2)) {
              var p = value.out;
              d.push(p);
            }
          }, this);
          d.forEach(this.cancelOut, this);
        }
      },
      touchstart: function(inEvent) {
        this.vacuumTouches(inEvent);
        this.setPrimaryTouch(inEvent.changedTouches[0]);
        this.dedupSynthMouse(inEvent);
        if (!this.scrolling) {
          this.clickCount++;
          this.processTouches(inEvent, this.overDown);
        }
      },
      overDown: function(inPointer) {
        var p = touchEvents__pointermap.set(inPointer.pointerId, {
          target: inPointer.target,
          out: inPointer,
          outTarget: inPointer.target
        });
        dispatcher.over(inPointer);
        dispatcher.enter(inPointer);
        dispatcher.down(inPointer);
      },
      touchmove: function(inEvent) {
        if (!this.scrolling) {
          if (this.shouldScroll(inEvent)) {
            this.scrolling = true;
            this.touchcancel(inEvent);
          } else {
            inEvent.preventDefault();
            this.processTouches(inEvent, this.moveOverOut);
          }
        }
      },
      moveOverOut: function(inPointer) {
        var event = inPointer;
        var pointer = touchEvents__pointermap.get(event.pointerId);
        // a finger drifted off the screen, ignore it
        if (!pointer) {
          return;
        }
        var outEvent = pointer.out;
        var outTarget = pointer.outTarget;
        dispatcher.move(event);
        if (outEvent && outTarget !== event.target) {
          outEvent.relatedTarget = event.target;
          event.relatedTarget = outTarget;
          // recover from retargeting by shadow
          outEvent.target = outTarget;
          if (event.target) {
            dispatcher.leaveOut(outEvent);
            dispatcher.enterOver(event);
          } else {
            // clean up case when finger leaves the screen
            event.target = outTarget;
            event.relatedTarget = null;
            this.cancelOut(event);
          }
        }
        pointer.out = event;
        pointer.outTarget = event.target;
      },
      touchend: function(inEvent) {
        this.dedupSynthMouse(inEvent);
        this.processTouches(inEvent, this.upOut);
      },
      upOut: function(inPointer) {
        if (!this.scrolling) {
          dispatcher.up(inPointer);
          dispatcher.out(inPointer);
          dispatcher.leave(inPointer);
        }
        this.cleanUpPointer(inPointer);
      },
      touchcancel: function(inEvent) {
        this.processTouches(inEvent, this.cancelOut);
      },
      cancelOut: function(inPointer) {
        dispatcher.cancel(inPointer);
        dispatcher.out(inPointer);
        dispatcher.leave(inPointer);
        this.cleanUpPointer(inPointer);
      },
      cleanUpPointer: function(inPointer) {
        touchEvents__pointermap['delete'](inPointer.pointerId);
        this.removePrimaryPointer(inPointer);
      },
      // prevent synth mouse events from creating pointer events
      dedupSynthMouse: function(inEvent) {
        var lts = mouseEvents.lastTouches;
        var t = inEvent.changedTouches[0];
        // only the primary finger will synth mouse events
        if (this.isPrimaryTouch(t)) {
          // remember x/y of last touch
          var lt = {x: t.clientX, y: t.clientY};
          lts.push(lt);
          var fn = (function(lts, lt){
            var i = lts.indexOf(lt);
            if (i > -1) {
              lts.splice(i, 1);
            }
          }).bind(null, lts, lt);
          setTimeout(fn, DEDUP_TIMEOUT);
        }
      }
    };

    if (!HAS_TOUCH_ACTION_DELAY) {
      INSTALLER = new Installer(touchEvents.elementAdded, touchEvents.elementRemoved, touchEvents.elementChanged, touchEvents);
    }

    var msEvents__pointermap = dispatcher.pointermap;
    var HAS_BITMAP_TYPE = window.MSPointerEvent && typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
    var msEvents = {
      events: [
        'MSPointerDown',
        'MSPointerMove',
        'MSPointerUp',
        'MSPointerOut',
        'MSPointerOver',
        'MSPointerCancel',
        'MSGotPointerCapture',
        'MSLostPointerCapture'
      ],
      register: function(target) {
        dispatcher.listen(target, this.events);
      },
      unregister: function(target) {
        dispatcher.unlisten(target, this.events);
      },
      POINTER_TYPES: [
        '',
        'unavailable',
        'touch',
        'pen',
        'mouse'
      ],
      prepareEvent: function(inEvent) {
        var e = inEvent;
        if (HAS_BITMAP_TYPE) {
          e = dispatcher.cloneEvent(inEvent);
          e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
        }
        return e;
      },
      cleanup: function(id) {
        msEvents__pointermap['delete'](id);
      },
      MSPointerDown: function(inEvent) {
        msEvents__pointermap.set(inEvent.pointerId, inEvent);
        var e = this.prepareEvent(inEvent);
        dispatcher.down(e);
      },
      MSPointerMove: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.move(e);
      },
      MSPointerUp: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.up(e);
        this.cleanup(inEvent.pointerId);
      },
      MSPointerOut: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.leaveOut(e);
      },
      MSPointerOver: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.enterOver(e);
      },
      MSPointerCancel: function(inEvent) {
        var e = this.prepareEvent(inEvent);
        dispatcher.cancel(e);
        this.cleanup(inEvent.pointerId);
      },
      MSLostPointerCapture: function(inEvent) {
        var e = dispatcher.makeEvent('lostpointercapture', inEvent);
        dispatcher.dispatchEvent(e);
      },
      MSGotPointerCapture: function(inEvent) {
        var e = dispatcher.makeEvent('gotpointercapture', inEvent);
        dispatcher.dispatchEvent(e);
      }
    };

    function platform_events__applyPolyfill() {
      // only activate if this platform does not have pointer events
      if (!window.PointerEvent) {
        window.PointerEvent = PointerEvent__default;

        if (window.navigator.msPointerEnabled) {
          var tp = window.navigator.msMaxTouchPoints;
          Object.defineProperty(window.navigator, 'maxTouchPoints', {
            value: tp,
            enumerable: true
          });
          dispatcher.registerSource('ms', msEvents);
        } else {
          dispatcher.registerSource('mouse', mouseEvents);
          if (window.ontouchstart !== undefined) {
            dispatcher.registerSource('touch', touchEvents);
          }
        }

        dispatcher.register(document);
      }
    }

    var n = window.navigator;
    var s, r;
    function assertDown(id) {
      if (!dispatcher.pointermap.has(id)) {
        throw new Error('InvalidPointerId');
      }
    }
    if (n.msPointerEnabled) {
      s = function(pointerId) {
        assertDown(pointerId);
        this.msSetPointerCapture(pointerId);
      };
      r = function(pointerId) {
        assertDown(pointerId);
        this.msReleasePointerCapture(pointerId);
      };
    } else {
      s = function setPointerCapture(pointerId) {
        assertDown(pointerId);
        dispatcher.setCapture(pointerId, this);
      };
      r = function releasePointerCapture(pointerId) {
        assertDown(pointerId);
        dispatcher.releaseCapture(pointerId, this);
      };
    }

    function capture__applyPolyfill() {
      if (window.Element && !Element.prototype.setPointerCapture) {
        Object.defineProperties(Element.prototype, {
          'setPointerCapture': {
            value: s
          },
          'releasePointerCapture': {
            value: r
          }
        });
      }
    }

    applyAttributeStyles();
    platform_events__applyPolyfill();
    capture__applyPolyfill();

    var pointerevents = {
      dispatcher: dispatcher,
      Installer: Installer,
      PointerEvent: PointerEvent__default,
      PointerMap: PointerMap,
      targetFinding: targeting
    };
  var PEP = pointerevents;

  motaView.appendTo = appendTo;
  
  motaView.Component = MotaViewComponent;
  
  motaView.createClass = view_createClass;
  
  motaView.dom = dom__default;
  
  motaView.select = motaViewSelect;
  
  var view = motaView;

  var

  dom = view.dom,

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
  motaUI__i = dom.i,
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

  var motaUI = {};

  var ui = motaUI;

  var motaIsArguments = function ( obj ) {
    return toString.call( obj ) === "[object Arguments]";
  };
  
  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if ( !motaIsArguments( arguments ) ) {
    motaIsArguments = function ( obj ) {
      return motaHas( obj , "callee" );
    };
  }

  var isBoolean = function ( obj ) {
    return obj === true || obj === false || motaType( obj ) === "boolean";
  };

  var isDate = function ( obj ) {
    return motaType( obj ) === "date";
  };

  var isEmpty = function ( obj ) {
    if ( obj == null ) {
      return true;
    }
    if ( motaIsArray( obj ) || motaIsString( obj ) || motaIsArguments( obj ) ) {
      return obj.length === 0;
    }
    for ( var key in obj ) {
      if ( motaHas( obj , key ) ) {
        return false;
      }
    }
    return true;
  };

  var isError = function ( obj ) {
    return motaType( obj ) === "error";
  };

  var utilities_isFinite = function ( obj ) {
    return isFinite( obj ) && !isNaN( parseFloat( obj ) );
  };

  var isNull = function ( obj ) {
    return obj === null;
  };

  var isRegExp = function ( obj ) {
    return motaType( obj ) === "regexp";
  };

  var isUndefined = function ( obj ) {
    return obj === void 0;
  };

  var utilities = {};

  utilities.isArguments = motaIsArguments;

  utilities.isArray = motaIsArray;

  utilities.isArrayLike = motaIsArrayLike;

  utilities.isBoolean = isBoolean;

  utilities.isDate = isDate;

  utilities.isDocument = motaIsDocument;

  utilities.isElement = motaIsElement;

  utilities.isEmpty = isEmpty;

  utilities.isEqual = motaIsEqual;

  utilities.isError = isError;

  utilities.isFinite = utilities_isFinite;

  utilities.isFunction = motaIsFunction;

  utilities.isNaN = motaIsNaN;

  utilities.isNull = isNull;

  utilities.isNumber = motaIsNumber;

  utilities.isObject = motaIsObject;

  utilities.isObjectLike = motaIsObjectLike;

  utilities.isPlainObject = motaIsPlainObject;

  utilities.isRegExp = isRegExp;

  utilities.isString = motaIsString;

  utilities.isUndefined = isUndefined;

  utilities.isWindow = motaIsWindow;

  utilities.type = motaType;

  var _main__name;

  // mota
  function mota(){}

  // Core

  for ( _main__name in core ) {
    mota[ _main__name ] = core[ _main__name ];
  }

  // Events

  mota.events = main;

  // Model

  mota.Model = Model;

  // UI

  mota.ui = ui;

  // Utilities

  for ( _main__name in utilities ) {
    mota[ _main__name ] = utilities[ _main__name ];
  }

  // View

  mota.view = view;

  // DEV

  if ( ISTESTING ) {
    mota.DEV = DEV;
  }

  return mota;
}));
