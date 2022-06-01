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
var _HTML5Media_currentLevel, _HTML5Media_levelList, _HTML5Media_isStreaming, _HTML5Media_retryCount, _HTML5Media_started, _HTML5Media_timer;
import { DVR_THRESHOLD, EVENT_OPTIONS } from '../utils/constants';
import { addEvent, isAudio, isVideo } from '../utils/general';
import { isHlsSource } from '../utils/media';
import Native from './native';
class HTML5Media extends Native {
    constructor(element, mediaFile) {
        super(element, mediaFile);
        _HTML5Media_currentLevel.set(this, void 0);
        _HTML5Media_levelList.set(this, []);
        _HTML5Media_isStreaming.set(this, false);
        _HTML5Media_retryCount.set(this, 0);
        _HTML5Media_started.set(this, false);
        _HTML5Media_timer.set(this, void 0);
        if (!isAudio(element) && !isVideo(element)) {
            throw new TypeError('Native method only supports video/audio tags');
        }
        this._clearTimeout = this._clearTimeout.bind(this);
        this._setTimeout = this._setTimeout.bind(this);
        this._dispatchError = this._dispatchError.bind(this);
        this._isDvrEnabled = this._isDvrEnabled.bind(this);
        this._readMediadataInfo = this._readMediadataInfo.bind(this);
        __classPrivateFieldSet(this, _HTML5Media_isStreaming, isHlsSource(mediaFile), "f");
        this.element.addEventListener('playing', this._clearTimeout, EVENT_OPTIONS);
        this.element.addEventListener('stalled', this._setTimeout, EVENT_OPTIONS);
        this.element.addEventListener('error', this._dispatchError, EVENT_OPTIONS);
        this.element.addEventListener('loadeddata', this._isDvrEnabled, EVENT_OPTIONS);
        this.element.textTracks.addEventListener('addtrack', this._readMediadataInfo, EVENT_OPTIONS);
        return this;
    }
    canPlayType(mimeType) {
        return !!this.element.canPlayType(mimeType).replace('no', '');
    }
    load() {
        this.element.load();
    }
    destroy() {
        this.element.removeEventListener('playing', this._clearTimeout);
        this.element.removeEventListener('stalled', this._setTimeout);
        this.element.removeEventListener('error', this._dispatchError);
        this.element.removeEventListener('loadeddata', this._isDvrEnabled);
        this.element.textTracks.removeEventListener('addtrack', this._readMediadataInfo);
        return this;
    }
    get levels() {
        if (!__classPrivateFieldGet(this, _HTML5Media_levelList, "f").length) {
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const level = {
                    height: 0,
                    id: `${i}`,
                    label: levels[i].getAttribute('title') || '',
                };
                __classPrivateFieldGet(this, _HTML5Media_levelList, "f").push(level);
            }
        }
        return __classPrivateFieldGet(this, _HTML5Media_levelList, "f");
    }
    set level(level) {
        const idx = __classPrivateFieldGet(this, _HTML5Media_levelList, "f").findIndex((item) => item.id === level);
        if (idx > -1) {
            __classPrivateFieldSet(this, _HTML5Media_currentLevel, this.levels[idx], "f");
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const source = levels[i].getAttribute('src');
                if (source && parseInt(__classPrivateFieldGet(this, _HTML5Media_currentLevel, "f").id, 10) === i) {
                    this.element.src = source;
                }
            }
        }
    }
    get level() {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _HTML5Media_currentLevel, "f")) === null || _a === void 0 ? void 0 : _a.id) || '-1';
    }
    set src(media) {
        this.element.src = media.src;
    }
    _isDvrEnabled() {
        const time = this.element.seekable.end(this.element.seekable.length - 1) - this.element.seekable.start(0);
        if (__classPrivateFieldGet(this, _HTML5Media_isStreaming, "f") && time > DVR_THRESHOLD && !this.element.getAttribute('op-dvr__enabled')) {
            this.element.setAttribute('op-dvr__enabled', 'true');
            const timeEvent = addEvent('timeupdate');
            this.element.dispatchEvent(timeEvent);
        }
    }
    _readMediadataInfo(e) {
        var _a;
        const target = e;
        if (((_a = target === null || target === void 0 ? void 0 : target.track) === null || _a === void 0 ? void 0 : _a.kind) === 'metadata') {
            target.track.mode = 'hidden';
            target.track.addEventListener('cuechange', (event) => {
                const track = event.target;
                const cue = track.activeCues ? track.activeCues[0] : null;
                if (cue) {
                    const metaDataEvent = addEvent('metadataready', { detail: cue });
                    this.element.dispatchEvent(metaDataEvent);
                }
            }, EVENT_OPTIONS);
        }
    }
    _setTimeout() {
        if (!__classPrivateFieldGet(this, _HTML5Media_started, "f") && window !== undefined) {
            __classPrivateFieldSet(this, _HTML5Media_started, true, "f");
            __classPrivateFieldSet(this, _HTML5Media_timer, window.setInterval(() => {
                var _a;
                if (__classPrivateFieldGet(this, _HTML5Media_retryCount, "f") >= 30) {
                    clearInterval(__classPrivateFieldGet(this, _HTML5Media_timer, "f"));
                    const message = 'Media download failed part-way due to a network error';
                    const details = {
                        detail: {
                            data: { message, error: 2 },
                            message,
                            type: 'HTML5',
                        },
                    };
                    const errorEvent = addEvent('playererror', details);
                    this.element.dispatchEvent(errorEvent);
                    __classPrivateFieldSet(this, _HTML5Media_retryCount, 0, "f");
                    __classPrivateFieldSet(this, _HTML5Media_started, false, "f");
                }
                else {
                    __classPrivateFieldSet(this, _HTML5Media_retryCount, (_a = __classPrivateFieldGet(this, _HTML5Media_retryCount, "f"), _a++, _a), "f");
                }
            }, 1000), "f");
        }
    }
    _clearTimeout() {
        if (__classPrivateFieldGet(this, _HTML5Media_timer, "f")) {
            clearInterval(__classPrivateFieldGet(this, _HTML5Media_timer, "f"));
            __classPrivateFieldSet(this, _HTML5Media_retryCount, 0, "f");
            __classPrivateFieldSet(this, _HTML5Media_started, false, "f");
        }
    }
    _dispatchError(e) {
        let defaultMessage;
        const target = e.target;
        const error = target === null || target === void 0 ? void 0 : target.error;
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_ABORTED:
                defaultMessage = 'Media playback aborted';
                break;
            case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_NETWORK:
                defaultMessage = 'Media download failed part-way due to a network error';
                break;
            case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_DECODE:
                defaultMessage = `Media playback aborted due to a corruption problem or because the
                    media used features your browser did not support.`;
                break;
            case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                defaultMessage = `Media could not be loaded, either because the server or network failed
                    or because the format is not supported.`;
                break;
            default:
                defaultMessage = 'Unknown error occurred.';
                break;
        }
        const details = {
            detail: {
                data: Object.assign(Object.assign({}, e), { message: defaultMessage, error: error === null || error === void 0 ? void 0 : error.code }),
                message: defaultMessage,
                type: 'HTML5',
            },
        };
        const errorEvent = addEvent('playererror', details);
        this.element.dispatchEvent(errorEvent);
    }
}
_HTML5Media_currentLevel = new WeakMap(), _HTML5Media_levelList = new WeakMap(), _HTML5Media_isStreaming = new WeakMap(), _HTML5Media_retryCount = new WeakMap(), _HTML5Media_started = new WeakMap(), _HTML5Media_timer = new WeakMap();
export default HTML5Media;
