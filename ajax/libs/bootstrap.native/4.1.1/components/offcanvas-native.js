/*!
  * Native JavaScript for Bootstrap - Offcanvas v4.1.1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Offcanvas = factory());
})(this, (function () { 'use strict';

  /**
   * A global namespace for aria-hidden.
   * @type {string}
   */
  const ariaHidden = 'aria-hidden';

  /**
   * A global namespace for aria-modal.
   * @type {string}
   */
  const ariaModal = 'aria-modal';

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
   * A global namespace for aria-expanded.
   * @type {string}
   */
  const ariaExpanded = 'aria-expanded';

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
   * Shortcut for `HTMLElement.removeAttribute()` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {string} attribute attribute name
   * @returns {void}
   */
  const removeAttribute = (element, attribute) => element.removeAttribute(attribute);

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
   * Returns the `document.body` or the `<body>` element.
   *
   * @param {(Node | HTMLElement | Element | globalThis)=} node
   * @returns {HTMLElement | HTMLBodyElement}
   */
  function getDocumentBody(node) {
    return getDocument(node).body;
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
   * Global namespace for most components `dismiss` option.
   */
  const dataBsDismiss = 'data-bs-dismiss';

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /** @type {string} */
  const offcanvasString = 'offcanvas';

  /** @type {string} */
  const offcanvasComponent = 'Offcanvas';

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
   * Check if target is a `ShadowRoot`.
   *
   * @param {any} element target
   * @returns {boolean} the query result
   */
  const isShadowRoot = (element) => {
    const OwnElement = getWindow(element).ShadowRoot;
    return element instanceof OwnElement || element instanceof ShadowRoot;
  };

  /**
   * Returns the `parentNode` also going through `ShadowRoot`.
   * @see https://github.com/floating-ui/floating-ui
   *
   * @param {Node | HTMLElement | Element} node the target node
   * @returns {Node | HTMLElement | Element} the apropriate parent node
   */
  function getParentNode(node) {
    if (node.nodeName === 'HTML') {
      return node;
    }

    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    return (
      // @ts-ignore
      node.assignedSlot // step into the shadow DOM of the parent of a slotted node
      || node.parentNode // @ts-ignore DOM Element detected
      || (isShadowRoot(node) ? node.host : null) // ShadowRoot detected
      || getDocumentElement(node) // fallback
    );
  }

  /**
   * Check if a target element is a `<table>`, `<td>` or `<th>`.
   * @param {any} element the target element
   * @returns {boolean} the query result
   */
  const isTableElement = (element) => ['TABLE', 'TD', 'TH'].includes(element.tagName);

  /**
   * Checks if an element is an `HTMLElement`.
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  const isHTMLElement = (element) => element instanceof HTMLElement;

  /**
   * Returns an `HTMLElement` to be used as default value for *options.container*
   * for `Tooltip` / `Popover` components.
   *
   * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
   * offsets computation similar to **floating-ui**.
   * @see https://github.com/floating-ui/floating-ui
   *
   * @param {HTMLElement | Element} element the target
   * @param {boolean=} getOffset when *true* it will return an `offsetParent`
   * @returns {HTMLElement | HTMLBodyElement | Window | globalThis} the query result
   */
  function getElementContainer(element, getOffset) {
    const majorBlockTags = ['HTML', 'BODY'];

    if (getOffset) {
      /** @type {any} */
      let { offsetParent } = element;
      const win = getWindow(element);
      // const { innerWidth } = getDocumentElement(element);

      while (offsetParent && (isTableElement(offsetParent)
        || (isHTMLElement(offsetParent)
          // we must count for both fixed & sticky
          && !['sticky', 'fixed'].includes(getElementStyle(offsetParent, 'position'))))) {
        offsetParent = offsetParent.offsetParent;
      }

      if (!offsetParent || (offsetParent
        && (majorBlockTags.includes(offsetParent.tagName)
          || getElementStyle(offsetParent, 'position') === 'static'))) {
        offsetParent = win;
      }
      return offsetParent;
    }

    /** @type {(HTMLElement)[]} */
    const containers = [];
    /** @type {any} */
    let { parentNode } = element;

    while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
      parentNode = getParentNode(parentNode);
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
   * @param {HTMLElement | Element} element target
   * @returns {boolean}
   */
  function isVisible(element) {
    return element && getElementStyle(element, 'visibility') !== 'hidden'
      // @ts-ignore
      && element.offsetParent !== null;
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
   * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {Partial<CSSStyleDeclaration>} styles attribute value
   */
  // @ts-ignore
  const setElementStyle = (element, styles) => { ObjectAssign(element.style, styles); };

  /**
   * Global namespace for components `fixed-top` class.
   */
  const fixedTopClass = 'fixed-top';

  /**
   * Global namespace for components `fixed-bottom` class.
   */
  const fixedBottomClass = 'fixed-bottom';

  /**
   * Global namespace for components `sticky-top` class.
   */
  const stickyTopClass = 'sticky-top';

  /**
   * Global namespace for components `position-sticky` class.
   */
  const positionStickyClass = 'position-sticky';

  /** @param {(HTMLElement | Element | Document)=} parent */
  const getFixedItems = (parent) => [
    ...getElementsByClassName(fixedTopClass, parent),
    ...getElementsByClassName(fixedBottomClass, parent),
    ...getElementsByClassName(stickyTopClass, parent),
    ...getElementsByClassName(positionStickyClass, parent),
    ...getElementsByClassName('is-fixed', parent),
  ];

  /**
   * Removes *padding* and *overflow* from the `<body>`
   * and all spacing from fixed items.
   * @param {(HTMLElement | Element)=} element the target modal/offcanvas
   */
  function resetScrollbar(element) {
    const bd = getDocumentBody(element);
    setElementStyle(bd, {
      paddingRight: '',
      overflow: '',
    });

    const fixedItems = getFixedItems(bd);

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        setElementStyle(fixed, {
          paddingRight: '',
          marginRight: '',
        });
      });
    }
  }

  /**
   * Returns the scrollbar width if the body does overflow
   * the window.
   * @param {(HTMLElement | Element)=} element
   * @returns {number} the value
   */
  function measureScrollbar(element) {
    const { clientWidth } = getDocumentElement(element);
    const { innerWidth } = getWindow(element);
    return Math.abs(innerWidth - clientWidth);
  }

  /**
   * Sets the `<body>` and fixed items style when modal / offcanvas
   * is shown to the user.
   *
   * @param {HTMLElement | Element} element the target modal/offcanvas
   * @param {boolean=} overflow body does overflow or not
   */
  function setScrollbar(element, overflow) {
    const bd = getDocumentBody(element);
    const bodyPad = parseInt(getElementStyle(bd, 'paddingRight'), 10);
    const isOpen = getElementStyle(bd, 'overflow') === 'hidden';
    const sbWidth = isOpen && bodyPad ? 0 : measureScrollbar(element);
    const fixedItems = getFixedItems(bd);

    if (overflow) {
      setElementStyle(bd, {
        overflow: 'hidden',
        paddingRight: `${bodyPad + sbWidth}px`,
      });

      if (fixedItems.length) {
        fixedItems.forEach((fixed) => {
          const itemPadValue = getElementStyle(fixed, 'paddingRight');
          // @ts-ignore
          fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
          if ([stickyTopClass, positionStickyClass].some((c) => hasClass(fixed, c))) {
            const itemMValue = getElementStyle(fixed, 'marginRight');
            // @ts-ignore
            fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
          }
        });
      }
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
   * This is a shortie for `document.createElement` method
   * which allows you to create a new `HTMLElement` for a given `tagName`
   * or based on an object with specific non-readonly attributes:
   * `id`, `className`, `textContent`, `style`, etc.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
   *
   * @param {Record<string, string> | string} param `tagName` or object
   * @return {HTMLElement | Element} a new `HTMLElement` or `Element`
   */
  function createElement(param) {
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

  /** @type {string} */
  const modalString = 'modal';

  const backdropString = 'backdrop';
  const modalBackdropClass = `${modalString}-${backdropString}`;
  const offcanvasBackdropClass = `${offcanvasString}-${backdropString}`;
  const modalActiveSelector = `.${modalString}.${showClass}`;
  const offcanvasActiveSelector = `.${offcanvasString}.${showClass}`;

  // any document would suffice
  const overlay = createElement('div');

  /**
   * Returns the current active modal / offcancas element.
   * @param {(HTMLElement | Element)=} element the context element
   * @returns {(HTMLElement | Element)?} the requested element
   */
  function getCurrentOpen(element) {
    return querySelector(`${modalActiveSelector},${offcanvasActiveSelector}`, getDocument(element));
  }

  /**
   * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
   * @param {boolean=} isModal
   */
  function toggleOverlayType(isModal) {
    const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
    [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
      removeClass(overlay, c);
    });
    addClass(overlay, targetClass);
  }

  /**
   * Append the overlay to DOM.
   * @param {HTMLElement | Element} container
   * @param {boolean} hasFade
   * @param {boolean=} isModal
   */
  function appendOverlay(container, hasFade, isModal) {
    toggleOverlayType(isModal);
    container.append(overlay);
    if (hasFade) addClass(overlay, fadeClass);
  }

  /**
   * Shows the overlay to the user.
   */
  function showOverlay() {
    if (!hasClass(overlay, showClass)) {
      addClass(overlay, showClass);
      reflow(overlay);
    }
  }

  /**
   * Hides the overlay from the user.
   */
  function hideOverlay() {
    removeClass(overlay, showClass);
  }

  /**
   * Removes the overlay from DOM.
   * @param {(HTMLElement | Element)=} element
   */
  function removeOverlay(element) {
    if (!getCurrentOpen(element)) {
      removeClass(overlay, fadeClass);
      overlay.remove();
      resetScrollbar(element);
    }
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

  /* Native JavaScript for Bootstrap 5 | OffCanvas
  ------------------------------------------------ */

  // OFFCANVAS PRIVATE GC
  // ====================
  const offcanvasSelector = `.${offcanvasString}`;
  const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
  const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
  const offcanvasTogglingClass = `${offcanvasString}-toggling`;

  const offcanvasDefaults = {
    backdrop: true, // boolean
    keyboard: true, // boolean
    scroll: false, // boolean
  };

  /**
   * Static method which returns an existing `Offcanvas` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Offcanvas>}
   */
  const getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent);

  /**
   * An `Offcanvas` initialization callback.
   * @type {BSN.InitCallback<Offcanvas>}
   */
  const offcanvasInitCallback = (element) => new Offcanvas(element);

  // OFFCANVAS CUSTOM EVENTS
  // =======================
  const showOffcanvasEvent = OriginalEvent(`show.bs.${offcanvasString}`);
  const shownOffcanvasEvent = OriginalEvent(`shown.bs.${offcanvasString}`);
  const hideOffcanvasEvent = OriginalEvent(`hide.bs.${offcanvasString}`);
  const hiddenOffcanvasEvent = OriginalEvent(`hidden.bs.${offcanvasString}`);

  // OFFCANVAS PRIVATE METHODS
  // =========================
  /**
   * Sets additional style for the `<body>` and other elements
   * when showing an offcanvas to the user.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   */
  function setOffCanvasScrollbar(self) {
    const { element } = self;
    const { clientHeight, scrollHeight } = getDocumentElement(element);
    setScrollbar(element, clientHeight !== scrollHeight);
  }

  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   * @param {boolean=} add when *true*, listeners are added
   */
  function toggleOffcanvasEvents(self, add) {
    const action = add ? addListener : removeListener;
    self.triggers.forEach((btn) => action(btn, mouseclickEvent, offcanvasTriggerHandler));
  }

  /**
   * Toggles on/off the listeners of the events that close the offcanvas.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   * @param {boolean=} add when *true* listeners are added
   */
  function toggleOffCanvasDismiss(self, add) {
    const action = add ? addListener : removeListener;
    const doc = getDocument(self.element);
    action(doc, keydownEvent, offcanvasKeyDismissHandler);
    action(doc, mouseclickEvent, offcanvasDismissHandler);
  }

  /**
   * Executes before showing the offcanvas.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   */
  function beforeOffcanvasShow(self) {
    const { element, options } = self;

    if (!options.scroll) {
      setOffCanvasScrollbar(self);
      getDocumentBody(element).style.overflow = 'hidden';
    }

    addClass(element, offcanvasTogglingClass);
    addClass(element, showClass);
    // @ts-ignore
    element.style.visibility = 'visible';

    emulateTransitionEnd(element, () => showOffcanvasComplete(self));
  }

  /**
   * Executes before hiding the offcanvas.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   */
  function beforeOffcanvasHide(self) {
    const { element, options } = self;
    const currentOpen = getCurrentOpen(element);

    // @ts-ignore
    element.blur();

    if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
      hideOverlay();
      emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self));
    } else hideOffcanvasComplete(self);
  }

  // OFFCANVAS EVENT HANDLERS
  // ========================
  /**
   * Handles the `click` event listeners.
   *
   * @this {HTMLElement | Element}
   * @param {MouseEvent} e the `Event` object
   */
  function offcanvasTriggerHandler(e) {
    const trigger = closest(this, offcanvasToggleSelector);
    const element = trigger && getTargetElement(trigger);
    const self = element && getOffcanvasInstance(element);

    if (self) {
      self.relatedTarget = trigger;
      self.toggle();
      if (trigger && trigger.tagName === 'A') {
        e.preventDefault();
      }
    }
  }

  /**
   * Handles the event listeners that close the offcanvas.
   *
   * @this {Document}
   * @param {MouseEvent} e the `Event` object
   */
  function offcanvasDismissHandler(e) {
    const element = querySelector(offcanvasActiveSelector, this);
    if (!element) return;

    const offCanvasDismiss = querySelector(offcanvasDismissSelector, element);
    const self = getOffcanvasInstance(element);

    if (!self) return;

    const { options, triggers } = self;
    const { target } = e;
    // @ts-ignore -- `EventTarget` is `HTMLElement`
    const trigger = closest(target, offcanvasToggleSelector);
    const selection = getDocument(element).getSelection();

    if (!(selection && selection.toString().length)
      // @ts-ignore
      && ((!element.contains(target) && options.backdrop
      && (!trigger || (trigger && !triggers.includes(trigger))))
      // @ts-ignore
      || (offCanvasDismiss && offCanvasDismiss.contains(target)))) {
      // @ts-ignore
      self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target)
        ? offCanvasDismiss : null;
      self.hide();
    }
    if (trigger && trigger.tagName === 'A') e.preventDefault();
  }

  /**
   * Handles the `keydown` event listener for offcanvas
   * to hide it when user type the `ESC` key.
   *
   * @param {KeyboardEvent} e the `Event` object
   * @this {Document}
   */
  function offcanvasKeyDismissHandler({ code }) {
    const element = querySelector(offcanvasActiveSelector, this);
    if (!element) return;

    const self = getOffcanvasInstance(element);

    if (self && self.options.keyboard && code === keyEscape) {
      self.relatedTarget = null;
      self.hide();
    }
  }

  /**
   * Handles the `transitionend` when showing the offcanvas.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   */
  function showOffcanvasComplete(self) {
    const { element, triggers } = self;
    removeClass(element, offcanvasTogglingClass);

    removeAttribute(element, ariaHidden);
    setAttribute(element, ariaModal, 'true');
    setAttribute(element, 'role', 'dialog');

    if (triggers.length) {
      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'true'));
    }

    dispatchEvent(element, shownOffcanvasEvent);

    toggleOffCanvasDismiss(self, true);
    focus(element);
  }

  /**
   * Handles the `transitionend` when hiding the offcanvas.
   *
   * @param {Offcanvas} self the `Offcanvas` instance
   */
  function hideOffcanvasComplete(self) {
    const { element, triggers } = self;

    setAttribute(element, ariaHidden, 'true');
    removeAttribute(element, ariaModal);
    removeAttribute(element, 'role');
    // @ts-ignore
    element.style.visibility = '';

    if (triggers.length) {
      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'false'));
      const visibleTrigger = triggers.find((x) => isVisible(x));
      if (visibleTrigger) focus(visibleTrigger);
    }

    removeOverlay(element);

    dispatchEvent(element, hiddenOffcanvasEvent);
    removeClass(element, offcanvasTogglingClass);

    // must check for open instances
    if (!getCurrentOpen(element)) {
      toggleOffCanvasDismiss(self);
    }
  }

  // OFFCANVAS DEFINITION
  // ====================
  /** Returns a new `Offcanvas` instance. */
  class Offcanvas extends BaseComponent {
    /**
     * @param {HTMLElement | Element | string} target usually an `.offcanvas` element
     * @param {BSN.Options.Offcanvas=} config instance options
     */
    constructor(target, config) {
      super(target, config);
      const self = this;

      // instance element
      const { element } = self;

      // all the triggering buttons
      /** @type {(HTMLElement | Element)[]} */
      self.triggers = [...querySelectorAll(offcanvasToggleSelector)]
        .filter((btn) => getTargetElement(btn) === element);

      // additional instance property
      /** @type {HTMLBodyElement | HTMLElement | Element} */
      // @ts-ignore
      self.container = getElementContainer(element);
      /** @type {(HTMLElement | Element)?} */
      self.relatedTarget = null;

      // attach event listeners
      toggleOffcanvasEvents(self, true);
    }

    /* eslint-disable */
    /**
     * Returns component name string.
     * @readonly @static
     */
    get name() { return offcanvasComponent; }
    /**
     * Returns component default options.
     * @readonly @static
     */
    get defaults() { return offcanvasDefaults; }
    /* eslint-enable */

    // OFFCANVAS PUBLIC METHODS
    // ========================
    /** Shows or hides the offcanvas from the user. */
    toggle() {
      const self = this;
      if (hasClass(self.element, showClass)) self.hide();
      else self.show();
    }

    /** Shows the offcanvas to the user. */
    show() {
      const self = this;
      const {
        element, options, container, relatedTarget,
      } = self;
      let overlayDelay = 0;

      if (hasClass(element, showClass)) return;

      showOffcanvasEvent.relatedTarget = relatedTarget;
      shownOffcanvasEvent.relatedTarget = relatedTarget;
      dispatchEvent(element, showOffcanvasEvent);
      if (showOffcanvasEvent.defaultPrevented) return;

      // we elegantly hide any opened modal/offcanvas
      const currentOpen = getCurrentOpen(element);
      if (currentOpen && currentOpen !== element) {
        const this1 = getOffcanvasInstance(currentOpen);
        const that1 = this1 || getInstance(currentOpen, 'Modal');
        that1.hide();
      }

      if (options.backdrop) {
        if (!container.contains(overlay)) {
          appendOverlay(container, true);
        } else {
          toggleOverlayType();
        }

        overlayDelay = getElementTransitionDuration(overlay);
        showOverlay();

        setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
      } else {
        beforeOffcanvasShow(self);
        if (currentOpen && hasClass(overlay, showClass)) {
          hideOverlay();
        }
      }
    }

    /**
     * Hides the offcanvas from the user.
     * @param {boolean=} force when `true` it will skip animation
     */
    hide(force) {
      const self = this;
      const { element, relatedTarget } = self;

      if (!hasClass(element, showClass)) return;

      hideOffcanvasEvent.relatedTarget = relatedTarget;
      hiddenOffcanvasEvent.relatedTarget = relatedTarget;
      dispatchEvent(element, hideOffcanvasEvent);
      if (hideOffcanvasEvent.defaultPrevented) return;

      addClass(element, offcanvasTogglingClass);
      removeClass(element, showClass);

      if (!force) {
        emulateTransitionEnd(element, () => beforeOffcanvasHide(self));
      } else beforeOffcanvasHide(self);
    }

    /** Removes the `Offcanvas` from the target element. */
    dispose() {
      const self = this;
      self.hide(true);
      toggleOffcanvasEvents(self);
      super.dispose();
    }
  }

  ObjectAssign(Offcanvas, {
    selector: offcanvasSelector,
    init: offcanvasInitCallback,
    getInstance: getOffcanvasInstance,
  });

  return Offcanvas;

}));
