import { MessageFunction } from '@intlify/core-base';
import type { ComponentInternalInstance, VNode, VNodeArrayChildren } from 'vue';
import type { WritableComputedRef, ComputedRef } from '@vue/reactivity';
import type { Path, LinkedModifiers, PluralizationRules, NamedValue, MessageFunctions, Locale, LocaleMessageValue, LocaleMessages, LocaleMessageDictionary, PostTranslationHandler, FallbackLocale, TranslateOptions, DateTimeOptions, NumberOptions, DateTimeFormats as DateTimeFormatsType, NumberFormats as NumberFormatsType, DateTimeFormat, NumberFormat } from '@intlify/core-base';
import type { VueDevToolsEmitter } from '@intlify/vue-devtools';
declare module '@vue/runtime-core' {
    interface VNode<HostNode = RendererNode, HostElement = RendererElement> {
        toString: () => string;
    }
}
export declare const DEVTOOLS_META = "__INTLIFY_META__";
export declare const TransrateVNodeSymbol: string | symbol;
export declare const DatetimePartsSymbol: string | symbol;
export declare const NumberPartsSymbol: string | symbol;
export declare const EnableEmitter: string | symbol;
export declare const DisableEmitter: string | symbol;
export declare const SetPluralRulesSymbol: string | symbol;
export declare const DevToolsMetaSymbol: string | symbol;
/** @VueI18nComposition */
export declare type VueMessageType = string | VNode;
/** @VueI18nComposition */
export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;
export declare type PreCompileHandler<Message = VueMessageType> = () => {
    messages: LocaleMessages<Message>;
    functions: MessageFunctions<Message>;
};
export interface CustomBlock<Message = VueMessageType> {
    locale: Locale;
    resource: LocaleMessages<Message> | LocaleMessageDictionary<Message>;
}
export declare type CustomBlocks<Message = VueMessageType> = Array<CustomBlock<Message>>;
/**
 * Composer Options
 *
 * @remarks
 * This is options to create composer.
 *
 * @VueI18nComposition
 */
export interface ComposerOptions<Message = VueMessageType> {
    /**
     * @remarks
     * The locale of localization.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     *
     * @defaultValue `'en-US'`
     */
    locale?: Locale;
    /**
     * @remarks
     * The locale of fallback localization.
     *
     * For more complex fallback definitions see fallback.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue The default `'en-US'` for the `locale` if it's not specified, or it's `locale` value
     */
    fallbackLocale?: FallbackLocale;
    /**
     * @remarks
     * Whether inheritance the root level locale to the component localization locale.
     *
     * If `false`, regardless of the root level locale, localize for each component locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     *
     * @defaultValue `true`
     */
    inheritLocale?: boolean;
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     *
     * @defaultValue `{}`
     */
    messages?: LocaleMessages<Message>;
    /**
     * @remarks
     * Allow use flat json messages or not
     *
     * @defaultValue `false`
     */
    flatJson?: boolean;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     *
     * @defaultValue `{}`
     */
    datetimeFormats?: DateTimeFormatsType;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     *
     * @defaultValue `{}`
     */
    numberFormats?: NumberFormatsType;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    modifiers?: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     *
     * @defaultValue `{}`
     */
    pluralRules?: PluralizationRules;
    /**
     * @remarks
     * A handler for localization missing.
     *
     * The handler gets called with the localization target locale, localization path key, the Vue instance and values.
     *
     * If missing handler is assigned, and occurred localization missing, it's not warned.
     *
     * @defaultValue `null`
     */
    missing?: MissingHandler;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * If `false`, suppress localization fail warnings.
     *
     * If you use regular expression, you can suppress localization fail warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    missingWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * If `false`, suppress fall back warnings.
     *
     * If you use regular expression, you can suppress fallback warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackWarn?: boolean | RegExp;
    /**
     * @remarks
     * In the component localization, whether to fallback to root level (global scope) localization when localization fails.
     *
     * If `false`, it's not fallback to root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackRoot?: boolean;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key.
     *
     * If `true`, skip writing templates for your "base" language; the keys are your templates.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `false`
     */
    fallbackFormat?: boolean;
    /**
     * @remarks
     * A handler for post processing of translation.
     *
     * The handler gets after being called with the `t`.
     *
     * This handler is useful if you want to filter on translated text such as space trimming.
     *
     * @defaultValue `null`
     */
    postTranslation?: PostTranslationHandler<Message>;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * See the warnHtmlMessage property.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     *
     * @defaultValue `'off'`
     */
    warnHtmlMessage?: boolean;
    /**
     * @remarks
     * If `escapeParameter` is configured as true then interpolation parameters are escaped before the message is translated.
     *
     * This is useful when translation output is used in `v-html` and the translation resource contains html markup (e.g. <b> around a user provided value).
     *
     * This usage pattern mostly occurs when passing precomputed text strings into UI components.
     *
     * The escape process involves replacing the following symbols with their respective HTML character entities: `<`, `>`, `"`, `'`.
     *
     * Setting `escapeParameter` as true should not break existing functionality but provides a safeguard against a subtle type of XSS attack vectors.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     *
     * @defaultValue `false`
     */
    escapeParameter?: boolean;
}
/**
 * @internal
 */
