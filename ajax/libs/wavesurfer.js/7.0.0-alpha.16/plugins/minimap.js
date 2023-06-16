import BasePlugin from '../base-plugin.js';
import { WaveSurfer } from '../index.js';
const defaultOptions = {
    height: 50,
    overlayColor: 'rgba(100, 100, 100, 0.1)',
};
class TimelinePlugin extends BasePlugin {
    constructor(params, options) {
        super(params, options);
        this.miniWavesurfer = null;
        this.options = Object.assign({}, defaultOptions, options);
        this.minimapWrapper = this.initMinimapWrapper();
        this.overlay = this.initOverlay();
        this.subscriptions.push(this.wavesurfer.on('decode', () => {
            this.initMinimap();
        }));
    }
    initMinimapWrapper() {
        const div = document.createElement('div');
        div.style.position = 'relative';
        this.container.appendChild(div);
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
        const data = this.wavesurfer.getDecodedData();
        const media = this.wavesurfer.getMediaElement();
        if (!data || !media)
            return;
        this.miniWavesurfer = WaveSurfer.create(Object.assign(Object.assign({}, this.options), { container: this.minimapWrapper, minPxPerSec: 1, fillParent: true, media, url: media.src, peaks: [data.getChannelData(0)], duration: data.duration }));
        const overlayWidth = Math.round((this.minimapWrapper.clientWidth / this.wrapper.clientWidth) * 100);
        this.overlay.style.width = `${overlayWidth}%`;
        this.wavesurfer.on('timeupdate', ({ currentTime }) => {
            const offset = Math.max(0, Math.min((currentTime / this.wavesurfer.getDuration()) * 100 - overlayWidth / 2, 100 - overlayWidth)).toFixed(2);
            this.overlay.style.left = `${offset}%`;
        });
    }
    /** Unmount */
    destroy() {
        var _a;
        (_a = this.miniWavesurfer) === null || _a === void 0 ? void 0 : _a.destroy();
        this.minimapWrapper.remove();
        super.destroy();
    }
}
export default TimelinePlugin;
