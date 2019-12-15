
/*!
 * Inferno.VNodeFlags v3.0.0
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Inferno = global.Inferno || {}, global.Inferno.VNodeFlags = factory());
}(this, (function () { 'use strict';

var VNodeFlags;
(function (VNodeFlags) {
    VNodeFlags[VNodeFlags["Text"] = 1] = "Text";
    VNodeFlags[VNodeFlags["HtmlElement"] = 2] = "HtmlElement";
    VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
    VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
    VNodeFlags[VNodeFlags["ComponentUnknown"] = 16] = "ComponentUnknown";
    VNodeFlags[VNodeFlags["HasKeyedChildren"] = 32] = "HasKeyedChildren";
    VNodeFlags[VNodeFlags["HasNonKeyedChildren"] = 64] = "HasNonKeyedChildren";
    VNodeFlags[VNodeFlags["SvgElement"] = 128] = "SvgElement";
    VNodeFlags[VNodeFlags["MediaElement"] = 256] = "MediaElement";
    VNodeFlags[VNodeFlags["InputElement"] = 512] = "InputElement";
    VNodeFlags[VNodeFlags["TextareaElement"] = 1024] = "TextareaElement";
    VNodeFlags[VNodeFlags["SelectElement"] = 2048] = "SelectElement";
    VNodeFlags[VNodeFlags["Void"] = 4096] = "Void";
    VNodeFlags[VNodeFlags["FormElement"] = 3584] = "FormElement";
    VNodeFlags[VNodeFlags["Element"] = 3970] = "Element";
    VNodeFlags[VNodeFlags["Component"] = 28] = "Component";
})(VNodeFlags || (VNodeFlags = {}));
var VNodeFlags$1 = VNodeFlags;

return VNodeFlags$1;

})));
