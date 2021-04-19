import type { RenderFunction, SetupContext } from 'vue';
import type { NumberOptions, DateTimeOptions } from '@intlify/core-base';
import type { BaseFormatProps } from './base';
/**
 * Formattable Props
 *
 * @remarks
 * The props used in DatetimeFormat, or NumberFormat component
 *
 * @VueI18nComponent
 */
export interface FormattableProps<Value, Format> extends BaseFormatProps {
    /**
     * @remarks
     * The value specified for the target component
     */
    value: Value;
    /**
     * @remarks
     * The format to use in the target component.
     *
     * Specify the format key string or the format as defined by the Intl API in ECMA 402.
     */
    format?: string | Format;
}
declare type FormatOptions = NumberOptions | DateTimeOptions;
declare type FormatPartReturn = Intl.NumberFormatPart | Intl.DateTimeFormatPart;
declare type FormatOverrideOptions = Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
export declare function renderFormatter<Props extends FormattableProps<Value, Format>, Value, Format extends FormatOverrideOptions, Arg extends FormatOptions, Return extends FormatPartReturn>(props: Props, context: SetupContext, slotKeys: string[], partFormatter: (...args: unknown[]) => string | Return[]): RenderFunction;
export {};
//# sourceMappingURL=formatRenderer.d.ts.map