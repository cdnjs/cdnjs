"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _Headline = require("../Typography/Headline/Headline");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Title = require("../Typography/Title/Title");
var _Text = require("../Typography/Text/Text");
var _Subhead = require("../Typography/Subhead/Subhead");
var _excluded = ["mode"],
  _excluded2 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline", "className"];
var HeaderContent = function HeaderContent(_ref) {
  var mode = _ref.mode,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  if (platform === _platform.Platform.IOS) {
    switch (mode) {
      case 'primary':
      case 'tertiary':
        return /*#__PURE__*/React.createElement(_Title.Title, (0, _extends2.default)({
          weight: "1",
          level: "3"
        }, restProps));
      case 'secondary':
        return /*#__PURE__*/React.createElement(_Footnote.Footnote, (0, _extends2.default)({
          weight: "2",
          caps: true
        }, restProps));
    }
  }
  if (platform === _platform.Platform.VKCOM) {
    switch (mode) {
      case 'primary':
        return /*#__PURE__*/React.createElement(_Headline.Headline, (0, _extends2.default)({
          weight: "3"
        }, restProps));
      case 'secondary':
      case 'tertiary':
        return /*#__PURE__*/React.createElement(_Footnote.Footnote, restProps);
    }
  }
  switch (mode) {
    case 'primary':
    case 'tertiary':
      return /*#__PURE__*/React.createElement(_Headline.Headline, (0, _extends2.default)({
        weight: "2"
      }, restProps));
    case 'secondary':
      return /*#__PURE__*/React.createElement(_Footnote.Footnote, (0, _extends2.default)({
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
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? 'primary' : _ref2$mode,
    children = _ref2.children,
    subtitle = _ref2.subtitle,
    indicator = _ref2.indicator,
    aside = _ref2.aside,
    getRootRef = _ref2.getRootRef,
    multiline = _ref2.multiline,
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();
  var AsideTypography = platform === _platform.Platform.VKCOM ? _Subhead.Subhead : _Text.Text;
  var SubtitleTypography = mode === 'secondary' ? _Subhead.Subhead : _Footnote.Footnote;
  return /*#__PURE__*/React.createElement("header", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiHeader", platform === _platform.Platform.VKCOM && "vkuiHeader--vkcom", platform === _platform.Platform.ANDROID && "vkuiHeader--android", platform === _platform.Platform.IOS && "vkuiHeader--ios", styles["Header--mode-".concat(mode)], (0, _vkjs.isPrimitiveReactNode)(indicator) && "vkuiHeader--pi", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiHeader__main"
  }, /*#__PURE__*/React.createElement(HeaderContent, {
    className: "vkuiHeader__content",
    Component: "span",
    mode: mode
  }, /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiHeader__content-in", multiline && "vkuiHeader__content-in--multiline")
  }, children), (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiHeader__indicator",
    weight: mode === 'primary' || mode === 'secondary' ? '1' : undefined
  }, indicator)), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/React.createElement(SubtitleTypography, {
    className: "vkuiHeader__subtitle",
    Component: "span"
  }, subtitle)), (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/React.createElement(AsideTypography, {
    className: "vkuiHeader__aside",
    Component: "span"
  }, aside));
};
exports.Header = Header;
var styles = {
  "Header--mode-primary": "vkuiHeader--mode-primary",
  "Header--mode-secondary": "vkuiHeader--mode-secondary",
  "Header--mode-tertiary": "vkuiHeader--mode-tertiary"
};
//# sourceMappingURL=Header.js.map