import { classNames } from "@vkontakte/vkjs";
export const focusVisiblePresetModeClassNames = {
    inside: "vkuistyles__-focus-visible--mode-inside",
    outside: "vkuistyles__-focus-visible--mode-outside"
};
const isPresetMode = (mode)=>mode === 'inside' || mode === 'outside';
/**
 * Используется для проброса классов состояния :focus-visible в компонент.
 *
 * Рулит исключительно классами. Чтобы определить, есть ли фокусное состояние,
 * используйте хуки `useFocusVisible()` и `useFocusWithin()`.
 */ export function useFocusVisibleClassName({ focusVisible = false, mode = 'inside' }) {
    const modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    const focusVisibleClassNames = classNames("vkuistyles__-focus-visible", focusVisible && "vkuistyles__-focus-visible--focused", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map