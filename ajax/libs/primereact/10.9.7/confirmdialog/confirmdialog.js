this.primereact = this.primereact || {};
this.primereact.confirmdialog = (function (exports, React, api, button, componentbase, dialog, hooks, overlayservice, portal, utils) {
  'use strict';

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

  var classes = {
    root: 'p-confirm-dialog',
    message: 'p-confirm-dialog-message',
    icon: 'p-confirm-dialog-icon',
    acceptButton: 'p-confirm-dialog-accept',
    rejectButton: function rejectButton(_ref) {
      var getPropValue = _ref.getPropValue;
      return utils.classNames('p-confirm-dialog-reject', {
        'p-button-text': !getPropValue('rejectClassName')
      });
    }
  };
  var ConfirmDialogBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'ConfirmDialog',
      accept: null,
      acceptClassName: null,
      acceptIcon: null,
      acceptLabel: null,
      appendTo: null,
      breakpoints: null,
      children: undefined,
      className: null,
      content: null,
      defaultFocus: 'accept',
      footer: null,
      icon: null,
      message: null,
      onHide: null,
      reject: null,
      rejectClassName: null,
      rejectIcon: null,
      rejectLabel: null,
      tagKey: undefined,
      visible: undefined
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
  var ConfirmDialog = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
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
    var focusElementOnHide = React__namespace.useRef(null);
    var getCurrentProps = function getCurrentProps() {
      var group = props.group;
      if (confirmProps.current) {
        group = confirmProps.current.group;
      }
      return Object.assign({}, props, confirmProps.current, {
        group: group
      });
    };
    var getPropValue = function getPropValue(key) {
      return getCurrentProps()[key];
    };
    var callbackFromProp = function callbackFromProp(key) {
      for (var _len = arguments.length, param = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        param[_key - 1] = arguments[_key];
      }
      return utils.ObjectUtils.getPropValue(getPropValue(key), param);
    };
    var acceptLabel = getPropValue('acceptLabel') || api.localeOption('accept');
    var rejectLabel = getPropValue('rejectLabel') || api.localeOption('reject');
    var metaData = {
      props: props,
      state: {
        visible: visibleState
      }
    };
    var _ConfirmDialogBase$se = ConfirmDialogBase.setMetaData(metaData),
      ptm = _ConfirmDialogBase$se.ptm,
      cx = _ConfirmDialogBase$se.cx,
      isUnstyled = _ConfirmDialogBase$se.isUnstyled;
    componentbase.useHandleStyle(ConfirmDialogBase.css.styles, isUnstyled, {
      name: 'confirmdialog'
    });
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
      if (currentProps.group === props.group) {
        setVisibleState(true);
        isCallbackExecuting.current = false;

        // Remember the focused element before we opened the dialog
        // so we can return focus to it once we close the dialog.
        focusElementOnHide.current = document.activeElement;
      }
    };
    var hide = function hide() {
      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cancel';
      if (visibleState) {
        if (typeof result !== 'string') {
          result = 'cancel';
        }
        setVisibleState(false);
        callbackFromProp('onHide', result);
        utils.DomHandler.focus(focusElementOnHide.current);
        focusElementOnHide.current = null;
      }
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
      var defaultFocus = getPropValue('defaultFocus');
      var acceptClassName = utils.classNames('p-confirm-dialog-accept', getPropValue('acceptClassName'));
      var rejectClassName = utils.classNames('p-confirm-dialog-reject', {
        'p-button-text': !getPropValue('rejectClassName')
      }, getPropValue('rejectClassName'));
      var rejectButtonProps = mergeProps({
        label: rejectLabel,
        autoFocus: defaultFocus === 'reject',
        icon: getPropValue('rejectIcon'),
        className: utils.classNames(getPropValue('rejectClassName'), cx('rejectButton', {
          getPropValue: getPropValue
        })),
        onClick: reject,
        pt: ptm('rejectButton'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: metaData
        }
      }, ptm('rejectButton'));
      var acceptButtonProps = mergeProps({
        label: acceptLabel,
        autoFocus: defaultFocus === undefined || defaultFocus === 'accept',
        icon: getPropValue('acceptIcon'),
        className: utils.classNames(getPropValue('acceptClassName'), cx('acceptButton')),
        onClick: accept,
        pt: ptm('acceptButton'),
        unstyled: props.unstyled,
        __parentMetadata: {
          parent: metaData
        }
      }, ptm('acceptButton'));
      var content = /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(button.Button, rejectButtonProps), /*#__PURE__*/React__namespace.createElement(button.Button, acceptButtonProps));
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
      var message = utils.ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
      var iconProps = mergeProps({
        className: cx('icon')
      }, ptm('icon'));
      var icon = utils.IconUtils.getJSXIcon(getPropValue('icon'), _objectSpread({}, iconProps), {
        props: currentProps
      });
      var footer = createFooter();
      var messageProps = mergeProps({
        className: cx('message')
      }, ptm('message'));
      var rootProps = mergeProps({
        visible: visibleState,
        className: utils.classNames(getPropValue('className'), cx('root')),
        footer: footer,
        onHide: hide,
        breakpoints: getPropValue('breakpoints'),
        pt: currentProps.pt,
        unstyled: props.unstyled,
        appendTo: getPropValue('appendTo'),
        __parentMetadata: {
          parent: metaData
        }
      }, ConfirmDialogBase.getOtherProps(currentProps));
      return /*#__PURE__*/React__namespace.createElement(dialog.Dialog, _extends({}, rootProps, {
        content: inProps === null || inProps === void 0 ? void 0 : inProps.content
      }), icon, /*#__PURE__*/React__namespace.createElement("span", messageProps, message));
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

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.componentbase, primereact.dialog, primereact.hooks, primereact.overlayservice, primereact.portal, primereact.utils);
