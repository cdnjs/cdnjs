this.primereact = this.primereact || {};
this.primereact.togglebutton = (function (exports, React, ripple, tooltip, utils) {
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

  var ToggleButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var hasLabel = props.onLabel && props.onLabel.length > 0 && props.offLabel && props.offLabel.length > 0;
    var hasIcon = props.onIcon && props.onIcon.length > 0 && props.offIcon && props.offIcon.length > 0;
    var label = hasLabel ? props.checked ? props.onLabel : props.offLabel : '&nbsp;';
    var icon = props.checked ? props.onIcon : props.offIcon;

    var toggle = function toggle(e) {
      if (!props.disabled && props.onChange) {
        props.onChange({
          originalEvent: e,
          value: !props.checked,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: !props.checked
          }
        });
      }
    };

    var onKeyDown = function onKeyDown(event) {
      if (event.keyCode === 32) {
        toggle(event);
        event.preventDefault();
      }
    };

    var createIcon = function createIcon() {
      if (hasIcon) {
        var iconClassName = utils.classNames('p-button-icon p-c', {
          'p-button-icon-left': props.iconPos === 'left' && label,
          'p-button-icon-right': props.iconPos === 'right' && label
        });
        return utils.IconUtils.getJSXIcon(icon, {
          className: iconClassName
        }, {
          props: props
        });
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
    var tabIndex = !props.disabled && props.tabIndex;
    var otherProps = utils.ObjectUtils.findDiffKeys(props, ToggleButton.defaultProps);
    var className = utils.classNames('p-button p-togglebutton p-component', {
      'p-button-icon-only': hasIcon && !hasLabel,
      'p-highlight': props.checked,
      'p-disabled': props.disabled
    }, props.className);
    var iconElement = createIcon();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: toggle,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onKeyDown: onKeyDown,
      tabIndex: tabIndex,
      role: "button",
      "aria-pressed": props.checked
    }), iconElement, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-button-label"
    }, label), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  ToggleButton.displayName = 'ToggleButton';
  ToggleButton.defaultProps = {
    __TYPE: 'ToggleButton',
    id: null,
    onIcon: null,
    offIcon: null,
    onLabel: 'Yes',
    offLabel: 'No',
    iconPos: 'left',
    style: null,
    className: null,
    checked: false,
    tabIndex: 0,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onFocus: null,
    onBlur: null
  };

  exports.ToggleButton = ToggleButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.ripple, primereact.tooltip, primereact.utils);
