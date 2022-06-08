import React, { useCallback, useMemo, useState, useContext, Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Popper, Reference } from 'react-popper';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function getScrollbarWidth() {
  let scrollDiv = document.createElement('div'); // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113

  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}
function setScrollbarWidth(padding) {
  document.body.style.paddingRight = padding > 0 ? `${padding}px` : null;
}
function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}
function getOriginalBodyPadding() {
  const style = window.getComputedStyle(document.body, null);
  return parseInt(style && style.getPropertyValue('padding-right') || 0, 10);
}
function conditionallyUpdateScrollbar() {
  const scrollbarWidth = getScrollbarWidth(); // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433

  const fixedContent = document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top')[0];
  const bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}
let globalCssModule;
function setGlobalCssModule(cssModule) {
  globalCssModule = cssModule;
}
function mapToCssModules(className = '', cssModule = globalCssModule) {
  if (!cssModule) return className;
  return className.split(' ').map(c => cssModule[c] || c).join(' ');
}
/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */

function omit(obj, omitKeys) {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}
/**
 * Returns a filtered copy of an object with only the specified keys.
 */

function pick(obj, keys) {
  const pickKeys = Array.isArray(keys) ? keys : [keys];
  let length = pickKeys.length;
  let key;
  const result = {};

  while (length > 0) {
    length -= 1;
    key = pickKeys[length];
    result[key] = obj[key];
  }

  return result;
}
let warned = {};
function warnOnce(message) {
  if (!warned[message]) {
    /* istanbul ignore else */
    if (typeof console !== 'undefined') {
      console.error(message); // eslint-disable-line no-console
    }

    warned[message] = true;
  }
}
function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) {
    if (props[propName] !== null && typeof props[propName] !== 'undefined') {
      warnOnce(`"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`);
    }

    return propType(props, propName, componentName, ...rest);
  };
} // Shim Element if needed (e.g. in Node environment)

const Element = typeof window === 'object' && window.Element || function () {};

function DOMElement(props, propName, componentName) {
  if (!(props[propName] instanceof Element)) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
  }
}
const targetPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement, PropTypes.shape({
  current: PropTypes.any
})]);
const tagPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({
  $$typeof: PropTypes.symbol,
  render: PropTypes.func
}), PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({
  $$typeof: PropTypes.symbol,
  render: PropTypes.func
})]))]);
/* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
// These are all setup to match what is in the bootstrap _variables.scss
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss

const TransitionTimeouts = {
  Fade: 150,
  // $transition-fade
  Collapse: 350,
  // $transition-collapse
  Modal: 300,
  // $modal-transition
  Carousel: 600,
  // $carousel-transition
  Offcanvas: 300 // $offcanvas-transition

}; // Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.

const TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
const TransitionStatuses = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exited'
};
const keyCodes = {
  esc: 27,
  space: 32,
  enter: 13,
  tab: 9,
  up: 38,
  down: 40,
  home: 36,
  end: 35,
  n: 78,
  p: 80
};
const PopperPlacements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function isReactRefObj(target) {
  if (target && typeof target === 'object') {
    return 'current' in target;
  }

  return false;
}

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }

  return Object.prototype.toString.call(value);
}

function toNumber(value) {
  const type = typeof value;
  const NAN = 0 / 0;

  if (type === 'number') {
    return value;
  }

  if (type === 'symbol' || type === 'object' && getTag(value) === '[object Symbol]') {
    return NAN;
  }

  if (isObject(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value;
    value = isObject(other) ? `${other}` : other;
  }

  if (type !== 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(/^\s+|\s+$/g, '');
  const isBinary = /^0b[01]+$/i.test(value);
  return isBinary || /^0o[0-7]+$/i.test(value) ? parseInt(value.slice(2), isBinary ? 2 : 8) : /^[-+]0x[0-9a-f]+$/i.test(value) ? NAN : +value;
}
function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }

  const tag = getTag(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
}
function findDOMElements(target) {
  if (isReactRefObj(target)) {
    return target.current;
  }

  if (isFunction(target)) {
    return target();
  }

  if (typeof target === 'string' && canUseDOM) {
    let selection = document.querySelectorAll(target);

    if (!selection.length) {
      selection = document.querySelectorAll(`#${target}`);
    }

    if (!selection.length) {
      throw new Error(`The target '${target}' could not be identified in the dom, tip: check spelling`);
    }

    return selection;
  }

  return target;
}
function isArrayOrNodeList(els) {
  if (els === null) {
    return false;
  }

  return Array.isArray(els) || canUseDOM && typeof els.length === 'number';
}
function getTarget(target, allElements) {
  const els = findDOMElements(target);

  if (allElements) {
    if (isArrayOrNodeList(els)) {
      return els;
    }

    if (els === null) {
      return [];
    }

    return [els];
  } else {
    if (isArrayOrNodeList(els)) {
      return els[0];
    }

    return els;
  }
}
const defaultToggleEvents = ['touchstart', 'click'];
function addMultipleEventListeners(_els, handler, _events, useCapture) {
  let els = _els;

  if (!isArrayOrNodeList(els)) {
    els = [els];
  }

  let events = _events;

  if (typeof events === 'string') {
    events = events.split(/\s+/);
  }

  if (!isArrayOrNodeList(els) || typeof handler !== 'function' || !Array.isArray(events)) {
    throw new Error(`
      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.
      The second must be a function.
      The third is a string or an array of strings that represents DOM events
    `);
  }

  Array.prototype.forEach.call(events, event => {
    Array.prototype.forEach.call(els, el => {
      el.addEventListener(event, handler, useCapture);
    });
  });
  return function removeEvents() {
    Array.prototype.forEach.call(events, event => {
      Array.prototype.forEach.call(els, el => {
        el.removeEventListener(event, handler, useCapture);
      });
    });
  };
}
const focusableElements = ['a[href]', 'area[href]', 'input:not([disabled]):not([type=hidden])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'object', 'embed', '[tabindex]:not(.modal)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];

var utils = {
  __proto__: null,
  getScrollbarWidth: getScrollbarWidth,
  setScrollbarWidth: setScrollbarWidth,
  isBodyOverflowing: isBodyOverflowing,
  getOriginalBodyPadding: getOriginalBodyPadding,
  conditionallyUpdateScrollbar: conditionallyUpdateScrollbar,
  setGlobalCssModule: setGlobalCssModule,
  mapToCssModules: mapToCssModules,
  omit: omit,
  pick: pick,
  warnOnce: warnOnce,
  deprecated: deprecated,
  DOMElement: DOMElement,
  targetPropType: targetPropType,
  tagPropType: tagPropType,
  TransitionTimeouts: TransitionTimeouts,
  TransitionPropTypeKeys: TransitionPropTypeKeys,
  TransitionStatuses: TransitionStatuses,
  keyCodes: keyCodes,
  PopperPlacements: PopperPlacements,
  canUseDOM: canUseDOM,
  isReactRefObj: isReactRefObj,
  toNumber: toNumber,
  isObject: isObject,
  isFunction: isFunction,
  findDOMElements: findDOMElements,
  isArrayOrNodeList: isArrayOrNodeList,
  getTarget: getTarget,
  defaultToggleEvents: defaultToggleEvents,
  addMultipleEventListeners: addMultipleEventListeners,
  focusableElements: focusableElements
};

const _excluded$1f = ["className", "cssModule", "fluid", "tag"];
const propTypes$1l = {
  tag: tagPropType,
  fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1j = {
  tag: 'div'
};

const Container = props => {
  const {
    className,
    cssModule,
    fluid,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1f);

  let containerClass = 'container';

  if (fluid === true) {
    containerClass = 'container-fluid';
  } else if (fluid) {
    containerClass = `container-${fluid}`;
  }

  const classes = mapToCssModules(classNames(className, containerClass), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

Container.propTypes = propTypes$1l;
Container.defaultProps = defaultProps$1j;
var Container$1 = Container;

const _excluded$1e = ["className", "cssModule", "noGutters", "tag", "widths"];
const rowColWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const rowColsPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const propTypes$1k = {
  tag: tagPropType,
  noGutters: deprecated(PropTypes.bool, "Please use Bootstrap 5 gutter utility classes. https://getbootstrap.com/docs/5.0/layout/gutters/"),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  xs: rowColsPropType,
  sm: rowColsPropType,
  md: rowColsPropType,
  lg: rowColsPropType,
  xl: rowColsPropType,
  xxl: rowColsPropType
};
const defaultProps$1i = {
  tag: 'div',
  widths: rowColWidths
};

const Row = props => {
  const {
    className,
    cssModule,
    noGutters,
    tag: Tag,
    widths
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1e);

  const colClasses = [];
  widths.forEach((colWidth, i) => {
    let colSize = props[colWidth];
    delete attributes[colWidth];

    if (!colSize) {
      return;
    }

    const isXs = !i;
    colClasses.push(isXs ? `row-cols-${colSize}` : `row-cols-${colWidth}-${colSize}`);
  });
  const classes = mapToCssModules(classNames(className, noGutters ? 'gx-0' : null, 'row', colClasses), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

Row.propTypes = propTypes$1k;
Row.defaultProps = defaultProps$1i;
var Row$1 = Row;

const _excluded$1d = ["className", "cssModule", "widths", "tag"];
const colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const stringOrNumberProp$1 = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps$1 = PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.shape({
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  order: stringOrNumberProp$1,
  offset: stringOrNumberProp$1
})]);
const propTypes$1j = {
  tag: tagPropType,
  xs: columnProps$1,
  sm: columnProps$1,
  md: columnProps$1,
  lg: columnProps$1,
  xl: columnProps$1,
  xxl: columnProps$1,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  widths: PropTypes.array
};
const defaultProps$1h = {
  tag: 'div',
  widths: colWidths$1
};

const getColumnSizeClass$1 = (isXs, colWidth, colSize) => {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

const getColumnClasses = (attributes, cssModule, widths = colWidths$1) => {
  const colClasses = [];
  widths.forEach((colWidth, i) => {
    let columnProp = attributes[colWidth];
    delete attributes[colWidth];

    if (!columnProp && columnProp !== '') {
      return;
    }

    const isXs = !i;

    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
      const colClass = getColumnSizeClass$1(isXs, colWidth, columnProp.size);
      colClasses.push(mapToCssModules(classNames({
        [colClass]: columnProp.size || columnProp.size === '',
        [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
        [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
      }), cssModule));
    } else {
      const colClass = getColumnSizeClass$1(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });
  return {
    colClasses,
    attributes
  };
};

const Col = props => {
  const {
    className,
    cssModule,
    widths,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1d);

  let {
    attributes: modifiedAttributes,
    colClasses
  } = getColumnClasses(attributes, cssModule, widths);

  if (!colClasses.length) {
    colClasses.push('col');
  }

  const classes = mapToCssModules(classNames(className, colClasses), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, modifiedAttributes, {
    className: classes
  }));
};

Col.propTypes = propTypes$1j;
Col.defaultProps = defaultProps$1h;
var Col$1 = Col;

const _excluded$1c = ["expand", "className", "cssModule", "light", "dark", "fixed", "sticky", "color", "container", "tag", "children"];
const propTypes$1i = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  full: PropTypes.bool,
  fixed: PropTypes.string,
  sticky: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  tag: tagPropType,
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.node
};
const defaultProps$1g = {
  tag: 'nav',
  expand: false,
  container: 'fluid'
};

const getExpandClass = expand => {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === 'xs') {
    return 'navbar-expand';
  }

  return `navbar-expand-${expand}`;
};

const Navbar = props => {
  const {
    expand,
    className,
    cssModule,
    light,
    dark,
    fixed,
    sticky,
    color,
    container,
    tag: Tag,
    children
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1c);

  const classes = mapToCssModules(classNames(className, 'navbar', getExpandClass(expand), {
    'navbar-light': light,
    'navbar-dark': dark,
    [`bg-${color}`]: color,
    [`fixed-${fixed}`]: fixed,
    [`sticky-${sticky}`]: sticky
  }), cssModule);
  const containerClass = container && container === true ? 'container' : `container-${container}`;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }), container ? /*#__PURE__*/React.createElement("div", {
    className: containerClass
  }, children) : children);
};

Navbar.propTypes = propTypes$1i;
Navbar.defaultProps = defaultProps$1g;
var Navbar$1 = Navbar;

const _excluded$1b = ["className", "cssModule", "tag"];
const propTypes$1h = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1f = {
  tag: 'a'
};

const NavbarBrand = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1b);

  const classes = mapToCssModules(classNames(className, 'navbar-brand'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

NavbarBrand.propTypes = propTypes$1h;
NavbarBrand.defaultProps = defaultProps$1f;
var NavbarBrand$1 = NavbarBrand;

const _excluded$1a = ["className", "cssModule", "active", "tag"];
const propTypes$1g = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1e = {
  tag: 'span'
};

const NavbarText = props => {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1a);

  const classes = mapToCssModules(classNames(className, 'navbar-text'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

NavbarText.propTypes = propTypes$1g;
NavbarText.defaultProps = defaultProps$1e;
var NavbarText$1 = NavbarText;

const _excluded$19 = ["className", "cssModule", "children", "tag"];
const propTypes$1f = {
  tag: tagPropType,
  type: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node
};
const defaultProps$1d = {
  tag: 'button',
  type: 'button'
};

const NavbarToggler = props => {
  const {
    className,
    cssModule,
    children,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$19);

  const classes = mapToCssModules(classNames(className, 'navbar-toggler'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    "aria-label": "Toggle navigation"
  }, attributes, {
    className: classes
  }), children || /*#__PURE__*/React.createElement("span", {
    className: mapToCssModules('navbar-toggler-icon', cssModule)
  }));
};

NavbarToggler.propTypes = propTypes$1f;
NavbarToggler.defaultProps = defaultProps$1d;
var NavbarToggler$1 = NavbarToggler;

const _excluded$18 = ["className", "cssModule", "tabs", "pills", "vertical", "horizontal", "justified", "fill", "navbar", "card", "tag"];
const propTypes$1e = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  horizontal: PropTypes.string,
  justified: PropTypes.bool,
  fill: PropTypes.bool,
  navbar: PropTypes.bool,
  card: PropTypes.bool,
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1c = {
  tag: 'ul',
  vertical: false
};

const getVerticalClass = vertical => {
  if (vertical === false) {
    return false;
  } else if (vertical === true || vertical === 'xs') {
    return 'flex-column';
  }

  return `flex-${vertical}-column`;
};

const Nav = props => {
  const {
    className,
    cssModule,
    tabs,
    pills,
    vertical,
    horizontal,
    justified,
    fill,
    navbar,
    card,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$18);

  const classes = mapToCssModules(classNames(className, navbar ? 'navbar-nav' : 'nav', horizontal ? `justify-content-${horizontal}` : false, getVerticalClass(vertical), {
    'nav-tabs': tabs,
    'card-header-tabs': card && tabs,
    'nav-pills': pills,
    'card-header-pills': card && pills,
    'nav-justified': justified,
    'nav-fill': fill
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

Nav.propTypes = propTypes$1e;
Nav.defaultProps = defaultProps$1c;
var Nav$1 = Nav;

const _excluded$17 = ["className", "cssModule", "active", "tag"];
const propTypes$1d = {
  tag: tagPropType,
  active: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1b = {
  tag: 'li'
};

const NavItem = props => {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$17);

  const classes = mapToCssModules(classNames(className, 'nav-item', active ? 'active' : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

NavItem.propTypes = propTypes$1d;
NavItem.defaultProps = defaultProps$1b;
var NavItem$1 = NavItem;

const _excluded$16 = ["className", "cssModule", "active", "tag", "innerRef"];
const propTypes$1c = {
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  onClick: PropTypes.func,
  href: PropTypes.any
};
const defaultProps$1a = {
  tag: 'a'
};

class NavLink extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.href === '#') {
      e.preventDefault();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    let _this$props = this.props,
        {
      className,
      cssModule,
      active,
      tag: Tag,
      innerRef
    } = _this$props,
        attributes = _objectWithoutProperties(_this$props, _excluded$16);

    const classes = mapToCssModules(classNames(className, 'nav-link', {
      disabled: attributes.disabled,
      active: active
    }), cssModule);
    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      onClick: this.onClick,
      className: classes
    }));
  }

}

NavLink.propTypes = propTypes$1c;
NavLink.defaultProps = defaultProps$1a;
var NavLink$1 = NavLink;

const _excluded$15 = ["className", "listClassName", "cssModule", "children", "tag", "listTag", "aria-label"];
const propTypes$1b = {
  tag: tagPropType,
  listTag: tagPropType,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  'aria-label': PropTypes.string
};
const defaultProps$19 = {
  tag: 'nav',
  listTag: 'ol',
  'aria-label': 'breadcrumb'
};

const Breadcrumb = props => {
  const {
    className,
    listClassName,
    cssModule,
    children,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$15);

  const classes = mapToCssModules(classNames(className), cssModule);
  const listClasses = mapToCssModules(classNames('breadcrumb', listClassName), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    "aria-label": label
  }), /*#__PURE__*/React.createElement(ListTag, {
    className: listClasses
  }, children));
};

Breadcrumb.propTypes = propTypes$1b;
Breadcrumb.defaultProps = defaultProps$19;
var Breadcrumb$1 = Breadcrumb;

const _excluded$14 = ["className", "cssModule", "active", "tag"];
const propTypes$1a = {
  tag: tagPropType,
  active: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$18 = {
  tag: 'li'
};

const BreadcrumbItem = props => {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$14);

  const classes = mapToCssModules(classNames(className, active ? 'active' : false, 'breadcrumb-item'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    "aria-current": active ? 'page' : undefined
  }));
};

BreadcrumbItem.propTypes = propTypes$1a;
BreadcrumbItem.defaultProps = defaultProps$18;
var BreadcrumbItem$1 = BreadcrumbItem;

const _excluded$13 = ["className", "cssModule", "variant", "innerRef"];
const propTypes$19 = {
  active: PropTypes.bool,
  'aria-label': PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['white'])
};
const defaultProps$17 = {
  'aria-label': 'close'
};

const CloseButton = props => {
  const {
    className,
    cssModule,
    variant,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$13);

  const classes = mapToCssModules(classNames(className, 'btn-close', variant && `btn-close-${variant}`));
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: innerRef,
    type: "button",
    className: classes
  }, attributes));
};

