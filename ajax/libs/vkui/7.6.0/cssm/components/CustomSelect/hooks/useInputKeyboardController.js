import * as React from "react";
import { Keys, pressedKey } from "../../../lib/accessibility.js";
import { callMultiple } from "../../../lib/callMultiple.js";
const KEYS_TO_PREVENT_DEFAULT = [
    Keys.ARROW_UP,
    Keys.ARROW_DOWN,
    Keys.ESCAPE,
    Keys.ENTER
];
/* eslint-enable jsdoc/require-jsdoc */ export function useInputKeyboardController({ opened, resetFocusedOption, focusOption, scrollBoxRef, selectFocused, onInputKeyDown, open, close }) {
    const handleKeyDownSelect = React.useCallback((event)=>{
        const key = pressedKey(event);
        if (event.key.length === 1 && key !== Keys.SPACE) {
            open();
            resetFocusedOption();
            return;
        }
        if (!key) {
            return;
        }
        const areOptionsShown = ()=>scrollBoxRef.current !== null;
        if (KEYS_TO_PREVENT_DEFAULT.includes(key)) {
            event.preventDefault();
        }
        switch(key){
            case Keys.ARROW_UP:
                if (opened) {
                    areOptionsShown() && focusOption('prev');
                } else {
                    open();
                }
                break;
            case Keys.ARROW_DOWN:
                if (opened) {
                    areOptionsShown() && focusOption('next');
                } else {
                    open();
                }
                break;
            case Keys.ESCAPE:
                close();
                break;
            case Keys.BACKSPACE:
            case Keys.DELETE:
                {
                    open();
                    resetFocusedOption();
                    break;
                }
            case Keys.ENTER:
            case Keys.SPACE:
                if (opened) {
                    areOptionsShown() && selectFocused();
                } else {
                    open();
                }
                break;
        }
    }, [
        scrollBoxRef,
        opened,
        close,
        focusOption,
        open,
        resetFocusedOption,
        selectFocused
    ]);
    const handleInputKeydown = React.useCallback((event)=>{
        onInputKeyDown?.(event, opened);
    }, [
        opened,
        onInputKeyDown
    ]);
    const _onInputKeyDown = callMultiple(handleKeyDownSelect, handleInputKeydown);
    return _onInputKeyDown;
}

//# sourceMappingURL=useInputKeyboardController.js.map