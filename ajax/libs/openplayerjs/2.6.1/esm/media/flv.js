var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { HAS_MSE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isFlvSource } from '../utils/media';
import Native from './native';
class FlvMedia extends Native {
    constructor(element, mediaSource, options) {
        super(element, mediaSource);
        this.events = {};
        this.options = undefined;
        this.options = options;
        this.element = element;
        this.media = mediaSource;
        this.promise = (typeof flvjs === 'undefined') ?
            loadScript('https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js') :
            new Promise(resolve => {
                resolve({});
            });
        this.promise.then(this._create.bind(this));
        return this;
    }
    canPlayType(mimeType) {
        return HAS_MSE && (mimeType === 'video/x-flv' || mimeType === 'video/flv');
    }
    load() {
        this.player.unload();
        this.player.detachMediaElement();
        this.player.attachMediaElement(this.element);
        this.player.load();
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!this.events) {
            this.events = flvjs.Events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], (...args) => this._assign(this.events[event], args));
            });
        }
    }
    destroy() {
        this._revoke();
    }
    set src(media) {
        if (isFlvSource(media)) {
            this._revoke();
            this._create();
        }
    }
    get levels() {
        const levels = [];
        if (this.player && this.player.levels && this.player.levels.length) {
            Object.keys(this.player.levels).forEach(item => {
                const { height, name } = this.player.levels[item];
                const level = {
                    height,
                    id: item,
                    label: name || null,
                };
                levels.push(level);
            });
        }
        return levels;
    }
    set level(level) {
        this.player.currentLevel = level;
    }
    get level() {
        return this.player ? this.player.currentLevel : -1;
    }
    _create() {
        const _a = this.options, { configs } = _a, rest = __rest(_a, ["configs"]);
        flvjs.LoggingControl.enableDebug = rest && rest.debug ? rest.debug : false;
        flvjs.LoggingControl.enableVerbose = rest && rest.debug ? rest.debug : false;
        const options = Object.assign(Object.assign({}, rest), { type: 'flv', url: this.media.src });
        this.player = flvjs.createPlayer(options, configs);
        this.instance = this.player;
        if (!this.events) {
            this.events = flvjs.Events;
            Object.keys(this.events).forEach(event => {
                this.player.on(this.events[event], (...args) => this._assign(this.events[event], args));
            });
        }
    }
    _assign(event, data) {
        if (event === 'error') {
            const errorDetails = {
                detail: {
                    data,
                    message: `${data[0]}: ${data[1]} ${data[2].msg}`,
                    type: 'FLV',
                },
            };
            const errorEvent = addEvent('playererror', errorDetails);
            this.element.dispatchEvent(errorEvent);
        }
        else {
            const e = addEvent(event, data);
            this.element.dispatchEvent(e);
        }
    }
    _revoke() {
        this.player.destroy();
        this.player = null;
    }
}
export default FlvMedia;
