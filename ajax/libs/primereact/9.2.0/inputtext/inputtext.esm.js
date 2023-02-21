import * as React from 'react';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames, DomHandler } from 'primereact/utils';

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

var InputTextBase = {
  defaultProps: {
    __TYPE: 'InputText',
    keyfilter: null,
    validateOnly: false,
    tooltip: null,
    tooltipOptions: null,
    onInput: null,
    onKeyDown: null,
    onPaste: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, InputTextBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, InputTextBase.defaultProps);
  }
};

var InputText = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = InputTextBase.getProps(inProps);
  var elementRef = React.useRef(ref);
  var onKeyDown = function onKeyDown(event) {
    props.onKeyDown && props.onKeyDown(event);
    if (props.keyfilter) {
      KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
    }
  };
  var onInput = function onInput(event) {
    var validatePattern = true;
    if (props.keyfilter && props.validateOnly) {
      validatePattern = KeyFilter.validate(event, props.keyfilter);
    }
    props.onInput && props.onInput(event, validatePattern);
    if (!props.onChange) {
      var target = event.target;
      ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
    }
  };
  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);
    if (props.keyfilter) {
      KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };
  var currentValue = elementRef.current && elementRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = InputTextBase.getOtherProps(props);
  var className = classNames('p-inputtext p-component', {
    'p-disabled': props.disabled,
    'p-filled': isFilled
  }, props.className);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", _extends({
    ref: elementRef
  }, otherProps, {
    className: className,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste
  })), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
InputText.displayName = 'InputText';

export { InputText };
