export { BREAKPOINTS, MEDIA_QUERIES } from '../../shared/breakpoints';
/**
 * Public API.
 * Брейкпоинты на ширину.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */ export const ViewWidth = {
    SMALL_MOBILE: 1,
    MOBILE: 2,
    SMALL_TABLET: 3,
    TABLET: 4,
    DESKTOP: 5
};
/**
 * Public API.
 * Брейкпоинт на высоту.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */ export const ViewHeight = {
    EXTRA_SMALL: 1,
    SMALL: 2,
    MEDIUM: 3
};
/**
 * Public API.
 * Классы размеров. Заимствованы из гайдлайнов Apple.
 *
 * Ссылки
 * - {@link https://www.figma.com/file/2sQl2eaxsp7RDRdMOeneEC/%F0%9F%92%A0-VKUI-Common-Library-%5BBeta%5D?node-id=3220%3A0 | Figma VKUI – Адаптивность}
 * - {@link https://developer.apple.com/design/human-interface-guidelines/foundations/layout/ | Layout - Foundations - Human Interface Guidelines - Design}
 */ export const SizeType = {
    COMPACT: 'compact',
    REGULAR: 'regular'
};
export const VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = {
    [ViewWidth.SMALL_MOBILE]: 'smallMobileMinus',
    [ViewWidth.MOBILE]: 'mobile',
    [ViewWidth.SMALL_TABLET]: 'smallTablet',
    [ViewWidth.TABLET]: 'tablet',
    [ViewWidth.DESKTOP]: 'desktopPlus'
};

//# sourceMappingURL=constants.js.map