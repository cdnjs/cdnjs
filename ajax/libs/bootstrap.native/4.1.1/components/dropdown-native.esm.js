/*!
  * Native JavaScript for Bootstrap - Dropdown v4.1.1 (https://thednp.github.io/bootstrap.native/)
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
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 * @returns {void}
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.hasAttribute()` method.
 * @param  {HTMLElement | Element} element target element
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
 * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {Partial<CSSStyleDeclaration>} styles attribute value
 */
// @ts-ignore
const setElementStyle = (element, styles) => { ObjectAssign(element.style, styles); };

/**
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement | Element} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

/**
 * Utility to focus an `HTMLElement` target.
 *
 * @param {HTMLElement | Element} element is the target
 */
// @ts-ignore -- `Element`s resulted from querySelector can focus too
const focus = (element) => element.focus();

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
 * Checks if a page is Right To Left.
 * @param {(HTMLElement | Element)=} node the target
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
 * @param {HTMLElement | HTMLAnchorElement | EventTarget} element the target element
 * @returns {boolean} the query result
 */
function isEmptyAnchor(element) {
  // @ts-ignore -- `EventTarget` must be `HTMLElement`
  const parentAnchor = closest(element, 'A');
  // @ts-ignore -- anchor href starts with #
  return element && ((hasAttribute(element, 'href') && element.href.slice(-1) === '#')
    // @ts-ignore -- OR a child of an anchor with href starts with #
    || (parentAnchor && hasAttribute(parentAnchor, 'href') && parentAnchor.href.slice(-1) === '#'));
}

/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement | Element} element target element
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
  if (getElementStyle(menu, 'position') === 'static') return;

  const RTL = isRTL(element);
  const menuEnd = hasClass(parentElement, dropdownMenuEndClass);

  // reset menu offset and position
  const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
  // @ts-ignore
  resetProps.forEach((p) => { menu.style[p] = ''; });

  // set initial position class
  // take into account .btn-group parent as .dropdown
  let positionClass = dropdownMenuClasses.find((c) => hasClass(parentElement, c)) || dropdownString;

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
    menuEnd: RTL ? { right: 'auto', left: 0 } : { right: 0, left: 'auto' },
  };

  // @ts-ignore
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
    if (targetLeft + targetWidth + Math.abs(menuWidth - targetWidth) + offset < clientWidth) {
      ObjectAssign(dropdownPosition[positionClass],
        leftExceed ? { left: 0, right: 'auto' } : { left: 'auto', right: 0 });
    }
  }

  dropdownMargin = dropdownMargin[positionClass];
  // @ts-ignore
  menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;

  setElementStyle(menu, dropdownPosition[positionClass]);

  // update dropdown-menu-end
  if (hasClass(menu, dropdownMenuEndClass)) {
    setElementStyle(menu, dropdownPosition.menuEnd);
  }
}

/**
 * Returns an `Array` of focusable items in the given dropdown-menu.
 * @param {HTMLElement | Element} menu
 * @returns {(HTMLElement | Element)[]}
 */
