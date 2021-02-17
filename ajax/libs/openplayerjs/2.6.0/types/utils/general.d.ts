/**
 * Get the complete URL of a relative path.
 *
 * @export
 * @param {string} url
 * @returns {string}
 */
export declare function getAbsoluteUrl(url: string): string;
/**
 * Determine if element is a video element.
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export declare function isVideo(element: Element): boolean;
/**
 * Determine if element is a audio element.
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export declare function isAudio(element: Element): boolean;
/**
 * Load an external script using Promises
 *
 * @export
 * @param {string} url
 * @returns {Promise}
 */
export declare function loadScript(url: string): Promise<unknown>;
/**
 * Remove a node using removeChild as a way to support IE11
 *
 * @export
 * @param {Node} node
 * @returns {void}
 */
export declare function removeElement(node?: Node): void;
/**
 * Perform an asynchronous (AJAX) request.
 *
 * @export
 * @param {string} url
 * @param {string} dataType
 * @param {function} success
 * @param {function} error
 */
export declare function request(url: string, dataType: string, success: (n: any) => any, error?: (n: any) => any): void;
/**
 * Determine if element has a specific class.
 *
 * @export
 * @param {HTMLElement} target  The target element.
 * @param {string} className   The class to search in the `class` attribute.
 * @returns {boolean}
 */
export declare function hasClass(target: HTMLElement, className: string): boolean;
/**
 * Obtain the top/left offset values of an element.
 *
 * @export
 * @param {HTMLElement} el  The target element.
 * @returns {object}
 */
export declare function offset(el: HTMLElement): {
    left: number;
    top: number;
};
/**
 * Determine if string is a valid XML structure.
 *
 * @export
 * @param {string} input
 * @returns {boolean}
 */
export declare function isXml(input: string): boolean;