CloseButton.propTypes = propTypes$19;
CloseButton.defaultProps = defaultProps$17;
var CloseButton$1 = CloseButton;

const _excluded$12 = ["active", "aria-label", "block", "className", "close", "cssModule", "color", "outline", "size", "tag", "innerRef"];
const propTypes$18 = {
  active: PropTypes.bool,
  'aria-label': PropTypes.string,
  block: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  close: PropTypes.bool
};
const defaultProps$16 = {
  color: 'secondary',
  tag: 'button'
};

function Button(props) {
  const onClick = useCallback(e => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }

    if (props.onClick) {
      return props.onClick(e);
    }
  }, [props.onClick, props.disabled]);

  let {
    active,
    'aria-label': ariaLabel,
    block,
    className,
    close,
    cssModule,
    color,
    outline,
    size,
    tag: Tag,
    innerRef
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$12);

  if (close) {
    return /*#__PURE__*/React.createElement(CloseButton$1, attributes);
  }

  const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;
  const classes = mapToCssModules(classNames(className, 'btn', btnOutlineColor, size ? `btn-${size}` : false, block ? 'd-block w-100' : false, {
    active,
    disabled: props.disabled
  }), cssModule);

  if (attributes.href && Tag === 'button') {
    Tag = 'a';
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: Tag === 'button' && attributes.onClick ? 'button' : undefined
  }, attributes, {
    className: classes,
    ref: innerRef,
    onClick: onClick,
    "aria-label": ariaLabel
  }));
}

Button.propTypes = propTypes$18;
Button.defaultProps = defaultProps$16;

const _excluded$11 = ["className"];
const propTypes$17 = {
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  defaultValue: PropTypes.bool
};
const defaultProps$15 = {
  defaultValue: false
};

class ButtonToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: props.defaultValue,
      focus: false
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this.setState({
      focus: false
    });
  }

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({
      focus: true
    });
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState(({
      toggled
    }) => ({
      toggled: !toggled
    }));
  }

  render() {
    const _this$props = this.props,
          {
      className
    } = _this$props,
          attributes = _objectWithoutProperties(_this$props, _excluded$11);

    const classes = mapToCssModules(classNames(className, {
      focus: this.state.focus
    }), this.props.cssModule);
    return /*#__PURE__*/React.createElement(Button, _extends({
      active: this.state.toggled,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onClick: this.onClick,
      className: classes
    }, attributes));
  }

}

ButtonToggle.propTypes = propTypes$17;
ButtonToggle.defaultProps = defaultProps$15;
var ButtonToggle$1 = ButtonToggle;

/**
 * DropdownContext
 * {
 *  toggle: PropTypes.func.isRequired,
 *  isOpen: PropTypes.bool.isRequired,
 *  direction: PropTypes.oneOf(['up', 'down', 'start', 'end']).isRequired,
 *  inNavbar: PropTypes.bool.isRequired,
 *  disabled: PropTypes.bool
 * }
 */

const DropdownContext = React.createContext({});

const _excluded$10 = ["className", "cssModule", "direction", "isOpen", "group", "size", "nav", "setActiveFromChild", "active", "tag", "menuRole"];
const propTypes$16 = {
  a11y: PropTypes.bool,
  disabled: PropTypes.bool,
  direction: PropTypes.oneOf(['up', 'down', 'start', 'end', 'left', 'right']),
  group: PropTypes.bool,
  isOpen: PropTypes.bool,
  nav: PropTypes.bool,
  active: PropTypes.bool,
  size: PropTypes.string,
  tag: tagPropType,
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  inNavbar: PropTypes.bool,
  setActiveFromChild: PropTypes.bool,
  menuRole: PropTypes.oneOf(['listbox', 'menu'])
};
const defaultProps$14 = {
  a11y: true,
  isOpen: false,
  direction: 'down',
  nav: false,
  active: false,
  inNavbar: false,
  setActiveFromChild: false
};
const preventDefaultKeys = [keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down, keyCodes.end, keyCodes.home];

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.addEvents = this.addEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleMenuRef = this.handleMenuRef.bind(this);
    this.containerRef = React.createRef();
    this.menuRef = React.createRef();
  }

  handleMenuRef(menuRef) {
    this.menuRef.current = menuRef;
  }

  getContextValue() {
    return {
      toggle: this.toggle,
      isOpen: this.props.isOpen,
      direction: this.props.direction === 'down' && this.props.dropup ? 'up' : this.props.direction,
      inNavbar: this.props.inNavbar,
      disabled: this.props.disabled,
      // Callback that should be called by DropdownMenu to provide a ref to
      // a HTML tag that's used for the DropdownMenu
      onMenuRef: this.handleMenuRef,
      menuRole: this.props.menuRole
    };
  }

  componentDidMount() {
    this.handleProps();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleProps();
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  getContainer() {
    return this.containerRef.current;
  }

  getMenu() {
    return this.menuRef.current;
  }

  getMenuCtrl() {
    if (this._$menuCtrl) return this._$menuCtrl;
    this._$menuCtrl = this.getContainer().querySelector('[aria-expanded]');
    return this._$menuCtrl;
  }

  getItemType() {
    if (this.context.menuRole === 'listbox') {
      return 'option';
    }

    return 'menuitem';
  }

  getMenuItems() {
    // In a real menu with a child DropdownMenu, `this.getMenu()` should never
    // be null, but it is sometimes null in tests. To mitigate that, we just
    // use `this.getContainer()` as the fallback `menuContainer`.
    const menuContainer = this.getMenu() || this.getContainer();
    return [].slice.call(menuContainer.querySelectorAll(`[role="${this.getItemType()}"]`));
  }

  addEvents() {
    ['click', 'touchstart', 'keyup'].forEach(event => document.addEventListener(event, this.handleDocumentClick, true));
  }

  removeEvents() {
    ['click', 'touchstart', 'keyup'].forEach(event => document.removeEventListener(event, this.handleDocumentClick, true));
  }

  handleDocumentClick(e) {
    if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
    const container = this.getContainer();
    const menu = this.getMenu();
    const clickIsInContainer = container.contains(e.target) && container !== e.target;
    const clickIsInInput = container.classList.contains('input-group') && container.classList.contains('dropdown') && e.target.tagName === 'INPUT';
    const clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;

    if ((clickIsInContainer && !clickIsInInput || clickIsInMenu) && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
      return;
    }

    this.toggle(e);
  }

  handleKeyDown(e) {
    const isTargetMenuItem = e.target.getAttribute('role') === 'menuitem' || e.target.getAttribute('role') === 'option';
    const isTargetMenuCtrl = this.getMenuCtrl() === e.target;
    const isTab = keyCodes.tab === e.which;

    if (/input|textarea/i.test(e.target.tagName) || isTab && !this.props.a11y || isTab && !(isTargetMenuItem || isTargetMenuCtrl)) {
      return;
    }

    if (preventDefaultKeys.indexOf(e.which) !== -1 || e.which >= 48 && e.which <= 90) {
      e.preventDefault();
    }

    if (this.props.disabled) return;

    if (isTargetMenuCtrl) {
      if ([keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down].indexOf(e.which) > -1) {
        // Open the menu (if not open) and focus the first menu item
        if (!this.props.isOpen) {
          this.toggle(e);
        }

        setTimeout(() => this.getMenuItems()[0].focus());
      } else if (this.props.isOpen && isTab) {
        // Focus the first menu item if tabbing from an open menu. We need this
        // for cases where the DropdownMenu sets a custom container, which may
        // not be the natural next item to tab to from the DropdownToggle.
        e.preventDefault();
        this.getMenuItems()[0].focus();
      } else if (this.props.isOpen && e.which === keyCodes.esc) {
        this.toggle(e);
      }
    }

    if (this.props.isOpen && isTargetMenuItem) {
      if ([keyCodes.tab, keyCodes.esc].indexOf(e.which) > -1) {
        this.toggle(e);
        this.getMenuCtrl().focus();
      } else if ([keyCodes.space, keyCodes.enter].indexOf(e.which) > -1) {
        e.target.click();
        this.getMenuCtrl().focus();
      } else if ([keyCodes.down, keyCodes.up].indexOf(e.which) > -1 || [keyCodes.n, keyCodes.p].indexOf(e.which) > -1 && e.ctrlKey) {
        const $menuitems = this.getMenuItems();
        let index = $menuitems.indexOf(e.target);

        if (keyCodes.up === e.which || keyCodes.p === e.which && e.ctrlKey) {
          index = index !== 0 ? index - 1 : $menuitems.length - 1;
        } else if (keyCodes.down === e.which || keyCodes.n === e.which && e.ctrlKey) {
          index = index === $menuitems.length - 1 ? 0 : index + 1;
        }

        $menuitems[index].focus();
      } else if (keyCodes.end === e.which) {
        const $menuitems = this.getMenuItems();
        $menuitems[$menuitems.length - 1].focus();
      } else if (keyCodes.home === e.which) {
        const $menuitems = this.getMenuItems();
        $menuitems[0].focus();
      } else if (e.which >= 48 && e.which <= 90) {
        const $menuitems = this.getMenuItems();
        const charPressed = String.fromCharCode(e.which).toLowerCase();

        for (let i = 0; i < $menuitems.length; i += 1) {
          const firstLetter = $menuitems[i].textContent && $menuitems[i].textContent[0].toLowerCase();

          if (firstLetter === charPressed) {
            $menuitems[i].focus();
            break;
          }
        }
      }
    }
  }

  handleProps() {
    if (this.props.isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
  }

  toggle(e) {
    if (this.props.disabled) {
      return e && e.preventDefault();
    }

    return this.props.toggle(e);
  }

  render() {
    const _omit = omit(this.props, ['toggle', 'disabled', 'inNavbar', 'a11y']),
          {
      className,
      cssModule,
      direction,
      isOpen,
      group,
      size,
      nav,
      setActiveFromChild,
      active,
      tag,
      menuRole
    } = _omit,
          attrs = _objectWithoutProperties(_omit, _excluded$10);

    const Tag = tag || (nav ? 'li' : 'div');
    let subItemIsActive = false;

    if (setActiveFromChild) {
      React.Children.map(this.props.children[1].props.children, dropdownItem => {
        if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
      });
    }

    const classes = mapToCssModules(classNames(className, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, {
      'btn-group': group,
      [`btn-group-${size}`]: !!size,
      dropdown: !group,
      dropup: direction === 'up',
      dropstart: direction === 'start' || direction === 'left',
      dropend: direction === 'end' || direction === 'right',
      show: isOpen,
      'nav-item': nav
    }), cssModule);
    return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
      value: this.getContextValue()
    }, /*#__PURE__*/React.createElement(Manager, null, /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
      [typeof Tag === 'string' ? 'ref' : 'innerRef']: this.containerRef,
      onKeyDown: this.handleKeyDown,
      className: classes
    }))));
  }

}

Dropdown.propTypes = propTypes$16;
Dropdown.defaultProps = defaultProps$14;
var Dropdown$1 = Dropdown;

const propTypes$15 = {
  children: PropTypes.node
};

const ButtonDropdown = props => {
  return /*#__PURE__*/React.createElement(Dropdown$1, _extends({
    group: true
  }, props));
};

ButtonDropdown.propTypes = propTypes$15;
var ButtonDropdown$1 = ButtonDropdown;

const _excluded$$ = ["className", "cssModule", "size", "vertical", "tag"];
const propTypes$14 = {
  tag: tagPropType,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  role: PropTypes.string,
  size: PropTypes.string,
  vertical: PropTypes.bool
};
const defaultProps$13 = {
  tag: 'div',
  role: 'group'
};

const ButtonGroup = props => {
  const {
    className,
    cssModule,
    size,
    vertical,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$$);

  const classes = mapToCssModules(classNames(className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ButtonGroup.propTypes = propTypes$14;
ButtonGroup.defaultProps = defaultProps$13;
var ButtonGroup$1 = ButtonGroup;

const _excluded$_ = ["className", "cssModule", "tag"];
const propTypes$13 = {
  tag: tagPropType,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  role: PropTypes.string
};
const defaultProps$12 = {
  tag: 'div',
  role: 'toolbar'
};

const ButtonToolbar = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$_);

  const classes = mapToCssModules(classNames(className, 'btn-toolbar'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ButtonToolbar.propTypes = propTypes$13;
ButtonToolbar.defaultProps = defaultProps$12;
var ButtonToolbar$1 = ButtonToolbar;

const _excluded$Z = ["className", "cssModule", "divider", "tag", "header", "active", "text"];
const propTypes$12 = {
  children: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  divider: PropTypes.bool,
  tag: tagPropType,
  header: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  toggle: PropTypes.bool,
  text: PropTypes.bool
};
const defaultProps$11 = {
  tag: 'button',
  toggle: true
};

class DropdownItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getTabIndex = this.getTabIndex.bind(this);
  }

  getRole() {
    if (this.context.menuRole === 'listbox') {
      return 'option';
    }

    return 'menuitem';
  }

  onClick(e) {
    const {
      disabled,
      header,
      divider,
      text
    } = this.props;

    if (disabled || header || divider || text) {
      e.preventDefault();
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.props.toggle) {
      this.context.toggle(e);
    }
  }

  getTabIndex() {
    const {
      disabled,
      header,
      divider,
      text
    } = this.props;

    if (disabled || header || divider || text) {
      return '-1';
    }

    return '0';
  }

  render() {
    const tabIndex = this.getTabIndex();
    const role = tabIndex > -1 ? this.getRole() : undefined;

    let _omit = omit(this.props, ['toggle']),
        {
      className,
      cssModule,
      divider,
      tag: Tag,
      header,
      active,
      text
    } = _omit,
        props = _objectWithoutProperties(_omit, _excluded$Z);

    const classes = mapToCssModules(classNames(className, {
      disabled: props.disabled,
      'dropdown-item': !divider && !header && !text,
      active: active,
      'dropdown-header': header,
      'dropdown-divider': divider,
      'dropdown-item-text': text
    }), cssModule);

    if (Tag === 'button') {
      if (header) {
        Tag = 'h6';
      } else if (divider) {
        Tag = 'div';
      } else if (props.href) {
        Tag = 'a';
      } else if (text) {
        Tag = 'span';
      }
    }

    return /*#__PURE__*/React.createElement(Tag, _extends({
      type: Tag === 'button' && (props.onClick || this.props.toggle) ? 'button' : undefined
    }, props, {
      tabIndex: tabIndex,
      role: role,
      className: classes,
      onClick: this.onClick
    }));
  }

}

DropdownItem.propTypes = propTypes$12;
DropdownItem.defaultProps = defaultProps$11;
DropdownItem.contextType = DropdownContext;
var DropdownItem$1 = DropdownItem;

const _excluded$Y = ["className", "cssModule", "dark", "end", "right", "tag", "flip", "modifiers", "persist", "strategy", "container", "updateOnSelect"];
const propTypes$11 = {
  tag: tagPropType,
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  end: PropTypes.bool,
  flip: PropTypes.bool,
  modifiers: PropTypes.array,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  persist: PropTypes.bool,
  strategy: PropTypes.string,
  container: targetPropType,

  /** Update popper layout when a click event comes up. This leverages event bubbling. */
  updateOnSelect: PropTypes.bool,
  right: deprecated(PropTypes.bool, 'Please use "end" instead.')
};
const defaultProps$10 = {
  tag: 'div',
  flip: true,
  modifiers: []
};
const directionPositionMap = {
  up: 'top',
  left: 'left',
  right: 'right',
  start: 'left',
  end: 'right',
  down: 'bottom'
};

class DropdownMenu extends React.Component {
  getRole() {
    if (this.context.menuRole === 'listbox') {
      return 'listbox';
    }

    return 'menu';
  }

  render() {
    const _this$props = this.props,
          {
      className,
      cssModule,
      dark,
      end,
      right,
      tag,
      flip,
      modifiers,
      persist,
      strategy,
      container,
      updateOnSelect
    } = _this$props,
          attrs = _objectWithoutProperties(_this$props, _excluded$Y);

    const classes = mapToCssModules(classNames(className, 'dropdown-menu', {
      'dropdown-menu-dark': dark,
      'dropdown-menu-end': end || right,
      show: this.context.isOpen
    }), cssModule);
    const Tag = tag;

    if (persist || this.context.isOpen && !this.context.inNavbar) {
      const position1 = directionPositionMap[this.context.direction] || 'bottom';
      const position2 = end || right ? 'end' : 'start';
      const poperPlacement = `${position1}-${position2}`;
      const poperModifiers = [...modifiers, {
        name: 'flip',
        enabled: !!flip
      }];
      const popper = /*#__PURE__*/React.createElement(Popper, {
        placement: poperPlacement,
        modifiers: poperModifiers,
        strategy: strategy
      }, ({
        ref,
        style,
        placement,
        update
      }) => {
        let combinedStyle = _objectSpread2(_objectSpread2({}, this.props.style), style);

        const handleRef = tagRef => {
          // Send the ref to `react-popper`
          ref(tagRef); // Send the ref to the parent Dropdown so that clicks outside
          // it will cause it to close

          const {
            onMenuRef
          } = this.context;
          if (onMenuRef) onMenuRef(tagRef);
        };

        return /*#__PURE__*/React.createElement(Tag, _extends({
          tabIndex: "-1",
          role: this.getRole(),
          ref: handleRef
        }, attrs, {
          style: combinedStyle,
          "aria-hidden": !this.context.isOpen,
          className: classes,
          "data-popper-placement": placement,
          onClick: () => updateOnSelect && update()
        }));
      });

      if (container) {
        return ReactDOM.createPortal(popper, getTarget(container));
      } else {
        return popper;
      }
    }

    return /*#__PURE__*/React.createElement(Tag, _extends({
      tabIndex: "-1",
      role: this.getRole()
    }, attrs, {
      "aria-hidden": !this.context.isOpen,
      className: classes,
      "data-popper-placement": attrs.placement
    }));
  }

}
DropdownMenu.propTypes = propTypes$11;
DropdownMenu.defaultProps = defaultProps$10;
DropdownMenu.contextType = DropdownContext;
var DropdownMenu$1 = DropdownMenu;

const _excluded$X = ["className", "color", "cssModule", "caret", "split", "nav", "tag", "innerRef"];
const propTypes$10 = {
  caret: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  'aria-haspopup': PropTypes.bool,
  split: PropTypes.bool,
  tag: tagPropType,
  nav: PropTypes.bool
};
const defaultProps$$ = {
  color: 'secondary',
  'aria-haspopup': true
};

class DropdownToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled || this.context.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.nav && !this.props.tag) {
      e.preventDefault();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.context.toggle(e);
  }

  getRole() {
    return this.context.menuRole || this.props['aria-haspopup'];
  }

  render() {
    const _this$props = this.props,
          {
      className,
      color,
      cssModule,
      caret,
      split,
      nav,
      tag,
      innerRef
    } = _this$props,
          props = _objectWithoutProperties(_this$props, _excluded$X);

    const ariaLabel = props['aria-label'] || 'Toggle Dropdown';
    const classes = mapToCssModules(classNames(className, {
      'dropdown-toggle': caret || split,
      'dropdown-toggle-split': split,
      'nav-link': nav
    }), cssModule);
    const children = typeof props.children !== 'undefined' ? props.children : /*#__PURE__*/React.createElement("span", {
      className: "visually-hidden"
    }, ariaLabel);
    let Tag;

    if (nav && !tag) {
      Tag = 'a';
      props.href = '#';
    } else if (!tag) {
      Tag = Button;
      props.color = color;
      props.cssModule = cssModule;
    } else {
      Tag = tag;
    }

    if (this.context.inNavbar) {
      return /*#__PURE__*/React.createElement(Tag, _extends({}, props, {
        className: classes,
        onClick: this.onClick,
        "aria-expanded": this.context.isOpen,
        "aria-haspopup": this.getRole(),
        children: children
      }));
    }

    return /*#__PURE__*/React.createElement(Reference, {
      innerRef: innerRef
    }, ({
      ref
    }) => /*#__PURE__*/React.createElement(Tag, _extends({}, props, {
      [typeof Tag === 'string' ? 'ref' : 'innerRef']: ref,
      className: classes,
      onClick: this.onClick,
      "aria-expanded": this.context.isOpen,
      "aria-haspopup": this.getRole(),
      children: children
    })));
  }

}

