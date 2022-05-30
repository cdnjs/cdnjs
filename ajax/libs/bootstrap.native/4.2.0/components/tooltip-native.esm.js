/*!
  * Native JavaScript for Bootstrap - Tooltip v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * A global namespace for aria-describedby.
 * @type {string}
 */
const ariaDescribedBy = 'aria-describedby';

/**
 * A global namespace for `click` event.
 * @type {string}
 */
const mouseclickEvent = 'click';

/**
 * A global namespace for `mousedown` event.
 * @type {string}
 */
const mousedownEvent = 'mousedown';

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
 * A global namespace for `mousemove` event.
 * @type {string}
 */
const mousemoveEvent = 'mousemove';

/**
 * A global namespace for `focus` event.
 * @type {string}
 */
const focusEvent = 'focus';

/**
 * A global namespace for `focusin` event.
 * @type {string}
 */
const focusinEvent = 'focusin';

/**
 * A global namespace for `focusout` event.
 * @type {string}
 */
const focusoutEvent = 'focusout';

/**
 * A global namespace for `hover` event.
 * @type {string}
 */
const mousehoverEvent = 'hover';

/**
 * A global namespace for `scroll` event.
 * @type {string}
 */
const scrollEvent = 'scroll';

/**
 * A global namespace for `resize` event.
 * @type {string}
 */
const resizeEvent = 'resize';

/**
 * A global namespace for `touchstart` event.
 * @type {string}
 */
const touchstartEvent = 'touchstart';

/**
 * Shortcut for `HTMLElement.hasAttribute()` method.
 * @param  {HTMLElement} element target element
 * @param  {string} attribute attribute name
 * @returns {boolean} the query result
 */
const hasAttribute = (element, attribute) => element.hasAttribute(attribute);

/**
 * Shortcut for `HTMLElement.setAttribute()` method.
 * @param  {HTMLElement} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 * @returns {void}
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement} element target element
 * @param {string} attribute attribute name
 * @returns {string?} attribute value
 */
const getAttribute = (element, attribute) => element.getAttribute(attribute);

/**
 * Shortcut for `HTMLElement.removeAttribute()` method.
 * @param  {HTMLElement} element target element
 * @param  {string} attribute attribute name
 * @returns {void}
 */
const removeAttribute = (element, attribute) => element.removeAttribute(attribute);

/**
 * Checks if an object is a `Document`.
 * @see https://dom.spec.whatwg.org/#node
 *
 * @param {any} object the target object
 * @returns {boolean} the query result
 */
const isDocument = (object) => (object && object.nodeType === 9) || false;

/**
 * Checks if an object is a `Node`.
 *
 * @param {any} node the target object
 * @returns {boolean} the query result
 */
const isNode = (element) => (element && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  .some((x) => +element.nodeType === x)) || false;

/**
 * Returns the `Window` object of a target node.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {(Node | Window)=} node target node
 * @returns {Window} the `Window` object
 */
function getWindow(node) {
  // node is undefined | NULL
  if (!node) return window;
  // node instanceof Document
  if (isDocument(node)) return node.defaultView;
  // node instanceof Node
  if (isNode(node)) return node.ownerDocument.defaultView;
  // node is instanceof Window
  return node;
}

/**
 * Check if a target object is `Window`.
 * => equivalent to `object instanceof Window`
 *
 * @param {any} object the target object
 * @returns {boolean} the query result
 */
const isWindow = (object) => (object && object.constructor.name === 'Window') || false;

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
 * Returns the `document.body` or the `<body>` element.
 *
 * @param {(Node | Window)=} node
 * @returns {HTMLBodyElement}
 */
function getDocumentBody(node) {
  return getDocument(node).body;
}

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

let elementUID = 0;
let elementMapUID = 0;
const elementIDMap = new Map();

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param {HTMLElement} element target element
 * @param {string=} key predefined key
 * @returns {number} an existing or new unique ID
 */
