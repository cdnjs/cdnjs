/**
 * Состояние по умолчанию
 */ export const DEFAULT_STATE_MODE = 'background';
const stylesHovered = {
    background: "Tappable__hoveredBackground--kFXsQ",
    opacity: "Tappable__hoveredOpacity--D8QRa",
    none: ''
};
/**
 * Определяем класс наведения
 */ export function hoverClass(hoverMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesHovered[hoverMode];
    return presetClass !== undefined ? presetClass : hoverMode;
}
const stylesActivated = {
    background: "Tappable__activatedBackground--iY03o",
    opacity: "Tappable__activatedOpacity--BK7v4",
    none: ''
};
/**
 * Определяем класс наведения
 */ export function activeClass(activeMode = DEFAULT_STATE_MODE) {
    const presetClass = stylesActivated[activeMode];
    return presetClass !== undefined ? presetClass : activeMode;
}

//# sourceMappingURL=state.js.map