import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { canUseDOM } from '../lib/dom';
class EventListener {
    callback = noop;
    options = undefined;
    eventType;
    #target = null;
    constructor(type, callback, options){
        this.options = options;
        this.eventType = type;
        if (callback) {
            this.callback = callback;
        }
    }
    #listener = (ev)=>{
        this.callback(ev);
    };
    add = (el)=>{
        if (!canUseDOM) {
            return;
        }
        this.remove();
        if (!el) {
            return;
        }
        el.addEventListener(this.eventType, this.#listener, this.options);
        this.#target = el;
    };
    remove = ()=>{
        if (!canUseDOM || !this.#target) {
            return;
        }
        this.#target.removeEventListener(this.eventType, this.#listener, this.options);
        this.#target = null;
    };
}
export function useEventListener(event, _cb, _options) {
    const ref = React.useRef(null);
    if (ref.current === null) {
        ref.current = new EventListener(event, _cb, _options);
    } else {
        ref.current.eventType = event;
        ref.current.options = _options;
        if (_cb) {
            ref.current.callback = _cb;
        }
    }
    React.useEffect(()=>{
        const detach = ref.current?.remove.bind(ref.current);
        return detach;
    }, []);
    return ref.current;
}

//# sourceMappingURL=useEventListener.js.map