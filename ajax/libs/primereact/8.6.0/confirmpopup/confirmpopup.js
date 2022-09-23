this.primereact = this.primereact || {};
this.primereact.confirmpopup = (function (exports, React, PrimeReact, button, csstransition, hooks, overlayservice, portal, utils) {
  'use strict';

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
  var ConfirmPopup = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(props.visible),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        visibleState = _React$useState2[0],
        setVisibleState = _React$useState2[1];

    var _React$useState3 = React__namespace.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        reshowState = _React$useState4[0],
        setReshowState = _React$useState4[1];

    var overlayRef = React__namespace.useRef(null);
    var acceptBtnRef = React__namespace.useRef(null);
    var isPanelClicked = React__namespace.useRef(false);
    var overlayEventListener = React__namespace.useRef(null);
    var confirmProps = React__namespace.useRef(null);

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

    var _useOverlayListener = hooks.useOverlayListener({
      target: getPropValue('target'),
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

    var onPanelClick = function onPanelClick(event) {
      isPanelClicked.current = true;
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: getPropValue('target')
      });
    };

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
      setReshowState(false);

      overlayEventListener.current = function (e) {
        !isOutsideClicked(e.target) && (isPanelClicked.current = true);
      };

      overlayservice.OverlayService.on('overlay-click', overlayEventListener.current);
    };

    var hide = function hide(result) {
      setVisibleState(false);
      overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
      overlayEventListener.current = null;

      if (result) {
        callbackFromProp('onHide', result);
      }
    };

    var onEnter = function onEnter() {
      utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
      align();
    };

    var onEntered = function onEntered() {
      bindOverlayListener();

      if (acceptBtnRef.current) {
        acceptBtnRef.current.focus();
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
          utils.DomHandler.addClass(overlayRef.current, 'p-confirm-popup-flipped');
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
      props.visible ? show() : hide(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible]);
    React__namespace.useEffect(function () {
      if (!props.target && !props.message) {
        overlayservice.OverlayService.on('confirm-popup', confirm);
      }

      return function () {
        overlayservice.OverlayService.off('confirm-popup', confirm);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
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
      var icon = utils.IconUtils.getJSXIcon(getPropValue('icon'), {
        className: 'p-confirm-popup-icon'
      }, {
        props: currentProps
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-confirm-popup-content"
      }, icon, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-confirm-popup-message"
      }, message));
    };

    var createFooter = function createFooter() {
      var acceptClassName = utils.classNames('p-confirm-popup-accept p-button-sm', getPropValue('acceptClassName'));
      var rejectClassName = utils.classNames('p-confirm-popup-reject p-button-sm', {
        'p-button-text': !getPropValue('rejectClassName')
      }, getPropValue('rejectClassName'));
      var content = /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-confirm-popup-footer"
      }, /*#__PURE__*/React__namespace.createElement(button.Button, {
        label: rejectLabel,
        icon: getPropValue('rejectIcon'),
        className: rejectClassName,
        onClick: reject
      }), /*#__PURE__*/React__namespace.createElement(button.Button, {
        ref: acceptBtnRef,
        label: acceptLabel,
        icon: getPropValue('acceptIcon'),
        className: acceptClassName,
        onClick: accept
      }));

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

    var createElement = function createElement() {
      var otherProps = utils.ObjectUtils.findDiffKeys(props, ConfirmPopup.defaultProps);
      var className = utils.classNames('p-confirm-popup p-component', getPropValue('className'));
      var content = createContent();
      var footer = createFooter();
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: overlayRef,
        classNames: "p-connected-overlay",
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
      }, /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: overlayRef,
        id: getPropValue('id'),
        className: className,
        style: getPropValue('style')
      }, otherProps, {
        onClick: onPanelClick
      }), content, footer));
    };

    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: getPropValue('appendTo'),
      visible: getPropValue('visible')
    });
  }));
  ConfirmPopup.displayName = 'ConfirmPopup';
  ConfirmPopup.defaultProps = {
    __TYPE: 'ConfirmPopup',
    tagKey: undefined,
    target: null,
    visible: false,
    message: null,
    rejectLabel: null,
    acceptLabel: null,
    icon: null,
    rejectIcon: null,
    acceptIcon: null,
    rejectClassName: null,
    acceptClassName: null,
    className: null,
    style: null,
    appendTo: null,
    dismissable: true,
    footer: null,
    onShow: null,
    onHide: null,
    accept: null,
    reject: null,
    transitionOptions: null
  };

  exports.ConfirmPopup = ConfirmPopup;
  exports.confirmPopup = confirmPopup;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.csstransition, primereact.hooks, primereact.overlayservice, primereact.portal, primereact.utils);
