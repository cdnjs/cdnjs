import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { AccordionSummary } from "./AccordionSummary";
/**
 * Компонент, позволяет отображать несколько разделов контента в ограниченном
 * пространстве и сворачивать или разворачивать их пользователем.
 *
 * Обертка над details.
 *
 * @since 5.3.0
 * @see https://vkcom.github.io/VKUI/#/Accordion
 */ export var Accordion = function(_param) /*#__PURE__*/ {
    var getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "getRootRef",
        "className"
    ]);
    return React.createElement("details", _object_spread({
        className: classNames("vkuiAccordion", className),
        ref: getRootRef
    }, restProps));
};
Accordion.Summary = AccordionSummary;

//# sourceMappingURL=Accordion.js.map