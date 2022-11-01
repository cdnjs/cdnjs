import * as React from 'react';
import PrimeReact from 'primereact/api';
import { useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { DomHandler, ZIndexUtils, ObjectUtils, classNames } from 'primereact/utils';

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

var BlockUI = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(props.blocked),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];

  var elementRef = React.useRef(null);
  var maskRef = React.useRef(null);

  var block = function block() {
    setVisibleState(true);
  };

  var unblock = function unblock() {
    var callback = function callback() {
      setVisibleState(false);
      props.fullScreen && DomHandler.removeClass(document.body, 'p-overflow-hidden');
      props.onUnblocked && props.onUnblocked();
    };

    if (maskRef.current) {
      DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
      maskRef.current.addEventListener('animationend', function () {
        ZIndexUtils.clear(maskRef.current);
        callback();
      });
    } else {
      callback();
    }
  };

  var onPortalMounted = function onPortalMounted() {
    if (props.fullScreen) {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
      document.activeElement.blur();
    }

    if (props.autoZIndex) {
      var key = props.fullScreen ? 'modal' : 'overlay';
      ZIndexUtils.set(key, maskRef.current, PrimeReact.autoZIndex, props.baseZIndex || PrimeReact.zIndex[key]);
    }

    props.onBlocked && props.onBlocked();
  };

  useMountEffect(function () {
    visibleState && block();
  });
  useUpdateEffect(function () {
    props.blocked ? block() : unblock();
  }, [props.blocked]);
  useUnmountEffect(function () {
    if (props.fullScreen) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }

    ZIndexUtils.clear(maskRef.current);
  });
  React.useImperativeHandle(ref, function () {
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
      var className = classNames('p-blockui p-component-overlay p-component-overlay-enter', {
        'p-blockui-document': props.fullScreen
      }, props.className);
      var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : null;

      var _mask = /*#__PURE__*/React.createElement("div", {
        ref: maskRef,
        className: className,
        style: props.style
      }, content);

      return /*#__PURE__*/React.createElement(Portal, {
        element: _mask,
        appendTo: appendTo,
        onMounted: onPortalMounted
      });
    }

    return null;
  };

  var otherProps = ObjectUtils.findDiffKeys(props, BlockUI.defaultProps);
  var mask = createMask();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: "p-blockui-container"
  }, otherProps), props.children, mask);
});
BlockUI.displayName = 'BlockUI';
BlockUI.defaultProps = {
  __TYPE: 'BlockUI',
  id: null,
  blocked: false,
  fullScreen: false,
  baseZIndex: 0,
  autoZIndex: true,
  style: null,
  className: null,
  template: null,
  onBlocked: null,
  onUnblocked: null
};

export { BlockUI };