DropdownToggle.propTypes = propTypes$10;
DropdownToggle.defaultProps = defaultProps$$;
DropdownToggle.contextType = DropdownContext;
var DropdownToggle$1 = DropdownToggle;

const _excluded$W = ["tag", "baseClass", "baseClassActive", "className", "cssModule", "children", "innerRef"];

const propTypes$$ = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: tagPropType,
  baseClass: PropTypes.string,
  baseClassActive: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
});

const defaultProps$_ = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: TransitionTimeouts.Fade,
  appear: true,
  enter: true,
  exit: true,
  in: true
});

function Fade(props) {
  const {
    tag: Tag,
    baseClass,
    baseClassActive,
    className,
    cssModule,
    children,
    innerRef
  } = props,
        otherProps = _objectWithoutProperties(props, _excluded$W);

  const transitionProps = pick(otherProps, TransitionPropTypeKeys);
  const childProps = omit(otherProps, TransitionPropTypeKeys);
  return /*#__PURE__*/React.createElement(Transition, transitionProps, status => {
    const isActive = status === 'entered';
    const classes = mapToCssModules(classNames(className, baseClass, isActive && baseClassActive), cssModule);
    return /*#__PURE__*/React.createElement(Tag, _extends({
      className: classes
    }, childProps, {
      ref: innerRef
    }), children);
  });
}

Fade.propTypes = propTypes$$;
Fade.defaultProps = defaultProps$_;

/**
 * AccordionContext
 * {
 *  toggle: PropTypes.func.isRequired,
 *  openId: PropTypes.string,    
 * }
 */

const AccordionContext = React.createContext({});

const _excluded$V = ["flush", "open", "toggle", "className", "cssModule", "tag", "innerRef"];
const propTypes$_ = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  flush: PropTypes.bool,
  open: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  toggle: PropTypes.func.isRequired
};
const defaultProps$Z = {
  tag: 'div'
};

const Accordion = props => {
  const {
    flush,
    open,
    toggle,
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$V);

  const classes = mapToCssModules(classNames(className, 'accordion', {
    'accordion-flush': flush
  }), cssModule);
  const accordionContext = useMemo(() => ({
    open,
    toggle
  }));
  return /*#__PURE__*/React.createElement(AccordionContext.Provider, {
    value: accordionContext
  }, /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  })));
};

Accordion.propTypes = propTypes$_;
Accordion.defaultProps = defaultProps$Z;
var Accordion$1 = Accordion;

const _excluded$U = ["defaultOpen", "stayOpen"];
const propTypes$Z = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  defaultOpen: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  stayOpen: PropTypes.bool
};
const defaultProps$Y = {
  tag: 'div'
};

const UncontrolledAccordion = _ref => {
  let {
    defaultOpen,
    stayOpen
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$U);

  const [open, setOpen] = useState(defaultOpen || (stayOpen ? [] : undefined));

  const toggle = id => {
    if (stayOpen) {
      open.includes(id) ? setOpen(open.filter(accordionId => accordionId !== id)) : setOpen([...open, id]);
    } else {
      open === id ? setOpen(undefined) : setOpen(id);
    }
  };

  return /*#__PURE__*/React.createElement(Accordion$1, _extends({}, props, {
    open: open,
    toggle: toggle
  }));
};

UncontrolledAccordion.propTypes = propTypes$Z;
UncontrolledAccordion.defaultProps = defaultProps$Y;
var UncontrolledAccordion$1 = UncontrolledAccordion;

const _excluded$T = ["className", "cssModule", "tag", "innerRef", "children", "targetId"];
const propTypes$Y = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  targetId: PropTypes.string.isRequired
};
const defaultProps$X = {
  tag: 'h2'
};

const AccordionHeader = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef,
    children,
    targetId
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$T);

  const {
    open,
    toggle
  } = useContext(AccordionContext);
  const classes = mapToCssModules(classNames(className, 'accordion-header'), cssModule);
  const buttonClasses = mapToCssModules(classNames('accordion-button', {
    collapsed: !(Array.isArray(open) ? open.includes(targetId) : open === targetId)
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: buttonClasses,
    onClick: () => toggle(targetId)
  }, children));
};

AccordionHeader.propTypes = propTypes$Y;
AccordionHeader.defaultProps = defaultProps$X;
var AccordionHeader$1 = AccordionHeader;

const _excluded$S = ["className", "cssModule", "tag", "innerRef"];
const propTypes$X = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node
};
const defaultProps$W = {
  tag: 'div'
};

const AccordionItem = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$S);

  const classes = mapToCssModules(classNames(className, 'accordion-item'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
};

AccordionItem.propTypes = propTypes$X;
AccordionItem.defaultProps = defaultProps$W;
var AccordionItem$1 = AccordionItem;

const _excluded$R = ["tag", "horizontal", "isOpen", "className", "navbar", "cssModule", "children", "innerRef"];

const propTypes$W = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  horizontal: PropTypes.bool,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: tagPropType,
  className: PropTypes.node,
  navbar: PropTypes.bool,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
});

const defaultProps$V = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  horizontal: false,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  tag: 'div',
  timeout: TransitionTimeouts.Collapse
});

const transitionStatusToClassHash = {
  [TransitionStatuses.ENTERING]: 'collapsing',
  [TransitionStatuses.ENTERED]: 'collapse show',
  [TransitionStatuses.EXITING]: 'collapsing',
  [TransitionStatuses.EXITED]: 'collapse'
};

function getTransitionClass(status) {
  return transitionStatusToClassHash[status] || 'collapse';
}

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: null
    };
    ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(name => {
      this[name] = this[name].bind(this);
    });
  }

  getDimension(node) {
    return this.props.horizontal ? node.scrollWidth : node.scrollHeight;
  }

  onEntering(node, isAppearing) {
    this.setState({
      dimension: this.getDimension(node)
    });
    this.props.onEntering(node, isAppearing);
  }

  onEntered(node, isAppearing) {
    this.setState({
      dimension: null
    });
    this.props.onEntered(node, isAppearing);
  }

  onExit(node) {
    this.setState({
      dimension: this.getDimension(node)
    });
    this.props.onExit(node);
  }

  onExiting(node) {
    // getting this variable triggers a reflow
    this.getDimension(node); // eslint-disable-line no-unused-vars


    this.setState({
      dimension: 0
    });
    this.props.onExiting(node);
  }

  onExited(node) {
    this.setState({
      dimension: null
    });
    this.props.onExited(node);
  }

  render() {
    const _this$props = this.props,
          {
      tag: Tag,
      horizontal,
      isOpen,
      className,
      navbar,
      cssModule,
      children,
      innerRef
    } = _this$props,
          otherProps = _objectWithoutProperties(_this$props, _excluded$R);

    const {
      dimension
    } = this.state;
    const transitionProps = pick(otherProps, TransitionPropTypeKeys);
    const childProps = omit(otherProps, TransitionPropTypeKeys);
    return /*#__PURE__*/React.createElement(Transition, _extends({}, transitionProps, {
      in: isOpen,
      onEntering: this.onEntering,
      onEntered: this.onEntered,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }), status => {
      let collapseClass = getTransitionClass(status);
      const classes = mapToCssModules(classNames(className, horizontal && 'collapse-horizontal', collapseClass, navbar && 'navbar-collapse'), cssModule);
      const style = dimension === null ? null : {
        [horizontal ? 'width' : 'height']: dimension
      };
      return /*#__PURE__*/React.createElement(Tag, _extends({}, childProps, {
        style: _objectSpread2(_objectSpread2({}, childProps.style), style),
        className: classes,
        ref: this.props.innerRef
      }), children);
    });
  }

}

Collapse.propTypes = propTypes$W;
Collapse.defaultProps = defaultProps$V;
var Collapse$1 = Collapse;

const _excluded$Q = ["className", "cssModule", "tag", "innerRef", "children", "accordionId"];
const propTypes$V = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  accordionId: PropTypes.string.isRequired
};
const defaultProps$U = {
  tag: 'div'
};

const AccordionBody = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef,
    children,
    accordionId
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$Q);

  const {
    open
  } = useContext(AccordionContext);
  const classes = mapToCssModules(classNames(className, 'accordion-collapse'), cssModule);
  return /*#__PURE__*/React.createElement(Collapse$1, _extends({}, attributes, {
    className: classes,
    ref: innerRef,
    isOpen: Array.isArray(open) ? open.includes(accordionId) : open === accordionId
  }), /*#__PURE__*/React.createElement(Tag, {
    className: "accordion-body"
  }, children));
};

AccordionBody.propTypes = propTypes$V;
AccordionBody.defaultProps = defaultProps$U;
var AccordionBody$1 = AccordionBody;

