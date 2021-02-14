/*!
  * Native JavaScript for Bootstrap Toast v3.0.14f (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Toast = factory());
}(this, (function () { 'use strict';

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

  // TOAST DEFINITION
  // ==================

  function Toast(element,options) {

    // set options
    options = options || {};

    // bind
    var self = this,

        // toast, timer
        toast, timer = 0,

        // DATA API
        animationData,
        autohideData,
        delayData,

        // custom events
        showCustomEvent,
        hideCustomEvent,
        shownCustomEvent,
        hiddenCustomEvent,
        ops = {};

    // private methods
    function showComplete() {
      toast.classList.remove( 'showing' );
      toast.classList.add( 'show' );
      dispatchCustomEvent.call(toast,shownCustomEvent);
      if (ops.autohide) { self.hide(); }
    }
    function hideComplete() {
      toast.classList.add( 'hide' );
      dispatchCustomEvent.call(toast,hiddenCustomEvent);
    }
    function close () {
      toast.classList.remove('show' );
      ops.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
    }
    function disposeComplete() {
      clearTimeout(timer);
      element.removeEventListener('click',self.hide,false);

      delete element.Toast;
    }

    // public methods
    self.show = function () {
      if (toast && !toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast,showCustomEvent);
        if (showCustomEvent.defaultPrevented) { return; }
        ops.animation && toast.classList.add( 'fade' );
        toast.classList.remove('hide' );
        toast.offsetWidth; // force reflow
        toast.classList.add('showing' );

        ops.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
      }
    };
    self.hide = function (noTimer) {
      if (toast && toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast,hideCustomEvent);
        if(hideCustomEvent.defaultPrevented) { return; }

        noTimer ? close() : (timer = setTimeout( close, ops.delay));
      }
    };
    self.dispose = function () {
      ops.animation ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
    };

    // init

    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Toast && element.Toast.dispose();

    // toast, timer
    toast = element.closest('.toast');

    // DATA API
    animationData = element.getAttribute('data-animation');
    autohideData = element.getAttribute('data-autohide');
    delayData = element.getAttribute('data-delay');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'toast');
    hideCustomEvent = bootstrapCustomEvent('hide', 'toast');
    shownCustomEvent = bootstrapCustomEvent('shown', 'toast');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');

    // set instance options
    ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
    ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
    ops.delay = parseInt(options.delay || delayData) || 500; // 500ms default    
    
    if ( !element.Toast ) { // prevent adding event handlers twice
      element.addEventListener('click',self.hide,false);
    }

    // associate targets to init object
    element.Toast = self;
  }

  return Toast;

})));
