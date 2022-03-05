/*!
 * Flickity PACKAGED v3.0.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2022 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v3.0.1
 * MIT license
 */

( function( window, factory ) {
  // module definition
 if ( typeof module == 'object' && module.exports ) {
   // CommonJS
   module.exports = factory(
       window,
       require('jquery'),
   );
 } else {
   // browser global
   window.jQueryBridget = factory(
       window,
       window.jQuery,
   );
 }

}( window, function factory( window, jQuery ) {

// ----- utils ----- //

// helper function for logging errors
// $.error breaks jQuery chaining
let console = window.console;
let logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      if ( !opts ) return;

      this.options = Object.assign( this.options || {}, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0, ...args ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    let returnValue;
    let pluginMethodStr = `$().${namespace}("${methodName}")`;

    $elems.each( function( i, elem ) {
      // get instance
      let instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( `${namespace} not initialized.` +
          ` Cannot call method ${pluginMethodStr}` );
        return;
      }

      let method = instance[ methodName ];
      if ( !method || methodName.charAt( 0 ) == '_' ) {
        logError(`${pluginMethodStr} is not a valid method`);
        return;
      }

      // apply method, get return value
      let value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    } );

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      let instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    } );
  }

}

// -----  ----- //

return jQueryBridget;

} ) );
/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );
/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */

( function( window, factory ) {
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

} )( window, function factory() {

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  let num = parseFloat( value );
  // not a percent like '100%', and a number
  let isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

let measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
];

let measurementsLength = measurements.length;

function getZeroSize() {
  let size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  };
  measurements.forEach( ( measurement ) => {
    size[ measurement ] = 0;
  } );
  return size;
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) elem = document.querySelector( elem );

  // do not proceed on non-objects
  let isElement = elem && typeof elem == 'object' && elem.nodeType;
  if ( !isElement ) return;

  let style = getComputedStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) return getZeroSize();

  let size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  let isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  measurements.forEach( ( measurement ) => {
    let value = style[ measurement ];
    let num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  } );

  let paddingWidth = size.paddingLeft + size.paddingRight;
  let paddingHeight = size.paddingTop + size.paddingBottom;
  let marginWidth = size.marginLeft + size.marginRight;
  let marginHeight = size.marginTop + size.marginBottom;
  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

  // overwrite width and height if we can get it from style
  let styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingWidth + borderWidth );
  }

  let styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

} );
/**
 * Fizzy UI utils v3.0.0
 * MIT license
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( global );
  } else {
    // browser global
    global.fizzyUIUtils = factory( global );
  }

}( this, function factory( global ) {

let utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  return Object.assign( a, b );
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) return [];

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  let index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( elem.matches( selector ) ) return elem;
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );

  return elems
    // check that elem is an actual element
    .filter( ( elem ) => elem instanceof HTMLElement )
    .reduce( ( ffElems, elem ) => {
      // add elem if no selector
      if ( !selector ) {
        ffElems.push( elem );
        return ffElems;
      }
      // filter & find items if we have a selector
      // filter
      if ( elem.matches( selector ) ) {
        ffElems.push( elem );
      }
      // find children
      let childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      ffElems = ffElems.concat( ...childElems );
      return ffElems;
    }, [] );
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  let method = _class.prototype[ methodName ];
  let timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    clearTimeout( this[ timeoutName ] );

    let args = arguments;
    this[ timeoutName ] = setTimeout( () => {
      method.apply( this, args );
      delete this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( onDocReady ) {
  let readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( onDocReady );
  } else {
    document.addEventListener( 'DOMContentLoaded', onDocReady );
  }
};

// ----- htmlInit ----- //

// http://bit.ly/3oYLusc
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  } ).toLowerCase();
};

let console = global.console;

// allow user to initialize classes via [data-namespace] or .js-namespace class
// htmlInit( Widget, 'widgetName' )
// options are parsed from data-namespace-options
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    let dashedNamespace = utils.toDashed( namespace );
    let dataAttr = 'data-' + dashedNamespace;
    let dataAttrElems = document.querySelectorAll( `[${dataAttr}]` );
    let jQuery = global.jQuery;

    [ ...dataAttrElems ].forEach( ( elem ) => {
      let attr = elem.getAttribute( dataAttr );
      let options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( `Error parsing ${dataAttr} on ${elem.className}: ${error}` );
        }
        return;
      }
      // initialize
      let instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    } );

  } );
};

// -----  ----- //

return utils;

} ) );
/*!
 * Unidragger v3.0.0
 * Draggable base class
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('ev-emitter'),
    );
  } else {
    // browser global
    window.Unidragger = factory(
        window,
        window.EvEmitter,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( window, EvEmitter ) {

function Unidragger() {}

// inherit EvEmitter
let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

// ----- bind start ----- //

// trigger handler methods for events
proto.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

let startEvent, activeEvents;
if ( 'ontouchstart' in window ) {
  // HACK prefer Touch Events as you can preventDefault on touchstart to
  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
  startEvent = 'touchstart';
  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
} else if ( window.PointerEvent ) {
  // Pointer Events
  startEvent = 'pointerdown';
  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
} else {
  // mouse events
  startEvent = 'mousedown';
  activeEvents = [ 'mousemove', 'mouseup' ];
}

// prototype so it can be overwriteable by Flickity
proto.touchActionValue = 'none';

proto.bindHandles = function() {
  this._bindHandles( 'addEventListener', this.touchActionValue );
};

proto.unbindHandles = function() {
  this._bindHandles( 'removeEventListener', '' );
};

/**
 * Add or remove start event
 * @param {String} bindMethod - addEventListener or removeEventListener
 * @param {String} touchAction - value for touch-action CSS property
 */