const _excluded$P = ["className", "cssModule", "color", "innerRef", "pill", "tag"];
const propTypes$U = {
  color: PropTypes.string,
  pill: PropTypes.bool,
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$T = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

const Badge = props => {
  let {
    className,
    cssModule,
    color,
    innerRef,
    pill,
    tag: Tag
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$P);

  const classes = mapToCssModules(classNames(className, 'badge', 'bg-' + color, pill ? 'rounded-pill' : false), cssModule);

  if (attributes.href && Tag === 'span') {
    Tag = 'a';
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
};

Badge.propTypes = propTypes$U;
Badge.defaultProps = defaultProps$T;
var Badge$1 = Badge;

const _excluded$O = ["className", "cssModule", "color", "body", "inverse", "outline", "tag", "innerRef"];
const propTypes$T = {
  tag: tagPropType,
  inverse: PropTypes.bool,
  color: PropTypes.string,
  body: PropTypes.bool,
  outline: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$S = {
  tag: 'div'
};

const Card = props => {
  const {
    className,
    cssModule,
    color,
    body,
    inverse,
    outline,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$O);

  const classes = mapToCssModules(classNames(className, 'card', inverse ? 'text-white' : false, body ? 'card-body' : false, color ? `${outline ? 'border' : 'bg'}-${color}` : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
};

Card.propTypes = propTypes$T;
Card.defaultProps = defaultProps$S;
var Card$1 = Card;

const _excluded$N = ["className", "cssModule", "tag"];
const propTypes$S = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$R = {
  tag: 'div'
};

const CardGroup = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$N);

  const classes = mapToCssModules(classNames(className, 'card-group'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardGroup.propTypes = propTypes$S;
CardGroup.defaultProps = defaultProps$R;
var CardGroup$1 = CardGroup;

const _excluded$M = ["className", "cssModule", "tag"];
const propTypes$R = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$Q = {
  tag: 'div'
};

const CardDeck = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$M);

  const classes = mapToCssModules(classNames(className, 'card-deck'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardDeck.propTypes = propTypes$R;
CardDeck.defaultProps = defaultProps$Q;
var CardDeck$1 = CardDeck;

const _excluded$L = ["className", "cssModule", "tag"];
const propTypes$Q = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$P = {
  tag: 'div'
};

const CardColumns = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$L);

  const classes = mapToCssModules(classNames(className, 'card-columns'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardColumns.propTypes = propTypes$Q;
CardColumns.defaultProps = defaultProps$P;
var CardColumns$1 = CardColumns;

const _excluded$K = ["className", "cssModule", "innerRef", "tag"];
const propTypes$P = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$O = {
  tag: 'div'
};

const CardBody = props => {
  const {
    className,
    cssModule,
    innerRef,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$K);

  const classes = mapToCssModules(classNames(className, 'card-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
};

CardBody.propTypes = propTypes$P;
CardBody.defaultProps = defaultProps$O;
var CardBody$1 = CardBody;

const _excluded$J = ["className", "cssModule", "tag", "innerRef"];
const propTypes$O = {
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$N = {
  tag: 'a'
};

const CardLink = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$J);

  const classes = mapToCssModules(classNames(className, 'card-link'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    ref: innerRef,
    className: classes
  }));
};

CardLink.propTypes = propTypes$O;
CardLink.defaultProps = defaultProps$N;
var CardLink$1 = CardLink;

const _excluded$I = ["className", "cssModule", "tag"];
const propTypes$N = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$M = {
  tag: 'div'
};

const CardFooter = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$I);

  const classes = mapToCssModules(classNames(className, 'card-footer'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardFooter.propTypes = propTypes$N;
CardFooter.defaultProps = defaultProps$M;
var CardFooter$1 = CardFooter;

const _excluded$H = ["className", "cssModule", "tag"];
const propTypes$M = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$L = {
  tag: 'div'
};

const CardHeader = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$H);

  const classes = mapToCssModules(classNames(className, 'card-header'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardHeader.propTypes = propTypes$M;
CardHeader.defaultProps = defaultProps$L;
var CardHeader$1 = CardHeader;

const _excluded$G = ["className", "cssModule", "top", "bottom", "tag"];
const propTypes$L = {
  tag: tagPropType,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$K = {
  tag: 'img'
};

const CardImg = props => {
  const {
    className,
    cssModule,
    top,
    bottom,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$G);

  let cardImgClassName = 'card-img';

  if (top) {
    cardImgClassName = 'card-img-top';
  }

  if (bottom) {
    cardImgClassName = 'card-img-bottom';
  }

  const classes = mapToCssModules(classNames(className, cardImgClassName), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardImg.propTypes = propTypes$L;
CardImg.defaultProps = defaultProps$K;
var CardImg$1 = CardImg;

const _excluded$F = ["className", "cssModule", "tag"];
const propTypes$K = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$J = {
  tag: 'div'
};

const CardImgOverlay = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$F);

  const classes = mapToCssModules(classNames(className, 'card-img-overlay'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardImgOverlay.propTypes = propTypes$K;
CardImgOverlay.defaultProps = defaultProps$J;
var CardImgOverlay$1 = CardImgOverlay;

const _excluded$E = ["in", "children", "cssModule", "slide", "tag", "className"];

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAnimation: false
    };
    this.onEnter = this.onEnter.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExit = this.onExit.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onEnter(node, isAppearing) {
    this.setState({
      startAnimation: false
    });
    this.props.onEnter(node, isAppearing);
  }

  onEntering(node, isAppearing) {
    // getting this variable triggers a reflow
    const offsetHeight = node.offsetHeight;
    this.setState({
      startAnimation: true
    });
    this.props.onEntering(node, isAppearing);
    return offsetHeight;
  }

  onExit(node) {
    this.setState({
      startAnimation: false
    });
    this.props.onExit(node);
  }

  onExiting(node) {
    this.setState({
      startAnimation: true
    });
    node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
    this.props.onExiting(node);
  }

  onExited(node) {
    node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
    this.props.onExited(node);
  }

  render() {
    const _this$props = this.props,
          {
      in: isIn,
      children,
      cssModule,
      slide,
      tag: Tag,
      className
    } = _this$props,
          transitionProps = _objectWithoutProperties(_this$props, _excluded$E);

    return /*#__PURE__*/React.createElement(Transition, _extends({}, transitionProps, {
      enter: slide,
      exit: slide,
      in: isIn,
      onEnter: this.onEnter,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }), status => {
      const {
        direction
      } = this.context;
      const isActive = status === TransitionStatuses.ENTERED || status === TransitionStatuses.EXITING;
      const directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) && this.state.startAnimation && (direction === 'end' ? 'carousel-item-start' : 'carousel-item-end');
      const orderClassName = status === TransitionStatuses.ENTERING && (direction === 'end' ? 'carousel-item-next' : 'carousel-item-prev');
      const itemClasses = mapToCssModules(classNames(className, 'carousel-item', isActive && 'active', directionClassName, orderClassName), cssModule);
      return /*#__PURE__*/React.createElement(Tag, {
        className: itemClasses
      }, children);
    });
  }

}

CarouselItem.propTypes = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  tag: tagPropType,
  in: PropTypes.bool,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  slide: PropTypes.bool,
  className: PropTypes.string
});
CarouselItem.defaultProps = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  tag: 'div',
  timeout: TransitionTimeouts.Carousel,
  slide: true
});
CarouselItem.contextTypes = {
  direction: PropTypes.string
};
var CarouselItem$1 = CarouselItem;

/**
 * CarouselContext
 * {
 *  direction: PropTypes.oneOf(['start', 'end']).isRequired,
 * }
 */

const CarouselContext = React.createContext({});

const SWIPE_THRESHOLD = 40;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.hoverStart = this.hoverStart.bind(this);
    this.hoverEnd = this.hoverEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.state = {
      activeIndex: this.props.activeIndex,
      direction: 'end',
      indicatorClicked: false
    };
  }

  getContextValue() {
    return {
      direction: this.state.direction
    };
  }

  componentDidMount() {
    // Set up the cycle
    if (this.props.ride === 'carousel') {
      this.setInterval();
    } // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.


    document.addEventListener('keyup', this.handleKeyPress);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = null;
    let {
      activeIndex,
      direction,
      indicatorClicked
    } = prevState;

    if (nextProps.activeIndex !== activeIndex) {
      // Calculate the direction to turn
      if (nextProps.activeIndex === activeIndex + 1) {
        direction = 'end';
      } else if (nextProps.activeIndex === activeIndex - 1) {
        direction = 'start';
      } else if (nextProps.activeIndex < activeIndex) {
        direction = indicatorClicked ? 'start' : 'end';
      } else if (nextProps.activeIndex !== activeIndex) {
        direction = indicatorClicked ? 'end' : 'start';
      }

      newState = {
        activeIndex: nextProps.activeIndex,
        direction,
        indicatorClicked: false
      };
    }

    return newState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeIndex === this.state.activeIndex) return;
    this.setInterval(this.props);
  }

  componentWillUnmount() {
    this.clearInterval();
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  setInterval(props = this.props) {
    // make sure not to have multiple intervals going...
    this.clearInterval();

    if (props.interval) {
      this.cycleInterval = setInterval(() => {
        props.next();
      }, parseInt(props.interval, 10));
    }
  }

  clearInterval() {
    clearInterval(this.cycleInterval);
  }

  hoverStart(...args) {
    if (this.props.pause === 'hover') {
      this.clearInterval();
    }

    if (this.props.mouseEnter) {
      this.props.mouseEnter(...args);
    }
  }

  hoverEnd(...args) {
    if (this.props.pause === 'hover') {
      this.setInterval();
    }

    if (this.props.mouseLeave) {
      this.props.mouseLeave(...args);
    }
  }

  handleKeyPress(evt) {
    if (this.props.keyboard) {
      if (evt.keyCode === 37) {
        this.props.previous();
      } else if (evt.keyCode === 39) {
        this.props.next();
      }
    }
  }

  handleTouchStart(e) {
    if (!this.props.enableTouch) {
      return;
    }

    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  handleTouchEnd(e) {
    if (!this.props.enableTouch) {
      return;
    }

    const currentX = e.changedTouches[0].screenX;
    const currentY = e.changedTouches[0].screenY;
    const diffX = Math.abs(this.touchStartX - currentX);
    const diffY = Math.abs(this.touchStartY - currentY); // Don't swipe if Y-movement is bigger than X-movement

    if (diffX < diffY) {
      return;
    }

    if (diffX < SWIPE_THRESHOLD) {
      return;
    }

    if (currentX < this.touchStartX) {
      this.props.next();
    } else {
      this.props.previous();
    }
  }

  renderItems(carouselItems, className) {
    const {
      slide
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, carouselItems.map((item, index) => {
      const isIn = index === this.state.activeIndex;
      return React.cloneElement(item, {
        in: isIn,
        slide: slide
      });
    }));
  }

  render() {
    const {
      cssModule,
      slide,
      className,
      dark,
      fade
    } = this.props;
    const outerClasses = mapToCssModules(classNames(className, 'carousel', fade, slide && 'slide', dark && 'carousel-dark'), cssModule);
    const innerClasses = mapToCssModules(classNames('carousel-inner'), cssModule); // filter out booleans, null, or undefined

    const children = this.props.children.filter(child => child !== null && child !== undefined && typeof child !== 'boolean');
    const slidesOnly = children.every(child => child.type === CarouselItem$1); // Rendering only slides

    if (slidesOnly) {
      return /*#__PURE__*/React.createElement("div", {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd
      }, /*#__PURE__*/React.createElement(CarouselContext.Provider, {
        value: this.getContextValue()
      }, this.renderItems(children, innerClasses)));
    } // Rendering slides and controls


    if (children[0] instanceof Array) {
      const _carouselItems = children[0];
      const _controlLeft = children[1];
      const _controlRight = children[2];
      return /*#__PURE__*/React.createElement("div", {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd
      }, /*#__PURE__*/React.createElement(CarouselContext.Provider, {
        value: this.getContextValue()
      }, this.renderItems(_carouselItems, innerClasses), _controlLeft, _controlRight));
    } // Rendering indicators, slides and controls


    const indicators = children[0];

    const wrappedOnClick = e => {
      if (typeof indicators.props.onClickHandler === 'function') {
        this.setState({
          indicatorClicked: true
        }, () => indicators.props.onClickHandler(e));
      }
    };

    const wrappedIndicators = React.cloneElement(indicators, {
      onClickHandler: wrappedOnClick
    });
    const carouselItems = children[1];
    const controlLeft = children[2];
    const controlRight = children[3];
    return /*#__PURE__*/React.createElement("div", {
      className: outerClasses,
      onMouseEnter: this.hoverStart,
      onMouseLeave: this.hoverEnd,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd
    }, /*#__PURE__*/React.createElement(CarouselContext.Provider, {
      value: this.getContextValue()
    }, wrappedIndicators, this.renderItems(carouselItems, innerClasses), controlLeft, controlRight));
  }

}

Carousel.propTypes = {
  // the current active slide of the carousel
  activeIndex: PropTypes.number,
  // a function which should advance the carousel to the next slide (via activeIndex)
  next: PropTypes.func.isRequired,
  // a function which should advance the carousel to the previous slide (via activeIndex)
  previous: PropTypes.func.isRequired,
  // controls if the left and right arrow keys should control the carousel
  keyboard: PropTypes.bool,

  /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
   * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
   */
  pause: PropTypes.oneOf(['hover', false]),
  // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
  // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
  ride: PropTypes.oneOf(['carousel']),
  // the interval at which the carousel automatically cycles (default: 5000)
  // eslint-disable-next-line react/no-unused-prop-types
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  children: PropTypes.array,
  // called when the mouse enters the Carousel
  mouseEnter: PropTypes.func,
  // called when the mouse exits the Carousel
  mouseLeave: PropTypes.func,
  // controls whether the slide animation on the Carousel works or not
  slide: PropTypes.bool,
  // make the controls, indicators and captions dark on the Carousel
  dark: PropTypes.bool,
  cssModule: PropTypes.object,
  className: PropTypes.string,
  enableTouch: PropTypes.bool
};
Carousel.defaultProps = {
  interval: 5000,
  pause: 'hover',
  keyboard: true,
  slide: true,
  enableTouch: true,
  fade: false
};
Carousel.childContextTypes = {
  direction: PropTypes.string
};
var Carousel$1 = Carousel;

const CarouselControl = props => {
  const {
    direction,
    onClickHandler,
    cssModule,
    directionText,
    className
  } = props;
  const anchorClasses = mapToCssModules(classNames(className, `carousel-control-${direction}`), cssModule);
  const iconClasses = mapToCssModules(classNames(`carousel-control-${direction}-icon`), cssModule);
  const screenReaderClasses = mapToCssModules(classNames('visually-hidden'), cssModule);
  return (
    /*#__PURE__*/
    // We need to disable this linting rule to use an `<a>` instead of
    // `<button>` because that's what the Bootstrap examples require:
    // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    React.createElement("a", {
      className: anchorClasses,
      style: {
        cursor: "pointer"
      },
      role: "button",
      tabIndex: "0",
      onClick: e => {
        e.preventDefault();
        onClickHandler();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: iconClasses,
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: screenReaderClasses
    }, directionText || direction))
  );
};

CarouselControl.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  cssModule: PropTypes.object,
  directionText: PropTypes.string,
  className: PropTypes.string
};
var CarouselControl$1 = CarouselControl;

const CarouselIndicators = props => {
  const {
    items,
    activeIndex,
    cssModule,
    onClickHandler,
    className
  } = props;
  const listClasses = mapToCssModules(classNames(className, 'carousel-indicators'), cssModule);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = mapToCssModules(classNames({
      active: activeIndex === idx
    }), cssModule);
    return /*#__PURE__*/React.createElement("button", {
      "aria-label": item.caption,
      "data-bs-target": true,
      key: `${item.key || Object.values(item).join('')}`,
      onClick: e => {
        e.preventDefault();
        onClickHandler(idx);
      },
      className: indicatorClasses
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: listClasses
  }, indicators);
};

CarouselIndicators.propTypes = {
  items: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  cssModule: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string
};
var CarouselIndicators$1 = CarouselIndicators;

const CarouselCaption = props => {
  const {
    captionHeader,
    captionText,
    cssModule,
    className
  } = props;
  const classes = mapToCssModules(classNames(className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);
  return /*#__PURE__*/React.createElement("div", {
    className: classes
  }, /*#__PURE__*/React.createElement("h3", null, captionHeader), /*#__PURE__*/React.createElement("p", null, captionText));
};

CarouselCaption.propTypes = {
  captionHeader: PropTypes.node,
  captionText: PropTypes.node.isRequired,
  cssModule: PropTypes.object,
  className: PropTypes.string
};
var CarouselCaption$1 = CarouselCaption;

const _excluded$D = ["defaultActiveIndex", "autoPlay", "indicators", "controls", "items", "goToIndex"];
const propTypes$J = {
  items: PropTypes.array.isRequired,
  indicators: PropTypes.bool,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  defaultActiveIndex: PropTypes.number,
  activeIndex: PropTypes.number,
  next: PropTypes.func,
  previous: PropTypes.func,
  goToIndex: PropTypes.func
};

class UncontrolledCarousel extends Component {
  constructor(props) {
    super(props);
    this.animating = false;
    this.state = {
      activeIndex: props.defaultActiveIndex || 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({
      activeIndex: newIndex
    });
  }

  render() {
    const _this$props = this.props,
          {
      defaultActiveIndex,
      autoPlay,
      indicators,
      controls,
      items,
      goToIndex
    } = _this$props,
          props = _objectWithoutProperties(_this$props, _excluded$D);

    const {
      activeIndex
    } = this.state;
    const slides = items.map(item => {
      const key = item.key || item.src;
      return /*#__PURE__*/React.createElement(CarouselItem$1, {
        onExiting: this.onExiting,
        onExited: this.onExited,
        key: key
      }, /*#__PURE__*/React.createElement("img", {
        className: "d-block w-100",
        src: item.src,
        alt: item.altText
      }), /*#__PURE__*/React.createElement(CarouselCaption$1, {
        captionText: item.caption,
        captionHeader: item.header || item.caption
      }));
    });
    return /*#__PURE__*/React.createElement(Carousel$1, _extends({
      activeIndex: activeIndex,
      next: this.next,
      previous: this.previous,
      ride: autoPlay ? 'carousel' : undefined
    }, props), indicators && /*#__PURE__*/React.createElement(CarouselIndicators$1, {
      items: items,
      activeIndex: props.activeIndex || activeIndex,
      onClickHandler: goToIndex || this.goToIndex
    }), slides, controls && /*#__PURE__*/React.createElement(CarouselControl$1, {
      direction: "prev",
      directionText: "Previous",
      onClickHandler: props.previous || this.previous
    }), controls && /*#__PURE__*/React.createElement(CarouselControl$1, {
      direction: "next",
      directionText: "Next",
      onClickHandler: props.next || this.next
    }));
  }

}

UncontrolledCarousel.propTypes = propTypes$J;
UncontrolledCarousel.defaultProps = {
  controls: true,
  indicators: true,
  autoPlay: true
};
var UncontrolledCarousel$1 = UncontrolledCarousel;

const _excluded$C = ["className", "cssModule", "tag"];
const propTypes$I = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$I = {
  tag: 'div'
};

const CardSubtitle = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$C);

  const classes = mapToCssModules(classNames(className, 'card-subtitle'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardSubtitle.propTypes = propTypes$I;
CardSubtitle.defaultProps = defaultProps$I;
var CardSubtitle$1 = CardSubtitle;

const _excluded$B = ["className", "cssModule", "tag"];
const propTypes$H = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$H = {
  tag: 'p'
};

const CardText = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$B);

  const classes = mapToCssModules(classNames(className, 'card-text'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardText.propTypes = propTypes$H;
CardText.defaultProps = defaultProps$H;
var CardText$1 = CardText;

const _excluded$A = ["className", "cssModule", "tag"];
const propTypes$G = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$G = {
  tag: 'div'
};

const CardTitle = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$A);

  const classes = mapToCssModules(classNames(className, 'card-title'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

CardTitle.propTypes = propTypes$G;
CardTitle.defaultProps = defaultProps$G;
var CardTitle$1 = CardTitle;

const _excluded$z = ["cssModule", "children", "isOpen", "flip", "target", "offset", "fallbackPlacements", "placementPrefix", "arrowClassName", "hideArrow", "popperClassName", "tag", "container", "modifiers", "strategy", "boundariesElement", "onClosed", "fade", "transition", "placement"];

function noop$2() {}

const propTypes$F = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  popperClassName: PropTypes.string,
  placement: PropTypes.string,
  placementPrefix: PropTypes.string,
  arrowClassName: PropTypes.string,
  hideArrow: PropTypes.bool,
  tag: tagPropType,
  isOpen: PropTypes.bool.isRequired,
  cssModule: PropTypes.object,
  offset: PropTypes.arrayOf(PropTypes.number),
  fallbackPlacements: PropTypes.array,
  flip: PropTypes.bool,
  container: targetPropType,
  target: targetPropType.isRequired,
  modifiers: PropTypes.array,
  strategy: PropTypes.string,
  boundariesElement: PropTypes.oneOfType([PropTypes.string, DOMElement]),
  onClosed: PropTypes.func,
  fade: PropTypes.bool,
  transition: PropTypes.shape(Fade.propTypes)
};
const defaultProps$F = {
  boundariesElement: 'scrollParent',
  placement: 'auto',
  hideArrow: false,
  isOpen: false,
  offset: [0, 0],
  flip: true,
  container: 'body',
  modifiers: [],
  onClosed: noop$2,
  fade: true,
  transition: _objectSpread2({}, Fade.defaultProps)
};

class PopperContent extends React.Component {
  constructor(props) {
    super(props);
    this.setTargetNode = this.setTargetNode.bind(this);
    this.getTargetNode = this.getTargetNode.bind(this);
    this.getRef = this.getRef.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.state = {
      isOpen: props.isOpen
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return {
        isOpen: props.isOpen
      };
    } else return null;
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus();
    }
  }

  setTargetNode(node) {
    this.targetNode = typeof node === 'string' ? getTarget(node) : node;
  }

  getTargetNode() {
    return this.targetNode;
  }

  getContainerNode() {
    return getTarget(this.props.container);
  }

  getRef(ref) {
    this._element = ref;
  }

  onClosed() {
    this.props.onClosed();
    this.setState({
      isOpen: false
    });
  }

  renderChildren() {
    const _this$props = this.props,
          {
      cssModule,
      children,
      isOpen,
      flip,
      target,
      offset,
      fallbackPlacements,
      placementPrefix,
      arrowClassName: _arrowClassName,
      hideArrow,
      popperClassName: _popperClassName,
      tag,
      container,
      modifiers,
      strategy,
      boundariesElement,
      onClosed,
      fade,
      transition,
      placement
    } = _this$props,
          attrs = _objectWithoutProperties(_this$props, _excluded$z);

    const arrowClassName = mapToCssModules(classNames('arrow', _arrowClassName), cssModule);
    const popperClassName = mapToCssModules(classNames(_popperClassName, placementPrefix ? `${placementPrefix}-auto` : ''), this.props.cssModule);
    const modifierNames = modifiers.map(m => m.name);
    const baseModifiers = [{
      name: 'offset',
      options: {
        offset
      }
    }, {
      name: 'flip',
      enabled: flip,
      options: {
        fallbackPlacements
      }
    }, {
      name: 'preventOverflow',
      options: {
        boundary: boundariesElement
      }
    }].filter(m => !modifierNames.includes(m.name));
    const extendedModifiers = [...baseModifiers, ...modifiers];

    const popperTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0
    });

    return /*#__PURE__*/React.createElement(Fade, _extends({}, popperTransition, attrs, {
      in: isOpen,
      onExited: this.onClosed,
      tag: tag
    }), /*#__PURE__*/React.createElement(Popper, {
      referenceElement: this.targetNode,
      modifiers: extendedModifiers,
      placement: placement,
      strategy: strategy
    }, ({
      ref,
      style,
      placement: popperPlacement,
      isReferenceHidden,
      arrowProps,
      update
    }) => /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: style,
      className: popperClassName,
      "data-popper-placement": popperPlacement,
      "data-popper-reference-hidden": isReferenceHidden ? 'true' : undefined
    }, typeof children === 'function' ? children({
      update
    }) : children, !hideArrow && /*#__PURE__*/React.createElement("span", {
      ref: arrowProps.ref,
      className: arrowClassName,
      style: arrowProps.style
    }))));
  }

  render() {
    this.setTargetNode(this.props.target);

    if (this.state.isOpen) {
      return this.props.container === 'inline' ? this.renderChildren() : ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
        ref: this.getRef
      }, this.renderChildren()), this.getContainerNode());
    }

    return null;
  }

}

PopperContent.propTypes = propTypes$F;
PopperContent.defaultProps = defaultProps$F;
var PopperContent$1 = PopperContent;

const PopperTargetHelper = (props, context) => {
  context.popperManager.setTargetNode(getTarget(props.target));
  return null;
};

PopperTargetHelper.contextTypes = {
  popperManager: PropTypes.object.isRequired
};
PopperTargetHelper.propTypes = {
  target: targetPropType.isRequired
};
var PopperTargetHelper$1 = PopperTargetHelper;

