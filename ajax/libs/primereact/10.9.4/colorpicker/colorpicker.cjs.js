'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var csstransition = require('primereact/csstransition');
var portal = require('primereact/portal');

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

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames('p-colorpicker p-component', {
      'p-colorpicker-overlay': !props.inline
    });
  },
  input: function input(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-colorpicker-preview p-inputtext', props.inputClassName, {
      'p-disabled': props.disabled
    });
  },
  panel: function panel(_ref3) {
    var panelProps = _ref3.panelProps,
      context = _ref3.context;
    return utils.classNames('p-colorpicker-panel', panelProps.panelClassName, {
      'p-colorpicker-overlay-panel': !panelProps.inline,
      'p-disabled': panelProps.disabled,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
  },
  content: 'p-colorpicker-content',
  hueHandle: 'p-colorpicker-hue-handle',
  hue: 'p-colorpicker-hue',
  colorHandle: 'p-colorpicker-color-handle',
  color: 'p-colorpicker-color',
  selector: 'p-colorpicker-color-selector',
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-colorpicker {\n        display: inline-block;\n    }\n    \n    .p-colorpicker-dragging {\n        cursor: pointer;\n    }\n    \n    .p-colorpicker-overlay {\n        position: relative;\n    }\n    \n    .p-colorpicker-panel {\n        position: relative;\n        width: 193px;\n        height: 166px;\n    }\n    \n    .p-colorpicker-overlay-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n    \n    .p-colorpicker-preview {\n        cursor: pointer;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-content {\n        position: relative;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-color-selector {\n        width: 150px;\n        height: 150px;\n        top: 8px;\n        left: 8px;\n        position: absolute;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-color {\n        width: 150px;\n        height: 150px;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-color-handle {\n        position: absolute;\n        top: 0px;\n        left: 150px;\n        border-radius: 100%;\n        width: 10px;\n        height: 10px;\n        border-width: 1px;\n        border-style: solid;\n        margin: -5px 0 0 -5px;\n        cursor: pointer;\n        opacity: 0.85;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-hue {\n        width: 17px;\n        height: 150px;\n        top: 8px;\n        left: 167px;\n        position: absolute;\n        opacity: 0.85;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-hue-handle {\n        position: absolute;\n        top: 150px;\n        left: 0px;\n        width: 21px;\n        margin-left: -2px;\n        margin-top: -5px;\n        height: 10px;\n        border-width: 2px;\n        border-style: solid;\n        opacity: 0.85;\n        cursor: pointer;\n    }\n    \n    .p-colorpicker-panel .p-colorpicker-color {\n        background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)\n    }\n    .p-colorpicker-panel .p-colorpicker-hue {\n        background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)\n    }\n}\n";
var ColorPickerBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ColorPicker',
    appendTo: null,
    autoFocus: false,
    children: undefined,
    className: null,
    defaultColor: 'ff0000',
    disabled: false,
    format: 'hex',
    id: null,
    inline: false,
    inputClassName: null,
    inputId: null,
    inputRef: null,
    inputStyle: null,
    onChange: null,
    onHide: null,
    onShow: null,
    panelClassName: null,
    panelStyle: null,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    value: null
  },
  css: {
    classes: classes,
    styles: styles
  }
});

var ColorPickerPanel = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var ptm = props.ptm,
    cx = props.cx;
  var createElement = function createElement() {
    var panelProps = mergeProps({
      className: cx('panel', {
        panelProps: props,
        context: context
      }),
      style: props.panelStyle,
      onClick: props.onClick
    }, ptm('panel', {
      hostName: props.hostName
    }));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: props.onEnter,
      onEntered: props.onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, ptm('transition', {
      hostName: props.hostName
    }));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: ref
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: ref
    }, panelProps), props.children));
  };
  var element = createElement();
  return props.inline ? element : /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
