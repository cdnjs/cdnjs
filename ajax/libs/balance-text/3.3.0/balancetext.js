/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. *
 */
/**
 * balancetext.js
 *
 * Author: Randy Edmunds
 */

/* global define, module */

/*
 * Copyright (c) 2007-2009 unscriptable.com and John M. Hann
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name(s) of the above
 * copyright holders (unscriptable.com and John M. Hann) shall not be
 * used in advertising or otherwise to promote the sale, use or other
 * dealings in this Software without prior written authorization.
 *
 * http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 *
 * Tested to work on (lowest browser):
 * - Sarari 4
 * - Chrome 16
 * - Firefox 10
 * - IE 9
 * - Edge 13
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.balanceText = factory();
    }
}(this, () => {
    /**
     * Line breaking global vars
     */
    let breakMatches, wsnwMatches, wsnwOffset;

    /**
     * Selectors and elements to watch;
     * calling $.balanceText(elements) adds "elements" to this list.
     */
    const watching = {
        sel: [], // default class to watch
        el: [],
    };

    /**
     * Have handlers been initialized?
     */
    let handlersInitialized = false;

    /**
     * Is this a polyfill?
     */
    let polyfilled = false;


    /**
     * Do nothing
     */
    function noop() { }

    /**
     * Loop that works with array-likes
     * @param {Array-like} elements - List of elements to run a function on
     * @param {Function}   callback - The function to call on each supplied element
     */
    function forEach(elements, callback) {
        Array.prototype.forEach.call(elements, callback);
    }

    /**
     * Polyfill for $(document).ready()
     *
     * @param {Function} fn - The function to execute when the document is ready
     */
    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            document.attachEvent("onreadystatechange", () => {
                if (document.readyState !== "loading") {
                    fn();
                }
            });
        }
    }

    /**
     * Debounces a function over a threshold
     *
     * @param {Function} func      - The function to debounce
     * @param {number}   threshold - time in ms
     * @param {boolean}  execAsap  - when true, execute immediately
     * @param args
     * @return {Function} Debounced function
     */
    function debounce(func, threshold, execAsap, ...args) {
        let timeout;

        return function () {
            const obj = this;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null;
            }

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }
            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    /**
     * Determine whether the document supports TextWrap
     * @return {boolean}
     */
    function hasTextWrap() {
        if (typeof window === "undefined") {
            return false;
        }
        const { style } = document.documentElement;
        return style.textWrap || style.WebkitTextWrap || style.MozTextWrap || style.MsTextWrap;
    }

    /**
     * Object for tracking next whitespace params
     */
    // eslint-disable-next-line camelcase
    function NextWS_params() {
        this.reset();
    }

    NextWS_params.prototype.reset = function () {
        this.index = 0;
        this.width = 0;
    };

    /**
     * Check if index is contained in previously calculated list of white-space:nowrap ranges
     *
     * @param {number} index - the index of the character to check
     * @return {boolean}
     */
    function isWhiteSpaceNoWrap(index) {
        // Is index inside 1 of the ranges?
        // start and end are breakable, but not inside range
        return wsnwMatches.some(range => (range.start < index && index < range.end));
    }

    /**
     * Recursively calculate white-space:nowrap offsets for line.
     *
     * @param {Node}    el         - the element to act on
     * @param {boolean} includeTag - include length of tag itself
     */
    function recursiveCalcNoWrapOffsetsForLine(el, includeTag) {
        if (el.nodeType === el.ELEMENT_NODE) {
            // Found an embedded tag
            const style = window.getComputedStyle(el);
            if (style.whiteSpace === "nowrap") {
                // Tag with white-space:nowrap - add match, skip children
                const len = el.outerHTML.length;
                wsnwMatches.push({ start: wsnwOffset, end: wsnwOffset + len });
                wsnwOffset += len;
            } else {
                // Tag without white-space:nowrap - recursively check children of tag
                forEach(el.childNodes, (child) => {
                    recursiveCalcNoWrapOffsetsForLine(child, true);
                });
                if (includeTag) {
                    // Length of opening tag, attributes, and closing tag
                    wsnwOffset += (el.outerHTML.length - el.innerHTML.length);
                }
            }
        } else if (el.nodeType === el.COMMENT_NODE) {
            wsnwOffset += el.length + 7; // delimiter: <!-- -->
        } else if (el.nodeType === el.PROCESSING_INSTRUCTION_NODE) {
            wsnwOffset += el.length + 2; // delimiter: < >
        } else {
            // Text node: add length
            wsnwOffset += el.length;
        }
    }

    /**
     * Calculate white-space:nowrap offsets for line.
     *
     * @param {Node}    el             - the element to act on
     * @param {string}  oldWS          - "old" whitespace setting for temporarily resetting
     * @param {number}  lineCharOffset - char offset of current line from start of text
     */
    function calcNoWrapOffsetsForLine(el, oldWS, lineCharOffset) {
        // For first line (lineCharOffset === 0), calculate start and end offsets for each
        // white-space:nowrap element in the line.
        if (lineCharOffset === 0) {
            // Reset whiteSpace setting when breakMatches is being calculated
            // so white-space:nowrap can be detected in text
            el.style.whiteSpace = oldWS;

            wsnwOffset = 0;
            wsnwMatches = [];
            recursiveCalcNoWrapOffsetsForLine(el, false);

            // Restore temporary whitespace setting to recalc width
            el.style.whiteSpace = "nowrap";
        } else {
            // For all other lines, update the offsets for current line
            // 1. Ignore matches less than offset
            // 2. Subtract offset from remaining matches
            const newMatches = [];
            wsnwMatches.forEach((match) => {
                if (match.start > lineCharOffset) {
                    newMatches.push({ start: match.start - lineCharOffset, end: match.end - lineCharOffset });
                }
            });
            wsnwMatches = newMatches;
        }
    }

    /**
     * Strip balance-text tags from an element inserted in previous run
     *
     * @param {Node} el - the element to act on
     */
    function removeTags(el) {
        // Remove soft-hyphen breaks
        let brs = el.querySelectorAll('br[data-owner="balance-text-hyphen"]');
        forEach(brs, (br) => {
            br.outerHTML = "";
        });

        // Replace other breaks with whitespace
        brs = el.querySelectorAll('br[data-owner="balance-text"]');
        forEach(brs, (br) => {
            br.outerHTML = " ";
        });

        // Restore hyphens inserted for soft-hyphens
        let spans = el.querySelectorAll('span[data-owner="balance-text-softhyphen"]');
        if (spans.length > 0) {
            forEach(spans, (span) => {
                const textNode = document.createTextNode("\u00ad");
                span.parentNode.insertBefore(textNode, span);
                span.parentNode.removeChild(span);
            });
        }

        // Remove spans inserted for justified text
        spans = el.querySelectorAll('span[data-owner="balance-text-justify"]');
        if (spans.length > 0) {
            let txt = "";
            forEach(spans, (span) => {
                txt += span.textContent;
                span.parentNode.removeChild(span);
            });
            el.innerHTML = txt;
        }
    }

    /**
     * Checks to see if we should justify the balanced text with the
     * element based on the textAlign property in the computed CSS
     *
     * @param {Node} el - element to check
     * @return {boolean}
     */
    const isJustified = function (el) {
        const style = el.currentStyle || window.getComputedStyle(el, null);
        return (style.textAlign === "justify");
    };

    /**
     * Add whitespace after words in text to justify the string to
     * the specified size.
     * @param {Node}    el       - the element to justify
     * @param {string}  txt      - text string
     * @param {number}  conWidth - container width
     * @return {string} Justified text
     */
    function justify(el, txt, conWidth) {
        txt = txt.trim();
        const words = txt.split(" ").length;
        txt = `${txt} `;

        // if we don't have at least 2 words, no need to justify.
        if (words < 2) {
            return txt;
        }

        // Find width of text in the DOM
        const tmp = document.createElement("span");
        tmp.innerHTML = txt;
        el.appendChild(tmp);
        const size = tmp.offsetWidth;
        tmp.parentNode.removeChild(tmp);

        // Figure out our word spacing and return the element
        const wordSpacing = Math.floor((conWidth - size) / (words - 1));
        tmp.style.wordSpacing = `${wordSpacing}px`;
        tmp.setAttribute("data-owner", "balance-text-justify");

        const div = document.createElement("div");
        div.appendChild(tmp);
        return div.innerHTML;
    }

    /**
     * Returns true iff char at index is a break char outside of HTML < > tags.
     * Break char can be: whitespace (except non-breaking-space: u00a0),
     * hypen, emdash (u2014), endash (u2013), or soft-hyphen (u00ad).
     *
     * @param {string} txt   - the text to check
     * @param {number} index - the index of the character to check
     * @return {boolean}
     */
    function isBreakChar(txt, index) {
        const re = /([^\S\u00a0]|-|\u2014|\u2013|\u00ad)(?![^<]*>)/g;
        let match;

        if (!breakMatches) {
            // Only calc break matches once per line
            breakMatches = [];
            match = re.exec(txt);
            while (match !== null) {
                if (!isWhiteSpaceNoWrap(match.index)) {
                    breakMatches.push(match.index);
                }
                match = re.exec(txt);
            }
        }

        return breakMatches.indexOf(index) !== -1;
    }

    /**
     * In the current implementation, an index is a break
     * opportunity in txt iff it is:
     * - 0 or txt.length
     * - index of a non-whitespace char immediately preceded by a
     *   whitespace, hyphen, soft-hyphen, em-dash, or en-dash char.
     *
     * Thus, it doesn't honour "white-space" or any other Unicode
     * line-breaking classes.)
     *
     * @precondition 0 <= index && index <= txt.length
     *
     * @param {string} txt   - the text to check
     * @param {number} index - the index to check
     * @return {boolean}
     */
    function isBreakOpportunity(txt, index) {
        return ((index === 0) || (index === txt.length) ||
                (isBreakChar(txt, index - 1) && !isBreakChar(txt, index)));
    }

    /**
     * Finds the first break opportunity (@see isBreakOpportunity)
     * in txt that's both after-or-equal-to index c in the direction dir
     * and resulting in line width equal to or past clamp(desWidth,
     * 0, conWidth) in direction dir.  Sets ret.index and ret.width
     * to the corresponding index and line width (from the start of
     * txt to ret.index).
     *
     * @param {Node}    el       - element
     * @param {string}  txt      - text string
     * @param {number}  conWidth - container width
     * @param {number}  desWidth - desired width
     * @param {number}  dir      - direction (-1 or +1)
     * @param {number}  c        - char index (0 <= c && c <= txt.length)
     * @param {Object}  ret      - return {index: {number}, width: {number}} of previous/next break
     */
    function findBreakOpportunity(el, txt, conWidth, desWidth, dir, c, ret) {
        let w;

        if (txt && typeof txt === "string") {
            for (;;) {
                while (!isBreakOpportunity(txt, c)) {
                    c += dir;
                }

                el.innerHTML = txt.substr(0, c);
                w = el.offsetWidth;

                if (dir < 0) {
                    if ((w <= desWidth) || (w <= 0) || (c === 0)) {
                        break;
                    }
                } else if ((desWidth <= w) || (conWidth <= w) || (c === txt.length)) {
                    break;
                }

                c += dir;
            }
        }
        ret.index = c;
        ret.width = w;
    }

    /**
     * Detects the width of a non-breaking space character, given the height of
     * the element with no-wrap applied.
     *
     * @param {Node}   el - element
     * @param {number} h  - height
     * @return {number}
     */
    function getSpaceWidth(el, h) {
        const container = document.createElement("div");

        container.style.display = "block";
        container.style.position = "absolute";
        container.style.bottom = 0;
        container.style.right = 0;
        container.style.width = 0;
        container.style.height = 0;
        container.style.margin = 0;
        container.style.padding = 0;
        container.style.visibility = "hidden";
        container.style.overflow = "hidden";

        const space = document.createElement("span");

        space.style.fontSize = "2000px";
        space.innerHTML = "&nbsp;";

        container.appendChild(space);

        el.appendChild(container);

        const dims = space.getBoundingClientRect();
        container.parentNode.removeChild(container);

        const spaceRatio = dims.height / dims.width;

        return (h / spaceRatio);
    }

    /**
     * Get a list of elements regardless of input
     *
     * @param {string|Node|Array-like} elements - The selector to query, one or more elements
     * @return {Array<{Node}>}
     */
    function getElementsList(elements) {
        if (!elements) {
            return [];
        }

        // is selector
        if (typeof elements === "string") {
            return document.querySelectorAll(elements);
        }

        // is single element
        if (elements.tagName && elements.querySelectorAll) {
            return [elements];
        }

        return elements;
    }

    /**
     *  When a browser has native support for the text-wrap property,
     * the text balanceText plugin will let the browser handle it natively,
     * otherwise it will apply its own text balancing code.
     *
     * @param {string|Node|Array-like} elements - the list of elements to balance
     */
    function balanceText(elements) {
        forEach(getElementsList(elements), (el) => {
            // In a lower level language, this algorithm takes time
            // comparable to normal text layout other than the fact
            // that we do two passes instead of one, so we should
            // be able to do without this limit.
            const maxTextWidth = 5000;

            // strip balance-text generated tags
            removeTags(el);

            // save settings
            const oldWS = el.style.whiteSpace;
            const oldFloat = el.style.float;
            const oldDisplay = el.style.display;
            const oldPosition = el.style.position;
            const oldLH = el.style.lineHeight;

            // remove line height before measuring container size
            el.style.lineHeight = "normal";

            const containerWidth = el.offsetWidth;
            const containerHeight = el.offsetHeight;

            // temporary settings
            el.style.whiteSpace = "nowrap";
            el.style.float = "none";
            el.style.display = "inline";
            el.style.position = "static";

            let nowrapWidth = el.offsetWidth;
            const nowrapHeight = el.offsetHeight;

            // An estimate of the average line width reduction due
            // to trimming trailing space that we expect over all
            // lines other than the last.
            const spaceWidth = ((oldWS === "pre-wrap") ? 0 : getSpaceWidth(el, nowrapHeight));

            if (containerWidth > 0 &&               // prevent divide by zero
                    nowrapWidth > containerWidth && // text is more than 1 line
                    nowrapWidth < maxTextWidth) {   // text is less than arbitrary limit (make this a param?)
                let remainingText = el.innerHTML;
                let newText = "";
                let lineText = "";
                const shouldJustify = isJustified(el);
                const totLines = Math.round(containerHeight / nowrapHeight);
                let remLines = totLines;
                let lineCharOffset = 0;

                // loop vars
                let desiredWidth, guessIndex, le, ge, splitIndex, isHyphen, isSoftHyphen;

                // Determine where to break:
                while (remLines > 1) {
                    // clear whitespace match cache for each line
                    breakMatches = null;

                    // Must calc white-space:nowrap offsets before first call to findBreakOpportunity()
                    calcNoWrapOffsetsForLine(el, oldWS, lineCharOffset);

                    desiredWidth = Math.round((nowrapWidth + spaceWidth) / remLines - spaceWidth);

                    // Guessed char index
                    guessIndex = Math.round((remainingText.length + 1) / remLines) - 1;

                    le = new NextWS_params();

                    // Find a breaking space somewhere before (or equal to) desired width,
                    // not necessarily the closest to the desired width.
                    findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

                    // Find first breaking char after (or equal to) desired width.
                    ge = new NextWS_params();
                    guessIndex = le.index;
                    findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, +1, guessIndex, ge);

                    // Find first breaking char before (or equal to) desired width.
                    le.reset();
                    guessIndex = ge.index;
                    findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

                    // Find closest string to desired length
                    if (le.index === 0) {
                        splitIndex = ge.index;
                    } else if ((containerWidth < ge.width) || (le.index === ge.index)) {
                        splitIndex = le.index;
                    } else {
                        splitIndex = ((Math.abs(desiredWidth - le.width) < Math.abs(ge.width - desiredWidth))
                            ? le.index
                            : ge.index);
                    }

                    // Break string
                    lineText = remainingText.substr(0, splitIndex).replace(/\s$/, "");

                    isSoftHyphen = Boolean(lineText.match(/\u00ad$/));
                    if (isSoftHyphen) {
                        // Replace soft-hyphen causing break with explicit hyphen
                        lineText = lineText.replace(/\u00ad$/, '<span data-owner="balance-text-softhyphen">-</span>');
                    }

                    if (shouldJustify) {
                        newText += justify(el, lineText, containerWidth);
                    } else {
                        newText += lineText;
                        isHyphen = isSoftHyphen || Boolean(lineText.match(/(-|\u2014|\u2013)$/));
                        newText += isHyphen ? '<br data-owner="balance-text-hyphen" />'
                            : '<br data-owner="balance-text" />';
                    }
                    remainingText = remainingText.substr(splitIndex);
                    lineCharOffset = splitIndex;

                    // update counters
                    remLines--;
                    el.innerHTML = remainingText;
                    nowrapWidth = el.offsetWidth;
                }

                if (shouldJustify) {
                    el.innerHTML = newText + justify(el, remainingText, containerWidth);
                } else {
                    el.innerHTML = newText + remainingText;
                }
            }

            // restore settings
            el.style.whiteSpace = oldWS;
            el.style.float = oldFloat;
            el.style.display = oldDisplay;
            el.style.position = oldPosition;
            el.style.lineHeight = oldLH;
        });
    }

    /**
     * Call the balanceText plugin on elements that it's watching.
     */
    function updateWatched() {
        const selectors = watching.sel.join(",");
        const selectedElements = getElementsList(selectors);
        const elements = Array.prototype.concat.apply(watching.el, selectedElements);
        balanceText(elements);
    }

    /**
     * Initialize the events for which to re-apply BalanceText.  They are:
     * - Document ready
     * - Document full load
     * - Window resize
     */
    function initHandlers() {
        if (handlersInitialized) {
            return;
        }

        // Apply on DOM ready
        ready(updateWatched);

        // Reapply on full load
        window.addEventListener("load", updateWatched);

        // Reapply on resize
        window.addEventListener("resize", debounce(updateWatched));

        handlersInitialized = true;
    }

    /**
     * Apply the BalanceText routine on the document and watch the list
     * of elements.  On window resize, re-apply BalanceText to the given elements
     *
     * @param {string|Node|Array-like} elements - the elements to watch after applying BalanceText
     */
    function balanceTextAndWatch(elements) {
        if (typeof elements === "string") {
            watching.sel.push(elements);
        } else {
            forEach(getElementsList(elements), (el) => {
                watching.el.push(el);
            });
        }

        initHandlers();
        updateWatched();
    }

    /**
     * Stop watching elements
     *
     * @param {string|Node|Array-like} elements
     */
    function unwatch(elements) {
        if (typeof elements === "string") {
            watching.sel = watching.sel.filter(el => el !== elements);
        } else {
            elements = getElementsList(elements);
            watching.el = watching.el.filter(el => elements.indexOf(el) === -1);
        }
    }

    /**
     * Treat this app as a polyfill.  Watch for changes to the .balance-text selector
     */
    function polyfill() {
        if (polyfilled) {
            return;
        }

        watching.sel.push(".balance-text");
        initHandlers();
        polyfilled = true;
    }

    /**
     * Public interface
     *
     * @param {string|Node|Array-like} elements - elements to balance
     * @param {Object}                 options  - processing options
     *  - {boolean} watch - watch elements for resize
     */
    function publicInterface(elements, options) {
        if (!elements) {
            // empty call means polyfill (watch for changes)
            polyfill();
        } else if (options && options.watch === true) {
            balanceTextAndWatch(elements);
        } else if (options && options.watch === false) {
            unwatch(elements);
        } else {
            balanceText(elements);
        }
    }

    publicInterface.updateWatched = updateWatched;

    if (hasTextWrap()) {
        noop.updateWatched = noop;
        return noop;
    }
    return publicInterface;
}));
