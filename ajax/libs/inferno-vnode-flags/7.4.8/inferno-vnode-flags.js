(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inferno = global.Inferno || {}));
}(this, (function (exports) { 'use strict';

  /* If editing these values check babel-plugin-also */
  exports.VNodeFlags = void 0;
  (function (VNodeFlags) {
      /* First set of bits define shape of vNode */
      VNodeFlags[VNodeFlags["HtmlElement"] = 1] = "HtmlElement";
      VNodeFlags[VNodeFlags["ComponentUnknown"] = 2] = "ComponentUnknown";
      VNodeFlags[VNodeFlags["ComponentClass"] = 4] = "ComponentClass";
      VNodeFlags[VNodeFlags["ComponentFunction"] = 8] = "ComponentFunction";
      VNodeFlags[VNodeFlags["Text"] = 16] = "Text";
      /* Special flags */
      VNodeFlags[VNodeFlags["SvgElement"] = 32] = "SvgElement";
      VNodeFlags[VNodeFlags["InputElement"] = 64] = "InputElement";
      VNodeFlags[VNodeFlags["TextareaElement"] = 128] = "TextareaElement";
      VNodeFlags[VNodeFlags["SelectElement"] = 256] = "SelectElement";
      VNodeFlags[VNodeFlags["Void"] = 512] = "Void";
      VNodeFlags[VNodeFlags["Portal"] = 1024] = "Portal";
      VNodeFlags[VNodeFlags["ReCreate"] = 2048] = "ReCreate";
      VNodeFlags[VNodeFlags["ContentEditable"] = 4096] = "ContentEditable";
      VNodeFlags[VNodeFlags["Fragment"] = 8192] = "Fragment";
      VNodeFlags[VNodeFlags["InUse"] = 16384] = "InUse";
      VNodeFlags[VNodeFlags["ForwardRef"] = 32768] = "ForwardRef";
      VNodeFlags[VNodeFlags["Normalized"] = 65536] = "Normalized";
      /* Masks */
      VNodeFlags[VNodeFlags["ForwardRefComponent"] = 32776] = "ForwardRefComponent";
      VNodeFlags[VNodeFlags["FormElement"] = 448] = "FormElement";
      VNodeFlags[VNodeFlags["Element"] = 481] = "Element";
      VNodeFlags[VNodeFlags["Component"] = 14] = "Component";
      VNodeFlags[VNodeFlags["DOMRef"] = 2033] = "DOMRef";
      VNodeFlags[VNodeFlags["InUseOrNormalized"] = 81920] = "InUseOrNormalized";
      VNodeFlags[VNodeFlags["ClearInUse"] = -16385] = "ClearInUse";
      VNodeFlags[VNodeFlags["ComponentKnown"] = 12] = "ComponentKnown";
  })(exports.VNodeFlags || (exports.VNodeFlags = {}));
  // Combinations are not possible, its bitwise only to reduce vNode size
  exports.ChildFlags = void 0;
  (function (ChildFlags) {
      ChildFlags[ChildFlags["UnknownChildren"] = 0] = "UnknownChildren";
      /* Second set of bits define shape of children */
      ChildFlags[ChildFlags["HasInvalidChildren"] = 1] = "HasInvalidChildren";
      ChildFlags[ChildFlags["HasVNodeChildren"] = 2] = "HasVNodeChildren";
      ChildFlags[ChildFlags["HasNonKeyedChildren"] = 4] = "HasNonKeyedChildren";
      ChildFlags[ChildFlags["HasKeyedChildren"] = 8] = "HasKeyedChildren";
      ChildFlags[ChildFlags["HasTextChildren"] = 16] = "HasTextChildren";
      ChildFlags[ChildFlags["MultipleChildren"] = 12] = "MultipleChildren";
  })(exports.ChildFlags || (exports.ChildFlags = {}));

  Object.defineProperty(exports, '__esModule', { value: true });

})));
