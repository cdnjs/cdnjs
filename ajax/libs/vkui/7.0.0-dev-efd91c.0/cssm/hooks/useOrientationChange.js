import { useEffect, useState } from "react";
import { useDOM } from "../lib/dom.js";
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Учитывает особенности API на разных платформах.
 */ function getOrientation(window) {
    const angle = Math.abs(// eslint-disable-next-line compat/compat
    window.screen?.orientation?.angle ?? Number(window.orientation));
    return angle === 90 ? 'landscape' : 'portrait';
}
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Обновляется при изменении ориентации.
 */ export function useOrientationChange() {
    const { window } = useDOM();
    const [orientation, setOrientation] = useState('portrait');
    useEffect(function mount() {
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!window) {
            return;
        }
        const handleChange = ()=>{
            setOrientation(getOrientation(window));
        };
        handleChange();
        window.addEventListener('orientationchange', handleChange);
        return function unmount() {
            window.removeEventListener('orientationchange', handleChange);
        };
    }, [
        window
    ]);
    return orientation;
}

//# sourceMappingURL=useOrientationChange.js.map