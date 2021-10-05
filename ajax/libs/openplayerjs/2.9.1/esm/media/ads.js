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
var _Ads_adsEnded, _Ads_adsDone, _Ads_adsActive, _Ads_adsStarted, _Ads_intervalTimer, _Ads_adsVolume, _Ads_adsMuted, _Ads_adsDuration, _Ads_adsCurrentTime, _Ads_adsManager, _Ads_player, _Ads_media, _Ads_element, _Ads_events, _Ads_ads, _Ads_promise, _Ads_adsLoader, _Ads_adsContainer, _Ads_adsCustomClickContainer, _Ads_adDisplayContainer, _Ads_adsRequest, _Ads_autoStart, _Ads_autoStartMuted, _Ads_playTriggered, _Ads_adsOptions, _Ads_currentAdsIndex, _Ads_originalVolume, _Ads_preloadContent, _Ads_lastTimePaused, _Ads_mediaSources, _Ads_mediaStarted;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isVideo, isXml, loadScript, removeElement } from '../utils/general';
class Ads {
    constructor(player, ads, autoStart, autoStartMuted, options) {
        _Ads_adsEnded.set(this, false);
        _Ads_adsDone.set(this, false);
        _Ads_adsActive.set(this, false);
        _Ads_adsStarted.set(this, false);
        _Ads_intervalTimer.set(this, 0);
        _Ads_adsVolume.set(this, void 0);
        _Ads_adsMuted.set(this, false);
        _Ads_adsDuration.set(this, 0);
        _Ads_adsCurrentTime.set(this, 0);
        _Ads_adsManager.set(this, null);
        _Ads_player.set(this, void 0);
        _Ads_media.set(this, void 0);
        _Ads_element.set(this, void 0);
        _Ads_events.set(this, []);
        _Ads_ads.set(this, void 0);
        _Ads_promise.set(this, void 0);
        _Ads_adsLoader.set(this, void 0);
        _Ads_adsContainer.set(this, void 0);
        _Ads_adsCustomClickContainer.set(this, void 0);
        _Ads_adDisplayContainer.set(this, void 0);
        _Ads_adsRequest.set(this, void 0);
        _Ads_autoStart.set(this, false);
        _Ads_autoStartMuted.set(this, false);
        _Ads_playTriggered.set(this, false);
        _Ads_adsOptions.set(this, void 0);
        _Ads_currentAdsIndex.set(this, 0);
        _Ads_originalVolume.set(this, void 0);
        _Ads_preloadContent.set(this, void 0);
        _Ads_lastTimePaused.set(this, 0);
        _Ads_mediaSources.set(this, []);
        _Ads_mediaStarted.set(this, false);
        this.loadedAd = false;
        const defaultOpts = {
            autoPlayAdBreaks: true,
            customClick: {
                enabled: false,
                label: 'Click here for more info',
            },
            debug: false,
            enablePreloading: false,
            language: 'en',
            loop: false,
            numRedirects: 4,
            publisherId: null,
            sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            sessionId: null,
            src: [],
            vpaidMode: 'enabled',
        };
        __classPrivateFieldSet(this, _Ads_player, player, "f");
        __classPrivateFieldSet(this, _Ads_ads, ads, "f");
        __classPrivateFieldSet(this, _Ads_media, player.getMedia(), "f");
        __classPrivateFieldSet(this, _Ads_element, player.getElement(), "f");
        __classPrivateFieldSet(this, _Ads_autoStart, autoStart || false, "f");
        __classPrivateFieldSet(this, _Ads_adsMuted, player.getElement().muted, "f");
        __classPrivateFieldSet(this, _Ads_autoStartMuted, autoStartMuted || false, "f");
        __classPrivateFieldSet(this, _Ads_adsOptions, Object.assign(Object.assign({}, defaultOpts), options), "f");
        if (options) {
            const objectElements = ['customClick'];
            objectElements.forEach(item => {
                __classPrivateFieldGet(this, _Ads_adsOptions, "f")[item] = options[item] && Object.keys(options[item]).length
                    ? Object.assign(Object.assign({}, defaultOpts[item]), options[item]) : defaultOpts[item];
            });
        }
        __classPrivateFieldSet(this, _Ads_playTriggered, false, "f");
        __classPrivateFieldSet(this, _Ads_originalVolume, __classPrivateFieldGet(this, _Ads_element, "f").volume, "f");
        __classPrivateFieldSet(this, _Ads_adsVolume, __classPrivateFieldGet(this, _Ads_originalVolume, "f"), "f");
        const path = __classPrivateFieldGet(this, _Ads_adsOptions, "f").debug && __classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath
            ? __classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath.replace(/(\.js$)/, '_debug.js')
            : __classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath;
        this._handleClickInContainer = this._handleClickInContainer.bind(this);
        this.load = this.load.bind(this);
        this._loaded = this._loaded.bind(this);
        this._error = this._error.bind(this);
        this._assign = this._assign.bind(this);
        this._contentLoadedAction = this._contentLoadedAction.bind(this);
        this._loadedMetadataHandler = this._loadedMetadataHandler.bind(this);
        this._contentEndedListener = this._contentEndedListener.bind(this);
        this.resizeAds = this.resizeAds.bind(this);
        this._handleResizeAds = this._handleResizeAds.bind(this);
        this._onContentPauseRequested = this._onContentPauseRequested.bind(this);
        this._onContentResumeRequested = this._onContentResumeRequested.bind(this);
        __classPrivateFieldSet(this, _Ads_promise, path && (typeof google === 'undefined' || typeof google.ima === 'undefined')
            ? loadScript(path)
            : new Promise(resolve => {
                resolve({});
            }), "f");
        __classPrivateFieldGet(this, _Ads_promise, "f").then(this.load).catch(error => {
            let message = 'Ad script could not be loaded; please check if you have an AdBlock';
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
        return this;
    }
    load(force = false) {
        if (this.loadedAd) {
            return;
        }
        if (!google && !google.ima && !__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks && !force) {
            return;
        }
        this.loadedAd = true;
        const existingContainer = __classPrivateFieldGet(this, _Ads_player, "f").getContainer().querySelector('.op-ads');
        if (existingContainer && existingContainer.parentNode) {
            existingContainer.parentNode.removeChild(existingContainer);
        }
        __classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
        __classPrivateFieldSet(this, _Ads_adsContainer, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Ads_adsContainer, "f").className = 'op-ads';
        __classPrivateFieldGet(this, _Ads_adsContainer, "f").tabIndex = -1;
        if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
            __classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Ads_adsContainer, "f"), __classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
        }
        __classPrivateFieldGet(this, _Ads_adsContainer, "f").addEventListener('click', this._handleClickInContainer);
        if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.enabled) {
            __classPrivateFieldSet(this, _Ads_adsCustomClickContainer, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").className = 'op-ads__click-container';
            __classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").innerHTML = `<div class="op-ads__click-label">${__classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.label}</div>`;
            if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
                __classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f"), __classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
            }
        }
        __classPrivateFieldSet(this, _Ads_mediaSources, __classPrivateFieldGet(this, _Ads_media, "f").src, "f");
        const vpaidModeMap = {
            disabled: google.ima.ImaSdkSettings.VpaidMode.DISABLED,
            enabled: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
            insecure: google.ima.ImaSdkSettings.VpaidMode.INSECURE,
        };
        google.ima.settings.setVpaidMode(vpaidModeMap[__classPrivateFieldGet(this, _Ads_adsOptions, "f").vpaidMode]);
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
        google.ima.settings.setAutoPlayAdBreaks(__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks);
        google.ima.settings.setNumRedirects(__classPrivateFieldGet(this, _Ads_adsOptions, "f").numRedirects);
        google.ima.settings.setLocale(__classPrivateFieldGet(this, _Ads_adsOptions, "f").language);
        if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").sessionId) {
            google.ima.settings.setSessionId(__classPrivateFieldGet(this, _Ads_adsOptions, "f").sessionId);
        }
        if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").publisherId) {
            google.ima.settings.setPpid(__classPrivateFieldGet(this, _Ads_adsOptions, "f").publisherId);
        }
        google.ima.settings.setPlayerType('openplayerjs');
        google.ima.settings.setPlayerVersion('2.9.1');
        __classPrivateFieldSet(this, _Ads_adDisplayContainer, new google.ima.AdDisplayContainer(__classPrivateFieldGet(this, _Ads_adsContainer, "f"), __classPrivateFieldGet(this, _Ads_element, "f"), __classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f")), "f");
        __classPrivateFieldSet(this, _Ads_adsLoader, new google.ima.AdsLoader(__classPrivateFieldGet(this, _Ads_adDisplayContainer, "f")), "f");
        __classPrivateFieldGet(this, _Ads_adsLoader, "f").addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Ads_adsLoader, "f").addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this._handleResizeAds, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._handleResizeAds, EVENT_OPTIONS);
        if (__classPrivateFieldGet(this, _Ads_autoStart, "f") === true
            || __classPrivateFieldGet(this, _Ads_autoStartMuted, "f") === true
            || force === true
            || __classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading === true
            || __classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
            if (!__classPrivateFieldGet(this, _Ads_adsDone, "f")) {
                __classPrivateFieldSet(this, _Ads_adsDone, true, "f");
                __classPrivateFieldGet(this, _Ads_adDisplayContainer, "f").initialize();
            }
            this._requestAds();
        }
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Ads_adsDone, "f")) {
                __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
                yield this.loadPromise;
                return;
            }
            if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
                try {
                    if (!__classPrivateFieldGet(this, _Ads_intervalTimer, "f") && __classPrivateFieldGet(this, _Ads_adsActive, "f") === false) {
                        __classPrivateFieldGet(this, _Ads_adsManager, "f").start();
                    }
                    else {
                        __classPrivateFieldGet(this, _Ads_adsManager, "f").resume();
                    }
                    __classPrivateFieldSet(this, _Ads_adsActive, true, "f");
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
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            __classPrivateFieldSet(this, _Ads_adsActive, false, "f");
            __classPrivateFieldGet(this, _Ads_adsManager, "f").pause();
            const e = addEvent('pause');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
        }
    }
    destroy() {
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            __classPrivateFieldGet(this, _Ads_adsManager, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);
            if (__classPrivateFieldGet(this, _Ads_events, "f")) {
                __classPrivateFieldGet(this, _Ads_events, "f").forEach(event => {
                    __classPrivateFieldGet(this, _Ads_adsManager, "f").removeEventListener(event, this._assign);
                });
            }
        }
        __classPrivateFieldSet(this, _Ads_events, [], "f");
        const controls = __classPrivateFieldGet(this, _Ads_player, "f").getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _Ads_adsContainer, "f")) {
                __classPrivateFieldGet(this, _Ads_adsContainer, "f").removeEventListener(event, mouseEvents[event]);
            }
        });
        if (__classPrivateFieldGet(this, _Ads_adsLoader, "f")) {
            __classPrivateFieldGet(this, _Ads_adsLoader, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);
            __classPrivateFieldGet(this, _Ads_adsLoader, "f").removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded);
        }
        const destroy = !Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) || __classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") > __classPrivateFieldGet(this, _Ads_ads, "f").length;
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f") && destroy) {
            __classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
        }
        if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.enabled) {
            removeElement(__classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f"));
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
        if (__classPrivateFieldGet(this, _Ads_adsContainer, "f")) {
            __classPrivateFieldGet(this, _Ads_adsContainer, "f").removeEventListener('click', this._handleClickInContainer);
        }
        removeElement(__classPrivateFieldGet(this, _Ads_adsContainer, "f"));
    }
    resizeAds(width, height) {
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            const target = __classPrivateFieldGet(this, _Ads_element, "f");
            const mode = target.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
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
                    __classPrivateFieldGet(this, _Ads_adsManager, "f").resize(formattedWidth || target.offsetWidth, formattedHeight || target.offsetHeight, mode);
                });
            }
        }
    }
    getAdsManager() {
        return __classPrivateFieldGet(this, _Ads_adsManager, "f");
    }
    started() {
        return __classPrivateFieldGet(this, _Ads_adsStarted, "f");
    }
    set src(source) {
        __classPrivateFieldSet(this, _Ads_ads, source, "f");
    }
    set isDone(value) {
        __classPrivateFieldSet(this, _Ads_adsDone, value, "f");
    }
    set playRequested(value) {
        __classPrivateFieldSet(this, _Ads_playTriggered, value, "f");
    }
    set volume(value) {
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            __classPrivateFieldSet(this, _Ads_adsVolume, value, "f");
            __classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(value);
            this._setMediaVolume(value);
            __classPrivateFieldSet(this, _Ads_adsMuted, value === 0, "f");
        }
    }
    get volume() {
        return __classPrivateFieldGet(this, _Ads_adsManager, "f") ? __classPrivateFieldGet(this, _Ads_adsManager, "f").getVolume() : __classPrivateFieldGet(this, _Ads_originalVolume, "f");
    }
    set muted(value) {
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            if (value) {
                __classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(0);
                __classPrivateFieldSet(this, _Ads_adsMuted, true, "f");
                this._setMediaVolume(0);
            }
            else {
                __classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(__classPrivateFieldGet(this, _Ads_adsVolume, "f"));
                __classPrivateFieldSet(this, _Ads_adsMuted, false, "f");
                this._setMediaVolume(__classPrivateFieldGet(this, _Ads_adsVolume, "f"));
            }
        }
    }
    get muted() {
        return __classPrivateFieldGet(this, _Ads_adsMuted, "f");
    }
    set currentTime(value) {
        __classPrivateFieldSet(this, _Ads_adsCurrentTime, value, "f");
    }
    get currentTime() {
        return __classPrivateFieldGet(this, _Ads_adsCurrentTime, "f");
    }
    get duration() {
        return __classPrivateFieldGet(this, _Ads_adsDuration, "f");
    }
    get paused() {
        return !__classPrivateFieldGet(this, _Ads_adsActive, "f");
    }
    get ended() {
        return __classPrivateFieldGet(this, _Ads_adsEnded, "f");
    }
    _assign(event) {
        const ad = event.getAd();
        switch (event.type) {
            case google.ima.AdEvent.Type.LOADED:
                if (!ad.isLinear()) {
                    this._onContentResumeRequested();
                }
                else {
                    if (IS_IPHONE && isVideo(__classPrivateFieldGet(this, _Ads_element, "f"))) {
                        __classPrivateFieldGet(this, _Ads_element, "f").controls = false;
                    }
                    __classPrivateFieldSet(this, _Ads_adsDuration, ad.getDuration(), "f");
                    __classPrivateFieldSet(this, _Ads_adsCurrentTime, ad.getDuration(), "f");
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
                    if (__classPrivateFieldGet(this, _Ads_element, "f").parentElement && !__classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.contains('op-ads--active')) {
                        __classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.add('op-ads--active');
                    }
                    if (!__classPrivateFieldGet(this, _Ads_media, "f").paused) {
                        __classPrivateFieldGet(this, _Ads_media, "f").pause();
                    }
                    __classPrivateFieldSet(this, _Ads_adsActive, true, "f");
                    const playEvent = addEvent('play');
                    __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(playEvent);
                    let resized;
                    if (!resized) {
                        this.resizeAds();
                        resized = true;
                    }
                    if (__classPrivateFieldGet(this, _Ads_media, "f").ended) {
                        __classPrivateFieldSet(this, _Ads_adsEnded, false, "f");
                        const endEvent = addEvent('adsmediaended');
                        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endEvent);
                    }
                    if (typeof window !== 'undefined') {
                        __classPrivateFieldSet(this, _Ads_intervalTimer, window.setInterval(() => {
                            if (__classPrivateFieldGet(this, _Ads_adsActive, "f") === true) {
                                __classPrivateFieldSet(this, _Ads_adsCurrentTime, Math.round(__classPrivateFieldGet(this, _Ads_adsManager, "f").getRemainingTime()), "f");
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
                    __classPrivateFieldSet(this, _Ads_adsActive, false, "f");
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
                    __classPrivateFieldSet(this, _Ads_adsActive, false, "f");
                    __classPrivateFieldSet(this, _Ads_adsEnded, true, "f");
                    __classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");
                    __classPrivateFieldSet(this, _Ads_adsMuted, false, "f");
                    __classPrivateFieldSet(this, _Ads_adsStarted, false, "f");
                    __classPrivateFieldSet(this, _Ads_adsDuration, 0, "f");
                    __classPrivateFieldSet(this, _Ads_adsCurrentTime, 0, "f");
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
                if (!__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
                    this.play();
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
            100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405, 406, 407, 408, 409, 410, 500, 501, 502, 503, 900, 901, 1005,
        ];
        if (Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) && __classPrivateFieldGet(this, _Ads_ads, "f").length > 1 && __classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") < __classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
            __classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = __classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");
            __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
            __classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
            __classPrivateFieldSet(this, _Ads_adsDone, false, "f");
            this.destroy();
            this.loadedAd = false;
            this.load(true);
            console.warn(`Ad warning: ${error.toString()}`);
        }
        else {
            if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
                if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
                    __classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
                }
                console.error(`Ad error: ${error.toString()}`);
            }
            else {
                console.warn(`Ad warning: ${error.toString()}`);
            }
            if (__classPrivateFieldGet(this, _Ads_autoStart, "f") === true || __classPrivateFieldGet(this, _Ads_autoStartMuted, "f") === true || __classPrivateFieldGet(this, _Ads_adsStarted, "f") === true) {
                __classPrivateFieldSet(this, _Ads_adsActive, false, "f");
                this._resumeMedia();
            }
        }
    }
    _loaded(adsManagerLoadedEvent) {
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
        adsRenderingSettings.enablePreloading = __classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading;
        __classPrivateFieldSet(this, _Ads_adsManager, adsManagerLoadedEvent.getAdsManager(__classPrivateFieldGet(this, _Ads_element, "f"), adsRenderingSettings), "f");
        this._start(__classPrivateFieldGet(this, _Ads_adsManager, "f"));
        this.loadPromise = new Promise(resolve => resolve);
    }
    _start(manager) {
        if (__classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f") && manager.isCustomClickTrackingUsed()) {
            __classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").classList.add('op-ads__click-container--visible');
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
        if (!__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
            __classPrivateFieldGet(this, _Ads_events, "f").push(google.ima.AdEvent.Type.AD_BREAK_READY);
        }
        const controls = __classPrivateFieldGet(this, _Ads_player, "f").getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _Ads_adsContainer, "f")) {
                __classPrivateFieldGet(this, _Ads_adsContainer, "f").addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
            }
        });
        __classPrivateFieldGet(this, _Ads_events, "f").forEach(event => {
            manager.addEventListener(event, this._assign, EVENT_OPTIONS);
        });
        manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);
        if (__classPrivateFieldGet(this, _Ads_autoStart, "f") === true || __classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
            __classPrivateFieldSet(this, _Ads_playTriggered, false, "f");
            if (!__classPrivateFieldGet(this, _Ads_adsDone, "f")) {
                this._initNotDoneAds();
                return;
            }
            manager.init(__classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, __classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, __classPrivateFieldGet(this, _Ads_element, "f").parentElement && __classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true'
                ? google.ima.ViewMode.FULLSCREEN
                : google.ima.ViewMode.NORMAL);
            manager.start();
            const e = addEvent('play');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
            const event = addEvent('playing');
            __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(event);
        }
        else if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading === true) {
            manager.init(__classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, __classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, __classPrivateFieldGet(this, _Ads_element, "f").parentElement && __classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true'
                ? google.ima.ViewMode.FULLSCREEN
                : google.ima.ViewMode.NORMAL);
        }
    }
    _initNotDoneAds() {
        __classPrivateFieldSet(this, _Ads_adsDone, true, "f");
        if (__classPrivateFieldGet(this, _Ads_adDisplayContainer, "f")) {
            __classPrivateFieldGet(this, _Ads_adDisplayContainer, "f").initialize();
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
        __classPrivateFieldSet(this, _Ads_adsEnded, true, "f");
        __classPrivateFieldSet(this, _Ads_adsActive, false, "f");
        __classPrivateFieldSet(this, _Ads_adsStarted, false, "f");
        __classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();
    }
    _onContentPauseRequested() {
        __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);
        __classPrivateFieldSet(this, _Ads_lastTimePaused, __classPrivateFieldGet(this, _Ads_media, "f").currentTime, "f");
        if (__classPrivateFieldGet(this, _Ads_adsStarted, "f")) {
            __classPrivateFieldGet(this, _Ads_media, "f").pause();
        }
        else {
            __classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
        }
        const e = addEvent('play');
        __classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
    }
    _onContentResumeRequested() {
        var _a;
        if (__classPrivateFieldGet(this, _Ads_adsOptions, "f").loop) {
            if (Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f"))) {
                if (__classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") === __classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
                    __classPrivateFieldSet(this, _Ads_currentAdsIndex, 0, "f");
                }
                else {
                    __classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = __classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");
                }
            }
            this.destroy();
            __classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();
            __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
            __classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
            __classPrivateFieldSet(this, _Ads_adsDone, false, "f");
            this.loadedAd = false;
            this.load(true);
        }
        else {
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
    }
    _loadedMetadataHandler() {
        var _a;
        if (Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f"))) {
            __classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = __classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");
            if (__classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") <= __classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
                if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
                    __classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
                }
                __classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();
                __classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
                __classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
                __classPrivateFieldSet(this, _Ads_adsDone, false, "f");
                this._requestAds();
            }
            else {
                if (!__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else if (__classPrivateFieldGet(this, _Ads_element, "f").seekable.length) {
            if (__classPrivateFieldGet(this, _Ads_element, "f").seekable.end(0) > __classPrivateFieldGet(this, _Ads_lastTimePaused, "f")) {
                if (!__classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
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
        __classPrivateFieldSet(this, _Ads_adsMuted, false, "f");
        __classPrivateFieldSet(this, _Ads_adsStarted, false, "f");
        __classPrivateFieldSet(this, _Ads_adsDuration, 0, "f");
        __classPrivateFieldSet(this, _Ads_adsCurrentTime, 0, "f");
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
            catch (err) { }
        }
    }
    _requestAds() {
        __classPrivateFieldSet(this, _Ads_adsRequest, new google.ima.AdsRequest(), "f");
        const ads = Array.isArray(__classPrivateFieldGet(this, _Ads_ads, "f")) ? __classPrivateFieldGet(this, _Ads_ads, "f")[__classPrivateFieldGet(this, _Ads_currentAdsIndex, "f")] : __classPrivateFieldGet(this, _Ads_ads, "f");
        if (isXml(ads)) {
            __classPrivateFieldGet(this, _Ads_adsRequest, "f").adsResponse = ads;
        }
        else {
            __classPrivateFieldGet(this, _Ads_adsRequest, "f").adTagUrl = ads;
        }
        const width = __classPrivateFieldGet(this, _Ads_element, "f").parentElement ? __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth : 0;
        const height = __classPrivateFieldGet(this, _Ads_element, "f").parentElement ? __classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight : 0;
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").linearAdSlotWidth = width;
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").linearAdSlotHeight = height;
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").nonLinearAdSlotWidth = width;
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").nonLinearAdSlotHeight = height / 3;
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").setAdWillAutoPlay(__classPrivateFieldGet(this, _Ads_autoStart, "f"));
        __classPrivateFieldGet(this, _Ads_adsRequest, "f").setAdWillPlayMuted(__classPrivateFieldGet(this, _Ads_autoStartMuted, "f"));
        __classPrivateFieldGet(this, _Ads_adsLoader, "f").requestAds(__classPrivateFieldGet(this, _Ads_adsRequest, "f"));
    }
    _contentLoadedAction() {
        if (__classPrivateFieldGet(this, _Ads_preloadContent, "f")) {
            __classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', __classPrivateFieldGet(this, _Ads_preloadContent, "f"));
            __classPrivateFieldSet(this, _Ads_preloadContent, null, "f");
        }
        this._requestAds();
    }
    _resetAdsAfterManualBreak() {
        if (__classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            __classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
        }
        __classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();
        __classPrivateFieldSet(this, _Ads_adsDone, false, "f");
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
}
_Ads_adsEnded = new WeakMap(), _Ads_adsDone = new WeakMap(), _Ads_adsActive = new WeakMap(), _Ads_adsStarted = new WeakMap(), _Ads_intervalTimer = new WeakMap(), _Ads_adsVolume = new WeakMap(), _Ads_adsMuted = new WeakMap(), _Ads_adsDuration = new WeakMap(), _Ads_adsCurrentTime = new WeakMap(), _Ads_adsManager = new WeakMap(), _Ads_player = new WeakMap(), _Ads_media = new WeakMap(), _Ads_element = new WeakMap(), _Ads_events = new WeakMap(), _Ads_ads = new WeakMap(), _Ads_promise = new WeakMap(), _Ads_adsLoader = new WeakMap(), _Ads_adsContainer = new WeakMap(), _Ads_adsCustomClickContainer = new WeakMap(), _Ads_adDisplayContainer = new WeakMap(), _Ads_adsRequest = new WeakMap(), _Ads_autoStart = new WeakMap(), _Ads_autoStartMuted = new WeakMap(), _Ads_playTriggered = new WeakMap(), _Ads_adsOptions = new WeakMap(), _Ads_currentAdsIndex = new WeakMap(), _Ads_originalVolume = new WeakMap(), _Ads_preloadContent = new WeakMap(), _Ads_lastTimePaused = new WeakMap(), _Ads_mediaSources = new WeakMap(), _Ads_mediaStarted = new WeakMap();
export default Ads;
