import type { Locale } from '@intlify/runtime';
import type { NumberFormat } from './types';
import type { CoreNumberContext } from './context';
/**
 *  # number
 *
 *  ## usages
 *    // for example `context.numberFormats` below
 *    'en-US': {
 *      'currency': {
 *        style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
 *      }
 *    },
 *    'ja-JP: { ... }
 *
 *    // value only
 *    number(context, value)
 *
 *    // key argument
 *    number(context, value, 'currency')
 *
 *    // key & locale argument
 *    number(context, value, 'currency', 'ja-JP')
 *
 *    // object sytle argument
 *    number(context, value, { key: 'currency', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted number in parts
 *    number(context, value, { key: 'currenty', part: true })
 *
 *    // orverride context.numberFormats[locale] options with functino options
 *    number(cnotext, value, 'currency', { year: '2-digit' })
 *    number(cnotext, value, 'currency', 'ja-JP', { year: '2-digit' })
 *    number(context, value, { key: 'currenty', part: true }, { year: '2-digit'})
 */
/**
 * Number Options
 *
 * @remarks
 * Options for Number formatting API
 *
 * @VueI18nGeneral
 */
export interface NumberOptions {
    /**
     * @remarks
     * The target format key
     */
    key?: string;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do resolve on format keys when your language lacks a formatting for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether to use [Intel.NumberFormat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
     */
    part?: boolean;
}
export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number): string | number | Intl.NumberFormatPart[];
export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, key: string): string | number | Intl.NumberFormatPart[];
export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, key: string, locale: Locale): string | number | Intl.NumberFormatPart[];
export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, options: NumberOptions): string | number | Intl.NumberFormatPart[];
export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, ...args: unknown[]): string | number | Intl.NumberFormatPart[];
/** @internal */
export declare function parseNumberArgs(...args: unknown[]): [string, number, NumberOptions, Intl.NumberFormatOptions];
/** @internal */
export declare function clearNumberFormat<NumberFormats, Message = string>(ctx: CoreNumberContext<NumberFormats, Message>, locale: Locale, format: NumberFormat): void;
//# sourceMappingURL=number.d.ts.map