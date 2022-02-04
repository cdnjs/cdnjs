export type Token = {
    t: string;
    v: string;
    s: number;
    e: number;
};
/**
 * An object where each key is a valid DOM Event Name such as `click` or `focus`
 * and each value is an event handler function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element#events
 */
export type EventListeners = {
    [event: string]: Function;
};
/**
 * All formatted properties required to render a link, including `tagName`,
 * `attributes`, `content` and `eventListeners`.
 */
export type IntermediateRepresentation = {
    tagName: any;
    attributes: {
        [attr: string]: any;
    };
    content: string;
    eventListeners: EventListeners;
};
/**
 * Specify either an object described by the template type `O` or a function.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `O`
 */
export type OptObj<O> = O | ((value: string, type: string, token: MultiToken) => O);
/**
 * Specify either a function described by template type `F` or an object.
 *
 * Each key in the object should be a link type (`'url'`, `'hashtag`', etc.). Each
 * value should be a function with template type `F` that is called when the
 * corresponding link type is encountered.
 */
export type OptFn<F> = F | {
    [type: string]: F;
};
/**
 * Specify either a value with template type `V`, a function that returns `V` or
 * an object where each value resolves to `V`.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `V`
 *
 * For the object, each key should be a link type (`'url'`, `'hashtag`', etc.).
 * Each value should either have type `V` or a function that returns V. This
 * function similarly takes a string value and a token.
 *
 * Example valid types for `Opt<string>`:
 *
 * ```js
 * 'hello'
 * (value, type, token) => 'world'
 * { url: 'hello', email: (value, token) => 'world'}
 * ```
 */
export type Opt<V> = V | {
    [type: string]: V | ((value: string, token: MultiToken) => V);
} | ((value: string, type: string, token: MultiToken) => V);
/**
 * See available options: https://linkify.js.org/docs/options.html
 */
export type Opts = {
    defaultProtocol?: string;
    events?: OptObj<EventListeners>;
    format?: Opt<string>;
    formatHref?: Opt<string>;
    nl2br?: boolean;
    tagName?: Opt<any>;
    target?: Opt<string>;
    rel?: Opt<string>;
    validate?: Opt<boolean>;
    truncate?: Opt<number>;
    className?: Opt<string>;
    attributes?: OptObj<{
        [attr: string]: any;
    }>;
    ignoreTags?: string[];
    render?: OptFn<(ir: IntermediateRepresentation) => any>;
};
/******************************************************************************
    Multi-Tokens
    Tokens composed of arrays of TextTokens
******************************************************************************/
/**
 * @param {string} value
 * @param {Token[]} tokens
 */
export function MultiToken(value: string, tokens: Token[]): void;
export class MultiToken {
    /******************************************************************************
        Multi-Tokens
        Tokens composed of arrays of TextTokens
    ******************************************************************************/
    /**
     * @param {string} value
     * @param {Token[]} tokens
     */
    constructor(value: string, tokens: Token[]);
    t: string;
    v: string;
    tk: Token[];
    isLink: boolean;
    toString: () => string;
    toHref: (scheme?: string) => string;
    toFormattedString: (options: Options) => string;
    toFormattedHref: (options: Options) => string;
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
    toFormattedObject: (options: Options) => {
        type: string;
        value: string;
        isLink: boolean;
        href: string;
        start: number;
        end: number;
    };
    validate: (options: Options) => boolean;
    render: (options: Options) => {
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
/**
 * Utility class for linkify interfaces to apply specified
 * {@link Opts formatting and rendering options}.
 *
 * @param {Opts | Options} [opts] Option value overrides.
 * @param {(ir: IntermediateRepresentation) => any} [defaultRender] (For
 *   internal use) default render function that determines how to generate an
 *   HTML element based on a link token's derived tagName, attributes and HTML.
 *   Similar to render option
 */
export function Options(opts?: Opts | Options, defaultRender?: (ir: IntermediateRepresentation) => any): void;
export class Options {
    /**
     * Utility class for linkify interfaces to apply specified
     * {@link Opts formatting and rendering options}.
     *
     * @param {Opts | Options} [opts] Option value overrides.
     * @param {(ir: IntermediateRepresentation) => any} [defaultRender] (For
     *   internal use) default render function that determines how to generate an
     *   HTML element based on a link token's derived tagName, attributes and HTML.
     *   Similar to render option
     */
    constructor(opts?: Opts | Options, defaultRender?: (ir: IntermediateRepresentation) => any);
    /** @protected */
    o: Required<Opts>;
    defaultRender: (ir: IntermediateRepresentation) => any;
    ignoreTags: string[];
    check: (token: MultiToken) => boolean;
    get: <K extends keyof Opts>(key: K, operator?: string, token?: MultiToken) => Opts[K] | any;
    getObj: <L extends keyof Opts>(key: L, operator?: string, token?: MultiToken) => Opts[L] | any;
    render: (token: MultiToken) => any;
}
/**
 * Find a list of linkable items in the given string.
 * @param {string} str string to find links in
 * @param {string} [type] only find links of a specific type, e.g., 'url' or 'email'
 * @param {Opts} [opts] formatting options for final output
*/
export function find(str: string, type?: string, opts?: Opts): {
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
    defaults: Required<Opts>;
    Options: typeof Options;
    assign: <A, B>(target: A, properties: B) => A & B;
}>;
/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} protocol
 * @param {boolean} [optionalSlashSlash]
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
 * Parse a string into tokens that represent linkable and non-linkable sub-components
 * @param {string} str
 * @return {MultiToken[]} tokens
 */
export function tokenize(str: string): MultiToken[];
