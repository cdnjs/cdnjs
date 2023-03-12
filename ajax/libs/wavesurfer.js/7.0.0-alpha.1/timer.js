import EventEmitter from './event-emitter.js';
class Timer extends EventEmitter {
    constructor() {
        super();
        this.unsubscribe = () => undefined;
        this.unsubscribe = this.on('tick', () => {
            requestAnimationFrame(() => {
                this.emit('tick');
            });
        });
        this.emit('tick');
    }
    destroy() {
        this.unsubscribe();
    }
}
export default Timer;
