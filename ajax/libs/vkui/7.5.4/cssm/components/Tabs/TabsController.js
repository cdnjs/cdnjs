import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useStableCallback } from "../../hooks/useStableCallback.js";
/* eslint-enable jsdoc/require-jsdoc */ export const useTabsController = ({ selectedId, defaultSelectedId, onSelectedIdChange: onSelectedIdChangeProp })=>{
    const onSelectedIdChange = useStableCallback((id)=>id && onSelectedIdChangeProp?.(id));
    const [value, onChange] = useCustomEnsuredControl({
        onChange: onSelectedIdChange,
        value: selectedId,
        defaultValue: defaultSelectedId
    });
    if (!selectedId && !defaultSelectedId || !value) {
        return null;
    }
    return {
        onChange,
        selectedTab: value
    };
};

//# sourceMappingURL=TabsController.js.map