function getUID(element, key) {
  let result = key ? elementUID : elementMapUID;

  if (key) {
    const elID = getUID(element);
    const elMap = elementIDMap.get(elID) || new Map();
    if (!elementIDMap.has(elID)) {
      elementIDMap.set(elID, elMap);
    }
    if (!elMap.has(key)) {
      elMap.set(key, result);
      elementUID += 1;
    } else result = elMap.get(key);
  } else {
    const elkey = element.id || element;

    if (!elementIDMap.has(elkey)) {
      elementIDMap.set(elkey, result);
      elementMapUID += 1;
    } else result = elementIDMap.get(elkey);
  }
  return result;
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

/**
 * Checks if an object is a `Function`.
 *
 * @param {any} fn the target object
 * @returns {boolean} the query result
 */
const isFunction = (fn) => (fn && fn.constructor.name === 'Function') || false;

/**
 * Checks if an element is an `<svg>` (or any type of SVG element),
 * `<img>` or `<video>`.
 *
 * *Tooltip* / *Popover* works different with media elements.
 * @param {any} element the target element
 * @returns {boolean} the query result
 */

const isMedia = (element) => (
  element
  && element.nodeType === 1
  && ['SVG', 'Image', 'Video'].some((s) => element.constructor.name.includes(s))) || false;

const { userAgentData: uaDATA } = navigator;

/**
 * A global namespace for `userAgentData` object.
 */
const userAgentData = uaDATA;

const { userAgent: userAgentString } = navigator;

/**
 * A global namespace for `navigator.userAgent` string.
 */
const userAgent = userAgentString;

const appleBrands = /(iPhone|iPod|iPad)/;

/**
 * A global `boolean` for Apple browsers.
 * @type {boolean}
 */
const isApple = userAgentData ? userAgentData.brands.some((x) => appleBrands.test(x.brand))
  : /* istanbul ignore next */appleBrands.test(userAgent);

/**
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

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
 * A global namespace for `transitionProperty` string for modern browsers.
 *
 * @type {string}
 */
const transitionProperty = 'transitionProperty';

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
 * Utility to focus an `HTMLElement` target.
 *
 * @param {HTMLElement} element is the target
 */
const focus = (element) => element.focus();

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
 * Shortcut for `String.toLowerCase()`.
 *
 * @param {string} source input string
 * @returns {string} lowercase output string
 */
const toLowerCase = (source) => source.toLowerCase();

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
 * Global namespace for `data-bs-title` attribute.
 */
const dataOriginalTitle = 'data-original-title';

/**
 * Global namespace for most components `show` class.
 */
const showClass = 'show';

/** @type {string} */
const tooltipString = 'tooltip';

/** @type {string} */
const tooltipComponent = 'Tooltip';

/** @type {string} */
const popoverString = 'popover';

/** @type {string} */
const popoverComponent = 'Popover';

/** @type {string} */
const modalString = 'modal';

/** @type {string} */
const offcanvasString = 'offcanvas';

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
 * Checks if a page is Right To Left.
 * @param {HTMLElement=} node the target
 * @returns {boolean} the query result
 */
const isRTL = (node) => getDocumentElement(node).dir === 'rtl';

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
 * Returns an `{x,y}` object with the target
 * `HTMLElement` / `Node` scroll position.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Window} element target node / element
 * @returns {{x: number, y: number}} the scroll tuple
 */
function getNodeScroll(element) {
  const isWin = 'scrollX' in element;
  const x = isWin ? element.scrollX : element.scrollLeft;
  const y = isWin ? element.scrollY : element.scrollTop;

  return { x, y };
}

/**
 * Checks if a target `HTMLElement` is affected by scale.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement} element target
 * @returns {boolean} the query result
 */
function isScaledElement(element) {
  if (!element || !isHTMLElement(element)) return false;
  const { width, height } = getBoundingClientRect(element);
  const { offsetWidth, offsetHeight } = element;
  return Math.round(width) !== offsetWidth
    || Math.round(height) !== offsetHeight;
}

/**
 * Returns the rect relative to an offset parent.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement} element target
 * @param {ParentNode | Window} offsetParent the container / offset parent
 * @param {{x: number, y: number}} scroll the offsetParent scroll position
 * @returns {SHORTY.OffsetRect}
 */
