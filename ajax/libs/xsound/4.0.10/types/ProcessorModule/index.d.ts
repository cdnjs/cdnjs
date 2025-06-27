import type { Analyser } from '../SoundModule/Analyser';
import type { Recorder } from '../SoundModule/Recorder';
import type { Autopanner } from '../SoundModule/Effectors/Autopanner';
import type { BitCrusher } from '../SoundModule/Effectors/BitCrusher';
import type { Chorus } from '../SoundModule/Effectors/Chorus';
import type { Compressor } from '../SoundModule/Effectors/Compressor';
import type { Delay } from '../SoundModule/Effectors/Delay';
import type { EnvelopeGenerator } from '../SoundModule/Effectors/EnvelopeGenerator';
import type { Equalizer } from '../SoundModule/Effectors/Equalizer';
import type { Filter } from '../SoundModule/Effectors/Filter';
import type { Flanger } from '../SoundModule/Effectors/Flanger';
import type { Fuzz } from '../SoundModule/Effectors/Fuzz';
import type { Listener } from '../SoundModule/Effectors/Listener';
import type { NoiseGate } from '../SoundModule/Effectors/NoiseGate';
import type { NoiseSuppressor } from '../SoundModule/Effectors/NoiseSuppressor';
import type { OverDrive } from '../SoundModule/Effectors/OverDrive';
import type { Panner } from '../SoundModule/Effectors/Panner';
import type { Phaser } from '../SoundModule/Effectors/Phaser';
import type { PitchShifter } from '../SoundModule/Effectors/PitchShifter';
import type { Preamp } from '../SoundModule/Effectors/Preamp';
import type { Reverb } from '../SoundModule/Effectors/Reverb';
import type { Ringmodulator } from '../SoundModule/Effectors/Ringmodulator';
import type { Stereo } from '../SoundModule/Effectors/Stereo';
import type { Tremolo } from '../SoundModule/Effectors/Tremolo';
import type { VocalCanceler } from '../SoundModule/Effectors/VocalCanceler';
import type { Wah } from '../SoundModule/Effectors/Wah';
import { SoundModule } from '../SoundModule';
/**
 * This subclass is for using `AudioWorkletNode` as sound source.
 */
export declare class ProcessorModule extends SoundModule {
    private processorName;
    private options;
    private moduleURL;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method sets registered processor name and options for `AudioWorkletNode` constructor.
     * @param {string} processorName This argument is name of `AudioWorkletProcessor`.
     * @param {AudioWorkletNodeOptions} options This argument is object based on `AudioWorkletNodeOptions` dictionary.
     * @return {ProcessorModule} Return value is for method chain.
     */
    setup(processorName: string, options?: AudioWorkletNodeOptions): ProcessorModule;
    /**
     * This method adds module for AudioWorklet and creates instance of `AudioWorkletNode`.
     * @param {string} moduleURL This argument is string that contains URL of file (.js) with module to add.
     * @param {WorkletOptions} options This argument is one of 'omit', 'same-origin', 'include'. The default value is 'same-origin'.
     * @return {Promise<void>} Return value is `Promise` that `addModule` returns.
     */
    ready(moduleURL: string, options?: WorkletOptions): Promise<void>;
    /**
     * This method starts sound by connecting to `AudioDestinationNode`.
     * @return {ProcessorModule} Return value is for method chain.
     */
    start(): ProcessorModule;
    /**
     * This method stops sound by disconnecting to `AudioDestinationNode`.
     * @return {ProcessorModule} Return value is for method chain.
     */
    stop(): ProcessorModule;
    /**
     * This method sends message from `MessagePort` that `AudioWorkletNode` has.
     * @param {unknown} data This argument is sent as any data.
     * @return {ProcessorModule} Return value is for method chain.
     */
    postMessage(data: unknown): ProcessorModule;
    /**
     * This method sets event handler that is invoked on receiving message.
     * @param {function} callback This argument is invoked on receiving message.
     * @return {ProcessorModule} Return value is for method chain.
     */
    onMessage(callback: (event: MessageEvent) => void): ProcessorModule;
    /**
     * This method sets event handler that is invoked on receiving message that cannot be deserialized.
     * @param {function} callback This argument is invoked on receiving message that cannot be deserialized.
     * @return {ProcessorModule} Return value is for method chain.
     */
    onMessageError(callback: (event: MessageEvent) => void): ProcessorModule;
    /**
     * This method gets map based on `AudioParamMap`.
     * @return {AudioParamMap|null}
     */
    map(): AudioParamMap;
    /**
     * This method gets instance of `AudioWorkletNode`.
     * @return {AudioWorkletNode|null}
     */
    get(): AudioWorkletNode;
    /**
     * This method gets instance of `Module` (Analyser, Recorder, Effector ... etc).
     * @param {ModuleName} moduleName This argument selects module.
     * @return {Module}
     */
    module(moduleName: 'analyser'): Analyser;
    module(moduleName: 'recorder'): Recorder;
    module(moduleName: 'autopanner'): Autopanner;
    module(moduleName: 'bitcrusher'): BitCrusher;
    module(moduleName: 'chorus'): Chorus;
    module(moduleName: 'compressor'): Compressor;
    module(moduleName: 'delay'): Delay;
    module(moduleName: 'envelopegenerator'): EnvelopeGenerator;
    module(moduleName: 'equalizer'): Equalizer;
    module(moduleName: 'filter'): Filter;
    module(moduleName: 'flanger'): Flanger;
    module(moduleName: 'fuzz'): Fuzz;
    module(moduleName: 'listener'): Listener;
    module(moduleName: 'noisegate'): NoiseGate;
    module(moduleName: 'noisesuppressor'): NoiseSuppressor;
    module(moduleName: 'overdrive'): OverDrive;
    module(moduleName: 'panner'): Panner;
    module(moduleName: 'phaser'): Phaser;
    module(moduleName: 'pitchshifter'): PitchShifter;
    module(moduleName: 'preamp'): Preamp;
    module(moduleName: 'reverb'): Reverb;
    module(moduleName: 'ringmodulator'): Ringmodulator;
    module(moduleName: 'stereo'): Stereo;
    module(moduleName: 'tremolo'): Tremolo;
    module(moduleName: 'vocalcanceler'): VocalCanceler;
    module(moduleName: 'wah'): Wah;
    /** @override */
    on(startTime?: number): ProcessorModule;
    /** @override */
    off(stopTime?: number): ProcessorModule;
    /** @override */
    suspend(): ProcessorModule;
    /** @override */
    mix(): ProcessorModule;
    /** @override */
    demix(): ProcessorModule;
    /** @override */
    get INPUT(): GainNode | null;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map