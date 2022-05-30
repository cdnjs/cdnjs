/*!
  * Native JavaScript for Bootstrap - Dropdown v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * A global namespace for aria-expanded.
 * @type {string}
 */
const ariaExpanded = 'aria-expanded';

/**
 * A global namespace for `focus` event.
 * @type {string}
 */
const focusEvent = 'focus';

/**
 * A global namespace for `keydown` event.
 * @type {string}
 */
const keydownEvent = 'keydown';

/**
 * A global namespace for `keyup` event.
 * @type {string}
 */
const keyupEvent = 'keyup';

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
 * A global namespace for `click` event.
 * @type {string}
 */
const mouseclickEvent = 'click';

/**
 * A global namespace for `ArrowUp` key.
 * @type {string} e.which = 38 equivalent
 */
const keyArrowUp = 'ArrowUp';

/**
 * A global namespace for `ArrowDown` key.
 * @type {string} e.which = 40 equivalent
 */
const keyArrowDown = 'ArrowDown';

/**
 * A global namespace for `Escape` key.
 * @type {string} e.which = 27 equivalent
 */
const keyEscape = 'Escape';

/**
 * Shortcut for `HTMLElement.setAttribute()` method.
 * @param  {HTMLElement} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 * @returns {void}
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.hasAttribute()` method.
 * @param  {HTMLElement} element target element
 * @param  {string} attribute attribute name
 * @returns {boolean} the query result
 */
const hasAttribute = (element, attribute) => element.hasAttribute(attribute);

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
 * A global namespace for most scroll event listeners.
 * @type {Partial<AddEventListenerOptions>}
 */
const passiveHandler = { passive: true };

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
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

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
 * Global namespace for most components `show` class.
 */
const showClass = 'show';

/**
 * Global namespace for most components `toggle` option.
 */
const dataBsToggle = 'data-bs-toggle';

/**
 * Global namespace for `Dropdown` types / classes.
 */
const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

/** @type {string} */
const dropdownComponent = 'Dropdown';

/**
 * Global namespace for `.dropdown-menu`.
 */
const dropdownMenuClass = 'dropdown-menu';

/**
 * Checks if an *event.target* or its parent has an `href="#"` value.
 * We need to prevent jumping around onclick, don't we?
 *
 * @param {Node} element the target element
 * @returns {boolean} the query result
 */
function isEmptyAnchor(element) {
  // `EventTarget` must be `HTMLElement`
  const parentAnchor = closest(element, 'A');
  return isHTMLElement(element)
    // anchor href starts with #
    && ((hasAttribute(element, 'href') && element.href.slice(-1) === '#')
    // OR a child of an anchor with href starts with #
    || (parentAnchor && hasAttribute(parentAnchor, 'href')
    && parentAnchor.href.slice(-1) === '#'));
}

/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement} element target element
 * @param {string} attribute attribute name
 * @returns {string?} attribute value
 */
const getAttribute = (element, attribute) => element.getAttribute(attribute);

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

/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */

// DROPDOWN PRIVATE GC
// ===================
const [
  dropdownString,
  dropupString,
  dropstartString,
  dropendString,
] = dropdownMenuClasses;
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

/**
 * Static method which returns an existing `Dropdown` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Dropdown>}
 */
const getDropdownInstance = (element) => getInstance(element, dropdownComponent);

/**
 * A `Dropdown` initialization callback.
 * @type {BSN.InitCallback<Dropdown>}
 */
const dropdownInitCallback = (element) => new Dropdown(element);

// DROPDOWN PRIVATE GC
// ===================
// const dropdownMenuStartClass = `${dropdownMenuClass}-start`;
const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
const verticalClass = [dropdownString, dropupString];
const horizontalClass = [dropstartString, dropendString];
const menuFocusTags = ['A', 'BUTTON'];

const dropdownDefaults = {
  offset: 5, // [number] 5(px)
  display: 'dynamic', // [dynamic|static]
};

// DROPDOWN CUSTOM EVENTS
// ======================
const showDropdownEvent = OriginalEvent(`show.bs.${dropdownString}`);
const shownDropdownEvent = OriginalEvent(`shown.bs.${dropdownString}`);
const hideDropdownEvent = OriginalEvent(`hide.bs.${dropdownString}`);
const hiddenDropdownEvent = OriginalEvent(`hidden.bs.${dropdownString}`);