function getRectRelativeToOffsetParent(element, offsetParent, scroll) {
  const isParentAnElement = isHTMLElement(offsetParent);
  const rect = getBoundingClientRect(element, isParentAnElement && isScaledElement(offsetParent));
  const offsets = { x: 0, y: 0 };

  /* istanbul ignore next */
  if (isParentAnElement) {
    const offsetRect = getBoundingClientRect(offsetParent, true);
    offsets.x = offsetRect.x + offsetParent.clientLeft;
    offsets.y = offsetRect.y + offsetParent.clientTop;
  }

  return {
    x: rect.left + scroll.x - offsets.x,
    y: rect.top + scroll.y - offsets.y,
    width: rect.width,
    height: rect.height,
  };
}

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

/** @type {Record<string, string>} */
const tipClassPositions = {
  top: 'top',
  bottom: 'bottom',
  left: 'start',
  right: 'end',
};

/**
 * Style popovers and tooltips.
 * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
 * @param {PointerEvent=} e event object
 */
function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const {
    element, tooltip, options, arrow, offsetParent,
  } = self;
  const tipPositions = { ...tipClassPositions };

  const RTL = isRTL(element);
  if (RTL) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // reset tooltip style (top: 0, left: 0 works best)
  setElementStyle(tooltip, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: '', left: '', right: '', bottom: '',
  });
  const isPopover = self.name === popoverComponent;
  const {
    offsetWidth: tipWidth, offsetHeight: tipHeight,
  } = tooltip;
  const {
    clientWidth: htmlcw, clientHeight: htmlch,
  } = getDocumentElement(element);
  const { container } = options;
  let { placement } = options;
  const {
    left: parentLeft, right: parentRight, top: parentTop,
  } = getBoundingClientRect(container, true);
  const {
    clientWidth: parentCWidth, offsetWidth: parentOWidth,
  } = container;
  const scrollbarWidth = Math.abs(parentCWidth - parentOWidth);
  // const tipAbsolute = getElementStyle(tooltip, 'position') === 'absolute';
  const parentPosition = getElementStyle(container, 'position');
  // const absoluteParent = parentPosition === 'absolute';
  const fixedParent = parentPosition === 'fixed';
  const staticParent = parentPosition === 'static';
  const stickyParent = parentPosition === 'sticky';
  const isSticky = stickyParent && parentTop === parseFloat(getElementStyle(container, 'top'));
  // const absoluteTarget = getElementStyle(element, 'position') === 'absolute';
  // const stickyFixedParent = ['sticky', 'fixed'].includes(parentPosition);
  const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
  const rightBoundry = fixedParent ? parentCWidth + parentLeft + (RTL ? scrollbarWidth : 0)
    : parentCWidth + parentLeft + (htmlcw - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop,
  } = getBoundingClientRect(element, true);

  const scroll = getNodeScroll(offsetParent);
  const { x, y } = getRectRelativeToOffsetParent(element, offsetParent, scroll);
  // reset arrow style
  setElementStyle(arrow, {
    top: '', left: '', right: '', bottom: '',
  });
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // check placement
  let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
  let bottomExceed = elemRectTop + tipHeight + elemHeight
    + arrowHeight >= htmlch;
  let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
  let rightExceed = elemRectLeft + tipWidth + elemWidth
    + arrowWidth >= rightBoundry;

  const horizontal = ['left', 'right'];
  const vertical = ['top', 'bottom'];

  topExceed = horizontal.includes(placement)
    ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
    : topExceed;
  bottomExceed = horizontal.includes(placement)
    ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch
    : bottomExceed;
  leftExceed = vertical.includes(placement)
    ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry
    : leftExceed;
  rightExceed = vertical.includes(placement)
    ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
    : rightExceed;

  // first remove side positions if both left and right limits are exceeded
  // we usually fall back to top|bottom
  placement = (horizontal.includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  // second, recompute placement
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tooltip.className.includes(placement)) {
    tooltip.className = tooltip.className.replace(tipClasses, tipPositions[placement]);
  }

  // compute tooltip / popover coordinates
  /* istanbul ignore else */
  if (horizontal.includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = x - tipWidth - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = x + elemWidth + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = y;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y - tipHeight + elemHeight;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y - tipHeight / 2 + elemHeight / 2;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e && isMedia(element)) {
      let eX = 0;
      let eY = 0;
      if (staticParent) {
        eX = e.pageX;
        eY = e.pageY;
      } else { // fixedParent | stickyParent
        eX = e.clientX - parentLeft + (fixedParent ? scroll.x : 0);
        eY = e.clientY - parentTop + (fixedParent ? scroll.y : 0);
      }

      // some weird RTL bug
      eX -= RTL && fixedParent && scrollbarWidth ? scrollbarWidth : 0;

      if (placement === 'top') {
        topPosition = eY - tipHeight - arrowWidth;
      } else {
        topPosition = eY + arrowWidth;
      }

      // adjust (left | right) and also the arrow
      if (e.clientX - tipWidth / 2 < leftBoundry) {
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipWidth / 2 > rightBoundry) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = rightBoundry - eX - arrowAdjust;
        arrowRight -= fixedParent ? parentLeft + (RTL ? scrollbarWidth : 0) : 0;

      // normal top/bottom
      } else {
        leftPosition = eX - tipWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = y - tipHeight - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = y + elemHeight + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = x + elemWidth / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
      } else {
        leftPosition = x - tipWidth / 2 + elemWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover
  setElementStyle(tooltip, {
    top: `${topPosition}px`,
    left: leftPosition === 'auto' ? leftPosition : `${leftPosition}px`,
    right: rightPosition !== undefined ? `${rightPosition}px` : '',
  });

  // update arrow placement
  /* istanbul ignore else */
  if (isHTMLElement(arrow)) {
    if (arrowTop !== undefined) {
      arrow.style.top = `${arrowTop}px`;
    }
    if (arrowLeft !== undefined) {
      arrow.style.left = `${arrowLeft}px`;
    } else if (arrowRight !== undefined) {
      arrow.style.right = `${arrowRight}px`;
    }
  }
}

