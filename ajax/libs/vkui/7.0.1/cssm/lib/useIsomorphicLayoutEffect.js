import * as React from "react";
import { canUseDOM } from "./dom.js";
export const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

//# sourceMappingURL=useIsomorphicLayoutEffect.js.map