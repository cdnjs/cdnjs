import { classNames } from '@vkontakte/vkjs';
import styles from '../styles/focusVisible.module.css';
export const focusVisiblePresetModeClassNames = {
    inside: styles['-focus-visible--mode-inside'],
    outside: styles['-focus-visible--mode-outside']
};
const isPresetMode = (mode)=>mode === 'inside' || mode === 'outside';
/**
 * Используется для проброса классов состояния :focus-visible в компонент.
 *
 * Рулит исключительно классами. Чтобы определить, есть ли фокусное состояние,
 * используйте хуки `useFocusVisible()` и `useFocusWithin()`.
 */ export function useFocusVisibleClassName({ focusVisible = false, mode = 'inside' }) {
    const modeClassName = isPresetMode(mode) ? focusVisiblePresetModeClassNames[mode] : mode;
    const focusVisibleClassNames = classNames(styles['-focus-visible'], focusVisible && styles['-focus-visible--focused'], focusVisible && modeClassName);
    return focusVisibleClassNames;
}

//# sourceMappingURL=useFocusVisibleClassName.js.map