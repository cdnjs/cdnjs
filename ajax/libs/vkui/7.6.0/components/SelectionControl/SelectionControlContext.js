import { createContext, useContext } from "react";
export const SelectionControlContext = createContext({
    noPadding: false
});
export const useSelectionControlContext = ()=>useContext(SelectionControlContext);

//# sourceMappingURL=SelectionControlContext.js.map