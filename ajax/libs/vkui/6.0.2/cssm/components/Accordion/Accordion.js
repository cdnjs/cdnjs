import * as React from 'react';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './AccordionContext';
import { AccordionSummary } from './AccordionSummary';
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