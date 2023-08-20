import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { ZIndexUtils, DomHandler, classNames, mergeProps, IconUtils, ObjectUtils } from 'primereact/utils';
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

var SidebarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Sidebar',
    id: null,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
    visible: false,
    position: 'left',
    fullScreen: false,
    blockScroll: false,
    baseZIndex: 0,
    dismissable: true,
    showCloseIcon: true,
    closeIcon: null,
    ariaCloseLabel: null,
    closeOnEscape: true,
    icons: null,
    modal: true,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Sidebar = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = SidebarBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    maskVisibleState = _React$useState2[0],
    setMaskVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _SidebarBase$setMetaD = SidebarBase.setMetaData({
      props: props,
      state: {
        containerVisible: maskVisibleState
      }
    }),
    ptm = _SidebarBase$setMetaD.ptm;
  var sidebarRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var closeIconRef = React.useRef(null);
  var _useEventListener = useEventListener({
      type: 'keydown',
      listener: function listener(event) {
        if (event.key === 'Escape') {
          if (ZIndexUtils.get(maskRef.current) === ZIndexUtils.getCurrent('modal', context && context.autoZIndex || PrimeReact.autoZIndex)) {
            onClose(event);
          }
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentEscapeListener = _useEventListener2[0],
    unbindDocumentEscapeListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (event.button !== 0) {
          // ignore anything other than left click
          return;
        }
        if (isOutsideClicked(event)) {
          onClose(event);
        }
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentClickListener = _useEventListener4[0],
    unbindDocumentClickListener = _useEventListener4[1];
  var isOutsideClicked = function isOutsideClicked(event) {
    return sidebarRef && sidebarRef.current && !sidebarRef.current.contains(event.target);
  };
  var getPositionClass = function getPositionClass() {
    var positions = ['left', 'right', 'top', 'bottom'];
    var pos = positions.find(function (item) {
      return item === props.position;
    });
    return pos ? "p-sidebar-".concat(pos) : '';
  };
  var focus = function focus() {
    var activeElement = document.activeElement;
    var isActiveElementInDialog = activeElement && sidebarRef && sidebarRef.current.contains(activeElement);
    if (!isActiveElementInDialog && props.showCloseIcon) {
      closeIconRef.current.focus();
    }
  };
  var onMaskClick = function onMaskClick(event) {
    if (props.dismissable && props.modal && maskRef.current === event.target) {
      onClose(event);
    }
  };
  var onClose = function onClose(event) {
    props.onHide();
    event.preventDefault();
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
    focus();
    enableDocumentSettings();
  };
  var onExiting = function onExiting() {
    if (props.modal) {
      DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
    }
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
    disableDocumentSettings();
  };
  var enableDocumentSettings = function enableDocumentSettings() {
    if (props.closeOnEscape) {
      bindDocumentEscapeListener();
    }
    if (props.dismissable && !props.modal) {
      bindDocumentClickListener();
    }
    if (props.blockScroll) {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  };
  var disableDocumentSettings = function disableDocumentSettings() {
    unbindDocumentEscapeListener();
    unbindDocumentClickListener();
    if (props.blockScroll) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return sidebarRef.current;
      },
      gteMask: function gteMask() {
        return maskRef.current;
      },
      getCloseIcon: function getCloseIcon() {
        return closeIconRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (props.visible) {
      setMaskVisibleState(true);
    }
  });
  useUpdateEffect(function () {
    if (props.visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }
    if (props.visible !== visibleState && maskVisibleState) {
      setVisibleState(props.visible);
    }
  });
  useUpdateEffect(function () {
    if (maskVisibleState) {
      ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['modal'] || PrimeReact.zIndex['modal']);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  useUpdateEffect(function () {
    // #3811 if dismissible state is toggled while open we must unregister and re-regisetr
    if (visibleState) {
      unbindDocumentClickListener();
      if (props.dismissable && !props.modal) {
        bindDocumentClickListener();
      }
    }
  }, [props.dismissable, props.modal, visibleState]);
  useUnmountEffect(function () {
    disableDocumentSettings();
    maskRef.current && ZIndexUtils.clear(maskRef.current);
  });
  var createCloseIcon = function createCloseIcon() {
    var iconClassName = 'p-sidebar-close-icon';
    var closeButtonProps = mergeProps({
      type: 'button',
      ref: closeIconRef,
      className: 'p-sidebar-close p-sidebar-icon p-link',
      onClick: function onClick(e) {
        return onClose(e);
      },
      'aria-label': ariaLabel
    }, ptm('closeButton'));
    var closeIconProps = mergeProps({
      className: iconClassName
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var ariaLabel = props.ariaCloseLabel || localeOption('close');
    if (props.showCloseIcon) {
      return /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createIcons = function createIcons() {
    return props.icons ? ObjectUtils.getJSXElement(props.icons, props) : null;
  };
  var createElement = function createElement() {
    var className = classNames('p-sidebar p-component', props.className, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var maskClassName = classNames('p-sidebar-mask', {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-sidebar-mask-scrollblocker': props.blockScroll,
      'p-sidebar-visible': maskVisibleState,
      'p-sidebar-full': props.fullScreen
    }, getPositionClass(), props.maskClassName);
    var closeIcon = createCloseIcon();
    var icons = createIcons();
    var transitionTimeout = {
      enter: props.fullScreen ? 150 : 300,
      exit: props.fullScreen ? 150 : 300
    };
    var maskProps = mergeProps({
      ref: maskRef,
      style: props.maskStyle,
      className: maskClassName,
      onMouseDown: function onMouseDown(e) {
        return onMaskClick(e);
      }
    }, ptm('mask'));
    var rootProps = mergeProps({
      id: props.id,
      ref: sidebarRef,
      className: className,
      style: props.style,
      role: 'complementary'
    }, SidebarBase.getOtherProps(props), ptm('root'));
    var headerProps = mergeProps({
      className: 'p-sidebar-header'
    }, ptm('header'));
    var contentProps = mergeProps({
      className: 'p-sidebar-content'
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", maskProps, /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: sidebarRef,
      classNames: "p-sidebar",
      "in": visibleState,
      timeout: transitionTimeout,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", headerProps, icons, closeIcon), /*#__PURE__*/React.createElement("div", contentProps, props.children))));
  };
  var createSidebar = function createSidebar() {
    var element = createElement();
    return /*#__PURE__*/React.createElement(Portal, {
      element: element,
      appendTo: props.appendTo,
      visible: true
    });
  };
  return maskVisibleState && createSidebar();
});
Sidebar.displayName = 'Sidebar';

export { Sidebar };
