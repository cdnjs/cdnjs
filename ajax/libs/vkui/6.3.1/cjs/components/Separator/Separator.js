"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Separator", {
    enumerable: true,
    get: function() {
        return Separator;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const modeClassNames = {
    'primary': "vkuiSeparator--mode-primary",
    'secondary': "vkuiSeparator--mode-secondary",
    'primary-alpha': "vkuiSeparator--mode-primaryAlpha"
};
const Separator = (_param)=>{
    var { wide, mode = 'primary' } = _param, restProps = _object_without_properties._(_param, [
        "wide",
        "mode"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)(!wide && "vkuiSeparator--padded", modeClassNames[mode]),
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("hr", {
            className: "vkuiSeparator__in"
        })
    }));
};

//# sourceMappingURL=Separator.js.map