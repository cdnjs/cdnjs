var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fetcher from './fetcher.js';
import Decoder from './decoder.js';
import Renderer from './renderer.js';
import Player from './player.js';
import EventEmitter from './event-emitter.js';
import Timer from './timer.js';
const defaultOptions = {
    height: 128,
    waveColor: '#999',
    progressColor: '#555',
    minPxPerSec: 0,
};
export class WaveSurfer extends EventEmitter {
    /** Create a new WaveSurfer instance */
    static create(options) {
        return new WaveSurfer(options);
    }
    /** Create a new WaveSurfer instance */
    constructor(options) {
        var _a;
        super();
        this.plugins = [];
        this.subscriptions = [];
        this.channelData = null;
        this.duration = 0;
        this.options = Object.assign({}, defaultOptions, options);
        this.fetcher = new Fetcher();
        this.decoder = new Decoder();
        this.timer = new Timer();
        this.player = new Player({
            media: this.options.media,
            autoplay: this.options.autoplay,
        });
        this.renderer = new Renderer({
            container: this.options.container,
            height: this.options.height,
            waveColor: this.options.waveColor,
            progressColor: this.options.progressColor,
            minPxPerSec: this.options.minPxPerSec,
            barWidth: this.options.barWidth,
            barGap: this.options.barGap,
            barRadius: this.options.barRadius,
        });
        this.initPlayerEvents();
        this.initRendererEvents();
        this.initTimerEvents();
        const url = this.options.url || ((_a = this.options.media) === null || _a === void 0 ? void 0 : _a.src);
        if (url) {
            this.load(url, this.options.channelData, this.options.duration);
        }
    }
    initPlayerEvents() {
        this.subscriptions.push(this.player.on('timeupdate', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.duration, this.isPlaying());
            this.emit('audioprocess', { currentTime });
        }), this.player.on('play', () => {
            this.emit('play');
            this.timer.start();
        }), this.player.on('pause', () => {
            this.emit('pause');
            this.timer.stop();
        }), this.player.on('canplay', () => {
            this.emit('canplay', { duration: this.getDuration() });
        }), this.player.on('seeking', () => {
            this.emit('seek', { time: this.getCurrentTime() });
        }));
    }
    initRendererEvents() {
        // Seek on click
        this.subscriptions.push(this.renderer.on('click', ({ relativeX }) => {
            const time = this.getDuration() * relativeX;
            this.seekTo(time);
        }));
    }
    initTimerEvents() {
        // The timer fires every 16ms for a smooth progress animation
        this.subscriptions.push(this.timer.on('tick', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.duration, true);
            this.emit('audioprocess', { currentTime });
        }));
    }
    /** Unmount wavesurfer */
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.plugins.forEach((plugin) => plugin.destroy());
        this.timer.destroy();
        this.player.destroy();
        this.decoder.destroy();
        this.renderer.destroy();
    }
    /** Load an audio file by URL, with optional pre-decoded audio data */
    load(url, channelData, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.loadUrl(url);
            // Fetch and decode the audio of no pre-computed audio data is provided
            if (channelData == null || duration == null) {
                const audio = yield this.fetcher.load(url);
                const data = yield this.decoder.decode(audio);
                channelData = data.channelData;
                duration = data.duration;
            }
            this.channelData = channelData;
            this.duration = duration;
            this.renderer.render(this.channelData, this.duration);
            this.emit('decode', { duration: this.duration });
        });
    }
    /** Zoom in or out */
    zoom(minPxPerSec) {
        if (this.channelData == null || this.duration == null) {
            throw new Error('No audio loaded');
        }
        this.renderer.zoom(this.channelData, this.duration, minPxPerSec);
    }
    /** Start playing the audio */
    play() {
        this.player.play();
    }
    /** Pause the audio */
    pause() {
        this.player.pause();
    }
    /** Skip to a time position in seconds */
    seekTo(time) {
        this.player.seekTo(time);
    }
    /** Check if the audio is playing */
    isPlaying() {
        return this.player.isPlaying();
    }
    /** Get the duration of the audio in seconds */
    getDuration() {
        return this.duration;
    }
    /** Get the current audio position in seconds */
    getCurrentTime() {
        return this.player.getCurrentTime();
    }
    /** Get the audio volume */
    getVolume() {
        return this.player.getVolume();
    }
    /** Set the audio volume */
    setVolume(volume) {
        this.player.setVolume(volume);
    }
    /** Get the audio muted state */
    getMuted() {
        return this.player.getMuted();
    }
    /** Mute or unmute the audio */
    setMuted(muted) {
        this.player.setMuted(muted);
    }
    /** Get playback rate */
    getPlaybackRate() {
        return this.player.getPlaybackRate();
    }
    /** Set playback rate, with an optional parameter to NOT preserve the pitch if false */
    setPlaybackRate(rate, preservePitch) {
        this.player.setPlaybackRate(rate, preservePitch);
    }
    /** Register and initialize a plugin */
    registerPlugin(CustomPlugin) {
        const plugin = new CustomPlugin({
            wavesurfer: this,
            container: this.renderer.getContainer(),
        });
        this.plugins.push(plugin);
        return plugin;
    }
    /** Get the decoded audio data */
    getAudioData() {
        return this.channelData;
    }
}
export default WaveSurfer;
