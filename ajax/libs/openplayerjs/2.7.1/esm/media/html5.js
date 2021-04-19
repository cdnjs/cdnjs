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
var _currentLevel, _levelList, _isStreaming;
import { DVR_THRESHOLD, EVENT_OPTIONS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isAudio, isVideo } from '../utils/general';
import { isHlsSource } from '../utils/media';
import Native from './native';
class HTML5Media extends Native {
    constructor(element, mediaFile) {
        super(element, mediaFile);
        _currentLevel.set(this, null);
        _levelList.set(this, []);
        _isStreaming.set(this, false);
        let retryCount = 0;
        let started = false;
        let timer;
        function timeout() {
            if (!started) {
                started = true;
                timer = setInterval(() => {
                    if (retryCount >= 30) {
                        clearInterval(timer);
                        const message = 'Media download failed part-way due to a network error';
                        const details = {
                            detail: {
                                data: { message, error: 2 },
                                message,
                                type: 'HTML5',
                            },
                        };
                        const errorEvent = addEvent('playererror', details);
                        element.dispatchEvent(errorEvent);
                        retryCount = 0;
                        started = false;
                    }
                    else {
                        retryCount++;
                    }
                }, 1000);
            }
        }
        element.addEventListener('playing', () => {
            if (timer) {
                clearInterval(timer);
                retryCount = 0;
                started = false;
            }
        });
        element.addEventListener('stalled', timeout);
        element.addEventListener('error', (e) => {
            let defaultMessage;
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    defaultMessage = 'Media playback aborted';
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    defaultMessage = 'Media download failed part-way due to a network error';
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    defaultMessage = 'Media playback aborted due to a corruption problem or because the media used features your browser did not support.';
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    defaultMessage = 'Media could not be loaded, either because the server or network failed or because the format is not supported.';
                    break;
                default:
                    defaultMessage = 'Unknown error occurred.';
                    break;
            }
            const details = {
                detail: {
                    data: Object.assign(Object.assign({}, e), { message: e.message || defaultMessage, error: e.target.error.code }),
                    message: e.message || defaultMessage,
                    type: 'HTML5',
                },
            };
            const errorEvent = addEvent('playererror', details);
            element.dispatchEvent(errorEvent);
        }, EVENT_OPTIONS);
        if (!isAudio(element) && !isVideo(element)) {
            throw new TypeError('Native method only supports video/audio tags');
        }
        __classPrivateFieldSet(this, _isStreaming, isHlsSource(mediaFile));
        this.element.addEventListener('loadeddata', this._isDvrEnabled.bind(this), EVENT_OPTIONS);
        this.element.textTracks.addEventListener('addtrack', this._readMediadataInfo.bind(this), EVENT_OPTIONS);
        return this;
    }
    canPlayType(mimeType) {
        return !!(this.element.canPlayType(mimeType).replace('no', ''));
    }
    load() {
        this.element.load();
    }
    destroy() {
        this.element.removeEventListener('loadeddata', this._isDvrEnabled.bind(this));
        this.element.textTracks.removeEventListener('addtrack', this._readMediadataInfo.bind(this));
        return this;
    }
    get levels() {
        if (!__classPrivateFieldGet(this, _levelList).length) {
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const level = {
                    height: 0,
                    id: `${i}`,
                    label: levels[i].getAttribute('title'),
                };
                __classPrivateFieldGet(this, _levelList).push(level);
            }
        }
        return __classPrivateFieldGet(this, _levelList);
    }
    set level(level) {
        const idx = __classPrivateFieldGet(this, _levelList).findIndex((item) => parseInt(item.id, 10) === level);
        if (idx > -1) {
            __classPrivateFieldSet(this, _currentLevel, this.levels[idx]);
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const source = levels[i].getAttribute('src');
                if (source && parseInt(__classPrivateFieldGet(this, _currentLevel).id, 10) === i) {
                    this.element.src = source;
                }
            }
        }
    }
    get level() {
        return __classPrivateFieldGet(this, _currentLevel) ? __classPrivateFieldGet(this, _currentLevel).id : '-1';
    }
    set src(media) {
        this.element.src = media.src;
    }
    _isDvrEnabled() {
        const time = this.element.seekable.end(this.element.seekable.length - 1) - this.element.seekable.start(0);
        if (__classPrivateFieldGet(this, _isStreaming) && time > DVR_THRESHOLD && !this.element.getAttribute('op-dvr__enabled')) {
            this.element.setAttribute('op-dvr__enabled', 'true');
            const timeEvent = addEvent('timeupdate');
            this.element.dispatchEvent(timeEvent);
        }
    }
    _readMediadataInfo(e) {
        const target = e;
        if (target.track.kind === 'metadata') {
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
}
_currentLevel = new WeakMap(), _levelList = new WeakMap(), _isStreaming = new WeakMap();
export default HTML5Media;
