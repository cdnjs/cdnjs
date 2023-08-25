"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Accordion", {
    enumerable: true,
    get: function() {
        return Accordion;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AccordionSummary = require("./AccordionSummary");
var Accordion = function(_param) /*#__PURE__*/ {
    var getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "className"
    ]);
    return _react.createElement("details", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiAccordion", className),
        ref: getRootRef
    }, restProps));
};
Accordion.Summary = _AccordionSummary.AccordionSummary;

//# sourceMappingURL=Accordion.js.map