const propTypes$E = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  placement: PropTypes.oneOf(PopperPlacements),
  target: targetPropType.isRequired,
  container: targetPropType,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  hideArrow: PropTypes.bool,
  boundariesElement: PropTypes.oneOfType([PropTypes.string, DOMElement]),
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  popperClassName: PropTypes.string,
  cssModule: PropTypes.object,
  toggle: PropTypes.func,
  autohide: PropTypes.bool,
  placementPrefix: PropTypes.string,
  delay: PropTypes.oneOfType([PropTypes.shape({
    show: PropTypes.number,
    hide: PropTypes.number
  }), PropTypes.number]),
  modifiers: PropTypes.array,
  strategy: PropTypes.string,
  offset: PropTypes.arrayOf(PropTypes.number),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
  trigger: PropTypes.string,
  fade: PropTypes.bool,
  flip: PropTypes.bool
};
const DEFAULT_DELAYS = {
  show: 0,
  hide: 50
};
const defaultProps$E = {
  isOpen: false,
  hideArrow: false,
  autohide: false,
  delay: DEFAULT_DELAYS,
  toggle: function () {},
  trigger: 'click',
  fade: true
};

function isInDOMSubtree(element, subtreeRoot) {
  return subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element));
}

function isInDOMSubtrees(element, subtreeRoots = []) {
  return subtreeRoots && subtreeRoots.length && subtreeRoots.filter(subTreeRoot => isInDOMSubtree(element, subTreeRoot))[0];
}

class TooltipPopoverWrapper extends React.Component {
  constructor(props) {
    super(props);
    this._targets = [];
    this.currentTargetElement = null;
    this.addTargetEvents = this.addTargetEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.removeTargetEvents = this.removeTargetEvents.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showWithDelay = this.showWithDelay.bind(this);
    this.hideWithDelay = this.hideWithDelay.bind(this);
    this.onMouseOverTooltipContent = this.onMouseOverTooltipContent.bind(this);
    this.onMouseLeaveTooltipContent = this.onMouseLeaveTooltipContent.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this.getRef = this.getRef.bind(this);
    this.state = {
      isOpen: props.isOpen
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateTarget();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.removeTargetEvents();
    this._targets = null;
    this.clearShowTimeout();
    this.clearHideTimeout();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return {
        isOpen: props.isOpen
      };
    } else return null;
  }

  onMouseOverTooltipContent() {
    if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }

      if (this.state.isOpen && !this.props.isOpen) {
        this.toggle();
      }
    }
  }

  onMouseLeaveTooltipContent(e) {
    if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
      if (this._showTimeout) {
        this.clearShowTimeout();
      }

      e.persist();
      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
    }
  }

  onEscKeyDown(e) {
    if (e.key === 'Escape') {
      this.hide(e);
    }
  }

  getRef(ref) {
    const {
      innerRef
    } = this.props;

    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(ref);
      } else if (typeof innerRef === 'object') {
        innerRef.current = ref;
      }
    }

    this._popover = ref;
  }

  getDelay(key) {
    const {
      delay
    } = this.props;

    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
    }

    return delay;
  }

  getCurrentTarget(target) {
    if (!target) return null;

    const index = this._targets.indexOf(target);

    if (index >= 0) return this._targets[index];
    return this.getCurrentTarget(target.parentElement);
  }

  show(e) {
    if (!this.props.isOpen) {
      this.clearShowTimeout();
      this.currentTargetElement = e ? e.currentTarget || this.getCurrentTarget(e.target) : null;

      if (e && e.composedPath && typeof e.composedPath === 'function') {
        const path = e.composedPath();
        this.currentTargetElement = path && path[0] || this.currentTargetElement;
      }

      this.toggle(e);
    }
  }

  showWithDelay(e) {
    if (this._hideTimeout) {
      this.clearHideTimeout();
    }

    this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay('show'));
  }

  hide(e) {
    if (this.props.isOpen) {
      this.clearHideTimeout();
      this.currentTargetElement = null;
      this.toggle(e);
    }
  }

  hideWithDelay(e) {
    if (this._showTimeout) {
      this.clearShowTimeout();
    }

    this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
  }

  clearShowTimeout() {
    clearTimeout(this._showTimeout);
    this._showTimeout = undefined;
  }

  clearHideTimeout() {
    clearTimeout(this._hideTimeout);
    this._hideTimeout = undefined;
  }

  handleDocumentClick(e) {
    const triggers = this.props.trigger.split(' ');

    if (triggers.indexOf('legacy') > -1 && (this.props.isOpen || isInDOMSubtrees(e.target, this._targets))) {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }

      if (this.props.isOpen && !isInDOMSubtree(e.target, this._popover)) {
        this.hideWithDelay(e);
      } else if (!this.props.isOpen) {
        this.showWithDelay(e);
      }
    } else if (triggers.indexOf('click') > -1 && isInDOMSubtrees(e.target, this._targets)) {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }

      if (!this.props.isOpen) {
        this.showWithDelay(e);
      } else {
        this.hideWithDelay(e);
      }
    }
  }

  addEventOnTargets(type, handler, isBubble) {
    this._targets.forEach(target => {
      target.addEventListener(type, handler, isBubble);
    });
  }

  removeEventOnTargets(type, handler, isBubble) {
    this._targets.forEach(target => {
      target.removeEventListener(type, handler, isBubble);
    });
  }

  addTargetEvents() {
    if (this.props.trigger) {
      let triggers = this.props.trigger.split(' ');

      if (triggers.indexOf('manual') === -1) {
        if (triggers.indexOf('click') > -1 || triggers.indexOf('legacy') > -1) {
          document.addEventListener('click', this.handleDocumentClick, true);
        }

        if (this._targets && this._targets.length) {
          if (triggers.indexOf('hover') > -1) {
            this.addEventOnTargets('mouseover', this.showWithDelay, true);
            this.addEventOnTargets('mouseout', this.hideWithDelay, true);
          }

          if (triggers.indexOf('focus') > -1) {
            this.addEventOnTargets('focusin', this.show, true);
            this.addEventOnTargets('focusout', this.hide, true);
          }

          this.addEventOnTargets('keydown', this.onEscKeyDown, true);
        }
      }
    }
  }

  removeTargetEvents() {
    if (this._targets) {
      this.removeEventOnTargets('mouseover', this.showWithDelay, true);
      this.removeEventOnTargets('mouseout', this.hideWithDelay, true);
      this.removeEventOnTargets('keydown', this.onEscKeyDown, true);
      this.removeEventOnTargets('focusin', this.show, true);
      this.removeEventOnTargets('focusout', this.hide, true);
    }

    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  updateTarget() {
    const newTarget = getTarget(this.props.target, true);

    if (newTarget !== this._targets) {
      this.removeTargetEvents();
      this._targets = newTarget ? Array.from(newTarget) : [];
      this.currentTargetElement = this.currentTargetElement || this._targets[0];
      this.addTargetEvents();
    }
  }

  toggle(e) {
    if (this.props.disabled || !this._isMounted) {
      return e && e.preventDefault();
    }

    return this.props.toggle(e);
  }

  render() {
    if (this.props.isOpen) {
      this.updateTarget();
    }

    const target = this.currentTargetElement || this._targets[0];

    if (!target) {
      return null;
    }

    const {
      className,
      cssModule,
      innerClassName,
      isOpen,
      hideArrow,
      boundariesElement,
      placement,
      placementPrefix,
      arrowClassName,
      popperClassName,
      container,
      modifiers,
      strategy,
      offset,
      fade,
      flip,
      children
    } = this.props;
    const attributes = omit(this.props, Object.keys(propTypes$E));
    const popperClasses = mapToCssModules(popperClassName, cssModule);
    const classes = mapToCssModules(innerClassName, cssModule);
    return /*#__PURE__*/React.createElement(PopperContent$1, {
      className: className,
      target: target,
      isOpen: isOpen,
      hideArrow: hideArrow,
      boundariesElement: boundariesElement,
      placement: placement,
      placementPrefix: placementPrefix,
      arrowClassName: arrowClassName,
      popperClassName: popperClasses,
      container: container,
      modifiers: modifiers,
      strategy: strategy,
      offset: offset,
      cssModule: cssModule,
      fade: fade,
      flip: flip
    }, ({
      update
    }) => /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
      ref: this.getRef,
      className: classes,
      role: "tooltip",
      onMouseOver: this.onMouseOverTooltipContent,
      onMouseLeave: this.onMouseLeaveTooltipContent,
      onKeyDown: this.onEscKeyDown
    }), typeof children === 'function' ? children({
      update
    }) : children));
  }

}

TooltipPopoverWrapper.propTypes = propTypes$E;
TooltipPopoverWrapper.defaultProps = defaultProps$E;
var TooltipPopoverWrapper$1 = TooltipPopoverWrapper;

const defaultProps$D = {
  placement: 'right',
  placementPrefix: 'bs-popover',
  trigger: 'click',
  offset: [0, 8]
};

const Popover = props => {
  const popperClasses = classNames('popover', 'show', props.popperClassName);
  const classes = classNames('popover-inner', props.innerClassName);
  return /*#__PURE__*/React.createElement(TooltipPopoverWrapper$1, _extends({}, props, {
    arrowClassName: "popover-arrow",
    popperClassName: popperClasses,
    innerClassName: classes
  }));
};

Popover.propTypes = propTypes$E;
Popover.defaultProps = defaultProps$D;
var Popover$1 = Popover;

const omitKeys$4 = ['defaultOpen'];
class UncontrolledPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.defaultOpen || false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(Popover$1, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys$4)));
  }

}
UncontrolledPopover.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, Popover$1.propTypes);

const _excluded$y = ["className", "cssModule", "tag"];
const propTypes$D = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$C = {
  tag: 'h3'
};

const PopoverHeader = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$y);

  const classes = mapToCssModules(classNames(className, 'popover-header'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

PopoverHeader.propTypes = propTypes$D;
PopoverHeader.defaultProps = defaultProps$C;
var PopoverHeader$1 = PopoverHeader;

const _excluded$x = ["className", "cssModule", "tag"];
const propTypes$C = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$B = {
  tag: 'div'
};

const PopoverBody = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$x);

  const classes = mapToCssModules(classNames(className, 'popover-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

PopoverBody.propTypes = propTypes$C;
PopoverBody.defaultProps = defaultProps$B;
var PopoverBody$1 = PopoverBody;

const _excluded$w = ["children", "className", "barClassName", "cssModule", "value", "min", "max", "animated", "striped", "color", "bar", "multi", "tag", "style", "barStyle", "barAriaValueText", "barAriaLabelledBy"];
const propTypes$B = {
  children: PropTypes.node,
  bar: PropTypes.bool,
  multi: PropTypes.bool,
  tag: tagPropType,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  barClassName: PropTypes.string,
  cssModule: PropTypes.object,
  style: PropTypes.object,
  barStyle: PropTypes.object,
  barAriaValueText: PropTypes.string,
  barAriaLabelledBy: PropTypes.string
};
const defaultProps$A = {
  tag: 'div',
  value: 0,
  min: 0,
  max: 100,
  style: {},
  barStyle: {}
};

const Progress = props => {
  const {
    children,
    className,
    barClassName,
    cssModule,
    value,
    min,
    max,
    animated,
    striped,
    color,
    bar,
    multi,
    tag: Tag,
    style,
    barStyle,
    barAriaValueText,
    barAriaLabelledBy
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$w);

  const percent = toNumber(value) / toNumber(max) * 100;
  const progressClasses = mapToCssModules(classNames(className, 'progress'), cssModule);
  const progressBarClasses = mapToCssModules(classNames('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? `bg-${color}` : null, striped || animated ? 'progress-bar-striped' : null), cssModule);
  const progressBarProps = {
    className: progressBarClasses,
    style: _objectSpread2(_objectSpread2(_objectSpread2({}, bar ? style : {}), barStyle), {}, {
      width: `${percent}%`
    }),
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuetext': barAriaValueText,
    'aria-labelledby': barAriaLabelledBy,
    children: children
  };

  if (bar) {
    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, progressBarProps));
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    style: style,
    className: progressClasses
  }), multi ? children : /*#__PURE__*/React.createElement("div", progressBarProps));
};

Progress.propTypes = propTypes$B;
Progress.defaultProps = defaultProps$A;
var Progress$1 = Progress;

const propTypes$A = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any
};

class Portal extends React.Component {
  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }

    this.defaultNode = null;
  }

  render() {
    if (!canUseDOM) {
      return null;
    }

    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
  }

}

Portal.propTypes = propTypes$A;
var Portal$1 = Portal;

function noop$1() {}

const FadePropTypes$1 = PropTypes.shape(Fade.propTypes);
const propTypes$z = {
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  centered: PropTypes.bool,
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])]),
  scrollable: PropTypes.bool,
  size: PropTypes.string,
  toggle: PropTypes.func,
  keyboard: PropTypes.bool,
  role: PropTypes.string,
  labelledBy: PropTypes.string,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  external: PropTypes.node,
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backdropTransition: FadePropTypes$1,
  modalTransition: FadePropTypes$1,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  unmountOnClose: PropTypes.bool,
  returnFocusAfterClose: PropTypes.bool,
  container: targetPropType,
  trapFocus: PropTypes.bool
};
const propsToOmit$1 = Object.keys(propTypes$z);
const defaultProps$z = {
  isOpen: false,
  autoFocus: true,
  centered: false,
  scrollable: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  onOpened: noop$1,
  onClosed: noop$1,
  modalTransition: {
    timeout: TransitionTimeouts.Modal
  },
  backdropTransition: {
    mountOnEnter: true,
    timeout: TransitionTimeouts.Fade // uses standard fade transition

  },
  unmountOnClose: true,
  returnFocusAfterClose: true,
  container: 'body',
  trapFocus: false
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this._element = null;
    this._originalBodyPadding = null;
    this._originalBodyOverflow = null;
    this.getFocusableChildren = this.getFocusableChildren.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleBackdropMouseDown = this.handleBackdropMouseDown.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleStaticBackdropAnimation = this.handleStaticBackdropAnimation.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.manageFocusAfterClose = this.manageFocusAfterClose.bind(this);
    this.clearBackdropAnimationTimeout = this.clearBackdropAnimationTimeout.bind(this);
    this.trapFocus = this.trapFocus.bind(this);
    this.state = {
      isOpen: false,
      showStaticBackdropAnimation: false
    };
  }

  componentDidMount() {
    const {
      isOpen,
      autoFocus,
      onEnter
    } = this.props;

    if (isOpen) {
      this.init();
      this.setState({
        isOpen: true
      });

      if (autoFocus) {
        this.setFocus();
      }
    }

    if (onEnter) {
      onEnter();
    } // traps focus inside the Modal, even if the browser address bar is focused


    document.addEventListener('focus', this.trapFocus, true);
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.init();
      this.setState({
        isOpen: true
      }); // let render() renders Modal Dialog first

      return;
    } // now Modal Dialog is rendered and we can refer this._element and this._dialog


    if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
      this.setFocus();
    }

    if (this._element && prevProps.zIndex !== this.props.zIndex) {
      this._element.style.zIndex = this.props.zIndex;
    }
  }

  componentWillUnmount() {
    this.clearBackdropAnimationTimeout();

    if (this.props.onExit) {
      this.props.onExit();
    }

    if (this._element) {
      this.destroy();

      if (this.props.isOpen || this.state.isOpen) {
        this.close();
      }
    }

    document.removeEventListener('focus', this.trapFocus, true);
    this._isMounted = false;
  }

  trapFocus(ev) {
    if (!this.props.trapFocus) {
      return;
    }

    if (!this._element) //element is not attached
      return;
    if (this._dialog && this._dialog.parentNode === ev.target) // initial focus when the Modal is opened
      return;
    if (this.modalIndex < Modal.openCount - 1) // last opened modal
      return;
    const children = this.getFocusableChildren();

    for (let i = 0; i < children.length; i++) {
      // focus is already inside the Modal
      if (children[i] === ev.target) return;
    }

    if (children.length > 0) {
      // otherwise focus the first focusable element in the Modal
      ev.preventDefault();
      ev.stopPropagation();
      children[0].focus();
    }
  }

  onOpened(node, isAppearing) {
    this.props.onOpened();
    (this.props.modalTransition.onEntered || noop$1)(node, isAppearing);
  }

  onClosed(node) {
    const {
      unmountOnClose
    } = this.props; // so all methods get called before it is unmounted

    this.props.onClosed();
    (this.props.modalTransition.onExited || noop$1)(node);

    if (unmountOnClose) {
      this.destroy();
    }

    this.close();

    if (this._isMounted) {
      this.setState({
        isOpen: false
      });
    }
  }

  setFocus() {
    if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
      this._dialog.parentNode.focus();
    }
  }

  getFocusableChildren() {
    return this._element.querySelectorAll(focusableElements.join(', '));
  }

  getFocusedChild() {
    let currentFocus;
    const focusableChildren = this.getFocusableChildren();

    try {
      currentFocus = document.activeElement;
    } catch (err) {
      currentFocus = focusableChildren[0];
    }

    return currentFocus;
  } // not mouseUp because scrollbar fires it, shouldn't close when user scrolls


  handleBackdropClick(e) {
    if (e.target === this._mouseDownElement) {
      e.stopPropagation();
      const backdrop = this._dialog ? this._dialog.parentNode : null;

      if (backdrop && e.target === backdrop && this.props.backdrop === 'static') {
        this.handleStaticBackdropAnimation();
      }

      if (!this.props.isOpen || this.props.backdrop !== true) return;

      if (backdrop && e.target === backdrop && this.props.toggle) {
        this.props.toggle(e);
      }
    }
  }

  handleTab(e) {
    if (e.which !== 9) return;
    if (this.modalIndex < Modal.openCount - 1) return; // last opened modal

    const focusableChildren = this.getFocusableChildren();
    const totalFocusable = focusableChildren.length;
    if (totalFocusable === 0) return;
    const currentFocus = this.getFocusedChild();
    let focusedIndex = 0;

    for (let i = 0; i < totalFocusable; i += 1) {
      if (focusableChildren[i] === currentFocus) {
        focusedIndex = i;
        break;
      }
    }

    if (e.shiftKey && focusedIndex === 0) {
      e.preventDefault();
      focusableChildren[totalFocusable - 1].focus();
    } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
      e.preventDefault();
      focusableChildren[0].focus();
    }
  }

  handleBackdropMouseDown(e) {
    this._mouseDownElement = e.target;
  }

  handleEscape(e) {
    if (this.props.isOpen && e.keyCode === keyCodes.esc && this.props.toggle) {
      if (this.props.keyboard) {
        e.preventDefault();
        e.stopPropagation();
        this.props.toggle(e);
      } else if (this.props.backdrop === 'static') {
        e.preventDefault();
        e.stopPropagation();
        this.handleStaticBackdropAnimation();
      }
    }
  }

  handleStaticBackdropAnimation() {
    this.clearBackdropAnimationTimeout();
    this.setState({
      showStaticBackdropAnimation: true
    });
    this._backdropAnimationTimeout = setTimeout(() => {
      this.setState({
        showStaticBackdropAnimation: false
      });
    }, 100);
  }

  init() {
    try {
      this._triggeringElement = document.activeElement;
    } catch (err) {
      this._triggeringElement = null;
    }

    if (!this._element) {
      this._element = document.createElement('div');

      this._element.setAttribute('tabindex', '-1');

      this._element.style.position = 'relative';
      this._element.style.zIndex = this.props.zIndex;
      this._mountContainer = getTarget(this.props.container);

      this._mountContainer.appendChild(this._element);
    }

    this._originalBodyPadding = getOriginalBodyPadding();
    this._originalBodyOverflow = window.getComputedStyle(document.body).overflow;
    conditionallyUpdateScrollbar();

    if (Modal.openCount === 0) {
      document.body.className = classNames(document.body.className, mapToCssModules('modal-open', this.props.cssModule));
      document.body.style.overflow = 'hidden';
    }

    this.modalIndex = Modal.openCount;
    Modal.openCount += 1;
  }

  destroy() {
    if (this._element) {
      this._mountContainer.removeChild(this._element);

      this._element = null;
    }

    this.manageFocusAfterClose();
  }

  manageFocusAfterClose() {
    if (this._triggeringElement) {
      const {
        returnFocusAfterClose
      } = this.props;
      if (this._triggeringElement.focus && returnFocusAfterClose) this._triggeringElement.focus();
      this._triggeringElement = null;
    }
  }

  close() {
    if (Modal.openCount <= 1) {
      const modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule); // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`

      const modalOpenClassNameRegex = new RegExp(`(^| )${modalOpenClassName}( |$)`);
      document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
      document.body.style.overflow = this._originalBodyOverflow;
    }

    this.manageFocusAfterClose();
    Modal.openCount = Math.max(0, Modal.openCount - 1);
    setScrollbarWidth(this._originalBodyPadding);
  }

  renderModalDialog() {
    const attributes = omit(this.props, propsToOmit$1);
    const dialogBaseClass = 'modal-dialog';
    return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
      className: mapToCssModules(classNames(dialogBaseClass, this.props.className, {
        [`modal-${this.props.size}`]: this.props.size,
        [`${dialogBaseClass}-centered`]: this.props.centered,
        [`${dialogBaseClass}-scrollable`]: this.props.scrollable,
        'modal-fullscreen': this.props.fullscreen === true,
        [`modal-fullscreen-${this.props.fullscreen}-down`]: typeof this.props.fullscreen === 'string'
      }), this.props.cssModule),
      role: "document",
      ref: c => {
        this._dialog = c;
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: mapToCssModules(classNames('modal-content', this.props.contentClassName), this.props.cssModule)
    }, this.props.children));
  }

  render() {
    const {
      unmountOnClose
    } = this.props;

    if (!!this._element && (this.state.isOpen || !unmountOnClose)) {
      const isModalHidden = !!this._element && !this.state.isOpen && !unmountOnClose;
      this._element.style.display = isModalHidden ? 'none' : 'block';
      const {
        wrapClassName,
        modalClassName,
        backdropClassName,
        cssModule,
        isOpen,
        backdrop,
        role,
        labelledBy,
        external,
        innerRef
      } = this.props;
      const modalAttributes = {
        onClick: this.handleBackdropClick,
        onMouseDown: this.handleBackdropMouseDown,
        onKeyUp: this.handleEscape,
        onKeyDown: this.handleTab,
        style: {
          display: 'block'
        },
        'aria-labelledby': labelledBy,
        role,
        tabIndex: '-1'
      };
      const hasTransition = this.props.fade;

      const modalTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.modalTransition), {}, {
        baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
        timeout: hasTransition ? this.props.modalTransition.timeout : 0
      });

      const backdropTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.backdropTransition), {}, {
        baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
        timeout: hasTransition ? this.props.backdropTransition.timeout : 0
      });

      const Backdrop = backdrop && (hasTransition ? /*#__PURE__*/React.createElement(Fade, _extends({}, backdropTransition, {
        in: isOpen && !!backdrop,
        cssModule: cssModule,
        className: mapToCssModules(classNames('modal-backdrop', backdropClassName), cssModule)
      })) : /*#__PURE__*/React.createElement("div", {
        className: mapToCssModules(classNames('modal-backdrop', 'show', backdropClassName), cssModule)
      }));
      return /*#__PURE__*/React.createElement(Portal$1, {
        node: this._element
      }, /*#__PURE__*/React.createElement("div", {
        className: mapToCssModules(wrapClassName)
      }, /*#__PURE__*/React.createElement(Fade, _extends({}, modalAttributes, modalTransition, {
        in: isOpen,
        onEntered: this.onOpened,
        onExited: this.onClosed,
        cssModule: cssModule,
        className: mapToCssModules(classNames('modal', modalClassName, this.state.showStaticBackdropAnimation && 'modal-static'), cssModule),
        innerRef: innerRef
      }), external, this.renderModalDialog()), Backdrop));
    }

    return null;
  }

  clearBackdropAnimationTimeout() {
    if (this._backdropAnimationTimeout) {
      clearTimeout(this._backdropAnimationTimeout);
      this._backdropAnimationTimeout = undefined;
    }
  }

}

