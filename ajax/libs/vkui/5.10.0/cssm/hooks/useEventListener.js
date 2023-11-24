import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { canUseDOM } from '../lib/dom';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export function useEventListener(event, _cb, _options) {
    const cbRef = React.useRef(_cb);
    useIsomorphicLayoutEffect(()=>{
        cbRef.current = _cb;
    }, [
        _cb
    ]);
    const cb = React.useCallback((e)=>cbRef.current && cbRef.current(e), []);
    const detach = React.useRef(noop);
    const remove = React.useCallback(()=>{
        detach.current();
        detach.current = noop;
    }, []);
    const add = React.useCallback((el)=>{
        if (!canUseDOM) {
            return;
        }
        remove();
        if (!el) {
            return;
        }
        const options = {
            ..._options
        };
        el.addEventListener(event, cb, options);
        detach.current = ()=>el.removeEventListener(event, cb, options);
    }, [
        _options,
        cb,
        event,
        remove
    ]);
    React.useEffect(()=>remove, [
        remove
    ]);
    return React.useMemo(()=>({
            add,
            remove
        }), [
        add,
        remove
    ]);
}

//# sourceMappingURL=useEventListener.js.map