import * as React from 'react';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames, mergeProps, DomHandler } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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

var InputTextBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputText',
    keyfilter: null,
    validateOnly: false,
    tooltip: null,
    tooltipOptions: null,
    onBeforeInput: null,
    onInput: null,
    onKeyDown: null,
    onPaste: null,
    children: undefined
  }
});

var InputText = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = InputTextBase.getProps(inProps, context);
  var _InputTextBase$setMet = InputTextBase.setMetaData({
      props: props
    }),
    ptm = _InputTextBase$setMet.ptm;
  var elementRef = React.useRef(ref);
  var onKeyDown = function onKeyDown(event) {
    props.onKeyDown && props.onKeyDown(event);
    if (props.keyfilter) {
      KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
    }
  };
  var onBeforeInput = function onBeforeInput(event) {
    props.onBeforeInput && props.onBeforeInput(event);
    if (props.keyfilter) {
      KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
    }
  };
  var onInput = function onInput(event) {
    var target = event.target;
    var validatePattern = true;
    if (props.keyfilter && props.validateOnly) {
      validatePattern = KeyFilter.validate(event, props.keyfilter);
    }
    props.onInput && props.onInput(event, validatePattern);

    // for uncontrolled changes
    ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
  };
  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);
    if (props.keyfilter) {
      KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue);
  }, [props.value, props.defaultValue]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var className = classNames('p-inputtext p-component', {
    'p-disabled': props.disabled,
    'p-filled': isFilled
  }, props.className);
  var rootProps = mergeProps({
    ref: elementRef,
    className: className,
    onBeforeInput: onBeforeInput,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste
  }, InputTextBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", rootProps), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
InputText.displayName = 'InputText';

export { InputText };
