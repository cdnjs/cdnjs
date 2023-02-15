import * as React from 'react';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames, IconUtils } from 'primereact/utils';

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

var ToggleButtonBase = {
  defaultProps: {
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
    onBlur: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ToggleButtonBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ToggleButtonBase.defaultProps);
  }
};

var ToggleButton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ToggleButtonBase.getProps(inProps);
  var elementRef = React.useRef(null);
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
      var iconClassName = classNames('p-button-icon p-c', {
        'p-button-icon-left': props.iconPos === 'left' && label,
        'p-button-icon-right': props.iconPos === 'right' && label
      });
      return IconUtils.getJSXIcon(icon, {
        className: iconClassName
      }, {
        props: props
      });
    }
    return null;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var tabIndex = props.disabled ? -1 : props.tabIndex;
  var otherProps = ToggleButtonBase.getOtherProps(props);
  var className = classNames('p-button p-togglebutton p-component', {
    'p-button-icon-only': hasIcon && !hasLabel,
    'p-highlight': props.checked,
    'p-disabled': props.disabled
  }, props.className);
  var iconElement = createIcon();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
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
  }), iconElement, /*#__PURE__*/React.createElement("span", {
    className: "p-button-label"
  }, label), /*#__PURE__*/React.createElement(Ripple, null)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
