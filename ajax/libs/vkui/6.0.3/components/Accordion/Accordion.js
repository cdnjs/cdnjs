import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './AccordionContext';
import { AccordionSummary } from './AccordionSummary';
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
    const context = useObjectMemo({
        labelId,
        contentId,
        expanded: expanded || false,
        onChange
    });
    return /*#__PURE__*/ React.createElement(AccordionContext.Provider, {
        value: context
    }, children);
};
Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;

//# sourceMappingURL=Accordion.js.map