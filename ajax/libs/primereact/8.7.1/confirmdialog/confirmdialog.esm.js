import * as React from 'react';
import { localeOption } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, ObjectUtils, IconUtils } from 'primereact/utils';

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
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var confirmDialog = function confirmDialog() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  props = _objectSpread(_objectSpread({}, props), {
    visible: props.visible === undefined ? true : props.visible
  });
  props.visible && OverlayService.emit('confirm-dialog', props);

  var show = function show() {
    var updatedProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    OverlayService.emit('confirm-dialog', _objectSpread(_objectSpread(_objectSpread({}, props), updatedProps), {
      visible: true
    }));
  };

  var hide = function hide() {
    OverlayService.emit('confirm-dialog', {
      visible: false
    });
  };

  return {
    show: show,
    hide: hide
  };
};
var ConfirmDialog = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(props.visible),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      reshowState = _React$useState4[0],
      setReshowState = _React$useState4[1];

  var confirmProps = React.useRef(null);

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

    return ObjectUtils.getPropValue(getPropValue(key), param);
  };

  var acceptLabel = getPropValue('acceptLabel') || localeOption('accept');
  var rejectLabel = getPropValue('rejectLabel') || localeOption('reject');

  var accept = function accept() {
    callbackFromProp('accept');
    hide('accept');
  };

  var reject = function reject() {
    callbackFromProp('reject');
    hide('reject');
  };

  var show = function show() {
    setVisibleState(true);
  };

  var hide = function hide() {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cancel';
    setVisibleState(false);
    callbackFromProp('onHide', result);
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

  React.useEffect(function () {
    props.visible ? show() : hide(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);
  React.useEffect(function () {
    if (!props.target && !props.message) {
      OverlayService.on('confirm-dialog', confirm);
    }

    return function () {
      OverlayService.off('confirm-dialog', confirm);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.target]);
  useUpdateEffect(function () {
    reshowState && show();
  }, [reshowState]);
  useUnmountEffect(function () {
    OverlayService.off('confirm-dialog', confirm);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      confirm: confirm
    };
  });

  var createFooter = function createFooter() {
    var acceptClassName = classNames('p-confirm-dialog-accept', getPropValue('acceptClassName'));
    var rejectClassName = classNames('p-confirm-dialog-reject', {
      'p-button-text': !getPropValue('rejectClassName')
    }, getPropValue('rejectClassName'));
    var content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      label: rejectLabel,
      icon: getPropValue('rejectIcon'),
      className: rejectClassName,
      onClick: reject
    }), /*#__PURE__*/React.createElement(Button, {
      label: acceptLabel,
      icon: getPropValue('acceptIcon'),
      className: acceptClassName,
      onClick: accept,
      autoFocus: true
    }));

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
      return ObjectUtils.getJSXElement(getPropValue('footer'), defaultContentOptions);
    }

    return content;
  };

  var createElement = function createElement() {
    var currentProps = getCurrentProps();
    var className = classNames('p-confirm-dialog', getPropValue('className'));
    var otherProps = ObjectUtils.findDiffKeys(currentProps, ConfirmDialog.defaultProps);
    var message = ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
    var icon = IconUtils.getJSXIcon(getPropValue('icon'), {
      className: 'p-confirm-dialog-icon'
    }, {
      props: currentProps
    });
    var footer = createFooter();
    return /*#__PURE__*/React.createElement(Dialog, _extends({
      visible: visibleState
    }, otherProps, {
      className: className,
      footer: footer,
      onHide: hide,
      breakpoints: getPropValue('breakpoints')
    }), icon, /*#__PURE__*/React.createElement("span", {
      className: "p-confirm-dialog-message"
    }, message));
  };

  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: getPropValue('appendTo')
  });
}));
ConfirmDialog.displayName = 'ConfirmDialog';
ConfirmDialog.defaultProps = {
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
  reject: null
};

export { ConfirmDialog, confirmDialog };
