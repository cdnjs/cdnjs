import type { App } from 'vue';
import type { I18n } from './i18n';
/**
 * Vue I18n plugin options
 *
 * @remarks
 * An options specified when installing Vue I18n as Vue plugin with using `app.use`.
 *
 * @VueI18nGeneral
 */
export interface I18nPluginOptions {
    /**
     * Whether to use the tag name `i18n` for Translation Component
     *
     * @remarks
     * This option is used for compatibility with Vue I18n v8.x.
     *
     * If you can't migrate right away, you can temporarily enable this option, and you can work Translation Component.
     *
     * @defaultValue `false`
     */
    useI18nComponentName?: boolean;
    /**
     * Whether to globally install the components that is offered by Vue I18n
     *
     * @remarks
     * If this option is enabled, the components will be installed globally at `app.use` time.
     *
     * If you want to install manually in the `import` syntax, you can set it to `false` to install when needed.
     *
     * @defaultValue `true`
     */
    globalInstall?: boolean;
}
export declare function apply<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(app: App, i18n: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>, ...options: unknown[]): void;
//# sourceMappingURL=plugin.d.ts.map