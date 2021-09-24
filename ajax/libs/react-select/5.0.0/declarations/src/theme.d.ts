import { Theme } from './types';
export declare const colors: {
    primary: string;
    primary75: string;
    primary50: string;
    primary25: string;
    danger: string;
    dangerLight: string;
    neutral0: string;
    neutral5: string;
    neutral10: string;
    neutral20: string;
    neutral30: string;
    neutral40: string;
    neutral50: string;
    neutral60: string;
    neutral70: string;
    neutral80: string;
    neutral90: string;
};
export declare const spacing: {
    baseUnit: number;
    controlHeight: number;
    menuGutter: number;
};
export declare const defaultTheme: Theme;
export declare type ThemeConfig = Theme | ((theme: Theme) => Theme);
