export const columnGapClassNames = {
    '2xs': "vkui-column-gap--2xs",
    'xs': "vkui-column-gap--xs",
    's': "vkui-column-gap--s",
    'm': "vkui-column-gap--m",
    'l': "vkui-column-gap--l",
    'xl': "vkui-column-gap--xl",
    '2xl': "vkui-column-gap--2xl",
    '3xl': "vkui-column-gap--3xl",
    '4xl': "vkui-column-gap--4xl"
};
export const rowGapClassNames = {
    '2xs': "vkui-row-gap--2xs",
    'xs': "vkui-row-gap--xs",
    's': "vkui-row-gap--s",
    'm': "vkui-row-gap--m",
    'l': "vkui-row-gap--l",
    'xl': "vkui-row-gap--xl",
    '2xl': "vkui-row-gap--2xl",
    '3xl': "vkui-row-gap--3xl",
    '4xl': "vkui-row-gap--4xl"
};
/**
 * Возвращает массив отступов [columnGap, rowGap]
 */ export function calculateGap(gap) {
    if (!gap) {
        return [
            undefined,
            undefined
        ];
    }
    if (typeof gap === 'number' || typeof gap === 'string') {
        return [
            gap,
            gap
        ];
    }
    return gap;
}

//# sourceMappingURL=gaps.js.map