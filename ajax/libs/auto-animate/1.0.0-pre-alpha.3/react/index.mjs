import { useRef, useEffect } from 'react';
import autoAnimate from '../index.mjs';

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
function useAutoAnimate(options) {
    const element = useRef(null);
    useEffect(() => {
        if (element.current instanceof HTMLElement)
            autoAnimate(element.current, options);
    }, [element]);
    return element;
}

export { useAutoAnimate };
