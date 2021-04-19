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
var _player, _events, _options;
import { HAS_MSE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isDashSource } from '../utils/media';
import Native from './native';
class DashMedia extends Native {
    constructor(element, mediaSource, options) {
        super(element, mediaSource);
        _player.set(this, void 0);
        _events.set(this, {});
        _options.set(this, {});
        __classPrivateFieldSet(this, _options, options);
        this.promise = (typeof dashjs === 'undefined') ?
            loadScript('https://cdn.dashjs.org/latest/dash.all.min.js') :
            new Promise(resolve => {
                resolve({});
            });
        this.promise.then(() => {
            __classPrivateFieldSet(this, _player, dashjs.MediaPlayer().create());
            this.instance = __classPrivateFieldGet(this, _player);
        });
        return this;
    }
    canPlayType(mimeType) {
        return HAS_MSE && mimeType === 'application/dash+xml';
    }
    load() {
        this._preparePlayer();
        __classPrivateFieldGet(this, _player).attachSource(this.media.src);
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!__classPrivateFieldGet(this, _events)) {
            __classPrivateFieldSet(this, _events, dashjs.MediaPlayer.events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], this._assign.bind(this));
            });
        }
    }
    destroy() {
        this._revoke();
    }
    set src(media) {
        if (isDashSource(media)) {
            this._revoke();
            __classPrivateFieldSet(this, _player, dashjs.MediaPlayer().create());
            this._preparePlayer();
            __classPrivateFieldGet(this, _player).attachSource(media.src);
            __classPrivateFieldSet(this, _events, dashjs.MediaPlayer.events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], this._assign.bind(this));
            });
        }
    }
    get levels() {
        const levels = [];
        if (__classPrivateFieldGet(this, _player)) {
            const bitrates = __classPrivateFieldGet(this, _player).getBitrateInfoListFor('video');
            if (bitrates.length) {
                bitrates.forEach((item) => {
                    if (bitrates[item]) {
                        const { height, name } = bitrates[item];
                        const level = {
                            height,
                            id: item,
                            label: name || null,
                        };
                        levels.push(level);
                    }
                });
            }
        }
        return levels;
    }
    set level(level) {
        if (level === 0) {
            __classPrivateFieldGet(this, _player).setAutoSwitchQuality(true);
        }
        else {
            __classPrivateFieldGet(this, _player).setAutoSwitchQuality(false);
            __classPrivateFieldGet(this, _player).setQualityFor('video', level);
        }
    }
    get level() {
        return __classPrivateFieldGet(this, _player) ? __classPrivateFieldGet(this, _player).getQualityFor('video') : -1;
    }
    _assign(event) {
        if (event.type === 'error') {
            const details = {
                detail: {
                    message: event,
                    type: 'M(PEG)-DASH',
                },
            };
            const errorEvent = addEvent('playererror', details);
            this.element.dispatchEvent(errorEvent);
        }
        else {
            const e = addEvent(event.type, event);
            this.element.dispatchEvent(e);
        }
    }
    _revoke() {
        if (__classPrivateFieldGet(this, _events)) {
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).off(__classPrivateFieldGet(this, _events)[event], this._assign.bind(this));
            });
            __classPrivateFieldSet(this, _events, []);
        }
        __classPrivateFieldGet(this, _player).reset();
    }
    _preparePlayer() {
        if (typeof __classPrivateFieldGet(this, _player).getDebug().setLogToBrowserConsole === 'undefined') {
            __classPrivateFieldGet(this, _player).updateSettings({
                debug: {
                    logLevel: dashjs.Debug.LOG_LEVEL_NONE,
                },
                streaming: {
                    fastSwitchEnabled: true,
                    scheduleWhilePaused: false,
                },
            });
        }
        else {
            __classPrivateFieldGet(this, _player).getDebug().setLogToBrowserConsole(false);
            __classPrivateFieldGet(this, _player).setScheduleWhilePaused(false);
            __classPrivateFieldGet(this, _player).setFastSwitchEnabled(true);
        }
        __classPrivateFieldGet(this, _player).initialize();
        __classPrivateFieldGet(this, _player).attachView(this.element);
        __classPrivateFieldGet(this, _player).setAutoPlay(false);
        if (__classPrivateFieldGet(this, _options) && typeof __classPrivateFieldGet(this, _options).drm === 'object' && Object.keys(__classPrivateFieldGet(this, _options).drm).length) {
            __classPrivateFieldGet(this, _player).setProtectionData(__classPrivateFieldGet(this, _options).drm);
            if (__classPrivateFieldGet(this, _options).robustnessLevel && __classPrivateFieldGet(this, _options).robustnessLevel) {
                __classPrivateFieldGet(this, _player).getProtectionController().setRobustnessLevel(__classPrivateFieldGet(this, _options).robustnessLevel);
            }
        }
    }
}
_player = new WeakMap(), _events = new WeakMap(), _options = new WeakMap();
export default DashMedia;
