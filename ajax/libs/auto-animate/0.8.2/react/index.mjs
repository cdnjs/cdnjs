import { useState, useMemo, useCallback } from 'react';
import autoAnimate from '../index.mjs';

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
function useAutoAnimate(options) {
    const [controller, setController] = useState();
    const memoizedOptions = useMemo(() => options, []);
    const element = useCallback((node) => {
        if (node instanceof HTMLElement) {
            setController(autoAnimate(node, memoizedOptions));
        }
        else {
            setController(undefined);
        }
    }, [memoizedOptions]);
    const setEnabled = useCallback((enabled) => {
        if (controller) {
            enabled ? controller.enable() : controller.disable();
        }
    }, [controller]);
    return [element, setEnabled];
}

export { useAutoAnimate };
