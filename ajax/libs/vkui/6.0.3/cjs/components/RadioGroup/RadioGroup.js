"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RadioGroup", {
    enumerable: true,
    get: function() {
        return RadioGroup;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const RadioGroup = (_param)=>{
    var { mode = 'vertical' } = _param, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiRadioGroup", 'vkuiInternalRadioGroup', mode === 'horizontal' && "vkuiRadioGroup--mode-horizontal")
    }, restProps));
};

//# sourceMappingURL=RadioGroup.js.map