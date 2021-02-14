/*!
  * Native JavaScript for Bootstrap Collapse v3.0.14f (https://thednp.github.io/bootstrap.native/)
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

// COLLAPSE DEFINITION
// ===================

function Collapse(element,options) {

  // set options
  options = options || {};

  // bind
  var self = this;

  // target practice
  var accordion = null,
      collapse = null,
      activeCollapse,
      activeElement,
      // custom events
      showCustomEvent,
      shownCustomEvent,
      hideCustomEvent,
      hiddenCustomEvent;

  // private methods
  function openAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, showCustomEvent);
    if ( showCustomEvent.defaultPrevented ) { return; }
    collapseElement.isAnimating = true;
    collapseElement.classList.add('collapsing');
    collapseElement.classList.remove('collapse');
    collapseElement.style.height = (collapseElement.scrollHeight) + "px";
    
    emulateTransitionEnd(collapseElement, function () {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-expanded','true');
      collapseElement.classList.remove('collapsing');
      collapseElement.classList.add('collapse');
      collapseElement.classList.add('show');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, shownCustomEvent);
    });
  }
  function closeAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) { return; }
    collapseElement.isAnimating = true;
    collapseElement.style.height = (collapseElement.scrollHeight) + "px"; // set height first
    collapseElement.classList.remove('collapse');
    collapseElement.classList.remove('show');
    collapseElement.classList.add('collapsing');
    collapseElement.offsetWidth; // force reflow to enable transition
    collapseElement.style.height = '0px';
    
    emulateTransitionEnd(collapseElement, function () {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-expanded','false');
      collapseElement.classList.remove('collapsing');
      collapseElement.classList.add('collapse');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
    });
  }

  // public methods
  self.toggle = function (e) {
    if (e && e.target.tagName === 'A' || element.tagName === 'A') {e.preventDefault();}
    if (element.contains(e.target) || e.target === element) {
      if (!collapse.classList.contains('show')) { self.show(); } 
      else { self.hide(); }
    }
  };
  self.hide = function () {
    if ( collapse.isAnimating ) { return; }    
    closeAction(collapse,element);
    element.classList.add('collapsed');
  };
  self.show = function () {
    if ( accordion ) {
      activeCollapse = accordion.getElementsByClassName("collapse show")[0];
      activeElement = activeCollapse && (queryElement(("[data-target=\"#" + (activeCollapse.id) + "\"]"),accordion)
                    || queryElement(("[href=\"#" + (activeCollapse.id) + "\"]"),accordion) );
    }

    if ( !collapse.isAnimating ) {
      if ( activeElement && activeCollapse !== collapse ) {
        closeAction(activeCollapse,activeElement); 
        activeElement.classList.add('collapsed');
      }
      openAction(collapse,element);
      element.classList.remove('collapsed');
    }
  };
  self.dispose = function () {
    element.removeEventListener('click',self.toggle,false);
    delete element.Collapse;
  };

  // init
  
    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Collapse && element.Collapse.dispose();

    // DATA API
    var accordionData = element.getAttribute('data-parent');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'collapse');
    shownCustomEvent = bootstrapCustomEvent('shown', 'collapse');
    hideCustomEvent = bootstrapCustomEvent('hide', 'collapse');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse');

    // determine targets
    collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));
    
    collapse !== null && (collapse.isAnimating = false);  
    accordion = element.closest(options.parent || accordionData);
  
    // prevent adding event handlers twice
    if ( !element.Collapse ) { 
      element.addEventListener('click',self.toggle,false);
    }
  
    // associate target to init object
    element.Collapse = self;
}

export default Collapse;
