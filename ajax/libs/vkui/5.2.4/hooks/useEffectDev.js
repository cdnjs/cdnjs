import { useEffect } from 'react';
import { noop } from '@vkontakte/vkjs';
export var useEffectDev = process.env.NODE_ENV === 'development' ? useEffect : noop;
//# sourceMappingURL=useEffectDev.js.map