proto._bindHandles = function( bindMethod, touchAction ) {
  this.handles.forEach( ( handle ) => {
    handle[ bindMethod ]( startEvent, this );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
  } );
};

proto.bindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.addEventListener( eventName, this );
  } );
};

proto.unbindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.removeEventListener( eventName, this );
  } );
};

// ----- event handler helpers ----- //

// trigger method with matching pointer
proto.withPointer = function( methodName, event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this[ methodName ]( event, event );
  }
};

// trigger method with matching touch
proto.withTouch = function( methodName, event ) {
  let touch;
  for ( let changedTouch of event.changedTouches ) {
    if ( changedTouch.identifier == this.pointerIdentifier ) {
      touch = changedTouch;
    }
  }
  if ( touch ) this[ methodName ]( event, touch );
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  this.pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this.pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this.pointerDown( event, event );
};

// nodes that have text fields
const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
// input types that do not have text fields
const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

/**
 * any time you set `event, pointer` it refers to:
 * @param {Event} event
 * @param {Event | Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss multi-touch taps, right clicks, and clicks on text fields
  let isCursorNode = cursorNodes.includes( event.target.nodeName );
  let isClickType = clickTypes.includes( event.target.type );
  let isOkayElement = !isCursorNode || isClickType;
  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
  if ( !isOkay ) return;

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;
  // track position for move
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  this.bindActivePointerEvents();
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// ----- move ----- //

proto.onmousemove = function( event ) {
  this.pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  this.withPointer( 'pointerMove', event );
};

proto.ontouchmove = function( event ) {
  this.withTouch( 'pointerMove', event );
};

proto.pointerMove = function( event, pointer ) {
  let moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY,
  };
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  // start drag if pointer has moved far enough to start drag
  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
  if ( isDragStarting ) this.dragStart( event, pointer );
  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- drag ----- //

proto.dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.isPreventingClicks = true; // set flag to prevent clicks
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

proto.dragMove = function( event, pointer, moveVector ) {
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// ----- end ----- //

proto.onmouseup = function( event ) {
  this.pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  this.withPointer( 'pointerUp', event );
};

proto.ontouchend = function( event ) {
  this.withTouch( 'pointerUp', event );
};

proto.pointerUp = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerUp', [ event, pointer ] );

  if ( this.isDragging ) {
    this.dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this.staticClick( event, pointer );
  }
};

proto.dragEnd = function( event, pointer ) {
  this.isDragging = false; // reset flag
  // re-enable clicking async
  setTimeout( () => delete this.isPreventingClicks );

  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// triggered on pointer up & pointer cancel
proto.pointerDone = function() {
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  this.unbindActivePointerEvents();
  this.emitEvent('pointerDone');
};

// ----- cancel ----- //

proto.onpointercancel = function( event ) {
  this.withPointer( 'pointerCancel', event );
};

proto.ontouchcancel = function( event ) {
  this.withTouch( 'pointerCancel', event );
};

proto.pointerCancel = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// ----- click ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) event.preventDefault();
};

// triggered after pointer down & up with no/tiny movement
proto.staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  let isMouseup = event.type == 'mouseup';
  if ( isMouseup && this.isIgnoringMouseUp ) return;

  this.emitEvent( 'staticClick', [ event, pointer ] );

  // set flag for emulated clicks 300ms after touchend
  if ( isMouseup ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 400ms
    setTimeout( () => {
      delete this.isIgnoringMouseUp;
    }, 400 );
  }
};

// -----  ----- //

return Unidragger;

} ) );
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( window, require('ev-emitter') );
  } else {
    // browser global
    window.imagesLoaded = factory( window, window.EvEmitter );
  }

} )( typeof window !== 'undefined' ? window : this,
    function factory( window, EvEmitter ) {

let $ = window.jQuery;
let console = window.console;

// -------------------------- helpers -------------------------- //

// turn element or nodeList into an array
function makeArray( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {[Array, Element, NodeList, String]} elem
 * @param {[Object, Function]} options - if function, use as callback
 * @param {Function} onAlways - callback function
 * @returns {ImagesLoaded}
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  let queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = {};
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    Object.assign( this.options, options );
  }

  if ( onAlways ) this.on( 'always', onAlways );

  this.getImages();
  // add jQuery Deferred object
  if ( $ ) this.jqDeferred = new $.Deferred();

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

const elementNodeTypes = [ 1, 9, 11 ];

/**
 * @param {Node} elem
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName === 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  let { nodeType } = elem;
  if ( !nodeType || !elementNodeTypes.includes( nodeType ) ) return;

  let childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( let img of childImgs ) {
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    let children = elem.querySelectorAll( this.options.background );
    for ( let child of children ) {
      this.addElementBackgroundImages( child );
    }
  }
};

const reURL = /url\((['"])?(.*?)\1\)/gi;

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  let style = getComputedStyle( elem );
  // Firefox returns null if in a hidden iframe https://bugzil.la/548397
  if ( !style ) return;

  // get url inside url("...")
  let matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    let url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  let loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  let background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  /* eslint-disable-next-line func-style */
  let onProgress = ( image, elem, message ) => {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( () => {
      this.progress( image, elem, message );
    } );
  };

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  } );
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount === this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( `progress: ${message}`, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  let eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  let isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  // add crossOrigin attribute. #204
  if ( this.img.crossOrigin ) {
    this.proxyImage.crossOrigin = this.img.crossOrigin;
  }
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.currentSrc || this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  let { parentNode } = this.img;
  // emit progress with parent <picture> or self <img>
  let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
  this.emitEvent( 'progress', [ this, elem, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  let isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) return;

  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, onAlways ) {
    let instance = new ImagesLoaded( this, options, onAlways );
    return instance.jqDeferred.promise( $( this ) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

} );
// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('get-size') );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory( window.getSize );
  }

}( typeof window != 'undefined' ? window : this, function factory( getSize ) {

const cellClassName = 'flickity-cell';

function Cell( elem ) {
  this.element = elem;
  this.element.classList.add( cellClassName );

  this.x = 0;
  this.unselect();
}

let proto = Cell.prototype;

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.classList.remove( cellClassName );
  this.element.style.transform = '';
  this.element.removeAttribute('aria-hidden');
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

proto.remove = function() {
  this.element.remove();
};

return Cell;

} ) );
// slide
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( typeof window != 'undefined' ? window : this, function factory() {

function Slide( beginMargin, endMargin, cellAlign ) {
  this.beginMargin = beginMargin;
  this.endMargin = endMargin;
  this.cellAlign = cellAlign;
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

let proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length === 1 ) {
    this.x = cell.x; // x comes from first cell
    this.firstMargin = cell.size[ this.beginMargin ];
  }
};

proto.updateTarget = function() {
  let lastCell = this.getLastCell();
  let lastMargin = lastCell ? lastCell.size[ this.endMargin ] : 0;
  let slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( ( cell ) => cell.select() );
};

proto.unselect = function() {
  this.cells.forEach( ( cell ) => cell.unselect() );
};

proto.getCellElements = function() {
  return this.cells.map( ( cell ) => cell.element );
};

return Slide;

} ) );
// animate
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('fizzy-ui-utils') );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory( window.fizzyUIUtils );
  }

}( typeof window != 'undefined' ? window : this, function factory( utils ) {

// -------------------------- animate -------------------------- //

let proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) return;

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  let previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) requestAnimationFrame( () => this.animate() );
};

