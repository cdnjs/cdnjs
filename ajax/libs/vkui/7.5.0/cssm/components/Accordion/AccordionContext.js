import { useContext } from "react";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
export const AccordionContext = /*#__PURE__*/ React.createContext({
    labelId: '',
    contentId: '',
    expanded: false,
    unmountOnCollapsed: false,
    onChange: noop
});
export const useAccordionContext = ()=>{
    const { expanded, onChange } = useContext(AccordionContext);
    return React.useMemo(()=>({
            expanded,
            onChange
        }), [
        onChange,
        expanded
    ]);
};

//# sourceMappingURL=AccordionContext.js.map