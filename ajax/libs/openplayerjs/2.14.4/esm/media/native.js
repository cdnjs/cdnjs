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
var _Native_customPlayer;
class Native {
    constructor(element, media) {
        _Native_customPlayer.set(this, void 0);
        this.element = element;
        this.media = media;
        this.promise = new Promise((resolve) => {
            resolve();
        });
    }
    set instance(customPlayer) {
        __classPrivateFieldSet(this, _Native_customPlayer, customPlayer, "f");
    }
    get instance() {
        return __classPrivateFieldGet(this, _Native_customPlayer, "f");
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
_Native_customPlayer = new WeakMap();
export default Native;
