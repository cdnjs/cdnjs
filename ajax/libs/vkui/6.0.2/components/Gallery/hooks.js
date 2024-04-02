import * as React from 'react';
import { useTimeout } from '../../hooks/useTimeout';
import { useDOM } from '../../lib/dom';
export function useAutoPlay(timeout, slideIndex, callbackFn) {
    const { clear: clearAutoPlay, set: setAutoPlay } = useTimeout(callbackFn, timeout);
    const { document } = useDOM();
    React.useEffect(()=>timeout ? setAutoPlay() : clearAutoPlay(), [
        timeout,
        slideIndex,
        clearAutoPlay,
        setAutoPlay
    ]);
    // Отключаем прокрутку слайдов при неактивной вкладке
    React.useEffect(function preventSlideChange() {
        if (!document || !timeout) {
            return;
        }
        const changeAutoPlay = ()=>{
            if (document.visibilityState === 'visible') {
                clearAutoPlay();
                setAutoPlay();
            }
            if (document.visibilityState === 'hidden') {
                clearAutoPlay();
            }
        };
        document.addEventListener('visibilitychange', changeAutoPlay);
        return ()=>{
            document.removeEventListener('visibilitychange', changeAutoPlay);
        };
    }, [
        document,
        timeout,
        clearAutoPlay,
        setAutoPlay
    ]);
}

//# sourceMappingURL=hooks.js.map