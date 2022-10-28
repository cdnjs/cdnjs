import React, { useCallback, useState, useMemo, useContext, Component, forwardRef } from 'react';
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
  let {
    length
  } = pickKeys;
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
})]))]); // These are all setup to match what is in the bootstrap _variables.scss
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

function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
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
  }

  if (isArrayOrNodeList(els)) {
    return els[0];
  }

  return els;
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
const focusableElements = ['a[href]', 'area[href]', 'input:not([disabled]):not([type=hidden])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'object', 'embed', '[tabindex]:not(.modal):not(.offcanvas)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];

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
  isObject: isObject,
  toNumber: toNumber,
  isFunction: isFunction,
  findDOMElements: findDOMElements,
  isArrayOrNodeList: isArrayOrNodeList,
  getTarget: getTarget,
  defaultToggleEvents: defaultToggleEvents,
  addMultipleEventListeners: addMultipleEventListeners,
  focusableElements: focusableElements
};

const _excluded$1h = ["className", "cssModule", "fluid", "tag"];
const propTypes$1m = {
  tag: tagPropType,
  fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$1k = {
  tag: 'div'
};

function Container(props) {
  const {
    className,
    cssModule,
    fluid,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1h);

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
}

Container.propTypes = propTypes$1m;
Container.defaultProps = defaultProps$1k;

const _excluded$1g = ["className", "cssModule", "noGutters", "tag", "widths"];
const rowColWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const rowColsPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const propTypes$1l = {
  tag: tagPropType,
  noGutters: deprecated(PropTypes.bool, 'Please use Bootstrap 5 gutter utility classes. https://getbootstrap.com/docs/5.0/layout/gutters/'),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  xs: rowColsPropType,
  sm: rowColsPropType,
  md: rowColsPropType,
  lg: rowColsPropType,
  xl: rowColsPropType,
  xxl: rowColsPropType,
  widths: PropTypes.array
};
const defaultProps$1j = {
  tag: 'div',
  widths: rowColWidths
};

function Row(props) {
  const {
    className,
    cssModule,
    noGutters,
    tag: Tag,
    widths
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1g);

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
}

Row.propTypes = propTypes$1l;
Row.defaultProps = defaultProps$1j;

const _excluded$1f = ["className", "cssModule", "widths", "tag"];
const colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const stringOrNumberProp$1 = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps$1 = PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.shape({
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  order: stringOrNumberProp$1,
  offset: stringOrNumberProp$1
})]);
const propTypes$1k = {
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
const defaultProps$1i = {
  tag: 'div',
  widths: colWidths$1
};

const getColumnSizeClass$1 = (isXs, colWidth, colSize) => {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  }

  if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

const getColumnClasses = (attributes, cssModule, widths = colWidths$1) => {
  const modifiedAttributes = attributes;
  const colClasses = [];
  widths.forEach((colWidth, i) => {
    let columnProp = modifiedAttributes[colWidth];
    delete modifiedAttributes[colWidth];

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
    modifiedAttributes
  };
};

function Col(props) {
  const {
    className,
    cssModule,
    widths,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1f);

  let {
    modifiedAttributes,
    colClasses
  } = getColumnClasses(attributes, cssModule, widths);

  if (!colClasses.length) {
    colClasses.push('col');
  }

  const classes = mapToCssModules(classNames(className, colClasses), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, modifiedAttributes, {
    className: classes
  }));
}

Col.propTypes = propTypes$1k;
Col.defaultProps = defaultProps$1i;

const _excluded$1e = ["expand", "className", "cssModule", "light", "dark", "fixed", "sticky", "color", "container", "tag", "children"];
const propTypes$1j = {
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Theme the navbar by adding a background color  */
  color: PropTypes.string,

  /** Use any of the responsive containers to change how wide the content in your navbar is presented. */
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** This prop is passed if the background is dark, to make the text lighter */
  dark: PropTypes.bool,

  /** Determine if to show toggler button */
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /** Make the navbar fixed at the top */
  fixed: PropTypes.string,
  full: PropTypes.bool,

  /** Add `.navbar-light` class */
  light: PropTypes.bool,
  role: PropTypes.string,

  /** Use `position: sticky` which isn't fully supported in every browser */
  sticky: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$1h = {
  tag: 'nav',
  expand: false,
  container: 'fluid'
};

const getExpandClass = expand => {
  if (expand === false) {
    return false;
  }

  if (expand === true || expand === 'xs') {
    return 'navbar-expand';
  }

  return `navbar-expand-${expand}`;
};

function Navbar(props) {
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
        attributes = _objectWithoutProperties(props, _excluded$1e);

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
}

Navbar.propTypes = propTypes$1j;
Navbar.defaultProps = defaultProps$1h;

const _excluded$1d = ["className", "cssModule", "tag"];
const propTypes$1i = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$1g = {
  tag: 'a'
};

function NavbarBrand(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1d);

  const classes = mapToCssModules(classNames(className, 'navbar-brand'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

NavbarBrand.propTypes = propTypes$1i;
NavbarBrand.defaultProps = defaultProps$1g;

const _excluded$1c = ["className", "cssModule", "active", "tag"];
const propTypes$1h = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,
  active: PropTypes.bool
};
const defaultProps$1f = {
  tag: 'span'
};

function NavbarText(props) {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1c);

  const classes = mapToCssModules(classNames(className, 'navbar-text'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

NavbarText.propTypes = propTypes$1h;
NavbarText.defaultProps = defaultProps$1f;

const _excluded$1b = ["className", "cssModule", "children", "tag"];
const propTypes$1g = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,
  type: PropTypes.string,

  /** Pass children so this component can wrap the child elements */
  children: PropTypes.node
};
const defaultProps$1e = {
  tag: 'button',
  type: 'button'
};

function NavbarToggler(props) {
  const {
    className,
    cssModule,
    children,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$1b);

  const classes = mapToCssModules(classNames(className, 'navbar-toggler'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    "aria-label": "Toggle navigation"
  }, attributes, {
    className: classes
  }), children || /*#__PURE__*/React.createElement("span", {
    className: mapToCssModules('navbar-toggler-icon', cssModule)
  }));
}

NavbarToggler.propTypes = propTypes$1g;
NavbarToggler.defaultProps = defaultProps$1e;

const _excluded$1a = ["className", "cssModule", "tabs", "pills", "vertical", "horizontal", "justified", "fill", "navbar", "card", "tag"];
const propTypes$1f = {
  /** Adding card prop adds `.card-header-tabs` or `.card-header-pills` class */
  card: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** fills the nav to extend to full available width */
  fill: PropTypes.bool,

  /** Change the horizontal alignment of your nav */
  horizontal: PropTypes.oneOf(['center', 'end']),

  /**  All horizontal space will be occupied by nav links, but unlike the `fill` above, every nav item will be the same width. */
  justified: PropTypes.bool,

  /** Add navbar for a full-height and lightweight navigation */
  navbar: PropTypes.bool,

  /** Make NavItems look like pills */
  pills: PropTypes.bool,

  /** Make NavItems look like tabs */
  tabs: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Stack your navigation by changing the flex item direction */
  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
const defaultProps$1d = {
  tag: 'ul',
  vertical: false
};

const getVerticalClass = vertical => {
  if (vertical === false) {
    return false;
  }

  if (vertical === true || vertical === 'xs') {
    return 'flex-column';
  }

  return `flex-${vertical}-column`;
};

function Nav(props) {
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
        attributes = _objectWithoutProperties(props, _excluded$1a);

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
}

Nav.propTypes = propTypes$1f;
Nav.defaultProps = defaultProps$1d;

const _excluded$19 = ["className", "cssModule", "active", "tag"];
const propTypes$1e = {
  /** Add active class to element */
  active: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$1c = {
  tag: 'li'
};

function NavItem(props) {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$19);

  const classes = mapToCssModules(classNames(className, 'nav-item', active ? 'active' : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

NavItem.propTypes = propTypes$1e;
NavItem.defaultProps = defaultProps$1c;

const _excluded$18 = ["className", "cssModule", "active", "tag", "innerRef"];
const propTypes$1d = {
  /** Add active class to NavLink */
  active: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Disable the link */
  disabled: PropTypes.bool,
  href: PropTypes.any,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),

  /** Function to be triggered on click */
  onClick: PropTypes.func,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$1b = {
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
        attributes = _objectWithoutProperties(_this$props, _excluded$18);

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

NavLink.propTypes = propTypes$1d;
NavLink.defaultProps = defaultProps$1b;
var NavLink$1 = NavLink;

const _excluded$17 = ["className", "listClassName", "cssModule", "children", "tag", "listTag", "aria-label"];
const propTypes$1c = {
  /** Aria label */
  'aria-label': PropTypes.string,

  /** Pass children so this component can wrap them */
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Add custom class to list tag */
  listClassName: PropTypes.string,

  /** Set a custom element for list tag */
  listTag: tagPropType,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$1a = {
  tag: 'nav',
  listTag: 'ol',
  'aria-label': 'breadcrumb'
};

function Breadcrumb(props) {
  const {
    className,
    listClassName,
    cssModule,
    children,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$17);

  const classes = mapToCssModules(classNames(className), cssModule);
  const listClasses = mapToCssModules(classNames('breadcrumb', listClassName), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    "aria-label": label
  }), /*#__PURE__*/React.createElement(ListTag, {
    className: listClasses
  }, children));
}

Breadcrumb.propTypes = propTypes$1c;
Breadcrumb.defaultProps = defaultProps$1a;

const _excluded$16 = ["className", "cssModule", "active", "tag"];
const propTypes$1b = {
  /** Adds a visual "active" state to a Breadcrumb Item */
  active: PropTypes.bool,

  /** Add custom class to the element */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$19 = {
  tag: 'li'
};

function BreadcrumbItem(props) {
  const {
    className,
    cssModule,
    active,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$16);

  const classes = mapToCssModules(classNames(className, active ? 'active' : false, 'breadcrumb-item'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    "aria-current": active ? 'page' : undefined
  }));
}

BreadcrumbItem.propTypes = propTypes$1b;
BreadcrumbItem.defaultProps = defaultProps$19;

const _excluded$15 = ["className", "cssModule", "variant", "innerRef"];
const propTypes$1a = {
  /** Disable the button if needed */
  active: PropTypes.bool,

  /** Aria label */
  'aria-label': PropTypes.string,

  /** Function to be triggered on click */
  onClick: PropTypes.func,

  /** Change the variant to white */
  variant: PropTypes.oneOf(['white']),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$18 = {
  'aria-label': 'close'
};

function CloseButton(props) {
  const {
    className,
    cssModule,
    variant,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$15);

  const classes = mapToCssModules(classNames(className, 'btn-close', variant && `btn-close-${variant}`));
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: innerRef,
    type: "button",
    className: classes
  }, attributes));
}

CloseButton.propTypes = propTypes$1a;
CloseButton.defaultProps = defaultProps$18;

const _excluded$14 = ["active", "aria-label", "block", "className", "close", "cssModule", "color", "outline", "size", "tag", "innerRef"];
const propTypes$19 = {
  /** Manually set the visual state of the button to active */
  active: PropTypes.bool,

  /** Aria label */
  'aria-label': PropTypes.string,
  block: PropTypes.bool,

  /** Pass children so this component can wrap them */
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Use the button as a close button */
  close: PropTypes.bool,

  /** Change color of Button to one of the available colors */
  color: PropTypes.string,

  /** Disables the button */
  disabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),

  /** Function to be triggered on click */
  onClick: PropTypes.func,

  /** Adds outline to the button */
  outline: PropTypes.bool,

  /** Make the button bigger or smaller */
  size: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$17 = {
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
      attributes = _objectWithoutProperties(props, _excluded$14);

  if (close) {
    return /*#__PURE__*/React.createElement(CloseButton, attributes);
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

Button.propTypes = propTypes$19;
Button.defaultProps = defaultProps$17;

const _excluded$13 = ["className"];
const propTypes$18 = {
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  defaultValue: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$16 = {
  defaultValue: false
};

function ButtonToggle(props) {
  const [toggled, setToggled] = useState(props.defaultValue);
  const [focus, setFocus] = useState(false);
  const onBlur = useCallback(e => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setFocus(false);
  }, [props.onBlur]);
  const onFocus = useCallback(e => {
    if (props.onFocus) {
      props.onFocus(e);
    }

    setFocus(true);
  }, [props.onFocus]);
  const onClick = useCallback(e => {
    if (props.onClick) {
      props.onClick(e);
    }

    setToggled(!toggled);
  }, [props.onClick]);

  const {
    className
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$13);

  const classes = mapToCssModules(classNames(className, {
    focus: focus
  }), props.cssModule);
  return /*#__PURE__*/React.createElement(Button, _extends({
    active: toggled,
    onBlur: onBlur,
    onFocus: onFocus,
    onClick: onClick,
    className: classes
  }, attributes));
}

ButtonToggle.propTypes = propTypes$18;
ButtonToggle.defaultProps = defaultProps$16;

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

const InputGroupContext = React.createContext({});

const _excluded$12 = ["className", "cssModule", "direction", "isOpen", "group", "size", "nav", "setActiveFromChild", "active", "tag", "menuRole"];
const propTypes$17 = {
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
  dropup: PropTypes.bool,
  inNavbar: PropTypes.bool,
  setActiveFromChild: PropTypes.bool,
  menuRole: PropTypes.oneOf(['listbox', 'menu'])
};
const defaultProps$15 = {
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
    this.handleToggleRef = this.handleToggleRef.bind(this);
    this.containerRef = React.createRef();
    this.menuRef = React.createRef();
    this.toggleRef = React.createRef(); // ref for DropdownToggle
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

  handleMenuRef(menuRef) {
    this.menuRef.current = menuRef;
  }

  handleToggleRef(toggleRef) {
    this.toggleRef.current = toggleRef;
  }

  handleDocumentClick(e) {
    if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
    const container = this.getContainer();
    const menu = this.getMenu();
    const toggle = this.getToggle();
    const targetIsToggle = e.target === toggle;
    const clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;
    let clickIsInInput = false;

    if (container) {
      // this is only for InputGroup with type dropdown
      clickIsInInput = container.classList.contains('input-group') && container.classList.contains('dropdown') && e.target.tagName === 'INPUT';
    }

    if ((targetIsToggle && !clickIsInInput || clickIsInMenu) && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
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
      onToggleRef: this.handleToggleRef,
      menuRole: this.props.menuRole
    };
  }

  getContainer() {
    return this.containerRef.current;
  }

  getMenu() {
    return this.menuRef.current;
  }

  getToggle() {
    return this.toggleRef.current;
  }

  getMenuCtrl() {
    if (this._$menuCtrl) return this._$menuCtrl;
    this._$menuCtrl = this.getToggle();
    return this._$menuCtrl;
  }

  getItemType() {
    if (this.props.menuRole === 'listbox') {
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
          attrs = _objectWithoutProperties(_omit, _excluded$12);

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

    if (this.context.insideInputGroup) {
      return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
        value: this.getContextValue()
      }, /*#__PURE__*/React.createElement(Manager, null, React.Children.map(this.props.children, child => React.cloneElement(child, {
        onKeyDown: this.handleKeyDown
      }))));
    }

    return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
      value: this.getContextValue()
    }, /*#__PURE__*/React.createElement(Manager, null, /*#__PURE__*/React.createElement(Tag, _extends({}, attrs, {
      [typeof Tag === 'string' ? 'ref' : 'innerRef']: this.containerRef,
      onKeyDown: this.handleKeyDown,
      className: classes
    }))));
  }

}

Dropdown.propTypes = propTypes$17;
Dropdown.defaultProps = defaultProps$15;
Dropdown.contextType = InputGroupContext;
var Dropdown$1 = Dropdown;

const propTypes$16 = {
  children: PropTypes.node
};

function ButtonDropdown(props) {
  return /*#__PURE__*/React.createElement(Dropdown$1, _extends({
    group: true
  }, props));
}

ButtonDropdown.propTypes = propTypes$16;

const _excluded$11 = ["className", "cssModule", "size", "vertical", "tag"];
const propTypes$15 = {
  /** Aria label */
  'aria-label': PropTypes.string,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** In order for assistive technologies (such as screen readers) to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. For button groups, this would be role="group", while toolbars should have a role="toolbar". */
  role: PropTypes.string,

  /** Make the button bigger or smaller */
  size: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Make button group vertical */
  vertical: PropTypes.bool
};
const defaultProps$14 = {
  tag: 'div',
  role: 'group'
};

function ButtonGroup(props) {
  const {
    className,
    cssModule,
    size,
    vertical,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$11);

  const classes = mapToCssModules(classNames(className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

ButtonGroup.propTypes = propTypes$15;
ButtonGroup.defaultProps = defaultProps$14;

const _excluded$10 = ["className", "cssModule", "tag"];
const propTypes$14 = {
  /** Aria label */
  'aria-label': PropTypes.string,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** In order for assistive technologies (such as screen readers) to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. For button groups, this would be role="group", while toolbars should have a role="toolbar". */
  role: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$13 = {
  tag: 'div',
  role: 'toolbar'
};

function ButtonToolbar(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$10);

  const classes = mapToCssModules(classNames(className, 'btn-toolbar'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

ButtonToolbar.propTypes = propTypes$14;
ButtonToolbar.defaultProps = defaultProps$13;

const _excluded$$ = ["className", "cssModule", "divider", "tag", "header", "active", "text"];
const propTypes$13 = {
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
const defaultProps$12 = {
  tag: 'button',
  toggle: true
};

class DropdownItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getTabIndex = this.getTabIndex.bind(this);
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

  getRole() {
    if (this.context.menuRole === 'listbox') {
      return 'option';
    }

    return 'menuitem';
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
        props = _objectWithoutProperties(_omit, _excluded$$);

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

DropdownItem.propTypes = propTypes$13;
DropdownItem.defaultProps = defaultProps$12;
DropdownItem.contextType = DropdownContext;
var DropdownItem$1 = DropdownItem;

const _excluded$_ = ["className", "cssModule", "dark", "end", "right", "tag", "flip", "modifiers", "persist", "strategy", "container", "updateOnSelect"];
const propTypes$12 = {
  tag: tagPropType,
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  end: PropTypes.bool,

  /** Flips the menu to the opposite side if there is not enough space to fit */
  flip: PropTypes.bool,
  modifiers: PropTypes.array,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  style: PropTypes.object,
  persist: PropTypes.bool,
  strategy: PropTypes.string,
  container: targetPropType,

  /** Update popper layout when a click event comes up. This leverages event bubbling. */
  updateOnSelect: PropTypes.bool,
  right: deprecated(PropTypes.bool, 'Please use "end" instead.')
};
const defaultProps$11 = {
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
          attrs = _objectWithoutProperties(_this$props, _excluded$_);

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
      }

      return popper;
    }

    const {
      onMenuRef
    } = this.context;
    return /*#__PURE__*/React.createElement(Tag, _extends({
      tabIndex: "-1",
      role: this.getRole()
    }, attrs, {
      ref: onMenuRef,
      "aria-hidden": !this.context.isOpen,
      className: classes,
      "data-popper-placement": attrs.placement
    }));
  }

}

DropdownMenu.propTypes = propTypes$12;
DropdownMenu.defaultProps = defaultProps$11;
DropdownMenu.contextType = DropdownContext;
var DropdownMenu$1 = DropdownMenu;

const _excluded$Z = ["className", "color", "cssModule", "caret", "split", "nav", "tag", "innerRef"];
const propTypes$11 = {
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
  nav: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
const defaultProps$10 = {
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
          props = _objectWithoutProperties(_this$props, _excluded$Z);

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
        ref: this.context.onToggleRef,
        "aria-expanded": this.context.isOpen,
        "aria-haspopup": this.getRole(),
        children: children
      }));
    }

    return /*#__PURE__*/React.createElement(Reference, {
      innerRef: innerRef
    }, ({
      ref
    }) => {
      const handleRef = tagRef => {
        ref(tagRef);
        const {
          onToggleRef
        } = this.context;
        if (onToggleRef) onToggleRef(tagRef);
      };

      return /*#__PURE__*/React.createElement(Tag, _extends({}, props, {
        [typeof Tag === 'string' ? 'ref' : 'innerRef']: handleRef,
        className: classes,
        onClick: this.onClick,
        "aria-expanded": this.context.isOpen,
        "aria-haspopup": this.getRole(),
        children: children
      }));
    });
  }

}

DropdownToggle.propTypes = propTypes$11;
DropdownToggle.defaultProps = defaultProps$10;
DropdownToggle.contextType = DropdownContext;
var DropdownToggle$1 = DropdownToggle;

const _excluded$Y = ["tag", "baseClass", "baseClassActive", "className", "cssModule", "children", "innerRef"];

const propTypes$10 = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: tagPropType,
  baseClass: PropTypes.string,
  baseClassActive: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
});

const defaultProps$$ = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
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
        otherProps = _objectWithoutProperties(props, _excluded$Y);

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

Fade.propTypes = propTypes$10;
Fade.defaultProps = defaultProps$$;

/**
 * AccordionContext
 * {
 *  toggle: PropTypes.func.isRequired,
 *  openId: PropTypes.string,
 * }
 */

const AccordionContext = React.createContext({});

const _excluded$X = ["flush", "open", "toggle", "className", "cssModule", "tag", "innerRef"];
const propTypes$$ = {
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Render accordions edge-to-edge with their parent container */
  flush: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** The current active key that corresponds to the currently expanded card */
  open: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Function that's triggered on clicking `AccordionHeader` */
  toggle: PropTypes.func.isRequired
};
const defaultProps$_ = {
  tag: 'div'
};

function Accordion(props) {
  const {
    flush,
    open,
    toggle,
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$X);

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
}

Accordion.propTypes = propTypes$$;
Accordion.defaultProps = defaultProps$_;

const _excluded$W = ["defaultOpen", "stayOpen"];
const propTypes$_ = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  defaultOpen: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  stayOpen: PropTypes.bool
};
const defaultProps$Z = {
  tag: 'div'
};

function UncontrolledAccordion(_ref) {
  let {
    defaultOpen,
    stayOpen
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$W);

  const [open, setOpen] = useState(defaultOpen || (stayOpen ? [] : undefined));

  const toggle = id => {
    if (stayOpen) {
      if (open.includes(id)) {
        setOpen(open.filter(accordionId => accordionId !== id));
      } else {
        setOpen([...open, id]);
      }
    } else if (open === id) {
      setOpen(undefined);
    } else {
      setOpen(id);
    }
  };

  return /*#__PURE__*/React.createElement(Accordion, _extends({}, props, {
    open: open,
    toggle: toggle
  }));
}

UncontrolledAccordion.propTypes = propTypes$_;
UncontrolledAccordion.defaultProps = defaultProps$Z;

const _excluded$V = ["className", "cssModule", "tag", "innerRef", "children", "targetId"];
const propTypes$Z = {
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing base class name with a new class name */
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Unique key used to control item's collapse/expand */
  targetId: PropTypes.string.isRequired
};
const defaultProps$Y = {
  tag: 'h2'
};

function AccordionHeader(props) {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef,
    children,
    targetId
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$V);

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
}

AccordionHeader.propTypes = propTypes$Z;
AccordionHeader.defaultProps = defaultProps$Y;

const _excluded$U = ["className", "cssModule", "tag", "innerRef"];
const propTypes$Y = {
  children: PropTypes.node,

  /** To add custom class */
  className: PropTypes.string,

  /** Change existing base class name with a new class name */
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$X = {
  tag: 'div'
};

function AccordionItem(props) {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$U);

  const classes = mapToCssModules(classNames(className, 'accordion-item'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
}

AccordionItem.propTypes = propTypes$Y;
AccordionItem.defaultProps = defaultProps$X;

const _excluded$T = ["tag", "horizontal", "isOpen", "className", "navbar", "cssModule", "children", "innerRef"];

const propTypes$X = _objectSpread2(_objectSpread2({}, Transition.propTypes), {}, {
  /** Make content animation appear horizontally */
  horizontal: PropTypes.bool,

  /** Set if Collapse is open or closed */
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Add custom class */
  className: PropTypes.node,
  navbar: PropTypes.bool,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,
  innerRef: PropTypes.shape({
    current: PropTypes.object
  })
});

const defaultProps$W = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
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
    this.nodeRef = props.innerRef || React.createRef();
    ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(name => {
      this[name] = this[name].bind(this);
    });
  }

  onEntering(_, isAppearing) {
    const node = this.getNode();
    this.setState({
      dimension: this.getDimension(node)
    });
    this.props.onEntering(node, isAppearing);
  }

  onEntered(_, isAppearing) {
    const node = this.getNode();
    this.setState({
      dimension: null
    });
    this.props.onEntered(node, isAppearing);
  }

  onExit() {
    const node = this.getNode();
    this.setState({
      dimension: this.getDimension(node)
    });
    this.props.onExit(node);
  }

  onExiting() {
    const node = this.getNode(); // getting this variable triggers a reflow

    this.getDimension(node); // eslint-disable-line no-unused-vars


    this.setState({
      dimension: 0
    });
    this.props.onExiting(node);
  }

  onExited() {
    const node = this.getNode();
    this.setState({
      dimension: null
    });
    this.props.onExited(node);
  }

  getNode() {
    return this.nodeRef.current;
  }

  getDimension(node) {
    return this.props.horizontal ? node.scrollWidth : node.scrollHeight;
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
          otherProps = _objectWithoutProperties(_this$props, _excluded$T);

    const {
      dimension
    } = this.state;
    const transitionProps = pick(otherProps, TransitionPropTypeKeys);
    const childProps = omit(otherProps, TransitionPropTypeKeys);
    return /*#__PURE__*/React.createElement(Transition, _extends({}, transitionProps, {
      in: isOpen,
      nodeRef: this.nodeRef,
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
        ref: this.nodeRef
      }), children);
    });
  }

}

