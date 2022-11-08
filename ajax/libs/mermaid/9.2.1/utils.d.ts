import { MermaidConfig } from './config.type';
/**
 * @function detectInit Detects the init config object from the text
 * @param config
 *
 *   ```mermaid
 *
 *   %%{init: {"theme": "debug", "logLevel": 1 }}%%
 *   graph LR
 *      a-->b
 *      b-->c
 *      c-->d
 *      d-->e
 *      e-->f
 *      f-->g
 *      g-->h
 * ```
 *
 *   Or
 *
 *   ```mermaid
 *   %%{initialize: {"theme": "dark", logLevel: "debug" }}%%
 *   graph LR
 *    a-->b
 *    b-->c
 *    c-->d
 *    d-->e
 *    e-->f
 *    f-->g
 *    g-->h
 * ```
 * @param {string} text The text defining the graph
 * @returns {object} The json object representing the init passed to mermaid.initialize()
 */
export declare const detectInit: (text: string, config?: MermaidConfig) => MermaidConfig;
/**
 * @function detectDirective Detects the directive from the text. Text can be single line or
 *   multiline. If type is null or omitted the first directive encountered in text will be returned
 *
 *   ```mermaid
 *   graph LR
 *    %%{somedirective}%%
 *    a-->b
 *    b-->c
 *    c-->d
 *    d-->e
 *    e-->f
 *    f-->g
 *    g-->h
 * ```
 * @param {string} text The text defining the graph
 * @param {string | RegExp} type The directive to return (default: null)
 * @returns {object | Array} An object or Array representing the directive(s): { type: string, args:
 *   object|null } matched by the input type if a single directive was found, that directive object
 *   will be returned.
 */
export declare const detectDirective: (text: any, type?: null) => {
    type: string;
    args: any;
} | {
    type: any;
    args: null;
} | ({
    type: string;
    args: any;
} | {
    type: any;
    args: null;
})[];
/**
 * @function isSubstringInArray Detects whether a substring in present in a given array
 * @param {string} str The substring to detect
 * @param {Array} arr The array to search
 * @returns {number} The array index containing the substring or -1 if not present
 */
export declare const isSubstringInArray: (str: any, arr: any) => number;
/**
 * Returns a d3 curve given a curve name
 *
 * @param {string | undefined} interpolate The interpolation name
 * @param {any} defaultCurve The default curve to return
 * @returns {import('d3-shape').CurveFactory} The curve factory to use
 */
export declare const interpolateToCurve: (interpolate: any, defaultCurve: any) => any;
/**
 * Formats a URL string
 *
 * @param {string} linkStr String of the URL
 * @param {{ securityLevel: string }} config Configuration passed to MermaidJS
 * @returns {string | undefined} The formatted URL
 */
export declare const formatUrl: (linkStr: any, config: any) => any;
/**
 * Runs a function
 *
 * @param {string} functionName A dot seperated path to the function relative to the `window`
 * @param {...any} params Parameters to pass to the function
 */
export declare const runFunc: (functionName: any, ...params: any[]) => void;
/**
 * Gets styles from an array of declarations
 *
 * @param {string[]} arr Declarations
 * @returns {{ style: string; labelStyle: string }} The styles grouped as strings
 */
export declare const getStylesFromArray: (arr: any) => {
    style: string;
    labelStyle: string;
};
export declare const generateId: () => string;
export declare const random: (options: any) => string;
export declare const getTextObj: () => {
    x: number;
    y: number;
    fill: undefined;
    anchor: string;
    style: string;
    width: number;
    height: number;
    textMargin: number;
    rx: number;
    ry: number;
    valign: undefined;
};
/**
 * Adds text to an element
 *
 * @param {SVGElement} elem Element to add text to
 * @param {{
 *   text: string;
 *   x: number;
 *   y: number;
 *   anchor: 'start' | 'middle' | 'end';
 *   fontFamily: string;
 *   fontSize: string | number;
 *   fontWeight: string | number;
 *   fill: string;
 *   class: string | undefined;
 *   textMargin: number;
 * }} textData
 * @returns {SVGTextElement} Text element with given styling and content
 */
