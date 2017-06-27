!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.barman=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var
  extend = _dereq_('./extend'),
  mix = _dereq_('./mix'),

  util = _dereq_('./util'),
  defineSpecialProperty = util.defineSpecialProperty,
  has = util.has,
  isFunction = util.isFunction,
  toArray = util.toArray,
  isArray = util.isArray;


function Nil() {}
defineSpecialProperty(Nil, '__super__', Nil.prototype);


function ensureConstructor( parent, proto ) {

  if ( !has( proto, 'constructor' ) ) {
    proto.constructor = function() {
      parent.apply( this, arguments );
    };

  } else if ( !isFunction( proto.constructor ) ) {
    throw new TypeError( 'The constructor property must be a function' );
  }

  return proto;
}

function _newclass( parent, traits, spec, funcMethods ) {
  var
    proto = ensureConstructor(parent, mix( parent.prototype, traits, spec )),

    ctor = extend( proto.constructor, funcMethods );

  defineSpecialProperty( ctor, '__super__', parent.prototype );
  ctor.prototype = proto;
  ctor.extend = Nil.extend;

  return ctor;
}

function newclass() {
  var
    args = toArray( arguments ),
    parent = Nil,
    traits = [];

  if ( isFunction( args[ 0 ] ) ) {
    parent = args.shift();
  }

  if ( isArray( args[ 0 ] ) ) {
    traits = args.shift();
  }

  return _newclass( parent, traits, args[ 0 ], args[ 1 ] );
}


Nil.extend = function() {
  var args = toArray( arguments );
  args.unshift( this );
  return newclass.apply( null, args );
};


