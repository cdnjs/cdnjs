import * as React from "react";
import { hasHover as hasHoverLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
import { useIsClient } from "./useIsClient";
export function useAdaptivityHasHover() {
    var deferDetect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _React_useContext = React.useContext(AdaptivityContext), hasHoverContext = _React_useContext.hasHover;
    var hasHover = hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
    var isClient = useIsClient(!deferDetect);
    if (!isClient) {
        return undefined;
    }
    return hasHover;
}

//# sourceMappingURL=useAdaptivityHasHover.js.map