Collapse.propTypes = propTypes$X;
Collapse.defaultProps = defaultProps$W;
var Collapse$1 = Collapse;

const _excluded$S = ["className", "cssModule", "tag", "innerRef", "children", "accordionId"];
const propTypes$W = {
  /** Unique key used to control item's collapse/expand */
  accordionId: PropTypes.string.isRequired,

  /** To add custom class */
  className: PropTypes.string,
  children: PropTypes.node,

  /** Change existing base class name with a new class name */
  cssModule: PropTypes.object,

  /** Pass ref to the component */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$V = {
  tag: 'div'
};

function AccordionBody(props) {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef,
    children,
    accordionId
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$S);

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
}

AccordionBody.propTypes = propTypes$W;
AccordionBody.defaultProps = defaultProps$V;

const _excluded$R = ["className", "cssModule", "color", "innerRef", "pill", "tag"];
const propTypes$V = {
  /** Pass children so this component can wrap the child elements */
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change background color of Badge */
  color: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),

  /** Add rounded corners to the Badge */
  pill: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$U = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

function Badge(props) {
  let {
    className,
    cssModule,
    color,
    innerRef,
    pill,
    tag: Tag
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$R);

  const classes = mapToCssModules(classNames(className, 'badge', 'bg-' + color, pill ? 'rounded-pill' : false), cssModule);

  if (attributes.href && Tag === 'span') {
    Tag = 'a';
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
}

Badge.propTypes = propTypes$V;
Badge.defaultProps = defaultProps$U;

const _excluded$Q = ["className", "cssModule", "color", "body", "inverse", "outline", "tag", "innerRef"];
const propTypes$U = {
  /** Toggles card padding using `.card-body` */
  body: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change background color of component */
  color: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Inverts the color */
  inverse: PropTypes.bool,

  /** Changes the card to have only outline */
  outline: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$T = {
  tag: 'div'
};

function Card(props) {
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
        attributes = _objectWithoutProperties(props, _excluded$Q);

  const classes = mapToCssModules(classNames(className, 'card', inverse ? 'text-white' : false, body ? 'card-body' : false, color ? `${outline ? 'border' : 'bg'}-${color}` : false), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
}

Card.propTypes = propTypes$U;
Card.defaultProps = defaultProps$T;

const _excluded$P = ["className", "cssModule", "tag"];
const propTypes$T = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$S = {
  tag: 'div'
};

function CardGroup(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$P);

  const classes = mapToCssModules(classNames(className, 'card-group'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardGroup.propTypes = propTypes$T;
CardGroup.defaultProps = defaultProps$S;

const _excluded$O = ["className", "cssModule", "tag"];
const propTypes$S = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$R = {
  tag: 'div'
};

function CardDeck(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$O);

  const classes = mapToCssModules(classNames(className, 'card-deck'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardDeck.propTypes = propTypes$S;
CardDeck.defaultProps = defaultProps$R;

const _excluded$N = ["className", "cssModule", "tag"];
const propTypes$R = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$Q = {
  tag: 'div'
};

function CardColumns(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$N);

  const classes = mapToCssModules(classNames(className, 'card-columns'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardColumns.propTypes = propTypes$R;
CardColumns.defaultProps = defaultProps$Q;

const _excluded$M = ["className", "cssModule", "innerRef", "tag"];
const propTypes$Q = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$P = {
  tag: 'div'
};

function CardBody(props) {
  const {
    className,
    cssModule,
    innerRef,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$M);

  const classes = mapToCssModules(classNames(className, 'card-body'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes,
    ref: innerRef
  }));
}

CardBody.propTypes = propTypes$Q;
CardBody.defaultProps = defaultProps$P;

const _excluded$L = ["className", "cssModule", "tag", "innerRef"];
const propTypes$P = {
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$O = {
  tag: 'a'
};

function CardLink(props) {
  const {
    className,
    cssModule,
    tag: Tag,
    innerRef
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$L);

  const classes = mapToCssModules(classNames(className, 'card-link'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    ref: innerRef,
    className: classes
  }));
}

CardLink.propTypes = propTypes$P;
CardLink.defaultProps = defaultProps$O;

const _excluded$K = ["className", "cssModule", "tag"];
const propTypes$O = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$N = {
  tag: 'div'
};

function CardFooter(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$K);

  const classes = mapToCssModules(classNames(className, 'card-footer'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardFooter.propTypes = propTypes$O;
CardFooter.defaultProps = defaultProps$N;

const _excluded$J = ["className", "cssModule", "tag"];
const propTypes$N = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$M = {
  tag: 'div'
};

function CardHeader(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$J);

  const classes = mapToCssModules(classNames(className, 'card-header'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardHeader.propTypes = propTypes$N;
CardHeader.defaultProps = defaultProps$M;

const _excluded$I = ["className", "cssModule", "top", "bottom", "tag"];
const propTypes$M = {
  /** Add `bottom` prop if image is at bottom of card */
  bottom: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Add `top` prop if image is at top of card */
  top: PropTypes.bool
};
const defaultProps$L = {
  tag: 'img'
};

function CardImg(props) {
  const {
    className,
    cssModule,
    top,
    bottom,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$I);

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
}

CardImg.propTypes = propTypes$M;
CardImg.defaultProps = defaultProps$L;

const _excluded$H = ["className", "cssModule", "tag"];
const propTypes$L = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$K = {
  tag: 'div'
};

function CardImgOverlay(props) {
  const {
    className,
    cssModule,
    tag: Tag
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$H);

  const classes = mapToCssModules(classNames(className, 'card-img-overlay'), cssModule);
  return /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  }));
}

CardImgOverlay.propTypes = propTypes$L;
CardImgOverlay.defaultProps = defaultProps$K;

/**
 * CarouselContext
 * {
 *  direction: PropTypes.oneOf(['start', 'end']).isRequired,
 * }
 */

const CarouselContext = React.createContext({});

const _excluded$G = ["in", "children", "cssModule", "slide", "tag", "className"];

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
    const {
      offsetHeight
    } = node;
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
          transitionProps = _objectWithoutProperties(_this$props, _excluded$G);

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
  /** Set a custom element for this component */
  tag: tagPropType,
  in: PropTypes.bool,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,
  children: PropTypes.node,

  /** Enable/disable animation */
  slide: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string
});
CarouselItem.defaultProps = _objectSpread2(_objectSpread2({}, Transition.defaultProps), {}, {
  tag: 'div',
  timeout: TransitionTimeouts.Carousel,
  slide: true
});
CarouselItem.contextType = CarouselContext;
var CarouselItem$1 = CarouselItem;

const SWIPE_THRESHOLD = 40;
const propTypes$K = {
  /** the current active slide of the carousel */
  activeIndex: PropTypes.number,

  /** a function which should advance the carousel to the next slide (via activeIndex) */
  next: PropTypes.func.isRequired,

  /** a function which should advance the carousel to the previous slide (via activeIndex) */
  previous: PropTypes.func.isRequired,

  /** controls if the left and right arrow keys should control the carousel */
  keyboard: PropTypes.bool,

  /** If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
   * mouseleave. If set to false, hovering over the carousel won't pause it.
   */
  pause: PropTypes.oneOf(['hover', false]),

  /** Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load. */
  ride: PropTypes.oneOf(['carousel']),

  /** the interval at which the carousel automatically cycles */
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  children: PropTypes.array,

  /** called when the mouse enters the Carousel */
  mouseEnter: PropTypes.func,

  /** called when the mouse exits the Carousel */
  mouseLeave: PropTypes.func,

  /** controls whether the slide animation on the Carousel works or not */
  slide: PropTypes.bool,

  /** make the controls, indicators and captions dark on the Carousel */
  dark: PropTypes.bool,
  fade: PropTypes.bool,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Add custom class */
  className: PropTypes.string,

  /** Enable touch support */
  enableTouch: PropTypes.bool
};
const propsToOmit$2 = Object.keys(propTypes$K);
const defaultProps$J = {
  interval: 5000,
  pause: 'hover',
  keyboard: true,
  slide: true,
  enableTouch: true,
  fade: false
};

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
    this.setInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
    document.removeEventListener('keyup', this.handleKeyPress);
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

  getContextValue() {
    return {
      direction: this.state.direction
    };
  }

  setInterval() {
    // make sure not to have multiple intervals going...
    this.clearInterval();

    if (this.props.interval) {
      this.cycleInterval = setInterval(() => {
        this.props.next();
      }, parseInt(this.props.interval, 10));
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
    const attributes = omit(this.props, propsToOmit$2);
    const outerClasses = mapToCssModules(classNames(className, 'carousel', fade && 'carousel-fade', slide && 'slide', dark && 'carousel-dark'), cssModule);
    const innerClasses = mapToCssModules(classNames('carousel-inner'), cssModule); // filter out booleans, null, or undefined

    const children = this.props.children.filter(child => child !== null && child !== undefined && typeof child !== 'boolean');
    const slidesOnly = children.every(child => child.type === CarouselItem$1); // Rendering only slides

    if (slidesOnly) {
      return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd
      }), /*#__PURE__*/React.createElement(CarouselContext.Provider, {
        value: this.getContextValue()
      }, this.renderItems(children, innerClasses)));
    } // Rendering slides and controls


    if (children[0] instanceof Array) {
      const _carouselItems = children[0];
      const _controlLeft = children[1];
      const _controlRight = children[2];
      return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd
      }), /*#__PURE__*/React.createElement(CarouselContext.Provider, {
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
    return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
      className: outerClasses,
      onMouseEnter: this.hoverStart,
      onMouseLeave: this.hoverEnd,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd
    }), /*#__PURE__*/React.createElement(CarouselContext.Provider, {
      value: this.getContextValue()
    }, wrappedIndicators, this.renderItems(carouselItems, innerClasses), controlLeft, controlRight));
  }

}

Carousel.propTypes = propTypes$K;
Carousel.defaultProps = defaultProps$J;
var Carousel$1 = Carousel;

const _excluded$F = ["direction", "onClickHandler", "cssModule", "directionText", "className"];

function CarouselControl(props) {
  const {
    direction,
    onClickHandler,
    cssModule,
    directionText,
    className
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$F);

  const anchorClasses = mapToCssModules(classNames(className, `carousel-control-${direction}`), cssModule);
  const iconClasses = mapToCssModules(classNames(`carousel-control-${direction}-icon`), cssModule);
  const screenReaderClasses = mapToCssModules(classNames('visually-hidden'), cssModule);
  return (
    /*#__PURE__*/
    // We need to disable this linting rule to use an `<a>` instead of
    // `<button>` because that's what the Bootstrap examples require:
    // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    React.createElement("a", _extends({}, attributes, {
      className: anchorClasses,
      style: {
        cursor: 'pointer'
      },
      role: "button",
      tabIndex: "0",
      onClick: e => {
        e.preventDefault();
        onClickHandler();
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: iconClasses,
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: screenReaderClasses
    }, directionText || direction))
  );
}

