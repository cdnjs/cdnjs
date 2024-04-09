'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect } from 'primereact/hooks';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { classNames, ObjectUtils, DomHandler, IconUtils } from 'primereact/utils';

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

var styles = "\n@layer primereact {\n    .p-chips {\n        display: inline-flex;\n    }\n    \n    .p-chips-multiple-container {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        cursor: text;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-chips-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n    \n    .p-chips-input-token {\n        flex: 1 1 auto;\n        display: inline-flex;\n    }\n    \n    .p-chips-token-icon {\n        cursor: pointer;\n    }\n    \n    .p-chips-input-token input {\n        border: 0 none;\n        outline: 0 none;\n        background-color: transparent;\n        margin: 0;\n        padding: 0;\n        box-shadow: none;\n        border-radius: 0;\n        width: 100%;\n    }\n    \n    .p-fluid .p-chips {\n        display: flex;\n    }\n    \n    .p-chips-icon-left,\n    .p-chips-icon-right {\n        position: relative;\n        display: inline-block;\n    }\n    \n    .p-chips-icon-left > i,\n    .p-chips-icon-right > i,\n    .p-chips-icon-left > svg,\n    .p-chips-icon-right > svg,\n    .p-chips-icon-left > .p-chips-prefix,\n    .p-chips-icon-right > .p-chips-suffix {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n    \n    .p-fluid .p-chips-icon-left,\n    .p-fluid .p-chips-icon-right {\n        display: block;\n        width: 100%;\n    }\n}\n";
var classes = {
  removeTokenIcon: 'p-chips-token-icon',
  label: 'p-chips-token-label',
  token: function token(_ref) {
    var focusedIndex = _ref.focusedIndex,
      index = _ref.index;
    return classNames('p-chips-token', {
      'p-focus': focusedIndex === index
    });
  },
  inputToken: 'p-chips-input-token',
  container: function container(_ref2) {
    var props = _ref2.props,
      context = _ref2.context;
    return classNames('p-inputtext p-chips-multiple-container', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  },
  root: function root(_ref3) {
    var isFilled = _ref3.isFilled,
      focusedState = _ref3.focusedState,
      disabled = _ref3.disabled,
      invalid = _ref3.invalid;
    return classNames('p-chips p-component p-inputwrapper', {
      'p-inputwrapper-filled': isFilled,
      'p-inputwrapper-focus': focusedState,
      'p-disabled': disabled,
      'p-invalid': invalid,
      'p-focus': focusedState
    });
  }
};
var ChipsBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Chips',
    addOnBlur: null,
    allowDuplicate: true,
    ariaLabelledBy: null,
    autoFocus: false,
    className: null,
    disabled: null,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    itemTemplate: null,
    keyfilter: null,
    max: null,
    name: null,
    onAdd: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    onKeyDown: null,
    onRemove: null,
    placeholder: null,
    readOnly: false,
    removable: true,
    removeIcon: null,
    separator: null,
    style: null,
    tooltip: null,
    tooltipOptions: null,
    value: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Chips = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ChipsBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedIndex = _React$useState4[0],
    setFocusedIndex = _React$useState4[1];
  var _ChipsBase$setMetaDat = ChipsBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _ChipsBase$setMetaDat.ptm,
    cx = _ChipsBase$setMetaDat.cx,
    isUnstyled = _ChipsBase$setMetaDat.isUnstyled;
  useHandleStyle(ChipsBase.css.styles, isUnstyled, {
    name: 'chips'
  });
  var elementRef = React.useRef(null);
  var listRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var removeItem = function removeItem(event, index) {
    if (props.disabled && props.readOnly) {
      return;
    }
    var values = _toConsumableArray(props.value);
    var removedItem = values.splice(index, 1);
    if (!isRemovable(removedItem, index)) {
      return;
    }
    if (props.onRemove) {
      props.onRemove({
        originalEvent: event,
        value: removedItem
      });
    }
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: values,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: values
        }
      });
    }
  };
  var addItem = function addItem(event, item, preventDefault) {
    if (item && item.trim().length) {
      var values = props.value ? _toConsumableArray(props.value) : [];
      if (props.allowDuplicate || values.indexOf(item) === -1) {
        var allowAddition = true;
        if (props.onAdd) {
          allowAddition = props.onAdd({
            originalEvent: event,
            value: item
          });
        }
        if (allowAddition !== false) {
          values.push(item);
        }
      }
      updateInput(event, values, preventDefault);
    }
  };
  var onWrapperClick = function onWrapperClick() {
    DomHandler.focus(inputRef.current);
  };
  var onContainerKeyDown = function onContainerKeyDown(event) {
    switch (event.code) {
      case 'ArrowLeft':
        onArrowLeftKeyOn();
        break;
      case 'ArrowRight':
        onArrowRightKeyOn();
        break;
      case 'Backspace':
        onBackspaceKeyOn(event);
        break;
    }
  };
  var onArrowLeftKeyOn = function onArrowLeftKeyOn() {
    var focusIndex = focusedIndex;
    if (inputRef.current.value.length === 0 && props.value && props.value.length > 0) {
      focusIndex = focusIndex === null ? props.value.length - 1 : focusIndex - 1;
      if (focusIndex < 0) {
        focusIndex = 0;
      }
    }
    setFocusedIndex(focusIndex);
  };
  var onArrowRightKeyOn = function onArrowRightKeyOn() {
    var focusIndex = focusedIndex;
    if (inputRef.current.value.length === 0 && props.value && props.value.length > 0) {
      if (focusIndex === props.value.length - 1) {
        focusIndex = null;
        inputRef.current.focus();
      } else {
        focusIndex++;
      }
    }
    setFocusedIndex(focusIndex);
  };
  var onBackspaceKeyOn = function onBackspaceKeyOn(event) {
    if (focusedIndex !== null) {
      removeItem(event, focusedIndex);
    }
  };
  var _onKeyDown = function onKeyDown(event) {
    var inputValue = event.target.value;
    var values = props.value || [];
    props.onKeyDown && props.onKeyDown(event);
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'Backspace':
        if (inputValue.length === 0 && values.length > 0) {
          removeItem(event, values.length - 1);
        }
        break;
      case 'Enter':
        if (inputValue && inputValue.trim().length && (!props.max || props.max > values.length)) {
          addItem(event, inputValue, true);
        }
        break;
      case 'ArrowLeft':
        if (inputValue.length === 0 && values && values.length > 0) {
          DomHandler.focus(listRef.current);
        }
        break;
      case 'ArrowRight':
        event.stopPropagation();
        break;
      default:
        if (props.keyfilter) {
          KeyFilter.onKeyPress(event, props.keyfilter);
        }
        if (isMaxedOut()) {
          event.preventDefault();
        }
        break;
    }
  };
  var updateInput = function updateInput(event, items, preventDefault) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: items,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: items
        }
      });
    }
    inputRef.current.value = '';
    preventDefault && event.preventDefault();
  };
  var _onChange = function onChange(event) {
    var _event$target$value;
    var value = (_event$target$value = event.target.value) === null || _event$target$value === void 0 ? void 0 : _event$target$value.trim();
    if (value === props.separator) {
      inputRef.current.value = '';
      return;
    }
    if (props.separator && value.endsWith(props.separator)) {
      var trimmedValue = value.slice(0, -1);
      addItem(event, trimmedValue);
    }
  };
  var _onPaste = function onPaste(event) {
    if (props.separator) {
      var separator = props.separator.replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t');
      var pastedData = (event.clipboardData || window.clipboardData).getData('Text');
      if (props.keyfilter) {
        KeyFilter.onPaste(event, props.keyfilter);
      }
      if (pastedData) {
        var values = props.value || [];
        var pastedValues = pastedData.split(separator);
        pastedValues = pastedValues.filter(function (val) {
          return (props.allowDuplicate || values.indexOf(val) === -1) && val.trim().length;
        });
        values = [].concat(_toConsumableArray(values), _toConsumableArray(pastedValues));
        updateInput(event, values, true);
      }
    }
  };
  var onContainerFocus = function onContainerFocus(event) {
    setFocusedState(true);
  };
  var onContainerBlur = function onContainerBlur() {
    setFocusedIndex(-1);
    setFocusedState(false);
  };
  var _onFocus = function onFocus(event) {
    setFocusedState(true);
    setFocusedIndex(null);
    props.onFocus && props.onFocus(event);
  };
  var _onBlur = function onBlur(event) {
    if (props.addOnBlur) {
      var inputValue = event.target.value;
      var values = props.value || [];
      if (inputValue && inputValue.trim().length && (!props.max || props.max > values.length)) {
        addItem(event, inputValue, true);
      }
    }
    setFocusedState(false);
    props.onBlur && props.onBlur(event);
  };
  var isMaxedOut = function isMaxedOut() {
    return props.max && props.value && props.max === props.value.length;
  };
  var currentValue = inputRef.current && inputRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, currentValue]);
  var isRemovable = function isRemovable(value, index) {
    return ObjectUtils.getPropValue(props.removable, {
      value: value,
      index: index,
      props: props
    });
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
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
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var focusedOptionId = function focusedOptionId() {
    return focusedIndex !== null ? "".concat(props.inputId, "_chips_item_").concat(focusedIndex) : null;
  };
  var createRemoveIcon = function createRemoveIcon(value, index) {
    var iconProps = mergeProps({
      className: cx('removeTokenIcon'),
      onClick: function onClick(event) {
        return removeItem(event, index);
      },
      'aria-hidden': 'true'
    }, ptm('removeTokenIcon'));
    var icon = props.removeIcon || /*#__PURE__*/React.createElement(TimesCircleIcon, iconProps);
    var removeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
      props: props
    });
    if (!props.disabled && !props.readOnly && isRemovable(value, index)) {
      return removeIcon;
    }
    return null;
  };
  var createItem = function createItem(value, index) {
    var content = props.itemTemplate ? props.itemTemplate(value) : value;
    var labelProps = mergeProps({
      className: cx('label')
    }, ptm('label'));
    var label = /*#__PURE__*/React.createElement("span", labelProps, content);
    var icon = createRemoveIcon(value, index);
    var tokenProps = mergeProps({
      key: "".concat(index, "_").concat(value),
      id: props.inputId + '_chips_item_' + index,
      role: 'option',
      'aria-label': value,
      className: cx('token', {
        focusedIndex: focusedIndex,
        index: index
      }),
      'aria-selected': true,
      'aria-setsize': props.value.length,
      'aria-posinset': index + 1,
      'data-p-highlight': true,
      'data-p-focused': focusedIndex === index
    }, ptm('token'));
    return /*#__PURE__*/React.createElement("li", tokenProps, label, icon);
  };
  var createInput = function createInput() {
    var inputTokenProps = mergeProps({
      className: cx('inputToken')
    }, ptm('inputToken'));
    var inputProps = mergeProps(_objectSpread({
      id: props.inputId,
      ref: inputRef,
      placeholder: props.placeholder,
      type: 'text',
      enterKeyHint: 'enter',
      name: props.name,
      disabled: props.disabled || isMaxedOut(),
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onChange: function onChange(e) {
        return _onChange(e);
      },
      onPaste: function onPaste(e) {
        return _onPaste(e);
      },
      onFocus: function onFocus(e) {
        return _onFocus(e);
      },
      onBlur: function onBlur(e) {
        return _onBlur(e);
      },
      readOnly: props.readOnly
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React.createElement("li", inputTokenProps, /*#__PURE__*/React.createElement("input", inputProps));
  };
  var createItems = function createItems() {
    return props.value ? props.value.map(createItem) : null;
  };
  var createList = function createList() {
    var items = createItems();
    var input = createInput();
    var containerProps = mergeProps({
      ref: listRef,
      className: cx('container', {
        context: context
      }),
      onClick: function onClick(e) {
        return onWrapperClick();
      },
      onKeyDown: function onKeyDown(e) {
        return onContainerKeyDown(e);
      },
      tabIndex: -1,
      role: 'listbox',
      'aria-orientation': 'horizontal',
      'aria-labelledby': props.ariaLabelledby,
      'aria-label': props.ariaLabel,
      'aria-activedescendant': focusedState ? focusedOptionId() : undefined,
      'data-p-disabled': props.disabled,
      'data-p-focus': focusedState,
      onFocus: onContainerFocus,
      onBlur: onContainerBlur
    }, ptm('container'));
    return /*#__PURE__*/React.createElement("ul", containerProps, items, input);
  };
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ChipsBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var list = createList();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: classNames(props.className, cx('root', {
      isFilled: isFilled,
      focusedState: focusedState,
      disabled: props.disabled,
      invalid: props.invalid
    })),
    style: props.style
  }, ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, list), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: inputRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Chips.displayName = 'Chips';

export { Chips };
