/*!
  * Native JavaScript for Bootstrap v3.0.14c (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      propertyValue = computedStyle[transitionProperty],
      durationValue = computedStyle[transitionDuration],
      durationScale = durationValue.indexOf('ms') > -1 ? 1 : 1000,
      duration = supportTransition && propertyValue && propertyValue !== 'none' 
               ? parseFloat( durationValue ) * durationScale : 0;

  return !isNaN(duration) ? duration : 0
}

// emulateTransitionEnd
function emulateTransitionEnd(element,handler){ 
  var called = 0, 
      endEvent = new Event( transitionEndEvent ),
      duration = getElementTransitionDuration(element);

  if ( duration ) {
    element.addEventListener( transitionEndEvent, function transitionEndWrapper(e){ 
      if ( e.target === element ) {
        handler.apply( element, [e] );
        element.removeEventListener( transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    });
    setTimeout(function() { 
      !called && element.dispatchEvent( endEvent );
    }, duration + 17 );
  } else { handler.apply( element, [endEvent]); }
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function hasClass(element,classNAME) {
  return element.classList.contains(classNAME)
}

function removeClass(element,classNAME) {
  element.classList.remove(classNAME);
}

var fadeClass = 'fade';

var showClass = 'show';

var addEventListener = 'addEventListener';

var removeEventListener = 'removeEventListener';

var dataBsDismiss = 'data-bs-dismiss';

function bootstrapCustomEvent( namespacedEventType, eventProperties ) {
  var OriginalCustomEvent = new CustomEvent( namespacedEventType, { cancelable: true } );

  if ( eventProperties instanceof Object ) {
    Object.keys( eventProperties ).forEach( function (key) {
      Object.defineProperty( OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent
}

// ALERT PRIVATE GC
// ================
var alertString = 'alert',
    alertComponent = 'Alert',
    alertSelector = "[" + dataBsDismiss + "=\"" + alertString + "\"]";


// ALERT SCOPE
// ===========
function Alert( alertTarget ) {

  var self, element, alert;

  // ALERT CUSTOM EVENTS
  // ===================
  var closeAlertEvent = bootstrapCustomEvent( ("close.bs." + alertString) ), // 'type.bs.component'
      closedAlertEvent = bootstrapCustomEvent( ("closed.bs." + alertString) );


  // ALERT EVENT HANDLERS
  // ====================
  function alertTransitionEnd() {

    toggleAlertHandler();
    alert.dispatchEvent( closedAlertEvent );

    alert.parentNode.removeChild( alert );
  }

  function alertClickHandler(e) {
    var eventTarget = e.target;

    alert && ( element === eventTarget || element.contains( eventTarget ) )
      && self.close();
  }


  // ALERT PRIVATE METHOD
  // ====================
  function toggleAlertHandler( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', alertClickHandler );
  }


  // ALERT DEFINITION
  // ================
  var Alert = function Alert( target ){

    // bind 
    self = this;

    // initialization element
    element = queryElement( target );
      
    // reset previous instance
    element[alertComponent] && element[alertComponent].dispose();

    alert = element.closest( ("." + alertString) );

    // add event listener
    toggleAlertHandler( 1 );

    // store init 
    element[alertComponent] = this;
  };


  // ALERT PUBLIC METHODS
  // ====================
  var AlertProto = Alert.prototype;

  AlertProto.close = function() {
    if ( alert && hasClass( alert, showClass) ) {

      alert.dispatchEvent( closeAlertEvent );
      if ( closeAlertEvent.defaultPrevented ) { return }

      removeClass( alert, showClass );

      hasClass( alert, fadeClass )
        ? emulateTransitionEnd( alert, alertTransitionEnd ) 
        : alertTransitionEnd();

      this.dispose();
    }
  };

  AlertProto.dispose = function() {
    toggleAlertHandler();
    delete element[alertComponent];
  };

  return new Alert( alertTarget )
}


var alertInit = {
  component: alertComponent,
  selector: alertSelector,
  constructor: Alert
};

function addClass(element,classNAME) {
  element.classList.add(classNAME);
}

var activeClass = 'active';

var dataBsToggle = 'data-bs-toggle';

// BUTTON PRIVATE GC
// =================
var buttonString = 'button',
    buttonComponent = 'Button',
    buttonSelector = "[" + dataBsToggle + "=\"" + buttonString + "\"]",
    ariaPressed = 'aria-pressed';


// BUTTON SCOPE
// ============
function Button( buttonTarget ){

  var self, element, isActive;

  // BUTTON PRIVATE METHOD
  // =====================
  function handleButtonToggle( e ) {
    self.toggle.apply( element, [e] ); 
  }

  // BUTTON PRIVATE METHOD
  // =====================
  function toggleButtonHandler(action) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', handleButtonToggle );
  }  

  // BUTTON DEFINITION
  // =================
  var Button = function Button( target ){

    self = this;
      
    // initialization element
    element = queryElement( target );

    // reset previous instance
    element[buttonComponent] && element[buttonComponent].dispose();
      
    // set initial state
    isActive = hasClass( element, activeClass );
    element.setAttribute( ariaPressed, isActive ? true : 'false' );

    // add event listener
    toggleButtonHandler( 1 );

    // attach instance to element
    element[buttonComponent] = self;
  };

  
  // BUTTON PUBLIC METHODS
  // =====================
  var ButtonProto = Button.prototype;

  ButtonProto.toggle = function(e) {
    e.preventDefault();

    if ( hasClass( element, 'disabled' ) ) { return } 

    isActive = hasClass( element, activeClass );
    
    var action = isActive ? removeClass : addClass,
          ariaValue = isActive ? 'false' : 'true';

    action( element, activeClass );
    element.setAttribute( ariaPressed, ariaValue );
  };

  ButtonProto.dispose = function() {
    toggleButtonHandler();
    delete element[buttonComponent];
  };

  return new Button( buttonTarget )
}


var buttonInit = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button
};

// determine support for passive events
var supportPassive = (function () {
  // Test via a getter in the options object to see if the passive property is accessed
  var result = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        result = true;
      }
    });
    document.addEventListener('DOMContentLoaded', function wrap(){
      document.removeEventListener('DOMContentLoaded', wrap, opts);
    }, opts);
  } catch (e) {}

  return result;
})();

// general event options

var passiveHandler = supportPassive ? { passive: true } : false;

function isElementInScrollRange(element) {
  var bcr = element.getBoundingClientRect(), 
      viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
}

function normalizeValue( value ) {
  if ( value === 'true' ) {
    return true
  }

  if ( value === 'false' ) {
    return false
  }

  if ( !isNaN(value) ) {
    return +value
  }

  if ( value === '' || value === 'null' ) {
    return null
  }

  // string / function / Element / Object
  return value
}

var dataBsTarget = 'data-bs-target';

var dataBsParent = 'data-bs-parent';

var dataBsContainer = 'data-bs-container';

function getTargetElement( element ){
  return queryElement( element.getAttribute( dataBsTarget ) || element.getAttribute( 'href' ) ) 
        || element.closest( element.getAttribute( dataBsParent ) )
        || queryElement( element.getAttribute( dataBsContainer ) )
}

function normalizeOptions( element, defaultOptions, inputOptions ) {
  var normalOptions = {}, dataOptions = {}, 
      data = Object.assign( {}, element.dataset ),
      targetOps = [ 'target', 'parent', 'container' ];

  Object.keys( data )
    .map( function (k) {
      var key = k.replace('bs','')
                 .replace(/[A-Z]/, function (match) { return match.toLowerCase(); } );

      dataOptions[key] = targetOps.includes(key) ? getTargetElement( element )
                       : normalizeValue( data[k] );
    });

  Object.keys( inputOptions )
    .map( function (k) {
      inputOptions[k] = targetOps.includes(k) 
        ? ( inputOptions[k] instanceof Element ? inputOptions[k] 
            : k === 'parent' ? element.closest( inputOptions[k] ) 
            : queryElement( inputOptions[k] ) )
        : normalizeValue( inputOptions[k] );
    });

  Object.keys( defaultOptions )
    .map( function (k) {
      normalOptions[k] = k in inputOptions ? inputOptions[k]
                       : k in dataOptions ? dataOptions[k]
                       : defaultOptions[k];
    });

  return normalOptions
}

// CAROUSEL PRIVATE GC
// ===================
var carouselString = 'carousel',
    carouselComponent = 'Carousel',
    carouselSelector = "[data-bs-ride=\"" + carouselString + "\"]";


// CAROUSEL SCOPE
// ==============
function Carousel( carouselElement, carouselOptions ){
  
  // CAROUSEL PRIVATE GC
  // ===================
  var carouselControl = carouselString + "-control",
      carouselItem = carouselString + "-item",
      dataBsSlideTo = 'data-bs-slide-to',
      pausedClass = 'paused',
      defaultCarouselOptions = {
        pause: 'hover', // 'boolean|string'
        keyboard: false, // 'boolean'
        touch: true, // 'boolean'
        interval: 5000 // 'boolean|number'
      },

      // CAROUSEL CUSTOM EVENTS
      // ======================
      carouselSlideEvent = bootstrapCustomEvent(  ("slide.bs." + carouselString) ),
      carouselSlidEvent = bootstrapCustomEvent( ("slid.bs." + carouselString) );

  var element,
      self, 
      ops = {},
      slides,
      indicator,
      indicators,
      controls,
      direction = 'left',
      isPaused = false,
      isAnimating = false,
      index = 0,
      timer = null,
      isTouch = false,
      startX = 0,
      currentX = 0,
      endX = 0;


  // CAROUSEL EVENT HANDLERS
  // =======================
  function carouselTransitionEndHandler(){
    var next = index,
        activeItem = getActiveIndex(),
        orientation = direction === 'left' ? 'next' : 'prev',
        directionClass = direction === 'left' ? 'start' : 'end';

    if ( isAnimating && element[carouselComponent] ){
      isAnimating = false;

      addClass( slides[next], activeClass );
      removeClass( slides[activeItem], activeClass );

      removeClass( slides[next], (carouselItem + "-" + orientation) );
      removeClass( slides[next], (carouselItem + "-" + directionClass) );
      removeClass( slides[activeItem], (carouselItem + "-" + directionClass) );

      element.dispatchEvent( carouselSlidEvent );

      // check for element, might have been disposed
      if ( !document.hidden && ops.interval 
        && !hasClass( element, pausedClass ) ) 
      {
        self.cycle();
      }
    }
  }

  function carouselPauseHandler() {
    if ( !hasClass( element, pausedClass ) ) {
      addClass( element, pausedClass );
      !isAnimating && ( clearInterval( timer ), timer = null );
    }
  }

  function carouselResumeHandler() {
    if ( !isPaused && hasClass( element, pausedClass ) ) {

      removeClass( element, pausedClass );

      if ( !isAnimating ) {
        clearInterval( timer );
        timer = null; 
        self.cycle();
      } 
    }
  }

  function carouselIndicatorHandler(e) {
    e.preventDefault();

    var eventTarget = e.target; // event target | the current active item

    if ( isAnimating ) { return }

    if ( eventTarget && !hasClass( eventTarget, activeClass ) // event target is not active
      && eventTarget.getAttribute( dataBsSlideTo ) ) // AND has the specific attribute
    {
      self.to( +eventTarget.getAttribute( dataBsSlideTo ) ); // do the slide
    }
  }

  function carouselControlsHandler(e) {
    e.preventDefault();

    var eventTarget = e.currentTarget || e.srcElement;

    if ( controls[1] && eventTarget === controls[1] ) {
      self.next();
    } else if ( controls[1] && eventTarget === controls[0] ) {
      self.prev();
    }
  }

  function carouselKeyHandler(ref) {
    var which = ref.which;


    if ( !isElementInScrollRange( element ) ) { return }

    switch ( which ) {
      case 39:
        self.next();
        break
      case 37:
        self.prev();
        break
      default: return
    }
  }


  // CAROUSEL TOUCH HANDLERS
  // =======================
  function carouselTouchDownHandler(e) {
    if ( isTouch ) { return } 

    startX = e.changedTouches[0].pageX;

    if ( element.contains(e.target) ) {
      isTouch = true;
      toggleCarouselTouchHandlers( 1 );
    }
  }

  function carouselTouchMoveHandler(e) {
    if ( !isTouch ) { return }

    currentX = e.changedTouches[0].pageX;
    
    // cancel touch if more than one changedTouches detected
    if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
      e.preventDefault();
      return false
    }
  }

  function carouselTouchEndHandler (e) {

    if ( !isTouch || isAnimating ) { return }
    
    endX = currentX || e.changedTouches[0].pageX;

    if ( isTouch ) {

      if ( ( !element.contains( e.target ) || !element.contains( e.relatedTarget ) ) // the event target is outside the carousel OR carousel doens't include the related target
          && Math.abs( startX - endX) < 75 ) // AND swipe distance is less than 75px
      { // when the above conditions are satisfied, no need to continue
        return false
      } else { // OR determine next index to slide to
        if ( currentX < startX ) {
          index++;
        } else if ( currentX > startX ) {
          index--;
        }

        isTouch = false;
        self.to( index ); // do the slide
      }

      toggleCarouselTouchHandlers(); // remove touch events handlers
    }
  }


  // CAROUSEL PRIVATE METHODS
  // ========================
  function activateCarouselIndicator( pageIndex ) { // indicators    
    Array.from( indicators ).map( function (x) { return removeClass( x, activeClass ); } );
    indicators[pageIndex] && addClass( indicators[pageIndex], activeClass );
  }

  function toggleCarouselTouchHandlers( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'touchmove', carouselTouchMoveHandler, passiveHandler );
    element[action]( 'touchend', carouselTouchEndHandler, passiveHandler );
  }

  function toggleCarouselHandlers( action ) {
    action = action ? addEventListener : removeEventListener;

    if ( ops.pause && ops.interval ) {
      element[action]( 'mouseenter', carouselPauseHandler );
      element[action]( 'mouseleave', carouselResumeHandler );
      element[action]( 'touchstart', carouselPauseHandler, passiveHandler );
      element[action]( 'touchend', carouselResumeHandler, passiveHandler );
    }

    ops.touch && slides.length > 1 
      && element[action]( 'touchstart', carouselTouchDownHandler, passiveHandler );

    controls.map( function (arrow) { return arrow 
      && arrow[action]( 'click', carouselControlsHandler ); } );

    indicator && indicator[action]( 'click', carouselIndicatorHandler );
    ops.keyboard && window[action]( 'keydown', carouselKeyHandler );
  }

  function getActiveIndex() {
    return Array.from( slides )
      .indexOf( element.getElementsByClassName( (carouselItem + " " + activeClass) )[0] ) || 0
  }


  // CAROUSEL DEFINITION
  // ===================
  var Carousel = function Carousel ( target, options ){

    // bind
    self = this;

    // set options
    options = options || {};

    // initialization element
    element = queryElement( target );

    // carousel elements
    // a LIVE collection is prefferable
    slides = element.getElementsByClassName( carouselItem );

    // reset previous instance
    element[carouselComponent] && element[carouselComponent].dispose();

    // invalidate when not enough items
    // no need to go further
    if ( slides.length < 2 ) { return }

    controls = [
      queryElement( ("." + carouselControl + "-prev"), element ),
      queryElement( ("." + carouselControl + "-next"), element )
    ];

    // a LIVE collection is prefferable
    indicator = queryElement( '.carousel-indicators', element );
    indicators = indicator && indicator.getElementsByTagName( 'LI' ) || [];

    // set JavaScript and DATA API options
    ops = normalizeOptions( element, defaultCarouselOptions, options );

    // don't use TRUE as interval, it's actually 0, use the default 5000ms better
    ops.interval = ops.interval === true
        ? defaultCarouselOptions.interval 
        : ops.interval;

    // set first slide active if none
    if ( getActiveIndex() < 0 ) {
      slides.length && addClass( slides[0], activeClass );
      indicators.length && activateCarouselIndicator( 0 );
    }

    // attach event handlers
    toggleCarouselHandlers( 1 );

    // start to cycle if interval is set
    ops.interval && self.cycle();

    // associate init object to target
    element[carouselComponent] = self;
  };


  // CAROUSEL PUBLIC METHODS
  // =======================
  var CarouselProto = Carousel.prototype;

  CarouselProto.cycle = function() {
    if ( timer ) {
      clearInterval( timer );
      timer = null;
    }

    if ( isPaused ) {
      removeClass( element, pausedClass );
      isPaused = !isPaused;
    }
    
    timer = setInterval( function () {
      isElementInScrollRange( element ) && ( index++, self.to( index ) );
    }, ops.interval );
  };

  CarouselProto.pause = function() {
    if ( ops.interval && !isPaused ) {
      clearInterval( timer );
      timer = null;
      addClass( element, pausedClass );
      isPaused = !isPaused;
    }
  };

  CarouselProto.next = function() {
    !isAnimating && index++, self.to( index );
  };

  CarouselProto.prev = function() {
    !isAnimating && index--, self.to( index );
  };

  CarouselProto.to = function( next ) {
    var activeItem = getActiveIndex();

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if ( isAnimating || activeItem === next ) { return }

    // determine transition direction
    if ( ( activeItem < next ) || ( activeItem === 0 && next === slides.length -1 ) ) {
      direction = 'left'; // next
    } else if ( ( activeItem > next ) || ( activeItem === slides.length - 1 && next === 0 ) ) {
      direction = 'right'; // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1; } 
    else if ( next >= slides.length ){ next = 0; }

    // orientation, class name, eventProperties
    var orientation = direction === 'left' ? 'next' : 'prev',
        directionClass = direction === 'left' ? 'start' : 'end',
        eventProperties = { relatedTarget: slides[next], direction: direction, from: activeItem, to: next };

    // update event properties
    Object.keys( eventProperties ).map( function (k) {
      carouselSlideEvent[k] = eventProperties[k];
      carouselSlidEvent[k] = eventProperties[k];
    });

    // discontinue when prevented
    element.dispatchEvent( carouselSlideEvent );
    if ( carouselSlideEvent.defaultPrevented ) { return } 

    // update index
    index = next;

    clearInterval( timer );
    timer = null;

    isAnimating = true;
    activateCarouselIndicator( next );

    if ( getElementTransitionDuration( slides[next] ) && hasClass( element, 'slide' ) ) {

      addClass( slides[next], (carouselItem + "-" + orientation) );
      slides[next].offsetWidth;
      addClass( slides[next], (carouselItem + "-" + directionClass) );
      addClass( slides[activeItem], (carouselItem + "-" + directionClass) );

      emulateTransitionEnd( slides[next], carouselTransitionEndHandler );

    } else {

      addClass( slides[next], activeClass );
      removeClass( slides[activeItem], activeClass );

      setTimeout( function () {
        isAnimating = false;

        // check for element, might have been disposed
        if ( element && ops.interval && !hasClass( element, pausedClass ) ) {
          self.cycle();
        }

        element.dispatchEvent( carouselSlidEvent );
      }, 100 );
    }
  };

  CarouselProto.dispose = function() {
    var itemClasses = ['start','end','prev','next'];

    Array.from( slides ).map( function ( slide, idx ) {
      hasClass( slide, activeClass ) && activateCarouselIndicator( idx );
      itemClasses.map( function (c) { return removeClass( slide, (carouselItem + "-" + c) ); } );
    });

    toggleCarouselHandlers();
    clearInterval( timer );

    delete element[carouselComponent];
  };

  return new Carousel( carouselElement, carouselOptions )
}


var carouselInit = {
  component: carouselComponent,
  selector: carouselSelector,
  constructor: Carousel
};

var ariaExpanded = 'aria-expanded';

var collapsingClass = 'collapsing'; // collapse / tab

// COLLAPSE GC
// ===========
var collapseString = 'collapse',
    collapseComponent = 'Collapse',
    collapseSelector = "[" + dataBsToggle + "=\"" + collapseString + "\"]";


// COLLAPSE SCOPE
// ==============
function Collapse( collapseElement, collapseOptions ) {

  // COLLAPSE INTERNALS
  // ==================
  var self, element, collapse, accordion;


  // COLLAPSE CUSTOM EVENTS
  // ======================
  var showCollapseEvent = bootstrapCustomEvent( ("show.bs." + collapseString) ),
      shownCollapseEvent = bootstrapCustomEvent( ("shown.bs." + collapseString) ),
      hideCollapseEvent = bootstrapCustomEvent( ("hide.bs." + collapseString) ),
      hiddenCollapseEvent = bootstrapCustomEvent( ("hidden.bs." + collapseString) );


  // COLLAPSE PRIVATE METHODS
  // ========================
  function expandCollapse() {

    collapse.dispatchEvent( showCollapseEvent );
    if ( showCollapseEvent.defaultPrevented ) { return }

    collapse.isAnimating = true;
    accordion && ( accordion.isAnimating = true );

    addClass( collapse, collapsingClass );
    removeClass( collapse, collapseString );

    collapse.style.height = (collapse.scrollHeight) + "px";
    
    emulateTransitionEnd( collapse, function () {
      collapse.isAnimating = false;
      accordion && ( accordion.isAnimating = false );

      collapse.setAttribute( ariaExpanded, 'true' );
      element.setAttribute( ariaExpanded, 'true' );

      removeClass( collapse, collapsingClass );
      addClass( collapse, collapseString );
      addClass( collapse, showClass );

      collapse.style.height = '';
      collapse.dispatchEvent( shownCollapseEvent );
    });
  }

  function collapseContent(ref) {
    var collapse = ref.collapse;
    var element = ref.element;

    collapse.dispatchEvent( hideCollapseEvent );
    if ( hideCollapseEvent.defaultPrevented ) { return }

    collapse.isAnimating = true;
    accordion && ( accordion.isAnimating = true );

    collapse.style.height = (collapse.scrollHeight) + "px";

    removeClass( collapse, collapseString );
    removeClass( collapse, showClass );
    addClass( collapse, collapsingClass );

    collapse.offsetWidth; // force reflow
    collapse.style.height = '0px';

    emulateTransitionEnd( collapse, function () {
      collapse.isAnimating = false;
      accordion && ( accordion.isAnimating = false );

      collapse.setAttribute( ariaExpanded, 'false' );
      element.setAttribute( ariaExpanded, 'false' );

      removeClass( collapse, collapsingClass );
      addClass( collapse, collapseString );

      collapse.style.height = '';
      collapse.dispatchEvent( hiddenCollapseEvent );
    });
  }

  function toggleCollapseHandler( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', collapseClickHandler );
  }


  // COLLAPSE EVENT HANDLER
  // ======================
  function collapseClickHandler(e){
    var eventTarget = e.target;

    self.toggle();

    // event target is anchor link with collapse DATA API #398
    if ( e && eventTarget.tagName === 'A' && eventTarget.getAttribute( dataBsToggle ) === collapseString 
      || element.tagName === 'A' ) // OR our init element is anchor link
    {
      e.preventDefault(); 
    }
  }


  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function Collapse( target, options ) {
      
    // bind
    self = this;
      
    // set options
    options = options || {};

    // initialization element
    element = queryElement( target );

    // reset on re-init
    element[collapseComponent] && element[collapseComponent].dispose();

    // determine targets
    collapse =queryElement( options.target ) || getTargetElement( element );
    accordion = element.closest( options.parent ) || getTargetElement( collapse );

    collapse && ( collapse.isAnimating = false );
    accordion && ( accordion.isAnimating = false );

    // add event listeners
    toggleCollapseHandler( 1 );

    // associate target to init object
    element[collapseComponent] = self;
  };


  // COLLAPSE PUBLIC METHODS
  // =======================
  var CollapseProto = Collapse.prototype;

  CollapseProto.toggle = function() {
    if ( !hasClass( collapse, showClass ) ) { this.show(); } 
    else { this.hide(); }
  };

  CollapseProto.hide = function() {   
    if ( collapse.isAnimating ) { return }

    collapseContent({ collapse: collapse, element: element });
    addClass( element, (collapseString + "d") );
  };

  CollapseProto.show = function() {
    var activeElement, activeCollapse;

    if ( accordion ) {
      activeCollapse = accordion.getElementsByClassName( (collapseString + " " + showClass) )[0];
      activeElement = Array.from( accordion.querySelectorAll( collapseSelector ) )
                            .find( function (c) { return !hasClass( c, (collapseString + "d") ); } );
    }

    if ( ( !accordion || accordion && !accordion.isAnimating ) && !collapse.isAnimating ) {
      if ( activeElement && activeCollapse !== collapse ) {
        collapseContent({ collapse: activeCollapse, element: activeElement });
        addClass( activeElement, (collapseString + "d") );
      }
      expandCollapse();
      removeClass( element, (collapseString + "d") );
    }
  };

  CollapseProto.dispose = function() {
    toggleCollapseHandler();

    accordion && ( delete accordion.isAnimating );
    delete collapse.isAnimating;
    delete element[collapseComponent];
  };

  return new Collapse( collapseElement, collapseOptions )
}


var collapseInit = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse
};

var dropdownClasses = [ 'dropdown', 'dropup', 'dropstart', 'dropend' ];

var dropdownMenuClass = 'dropdown-menu';

function isEmptyAnchor( anchor ) {

  // return anchor ? ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
  //   || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
  //   && anchor.parentNode.href.slice(-1) === '#' ) 
  // && e.preventDefault() : false
  return anchor && ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
    || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
    && anchor.parentNode.href.slice(-1) === '#' )
}

function setFocus (element){
  element.focus ? element.focus() : element.setActive();
}

// DROPDOWN PRIVATE GC
// ===================
var dropdownString = dropdownClasses[0],
      dropdownComponent = 'Dropdown',
      dropdownSelector = "[" + dataBsToggle + "=\"" + dropdownString + "\"]";


// DROPDOWN SCOPE
// ==============
function Dropdown( dropdownElement ){   

  // DROPDOWN PRIVATE GC
  // ===================
  var dropupString = dropdownClasses[1],
      dropstartString = dropdownClasses[2],
      dropendString = dropdownClasses[3],
      dropleftString = 'dropleft',
      droprightString = 'dropright',
      dropdownMenuEndClass = dropdownMenuClass + "-end",
      hideMenuClass = [ 'd-block', 'invisible' ],
      verticalClass = [ dropdownString, dropupString ],
      horizontalClass = [ dropstartString, dropendString ],

      // DROPDOWN CUSTOM EVENTS
      // ========================
      showDropdownEvent = bootstrapCustomEvent( ("show.bs." + dropdownString) ),  
      shownDropdownEvent = bootstrapCustomEvent( ("shown.bs." + dropdownString) ), 
      hideDropdownEvent = bootstrapCustomEvent( ("hide.bs." + dropdownString) ), 
      hiddenDropdownEvent = bootstrapCustomEvent( ("hidden.bs." + dropdownString) );

  var self, 
      element,
      parent,
      menu,
      btnGroup,
      originalClass,
      dropLeft,
      dropRight,
      dropdownMenuEnd,
      menuItems,
      relatedTarget;


  // DROPDOWN PRIVATE METHODS
  // ========================
  function styleDropdown( show ){
    var positionClass = dropdownClasses.filter( function (c) { return originalClass.includes(c); } )[0];

    if ( !show ) {
      parent.className = originalClass.join( ' ' );
      var menuAction = dropdownMenuEnd && !hasClass( menu, dropdownMenuEndClass ) ? addClass : removeClass;
      menuAction( menu, dropdownMenuEndClass );
      return
    }

    // force showing the menu to calculate its size
    hideMenuClass.map( function (c) { return addClass( menu, c ); } );

    var dropdownRegex   = new RegExp( ("\\b(" + dropdownString + "|" + dropupString + "|" + dropstartString + "|" + dropendString + ")+") ),
        elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
        menuDimensions    = { w : menu.offsetWidth,    h: menu.offsetHeight    },
        windowWidth       = ( document.documentElement.clientWidth  || document.body.clientWidth  ),
        windowHeight      = ( document.documentElement.clientHeight || document.body.clientHeight ),
        targetBCR         = element.getBoundingClientRect(),
        leftExceed        = targetBCR.left + elementDimensions.w - menuDimensions.w < 0, // dropdownMenuEnd && [ dropdown | dropup ]
        leftFullExceed    = targetBCR.left - menuDimensions.w < 0, // dropstart
        rightExceed       = targetBCR.left + menuDimensions.w >= windowWidth, // !dropdownMenuEnd && [ dropdown | dropup ]
        rightFullExceed   = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth, // dropend 
        bottomExceed      = targetBCR.top  + menuDimensions.h >= windowHeight, // dropstart | dropend
        bottomFullExceed  = targetBCR.top  + menuDimensions.h + elementDimensions.h >= windowHeight, // dropdown
        topExceed         = targetBCR.top  - menuDimensions.h < 0; // dropup

    // recompute position
    positionClass = horizontalClass.includes( positionClass ) && leftFullExceed && rightFullExceed ? dropdownString : positionClass;
    positionClass = horizontalClass.includes( positionClass ) && bottomExceed ? dropupString : positionClass;
    positionClass = positionClass === dropstartString && leftFullExceed && !bottomExceed ? dropendString : positionClass;
    positionClass = positionClass === dropendString && rightFullExceed && !bottomExceed ? dropstartString : positionClass;
    positionClass = positionClass === dropupString && topExceed && !bottomFullExceed ? dropdownString : positionClass;
    positionClass = positionClass === dropdownString && bottomFullExceed && !topExceed ? dropupString : positionClass;

    // update dropdown position class
    !hasClass( parent, positionClass ) && 
    ( parent.className = parent.className.replace( dropdownRegex, positionClass ) );

    // update dropstart / dropend to pixel perfect
    var dropStartAction = (!dropLeft || !dropRight) && positionClass === dropstartString ? addClass : removeClass,
        dropEndAction = (!dropLeft || !dropRight) && positionClass === dropendString ? addClass : removeClass;

    dropStartAction( parent, dropleftString );
    dropEndAction( parent, droprightString );

    // update dropdown / dropup to handle parent btn-group element
    // as well as the dropdown-menu-end utility class
    if ( verticalClass.includes( positionClass ) ) {
      var menuEndAction = rightExceed ? addClass : removeClass;

      !btnGroup ? menuEndAction( menu, dropdownMenuEndClass )
          : leftExceed && addClass( parent, 'position-static' );
    }

    // remove util classes from the menu, we have its size
    hideMenuClass.map( function (c) { return removeClass( menu, c ); } );
  }

  function toggleDropdownDismiss() {
    var action = element.open ? addEventListener : removeEventListener;

    document[action]( 'click', dropdownDismissHandler );
    document[action]( 'focus', dropdownDismissHandler );
    document[action]( 'keydown', dropdownPreventScroll );
    document[action]( 'keyup', dropdownKeyHandler );
    window[action]( 'scroll', dropdownLayoutHandler, passiveHandler );
    window[action]( 'resize', dropdownLayoutHandler, passiveHandler );
  }

  function toggleDropdownHandler( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', dropdownClickHandler );
  }

  function showDropdown(){
    var currentParent = queryElement( dropdownClasses.map( function (c) { return ("." + c + "." + showClass); } ).join(',') ),
        currentElement = currentParent && queryElement( dropdownSelector, currentParent );

    currentElement && currentElement[dropdownComponent].toggle();

    // update relatedTarget and dispatch
    showDropdownEvent.relatedTarget = relatedTarget;
    parent.dispatchEvent( showDropdownEvent );
    if ( showDropdownEvent.defaultPrevented ) { return }

    // change menu position
    styleDropdown( 1 );

    addClass( menu, showClass );
    addClass( parent, showClass );

    element.setAttribute( ariaExpanded, true );
    element.open = true;

    setTimeout( function () {
      setFocus( menu.getElementsByTagName( 'INPUT' )[0] || element ); // focus the first input item | element
      toggleDropdownDismiss();

      shownDropdownEvent.relatedTarget = relatedTarget;
      parent.dispatchEvent( shownDropdownEvent );
    }, 1 );
  }

  function hideDropdown(){
    hideDropdownEvent.relatedTarget = relatedTarget;
    parent.dispatchEvent( hideDropdownEvent );
    if ( hideDropdownEvent.defaultPrevented ) { return }

    removeClass( menu, showClass );
    removeClass( parent, showClass );

    // revert to original position
    styleDropdown();

    element.setAttribute( ariaExpanded, false );
    element.open = false;

    setFocus( element );
    
    // only re-attach handler if the instance is not disposed
    setTimeout( function () { return toggleDropdownDismiss(); }, 1 );

    // update relatedTarget and dispatch
    hiddenDropdownEvent.relatedTarget = relatedTarget;
    parent.dispatchEvent( hiddenDropdownEvent );
  }


  // DROPDOWN EVENT HANDLERS
  // =======================
  function dropdownDismissHandler( e ) {
    var eventTarget = e.target,
          hasData = eventTarget.getAttribute( dataBsToggle) === dropdownString ||
            eventTarget.closest( dropdownSelector ) !== null,
          isForm = parent.contains( eventTarget ) &&
            ( eventTarget.tagName === 'form' || eventTarget.closest( 'form' ) !== null );

    if ( e.type === 'click' && isEmptyAnchor( eventTarget ) ) { 
      e.preventDefault();
    }
    if ( e.type === 'focus' && 
      ( eventTarget === element || eventTarget === menu || menu.contains( eventTarget ) ) ) 
    { return }  

    if ( isForm || hasData ){
      return
    } else {
      relatedTarget = eventTarget;
      hideDropdown();
    }
  }

  function dropdownClickHandler( e ) {
    relatedTarget = element;
    self.toggle();

    isEmptyAnchor( e.target ) && e.preventDefault();
  }

  function dropdownPreventScroll( e ) {
    if ( e.which === 38 || e.which === 40 ) { e.preventDefault(); }
  }

  function dropdownKeyHandler(ref) {
    var which = ref.which;

    var activeItem = document.activeElement,
        isSameElement = activeItem === element,
        isInsideMenu = menu.contains(activeItem),
        isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

    var idx = menuItems.indexOf( activeItem );

    if ( isMenuItem ) { // navigate up | down
      idx = isSameElement ? 0 
          : which === 38 ? ( idx > 1 ? idx-1 : 0 )
          : which === 40 ? ( idx < menuItems.length-1 ? idx+1 : idx ) : idx;
      menuItems[idx] && setFocus( menuItems[idx] );
    }

    if ( ( menuItems.length && isMenuItem // menu has items
        || !menuItems.length && (isInsideMenu || isSameElement )  // menu might be a form
        || !isInsideMenu ) // or the focused element is not in the menu at all
        && element.open && which === 27  // menu must be open
    ) {
      relatedTarget = null;
      self.toggle();
    }
  }

  function dropdownLayoutHandler(){
    element.open && styleDropdown( 1 );
  }


  // DROPDOWN DEFINITION
  // ===================

  var Dropdown = function Dropdown ( target ) {

    // bind
    self = this;

    // initialization element
    element = queryElement( target );

    // set private properties unique ID key
    element[dropdownComponent] && element[dropdownComponent].dispose();

    // set targets
    parent = element.parentNode;
    menu = queryElement( ("." + dropdownMenuClass), parent );
    btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical');
    // set original position
    originalClass = Array.from( parent.classList );
    dropLeft = originalClass.includes( dropleftString );
    dropRight = originalClass.includes( droprightString );
    dropdownMenuEnd = hasClass( menu, dropdownMenuEndClass );
    relatedTarget = null;
    menuItems = [];

    Array.from( menu.children ).map( function (child) {
      child.children.length && ( child.children[0].tagName === 'A' && menuItems.push(child.children[0]) );
      child.tagName === 'A' && menuItems.push( child );
    });

    // set initial state to closed
    element.open = false;

    // add event listener
    toggleDropdownHandler( 1 );

    // associate element with init object 
    element[dropdownComponent] = this;
  };


  // DROPDOWN PUBLIC METHODS
  // =======================
  var DropdownProto = Dropdown.prototype;

  DropdownProto.toggle = function() {
    hasClass( parent, showClass ) && element.open
      ? hideDropdown() : showDropdown();
  };
  DropdownProto.dispose = function() {
    hasClass( parent, showClass ) && element.open 
      && hideDropdown();

    toggleDropdownHandler();
    delete element[dropdownComponent];
    delete element.open;
  };

  return new Dropdown( dropdownElement )
}


var dropdownInit = {
  component: dropdownComponent,
  selector: dropdownSelector,
  constructor: Dropdown
};

var ariaHidden = 'aria-hidden';

var fixedTopClass = 'fixed-top';

var fixedBottomClass = 'fixed-bottom';

// MODAL PRIVATE GC
// ================
var modalString = 'modal',
      modalComponent = 'Modal',
      modalSelector = "[" + dataBsToggle + "=\"" + modalString + "\"]",
      modalDismissSelector = "[" + dataBsDismiss + "=\"" + modalString + "\"]",
      modalDefaultOptions = {
        backdrop: true, // boolean|string
        keyboard: true // boolean
      };


// MODAL SCOPE
// ===========   
function Modal( modalElement, modalOptions ){

  // MODAL PRIVATE GC
  // ================
  var modalFixedItems = Array.from(document.getElementsByClassName( fixedTopClass ))
                  .concat(Array.from(document.getElementsByClassName( fixedBottomClass ))),
        modalOpenClass = modalString + "-open",
        modalBackdropClass = modalString + "-backdrop",
        modalStaticClass = modalString + "-static",

        // MODAL CUSTOM EVENTS
        // ===================
        showModalEvent = bootstrapCustomEvent( ("show.bs." + modalString) ),
        shownModalEvent = bootstrapCustomEvent( ("shown.bs." + modalString) ),
        hideModalEvent = bootstrapCustomEvent( ("hide.bs." + modalString) ),
        hiddenModalEvent = bootstrapCustomEvent( ("hidden.bs." + modalString) );

 var self,
    element,
    modal,
    modalDialog,
    ops = {},
    isAnimating = false,
    isStatic,
    hasFade,
    relatedTarget;


  // MODAL PRIVATE METHODS
  // =====================
  function setModalScrollbar() {
    var openModal = hasClass( document.body, modalOpenClass ),
          bodyPad = parseInt( getComputedStyle(document.body).paddingRight ),
          bodyOverflow = document.documentElement.clientHeight !== document.documentElement.scrollHeight 
                      || document.body.clientHeight !== document.body.scrollHeight,
          modalOverflow = modal.clientHeight !== modal.scrollHeight,
          scrollBarWidth = measureModalScrollbar();

    modal.style.paddingRight = !modalOverflow && scrollBarWidth 
      ? (scrollBarWidth + "px") : '';

    document.body.style.paddingRight = modalOverflow || bodyOverflow 
      ? ((bodyPad + ( openModal ? 0 : scrollBarWidth )) + "px") : '';

    modalFixedItems.length && modalFixedItems.map( function (fixed) {
      var itemPad = getComputedStyle(fixed).paddingRight;

      fixed.style.paddingRight = modalOverflow || bodyOverflow 
        ? ((parseInt( itemPad ) + ( openModal ? 0 : scrollBarWidth )) + "px")
        : ((parseInt( itemPad )) + "px");
    });
  }

  function resetModalScrollbar() {
    document.body.style.paddingRight = '';
    modal.style.paddingRight = '';

    modalFixedItems.length && modalFixedItems.map( function (fixed) {
      fixed.style.paddingRight = '';
    });
  }

  function measureModalScrollbar() {
    var scrollDiv = document.createElement( 'div' ), widthValue;

    scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay
    document.body.appendChild(scrollDiv);
    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild( scrollDiv );
    return widthValue;
  }

  function createModalOverlay() {
    var overlay = queryElement( ("." + modalBackdropClass) );

    if ( overlay === null ) {
      var newOverlay = document.createElement( 'div' );
      newOverlay.setAttribute( 'class', ("" + modalBackdropClass + (hasFade ? (' '+fadeClass) : '')));

      overlay = newOverlay;
      document.body.appendChild( overlay );
    }

    return overlay
  }

  function removeModalOverlay () {
    var overlay = queryElement( ("." + modalBackdropClass) );

    if ( overlay && !document.getElementsByClassName( (modalString + " " + showClass) )[0] ) {
      document.body.removeChild(overlay); overlay = null;     
    }
    
    isAnimating = false;

    overlay === null && ( removeClass( document.body, modalOpenClass), resetModalScrollbar() );
  }

  function toggleModalDismiss( action ) {
    action = action ? addEventListener : removeEventListener;
    window[action]( 'resize', modalResizeHandler, passiveHandler);
    modal[action]( 'click', modalDismissHandler ); 
    document[action]( 'keydown', modalKeyHandler );
  }

  function toggleModalHandler( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', modalClickHandler );
  }

  function beforeShowModal() {
    modal.style.display = 'block';
    
    setModalScrollbar();
    !document.getElementsByClassName( (modalString + " " + showClass) )[0]
      && addClass( document.body, modalOpenClass );
    
    addClass( modal, showClass );
    modal.setAttribute( ariaHidden, false );

    hasFade ? emulateTransitionEnd( modal, triggerModalShow )
        : triggerModalShow();
  }

  function triggerModalShow() {
    setFocus( modal );
    isAnimating = false;

    toggleModalDismiss( 1 );

    shownModalEvent.relatedTarget = relatedTarget;
    modal.dispatchEvent( shownModalEvent );
  }

  function triggerModalHide( force ) {
    var overlay = queryElement( ("." + modalBackdropClass) );

    modal.style.display = '';
    element && ( setFocus( element ) ); 

    // force can also be the transitionEvent object, we wanna make sure it's not
    if ( !force && overlay && hasFade && hasClass( overlay, showClass ) // call is not forced and overlay is visible
      && !queryElement( ("." + modalString + "." + showClass) ) ) // AND no modal is visible
    {
      removeClass( overlay, showClass );
      emulateTransitionEnd( overlay, removeModalOverlay );
    } else {
      removeModalOverlay();
    }

    toggleModalDismiss();

    hiddenModalEvent.relatedTarget = relatedTarget;
    modal.dispatchEvent( hiddenModalEvent );
  }


  // MODAL EVENT HANDLERS
  // ====================
  function modalClickHandler(e) {
    var eventTarget = e.target;

    if ( isAnimating ) { return }

    var modalID = modal.getAttribute( 'id' ),
          elemTargetModal = getTargetElement( element );

    if ( !hasClass( modal, showClass ) // modal not visible AND
        && element.contains( eventTarget ) && elemTargetModal.id === modalID ) // OR the event target is a child of the element pointing to our modal
    {
      relatedTarget = element;
      self.show();
      e.preventDefault();
    }
  }

  function modalResizeHandler(){
    self.update();
  }

  function modalKeyHandler( ref ) {
    var which = ref.which;

    if ( !isAnimating // modal has no animations running
      && ops.keyboard && which == 27 // the keyboard option is enabled and the key is 27
      && hasClass( modal, showClass ) ) // the modal is not visible
    {
      self.hide();
    }
  }

  function modalDismissHandler( e ) { // mouseup on dismiss button or outside the .modal-dialog
    if ( isAnimating ) { return }

    var eTarget = e.target,
        selectedText = document.getSelection().toString().length,
        targetInsideDialog = modalDialog.contains( eTarget ),
        dismiss = eTarget.getAttribute( dataBsDismiss ) === modalString
               || eTarget.closest( modalDismissSelector );

    if ( selectedText && !targetInsideDialog ) {
      return
    } else if ( isStatic && !targetInsideDialog ) {
      addClass( modal, modalStaticClass );
      isAnimating = true;
      emulateTransitionEnd( modalDialog, staticTransitionEnd );
    } else if ( dismiss || ( !selectedText && !isStatic && !targetInsideDialog ) ) {
      self.hide();
      relatedTarget = dismiss ? eTarget : null;
      e.preventDefault();
    }
  }

  function staticTransitionEnd(){
    var duration = getElementTransitionDuration( modalDialog ) + 17;
    removeClass( modal, modalStaticClass );
    setTimeout( function () { return isAnimating = false; }, duration ); // user must wait for zoom out transition
  }


  // MODAL DEFINITION
  // ================
  var Modal = function Modal( target, options ){ // element can be the modal/triggering button

    // bind
    self = this;

    // set options
    options = options || {};

    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement( target );

    // determine modal, triggering element
    modal = hasClass( element, modalString ) ? element : getTargetElement( element );
    modalDialog = queryElement( ("." + modalString + "-dialog"), modal );

    // modal is now independent of it's triggering element
    if ( hasClass( element, modalString ) ) { element = null; } 
      
    // reset previous instance
    (element||modal)[modalComponent] && (element||modal)[modalComponent].dispose();

    // set options
    ops = normalizeOptions( modal, modalDefaultOptions, options );

    // additional internal options
    isStatic = ops.backdrop === 'static';
    hasFade = hasClass( modal, fadeClass );

    // set associations
    if ( element ) {
      // modal is independent of a triggering element
      toggleModalHandler( 1 );

      modal.modalTrigger = element;
      element[modalComponent] = self;
    } else { 
      modal[modalComponent] = self;
    }
  };


  // MODAL PUBLIC METHODS
  // ====================
  var ModalProto = Modal.prototype;

  ModalProto.toggle = function() {
    hasClass( modal, showClass ) ? self.hide() : self.show();
  };

  ModalProto.show = function() {
    if ( hasClass( modal, showClass ) && !isAnimating ) { return }

    showModalEvent.relatedTarget = relatedTarget;
    modal.dispatchEvent( showModalEvent );
    if ( showModalEvent.defaultPrevented ) { return }

    isAnimating = true;

    // we elegantly hide any opened modal
    var currentOpen = document.getElementsByClassName( (modalString + " " + showClass) )[0],
          overlay = ops.backdrop ? createModalOverlay() : null;

    var overlayDelay = 0;

    if ( currentOpen && currentOpen !== modal ) {
      currentOpen.modalTrigger && currentOpen.modalTrigger[modalComponent].hide();
      currentOpen[modalComponent] && currentOpen[modalComponent].hide();
    }

    if ( overlay // overlay exists
      && !currentOpen // no open modal found 
      && !hasClass( overlay, showClass ) // overlay not visible
    ) {
      overlay.offsetWidth; // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration( overlay );
      addClass( overlay, showClass );
    }

    !currentOpen ? setTimeout( function () { return beforeShowModal(); }, overlay && overlayDelay ? overlayDelay : 0 ) 
                  : beforeShowModal();
  };

  ModalProto.hide = function( force ) {
    if ( !hasClass( modal, showClass ) && !isAnimating ) { return }

    hideModalEvent.relatedTarget = relatedTarget;
    modal.dispatchEvent( hideModalEvent );
    if ( hideModalEvent.defaultPrevented ) { return }

    isAnimating = true;
    removeClass( modal, showClass );
    modal.setAttribute( ariaHidden, true );

    hasFade && force !== 1 // modal should fade AND not forced to hide
      ? emulateTransitionEnd( modal, function hideWrap() { triggerModalHide(); } ) // then wait for overlay to fade then triggerModalHide
      : triggerModalHide( force ); // OR triggerModalHide on force or no fade class present
  };

  ModalProto.update = function() {
    hasClass( modal, showClass ) && setModalScrollbar();
  };

  ModalProto.dispose = function() {
    this.hide(1); // forced call

    if ( element ) {
      delete modal.modalTrigger;
      toggleModalHandler( element );
    }
    
    // remove association
    delete (element||modal)[modalComponent];
  };

  return new Modal( modalElement, modalOptions )
}


var modalInit = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal
};

var ariaDescribedBy = 'aria-describedby';

var tipClassPositions = {top:'top', bottom:'bottom', left:'start', right:'end'};

function isVisibleTip( tip, container ){
  return container.contains( tip )
}

function isMedia(element){
  return [SVGElement,HTMLImageElement,HTMLVideoElement]
  .some( function (mediaType) { return element instanceof mediaType; } )
}

function styleTip(link,element,position,parent,e) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
  var tipClasses = /\b(top|bottom|start|end)+/,
      elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
      windowWidth = ( document.documentElement.clientWidth || document.body.clientWidth ),
      windowHeight = ( document.documentElement.clientHeight || document.body.clientHeight ),
      rect = link.getBoundingClientRect(),
      scroll = parent === document.body 
              ? { x: window.pageXOffset, y: window.pageYOffset } 
              : { x: parent.offsetLeft + parent.scrollLeft, y: parent.offsetTop + parent.scrollTop },
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top },
      isPopover = element.classList.contains( 'popover' ),
      arrow = element.getElementsByClassName( ((isPopover?'popover':'tooltip') + "-arrow") )[0],
      topPosition, leftPosition,
      arrowTop, arrowLeft, arrowWidth, arrowHeight,
      // check position
      halfTopExceed = rect.top + linkDimensions.h/2 - elementDimensions.h/2 < 0,
      halfLeftExceed = rect.left + linkDimensions.w/2 - elementDimensions.w/2 < 0,
      halfRightExceed = rect.left + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
      halfBottomExceed = rect.top + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
      topExceed = rect.top - elementDimensions.h < 0,
      leftExceed = rect.left - elementDimensions.w < 0,
      bottomExceed = rect.top + elementDimensions.h + linkDimensions.h >= windowHeight,
      rightExceed = rect.left + elementDimensions.w + linkDimensions.w >= windowWidth,
      arrowAdjust = 0;

  // recompute position
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  position = ( position === 'left' || position === 'right' ) && leftExceed && rightExceed ? 'top' : position; 
  position = position === 'top' && topExceed ? 'bottom' : position;
  position = position === 'bottom' && bottomExceed ? 'top' : position;
  position = position === 'left' && leftExceed ? 'right' : position;
  position = position === 'right' && rightExceed ? 'left' : position;

  // update tooltip/popover class
  element.className.indexOf(position) === -1 
    && ( element.className = element.className.replace( tipClasses, tipClassPositions[position] ) );

  // we check the computed width & height and update here
  arrowWidth = arrow ? arrow.offsetWidth : 0;
  arrowHeight = arrow ? arrow.offsetHeight : 0;
  arrowAdjust = ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );

  // apply styling to tooltip / popover
  if ( position === 'left' || position === 'right' ) { // secondary|side positions
    if ( position === 'left' ) { // LEFT
      leftPosition = rect.left + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 );
    } else { // RIGHT
      leftPosition = rect.left + scroll.x + linkDimensions.w;
    }

    // adjust top and arrow
    if ( halfTopExceed ) {
      topPosition = rect.top + scroll.y;
      arrowTop = linkDimensions.h/2 - arrowWidth;
    } else if ( halfBottomExceed ) {
      topPosition = rect.top + scroll.y - elementDimensions.h + linkDimensions.h;
      arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth;
    } else {
      topPosition = rect.top + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
      arrowTop = elementDimensions.h/2 - ( isPopover ? arrowHeight*0.9 : arrowHeight/2 );
    }
    arrowLeft = null;

  } else if ( position === 'top' || position === 'bottom' ) {

    if ( e && isMedia(link) ) {

      if ( position === 'top' ) {
        topPosition = e.pageY - elementDimensions.h - ( isPopover ? arrowWidth : arrowHeight );
      } else {
        topPosition = e.pageY + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (e.clientX - elementDimensions.w/2 < 0) {
        leftPosition = 0;
        // arrowLeft = e.pageX - arrowWidth/2
        arrowLeft = e.pageX - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else if (e.clientX + elementDimensions.w * 0.51 > windowWidth) {
        leftPosition = windowWidth - elementDimensions.w * 1.009;
        // arrowLeft = elementDimensions.w - (windowWidth - e.pageX) - arrowWidth/2
        arrowLeft = elementDimensions.w - (windowWidth - e.pageX) - arrowAdjust;
      } else {
        leftPosition = e.pageX - elementDimensions.w/2;
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
        // arrowLeft = elementDimensions.w/2 - arrowWidth/2
      }

    } else {

      if ( position === 'top' ) {
        topPosition =  rect.top + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 );
      } else { // BOTTOM
        topPosition = rect.top + scroll.y + linkDimensions.h;
      }

      // adjust left | right and also the arrow
      if ( halfLeftExceed ) {
        leftPosition = 0;
        arrowLeft = rect.left + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else if ( halfRightExceed ) {
        leftPosition = windowWidth - elementDimensions.w;
        arrowLeft = elementDimensions.w - ( windowWidth - rect.left ) + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else {
        leftPosition = rect.left + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      }
    }
    arrowTop = null;

  }

  // apply style to tooltip/popover and its arrow
  element.style.top = topPosition + 'px';
  element.style.left = leftPosition + 'px';

  // update arrow position or clear side
  arrowTop !== null ? (arrow.style.top = arrowTop + 'px') : (arrow.style.top = '');
  arrowLeft !== null ? (arrow.style.left = arrowLeft + 'px') : (arrow.style.left = '');
}

var bsnUID = 1;

// popover, tooltip, scrollspy need a unique id
function getUID( element, key ){
  return element[key] || (bsnUID++)
}

// POPOVER PRIVATE GC
// ==================
var popoverString = 'popover',
    popoverComponent = 'Popover',
    popoverSelector = "[" + dataBsToggle + "=\"" + popoverString + "\"],[data-tip=\"" + popoverString + "\"]",
    popoverDefaultOptions = {
      template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', // string
      title: null, // string
      content: null, // string
      sanitizeFn: null, // function
      customClass: null, // string
      dismissible: false, // boolean
      animation: true, // boolean
      trigger: 'hover', // string
      placement: 'top', // string
      delay: 200 // number
    };


// POPOVER SCOPE
// =============
function Popover( popoverElement, popoverOptions ){

  // POPOVER PRIVATE GC
  // ==================
  var isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // popoverArrowClass = `${popoverString}-arrow`,
      popoverHeaderClass = popoverString + "-header",
      popoverBodyClass = popoverString + "-body",

      // POPOVER CUSTOM EVENTS
      // =====================
      showPopoverEvent = bootstrapCustomEvent( ("show.bs." + popoverString) ),
      shownPopoverEvent = bootstrapCustomEvent( ("shown.bs." + popoverString) ),
      hidePopoverEvent = bootstrapCustomEvent( ("hide.bs." + popoverString) ),
      hiddenPopoverEvent = bootstrapCustomEvent( ("hidden.bs." + popoverString) );


  var self, 
      element,
      popoverID,
      placementClass,
      popover = null,
      ops = {},
      enabled = true,
      timer=  null,
      // close btn for dissmissible popover
      popoverCloseButton = '<button type="button" class="btn-close"></button>';


  // POPOVER EVENT HANDLERS
  // ======================
  function dismissiblePopoverHandler(e) {
    if ( e.target === queryElement( '.btn-close', popover ) ) {
      self.hide();
    }
  }

  function updatePopover(e) {
    styleTip( element, popover, ops.placement, ops.container, e );
  }

  function popoverForceFocus() {
    element.focus();
  }

  function popoverShowHandler() {
    self.show();
  }

  function popoverHideHandler() {
    self.hide();
  }

  function popoverClickHandler() {
    self.toggle();
  }

  function popoverTouchHandler(e){
    var eventTarget = e.target;

    if ( popover && popover.contains( eventTarget ) // popover includes touch target
      || eventTarget === element // OR touch target is element
      || element.contains( eventTarget ) ) // OR element includes touch target
    ; else {
      self.hide();
    }
  }

  function disposeComplete() {
    togglePopoverHandlers();
    delete element[popoverComponent];
  }


  // POPOVER PRIVATE METHODS
  // =======================
  function removePopover() {
    element.removeAttribute( ariaDescribedBy );
    ops.container.removeChild( popover );
    timer = null;
  }

  function createPopover() {
    var titleString = ops.title,
        contentString = ops.content;

    // fixing #233
    titleString = !!titleString ? titleString.trim() : null;
    contentString = !!contentString ? contentString.trim() : null;

    // sanitize title && content
    if ( ops.sanitizeFn ) {
      titleString = titleString ? ops.sanitizeFn( titleString ) : null;
      contentString = contentString ? ops.sanitizeFn( contentString ) : null;
      ops.template = ops.template ? ops.sanitizeFn( ops.template ) : null;
      popoverCloseButton = ops.sanitizeFn( popoverCloseButton );
    }    

    popover = document.createElement( 'div' );

    // set id and aria-describedby
    popover.setAttribute( 'id', popoverID );
    element.setAttribute( ariaDescribedBy, ("#" + popoverID) );

    // load template
    var popoverTemplate = document.createElement( 'div' );
    popoverTemplate.innerHTML = ops.template.trim();
    popover.className = popoverTemplate.firstChild.className;
    popover.innerHTML = popoverTemplate.firstChild.innerHTML;

    var popoverHeader = queryElement( ("." + popoverHeaderClass), popover ),
        popoverBody = queryElement( ("." + popoverBodyClass), popover );

    // set dismissible button
    if ( ops.dismissible ) {
      titleString = titleString ? titleString + popoverCloseButton : titleString;
      contentString = titleString === null ? + popoverCloseButton : contentString;
    }

    // fill the template with content from data attributes
    titleString && popoverHeader && ( popoverHeader.innerHTML = titleString.trim() );
    contentString && popoverBody && ( popoverBody.innerHTML = contentString.trim() );

    // set popover animation and placement 
    !hasClass( popover, popoverString ) && addClass( popover, popoverString );
    ops.animation && !hasClass( popover, fadeClass ) && addClass( popover, fadeClass );
    ops.customClass && !hasClass( popover, ops.customClass ) && addClass( popover, ops.customClass );
    !hasClass( popover, placementClass ) && addClass( popover, placementClass );

  }

  function showPopover() {
    !hasClass( popover, showClass ) && ( addClass( popover, showClass ) );
  }

  function togglePopoverHandlers( action ) {
    action = action ? addEventListener : removeEventListener;

    if ( 'hover' === ops.trigger ) {
      element[action]( 'mousedown', popoverShowHandler );
      element[action]( 'mouseenter', popoverShowHandler );
      isMedia(element) && element[action]( 'mousemove', updatePopover, passiveHandler );
      !ops.dismissible && element[action]( 'mouseleave', popoverHideHandler ); // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
    } else if ( 'click' === ops.trigger ) {
      element[action]( ops.trigger, popoverClickHandler );
    } else if ( 'focus' === ops.trigger ) {
      isIphone && element[action]( 'click', popoverForceFocus );
      element[action]( 'focusin', popoverShowHandler );
    }
  }

  function dismissHandlerToggle( action ) {
    action = action ? addEventListener : removeEventListener;

    if ( ops.dismissible ) {
      document[action]( 'click', dismissiblePopoverHandler );
    } else {
      'focus' === ops.trigger && element[action]( 'focusout', popoverHideHandler );
      'hover' === ops.trigger && document[action]( 'touchstart', popoverTouchHandler, passiveHandler );
    }

    if ( !isMedia(element) ) {
      window[action]( 'scroll', updatePopover, passiveHandler );
      window[action]( 'resize', updatePopover, passiveHandler );
    }
  }

  function popoverShowTrigger() {
    dismissHandlerToggle( 1 );
    element.dispatchEvent( shownPopoverEvent );
  }

  function popoverHideTrigger(e) {
    dismissHandlerToggle();
    removePopover();
    element.dispatchEvent( hiddenPopoverEvent );
  }


  // POPOVER DEFINITION
  // ==================
  var Popover = function Popover( target, options ){

    // bind
    self = this;

    // set instance options
    options = options || {};

    // initialization element
    element = queryElement( target );

    // reset previous instance
    element[popoverComponent] && element[popoverComponent].dispose();

    // maybe the element is inside a modal
    var modal = element.closest( '.modal' ),

        // OR maybe the element is inside a fixed navbar
        navbarFixed = element.closest( ("." + fixedTopClass) ) 
                   || element.closest( ("." + fixedBottomClass) );

    // set default container option appropriate for the context
    popoverDefaultOptions.container = modal || navbarFixed || document.body;

    // set instance options
    ops = normalizeOptions( element, popoverDefaultOptions, options );

    // invalidate when no content is set
    if ( !ops.content ) { return }

    // set default popover class
    placementClass = "bs-" + popoverString + "-" + (tipClassPositions[ops.placement]);

    // set unique ID for aria-describedby
    popoverID = popoverString + "-" + (getUID( element ));

    // crate popover
    createPopover();

    // attach event listeners
    togglePopoverHandlers( 1 );

    // associate target to init object
    element[popoverComponent] = self;
  };


  // POPOVER PUBLIC METHODS
  // ======================
  var PopoverProto = Popover.prototype;

  PopoverProto.toggle = function() {
    !isVisibleTip( popover, ops.container ) ? self.show() : self.hide();
  };

  PopoverProto.show = function() {
    clearTimeout( timer );

    timer = setTimeout( function () {
      if ( !isVisibleTip( popover, ops.container ) ) {
        
        element.dispatchEvent( showPopoverEvent );
        if ( showPopoverEvent.defaultPrevented ) { return }

        //append to the container
        ops.container.appendChild( popover );

        updatePopover();
        showPopover();

        ops.animation 
          ? emulateTransitionEnd( popover, popoverShowTrigger )
          : popoverShowTrigger();
      }
    }, 17 );
  };

  PopoverProto.hide = function() {
    clearTimeout( timer );

    timer = setTimeout( function () {
      if ( isVisibleTip( popover, ops.container ) && hasClass( popover, showClass ) ) {
        element.dispatchEvent( hidePopoverEvent );
        if ( hidePopoverEvent.defaultPrevented ) { return }

        removeClass( popover, showClass );

        ops.animation 
          ? emulateTransitionEnd( popover, popoverHideTrigger  ) 
          : popoverHideTrigger();
      }
    }, ops.delay + 50 );
  };

  PopoverProto.enable = function() {
    if ( !enabled ) {
      togglePopoverHandlers(1);
      enabled = !enabled;
    }
  };

  PopoverProto.disable = function() {
    if ( enabled ) {
      if ( isVisibleTip( popover, ops.container ) && ops.animation ) {
        self.hide();

        setTimeout(
          togglePopoverHandlers, 
          getElementTransitionDuration( popover ) + ops.delay + 17 );
      } else {
        togglePopoverHandlers();
      }
      enabled = !enabled;
    }
  };

  PopoverProto.toggleEnabled = function() {
    !enabled ? self.enable() : self.disable();
  };

  PopoverProto.dispose = function() {
    if ( ops.animation && isVisibleTip( popover, ops.container ) ){
      ops.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd( popover, disposeComplete );
    } else {
      disposeComplete();
    }
  };

  return new Popover( popoverElement, popoverOptions )
}


var popoverInit = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover
};

// SCROLLSPY PRIVATE GC
// ====================
var scrollspyString = 'scrollspy',
    scrollspyComponent = 'ScrollSpy',
    scrollspySelector = '[data-bs-spy="scroll"]';

var scrollHandlerQueue = [];


// SCROLLSPY SCOPE
// ===============
function ScrollSpy( scrollSpyElement, scrollSpyOptions ){


  // SCROLLSPY CUSTOM EVENT
  // ======================
  var activateScrollSpy = bootstrapCustomEvent( ("activate.bs." + scrollspyString) );

  var elementID,
      self,
      element,
      offset,
      itemsLength = 0,
      items = [],
      offsets = [],
      scrollTarget,
      spyTarget,
      isWindow,
      activeItem,
      scrollHeight,
      maxScroll,
      scrollTop;


  // SCROLLSPY PRIVATE METHODS
  // =========================
  function updateSpyTargets(){
    var links = spyTarget.getElementsByTagName( 'A' );

    scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop;

    // only update items/offsets once or with each mutation
    if ( itemsLength !== links.length || getScrollHeight( scrollTarget ) !== scrollHeight ) {
      var href, targetItem, rect;

      // reset arrays & update 
      items = [];
      offsets = [];
      scrollHeight = getScrollHeight( scrollTarget );
      maxScroll = scrollHeight - getOffsetHeight();

      Array.from( links ).map( function (link) {
        href = link.getAttribute( 'href' );
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href );

        if ( targetItem ) {
          items.push( link );
          rect = targetItem.getBoundingClientRect();        
          offsets.push( ( isWindow ? rect.top + scrollTop : targetItem.offsetTop ) - offset );
        }
      });
      itemsLength = items.length;
    }
  }

  function getScrollHeight( scrollTarget ){
    return scrollTarget.scrollHeight || Math.max( 
      document.body.scrollHeight, 
      document.documentElement.scrollHeight)
  }

  function getOffsetHeight(){
    return !isWindow ? element.getBoundingClientRect().height : window.innerHeight
  }

  function clear( spyTarget ){
    Array.from( spyTarget.getElementsByTagName( 'A' ) ).map( function (item) { return hasClass( item, activeClass ) 
      && removeClass( item, activeClass ); } );
  }

  function activate( item ){

    clear( spyTarget );
    activeItem = item;
    addClass( item, activeClass );

    // activate all parents
    var parents = [];
    while (item.parentNode !== document.body) {
      item = item.parentNode
      ;[ 'dropdown-menu', 'nav' ].some( function (c) { return hasClass( item, c ); } ) && parents.push(item);
    }

    parents.map( function (menuItem) {
      var parentLink = menuItem.previousElementSibling;

      if ( parentLink && !hasClass( parentLink, activeClass ) ) {
        addClass( parentLink, activeClass );
      }      
    });

    // update relatedTarget and dispatch
    activateScrollSpy.relatedTarget = item;
    element.dispatchEvent( activateScrollSpy );
  }

  function toggleSpyHandlers( plus ) {
    var action = plus ? addEventListener : removeEventListener,
        scrollIdx = scrollHandlerQueue.indexOf( scrollHandlerQueue.find( function (s) { return s.id === elementID; } ) ),
        listener = { id: elementID, self: self };

    !plus && scrollIdx > -1 && scrollHandlerQueue.splice( scrollIdx, 1 );
        
    // window should always have a single scroll listener
    if ( !isWindow || plus && !scrollHandlerQueue.length || !plus ) {
      scrollTarget[action]( 'scroll', scrollUpdateHandler, passiveHandler );
    }
    
    plus && scrollHandlerQueue.push( listener );
  }


  // SCROLLSPY EVENT HANDLERS
  // ========================
  function scrollUpdateHandler(){
    scrollHandlerQueue.map( function (i) { return i.self.refresh(); } );
  }

  // SCROLLSPY DEFINITION
  // ====================
  var ScrollSpy = function ScrollSpy( target, options ){

    // bind
    self = this;

    // set options
    options = options || {};

    // initialization element, the element we spy on
    element = queryElement( target );

    // reset previous instance
    element[scrollspyComponent] && element[scrollspyComponent].dispose();

    // event targets, constants   
    // JavaScript API options > DATA API
    spyTarget = queryElement( options.target ) || getTargetElement( element );
    // determine which is the real scrollTarget
    scrollTarget = element.clientHeight < element.scrollHeight ? element : window;

    if ( !spyTarget ) { return }
      
    offset = +(options.offset || element.getAttribute( 'data-bs-offset' )) || 10;
    isWindow = scrollTarget === window;
    elementID = getUID( element );

    // prevent adding event handlers multiple times
    toggleSpyHandlers( 1 );

    self.refresh();

    // associate target with init object
    element[scrollspyComponent] = self;
  };


  // SCROLLSPY PUBLIC METHODS
  // ========================
  var ScrollSpyProto = ScrollSpy.prototype;

  ScrollSpyProto.refresh = function() {

    updateSpyTargets();
    
    if ( scrollTop >= maxScroll ) {
      var newActiveItem = items[itemsLength - 1];

      if ( activeItem !== newActiveItem ) {
        activate( newActiveItem );
      }
      return
    }

    if ( activeItem && scrollTop < offsets[0] && offsets[0] > 0 ) {
      activeItem = null;
      clear( spyTarget );
      return
    }

    items.map( function ( item, i ) {
      if ( activeItem !== item && scrollTop >= offsets[i] 
        && ( typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1] ) )
      {
        activate( item );
      }
    });
  };

  ScrollSpyProto.dispose = function() {
    toggleSpyHandlers();
    delete element[scrollspyComponent];
  };

  return new ScrollSpy( scrollSpyElement, scrollSpyOptions )
}


var scrollSpyInit = {
  component: scrollspyComponent,
  selector: scrollspySelector,
  constructor: ScrollSpy
};

var ariaSelected = 'aria-selected';

// TAB PRIVATE GC
// ================
var tabString = 'tab',
      tabComponent = 'Tab',
      tabSelector = "[" + dataBsToggle + "=\"" + tabString + "\"]";


// TAB SCOPE
// ================
function Tab( tabElement ){

  // TAB CUSTOM EVENTS
  // =================
  var showTabEvent = bootstrapCustomEvent( ("show.bs." + tabString) ),
        shownTabEvent = bootstrapCustomEvent( ("shown.bs." + tabString) ),
        hideTabEvent = bootstrapCustomEvent( ("hide.bs." + tabString) ), 
        hiddenTabEvent = bootstrapCustomEvent( ("hidden.bs." + tabString) );


var self, 
    element,
    next,
    nextContent,
    nextHeight,
    activeTab,
    activeContent,
    nav,
    dropdown,
    tabContent,
    containerHeight,
    equalContents;
  
  
  // TAB PRIVATE METHODS
  // ===================
  function triggerTabEnd() {
    tabContent.style.height = '';
    removeClass( tabContent, collapsingClass );
    nav.isAnimating = false;
  }
  
  function triggerTabShow() {
    if ( tabContent ) { // height animation
      if ( equalContents ) {
        triggerTabEnd();
      } else {
        setTimeout( function () { // enables height animation
          tabContent.style.height = nextHeight + "px"; // height animation
          tabContent.offsetWidth;
          emulateTransitionEnd( tabContent, triggerTabEnd);
        }, 50 );
      }
    } else {
      nav.isAnimating = false;
    }
    shownTabEvent.relatedTarget = activeTab;
    next.dispatchEvent( shownTabEvent );
  }
  
  function triggerTabHide() {
  
    if ( tabContent ) {
      activeContent.style.float = 'left';
      nextContent.style.float = 'left';
      containerHeight = activeContent.scrollHeight;
    }
  
    // update relatedTarget and dispatch event
    showTabEvent.relatedTarget = activeTab;
    hiddenTabEvent.relatedTarget = next;
    next.dispatchEvent( showTabEvent );
    if ( showTabEvent.defaultPrevented ) { return }
      
    addClass( nextContent, activeClass );
    removeClass( activeContent, activeClass );
  
    if ( tabContent ) {
      nextHeight = nextContent.scrollHeight;
      equalContents = nextHeight === containerHeight;
      addClass( tabContent, collapsingClass );
      tabContent.style.height = containerHeight + "px"; // height animation
      tabContent.offsetHeight;
      activeContent.style.float = '';
      nextContent.style.float = '';
    }
  
    if ( hasClass( nextContent, fadeClass ) ) {
      setTimeout( function () {
        addClass( nextContent, showClass );
        emulateTransitionEnd( nextContent, function showWrap() {
          triggerTabShow();
        });
      }, 20 );
    } else { triggerTabShow(); }
  
    activeTab.dispatchEvent( hiddenTabEvent );
  }
  
  function getActiveTab() {
    var activeTabs = nav.getElementsByClassName( activeClass ), activeTab;
  
    if ( activeTabs.length === 1 
      && !dropdownClasses.some( function (c) { return hasClass( activeTabs[0].parentNode, c ); } ) )
    {
      activeTab = activeTabs[0];
    } else if ( activeTabs.length > 1 ) {
      activeTab = activeTabs[activeTabs.length-1];
    }
    return activeTab
  }
  
  function getActiveTabContent() { 
    return queryElement(getActiveTab().getAttribute('href')) 
  }
  
  function toggleTabHandler( action ) {
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', tabClickHandler );
  }
  
  
  // TAB EVENT HANDLER
  // ================= 
  function tabClickHandler(e) {  
    e.preventDefault();
    next = e.currentTarget;
    !nav.isAnimating && self.show();
  }
  
  
  // TAB DEFINITION
  // ==============
  var Tab = function Tab( target ) {
  
    // bind
    self = this;
  
    // initialization element
    element = queryElement( target );
  
    // reset previous instance
    element[tabComponent] && element[tabComponent].dispose();
  
    // event targets
    nav = element.closest( '.nav' );
    dropdown = nav && queryElement( ("." + (dropdownClasses[0]) + "-toggle"), nav );
    activeContent = getActiveTabContent();
    tabContent = supportTransition && activeContent.closest( '.tab-content' );
    containerHeight = activeContent.scrollHeight;
  
    // set default animation state
    nav.isAnimating = false;
  
    // add event listener
    toggleTabHandler( 1 );
  
    // associate target with init object
    element[tabComponent] = this;
  };
  
  
  // TAB PUBLIC METHODS
  // ==================
  var TabProto = Tab.prototype;
  
  TabProto.show = function() { // the tab we clicked is now the next tab
  
    if ( !hasClass( next, activeClass ) ) {
      nextContent = queryElement( next.getAttribute( 'href' ) ); // this is the actual object, the next tab content to activate
      activeTab = getActiveTab();
      activeContent = getActiveTabContent();
  
      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = next;
      activeTab.dispatchEvent( hideTabEvent );
      if ( hideTabEvent.defaultPrevented ) { return }
  
      nav.isAnimating = true;
      removeClass( activeTab, activeClass );
      activeTab.setAttribute( ariaSelected,'false' );
      addClass( next, activeClass );
      next.setAttribute( ariaSelected, 'true' );
  
      if ( dropdown ) {
        if ( !hasClass( element.parentNode, dropdownMenuClass ) ) {
          hasClass( dropdown, activeClass ) && removeClass( dropdown, activeClass );
        } else {
          !hasClass( dropdown, activeClass ) && addClass( dropdown, activeClass );
        }
      }
  
      if ( hasClass( activeContent, fadeClass ) ) {
        removeClass( activeContent, showClass );
        emulateTransitionEnd( activeContent, triggerTabHide );
      } else { 
        triggerTabHide(); 
      }
    }
  };
  
  TabProto.dispose = function() { 
    toggleTabHandler();
    delete element[tabComponent];
  };

  return new Tab( tabElement )
}


var tabInit = {
  component: tabComponent,
  selector: tabSelector,
  constructor: Tab
};

// TOAST PRIVATE GC
// ================
var toastString = 'toast',
      toastComponent = 'Toast',
      toastSelector = '[data-bs-dismiss="toast"]';


// TOAST SCOPE
// ===========
function Toast( toastElement, toastOptions ){


  // TOAST PRIVATE GC
  // ================
  var showingClass = 'showing',
      hideClass = 'hide',
      toastDefaultOptions = {
        animation: true,
        autohide: true,
        delay: 500
      },

      // TOAST CUSTOM EVENTS
      // ===================
      showToastEvent = bootstrapCustomEvent( ("show.bs." + toastString) ),
      hideToastEvent = bootstrapCustomEvent( ("hide.bs." + toastString) ),
      shownToastEvent = bootstrapCustomEvent( ("shown.bs." + toastString) ),
      hiddenToastEvent = bootstrapCustomEvent( ("hidden.bs." + toastString) );


  var self, element, toast, timer = null, ops = {};

  // TOAST PRIVATE METHODS
  // =====================
  function showToastComplete() {
    if ( !ops.animation ) {
      removeClass( toast, showingClass );
      addClass( toast, showClass );
    }
  
    toast.dispatchEvent( shownToastEvent );
    ops.autohide && self.hide();
  }
  
  function hideToastComplete() {
    addClass( toast, hideClass );
    toast.dispatchEvent( hiddenToastEvent );
  }
  
  function closeToast() {
    removeClass( toast, showClass );
    if ( ops.animation ) {
      toast.offsetWidth; // force reflow
      emulateTransitionEnd( toast, hideToastComplete );
    } else {
      hideToastComplete();
    }
  }
  
  function openToast() {
    removeClass( toast, hideClass );

    if ( ops.animation ) {
      toast.offsetWidth; // force reflow
      addClass( toast, showingClass );
      addClass( toast, showClass );

      emulateTransitionEnd( toast, showToastComplete);
    } else {
      showToastComplete();
    }
  }
  
  function toggleToastHandler( action ){
    action = action ? addEventListener : removeEventListener;
    element[action]( 'click', toastClickHandler );
  }
  
  
  // TOAST EVENT HANDLERS
  // ====================
  function toastClickHandler(){
    self.hide();
  }

  function completeDispose() {
    clearTimeout( timer );
    toggleToastHandler();
    delete element[toastComponent];
  }
  
  
  // TOAST DEFINITION
  // ================
  var Toast = function Toast( target, options ) {
  
    // bind
    self = this;

    // set options
    options = options || {};
  
    // initialization element
    element = queryElement( target );
    toast = element.closest( ("." + toastString) );
  
    // reset previous instance
    element[toastComponent] && element[toastComponent].dispose();

    // set options
    ops = normalizeOptions( element, toastDefaultOptions, options );
      
    // add event listener
    toggleToastHandler( 1 );
  
    // associate targets to init object
    element[toastComponent] = self;    
  };
  
  
  // TOAST PUBLIC METHODS
  // ====================
  var ToastProto = Toast.prototype;
  
  ToastProto.show = function() {  
    if ( toast && hasClass( toast, hideClass ) ) {
      toast.dispatchEvent( showToastEvent );
      if ( showToastEvent.defaultPrevented ) { return }
  
      addClass( toast, fadeClass );
      clearTimeout( timer );
      timer = setTimeout( function () { return openToast(); }, 10);
    }
  };
  
  ToastProto.hide = function( noTimer ) {
  
    if ( toast && hasClass( toast, showClass ) ) {
      toast.dispatchEvent( hideToastEvent );
      if ( hideToastEvent.defaultPrevented ) { return }
  
      clearTimeout( timer );
      timer = setTimeout( 
        closeToast, 
        noTimer ? 10 : ops.delay );
    }
  };
  
  ToastProto.dispose = function() {
  
    self.hide();
  
    ops.animation 
      ? emulateTransitionEnd( toast, completeDispose ) 
      : completeDispose();
  };

  return new Toast( toastElement, toastOptions )
}


var toastInit = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast
};

var dataOriginalTitle = 'data-original-title';

// TOOLTIP PRIVATE GC
// ==================
var tooltipString = 'tooltip',
    tooltipComponent = 'Tooltip',
    tooltipSelector = "[" + dataBsToggle + "=\"" + tooltipString + "\"],[data-tip=\"" + tooltipString + "\"]";


function Tooltip( tooltipElement, tooltipOptions ){

  // TOOLTIP PRIVATE GC
  // ==================
  var titleAttr = 'title',
      // tooltipArrowClass = `${tooltipString}-arrow`,
      tooltipInnerClass = tooltipString + "-inner",
      tooltipDefaultOptions = {
        title: null,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        placement: 'top',
        animation: true,
        customClass: null,
        delay: 200,
        sanitizeFn: null
      },
  
      // TOOLTIP CUSTOM EVENTS
      // =====================
      showTooltipEvent = bootstrapCustomEvent( ("show.bs." + tooltipString) ),
      shownTooltipEvent = bootstrapCustomEvent( ("shown.bs." + tooltipString) ),
      hideTooltipEvent = bootstrapCustomEvent( ("hide.bs." + tooltipString) ),
      hiddenTooltipEvent = bootstrapCustomEvent( ("hidden.bs." + tooltipString) );
  
  var self,
      element,
      tooltipID,
      tooltip = null,
      timer = null,
      enabled = true,
      placementClass,
      ops = {};


  // TOOLTIP PRIVATE METHODS
  // ======================= 
  function removeTooltip() {  
    element.removeAttribute( ariaDescribedBy );
    ops.container.removeChild( tooltip );
    timer = null;
  }
  
  function createTooltip() {  
    var titleString = ops.title.trim(); // read the title again
  
    // sanitize stuff
    if ( ops.sanitizeFn ) {
      titleString = ops.sanitizeFn( titleString );
      ops.template = ops.sanitizeFn( ops.template );
    }
  
    if ( !titleString ) { return } // invalidate, maybe markup changed
  
    // create tooltip
    tooltip = document.createElement( 'div' );
    // set aria
    tooltip.setAttribute( 'id', tooltipID);
    element.setAttribute( ariaDescribedBy, ("#" + tooltipID));
  
    // set markup

    var tooltipMarkup = document.createElement( 'div' );
    tooltipMarkup.innerHTML = ops.template.trim();

    tooltip.className = tooltipMarkup.firstChild.className;
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

    queryElement( ("." + tooltipInnerClass), tooltip ).innerHTML = titleString;

    // set class and role attribute
    tooltip.setAttribute('role', tooltipString );
    // set classes
    !hasClass( tooltip, tooltipString ) && addClass( tooltip, tooltipString );
    ops.animation && !hasClass( tooltip, fadeClass ) && addClass( tooltip, fadeClass );
    ops.customClass && !hasClass( tooltip, ops.customClass ) && addClass( tooltip, ops.customClass );
    !hasClass( tooltip, placementClass ) && addClass( tooltip, placementClass );
  
  }
  
  // TOOLTIP EVENT HANDLERS
  // ======================
  function updateTooltip(e) { 
    styleTip( element, tooltip, ops.placement, ops.container, e );
  }
  
  function showTooltip() {
    !hasClass( tooltip, showClass ) && addClass( tooltip, showClass );
  }
  
  function tooltipTouchHandler(e){
    var eventTarget = e.target;
  
    if ( tooltip.contains( eventTarget ) || eventTarget === element || element.contains( eventTarget ) ) ; else {
      self.hide();
    }
  }
  
  function openTooltipHandler(){
    self.show();
  }
  
  function closeTooltipHandler(){
    self.hide();
  }

  function disposeComplete(){
    toggleTooltipHandlers();
    element.hasAttribute( dataOriginalTitle ) && toggleTooltipTitle();
    delete element[tooltipComponent];
  }
  
  function toggleTooltipAction( action ){
    action = action ? addEventListener : removeEventListener;

    document[action]( 'touchstart', tooltipTouchHandler, passiveHandler );
  
    if ( !isMedia( element ) ) {
      window[action]( 'scroll', updateTooltip, passiveHandler );
      window[action]( 'resize', updateTooltip, passiveHandler );
    }
  }
  
  function tooltipShownAction() {
    toggleTooltipAction( 1 );
    element.dispatchEvent( shownTooltipEvent );
  }
  
  function tooltipHiddenAction() {
    toggleTooltipAction();
    removeTooltip();
    element.dispatchEvent( hiddenTooltipEvent );
  }
  
  function toggleTooltipHandlers( action ) {
    action = action ? addEventListener : removeEventListener;
  
    isMedia(element) && element[action]( 'mousemove', updateTooltip, passiveHandler );
    element[action]( 'mousedown', openTooltipHandler );
    element[action]( 'mouseenter', openTooltipHandler );
    element[action]( 'mouseleave', closeTooltipHandler );
  }
  
  function toggleTooltipTitle( content ){
    var titleAtt = [ dataOriginalTitle, titleAttr ]; // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  
    element.setAttribute( titleAtt[ content ? 0 : 1 ], 
      ( content ? content : element.getAttribute( titleAtt[0] ) ) );
    element.removeAttribute( titleAtt[ content ? 1 : 0 ] );
  }
  
  
  // TOOLTIP DEFINITION
  // ==================
  var Tooltip = function Tooltip( target, options ) {
  
    // bind
    self = this;

    // set options
    options = options || {};
    
    // initialization element
    element = queryElement( target );
    
    // set private properties unique ID key
    element[tooltipComponent] && element[tooltipComponent].dispose();
    
    // maybe the element is inside a modal
    var modal = element.closest( '.modal' ),
  
        // maybe the element is inside a fixed navbar
        navbarFixed = element.closest( ("." + fixedTopClass) ) || element.closest( ("." + fixedBottomClass) );

    // set the element's title as the default title to validate
    tooltipDefaultOptions.title = element.getAttribute( titleAttr );
    // set default container option appropriate for the context
    tooltipDefaultOptions.container = modal || navbarFixed || document.body;

    // set instance options
    ops = normalizeOptions( element, tooltipDefaultOptions, options );

    // invalidate
    if ( !ops.title ) { return }

    tooltipID = tooltipString + "-" + (getUID( element ));
    placementClass = "bs-" + tooltipString + "-" + (tipClassPositions[ops.placement]);
    
    // set title attributes and add event listeners
    element.hasAttribute( titleAttr ) && toggleTooltipTitle( ops.title );

    // create tooltip here
    createTooltip();

    // attach events
    toggleTooltipHandlers( 1 );
    
    // associate target to init object
    element[tooltipComponent] = self;
  };
  
  
  // TOOLTIP PRIVATE METHODS
  // =======================
  var TooltipProto = Tooltip.prototype;
  
  TooltipProto.show = function() {
  
    clearTimeout( timer );
    timer = setTimeout( function () {
      if ( !isVisibleTip( tooltip, ops.container ) ) {
        element.dispatchEvent( showTooltipEvent);
        if ( showTooltipEvent.defaultPrevented ) { return }

        // append to container
        ops.container.appendChild( tooltip );

        updateTooltip();
        showTooltip();
        ops.animation 
          ? emulateTransitionEnd( tooltip, tooltipShownAction ) 
          : tooltipShownAction();
      }
    }, 20 );
  };
  
  TooltipProto.hide = function() {
  
    clearTimeout( timer );
    timer = setTimeout( function () {
      if ( isVisibleTip( tooltip, ops.container ) ) {
        element.dispatchEvent( hideTooltipEvent );
        if ( hideTooltipEvent.defaultPrevented ) { return }
  
        removeClass( tooltip, showClass );
        ops.animation 
          ? emulateTransitionEnd( tooltip, tooltipHiddenAction ) 
          : tooltipHiddenAction();
      }
    }, ops.delay );
  };
  
  TooltipProto.toggle = function() {
    !isVisibleTip( tooltip, ops.container ) ? self.show() : self.hide();
  };

  TooltipProto.enable = function() {
    if ( !enabled ) {
      toggleTooltipHandlers(1);
      enabled = !enabled;
    }
  };

  TooltipProto.disable = function() {
    if ( enabled ) {
      if ( !isVisibleTip( tooltip, ops.container ) && ops.animation ) {
        self.hide();

        setTimeout(
          toggleTooltipHandlers, 
          getElementTransitionDuration( tooltip ) + ops.delay + 17 );

      } else {
        toggleTooltipHandlers();
      }
      enabled = !enabled;
    }
  };

  TooltipProto.toggleEnabled = function() {
    !enabled ? self.enable() : self.disable();
  };  
  
  TooltipProto.dispose = function() {
    if ( ops.animation && isVisibleTip( tooltip, ops.container ) ){
      ops.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd( tooltip, disposeComplete );
    } else {
      disposeComplete();
    }
  };

  return new Tooltip( tooltipElement, tooltipOptions )
}


var tooltipInit = {
  component: tooltipComponent,
  selector: tooltipSelector,
  constructor: Tooltip
};

var version = "3.0.14c";

var componentsInit = {
  Alert: alertInit,
  Button: buttonInit,
  Carousel: carouselInit,
  Collapse: collapseInit,
  Dropdown: dropdownInit,
  Modal: modalInit,
  Popover: popoverInit,
  ScrollSpy: scrollSpyInit,
  Tab: tabInit,
  Toast: toastInit,
  Tooltip: tooltipInit
};

function initializeDataAPI( konstructor, collection ){
  Array.from( collection ).map( function (x) { return new konstructor(x); } );
}

function initCallback( lookUp ){
  lookUp = lookUp instanceof Element ? lookUp : document;

  for (var comp in componentsInit) {
    var ref = componentsInit[comp];
    var constructor = ref.constructor;
    var selector = ref.selector;
    initializeDataAPI( constructor, lookUp.querySelectorAll( selector ) );
  }
}

// bulk initialize all components
document.body ? initCallback() : 
document.addEventListener( 'DOMContentLoaded', function () { return initCallback(); }, { once: true });

var indexV5 = {
  Alert: Alert,
  Button: Button,
  Carousel: Carousel,
  Collapse: Collapse,
  Dropdown: Dropdown,
  Modal: Modal,
  Popover: Popover,
  ScrollSpy: ScrollSpy,
  Tab: Tab,
  Toast: Toast,
  Tooltip: Tooltip,

  initCallback: initCallback,
  Version: version
};

export default indexV5;
