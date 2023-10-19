import * as React from "react";
import { hasMouse as hasPointerLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
import { useIsClient } from "./useIsClient";
export function useAdaptivityHasPointer() {
    var deferDetect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _React_useContext = React.useContext(AdaptivityContext), hasPointerContext = _React_useContext.hasPointer;
    var needTwoPassRendering = deferDetect || hasPointerContext === undefined;
    var isClient = useIsClient(!needTwoPassRendering);
    if (!isClient || hasPointerContext !== undefined) {
        return hasPointerContext;
    }
    return hasPointerLib;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map