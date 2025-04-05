'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useOverlayListener, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { classNames, ObjectUtils, DomHandler, ZIndexUtils } from 'primereact/utils';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var classes$1 = {
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context,
      isFilled = _ref.isFilled;
    return classNames('p-inputtextarea p-inputtext p-component', {
      'p-disabled': props.disabled,
      'p-filled': isFilled,
      'p-inputtextarea-resizable': props.autoResize,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  }
};
var styles$1 = "\n@layer primereact {\n    .p-inputtextarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n    \n    .p-fluid .p-inputtextarea {\n        width: 100%;\n    }\n}\n";
var InputTextareaBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputTextarea',
    __parentMetadata: null,
    autoResize: false,
    invalid: false,
    variant: null,
    keyfilter: null,
    onBlur: null,
    onFocus: null,
    onBeforeInput: null,
    onInput: null,
    onKeyDown: null,
    onKeyUp: null,
    onPaste: null,
    tooltip: null,
    tooltipOptions: null,
    validateOnly: false,
    children: undefined,
    className: null
  },
  css: {
    classes: classes$1,
    styles: styles$1
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputTextarea = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = InputTextareaBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var cachedScrollHeight = React.useRef(0);
  var _InputTextareaBase$se = InputTextareaBase.setMetaData(_objectSpread$1(_objectSpread$1({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        disabled: props.disabled
      }
    })),
    ptm = _InputTextareaBase$se.ptm,
    cx = _InputTextareaBase$se.cx,
    isUnstyled = _InputTextareaBase$se.isUnstyled;
  useHandleStyle(InputTextareaBase.css.styles, isUnstyled, {
    name: 'inputtextarea'
  });
  var onFocus = function onFocus(event) {
    if (props.autoResize) {
      resize();
    }
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    if (props.autoResize) {
      resize();
    }
    props.onBlur && props.onBlur(event);
  };
  var onKeyUp = function onKeyUp(event) {
    if (props.autoResize) {
      resize();
    }
    props.onKeyUp && props.onKeyUp(event);
  };
  var onKeyDown = function onKeyDown(event) {
    props.onKeyDown && props.onKeyDown(event);
    if (props.keyfilter) {
      KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
    }
  };
  var onBeforeInput = function onBeforeInput(event) {
    props.onBeforeInput && props.onBeforeInput(event);
    if (props.keyfilter) {
      KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
    }
  };
  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);
    if (props.keyfilter) {
      KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };
  var onInput = function onInput(event) {
    var target = event.target;
    if (props.autoResize) {
      resize(ObjectUtils.isEmpty(target.value));
    }
    props.onInput && props.onInput(event);
    ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
  };
  var resize = function resize(initial) {
    var inputEl = elementRef.current;
    if (inputEl && isVisible()) {
      if (!cachedScrollHeight.current) {
        cachedScrollHeight.current = inputEl.scrollHeight;
        inputEl.style.overflow = 'hidden';
      }
      if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
        inputEl.style.height = '';
        inputEl.style.height = inputEl.scrollHeight + 'px';
        if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
          inputEl.style.overflowY = 'scroll';
          inputEl.style.height = inputEl.style.maxHeight;
        } else {
          inputEl.style.overflow = 'hidden';
        }
        cachedScrollHeight.current = inputEl.scrollHeight;
      }
    }
  };
  var isVisible = function isVisible() {
    if (DomHandler.isVisible(elementRef.current)) {
      var rect = elementRef.current.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }
    return false;
  };
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  React.useEffect(function () {
    if (props.autoResize) {
      resize(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoResize, props.value]);
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue);
  }, [props.value, props.defaultValue]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(props.className, cx('root', {
      context: context,
      isFilled: isFilled
    })),
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyUp: onKeyUp,
    onKeyDown: onKeyDown,
    onBeforeInput: onBeforeInput,
    onInput: onInput,
    onPaste: onPaste
  }, InputTextareaBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", rootProps), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
InputTextarea.displayName = 'InputTextarea';

