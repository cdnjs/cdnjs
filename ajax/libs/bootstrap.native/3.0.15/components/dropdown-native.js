/*!
  * Native JavaScript for Bootstrap Dropdown v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Dropdown = factory());
}(this, (function () { 'use strict';

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          result = true;
          return result;
        },
      });
      document[addEventListener]('DOMContentLoaded', function wrap() {
        document[removeEventListener]('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  // general event options

  var passiveHandler = supportPassive ? { passive: true } : false;

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  const ariaExpanded = 'aria-expanded';

  const showClass = 'show';

  const dataBsToggle = 'data-bs-toggle';

  const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

  const dropdownMenuClass = 'dropdown-menu';

  function bootstrapCustomEvent(namespacedEventType, eventProperties) {
    const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

    if (eventProperties instanceof Object) {
      Object.keys(eventProperties).forEach((key) => {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  function isEmptyAnchor(elem) {
    const parentAnchor = elem.closest('A');
    // anchor href starts with #
    return elem && ((elem.href && elem.href.slice(-1) === '#')
      // OR a child of an anchor with href starts with #
      || (parentAnchor && parentAnchor.href && parentAnchor.href.slice(-1) === '#'));
  }

  function setFocus(element) {
    element.focus();
  }

  function normalizeValue(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (!Number.isNaN(+value)) {
      return +value;
    }

    if (value === '' || value === 'null') {
      return null;
    }

    // string / function / Element / Object
    return value;
  }

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const normalOps = {};
    const dataOps = {};
    const data = { ...element.dataset };

    Object.keys(data)
      .forEach((k) => {
        const key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach((k) => {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach((k) => {
        if (k in inputOps) {
          normalOps[k] = inputOps[k];
        } else if (k in dataOps) {
          normalOps[k] = dataOps[k];
        } else {
          normalOps[k] = defaultOps[k];
        }
      });

    return normalOps;
  }

  /* Native JavaScript for Bootstrap 5 | Base Component
  ----------------------------------------------------- */

  class BaseComponent {
    constructor(name, target, defaults, config) {
      const self = this;
      const element = queryElement(target);

      if (element[name]) element[name].dispose();
      self.element = element;

      if (defaults && Object.keys(defaults).length) {
        self.options = normalizeOptions(element, defaults, (config || {}), 'bs');
      }
      element[name] = self;
    }

    dispose(name) {
      const self = this;
      self.element[name] = null;
      Object.keys(self).forEach((prop) => { self[prop] = null; });
    }
  }

  /* Native JavaScript for Bootstrap 5 | Dropdown
  ----------------------------------------------- */

  // DROPDOWN PRIVATE GC
  // ===================
  const [dropdownString] = dropdownMenuClasses;
  const dropdownComponent = 'Dropdown';
  const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

  // DROPDOWN PRIVATE GC
  // ===================
  const dropupString = dropdownMenuClasses[1];
  const dropstartString = dropdownMenuClasses[2];
  const dropendString = dropdownMenuClasses[3];
  const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
  const hideMenuClass = ['d-block', 'invisible'];
  const verticalClass = [dropdownString, dropupString];
  const horizontalClass = [dropstartString, dropendString];
  const defaultDropdownOptions = {
    offset: 5, // [number] 5(px)
    display: 'dynamic', // [dynamic|static]
  };

  // DROPDOWN CUSTOM EVENTS
  // ========================
  const showDropdownEvent = bootstrapCustomEvent(`show.bs.${dropdownString}`);
  const shownDropdownEvent = bootstrapCustomEvent(`shown.bs.${dropdownString}`);
  const hideDropdownEvent = bootstrapCustomEvent(`hide.bs.${dropdownString}`);
  const hiddenDropdownEvent = bootstrapCustomEvent(`hidden.bs.${dropdownString}`);

  // DROPDOWN PRIVATE METHODS
  // ========================
  function styleDropdown(self, show) {
    const {
      element, menu, originalClass, menuEnd, options,
    } = self;
    const parent = element.parentElement;

    // reset menu offset and position
    const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
    resetProps.forEach((p) => { menu.style[p] = ''; });
    removeClass(parent, 'position-static');

    if (!show) {
      parent.className = originalClass.join(' ');
      const menuAction = menuEnd && !hasClass(menu, dropdownMenuEndClass) ? addClass : removeClass;
      menuAction(menu, dropdownMenuEndClass);
      return;
    }

    const { offset } = options;
    let positionClass = dropdownMenuClasses.find((c) => originalClass.includes(c));

    let dropdownMargin = {
      dropdown: [offset, 0, 0],
      dropup: [0, 0, offset],
      dropstart: [-1, offset, 0],
      dropend: [-1, 0, 0, offset],
    };

    const dropdownPosition = {
      dropdown: { top: '100%' },
      dropup: { top: 'auto', bottom: '100%' },
      dropstart: { left: 'auto', right: '100%' },
      dropend: { left: '100%', right: 'auto' },
      menuEnd: { right: 0, left: 'auto' },
    };

    // force showing the menu to calculate its size
    hideMenuClass.forEach((c) => addClass(menu, c));

    const dropdownRegex = new RegExp(`\\b(${dropdownString}|${dropupString}|${dropstartString}|${dropendString})+`);
    const elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    const menuDimensions = { w: menu.offsetWidth, h: menu.offsetHeight };
    const HTML = document.documentElement;
    const BD = document.body;
    const windowWidth = (HTML.clientWidth || BD.clientWidth);
    const windowHeight = (HTML.clientHeight || BD.clientHeight);
    const targetBCR = element.getBoundingClientRect();
    // dropdownMenuEnd && [ dropdown | dropup ]
    const leftExceed = targetBCR.left + elementDimensions.w - menuDimensions.w < 0;
    // dropstart
    const leftFullExceed = targetBCR.left - menuDimensions.w < 0;
    // !dropdownMenuEnd && [ dropdown | dropup ]
    const rightExceed = targetBCR.left + menuDimensions.w >= windowWidth;
    // dropend
    const rightFullExceed = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth;
    // dropstart | dropend
    const bottomExceed = targetBCR.top + menuDimensions.h >= windowHeight;
    // dropdown
    const bottomFullExceed = targetBCR.top + menuDimensions.h + elementDimensions.h >= windowHeight;
    // dropup
    const topExceed = targetBCR.top - menuDimensions.h < 0;

    const btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical');

    // recompute position
    if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
      positionClass = dropdownString;
    }
    if (horizontalClass.includes(positionClass) && bottomExceed) {
      positionClass = dropupString;
    }
    if (positionClass === dropstartString && leftFullExceed && !bottomExceed) {
      positionClass = dropendString;
    }
    if (positionClass === dropendString && rightFullExceed && !bottomExceed) {
      positionClass = dropstartString;
    }
    if (positionClass === dropupString && topExceed && !bottomFullExceed) {
      positionClass = dropdownString;
    }
    if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
      positionClass = dropupString;
    }

    // set spacing
    dropdownMargin = dropdownMargin[positionClass];
    menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;
    Object.keys(dropdownPosition[positionClass]).forEach((position) => {
      menu.style[position] = dropdownPosition[positionClass][position];
    });

    // update dropdown position class
    if (!hasClass(parent, positionClass)) {
      parent.className = parent.className.replace(dropdownRegex, positionClass);
    }

    // update dropdown / dropup to handle parent btn-group element
    // as well as the dropdown-menu-end utility class
    if (verticalClass.includes(positionClass)) {
      const menuEndAction = rightExceed ? addClass : removeClass;

      if (!btnGroup) menuEndAction(menu, dropdownMenuEndClass);
      else if (leftExceed) addClass(parent, 'position-static');

      if (hasClass(menu, dropdownMenuEndClass)) {
        Object.keys(dropdownPosition.menuEnd).forEach((p) => {
          menu.style[p] = dropdownPosition.menuEnd[p];
        });
      }
    }

    // remove util classes from the menu, we have its size
    hideMenuClass.forEach((c) => removeClass(menu, c));
  }

  function toggleDropdownDismiss(self) {
    const action = self.open ? addEventListener : removeEventListener;

    document[action]('click', dropdownDismissHandler);
    document[action]('focus', dropdownDismissHandler);
    document[action]('keydown', dropdownPreventScroll);
    document[action]('keyup', dropdownKeyHandler);
    if (self.options.display === 'dynamic') {
      window[action]('scroll', dropdownLayoutHandler, passiveHandler);
      window[action]('resize', dropdownLayoutHandler, passiveHandler);
    }
  }

  function toggleDropdownHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    self.element[action]('click', dropdownClickHandler);
  }

  function getCurrentOpenDropdown() {
    const currentParent = dropdownMenuClasses
      .map((c) => document.getElementsByClassName(`${c} ${showClass}`))
      .find((x) => x.length);

    if (currentParent && currentParent.length) {
      return Array.from(currentParent[0].children).find((x) => x.hasAttribute(dataBsToggle));
    }
    return null;
  }

  // DROPDOWN EVENT HANDLERS
  // =======================
  function dropdownDismissHandler(e) {
    const { target, type } = e;
    if (!target.closest) return; // some weird FF bug #409

    const element = getCurrentOpenDropdown();
    const parent = element && element.parentNode;
    const self = element && element[dropdownComponent];
    const menu = self && self.menu;

    const hasData = target.closest(dropdownSelector) !== null;
    const isForm = parent && parent.contains(target)
      && (target.tagName === 'form' || target.closest('form') !== null);

    if (type === 'click' && isEmptyAnchor(target)) {
      e.preventDefault();
    }
    if (type === 'focus'
      && (target === element || target === menu || menu.contains(target))) {
      return;
    }

    if (isForm || hasData) ; else if (self) {
      self.hide(element);
    }
  }

  function dropdownClickHandler(e) {
    const element = this;
    const self = element[dropdownComponent];
    self.toggle(element);

    if (isEmptyAnchor(e.target)) e.preventDefault();
  }

  function dropdownPreventScroll(e) {
    if (e.which === 38 || e.which === 40) e.preventDefault();
  }

  function dropdownKeyHandler({ which }) {
    const element = getCurrentOpenDropdown();
    const self = element[dropdownComponent];
    const { menu, menuItems, open } = self;
    const activeItem = document.activeElement;
    const isSameElement = activeItem === element;
    const isInsideMenu = menu.contains(activeItem);
    const isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

    let idx = menuItems.indexOf(activeItem);

    if (isMenuItem) { // navigate up | down
      if (isSameElement) {
        idx = 0;
      } else if (which === 38) {
        idx = idx > 1 ? idx - 1 : 0;
      } else if (which === 40) {
        idx = idx < menuItems.length - 1 ? idx + 1 : idx;
      }

      if (menuItems[idx]) setFocus(menuItems[idx]);
    }

    if (((menuItems.length && isMenuItem) // menu has items
        || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
        || !isInsideMenu) // or the focused element is not in the menu at all
        && open && which === 27 // menu must be open
    ) {
      self.toggle();
    }
  }

  function dropdownLayoutHandler() {
    const element = getCurrentOpenDropdown();
    const self = element && element[dropdownComponent];

    if (self && self.open) styleDropdown(self, 1);
  }

  // DROPDOWN DEFINITION
  // ===================
  class Dropdown extends BaseComponent {
    constructor(target, config) {
      super(dropdownComponent, target, defaultDropdownOptions, config);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // set targets
      const parent = element.parentElement;
      self.menu = queryElement(`.${dropdownMenuClass}`, parent);
      const { menu } = self;

      self.originalClass = Array.from(parent.classList);

      // set original position
      self.menuEnd = hasClass(menu, dropdownMenuEndClass);

      self.menuItems = [];

      Array.from(menu.children).forEach((child) => {
        if (child.children.length && (child.children[0].tagName === 'A')) self.menuItems.push(child.children[0]);
        if (child.tagName === 'A') self.menuItems.push(child);
      });

      // set initial state to closed
      self.open = false;

      // add event listener
      toggleDropdownHandler(self, 1);
    }

    // DROPDOWN PUBLIC METHODS
    // =======================
    toggle(related) {
      const self = this;
      const { open } = self;

      if (open) self.hide(related);
      else self.show(related);
    }

    show(related) {
      const self = this;
      const currentParent = queryElement(dropdownMenuClasses.map((c) => `.${c}.${showClass}`).join(','));
      const currentElement = currentParent && queryElement(dropdownSelector, currentParent);

      if (currentElement) currentElement[dropdownComponent].hide();

      const { element, menu, open } = self;
      const parent = element.parentNode;

      // update relatedTarget and dispatch
      showDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(showDropdownEvent);
      if (showDropdownEvent.defaultPrevented) return;

      // change menu position
      styleDropdown(self, 1);

      addClass(menu, showClass);
      addClass(parent, showClass);

      element.setAttribute(ariaExpanded, true);
      self.open = !open;

      setTimeout(() => {
        setFocus(menu.getElementsByTagName('INPUT')[0] || element); // focus the first input item | element
        toggleDropdownDismiss(self);

        shownDropdownEvent.relatedTarget = related || null;
        parent.dispatchEvent(shownDropdownEvent);
      }, 1);
    }

    hide(related) {
      const self = this;
      const { element, menu, open } = self;
      const parent = element.parentNode;
      hideDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(hideDropdownEvent);
      if (hideDropdownEvent.defaultPrevented) return;

      removeClass(menu, showClass);
      removeClass(parent, showClass);

      // revert to original position
      styleDropdown(self);

      element.setAttribute(ariaExpanded, false);
      self.open = !open;

      setFocus(element);

      // only re-attach handler if the instance is not disposed
      setTimeout(() => toggleDropdownDismiss(self), 1);

      // update relatedTarget and dispatch
      hiddenDropdownEvent.relatedTarget = related || null;
      parent.dispatchEvent(hiddenDropdownEvent);
    }

    dispose() {
      const self = this;
      const { element } = self;

      if (hasClass(element.parentNode, showClass) && self.open) self.hide();

      toggleDropdownHandler(self);

      super.dispose(dropdownComponent);
    }
  }

  Dropdown.init = {
    component: dropdownComponent,
    selector: dropdownSelector,
    constructor: Dropdown,
  };

  return Dropdown;

})));
