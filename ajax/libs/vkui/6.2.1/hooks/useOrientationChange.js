import * as React from 'react';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Учитывает особенности API на разных платформах.
 */ function getOrientation(window) {
    var // eslint-disable-next-line compat/compat
    _window_screen_orientation, _window_screen;
    if (!window) {
        return 'portrait';
    }
    var _window_screen_orientation_angle;
    const angle = Math.abs((_window_screen_orientation_angle = (_window_screen = window.screen) === null || _window_screen === void 0 ? void 0 : (_window_screen_orientation = _window_screen.orientation) === null || _window_screen_orientation === void 0 ? void 0 : _window_screen_orientation.angle) !== null && _window_screen_orientation_angle !== void 0 ? _window_screen_orientation_angle : Number(window.orientation));
    return angle === 90 ? 'landscape' : 'portrait';
}
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Обновляется при изменении ориентации.
 */ export function useOrientationChange() {
    const { window } = useDOM();
    const [orientation, setOrientation] = React.useState(()=>getOrientation(window));
    useGlobalEventListener(window, 'orientationchange', ()=>setOrientation(getOrientation(window)));
    return orientation;
}

//# sourceMappingURL=useOrientationChange.js.map