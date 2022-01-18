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
import * as React from 'react';
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
import Caption from "../Typography/Caption/Caption";
import ModalDismissButton from "../ModalDismissButton/ModalDismissButton";
import "./Alert.css";

var Alert = /*#__PURE__*/function (_React$Component) {
  _inherits(Alert, _React$Component);

  var _super = _createSuper(Alert);

  function Alert(props) {
    var _this;

    _classCallCheck(this, Alert);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "element", void 0);

    _defineProperty(_assertThisInitialized(_this), "transitionFinishTimeout", void 0);

    _defineProperty(_assertThisInitialized(_this), "onItemClick", function (item) {
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

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        closing: true
      });

      _this.waitTransitionFinish(function (e) {
        if (!e || e.propertyName === 'opacity') {
          _this.props.onClose();
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
            Component = _action$Component === void 0 ? 'button' : _action$Component;
        return createScopedElement(Tappable, {
          Component: action.href ? 'a' : Component,
          vkuiClass: classNames('Alert__action', "Alert__action--".concat(action.mode)),
          onClick: _this.onItemClick(action),
          href: action.href,
          key: "alert-action-".concat(i),
          target: action.target
        }, action.title);
      }

      var mode = action.mode === 'cancel' ? 'secondary' : 'primary';

      if (platform === ANDROID) {
        mode = 'tertiary';

        if (_this.props.viewWidth === ViewWidth.DESKTOP && action.mode === 'destructive') {
          mode = 'destructive';
        }
      }

      return createScopedElement(Button, {
        vkuiClass: classNames('Alert__button', "Alert__button--".concat(action.mode)),
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

  _createClass(Alert, [{
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(eventHandler) {
      if (transitionEvent.supported) {
        this.element.current.removeEventListener(transitionEvent.name, eventHandler);
        this.element.current.addEventListener(transitionEvent.name, eventHandler);
      } else {
        clearTimeout(this.transitionFinishTimeout);
        this.transitionFinishTimeout = setTimeout(eventHandler.bind(this), this.props.platform === ANDROID || this.props.platform === VKCOM ? 200 : 300);
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
            weight: "semibold",
            level: "3"
          }, header);

        case ANDROID:
          return createScopedElement(Title, {
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
        case VKCOM:
          return createScopedElement(Caption, {
            vkuiClass: "Alert__text",
            level: "1",
            weight: "regular"
          }, text);

        case IOS:
          return createScopedElement(Caption, {
            vkuiClass: "Alert__text",
            level: "2",
            weight: "regular"
          }, text);

        case ANDROID:
          return createScopedElement(Headline, {
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
          restProps = _objectWithoutProperties(_this$props, _excluded);

      var closing = this.state.closing;
      var resolvedActionsLayout = platform === VKCOM ? 'horizontal' : actionsLayout;
      var canShowCloseButton = platform === VKCOM || platform === ANDROID && viewWidth >= ViewWidth.SMALL_TABLET;
      var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
      return createScopedElement(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: this.onClose
      }, createScopedElement("div", _extends({}, restProps, {
        ref: this.element,
        onClick: this.stopPropagation,
        vkuiClass: classNames(getClassName('Alert', platform), {
          'Alert--v': resolvedActionsLayout === 'vertical',
          'Alert--h': resolvedActionsLayout === 'horizontal',
          'Alert--closing': closing,
          'Alert--desktop': isDesktop
        })
      }), canShowCloseButton && createScopedElement(ModalDismissButton, {
        onClick: this.onClose
      }), createScopedElement("div", {
        vkuiClass: "Alert__content"
      }, hasReactNode(header) && this.renderHeader(header), hasReactNode(text) && this.renderText(text), children), createScopedElement("footer", {
        vkuiClass: "Alert__actions"
      }, actions.map(this.renderAction))));
    }
  }]);

  return Alert;
}(React.Component);

_defineProperty(Alert, "defaultProps", {
  actionsLayout: 'horizontal',
  actions: []
});

export default withPlatform(withAdaptivity(Alert, {
  viewWidth: true
}));
//# sourceMappingURL=Alert.js.map