this.primereact = this.primereact || {};
this.primereact.multistatecheckbox = (function (exports, React, api, hooks, tooltip, utils) {
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

  var MultiStateCheckbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        focusedState = _React$useState2[0],
        setFocusedState = _React$useState2[1];

    var elementRef = React__namespace.useRef(null);
    var equalityKey = props.optionValue ? null : props.dataKey;

    var onClick = function onClick(event) {
      if (!props.disabled && !props.readOnly) {
        toggle(event);
      }
    };

    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option;
    };

    var getOptionAriaLabel = function getOptionAriaLabel(option) {
      var ariaField = props.optionLabel || props.optionValue;
      return ariaField ? utils.ObjectUtils.resolveFieldData(option, ariaField) : option;
    };

    var findNextOption = function findNextOption() {
      if (props.options) {
        return selectedOptionIndex === props.options.length - 1 ? props.empty ? null : props.options[0] : props.options[selectedOptionIndex + 1];
      }

      return null;
    };

    var toggle = function toggle(event) {
      if (props.onChange) {
        var newValue = getOptionValue(findNextOption());
        props.onChange({
          originalEvent: event,
          value: newValue,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: newValue
          }
        });
      }
    };

    var onFocus = function onFocus() {
      setFocusedState(true);
    };

    var onBlur = function onBlur() {
      setFocusedState(false);
    };

    var onKeyDown = function onKeyDown(e) {
      if (e.keyCode === 32) {
        toggle(e);
        e.preventDefault();
      }
    };

    var getSelectedOptionMap = function getSelectedOptionMap() {
      var option, index;

      if (props.options) {
        index = props.options.findIndex(function (option) {
          return utils.ObjectUtils.equals(props.value, getOptionValue(option), equalityKey);
        });
        option = props.options[index];
      }

      return {
        option: option,
        index: index
      };
    };

    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (!props.empty && props.value === null) {
        toggle();
      }
    });

    var createIcon = function createIcon() {
      var icon = selectedOption && selectedOption.icon || '';
      var className = utils.classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(icon), true));
      var content = /*#__PURE__*/React__namespace.createElement("span", {
        className: className
      });

      if (props.iconTemplate) {
        var defaultOptions = {
          option: selectedOption,
          className: className,
          element: content,
          props: props
        };
        return utils.ObjectUtils.getJSXElement(props.iconTemplate, defaultOptions);
      }

      return content;
    };

    var _getSelectedOptionMap = getSelectedOptionMap(),
        selectedOption = _getSelectedOptionMap.option,
        selectedOptionIndex = _getSelectedOptionMap.index;

    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = utils.ObjectUtils.findDiffKeys(props, MultiStateCheckbox.defaultProps);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-multistatecheckbox p-checkbox p-component', props.className);
    var boxClassName = utils.classNames('p-checkbox-box', {
      'p-highlight': !!selectedOption,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    }, selectedOption && selectedOption.className);
    var icon = createIcon();
    var ariaValueLabel = !!selectedOption ? getOptionAriaLabel(selectedOption) : api.ariaLabel('nullLabel');
    var ariaChecked = !!selectedOption ? 'true' : 'false';
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick
    }), /*#__PURE__*/React__namespace.createElement("div", _extends({
      className: boxClassName,
      style: selectedOption && selectedOption.style,
      tabIndex: props.tabIndex,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      role: "checkbox",
      "aria-checked": ariaChecked
    }, ariaProps), icon), focusedState && /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-sr-only",
      "aria-live": "polite"
    }, ariaValueLabel)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  MultiStateCheckbox.displayName = 'MultiStateCheckbox';
  MultiStateCheckbox.defaultProps = {
    __TYPE: 'MultiStateCheckbox',
    id: null,
    value: null,
    options: null,
    optionValue: null,
    optionLabel: null,
    iconTemplate: null,
    dataKey: null,
    style: null,
    className: null,
    disabled: false,
    readOnly: false,
    empty: true,
    tabIndex: '0',
    tooltip: null,
    tooltipOptions: null,
    onChange: null
  };

  exports.MultiStateCheckbox = MultiStateCheckbox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.tooltip, primereact.utils);
