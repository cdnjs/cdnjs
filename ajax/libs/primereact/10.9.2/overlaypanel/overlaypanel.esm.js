'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, ariaLabel } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useOverlayListener, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { classNames, DomHandler, UniqueComponentId, ZIndexUtils, IconUtils } from 'primereact/utils';

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
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

var classes = {
  root: function root(_ref) {
    _ref.props;
      var context = _ref.context;
    return classNames('p-overlaypanel p-component', {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  closeIcon: 'p-overlaypanel-close-icon',
  closeButton: 'p-overlaypanel-close p-link',
  content: 'p-overlaypanel-content',
  transition: 'p-overlaypanel'
};
var styles = "\n@layer primereact {\n    .p-overlaypanel {\n        position: absolute;\n        margin-top: 10px;\n        /* Github #3122: Prevent animation flickering  */\n        top: -9999px;\n        left: -9999px;\n    }\n    \n    .p-overlaypanel-flipped {\n        margin-top: -10px;\n        margin-bottom: 10px;\n    }\n    \n    .p-overlaypanel-close {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    /* Animation */\n    .p-overlaypanel-enter {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n    \n    .p-overlaypanel-enter-active {\n        opacity: 1;\n        transform: scaleY(1);\n        transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);\n    }\n    \n    .p-overlaypanel-enter-done {\n        transform: none;\n    }\n    \n    .p-overlaypanel-exit {\n        opacity: 1;\n    }\n    \n    .p-overlaypanel-exit-active {\n        opacity: 0;\n        transition: opacity .1s linear;\n    }\n    \n    .p-overlaypanel:after, .p-overlaypanel:before {\n        bottom: 100%;\n        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n    \n    .p-overlaypanel:after {\n        border-width: 8px;\n        margin-left: -8px;\n    }\n    \n    .p-overlaypanel:before {\n        border-width: 10px;\n        margin-left: -10px;\n    }\n    \n    .p-overlaypanel-flipped:after, .p-overlaypanel-flipped:before {\n        bottom: auto;\n        top: 100%;\n    }\n    \n    .p-overlaypanel.p-overlaypanel-flipped:after {\n        border-bottom-color: transparent;\n    }\n    \n    .p-overlaypanel.p-overlaypanel-flipped:before {\n        border-bottom-color: transparent\n    }\n}\n";
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
    children: undefined,
    closeOnEscape: true
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var OverlayPanel = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
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
    ptm = _OverlayPanelBase$set.ptm,
    cx = _OverlayPanelBase$set.cx;
    _OverlayPanelBase$set.sx;
    var isUnstyled = _OverlayPanelBase$set.isUnstyled;
  useHandleStyle(OverlayPanelBase.css.styles, isUnstyled, {
    name: 'overlaypanel'
  });
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
          switch (type) {
            case 'outside':
              props.dismissable && !isPanelClicked.current && hide();
              break;
            case 'resize':
            case 'scroll':
            case 'orientationchange':
              align();
              break;
          }
        }
        isPanelClicked.current = false;
      },
      when: visibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var isCloseOnEscape = visibleState && props.closeOnEscape;
  var overlayPanelDisplayOrder = useDisplayOrder('overlay-panel', isCloseOnEscape);
  useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: isCloseOnEscape && overlayPanelDisplayOrder,
    priority: [ESC_KEY_HANDLING_PRIORITIES.OVERLAY_PANEL, overlayPanelDisplayOrder]
  });
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
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.overlay || PrimeReact.zIndex.overlay);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
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
        overlayRef.current.setAttribute('data-p-overlaypanel-flipped', 'true');
        isUnstyled && DomHandler.addClass(overlayRef.current, 'p-overlaypanel-flipped');
      } else {
        overlayRef.current.setAttribute('data-p-overlaypanel-flipped', 'false');
        isUnstyled && DomHandler.removeClass(overlayRef.current, 'p-overlaypanel-flipped');
      }
    }
  };
  var createStyle = function createStyle() {
    if (!styleElement.current) {
      styleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce, context && context.styleContainer);
      var innerHTML = '';
      for (var breakpoint in props.breakpoints) {
        innerHTML = innerHTML + "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-overlaypanel[").concat(attributeSelector.current, "] {\n                            width: ").concat(props.breakpoints[breakpoint], ";\n                        }\n                    }\n                ");
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
      align: align,
      isVisible: function isVisible() {
        return visibleState;
      },
      getElement: function getElement() {
        return overlayRef.current;
      }
    };
  });
  var createCloseIcon = function createCloseIcon() {
    var closeIconProps = mergeProps({
      className: cx('closeIcon'),
      'aria-hidden': true
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var closeButtonProps = mergeProps({
      type: 'button',
      className: cx('closeButton'),
      onClick: function onClick(e) {
        return onCloseClick(e);
      },
      'aria-label': props.ariaCloseLabel || ariaLabel('close')
    }, ptm('closeButton'));
    if (props.showCloseIcon) {
      return /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createElement = function createElement() {
    var closeIcon = createCloseIcon();
    var rootProps = mergeProps({
      id: props.id,
      className: classNames(props.className, cx('root', {
        context: context
      })),
      style: props.style,
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, OverlayPanelBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      className: cx('content'),
      onClick: function onClick(e) {
        return onContentClick();
      },
      onMouseDown: onContentClick
    }, OverlayPanelBase.getOtherProps(props), ptm('content'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
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
    }, ptm('transition'));
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: overlayRef
    }, rootProps), /*#__PURE__*/React.createElement("div", contentProps, props.children), closeIcon));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
OverlayPanel.displayName = 'OverlayPanel';

export { OverlayPanel };
