/**
 * chartjs-plugin-hierarchical
 * https://github.com/sgratzl/chartjs-plugin-hierarchical
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */

import { CategoryScaleOptions, CategoryScale } from 'chart.js';

interface IHierarchicalScaleOptions extends CategoryScaleOptions {
    /**
     * ratio by which the distance between two elements shrinks the higher the level of the tree is. i.e. two two level bars have a distance of 1. two nested one just 0.75
     * @default 0.75
     */
    levelPercentage: number;
    /**
     * padding of the first collapse to the start of the x-axis
     * @default 25
     */
    padding: number;
    /**
     * position of the hierarchy label in expanded levels, null to disable
     * @default 'below'
     */
    hierarchyLabelPosition: 'below' | 'above' | null;
    /**
     * position of the hierarchy group label relative to the its children
     * @default between-first-and-second
     */
    hierarchyGroupLabelPosition: 'center' | 'first' | 'last' | 'between-first-and-second';
    /**
     * whether interactive buttons should be shown or whether it should be static
     * @default false
     */
    static: boolean;
    /**
     * size of the box to draw
     */
    hierarchyBoxSize: number;
    /**
     * distance between two hierarchy indicators
     */
    hierarchyBoxLineHeight: number;
    /**
     * color of the line indicator hierarchy children
     */
    hierarchySpanColor: string;
    /**
     * stroke width of the line
     */
    hierarchySpanWidth: number;
    /**
     * color of the box to toggle collapse/expand
     */
    hierarchyBoxColor: string;
    /**
     * stroke width of the toggle box
     */
    hierarchyBoxWidth: number;
    /**
     * object of attributes that should be managed and extracted from the tree
     * data structures such as `backgroundColor` for coloring individual bars
     * the object contains the key and default value
     * @default {}
     */
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
