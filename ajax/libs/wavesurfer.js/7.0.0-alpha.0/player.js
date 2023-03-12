class Player {
    constructor({ media }) {
        this.isExternalMedia = false;
        if (media) {
            this.media = media;
            this.isExternalMedia = true;
        }
        else {
            this.media = document.createElement('audio');
        }
    }
    on(event, callback) {
        this.media.addEventListener(event, callback);
        return () => this.media.removeEventListener(event, callback);
    }
    destroy() {
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
        this.media.currentTime = time;
    }
}
export default Player;
