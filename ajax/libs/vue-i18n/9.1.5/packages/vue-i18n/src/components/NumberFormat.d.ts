import type { SetupContext, RenderFunction } from 'vue';
import type { Composer } from '../composer';
import type { FormattableProps } from './formatRenderer';
/**
 * NumberFormat Component Props
 *
 * @VueI18nComponent
 */
export declare type NumberFormatProps = FormattableProps<number, Intl.NumberFormatOptions>;
/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */
export declare const NumberFormat: {
    name: string;
    props: {
        value: {
            type: NumberConstructor;
            required: boolean;
        };
        format: {
            type: (ObjectConstructor | StringConstructor)[];
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
    setup(props: NumberFormatProps, context: SetupContext): RenderFunction;
};
//# sourceMappingURL=NumberFormat.d.ts.map