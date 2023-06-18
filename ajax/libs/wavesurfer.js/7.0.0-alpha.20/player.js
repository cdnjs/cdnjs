class Player {
    media;
    isExternalMedia = false;
    hasPlayedOnce = false;
    subscriptions = [];
    constructor({ media, autoplay }) {
        if (media) {
            this.media = media;
            this.isExternalMedia = true;
        }
        else {
            this.media = document.createElement('audio');
        }
        this.subscriptions.push(
        // Track the first play() call
        this.on('play', () => {
            this.hasPlayedOnce = true;
        }, { once: true }));
        // Autoplay
        if (autoplay) {
            this.media.autoplay = true;
        }
    }
    on(event, callback, options) {
        this.media.addEventListener(event, callback, options);
        return () => this.media.removeEventListener(event, callback);
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => {
            unsubscribe();
        });
        this.media.pause();
        if (!this.isExternalMedia) {
            this.media.remove();
        }
    }
    loadUrl(src) {
        this.media.src = src;
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
        // iOS Safari requires a play() call before seeking
        if (!this.hasPlayedOnce && navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
            this.media.play()?.then?.(() => {
                setTimeout(() => this.media.pause(), 10);
            });
        }
        this.media.currentTime = time;
    }
    getDuration() {
        return this.media.duration;
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
    getMediaElement() {
        return this.media;
    }
}
export default Player;
