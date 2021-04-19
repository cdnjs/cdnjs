/**
 *  datetime
 */
export declare type DateTimeHumanReadable = 'long' | 'short' | 'narrow';
export declare type DateTimeDigital = 'numeric' | '2-digit';
export declare type LocaleMatcher = 'lookup' | 'best fit';
export declare type FormatMatcher = 'basic' | 'best fit';
export interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}
export declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;
export declare type DateTimeFormat = {
    [key: string]: DateTimeFormatOptions;
};
export declare type DateTimeFormats = {
    [locale: string]: DateTimeFormat;
};
/**
 *  number
 */
export declare type CurrencyDisplay = 'symbol' | 'code' | 'name';
export interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}
export interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}
export declare type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;
export declare type NumberFormat = {
    [key: string]: NumberFormatOptions;
};
export declare type NumberFormats = {
    [locale: string]: NumberFormat;
};
export declare type FormattedNumberPartType = 'currency' | 'decimal' | 'fraction' | 'group' | 'infinity' | 'integer' | 'literal' | 'minusSign' | 'nan' | 'plusSign' | 'percentSign';
export declare type FormattedNumberPart = {
    type: FormattedNumberPartType;
    value: string;
};
export declare type NumberFormatToPartsResult = {
    [index: number]: FormattedNumberPart;
};
export interface MetaInfo {
    [field: string]: unknown;
}
//# sourceMappingURL=types.d.ts.map