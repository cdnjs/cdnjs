import { BaseFormatProps } from '@intlify/vue-i18n-core';
import { CompileError } from '@intlify/core-base';
import { ComponentI18nScope } from '@intlify/vue-i18n-core';
import { Composer } from '@intlify/vue-i18n-core';
import { ComposerAdditionalOptions } from '@intlify/vue-i18n-core';
import { ComposerCustom } from '@intlify/vue-i18n-core';
import { ComposerDateTimeFormatting } from '@intlify/vue-i18n-core';
import { ComposerExtender } from '@intlify/vue-i18n-core';
import { ComposerNumberFormatting } from '@intlify/vue-i18n-core';
import { ComposerOptions } from '@intlify/vue-i18n-core';
import { ComposerResolveLocaleMessageTranslation } from '@intlify/vue-i18n-core';
import { ComposerTranslation } from '@intlify/vue-i18n-core';
import { createI18n } from '@intlify/vue-i18n-core';
import { CustomBlock } from '@intlify/vue-i18n-core';
import { CustomBlocks } from '@intlify/vue-i18n-core';
import { DatetimeFormat } from '@intlify/vue-i18n-core';
import { DatetimeFormatProps } from '@intlify/vue-i18n-core';
import { DateTimeOptions } from '@intlify/core-base';
import { DefaultDateTimeFormatSchema } from '@intlify/vue-i18n-core';
import { DefaultLocaleMessageSchema } from '@intlify/vue-i18n-core';
import { DefaultNumberFormatSchema } from '@intlify/vue-i18n-core';
import { DefineDateTimeFormat } from '@intlify/vue-i18n-core';
import { DefineLocaleMessage } from '@intlify/vue-i18n-core';
import { DefineNumberFormat } from '@intlify/vue-i18n-core';
import { Disposer } from '@intlify/vue-i18n-core';
import { ExportedGlobalComposer } from '@intlify/vue-i18n-core';
import { FallbackLocale } from '@intlify/core-base';
import { FormattableProps } from '@intlify/vue-i18n-core';
import { GeneratedTypeConfig } from '@intlify/core-base';
import { I18n } from '@intlify/vue-i18n-core';
import { I18nAdditionalOptions } from '@intlify/vue-i18n-core';
import { I18nD } from '@intlify/vue-i18n-core';
import { I18nInjectionKey } from '@intlify/vue-i18n-core';
import { I18nN } from '@intlify/vue-i18n-core';
import { I18nOptions } from '@intlify/vue-i18n-core';
import { I18nPluginOptions } from '@intlify/vue-i18n-core';
import { I18nScope } from '@intlify/vue-i18n-core';
import { I18nT } from '@intlify/vue-i18n-core';
import { DateTimeFormat as IntlDateTimeFormat } from '@intlify/core-base';
import { DateTimeFormats as IntlDateTimeFormats } from '@intlify/core-base';
import { FormatMatcher as IntlFormatMatcher } from '@intlify/core-base';
import { LocaleMatcher as IntlLocaleMatcher } from '@intlify/core-base';
import { NumberFormat as IntlNumberFormat } from '@intlify/core-base';
import { NumberFormats as IntlNumberFormats } from '@intlify/core-base';
import { IsEmptyObject } from '@intlify/core-base';
import { IsNever } from '@intlify/core-base';
import { LinkedModifiers } from '@intlify/core-base';
import { Locale } from '@intlify/core-base';
import { LocaleMessageDictionary } from '@intlify/core-base';
import { LocaleMessages } from '@intlify/core-base';
import { LocaleMessageType } from '@intlify/core-base';
import { LocaleMessageValue } from '@intlify/core-base';
import { MessageCompiler } from '@intlify/core-base';
import { MessageCompilerContext } from '@intlify/core-base';
import { MessageContext } from '@intlify/core-base';
import { MessageFunction } from '@intlify/core-base';
import { MessageFunctions } from '@intlify/core-base';
import { MessageResolver } from '@intlify/core-base';
import { MissingHandler } from '@intlify/vue-i18n-core';
import { NamedValue } from '@intlify/core-base';
import { NumberFormat } from '@intlify/vue-i18n-core';
import { NumberFormatProps } from '@intlify/vue-i18n-core';
import { NumberOptions } from '@intlify/core-base';
import { Path } from '@intlify/core-base';
import { PathValue } from '@intlify/core-base';
import { PickupFormatPathKeys } from '@intlify/core-base';
import { PickupKeys } from '@intlify/core-base';
import { PickupPaths } from '@intlify/core-base';
import { PluralizationRule } from '@intlify/core-base';
import { PostTranslationHandler } from '@intlify/core-base';
import { RemovedIndexResources } from '@intlify/core-base';
import { TranslateOptions } from '@intlify/core-base';
import { Translation } from '@intlify/vue-i18n-core';
import { TranslationProps } from '@intlify/vue-i18n-core';
import { useI18n } from '@intlify/vue-i18n-core';
import { UseI18nOptions } from '@intlify/vue-i18n-core';
import { VERSION } from '@intlify/vue-i18n-core';
import { VueI18nInstance } from '@intlify/vue-i18n-core';
import { VueMessageType } from '@intlify/vue-i18n-core';
export { BaseFormatProps }
export { CompileError }
export { ComponentI18nScope }
export { Composer }
export { ComposerAdditionalOptions }
export { ComposerCustom }
export { ComposerDateTimeFormatting }
export { ComposerExtender }
export { ComposerNumberFormatting }
export { ComposerOptions }
export { ComposerResolveLocaleMessageTranslation }
export { ComposerTranslation }
export { createI18n }
export { CustomBlock }
export { CustomBlocks }
export { DatetimeFormat }
export { DatetimeFormatProps }
export { DateTimeOptions }
export { DefaultDateTimeFormatSchema }
export { DefaultLocaleMessageSchema }
export { DefaultNumberFormatSchema }
export { DefineDateTimeFormat }
export { DefineLocaleMessage }
export { DefineNumberFormat }
export { Disposer }
export { ExportedGlobalComposer }
export { FallbackLocale }
export { FormattableProps }
export { GeneratedTypeConfig }
export { I18n }
export { I18nAdditionalOptions }
export { I18nD }
export { I18nInjectionKey }
export { I18nN }
export { I18nOptions }
export { I18nPluginOptions }
export { I18nScope }
export { I18nT }
export { IntlDateTimeFormat }
export { IntlDateTimeFormats }
export { IntlFormatMatcher }
export { IntlLocaleMatcher }
export { IntlNumberFormat }
export { IntlNumberFormats }
export { IsEmptyObject }
export { IsNever }
export { LinkedModifiers }
export { Locale }
export { LocaleMessageDictionary }
export { LocaleMessages }
export { LocaleMessageType }
export { LocaleMessageValue }
export { MessageCompiler }
export { MessageCompilerContext }
export { MessageContext }
export { MessageFunction }
export { MessageFunctions }
export { MessageResolver }
export { MissingHandler }
export { NamedValue }
export { NumberFormat }
export { NumberFormatProps }
export { NumberOptions }
export { Path }
export { PathValue }
export { PickupFormatPathKeys }
export { PickupKeys }
export { PickupPaths }
export { PluralizationRule }
export { PostTranslationHandler }
export { RemovedIndexResources }
export { TranslateOptions }
export { Translation }
export { TranslationProps }
export { useI18n }
export { UseI18nOptions }
export { VERSION }
export { VueI18nInstance }
export { VueMessageType }

