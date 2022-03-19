/*!
  * Native JavaScript for Bootstrap - Button v4.1.2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Button = factory());
})(this, (function () { 'use strict';

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
   * @param  {HTMLElement | Element} element target element
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
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /** @type {string} */
  const buttonString = 'button';

  /** @type {string} */
  const buttonComponent = 'Button';

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

  var version = "4.1.2";

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
     * @param {HTMLElement | Element | string} target usually a `.btn` element
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
     * @readonly @static
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
      // @ts-ignore
      const self = e ? getButtonInstance(this) : this;
      if (!self) return;
      const { element } = self;

      if (hasClass(element, 'disabled')) return;
      self.isActive = hasClass(element, activeClass);
      const { isActive } = self;

      const action = isActive ? removeClass : addClass;

      action(element, activeClass);
      setAttribute(element, ariaPressed, isActive ? 'false' : 'true');
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

  return Button;

}));
