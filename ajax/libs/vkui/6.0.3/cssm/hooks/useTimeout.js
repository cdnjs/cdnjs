import * as React from 'react';
import { canUseDOM } from '../lib/dom';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export function useTimeout(cb, duration) {
    const options = React.useRef({
        cb,
        duration
    });
    useIsomorphicLayoutEffect(()=>{
        options.current.cb = cb;
        options.current.duration = duration;
    }, [
        cb,
        duration
    ]);
    const timeout = React.useRef();
    const clear = React.useCallback(()=>{
        if (canUseDOM && timeout?.current) {
            clearTimeout(timeout.current);
        }
    }, []);
    const set = React.useCallback((duration = options.current.duration)=>{
        clear();
        if (canUseDOM) {
            timeout.current = setTimeout(()=>{
                const { cb } = options.current;
                typeof cb === 'function' && cb();
            }, duration);
        }
    }, [
        clear
    ]);
    useIsomorphicLayoutEffect(()=>clear, []);
    return {
        set,
        clear
    };
}

//# sourceMappingURL=useTimeout.js.map