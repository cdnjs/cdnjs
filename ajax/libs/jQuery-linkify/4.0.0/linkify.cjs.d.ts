export var __esModule: boolean;
export type Transition<T> = null | T;
/**
 * Scanner output token:
 * - `t` is the token name (e.g., 'NUM', 'EMOJI', 'TLD')
 * - `v` is the value of the token (e.g., '123', '❤️', 'com')
 * - `s` is the start index of the token in the original string
 * - `e` is the end index of the token in the original string
 */
export type Token = {
    t: string;
    v: string;
    s: number;
    e: number;
};
export type Collections<T> = {
    [collection: string]: T[];
};
export type ScannerInit = {
    start: State<string>;
    tokens: {
        groups: Collections<string>;
    } & typeof tk;
};
export type ParserInit = {
    start: State<MultiToken>;
    tokens: typeof multi;
};
export type TokenPlugin = (arg: {
    scanner: ScannerInit;
}) => void;
export type Plugin = (arg: {
    scanner: ScannerInit;
    parser: ParserInit;
}) => void;
export type Flags = {
    [group: string]: true;
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
    get: <K extends keyof Opts>(key: K, operator?: string, token?: MultiToken) => any;
    getObj: <L extends keyof Opts>(key: L, operator?: string, token?: MultiToken) => any;
    render: (token: MultiToken) => any;
}
/**
 * @template T
 * @typedef {null | T } Transition
 */
/**
 * Define a basic state machine state. j is the list of character transitions,
 * jr is the list of regex-match transitions, jd is the default state to
 * transition to t is the accepting token type, if any. If this is the terminal
 * state, then it does not emit a token.
 *
 * The template type T represents the type of the token this state accepts. This
 * should be a string (such as of the token exports in `text.js`) or a
 * MultiToken subclass (from `multi.js`)
 *
 * @template T
 * @param {T} [token] Token that this state emits
 */
export function State<T>(token?: T): void;
export class State<T> {
    /**
     * @template T
     * @typedef {null | T } Transition
     */
    /**
     * Define a basic state machine state. j is the list of character transitions,
     * jr is the list of regex-match transitions, jd is the default state to
     * transition to t is the accepting token type, if any. If this is the terminal
     * state, then it does not emit a token.
     *
     * The template type T represents the type of the token this state accepts. This
     * should be a string (such as of the token exports in `text.js`) or a
     * MultiToken subclass (from `multi.js`)
     *
     * @template T
     * @param {T} [token] Token that this state emits
     */
    constructor(token?: T);
    /** @type {{ [input: string]: State<T> }} j */
    j: {
        [input: string]: State<T>;
    };
    /** @type {[RegExp, State<T>][]} jr */
    jr: [RegExp, State<T>][];
    /** @type {?State<T>} jd */
    jd: State<T>;
    /** @type {?T} t */
    t: T;
    accepts: () => boolean;
    go: (input: string) => State<T>;
    has: (input: string, exactOnly: boolean) => boolean;
    ta: (inputs: string | string[], next?: T | State<T>, flags?: Flags, groups?: Collections<T>) => void;
    tr: (regexp: RegExp, next?: T | State<T>, flags?: Flags, groups?: Collections<T>) => State<T>;
    ts: (input: string | string[], next?: T | State<T>, flags?: Flags, groups?: Collections<T>) => State<T>;
    tt: (input: string, next?: T | State<T>, flags?: Flags, groups?: Collections<T>) => State<T>;
}
export namespace State {
    export { groups };
}
/**
 * Create a new token that can be emitted by the parser state machine
 * @param {string} type readable type of the token
 * @param {object} props properties to assign or override, including isLink = true or false
 * @returns {new (value: string, tokens: Token[]) => MultiToken} new token class
 */
