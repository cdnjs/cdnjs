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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _player, _events, _recoverDecodingErrorDate, _recoverSwapAudioCodecDate, _options, _autoplay;
import { DVR_THRESHOLD, EVENT_OPTIONS, SUPPORTS_HLS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isHlsSource } from '../utils/media';
import Native from './native';
class HlsMedia extends Native {
    constructor(element, mediaSource, autoplay = false, options) {
        super(element, mediaSource);
        _player.set(this, void 0);
        _events.set(this, {});
        _recoverDecodingErrorDate.set(this, 0);
        _recoverSwapAudioCodecDate.set(this, 0);
        _options.set(this, undefined);
        _autoplay.set(this, void 0);
        __classPrivateFieldSet(this, _options, options);
        this.element = element;
        this.media = mediaSource;
        __classPrivateFieldSet(this, _autoplay, autoplay);
        this.promise = (typeof Hls === 'undefined') ?
            loadScript('https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js') :
            new Promise(resolve => {
                resolve({});
            });
        this.promise.then(this._create.bind(this));
        return this;
    }
    canPlayType(mimeType) {
        return SUPPORTS_HLS() && mimeType === 'application/x-mpegURL';
    }
    load() {
        __classPrivateFieldGet(this, _player).detachMedia();
        __classPrivateFieldGet(this, _player).loadSource(this.media.src);
        __classPrivateFieldGet(this, _player).attachMedia(this.element);
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!__classPrivateFieldGet(this, _events)) {
            __classPrivateFieldSet(this, _events, Hls.Events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
            });
        }
    }
    destroy() {
        this._revoke();
    }
    set src(media) {
        if (isHlsSource(media)) {
            this._revoke();
            __classPrivateFieldSet(this, _player, new Hls(__classPrivateFieldGet(this, _options)));
            __classPrivateFieldGet(this, _player).loadSource(media.src);
            __classPrivateFieldGet(this, _player).attachMedia(this.element);
            __classPrivateFieldSet(this, _events, Hls.Events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
            });
        }
    }
    get levels() {
        const levels = [];
        if (__classPrivateFieldGet(this, _player) && __classPrivateFieldGet(this, _player).levels && __classPrivateFieldGet(this, _player).levels.length) {
            Object.keys(__classPrivateFieldGet(this, _player).levels).forEach(item => {
                const { height, name } = __classPrivateFieldGet(this, _player).levels[item];
                const level = {
                    height,
                    id: item,
                    label: name || null,
                };
                levels.push(level);
            });
        }
        return levels;
    }
    set level(level) {
        __classPrivateFieldGet(this, _player).currentLevel = level;
    }
    get level() {
        return __classPrivateFieldGet(this, _player) ? __classPrivateFieldGet(this, _player).currentLevel : -1;
    }
    _create() {
        let playerOptions = __classPrivateFieldGet(this, _options);
        if (!playerOptions) {
            playerOptions = {};
        }
        const autoplay = !!(this.element.preload === 'auto' || __classPrivateFieldGet(this, _autoplay));
        playerOptions.autoStartLoad = autoplay;
        __classPrivateFieldSet(this, _player, new Hls(playerOptions));
        this.instance = __classPrivateFieldGet(this, _player);
        __classPrivateFieldSet(this, _events, Hls.Events);
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
        });
        if (!autoplay) {
            this.element.addEventListener('play', () => {
                if (__classPrivateFieldGet(this, _player)) {
                    __classPrivateFieldGet(this, _player).startLoad();
                }
            }, EVENT_OPTIONS);
            this.element.addEventListener('pause', () => {
                if (__classPrivateFieldGet(this, _player)) {
                    __classPrivateFieldGet(this, _player).stopLoad();
                }
            }, EVENT_OPTIONS);
        }
    }
    _assign(event, data) {
        if (event === 'hlsError') {
            const errorDetails = {
                detail: {
                    data,
                    message: data[1].details,
                    type: 'HLS',
                },
            };
            const errorEvent = addEvent('playererror', errorDetails);
            this.element.dispatchEvent(errorEvent);
            data = data[1];
            const { type, fatal } = data, details = __rest(data, ["type", "fatal"]);
            if (fatal) {
                switch (type) {
                    case 'mediaError':
                        const now = new Date().getTime();
                        if (!__classPrivateFieldGet(this, _recoverDecodingErrorDate) || (now - __classPrivateFieldGet(this, _recoverDecodingErrorDate)) > 3000) {
                            __classPrivateFieldSet(this, _recoverDecodingErrorDate, new Date().getTime());
                            __classPrivateFieldGet(this, _player).recoverMediaError();
                        }
                        else if (!__classPrivateFieldGet(this, _recoverSwapAudioCodecDate) || (now - __classPrivateFieldGet(this, _recoverSwapAudioCodecDate)) > 3000) {
                            __classPrivateFieldSet(this, _recoverSwapAudioCodecDate, new Date().getTime());
                            console.warn('Attempting to swap Audio Codec and recover from media error');
                            __classPrivateFieldGet(this, _player).swapAudioCodec();
                            __classPrivateFieldGet(this, _player).recoverMediaError();
                        }
                        else {
                            const msg = 'Cannot recover, last media error recovery failed';
                            console.error(msg);
                            const mediaEvent = addEvent(type, details);
                            this.element.dispatchEvent(mediaEvent);
                        }
                        break;
                    case 'networkError':
                        const message = 'Network error';
                        console.error(message);
                        const networkEvent = addEvent(type, details);
                        this.element.dispatchEvent(networkEvent);
                        break;
                    default:
                        __classPrivateFieldGet(this, _player).destroy();
                        const fatalEvent = addEvent(type, details);
                        this.element.dispatchEvent(fatalEvent);
                        break;
                }
            }
            else {
                const err = addEvent(type, details);
                this.element.dispatchEvent(err);
            }
        }
        else {
            if (event === 'hlsLevelLoaded' && data[1].details.live === true) {
                this.element.setAttribute('op-live__enabled', 'true');
                const timeEvent = addEvent('timeupdate');
                this.element.dispatchEvent(timeEvent);
            }
            else if (event === 'hlsLevelUpdated' && data[1].details.live === true && data[1].details.totalduration > DVR_THRESHOLD) {
                this.element.setAttribute('op-dvr__enabled', 'true');
                const timeEvent = addEvent('timeupdate');
                this.element.dispatchEvent(timeEvent);
            }
            else if (event === 'hlsFragParsingMetadata') {
                const metaEvent = addEvent('metadataready', data[1]);
                this.element.dispatchEvent(metaEvent);
            }
            const e = addEvent(event, data[1]);
            this.element.dispatchEvent(e);
        }
    }
    _revoke() {
        __classPrivateFieldGet(this, _player).stopLoad();
        if (__classPrivateFieldGet(this, _events)) {
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).off(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
            });
        }
        this.element.removeEventListener('play', () => {
            if (__classPrivateFieldGet(this, _player)) {
                __classPrivateFieldGet(this, _player).startLoad();
            }
        });
        this.element.removeEventListener('pause', () => {
            if (__classPrivateFieldGet(this, _player)) {
                __classPrivateFieldGet(this, _player).stopLoad();
            }
        });
        __classPrivateFieldGet(this, _player).destroy();
        __classPrivateFieldSet(this, _player, null);
    }
}
_player = new WeakMap(), _events = new WeakMap(), _recoverDecodingErrorDate = new WeakMap(), _recoverSwapAudioCodecDate = new WeakMap(), _options = new WeakMap(), _autoplay = new WeakMap();
export default HlsMedia;
