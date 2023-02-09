this.primereact = this.primereact || {};
this.primereact.inputtextarea = (function (exports, React, keyfilter, tooltip, utils) {
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

  var InputTextareaBase = {
    defaultProps: {
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
      validateOnly: false,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, InputTextareaBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, InputTextareaBase.defaultProps);
    }
  };

  var InputTextarea = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = InputTextareaBase.getProps(inProps);
    var elementRef = React__namespace.useRef(ref);
    var cachedScrollHeight = React__namespace.useRef(0);
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
        keyfilter.KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
      }
    };
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      if (props.autoResize) {
        resize();
      }
      props.onInput && props.onInput(event);
      var target = event.target;
      utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
    };
    var resize = function resize(initial) {
      var inputEl = elementRef.current;
      if (inputEl && utils.DomHandler.isVisible(inputEl)) {
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
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue) || utils.ObjectUtils.isNotEmpty(currentValue);
    }, [props.value, props.defaultValue, currentValue]);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    React__namespace.useEffect(function () {
      if (props.autoResize) {
        resize(true);
      }
    }, [props.autoResize]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputTextareaBase.getOtherProps(props);
    var className = utils.classNames('p-inputtextarea p-inputtext p-component', {
      'p-disabled': props.disabled,
      'p-filled': isFilled,
      'p-inputtextarea-resizable': props.autoResize
    }, props.className);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("textarea", _extends({
      ref: elementRef
    }, otherProps, {
      className: className,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyUp: onKeyUp,
      onKeyDown: onKeyDown,
      onInput: onInput,
      onPaste: onPaste
    })), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  InputTextarea.displayName = 'InputTextarea';

  exports.InputTextarea = InputTextarea;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.keyfilter, primereact.tooltip, primereact.utils);
