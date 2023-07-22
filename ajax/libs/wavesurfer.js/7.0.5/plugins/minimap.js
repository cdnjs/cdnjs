/**
 * Minimap is a tiny copy of the main waveform serving as a navigation tool.
 */
import BasePlugin from '../base-plugin.js';
import WaveSurfer from '../wavesurfer.js';
const defaultOptions = {
    height: 50,
    overlayColor: 'rgba(100, 100, 100, 0.1)',
    insertPosition: 'afterend',
};
class MinimapPlugin extends BasePlugin {
    constructor(options) {
        super(options);
        this.miniWavesurfer = null;
        this.container = null;
        this.options = Object.assign({}, defaultOptions, options);
        this.minimapWrapper = this.initMinimapWrapper();
        this.overlay = this.initOverlay();
    }
    static create(options) {
        return new MinimapPlugin(options);
    }
    /** Called by wavesurfer, don't call manually */
    onInit() {
        var _a, _b;
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        if (this.options.container) {
            if (typeof this.options.container === 'string') {
                this.container = document.querySelector(this.options.container);
            }
            else if (this.options.container instanceof HTMLElement) {
                this.container = this.options.container;
            }
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(this.minimapWrapper);
        }
        else {
            this.container = this.wavesurfer.getWrapper().parentElement;
            (_b = this.container) === null || _b === void 0 ? void 0 : _b.insertAdjacentElement(this.options.insertPosition, this.minimapWrapper);
        }
        this.initWaveSurferEvents();
    }
    initMinimapWrapper() {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.setAttribute('part', 'minimap');
        return div;
    }
    initOverlay() {
        const div = document.createElement('div');
        div.setAttribute('style', 'position: absolute; z-index: 2; left: 0; top: 0; bottom: 0; transition: left 100ms ease-out; pointer-events: none;');
        div.style.backgroundColor = this.options.overlayColor;
        this.minimapWrapper.appendChild(div);
        return div;
    }
    initMinimap() {
        if (this.miniWavesurfer) {
            this.miniWavesurfer.destroy();
            this.miniWavesurfer = null;
        }
        if (!this.wavesurfer)
            return;
        const data = this.wavesurfer.getDecodedData();
        const media = this.wavesurfer.getMediaElement();
        if (!data || !media)
            return;
        this.miniWavesurfer = WaveSurfer.create(Object.assign(Object.assign({}, this.options), { container: this.minimapWrapper, minPxPerSec: 0, fillParent: true, media, peaks: [data.getChannelData(0)], duration: data.duration }));
        this.subscriptions.push(this.miniWavesurfer.on('ready', () => {
            this.emit('ready');
        }), this.miniWavesurfer.on('interaction', () => {
            this.emit('interaction');
        }));
    }
    getOverlayWidth() {
        var _a;
        const waveformWidth = ((_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.getWrapper().clientWidth) || 1;
        return Math.round((this.minimapWrapper.clientWidth / waveformWidth) * 100);
    }
    onRedraw() {
        const overlayWidth = this.getOverlayWidth();
        this.overlay.style.width = `${overlayWidth}%`;
    }
    onScroll(startTime) {
        if (!this.wavesurfer)
            return;
        const duration = this.wavesurfer.getDuration();
        this.overlay.style.left = `${(startTime / duration) * 100}%`;
    }
    initWaveSurferEvents() {
        if (!this.wavesurfer)
            return;
        this.subscriptions.push(this.wavesurfer.on('decode', () => {
            this.initMinimap();
        }), this.wavesurfer.on('scroll', (startTime) => {
            this.onScroll(startTime);
        }), this.wavesurfer.on('redraw', () => {
            this.onRedraw();
        }));
    }
    /** Unmount */
    destroy() {
        var _a;
        (_a = this.miniWavesurfer) === null || _a === void 0 ? void 0 : _a.destroy();
        this.minimapWrapper.remove();
        super.destroy();
    }
}
export default MinimapPlugin;
