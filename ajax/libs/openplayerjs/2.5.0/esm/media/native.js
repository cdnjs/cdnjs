class Native {
    constructor(element, media) {
        this.element = element;
        this.media = media;
        this.promise = new Promise(resolve => {
            resolve({});
        });
    }
    set instance(customPlayer) {
        this.customPlayer = customPlayer;
    }
    get instance() {
        return this.customPlayer;
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
export default Native;
