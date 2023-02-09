"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePatchChildrenRef = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _useExternRef = require("./useExternRef");
var _warnOnce = require("../lib/warnOnce");
var _useEffectDev = require("./useEffectDev");
var isDOMTypeElement = function isDOMTypeElement(element) {
  return typeof element.type === 'string';
};
var warn = (0, _warnOnce.warnOnce)('usePatchChildrenRef');
var usePatchChildrenRef = function usePatchChildrenRef(children) {
  var childRef = /*#__PURE__*/React.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
  var patchedRef = (0, _useExternRef.useExternRef)(childRef);
  (0, _useEffectDev.useEffectDev)(function () {
    if (!patchedRef.current) {
      warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
    }
  }, [children === null || children === void 0 ? void 0 : children.type, patchedRef]);
  return [patchedRef, /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, (0, _defineProperty2.default)({}, isDOMTypeElement(children) ? 'ref' : 'getRootRef', patchedRef)) : children];
};
exports.usePatchChildrenRef = usePatchChildrenRef;
//# sourceMappingURL=usePatchChildrenRef.js.map