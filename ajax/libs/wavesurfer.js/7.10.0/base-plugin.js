import EventEmitter from './event-emitter.js';
/** Base class for wavesurfer plugins */
export class BasePlugin extends EventEmitter {
    /** Create a plugin instance */
    constructor(options) {
        super();
        this.subscriptions = [];
        this.isDestroyed = false;
        this.options = options;
    }
    /** Called after this.wavesurfer is available */
    onInit() {
        return;
    }
    /** Do not call directly, only called by WavesSurfer internally */
    _init(wavesurfer) {
        // Reset state if plugin was previously destroyed
        if (this.isDestroyed) {
            this.subscriptions = [];
            this.isDestroyed = false;
        }
        this.wavesurfer = wavesurfer;
        this.onInit();
    }
    /** Destroy the plugin and unsubscribe from all events */
    destroy() {
        this.emit('destroy');
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.subscriptions = [];
        this.isDestroyed = true;
        this.wavesurfer = undefined;
    }
}
export default BasePlugin;
