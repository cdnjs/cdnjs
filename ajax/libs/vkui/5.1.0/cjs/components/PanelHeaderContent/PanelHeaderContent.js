"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderContent = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _usePlatform = require("../../hooks/usePlatform");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _platform = require("../../lib/platform");
var _Text = require("../Typography/Text/Text");
var _excluded = ["className", "style", "aside", "status", "before", "children", "onClick"];
var PanelHeaderChildren = function PanelHeaderChildren(_ref) {
  var hasStatus = _ref.hasStatus,
    hasBefore = _ref.hasBefore,
    children = _ref.children;
  var platform = (0, _usePlatform.usePlatform)();
  if (platform === _platform.Platform.VKCOM) {
    return /*#__PURE__*/React.createElement(_Text.Text, {
      Component: "div",
      weight: "2"
    }, children);
  }
  return hasStatus || hasBefore ? /*#__PURE__*/React.createElement(_Headline.Headline, {
    Component: "div",
    weight: "2"
  }, children) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__children-in"
  }, children);
};

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */
var PanelHeaderContent = function PanelHeaderContent(_ref2) {
  var className = _ref2.className,
    style = _ref2.style,
    aside = _ref2.aside,
    status = _ref2.status,
    before = _ref2.before,
    children = _ref2.children,
    onClick = _ref2.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var InComponent = onClick ? _Tappable.Tappable : 'div';
  var rootProps = onClick ? {} : restProps;
  var platform = (0, _usePlatform.usePlatform)();
  var inProps = onClick ? (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
    onClick: onClick,
    activeEffectDelay: 200,
    hasActive: platform === _platform.Platform.IOS,
    activeMode: 'opacity'
  }) : {};
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, rootProps, {
    style: style,
    className: (0, _vkjs.classNames)("vkuiPanelHeaderContent", (0, _getPlatformClassName.getPlatformClassName)("vkuiPanelHeaderContent", platform), className)
  }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__before"
  }, before), /*#__PURE__*/React.createElement(InComponent, (0, _extends2.default)({}, inProps, {
    className: (0, _vkjs.classNames)("vkuiPanelHeaderContent__in", !before && platform !== _platform.Platform.ANDROID && "vkuiPanelHeaderContent__in--centered")
  }), (0, _vkjs.hasReactNode)(status) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiPanelHeaderContent__status"
  }, status), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__children"
  }, /*#__PURE__*/React.createElement(PanelHeaderChildren, {
    hasStatus: (0, _vkjs.hasReactNode)(status),
    hasBefore: (0, _vkjs.hasReactNode)(before)
  }, children), (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__aside"
  }, aside)), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__width"
  })));
};
exports.PanelHeaderContent = PanelHeaderContent;
//# sourceMappingURL=PanelHeaderContent.js.map