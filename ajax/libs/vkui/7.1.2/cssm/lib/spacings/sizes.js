import styles from "../../styles/spacings.module.css";
export const spacingSizeClassNames = {
    '2xs': styles['-spacing--2xs'],
    'xs': styles['-spacing--xs'],
    's': styles['-spacing--s'],
    'm': styles['-spacing--m'],
    'l': styles['-spacing--l'],
    'xl': styles['-spacing--xl'],
    '2xl': styles['-spacing--2xl'],
    '3xl': styles['-spacing--3xl'],
    '4xl': styles['-spacing--4xl']
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