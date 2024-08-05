this.primereact = this.primereact || {};
this.primereact.selectbutton = (function (exports, React, api, componentbase, hooks, tooltip, utils, ripple) {
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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props;
      return utils.classNames('p-selectbutton p-button-group p-component', {
        'p-invalid': props.invalid
      });
    },
    button: function button(_ref2) {
      var props = _ref2.itemProps,
        focusedState = _ref2.focusedState;
      return utils.classNames('p-button p-component', {
        'p-highlight': props.selected,
        'p-disabled': props.disabled,
        'p-focus': focusedState
      });
    },
    label: 'p-button-label p-c'
  };
  var SelectButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'SelectButton',
      id: null,
      value: null,
      options: null,
      optionLabel: null,
      optionValue: null,
      optionDisabled: null,
      tabIndex: null,
      multiple: false,
      invalid: false,
      unselectable: true,
      allowEmpty: true,
      disabled: false,
      style: null,
      className: null,
      dataKey: null,
      tooltip: null,
      tooltipOptions: null,
      itemTemplate: null,
      onChange: null,
      children: undefined
    },
    css: {
      classes: classes
    }
  });

  var SelectButtonItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var mergeProps = hooks.useMergeProps();
    var ptm = props.ptm,
      cx = props.cx;
    var getPTOptions = function getPTOptions(key) {
      return ptm(key, {
        hostName: props.hostName,
        context: {
          selected: props.selected,
          disabled: props.disabled,
          option: props.option
        }
      });
    };
    var _onClick = function onClick(event, index) {
      props.setFocusedIndex(index);
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          option: props.option
        });
      }
    };
    var onFocus = function onFocus() {
      setFocusedState(true);
    };
    var onBlur = function onBlur() {
      setFocusedState(false);
    };
    var _onKeyDown = function onKeyDown(event, index) {
      switch (event.code) {
        case 'Space':
          {
            _onClick(event, index);
            event.preventDefault();
            break;
          }
        case 'ArrowDown':
        case 'ArrowRight':
          {
            changeTabIndexes(event, 'next');
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
        case 'ArrowLeft':
          {
            changeTabIndexes(event, 'prev');
            event.preventDefault();
            break;
          }
      }
    };
    var changeTabIndexes = function changeTabIndexes(event, direction) {
      var firstTabableChild;
      var index;
      for (var i = 0; i <= props.elementRef.current.children.length - 1; i++) {
        if (props.elementRef.current.children[i].getAttribute('tabindex') === '0') {
          firstTabableChild = {
            elem: props.elementRef.current.children[i],
            index: i
          };
        }
      }
      if (direction === 'prev') {
        if (firstTabableChild.index === 0) {
          index = props.elementRef.current.children.length - 1;
        } else {
          index = firstTabableChild.index - 1;
        }
      } else if (firstTabableChild.index === props.elementRef.current.children.length - 1) {
        index = 0;
      } else {
        index = firstTabableChild.index + 1;
      }
      props.setFocusedIndex(index);
      props.elementRef.current.children[index].focus();
    };
    var createContent = function createContent() {
      var labelProps = mergeProps({
        className: cx('label')
      }, getPTOptions('label'));
      return props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : /*#__PURE__*/React__namespace.createElement("span", labelProps, props.label);
    };
    var content = createContent();
    var buttonProps = mergeProps({
      className: utils.classNames(props.className, cx('button', {
        itemProps: props,
        focusedState: focusedState
      })),
      role: 'button',
      'aria-label': props.label,
      'aria-pressed': props.selected,
      onClick: function onClick(event) {
        return _onClick(event, props.index);
      },
      onKeyDown: function onKeyDown(event) {
        return _onKeyDown(event, props.index);
      },
      tabIndex: props.tabIndex,
      'aria-disabled': props.disabled,
      onFocus: onFocus,
      onBlur: onBlur
    }, getPTOptions('button'));
    return /*#__PURE__*/React__namespace.createElement("div", buttonProps, content, !props.disabled && /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  SelectButtonItem.displayName = 'SelectButtonItem';

  var SelectButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = SelectButtonBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedIndex = _React$useState2[0],
      setFocusedIndex = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var _SelectButtonBase$set = SelectButtonBase.setMetaData({
        props: props
      }),
      ptm = _SelectButtonBase$set.ptm,
      cx = _SelectButtonBase$set.cx,
      isUnstyled = _SelectButtonBase$set.isUnstyled;
    componentbase.useHandleStyle(SelectButtonBase.css.styles, isUnstyled, {
      name: 'selectbutton',
      styled: true
    });
    var onOptionClick = function onOptionClick(event) {
      if (props.disabled || isOptionDisabled(event.option)) {
        return;
      }
      var selected = isSelected(event.option);
      if (selected && !(props.unselectable && props.allowEmpty)) {
        return;
      }
      var optionValue = getOptionValue(event.option);
      var newValue;
      if (props.multiple) {
        var currentValue = props.value ? _toConsumableArray(props.value) : [];
        newValue = selected ? currentValue.filter(function (val) {
          return !utils.ObjectUtils.equals(val, optionValue, props.dataKey);
        }) : [].concat(_toConsumableArray(currentValue), [optionValue]);
      } else {
        newValue = selected ? null : optionValue;
      }
      if (props.onChange) {
        props.onChange({
          originalEvent: event.originalEvent,
          value: newValue,
          stopPropagation: function stopPropagation() {
            event.originalEvent.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.originalEvent.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: newValue
          }
        });
      }
    };
    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option.label !== undefined ? option.label : option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option && option.value !== undefined ? option.value : option;
    };
    var isOptionDisabled = function isOptionDisabled(option) {
      if (props.optionDisabled) {
        return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
      }
      return option && option.disabled !== undefined ? option.disabled : false;
    };
    var isSelected = function isSelected(option) {
      var optionValue = getOptionValue(option);
      if (props.multiple) {
        if (props.value && props.value.length) {
          return props.value.some(function (val) {
            return utils.ObjectUtils.equals(val, optionValue, props.dataKey);
          });
        }
      } else {
        return utils.ObjectUtils.equals(props.value, optionValue, props.dataKey);
      }
      return false;
    };
    var createItems = function createItems() {
      if (props.options && props.options.length) {
        return props.options.map(function (option, index) {
          var isDisabled = props.disabled || isOptionDisabled(option);
          var optionLabel = getOptionLabel(option);
          var tabIndex = props.disabled || index !== focusedIndex ? '-1' : '0';
          var selected = isSelected(option);
          var key = optionLabel + '_' + index;
          return /*#__PURE__*/React__namespace.createElement(SelectButtonItem, {
            hostName: "SelectButton",
            key: key,
            label: optionLabel,
            className: option.className,
            option: option,
            setFocusedIndex: setFocusedIndex,
            onClick: onOptionClick,
            template: props.itemTemplate,
            selected: selected,
            tabIndex: tabIndex,
            index: index,
            disabled: isDisabled,
            ptm: ptm,
            cx: cx,
            elementRef: elementRef
          });
        });
      }
      return null;
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
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var items = createItems();
    var rootProps = mergeProps({
      ref: elementRef,
      id: props.id,
      className: utils.classNames(props.className, cx('root')),
      style: props.style,
      role: 'group'
    }, SelectButtonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, items, props.children), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  SelectButton.displayName = 'SelectButton';

  exports.SelectButton = SelectButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.tooltip, primereact.utils, primereact.ripple);