var classes = {
  item: function item(_ref) {
    var isSelected = _ref.isSelected;
    return classNames('p-mention-item', {
      'p-highlight': isSelected
    });
  },
  items: 'p-mention-items',
  panel: function panel(_ref2) {
    var props = _ref2.props;
    return classNames('p-mention-panel p-component', props.panelClassName);
  },
  input: function input(_ref3) {
    var props = _ref3.props;
    return classNames('p-mention-input', props.inputClassName);
  },
  root: function root(_ref4) {
    _ref4.props;
      var isFilled = _ref4.isFilled,
      focusedState = _ref4.focusedState;
    return classNames('p-mention p-component p-inputwrapper', {
      'p-inputwrapper-filled': isFilled,
      'p-inputwrapper-focus': focusedState
    });
  },
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-mention {\n        display: inline-flex;\n        position: relative;\n    }\n    \n    .p-autocomplete-loader {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-mention .p-mention-panel {\n        min-width: 100%;\n    }\n    \n    .p-mention-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n        overflow: auto;\n    }\n    \n    .p-mention-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n    \n    .p-mention-item {\n        cursor: pointer;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-fluid .p-mention {\n        display: flex;\n    }\n}\n";
var MentionBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Mention',
    autoHighlight: true,
    autoResize: false,
    className: null,
    delay: 0,
    field: null,
    footerTemplate: null,
    headerTemplate: null,
    id: null,
    inputClassName: null,
    inputId: null,
    inputRef: null,
    inputStyle: null,
    itemTemplate: null,
    panelClassName: null,
    panelStyle: null,
    scrollHeight: '200px',
    style: null,
    suggestions: null,
    transitionOptions: null,
    trigger: '@',
    onBlur: null,
    onChange: null,
    onFocus: null,
    onHide: null,
    onInput: null,
    onSearch: null,
    onSelect: null,
    onShow: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Mention = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = MentionBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedState = _React$useState4[0],
    setFocusedState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    searchingState = _React$useState6[0],
    setSearchingState = _React$useState6[1];
  var _React$useState7 = React.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    triggerState = _React$useState8[0],
    setTriggerState = _React$useState8[1];
  var _React$useState9 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    highlightState = _React$useState10[0],
    setHighlightState = _React$useState10[1];
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var listRef = React.useRef(null);
  var timeout = React.useRef(null);
  var metaData = {
    props: props,
    state: {
      overlayVisible: overlayVisibleState,
      focused: focusedState,
      searching: searchingState,
      trigger: triggerState
    }
  };
  var _MentionBase$setMetaD = MentionBase.setMetaData(metaData),
    ptm = _MentionBase$setMetaD.ptm,
    cx = _MentionBase$setMetaD.cx;
    _MentionBase$setMetaD.sx;
    var isUnstyled = _MentionBase$setMetaD.isUnstyled;
  useHandleStyle(MentionBase.css.styles, isUnstyled, {
    name: 'mention'
  });
  var getPTOptions = function getPTOptions(item, suggestion, options) {
    return ptm(suggestion, {
      context: {
        trigger: triggerState ? triggerState.key : ''
      },
      state: _objectSpread({}, options)
    });
  };
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
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
    setSearchingState(false);
    setTriggerState(null);
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.overlay || PrimeReact.zIndex.overlay);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    alignOverlay();
  };
  var onOverlayEntering = function onOverlayEntering() {
    if (props.autoHighlight && props.suggestions && props.suggestions.length) {
      setHighlightState(function (prevState) {
        var newState = _toConsumableArray(prevState);
        newState[0] = true;
        return newState;
      });
    }
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
  var alignOverlay = function alignOverlay() {
    if (triggerState) {
      var key = triggerState.key,
        index = triggerState.index;
      var value = inputRef.current.value;
      var position = DomHandler.getCursorOffset(inputRef.current, value.substring(0, index - 1), value.substring(index), key);
      overlayRef.current.style.transformOrigin = 'top';
      overlayRef.current.style.left = "calc(".concat(position.left, "px + 1rem)");
      overlayRef.current.style.top = "calc(".concat(position.top, "px + 1.2rem)");
    }
  };
  var onPanelClick = function onPanelClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var getTrigger = function getTrigger(value, key, start) {
    if (!triggerState) {
      var triggerKey = Array.isArray(props.trigger) ? props.trigger.find(function (t) {
        return t === key;
      }) : props.trigger === key ? props.trigger : null;
      if (triggerKey) {
        return {
          key: triggerKey,
          index: start
        };
      }
      var latestSpaceIndex = value.substring(0, start).lastIndexOf(' ');
      var latestTrigger = getLatestTrigger(value, start);
      if (latestTrigger.index > latestSpaceIndex) {
        return latestTrigger;
      }
    }
    return triggerState;
  };
  var getLatestTrigger = function getLatestTrigger(value, start) {
    if (Array.isArray(props.trigger)) {
      var latestTrigger = {};
      props.trigger.forEach(function (t) {
        var index = value.substring(0, start).lastIndexOf(t);
        if (index !== -1 && (index > latestTrigger.index || !latestTrigger.index)) {
          latestTrigger = {
            key: t,
            index: index !== -1 ? index + 1 : -1
          };
        }
      });
      return latestTrigger;
    }
    var index = value.substring(0, start).lastIndexOf(props.trigger);
    return {
      key: props.trigger,
      index: index !== -1 ? index + 1 : -1
    };
  };
  var onSearch = function onSearch(event) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    var _event$target = event.target,
      value = _event$target.value,
      selectionStart = _event$target.selectionStart;
    var key = value.substring(selectionStart - 1, selectionStart);
    if (key === ' ') {
      hide();
      return;
    }
    var currentTrigger = getTrigger(value, key, selectionStart);
    if (currentTrigger && currentTrigger.index > -1) {
      var query = value.substring(currentTrigger.index, selectionStart);
      timeout.current = setTimeout(function () {
        search(event, query, currentTrigger);
      }, props.delay);
    }
  };
  var search = function search(event, query, trigger) {
    if (props.onSearch) {
      setSearchingState(true);
      setTriggerState(trigger);
      props.onSearch({
        originalEvent: event,
        trigger: trigger.key,
        query: query
      });
    }
  };
  var selectItem = function selectItem(event, suggestion) {
    var input = inputRef.current;
    var value = input.value;
    var selectionStart = input.selectionStart;
    var spaceIndex = value.indexOf(' ', triggerState.index);
    var currentText = value.substring(triggerState.index, spaceIndex > -1 ? spaceIndex : selectionStart);
    var selectedText = formatValue(suggestion).replace(/\s+/g, '');
    if (currentText.trim() !== selectedText) {
      var prevText = value.substring(0, triggerState.index);
      var nextText = value.substring(spaceIndex > -1 ? selectionStart : triggerState.index + currentText.length);
      inputRef.current.value = nextText[0] === ' ' ? "".concat(prevText).concat(selectedText).concat(nextText) : "".concat(prevText).concat(selectedText, " ").concat(nextText);
      event.target = inputRef.current;
      props.onChange && props.onChange(event);
    }
    var cursorStart = triggerState.index + selectedText.length + 1;
    inputRef.current.setSelectionRange(cursorStart, cursorStart);
    hide();
    props.onSelect && props.onSelect({
      originalEvent: event,
      suggestion: suggestion
    });
  };
  var formatValue = function formatValue(value) {
    if (value) {
      var field = Array.isArray(props.field) ? props.field[props.trigger.findIndex(function (f) {
        return f === triggerState.key;
      })] : props.field;
      return field ? ObjectUtils.resolveFieldData(value, field) : value;
    }
    return '';
  };
  var onItemClick = function onItemClick(event, suggestion) {
    DomHandler.focus(inputRef.current);
    selectItem(event, suggestion);
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    props.onBlur && props.onBlur(event);
  };
  var onInput = function onInput(event) {
    props.onInput && props.onInput(event);
    var isFilled = event.target.value.length > 0;
    if (isUnstyled()) {
      DomHandler.setAttributes(elementRef.current, {
        'data-p-inputwrapper-filled': isFilled
      });
    } else if (isFilled) {
      DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled');
    } else {
      DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  };
  var onKeyUp = function onKeyUp(event) {
    if (event.which === 37 || event.which === 39) {
      onSearch(event);
    }
  };
  var onChange = function onChange(event) {
    props.onChange && props.onChange(event);
    onSearch(event);
  };
  var onKeyDown = function onKeyDown(event) {
    if (overlayVisibleState) {
      var highlightItem = DomHandler.findSingle(overlayRef.current, 'li[data-p-highlight="true"]');
      switch (event.which) {
        //down
        case 40:
          if (highlightItem) {
            var nextElement = highlightItem.nextElementSibling;
            if (nextElement) {
              var nextElementIndex = DomHandler.index(nextElement);
              var highlightItemIndex = DomHandler.index(highlightItem);
              setHighlightState(function (prevState) {
                var newState = _toConsumableArray(prevState);
                newState[nextElementIndex] = true;
                newState[highlightItemIndex] = false;
                return newState;
              });
              DomHandler.scrollInView(overlayRef.current, nextElement);
            }
          } else {
            highlightItem = DomHandler.findSingle(overlayRef.current, 'li');
            if (highlightItem) {
              var _highlightItemIndex = DomHandler.index(highlightItem);
              setHighlightState(function (prevState) {
                var newState = _toConsumableArray(prevState);
                newState[_highlightItemIndex] = true;
                return newState;
              });
            }
          }
          event.preventDefault();
          break;

        //up
        case 38:
          if (highlightItem) {
            var previousElement = highlightItem.previousElementSibling;
            if (previousElement) {
              var previousElementIndex = DomHandler.index(previousElement);
              var _highlightItemIndex2 = DomHandler.index(highlightItem);
              setHighlightState(function (prevState) {
                var newState = _toConsumableArray(prevState);
                newState[previousElementIndex] = true;
                newState[_highlightItemIndex2] = false;
                return newState;
              });
              DomHandler.scrollInView(overlayRef.current, previousElement);
            }
          }
          event.preventDefault();
          break;

        //backspace
        case 8:
          var _event$target2 = event.target,
            value = _event$target2.value,
            selectionStart = _event$target2.selectionStart;
          var key = value.substring(selectionStart - 1, selectionStart);
          if (key === triggerState.key) {
            hide();
          }
          break;

        //enter
        case 13:
          if (highlightItem) {
            selectItem(event, props.suggestions[DomHandler.index(highlightItem)]);
          }
          event.preventDefault();
          break;

        //escape
        case 27:
          hide();
          event.preventDefault();
          break;
      }
    }
  };
  var currentValue = inputRef.current && inputRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
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
  useUpdateEffect(function () {
    var hasSuggestions = props.suggestions && props.suggestions.length;
    if (hasSuggestions) {
      var newState = props.suggestions.map(function () {
        return false;
      });
      setHighlightState(newState);
    }
    if (searchingState) {
      hasSuggestions ? show() : hide();
      overlayVisibleState && alignOverlay();
      setSearchingState(false);
    }
  }, [props.suggestions]);
  useUpdateEffect(function () {
    var _isUnstyled = isUnstyled();
    var isInputWrapperFilled = _isUnstyled ? DomHandler.isAttributeEquals(elementRef.current, 'data-p-inputwrapper-filled', true) : DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled');
    if (!isFilled && isInputWrapperFilled) {
      _isUnstyled ? DomHandler.setAttributes(elementRef.current, {
        'data-p-inputwrapper-filled': false
      }) : DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  }, [isFilled]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createItem = function createItem(suggestion, index) {
    var key = index + '_item';
    var content = props.itemTemplate ? ObjectUtils.getJSXElement(props.itemTemplate, suggestion, {
      trigger: triggerState ? triggerState.key : '',
      index: index
    }) : formatValue(suggestion);
    var isSelected = highlightState[index];
    var itemProps = mergeProps({
      key: key,
      className: cx('item', {
        isSelected: isSelected
      }),
      onClick: function onClick(e) {
        return onItemClick(e, suggestion);
      },
      'data-p-highlight': isSelected
    }, getPTOptions(suggestion, 'item', {
      selected: isSelected
    }));
    return /*#__PURE__*/React.createElement("li", itemProps, content, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var createList = function createList() {
    var itemsProps = mergeProps({
      ref: listRef,
      className: cx('items')
    }, ptm('items'));
    if (props.suggestions) {
      var items = props.suggestions.map(createItem);
      return /*#__PURE__*/React.createElement("ul", itemsProps, items);
    }
    return null;
  };
  var createPanel = function createPanel() {
    var header = ObjectUtils.getJSXElement(props.headerTemplate, props);
    var footer = ObjectUtils.getJSXElement(props.footerTemplate, props);
    var list = createList();
    var panelProps = mergeProps({
      ref: overlayRef,
      className: cx('panel'),
      style: _objectSpread({
        maxHeight: props.scrollHeight
      }, props.panelStyle),
      onClick: onPanelClick
    }, ptm('panel'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntering: onOverlayEntering,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, ptm('transition'));
    var panel = /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", panelProps, header, list, footer));
    return /*#__PURE__*/React.createElement(Portal, {
      element: panel,
      appendTo: "self"
    });
  };
  var inputProps = MentionBase.getOtherProps(props);
  var panel = createPanel();
  var inputMentionProps = mergeProps(_objectSpread(_objectSpread({
    ref: inputRef,
    id: props.inputId,
    className: cx('input'),
    style: props.inputStyle
  }, inputProps), {}, {
    unstyled: props.unstyled,
    autoResize: props.autoResize,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onInput: onInput,
    onKeyUp: onKeyUp,
    onChange: onChange,
    __parentMetadata: {
      parent: metaData
    }
  }), ptm('input'));
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: classNames(props.className, cx('root', {
      focusedState: focusedState,
      isFilled: isFilled
    })),
    style: props.style
  }, MentionBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(InputTextarea, inputMentionProps), panel);
}));
Mention.displayName = 'Mention';

export { Mention };
