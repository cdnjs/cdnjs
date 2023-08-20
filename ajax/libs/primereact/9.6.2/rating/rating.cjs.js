'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ban = require('primereact/icons/ban');
var star = require('primereact/icons/star');
var starfill = require('primereact/icons/starfill');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

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
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Rating = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = RatingBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var _RatingBase$setMetaDa = RatingBase.setMetaData({
      props: props
    }),
    ptm = _RatingBase$setMetaDa.ptm;
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
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: i
        }
      });
    }
    event.preventDefault();
  };
  var clear = function clear(event) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: null,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
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
    if (event.key === 'Enter') {
      rate(event, value);
    }
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
      var className = utils.classNames('p-rating-item', {
        'p-rating-item-active': active
      });
      var iconClassName = 'p-rating-icon';
      var onIconProps = utils.mergeProps({
        className: iconClassName
      }, getPTOptions(props.value, 'onIcon'));
      var offIconProps = utils.mergeProps({
        className: iconClassName
      }, getPTOptions(props.value, 'offIcon'));
      var icon = active ? {
        type: props.onIcon || /*#__PURE__*/React__namespace.createElement(starfill.StarFillIcon, onIconProps)
      } : {
        type: props.offIcon || /*#__PURE__*/React__namespace.createElement(star.StarIcon, offIconProps)
      };
      var content = utils.IconUtils.getJSXIcon(icon.type, active ? _objectSpread({}, onIconProps) : _objectSpread({}, offIconProps), {
        props: props
      });
      var itemProps = utils.mergeProps({
        key: value,
        className: className,
        tabIndex: tabIndex,
        onClick: function onClick(e) {
          return rate(e, value);
        },
        onKeyDown: function onKeyDown(e) {
          return onStarKeyDown(e, value);
        }
      }, getPTOptions(props.value, 'item'));
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        key: value
      }, itemProps), content);
    });
  };
  var createCancelIcon = function createCancelIcon() {
    if (props.cancel) {
      var iconClassName = 'p-rating-icon p-rating-cancel';
      var cancelIconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('cancelIcon'));
      var icon = props.cancelIcon || /*#__PURE__*/React__namespace.createElement(ban.BanIcon, cancelIconProps);
      var content = utils.IconUtils.getJSXIcon(icon, _objectSpread(_objectSpread({}, cancelIconProps), props.cancelIconProps), {
        props: props
      });
      var cancelItemProps = utils.mergeProps({
        className: 'p-rating-item p-rating-cancel-item',
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
  var className = utils.classNames('p-rating', {
    'p-disabled': props.disabled,
    'p-readonly': props.readOnly
  }, props.className);
  var rootProps = utils.mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, RatingBase.getOtherProps(props), ptm('root'));
  var cancelIcon = createCancelIcon();
  var icons = createIcons();
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, cancelIcon, icons), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
Rating.displayName = 'Rating';

exports.Rating = Rating;
