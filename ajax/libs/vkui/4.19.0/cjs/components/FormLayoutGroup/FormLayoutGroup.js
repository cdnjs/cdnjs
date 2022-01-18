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

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _Removable = require("../Removable/Removable");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["children", "mode", "removable", "removePlaceholder", "onRemove", "getRootRef"];

var FormLayoutGroup = function FormLayoutGroup(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
      removable = _ref.removable,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
      _onRemove = _ref.onRemove,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var isRemovable = removable && mode === 'horizontal';
  var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    ref: rootEl,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('FormLayoutGroup', platform), "FormLayoutGroup--sizeY-".concat(sizeY), "FormLayoutGroup--".concat(mode), {
      'FormLayoutGroup--removable': isRemovable
    })
  }, restProps), isRemovable ? (0, _jsxRuntime.createScopedElement)(_Removable.Removable, {
    align: "start",
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      return _onRemove(e, rootEl === null || rootEl === void 0 ? void 0 : rootEl.current);
    }
  }, children) : children);
};

var _default = FormLayoutGroup;
exports.default = _default;
//# sourceMappingURL=FormLayoutGroup.js.map