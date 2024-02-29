import type { Group } from '../diagram-api/types.js';
export declare function computeDimensionOfText(parentNode: Group, lineHeight: number, text: string): DOMRect | undefined;
export declare const createText: (el: any, text?: string, { style, isTitle, classes, useHtmlLabels, isNode, width, addSvgBackground, }?: {
    style?: string | undefined;
    isTitle?: boolean | undefined;
    classes?: string | undefined;
    useHtmlLabels?: boolean | undefined;
    isNode?: boolean | undefined;
    width?: number | undefined;
    addSvgBackground?: boolean | undefined;
}) => any;