// DROPDOWN PRIVATE METHODS
// ========================
/**
 * Apply specific style or class names to a `.dropdown-menu` to automatically
 * accomodate the layout and the page scroll.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
function styleDropdown(self) {
  const {
    element, menu, parentElement, options,
  } = self;
  const { offset } = options;

  // don't apply any style on mobile view
  /* istanbul ignore next: this test requires a navbar */
  if (getElementStyle(menu, 'position') === 'static') return;

  const RTL = isRTL(element);
  // const menuStart = hasClass(menu, dropdownMenuStartClass);
  const menuEnd = hasClass(menu, dropdownMenuEndClass);

  // reset menu offset and position
  const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
  resetProps.forEach((p) => { menu.style[p] = ''; });

  // set initial position class
  // take into account .btn-group parent as .dropdown
  // this requires navbar/btn-group/input-group
  let positionClass = dropdownMenuClasses.find((c) => hasClass(parentElement, c))
    || /* istanbul ignore next: fallback position */ dropdownString;

  /** @type {Record<string, Record<string, any>>} */
  let dropdownMargin = {
    dropdown: [offset, 0, 0],
    dropup: [0, 0, offset],
    dropstart: RTL ? [-1, 0, 0, offset] : [-1, offset, 0],
    dropend: RTL ? [-1, offset, 0] : [-1, 0, 0, offset],
  };

  /** @type {Record<string, Record<string, any>>} */
  const dropdownPosition = {
    dropdown: { top: '100%' },
    dropup: { top: 'auto', bottom: '100%' },
    dropstart: RTL ? { left: '100%', right: 'auto' } : { left: 'auto', right: '100%' },
    dropend: RTL ? { left: 'auto', right: '100%' } : { left: '100%', right: 'auto' },
    menuStart: RTL ? { right: 0, left: 'auto' } : { right: 'auto', left: 0 },
    menuEnd: RTL ? { right: 'auto', left: 0 } : { right: 0, left: 'auto' },
  };

  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;

  const { clientWidth, clientHeight } = getDocumentElement(element);
  const {
    left: targetLeft, top: targetTop,
    width: targetWidth, height: targetHeight,
  } = getBoundingClientRect(element);

  // dropstart | dropend
  const leftFullExceed = targetLeft - menuWidth - offset < 0;
  // dropend
  const rightFullExceed = targetLeft + menuWidth + targetWidth + offset >= clientWidth;
  // dropstart | dropend
  const bottomExceed = targetTop + menuHeight + offset >= clientHeight;
  // dropdown
  const bottomFullExceed = targetTop + menuHeight + targetHeight + offset >= clientHeight;
  // dropup
  const topExceed = targetTop - menuHeight - offset < 0;
  // dropdown / dropup
  const leftExceed = ((!RTL && menuEnd) || (RTL && !menuEnd))
    && targetLeft + targetWidth - menuWidth < 0;
  const rightExceed = ((RTL && menuEnd) || (!RTL && !menuEnd))
    && targetLeft + menuWidth >= clientWidth;

  // recompute position
  // handle RTL as well
  if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropstartString && (!RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropendString;
  }
  if (positionClass === dropendString && (RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropstartString;
  }
  if (positionClass === dropupString && topExceed && !bottomFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
    positionClass = dropupString;
  }

  // override position for horizontal classes
  if (horizontalClass.includes(positionClass) && bottomExceed) {
    ObjectAssign(dropdownPosition[positionClass], {
      top: 'auto', bottom: 0,
    });
  }

  // override position for vertical classes
  if (verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
    // don't realign when menu is wider than window
    // in both RTL and non-RTL readability is KING
    let posAjust;
    if (!leftExceed && rightExceed && !RTL) posAjust = { left: 'auto', right: 0 };
    if (leftExceed && !rightExceed && RTL) posAjust = { left: 0, right: 'auto' };
    if (posAjust) ObjectAssign(dropdownPosition[positionClass], posAjust);
  }

  dropdownMargin = dropdownMargin[positionClass];
  setElementStyle(menu, {
    ...dropdownPosition[positionClass],
    margin: `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`,
  });

  // override dropdown-menu-start | dropdown-menu-end
  if (verticalClass.includes(positionClass) && menuEnd) {
    /* istanbul ignore else */
    if (menuEnd) {
      const endAdjust = (!RTL && leftExceed) || (RTL && rightExceed)
        ? 'menuStart' : /* istanbul ignore next */'menuEnd';
      setElementStyle(menu, dropdownPosition[endAdjust]);
    }
  }
}

