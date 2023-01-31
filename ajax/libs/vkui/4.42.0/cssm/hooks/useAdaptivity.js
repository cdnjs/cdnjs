import * as React from "react";
import { AdaptivityContext, ViewWidth, ViewHeight } from "../components/AdaptivityProvider/AdaptivityContext";
import { usePlatform } from "./usePlatform";
import { VKCOM } from "../lib/platform";
export var useAdaptivity = function useAdaptivity() {
  return React.useContext(AdaptivityContext);
};
export var useAdaptivityIsDesktop = function useAdaptivityIsDesktop() {
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth,
    viewHeight = _useAdaptivity.viewHeight,
    hasMouse = _useAdaptivity.hasMouse;
  return viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM) || platform === VKCOM;
};
//# sourceMappingURL=useAdaptivity.js.map