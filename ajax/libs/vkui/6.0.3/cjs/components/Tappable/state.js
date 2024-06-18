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
    DEFAULT_STATE_MODE: function() {
        return DEFAULT_STATE_MODE;
    },
    activeClass: function() {
        return activeClass;
    },
    hoverClass: function() {
        return hoverClass;
    }
});
const DEFAULT_STATE_MODE = 'background';
const stylesHovered = {
    background: "vkuiTappable--hovered-background",
    opacity: "vkuiTappable--hovered-opacity",
    none: ''
};
function hoverClass(hoverMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesHovered[hoverMode];
    return presetClass !== undefined ? presetClass : hoverMode;
}
const stylesActivated = {
    background: "vkuiTappable--activated-background",
    opacity: "vkuiTappable--activated-opacity",
    none: ''
};
function activeClass(activeMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesActivated[activeMode];
    return presetClass !== undefined ? presetClass : activeMode;
}

//# sourceMappingURL=state.js.map