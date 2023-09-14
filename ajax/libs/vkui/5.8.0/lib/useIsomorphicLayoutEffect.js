import * as React from "react";
import { canUseDOM } from "./dom";
export var useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

//# sourceMappingURL=useIsomorphicLayoutEffect.js.map