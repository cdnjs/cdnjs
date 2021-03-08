import DashMedia from './media/dash';
import FlvMedia from './media/flv';
import HlsMedia from './media/hls';
import HTML5Media from './media/html5';
import * as source from './utils/media';
class Media {
    constructor(element, options, autoplay = false, customMedia) {
        this.mediaLoaded = false;
        this.customMedia = {
            media: {},
            optionsKey: {},
            rules: [],
        };
        this.element = element;
        this.options = options;
        this.mediaFiles = this._getMediaFiles();
        this.customMedia = customMedia;
        this.autoplay = autoplay;
        return this;
    }
    canPlayType(mimeType) {
        return this.media.canPlayType(mimeType);
    }
    load() {
        if (!this.mediaFiles.length) {
            throw new TypeError('Media not set');
        }
        if (this.media && typeof this.media.destroy === 'function') {
            const sameMedia = this.mediaFiles.length === 1 && this.mediaFiles[0].src === this.media.media.src;
            if (!sameMedia) {
                this.media.destroy();
            }
        }
        this.mediaFiles.some(media => {
            try {
                this.media = this._invoke(media);
            }
            catch (e) {
                this.media = new HTML5Media(this.element, media);
            }
            return this.media.canPlayType(media.type);
        });
        try {
            if (this.media === null) {
                throw new TypeError('Media cannot be played with any valid media type');
            }
            return this.media.promise.then(() => {
                this.media.load();
            });
        }
        catch (e) {
            this.media.destroy();
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
                    this.media.play();
                });
            }
        }
        this.promisePlay = new Promise(resolve => {
            resolve({});
        }).then(this.media.promise.then(this.media.play()));
        return this.promisePlay;
    }
    pause() {
        if (this.promisePlay !== undefined) {
            this.promisePlay.then(() => {
                this.media.pause();
            });
        }
        else {
            this.media.pause();
        }
    }
    destroy() {
        this.media.destroy();
    }
    set src(media) {
        if (typeof media === 'string') {
            this.mediaFiles.push({
                src: media,
                type: source.predictType(media),
            });
        }
        else if (Array.isArray(media)) {
            this.mediaFiles = media;
        }
        else if (typeof media === 'object') {
            this.mediaFiles.push(media);
        }
        this.mediaFiles.some(file => {
            return this.canPlayType(file.type);
        });
        if (this.element.src) {
            this.element.setAttribute('data-op-file', this.mediaFiles[0].src);
        }
        this.element.src = this.mediaFiles[0].src;
        this.media.src = this.mediaFiles[0];
    }
    get src() {
        return this.mediaFiles;
    }
    set volume(value) {
        if (this.media) {
            this.media.volume = value;
        }
    }
    get volume() {
        return this.media ? this.media.volume : this.element.volume;
    }
    set muted(value) {
        if (this.media) {
            this.media.muted = value;
        }
    }
    get muted() {
        return this.media ? this.media.muted : this.element.muted;
    }
    set playbackRate(value) {
        if (this.media) {
            this.media.playbackRate = value;
        }
    }
    get playbackRate() {
        return this.media ? this.media.playbackRate : this.element.playbackRate;
    }
    set defaultPlaybackRate(value) {
        if (this.media) {
            this.media.defaultPlaybackRate = value;
        }
    }
    get defaultPlaybackRate() {
        return this.media ? this.media.defaultPlaybackRate : this.element.defaultPlaybackRate;
    }
    set currentTime(value) {
        if (this.media) {
            this.media.currentTime = value;
        }
    }
    get currentTime() {
        return this.media ? this.media.currentTime : this.element.currentTime;
    }
    get duration() {
        const duration = this.media ? this.media.duration : this.element.duration;
        if (duration === Infinity && this.element.seekable && this.element.seekable.length) {
            return this.element.seekable.end(0);
        }
        return duration;
    }
    get paused() {
        return this.media ? this.media.paused : this.element.paused;
    }
    get ended() {
        return this.media ? this.media.ended : this.element.ended;
    }
    set loaded(loaded) {
        this.mediaLoaded = loaded;
    }
    get loaded() {
        return this.mediaLoaded;
    }
    set level(value) {
        if (this.media) {
            this.media.level = value;
        }
    }
    get level() {
        return this.media ? this.media.level : -1;
    }
    get levels() {
        return this.media ? this.media.levels : [];
    }
    get instance() {
        return this.media ? this.media.instance : null;
    }
    _getMediaFiles() {
        const mediaFiles = [];
        const sourceTags = this.element.querySelectorAll('source');
        const nodeSource = this.element.src;
        if (nodeSource) {
            mediaFiles.push({
                src: nodeSource,
                type: this.element.getAttribute('type') || source.predictType(nodeSource),
            });
        }
        for (let i = 0, total = sourceTags.length; i < total; i++) {
            const item = sourceTags[i];
            const src = item.src;
            mediaFiles.push({
                src,
                type: item.getAttribute('type') || source.predictType(src),
            });
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
        const playHLSNatively = this.element.canPlayType('application/vnd.apple.mpegurl') ||
            this.element.canPlayType('application/x-mpegURL');
        let activeLevels = false;
        Object.keys(this.options.controls.layers).forEach(layer => {
            if (this.options.controls.layers[layer].indexOf('levels') > -1) {
                activeLevels = true;
            }
        });
        if (Object.keys(this.customMedia.media).length) {
            let customRef;
            this.customMedia.rules.forEach((rule) => {
                const type = rule(media.src);
                if (type) {
                    const customMedia = this.customMedia.media[type];
                    const customOptions = this.options[this.customMedia.optionsKey[type]] || undefined;
                    customRef = customMedia(this.element, media, this.autoplay, customOptions);
                }
            });
            if (customRef) {
                customRef.create();
                return customRef;
            }
            else {
                return new HTML5Media(this.element, media);
            }
        }
        else if (source.isHlsSource(media)) {
            if (playHLSNatively && this.options.forceNative && !activeLevels) {
                return new HTML5Media(this.element, media);
            }
            const hlsOptions = this.options && this.options.hls ? this.options.hls : undefined;
            return new HlsMedia(this.element, media, this.autoplay, hlsOptions);
        }
        else if (source.isDashSource(media)) {
            const dashOptions = this.options && this.options.dash ? this.options.dash : undefined;
            return new DashMedia(this.element, media, dashOptions);
        }
        else if (source.isFlvSource(media)) {
            const flvOptions = this.options && this.options.flv ? this.options.flv : {
                debug: false,
                type: 'flv',
                url: media.src,
            };
            return new FlvMedia(this.element, media, flvOptions);
        }
        return new HTML5Media(this.element, media);
    }
}
export default Media;
