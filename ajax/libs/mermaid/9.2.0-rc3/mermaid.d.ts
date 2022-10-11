/**
 * Web page integration module for the mermaid framework. It uses the mermaidAPI for mermaid
 * functionality and to render the diagrams to svg code!
 */
import { MermaidConfig } from './config.type';
import { mermaidAPI } from './mermaidAPI';
/**
 * ## init
 *
 * Function that goes through the document to find the chart definitions in there and render them.
 *
 * The function tags the processed attributes with the attribute data-processed and ignores found
 * elements with the attribute already set. This way the init function can be triggered several
 * times.
 *
 * Optionally, `init` can accept in the second argument one of the following:
 *
 * - A DOM Node
 * - An array of DOM nodes (as would come from a jQuery selector)
 * - A W3C selector, a la `.mermaid`
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
 * @param config
 * @param nodes
 * @param callback
 */
declare const init: (config?: MermaidConfig, nodes?: string | HTMLElement | NodeListOf<HTMLElement>, callback?: Function) => Promise<void>;
declare const initThrowsErrors: (config?: MermaidConfig, nodes?: string | HTMLElement | NodeListOf<HTMLElement>, callback?: Function) => void;
declare const initialize: (config: MermaidConfig) => void;
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
 * @param {function (err, hash)} newParseErrorHandler New parseError() callback.
 */
declare const setParseErrorHandler: (newParseErrorHandler: (err: any, hash: any) => void) => void;
declare const parse: (txt: string) => boolean;
declare const mermaid: {
    startOnLoad: boolean;
    diagrams: any;
    parseError?: Function;
    mermaidAPI: typeof mermaidAPI;
    parse: typeof parse;
    render: typeof mermaidAPI.render;
    init: typeof init;
    initThrowsErrors: typeof initThrowsErrors;
    initialize: typeof initialize;
    contentLoaded: typeof contentLoaded;
    setParseErrorHandler: typeof setParseErrorHandler;
};
export default mermaid;
