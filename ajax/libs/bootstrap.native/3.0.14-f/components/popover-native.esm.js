/*!
  * Native JavaScript for Bootstrap Popover v3.0.14f (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var mouseHoverEvents = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

var mouseClickEvents = { down: 'mousedown', up: 'mouseup' };

var addEventListener = 'addEventListener';

var removeEventListener = 'removeEventListener';

var supportPassive = (function () {
  var result = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        result = true;
      }
    });
    document[addEventListener]('DOMContentLoaded', function wrap(){
      document[removeEventListener]('DOMContentLoaded', wrap, opts);
    }, opts);
  } catch (e) {}

  return result;
})();

// general event options

var passiveHandler = supportPassive ? { passive: true } : false;

var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      propertyValue = computedStyle[transitionProperty],
      durationValue = computedStyle[transitionDuration],
      durationScale = durationValue.includes('ms') ? 1 : 1000,
      duration = supportTransition && propertyValue && propertyValue !== 'none' 
               ? parseFloat( durationValue ) * durationScale : 0;

  return !isNaN(duration) ? duration : 0
}

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

function bootstrapCustomEvent( eventType, componentName, eventProperties ) {
  var OriginalCustomEvent = new CustomEvent( eventType + '.bs.' + componentName, { cancelable: true } );

  if ( typeof eventProperties !== 'undefined' ) {
    Object.keys( eventProperties ).forEach( function (key) {
      Object.defineProperty( OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent
}

function dispatchCustomEvent(customEvent){
  this && this.dispatchEvent(customEvent);
}

// Popover, Tooltip & ScrollSpy
function getScroll() { 
  return {
    y : window.pageYOffset || document.documentElement.scrollTop,
    x : window.pageXOffset || document.documentElement.scrollLeft
  }
}

function styleTip(link,element,position,parent) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
  var tipPositions = /\b(top|bottom|left|right)+/,
      elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
      windowWidth = (document.documentElement.clientWidth || document.body.clientWidth),
      windowHeight = (document.documentElement.clientHeight || document.body.clientHeight),
      rect = link.getBoundingClientRect(),
      scroll = parent === document.body ? getScroll() : { x: parent.offsetLeft + parent.scrollLeft, y: parent.offsetTop + parent.scrollTop },
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top },
      isPopover = element.classList.contains('popover'),

      arrow = element.getElementsByClassName('arrow')[0],

      halfTopExceed = rect.top + linkDimensions.h/2 - elementDimensions.h/2 < 0,
      halfLeftExceed = rect.left + linkDimensions.w/2 - elementDimensions.w/2 < 0,
      halfRightExceed = rect.left + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
      halfBottomExceed = rect.top + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
      topExceed = rect.top - elementDimensions.h < 0,
      leftExceed = rect.left - elementDimensions.w < 0,
      bottomExceed = rect.top + elementDimensions.h + linkDimensions.h >= windowHeight,
      rightExceed = rect.left + elementDimensions.w + linkDimensions.w >= windowWidth;

  // recompute position
  position = (position === 'left' || position === 'right') && leftExceed && rightExceed ? 'top' : position; // first, when both left and right limits are exceeded, we fall back to top|bottom
  position = position === 'top' && topExceed ? 'bottom' : position;
  position = position === 'bottom' && bottomExceed ? 'top' : position;
  position = position === 'left' && leftExceed ? 'right' : position;
  position = position === 'right' && rightExceed ? 'left' : position;

  var topPosition,
    leftPosition,
    arrowTop,
    arrowLeft,
    arrowWidth,
    arrowHeight;

  // update tooltip/popover class
  element.className.indexOf(position) === -1 && (element.className = element.className.replace(tipPositions,position));

  // we check the computed width & height and update here
  arrowWidth = arrow.offsetWidth; arrowHeight = arrow.offsetHeight;

  // apply styling to tooltip or popover
  if ( position === 'left' || position === 'right' ) { // secondary|side positions
    if ( position === 'left' ) { // LEFT
      leftPosition = rect.left + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 );
    } else { // RIGHT
      leftPosition = rect.left + scroll.x + linkDimensions.w;
    }

    // adjust top and arrow
    if (halfTopExceed) {
      topPosition = rect.top + scroll.y;
      arrowTop = linkDimensions.h/2 - arrowWidth;
    } else if (halfBottomExceed) {
      topPosition = rect.top + scroll.y - elementDimensions.h + linkDimensions.h;
      arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth;
    } else {
      topPosition = rect.top + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
      arrowTop = elementDimensions.h/2 - (isPopover ? arrowHeight*0.9 : arrowHeight/2);
    }
  } else if ( position === 'top' || position === 'bottom' ) { // primary|vertical positions
    if ( position === 'top') { // TOP
      topPosition =  rect.top + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 );
    } else { // BOTTOM
      topPosition = rect.top + scroll.y + linkDimensions.h;
    }
    // adjust left | right and also the arrow
    if (halfLeftExceed) {
      leftPosition = 0;
      arrowLeft = rect.left + linkDimensions.w/2 - arrowWidth;
    } else if (halfRightExceed) {
      leftPosition = windowWidth - elementDimensions.w*1.01;
      arrowLeft = elementDimensions.w - ( windowWidth - rect.left ) + linkDimensions.w/2 - arrowWidth/2;
    } else {
      leftPosition = rect.left + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
      arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth : arrowWidth/2 );
    }
  }

  // apply style to tooltip/popover and its arrow
  element.style.top = topPosition + 'px';
  element.style.left = leftPosition + 'px';

  arrowTop && (arrow.style.top = arrowTop + 'px');
  arrowLeft && (arrow.style.left = arrowLeft + 'px');
}

// POPOVER DEFINITION
// ==================

function Popover(element,options) {

  // set instance options
  options = options || {};

  // bind
  var self = this;

  // popover and timer
  var popover = null,
      timer = 0,
      isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // title and content
      titleString,
      contentString,
      // options
      ops = {};

  // DATA API
  var triggerData, // click / hover / focus
      animationData, // true / false

      placementData,
      dismissibleData,
      delayData,
      containerData,

      // close btn for dissmissible popover
      closeBtn,

      // custom events
      showCustomEvent,
      shownCustomEvent,
      hideCustomEvent,
      hiddenCustomEvent,

      // check container
      containerElement,
      containerDataElement,

      // maybe the element is inside a modal
      modal,

      // maybe the element is inside a fixed navbar
      navbarFixedTop,
      navbarFixedBottom,
      placementClass;

  // handlers
  function dismissibleHandler(e) {
    if (popover !== null && e.target === queryElement('.close',popover)) {
      self.hide();
    }
  }
  // private methods
  function getContents() {
    return {
      0 : options.title || element.getAttribute('data-title') || null,
      1 : options.content || element.getAttribute('data-content') || null
    }
  }
  function removePopover() {
    ops.container.removeChild(popover);
    timer = null; popover = null;
  }

  function createPopover() {
    titleString = getContents()[0] || null;
    contentString = getContents()[1];
    // fixing https://github.com/thednp/bootstrap.native/issues/233
    contentString = !!contentString ? contentString.trim() : null;

    popover = document.createElement('div');

    // popover arrow
    var popoverArrow = document.createElement('div');
    popoverArrow.classList.add('arrow');
    popover.appendChild(popoverArrow);

    if ( contentString !== null && ops.template === null ) { //create the popover from data attributes

      popover.setAttribute('role','tooltip');

      if (titleString !== null) {
        var popoverTitle = document.createElement('h3');
        popoverTitle.classList.add('popover-header');
        popoverTitle.innerHTML = ops.dismissible ? titleString + closeBtn : titleString;
        popover.appendChild(popoverTitle);
      }

      //set popover content
      var popoverBodyMarkup = document.createElement('div');
      popoverBodyMarkup.classList.add('popover-body');
      popoverBodyMarkup.innerHTML = ops.dismissible && titleString === null ? contentString + closeBtn : contentString;
      popover.appendChild(popoverBodyMarkup);

    } else {  // or create the popover from template
      var popoverTemplate = document.createElement('div');
      popoverTemplate.innerHTML = ops.template.trim();
      popover.className = popoverTemplate.firstChild.className;
      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

      var popoverHeader = queryElement('.popover-header',popover),
          popoverBody = queryElement('.popover-body',popover);

      // fill the template with content from data attributes
      titleString && popoverHeader && (popoverHeader.innerHTML = titleString.trim());
      contentString && popoverBody && (popoverBody.innerHTML = contentString.trim());
    }

    //append to the container
    ops.container.appendChild(popover);
    popover.style.display = 'block';
    !popover.classList.contains( 'popover') && popover.classList.add('popover');
    !popover.classList.contains( ops.animation) && popover.classList.add(ops.animation);
    !popover.classList.contains( placementClass) && popover.classList.add(placementClass);
  }
  function showPopover() {
    !popover.classList.contains('show') && ( popover.classList.add('show') );
  }
  function updatePopover() {
    styleTip(element, popover, ops.placement, ops.container);
  }
  function forceFocus () {
    if (popover === null) { element.focus(); }
  }
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    if (ops.trigger === 'hover') {
      element[action]( mouseClickEvents.down, self.show );
      element[action]( mouseHoverEvents[0], self.show );
      if (!ops.dismissible) { element[action]( mouseHoverEvents[1], self.hide ); } // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
    } else if ('click' == ops.trigger) {
      element[action]( ops.trigger, self.toggle );
    } else if ('focus' == ops.trigger) {
      isIphone && element[action]( 'click', forceFocus, false );
      element[action]( ops.trigger, self.toggle );
    }
  }
  function touchHandler(e){
    if ( popover && popover.contains(e.target) || e.target === element || element.contains(e.target)) ; else {
      self.hide();
    }
  }
  // event toggle
  function dismissHandlerToggle(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    if (ops.dismissible) {
      document[action]('click', dismissibleHandler, false );
    } else {
      'focus' == ops.trigger && element[action]( 'blur', self.hide );
      'hover' == ops.trigger && document[action]( 'touchstart', touchHandler, passiveHandler );
    }
    window[action]('resize', self.hide, passiveHandler );
  }
  // triggers
  function showTrigger() {
    dismissHandlerToggle(1);
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideTrigger() {
    dismissHandlerToggle();
    removePopover();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }

  // public methods / handlers
  self.toggle = function () {
    if (popover === null) { self.show(); }
    else { self.hide(); }
  };
  self.show = function () {
    clearTimeout(timer);
    timer = setTimeout( function () {
      if (popover === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if ( showCustomEvent.defaultPrevented ) { return; }

        createPopover();
        updatePopover();
        showPopover();
        !!ops.animation ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  self.hide = function () {
    clearTimeout(timer);
    timer = setTimeout( function () {
      if (popover && popover !== null && popover.classList.contains('show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if ( hideCustomEvent.defaultPrevented ) { return; }
        popover.classList.remove('show');
        !!ops.animation ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
      }
    }, ops.delay );
  };
  self.dispose = function () {
    self.hide();
    toggleEvents();
    delete element.Popover;
  };

  // INIT
  // initialization element
  element = queryElement(element);

  // reset on re-init
  element.Popover && element.Popover.dispose();

  // DATA API
  triggerData = element.getAttribute('data-trigger'); // click / hover / focus
  animationData = element.getAttribute('data-animation'); // true / false

  placementData = element.getAttribute('data-placement');
  dismissibleData = element.getAttribute('data-dismissible');
  delayData = element.getAttribute('data-delay');
  containerData = element.getAttribute('data-container');

  // close btn for dissmissible popover
  closeBtn = '<button type="button" class="close">×</button>';

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'popover');
  shownCustomEvent = bootstrapCustomEvent('shown', 'popover');
  hideCustomEvent = bootstrapCustomEvent('hide', 'popover');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'popover');

  // check container
  containerElement = queryElement(options.container);
  containerDataElement = queryElement(containerData);

  // maybe the element is inside a modal
  modal = element.closest('.modal');

  // maybe the element is inside a fixed navbar
  navbarFixedTop = element.closest('.fixed-top');
  navbarFixedBottom = element.closest('.fixed-bottom');

  // set instance options
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.trigger = options.trigger ? options.trigger : triggerData || 'hover';
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = parseInt(options.delay || delayData) || 200;
  ops.dismissible = options.dismissible || dismissibleData === 'true' ? true : false;
  ops.container = containerElement ? containerElement
                          : containerDataElement ? containerDataElement
                          : navbarFixedTop ? navbarFixedTop
                          : navbarFixedBottom ? navbarFixedBottom
                          : modal ? modal : document.body;

  placementClass = "bs-popover-" + (ops.placement);


  // invalidate
  var popoverContents = getContents();
  titleString = popoverContents[0];
  contentString = popoverContents[1];

  if ( !contentString && !ops.template ) { return; }

  // init
  if ( !element.Popover ) { // prevent adding event handlers twice
    toggleEvents(1);
  }

  // associate target to init object
  element.Popover = self;

}

export default Popover;
