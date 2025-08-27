'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { AccordionContent } from "./AccordionContent.js";
import { AccordionContext } from "./AccordionContext.js";
import { AccordionSummary } from "./AccordionSummary.js";
function useAccordionId(id) {
    const generatedId = React.useId();
    const labelId = id ?? `Accordion${generatedId}`;
    const contentId = `AccordionContent${id ?? generatedId}`;
    return {
        labelId,
        contentId
    };
}
/**
 * @see https://vkui.io/components/accordion
 */ export const Accordion = ({ id, expanded: expandedProp, defaultExpanded = false, onChange: onChangeProp, children, unmountOnCollapsed = false, ...restProps })=>{
    const { labelId, contentId } = useAccordionId(id);
    const [expanded, onChange] = useCustomEnsuredControl({
        value: expandedProp,
        defaultValue: defaultExpanded,
        onChange: onChangeProp,
        disabled: restProps.disabled
    });
    const context = React.useMemo(()=>({
            labelId,
            contentId,
            expanded: expanded || false,
            unmountOnCollapsed,
            onChange
        }), [
        contentId,
        expanded,
        labelId,
        onChange,
        unmountOnCollapsed
    ]);
    return /*#__PURE__*/ _jsx(AccordionContext.Provider, {
        value: context,
        children: children
    });
};
Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(Accordion.Summary, 'Accordion.Summary');
    defineComponentDisplayNames(Accordion.Content, 'Accordion.Content');
}

//# sourceMappingURL=Accordion.js.map