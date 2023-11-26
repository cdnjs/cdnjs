import type { Group, SVG } from '../../diagram-api/types.js';
import type { Bound, D3RectElement, D3TextElement, RectData, TextData, TextObject } from './commonTypes.js';
export declare const drawRect: (element: SVG | Group, rectData: RectData) => D3RectElement;
/**
 * Draws a background rectangle
 *
 * @param element - Diagram (reference for bounds)
 * @param bounds - Shape of the rectangle
 */
export declare const drawBackgroundRect: (element: SVG | Group, bounds: Bound) => void;
export declare const drawText: (element: SVG | Group, textData: TextData) => D3TextElement;
export declare const drawImage: (elem: SVG | Group, x: number, y: number, link: string) => void;
export declare const drawEmbeddedImage: (element: SVG | Group, x: number, y: number, link: string) => void;
export declare const getNoteRect: () => RectData;
export declare const getTextObj: () => TextObject;
