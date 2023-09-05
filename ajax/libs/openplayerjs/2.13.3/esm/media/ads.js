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
var _Ads_ended, _Ads_done, _Ads_active, _Ads_started, _Ads_intervalTimer, _Ads_volume, _Ads_muted, _Ads_duration, _Ads_currentTime, _Ads_manager, _Ads_player, _Ads_media, _Ads_element, _Ads_events, _Ads_ads, _Ads_promise, _Ads_loader, _Ads_container, _Ads_customClickContainer, _Ads_skipElement, _Ads_displayContainer, _Ads_request, _Ads_autostart, _Ads_autostartMuted, _Ads_playTriggered, _Ads_options, _Ads_currentIndex, _Ads_originalVolume, _Ads_preloadContent, _Ads_lastTimePaused, _Ads_mediaSources, _Ads_mediaStarted, _Ads_adEvent;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from '../utils/constants';
import { addEvent, isAudio, isVideo, isXml, loadScript } from '../utils/general';
class Ads {
    constructor(player, ads, autostart, autostartMuted, options) {
        var _a, _b, _c, _d;
        this.loadedAd = false;
        _Ads_ended.set(this, false);
        _Ads_done.set(this, false);
        _Ads_active.set(this, false);
        _Ads_started.set(this, false);
        _Ads_intervalTimer.set(this, 0);
        _Ads_volume.set(this, void 0);
        _Ads_muted.set(this, false);
        _Ads_duration.set(this, 0);
        _Ads_currentTime.set(this, 0);
        _Ads_manager.set(this, null);
        _Ads_player.set(this, void 0);
        _Ads_media.set(this, void 0);
        _Ads_element.set(this, void 0);
        _Ads_events.set(this, []);
        _Ads_ads.set(this, void 0);
        _Ads_promise.set(this, void 0);
        _Ads_loader.set(this, void 0);
        _Ads_container.set(this, void 0);
        _Ads_customClickContainer.set(this, void 0);
        _Ads_skipElement.set(this, void 0);
        _Ads_displayContainer.set(this, void 0);
        _Ads_request.set(this, void 0);
        _Ads_autostart.set(this, false);
        _Ads_autostartMuted.set(this, false);
        _Ads_playTriggered.set(this, false);
        _Ads_options.set(this, void 0);
        _Ads_currentIndex.set(this, 0);
        _Ads_originalVolume.set(this, void 0);
        _Ads_preloadContent.set(this, void 0);
        _Ads_lastTimePaused.set(this, 0);
        _Ads_mediaSources.set(this, []);
        _Ads_mediaStarted.set(this, false);
        _Ads_adEvent.set(this, null);
        const defaultOpts = {
            autoPlayAdBreaks: true,
            customClick: {
                enabled: false,
                label: 'Click here for more info',
            },
            audioSkip: {
                enabled: true,
                label: 'Skip Ad',
                remainingLabel: 'Skip in [[secs]] seconds',
            },
            debug: false,
            enablePreloading: false,
            language: 'en',
            loop: false,
            numRedirects: 4,
            publisherId: undefined,
            sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            sessionId: undefined,
            src: [],
            vpaidMode: 'enabled',
        };
        __classPrivateFieldSet(this, _Ads_player, player, "f");
        __classPrivateFieldSet(this, _Ads_ads, ads, "f");
        __classPrivateFieldSet(this, _Ads_media, player.getMedia(), "f");
        __classPrivateFieldSet(this, _Ads_element, player.getElement(), "f");
        __classPrivateFieldSet(this, _Ads_autostart, autostart || false, "f");
        __classPrivateFieldSet(this, _Ads_muted, player.getElement().muted, "f");
        __classPrivateFieldSet(this, _Ads_autostartMuted, autostartMuted || false, "f");
        __classPrivateFieldSet(this, _Ads_options, Object.assign(Object.assign({}, defaultOpts), options), "f");
        if ((options === null || options === void 0 ? void 0 : options.customClick) && Object.keys(options.customClick).length) {
            __classPrivateFieldGet(this, _Ads_options, "f").customClick = Object.assign(Object.assign({}, defaultOpts.customClick), options.customClick);
        }
        __classPrivateFieldSet(this, _Ads_playTriggered, false, "f");
        __classPrivateFieldSet(this, _Ads_originalVolume, __classPrivateFieldGet(this, _Ads_element, "f").volume, "f");
        __classPrivateFieldSet(this, _Ads_volume, __classPrivateFieldGet(this, _Ads_originalVolume, "f"), "f");
        const path = ((_a = __classPrivateFieldGet(this, _Ads_options, "f")) === null || _a === void 0 ? void 0 : _a.debug)
            ? (_c = (_b = __classPrivateFieldGet(this, _Ads_options, "f")) === null || _b === void 0 ? void 0 : _b.sdkPath) === null || _c === void 0 ? void 0 : _c.replace(/(\.js$)/, '_debug.js')
            : (_d = __classPrivateFieldGet(this, _Ads_options, "f")) === null || _d === void 0 ? void 0 : _d.sdkPath;
        this.load = this.load.bind(this);
        this.resizeAds = this.resizeAds.bind(this);
        this._handleClickInContainer = this._handleClickInContainer.bind(this);
        this._handleSkipAds = this._handleSkipAds.bind(this);
        this._loaded = this._loaded.bind(this);
        this._error = this._error.bind(this);
        this._assign = this._assign.bind(this);
        this._contentLoadedAction = this._contentLoadedAction.bind(this);
        this._loadedMetadataHandler = this._loadedMetadataHandler.bind(this);
        this._contentEndedListener = this._contentEndedListener.bind(this);
        this._handleResizeAds = this._handleResizeAds.bind(this);
        this._onContentPauseRequested = this._onContentPauseRequested.bind(this);
        this._onContentResumeRequested = this._onContentResumeRequested.bind(this);
        __classPrivateFieldSet(this, _Ads_promise, path && (typeof google === 'undefined' || typeof google.ima === 'undefined')
            ? loadScript(path)
            : new Promise((resolve) => {
                resolve();
            }), "f");
        __classPrivateFieldGet(this, _Ads_promise, "f")
            .then(() => {
            this.load();
        })
            .catch((error) => {
            let message = 'Ad script could not be loaded; please check if you have an AdBlock ';
            message += 'turned on, or if you provided a valid URL is correct';
            console.error(`Ad error: ${message}.`);
            const details = {
                detail: {
                    data: error,
                    message,
                    type: 'Ads',
                },
            };
            const errorEvent = addEvent('playererror', details);
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(errorEvent);
        });
    }
    load(force = false) {
        var _a, _b, _c;
        if (typeof google === 'undefined' ||
            !google.ima ||
            (!force && this.loadedAd && __classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks)) {
            return;
        }
        if (!__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks && !force) {
            return;
        }
        this.loadedAd = true;
        const existingContainer = __classPrivateFieldGet(this, _Ads_player, "f").getContainer().querySelector('.op-ads');
        if (existingContainer && existingContainer.parentNode) {
            existingContainer.parentNode.removeChild(existingContainer);
        }
        __classPrivateFieldSet(this, _Ads_started, true, "f");
        __classPrivateFieldSet(this, _Ads_container, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Ads_container, "f").className = 'op-ads';
        __classPrivateFieldGet(this, _Ads_container, "f").tabIndex = -1;
        if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Ads_container, "f"), __classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
        }
        __classPrivateFieldGet(this, _Ads_container, "f").addEventListener('click', this._handleClickInContainer);
        if ((_a = __classPrivateFieldGet(this, _Ads_options, "f").customClick) === null || _a === void 0 ? void 0 : _a.enabled) {
            __classPrivateFieldSet(this, _Ads_customClickContainer, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Ads_customClickContainer, "f").className = 'op-ads__click-container';
            __classPrivateFieldGet(this, _Ads_customClickContainer, "f").innerHTML = `<div class="op-ads__click-label">${__classPrivateFieldGet(this, _Ads_options, "f").customClick.label}</div>`;
            if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                __classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Ads_customClickContainer, "f"), __classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
            }
        }
        if (isAudio(__classPrivateFieldGet(this, _Ads_element, "f")) && ((_b = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.enabled)) {
            if ((_c = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _c === void 0 ? void 0 : _c.element) {
                const { element } = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip || {};
                if (typeof element === 'string') {
                    const target = document.getElementById(element);
                    if (target) {
                        __classPrivateFieldSet(this, _Ads_skipElement, target, "f");
                    }
                }
                else if (element instanceof HTMLElement) {
                    __classPrivateFieldSet(this, _Ads_skipElement, element, "f");
                }
            }
            else {
                __classPrivateFieldSet(this, _Ads_skipElement, document.createElement('button'), "f");
                __classPrivateFieldGet(this, _Ads_skipElement, "f").className = 'op-ads__skip hidden';
                __classPrivateFieldGet(this, _Ads_player, "f").getControls().getContainer().appendChild(__classPrivateFieldGet(this, _Ads_skipElement, "f"));
            }
            if (__classPrivateFieldGet(this, _Ads_skipElement, "f")) {
                __classPrivateFieldGet(this, _Ads_skipElement, "f").addEventListener('click', this._handleSkipAds, EVENT_OPTIONS);
            }
        }
        __classPrivateFieldSet(this, _Ads_mediaSources, __classPrivateFieldGet(this, _Ads_media, "f").src, "f");
        const vpaidModeMap = {
            disabled: google.ima.ImaSdkSettings.VpaidMode.DISABLED,
            enabled: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
            insecure: google.ima.ImaSdkSettings.VpaidMode.INSECURE,
        };
        google.ima.settings.setVpaidMode(vpaidModeMap[__classPrivateFieldGet(this, _Ads_options, "f").vpaidMode || 'enabled']);
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
        google.ima.settings.setAutoPlayAdBreaks(__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks);
        google.ima.settings.setNumRedirects(__classPrivateFieldGet(this, _Ads_options, "f").numRedirects);
        google.ima.settings.setLocale(__classPrivateFieldGet(this, _Ads_options, "f").language);
        if (__classPrivateFieldGet(this, _Ads_options, "f").sessionId) {
            google.ima.settings.setSessionId(__classPrivateFieldGet(this, _Ads_options, "f").sessionId);
        }
        if (__classPrivateFieldGet(this, _Ads_options, "f").publisherId) {
            google.ima.settings.setPpid(__classPrivateFieldGet(this, _Ads_options, "f").publisherId);
        }
        google.ima.settings.setPlayerType('openplayerjs');
        google.ima.settings.setPlayerVersion('3.0.0');
        __classPrivateFieldSet(this, _Ads_displayContainer, new google.ima.AdDisplayContainer(__classPrivateFieldGet(this, _Ads_container, "f"), __classPrivateFieldGet(this, _Ads_element, "f"), __classPrivateFieldGet(this, _Ads_customClickContainer, "f")), "f");
        __classPrivateFieldSet(this, _Ads_loader, new google.ima.AdsLoader(__classPrivateFieldGet(this, _Ads_displayContainer, "f")), "f");
        __classPrivateFieldGet(this, _Ads_loader, "f").addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Ads_loader, "f").addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this._handleResizeAds, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._handleResizeAds, EVENT_OPTIONS);
        if (__classPrivateFieldGet(this, _Ads_autostart, "f") === true ||
            __classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true ||
            force === true ||
            __classPrivateFieldGet(this, _Ads_options, "f").enablePreloading === true ||
            __classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
            if (!__classPrivateFieldGet(this, _Ads_done, "f")) {
                __classPrivateFieldSet(this, _Ads_done, true, "f");
                __classPrivateFieldGet(this, _Ads_displayContainer, "f").initialize();
            }
            this._requestAds();
        }
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Ads_done, "f")) {
                __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
                this._initNotDoneAds();
                return;
            }
            if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
                try {
                    if (!__classPrivateFieldGet(this, _Ads_intervalTimer, "f") && __classPrivateFieldGet(this, _Ads_active, "f") === false) {
                        __classPrivateFieldGet(this, _Ads_manager, "f").start();
                    }
                    else {
                        __classPrivateFieldGet(this, _Ads_manager, "f").resume();
                    }
                    __classPrivateFieldSet(this, _Ads_active, true, "f");
                    const e = addEvent('play');
                    __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
                }
                catch (err) {
                    this._resumeMedia();
                }
            }
        });
    }
    pause() {
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            __classPrivateFieldSet(this, _Ads_active, false, "f");
            __classPrivateFieldGet(this, _Ads_manager, "f").pause();
            const e = addEvent('pause');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
        }
    }
    destroy() {
        var _a, _b;
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            __classPrivateFieldGet(this, _Ads_manager, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);
            if (__classPrivateFieldGet(this, _Ads_events, "f")) {
                __classPrivateFieldGet(this, _Ads_events, "f").forEach((event) => {
                    __classPrivateFieldGet(this, _Ads_manager, "f").removeEventListener(event, this._assign);
                });
            }
        }
        __classPrivateFieldSet(this, _Ads_events, [], "f");
        const controls = __classPrivateFieldGet(this, _Ads_player, "f").getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _Ads_container, "f")) {
                __classPrivateFieldGet(this, _Ads_container, "f").removeEventListener(event, mouseEvents[event]);
            }
        });
        if (__classPrivateFieldGet(this, _Ads_loader, "f")) {
            __classPrivateFieldGet(this, _Ads_loader, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);
            __classPrivateFieldGet(this, _Ads_loader, "f").removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded);
        }
        const destroy = !Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) || __classPrivateFieldGet(this, _Ads_currentIndex, "f") > __classPrivateFieldGet(this, _Ads_ads, "f").length;
        if (__classPrivateFieldGet(this, _Ads_manager, "f") && destroy) {
            __classPrivateFieldGet(this, _Ads_manager, "f").destroy();
        }
        if (((_a = __classPrivateFieldGet(this, _Ads_options, "f").customClick) === null || _a === void 0 ? void 0 : _a.enabled) && __classPrivateFieldGet(this, _Ads_customClickContainer, "f")) {
            __classPrivateFieldGet(this, _Ads_customClickContainer, "f").remove();
        }
        if (((_b = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.enabled) && __classPrivateFieldGet(this, _Ads_skipElement, "f")) {
            __classPrivateFieldGet(this, _Ads_skipElement, "f").removeEventListener('click', this._handleSkipAds);
            __classPrivateFieldGet(this, _Ads_skipElement, "f").remove();
        }
        if (IS_IOS || IS_ANDROID) {
            __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._contentLoadedAction);
        }
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._handleResizeAds);
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._loadedMetadataHandler);
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this._handleResizeAds);
        }
        if (__classPrivateFieldGet(this, _Ads_container, "f")) {
            __classPrivateFieldGet(this, _Ads_container, "f").removeEventListener('click', this._handleClickInContainer);
            __classPrivateFieldGet(this, _Ads_container, "f").remove();
        }
        this.loadPromise = null;
        this.loadedAd = false;
        __classPrivateFieldSet(this, _Ads_done, false, "f");
        __classPrivateFieldSet(this, _Ads_playTriggered, false, "f");
        __classPrivateFieldSet(this, _Ads_duration, 0, "f");
        __classPrivateFieldSet(this, _Ads_currentTime, 0, "f");
        __classPrivateFieldSet(this, _Ads_adEvent, null, "f");
    }
    resizeAds(width, height) {
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            const target = __classPrivateFieldGet(this, _Ads_element, "f");
            const mode = target.getAttribute('data-fullscreen') === 'true'
                ? google.ima.ViewMode.FULLSCREEN
                : google.ima.ViewMode.NORMAL;
            let formattedWidth = width;
            const percentageWidth = width ? width.toString() : '';
            if (width && percentageWidth.indexOf('%') > -1) {
                if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                    formattedWidth = __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth * (parseInt(percentageWidth, 10) / 100);
                }
            }
            let formattedHeight = height;
            const percentageHeight = height ? height.toString() : '';
            if (height && percentageHeight.indexOf('%') > -1) {
                if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                    formattedHeight = __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight * (parseInt(percentageHeight, 10) / 100);
                }
            }
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    __classPrivateFieldGet(this, _Ads_manager, "f").resize(formattedWidth || target.offsetWidth, formattedHeight || target.offsetHeight, mode);
                });
            }
        }
    }
    getAdsManager() {
        return __classPrivateFieldGet(this, _Ads_manager, "f");
    }
    getAdsLoader() {
        return __classPrivateFieldGet(this, _Ads_loader, "f");
    }
    started() {
        return __classPrivateFieldGet(this, _Ads_started, "f");
    }
    set src(source) {
        __classPrivateFieldSet(this, _Ads_ads, source, "f");
    }
    set isDone(value) {
        __classPrivateFieldSet(this, _Ads_done, value, "f");
    }
    set playRequested(value) {
        __classPrivateFieldSet(this, _Ads_playTriggered, value, "f");
    }
    set volume(value) {
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            __classPrivateFieldSet(this, _Ads_volume, value, "f");
            __classPrivateFieldGet(this, _Ads_manager, "f").setVolume(value);
            this._setMediaVolume(value);
            __classPrivateFieldSet(this, _Ads_muted, value === 0, "f");
        }
    }
    get volume() {
        return __classPrivateFieldGet(this, _Ads_manager, "f") ? __classPrivateFieldGet(this, _Ads_manager, "f").getVolume() : __classPrivateFieldGet(this, _Ads_originalVolume, "f");
    }
    set muted(value) {
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            if (value) {
                __classPrivateFieldGet(this, _Ads_manager, "f").setVolume(0);
                __classPrivateFieldSet(this, _Ads_muted, true, "f");
                this._setMediaVolume(0);
            }
            else {
                __classPrivateFieldGet(this, _Ads_manager, "f").setVolume(__classPrivateFieldGet(this, _Ads_volume, "f"));
                __classPrivateFieldSet(this, _Ads_muted, false, "f");
                this._setMediaVolume(__classPrivateFieldGet(this, _Ads_volume, "f"));
            }
        }
    }
    get muted() {
        return __classPrivateFieldGet(this, _Ads_muted, "f");
    }
    set currentTime(value) {
        __classPrivateFieldSet(this, _Ads_currentTime, value, "f");
    }
    get currentTime() {
        return __classPrivateFieldGet(this, _Ads_currentTime, "f");
    }
    get duration() {
        return __classPrivateFieldGet(this, _Ads_duration, "f");
    }
    get paused() {
        return !__classPrivateFieldGet(this, _Ads_active, "f");
    }
    get ended() {
        return __classPrivateFieldGet(this, _Ads_ended, "f");
    }
    _assign(event) {
        var _a, _b;
        const ad = event.getAd();
        if (ad) {
            __classPrivateFieldSet(this, _Ads_adEvent, ad, "f");
        }
        switch (event.type) {
            case google.ima.AdEvent.Type.LOADED:
                if (!ad.isLinear()) {
                    this._onContentResumeRequested();
                }
                else {
                    if (IS_IPHONE && isVideo(__classPrivateFieldGet(this, _Ads_element, "f"))) {
                        __classPrivateFieldGet(this, _Ads_element, "f").controls = false;
                    }
                    __classPrivateFieldSet(this, _Ads_duration, ad.getDuration(), "f");
                    __classPrivateFieldSet(this, _Ads_currentTime, ad.getDuration(), "f");
                    if (!__classPrivateFieldGet(this, _Ads_mediaStarted, "f") && !IS_IOS && !IS_ANDROID) {
                        const waitingEvent = addEvent('waiting');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(waitingEvent);
                        const loadedEvent = addEvent('loadedmetadata');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(loadedEvent);
                        this.resizeAds();
                    }
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                if (ad.isLinear()) {
                    if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement &&
                        !__classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.contains('op-ads--active')) {
                        __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.add('op-ads--active');
                    }
                    if (!__classPrivateFieldGet(this, _Ads_media, "f").paused) {
                        __classPrivateFieldGet(this, _Ads_media, "f").pause();
                    }
                    __classPrivateFieldSet(this, _Ads_active, true, "f");
                    const playEvent = addEvent('play');
                    __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(playEvent);
                    let resized;
                    if (!resized) {
                        this.resizeAds();
                        resized = true;
                    }
                    if (__classPrivateFieldGet(this, _Ads_media, "f").ended) {
                        __classPrivateFieldSet(this, _Ads_ended, false, "f");
                        const endEvent = addEvent('adsmediaended');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endEvent);
                    }
                    if (typeof window !== 'undefined') {
                        __classPrivateFieldSet(this, _Ads_intervalTimer, window.setInterval(() => {
                            if (__classPrivateFieldGet(this, _Ads_active, "f") === true) {
                                __classPrivateFieldSet(this, _Ads_currentTime, Math.round(__classPrivateFieldGet(this, _Ads_manager, "f").getRemainingTime()), "f");
                                const timeEvent = addEvent('timeupdate');
                                __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(timeEvent);
                            }
                        }, 350), "f");
                    }
                }
                break;
            case google.ima.AdEvent.Type.COMPLETE:
            case google.ima.AdEvent.Type.SKIPPED:
                if (ad.isLinear()) {
                    if (event.type === google.ima.AdEvent.Type.SKIPPED) {
                        const skipEvent = addEvent('adsskipped');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(skipEvent);
                    }
                    if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                        __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
                    }
                    __classPrivateFieldSet(this, _Ads_active, false, "f");
                    clearInterval(__classPrivateFieldGet(this, _Ads_intervalTimer, "f"));
                }
                break;
            case google.ima.AdEvent.Type.VOLUME_CHANGED:
                this._setMediaVolume(this.volume);
                break;
            case google.ima.AdEvent.Type.VOLUME_MUTED:
                if (ad.isLinear()) {
                    const volumeEvent = addEvent('volumechange');
                    __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(volumeEvent);
                }
                break;
            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                if (ad.isLinear()) {
                    __classPrivateFieldSet(this, _Ads_active, false, "f");
                    __classPrivateFieldSet(this, _Ads_ended, true, "f");
                    __classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");
                    __classPrivateFieldSet(this, _Ads_muted, false, "f");
                    __classPrivateFieldSet(this, _Ads_started, false, "f");
                    __classPrivateFieldSet(this, _Ads_adEvent, null, "f");
                    if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                        __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
                    }
                    this.destroy();
                    if (__classPrivateFieldGet(this, _Ads_element, "f").currentTime >= __classPrivateFieldGet(this, _Ads_element, "f").duration) {
                        const endedEvent = addEvent('ended');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endedEvent);
                    }
                }
                break;
            case google.ima.AdEvent.Type.CLICK:
                const pauseEvent = addEvent('pause');
                __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(pauseEvent);
                break;
            case google.ima.AdEvent.Type.AD_BREAK_READY:
                if (!__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
                    this.play();
                }
                break;
            case google.ima.AdEvent.Type.AD_PROGRESS:
                const progressData = event.getAdData();
                const offset = __classPrivateFieldGet(this, _Ads_adEvent, "f") ? __classPrivateFieldGet(this, _Ads_adEvent, "f").getSkipTimeOffset() : -1;
                if (__classPrivateFieldGet(this, _Ads_skipElement, "f")) {
                    if (offset !== -1) {
                        const canSkip = __classPrivateFieldGet(this, _Ads_manager, "f").getAdSkippableState();
                        const remainingTime = Math.ceil(offset - progressData.currentTime);
                        __classPrivateFieldGet(this, _Ads_skipElement, "f").classList.remove('hidden');
                        if (canSkip) {
                            __classPrivateFieldGet(this, _Ads_skipElement, "f").textContent = ((_a = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _a === void 0 ? void 0 : _a.label) || '';
                            __classPrivateFieldGet(this, _Ads_skipElement, "f").classList.remove('disabled');
                        }
                        else {
                            __classPrivateFieldGet(this, _Ads_skipElement, "f").textContent =
                                ((_b = __classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.remainingLabel.replace('[[secs]]', remainingTime.toString())) ||
                                    '';
                            __classPrivateFieldGet(this, _Ads_skipElement, "f").classList.add('disabled');
                        }
                    }
                    else {
                        __classPrivateFieldGet(this, _Ads_skipElement, "f").classList.add('hidden');
                    }
                }
                break;
            default:
                break;
        }
        if (event.type === google.ima.AdEvent.Type.LOG) {
            const adData = event.getAdData();
            if (adData.adError) {
                const message = adData.adError.getMessage();
                console.warn(`Ad warning: Non-fatal error occurred: ${message}`);
                const details = {
                    detail: {
                        data: adData.adError,
                        message,
                        type: 'Ads',
                    },
                };
                const errorEvent = addEvent('playererror', details);
                __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(errorEvent);
            }
        }
        else {
            const e = addEvent(`ads${event.type}`);
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
        }
    }
    _error(event) {
        var _a;
        const error = event.getError();
        const details = {
            detail: {
                data: error,
                message: error.toString(),
                type: 'Ads',
            },
        };
        const errorEvent = addEvent('playererror', details);
        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(errorEvent);
        const fatalErrorCodes = [
            100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405, 406, 407, 408, 409, 410, 500, 501, 502, 503,
            900, 901, 1005,
        ];
        if (Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) && __classPrivateFieldGet(this, _Ads_ads, "f").length > 1 && __classPrivateFieldGet(this, _Ads_currentIndex, "f") < __classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
            __classPrivateFieldSet(this, _Ads_currentIndex, (_a = __classPrivateFieldGet(this, _Ads_currentIndex, "f"), _a++, _a), "f");
            this.destroy();
            __classPrivateFieldSet(this, _Ads_started, true, "f");
            __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
            this.load(true);
            console.warn(`Ad warning: ${error.toString()}`);
        }
        else {
            if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
                if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
                    __classPrivateFieldGet(this, _Ads_manager, "f").destroy();
                }
                console.error(`Ad error: ${error.toString()}`);
            }
            else {
                console.warn(`Ad warning: ${error.toString()}`);
            }
            __classPrivateFieldSet(this, _Ads_adEvent, null, "f");
            if (__classPrivateFieldGet(this, _Ads_autostart, "f") === true || __classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true || __classPrivateFieldGet(this, _Ads_started, "f") === true) {
                __classPrivateFieldSet(this, _Ads_active, false, "f");
                this._resumeMedia();
            }
        }
    }
    _loaded(managerLoadedEvent) {
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
        adsRenderingSettings.enablePreloading = __classPrivateFieldGet(this, _Ads_options, "f").enablePreloading;
        __classPrivateFieldSet(this, _Ads_manager, managerLoadedEvent.getAdsManager(__classPrivateFieldGet(this, _Ads_element, "f"), adsRenderingSettings), "f");
        this._start(__classPrivateFieldGet(this, _Ads_manager, "f"));
        this.loadPromise = new Promise((resolve) => {
            resolve();
        });
    }
    _start(manager) {
        if (__classPrivateFieldGet(this, _Ads_customClickContainer, "f") && manager.isCustomClickTrackingUsed()) {
            __classPrivateFieldGet(this, _Ads_customClickContainer, "f").classList.add('op-ads__click-container--visible');
        }
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested, EVENT_OPTIONS);
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested, EVENT_OPTIONS);
        __classPrivateFieldSet(this, _Ads_events, [
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            google.ima.AdEvent.Type.CLICK,
            google.ima.AdEvent.Type.VIDEO_CLICKED,
            google.ima.AdEvent.Type.VIDEO_ICON_CLICKED,
            google.ima.AdEvent.Type.AD_PROGRESS,
            google.ima.AdEvent.Type.AD_BUFFERING,
            google.ima.AdEvent.Type.IMPRESSION,
            google.ima.AdEvent.Type.DURATION_CHANGE,
            google.ima.AdEvent.Type.USER_CLOSE,
            google.ima.AdEvent.Type.LINEAR_CHANGED,
            google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,
            google.ima.AdEvent.Type.AD_METADATA,
            google.ima.AdEvent.Type.INTERACTION,
            google.ima.AdEvent.Type.COMPLETE,
            google.ima.AdEvent.Type.FIRST_QUARTILE,
            google.ima.AdEvent.Type.LOADED,
            google.ima.AdEvent.Type.MIDPOINT,
            google.ima.AdEvent.Type.PAUSED,
            google.ima.AdEvent.Type.RESUMED,
            google.ima.AdEvent.Type.USER_CLOSE,
            google.ima.AdEvent.Type.STARTED,
            google.ima.AdEvent.Type.THIRD_QUARTILE,
            google.ima.AdEvent.Type.SKIPPED,
            google.ima.AdEvent.Type.VOLUME_CHANGED,
            google.ima.AdEvent.Type.VOLUME_MUTED,
            google.ima.AdEvent.Type.LOG,
        ], "f");
        if (!__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
            __classPrivateFieldGet(this, _Ads_events, "f").push(google.ima.AdEvent.Type.AD_BREAK_READY);
        }
        const controls = __classPrivateFieldGet(this, _Ads_player, "f").getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _Ads_container, "f")) {
                __classPrivateFieldGet(this, _Ads_container, "f").addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
            }
        });
        __classPrivateFieldGet(this, _Ads_events, "f").forEach((event) => {
            manager.addEventListener(event, this._assign, EVENT_OPTIONS);
        });
        if (__classPrivateFieldGet(this, _Ads_autostart, "f") === true || __classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true || __classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
            __classPrivateFieldSet(this, _Ads_playTriggered, false, "f");
            if (!__classPrivateFieldGet(this, _Ads_done, "f")) {
                this._initNotDoneAds();
                return;
            }
            manager.init(__classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, __classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, __classPrivateFieldGet(this, _Ads_element, "f").parentElement && __classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true'
                ? google.ima.ViewMode.FULLSCREEN
                : google.ima.ViewMode.NORMAL);
            manager.start();
            const e = addEvent('play');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
        }
        else if (__classPrivateFieldGet(this, _Ads_options, "f").enablePreloading === true) {
            manager.init(__classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, __classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, __classPrivateFieldGet(this, _Ads_element, "f").parentElement && __classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true'
                ? google.ima.ViewMode.FULLSCREEN
                : google.ima.ViewMode.NORMAL);
        }
    }
    _initNotDoneAds() {
        if (__classPrivateFieldGet(this, _Ads_displayContainer, "f")) {
            __classPrivateFieldSet(this, _Ads_done, true, "f");
            __classPrivateFieldGet(this, _Ads_displayContainer, "f").initialize();
            if (IS_IOS || IS_ANDROID) {
                __classPrivateFieldSet(this, _Ads_preloadContent, this._contentLoadedAction, "f");
                __classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._contentLoadedAction, EVENT_OPTIONS);
                __classPrivateFieldGet(this, _Ads_element, "f").load();
            }
            else {
                this._contentLoadedAction();
            }
        }
        else {
            this.load();
            this.loadedAd = false;
        }
    }
    _contentEndedListener() {
        __classPrivateFieldSet(this, _Ads_ended, true, "f");
        __classPrivateFieldSet(this, _Ads_active, false, "f");
        __classPrivateFieldSet(this, _Ads_started, false, "f");
        __classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();
    }
    _onContentPauseRequested() {
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);
        __classPrivateFieldSet(this, _Ads_lastTimePaused, __classPrivateFieldGet(this, _Ads_media, "f").currentTime, "f");
        if (__classPrivateFieldGet(this, _Ads_started, "f")) {
            __classPrivateFieldGet(this, _Ads_media, "f").pause();
        }
        else {
            __classPrivateFieldSet(this, _Ads_started, true, "f");
        }
        const e = addEvent('play');
        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
    }
    _onContentResumeRequested() {
        __classPrivateFieldGet(this, _Ads_element, "f").addEventListener('ended', this._contentEndedListener, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._loadedMetadataHandler, EVENT_OPTIONS);
        if (IS_IOS || IS_ANDROID) {
            __classPrivateFieldGet(this, _Ads_media, "f").src = __classPrivateFieldGet(this, _Ads_mediaSources, "f");
            __classPrivateFieldGet(this, _Ads_media, "f").load();
            this._prepareMedia();
            if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.add('op-ads--active');
            }
        }
        else {
            const event = addEvent('loadedmetadata');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(event);
        }
    }
    _loadedMetadataHandler() {
        var _a;
        if (Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f"))) {
            __classPrivateFieldSet(this, _Ads_currentIndex, (_a = __classPrivateFieldGet(this, _Ads_currentIndex, "f"), _a++, _a), "f");
            if (__classPrivateFieldGet(this, _Ads_currentIndex, "f") <= __classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
                if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
                    __classPrivateFieldGet(this, _Ads_manager, "f").destroy();
                }
                __classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();
                __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
                __classPrivateFieldSet(this, _Ads_started, true, "f");
                __classPrivateFieldSet(this, _Ads_done, false, "f");
                this.load(true);
            }
            else {
                if (!__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else if (__classPrivateFieldGet(this, _Ads_element, "f").seekable.length) {
            if (__classPrivateFieldGet(this, _Ads_element, "f").seekable.end(0) > __classPrivateFieldGet(this, _Ads_lastTimePaused, "f")) {
                if (!__classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else {
            setTimeout(this._loadedMetadataHandler, 100);
        }
    }
    _resumeMedia() {
        __classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");
        __classPrivateFieldSet(this, _Ads_muted, false, "f");
        __classPrivateFieldSet(this, _Ads_started, false, "f");
        __classPrivateFieldSet(this, _Ads_duration, 0, "f");
        __classPrivateFieldSet(this, _Ads_currentTime, 0, "f");
        if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
        }
        if (__classPrivateFieldGet(this, _Ads_media, "f").ended) {
            const e = addEvent('ended');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
        }
        else {
            try {
                __classPrivateFieldGet(this, _Ads_media, "f").play();
                setTimeout(() => {
                    const e = addEvent('play');
                    __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
                }, 50);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    _requestAds() {
        __classPrivateFieldSet(this, _Ads_request, new google.ima.AdsRequest(), "f");
        const ads = Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) ? __classPrivateFieldGet(this, _Ads_ads, "f")[__classPrivateFieldGet(this, _Ads_currentIndex, "f")] : __classPrivateFieldGet(this, _Ads_ads, "f");
        if (isXml(ads)) {
            __classPrivateFieldGet(this, _Ads_request, "f").adsResponse = ads;
        }
        else {
            __classPrivateFieldGet(this, _Ads_request, "f").adTagUrl = ads;
        }
        const width = __classPrivateFieldGet(this, _Ads_element, "f").parentElement ? __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth : 0;
        const height = __classPrivateFieldGet(this, _Ads_element, "f").parentElement ? __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight : 0;
        __classPrivateFieldGet(this, _Ads_request, "f").linearAdSlotWidth = width;
        __classPrivateFieldGet(this, _Ads_request, "f").linearAdSlotHeight = height;
        __classPrivateFieldGet(this, _Ads_request, "f").nonLinearAdSlotWidth = width;
        __classPrivateFieldGet(this, _Ads_request, "f").nonLinearAdSlotHeight = height / 3;
        __classPrivateFieldGet(this, _Ads_request, "f").setAdWillAutoPlay(__classPrivateFieldGet(this, _Ads_autostart, "f"));
        __classPrivateFieldGet(this, _Ads_request, "f").setAdWillPlayMuted(__classPrivateFieldGet(this, _Ads_autostartMuted, "f"));
        __classPrivateFieldGet(this, _Ads_loader, "f").requestAds(__classPrivateFieldGet(this, _Ads_request, "f"));
    }
    _contentLoadedAction() {
        if (__classPrivateFieldGet(this, _Ads_preloadContent, "f")) {
            __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', __classPrivateFieldGet(this, _Ads_preloadContent, "f"));
            __classPrivateFieldSet(this, _Ads_preloadContent, null, "f");
        }
        this._requestAds();
    }
    _resetAdsAfterManualBreak() {
        if (__classPrivateFieldGet(this, _Ads_manager, "f")) {
            __classPrivateFieldGet(this, _Ads_manager, "f").destroy();
        }
        __classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();
        __classPrivateFieldSet(this, _Ads_done, false, "f");
        __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
    }
    _prepareMedia() {
        __classPrivateFieldGet(this, _Ads_media, "f").currentTime = __classPrivateFieldGet(this, _Ads_lastTimePaused, "f");
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._loadedMetadataHandler);
        this._resumeMedia();
    }
    _setMediaVolume(volume) {
        __classPrivateFieldGet(this, _Ads_media, "f").volume = volume;
        __classPrivateFieldGet(this, _Ads_media, "f").muted = volume === 0;
    }
    _handleClickInContainer() {
        if (__classPrivateFieldGet(this, _Ads_media, "f").paused) {
            const e = addEvent('paused');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
            this.pause();
        }
    }
    _handleResizeAds() {
        this.resizeAds();
    }
    _handleSkipAds() {
        __classPrivateFieldGet(this, _Ads_manager, "f").skip();
    }
}
_Ads_ended = new WeakMap(), _Ads_done = new WeakMap(), _Ads_active = new WeakMap(), _Ads_started = new WeakMap(), _Ads_intervalTimer = new WeakMap(), _Ads_volume = new WeakMap(), _Ads_muted = new WeakMap(), _Ads_duration = new WeakMap(), _Ads_currentTime = new WeakMap(), _Ads_manager = new WeakMap(), _Ads_player = new WeakMap(), _Ads_media = new WeakMap(), _Ads_element = new WeakMap(), _Ads_events = new WeakMap(), _Ads_ads = new WeakMap(), _Ads_promise = new WeakMap(), _Ads_loader = new WeakMap(), _Ads_container = new WeakMap(), _Ads_customClickContainer = new WeakMap(), _Ads_skipElement = new WeakMap(), _Ads_displayContainer = new WeakMap(), _Ads_request = new WeakMap(), _Ads_autostart = new WeakMap(), _Ads_autostartMuted = new WeakMap(), _Ads_playTriggered = new WeakMap(), _Ads_options = new WeakMap(), _Ads_currentIndex = new WeakMap(), _Ads_originalVolume = new WeakMap(), _Ads_preloadContent = new WeakMap(), _Ads_lastTimePaused = new WeakMap(), _Ads_mediaSources = new WeakMap(), _Ads_mediaStarted = new WeakMap(), _Ads_adEvent = new WeakMap();
export default Ads;
