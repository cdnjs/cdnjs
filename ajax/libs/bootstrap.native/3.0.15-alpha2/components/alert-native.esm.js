/*!
  * Native JavaScript for Bootstrap Alert v3.0.15-alpha2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */

// ALERT DEFINITION
// ================

function Alert(elem) {
  var element;

  // bind
  var self = this;

  // the target alert
  var alert;

  // custom events
  var closeCustomEvent = bootstrapCustomEvent('close', 'alert');
  var closedCustomEvent = bootstrapCustomEvent('closed', 'alert');

  // private methods
  function triggerHandler() {
    if (alert.classList.contains('fade')) { emulateTransitionEnd(alert, transitionEndHandler); }
    else { transitionEndHandler(); }
  }
  function toggleEvents(add) {
    var action = add ? 'addEventListener' : 'removeEventListener';
    element[action]('click', clickHandler, false);
  }

  // event handlers
  function clickHandler(e) {
    alert = e && e.target.closest('.alert');
    element = queryElement('[data-dismiss="alert"]', alert);
    if (element && alert && (element === e.target || element.contains(e.target))) { self.close(); }
  }
  function transitionEndHandler() {
    toggleEvents();
    alert.parentNode.removeChild(alert);
    dispatchCustomEvent.call(alert, closedCustomEvent);
  }

  // PUBLIC METHODS
  self.close = function () {
    if (alert && element && alert.classList.contains('show')) {
      dispatchCustomEvent.call(alert, closeCustomEvent);
      if (closeCustomEvent.defaultPrevented) { return; }
      self.dispose();
      alert.classList.remove('show');
      triggerHandler();
    }
  };

  self.dispose = function () {
    toggleEvents();
    delete element.Alert;
  };

  // INIT
  // initialization element
  element = queryElement(elem);

  // find the target alert
  alert = element.closest('.alert');

  // reset on re-init
  if (element.Alert) { element.Alert.dispose(); }

  // prevent adding event handlers twice
  if (!element.Alert) { toggleEvents(1); }

  // store init object within target element
  self.element = element;
  element.Alert = self;
}

export default Alert;
