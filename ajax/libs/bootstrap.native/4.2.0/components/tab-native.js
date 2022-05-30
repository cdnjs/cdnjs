/*!
  * Native JavaScript for Bootstrap - Tab v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory());
})(this, (function () { 'use strict';

  /**
   * A global namespace for aria-selected.
   * @type {string}
   */
  const ariaSelected = 'aria-selected';

  /**
   * A global namespace for `click` event.
   * @type {string}
   */
  const mouseclickEvent = 'click';

  /**
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   * @returns {void}
   */
  const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

  /**
   * Shortcut for `HTMLElement.closest` method which also works
   * with children of `ShadowRoot`. The order of the parameters
   * is intentional since they're both required.
   *
   * @see https://stackoverflow.com/q/54520554/803358
   *
   * @param {HTMLElement} element Element to look into
   * @param {string} selector the selector name
   * @return {HTMLElement?} the query result
   */
  function closest(element, selector) {
    return element ? (element.closest(selector)
      // break out of `ShadowRoot`
      || closest(element.getRootNode().host, selector)) : null;
  }

  /**
   * Checks if an object is a `Node`.
   *
   * @param {any} node the target object
   * @returns {boolean} the query result
   */
  const isNode = (element) => (element && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .some((x) => +element.nodeType === x)) || false;

  /**
   * Check if a target object is `Window`.
   * => equivalent to `object instanceof Window`
   *
   * @param {any} object the target object
   * @returns {boolean} the query result
   */
  const isWindow = (object) => (object && object.constructor.name === 'Window') || false;

  /**
   * Checks if an object is a `Document`.
   * @see https://dom.spec.whatwg.org/#node
   *
   * @param {any} object the target object
   * @returns {boolean} the query result
   */
  const isDocument = (object) => (object && object.nodeType === 9) || false;

  /**
   * Returns the `document` or the `#document` element.
   * @see https://github.com/floating-ui/floating-ui
   * @param {(Node | Window)=} node
   * @returns {Document}
   */
  function getDocument(node) {
    // node instanceof Document
    if (isDocument(node)) return node;
    // node instanceof Node
    if (isNode(node)) return node.ownerDocument;
    // node instanceof Window
    if (isWindow(node)) return node.document;
    // node is undefined | NULL
    return window.document;
  }

  /**
   * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByClassName`.
   *
   * @param {string} selector the class name
   * @param {ParentNode=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    const lookUp = isNode(parent) ? parent : getDocument();
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
   * or find one that matches a selector.
   *
   * @param {Node | string} selector the input selector or target element
   * @param {ParentNode=} parent optional node to look into
   * @return {HTMLElement?} the `HTMLElement` or `querySelector` result
   */
  function querySelector(selector, parent) {
    if (isNode(selector)) {
      return selector;
    }
    const lookUp = isNode(parent) ? parent : getDocument();

    return lookUp.querySelector(selector);
  }

  /**
   * Add class to `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to add
   * @returns {void}
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  /**
   * Check class in `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to check
   * @returns {boolean}
   */
  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  /**
   * Remove class from `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to remove
   * @returns {void}
   */
  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  /**
   * Shortcut for the `Element.dispatchEvent(Event)` method.
   *
   * @param {HTMLElement} element is the target
   * @param {Event} event is the `Event` object
   */
  const dispatchEvent = (element, event) => element.dispatchEvent(event);

  /**
   * A global namespace for 'transitionend' string.
   * @type {string}
   */
  const transitionEndEvent = 'transitionend';

  /**
   * A global namespace for 'transitionDelay' string.
   * @type {string}
   */
  const transitionDelay = 'transitionDelay';

  /**
   * A global namespace for `transitionProperty` string for modern browsers.
   *
   * @type {string}
   */
  const transitionProperty = 'transitionProperty';

  /**
   * Shortcut for `window.getComputedStyle(element).propertyName`
   * static method.
   *
   * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
   * throws a `ReferenceError`.
   *
   * @param {HTMLElement} element target
   * @param {string} property the css property
   * @return {string} the css property value
   */
  function getElementStyle(element, property) {
    const computedStyle = getComputedStyle(element);

    // must use camelcase strings,
    // or non-camelcase strings with `getPropertyValue`
    return property.includes('--')
      ? computedStyle.getPropertyValue(property)
      : computedStyle[property];
  }

  /**
   * Utility to get the computed `transitionDelay`
   * from Element in miliseconds.
   *
   * @param {HTMLElement} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDelay(element) {
    const propertyValue = getElementStyle(element, transitionProperty);
    const delayValue = getElementStyle(element, transitionDelay);
    const delayScale = delayValue.includes('ms') ? /* istanbul ignore next */1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale : 0;

    return !Number.isNaN(duration) ? duration : /* istanbul ignore next */0;
  }

  /**
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  const transitionDuration = 'transitionDuration';

  /**
   * Utility to get the computed `transitionDuration`
   * from Element in miliseconds.
   *
   * @param {HTMLElement} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDuration(element) {
    const propertyValue = getElementStyle(element, transitionProperty);
    const durationValue = getElementStyle(element, transitionDuration);
    const durationScale = durationValue.includes('ms') ? /* istanbul ignore next */1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : /* istanbul ignore next */0;
  }

  /**
   * Utility to make sure callbacks are consistently
   * called when transition ends.
   *
   * @param {HTMLElement} element target
   * @param {EventListener} handler `transitionend` callback
   */
  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);
    const delay = getElementTransitionDelay(element);

    if (duration) {
      /**
       * Wrap the handler in on -> off callback
       * @type {EventListener} e Event object
       */
      const transitionEndWrapper = (e) => {
        /* istanbul ignore else */
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      };
      element.addEventListener(transitionEndEvent, transitionEndWrapper);
      setTimeout(() => {
        /* istanbul ignore next */
        if (!called) dispatchEvent(element, endEvent);
      }, duration + delay + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  /**
   * Utility to force re-paint of an `HTMLElement` target.
   *
   * @param {HTMLElement} element is the target
   * @return {number} the `Element.offsetHeight` value
   */
  const reflow = (element) => element.offsetHeight;

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

  /**
   * Checks if an element is an `HTMLElement`.
   * @see https://dom.spec.whatwg.org/#node
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  const isHTMLElement = (element) => (element && element.nodeType === 1) || false;

  /** @type {Map<string, Map<HTMLElement, Record<string, any>>>} */
  const componentData = new Map();
  /**
   * An interface for web components background data.
   * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
   */
  const Data = {
    /**
     * Sets web components data.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     * @param {Record<string, any>} instance the component instance
     */
    set: (element, component, instance) => {
      if (!isHTMLElement(element)) return;

      /* istanbul ignore else */
      if (!componentData.has(component)) {
        componentData.set(component, new Map());
      }

      const instanceMap = componentData.get(component);
      // not undefined, but defined right above
      instanceMap.set(element, instance);
    },

    /**
     * Returns all instances for specified component.
     * @param {string} component the component's name or a unique key
     * @returns {Map<HTMLElement, Record<string, any>>?} all the component instances
     */
    getAllFor: (component) => {
      const instanceMap = componentData.get(component);

      return instanceMap || null;
    },

    /**
     * Returns the instance associated with the target.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     * @returns {Record<string, any>?} the instance
     */
    get: (element, component) => {
      if (!isHTMLElement(element) || !component) return null;
      const allForC = Data.getAllFor(component);
      const instance = element && allForC && allForC.get(element);

      return instance || null;
    },

    /**
     * Removes web components data.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     */
    remove: (element, component) => {
      const instanceMap = componentData.get(component);
      if (!instanceMap || !isHTMLElement(element)) return;

      instanceMap.delete(element);

      /* istanbul ignore else */
      if (instanceMap.size === 0) {
        componentData.delete(component);
      }
    },
  };

  /**
   * An alias for `Data.get()`.
   * @type {SHORTY.getInstance<any>}
   */
  const getInstance = (target, component) => Data.get(target, component);

  /** @type {Map<HTMLElement, any>} */
  const TimeCache = new Map();
  /**
   * An interface for one or more `TimerHandler`s per `Element`.
   * @see https://github.com/thednp/navbar.js/
   */
  const Timer = {
    /**
     * Sets a new timeout timer for an element, or element -> key association.
     * @param {HTMLElement} element target element
     * @param {ReturnType<TimerHandler>} callback the callback
     * @param {number} delay the execution delay
     * @param {string=} key a unique key
     */
    set: (element, callback, delay, key) => {
      if (!isHTMLElement(element)) return;

      /* istanbul ignore else */
      if (key && key.length) {
        /* istanbul ignore else */
        if (!TimeCache.has(element)) {
          TimeCache.set(element, new Map());
        }
        const keyTimers = TimeCache.get(element);
        keyTimers.set(key, setTimeout(callback, delay));
      } else {
        TimeCache.set(element, setTimeout(callback, delay));
      }
    },

    /**
     * Returns the timer associated with the target.
     * @param {HTMLElement} element target element
     * @param {string=} key a unique
     * @returns {number?} the timer
     */
    get: (element, key) => {
      if (!isHTMLElement(element)) return null;
      const keyTimers = TimeCache.get(element);

      if (key && key.length && keyTimers && keyTimers.get) {
        return keyTimers.get(key) || /* istanbul ignore next */null;
      }
      return keyTimers || null;
    },

    /**
     * Clears the element's timer.
     * @param {HTMLElement} element target element
     * @param {string=} key a unique key
     */
    clear: (element, key) => {
      if (!isHTMLElement(element)) return;

      if (key && key.length) {
        const keyTimers = TimeCache.get(element);
        /* istanbul ignore else */
        if (keyTimers && keyTimers.get) {
          clearTimeout(keyTimers.get(key));
          keyTimers.delete(key);
          /* istanbul ignore else */
          if (keyTimers.size === 0) {
            TimeCache.delete(element);
          }
        }
      } else {
        clearTimeout(TimeCache.get(element));
        TimeCache.delete(element);
      }
    },
  };

  /**
   * Checks if an object is an `Object`.
   *
   * @param {any} obj the target object
   * @returns {boolean} the query result
   */
  const isObject = (obj) => (typeof obj === 'object') || false;

  /**
   * Returns a namespaced `CustomEvent` specific to each component.
   * @param {string} EventType Event.type
   * @param {Record<string, any>=} config Event.options | Event.properties
   * @returns {SHORTY.OriginalEvent} a new namespaced event
   */
  function OriginalEvent(EventType, config) {
    const OriginalCustomEvent = new CustomEvent(EventType, {
      cancelable: true, bubbles: true,
    });

    /* istanbul ignore else */
    if (isObject(config)) {
      ObjectAssign(OriginalCustomEvent, config);
    }
    return OriginalCustomEvent;
  }

  /** @type {Record<string, any>} */
  const EventRegistry = {};

  /**
   * The global event listener.
   *
   * @type {EventListener}
   * @this {EventTarget}
   */
  function globalListener(e) {
    const that = this;
    const { type } = e;

    [...EventRegistry[type]].forEach((elementsMap) => {
      const [element, listenersMap] = elementsMap;
      /* istanbul ignore else */
      if (element === that) {
        [...listenersMap].forEach((listenerMap) => {
          const [listener, options] = listenerMap;
          listener.apply(element, [e]);

          if (options && options.once) {
            removeListener(element, type, listener, options);
          }
        });
      }
    });
  }

  /**
   * Register a new listener with its options and attach the `globalListener`
   * to the target if this is the first listener.
   *
   * @type {Listener.ListenerAction<EventTarget>}
   */
  const addListener = (element, eventType, listener, options) => {
    // get element listeners first
    if (!EventRegistry[eventType]) {
      EventRegistry[eventType] = new Map();
    }
    const oneEventMap = EventRegistry[eventType];

    if (!oneEventMap.has(element)) {
      oneEventMap.set(element, new Map());
    }
    const oneElementMap = oneEventMap.get(element);

    // get listeners size
    const { size } = oneElementMap;

    // register listener with its options
    oneElementMap.set(listener, options);

    // add listener last
    if (!size) {
      element.addEventListener(eventType, globalListener, options);
    }
  };

  /**
   * Remove a listener from registry and detach the `globalListener`
   * if no listeners are found in the registry.
   *
   * @type {Listener.ListenerAction<EventTarget>}
   */
  const removeListener = (element, eventType, listener, options) => {
    // get listener first
    const oneEventMap = EventRegistry[eventType];
    const oneElementMap = oneEventMap && oneEventMap.get(element);
    const savedOptions = oneElementMap && oneElementMap.get(listener);

    // also recover initial options
    const { options: eventOptions } = savedOptions !== undefined
      ? savedOptions
      : { options };

    // unsubscribe second, remove from registry
    if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
    if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
    if (!oneEventMap || !oneEventMap.size) delete EventRegistry[eventType];

    // remove listener last
    /* istanbul ignore else */
    if (!oneElementMap || !oneElementMap.size) {
      element.removeEventListener(eventType, globalListener, eventOptions);
    }
  };

  /**
   * Global namespace for most components `collapsing` class.
   * As used by `Collapse` / `Tab`.
   */
  const collapsingClass = 'collapsing';

  /**
   * Global namespace for most components active class.
   */
  const activeClass = 'active';

  /**
   * Global namespace for most components `fade` class.
   */
  const fadeClass = 'fade';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /**
   * Global namespace for `Dropdown` types / classes.
   */
  const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /** @type {string} */
  const tabString = 'tab';

  /** @type {string} */
  const tabComponent = 'Tab';

  /**
   * Shortcut for `HTMLElement.getAttribute()` method.
   * @param {HTMLElement} element target element
   * @param {string} attribute attribute name
   * @returns {string?} attribute value
   */
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

  /**
   * Global namespace for most components `target` option.
   */
  const dataBsTarget = 'data-bs-target';

  /**
   * Global namespace for most components `parent` option.
   */
  const dataBsParent = 'data-bs-parent';

  /**
   * Global namespace for most components `container` option.
   */
  const dataBsContainer = 'data-bs-container';

  /**
   * Returns the `Element` that THIS one targets
   * via `data-bs-target`, `href`, `data-bs-parent` or `data-bs-container`.
   *
   * @param {HTMLElement} element the target element
   * @returns {HTMLElement?} the query result
   */
  function getTargetElement(element) {
    const targetAttr = [dataBsTarget, dataBsParent, dataBsContainer, 'href'];
    const doc = getDocument(element);

    return targetAttr.map((att) => {
      const attValue = getAttribute(element, att);
      if (attValue) {
        return att === dataBsParent ? closest(element, attValue) : querySelector(attValue, doc);
      }
      return null;
    }).filter((x) => x)[0];
  }

  /**
   * The raw value or a given component option.
   *
   * @typedef {string | HTMLElement | Function | number | boolean | null} niceValue
   */

  /**
   * Utility to normalize component options
   *
   * @param {any} value the input value
   * @return {niceValue} the normalized value
   */
  function normalizeValue(value) {
    if (['true', true].includes(value)) { // boolean
    // if ('true' === value) { // boolean
      return true;
    }

    if (['false', false].includes(value)) { // boolean
    // if ('false' === value) { // boolean
      return false;
    }

    if (value === '' || value === 'null') { // null
      return null;
    }

    if (value !== '' && !Number.isNaN(+value)) { // number
      return +value;
    }

    // string / function / HTMLElement / object
    return value;
  }

  /**
   * Shortcut for `Object.keys()` static method.
   * @param  {Record<string, any>} obj a target object
   * @returns {string[]}
   */
  const ObjectKeys = (obj) => Object.keys(obj);

  /**
   * Shortcut for `String.toLowerCase()`.
   *
   * @param {string} source input string
   * @returns {string} lowercase output string
   */
  const toLowerCase = (source) => source.toLowerCase();

  /**
   * Utility to normalize component options.
   *
   * @param {HTMLElement} element target
   * @param {Record<string, any>} defaultOps component default options
   * @param {Record<string, any>} inputOps component instance options
   * @param {string=} ns component namespace
   * @return {Record<string, any>} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const data = { ...element.dataset };
    /** @type {Record<string, any>} */
    const normalOps = {};
    /** @type {Record<string, any>} */
    const dataOps = {};
    const title = 'title';

    ObjectKeys(data).forEach((k) => {
      const key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => toLowerCase(match))
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

    ObjectKeys(inputOps).forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

    ObjectKeys(defaultOps).forEach((k) => {
      /* istanbul ignore else */
      if (k in inputOps) {
        normalOps[k] = inputOps[k];
      } else if (k in dataOps) {
        normalOps[k] = dataOps[k];
      } else {
        normalOps[k] = k === title
          ? getAttribute(element, title)
          : defaultOps[k];
      }
    });

    return normalOps;
  }

  var version = "4.2.0";

  const Version = version;

  /* Native JavaScript for Bootstrap 5 | Base Component
  ----------------------------------------------------- */

  /** Returns a new `BaseComponent` instance. */
  class BaseComponent {
    /**
     * @param {HTMLElement | string} target `Element` or selector string
     * @param {BSN.ComponentOptions=} config component instance options
     */
    constructor(target, config) {
      const self = this;
      const element = querySelector(target);

      if (!element) {
        throw Error(`${self.name} Error: "${target}" is not a valid selector.`);
      }

      /** @static @type {BSN.ComponentOptions} */
      self.options = {};

      const prevInstance = Data.get(element, self.name);
      if (prevInstance) prevInstance.dispose();

      /** @type {HTMLElement} */
      self.element = element;

      /* istanbul ignore else */
      if (self.defaults && ObjectKeys(self.defaults).length) {
        self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
      }

      Data.set(element, self.name, self);
    }

    /* eslint-disable */
    /* istanbul ignore next */
    /** @static */
    get version() { return Version; }

    /* eslint-enable */
    /* istanbul ignore next */
    /** @static */
    get name() { return this.constructor.name; }

    /* istanbul ignore next */
    /** @static */
    get defaults() { return this.constructor.defaults; }

    /**
     * Removes component from target element;
     */
    dispose() {
      const self = this;
      Data.remove(self.element, self.name);
      ObjectKeys(self).forEach((prop) => { self[prop] = null; });
    }
  }

  /* Native JavaScript for Bootstrap 5 | Tab
  ------------------------------------------ */

  // TAB PRIVATE GC
  // ================
  const tabSelector = `[${dataBsToggle}="${tabString}"]`;

  /**
   * Static method which returns an existing `Tab` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Tab>}
   */
  const getTabInstance = (element) => getInstance(element, tabComponent);

  /**
   * A `Tab` initialization callback.
   * @type {BSN.InitCallback<Tab>}
   */
  const tabInitCallback = (element) => new Tab(element);

  // TAB CUSTOM EVENTS
  // =================
  const showTabEvent = OriginalEvent(`show.bs.${tabString}`);
  const shownTabEvent = OriginalEvent(`shown.bs.${tabString}`);
  const hideTabEvent = OriginalEvent(`hide.bs.${tabString}`);
  const hiddenTabEvent = OriginalEvent(`hidden.bs.${tabString}`);

  /**
   * Stores the current active tab and its content
   * for a given `.nav` element.
   * @type {Map<HTMLElement, any>}
   */
  const tabPrivate = new Map();

  // TAB PRIVATE METHODS
  // ===================
  /**
   * Executes after tab transition has finished.
   * @param {Tab} self the `Tab` instance
   */
  function triggerTabEnd(self) {
    const { tabContent, nav } = self;

    /* istanbul ignore else */
    if (tabContent && hasClass(tabContent, collapsingClass)) {
      tabContent.style.height = '';
      removeClass(tabContent, collapsingClass);
    }

    /* istanbul ignore else */
    if (nav) Timer.clear(nav);
  }

  /**
   * Executes before showing the tab content.
   * @param {Tab} self the `Tab` instance
   */
  function triggerTabShow(self) {
    const {
      element, tabContent, content: nextContent, nav,
    } = self;
    const { tab } = nav && tabPrivate.get(nav);

    /* istanbul ignore else */
    if (tabContent && hasClass(nextContent, fadeClass)) {
      const { currentHeight, nextHeight } = tabPrivate.get(element);
      if (currentHeight === nextHeight) {
        triggerTabEnd(self);
      } else {
        // enables height animation
        setTimeout(() => {
          tabContent.style.height = `${nextHeight}px`;
          reflow(tabContent);
          emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
        }, 50);
      }
    } else if (nav) Timer.clear(nav);

    shownTabEvent.relatedTarget = tab;
    dispatchEvent(element, shownTabEvent);
  }

  /**
   * Executes before hiding the tab.
   * @param {Tab} self the `Tab` instance
   */
  function triggerTabHide(self) {
    const {
      element, content: nextContent, tabContent, nav,
    } = self;
    const { tab, content } = nav && tabPrivate.get(nav);
    let currentHeight = 0;

    /* istanbul ignore else */
    if (tabContent && hasClass(nextContent, fadeClass)) {
      [content, nextContent].forEach((c) => {
        addClass(c, 'overflow-hidden');
      });
      currentHeight = content.scrollHeight || /* istanbul ignore next */0;
    }

    // update relatedTarget and dispatch event
    showTabEvent.relatedTarget = tab;
    hiddenTabEvent.relatedTarget = element;
    dispatchEvent(element, showTabEvent);
    if (showTabEvent.defaultPrevented) return;

    addClass(nextContent, activeClass);
    removeClass(content, activeClass);

    /* istanbul ignore else */
    if (tabContent && hasClass(nextContent, fadeClass)) {
      const nextHeight = nextContent.scrollHeight;
      tabPrivate.set(element, { currentHeight, nextHeight });

      addClass(tabContent, collapsingClass);
      tabContent.style.height = `${currentHeight}px`;
      reflow(tabContent);
      [content, nextContent].forEach((c) => {
        removeClass(c, 'overflow-hidden');
      });
    }

    if (nextContent && hasClass(nextContent, fadeClass)) {
      setTimeout(() => {
        addClass(nextContent, showClass);
        emulateTransitionEnd(nextContent, () => {
          triggerTabShow(self);
        });
      }, 1);
    } else {
      addClass(nextContent, showClass);
      triggerTabShow(self);
    }

    dispatchEvent(tab, hiddenTabEvent);
  }

  /**
   * Returns the current active tab and its target content.
   * @param {Tab} self the `Tab` instance
   * @returns {Record<string, any>} the query result
   */
  function getActiveTab(self) {
    const { nav } = self;

    const activeTabs = getElementsByClassName(activeClass, nav);
    /** @type {(HTMLElement)=} */
    let tab;
    /* istanbul ignore else */
    if (activeTabs.length === 1
      && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentElement, c))) {
      [tab] = activeTabs;
    } else if (activeTabs.length > 1) {
      tab = activeTabs[activeTabs.length - 1];
    }
    const content = tab ? getTargetElement(tab) : null;
    return { tab, content };
  }

  /**
   * Returns a parent dropdown.
   * @param {HTMLElement} element the `Tab` element
   * @returns {HTMLElement?} the parent dropdown
   */
  function getParentDropdown(element) {
    const dropdown = closest(element, `.${dropdownMenuClasses.join(',.')}`);
    return dropdown ? querySelector(`.${dropdownMenuClasses[0]}-toggle`, dropdown) : null;
  }

  /**
   * Toggles on/off the `click` event listener.
   * @param {Tab} self the `Tab` instance
   * @param {boolean=} add when `true`, event listener is added
   */
  function toggleTabHandler(self, add) {
    const action = add ? addListener : removeListener;
    action(self.element, mouseclickEvent, tabClickHandler);
  }

  // TAB EVENT HANDLER
  // =================
  /**
   * Handles the `click` event listener.
   * @this {HTMLElement}
   * @param {MouseEvent} e the `Event` object
   */
  function tabClickHandler(e) {
    const self = getTabInstance(this);
    /* istanbul ignore next: must filter */
    if (!self) return;
    e.preventDefault();

    self.show();
  }

  // TAB DEFINITION
  // ==============
  /** Creates a new `Tab` instance. */
  class Tab extends BaseComponent {
    /**
     * @param {HTMLElement | string} target the target element
     */
    constructor(target) {
      super(target);
      // bind
      const self = this;

      // initialization element
      const { element } = self;
      const content = getTargetElement(element);

      // no point initializing a tab without a corresponding content
      if (!content) return;

      const nav = closest(element, '.nav');
      const container = closest(content, '.tab-content');

      /** @type {HTMLElement?} */
      self.nav = nav;
      /** @type {HTMLElement} */
      self.content = content;
      /** @type {HTMLElement?} */
      self.tabContent = container;

      // event targets
      /** @type {HTMLElement?} */
      self.dropdown = getParentDropdown(element);

      // show first Tab instance of none is shown
      // suggested on #432
      const { tab } = getActiveTab(self);
      if (nav && !tab) {
        const firstTab = querySelector(tabSelector, nav);
        const firstTabContent = firstTab && getTargetElement(firstTab);

        /* istanbul ignore else */
        if (firstTabContent) {
          addClass(firstTab, activeClass);
          addClass(firstTabContent, showClass);
          addClass(firstTabContent, activeClass);
          setAttribute(element, ariaSelected, 'true');
        }
      }

      // add event listener
      toggleTabHandler(self, true);
    }

    /* eslint-disable */
    /**
     * Returns component name string.
     */  
    get name() { return tabComponent; }
    /* eslint-enable */

    // TAB PUBLIC METHODS
    // ==================
    /** Shows the tab to the user. */
    show() {
      const self = this;
      const {
        element, content: nextContent, nav, dropdown,
      } = self;

      /* istanbul ignore else */
      if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
        const { tab, content } = getActiveTab(self);

        /* istanbul ignore else */
        if (nav) tabPrivate.set(nav, { tab, content });

        // update relatedTarget and dispatch
        hideTabEvent.relatedTarget = element;

        dispatchEvent(tab, hideTabEvent);
        if (hideTabEvent.defaultPrevented) return;

        addClass(element, activeClass);
        setAttribute(element, ariaSelected, 'true');

        const activeDropdown = getParentDropdown(tab);
        if (activeDropdown && hasClass(activeDropdown, activeClass)) {
          removeClass(activeDropdown, activeClass);
        }

        /* istanbul ignore else */
        if (nav) {
          const toggleTab = () => {
            removeClass(tab, activeClass);
            setAttribute(tab, ariaSelected, 'false');
            if (dropdown && !hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
          };

          if (hasClass(content, fadeClass) || hasClass(nextContent, fadeClass)) {
            Timer.set(nav, toggleTab, 1);
          } else toggleTab();
        }

        removeClass(content, showClass);
        if (hasClass(content, fadeClass)) {
          emulateTransitionEnd(content, () => triggerTabHide(self));
        } else {
          triggerTabHide(self);
        }
      }
    }

    /** Removes the `Tab` component from the target element. */
    dispose() {
      toggleTabHandler(this);
      super.dispose();
    }
  }

  ObjectAssign(Tab, {
    selector: tabSelector,
    init: tabInitCallback,
    getInstance: getTabInstance,
  });

  return Tab;

}));
