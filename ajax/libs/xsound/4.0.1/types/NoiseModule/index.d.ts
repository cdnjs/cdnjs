import type { SoundModuleParams } from '../SoundModule';
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
import { NoiseModuleProcessor } from './NoiseModuleProcessor';
export type NoiseType = 'whitenoise' | 'pinknoise' | 'browniannoise';
export type NoiseModuleParams = SoundModuleParams & {
    type?: NoiseType;
};
export { NoiseModuleProcessor };
/**
 * This subclass is for generating noise.
 */
export declare class NoiseModule extends SoundModule {
    private type;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method defines noop for the same API.
     */
    setup(): NoiseModule;
    /**
     * This method defines noop for the same API.
     */
    ready(): NoiseModule;
    /**
     * This method starts noise.
     * @return {NoiseModule} Return value is for method chain.
     */
    start(): NoiseModule;
    /**
     * This method stops noise.
     * @return {NoiseModule} Return value is for method chain.
     */
    stop(): NoiseModule;
    /**
     * This method gets or sets parameters for noise module.
     * @param {keyof NoiseModuleParams|NoiseModuleParams} params This argument is string if getter. Otherwise, setter.
     * @return {NoiseModuleParams[keyof NoiseModuleParams]|NoiseModule} Return value is parameter for noise module if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'mastervolume'): number;
    param(params: 'type'): NoiseType;
    param(params: NoiseModuleParams): NoiseModule;
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
    disconnect(): void;
    /** @override */
    on(startTime?: number): NoiseModule;
    /** @override */
    off(stopTime?: number): NoiseModule;
    /** @override */
    suspend(): NoiseModule;
    /** @override */
    mix(): NoiseModule;
    /** @override */
    demix(): NoiseModule;
    /**
     * This method gets noise module parameters as associative array.
     * @return {NoiseModuleParams}
     * @override
     */
    params(): Required<NoiseModuleParams>;
    /** @override */
    get INPUT(): GainNode | null;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map