CarouselControl.propTypes = {
  /** Set the direction of control button */
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,

  /** Function to be triggered on click */
  onClickHandler: PropTypes.func.isRequired,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Screen reader text */
  directionText: PropTypes.string,

  /** Add custom class */
  className: PropTypes.string
};

const _excluded$E = ["items", "activeIndex", "cssModule", "onClickHandler", "className"];

function CarouselIndicators(props) {
  const {
    items,
    activeIndex,
    cssModule,
    onClickHandler,
    className
  } = props,
        attributes = _objectWithoutProperties(props, _excluded$E);

  const listClasses = mapToCssModules(classNames(className, 'carousel-indicators'), cssModule);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = mapToCssModules(classNames({
      active: activeIndex === idx
    }), cssModule);
    return /*#__PURE__*/React.createElement("button", {
      "aria-label": item.caption,
      "data-bs-target": true,
      type: "button",
      key: `${item.key || Object.values(item).join('')}`,
      onClick: e => {
        e.preventDefault();
        onClickHandler(idx);
      },
      className: indicatorClasses
    });
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: listClasses
  }, attributes), indicators);
}

CarouselIndicators.propTypes = {
  /** The current active index */
  activeIndex: PropTypes.number.isRequired,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Array of items to show */
  items: PropTypes.array.isRequired,

  /** Function to be triggered on click */
  onClickHandler: PropTypes.func.isRequired
};

