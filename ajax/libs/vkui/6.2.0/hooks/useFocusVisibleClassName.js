import { classNames } from '@vkontakte/vkjs';
export const focusVisiblePresetModeClassNames = {
    inside: "vkui-focus-visible--mode-inside",
    outside: "vkui-focus-visible--mode-outside"
};
const isPresetMode = (mode)=>mode === 'inside' || mode === 'outside';
/**
 * Используется для проброса классов состояния :focus-visible в компонент.
 *
 * Рулит исключительно классами. Чтобы определить, есть ли фокусное состояние,
 * используйте хуки `useFocusVisible()` и `useFocusWithin()`.
 */ export function useFocusVisibleClassName({ focusVisible = false, mode = 'inside' }) {
    const modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    const focusVisibleClassNames = classNames("vkui-focus-visible", focusVisible && "vkui-focus-visible--focused", focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map