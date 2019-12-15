/* flatpickr v4.0.3, @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.labelPlugin = factory());
}(this, (function () { 'use strict';

function labelPlugin() {
    return function (fp) {
        return {
            onReady: function () {
                var id = fp.input.id;
                if (fp.altInput && id) {
                    fp.input.removeAttribute("id");
                    fp.altInput.id = id;
                }
            },
        };
    };
}

return labelPlugin;

})));
