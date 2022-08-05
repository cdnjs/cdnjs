"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormLayoutGroup = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _Removable = require("../Removable/Removable");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["children", "mode", "removable", "removePlaceholder", "onRemove", "getRootRef"];

/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */
var FormLayoutGroup = function FormLayoutGroup(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "vertical" : _ref$mode,
      removable = _ref.removable,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? "Удалить" : _ref$removePlaceholde,
      _ref$onRemove = _ref.onRemove,
      _onRemove = _ref$onRemove === void 0 ? _utils.noop : _ref$onRemove,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var isRemovable = removable && mode === "horizontal";
  var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    ref: rootEl,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("FormLayoutGroup", platform), // TODO: v5 remove
    "FormLayoutGroup--sizeY-".concat(sizeY), "FormLayoutGroup--".concat(mode), isRemovable && "FormLayoutGroup--removable")
  }, restProps), isRemovable ? (0, _jsxRuntime.createScopedElement)(_Removable.Removable, {
    vkuiClass: "FormLayoutGroup__removable",
    align: "start",
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    }
  }, children) : children);
};

exports.FormLayoutGroup = FormLayoutGroup;
//# sourceMappingURL=FormLayoutGroup.js.map