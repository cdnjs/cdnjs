import EventEmitter from './event-emitter.js';
/**
 * A Web Audio buffer player emulating the behavior of an HTML5 Audio element.
 */
class WebAudioPlayer extends EventEmitter {
    audioContext;
    gainNode;
    bufferNode = null;
    playStartTime = 0;
    playedDuration = 0;
    _muted = false;
    _playbackRate = 1;
    _duration = undefined;
    buffer = null;
    currentSrc = '';
    paused = true;
    crossOrigin = null;
    seeking = false;
    autoplay = false;
    constructor(audioContext = new AudioContext()) {
        super();
        this.audioContext = audioContext;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
    }
    /** Subscribe to an event. Returns an unsubscribe function. */
    addEventListener = this.on;
    /** Unsubscribe from an event */
    removeEventListener = this.un;
    async load() {
        return;
    }
    get src() {
        return this.currentSrc;
    }
    set src(value) {
        this.currentSrc = value;
        this._duration = undefined;
        if (!value) {
            this.buffer = null;
            this.emit('emptied');
            return;
        }
        fetch(value)
            .then((response) => {
            if (response.status >= 400) {
                throw new Error(`Failed to fetch ${value}: ${response.status} (${response.statusText})`);
            }
            return response.arrayBuffer();
        })
            .then((arrayBuffer) => {
            if (this.currentSrc !== value)
                return null;
            return this.audioContext.decodeAudioData(arrayBuffer);
        })
            .then((audioBuffer) => {
            if (this.currentSrc !== value)
                return;
            this.buffer = audioBuffer;
            this.emit('loadedmetadata');
            this.emit('canplay');
            if (this.autoplay)
                this.play();
        });
    }
    _play() {
        if (!this.paused)
            return;
        this.paused = false;
        this.bufferNode?.disconnect();
        this.bufferNode = this.audioContext.createBufferSource();
        if (this.buffer) {
            this.bufferNode.buffer = this.buffer;
        }
        this.bufferNode.playbackRate.value = this._playbackRate;
        this.bufferNode.connect(this.gainNode);
        let currentPos = this.playedDuration * this._playbackRate;
        if (currentPos >= this.duration) {
            currentPos = 0;
            this.playedDuration = 0;
        }
        this.bufferNode.start(this.audioContext.currentTime, currentPos);
        this.playStartTime = this.audioContext.currentTime;
        this.bufferNode.onended = () => {
            if (this.currentTime >= this.duration) {
                this.pause();
                this.emit('ended');
            }
        };
    }
    _pause() {
        this.paused = true;
        this.bufferNode?.stop();
        this.playedDuration += this.audioContext.currentTime - this.playStartTime;
    }
    async play() {
        if (!this.paused)
            return;
        this._play();
        this.emit('play');
    }
    pause() {
        if (this.paused)
            return;
        this._pause();
        this.emit('pause');
    }
    stopAt(timeSeconds) {
        const delay = timeSeconds - this.currentTime;
        this.bufferNode?.stop(this.audioContext.currentTime + delay);
        this.bufferNode?.addEventListener('ended', () => {
            this.bufferNode = null;
            this.pause();
        }, { once: true });
    }
    async setSinkId(deviceId) {
        const ac = this.audioContext;
        return ac.setSinkId(deviceId);
    }
    get playbackRate() {
        return this._playbackRate;
    }
    set playbackRate(value) {
        this._playbackRate = value;
        if (this.bufferNode) {
            this.bufferNode.playbackRate.value = value;
        }
    }
    get currentTime() {
        const time = this.paused
            ? this.playedDuration
            : this.playedDuration + (this.audioContext.currentTime - this.playStartTime);
        return time * this._playbackRate;
    }
    set currentTime(value) {
        const wasPlaying = !this.paused;
        wasPlaying && this._pause();
        this.playedDuration = value / this._playbackRate;
        wasPlaying && this._play();
        this.emit('seeking');
        this.emit('timeupdate');
    }
    get duration() {
        return this._duration ?? (this.buffer?.duration || 0);
    }
    set duration(value) {
        this._duration = value;
    }
    get volume() {
        return this.gainNode.gain.value;
    }
    set volume(value) {
        this.gainNode.gain.value = value;
        this.emit('volumechange');
    }
    get muted() {
        return this._muted;
    }
    set muted(value) {
        if (this._muted === value)
            return;
        this._muted = value;
        if (this._muted) {
            this.gainNode.disconnect();
        }
        else {
            this.gainNode.connect(this.audioContext.destination);
        }
    }
    canPlayType(mimeType) {
        return /^(audio|video)\//.test(mimeType);
    }
    /** Get the GainNode used to play the audio. Can be used to attach filters. */
    getGainNode() {
        return this.gainNode;
    }
    /** Get decoded audio */
    getChannelData() {
        const channels = [];
        if (!this.buffer)
            return channels;
        const numChannels = this.buffer.numberOfChannels;
        for (let i = 0; i < numChannels; i++) {
            channels.push(this.buffer.getChannelData(i));
        }
        return channels;
    }
}
export default WebAudioPlayer;