function CarouselCaption(props) {
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
}

CarouselCaption.propTypes = {
  /** Heading for the caption */
  captionHeader: PropTypes.node,

  /** Text for caption */
  captionText: PropTypes.node.isRequired,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object
};

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
    this.setState(prevState => {
      const nextIndex = prevState.activeIndex === this.props.items.length - 1 ? 0 : prevState.activeIndex + 1;
      return {
        activeIndex: nextIndex
      };
    });
  }

  previous() {
    if (this.animating) return;
    this.setState(prevState => {
      const nextIndex = prevState.activeIndex === 0 ? this.props.items.length - 1 : prevState.activeIndex - 1;
      return {
        activeIndex: nextIndex
      };
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
      }), /*#__PURE__*/React.createElement(CarouselCaption, {
        captionText: item.caption,
        captionHeader: item.header || item.caption
      }));
    });
    return /*#__PURE__*/React.createElement(Carousel$1, _extends({
      activeIndex: activeIndex,
      next: this.next,
      previous: this.previous,
      ride: autoPlay ? 'carousel' : undefined
    }, props), indicators && /*#__PURE__*/React.createElement(CarouselIndicators, {
      items: items,
      activeIndex: props.activeIndex || activeIndex,
      onClickHandler: goToIndex || this.goToIndex
    }), slides, controls && /*#__PURE__*/React.createElement(CarouselControl, {
      direction: "prev",
      directionText: "Previous",
      onClickHandler: props.previous || this.previous
    }), controls && /*#__PURE__*/React.createElement(CarouselControl, {
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
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$I = {
  tag: 'div'
};

function CardSubtitle(props) {
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
}

CardSubtitle.propTypes = propTypes$I;
CardSubtitle.defaultProps = defaultProps$I;

const _excluded$B = ["className", "cssModule", "tag"];
const propTypes$H = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$H = {
  tag: 'p'
};

function CardText(props) {
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
}

CardText.propTypes = propTypes$H;
CardText.defaultProps = defaultProps$H;

const _excluded$A = ["className", "cssModule", "tag"];
const propTypes$G = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$G = {
  tag: 'div'
};

function CardTitle(props) {
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
}

CardTitle.propTypes = propTypes$G;
CardTitle.defaultProps = defaultProps$G;

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
  isOpen: PropTypes.bool,
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
    }

    return null;
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus();
    }
  }

  onClosed() {
    this.props.onClosed();
    this.setState({
      isOpen: false
    });
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

  setTargetNode(node) {
    this.targetNode = typeof node === 'string' ? getTarget(node) : node;
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

function PopperTargetHelper(props, context) {
  context.popperManager.setTargetNode(getTarget(props.target));
  return null;
}

PopperTargetHelper.contextTypes = {
  popperManager: PropTypes.object.isRequired
};
PopperTargetHelper.propTypes = {
  target: targetPropType.isRequired
};

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
    }

    return null;
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

function Popover(props) {
  const popperClasses = classNames('popover', 'show', props.popperClassName);
  const classes = classNames('popover-inner', props.innerClassName);
  return /*#__PURE__*/React.createElement(TooltipPopoverWrapper$1, _extends({}, props, {
    arrowClassName: "popover-arrow",
    popperClassName: popperClasses,
    innerClassName: classes
  }));
}

Popover.propTypes = propTypes$E;
Popover.defaultProps = defaultProps$D;

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
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement(Popover, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys$4)));
  }

}
UncontrolledPopover.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, Popover.propTypes);

