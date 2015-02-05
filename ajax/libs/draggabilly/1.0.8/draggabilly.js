/*!
 * Draggabilly v1.0.8
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 */

( function( window ) {

'use strict';

// vars
var document = window.document;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function noop() {}

// ----- get style ----- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


// http://stackoverflow.com/a/384380/182183
var isElement = ( typeof HTMLElement === 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj === 'object' &&
      obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };

// -------------------------- requestAnimationFrame -------------------------- //

// https://gist.github.com/1866474

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' ');
// get unprefixed rAF and cAF, if present
var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;
// loop through vendor prefixes and get prefixed rAF and cAF
var prefix;
for( var i = 0; i < prefixes.length; i++ ) {
  if ( requestAnimationFrame && cancelAnimationFrame ) {
    break;
  }
  prefix = prefixes[i];
  requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
  cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                            window[ prefix + 'CancelRequestAnimationFrame' ];
}

// fallback to setTimeout and clearTimeout if either request/cancel is not supported
if ( !requestAnimationFrame || !cancelAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = window.setTimeout( function() {
      callback( currTime + timeToCall );
    }, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = function( id ) {
    window.clearTimeout( id );
  };
}

// -------------------------- definition -------------------------- //

function draggabillyDefinition( classie, EventEmitter, eventie, getStyleProperty, getSize ) {

// -------------------------- support -------------------------- //

var transformProperty = getStyleProperty('transform');
// TODO fix quick & dirty check for 3D support
var is3d = !!getStyleProperty('perspective');

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element === 'string' ?
    document.querySelector( element ) : element;

  this.options = extend( {}, this.options );
  extend( this.options, options );

  this._create();
}

// inherit EventEmitter methods
extend( Draggabilly.prototype, EventEmitter.prototype );

Draggabilly.prototype.options = {
};

Draggabilly.prototype._create = function() {

  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getStyle( this.element );
  if ( style.position !== 'relative' && style.position !== 'absolute' ) {
    this.element.style.position = 'relative';
  }

  this.enable();
  this.setHandles();

};

/**
 * set this.handles and bind start events to 'em
 */
Draggabilly.prototype.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  for ( var i=0, len = this.handles.length; i < len; i++ ) {
    var handle = this.handles[i];
    // bind pointer start event
    // listen for both, for devices like Chrome Pixel
    //   which has touch and mouse events
    eventie.bind( handle, 'mousedown', this );
    eventie.bind( handle, 'touchstart', this );
    disableImgOndragstart( handle );
  }
};

// remove default dragging interaction on all images in IE8
// IE8 does its own drag thing on images, which messes stuff up

function noDragStart() {
  return false;
}

// TODO replace this with a IE8 test
var isIE8 = 'attachEvent' in document.documentElement;

// IE8 only
var disableImgOndragstart = !isIE8 ? noop : function( handle ) {

  if ( handle.nodeName === 'IMG' ) {
    handle.ondragstart = noDragStart;
  }

  var images = handle.querySelectorAll('img');
  for ( var i=0, len = images.length; i < len; i++ ) {
    var img = images[i];
    img.ondragstart = noDragStart;
  }
};


// get left/top position from style
Draggabilly.prototype._getPosition = function() {
  // properties
  var style = getStyle( this.element );

  var x = parseInt( style.left, 10 );
  var y = parseInt( style.top, 10 );

  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

// add transform: translate( x, y ) to position
Draggabilly.prototype._addTransformPosition = function( style ) {
  if ( !transformProperty ) {
    return;
  }
  var transform = style[ transformProperty ];
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

// trigger handler methods for events
Draggabilly.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
Draggabilly.prototype.getTouch = function( touches ) {
  for ( var i=0, len = touches.length; i < len; i++ ) {
    var touch = touches[i];
    if ( touch.identifier === this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

Draggabilly.prototype.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this.dragStart( event, event );
};

Draggabilly.prototype.ontouchstart = function( event ) {
  // disregard additional touches
  if ( this.isDragging ) {
    return;
  }

  this.dragStart( event, event.changedTouches[0] );
};

function setPointerPoint( point, pointer ) {
  point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;
  point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;
}

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }

  if ( event.preventDefault ) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }

  var isTouch = event.type === 'touchstart';

  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.identifier;

  this._getPosition();

  this.measureContainment();

  // point where drag began
  setPointerPoint( this.startPoint, pointer );
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;

  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  // bind move and end events
  this._bindEvents({
    events: isTouch ? [ 'touchmove', 'touchend', 'touchcancel' ] :
      [ 'mousemove', 'mouseup' ],
    // IE8 needs to be bound to document
    node: event.preventDefault ? window : document
  });

  classie.add( this.element, 'is-dragging' );

  // reset isDragging flag
  this.isDragging = true;

  this.emitEvent( 'dragStart', [ this, event, pointer ] );

  // start animation
  this.animate();
};

Draggabilly.prototype._bindEvents = function( args ) {
  for ( var i=0, len = args.events.length; i < len; i++ ) {
    var event = args.events[i];
    eventie.bind( args.node, event, this );
  }
  // save these arguments
  this._boundEvents = args;
};

Draggabilly.prototype._unbindEvents = function() {
  var args = this._boundEvents;
  // IE8 can trigger dragEnd twice, check for _boundEvents
  if ( !args || !args.events ) {
    return;
  }

  for ( var i=0, len = args.events.length; i < len; i++ ) {
    var event = args.events[i];
    eventie.unbind( args.node, event, this );
  }
  delete this._boundEvents;
};

Draggabilly.prototype.measureContainment = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }

  this.size = getSize( this.element );
  var elemRect = this.element.getBoundingClientRect();

  // use element if element
  var container = isElement( containment ) ? containment :
    // fallback to querySelector if string
    typeof containment === 'string' ? document.querySelector( containment ) :
    // otherwise just `true`, use the parent
    this.element.parentNode;

  this.containerSize = getSize( container );
  var containerRect = container.getBoundingClientRect();

  this.relativeStartPosition = {
    x: elemRect.left - containerRect.left,
    y: elemRect.top  - containerRect.top
  };
};

