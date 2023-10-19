"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePatchChildrenRef", {
    enumerable: true,
    get: function() {
        return usePatchChildrenRef;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _warnOnce = require("../lib/warnOnce");
var _useEffectDev = require("./useEffectDev");
var _useExternRef = require("./useExternRef");
var isDOMTypeElement = function(element) {
    return typeof element.type === "string";
};
var warn = (0, _warnOnce.warnOnce)("usePatchChildrenRef");
var usePatchChildrenRef = function(children) {
    var childRef = _react.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
    var patchedRef = (0, _useExternRef.useExternRef)(childRef);
    (0, _useEffectDev.useEffectDev)(function() {
        if (!patchedRef.current) {
            warn("Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента", "error");
        }
    }, [
        children === null || children === void 0 ? void 0 : children.type,
        patchedRef
    ]);
    return [
        patchedRef,
        _react.isValidElement(children) ? _react.cloneElement(children, _define_property._({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children
    ];
};

//# sourceMappingURL=usePatchChildrenRef.js.map