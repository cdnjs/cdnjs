export const spacingSizeClassNames = {
    '2xs': "vkuistyles__-spacing--2xs",
    'xs': "vkuistyles__-spacing--xs",
    's': "vkuistyles__-spacing--s",
    'm': "vkuistyles__-spacing--m",
    'l': "vkuistyles__-spacing--l",
    'xl': "vkuistyles__-spacing--xl",
    '2xl': "vkuistyles__-spacing--2xl",
    '3xl': "vkuistyles__-spacing--3xl",
    '4xl': "vkuistyles__-spacing--4xl"
};
export function resolveSpacingSize(cssVariable, size) {
    if (typeof size === 'string') {
        if (size.startsWith('--')) {
            return [
                undefined,
                {
                    [cssVariable]: `var(${size})`
                }
            ];
        } else {
            return [
                spacingSizeClassNames[size],
                undefined
            ];
        }
    }
    return [
        undefined,
        typeof size === 'number' ? {
            [cssVariable]: `${size}px`
        } : undefined
    ];
}

//# sourceMappingURL=sizes.js.map