"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipsInput = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _FormField = require("../FormField/FormField");
var _vkjs = require("@vkontakte/vkjs");
var _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _excluded = ["style", "className", "getRootRef", "before", "after", "status"];
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */
var ChipsInput = function ChipsInput(_ref) {
  var style = _ref.style,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_FormField.FormField, {
    getRootRef: getRootRef,
    className: (0, _vkjs.classNames)("vkuiChipsInput", className),
    style: style,
    disabled: restProps.disabled,
    before: before,
    after: after,
    role: "application",
    "aria-disabled": restProps.disabled,
    "aria-readonly": restProps.readOnly,
    status: status
  }, /*#__PURE__*/React.createElement(_ChipsInputBase.ChipsInputBase, restProps));
};
exports.ChipsInput = ChipsInput;
//# sourceMappingURL=ChipsInput.js.map