/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v5.0.0
  @link https://github.com/yowainwright/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.shave = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function generateArrayOfNodes(target) {
        if (typeof target === 'string') {
            return __spreadArray([], __read(document.querySelectorAll(target)), false);
        }
        else if ('length' in target) {
            return __spreadArray([], __read(target), false);
        }
        else {
            return [target];
        }
    }
    function shave(target, maxHeight, opts) {
        if (opts === void 0) { opts = {}; }
        if (typeof maxHeight === 'undefined' || isNaN(maxHeight)) {
            throw Error('maxHeight is required');
        }
        var els = generateArrayOfNodes(target);
        if (!els.length) {
            return;
        }
        var _a = opts.character, character = _a === void 0 ? '…' : _a, _b = opts.classname, classname = _b === void 0 ? 'js-shave' : _b, _c = opts.spaces, initialSpaces = _c === void 0 ? true : _c, _d = opts.charclassname, charclassname = _d === void 0 ? 'js-shave-char' : _d, _e = opts.link, link = _e === void 0 ? {} : _e;
        /**
         * @notes
         * the initialSpaces + spaces variable definition below fixes
         * a previous bug where spaces being a boolean type wasn't clear
         * meaning people were using (a string, in example—which is truthy)
         * hence, doing it this way is a non-breaking change
         */
        var spaces = typeof initialSpaces === 'boolean' ? initialSpaces : true;
        /**
         * @notes
         * - create a span or anchor element and assign properties to it
         * - JSON.stringify is used to support IE8+
         * - if link.href is not provided, link object properties are ignored
         */
        var isLink = link && JSON.stringify(link) !== '{}' && link.href;
        var shavedTextElType = isLink ? 'a' : 'span';
        for (var i = 0; i < els.length; i += 1) {
            var el = els[i];
            var styles = el.style;
            var span = el.querySelector('.' + classname);
            var textProp = el.textContent === undefined ? 'innerText' : 'textContent';
            // If element text has already been shaved
            if (span) {
                // Remove the ellipsis to recapture the original text
                el.removeChild(el.querySelector('.' + charclassname));
                el[textProp] = el[textProp]; // eslint-disable-line
                // nuke span, recombine text
            }
            var fullText = el[textProp];
            var words = spaces ? fullText.split(' ') : fullText;
            // If 0 or 1 words, we're done
            if (words.length < 2) {
                continue;
            }
            // Temporarily remove any CSS height for text height calculation
            var heightStyle = styles.height;
            styles.height = 'auto';
            var maxHeightStyle = styles.maxHeight;
            styles.maxHeight = 'none';
            // If already short enough, we're done
            if (el.offsetHeight <= maxHeight) {
                styles.height = heightStyle;
                styles.maxHeight = maxHeightStyle;
                continue;
            }
            var textContent = isLink && link.textContent ? link.textContent : character;
            var shavedTextEl = document.createElement(shavedTextElType);
            var shavedTextElAttributes = {
                className: charclassname,
                textContent: textContent,
            };
            for (var property in shavedTextElAttributes) {
                shavedTextEl[property] = shavedTextElAttributes[property];
                shavedTextEl.textContent = character;
            }
            if (isLink) {
                for (var linkProperty in link) {
                    shavedTextEl[linkProperty] = link[linkProperty];
                }
            }
            // Binary search for number of words which can fit in allotted height
            var max = words.length - 1;
            var min = 0;
            var pivot = void 0;
            while (min < max) {
                pivot = (min + max + 1) >> 1; // eslint-disable-line no-bitwise
                el[textProp] = spaces
                    ? words.slice(0, pivot).join(' ')
                    : words.slice(0, pivot);
                el.insertAdjacentElement('beforeend', shavedTextEl);
                if (el.offsetHeight > maxHeight) {
                    max = pivot - 1;
                }
                else {
                    min = pivot;
                }
            }
            el[textProp] = spaces ? words.slice(0, max).join(' ') : words.slice(0, max);
            el.insertAdjacentElement('beforeend', shavedTextEl);
            var diff = spaces
                ? " ".concat(words.slice(max).join(' '))
                : words.slice(max);
            var shavedText = document.createTextNode(diff);
            var elWithShavedText = document.createElement('span');
            elWithShavedText.classList.add(classname);
            elWithShavedText.style.display = 'none';
            elWithShavedText.appendChild(shavedText);
            el.insertAdjacentElement('beforeend', elWithShavedText);
            styles.height = heightStyle;
            styles.maxHeight = maxHeightStyle;
        }
    }

    return shave;

}));
