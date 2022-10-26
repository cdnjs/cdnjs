this.primereact = this.primereact || {};
this.primereact.rating = (function (exports, React, tooltip, utils) {
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var Rating = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
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
        var className = utils.classNames('p-rating-item', {
          'p-rating-item-active': active
        });
        var icon = active ? {
          type: props.onIcon,
          props: props.onIconProps
        } : {
          type: props.offIcon,
          props: props.offIconProps
        };
        var content = utils.IconUtils.getJSXIcon(icon.type, _objectSpread({
          className: 'p-rating-icon'
        }, icon.props), {
          props: props
        });
        return /*#__PURE__*/React__namespace.createElement("div", {
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
        var content = utils.IconUtils.getJSXIcon(props.cancelIcon, _objectSpread({
          className: 'p-rating-icon p-rating-cancel'
        }, props.cancelIconProps), {
          props: props
        });
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-rating-item p-rating-cancel-item",
          onClick: clear,
          tabIndex: tabIndex,
          onKeyDown: onCancelKeyDown
        }, content);
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
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Rating.defaultProps);
    var className = utils.classNames('p-rating', {
      'p-disabled': props.disabled,
      'p-readonly': props.readOnly
    }, props.className);
    var cancelIcon = createCancelIcon();
    var icons = createIcons();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps), cancelIcon, icons), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
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
    onChange: null,
    onIcon: 'pi pi-star-fill',
    offIcon: 'pi pi-star',
    cancelIcon: 'pi pi-ban',
    cancelIconProps: null,
    onIconProps: null,
    offIconProps: null
  };

  exports.Rating = Rating;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.tooltip, primereact.utils);
