import * as React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Rating = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var createStars = function createStars() {
    return Array.from({
      length: props.stars
    }, function (_, i) {
      return i + 1;
    }).map(function (value) {
      var iconClassName = classNames('p-rating-icon', {
        'pi pi-star': !props.value || value > props.value,
        'pi pi-star-fill': value <= props.value
      });
      return /*#__PURE__*/React.createElement("span", {
        className: iconClassName,
        onClick: function onClick(e) {
          return rate(e, value);
        },
        key: value,
        tabIndex: tabIndex,
        onKeyDown: function onKeyDown(e) {
          return onStarKeyDown(e, value);
        }
      });
    });
  };

  var createCancelIcon = function createCancelIcon() {
    if (props.cancel) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-rating-icon p-rating-cancel pi pi-ban",
        onClick: clear,
        tabIndex: tabIndex,
        onKeyDown: onCancelKeyDown
      });
    }

    return null;
  };

  React.useImperativeHandle(ref, function () {
    return _objectSpread({
      getElement: function getElement() {
        return elementRef.current;
      }
    }, props);
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ObjectUtils.findDiffKeys(props, Rating.defaultProps);
  var className = classNames('p-rating', {
    'p-disabled': props.disabled,
    'p-readonly': props.readOnly
  }, props.className);
  var cancelIcon = createCancelIcon();
  var stars = createStars();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), cancelIcon, stars), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Rating.displayName = 'Rating';
Rating.defaultProps = {
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
  onChange: null
};

export { Rating };