/**
 * This is a shortie for `document.createElement` method
 * which allows you to create a new `HTMLElement` for a given `tagName`
 * or based on an object with specific non-readonly attributes:
 * `id`, `className`, `textContent`, `style`, etc.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 *
 * @param {Record<string, string> | string} param `tagName` or object
 * @return {HTMLElement} a new `HTMLElement` or `Element`
 */
function createElement(param) {
  if (!param) return null;

  if (typeof param === 'string') {
    return getDocument().createElement(param);
  }

  const { tagName } = param;
  const attr = { ...param };
  const newElement = createElement(tagName);
  delete attr.tagName;
  ObjectAssign(newElement, attr);
  return newElement;
}

/**
 * Global namespace for most components `fade` class.
 */
const fadeClass = 'fade';

/**
 * Checks if an object is a `NodeList`.
 * => equivalent to `object instanceof NodeList`
 *
 * @param {any} object the target object
 * @returns {boolean} the query result
 */
const isNodeList = (object) => (object && object.constructor.name === 'NodeList') || false;

/**
 * Shortcut for `typeof SOMETHING === "string"`.
 *
 * @param  {any} str input value
 * @returns {boolean} the query result
 */
const isString = (str) => typeof str === 'string';

/**
 * Shortcut for `Array.isArray()` static method.
 *
 * @param  {any} arr array-like iterable object
 * @returns {boolean} the query result
 */
const isArray = (arr) => Array.isArray(arr);

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {HTMLElement} element target
 * @param {Node | string} content the `Element` to append / string
 * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
 */
function setHtml(element, content, sanitizeFn) {
  /* istanbul ignore next */
  if (!isHTMLElement(element) || (isString(content) && !content.length)) return;

  /* istanbul ignore else */
  if (isString(content)) {
    let dirty = content.trim(); // fixing #233
    if (isFunction(sanitizeFn)) dirty = sanitizeFn(dirty);

    const win = getWindow(element);
    const domParser = new win.DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    element.append(...[...tempDocument.body.childNodes]);
  } else if (isHTMLElement(content)) {
    element.append(content);
  } else if (isNodeList(content)
    || (isArray(content) && content.every(isNode))) {
    element.append(...[...content]);
  }
}

/**
 * Creates a new tooltip / popover.
 *
 * @param {BSN.Popover | BSN.Tooltip} self the `Tooltip` / `Popover` instance
 */
