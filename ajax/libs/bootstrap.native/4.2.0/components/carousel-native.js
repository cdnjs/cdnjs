/*!
  * Native JavaScript for Bootstrap - Carousel v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Carousel = factory());
})(this, (function () { 'use strict';

  /**
   * A global namespace for `mouseenter` event.
   * @type {string}
   */
  const mouseenterEvent = 'mouseenter';

  /**
   * A global namespace for `mouseleave` event.
   * @type {string}
   */
  const mouseleaveEvent = 'mouseleave';

  /**
   * A global namespace for `click` event.
   * @type {string}
   */
  const mouseclickEvent = 'click';

  /**
   * A global namespace for `keydown` event.
   * @type {string}
   */
  const keydownEvent = 'keydown';

  /**
   * A global namespace for `ArrowLeft` key.
   * @type {string} e.which = 37 equivalent
   */
  const keyArrowLeft = 'ArrowLeft';

  /**
   * A global namespace for `ArrowRight` key.
   * @type {string} e.which = 39 equivalent
   */
  const keyArrowRight = 'ArrowRight';

  /**
   * A global namespace for `pointerdown` event.
   * @type {string}
   */
  const pointerdownEvent = 'pointerdown';

  /**
   * A global namespace for `pointermove` event.
   * @type {string}
   */
  const pointermoveEvent = 'pointermove';

  /**
   * A global namespace for `pointerup` event.
   * @type {string}
   */
  const pointerupEvent = 'pointerup';

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
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  const transitionDuration = 'transitionDuration';

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
   * Checks if an element is an `HTMLElement`.
   * @see https://dom.spec.whatwg.org/#node
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  const isHTMLElement = (element) => (element && element.nodeType === 1) || false;

  /**
   * Returns the bounding client rect of a target `HTMLElement`.
   *
   * @see https://github.com/floating-ui/floating-ui
   *
   * @param {HTMLElement} element event.target
   * @param {boolean=} includeScale when *true*, the target scale is also computed
   * @returns {SHORTY.BoundingClientRect} the bounding client rect object
   */
  function getBoundingClientRect(element, includeScale) {
    const {
      width, height, top, right, bottom, left,
    } = element.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      const { offsetWidth, offsetHeight } = element;
      scaleX = offsetWidth > 0 ? Math.round(width) / offsetWidth
        : /* istanbul ignore next */1;
      scaleY = offsetHeight > 0 ? Math.round(height) / offsetHeight
        : /* istanbul ignore next */1;
    }

    return {
      width: width / scaleX,
      height: height / scaleY,
      top: top / scaleY,
      right: right / scaleX,
      bottom: bottom / scaleY,
      left: left / scaleX,
      x: left / scaleX,
      y: top / scaleY,
    };
  }

  /**
   * Returns the `document.documentElement` or the `<html>` element.
   *
   * @param {(Node | Window)=} node
   * @returns {HTMLHtmlElement}
   */
  function getDocumentElement(node) {
    return getDocument(node).documentElement;
  }

  /**
   * Utility to determine if an `HTMLElement`
   * is partially visible in viewport.
   *
   * @param {HTMLElement} element target
   * @return {boolean} the query result
   */
  const isElementInScrollRange = (element) => {
    if (!element || !isNode(element)) return false;

    const { top, bottom } = getBoundingClientRect(element);
    const { clientHeight } = getDocumentElement(element);
    return top <= clientHeight && bottom >= 0;
  };

  /**
   * Checks if a page is Right To Left.
   * @param {HTMLElement=} node the target
   * @returns {boolean} the query result
   */
  const isRTL = (node) => getDocumentElement(node).dir === 'rtl';

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
   * Shortcut for `HTMLElement.getAttribute()` method.
   * @param {HTMLElement} element target element
   * @param {string} attribute attribute name
   * @returns {string?} attribute value
   */
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

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
   * Utility to force re-paint of an `HTMLElement` target.
   *
   * @param {HTMLElement} element is the target
   * @return {number} the `Element.offsetHeight` value
   */
  const reflow = (element) => element.offsetHeight;

  /**
   * A global namespace for most scroll event listeners.
   * @type {Partial<AddEventListenerOptions>}
   */
  const passiveHandler = { passive: true };

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
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

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
   * Global namespace for most components active class.
   */
  const activeClass = 'active';

  /**
   * Global namespace for most components `target` option.
   */
  const dataBsTarget = 'data-bs-target';

  /** @type {string} */
  const carouselString = 'carousel';

  /** @type {string} */
  const carouselComponent = 'Carousel';

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

  /* Native JavaScript for Bootstrap 5 | Carousel
  ----------------------------------------------- */

  // CAROUSEL PRIVATE GC
  // ===================
  const carouselSelector = `[data-bs-ride="${carouselString}"]`;
  const carouselItem = `${carouselString}-item`;
  const dataBsSlideTo = 'data-bs-slide-to';
  const dataBsSlide = 'data-bs-slide';
  const pausedClass = 'paused';

  const carouselDefaults = {
    pause: 'hover',
    keyboard: false,
    touch: true,
    interval: 5000,
  };

  /**
   * Static method which returns an existing `Carousel` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Carousel>}
   */
  const getCarouselInstance = (element) => getInstance(element, carouselComponent);

  /**
   * A `Carousel` initialization callback.
   * @type {BSN.InitCallback<Carousel>}
   */
  const carouselInitCallback = (element) => new Carousel(element);

  let startX = 0;
  let currentX = 0;
  let endX = 0;

  // CAROUSEL CUSTOM EVENTS
  // ======================
  const carouselSlideEvent = OriginalEvent(`slide.bs.${carouselString}`);
  const carouselSlidEvent = OriginalEvent(`slid.bs.${carouselString}`);

  // CAROUSEL EVENT HANDLERS
  // =======================
  /**
   * The `transitionend` event listener of the `Carousel`.
   * @param {Carousel} self the `Carousel` instance
   */
  function carouselTransitionEndHandler(self) {
    const {
      index, direction, element, slides, options,
    } = self;

    // discontinue disposed instances
    /* istanbul ignore else */
    if (self.isAnimating && getCarouselInstance(element)) {
      const activeItem = getActiveIndex(self);
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';

      addClass(slides[index], activeClass);
      removeClass(slides[index], `${carouselItem}-${orientation}`);
      removeClass(slides[index], `${carouselItem}-${directionClass}`);

      removeClass(slides[activeItem], activeClass);
      removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

      dispatchEvent(element, carouselSlidEvent);
      Timer.clear(element, dataBsSlide);

      // check for element, might have been disposed
      if (!getDocument(element).hidden && options.interval
        && !self.isPaused) {
        self.cycle();
      }
    }
  }

  /**
   * Handles the `mouseenter` events when *options.pause*
   * is set to `hover`.
   *
   * @this {HTMLElement}
   */
  function carouselPauseHandler() {
    const element = this;
    const self = getCarouselInstance(element);
    /* istanbul ignore else */
    if (self && !self.isPaused && !Timer.get(element, pausedClass)) {
      addClass(element, pausedClass);
    }
  }

  /**
   * Handles the `mouseleave` events when *options.pause*
   * is set to `hover`.
   *
   * @this {HTMLElement}
   */
  function carouselResumeHandler() {
    const element = this;
    const self = getCarouselInstance(element);
    /* istanbul ignore else */
    if (self && self.isPaused && !Timer.get(element, pausedClass)) {
      self.cycle();
    }
  }

  /**
   * Handles the `click` event for the `Carousel` indicators.
   *
   * @this {HTMLElement}
   * @param {MouseEvent} e the `Event` object
   */
  function carouselIndicatorHandler(e) {
    e.preventDefault();
    const indicator = this;
    const element = closest(indicator, carouselSelector) || getTargetElement(indicator);
    const self = getCarouselInstance(element);

    if (!self || self.isAnimating) return;

    const newIndex = +getAttribute(indicator, dataBsSlideTo);

    if (indicator && !hasClass(indicator, activeClass) // event target is not active
      && !Number.isNaN(newIndex)) { // AND has the specific attribute
      self.to(newIndex); // do the slide
    }
  }

  /**
   * Handles the `click` event for the `Carousel` arrows.
   *
   * @this {HTMLElement}
   * @param {MouseEvent} e the `Event` object
   */
  function carouselControlsHandler(e) {
    e.preventDefault();
    const control = this;
    const element = closest(control, carouselSelector) || getTargetElement(control);
    const self = getCarouselInstance(element);

    if (!self || self.isAnimating) return;
    const orientation = getAttribute(control, dataBsSlide);

    /* istanbul ignore else */
    if (orientation === 'next') {
      self.next();
    } else if (orientation === 'prev') {
      self.prev();
    }
  }

  /**
   * Handles the keyboard `keydown` event for the visible `Carousel` elements.
   *
   * @param {KeyboardEvent} e the `Event` object
   */
  function carouselKeyHandler({ code, target }) {
    const doc = getDocument(target);
    const [element] = [...querySelectorAll(carouselSelector, doc)]
      .filter((x) => isElementInScrollRange(x));
    const self = getCarouselInstance(element);

    /* istanbul ignore next */
    if (!self || self.isAnimating || /textarea|input/i.test(target.tagName)) return;
    const RTL = isRTL(element);
    const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
    const arrowKeyPrev = !RTL ? keyArrowLeft : keyArrowRight;

    /* istanbul ignore else */
    if (code === arrowKeyPrev) self.prev();
    else if (code === arrowKeyNext) self.next();
  }

  // CAROUSEL TOUCH HANDLERS
  // =======================
  /**
   * Handles the `pointerdown` event for the `Carousel` element.
   *
   * @this {HTMLElement}
   * @param {PointerEvent} e the `Event` object
   */
  function carouselPointerDownHandler(e) {
    const element = this;
    const { target } = e;
    const self = getCarouselInstance(element);

    // filter pointer event on controls & indicators
    const { controls, indicators } = self;
    if ([...controls, ...indicators].some((el) => (el === target || el.contains(target)))) {
      return;
    }

    if (!self || self.isAnimating || self.isTouch) { return; }

    startX = e.pageX;

    /* istanbul ignore else */
    if (element.contains(target)) {
      self.isTouch = true;
      toggleCarouselTouchHandlers(self, true);
    }
  }

  /**
   * Handles the `pointermove` event for the `Carousel` element.
   *
   * @this {HTMLElement}
   * @param {PointerEvent} e
   */
  function carouselPointerMoveHandler(e) {
    // const self = getCarouselInstance(this);

    // if (!self || !self.isTouch) { return; }

    currentX = e.pageX;
  }

  /**
   * Handles the `pointerup` event for the `Carousel` element.
   *
   * @this {HTMLElement}

   * @param {PointerEvent} e
   */
  function carouselPointerUpHandler(e) {
    const { target } = e;
    const doc = getDocument(target);
    const self = [...querySelectorAll(carouselSelector, doc)]
      .map((c) => getCarouselInstance(c)).find((i) => i.isTouch);

    // impossible to satisfy
    /* istanbul ignore next */
    if (!self) { return; }

    const { element, index } = self;
    const RTL = isRTL(target);

    self.isTouch = false;
    toggleCarouselTouchHandlers(self);

    if (doc.getSelection().toString().length) {
      // reset pointer position
      startX = 0; currentX = 0; endX = 0;
      return;
    }

    endX = e.pageX;

    // the event target is outside the carousel context
    // OR swipe distance is less than 120px
    /* istanbul ignore else */
    if (!element.contains(target) || Math.abs(startX - endX) < 120) {
      // reset pointer position
      startX = 0; currentX = 0; endX = 0;
      return;
    }
    // OR determine next index to slide to
    /* istanbul ignore else */
    if (currentX < startX) {
      self.to(index + (RTL ? -1 : 1));
    } else if (currentX > startX) {
      self.to(index + (RTL ? 1 : -1));
    }
    // reset pointer position
    startX = 0; currentX = 0; endX = 0;
  }

  // CAROUSEL PRIVATE METHODS
  // ========================
  /**
   * Sets active indicator for the `Carousel` instance.
   * @param {Carousel} self the `Carousel` instance
   * @param {number} pageIndex the index of the new active indicator
   */
  function activateCarouselIndicator(self, pageIndex) {
    const { indicators } = self;
    [...indicators].forEach((x) => removeClass(x, activeClass));

    /* istanbul ignore else */
    if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
  }

  /**
   * Toggles the pointer event listeners for a given `Carousel` instance.
   * @param {Carousel} self the `Carousel` instance
   * @param {boolean=} add when `TRUE` event listeners are added
   */
  function toggleCarouselTouchHandlers(self, add) {
    const { element } = self;
    const action = add ? addListener : removeListener;
    action(getDocument(element), pointermoveEvent, carouselPointerMoveHandler, passiveHandler);
    action(getDocument(element), pointerupEvent, carouselPointerUpHandler, passiveHandler);
  }

  /**
   * Toggles all event listeners for a given `Carousel` instance.
   * @param {Carousel} self the `Carousel` instance
   * @param {boolean=} add when `TRUE` event listeners are added
   */
  function toggleCarouselHandlers(self, add) {
    const {
      element, options, slides, controls, indicators,
    } = self;
    const {
      touch, pause, interval, keyboard,
    } = options;
    const action = add ? addListener : removeListener;

    if (pause && interval) {
      action(element, mouseenterEvent, carouselPauseHandler);
      action(element, mouseleaveEvent, carouselResumeHandler);
    }

    if (touch && slides.length > 2) {
      action(element, pointerdownEvent, carouselPointerDownHandler, passiveHandler);
    }

    /* istanbul ignore else */
    if (controls.length) {
      controls.forEach((arrow) => {
        /* istanbul ignore else */
        if (arrow) action(arrow, mouseclickEvent, carouselControlsHandler);
      });
    }

    /* istanbul ignore else */
    if (indicators.length) {
      indicators.forEach((indicator) => {
        action(indicator, mouseclickEvent, carouselIndicatorHandler);
      });
    }

    if (keyboard) action(getDocument(element), keydownEvent, carouselKeyHandler);
  }

  /**
   * Returns the index of the current active item.
   * @param {Carousel} self the `Carousel` instance
   * @returns {number} the query result
   */
  function getActiveIndex(self) {
    const { slides, element } = self;
    const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
    return [...slides].indexOf(activeItem);
  }

  // CAROUSEL DEFINITION
  // ===================
  /** Creates a new `Carousel` instance. */
  class Carousel extends BaseComponent {
    /**
     * @param {HTMLElement | string} target mostly a `.carousel` element
     * @param {BSN.Options.Carousel=} config instance options
     */
    constructor(target, config) {
      super(target, config);
      // bind
      const self = this;
      // initialization element
      const { element } = self;

      // additional properties
      /** @type {string} */
      self.direction = isRTL(element) ? 'right' : 'left';
      /** @type {number} */
      self.index = 0;
      /** @type {boolean} */
      self.isTouch = false;

      // carousel elements
      // a LIVE collection is prefferable
      self.slides = getElementsByClassName(carouselItem, element);
      const { slides } = self;

      // invalidate when not enough items
      // no need to go further
      if (slides.length < 2) { return; }
      // external controls must be within same document context
      const doc = getDocument(element);

      self.controls = [
        ...querySelectorAll(`[${dataBsSlide}]`, element),
        ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`, doc),
      ];

      /** @type {HTMLElement?} */
      self.indicator = querySelector(`.${carouselString}-indicators`, element);

      // a LIVE collection is prefferable
      /** @type {HTMLElement[]} */
      self.indicators = [
        ...(self.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, self.indicator) : []),
        ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`, doc),
      ];

      // set JavaScript and DATA API options
      const { options } = self;

      // don't use TRUE as interval, it's actually 0, use the default 5000ms better
      self.options.interval = options.interval === true
        ? carouselDefaults.interval
        : options.interval;

      // set first slide active if none
      /* istanbul ignore else */
      if (getActiveIndex(self) < 0) {
        addClass(slides[0], activeClass);
        /* istanbul ignore else */
        if (self.indicators.length) activateCarouselIndicator(self, 0);
      }

      // attach event handlers
      toggleCarouselHandlers(self, true);

      // start to cycle if interval is set
      if (options.interval) self.cycle();
    }

    /* eslint-disable */
    /**
     * Returns component name string.
     */
    get name() { return carouselComponent; }
    /**
     * Returns component default options.
     */
    get defaults() { return carouselDefaults; }
    /* eslint-enable */

    /**
     * Check if instance is paused.
     * @returns {boolean}
    */
    get isPaused() {
      return hasClass(this.element, pausedClass);
    }

    /**
     * Check if instance is animating.
     * @returns {boolean}
    */
    get isAnimating() {
      return querySelector(`.${carouselItem}-next,.${carouselItem}-prev`, this.element) !== null;
    }

    // CAROUSEL PUBLIC METHODS
    // =======================
    /** Slide automatically through items. */
    cycle() {
      const self = this;
      const {
        element, options, isPaused, index,
      } = self;

      Timer.clear(element, carouselString);
      if (isPaused) {
        Timer.clear(element, pausedClass);
        removeClass(element, pausedClass);
      }

      Timer.set(element, () => {
        // it's very important to check self.element
        // where instance might have been disposed
        /* istanbul ignore else */
        if (self.element && !self.isPaused && !self.isTouch
          && isElementInScrollRange(element)) {
          self.to(index + 1);
        }
      }, options.interval, carouselString);
    }

    /** Pause the automatic cycle. */
    pause() {
      const self = this;
      const { element, options } = self;
      /* istanbul ignore else */
      if (!self.isPaused && options.interval) {
        addClass(element, pausedClass);
        Timer.set(element, () => {}, 1, pausedClass);
      }
    }

    /** Slide to the next item. */
    next() {
      const self = this;
      /* istanbul ignore else */
      if (!self.isAnimating) { self.to(self.index + 1); }
    }

    /** Slide to the previous item. */
    prev() {
      const self = this;
      /* istanbul ignore else */
      if (!self.isAnimating) { self.to(self.index - 1); }
    }

    /**
     * Jump to the item with the `idx` index.
     * @param {number} idx the index of the item to jump to
     */
    to(idx) {
      const self = this;
      const {
        element, slides, options,
      } = self;
      const activeItem = getActiveIndex(self);
      const RTL = isRTL(element);
      let next = idx;

      // when controled via methods, make sure to check again
      // first return if we're on the same item #227
      // `to()` must be SPAM protected by Timer
      if (self.isAnimating || activeItem === next || Timer.get(element, dataBsSlide)) return;

      // determine transition direction
      /* istanbul ignore else */
      if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
        self.direction = RTL ? 'right' : 'left'; // next
      } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
        self.direction = RTL ? 'left' : 'right'; // prev
      }
      const { direction } = self;

      // find the right next index
      if (next < 0) { next = slides.length - 1; } else if (next >= slides.length) { next = 0; }

      // orientation, class name, eventProperties
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';

      const eventProperties = {
        relatedTarget: slides[next],
        from: activeItem,
        to: next,
        direction,
      };

      // update event properties
      ObjectAssign(carouselSlideEvent, eventProperties);
      ObjectAssign(carouselSlidEvent, eventProperties);

      // discontinue when prevented
      dispatchEvent(element, carouselSlideEvent);
      if (carouselSlideEvent.defaultPrevented) return;

      // update index
      self.index = next;
      activateCarouselIndicator(self, next);

      if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
        Timer.set(element, () => {
          addClass(slides[next], `${carouselItem}-${orientation}`);
          reflow(slides[next]);
          addClass(slides[next], `${carouselItem}-${directionClass}`);
          addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

          emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
        }, 0, dataBsSlide);
      } else {
        addClass(slides[next], activeClass);
        removeClass(slides[activeItem], activeClass);

        Timer.set(element, () => {
          Timer.clear(element, dataBsSlide);
          // check for element, might have been disposed
          /* istanbul ignore else */
          if (element && options.interval && !self.isPaused) {
            self.cycle();
          }

          dispatchEvent(element, carouselSlidEvent);
        }, 0, dataBsSlide);
      }
    }

    /** Remove `Carousel` component from target. */
    dispose() {
      const self = this;
      const { slides } = self;
      const itemClasses = ['start', 'end', 'prev', 'next'];

      [...slides].forEach((slide, idx) => {
        if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
        itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
      });

      toggleCarouselHandlers(self);
      super.dispose();
    }
  }

  ObjectAssign(Carousel, {
    selector: carouselSelector,
    init: carouselInitCallback,
    getInstance: getCarouselInstance,
  });

  return Carousel;

}));
