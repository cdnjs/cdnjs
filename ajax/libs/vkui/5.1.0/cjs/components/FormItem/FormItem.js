"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Footnote = require("../Typography/Footnote/Footnote");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _Removable = require("../Removable/Removable");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["children", "top", "bottom", "status", "Component", "removable", "onRemove", "removePlaceholder", "getRootRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */
var FormItem = function FormItem(_ref) {
  var children = _ref.children,
    top = _ref.top,
    bottom = _ref.bottom,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'default' : _ref$status,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    removable = _ref.removable,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? _vkjs.noop : _ref$onRemove,
    _ref$removePlaceholde = _ref.removePlaceholder,
    removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var wrappedChildren = /*#__PURE__*/React.createElement(React.Fragment, null, (0, _vkjs.hasReactNode)(top) && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    className: "vkuiFormItem__top"
  }, top), children, (0, _vkjs.hasReactNode)(bottom) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiFormItem__bottom"
  }, bottom));
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: rootEl,
    className: (0, _vkjs.classNames)("vkuiFormItem", status !== 'default' && styles["FormItem--status-".concat(status)], (0, _getSizeYClassName.getSizeYClassName)("vkuiFormItem", sizeY), (0, _vkjs.hasReactNode)(top) && "vkuiFormItem--withTop", removable && "vkuiFormItem--removable", className)
  }), removable ? /*#__PURE__*/React.createElement(_Removable.Removable, {
    align: "start",
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    },
    removePlaceholder: removePlaceholder
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiFormItem__removable"
  }, wrappedChildren)) : wrappedChildren);
};
exports.FormItem = FormItem;
var styles = {
  "FormItem--status-error": "vkuiFormItem--status-error",
  "FormItem--status-valid": "vkuiFormItem--status-valid"
};
//# sourceMappingURL=FormItem.js.map