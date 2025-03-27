'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
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
export const Accordion = ({ id, expanded: expandedProp, defaultExpanded = false, onChange: onChangeProp, children, ...restProps })=>{
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
            onChange
        }), [
        contentId,
        expanded,
        labelId,
        onChange
    ]);
    return /*#__PURE__*/ _jsx(AccordionContext.Provider, {
        value: context,
        children: children
    });
};
Accordion.displayName = 'Accordion';
Accordion.Summary = AccordionSummary;
Accordion.Summary.displayName = 'Accordion.Summary';
Accordion.Content = AccordionContent;
Accordion.Content.displayName = 'Accordion.Content';

//# sourceMappingURL=Accordion.js.map