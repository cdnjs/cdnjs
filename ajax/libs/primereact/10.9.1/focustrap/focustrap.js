this.primereact = this.primereact || {};
this.primereact.focustrap = (function (exports, React, api, hooks, utils, componentbase) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  var styles = '';
  var FocusTrapBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'FocusTrap',
      children: undefined
    },
    css: {
      styles: styles
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, FocusTrapBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, FocusTrapBase.defaultProps);
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var FocusTrap = /*#__PURE__*/React__default["default"].memo(/*#__PURE__*/React__default["default"].forwardRef(function (inProps, ref) {
    var targetRef = React__default["default"].useRef(null);
    var firstFocusableElementRef = React__default["default"].useRef(null);
    var lastFocusableElementRef = React__default["default"].useRef(null);
    var context = React__default["default"].useContext(api.PrimeReactContext);
    var props = FocusTrapBase.getProps(inProps, context);
    var metaData = {
      props: props
    };
    hooks.useStyle(FocusTrapBase.css.styles, {
      name: 'focustrap'
    });
    var _FocusTrapBase$setMet = FocusTrapBase.setMetaData(_objectSpread({}, metaData));
      _FocusTrapBase$setMet.ptm;
    React__default["default"].useImperativeHandle(ref, function () {
      return {
        props: props,
        getInk: function getInk() {
          return firstFocusableElementRef.current;
        },
        getTarget: function getTarget() {
          return targetRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (!props.disabled) {
        targetRef.current = getTarget();
        setAutoFocus(targetRef.current);
      }
    });
    var getTarget = function getTarget() {
      return firstFocusableElementRef.current && firstFocusableElementRef.current.parentElement;
    };

    /**
     * This method sets the auto focus on the first focusable element within the target element.
     * It first tries to find a focusable element using the autoFocusSelector. If no such element is found,
     * it then tries to find a focusable element using the firstFocusableSelector.
     * If the autoFocus prop is set to true and a focusable element is found, it sets the focus on that element.
     *
     * @param {HTMLElement} target - The target element within which to find a focusable element.
     */
    var setAutoFocus = function setAutoFocus(target) {
      var _ref = props || {},
        _ref$autoFocusSelecto = _ref.autoFocusSelector,
        autoFocusSelector = _ref$autoFocusSelecto === void 0 ? '' : _ref$autoFocusSelecto,
        _ref$firstFocusableSe = _ref.firstFocusableSelector,
        firstFocusableSelector = _ref$firstFocusableSe === void 0 ? '' : _ref$firstFocusableSe,
        _ref$autoFocus = _ref.autoFocus,
        autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus;
      var defaultAutoFocusSelector = "".concat(getComputedSelector(autoFocusSelector));
      var computedAutoFocusSelector = "[autofocus]".concat(defaultAutoFocusSelector, ", [data-pc-autofocus='true']").concat(defaultAutoFocusSelector);
      var focusableElement = utils.DomHandler.getFirstFocusableElement(target, computedAutoFocusSelector);
      autoFocus && !focusableElement && (focusableElement = utils.DomHandler.getFirstFocusableElement(target, getComputedSelector(firstFocusableSelector)));
      utils.DomHandler.focus(focusableElement);
    };
    var getComputedSelector = function getComputedSelector(selector) {
      return ":not(.p-hidden-focusable):not([data-p-hidden-focusable=\"true\"])".concat(selector !== null && selector !== void 0 ? selector : '');
    };
    var onFirstHiddenElementFocus = function onFirstHiddenElementFocus(event) {
      var _targetRef$current;
      var currentTarget = event.currentTarget,
        relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_targetRef$current = targetRef.current) !== null && _targetRef$current !== void 0 && _targetRef$current.contains(relatedTarget)) ? utils.DomHandler.getFirstFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      utils.DomHandler.focus(focusableElement);
    };
    var onLastHiddenElementFocus = function onLastHiddenElementFocus(event) {
      var _targetRef$current2;
      var currentTarget = event.currentTarget,
        relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_targetRef$current2 = targetRef.current) !== null && _targetRef$current2 !== void 0 && _targetRef$current2.contains(relatedTarget)) ? utils.DomHandler.getLastFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      utils.DomHandler.focus(focusableElement);
    };
    var createHiddenFocusableElements = function createHiddenFocusableElements() {
      var _ref2 = props || {},
        _ref2$tabIndex = _ref2.tabIndex,
        tabIndex = _ref2$tabIndex === void 0 ? 0 : _ref2$tabIndex;
      var createFocusableElement = function createFocusableElement(inRef, onFocus, section) {
        return /*#__PURE__*/React__default["default"].createElement("span", {
          ref: inRef,
          className: 'p-hidden-accessible p-hidden-focusable',
          tabIndex: tabIndex,
          role: 'presentation',
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus,
          "data-pc-section": section
        });
      };
      var firstFocusableElement = createFocusableElement(firstFocusableElementRef, onFirstHiddenElementFocus, 'firstfocusableelement');
      var lastFocusableElement = createFocusableElement(lastFocusableElementRef, onLastHiddenElementFocus, 'lastfocusableelement');
      if (firstFocusableElementRef.current && lastFocusableElementRef.current) {
        firstFocusableElementRef.current.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElementRef.current;
        lastFocusableElementRef.current.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElementRef.current;
      }
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, firstFocusableElement, props.children, lastFocusableElement);
    };
    return createHiddenFocusableElements();
  }));

  exports.FocusTrap = FocusTrap;
  exports["default"] = FocusTrap;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils, primereact.componentbase);