/**
 * Returns an `Array` of focusable items in the given dropdown-menu.
 * @param {HTMLElement} menu
 * @returns {HTMLElement[]}
 */
function getMenuItems(menu) {
  return [...menu.children].map((c) => {
    if (c && menuFocusTags.includes(c.tagName)) return c;
    const { firstElementChild } = c;
    if (firstElementChild && menuFocusTags.includes(firstElementChild.tagName)) {
      return firstElementChild;
    }
    return null;
  }).filter((c) => c);
}

/**
 * Toggles on/off the listeners for the events that close the dropdown
 * as well as event that request a new position for the dropdown.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
function toggleDropdownDismiss(self) {
  const { element, options } = self;
  const action = self.open ? addListener : removeListener;
  const doc = getDocument(element);

  action(doc, mouseclickEvent, dropdownDismissHandler);
  action(doc, focusEvent, dropdownDismissHandler);
  action(doc, keydownEvent, dropdownPreventScroll);
  action(doc, keyupEvent, dropdownKeyHandler);

  /* istanbul ignore else */
  if (options.display === 'dynamic') {
    [scrollEvent, resizeEvent].forEach((ev) => {
      action(getWindow(element), ev, dropdownLayoutHandler, passiveHandler);
    });
  }
}

/**
 * Toggles on/off the `click` event listener of the `Dropdown`.
 *
 * @param {Dropdown} self the `Dropdown` instance
 * @param {boolean=} add when `true`, it will add the event listener
 */
function toggleDropdownHandler(self, add) {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, dropdownClickHandler);
}

/**
 * Returns the currently open `.dropdown` element.
 *
 * @param {(Node | Window)=} element target
 * @returns {HTMLElement?} the query result
 */
function getCurrentOpenDropdown(element) {
  const currentParent = [...dropdownMenuClasses, 'btn-group', 'input-group']
    .map((c) => getElementsByClassName(`${c} ${showClass}`, getDocument(element)))
    .find((x) => x.length);

  if (currentParent && currentParent.length) {
    return [...currentParent[0].children]
      .find((x) => hasAttribute(x, dataBsToggle));
  }
  return null;
}

// DROPDOWN EVENT HANDLERS
// =======================
/**
 * Handles the `click` event for the `Dropdown` instance.
 *
 * @param {MouseEvent} e event object
 * @this {Document}
 */
function dropdownDismissHandler(e) {
  const { target, type } = e;

  /* istanbul ignore next: impossible to satisfy */
  if (!target || !target.closest) return; // some weird FF bug #409

  const element = getCurrentOpenDropdown(target);
  const self = getDropdownInstance(element);

  /* istanbul ignore next */
  if (!self) return;

  const { parentElement, menu } = self;

  const hasData = closest(target, dropdownSelector) !== null;
  const isForm = parentElement && parentElement.contains(target)
    && (target.tagName === 'form' || closest(target, 'form') !== null);

  if (type === mouseclickEvent && isEmptyAnchor(target)) {
    e.preventDefault();
  }
  if (type === focusEvent
    && (target === element || target === menu || menu.contains(target))) {
    return;
  }

  /* istanbul ignore else */
  if (isForm || hasData) ; else if (self) {
    self.hide();
  }
}

/**
 * Handles `click` event listener for `Dropdown`.
 * @this {HTMLElement}
 * @param {MouseEvent} e event object
 */
function dropdownClickHandler(e) {
  const element = this;
  const { target } = e;
  const self = getDropdownInstance(element);

  /* istanbul ignore else */
  if (self) {
    self.toggle();
    /* istanbul ignore else */
    if (target && isEmptyAnchor(target)) e.preventDefault();
  }
}

