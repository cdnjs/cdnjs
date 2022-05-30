/*!
  * Native JavaScript for Bootstrap - Collapse v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory());
})(this, (function () { 'use strict';

  /**
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   * @returns {void}
   */
  const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

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
   * A shortcut for `(document|Element).querySelectorAll`.
   *
   * @param {string} selector the input selector
   * @param {ParentNode=} parent optional node to look into
   * @return {NodeListOf<HTMLElement>} the query result
   */
  function querySelectorAll(selector, parent) {
    const lookUp = isNode(parent) ? parent : getDocument();
    return lookUp.querySelectorAll(selector);
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
   * A global namespace for `click` event.
   * @type {string}
   */
  const mouseclickEvent = 'click';

  /**
   * A global namespace for aria-expanded.
   * @type {string}
   */
  const ariaExpanded = 'aria-expanded';

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
   * Shortcut for the `Element.dispatchEvent(Event)` method.
   *
   * @param {HTMLElement} element is the target
   * @param {Event} event is the `Event` object
   */
  const dispatchEvent = (element, event) => element.dispatchEvent(event);

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
   * Shortcut for `Object.entries()` static method.
   * @param  {Record<string, any>} obj a target object
   * @returns {[string, any][]}
   */
  const ObjectEntries = (obj) => Object.entries(obj);

  /**
   * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
   * @param  {HTMLElement} element target element
   * @param  {Partial<CSSStyleDeclaration>} styles attribute value
   */
  const setElementStyle = (element, styles) => {
    ObjectEntries(styles).forEach(([key, value]) => {
      if (key.includes('--')) {
        element.style.setProperty(key, value);
      } else {
        const propObject = {}; propObject[key] = value;
        ObjectAssign(element.style, propObject);
      }
    });
  };

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
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for most components `collapsing` class.
   * As used by `Collapse` / `Tab`.
   */
  const collapsingClass = 'collapsing';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /** @type {string} */
  const collapseString = 'collapse';

  /** @type {string} */
  const collapseComponent = 'Collapse';

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

  /* Native JavaScript for Bootstrap 5 | Collapse
  ----------------------------------------------- */

  // COLLAPSE GC
  // ===========
  const collapseSelector = `.${collapseString}`;
  const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
  const collapseDefaults = { parent: null };

  /**
   * Static method which returns an existing `Collapse` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Collapse>}
   */
  const getCollapseInstance = (element) => getInstance(element, collapseComponent);

  /**
   * A `Collapse` initialization callback.
   * @type {BSN.InitCallback<Collapse>}
   */
  const collapseInitCallback = (element) => new Collapse(element);

  // COLLAPSE CUSTOM EVENTS
  // ======================
  const showCollapseEvent = OriginalEvent(`show.bs.${collapseString}`);
  const shownCollapseEvent = OriginalEvent(`shown.bs.${collapseString}`);
  const hideCollapseEvent = OriginalEvent(`hide.bs.${collapseString}`);
  const hiddenCollapseEvent = OriginalEvent(`hidden.bs.${collapseString}`);

  // COLLAPSE PRIVATE METHODS
  // ========================
  /**
   * Expand the designated `Element`.
   * @param {Collapse} self the `Collapse` instance
   */
  function expandCollapse(self) {
    const {
      element, parent, triggers,
    } = self;

    dispatchEvent(element, showCollapseEvent);
    if (showCollapseEvent.defaultPrevented) return;

    Timer.set(element, () => {}, 17);
    if (parent) Timer.set(parent, () => {}, 17);

    addClass(element, collapsingClass);
    removeClass(element, collapseString);

    setElementStyle(element, { height: `${element.scrollHeight}px` });

    emulateTransitionEnd(element, () => {
      Timer.clear(element);
      if (parent) Timer.clear(parent);

      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'true'));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);
      addClass(element, showClass);

      setElementStyle(element, { height: '' });

      dispatchEvent(element, shownCollapseEvent);
    });
  }

  /**
   * Collapse the designated `Element`.
   * @param {Collapse} self the `Collapse` instance
   */
  function collapseContent(self) {
    const {
      element, parent, triggers,
    } = self;

    dispatchEvent(element, hideCollapseEvent);

    if (hideCollapseEvent.defaultPrevented) return;

    Timer.set(element, () => {}, 17);
    if (parent) Timer.set(parent, () => {}, 17);

    setElementStyle(element, { height: `${element.scrollHeight}px` });

    removeClass(element, collapseString);
    removeClass(element, showClass);
    addClass(element, collapsingClass);

    reflow(element);
    setElementStyle(element, { height: '0px' });

    emulateTransitionEnd(element, () => {
      Timer.clear(element);
      /* istanbul ignore else */
      if (parent) Timer.clear(parent);

      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'false'));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);

      setElementStyle(element, { height: '' });

      dispatchEvent(element, hiddenCollapseEvent);
    });
  }

  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   * @param {Collapse} self the `Collapse` instance
   * @param {boolean=} add when `true`, the event listener is added
   */
  function toggleCollapseHandler(self, add) {
    const action = add ? addListener : removeListener;
    const { triggers } = self;

    /* istanbul ignore else */
    if (triggers.length) {
      triggers.forEach((btn) => action(btn, mouseclickEvent, collapseClickHandler));
    }
  }

  // COLLAPSE EVENT HANDLER
  // ======================
  /**
   * Handles the `click` event for the `Collapse` instance.
   * @param {MouseEvent} e the `Event` object
   */
  function collapseClickHandler(e) {
    const { target } = e; // our target is `HTMLElement`
    const trigger = target && closest(target, collapseToggleSelector);
    const element = trigger && getTargetElement(trigger);
    const self = element && getCollapseInstance(element);
    /* istanbul ignore else */
    if (self) self.toggle();

    // event target is anchor link #398
    if (trigger && trigger.tagName === 'A') e.preventDefault();
  }

  // COLLAPSE DEFINITION
  // ===================

  /** Returns a new `Colapse` instance. */
  class Collapse extends BaseComponent {
    /**
     * @param {HTMLElement | string} target and `Element` that matches the selector
     * @param {BSN.Options.Collapse=} config instance options
     */
    constructor(target, config) {
      super(target, config);
      // bind
      const self = this;

      // initialization element
      const { element, options } = self;
      const doc = getDocument(element);

      // set triggering elements
      /** @type {HTMLElement[]} */
      self.triggers = [...querySelectorAll(collapseToggleSelector, doc)]
        .filter((btn) => getTargetElement(btn) === element);

      // set parent accordion
      /** @type {HTMLElement?} */
      self.parent = querySelector(options.parent, doc)
        || getTargetElement(element) || null;

      // add event listeners
      toggleCollapseHandler(self, true);
    }

    /* eslint-disable */
    /**
     * Returns component name string.
     */
    get name() { return collapseComponent; }
    /**
     * Returns component default options.
     */
    get defaults() { return collapseDefaults; }
    /* eslint-enable */

    // COLLAPSE PUBLIC METHODS
    // =======================
    /** Toggles the visibility of the collapse. */
    toggle() {
      const self = this;
      if (!hasClass(self.element, showClass)) self.show();
      else self.hide();
    }

    /** Hides the collapse. */
    hide() {
      const self = this;
      const { triggers, element } = self;
      if (Timer.get(element)) return;

      collapseContent(self);
      /* istanbul ignore else */
      if (triggers.length) {
        triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
      }
    }

    /** Shows the collapse. */
    show() {
      const self = this;
      const {
        element, parent, triggers,
      } = self;
      let activeCollapse;
      let activeCollapseInstance;

      if (parent) {
        activeCollapse = [...querySelectorAll(`.${collapseString}.${showClass}`, parent)]
          .find((i) => getCollapseInstance(i));
        activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
      }

      if ((!parent || !Timer.get(parent)) && !Timer.get(element)) {
        if (activeCollapseInstance && activeCollapse !== element) {
          collapseContent(activeCollapseInstance);
          activeCollapseInstance.triggers.forEach((btn) => {
            addClass(btn, `${collapseString}d`);
          });
        }

        expandCollapse(self);
        /* istanbul ignore else */
        if (triggers.length) {
          triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
        }
      }
    }

    /** Remove the `Collapse` component from the target `Element`. */
    dispose() {
      const self = this;
      toggleCollapseHandler(self);

      super.dispose();
    }
  }

  ObjectAssign(Collapse, {
    selector: collapseSelector,
    init: collapseInitCallback,
    getInstance: getCollapseInstance,
  });

  return Collapse;

}));
