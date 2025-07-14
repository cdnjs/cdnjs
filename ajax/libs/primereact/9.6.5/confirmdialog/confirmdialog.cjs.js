'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var button = require('primereact/button');
var dialog = require('primereact/dialog');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');

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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var ConfirmDialogBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ConfirmDialog',
    tagKey: undefined,
    visible: undefined,
    message: null,
    rejectLabel: null,
    acceptLabel: null,
    icon: null,
    rejectIcon: null,
    acceptIcon: null,
    rejectClassName: null,
    acceptClassName: null,
    className: null,
    appendTo: null,
    footer: null,
    breakpoints: null,
    onHide: null,
    accept: null,
    reject: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var confirmDialog = function confirmDialog() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  props = _objectSpread(_objectSpread({}, props), {
    visible: props.visible === undefined ? true : props.visible
  });
  props.visible && overlayservice.OverlayService.emit('confirm-dialog', props);
  var show = function show() {
    var updatedProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    overlayservice.OverlayService.emit('confirm-dialog', _objectSpread(_objectSpread(_objectSpread({}, props), updatedProps), {
      visible: true
    }));
  };
  var hide = function hide() {
    overlayservice.OverlayService.emit('confirm-dialog', {
      visible: false
    });
  };
  return {
    show: show,
    hide: hide
  };
};
var ConfirmDialog = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = ConfirmDialogBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.visible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    reshowState = _React$useState4[0],
    setReshowState = _React$useState4[1];
  var confirmProps = React__namespace.useRef(null);
  var isCallbackExecuting = React__namespace.useRef(false);
  var getCurrentProps = function getCurrentProps() {
    return confirmProps.current || props;
  };
  var getPropValue = function getPropValue(key) {
    return (confirmProps.current || props)[key];
  };
  var callbackFromProp = function callbackFromProp(key) {
    for (var _len = arguments.length, param = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      param[_key - 1] = arguments[_key];
    }
    return utils.ObjectUtils.getPropValue(getPropValue(key), param);
  };
  var acceptLabel = getPropValue('acceptLabel') || api.localeOption('accept');
  var rejectLabel = getPropValue('rejectLabel') || api.localeOption('reject');
  var _ConfirmDialogBase$se = ConfirmDialogBase.setMetaData({
      props: props,
      state: {
        visible: visibleState
      }
    }),
    ptm = _ConfirmDialogBase$se.ptm;
  var accept = function accept() {
    if (!isCallbackExecuting.current) {
      isCallbackExecuting.current = true;
      callbackFromProp('accept');
      hide('accept');
    }
  };
  var reject = function reject() {
    if (!isCallbackExecuting.current) {
      isCallbackExecuting.current = true;
      callbackFromProp('reject');
      hide('reject');
    }
  };
  var show = function show() {
    setVisibleState(true);
    isCallbackExecuting.current = false;
  };
  var hide = function hide() {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cancel';
    setVisibleState(false);
    callbackFromProp('onHide', {
      result: result
    });
  };
  var confirm = function confirm(updatedProps) {
    if (updatedProps.tagKey === props.tagKey) {
      var isVisibleChanged = visibleState !== updatedProps.visible;
      var targetChanged = getPropValue('target') !== updatedProps.target;
      if (targetChanged && !props.target) {
        hide();
        confirmProps.current = updatedProps;
        setReshowState(true);
      } else if (isVisibleChanged) {
        confirmProps.current = updatedProps;
        updatedProps.visible ? show() : hide();
      }
    }
  };
  React__namespace.useEffect(function () {
    props.visible ? show() : hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);
  React__namespace.useEffect(function () {
    if (!props.target && !props.message) {
      overlayservice.OverlayService.on('confirm-dialog', confirm);
    }
    return function () {
      overlayservice.OverlayService.off('confirm-dialog', confirm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.target]);
  hooks.useUpdateEffect(function () {
    reshowState && show();
  }, [reshowState]);
  hooks.useUnmountEffect(function () {
    overlayservice.OverlayService.off('confirm-dialog', confirm);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      confirm: confirm
    };
  });
  var createFooter = function createFooter() {
    var acceptClassName = utils.classNames('p-confirm-dialog-accept', getPropValue('acceptClassName'));
    var rejectClassName = utils.classNames('p-confirm-dialog-reject', {
      'p-button-text': !getPropValue('rejectClassName')
    }, getPropValue('rejectClassName'));
    var rejectButtonProps = utils.mergeProps({
      label: rejectLabel,
      icon: getPropValue('rejectIcon'),
      className: rejectClassName,
      onClick: reject
    }, ptm('rejectButton'));
    var acceptButtonProps = utils.mergeProps({
      label: acceptLabel,
      icon: getPropValue('acceptIcon'),
      className: acceptClassName,
      onClick: accept
    }, ptm('acceptButton'));
    var content = /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(button.Button, rejectButtonProps), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({}, acceptButtonProps, {
      autoFocus: true
    })));
    if (getPropValue('footer')) {
      var defaultContentOptions = {
        accept: accept,
        reject: reject,
        acceptClassName: acceptClassName,
        rejectClassName: rejectClassName,
        acceptLabel: acceptLabel,
        rejectLabel: rejectLabel,
        element: content,
        props: getCurrentProps()
      };
      return utils.ObjectUtils.getJSXElement(getPropValue('footer'), defaultContentOptions);
    }
    return content;
  };
  var createElement = function createElement() {
    var currentProps = getCurrentProps();
    var className = utils.classNames('p-confirm-dialog', getPropValue('className'));
    var message = utils.ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
    var iconProps = utils.mergeProps({
      className: 'p-confirm-dialog-icon'
    }, ptm('icon'));
    var icon = utils.IconUtils.getJSXIcon(getPropValue('icon'), _objectSpread({}, iconProps), {
      props: currentProps
    });
    var footer = createFooter();
    var messageProps = utils.mergeProps({
      className: 'p-confirm-dialog-message'
    }, ptm('message'));
    var rootProps = utils.mergeProps({
      visible: visibleState,
      className: className,
      footer: footer,
      onHide: hide,
      breakpoints: getPropValue('breakpoints'),
      pt: currentProps.pt
    }, ConfirmDialogBase.getOtherProps(currentProps));
    return /*#__PURE__*/React__namespace.createElement(dialog.Dialog, rootProps, icon, /*#__PURE__*/React__namespace.createElement("span", messageProps, message));
  };
  var element = createElement();
  return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: getPropValue('appendTo')
  });
}));
ConfirmDialog.displayName = 'ConfirmDialog';

exports.ConfirmDialog = ConfirmDialog;
exports.confirmDialog = confirmDialog;
