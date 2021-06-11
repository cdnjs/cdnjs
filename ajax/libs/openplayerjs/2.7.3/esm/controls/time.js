var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _player, _current, _delimiter, _duration, _container, _events, _labels, _position, _layer;
import { EVENT_OPTIONS } from '../utils/constants';
import { removeElement } from '../utils/general';
import { formatTime } from '../utils/time';
class Time {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _current.set(this, void 0);
        _delimiter.set(this, void 0);
        _duration.set(this, void 0);
        _container.set(this, void 0);
        _events.set(this, {
            controls: {},
            media: {},
        });
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _current, document.createElement('time'));
        __classPrivateFieldGet(this, _current).className = 'op-controls__current';
        __classPrivateFieldGet(this, _current).setAttribute('role', 'timer');
        __classPrivateFieldGet(this, _current).setAttribute('aria-live', 'off');
        __classPrivateFieldGet(this, _current).setAttribute('aria-hidden', 'false');
        __classPrivateFieldGet(this, _current).innerText = '0:00';
        const showOnlyCurrent = __classPrivateFieldGet(this, _player).getOptions().progress.showCurrentTimeOnly;
        if (!showOnlyCurrent) {
            __classPrivateFieldSet(this, _delimiter, document.createElement('span'));
            __classPrivateFieldGet(this, _delimiter).className = 'op-controls__time-delimiter';
            __classPrivateFieldGet(this, _delimiter).setAttribute('aria-hidden', 'false');
            __classPrivateFieldGet(this, _delimiter).innerText = '/';
            __classPrivateFieldSet(this, _duration, document.createElement('time'));
            __classPrivateFieldGet(this, _duration).className = 'op-controls__duration';
            __classPrivateFieldGet(this, _duration).setAttribute('aria-hidden', 'false');
            __classPrivateFieldGet(this, _duration).innerText = formatTime(__classPrivateFieldGet(this, _player).getOptions().progress.duration);
        }
        const controls = __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer));
        __classPrivateFieldSet(this, _container, document.createElement('span'));
        __classPrivateFieldGet(this, _container).className = `op-controls-time op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _container).appendChild(__classPrivateFieldGet(this, _current));
        if (!showOnlyCurrent) {
            __classPrivateFieldGet(this, _container).appendChild(__classPrivateFieldGet(this, _delimiter));
            __classPrivateFieldGet(this, _container).appendChild(__classPrivateFieldGet(this, _duration));
        }
        controls.appendChild(__classPrivateFieldGet(this, _container));
        const setInitialTime = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled')) {
                if (!showOnlyCurrent) {
                    const duration = !isNaN(el.duration) ? el.duration : __classPrivateFieldGet(this, _player).getOptions().progress.duration;
                    __classPrivateFieldGet(this, _duration).innerText = formatTime(duration);
                }
                __classPrivateFieldGet(this, _current).innerText = formatTime(el.currentTime);
            }
            else {
                if (!showOnlyCurrent) {
                    __classPrivateFieldGet(this, _duration).setAttribute('aria-hidden', 'true');
                }
                __classPrivateFieldGet(this, _delimiter).setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _events).media.loadedmetadata = setInitialTime.bind(this);
        __classPrivateFieldGet(this, _events).controls.controlschanged = setInitialTime.bind(this);
        const { showLabel: showLiveLabel } = __classPrivateFieldGet(this, _player).getOptions().live;
        __classPrivateFieldGet(this, _events).media.timeupdate = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled') &&
                !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled')) {
                const duration = formatTime(el.duration);
                if (!showOnlyCurrent && !isNaN(el.duration) && duration !== __classPrivateFieldGet(this, _duration).innerText) {
                    __classPrivateFieldGet(this, _duration).innerText = duration;
                    __classPrivateFieldGet(this, _duration).setAttribute('aria-hidden', 'false');
                    __classPrivateFieldGet(this, _delimiter).setAttribute('aria-hidden', 'false');
                }
                else if (showOnlyCurrent || duration !== __classPrivateFieldGet(this, _duration).innerText) {
                    __classPrivateFieldGet(this, _current).innerText = showLiveLabel ? __classPrivateFieldGet(this, _labels).live : formatTime(el.currentTime);
                }
                __classPrivateFieldGet(this, _current).innerText = formatTime(el.currentTime);
            }
            else if (__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled')) {
                if (!showOnlyCurrent) {
                    __classPrivateFieldGet(this, _duration).setAttribute('aria-hidden', 'true');
                    __classPrivateFieldGet(this, _delimiter).setAttribute('aria-hidden', 'true');
                }
                __classPrivateFieldGet(this, _current).innerText = formatTime(el.currentTime);
            }
            else if (showOnlyCurrent || (!__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled') &&
                __classPrivateFieldGet(this, _duration).getAttribute('aria-hidden') === 'false')) {
                if (!showOnlyCurrent) {
                    __classPrivateFieldGet(this, _duration).setAttribute('aria-hidden', 'true');
                    __classPrivateFieldGet(this, _delimiter).setAttribute('aria-hidden', 'true');
                }
                __classPrivateFieldGet(this, _current).innerText = showLiveLabel ? __classPrivateFieldGet(this, _labels).live : formatTime(el.currentTime);
            }
            else {
                __classPrivateFieldGet(this, _current).innerText = showLiveLabel ? __classPrivateFieldGet(this, _labels).live : formatTime(el.currentTime);
            }
        };
        __classPrivateFieldGet(this, _events).media.ended = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            const duration = !isNaN(el.duration) ? el.duration : __classPrivateFieldGet(this, _player).getOptions().progress.duration;
            if (!showOnlyCurrent && __classPrivateFieldGet(this, _player).isMedia()) {
                __classPrivateFieldGet(this, _duration).innerText = formatTime(duration);
            }
        };
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _player).getControls().getContainer().addEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged, EVENT_OPTIONS);
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events).media[event]);
        });
        __classPrivateFieldGet(this, _player).getControls().getContainer().removeEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged);
        removeElement(__classPrivateFieldGet(this, _current));
        if (!__classPrivateFieldGet(this, _player).getOptions().progress.showCurrentTimeOnly) {
            removeElement(__classPrivateFieldGet(this, _delimiter));
            removeElement(__classPrivateFieldGet(this, _duration));
        }
        removeElement(__classPrivateFieldGet(this, _container));
    }
}
_player = new WeakMap(), _current = new WeakMap(), _delimiter = new WeakMap(), _duration = new WeakMap(), _container = new WeakMap(), _events = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Time;
