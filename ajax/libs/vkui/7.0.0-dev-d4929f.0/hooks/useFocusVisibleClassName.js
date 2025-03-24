import { classNames } from "@vkontakte/vkjs";
export const focusVisiblePresetModeClassNames = {
    inside: "styles__-focus-visible--mode-inside--Si4dI",
    outside: "styles__-focus-visible--mode-outside--M79RY"
};
const isPresetMode = (mode)=>mode === 'inside' || mode === 'outside';
/**
 * Используется для проброса классов состояния :focus-visible в компонент.
 *
 * Рулит исключительно классами. Чтобы определить, есть ли фокусное состояние,
 * используйте хуки `useFocusVisible()` и `useFocusWithin()`.
 */ export function useFocusVisibleClassName({ focusVisible = false, mode = 'inside' }) {
    const modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    const focusVisibleClassNames = classNames("styles__-focus-visible--8Txjc", focusVisible && "styles__-focus-visible--focused--Qv2BO", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map