"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _platform = require("../../lib/platform");

var _Headline = require("../Typography/Headline/Headline");

var _Caption = require("../Typography/Caption/Caption");

var _Title = require("../Typography/Title/Title");

var _Text = require("../Typography/Text/Text");

var _Subhead = require("../Typography/Subhead/Subhead");

var _excluded = ["platform", "mode"],
    _excluded2 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline"];

var HeaderContent = function HeaderContent(_ref) {
  var platform = _ref.platform,
      mode = _ref.mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (platform === _platform.Platform.IOS) {
    switch (mode) {
      case "primary":
      case "tertiary":
        return (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
          weight: "1",
          level: "3"
        }, restProps));

      case "secondary":
        return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
          weight: "2",
          caps: true
        }, restProps));
    }
  }

  if (platform === _platform.Platform.VKCOM) {
    switch (mode) {
      case "primary":
        return (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
          weight: "3"
        }, restProps));

      case "secondary":
      case "tertiary":
        return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, restProps);
    }
  }

  switch (mode) {
    case "primary":
    case "tertiary":
      return (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
        weight: "2"
      }, restProps));

    case "secondary":
      return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
        weight: "1",
        caps: true
      }, restProps));
  }

  return null;
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */


var Header = function Header(_ref2) {
  var mode = _ref2.mode,
      children = _ref2.children,
      subtitle = _ref2.subtitle,
      indicator = _ref2.indicator,
      aside = _ref2.aside,
      getRootRef = _ref2.getRootRef,
      multiline = _ref2.multiline,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();
  var AsideTypography = platform === _platform.Platform.VKCOM ? _Subhead.Subhead : _Text.Text;
  var SubtitleTypography = mode === "secondary" ? _Subhead.Subhead : _Caption.Caption;
  return (0, _jsxRuntime.createScopedElement)("header", (0, _extends2.default)({}, restProps, {
    ref: getRootRef // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Header", platform), "Header--mode-".concat(mode), {
      "Header--pi": (0, _utils.isPrimitiveReactNode)(indicator)
    })
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Header__main"
  }, (0, _jsxRuntime.createScopedElement)(HeaderContent, {
    vkuiClass: "Header__content",
    Component: "span",
    mode: mode,
    platform: platform
  }, (0, _jsxRuntime.createScopedElement)("span", {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)("Header__content-in", {
      "Header__content-in--multiline": multiline
    })
  }, children), (0, _utils.hasReactNode)(indicator) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "Header__indicator",
    weight: mode === "primary" || mode === "secondary" ? "1" : undefined
  }, indicator)), (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(SubtitleTypography, {
    vkuiClass: "Header__subtitle",
    Component: "span"
  }, subtitle)), (0, _utils.hasReactNode)(aside) && (0, _jsxRuntime.createScopedElement)(AsideTypography, {
    vkuiClass: "Header__aside",
    Component: "span"
  }, aside));
};

Header.defaultProps = {
  mode: "primary"
}; // eslint-disable-next-line import/no-default-export

var _default = Header;
exports.default = _default;
//# sourceMappingURL=Header.js.map