Modal.propTypes = propTypes$z;
Modal.defaultProps = defaultProps$z;
Modal.openCount = 0;
var Modal$1 = Modal;

const _excluded$v = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "close"];
const propTypes$y = {
  tag: tagPropType,
  wrapTag: tagPropType,
  toggle: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  closeAriaLabel: PropTypes.string,
  close: PropTypes.object
};
const defaultProps$y = {
  tag: 'h5',
  wrapTag: 'div',
  closeAriaLabel: 'Close'
};

const ModalHeader = props => {
  let closeButton;

  const {
    className,
    cssModule,
    children,
    toggle,
    tag: Tag,
    wrapTag: WrapTag,
    closeAriaLabel,
    close
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$v);

  const classes = mapToCssModules(classNames(className, 'modal-header'), cssModule);

  if (!close && toggle) {
    closeButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: mapToCssModules('btn-close', cssModule),
      "aria-label": closeAriaLabel
    });
  }

  return /*#__PURE__*/React.createElement(WrapTag, _extends({}, attributes, {
    className: classes
  }), /*#__PURE__*/React.createElement(Tag, {
    className: mapToCssModules('modal-title', cssModule)
  }, children), close || closeButton);
};

ModalHeader.propTypes = propTypes$y;
ModalHeader.defaultProps = defaultProps$y;
var ModalHeader$1 = ModalHeader;

const _excluded$u = ["className", "cssModule", "tag"];
const propTypes$x = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$x = {
  tag: 'div'
};

const ModalBody = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$u);

  const classes = mapToCssModules(classNames(className, 'modal-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ModalBody.propTypes = propTypes$x;
ModalBody.defaultProps = defaultProps$x;
var ModalBody$1 = ModalBody;

const _excluded$t = ["className", "cssModule", "tag"];
const propTypes$w = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$w = {
  tag: 'div'
};

const ModalFooter = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$t);

  const classes = mapToCssModules(classNames(className, 'modal-footer'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ModalFooter.propTypes = propTypes$w;
ModalFooter.defaultProps = defaultProps$w;
var ModalFooter$1 = ModalFooter;

const defaultProps$v = {
  placement: 'top',
  autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'hover focus'
};

const Tooltip = props => {
  const popperClasses = classNames('tooltip', 'show', props.popperClassName);
  const classes = classNames('tooltip-inner', props.innerClassName);
  return /*#__PURE__*/React.createElement(TooltipPopoverWrapper$1, _extends({}, props, {
    arrowClassName: "tooltip-arrow",
    popperClassName: popperClasses,
    innerClassName: classes
  }));
};

Tooltip.propTypes = propTypes$E;
Tooltip.defaultProps = defaultProps$v;
var Tooltip$1 = Tooltip;

const _excluded$s = ["className", "cssModule", "size", "bordered", "borderless", "striped", "dark", "hover", "responsive", "tag", "responsiveTag", "innerRef"];
const propTypes$v = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: tagPropType,
  responsiveTag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
};
const defaultProps$u = {
  tag: 'table',
  responsiveTag: 'div'
};

const Table = props => {
  const {
    className,
    cssModule,
    size,
    bordered,
    borderless,
    striped,
    dark,
    hover,
    responsive,
    tag: Tag,
    responsiveTag: ResponsiveTag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$s);

  const classes = mapToCssModules(classNames(className, 'table', size ? 'table-' + size : false, bordered ? 'table-bordered' : false, borderless ? 'table-borderless' : false, striped ? 'table-striped' : false, dark ? 'table-dark' : false, hover ? 'table-hover' : false), cssModule);
  const table = /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    ref: innerRef,
    className: classes
  }));

  if (responsive) {
    const responsiveClassName = mapToCssModules(responsive === true ? 'table-responsive' : `table-responsive-${responsive}`, cssModule);
    return /*#__PURE__*/React.createElement(ResponsiveTag, {
      className: responsiveClassName
    }, table);
  }

  return table;
};

Table.propTypes = propTypes$v;
Table.defaultProps = defaultProps$u;
var Table$1 = Table;

const _excluded$r = ["className", "cssModule", "tag", "flush", "horizontal", "numbered"];
const propTypes$u = {
  tag: tagPropType,
  flush: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  numbered: PropTypes.bool
};
const defaultProps$t = {
  tag: 'ul',
  horizontal: false,
  numbered: false
};

const getHorizontalClass = horizontal => {
  if (horizontal === false) {
    return false;
  } else if (horizontal === true || horizontal === "xs") {
    return "list-group-horizontal";
  }

  return `list-group-horizontal-${horizontal}`;
};

const ListGroup = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    flush,
    horizontal,
    numbered
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$r);

  const classes = mapToCssModules(classNames(className, 'list-group', // list-group-horizontal cannot currently be mixed with list-group-flush
  // we only try to apply horizontal classes if flush is false
  flush ? 'list-group-flush' : getHorizontalClass(horizontal), {
    'list-group-numbered': numbered
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ListGroup.propTypes = propTypes$u;
ListGroup.defaultProps = defaultProps$t;
var ListGroup$1 = ListGroup;

const _excluded$q = ["className", "cssModule", "inline", "tag", "innerRef"];
const propTypes$t = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$s = {
  tag: 'form'
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
    this.submit = this.submit.bind(this);
  }

  getRef(ref) {
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    this.ref = ref;
  }

  submit() {
    if (this.ref) {
      this.ref.submit();
    }
  }

  render() {
    const _this$props = this.props,
          {
      className,
      cssModule,
      inline,
      tag: Tag,
      innerRef
    } = _this$props,
          attributes = _objectWithoutProperties(_this$props, _excluded$q);

    const classes = mapToCssModules(classNames(className, inline ? 'form-inline' : false), cssModule);
    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes
    }));
  }

}

Form.propTypes = propTypes$t;
Form.defaultProps = defaultProps$s;
var Form$1 = Form;

const _excluded$p = ["className", "cssModule", "valid", "tooltip", "tag"];
const propTypes$s = {
  children: PropTypes.node,
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  valid: PropTypes.bool,
  tooltip: PropTypes.bool
};
const defaultProps$r = {
  tag: 'div',
  valid: undefined
};

