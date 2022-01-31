export type LinkifyEventListeners = {
    [event: string]: Function;
};
export type LinkifyIntermediateRepresentation = {
    tagName: any;
    attributes: any;
    content: string;
    events: LinkifyEventListeners;
};
/**
 * @typedef {?{ [event: string]: Function }} LinkifyEventListeners
 */
/**
 * @typedef {{ tagName: any, attributes: any, content: string, events: LinkifyEventListeners }} LinkifyIntermediateRepresentation
 */
/**
 * @class Options
 * @param {Object | Options} [opts] Set option properties besides the defaults
 * @param {(ir: LinkifyIntermediateRepresentation) => any} [defaultRender] (For internal use) default
 * 	 render function that determines how to generate an HTML element based on a
 *   link token's derived tagName, attributes and HTML. Similar to render option
 */
export function Options(opts?: any | Options, defaultRender?: (ir: LinkifyIntermediateRepresentation) => any): void;
export class Options {
    /**
     * @typedef {?{ [event: string]: Function }} LinkifyEventListeners
     */
    /**
     * @typedef {{ tagName: any, attributes: any, content: string, events: LinkifyEventListeners }} LinkifyIntermediateRepresentation
     */
    /**
     * @class Options
     * @param {Object | Options} [opts] Set option properties besides the defaults
     * @param {(ir: LinkifyIntermediateRepresentation) => any} [defaultRender] (For internal use) default
     * 	 render function that determines how to generate an HTML element based on a
     *   link token's derived tagName, attributes and HTML. Similar to render option
     */
    constructor(opts?: any | Options, defaultRender?: (ir: LinkifyIntermediateRepresentation) => any);
    o: {};
    defaultRender: null;
    ignoreTags: any[];
    check: (token: MultiToken) => boolean;
    get: (key: string, operator?: any, token?: MultiToken) => any;
    getObj: (key: any, operator: any, token: any) => any;
    render: (token: MultiToken) => any;
}
/**
    Find a list of linkable items in the given string.
    @param {string} str string to find links in
    @param {string} [type] (optional) only find links of a specific type, e.g.,
        'url' or 'email'
    @param {Options|Object} [options] (optional) formatting options for final output
*/
export function find(str: string, type?: string, options?: Options | any): {
    type: string;
    value: string;
    isLink: boolean;
    href: string;
    start: number;
    end: number;
}[];
/**
 * Initialize the linkify state machine. Called automatically the first time
 * linkify is called on a string, but may be called manually as well.
 */
export function init(): void;
export var options: Readonly<{
    __proto__: any;
    defaults: {
        defaultProtocol: string;
        events: any;
        format: typeof noop;
        formatHref: typeof noop;
        nl2br: boolean;
        tagName: string;
        target: any;
        rel: any;
        validate: boolean;
        truncate: number;
        className: any;
        attributes: any;
        ignoreTags: any[];
        render: any;
    };
    Options: typeof Options;
    assign: (target: any, properties: any) => void;
}>;
/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} protocol
 * @param {boolean} [optionalSlashSlash] if set to true,
 */
export function registerCustomProtocol(protocol: string, optionalSlashSlash?: boolean): void;
/**
 * Register a linkify extension plugin
 * @param {string} name of plugin to register
 * @param {Function} plugin function that accepts mutable linkify state
 */
export function registerPlugin(name: string, plugin: Function): void;
/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */
export function reset(): void;
/**
 * Is the given string valid linkable text of some sort. Note that this does not
 * trim the text for you.
 *
 * Optionally pass in a second `type` param, which is the type of link to test
 * for.
 *
 * For example,
 *
 *     linkify.test(str, 'email');
 *
 * Returns `true` if str is a valid email.
 * @param {string} str string to test for links
 * @param {string} [type] optional specific link type to look for
 * @returns boolean true/false
 */
export function test(str: string, type?: string): boolean;
/**
    Parse a string into tokens that represent linkable and non-linkable sub-components
    @param {string} str
    @return {MultiToken[]} tokens
*/
export function tokenize(str: string): MultiToken[];
/**
    Abstract class used for manufacturing tokens of text tokens. That is rather
    than the value for a token being a small string of text, it's value an array
    of text tokens.

    Used for grouping together URLs, emails, hashtags, and other potential
    creations.

    @class MultiToken
    @param {string} value
    @param {{t: string, v: string, s: number, e: number}[]} tokens
    @abstract
*/
declare function MultiToken(): void;
declare class MultiToken {
    t: string;
    isLink: boolean;
    toString: () => string;
    toHref: () => string;
    toFormattedString: (opts: Options) => string;
    toFormattedHref: (opts?: Options) => string;
    startIndex: () => number;
    endIndex: () => number;
    toObject: (protocol?: string) => {
        type: string;
        value: string;
        isLink: boolean;
        href: string;
        start: number;
        end: number;
    };
    toFormattedObject: (opts: Options) => {
        type: string;
        value: string;
        isLink: boolean;
        href: string;
        start: number;
        end: number;
    };
    validate: (opts: Options) => boolean;
    render: (opts: Options) => {
        tagName: any;
        attributes: {
            href: string;
            class: any;
            target: any;
            rel: any;
        };
        content: string;
        eventListeners: any;
    };
}
declare function noop(val: any): any;
export {};
