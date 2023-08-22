import { Connectable, Statable } from '/src/interfaces';
/**
 * This class is superclass for effector classes.
 * Also, this class is used for implementing custom effector.
 * @constructor
 * @abstract
 * @implements {Connectable}
 * @implements {Statable}
 */
export declare abstract class Effector implements Connectable, Statable {
    protected context: AudioContext;
    protected input: GainNode;
    protected output: GainNode;
    protected lfo: OscillatorNode;
    protected depth: GainNode;
    protected rate: AudioParam;
    protected isActive: boolean;
    protected paused: boolean;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method starts LFO. Namely, this method starts effector.
     * @param {number} startTime This argument is in order to schedule parameter.
     */
    start(startTime?: number): void;
    /**
     * This method stops LFO, then creates instance of `OscillatorNode` again.
     * @param {number} stopTime This argument is in order to schedule parameter.
     * @param {number} releaseTime This argument is in order to schedule parameter when it is necessary to consider release time.
     */
    stop(stopTime?: number, releaseTime?: number): void;
    /**
     * This method connects `AudioNode`s for effector.
     * @return {GainNode} Return value is for `connect` method chain.
     * @abstract
     */
    abstract connect(): GainNode;
    /**
     * This method gets effector's parameters as associative array.
     * @abstract
     */
    abstract params(): void;
    /**
     * This method gets effector's parameters as JSON.
     * @return {string}
     */
    toJSON(): string;
    /**
     * This method gets effector state. If returns `true`, effector is active.
     * @return {boolean}
     */
    state(): boolean;
    /**
     * This method activates effector.
     * @return {Effector} Return value is for method chain.
     */
    activate(): Effector;
    /**
     * This method deactivates effector.
     * @return {Effector} Return value is for method chain.
     */
    deactivate(): Effector;
    /**
     * Connector for input.
     */
    get INPUT(): GainNode;
    /**
     * Connector for output.
     */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=Effector.d.ts.map