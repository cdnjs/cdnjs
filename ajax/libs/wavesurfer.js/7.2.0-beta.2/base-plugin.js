import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    constructor(options) {
        super();
        this.subscriptions = [];
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
        this.emit('destroy');
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
