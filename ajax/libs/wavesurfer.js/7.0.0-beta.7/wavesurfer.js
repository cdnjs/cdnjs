import Decoder from './decoder.js';
import Fetcher from './fetcher.js';
import Player from './player.js';
import Renderer from './renderer.js';
import Timer from './timer.js';
const defaultOptions = {
    waveColor: '#999',
    progressColor: '#555',
    cursorWidth: 1,
    minPxPerSec: 0,
    fillParent: true,
    interact: true,
    autoScroll: true,
    autoCenter: true,
    sampleRate: 8000,
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
        this.subscriptions = [];
        this.options = Object.assign({}, defaultOptions, options);
        this.timer = new Timer();
        this.renderer = new Renderer(this.options);
        this.initPlayerEvents();
        this.initRendererEvents();
        this.initTimerEvents();
        this.initPlugins();
        const url = this.options.url || this.options.media?.currentSrc || this.options.media?.src;
        if (url) {
            this.load(url, this.options.peaks, this.options.duration);
        }
    }
    setOptions(options) {
        this.options = { ...this.options, ...options };
        this.renderer.setOptions(this.options);
        if (options.audioRate) {
            this.setPlaybackRate(options.audioRate);
        }
    }
    initPlayerEvents() {
        this.subscriptions.push(this.onMediaEvent('timeupdate', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), this.isPlaying());
            this.emit('timeupdate', currentTime);
        }), this.onMediaEvent('play', () => {
            this.emit('play');
            this.timer.start();
        }), this.onMediaEvent('pause', () => {
            this.emit('pause');
            this.timer.stop();
        }), this.onMediaEvent('ended', () => {
            this.emit('finish');
        }), this.onMediaEvent('seeking', () => {
            this.emit('seeking', this.getCurrentTime());
        }));
    }
    initRendererEvents() {
        this.subscriptions.push(
        // Seek on click
        this.renderer.on('click', (relativeX) => {
            if (this.options.interact) {
                this.seekTo(relativeX);
                this.emit('interaction');
                this.emit('click', relativeX);
            }
        }), 
        // Scroll
        this.renderer.on('scroll', (startX, endX) => {
            const duration = this.getDuration();
            this.emit('scroll', startX * duration, endX * duration);
        }), 
        // Redraw
        this.renderer.on('render', () => {
            this.emit('redraw');
        }));
        // Drag
        {
            let debounce;
            this.subscriptions.push(this.renderer.on('drag', (relativeX) => {
                if (!this.options.interact)
                    return;
                // Update the visual position
                this.renderer.renderProgress(relativeX);
                // Set the audio position with a debounce
                clearTimeout(debounce);
                debounce = setTimeout(() => {
                    this.seekTo(relativeX);
                }, this.isPlaying() ? 0 : 200);
                this.emit('interaction');
                this.emit('drag', relativeX);
            }));
        }
    }
    initTimerEvents() {
        // The timer fires every 16ms for a smooth progress animation
        this.subscriptions.push(this.timer.on('tick', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), true);
            this.emit('timeupdate', currentTime);
            this.emit('audioprocess', currentTime);
        }));
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
        plugin.init(this);
        this.plugins.push(plugin);
        return plugin;
    }
    /** For plugins only: get the waveform wrapper div */
    getWrapper() {
        return this.renderer.getWrapper();
    }
    /** Get the current scroll position in pixels */
    getScroll() {
        return this.renderer.getScroll();
    }
    /** Get all registered plugins */
    getActivePlugins() {
        return this.plugins;
    }
    /** Load an audio file by URL, with optional pre-decoded audio data */
    async load(url, channelData, duration) {
        this.decodedData = null;
        this.emit('load', url);
        if (channelData) {
            // Set the mediaelement source to the URL
            this.setSrc(url);
            // Pre-decoded audio data
            if (!duration) {
                // Wait for the audio duration
                duration =
                    (await new Promise((resolve) => {
                        this.onceMediaEvent('loadedmetadata', () => resolve(this.getMediaElement().duration));
                    })) || 0;
            }
            this.decodedData = Decoder.createBuffer(channelData, duration);
        }
        else {
            // Fetch and decode the audio of no pre-computed audio data is provided
            const audio = await Fetcher.fetchArrayBuffer(url);
            this.setSrc(url, audio);
            this.decodedData = await Decoder.decode(audio, this.options.sampleRate);
        }
        this.emit('decode', this.getDuration());
        this.emit('ready', this.getDuration());
        this.renderer.render(this.decodedData);
    }
    /** Zoom in or out */
    zoom(minPxPerSec) {
        if (!this.decodedData) {
            throw new Error('No audio loaded');
        }
        this.renderer.zoom(minPxPerSec);
        this.emit('zoom', minPxPerSec);
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
    async playPause() {
        return this.isPlaying() ? this.pause() : this.play();
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
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.plugins.forEach((plugin) => plugin.destroy());
        this.timer.destroy();
        this.renderer.destroy();
        super.destroy();
    }
}
export default WaveSurfer;
