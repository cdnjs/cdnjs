import * as React from 'react';
import { Keys, pressedKey } from '../lib/accessibility';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
export const ENABLE_KEYBOARD_INPUT_EVENT_NAME = 'enableKeyboardInput';
export const DISABLE_KEYBOARD_INPUT_EVENT_NAME = 'disableKeyboardInput';
export function useKeyboardInputTracker() {
    const { document } = useDOM();
    const [isKeyboardInputActive, toggleKeyboardInput] = React.useState(false);
    const enableKeyboardInput = React.useCallback(()=>{
        toggleKeyboardInput(true);
    }, []);
    const handleKeydown = React.useCallback((e)=>{
        if (pressedKey(e) === Keys.TAB) {
            enableKeyboardInput();
        }
    }, [
        enableKeyboardInput
    ]);
    const disableKeyboardInput = React.useCallback(()=>{
        toggleKeyboardInput(false);
    }, []);
    const eventOptions = {
        passive: true,
        capture: true
    };
    useGlobalEventListener(document, 'keydown', handleKeydown, eventOptions);
    useGlobalEventListener(document, 'mousedown', disableKeyboardInput, eventOptions);
    useGlobalEventListener(document, 'touchstart', disableKeyboardInput, eventOptions);
    useGlobalEventListener(document, ENABLE_KEYBOARD_INPUT_EVENT_NAME, enableKeyboardInput, eventOptions);
    useGlobalEventListener(document, DISABLE_KEYBOARD_INPUT_EVENT_NAME, disableKeyboardInput, eventOptions);
    return isKeyboardInputActive;
}

//# sourceMappingURL=useKeyboardInputTracker.js.map