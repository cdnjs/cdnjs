import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, IS_IPHONE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isVideo, isXml, loadScript, removeElement } from '../utils/general';
class Ads {
    constructor(player, ads, autoStart, autoStartMuted, options) {
        this.adsEnded = false;
        this.adsDone = false;
        this.adsActive = false;
        this.adsStarted = false;
        this.intervalTimer = 0;
        this.adsMuted = false;
        this.adsDuration = 0;
        this.adsCurrentTime = 0;
        this.adsManager = null;
        this.events = [];
        this.autoStart = false;
        this.autoStartMuted = false;
        this.playTriggered = false;
        this.currentAdsIndex = 0;
        this.lastTimePaused = 0;
        this.mediaSources = [];
        this.mediaStarted = false;
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
        this.player = player;
        this.ads = ads;
        this.media = player.getMedia();
        this.element = player.getElement();
        this.autoStart = autoStart || false;
        this.autoStartMuted = autoStartMuted || false;
        this.adsOptions = Object.assign(Object.assign({}, defaultOpts), options);
        this.playTriggered = false;
        this.originalVolume = this.element.volume;
        this.adsVolume = this.originalVolume;
        const path = this.adsOptions.debug ? this.adsOptions.sdkPath.replace(/(\.js$)/, '_debug.js') : this.adsOptions.sdkPath;
        this.promise = (typeof google === 'undefined' || typeof google.ima === 'undefined') ?
            loadScript(path) : new Promise(resolve => {
            resolve({});
        });
        this.promise.then(this.load.bind(this));
        return this;
    }
    load(force = false) {
        if (!this.adsOptions.autoPlayAdBreaks && !force) {
            return;
        }
        const existingContainer = this.player.getContainer().querySelector('.op-ads');
        if (existingContainer && existingContainer.parentNode) {
            existingContainer.parentNode.removeChild(existingContainer);
        }
        this.adsStarted = true;
        this.adsContainer = document.createElement('div');
        this.adsContainer.className = 'op-ads';
        this.adsContainer.tabIndex = -1;
        if (this.element.parentElement) {
            this.element.parentElement.insertBefore(this.adsContainer, this.element.nextSibling);
        }
        this.mediaSources = this.media.src;
        google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
        google.ima.settings.setAutoPlayAdBreaks(this.adsOptions.autoPlayAdBreaks);
        google.ima.settings.setNumRedirects(this.adsOptions.numRedirects);
        google.ima.settings.setLocale(this.adsOptions.language);
        this.adDisplayContainer =
            new google.ima.AdDisplayContainer(this.adsContainer, this.element);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this), EVENT_OPTIONS);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this), EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => {
                this.resizeAds();
            }, EVENT_OPTIONS);
        }
        this.element.addEventListener('loadedmetadata', () => {
            this.resizeAds();
        }, EVENT_OPTIONS);
        if (this.autoStart === true || this.autoStartMuted === true || force === true || this.adsOptions.enablePreloading === true) {
            if (!this.adsDone) {
                this.adsDone = true;
                this.adDisplayContainer.initialize();
            }
            this._requestAds();
        }
    }
    play() {
        const play = () => {
            if (!this.adsDone) {
                this._initNotDoneAds();
                return;
            }
            if (this.adsManager) {
                if (!this.intervalTimer && this.adsActive === false) {
                    this.adsManager.start();
                }
                else {
                    this.adsManager.resume();
                }
                this.adsActive = true;
                const e = addEvent('play');
                this.element.dispatchEvent(e);
            }
        };
        return new Promise(resolve => {
            resolve({});
        }).then(play);
    }
    pause() {
        if (this.adsManager) {
            this.adsActive = false;
            this.adsManager.pause();
            const e = addEvent('pause');
            this.element.dispatchEvent(e);
        }
    }
    destroy() {
        if (this.events) {
            this.events.forEach(event => {
                this.adsManager.removeEventListener(event, this._assign.bind(this));
            });
        }
        this.events = [];
        const controls = this.player.getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (this.adsContainer) {
                this.adsContainer.removeEventListener(event, mouseEvents[event]);
            }
        });
        if (this.adsLoader) {
            this.adsLoader.removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error.bind(this));
            this.adsLoader.removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded.bind(this));
        }
        const destroy = !Array.isArray(this.ads) || this.currentAdsIndex > this.ads.length;
        if (this.adsManager && destroy) {
            this.adsManager.destroy();
        }
        if (IS_IOS || IS_ANDROID) {
            this.element.removeEventListener('loadedmetadata', this._contentLoadedAction.bind(this));
        }
        this.element.removeEventListener('loadedmetadata', () => { this.resizeAds.bind(this); });
        this.element.removeEventListener('ended', this._contentEndedListener.bind(this));
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', () => { this.resizeAds.bind(this); });
        }
        removeElement(this.adsContainer);
    }
    resizeAds(width, height) {
        if (this.adsManager) {
            const target = this.element;
            const mode = target.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    this.adsManager.resize(width || target.offsetWidth, height || target.offsetHeight, mode);
                });
            }
        }
    }
    set playRequested(value) {
        this.playTriggered = value;
    }
    set volume(value) {
        if (this.adsManager) {
            this.adsVolume = value;
            this.adsManager.setVolume(value);
            this._setMediaVolume(value);
            this.adsMuted = (value === 0);
        }
    }
    get volume() {
        return this.adsManager ? this.adsManager.getVolume() : this.originalVolume;
    }
    set muted(value) {
        if (this.adsManager) {
            if (value) {
                this.adsManager.setVolume(0);
                this.adsMuted = true;
                this._setMediaVolume(0);
            }
            else {
                this.adsManager.setVolume(this.adsVolume);
                this.adsMuted = false;
                this._setMediaVolume(this.adsVolume);
            }
        }
    }
    get muted() {
        return this.adsMuted;
    }
    set currentTime(value) {
        this.adsCurrentTime = value;
    }
    get currentTime() {
        return this.adsCurrentTime;
    }
    get duration() {
        return this.adsDuration;
    }
    get paused() {
        return !this.adsActive;
    }
    get ended() {
        return this.adsEnded;
    }
    _assign(event) {
        const ad = event.getAd();
        switch (event.type) {
            case google.ima.AdEvent.Type.LOADED:
                if (!ad.isLinear()) {
                    this._onContentResumeRequested();
                }
                else {
                    if (IS_IPHONE && isVideo(this.element)) {
                        this.element.controls = false;
                    }
                    this.adsDuration = ad.getDuration();
                    this.adsCurrentTime = ad.getDuration();
                    if (!this.mediaStarted && !IS_IOS && !IS_ANDROID) {
                        const waitingEvent = addEvent('waiting');
                        this.element.dispatchEvent(waitingEvent);
                        const loadedEvent = addEvent('loadedmetadata');
                        this.element.dispatchEvent(loadedEvent);
                        this.resizeAds();
                    }
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                if (ad.isLinear()) {
                    if (this.element.parentElement && !this.element.parentElement.classList.contains('op-ads--active')) {
                        this.element.parentElement.classList.add('op-ads--active');
                    }
                    if (!this.media.paused) {
                        this.media.pause();
                    }
                    this.adsActive = true;
                    const playEvent = addEvent('play');
                    this.element.dispatchEvent(playEvent);
                    let resized;
                    if (!resized) {
                        this.resizeAds();
                        resized = true;
                    }
                    if (this.media.ended) {
                        this.adsEnded = false;
                        const endEvent = addEvent('adsmediaended');
                        this.element.dispatchEvent(endEvent);
                    }
                    if (typeof window !== 'undefined') {
                        this.intervalTimer = window.setInterval(() => {
                            if (this.adsActive === true) {
                                this.adsCurrentTime = Math.round(this.adsManager.getRemainingTime());
                                const timeEvent = addEvent('timeupdate');
                                this.element.dispatchEvent(timeEvent);
                            }
                        }, 350);
                    }
                }
                break;
            case google.ima.AdEvent.Type.COMPLETE:
            case google.ima.AdEvent.Type.SKIPPED:
                if (ad.isLinear()) {
                    if (event.type === google.ima.AdEvent.Type.SKIPPED) {
                        const skipEvent = addEvent('adsskipped');
                        this.element.dispatchEvent(skipEvent);
                    }
                    if (this.element.parentElement) {
                        this.element.parentElement.classList.remove('op-ads--active');
                    }
                    this.adsActive = false;
                    clearInterval(this.intervalTimer);
                }
                break;
            case google.ima.AdEvent.Type.VOLUME_CHANGED:
                this._setMediaVolume(this.volume);
            case google.ima.AdEvent.Type.VOLUME_MUTED:
                if (ad.isLinear()) {
                    const volumeEvent = addEvent('volumechange');
                    this.element.dispatchEvent(volumeEvent);
                }
                break;
            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                if (ad.isLinear()) {
                    this.adsActive = false;
                    this.adsEnded = true;
                    this.intervalTimer = 0;
                    this.adsMuted = false;
                    this.adsStarted = false;
                    this.adsDuration = 0;
                    this.adsCurrentTime = 0;
                    if (this.element.parentElement) {
                        this.element.parentElement.classList.remove('op-ads--active');
                    }
                    this.destroy();
                    if (this.element.currentTime >= this.element.duration) {
                        const endedEvent = addEvent('ended');
                        this.element.dispatchEvent(endedEvent);
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
                this.element.dispatchEvent(errorEvent);
            }
        }
        else {
            const e = addEvent(`ads${event.type}`);
            this.element.dispatchEvent(e);
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
        this.element.dispatchEvent(errorEvent);
        const fatalErrorCodes = [
            100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405,
            406, 407, 408, 409, 410, 500, 501, 502, 503, 900, 901, 1005,
        ];
        if (Array.isArray(this.ads) && this.ads.length > 1 && this.currentAdsIndex <= this.ads.length - 1) {
            if (this.currentAdsIndex < this.ads.length - 1) {
                this.currentAdsIndex++;
            }
            this.playTriggered = true;
            this.adsStarted = true;
            this.adsDone = false;
            this.destroy();
            this.load(true);
            console.warn(`Ad warning: ${error.toString()}`);
        }
        else {
            if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
                if (this.adsManager) {
                    this.adsManager.destroy();
                }
                console.error(`Ad error: ${error.toString()}`);
            }
            else {
                console.warn(`Ad warning: ${error.toString()}`);
            }
            if (this.autoStart === true || this.autoStartMuted === true || this.adsStarted === true) {
                this.adsActive = false;
                this._resumeMedia();
            }
        }
    }
    _loaded(adsManagerLoadedEvent) {
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
        adsRenderingSettings.enablePreloading = this.adsOptions.enablePreloading;
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.element, adsRenderingSettings);
        this._start(this.adsManager);
    }
    _start(manager) {
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested.bind(this), EVENT_OPTIONS);
        manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested.bind(this), EVENT_OPTIONS);
        this.events = [
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
        ];
        if (!this.adsOptions.autoPlayAdBreaks) {
            this.events.push(google.ima.AdEvent.Type.AD_BREAK_READY);
        }
        const controls = this.player.getControls();
        const mouseEvents = controls ? controls.events.mouse : {};
        Object.keys(mouseEvents).forEach((event) => {
            if (this.adsContainer) {
                this.adsContainer.addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
            }
        });
        this.events.forEach(event => {
            manager.addEventListener(event, this._assign.bind(this), EVENT_OPTIONS);
        });
        if (this.autoStart === true || this.playTriggered === true) {
            this.playTriggered = false;
            if (!this.adsDone) {
                this._initNotDoneAds();
                return;
            }
            manager.init(this.element.offsetWidth, this.element.offsetHeight, this.element.parentElement && this.element.parentElement.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
            manager.start();
            const e = addEvent('play');
            this.element.dispatchEvent(e);
            const event = addEvent('playing');
            this.element.dispatchEvent(event);
        }
        else if (this.adsOptions.enablePreloading === true) {
            manager.init(this.element.offsetWidth, this.element.offsetHeight, this.element.parentElement && this.element.parentElement.getAttribute('data-fullscreen') === 'true' ?
                google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
        }
    }
    _initNotDoneAds() {
        this.adsDone = true;
        this.adDisplayContainer.initialize();
        if (IS_IOS || IS_ANDROID) {
            this.preloadContent = this._contentLoadedAction;
            this.element.addEventListener('loadedmetadata', this._contentLoadedAction.bind(this), EVENT_OPTIONS);
            this.element.load();
        }
        else {
            this._contentLoadedAction();
        }
    }
    _contentEndedListener() {
        this.adsEnded = true;
        this.adsActive = false;
        this.adsStarted = false;
        this.adsLoader.contentComplete();
    }
    _onContentPauseRequested() {
        this.element.removeEventListener('ended', this._contentEndedListener.bind(this));
        this.lastTimePaused = this.media.currentTime;
        if (this.adsStarted) {
            this.media.pause();
        }
        else {
            this.adsStarted = true;
        }
        const e = addEvent('play');
        this.element.dispatchEvent(e);
    }
    _onContentResumeRequested() {
        if (this.adsOptions.loop) {
            if (Array.isArray(this.ads)) {
                if (this.currentAdsIndex === this.ads.length - 1) {
                    this.currentAdsIndex = 0;
                }
                else {
                    this.currentAdsIndex++;
                }
            }
            this.destroy();
            this.adsLoader.contentComplete();
            this.playTriggered = true;
            this.adsStarted = true;
            this.adsDone = false;
            this.load(true);
        }
        else {
            this.element.addEventListener('ended', this._contentEndedListener.bind(this), EVENT_OPTIONS);
            this.element.addEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this), EVENT_OPTIONS);
            if (IS_IOS || IS_ANDROID) {
                this.media.src = this.mediaSources;
                this.media.load();
                this._prepareMedia();
                if (this.element.parentElement) {
                    this.element.parentElement.classList.add('op-ads--active');
                }
            }
            else {
                const event = addEvent('loadedmetadata');
                this.element.dispatchEvent(event);
            }
        }
    }
    _loadedMetadataHandler() {
        if (Array.isArray(this.ads)) {
            this.currentAdsIndex++;
            if (this.currentAdsIndex <= this.ads.length - 1) {
                if (this.adsManager) {
                    this.adsManager.destroy();
                }
                this.adsLoader.contentComplete();
                this.playTriggered = true;
                this.adsStarted = true;
                this.adsDone = false;
                this._requestAds();
            }
            else {
                if (!this.adsOptions.autoPlayAdBreaks) {
                    this._resetAdsAfterManualBreak();
                }
                this._prepareMedia();
            }
        }
        else if (this.element.seekable.length) {
            if (this.element.seekable.end(0) > this.lastTimePaused) {
                if (!this.adsOptions.autoPlayAdBreaks) {
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
        this.intervalTimer = 0;
        this.adsMuted = false;
        this.adsStarted = false;
        this.adsDuration = 0;
        this.adsCurrentTime = 0;
        if (this.element.parentElement) {
            this.element.parentElement.classList.remove('op-ads--active');
        }
        const triggerEvent = (eventName) => {
            const event = addEvent(eventName);
            this.element.dispatchEvent(event);
        };
        const waitPromise = (ms, isReject) => new Promise((resolve, reject) => {
            if (isReject) {
                return reject();
            }
            setTimeout(resolve, ms);
        });
        waitPromise(50, this.media.ended)
            .then(() => this.media.play().then(() => triggerEvent('play')))
            .catch(() => triggerEvent('ended'));
    }
    _requestAds() {
        this.adsRequest = new google.ima.AdsRequest();
        const ads = Array.isArray(this.ads) ? this.ads[this.currentAdsIndex] : this.ads;
        if (isXml(ads)) {
            this.adsRequest.adsResponse = ads;
        }
        else {
            this.adsRequest.adTagUrl = ads;
        }
        const width = this.element.parentElement ? this.element.parentElement.offsetWidth : 0;
        const height = this.element.parentElement ? this.element.parentElement.offsetHeight : 0;
        this.adsRequest.linearAdSlotWidth = width;
        this.adsRequest.linearAdSlotHeight = height;
        this.adsRequest.nonLinearAdSlotWidth = width;
        this.adsRequest.nonLinearAdSlotHeight = height / 3;
        this.adsRequest.setAdWillAutoPlay(this.autoStart);
        this.adsRequest.setAdWillPlayMuted(this.autoStartMuted);
        this.adsLoader.requestAds(this.adsRequest);
    }
    _contentLoadedAction() {
        if (this.preloadContent) {
            this.element.removeEventListener('loadedmetadata', this.preloadContent.bind(this));
            this.preloadContent = null;
        }
        this._requestAds();
    }
    _resetAdsAfterManualBreak() {
        if (this.adsManager) {
            this.adsManager.destroy();
        }
        this.adsLoader.contentComplete();
        this.adsDone = false;
        this.playTriggered = true;
    }
    _prepareMedia() {
        this.media.currentTime = this.lastTimePaused;
        this.element.removeEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this));
        this._resumeMedia();
    }
    _setMediaVolume(volume) {
        this.media.volume = volume;
        this.media.muted = volume === 0;
    }
}
export default Ads;
