"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ButtonGroup", {
    enumerable: true,
    get: function() {
        return ButtonGroup;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesMode = {
    vertical: "vkuiButtonGroup--mode-vertical",
    horizontal: "vkuiButtonGroup--mode-horizontal"
};
const stylesGap = {
    space: "vkuiButtonGroup--gap-space",
    s: "vkuiButtonGroup--gap-s",
    m: "vkuiButtonGroup--gap-m"
};
const stylesAlign = {
    left: "vkuiButtonGroup--align-left",
    center: "vkuiButtonGroup--align-center",
    right: "vkuiButtonGroup--align-right"
};
const ButtonGroup = (_param)=>{
    var { mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */  } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "gap",
        "stretched",
        "align"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiButtonGroup", stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && "vkuiButtonGroup--stretched", stylesAlign[align]),
        role: "group"
    }, restProps));
};

//# sourceMappingURL=ButtonGroup.js.map