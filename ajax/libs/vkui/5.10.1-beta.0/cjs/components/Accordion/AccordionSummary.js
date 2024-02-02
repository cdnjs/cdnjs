"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccordionSummary", {
    enumerable: true,
    get: function() {
        return AccordionSummary;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var AccordionSummary = function(_param) {
    var className = _param.className, after = _param.after, before = _param.before, _param_ExpandIcon = _param.ExpandIcon, ExpandIcon = _param_ExpandIcon === void 0 ? _icons.Icon24ChevronDown : _param_ExpandIcon, _param_CollapseIcon = _param.CollapseIcon, CollapseIcon = _param_CollapseIcon === void 0 ? _icons.Icon24ChevronUp : _param_CollapseIcon, _param_iconPosition = _param.iconPosition, iconPosition = _param_iconPosition === void 0 ? "after" : _param_iconPosition, children = _param.children, restProps = _object_without_properties._(_param, [
        "className",
        "after",
        "before",
        "ExpandIcon",
        "CollapseIcon",
        "iconPosition",
        "children"
    ]);
    var accordionIcon = // Обертка нужна для правильной работы с отступами в SimpleCell
    // Без обертки на AccordionSummary__icon--collapse не будет действовать правило `last-child`
    /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiIcon"
    }, /*#__PURE__*/ _react.createElement(ExpandIcon, {
        className: (0, _vkjs.classNames)("vkuiAccordionSummary__icon", "vkuiAccordionSummary__icon--expand")
    }), /*#__PURE__*/ _react.createElement(CollapseIcon, {
        className: (0, _vkjs.classNames)("vkuiAccordionSummary__icon", "vkuiAccordionSummary__icon--collapse")
    }));
    return /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiAccordionSummary", className),
        Component: "summary",
        before: /*#__PURE__*/ _react.createElement(_react.Fragment, null, iconPosition === "before" && accordionIcon, before),
        after: /*#__PURE__*/ _react.createElement(_react.Fragment, null, after, iconPosition === "after" && accordionIcon)
    }, restProps), children);
};

//# sourceMappingURL=AccordionSummary.js.map