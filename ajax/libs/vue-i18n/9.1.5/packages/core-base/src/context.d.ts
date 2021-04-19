import type { Path } from '@intlify/message-resolver';
import type { CompileOptions } from '@intlify/message-compiler';
import type { Locale, FallbackLocale, CoreMissingType, LinkedModifiers, PluralizationRules, MessageProcessor, MessageFunction, MessageType } from '@intlify/runtime';
import type { VueDevToolsEmitter } from '@intlify/vue-devtools';
import type { MetaInfo, NumberFormat, DateTimeFormat, DateTimeFormats as DateTimeFormatsType, NumberFormats as NumberFormatsType } from './types';
/** @VueI18nGeneral */
export declare type LocaleMessageValue<Message = string> = string | MessageFunction<Message> | LocaleMessageDictionary<Message> | LocaleMessageArray<Message>;
/** @VueI18nGeneral */
export declare type LocaleMessageDictionary<Message = string> = {
    [property: string]: LocaleMessageValue<Message>;
};
/** @VueI18nGeneral */
export interface LocaleMessageArray<Message = string> extends Array<LocaleMessageValue<Message>> {
}
/** @VueI18nGeneral */
export declare type LocaleMessages<Message = string> = Record<Locale, LocaleMessageDictionary<Message>>;
export declare type CoreMissingHandler<Message = string> = (context: CoreCommonContext<Message>, locale: Locale, key: Path, type: CoreMissingType, ...values: unknown[]) => string | void;
/** @VueI18nGeneral */
export declare type PostTranslationHandler<Message = string> = (translated: MessageType<Message>) => MessageType<Message>;
export declare type MessageCompiler<Message = string> = (source: string, options?: CompileOptions) => MessageFunction<Message>;
export interface CoreOptions<Message = string> {
    version?: string;
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormatsType;
    numberFormats?: NumberFormatsType;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: CoreMissingHandler<Message>;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackFormat?: boolean;
    unresolving?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    processor?: MessageProcessor<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
    messageCompiler?: MessageCompiler<Message>;
    onWarn?: (msg: string, err?: Error) => void;
}
export interface CoreInternalOptions {
    __datetimeFormatters?: Map<string, Intl.DateTimeFormat>;
    __numberFormatters?: Map<string, Intl.NumberFormat>;
    __v_emitter?: VueDevToolsEmitter;
    __meta?: MetaInfo;
}
export interface CoreCommonContext<Message = string> {
    cid: number;
    version: string;
    locale: Locale;
    fallbackLocale: FallbackLocale;
    missing: CoreMissingHandler<Message> | null;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackFormat: boolean;
    unresolving: boolean;
    onWarn(msg: string, err?: Error): void;
}
export interface CoreTranslationContext<Messages = {}, Message = string> extends CoreCommonContext<Message> {
    messages: Messages;
    modifiers: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    postTranslation: PostTranslationHandler<Message> | null;
    processor: MessageProcessor<Message> | null;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    messageCompiler: MessageCompiler<Message> | null;
}
export interface CoreDateTimeContext<DateTimeFormats = {}, Message = string> extends CoreCommonContext<Message> {
    datetimeFormats: DateTimeFormats;
}
export interface CoreNumberContext<NumberFormats = {}, Message = string> extends CoreCommonContext<Message> {
    numberFormats: NumberFormats;
}
export interface CoreContext<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = string> extends CoreTranslationContext<Messages, Message>, CoreDateTimeContext<DateTimeFormats, Message>, CoreNumberContext<NumberFormats, Message> {
}
export interface CoreInternalContext {
    __datetimeFormatters: Map<string, Intl.DateTimeFormat>;
    __numberFormatters: Map<string, Intl.NumberFormat>;
    __localeChainCache?: Map<Locale, Locale[]>;
    __v_emitter?: VueDevToolsEmitter;
    __meta: MetaInfo;
}
/**
 * Intlify core-base version
 * @internal
 */
export declare const VERSION: string;
export declare const NOT_REOSLVED = -1;
export declare const MISSING_RESOLVE_VALUE = "";
export declare function registerMessageCompiler<Message>(compiler: MessageCompiler<Message>): void;
export declare const setAdditionalMeta: (meta: MetaInfo | null) => void;
export declare const getAdditionalMeta: () => MetaInfo | null;
export declare function createCoreContext<Message = string, Options extends CoreOptions<Message> = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<Message>> = Record<keyof Options['messages'], LocaleMessageDictionary<Message>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat> = Record<keyof Options['numberFormats'], NumberFormat>>(options?: Options): CoreContext<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Message>;
/** @internal */
export declare function isTranslateFallbackWarn(fallback: boolean | RegExp, key: Path): boolean;
/** @internal */
export declare function isTranslateMissingWarn(missing: boolean | RegExp, key: Path): boolean;
/** @internal */
export declare function handleMissing<Message = string>(context: CoreCommonContext<Message>, key: Path, locale: Locale, missingWarn: boolean | RegExp, type: CoreMissingType): unknown;
/** @internal */
export declare function getLocaleChain<Message = string>(ctx: CoreCommonContext<Message>, fallback: FallbackLocale, start: Locale): Locale[];
/** @internal */
export declare function updateFallbackLocale<Message = string>(ctx: CoreCommonContext<Message>, locale: Locale, fallback: FallbackLocale): void;
//# sourceMappingURL=context.d.ts.map