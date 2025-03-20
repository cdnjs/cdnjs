export const columnGapClassNames = {
    '2xs': "vkuistyles__-column-gap--2xs",
    'xs': "vkuistyles__-column-gap--xs",
    's': "vkuistyles__-column-gap--s",
    'm': "vkuistyles__-column-gap--m",
    'l': "vkuistyles__-column-gap--l",
    'xl': "vkuistyles__-column-gap--xl",
    '2xl': "vkuistyles__-column-gap--2xl",
    '3xl': "vkuistyles__-column-gap--3xl",
    '4xl': "vkuistyles__-column-gap--4xl"
};
export const rowGapClassNames = {
    '2xs': "vkuistyles__-row-gap--2xs",
    'xs': "vkuistyles__-row-gap--xs",
    's': "vkuistyles__-row-gap--s",
    'm': "vkuistyles__-row-gap--m",
    'l': "vkuistyles__-row-gap--l",
    'xl': "vkuistyles__-row-gap--xl",
    '2xl': "vkuistyles__-row-gap--2xl",
    '3xl': "vkuistyles__-row-gap--3xl",
    '4xl': "vkuistyles__-row-gap--4xl"
};
/**
 * Возвращает массив отступов [rowGap, columnGap]
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