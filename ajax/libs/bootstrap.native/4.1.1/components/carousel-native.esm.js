/*!
  * Native JavaScript for Bootstrap - Carousel v4.1.1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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
 * A global namespace for `touchmove` event.
 * @type {string}
 */
const touchmoveEvent = 'touchmove';

/**
 * A global namespace for `touchend` event.
 * @type {string}
 */
const touchendEvent = 'touchend';

/**
 * A global namespace for `touchstart` event.
 * @type {string}
 */
const touchstartEvent = 'touchstart';

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
 * Returns the `Window` object of a target node.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {(Node | HTMLElement | Element | Window)=} node target node
 * @returns {globalThis}
 */
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (!(node instanceof Window)) {
    const { ownerDocument } = node;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  // @ts-ignore
  return node;
}

/**
 * Returns the `document` or the `#document` element.
 * @see https://github.com/floating-ui/floating-ui
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {Document}
 */
function getDocument(node) {
  if (node instanceof HTMLElement) return node.ownerDocument;
  if (node instanceof Window) return node.document;
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
 * @param {HTMLElement | Element} element target
 * @param {string} property the css property
 * @return {string} the css property value
 */
function getElementStyle(element, property) {
  const computedStyle = getComputedStyle(element);

  // @ts-ignore -- must use camelcase strings,
  // or non-camelcase strings with `getPropertyValue`
  return property in computedStyle ? computedStyle[property] : '';
}

/**
 * Utility to get the computed `transitionDuration`
 * from Element in miliseconds.
 *
 * @param {HTMLElement | Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDuration(element) {
  const propertyValue = getElementStyle(element, transitionProperty);
  const durationValue = getElementStyle(element, transitionDuration);
  const durationScale = durationValue.includes('ms') ? 1 : 1000;
  const duration = propertyValue && propertyValue !== 'none'
    ? parseFloat(durationValue) * durationScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * Returns the bounding client rect of a target `HTMLElement`.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element} element event.target
 * @param {boolean=} includeScale when *true*, the target scale is also computed
 * @returns {SHORTER.BoundingClientRect} the bounding client rect object
 */
function getBoundingClientRect(element, includeScale) {
  const {
    width, height, top, right, bottom, left,
  } = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && element instanceof HTMLElement) {
    const { offsetWidth, offsetHeight } = element;
    scaleX = offsetWidth > 0 ? Math.round(width) / offsetWidth || 1 : 1;
    scaleY = offsetHeight > 0 ? Math.round(height) / offsetHeight || 1 : 1;
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
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {HTMLElement | HTMLHtmlElement}
 */
function getDocumentElement(node) {
  return getDocument(node).documentElement;
}

/**
 * Utility to determine if an `HTMLElement`
 * is partially visible in viewport.
 *
 * @param {HTMLElement | Element} element target
 * @return {boolean} the query result
 */
const isElementInScrollRange = (element) => {
  const { top, bottom } = getBoundingClientRect(element);
  const { clientHeight } = getDocumentElement(element);
  // checks bottom && top
  return top <= clientHeight && bottom >= 0;
};

/**
 * Checks if a page is Right To Left.
 * @param {(HTMLElement | Element)=} node the target
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
 * @param {HTMLElement | Element} element Element to look into
 * @param {string} selector the selector name
 * @return {(HTMLElement | Element)?} the query result
 */
function closest(element, selector) {
  return element ? (element.closest(selector)
    // @ts-ignore -- break out of `ShadowRoot`
    || closest(element.getRootNode().host, selector)) : null;
}

/**
 * A global array of possible `ParentNode`.
 */
const parentNodes = [Document, Element, HTMLElement];

/**
 * A global array with `Element` | `HTMLElement`.
 */
const elementNodes = [Element, HTMLElement];

/**
 * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
 * or find one that matches a selector.
 *
 * @param {HTMLElement | Element | string} selector the input selector or target element
 * @param {(HTMLElement | Element | Document)=} parent optional node to look into
 * @return {(HTMLElement | Element)?} the `HTMLElement` or `querySelector` result
 */
function querySelector(selector, parent) {
  const lookUp = parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();

  // @ts-ignore
  return elementNodes.some((x) => selector instanceof x)
    // @ts-ignore
    ? selector : lookUp.querySelector(selector);
}

/**
 * A shortcut for `(document|Element).querySelectorAll`.
 *
 * @param {string} selector the input selector
 * @param {(HTMLElement | Element | Document | Node)=} parent optional node to look into
 * @return {NodeListOf<HTMLElement | Element>} the query result
 */
function querySelectorAll(selector, parent) {
  const lookUp = parent && parentNodes
    .some((x) => parent instanceof x) ? parent : getDocument();
  // @ts-ignore -- `ShadowRoot` is also a node
  return lookUp.querySelectorAll(selector);
}

/**
 * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByClassName`.
 *
 * @param {string} selector the class name
 * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
 * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
 */
function getElementsByClassName(selector, parent) {
  const lookUp = parent && parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();
  return lookUp.getElementsByClassName(selector);
}

/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement | Element} element target element
 * @param {string} attribute attribute name
 * @returns {string?} attribute value
 */
const getAttribute = (element, attribute) => element.getAttribute(attribute);

/** @type {Map<HTMLElement | Element, any>} */
const TimeCache = new Map();
/**
 * An interface for one or more `TimerHandler`s per `Element`.
 * @see https://github.com/thednp/navbar.js/
 */
const Timer = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   * @param {HTMLElement | Element | string} target target element
   * @param {ReturnType<TimerHandler>} callback the callback
   * @param {number} delay the execution delay
   * @param {string=} key a unique key
   */
  set: (target, callback, delay, key) => {
    const element = querySelector(target);

    if (!element) return;

    if (key && key.length) {
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
   * @param {HTMLElement | Element | string} target target element
   * @param {string=} key a unique
   * @returns {number?} the timer
   */
  get: (target, key) => {
    const element = querySelector(target);

    if (!element) return null;
    const keyTimers = TimeCache.get(element);

    if (key && key.length && keyTimers && keyTimers.get) {
      return keyTimers.get(key) || null;
    }
    return keyTimers || null;
  },

  /**
   * Clears the element's timer.
   * @param {HTMLElement | Element | string} target target element
   * @param {string=} key a unique key
   */
  clear: (target, key) => {
    const element = querySelector(target);

    if (!element) return;

    if (key && key.length) {
      const keyTimers = TimeCache.get(element);

      if (keyTimers && keyTimers.get) {
        clearTimeout(keyTimers.get(key));
        keyTimers.delete(key);
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
 * @param {HTMLElement | Element} element is the target
 * @return {number} the `Element.offsetHeight` value
 */
// @ts-ignore
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
 * @param {HTMLElement | Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDelay(element) {
  const propertyValue = getElementStyle(element, transitionProperty);
  const delayValue = getElementStyle(element, transitionDelay);

  const delayScale = delayValue.includes('ms') ? 1 : 1000;
  const duration = propertyValue && propertyValue !== 'none'
    ? parseFloat(delayValue) * delayScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * Utility to make sure callbacks are consistently
 * called when transition ends.
 *
 * @param {HTMLElement | Element} element target
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
      if (e.target === element) {
        handler.apply(element, [e]);
        element.removeEventListener(transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    };
    element.addEventListener(transitionEndEvent, transitionEndWrapper);
    setTimeout(() => {
      if (!called) element.dispatchEvent(endEvent);
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

/**
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement | Element} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

/** @type {Map<string, Map<HTMLElement | Element, Record<string, any>>>} */
const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @param {Record<string, any>} instance the component instance
   */
  set: (target, component, instance) => {
    const element = querySelector(target);
    if (!element) return;

    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    // @ts-ignore - not undefined, but defined right above
    instanceMap.set(element, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {Map<HTMLElement | Element, Record<string, any>>?} all the component instances
   */
  getAllFor: (component) => {
    const instanceMap = componentData.get(component);

    return instanceMap || null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @returns {Record<string, any>?} the instance
   */
  get: (target, component) => {
    const element = querySelector(target);
    const allForC = Data.getAllFor(component);
    const instance = element && allForC && allForC.get(element);

    return instance || null;
  },

  /**
   * Removes web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   */
  remove: (target, component) => {
    const element = querySelector(target);
    const instanceMap = componentData.get(component);
    if (!instanceMap || !element) return;

    instanceMap.delete(element);

    if (instanceMap.size === 0) {
      componentData.delete(component);
    }
  },
};

/**
 * An alias for `Data.get()`.
 * @type {SHORTER.getInstance<any>}
 */
const getInstance = (target, component) => Data.get(target, component);

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} EventType Event.type
 * @param {Record<string, any>=} config Event.options | Event.properties
 * @returns {SHORTER.OriginalEvent} a new namespaced event
 */
function OriginalEvent(EventType, config) {
  const OriginalCustomEvent = new CustomEvent(EventType, {
    cancelable: true, bubbles: true,
  });

  if (config instanceof Object) {
    ObjectAssign(OriginalCustomEvent, config);
  }
  return OriginalCustomEvent;
}

/**
 * Add class to `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to add
 * @returns {void}
 */
function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

/**
 * Check class in `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to check
 * @returns {boolean}
 */
function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

/**
 * Remove class from `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
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
 * @this {Element | HTMLElement | Window | Document}
 * @param {Event} e
 * @returns {void}
 */
function globalListener(e) {
  const that = this;
  const { type } = e;
  const oneEvMap = EventRegistry[type] ? [...EventRegistry[type]] : [];

  oneEvMap.forEach((elementsMap) => {
    const [element, listenersMap] = elementsMap;
    [...listenersMap].forEach((listenerMap) => {
      if (element === that) {
        const [listener, options] = listenerMap;
        listener.apply(element, [e]);

        if (options && options.once) {
          removeListener(element, type, listener, options);
        }
      }
    });
  });
}

/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 *
 * @param {Element | HTMLElement | Window | Document} element
 * @param {string} eventType
 * @param {EventListenerObject['handleEvent']} listener
 * @param {AddEventListenerOptions=} options
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
  if (oneElementMap) {
    oneElementMap.set(listener, options);
  }

  // add listener last
  if (!size) {
    element.addEventListener(eventType, globalListener, options);
  }
};

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 * @param {Element | HTMLElement | Window | Document} element
 * @param {string} eventType
 * @param {EventListenerObject['handleEvent']} listener
 * @param {AddEventListenerOptions=} options
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
 * @param {HTMLElement | Element} element the target element
 * @returns {(HTMLElement | Element)?} the query result
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
  if (value === 'true') { // boolean
    return true;
  }

  if (value === 'false') { // boolean
    return false;
  }

  if (!Number.isNaN(+value)) { // number
    return +value;
  }

  if (value === '' || value === 'null') { // null
    return null;
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
 * @param {HTMLElement | Element} element target
 * @param {Record<string, any>} defaultOps component default options
 * @param {Record<string, any>} inputOps component instance options
 * @param {string=} ns component namespace
 * @return {Record<string, any>} normalized component options object
 */
function normalizeOptions(element, defaultOps, inputOps, ns) {
  // @ts-ignore -- our targets are always `HTMLElement`
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

var version = "4.1.1";

const Version = version;

/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

/** Returns a new `BaseComponent` instance. */
class BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target `Element` or selector string
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

    /** @type {HTMLElement | Element} */
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
    }

    Data.set(element, self.name, self);
  }

  /* eslint-disable */
  /** @static */
  get version() { return Version; }
  /* eslint-enable */

  /** @static */
  get name() { return this.constructor.name; }

  /** @static */
  // @ts-ignore
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    Data.remove(self.element, self.name);
    // @ts-ignore
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
 * Handles the `mouseenter` / `touchstart` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement | Element}
 */
function carouselPauseHandler() {
  const element = this;
  const self = getCarouselInstance(element);

  if (self && !self.isPaused && !Timer.get(element, pausedClass)) {
    addClass(element, pausedClass);
  }
}

/**
 * Handles the `mouseleave` / `touchend` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement | Element}
 */
function carouselResumeHandler() {
  const element = this;
  const self = getCarouselInstance(element);

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
  if (!element) return;
  const self = getCarouselInstance(element);

  if (!self || self.isAnimating) return;

  // @ts-ignore
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
  const self = element && getCarouselInstance(element);
  if (!self || self.isAnimating) return;
  const orientation = getAttribute(control, dataBsSlide);

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
function carouselKeyHandler({ code }) {
  const [element] = [...querySelectorAll(carouselSelector)]
    .filter((x) => isElementInScrollRange(x));

  const self = getCarouselInstance(element);
  if (!self) return;
  const RTL = isRTL();
  const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
  const arrowKeyPrev = !RTL ? keyArrowLeft : keyArrowRight;

  if (code === arrowKeyPrev) self.prev();
  else if (code === arrowKeyNext) self.next();
}

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Handles the `touchdown` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}
 * @param {TouchEvent} e the `Event` object
 */
function carouselTouchDownHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || self.isTouch) { return; }

  startX = e.changedTouches[0].pageX;

  // @ts-ignore
  if (element.contains(e.target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, true);
  }
}

/**
 * Handles the `touchmove` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}
 * @param {TouchEvent} e
 */
function carouselTouchMoveHandler(e) {
  const { changedTouches, type } = e;
  const self = getCarouselInstance(this);

  if (!self || !self.isTouch) { return; }

  currentX = changedTouches[0].pageX;

  // cancel touch if more than one changedTouches detected
  if (type === touchmoveEvent && changedTouches.length > 1) {
    e.preventDefault();
  }
}

/**
 * Handles the `touchend` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}

 * @param {TouchEvent} e
 */
function carouselTouchEndHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || !self.isTouch) { return; }

  endX = currentX || e.changedTouches[0].pageX;

  if (self.isTouch) {
    // the event target is outside the carousel OR carousel doens't include the related target
    // @ts-ignore
    if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
      && Math.abs(startX - endX) < 75) { // AND swipe distance is less than 75px
      // when the above conditions are satisfied, no need to continue
      return;
    } // OR determine next index to slide to
    if (currentX < startX) {
      self.index += 1;
    } else if (currentX > startX) {
      self.index -= 1;
    }

    self.isTouch = false;
    self.to(self.index); // do the slide

    toggleCarouselTouchHandlers(self); // remove touch events handlers
  }
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

  if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
}

/**
 * Toggles the touch event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean=} add when `TRUE` event listeners are added
 */
function toggleCarouselTouchHandlers(self, add) {
  const { element } = self;
  const action = add ? addListener : removeListener;
  action(element, touchmoveEvent, carouselTouchMoveHandler, passiveHandler);
  action(element, touchendEvent, carouselTouchEndHandler, passiveHandler);
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
    action(element, touchstartEvent, carouselPauseHandler, passiveHandler);
    action(element, touchendEvent, carouselResumeHandler, passiveHandler);
  }

  if (touch && slides.length > 1) {
    action(element, touchstartEvent, carouselTouchDownHandler, passiveHandler);
  }

  if (controls.length) {
    controls.forEach((arrow) => {
      if (arrow) action(arrow, mouseclickEvent, carouselControlsHandler);
    });
  }

  if (indicators.length) {
    indicators.forEach((indicator) => {
      action(indicator, mouseclickEvent, carouselIndicatorHandler);
    });
  }
  // @ts-ignore
  if (keyboard) action(getWindow(element), keydownEvent, carouselKeyHandler);
}

/**
 * Returns the index of the current active item.
 * @param {Carousel} self the `Carousel` instance
 * @returns {number} the query result
 */
function getActiveIndex(self) {
  const { slides, element } = self;
  const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
  // @ts-ignore
  return [...slides].indexOf(activeItem);
}

// CAROUSEL DEFINITION
// ===================
/** Creates a new `Carousel` instance. */
class Carousel extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target mostly a `.carousel` element
   * @param {BSN.Options.Carousel=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // additional properties
    /** @type {string} */
    self.direction = isRTL() ? 'right' : 'left';
    /** @type {number} */
    self.index = 0;
    /** @type {boolean} */
    self.isTouch = false;

    // initialization element
    const { element } = self;
    // carousel elements
    // a LIVE collection is prefferable
    self.slides = getElementsByClassName(carouselItem, element);
    const { slides } = self;

    // invalidate when not enough items
    // no need to go further
    if (slides.length < 2) { return; }

    self.controls = [
      ...querySelectorAll(`[${dataBsSlide}]`, element),
      ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`),
    ];

    /** @type {(HTMLElement | Element)?} */
    self.indicator = querySelector(`.${carouselString}-indicators`, element);

    // a LIVE collection is prefferable
    /** @type {(HTMLElement | Element)[]} */
    self.indicators = [
      ...(self.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, self.indicator) : []),
      ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`),
    ];

    // set JavaScript and DATA API options
    const { options } = self;

    // don't use TRUE as interval, it's actually 0, use the default 5000ms better
    self.options.interval = options.interval === true
      ? carouselDefaults.interval
      : options.interval;

    // set first slide active if none
    if (getActiveIndex(self) < 0) {
      if (slides.length) addClass(slides[0], activeClass);
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
   * @readonly @static
   */
  get name() { return carouselComponent; }
  /**
   * Returns component default options.
   * @readonly @static
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
    const { element, options, isPaused } = self;

    Timer.clear(element, carouselString);
    if (isPaused) {
      Timer.clear(element, pausedClass);
      removeClass(element, pausedClass);
    }

    Timer.set(element, () => {
      if (!self.isPaused && isElementInScrollRange(element)) {
        self.index += 1;
        self.to(self.index);
      }
    }, options.interval, carouselString);
  }

  /** Pause the automatic cycle. */
  pause() {
    const self = this;
    const { element, options } = self;
    if (!self.isPaused && options.interval) {
      addClass(element, pausedClass);
      Timer.set(element, () => {}, 1, pausedClass);
    }
  }

  /** Slide to the next item. */
  next() {
    const self = this;
    if (!self.isAnimating) { self.index += 1; self.to(self.index); }
  }

  /** Slide to the previous item. */
  prev() {
    const self = this;
    if (!self.isAnimating) { self.index -= 1; self.to(self.index); }
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
    const RTL = isRTL();
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if (self.isAnimating || activeItem === next) return;

    // determine transition direction
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
      }, 17, dataBsSlide);
    } else {
      addClass(slides[next], activeClass);
      removeClass(slides[activeItem], activeClass);

      Timer.set(element, () => {
        Timer.clear(element, dataBsSlide);
        // check for element, might have been disposed
        if (element && options.interval && !self.isPaused) {
          self.cycle();
        }

        dispatchEvent(element, carouselSlidEvent);
      }, 17, dataBsSlide);
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

export { Carousel as default };
