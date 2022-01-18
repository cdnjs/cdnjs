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

var _Separator = _interopRequireDefault(require("../Separator/Separator"));

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["left", "right", "children", "separator", "getRef"];

var ModalPageHeader = function ModalPageHeader(props) {
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  var left = props.left,
      right = props.right,
      children = props.children,
      separator = props.separator,
      getRef = props.getRef,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isPrimitive = (0, _utils.isPrimitiveReactNode)(children);
  var hasSeparator = separator && platform === _platform.VKCOM;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ModalPageHeader', platform), "ModalPageHeader--sizeX-".concat(sizeX)),
    ref: getRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPageHeader__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPageHeader__left"
  }, left), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPageHeader__content"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPageHeader__content-in"
  }, isPrimitive ? (0, _jsxRuntime.createScopedElement)("span", null, children) : children)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPageHeader__right"
  }, right)), hasSeparator && (0, _jsxRuntime.createScopedElement)(_Separator.default, {
    wide: true,
    vkuiClass: "ModalPageHeader__separator"
  }));
};

ModalPageHeader.defaultProps = {
  separator: true
};
var _default = ModalPageHeader;
exports.default = _default;
//# sourceMappingURL=ModalPageHeader.js.map