export { }


import type { JsonPaths } from '@intlify/core-base'

type IsPart<O> = O extends { part: infer P } ? P : false

declare module 'vue' {
  /**
   * Component Custom Options for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomOptions {
    /**
     * For custom blocks options
     * @internal
     */
    __i18n?: CustomBlocks
    /**
     * For devtools
     * @internal
     */
    __INTLIFY_META__?: string
  }

  /**
   * Component Custom Properties for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomProperties {
    /**
     * Exported Global Composer instance
     *
     * @remarks
     * You can get the {@link ExportedGlobalComposer | exported composer instance} which are exported from global {@link Composer | composer instance} created with {@link createI18n}
     * You can get the exported composer instance in {@link I18nMode | Composition API mode}
     * The locales, locale messages, and other resources managed by the instance referenced by this property are valid as global scope.
     * If the `i18n` component custom option is not specified, it's the same as the VueI18n instance that can be referenced by the i18n instance {@link I18n.global | global} property.
     */
    $i18n: ExportedGlobalComposer
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Composition API mode}, the `$t` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#t | `Composer#t` }.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      plural: number
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      plural: number,
      options: TranslateOptions
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      defaultMsg: string
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      defaultMsg: string,
      options: TranslateOptions
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      list: unknown[]
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      list: unknown[],
      plural: number
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      list: unknown[],
      defaultMsg: string
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      list: unknown[],
      options: TranslateOptions
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      named: NamedValue
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      named: NamedValue,
      plural: number
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      named: NamedValue,
      defaultMsg: string
    ): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys | number,
      named: NamedValue,
      options: TranslateOptions
    ): string
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Composition API mode}, the `$rt` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#rt | `Composer#rt` }.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     *
     * @returns translated message
     */
    $rt(message: MessageFunction<VueMessageType> | VueMessageType): string
    /**
     * Resolve locale message translation for plurals
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      plural: number,
      options?: TranslateOptions
    ): string
    /**
     * Resolve locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param list - A values of list interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      list: unknown[],
      options?: TranslateOptions
    ): string
    /**
     * Resolve locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param named - A values of named interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      named: NamedValue,
      options?: TranslateOptions
    ): string
    /**
     * Translation message exist
     *
     * @remarks
     * About that details, see {@link VueI18n#te | `VueI18n#te` } or {@link Composer#te | `Composer#te`}.
     *
     * @param key - A target locale message key
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns If found locale message, `true`, else `false`, Note that `false` is returned even if the value present in the key is not translatable.
     */
    $te<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys,
      locale?: Locale
    ): boolean
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Composition API mode}, the `$d` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#d | `Composer#d` }.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date | string): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns formatted value
     */
    $d<
      Value extends number | Date | string = number,
      Key extends string = string,
      DefinedDateTimeFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedDateTimeFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedDateTimeFormat]: DefinedDateTimeFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: Value,
      key: Key | ResourceKeys
    ): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param options - An {@link DateTimeOptions | options}
     *
     * @returns formatted value
     */
    $d<
      Value extends number | Date | string = number,
      Key extends string = string,
      DefinedDateTimeFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedDateTimeFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedDateTimeFormat]: DefinedDateTimeFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: Value,
      options: DateTimeOptions<Key | ResourceKeys>
    ): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d<
      Value extends number | Date | string = number,
      Key extends string = string,
      DefinedDateTimeFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedDateTimeFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedDateTimeFormat]: DefinedDateTimeFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: Value,
      key: Key | ResourceKeys,
      locale: Locale
    ): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param options - An {@link DateTimeOptions | options}
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d<
      Value extends number | Date = number,
      Key extends string = string,
      DefinedDateTimeFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedDateTimeFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedDateTimeFormat]: DefinedDateTimeFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never,
      OptionsType = DateTimeOptions<Key | ResourceKeys>
    >(
      value: Value,
      options: OptionsType,
      locale: Locale
    ): IsPart<OptionsType> extends true ? Intl.DateTimeFormatPart[] : string
    /**
     * Number formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Composition API mode}, the `$n` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance,  and it work on **global scope**. About that details, see {@link Composer#n | `Composer.n` }.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns formatted value
     */
    $n<
      Key extends string = string,
      DefinedNumberFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedNumberFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedNumberFormat]: DefinedNumberFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: number,
      key: Key | ResourceKeys
    ): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param options - An options, see the {@link NumberOptions}
     *
     * @returns formatted value
     */
    $n<
      Key extends string = string,
      DefinedNumberFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedNumberFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedNumberFormat]: DefinedNumberFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never,
      OptionsType = NumberOptions<Key | ResourceKeys>
    >(
      value: number,
      options: OptionsType
    ): IsPart<OptionsType> extends true ? Intl.NumberFormatPart[] : string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n<
      Key extends string = string,
      DefinedNumberFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedNumberFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedNumberFormat]: DefinedNumberFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: number,
      key: Key | ResourceKeys,
      locale: Locale
    ): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param options - An options, see the {@link NumberOptions}
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n<
      Key extends string = string,
      OptionsType = NumberOptions<Key | ResourceKeys>,
      DefinedNumberFormat extends
        RemovedIndexResources<DefineDateTimeFormat> = RemovedIndexResources<DefineDateTimeFormat>,
      Keys = IsEmptyObject<DefinedNumberFormat> extends false
        ? PickupFormatPathKeys<{
            [K in keyof DefinedNumberFormat]: DefinedNumberFormat[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      value: number,
      options: OptionsType,
      locale: Locale
    ): IsPart<OptionsType> extends true ? Intl.NumberFormatPart[] : string

    /**
     * Locale messages getter
     *
     * @remarks
     * In {@link I18nMode | Composition API mode}, the `$tm` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#tm | `Composer.tm` }.
     * Based on the current `locale`, locale messages will be returned from Composer instance messages.
     * If you change the `locale`, the locale messages returned will also correspond to the locale.
     * If there are no locale messages for the given `key` in the composer instance messages, they will be returned with fallbacking.
     *
     * @param key - A target locale message key
     *
     * @returns locale messages
     */
    $tm<
      Key extends string,
      DefinedLocaleMessage extends
        RemovedIndexResources<DefineLocaleMessage> = RemovedIndexResources<DefineLocaleMessage>,
      Keys = IsEmptyObject<DefinedLocaleMessage> extends false
        ? JsonPaths<{
            [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
          }>
        : never,
      ResourceKeys extends Keys = IsNever<Keys> extends false ? Keys : never
    >(
      key: Key | ResourceKeys
    ): LocaleMessageValue<VueMessageType> | {}
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    ['i18n-t']: typeof Translation
    ['i18n-d']: typeof DatetimeFormat
    ['i18n-n']: typeof NumberFormat
    ['I18nT']: typeof Translation
    ['I18nD']: typeof DatetimeFormat
    ['I18nN']: typeof NumberFormat
  }
}
