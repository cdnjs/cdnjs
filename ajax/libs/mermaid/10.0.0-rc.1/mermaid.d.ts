import { MermaidConfig } from './config.type';
import { mermaidAPI, RenderResult } from './mermaidAPI';
import type { ParseErrorFunction } from './Diagram';
import type { DetailedError } from './utils';
import { ExternalDiagramDefinition } from './diagram-api/types';
export type { MermaidConfig, DetailedError, ExternalDiagramDefinition, ParseErrorFunction };
/**
 * ## init
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
 * @param config - **Deprecated**, please set configuration in {@link initialize}.
 * @param nodes - **Default**: `.mermaid`. One of the following:
 * - A DOM Node
 * - An array of DOM nodes (as would come from a jQuery selector)
 * - A W3C selector, a la `.mermaid`
 * @param callback - Called once for each rendered diagram's id.
 */
declare const init: (config?: MermaidConfig, nodes?: string | HTMLElement | NodeListOf<HTMLElement>, callback?: ((id: string) => unknown) | undefined) => Promise<void>;
/**
 * Equivalent to {@link init}, except an error will be thrown on error.
 *
 * @param config - **Deprecated** Mermaid sequenceConfig.
 * @param nodes - One of:
 * - A DOM Node
 * - An array of DOM nodes (as would come from a jQuery selector)
 * - A W3C selector, a la `.mermaid` (default)
 * @param callback - Function that is called with the id of each generated mermaid diagram.
 * @returns Resolves on success, otherwise the {@link Promise} will be rejected.
 */
declare const initThrowsErrors: (config?: MermaidConfig, nodes?: string | HTMLElement | NodeListOf<HTMLElement>, callback?: ((id: string) => unknown) | undefined) => Promise<void>;
declare const initialize: (config: MermaidConfig) => void;
/**
 * Used to register external diagram types.
 * @param diagrams - Array of {@link ExternalDiagramDefinition}.
 * @param opts - If opts.lazyLoad is true, the diagram will be loaded on demand.
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
 * @param newParseErrorHandler - New parseError() callback.
 */
declare const setParseErrorHandler: (newParseErrorHandler: (err: any, hash: any) => void) => void;
/**
 * Parse the text and validate the syntax.
 * @param text - The mermaid diagram definition.
 * @param parseOptions - Options for parsing.
 * @returns true if the diagram is valid, false otherwise if parseOptions.silent is true.
 * @throws Error if the diagram is invalid and parseOptions.silent is false.
 */
declare const parse: (text: string, parseOptions?: {
    silent?: boolean;
}) => Promise<boolean | void>;
declare const render: (id: string, text: string, container?: Element) => Promise<RenderResult>;
declare const mermaid: {
    startOnLoad: boolean;
    parseError?: ParseErrorFunction;
    mermaidAPI: typeof mermaidAPI;
    parse: typeof parse;
    render: typeof render;
    init: typeof init;
    initThrowsErrors: typeof initThrowsErrors;
    registerExternalDiagrams: typeof registerExternalDiagrams;
    initialize: typeof initialize;
    contentLoaded: typeof contentLoaded;
    setParseErrorHandler: typeof setParseErrorHandler;
};
export default mermaid;