proto.positionSlider = function() {
  let x = this.x;
  // wrap position around
  if ( this.isWrapping ) {
    x = utils.modulo( x, this.slideableWidth ) - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  if ( this.options.rightToLeft ) x = -x;
  let translateX = this.getPositionValue( x );
  // use 3D transforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    `translate3d(${translateX},0,0)` : `translateX(${translateX})`;
};

proto.dispatchScrollEvent = function() {
  let firstSlide = this.slides[0];
  if ( !firstSlide ) return;

  let positionX = -this.x - firstSlide.target;
  let progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) return;

  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 ) + '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  let isResting = !this.isPointerDown &&
      Math.round( this.x * 100 ) === Math.round( previousX * 100 );
  if ( isResting ) this.restingFrames++;
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  let beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  let afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  cells.forEach( ( cell ) => {
    let cellShift = gap > 0 ? shift : 0;
    this._wrapShiftCell( cell, cellShift );
    gap -= cell.size.outerWidth;
  } );
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) return;

  cells.forEach( ( cell ) => this._wrapShiftCell( cell, 0 ) );
};

// @param {Integer} shift - 0, 1, or -1
proto._wrapShiftCell = function( cell, shift ) {
  this._renderCellPosition( cell, cell.x + this.slideableWidth * shift );
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) return;

  // change the position to drag position by applying force
  let dragVelocity = this.dragX - this.x;
  let dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  let dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) return;

  let distance = this.selectedSlide.target * -1 - this.x;
  let force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

} ) );
// Flickity main
/* eslint-disable max-params */
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('ev-emitter'),
        require('get-size'),
        require('fizzy-ui-utils'),
        require('./cell'),
        require('./slide'),
        require('./animate'),
    );
  } else {
    // browser global
    let _Flickity = window.Flickity;

    window.Flickity = factory(
        window,
        window.EvEmitter,
        window.getSize,
        window.fizzyUIUtils,
        _Flickity.Cell,
        _Flickity.Slide,
        _Flickity.animatePrototype,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
/* eslint-enable max-params */

// vars
const { getComputedStyle, console } = window;
let { jQuery } = window;

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
let GUID = 0;
// internal store of all Flickity intances
let instances = {};

function Flickity( element, options ) {
  let queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) console.error(`Bad element for Flickity: ${queryElement || element}`);
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    let instance = instances[ this.element.flickityGUID ];
    if ( instance ) instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = { ...this.constructor.defaults };
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true,
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.create = {};

let proto = Flickity.prototype;
// inherit EventEmitter
Object.assign( proto, EvEmitter.prototype );

proto._create = function() {
  let { resize, watchCSS, rightToLeft } = this.options;
  // add id for Flickity.data
  let id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.beginMargin = rightToLeft ? 'marginRight' : 'marginLeft';
  this.endMargin = rightToLeft ? 'marginLeft' : 'marginRight';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();
  // used for keyboard navigation
  this.focusableElems = [ this.element ];

  if ( resize || watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( let eventName in this.options.on ) {
    let listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  for ( let method in Flickity.create ) {
    Flickity.create[ method ].call( this );
  }

  if ( watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }
};

/**
 * set options
 * @param {Object} opts - options to extend
 */
proto.option = function( opts ) {
  Object.assign( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) return;

  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  let cellElems = this._filterFindCellElements( this.element.children );
  this.slider.append( ...cellElems );
  this.viewport.append( this.slider );
  this.element.append( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  let slider = document.createElement('div');
  slider.className = 'flickity-slider';
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._updateWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {[Array, NodeList, HTMLElement]} elems - elements to make into cells
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  let cellElems = this._filterFindCellElements( elems );

  // create new Cells for collection
  return cellElems.map( ( cellElem ) => new Cell( cellElem ) );
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  let cellX = 0;
  // get cellX
  if ( index > 0 ) {
    let startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }

  this.cells.slice( index ).forEach( ( cell ) => {
    cell.x = cellX;
    this._renderCellPosition( cell, cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  } );
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = this.cells.length ?
    this.getLastSlide().target - this.slides[0].target : 0;
};

proto._renderCellPosition = function( cell, x ) {
  // render position of cell with in slider
  let sideOffset = this.options.rightToLeft ? -1 : 1;
  let renderX = x * sideOffset;
  if ( this.options.percentPosition ) renderX *= this.size.innerWidth / cell.size.width;
  let positionValue = this.getPositionValue( renderX );
  cell.element.style.transform = `translateX( ${positionValue} )`;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells - cells to size
 */
proto._sizeCells = function( cells ) {
  cells.forEach( ( cell ) => cell.getSize() );
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) return;

  let { beginMargin, endMargin } = this;
  let slide = new Slide( beginMargin, endMargin, this.cellAlign );
  this.slides.push( slide );

  let canCellFit = this._getCanCellFit();

  this.cells.forEach( ( cell, i ) => {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    let slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ endMargin ] );

    if ( canCellFit( i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( beginMargin, endMargin, this.cellAlign );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  } );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  let { groupCells } = this.options;
  if ( !groupCells ) return () => false;

  if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    let number = parseInt( groupCells, 10 );
    return ( i ) => ( i % number ) !== 0;
  }
  // default, group by width of slide
  let percent = 1;
  // parse '75%
  let percentMatch = typeof groupCells == 'string' && groupCells.match( /^(\d+)%$/ );
  if ( percentMatch ) percent = parseInt( percentMatch[1], 10 ) / 100;
  let groupWidth = ( this.size.innerWidth + 1 ) * percent;
  return ( i, slideWidth ) => slideWidth <= groupWidth;
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

let cellAlignShorthands = {
  left: 0,
  center: 0.5,
  right: 1,
};

proto.setCellAlign = function() {
  let { cellAlign, rightToLeft } = this.options;
  let shorthand = cellAlignShorthands[ cellAlign ];
  this.cellAlign = shorthand !== undefined ? shorthand : cellAlign;
  if ( rightToLeft ) this.cellAlign = 1 - this.cellAlign;
};

proto.setGallerySize = function() {
  if ( !this.options.setGallerySize ) return;

  let height = this.options.adaptiveHeight && this.selectedSlide ?
    this.selectedSlide.height : this.maxCellHeight;
  this.viewport.style.height = `${height}px`;
};

proto._updateWrapShiftCells = function() {
  // update isWrapping
  this.isWrapping = this.getIsWrapping();
  // only for wrap-around
  if ( !this.isWrapping ) return;

  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  let beforeGapX = this.cursorPosition;
  let lastIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( beforeGapX, lastIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  let afterGapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( afterGapX, 0, 1 );
};

proto.getIsWrapping = function() {
  let { wrapAround } = this.options;
  if ( !wrapAround || this.slides.length < 2 ) return false;

  if ( wrapAround !== 'fill' ) return true;
  // check that slides can fit

  let gapWidth = this.slideableWidth - this.size.innerWidth;
  if ( gapWidth > this.size.innerWidth ) return true; // gap * 2x big, all good
  // check that content width - shifting cell is bigger than viewport width
  for ( let cell of this.cells ) {
    if ( cell.size.outerWidth > gapWidth ) return false;
  }
  return true;
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  let cells = [];
  while ( gapX > 0 ) {
    let cell = this.cells[ cellIndex ];
    if ( !cell ) break;

    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain & wrap ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  let isContaining = this.options.contain && !this.isWrapping &&
      this.cells.length;
  if ( !isContaining ) return;

  let contentWidth = this.slideableWidth - this.getLastCell().size[ this.endMargin ];
  // content is less than gallery size
  let isContentSmaller = contentWidth < this.size.innerWidth;
  if ( isContentSmaller ) {
    // all cells fit inside gallery
    this.slides.forEach( ( slide ) => {
      slide.target = contentWidth * this.cellAlign;
    } );
  } else {
    // contain to bounds
    let beginBound = this.cursorPosition + this.cells[0].size[ this.beginMargin ];
    let endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
    this.slides.forEach( ( slide ) => {
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    } );
  }
};

// ----- events ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  let emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    let $event = type;
    if ( event ) {
      // create jQuery event
      let jQEvent = new jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

const unidraggerEvents = [
  'dragStart',
  'dragMove',
  'dragEnd',
  'pointerDown',
  'pointerMove',
  'pointerEnd',
  'staticClick',
];

let _emitEvent = proto.emitEvent;
proto.emitEvent = function( eventName, args ) {
  if ( eventName === 'staticClick' ) {
    // add cellElem and cellIndex args to staticClick
    let clickedCell = this.getParentCell( args[0].target );
    let cellElem = clickedCell && clickedCell.element;
    let cellIndex = clickedCell && this.cells.indexOf( clickedCell );
    args = args.concat( cellElem, cellIndex );
  }
  // do regular thing
  _emitEvent.call( this, eventName, args );
  // duck-punch in jQuery events for Unidragger events
  let isUnidraggerEvent = unidraggerEvents.includes( eventName );
  if ( !isUnidraggerEvent || !jQuery || !this.$element ) return;

  eventName += this.options.namespaceJQueryEvents ? '.flickity' : '';
  let event = args.shift( 0 );
  let jQEvent = new jQuery.Event( event );
  jQEvent.type = eventName;
  this.$element.trigger( jQEvent, args );
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) return;

  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.isWrapping || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) return;

  let prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index !== prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  if ( !this.isWrapping ) return;

  const { selectedIndex, slideableWidth, slides: { length } } = this;
  // shift index for wrap, do not wrap dragSelect
  if ( !this.isDragSelect ) {
    let wrapIndex = utils.modulo( index, length );
    // go to shortest
    let delta = Math.abs( wrapIndex - selectedIndex );
    let backWrapDelta = Math.abs( ( wrapIndex + length ) - selectedIndex );
    let forewardWrapDelta = Math.abs( ( wrapIndex - length ) - selectedIndex );
    if ( backWrapDelta < delta ) {
      index += length;
    } else if ( forewardWrapDelta < delta ) {
      index -= length;
    }
  }

  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= slideableWidth;
  } else if ( index >= length ) {
    this.x += slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  let slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) return;

  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) this.selectedSlide.unselect();
};

proto.selectInitialIndex = function() {
  let initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    let cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  let index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {[Element, Number]} value - zero-based index or element to select
 * @param {Boolean} isWrap - enables wrapping around for extra index
 * @param {Boolean} isInstant - disables slide animation
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  let cell = this.queryCell( value );
  if ( !cell ) return;

  let index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slide that has cell
  let cellSlide = this.slides.find( ( slide ) => slide.cells.includes( cell ) );
  return this.slides.indexOf( cellSlide );
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem - matching cell element
 * @returns {Flickity.Cell} cell - matching cell
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( let cell of this.cells ) {
    if ( cell.element === elem ) return cell;
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {[Element, Array, NodeList]} elems - multiple elements
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  return elems.map( ( elem ) => this.getCell( elem ) ).filter( Boolean );
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( ( cell ) => cell.element );
};

/**
 * get parent cell from an element
 * @param {Element} elem - child element
 * @returns {Flickit.Cell} cell - parent cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  let cell = this.getCell( elem );
  if ( cell ) return cell;

  // try to get parent cell elem
  let closest = elem.closest('.flickity-slider > *');
  return this.getCell( closest );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) return this.selectedSlide.getCellElements();

  index = index === undefined ? this.selectedIndex : index;

  let len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements(); // get all
  }

  let cellElems = [];
  for ( let i = index - adjCount; i <= index + adjCount; i++ ) {
    let slideIndex = this.isWrapping ? utils.modulo( i, len ) : i;
    let slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {[Element, String, Number]} selector - element, selector string, or index
 * @returns {Flickity.Cell} - matching cell
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  // do not select invalid selectors from hash: #123, #/. #791
  let isSelectorString = typeof selector == 'string' && !selector.match( /^[#.]?[\d/]/ );
  if ( isSelectorString ) {
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  // #1177 disable resize behavior when animating or dragging for iOS 15
  if ( !this.isActive || this.isAnimating || this.isDragging ) return;
  this.getSize();
  // wrap values
  if ( this.isWrapping ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._updateWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  let selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  if ( !this.options.watchCSS ) return;

  let afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.includes('flickity') ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  let { activeElement } = document;
  let handler = Flickity.keyboardHandlers[ event.key ];
  // only work if element is in focus
  if ( !this.options.accessibility || !activeElement || !handler ) return;

  let isFocused = this.focusableElems.some( ( elem ) => activeElement === elem );
  if ( isFocused ) handler.call( this );
};

Flickity.keyboardHandlers = {
  ArrowLeft: function() {
    this.uiChange();
    let leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this[ leftMethod ]();
  },
  ArrowRight: function() {
    this.uiChange();
    let rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  this.element.focus({ preventScroll: true });
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) return;

  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( ( cell ) => cell.destroy() );
  this.viewport.remove();
  // move child elements back into element
  this.element.append( ...this.slider.children );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

Object.assign( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {[Element, String]} elem - element or selector string
 * @returns {Flickity} - Flickity instance
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  if ( elem ) return instances[ elem.flickityGUID ];
};

utils.htmlInit( Flickity, 'flickity' );

let { jQueryBridget } = window;
if ( jQuery && jQueryBridget ) {
  jQueryBridget( 'flickity', Flickity, jQuery );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

} ) );
// drag
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
        require('unidragger'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    window.Flickity = factory(
        window,
        window.Flickity,
        window.Unidragger,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, Flickity, Unidragger, utils ) {

// ----- defaults ----- //

Object.assign( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
} );

// -------------------------- drag prototype -------------------------- //

let proto = Flickity.prototype;
Object.assign( proto, Unidragger.prototype ); // inherit Unidragger
proto.touchActionValue = '';

// --------------------------  -------------------------- //

Flickity.create.drag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  this.on( 'pointerDown', this.handlePointerDown );
  this.on( 'pointerUp', this.handlePointerUp );
  this.on( 'pointerDown', this.handlePointerDone );
  this.on( 'dragStart', this.handleDragStart );
  this.on( 'dragMove', this.handleDragMove );
  this.on( 'dragEnd', this.handleDragEnd );
  this.on( 'staticClick', this.handleStaticClick );
  // TODO updateDraggable on resize? if groupCells & slides change
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable === '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  this.element.classList.toggle( 'is-draggable', this.isDraggable );
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.handlePointerDown = function( event ) {
  if ( !this.isDraggable ) {
    // proceed for staticClick
    this.bindActivePointerEvents( event );
    return;
  }

  let isTouchStart = event.type === 'touchstart';
  let isTouchPointer = event.pointerType === 'touch';
  let isFocusNode = event.target.matches('input, textarea, select');
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) event.preventDefault();
  if ( !isFocusNode ) this.focus();
  // blur
  if ( document.activeElement !== this.element ) document.activeElement.blur();
  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );
  this.bindActivePointerEvents( event );
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.handlePointerUp = function() {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
};

proto.handlePointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.handleDragStart = function() {
  if ( !this.isDraggable ) return;

  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
};

proto.handleDragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) return;

  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  let direction = this.options.rightToLeft ? -1 : 1;
  // wrap around move. #589
  if ( this.isWrapping ) moveVector.x %= this.slideableWidth;
  let dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.isWrapping ) {
    // slow drag
    let originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    let endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;
  this.dragMoveTime = new Date();
};

proto.handleDragEnd = function() {
  if ( !this.isDraggable ) return;

  let { freeScroll } = this.options;
  if ( freeScroll ) this.isFreeScrolling = true;
  // set selectedIndex based on where flick will end up
  let index = this.dragEndRestingSelect();

  if ( freeScroll && !this.isWrapping ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    let restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !freeScroll && index === this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.isWrapping;
  this.select( index );
  delete this.isDragSelect;
};

proto.dragEndRestingSelect = function() {
  let restingX = this.getRestingPosition();
  // how far away from selected slide
  let distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  let positiveResting = this._getClosestResting( restingX, distance, 1 );
  let negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  return positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  let index = this.selectedIndex;
  let minDistance = Infinity;
  let condition = this.options.contain && !this.isWrapping ?
    // if containing, keep going if distance is equal to minDistance
    ( dist, minDist ) => dist <= minDist :
    ( dist, minDist ) => dist < minDist;

  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) break;

    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment,
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x - horizontal position
 * @param {Integer} index - slide index
 * @returns {Number} - slide distance
 */
proto.getSlideDistance = function( x, index ) {
  let len = this.slides.length;
  // wrap around if at least 2 slides
  let isWrapAround = this.options.wrapAround && len > 1;
  let slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  let slide = this.slides[ slideIndex ];
  if ( !slide ) return null;

  // add distance for wrap-around slides
  let wrap = isWrapAround ? this.slideableWidth * Math.floor( index/len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  let distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  let delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- scroll ----- //

proto.onscroll = function() {
  let scroll = getScrollPosition();
  let scrollMoveX = this.pointerDownScroll.x - scroll.x;
  let scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this.pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
}

// -----  ----- //

return Flickity;

} ) );
// prev/next buttons
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./core') );
  } else {
    // browser global
    factory( window.Flickity );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity ) {

const svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( increment, direction, arrowShape ) {
  this.increment = increment;
  this.direction = direction;
  this.isPrevious = increment === 'previous';
  this.isLeft = direction === 'left';
  this._create( arrowShape );
}

PrevNextButton.prototype._create = function( arrowShape ) {
  // properties
  let element = this.element = document.createElement('button');
  element.className = `flickity-button flickity-prev-next-button ${this.increment}`;
  let label = this.isPrevious ? 'Previous' : 'Next';
  // prevent button from submitting form https://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  element.setAttribute( 'aria-label', label );
  // init as disabled
  this.disable();
  // create arrow
  let svg = this.createSVG( label, arrowShape );
  element.append( svg );
};

PrevNextButton.prototype.createSVG = function( label, arrowShape ) {
  let svg = document.createElementNS( svgURI, 'svg' );
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  // add title #1189
  let title = document.createElementNS( svgURI, 'title' );
  title.append( label );
  // add path
  let path = document.createElementNS( svgURI, 'path' );
  let pathMovements = getArrowMovements( arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180)' );
  }
  svg.append( title, path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) return shape;

  let { x0, x1, x2, x3, y1, y2 } = shape;

  // create movement string
  return `M ${x0}, 50
    L ${x1}, ${y1 + 50}
    L ${x2}, ${y2 + 50}
    L ${x3}, 50
    L ${x2}, ${50 - y2}
    L ${x1}, ${50 - y1}
    Z`;
}

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  this.element.removeAttribute('disabled');
};

PrevNextButton.prototype.disable = function() {
  this.element.setAttribute( 'disabled', true );
};

// -------------------------- Flickity prototype -------------------------- //

Object.assign( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30,
  },
} );

Flickity.create.prevNextButtons = function() {
  if ( !this.options.prevNextButtons ) return;

  let { rightToLeft, arrowShape } = this.options;
  let prevDirection = rightToLeft ? 'right' : 'left';
  let nextDirection = rightToLeft ? 'left' : 'right';
  this.prevButton = new PrevNextButton( 'previous', prevDirection, arrowShape );
  this.nextButton = new PrevNextButton( 'next', nextDirection, arrowShape );
  this.focusableElems.push( this.prevButton.element );
  this.focusableElems.push( this.nextButton.element );

  this.handlePrevButtonClick = () => {
    this.uiChange();
    this.previous();
  };

  this.handleNextButtonClick = () => {
    this.uiChange();
    this.next();
  };

  this.on( 'activate', this.activatePrevNextButtons );
  this.on( 'select', this.updatePrevNextButtons );
};

let proto = Flickity.prototype;

proto.updatePrevNextButtons = function() {
  let lastIndex = this.slides.length ? this.slides.length - 1 : 0;
  this.updatePrevNextButton( this.prevButton, 0 );
  this.updatePrevNextButton( this.nextButton, lastIndex );
};

proto.updatePrevNextButton = function( button, disabledIndex ) {
  // enable is wrapAround and at least 2 slides
  if ( this.isWrapping && this.slides.length > 1 ) {
    button.enable();
    return;
  }

  let isEnabled = this.selectedIndex !== disabledIndex;
  button[ isEnabled ? 'enable' : 'disable' ]();
  // if disabling button that is focused,
  // shift focus to element to maintain keyboard accessibility
  let isDisabledFocused = !isEnabled && document.activeElement === button.element;
  if ( isDisabledFocused ) this.focus();
};

proto.activatePrevNextButtons = function() {
  this.prevButton.element.addEventListener( 'click', this.handlePrevButtonClick );
  this.nextButton.element.addEventListener( 'click', this.handleNextButtonClick );
  this.element.append( this.prevButton.element, this.nextButton.element );
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.element.remove();
  this.nextButton.element.remove();
  this.prevButton.element.removeEventListener( 'click', this.handlePrevButtonClick );
  this.nextButton.element.removeEventListener( 'click', this.handleNextButtonClick );
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

} ) );
// page dots
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// -------------------------- PageDots -------------------------- //

