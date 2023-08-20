this.primereact = this.primereact || {};
this.primereact.inputtextarea = (function (exports, React, keyfilter, tooltip, utils, componentbase, api) {
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

  var InputTextareaBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InputTextarea',
      autoResize: false,
      keyfilter: null,
      onBlur: null,
      onFocus: null,
      onBeforeInput: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onPaste: null,
      tooltip: null,
      tooltipOptions: null,
      validateOnly: false,
      children: undefined
    }
  });

  var InputTextarea = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InputTextareaBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(ref);
    var cachedScrollHeight = React__namespace.useRef(0);
    var _InputTextareaBase$se = InputTextareaBase.setMetaData({
        props: props
      }),
      ptm = _InputTextareaBase$se.ptm;
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
    var onBeforeInput = function onBeforeInput(event) {
      props.onBeforeInput && props.onBeforeInput(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
      }
    };
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      var target = event.target;
      if (props.autoResize) {
        resize(utils.ObjectUtils.isEmpty(target.value));
      }
      props.onInput && props.onInput(event);
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
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    React__namespace.useEffect(function () {
      if (props.autoResize) {
        resize(true);
      }
    }, [props.autoResize]);
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue);
    }, [props.value, props.defaultValue]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var className = utils.classNames('p-inputtextarea p-inputtext p-component', {
      'p-disabled': props.disabled,
      'p-filled': isFilled,
      'p-inputtextarea-resizable': props.autoResize
    }, props.className);
    var rootProps = utils.mergeProps({
      ref: elementRef,
      className: className,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyUp: onKeyUp,
      onKeyDown: onKeyDown,
      onBeforeInput: onBeforeInput,
      onInput: onInput,
      onPaste: onPaste
    }, InputTextareaBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("textarea", rootProps), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  InputTextarea.displayName = 'InputTextarea';

  exports.InputTextarea = InputTextarea;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.keyfilter, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.api);
