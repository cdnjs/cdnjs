import { Connectable } from '../interfaces';
import { SoundModuleProcessor } from './SoundModuleProcessor';
import { Analyser } from './Analyser';
import { Recorder } from './Recorder';
import { Effector } from './Effectors/Effector';
import { Autopanner, AutopannerParams } from './Effectors/Autopanner';
import { BitCrusher, BitCrusherParams } from './Effectors/BitCrusher';
import { Chorus, ChorusParams } from './Effectors/Chorus';
import { Compressor, CompressorParams } from './Effectors/Compressor';
import { Delay, DelayParams } from './Effectors/Delay';
import { EnvelopeGenerator, EnvelopeGeneratorParams } from './Effectors/EnvelopeGenerator';
import { Equalizer, EqualizerParams } from './Effectors/Equalizer';
import { Filter, FilterParams } from './Effectors/Filter';
import { Flanger, FlangerParams } from './Effectors/Flanger';
import { Fuzz, FuzzParams } from './Effectors/Fuzz';
import { Listener, ListenerParams } from './Effectors/Listener';
import { NoiseGate, NoiseGateParams } from '../SoundModule/Effectors/NoiseGate';
import { NoiseSuppressor, NoiseSuppressorParams } from '../SoundModule/Effectors/NoiseSuppressor';
import { OverDrive, OverDriveParams } from '../SoundModule/Effectors/OverDrive';
import { Panner, PannerParams } from './Effectors/Panner';
import { Phaser, PhaserParams } from './Effectors/Phaser';
import { PitchShifter, PitchShifterParams } from './Effectors/PitchShifter';
import { Preamp, PreampParams } from './Effectors/Preamp';
import { Reverb, ReverbParams } from './Effectors/Reverb';
import { Ringmodulator, RingmodulatorParams } from './Effectors/Ringmodulator';
import { Stereo, StereoParams } from './Effectors/Stereo';
import { Tremolo, TremoloParams } from './Effectors/Tremolo';
import { VocalCanceler, VocalCancelerParams } from './Effectors/VocalCanceler';
import { Wah, WahParams } from './Effectors/Wah';
export type Module = Analyser | Recorder | Autopanner | BitCrusher | Chorus | Compressor | Delay | EnvelopeGenerator | Equalizer | Filter | Flanger | Fuzz | Listener | NoiseGate | NoiseSuppressor | OverDrive | Panner | Phaser | PitchShifter | Preamp | Reverb | Ringmodulator | Stereo | Tremolo | VocalCanceler | Wah;
export type ModuleName = 'analyser' | 'recorder' | 'autopanner' | 'bitcrusher' | 'chorus' | 'compressor' | 'delay' | 'envelopegenerator' | 'equalizer' | 'filter' | 'flanger' | 'fuzz' | 'listener' | 'noisegate' | 'noisesuppressor' | 'overdrive' | 'panner' | 'phaser' | 'pitchshifter' | 'preamp' | 'reverb' | 'ringmodulator' | 'stereo' | 'tremolo' | 'vocalcanceler' | 'wah';
export type SoundModuleParams = {
    mastervolume?: number;
    autopanner?: AutopannerParams;
    bitcrusher?: BitCrusherParams;
    chorus?: ChorusParams;
    compressor?: CompressorParams;
    delay?: DelayParams;
    envelopegenerator?: EnvelopeGeneratorParams;
    equalizer?: EqualizerParams;
    filter?: FilterParams;
    flanger?: FlangerParams;
    fuzz?: FuzzParams;
    listener?: ListenerParams;
    noisegate?: NoiseGateParams;
    noisesuppressor?: NoiseSuppressorParams;
    overdrive?: OverDriveParams;
    panner?: PannerParams;
    phaser?: PhaserParams;
    pitchshifter?: PitchShifterParams;
    preamp?: PreampParams;
    reverb?: ReverbParams;
    ringmodulator?: RingmodulatorParams;
    stereo?: StereoParams;
    tremolo?: TremoloParams;
    vocalcanceler?: VocalCancelerParams;
    wah?: WahParams;
};
export { SoundModuleProcessor };
/**
 * This class is superclass that is the top in this library.
 * This class is extended as subclass (`OscillatorModule`, `OneshotModule`, `NoiseModule`, `AudioModule`, `MediaModule`, `StreamModule`, `ProcessorModule`, `MixerModule` ...etc).
 * @constructor
 * @abstract
 */
