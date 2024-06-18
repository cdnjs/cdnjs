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
const _vkjs = require("@vkontakte/vkjs");
const focusVisiblePresetModeClassNames = {
    inside: "vkui-focus-visible--mode-inside",
    outside: "vkui-focus-visible--mode-outside"
};
const isPresetMode = (mode)=>mode === 'inside' || mode === 'outside';
function useFocusVisibleClassName({ focusVisible = false, mode = 'inside' }) {
    const modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    const focusVisibleClassNames = (0, _vkjs.classNames)("vkui-focus-visible", focusVisible && "vkui-focus-visible--focused", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map