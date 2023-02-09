"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormLayoutGroup = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _Removable = require("../Removable/Removable");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["children", "mode", "removable", "segmented", "removePlaceholder", "onRemove", "getRootRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */
var FormLayoutGroup = function FormLayoutGroup(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
    removable = _ref.removable,
    segmented = _ref.segmented,
    _ref$removePlaceholde = _ref.removePlaceholder,
    removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? _vkjs.noop : _ref$onRemove,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var isRemovable = removable && mode === 'horizontal';
  var isSegmented = segmented && mode === 'horizontal';
  var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: rootEl,
    className: (0, _vkjs.classNames)("vkuiFormLayoutGroup", (0, _getSizeYClassName.getSizeYClassName)("vkuiFormLayoutGroup", sizeY), styles["FormLayoutGroup--mode-".concat(mode)], isRemovable && "vkuiFormLayoutGroup--removable", isSegmented && "vkuiFormLayoutGroup--segmented", className)
  }, restProps), isRemovable ? /*#__PURE__*/React.createElement(_Removable.Removable, {
    className: "vkuiFormLayoutGroup__removable",
    align: "start",
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    }
  }, children) : /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement("span", {
    className: "vkuiFormLayoutGroup__offset",
    "aria-hidden": true
  })));
};
exports.FormLayoutGroup = FormLayoutGroup;
var styles = {
  "FormLayoutGroup--mode-horizontal": "vkuiFormLayoutGroup--mode-horizontal",
  "FormLayoutGroup--mode-vertical": "vkuiFormLayoutGroup--mode-vertical"
};
//# sourceMappingURL=FormLayoutGroup.js.map