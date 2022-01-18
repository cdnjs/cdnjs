"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Tappable = _interopRequireWildcard(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _utils = require("../../lib/utils");

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _excluded = ["children", "description", "style", "className", "getRef", "getRootRef", "sizeY"];

var Radio = function Radio(props) {
  var children = props.children,
      description = props.description,
      style = props.style,
      className = props.className,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      sizeY = props.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var ContentComponent = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.default : _Headline.default;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Radio', platform), "Radio--sizeY-".concat(sizeY)),
    activeEffectDelay: platform === _platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    type: "radio",
    vkuiClass: "Radio__input",
    ref: getRef
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__container"
  }, (0, _jsxRuntime.createScopedElement)("i", {
    vkuiClass: "Radio__icon",
    role: "presentation"
  }), (0, _jsxRuntime.createScopedElement)(ContentComponent, {
    weight: "regular",
    vkuiClass: "Radio__content",
    Component: "div"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    Component: "span",
    weight: "regular",
    vkuiClass: "Radio__description"
  }, description))));
};

var _default = (0, _withAdaptivity.withAdaptivity)(Radio, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=Radio.js.map