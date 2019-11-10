(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.VNodeFlags = factory());
}(this, (function () { 'use strict';

    /**
     * @module Inferno-Vnode-Flags
     */ /** TypeDoc Comment */
    var VNodeFlags;
    (function (VNodeFlags) {
        VNodeFlags[VNodeFlags["HtmlElement"] = 1] = "HtmlElement";
        VNodeFlags[VNodeFlags["ComponentClass"] = 2] = "ComponentClass";
        VNodeFlags[VNodeFlags["ComponentFunction"] = 4] = "ComponentFunction";
        VNodeFlags[VNodeFlags["ComponentUnknown"] = 8] = "ComponentUnknown";
        VNodeFlags[VNodeFlags["HasKeyedChildren"] = 16] = "HasKeyedChildren";
        VNodeFlags[VNodeFlags["HasNonKeyedChildren"] = 32] = "HasNonKeyedChildren";
        VNodeFlags[VNodeFlags["SvgElement"] = 64] = "SvgElement";
        VNodeFlags[VNodeFlags["MediaElement"] = 128] = "MediaElement";
        VNodeFlags[VNodeFlags["InputElement"] = 256] = "InputElement";
        VNodeFlags[VNodeFlags["TextareaElement"] = 512] = "TextareaElement";
        VNodeFlags[VNodeFlags["SelectElement"] = 1024] = "SelectElement";
        VNodeFlags[VNodeFlags["Void"] = 2048] = "Void";
        VNodeFlags[VNodeFlags["FormElement"] = 1792] = "FormElement";
        VNodeFlags[VNodeFlags["Element"] = 1985] = "Element";
        VNodeFlags[VNodeFlags["Component"] = 14] = "Component";
    })(VNodeFlags || (VNodeFlags = {}));
    var VNodeFlags$1 = VNodeFlags;

    return VNodeFlags$1;

})));
