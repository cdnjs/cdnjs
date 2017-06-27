/*!
 * MotaJS v0.6.2
 * http://motapc97.github.io/motajs/
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Project
 * https://github.com/motapc97/MotaJS/
 *
 * Date: 2015-04-02T17:14Z
 */
(function ( ROOT , factory ) {

  // AMD
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#anon
  if ( typeof define === "function" && define.amd ) {

    define(function(){
      return factory( ROOT );
    });

  // Node.js or CommonJS
  } else if ( typeof exports !== "undefined" ) {

    if ( typeof module !== "undefined" && module.exports ) {
      exports = module.exports = factory;
    }
    exports.mota = factory;

  // Finally, as a browser global
  } else {

    ROOT.mota = factory( ROOT );

  }

// Pass this if window is not defined yet
}( typeof window !== "undefined" ? window : this , function ( ROOT ) {

  // `require( "motajs" )( undefined );`
  if ( !ROOT ) {
    ROOT = this;
  }

  // DEV Testing
  var ISTESTING = false;
  var err = function ( funcName , msg ) {
    throw funcName + " ERROR: " + msg;
  };

  var log = function ( funcName , msg ) {
    console.log( funcName + " LOG: " + msg );
  };

  // Save the previous value of the `mota` variable
  var _mota = ROOT.mota;

  var noConflict = function(){
    if ( _mota ) ROOT.mota = _mota;
    return this;
  };

  var VERSION = "0.6.2";

  var warn = function ( funcName , msg ) {
    if ( console.warn ) {
      console.warn( funcName + " WARNS: " + msg );
    } else {
      console.log( funcName + " WARNS: " + msg );
    }
  };

  var core = {};

  core.err = err;

  core.log = log;

  core.noConflict = noConflict;

  core.VERSION = VERSION;

  core.warn = warn;

  var motaEvents = {};

  var rnotwhite = /\S+/g;

  var DEV = {};

  function EXPOSE ( name , obj ) {
    DEV[ name ] = obj;
  }

  var
  EXPANDO = "__mota__" + ( "" + Math.random() ).replace( /\D/g , "" ),
  ObjProp = Object.defineProperty;

  function MotaData(){}

  MotaData.setup = function ( obj , name , value , optimize ) {
    var data = obj[ EXPANDO ];
    if ( !data ) {
      data = new MotaData();
      if ( optimize ) {
        obj[ EXPANDO ] = data;
      } else {
        // Non-enumerable property
        ObjProp( obj , EXPANDO , { writable: true, value: data } );
      }
    }
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
    if ( data ) {
      if ( name ) {
        if ( data[ name ] != null ) {
          return !(data[ name ] = undefined);
        }
      } else {
        return !!(obj[ EXPANDO ] = new MotaData());
      }
    }
    return false;
  };

  EXPOSE( "MotaData" , MotaData );

  var ArrayProto = [];

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

      type = ( eventType[ i ].match( rtype ) || [] )[ 0 ];
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
          motaApply( oldHandler , this , arguments );
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

  var slice = ArrayProto.slice;

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

  var motaIsArray = Array.isArray;

  var ObjProto = {};

  var toString = ObjProto.toString;

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

  var motaType = function ( obj ) {
    var type = typeof obj;
    if ( type === "object" || type === "function" ) {
      return obj === null ? "null" : types[ toString.call( obj ) ] || "object";
    }
    return type;
  };

  var motaIsObject = function ( obj ) {
    return motaType( obj ) === "object";
  };

  var motaIsObjectLike = function ( obj ) {
    var type;
    return !!obj && ( ( type = typeof obj ) === "function" || type === "object" );
  };

  var motaExtend = function ( target ) {

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
    if ( !motaIsObjectLike( target ) ) {
      return target;
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

  var motaClassExtend = function ( protoProps , staticProps , optionalNew ) {

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

  var MotaModel = function ( attributes ) {

    this.attributes = {};
    this.setAll( attributes );

    if ( this.initialize ) {
      motaApply( this.initialize , this , arguments );
    }

  };

  MotaModel.extend = motaClassExtend;

  motaExtend( MotaModel.prototype , main );

  var nativeKeys = Object.keys;

  var motaKeys = function ( obj , _in ) {

    if ( !motaIsObjectLike( obj ) ) {
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

  var motaPairs = function ( obj ) {
    var keys = motaKeys( obj ),
    length = keys.length,
    pairs = Array( length ),
    i = 0;
    for ( ; i < length ; i++ ) {
      pairs[ i ] = [ keys[ i ] , obj[ keys[ i ] ] ];
    }
    return pairs;
  };

  var clear = function(){
    return this.unsetAll( motaPairs( this.attributes ) );
  };

  var clone__default = function(){
    return new this.constructor( motaPairs( this.attributes ) );
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
      removed = motaApply( splice , object , args );
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

      if ( !change ) {

        change = {
          model : this,
          path : path,
          name : name,
          object : parent,
          type : type
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

  var set = function ( key , val , unset ) {

    var change = modelSet.call( this , key , val , unset );

    if ( change ) {
      this.trigger( "change" , [ change ] );
    }

    return this;

  };

  var setAll = function ( attrs , unset ) {

    var changes = [], self = this;

    if ( attrs ) attrs.forEach( function ( attr ) {

      var change = modelSet.call( self , attr[ 0 ] , attr[ 1 ] , unset );

      if ( change ) {
        changes.push( change );
      }

    } );

    if ( changes.length ) {
      this.trigger( "change" , changes );
    }

    return this;

  };

  var Model_splice = function ( path , index , howmany ) {

    var changes, args;

    args = slice.call( arguments );
    splice.call( args , 1 , 0 , false ); // set = false

    changes = [ motaApply( modelSplice , this , args ) ];

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

  MotaModel.prototype.clone = clone__default;

  MotaModel.prototype.get = get;

  MotaModel.prototype.has = has;

  MotaModel.prototype.set = set;

  MotaModel.prototype.setAll = setAll;

  MotaModel.prototype.splice = Model_splice;

  MotaModel.prototype.unset = unset;

  MotaModel.prototype.unsetAll = unsetAll;

  var Model = MotaModel;

  var document = ROOT.document;

  var motaView = {};

  var ISENVNODE = (
    typeof global !== "undefined" &&
    global &&
    toString.call( global.process )
  ) === "[object process]";

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

  var concat = ArrayProto.concat;

  var strWin = "[object Window]",
  strWin2 = "[object global]"; // Chrome & Opera (and Safari?) + Node

  var motaIsWindow = function ( obj ) {

    if ( !obj || typeof obj !== "object" ) {
      return false;
    }

    if ( !ISENVNODE && obj.window !== obj ) {
      return false;
    }

    var className = toString.call( obj );

    return className === strWin || className === strWin2;

  };

  var strDoc = "[object HTMLDocument]",
  strDoc2 = "[object Document]"; // IE 9 & 10

  var motaIsDocument = function ( obj ) {

    var defaultView;

    if ( !obj || obj.parentNode !== null || !(defaultView = obj.defaultView) ) {
      return false;
    }

    // The server side should be safe
    // but with the browser, we need to check the [[Class]] name

    if ( ISENVNODE ) {

      return motaIsWindow( defaultView );

    } else {

      var className = toString.call( obj );

      return className === strDoc || className === strDoc2;

    }

  };

  var key = "component",
  check = function ( el ) {
    return motaIsElement( el ) || motaIsDocument( el ) ? 1 : motaIsWindow( el ) ? 2 : 0;
  };

  var data__default = {
    add: function ( component ) {
      var el = component.el, c = check( el );
      return c && MotaData.setup( el , key , component , c === 1 );
    },
    remove: function ( el ) {
      return check( el ) && MotaData.del( el , key );
    },
    get: function ( el ) {
      return check( el ) && MotaData.get( el , key );
    }
  };

  // Support: Android<4.1
  // Make sure we trim BOM and NBSP
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  var trim = function(){
    return this == null ?
      "" :
      ( this + "" ).replace( rtrim , "" );
  };

  var revent = /^on/;

  var cssPrefixes = [ "Webkit", "Moz", "ms" ],

  /**
  * CSS properties which accept numbers but are not in units of "px".
  */
  unitlessNumber = {
    boxFlex: true,
    boxFlexGroup: true,
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
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true
  },

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

    warn( "mota.view.Component.update" , "`" + origName + "` is not a style property." );

  },

  setStyle = function ( style , key , value ) {

    var needsPx;

    value = ( value == null || typeof value === "boolean" || value === "" ) ? "" : value;

    needsPx = !( key in unitlessNumber ) && motaIsNumber( value );

    key = vendorPropName( key , style );

    value = needsPx ? value + "px" : trim.call( value + "" );

    if ( key && style[ key ] !== value ) {
      style[ key ] = value;
    }

    return value;

  };

  var eachAttr = function ( component , el , key , elemA , elemB ) {

    var i, len, name, className, eventName, style, styleRule, styleRules, newStyle;

    if ( elemA === elemB ) {
      return elemB;
    }

    switch ( key ) {

      case "key":
      case "innerHTML":

        return;

      case "daugerousInnerHTML":

        if ( elemB && el.innerHTML !== elemB.__html ) {
          el.innerHTML = elemB.__html;
        }

        return elemB;

      case "style":

        style = el.style;
        elemA = elemA || {};
        elemB = elemB || {};
        newStyle = {};

        if ( motaIsArray( elemB ) ) {
          elemB = motaApply( motaExtend , null , [ {} ].concat( elemB ) );
        }

        // http://jsperf.com/for-in-vs-object-keys-while-loop

        styleRules = motaKeys( elemB );
        i = styleRules.length;

        while ( i-- ) {
          styleRule = styleRules[ i ];
          newStyle[ styleRule ] = setStyle( style , styleRule , elemB[ styleRule ] );
        }

        styleRules = motaKeys( elemA );
        i = styleRules.length;

        while ( i-- ) {
          styleRule = styleRules[ i ];
          if ( newStyle[ styleRule ] == null ) {
            setStyle( style , styleRule , null );
          }
        }

        return newStyle;

      case "class":
      case "className":

        if ( elemB && typeof elemB === "object" ) {

          if ( motaIsArray( elemB ) ) {

            className = "";
            i = 0;
            len = elemB.length;

            for ( ; i < len ; i++ ) {
              if ( elemB[ i ] ) {
                className += " " + elemB[ i ];
              }
            }

          } else {

            className = "";

            for ( name in elemB ) {
              if ( elemB[ name ] && motaHas( elemB , name ) ) {
                className += " " + name;
              }
            }

          }

        } else {

          className = elemB + "";

        }

        className = trim.call( className );

        // To prevent unnecessary rendering
        if ( el.className !== className ) {
          el.className = className;
        }

        return elemB;

      default:

        eventName = key.replace( revent , "" );

        if ( key !== eventName ) {

          // Remove old if existed
          if ( elemA ) {
            main.off.call( component , eventName , elemA );
          }

          // Add if new is defined
          if ( elemB ) {
            main.on.call( component , eventName , elemB );
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
            el.setAttribute( key , elemB + "" );
          } else {
            el.removeAttribute( key );
          }

        }

        return elemB;

    }

  };

  var motaViewCreateClass = function ( proto ) {

    function Constructor ( props ) {

      this.props = props;

      if ( this.initialize ) {
        motaApply( this.initialize , this , arguments );
      }

      this.update( (this._____init = {}) );

    }

    if ( !proto || typeof proto !== "object" || !proto.render ) {
      err(
        "mota.view.createClass",
        "Provide an object with a `render` property containing a function"
      );
    }
    proto.constructor = Constructor;

    Constructor.prototype = new MotaViewComponent();
    motaExtend( Constructor.prototype , proto );

    return Constructor;

  };

  var selfClosingTags = {
    area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1,
    input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
  },

  DefaultClazz = motaViewCreateClass({
    render: function(){
      return this.props;
    }
  }),

  NOKEY = "noKey:",
  KEY = "key:",

  update = function ( INIT ) {

    var
    _INIT    = this._____init,
    thisEl   = this.el,
    result   = ( this.render && this.render() ) || {},
    type     = result.type || result.tag,
    attrs    = result.attrs,
    children = result.children,

    text, objType,
    thisElChildNodes,
    prevChildren, prevChildrenMap,
    newChildren, newChildrenMap,
    insertions, moves, action,
    noKeyIdx, i, len, key, cacheIndex,
    fragment, nextSibling, el,
    component, prevComponent, placeholder,

    newAttrs, prevAttrs, attrName, attrNames;

    if ( !thisEl && INIT && typeof INIT === "object" && _INIT === INIT ) {

      this._____init = undefined;

      if ( typeof type === "string" ) {

        this.type = type;

        if ( type === "#textNode" ) {

          thisEl = this.el = document.createTextNode( result.text );

        } else {

          if ( type === "script" || type === "style" ) {
            err(
              "mota.view.Component.update",
              "For security reasons, <script> and <style> elements are not allowed"
            );
          }

          thisEl = this.el = document.createElement( type );

          // Add data
          data__default.add( this );

        }

      } else {

        err(
          "mota.view.Component.update",
          "`render` must return an object containing a `type` or `tag` property with a primitive string."
        );

      }

    }

    if ( !thisEl ) {
      err(
        "mota.view.Component.update",
        "The `el` property is missing"
      );
    }

    if ( type !== this.type ) {
      err(
        "mota.view.Component.update",
        "You must not change the tag of an component between updates."
      );
    }

    if ( type === "#textNode" ) {
      text = result.text;
      if ( text != thisEl.nodeValue ) {
        thisEl.nodeValue = text;
      }
      return;
    }

    // DIFF ATTRS

    prevAttrs = this.attrs || {};
    newAttrs  = {};

    // http://jsperf.com/for-in-vs-object-keys-while-loop

    attrNames = motaKeys( attrs );
    i = attrNames.length;

    while ( i-- ) {
      attrName = attrNames[ i ];
      newAttrs[ attrName ] = eachAttr( this , thisEl , attrName ,
        prevAttrs[ attrName ] , attrs[ attrName ]
      );
    }

    attrNames = motaKeys( prevAttrs );
    i = attrNames.length;

    while ( i-- ) {
      attrName = attrNames[ i ];
      if ( newAttrs[ attrName ] == null ) {
        eachAttr( this , thisEl , attrName , prevAttrs[ attrName ] );
      }
    }

    this.attrs = newAttrs;

    // DIFF CHILDREN

    if ( selfClosingTags[ type ] ) {
      return;
    }

    prevChildren = this.children;
    prevChildrenMap = this.childrenMap;
    newChildren = [];
    newChildrenMap = {};
    insertions = [];
    moves = [];
    noKeyIdx = i = 0;
    len = children ? children.length : i;
    thisElChildNodes = thisEl.childNodes;

    for ( ; i < len ; i++ ) {

      placeholder = children[ i ];

      if ( placeholder == null || placeholder === "" ) {
        continue;
      }

      objType = motaType( placeholder );

      if ( objType === "array" ) {

        // Flatten array
        children = motaApply( concat , [] , children );
        // Check current index again and flatten until
        // there are no more nested arrays at that index
        i--;
        len = children.length;

        continue;

      } else if ( objType !== "object" ) {

        placeholder = {
          type: "#textNode",
          text: placeholder + ""
        };

      }

      if ( !placeholder.type ) {
        placeholder.type = placeholder.tag;
      }

      key = (placeholder.attrs || placeholder.props || {}).key;
      key = key == null ? NOKEY + noKeyIdx++ : KEY + key;
      cacheIndex = prevChildrenMap && prevChildrenMap[ key ];

      // If existed in previous render
      if ( cacheIndex != null ) {

        prevComponent = prevChildren[ cacheIndex ];

        if ( prevChildren ) {
          // http://jsperf.com/for-delete-vs-for-undefined
          prevChildren[ cacheIndex ] = undefined;
        }

        // !important
        if ( typeof placeholder.type === "string" ) {
          prevComponent.props = {
            type: placeholder.type,
            attrs: placeholder.attrs,
            children: placeholder.children,
            text: placeholder.text
          };
        } else {
          prevComponent.props = placeholder.props;
        }

        component = prevComponent;

        moves.push({
          component: component,
          index: i
        });

      } else {

        if ( typeof placeholder.type === "string" ) {
          component = new DefaultClazz({
            type: placeholder.type,
            attrs: placeholder.attrs,
            children: placeholder.children,
            text: placeholder.text
          });
        } else {
          component = new placeholder.type( placeholder.props );
        }

        insertions.push({
          component: component,
          index: i
        });

      }

      newChildren[ i ] = component;
      newChildrenMap[ key ] = i;

    }

    this.children = newChildren;
    this.childrenMap = newChildrenMap;

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

      // Otherwise, we are free to just remove this one
      if ( !component || component.el ) {

        prevChildren[ i ] = undefined; // !important

        thisEl.removeChild( prevComponent.el );

        // Remove data
        data__default.remove( prevComponent.el );
        prevComponent.el = null; // just to make sure

      }

    }

    // INSERTIONS

    if ( !(prevChildren && prevChildren.length) && newChildren.length > 10 ) {
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
      component = action.component;
      nextSibling = thisElChildNodes[ action.index ];
      el = component.el;

      if ( fragment ) {
        fragment.insertBefore( el , null );
        continue;
      }

      prevComponent = prevChildren && prevChildren[ i ];

      // Replace or Insert
      if ( prevComponent ) {

        prevChildren[ i ] = undefined;

        thisEl.replaceChild( el , prevComponent.el );

        // Remove data
        data__default.remove( prevComponent.el );
        prevComponent.el = null; // just to make sure

      } else {

        thisEl.insertBefore( el , nextSibling || null );

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

      // Update
      update.call( component );

      // Move
      if ( nextSibling !== el ) {
        thisEl.insertBefore( el , nextSibling || null );
      }

    }

    if ( fragment ) {
      thisEl.insertBefore( fragment , null );
    }

  };

  function MotaViewComponent(){}

  motaExtend( MotaViewComponent.prototype , main , {
    update: update
  } );

  var motaViewSelect = function ( el ) {

    if ( !el ) {
      return;
    }

    var component = data__default.get( el ) || new MotaViewComponent();

    if ( !component.el ) {
      component.el = el;
    }

    if ( data__default.add( component ) ) {
      return component;
    }

  };

  var render = function ( placeholder , parent ) {

    var parentComponent = motaViewSelect( parent );

    if ( !parentComponent || !motaIsElement( parentComponent.el ) ) {
      err( "mota.view.render" , "`parent` should be an DOM element" );
    }

    parentComponent.render = function(){
      return {
        children: [ placeholder ]
      };
    };

    parentComponent.update();

    return parentComponent.children[ 0 ];

  };

  var create = function ( type , attrs , children ) {
    if ( ISTESTING && typeof attrs === "object" ) {
      attrs = Object.freeze( attrs );
    }
    if ( typeof type === "string" ) {
      if ( motaIsArray( attrs ) ) {
        children = attrs;
        attrs    = undefined;
      }
      if ( ISTESTING && typeof children === "object" ) {
        children = Object.freeze( children );
      }
      return {
        type: type,
        attrs: attrs,
        children: children
      };
    } else {
      return {
        type: type,
        props: attrs
      };
    }
  };

  var now = Date.now;

  var MotaViewEvent = function ( src ) {

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

    // Fix type
    if ( this.type in eventTypes ) {
      this.type = eventTypes[ this.type ];
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
  eventKinds = {},
  eventTypes = {
    mousewheel: "wheel",
    DOMMouseScroll: "whell"
  },

  helpers = {
    other: function ( event ) {
      return event;
    },
    key: function ( event ) {
      // Add which for key events
      if ( event.which == null ) {
        event.which = event.charCode != null ? event.charCode : event.keyCode;
      }
      return event;
    },
    pointer: function ( event ) {

      var eventDoc, doc, body, button = event.button;

      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && event.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
          ( doc && doc.clientLeft || body && body.clientLeft || 0 );
        event.pageY = event.clientY +
          ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
          ( doc && doc.clientTop  || body && body.clientTop  || 0 );
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
  fixEvent = function ( event ) {

    var
    type = event.type,
    hookType = eventKinds[ type ];

    if ( !hookType ) {
      eventKinds[ type ] = hookType =
        rpointerEvent.test( type ) ? "pointer" :
        rkeyEvent.test( type ) ? "key" :
        "other";
    }

    // Create new event
    event = new MotaViewEvent( event );

    // Support: Safari 6.0+
    // Target should not be a text node
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    // Apply fix hook and return
    return helpers[ hookType ]( event );
  },

  todoInEachEvent = {
    /*pointerdown: function ( event ) {
      // this: current target element
    }*/
  },

  getNext = function ( current , target ) {
    if ( !current ) {
      return target;
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

    event = fixEvent( event );

    var
    target = event.target,
    type = event.type,
    curTargetDOM, curTargetCOMPONENT,
    handlerObj, eventListeners,
    i, j, k, len;

    // Bubble or Propagate system here
    while ( ( curTargetDOM = getNext( curTargetDOM , target ) ) ) {

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

        eventListeners = getListeners( curTargetCOMPONENT , type );

        if ( !eventListeners ) {
          continue;
        }

        j = 0;
        len = eventListeners.length;

        if ( !event.targetComponent ) {
          event.targetComponent = motaViewSelect( target );
        }

        for ( ; j < len ; j++ ) {

          if ( event.isImmediatePropagationStopped ) {
            break;
          }

          event.currentTarget = curTargetDOM;
          event.currentTargetComponent = curTargetCOMPONENT;

          handlerObj = eventListeners[ j ];

          event.result = handlerObj.handler.call(
            handlerObj.context !== undefined ? handlerObj.context : curTargetCOMPONENT,
            event
          );

        }

        if ( !event.bubbles ) {
          event.stopPropagation();
        }

      }

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

  if ( ROOT.addEventListener ) {

    var eventName, names, events__name, i;

    for ( events__name in ROOT ) {
      eventName = events__name.replace( revent , "" );
      if ( events__name !== eventName ) {
        if ( !( eventName in additionalEvents ) ) {
          ROOT.addEventListener( eventName , dispatchEvents );
        }
      }
    }

    names = motaKeys( additionalEvents );
    i = names.length;

    while ( i-- ) {
      ROOT.addEventListener( names[ i ] , dispatchEvents );
    }

  }

  EXPOSE( "dispatchEvents" , dispatchEvents );

  var events__default = {};

  motaView.render = render;

  motaView.Component = MotaViewComponent;

  motaView.create = create;

  motaView.createClass = motaViewCreateClass;

  motaView.select = motaViewSelect;

  var view = motaView;

  var

  cache     = {},

  rescape   = /[\-{}\[\]+?.,\\\^$|#\s]/g,
  roptional = /\((.*?)\)/g, // (optional)
  rnamed    = /(\(\?)?:\w+/g, // :named
  rsplat    = /\*\w+/g, // *splat
  rparams   = /(?:(\(\?)?:\w+)|(?:\*\w+)/g, // :named, *splat

  rleadslash = /^\/+/,
  MotaRouterRoute__rstripper  = /^\/+|\/+$/g,

  join = function ( a , b ) {
    a = a.replace( rleadslash , "" ) || "";
    b = b.replace( rleadslash , "" ) || "";
    return a === "" || a.match( /\/[^\w]*$/ ) ? a + b : a + "/" + b;
  },

  replace = function ( str ) {
    return str.replace( rescape , "\\$&" )
              .replace( roptional , "(?:$1)?" )
              .replace( rnamed , function ( match , optional ) {
                return optional ? match : "([^/?]+)";
              })
              .replace( rsplat , "([^?]*)" );
  },

  getParams = function ( str ) {

    var regexp, names, params = cache[ str ];

    if ( params ) {
      return params;
    }

    regexp = new RegExp( "^" + replace( str ) );
    names = (str.match( rparams ) || []).map(function ( name ) {
      return name.slice( 1 );
    });
    params = {
      regexp: regexp,
      names: names
    };

    return ( cache[ str ] = params );

  };

  EXPOSE( "RouterPathJoin" , join );
  EXPOSE( "RouterPathGetParams" , getParams );

  function MotaRouterRoute ( name , path , callback , parent ) {

    if ( !name ) {
      err( "mota.Router.route" , "Provide a name for this route" );
    }

    if ( !path || path.match( rleadslash ) ) {
      err( "mota.Router.route", "Provide a non-empty path without leading slashes" );
    }

    this.name = name;

    this.parent = parent;

    this.path = join( parent.path || "" , path || "" );
    this.params = getParams( this.path );

    this.routes    = [];
    this.routesMap = {};

    if ( motaIsFunction( callback ) ) {
      callback.call( this );
    }

  }

  MotaRouterRoute.prototype = {

    constructor: MotaRouterRoute,

    normalize: function ( fragment ) {
      // Remove excessive slashes and leading slash
      return fragment ? fragment.replace( MotaRouterRoute__rstripper , "/" ).replace( rleadslash , "" ) : "";
    },

    route: function ( name , path , callback ) {

      var route = new MotaRouterRoute( name , path , callback , this );

      if ( this.routesMap[ route.name ] ) {
        err( "mota.Router.route" , "There is already a route with the name `" + name + "`" );
      }

      this.routes.push( route );
      this.routesMap[ route.name ] = route;

      return this;
    },

    setCallback: function ( f ) {
      this.callback = f;
      return this;
    },

    setDefaultCallback: function ( f ) {
      this.defaultCallback = f;
      return this;
    },

    triggerRoutes: function ( fragment , params ) {

      var i = 0, len = this.routes.length,
      route, match,

      iteratee = function ( param , i ) {
        var name = route.params.names[ i ];
        params[ name ] = param ? decodeURIComponent( param ) : null;
      };

      fragment = this.normalize( fragment );

      if ( this.callback ) {
        this.callback( params , fragment );
      }

      for ( ; i < len ; i++ ) {

        route = this.routes[ i ];

        match = fragment.match( route.params.regexp );

        if ( match ) {

          params = {};
          match.slice( 1 ).forEach( iteratee );

          route.triggerRoutes( fragment , params );

          return;

        }

      }

      if ( this.defaultCallback ) {
        this.defaultCallback( fragment );
      }

    }

  };

  var rhash = /#(.*)$/, Router__rstripper = /^\/+|\/+$/g;

  function MotaRouter(){

    this.routes    = [];
    this.routesMap = {};

    if ( typeof ROOT !== "undefined" ) {
      this.location = ROOT.location;
      this.history = ROOT.history;
      this.window = view.select( ROOT );
      this._hasPushState = !!(this.history && this.history.pushState);
    }

    if ( this.initialize ) {
      motaApply( this.initialize , this , arguments );
    }

  }

  MotaRouter.extend = motaClassExtend;

  motaExtend( MotaRouter.prototype , MotaRouterRoute.prototype , {

    constructor: MotaRouter,

    atRoot: function(){
      if ( this.location.search ) {
        return false;
      }
      // Make sure `pathname` as a trailing slash
      return this.root === this.location.pathname.replace( /[^\/]$/ , "$&/" );
    },

    checkUrl: function ( e ) {
      // After a "hashchange" event, this callback becames ansync
      // And `location.href` might change,
      // So, using `event.newURL` becames more reliable
      if ( e && e.type === "hashchange" ) {
        return this.triggerRoutes( this.getHash( e.newURL ) );
      }
      return this.triggerRoutes( this.getFragment() );
    },

    getHash: function ( href ) {
      // Cannot use location.hash directly due to bug
      // in Firefox where location.hash will always be decoded
      var match = ( href || this.location.href ).match( rhash );
      return this.normalize( match ? match[ 1 ] : "" );
    },

    getPath: function(){
      var path, root;
      path = this.location.pathname + this.location.search;
      root = this.root.slice( 0 , -1 );
      if ( !path.indexOf( root ) ) {
        path = path.slice( root.length );
      }
      return this.normalize( path );
    },

    getFragment: function(){
      return this.normalize( this._hasPushState ? this.getPath() : this.getHash() );
    },

    start: function ( options ) {

      if ( this._started ) {
        return;
      }
      this._started = true;

      // Normalize root to always include a leading and a trailing slash
      this.root = ( "/" + ( options && options.root || "" ) + "/" ).replace( Router__rstripper , "/" );

      var fragment = this.getFragment();

      // Handle transition from hashChange to pushState or vice versa
      if ( !this._hasPushState && !this.atRoot() ) {

        this.location.replace( this.root + "#" + this.getPath() );
        // Return immediately as browser will do redirect to new url
        // No need to trigger routes
        return;

      } else if ( this._hasPushState && this.atRoot() ) {

        // `navigate` will trigger routes
        this.navigate( this.getHash() , {replace: true} );

      } else {

        // We should trigger the routes...
        this.triggerRoutes( fragment );
        // ...and set `fragment` since we don't call `navigate`
        this.fragment = fragment;

      }

      this.window.on( this._hasPushState ? "popstate" : "hashchange" , this.checkUrl , this );

    },

    stop: function(){

      if ( !this._started ) {
        return;
      }
      this._started = false;

      this.window.off( this._hasPushState ? "popstate" : "hashchange" , this.checkUrl , this );

    },

    navigate: function ( fragment , options ) {

      var url, href;

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

        url = this.root + fragment;

        this.history[ options.replace ? "replaceState" : "pushState" ]( {} , document.title , url );

        this.triggerRoutes( fragment );

      } else {

        if ( options.replace ) {
          href = this.location.href.replace( /(javascript:|#).*$/ , "" );
          this.location.replace( href + "#" + fragment );
        } else {
          // Some browsers require that `hash` contains a leading #
          this.location.hash = "#" + fragment;
        }

        // `triggerRoutes` will be called after the `hashchange` event

      }

    }

  } );

  var Router = MotaRouter;

  var utilities_clone = function ( target ) {

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

  var motaIsArguments = function ( obj ) {
    return toString.call( obj ) === "[object Arguments]";
  };

  var MAX_ARRAY_INDEX = Math.pow( 2 , 53 ) - 1;

  var isArrayLike = function ( obj ) {

    var type = motaType( obj ), length;

    if ( type === "array" ) {
      return true;
    }

    if ( type !== "object" || motaIsWindow( obj ) ) {
      return false;
    }

    // http://stackoverflow.com/questions/28155841/misterious-failure-of-jquery-each-and-underscore-each-on-ios
    if ( !( "length" in obj ) ) {
      return false;
    }

    length = obj.length;

    if ( length === 0 ) {
      return true;
    }

    return typeof length === "number" &&
      length > 0 && length <= MAX_ARRAY_INDEX && ( length - 1 ) in obj;

  };

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

  var ids = {};
  var uniqueId = function ( prefix ) {
    prefix = prefix ? prefix + "" : "";
    if ( !ids[ prefix ] ) {
      ids[ prefix ] = 0;
    }
    return prefix + (++ids[ prefix ]);
  };

  var utilities = {};

  utilities.apply = motaApply;

  utilities.classExtend = motaClassExtend;

  utilities.clone = utilities_clone;

  utilities.extend = motaExtend;

  utilities.has = motaHas;

  utilities.isArguments = motaIsArguments;

  utilities.isArray = motaIsArray;

  utilities.isArrayLike = isArrayLike;

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

  utilities.keys = motaKeys;

  utilities.pairs = motaPairs;

  utilities.type = motaType;

  utilities.uniqueId = uniqueId;

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

  // Router

  mota.Router = Router;

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
