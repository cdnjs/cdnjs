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
var _Player_controls, _Player_adsInstance, _Player_uid, _Player_element, _Player_ads, _Player_media, _Player_events, _Player_autoplay, _Player_volume, _Player_canAutoplay, _Player_canAutoplayMuted, _Player_processedAutoplay, _Player_options, _Player_customControlItems, _Player_fullscreen, _Player_defaultOptions;
import 'core-js/features/array/find';
import 'core-js/features/array/from';
import 'core-js/features/object/assign';
import 'core-js/features/object/keys';
import 'core-js/features/promise';
import 'custom-event-polyfill';
import Controls from './controls';
import Fullscreen from './controls/fullscreen';
import Media from './media';
import Ads from './media/ads';
import './utils/closest';
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from './utils/constants';
import { addEvent } from './utils/events';
import { isAudio, isVideo, removeElement } from './utils/general';
import { isAutoplaySupported, predictType } from './utils/media';
class Player {
    constructor(element, options) {
        _Player_controls.set(this, void 0);
        _Player_adsInstance.set(this, void 0);
        this.proxy = null;
        _Player_uid.set(this, '');
        _Player_element.set(this, void 0);
        _Player_ads.set(this, void 0);
        _Player_media.set(this, void 0);
        _Player_events.set(this, {});
        _Player_autoplay.set(this, false);
        _Player_volume.set(this, void 0);
        _Player_canAutoplay.set(this, false);
        _Player_canAutoplayMuted.set(this, false);
        _Player_processedAutoplay.set(this, false);
        _Player_options.set(this, {});
        _Player_customControlItems.set(this, []);
        _Player_fullscreen.set(this, void 0);
        _Player_defaultOptions.set(this, {
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
            onError: (e) => console.error(e),
            pauseOthers: true,
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
        __classPrivateFieldSet(this, _Player_element, element instanceof HTMLMediaElement ? element : document.getElementById(element), "f");
        if (__classPrivateFieldGet(this, _Player_element, "f")) {
            __classPrivateFieldSet(this, _Player_autoplay, __classPrivateFieldGet(this, _Player_element, "f").autoplay || false, "f");
            if (typeof options !== 'string' && !Array.isArray(options)) {
                this._mergeOptions(options);
            }
            __classPrivateFieldGet(this, _Player_element, "f").volume = __classPrivateFieldGet(this, _Player_options, "f").startVolume || 1;
            if (__classPrivateFieldGet(this, _Player_options, "f").ads && __classPrivateFieldGet(this, _Player_options, "f").ads.src) {
                __classPrivateFieldSet(this, _Player_ads, __classPrivateFieldGet(this, _Player_options, "f").ads.src, "f");
            }
            if (__classPrivateFieldGet(this, _Player_options, "f").startTime > 0) {
                __classPrivateFieldGet(this, _Player_element, "f").currentTime = __classPrivateFieldGet(this, _Player_options, "f").startTime;
            }
            __classPrivateFieldSet(this, _Player_volume, __classPrivateFieldGet(this, _Player_element, "f").volume, "f");
        }
        this._autoplay = this._autoplay.bind(this);
        this._enableKeyBindings = this._enableKeyBindings.bind(this);
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isValid()) {
                this._wrapInstance();
                yield this._prepareMedia();
                this._createPlayButton();
                this._createUID();
                this._createControls();
                this._setEvents();
                Player.instances[this.id] = this;
            }
        });
    }
    load() {
        __classPrivateFieldGet(this, _Player_media, "f").loaded = false;
        return this.isMedia() ? __classPrivateFieldGet(this, _Player_media, "f").load() : undefined;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Player_media, "f") && !__classPrivateFieldGet(this, _Player_media, "f").loaded) {
                yield __classPrivateFieldGet(this, _Player_media, "f").load();
                __classPrivateFieldGet(this, _Player_media, "f").loaded = true;
            }
            if (__classPrivateFieldGet(this, _Player_adsInstance, "f")) {
                yield __classPrivateFieldGet(this, _Player_adsInstance, "f").loadPromise;
                return __classPrivateFieldGet(this, _Player_adsInstance, "f").play();
            }
            return __classPrivateFieldGet(this, _Player_media, "f").play();
        });
    }
    pause() {
        if (__classPrivateFieldGet(this, _Player_adsInstance, "f")) {
            __classPrivateFieldGet(this, _Player_adsInstance, "f").pause();
        }
        else {
            __classPrivateFieldGet(this, _Player_media, "f").pause();
        }
    }
    destroy() {
        if (__classPrivateFieldGet(this, _Player_adsInstance, "f")) {
            __classPrivateFieldGet(this, _Player_adsInstance, "f").pause();
            __classPrivateFieldGet(this, _Player_adsInstance, "f").destroy();
        }
        if (__classPrivateFieldGet(this, _Player_fullscreen, "f")) {
            __classPrivateFieldGet(this, _Player_fullscreen, "f").destroy();
        }
        const el = __classPrivateFieldGet(this, _Player_element, "f");
        if (__classPrivateFieldGet(this, _Player_media, "f")) {
            __classPrivateFieldGet(this, _Player_media, "f").destroy();
        }
        Object.keys(__classPrivateFieldGet(this, _Player_events, "f")).forEach(event => {
            el.removeEventListener(event, __classPrivateFieldGet(this, _Player_events, "f")[event]);
        });
        this.getContainer().removeEventListener('keydown', this._enableKeyBindings);
        if (__classPrivateFieldGet(this, _Player_autoplay, "f") && !__classPrivateFieldGet(this, _Player_processedAutoplay, "f") && isVideo(__classPrivateFieldGet(this, _Player_element, "f"))) {
            el.removeEventListener('canplay', this._autoplay);
        }
        if (__classPrivateFieldGet(this, _Player_controls, "f")) {
            __classPrivateFieldGet(this, _Player_controls, "f").destroy();
        }
        if (isVideo(__classPrivateFieldGet(this, _Player_element, "f"))) {
            removeElement(this.playBtn);
            removeElement(this.loader);
        }
        __classPrivateFieldGet(this, _Player_element, "f").removeEventListener('playererror', __classPrivateFieldGet(this, _Player_options, "f").onError);
        el.controls = true;
        el.setAttribute('id', __classPrivateFieldGet(this, _Player_uid, "f"));
        el.removeAttribute('op-live__enabled');
        el.removeAttribute('op-dvr__enabled');
        const parent = __classPrivateFieldGet(this, _Player_options, "f").mode === 'fit' && !isAudio(el) ? el.closest('.op-player__fit--wrapper') : el.parentElement;
        if (parent && parent.parentNode) {
            parent.parentNode.replaceChild(el, parent);
        }
        delete Player.instances[__classPrivateFieldGet(this, _Player_uid, "f")];
        const e = addEvent('playerdestroyed');
        el.dispatchEvent(e);
    }
    getContainer() {
        return __classPrivateFieldGet(this, _Player_element, "f").parentElement || __classPrivateFieldGet(this, _Player_element, "f");
    }
    getControls() {
        return __classPrivateFieldGet(this, _Player_controls, "f");
    }
    getCustomControls() {
        return __classPrivateFieldGet(this, _Player_customControlItems, "f");
    }
    getElement() {
        return __classPrivateFieldGet(this, _Player_element, "f");
    }
    getEvents() {
        return __classPrivateFieldGet(this, _Player_events, "f");
    }
    getOptions() {
        return __classPrivateFieldGet(this, _Player_options, "f");
    }
    activeElement() {
        return __classPrivateFieldGet(this, _Player_adsInstance, "f") && __classPrivateFieldGet(this, _Player_adsInstance, "f").started() ? __classPrivateFieldGet(this, _Player_adsInstance, "f") : __classPrivateFieldGet(this, _Player_media, "f");
    }
    isMedia() {
        return this.activeElement() instanceof Media;
    }
    isAd() {
        return this.activeElement() instanceof Ads;
    }
    getMedia() {
        return __classPrivateFieldGet(this, _Player_media, "f");
    }
    getAd() {
        return __classPrivateFieldGet(this, _Player_adsInstance, "f");
    }
    addCaptions(args) {
        if (args.default) {
            const tracks = __classPrivateFieldGet(this, _Player_element, "f").querySelectorAll('track');
            for (let i = 0, total = tracks.length; i < total; i++) {
                tracks[i].default = false;
            }
        }
        const el = __classPrivateFieldGet(this, _Player_element, "f");
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
        __classPrivateFieldGet(this, _Player_customControlItems, "f").push(args);
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
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
        __classPrivateFieldGet(this, _Player_customControlItems, "f").forEach((item, idx) => {
            if (item.id === controlName) {
                __classPrivateFieldGet(this, _Player_customControlItems, "f").splice(idx, 1);
            }
        });
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
    _prepareMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                __classPrivateFieldGet(this, _Player_element, "f").addEventListener('playererror', __classPrivateFieldGet(this, _Player_options, "f").onError, EVENT_OPTIONS);
                if (__classPrivateFieldGet(this, _Player_autoplay, "f") && isVideo(__classPrivateFieldGet(this, _Player_element, "f"))) {
                    __classPrivateFieldGet(this, _Player_element, "f").addEventListener('canplay', this._autoplay, EVENT_OPTIONS);
                }
                __classPrivateFieldSet(this, _Player_media, new Media(__classPrivateFieldGet(this, _Player_element, "f"), __classPrivateFieldGet(this, _Player_options, "f"), __classPrivateFieldGet(this, _Player_autoplay, "f"), Player.customMedia), "f");
                const preload = __classPrivateFieldGet(this, _Player_element, "f").getAttribute('preload');
                if (__classPrivateFieldGet(this, _Player_ads, "f") || !preload || preload !== 'none') {
                    yield __classPrivateFieldGet(this, _Player_media, "f").load();
                    __classPrivateFieldGet(this, _Player_media, "f").loaded = true;
                }
                if (!__classPrivateFieldGet(this, _Player_autoplay, "f") && __classPrivateFieldGet(this, _Player_ads, "f")) {
                    const adsOptions = __classPrivateFieldGet(this, _Player_options, "f") && __classPrivateFieldGet(this, _Player_options, "f").ads ? __classPrivateFieldGet(this, _Player_options, "f").ads : undefined;
                    __classPrivateFieldSet(this, _Player_adsInstance, new Ads(this, __classPrivateFieldGet(this, _Player_ads, "f"), false, false, adsOptions), "f");
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    enableDefaultPlayer() {
        let paused = true;
        let currentTime = 0;
        if (this.proxy && !this.proxy.paused) {
            paused = false;
            currentTime = this.proxy.currentTime;
            this.proxy.pause();
        }
        this.proxy = this;
        this.getElement().addEventListener('loadedmetadata', () => {
            this.getMedia().currentTime = currentTime;
            if (!paused) {
                this.play();
            }
        });
    }
    loadAd(src) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isAd()) {
                    this.activeElement().destroy();
                    this.activeElement().src = src;
                    this.getAd().isDone = false;
                    if (!this.activeElement().paused) {
                        this.getAd().playRequested = true;
                    }
                    this.activeElement().load(true);
                }
                else {
                    const adsOptions = __classPrivateFieldGet(this, _Player_options, "f") && __classPrivateFieldGet(this, _Player_options, "f").ads ? __classPrivateFieldGet(this, _Player_options, "f").ads : undefined;
                    const autoplay = !this.activeElement().paused || __classPrivateFieldGet(this, _Player_canAutoplay, "f");
                    __classPrivateFieldSet(this, _Player_adsInstance, new Ads(this, src, autoplay, __classPrivateFieldGet(this, _Player_canAutoplayMuted, "f"), adsOptions), "f");
                }
                yield __classPrivateFieldGet(this, _Player_adsInstance, "f").loadPromise;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    set src(media) {
        if (__classPrivateFieldGet(this, _Player_media, "f") instanceof Media) {
            __classPrivateFieldGet(this, _Player_media, "f").mediaFiles = [];
            __classPrivateFieldGet(this, _Player_media, "f").src = media;
        }
        else if (typeof media === 'string') {
            __classPrivateFieldGet(this, _Player_element, "f").src = media;
        }
        else if (Array.isArray(media)) {
            media.forEach(m => {
                const source = document.createElement('source');
                source.src = m.src;
                source.type = m.type || predictType(m.src, __classPrivateFieldGet(this, _Player_element, "f"));
                __classPrivateFieldGet(this, _Player_element, "f").appendChild(source);
            });
        }
        else if (typeof media === 'object') {
            __classPrivateFieldGet(this, _Player_element, "f").src = media.src;
        }
    }
    get src() {
        return __classPrivateFieldGet(this, _Player_media, "f").src;
    }
    get id() {
        return __classPrivateFieldGet(this, _Player_uid, "f");
    }
    _isValid() {
        const el = __classPrivateFieldGet(this, _Player_element, "f");
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
        wrapper.className += isAudio(__classPrivateFieldGet(this, _Player_element, "f")) ? ' op-player__audio' : ' op-player__video';
        wrapper.tabIndex = 0;
        __classPrivateFieldGet(this, _Player_element, "f").classList.remove('op-player');
        if (__classPrivateFieldGet(this, _Player_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(wrapper, __classPrivateFieldGet(this, _Player_element, "f"));
        }
        wrapper.appendChild(__classPrivateFieldGet(this, _Player_element, "f"));
        const messageContainer = document.createElement('div');
        messageContainer.className = 'op-status';
        messageContainer.innerHTML = '<span></span>';
        messageContainer.tabIndex = -1;
        messageContainer.setAttribute('aria-hidden', 'true');
        if (isVideo(__classPrivateFieldGet(this, _Player_element, "f")) && __classPrivateFieldGet(this, _Player_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(messageContainer, __classPrivateFieldGet(this, _Player_element, "f"));
        }
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
        if (__classPrivateFieldGet(this, _Player_options, "f").mode === 'fill' && !isAudio(__classPrivateFieldGet(this, _Player_element, "f")) && !IS_IPHONE) {
            this.getContainer().classList.add('op-player__full');
        }
        else if (__classPrivateFieldGet(this, _Player_options, "f").mode === 'fit' && !isAudio(__classPrivateFieldGet(this, _Player_element, "f"))) {
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
            if (__classPrivateFieldGet(this, _Player_options, "f").width) {
                const width = typeof __classPrivateFieldGet(this, _Player_options, "f").width === 'number' ? `${__classPrivateFieldGet(this, _Player_options, "f").width}px` : __classPrivateFieldGet(this, _Player_options, "f").width;
                style += `width: ${width} !important;`;
            }
            if (__classPrivateFieldGet(this, _Player_options, "f").height) {
                const height = typeof __classPrivateFieldGet(this, _Player_options, "f").height === 'number' ? `${__classPrivateFieldGet(this, _Player_options, "f").height}px` : __classPrivateFieldGet(this, _Player_options, "f").height;
                style += `height: ${height} !important;`;
            }
            if (style) {
                wrapper.setAttribute('style', style);
            }
        }
    }
    _createControls() {
        if (IS_IPHONE && isVideo(__classPrivateFieldGet(this, _Player_element, "f"))) {
            this.getContainer().classList.add('op-player__ios--iphone');
        }
        __classPrivateFieldSet(this, _Player_controls, new Controls(this), "f");
        __classPrivateFieldGet(this, _Player_controls, "f").create();
    }
    _createUID() {
        if (__classPrivateFieldGet(this, _Player_element, "f").id) {
            __classPrivateFieldSet(this, _Player_uid, __classPrivateFieldGet(this, _Player_element, "f").id, "f");
            __classPrivateFieldGet(this, _Player_element, "f").removeAttribute('id');
        }
        else {
            let uid;
            do {
                uid = `op_${Math.random().toString(36).substr(2, 9)}`;
            } while (Player.instances[uid] !== undefined);
            __classPrivateFieldSet(this, _Player_uid, uid, "f");
        }
        if (__classPrivateFieldGet(this, _Player_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Player_element, "f").parentElement.id = __classPrivateFieldGet(this, _Player_uid, "f");
        }
    }
    _createPlayButton() {
        if (isAudio(__classPrivateFieldGet(this, _Player_element, "f"))) {
            return;
        }
        this.playBtn = document.createElement('button');
        this.playBtn.className = 'op-player__play';
        this.playBtn.tabIndex = 0;
        this.playBtn.title = __classPrivateFieldGet(this, _Player_options, "f").labels.play;
        this.playBtn.innerHTML = `<span>${__classPrivateFieldGet(this, _Player_options, "f").labels.play}</span>`;
        this.playBtn.setAttribute('aria-pressed', 'false');
        this.playBtn.setAttribute('aria-hidden', 'false');
        this.loader = document.createElement('span');
        this.loader.className = 'op-player__loader';
        this.loader.tabIndex = -1;
        this.loader.setAttribute('aria-hidden', 'true');
        if (__classPrivateFieldGet(this, _Player_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(this.loader, __classPrivateFieldGet(this, _Player_element, "f"));
            __classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(this.playBtn, __classPrivateFieldGet(this, _Player_element, "f"));
        }
        this.playBtn.addEventListener('click', () => {
            if (__classPrivateFieldGet(this, _Player_adsInstance, "f")) {
                __classPrivateFieldGet(this, _Player_adsInstance, "f").playRequested = this.activeElement().paused;
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
        if (isVideo(__classPrivateFieldGet(this, _Player_element, "f"))) {
            __classPrivateFieldGet(this, _Player_events, "f").loadedmetadata = () => {
                const el = this.activeElement();
                if (__classPrivateFieldGet(this, _Player_options, "f").showLoaderOnInit && !IS_IOS && !IS_ANDROID) {
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
            __classPrivateFieldGet(this, _Player_events, "f").waiting = () => {
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', 'false');
            };
            __classPrivateFieldGet(this, _Player_events, "f").seeking = () => {
                const el = this.activeElement();
                this.playBtn.setAttribute('aria-hidden', 'true');
                this.loader.setAttribute('aria-hidden', el instanceof Media ? 'false' : 'true');
            };
            __classPrivateFieldGet(this, _Player_events, "f").seeked = () => {
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
            __classPrivateFieldGet(this, _Player_events, "f").play = () => {
                this.playBtn.classList.add('op-player__play--paused');
                this.playBtn.title = __classPrivateFieldGet(this, _Player_options, "f").labels.pause;
                this.loader.setAttribute('aria-hidden', 'true');
                if (__classPrivateFieldGet(this, _Player_options, "f").showLoaderOnInit) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                }
                else {
                    setTimeout(() => {
                        this.playBtn.setAttribute('aria-hidden', 'true');
                    }, __classPrivateFieldGet(this, _Player_options, "f").hidePlayBtnTimer);
                }
            };
            __classPrivateFieldGet(this, _Player_events, "f").playing = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
            __classPrivateFieldGet(this, _Player_events, "f").pause = () => {
                const el = this.activeElement();
                this.playBtn.classList.remove('op-player__play--paused');
                this.playBtn.title = __classPrivateFieldGet(this, _Player_options, "f").labels.play;
                if (__classPrivateFieldGet(this, _Player_options, "f").showLoaderOnInit && Math.round(el.currentTime) === 0) {
                    this.playBtn.setAttribute('aria-hidden', 'true');
                    this.loader.setAttribute('aria-hidden', 'false');
                }
                else {
                    this.playBtn.setAttribute('aria-hidden', 'false');
                    this.loader.setAttribute('aria-hidden', 'true');
                }
            };
            __classPrivateFieldGet(this, _Player_events, "f").ended = () => {
                this.loader.setAttribute('aria-hidden', 'true');
                this.playBtn.setAttribute('aria-hidden', 'true');
            };
        }
        Object.keys(__classPrivateFieldGet(this, _Player_events, "f")).forEach(event => {
            __classPrivateFieldGet(this, _Player_element, "f").addEventListener(event, __classPrivateFieldGet(this, _Player_events, "f")[event], EVENT_OPTIONS);
        });
        this.getContainer().addEventListener('keydown', this._enableKeyBindings, EVENT_OPTIONS);
    }
    _autoplay() {
        if (!__classPrivateFieldGet(this, _Player_processedAutoplay, "f")) {
            __classPrivateFieldSet(this, _Player_processedAutoplay, true, "f");
            __classPrivateFieldGet(this, _Player_element, "f").removeEventListener('canplay', this._autoplay);
            isAutoplaySupported(__classPrivateFieldGet(this, _Player_element, "f"), __classPrivateFieldGet(this, _Player_volume, "f"), autoplay => {
                __classPrivateFieldSet(this, _Player_canAutoplay, autoplay, "f");
            }, muted => {
                __classPrivateFieldSet(this, _Player_canAutoplayMuted, muted, "f");
            }, () => {
                if (__classPrivateFieldGet(this, _Player_canAutoplayMuted, "f")) {
                    this.activeElement().muted = true;
                    this.activeElement().volume = 0;
                    const e = addEvent('volumechange');
                    __classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
                    const volumeEl = document.createElement('div');
                    const action = IS_IOS || IS_ANDROID ? __classPrivateFieldGet(this, _Player_options, "f").labels.tap : __classPrivateFieldGet(this, _Player_options, "f").labels.click;
                    volumeEl.className = 'op-player__unmute';
                    volumeEl.innerHTML = `<span>${action}</span>`;
                    volumeEl.tabIndex = 0;
                    volumeEl.addEventListener('click', () => {
                        this.activeElement().muted = false;
                        this.activeElement().volume = __classPrivateFieldGet(this, _Player_volume, "f");
                        const event = addEvent('volumechange');
                        __classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(event);
                        removeElement(volumeEl);
                    }, EVENT_OPTIONS);
                    const target = this.getContainer();
                    target.insertBefore(volumeEl, target.firstChild);
                }
                else {
                    this.activeElement().muted = __classPrivateFieldGet(this, _Player_element, "f").muted;
                    this.activeElement().volume = __classPrivateFieldGet(this, _Player_volume, "f");
                }
                if (__classPrivateFieldGet(this, _Player_ads, "f")) {
                    const adsOptions = __classPrivateFieldGet(this, _Player_options, "f") && __classPrivateFieldGet(this, _Player_options, "f").ads ? __classPrivateFieldGet(this, _Player_options, "f").ads : undefined;
                    __classPrivateFieldSet(this, _Player_adsInstance, new Ads(this, __classPrivateFieldGet(this, _Player_ads, "f"), __classPrivateFieldGet(this, _Player_canAutoplay, "f"), __classPrivateFieldGet(this, _Player_canAutoplayMuted, "f"), adsOptions), "f");
                }
                else if (__classPrivateFieldGet(this, _Player_canAutoplay, "f") || __classPrivateFieldGet(this, _Player_canAutoplayMuted, "f")) {
                    this.play();
                }
            });
        }
    }
    _mergeOptions(playerOptions) {
        __classPrivateFieldSet(this, _Player_options, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Player_defaultOptions, "f")), playerOptions), "f");
        if (playerOptions) {
            const objectElements = ['labels', 'controls'];
            objectElements.forEach(item => {
                __classPrivateFieldGet(this, _Player_options, "f")[item] = playerOptions[item] && Object.keys(playerOptions[item]).length
                    ? Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Player_defaultOptions, "f")[item]), playerOptions[item]) : __classPrivateFieldGet(this, _Player_defaultOptions, "f")[item];
            });
        }
    }
    _enableKeyBindings(e) {
        var _a;
        const key = e.which || e.keyCode || 0;
        const el = this.activeElement();
        const isAd = this.isAd();
        const playerFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-player');
        switch (key) {
            case 13:
            case 32:
            case 75:
                if (playerFocused && (key === 13 || key === 32)) {
                    if (el.paused) {
                        el.play();
                    }
                    else {
                        el.pause();
                    }
                }
                else if (key === 75) {
                    if (el.paused) {
                        el.play();
                    }
                    else {
                        el.pause();
                    }
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case 35:
                if (!isAd && el.duration !== Infinity) {
                    el.currentTime = el.duration;
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 36:
                if (!isAd) {
                    el.currentTime = 0;
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 37:
            case 39:
            case 74:
            case 76:
                if (!isAd && el.duration !== Infinity) {
                    let newStep = 5;
                    const configStep = this.getOptions().step;
                    if (configStep) {
                        newStep = key === 74 || key === 76 ? configStep * 2 : configStep;
                    }
                    else if (key === 74 || key === 76) {
                        newStep = 10;
                    }
                    const step = el.duration !== Infinity ? newStep : this.getOptions().progress.duration;
                    el.currentTime += key === 37 || key === 74 ? step * -1 : step;
                    if (el.currentTime < 0) {
                        el.currentTime = 0;
                    }
                    else if (el.currentTime >= el.duration) {
                        el.currentTime = el.duration;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 38:
            case 40:
                const newVol = key === 38 ? Math.min(el.volume + 0.1, 1) : Math.max(el.volume - 0.1, 0);
                el.volume = newVol;
                el.muted = !(newVol > 0);
                e.preventDefault();
                e.stopPropagation();
                break;
            case 70:
                if (isVideo(__classPrivateFieldGet(this, _Player_element, "f")) && !e.ctrlKey) {
                    __classPrivateFieldSet(this, _Player_fullscreen, new Fullscreen(this, '', ''), "f");
                    if (typeof __classPrivateFieldGet(this, _Player_fullscreen, "f").fullScreenEnabled !== 'undefined') {
                        __classPrivateFieldGet(this, _Player_fullscreen, "f").toggleFullscreen();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                break;
            case 77:
                el.muted = !el.muted;
                if (el.muted) {
                    el.volume = 0;
                }
                else {
                    el.volume = __classPrivateFieldGet(this, _Player_volume, "f");
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case 188:
            case 190:
                if (!isAd && e.shiftKey) {
                    const elem = el;
                    elem.playbackRate = key === 188 ? Math.max(elem.playbackRate - 0.25, 0.25) : Math.min(elem.playbackRate + 0.25, 2);
                    const target = this.getContainer().querySelector('.op-status>span');
                    if (target) {
                        target.textContent = `${elem.playbackRate}x`;
                        if (target.parentElement) {
                            target.parentElement.setAttribute('aria-hidden', 'false');
                        }
                        setTimeout(() => {
                            if (target.parentElement) {
                                target.parentElement.setAttribute('aria-hidden', 'true');
                            }
                        }, 500);
                    }
                    const ev = addEvent('controlschanged');
                    dispatchEvent(ev);
                    e.preventDefault();
                    e.stopPropagation();
                }
                else if (!isAd && el.paused) {
                    el.currentTime += (1 / 25) * (key === 188 ? -1 : 1);
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            default:
                break;
        }
    }
}
_Player_controls = new WeakMap(), _Player_adsInstance = new WeakMap(), _Player_uid = new WeakMap(), _Player_element = new WeakMap(), _Player_ads = new WeakMap(), _Player_media = new WeakMap(), _Player_events = new WeakMap(), _Player_autoplay = new WeakMap(), _Player_volume = new WeakMap(), _Player_canAutoplay = new WeakMap(), _Player_canAutoplayMuted = new WeakMap(), _Player_processedAutoplay = new WeakMap(), _Player_options = new WeakMap(), _Player_customControlItems = new WeakMap(), _Player_fullscreen = new WeakMap(), _Player_defaultOptions = new WeakMap();
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
