'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var keyfilter = require('primereact/keyfilter');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');

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

var InputText = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(ref);

  var onKeyDown = function onKeyDown(event) {
    props.onKeyDown && props.onKeyDown(event);

    if (props.keyfilter) {
      keyfilter.KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
    }
  };

  var onInput = function onInput(event) {
    var validatePattern = true;

    if (props.keyfilter && props.validateOnly) {
      validatePattern = keyfilter.KeyFilter.validate(event, props.keyfilter);
    }

    props.onInput && props.onInput(event, validatePattern);

    if (!props.onChange) {
      var target = event.target;
      utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
    }
  };

  var onPaste = function onPaste(event) {
    props.onPaste && props.onPaste(event);

    if (props.keyfilter) {
      keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
    }
  };

  var currentValue = elementRef.current && elementRef.current.value;
  var isFilled = React__namespace.useMemo(function () {
    return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue) || utils.ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, InputText.defaultProps);
  var className = utils.classNames('p-inputtext p-component', {
    'p-disabled': props.disabled,
    'p-filled': isFilled
  }, props.className);
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("input", _extends({
    ref: elementRef
  }, otherProps, {
    className: className,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste
  })), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
InputText.displayName = 'InputText';
InputText.defaultProps = {
  __TYPE: 'InputText',
  keyfilter: null,
  validateOnly: false,
  tooltip: null,
  tooltipOptions: null,
  onInput: null,
  onKeyDown: null,
  onPaste: null
};

exports.InputText = InputText;
