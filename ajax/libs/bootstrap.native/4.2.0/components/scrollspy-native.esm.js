/*!
  * Native JavaScript for Bootstrap - ScrollSpy v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * Shortcut for `HTMLElement.getAttribute()` method.
 * @param {HTMLElement} element target element
 * @param {string} attribute attribute name
 * @returns {string?} attribute value
 */
const getAttribute = (element, attribute) => element.getAttribute(attribute);

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
 * Shortcut for `HTMLElement.getElementsByTagName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByTagName`.
 *
 * @param {string} selector the tag name
 * @param {ParentNode=} parent optional Element to look into
 * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
 */
function getElementsByTagName(selector, parent) {
  const lookUp = isNode(parent) ? parent : getDocument();
  return lookUp.getElementsByTagName(selector);
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
 * Returns the `document.documentElement` or the `<html>` element.
 *
 * @param {(Node | Window)=} node
 * @returns {HTMLHtmlElement}
 */
function getDocumentElement(node) {
  return getDocument(node).documentElement;
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
 * Shortcut for `Object.assign()` static method.
 * @param  {Record<string, any>} obj a target object
 * @param  {Record<string, any>} source a source object
 */
const ObjectAssign = (obj, source) => Object.assign(obj, source);

/**
 * A global namespace for `scroll` event.
 * @type {string}
 */
const scrollEvent = 'scroll';

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

/** @type {string} */
const scrollspyString = 'scrollspy';

/** @type {string} */
const scrollspyComponent = 'ScrollSpy';

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

/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */

// SCROLLSPY PRIVATE GC
// ====================
const scrollspySelector = '[data-bs-spy="scroll"]';

const scrollspyDefaults = {
  offset: 10,
  target: null,
};

/**
 * Static method which returns an existing `ScrollSpy` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<ScrollSpy>}
 */
const getScrollSpyInstance = (element) => getInstance(element, scrollspyComponent);

/**
 * A `ScrollSpy` initialization callback.
 * @type {BSN.InitCallback<ScrollSpy>}
 */
const scrollspyInitCallback = (element) => new ScrollSpy(element);

// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = OriginalEvent(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
/**
 * Update the state of all items.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 */
function updateSpyTargets(self) {
  const {
    target, scrollTarget, options, itemsLength, scrollHeight, element,
  } = self;
  const { offset } = options;
  const isWin = isWindow(scrollTarget);

  const links = target && getElementsByTagName('A', target);
  const scrollHEIGHT = scrollTarget && getScrollHeight(scrollTarget);

  self.scrollTop = isWin ? scrollTarget.scrollY : scrollTarget.scrollTop;

  // only update items/offsets once or with each mutation
  /* istanbul ignore else */
  if (links && (itemsLength !== links.length || scrollHEIGHT !== scrollHeight)) {
    let href;
    let targetItem;
    let rect;

    // reset arrays & update
    self.items = [];
    self.offsets = [];
    self.scrollHeight = scrollHEIGHT;
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    [...links].forEach((link) => {
      href = getAttribute(link, 'href');
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#'
        && querySelector(href, getDocument(element));

      if (targetItem) {
        self.items.push(link);
        rect = getBoundingClientRect(targetItem);
        self.offsets.push((isWin ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    self.itemsLength = self.items.length;
  }
}

/**
 * Returns the `scrollHeight` property of the scrolling element.
 * @param {Node | Window} scrollTarget the `ScrollSpy` instance
 * @return {number} `scrollTarget` height
 */
function getScrollHeight(scrollTarget) {
  return isHTMLElement(scrollTarget)
    ? scrollTarget.scrollHeight
    : getDocumentElement(scrollTarget).scrollHeight;
}

/**
 * Returns the height property of the scrolling element.
 * @param {ScrollSpy} params the `ScrollSpy` instance
 * @returns {number}
 */
function getOffsetHeight({ element, scrollTarget }) {
  return (isWindow(scrollTarget))
    ? scrollTarget.innerHeight
    : getBoundingClientRect(element).height;
}

/**
 * Clear all items of the target.
 * @param {HTMLElement} target a single item
 */
function clear(target) {
  [...getElementsByTagName('A', target)].forEach((item) => {
    if (hasClass(item, activeClass)) removeClass(item, activeClass);
  });
}

/**
 * Activates a new item.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {HTMLElement} item a single item
 */
function activate(self, item) {
  const { target, element } = self;
  clear(target);
  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents = [];
  let parentItem = item;
  while (parentItem !== getDocumentBody(element)) {
    parentItem = parentItem.parentElement;
    if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
  }

  parents.forEach((menuItem) => {
    /** @type {HTMLElement?} */
    const parentLink = menuItem.previousElementSibling;

    /* istanbul ignore else */
    if (parentLink && !hasClass(parentLink, activeClass)) {
      addClass(parentLink, activeClass);
    }
  });

  // dispatch
  activateScrollSpy.relatedTarget = item;
  dispatchEvent(element, activateScrollSpy);
}

/**
 * Toggles on/off the component event listener.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {boolean=} add when `true`, listener is added
 */
function toggleSpyHandlers(self, add) {
  const action = add ? addListener : removeListener;
  action(self.scrollTarget, scrollEvent, self.refresh, passiveHandler);
}

// SCROLLSPY DEFINITION
// ====================
/** Returns a new `ScrollSpy` instance. */
class ScrollSpy extends BaseComponent {
  /**
   * @param {HTMLElement | string} target the target element
   * @param {BSN.Options.ScrollSpy=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element & options
    const { element, options } = self;

    // additional properties
    /** @type {HTMLElement?} */
    self.target = querySelector(options.target, getDocument(element));

    // invalidate
    if (!self.target) return;

    // set initial state
    /** @type {HTMLElement | Window} */
    self.scrollTarget = element.clientHeight < element.scrollHeight
      ? element : getWindow(element);
    /** @type {number} */
    self.scrollTop = 0;
    /** @type {number} */
    self.maxScroll = 0;
    /** @type {number} */
    self.scrollHeight = 0;
    /** @type {HTMLElement?} */
    self.activeItem = null;
    /** @type {HTMLElement[]} */
    self.items = [];
    /** @type {number} */
    self.itemsLength = 0;
    /** @type {number[]} */
    self.offsets = [];

    // bind events
    self.refresh = self.refresh.bind(self);

    // add event handlers
    toggleSpyHandlers(self, true);

    self.refresh();
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return scrollspyComponent; }
  /**
   * Returns component default options.
   */
  get defaults() { return scrollspyDefaults; }
  /* eslint-enable */

  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const self = this;
    const { target } = self;

    // check if target is visible and invalidate
    /* istanbul ignore next */
    if (target.offsetHeight === 0) return;

    updateSpyTargets(self);

    const {
      scrollTop, maxScroll, itemsLength, items, activeItem,
    } = self;

    if (scrollTop >= maxScroll) {
      const newActiveItem = items[itemsLength - 1];

      /* istanbul ignore else */
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

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    toggleSpyHandlers(this);
    super.dispose();
  }
}

ObjectAssign(ScrollSpy, {
  selector: scrollspySelector,
  init: scrollspyInitCallback,
  getInstance: getScrollSpyInstance,
});

export { ScrollSpy as default };