function createTip(self) {
  const { id, element, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
    title, content, template, btnClose,
  } = options;
  const isTooltip = self.name === tooltipComponent;
  const tipString = isTooltip ? tooltipString : popoverString;
  const tipPositions = { ...tipClassPositions };
  let titleParts = [];
  let contentParts = [];

  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // set initial popover class
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;

  // load template
  /** @type {HTMLElement?} */
  let tooltipTemplate;
  if (isHTMLElement(template)) {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild;
  }

  // set popover markup
  self.tooltip = isHTMLElement(tooltipTemplate) && tooltipTemplate.cloneNode(true);

  const { tooltip } = self;

  // set id and role attributes
  setAttribute(tooltip, 'id', id);
  setAttribute(tooltip, 'role', tooltipString);

  const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
  const tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip);
  const tooltipBody = querySelector(`.${bodyClass}`, tooltip);

  // set arrow and enable access for styleTip
  self.arrow = querySelector(`.${tipString}-arrow`, tooltip);
  const { arrow } = self;

  if (isHTMLElement(title)) titleParts = [title.cloneNode(true)];
  else {
    const tempTitle = createElement('div');
    setHtml(tempTitle, title, sanitizeFn);
    titleParts = [...[...tempTitle.childNodes]];
  }

  if (isHTMLElement(content)) contentParts = [content.cloneNode(true)];
  else {
    const tempContent = createElement('div');
    setHtml(tempContent, content, sanitizeFn);
    contentParts = [...[...tempContent.childNodes]];
  }

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (isHTMLElement(btnClose)) titleParts = [...titleParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = createElement('div');
        setHtml(tempBtn, btnClose, sanitizeFn);
        titleParts = [...titleParts, tempBtn.firstChild];
      }
    } else {
      /* istanbul ignore else */
      if (tooltipHeader) tooltipHeader.remove();
      if (isHTMLElement(btnClose)) contentParts = [...contentParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = createElement('div');
        setHtml(tempBtn, btnClose, sanitizeFn);
        contentParts = [...contentParts, tempBtn.firstChild];
      }
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  /* istanbul ignore else */
  if (!isTooltip) {
    /* istanbul ignore else */
    if (title && tooltipHeader) setHtml(tooltipHeader, titleParts, sanitizeFn);
    /* istanbul ignore else */
    if (content && tooltipBody) setHtml(tooltipBody, contentParts, sanitizeFn);
    // set btn
    self.btn = querySelector('.btn-close', tooltip);
  } else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);

  // Bootstrap 5.2.x
  addClass(tooltip, 'position-absolute');
  addClass(arrow, 'position-absolute');

  // set popover animation and placement
  /* istanbul ignore else */
  if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
  /* istanbul ignore else */
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  /* istanbul ignore else */
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  /* istanbul ignore else */
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}

/**
 * @param {HTMLElement} tip target
 * @param {ParentNode} container parent container
 * @returns {boolean}
 */
function isVisibleTip(tip, container) {
  return isHTMLElement(tip) && container.contains(tip);
}

/**
 * Check if target is a `ShadowRoot`.
 *
 * @param {any} element target
 * @returns {boolean} the query result
 */
const isShadowRoot = (element) => (element && element.constructor.name === 'ShadowRoot')
  || false;

/**
 * Returns the `parentNode` also going through `ShadowRoot`.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {Node} node the target node
 * @returns {Node} the apropriate parent node
 */
function getParentNode(node) {
  if (node.nodeName === 'HTML') {
    return node;
  }

  // this is a quicker (but less type safe) way to save quite some bytes from the bundle
  return (
    node.assignedSlot // step into the shadow DOM of the parent of a slotted node
    || node.parentNode // DOM Element detected
    || (isShadowRoot(node) && node.host) // ShadowRoot detected
    || getDocumentElement(node) // fallback
  );
}

/**
 * Check if a target element is a `<table>`, `<td>` or `<th>`.
 * This specific check is important for determining
 * the `offsetParent` of a given element.
 *
 * @param {any} element the target element
 * @returns {boolean} the query result
 */
const isTableElement = (element) => (element && ['TABLE', 'TD', 'TH'].includes(element.tagName))
  || false;

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
 * offsets computation similar to **floating-ui**.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement} element the target
 * @param {boolean=} getOffset when *true* it will return an `offsetParent`
 * @returns {ParentNode | Window} the query result
 */
