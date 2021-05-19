/*!
  * Native JavaScript for Bootstrap Tab v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory());
}(this, (function () { 'use strict';

  const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

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

  function reflow(element) {
    return element.offsetHeight;
  }

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const ariaSelected = 'aria-selected';

  // collapse / tab
  const collapsingClass = 'collapsing';

  const activeClass = 'active';

  const fadeClass = 'fade';

  const showClass = 'show';

  const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

  const dropdownMenuClass = 'dropdown-menu';

  const dataBsToggle = 'data-bs-toggle';

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

  /* Native JavaScript for Bootstrap 5 | Tab
  ------------------------------------------ */

  // TAB PRIVATE GC
  // ================
  const tabString = 'tab';
  const tabComponent = 'Tab';
  const tabSelector = `[${dataBsToggle}="${tabString}"]`;

  // TAB CUSTOM EVENTS
  // =================
  const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
  const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
  const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
  const hiddenTabEvent = bootstrapCustomEvent(`hidden.bs.${tabString}`);

  let nextTab;
  let nextTabContent;
  let nextTabHeight;
  let activeTab;
  let activeTabContent;
  let tabContainerHeight;
  let tabEqualContents;

  // TAB PRIVATE METHODS
  // ===================
  function triggerTabEnd(self) {
    const { tabContent, nav } = self;
    tabContent.style.height = '';
    removeClass(tabContent, collapsingClass);
    nav.isAnimating = false;
  }

  function triggerTabShow(self) {
    const { tabContent, nav } = self;

    if (tabContent) { // height animation
      if (tabEqualContents) {
        triggerTabEnd(self);
      } else {
        setTimeout(() => { // enables height animation
          tabContent.style.height = `${nextTabHeight}px`; // height animation
          reflow(tabContent);
          emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
        }, 50);
      }
    } else {
      nav.isAnimating = false;
    }
    shownTabEvent.relatedTarget = activeTab;
    nextTab.dispatchEvent(shownTabEvent);
  }

  function triggerTabHide(self) {
    const { tabContent } = self;
    if (tabContent) {
      activeTabContent.style.float = 'left';
      nextTabContent.style.float = 'left';
      tabContainerHeight = activeTabContent.scrollHeight;
    }

    // update relatedTarget and dispatch event
    showTabEvent.relatedTarget = activeTab;
    hiddenTabEvent.relatedTarget = nextTab;
    nextTab.dispatchEvent(showTabEvent);
    if (showTabEvent.defaultPrevented) return;

    addClass(nextTabContent, activeClass);
    removeClass(activeTabContent, activeClass);

    if (tabContent) {
      nextTabHeight = nextTabContent.scrollHeight;
      tabEqualContents = nextTabHeight === tabContainerHeight;
      addClass(tabContent, collapsingClass);
      tabContent.style.height = `${tabContainerHeight}px`; // height animation
      reflow(tabContent);
      activeTabContent.style.float = '';
      nextTabContent.style.float = '';
    }

    if (hasClass(nextTabContent, fadeClass)) {
      setTimeout(() => {
        addClass(nextTabContent, showClass);
        emulateTransitionEnd(nextTabContent, () => {
          triggerTabShow(self);
        });
      }, 20);
    } else { triggerTabShow(self); }

    activeTab.dispatchEvent(hiddenTabEvent);
  }

  function getActiveTab({ nav }) {
    const activeTabs = nav.getElementsByClassName(activeClass);

    if (activeTabs.length === 1
      && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentNode, c))) {
      [activeTab] = activeTabs;
    } else if (activeTabs.length > 1) {
      activeTab = activeTabs[activeTabs.length - 1];
    }
    return activeTab;
  }

  function getActiveTabContent(self) {
    return queryElement(getActiveTab(self).getAttribute('href'));
  }

  function toggleTabHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.element[action]('click', tabClickHandler);
  }

  // TAB EVENT HANDLER
  // =================
  function tabClickHandler(e) {
    const self = this[tabComponent];
    e.preventDefault();
    if (!self.nav.isAnimating) self.show();
  }

  // TAB DEFINITION
  // ==============
  class Tab extends BaseComponent {
    constructor(target) {
      super(tabComponent, target);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // event targets
      self.nav = element.closest('.nav');
      const { nav } = self;
      self.dropdown = nav && queryElement(`.${dropdownMenuClasses[0]}-toggle`, nav);
      activeTabContent = getActiveTabContent(self);
      self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
      tabContainerHeight = activeTabContent.scrollHeight;

      // set default animation state
      nav.isAnimating = false;

      // add event listener
      toggleTabHandler(self, 1);
    }

    // TAB PUBLIC METHODS
    // ==================
    show() { // the tab we clicked is now the nextTab tab
      const self = this;
      const { element, nav, dropdown } = self;
      nextTab = element;
      if (!hasClass(nextTab, activeClass)) {
        // this is the actual object, the nextTab tab content to activate
        nextTabContent = queryElement(nextTab.getAttribute('href'));
        activeTab = getActiveTab({ nav });
        activeTabContent = getActiveTabContent({ nav });

        // update relatedTarget and dispatch
        hideTabEvent.relatedTarget = nextTab;
        activeTab.dispatchEvent(hideTabEvent);
        if (hideTabEvent.defaultPrevented) return;

        nav.isAnimating = true;
        removeClass(activeTab, activeClass);
        activeTab.setAttribute(ariaSelected, 'false');
        addClass(nextTab, activeClass);
        nextTab.setAttribute(ariaSelected, 'true');

        if (dropdown) {
          if (!hasClass(element.parentNode, dropdownMenuClass)) {
            if (hasClass(dropdown, activeClass)) removeClass(dropdown, activeClass);
          } else if (!hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
        }

        if (hasClass(activeTabContent, fadeClass)) {
          removeClass(activeTabContent, showClass);
          emulateTransitionEnd(activeTabContent, () => triggerTabHide(self));
        } else {
          triggerTabHide(self);
        }
      }
    }

    dispose() {
      toggleTabHandler(this);
      super.dispose(tabComponent);
    }
  }

  Tab.init = {
    component: tabComponent,
    selector: tabSelector,
    constructor: Tab,
  };

  return Tab;

})));