function PageDots() {
  // create holder element
  this.holder = document.createElement('div');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
}

PageDots.prototype.setDots = function( slidesLength ) {
  // get difference between number of slides and number of dots
  let delta = slidesLength - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  let newDots = new Array( count ).fill()
    .map( ( item, i ) => {
      let dot = document.createElement('button');
      dot.setAttribute( 'type', 'button' );
      let num = i + 1 + this.dots.length;
      dot.className = 'flickity-page-dot';
      dot.textContent = `View slide ${num}`;
      return dot;
    } );

  this.holder.append( ...newDots );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  let removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( ( dot ) => dot.remove() );
};

PageDots.prototype.updateSelected = function( index ) {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.classList.remove('is-selected');
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) return;

  this.selectedDot = this.dots[ index ];
  this.selectedDot.classList.add('is-selected');
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

Object.assign( Flickity.defaults, {
  pageDots: true,
} );

Flickity.create.pageDots = function() {
  if ( !this.options.pageDots ) return;

  this.pageDots = new PageDots();
  this.handlePageDotsClick = this.onPageDotsClick.bind( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

let proto = Flickity.prototype;

proto.activatePageDots = function() {
  this.pageDots.setDots( this.slides.length );
  this.focusableElems.push( ...this.pageDots.dots );
  this.pageDots.holder.addEventListener( 'click', this.handlePageDotsClick );
  this.element.append( this.pageDots.holder );
};

proto.onPageDotsClick = function( event ) {
  let index = this.pageDots.dots.indexOf( event.target );
  if ( index === -1 ) return; // only dot clicks

  this.uiChange();
  this.select( index );
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected( this.selectedIndex );
};

proto.updatePageDots = function() {
  this.pageDots.dots.forEach( ( dot ) => {
    utils.removeFrom( this.focusableElems, dot );
  } );
  this.pageDots.setDots( this.slides.length );
  this.focusableElems.push( ...this.pageDots.dots );
};

proto.deactivatePageDots = function() {
  this.pageDots.holder.remove();
  this.pageDots.holder.removeEventListener( 'click', this.handlePageDotsClick );
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

} ) );
// player & autoPlay
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./core') );
  } else {
    // browser global
    factory( window.Flickity );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity ) {

// -------------------------- Player -------------------------- //

function Player( autoPlay, onTick ) {
  this.autoPlay = autoPlay;
  this.onTick = onTick;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

// start play
Player.prototype.play = function() {
  if ( this.state === 'playing' ) return;

  // do not play if page is hidden, start playing when page is visible
  let isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state !== 'playing' ) return;

  // default to 3 seconds
  let time = typeof this.autoPlay == 'number' ? this.autoPlay : 3000;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( () => {
    this.onTick();
    this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state === 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state === 'paused' ) this.play();
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  let isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

Object.assign( Flickity.defaults, {
  pauseAutoPlayOnHover: true,
} );

Flickity.create.player = function() {
  this.player = new Player( this.options.autoPlay, () => {
    this.next( true );
  } );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

let proto = Flickity.prototype;

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) return;

  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) return;

  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

} ) );
// add, remove cell
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

