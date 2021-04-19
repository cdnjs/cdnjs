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
var _customPlayer;
class Native {
    constructor(element, media) {
        _customPlayer.set(this, void 0);
        this.element = element;
        this.media = media;
        this.promise = new Promise(resolve => {
            resolve({});
        });
    }
    set instance(customPlayer) {
        __classPrivateFieldSet(this, _customPlayer, customPlayer);
    }
    get instance() {
        return __classPrivateFieldGet(this, _customPlayer);
    }
    play() {
        return this.element.play();
    }
    pause() {
        this.element.pause();
    }
    set volume(value) {
        this.element.volume = value;
    }
    get volume() {
        return this.element.volume;
    }
    set muted(value) {
        this.element.muted = value;
    }
    get muted() {
        return this.element.muted;
    }
    set playbackRate(value) {
        this.element.playbackRate = value;
    }
    get playbackRate() {
        return this.element.playbackRate;
    }
    set defaultPlaybackRate(value) {
        this.element.defaultPlaybackRate = value;
    }
    get defaultPlaybackRate() {
        return this.element.defaultPlaybackRate;
    }
    set currentTime(value) {
        this.element.currentTime = value;
    }
    get currentTime() {
        return this.element.currentTime;
    }
    get duration() {
        return this.element.duration;
    }
    get paused() {
        return this.element.paused;
    }
    get ended() {
        return this.element.ended;
    }
}
_customPlayer = new WeakMap();
export default Native;