export declare const drawSimpleText: (elem: any, textData: any) => any;
export declare const wrapLabel: ((label: any, maxWidth: any, config: any) => any) & import("lodash").MemoizedFunction;
/**
 * This calculates the text's height, taking into account the wrap breaks and both the statically
 * configured height, width, and the length of the text (in pixels).
 *
 * If the wrapped text text has greater height, we extend the height, so it's value won't overflow.
 *
 * @param {any} text The text to measure
 * @param {any} config - The config for fontSize, fontFamily, and fontWeight all impacting the
 *   resulting size
 * @returns {any} - The height for the given text
 */
export declare const calculateTextHeight: (text: any, config: any) => number;
/**
 * This calculates the width of the given text, font size and family.
 *
 * @param {any} text - The text to calculate the width of
 * @param {any} config - The config for fontSize, fontFamily, and fontWeight all impacting the
 *   resulting size
 * @returns {any} - The width for the given text
 */
export declare const calculateTextWidth: (text: any, config: any) => number;
/**
 * This calculates the dimensions of the given text, font size, font family, font weight, and
 * margins.
 *
 * @param {any} text - The text to calculate the width of
 * @param {any} config - The config for fontSize, fontFamily, fontWeight, and margin all impacting
 *   the resulting size
 * @returns - The width for the given text
 */
export declare const calculateTextDimensions: ((text: any, config: any) => {
    width: number;
    height: number;
    lineHeight?: undefined;
} | {
    width: number;
    height: number;
    lineHeight: number;
}) & import("lodash").MemoizedFunction;
export declare const initIdGenerator: {
    new (deterministic: any, seed: any): {
        next(): number;
    };
};
/**
 * Decodes HTML, source: {@link https://github.com/shrpne/entity-decode/blob/v2.0.1/browser.js}
 *
 * @param {string} html HTML as a string
 * @returns {string} Unescaped HTML
 */
export declare const entityDecode: (html: any) => string;
/**
 * Sanitizes directive objects
 *
 * @param {object} args Directive's JSON
 */
export declare const directiveSanitizer: (args: any) => void;
export declare const sanitizeCss: (str: any) => any;
export interface DetailedError {
    str: string;
    hash: any;
    error?: any;
    message?: string;
}
/** @param error */
export declare function isDetailedError(error: unknown): error is DetailedError;
/** @param error */
export declare function getErrorMessage(error: unknown): string;
declare const _default: {
    assignWithDepth: (dst: any, src: any, config?: {
        depth: number;
        clobber: boolean;
    } | undefined) => any;
    wrapLabel: ((label: any, maxWidth: any, config: any) => any) & import("lodash").MemoizedFunction;
    calculateTextHeight: (text: any, config: any) => number;
    calculateTextWidth: (text: any, config: any) => number;
    calculateTextDimensions: ((text: any, config: any) => {
        width: number;
        height: number;
        lineHeight?: undefined;
    } | {
        width: number;
        height: number;
        lineHeight: number;
    }) & import("lodash").MemoizedFunction;
    detectInit: (text: string, config?: MermaidConfig | undefined) => MermaidConfig;
    detectDirective: (text: any, type?: null) => {
        type: string;
        args: any;
    } | {
        type: any;
        args: null;
    } | ({
        type: string;
        args: any;
    } | {
        type: any;
        args: null;
    })[];
    isSubstringInArray: (str: any, arr: any) => number;
    interpolateToCurve: (interpolate: any, defaultCurve: any) => any;
    calcLabelPosition: (points: any) => any;
    calcCardinalityPosition: (isRelationTypePresent: any, points: any, initialPosition: any) => {
        x: number;
        y: number;
    };
    calcTerminalLabelPosition: (terminalMarkerSize: any, position: any, _points: any) => {
        x: number;
        y: number;
    };
    formatUrl: (linkStr: any, config: any) => any;
    getStylesFromArray: (arr: any) => {
        style: string;
        labelStyle: string;
    };
    generateId: () => string;
    random: (options: any) => string;
    runFunc: (functionName: any, ...params: any[]) => void;
    entityDecode: (html: any) => string;
    initIdGenerator: {
        new (deterministic: any, seed: any): {
            next(): number;
        };
    };
    directiveSanitizer: (args: any) => void;
    sanitizeCss: (str: any) => any;
};
export default _default;
