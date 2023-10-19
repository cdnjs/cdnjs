"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VisuallyHiddenInput", {
    enumerable: true,
    get: function() {
        return VisuallyHiddenInput;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _warnOnce = require("../../lib/warnOnce");
var warn = (0, _warnOnce.warnOnce)("VisuallyHiddenInput");
var VisuallyHiddenInput = function(_param) {
    var getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "getRef",
        "className",
        "getRootRef"
    ]);
    var visuallyHiddenInputRef = (0, _useExternRef.useExternRef)(getRef, getRootRef);
    if (process.env.NODE_ENV === "development") {
        warn("Компонент устарел и будет удален в v6. Используйте https://vkcom.github.io/VKUI/#/VisuallyHidden");
    }
    return /*#__PURE__*/ _react.createElement("input", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiVisuallyHiddenInput", className),
        ref: visuallyHiddenInputRef
    }));
};

//# sourceMappingURL=VisuallyHiddenInput.js.map