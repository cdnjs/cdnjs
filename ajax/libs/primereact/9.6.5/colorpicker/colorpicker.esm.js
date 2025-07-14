import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { useOverlayListener, useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Tooltip } from 'primereact/tooltip';
import { classNames, mergeProps, DomHandler, ObjectUtils, ZIndexUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';

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

var ColorPickerBase = ComponentBase.extend({
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
  }
});

var ColorPickerPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var context = React.useContext(PrimeReactContext);
  var createElement = function createElement() {
    var className = classNames('p-colorpicker-panel', props.panelClassName, {
      'p-colorpicker-overlay-panel': !props.inline,
      'p-disabled': props.disabled,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var panelProps = mergeProps({
      ref: ref,
      className: className,
      style: props.panelStyle,
      onClick: props.onClick
    }, props.ptm('panel'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: ref,
      classNames: "p-connected-overlay",
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
    }, /*#__PURE__*/React.createElement("div", panelProps, props.children));
  };
  var element = createElement();
  return props.inline ? element : /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
ColorPickerPanel.displayName = 'ColorPickerPanel';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ColorPicker = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ColorPickerBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _ColorPickerBase$setM = ColorPickerBase.setMetaData({
      props: props,
      state: {
        overlayVisible: overlayVisibleState
      }
    }),
    ptm = _ColorPickerBase$setM.ptm;
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var colorSelectorRef = React.useRef(null);
  var colorHandleRef = React.useRef(null);
  var hueHandleRef = React.useRef(null);
  var hueViewRef = React.useRef(null);
  var hueDragging = React.useRef(false);
  var hsbValue = React.useRef(null);
  var colorDragging = React.useRef(false);
  var _useOverlayListener = useOverlayListener({
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
  var _useEventListener = useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        colorDragging.current && pickColor(event);
        hueDragging.current && pickHue(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: function listener() {
        colorDragging.current = hueDragging.current = false;
        DomHandler.removeClass(elementRef.current, 'p-colorpicker-dragging');
        unbindDocumentMouseMoveListener();
        unbindDocumentMouseUpListener();
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var onPanelClick = function onPanelClick(event) {
    if (!props.inline) {
      OverlayService.emit('overlay-click', {
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
    DomHandler.addClass(elementRef.current, 'p-colorpicker-dragging');
  };
  var pickHue = function pickHue(event) {
    var top = hueViewRef.current.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    hsbValue.current = validateHSB({
      h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top))) / 150),
      s: 100,
      b: 100
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
    DomHandler.addClass(elementRef.current, 'p-colorpicker-dragging');
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
    DomHandler.removeClass(elementRef.current, 'p-colorpicker-dragging');
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
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
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
    ZIndexUtils.clear(overlayRef.current);
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
    hsb.h *= 60;
    if (hsb.h < 0) {
      hsb.h += 360;
    }
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;
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
      if (h === 360) h = 0;
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
      DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
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
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    updateHSBValue(props.value);
    updateUI();
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  useUpdateEffect(function () {
    if (!colorDragging.current && !hueDragging.current) {
      updateHSBValue(props.value);
    }
  }, [props.value]);
  useUpdateEffect(function () {
    updateUI();
  });
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createColorSelector = function createColorSelector() {
    var selectorProps = mergeProps({
      ref: colorSelectorRef,
      className: 'p-colorpicker-color-selector',
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
      className: 'p-colorpicker-color'
    }, ptm('color'));
    var colorHandlerProps = mergeProps({
      ref: colorHandleRef,
      className: 'p-colorpicker-color-handle'
    }, ptm('colorHandler'));
    return /*#__PURE__*/React.createElement("div", selectorProps, /*#__PURE__*/React.createElement("div", colorProps, /*#__PURE__*/React.createElement("div", colorHandlerProps)));
  };
  var createHue = function createHue() {
    var hueProps = mergeProps({
      ref: hueViewRef,
      className: 'p-colorpicker-hue',
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
      ref: hueHandleRef,
      className: 'p-colorpicker-hue-handle'
    }, ptm('hueHandler'));
    return /*#__PURE__*/React.createElement("div", hueProps, /*#__PURE__*/React.createElement("div", hueHandlerProps));
  };
  var createContent = function createContent() {
    var colorSelector = createColorSelector();
    var hue = createHue();
    var contentProps = mergeProps({
      className: 'p-colorpicker-content'
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", contentProps, colorSelector, hue);
  };
  var createInput = function createInput() {
    if (!props.inline) {
      var inputClassName = classNames('p-colorpicker-preview p-inputtext', props.inputClassName, {
        'p-disabled': props.disabled
      });
      var inputProps = ColorPickerBase.getOtherProps(props);
      var _inputProps = mergeProps(_objectSpread({
        ref: inputRef,
        type: 'text',
        readOnly: true,
        className: inputClassName,
        style: props.inputStyle,
        id: props.inputId,
        tabIndex: props.tabIndex,
        disabled: props.disabled,
        onClick: onInputClick,
        onKeyDown: onInputKeydown
      }, inputProps), ptm('input'));
      return /*#__PURE__*/React.createElement("input", _inputProps);
    }
    return null;
  };
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var className = classNames('p-colorpicker p-component', {
    'p-colorpicker-overlay': !props.inline
  }, props.className);
  var content = createContent();
  var input = createInput();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className
  }, ColorPickerBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, input, /*#__PURE__*/React.createElement(ColorPickerPanel, {
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
    ptm: ptm
  }, content)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
