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
        /* First set of bits define shape of vNode */
        VNodeFlags[VNodeFlags["HtmlElement"] = 1] = "HtmlElement";
        VNodeFlags[VNodeFlags["ComponentUnknown"] = 2] = "ComponentUnknown";
        VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
        VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
        VNodeFlags[VNodeFlags["Text"] = 16] = "Text";
        /* Special flags */
        VNodeFlags[VNodeFlags["SvgElement"] = 32] = "SvgElement";
        VNodeFlags[VNodeFlags["MediaElement"] = 64] = "MediaElement";
        VNodeFlags[VNodeFlags["InputElement"] = 128] = "InputElement";
        VNodeFlags[VNodeFlags["TextareaElement"] = 256] = "TextareaElement";
        VNodeFlags[VNodeFlags["SelectElement"] = 512] = "SelectElement";
        VNodeFlags[VNodeFlags["Void"] = 1024] = "Void";
        VNodeFlags[VNodeFlags["Portal"] = 2048] = "Portal";
        VNodeFlags[VNodeFlags["ReCreate"] = 4096] = "ReCreate";
        VNodeFlags[VNodeFlags["Ignore"] = 8192] = "Ignore";
        /* Masks */
        VNodeFlags[VNodeFlags["FormElement"] = 896] = "FormElement";
        VNodeFlags[VNodeFlags["Element"] = 993] = "Element";
        VNodeFlags[VNodeFlags["Component"] = 14] = "Component";
        VNodeFlags[VNodeFlags["VNodeShape"] = 2045] = "VNodeShape";
    })(exports.VNodeFlags || (exports.VNodeFlags = {}));

    (function (ChildFlags) {
        /* Second set of bits define shape of children */
        ChildFlags[ChildFlags["HasInvalidChildren"] = 1] = "HasInvalidChildren";
        ChildFlags[ChildFlags["HasVNodeChildren"] = 2] = "HasVNodeChildren";
        ChildFlags[ChildFlags["HasNonKeyedChildren"] = 4] = "HasNonKeyedChildren";
        ChildFlags[ChildFlags["HasKeyedChildren"] = 8] = "HasKeyedChildren";
        ChildFlags[ChildFlags["MultipleChildren"] = 12] = "MultipleChildren";
    })(exports.ChildFlags || (exports.ChildFlags = {}));

    Object.defineProperty(exports, '__esModule', { value: true });

})));