export declare abstract class SoundModule implements Connectable {
    static readonly NUMBER_OF_INPUTS = 2;
    static readonly NUMBER_OF_OUTPUTS = 2;
    protected context: AudioContext;
    protected modules: Connectable[];
    protected mastervolume: GainNode;
    protected processor: AudioWorkletNode;
    protected analyser: Analyser;
    protected recorder: Recorder;
    protected autopanner: Autopanner;
    protected bitcrusher: BitCrusher;
    protected chorus: Chorus;
    protected compressor: Compressor;
    protected delay: Delay;
    protected envelopegenerator: EnvelopeGenerator;
    protected equalizer: Equalizer;
    protected filter: Filter;
    protected flanger: Flanger;
    protected fuzz: Fuzz;
    protected listener: Listener;
    protected noisegate: NoiseGate;
    protected noisesuppressor: NoiseSuppressor;
    protected overdrive: OverDrive;
    protected panner: Panner;
    protected phaser: Phaser;
    protected pitchshifter: PitchShifter;
    protected preamp: Preamp;
    protected reverb: Reverb;
    protected ringmodulator: Ringmodulator;
    protected stereo: Stereo;
    protected tremolo: Tremolo;
    protected vocalcanceler: VocalCanceler;
    protected wah: Wah;
    protected runningAnalyser: boolean;
    protected mixed: boolean;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method connects `AudioNode`s.
     * @param {AudioNode} source This argument is `AudioNode` as sound source.
     */
    connect(source: AudioNode): void;
    /**
     * This method disconnects instance of `AudioWorkletNode` as sound source.
     */
    disconnect(): void;
    /**
     * This method installs customized effector.
     * @param {string} effectorName This argument selects effector.
     * @param {Effector} effector This argument is subclass that extends `Effector` class.
     * @return {Effector} Return value is instance of customized effector.
     */
    install(effectorName: string, effector: Effector): Effector;
    /**
     * This method starts effectors.
     * @param {number} startTime This argument is used for scheduling parameter.
     * @return {SoundModule} Return value is for method chain.
     */
    on(startTime?: number): SoundModule;
    /**
     * This method stops effectors.
     * @param {number} stopTime This argument is used for scheduling parameter.
     * @return {SoundModule} Return value is for method chain.
     */
    off(stopTime?: number): SoundModule;
    /**
     * This method stops analyser, recorder and `onaudioprocess` event.
     * @return {SoundModule} Return value is for method chain.
     */
    suspend(): SoundModule;
    /**
     * This method is invoked on mixing.
     * @return {SoundModule} Return value is for method chain.
     */
    mix(): SoundModule;
    /**
     * This method is invoked on demixing.
     * @return {SoundModule} Return value is for method chain.
     */
    demix(): SoundModule;
    /**
     * This method gets effector's parameters as associative array.
     * @return {SoundModuleParams}
     */
    params(): Required<SoundModuleParams>;
    /**
     * This method edits module to use and module connection order.
     * @param {Array<Connectable>} modules This argument is edited modules.
     * @return {Array<Connectable>} Return value is previous modules.
     */
    edit(modules: Connectable[]): Connectable[];
    /**
     * This method gets effector's parameters as JSON.
     * @return {string}
     */
    toJSON(): string;
    /**
     * Connector for input.
     */
    abstract get INPUT(): GainNode | AudioWorkletNode | null;
    /**
     * Connector for output.
     */
    abstract get OUTPUT(): GainNode;
    /**
     * This method re-initials modules.
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    protected init(context: AudioContext): void;
}
//# sourceMappingURL=index.d.ts.map