const _excluded$y = ["className", "cssModule", "tag"];
const propTypes$D = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$C = {
  tag: 'h3'
};

function PopoverHeader(props) {
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
}

PopoverHeader.propTypes = propTypes$D;
PopoverHeader.defaultProps = defaultProps$C;

const _excluded$x = ["className", "cssModule", "tag"];
const propTypes$C = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
const defaultProps$B = {
  tag: 'div'
};

function PopoverBody(props) {
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
}

PopoverBody.propTypes = propTypes$C;
PopoverBody.defaultProps = defaultProps$B;

const _excluded$w = ["children", "className", "barClassName", "cssModule", "value", "min", "max", "animated", "striped", "color", "bar", "multi", "tag", "style", "barStyle", "barAriaValueText", "barAriaLabelledBy"];
const propTypes$B = {
  /** Enable animation to bar */
  animated: PropTypes.bool,
  bar: PropTypes.bool,
  barAriaLabelledBy: PropTypes.string,
  barAriaValueText: PropTypes.string,
  barClassName: PropTypes.string,
  barStyle: PropTypes.object,
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Add custom color to the placeholder */
  color: PropTypes.string,

  /** Maximum value of progress */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Minimum value of progress, defaults to zero */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  multi: PropTypes.bool,

  /** Add stripes to progress bar */
  striped: PropTypes.bool,
  style: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Current value of progress */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
const defaultProps$A = {
  tag: 'div',
  value: 0,
  min: 0,
  max: 100,
  style: {},
  barStyle: {}
};

function Progress(props) {
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
}

Progress.propTypes = propTypes$B;
Progress.defaultProps = defaultProps$A;

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
  /** */
  autoFocus: PropTypes.bool,

  /** Add backdrop to modal */
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),

  /** add custom classname to backdrop */
  backdropClassName: PropTypes.string,
  backdropTransition: FadePropTypes$1,

  /** Vertically center the modal */
  centered: PropTypes.bool,

  /** Add children for the modal to wrap */
  children: PropTypes.node,

  /** Add custom className for modal content */
  contentClassName: PropTypes.string,
  className: PropTypes.string,
  container: targetPropType,
  cssModule: PropTypes.object,
  external: PropTypes.node,

  /** Enable/Disable animation */
  fade: PropTypes.bool,

  /** Make the modal fullscreen */
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])]),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** The status of the modal, either open or close */
  isOpen: PropTypes.bool,

  /** Allow modal to be closed with escape key. */
  keyboard: PropTypes.bool,

  /** Identifies the element (or elements) that labels the current element. */
  labelledBy: PropTypes.string,
  modalClassName: PropTypes.string,
  modalTransition: FadePropTypes$1,

  /** Function to be triggered on close */
  onClosed: PropTypes.func,

  /** Function to be triggered on enter */
  onEnter: PropTypes.func,

  /** Function to be triggered on exit */
  onExit: PropTypes.func,

  /** Function to be triggered on open */
  onOpened: PropTypes.func,

  /** Returns focus to the element that triggered opening of the modal */
  returnFocusAfterClose: PropTypes.bool,

  /** Accessibility role */
  role: PropTypes.string,

  /** Make the modal scrollable */
  scrollable: PropTypes.bool,

  /** Two optional sizes `lg` and `sm` */
  size: PropTypes.string,

  /** Function to toggle modal visibility */
  toggle: PropTypes.func,
  trapFocus: PropTypes.bool,

  /** Unmounts the modal when modal is closed */
  unmountOnClose: PropTypes.bool,
  wrapClassName: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
  }

  trapFocus(ev) {
    if (!this.props.trapFocus) {
      return;
    }

    if (!this._element) {
      // element is not attached
      return;
    }

    if (this._dialog && this._dialog.parentNode === ev.target) {
      // initial focus when the Modal is opened
      return;
    }

    if (this.modalIndex < Modal.openCount - 1) {
      // last opened modal
      return;
    }

    const children = this.getFocusableChildren();

    for (let i = 0; i < children.length; i += 1) {
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

    if (Modal.openCount < 1) {
      Modal.originalBodyOverflow = window.getComputedStyle(document.body).overflow;
    }
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
      document.body.style.overflow = Modal.originalBodyOverflow;
    }

    this.manageFocusAfterClose();
    Modal.openCount = Math.max(0, Modal.openCount - 1);
    setScrollbarWidth(this._originalBodyPadding);
  }

  clearBackdropAnimationTimeout() {
    if (this._backdropAnimationTimeout) {
      clearTimeout(this._backdropAnimationTimeout);
      this._backdropAnimationTimeout = undefined;
    }
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

}