export interface ComposerInternalOptions<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    __i18n?: CustomBlocks<Message>;
    __i18nGlobal?: CustomBlocks<Message>;
    __root?: Composer<Messages, DateTimeFormats, NumberFormats, Message>;
}
/**
 * Composer interfaces
 *
 * @remarks
 * This is the interface for being used for Vue 3 Composition API.
 *
 * @VueI18nComposition
 */
export interface Composer<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    /**
     * @remarks
     * Instance ID.
     */
    id: number;
    /**
     * @remarks
     * The current locale this Composer instance is using.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    locale: WritableComputedRef<Locale>;
    /**
     * @remarks
     * The current fallback locales this Composer instance is using.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackLocale: WritableComputedRef<FallbackLocale>;
    /**
     * @remarks
     * Whether inherit the root level locale to the component localization locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     */
    inheritLocale: boolean;
    /**
     * @remarks
     * The list of available locales in `messages` in lexical order.
     */
    readonly availableLocales: Locale[];
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     */
    readonly messages: ComputedRef<Messages>;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     */
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     */
    readonly numberFormats: ComputedRef<NumberFormats>;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    readonly modifiers: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     */
    readonly pluralRules: PluralizationRules;
    /**
     * @remarks
     * Whether this composer instance is global or not
     */
    readonly isGlobal: boolean;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    missingWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress fall back warnings when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether to fall back to root level (global scope) localization when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackRoot: boolean;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackFormat: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * If you set `false`, will check the locale messages on the Composer instance.
     *
     * If you are specified `true`, a warning will be output at console.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     */
    warnHtmlMessage: boolean;
    /**
     * @remarks
     * Whether interpolation parameters are escaped before the message is translated.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     */
    escapeParameter: boolean;
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If not, then it’s translated with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    t(key: Path | number): string;
    /**
     * Locale message translation for plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, return a pluralized translation message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    t(key: Path | number, plural: number, options?: TranslateOptions): string;
    /**
     * Locale message translation for missing default message
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, if no translation was found, return a default message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    t(key: Path | number, defaultMsg: string, options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], plural: number): string;
    /**
     * Locale message translation for list interpolations and missing default message
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], defaultMsg: string): string;
    /**
     * Locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, options?: TranslateOptions): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, plural: number): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, defaultMsg: string): string;
    /** @internal */
    t(...args: unknown[]): string;
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If not, then it’s translated with global scope locale messages.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    rt(message: MessageFunction<Message> | Message): string;
    /**
     * Resolve locale message translation for plurals
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    rt(message: MessageFunction<Message> | Message, plural: number, options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param list - A values of list interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    rt(message: MessageFunction<Message> | Message, list: unknown[], options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param named - A values of named interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    rt(message: MessageFunction<Message> | Message, named: NamedValue, options?: TranslateOptions): string;
    /** @internal */
    rt(...args: unknown[]): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Datetime formatting](../guide/essentials/datetime)
     */
    d(value: number | Date | string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats at target locale
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string, locale: Locale): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link DateTimeOptions}.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param options - Additional {@link DateTimeOptions | options} for datetime formatting
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, options: DateTimeOptions): string;
    /** @internal */
    d(...args: unknown[]): string;
    /**
     * Number Formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope number formats.
     *
     * @param value - A number value
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Number formatting](../guide/essentials/number)
     */
    n(value: number): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns Formatted value
     */
    n(value: number, key: string): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats at target locale.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    n(value: number, key: string, locale: Locale): string;
    /**
     *
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link NumberOptions}.
     *
     * @param value - A number value
     * @param options - Additional {@link NumberOptions | options} for number formatting
     *
     * @returns Formatted value
     */
    n(value: number, options: NumberOptions): string;
    /** @internal */
    n(...args: unknown[]): string;
    /**
     * Translation locale message exist
     *
     * @remarks
     * whether do exist locale message on Composer instance [messages](composition#messages).
     *
     * If you specified `locale`, check the locale messages of `locale`.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope
     *
     * @returns If found locale message, `true`, else `false`
     */
    te(key: Path, locale?: Locale): boolean;
    /**
     * Locale messages getter
     *
     * @remarks
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * Based on the current `locale`, locale messages will be returned from Composer instance messages.
     *
     * If you change the `locale`, the locale messages returned will also correspond to the locale.
     *
     * If there are no locale messages for the given `key` in the composer instance messages, they will be returned with [fallbacking](../guide/essentials/fallback).
     *
     * @VueI18nWarning
     * You need to use `rt` for the locale message returned by `tm`. see the [rt](composition#rt-message) details.
     *
     * @example
     * template block:
     * ```html
     * <div class="container">
     *   <template v-for="content in tm('contents')">
     *     <h2>{{ rt(content.title) }}</h2>
     *     <p v-for="paragraph in content.paragraphs">
     *      {{ rt(paragraph) }}
     *     </p>
     *   </template>
     * </div>
     * ```
     * script block:
     * ```js
     * import { defineComponent } from 'vue
     * import { useI18n } from 'vue-i18n'
     *
     * export default defineComponent({
     *   setup() {
     *     const { rt, tm } = useI18n({
     *       messages: {
     *         en: {
     *           contents: [
     *             {
     *               title: 'Title1',
     *               // ...
     *               paragraphs: [
     *                 // ...
     *               ]
     *             }
     *           ]
     *         }
     *       }
     *       // ...
     *     })
     *     // ...
     *     return { ... , rt, tm }
     *   }
     * })
     * ```
     *
     * @param key - A target locale message key
     *
     * @return Locale messages
     */
    tm(key: Path): LocaleMessageValue<Message> | {};
    /**
     * Get locale message
     *
     * @remarks
     * get locale message from Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     *
     * @returns Locale messages
     */
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<Message>;
    /**
     * Set locale message
     *
     * @remarks
     * Set locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Merge locale message
     *
     * @remarks
     * Merge locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Get datetime format
     *
     * @remarks
     * get datetime format from Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     *
     * @returns Datetime format
     */
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    /**
     * Set datetime format
     *
     * @remarks
     * Set datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Merge datetime format
     *
     * @remarks
     * Merge datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    /**
     * Get number format
     *
     * @remarks
     * get number format from Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     *
     * @returns Number format
     */
    getNumberFormat(locale: Locale): NumberFormat;
    /**
     * Set number format
     *
     * @remarks
     * Set number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    setNumberFormat(locale: Locale, format: NumberFormat): void;
    /**
     * Merge number format
     *
     * @remarks
     * Merge number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    mergeNumberFormat(locale: Locale, format: NumberFormat): void;
    /**
     * Get post translation handler
     *
     * @returns {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    getPostTranslationHandler(): PostTranslationHandler<Message> | null;
    /**
     * Set post translation handler
     *
     * @param handler - A {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    setPostTranslationHandler(handler: PostTranslationHandler<Message> | null): void;
    /**
     * Get missing handler
     *
     * @returns {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    getMissingHandler(): MissingHandler | null;
    /**
     * Set missing handler
     *
     * @param handler - A {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    setMissingHandler(handler: MissingHandler | null): void;
}
/**
 * @internal
 */
export interface ComposerInternal {
    __transrateVNode(...args: unknown[]): VNodeArrayChildren;
    __numberParts(...args: unknown[]): string | Intl.NumberFormatPart[];
    __datetimeParts(...args: unknown[]): string | Intl.DateTimeFormatPart[];
    __enableEmitter?: (emitter: VueDevToolsEmitter) => void;
    __disableEmitter?: () => void;
    __setPluralRules(rules: PluralizationRules): void;
}
declare type GetLocaleMessagesOptions<Message = VueMessageType> = {
    messages?: LocaleMessages<Message>;
    __i18n?: CustomBlocks<Message>;
    flatJson?: boolean;
};
export declare function getLocaleMessages<Message = VueMessageType>(locale: Locale, options: GetLocaleMessagesOptions<Message>): LocaleMessages<Message>;
/**
 * Create composer interface factory
 *
 * @internal
 */
export declare function createComposer<Message = VueMessageType, Options extends ComposerOptions<Message> = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<Message>> = Record<keyof Options['messages'], LocaleMessageDictionary<Message>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat> = Record<keyof Options['numberFormats'], NumberFormat>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Message>;
export {};
//# sourceMappingURL=composer.d.ts.map