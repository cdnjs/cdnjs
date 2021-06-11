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
var _adsEnded, _adsDone, _adsActive, _adsStarted, _intervalTimer, _adsVolume, _adsMuted, _adsDuration, _adsCurrentTime, _adsManager, _player, _media, _element, _events, _ads, _promise, _adsLoader, _adsContainer, _adDisplayContainer, _adsRequest, _autoStart, _autoStartMuted, _playTriggered, _adsOptions, _currentAdsIndex, _originalVolume, _preloadContent, _lastTimePaused, _mediaSources, _mediaStarted;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isVideo, isXml, loadScript, removeElement } from '../utils/general';
class Ads {
    constructor(player, ads, autoStart, autoStartMuted, options) {
        _adsEnded.set(this, false);
        _adsDone.set(this, false);
        _adsActive.set(this, false);
        _adsStarted.set(this, false);
        _intervalTimer.set(this, 0);
        _adsVolume.set(this, void 0);
        _adsMuted.set(this, false);
        _adsDuration.set(this, 0);
        _adsCurrentTime.set(this, 0);
        _adsManager.set(this, null);
        _player.set(this, void 0);
        _media.set(this, void 0);
        _element.set(this, void 0);
        _events.set(this, []);
        _ads.set(this, void 0);
        _promise.set(this, void 0);
        _adsLoader.set(this, void 0);
        _adsContainer.set(this, void 0);
        _adDisplayContainer.set(this, void 0);
        _adsRequest.set(this, void 0);
        _autoStart.set(this, false);
        _autoStartMuted.set(this, false);
        _playTriggered.set(this, false);
        _adsOptions.set(this, void 0);
        _currentAdsIndex.set(this, 0);
        _originalVolume.set(this, void 0);
        _preloadContent.set(this, void 0);
        _lastTimePaused.set(this, 0);
        _mediaSources.set(this, []);
        _mediaStarted.set(this, false);
        const defaultOpts = {
            autoPlayAdBreaks: true,
            debug: false,
            enablePreloading: false,
            language: 'en',
            loop: false,
            numRedirects: 4,
            sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            src: [],
        };
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _ads, ads);
        __classPrivateFieldSet(this, _media, player.getMedia());
        __classPrivateFieldSet(this, _element, player.getElement());
        __classPrivateFieldSet(this, _autoStart, autoStart || false);
        __classPrivateFieldSet(this, _autoStartMuted, autoStartMuted || false);
        __classPrivateFieldSet(this, _adsOptions, Object.assign(Object.assign({}, defaultOpts), options));
        __classPrivateFieldSet(this, _playTriggered, false);
        __classPrivateFieldSet(this, _originalVolume, __classPrivateFieldGet(this, _element).volume);
        __classPrivateFieldSet(this, _adsVolume, __classPrivateFieldGet(this, _originalVolume));
        const path = __classPrivateFieldGet(this, _adsOptions).debug ? __classPrivateFieldGet(this, _adsOptions).sdkPath.replace(/(\.js$)/, '_debug.js') : __classPrivateFieldGet(this, _adsOptions).sdkPath;
        __classPrivateFieldSet(this, _promise, (typeof google === 'undefined' || typeof google.ima === 'undefined') ?
            loadScript(path) : new Promise(resolve => {
            resolve({});
        }));
        __classPrivateFieldGet(this, _promise).then(() => {
            this.load();
        });
        return this;
    }
    load(force = false) {
        if (!__classPrivateFieldGet(this, _adsOptions).autoPlayAdBreaks && !force) {
            return;
        }
        const existingContainer = __classPrivateFieldGet(this, _player).getContainer().querySelector('.op-ads');
        if (existingContainer && existingContainer.parentNode) {
            existingContainer.parentNode.removeChild(existingContainer);
        }
        __classPrivateFieldSet(this, _adsStarted, true);
        __classPrivateFieldSet(this, _adsContainer, document.createElement('div'));
        __classPrivateFieldGet(this, _adsContainer).className = 'op-ads';
        __classPrivateFieldGet(this, _adsContainer).tabIndex = -1;
        if (__classPrivateFieldGet(this, _element).parentElement) {
            __classPrivateFieldGet(this, _element).parentElement.insertBefore(__classPrivateFieldGet(this, _adsContainer), __classPrivateFieldGet(this, _element).nextSibling);
        }
        __classPrivateFieldSet(this, _mediaSources, __classPrivateFieldGet(this, _media).src);
        google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
        google.ima.settings.setAutoPlayAdBreaks(__classPrivateFieldGet(this, _adsOptions).autoPlayAdBreaks);
        google.ima.settings.setNumRedirects(__classPrivateFieldGet(this, _adsOptions).numRedirects);
        google.ima.settings.setLocale(__classPrivateFieldGet(this, _adsOptions).language);
        __classPrivateFieldSet(this, _adDisplayContainer, new google.ima.AdDisplayContainer(__classPrivateFieldGet(this, _adsContainer), __classPrivateFieldGet(this, _element)));
        __classPrivateFieldSet(this, _adsLoader, new google.ima.AdsLoader(__classPrivateFieldGet(this, _adDisplayContainer)));
        __classPrivateFieldGet(this, _adsLoader).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _adsLoader).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this), EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => {
                this.resizeAds();
            }, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _element).addEventListener('loadedmetadata', () => {
            this.resizeAds();
        }, EVENT_OPTIONS);
        if (__classPrivateFieldGet(this, _autoStart) === true || __classPrivateFieldGet(this, _autoStartMuted) === true || force === true || __classPrivateFieldGet(this, _adsOptions).enablePreloading === true) {
            if (!__classPrivateFieldGet(this, _adsDone)) {
                __classPrivateFieldSet(this, _adsDone, true);
                __classPrivateFieldGet(this, _adDisplayContainer).initialize();
            }
            this._requestAds();
        }
    }
    play() {
        const play = () => {
            if (!__classPrivateFieldGet(this, _adsDone)) {
                this._initNotDoneAds();
                return;
            }
            if (__classPrivateFieldGet(this, _adsManager)) {
                if (!__classPrivateFieldGet(this, _intervalTimer) && __classPrivateFieldGet(this, _adsActive) === false) {
                    __classPrivateFieldGet(this, _adsManager).start();
                }
                else {
                    __classPrivateFieldGet(this, _adsManager).resume();
                }
                __classPrivateFieldSet(this, _adsActive, true);
                const e = addEvent('play');
                __classPrivateFieldGet(this, _element).dispatchEvent(e);
            }
        };
        return new Promise(resolve => {
            resolve({});
        }).then(play);
    }
    pause() {
        if (__classPrivateFieldGet(this, _adsManager)) {
            __classPrivateFieldSet(this, _adsActive, false);
            __classPrivateFieldGet(this, _adsManager).pause();
            const e = addEvent('pause');
            __classPrivateFieldGet(this, _element).dispatchEvent(e);
        }
    }
    destroy() {
        if (__classPrivateFieldGet(this, _events)) {
            __classPrivateFieldGet(this, _events).forEach(event => {
                __classPrivateFieldGet(this, _adsManager).removeEventListener(event, this._assign.bind(this));
            });
        }
        __classPrivateFieldSet(this, _events, []);
        const controls = __classPrivateFieldGet(this, _player).getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _adsContainer)) {
                __classPrivateFieldGet(this, _adsContainer).removeEventListener(event, mouseEvents[event]);
            }
        });
        if (__classPrivateFieldGet(this, _adsLoader)) {
            __classPrivateFieldGet(this, _adsLoader).removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this));
            __classPrivateFieldGet(this, _adsLoader).removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this));
        }
        const destroy = !Array.isArray(__classPrivateFieldGet(this, _ads)) || __classPrivateFieldGet(this, _currentAdsIndex) > __classPrivateFieldGet(this, _ads).length;
        if (__classPrivateFieldGet(this, _adsManager) && destroy) {
            __classPrivateFieldGet(this, _adsManager).destroy();
        }
        if (IS_IOS || IS_ANDROID) {
            __classPrivateFieldGet(this, _element).removeEventListener('loadedmetadata', this._contentLoadedAction.bind(this));
        }
        __classPrivateFieldGet(this, _element).removeEventListener('loadedmetadata', () => { this.resizeAds.bind(this); });
        __classPrivateFieldGet(this, _element).removeEventListener('ended', this._contentEndedListener.bind(this));
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', () => { this.resizeAds.bind(this); });
        }
        removeElement(__classPrivateFieldGet(this, _adsContainer));
    }
    resizeAds(width, height) {
        if (__classPrivateFieldGet(this, _adsManager)) {
            const target = __classPrivateFieldGet(this, _element);
            const mode = target.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    __classPrivateFieldGet(this, _adsManager).resize(width || target.offsetWidth, height || target.offsetHeight, mode);
                });
            }
        }
    }
    getAdsManager() {
        return __classPrivateFieldGet(this, _adsManager);
    }
    started() {
        return __classPrivateFieldGet(this, _adsStarted);
    }
    set playRequested(value) {
        __classPrivateFieldSet(this, _playTriggered, value);
    }
    set volume(value) {
        if (__classPrivateFieldGet(this, _adsManager)) {
            __classPrivateFieldSet(this, _adsVolume, value);
            __classPrivateFieldGet(this, _adsManager).setVolume(value);
            this._setMediaVolume(value);
            __classPrivateFieldSet(this, _adsMuted, (value === 0));
        }
    }
    get volume() {
        return __classPrivateFieldGet(this, _adsManager) ? __classPrivateFieldGet(this, _adsManager).getVolume() : __classPrivateFieldGet(this, _originalVolume);
    }
    set muted(value) {
        if (__classPrivateFieldGet(this, _adsManager)) {
            if (value) {
                __classPrivateFieldGet(this, _adsManager).setVolume(0);
                __classPrivateFieldSet(this, _adsMuted, true);
                this._setMediaVolume(0);
            }
            else {
                __classPrivateFieldGet(this, _adsManager).setVolume(__classPrivateFieldGet(this, _adsVolume));
                __classPrivateFieldSet(this, _adsMuted, false);
                this._setMediaVolume(__classPrivateFieldGet(this, _adsVolume));
            }
        }
    }
    get muted() {
        return __classPrivateFieldGet(this, _adsMuted);
    }
    set currentTime(value) {
        __classPrivateFieldSet(this, _adsCurrentTime, value);
    }
    get currentTime() {
        return __classPrivateFieldGet(this, _adsCurrentTime);
    }
    get duration() {
        return __classPrivateFieldGet(this, _adsDuration);
    }
    get paused() {
        return !__classPrivateFieldGet(this, _adsActive);
    }
    get ended() {
        return __classPrivateFieldGet(this, _adsEnded);
    }
    _assign(event) {
        const ad = event.getAd();
        switch (event.type) {
            case google.ima.AdEvent.Type.LOADED:
                if (!ad.isLinear()) {
                    this._onContentResumeRequested();
                }
                else {
                    if (IS_IPHONE && isVideo(__classPrivateFieldGet(this, _element))) {
                        __classPrivateFieldGet(this, _element).controls = false;
                    }
                    __classPrivateFieldSet(this, _adsDuration, ad.getDuration());
                    __classPrivateFieldSet(this, _adsCurrentTime, ad.getDuration());
                    if (!__classPrivateFieldGet(this, _mediaStarted) && !IS_IOS && !IS_ANDROID) {
                        const waitingEvent = addEvent('waiting');
                        __classPrivateFieldGet(this, _element).dispatchEvent(waitingEvent);
                        const loadedEvent = addEvent('loadedmetadata');
                        __classPrivateFieldGet(this, _element).dispatchEvent(loadedEvent);
                        this.resizeAds();
                    }
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                if (ad.isLinear()) {
                    if (__classPrivateFieldGet(this, _element).parentElement && !__classPrivateFieldGet(this, _element).parentElement.classList.contains('op-ads--active')) {
                        __classPrivateFieldGet(this, _element).parentElement.classList.add('op-ads--active');
                    }
                    if (!__classPrivateFieldGet(this, _media).paused) {
                        __classPrivateFieldGet(this, _media).pause();
                    }
                    __classPrivateFieldSet(this, _adsActive, true);
                    const playEvent = addEvent('play');
                    __classPrivateFieldGet(this, _element).dispatchEvent(playEvent);
                    let resized;
                    if (!resized) {
                        this.resizeAds();
                        resized = true;
                    }
                    if (__classPrivateFieldGet(this, _media).ended) {
                        __classPrivateFieldSet(this, _adsEnded, false);
                        const endEvent = addEvent('adsmediaended');
                        __classPrivateFieldGet(this, _element).dispatchEvent(endEvent);
                    }
                    if (typeof window !== 'undefined') {
                        __classPrivateFieldSet(this, _intervalTimer, window.setInterval(() => {
                            if (__classPrivateFieldGet(this, _adsActive) === true) {
                                __classPrivateFieldSet(this, _adsCurrentTime, Math.round(__classPrivateFieldGet(this, _adsManager).getRemainingTime()));
                                const timeEvent = addEvent('timeupdate');
                                __classPrivateFieldGet(this, _element).dispatchEvent(timeEvent);
                            }
                        }, 350));
                    }
                }
                break;
            case google.ima.AdEvent.Type.COMPLETE:
            case google.ima.AdEvent.Type.SKIPPED:
                if (ad.isLinear()) {
                    if (event.type === google.ima.AdEvent.Type.SKIPPED) {
                        const skipEvent = addEvent('adsskipped');
                        __classPrivateFieldGet(this, _element).dispatchEvent(skipEvent);
                    }
                    if (__classPrivateFieldGet(this, _element).parentElement) {
                        __classPrivateFieldGet(this, _element).parentElement.classList.remove('op-ads--active');
                    }
                    __classPrivateFieldSet(this, _adsActive, false);
                    clearInterval(__classPrivateFieldGet(this, _intervalTimer));
                }
                break;
            case google.ima.AdEvent.Type.VOLUME_CHANGED:
                this._setMediaVolume(this.volume);
            case google.ima.AdEvent.Type.VOLUME_MUTED:
                if (ad.isLinear()) {
                    const volumeEvent = addEvent('volumechange');
                    __classPrivateFieldGet(this, _element).dispatchEvent(volumeEvent);
                }
                break;
            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                if (ad.isLinear()) {
                    __classPrivateFieldSet(this, _adsActive, false);
                    __classPrivateFieldSet(this, _adsEnded, true);
                    __classPrivateFieldSet(this, _intervalTimer, 0);
                    __classPrivateFieldSet(this, _adsMuted, false);
                    __classPrivateFieldSet(this, _adsStarted, false);
                    __classPrivateFieldSet(this, _adsDuration, 0);
                    __classPrivateFieldSet(this, _adsCurrentTime, 0);
                    if (__classPrivateFieldGet(this, _element).parentElement) {
                        __classPrivateFieldGet(this, _element).parentElement.classList.remove('op-ads--active');
                    }
                    this.destroy();
                    if (__classPrivateFieldGet(this, _element).currentTime >= __classPrivateFieldGet(this, _element).duration) {
                        const endedEvent = addEvent('ended');
                        __classPrivateFieldGet(this, _element).dispatchEvent(endedEvent);
                    }
                }
                break;
            default:
                break;
        }
        if (event.type === google.ima.AdEvent.Type.LOG) {
            const adData = event.getAdData();
            if (adData['adError']) {
                const message = adData['adError'].getMessage();
                console.warn(`Ad warning: Non-fatal error occurred: ${message}`);
                const details = {
                    detail: {
                        data: adData['adError'],
                        message,
                        type: 'Ads',
                    },
                };
                const errorEvent = addEvent('playererror', details);
                __classPrivateFieldGet(this, _element).dispatchEvent(errorEvent);
            }
        }
        else {
            const e = addEvent(`ads${event.type}`);
            __classPrivateFieldGet(this, _element).dispatchEvent(e);
        }
    }
    _error(event) {
        const error = event.getError();
        const details = {
            detail: {
                data: error,
                message: error.toString(),
                type: 'Ads',
            },
        };
        const errorEvent = addEvent('playererror', details);
        __classPrivateFieldGet(this, _element).dispatchEvent(errorEvent);
        const fatalErrorCodes = [
            100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405,
            406, 407, 408, 409, 410, 500, 501, 502, 503, 900, 901, 1005,
        ];
        if (Array.isArray(__classPrivateFieldGet(this, _ads)) && __classPrivateFieldGet(this, _ads).length > 1 && __classPrivateFieldGet(this, _currentAdsIndex) < __classPrivateFieldGet(this, _ads).length - 1) {
            __classPrivateFieldSet(this, _currentAdsIndex, +__classPrivateFieldGet(this, _currentAdsIndex) + 1);
            __classPrivateFieldSet(this, _playTriggered, true);
            __classPrivateFieldSet(this, _adsStarted, true);
            __classPrivateFieldSet(this, _adsDone, false);
            this.destroy();
            this.load(true);
            console.warn(`Ad warning: ${error.toString()}`);
        }
        else {
            if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
                if (__classPrivateFieldGet(this, _adsManager)) {
                    __classPrivateFieldGet(this, _adsManager).destroy();
                }
                console.error(`Ad error: ${error.toString()}`);
            }
            else {
                console.warn(`Ad warning: ${error.toString()}`);
            }
            if (__classPrivateFieldGet(this, _autoStart) === true || __classPrivateFieldGet(this, _autoStartMuted) === true || __classPrivateFieldGet(this, _adsStarted) === true) {
                __classPrivateFieldSet(this, _adsActive, false);
                this._resumeMedia();
            }
        }
    }
    _loaded(adsManagerLoadedEvent) {
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
        adsRenderingSettings.enablePreloading = __classPrivateFieldGet(this, _adsOptions).enablePreloading;
        __classPrivateFieldSet(this, _adsManager, adsManagerLoadedEvent.getAdsManager(__classPrivateFieldGet(this, _element), adsRenderingSettings));
        this._start(__classPrivateFieldGet(this, _adsManager));
    }
    _start(manager) {
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested.bind(this), EVENT_OPTIONS);
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested.bind(this), EVENT_OPTIONS);
        __classPrivateFieldSet(this, _events, [
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
        ]);
        if (!__classPrivateFieldGet(this, _adsOptions).autoPlayAdBreaks) {
            __classPrivateFieldGet(this, _events).push(google.ima.AdEvent.Type.AD_BREAK_READY);
        }
        const controls = __classPrivateFieldGet(this, _player).getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (__classPrivateFieldGet(this, _adsContainer)) {
                __classPrivateFieldGet(this, _adsContainer).addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
            }
        });
        __classPrivateFieldGet(this, _events).forEach(event => {
            manager.addEventListener(event, this._assign.bind(this), EVENT_OPTIONS);
        });
        if (__classPrivateFieldGet(this, _autoStart) === true || __classPrivateFieldGet(this, _playTriggered) === true) {
            __classPrivateFieldSet(this, _playTriggered, false);
            if (!__classPrivateFieldGet(this, _adsDone)) {
                this._initNotDoneAds();
                return;
            }
            manager.init(__classPrivateFieldGet(this, _element).offsetWidth, __classPrivateFieldGet(this, _element).offsetHeight, __classPrivateFieldGet(this, _element).parentElement && __classPrivateFieldGet(this, _element).parentElement.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
            manager.start();
            const e = addEvent('play');
            __classPrivateFieldGet(this, _element).dispatchEvent(e);
            const event = addEvent('playing');
            __classPrivateFieldGet(this, _element).dispatchEvent(event);
        }
        else if (__classPrivateFieldGet(this, _adsOptions).enablePreloading === true) {
            manager.init(__classPrivateFieldGet(this, _element).offsetWidth, __classPrivateFieldGet(this, _element).offsetHeight, __classPrivateFieldGet(this, _element).parentElement && __classPrivateFieldGet(this, _element).parentElement.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
        }
    }
    _initNotDoneAds() {
        __classPrivateFieldSet(this, _adsDone, true);
        __classPrivateFieldGet(this, _adDisplayContainer).initialize();
        if (IS_IOS || IS_ANDROID) {
            __classPrivateFieldSet(this, _preloadContent, this._contentLoadedAction);
            __classPrivateFieldGet(this, _element).addEventListener('loadedmetadata', this._contentLoadedAction.bind(this), EVENT_OPTIONS);
            __classPrivateFieldGet(this, _element).load();
        }
        else {
            this._contentLoadedAction();
        }
    }
    _contentEndedListener() {
        __classPrivateFieldSet(this, _adsEnded, true);
        __classPrivateFieldSet(this, _adsActive, false);
        __classPrivateFieldSet(this, _adsStarted, false);
        __classPrivateFieldGet(this, _adsLoader).contentComplete();
    }
    _onContentPauseRequested() {
        __classPrivateFieldGet(this, _element).removeEventListener('ended', this._contentEndedListener.bind(this));
        __classPrivateFieldSet(this, _lastTimePaused, __classPrivateFieldGet(this, _media).currentTime);
        if (__classPrivateFieldGet(this, _adsStarted)) {
            __classPrivateFieldGet(this, _media).pause();
        }
        else {
            __classPrivateFieldSet(this, _adsStarted, true);
        }
        const e = addEvent('play');
        __classPrivateFieldGet(this, _element).dispatchEvent(e);
    }
    _onContentResumeRequested() {
        if (__classPrivateFieldGet(this, _adsOptions).loop) {
            if (Array.isArray(__classPrivateFieldGet(this, _ads))) {
                if (__classPrivateFieldGet(this, _currentAdsIndex) === __classPrivateFieldGet(this, _ads).length - 1) {
                    __classPrivateFieldSet(this, _currentAdsIndex, 0);
                }
                else {
                    __classPrivateFieldSet(this, _currentAdsIndex, +__classPrivateFieldGet(this, _currentAdsIndex) + 1);
                }
            }
            this.destroy();
            __classPrivateFieldGet(this, _adsLoader).contentComplete();
            __classPrivateFieldSet(this, _playTriggered, true);
            __classPrivateFieldSet(this, _adsStarted, true);
            __classPrivateFieldSet(this, _adsDone, false);
            this.load(true);
        }
        else {
            __classPrivateFieldGet(this, _element).addEventListener('ended', this._contentEndedListener.bind(this), EVENT_OPTIONS);
            __classPrivateFieldGet(this, _element).addEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this), EVENT_OPTIONS);
            if (IS_IOS || IS_ANDROID) {
                __classPrivateFieldGet(this, _media).src = __classPrivateFieldGet(this, _mediaSources);
                __classPrivateFieldGet(this, _media).load();
                this._prepareMedia();
                if (__classPrivateFieldGet(this, _element).parentElement) {
                    __classPrivateFieldGet(this, _element).parentElement.classList.add('op-ads--active');
                }
            }
            else {
                const event = addEvent('loadedmetadata');
                __classPrivateFieldGet(this, _element).dispatchEvent(event);
            }
        }
    }
    _loadedMetadataHandler() {
        if (Array.isArray(__classPrivateFieldGet(this, _ads))) {
            __classPrivateFieldSet(this, _currentAdsIndex, +__classPrivateFieldGet(this, _currentAdsIndex) + 1);
            if (__classPrivateFieldGet(this, _currentAdsIndex) <= __classPrivateFieldGet(this, _ads).length - 1) {
                if (__classPrivateFieldGet(this, _adsManager)) {
                    __classPrivateFieldGet(this, _adsManager).destroy();
                }
                __classPrivateFieldGet(this, _adsLoader).contentComplete();
                __classPrivateFieldSet(this, _playTriggered, true);
                __classPrivateFieldSet(this, _adsStarted, true);
                __classPrivateFieldSet(this, _adsDone, false);
                this._requestAds();
            }
            else {
                if (!__classPrivateFieldGet(this, _adsOptions).autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else if (__classPrivateFieldGet(this, _element).seekable.length) {
            if (__classPrivateFieldGet(this, _element).seekable.end(0) > __classPrivateFieldGet(this, _lastTimePaused)) {
                if (!__classPrivateFieldGet(this, _adsOptions).autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else {
            setTimeout(this._loadedMetadataHandler.bind(this), 100);
        }
    }
    _resumeMedia() {
        __classPrivateFieldSet(this, _intervalTimer, 0);
        __classPrivateFieldSet(this, _adsMuted, false);
        __classPrivateFieldSet(this, _adsStarted, false);
        __classPrivateFieldSet(this, _adsDuration, 0);
        __classPrivateFieldSet(this, _adsCurrentTime, 0);
        if (__classPrivateFieldGet(this, _element).parentElement) {
            __classPrivateFieldGet(this, _element).parentElement.classList.remove('op-ads--active');
        }
        const triggerEvent = (eventName) => {
            const event = addEvent(eventName);
            __classPrivateFieldGet(this, _element).dispatchEvent(event);
        };
        const waitPromise = (ms, isReject) => new Promise((resolve, reject) => {
            if (isReject) {
                return reject();
            }
            setTimeout(resolve, ms);
        });
        waitPromise(50, __classPrivateFieldGet(this, _media).ended)
            .then(() => __classPrivateFieldGet(this, _media).play().then(() => triggerEvent('play')))
            .catch(() => triggerEvent('ended'));
    }
    _requestAds() {
        __classPrivateFieldSet(this, _adsRequest, new google.ima.AdsRequest());
        const ads = Array.isArray(__classPrivateFieldGet(this, _ads)) ? __classPrivateFieldGet(this, _ads)[__classPrivateFieldGet(this, _currentAdsIndex)] : __classPrivateFieldGet(this, _ads);
        if (isXml(ads)) {
            __classPrivateFieldGet(this, _adsRequest).adsResponse = ads;
        }
        else {
            __classPrivateFieldGet(this, _adsRequest).adTagUrl = ads;
        }
        const width = __classPrivateFieldGet(this, _element).parentElement ? __classPrivateFieldGet(this, _element).parentElement.offsetWidth : 0;
        const height = __classPrivateFieldGet(this, _element).parentElement ? __classPrivateFieldGet(this, _element).parentElement.offsetHeight : 0;
        __classPrivateFieldGet(this, _adsRequest).linearAdSlotWidth = width;
        __classPrivateFieldGet(this, _adsRequest).linearAdSlotHeight = height;
        __classPrivateFieldGet(this, _adsRequest).nonLinearAdSlotWidth = width;
        __classPrivateFieldGet(this, _adsRequest).nonLinearAdSlotHeight = height / 3;
        __classPrivateFieldGet(this, _adsRequest).setAdWillAutoPlay(__classPrivateFieldGet(this, _autoStart));
        __classPrivateFieldGet(this, _adsRequest).setAdWillPlayMuted(__classPrivateFieldGet(this, _autoStartMuted));
        __classPrivateFieldGet(this, _adsLoader).requestAds(__classPrivateFieldGet(this, _adsRequest));
    }
    _contentLoadedAction() {
        if (__classPrivateFieldGet(this, _preloadContent)) {
            __classPrivateFieldGet(this, _element).removeEventListener('loadedmetadata', __classPrivateFieldGet(this, _preloadContent).bind(this));
            __classPrivateFieldSet(this, _preloadContent, null);
        }
        this._requestAds();
    }
    _resetAdsAfterManualBreak() {
        if (__classPrivateFieldGet(this, _adsManager)) {
            __classPrivateFieldGet(this, _adsManager).destroy();
        }
        __classPrivateFieldGet(this, _adsLoader).contentComplete();
        __classPrivateFieldSet(this, _adsDone, false);
        __classPrivateFieldSet(this, _playTriggered, true);
    }
    _prepareMedia() {
        __classPrivateFieldGet(this, _media).currentTime = __classPrivateFieldGet(this, _lastTimePaused);
        __classPrivateFieldGet(this, _element).removeEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this));
        this._resumeMedia();
    }
    _setMediaVolume(volume) {
        __classPrivateFieldGet(this, _media).volume = volume;
        __classPrivateFieldGet(this, _media).muted = volume === 0;
    }
}
_adsEnded = new WeakMap(), _adsDone = new WeakMap(), _adsActive = new WeakMap(), _adsStarted = new WeakMap(), _intervalTimer = new WeakMap(), _adsVolume = new WeakMap(), _adsMuted = new WeakMap(), _adsDuration = new WeakMap(), _adsCurrentTime = new WeakMap(), _adsManager = new WeakMap(), _player = new WeakMap(), _media = new WeakMap(), _element = new WeakMap(), _events = new WeakMap(), _ads = new WeakMap(), _promise = new WeakMap(), _adsLoader = new WeakMap(), _adsContainer = new WeakMap(), _adDisplayContainer = new WeakMap(), _adsRequest = new WeakMap(), _autoStart = new WeakMap(), _autoStartMuted = new WeakMap(), _playTriggered = new WeakMap(), _adsOptions = new WeakMap(), _currentAdsIndex = new WeakMap(), _originalVolume = new WeakMap(), _preloadContent = new WeakMap(), _lastTimePaused = new WeakMap(), _mediaSources = new WeakMap(), _mediaStarted = new WeakMap();
export default Ads;
