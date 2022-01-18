import * as React from 'react';
import { canUseDOM } from "./dom"; // eslint-disable-next-line no-restricted-properties

export var useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;
//# sourceMappingURL=useIsomorphicLayoutEffect.js.map