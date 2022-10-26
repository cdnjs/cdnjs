import * as React from 'react';
import { Ripple } from 'primereact/ripple';
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

var Button = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(ref);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);

  if (props.visible === false) {
    return null;
  }

  var createIcon = function createIcon() {
    var icon = props.loading ? props.loadingIcon : props.icon;
    var className = classNames('p-button-icon p-c', _defineProperty({
      'p-button-loading-icon': props.loading
    }, "p-button-icon-".concat(props.iconPos), props.label));
    return IconUtils.getJSXIcon(icon, {
      className: className
    }, {
      props: props
    });
  };

  var createLabel = function createLabel() {
    if (props.label) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-button-label p-c"
      }, props.label);
    }

    return !props.children && !props.label && /*#__PURE__*/React.createElement("span", {
      className: "p-button-label p-c",
      dangerouslySetInnerHTML: {
        __html: '&nbsp;'
      }
    });
  };

  var createBadge = function createBadge() {
    if (props.badge) {
      var badgeClassName = classNames('p-badge', props.badgeClassName);
      return /*#__PURE__*/React.createElement("span", {
        className: badgeClassName
      }, props.badge);
    }

    return null;
  };

  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var disabled = props.disabled || props.loading;
  var otherProps = ObjectUtils.findDiffKeys(props, Button.defaultProps);
  var className = classNames('p-button p-component', props.className, _defineProperty({
    'p-button-icon-only': (props.icon || props.loading && props.loadingIcon) && !props.label && !props.children,
    'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
    'p-disabled': disabled,
    'p-button-loading': props.loading,
    'p-button-loading-label-only': props.loading && !props.icon && props.label
  }, "p-button-loading-".concat(props.iconPos), props.loading && props.loadingIcon && props.label));
  var icon = createIcon();
  var label = createLabel();
  var badge = createBadge();
  var defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", _extends({
    ref: elementRef,
    "aria-label": defaultAriaLabel
  }, otherProps, {
    className: className,
    disabled: disabled
  }), icon, label, props.children, badge, /*#__PURE__*/React.createElement(Ripple, null)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Button.displayName = 'Button';
Button.defaultProps = {
  __TYPE: 'Button',
  label: null,
  icon: null,
  iconPos: 'left',
  badge: null,
  badgeClassName: null,
  tooltip: null,
  tooltipOptions: null,
  disabled: false,
  loading: false,
  loadingIcon: 'pi pi-spinner pi-spin',
  visible: true
};

export { Button };
