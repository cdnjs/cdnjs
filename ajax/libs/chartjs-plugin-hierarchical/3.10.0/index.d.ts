/**
 * chartjs-plugin-hierarchical
 * https://github.com/sgratzl/chartjs-plugin-hierarchical
 *
 * Copyright (c) 2019 Samuel Gratzl <sam@sgratzl.com>
 */

import { CategoryScaleOptions, CategoryScale } from 'chart.js';

interface IHierarchicalScaleOptions extends CategoryScaleOptions {
    levelPercentage: number;
    padding: number;
    hierarchyLabelPosition: 'below' | 'above' | null;
    hierarchyGroupLabelPosition: 'center' | 'first' | 'last' | 'between-first-and-second';
    static: boolean;
    hierarchyBoxSize: number;
    hierarchyBoxLineHeight: number;
    hierarchySpanColor: string;
    hierarchySpanWidth: number;
    hierarchyBoxColor: string;
    hierarchyBoxWidth: number;
    attributes: {
        [attribute: string]: any;
    };
    offset: true;
}
interface IInternalScale {
    _valueRange: number;
    _startValue: number;
    _startPixel: number;
    _length: number;
}
declare class HierarchicalScale extends CategoryScale<IHierarchicalScaleOptions> {
    private _nodes;
    determineDataLimits(): void;
    buildTicks(): {
        label: string;
        value: number;
    }[];
    configure(): void;
    getPixelForDecimal(value: number): number;
    _centerBase(index: number): number;
    getValueForPixel(pixel: number): number;
    static id: string;
    static defaults: any;
    static afterRegister(): void;
}
interface HierarchicalScaleType extends Partial<IHierarchicalScaleOptions> {
    type: 'hierarchical';
}
declare module 'chart.js' {
    interface CartesianScaleTypeRegistry {
        hierarchical: {
            options: IHierarchicalScaleOptions;
        };
    }
}

export { HierarchicalScale, HierarchicalScaleType, IHierarchicalScaleOptions, IInternalScale };
//# sourceMappingURL=index.d.ts.map
