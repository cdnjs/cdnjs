var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmitter from './event-emitter.js';
/**
 * A Web Audio buffer player emulating the behavior of an HTML5 Audio element.
 */
class WebAudioPlayer extends EventEmitter {
    constructor(audioContext = new AudioContext()) {
        super();
        this.bufferNode = null;
        this.autoplay = false;
        this.playStartTime = 0;
        this.playedDuration = 0;
        this._muted = false;
        this.buffer = null;
        this.currentSrc = '';
        this.paused = true;
        this.crossOrigin = null;
        this.audioContext = audioContext;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    get src() {
        return this.currentSrc;
    }
    set src(value) {
        this.currentSrc = value;
        fetch(value)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
            this.buffer = audioBuffer;
            this.emit('loadedmetadata');
            this.emit('canplay');
            if (this.autoplay)
                this.play();
        });
    }
    _play() {
        var _a;
        if (!this.paused)
            return;
        this.paused = false;
        (_a = this.bufferNode) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.bufferNode = this.audioContext.createBufferSource();
        this.bufferNode.buffer = this.buffer;
        this.bufferNode.connect(this.gainNode);
        if (this.playedDuration >= this.duration) {
            this.playedDuration = 0;
        }
        this.bufferNode.start(this.audioContext.currentTime, this.playedDuration);
        this.playStartTime = this.audioContext.currentTime;
        this.bufferNode.onended = () => {
            if (this.currentTime >= this.duration) {
                this.pause();
                this.emit('ended');
            }
        };
    }
    _pause() {
        var _a;
        if (this.paused)
            return;
        this.paused = true;
        (_a = this.bufferNode) === null || _a === void 0 ? void 0 : _a.stop();
        this.playedDuration += this.audioContext.currentTime - this.playStartTime;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this._play();
            this.emit('play');
        });
    }
    pause() {
        this._pause();
        this.emit('pause');
    }
    setSinkId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ac = this.audioContext;
            return ac.setSinkId(deviceId);
        });
    }
    get playbackRate() {
        var _a, _b;
        return (_b = (_a = this.bufferNode) === null || _a === void 0 ? void 0 : _a.playbackRate.value) !== null && _b !== void 0 ? _b : 1;
    }
    set playbackRate(value) {
        if (this.bufferNode) {
            this.bufferNode.playbackRate.value = value;
        }
    }
    get currentTime() {
        return this.paused ? this.playedDuration : this.playedDuration + this.audioContext.currentTime - this.playStartTime;
    }
    set currentTime(value) {
        this.emit('seeking');
        if (this.paused) {
            this.playedDuration = value;
        }
        else {
            this._pause();
            this.playedDuration = value;
            this._play();
        }
        this.emit('timeupdate');
    }
    get duration() {
        var _a;
        return ((_a = this.buffer) === null || _a === void 0 ? void 0 : _a.duration) || 0;
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
    /** Get the GainNode used to play the audio. Can be used to attach filters. */
    getGainNode() {
        return this.gainNode;
    }
}
export default WebAudioPlayer;
