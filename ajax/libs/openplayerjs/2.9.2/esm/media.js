var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _Media_element, _Media_media, _Media_files, _Media_promisePlay, _Media_options, _Media_autoplay, _Media_mediaLoaded, _Media_customMedia, _Media_currentSrc;
import DashMedia from './media/dash';
import FlvMedia from './media/flv';
import HlsMedia from './media/hls';
import HTML5Media from './media/html5';
import * as source from './utils/media';
class Media {
    constructor(element, options, autoplay = false, customMedia) {
        _Media_element.set(this, void 0);
        _Media_media.set(this, void 0);
        _Media_files.set(this, void 0);
        _Media_promisePlay.set(this, void 0);
        _Media_options.set(this, void 0);
        _Media_autoplay.set(this, void 0);
        _Media_mediaLoaded.set(this, false);
        _Media_customMedia.set(this, {
            media: {},
            optionsKey: {},
            rules: [],
        });
        _Media_currentSrc.set(this, void 0);
        __classPrivateFieldSet(this, _Media_element, element, "f");
        __classPrivateFieldSet(this, _Media_options, options, "f");
        __classPrivateFieldSet(this, _Media_files, this._getMediaFiles(), "f");
        __classPrivateFieldSet(this, _Media_customMedia, customMedia, "f");
        __classPrivateFieldSet(this, _Media_autoplay, autoplay, "f");
        return this;
    }
    canPlayType(mimeType) {
        return __classPrivateFieldGet(this, _Media_media, "f").canPlayType(mimeType);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Media_mediaLoaded, "f")) {
                return;
            }
            __classPrivateFieldSet(this, _Media_mediaLoaded, true, "f");
            if (!__classPrivateFieldGet(this, _Media_files, "f").length) {
                throw new TypeError('Media not set');
            }
            if (__classPrivateFieldGet(this, _Media_media, "f") && typeof __classPrivateFieldGet(this, _Media_media, "f").destroy === 'function') {
                const sameMedia = __classPrivateFieldGet(this, _Media_files, "f").length === 1 && __classPrivateFieldGet(this, _Media_files, "f")[0].src === __classPrivateFieldGet(this, _Media_media, "f").media.src;
                if (!sameMedia) {
                    __classPrivateFieldGet(this, _Media_media, "f").destroy();
                }
            }
            __classPrivateFieldGet(this, _Media_files, "f").some(media => {
                try {
                    __classPrivateFieldSet(this, _Media_media, this._invoke(media), "f");
                }
                catch (e) {
                    __classPrivateFieldSet(this, _Media_media, new HTML5Media(__classPrivateFieldGet(this, _Media_element, "f"), media), "f");
                }
                return __classPrivateFieldGet(this, _Media_media, "f").canPlayType(media.type);
            });
            try {
                if (__classPrivateFieldGet(this, _Media_media, "f") === null) {
                    throw new TypeError('Media cannot be played with any valid media type');
                }
                yield __classPrivateFieldGet(this, _Media_media, "f").promise;
                __classPrivateFieldGet(this, _Media_media, "f").load();
            }
            catch (e) {
                if (__classPrivateFieldGet(this, _Media_media, "f")) {
                    __classPrivateFieldGet(this, _Media_media, "f").destroy();
                }
                throw e;
            }
        });
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Media_mediaLoaded, "f")) {
                __classPrivateFieldSet(this, _Media_mediaLoaded, true, "f");
                yield this.load();
                __classPrivateFieldSet(this, _Media_mediaLoaded, false, "f");
            }
            else {
                yield __classPrivateFieldGet(this, _Media_media, "f").promise;
            }
            __classPrivateFieldSet(this, _Media_promisePlay, __classPrivateFieldGet(this, _Media_media, "f").play(), "f");
            return __classPrivateFieldGet(this, _Media_promisePlay, "f");
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Media_promisePlay, "f") !== undefined) {
                yield __classPrivateFieldGet(this, _Media_promisePlay, "f");
            }
            __classPrivateFieldGet(this, _Media_media, "f").pause();
        });
    }
    destroy() {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").destroy();
        }
    }
    set src(media) {
        if (typeof media === 'string') {
            __classPrivateFieldGet(this, _Media_files, "f").push({
                src: media,
                type: source.predictType(media, __classPrivateFieldGet(this, _Media_element, "f")),
            });
        }
        else if (Array.isArray(media)) {
            __classPrivateFieldSet(this, _Media_files, media, "f");
        }
        else if (typeof media === 'object') {
            __classPrivateFieldGet(this, _Media_files, "f").push(media);
        }
        __classPrivateFieldSet(this, _Media_files, __classPrivateFieldGet(this, _Media_files, "f").filter(file => file.src), "f");
        if (__classPrivateFieldGet(this, _Media_files, "f").length > 0) {
            if (__classPrivateFieldGet(this, _Media_element, "f").src) {
                __classPrivateFieldGet(this, _Media_element, "f").setAttribute('data-op-file', __classPrivateFieldGet(this, _Media_files, "f")[0].src);
            }
            __classPrivateFieldGet(this, _Media_element, "f").src = __classPrivateFieldGet(this, _Media_files, "f")[0].src;
            __classPrivateFieldSet(this, _Media_currentSrc, __classPrivateFieldGet(this, _Media_files, "f")[0], "f");
            if (__classPrivateFieldGet(this, _Media_media, "f")) {
                __classPrivateFieldGet(this, _Media_media, "f").src = __classPrivateFieldGet(this, _Media_files, "f")[0];
            }
        }
        else {
            __classPrivateFieldGet(this, _Media_element, "f").src = '';
        }
    }
    get src() {
        return __classPrivateFieldGet(this, _Media_files, "f");
    }
    get current() {
        return __classPrivateFieldGet(this, _Media_currentSrc, "f");
    }
    set mediaFiles(sources) {
        __classPrivateFieldSet(this, _Media_files, sources, "f");
    }
    get mediaFiles() {
        return __classPrivateFieldGet(this, _Media_files, "f");
    }
    set volume(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").volume = value;
        }
    }
    get volume() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").volume : __classPrivateFieldGet(this, _Media_element, "f").volume;
    }
    set muted(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").muted = value;
        }
    }
    get muted() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").muted : __classPrivateFieldGet(this, _Media_element, "f").muted;
    }
    set playbackRate(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").playbackRate = value;
        }
    }
    get playbackRate() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").playbackRate : __classPrivateFieldGet(this, _Media_element, "f").playbackRate;
    }
    set defaultPlaybackRate(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").defaultPlaybackRate = value;
        }
    }
    get defaultPlaybackRate() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").defaultPlaybackRate : __classPrivateFieldGet(this, _Media_element, "f").defaultPlaybackRate;
    }
    set currentTime(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").currentTime = value;
        }
    }
    get currentTime() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").currentTime : __classPrivateFieldGet(this, _Media_element, "f").currentTime;
    }
    get duration() {
        const duration = __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").duration : __classPrivateFieldGet(this, _Media_element, "f").duration;
        if (duration === Infinity && __classPrivateFieldGet(this, _Media_element, "f").seekable && __classPrivateFieldGet(this, _Media_element, "f").seekable.length) {
            return __classPrivateFieldGet(this, _Media_element, "f").seekable.end(0);
        }
        return duration;
    }
    get paused() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").paused : __classPrivateFieldGet(this, _Media_element, "f").paused;
    }
    get ended() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").ended : __classPrivateFieldGet(this, _Media_element, "f").ended;
    }
    set loaded(loaded) {
        __classPrivateFieldSet(this, _Media_mediaLoaded, loaded, "f");
    }
    get loaded() {
        return __classPrivateFieldGet(this, _Media_mediaLoaded, "f");
    }
    set level(value) {
        if (__classPrivateFieldGet(this, _Media_media, "f")) {
            __classPrivateFieldGet(this, _Media_media, "f").level = value;
        }
    }
    get level() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").level : -1;
    }
    get levels() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").levels : [];
    }
    get instance() {
        return __classPrivateFieldGet(this, _Media_media, "f") ? __classPrivateFieldGet(this, _Media_media, "f").instance : null;
    }
    _getMediaFiles() {
        const mediaFiles = [];
        const sourceTags = __classPrivateFieldGet(this, _Media_element, "f").querySelectorAll('source');
        const nodeSource = __classPrivateFieldGet(this, _Media_element, "f").src;
        if (nodeSource) {
            mediaFiles.push({
                src: nodeSource,
                type: __classPrivateFieldGet(this, _Media_element, "f").getAttribute('type') || source.predictType(nodeSource, __classPrivateFieldGet(this, _Media_element, "f")),
            });
        }
        for (let i = 0, total = sourceTags.length; i < total; i++) {
            const item = sourceTags[i];
            const src = item.src;
            mediaFiles.push({
                src,
                type: item.getAttribute('type') || source.predictType(src, __classPrivateFieldGet(this, _Media_element, "f")),
            });
            if (i === 0) {
                __classPrivateFieldSet(this, _Media_currentSrc, mediaFiles[0], "f");
            }
        }
        if (!mediaFiles.length) {
            mediaFiles.push({
                src: '',
                type: source.predictType('', __classPrivateFieldGet(this, _Media_element, "f")),
            });
        }
        return mediaFiles;
    }
    _invoke(media) {
        const playHLSNatively = __classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/vnd.apple.mpegurl')
            || __classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/x-mpegURL');
        __classPrivateFieldSet(this, _Media_currentSrc, media, "f");
        let activeLevels = false;
        Object.keys(__classPrivateFieldGet(this, _Media_options, "f").controls.layers).forEach(layer => {
            if (__classPrivateFieldGet(this, _Media_options, "f").controls.layers[layer].indexOf('levels') > -1) {
                activeLevels = true;
            }
        });
        if (Object.keys(__classPrivateFieldGet(this, _Media_customMedia, "f").media).length) {
            let customRef;
            __classPrivateFieldGet(this, _Media_customMedia, "f").rules.forEach((rule) => {
                const type = rule(media.src);
                if (type) {
                    const customMedia = __classPrivateFieldGet(this, _Media_customMedia, "f").media[type];
                    const customOptions = __classPrivateFieldGet(this, _Media_options, "f")[__classPrivateFieldGet(this, _Media_customMedia, "f").optionsKey[type]] || undefined;
                    customRef = customMedia(__classPrivateFieldGet(this, _Media_element, "f"), media, __classPrivateFieldGet(this, _Media_autoplay, "f"), customOptions);
                }
            });
            if (customRef) {
                customRef.create();
                return customRef;
            }
            return new HTML5Media(__classPrivateFieldGet(this, _Media_element, "f"), media);
        }
        if (source.isHlsSource(media)) {
            if (playHLSNatively && __classPrivateFieldGet(this, _Media_options, "f").forceNative && !activeLevels) {
                return new HTML5Media(__classPrivateFieldGet(this, _Media_element, "f"), media);
            }
            const hlsOptions = __classPrivateFieldGet(this, _Media_options, "f") && __classPrivateFieldGet(this, _Media_options, "f").hls ? __classPrivateFieldGet(this, _Media_options, "f").hls : undefined;
            return new HlsMedia(__classPrivateFieldGet(this, _Media_element, "f"), media, __classPrivateFieldGet(this, _Media_autoplay, "f"), hlsOptions);
        }
        if (source.isDashSource(media)) {
            const dashOptions = __classPrivateFieldGet(this, _Media_options, "f") && __classPrivateFieldGet(this, _Media_options, "f").dash ? __classPrivateFieldGet(this, _Media_options, "f").dash : undefined;
            return new DashMedia(__classPrivateFieldGet(this, _Media_element, "f"), media, dashOptions);
        }
        if (source.isFlvSource(media)) {
            const flvOptions = __classPrivateFieldGet(this, _Media_options, "f") && __classPrivateFieldGet(this, _Media_options, "f").flv ? __classPrivateFieldGet(this, _Media_options, "f").flv : {
                debug: false,
                type: 'flv',
                url: media.src,
            };
            return new FlvMedia(__classPrivateFieldGet(this, _Media_element, "f"), media, flvOptions);
        }
        return new HTML5Media(__classPrivateFieldGet(this, _Media_element, "f"), media);
    }
}
_Media_element = new WeakMap(), _Media_media = new WeakMap(), _Media_files = new WeakMap(), _Media_promisePlay = new WeakMap(), _Media_options = new WeakMap(), _Media_autoplay = new WeakMap(), _Media_mediaLoaded = new WeakMap(), _Media_customMedia = new WeakMap(), _Media_currentSrc = new WeakMap();
export default Media;
