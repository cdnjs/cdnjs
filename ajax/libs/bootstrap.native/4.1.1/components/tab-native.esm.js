/*!
  * Native JavaScript for Bootstrap - Tab v4.1.1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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
 * @param  {HTMLElement | Element} element target element
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
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement | Element} element is the target
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
 * A global namespace for 'transitionDuration' string.
 * @type {string}
 */
const transitionDuration = 'transitionDuration';

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
 * Utility to force re-paint of an `HTMLElement` target.
 *
 * @param {HTMLElement | Element} element is the target
 * @return {number} the `Element.offsetHeight` value
 */
// @ts-ignore
const reflow = (element) => element.offsetHeight;

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
 * @param {HTMLElement | Element} element target element
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
 * @type {Map<(HTMLElement | Element), any>}
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

  if (tabContent && hasClass(tabContent, collapsingClass)) {
    // @ts-ignore
    tabContent.style.height = '';
    removeClass(tabContent, collapsingClass);
  }

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

  if (tabContent && hasClass(nextContent, fadeClass)) { // height animation
    const { currentHeight, nextHeight } = tabPrivate.get(element);
    if (currentHeight === nextHeight) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => { // enables height animation
        // @ts-ignore
        tabContent.style.height = `${nextHeight}px`; // height animation
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

  if (tabContent && hasClass(nextContent, fadeClass)) {
    [content, nextContent].forEach((c) => {
      addClass(c, 'overflow-hidden');
    });
    currentHeight = content.scrollHeight || 0;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = tab;
  hiddenTabEvent.relatedTarget = element;
  dispatchEvent(element, showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextContent, activeClass);
  removeClass(content, activeClass);

  if (tabContent && hasClass(nextContent, fadeClass)) {
    const nextHeight = nextContent.scrollHeight;
    tabPrivate.set(element, { currentHeight, nextHeight });

    addClass(tabContent, collapsingClass);
    // @ts-ignore -- height animation
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

  // @ts-ignore
  const activeTabs = getElementsByClassName(activeClass, nav);
  /** @type {(HTMLElement | Element)=} */
  let tab;
  if (activeTabs.length === 1
    // @ts-ignore
    && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentElement, c))) {
    [tab] = activeTabs;
  } else if (activeTabs.length > 1) {
    tab = activeTabs[activeTabs.length - 1];
  }
  const content = tab ? getTargetElement(tab) : null;
  // @ts-ignore
  return { tab, content };
}

/**
 * Returns a parent dropdown.
 * @param {HTMLElement | Element} element the `Tab` element
 * @returns {(HTMLElement | Element)?} the parent dropdown
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
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  if (!self) return;
  e.preventDefault();

  self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
class Tab extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target the target element
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

    /** @type {(HTMLElement | Element)?} */
    self.nav = nav;
    /** @type {HTMLElement | Element} */
    self.content = content;
    /** @type {(HTMLElement | Element)?} */
    self.tabContent = container;

    // event targets
    /** @type {(HTMLElement | Element)?} */
    self.dropdown = getParentDropdown(element);

    // show first Tab instance of none is shown
    // suggested on #432
    const { tab } = getActiveTab(self);
    if (nav && !tab) {
      const firstTab = querySelector(tabSelector, nav);
      const firstTabContent = firstTab && getTargetElement(firstTab);

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
   * @readonly @static
   */  
  get name() { return tabComponent; }
  /* eslint-enable */

  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const self = this;
    const { element, nav, dropdown } = self;

    if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
      const { tab, content } = getActiveTab(self);

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

      if (nav) {
        Timer.set(nav, () => {
          removeClass(tab, activeClass);
          setAttribute(tab, ariaSelected, 'false');
          if (dropdown && !hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
        }, 1);
      }

      if (hasClass(content, fadeClass)) {
        removeClass(content, showClass);
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

export { Tab as default };
