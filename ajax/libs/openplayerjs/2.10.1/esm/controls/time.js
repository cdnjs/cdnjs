var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Time_player, _Time_currentTime, _Time_delimiter, _Time_duration, _Time_container, _Time_events, _Time_controlPosition, _Time_controlLayer;
import { EVENT_OPTIONS } from '../utils/constants';
import { formatTime } from '../utils/time';
class Time {
    constructor(player, position, layer) {
        _Time_player.set(this, void 0);
        _Time_currentTime.set(this, void 0);
        _Time_delimiter.set(this, void 0);
        _Time_duration.set(this, void 0);
        _Time_container.set(this, void 0);
        _Time_events.set(this, {
            controls: {},
            media: {},
        });
        _Time_controlPosition.set(this, void 0);
        _Time_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Time_player, player, "f");
        __classPrivateFieldSet(this, _Time_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Time_controlLayer, layer, "f");
        return this;
    }
    create() {
        const { labels, progress } = __classPrivateFieldGet(this, _Time_player, "f").getOptions();
        __classPrivateFieldSet(this, _Time_currentTime, document.createElement('time'), "f");
        __classPrivateFieldGet(this, _Time_currentTime, "f").className = 'op-controls__current';
        __classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('role', 'timer');
        __classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('aria-live', 'off');
        __classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('aria-hidden', 'false');
        __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = '0:00';
        const showOnlyCurrent = (progress === null || progress === void 0 ? void 0 : progress.showCurrentTimeOnly) || false;
        if (!showOnlyCurrent) {
            __classPrivateFieldSet(this, _Time_delimiter, document.createElement('span'), "f");
            __classPrivateFieldGet(this, _Time_delimiter, "f").className = 'op-controls__time-delimiter';
            __classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');
            __classPrivateFieldGet(this, _Time_delimiter, "f").innerText = '/';
            __classPrivateFieldSet(this, _Time_duration, document.createElement('time'), "f");
            __classPrivateFieldGet(this, _Time_duration, "f").className = 'op-controls__duration';
            __classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'false');
            __classPrivateFieldGet(this, _Time_duration, "f").innerText = formatTime((progress === null || progress === void 0 ? void 0 : progress.duration) || 0);
        }
        const controls = __classPrivateFieldGet(this, _Time_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Time_controlLayer, "f"));
        __classPrivateFieldSet(this, _Time_container, document.createElement('span'), "f");
        __classPrivateFieldGet(this, _Time_container, "f").className = `op-controls-time op-control__${__classPrivateFieldGet(this, _Time_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Time_container, "f").appendChild(__classPrivateFieldGet(this, _Time_currentTime, "f"));
        if (!showOnlyCurrent) {
            __classPrivateFieldGet(this, _Time_container, "f").appendChild(__classPrivateFieldGet(this, _Time_delimiter, "f"));
            __classPrivateFieldGet(this, _Time_container, "f").appendChild(__classPrivateFieldGet(this, _Time_duration, "f"));
        }
        controls.appendChild(__classPrivateFieldGet(this, _Time_container, "f"));
        const setInitialTime = () => {
            var _a;
            const el = __classPrivateFieldGet(this, _Time_player, "f").activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _Time_player, "f").getElement().getAttribute('op-live__enabled')) {
                if (!showOnlyCurrent) {
                    const duration = !Number.isNaN(el.duration) ? el.duration : ((_a = __classPrivateFieldGet(this, _Time_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;
                    __classPrivateFieldGet(this, _Time_duration, "f").innerText = formatTime(duration);
                }
                __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
            }
            else if (!showOnlyCurrent) {
                __classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'true');
                __classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _Time_events, "f").media.loadedmetadata = setInitialTime.bind(this);
        __classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged = setInitialTime.bind(this);
        const { showLabel: showLiveLabel } = __classPrivateFieldGet(this, _Time_player, "f").getOptions().live || {};
        __classPrivateFieldGet(this, _Time_events, "f").media.timeupdate = () => {
            const el = __classPrivateFieldGet(this, _Time_player, "f").activeElement();
            if (el.duration !== Infinity &&
                !__classPrivateFieldGet(this, _Time_player, "f").getElement().getAttribute('op-live__enabled') &&
                !__classPrivateFieldGet(this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
                const duration = formatTime(el.duration);
                if (!showOnlyCurrent && !Number.isNaN(el.duration) && duration !== __classPrivateFieldGet(this, _Time_duration, "f").innerText) {
                    __classPrivateFieldGet(this, _Time_duration, "f").innerText = duration;
                    __classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'false');
                    __classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');
                }
                else if (showOnlyCurrent || duration !== __classPrivateFieldGet(this, _Time_duration, "f").innerText) {
                    __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
                }
                __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
            }
            else if (__classPrivateFieldGet(this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
                if (!showOnlyCurrent) {
                    __classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'true');
                    __classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
                }
                __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
            }
            else if (showOnlyCurrent ||
                (!__classPrivateFieldGet(this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled') && __classPrivateFieldGet(this, _Time_duration, "f").getAttribute('aria-hidden') === 'false')) {
                if (!showOnlyCurrent) {
                    __classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'true');
                    __classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
                }
                __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
            }
            else {
                __classPrivateFieldGet(this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
            }
        };
        __classPrivateFieldGet(this, _Time_events, "f").media.ended = () => {
            var _a;
            const el = __classPrivateFieldGet(this, _Time_player, "f").activeElement();
            const duration = !Number.isNaN(el.duration) ? el.duration : ((_a = __classPrivateFieldGet(this, _Time_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;
            if (!showOnlyCurrent && __classPrivateFieldGet(this, _Time_player, "f").isMedia()) {
                __classPrivateFieldGet(this, _Time_duration, "f").innerText = formatTime(duration);
            }
        };
        Object.keys(__classPrivateFieldGet(this, _Time_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Time_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Time_events, "f").media[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _Time_player, "f")
            .getControls()
            .getContainer()
            .addEventListener('controlschanged', __classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged, EVENT_OPTIONS);
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _Time_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Time_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Time_events, "f").media[event]);
        });
        __classPrivateFieldGet(this, _Time_player, "f")
            .getControls()
            .getContainer()
            .removeEventListener('controlschanged', __classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged);
        __classPrivateFieldGet(this, _Time_currentTime, "f").remove();
        const { showCurrentTimeOnly } = __classPrivateFieldGet(this, _Time_player, "f").getOptions().progress || {};
        if (!showCurrentTimeOnly) {
            __classPrivateFieldGet(this, _Time_delimiter, "f").remove();
            __classPrivateFieldGet(this, _Time_duration, "f").remove();
        }
        __classPrivateFieldGet(this, _Time_container, "f").remove();
    }
}
_Time_player = new WeakMap(), _Time_currentTime = new WeakMap(), _Time_delimiter = new WeakMap(), _Time_duration = new WeakMap(), _Time_container = new WeakMap(), _Time_events = new WeakMap(), _Time_controlPosition = new WeakMap(), _Time_controlLayer = new WeakMap();
export default Time;
