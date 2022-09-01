/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v4.0.1
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /**
     * REFRAME.TS 🖼
     * ---
     * @param target
     * @param cName
     * @summary defines the height/width ratio of the targeted <element>
     */
    function reframe(target, cName) {
        var _a, _b;
        var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
        var c = cName || 'js-reframe';
        if (!('length' in frames))
            frames = [frames];
        for (var i = 0; i < frames.length; i += 1) {
            var frame = frames[i];
            var hasClass = frame.className.split(' ').indexOf(c) !== -1;
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
            div.className = c;
            var divStyles = div.style;
            divStyles.position = 'relative';
            divStyles.width = '100%';
            divStyles.paddingTop = "".concat(padding, "%");
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
        }
    }

    if (typeof window !== 'undefined') {
        var plugin = window.$ || window.jQuery || window.Zepto;
        if (plugin) {
            plugin.fn.reframe = function reframePlugin(cName) {
                reframe(this, cName);
            };
        }
    }

}));
