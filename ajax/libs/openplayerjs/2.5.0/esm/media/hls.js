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
import { DVR_THRESHOLD, EVENT_OPTIONS, SUPPORTS_HLS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isHlsSource } from '../utils/media';
import Native from './native';
class HlsMedia extends Native {
    constructor(element, mediaSource, autoplay = false, options) {
        super(element, mediaSource);
        this.events = {};
        this.recoverDecodingErrorDate = 0;
        this.recoverSwapAudioCodecDate = 0;
        this.options = undefined;
        this.options = options;
        this.element = element;
        this.media = mediaSource;
        this.autoplay = autoplay;
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
        this.player.detachMedia();
        this.player.loadSource(this.media.src);
        this.player.attachMedia(this.element);
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!this.events) {
            this.events = Hls.Events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], (...args) => this._assign(this.events[event], args));
            });
        }
    }
    destroy() {
        this._revoke();
    }
    set src(media) {
        if (isHlsSource(media)) {
            this._revoke();
            this.player = new Hls(this.options);
            this.player.loadSource(media.src);
            this.player.attachMedia(this.element);
            this.events = Hls.Events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], (...args) => this._assign(this.events[event], args));
            });
        }
    }
    get levels() {
        const levels = [];
        if (this.player && this.player.levels && this.player.levels.length) {
            Object.keys(this.player.levels).forEach(item => {
                const { height, name } = this.player.levels[item];
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
        this.player.currentLevel = level;
    }
    get level() {
        return this.player ? this.player.currentLevel : -1;
    }
    _create() {
        let { options } = this;
        if (!options) {
            options = {};
        }
        const autoplay = !!(this.element.preload === 'auto' || this.autoplay);
        options.autoStartLoad = autoplay;
        this.player = new Hls(options);
        this.instance = this.player;
        this.events = Hls.Events;
        Object.keys(this.events).forEach(event => {
            this.player.on(this.events[event], (...args) => this._assign(this.events[event], args));
        });
        if (!autoplay) {
            this.element.addEventListener('play', () => {
                if (this.player) {
                    this.player.startLoad();
                }
            }, EVENT_OPTIONS);
            this.element.addEventListener('pause', () => {
                if (this.player) {
                    this.player.stopLoad();
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
                        if (!this.recoverDecodingErrorDate || (now - this.recoverDecodingErrorDate) > 3000) {
                            this.recoverDecodingErrorDate = new Date().getTime();
                            this.player.recoverMediaError();
                        }
                        else if (!this.recoverSwapAudioCodecDate || (now - this.recoverSwapAudioCodecDate) > 3000) {
                            this.recoverSwapAudioCodecDate = new Date().getTime();
                            console.warn('Attempting to swap Audio Codec and recover from media error');
                            this.player.swapAudioCodec();
                            this.player.recoverMediaError();
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
                        this.player.destroy();
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
        this.player.stopLoad();
        if (this.events) {
            Object.keys(this.events).forEach(event => {
                this.player.off(this.events[event], (...args) => this._assign(this.events[event], args));
            });
        }
        this.element.removeEventListener('play', () => {
            if (this.player) {
                this.player.startLoad();
            }
        });
        this.element.removeEventListener('pause', () => {
            if (this.player) {
                this.player.stopLoad();
            }
        });
        this.player.destroy();
        this.player = null;
    }
}
export default HlsMedia;
