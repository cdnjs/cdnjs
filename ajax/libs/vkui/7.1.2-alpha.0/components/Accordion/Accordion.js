'use client';
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { AccordionContent } from "./AccordionContent.js";
import { AccordionContext } from "./AccordionContext.js";
import { AccordionSummary } from "./AccordionSummary.js";
function useAccordionId(id) {
    const generatedId = React.useId();
    const labelId = id !== null && id !== void 0 ? id : `Accordion${generatedId}`;
    const contentId = `AccordionContent${id !== null && id !== void 0 ? id : generatedId}`;
    return {
        labelId,
        contentId
    };
}
export const Accordion = (_param)=>{
    var { id, expanded: expandedProp, defaultExpanded = false, onChange: onChangeProp, children } = _param, restProps = _object_without_properties(_param, [
        "id",
        "expanded",
        "defaultExpanded",
        "onChange",
        "children"
    ]);
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