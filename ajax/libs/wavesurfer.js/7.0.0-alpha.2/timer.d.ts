import EventEmitter from './event-emitter.js';
type TimerEvents = {
    tick: void;
};
declare class Timer extends EventEmitter<TimerEvents> {
    private unsubscribe;
    constructor();
    destroy(): void;
}
export default Timer;