export function createTokenClass(type: string, props: object): new (value: string, tokens: Token[]) => MultiToken;
/**
 * Find a list of linkable items in the given string.
 * @param {string} str string to find links in
 * @param {string | Opts} [type] either formatting options or specific type of
 * links to find, e.g., 'url' or 'email'
 * @param {Opts} [opts] formatting options for final output. Cannot be specified
 * if opts already provided in `type` argument
*/
export function find(str: string, type?: string | Opts, opts?: Opts): {
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
export var multi: Readonly<{
    __proto__: any;
    MultiToken: typeof MultiToken;
    Base: typeof MultiToken;
    createTokenClass: typeof createTokenClass;
    Email: new (value: string, tokens: Token[]) => MultiToken;
    Text: new (value: string, tokens: Token[]) => MultiToken;
    Nl: new (value: string, tokens: Token[]) => MultiToken;
    Url: new (value: string, tokens: Token[]) => MultiToken;
}>;
export var options: Readonly<{
    __proto__: any;
    defaults: Required<Opts>;
    Options: typeof Options;
    assign: <A, B>(target: A, properties: B) => A & B;
}>;
export var regexp: Readonly<{
    __proto__: any;
    ASCII_LETTER: RegExp;
    LETTER: RegExp;
    EMOJI: RegExp;
    EMOJI_VARIATION: RegExp;
    DIGIT: RegExp;
    SPACE: RegExp;
}>;
/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} protocol
 * @param {boolean} [optionalSlashSlash]
 */
export function registerCustomProtocol(scheme: any, optionalSlashSlash?: boolean): void;
/**
 * Register a linkify plugin
 * @param {string} name of plugin to register
 * @param {Plugin} plugin function that accepts the parser state machine and
 * extends the parser to recognize additional link types
 */
export function registerPlugin(name: string, plugin: Plugin): void;
/**
 * Register a token plugin to allow the scanner to recognize additional token
 * types before the parser state machine is constructed from the results.
 * @param {string} name of plugin to register
 * @param {TokenPlugin} plugin function that accepts the scanner state machine
 * and available scanner tokens and collections and extends the state machine to
 * recognize additional tokens or groups.
 */
export function registerTokenPlugin(name: string, plugin: TokenPlugin): void;
/**
 * @typedef {{
 * 	start: State<string>,
 * 	tokens: { groups: Collections<string> } & typeof tk
 * }} ScannerInit
 */
/**
 * @typedef {{
 * 	start: State<MultiToken>,
 * 	tokens: typeof multi
 * }} ParserInit
 */
/**
 * @typedef {(arg: { scanner: ScannerInit }) => void} TokenPlugin
 */
/**
 * @typedef {(arg: { scanner: ScannerInit, parser: ParserInit }) => void} Plugin
 */
/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */
export function reset(): void;
/**
 * Convert a String to an Array of characters, taking into account that some
 * characters like emojis take up two string indexes.
 *
 * Adapted from core-js (MIT license)
 * https://github.com/zloirock/core-js/blob/2d69cf5f99ab3ea3463c395df81e5a15b68f49d9/packages/core-js/internals/string-multibyte.js
 *
 * @function stringToArray
 * @param {string} str
 * @returns {string[]}
 */
export function stringToArray(str: string): string[];
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
declare var tk: Readonly<{
    __proto__: any;
    WORD: string;
    UWORD: string;
    LOCALHOST: string;
    TLD: string;
    UTLD: string;
    SCHEME: string;
    SLASH_SCHEME: string;
    NUM: string;
    WS: string;
    NL: string;
    OPENBRACE: string;
    OPENBRACKET: string;
    OPENANGLEBRACKET: string;
    OPENPAREN: string;
    CLOSEBRACE: string;
    CLOSEBRACKET: string;
    CLOSEANGLEBRACKET: string;
    CLOSEPAREN: string;
    AMPERSAND: string;
    APOSTROPHE: string;
    ASTERISK: string;
    AT: string;
    BACKSLASH: string;
    BACKTICK: string;
    CARET: string;
    COLON: string;
    COMMA: string;
    DOLLAR: string;
    DOT: string;
    EQUALS: string;
    EXCLAMATION: string;
    HYPHEN: string;
    PERCENT: string;
    PIPE: string;
    PLUS: string;
    POUND: string;
    QUERY: string;
    QUOTE: string;
    SEMI: string;
    SLASH: string;
    TILDE: string;
    UNDERSCORE: string;
    EMOJI: string;
    SYM: string;
}>;
declare var groups: Collections<string>;
export {};
