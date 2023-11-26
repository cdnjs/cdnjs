import type { MermaidConfig } from './config.type.js';
import type { ParseOptions, RenderResult } from './mermaidAPI.js';
import { mermaidAPI } from './mermaidAPI.js';
import { detectType } from './diagram-api/detectType.js';
import type { ParseErrorFunction } from './Diagram.js';
import type { DetailedError } from './utils.js';
import type { ExternalDiagramDefinition } from './diagram-api/types.js';
import type { UnknownDiagramError } from './errors.js';
export type { MermaidConfig, DetailedError, ExternalDiagramDefinition, ParseErrorFunction, RenderResult, ParseOptions, UnknownDiagramError, };
export interface RunOptions {
    /**
     * The query selector to use when finding elements to render. Default: `".mermaid"`.
     */
    querySelector?: string;
    /**
     * The nodes to render. If this is set, `querySelector` will be ignored.
     */
    nodes?: ArrayLike<HTMLElement>;
    /**
     * A callback to call after each diagram is rendered.
     */
    postRenderCallback?: (id: string) => unknown;
    /**
     * If `true`, errors will be logged to the console, but not thrown. Default: `false`
     */
    suppressErrors?: boolean;
}
/**
 * ## run
 *
 * Function that goes through the document to find the chart definitions in there and render them.
 *
 * The function tags the processed attributes with the attribute data-processed and ignores found
 * elements with the attribute already set. This way the init function can be triggered several
 * times.
 *
 * ```mermaid
 * graph LR;
 *  a(Find elements)-->b{Processed}
 *  b-->|Yes|c(Leave element)
 *  b-->|No |d(Transform)
 * ```
 *
 * Renders the mermaid diagrams
 *
 * @param options - Optional runtime configs
 */
declare const run: (options?: RunOptions) => Promise<void>;
/**
 * Used to set configurations for mermaid.
 * This function should be called before the run function.
 * @param config - Configuration object for mermaid.
 */
declare const initialize: (config: MermaidConfig) => void;
/**
 * ## init
 *
 * @deprecated Use {@link initialize} and {@link run} instead.
 *
 * Renders the mermaid diagrams
 *
 * @param config - **Deprecated**, please set configuration in {@link initialize}.
 * @param nodes - **Default**: `.mermaid`. One of the following:
 * - A DOM Node
 * - An array of DOM nodes (as would come from a jQuery selector)
 * - A W3C selector, a la `.mermaid`
 * @param callback - Called once for each rendered diagram's id.
 */
declare const init: (config?: MermaidConfig, nodes?: string | HTMLElement | NodeListOf<HTMLElement>, callback?: ((id: string) => unknown) | undefined) => Promise<void>;
/**
 * Used to register external diagram types.
 * @param diagrams - Array of {@link ExternalDiagramDefinition}.
 * @param opts - If opts.lazyLoad is false, the diagrams will be loaded immediately.
 */
declare const registerExternalDiagrams: (diagrams: ExternalDiagramDefinition[], { lazyLoad, }?: {
    lazyLoad?: boolean | undefined;
}) => Promise<void>;
/**
 * ##contentLoaded Callback function that is called when page is loaded. This functions fetches
 * configuration for mermaid rendering and calls init for rendering the mermaid diagrams on the
 * page.
 */
declare const contentLoaded: () => void;
/**
 * ## setParseErrorHandler  Alternative to directly setting parseError using:
 *
 * ```js
 * mermaid.parseError = function(err,hash){=
 *   forExampleDisplayErrorInGui(err);  // do something with the error
 * };
 * ```
 *
 * This is provided for environments where the mermaid object can't directly have a new member added
 * to it (eg. dart interop wrapper). (Initially there is no parseError member of mermaid).
 *
 * @param parseErrorHandler - New parseError() callback.
 */
declare const setParseErrorHandler: (parseErrorHandler: (err: any, hash: any) => void) => void;
/**
 * Parse the text and validate the syntax.
 * @param text - The mermaid diagram definition.
 * @param parseOptions - Options for parsing.
 * @returns true if the diagram is valid, false otherwise if parseOptions.suppressErrors is true.
 * @throws Error if the diagram is invalid and parseOptions.suppressErrors is false.
 */
declare const parse: (text: string, parseOptions?: ParseOptions) => Promise<boolean | void>;
/**
 * Function that renders an svg with a graph from a chart definition. Usage example below.
 *
 * ```javascript
 *  element = document.querySelector('#graphDiv');
 *  const graphDefinition = 'graph TB\na-->b';
 *  const { svg, bindFunctions } = await mermaid.render('graphDiv', graphDefinition);
 *  element.innerHTML = svg;
 *  bindFunctions?.(element);
 * ```
 *
 * @remarks
 * Multiple calls to this function will be enqueued to run serially.
 *
 * @param id - The id for the SVG element (the element to be rendered)
 * @param text - The text for the graph definition
 * @param container - HTML element where the svg will be inserted. (Is usually element with the .mermaid class)
 *   If no svgContainingElement is provided then the SVG element will be appended to the body.
 *    Selector to element in which a div with the graph temporarily will be
 *   inserted. If one is provided a hidden div will be inserted in the body of the page instead. The
 *   element will be removed when rendering is completed.
 * @returns Returns the SVG Definition and BindFunctions.
 */
declare const render: (id: string, text: string, container?: Element) => Promise<RenderResult>;
export interface Mermaid {
    startOnLoad: boolean;
    parseError?: ParseErrorFunction;
    mermaidAPI: typeof mermaidAPI;
    parse: typeof parse;
    render: typeof render;
    init: typeof init;
    run: typeof run;
    registerExternalDiagrams: typeof registerExternalDiagrams;
    initialize: typeof initialize;
    contentLoaded: typeof contentLoaded;
    setParseErrorHandler: typeof setParseErrorHandler;
    detectType: typeof detectType;
}
declare const mermaid: Mermaid;
export default mermaid;
