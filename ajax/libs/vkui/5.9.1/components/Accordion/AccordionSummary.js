import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24ChevronDown, Icon24ChevronUp } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { SimpleCell } from "../SimpleCell/SimpleCell";
/**
 * Обертка над summary.
 *
 * @since 5.3.0
 * @see  https://vkcom.github.io/VKUI/#/Accordion
 */ export var AccordionSummary = function(_param) {
    var className = _param.className, after = _param.after, before = _param.before, _param_ExpandIcon = _param.ExpandIcon, ExpandIcon = _param_ExpandIcon === void 0 ? Icon24ChevronDown : _param_ExpandIcon, _param_CollapseIcon = _param.CollapseIcon, CollapseIcon = _param_CollapseIcon === void 0 ? Icon24ChevronUp : _param_CollapseIcon, _param_iconPosition = _param.iconPosition, iconPosition = _param_iconPosition === void 0 ? "after" : _param_iconPosition, children = _param.children, restProps = _object_without_properties(_param, [
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
    /*#__PURE__*/ React.createElement("span", {
        className: "vkuiIcon"
    }, /*#__PURE__*/ React.createElement(ExpandIcon, {
        className: classNames("vkuiAccordionSummary__icon", "vkuiAccordionSummary__icon--expand")
    }), /*#__PURE__*/ React.createElement(CollapseIcon, {
        className: classNames("vkuiAccordionSummary__icon", "vkuiAccordionSummary__icon--collapse")
    }));
    return /*#__PURE__*/ React.createElement(SimpleCell, _object_spread({
        className: classNames("vkuiAccordionSummary", className),
        Component: "summary",
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, iconPosition === "before" && accordionIcon, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, after, iconPosition === "after" && accordionIcon)
    }, restProps), children);
};

//# sourceMappingURL=AccordionSummary.js.map