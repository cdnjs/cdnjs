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
    options;
    fetcher;
    decoder;
    renderer;
    timer;
    plugins = [];
    decodedData = null;
    canPlay = false;
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
        this.options = Object.assign({}, defaultOptions, options);
        this.fetcher = new Fetcher();
        this.decoder = new Decoder();
        this.timer = new Timer();
        this.renderer = new Renderer({
            container: this.options.container,
            height: this.options.height,
            waveColor: this.options.waveColor,
            progressColor: this.options.progressColor,
            cursorColor: this.options.cursorColor,
            cursorWidth: this.options.cursorWidth,
            minPxPerSec: this.options.minPxPerSec,
            fillParent: this.options.fillParent,
            barWidth: this.options.barWidth,
            barGap: this.options.barGap,
            barRadius: this.options.barRadius,
            hideScrollbar: this.options.hideScrollbar,
        });
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
    initPlayerEvents() {
        this.subscriptions.push(this.onMediaEvent('timeupdate', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), this.options.autoCenter && this.isPlaying());
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
        plugin.once('destroy', () => {
            this.plugins = this.plugins.filter((p) => p !== plugin);
        });
        return plugin;
    }
    /** Load an audio file by URL, with optional pre-decoded audio data */
    async load(url, channelData, duration) {
        this.decodedData = null;
        this.canPlay = false;
        this.loadUrl(url);
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
            this.decodedData = {
                duration,
                numberOfChannels: channelData.length,
                sampleRate: channelData[0].length / duration,
                getChannelData: (i) => channelData[i],
            };
        }
        this.renderer.render(this.decodedData);
        this.emit('decode', { duration: this.decodedData.duration });
    }
    /** Zoom in or out */
    zoom(minPxPerSec) {
        if (!this.decodedData) {
            throw new Error('No audio loaded');
        }
        this.renderer.zoom(this.decodedData, minPxPerSec);
        this.emit('zoom', { minPxPerSec });
    }
    /** Get the decoded audio data */
    getDecodedData() {
        return this.decodedData;
    }
    getDuration() {
        return this.decodedData?.duration || this.getMediaElement()?.duration || 0;
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
    /** Skip a number of seconds from the current position (use a negative value to go backwards) */
    skip(seconds) {
        const time = this.getCurrentTime() + seconds;
        this.setTime(time);
    }
    /** Stop the audio and go to the beginning */
    stop() {
        this.pause();
        this.setTime(0);
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
