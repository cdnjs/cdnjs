"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Placeholder = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Title = require("../Typography/Title/Title");
var _Headline = require("../Typography/Headline/Headline");
var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */
var Placeholder = function Placeholder(_ref) {
  var icon = _ref.icon,
    header = _ref.header,
    action = _ref.action,
    children = _ref.children,
    stretched = _ref.stretched,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__in"
  }, (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__icon"
  }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(_Title.Title, {
    level: "2",
    weight: "2",
    className: "vkuiPlaceholder__header"
  }, header), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/React.createElement(_Headline.Headline, {
    weight: "3",
    className: "vkuiPlaceholder__text"
  }, children), (0, _vkjs.hasReactNode)(action) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__action"
  }, action)));
};
exports.Placeholder = Placeholder;
//# sourceMappingURL=Placeholder.js.map