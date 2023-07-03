this.primereact = this.primereact || {};
this.primereact.multistatecheckbox = (function (exports, React, api, hooks, tooltip, utils, componentbase) {
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

  var MultiStateCheckboxBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'MultiStateCheckbox',
      autoFocus: false,
      className: null,
      dataKey: null,
      disabled: false,
      empty: true,
      iconTemplate: null,
      id: null,
      onChange: null,
      optionIcon: null,
      optionLabel: null,
      optionValue: null,
      options: null,
      readOnly: false,
      style: null,
      tabIndex: '0',
      tooltip: null,
      tooltipOptions: null,
      value: null,
      children: undefined
    }
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var MultiStateCheckbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = MultiStateCheckboxBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var equalityKey = props.optionValue ? null : props.dataKey;
    var _MultiStateCheckboxBa = MultiStateCheckboxBase.setMetaData({
        props: props,
        state: {
          focused: focusedState
        }
      }),
      ptm = _MultiStateCheckboxBa.ptm;
    var onClick = function onClick(event) {
      if (!props.disabled && !props.readOnly) {
        toggle(event);
      }
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option;
    };
    var getOptionIcon = function getOptionIcon(option) {
      return utils.ObjectUtils.resolveFieldData(option, props.optionIcon || 'icon');
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
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
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
        focus: function focus() {
          return utils.DomHandler.focusFirstElement(elementRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (!props.empty && props.value === null) {
        toggle();
      }
      if (props.autoFocus) {
        utils.DomHandler.focusFirstElement(elementRef.current);
      }
    });
    var createIcon = function createIcon() {
      var icon = selectedOption && getOptionIcon(selectedOption) || '';
      var className = utils.classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(icon), true));
      var iconProps = utils.mergeProps({
        className: className
      }, ptm('icon'));
      var content = /*#__PURE__*/React__namespace.createElement("span", iconProps);
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
    var otherProps = MultiStateCheckboxBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-multistatecheckbox p-checkbox p-component', props.className, {
      'p-checkbox-disabled': props.disabled
    });
    var boxClassName = utils.classNames('p-checkbox-box', {
      'p-highlight': !!selectedOption,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    }, selectedOption && selectedOption.className);
    var icon = createIcon();
    var ariaValueLabel = !!selectedOption ? getOptionAriaLabel(selectedOption) : api.ariaLabel('nullLabel');
    var ariaChecked = !!selectedOption ? 'true' : 'false';
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style,
      onClick: onClick
    }, MultiStateCheckboxBase.getOtherProps(props), ptm('root'));
    var srOnlyAriaProps = utils.mergeProps({
      className: 'p-sr-only',
      'aria-live': 'polite'
    }, ptm('srOnlyAria'));
    var checkboxProps = utils.mergeProps(_objectSpread({
      className: boxClassName,
      style: selectedOption && selectedOption.style,
      tabIndex: props.tabIndex,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      role: 'checkbox',
      'aria-checked': ariaChecked
    }, ariaProps), ptm('checkbox'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", checkboxProps, icon), focusedState && /*#__PURE__*/React__namespace.createElement("span", srOnlyAriaProps, ariaValueLabel)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  MultiStateCheckbox.displayName = 'MultiStateCheckbox';

  exports.MultiStateCheckbox = MultiStateCheckbox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.tooltip, primereact.utils, primereact.componentbase);
