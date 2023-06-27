import EventEmitter from './event-emitter.js';
class Player extends EventEmitter {
    media;
    subscriptions = [];
    isExternalMedia = false;
    hasPlayedOnce = false;
    constructor(options) {
        super();
        if (options.media) {
            this.media = options.media;
            this.isExternalMedia = true;
        }
        else {
            this.media = document.createElement('audio');
        }
        this.subscriptions.push(
        // Track the first play() call
        this.onceMediaEvent('play', () => {
            this.hasPlayedOnce = true;
        }));
        // Autoplay
        if (options.autoplay) {
            this.media.autoplay = true;
        }
        // Speed
        if (options.playbackRate != null) {
            this.media.playbackRate = options.playbackRate;
        }
    }
    onMediaEvent(event, callback, options) {
        this.media.addEventListener(event, callback, options);
        return () => this.media.removeEventListener(event, callback);
    }
    onceMediaEvent(event, callback) {
        return this.onMediaEvent(event, callback, { once: true });
    }
    loadUrl(src) {
        this.media.src = src;
    }
    destroy() {
        this.media.pause();
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        if (!this.isExternalMedia) {
            this.media.remove();
        }
    }
    /** Start playing the audio */
    play() {
        this.media.play();
    }
    /** Pause the audio */
    pause() {
        this.media.pause();
    }
    /** Check if the audio is playing */
    isPlaying() {
        return this.media.currentTime > 0 && !this.media.paused && !this.media.ended;
    }
    /** Skip to a time position in seconds */
    seekTo(time) {
        // iOS Safari requires a play() call before seeking
        if (!this.hasPlayedOnce && navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
            this.media.play()?.then?.(() => {
                setTimeout(() => this.media.pause(), 10);
            });
        }
        this.media.currentTime = time;
    }
    /** Get the duration of the audio in seconds */
    getDuration() {
        return this.media.duration;
    }
    /** Get the current audio position in seconds */
    getCurrentTime() {
        return this.media.currentTime;
    }
    /** Get the audio volume */
    getVolume() {
        return this.media.volume;
    }
    /** Set the audio volume */
    setVolume(volume) {
        this.media.volume = volume;
    }
    /** Get the audio muted state */
    getMuted() {
        return this.media.muted;
    }
    /** Mute or unmute the audio */
    setMuted(muted) {
        this.media.muted = muted;
    }
    /** Get the playback speed */
    getPlaybackRate() {
        return this.media.playbackRate;
    }
    /** Set the playback speed, pass an optional false to NOT preserve the pitch */
    setPlaybackRate(rate, preservePitch) {
        // preservePitch is true by default in most browsers
        if (preservePitch != null) {
            this.media.preservesPitch = preservePitch;
        }
        this.media.playbackRate = rate;
    }
    /** Get the HTML media element */
    getMediaElement() {
        return this.media;
    }
}
export default Player;
