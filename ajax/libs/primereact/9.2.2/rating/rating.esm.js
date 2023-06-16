import * as React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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

var RatingBase = {
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
    onIcon: 'pi pi-star-fill',
    offIcon: 'pi pi-star',
    cancelIcon: 'pi pi-ban',
    cancelIconProps: null,
    onIconProps: null,
    offIconProps: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, RatingBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, RatingBase.defaultProps);
  }
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Rating = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = RatingBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var enabled = !props.disabled && !props.readOnly;
  var tabIndex = enabled ? 0 : null;
  var rate = function rate(event, i) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: i,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
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
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
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
      var className = classNames('p-rating-item', {
        'p-rating-item-active': active
      });
      var icon = active ? {
        type: props.onIcon,
        props: props.onIconProps
      } : {
        type: props.offIcon,
        props: props.offIconProps
      };
      var content = IconUtils.getJSXIcon(icon.type, _objectSpread({
        className: 'p-rating-icon'
      }, icon.props), {
        props: props
      });
      return /*#__PURE__*/React.createElement("div", {
        key: value,
        className: className,
        tabIndex: tabIndex,
        onClick: function onClick(e) {
          return rate(e, value);
        },
        onKeyDown: function onKeyDown(e) {
          return onStarKeyDown(e, value);
        }
      }, content);
    });
  };
  var createCancelIcon = function createCancelIcon() {
    if (props.cancel) {
      var content = IconUtils.getJSXIcon(props.cancelIcon, _objectSpread({
        className: 'p-rating-icon p-rating-cancel'
      }, props.cancelIconProps), {
        props: props
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-rating-item p-rating-cancel-item",
        onClick: clear,
        tabIndex: tabIndex,
        onKeyDown: onCancelKeyDown
      }, content);
    }
    return null;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = RatingBase.getOtherProps(props);
  var className = classNames('p-rating', {
    'p-disabled': props.disabled,
    'p-readonly': props.readOnly
  }, props.className);
  var cancelIcon = createCancelIcon();
  var icons = createIcons();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), cancelIcon, icons), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Rating.displayName = 'Rating';

export { Rating };
