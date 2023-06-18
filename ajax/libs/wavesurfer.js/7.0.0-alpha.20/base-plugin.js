import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    wavesurfer;
    container;
    wrapper;
    subscriptions = [];
    options;
    constructor(params, options) {
        super();
        this.wavesurfer = params.wavesurfer;
        this.container = params.container;
        this.wrapper = params.wrapper;
        this.options = options;
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
