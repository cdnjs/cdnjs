'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var ban = require('primereact/icons/ban');
var star = require('primereact/icons/star');
var starfill = require('primereact/icons/starfill');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');

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

var classes = {
  onIcon: 'p-rating-icon',
  item: function item(_ref) {
    var active = _ref.active,
      value = _ref.value,
      isFocusVisibleItem = _ref.isFocusVisibleItem,
      focusedOptionIndex = _ref.focusedOptionIndex;
    return utils.classNames('p-rating-item', {
      'p-rating-item-active': active
    }, {
      'p-focus': value === focusedOptionIndex && isFocusVisibleItem
    });
  },
  cancelIcon: 'p-rating-icon p-rating-cancel',
  cancelItem: 'p-rating-item p-rating-cancel-item',
  root: function root(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-rating', {
      'p-disabled': props.disabled,
      'p-readonly': props.readOnly
    });
  }
};
var styles = "\n@layer primereact {\n    .p-rating {\n        display: flex;\n        align-items: center;\n    }\n    \n    .p-rating-item {\n        display: inline-flex;\n        align-items: center;\n        cursor: pointer;\n    }\n    \n    .p-rating.p-readonly .p-rating-item {\n        cursor: default;\n    }\n}\n";
var RatingBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Rating',
    id: null,
    value: null,
    disabled: false,
    readOnly: false,
    stars: 5,
    cancel: true,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onIcon: null,
    offIcon: null,
    cancelIcon: null,
    cancelIconProps: null,
    onIconProps: null,
    offIconProps: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Rating = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = RatingBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(-1),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedOptionIndex = _React$useState2[0],
    setFocusedOptionIndex = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isFocusVisibleItem = _React$useState4[0];
    _React$useState4[1];
  var elementRef = React__namespace.useRef(null);
  var _RatingBase$setMetaDa = RatingBase.setMetaData({
      props: props
    }),
    ptm = _RatingBase$setMetaDa.ptm,
    cx = _RatingBase$setMetaDa.cx,
    isUnstyled = _RatingBase$setMetaDa.isUnstyled;
  componentbase.useHandleStyle(RatingBase.css.styles, isUnstyled, {
    name: 'rating'
  });
  var getPTOptions = function getPTOptions(value, key) {
    return ptm(key, {
      context: {
        active: value <= props.value
      }
    });
  };
  var enabled = !props.disabled && !props.readOnly;
  var tabIndex = enabled ? 0 : null;
  var rate = function rate(event, i) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: i,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: i
        }
      });
    }
    setFocusedOptionIndex(i);
    event.preventDefault();
  };
  var clear = function clear(event) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: null,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: null
        }
      });
    }
    event.preventDefault();
  };
  var onStarKeyDown = function onStarKeyDown(event, value) {
    switch (event.key) {
      case 'Enter':
      case 'Space':
        rate(event, value);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        rate(event, props.value - 1 < 1 ? props.stars : props.value - 1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        rate(event, props.value + 1 > props.stars ? 1 : props.value + 1);
        break;
    }
  };
  var _onFocus = function onFocus(event, value) {
    setFocusedOptionIndex(value);
  };
  var _onBlur = function onBlur(event) {
    setFocusedOptionIndex(-1);
  };
  var onCancelKeyDown = function onCancelKeyDown(event) {
    if (event.key === 'Enter') {
      clear(event);
    }
  };
  var createIcons = function createIcons() {
    return Array.from({
      length: props.stars
    }, function (_, i) {
      return i + 1;
    }).map(function (value) {
      var active = value <= props.value;
      var onIconProps = mergeProps({
        className: cx('onIcon')
      }, getPTOptions(props.value, 'onIcon'));
      var offIconProps = mergeProps({
        className: cx('onIcon')
      }, getPTOptions(props.value, 'offIcon'));
      var icon = active ? {
        type: props.onIcon || /*#__PURE__*/React__namespace.createElement(starfill.StarFillIcon, onIconProps)
      } : {
        type: props.offIcon || /*#__PURE__*/React__namespace.createElement(star.StarIcon, offIconProps)
      };
      var content = utils.IconUtils.getJSXIcon(icon.type, active ? _objectSpread({}, onIconProps) : _objectSpread({}, offIconProps), {
        props: props
      });
      var itemProps = mergeProps({
        className: cx('item', {
          active: active,
          focusedOptionIndex: focusedOptionIndex,
          isFocusVisibleItem: isFocusVisibleItem,
          value: value
        }),
        'data-p-focused': value === focusedOptionIndex,
        tabIndex: tabIndex,
        onClick: function onClick(e) {
          return rate(e, value);
        },
        onKeyDown: function onKeyDown(e) {
          return onStarKeyDown(e, value);
        },
        onFocus: function onFocus(e) {
          return _onFocus(e, value);
        },
        onBlur: function onBlur(e) {
          return _onBlur();
        }
      }, getPTOptions(props.value, 'item'));
      return /*#__PURE__*/React__namespace.createElement("div", _extends({}, itemProps, {
        key: value
      }), content);
    });
  };
  var createCancelIcon = function createCancelIcon() {
    if (props.cancel) {
      var cancelIconProps = mergeProps({
        className: cx('cancelIcon')
      }, ptm('cancelIcon'));
      var icon = props.cancelIcon || /*#__PURE__*/React__namespace.createElement(ban.BanIcon, cancelIconProps);
      var content = utils.IconUtils.getJSXIcon(icon, _objectSpread(_objectSpread({}, cancelIconProps), props.cancelIconProps), {
        props: props
      });
      var cancelItemProps = mergeProps({
        className: cx('cancelItem'),
        onClick: clear,
        tabIndex: tabIndex,
        onKeyDown: onCancelKeyDown
      }, ptm('cancelItem'));
      return /*#__PURE__*/React__namespace.createElement("div", cancelItemProps, content);
    }
    return null;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: utils.classNames(props.className, cx('root')),
    style: props.style
  }, RatingBase.getOtherProps(props), ptm('root'));
  var cancelIcon = createCancelIcon();
  var icons = createIcons();
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, cancelIcon, icons), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Rating.displayName = 'Rating';

exports.Rating = Rating;
