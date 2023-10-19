'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var portal = require('primereact/portal');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var PrimeReact = require('primereact/api');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var BlockUIBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'BlockUI',
    autoZIndex: true,
    baseZIndex: 0,
    blocked: false,
    className: null,
    containerClassName: null,
    containerStyle: null,
    fullScreen: false,
    id: null,
    onBlocked: null,
    onUnblocked: null,
    style: null,
    template: null,
    children: undefined
  }
});

var BlockUI = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = BlockUIBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.blocked),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var maskRef = React__namespace.useRef(null);
  var _BlockUIBase$setMetaD = BlockUIBase.setMetaData({
      props: props
    }),
    ptm = _BlockUIBase$setMetaD.ptm;
  var block = function block() {
    setVisibleState(true);
  };
  var unblock = function unblock() {
    var callback = function callback() {
      setVisibleState(false);
      props.fullScreen && utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      props.onUnblocked && props.onUnblocked();
    };
    if (maskRef.current) {
      utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
      maskRef.current.addEventListener('animationend', function () {
        utils.ZIndexUtils.clear(maskRef.current);
        callback();
      });
    } else {
      callback();
    }
  };
  var onPortalMounted = function onPortalMounted() {
    if (props.fullScreen) {
      utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
      document.activeElement.blur();
    }
    if (props.autoZIndex) {
      var key = props.fullScreen ? 'modal' : 'overlay';
      utils.ZIndexUtils.set(key, maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex[key] || PrimeReact__default["default"].zIndex[key]);
    }
    props.onBlocked && props.onBlocked();
  };
  hooks.useMountEffect(function () {
    visibleState && block();
  });
  hooks.useUpdateEffect(function () {
    props.blocked ? block() : unblock();
  }, [props.blocked]);
  hooks.useUnmountEffect(function () {
    if (props.fullScreen) {
      utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
    utils.ZIndexUtils.clear(maskRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      block: block,
      unblock: unblock,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createMask = function createMask() {
    if (visibleState) {
      var appendTo = props.fullScreen ? document.body : 'self';
      var _className = utils.classNames('p-blockui p-component-overlay p-component-overlay-enter', {
        'p-blockui-document': props.fullScreen
      }, props.className);
      var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : null;
      var _mask = /*#__PURE__*/React__namespace.createElement("div", {
        ref: maskRef,
        className: _className,
        style: props.style
      }, content);
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: _mask,
        appendTo: appendTo,
        onMounted: onPortalMounted
      });
    }
    return null;
  };
  var mask = createMask();
  var className = utils.classNames('p-blockui-container', props.containerClassName);
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.containerStyle,
    className: className
  }, BlockUIBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.children, mask);
});
BlockUI.displayName = 'BlockUI';

exports.BlockUI = BlockUI;
