import { Connectable } from '../interfaces';
import { BufferSize } from '../types';
import { Analyser } from './Analyser';
import { Recorder } from './Recorder';
import { Session } from './Session';
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
export declare type Module = Analyser | Recorder | Session | Stereo | Compressor | BitCrusher | OverDrive | Fuzz | Preamp | Wah | PitchShifter | Equalizer | Filter | Autopanner | Tremolo | Ringmodulator | Phaser | Flanger | Chorus | Delay | Reverb | Panner | Listener | EnvelopeGenerator | NoiseGate | NoiseSuppressor | VocalCanceler;
export declare type ModuleName = 'analyser' | 'recorder' | 'session' | 'autopanner' | 'bitcrusher' | 'overdrive' | 'fuzz' | 'chorus' | 'compressor' | 'delay' | 'preamp' | 'equalizer' | 'filter' | 'flanger' | 'listener' | 'panner' | 'phaser' | 'pitchshifter' | 'reverb' | 'ringmodulator' | 'stereo' | 'tremolo' | 'wah' | 'envelopegenerator' | 'noisegate' | 'noisesuppressor' | 'vocalcanceler';
export declare type SoundModuleParams = {
    mastervolume?: number;
    stereo?: StereoParams;
    compressor?: CompressorParams;
    bitcrusher?: BitCrusherParams;
    overdrive?: OverDriveParams;
    fuzz?: FuzzParams;
    preamp?: PreampParams;
    wah?: WahParams;
    pitchshifter?: PitchShifterParams;
    equalizer?: EqualizerParams;
    filter?: FilterParams;
    autopanner?: AutopannerParams;
    tremolo?: TremoloParams;
    ringmodulator?: RingmodulatorParams;
    phaser?: PhaserParams;
    flanger?: FlangerParams;
    chorus?: ChorusParams;
    delay?: DelayParams;
    reverb?: ReverbParams;
    panner?: PannerParams;
    listener?: ListenerParams;
    envelopegenerator?: EnvelopeGeneratorParams;
    noisegate?: NoiseGateParams;
    noisesuppressor?: NoiseSuppressorParams;
    vocalcanceler?: VocalCancelerParams;
};
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
    protected processor: ScriptProcessorNode;
    protected analyser: Analyser;
    protected recorder: Recorder;
    protected session: Session;
    protected stereo: Stereo;
    protected compressor: Compressor;
    protected bitcrusher: BitCrusher;
    protected overdrive: OverDrive;
    protected fuzz: Fuzz;
    protected preamp: Preamp;
    protected wah: Wah;
    protected pitchshifter: PitchShifter;
    protected equalizer: Equalizer;
    protected filter: Filter;
    protected autopanner: Autopanner;
    protected tremolo: Tremolo;
    protected ringmodulator: Ringmodulator;
    protected phaser: Phaser;
    protected flanger: Flanger;
    protected chorus: Chorus;
    protected delay: Delay;
    protected reverb: Reverb;
    protected panner: Panner;
    protected listener: Listener;
    protected envelopegenerator: EnvelopeGenerator;
    protected noisegate: NoiseGate;
    protected noisesuppressor: NoiseSuppressor;
    protected vocalcanceler: VocalCanceler;
    protected runningAnalyser: boolean;
    protected mixed: boolean;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     * @param {BufferSize} bufferSize This argument is buffer size for `ScriptProcessorNode`.
     */
    constructor(context: AudioContext, bufferSize: BufferSize);
    /**
     * This method connects `AudioNode`s.
     * @param {AudioNode} source This argument is `AudioNode` as sound source.
     */
    connect(source: AudioNode): void;
    /**
     * This method changes buffer size for `ScriptProcessorNode`.
     * @param {BufferSize} bufferSize This argument is buffer size for `ScriptProcessorNode`.
     * @return {SoundModule} Return value is for method chain.
     */
    resize(bufferSize: BufferSize): SoundModule;
    /**
     * This method gets buffer size for `ScriptProcessorNode`.
     * @return {BufferSize}
     */
    getBufferSize(): number;
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
     * This method gets effector's parameters as JSON.
     * @return {string}
     */
    toJSON(): string;
    /**
     * Connector for input.
     */
    abstract get INPUT(): GainNode | ScriptProcessorNode | null;
    /**
     * Connector for output.
     */
    abstract get OUTPUT(): GainNode;
    /**
     * This method re-initials modules.
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     * @param {BufferSize} bufferSize This argument is buffer size for `ScriptProcessorNode`.
     */
    protected init(context: AudioContext, bufferSize: BufferSize): void;
}
//# sourceMappingURL=index.d.ts.map