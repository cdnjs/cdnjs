import * as React from 'react';
import { isEqual } from '@vkontakte/vkjs';
export function useObjectMemo(object) {
    const cache = React.useRef(object);
    if (!isEqual(cache.current, object)) {
        cache.current = object;
    }
    return cache.current;
}

//# sourceMappingURL=useObjectMemo.js.map