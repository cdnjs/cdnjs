import type { PropType } from 'vue';
import type { ChartData, Plugin } from 'chart.js';
export declare const CommonProps: {
    readonly data: {
        readonly type: PropType<ChartData<keyof import("chart.js/dist/chunks/helpers.core").b$, (number | [number, number] | import("chart.js/dist/chunks/helpers.core").ad | import("chart.js/dist/chunks/helpers.core").a9 | null)[], unknown>>;
        readonly required: true;
    };
    readonly options: {
        readonly type: ObjectConstructor;
        readonly default: () => {};
    };
    readonly plugins: {
        readonly type: PropType<Plugin<keyof import("chart.js/dist/chunks/helpers.core").b$, import("chart.js/dist/chunks/helpers.core").a>[]>;
        readonly default: () => never[];
    };
    readonly datasetIdKey: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly updateMode: {
        readonly type: PropType<"resize" | "reset" | "none" | "hide" | "show" | "normal" | "active">;
        readonly default: undefined;
    };
};
export declare const Props: {
    readonly data: {
        readonly type: PropType<ChartData<keyof import("chart.js/dist/chunks/helpers.core").b$, (number | [number, number] | import("chart.js/dist/chunks/helpers.core").ad | import("chart.js/dist/chunks/helpers.core").a9 | null)[], unknown>>;
        readonly required: true;
    };
    readonly options: {
        readonly type: ObjectConstructor;
        readonly default: () => {};
    };
    readonly plugins: {
        readonly type: PropType<Plugin<keyof import("chart.js/dist/chunks/helpers.core").b$, import("chart.js/dist/chunks/helpers.core").a>[]>;
        readonly default: () => never[];
    };
    readonly datasetIdKey: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly updateMode: {
        readonly type: PropType<"resize" | "reset" | "none" | "hide" | "show" | "normal" | "active">;
        readonly default: undefined;
    };
    readonly type: {
        readonly type: PropType<keyof import("chart.js/dist/chunks/helpers.core").b$>;
        readonly required: true;
    };
};
//# sourceMappingURL=props.d.ts.map