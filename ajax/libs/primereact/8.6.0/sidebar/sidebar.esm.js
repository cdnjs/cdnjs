import * as React from 'react';
import PrimeReact, { localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { ZIndexUtils, DomHandler, ObjectUtils, classNames } from 'primereact/utils';

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

var Sidebar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      maskVisibleState = _React$useState2[0],
      setMaskVisibleState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      visibleState = _React$useState4[0],
      setVisibleState = _React$useState4[1];

  var sidebarRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var closeIconRef = React.useRef(null);

  var _useEventListener = useEventListener({
    type: 'keydown',
    listener: function listener(event) {
      if (event.which === 27) {
        if (ZIndexUtils.get(maskRef.current) === ZIndexUtils.getCurrent('modal', PrimeReact.autoZIndex)) {
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
      if (event.which === 2) {
        // left click
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
      ZIndexUtils.set('modal', maskRef.current, PrimeReact.autoZIndex, props.baseZIndex || PrimeReact.zIndex['modal']);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  useUnmountEffect(function () {
    disableDocumentSettings();
    maskRef.current && ZIndexUtils.clear(maskRef.current);
  });

  var createCloseIcon = function createCloseIcon() {
    if (props.showCloseIcon) {
      var ariaLabel = props.ariaCloseLabel || localeOption('close');
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        ref: closeIconRef,
        className: "p-sidebar-close p-sidebar-icon p-link",
        onClick: onClose,
        "aria-label": ariaLabel
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-sidebar-close-icon pi pi-times",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }

    return null;
  };

  var createIcons = function createIcons() {
    return props.icons ? ObjectUtils.getJSXElement(props.icons, props) : null;
  };

  var createElement = function createElement() {
    var otherProps = ObjectUtils.findDiffKeys(props, Sidebar.defaultProps);
    var className = classNames('p-sidebar p-component', props.className);
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
    return /*#__PURE__*/React.createElement("div", {
      ref: maskRef,
      style: props.maskStyle,
      className: maskClassName,
      onMouseDown: onMaskClick
    }, /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: sidebarRef,
      classNames: "p-sidebar",
      "in": visibleState,
      timeout: transitionTimeout,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, /*#__PURE__*/React.createElement("div", _extends({
      ref: sidebarRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      role: "complementary"
    }), /*#__PURE__*/React.createElement("div", {
      className: "p-sidebar-header"
    }, icons, closeIcon), /*#__PURE__*/React.createElement("div", {
      className: "p-sidebar-content"
    }, props.children))));
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
Sidebar.defaultProps = {
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
  ariaCloseLabel: null,
  closeOnEscape: true,
  icons: null,
  modal: true,
  appendTo: null,
  transitionOptions: null,
  onShow: null,
  onHide: null
};

export { Sidebar };