// append cells to a document fragment
function getCellsFragment( cells ) {
  let fragment = document.createDocumentFragment();
  cells.forEach( ( cell ) => fragment.appendChild( cell.element ) );
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

let proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {[Element, Array, NodeList]} elems - Elements to insert
 * @param {Integer} index - Zero-based number to insert
 */
proto.insert = function( elems, index ) {
  let cells = this._makeCells( elems );
  if ( !cells || !cells.length ) return;

  let len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  let fragment = getCellsFragment( cells );
  // append to slider
  let isAppend = index === len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    let insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    let endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index );
  this.positionSliderAtSelected();
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {[Element, Array, NodeList]} elems - ELements to remove
 */
proto.remove = function( elems ) {
  let cells = this.getCells( elems );
  if ( !cells || !cells.length ) return;

  let minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( ( cell ) => {
    cell.remove();
    let index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  } );

  this.cellChange( minCellIndex );
  this.positionSliderAtSelected();
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  let cell = this.getCell( elem );
  if ( !cell ) return;

  cell.getSize();

  let index = this.cells.indexOf( cell );
  this.cellChange( index );
  // do not position slider after lazy load
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex ) {
  let prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._updateWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex, try to maintain position & select previous selected element
  let cell = this.getCell( prevSelectedElem );
  if ( cell ) this.selectedIndex = this.getCellSlideIndex( cell );
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
};

// -----  ----- //

return Flickity;

} ) );
// lazyload
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.fizzyUIUtils,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( Flickity, utils ) {

const lazyAttr = 'data-flickity-lazyload';
const lazySrcAttr = `${lazyAttr}-src`;
const lazySrcsetAttr = `${lazyAttr}-srcset`;
const imgSelector = `img[${lazyAttr}], img[${lazySrcAttr}], ` +
  `img[${lazySrcsetAttr}], source[${lazySrcsetAttr}]`;

Flickity.create.lazyLoad = function() {
  this.on( 'select', this.lazyLoad );

  this.handleLazyLoadComplete = this.onLazyLoadComplete.bind( this );
};

let proto = Flickity.prototype;

proto.lazyLoad = function() {
  let { lazyLoad } = this.options;
  if ( !lazyLoad ) return;

  // get adjacent cells, use lazyLoad option for adjacent count
  let adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  // lazy load images
  this.getAdjacentCellElements( adjCount )
    .map( getCellLazyImages )
    .flat()
    .forEach( ( img ) => new LazyLoader( img, this.handleLazyLoadComplete ) );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.matches('img') ) {
    let cellAttr = cellElem.getAttribute( lazyAttr );
    let cellSrcAttr = cellElem.getAttribute( lazySrcAttr );
    let cellSrcsetAttr = cellElem.getAttribute( lazySrcsetAttr );
    if ( cellAttr || cellSrcAttr || cellSrcsetAttr ) {
      return cellElem;
    }
  }
  // select lazy images in cell
  return [ ...cellElem.querySelectorAll( imgSelector ) ];
}

