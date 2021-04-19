import type { RenderFunction, SetupContext } from 'vue';
import type { Composer } from '../composer';
import type { FormattableProps } from './formatRenderer';
/**
 * DatetimeFormat Component Props
 *
 * @VueI18nComponent
 */
export declare type DatetimeFormatProps = FormattableProps<number | Date, Intl.DateTimeFormatOptions>;
/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */
export declare const DatetimeFormat: {
    name: string;
    props: {
        value: {
            type: (NumberConstructor | DateConstructor)[];
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
    setup(props: DatetimeFormatProps, context: SetupContext): RenderFunction;
};
//# sourceMappingURL=DatetimeFormat.d.ts.map