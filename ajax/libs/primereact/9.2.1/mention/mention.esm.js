import * as React from 'react';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames, DomHandler, ZIndexUtils } from 'primereact/utils';
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

var InputTextareaBase = {
  defaultProps: {
    __TYPE: 'InputTextarea',
    autoResize: false,
    keyfilter: null,
    onBlur: null,
    onFocus: null,
    onInput: null,
    onKeyDown: null,
    onKeyUp: null,
    onPaste: null,
    tooltip: null,
    tooltipOptions: null,
    validateOnly: false,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, InputTextareaBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, InputTextareaBase.defaultProps);
  }
};

var InputTextarea = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = InputTextareaBase.getProps(inProps);
  var elementRef = React.useRef(ref);
  var cachedScrollHeight = React.useRef(0);
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
  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);
    if (props.keyfilter) {
      KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };
  var onInput = function onInput(event) {
    if (props.autoResize) {
      resize();
    }
    props.onInput && props.onInput(event);
    var target = event.target;
    ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
  };
  var resize = function resize(initial) {
    var inputEl = elementRef.current;
    if (inputEl && DomHandler.isVisible(inputEl)) {
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
  var currentValue = elementRef.current && elementRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  React.useEffect(function () {
    if (props.autoResize) {
      resize(true);
    }
  }, [props.autoResize]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = InputTextareaBase.getOtherProps(props);
  var className = classNames('p-inputtextarea p-inputtext p-component', {
    'p-disabled': props.disabled,
    'p-filled': isFilled,
    'p-inputtextarea-resizable': props.autoResize
  }, props.className);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", _extends({
    ref: elementRef
  }, otherProps, {
    className: className,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyUp: onKeyUp,
    onKeyDown: onKeyDown,
    onInput: onInput,
    onPaste: onPaste
  })), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
InputTextarea.displayName = 'InputTextarea';

var MentionBase = {
  defaultProps: {
    __TYPE: 'Mention',
    autoHighlight: true,
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
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, MentionBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, MentionBase.defaultProps);
  }
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Mention = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = MentionBase.getProps(inProps);
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
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var listRef = React.useRef(null);
  var timeout = React.useRef(null);
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
    ZIndexUtils.set('overlay', overlayRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['overlay']);
    alignOverlay();
  };
  var onOverlayEntering = function onOverlayEntering() {
    if (props.autoHighlight && props.suggestions && props.suggestions.length) {
      DomHandler.addClass(listRef.current.firstChild, 'p-highlight');
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
    var key = triggerState.key,
      index = triggerState.index;
    var value = inputRef.current.value;
    var position = DomHandler.getCursorOffset(inputRef.current, value.substring(0, index - 1), value.substring(index), key);
    overlayRef.current.style.transformOrigin = 'top';
    overlayRef.current.style.left = "calc(".concat(position.left, "px + 1rem)");
    overlayRef.current.style.top = "calc(".concat(position.top, "px + 1.2rem)");
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
    var value = inputRef.current.value;
    var selectionStart = event.target.selectionStart;
    var spaceIndex = value.indexOf(' ', triggerState.index);
    var currentText = value.substring(triggerState.index, spaceIndex > -1 ? spaceIndex : selectionStart);
    var selectedText = formatValue(suggestion).replace(/\s+/g, '');
    if (currentText.trim() !== selectedText) {
      var diff = 0;
      while (diff < selectedText.length) {
        var s_c = selectedText.charAt(diff);
        var c_c = currentText.charAt(diff);
        if (s_c === c_c || c_c === ' ') diff++;else break;
      }
      var prevText = value.substring(0, triggerState.index);
      var nextText = value.substring(triggerState.index + diff);
      inputRef.current.value = "".concat(prevText).concat(selectedText, " ").concat(nextText);
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
    if (event.target.value.length > 0) DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled');else DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
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
      var highlightItem = DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
      switch (event.which) {
        //down
        case 40:
          if (highlightItem) {
            var nextElement = highlightItem.nextElementSibling;
            if (nextElement) {
              DomHandler.addClass(nextElement, 'p-highlight');
              DomHandler.removeClass(highlightItem, 'p-highlight');
              DomHandler.scrollInView(overlayRef.current, nextElement);
            }
          } else {
            highlightItem = DomHandler.findSingle(overlayRef.current, 'li');
            if (highlightItem) {
              DomHandler.addClass(highlightItem, 'p-highlight');
            }
          }
          event.preventDefault();
          break;

        //up
        case 38:
          if (highlightItem) {
            var previousElement = highlightItem.previousElementSibling;
            if (previousElement) {
              DomHandler.addClass(previousElement, 'p-highlight');
              DomHandler.removeClass(highlightItem, 'p-highlight');
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
    if (searchingState) {
      props.suggestions && props.suggestions.length ? show() : hide();
      overlayVisibleState && alignOverlay();
      setSearchingState(false);
    }
  }, [props.suggestions]);
  useUpdateEffect(function () {
    if (!isFilled && DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled')) {
      DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
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
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      className: "p-mention-item",
      onClick: function onClick(e) {
        return onItemClick(e, suggestion);
      }
    }, content, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var createList = function createList() {
    if (props.suggestions) {
      var items = props.suggestions.map(createItem);
      return /*#__PURE__*/React.createElement("ul", {
        ref: listRef,
        className: "p-mention-items"
      }, items);
    }
    return null;
  };
  var createPanel = function createPanel() {
    var panelClassName = classNames('p-mention-panel p-component', props.panelClassName);
    var panelStyle = _objectSpread({
      maxHeight: props.scrollHeight
    }, props.panelStyle);
    var header = ObjectUtils.getJSXElement(props.headerTemplate, props);
    var footer = ObjectUtils.getJSXElement(props.footerTemplate, props);
    var list = createList();
    var panel = /*#__PURE__*/React.createElement(CSSTransition, {
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
      onEntering: onOverlayEntering,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, /*#__PURE__*/React.createElement("div", {
      ref: overlayRef,
      className: panelClassName,
      style: panelStyle,
      onClick: onPanelClick
    }, header, list, footer));
    return /*#__PURE__*/React.createElement(Portal, {
      element: panel,
      appendTo: "self"
    });
  };
  var className = classNames('p-mention p-component p-inputwrapper', {
    'p-inputwrapper-filled': isFilled,
    'p-inputwrapper-focus': focusedState
  }, props.className);
  var inputClassName = classNames('p-mention-input', props.inputClassName);
  var inputProps = MentionBase.getOtherProps(props);
  var panel = createPanel();
  return /*#__PURE__*/React.createElement("div", {
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, /*#__PURE__*/React.createElement(InputTextarea, _extends({
    ref: inputRef,
    id: props.inputId,
    className: inputClassName,
    style: props.inputStyle
  }, inputProps, {
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onInput: onInput,
    onKeyUp: onKeyUp,
    onChange: onChange
  })), panel);
}));
Mention.displayName = 'Mention';

export { Mention };
