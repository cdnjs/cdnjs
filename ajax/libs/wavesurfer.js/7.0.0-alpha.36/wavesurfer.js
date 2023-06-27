import Fetcher from './fetcher.js';
import Decoder from './decoder.js';
import Renderer from './renderer.js';
import Player from './player.js';
import Timer from './timer.js';
const defaultOptions = {
    height: 128,
    waveColor: '#999',
    progressColor: '#555',
    cursorWidth: 1,
    minPxPerSec: 0,
    fillParent: true,
    interact: true,
    autoCenter: true,
};
class WaveSurfer extends Player {
    /** Create a new WaveSurfer instance */
    static create(options) {
        return new WaveSurfer(options);
    }
    /** Create a new WaveSurfer instance */
    constructor(options) {
        super({
            media: options.media,
            autoplay: options.autoplay,
            playbackRate: options.audioRate,
        });
        this.plugins = [];
        this.decodedData = null;
        this.canPlay = false;
        this.options = Object.assign({}, defaultOptions, options);
        this.fetcher = new Fetcher();
        this.decoder = new Decoder();
        this.timer = new Timer();
        this.renderer = new Renderer({
            container: this.options.container,
        }, this.options);
        this.initPlayerEvents();
        this.initRendererEvents();
        this.initTimerEvents();
        this.initReadyEvent();
        this.initPlugins();
        const url = this.options.url || this.options.media?.src;
        if (url) {
            this.load(url, this.options.peaks, this.options.duration);
        }
    }
    setOptions(options) {
        this.options = { ...this.options, ...options };
        this.renderer.setOptions(this.options);
    }
    initPlayerEvents() {
        this.subscriptions.push(this.onMediaEvent('timeupdate', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), this.isPlaying());
            this.emit('timeupdate', { currentTime });
        }), this.onMediaEvent('play', () => {
            this.emit('play');
            this.timer.start();
        }), this.onMediaEvent('pause', () => {
            this.emit('pause');
            this.timer.stop();
            if (this.getCurrentTime() >= this.getDuration()) {
                this.emit('finish');
            }
        }), this.onMediaEvent('canplay', () => {
            this.canPlay = true;
            this.emit('canplay', { duration: this.getDuration() });
        }), this.onMediaEvent('seeking', () => {
            this.emit('seeking', { currentTime: this.getCurrentTime() });
        }));
    }
    initRendererEvents() {
        // Seek on click
        this.subscriptions.push(this.renderer.on('click', ({ relativeX }) => {
            if (this.options.interact) {
                this.seekTo(relativeX);
                this.emit('interaction');
            }
        }));
    }
    initTimerEvents() {
        // The timer fires every 16ms for a smooth progress animation
        this.subscriptions.push(this.timer.on('tick', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), true);
            this.emit('timeupdate', { currentTime });
        }));
    }
    initReadyEvent() {
        const emitReady = () => {
            if (this.decodedData && this.canPlay) {
                this.emit('ready', { duration: this.getDuration() });
            }
        };
        this.subscriptions.push(this.on('decode', emitReady), this.on('canplay', emitReady));
    }
    initPlugins() {
        if (!this.options.plugins?.length)
            return;
        this.options.plugins.forEach((plugin) => {
            this.registerPlugin(plugin);
        });
    }
    /** Register a wavesurfer.js plugin */
    registerPlugin(plugin) {
        plugin.init({
            wavesurfer: this,
            container: this.renderer.getContainer(),
            wrapper: this.renderer.getWrapper(),
        });
        this.plugins.push(plugin);
        return plugin;
    }
    /** Get all registered plugins */
    getActivePlugins() {
        return this.plugins;
    }
    /** Load an audio file by URL, with optional pre-decoded audio data */
    async load(url, channelData, duration) {
        this.decodedData = null;
        this.canPlay = false;
        this.loadUrl(url);
        this.emit('loading', { url });
        // Fetch and decode the audio of no pre-computed audio data is provided
        if (channelData == null) {
            const audio = await this.fetcher.load(url);
            const data = await this.decoder.decode(audio);
            this.decodedData = data;
        }
        else {
            if (!duration) {
                duration =
                    (await new Promise((resolve) => {
                        this.onceMediaEvent('loadedmetadata', () => resolve(this.getDuration()));
                    })) || 0;
            }
            this.decodedData = this.decoder.createBuffer(channelData, duration);
        }
        this.renderAudio();
        this.emit('decode', { duration: this.getDuration() });
        this.emit('redraw');
    }
    renderAudio() {
        if (!this.decodedData)
            return;
        // Only the first two channels are used
        const channelData = [this.decodedData.getChannelData(0)];
        if (this.decodedData.numberOfChannels > 1) {
            channelData.push(this.decodedData.getChannelData(1));
        }
        this.renderer.render(channelData, this.decodedData.duration);
    }
    /** Zoom in or out */
    zoom(minPxPerSec) {
        if (!this.decodedData) {
            throw new Error('No audio loaded');
        }
        this.renderer.zoom(minPxPerSec);
        this.emit('zoom', { minPxPerSec });
    }
    /** Get the decoded audio data */
    getDecodedData() {
        return this.decodedData;
    }
    /** Get the duration of the audio in seconds */
    getDuration() {
        const audioDuration = super.getDuration();
        return audioDuration > 0 && audioDuration < Infinity ? audioDuration : this.decodedData?.duration || 0;
    }
    /** Toggle if the waveform should react to clicks */
    toggleInteraction(isInteractive) {
        this.options.interact = isInteractive;
    }
    /** Seeks to a percentage of audio as [0..1] (0 = beginning, 1 = end) */
    seekTo(progress) {
        const time = this.getDuration() * progress;
        this.setTime(time);
    }
    /** Play or pause the audio */
    playPause() {
        if (this.isPlaying()) {
            this.pause();
            return Promise.resolve();
        }
        else {
            return this.play();
        }
    }
    /** Stop the audio and go to the beginning */
    stop() {
        this.pause();
        this.setTime(0);
    }
    /** Skip N or -N seconds from the current positions */
    skip(seconds) {
        this.setTime(this.getCurrentTime() + seconds);
    }
    /** Empty the waveform by loading a tiny silent audio */
    empty() {
        this.load('', [[0]], 0.001);
    }
    /** Unmount wavesurfer */
    destroy() {
        this.emit('destroy');
        this.plugins.forEach((plugin) => plugin.destroy());
        this.timer.destroy();
        this.decoder.destroy();
        this.renderer.destroy();
        super.destroy();
    }
}
export default WaveSurfer;