Modal.propTypes = propTypes$z;
Modal.defaultProps = defaultProps$z;
Modal.openCount = 0;
Modal.originalBodyOverflow = null;
var Modal$1 = Modal;

const _excluded$v = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "close"];
const propTypes$y = {
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Custom close button */
  close: PropTypes.object,
  closeAriaLabel: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Function to be triggered when close button is clicked */
  toggle: PropTypes.func,
  wrapTag: tagPropType
};
const defaultProps$y = {
  tag: 'h5',
  wrapTag: 'div',
  closeAriaLabel: 'Close'
};

function ModalHeader(props) {
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
}

ModalHeader.propTypes = propTypes$y;
ModalHeader.defaultProps = defaultProps$y;

const _excluded$u = ["className", "cssModule", "tag"];
const propTypes$x = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$x = {
  tag: 'div'
};

function ModalBody(props) {
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
}

ModalBody.propTypes = propTypes$x;
ModalBody.defaultProps = defaultProps$x;

const _excluded$t = ["className", "cssModule", "tag"];
const propTypes$w = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$w = {
  tag: 'div'
};

function ModalFooter(props) {
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
}

ModalFooter.propTypes = propTypes$w;
ModalFooter.defaultProps = defaultProps$w;

const defaultProps$v = {
  placement: 'top',
  autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'hover focus'
};

