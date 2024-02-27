import type { Dimension } from './interfaces.js';
import type { Group } from '../../../diagram-api/types.js';
export interface TextDimensionCalculator {
    getMaxDimension(texts: string[], fontSize: number): Dimension;
}
export declare class TextDimensionCalculatorWithFont implements TextDimensionCalculator {
    private parentGroup;
    constructor(parentGroup: Group);
    getMaxDimension(texts: string[], fontSize: number): Dimension;
}
