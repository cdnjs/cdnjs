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

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Caption = require("../Typography/Caption/Caption");

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _excluded = ["platform", "mode"],
    _excluded2 = ["platform"],
    _excluded3 = ["mode"],
    _excluded4 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline"];

var HeaderContent = function HeaderContent(_ref) {
  var platform = _ref.platform,
      mode = _ref.mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (platform === _platform.Platform.IOS) {
    switch (mode) {
      case "primary":
      case "tertiary":
        return (0, _jsxRuntime.createScopedElement)(_Title.default, (0, _extends2.default)({
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
        return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
          weight: "regular"
        }, restProps));

      case "secondary":
      case "tertiary":
        return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, restProps);
    }
  }

  switch (mode) {
    case "primary":
    case "tertiary":
      return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
        weight: "medium"
      }, restProps));

    case "secondary":
      return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
        weight: "1",
        caps: true
      }, restProps));
  }

  return null;
};

var HeaderAside = function HeaderAside(_ref2) {
  var platform = _ref2.platform,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return platform === _platform.Platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_Subhead.default, restProps) : (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
    weight: "regular"
  }, restProps));
};

var HeaderSubtitle = function HeaderSubtitle(_ref3) {
  var mode = _ref3.mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref3, _excluded3);
  return mode === "secondary" ? (0, _jsxRuntime.createScopedElement)(_Subhead.default, restProps) : (0, _jsxRuntime.createScopedElement)(_Caption.Caption, restProps);
};

var Header = function Header(_ref4) {
  var mode = _ref4.mode,
      children = _ref4.children,
      subtitle = _ref4.subtitle,
      indicator = _ref4.indicator,
      aside = _ref4.aside,
      getRootRef = _ref4.getRootRef,
      multiline = _ref4.multiline,
      restProps = (0, _objectWithoutProperties2.default)(_ref4, _excluded4);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("header", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
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
    vkuiClass: (0, _classNames.classNames)("Header__content-in", {
      "Header__content-in--multiline": multiline
    })
  }, children), (0, _utils.hasReactNode)(indicator) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "Header__indicator",
    weight: mode === "primary" || mode === "secondary" ? "1" : undefined
  }, indicator)), (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(HeaderSubtitle, {
    vkuiClass: "Header__subtitle",
    Component: "span"
  }, subtitle)), (0, _utils.hasReactNode)(aside) && (0, _jsxRuntime.createScopedElement)(HeaderAside, {
    vkuiClass: "Header__aside",
    Component: "span",
    platform: platform
  }, aside));
};

Header.defaultProps = {
  mode: "primary"
}; // eslint-disable-next-line import/no-default-export

var _default = Header;
exports.default = _default;
//# sourceMappingURL=Header.js.map