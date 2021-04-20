/*!
  * Native JavaScript for Bootstrap Collapse v3.0.15-alpha2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory());
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

  /* Native JavaScript for Bootstrap 4 | Collapse
  ----------------------------------------------- */

  // COLLAPSE DEFINITION
  // ===================

  function Collapse(elem, opsInput) {
    var element;
    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // target practice
    var accordion = null;
    var collapse = null;
    var activeCollapse;
    var activeElement;
    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;

    // private methods
    function openAction(collapseElement, toggle) {
      dispatchCustomEvent.call(collapseElement, showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }
      collapseElement.isAnimating = true;
      collapseElement.classList.add('collapsing');
      collapseElement.classList.remove('collapse');
      collapseElement.style.height = (collapseElement.scrollHeight) + "px";

      emulateTransitionEnd(collapseElement, function () {
        collapseElement.isAnimating = false;
        collapseElement.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        collapseElement.classList.remove('collapsing');
        collapseElement.classList.add('collapse');
        collapseElement.classList.add('show');
        collapseElement.style.height = '';
        dispatchCustomEvent.call(collapseElement, shownCustomEvent);
      });
    }
    function closeAction(collapseElement, toggle) {
      dispatchCustomEvent.call(collapseElement, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) { return; }
      collapseElement.isAnimating = true;
      collapseElement.style.height = (collapseElement.scrollHeight) + "px"; // set height first
      collapseElement.classList.remove('collapse');
      collapseElement.classList.remove('show');
      collapseElement.classList.add('collapsing');
      reflow(collapseElement); // force reflow to enable transition
      collapseElement.style.height = '0px';

      emulateTransitionEnd(collapseElement, function () {
        collapseElement.isAnimating = false;
        collapseElement.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        collapseElement.classList.remove('collapsing');
        collapseElement.classList.add('collapse');
        collapseElement.style.height = '';
        dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
      });
    }

    // public methods
    self.toggle = function (e) {
      if ((e && e.target.tagName === 'A') || element.tagName === 'A') { e.preventDefault(); }
      if (element.contains(e.target) || e.target === element) {
        if (!collapse.classList.contains('show')) { self.show(); }
        else { self.hide(); }
      }
    };
    self.hide = function () {
      if (collapse.isAnimating) { return; }
      closeAction(collapse, element);
      element.classList.add('collapsed');
    };
    self.show = function () {
      var assign;

      if (accordion) {
        (assign = accordion.getElementsByClassName('collapse show'), activeCollapse = assign[0]);
        activeElement = activeCollapse && (queryElement(("[data-target=\"#" + (activeCollapse.id) + "\"]"), accordion)
                      || queryElement(("[href=\"#" + (activeCollapse.id) + "\"]"), accordion));
      }

      if (!collapse.isAnimating) {
        if (activeElement && activeCollapse !== collapse) {
          closeAction(activeCollapse, activeElement);
          activeElement.classList.add('collapsed');
        }
        openAction(collapse, element);
        element.classList.remove('collapsed');
      }
    };
    self.dispose = function () {
      element.removeEventListener('click', self.toggle, false);
      delete element.Collapse;
    };

    // init

    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Collapse) { element.Collapse.dispose(); }

    // DATA API
    var accordionData = element.getAttribute('data-parent');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'collapse');
    shownCustomEvent = bootstrapCustomEvent('shown', 'collapse');
    hideCustomEvent = bootstrapCustomEvent('hide', 'collapse');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse');

    // determine targets
    collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));

    if (collapse !== null) { collapse.isAnimating = false; }
    accordion = element.closest(options.parent || accordionData);

    // prevent adding event handlers twice
    if (!element.Collapse) {
      element.addEventListener('click', self.toggle, false);
    }

    // associate target to init object
    element.Collapse = self;
  }

  return Collapse;

})));
