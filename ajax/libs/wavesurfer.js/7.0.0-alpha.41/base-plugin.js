import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    constructor(options) {
        super();
        this.subscriptions = [];
        this.options = options;
    }
    init(params) {
        this.wavesurfer = params.wavesurfer;
        this.container = params.container;
        this.wrapper = params.wrapper;
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
