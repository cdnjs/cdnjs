import * as React from 'react';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames } from 'primereact/utils';

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ChipsBase = {
  defaultProps: {
    __TYPE: 'Chips',
    id: null,
    inputRef: null,
    inputId: null,
    name: null,
    placeholder: null,
    value: null,
    max: null,
    disabled: null,
    readOnly: false,
    removable: true,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    separator: null,
    allowDuplicate: true,
    itemTemplate: null,
    keyfilter: null,
    addOnBlur: null,
    onAdd: null,
    onRemove: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onKeyDown: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ChipsBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ChipsBase.defaultProps);
  }
};

var Chips = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ChipsBase.getProps(inProps);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
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
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
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
  var onKeyDown = function onKeyDown(event) {
    var inputValue = event.target.value;
    var values = props.value || [];
    props.onKeyDown && props.onKeyDown(event);

    // do not continue if the user defined keydown wants to prevent
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'Backspace':
        if (inputRef.current.value.length === 0 && values.length > 0) {
          removeItem(event, values.length - 1);
        }
        break;
      case 'Enter':
        if (inputValue && inputValue.trim().length && (!props.max || props.max > values.length)) {
          addItem(event, inputValue, true);
        }
        break;
      default:
        if (props.keyfilter) {
          KeyFilter.onKeyPress(event, props.keyfilter);
        }
        if (isMaxedOut()) {
          event.preventDefault();
        } else if (props.separator === ',') {
          // GitHub #3885 Android Opera gives strange code 229 for comma
          if (event.key === props.separator || DomHandler.isAndroid() && event.which === 229) {
            addItem(event, inputValue, true);
          }
        }
        break;
    }
  };
  var updateInput = function updateInput(event, items, preventDefault) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: items,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
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
  var onPaste = function onPaste(event) {
    if (props.separator) {
      var pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
      if (props.keyfilter) {
        KeyFilter.onPaste(event, props.keyfilter);
      }
      if (pastedData) {
        var values = props.value || [];
        var pastedValues = pastedData.split(props.separator);
        pastedValues = pastedValues.filter(function (val) {
          return (props.allowDuplicate || values.indexOf(val) === -1) && val.trim().length;
        });
        values = [].concat(_toConsumableArray(values), _toConsumableArray(pastedValues));
        updateInput(event, values, true);
      }
    }
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
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
  var createRemoveIcon = function createRemoveIcon(value, index) {
    if (!props.disabled && !props.readOnly && isRemovable(value, index)) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-chips-token-icon pi pi-times-circle",
        onClick: function onClick(event) {
          return removeItem(event, index);
        }
      });
    }
    return null;
  };
  var createItem = function createItem(value, index) {
    var content = props.itemTemplate ? props.itemTemplate(value) : value;
    var label = /*#__PURE__*/React.createElement("span", {
      className: "p-chips-token-label"
    }, content);
    var icon = createRemoveIcon(value, index);
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "p-chips-token p-highlight"
    }, label, icon);
  };
  var createInput = function createInput() {
    return /*#__PURE__*/React.createElement("li", {
      className: "p-chips-input-token"
    }, /*#__PURE__*/React.createElement("input", _extends({
      ref: inputRef,
      id: props.inputId,
      placeholder: props.placeholder,
      type: "text",
      name: props.name,
      disabled: props.disabled || isMaxedOut(),
      onKeyDown: onKeyDown,
      onPaste: onPaste,
      onFocus: onFocus,
      onBlur: onBlur,
      readOnly: props.readOnly
    }, ariaProps)));
  };
  var createItems = function createItems() {
    return props.value ? props.value.map(createItem) : null;
  };
  var createList = function createList() {
    var className = classNames('p-inputtext p-chips-multiple-container', {
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
    var items = createItems();
    var input = createInput();
    return /*#__PURE__*/React.createElement("ul", {
      ref: listRef,
      className: className,
      onClick: onWrapperClick
    }, items, input);
  };
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ChipsBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-chips p-component p-inputwrapper', {
    'p-inputwrapper-filled': isFilled,
    'p-inputwrapper-focus': focusedState
  }, props.className);
  var list = createList();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), list), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: inputRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Chips.displayName = 'Chips';

export { Chips };
