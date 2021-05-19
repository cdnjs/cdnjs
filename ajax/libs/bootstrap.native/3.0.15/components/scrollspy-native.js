/*!
  * Native JavaScript for Bootstrap ScrollSpy v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory());
}(this, (function () { 'use strict';

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          result = true;
          return result;
        },
      });
      document[addEventListener]('DOMContentLoaded', function wrap() {
        document[removeEventListener]('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  // general event options

  var passiveHandler = supportPassive ? { passive: true } : false;

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

  const activeClass = 'active';

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

  /* Native JavaScript for Bootstrap 5 | ScrollSpy
  ------------------------------------------------ */

  // SCROLLSPY PRIVATE GC
  // ====================
  const scrollspyString = 'scrollspy';
  const scrollspyComponent = 'ScrollSpy';
  const scrollspySelector = '[data-bs-spy="scroll"]';
  const scrollSpyDefaultOptions = {
    offset: 10,
    target: null,
  };

  // SCROLLSPY CUSTOM EVENT
  // ======================
  const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

  // SCROLLSPY PRIVATE METHODS
  // =========================
  function updateSpyTargets(self) {
    const {
      target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
    } = self;
    const { offset } = options;
    const links = target.getElementsByTagName('A');

    self.scrollTop = isWindow
      ? scrollTarget.pageYOffset
      : scrollTarget.scrollTop;

    // only update items/offsets once or with each mutation
    if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
      let href;
      let targetItem;
      let rect;

      // reset arrays & update
      self.items = [];
      self.offsets = [];
      self.scrollHeight = getScrollHeight(scrollTarget);
      self.maxScroll = self.scrollHeight - getOffsetHeight(self);

      Array.from(links).forEach((link) => {
        href = link.getAttribute('href');
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

        if (targetItem) {
          self.items.push(link);
          rect = targetItem.getBoundingClientRect();
          self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
        }
      });
      self.itemsLength = self.items.length;
    }
  }

  function getScrollHeight(scrollTarget) {
    return scrollTarget.scrollHeight || Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
  }

  function getOffsetHeight({ element, isWindow }) {
    if (!isWindow) return element.getBoundingClientRect().height;
    return window.innerHeight;
  }

  function clear(target) {
    Array.from(target.getElementsByTagName('A')).forEach((item) => {
      if (hasClass(item, activeClass)) removeClass(item, activeClass);
    });
  }

  function activate(self, item) {
    const { target, element } = self;
    clear(target);
    self.activeItem = item;
    addClass(item, activeClass);

    // activate all parents
    const parents = [];
    let parentItem = item;
    while (parentItem !== document.body) {
      parentItem = parentItem.parentNode;
      if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
    }

    parents.forEach((menuItem) => {
      const parentLink = menuItem.previousElementSibling;

      if (parentLink && !hasClass(parentLink, activeClass)) {
        addClass(parentLink, activeClass);
      }
    });

    // update relatedTarget and dispatch
    activateScrollSpy.relatedTarget = item;
    element.dispatchEvent(activateScrollSpy);
  }

  function toggleSpyHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
  }

  // SCROLLSPY DEFINITION
  // ====================
  class ScrollSpy extends BaseComponent {
    constructor(target, config) {
      super(scrollspyComponent, target, scrollSpyDefaultOptions, config);
      // bind
      const self = this;

      // initialization element & options
      const { element, options } = self;

      // additional properties
      self.target = queryElement(options.target);

      // invalidate
      if (!self.target) return;

      // set initial state
      self.scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
      self.isWindow = self.scrollTarget === window;
      self.scrollTop = 0;
      self.maxScroll = 0;
      self.scrollHeight = 0;
      self.activeItem = null;
      self.items = [];
      self.offsets = [];

      // bind events
      self.refresh = self.refresh.bind(self);

      // add event handlers
      toggleSpyHandlers(self, 1);

      self.refresh();
    }

    // SCROLLSPY PUBLIC METHODS
    // ========================
    refresh() {
      const self = this;
      const { target } = self;

      // check if target is visible and invalidate
      if (target.offsetHeight === 0) return;

      updateSpyTargets(self);

      const {
        scrollTop, maxScroll, itemsLength, items, activeItem,
      } = self;

      if (scrollTop >= maxScroll) {
        const newActiveItem = items[itemsLength - 1];

        if (activeItem !== newActiveItem) {
          activate(self, newActiveItem);
        }
        return;
      }

      const { offsets } = self;

      if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
        self.activeItem = null;
        clear(target);
        return;
      }

      items.forEach((item, i) => {
        if (activeItem !== item && scrollTop >= offsets[i]
          && (typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1])) {
          activate(self, item);
        }
      });
    }

    dispose() {
      toggleSpyHandlers(this);
      super.dispose(scrollspyComponent);
    }
  }

  ScrollSpy.init = {
    component: scrollspyComponent,
    selector: scrollspySelector,
    constructor: ScrollSpy,
  };

  return ScrollSpy;

})));
