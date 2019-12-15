(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = global.Inferno || {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Vnode-Flags
     */ /** TypeDoc Comment */
    /* If editing these values check babel-plugin-also */

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
        VNodeFlags[VNodeFlags["Portal"] = 8192] = "Portal";
        VNodeFlags[VNodeFlags["ReCreate"] = 16384] = "ReCreate";
        VNodeFlags[VNodeFlags["Ignore"] = 32768] = "Ignore";
        VNodeFlags[VNodeFlags["MultipleChildren"] = 96] = "MultipleChildren";
        VNodeFlags[VNodeFlags["FormElement"] = 3584] = "FormElement";
        VNodeFlags[VNodeFlags["Element"] = 3970] = "Element";
        VNodeFlags[VNodeFlags["Component"] = 28] = "Component";
    })(exports.VNodeFlags || (exports.VNodeFlags = {}));

    Object.defineProperty(exports, '__esModule', { value: true });

})));
