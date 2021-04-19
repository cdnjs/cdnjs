
declare module '@vue/runtime-core' {
  /**
   * Component Custom Options for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomOptions {
    /**
     * VueI18n options
     *
     * @remarks
     * See the {@link VueI18nOptions}
     */
    i18n?: VueI18nOptions
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
     * Exported Global Composer instance, or global VueI18n instance.
     *
     * @remarks
     * You can get the {@link ExportedGlobalComposer | exported composer instance} which are exported from global {@link Composer | composer instance} created with {@link createI18n}, or global {@link VueI18n | VueI18n instance}.
     * You can get the exported composer instance in {@link I18nMode | Composition API mode}, or the Vuei18n instance in {@link I18nMode | Legacy API mode}, which is the instance you can refer to with this property.
     * The locales, locale messages, and other resources managed by the instance referenced by this property are valid as global scope.
     * If the `i18n` component custom option is not specified, it's the same as the VueI18n instance that can be referenced by the i18n instance {@link I18n.global | global} property.
     */
    $i18n: VueI18n | ExportedGlobalComposer
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#t | `VueI18n#t`}.
     *
     * In {@link I18nMode | Composition API mode}, the `$t` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#t | `Composer#t` }.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key -  A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, list: unknown[]): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, named: object): TranslateResult
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
    $t(key: Path, list: unknown[]): TranslateResult
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
    $t(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): string
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
    $t(key: Path, plural: number): string
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
    $t(key: Path, plural: number, options: TranslateOptions): string
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
    $t(key: Path, defaultMsg: string): string
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
    $t(key: Path, defaultMsg: string, options: TranslateOptions): string
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
    $t(key: Path, list: unknown[]): string
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
    $t(key: Path, list: unknown[], plural: number): string
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
    $t(key: Path, list: unknown[], defaultMsg: string): string
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
    $t(key: Path, list: unknown[], options: TranslateOptions): string
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
    $t(key: Path, named: NamedValue): string
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
    $t(key: Path, named: NamedValue, plural: number): string
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
    $t(key: Path, named: NamedValue, defaultMsg: string): string
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
    $t(key: Path, named: NamedValue, options: TranslateOptions): string
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#rt | `VueI18n#rt`}.
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
     * Locale message pluralization
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tc | `VueI18n#tc` }.
     * The value of plural is handled with default `1`.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(
      key: Path,
      choice: number,
      named: Record<string, unknown>
    ): TranslateResult
    /**
     * Translation message exist
     *
     * @remarks
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#te | `VueI18n.#te` }.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns if found locale message, `true`, else `false`
     */
    $te(key: Path, locale?: Locale): boolean
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#d | `VueI18n#d` }.
     *
     * In {@link I18nMode | Composition API mode}, the `$d` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#d | `Composer#d` }.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): DateTimeFormatResult
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
    $d(value: number | Date, key: string): DateTimeFormatResult
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
    $d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $d(
      value: number | Date,
      args: { [key: string]: string }
    ): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): string
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
    $d(value: number | Date, key: string): string
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
    $d(value: number | Date, key: string, locale: Locale): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param options - An options, see the {@link DateTimeOptions}
     *
     * @returns formatted value
     */
    $d(value: number | Date, options: DateTimeOptions): string
    /**
     * Number formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#n | `VueI18n.n` }.
     *
     * In {@link I18nMode | Composition API mode}, the `$n` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance,  and it work on **global scope**. About that details, see {@link Composer#n | `Composer.n` }.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): NumberFormatResult
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
    $n(value: number, key: string): NumberFormatResult
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
    $n(value: number, key: string, locale: Locale): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $n(value: number, args: { [key: string]: string }): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
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
    $n(value: number, key: string): string
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
    $n(value: number, key: string, locale: Locale): string
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
    $n(value: number, options: NumberOptions): string
    /**
     * Locale messages getter
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tm | `VueI18n#tm` }.
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
    $tm(key: Path): LocaleMessageValue<VueMessageType> | {}
  }
}