/**
 * Prevents scroll when dropdown-menu is visible.
 * @param {KeyboardEvent} e event object
 */
function dropdownPreventScroll(e) {
  /* istanbul ignore else */
  if ([keyArrowDown, keyArrowUp].includes(e.code)) e.preventDefault();
}

/**
 * Handles keyboard `keydown` events for `Dropdown`.
 * @param {KeyboardEvent} e keyboard key
 * @this {Document}
 */
function dropdownKeyHandler(e) {
  const { code } = e;
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);
  const { activeElement } = element && getDocument(element);
  /* istanbul ignore next: impossible to satisfy */
  if (!self || !activeElement) return;
  const { menu, open } = self;
  const menuItems = getMenuItems(menu);

  // arrow up & down
  if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
    let idx = menuItems.indexOf(activeElement);
    /* istanbul ignore else */
    if (activeElement === element) {
      idx = 0;
    } else if (code === keyArrowUp) {
      idx = idx > 1 ? idx - 1 : 0;
    } else if (code === keyArrowDown) {
      idx = idx < menuItems.length - 1 ? idx + 1 : idx;
    }
    /* istanbul ignore else */
    if (menuItems[idx]) focus(menuItems[idx]);
  }

  if (keyEscape === code && open) {
    self.toggle();
    focus(element);
  }
}

/**
 * @this {globalThis}
 * @returns {void}
 */
function dropdownLayoutHandler() {
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);

  /* istanbul ignore else */
  if (self && self.open) styleDropdown(self);
}

// DROPDOWN DEFINITION
// ===================
/** Returns a new Dropdown instance. */
class Dropdown extends BaseComponent {
  /**
   * @param {HTMLElement | string} target Element or string selector
   * @param {BSN.Options.Dropdown=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element } = self;
    const { parentElement } = element;

    // set targets
    /** @type {(Element | HTMLElement)} */
    self.parentElement = parentElement;
    /** @type {(Element | HTMLElement)} */
    self.menu = querySelector(`.${dropdownMenuClass}`, parentElement);

    // set initial state to closed
    /** @type {boolean} */
    self.open = false;

    // add event listener
    toggleDropdownHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return dropdownComponent; }
  /**
   * Returns component default options.
   */
  get defaults() { return dropdownDefaults; }
  /* eslint-enable */

  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    const self = this;

    if (self.open) self.hide();
    else self.show();
  }

  /** Shows the dropdown menu to the user. */
  show() {
    const self = this;
    const {
      element, open, menu, parentElement,
    } = self;

    /* istanbul ignore next */
    if (open) return;

    const currentElement = getCurrentOpenDropdown(element);
    const currentInstance = currentElement && getDropdownInstance(currentElement);
    if (currentInstance) currentInstance.hide();

    // dispatch event
    [showDropdownEvent, shownDropdownEvent].forEach((e) => {
      e.relatedTarget = element;
    });
    dispatchEvent(parentElement, showDropdownEvent);
    if (showDropdownEvent.defaultPrevented) return;

    addClass(menu, showClass);
    addClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'true');

    // change menu position
    styleDropdown(self);

    self.open = !open;

    focus(element); // focus the element
    toggleDropdownDismiss(self);
    dispatchEvent(parentElement, shownDropdownEvent);
  }

  /** Hides the dropdown menu from the user. */
  hide() {
    const self = this;
    const {
      element, open, menu, parentElement,
    } = self;

    /* istanbul ignore next */
    if (!open) return;

    [hideDropdownEvent, hiddenDropdownEvent].forEach((e) => {
      e.relatedTarget = element;
    });
    dispatchEvent(parentElement, hideDropdownEvent);
    if (hideDropdownEvent.defaultPrevented) return;

    removeClass(menu, showClass);
    removeClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'false');

    self.open = !open;
    // only re-attach handler if the instance is not disposed
    toggleDropdownDismiss(self);
    dispatchEvent(parentElement, hiddenDropdownEvent);
  }

  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    const self = this;
    if (self.open) self.hide();

    toggleDropdownHandler(self);

    super.dispose();
  }
}

ObjectAssign(Dropdown, {
  selector: dropdownSelector,
  init: dropdownInitCallback,
  getInstance: getDropdownInstance,
});

export { Dropdown as default };
