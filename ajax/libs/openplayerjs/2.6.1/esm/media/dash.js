import { HAS_MSE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isDashSource } from '../utils/media';
import Native from './native';
class DashMedia extends Native {
    constructor(element, mediaSource, options) {
        super(element, mediaSource);
        this.events = {};
        this.options = {};
        this.options = options;
        this.promise = (typeof dashjs === 'undefined') ?
            loadScript('https://cdn.dashjs.org/latest/dash.all.min.js') :
            new Promise(resolve => {
                resolve({});
            });
        this.promise.then(() => {
            this.player = dashjs.MediaPlayer().create();
            this.instance = this.player;
        });
        return this;
    }
    canPlayType(mimeType) {
        return HAS_MSE && mimeType === 'application/dash+xml';
    }
    load() {
        this._preparePlayer();
        this.player.attachSource(this.media.src);
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!this.events) {
            this.events = dashjs.MediaPlayer.events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], this._assign.bind(this));
            });
        }
    }
    destroy() {
        this._revoke();
    }
    set src(media) {
        if (isDashSource(media)) {
            this._revoke();
            this.player = dashjs.MediaPlayer().create();
            this._preparePlayer();
            this.player.attachSource(media.src);
            this.events = dashjs.MediaPlayer.events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], this._assign.bind(this));
            });
        }
    }
    get levels() {
        const levels = [];
        if (this.player) {
            const bitrates = this.player.getBitrateInfoListFor('video');
            if (bitrates.length) {
                bitrates.forEach((item) => {
                    if (bitrates[item]) {
                        const { height, name } = bitrates[item];
                        const level = {
                            height,
                            id: item,
                            label: name || null,
                        };
                        levels.push(level);
                    }
                });
            }
        }
        return levels;
    }
    set level(level) {
        if (level === 0) {
            this.player.setAutoSwitchQuality(true);
        }
        else {
            this.player.setAutoSwitchQuality(false);
            this.player.setQualityFor('video', level);
        }
    }
    get level() {
        return this.player ? this.player.getQualityFor('video') : -1;
    }
    _assign(event) {
        if (event.type === 'error') {
            const details = {
                detail: {
                    message: event,
                    type: 'M(PEG)-DASH',
                },
            };
            const errorEvent = addEvent('playererror', details);
            this.element.dispatchEvent(errorEvent);
        }
        else {
            const e = addEvent(event.type, event);
            this.element.dispatchEvent(e);
        }
    }
    _revoke() {
        if (this.events) {
            Object.keys(this.events).forEach(event => {
                this.player.off(this.events[event], this._assign.bind(this));
            });
            this.events = [];
        }
        this.player.reset();
    }
    _preparePlayer() {
        if (typeof this.player.getDebug().setLogToBrowserConsole === 'undefined') {
            this.player.updateSettings({
                debug: {
                    logLevel: dashjs.Debug.LOG_LEVEL_NONE,
                },
                streaming: {
                    fastSwitchEnabled: true,
                    scheduleWhilePaused: false,
                },
            });
        }
        else {
            this.player.getDebug().setLogToBrowserConsole(false);
            this.player.setScheduleWhilePaused(false);
            this.player.setFastSwitchEnabled(true);
        }
        this.player.initialize();
        this.player.attachView(this.element);
        this.player.setAutoPlay(false);
        if (this.options && typeof this.options.drm === 'object' && Object.keys(this.options.drm).length) {
            this.player.setProtectionData(this.options.drm);
            if (this.options.robustnessLevel && this.options.robustnessLevel) {
                this.player.getProtectionController().setRobustnessLevel(this.options.robustnessLevel);
            }
        }
    }
}
export default DashMedia;
