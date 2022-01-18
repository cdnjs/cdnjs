/*! rasterizeHTML.js - v1.3.1 - 2022-01-16
* http://www.github.com/cburgmer/rasterizeHTML.js
* Copyright (c) 2022 Christoph Burgmer; Licensed MIT */
export as namespace rasterizeHTML;

/**
 * Option key/value pairs that can be passed to any of the draw functions.
 */
export interface Options {
    /**
     * The width of the viewport, by default the width of the canvas, or '300' if
     * not provided.
     */
    width?: number;

    /**
     * The height of the viewport, by default the height of the canvas, or '200'
     * if not provided.
     */
    height?: number;

    /**
     * The URL base of the HTML document which relative resources will be based
     * on, default: null.
     */
    baseUrl?: string;

    /**
     * If set to true, it will execute JavaScript in the page/HTML string and wait
     * for the onload event before drawing the content (not available for
     * drawDocument), default: false.
     */
    executeJs?: boolean;

    /**
     * Will wait the given amount of milliseconds before interrupting the
     * execution of JavaScript. Will also wait if no script is running, default:
     * 0.
     */
    executeJsTimeout?: number;

    /**
     * A factor to zoom the displayed content by, default: 1 (see limitations for
     * zooming at https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).
     */
    zoom?: number;

    /**
     * A selector whose matched element receives a simulated mouse hover to match
     * :hover style rules, default: null (see limitations for pseudo-class
     * styles at https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).
     */
    hover?: string;

    /**
     * A selector whose matched element receives a simulated user activation to
     * match :active style rules, default: null (see limitations for pseudo-class
     * styles at https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).
     */
    active?: string;

    /**
     * A selector whose matched element receives a simulated focus to match :focus
     * style rules, default: null (see limitations for pseudo-class styles at
     * https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).
     */
    focus?: string;

    /**
     * A selector whose matched element receives a simulated target activation to
     * match :target style rules, default: null (see limitations for pseudo-class
     * styles at https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).
     */
    target?: string;

    /**
     * Allows fine-tuning caching behavior:
     * - 'none' forces requested pages not to be cached by the browser by adding a
     * unique query string in the form of "?_=[timestamp]" to each request,
     * - 'repeated' forces a non-cached load for initial calls, while allowing the
     * browser to cache repeated calls to the same URL,
     * - 'all' will not employ any cache busting (default).
     */
    cache?: "none" | "repeated" | "all";

    /**
     * An object holding the library's own in-memory cache. Only effective in
     * reuse between several calls to the API and cache set to some value other
     * than none. Should be initialized with {}.
     */
    cacheBucket?: {};
}

/** Describes a resource that failed to load during drawing. */
export interface Resource {
    /**
     * The type of the resource. Resource types include:
     * - image: an <img href=""> or <input type="image" src="">
     * - stylesheet: a <link rel="stylesheet" href=""> or @import url("")
     * - backgroundImage: a background-image: url("")
     * - fontFace: a @font-face { src: url("") }
     * - script: a <script src=""> scriptExecution a script execution error
     *   message (no url specified)
     */
    resourceType:
        | "image"
        | "stylesheet"
        | "backgroundImage"
        | "fontFace"
        | "script";

    /** The URL of the resource. */
    url: string;

    /** A human readable message. */
    msg: string;
}

/**
 * Render results object passed to the success function of the promise returned
 * from any of the draw functions.
 */
export interface RenderResult {
    /**
     * The resulting image rendered to the canvas. If content overflows the
     * specified viewport (defined by the width and height parameters or the
     * canvas element's size) the image will have greater dimensions.
     */
    image: HTMLImageElement;

    /** The internal SVG representation of the rendered content. */
    svg: SVGElement;

    /** A list of resources that failed to load. */
    errors: Resource[];
}

/**
 * An error description passed to the error function of the promise returned
 * from any of the draw functions.
 */
export interface Error {
    /**
     * Describes the error. Can be, amongst others:
     * - "Unable to load page" if the URL passed to drawURL could not be loaded,
     * - "Error rendering page" general error if the whole document failed to
     *   render,
     * - "Invalid source" if the source has invalid syntax (and more specifically
     *   cannot be converted into the intermediate XHTML format needed to render
     *   the HTML).
     */
    message: string;

    /**
     * The optional field originalError provides the underlying error, with more
     * details.
     */
    originalError?: any;
}

/**
 * Draw a page to the canvas.    The general call pattern is:
 * @example
 * ```
 * rasterizeHTML.drawHTML(html, canvas, options)
 *     .then(function success(renderResult: RenderResult) {
 *         ...
 *     }, function error(e: Error) {
 *         ...
 *     });
 * ```
 * @param html a string of HTML to draw
 * @param canvas an HTML5 canvas node
 * @param options key/value pairs of further options
 * @return a promise that is fulfilled once the content is rendered or rejected
 *    if drawing the provided item failed.
 */
export function drawHTML(
    html: string,
    canvas: HTMLCanvasElement,
    options?: Options
): Promise<RenderResult>;

/**
 * Draw a HTML string to the canvas.    The general call pattern is:
 * @example
 * ```
 * rasterizeHTML.drawURL(url, canvas, options)
 *     .then(function success(renderResult: RenderResult) {
 *         ...
 *     }, function error(e: Error) {
 *         ...
 *     });
 * ```
 * @param url URL of the document to draw
 * @param canvas an HTML5 canvas node
 * @param options key/value pairs of further options
 * @return a promise that is fulfilled once the content is rendered or rejected
 *    if drawing the provided item failed.
 */
export function drawURL(
    url: string,
    canvas: HTMLCanvasElement,
    options?: Options
): Promise<RenderResult>;

/**
 * Draw a Document to the canvas.    The general call pattern is:
 * @example
 * ```
 * rasterizeHTML.drawDocument(document, canvas, options)
 *     .then(function success(renderResult: RenderResult) {
 *         ...
 *     }, function error(e: Error) {
 *         ...
 *     });
 * ```
 * @param document a Document object to draw
 * @param canvas an HTML5 canvas node
 * @param options key/value pairs of further options
 * @return a promise that is fulfilled once the content is rendered or rejected
 *    if drawing the provided item failed.
 */
export function drawDocument(
    document: Document,
    canvas: HTMLCanvasElement,
    options?: Options
): Promise<RenderResult>;
