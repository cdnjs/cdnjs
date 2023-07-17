import React from 'react';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
export function useFocusWithin(ref) {
    const { document } = useDOM();
    const isFocusWithin = ()=>{
        if (!ref.current || !document) {
            return false;
        }
        return ref.current.contains(document.activeElement);
    };
    const [focusWithin, setFocusWithin] = React.useState(isFocusWithin);
    const listener = ()=>{
        const focus = isFocusWithin();
        focus !== focusWithin && setFocusWithin(focus);
    };
    useGlobalEventListener(document, 'focus', listener, {
        capture: true
    });
    useGlobalEventListener(document, 'blur', listener, {
        capture: true
    });
    return focusWithin;
}

//# sourceMappingURL=useFocusWithin.js.map