function Tooltip(props) {
  const popperClasses = classNames('tooltip', 'show', props.popperClassName);
  const classes = classNames('tooltip-inner', props.innerClassName);
  return /*#__PURE__*/React.createElement(TooltipPopoverWrapper$1, _extends({}, props, {
    arrowClassName: "tooltip-arrow",
    popperClassName: popperClasses,
    innerClassName: classes
  }));
}

Tooltip.propTypes = propTypes$E;
Tooltip.defaultProps = defaultProps$v;

const _excluded$s = ["className", "cssModule", "size", "bordered", "borderless", "striped", "dark", "hover", "responsive", "tag", "responsiveTag", "innerRef"];
const propTypes$v = {
  /** Adds border to all sides of table */
  bordered: PropTypes.bool,

  /** Removes all borders */
  borderless: PropTypes.bool,

  /** Adds custom class name to component */
  className: PropTypes.string,

  /**  */
  cssModule: PropTypes.object,

  /** Makes the table dark */
  dark: PropTypes.bool,

  /** Enables a hover state on the rows within `<tbody>` */
  hover: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),

  /** Responsive tables allow tables to be scrolled horizontally with ease */
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  responsiveTag: tagPropType,

  /** Make tables more compact by cutting cell padding in half when setting size as sm. */
  size: PropTypes.string,

  /** Adds zebra-striping to any table row within the `<tbody>` */
  striped: PropTypes.bool,

  /** Add custom tag to the component */
  tag: tagPropType
};
const defaultProps$u = {
  tag: 'table',
  responsiveTag: 'div'
};

function Table(props) {
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
}

Table.propTypes = propTypes$v;
Table.defaultProps = defaultProps$u;

const _excluded$r = ["className", "cssModule", "tag", "flush", "horizontal", "numbered"];
const propTypes$u = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Remove borders to make the list appear flush */
  flush: PropTypes.bool,

  /** Make the list horizontal instead of vertical */
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /** Add number to the ListItems */
  numbered: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$t = {
  tag: 'ul',
  horizontal: false,
  numbered: false
};

const getHorizontalClass = horizontal => {
  if (horizontal === false) {
    return false;
  }

  if (horizontal === true || horizontal === 'xs') {
    return 'list-group-horizontal';
  }

  return `list-group-horizontal-${horizontal}`;
};

function ListGroup(props) {
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
}

ListGroup.propTypes = propTypes$u;
ListGroup.defaultProps = defaultProps$t;

const _excluded$q = ["className", "cssModule", "tag", "innerRef"];
const propTypes$t = {
  children: PropTypes.node,
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
      tag: Tag,
      innerRef
    } = _this$props,
          attributes = _objectWithoutProperties(_this$props, _excluded$q);

    const classes = mapToCssModules(className, cssModule);
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

function FormFeedback(props) {
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
}

FormFeedback.propTypes = propTypes$s;
FormFeedback.defaultProps = defaultProps$r;

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

function FormGroup(props) {
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
}

FormGroup.propTypes = propTypes$r;
FormGroup.defaultProps = defaultProps$q;

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

function FormText(props) {
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
}

FormText.propTypes = propTypes$q;
FormText.defaultProps = defaultProps$p;

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
    const isNotaNumber = /\D/g;
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
      formControlClass = 'form-select';
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
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Sets size of InputGroup */
  size: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType,
  type: PropTypes.string
};
const defaultProps$n = {
  tag: 'div'
};

function InputGroup(props) {
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

  return /*#__PURE__*/React.createElement(InputGroupContext.Provider, {
    value: {
      insideInputGroup: true
    }
  }, /*#__PURE__*/React.createElement(Tag, _extends({}, attributes, {
    className: classes
  })));
}

InputGroup.propTypes = propTypes$o;
InputGroup.defaultProps = defaultProps$n;

const _excluded$k = ["className", "cssModule", "tag"];
const propTypes$n = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$m = {
  tag: 'span'
};

function InputGroupText(props) {
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
}

InputGroupText.propTypes = propTypes$n;
InputGroupText.defaultProps = defaultProps$m;

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
  }

  if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

function Label(props) {
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
}

Label.propTypes = propTypes$m;
Label.defaultProps = defaultProps$l;

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

function Media(props) {
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
}

Media.propTypes = propTypes$l;

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
  style: PropTypes.object,
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
  }

  trapFocus(ev) {
    if (!this.props.trapFocus) {
      return;
    }

    if (!this._element) {
      // element is not attached
      return;
    }

    if (this._dialog === ev.target) {
      // initial focus when the Offcanvas is opened
      return;
    }

    if (this.offcanvasIndex < Offcanvas.openCount - 1) {
      // last opened offcanvas
      return;
    }

    const children = this.getFocusableChildren();

    for (let i = 0; i < children.length; i += 1) {
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

  clearBackdropAnimationTimeout() {
    if (this._backdropAnimationTimeout) {
      clearTimeout(this._backdropAnimationTimeout);
      this._backdropAnimationTimeout = undefined;
    }
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

function OffcanvasBody(props) {
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
}

OffcanvasBody.propTypes = propTypes$j;
OffcanvasBody.defaultProps = defaultProps$j;

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

function OffcanvasHeader(props) {
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
}

OffcanvasHeader.propTypes = propTypes$i;
OffcanvasHeader.defaultProps = defaultProps$i;

const _excluded$f = ["className", "listClassName", "cssModule", "size", "tag", "listTag", "aria-label"];
const propTypes$h = {
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Add custom class for list */
  listClassName: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Make the Pagination bigger or smaller  */
  size: PropTypes.string,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Set a custom element for list component */
  listTag: tagPropType,
  'aria-label': PropTypes.string
};
const defaultProps$h = {
  tag: 'nav',
  listTag: 'ul',
  'aria-label': 'pagination'
};

function Pagination(props) {
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
}

Pagination.propTypes = propTypes$h;
Pagination.defaultProps = defaultProps$h;

const _excluded$e = ["active", "className", "cssModule", "disabled", "tag"];
const propTypes$g = {
  /** Set item as active */
  active: PropTypes.bool,
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set item as disabled */
  disabled: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$g = {
  tag: 'li'
};

function PaginationItem(props) {
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
}

PaginationItem.propTypes = propTypes$g;
PaginationItem.defaultProps = defaultProps$g;

const _excluded$d = ["className", "cssModule", "next", "previous", "first", "last", "tag"];
const propTypes$f = {
  'aria-label': PropTypes.string,
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Add to next button to add default aria label and icon */
  next: PropTypes.bool,

  /** Add to previous button to add default aria label and icon */
  previous: PropTypes.bool,

  /** Add to first button to add default aria label and icon */
  first: PropTypes.bool,

  /** Add to last button to add default aria label and icon */
  last: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$f = {
  tag: 'a'
};

function PaginationLink(props) {
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

  let {
    children
  } = props;

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
}

PaginationLink.propTypes = propTypes$f;
PaginationLink.defaultProps = defaultProps$f;

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
  /** Pass children so this component can wrap the child elements */
  children: PropTypes.node,

  /** Add custom class */
  className: PropTypes.string,

  /** Add custom class for close button */
  closeClassName: PropTypes.string,

  /** Aria label for close button */
  closeAriaLabel: PropTypes.string,

  /** Change color of alert */
  color: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Toggle fade animation */
  fade: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),

  /** Control visibility state of Alert */
  isOpen: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Function to toggle visibility */
  toggle: PropTypes.func,

  /** Props to be passed to `Fade` to modify transition */
  transition: PropTypes.shape(Fade.propTypes)
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

function ToastBody(props) {
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
}

ToastBody.propTypes = propTypes$a;
ToastBody.defaultProps = defaultProps$a;

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
  close: PropTypes.object,
  tagClassName: PropTypes.string
};
const defaultProps$9 = {
  tag: 'strong',
  wrapTag: 'div',
  tagClassName: 'me-auto',
  closeAriaLabel: 'Close'
};

function ToastHeader(props) {
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

  if (typeof iconProp === 'string') {
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
      'ms-2': icon != null
    }), cssModule)
  }, children), close || closeButton);
}

