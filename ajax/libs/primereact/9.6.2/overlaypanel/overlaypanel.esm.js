import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { UniqueComponentId, DomHandler, ZIndexUtils, classNames, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var OverlayPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'OverlayPanel',
    id: null,
    dismissable: true,
    showCloseIcon: false,
    closeIcon: null,
    style: null,
    className: null,
    appendTo: null,
    breakpoints: null,
    ariaCloseLabel: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var OverlayPanel = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = OverlayPanelBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _OverlayPanelBase$set = OverlayPanelBase.setMetaData({
      props: props,
      state: {
        visible: visibleState
      }
    }),
    ptm = _OverlayPanelBase$set.ptm;
  var attributeSelector = React.useRef('');
  var overlayRef = React.useRef(null);
  var currentTargetRef = React.useRef(null);
  var isPanelClicked = React.useRef(false);
  var styleElement = React.useRef(null);
  var overlayEventListener = React.useRef(null);
  var _useOverlayListener = useOverlayListener({
      target: currentTargetRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? props.dismissable && !isPanelClicked.current && hide() : hide();
        }
        isPanelClicked.current = false;
      },
      when: visibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var isOutsideClicked = function isOutsideClicked(target) {
    return overlayRef && overlayRef.current && !(overlayRef.current.isSameNode(target) || overlayRef.current.contains(target));
  };
  var hasTargetChanged = function hasTargetChanged(event, target) {
    return currentTargetRef.current != null && currentTargetRef.current !== (target || event.currentTarget || event.target);
  };
  var onCloseClick = function onCloseClick(event) {
    hide();
    event.preventDefault();
  };
  var onPanelClick = function onPanelClick(event) {
    isPanelClicked.current = true;
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: currentTargetRef.current
    });
  };
  var onContentClick = function onContentClick() {
    isPanelClicked.current = true;
  };
  var toggle = function toggle(event, target) {
    if (visibleState) {
      hide();
      if (hasTargetChanged(event, target)) {
        currentTargetRef.current = target || event.currentTarget || event.target;
        setTimeout(function () {
          show(event, currentTargetRef.current);
        }, 200);
      }
    } else {
      show(event, target);
    }
  };
  var show = function show(event, target) {
    currentTargetRef.current = target || event.currentTarget || event.target;
    if (visibleState) {
      align();
    } else {
      setVisibleState(true);
      overlayEventListener.current = function (e) {
        !isOutsideClicked(e.target) && (isPanelClicked.current = true);
      };
      OverlayService.on('overlay-click', overlayEventListener.current);
    }
  };
  var hide = function hide() {
    setVisibleState(false);
    OverlayService.off('overlay-click', overlayEventListener.current);
    overlayEventListener.current = null;
  };
  var onEnter = function onEnter() {
    overlayRef.current.setAttribute(attributeSelector.current, '');
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
    align();
  };
  var onEntered = function onEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    unbindOverlayListener();
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var align = function align() {
    if (currentTargetRef.current && overlayRef.current) {
      DomHandler.absolutePosition(overlayRef.current, currentTargetRef.current);
      var containerOffset = DomHandler.getOffset(overlayRef.current);
      var targetOffset = DomHandler.getOffset(currentTargetRef.current);
      var arrowLeft = 0;
      if (containerOffset.left < targetOffset.left) {
        arrowLeft = targetOffset.left - containerOffset.left;
      }
      overlayRef.current.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));
      if (containerOffset.top < targetOffset.top) {
        DomHandler.addClass(overlayRef.current, 'p-overlaypanel-flipped');
      }
    }
  };
  var createStyle = function createStyle() {
    if (!styleElement.current) {
      styleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var innerHTML = '';
      for (var breakpoint in props.breakpoints) {
        innerHTML += "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-overlaypanel[").concat(attributeSelector.current, "] {\n                            width: ").concat(props.breakpoints[breakpoint], " !important;\n                        }\n                    }\n                ");
      }
      styleElement.current.innerHTML = innerHTML;
    }
  };
  useMountEffect(function () {
    attributeSelector.current = UniqueComponentId();
    if (props.breakpoints) {
      createStyle();
    }
  });
  useUnmountEffect(function () {
    styleElement.current = DomHandler.removeInlineStyle(styleElement.current);
    if (overlayEventListener.current) {
      OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
    ZIndexUtils.clear(overlayRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return overlayRef.current;
      }
    };
  });
  var createCloseIcon = function createCloseIcon() {
    var closeIconProps = mergeProps({
      className: 'p-overlaypanel-close-icon',
      'aria-hidden': true
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var ariaLabel = props.ariaCloseLabel || localeOption('close');
    var closeButtonProps = mergeProps({
      type: 'button',
      className: 'p-overlaypanel-close p-link',
      onClick: function onClick(e) {
        return onCloseClick(e);
      },
      'aria-label': ariaLabel
    }, ptm('closeButton'));
    if (props.showCloseIcon) {
      return /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createElement = function createElement() {
    var className = classNames('p-overlaypanel p-component', props.className, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var closeIcon = createCloseIcon();
    var rootProps = mergeProps({
      id: props.id,
      ref: overlayRef,
      className: className,
      style: props.style,
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, OverlayPanelBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      className: 'p-overlaypanel-content',
      onClick: function onClick(e) {
        return onContentClick();
      },
      onMouseDown: onContentClick
    }, OverlayPanelBase.getOtherProps(props), ptm('content'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: overlayRef,
      classNames: "p-overlaypanel",
      "in": visibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: onExit,
      onExited: onExited
    }, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", contentProps, props.children), closeIcon));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
OverlayPanel.displayName = 'OverlayPanel';

export { OverlayPanel };
