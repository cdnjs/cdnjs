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
var _FlvMedia_player, _FlvMedia_events, _FlvMedia_options;
import { HAS_MSE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isFlvSource } from '../utils/media';
import Native from './native';
class FlvMedia extends Native {
    constructor(element, mediaSource, options) {
        super(element, mediaSource);
        _FlvMedia_player.set(this, void 0);
        _FlvMedia_events.set(this, {});
        _FlvMedia_options.set(this, void 0);
        __classPrivateFieldSet(this, _FlvMedia_options, options, "f");
        this.element = element;
        this.media = mediaSource;
        this.promise = (typeof flvjs === 'undefined')
            ? loadScript('https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js')
            : new Promise(resolve => {
                resolve({});
            });
        this._create = this._create.bind(this);
        this.promise.then(this._create);
        return this;
    }
    canPlayType(mimeType) {
        return HAS_MSE && (mimeType === 'video/x-flv' || mimeType === 'video/flv');
    }
    load() {
        __classPrivateFieldGet(this, _FlvMedia_player, "f").unload();
        __classPrivateFieldGet(this, _FlvMedia_player, "f").detachMediaElement();
        __classPrivateFieldGet(this, _FlvMedia_player, "f").attachMediaElement(this.element);
        __classPrivateFieldGet(this, _FlvMedia_player, "f").load();
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!__classPrivateFieldGet(this, _FlvMedia_events, "f")) {
            __classPrivateFieldSet(this, _FlvMedia_events, flvjs.Events, "f");
            Object.keys(__classPrivateFieldGet(this, _FlvMedia_events, "f")).forEach(event => {
                __classPrivateFieldGet(this, _FlvMedia_player, "f").on(__classPrivateFieldGet(this, _FlvMedia_events, "f")[event], (...args) => this._assign(__classPrivateFieldGet(this, _FlvMedia_events, "f")[event], args));
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
        if (__classPrivateFieldGet(this, _FlvMedia_player, "f") && __classPrivateFieldGet(this, _FlvMedia_player, "f").levels && __classPrivateFieldGet(this, _FlvMedia_player, "f").levels.length) {
            Object.keys(__classPrivateFieldGet(this, _FlvMedia_player, "f").levels).forEach(item => {
                const { height, name } = __classPrivateFieldGet(this, _FlvMedia_player, "f").levels[item];
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
        __classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel = level;
    }
    get level() {
        return __classPrivateFieldGet(this, _FlvMedia_player, "f") ? __classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel : -1;
    }
    _create() {
        var _a, _b, _c, _d;
        const configs = (_a = __classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _a === void 0 ? void 0 : _a.configs;
        (_b = __classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _b === void 0 ? true : delete _b.configs;
        flvjs.LoggingControl.enableDebug = ((_c = __classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _c === void 0 ? void 0 : _c.debug) || false;
        flvjs.LoggingControl.enableVerbose = ((_d = __classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _d === void 0 ? void 0 : _d.debug) || false;
        const options = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _FlvMedia_options, "f") || {}), { type: 'flv', url: this.media.src });
        __classPrivateFieldSet(this, _FlvMedia_player, flvjs.createPlayer(options, configs), "f");
        this.instance = __classPrivateFieldGet(this, _FlvMedia_player, "f");
        if (!__classPrivateFieldGet(this, _FlvMedia_events, "f")) {
            __classPrivateFieldSet(this, _FlvMedia_events, flvjs.Events, "f");
            Object.keys(__classPrivateFieldGet(this, _FlvMedia_events, "f")).forEach(event => {
                __classPrivateFieldGet(this, _FlvMedia_player, "f").on(__classPrivateFieldGet(this, _FlvMedia_events, "f")[event], (...args) => this._assign(__classPrivateFieldGet(this, _FlvMedia_events, "f")[event], args));
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
            const e = addEvent(event, { detail: { data } });
            this.element.dispatchEvent(e);
        }
    }
    _revoke() {
        __classPrivateFieldGet(this, _FlvMedia_player, "f").destroy();
        __classPrivateFieldSet(this, _FlvMedia_player, null, "f");
    }
}
_FlvMedia_player = new WeakMap(), _FlvMedia_events = new WeakMap(), _FlvMedia_options = new WeakMap();
export default FlvMedia;