proto.onLazyLoadComplete = function( img, event ) {
  let cell = this.getParentCell( img );
  let cellElem = cell && cell.element;
  this.cellSizeChange( cellElem );

  this.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 * @param {Image} img - Image element
 * @param {Function} onComplete - callback function
 */
function LazyLoader( img, onComplete ) {
  this.img = img;
  this.onComplete = onComplete;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  let src = this.img.getAttribute( lazyAttr ) ||
    this.img.getAttribute( lazySrcAttr );
  let srcset = this.img.getAttribute( lazySrcsetAttr );
  // set src & serset
  this.img.src = src;
  if ( srcset ) this.img.setAttribute( 'srcset', srcset );
  // remove attr
  this.img.removeAttribute( lazyAttr );
  this.img.removeAttribute( lazySrcAttr );
  this.img.removeAttribute( lazySrcsetAttr );
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
  let mediaElem = this.img.parentNode.matches('picture') ? this.img.parentNode : this.img;
  mediaElem.classList.add( className );

  this.onComplete( this.img, event );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

} ) );
// imagesloaded
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./core'),
        require('imagesloaded'),
    );
  } else {
    // browser global
    factory(
        window.Flickity,
        window.imagesLoaded,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( Flickity, imagesLoaded ) {

Flickity.create.imagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

Flickity.prototype.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) return;

  let onImagesLoadedProgress = ( instance, image ) => {
    let cell = this.getParentCell( image.img );
    this.cellSizeChange( cell && cell.element );
    if ( !this.options.freeScroll ) this.positionSliderAtSelected();
  };
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

} ) );
