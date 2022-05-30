/*!
  * Native JavaScript for Bootstrap - Button v4.2.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * A global namespace for aria-pressed.
 * @type {string}
 */
const ariaPressed = 'aria-pressed';

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
 * Shortcut for `Object.assign()` static method.
 * @param  {Record<string, any>} obj a target object
 * @param  {Record<string, any>} source a source object
 */
const ObjectAssign = (obj, source) => Object.assign(obj, source);

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
 * Global namespace for most components `toggle` option.
 */
const dataBsToggle = 'data-bs-toggle';

/** @type {string} */
const buttonString = 'button';

/** @type {string} */
const buttonComponent = 'Button';

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

/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/

// BUTTON PRIVATE GC
// =================
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;

/**
 * Static method which returns an existing `Button` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Button>}
 */
const getButtonInstance = (element) => getInstance(element, buttonComponent);

/**
 * A `Button` initialization callback.
 * @type {BSN.InitCallback<Button>}
 */
const buttonInitCallback = (element) => new Button(element);

// BUTTON PRIVATE METHOD
// =====================
/**
 * Toggles on/off the `click` event listener.
 * @param {Button} self the `Button` instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleButtonHandler(self, add) {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, self.toggle);
}

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
class Button extends BaseComponent {
  /**
   * @param {HTMLElement | string} target usually a `.btn` element
   */
  constructor(target) {
    super(target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    /** @type {boolean} */
    self.isActive = hasClass(element, activeClass);
    setAttribute(element, ariaPressed, `${!!self.isActive}`);

    // add event listener
    toggleButtonHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return buttonComponent; }
  /* eslint-enable */

  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   * @param {MouseEvent} e usually `click` Event object
   */
  toggle(e) {
    if (e) e.preventDefault();
    const self = e ? getButtonInstance(this) : this;
    if (!self.element) return;
    const { element, isActive } = self;

    if (hasClass(element, 'disabled')) return;

    const action = isActive ? removeClass : addClass;
    action(element, activeClass);
    setAttribute(element, ariaPressed, isActive ? 'false' : 'true');
    self.isActive = hasClass(element, activeClass);
  }

  /** Removes the `Button` component from the target element. */
  dispose() {
    toggleButtonHandler(this);
    super.dispose();
  }
}

ObjectAssign(Button, {
  selector: buttonSelector,
  init: buttonInitCallback,
  getInstance: getButtonInstance,
});

export { Button as default };
