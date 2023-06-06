class Player {
    constructor({ media, autoplay }) {
        this.isExternalMedia = false;
        this.hasPlayedOnce = false;
        if (media) {
            this.media = media;
            this.isExternalMedia = true;
        }
        else {
            this.media = document.createElement('audio');
        }
        // Track the first play() call
        const unsubscribe = this.on('play', () => {
            this.hasPlayedOnce = true;
            unsubscribe();
        });
        // Autoplay
        if (autoplay) {
            this.media.autoplay = true;
        }
    }
    on(event, callback) {
        var _a;
        (_a = this.media) === null || _a === void 0 ? void 0 : _a.addEventListener(event, callback);
        return () => { var _a; return (_a = this.media) === null || _a === void 0 ? void 0 : _a.removeEventListener(event, callback); };
    }
    destroy() {
        var _a, _b;
        (_a = this.media) === null || _a === void 0 ? void 0 : _a.pause();
        if (!this.isExternalMedia) {
            (_b = this.media) === null || _b === void 0 ? void 0 : _b.remove();
        }
    }
    loadUrl(src) {
        if (this.media) {
            this.media.src = src;
        }
    }
    getCurrentTime() {
        return this.media.currentTime;
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    isPlaying() {
        return this.media.currentTime > 0 && !this.media.paused && !this.media.ended;
    }
    seekTo(time) {
        if (this.media) {
            // iOS Safari requires a play() call before seeking
            const { hasPlayedOnce } = this;
            if (!hasPlayedOnce) {
                this.media.play();
            }
            this.media.currentTime = time;
            if (!hasPlayedOnce) {
                this.media.pause();
            }
        }
    }
    getVolume() {
        return this.media.volume;
    }
    setVolume(volume) {
        this.media.volume = volume;
    }
    getMuted() {
        return this.media.muted;
    }
    setMuted(muted) {
        this.media.muted = muted;
    }
    getPlaybackRate() {
        return this.media.playbackRate;
    }
    setPlaybackRate(rate, preservePitch) {
        // preservePitch is true by default in most browsers
        if (preservePitch != null) {
            this.media.preservesPitch = preservePitch;
        }
        this.media.playbackRate = rate;
    }
}
export default Player;