module.exports = {
  newclass: newclass,
  Nil: Nil
};
},{"./extend":3,"./mix":6,"./util":7}],2:[function(_dereq_,module,exports){
'use strict';

var
  util = _dereq_('./util'),
  has = util.has,
  isUndefined = util.isUndefined;


function cloneUsingObjectCreate( obj ) {
  if ( isUndefined( obj ) ) {
    return obj;
  }
  return Object.create( obj );
}

function cloneUsingNew( obj ) {
  if ( isUndefined( obj ) ) {
    return obj;
  }

  function Empty() {}

  Empty.prototype = obj;
  return new Empty();
}

var clone = has( Object, 'create' ) ?
  cloneUsingObjectCreate :
  cloneUsingNew;


module.exports = clone;
},{"./util":7}],3:[function(_dereq_,module,exports){
'use strict';

var
  util = _dereq_('./util'),
  each = util.each,
  tail = util.tail;


function extend( obj ) {
  each( tail( arguments ), function( source ) {
    if ( source ) {
      each( source, function( value, prop ) {
        obj[ prop ] = value;
      });
    }
  });

  return obj;
}


module.exports = extend;
},{"./util":7}],4:[function(_dereq_,module,exports){
'use strict';

var
  classes = _dereq_( './classes' ),
  merge = _dereq_( './merge' );


module.exports = {
  Nil: classes.Nil,
  newclass: classes.newclass,

  merge: merge,
  conflict: merge.conflict,
  required: merge.required,

  clone: _dereq_( './clone' ),
  extend: _dereq_( './extend' ),
  mix: _dereq_( './mix' )
};
},{"./classes":1,"./clone":2,"./extend":3,"./merge":5,"./mix":6}],5:[function(_dereq_,module,exports){
'use strict';

var
  util = _dereq_('./util'),
  each = util.each,
  isUndefined = util.isUndefined,
  has = util.has;


function required() {
  throw new Error('An implementation is required');
}

function conflict() {
  throw new Error('This property was defined by multiple merged objects, override it with the proper implementation');
}


function mapProperties( srcObj, iterator, result ) {
  each( srcObj, function( value, prop ) {
    result[ prop ] = iterator.call( this, value, prop );
  }, result);

  return result;
}

function valueHasPrecedence( thisValue, value ) {
  return isUndefined( thisValue ) || thisValue === value || thisValue === required;
}

function mergeProperty( value, prop ) {
  /*jshint validthis:true */
  var thisValue = has( this, prop ) ? this[ prop ] : undefined;

  if ( valueHasPrecedence( thisValue, value ) ) {
    return value;

  } else if ( value === required ) {
    return thisValue;

  } else {
    return conflict;
  }
}


function merge() {
  var result = {};

  each( arguments, function( obj ) {
    mapProperties( obj, mergeProperty, result );
  } );

  return result;
}

merge.required = required;
merge.conflict = conflict;
merge.assertNoConflict = function ( obj ) {
  var conflicts = [];

  each( obj, function( value, name ) {
    if ( value === merge.conflict ) {
      conflicts.push( name );
    }
  });

  if ( conflicts.length > 0 ) {
    throw new Error( 'There is a merge conflict for the following properties: ' +
      conflicts.sort().join( ',' ) );
  }
};


module.exports = merge;
},{"./util":7}],6:[function(_dereq_,module,exports){
'use strict';

var
  merge = _dereq_('./merge'),
  clone = _dereq_('./clone'),
  extend = _dereq_('./extend'),

  util = _dereq_('./util'),
  isArray = util.isArray,
  isObject = util.isObject,
  toArray = util.toArray;


function _mix( parent, traits, spec ) {
  var
    traitComposition = merge.apply( null, traits ),
    result = extend( clone( parent ), traitComposition, spec );

  merge.assertNoConflict( result );

  return result;
}

function mix() {
  var
    args = toArray( arguments ),
    parent = {},
    traits = [];

  if ( args.length > 1 && isObject( args[ 0 ] ) && !isArray( args[ 0 ] ) ) {
    parent = args.shift();
  }

  if ( isArray( args[ 0 ] ) ) {
    traits = args.shift();
  }

  return _mix( parent, traits, args[ 0 ] );
}


module.exports = mix;
},{"./clone":2,"./extend":3,"./merge":5,"./util":7}],7:[function(_dereq_,module,exports){
'use strict';

var
  ArrayProto = Array.prototype,
  nativeForEach = ArrayProto.forEach,
  slice = ArrayProto.slice;


function isUndefined( value ) {
  return typeof value === 'undefined';
}

function isFunction( value ) {
  return typeof value === 'function';
}

function has( object, property ) {
  return object ? Object.prototype.hasOwnProperty.call( object, property ) : false;
}

function isObject( value ) {
  return value === Object( value );
}

function toArray( value ) {
  return slice.call( value );
}

function tail( value ) {
  return slice.call( value, 1 );
}


var JSCRIPT_NON_ENUMERABLE = [ 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'];

function eachKeyStd( obj, func, context ) {
  for ( var key in obj ) {
    func.call( context, obj[ key ], key, obj );
  }
}

function eachKeyFix( obj, func, context ) {
  var i, len;

  eachKeyStd( obj, func, context );

  for ( i = 0, len = JSCRIPT_NON_ENUMERABLE.length; i < len; i++ ) {
    if ( has( obj, JSCRIPT_NON_ENUMERABLE[ i ] ) ) {
      func.call( context, obj[ JSCRIPT_NON_ENUMERABLE[ i ] ], JSCRIPT_NON_ENUMERABLE[ i ], obj );
    }
  }
}

var enumObjectOverrides = (function() {
    var obj = {
      constructor: 1
    };
    for ( var key in obj ) {
      if ( has( obj, key ) ) {
        return true;
      }
    }
    return false;
  })(),
  eachKey = enumObjectOverrides ? eachKeyStd : eachKeyFix;


function each( obj, func, context ) {
  var i, len;

  if ( isUndefined( obj ) || obj === null ) {
    return;
  }

  if ( nativeForEach && obj.forEach === nativeForEach ) {
    obj.forEach( func, context );
  } else if ( obj.length === +obj.length ) {
    for ( i = 0, len = obj.length; i < len; i++ ) {
      func.call( context, obj[ i ], i, obj );
    }
  } else {
    eachKey( obj, func, context );
  }
}


function defineSpecialPropertyStd( obj, name, value ) {
  Object.defineProperty( obj, name, {
    value: value,
    writable: false,
    enumerable: false,
    configurable: false
  } );
  return obj;
}

function defineSpecialPropertyFix( obj, name, value ) {
  obj[ name ] = value;
  return obj;
}

var defineSpecialProperty = isFunction( Object.getOwnPropertyNames ) ?
  defineSpecialPropertyStd : defineSpecialPropertyFix;

var isArray = isFunction( Array.isArray ) ? Array.isArray : function( value ) {
    var toString = Object.prototype.toString;
    return toString.call( value ) === '[object Array]';
  };


module.exports = {
  defineSpecialProperty: defineSpecialProperty,
  each: each,
  has: has,
  isArray: isArray,
  isFunction: isFunction,
  isObject: isObject,
  isUndefined: isUndefined,
  tail: tail,
  toArray: toArray
};
},{}]},{},[4])
(4)
});