// ----- move event ----- //

Draggabilly.prototype.onmousemove = function( event ) {
  this.dragMove( event, event );
};

Draggabilly.prototype.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.dragMove( event, touch );
  }
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragMove = function( event, pointer ) {

  setPointerPoint( this.dragPoint, pointer );
  var dragX = this.dragPoint.x - this.startPoint.x;
  var dragY = this.dragPoint.y - this.startPoint.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  if ( this.options.containment ) {
    var relX = this.relativeStartPosition.x;
    var relY = this.relativeStartPosition.y;
    var minX = applyGrid( -relX, gridX, 'ceil' );
    var minY = applyGrid( -relY, gridY, 'ceil' );
    var maxX = this.containerSize.width - relX - this.size.width;
    var maxY = this.containerSize.height - relY - this.size.height;
    maxX = applyGrid( maxX, gridX, 'floor' );
    maxY = applyGrid( maxY, gridY, 'floor' );
    dragX = Math.min( maxX, Math.max( minX, dragX ) );
    dragY = Math.min( maxY, Math.max( minY, dragY ) );
  }

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.emitEvent( 'dragMove', [ this, event, pointer ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}


// ----- end event ----- //

Draggabilly.prototype.onmouseup = function( event ) {
  this.dragEnd( event, event );
};

Draggabilly.prototype.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.dragEnd( event, touch );
  }
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragEnd = function( event, pointer ) {
  this.isDragging = false;

  delete this.pointerIdentifier;

  // use top left position when complete
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
    this.setLeftTop();
  }

  // remove events
  this._unbindEvents();

  classie.remove( this.element, 'is-dragging' );

  this.emitEvent( 'dragEnd', [ this, event, pointer ] );

};

// ----- cancel event ----- //

// coerce to end event
Draggabilly.prototype.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  this.dragEnd( event, touch );
};

// -------------------------- animation -------------------------- //

Draggabilly.prototype.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// transform translate function
var translate = is3d ?
  function( x, y ) {
    return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';
  } :
  function( x, y ) {
    return 'translate( ' + x + 'px, ' + y + 'px)';
  };

// left/top positioning
Draggabilly.prototype.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

Draggabilly.prototype.positionDrag = transformProperty ?
  function() {
    // position with transform
    this.element.style[ transformProperty ] = translate( this.dragPoint.x, this.dragPoint.y );
  } : Draggabilly.prototype.setLeftTop;

Draggabilly.prototype.enable = function() {
  this.isEnabled = true;
};

Draggabilly.prototype.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

return Draggabilly;

} // end definition

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'classie/classie',
      'eventEmitter/EventEmitter',
      'eventie/eventie',
      'get-style-property/get-style-property',
      'get-size/get-size'
    ],
    draggabillyDefinition );
} else {
  // browser global
  window.Draggabilly = draggabillyDefinition(
    window.classie,
    window.EventEmitter,
    window.eventie,
    window.getStyleProperty,
    window.getSize
  );
}

})( window );
