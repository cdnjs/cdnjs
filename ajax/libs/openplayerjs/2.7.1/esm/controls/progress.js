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
var _player, _progress, _slider, _buffer, _played, _tooltip, _events, _forcePause, _labels, _position, _layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { hasClass, isAudio, offset, removeElement } from '../utils/general';
import { formatTime } from '../utils/time';
class Progress {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _progress.set(this, void 0);
        _slider.set(this, void 0);
        _buffer.set(this, void 0);
        _played.set(this, void 0);
        _tooltip.set(this, void 0);
        _events.set(this, {
            container: {},
            controls: {},
            global: {},
            media: {},
            slider: {},
        });
        _forcePause.set(this, void 0);
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _forcePause, false);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _progress, document.createElement('div'));
        __classPrivateFieldGet(this, _progress).className = `op-controls__progress op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _progress).tabIndex = 0;
        __classPrivateFieldGet(this, _progress).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).progressSlider);
        __classPrivateFieldGet(this, _progress).setAttribute('aria-valuemin', '0');
        __classPrivateFieldSet(this, _slider, document.createElement('input'));
        __classPrivateFieldGet(this, _slider).type = 'range';
        __classPrivateFieldGet(this, _slider).className = 'op-controls__progress--seek';
        __classPrivateFieldGet(this, _slider).tabIndex = -1;
        __classPrivateFieldGet(this, _slider).setAttribute('min', '0');
        __classPrivateFieldGet(this, _slider).setAttribute('max', '0');
        __classPrivateFieldGet(this, _slider).setAttribute('step', '0.1');
        __classPrivateFieldGet(this, _slider).value = '0';
        __classPrivateFieldGet(this, _slider).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).progressRail);
        __classPrivateFieldGet(this, _slider).setAttribute('role', 'slider');
        __classPrivateFieldSet(this, _buffer, document.createElement('progress'));
        __classPrivateFieldGet(this, _buffer).className = 'op-controls__progress--buffer';
        __classPrivateFieldGet(this, _buffer).setAttribute('max', '100');
        __classPrivateFieldGet(this, _buffer).value = 0;
        __classPrivateFieldSet(this, _played, document.createElement('progress'));
        __classPrivateFieldGet(this, _played).className = 'op-controls__progress--played';
        __classPrivateFieldGet(this, _played).setAttribute('max', '100');
        __classPrivateFieldGet(this, _played).setAttribute('role', 'presentation');
        __classPrivateFieldGet(this, _played).value = 0;
        __classPrivateFieldGet(this, _progress).appendChild(__classPrivateFieldGet(this, _slider));
        __classPrivateFieldGet(this, _progress).appendChild(__classPrivateFieldGet(this, _played));
        __classPrivateFieldGet(this, _progress).appendChild(__classPrivateFieldGet(this, _buffer));
        if (!IS_IOS && !IS_ANDROID) {
            __classPrivateFieldSet(this, _tooltip, document.createElement('span'));
            __classPrivateFieldGet(this, _tooltip).className = 'op-controls__tooltip';
            __classPrivateFieldGet(this, _tooltip).tabIndex = -1;
            __classPrivateFieldGet(this, _tooltip).innerHTML = '00:00';
            __classPrivateFieldGet(this, _progress).appendChild(__classPrivateFieldGet(this, _tooltip));
        }
        const setInitialProgress = () => {
            if (__classPrivateFieldGet(this, _slider).classList.contains('error')) {
                __classPrivateFieldGet(this, _slider).classList.remove('error');
            }
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled') &&
                !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled')) {
                __classPrivateFieldGet(this, _slider).setAttribute('max', `${el.duration}`);
                const current = __classPrivateFieldGet(this, _player).isMedia() ? el.currentTime : (el.duration - el.currentTime);
                __classPrivateFieldGet(this, _slider).value = current.toString();
                __classPrivateFieldGet(this, _progress).setAttribute('aria-valuemax', el.duration.toString());
            }
            else if (__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled')) {
                __classPrivateFieldGet(this, _slider).setAttribute('max', '1');
                __classPrivateFieldGet(this, _slider).value = '1';
                __classPrivateFieldGet(this, _slider).style.backgroundSize = '100% 100%';
                __classPrivateFieldGet(this, _played).value = 1;
                __classPrivateFieldGet(this, _progress).setAttribute('aria-valuemax', '1');
                __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'false');
            }
            else if (!__classPrivateFieldGet(this, _player).getOptions().live.showProgress) {
                __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'true');
            }
        };
        let lastCurrentTime = 0;
        const defaultDuration = __classPrivateFieldGet(this, _player).getOptions().progress.duration || 0;
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _player).getElement());
        __classPrivateFieldGet(this, _events).media.loadedmetadata = setInitialProgress.bind(this);
        __classPrivateFieldGet(this, _events).controls.controlschanged = setInitialProgress.bind(this);
        __classPrivateFieldGet(this, _events).media.progress = (e) => {
            const el = e.target;
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled')) {
                if (el.duration > 0) {
                    for (let i = 0, total = el.buffered.length; i < total; i++) {
                        if (el.buffered.start(el.buffered.length - 1 - i) < el.currentTime) {
                            __classPrivateFieldGet(this, _buffer).value = (el.buffered.end(el.buffered.length - 1 - i) / el.duration) * 100;
                            break;
                        }
                    }
                }
            }
            else if (!__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled') &&
                __classPrivateFieldGet(this, _progress).getAttribute('aria-hidden') === 'false' && !__classPrivateFieldGet(this, _player).getOptions().live.showProgress) {
                __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _events).media.waiting = () => {
            if (isAudioEl && !__classPrivateFieldGet(this, _slider).classList.contains('loading')) {
                __classPrivateFieldGet(this, _slider).classList.add('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('error')) {
                __classPrivateFieldGet(this, _slider).classList.remove('error');
            }
        };
        __classPrivateFieldGet(this, _events).media.playererror = () => {
            if (isAudioEl && !__classPrivateFieldGet(this, _slider).classList.contains('error')) {
                __classPrivateFieldGet(this, _slider).classList.add('error');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('loading')) {
                __classPrivateFieldGet(this, _slider).classList.remove('loading');
            }
        };
        __classPrivateFieldGet(this, _events).media.pause = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled')) {
                const current = el.currentTime;
                __classPrivateFieldGet(this, _progress).setAttribute('aria-valuenow', current.toString());
                __classPrivateFieldGet(this, _progress).setAttribute('aria-valuetext', formatTime(current));
            }
        };
        __classPrivateFieldGet(this, _events).media.play = () => {
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('loading')) {
                __classPrivateFieldGet(this, _slider).classList.remove('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('error')) {
                __classPrivateFieldGet(this, _slider).classList.remove('error');
            }
            if (__classPrivateFieldGet(this, _player).activeElement().duration !== Infinity && !__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled')) {
                __classPrivateFieldGet(this, _progress).removeAttribute('aria-valuenow');
                __classPrivateFieldGet(this, _progress).removeAttribute('aria-valuetext');
            }
        };
        __classPrivateFieldGet(this, _events).media.playing = () => {
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('loading')) {
                __classPrivateFieldGet(this, _slider).classList.remove('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _slider).classList.contains('error')) {
                __classPrivateFieldGet(this, _slider).classList.remove('error');
            }
        };
        __classPrivateFieldGet(this, _events).media.timeupdate = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration !== Infinity &&
                (!__classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled') ||
                    __classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled'))) {
                if (!__classPrivateFieldGet(this, _slider).getAttribute('max') || __classPrivateFieldGet(this, _slider).getAttribute('max') === '0' ||
                    parseFloat(__classPrivateFieldGet(this, _slider).getAttribute('max') || '-1') !== el.duration) {
                    __classPrivateFieldGet(this, _slider).setAttribute('max', `${el.duration}`);
                    __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'false');
                }
                const current = __classPrivateFieldGet(this, _player).isMedia() ? el.currentTime :
                    ((el.duration - el.currentTime) + 1 >= 100 ? 100 :
                        (el.duration - el.currentTime) + 1);
                const min = parseFloat(__classPrivateFieldGet(this, _slider).min);
                const max = parseFloat(__classPrivateFieldGet(this, _slider).max);
                __classPrivateFieldGet(this, _slider).value = current.toString();
                __classPrivateFieldGet(this, _slider).style.backgroundSize = `${(current - min) * 100 / (max - min)}% 100%`;
                __classPrivateFieldGet(this, _played).value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                    defaultDuration : ((current / el.duration) * 100);
                if (__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled') && Math.floor(__classPrivateFieldGet(this, _played).value) >= 99) {
                    lastCurrentTime = el.currentTime;
                    __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'false');
                }
            }
            else if (!__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled') &&
                __classPrivateFieldGet(this, _progress).getAttribute('aria-hidden') === 'false' && !__classPrivateFieldGet(this, _player).getOptions().live.showProgress) {
                __classPrivateFieldGet(this, _progress).setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _events).media.durationchange = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            const current = __classPrivateFieldGet(this, _player).isMedia() ? el.currentTime : (el.duration - el.currentTime);
            __classPrivateFieldGet(this, _slider).setAttribute('max', `${el.duration}`);
            __classPrivateFieldGet(this, _progress).setAttribute('aria-valuemax', el.duration.toString());
            __classPrivateFieldGet(this, _played).value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                defaultDuration : ((current / el.duration) * 100);
        };
        __classPrivateFieldGet(this, _events).media.ended = () => {
            __classPrivateFieldGet(this, _slider).style.backgroundSize = '0% 100%';
            __classPrivateFieldGet(this, _slider).setAttribute('max', '0');
            __classPrivateFieldGet(this, _buffer).value = 0;
            __classPrivateFieldGet(this, _played).value = 0;
        };
        const updateSlider = (e) => {
            if (hasClass(__classPrivateFieldGet(this, _slider), 'op-progress--pressed')) {
                return;
            }
            const target = e.target;
            __classPrivateFieldGet(this, _slider).classList.add('.op-progress--pressed');
            const el = __classPrivateFieldGet(this, _player).activeElement();
            const min = parseFloat(target.min);
            const max = parseFloat(target.max);
            const val = parseFloat(target.value);
            __classPrivateFieldGet(this, _slider).style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
            __classPrivateFieldGet(this, _played).value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                defaultDuration : ((val / el.duration) * 100);
            if (__classPrivateFieldGet(this, _player).getElement().getAttribute('op-dvr__enabled')) {
                el.currentTime = (Math.round(__classPrivateFieldGet(this, _played).value) >= 99) ? lastCurrentTime : val;
            }
            else {
                el.currentTime = val;
            }
            __classPrivateFieldGet(this, _slider).classList.remove('.op-progress--pressed');
        };
        const forcePause = (e) => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if ((e.which === 1 || e.which === 0) && __classPrivateFieldGet(this, _player).isMedia()) {
                if (!el.paused) {
                    el.play().then(() => {
                        el.pause.bind(this);
                        __classPrivateFieldSet(this, _forcePause, true);
                    });
                }
            }
        };
        const releasePause = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (__classPrivateFieldGet(this, _forcePause) === true && __classPrivateFieldGet(this, _player).isMedia()) {
                if (el.paused) {
                    el.play();
                    __classPrivateFieldSet(this, _forcePause, false);
                }
            }
        };
        const mobileForcePause = (e) => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.duration === Infinity) {
                return true;
            }
            const changedTouches = e.originalEvent ? e.originalEvent.changedTouches : e.changedTouches;
            const x = changedTouches ? changedTouches[0].pageX : e.pageX;
            const pos = x - offset(__classPrivateFieldGet(this, _progress)).left;
            const percentage = (pos / __classPrivateFieldGet(this, _progress).offsetWidth);
            const time = percentage * el.duration;
            __classPrivateFieldGet(this, _slider).value = time.toString();
            updateSlider(e);
            forcePause(e);
        };
        __classPrivateFieldGet(this, _events).slider.input = updateSlider.bind(this);
        __classPrivateFieldGet(this, _events).slider.change = updateSlider.bind(this);
        __classPrivateFieldGet(this, _events).slider.mousedown = forcePause.bind(this);
        __classPrivateFieldGet(this, _events).slider.mouseup = releasePause.bind(this);
        __classPrivateFieldGet(this, _events).slider.touchstart = mobileForcePause.bind(this);
        __classPrivateFieldGet(this, _events).slider.touchend = releasePause.bind(this);
        if (!IS_IOS && !IS_ANDROID) {
            __classPrivateFieldGet(this, _events).container.mousemove = (e) => {
                const el = __classPrivateFieldGet(this, _player).activeElement();
                if (el.duration === Infinity || __classPrivateFieldGet(this, _player).isAd()) {
                    return true;
                }
                const x = (e.originalEvent && e.originalEvent.changedTouches) ?
                    e.originalEvent.changedTouches[0].pageX : e.pageX;
                let pos = x - offset(__classPrivateFieldGet(this, _progress)).left;
                const half = __classPrivateFieldGet(this, _tooltip).offsetWidth / 2;
                const percentage = (pos / __classPrivateFieldGet(this, _progress).offsetWidth);
                const time = percentage * el.duration;
                const mediaContainer = __classPrivateFieldGet(this, _player).getContainer();
                const limit = mediaContainer.offsetWidth - __classPrivateFieldGet(this, _tooltip).offsetWidth;
                if (pos <= 0 || x - offset(mediaContainer).left <= half) {
                    pos = 0;
                }
                else if (x - offset(mediaContainer).left >= limit) {
                    pos = limit - offset(__classPrivateFieldGet(this, _slider)).left - 10;
                }
                else {
                    pos -= half;
                }
                if (percentage >= 0 && percentage <= 1) {
                    __classPrivateFieldGet(this, _tooltip).classList.add('op-controls__tooltip--visible');
                }
                else {
                    __classPrivateFieldGet(this, _tooltip).classList.remove('op-controls__tooltip--visible');
                }
                __classPrivateFieldGet(this, _tooltip).style.left = `${pos}px`;
                __classPrivateFieldGet(this, _tooltip).innerHTML = isNaN(time) ? '00:00' : formatTime(time);
            };
            __classPrivateFieldGet(this, _events).global.mousemove = (e) => {
                if (!e.target.closest('.op-controls__progress') || __classPrivateFieldGet(this, _player).isAd()) {
                    __classPrivateFieldGet(this, _tooltip).classList.remove('op-controls__tooltip--visible');
                }
            };
        }
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        Object.keys(__classPrivateFieldGet(this, _events).slider).forEach(event => {
            __classPrivateFieldGet(this, _slider).addEventListener(event, __classPrivateFieldGet(this, _events).slider[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _progress).addEventListener('keydown', __classPrivateFieldGet(this, _player).getEvents().keydown, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _progress).addEventListener('mousemove', __classPrivateFieldGet(this, _events).container.mousemove, EVENT_OPTIONS);
        document.addEventListener('mousemove', __classPrivateFieldGet(this, _events).global.mousemove, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getControls().getContainer().addEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(__classPrivateFieldGet(this, _progress));
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events)[event]);
        });
        Object.keys(__classPrivateFieldGet(this, _events).slider).forEach(event => {
            __classPrivateFieldGet(this, _slider).removeEventListener(event, __classPrivateFieldGet(this, _events).slider[event]);
        });
        __classPrivateFieldGet(this, _progress).removeEventListener('keydown', __classPrivateFieldGet(this, _player).getEvents().keydown);
        __classPrivateFieldGet(this, _progress).removeEventListener('mousemove', __classPrivateFieldGet(this, _events).container.mousemove);
        document.removeEventListener('mousemove', __classPrivateFieldGet(this, _events).global.mousemove);
        __classPrivateFieldGet(this, _player).getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        __classPrivateFieldGet(this, _player).getControls().getContainer().removeEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged);
        removeElement(__classPrivateFieldGet(this, _buffer));
        removeElement(__classPrivateFieldGet(this, _played));
        removeElement(__classPrivateFieldGet(this, _slider));
        if (!IS_IOS && !IS_ANDROID) {
            removeElement(__classPrivateFieldGet(this, _tooltip));
        }
        removeElement(__classPrivateFieldGet(this, _progress));
    }
    _keydownEvent(e) {
        const el = __classPrivateFieldGet(this, _player).activeElement();
        const isAd = __classPrivateFieldGet(this, _player).isAd();
        const key = e.which || e.keyCode || 0;
        const newStep = __classPrivateFieldGet(this, _player).getOptions().step ? __classPrivateFieldGet(this, _player).getOptions().step : el.duration * 0.05;
        const step = el.duration !== Infinity ? newStep : __classPrivateFieldGet(this, _player).getOptions().progress.duration;
        if (key === 35 && !isAd) {
            el.currentTime = el.duration;
            e.preventDefault();
        }
        else if (key === 36 && !isAd) {
            el.currentTime = 0;
            e.preventDefault();
        }
        else if ((key === 37 || key === 39) && !isAd && el.duration !== Infinity) {
            el.currentTime += key === 37 ? (step * -1) : step;
            if (el.currentTime < 0) {
                el.currentTime = 0;
            }
            else if (el.currentTime >= el.duration) {
                el.currentTime = el.duration;
            }
            e.preventDefault();
        }
    }
}
_player = new WeakMap(), _progress = new WeakMap(), _slider = new WeakMap(), _buffer = new WeakMap(), _played = new WeakMap(), _tooltip = new WeakMap(), _events = new WeakMap(), _forcePause = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Progress;
