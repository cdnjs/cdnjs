import type { Locale } from '@intlify/runtime';
import type { DateTimeFormat } from './types';
import type { CoreDateTimeContext } from './context';
/**
 *  # datetime
 *
 *  ## usages:
 *    // for example `context.datetimeFormats` below
 *    'en-US': {
 *      short: {
 *        year: 'numeric', month: '2-digit', day: '2-digit',
 *        hour: '2-digit', minute: '2-digit'
 *      }
 *    },
 *    'ja-JP': { ... }
 *
 *    // datetimeable value only
 *    datetime(context, value)
 *
 *    // key argument
 *    datetime(context, value, 'short')
 *
 *    // key & locale argument
 *    datetime(context, value, 'short', 'ja-JP')
 *
 *    // object sytle argument
 *    datetime(context, value, { key: 'short', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted datetime in parts
 *    datetime(context, value, { key: 'short', part: true })
 *
 *    // orverride context.datetimeFormats[locale] options with functino options
 *    datetime(cnotext, value, 'short', { currency: 'EUR' })
 *    datetime(cnotext, value, 'short', 'ja-JP', { currency: 'EUR' })
 *    datetime(context, value, { key: 'short', part: true }, { currency: 'EUR'})
 */
/**
 * DateTime options
 *
 * @remarks
 * Options for Datetime formatting API
 *
 * @VueI18nGeneral
 */
export interface DateTimeOptions {
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
     * Whether to use [Intel.DateTimeFormat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
     */
    part?: boolean;
}
export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date): string | number | Intl.DateTimeFormatPart[];
export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string): string | number | Intl.DateTimeFormatPart[];
export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string, locale: Locale): string | number | Intl.DateTimeFormatPart[];
export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, options: DateTimeOptions): string | number | Intl.DateTimeFormatPart[];
export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, ...args: unknown[]): string | number | Intl.DateTimeFormatPart[];
/** @internal */
export declare function parseDateTimeArgs(...args: unknown[]): [string, number | Date, DateTimeOptions, Intl.DateTimeFormatOptions];
/** @internal */
export declare function clearDateTimeFormat<DateTimeFormats = {}, Message = string>(ctx: CoreDateTimeContext<DateTimeFormats, Message>, locale: Locale, format: DateTimeFormat): void;
//# sourceMappingURL=datetime.d.ts.map