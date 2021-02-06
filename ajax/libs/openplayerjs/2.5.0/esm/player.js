import 'core-js/features/array/find';
import 'core-js/features/array/from';
import 'core-js/features/object/assign';
import 'core-js/features/object/keys';
import 'core-js/features/promise';
import 'custom-event-polyfill';
import 'element-closest/browser';
import Controls from './controls';
import Media from './media';
import Ads from './media/ads';
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from './utils/constants';
import { addEvent } from './utils/events';
import { isAudio, isVideo, removeElement } from './utils/general';
import { isAutoplaySupported } from './utils/media';
class Player {
    constructor(element, options) {
        this.uid = '';
        this.events = {};
        this.autoplay = false;
        this.volume = 1;
        this.canAutoplay = false;
        this.canAutoplayMuted = false;
        this.processedAutoplay = false;
        this.options = {};
        this.customControlItems = [];
        this.defaultOptions = {
            controls: {
                alwaysVisible: false,
                layers: {
                    left: ['play', 'time', 'volume'],
                    middle: ['progress'],
                    right: ['captions', 'settings', 'fullscreen'],
                },
            },
            defaultLevel: null,
            detachMenus: false,
            forceNative: true,
            height: 0,
            hidePlayBtnTimer: 350,
            labels: {
                auto: 'Auto',
                captions: 'CC/Subtitles',
                click: 'Click to unmute',
                fullscreen: 'Fullscreen',
                lang: {
                    en: 'English',
                },
                levels: 'Quality Levels',
                live: 'Live Broadcast',
                mediaLevels: 'Change Quality',
                mute: 'Mute',
                off: 'Off',
                pause: 'Pause',
                play: 'Play',
                progressRail: 'Time Rail',
                progressSlider: 'Time Slider',
                settings: 'Player Settings',
                speed: 'Speed',
                speedNormal: 'Normal',
                tap: 'Tap to unmute',
                toggleCaptions: 'Toggle Captions',
                unmute: 'Unmute',
                volume: 'Volume',
                volumeControl: 'Volume Control',
                volumeSlider: 'Volume Slider',
            },
            live: {
                showLabel: true,
                showProgress: false,
            },
            mode: 'responsive',
            onError: () => { },
            showLoaderOnInit: false,
            startTime: 0,
            startVolume: 1,
            step: 0,
            width: 0,
        };
        this.element = element instanceof HTMLMediaElement ? element : document.getElementById(element);
        if (this.element) {
            this.autoplay = this.element.autoplay || false;
            if (typeof options !== 'string' && !Array.isArray(options)) {
                this._mergeOptions(options);
            }
            this.element.volume = this.options.startVolume;
            if (this.options.ads && this.options.ads.src) {
                this.ads = this.options.ads.src;
            }
            if (this.options.startTime > 0) {
                this.element.currentTime = this.options.startTime;
            }
            this.volume = this.element.volume;
        }
        return this;
    }
    static init() {
        Player.instances = {};
        const targets = document.querySelectorAll('video.op-player, audio.op-player');
        for (let i = 0, total = targets.length; i < total; i++) {
            const target = targets[i];
            const settings = target.getAttribute('data-op-settings');
            const options = settings ? JSON.parse(settings) : {};
            const player = new Player(target, options);
            player.init();
        }
    }
    static addMedia(name, mimeType, valid, media) {
        Player.customMedia.media[mimeType] = media;
        Player.customMedia.optionsKey[mimeType] = name;
        Player.customMedia.rules.push(valid);
    }
    init() {
        if (this._isValid()) {
            this._wrapInstance();
            this._prepareMedia();
            this._createPlayButton();
            this._createUID();
            this._createControls();
            this._setEvents();
            Player.instances[this.id] = this;
        }
    }
    load() {
        if (this.isMedia()) {
            this.media.load();
        }
    }
    play() {
        if (this.media && !this.media.loaded) {
            this.media.load();
            this.media.loaded = true;
        }
        if (this.adsInstance) {
            return this.adsInstance.play();
        }
        else {
            return this.media.play();
        }
    }
    pause() {
        if (this.adsInstance) {
            this.adsInstance.pause();
        }
        else {
            this.media.pause();
        }
    }
    destroy() {
        if (this.adsInstance) {
            this.adsInstance.pause();
            this.adsInstance.destroy();
        }
        const el = this.element;
        this.media.destroy();
        Object.keys(this.events).forEach(event => {
            el.removeEventListener(event, this.events[event]);
        });
        if (this.autoplay && !this.processedAutoplay && isVideo(this.element)) {
            el.removeEventListener('canplay', this._autoplay.bind(this));
        }
        this.controls.destroy();
        if (isVideo(this.element)) {
            removeElement(this.playBtn);
            removeElement(this.loader);
        }
        el.controls = true;
        el.setAttribute('id', this.uid);
        el.removeAttribute('op-live__enabled');
        el.removeAttribute('op-dvr__enabled');
        const parent = el.parentElement;
        if (parent && parent.parentNode) {
            parent.parentNode.replaceChild(el, parent);
        }
        const e = addEvent('playerdestroyed');
        el.dispatchEvent(e);
    }
    getContainer() {
        return this.element.parentElement || this.element;
    }
    getControls() {
        return this.controls;
    }
    getCustomControls() {
        return this.customControlItems;
    }
    getElement() {
        return this.element;
    }
    getEvents() {
        return this.events;
    }
    getOptions() {
        return this.options;
    }
    activeElement() {
        return this.adsInstance && this.adsInstance.adsStarted ? this.adsInstance : this.media;
    }
    isMedia() {
        return this.activeElement() instanceof Media;
    }
    isAd() {
        return this.activeElement() instanceof Ads;
    }
    getMedia() {
        return this.media;
    }
    getAd() {
        return this.adsInstance;
    }
    addCaptions(args) {
        if (args.default) {
            const tracks = this.element.querySelectorAll('track');
            for (let i = 0, total = tracks.length; i < total; i++) {
                tracks[i].default = false;
            }
        }
        const el = this.element;
        let track = el.querySelector(`track[srclang="${args.srclang}"][kind="${args.kind}"]`);
        if (track) {
            track.src = args.src;
            track.label = args.label;
            track.default = args.default || false;
        }
        else {
            track = document.createElement('track');
            track.srclang = args.srclang;
            track.src = args.src;
            track.kind = args.kind;
            track.label = args.label;
            track.default = args.default || false;
            el.appendChild(track);
        }
        const e = addEvent('controlschanged');
        el.dispatchEvent(e);
    }
    addControl(args) {
        args.custom = true;
        this.customControlItems.push(args);
        const e = addEvent('controlschanged');
        this.element.dispatchEvent(e);
    }
    _prepareMedia() {
        try {
            this.element.addEventListener('playererror', this.options.onError, EVENT_OPTIONS);
            if (this.autoplay && isVideo(this.element)) {
                this.element.addEventListener('canplay', this._autoplay.bind(this), EVENT_OPTIONS);
            }
            this.media = new Media(this.element, this.options, this.autoplay, Player.customMedia);
            const preload = this.element.getAttribute('preload');
            if (this.ads || !preload || preload !== 'none') {
                this.media.load();
                this.media.loaded = true;
            }
            if (!this.autoplay && this.ads) {
                const adsOptions = this.options && this.options.ads ? this.options.ads : undefined;
                this.adsInstance = new Ads(this, this.ads, false, false, adsOptions);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    set src(media) {
        if (this.media instanceof Media) {
            this.media.mediaFiles = [];
            this.media.src = media;
        }
    }
    get src() {
        return this.media.src;
    }
    get id() {
        return this.uid;
    }
    _isValid() {
        const el = this.element;
        if (el instanceof HTMLElement === false) {
            return false;
        }
        if (!isAudio(el) && !isVideo(el)) {
            return false;
        }
        if (!el.classList.contains('op-player__media')) {
            return false;
        }
        return true;
    }
    _wrapInstance() {
        const wrapper = document.createElement('div');
        wrapper.className = 'op-player op-player__keyboard--inactive';
        wrapper.className += isAudio(this.element) ? ' op-player__audio' : ' op-player__video';
        wrapper.tabIndex = 0;
        this.element.classList.remove('op-player');
        if (this.element.parentElement) {
            this.element.parentElement.insertBefore(wrapper, this.element);
        }
        wrapper.appendChild(this.element);
        wrapper.addEventListener('keydown', () => {
            if (wrapper.classList.contains('op-player__keyboard--inactive')) {
                wrapper.classList.remove('op-player__keyboard--inactive');
            }
        }, EVENT_OPTIONS);
        wrapper.addEventListener('click', () => {
            if (!wrapper.classList.contains('op-player__keyboard--inactive')) {
                wrapper.classList.add('op-player__keyboard--inactive');
            }
        }, EVENT_OPTIONS);
        if (this.options.mode === 'fill' && !isAudio(this.element) && !IS_IPHONE) {
            this.getContainer().classList.add('op-player__full');
        }
        else if (this.options.mode === 'fit' && !isAudio(this.element)) {
            const container = this.getContainer();
            if (container.parentElement) {
                const fitWrapper = document.createElement('div');
                fitWrapper.className = 'op-player__fit--wrapper';
                fitWrapper.tabIndex = 0;
                container.parentElement.insertBefore(fitWrapper, container);
                fitWrapper.appendChild(container);
                container.classList.add('op-player__fit');
            }
        }
        else {
            let style = '';
            if (this.options.width) {
                const width = typeof this.options.width === 'number' ? `${this.options.width}px` : this.options.width;
                style += `width: ${width} !important;`;
            }
            if (this.options.height) {
                const height = typeof this.options.height === 'number' ? `${this.options.height}px` : this.options.height;
                style += `height: ${height} !important;`;
            }
            if (style) {
                wrapper.setAttribute('style', style);
            }
        }
    }
    _createControls() {
        if (IS_IPHONE && isVideo(this.element)) {
            this.getContainer().classList.add('op-player__ios--iphone');
        }
        this.controls = new Controls(this);
        this.controls.create();
    }
    _createUID() {
        if (this.element.id) {
            this.uid = this.element.id;
            this.element.removeAttribute('id');
        }
        else {
            let uid;
            do {
                uid = `op_${Math.random().toString(36).substr(2, 9)}`;
            } while (Player.instances[uid] !== undefined);
            this.uid = uid;
        }
        if (this.element.parentElement) {
            this.element.parentElement.id = this.uid;
        }
    }
    _createPlayButton() {
        if (isAudio(this.element)) {
            return;
        }
        this.playBtn = document.createElement('button');
        this.playBtn.className = 'op-player__play';
        this.playBtn.tabIndex = 0;
        this.playBtn.title = this.options.labels.play;
        this.playBtn.innerHTML = `<span>${this.options.labels.play}</span>`;
        this.playBtn.setAttribute('aria-pressed', 'false');
        this.playBtn.setAttribute('aria-hidden', 'false');
        this.loader = document.createElement('span');
        this.loader.className = 'op-player__loader';
        this.loader.tabIndex = -1;
        this.loader.setAttribute('aria-hidden', 'true');
        if (this.element.parentElement) {
            this.element.parentElement.insertBefore(this.loader, this.element);
            this.element.parentElement.insertBefore(this.playBtn, this.element);
        }
        this.playBtn.addEventListener('click', () => {
            if (this.adsInstance) {
                this.adsInstance.playRequested = this.activeElement().paused;
            }
            if (this.activeElement().paused) {
                this.activeElement().play();
            }
            else {
                this.activeElement().pause();
            }
        }, EVENT_OPTIONS);
    }
    _setEvents() {
        if (isVideo(this.element)) {
            this.events.loadedmetadata = () => {
                const el = this.activeElement();
                if (this.options.showLoaderOnInit && !IS_IOS && !IS_ANDROID) {
                    this.loader.setAttribute('aria-hidden', 'false');
                    this.playBtn.setAttribute('aria-hidden', 'true');
                }
                else {
                    this.loader.setAttribute('aria-hidden', 'true');
                    this.playBtn.setAttribute('aria-hidden', 'false');
                }
                if (el.paused) {
                    this.playBtn.classList.remove('op-player__play--paused');
                    this.playBtn.setAttribute('aria-pressed', 'false');
                }
            };
            this.events.waiting = () => {
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', 'false');
            };
            this.events.seeking = () => {
                const el = this.activeElement();
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', el instanceof Media ? 'false' : 'true');
            };
            this.events.seeked = () => {
                const el = this.activeElement();
                if (Math.round(el.currentTime) === 0) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                    this.loader.setAttribute('aria-hidden', 'false');
                }
                else {
                    this.playBtn.setAttribute('aria-hidden', el instanceof Media ? 'false' : 'true');
                    this.loader.setAttribute('aria-hidden', 'true');
                }
            };
            this.events.play = () => {
                this.playBtn.classList.add('op-player__play--paused');
                this.playBtn.title = this.options.labels.pause;
                this.loader.setAttribute('aria-hidden', 'true');
                if (this.options.showLoaderOnInit) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                }
                else {
                    setTimeout(() => {
                        this.playBtn.setAttribute('aria-hidden', 'true');
                    }, this.options.hidePlayBtnTimer);
                }
            };
            this.events.playing = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
            this.events.pause = () => {
                const el = this.activeElement();
                this.playBtn.classList.remove('op-player__play--paused');
                this.playBtn.title = this.options.labels.play;
                if (this.options.showLoaderOnInit && Math.round(el.currentTime) === 0) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                    this.loader.setAttribute('aria-hidden', 'false');
                }
                else {
                    this.playBtn.setAttribute('aria-hidden', 'false');
                    this.loader.setAttribute('aria-hidden', 'true');
                }
            };
            this.events.ended = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
        }
        Object.keys(this.events).forEach(event => {
            this.element.addEventListener(event, this.events[event], EVENT_OPTIONS);
        });
    }
    _autoplay() {
        if (!this.processedAutoplay) {
            this.processedAutoplay = true;
            this.element.removeEventListener('canplay', this._autoplay.bind(this));
            isAutoplaySupported(this.element, autoplay => {
                this.canAutoplay = autoplay;
            }, muted => {
                this.canAutoplayMuted = muted;
            }, () => {
                if (this.canAutoplayMuted) {
                    this.activeElement().muted = true;
                    this.activeElement().volume = 0;
                    const e = addEvent('volumechange');
                    this.element.dispatchEvent(e);
                    const volumeEl = document.createElement('div');
                    const action = IS_IOS || IS_ANDROID ? this.options.labels.tap : this.options.labels.click;
                    volumeEl.className = 'op-player__unmute';
                    volumeEl.innerHTML = `<span>${action}</span>`;
                    volumeEl.tabIndex = 0;
                    volumeEl.addEventListener('click', () => {
                        this.activeElement().muted = false;
                        this.activeElement().volume = this.volume;
                        const event = addEvent('volumechange');
                        this.element.dispatchEvent(event);
                        removeElement(volumeEl);
                    }, EVENT_OPTIONS);
                    const target = this.getContainer();
                    target.insertBefore(volumeEl, target.firstChild);
                }
                else {
                    this.activeElement().muted = this.element.muted;
                    this.activeElement().volume = this.volume;
                }
                if (this.ads) {
                    const adsOptions = this.options && this.options.ads ? this.options.ads : undefined;
                    this.adsInstance = new Ads(this, this.ads, this.canAutoplay, this.canAutoplayMuted, adsOptions);
                }
                else if (this.canAutoplay || this.canAutoplayMuted) {
                    return this.play();
                }
            });
        }
    }
    _mergeOptions(playerOptions) {
        this.options = Object.assign(Object.assign({}, this.defaultOptions), playerOptions);
        if (playerOptions) {
            const objectElements = ['labels', 'controls'];
            objectElements.forEach(item => {
                this.options[item] = playerOptions[item] && Object.keys(playerOptions[item]).length ? Object.assign(Object.assign({}, this.defaultOptions[item]), playerOptions[item]) :
                    this.defaultOptions[item];
            });
        }
    }
}
Player.instances = {};
Player.customMedia = {
    media: {},
    optionsKey: {},
    rules: [],
};
export default Player;
if (typeof window !== 'undefined') {
    window.OpenPlayer = Player;
    window.OpenPlayerJS = Player;
    Player.init();
}
