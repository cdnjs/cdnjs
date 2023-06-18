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
    cursorWidth: 1,
    minPxPerSec: 0,
    fillParent: true,
    interactive: true,
};
class WaveSurfer extends EventEmitter {
    options;
    fetcher;
    decoder;
    renderer;
    player;
    timer;
    plugins = [];
    subscriptions = [];
    decodedData = null;
    /** Create a new WaveSurfer instance */
    static create(options) {
        return new WaveSurfer(options);
    }
    /** Create a new WaveSurfer instance */
    constructor(options) {
        super();
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
            cursorColor: this.options.cursorColor,
            cursorWidth: this.options.cursorWidth,
            minPxPerSec: this.options.minPxPerSec,
            fillParent: this.options.fillParent,
            barWidth: this.options.barWidth,
            barGap: this.options.barGap,
            barRadius: this.options.barRadius,
            noScrollbar: this.options.noScrollbar,
        });
        this.initPlayerEvents();
        this.initRendererEvents();
        this.initTimerEvents();
        this.initReadyEvent();
        const url = this.options.url || this.options.media?.src;
        if (url) {
            this.load(url, this.options.peaks, this.options.duration);
        }
    }
    initPlayerEvents() {
        this.subscriptions.push(this.player.on('timeupdate', () => {
            const currentTime = this.getCurrentTime();
            this.renderer.renderProgress(currentTime / this.getDuration(), this.isPlaying());
            this.emit('timeupdate', { currentTime });
        }), this.player.on('play', () => {
            this.emit('play');
            this.timer.start();
        }), this.player.on('pause', () => {
            this.emit('pause');
            this.timer.stop();
        }), this.player.on('canplay', () => {
            this.emit('canplay', { duration: this.getDuration() });
        }), this.player.on('seeking', () => {
            this.emit('seeking', { currentTime: this.getCurrentTime() });
        }));
    }
    initRendererEvents() {
        // Seek on click
        this.subscriptions.push(this.renderer.on('click', ({ relativeX }) => {
            if (this.options.interactive) {
                const time = this.getDuration() * relativeX;
                this.seekTo(time);
                this.emit('seekClick', { currentTime: this.getCurrentTime() });
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
        let isDecoded = false;
        let isPlayable = false;
        const emitReady = () => {
            if (isDecoded && isPlayable) {
                this.emit('ready', { duration: this.getDuration() });
            }
        };
        this.subscriptions.push(this.on('decode', () => {
            isDecoded = true;
            emitReady();
        }), this.on('canplay', () => {
            isPlayable = true;
            emitReady();
        }), this.player.on('waiting', () => {
            isPlayable = false;
            isDecoded = false;
        }));
    }
    /** Load an audio file by URL, with optional pre-decoded audio data */
    async load(url, channelData, duration) {
        this.player.loadUrl(url);
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
                        this.player.on('canplay', () => resolve(this.getDuration()), {
                            once: true,
                        });
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
        return this.player.getDuration() || this.decodedData?.duration || 0;
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
    registerPlugin(CustomPlugin, options) {
        const plugin = new CustomPlugin({
            wavesurfer: this,
            container: this.renderer.getContainer(),
            wrapper: this.renderer.getWrapper(),
        }, options);
        this.plugins.push(plugin);
        return plugin;
    }
    /** Get the decoded audio data */
    getDecodedData() {
        return this.decodedData;
    }
    /** Get the raw media element */
    getMediaElement() {
        return this.player.getMediaElement();
    }
    /** Unmount wavesurfer */
    destroy() {
        this.emit('destroy');
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.plugins.forEach((plugin) => plugin.destroy());
        this.timer.destroy();
        this.player.destroy();
        this.decoder.destroy();
        this.renderer.destroy();
    }
}
export default WaveSurfer;