ColorPickerPanel.displayName = 'ColorPickerPanel';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ColorPicker = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = ColorPickerBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _ColorPickerBase$setM = ColorPickerBase.setMetaData({
      props: props,
      state: {
        overlayVisible: overlayVisibleState
      }
    }),
    ptm = _ColorPickerBase$setM.ptm,
    cx = _ColorPickerBase$setM.cx,
    isUnstyled = _ColorPickerBase$setM.isUnstyled;
  var isCloseOnEscape = overlayVisibleState && props.closeOnEscape;
  var overlayDisplayOrder = hooks.useDisplayOrder('overlay-panel', isCloseOnEscape);
  componentbase.useHandleStyle(ColorPickerBase.css.styles, isUnstyled, {
    name: 'colorpicker'
  });
  hooks.useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: overlayVisibleState && overlayDisplayOrder,
    priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.OVERLAY_PANEL, overlayDisplayOrder]
  });
  var elementRef = React__namespace.useRef(null);
  var overlayRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var colorSelectorRef = React__namespace.useRef(null);
  var colorHandleRef = React__namespace.useRef(null);
  var hueHandleRef = React__namespace.useRef(null);
  var hueViewRef = React__namespace.useRef(null);
  var hueDragging = React__namespace.useRef(false);
  var hsbValue = React__namespace.useRef(null);
  var colorDragging = React__namespace.useRef(false);
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
  var _useEventListener = hooks.useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        colorDragging.current && pickColor(event);
        hueDragging.current && pickHue(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = hooks.useEventListener({
      type: 'mouseup',
      listener: function listener() {
        colorDragging.current = hueDragging.current = false;
        utils.DomHandler.removeClass(elementRef.current, 'p-colorpicker-dragging');
        unbindDocumentMouseMoveListener();
        unbindDocumentMouseUpListener();
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var onPanelClick = function onPanelClick(event) {
    if (!props.inline) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    }
  };
  var onHueMousedown = function onHueMousedown(event) {
    if (props.disabled) {
      return;
    }
    bindDragListeners();
    onHueDragStart(event);
  };
  var onHueDragStart = function onHueDragStart(event) {
    if (props.disabled) {
      return;
    }
    hueDragging.current = true;
    pickHue(event);
    !isUnstyled && utils.DomHandler.addClass(elementRef.current, 'p-colorpicker-dragging');
    event.preventDefault();
  };
  var getPositionY = function getPositionY(event) {
    if (event.pageY !== undefined) return event.pageY;else if (event.changedTouches !== undefined) return event.changedTouches[0].pageY;else return 0;
  };
  var pickHue = function pickHue(event) {
    var top = hueViewRef.current.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
    var yPos = getPositionY(event);
    var hue = Math.floor(360 * (150 - Math.max(0, Math.min(150, yPos - top))) / 150);
    hsbValue.current = validateHSB({
      h: hue,
      s: hsbValue.current.s,
      b: hsbValue.current.b
    });
    updateColorSelector();
    updateHue();
    updateModel();
  };
  var onColorMousedown = function onColorMousedown(event) {
    if (props.disabled) {
      return;
    }
    bindDragListeners();
    onColorDragStart(event);
  };
  var onColorDragStart = function onColorDragStart(event) {
    if (props.disabled) {
      return;
    }
    colorDragging.current = true;
    pickColor(event);
    !isUnstyled && utils.DomHandler.addClass(elementRef.current, 'p-colorpicker-dragging');
    event.preventDefault();
  };
  var onDrag = function onDrag(event) {
    if (colorDragging.current) {
      pickColor(event);
      event.preventDefault();
    }
    if (hueDragging.current) {
      pickHue(event);
      event.preventDefault();
    }
  };
  var onDragEnd = function onDragEnd() {
    colorDragging.current = false;
    hueDragging.current = false;
    !isUnstyled && utils.DomHandler.removeClass(elementRef.current, 'p-colorpicker-dragging');
    unbindDragListeners();
  };
  var bindDragListeners = function bindDragListeners() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindDragListeners = function unbindDragListeners() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var pickColor = function pickColor(event) {
    var rect = colorSelectorRef.current.getBoundingClientRect();
    var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    var left = rect.left + document.body.scrollLeft;
    var saturation = Math.floor(100 * Math.max(0, Math.min(150, (event.pageX || event.changedTouches[0].pageX) - left)) / 150);
    var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top))) / 150);
    hsbValue.current = validateHSB({
      h: hsbValue.current.h,
      s: saturation,
      b: brightness
    });
    updateColorHandle();
    updateInput();
    updateModel();
  };
  var updateModel = function updateModel() {
    switch (props.format) {
      case 'hex':
        onChange(HSBtoHEX(hsbValue.current));
        break;
      case 'rgb':
        onChange(HSBtoRGB(hsbValue.current));
        break;
      case 'hsb':
        onChange(hsbValue.current);
        break;
    }
  };
  var toHSB = function toHSB(value) {
    var hsb;
    if (value) {
      switch (props.format) {
        case 'hex':
          hsb = HEXtoHSB(value);
          break;
        case 'rgb':
          hsb = RGBtoHSB(value);
          break;
        case 'hsb':
          hsb = value;
          break;
      }
    } else {
      hsb = HEXtoHSB(props.defaultColor);
    }
    return hsb;
  };
  var updateHSBValue = function updateHSBValue(value) {
    hsbValue.current = toHSB(value);
  };
  var onChange = function onChange(value) {
    if (props.onChange) {
      props.onChange({
        value: value,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var updateColorSelector = function updateColorSelector() {
    if (colorSelectorRef.current) {
      var newHsbValue = validateHSB({
        h: hsbValue.current.h,
        s: 100,
        b: 100
      });
      colorSelectorRef.current.style.backgroundColor = '#' + HSBtoHEX(newHsbValue);
    }
  };
  var updateColorHandle = function updateColorHandle() {
    if (colorHandleRef.current) {
      colorHandleRef.current.style.left = Math.floor(150 * hsbValue.current.s / 100) + 'px';
      colorHandleRef.current.style.top = Math.floor(150 * (100 - hsbValue.current.b) / 100) + 'px';
    }
  };
  var updateHue = function updateHue() {
    if (hueHandleRef.current) {
      hueHandleRef.current.style.top = Math.floor(150 - 150 * hsbValue.current.h / 360) + 'px';
    }
  };
  var updateInput = function updateInput() {
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = '#' + HSBtoHEX(hsbValue.current);
    }
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var onOverlayEnter = function onOverlayEnter() {
    var styles = !props.inline ? {
      position: 'absolute',
      top: '0',
      left: '0'
    } : undefined;
    utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
    utils.DomHandler.addStyles(overlayRef.current, styles);
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
  var onInputClick = function onInputClick() {
    togglePanel();
  };
  var togglePanel = function togglePanel() {
    overlayVisibleState ? hide() : show();
  };
  var onInputKeydown = function onInputKeydown(event) {
    switch (event.which) {
      //space
      case 32:
        togglePanel();
        event.preventDefault();
        break;

      //escape and tab
      case 27:
      case 9:
        hide();
        break;
    }
  };
  var validateHSB = function validateHSB(hsb) {
    return {
      h: Math.min(360, Math.max(0, hsb.h)),
      s: Math.min(100, Math.max(0, hsb.s)),
      b: Math.min(100, Math.max(0, hsb.b))
    };
  };
  var HEXtoRGB = function HEXtoRGB(hex) {
    var hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
    return {
      r: hexValue >> 16,
      g: (hexValue & 0x00ff00) >> 8,
      b: hexValue & 0x0000ff
    };
  };
  var HEXtoHSB = function HEXtoHSB(hex) {
    return RGBtoHSB(HEXtoRGB(hex));
  };
  var RGBtoHSB = function RGBtoHSB(rgb) {
    var hsb = {
      h: 0,
      s: 0,
      b: 0
    };
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var delta = max - min;
    hsb.b = max;
    hsb.s = max !== 0 ? 255 * delta / max : 0;
    if (hsb.s !== 0) {
      if (rgb.r === max) {
        hsb.h = (rgb.g - rgb.b) / delta;
      } else if (rgb.g === max) {
        hsb.h = 2 + (rgb.b - rgb.r) / delta;
      } else {
        hsb.h = 4 + (rgb.r - rgb.g) / delta;
      }
    } else {
      hsb.h = -1;
    }
    hsb.h = hsb.h * 60;
    if (hsb.h < 0) {
      hsb.h = hsb.h + 360;
    }
    hsb.s = hsb.s * (100 / 255);
    hsb.b = hsb.b * (100 / 255);
    return hsb;
  };
  var HSBtoRGB = function HSBtoRGB(hsb) {
    var rgb = {
      r: null,
      g: null,
      b: null
    };
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s * 255 / 100);
    var v = Math.round(hsb.b * 255 / 100);
    if (s === 0) {
      rgb = {
        r: v,
        g: v,
        b: v
      };
    } else {
      var t1 = v;
      var t2 = (255 - s) * v / 255;
      var t3 = (t1 - t2) * (h % 60) / 60;
      if (h === 360) {
        h = 0;
      }
      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }
    return {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b)
    };
  };
  var RGBtoHEX = function RGBtoHEX(rgb) {
    var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
    for (var key in hex) {
      if (hex[key].length === 1) {
        hex[key] = '0' + hex[key];
      }
    }
    return hex.join('');
  };
  var HSBtoHEX = function HSBtoHEX(hsb) {
    return RGBtoHEX(HSBtoRGB(hsb));
  };
  var updateUI = function updateUI() {
    updateHue();
    updateColorHandle();
    updateInput();
    updateColorSelector();
  };
  var alignOverlay = function alignOverlay() {
    if (inputRef.current) {
      utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
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
  hooks.useMountEffect(function () {
    updateHSBValue(props.value);
    updateUI();
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
    alignOverlay();
  });
  hooks.useUpdateEffect(function () {
    if (!colorDragging.current && !hueDragging.current) {
      updateHSBValue(props.value);
    }
  }, [props.value]);
  hooks.useUpdateEffect(function () {
    updateUI();
  });
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(overlayRef.current);
  });
  var createColorSelector = function createColorSelector() {
    var selectorProps = mergeProps({
      ref: colorSelectorRef,
      className: cx('selector'),
      onMouseDown: function onMouseDown(e) {
        return onColorMousedown(e);
      },
      onTouchStart: function onTouchStart(e) {
        return onColorDragStart(e);
      },
      onTouchMove: function onTouchMove(e) {
        return onDrag(e);
      },
      onTouchEnd: onDragEnd
    }, ptm('selector'));
    var colorProps = mergeProps({
      className: cx('color')
    }, ptm('color'));
    var colorHandlerProps = mergeProps({
      ref: colorHandleRef,
      className: cx('colorHandle')
    }, ptm('colorHandle'));
    return /*#__PURE__*/React__namespace.createElement("div", selectorProps, /*#__PURE__*/React__namespace.createElement("div", colorProps, /*#__PURE__*/React__namespace.createElement("div", colorHandlerProps)));
  };
  var createHue = function createHue() {
    var hueProps = mergeProps({
      className: cx('hue'),
      onMouseDown: function onMouseDown(e) {
        return onHueMousedown(e);
      },
      onTouchStart: function onTouchStart(e) {
        return onHueDragStart(e);
      },
      onTouchMove: function onTouchMove(e) {
        return onDrag(e);
      },
      onTouchEnd: onDragEnd
    }, ptm('hue'));
    var hueHandlerProps = mergeProps({
      className: cx('hueHandle')
    }, ptm('hueHandle'));
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: hueViewRef
    }, hueProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: hueHandleRef
    }, hueHandlerProps)));
  };
  var createContent = function createContent() {
    var colorSelector = createColorSelector();
    var hue = createHue();
    var contentProps = mergeProps({
      className: cx('content')
    }, ptm('content'));
    return /*#__PURE__*/React__namespace.createElement("div", contentProps, colorSelector, hue);
  };
  var createInput = function createInput() {
    if (!props.inline) {
      var inputProps = ColorPickerBase.getOtherProps(props);
      var _inputProps = mergeProps(_objectSpread({
        ref: inputRef,
        type: 'text',
        readOnly: true,
        className: cx('input'),
        style: props.inputStyle,
        id: props.inputId,
        tabIndex: props.tabIndex,
        disabled: props.disabled,
        onClick: onInputClick,
        onKeyDown: onInputKeydown
      }, inputProps), ptm('input'));
      return /*#__PURE__*/React__namespace.createElement("input", _inputProps);
    }
    return null;
  };
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var content = createContent();
  var input = createInput();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: utils.classNames(props.className, cx('root'))
  }, ColorPickerBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, input, /*#__PURE__*/React__namespace.createElement(ColorPickerPanel, {
    hostName: "ColorPicker",
    ref: overlayRef,
    appendTo: props.appendTo,
    inline: props.inline,
    disabled: props.disabled,
    panelStyle: props.panelStyle,
    panelClassName: props.panelClassName,
    onClick: onPanelClick,
    "in": props.inline || overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    transitionOptions: props.transitionOptions,
    ptm: ptm,
    cx: cx
  }, content)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
ColorPicker.displayName = 'ColorPicker';

exports.ColorPicker = ColorPicker;