function getElementContainer(element, getOffset) {
  const majorBlockTags = ['HTML', 'BODY'];

  if (getOffset) {
    /** @type {any} */
    let { offsetParent } = element;
    const win = getWindow(element);

    while (offsetParent && (isTableElement(offsetParent)
      || (isHTMLElement(offsetParent)
        // we must count for both fixed & sticky
        && !['sticky', 'fixed'].includes(getElementStyle(offsetParent, 'position'))))) {
      offsetParent = offsetParent.offsetParent;
    }

    if (!offsetParent || (majorBlockTags.includes(offsetParent.tagName)
        || getElementStyle(offsetParent, 'position') === 'static')) {
      offsetParent = win;
    }
    return offsetParent;
  }

  /** @type {ParentNode[]} */
  const containers = [];
  /** @type {ParentNode} */
  let { parentNode } = element;

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode);
    /* istanbul ignore else */
    if (!(isShadowRoot(parentNode) || !!parentNode.shadowRoot
      || isTableElement(parentNode))) {
      containers.push(parentNode);
    }
  }

  return containers.find((c, i) => {
    if (getElementStyle(c, 'position') !== 'relative'
      && containers.slice(i + 1).every((r) => getElementStyle(r, 'position') === 'static')) {
      return c;
    }
    return null;
  }) || getDocumentBody(element);
}

/**
 * Returns a template for Popover / Tooltip.
 *
 * @param {string} tipType the expected markup type
 * @returns {string} the template markup
 */
function getTipTemplate(tipType) {
  const isTooltip = tipType === tooltipString;
  const bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`;
  const header = !isTooltip ? `<h3 class="${tipType}-header"></h3>` : '';
  const arrow = `<div class="${tipType}-arrow"></div>`;
  const body = `<div class="${bodyClass}"></div>`;
  return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
}

const tooltipDefaults = {
  /** @type {string} */
  template: getTipTemplate(tooltipString),
  /** @type {string?} */
  title: null, // string
  /** @type {string?} */
  customClass: null, // string | null
  /** @type {string} */
  trigger: 'hover focus',
  /** @type {string?} */
  placement: 'top', // string
  /** @type {((c:string)=>string)?} */
  sanitizeFn: null, // function
  /** @type {boolean} */
  animation: true, // bool
  /** @type {number} */
  delay: 200, // number
  /** @type {HTMLElement?} */
  container: null,
};

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

/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */

// TOOLTIP PRIVATE GC
// ==================
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = 'title';

/**
 * Static method which returns an existing `Tooltip` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tooltip>}
 */
let getTooltipInstance = (element) => getInstance(element, tooltipComponent);

/**
 * A `Tooltip` initialization callback.
 * @type {BSN.InitCallback<Tooltip>}
 */
const tooltipInitCallback = (element) => new Tooltip(element);

// TOOLTIP PRIVATE METHODS
// =======================
/**
 * Removes the tooltip from the DOM.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function removeTooltip(self) {
  const { element, tooltip } = self;
  removeAttribute(element, ariaDescribedBy);
  tooltip.remove();
}

/**
 * Executes after the instance has been disposed.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {Function=} callback the parent dispose callback
 */
function disposeTooltipComplete(self, callback) {
  const { element } = self;
  toggleTooltipHandlers(self);

  /* istanbul ignore else */
  if (hasAttribute(element, dataOriginalTitle) && self.name === tooltipComponent) {
    toggleTooltipTitle(self);
  }
  /* istanbul ignore else */
  if (callback) callback();
}

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipAction(self, add) {
  const action = add ? addListener : removeListener;
  const { element } = self;

  action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach((ev) => {
      action(getWindow(element), ev, self.update, passiveHandler);
    });
  }
}

/**
 * Executes after the tooltip was shown to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipShownAction(self) {
  const { element } = self;
  const shownTooltipEvent = OriginalEvent(`shown.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self, true);
  dispatchEvent(element, shownTooltipEvent);
  Timer.clear(element, 'in');
}

/**
 * Executes after the tooltip was hidden to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {Function=} callback the dispose callback
 */
