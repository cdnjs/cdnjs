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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useEnsuredControl = require("../../hooks/useEnsuredControl");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _AccordionContent = require("./AccordionContent");
const _AccordionContext = require("./AccordionContext");
const _AccordionSummary = require("./AccordionSummary");
function useAccordionId(id) {
    const generatedId = _react.useId();
    const labelId = id !== null && id !== void 0 ? id : `Accordion${generatedId}`;
    const contentId = `AccordionContent${id !== null && id !== void 0 ? id : generatedId}`;
    return {
        labelId,
        contentId
    };
}
const Accordion = (_param)=>{
    var { id, expanded: expandedProp, defaultExpanded = false, onChange: onChangeProp, children } = _param, restProps = _object_without_properties._(_param, [
        "id",
        "expanded",
        "defaultExpanded",
        "onChange",
        "children"
    ]);
    const { labelId, contentId } = useAccordionId(id);
    const [expanded, onChange] = (0, _useEnsuredControl.useCustomEnsuredControl)({
        value: expandedProp,
        defaultValue: defaultExpanded,
        onChange: onChangeProp,
        disabled: restProps.disabled
    });
    const context = (0, _useObjectMemo.useObjectMemo)({
        labelId,
        contentId,
        expanded: expanded || false,
        onChange
    });
    return /*#__PURE__*/ _react.createElement(_AccordionContext.AccordionContext.Provider, {
        value: context
    }, children);
};
Accordion.Summary = _AccordionSummary.AccordionSummary;
Accordion.Content = _AccordionContent.AccordionContent;

//# sourceMappingURL=Accordion.js.map