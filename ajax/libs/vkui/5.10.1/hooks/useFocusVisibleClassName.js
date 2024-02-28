import { classNames } from "@vkontakte/vkjs";
export var focusVisiblePresetModeClassNames = {
    inside: "vkui-focus-visible--mode-inside",
    outside: "vkui-focus-visible--mode-outside"
};
var isPresetMode = function(mode) {
    return mode === "inside" || mode === "outside";
};
/**
 * Используется для проброса классов состояния :focus-visible в компонент.
 *
 * Рулит исключительно классами. Чтобы определить, есть ли фокусное состояние,
 * используйте хуки `useFocusVisible()` и `useFocusWithin()`.
 */ export function useFocusVisibleClassName(param) {
    var _param_focusVisible = param.focusVisible, focusVisible = _param_focusVisible === void 0 ? false : _param_focusVisible, _param_mode = param.mode, mode = _param_mode === void 0 ? "inside" : _param_mode;
    var modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    var focusVisibleClassNames = classNames("vkui-focus-visible", focusVisible && "vkui-focus-visible--focused", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map