function tooltipHiddenAction(self, callback) {
  const { element } = self;
  const hiddenTooltipEvent = OriginalEvent(`hidden.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self);
  removeTooltip(self);
  dispatchEvent(element, hiddenTooltipEvent);
  if (isFunction(callback)) callback();
  Timer.clear(element, 'out');
}

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipHandlers(self, add) {
  const action = add ? addListener : removeListener;
  // btn is only for dismissible popover
  const { element, options, btn } = self;
  const { trigger, dismissible } = options;

  if (trigger.includes('manual')) return;

  self.enabled = !!add;

  /** @type {string[]} */
  const triggerOptions = trigger.split(' ');
  const elemIsMedia = isMedia(element);

  if (elemIsMedia) {
    action(element, mousemoveEvent, self.update, passiveHandler);
  }

  triggerOptions.forEach((tr) => {
    /* istanbul ignore else */
    if (elemIsMedia || tr === mousehoverEvent) {
      action(element, mousedownEvent, self.show);
      action(element, mouseenterEvent, self.show);

      /* istanbul ignore else */
      if (dismissible && btn) {
        action(btn, mouseclickEvent, self.hide);
      } else {
        action(element, mouseleaveEvent, self.hide);
        action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);
      }
    } else if (tr === mouseclickEvent) {
      action(element, tr, (!dismissible ? self.toggle : self.show));
    } else if (tr === focusEvent) {
      action(element, focusinEvent, self.show);
      /* istanbul ignore else */
      if (!dismissible) action(element, focusoutEvent, self.hide);
      /* istanbul ignore else */
      if (isApple) {
        action(element, mouseclickEvent, () => focus(element));
      }
    }
  });
}

/**
 * Toggles on/off the `Tooltip` event listeners that hide/update the tooltip.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipOpenHandlers(self, add) {
  const action = add ? addListener : removeListener;
  const { element, options, offsetParent } = self;
  const { container } = options;
  const { offsetHeight, scrollHeight } = container;
  const parentModal = closest(element, `.${modalString}`);
  const parentOffcanvas = closest(element, `.${offcanvasString}`);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    const win = getWindow(element);
    const overflow = offsetHeight !== scrollHeight;
    const scrollTarget = overflow || offsetParent !== win ? container : win;
    action(win, resizeEvent, self.update, passiveHandler);
    action(scrollTarget, scrollEvent, self.update, passiveHandler);
  }

  // dismiss tooltips inside modal / offcanvas
  if (parentModal) action(parentModal, `hide.bs.${modalString}`, self.hide);
  if (parentOffcanvas) action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.hide);
}

/**
 * Toggles the `title` and `data-original-title` attributes.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {string=} content when `true`, event listeners are added
 */
function toggleTooltipTitle(self, content) {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  setAttribute(element, titleAtt[content ? 0 : 1],
    (content || getAttribute(element, titleAtt[0])));
  removeAttribute(element, titleAtt[content ? 1 : 0]);
}

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
class Tooltip extends BaseComponent {
  /**
   * @param {HTMLElement | string} target the target element
   * @param {BSN.Options.Tooltip=} config the instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;
    const { element } = self;
    const isTooltip = self.name === tooltipComponent;
    const tipString = isTooltip ? tooltipString : popoverString;
    const tipComponent = isTooltip ? tooltipComponent : popoverComponent;

    /* istanbul ignore next: this is to set Popover too */
    getTooltipInstance = (elem) => getInstance(elem, tipComponent);

    // additional properties
    /** @type {any} */
    self.tooltip = {};
    if (!isTooltip) {
      /** @type {any?} */
      self.btn = null;
    }
    /** @type {any} */
    self.arrow = {};
    /** @type {any} */
    self.offsetParent = {};
    /** @type {boolean} */
    self.enabled = true;
    /** @type {string} Set unique ID for `aria-describedby`. */
    self.id = `${tipString}-${getUID(element, tipString)}`;

    // instance options
    const { options } = self;

    // invalidate
    if ((!options.title && isTooltip) || (!isTooltip && !options.content)) {
      // throw Error(`${this.name} Error: target has no content set.`);
      return;
    }

    const container = querySelector(options.container, getDocument(element));
    const idealContainer = getElementContainer(element);

    // bypass container option when its position is static/relative
    self.options.container = !container || (container
      && ['static', 'relative'].includes(getElementStyle(container, 'position')))
      ? idealContainer
      : /* istanbul ignore next */container || getDocumentBody(element);

    // reset default options
    tooltipDefaults[titleAttr] = null;

    // all functions bind
    self.handleTouch = self.handleTouch.bind(self);
    self.update = self.update.bind(self);
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);
    self.toggle = self.toggle.bind(self);

    // set title attributes and add event listeners
    /* istanbul ignore else */
    if (hasAttribute(element, titleAttr) && isTooltip) {
      toggleTooltipTitle(self, options.title);
    }

    // create tooltip here
    createTip(self);

    // attach events
    toggleTooltipHandlers(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return tooltipComponent; }
  /**
   * Returns component default options.
   */
  get defaults() { return tooltipDefaults; }
  /* eslint-enable */

  // TOOLTIP PUBLIC METHODS
  // ======================
  /**
   * Shows the tooltip.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip}
   */
  show(e) {
    const self = this;
    const {
      options, tooltip, element, id,
    } = self;
    const { container, animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (tooltip && !outTimer && !isVisibleTip(tooltip, container)) {
      Timer.set(element, () => {
        const showTooltipEvent = OriginalEvent(`show.bs.${toLowerCase(self.name)}`);
        dispatchEvent(element, showTooltipEvent);
        if (showTooltipEvent.defaultPrevented) return;

        // append to container
        container.append(tooltip);
        setAttribute(element, ariaDescribedBy, `#${id}`);
        // set offsetParent
        self.offsetParent = getElementContainer(tooltip, true);

        self.update(e);
        toggleTooltipOpenHandlers(self, true);

        /* istanbul ignore else */
        if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
        /* istanbul ignore else */
        if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
        else tooltipShownAction(self);
      }, 17, 'in');
    }
  }

  /**
   * Hides the tooltip.
   *
   * @this {Tooltip} the Tooltip instance
   * @param {Function=} callback the dispose callback
   */
  hide(callback) {
    const self = this;
    const { options, tooltip, element } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (tooltip && isVisibleTip(tooltip, container)) {
      Timer.set(element, () => {
        const hideTooltipEvent = OriginalEvent(`hide.bs.${toLowerCase(self.name)}`);
        dispatchEvent(element, hideTooltipEvent);

        if (hideTooltipEvent.defaultPrevented) return;

        removeClass(tooltip, showClass);
        toggleTooltipOpenHandlers(self);

        /* istanbul ignore else */
        if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self, callback));
        else tooltipHiddenAction(self, callback);
      }, delay + 17, 'out');
    }
  }

  /**
   * Updates the tooltip position.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip} the `Tooltip` instance
   */
  update(e) {
    styleTip(this, e);
  }

  /**
   * Toggles the tooltip visibility.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip} the instance
   */
  toggle(e) {
    const self = this;
    const { tooltip, options } = self;

    if (!isVisibleTip(tooltip, options.container)) self.show(e);
    else self.hide();
  }

  /** Enables the tooltip. */
  enable() {
    const self = this;
    const { enabled } = self;
    /* istanbul ignore else */
    if (!enabled) {
      toggleTooltipHandlers(self, true);
      self.enabled = !enabled;
    }
  }

  /** Disables the tooltip. */
  disable() {
    const self = this;
    const {
      tooltip, options, enabled,
    } = self;
    const { animation, container } = options;
    /* istanbul ignore else */
    if (enabled) {
      if (isVisibleTip(tooltip, container) && animation) {
        self.hide(() => toggleTooltipHandlers(self));
      } else {
        toggleTooltipHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  /** Toggles the `disabled` property. */
  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  /**
   * Handles the `touchstart` event listener for `Tooltip`
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch({ target }) {
    const { tooltip, element } = this;

    /* istanbul ignore next */
    if (tooltip.contains(target) || target === element
      || (target && element.contains(target))) ; else {
      this.hide();
    }
  }

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const self = this;
    const { tooltip, options } = self;
    const callback = () => disposeTooltipComplete(self, () => super.dispose());

    if (options.animation && isVisibleTip(tooltip, options.container)) {
      self.options.delay = 0; // reset delay
      self.hide(callback);
    } else {
      callback();
    }
  }
}

ObjectAssign(Tooltip, {
  selector: tooltipSelector,
  init: tooltipInitCallback,
  getInstance: getTooltipInstance,
  styleTip,
});

export { Tooltip as default };
