import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    constructor(params, options) {
        super();
        this.subscriptions = [];
        this.wavesurfer = params.wavesurfer;
        this.container = params.container;
        this.options = options;
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
