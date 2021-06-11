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
var _element, _media, _files, _promisePlay, _options, _autoplay, _mediaLoaded, _customMedia, _currentSrc;
import DashMedia from './media/dash';
import FlvMedia from './media/flv';
import HlsMedia from './media/hls';
import HTML5Media from './media/html5';
import * as source from './utils/media';
class Media {
    constructor(element, options, autoplay = false, customMedia) {
        _element.set(this, void 0);
        _media.set(this, void 0);
        _files.set(this, void 0);
        _promisePlay.set(this, void 0);
        _options.set(this, void 0);
        _autoplay.set(this, void 0);
        _mediaLoaded.set(this, false);
        _customMedia.set(this, {
            media: {},
            optionsKey: {},
            rules: [],
        });
        _currentSrc.set(this, void 0);
        __classPrivateFieldSet(this, _element, element);
        __classPrivateFieldSet(this, _options, options);
        __classPrivateFieldSet(this, _files, this._getMediaFiles());
        __classPrivateFieldSet(this, _customMedia, customMedia);
        __classPrivateFieldSet(this, _autoplay, autoplay);
        return this;
    }
    canPlayType(mimeType) {
        return __classPrivateFieldGet(this, _media).canPlayType(mimeType);
    }
    load() {
        if (!__classPrivateFieldGet(this, _files).length) {
            throw new TypeError('Media not set');
        }
        if (__classPrivateFieldGet(this, _media) && typeof __classPrivateFieldGet(this, _media).destroy === 'function') {
            const sameMedia = __classPrivateFieldGet(this, _files).length === 1 && __classPrivateFieldGet(this, _files)[0].src === __classPrivateFieldGet(this, _media).media.src;
            if (!sameMedia) {
                __classPrivateFieldGet(this, _media).destroy();
            }
        }
        __classPrivateFieldGet(this, _files).some(media => {
            try {
                __classPrivateFieldSet(this, _media, this._invoke(media));
            }
            catch (e) {
                __classPrivateFieldSet(this, _media, new HTML5Media(__classPrivateFieldGet(this, _element), media));
            }
            return __classPrivateFieldGet(this, _media).canPlayType(media.type);
        });
        try {
            if (__classPrivateFieldGet(this, _media) === null) {
                throw new TypeError('Media cannot be played with any valid media type');
            }
            return __classPrivateFieldGet(this, _media).promise.then(() => {
                __classPrivateFieldGet(this, _media).load();
            });
        }
        catch (e) {
            __classPrivateFieldGet(this, _media).destroy();
            throw e;
        }
    }
    play() {
        if (!this.loaded) {
            this.loaded = true;
            const promiseLoad = this.load();
            if (promiseLoad) {
                this.loaded = true;
                return promiseLoad.then(() => {
                    __classPrivateFieldGet(this, _media).play();
                });
            }
        }
        __classPrivateFieldSet(this, _promisePlay, new Promise(resolve => {
            resolve({});
        }).then(__classPrivateFieldGet(this, _media).promise.then(__classPrivateFieldGet(this, _media).play())));
        return __classPrivateFieldGet(this, _promisePlay);
    }
    pause() {
        if (__classPrivateFieldGet(this, _promisePlay) !== undefined) {
            __classPrivateFieldGet(this, _promisePlay).then(() => {
                __classPrivateFieldGet(this, _media).pause();
            });
        }
        else {
            __classPrivateFieldGet(this, _media).pause();
        }
    }
    destroy() {
        __classPrivateFieldGet(this, _media).destroy();
    }
    set src(media) {
        if (typeof media === 'string') {
            __classPrivateFieldGet(this, _files).push({
                src: media,
                type: source.predictType(media),
            });
        }
        else if (Array.isArray(media)) {
            __classPrivateFieldSet(this, _files, media);
        }
        else if (typeof media === 'object') {
            __classPrivateFieldGet(this, _files).push(media);
        }
        __classPrivateFieldGet(this, _files).some(file => {
            return this.canPlayType(file.type);
        });
        if (__classPrivateFieldGet(this, _element).src) {
            __classPrivateFieldGet(this, _element).setAttribute('data-op-file', __classPrivateFieldGet(this, _files)[0].src);
        }
        __classPrivateFieldGet(this, _element).src = __classPrivateFieldGet(this, _files)[0].src;
        __classPrivateFieldGet(this, _media).src = __classPrivateFieldGet(this, _files)[0];
        __classPrivateFieldSet(this, _currentSrc, __classPrivateFieldGet(this, _files)[0]);
    }
    get src() {
        return __classPrivateFieldGet(this, _files);
    }
    get current() {
        return __classPrivateFieldGet(this, _currentSrc);
    }
    set mediaFiles(sources) {
        __classPrivateFieldSet(this, _files, sources);
    }
    get mediaFiles() {
        return __classPrivateFieldGet(this, _files);
    }
    set volume(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).volume = value;
        }
    }
    get volume() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).volume : __classPrivateFieldGet(this, _element).volume;
    }
    set muted(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).muted = value;
        }
    }
    get muted() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).muted : __classPrivateFieldGet(this, _element).muted;
    }
    set playbackRate(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).playbackRate = value;
        }
    }
    get playbackRate() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).playbackRate : __classPrivateFieldGet(this, _element).playbackRate;
    }
    set defaultPlaybackRate(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).defaultPlaybackRate = value;
        }
    }
    get defaultPlaybackRate() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).defaultPlaybackRate : __classPrivateFieldGet(this, _element).defaultPlaybackRate;
    }
    set currentTime(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).currentTime = value;
        }
    }
    get currentTime() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).currentTime : __classPrivateFieldGet(this, _element).currentTime;
    }
    get duration() {
        const duration = __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).duration : __classPrivateFieldGet(this, _element).duration;
        if (duration === Infinity && __classPrivateFieldGet(this, _element).seekable && __classPrivateFieldGet(this, _element).seekable.length) {
            return __classPrivateFieldGet(this, _element).seekable.end(0);
        }
        return duration;
    }
    get paused() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).paused : __classPrivateFieldGet(this, _element).paused;
    }
    get ended() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).ended : __classPrivateFieldGet(this, _element).ended;
    }
    set loaded(loaded) {
        __classPrivateFieldSet(this, _mediaLoaded, loaded);
    }
    get loaded() {
        return __classPrivateFieldGet(this, _mediaLoaded);
    }
    set level(value) {
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).level = value;
        }
    }
    get level() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).level : -1;
    }
    get levels() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).levels : [];
    }
    get instance() {
        return __classPrivateFieldGet(this, _media) ? __classPrivateFieldGet(this, _media).instance : null;
    }
    _getMediaFiles() {
        const mediaFiles = [];
        const sourceTags = __classPrivateFieldGet(this, _element).querySelectorAll('source');
        const nodeSource = __classPrivateFieldGet(this, _element).src;
        if (nodeSource) {
            mediaFiles.push({
                src: nodeSource,
                type: __classPrivateFieldGet(this, _element).getAttribute('type') || source.predictType(nodeSource),
            });
        }
        for (let i = 0, total = sourceTags.length; i < total; i++) {
            const item = sourceTags[i];
            const src = item.src;
            mediaFiles.push({
                src,
                type: item.getAttribute('type') || source.predictType(src),
            });
            if (i === 0) {
                __classPrivateFieldSet(this, _currentSrc, mediaFiles[0]);
            }
        }
        if (!mediaFiles.length) {
            mediaFiles.push({
                src: '',
                type: source.predictType(''),
            });
        }
        return mediaFiles;
    }
    _invoke(media) {
        const playHLSNatively = __classPrivateFieldGet(this, _element).canPlayType('application/vnd.apple.mpegurl') ||
            __classPrivateFieldGet(this, _element).canPlayType('application/x-mpegURL');
        __classPrivateFieldSet(this, _currentSrc, media);
        let activeLevels = false;
        Object.keys(__classPrivateFieldGet(this, _options).controls.layers).forEach(layer => {
            if (__classPrivateFieldGet(this, _options).controls.layers[layer].indexOf('levels') > -1) {
                activeLevels = true;
            }
        });
        if (Object.keys(__classPrivateFieldGet(this, _customMedia).media).length) {
            let customRef;
            __classPrivateFieldGet(this, _customMedia).rules.forEach((rule) => {
                const type = rule(media.src);
                if (type) {
                    const customMedia = __classPrivateFieldGet(this, _customMedia).media[type];
                    const customOptions = __classPrivateFieldGet(this, _options)[__classPrivateFieldGet(this, _customMedia).optionsKey[type]] || undefined;
                    customRef = customMedia(__classPrivateFieldGet(this, _element), media, __classPrivateFieldGet(this, _autoplay), customOptions);
                }
            });
            if (customRef) {
                customRef.create();
                return customRef;
            }
            else {
                return new HTML5Media(__classPrivateFieldGet(this, _element), media);
            }
        }
        else if (source.isHlsSource(media)) {
            if (playHLSNatively && __classPrivateFieldGet(this, _options).forceNative && !activeLevels) {
                return new HTML5Media(__classPrivateFieldGet(this, _element), media);
            }
            const hlsOptions = __classPrivateFieldGet(this, _options) && __classPrivateFieldGet(this, _options).hls ? __classPrivateFieldGet(this, _options).hls : undefined;
            return new HlsMedia(__classPrivateFieldGet(this, _element), media, __classPrivateFieldGet(this, _autoplay), hlsOptions);
        }
        else if (source.isDashSource(media)) {
            const dashOptions = __classPrivateFieldGet(this, _options) && __classPrivateFieldGet(this, _options).dash ? __classPrivateFieldGet(this, _options).dash : undefined;
            return new DashMedia(__classPrivateFieldGet(this, _element), media, dashOptions);
        }
        else if (source.isFlvSource(media)) {
            const flvOptions = __classPrivateFieldGet(this, _options) && __classPrivateFieldGet(this, _options).flv ? __classPrivateFieldGet(this, _options).flv : {
                debug: false,
                type: 'flv',
                url: media.src,
            };
            return new FlvMedia(__classPrivateFieldGet(this, _element), media, flvOptions);
        }
        return new HTML5Media(__classPrivateFieldGet(this, _element), media);
    }
}
_element = new WeakMap(), _media = new WeakMap(), _files = new WeakMap(), _promisePlay = new WeakMap(), _options = new WeakMap(), _autoplay = new WeakMap(), _mediaLoaded = new WeakMap(), _customMedia = new WeakMap(), _currentSrc = new WeakMap();
export default Media;
