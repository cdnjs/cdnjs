"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _View = _interopRequireDefault(require("../View"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["colors", "enabled", "onRefresh", "progressBackgroundColor", "progressViewOffset", "refreshing", "size", "tintColor", "title", "titleColor"];
function RefreshControl(props) {
  var colors = props.colors,
    enabled = props.enabled,
    onRefresh = props.onRefresh,
    progressBackgroundColor = props.progressBackgroundColor,
    progressViewOffset = props.progressViewOffset,
    refreshing = props.refreshing,
    size = props.size,
    tintColor = props.tintColor,
    title = props.title,
    titleColor = props.titleColor,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(_View.default, rest);
}
var _default = RefreshControl;
exports.default = _default;
module.exports = exports.default;