function getMenuItems(menu) {
  // @ts-ignore
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
  const { element } = self;
  const action = self.open ? addListener : removeListener;
  const doc = getDocument(element);

  action(doc, mouseclickEvent, dropdownDismissHandler);
  action(doc, focusEvent, dropdownDismissHandler);
  action(doc, keydownEvent, dropdownPreventScroll);
  action(doc, keyupEvent, dropdownKeyHandler);

  if (self.options.display === 'dynamic') {
    [scrollEvent, resizeEvent].forEach((ev) => {
      // @ts-ignore
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
 * @param {(Document | HTMLElement | Element | globalThis)=} element target
 * @returns {HTMLElement?} the query result
 */
function getCurrentOpenDropdown(element) {
  const currentParent = [...dropdownMenuClasses, 'btn-group', 'input-group']
    .map((c) => getElementsByClassName(`${c} ${showClass}`), getDocument(element))
    .find((x) => x.length);

  if (currentParent && currentParent.length) {
    // @ts-ignore -- HTMLElement is also Element
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
  // @ts-ignore
  if (!target || !target.closest) return; // some weird FF bug #409

  // @ts-ignore
  const element = getCurrentOpenDropdown(target);
  if (!element) return;

  const self = getDropdownInstance(element);
  if (!self) return;

  const { parentElement, menu } = self;

  // @ts-ignore
  const hasData = closest(target, dropdownSelector) !== null;
  // @ts-ignore
  const isForm = parentElement && parentElement.contains(target)
    // @ts-ignore
    && (target.tagName === 'form' || closest(target, 'form') !== null);

  // @ts-ignore
  if (type === mouseclickEvent && isEmptyAnchor(target)) {
    e.preventDefault();
  }
  if (type === focusEvent // @ts-ignore
    && (target === element || target === menu || menu.contains(target))) {
    return;
  }

  if (isForm || hasData) ; else if (self) {
    self.hide();
  }
}

/**
 * Handles `click` event listener for `Dropdown`.
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e event object
 */
function dropdownClickHandler(e) {
  const element = this;
  const { target } = e;
  const self = getDropdownInstance(element);

  if (self) {
    self.toggle();
    if (target && isEmptyAnchor(target)) e.preventDefault();
  }
}

/**
 * Prevents scroll when dropdown-menu is visible.
 * @param {KeyboardEvent} e event object
 */
function dropdownPreventScroll(e) {
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
  const activeItem = element && getDocument(element).activeElement;
  if (!self || !activeItem) return;
  const { menu, open } = self;
  const menuItems = getMenuItems(menu);

  // arrow up & down
  if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
    let idx = menuItems.indexOf(activeItem);
    if (activeItem === element) {
      idx = 0;
    } else if (code === keyArrowUp) {
      idx = idx > 1 ? idx - 1 : 0;
    } else if (code === keyArrowDown) {
      idx = idx < menuItems.length - 1 ? idx + 1 : idx;
    }
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

  if (self && self.open) styleDropdown(self);
}

// DROPDOWN DEFINITION
// ===================
/** Returns a new Dropdown instance. */
class Dropdown extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target Element or string selector
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
    // @ts-ignore
    self.parentElement = parentElement;
    /** @type {(Element | HTMLElement)} */
    // @ts-ignore
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
   * @readonly @static
   */
  get name() { return dropdownComponent; }
  /**
   * Returns component default options.
   * @readonly @static
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

    const currentElement = getCurrentOpenDropdown(element);
    const currentInstance = currentElement && getDropdownInstance(currentElement);
    if (currentInstance) currentInstance.hide();

    // dispatch
    [showDropdownEvent, shownDropdownEvent].forEach((e) => { e.relatedTarget = element; });
    dispatchEvent(parentElement, showDropdownEvent);
    if (showDropdownEvent.defaultPrevented) return;

    addClass(menu, showClass);
    addClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'true');

    // change menu position
    styleDropdown(self);

    self.open = !open;

    setTimeout(() => {
      focus(element); // focus the element
      toggleDropdownDismiss(self);
      dispatchEvent(parentElement, shownDropdownEvent);
    }, 1);
  }

  /** Hides the dropdown menu from the user. */
  hide() {
    const self = this;
    const {
      element, open, menu, parentElement,
    } = self;
    [hideDropdownEvent, hiddenDropdownEvent].forEach((e) => { e.relatedTarget = element; });

    dispatchEvent(parentElement, hideDropdownEvent);
    if (hideDropdownEvent.defaultPrevented) return;

    removeClass(menu, showClass);
    removeClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'false');

    self.open = !open;

    // only re-attach handler if the instance is not disposed
    setTimeout(() => toggleDropdownDismiss(self), 1);

    dispatchEvent(parentElement, hiddenDropdownEvent);
  }

  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    const self = this;
    const { parentElement } = self;

    if (hasClass(parentElement, showClass) && self.open) self.hide();

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
