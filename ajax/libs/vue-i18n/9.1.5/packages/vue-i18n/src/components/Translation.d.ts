import type { SetupContext, RenderFunction } from 'vue';
import type { Composer } from '../composer';
import type { BaseFormatProps } from './base';
/**
 * Translation Component Props
 *
 * @VueI18nComponent
 */
export interface TranslationProps extends BaseFormatProps {
    /**
     * @remarks
     * The locale message key can be specified prop
     */
    keypath: string;
    /**
     * @remarks
     * The Plural Choosing the message number prop
     */
    plural?: number | string;
}
/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../guide/advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n path="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */
export declare const Translation: {
    name: string;
    props: {
        keypath: {
            type: StringConstructor;
            required: boolean;
        };
        plural: {
            type: (StringConstructor | NumberConstructor)[];
            validator: (val: any) => boolean;
        };
    } & {
        tag: {
            type: (ObjectConstructor | StringConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
        i18n: {
            type: import("vue").PropType<Composer<{}, {}, {}, import("../composer").VueMessageType>>;
        };
    };
    setup(props: TranslationProps, context: SetupContext): RenderFunction;
};
//# sourceMappingURL=Translation.d.ts.map