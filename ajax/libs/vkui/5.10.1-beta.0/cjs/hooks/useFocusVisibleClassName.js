"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    focusVisiblePresetModeClassNames: function() {
        return focusVisiblePresetModeClassNames;
    },
    useFocusVisibleClassName: function() {
        return useFocusVisibleClassName;
    }
});
var _vkjs = require("@vkontakte/vkjs");
var focusVisiblePresetModeClassNames = {
    inside: "vkui-focus-visible--mode-inside",
    outside: "vkui-focus-visible--mode-outside"
};
var isPresetMode = function(mode) {
    return mode === "inside" || mode === "outside";
};
function useFocusVisibleClassName(param) {
    var _param_focusVisible = param.focusVisible, focusVisible = _param_focusVisible === void 0 ? false : _param_focusVisible, _param_mode = param.mode, mode = _param_mode === void 0 ? "inside" : _param_mode;
    var modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    var focusVisibleClassNames = (0, _vkjs.classNames)("vkui-focus-visible", focusVisible && "vkui-focus-visible--focused", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map