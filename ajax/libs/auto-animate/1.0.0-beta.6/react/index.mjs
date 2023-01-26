import { useState, useCallback } from 'react';
import autoAnimate from '../index.mjs';

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
function useAutoAnimate(options) {
    const [controller, setController] = useState();
    const element = useCallback((node) => {
        if (node instanceof HTMLElement) {
            setController(autoAnimate(node, options));
        }
        else {
            setController(undefined);
        }
    }, []);
    const setEnabled = (enabled) => {
        if (controller) {
            enabled ? controller.enable() : controller.disable();
        }
    };
    return [element, setEnabled];
}

export { useAutoAnimate };
