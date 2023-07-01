import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    wavesurfer;
    subscriptions = [];
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    onInit() {
        // Overridden in plugin definition
        return;
    }
    init(wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.onInit();
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
