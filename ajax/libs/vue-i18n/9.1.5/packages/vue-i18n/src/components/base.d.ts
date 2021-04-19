import type { Locale } from '@intlify/core-base';
import { PropType } from '@vue/runtime-core';
import { Composer } from '../composer';
import type { I18nScope } from '../i18n';
export declare type ComponetI18nScope = Exclude<I18nScope, 'local'>;
/**
 * BaseFormat Props for Components that is offered Vue I18n
 *
 * @remarks
 * The interface definitions of the underlying props of components such as Translation, DatetimeFormat, and NumberFormat.
 *
 * @VueI18nComponent
 */
export interface BaseFormatProps {
    /**
     * @remarks
     * Used to wrap the content that is distribute in the slot. If omitted, the slot content is treated as Fragments.
     *
     * You can specify a string-based tag name, such as `p`, or the object for which the component is defined.
     */
    tag?: string | object;
    /**
     * @remarks
     * Specifies the locale to be used for the component.
     *
     * If specified, the global scope or the locale of the parent scope of the target component will not be overridden and the specified locale will be used.
     */
    locale?: Locale;
    /**
     * @remarks
     * Specifies the scope to be used in the target component.
     *
     * You can specify either `global` or `parent`.
     *
     * If `global` is specified, global scope is used, else then `parent` is specified, the scope of the parent of the target component is used.
     *
     * If the parent is a global scope, the global scope is used, if it's a local scope, the local scope is used.
     */
    scope?: ComponetI18nScope;
    /**
     * @remarks
     * A composer instance with an existing scope.
     *
     * This option takes precedence over the `scope` option.
     */
    i18n?: Composer;
}
export declare const baseFormatProps: {
    tag: {
        type: (StringConstructor | ObjectConstructor)[];
    };
    locale: {
        type: StringConstructor;
    };
    scope: {
        type: StringConstructor;
        validator: (val: ComponetI18nScope) => boolean;
        default: "parent" | "global";
    };
    i18n: {
        type: PropType<Composer<{}, {}, {}, import("../composer").VueMessageType>>;
    };
};
//# sourceMappingURL=base.d.ts.map