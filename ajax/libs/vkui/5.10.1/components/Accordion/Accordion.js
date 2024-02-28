import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { RootComponent } from "../RootComponent/RootComponent";
import { AccordionSummary } from "./AccordionSummary";
/**
 * Компонент, позволяет отображать несколько разделов контента в ограниченном
 * пространстве и сворачивать или разворачивать их пользователем.
 *
 * Обертка над details.
 *
 * @since 5.3.0
 * @see https://vkcom.github.io/VKUI/#/Accordion
 */ export var Accordion = function(props) {
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "details",
        baseClassName: "vkuiAccordion"
    }, props));
};
Accordion.Summary = AccordionSummary;

//# sourceMappingURL=Accordion.js.map