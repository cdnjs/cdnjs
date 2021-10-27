(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('classnames'), require('react-popper'), require('react-dom'), require('react-transition-group')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'classnames', 'react-popper', 'react-dom', 'react-transition-group'], factory) :
  (global = global || self, factory(global.reactstrap = {}, global.react, global.propTypes, global.classnames, global.reactPopper, global.reactDom, global.reactTransitionGroup));
})(this, (function (exports, React, PropTypes, classNames, reactPopper, ReactDOM, reactTransitionGroup) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
  var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function getScrollbarWidth() {
    var scrollDiv = document.createElement('div'); // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
  function setScrollbarWidth(padding) {
    document.body.style.paddingRight = padding > 0 ? padding + "px" : null;
  }
  function isBodyOverflowing() {
    return document.body.clientWidth < window.innerWidth;
  }
  function getOriginalBodyPadding() {
    var style = window.getComputedStyle(document.body, null);
    return parseInt(style && style.getPropertyValue('padding-right') || 0, 10);
  }
  function conditionallyUpdateScrollbar() {
    var scrollbarWidth = getScrollbarWidth(); // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433

    var fixedContent = document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top')[0];
    var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

    if (isBodyOverflowing()) {
      setScrollbarWidth(bodyPadding + scrollbarWidth);
    }
  }
  var globalCssModule;
  function setGlobalCssModule(cssModule) {
    globalCssModule = cssModule;
  }
  function mapToCssModules(className, cssModule) {
    if (className === void 0) {
      className = '';
    }

    if (cssModule === void 0) {
      cssModule = globalCssModule;
    }

    if (!cssModule) return className;
    return className.split(' ').map(function (c) {
      return cssModule[c] || c;
    }).join(' ');
  }
  /**
   * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
   */

  function omit(obj, omitKeys) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
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
    var pickKeys = Array.isArray(keys) ? keys : [keys];
    var length = pickKeys.length;
    var key;
    var result = {};

    while (length > 0) {
      length -= 1;
      key = pickKeys[length];
      result[key] = obj[key];
    }

    return result;
  }
  var warned = {};
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
    return function validate(props, propName, componentName) {
      if (props[propName] !== null && typeof props[propName] !== 'undefined') {
        warnOnce("\"" + propName + "\" property of \"" + componentName + "\" has been deprecated.\n" + explanation);
      }

      return propType.apply(void 0, [props, propName, componentName].concat([].slice.call(arguments, 3)));
    };
  } // Shim Element if needed (e.g. in Node environment)

  var Element = typeof window === 'object' && window.Element || function () {};

  function DOMElement(props, propName, componentName) {
    if (!(props[propName] instanceof Element)) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
    }
  }
  var targetPropType = PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].func, DOMElement, PropTypes__default["default"].shape({
    current: PropTypes__default["default"].any
  })]);
  var tagPropType = PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].string, PropTypes__default["default"].shape({
    $$typeof: PropTypes__default["default"].symbol,
    render: PropTypes__default["default"].func
  }), PropTypes__default["default"].arrayOf(PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].string, PropTypes__default["default"].shape({
    $$typeof: PropTypes__default["default"].symbol,
    render: PropTypes__default["default"].func
  })]))]);
  /* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
  // These are all setup to match what is in the bootstrap _variables.scss
  // https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss

  var TransitionTimeouts = {
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

  var TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
  var TransitionStatuses = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
    EXITED: 'exited'
  };
  var keyCodes = {
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
  var PopperPlacements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
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
    var type = typeof value;
    var NAN = 0 / 0;

    if (type === 'number') {
      return value;
    }

    if (type === 'symbol' || type === 'object' && getTag(value) === '[object Symbol]') {
      return NAN;
    }

    if (isObject(value)) {
      var other = typeof value.valueOf === 'function' ? value.valueOf() : value;
      value = isObject(other) ? "" + other : other;
    }

    if (type !== 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(/^\s+|\s+$/g, '');
    var isBinary = /^0b[01]+$/i.test(value);
    return isBinary || /^0o[0-7]+$/i.test(value) ? parseInt(value.slice(2), isBinary ? 2 : 8) : /^[-+]0x[0-9a-f]+$/i.test(value) ? NAN : +value;
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
  }
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var tag = getTag(value);
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
      var selection = document.querySelectorAll(target);

      if (!selection.length) {
        selection = document.querySelectorAll("#" + target);
      }

      if (!selection.length) {
        throw new Error("The target '" + target + "' could not be identified in the dom, tip: check spelling");
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
    var els = findDOMElements(target);

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
  var defaultToggleEvents = ['touchstart', 'click'];
  function addMultipleEventListeners(_els, handler, _events, useCapture) {
    var els = _els;

    if (!isArrayOrNodeList(els)) {
      els = [els];
    }

    var events = _events;

    if (typeof events === 'string') {
      events = events.split(/\s+/);
    }

    if (!isArrayOrNodeList(els) || typeof handler !== 'function' || !Array.isArray(events)) {
      throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");
    }

    Array.prototype.forEach.call(events, function (event) {
      Array.prototype.forEach.call(els, function (el) {
        el.addEventListener(event, handler, useCapture);
      });
    });
    return function removeEvents() {
      Array.prototype.forEach.call(events, function (event) {
        Array.prototype.forEach.call(els, function (el) {
          el.removeEventListener(event, handler, useCapture);
        });
      });
    };
  }
  var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled]):not([type=hidden])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'object', 'embed', '[tabindex]:not(.modal)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];

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

  var _excluded$1e = ["className", "cssModule", "fluid", "tag"];
  var propTypes$1k = {
    tag: tagPropType,
    fluid: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$1i = {
    tag: 'div'
  };

  var Container = function Container(props) {
    var className = props.className,
        cssModule = props.cssModule,
        fluid = props.fluid,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1e);

    var containerClass = 'container';

    if (fluid === true) {
      containerClass = 'container-fluid';
    } else if (fluid) {
      containerClass = "container-" + fluid;
    }

    var classes = mapToCssModules(classNames__default["default"](className, containerClass), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Container.propTypes = propTypes$1k;
  Container.defaultProps = defaultProps$1i;
  var Container$1 = Container;

  var _excluded$1d = ["className", "cssModule", "noGutters", "tag", "form", "widths"];
  var rowColWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  var rowColsPropType = PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]);
  var propTypes$1j = {
    tag: tagPropType,
    noGutters: deprecated(PropTypes__default["default"].bool, "Please use Bootstrap 5 gutter utility classes. https://getbootstrap.com/docs/5.0/layout/gutters/"),
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    form: PropTypes__default["default"].bool,
    xs: rowColsPropType,
    sm: rowColsPropType,
    md: rowColsPropType,
    lg: rowColsPropType,
    xl: rowColsPropType,
    xxl: rowColsPropType
  };
  var defaultProps$1h = {
    tag: 'div',
    widths: rowColWidths
  };

  var Row = function Row(props) {
    var className = props.className,
        cssModule = props.cssModule,
        noGutters = props.noGutters,
        Tag = props.tag,
        form = props.form,
        widths = props.widths,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1d);

    var colClasses = [];
    widths.forEach(function (colWidth, i) {
      var colSize = props[colWidth];
      delete attributes[colWidth];

      if (!colSize) {
        return;
      }

      var isXs = !i;
      colClasses.push(isXs ? "row-cols-" + colSize : "row-cols-" + colWidth + "-" + colSize);
    });
    var classes = mapToCssModules(classNames__default["default"](className, noGutters ? 'gx-0' : null, form ? 'form-row' : 'row', colClasses), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Row.propTypes = propTypes$1j;
  Row.defaultProps = defaultProps$1h;
  var Row$1 = Row;

  var _excluded$1c = ["className", "cssModule", "widths", "tag"];
  var colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  var stringOrNumberProp$1 = PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]);
  var columnProps$1 = PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].number, PropTypes__default["default"].string, PropTypes__default["default"].shape({
    size: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].number, PropTypes__default["default"].string]),
    order: stringOrNumberProp$1,
    offset: stringOrNumberProp$1
  })]);
  var propTypes$1i = {
    tag: tagPropType,
    xs: columnProps$1,
    sm: columnProps$1,
    md: columnProps$1,
    lg: columnProps$1,
    xl: columnProps$1,
    xxl: columnProps$1,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    widths: PropTypes__default["default"].array
  };
  var defaultProps$1g = {
    tag: 'div',
    widths: colWidths$1
  };

  var getColumnSizeClass$1 = function getColumnSizeClass(isXs, colWidth, colSize) {
    if (colSize === true || colSize === '') {
      return isXs ? 'col' : "col-" + colWidth;
    } else if (colSize === 'auto') {
      return isXs ? 'col-auto' : "col-" + colWidth + "-auto";
    }

    return isXs ? "col-" + colSize : "col-" + colWidth + "-" + colSize;
  };

  var getColumnClasses = function getColumnClasses(attributes, cssModule, widths) {
    if (widths === void 0) {
      widths = colWidths$1;
    }

    var colClasses = [];
    widths.forEach(function (colWidth, i) {
      var columnProp = attributes[colWidth];
      delete attributes[colWidth];

      if (!columnProp && columnProp !== '') {
        return;
      }

      var isXs = !i;

      if (isObject(columnProp)) {
        var _classNames;

        var colSizeInterfix = isXs ? '-' : "-" + colWidth + "-";
        var colClass = getColumnSizeClass$1(isXs, colWidth, columnProp.size);
        colClasses.push(mapToCssModules(classNames__default["default"]((_classNames = {}, _classNames[colClass] = columnProp.size || columnProp.size === '', _classNames["order" + colSizeInterfix + columnProp.order] = columnProp.order || columnProp.order === 0, _classNames["offset" + colSizeInterfix + columnProp.offset] = columnProp.offset || columnProp.offset === 0, _classNames)), cssModule));
      } else {
        var _colClass = getColumnSizeClass$1(isXs, colWidth, columnProp);

        colClasses.push(_colClass);
      }
    });
    return {
      colClasses: colClasses,
      attributes: attributes
    };
  };

  var Col = function Col(props) {
    var className = props.className,
        cssModule = props.cssModule,
        widths = props.widths,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1c);

    var _getColumnClasses = getColumnClasses(attributes, cssModule, widths),
        modifiedAttributes = _getColumnClasses.attributes,
        colClasses = _getColumnClasses.colClasses;

    if (!colClasses.length) {
      colClasses.push('col');
    }

    var classes = mapToCssModules(classNames__default["default"](className, colClasses), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, modifiedAttributes, {
      className: classes
    }));
  };

  Col.propTypes = propTypes$1i;
  Col.defaultProps = defaultProps$1g;
  var Col$1 = Col;

  var _excluded$1b = ["expand", "className", "cssModule", "light", "dark", "fixed", "sticky", "color", "container", "tag", "children"];
  var propTypes$1h = {
    light: PropTypes__default["default"].bool,
    dark: PropTypes__default["default"].bool,
    full: PropTypes__default["default"].bool,
    fixed: PropTypes__default["default"].string,
    sticky: PropTypes__default["default"].string,
    color: PropTypes__default["default"].string,
    role: PropTypes__default["default"].string,
    tag: tagPropType,
    container: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    expand: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    children: PropTypes__default["default"].node
  };
  var defaultProps$1f = {
    tag: 'nav',
    expand: false,
    container: 'fluid'
  };

  var getExpandClass = function getExpandClass(expand) {
    if (expand === false) {
      return false;
    } else if (expand === true || expand === 'xs') {
      return 'navbar-expand';
    }

    return "navbar-expand-" + expand;
  };

  var Navbar = function Navbar(props) {
    var _classNames;

    var expand = props.expand,
        className = props.className,
        cssModule = props.cssModule,
        light = props.light,
        dark = props.dark,
        fixed = props.fixed,
        sticky = props.sticky,
        color = props.color,
        container = props.container,
        Tag = props.tag,
        children = props.children,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1b);

    var classes = mapToCssModules(classNames__default["default"](className, 'navbar', getExpandClass(expand), (_classNames = {
      'navbar-light': light,
      'navbar-dark': dark
    }, _classNames["bg-" + color] = color, _classNames["fixed-" + fixed] = fixed, _classNames["sticky-" + sticky] = sticky, _classNames)), cssModule);
    var containerClass = container && container === true ? 'container' : "container-" + container;
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }), container ? /*#__PURE__*/React__default["default"].createElement("div", {
      className: containerClass
    }, children) : children);
  };

  Navbar.propTypes = propTypes$1h;
  Navbar.defaultProps = defaultProps$1f;
  var Navbar$1 = Navbar;

  var _excluded$1a = ["className", "cssModule", "tag"];
  var propTypes$1g = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$1e = {
    tag: 'a'
  };

  var NavbarBrand = function NavbarBrand(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1a);

    var classes = mapToCssModules(classNames__default["default"](className, 'navbar-brand'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  NavbarBrand.propTypes = propTypes$1g;
  NavbarBrand.defaultProps = defaultProps$1e;
  var NavbarBrand$1 = NavbarBrand;

  var _excluded$19 = ["className", "cssModule", "active", "tag"];
  var propTypes$1f = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$1d = {
    tag: 'span'
  };

  var NavbarText = function NavbarText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$19);

    var classes = mapToCssModules(classNames__default["default"](className, 'navbar-text'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  NavbarText.propTypes = propTypes$1f;
  NavbarText.defaultProps = defaultProps$1d;
  var NavbarText$1 = NavbarText;

  var _excluded$18 = ["className", "cssModule", "children", "tag"];
  var propTypes$1e = {
    tag: tagPropType,
    type: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].node
  };
  var defaultProps$1c = {
    tag: 'button',
    type: 'button'
  };

  var NavbarToggler = function NavbarToggler(props) {
    var className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$18);

    var classes = mapToCssModules(classNames__default["default"](className, 'navbar-toggler'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
      "aria-label": "Toggle navigation"
    }, attributes, {
      className: classes
    }), children || /*#__PURE__*/React__default["default"].createElement("span", {
      className: mapToCssModules('navbar-toggler-icon', cssModule)
    }));
  };

  NavbarToggler.propTypes = propTypes$1e;
  NavbarToggler.defaultProps = defaultProps$1c;
  var NavbarToggler$1 = NavbarToggler;

  var _excluded$17 = ["className", "cssModule", "tabs", "pills", "vertical", "horizontal", "justified", "fill", "navbar", "card", "tag"];
  var propTypes$1d = {
    tabs: PropTypes__default["default"].bool,
    pills: PropTypes__default["default"].bool,
    vertical: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    horizontal: PropTypes__default["default"].string,
    justified: PropTypes__default["default"].bool,
    fill: PropTypes__default["default"].bool,
    navbar: PropTypes__default["default"].bool,
    card: PropTypes__default["default"].bool,
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$1b = {
    tag: 'ul',
    vertical: false
  };

  var getVerticalClass = function getVerticalClass(vertical) {
    if (vertical === false) {
      return false;
    } else if (vertical === true || vertical === 'xs') {
      return 'flex-column';
    }

    return "flex-" + vertical + "-column";
  };

  var Nav = function Nav(props) {
    var className = props.className,
        cssModule = props.cssModule,
        tabs = props.tabs,
        pills = props.pills,
        vertical = props.vertical,
        horizontal = props.horizontal,
        justified = props.justified,
        fill = props.fill,
        navbar = props.navbar,
        card = props.card,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$17);

    var classes = mapToCssModules(classNames__default["default"](className, navbar ? 'navbar-nav' : 'nav', horizontal ? "justify-content-" + horizontal : false, getVerticalClass(vertical), {
      'nav-tabs': tabs,
      'card-header-tabs': card && tabs,
      'nav-pills': pills,
      'card-header-pills': card && pills,
      'nav-justified': justified,
      'nav-fill': fill
    }), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Nav.propTypes = propTypes$1d;
  Nav.defaultProps = defaultProps$1b;
  var Nav$1 = Nav;

  var _excluded$16 = ["className", "cssModule", "active", "tag"];
  var propTypes$1c = {
    tag: tagPropType,
    active: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$1a = {
    tag: 'li'
  };

  var NavItem = function NavItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        active = props.active,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$16);

    var classes = mapToCssModules(classNames__default["default"](className, 'nav-item', active ? 'active' : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  NavItem.propTypes = propTypes$1c;
  NavItem.defaultProps = defaultProps$1a;
  var NavItem$1 = NavItem;

  var _excluded$15 = ["className", "cssModule", "active", "tag", "innerRef"];
  var propTypes$1b = {
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    disabled: PropTypes__default["default"].bool,
    active: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    onClick: PropTypes__default["default"].func,
    href: PropTypes__default["default"].any
  };
  var defaultProps$19 = {
    tag: 'a'
  };

  var NavLink = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(NavLink, _React$Component);

    function NavLink(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = NavLink.prototype;

    _proto.onClick = function onClick(e) {
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
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          active = _this$props.active,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, _excluded$15);

      var classes = mapToCssModules(classNames__default["default"](className, 'nav-link', {
        disabled: attributes.disabled,
        active: active
      }), cssModule);
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        onClick: this.onClick,
        className: classes
      }));
    };

    return NavLink;
  }(React__default["default"].Component);

  NavLink.propTypes = propTypes$1b;
  NavLink.defaultProps = defaultProps$19;
  var NavLink$1 = NavLink;

  var _excluded$14 = ["className", "listClassName", "cssModule", "children", "tag", "listTag", "aria-label"];
  var propTypes$1a = {
    tag: tagPropType,
    listTag: tagPropType,
    className: PropTypes__default["default"].string,
    listClassName: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].node,
    'aria-label': PropTypes__default["default"].string
  };
  var defaultProps$18 = {
    tag: 'nav',
    listTag: 'ol',
    'aria-label': 'breadcrumb'
  };

  var Breadcrumb = function Breadcrumb(props) {
    var className = props.className,
        listClassName = props.listClassName,
        cssModule = props.cssModule,
        children = props.children,
        Tag = props.tag,
        ListTag = props.listTag,
        label = props['aria-label'],
        attributes = _objectWithoutPropertiesLoose(props, _excluded$14);

    var classes = mapToCssModules(classNames__default["default"](className), cssModule);
    var listClasses = mapToCssModules(classNames__default["default"]('breadcrumb', listClassName), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      "aria-label": label
    }), /*#__PURE__*/React__default["default"].createElement(ListTag, {
      className: listClasses
    }, children));
  };

  Breadcrumb.propTypes = propTypes$1a;
  Breadcrumb.defaultProps = defaultProps$18;
  var Breadcrumb$1 = Breadcrumb;

  var _excluded$13 = ["className", "cssModule", "active", "tag"];
  var propTypes$19 = {
    tag: tagPropType,
    active: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$17 = {
    tag: 'li'
  };

  var BreadcrumbItem = function BreadcrumbItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        active = props.active,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$13);

    var classes = mapToCssModules(classNames__default["default"](className, active ? 'active' : false, 'breadcrumb-item'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      "aria-current": active ? 'page' : undefined
    }));
  };

  BreadcrumbItem.propTypes = propTypes$19;
  BreadcrumbItem.defaultProps = defaultProps$17;
  var BreadcrumbItem$1 = BreadcrumbItem;

  var _excluded$12 = ["active", "aria-label", "block", "className", "close", "cssModule", "color", "outline", "size", "tag", "innerRef"];
  var propTypes$18 = {
    active: PropTypes__default["default"].bool,
    'aria-label': PropTypes__default["default"].string,
    block: PropTypes__default["default"].bool,
    color: PropTypes__default["default"].string,
    disabled: PropTypes__default["default"].bool,
    outline: PropTypes__default["default"].bool,
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    onClick: PropTypes__default["default"].func,
    size: PropTypes__default["default"].string,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    close: PropTypes__default["default"].bool
  };
  var defaultProps$16 = {
    color: 'secondary',
    tag: 'button'
  };

  var Button = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Button, _React$Component);

    function Button(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = Button.prototype;

    _proto.onClick = function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        return this.props.onClick(e);
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          active = _this$props.active,
          ariaLabel = _this$props['aria-label'],
          block = _this$props.block,
          className = _this$props.className,
          close = _this$props.close,
          cssModule = _this$props.cssModule,
          color = _this$props.color,
          outline = _this$props.outline,
          size = _this$props.size,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, _excluded$12);

      var btnOutlineColor = "btn" + (outline ? '-outline' : '') + "-" + color;
      var classes = mapToCssModules(classNames__default["default"](className, close && 'btn-close', close || 'btn', close || btnOutlineColor, size ? "btn-" + size : false, block ? 'd-block w-100' : false, {
        active: active,
        disabled: this.props.disabled
      }), cssModule);

      if (attributes.href && Tag === 'button') {
        Tag = 'a';
      }

      var defaultAriaLabel = close ? 'Close' : null;
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
        type: Tag === 'button' && attributes.onClick ? 'button' : undefined
      }, attributes, {
        className: classes,
        ref: innerRef,
        onClick: this.onClick,
        "aria-label": ariaLabel || defaultAriaLabel
      }));
    };

    return Button;
  }(React__default["default"].Component);

  Button.propTypes = propTypes$18;
  Button.defaultProps = defaultProps$16;
  var Button$1 = Button;

  var _excluded$11 = ["className"];
  var propTypes$17 = {
    onClick: PropTypes__default["default"].func,
    onBlur: PropTypes__default["default"].func,
    onFocus: PropTypes__default["default"].func,
    defaultValue: PropTypes__default["default"].bool
  };
  var defaultProps$15 = {
    defaultValue: false
  };

  var ButtonToggle = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(ButtonToggle, _React$Component);

    function ButtonToggle(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        toggled: props.defaultValue,
        focus: false
      };
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = ButtonToggle.prototype;

    _proto.onBlur = function onBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      this.setState({
        focus: false
      });
    };

    _proto.onFocus = function onFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }

      this.setState({
        focus: true
      });
    };

    _proto.onClick = function onClick(e) {
      if (this.props.onClick) {
        this.props.onClick(e);
      }

      this.setState(function (_ref) {
        var toggled = _ref.toggled;
        return {
          toggled: !toggled
        };
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          attributes = _objectWithoutPropertiesLoose(_this$props, _excluded$11);

      var classes = mapToCssModules(classNames__default["default"](className, {
        focus: this.state.focus
      }), this.props.cssModule);
      return /*#__PURE__*/React__default["default"].createElement(Button$1, _extends({
        active: this.state.toggled,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onClick: this.onClick,
        className: classes
      }, attributes));
    };

    return ButtonToggle;
  }(React__default["default"].Component);

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

  var DropdownContext = React__default["default"].createContext({});

  var _excluded$10 = ["className", "cssModule", "direction", "isOpen", "group", "size", "nav", "setActiveFromChild", "active", "tag", "menuRole"];
  var propTypes$16 = {
    a11y: PropTypes__default["default"].bool,
    disabled: PropTypes__default["default"].bool,
    direction: PropTypes__default["default"].oneOf(['up', 'down', 'start', 'end', 'left', 'right']),
    group: PropTypes__default["default"].bool,
    isOpen: PropTypes__default["default"].bool,
    nav: PropTypes__default["default"].bool,
    active: PropTypes__default["default"].bool,
    size: PropTypes__default["default"].string,
    tag: tagPropType,
    toggle: PropTypes__default["default"].func,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    inNavbar: PropTypes__default["default"].bool,
    setActiveFromChild: PropTypes__default["default"].bool,
    menuRole: PropTypes__default["default"].oneOf(['listbox', 'menu'])
  };
  var defaultProps$14 = {
    a11y: true,
    isOpen: false,
    direction: 'down',
    nav: false,
    active: false,
    inNavbar: false,
    setActiveFromChild: false
  };
  var preventDefaultKeys = [keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down, keyCodes.end, keyCodes.home];

  var Dropdown = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Dropdown, _React$Component);

    function Dropdown(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.addEvents = _this.addEvents.bind(_assertThisInitialized(_this));
      _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
      _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
      _this.removeEvents = _this.removeEvents.bind(_assertThisInitialized(_this));
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.handleMenuRef = _this.handleMenuRef.bind(_assertThisInitialized(_this));
      _this.containerRef = React__default["default"].createRef();
      _this.menuRef = React__default["default"].createRef();
      return _this;
    }

    var _proto = Dropdown.prototype;

    _proto.handleMenuRef = function handleMenuRef(menuRef) {
      this.menuRef.current = menuRef;
    };

    _proto.getContextValue = function getContextValue() {
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
    };

    _proto.componentDidMount = function componentDidMount() {
      this.handleProps();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.removeEvents();
    };

    _proto.getContainer = function getContainer() {
      return this.containerRef.current;
    };

    _proto.getMenu = function getMenu() {
      return this.menuRef.current;
    };

    _proto.getMenuCtrl = function getMenuCtrl() {
      if (this._$menuCtrl) return this._$menuCtrl;
      this._$menuCtrl = this.getContainer().querySelector('[aria-expanded]');
      return this._$menuCtrl;
    };

    _proto.getItemType = function getItemType() {
      if (this.context.menuRole === 'listbox') {
        return 'option';
      }

      return 'menuitem';
    };

    _proto.getMenuItems = function getMenuItems() {
      // In a real menu with a child DropdownMenu, `this.getMenu()` should never
      // be null, but it is sometimes null in tests. To mitigate that, we just
      // use `this.getContainer()` as the fallback `menuContainer`.
      var menuContainer = this.getMenu() || this.getContainer();
      return [].slice.call(menuContainer.querySelectorAll("[role=\"" + this.getItemType() + "\"]"));
    };

    _proto.addEvents = function addEvents() {
      var _this2 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.addEventListener(event, _this2.handleDocumentClick, true);
      });
    };

    _proto.removeEvents = function removeEvents() {
      var _this3 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    };

    _proto.handleDocumentClick = function handleDocumentClick(e) {
      if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
      var container = this.getContainer();
      var menu = this.getMenu();
      var clickIsInContainer = container.contains(e.target) && container !== e.target;
      var clickIsInInput = container.classList.contains('input-group') && container.classList.contains('dropdown') && e.target.tagName === 'INPUT';
      var clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;

      if ((clickIsInContainer && !clickIsInInput || clickIsInMenu) && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
        return;
      }

      this.toggle(e);
    };

    _proto.handleKeyDown = function handleKeyDown(e) {
      var _this4 = this;

      var isTargetMenuItem = e.target.getAttribute('role') === 'menuitem' || e.target.getAttribute('role') === 'option';
      var isTargetMenuCtrl = this.getMenuCtrl() === e.target;
      var isTab = keyCodes.tab === e.which;

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

          setTimeout(function () {
            return _this4.getMenuItems()[0].focus();
          });
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
          var $menuitems = this.getMenuItems();
          var index = $menuitems.indexOf(e.target);

          if (keyCodes.up === e.which || keyCodes.p === e.which && e.ctrlKey) {
            index = index !== 0 ? index - 1 : $menuitems.length - 1;
          } else if (keyCodes.down === e.which || keyCodes.n === e.which && e.ctrlKey) {
            index = index === $menuitems.length - 1 ? 0 : index + 1;
          }

          $menuitems[index].focus();
        } else if (keyCodes.end === e.which) {
          var _$menuitems = this.getMenuItems();

          _$menuitems[_$menuitems.length - 1].focus();
        } else if (keyCodes.home === e.which) {
          var _$menuitems2 = this.getMenuItems();

          _$menuitems2[0].focus();
        } else if (e.which >= 48 && e.which <= 90) {
          var _$menuitems3 = this.getMenuItems();

          var charPressed = String.fromCharCode(e.which).toLowerCase();

          for (var i = 0; i < _$menuitems3.length; i += 1) {
            var firstLetter = _$menuitems3[i].textContent && _$menuitems3[i].textContent[0].toLowerCase();

            if (firstLetter === charPressed) {
              _$menuitems3[i].focus();

              break;
            }
          }
        }
      }
    };

    _proto.handleProps = function handleProps() {
      if (this.props.isOpen) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    };

    _proto.toggle = function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    };

    _proto.render = function render() {
      var _classNames, _ref;

      var _omit = omit(this.props, ['toggle', 'disabled', 'inNavbar', 'a11y']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          direction = _omit.direction,
          isOpen = _omit.isOpen,
          group = _omit.group,
          size = _omit.size,
          nav = _omit.nav,
          setActiveFromChild = _omit.setActiveFromChild,
          active = _omit.active,
          tag = _omit.tag,
          attrs = _objectWithoutPropertiesLoose(_omit, _excluded$10);

      var Tag = tag || (nav ? 'li' : 'div');
      var subItemIsActive = false;

      if (setActiveFromChild) {
        React__default["default"].Children.map(this.props.children[1].props.children, function (dropdownItem) {
          if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
        });
      }

      var classes = mapToCssModules(classNames__default["default"](className, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, (_classNames = {
        'btn-group': group
      }, _classNames["btn-group-" + size] = !!size, _classNames.dropdown = !group, _classNames.dropup = direction === 'up', _classNames.dropstart = direction === 'start' || direction === 'left', _classNames.dropend = direction === 'end' || direction === 'right', _classNames.show = isOpen, _classNames['nav-item'] = nav, _classNames)), cssModule);
      return /*#__PURE__*/React__default["default"].createElement(DropdownContext.Provider, {
        value: this.getContextValue()
      }, /*#__PURE__*/React__default["default"].createElement(reactPopper.Manager, null, /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attrs, (_ref = {}, _ref[typeof Tag === 'string' ? 'ref' : 'innerRef'] = this.containerRef, _ref), {
        onKeyDown: this.handleKeyDown,
        className: classes
      }))));
    };

    return Dropdown;
  }(React__default["default"].Component);

  Dropdown.propTypes = propTypes$16;
  Dropdown.defaultProps = defaultProps$14;
  var Dropdown$1 = Dropdown;

  var propTypes$15 = {
    children: PropTypes__default["default"].node
  };

  var ButtonDropdown = function ButtonDropdown(props) {
    return /*#__PURE__*/React__default["default"].createElement(Dropdown$1, _extends({
      group: true
    }, props));
  };

  ButtonDropdown.propTypes = propTypes$15;
  var ButtonDropdown$1 = ButtonDropdown;

  var _excluded$$ = ["className", "cssModule", "size", "vertical", "tag"];
  var propTypes$14 = {
    tag: tagPropType,
    'aria-label': PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    role: PropTypes__default["default"].string,
    size: PropTypes__default["default"].string,
    vertical: PropTypes__default["default"].bool
  };
  var defaultProps$13 = {
    tag: 'div',
    role: 'group'
  };

  var ButtonGroup = function ButtonGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        size = props.size,
        vertical = props.vertical,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$$);

    var classes = mapToCssModules(classNames__default["default"](className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ButtonGroup.propTypes = propTypes$14;
  ButtonGroup.defaultProps = defaultProps$13;
  var ButtonGroup$1 = ButtonGroup;

  var _excluded$_ = ["className", "cssModule", "tag"];
  var propTypes$13 = {
    tag: tagPropType,
    'aria-label': PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    role: PropTypes__default["default"].string
  };
  var defaultProps$12 = {
    tag: 'div',
    role: 'toolbar'
  };

  var ButtonToolbar = function ButtonToolbar(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$_);

    var classes = mapToCssModules(classNames__default["default"](className, 'btn-toolbar'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ButtonToolbar.propTypes = propTypes$13;
  ButtonToolbar.defaultProps = defaultProps$12;
  var ButtonToolbar$1 = ButtonToolbar;

  var _excluded$Z = ["className", "cssModule", "divider", "tag", "header", "active", "text"];
  var propTypes$12 = {
    children: PropTypes__default["default"].node,
    active: PropTypes__default["default"].bool,
    disabled: PropTypes__default["default"].bool,
    divider: PropTypes__default["default"].bool,
    tag: tagPropType,
    header: PropTypes__default["default"].bool,
    onClick: PropTypes__default["default"].func,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    toggle: PropTypes__default["default"].bool,
    text: PropTypes__default["default"].bool
  };
  var defaultProps$11 = {
    tag: 'button',
    toggle: true
  };

  var DropdownItem = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(DropdownItem, _React$Component);

    function DropdownItem(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.getTabIndex = _this.getTabIndex.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = DropdownItem.prototype;

    _proto.getRole = function getRole() {
      if (this.context.menuRole === 'listbox') {
        return 'option';
      }

      return 'menuitem';
    };

    _proto.onClick = function onClick(e) {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          header = _this$props.header,
          divider = _this$props.divider,
          text = _this$props.text;

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
    };

    _proto.getTabIndex = function getTabIndex() {
      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          header = _this$props2.header,
          divider = _this$props2.divider,
          text = _this$props2.text;

      if (disabled || header || divider || text) {
        return '-1';
      }

      return '0';
    };

    _proto.render = function render() {
      var tabIndex = this.getTabIndex();
      var role = tabIndex > -1 ? this.getRole() : undefined;

      var _omit = omit(this.props, ['toggle']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          divider = _omit.divider,
          Tag = _omit.tag,
          header = _omit.header,
          active = _omit.active,
          text = _omit.text,
          props = _objectWithoutPropertiesLoose(_omit, _excluded$Z);

      var classes = mapToCssModules(classNames__default["default"](className, {
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

      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
        type: Tag === 'button' && (props.onClick || this.props.toggle) ? 'button' : undefined
      }, props, {
        tabIndex: tabIndex,
        role: role,
        className: classes,
        onClick: this.onClick
      }));
    };

    return DropdownItem;
  }(React__default["default"].Component);

  DropdownItem.propTypes = propTypes$12;
  DropdownItem.defaultProps = defaultProps$11;
  DropdownItem.contextType = DropdownContext;
  var DropdownItem$1 = DropdownItem;

  var _excluded$Y = ["className", "cssModule", "dark", "end", "right", "tag", "flip", "modifiers", "persist", "strategy", "container"];
  var propTypes$11 = {
    tag: tagPropType,
    children: PropTypes__default["default"].node.isRequired,
    dark: PropTypes__default["default"].bool,
    end: PropTypes__default["default"].bool,
    flip: PropTypes__default["default"].bool,
    modifiers: PropTypes__default["default"].array,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    persist: PropTypes__default["default"].bool,
    strategy: PropTypes__default["default"].string,
    container: targetPropType,
    right: deprecated(PropTypes__default["default"].bool, 'Please use "end" instead.')
  };
  var defaultProps$10 = {
    tag: 'div',
    flip: true,
    modifiers: []
  };
  var directionPositionMap = {
    up: 'top',
    left: 'left',
    right: 'right',
    start: 'left',
    end: 'right',
    down: 'bottom'
  };

  var DropdownMenu = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(DropdownMenu, _React$Component);

    function DropdownMenu() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = DropdownMenu.prototype;

    _proto.getRole = function getRole() {
      if (this.context.menuRole === 'listbox') {
        return 'listbox';
      }

      return 'menu';
    };

    _proto.render = function render() {
      var _this = this;

      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          dark = _this$props.dark,
          end = _this$props.end,
          right = _this$props.right,
          tag = _this$props.tag,
          flip = _this$props.flip,
          modifiers = _this$props.modifiers,
          persist = _this$props.persist,
          strategy = _this$props.strategy,
          container = _this$props.container,
          attrs = _objectWithoutPropertiesLoose(_this$props, _excluded$Y);

      var classes = mapToCssModules(classNames__default["default"](className, 'dropdown-menu', {
        'dropdown-menu-dark': dark,
        'dropdown-menu-end': end || right,
        show: this.context.isOpen
      }), cssModule);
      var Tag = tag;

      if (persist || this.context.isOpen && !this.context.inNavbar) {
        var position1 = directionPositionMap[this.context.direction] || 'bottom';
        var position2 = end || right ? 'end' : 'start';
        var poperPlacement = position1 + "-" + position2;
        var poperModifiers = [].concat(modifiers, [{
          name: 'flip',
          enabled: !!flip
        }]);
        var popper = /*#__PURE__*/React__default["default"].createElement(reactPopper.Popper, {
          placement: poperPlacement,
          modifiers: poperModifiers,
          strategy: strategy
        }, function (_ref) {
          var ref = _ref.ref,
              style = _ref.style,
              placement = _ref.placement;

          var combinedStyle = _objectSpread2(_objectSpread2({}, _this.props.style), style);

          var handleRef = function handleRef(tagRef) {
            // Send the ref to `react-popper`
            ref(tagRef); // Send the ref to the parent Dropdown so that clicks outside
            // it will cause it to close

            var onMenuRef = _this.context.onMenuRef;
            if (onMenuRef) onMenuRef(tagRef);
          };

          return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
            tabIndex: "-1",
            role: _this.getRole(),
            ref: handleRef
          }, attrs, {
            style: combinedStyle,
            "aria-hidden": !_this.context.isOpen,
            className: classes,
            "data-popper-placement": placement
          }));
        });

        if (container) {
          return ReactDOM__default["default"].createPortal(popper, getTarget(container));
        } else {
          return popper;
        }
      }

      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
        tabIndex: "-1",
        role: this.getRole()
      }, attrs, {
        "aria-hidden": !this.context.isOpen,
        className: classes,
        "data-popper-placement": attrs.placement
      }));
    };

    return DropdownMenu;
  }(React__default["default"].Component);
  DropdownMenu.propTypes = propTypes$11;
  DropdownMenu.defaultProps = defaultProps$10;
  DropdownMenu.contextType = DropdownContext;
  var DropdownMenu$1 = DropdownMenu;

  var _excluded$X = ["className", "color", "cssModule", "caret", "split", "nav", "tag", "innerRef"];
  var propTypes$10 = {
    caret: PropTypes__default["default"].bool,
    color: PropTypes__default["default"].string,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    disabled: PropTypes__default["default"].bool,
    onClick: PropTypes__default["default"].func,
    'aria-haspopup': PropTypes__default["default"].bool,
    split: PropTypes__default["default"].bool,
    tag: tagPropType,
    nav: PropTypes__default["default"].bool
  };
  var defaultProps$$ = {
    color: 'secondary',
    'aria-haspopup': true
  };

  var DropdownToggle = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(DropdownToggle, _React$Component);

    function DropdownToggle(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = DropdownToggle.prototype;

    _proto.onClick = function onClick(e) {
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
    };

    _proto.getRole = function getRole() {
      return this.context.menuRole || this.props['aria-haspopup'];
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          color = _this$props.color,
          cssModule = _this$props.cssModule,
          caret = _this$props.caret,
          split = _this$props.split,
          nav = _this$props.nav,
          tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          props = _objectWithoutPropertiesLoose(_this$props, _excluded$X);

      var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
      var classes = mapToCssModules(classNames__default["default"](className, {
        'dropdown-toggle': caret || split,
        'dropdown-toggle-split': split,
        'nav-link': nav
      }), cssModule);
      var children = typeof props.children !== 'undefined' ? props.children : /*#__PURE__*/React__default["default"].createElement("span", {
        className: "visually-hidden"
      }, ariaLabel);
      var Tag;

      if (nav && !tag) {
        Tag = 'a';
        props.href = '#';
      } else if (!tag) {
        Tag = Button$1;
        props.color = color;
        props.cssModule = cssModule;
      } else {
        Tag = tag;
      }

      if (this.context.inNavbar) {
        return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, props, {
          className: classes,
          onClick: this.onClick,
          "aria-expanded": this.context.isOpen,
          "aria-haspopup": this.getRole(),
          children: children
        }));
      }

      return /*#__PURE__*/React__default["default"].createElement(reactPopper.Reference, {
        innerRef: innerRef
      }, function (_ref) {
        var _ref2;

        var ref = _ref.ref;
        return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, props, (_ref2 = {}, _ref2[typeof Tag === 'string' ? 'ref' : 'innerRef'] = ref, _ref2), {
          className: classes,
          onClick: _this2.onClick,
          "aria-expanded": _this2.context.isOpen,
          "aria-haspopup": _this2.getRole(),
          children: children
        }));
      });
    };

    return DropdownToggle;
  }(React__default["default"].Component);

  DropdownToggle.propTypes = propTypes$10;
  DropdownToggle.defaultProps = defaultProps$$;
  DropdownToggle.contextType = DropdownContext;
  var DropdownToggle$1 = DropdownToggle;

  var _excluded$W = ["tag", "baseClass", "baseClassActive", "className", "cssModule", "children", "innerRef"];

  var propTypes$$ = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.propTypes), {}, {
    children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
    tag: tagPropType,
    baseClass: PropTypes__default["default"].string,
    baseClassActive: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  });

  var defaultProps$_ = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.defaultProps), {}, {
    tag: 'div',
    baseClass: 'fade',
    baseClassActive: 'show',
    timeout: TransitionTimeouts.Fade,
    appear: true,
    enter: true,
    exit: true,
    "in": true
  });

  function Fade(props) {
    var Tag = props.tag,
        baseClass = props.baseClass,
        baseClassActive = props.baseClassActive,
        className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        innerRef = props.innerRef,
        otherProps = _objectWithoutPropertiesLoose(props, _excluded$W);

    var transitionProps = pick(otherProps, TransitionPropTypeKeys);
    var childProps = omit(otherProps, TransitionPropTypeKeys);
    return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.Transition, transitionProps, function (status) {
      var isActive = status === 'entered';
      var classes = mapToCssModules(classNames__default["default"](className, baseClass, isActive && baseClassActive), cssModule);
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
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

  var AccordionContext = React__default["default"].createContext({});

  var _excluded$V = ["flush", "open", "toggle", "className", "cssModule", "tag", "innerRef"];
  var propTypes$_ = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    children: PropTypes__default["default"].node,
    flush: PropTypes__default["default"].bool,
    open: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].string]).isRequired,
    toggle: PropTypes__default["default"].func.isRequired
  };
  var defaultProps$Z = {
    tag: 'div'
  };

  var Accordion = function Accordion(props) {
    var flush = props.flush,
        open = props.open,
        toggle = props.toggle,
        className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$V);

    var classes = mapToCssModules(classNames__default["default"](className, 'accordion', {
      'accordion-flush': flush
    }), cssModule);
    var accordionContext = React.useMemo(function () {
      return {
        open: open,
        toggle: toggle
      };
    });
    return /*#__PURE__*/React__default["default"].createElement(AccordionContext.Provider, {
      value: accordionContext
    }, /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    })));
  };

  Accordion.propTypes = propTypes$_;
  Accordion.defaultProps = defaultProps$Z;
  var Accordion$1 = Accordion;

  var _excluded$U = ["defaultOpen", "stayOpen"];
  var propTypes$Z = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    children: PropTypes__default["default"].node,
    defaultOpen: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].string]),
    stayOpen: PropTypes__default["default"].bool
  };
  var defaultProps$Y = {
    tag: 'div'
  };

  var UncontrolledAccordion = function UncontrolledAccordion(_ref) {
    var defaultOpen = _ref.defaultOpen,
        stayOpen = _ref.stayOpen,
        props = _objectWithoutPropertiesLoose(_ref, _excluded$U);

    var _useState = React.useState(defaultOpen || (stayOpen ? [] : undefined)),
        open = _useState[0],
        setOpen = _useState[1];

    var toggle = function toggle(id) {
      if (stayOpen) {
        open.includes(id) ? setOpen(open.filter(function (accordionId) {
          return accordionId !== id;
        })) : setOpen([].concat(open, [id]));
      } else {
        open === id ? setOpen(undefined) : setOpen(id);
      }
    };

    return /*#__PURE__*/React__default["default"].createElement(Accordion$1, _extends({}, props, {
      open: open,
      toggle: toggle
    }));
  };

  Accordion$1.propTypes = propTypes$Z;
  Accordion$1.defaultProps = defaultProps$Y;
  var UncontrolledAccordion$1 = UncontrolledAccordion;

  var _excluded$T = ["className", "cssModule", "tag", "innerRef", "children", "targetId"];
  var propTypes$Y = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    children: PropTypes__default["default"].node,
    targetId: PropTypes__default["default"].string.isRequired
  };
  var defaultProps$X = {
    tag: 'h2'
  };

  var AccordionHeader = function AccordionHeader(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        children = props.children,
        targetId = props.targetId,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$T);

    var _useContext = React.useContext(AccordionContext),
        open = _useContext.open,
        toggle = _useContext.toggle;

    var classes = mapToCssModules(classNames__default["default"](className, 'accordion-header'), cssModule);
    var buttonClasses = mapToCssModules(classNames__default["default"]('accordion-button', {
      collapsed: !(Array.isArray(open) ? open.includes(targetId) : open === targetId)
    }), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      className: buttonClasses,
      onClick: function onClick() {
        return toggle(targetId);
      }
    }, children));
  };

  AccordionHeader.propTypes = propTypes$Y;
  AccordionHeader.defaultProps = defaultProps$X;
  var AccordionHeader$1 = AccordionHeader;

  var _excluded$S = ["className", "cssModule", "tag", "innerRef"];
  var propTypes$X = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    children: PropTypes__default["default"].node
  };
  var defaultProps$W = {
    tag: 'div'
  };

  var AccordionItem$2 = function AccordionItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$S);

    var classes = mapToCssModules(classNames__default["default"](className, 'accordion-item'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  AccordionItem$2.propTypes = propTypes$X;
  AccordionItem$2.defaultProps = defaultProps$W;
  var AccordionItem$3 = AccordionItem$2;

  var _excluded$R = ["tag", "horizontal", "isOpen", "className", "navbar", "cssModule", "children", "innerRef"];

  var _transitionStatusToCl;

  var propTypes$W = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.propTypes), {}, {
    horizontal: PropTypes__default["default"].bool,
    isOpen: PropTypes__default["default"].bool,
    children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
    tag: tagPropType,
    className: PropTypes__default["default"].node,
    navbar: PropTypes__default["default"].bool,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].string, PropTypes__default["default"].object])
  });

  var defaultProps$V = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.defaultProps), {}, {
    horizontal: false,
    isOpen: false,
    appear: false,
    enter: true,
    exit: true,
    tag: 'div',
    timeout: TransitionTimeouts.Collapse
  });

  var transitionStatusToClassHash = (_transitionStatusToCl = {}, _transitionStatusToCl[TransitionStatuses.ENTERING] = 'collapsing', _transitionStatusToCl[TransitionStatuses.ENTERED] = 'collapse show', _transitionStatusToCl[TransitionStatuses.EXITING] = 'collapsing', _transitionStatusToCl[TransitionStatuses.EXITED] = 'collapse', _transitionStatusToCl);

  function getTransitionClass(status) {
    return transitionStatusToClassHash[status] || 'collapse';
  }

  var Collapse = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Collapse, _Component);

    function Collapse(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        dimension: null
      };
      ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(function (name) {
        _this[name] = _this[name].bind(_assertThisInitialized(_this));
      });
      return _this;
    }

    var _proto = Collapse.prototype;

    _proto.getDimension = function getDimension(node) {
      return this.props.horizontal ? node.scrollWidth : node.scrollHeight;
    };

    _proto.onEntering = function onEntering(node, isAppearing) {
      this.setState({
        dimension: this.getDimension(node)
      });
      this.props.onEntering(node, isAppearing);
    };

    _proto.onEntered = function onEntered(node, isAppearing) {
      this.setState({
        dimension: null
      });
      this.props.onEntered(node, isAppearing);
    };

    _proto.onExit = function onExit(node) {
      this.setState({
        dimension: this.getDimension(node)
      });
      this.props.onExit(node);
    };

    _proto.onExiting = function onExiting(node) {
      // getting this variable triggers a reflow
      this.getDimension(node); // eslint-disable-line no-unused-vars


      this.setState({
        dimension: 0
      });
      this.props.onExiting(node);
    };

    _proto.onExited = function onExited(node) {
      this.setState({
        dimension: null
      });
      this.props.onExited(node);
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          Tag = _this$props.tag,
          horizontal = _this$props.horizontal,
          isOpen = _this$props.isOpen,
          className = _this$props.className,
          navbar = _this$props.navbar,
          cssModule = _this$props.cssModule,
          children = _this$props.children,
          otherProps = _objectWithoutPropertiesLoose(_this$props, _excluded$R);

      var dimension = this.state.dimension;
      var transitionProps = pick(otherProps, TransitionPropTypeKeys);
      var childProps = omit(otherProps, TransitionPropTypeKeys);
      return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.Transition, _extends({}, transitionProps, {
        "in": isOpen,
        onEntering: this.onEntering,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExiting: this.onExiting,
        onExited: this.onExited
      }), function (status) {
        var _ref;

        var collapseClass = getTransitionClass(status);
        var classes = mapToCssModules(classNames__default["default"](className, horizontal && 'collapse-horizontal', collapseClass, navbar && 'navbar-collapse'), cssModule);
        var style = dimension === null ? null : (_ref = {}, _ref[horizontal ? 'width' : 'height'] = dimension, _ref);
        return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, childProps, {
          style: _objectSpread2(_objectSpread2({}, childProps.style), style),
          className: classes,
          ref: _this2.props.innerRef
        }), children);
      });
    };

    return Collapse;
  }(React.Component);

  Collapse.propTypes = propTypes$W;
  Collapse.defaultProps = defaultProps$V;
  var Collapse$1 = Collapse;

  var _excluded$Q = ["className", "cssModule", "tag", "innerRef", "children", "accordionId"];
  var propTypes$V = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    children: PropTypes__default["default"].node,
    accordionId: PropTypes__default["default"].string.isRequired
  };
  var defaultProps$U = {
    tag: 'div'
  };

  var AccordionItem = function AccordionItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        children = props.children,
        accordionId = props.accordionId,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$Q);

    var _useContext = React.useContext(AccordionContext),
        open = _useContext.open;

    var classes = mapToCssModules(classNames__default["default"](className, 'accordion-collapse'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Collapse$1, _extends({}, attributes, {
      className: classes,
      ref: innerRef,
      isOpen: Array.isArray(open) ? open.includes(accordionId) : open === accordionId
    }), /*#__PURE__*/React__default["default"].createElement(Tag, {
      className: "accordion-body"
    }, children));
  };

  AccordionItem.propTypes = propTypes$V;
  AccordionItem.defaultProps = defaultProps$U;
  var AccordionItem$1 = AccordionItem;

  var _excluded$P = ["className", "cssModule", "color", "innerRef", "pill", "tag"];
  var propTypes$U = {
    color: PropTypes__default["default"].string,
    pill: PropTypes__default["default"].bool,
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$T = {
    color: 'secondary',
    pill: false,
    tag: 'span'
  };

  var Badge = function Badge(props) {
    var className = props.className,
        cssModule = props.cssModule,
        color = props.color,
        innerRef = props.innerRef,
        pill = props.pill,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$P);

    var classes = mapToCssModules(classNames__default["default"](className, 'badge', 'bg-' + color, pill ? 'rounded-pill' : false), cssModule);

    if (attributes.href && Tag === 'span') {
      Tag = 'a';
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  Badge.propTypes = propTypes$U;
  Badge.defaultProps = defaultProps$T;
  var Badge$1 = Badge;

  var _excluded$O = ["className", "cssModule", "color", "body", "inverse", "outline", "tag", "innerRef"];
  var propTypes$T = {
    tag: tagPropType,
    inverse: PropTypes__default["default"].bool,
    color: PropTypes__default["default"].string,
    body: PropTypes__default["default"].bool,
    outline: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  };
  var defaultProps$S = {
    tag: 'div'
  };

  var Card = function Card(props) {
    var className = props.className,
        cssModule = props.cssModule,
        color = props.color,
        body = props.body,
        inverse = props.inverse,
        outline = props.outline,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$O);

    var classes = mapToCssModules(classNames__default["default"](className, 'card', inverse ? 'text-white' : false, body ? 'card-body' : false, color ? (outline ? 'border' : 'bg') + "-" + color : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  Card.propTypes = propTypes$T;
  Card.defaultProps = defaultProps$S;
  var Card$1 = Card;

  var _excluded$N = ["className", "cssModule", "tag"];
  var propTypes$S = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$R = {
    tag: 'div'
  };

  var CardGroup = function CardGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$N);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-group'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardGroup.propTypes = propTypes$S;
  CardGroup.defaultProps = defaultProps$R;
  var CardGroup$1 = CardGroup;

  var _excluded$M = ["className", "cssModule", "tag"];
  var propTypes$R = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$Q = {
    tag: 'div'
  };

  var CardDeck = function CardDeck(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$M);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-deck'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardDeck.propTypes = propTypes$R;
  CardDeck.defaultProps = defaultProps$Q;
  var CardDeck$1 = CardDeck;

  var _excluded$L = ["className", "cssModule", "tag"];
  var propTypes$Q = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$P = {
    tag: 'div'
  };

  var CardColumns = function CardColumns(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$L);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-columns'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardColumns.propTypes = propTypes$Q;
  CardColumns.defaultProps = defaultProps$P;
  var CardColumns$1 = CardColumns;

  var _excluded$K = ["className", "cssModule", "innerRef", "tag"];
  var propTypes$P = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  };
  var defaultProps$O = {
    tag: 'div'
  };

  var CardBody = function CardBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        innerRef = props.innerRef,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$K);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-body'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  CardBody.propTypes = propTypes$P;
  CardBody.defaultProps = defaultProps$O;
  var CardBody$1 = CardBody;

  var _excluded$J = ["className", "cssModule", "tag", "innerRef"];
  var propTypes$O = {
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$N = {
    tag: 'a'
  };

  var CardLink = function CardLink(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$J);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-link'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes
    }));
  };

  CardLink.propTypes = propTypes$O;
  CardLink.defaultProps = defaultProps$N;
  var CardLink$1 = CardLink;

  var _excluded$I = ["className", "cssModule", "tag"];
  var propTypes$N = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$M = {
    tag: 'div'
  };

  var CardFooter = function CardFooter(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$I);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-footer'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardFooter.propTypes = propTypes$N;
  CardFooter.defaultProps = defaultProps$M;
  var CardFooter$1 = CardFooter;

  var _excluded$H = ["className", "cssModule", "tag"];
  var propTypes$M = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$L = {
    tag: 'div'
  };

  var CardHeader = function CardHeader(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$H);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-header'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardHeader.propTypes = propTypes$M;
  CardHeader.defaultProps = defaultProps$L;
  var CardHeader$1 = CardHeader;

  var _excluded$G = ["className", "cssModule", "top", "bottom", "tag"];
  var propTypes$L = {
    tag: tagPropType,
    top: PropTypes__default["default"].bool,
    bottom: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$K = {
    tag: 'img'
  };

  var CardImg = function CardImg(props) {
    var className = props.className,
        cssModule = props.cssModule,
        top = props.top,
        bottom = props.bottom,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$G);

    var cardImgClassName = 'card-img';

    if (top) {
      cardImgClassName = 'card-img-top';
    }

    if (bottom) {
      cardImgClassName = 'card-img-bottom';
    }

    var classes = mapToCssModules(classNames__default["default"](className, cardImgClassName), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardImg.propTypes = propTypes$L;
  CardImg.defaultProps = defaultProps$K;
  var CardImg$1 = CardImg;

  var _excluded$F = ["className", "cssModule", "tag"];
  var propTypes$K = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$J = {
    tag: 'div'
  };

  var CardImgOverlay = function CardImgOverlay(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$F);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-img-overlay'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardImgOverlay.propTypes = propTypes$K;
  CardImgOverlay.defaultProps = defaultProps$J;
  var CardImgOverlay$1 = CardImgOverlay;

  var _excluded$E = ["in", "children", "cssModule", "slide", "tag", "className"];

  var CarouselItem = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(CarouselItem, _React$Component);

    function CarouselItem(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        startAnimation: false
      };
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_this));
      _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = CarouselItem.prototype;

    _proto.onEnter = function onEnter(node, isAppearing) {
      this.setState({
        startAnimation: false
      });
      this.props.onEnter(node, isAppearing);
    };

    _proto.onEntering = function onEntering(node, isAppearing) {
      // getting this variable triggers a reflow
      var offsetHeight = node.offsetHeight;
      this.setState({
        startAnimation: true
      });
      this.props.onEntering(node, isAppearing);
      return offsetHeight;
    };

    _proto.onExit = function onExit(node) {
      this.setState({
        startAnimation: false
      });
      this.props.onExit(node);
    };

    _proto.onExiting = function onExiting(node) {
      this.setState({
        startAnimation: true
      });
      node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
      this.props.onExiting(node);
    };

    _proto.onExited = function onExited(node) {
      node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
      this.props.onExited(node);
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          isIn = _this$props["in"],
          children = _this$props.children,
          cssModule = _this$props.cssModule,
          slide = _this$props.slide,
          Tag = _this$props.tag,
          className = _this$props.className,
          transitionProps = _objectWithoutPropertiesLoose(_this$props, _excluded$E);

      return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.Transition, _extends({}, transitionProps, {
        enter: slide,
        exit: slide,
        "in": isIn,
        onEnter: this.onEnter,
        onEntering: this.onEntering,
        onExit: this.onExit,
        onExiting: this.onExiting,
        onExited: this.onExited
      }), function (status) {
        var direction = _this2.context.direction;
        var isActive = status === TransitionStatuses.ENTERED || status === TransitionStatuses.EXITING;
        var directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) && _this2.state.startAnimation && (direction === 'end' ? 'carousel-item-start' : 'carousel-item-end');
        var orderClassName = status === TransitionStatuses.ENTERING && (direction === 'end' ? 'carousel-item-next' : 'carousel-item-prev');
        var itemClasses = mapToCssModules(classNames__default["default"](className, 'carousel-item', isActive && 'active', directionClassName, orderClassName), cssModule);
        return /*#__PURE__*/React__default["default"].createElement(Tag, {
          className: itemClasses
        }, children);
      });
    };

    return CarouselItem;
  }(React__default["default"].Component);

  CarouselItem.propTypes = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.propTypes), {}, {
    tag: tagPropType,
    "in": PropTypes__default["default"].bool,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].node,
    slide: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string
  });
  CarouselItem.defaultProps = _objectSpread2(_objectSpread2({}, reactTransitionGroup.Transition.defaultProps), {}, {
    tag: 'div',
    timeout: TransitionTimeouts.Carousel,
    slide: true
  });
  CarouselItem.contextTypes = {
    direction: PropTypes__default["default"].string
  };
  var CarouselItem$1 = CarouselItem;

  /**
   * CarouselContext
   * {
   *  direction: PropTypes.oneOf(['start', 'end']).isRequired,
   * }
   */

  var CarouselContext = React__default["default"].createContext({});

  var SWIPE_THRESHOLD = 40;

  var Carousel = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Carousel, _React$Component);

    function Carousel(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
      _this.renderItems = _this.renderItems.bind(_assertThisInitialized(_this));
      _this.hoverStart = _this.hoverStart.bind(_assertThisInitialized(_this));
      _this.hoverEnd = _this.hoverEnd.bind(_assertThisInitialized(_this));
      _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_this));
      _this.handleTouchEnd = _this.handleTouchEnd.bind(_assertThisInitialized(_this));
      _this.touchStartX = 0;
      _this.touchStartY = 0;
      _this.state = {
        activeIndex: _this.props.activeIndex,
        direction: 'end',
        indicatorClicked: false
      };
      return _this;
    }

    var _proto = Carousel.prototype;

    _proto.getContextValue = function getContextValue() {
      return {
        direction: this.state.direction
      };
    };

    _proto.componentDidMount = function componentDidMount() {
      // Set up the cycle
      if (this.props.ride === 'carousel') {
        this.setInterval();
      } // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.


      document.addEventListener('keyup', this.handleKeyPress);
    };

    Carousel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      var newState = null;
      var activeIndex = prevState.activeIndex,
          direction = prevState.direction,
          indicatorClicked = prevState.indicatorClicked;

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
          direction: direction,
          indicatorClicked: false
        };
      }

      return newState;
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (prevState.activeIndex === this.state.activeIndex) return;
      this.setInterval(this.props);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.clearInterval();
      document.removeEventListener('keyup', this.handleKeyPress);
    };

    _proto.setInterval = function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (props) {
      if (props === void 0) {
        props = this.props;
      }

      // make sure not to have multiple intervals going...
      this.clearInterval();

      if (props.interval) {
        this.cycleInterval = setInterval(function () {
          props.next();
        }, parseInt(props.interval, 10));
      }
    });

    _proto.clearInterval = function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      clearInterval(this.cycleInterval);
    });

    _proto.hoverStart = function hoverStart() {
      if (this.props.pause === 'hover') {
        this.clearInterval();
      }

      if (this.props.mouseEnter) {
        var _this$props;

        (_this$props = this.props).mouseEnter.apply(_this$props, [].slice.call(arguments));
      }
    };

    _proto.hoverEnd = function hoverEnd() {
      if (this.props.pause === 'hover') {
        this.setInterval();
      }

      if (this.props.mouseLeave) {
        var _this$props2;

        (_this$props2 = this.props).mouseLeave.apply(_this$props2, [].slice.call(arguments));
      }
    };

    _proto.handleKeyPress = function handleKeyPress(evt) {
      if (this.props.keyboard) {
        if (evt.keyCode === 37) {
          this.props.previous();
        } else if (evt.keyCode === 39) {
          this.props.next();
        }
      }
    };

    _proto.handleTouchStart = function handleTouchStart(e) {
      if (!this.props.enableTouch) {
        return;
      }

      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    };

    _proto.handleTouchEnd = function handleTouchEnd(e) {
      if (!this.props.enableTouch) {
        return;
      }

      var currentX = e.changedTouches[0].screenX;
      var currentY = e.changedTouches[0].screenY;
      var diffX = Math.abs(this.touchStartX - currentX);
      var diffY = Math.abs(this.touchStartY - currentY); // Don't swipe if Y-movement is bigger than X-movement

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
    };

    _proto.renderItems = function renderItems(carouselItems, className) {
      var _this2 = this;

      var slide = this.props.slide;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: className
      }, carouselItems.map(function (item, index) {
        var isIn = index === _this2.state.activeIndex;
        return React__default["default"].cloneElement(item, {
          "in": isIn,
          slide: slide
        });
      }));
    };

    _proto.render = function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          cssModule = _this$props3.cssModule,
          slide = _this$props3.slide,
          className = _this$props3.className,
          dark = _this$props3.dark,
          fade = _this$props3.fade;
      var outerClasses = mapToCssModules(classNames__default["default"](className, 'carousel', fade, slide && 'slide', dark && 'carousel-dark'), cssModule);
      var innerClasses = mapToCssModules(classNames__default["default"]('carousel-inner'), cssModule); // filter out booleans, null, or undefined

      var children = this.props.children.filter(function (child) {
        return child !== null && child !== undefined && typeof child !== 'boolean';
      });
      var slidesOnly = children.every(function (child) {
        return child.type === CarouselItem$1;
      }); // Rendering only slides

      if (slidesOnly) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: outerClasses,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, /*#__PURE__*/React__default["default"].createElement(CarouselContext.Provider, {
          value: this.getContextValue()
        }, this.renderItems(children, innerClasses)));
      } // Rendering slides and controls


      if (children[0] instanceof Array) {
        var _carouselItems = children[0];
        var _controlLeft = children[1];
        var _controlRight = children[2];
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: outerClasses,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, /*#__PURE__*/React__default["default"].createElement(CarouselContext.Provider, {
          value: this.getContextValue()
        }, this.renderItems(_carouselItems, innerClasses), _controlLeft, _controlRight));
      } // Rendering indicators, slides and controls


      var indicators = children[0];

      var wrappedOnClick = function wrappedOnClick(e) {
        if (typeof indicators.props.onClickHandler === 'function') {
          _this3.setState({
            indicatorClicked: true
          }, function () {
            return indicators.props.onClickHandler(e);
          });
        }
      };

      var wrappedIndicators = React__default["default"].cloneElement(indicators, {
        onClickHandler: wrappedOnClick
      });
      var carouselItems = children[1];
      var controlLeft = children[2];
      var controlRight = children[3];
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd
      }, /*#__PURE__*/React__default["default"].createElement(CarouselContext.Provider, {
        value: this.getContextValue()
      }, wrappedIndicators, this.renderItems(carouselItems, innerClasses), controlLeft, controlRight));
    };

    return Carousel;
  }(React__default["default"].Component);

  Carousel.propTypes = {
    // the current active slide of the carousel
    activeIndex: PropTypes__default["default"].number,
    // a function which should advance the carousel to the next slide (via activeIndex)
    next: PropTypes__default["default"].func.isRequired,
    // a function which should advance the carousel to the previous slide (via activeIndex)
    previous: PropTypes__default["default"].func.isRequired,
    // controls if the left and right arrow keys should control the carousel
    keyboard: PropTypes__default["default"].bool,

    /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
     * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
     */
    pause: PropTypes__default["default"].oneOf(['hover', false]),
    // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
    // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
    ride: PropTypes__default["default"].oneOf(['carousel']),
    // the interval at which the carousel automatically cycles (default: 5000)
    // eslint-disable-next-line react/no-unused-prop-types
    interval: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string, PropTypes__default["default"].bool]),
    children: PropTypes__default["default"].array,
    // called when the mouse enters the Carousel
    mouseEnter: PropTypes__default["default"].func,
    // called when the mouse exits the Carousel
    mouseLeave: PropTypes__default["default"].func,
    // controls whether the slide animation on the Carousel works or not
    slide: PropTypes__default["default"].bool,
    // make the controls, indicators and captions dark on the Carousel
    dark: PropTypes__default["default"].bool,
    cssModule: PropTypes__default["default"].object,
    className: PropTypes__default["default"].string,
    enableTouch: PropTypes__default["default"].bool
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
    direction: PropTypes__default["default"].string
  };
  var Carousel$1 = Carousel;

  var CarouselControl = function CarouselControl(props) {
    var direction = props.direction,
        onClickHandler = props.onClickHandler,
        cssModule = props.cssModule,
        directionText = props.directionText,
        className = props.className;
    var anchorClasses = mapToCssModules(classNames__default["default"](className, "carousel-control-" + direction), cssModule);
    var iconClasses = mapToCssModules(classNames__default["default"]("carousel-control-" + direction + "-icon"), cssModule);
    var screenReaderClasses = mapToCssModules(classNames__default["default"]('visually-hidden'), cssModule);
    return (
      /*#__PURE__*/
      // We need to disable this linting rule to use an `<a>` instead of
      // `<button>` because that's what the Bootstrap examples require:
      // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      React__default["default"].createElement("a", {
        className: anchorClasses,
        style: {
          cursor: "pointer"
        },
        role: "button",
        tabIndex: "0",
        onClick: function onClick(e) {
          e.preventDefault();
          onClickHandler();
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: iconClasses,
        "aria-hidden": "true"
      }), /*#__PURE__*/React__default["default"].createElement("span", {
        className: screenReaderClasses
      }, directionText || direction))
    );
  };

  CarouselControl.propTypes = {
    direction: PropTypes__default["default"].oneOf(['prev', 'next']).isRequired,
    onClickHandler: PropTypes__default["default"].func.isRequired,
    cssModule: PropTypes__default["default"].object,
    directionText: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string
  };
  var CarouselControl$1 = CarouselControl;

  var CarouselIndicators = function CarouselIndicators(props) {
    var items = props.items,
        activeIndex = props.activeIndex,
        cssModule = props.cssModule,
        onClickHandler = props.onClickHandler,
        className = props.className;
    var listClasses = mapToCssModules(classNames__default["default"](className, 'carousel-indicators'), cssModule);
    var indicators = items.map(function (item, idx) {
      var indicatorClasses = mapToCssModules(classNames__default["default"]({
        active: activeIndex === idx
      }), cssModule);
      return /*#__PURE__*/React__default["default"].createElement("button", {
        "aria-label": item.caption,
        "data-bs-target": true,
        key: "" + (item.key || Object.values(item).join('')),
        onClick: function onClick(e) {
          e.preventDefault();
          onClickHandler(idx);
        },
        className: indicatorClasses
      }, item.caption);
    });
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: listClasses
    }, indicators);
  };

  CarouselIndicators.propTypes = {
    items: PropTypes__default["default"].array.isRequired,
    activeIndex: PropTypes__default["default"].number.isRequired,
    cssModule: PropTypes__default["default"].object,
    onClickHandler: PropTypes__default["default"].func.isRequired,
    className: PropTypes__default["default"].string
  };
  var CarouselIndicators$1 = CarouselIndicators;

  var CarouselCaption = function CarouselCaption(props) {
    var captionHeader = props.captionHeader,
        captionText = props.captionText,
        cssModule = props.cssModule,
        className = props.className;
    var classes = mapToCssModules(classNames__default["default"](className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: classes
    }, /*#__PURE__*/React__default["default"].createElement("h3", null, captionHeader), /*#__PURE__*/React__default["default"].createElement("p", null, captionText));
  };

  CarouselCaption.propTypes = {
    captionHeader: PropTypes__default["default"].node,
    captionText: PropTypes__default["default"].node.isRequired,
    cssModule: PropTypes__default["default"].object,
    className: PropTypes__default["default"].string
  };
  var CarouselCaption$1 = CarouselCaption;

  var _excluded$D = ["defaultActiveIndex", "autoPlay", "indicators", "controls", "items", "goToIndex"];
  var propTypes$J = {
    items: PropTypes__default["default"].array.isRequired,
    indicators: PropTypes__default["default"].bool,
    controls: PropTypes__default["default"].bool,
    autoPlay: PropTypes__default["default"].bool,
    defaultActiveIndex: PropTypes__default["default"].number,
    activeIndex: PropTypes__default["default"].number,
    next: PropTypes__default["default"].func,
    previous: PropTypes__default["default"].func,
    goToIndex: PropTypes__default["default"].func
  };

  var UncontrolledCarousel = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledCarousel, _Component);

    function UncontrolledCarousel(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.animating = false;
      _this.state = {
        activeIndex: props.defaultActiveIndex || 0
      };
      _this.next = _this.next.bind(_assertThisInitialized(_this));
      _this.previous = _this.previous.bind(_assertThisInitialized(_this));
      _this.goToIndex = _this.goToIndex.bind(_assertThisInitialized(_this));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledCarousel.prototype;

    _proto.onExiting = function onExiting() {
      this.animating = true;
    };

    _proto.onExited = function onExited() {
      this.animating = false;
    };

    _proto.next = function next() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({
        activeIndex: nextIndex
      });
    };

    _proto.previous = function previous() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
      this.setState({
        activeIndex: nextIndex
      });
    };

    _proto.goToIndex = function goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({
        activeIndex: newIndex
      });
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          autoPlay = _this$props.autoPlay,
          indicators = _this$props.indicators,
          controls = _this$props.controls,
          items = _this$props.items,
          goToIndex = _this$props.goToIndex,
          props = _objectWithoutPropertiesLoose(_this$props, _excluded$D);

      var activeIndex = this.state.activeIndex;
      var slides = items.map(function (item) {
        var key = item.key || item.src;
        return /*#__PURE__*/React__default["default"].createElement(CarouselItem$1, {
          onExiting: _this2.onExiting,
          onExited: _this2.onExited,
          key: key
        }, /*#__PURE__*/React__default["default"].createElement("img", {
          className: "d-block w-100",
          src: item.src,
          alt: item.altText
        }), /*#__PURE__*/React__default["default"].createElement(CarouselCaption$1, {
          captionText: item.caption,
          captionHeader: item.header || item.caption
        }));
      });
      return /*#__PURE__*/React__default["default"].createElement(Carousel$1, _extends({
        activeIndex: activeIndex,
        next: this.next,
        previous: this.previous,
        ride: autoPlay ? 'carousel' : undefined
      }, props), indicators && /*#__PURE__*/React__default["default"].createElement(CarouselIndicators$1, {
        items: items,
        activeIndex: props.activeIndex || activeIndex,
        onClickHandler: goToIndex || this.goToIndex
      }), slides, controls && /*#__PURE__*/React__default["default"].createElement(CarouselControl$1, {
        direction: "prev",
        directionText: "Previous",
        onClickHandler: props.previous || this.previous
      }), controls && /*#__PURE__*/React__default["default"].createElement(CarouselControl$1, {
        direction: "next",
        directionText: "Next",
        onClickHandler: props.next || this.next
      }));
    };

    return UncontrolledCarousel;
  }(React.Component);

  UncontrolledCarousel.propTypes = propTypes$J;
  UncontrolledCarousel.defaultProps = {
    controls: true,
    indicators: true,
    autoPlay: true
  };
  var UncontrolledCarousel$1 = UncontrolledCarousel;

  var _excluded$C = ["className", "cssModule", "tag"];
  var propTypes$I = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$I = {
    tag: 'div'
  };

  var CardSubtitle = function CardSubtitle(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$C);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-subtitle'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardSubtitle.propTypes = propTypes$I;
  CardSubtitle.defaultProps = defaultProps$I;
  var CardSubtitle$1 = CardSubtitle;

  var _excluded$B = ["className", "cssModule", "tag"];
  var propTypes$H = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$H = {
    tag: 'p'
  };

  var CardText = function CardText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$B);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-text'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardText.propTypes = propTypes$H;
  CardText.defaultProps = defaultProps$H;
  var CardText$1 = CardText;

  var _excluded$A = ["className", "cssModule", "tag"];
  var propTypes$G = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$G = {
    tag: 'div'
  };

  var CardTitle = function CardTitle(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$A);

    var classes = mapToCssModules(classNames__default["default"](className, 'card-title'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardTitle.propTypes = propTypes$G;
  CardTitle.defaultProps = defaultProps$G;
  var CardTitle$1 = CardTitle;

  var _excluded$z = ["cssModule", "children", "isOpen", "flip", "target", "offset", "fallbackPlacements", "placementPrefix", "arrowClassName", "hideArrow", "popperClassName", "tag", "container", "modifiers", "strategy", "boundariesElement", "onClosed", "fade", "transition", "placement"];

  function noop$2() {}

  var propTypes$F = {
    children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].node, PropTypes__default["default"].func]).isRequired,
    popperClassName: PropTypes__default["default"].string,
    placement: PropTypes__default["default"].string,
    placementPrefix: PropTypes__default["default"].string,
    arrowClassName: PropTypes__default["default"].string,
    hideArrow: PropTypes__default["default"].bool,
    tag: tagPropType,
    isOpen: PropTypes__default["default"].bool.isRequired,
    cssModule: PropTypes__default["default"].object,
    offset: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number),
    fallbackPlacements: PropTypes__default["default"].array,
    flip: PropTypes__default["default"].bool,
    container: targetPropType,
    target: targetPropType.isRequired,
    modifiers: PropTypes__default["default"].array,
    strategy: PropTypes__default["default"].string,
    boundariesElement: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, DOMElement]),
    onClosed: PropTypes__default["default"].func,
    fade: PropTypes__default["default"].bool,
    transition: PropTypes__default["default"].shape(Fade.propTypes)
  };
  var defaultProps$F = {
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

  var PopperContent = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(PopperContent, _React$Component);

    function PopperContent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.setTargetNode = _this.setTargetNode.bind(_assertThisInitialized(_this));
      _this.getTargetNode = _this.getTargetNode.bind(_assertThisInitialized(_this));
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
      _this.onClosed = _this.onClosed.bind(_assertThisInitialized(_this));
      _this.state = {
        isOpen: props.isOpen
      };
      return _this;
    }

    PopperContent.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
      if (props.isOpen && !state.isOpen) {
        return {
          isOpen: props.isOpen
        };
      } else return null;
    };

    var _proto = PopperContent.prototype;

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
        this._element.childNodes[0].focus();
      }
    };

    _proto.setTargetNode = function setTargetNode(node) {
      this.targetNode = typeof node === 'string' ? getTarget(node) : node;
    };

    _proto.getTargetNode = function getTargetNode() {
      return this.targetNode;
    };

    _proto.getContainerNode = function getContainerNode() {
      return getTarget(this.props.container);
    };

    _proto.getRef = function getRef(ref) {
      this._element = ref;
    };

    _proto.onClosed = function onClosed() {
      this.props.onClosed();
      this.setState({
        isOpen: false
      });
    };

    _proto.renderChildren = function renderChildren() {
      var _this$props = this.props,
          cssModule = _this$props.cssModule,
          children = _this$props.children,
          isOpen = _this$props.isOpen,
          flip = _this$props.flip,
          offset = _this$props.offset,
          fallbackPlacements = _this$props.fallbackPlacements,
          placementPrefix = _this$props.placementPrefix,
          _arrowClassName = _this$props.arrowClassName,
          hideArrow = _this$props.hideArrow,
          _popperClassName = _this$props.popperClassName,
          tag = _this$props.tag,
          modifiers = _this$props.modifiers,
          strategy = _this$props.strategy,
          boundariesElement = _this$props.boundariesElement,
          fade = _this$props.fade,
          transition = _this$props.transition,
          placement = _this$props.placement,
          attrs = _objectWithoutPropertiesLoose(_this$props, _excluded$z);

      var arrowClassName = mapToCssModules(classNames__default["default"]('arrow', _arrowClassName), cssModule);
      var popperClassName = mapToCssModules(classNames__default["default"](_popperClassName, placementPrefix ? placementPrefix + "-auto" : ''), this.props.cssModule);
      var modifierNames = modifiers.map(function (m) {
        return m.name;
      });
      var baseModifiers = [{
        name: 'offset',
        options: {
          offset: offset
        }
      }, {
        name: 'flip',
        enabled: flip,
        options: {
          fallbackPlacements: fallbackPlacements
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: boundariesElement
        }
      }].filter(function (m) {
        return !modifierNames.includes(m.name);
      });
      var extendedModifiers = [].concat(baseModifiers, modifiers);

      var popperTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
        baseClass: fade ? transition.baseClass : '',
        timeout: fade ? transition.timeout : 0
      });

      return /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, popperTransition, attrs, {
        "in": isOpen,
        onExited: this.onClosed,
        tag: tag
      }), /*#__PURE__*/React__default["default"].createElement(reactPopper.Popper, {
        referenceElement: this.targetNode,
        modifiers: extendedModifiers,
        placement: placement,
        strategy: strategy
      }, function (_ref) {
        var ref = _ref.ref,
            style = _ref.style,
            popperPlacement = _ref.placement,
            isReferenceHidden = _ref.isReferenceHidden,
            arrowProps = _ref.arrowProps,
            update = _ref.update;
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: ref,
          style: style,
          className: popperClassName,
          "data-popper-placement": popperPlacement,
          "data-popper-reference-hidden": isReferenceHidden ? 'true' : undefined
        }, typeof children === 'function' ? children({
          update: update
        }) : children, !hideArrow && /*#__PURE__*/React__default["default"].createElement("span", {
          ref: arrowProps.ref,
          className: arrowClassName,
          style: arrowProps.style
        }));
      }));
    };

    _proto.render = function render() {
      this.setTargetNode(this.props.target);

      if (this.state.isOpen) {
        return this.props.container === 'inline' ? this.renderChildren() : ReactDOM__default["default"].createPortal( /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.getRef
        }, this.renderChildren()), this.getContainerNode());
      }

      return null;
    };

    return PopperContent;
  }(React__default["default"].Component);

  PopperContent.propTypes = propTypes$F;
  PopperContent.defaultProps = defaultProps$F;
  var PopperContent$1 = PopperContent;

  var PopperTargetHelper = function PopperTargetHelper(props, context) {
    context.popperManager.setTargetNode(getTarget(props.target));
    return null;
  };

  PopperTargetHelper.contextTypes = {
    popperManager: PropTypes__default["default"].object.isRequired
  };
  PopperTargetHelper.propTypes = {
    target: targetPropType.isRequired
  };
  var PopperTargetHelper$1 = PopperTargetHelper;

  var propTypes$E = {
    children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].node, PropTypes__default["default"].func]),
    placement: PropTypes__default["default"].oneOf(PopperPlacements),
    target: targetPropType.isRequired,
    container: targetPropType,
    isOpen: PropTypes__default["default"].bool,
    disabled: PropTypes__default["default"].bool,
    hideArrow: PropTypes__default["default"].bool,
    boundariesElement: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, DOMElement]),
    className: PropTypes__default["default"].string,
    innerClassName: PropTypes__default["default"].string,
    arrowClassName: PropTypes__default["default"].string,
    popperClassName: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    toggle: PropTypes__default["default"].func,
    autohide: PropTypes__default["default"].bool,
    placementPrefix: PropTypes__default["default"].string,
    delay: PropTypes__default["default"].oneOfType([PropTypes__default["default"].shape({
      show: PropTypes__default["default"].number,
      hide: PropTypes__default["default"].number
    }), PropTypes__default["default"].number]),
    modifiers: PropTypes__default["default"].array,
    strategy: PropTypes__default["default"].string,
    offset: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number),
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].string, PropTypes__default["default"].object]),
    trigger: PropTypes__default["default"].string,
    fade: PropTypes__default["default"].bool,
    flip: PropTypes__default["default"].bool
  };
  var DEFAULT_DELAYS = {
    show: 0,
    hide: 50
  };
  var defaultProps$E = {
    isOpen: false,
    hideArrow: false,
    autohide: false,
    delay: DEFAULT_DELAYS,
    toggle: function toggle() {},
    trigger: 'click',
    fade: true
  };

  function isInDOMSubtree(element, subtreeRoot) {
    return subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element));
  }

  function isInDOMSubtrees(element, subtreeRoots) {
    if (subtreeRoots === void 0) {
      subtreeRoots = [];
    }

    return subtreeRoots && subtreeRoots.length && subtreeRoots.filter(function (subTreeRoot) {
      return isInDOMSubtree(element, subTreeRoot);
    })[0];
  }

  var TooltipPopoverWrapper = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(TooltipPopoverWrapper, _React$Component);

    function TooltipPopoverWrapper(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this._targets = [];
      _this.currentTargetElement = null;
      _this.addTargetEvents = _this.addTargetEvents.bind(_assertThisInitialized(_this));
      _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
      _this.removeTargetEvents = _this.removeTargetEvents.bind(_assertThisInitialized(_this));
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.showWithDelay = _this.showWithDelay.bind(_assertThisInitialized(_this));
      _this.hideWithDelay = _this.hideWithDelay.bind(_assertThisInitialized(_this));
      _this.onMouseOverTooltipContent = _this.onMouseOverTooltipContent.bind(_assertThisInitialized(_this));
      _this.onMouseLeaveTooltipContent = _this.onMouseLeaveTooltipContent.bind(_assertThisInitialized(_this));
      _this.show = _this.show.bind(_assertThisInitialized(_this));
      _this.hide = _this.hide.bind(_assertThisInitialized(_this));
      _this.onEscKeyDown = _this.onEscKeyDown.bind(_assertThisInitialized(_this));
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
      _this.state = {
        isOpen: props.isOpen
      };
      _this._isMounted = false;
      return _this;
    }

    var _proto = TooltipPopoverWrapper.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._isMounted = true;
      this.updateTarget();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._isMounted = false;
      this.removeTargetEvents();
      this._targets = null;
      this.clearShowTimeout();
      this.clearHideTimeout();
    };

    TooltipPopoverWrapper.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
      if (props.isOpen && !state.isOpen) {
        return {
          isOpen: props.isOpen
        };
      } else return null;
    };

    _proto.onMouseOverTooltipContent = function onMouseOverTooltipContent() {
      if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._hideTimeout) {
          this.clearHideTimeout();
        }

        if (this.state.isOpen && !this.props.isOpen) {
          this.toggle();
        }
      }
    };

    _proto.onMouseLeaveTooltipContent = function onMouseLeaveTooltipContent(e) {
      if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._showTimeout) {
          this.clearShowTimeout();
        }

        e.persist();
        this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
      }
    };

    _proto.onEscKeyDown = function onEscKeyDown(e) {
      if (e.key === 'Escape') {
        this.hide(e);
      }
    };

    _proto.getRef = function getRef(ref) {
      var innerRef = this.props.innerRef;

      if (innerRef) {
        if (typeof innerRef === 'function') {
          innerRef(ref);
        } else if (typeof innerRef === 'object') {
          innerRef.current = ref;
        }
      }

      this._popover = ref;
    };

    _proto.getDelay = function getDelay(key) {
      var delay = this.props.delay;

      if (typeof delay === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
      }

      return delay;
    };

    _proto.getCurrentTarget = function getCurrentTarget(target) {
      if (!target) return null;

      var index = this._targets.indexOf(target);

      if (index >= 0) return this._targets[index];
      return this.getCurrentTarget(target.parentElement);
    };

    _proto.show = function show(e) {
      if (!this.props.isOpen) {
        this.clearShowTimeout();
        this.currentTargetElement = e ? e.currentTarget || this.getCurrentTarget(e.target) : null;

        if (e && e.composedPath && typeof e.composedPath === 'function') {
          var path = e.composedPath();
          this.currentTargetElement = path && path[0] || this.currentTargetElement;
        }

        this.toggle(e);
      }
    };

    _proto.showWithDelay = function showWithDelay(e) {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }

      this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay('show'));
    };

    _proto.hide = function hide(e) {
      if (this.props.isOpen) {
        this.clearHideTimeout();
        this.currentTargetElement = null;
        this.toggle(e);
      }
    };

    _proto.hideWithDelay = function hideWithDelay(e) {
      if (this._showTimeout) {
        this.clearShowTimeout();
      }

      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
    };

    _proto.clearShowTimeout = function clearShowTimeout() {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    };

    _proto.clearHideTimeout = function clearHideTimeout() {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    };

    _proto.handleDocumentClick = function handleDocumentClick(e) {
      var triggers = this.props.trigger.split(' ');

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
    };

    _proto.addEventOnTargets = function addEventOnTargets(type, handler, isBubble) {
      this._targets.forEach(function (target) {
        target.addEventListener(type, handler, isBubble);
      });
    };

    _proto.removeEventOnTargets = function removeEventOnTargets(type, handler, isBubble) {
      this._targets.forEach(function (target) {
        target.removeEventListener(type, handler, isBubble);
      });
    };

    _proto.addTargetEvents = function addTargetEvents() {
      if (this.props.trigger) {
        var triggers = this.props.trigger.split(' ');

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
    };

    _proto.removeTargetEvents = function removeTargetEvents() {
      if (this._targets) {
        this.removeEventOnTargets('mouseover', this.showWithDelay, true);
        this.removeEventOnTargets('mouseout', this.hideWithDelay, true);
        this.removeEventOnTargets('keydown', this.onEscKeyDown, true);
        this.removeEventOnTargets('focusin', this.show, true);
        this.removeEventOnTargets('focusout', this.hide, true);
      }

      document.removeEventListener('click', this.handleDocumentClick, true);
    };

    _proto.updateTarget = function updateTarget() {
      var newTarget = getTarget(this.props.target, true);

      if (newTarget !== this._targets) {
        this.removeTargetEvents();
        this._targets = newTarget ? Array.from(newTarget) : [];
        this.currentTargetElement = this.currentTargetElement || this._targets[0];
        this.addTargetEvents();
      }
    };

    _proto.toggle = function toggle(e) {
      if (this.props.disabled || !this._isMounted) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    };

    _proto.render = function render() {
      var _this2 = this;

      if (this.props.isOpen) {
        this.updateTarget();
      }

      var target = this.currentTargetElement || this._targets[0];

      if (!target) {
        return null;
      }

      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          innerClassName = _this$props.innerClassName,
          isOpen = _this$props.isOpen,
          hideArrow = _this$props.hideArrow,
          boundariesElement = _this$props.boundariesElement,
          placement = _this$props.placement,
          placementPrefix = _this$props.placementPrefix,
          arrowClassName = _this$props.arrowClassName,
          popperClassName = _this$props.popperClassName,
          container = _this$props.container,
          modifiers = _this$props.modifiers,
          strategy = _this$props.strategy,
          offset = _this$props.offset,
          fade = _this$props.fade,
          flip = _this$props.flip,
          children = _this$props.children;
      var attributes = omit(this.props, Object.keys(propTypes$E));
      var popperClasses = mapToCssModules(popperClassName, cssModule);
      var classes = mapToCssModules(innerClassName, cssModule);
      return /*#__PURE__*/React__default["default"].createElement(PopperContent$1, {
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
      }, function (_ref) {
        var update = _ref.update;
        return /*#__PURE__*/React__default["default"].createElement("div", _extends({}, attributes, {
          ref: _this2.getRef,
          className: classes,
          role: "tooltip",
          onMouseOver: _this2.onMouseOverTooltipContent,
          onMouseLeave: _this2.onMouseLeaveTooltipContent,
          onKeyDown: _this2.onEscKeyDown
        }), typeof children === 'function' ? children({
          update: update
        }) : children);
      });
    };

    return TooltipPopoverWrapper;
  }(React__default["default"].Component);

  TooltipPopoverWrapper.propTypes = propTypes$E;
  TooltipPopoverWrapper.defaultProps = defaultProps$E;
  var TooltipPopoverWrapper$1 = TooltipPopoverWrapper;

  var defaultProps$D = {
    placement: 'right',
    placementPrefix: 'bs-popover',
    trigger: 'click',
    offset: [0, 8]
  };

  var Popover = function Popover(props) {
    var popperClasses = classNames__default["default"]('popover', 'show', props.popperClassName);
    var classes = classNames__default["default"]('popover-inner', props.innerClassName);
    return /*#__PURE__*/React__default["default"].createElement(TooltipPopoverWrapper$1, _extends({}, props, {
      arrowClassName: "popover-arrow",
      popperClassName: popperClasses,
      innerClassName: classes
    }));
  };

  Popover.propTypes = propTypes$E;
  Popover.defaultProps = defaultProps$D;
  var Popover$1 = Popover;

  var omitKeys$4 = ['defaultOpen'];

  var UncontrolledPopover = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledPopover, _Component);

    function UncontrolledPopover(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledPopover.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(Popover$1, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$4)));
    };

    return UncontrolledPopover;
  }(React.Component);
  UncontrolledPopover.propTypes = _objectSpread2({
    defaultOpen: PropTypes__default["default"].bool
  }, Popover$1.propTypes);

  var _excluded$y = ["className", "cssModule", "tag"];
  var propTypes$D = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$C = {
    tag: 'h3'
  };

  var PopoverHeader = function PopoverHeader(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$y);

    var classes = mapToCssModules(classNames__default["default"](className, 'popover-header'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PopoverHeader.propTypes = propTypes$D;
  PopoverHeader.defaultProps = defaultProps$C;
  var PopoverHeader$1 = PopoverHeader;

  var _excluded$x = ["className", "cssModule", "tag"];
  var propTypes$C = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$B = {
    tag: 'div'
  };

  var PopoverBody = function PopoverBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$x);

    var classes = mapToCssModules(classNames__default["default"](className, 'popover-body'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PopoverBody.propTypes = propTypes$C;
  PopoverBody.defaultProps = defaultProps$B;
  var PopoverBody$1 = PopoverBody;

  var _excluded$w = ["children", "className", "barClassName", "cssModule", "value", "min", "max", "animated", "striped", "color", "bar", "multi", "tag", "style", "barStyle", "barAriaValueText", "barAriaLabelledBy"];
  var propTypes$B = {
    children: PropTypes__default["default"].node,
    bar: PropTypes__default["default"].bool,
    multi: PropTypes__default["default"].bool,
    tag: tagPropType,
    value: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
    min: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
    max: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
    animated: PropTypes__default["default"].bool,
    striped: PropTypes__default["default"].bool,
    color: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    barClassName: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    style: PropTypes__default["default"].object,
    barStyle: PropTypes__default["default"].object,
    barAriaValueText: PropTypes__default["default"].string,
    barAriaLabelledBy: PropTypes__default["default"].string
  };
  var defaultProps$A = {
    tag: 'div',
    value: 0,
    min: 0,
    max: 100,
    style: {},
    barStyle: {}
  };

  var Progress = function Progress(props) {
    var children = props.children,
        className = props.className,
        barClassName = props.barClassName,
        cssModule = props.cssModule,
        value = props.value,
        min = props.min,
        max = props.max,
        animated = props.animated,
        striped = props.striped,
        color = props.color,
        bar = props.bar,
        multi = props.multi,
        Tag = props.tag,
        style = props.style,
        barStyle = props.barStyle,
        barAriaValueText = props.barAriaValueText,
        barAriaLabelledBy = props.barAriaLabelledBy,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$w);

    var percent = toNumber(value) / toNumber(max) * 100;
    var progressClasses = mapToCssModules(classNames__default["default"](className, 'progress'), cssModule);
    var progressBarClasses = mapToCssModules(classNames__default["default"]('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? "bg-" + color : null, striped || animated ? 'progress-bar-striped' : null), cssModule);
    var progressBarProps = {
      className: progressBarClasses,
      style: _objectSpread2(_objectSpread2(_objectSpread2({}, bar ? style : {}), barStyle), {}, {
        width: percent + "%"
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
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, progressBarProps));
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      style: style,
      className: progressClasses
    }), multi ? children : /*#__PURE__*/React__default["default"].createElement("div", progressBarProps));
  };

  Progress.propTypes = propTypes$B;
  Progress.defaultProps = defaultProps$A;
  var Progress$1 = Progress;

  var propTypes$A = {
    children: PropTypes__default["default"].node.isRequired,
    node: PropTypes__default["default"].any
  };

  var Portal = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Portal, _React$Component);

    function Portal() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = Portal.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }

      this.defaultNode = null;
    };

    _proto.render = function render() {
      if (!canUseDOM) {
        return null;
      }

      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }

      return ReactDOM__default["default"].createPortal(this.props.children, this.props.node || this.defaultNode);
    };

    return Portal;
  }(React__default["default"].Component);

  Portal.propTypes = propTypes$A;
  var Portal$1 = Portal;

  function noop$1() {}

  var FadePropTypes$1 = PropTypes__default["default"].shape(Fade.propTypes);
  var propTypes$z = {
    isOpen: PropTypes__default["default"].bool,
    autoFocus: PropTypes__default["default"].bool,
    centered: PropTypes__default["default"].bool,
    fullscreen: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].oneOf(['sm', 'md', 'lg', 'xl'])]),
    scrollable: PropTypes__default["default"].bool,
    size: PropTypes__default["default"].string,
    toggle: PropTypes__default["default"].func,
    keyboard: PropTypes__default["default"].bool,
    role: PropTypes__default["default"].string,
    labelledBy: PropTypes__default["default"].string,
    backdrop: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].oneOf(['static'])]),
    onEnter: PropTypes__default["default"].func,
    onExit: PropTypes__default["default"].func,
    onOpened: PropTypes__default["default"].func,
    onClosed: PropTypes__default["default"].func,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    wrapClassName: PropTypes__default["default"].string,
    modalClassName: PropTypes__default["default"].string,
    backdropClassName: PropTypes__default["default"].string,
    contentClassName: PropTypes__default["default"].string,
    external: PropTypes__default["default"].node,
    fade: PropTypes__default["default"].bool,
    cssModule: PropTypes__default["default"].object,
    zIndex: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
    backdropTransition: FadePropTypes$1,
    modalTransition: FadePropTypes$1,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    unmountOnClose: PropTypes__default["default"].bool,
    returnFocusAfterClose: PropTypes__default["default"].bool,
    container: targetPropType,
    trapFocus: PropTypes__default["default"].bool
  };
  var propsToOmit$1 = Object.keys(propTypes$z);
  var defaultProps$z = {
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

  var Modal = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Modal, _React$Component);

    function Modal(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this._element = null;
      _this._originalBodyPadding = null;
      _this.getFocusableChildren = _this.getFocusableChildren.bind(_assertThisInitialized(_this));
      _this.handleBackdropClick = _this.handleBackdropClick.bind(_assertThisInitialized(_this));
      _this.handleBackdropMouseDown = _this.handleBackdropMouseDown.bind(_assertThisInitialized(_this));
      _this.handleEscape = _this.handleEscape.bind(_assertThisInitialized(_this));
      _this.handleStaticBackdropAnimation = _this.handleStaticBackdropAnimation.bind(_assertThisInitialized(_this));
      _this.handleTab = _this.handleTab.bind(_assertThisInitialized(_this));
      _this.onOpened = _this.onOpened.bind(_assertThisInitialized(_this));
      _this.onClosed = _this.onClosed.bind(_assertThisInitialized(_this));
      _this.manageFocusAfterClose = _this.manageFocusAfterClose.bind(_assertThisInitialized(_this));
      _this.clearBackdropAnimationTimeout = _this.clearBackdropAnimationTimeout.bind(_assertThisInitialized(_this));
      _this.trapFocus = _this.trapFocus.bind(_assertThisInitialized(_this));
      _this.state = {
        isOpen: false,
        showStaticBackdropAnimation: false
      };
      return _this;
    }

    var _proto = Modal.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          autoFocus = _this$props.autoFocus,
          onEnter = _this$props.onEnter;

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
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
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
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
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
    };

    _proto.trapFocus = function trapFocus(ev) {
      if (!this.props.trapFocus) {
        return;
      }

      if (!this._element) //element is not attached
        return;
      if (this._dialog && this._dialog.parentNode === ev.target) // initial focus when the Modal is opened
        return;
      if (this.modalIndex < Modal.openCount - 1) // last opened modal
        return;
      var children = this.getFocusableChildren();

      for (var i = 0; i < children.length; i++) {
        // focus is already inside the Modal
        if (children[i] === ev.target) return;
      }

      if (children.length > 0) {
        // otherwise focus the first focusable element in the Modal
        ev.preventDefault();
        ev.stopPropagation();
        children[0].focus();
      }
    };

    _proto.onOpened = function onOpened(node, isAppearing) {
      this.props.onOpened();
      (this.props.modalTransition.onEntered || noop$1)(node, isAppearing);
    };

    _proto.onClosed = function onClosed(node) {
      var unmountOnClose = this.props.unmountOnClose; // so all methods get called before it is unmounted

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
    };

    _proto.setFocus = function setFocus() {
      if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
        this._dialog.parentNode.focus();
      }
    };

    _proto.getFocusableChildren = function getFocusableChildren() {
      return this._element.querySelectorAll(focusableElements.join(', '));
    };

    _proto.getFocusedChild = function getFocusedChild() {
      var currentFocus;
      var focusableChildren = this.getFocusableChildren();

      try {
        currentFocus = document.activeElement;
      } catch (err) {
        currentFocus = focusableChildren[0];
      }

      return currentFocus;
    } // not mouseUp because scrollbar fires it, shouldn't close when user scrolls
    ;

    _proto.handleBackdropClick = function handleBackdropClick(e) {
      if (e.target === this._mouseDownElement) {
        e.stopPropagation();
        var backdrop = this._dialog ? this._dialog.parentNode : null;

        if (backdrop && e.target === backdrop && this.props.backdrop === 'static') {
          this.handleStaticBackdropAnimation();
        }

        if (!this.props.isOpen || this.props.backdrop !== true) return;

        if (backdrop && e.target === backdrop && this.props.toggle) {
          this.props.toggle(e);
        }
      }
    };

    _proto.handleTab = function handleTab(e) {
      if (e.which !== 9) return;
      if (this.modalIndex < Modal.openCount - 1) return; // last opened modal

      var focusableChildren = this.getFocusableChildren();
      var totalFocusable = focusableChildren.length;
      if (totalFocusable === 0) return;
      var currentFocus = this.getFocusedChild();
      var focusedIndex = 0;

      for (var i = 0; i < totalFocusable; i += 1) {
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
    };

    _proto.handleBackdropMouseDown = function handleBackdropMouseDown(e) {
      this._mouseDownElement = e.target;
    };

    _proto.handleEscape = function handleEscape(e) {
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
    };

    _proto.handleStaticBackdropAnimation = function handleStaticBackdropAnimation() {
      var _this2 = this;

      this.clearBackdropAnimationTimeout();
      this.setState({
        showStaticBackdropAnimation: true
      });
      this._backdropAnimationTimeout = setTimeout(function () {
        _this2.setState({
          showStaticBackdropAnimation: false
        });
      }, 100);
    };

    _proto.init = function init() {
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

      if (Modal.openCount === 0) {
        document.body.className = classNames__default["default"](document.body.className, mapToCssModules('modal-open', this.props.cssModule));
      }

      this.modalIndex = Modal.openCount;
      Modal.openCount += 1;
    };

    _proto.destroy = function destroy() {
      if (this._element) {
        this._mountContainer.removeChild(this._element);

        this._element = null;
      }

      this.manageFocusAfterClose();
    };

    _proto.manageFocusAfterClose = function manageFocusAfterClose() {
      if (this._triggeringElement) {
        var returnFocusAfterClose = this.props.returnFocusAfterClose;
        if (this._triggeringElement.focus && returnFocusAfterClose) this._triggeringElement.focus();
        this._triggeringElement = null;
      }
    };

    _proto.close = function close() {
      if (Modal.openCount <= 1) {
        var modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule); // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`

        var modalOpenClassNameRegex = new RegExp("(^| )" + modalOpenClassName + "( |$)");
        document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
      }

      this.manageFocusAfterClose();
      Modal.openCount = Math.max(0, Modal.openCount - 1);
      setScrollbarWidth(this._originalBodyPadding);
    };

    _proto.renderModalDialog = function renderModalDialog() {
      var _classNames,
          _this3 = this;

      var attributes = omit(this.props, propsToOmit$1);
      var dialogBaseClass = 'modal-dialog';
      return /*#__PURE__*/React__default["default"].createElement("div", _extends({}, attributes, {
        className: mapToCssModules(classNames__default["default"](dialogBaseClass, this.props.className, (_classNames = {}, _classNames["modal-" + this.props.size] = this.props.size, _classNames[dialogBaseClass + "-centered"] = this.props.centered, _classNames[dialogBaseClass + "-scrollable"] = this.props.scrollable, _classNames['modal-fullscreen'] = this.props.fullscreen === true, _classNames["modal-fullscreen-" + this.props.fullscreen + "-down"] = typeof this.props.fullscreen === 'string', _classNames)), this.props.cssModule),
        role: "document",
        ref: function ref(c) {
          _this3._dialog = c;
        }
      }), /*#__PURE__*/React__default["default"].createElement("div", {
        className: mapToCssModules(classNames__default["default"]('modal-content', this.props.contentClassName), this.props.cssModule)
      }, this.props.children));
    };

    _proto.render = function render() {
      var unmountOnClose = this.props.unmountOnClose;

      if (!!this._element && (this.state.isOpen || !unmountOnClose)) {
        var isModalHidden = !!this._element && !this.state.isOpen && !unmountOnClose;
        this._element.style.display = isModalHidden ? 'none' : 'block';
        var _this$props2 = this.props,
            wrapClassName = _this$props2.wrapClassName,
            modalClassName = _this$props2.modalClassName,
            backdropClassName = _this$props2.backdropClassName,
            cssModule = _this$props2.cssModule,
            isOpen = _this$props2.isOpen,
            backdrop = _this$props2.backdrop,
            role = _this$props2.role,
            labelledBy = _this$props2.labelledBy,
            external = _this$props2.external,
            innerRef = _this$props2.innerRef;
        var modalAttributes = {
          onClick: this.handleBackdropClick,
          onMouseDown: this.handleBackdropMouseDown,
          onKeyUp: this.handleEscape,
          onKeyDown: this.handleTab,
          style: {
            display: 'block'
          },
          'aria-labelledby': labelledBy,
          role: role,
          tabIndex: '-1'
        };
        var hasTransition = this.props.fade;

        var modalTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.modalTransition), {}, {
          baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
          timeout: hasTransition ? this.props.modalTransition.timeout : 0
        });

        var backdropTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.backdropTransition), {}, {
          baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
          timeout: hasTransition ? this.props.backdropTransition.timeout : 0
        });

        var Backdrop = backdrop && (hasTransition ? /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, backdropTransition, {
          "in": isOpen && !!backdrop,
          cssModule: cssModule,
          className: mapToCssModules(classNames__default["default"]('modal-backdrop', backdropClassName), cssModule)
        })) : /*#__PURE__*/React__default["default"].createElement("div", {
          className: mapToCssModules(classNames__default["default"]('modal-backdrop', 'show', backdropClassName), cssModule)
        }));
        return /*#__PURE__*/React__default["default"].createElement(Portal$1, {
          node: this._element
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: mapToCssModules(wrapClassName)
        }, /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, modalAttributes, modalTransition, {
          "in": isOpen,
          onEntered: this.onOpened,
          onExited: this.onClosed,
          cssModule: cssModule,
          className: mapToCssModules(classNames__default["default"]('modal', modalClassName, this.state.showStaticBackdropAnimation && 'modal-static'), cssModule),
          innerRef: innerRef
        }), external, this.renderModalDialog()), Backdrop));
      }

      return null;
    };

    _proto.clearBackdropAnimationTimeout = function clearBackdropAnimationTimeout() {
      if (this._backdropAnimationTimeout) {
        clearTimeout(this._backdropAnimationTimeout);
        this._backdropAnimationTimeout = undefined;
      }
    };

    return Modal;
  }(React__default["default"].Component);

  Modal.propTypes = propTypes$z;
  Modal.defaultProps = defaultProps$z;
  Modal.openCount = 0;
  var Modal$1 = Modal;

  var _excluded$v = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "close"];
  var propTypes$y = {
    tag: tagPropType,
    wrapTag: tagPropType,
    toggle: PropTypes__default["default"].func,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].node,
    closeAriaLabel: PropTypes__default["default"].string,
    close: PropTypes__default["default"].object
  };
  var defaultProps$y = {
    tag: 'h5',
    wrapTag: 'div',
    closeAriaLabel: 'Close'
  };

  var ModalHeader = function ModalHeader(props) {
    var closeButton;

    var className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        toggle = props.toggle,
        Tag = props.tag,
        WrapTag = props.wrapTag,
        closeAriaLabel = props.closeAriaLabel,
        close = props.close,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$v);

    var classes = mapToCssModules(classNames__default["default"](className, 'modal-header'), cssModule);

    if (!close && toggle) {
      closeButton = /*#__PURE__*/React__default["default"].createElement("button", {
        type: "button",
        onClick: toggle,
        className: mapToCssModules('btn-close', cssModule),
        "aria-label": closeAriaLabel
      });
    }

    return /*#__PURE__*/React__default["default"].createElement(WrapTag, _extends({}, attributes, {
      className: classes
    }), /*#__PURE__*/React__default["default"].createElement(Tag, {
      className: mapToCssModules('modal-title', cssModule)
    }, children), close || closeButton);
  };

  ModalHeader.propTypes = propTypes$y;
  ModalHeader.defaultProps = defaultProps$y;
  var ModalHeader$1 = ModalHeader;

  var _excluded$u = ["className", "cssModule", "tag"];
  var propTypes$x = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$x = {
    tag: 'div'
  };

  var ModalBody = function ModalBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$u);

    var classes = mapToCssModules(classNames__default["default"](className, 'modal-body'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ModalBody.propTypes = propTypes$x;
  ModalBody.defaultProps = defaultProps$x;
  var ModalBody$1 = ModalBody;

  var _excluded$t = ["className", "cssModule", "tag"];
  var propTypes$w = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$w = {
    tag: 'div'
  };

  var ModalFooter = function ModalFooter(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$t);

    var classes = mapToCssModules(classNames__default["default"](className, 'modal-footer'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ModalFooter.propTypes = propTypes$w;
  ModalFooter.defaultProps = defaultProps$w;
  var ModalFooter$1 = ModalFooter;

  var defaultProps$v = {
    placement: 'top',
    autohide: true,
    placementPrefix: 'bs-tooltip',
    trigger: 'hover focus'
  };

  var Tooltip = function Tooltip(props) {
    var popperClasses = classNames__default["default"]('tooltip', 'show', props.popperClassName);
    var classes = classNames__default["default"]('tooltip-inner', props.innerClassName);
    return /*#__PURE__*/React__default["default"].createElement(TooltipPopoverWrapper$1, _extends({}, props, {
      arrowClassName: "tooltip-arrow",
      popperClassName: popperClasses,
      innerClassName: classes
    }));
  };

  Tooltip.propTypes = propTypes$E;
  Tooltip.defaultProps = defaultProps$v;
  var Tooltip$1 = Tooltip;

  var _excluded$s = ["className", "cssModule", "size", "bordered", "borderless", "striped", "dark", "hover", "responsive", "tag", "responsiveTag", "innerRef"];
  var propTypes$v = {
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    size: PropTypes__default["default"].string,
    bordered: PropTypes__default["default"].bool,
    borderless: PropTypes__default["default"].bool,
    striped: PropTypes__default["default"].bool,
    dark: PropTypes__default["default"].bool,
    hover: PropTypes__default["default"].bool,
    responsive: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    tag: tagPropType,
    responsiveTag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].string, PropTypes__default["default"].object])
  };
  var defaultProps$u = {
    tag: 'table',
    responsiveTag: 'div'
  };

  var Table = function Table(props) {
    var className = props.className,
        cssModule = props.cssModule,
        size = props.size,
        bordered = props.bordered,
        borderless = props.borderless,
        striped = props.striped,
        dark = props.dark,
        hover = props.hover,
        responsive = props.responsive,
        Tag = props.tag,
        ResponsiveTag = props.responsiveTag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$s);

    var classes = mapToCssModules(classNames__default["default"](className, 'table', size ? 'table-' + size : false, bordered ? 'table-bordered' : false, borderless ? 'table-borderless' : false, striped ? 'table-striped' : false, dark ? 'table-dark' : false, hover ? 'table-hover' : false), cssModule);
    var table = /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes
    }));

    if (responsive) {
      var responsiveClassName = mapToCssModules(responsive === true ? 'table-responsive' : "table-responsive-" + responsive, cssModule);
      return /*#__PURE__*/React__default["default"].createElement(ResponsiveTag, {
        className: responsiveClassName
      }, table);
    }

    return table;
  };

  Table.propTypes = propTypes$v;
  Table.defaultProps = defaultProps$u;
  var Table$1 = Table;

  var _excluded$r = ["className", "cssModule", "tag", "flush", "horizontal", "numbered"];
  var propTypes$u = {
    tag: tagPropType,
    flush: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    horizontal: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
    numbered: PropTypes__default["default"].bool
  };
  var defaultProps$t = {
    tag: 'ul',
    horizontal: false,
    numbered: false
  };

  var getHorizontalClass = function getHorizontalClass(horizontal) {
    if (horizontal === false) {
      return false;
    } else if (horizontal === true || horizontal === "xs") {
      return "list-group-horizontal";
    }

    return "list-group-horizontal-" + horizontal;
  };

  var ListGroup = function ListGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        flush = props.flush,
        horizontal = props.horizontal,
        numbered = props.numbered,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$r);

    var classes = mapToCssModules(classNames__default["default"](className, 'list-group', // list-group-horizontal cannot currently be mixed with list-group-flush
    // we only try to apply horizontal classes if flush is false
    flush ? 'list-group-flush' : getHorizontalClass(horizontal), {
      'list-group-numbered': numbered
    }), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroup.propTypes = propTypes$u;
  ListGroup.defaultProps = defaultProps$t;
  var ListGroup$1 = ListGroup;

  var _excluded$q = ["className", "cssModule", "inline", "tag", "innerRef"];
  var propTypes$t = {
    children: PropTypes__default["default"].node,
    inline: PropTypes__default["default"].bool,
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$s = {
    tag: 'form'
  };

  var Form = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Form, _Component);

    function Form(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
      _this.submit = _this.submit.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = Form.prototype;

    _proto.getRef = function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    };

    _proto.submit = function submit() {
      if (this.ref) {
        this.ref.submit();
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          inline = _this$props.inline,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, _excluded$q);

      var classes = mapToCssModules(classNames__default["default"](className, inline ? 'form-inline' : false), cssModule);
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        className: classes
      }));
    };

    return Form;
  }(React.Component);

  Form.propTypes = propTypes$t;
  Form.defaultProps = defaultProps$s;
  var Form$1 = Form;

  var _excluded$p = ["className", "cssModule", "valid", "tooltip", "tag"];
  var propTypes$s = {
    children: PropTypes__default["default"].node,
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    valid: PropTypes__default["default"].bool,
    tooltip: PropTypes__default["default"].bool
  };
  var defaultProps$r = {
    tag: 'div',
    valid: undefined
  };

  var FormFeedback = function FormFeedback(props) {
    var className = props.className,
        cssModule = props.cssModule,
        valid = props.valid,
        tooltip = props.tooltip,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$p);

    var validMode = tooltip ? 'tooltip' : 'feedback';
    var classes = mapToCssModules(classNames__default["default"](className, valid ? "valid-" + validMode : "invalid-" + validMode), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormFeedback.propTypes = propTypes$s;
  FormFeedback.defaultProps = defaultProps$r;
  var FormFeedback$1 = FormFeedback;

  var _excluded$o = ["className", "cssModule", "row", "disabled", "check", "inline", "floating", "tag"];
  var propTypes$r = {
    children: PropTypes__default["default"].node,
    row: PropTypes__default["default"].bool,
    check: PropTypes__default["default"].bool,
    "switch": PropTypes__default["default"].bool,
    inline: PropTypes__default["default"].bool,
    floating: PropTypes__default["default"].bool,
    disabled: PropTypes__default["default"].bool,
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$q = {
    tag: 'div'
  };

  var FormGroup = function FormGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        row = props.row,
        disabled = props.disabled,
        check = props.check,
        inline = props.inline,
        floating = props.floating,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$o);

    var formCheck = check || props["switch"];
    var classes = mapToCssModules(classNames__default["default"](className, row ? 'row' : false, formCheck ? 'form-check' : 'mb-3', props["switch"] ? 'form-switch' : false, formCheck && inline ? 'form-check-inline' : false, formCheck && disabled ? 'disabled' : false, floating && 'form-floating'), cssModule);

    if (Tag === 'fieldset') {
      attributes.disabled = disabled;
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormGroup.propTypes = propTypes$r;
  FormGroup.defaultProps = defaultProps$q;
  var FormGroup$1 = FormGroup;

  var _excluded$n = ["className", "cssModule", "inline", "color", "tag"];
  var propTypes$q = {
    children: PropTypes__default["default"].node,
    inline: PropTypes__default["default"].bool,
    tag: tagPropType,
    color: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$p = {
    tag: 'small',
    color: 'muted'
  };

  var FormText = function FormText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        inline = props.inline,
        color = props.color,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$n);

    var classes = mapToCssModules(classNames__default["default"](className, !inline ? 'form-text' : false, color ? "text-" + color : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormText.propTypes = propTypes$q;
  FormText.defaultProps = defaultProps$p;
  var FormText$1 = FormText;

  var _excluded$m = ["className", "cssModule", "type", "bsSize", "valid", "invalid", "tag", "addon", "plaintext", "innerRef"];
  var propTypes$p = {
    children: PropTypes__default["default"].node,
    type: PropTypes__default["default"].string,
    size: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
    bsSize: PropTypes__default["default"].string,
    valid: PropTypes__default["default"].bool,
    invalid: PropTypes__default["default"].bool,
    tag: tagPropType,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    plaintext: PropTypes__default["default"].bool,
    addon: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$o = {
    type: 'text'
  };

  var Input = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Input, _React$Component);

    function Input(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
      _this.focus = _this.focus.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = Input.prototype;

    _proto.getRef = function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    };

    _proto.focus = function focus() {
      if (this.ref) {
        this.ref.focus();
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          type = _this$props.type,
          bsSize = _this$props.bsSize,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          tag = _this$props.tag,
          addon = _this$props.addon,
          plaintext = _this$props.plaintext,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, _excluded$m);

      var checkInput = ['switch', 'radio', 'checkbox'].indexOf(type) > -1;
      var isNotaNumber = new RegExp('\\D', 'g');
      var textareaInput = type === 'textarea';
      var selectInput = type === 'select';
      var rangeInput = type === 'range';
      var Tag = tag || (selectInput || textareaInput ? type : 'input');
      var formControlClass = 'form-control';

      if (plaintext) {
        formControlClass = formControlClass + "-plaintext";
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

      var classes = mapToCssModules(classNames__default["default"](className, invalid && 'is-invalid', valid && 'is-valid', bsSize ? selectInput ? "form-select-" + bsSize : "form-control-" + bsSize : false, formControlClass), cssModule);

      if (Tag === 'input' || tag && typeof tag === 'function') {
        attributes.type = type === 'switch' ? 'checkbox' : type;
      }

      if (attributes.children && !(plaintext || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
        warnOnce("Input with a type of \"" + type + "\" cannot have children. Please use \"value\"/\"defaultValue\" instead.");
        delete attributes.children;
      }

      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        className: classes,
        "aria-invalid": invalid
      }));
    };

    return Input;
  }(React__default["default"].Component);

  Input.propTypes = propTypes$p;
  Input.defaultProps = defaultProps$o;
  var Input$1 = Input;

  var _excluded$l = ["className", "cssModule", "tag", "type", "size"];
  var propTypes$o = {
    tag: tagPropType,
    type: PropTypes__default["default"].bool,
    size: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$n = {
    tag: 'div'
  };

  var InputGroup = function InputGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        size = props.size,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$l);

    var classes = mapToCssModules(classNames__default["default"](className, 'input-group', size ? "input-group-" + size : null), cssModule);

    if (props.type === 'dropdown') {
      return /*#__PURE__*/React__default["default"].createElement(Dropdown$1, _extends({}, attributes, {
        className: classes
      }));
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  InputGroup.propTypes = propTypes$o;
  InputGroup.defaultProps = defaultProps$n;
  var InputGroup$1 = InputGroup;

  var _excluded$k = ["className", "cssModule", "tag"];
  var propTypes$n = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$m = {
    tag: 'span'
  };

  var InputGroupText = function InputGroupText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$k);

    var classes = mapToCssModules(classNames__default["default"](className, 'input-group-text'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  InputGroupText.propTypes = propTypes$n;
  InputGroupText.defaultProps = defaultProps$m;
  var InputGroupText$1 = InputGroupText;

  var _excluded$j = ["className", "cssModule", "hidden", "widths", "tag", "check", "size", "for"];
  var colWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  var stringOrNumberProp = PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]);
  var columnProps = PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string, PropTypes__default["default"].number, PropTypes__default["default"].shape({
    size: stringOrNumberProp,
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })]);
  var propTypes$m = {
    children: PropTypes__default["default"].node,
    hidden: PropTypes__default["default"].bool,
    check: PropTypes__default["default"].bool,
    size: PropTypes__default["default"].string,
    "for": PropTypes__default["default"].string,
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    xl: columnProps,
    xxl: columnProps,
    widths: PropTypes__default["default"].array
  };
  var defaultProps$l = {
    tag: 'label',
    widths: colWidths
  };

  var getColumnSizeClass = function getColumnSizeClass(isXs, colWidth, colSize) {
    if (colSize === true || colSize === '') {
      return isXs ? 'col' : "col-" + colWidth;
    } else if (colSize === 'auto') {
      return isXs ? 'col-auto' : "col-" + colWidth + "-auto";
    }

    return isXs ? "col-" + colSize : "col-" + colWidth + "-" + colSize;
  };

  var Label = function Label(props) {
    var className = props.className,
        cssModule = props.cssModule,
        hidden = props.hidden,
        widths = props.widths,
        Tag = props.tag,
        check = props.check,
        size = props.size,
        htmlFor = props["for"],
        attributes = _objectWithoutPropertiesLoose(props, _excluded$j);

    var colClasses = [];
    widths.forEach(function (colWidth, i) {
      var columnProp = props[colWidth];
      delete attributes[colWidth];

      if (!columnProp && columnProp !== '') {
        return;
      }

      var isXs = !i;
      var colClass;

      if (isObject(columnProp)) {
        var _classNames;

        var colSizeInterfix = isXs ? '-' : "-" + colWidth + "-";
        colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
        colClasses.push(mapToCssModules(classNames__default["default"]((_classNames = {}, _classNames[colClass] = columnProp.size || columnProp.size === '', _classNames["order" + colSizeInterfix + columnProp.order] = columnProp.order || columnProp.order === 0, _classNames["offset" + colSizeInterfix + columnProp.offset] = columnProp.offset || columnProp.offset === 0, _classNames))), cssModule);
      } else {
        colClass = getColumnSizeClass(isXs, colWidth, columnProp);
        colClasses.push(colClass);
      }
    });
    var classes = mapToCssModules(classNames__default["default"](className, hidden ? 'visually-hidden' : false, check ? 'form-check-label' : false, size ? "col-form-label-" + size : false, colClasses, colClasses.length ? 'col-form-label' : 'form-label'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
      htmlFor: htmlFor
    }, attributes, {
      className: classes
    }));
  };

  Label.propTypes = propTypes$m;
  Label.defaultProps = defaultProps$l;
  var Label$1 = Label;

  var _excluded$i = ["body", "bottom", "className", "cssModule", "heading", "left", "list", "middle", "object", "right", "tag", "top"];
  var propTypes$l = {
    body: PropTypes__default["default"].bool,
    bottom: PropTypes__default["default"].bool,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    heading: PropTypes__default["default"].bool,
    left: PropTypes__default["default"].bool,
    list: PropTypes__default["default"].bool,
    middle: PropTypes__default["default"].bool,
    object: PropTypes__default["default"].bool,
    right: PropTypes__default["default"].bool,
    tag: tagPropType,
    top: PropTypes__default["default"].bool
  };

  var Media = function Media(props) {
    var body = props.body,
        bottom = props.bottom,
        className = props.className,
        cssModule = props.cssModule,
        heading = props.heading,
        left = props.left,
        list = props.list,
        middle = props.middle,
        object = props.object,
        right = props.right,
        tag = props.tag,
        top = props.top,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$i);

    var defaultTag;

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

    var Tag = tag || defaultTag;
    var classes = mapToCssModules(classNames__default["default"](className, {
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
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Media.propTypes = propTypes$l;
  var Media$1 = Media;

  function noop() {}

  var FadePropTypes = PropTypes__default["default"].shape(Fade.propTypes);
  var propTypes$k = {
    autoFocus: PropTypes__default["default"].bool,
    backdrop: PropTypes__default["default"].bool,
    backdropClassName: PropTypes__default["default"].string,
    backdropTransition: FadePropTypes,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    container: targetPropType,
    cssModule: PropTypes__default["default"].object,
    direction: PropTypes__default["default"].oneOf(['start', 'end', 'bottom', 'top', 'left', 'right']),
    fade: PropTypes__default["default"].bool,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func]),
    isOpen: PropTypes__default["default"].bool,
    keyboard: PropTypes__default["default"].bool,
    labelledBy: PropTypes__default["default"].string,
    offcanvasTransition: FadePropTypes,
    onClosed: PropTypes__default["default"].func,
    onEnter: PropTypes__default["default"].func,
    onExit: PropTypes__default["default"].func,
    onOpened: PropTypes__default["default"].func,
    returnFocusAfterClose: PropTypes__default["default"].bool,
    role: PropTypes__default["default"].string,
    scrollable: PropTypes__default["default"].bool,
    toggle: PropTypes__default["default"].func,
    trapFocus: PropTypes__default["default"].bool,
    unmountOnClose: PropTypes__default["default"].bool,
    zIndex: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string])
  };
  var propsToOmit = Object.keys(propTypes$k);
  var defaultProps$k = {
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

  var Offcanvas = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Offcanvas, _React$Component);

    function Offcanvas(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this._element = null;
      _this._originalBodyPadding = null;
      _this.getFocusableChildren = _this.getFocusableChildren.bind(_assertThisInitialized(_this));
      _this.handleBackdropClick = _this.handleBackdropClick.bind(_assertThisInitialized(_this));
      _this.handleBackdropMouseDown = _this.handleBackdropMouseDown.bind(_assertThisInitialized(_this));
      _this.handleEscape = _this.handleEscape.bind(_assertThisInitialized(_this));
      _this.handleTab = _this.handleTab.bind(_assertThisInitialized(_this));
      _this.onOpened = _this.onOpened.bind(_assertThisInitialized(_this));
      _this.onClosed = _this.onClosed.bind(_assertThisInitialized(_this));
      _this.manageFocusAfterClose = _this.manageFocusAfterClose.bind(_assertThisInitialized(_this));
      _this.clearBackdropAnimationTimeout = _this.clearBackdropAnimationTimeout.bind(_assertThisInitialized(_this));
      _this.trapFocus = _this.trapFocus.bind(_assertThisInitialized(_this));
      _this.state = {
        isOpen: false
      };
      return _this;
    }

    var _proto = Offcanvas.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          autoFocus = _this$props.autoFocus,
          onEnter = _this$props.onEnter;

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
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
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
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
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
    };

    _proto.trapFocus = function trapFocus(ev) {
      if (!this.props.trapFocus) {
        return;
      }

      if (!this._element) //element is not attached
        return;
      if (this._dialog === ev.target) // initial focus when the Offcanvas is opened
        return;
      if (this.offcanvasIndex < Offcanvas.openCount - 1) // last opened offcanvas
        return;
      var children = this.getFocusableChildren();

      for (var i = 0; i < children.length; i++) {
        // focus is already inside the Offcanvas
        if (children[i] === ev.target) return;
      }

      if (children.length > 0) {
        // otherwise focus the first focusable element in the Offcanvas
        ev.preventDefault();
        ev.stopPropagation();
        children[0].focus();
      }
    };

    _proto.onOpened = function onOpened(node, isAppearing) {
      this.props.onOpened();
      (this.props.offcanvasTransition.onEntered || noop)(node, isAppearing);
    };

    _proto.onClosed = function onClosed(node) {
      var unmountOnClose = this.props.unmountOnClose; // so all methods get called before it is unmounted

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
    };

    _proto.setFocus = function setFocus() {
      if (this._dialog && typeof this._dialog.focus === 'function') {
        this._dialog.focus();
      }
    };

    _proto.getFocusableChildren = function getFocusableChildren() {
      return this._element.querySelectorAll(focusableElements.join(', '));
    };

    _proto.getFocusedChild = function getFocusedChild() {
      var currentFocus;
      var focusableChildren = this.getFocusableChildren();

      try {
        currentFocus = document.activeElement;
      } catch (err) {
        currentFocus = focusableChildren[0];
      }

      return currentFocus;
    } // not mouseUp because scrollbar fires it, shouldn't close when user scrolls
    ;

    _proto.handleBackdropClick = function handleBackdropClick(e) {
      if (e.target === this._mouseDownElement) {
        e.stopPropagation();
        var backdrop = this._backdrop;
        if (!this.props.isOpen || this.props.backdrop !== true) return;

        if (backdrop && e.target === backdrop && this.props.toggle) {
          this.props.toggle(e);
        }
      }
    };

    _proto.handleTab = function handleTab(e) {
      if (e.which !== 9) return;
      if (this.offcanvasIndex < Offcanvas.openCount - 1) return; // last opened offcanvas

      var focusableChildren = this.getFocusableChildren();
      var totalFocusable = focusableChildren.length;
      if (totalFocusable === 0) return;
      var currentFocus = this.getFocusedChild();
      var focusedIndex = 0;

      for (var i = 0; i < totalFocusable; i += 1) {
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
    };

    _proto.handleBackdropMouseDown = function handleBackdropMouseDown(e) {
      this._mouseDownElement = e.target;
    };

    _proto.handleEscape = function handleEscape(e) {
      if (this.props.isOpen && e.keyCode === keyCodes.esc && this.props.toggle) {
        if (this.props.keyboard) {
          e.preventDefault();
          e.stopPropagation();
          this.props.toggle(e);
        }
      }
    };

    _proto.init = function init() {
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
    };

    _proto.destroy = function destroy() {
      if (this._element) {
        this._mountContainer.removeChild(this._element);

        this._element = null;
      }

      this.manageFocusAfterClose();
    };

    _proto.manageFocusAfterClose = function manageFocusAfterClose() {
      if (this._triggeringElement) {
        var returnFocusAfterClose = this.props.returnFocusAfterClose;
        if (this._triggeringElement.focus && returnFocusAfterClose) this._triggeringElement.focus();
        this._triggeringElement = null;
      }
    };

    _proto.close = function close() {
      this.manageFocusAfterClose();
      Offcanvas.openCount = Math.max(0, Offcanvas.openCount - 1);
      document.body.style.overflow = null;
      setScrollbarWidth(this._originalBodyPadding);
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          direction = _this$props2.direction,
          unmountOnClose = _this$props2.unmountOnClose;

      if (!!this._element && (this.state.isOpen || !unmountOnClose)) {
        var isOffcanvasHidden = !!this._element && !this.state.isOpen && !unmountOnClose;
        this._element.style.display = isOffcanvasHidden ? 'none' : 'block';
        var _this$props3 = this.props,
            className = _this$props3.className,
            backdropClassName = _this$props3.backdropClassName,
            cssModule = _this$props3.cssModule,
            isOpen = _this$props3.isOpen,
            backdrop = _this$props3.backdrop,
            role = _this$props3.role,
            labelledBy = _this$props3.labelledBy,
            style = _this$props3.style;
        var offcanvasAttributes = {
          onKeyUp: this.handleEscape,
          onKeyDown: this.handleTab,
          'aria-labelledby': labelledBy,
          role: role,
          tabIndex: '-1'
        };
        var hasTransition = this.props.fade;

        var offcanvasTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.offcanvasTransition), {}, {
          baseClass: hasTransition ? this.props.offcanvasTransition.baseClass : '',
          timeout: hasTransition ? this.props.offcanvasTransition.timeout : 0
        });

        var backdropTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), this.props.backdropTransition), {}, {
          baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
          timeout: hasTransition ? this.props.backdropTransition.timeout : 0
        });

        var Backdrop = backdrop && (hasTransition ? /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, backdropTransition, {
          "in": isOpen && !!backdrop,
          innerRef: function innerRef(c) {
            _this2._backdrop = c;
          },
          cssModule: cssModule,
          className: mapToCssModules(classNames__default["default"]('offcanvas-backdrop', backdropClassName), cssModule),
          onClick: this.handleBackdropClick,
          onMouseDown: this.handleBackdropMouseDown
        })) : /*#__PURE__*/React__default["default"].createElement("div", {
          className: mapToCssModules(classNames__default["default"]('offcanvas-backdrop', 'show', backdropClassName), cssModule),
          onClick: this.handleBackdropClick,
          onMouseDown: this.handleBackdropMouseDown
        }));
        var attributes = omit(this.props, propsToOmit);
        return /*#__PURE__*/React__default["default"].createElement(Portal$1, {
          node: this._element
        }, /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, attributes, offcanvasAttributes, offcanvasTransition, {
          "in": isOpen,
          onEntered: this.onOpened,
          onExited: this.onClosed,
          cssModule: cssModule,
          className: mapToCssModules(classNames__default["default"]('offcanvas', className, "offcanvas-" + direction), cssModule),
          innerRef: function innerRef(c) {
            _this2._dialog = c;
          },
          style: _objectSpread2(_objectSpread2({}, style), {}, {
            visibility: isOpen ? 'visible' : 'hidden'
          })
        }), this.props.children), Backdrop);
      }

      return null;
    };

    _proto.clearBackdropAnimationTimeout = function clearBackdropAnimationTimeout() {
      if (this._backdropAnimationTimeout) {
        clearTimeout(this._backdropAnimationTimeout);
        this._backdropAnimationTimeout = undefined;
      }
    };

    return Offcanvas;
  }(React__default["default"].Component);

  Offcanvas.propTypes = propTypes$k;
  Offcanvas.defaultProps = defaultProps$k;
  Offcanvas.openCount = 0;
  var Offcanvas$1 = Offcanvas;

  var _excluded$h = ["className", "cssModule", "tag"];
  var propTypes$j = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$j = {
    tag: 'div'
  };

  var OffcanvasBody = function OffcanvasBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$h);

    var classes = mapToCssModules(classNames__default["default"](className, 'offcanvas-body'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  OffcanvasBody.propTypes = propTypes$j;
  OffcanvasBody.defaultProps = defaultProps$j;
  var OffcanvasBody$1 = OffcanvasBody;

  var _excluded$g = ["children", "className", "close", "closeAriaLabel", "cssModule", "tag", "toggle", "wrapTag"];
  var propTypes$i = {
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    close: PropTypes__default["default"].object,
    closeAriaLabel: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    tag: tagPropType,
    toggle: PropTypes__default["default"].func,
    wrapTag: tagPropType
  };
  var defaultProps$i = {
    closeAriaLabel: 'Close',
    tag: 'h5',
    wrapTag: 'div'
  };

  var OffcanvasHeader = function OffcanvasHeader(props) {
    var closeButton;

    var children = props.children,
        className = props.className,
        close = props.close,
        closeAriaLabel = props.closeAriaLabel,
        cssModule = props.cssModule,
        Tag = props.tag,
        toggle = props.toggle,
        WrapTag = props.wrapTag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$g);

    var classes = mapToCssModules(classNames__default["default"](className, 'offcanvas-header'), cssModule);

    if (!close && toggle) {
      closeButton = /*#__PURE__*/React__default["default"].createElement("button", {
        type: "button",
        onClick: toggle,
        className: mapToCssModules('btn-close', cssModule),
        "aria-label": closeAriaLabel
      });
    }

    return /*#__PURE__*/React__default["default"].createElement(WrapTag, _extends({}, attributes, {
      className: classes
    }), /*#__PURE__*/React__default["default"].createElement(Tag, {
      className: mapToCssModules('offcanvas-title', cssModule)
    }, children), close || closeButton);
  };

  OffcanvasHeader.propTypes = propTypes$i;
  OffcanvasHeader.defaultProps = defaultProps$i;
  var OffcanvasHeader$1 = OffcanvasHeader;

  var _excluded$f = ["className", "listClassName", "cssModule", "size", "tag", "listTag", "aria-label"];
  var propTypes$h = {
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    listClassName: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    size: PropTypes__default["default"].string,
    tag: tagPropType,
    listTag: tagPropType,
    'aria-label': PropTypes__default["default"].string
  };
  var defaultProps$h = {
    tag: 'nav',
    listTag: 'ul',
    'aria-label': 'pagination'
  };

  var Pagination = function Pagination(props) {
    var _classNames;

    var className = props.className,
        listClassName = props.listClassName,
        cssModule = props.cssModule,
        size = props.size,
        Tag = props.tag,
        ListTag = props.listTag,
        label = props['aria-label'],
        attributes = _objectWithoutPropertiesLoose(props, _excluded$f);

    var classes = mapToCssModules(classNames__default["default"](className), cssModule);
    var listClasses = mapToCssModules(classNames__default["default"](listClassName, 'pagination', (_classNames = {}, _classNames["pagination-" + size] = !!size, _classNames)), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, {
      className: classes,
      "aria-label": label
    }, /*#__PURE__*/React__default["default"].createElement(ListTag, _extends({}, attributes, {
      className: listClasses
    })));
  };

  Pagination.propTypes = propTypes$h;
  Pagination.defaultProps = defaultProps$h;
  var Pagination$1 = Pagination;

  var _excluded$e = ["active", "className", "cssModule", "disabled", "tag"];
  var propTypes$g = {
    active: PropTypes__default["default"].bool,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    disabled: PropTypes__default["default"].bool,
    tag: tagPropType
  };
  var defaultProps$g = {
    tag: 'li'
  };

  var PaginationItem = function PaginationItem(props) {
    var active = props.active,
        className = props.className,
        cssModule = props.cssModule,
        disabled = props.disabled,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$e);

    var classes = mapToCssModules(classNames__default["default"](className, 'page-item', {
      active: active,
      disabled: disabled
    }), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PaginationItem.propTypes = propTypes$g;
  PaginationItem.defaultProps = defaultProps$g;
  var PaginationItem$1 = PaginationItem;

  var _excluded$d = ["className", "cssModule", "next", "previous", "first", "last", "tag"];
  var propTypes$f = {
    'aria-label': PropTypes__default["default"].string,
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    next: PropTypes__default["default"].bool,
    previous: PropTypes__default["default"].bool,
    first: PropTypes__default["default"].bool,
    last: PropTypes__default["default"].bool,
    tag: tagPropType
  };
  var defaultProps$f = {
    tag: 'a'
  };

  var PaginationLink = function PaginationLink(props) {
    var className = props.className,
        cssModule = props.cssModule,
        next = props.next,
        previous = props.previous,
        first = props.first,
        last = props.last,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$d);

    var classes = mapToCssModules(classNames__default["default"](className, 'page-link'), cssModule);
    var defaultAriaLabel;

    if (previous) {
      defaultAriaLabel = 'Previous';
    } else if (next) {
      defaultAriaLabel = 'Next';
    } else if (first) {
      defaultAriaLabel = 'First';
    } else if (last) {
      defaultAriaLabel = 'Last';
    }

    var ariaLabel = props['aria-label'] || defaultAriaLabel;
    var defaultCaret;

    if (previous) {
      defaultCaret = "\u2039";
    } else if (next) {
      defaultCaret = "\u203A";
    } else if (first) {
      defaultCaret = "\xAB";
    } else if (last) {
      defaultCaret = "\xBB";
    }

    var children = props.children;

    if (children && Array.isArray(children) && children.length === 0) {
      children = null;
    }

    if (!attributes.href && Tag === 'a') {
      Tag = 'button';
    }

    if (previous || next || first || last) {
      children = [/*#__PURE__*/React__default["default"].createElement("span", {
        "aria-hidden": "true",
        key: "caret"
      }, children || defaultCaret), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "visually-hidden",
        key: "ariaLabel"
      }, ariaLabel)];
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
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

  var TabContext = React__default["default"].createContext({});

  var propTypes$e = {
    tag: tagPropType,
    activeTab: PropTypes__default["default"].any,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$e = {
    tag: 'div'
  };

  var TabContent = /*#__PURE__*/function (_Component) {
    _inheritsLoose(TabContent, _Component);

    TabContent.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.activeTab !== nextProps.activeTab) {
        return {
          activeTab: nextProps.activeTab
        };
      }

      return null;
    };

    function TabContent(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        activeTab: _this.props.activeTab
      };
      return _this;
    }

    var _proto = TabContent.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          Tag = _this$props.tag;
      var attributes = omit(this.props, Object.keys(propTypes$e));
      var classes = mapToCssModules(classNames__default["default"]('tab-content', className), cssModule);
      return /*#__PURE__*/React__default["default"].createElement(TabContext.Provider, {
        value: {
          activeTabId: this.state.activeTab
        }
      }, /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
        className: classes
      })));
    };

    return TabContent;
  }(React.Component);

  var TabContent$1 = TabContent;
  TabContent.propTypes = propTypes$e;
  TabContent.defaultProps = defaultProps$e;

  var _excluded$c = ["className", "cssModule", "tabId", "tag"];
  var propTypes$d = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    tabId: PropTypes__default["default"].any
  };
  var defaultProps$d = {
    tag: 'div'
  };
  function TabPane(props) {
    var className = props.className,
        cssModule = props.cssModule,
        tabId = props.tabId,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$c);

    var getClasses = function getClasses(activeTabId) {
      return mapToCssModules(classNames__default["default"]('tab-pane', className, {
        active: tabId === activeTabId
      }), cssModule);
    };

    return /*#__PURE__*/React__default["default"].createElement(TabContext.Consumer, null, function (_ref) {
      var activeTabId = _ref.activeTabId;
      return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
        className: getClasses(activeTabId)
      }));
    });
  }
  TabPane.propTypes = propTypes$d;
  TabPane.defaultProps = defaultProps$d;

  var _excluded$b = ["className", "closeClassName", "closeAriaLabel", "cssModule", "tag", "color", "isOpen", "toggle", "children", "transition", "fade", "innerRef"];
  var propTypes$c = {
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    closeClassName: PropTypes__default["default"].string,
    closeAriaLabel: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    color: PropTypes__default["default"].string,
    fade: PropTypes__default["default"].bool,
    isOpen: PropTypes__default["default"].bool,
    toggle: PropTypes__default["default"].func,
    tag: tagPropType,
    transition: PropTypes__default["default"].shape(Fade.propTypes),
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  };
  var defaultProps$c = {
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
    var className = props.className,
        closeClassName = props.closeClassName,
        closeAriaLabel = props.closeAriaLabel,
        cssModule = props.cssModule,
        Tag = props.tag,
        color = props.color,
        isOpen = props.isOpen,
        toggle = props.toggle,
        children = props.children,
        transition = props.transition,
        fade = props.fade,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$b);

    var classes = mapToCssModules(classNames__default["default"](className, 'alert', "alert-" + color, {
      'alert-dismissible': toggle
    }), cssModule);
    var closeClasses = mapToCssModules(classNames__default["default"]('btn-close', closeClassName), cssModule);

    var alertTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0
    });

    return /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, attributes, alertTransition, {
      tag: Tag,
      className: classes,
      "in": isOpen,
      role: "alert",
      innerRef: innerRef
    }), toggle ? /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      className: closeClasses,
      "aria-label": closeAriaLabel,
      onClick: toggle
    }) : null, children);
  }

  Alert.propTypes = propTypes$c;
  Alert.defaultProps = defaultProps$c;

  var _excluded$a = ["className", "cssModule", "tag", "isOpen", "children", "transition", "fade", "innerRef"];
  var propTypes$b = {
    children: PropTypes__default["default"].node,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    fade: PropTypes__default["default"].bool,
    isOpen: PropTypes__default["default"].bool,
    tag: tagPropType,
    transition: PropTypes__default["default"].shape(Fade.propTypes),
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  };
  var defaultProps$b = {
    isOpen: true,
    tag: 'div',
    fade: true,
    transition: _objectSpread2(_objectSpread2({}, Fade.defaultProps), {}, {
      unmountOnExit: true
    })
  };

  function Toast(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        isOpen = props.isOpen,
        children = props.children,
        transition = props.transition,
        fade = props.fade,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$a);

    var classes = mapToCssModules(classNames__default["default"](className, 'toast'), cssModule);

    var toastTransition = _objectSpread2(_objectSpread2(_objectSpread2({}, Fade.defaultProps), transition), {}, {
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0
    });

    return /*#__PURE__*/React__default["default"].createElement(Fade, _extends({}, attributes, toastTransition, {
      tag: Tag,
      className: classes,
      "in": isOpen,
      role: "alert",
      innerRef: innerRef
    }), children);
  }

  Toast.propTypes = propTypes$b;
  Toast.defaultProps = defaultProps$b;

  var _excluded$9 = ["className", "cssModule", "innerRef", "tag"];
  var propTypes$a = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].string, PropTypes__default["default"].func])
  };
  var defaultProps$a = {
    tag: 'div'
  };

  var ToastBody = function ToastBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        innerRef = props.innerRef,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$9);

    var classes = mapToCssModules(classNames__default["default"](className, 'toast-body'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  ToastBody.propTypes = propTypes$a;
  ToastBody.defaultProps = defaultProps$a;
  var ToastBody$1 = ToastBody;

  var _excluded$8 = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "close", "tagClassName", "icon"];
  var propTypes$9 = {
    tag: tagPropType,
    icon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].node]),
    wrapTag: tagPropType,
    toggle: PropTypes__default["default"].func,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].node,
    closeAriaLabel: PropTypes__default["default"].string,
    charCode: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
    close: PropTypes__default["default"].object
  };
  var defaultProps$9 = {
    tag: 'strong',
    wrapTag: 'div',
    tagClassName: 'me-auto',
    closeAriaLabel: 'Close'
  };

  var ToastHeader = function ToastHeader(props) {
    var closeButton;
    var icon;

    var className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        toggle = props.toggle,
        Tag = props.tag,
        WrapTag = props.wrapTag,
        closeAriaLabel = props.closeAriaLabel,
        close = props.close,
        tagClassName = props.tagClassName,
        iconProp = props.icon,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$8);

    var classes = mapToCssModules(classNames__default["default"](className, 'toast-header'), cssModule);

    if (!close && toggle) {
      closeButton = /*#__PURE__*/React__default["default"].createElement("button", {
        type: "button",
        onClick: toggle,
        className: mapToCssModules('btn-close', cssModule),
        "aria-label": closeAriaLabel
      });
    }

    if (typeof iconProp === "string") {
      icon = /*#__PURE__*/React__default["default"].createElement("svg", {
        className: mapToCssModules("rounded text-" + iconProp),
        width: "20",
        height: "20",
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "xMidYMid slice",
        focusable: "false",
        role: "img"
      }, /*#__PURE__*/React__default["default"].createElement("rect", {
        fill: "currentColor",
        width: "100%",
        height: "100%"
      }));
    } else if (iconProp) {
      icon = iconProp;
    }

    return /*#__PURE__*/React__default["default"].createElement(WrapTag, _extends({}, attributes, {
      className: classes
    }), icon, /*#__PURE__*/React__default["default"].createElement(Tag, {
      className: mapToCssModules(classNames__default["default"](tagClassName, {
        "ms-2": icon != null
      }), cssModule)
    }, children), close || closeButton);
  };

  ToastHeader.propTypes = propTypes$9;
  ToastHeader.defaultProps = defaultProps$9;
  var ToastHeader$1 = ToastHeader;

  var _excluded$7 = ["className", "cssModule", "tag", "active", "disabled", "action", "color"];
  var propTypes$8 = {
    tag: tagPropType,
    active: PropTypes__default["default"].bool,
    disabled: PropTypes__default["default"].bool,
    color: PropTypes__default["default"].string,
    action: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].any,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$8 = {
    tag: 'li'
  };

  var handleDisabledOnClick = function handleDisabledOnClick(e) {
    e.preventDefault();
  };

  var ListGroupItem = function ListGroupItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        active = props.active,
        disabled = props.disabled,
        action = props.action,
        color = props.color,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$7);

    var classes = mapToCssModules(classNames__default["default"](className, active ? 'active' : false, disabled ? 'disabled' : false, action ? 'list-group-item-action' : false, color ? "list-group-item-" + color : false, 'list-group-item'), cssModule); // Prevent click event when disabled.

    if (disabled) {
      attributes.onClick = handleDisabledOnClick;
    }

    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItem.propTypes = propTypes$8;
  ListGroupItem.defaultProps = defaultProps$8;
  var ListGroupItem$1 = ListGroupItem;

  var _excluded$6 = ["className", "cssModule", "tag"];
  var propTypes$7 = {
    tag: tagPropType,
    className: PropTypes__default["default"].any,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$7 = {
    tag: 'h5'
  };

  var ListGroupItemHeading = function ListGroupItemHeading(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$6);

    var classes = mapToCssModules(classNames__default["default"](className, 'list-group-item-heading'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItemHeading.propTypes = propTypes$7;
  ListGroupItemHeading.defaultProps = defaultProps$7;
  var ListGroupItemHeading$1 = ListGroupItemHeading;

  var _excluded$5 = ["className", "cssModule", "tag"];
  var propTypes$6 = {
    tag: tagPropType,
    className: PropTypes__default["default"].any,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$6 = {
    tag: 'p'
  };

  var ListGroupItemText = function ListGroupItemText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$5);

    var classes = mapToCssModules(classNames__default["default"](className, 'list-group-item-text'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItemText.propTypes = propTypes$6;
  ListGroupItemText.defaultProps = defaultProps$6;
  var ListGroupItemText$1 = ListGroupItemText;

  var _excluded$4 = ["className", "cssModule", "tag", "type"];
  var propTypes$5 = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    type: PropTypes__default["default"].string
  };
  var defaultProps$5 = {
    tag: 'ul'
  };
  var List = React.forwardRef(function (props, ref) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        type = props.type,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$4);

    var classes = mapToCssModules(classNames__default["default"](className, type ? "list-" + type : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: ref
    }));
  });
  List.name = 'List';
  List.propTypes = propTypes$5;
  List.defaultProps = defaultProps$5;
  var List$1 = List;

  var _excluded$3 = ["className", "cssModule", "tag"];
  var propTypes$4 = {
    tag: tagPropType,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object
  };
  var defaultProps$4 = {
    tag: 'li'
  };
  var ListInlineItem = React.forwardRef(function (props, ref) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$3);

    var classes = mapToCssModules(classNames__default["default"](className, 'list-inline-item'), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: ref
    }));
  });
  ListInlineItem.name = 'ListInlineItem';
  ListInlineItem.propTypes = propTypes$4;
  ListInlineItem.defaultProps = defaultProps$4;
  var ListInlineItem$1 = ListInlineItem;

  var UncontrolledAlert = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledAlert, _Component);

    function UncontrolledAlert(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: true
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledAlert.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(Alert, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, this.props));
    };

    return UncontrolledAlert;
  }(React.Component);

  var UncontrolledAlert$1 = UncontrolledAlert;

  var omitKeys$3 = ['defaultOpen'];

  var UncontrolledButtonDropdown = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledButtonDropdown, _Component);

    function UncontrolledButtonDropdown(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledButtonDropdown.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(ButtonDropdown$1, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$3)));
    };

    return UncontrolledButtonDropdown;
  }(React.Component);
  UncontrolledButtonDropdown.propTypes = _objectSpread2({
    defaultOpen: PropTypes__default["default"].bool
  }, ButtonDropdown$1.propTypes);

  var omitKeys$2 = ['toggleEvents', 'defaultOpen'];
  var propTypes$3 = {
    defaultOpen: PropTypes__default["default"].bool,
    toggler: PropTypes__default["default"].string.isRequired,
    toggleEvents: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)
  };
  var defaultProps$3 = {
    toggleEvents: defaultToggleEvents
  };

  var UncontrolledCollapse = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledCollapse, _Component);

    function UncontrolledCollapse(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.togglers = null;
      _this.removeEventListeners = null;
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      return _this;
    }

    var _proto = UncontrolledCollapse.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.togglers = findDOMElements(this.props.toggler);

      if (this.togglers.length) {
        this.removeEventListeners = addMultipleEventListeners(this.togglers, this.toggle, this.props.toggleEvents);
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.togglers.length && this.removeEventListeners) {
        this.removeEventListeners();
      }
    };

    _proto.toggle = function toggle(e) {
      this.setState(function (_ref) {
        var isOpen = _ref.isOpen;
        return {
          isOpen: !isOpen
        };
      });
      e.preventDefault();
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(Collapse$1, _extends({
        isOpen: this.state.isOpen
      }, omit(this.props, omitKeys$2)));
    };

    return UncontrolledCollapse;
  }(React.Component);

  UncontrolledCollapse.propTypes = propTypes$3;
  UncontrolledCollapse.defaultProps = defaultProps$3;
  var UncontrolledCollapse$1 = UncontrolledCollapse;

  var omitKeys$1 = ['defaultOpen'];

  var UncontrolledDropdown = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledDropdown, _Component);

    function UncontrolledDropdown(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledDropdown.prototype;

    _proto.toggle = function toggle(e) {
      var _this2 = this;

      var isOpen = !this.state.isOpen;
      this.setState({
        isOpen: isOpen
      }, function () {
        if (_this2.props.onToggle) {
          _this2.props.onToggle(e, isOpen);
        }
      });
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(Dropdown$1, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$1)));
    };

    return UncontrolledDropdown;
  }(React.Component);
  UncontrolledDropdown.propTypes = _objectSpread2({
    defaultOpen: PropTypes__default["default"].bool,
    onToggle: PropTypes__default["default"].func
  }, Dropdown$1.propTypes);

  var omitKeys = ['defaultOpen'];

  var UncontrolledTooltip = /*#__PURE__*/function (_Component) {
    _inheritsLoose(UncontrolledTooltip, _Component);

    function UncontrolledTooltip(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = UncontrolledTooltip.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return /*#__PURE__*/React__default["default"].createElement(Tooltip$1, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys)));
    };

    return UncontrolledTooltip;
  }(React.Component);
  UncontrolledTooltip.propTypes = _objectSpread2({
    defaultOpen: PropTypes__default["default"].bool
  }, Tooltip$1.propTypes);

  var _excluded$2 = ["className", "cssModule", "type", "size", "color", "children", "tag"];
  var propTypes$2 = {
    tag: tagPropType,
    type: PropTypes__default["default"].string,
    size: PropTypes__default["default"].string,
    color: PropTypes__default["default"].string,
    className: PropTypes__default["default"].string,
    cssModule: PropTypes__default["default"].object,
    children: PropTypes__default["default"].string
  };
  var defaultProps$2 = {
    tag: 'div',
    type: 'border',
    children: 'Loading...'
  };

  var Spinner = function Spinner(props) {
    var className = props.className,
        cssModule = props.cssModule,
        type = props.type,
        size = props.size,
        color = props.color,
        children = props.children,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$2);

    var classes = mapToCssModules(classNames__default["default"](className, size ? "spinner-" + type + "-" + size : false, "spinner-" + type, color ? "text-" + color : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
      role: "status"
    }, attributes, {
      className: classes
    }), children && /*#__PURE__*/React__default["default"].createElement("span", {
      className: mapToCssModules('visually-hidden', cssModule)
    }, children));
  };

  Spinner.propTypes = propTypes$2;
  Spinner.defaultProps = defaultProps$2;
  var Spinner$1 = Spinner;

  var _excluded$1 = ["className", "cssModule", "color", "innerRef", "tag", "animation", "size", "widths"];

  var propTypes$1 = _objectSpread2(_objectSpread2({}, Col$1.propTypes), {}, {
    color: PropTypes__default["default"].string,
    tag: tagPropType,
    animation: PropTypes__default["default"].oneOf(['glow', 'wave']),
    innerRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func, PropTypes__default["default"].string]),
    size: PropTypes__default["default"].oneOf(['lg', 'sm', 'xs'])
  });

  var defaultProps$1 = {
    tag: 'span'
  };

  var Placeholder = function Placeholder(props) {
    var className = props.className,
        cssModule = props.cssModule,
        color = props.color,
        innerRef = props.innerRef,
        Tag = props.tag,
        animation = props.animation,
        size = props.size,
        widths = props.widths,
        attributes = _objectWithoutPropertiesLoose(props, _excluded$1);

    var _getColumnClasses = getColumnClasses(attributes, cssModule, widths),
        modifiedAttributes = _getColumnClasses.attributes,
        colClasses = _getColumnClasses.colClasses;

    var classes = mapToCssModules(classNames__default["default"](className, colClasses, 'placeholder' + (animation ? '-' + animation : ''), size ? 'placeholder-' + size : false, color ? 'bg-' + color : false), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({}, modifiedAttributes, {
      className: classes,
      ref: innerRef
    }));
  };

  Placeholder.propTypes = propTypes$1;
  Placeholder.defaultProps = defaultProps$1;
  var Placeholder$1 = Placeholder;

  var _excluded = ["cssModule", "className", "tag"];
  var propTypes = {
    size: PropTypes__default["default"].string,
    color: PropTypes__default["default"].string,
    outline: PropTypes__default["default"].bool,
    className: PropTypes__default["default"].string,
    tag: tagPropType
  };
  var defaultProps = {
    color: 'primary',
    tag: Button$1
  };

  var PlaceholderButton = function PlaceholderButton(props) {
    var cssModule = props.cssModule,
        className = props.className,
        attributes = _objectWithoutPropertiesLoose(props, _excluded);

    var _getColumnClasses = getColumnClasses(attributes, cssModule),
        modifiedAttributes = _getColumnClasses.attributes,
        colClasses = _getColumnClasses.colClasses;

    var classes = mapToCssModules(classNames__default["default"]("placeholder", className, colClasses), cssModule);
    return /*#__PURE__*/React__default["default"].createElement(Button$1, _extends({}, modifiedAttributes, {
      className: classes,
      disabled: true
    }));
  };

  PlaceholderButton.propTypes = propTypes;
  PlaceholderButton.defaultProps = defaultProps;
  var PlaceholderButton$1 = PlaceholderButton;

  (function () {
    if (typeof window !== 'object' || typeof window.CustomEvent === 'function') return;

    var CustomEvent = function CustomEvent(event, params) {
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

  (function () {
    if (typeof Object.values === 'function') return;

    var values = function values(O) {
      return Object.keys(O).map(function (key) {
        return O[key];
      });
    };

    Object.values = values;
  })();

  var polyfill = {
    __proto__: null
  };

  exports.Accordion = Accordion$1;
  exports.AccordionBody = AccordionItem$1;
  exports.AccordionContext = AccordionContext;
  exports.AccordionHeader = AccordionHeader$1;
  exports.AccordionItem = AccordionItem$3;
  exports.Alert = Alert;
  exports.Badge = Badge$1;
  exports.Breadcrumb = Breadcrumb$1;
  exports.BreadcrumbItem = BreadcrumbItem$1;
  exports.Button = Button$1;
  exports.ButtonDropdown = ButtonDropdown$1;
  exports.ButtonGroup = ButtonGroup$1;
  exports.ButtonToggle = ButtonToggle$1;
  exports.ButtonToolbar = ButtonToolbar$1;
  exports.Card = Card$1;
  exports.CardBody = CardBody$1;
  exports.CardColumns = CardColumns$1;
  exports.CardDeck = CardDeck$1;
  exports.CardFooter = CardFooter$1;
  exports.CardGroup = CardGroup$1;
  exports.CardHeader = CardHeader$1;
  exports.CardImg = CardImg$1;
  exports.CardImgOverlay = CardImgOverlay$1;
  exports.CardLink = CardLink$1;
  exports.CardSubtitle = CardSubtitle$1;
  exports.CardText = CardText$1;
  exports.CardTitle = CardTitle$1;
  exports.Carousel = Carousel$1;
  exports.CarouselCaption = CarouselCaption$1;
  exports.CarouselControl = CarouselControl$1;
  exports.CarouselIndicators = CarouselIndicators$1;
  exports.CarouselItem = CarouselItem$1;
  exports.Col = Col$1;
  exports.Collapse = Collapse$1;
  exports.Container = Container$1;
  exports.Dropdown = Dropdown$1;
  exports.DropdownContext = DropdownContext;
  exports.DropdownItem = DropdownItem$1;
  exports.DropdownMenu = DropdownMenu$1;
  exports.DropdownToggle = DropdownToggle$1;
  exports.Fade = Fade;
  exports.Form = Form$1;
  exports.FormFeedback = FormFeedback$1;
  exports.FormGroup = FormGroup$1;
  exports.FormText = FormText$1;
  exports.Input = Input$1;
  exports.InputGroup = InputGroup$1;
  exports.InputGroupText = InputGroupText$1;
  exports.Label = Label$1;
  exports.List = List$1;
  exports.ListGroup = ListGroup$1;
  exports.ListGroupItem = ListGroupItem$1;
  exports.ListGroupItemHeading = ListGroupItemHeading$1;
  exports.ListGroupItemText = ListGroupItemText$1;
  exports.ListInlineItem = ListInlineItem$1;
  exports.Media = Media$1;
  exports.Modal = Modal$1;
  exports.ModalBody = ModalBody$1;
  exports.ModalFooter = ModalFooter$1;
  exports.ModalHeader = ModalHeader$1;
  exports.Nav = Nav$1;
  exports.NavItem = NavItem$1;
  exports.NavLink = NavLink$1;
  exports.Navbar = Navbar$1;
  exports.NavbarBrand = NavbarBrand$1;
  exports.NavbarText = NavbarText$1;
  exports.NavbarToggler = NavbarToggler$1;
  exports.Offcanvas = Offcanvas$1;
  exports.OffcanvasBody = OffcanvasBody$1;
  exports.OffcanvasHeader = OffcanvasHeader$1;
  exports.Pagination = Pagination$1;
  exports.PaginationItem = PaginationItem$1;
  exports.PaginationLink = PaginationLink$1;
  exports.Placeholder = Placeholder$1;
  exports.PlaceholderButton = PlaceholderButton$1;
  exports.Polyfill = polyfill;
  exports.Popover = Popover$1;
  exports.PopoverBody = PopoverBody$1;
  exports.PopoverHeader = PopoverHeader$1;
  exports.PopperContent = PopperContent$1;
  exports.PopperTargetHelper = PopperTargetHelper$1;
  exports.Progress = Progress$1;
  exports.Row = Row$1;
  exports.Spinner = Spinner$1;
  exports.TabContent = TabContent$1;
  exports.TabPane = TabPane;
  exports.Table = Table$1;
  exports.Toast = Toast;
  exports.ToastBody = ToastBody$1;
  exports.ToastHeader = ToastHeader$1;
  exports.Tooltip = Tooltip$1;
  exports.UncontrolledAccordion = UncontrolledAccordion$1;
  exports.UncontrolledAlert = UncontrolledAlert$1;
  exports.UncontrolledButtonDropdown = UncontrolledButtonDropdown;
  exports.UncontrolledCarousel = UncontrolledCarousel$1;
  exports.UncontrolledCollapse = UncontrolledCollapse$1;
  exports.UncontrolledDropdown = UncontrolledDropdown;
  exports.UncontrolledPopover = UncontrolledPopover;
  exports.UncontrolledTooltip = UncontrolledTooltip;
  exports.Util = utils;

}));
//# sourceMappingURL=reactstrap.umd.js.map
