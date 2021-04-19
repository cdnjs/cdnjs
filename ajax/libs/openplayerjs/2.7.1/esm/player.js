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
var _controls, _adsInstance, _uid, _element, _ads, _media, _events, _autoplay_1, _volume, _canAutoplay, _canAutoplayMuted, _processedAutoplay, _options, _customControlItems, _defaultOptions;
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
        _controls.set(this, void 0);
        _adsInstance.set(this, void 0);
        _uid.set(this, '');
        _element.set(this, void 0);
        _ads.set(this, void 0);
        _media.set(this, void 0);
        _events.set(this, {});
        _autoplay_1.set(this, false);
        _volume.set(this, void 0);
        _canAutoplay.set(this, false);
        _canAutoplayMuted.set(this, false);
        _processedAutoplay.set(this, false);
        _options.set(this, {});
        _customControlItems.set(this, []);
        _defaultOptions.set(this, {
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
            progress: {
                duration: 0,
                showCurrentTimeOnly: false,
            },
            showLoaderOnInit: false,
            startTime: 0,
            startVolume: 1,
            step: 0,
            width: 0,
        });
        __classPrivateFieldSet(this, _element, element instanceof HTMLMediaElement ? element : document.getElementById(element));
        if (__classPrivateFieldGet(this, _element)) {
            __classPrivateFieldSet(this, _autoplay_1, __classPrivateFieldGet(this, _element).autoplay || false);
            if (typeof options !== 'string' && !Array.isArray(options)) {
                this._mergeOptions(options);
            }
            __classPrivateFieldGet(this, _element).volume = __classPrivateFieldGet(this, _options).startVolume || 1;
            if (__classPrivateFieldGet(this, _options).ads && __classPrivateFieldGet(this, _options).ads.src) {
                __classPrivateFieldSet(this, _ads, __classPrivateFieldGet(this, _options).ads.src);
            }
            if (__classPrivateFieldGet(this, _options).startTime > 0) {
                __classPrivateFieldGet(this, _element).currentTime = __classPrivateFieldGet(this, _options).startTime;
            }
            __classPrivateFieldSet(this, _volume, __classPrivateFieldGet(this, _element).volume);
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
            __classPrivateFieldGet(this, _media).load();
        }
    }
    play() {
        if (__classPrivateFieldGet(this, _media) && !__classPrivateFieldGet(this, _media).loaded) {
            __classPrivateFieldGet(this, _media).load();
            __classPrivateFieldGet(this, _media).loaded = true;
        }
        if (__classPrivateFieldGet(this, _adsInstance)) {
            return __classPrivateFieldGet(this, _adsInstance).play();
        }
        else {
            return __classPrivateFieldGet(this, _media).play();
        }
    }
    pause() {
        if (__classPrivateFieldGet(this, _adsInstance)) {
            __classPrivateFieldGet(this, _adsInstance).pause();
        }
        else {
            __classPrivateFieldGet(this, _media).pause();
        }
    }
    destroy() {
        if (__classPrivateFieldGet(this, _adsInstance)) {
            __classPrivateFieldGet(this, _adsInstance).pause();
            __classPrivateFieldGet(this, _adsInstance).destroy();
        }
        const el = __classPrivateFieldGet(this, _element);
        if (__classPrivateFieldGet(this, _media)) {
            __classPrivateFieldGet(this, _media).destroy();
        }
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            el.removeEventListener(event, __classPrivateFieldGet(this, _events)[event]);
        });
        if (__classPrivateFieldGet(this, _autoplay_1) && !__classPrivateFieldGet(this, _processedAutoplay) && isVideo(__classPrivateFieldGet(this, _element))) {
            el.removeEventListener('canplay', this._autoplay.bind(this));
        }
        if (__classPrivateFieldGet(this, _controls)) {
            __classPrivateFieldGet(this, _controls).destroy();
        }
        if (isVideo(__classPrivateFieldGet(this, _element))) {
            removeElement(this.playBtn);
            removeElement(this.loader);
        }
        el.controls = true;
        el.setAttribute('id', __classPrivateFieldGet(this, _uid));
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
        return __classPrivateFieldGet(this, _element).parentElement || __classPrivateFieldGet(this, _element);
    }
    getControls() {
        return __classPrivateFieldGet(this, _controls);
    }
    getCustomControls() {
        return __classPrivateFieldGet(this, _customControlItems);
    }
    getElement() {
        return __classPrivateFieldGet(this, _element);
    }
    getEvents() {
        return __classPrivateFieldGet(this, _events);
    }
    getOptions() {
        return __classPrivateFieldGet(this, _options);
    }
    activeElement() {
        return __classPrivateFieldGet(this, _adsInstance) && __classPrivateFieldGet(this, _adsInstance).started() ? __classPrivateFieldGet(this, _adsInstance) : __classPrivateFieldGet(this, _media);
    }
    isMedia() {
        return this.activeElement() instanceof Media;
    }
    isAd() {
        return this.activeElement() instanceof Ads;
    }
    getMedia() {
        return __classPrivateFieldGet(this, _media);
    }
    getAd() {
        return __classPrivateFieldGet(this, _adsInstance);
    }
    addCaptions(args) {
        if (args.default) {
            const tracks = __classPrivateFieldGet(this, _element).querySelectorAll('track');
            for (let i = 0, total = tracks.length; i < total; i++) {
                tracks[i].default = false;
            }
        }
        const el = __classPrivateFieldGet(this, _element);
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
        __classPrivateFieldGet(this, _customControlItems).push(args);
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _element).dispatchEvent(e);
    }
    removeControl(controlName) {
        const { layers } = this.getOptions().controls;
        Object.keys(layers).forEach(layer => {
            layers[layer].forEach((item, idx) => {
                if (item === controlName) {
                    layers[layer].splice(idx, 1);
                }
            });
        });
        __classPrivateFieldGet(this, _customControlItems).forEach((item, idx) => {
            if (item.id === controlName) {
                __classPrivateFieldGet(this, _customControlItems).splice(idx, 1);
            }
        });
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _element).dispatchEvent(e);
    }
    _prepareMedia() {
        try {
            __classPrivateFieldGet(this, _element).addEventListener('playererror', __classPrivateFieldGet(this, _options).onError, EVENT_OPTIONS);
            if (__classPrivateFieldGet(this, _autoplay_1) && isVideo(__classPrivateFieldGet(this, _element))) {
                __classPrivateFieldGet(this, _element).addEventListener('canplay', this._autoplay.bind(this), EVENT_OPTIONS);
            }
            __classPrivateFieldSet(this, _media, new Media(__classPrivateFieldGet(this, _element), __classPrivateFieldGet(this, _options), __classPrivateFieldGet(this, _autoplay_1), Player.customMedia));
            const preload = __classPrivateFieldGet(this, _element).getAttribute('preload');
            if (__classPrivateFieldGet(this, _ads) || !preload || preload !== 'none') {
                __classPrivateFieldGet(this, _media).load();
                __classPrivateFieldGet(this, _media).loaded = true;
            }
            if (!__classPrivateFieldGet(this, _autoplay_1) && __classPrivateFieldGet(this, _ads)) {
                const adsOptions = __classPrivateFieldGet(this, _options) && __classPrivateFieldGet(this, _options).ads ? __classPrivateFieldGet(this, _options).ads : undefined;
                __classPrivateFieldSet(this, _adsInstance, new Ads(this, __classPrivateFieldGet(this, _ads), false, false, adsOptions));
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    set src(media) {
        if (__classPrivateFieldGet(this, _media) instanceof Media) {
            __classPrivateFieldGet(this, _media).mediaFiles = [];
            __classPrivateFieldGet(this, _media).src = media;
        }
    }
    get src() {
        return __classPrivateFieldGet(this, _media).src;
    }
    get id() {
        return __classPrivateFieldGet(this, _uid);
    }
    _isValid() {
        const el = __classPrivateFieldGet(this, _element);
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
        wrapper.className += isAudio(__classPrivateFieldGet(this, _element)) ? ' op-player__audio' : ' op-player__video';
        wrapper.tabIndex = 0;
        __classPrivateFieldGet(this, _element).classList.remove('op-player');
        if (__classPrivateFieldGet(this, _element).parentElement) {
            __classPrivateFieldGet(this, _element).parentElement.insertBefore(wrapper, __classPrivateFieldGet(this, _element));
        }
        wrapper.appendChild(__classPrivateFieldGet(this, _element));
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
        if (__classPrivateFieldGet(this, _options).mode === 'fill' && !isAudio(__classPrivateFieldGet(this, _element)) && !IS_IPHONE) {
            this.getContainer().classList.add('op-player__full');
        }
        else if (__classPrivateFieldGet(this, _options).mode === 'fit' && !isAudio(__classPrivateFieldGet(this, _element))) {
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
            if (__classPrivateFieldGet(this, _options).width) {
                const width = typeof __classPrivateFieldGet(this, _options).width === 'number' ? `${__classPrivateFieldGet(this, _options).width}px` : __classPrivateFieldGet(this, _options).width;
                style += `width: ${width} !important;`;
            }
            if (__classPrivateFieldGet(this, _options).height) {
                const height = typeof __classPrivateFieldGet(this, _options).height === 'number' ? `${__classPrivateFieldGet(this, _options).height}px` : __classPrivateFieldGet(this, _options).height;
                style += `height: ${height} !important;`;
            }
            if (style) {
                wrapper.setAttribute('style', style);
            }
        }
    }
    _createControls() {
        if (IS_IPHONE && isVideo(__classPrivateFieldGet(this, _element))) {
            this.getContainer().classList.add('op-player__ios--iphone');
        }
        __classPrivateFieldSet(this, _controls, new Controls(this));
        __classPrivateFieldGet(this, _controls).create();
    }
    _createUID() {
        if (__classPrivateFieldGet(this, _element).id) {
            __classPrivateFieldSet(this, _uid, __classPrivateFieldGet(this, _element).id);
            __classPrivateFieldGet(this, _element).removeAttribute('id');
        }
        else {
            let uid;
            do {
                uid = `op_${Math.random().toString(36).substr(2, 9)}`;
            } while (Player.instances[uid] !== undefined);
            __classPrivateFieldSet(this, _uid, uid);
        }
        if (__classPrivateFieldGet(this, _element).parentElement) {
            __classPrivateFieldGet(this, _element).parentElement.id = __classPrivateFieldGet(this, _uid);
        }
    }
    _createPlayButton() {
        if (isAudio(__classPrivateFieldGet(this, _element))) {
            return;
        }
        this.playBtn = document.createElement('button');
        this.playBtn.className = 'op-player__play';
        this.playBtn.tabIndex = 0;
        this.playBtn.title = __classPrivateFieldGet(this, _options).labels.play;
        this.playBtn.innerHTML = `<span>${__classPrivateFieldGet(this, _options).labels.play}</span>`;
        this.playBtn.setAttribute('aria-pressed', 'false');
        this.playBtn.setAttribute('aria-hidden', 'false');
        this.loader = document.createElement('span');
        this.loader.className = 'op-player__loader';
        this.loader.tabIndex = -1;
        this.loader.setAttribute('aria-hidden', 'true');
        if (__classPrivateFieldGet(this, _element).parentElement) {
            __classPrivateFieldGet(this, _element).parentElement.insertBefore(this.loader, __classPrivateFieldGet(this, _element));
            __classPrivateFieldGet(this, _element).parentElement.insertBefore(this.playBtn, __classPrivateFieldGet(this, _element));
        }
        this.playBtn.addEventListener('click', () => {
            if (__classPrivateFieldGet(this, _adsInstance)) {
                __classPrivateFieldGet(this, _adsInstance).playRequested = this.activeElement().paused;
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
        if (isVideo(__classPrivateFieldGet(this, _element))) {
            __classPrivateFieldGet(this, _events).loadedmetadata = () => {
                const el = this.activeElement();
                if (__classPrivateFieldGet(this, _options).showLoaderOnInit && !IS_IOS && !IS_ANDROID) {
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
            __classPrivateFieldGet(this, _events).waiting = () => {
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', 'false');
            };
            __classPrivateFieldGet(this, _events).seeking = () => {
                const el = this.activeElement();
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', el instanceof Media ? 'false' : 'true');
            };
            __classPrivateFieldGet(this, _events).seeked = () => {
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
            __classPrivateFieldGet(this, _events).play = () => {
                this.playBtn.classList.add('op-player__play--paused');
                this.playBtn.title = __classPrivateFieldGet(this, _options).labels.pause;
                this.loader.setAttribute('aria-hidden', 'true');
                if (__classPrivateFieldGet(this, _options).showLoaderOnInit) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                }
                else {
                    setTimeout(() => {
                        this.playBtn.setAttribute('aria-hidden', 'true');
                    }, __classPrivateFieldGet(this, _options).hidePlayBtnTimer);
                }
            };
            __classPrivateFieldGet(this, _events).playing = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
            __classPrivateFieldGet(this, _events).pause = () => {
                const el = this.activeElement();
                this.playBtn.classList.remove('op-player__play--paused');
                this.playBtn.title = __classPrivateFieldGet(this, _options).labels.play;
                if (__classPrivateFieldGet(this, _options).showLoaderOnInit && Math.round(el.currentTime) === 0) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                    this.loader.setAttribute('aria-hidden', 'false');
                }
                else {
                    this.playBtn.setAttribute('aria-hidden', 'false');
                    this.loader.setAttribute('aria-hidden', 'true');
                }
            };
            __classPrivateFieldGet(this, _events).ended = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
        }
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            __classPrivateFieldGet(this, _element).addEventListener(event, __classPrivateFieldGet(this, _events)[event], EVENT_OPTIONS);
        });
    }
    _autoplay() {
        if (!__classPrivateFieldGet(this, _processedAutoplay)) {
            __classPrivateFieldSet(this, _processedAutoplay, true);
            __classPrivateFieldGet(this, _element).removeEventListener('canplay', this._autoplay.bind(this));
            isAutoplaySupported(__classPrivateFieldGet(this, _element), __classPrivateFieldGet(this, _volume), autoplay => {
                __classPrivateFieldSet(this, _canAutoplay, autoplay);
            }, muted => {
                __classPrivateFieldSet(this, _canAutoplayMuted, muted);
            }, () => {
                if (__classPrivateFieldGet(this, _canAutoplayMuted)) {
                    this.activeElement().muted = true;
                    this.activeElement().volume = 0;
                    const e = addEvent('volumechange');
                    __classPrivateFieldGet(this, _element).dispatchEvent(e);
                    const volumeEl = document.createElement('div');
                    const action = IS_IOS || IS_ANDROID ? __classPrivateFieldGet(this, _options).labels.tap : __classPrivateFieldGet(this, _options).labels.click;
                    volumeEl.className = 'op-player__unmute';
                    volumeEl.innerHTML = `<span>${action}</span>`;
                    volumeEl.tabIndex = 0;
                    volumeEl.addEventListener('click', () => {
                        this.activeElement().muted = false;
                        this.activeElement().volume = __classPrivateFieldGet(this, _volume);
                        const event = addEvent('volumechange');
                        __classPrivateFieldGet(this, _element).dispatchEvent(event);
                        removeElement(volumeEl);
                    }, EVENT_OPTIONS);
                    const target = this.getContainer();
                    target.insertBefore(volumeEl, target.firstChild);
                }
                else {
                    this.activeElement().muted = __classPrivateFieldGet(this, _element).muted;
                    this.activeElement().volume = __classPrivateFieldGet(this, _volume);
                }
                if (__classPrivateFieldGet(this, _ads)) {
                    const adsOptions = __classPrivateFieldGet(this, _options) && __classPrivateFieldGet(this, _options).ads ? __classPrivateFieldGet(this, _options).ads : undefined;
                    __classPrivateFieldSet(this, _adsInstance, new Ads(this, __classPrivateFieldGet(this, _ads), __classPrivateFieldGet(this, _canAutoplay), __classPrivateFieldGet(this, _canAutoplayMuted), adsOptions));
                }
                else if (__classPrivateFieldGet(this, _canAutoplay) || __classPrivateFieldGet(this, _canAutoplayMuted)) {
                    return this.play();
                }
            });
        }
    }
    _mergeOptions(playerOptions) {
        __classPrivateFieldSet(this, _options, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _defaultOptions)), playerOptions));
        if (playerOptions) {
            const objectElements = ['labels', 'controls'];
            objectElements.forEach(item => {
                __classPrivateFieldGet(this, _options)[item] = playerOptions[item] && Object.keys(playerOptions[item]).length ? Object.assign(Object.assign({}, __classPrivateFieldGet(this, _defaultOptions)[item]), playerOptions[item]) :
                    __classPrivateFieldGet(this, _defaultOptions)[item];
            });
        }
    }
}
_controls = new WeakMap(), _adsInstance = new WeakMap(), _uid = new WeakMap(), _element = new WeakMap(), _ads = new WeakMap(), _media = new WeakMap(), _events = new WeakMap(), _autoplay_1 = new WeakMap(), _volume = new WeakMap(), _canAutoplay = new WeakMap(), _canAutoplayMuted = new WeakMap(), _processedAutoplay = new WeakMap(), _options = new WeakMap(), _customControlItems = new WeakMap(), _defaultOptions = new WeakMap();
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
