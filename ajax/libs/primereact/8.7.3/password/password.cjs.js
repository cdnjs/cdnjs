'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var inputtext = require('primereact/inputtext');
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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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

var Password = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var promptLabel = props.promptLabel || PrimeReact.localeOption('passwordPrompt');
  var weakLabel = props.weakLabel || PrimeReact.localeOption('weak');
  var mediumLabel = props.mediumLabel || PrimeReact.localeOption('medium');
  var strongLabel = props.strongLabel || PrimeReact.localeOption('strong');
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    meterState = _React$useState4[0],
    setMeterState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(promptLabel),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    infoTextState = _React$useState6[0],
    setInfoTextState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedState = _React$useState8[0],
    setFocusedState = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    unmaskedState = _React$useState10[0],
    setUnmaskedState = _React$useState10[1];
  var elementRef = React__namespace.useRef(null);
  var overlayRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var mediumCheckRegExp = React__namespace.useRef(new RegExp(props.mediumRegex));
  var strongCheckRegExp = React__namespace.useRef(new RegExp(props.strongRegex));
  var type = unmaskedState ? 'text' : 'password';
  var _useOverlayListener = hooks.useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        valid && hide();
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var currentValue = inputRef.current && inputRef.current.value;
  var isFilled = React__namespace.useMemo(function () {
    return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue) || utils.ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  var updateLabels = function updateLabels() {
    if (meterState) {
      var label = null;
      switch (meterState.strength) {
        case 'weak':
          label = weakLabel;
          break;
        case 'medium':
          label = mediumLabel;
          break;
        case 'strong':
          label = strongLabel;
          break;
      }
      if (label && infoTextState !== label) {
        setInfoTextState(label);
      }
    } else {
      if (infoTextState !== promptLabel) {
        setInfoTextState(promptLabel);
      }
    }
  };
  var onPanelClick = function onPanelClick(event) {
    if (props.feedback) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    }
  };
  var onMaskToggle = function onMaskToggle() {
    setUnmaskedState(function (prevUnmasked) {
      return !prevUnmasked;
    });
  };
  var show = function show() {
    updateLabels();
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var alignOverlay = function alignOverlay() {
    if (inputRef.current) {
      utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
    }
  };
  var onOverlayEnter = function onOverlayEnter() {
    utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
    alignOverlay();
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    utils.ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    if (props.feedback) {
      show();
    }
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    if (props.feedback) {
      hide();
    }
    props.onBlur && props.onBlur(event);
  };
  var onKeyup = function onKeyup(e) {
    var keyCode = e.keyCode || e.which;
    if (props.feedback) {
      var value = e.target.value;
      var label = null;
      var meter = null;
      switch (testStrength(value)) {
        case 1:
          label = weakLabel;
          meter = {
            strength: 'weak',
            width: '33.33%'
          };
          break;
        case 2:
          label = mediumLabel;
          meter = {
            strength: 'medium',
            width: '66.66%'
          };
          break;
        case 3:
          label = strongLabel;
          meter = {
            strength: 'strong',
            width: '100%'
          };
          break;
        default:
          label = promptLabel;
          meter = null;
          break;
      }
      setMeterState(meter);
      setInfoTextState(label);
      if (!!keyCode && !overlayVisibleState) {
        show();
      }
    }
    props.onKeyUp && props.onKeyUp(e);
  };
  var onInput = function onInput(event, validatePattern) {
    if (props.onInput) {
      props.onInput(event, validatePattern);
    }
    if (!props.onChange) {
      utils.ObjectUtils.isNotEmpty(event.target.value) ? utils.DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled') : utils.DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  };
  var testStrength = function testStrength(str) {
    if (strongCheckRegExp.current.test(str)) return 3;else if (mediumCheckRegExp.current.test(str)) return 2;else if (str.length) return 1;
    return 0;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React__namespace.useEffect(function () {
    mediumCheckRegExp.current = new RegExp(props.mediumRegex);
  }, [props.mediumRegex]);
  React__namespace.useEffect(function () {
    strongCheckRegExp.current = new RegExp(props.strongRegex);
  }, [props.strongRegex]);
  React__namespace.useEffect(function () {
    if (!isFilled && utils.DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled')) {
      utils.DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  }, [isFilled]);
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(overlayRef.current);
  });
  var createIcon = function createIcon() {
    if (props.toggleMask) {
      var iconClassName = unmaskedState ? 'pi pi-eye-slash' : 'pi pi-eye';
      var content = /*#__PURE__*/React__namespace.createElement("i", {
        className: iconClassName,
        onClick: onMaskToggle
      });
      if (props.icon) {
        var defaultIconOptions = {
          onClick: onMaskToggle,
          className: iconClassName,
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.icon, defaultIconOptions);
      }
      return content;
    }
    return null;
  };
  var createPanel = function createPanel() {
    var panelClassName = utils.classNames('p-password-panel p-component', props.panelClassName);
    var _ref2 = meterState || {
        strength: '',
        width: '0%'
      },
      strength = _ref2.strength,
      width = _ref2.width;
    var header = utils.ObjectUtils.getJSXElement(props.header, props);
    var footer = utils.ObjectUtils.getJSXElement(props.footer, props);
    var content = props.content ? utils.ObjectUtils.getJSXElement(props.content, props) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-password-meter"
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-password-strength ".concat(strength),
      style: {
        width: width
      }
    })), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-password-info ".concat(strength)
    }, infoTextState));
    var panel = /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: overlayRef,
      classNames: "p-connected-overlay",
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, /*#__PURE__*/React__namespace.createElement("div", {
      ref: overlayRef,
      className: panelClassName,
      style: props.panelStyle,
      onClick: onPanelClick
    }, header, content, footer));
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: panel,
      appendTo: props.appendTo
    });
  };
  var className = utils.classNames('p-password p-component p-inputwrapper', {
    'p-inputwrapper-filled': isFilled,
    'p-inputwrapper-focus': focusedState,
    'p-input-icon-right': props.toggleMask
  }, props.className);
  var inputClassName = utils.classNames('p-password-input', props.inputClassName);
  var inputProps = utils.ObjectUtils.findDiffKeys(props, Password.defaultProps);
  var icon = createIcon();
  var panel = createPanel();
  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
    ref: inputRef,
    id: props.inputId
  }, inputProps, {
    type: type,
    className: inputClassName,
    style: props.inputStyle,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyUp: onKeyup,
    onInput: onInput,
    tooltip: props.tooltip,
    tooltipOptions: props.tooltipOptions
  })), icon, panel);
}));
Password.displayName = 'Password';
Password.defaultProps = {
  __TYPE: 'Password',
  id: null,
  inputId: null,
  inputRef: null,
  promptLabel: null,
  weakLabel: null,
  mediumLabel: null,
  strongLabel: null,
  mediumRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
  feedback: true,
  toggleMask: false,
  appendTo: null,
  header: null,
  content: null,
  footer: null,
  icon: null,
  tooltip: null,
  tooltipOptions: null,
  style: null,
  className: null,
  inputStyle: null,
  inputClassName: null,
  panelStyle: null,
  panelClassName: null,
  transitionOptions: null,
  onInput: null,
  onShow: null,
  onHide: null
};

exports.Password = Password;
