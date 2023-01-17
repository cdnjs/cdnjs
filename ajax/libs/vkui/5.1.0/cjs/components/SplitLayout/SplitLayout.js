"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitLayout = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _PopoutRoot = require("../PopoutRoot/PopoutRoot");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["popout", "modal", "header", "children", "getRootRef", "getRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */
var SplitLayout = function SplitLayout(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    header = _ref.header,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_PopoutRoot.PopoutRoot, {
    className: (0, _vkjs.classNames)("vkuiSplitLayout", platform === _platform.Platform.IOS && "vkuiSplitLayout--ios"),
    popout: popout,
    modal: modal,
    getRootRef: getRootRef
  }, header, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRef,
    className: (0, _vkjs.classNames)("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
  }), children));
};
exports.SplitLayout = SplitLayout;
//# sourceMappingURL=SplitLayout.js.map