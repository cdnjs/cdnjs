export declare enum CASE_TYPES {
    UPPERCASE = "upper",
    LOWERCASE = "lower"
}
export declare const cx: (...params: Array<any>) => string;
export declare const getRandomId: () => string;
export declare const getAlphanumeric: (v: string) => string;
export declare const getAlpha: (v: string) => string;
export declare const getNumeric: (v: string) => string;
export declare const getCased: (v: string, type: string) => string;
export declare const getClassName: (className: string) => string;
