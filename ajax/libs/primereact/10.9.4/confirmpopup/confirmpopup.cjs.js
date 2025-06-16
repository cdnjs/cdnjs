'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var button = require('primereact/button');
var componentbase = require('primereact/componentbase');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var utils = require('primereact/utils');

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

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

var styles = "\n@layer primereact {\n   .p-confirm-popup {\n        margin-top: 10px;       \n    }\n\n    .p-confirm-popup-flipped {\n        margin-top: -10px;\n    }\n    \n    .p-confirm-popup:after, .p-confirm-popup:before {\n        bottom: 100%;\n        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n    \n    .p-confirm-popup:after {\n        border-width: 8px;\n        margin-left: -8px;\n    }\n    \n    .p-confirm-popup:before {\n        border-width: 10px;\n        margin-left: -10px;\n    }\n    \n    .p-confirm-popup-flipped:after, .p-confirm-popup-flipped:before {\n        bottom: auto;\n        top: 100%;\n    }\n    \n    .p-confirm-popup.p-confirm-popup-flipped:after {\n        border-bottom-color: transparent;\n    }\n    \n    .p-confirm-popup.p-confirm-popup-flipped:before {\n        border-bottom-color: transparent\n    }\n    \n    .p-confirm-popup .p-confirm-popup-content {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var context = _ref.context,
      getPropValue = _ref.getPropValue;
    return utils.classNames('p-confirm-popup p-component', getPropValue('className'), {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
  },
  acceptButton: function acceptButton(_ref2) {
    var getPropValue = _ref2.getPropValue;
    return utils.classNames('p-confirm-popup-accept p-button-sm', getPropValue('acceptClassName'));
  },
  rejectButton: function rejectButton(_ref3) {
    var getPropValue = _ref3.getPropValue;
    return utils.classNames('p-confirm-popup-reject p-button-sm', {
      'p-button-text': !getPropValue('rejectClassName')
    }, getPropValue('rejectClassName'));
  },
  content: 'p-confirm-popup-content',
  icon: 'p-confirm-popup-icon',
  message: 'p-confirm-popup-message',
  footer: 'p-confirm-popup-footer',
  transition: 'p-connected-overlay'
};
var ConfirmPopupBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ConfirmPopup',
    accept: null,
    acceptClassName: null,
    acceptIcon: null,
    acceptLabel: null,
    appendTo: null,
    children: undefined,
    className: null,
    closeOnEscape: true,
    content: null,
    defaultFocus: 'accept',
    dismissable: true,
    footer: null,
    icon: null,
    message: null,
    onHide: null,
    onShow: null,
    reject: null,
    rejectClassName: null,
    rejectIcon: null,
    rejectLabel: null,
    style: null,
    tagKey: undefined,
    target: null,
    transitionOptions: null,
    visible: false
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var confirmPopup = function confirmPopup() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  props = _objectSpread(_objectSpread({}, props), {
    visible: props.visible === undefined ? true : props.visible
  });
  props.visible && overlayservice.OverlayService.emit('confirm-popup', props);
  var show = function show() {
    var updatedProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    overlayservice.OverlayService.emit('confirm-popup', _objectSpread(_objectSpread(_objectSpread({}, props), updatedProps), {
      visible: true
    }));
  };
  var hide = function hide() {
    overlayservice.OverlayService.emit('confirm-popup', {
      visible: false
    });
  };
  return {
    show: show,
    hide: hide
  };
};
var ConfirmPopup = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = ConfirmPopupBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.visible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    reshowState = _React$useState4[0],
    setReshowState = _React$useState4[1];
  var metaData = {
    props: props,
    state: {
      visible: visibleState,
      reshow: reshowState
    }
  };
  var _ConfirmPopupBase$set = ConfirmPopupBase.setMetaData(metaData),
    ptm = _ConfirmPopupBase$set.ptm,
    cx = _ConfirmPopupBase$set.cx,
    isUnstyled = _ConfirmPopupBase$set.isUnstyled;
  componentbase.useHandleStyle(ConfirmPopupBase.css.styles, isUnstyled, {
    name: 'confirmpopup'
  });
  var overlayRef = React__namespace.useRef(null);
  var acceptBtnRef = React__namespace.useRef(null);
  var rejectBtnRef = React__namespace.useRef(null);
  var isPanelClicked = React__namespace.useRef(false);
  var overlayEventListener = React__namespace.useRef(null);
  var confirmProps = React__namespace.useRef(null);
  var focusElementOnHide = React__namespace.useRef(null);
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
  var acceptLabel = getPropValue('acceptLabel') || PrimeReact.localeOption('accept');
  var rejectLabel = getPropValue('rejectLabel') || PrimeReact.localeOption('reject');
  var isCloseOnEscape = props.dismissable && props.closeOnEscape && visibleState;
  var displayOrder = hooks.useDisplayOrder('dialog', isCloseOnEscape);
  hooks.useGlobalOnEscapeKey({
    callback: function callback() {
      hide('hide');
    },
    when: isCloseOnEscape && displayOrder,
    priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.DIALOG, displayOrder]
  });
  var _useOverlayListener = hooks.useOverlayListener({
      target: getPropValue('target'),
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? props.dismissable && !isPanelClicked.current && hide('hide') : hide('hide');
        }
        isPanelClicked.current = false;
      },
      when: visibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var onPanelClick = function onPanelClick(event) {
    isPanelClicked.current = true;
    overlayservice.OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: getPropValue('target')
    });
  };
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
    var currentProps = getCurrentProps();
    setReshowState(false);
    if (currentProps.group === props.group) {
      setVisibleState(true);
      isCallbackExecuting.current = false;
      overlayEventListener.current = function (e) {
        !isOutsideClicked(e.target) && (isPanelClicked.current = true);
      };
      overlayservice.OverlayService.on('overlay-click', overlayEventListener.current);

      // Remember the focused element before we opened the dialog
      // so we can return focus to it once we close the dialog.
      focusElementOnHide.current = document.activeElement;
    }
  };
  var hide = function hide(result) {
    setVisibleState(false);
    overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
    overlayEventListener.current = null;
    if (result) {
      callbackFromProp('onHide', result);
    }
    utils.DomHandler.focus(focusElementOnHide.current);
    focusElementOnHide.current = null;
  };
  var onEnter = function onEnter() {
    utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
    utils.DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    align();
  };
  var onEntered = function onEntered() {
    bindOverlayListener();
    var defaultFocus = getPropValue('defaultFocus');
    if (defaultFocus === undefined || defaultFocus === 'accept') {
      acceptBtnRef.current && acceptBtnRef.current.focus();
    }
    if (defaultFocus === 'reject') {
      rejectBtnRef.current && rejectBtnRef.current.focus();
    }
    callbackFromProp('onShow');
  };
  var onExit = function onExit() {
    unbindOverlayListener();
  };
  var onExited = function onExited() {
    utils.ZIndexUtils.clear(overlayRef.current);
    isPanelClicked.current = false;
  };
  var align = function align() {
    if (getPropValue('target')) {
      utils.DomHandler.absolutePosition(overlayRef.current, getPropValue('target'));
      var containerOffset = utils.DomHandler.getOffset(overlayRef.current);
      var targetOffset = utils.DomHandler.getOffset(getPropValue('target'));
      var arrowLeft = 0;
      if (containerOffset.left < targetOffset.left) {
        arrowLeft = targetOffset.left - containerOffset.left;
      }
      overlayRef.current.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));
      if (containerOffset.top < targetOffset.top) {
        !isUnstyled() && utils.DomHandler.addClass(overlayRef.current, 'p-confirm-popup-flipped');
      }
    }
  };
  var isOutsideClicked = function isOutsideClicked(target) {
    return overlayRef && overlayRef.current && !(overlayRef.current.isSameNode(target) || overlayRef.current.contains(target));
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
      overlayservice.OverlayService.on('confirm-popup', confirm);
    }
    return function () {
      overlayservice.OverlayService.off('confirm-popup', confirm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.target]);
  hooks.useUpdateEffect(function () {
    reshowState && show();
  }, [reshowState]);
  hooks.useUnmountEffect(function () {
    if (overlayEventListener.current) {
      overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;
    }
    overlayservice.OverlayService.off('confirm-popup', confirm);
    utils.ZIndexUtils.clear(overlayRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      confirm: confirm
    };
  });
  var createContent = function createContent() {
    var currentProps = getCurrentProps();
    var message = utils.ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = utils.IconUtils.getJSXIcon(getPropValue('icon'), _objectSpread({}, iconProps), {
      props: currentProps
    });
    var messageProps = mergeProps({
      className: cx('message')
    }, ptm('message'));
    var contentProps = mergeProps({
      className: cx('content')
    }, ptm('content'));
    return /*#__PURE__*/React__namespace.createElement("div", contentProps, icon, /*#__PURE__*/React__namespace.createElement("span", messageProps, message));
  };
  var createFooter = function createFooter() {
    var acceptClassName = utils.classNames('p-confirm-popup-accept p-button-sm', getPropValue('acceptClassName'));
    var rejectClassName = utils.classNames('p-confirm-popup-reject p-button-sm', {
      'p-button-text': !getPropValue('rejectClassName')
    }, getPropValue('rejectClassName'));
    var footerProps = mergeProps({
      className: cx('footer')
    }, ptm('footer'));
    var rejectButtonProps = mergeProps({
      ref: rejectBtnRef,
      label: rejectLabel,
      icon: getPropValue('rejectIcon'),
      className: cx('rejectButton', {
        getPropValue: getPropValue
      }),
      onClick: reject,
      pt: ptm('rejectButton'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: metaData
      }
    });
    var acceptButtonProps = mergeProps({
      ref: acceptBtnRef,
      label: acceptLabel,
      icon: getPropValue('acceptIcon'),
      className: cx('acceptButton', {
        getPropValue: getPropValue
      }),
      onClick: accept,
      pt: ptm('acceptButton'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: metaData
      }
    });
    var content = /*#__PURE__*/React__namespace.createElement("div", footerProps, /*#__PURE__*/React__namespace.createElement(button.Button, rejectButtonProps), /*#__PURE__*/React__namespace.createElement(button.Button, acceptButtonProps));
    if (getPropValue('footer')) {
      var defaultContentOptions = {
        accept: accept,
        reject: reject,
        className: 'p-confirm-popup-footer',
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
  var rootProps = mergeProps({
    ref: overlayRef,
    id: getPropValue('id'),
    className: utils.classNames(props.className, cx('root', {
      context: context,
      getPropValue: getPropValue
    })),
    style: getPropValue('style'),
    onClick: onPanelClick
  }, ConfirmPopupBase.getOtherProps(props), ptm('root'));
  var transitionProps = mergeProps({
    classNames: cx('transition'),
    "in": visibleState,
    timeout: {
      enter: 120,
      exit: 100
    },
    options: getPropValue('transitionOptions'),
    unmountOnExit: true,
    onEnter: onEnter,
    onEntered: onEntered,
    onExit: onExit,
    onExited: onExited
  }, ptm('transition'));
  var createTemplateElement = function createTemplateElement() {
    var currentProps = getCurrentProps();
    var message = utils.ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
    var templateElementProps = {
      message: message,
      acceptBtnRef: acceptBtnRef,
      rejectBtnRef: rejectBtnRef,
      hide: hide
    };
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", rootProps, utils.ObjectUtils.getJSXElement(inProps.content, templateElementProps)));
  };
  var createElement = function createElement() {
    var content = createContent();
    var footer = createFooter();
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", rootProps, content, footer));
  };
  var element = inProps !== null && inProps !== void 0 && inProps.content ? createTemplateElement() : createElement();
  return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: getPropValue('appendTo'),
    visible: getPropValue('visible')
  });
}));
ConfirmPopup.displayName = 'ConfirmPopup';

exports.ConfirmPopup = ConfirmPopup;
exports.confirmPopup = confirmPopup;
