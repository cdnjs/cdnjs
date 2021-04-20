/*!
  * Native JavaScript for Bootstrap Toast v3.0.15-alpha2 (https://thednp.github.io/bootstrap.native/)
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
    var computedStyle = getComputedStyle(element);
    var propertyValue = computedStyle[transitionProperty];
    var durationValue = computedStyle[transitionDuration];
    var durationScale = durationValue.includes('ms') ? 1 : 1000;
    var duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function emulateTransitionEnd(element, handler) {
    var called = 0;
    var endEvent = new Event(transitionEndEvent);
    var duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(function () {
        if (!called) { element.dispatchEvent(endEvent); }
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function reflow(element) {
    return element.offsetHeight;
  }

  function bootstrapCustomEvent(eventType, componentName, eventProperties) {
    var OriginalCustomEvent = new CustomEvent((eventType + ".bs." + componentName), { cancelable: true });

    if (typeof eventProperties !== 'undefined') {
      Object.keys(eventProperties).forEach(function (key) {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  function dispatchCustomEvent(customEvent) {
    if (this) { this.dispatchEvent(customEvent); }
  }

  /* Native JavaScript for Bootstrap 4 | Toast
  -------------------------------------------- */

  // TOAST DEFINITION
  // ==================

  function Toast(elem, opsInput) {
    var element;

    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // toast, timer
    var toast;
    var timer = 0;

    // custom events
    var showCustomEvent;
    var hideCustomEvent;
    var shownCustomEvent;
    var hiddenCustomEvent;
    var ops = {};

    // private methods
    function showComplete() {
      toast.classList.remove('showing');
      toast.classList.add('show');
      dispatchCustomEvent.call(toast, shownCustomEvent);
      if (ops.autohide) { self.hide(); }
    }
    function hideComplete() {
      toast.classList.add('hide');
      dispatchCustomEvent.call(toast, hiddenCustomEvent);
    }
    function close() {
      toast.classList.remove('show');
      if (ops.animation) { emulateTransitionEnd(toast, hideComplete); }
      else { hideComplete(); }
    }
    function disposeComplete() {
      clearTimeout(timer);
      element.removeEventListener('click', self.hide, false);

      delete element.Toast;
    }

    // public methods
    self.show = function () {
      if (toast && !toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast, showCustomEvent);
        if (showCustomEvent.defaultPrevented) { return; }
        if (ops.animation) { toast.classList.add('fade'); }
        toast.classList.remove('hide');
        reflow(toast); // force reflow
        toast.classList.add('showing');

        if (ops.animation) { emulateTransitionEnd(toast, showComplete); }
        else { showComplete(); }
      }
    };
    self.hide = function (noTimer) {
      if (toast && toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) { return; }

        if (noTimer) { close(); }
        else { timer = setTimeout(close, ops.delay); }
      }
    };
    self.dispose = function () {
      if (ops.animation) { emulateTransitionEnd(toast, disposeComplete); }
      else { disposeComplete(); }
    };

    // init

    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Toast) { element.Toast.dispose(); }

    // toast, timer
    toast = element.closest('.toast');

    // DATA API
    var animationData = element.getAttribute('data-animation');
    var autohideData = element.getAttribute('data-autohide');
    var delayData = element.getAttribute('data-delay');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'toast');
    hideCustomEvent = bootstrapCustomEvent('hide', 'toast');
    shownCustomEvent = bootstrapCustomEvent('shown', 'toast');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');

    // set instance options
    ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
    ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
    ops.delay = parseInt((options.delay || delayData), 10) || 500; // 500ms default

    if (!element.Toast) { // prevent adding event handlers twice
      element.addEventListener('click', self.hide, false);
    }

    // associate targets to init object
    element.Toast = self;
  }

  return Toast;

})));