ToastHeader.propTypes = propTypes$9;
ToastHeader.defaultProps = defaultProps$9;

const _excluded$7 = ["className", "cssModule", "tag", "active", "disabled", "action", "color"];
const propTypes$8 = {
  /** Add action prop to give effects while hovering over element */
  action: PropTypes.bool,

  /** Add active prop to make the current selection active */
  active: PropTypes.bool,

  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Add background colour to the list item */
  color: PropTypes.string,

  /** Make the list item appear disabled */
  disabled: PropTypes.bool,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$8 = {
  tag: 'li'
};

const handleDisabledOnClick = e => {
  e.preventDefault();
};

function ListGroupItem(props) {
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
}

ListGroupItem.propTypes = propTypes$8;
ListGroupItem.defaultProps = defaultProps$8;

const _excluded$6 = ["className", "cssModule", "tag"];
const propTypes$7 = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$7 = {
  tag: 'h5'
};

function ListGroupItemHeading(props) {
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
}

ListGroupItemHeading.propTypes = propTypes$7;
ListGroupItemHeading.defaultProps = defaultProps$7;

const _excluded$5 = ["className", "cssModule", "tag"];
const propTypes$6 = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
};
const defaultProps$6 = {
  tag: 'p'
};

function ListGroupItemText(props) {
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
}

ListGroupItemText.propTypes = propTypes$6;
ListGroupItemText.defaultProps = defaultProps$6;

const _excluded$4 = ["className", "cssModule", "tag", "type"];
const propTypes$5 = {
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType,

  /** Type of list `unstyled` or `inline` */
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
  /** Add custom class */
  className: PropTypes.string,

  /** Change underlying component's CSS base class name */
  cssModule: PropTypes.object,

  /** Set a custom element for this component */
  tag: tagPropType
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
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
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
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement(ButtonDropdown, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys$3)));
  }

}
UncontrolledButtonDropdown.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, ButtonDropdown.propTypes);

const omitKeys$2 = ['toggleEvents', 'defaultOpen'];
const propTypes$3 = {
  /** set if Collapse is open by default */
  defaultOpen: PropTypes.bool,

  /** id of the element that should trigger toggle */
  toggler: PropTypes.string.isRequired,

  /** Events that should trigger the toggle */
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
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }), () => {
      if (this.props.onToggle) {
        this.props.onToggle(e, this.state.isOpen);
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
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement(Tooltip, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys)));
  }

}
UncontrolledTooltip.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, Tooltip.propTypes);

const _excluded$2 = ["className", "cssModule", "type", "size", "color", "children", "tag"];
const propTypes$2 = {
  /** Set a custom element for this component */
  tag: tagPropType,

  /** Change animation of spinner */
  type: PropTypes.oneOf(['border', 'grow']),

  /** Change size of spinner */
  size: PropTypes.oneOf(['sm']),

  /** Change color of spinner */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),

  /** Add custom class */
  className: PropTypes.string,

  /** Change existing className with a new className */
  cssModule: PropTypes.object,

  /** Pass children so this component can wrap the child elements */
  children: PropTypes.string
};
const defaultProps$2 = {
  tag: 'div',
  type: 'border',
  children: 'Loading...'
};

function Spinner(props) {
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
}

Spinner.propTypes = propTypes$2;
Spinner.defaultProps = defaultProps$2;

const _excluded$1 = ["className", "cssModule", "color", "innerRef", "tag", "animation", "size", "widths"];

const propTypes$1 = _objectSpread2(_objectSpread2({}, Col.propTypes), {}, {
  /** Add custom color to the placeholder */
  color: PropTypes.string,

  /** Add custom tag. */
  tag: tagPropType,

  /** Apply either `glow` or `wave` animation. */
  animation: PropTypes.oneOf(['glow', 'wave']),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),

  /** Make the size larger */
  size: PropTypes.oneOf(['lg', 'sm', 'xs'])
});

const defaultProps$1 = {
  tag: 'span'
};

function Placeholder(props) {
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
}

Placeholder.propTypes = propTypes$1;
Placeholder.defaultProps = defaultProps$1;

const _excluded = ["cssModule", "className", "tag"];
const propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  tag: tagPropType,
  cssModule: PropTypes.object
};
const defaultProps = {
  color: 'primary',
  tag: Button
};

function PlaceholderButton(props) {
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
  const classes = mapToCssModules(classNames('placeholder', className, colClasses), cssModule);
  return /*#__PURE__*/React.createElement(Button, _extends({}, modifiedAttributes, {
    className: classes,
    disabled: true
  }));
}

PlaceholderButton.propTypes = propTypes;
PlaceholderButton.defaultProps = defaultProps;

(() => {
  if (typeof window !== 'object' || typeof window.CustomEvent === 'function') return;

  const CustomEvent = (event, params) => {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    let evt = document.createEvent('CustomEvent');
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

export { Accordion, AccordionBody, AccordionContext, AccordionHeader, AccordionItem, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonDropdown, ButtonGroup, ButtonToggle, ButtonToolbar, Card, CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImg, CardImgOverlay, CardLink, CardSubtitle, CardText, CardTitle, Carousel$1 as Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem$1 as CarouselItem, CloseButton, Col, Collapse$1 as Collapse, Container, Dropdown$1 as Dropdown, DropdownContext, DropdownItem$1 as DropdownItem, DropdownMenu$1 as DropdownMenu, DropdownToggle$1 as DropdownToggle, Fade, Form$1 as Form, FormFeedback, FormGroup, FormText, Input$1 as Input, InputGroup, InputGroupText, Label, List$1 as List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListInlineItem$1 as ListInlineItem, Media, Modal$1 as Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink$1 as NavLink, Navbar, NavbarBrand, NavbarText, NavbarToggler, Offcanvas$1 as Offcanvas, OffcanvasBody, OffcanvasHeader, Pagination, PaginationItem, PaginationLink, Placeholder, PlaceholderButton, polyfill as Polyfill, Popover, PopoverBody, PopoverHeader, PopperContent$1 as PopperContent, PopperTargetHelper, Progress, Row, Spinner, TabContent$1 as TabContent, TabPane, Table, Toast, ToastBody, ToastHeader, Tooltip, UncontrolledAccordion, UncontrolledAlert$1 as UncontrolledAlert, UncontrolledButtonDropdown, UncontrolledCarousel$1 as UncontrolledCarousel, UncontrolledCollapse$1 as UncontrolledCollapse, UncontrolledDropdown, UncontrolledPopover, UncontrolledTooltip, utils as Util };
//# sourceMappingURL=reactstrap.modern.js.map
