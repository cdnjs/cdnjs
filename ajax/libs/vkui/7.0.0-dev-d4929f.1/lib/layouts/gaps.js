export const columnGapClassNames = {
    '2xs': "styles__-column-gap--2xs--m5QEQ",
    'xs': "styles__-column-gap--xs--cfp-y",
    's': "styles__-column-gap--s--O8-Dr",
    'm': "styles__-column-gap--m--bap4G",
    'l': "styles__-column-gap--l--ATKvx",
    'xl': "styles__-column-gap--xl--UUOOH",
    '2xl': "styles__-column-gap--2xl--0pCgp",
    '3xl': "styles__-column-gap--3xl--x4fNR",
    '4xl': "styles__-column-gap--4xl--wWHN2"
};
export const rowGapClassNames = {
    '2xs': "styles__-row-gap--2xs--lLnq3",
    'xs': "styles__-row-gap--xs--rBJ8-",
    's': "styles__-row-gap--s--Yx-bb",
    'm': "styles__-row-gap--m--z0rGR",
    'l': "styles__-row-gap--l--m-AGh",
    'xl': "styles__-row-gap--xl--rK5MJ",
    '2xl': "styles__-row-gap--2xl--igSWN",
    '3xl': "styles__-row-gap--3xl--CLcZU",
    '4xl': "styles__-row-gap--4xl--D7PtA"
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