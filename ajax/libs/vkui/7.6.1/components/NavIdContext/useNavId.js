import * as React from "react";
import { NavPanelIdContext, NavViewIdContext } from "./NavIdContext.js";
export const useNavId = ()=>({
        view: React.useContext(NavViewIdContext),
        panel: React.useContext(NavPanelIdContext)
    });

//# sourceMappingURL=useNavId.js.map