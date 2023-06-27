import BasePlugin from '../base-plugin.js';
import WaveSurfer from '../wavesurfer.js';
const defaultOptions = {
    height: 50,
    overlayColor: 'rgba(100, 100, 100, 0.1)',
};
class MinimapPlugin extends BasePlugin {
    options;
    minimapWrapper;
    miniWavesurfer = null;
    overlay;
    constructor(options) {
        super(options);
        this.options = Object.assign({}, defaultOptions, options);
        this.minimapWrapper = this.initMinimapWrapper();
        this.overlay = this.initOverlay();
    }
    static create(options) {
        return new MinimapPlugin(options);
    }
    init(params) {
        super.init(params);
        if (!this.wavesurfer) {
            throw Error('WaveSurfer is not initialized');
        }
        this.container?.insertAdjacentElement('afterend', this.minimapWrapper);
        this.subscriptions.push(this.wavesurfer.on('decode', () => {
            this.initMinimap();
        }));
    }
    initMinimapWrapper() {
        const div = document.createElement('div');
        div.style.position = 'relative';
        return div;
    }
    initOverlay() {
        const div = document.createElement('div');
        div.setAttribute('style', 'position: absolute; z-index: 2; left: 0; top: 0; bottom: 0;');
        div.style.backgroundColor = this.options.overlayColor;
        this.minimapWrapper.appendChild(div);
        return div;
    }
    initMinimap() {
        if (!this.wavesurfer || !this.wrapper)
            return;
        const data = this.wavesurfer.getDecodedData();
        const media = this.wavesurfer.getMediaElement();
        if (!data || !media)
            return;
        this.miniWavesurfer = WaveSurfer.create({
            ...this.options,
            container: this.minimapWrapper,
            minPxPerSec: 1,
            fillParent: true,
            media,
            url: media.src,
            peaks: [data.getChannelData(0)],
            duration: data.duration,
        });
        const overlayWidth = Math.round((this.minimapWrapper.clientWidth / this.wrapper.clientWidth) * 100);
        this.overlay.style.width = `${overlayWidth}%`;
        this.subscriptions.push(this.wavesurfer.on('timeupdate', ({ currentTime }) => {
            const offset = Math.max(0, Math.min((currentTime / data.duration) * 100 - overlayWidth / 2, 100 - overlayWidth)).toFixed(2);
            this.overlay.style.left = `${offset}%`;
        }));
        this.subscriptions.push(this.miniWavesurfer.on('interaction', () => {
            if (this.wavesurfer && this.miniWavesurfer) {
                this.wavesurfer.setTime(this.miniWavesurfer.getCurrentTime());
            }
            if (this.container) {
                this.container.scrollLeft =
                    (this.minimapWrapper.scrollLeft / this.minimapWrapper.scrollWidth) * this.container.scrollWidth;
            }
        }));
    }
    /** Unmount */
    destroy() {
        this.miniWavesurfer?.destroy();
        this.minimapWrapper.remove();
        super.destroy();
    }
}
export default MinimapPlugin;
