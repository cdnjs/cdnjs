/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v3.0.2
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    /* noframe.js () 🖼
      -------------
      takes 2 arguments:
      => target: targeted <element>
      => container: optional targeted <parent> of targeted <element>
      -------------
      defines the height/width ratio of the targeted <element>
      based on the targeted <parent> width
    */
    function noframe(target, container) {
        var frames = typeof target === 'string' ? __spreadArrays(document.querySelectorAll(target)) : 'length' in target ? __spreadArrays(target) : [target];
        return frames.forEach(function (frame) {
            var isContainerElement = typeof container !== 'undefined' && document.querySelector(container);
            var parent = isContainerElement ? document.querySelector(container) : frame.parentElement;
            var h = frame.offsetHeight;
            var w = frame.offsetWidth;
            var styles = frame.style;
            // => If a targeted <container> element is defined
            if (isContainerElement) {
                // gets/sets the height/width ratio
                var maxW = window.getComputedStyle(parent, null).getPropertyValue('max-width');
                styles.width = '100%';
                // calc is needed here b/c the maxW measurement type is unknown
                styles.maxHeight = "calc(" + maxW + " * " + h + " / " + w + ")";
            }
            else {
                // gets/sets the height/width ratio
                // => if a targeted <element> closest parent <element> is NOT defined
                styles.display = 'block';
                styles.marginLeft = 'auto';
                styles.marginRight = 'auto';
                var fullW = w > parent.offsetWidth ? parent.offsetWidth : w;
                var maxH = w > parent.offsetWidth ? (fullW * h) / w : w * (h / w);
                // if targeted <element> width is > than it's parent <element>
                // => set the targeted <element> maxheight/fullwidth to it's parent <element>
                styles.maxHeight = maxH + "px";
                styles.width = fullW + "px";
            }
            // set a calculated height of the targeted <element>
            var cssHeight = (100 * h) / w; // eslint-disable-line no-mixed-operators
            styles.height = cssHeight + "vw";
            styles.maxWidth = '100%';
        });
    }

    if (typeof window !== 'undefined') {
        var plugin = window.$ || window.jQuery || window.Zepto;
        if (plugin) {
            plugin.fn.noframe = function noframePlugin(cName) {
                noframe(this, cName);
            };
        }
    }

})));
