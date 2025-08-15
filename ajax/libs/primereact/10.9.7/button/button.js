this.primereact = this.primereact || {};
this.primereact.button = (function (exports, React, api, componentbase, hooks, utils, spinner, ripple, tooltip) {
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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  var classes$1 = {
    root: function root(_ref) {
      var props = _ref.props;
      return utils.classNames('p-badge p-component', _defineProperty({
        'p-badge-no-gutter': utils.ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
        'p-badge-dot': utils.ObjectUtils.isEmpty(props.value),
        'p-badge-lg': props.size === 'large',
        'p-badge-xl': props.size === 'xlarge'
      }, "p-badge-".concat(props.severity), props.severity !== null));
    }
  };
  var styles = "\n@layer primereact {\n    .p-badge {\n        display: inline-block;\n        border-radius: 10px;\n        text-align: center;\n        padding: 0 .5rem;\n    }\n    \n    .p-overlay-badge {\n        position: relative;\n    }\n    \n    .p-overlay-badge .p-badge {\n        position: absolute;\n        top: 0;\n        right: 0;\n        transform: translate(50%,-50%);\n        transform-origin: 100% 0;\n        margin: 0;\n    }\n    \n    .p-badge-dot {\n        width: .5rem;\n        min-width: .5rem;\n        height: .5rem;\n        border-radius: 50%;\n        padding: 0;\n    }\n    \n    .p-badge-no-gutter {\n        padding: 0;\n        border-radius: 50%;\n    }\n}\n";
  var BadgeBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Badge',
      __parentMetadata: null,
      value: null,
      severity: null,
      size: null,
      style: null,
      className: null,
      children: undefined
    },
    css: {
      classes: classes$1,
      styles: styles
    }
  });

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Badge = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = BadgeBase.getProps(inProps, context);
    var _BadgeBase$setMetaDat = BadgeBase.setMetaData(_objectSpread$1({
        props: props
      }, props.__parentMetadata)),
      ptm = _BadgeBase$setMetaDat.ptm,
      cx = _BadgeBase$setMetaDat.cx,
      isUnstyled = _BadgeBase$setMetaDat.isUnstyled;
    componentbase.useHandleStyle(BadgeBase.css.styles, isUnstyled, {
      name: 'badge'
    });
    var elementRef = React__namespace.useRef(null);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var rootProps = mergeProps({
      ref: elementRef,
      style: props.style,
      className: utils.classNames(props.className, cx('root'))
    }, BadgeBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("span", rootProps, props.value);
  }));
  Badge.displayName = 'Badge';

  var classes = {
    icon: function icon(_ref) {
      var props = _ref.props;
      return utils.classNames('p-button-icon p-c', _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label));
    },
    loadingIcon: function loadingIcon(_ref2) {
      var props = _ref2.props,
        className = _ref2.className;
      return utils.classNames(className, {
        'p-button-loading-icon': props.loading
      });
    },
    label: 'p-button-label p-c',
    root: function root(_ref3) {
      var props = _ref3.props,
        size = _ref3.size,
        disabled = _ref3.disabled;
      return utils.classNames('p-button p-component', _defineProperty(_defineProperty(_defineProperty(_defineProperty({
        'p-button-icon-only': (props.icon || props.loading) && !props.label && !props.children,
        'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
        'p-disabled': disabled,
        'p-button-loading': props.loading,
        'p-button-outlined': props.outlined,
        'p-button-raised': props.raised,
        'p-button-link': props.link,
        'p-button-text': props.text,
        'p-button-rounded': props.rounded,
        'p-button-loading-label-only': props.loading && !props.icon && props.label
      }, "p-button-loading-".concat(props.iconPos), props.loading && props.label), "p-button-".concat(size), size), "p-button-".concat(props.severity), props.severity), 'p-button-plain', props.plain));
    }
  };
  var ButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Button',
      __parentMetadata: null,
      badge: null,
      badgeClassName: null,
      className: null,
      children: undefined,
      disabled: false,
      icon: null,
      iconPos: 'left',
      label: null,
      link: false,
      loading: false,
      loadingIcon: null,
      outlined: false,
      plain: false,
      raised: false,
      rounded: false,
      severity: null,
      size: null,
      text: false,
      tooltip: null,
      tooltipOptions: null,
      visible: true
    },
    css: {
      classes: classes
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Button = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = ButtonBase.getProps(inProps, context);
    var disabled = props.disabled || props.loading;
    var metaData = _objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        disabled: disabled
      }
    });
    var _ButtonBase$setMetaDa = ButtonBase.setMetaData(metaData),
      ptm = _ButtonBase$setMetaDa.ptm,
      cx = _ButtonBase$setMetaDa.cx,
      isUnstyled = _ButtonBase$setMetaDa.isUnstyled;
    componentbase.useHandleStyle(ButtonBase.css.styles, isUnstyled, {
      name: 'button',
      styled: true
    });
    var elementRef = React__namespace.useRef(ref);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    if (props.visible === false) {
      return null;
    }
    var createIcon = function createIcon() {
      var className = utils.classNames('p-button-icon p-c', _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label));
      var iconsProps = mergeProps({
        className: cx('icon')
      }, ptm('icon'));
      className = utils.classNames(className, {
        'p-button-loading-icon': props.loading
      });
      var loadingIconProps = mergeProps({
        className: cx('loadingIcon', {
          className: className
        })
      }, ptm('loadingIcon'));
      var icon = props.loading ? props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      })) : props.icon;
      return utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconsProps), {
        props: props
      });
    };
    var createLabel = function createLabel() {
      var labelProps = mergeProps({
        className: cx('label')
      }, ptm('label'));
      if (props.label) {
        return /*#__PURE__*/React__namespace.createElement("span", labelProps, props.label);
      }
      return !props.children && !props.label && /*#__PURE__*/React__namespace.createElement("span", _extends({}, labelProps, {
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      }));
    };
    var createBadge = function createBadge() {
      if (props.badge) {
        var badgeProps = mergeProps({
          className: utils.classNames(props.badgeClassName),
          value: props.badge,
          unstyled: props.unstyled,
          __parentMetadata: {
            parent: metaData
          }
        }, ptm('badge'));
        return /*#__PURE__*/React__namespace.createElement(Badge, badgeProps, props.badge);
      }
      return null;
    };
    var showTooltip = !disabled || props.tooltipOptions && props.tooltipOptions.showOnDisabled;
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
    var sizeMapping = {
      large: 'lg',
      small: 'sm'
    };
    var size = sizeMapping[props.size];
    var icon = createIcon();
    var label = createLabel();
    var badge = createBadge();
    var defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];
    var rootProps = mergeProps({
      ref: elementRef,
      'aria-label': defaultAriaLabel,
      'data-pc-autofocus': props.autoFocus,
      className: utils.classNames(props.className, cx('root', {
        size: size,
        disabled: disabled
      })),
      disabled: disabled
    }, ButtonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("button", rootProps, icon, label, props.children, badge, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  Button.displayName = 'Button';

  exports.Button = Button;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils, primereact.icons.spinner, primereact.ripple, primereact.tooltip);
