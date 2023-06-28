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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _accordionSummary = require("./AccordionSummary");
var Accordion = function(_param) /*#__PURE__*/ {
    var getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "getRootRef",
        "className"
    ]);
    return _react.createElement("details", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiAccordion", className),
        ref: getRootRef
    }, restProps));
};
Accordion.Summary = _accordionSummary.AccordionSummary;

//# sourceMappingURL=Accordion.js.map