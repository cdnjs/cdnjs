import type { ObjectDirective } from 'vue';
import type { I18n } from './i18n';
/**
 * Translation Directive (`v-t`)
 *
 * @remarks
 * Update the element `textContent` that localized with locale messages.
 *
 * You can use string syntax or object syntax.
 *
 * String syntax can be specified as a keypath of locale messages.
 *
 * If you can be used object syntax, you need to specify as the object key the following params
 *
 * ```
 * - path: required, key of locale messages
 * - locale: optional, locale
 * - args: optional, for list or named formatting
 * ```
 *
 * @example
 * ```html
 * <!-- string syntax: literal -->
 * <p v-t="'foo.bar'"></p>
 *
 * <!-- string syntax: binding via data or computed props -->
 * <p v-t="msg"></p>
 *
 * <!-- object syntax: literal -->
 * <p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>
 *
 * <!-- object syntax: binding via data or computed props -->
 * <p v-t="{ path: greeting, args: { name: fullName } }"></p>
 * ```
 *
 * @VueI18nDirective
 */
export declare type TranslationDirective<T = HTMLElement> = ObjectDirective<T>;
export declare function vTDirective<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(i18n: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>): TranslationDirective<HTMLElement>;
//# sourceMappingURL=directive.d.ts.map