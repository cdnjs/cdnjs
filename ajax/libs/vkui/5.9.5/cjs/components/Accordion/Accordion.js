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
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _RootComponent = require("../RootComponent/RootComponent");
var _AccordionSummary = require("./AccordionSummary");
var Accordion = function(props) {
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "details",
        baseClassName: "vkuiAccordion"
    }, props));
};
Accordion.Summary = _AccordionSummary.AccordionSummary;

//# sourceMappingURL=Accordion.js.map