const FormFeedback = props => {
  const {
    className,
    cssModule,
    valid,
    tooltip,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$p);

  const validMode = tooltip ? 'tooltip' : 'feedback';
  const classes = mapToCssModules(classNames(className, valid ? `valid-${validMode}` : `invalid-${validMode}`), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

FormFeedback.propTypes = propTypes$s;
FormFeedback.defaultProps = defaultProps$r;
var FormFeedback$1 = FormFeedback;

const _excluded$o = ["className", "cssModule", "row", "disabled", "check", "inline", "floating", "tag", "switch"];
const propTypes$r = {
  children: PropTypes.node,
  row: PropTypes.bool,
  check: PropTypes.bool,
  switch: PropTypes.bool,
  inline: PropTypes.bool,
  floating: PropTypes.bool,
  disabled: PropTypes.bool,
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$q = {
  tag: 'div'
};

const FormGroup = props => {
  const {
    className,
    cssModule,
    row,
    disabled,
    check,
    inline,
    floating,
    tag: Tag,
    switch: switchProp
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$o);

  const formCheck = check || switchProp;
  const classes = mapToCssModules(classNames(className, row ? 'row' : false, formCheck ? 'form-check' : 'mb-3', switchProp ? 'form-switch' : false, formCheck && inline ? 'form-check-inline' : false, formCheck && disabled ? 'disabled' : false, floating && 'form-floating'), cssModule);

  if (Tag === 'fieldset') {
    attributes.disabled = disabled;
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

FormGroup.propTypes = propTypes$r;
FormGroup.defaultProps = defaultProps$q;
var FormGroup$1 = FormGroup;

const _excluded$n = ["className", "cssModule", "inline", "color", "tag"];
const propTypes$q = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  tag: tagPropType,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$p = {
  tag: 'small',
  color: 'muted'
};

const FormText = props => {
  const {
    className,
    cssModule,
    inline,
    color,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$n);

  const classes = mapToCssModules(classNames(className, !inline ? 'form-text' : false, color ? `text-${color}` : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

FormText.propTypes = propTypes$q;
FormText.defaultProps = defaultProps$p;
var FormText$1 = FormText;

const _excluded$m = ["className", "cssModule", "type", "bsSize", "valid", "invalid", "tag", "addon", "plaintext", "innerRef"];
const propTypes$p = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bsSize: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$o = {
  type: 'text'
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
    this.focus = this.focus.bind(this);
  }

  getRef(ref) {
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    this.ref = ref;
  }

  focus() {
    if (this.ref) {
      this.ref.focus();
    }
  }

  render() {
    let _this$props = this.props,
        {
      className,
      cssModule,
      type,
      bsSize,
      valid,
      invalid,
      tag,
      addon,
      plaintext,
      innerRef
    } = _this$props,
        attributes = _objectWithoutProperties(_this$props, _excluded$m);

    const checkInput = ['switch', 'radio', 'checkbox'].indexOf(type) > -1;
    const isNotaNumber = new RegExp('\\D', 'g');
    const textareaInput = type === 'textarea';
    const selectInput = type === 'select';
    const rangeInput = type === 'range';
    let Tag = tag || (selectInput || textareaInput ? type : 'input');
    let formControlClass = 'form-control';

    if (plaintext) {
      formControlClass = `${formControlClass}-plaintext`;
      Tag = tag || 'input';
    } else if (rangeInput) {
      formControlClass = 'form-range';
    } else if (selectInput) {
      formControlClass = "form-select";
    } else if (checkInput) {
      if (addon) {
        formControlClass = null;
      } else {
        formControlClass = 'form-check-input';
      }
    }

    if (attributes.size && isNotaNumber.test(attributes.size)) {
      warnOnce('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
      bsSize = attributes.size;
      delete attributes.size;
    }

    const classes = mapToCssModules(classNames(className, invalid && 'is-invalid', valid && 'is-valid', bsSize ? selectInput ? `form-select-${bsSize}` : `form-control-${bsSize}` : false, formControlClass), cssModule);

    if (Tag === 'input' || tag && typeof tag === 'function') {
      attributes.type = type === 'switch' ? 'checkbox' : type;
    }

    if (attributes.children && !(plaintext || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
      warnOnce(`Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`);
      delete attributes.children;
    }

    return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes,
      "aria-invalid": invalid
    }));
  }

}

Input.propTypes = propTypes$p;
Input.defaultProps = defaultProps$o;
var Input$1 = Input;

const _excluded$l = ["className", "cssModule", "tag", "type", "size"];
const propTypes$o = {
  tag: tagPropType,
  type: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$n = {
  tag: 'div'
};

const InputGroup = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    type,
    size
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$l);

  const classes = mapToCssModules(classNames(className, 'input-group', size ? `input-group-${size}` : null), cssModule);

  if (props.type === 'dropdown') {
    return /*#__PURE__*/React.createElement(Dropdown$1, _extends({}, attributes, {
      className: classes
    }));
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

InputGroup.propTypes = propTypes$o;
InputGroup.defaultProps = defaultProps$n;
var InputGroup$1 = InputGroup;

const _excluded$k = ["className", "cssModule", "tag"];
const propTypes$n = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$m = {
  tag: 'span'
};

const InputGroupText = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$k);

  const classes = mapToCssModules(classNames(className, 'input-group-text'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

InputGroupText.propTypes = propTypes$n;
InputGroupText.defaultProps = defaultProps$m;
var InputGroupText$1 = InputGroupText;

const _excluded$j = ["className", "cssModule", "hidden", "widths", "tag", "check", "size", "for"];
const colWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps = PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.shape({
  size: stringOrNumberProp,
  order: stringOrNumberProp,
  offset: stringOrNumberProp
})]);
const propTypes$m = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
  check: PropTypes.bool,
  size: PropTypes.string,
  for: PropTypes.string,
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  xxl: columnProps,
  widths: PropTypes.array
};
const defaultProps$l = {
  tag: 'label',
  widths: colWidths
};

const getColumnSizeClass = (isXs, colWidth, colSize) => {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

const Label = props => {
  const {
    className,
    cssModule,
    hidden,
    widths,
    tag: Tag,
    check,
    size,
    for: htmlFor
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$j);

  const colClasses = [];
  widths.forEach((colWidth, i) => {
    let columnProp = props[colWidth];
    delete attributes[colWidth];

    if (!columnProp && columnProp !== '') {
      return;
    }

    const isXs = !i;
    let colClass;

    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
      colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      colClasses.push(mapToCssModules(classNames({
        [colClass]: columnProp.size || columnProp.size === '',
        [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
        [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
      })), cssModule);
    } else {
      colClass = getColumnSizeClass(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });
  const colFormLabel = size || colClasses.length;
  const formLabel = !(check || colFormLabel);
  const classes = mapToCssModules(classNames(className, hidden ? 'visually-hidden' : false, check ? 'form-check-label' : false, size ? `col-form-label-${size}` : false, colClasses, colFormLabel ? 'col-form-label' : false, formLabel ? 'form-label' : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    htmlFor: htmlFor
  }, attributes, {
    className: classes
  }));
};

Label.propTypes = propTypes$m;
Label.defaultProps = defaultProps$l;
var Label$1 = Label;

const _excluded$i = ["body", "bottom", "className", "cssModule", "heading", "left", "list", "middle", "object", "right", "tag", "top"];
const propTypes$l = {
  body: PropTypes.bool,
  bottom: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  heading: PropTypes.bool,
  left: PropTypes.bool,
  list: PropTypes.bool,
  middle: PropTypes.bool,
  object: PropTypes.bool,
  right: PropTypes.bool,
  tag: tagPropType,
  top: PropTypes.bool
};

const Media = props => {
  const {
    body,
    bottom,
    className,
    cssModule,
    heading,
    left,
    list,
    middle,
    object,
    right,
    tag,
    top
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$i);

  let defaultTag;

  if (heading) {
    defaultTag = 'h4';
  } else if (attributes.href) {
    defaultTag = 'a';
  } else if (attributes.src || object) {
    defaultTag = 'img';
  } else if (list) {
    defaultTag = 'ul';
  } else {
    defaultTag = 'div';
  }

  const Tag = tag || defaultTag;
  const classes = mapToCssModules(classNames(className, {
    'media-body': body,
    'media-heading': heading,
    'media-left': left,
    'media-right': right,
    'media-top': top,
    'media-bottom': bottom,
    'media-middle': middle,
    'media-object': object,
    'media-list': list,
    media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

Media.propTypes = propTypes$l;
var Media$1 = Media;

function noop() {}

const FadePropTypes = PropTypes.shape(Fade.propTypes);
const propTypes$k = {
  autoFocus: PropTypes.bool,
  backdrop: PropTypes.bool,
  backdropClassName: PropTypes.string,
  backdropTransition: FadePropTypes,
  children: PropTypes.node,
  className: PropTypes.string,
  container: targetPropType,
  cssModule: PropTypes.object,
  direction: PropTypes.oneOf(['start', 'end', 'bottom', 'top']),
  fade: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  isOpen: PropTypes.bool,
  keyboard: PropTypes.bool,
  labelledBy: PropTypes.string,
  offcanvasTransition: FadePropTypes,
  onClosed: PropTypes.func,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  returnFocusAfterClose: PropTypes.bool,
  role: PropTypes.string,
  scrollable: PropTypes.bool,
  toggle: PropTypes.func,
  trapFocus: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
const propsToOmit = Object.keys(propTypes$k);
const defaultProps$k = {
  isOpen: false,
  autoFocus: true,
  direction: 'start',
  scrollable: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  onOpened: noop,
  onClosed: noop,
  offcanvasTransition: {
    timeout: TransitionTimeouts.Offcanvas
  },
  backdropTransition: {
    mountOnEnter: true,
    timeout: TransitionTimeouts.Fade // uses standard fade transition

  },
  unmountOnClose: true,
  returnFocusAfterClose: true,
  container: 'body',
  trapFocus: false
};

class Offcanvas extends React.Component {
  constructor(props) {
    super(props);
    this._element = null;
    this._originalBodyPadding = null;
    this.getFocusableChildren = this.getFocusableChildren.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleBackdropMouseDown = this.handleBackdropMouseDown.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.manageFocusAfterClose = this.manageFocusAfterClose.bind(this);
    this.clearBackdropAnimationTimeout = this.clearBackdropAnimationTimeout.bind(this);
    this.trapFocus = this.trapFocus.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    const {
      isOpen,
      autoFocus,
      onEnter
    } = this.props;

    if (isOpen) {
      this.init();
      this.setState({
        isOpen: true
      });

      if (autoFocus) {
        this.setFocus();
      }
    }

    if (onEnter) {
      onEnter();
    } // traps focus inside the Offcanvas, even if the browser address bar is focused


    document.addEventListener('focus', this.trapFocus, true);
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.init();
      this.setState({
        isOpen: true
      });
      return;
    } // now Offcanvas Dialog is rendered and we can refer this._element and this._dialog


    if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
      this.setFocus();
    }

    if (this._element && prevProps.zIndex !== this.props.zIndex) {
      this._element.style.zIndex = this.props.zIndex;
    }
  }

  componentWillUnmount() {
    this.clearBackdropAnimationTimeout();

    if (this.props.onExit) {
      this.props.onExit();
    }

    if (this._element) {
      this.destroy();

      if (this.props.isOpen || this.state.isOpen) {
        this.close();
      }
    }

    document.removeEventListener('focus', this.trapFocus, true);
    this._isMounted = false;
  }

  trapFocus(ev) {
    if (!this.props.trapFocus) {
      return;
    }

    if (!this._element) //element is not attached
      return;
    if (this._dialog === ev.target) // initial focus when the Offcanvas is opened
      return;
    if (this.offcanvasIndex < Offcanvas.openCount - 1) // last opened offcanvas
      return;
    const children = this.getFocusableChildren();

    for (let i = 0; i < children.length; i++) {
      // focus is already inside the Offcanvas
      if (children[i] === ev.target) return;
    }

    if (children.length > 0) {
      // otherwise focus the first focusable element in the Offcanvas
      ev.preventDefault();
      ev.stopPropagation();
      children[0].focus();
    }
  }

  onOpened(node, isAppearing) {
    this.props.onOpened();
    (this.props.offcanvasTransition.onEntered || noop)(node, isAppearing);
  }

  onClosed(node) {
    const {
      unmountOnClose
    } = this.props; // so all methods get called before it is unmounted

    this.props.onClosed();
    (this.props.offcanvasTransition.onExited || noop)(node);

    if (unmountOnClose) {
      this.destroy();
    }

    this.close();

    if (this._isMounted) {
      this.setState({
        isOpen: false
      });
    }
  }

  setFocus() {
    if (this._dialog && typeof this._dialog.focus === 'function') {
      this._dialog.focus();
    }
  }

  getFocusableChildren() {
    return this._element.querySelectorAll(focusableElements.join(', '));
  }

  getFocusedChild() {
    let currentFocus;
    const focusableChildren = this.getFocusableChildren();

    try {
      currentFocus = document.activeElement;
    } catch (err) {
      currentFocus = focusableChildren[0];
    }

    return currentFocus;
  } // not mouseUp because scrollbar fires it, shouldn't close when user scrolls


  handleBackdropClick(e) {
    if (e.target === this._mouseDownElement) {
      e.stopPropagation();
      const backdrop = this._backdrop;
      if (!this.props.isOpen || this.props.backdrop !== true) return;

      if (backdrop && e.target === backdrop && this.props.toggle) {
        this.props.toggle(e);
      }
    }
  }

  handleTab(e) {
    if (e.which !== 9) return;
    if (this.offcanvasIndex < Offcanvas.openCount - 1) return; // last opened offcanvas

    const focusableChildren = this.getFocusableChildren();
    const totalFocusable = focusableChildren.length;
    if (totalFocusable === 0) return;
    const currentFocus = this.getFocusedChild();
    let focusedIndex = 0;

    for (let i = 0; i < totalFocusable; i += 1) {
      if (focusableChildren[i] === currentFocus) {
        focusedIndex = i;
        break;
      }
    }

    if (e.shiftKey && focusedIndex === 0) {
      e.preventDefault();
      focusableChildren[totalFocusable - 1].focus();
    } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
      e.preventDefault();
      focusableChildren[0].focus();
    }
  }

  handleBackdropMouseDown(e) {
    this._mouseDownElement = e.target;
  }

  handleEscape(e) {
    if (this.props.isOpen && e.keyCode === keyCodes.esc && this.props.toggle) {
      if (this.props.keyboard) {
        e.preventDefault();
        e.stopPropagation();
        this.props.toggle(e);
      }
    }
  }

  init() {
    try {
      this._triggeringElement = document.activeElement;
    } catch (err) {
      this._triggeringElement = null;
    }

    if (!this._element) {
      this._element = document.createElement('div');

      this._element.setAttribute('tabindex', '-1');

      this._element.style.position = 'relative';
      this._element.style.zIndex = this.props.zIndex;
      this._mountContainer = getTarget(this.props.container);

      this._mountContainer.appendChild(this._element);
    }

    this._originalBodyPadding = getOriginalBodyPadding();
    conditionallyUpdateScrollbar();

    if (Offcanvas.openCount === 0 && this.props.backdrop && !this.props.scrollable) {
      document.body.style.overflow = 'hidden';
    }

    this.offcanvasIndex = Offcanvas.openCount;
    Offcanvas.openCount += 1;
  }

  destroy() {
    if (this._element) {
      this._mountContainer.removeChild(this._element);

      this._element = null;
    }

    this.manageFocusAfterClose();
  }

  manageFocusAfterClose() {
    if (this._triggeringElement) {
      const {
        returnFocusAfterClose
      } = this.props;
      if (this._triggeringElement.focus && returnFocusAfterClose) this._triggeringElement.focus();
      this._triggeringElement = null;
    }
  }

  close() {
    this.manageFocusAfterClose();
    Offcanvas.openCount = Math.max(0, Offcanvas.openCount - 1);
    document.body.style.overflow = null;
    setScrollbarWidth(this._originalBodyPadding);
  }

  render() {
    const {
      direction,
      unmountOnClose
    } = this.props;

    if (!!this._element && (this.state.isOpen || !unmountOnClose)) {
      const isOffcanvasHidden = !!this._element && !this.state.isOpen && !unmountOnClose;
      this._element.style.display = isOffcanvasHidden ? 'none' : 'block';
      const {
        className,
        backdropClassName,
        cssModule,
        isOpen,
        backdrop,
        role,
        labelledBy,
        style
      } = this.props;
      const offcanvasAttributes = {
        onKeyUp: this.handleEscape,
        onKeyDown: this.handleTab,
        'aria-labelledby': labelledBy,
        role,
        tabIndex: '-1'
      };
      const hasTransition = this.props.fade;

      const offcanvasTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.offcanvasTransition), {}, {
        baseClass: hasTransition ? this.props.offcanvasTransition.baseClass : '',
        timeout: hasTransition ? this.props.offcanvasTransition.timeout : 0
      });

      const backdropTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.backdropTransition), {}, {
        baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
        timeout: hasTransition ? this.props.backdropTransition.timeout : 0
      });

      const Backdrop = backdrop && (hasTransition ? /*#__PURE__*/React.createElement(Fade, _extends({}, backdropTransition, {
        in: isOpen && !!backdrop,
        innerRef: c => {
          this._backdrop = c;
        },
        cssModule: cssModule,
        className: mapToCssModules(classNames('offcanvas-backdrop', backdropClassName), cssModule),
        onClick: this.handleBackdropClick,
        onMouseDown: this.handleBackdropMouseDown
      })) : /*#__PURE__*/React.createElement("div", {
        className: mapToCssModules(classNames('offcanvas-backdrop', 'show', backdropClassName), cssModule),
        onClick: this.handleBackdropClick,
        onMouseDown: this.handleBackdropMouseDown
      }));
      const attributes = omit(this.props, propsToOmit);
      return /*#__PURE__*/React.createElement(Portal$1, {
        node: this._element
      }, /*#__PURE__*/React.createElement(Fade, _extends({}, attributes, offcanvasAttributes, offcanvasTransition, {
        in: isOpen,
        onEntered: this.onOpened,
        onExited: this.onClosed,
        cssModule: cssModule,
        className: mapToCssModules(classNames('offcanvas', className, `offcanvas-${direction}`), cssModule),
        innerRef: c => {
          this._dialog = c;
        },
        style: _objectSpread2(_objectSpread2({}, style), {}, {
          visibility: isOpen ? 'visible' : 'hidden'
        })
      }), this.props.children), Backdrop);
    }

    return null;
  }

  clearBackdropAnimationTimeout() {
    if (this._backdropAnimationTimeout) {
      clearTimeout(this._backdropAnimationTimeout);
      this._backdropAnimationTimeout = undefined;
    }
  }

}

Offcanvas.propTypes = propTypes$k;
Offcanvas.defaultProps = defaultProps$k;
Offcanvas.openCount = 0;
var Offcanvas$1 = Offcanvas;

const _excluded$h = ["className", "cssModule", "tag"];
const propTypes$j = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$j = {
  tag: 'div'
};

const OffcanvasBody = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$h);

  const classes = mapToCssModules(classNames(className, 'offcanvas-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

OffcanvasBody.propTypes = propTypes$j;
OffcanvasBody.defaultProps = defaultProps$j;
var OffcanvasBody$1 = OffcanvasBody;

const _excluded$g = ["children", "className", "close", "closeAriaLabel", "cssModule", "tag", "toggle", "wrapTag"];
const propTypes$i = {
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.object,
  closeAriaLabel: PropTypes.string,
  cssModule: PropTypes.object,
  tag: tagPropType,
  toggle: PropTypes.func,
  wrapTag: tagPropType
};
const defaultProps$i = {
  closeAriaLabel: 'Close',
  tag: 'h5',
  wrapTag: 'div'
};

const OffcanvasHeader = props => {
  let closeButton;

  const {
    children,
    className,
    close,
    closeAriaLabel,
    cssModule,
    tag: Tag,
    toggle,
    wrapTag: WrapTag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$g);

  const classes = mapToCssModules(classNames(className, 'offcanvas-header'), cssModule);

  if (!close && toggle) {
    closeButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: mapToCssModules('btn-close', cssModule),
      "aria-label": closeAriaLabel
    });
  }

  return /*#__PURE__*/React.createElement(WrapTag, _extends({}, attributes, {
    className: classes
  }), /*#__PURE__*/React.createElement(Tag, {
    className: mapToCssModules('offcanvas-title', cssModule)
  }, children), close || closeButton);
};

OffcanvasHeader.propTypes = propTypes$i;
OffcanvasHeader.defaultProps = defaultProps$i;
var OffcanvasHeader$1 = OffcanvasHeader;

const _excluded$f = ["className", "listClassName", "cssModule", "size", "tag", "listTag", "aria-label"];
const propTypes$h = {
  children: PropTypes.node,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: tagPropType,
  listTag: tagPropType,
  'aria-label': PropTypes.string
};
const defaultProps$h = {
  tag: 'nav',
  listTag: 'ul',
  'aria-label': 'pagination'
};

const Pagination = props => {
  const {
    className,
    listClassName,
    cssModule,
    size,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$f);

  const classes = mapToCssModules(classNames(className), cssModule);
  const listClasses = mapToCssModules(classNames(listClassName, 'pagination', {
    [`pagination-${size}`]: !!size
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, {
    className: classes,
    "aria-label": label
  }, /*#__PURE__*/React.createElement(ListTag, _extends({}, attributes, {
    className: listClasses
  })));
};

Pagination.propTypes = propTypes$h;
Pagination.defaultProps = defaultProps$h;
var Pagination$1 = Pagination;

const _excluded$e = ["active", "className", "cssModule", "disabled", "tag"];
const propTypes$g = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  tag: tagPropType
};
const defaultProps$g = {
  tag: 'li'
};

const PaginationItem = props => {
  const {
    active,
    className,
    cssModule,
    disabled,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$e);

  const classes = mapToCssModules(classNames(className, 'page-item', {
    active,
    disabled
  }), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

PaginationItem.propTypes = propTypes$g;
PaginationItem.defaultProps = defaultProps$g;
var PaginationItem$1 = PaginationItem;

const _excluded$d = ["className", "cssModule", "next", "previous", "first", "last", "tag"];
const propTypes$f = {
  'aria-label': PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  tag: tagPropType
};
const defaultProps$f = {
  tag: 'a'
};

const PaginationLink = props => {
  let {
    className,
    cssModule,
    next,
    previous,
    first,
    last,
    tag: Tag
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$d);

  const classes = mapToCssModules(classNames(className, 'page-link'), cssModule);
  let defaultAriaLabel;

  if (previous) {
    defaultAriaLabel = 'Previous';
  } else if (next) {
    defaultAriaLabel = 'Next';
  } else if (first) {
    defaultAriaLabel = 'First';
  } else if (last) {
    defaultAriaLabel = 'Last';
  }

  const ariaLabel = props['aria-label'] || defaultAriaLabel;
  let defaultCaret;

  if (previous) {
    defaultCaret = '\u2039';
  } else if (next) {
    defaultCaret = '\u203A';
  } else if (first) {
    defaultCaret = '\u00ab';
  } else if (last) {
    defaultCaret = '\u00bb';
  }

  let children = props.children;

  if (children && Array.isArray(children) && children.length === 0) {
    children = null;
  }

  if (!attributes.href && Tag === 'a') {
    Tag = 'button';
  }

  if (previous || next || first || last) {
    children = [/*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      key: "caret"
    }, children || defaultCaret), /*#__PURE__*/React.createElement("span", {
      className: "visually-hidden",
      key: "ariaLabel"
    }, ariaLabel)];
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    "aria-label": ariaLabel
  }), children);
};

PaginationLink.propTypes = propTypes$f;
PaginationLink.defaultProps = defaultProps$f;
var PaginationLink$1 = PaginationLink;

/**
 * TabContext
 * {
 *  activeTabId: PropTypes.any
 * }
 */

const TabContext = React.createContext({});

const propTypes$e = {
  tag: tagPropType,
  activeTab: PropTypes.any,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$e = {
  tag: 'div'
};

class TabContent extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.activeTab !== nextProps.activeTab) {
      return {
        activeTab: nextProps.activeTab
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    };
  }

  render() {
    const {
      className,
      cssModule,
      tag: Tag
    } = this.props;
    const attributes = omit(this.props, Object.keys(propTypes$e));
    const classes = mapToCssModules(classNames('tab-content', className), cssModule);
    return /*#__PURE__*/React.createElement(TabContext.Provider, {
      value: {
        activeTabId: this.state.activeTab
      }
    }, /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
      className: classes
    })));
  }

}

var TabContent$1 = TabContent;
TabContent.propTypes = propTypes$e;
TabContent.defaultProps = defaultProps$e;

const _excluded$c = ["className", "cssModule", "tabId", "tag"];
const propTypes$d = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  tabId: PropTypes.any
};
const defaultProps$d = {
  tag: 'div'
};
function TabPane(props) {
  const {
    className,
    cssModule,
    tabId,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$c);

  const getClasses = activeTabId => mapToCssModules(classNames('tab-pane', className, {
    active: tabId === activeTabId
  }), cssModule);

  return /*#__PURE__*/React.createElement(TabContext.Consumer, null, ({
    activeTabId
  }) => /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: getClasses(activeTabId)
  })));
}
TabPane.propTypes = propTypes$d;
TabPane.defaultProps = defaultProps$d;

