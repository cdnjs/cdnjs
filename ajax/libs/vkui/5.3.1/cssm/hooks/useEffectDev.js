import { useEffect } from 'react';
import { noop } from '@vkontakte/vkjs';
export const useEffectDev = process.env.NODE_ENV === 'development' ? useEffect : noop;

//# sourceMappingURL=useEffectDev.js.map