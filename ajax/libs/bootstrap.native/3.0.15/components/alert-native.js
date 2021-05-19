/*!
  * Native JavaScript for Bootstrap Alert v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Alert = factory());
}(this, (function () { 'use strict';

  const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

  const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    const computedStyle = getComputedStyle(element);
    const propertyValue = computedStyle[transitionProperty];
    const durationValue = computedStyle[transitionDuration];
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(() => {
        if (!called) element.dispatchEvent(endEvent);
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const fadeClass = 'fade';

  const showClass = 'show';

  const dataBsDismiss = 'data-bs-dismiss';

  function bootstrapCustomEvent(namespacedEventType, eventProperties) {
    const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

    if (eventProperties instanceof Object) {
      Object.keys(eventProperties).forEach((key) => {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  function normalizeValue(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (!Number.isNaN(+value)) {
      return +value;
    }

    if (value === '' || value === 'null') {
      return null;
    }

    // string / function / Element / Object
    return value;
  }

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const normalOps = {};
    const dataOps = {};
    const data = { ...element.dataset };

    Object.keys(data)
      .forEach((k) => {
        const key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach((k) => {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach((k) => {
        if (k in inputOps) {
          normalOps[k] = inputOps[k];
        } else if (k in dataOps) {
          normalOps[k] = dataOps[k];
        } else {
          normalOps[k] = defaultOps[k];
        }
      });

    return normalOps;
  }

  /* Native JavaScript for Bootstrap 5 | Base Component
  ----------------------------------------------------- */

  class BaseComponent {
    constructor(name, target, defaults, config) {
      const self = this;
      const element = queryElement(target);

      if (element[name]) element[name].dispose();
      self.element = element;

      if (defaults && Object.keys(defaults).length) {
        self.options = normalizeOptions(element, defaults, (config || {}), 'bs');
      }
      element[name] = self;
    }

    dispose(name) {
      const self = this;
      self.element[name] = null;
      Object.keys(self).forEach((prop) => { self[prop] = null; });
    }
  }

  /* Native JavaScript for Bootstrap 5 | Alert
  -------------------------------------------- */

  // ALERT PRIVATE GC
  // ================
  const alertString = 'alert';
  const alertComponent = 'Alert';
  const alertSelector = `.${alertString}`;
  const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

  // ALERT CUSTOM EVENTS
  // ===================
  const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
  const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

  // ALERT EVENT HANDLERS
  // ====================
  function alertTransitionEnd(self) {
    const { element, relatedTarget } = self;
    toggleAlertHandler(self);

    if (relatedTarget) closedAlertEvent.relatedTarget = relatedTarget;
    element.dispatchEvent(closedAlertEvent);

    self.dispose();
    element.parentNode.removeChild(element);
  }

  // ALERT PRIVATE METHOD
  // ====================
  function toggleAlertHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    if (self.dismiss) self.dismiss[action]('click', self.close);
  }

  // ALERT DEFINITION
  // ================
  class Alert extends BaseComponent {
    constructor(target) {
      super(alertComponent, target);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // the dismiss button
      self.dismiss = queryElement(alertDismissSelector, element);
      self.relatedTarget = null;

      // add event listener
      toggleAlertHandler(self, 1);
    }

    // ALERT PUBLIC METHODS
    // ====================
    close(e) {
      const target = e ? e.target : null;
      const self = e
        ? e.target.closest(alertSelector)[alertComponent]
        : this;
      const { element } = self;

      if (self && element && hasClass(element, showClass)) {
        if (target) {
          closeAlertEvent.relatedTarget = target;
          self.relatedTarget = target;
        }
        element.dispatchEvent(closeAlertEvent);
        if (closeAlertEvent.defaultPrevented) return;

        removeClass(element, showClass);

        if (hasClass(element, fadeClass)) {
          emulateTransitionEnd(element, () => alertTransitionEnd(self));
        } else alertTransitionEnd(self);
      }
    }

    dispose() {
      toggleAlertHandler(this);
      super.dispose(alertComponent);
    }
  }

  Alert.init = {
    component: alertComponent,
    selector: alertSelector,
    constructor: Alert,
  };

  return Alert;

})));