const _excluded$b = ["className", "closeClassName", "closeAriaLabel", "cssModule", "tag", "color", "isOpen", "toggle", "children", "transition", "fade", "innerRef"];
const propTypes$c = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeClassName: PropTypes.string,
  closeAriaLabel: PropTypes.string,
  cssModule: PropTypes.object,
  color: PropTypes.string,
  fade: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  tag: tagPropType,
  transition: PropTypes.shape(Fade.propTypes),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$c = {
  color: 'success',
  isOpen: true,
  tag: 'div',
  closeAriaLabel: 'Close',
  fade: true,
  transition: _objectSpread2(_objectSpread2({}, Fade.defaultProps), {}, {
    unmountOnExit: true
  })
};

function Alert(props) {
  const {
    className,
    closeClassName,
    closeAriaLabel,
    cssModule,
    tag: Tag,
    color,
    isOpen,
    toggle,
    children,
    transition,
    fade,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$b);

  const classes = mapToCssModules(classNames(className, 'alert', `alert-${color}`, {
    'alert-dismissible': toggle
  }), cssModule);
  const closeClasses = mapToCssModules(classNames('btn-close', closeClassName), cssModule);

  const alertTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
    baseClass: fade ? transition.baseClass : '',
    timeout: fade ? transition.timeout : 0
  });

  return /*#__PURE__*/React.createElement(Fade, _extends({}, attributes, alertTransition, {
    tag: Tag,
    className: classes,
    in: isOpen,
    role: "alert",
    innerRef: innerRef
  }), toggle ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: closeClasses,
    "aria-label": closeAriaLabel,
    onClick: toggle
  }) : null, children);
}

Alert.propTypes = propTypes$c;
Alert.defaultProps = defaultProps$c;

const _excluded$a = ["className", "cssModule", "tag", "isOpen", "children", "transition", "fade", "innerRef"];
const propTypes$b = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  fade: PropTypes.bool,
  isOpen: PropTypes.bool,
  tag: tagPropType,
  transition: PropTypes.shape(Fade.propTypes),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$b = {
  isOpen: true,
  tag: 'div',
  fade: true,
  transition: _objectSpread2(_objectSpread2({}, Fade.defaultProps), {}, {
    unmountOnExit: true
  })
};

function Toast(props) {
  const {
    className,
    cssModule,
    tag: Tag,
    isOpen,
    children,
    transition,
    fade,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$a);

  const classes = mapToCssModules(classNames(className, 'toast'), cssModule);

  const toastTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
    baseClass: fade ? transition.baseClass : '',
    timeout: fade ? transition.timeout : 0
  });

  return /*#__PURE__*/React.createElement(Fade, _extends({}, attributes, toastTransition, {
    tag: Tag,
    className: classes,
    in: isOpen,
    role: "alert",
    innerRef: innerRef
  }), children);
}

Toast.propTypes = propTypes$b;
Toast.defaultProps = defaultProps$b;

const _excluded$9 = ["className", "cssModule", "innerRef", "tag"];
const propTypes$a = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$a = {
  tag: 'div'
};

const ToastBody = props => {
  const {
    className,
    cssModule,
    innerRef,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$9);

  const classes = mapToCssModules(classNames(className, 'toast-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
};

ToastBody.propTypes = propTypes$a;
ToastBody.defaultProps = defaultProps$a;
var ToastBody$1 = ToastBody;

const _excluded$8 = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "close", "tagClassName", "icon"];
const propTypes$9 = {
  tag: tagPropType,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  wrapTag: tagPropType,
  toggle: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  closeAriaLabel: PropTypes.string,
  charCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  close: PropTypes.object
};
const defaultProps$9 = {
  tag: 'strong',
  wrapTag: 'div',
  tagClassName: 'me-auto',
  closeAriaLabel: 'Close'
};

const ToastHeader = props => {
  let closeButton;
  let icon;

  const {
    className,
    cssModule,
    children,
    toggle,
    tag: Tag,
    wrapTag: WrapTag,
    closeAriaLabel,
    close,
    tagClassName,
    icon: iconProp
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$8);

  const classes = mapToCssModules(classNames(className, 'toast-header'), cssModule);

  if (!close && toggle) {
    closeButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: mapToCssModules('btn-close', cssModule),
      "aria-label": closeAriaLabel
    });
  }

  if (typeof iconProp === "string") {
    icon = /*#__PURE__*/React.createElement("svg", {
      className: mapToCssModules(`rounded text-${iconProp}`),
      width: "20",
      height: "20",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid slice",
      focusable: "false",
      role: "img"
    }, /*#__PURE__*/React.createElement("rect", {
      fill: "currentColor",
      width: "100%",
      height: "100%"
    }));
  } else if (iconProp) {
    icon = iconProp;
  }

  return /*#__PURE__*/React.createElement(WrapTag, _extends({}, attributes, {
    className: classes
  }), icon, /*#__PURE__*/React.createElement(Tag, {
    className: mapToCssModules(classNames(tagClassName, {
      "ms-2": icon != null
    }), cssModule)
  }, children), close || closeButton);
};

ToastHeader.propTypes = propTypes$9;
ToastHeader.defaultProps = defaultProps$9;
var ToastHeader$1 = ToastHeader;

const _excluded$7 = ["className", "cssModule", "tag", "active", "disabled", "action", "color"];
const propTypes$8 = {
  tag: tagPropType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  action: PropTypes.bool,
  className: PropTypes.any,
  cssModule: PropTypes.object
};
const defaultProps$8 = {
  tag: 'li'
};

const handleDisabledOnClick = e => {
  e.preventDefault();
};

const ListGroupItem = props => {
  const {
    className,
    cssModule,
    tag: Tag,
    active,
    disabled,
    action,
    color
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$7);

  const classes = mapToCssModules(classNames(className, active ? 'active' : false, disabled ? 'disabled' : false, action ? 'list-group-item-action' : false, color ? `list-group-item-${color}` : false, 'list-group-item'), cssModule); // Prevent click event when disabled.

  if (disabled) {
    attributes.onClick = handleDisabledOnClick;
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ListGroupItem.propTypes = propTypes$8;
ListGroupItem.defaultProps = defaultProps$8;
var ListGroupItem$1 = ListGroupItem;

const _excluded$6 = ["className", "cssModule", "tag"];
const propTypes$7 = {
  tag: tagPropType,
  className: PropTypes.any,
  cssModule: PropTypes.object
};
const defaultProps$7 = {
  tag: 'h5'
};

const ListGroupItemHeading = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$6);

  const classes = mapToCssModules(classNames(className, 'list-group-item-heading'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ListGroupItemHeading.propTypes = propTypes$7;
ListGroupItemHeading.defaultProps = defaultProps$7;
var ListGroupItemHeading$1 = ListGroupItemHeading;

const _excluded$5 = ["className", "cssModule", "tag"];
const propTypes$6 = {
  tag: tagPropType,
  className: PropTypes.any,
  cssModule: PropTypes.object
};
const defaultProps$6 = {
  tag: 'p'
};

const ListGroupItemText = props => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$5);

  const classes = mapToCssModules(classNames(className, 'list-group-item-text'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
};

ListGroupItemText.propTypes = propTypes$6;
ListGroupItemText.defaultProps = defaultProps$6;
var ListGroupItemText$1 = ListGroupItemText;

const _excluded$4 = ["className", "cssModule", "tag", "type"];
const propTypes$5 = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  type: PropTypes.string
};
const defaultProps$5 = {
  tag: 'ul'
};
const List = forwardRef((props, ref) => {
  const {
    className,
    cssModule,
    tag: Tag,
    type
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$4);

  const classes = mapToCssModules(classNames(className, type ? `list-${type}` : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: ref
  }));
});
List.name = 'List';
List.propTypes = propTypes$5;
List.defaultProps = defaultProps$5;
var List$1 = List;

const _excluded$3 = ["className", "cssModule", "tag"];
const propTypes$4 = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$4 = {
  tag: 'li'
};
const ListInlineItem = forwardRef((props, ref) => {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$3);

  const classes = mapToCssModules(classNames(className, 'list-inline-item'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: ref
  }));
});
ListInlineItem.name = 'ListInlineItem';
ListInlineItem.propTypes = propTypes$4;
ListInlineItem.defaultProps = defaultProps$4;
var ListInlineItem$1 = ListInlineItem;

class UncontrolledAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(Alert, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, this.props));
  }

}

var UncontrolledAlert$1 = UncontrolledAlert;

const omitKeys$3 = ['defaultOpen'];
class UncontrolledButtonDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.defaultOpen || false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(ButtonDropdown$1, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys$3)));
  }

}
UncontrolledButtonDropdown.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, ButtonDropdown$1.propTypes);

const omitKeys$2 = ['toggleEvents', 'defaultOpen'];
const propTypes$3 = {
  defaultOpen: PropTypes.bool,
  toggler: PropTypes.string.isRequired,
  toggleEvents: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps$3 = {
  toggleEvents: defaultToggleEvents
};

class UncontrolledCollapse extends Component {
  constructor(props) {
    super(props);
    this.togglers = null;
    this.removeEventListeners = null;
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: props.defaultOpen || false
    };
  }

  componentDidMount() {
    this.togglers = findDOMElements(this.props.toggler);

    if (this.togglers.length) {
      this.removeEventListeners = addMultipleEventListeners(this.togglers, this.toggle, this.props.toggleEvents);
    }
  }

  componentWillUnmount() {
    if (this.togglers.length && this.removeEventListeners) {
      this.removeEventListeners();
    }
  }

  toggle(e) {
    this.setState(({
      isOpen
    }) => ({
      isOpen: !isOpen
    }));
    e.preventDefault();
  }

  render() {
    return /*#__PURE__*/React.createElement(Collapse$1, _extends({
      isOpen: this.state.isOpen
    }, omit(this.props, omitKeys$2)));
  }

}

UncontrolledCollapse.propTypes = propTypes$3;
UncontrolledCollapse.defaultProps = defaultProps$3;
var UncontrolledCollapse$1 = UncontrolledCollapse;

const omitKeys$1 = ['defaultOpen'];
class UncontrolledDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.defaultOpen || false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    }, () => {
      if (this.props.onToggle) {
        this.props.onToggle(e, isOpen);
      }
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(Dropdown$1, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys$1)));
  }

}
UncontrolledDropdown.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func
}, Dropdown$1.propTypes);

const omitKeys = ['defaultOpen'];
class UncontrolledTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.defaultOpen || false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(Tooltip$1, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys)));
  }

}
UncontrolledTooltip.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, Tooltip$1.propTypes);

const _excluded$2 = ["className", "cssModule", "type", "size", "color", "children", "tag"];
const propTypes$2 = {
  tag: tagPropType,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.string
};
const defaultProps$2 = {
  tag: 'div',
  type: 'border',
  children: 'Loading...'
};

const Spinner = props => {
  const {
    className,
    cssModule,
    type,
    size,
    color,
    children,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$2);

  const classes = mapToCssModules(classNames(className, size ? `spinner-${type}-${size}` : false, `spinner-${type}`, color ? `text-${color}` : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    role: "status"
  }, attributes, {
    className: classes
  }), children && /*#__PURE__*/React.createElement("span", {
    className: mapToCssModules('visually-hidden', cssModule)
  }, children));
};

Spinner.propTypes = propTypes$2;
Spinner.defaultProps = defaultProps$2;
var Spinner$1 = Spinner;

const _excluded$1 = ["className", "cssModule", "color", "innerRef", "tag", "animation", "size", "widths"];

const propTypes$1 = _objectSpread2(_objectSpread2({}, Col$1.propTypes), {}, {
  color: PropTypes.string,
  tag: tagPropType,
  animation: PropTypes.oneOf(['glow', 'wave']),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  size: PropTypes.oneOf(['lg', 'sm', 'xs'])
});

const defaultProps$1 = {
  tag: 'span'
};

const Placeholder = props => {
  let {
    className,
    cssModule,
    color,
    innerRef,
    tag: Tag,
    animation,
    size,
    widths
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$1);

  let {
    attributes: modifiedAttributes,
    colClasses
  } = getColumnClasses(attributes, cssModule, widths);
  const classes = mapToCssModules(classNames(className, colClasses, 'placeholder' + (animation ? '-' + animation : ''), size ? 'placeholder-' + size : false, color ? 'bg-' + color : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, modifiedAttributes, {
    className: classes,
    ref: innerRef
  }));
};

Placeholder.propTypes = propTypes$1;
Placeholder.defaultProps = defaultProps$1;
var Placeholder$1 = Placeholder;

const _excluded = ["cssModule", "className", "tag"];
const propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  tag: tagPropType
};
const defaultProps = {
  color: 'primary',
  tag: Button
};

const PlaceholderButton = props => {
  let {
    cssModule,
    className,
    tag: Tag
  } = props,
      attributes = _objectWithoutProperties(props, _excluded);

  let {
    attributes: modifiedAttributes,
    colClasses
  } = getColumnClasses(attributes, cssModule);
  const classes = mapToCssModules(classNames("placeholder", className, colClasses), cssModule);
  return /*#__PURE__*/React.createElement(Button, _extends({}, modifiedAttributes, {
    className: classes,
    disabled: true
  }));
};

PlaceholderButton.propTypes = propTypes;
PlaceholderButton.defaultProps = defaultProps;
var PlaceholderButton$1 = PlaceholderButton;

(() => {
  if (typeof window !== 'object' || typeof window.CustomEvent === 'function') return;

  const CustomEvent = (event, params) => {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  window.CustomEvent = CustomEvent;
})();

(() => {
  if (typeof Object.values === 'function') return;

  const values = O => Object.keys(O).map(key => O[key]);

  Object.values = values;
})();

var polyfill = {
  __proto__: null
};

export { Accordion$1 as Accordion, AccordionBody$1 as AccordionBody, AccordionContext, AccordionHeader$1 as AccordionHeader, AccordionItem$1 as AccordionItem, Alert, Badge$1 as Badge, Breadcrumb$1 as Breadcrumb, BreadcrumbItem$1 as BreadcrumbItem, Button, ButtonDropdown$1 as ButtonDropdown, ButtonGroup$1 as ButtonGroup, ButtonToggle$1 as ButtonToggle, ButtonToolbar$1 as ButtonToolbar, Card$1 as Card, CardBody$1 as CardBody, CardColumns$1 as CardColumns, CardDeck$1 as CardDeck, CardFooter$1 as CardFooter, CardGroup$1 as CardGroup, CardHeader$1 as CardHeader, CardImg$1 as CardImg, CardImgOverlay$1 as CardImgOverlay, CardLink$1 as CardLink, CardSubtitle$1 as CardSubtitle, CardText$1 as CardText, CardTitle$1 as CardTitle, Carousel$1 as Carousel, CarouselCaption$1 as CarouselCaption, CarouselControl$1 as CarouselControl, CarouselIndicators$1 as CarouselIndicators, CarouselItem$1 as CarouselItem, CloseButton$1 as CloseButton, Col$1 as Col, Collapse$1 as Collapse, Container$1 as Container, Dropdown$1 as Dropdown, DropdownContext, DropdownItem$1 as DropdownItem, DropdownMenu$1 as DropdownMenu, DropdownToggle$1 as DropdownToggle, Fade, Form$1 as Form, FormFeedback$1 as FormFeedback, FormGroup$1 as FormGroup, FormText$1 as FormText, Input$1 as Input, InputGroup$1 as InputGroup, InputGroupText$1 as InputGroupText, Label$1 as Label, List$1 as List, ListGroup$1 as ListGroup, ListGroupItem$1 as ListGroupItem, ListGroupItemHeading$1 as ListGroupItemHeading, ListGroupItemText$1 as ListGroupItemText, ListInlineItem$1 as ListInlineItem, Media$1 as Media, Modal$1 as Modal, ModalBody$1 as ModalBody, ModalFooter$1 as ModalFooter, ModalHeader$1 as ModalHeader, Nav$1 as Nav, NavItem$1 as NavItem, NavLink$1 as NavLink, Navbar$1 as Navbar, NavbarBrand$1 as NavbarBrand, NavbarText$1 as NavbarText, NavbarToggler$1 as NavbarToggler, Offcanvas$1 as Offcanvas, OffcanvasBody$1 as OffcanvasBody, OffcanvasHeader$1 as OffcanvasHeader, Pagination$1 as Pagination, PaginationItem$1 as PaginationItem, PaginationLink$1 as PaginationLink, Placeholder$1 as Placeholder, PlaceholderButton$1 as PlaceholderButton, polyfill as Polyfill, Popover$1 as Popover, PopoverBody$1 as PopoverBody, PopoverHeader$1 as PopoverHeader, PopperContent$1 as PopperContent, PopperTargetHelper$1 as PopperTargetHelper, Progress$1 as Progress, Row$1 as Row, Spinner$1 as Spinner, TabContent$1 as TabContent, TabPane, Table$1 as Table, Toast, ToastBody$1 as ToastBody, ToastHeader$1 as ToastHeader, Tooltip$1 as Tooltip, UncontrolledAccordion$1 as UncontrolledAccordion, UncontrolledAlert$1 as UncontrolledAlert, UncontrolledButtonDropdown, UncontrolledCarousel$1 as UncontrolledCarousel, UncontrolledCollapse$1 as UncontrolledCollapse, UncontrolledDropdown, UncontrolledPopover, UncontrolledTooltip, utils as Util };
//# sourceMappingURL=reactstrap.modern.js.map
