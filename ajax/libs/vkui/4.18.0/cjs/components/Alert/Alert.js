"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _supportEvents = require("../../lib/supportEvents");

var _platform = require("../../lib/platform");

var _withPlatform = require("../../hoc/withPlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Button = _interopRequireDefault(require("../Button/Button"));

var _utils = require("../../lib/utils");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _ModalDismissButton = _interopRequireDefault(require("../ModalDismissButton/ModalDismissButton"));

var _excluded = ["actions", "actionsLayout", "children", "className", "style", "platform", "viewWidth", "text", "header"];

var Alert = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Alert, _React$Component);

  var _super = (0, _createSuper2.default)(Alert);

  function Alert(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Alert);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "element", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transitionFinishTimeout", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onItemClick", function (item) {
      return function () {
        var action = item.action,
            autoclose = item.autoclose;

        if (autoclose) {
          _this.setState({
            closing: true
          });

          _this.waitTransitionFinish(function (e) {
            if (!e || e.propertyName === 'opacity') {
              autoclose && _this.props.onClose();
              action && action();
            }
          });
        } else {
          action && action();
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClose", function () {
      _this.setState({
        closing: true
      });

      _this.waitTransitionFinish(function (e) {
        if (!e || e.propertyName === 'opacity') {
          _this.props.onClose();
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "stopPropagation", function (e) {
      e.stopPropagation();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderAction", function (action, i) {
      var platform = _this.props.platform;

      if (platform === _platform.IOS) {
        var _action$Component = action.Component,
            Component = _action$Component === void 0 ? 'button' : _action$Component;
        return (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
          Component: action.href ? 'a' : Component,
          vkuiClass: (0, _classNames.classNames)('Alert__action', "Alert__action--".concat(action.mode)),
          onClick: _this.onItemClick(action),
          href: action.href,
          key: "alert-action-".concat(i),
          target: action.target
        }, action.title);
      }

      var mode = action.mode === 'cancel' ? 'secondary' : 'primary';

      if (platform === _platform.ANDROID) {
        mode = 'tertiary';

        if (_this.props.viewWidth === _withAdaptivity.ViewWidth.DESKTOP && action.mode === 'destructive') {
          mode = 'destructive';
        }
      }

      return (0, _jsxRuntime.createScopedElement)(_Button.default, {
        vkuiClass: (0, _classNames.classNames)('Alert__button', "Alert__button--".concat(action.mode)),
        mode: mode,
        size: "m",
        onClick: _this.onItemClick(action),
        Component: action.Component,
        href: action.href,
        key: "alert-action-".concat(i),
        target: action.target
      }, action.title);
    });
    _this.element = /*#__PURE__*/React.createRef();
    _this.state = {
      closing: false
    };
    return _this;
  }

  (0, _createClass2.default)(Alert, [{
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(eventHandler) {
      if (_supportEvents.transitionEvent.supported) {
        this.element.current.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
        this.element.current.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
      } else {
        clearTimeout(this.transitionFinishTimeout);
        this.transitionFinishTimeout = setTimeout(eventHandler.bind(this), this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? 200 : 300);
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(header) {
      switch (this.props.platform) {
        case _platform.VKCOM:
          return (0, _jsxRuntime.createScopedElement)(_Headline.default, {
            vkuiClass: "Alert__header",
            weight: "medium"
          }, header);

        case _platform.IOS:
          return (0, _jsxRuntime.createScopedElement)(_Title.default, {
            vkuiClass: "Alert__header",
            weight: "semibold",
            level: "3"
          }, header);

        case _platform.ANDROID:
          return (0, _jsxRuntime.createScopedElement)(_Title.default, {
            vkuiClass: "Alert__header",
            weight: "medium",
            level: "2"
          }, header);
      }
    }
  }, {
    key: "renderText",
    value: function renderText(text) {
      switch (this.props.platform) {
        case _platform.VKCOM:
          return (0, _jsxRuntime.createScopedElement)(_Caption.default, {
            vkuiClass: "Alert__text",
            level: "1",
            weight: "regular"
          }, text);

        case _platform.IOS:
          return (0, _jsxRuntime.createScopedElement)(_Caption.default, {
            vkuiClass: "Alert__text",
            level: "2",
            weight: "regular"
          }, text);

        case _platform.ANDROID:
          return (0, _jsxRuntime.createScopedElement)(_Headline.default, {
            vkuiClass: "Alert__text",
            weight: "regular"
          }, text);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          actionsLayout = _this$props.actionsLayout,
          children = _this$props.children,
          className = _this$props.className,
          style = _this$props.style,
          platform = _this$props.platform,
          viewWidth = _this$props.viewWidth,
          text = _this$props.text,
          header = _this$props.header,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var closing = this.state.closing;
      var resolvedActionsLayout = platform === _platform.VKCOM ? 'horizontal' : actionsLayout;
      var canShowCloseButton = platform === _platform.VKCOM || platform === _platform.ANDROID && viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
      var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
      return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: this.onClose
      }, (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
        ref: this.element,
        onClick: this.stopPropagation,
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Alert', platform), {
          'Alert--v': resolvedActionsLayout === 'vertical',
          'Alert--h': resolvedActionsLayout === 'horizontal',
          'Alert--closing': closing,
          'Alert--desktop': isDesktop
        })
      }), canShowCloseButton && (0, _jsxRuntime.createScopedElement)(_ModalDismissButton.default, {
        onClick: this.onClose
      }), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "Alert__content"
      }, (0, _utils.hasReactNode)(header) && this.renderHeader(header), (0, _utils.hasReactNode)(text) && this.renderText(text), children), (0, _jsxRuntime.createScopedElement)("footer", {
        vkuiClass: "Alert__actions"
      }, actions.map(this.renderAction))));
    }
  }]);
  return Alert;
}(React.Component);

(0, _defineProperty2.default)(Alert, "defaultProps", {
  actionsLayout: 'horizontal',
  actions: []
});

var _default = (0, _withPlatform.withPlatform)((0, _withAdaptivity.withAdaptivity)(Alert, {
  viewWidth: true
}));

exports.default = _default;
//# sourceMappingURL=Alert.js.map