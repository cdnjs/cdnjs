import * as React from 'react';
import { canUseDOM } from './dom';
export var useIsomorphicLayoutEffect = canUseDOM ?
// eslint-disable-next-line no-restricted-properties
React.useLayoutEffect : React.useEffect;
//# sourceMappingURL=useIsomorphicLayoutEffect.js.map