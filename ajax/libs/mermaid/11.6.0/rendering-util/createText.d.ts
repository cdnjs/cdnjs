import type { MermaidConfig } from '../config.type.js';
import type { SVGGroup } from '../diagram-api/types.js';
export declare function computeDimensionOfText(parentNode: SVGGroup, lineHeight: number, text: string): DOMRect | undefined;
/**
 * Convert fontawesome labels into fontawesome icons by using a regex pattern
 * @param text - The raw string to convert
 * @returns string with fontawesome icons as i tags
 */
export declare function replaceIconSubstring(text: string): string;
export declare const createText: (el: any, text?: string, { style, isTitle, classes, useHtmlLabels, isNode, width, addSvgBackground, }?: {
    style?: string | undefined;
    isTitle?: boolean | undefined;
    classes?: string | undefined;
    useHtmlLabels?: boolean | undefined;
    isNode?: boolean | undefined;
    width?: number | undefined;
    addSvgBackground?: boolean | undefined;
}, config?: MermaidConfig) => Promise<any>;
