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

var InputTextarea = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(ref);
  var cachedScrollHeight = React.useRef(0);

  var onFocus = function onFocus(event) {
    if (props.autoResize) {
      resize();
    }

    props.onFocus && props.onFocus(event);
  };

  var onBlur = function onBlur(event) {
    if (props.autoResize) {
      resize();
    }

    props.onBlur && props.onBlur(event);
  };

  var onKeyUp = function onKeyUp(event) {
    if (props.autoResize) {
      resize();
    }

    props.onKeyUp && props.onKeyUp(event);
  };

  var onKeyDown = function onKeyDown(event) {
    props.onKeyDown && props.onKeyDown(event);

    if (props.keyfilter) {
      KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
    }
  };

  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);

    if (props.keyfilter) {
      KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };

  var onInput = function onInput(event) {
    if (props.autoResize) {
      resize();
    }

    props.onInput && props.onInput(event);
    var target = event.target;
    ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
  };

  var resize = function resize(initial) {
    var inputEl = elementRef.current;

    if (inputEl && DomHandler.isVisible(inputEl)) {
      if (!cachedScrollHeight.current) {
        cachedScrollHeight.current = inputEl.scrollHeight;
        inputEl.style.overflow = 'hidden';
      }

      if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
        inputEl.style.height = '';
        inputEl.style.height = inputEl.scrollHeight + 'px';

        if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
          inputEl.style.overflowY = 'scroll';
          inputEl.style.height = inputEl.style.maxHeight;
        } else {
          inputEl.style.overflow = 'hidden';
        }

        cachedScrollHeight.current = inputEl.scrollHeight;
      }
    }
  };

  var currentValue = elementRef.current && elementRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  React.useEffect(function () {
    if (props.autoResize) {
      resize(true);
    }
  }, [props.autoResize]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ObjectUtils.findDiffKeys(props, InputTextarea.defaultProps);
  var className = classNames('p-inputtextarea p-inputtext p-component', {
    'p-disabled': props.disabled,
    'p-filled': isFilled,
    'p-inputtextarea-resizable': props.autoResize
  }, props.className);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", _extends({
    ref: elementRef
  }, otherProps, {
    className: className,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyUp: onKeyUp,
    onKeyDown: onKeyDown,
    onInput: onInput,
    onPaste: onPaste
  })), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
InputTextarea.displayName = 'InputTextarea';
InputTextarea.defaultProps = {
  __TYPE: 'InputTextarea',
  autoResize: false,
  keyfilter: null,
  onBlur: null,
  onFocus: null,
  onInput: null,
  onKeyDown: null,
  onKeyUp: null,
  onPaste: null,
  tooltip: null,
  tooltipOptions: null,
  validateOnly: false
};

export { InputTextarea };
