import type { ComponentInternalInstance, App } from 'vue';
import type { Locale, FallbackLocale, LocaleMessageDictionary, DateTimeFormat, NumberFormat } from '@intlify/core-base';
import type { VueMessageType, Composer, ComposerOptions } from './composer';
import type { VueI18n, VueI18nOptions } from './legacy';
declare module '@vue/runtime-core' {
    interface App<HostElement = any> {
        __VUE_I18N__?: I18n & I18nInternal;
        __VUE_I18N_SYMBOL__?: InjectionKey<I18n> | string;
    }
}
/**
 * I18n Options for `createI18n`
 *
 * @remarks
 * `I18nOptions` is inherited {@link I18nAdditionalOptions}, {@link ComposerOptions} and {@link VueI18nOptions},
 * so you can specify these options.
 *
 * @VueI18nGeneral
 */
export declare type I18nOptions = I18nAdditionalOptions & (ComposerOptions | VueI18nOptions);
/**
 * I18n Additional Options
 *
 * @remarks
 * Specific options for {@link createI18n}
 *
 * @VueI18nGeneral
 */
export interface I18nAdditionalOptions {
    /**
     * Whether vue-i18n Legacy API mode use on your Vue App
     *
     * @remarks
     * The default is to use the Legacy API mode. If you want to use the Composition API mode, you need to set it to `false`.
     *
     * @VueI18nSee [Composition API](../guide/advanced/composition)
     *
     * @defaultValue `true`
     */
    legacy?: boolean;
    /**
     * Whether Whether to inject global properties & functions into for each component.
     *
     * @remarks
     * If set to `true`, then properties and methods prefixed with `$` are injected into Vue Component.
     *
     * @VueI18nSee [Implicit with injected properties and functions](../guide/advanced/composition#implicit-with-injected-properties-and-functions)
     * @VueI18nSee [ComponentCustomProperties](injection#componentcustomproperties)
     *
     * @defaultValue `false`
     */
    globalInjection?: boolean;
}
/**
 * Vue I18n API mode
 *
 * @VueI18nSee [I18n#mode](general#mode)
 *
 * @VueI18nGeneral
 */
export declare type I18nMode = 'legacy' | 'composition';
/**
 * I18n instance
 *
 * @remarks
 * The instance required for installation as the Vue plugin
 *
 * @VueI18nGeneral
 */
export interface I18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Legacy extends boolean = true> {
    /**
     * Vue I18n API mode
     *
     * @remarks
     * If you specified `legacy: true` option in `createI18n`, return `legacy`, else `composition`
     *
     * @defaultValue `'composition'`
     */
    readonly mode: I18nMode;
    /**
     * The property accessible to the global Composer instance or VueI18n instance
     *
     * @remarks
     * If the [I18n#mode](general#mode) is `'legacy'`, then you can access to a global {@link VueI18n} instance, else then [I18n#mode](general#mode) is `'composition' `, you can access to the global {@link Composer} instance.
     *
     * An instance of this property is **global scope***.
     */
    readonly global: Legacy extends true ? VueI18n<Messages, DateTimeFormats, NumberFormats> : Composer<Messages, DateTimeFormats, NumberFormats>;
    /**
     * Install entry point
     *
     * @param app - A target Vue app instance
     * @param options - An install options
     */
    install(app: App, ...options: unknown[]): void;
}
/**
 * I18n interface for internal usage
 *
 * @internal
 */
export interface I18nInternal {
    __instances: Map<ComponentInternalInstance, VueI18n | Composer>;
    __getInstance<Messages, DateTimeFormats, NumberFormats, Instance extends VueI18n<Messages, DateTimeFormats, NumberFormats> | Composer<Messages, DateTimeFormats, NumberFormats>>(component: ComponentInternalInstance): Instance | null;
    __setInstance<Messages, DateTimeFormats, NumberFormats, Instance extends VueI18n<Messages, DateTimeFormats, NumberFormats> | Composer<Messages, DateTimeFormats, NumberFormats>>(component: ComponentInternalInstance, instance: Instance): void;
    __deleteInstance(component: ComponentInternalInstance): void;
}
/**
 * I18n Scope
 *
 * @VueI18nSee [ComposerAdditionalOptions#useScope](composition#usescope)
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nGeneral
 */
export declare type I18nScope = 'local' | 'parent' | 'global';
/**
 * I18n Options for `useI18n`
 *
 * @remarks
 * `UseI18nOptions` is inherited {@link ComposerAdditionalOptions} and {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export declare type UseI18nOptions = ComposerAdditionalOptions & ComposerOptions;
/**
 * Composer additional options for `useI18n`
 *
 * @remarks
 * `ComposerAdditionalOptions` is extend for {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export interface ComposerAdditionalOptions {
    useScope?: I18nScope;
}
/**
 * Vue I18n factory
 *
 * @param options - An options, see the {@link I18nOptions}
 *
 * @returns {@link I18n} instance
 *
 * @remarks
 * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
 *
 * If you use composition API mode, you need to specify {@link ComposerOptions}.
 *
 * @VueI18nSee [Getting Started](../guide/)
 * @VueI18nSee [Composition API](../guide/advanced/composition)
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for composition API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: false, // you must specify 'legacy: false' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @VueI18nGeneral
 */
export declare function createI18n<Options extends I18nOptions = {}, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat> = Record<keyof Options['numberFormats'], NumberFormat>>(options?: Options): I18n<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Options['legacy'] extends boolean ? Options['legacy'] : true>;
/**
 * Use Composition API for Vue I18n
 *
 * @param options - An options, see {@link UseI18nOptions}
 *
 * @returns {@link Composer} instance
 *
 * @remarks
 * This function is mainly used by `setup`.
 *
 * If options are specified, Composer instance is created for each component and you can be localized on the component.
 *
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 *
 * @VueI18nComposition
 */
export declare function useI18n<Options extends UseI18nOptions = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat> = Record<keyof Options['numberFormats'], NumberFormat>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;
/**
 * Exported global composer instance
 *
 * @remarks
 * This interface is the [global composer](general#global) that is provided interface that is injected into each component with `app.config.globalProperties`.
 *
 * @VueI18nGeneral
 */
export interface ExportedGlobalComposer {
    /**
     * Locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#locale`. About details, see the [Composer#locale](composition#locale)
     */
    locale: Locale;
    /**
     * Fallback locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#fallbackLocale`. About details, see the [Composer#fallbackLocale](composition#fallbacklocale)
     */
    fallbackLocale: FallbackLocale;
    /**
     * Available locales
     *
     * @remarks
     * This property is proxy-like property for `Composer#availableLocales`. About details, see the [Composer#availableLocales](composition#availablelocales)
     */
    readonly availableLocales: Locale[];
}
//# sourceMappingURL=i18n.d.ts.map