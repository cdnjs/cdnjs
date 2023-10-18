import * as React from "react";
import { NavPanelIdContext, NavViewIdContext } from "./NavIdContext";
export var useNavId = function() {
    return {
        view: React.useContext(NavViewIdContext),
        panel: React.useContext(NavPanelIdContext)
    };
};

//# sourceMappingURL=useNavId.js.map