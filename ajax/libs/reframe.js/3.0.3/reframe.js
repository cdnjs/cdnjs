/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v3.0.2
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.reframe = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * REFRAME.TS 🖼
     * ---
     * @param target
     * @param cName
     * @summary defines the height/width ratio of the targeted <element>
     */
    function reframe(target, cName) {
        if (cName === void 0) { cName = 'js-reframe'; }
        var frames = typeof target === 'string' ? __spreadArrays(document.querySelectorAll(target)) : 'length' in target ? __spreadArrays(target) : [target];
        return frames.forEach(function (frame) {
            var _a, _b;
            var hasClass = frame.className.split(' ').indexOf(cName) !== -1;
            if (hasClass || frame.style.width.indexOf('%') > -1) {
                return;
            }
            // get height width attributes
            var height = frame.getAttribute('height') || frame.offsetHeight;
            var width = frame.getAttribute('width') || frame.offsetWidth;
            var heightNumber = typeof height === 'string' ? parseInt(height) : height;
            var widthNumber = typeof width === 'string' ? parseInt(width) : width;
            // general targeted <element> sizes
            var padding = (heightNumber / widthNumber) * 100;
            // created element <wrapper> of general reframed item
            // => set necessary styles of created element <wrapper>
            var div = document.createElement('div');
            div.className = cName;
            var divStyles = div.style;
            divStyles.position = 'relative';
            divStyles.width = '100%';
            divStyles.paddingTop = padding + "%";
            // set necessary styles of targeted <element>
            var frameStyle = frame.style;
            frameStyle.position = 'absolute';
            frameStyle.width = '100%';
            frameStyle.height = '100%';
            frameStyle.left = '0';
            frameStyle.top = '0';
            // reframe targeted <element>
            (_a = frame.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(div, frame);
            (_b = frame.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(frame);
            div.appendChild(frame);
        });
    }

    return reframe;

})));
