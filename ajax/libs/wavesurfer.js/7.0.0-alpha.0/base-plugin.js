import EventEmitter from './event-emitter.js';
export class BasePlugin extends EventEmitter {
    constructor(params) {
        super();
        this.subscriptions = [];
        this.wavesurfer = params.wavesurfer;
        this.renderer = params.renderer;
    }
    destroy() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
    }
}
export default BasePlugin;
