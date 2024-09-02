/**
 * Состояние по умолчанию
 */ export const DEFAULT_STATE_MODE = 'background';
const stylesHovered = {
    background: "vkuiTappable--hovered-background",
    opacity: "vkuiTappable--hovered-opacity",
    none: ''
};
/**
 * Определяем класс наведения
 */ export function hoverClass(hoverMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesHovered[hoverMode];
    return presetClass !== undefined ? presetClass : hoverMode;
}
const stylesActivated = {
    background: "vkuiTappable--activated-background",
    opacity: "vkuiTappable--activated-opacity",
    none: ''
};
/**
 * Определяем класс наведения
 */ export function activeClass(activeMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesActivated[activeMode];
    return presetClass !== undefined ? presetClass : activeMode;
}

//# sourceMappingURL=state.js.map