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
var _player, _events, _options;
import { HAS_MSE } from '../utils/constants';
import { addEvent } from '../utils/events';
import { loadScript } from '../utils/general';
import { isFlvSource } from '../utils/media';
import Native from './native';
class FlvMedia extends Native {
    constructor(element, mediaSource, options) {
        super(element, mediaSource);
        _player.set(this, void 0);
        _events.set(this, {});
        _options.set(this, undefined);
        __classPrivateFieldSet(this, _options, options);
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
        __classPrivateFieldGet(this, _player).unload();
        __classPrivateFieldGet(this, _player).detachMediaElement();
        __classPrivateFieldGet(this, _player).attachMediaElement(this.element);
        __classPrivateFieldGet(this, _player).load();
        const e = addEvent('loadedmetadata');
        this.element.dispatchEvent(e);
        if (!__classPrivateFieldGet(this, _events)) {
            __classPrivateFieldSet(this, _events, flvjs.Events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
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
        if (__classPrivateFieldGet(this, _player) && __classPrivateFieldGet(this, _player).levels && __classPrivateFieldGet(this, _player).levels.length) {
            Object.keys(__classPrivateFieldGet(this, _player).levels).forEach(item => {
                const { height, name } = __classPrivateFieldGet(this, _player).levels[item];
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
        __classPrivateFieldGet(this, _player).currentLevel = level;
    }
    get level() {
        return __classPrivateFieldGet(this, _player) ? __classPrivateFieldGet(this, _player).currentLevel : -1;
    }
    _create() {
        const _a = __classPrivateFieldGet(this, _options), { configs } = _a, rest = __rest(_a, ["configs"]);
        flvjs.LoggingControl.enableDebug = rest && rest.debug ? rest.debug : false;
        flvjs.LoggingControl.enableVerbose = rest && rest.debug ? rest.debug : false;
        const options = Object.assign(Object.assign({}, rest), { type: 'flv', url: this.media.src });
        __classPrivateFieldSet(this, _player, flvjs.createPlayer(options, configs));
        this.instance = __classPrivateFieldGet(this, _player);
        if (!__classPrivateFieldGet(this, _events)) {
            __classPrivateFieldSet(this, _events, flvjs.Events);
            Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
                __classPrivateFieldGet(this, _player).on(__classPrivateFieldGet(this, _events)[event], (...args) => this._assign(__classPrivateFieldGet(this, _events)[event], args));
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
        __classPrivateFieldGet(this, _player).destroy();
        __classPrivateFieldSet(this, _player, null);
    }
}
_player = new WeakMap(), _events = new WeakMap(), _options = new WeakMap();
export default FlvMedia;
