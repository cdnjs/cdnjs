import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["actions", "actionsLayout", "children", "className", "style", "platform", "viewWidth", "text", "header"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import Tappable from "../Tappable/Tappable";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { transitionEvent } from "../../lib/supportEvents";
import { ANDROID, VKCOM, IOS } from "../../lib/platform";
import { withPlatform } from "../../hoc/withPlatform";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import Button from "../Button/Button";
import { hasReactNode } from "../../lib/utils";
import Headline from "../Typography/Headline/Headline";
import Title from "../Typography/Title/Title";
import { Caption } from "../Typography/Caption/Caption";
import ModalDismissButton from "../ModalDismissButton/ModalDismissButton";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import "./Alert.css";

var AlertComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(AlertComponent, _React$Component);

  var _super = _createSuper(AlertComponent);

  function AlertComponent(props) {
    var _this;

    _classCallCheck(this, AlertComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "element", void 0);

    _defineProperty(_assertThisInitialized(_this), "transitionFinishTimeout", undefined);

    _defineProperty(_assertThisInitialized(_this), "onItemClick", function (item) {
      return function () {
        var action = item.action,
            autoclose = item.autoclose;

        if (autoclose) {
          _this.setState({
            closing: true
          });

          _this.waitTransitionFinish(function (e) {
            if (!e || e.propertyName === "opacity") {
              var _this$props$onClose, _this$props;

              autoclose && ((_this$props$onClose = (_this$props = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props));
              action && action();
            }
          });
        } else {
          action && action();
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        closing: true
      });

      _this.waitTransitionFinish(function (e) {
        if (!e || e.propertyName === "opacity") {
          var _this$props$onClose2, _this$props2;

          (_this$props$onClose2 = (_this$props2 = _this.props).onClose) === null || _this$props$onClose2 === void 0 ? void 0 : _this$props$onClose2.call(_this$props2);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopPropagation", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "renderAction", function (action, i) {
      var platform = _this.props.platform;

      if (platform === IOS) {
        var _action$Component = action.Component,
            Component = _action$Component === void 0 ? "button" : _action$Component;
        return createScopedElement(Tappable, {
          Component: action.href ? "a" : Component,
          vkuiClass: classNames("Alert__action", "Alert__action--".concat(action.mode)),
          onClick: _this.onItemClick(action),
          href: action.href,
          key: "alert-action-".concat(i),
          target: action.target
        }, action.title);
      }

      var mode = action.mode === "cancel" ? "secondary" : "primary";

      if (platform === ANDROID) {
        mode = "tertiary";

        if (_this.props.viewWidth === ViewWidth.DESKTOP && action.mode === "destructive") {
          mode = "destructive";
        }
      }

      return createScopedElement(Button, {
        vkuiClass: classNames("Alert__button", "Alert__button--".concat(action.mode)),
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

  _createClass(AlertComponent, [{
    key: "timeout",
    get: function get() {
      return this.props.platform === ANDROID || this.props.platform === VKCOM ? 200 : 300;
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(eventHandler) {
      if (transitionEvent.supported && this.element.current) {
        this.element.current.removeEventListener(transitionEvent.name, eventHandler);
        this.element.current.addEventListener(transitionEvent.name, eventHandler);
      } else {
        if (this.transitionFinishTimeout) {
          clearTimeout(this.transitionFinishTimeout);
        }

        this.transitionFinishTimeout = setTimeout(eventHandler.bind(this), this.timeout);
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(header) {
      switch (this.props.platform) {
        case VKCOM:
          return createScopedElement(Headline, {
            vkuiClass: "Alert__header",
            weight: "medium"
          }, header);

        case IOS:
          return createScopedElement(Title, {
            vkuiClass: "Alert__header",
            weight: "1",
            level: "3"
          }, header);

        case ANDROID:
          return createScopedElement(Title, {
            vkuiClass: "Alert__header",
            weight: "2",
            level: "2"
          }, header);

        default:
          return undefined;
      }
    }
  }, {
    key: "renderText",
    value: function renderText(text) {
      switch (this.props.platform) {
        case VKCOM:
          return createScopedElement(Caption, {
            vkuiClass: "Alert__text"
          }, text);

        case IOS:
          return createScopedElement(Caption, {
            vkuiClass: "Alert__text",
            level: "2"
          }, text);

        case ANDROID:
          return createScopedElement(Headline, {
            vkuiClass: "Alert__text",
            weight: "regular"
          }, text);

        default:
          return undefined;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          actions = _this$props3.actions,
          actionsLayout = _this$props3.actionsLayout,
          children = _this$props3.children,
          className = _this$props3.className,
          style = _this$props3.style,
          platform = _this$props3.platform,
          viewWidth = _this$props3.viewWidth,
          text = _this$props3.text,
          header = _this$props3.header,
          restProps = _objectWithoutProperties(_this$props3, _excluded);

      var closing = this.state.closing;
      var resolvedActionsLayout = platform === VKCOM ? "horizontal" : actionsLayout;
      var canShowCloseButton = platform === VKCOM || platform === ANDROID && viewWidth >= ViewWidth.SMALL_TABLET;
      var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
      return createScopedElement(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: this.onClose
      }, createScopedElement(FocusTrap, _extends({}, restProps, {
        getRootRef: this.element,
        onClick: this.stopPropagation,
        onClose: this.onClose,
        timeout: this.timeout,
        vkuiClass: classNames(getClassName("Alert", platform), {
          "Alert--v": resolvedActionsLayout === "vertical",
          "Alert--h": resolvedActionsLayout === "horizontal",
          "Alert--closing": closing,
          "Alert--desktop": isDesktop
        })
      }), canShowCloseButton && createScopedElement(ModalDismissButton, {
        onClick: this.onClose
      }), createScopedElement("div", {
        vkuiClass: "Alert__content"
      }, hasReactNode(header) && this.renderHeader(header), hasReactNode(text) && this.renderText(text), children), createScopedElement("footer", {
        vkuiClass: "Alert__actions"
      }, actions === null || actions === void 0 ? void 0 : actions.map(this.renderAction))));
    }
  }]);

  return AlertComponent;
}(React.Component);

_defineProperty(AlertComponent, "defaultProps", {
  actionsLayout: "horizontal",
  actions: []
});

export var Alert = withPlatform(withAdaptivity(AlertComponent, {
  viewWidth: true
}));
//# sourceMappingURL=Alert.js.map