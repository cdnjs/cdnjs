import * as React from 'react';
import { isKeyboardFocusingStarted } from '../lib/accessibility';
import { useDOM } from '../lib/dom';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export const ENABLE_KEYBOARD_INPUT_EVENT_NAME = 'enableKeyboardInput';
export const DISABLE_KEYBOARD_INPUT_EVENT_NAME = 'disableKeyboardInput';
const EVENT_OPTIONS = {
    passive: true,
    capture: true
};
/**
 * Чтобы оптимизировать рендер, сохраняем в ref.
 *
 * В контекст можно передать через getter, подробнее в примере ниже.
 *
 * ```tsx
 * const keyboardInputTrackerRef = useKeyboardInputTracker();
 * <SomeContext.Provider value={{
 *  get keyboardInput() {
 *    return keyboardInputTrackerRef.current;
 *  }
 * }}>
 *  {children}
 * </SomeContext.Provider>
 * ```
 *
 * @private
 */ export function useKeyboardInputTracker() {
    const { document } = useDOM();
    const keyboardFocusingStartedRef = React.useRef(false);
    useIsomorphicLayoutEffect(()=>{
        /* istanbul ignore if: невозможный кейс, т.к. в SSR эффекты не вызываются. Проверка на будущее, если вдруг эффект будет вызываться. */ if (!document) {
            return;
        }
        const handleKeydown = (event)=>{
            if (isKeyboardFocusingStarted(event)) {
                keyboardFocusingStartedRef.current = true;
            }
        };
        const handleCustomEnableKeyboardEvent = ()=>{
            keyboardFocusingStartedRef.current = true;
        };
        const handleCustomDisableKeyboardEvent = ()=>{
            keyboardFocusingStartedRef.current = false;
        };
        document.addEventListener('keydown', handleKeydown, EVENT_OPTIONS);
        document.addEventListener(ENABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomEnableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
        document.addEventListener(DISABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomDisableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
        document.addEventListener('mousedown', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        document.addEventListener('touchstart', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        return ()=>{
            document.removeEventListener('keydown', handleKeydown, EVENT_OPTIONS);
            document.removeEventListener(ENABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomEnableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
            document.removeEventListener(DISABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomDisableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
            document.removeEventListener('mousedown', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
            document.removeEventListener('touchstart', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        };
    }, [
        document
    ]);
    return keyboardFocusingStartedRef;
}

//# sourceMappingURL=useKeyboardInputTracker.js.map