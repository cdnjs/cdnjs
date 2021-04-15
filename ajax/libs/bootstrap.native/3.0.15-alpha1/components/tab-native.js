/*!
  * Native JavaScript for Bootstrap Tab v3.0.15-alpha1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory());
}(this, (function () { 'use strict';

  var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

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

  /* Native JavaScript for Bootstrap 4 | Tab
  ------------------------------------------ */

  // TAB DEFINITION
  // ==============

  function Tab(elem, opsInput) {
    var element;
    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // event targets
    var tabs;
    var dropdown;

    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;

    // more GC material
    var next;
    var tabsContentContainer = false;
    var activeTab;
    var activeContent;
    var nextContent;
    var containerHeight;
    var equalContents;
    var nextHeight;

    // triggers
    function triggerEnd() {
      tabsContentContainer.style.height = '';
      tabsContentContainer.classList.remove('collapsing');
      tabs.isAnimating = false;
    }
    function triggerShow() {
      if (tabsContentContainer) { // height animation
        if (equalContents) {
          triggerEnd();
        } else {
          setTimeout(function () { // enables height animation
            tabsContentContainer.style.height = nextHeight + "px"; // height animation
            reflow(tabsContentContainer);
            emulateTransitionEnd(tabsContentContainer, triggerEnd);
          }, 50);
        }
      } else {
        tabs.isAnimating = false;
      }
      shownCustomEvent = bootstrapCustomEvent('shown', 'tab', { relatedTarget: activeTab });
      dispatchCustomEvent.call(next, shownCustomEvent);
    }
    function triggerHide() {
      if (tabsContentContainer) {
        activeContent.style.float = 'left';
        nextContent.style.float = 'left';
        containerHeight = activeContent.scrollHeight;
      }

      showCustomEvent = bootstrapCustomEvent('show', 'tab', { relatedTarget: activeTab });
      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tab', { relatedTarget: next });

      dispatchCustomEvent.call(next, showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }

      nextContent.classList.add('active');

      activeContent.classList.remove('active');

      if (tabsContentContainer) {
        nextHeight = nextContent.scrollHeight;
        equalContents = nextHeight === containerHeight;
        tabsContentContainer.classList.add('collapsing');
        tabsContentContainer.style.height = containerHeight + "px"; // height animation
        reflow(tabsContentContainer);
        activeContent.style.float = '';
        nextContent.style.float = '';
      }

      if (nextContent.classList.contains('fade')) {
        setTimeout(function () {
          nextContent.classList.add('show');
          emulateTransitionEnd(nextContent, triggerShow);
        }, 20);
      } else { triggerShow(); }

      dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
    }
    // private methods
    function getActiveTab() {
      var assign;

      var activeTabs = tabs.getElementsByClassName('active');

      if (activeTabs.length === 1 && !activeTabs[0].parentNode.classList.contains('dropdown')) {
        (assign = activeTabs, activeTab = assign[0]);
      } else if (activeTabs.length > 1) {
        activeTab = activeTabs[activeTabs.length - 1];
      }
      return activeTab;
    }
    function getActiveContent() { return queryElement(getActiveTab().getAttribute('href')); }
    // handler
    function clickHandler(e) {
      e.preventDefault();
      next = e.currentTarget;
      if (!tabs.isAnimating) { self.show(); }
    }

    // public method
    self.show = function () { // the tab we clicked is now the next tab
      next = next || element;

      if (!next.classList.contains('active')) {
        nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate
        activeTab = getActiveTab();
        activeContent = getActiveContent();

        hideCustomEvent = bootstrapCustomEvent('hide', 'tab', { relatedTarget: next });
        dispatchCustomEvent.call(activeTab, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) { return; }

        tabs.isAnimating = true;
        activeTab.classList.remove('active');
        activeTab.setAttribute('aria-selected', 'false');
        next.classList.add('active');
        next.setAttribute('aria-selected', 'true');

        if (dropdown) {
          if (!element.parentNode.classList.contains('dropdown-menu')) {
            if (dropdown.classList.contains('active')) { dropdown.classList.remove('active'); }
          } else if (!dropdown.classList.contains('active')) { dropdown.classList.add('active'); }
        }

        if (activeContent.classList.contains('fade')) {
          activeContent.classList.remove('show');
          emulateTransitionEnd(activeContent, triggerHide);
        } else { triggerHide(); }
      }
    };
    self.dispose = function () {
      element.removeEventListener('click', clickHandler, false);
      delete element.Tab;
    };

    // INIT
    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Tab) { element.Tab.dispose(); }

    // DATA API
    var heightData = element.getAttribute('data-height');
    // event targets
    tabs = element.closest('.nav');
    dropdown = tabs && queryElement('.dropdown-toggle', tabs);

    // instance options
    var animateHeight = !(!supportTransition || (options.height === false || heightData === 'false'));

    // set default animation state
    tabs.isAnimating = false;

    // init
    if (!element.Tab) { // prevent adding event handlers twice
      element.addEventListener('click', clickHandler, false);
    }

    if (animateHeight) { tabsContentContainer = getActiveContent().parentNode; }

    // associate target with init object
    element.Tab = self;
  }

  return Tab;

})));
