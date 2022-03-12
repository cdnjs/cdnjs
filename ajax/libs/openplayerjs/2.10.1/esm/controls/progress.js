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
var _Progress_player, _Progress_progress, _Progress_slider, _Progress_buffer, _Progress_played, _Progress_tooltip, _Progress_events, _Progress_forcePause, _Progress_controlPosition, _Progress_controlLayer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { isAudio, offset } from '../utils/general';
import { formatTime } from '../utils/time';
class Progress {
    constructor(player, position, layer) {
        _Progress_player.set(this, void 0);
        _Progress_progress.set(this, void 0);
        _Progress_slider.set(this, void 0);
        _Progress_buffer.set(this, void 0);
        _Progress_played.set(this, void 0);
        _Progress_tooltip.set(this, void 0);
        _Progress_events.set(this, {
            container: {},
            controls: {},
            global: {},
            media: {},
            slider: {},
        });
        _Progress_forcePause.set(this, false);
        _Progress_controlPosition.set(this, void 0);
        _Progress_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Progress_player, player, "f");
        __classPrivateFieldSet(this, _Progress_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Progress_controlLayer, layer, "f");
        this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
        return this;
    }
    create() {
        var _a;
        const { labels } = __classPrivateFieldGet(this, _Progress_player, "f").getOptions();
        __classPrivateFieldSet(this, _Progress_progress, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Progress_progress, "f").className = `op-controls__progress op-control__${__classPrivateFieldGet(this, _Progress_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Progress_progress, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.progressSlider) || '');
        __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemin', '0');
        __classPrivateFieldSet(this, _Progress_slider, document.createElement('input'), "f");
        __classPrivateFieldGet(this, _Progress_slider, "f").type = 'range';
        __classPrivateFieldGet(this, _Progress_slider, "f").className = 'op-controls__progress--seek';
        __classPrivateFieldGet(this, _Progress_slider, "f").tabIndex = -1;
        __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('min', '0');
        __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', '0');
        __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('step', '0.1');
        __classPrivateFieldGet(this, _Progress_slider, "f").value = '0';
        __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.progressRail) || '');
        __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('role', 'slider');
        __classPrivateFieldSet(this, _Progress_buffer, document.createElement('progress'), "f");
        __classPrivateFieldGet(this, _Progress_buffer, "f").className = 'op-controls__progress--buffer';
        __classPrivateFieldGet(this, _Progress_buffer, "f").setAttribute('max', '100');
        __classPrivateFieldGet(this, _Progress_buffer, "f").value = 0;
        __classPrivateFieldSet(this, _Progress_played, document.createElement('progress'), "f");
        __classPrivateFieldGet(this, _Progress_played, "f").className = 'op-controls__progress--played';
        __classPrivateFieldGet(this, _Progress_played, "f").setAttribute('max', '100');
        __classPrivateFieldGet(this, _Progress_played, "f").setAttribute('role', 'presentation');
        __classPrivateFieldGet(this, _Progress_played, "f").value = 0;
        __classPrivateFieldGet(this, _Progress_progress, "f").appendChild(__classPrivateFieldGet(this, _Progress_slider, "f"));
        __classPrivateFieldGet(this, _Progress_progress, "f").appendChild(__classPrivateFieldGet(this, _Progress_played, "f"));
        __classPrivateFieldGet(this, _Progress_progress, "f").appendChild(__classPrivateFieldGet(this, _Progress_buffer, "f"));
        if (!IS_IOS && !IS_ANDROID) {
            __classPrivateFieldSet(this, _Progress_tooltip, document.createElement('span'), "f");
            __classPrivateFieldGet(this, _Progress_tooltip, "f").className = 'op-controls__tooltip';
            __classPrivateFieldGet(this, _Progress_tooltip, "f").tabIndex = -1;
            __classPrivateFieldGet(this, _Progress_tooltip, "f").innerHTML = '00:00';
            __classPrivateFieldGet(this, _Progress_progress, "f").appendChild(__classPrivateFieldGet(this, _Progress_tooltip, "f"));
        }
        const setInitialProgress = () => {
            var _a;
            if (__classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('error')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('error');
            }
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            if (el.duration !== Infinity &&
                !__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-live__enabled') &&
                !__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', `${el.duration}`);
                const current = __classPrivateFieldGet(this, _Progress_player, "f").isMedia() ? el.currentTime : el.duration - el.currentTime;
                __classPrivateFieldGet(this, _Progress_slider, "f").value = current.toString();
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemax', el.duration.toString());
            }
            else if (__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', '1');
                __classPrivateFieldGet(this, _Progress_slider, "f").value = '1';
                __classPrivateFieldGet(this, _Progress_slider, "f").style.backgroundSize = '100% 100%';
                __classPrivateFieldGet(this, _Progress_played, "f").value = 1;
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemax', '1');
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
            }
            else if (!((_a = __classPrivateFieldGet(this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
            }
        };
        let lastCurrentTime = 0;
        const defaultDuration = ((_a = __classPrivateFieldGet(this, _Progress_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _Progress_player, "f").getElement());
        __classPrivateFieldGet(this, _Progress_events, "f").media.loadedmetadata = setInitialProgress.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged = setInitialProgress.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").media.progress = (e) => {
            var _a;
            const el = e.target;
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
                if (el.duration > 0) {
                    for (let i = 0, total = el.buffered.length; i < total; i++) {
                        if (el.buffered.start(el.buffered.length - 1 - i) < el.currentTime) {
                            __classPrivateFieldGet(this, _Progress_buffer, "f").value = (el.buffered.end(el.buffered.length - 1 - i) / el.duration) * 100;
                            break;
                        }
                    }
                }
            }
            else if (!__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') &&
                __classPrivateFieldGet(this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' &&
                !((_a = __classPrivateFieldGet(this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.waiting = () => {
            if (isAudioEl && !__classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('loading')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.add('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('error')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('error');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.playererror = () => {
            if (isAudioEl && !__classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('error')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.add('error');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('loading')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('loading');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.pause = () => {
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            if (el.duration !== Infinity && !__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
                const current = el.currentTime;
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuenow', current.toString());
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuetext', formatTime(current));
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.play = () => {
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('loading')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('error')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('error');
            }
            if (__classPrivateFieldGet(this, _Progress_player, "f").activeElement().duration !== Infinity && !__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
                __classPrivateFieldGet(this, _Progress_progress, "f").removeAttribute('aria-valuenow');
                __classPrivateFieldGet(this, _Progress_progress, "f").removeAttribute('aria-valuetext');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.playing = () => {
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('loading')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('loading');
            }
            if (isAudioEl && __classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('error')) {
                __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('error');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.timeupdate = () => {
            var _a;
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            if (el.duration !== Infinity &&
                (!__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-live__enabled') || __classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled'))) {
                if (!__classPrivateFieldGet(this, _Progress_slider, "f").getAttribute('max') ||
                    __classPrivateFieldGet(this, _Progress_slider, "f").getAttribute('max') === '0' ||
                    parseFloat(__classPrivateFieldGet(this, _Progress_slider, "f").getAttribute('max') || '-1') !== el.duration) {
                    __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', `${el.duration}`);
                    __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
                }
                const duration = el.duration - el.currentTime + 1 >= 100 ? 100 : el.duration - el.currentTime + 1;
                const current = __classPrivateFieldGet(this, _Progress_player, "f").isMedia() ? el.currentTime : duration;
                const min = parseFloat(__classPrivateFieldGet(this, _Progress_slider, "f").min);
                const max = parseFloat(__classPrivateFieldGet(this, _Progress_slider, "f").max);
                __classPrivateFieldGet(this, _Progress_slider, "f").value = current.toString();
                __classPrivateFieldGet(this, _Progress_slider, "f").style.backgroundSize = `${((current - min) * 100) / (max - min)}% 100%`;
                __classPrivateFieldGet(this, _Progress_played, "f").value =
                    el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration)
                        ? defaultDuration
                        : (current / el.duration) * 100;
                if (__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && Math.floor(__classPrivateFieldGet(this, _Progress_played, "f").value) >= 99) {
                    lastCurrentTime = el.currentTime;
                    __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
                }
            }
            else if (!__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') &&
                __classPrivateFieldGet(this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' &&
                !((_a = __classPrivateFieldGet(this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
                __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.durationchange = () => {
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            const current = __classPrivateFieldGet(this, _Progress_player, "f").isMedia() ? el.currentTime : el.duration - el.currentTime;
            __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', `${el.duration}`);
            __classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemax', el.duration.toString());
            __classPrivateFieldGet(this, _Progress_played, "f").value =
                el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration)
                    ? defaultDuration
                    : (current / el.duration) * 100;
        };
        __classPrivateFieldGet(this, _Progress_events, "f").media.ended = () => {
            __classPrivateFieldGet(this, _Progress_slider, "f").style.backgroundSize = '0% 100%';
            __classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', '0');
            __classPrivateFieldGet(this, _Progress_buffer, "f").value = 0;
            __classPrivateFieldGet(this, _Progress_played, "f").value = 0;
        };
        const updateSlider = (e) => {
            if (__classPrivateFieldGet(this, _Progress_slider, "f").classList.contains('op-progress--pressed')) {
                return;
            }
            const target = e.target;
            __classPrivateFieldGet(this, _Progress_slider, "f").classList.add('.op-progress--pressed');
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            const min = parseFloat(target.min);
            const max = parseFloat(target.max);
            const val = parseFloat(target.value);
            __classPrivateFieldGet(this, _Progress_slider, "f").style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`;
            __classPrivateFieldGet(this, _Progress_played, "f").value =
                el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration)
                    ? defaultDuration
                    : (val / el.duration) * 100;
            if (__classPrivateFieldGet(this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
                el.currentTime = Math.round(__classPrivateFieldGet(this, _Progress_played, "f").value) >= 99 ? lastCurrentTime : val;
            }
            else {
                el.currentTime = val;
            }
            __classPrivateFieldGet(this, _Progress_slider, "f").classList.remove('.op-progress--pressed');
        };
        const forcePause = (e) => {
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            const key = e.which || e.keyCode || 0;
            if ((key === 1 || key === 0) && __classPrivateFieldGet(this, _Progress_player, "f").isMedia()) {
                if (!el.paused) {
                    el.pause();
                    __classPrivateFieldSet(this, _Progress_forcePause, true, "f");
                }
            }
        };
        const releasePause = () => {
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            if (__classPrivateFieldGet(this, _Progress_forcePause, "f") === true && __classPrivateFieldGet(this, _Progress_player, "f").isMedia()) {
                if (el.paused) {
                    el.play();
                    __classPrivateFieldSet(this, _Progress_forcePause, false, "f");
                }
            }
        };
        const mobileForcePause = (e) => {
            var _a;
            const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
            if (el.duration !== Infinity) {
                const { changedTouches } = e;
                const x = ((_a = changedTouches[0]) === null || _a === void 0 ? void 0 : _a.pageX) || 0;
                const pos = x - offset(__classPrivateFieldGet(this, _Progress_progress, "f")).left;
                const percentage = pos / __classPrivateFieldGet(this, _Progress_progress, "f").offsetWidth;
                const time = percentage * el.duration;
                __classPrivateFieldGet(this, _Progress_slider, "f").value = time.toString();
                updateSlider(e);
                if (!el.paused) {
                    el.pause();
                    __classPrivateFieldSet(this, _Progress_forcePause, true, "f");
                }
            }
        };
        __classPrivateFieldGet(this, _Progress_events, "f").slider.input = updateSlider.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").slider.change = updateSlider.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").slider.mousedown = forcePause.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").slider.mouseup = releasePause.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").slider.touchstart = mobileForcePause.bind(this);
        __classPrivateFieldGet(this, _Progress_events, "f").slider.touchend = releasePause.bind(this);
        if (!IS_IOS && !IS_ANDROID) {
            __classPrivateFieldGet(this, _Progress_events, "f").container.mousemove = (e) => {
                const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
                if (el.duration !== Infinity && !__classPrivateFieldGet(this, _Progress_player, "f").isAd()) {
                    const x = e.pageX;
                    let pos = x - offset(__classPrivateFieldGet(this, _Progress_progress, "f")).left;
                    const half = __classPrivateFieldGet(this, _Progress_tooltip, "f").offsetWidth / 2;
                    const percentage = pos / __classPrivateFieldGet(this, _Progress_progress, "f").offsetWidth;
                    const time = percentage * el.duration;
                    const mediaContainer = __classPrivateFieldGet(this, _Progress_player, "f").getContainer();
                    const limit = mediaContainer.offsetWidth - __classPrivateFieldGet(this, _Progress_tooltip, "f").offsetWidth;
                    if (pos <= 0 || x - offset(mediaContainer).left <= half) {
                        pos = 0;
                    }
                    else if (x - offset(mediaContainer).left >= limit) {
                        pos = limit - offset(__classPrivateFieldGet(this, _Progress_slider, "f")).left - 10;
                    }
                    else {
                        pos -= half;
                    }
                    if (percentage >= 0 && percentage <= 1) {
                        __classPrivateFieldGet(this, _Progress_tooltip, "f").classList.add('op-controls__tooltip--visible');
                    }
                    else {
                        __classPrivateFieldGet(this, _Progress_tooltip, "f").classList.remove('op-controls__tooltip--visible');
                    }
                    __classPrivateFieldGet(this, _Progress_tooltip, "f").style.left = `${pos}px`;
                    __classPrivateFieldGet(this, _Progress_tooltip, "f").innerHTML = Number.isNaN(time) ? '00:00' : formatTime(time);
                }
            };
            __classPrivateFieldGet(this, _Progress_events, "f").global.mousemove = (e) => {
                if (!e.target.closest('.op-controls__progress') || __classPrivateFieldGet(this, _Progress_player, "f").isAd()) {
                    __classPrivateFieldGet(this, _Progress_tooltip, "f").classList.remove('op-controls__tooltip--visible');
                }
            };
        }
        Object.keys(__classPrivateFieldGet(this, _Progress_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Progress_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Progress_events, "f").media[event], EVENT_OPTIONS);
        });
        Object.keys(__classPrivateFieldGet(this, _Progress_events, "f").slider).forEach((event) => {
            __classPrivateFieldGet(this, _Progress_slider, "f").addEventListener(event, __classPrivateFieldGet(this, _Progress_events, "f").slider[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _Progress_progress, "f").addEventListener('keydown', __classPrivateFieldGet(this, _Progress_player, "f").getEvents().keydown, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Progress_progress, "f").addEventListener('mousemove', __classPrivateFieldGet(this, _Progress_events, "f").container.mousemove, EVENT_OPTIONS);
        document.addEventListener('mousemove', __classPrivateFieldGet(this, _Progress_events, "f").global.mousemove, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Progress_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Progress_player, "f")
            .getControls()
            .getContainer()
            .addEventListener('controlschanged', __classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Progress_player, "f")
            .getControls()
            .getLayer(__classPrivateFieldGet(this, _Progress_controlLayer, "f"))
            .appendChild(__classPrivateFieldGet(this, _Progress_progress, "f"));
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _Progress_events, "f")).forEach((event) => {
            __classPrivateFieldGet(this, _Progress_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Progress_events, "f")[event]);
        });
        Object.keys(__classPrivateFieldGet(this, _Progress_events, "f").slider).forEach((event) => {
            __classPrivateFieldGet(this, _Progress_slider, "f").removeEventListener(event, __classPrivateFieldGet(this, _Progress_events, "f").slider[event]);
        });
        __classPrivateFieldGet(this, _Progress_progress, "f").removeEventListener('keydown', __classPrivateFieldGet(this, _Progress_player, "f").getEvents().keydown);
        __classPrivateFieldGet(this, _Progress_progress, "f").removeEventListener('mousemove', __classPrivateFieldGet(this, _Progress_events, "f").container.mousemove);
        document.removeEventListener('mousemove', __classPrivateFieldGet(this, _Progress_events, "f").global.mousemove);
        __classPrivateFieldGet(this, _Progress_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);
        __classPrivateFieldGet(this, _Progress_player, "f")
            .getControls()
            .getContainer()
            .removeEventListener('controlschanged', __classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged);
        __classPrivateFieldGet(this, _Progress_buffer, "f").remove();
        __classPrivateFieldGet(this, _Progress_played, "f").remove();
        __classPrivateFieldGet(this, _Progress_slider, "f").remove();
        if (!IS_IOS && !IS_ANDROID) {
            __classPrivateFieldGet(this, _Progress_tooltip, "f").remove();
        }
        __classPrivateFieldGet(this, _Progress_progress, "f").remove();
    }
    _enterSpaceKeyEvent(e) {
        const el = __classPrivateFieldGet(this, _Progress_player, "f").activeElement();
        const isAd = __classPrivateFieldGet(this, _Progress_player, "f").isAd();
        const key = e.which || e.keyCode || 0;
        if (!isAd && key >= 48 && key <= 57 && el.duration !== Infinity) {
            let step = 0;
            for (let i = 48, limit = 57; i <= limit; i++) {
                if (i < key) {
                    step++;
                }
            }
            el.currentTime = el.duration * (0.1 * step);
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
_Progress_player = new WeakMap(), _Progress_progress = new WeakMap(), _Progress_slider = new WeakMap(), _Progress_buffer = new WeakMap(), _Progress_played = new WeakMap(), _Progress_tooltip = new WeakMap(), _Progress_events = new WeakMap(), _Progress_forcePause = new WeakMap(), _Progress_controlPosition = new WeakMap(), _Progress_controlLayer = new WeakMap();
export default Progress;
