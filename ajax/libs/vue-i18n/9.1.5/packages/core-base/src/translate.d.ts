import type { Path } from '@intlify/message-resolver';
import type { Locale, NamedValue, MessageFunction, MessageType } from '@intlify/runtime';
import type { CoreTranslationContext } from './context';
export declare const isMessageFunction: <T>(val: unknown) => val is MessageFunction<T>;
/**
 *  # translate
 *
 *  ## usages:
 *    // for example, locale messages key
 *    { 'foo.bar': 'hi {0} !' or 'hi {name} !' }
 *
 *    // no argument, context & path only
 *    translate(context, 'foo.bar')
 *
 *    // list argument
 *    translate(context, 'foo.bar', ['kazupon'])
 *
 *    // named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' })
 *
 *    // plural choice number
 *    translate(context, 'foo.bar', 2)
 *
 *    // plural choice number with name argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 2)
 *
 *    // default message argument
 *    translate(context, 'foo.bar', 'this is default message')
 *
 *    // default message with named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 'Hello {name} !')
 *
 *    // use key as default message
 *    translate(context, 'hi {0} !', ['kazupon'], { default: true })
 *
 *    // locale option, override context.locale
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { locale: 'ja' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { fallbackWarn: false })
 *
 *    // escape parameter option, override context.escapeParameter
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { escapeParameter: true })
 */
/**
 * Translate Options
 *
 * @remarks
 * Options for Translation API
 *
 * @VueI18nGeneral
 */
export interface TranslateOptions {
    /**
     * @remarks
     * List interpolation
     */
    list?: unknown[];
    /**
     * @remarks
     * Named interpolation
     */
    named?: NamedValue;
    /**
     * @remarks
     * Plulralzation choice number
     */
    plural?: number;
    /**
     * @remarks
     * Default message when is occurred translation missing
     */
    default?: string | boolean;
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
     * Whether do template interpolation on translation keys when your language lacks a translation for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether do escape parameter for list or named interpolation values
     */
    escapeParameter?: boolean;
    /**
     * @remarks
     * Whether the message has been resolved
     */
    resolvedMessage?: boolean;
}
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, plural: number): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, plural: number, options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, plural: number, options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, defaultMsg: string): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, defaultMsg: string, options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[]): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], plural: number): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], defaultMsg: string): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, list: unknown[], options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, plural: number): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, defaultMsg: string): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;
export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, ...args: unknown[]): MessageType<Message> | number;
/** @internal */
export declare function parseTranslateArgs<Message = string>(...args: unknown[]): [Path | MessageFunction<Message>, TranslateOptions];
//# sourceMappingURL=translate.d.ts.map