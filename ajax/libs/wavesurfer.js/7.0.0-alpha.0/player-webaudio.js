import Player from './player.js';
class WebAudioPlayer extends Player {
    constructor() {
        super(...arguments);
        this.audioCtx = null;
        this.sourceNode = null;
    }
    destroy() {
        var _a, _b;
        (_a = this.sourceNode) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.sourceNode = null;
        (_b = this.audioCtx) === null || _b === void 0 ? void 0 : _b.close();
        this.audioCtx = null;
        super.destroy();
    }
    loadUrl(url) {
        super.loadUrl(url);
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)({
                latencyHint: 'playback',
            });
        }
        if (this.sourceNode) {
            this.sourceNode.disconnect();
        }
        this.sourceNode = this.audioCtx.createMediaElementSource(this.media);
        this.sourceNode.connect(this.audioCtx.destination);
    }
}
export default WebAudioPlayer;
