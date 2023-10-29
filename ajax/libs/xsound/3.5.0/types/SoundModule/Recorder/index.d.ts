import { Connectable } from '../../interfaces';
import { ChannelNumber } from '../../types';
import { Track } from './Track';
import { Channel } from './Channel';
import { RecorderProcessor, RecorderProcessorMessageEventData } from './RecorderProcessor';
export type RecordType = 1 | 2;
export type QuantizationBit = 8 | 16;
export type WaveExportType = 'base64' | 'dataURL' | 'blob' | 'objectURL';
export type { Track, Channel, RecorderProcessorMessageEventData };
export type RecorderParams = {
    '0'?: number;
    '1'?: number;
};
export { RecorderProcessor };
/**
 * This private class is for multi track recording.
 * @constructor
 */
export declare class Recorder implements Connectable {
    private processor;
    private sampleRate;
    private channels;
    private activeTrack;
    private paused;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method sets the max number of tracks.
     * @param {RecordType} numberOfChannels This argument is the number of channels (not used currently).
     * @param {number} numberOfTracks This argument is the max number of tracks.
     * @return {Recorder} Return value is for method chain.
     */
    setup(numberOfChannels: RecordType, numberOfTracks: number): Recorder;
    /**
     * This method selects active track.
     * @param {number} trackNumber This argument is in order to select active track.
     *     If there is not designated track number, active track number is -1.
     * @return {Recorder} Return value is for method chain.
     */
    ready(trackNumber: number): Recorder;
    /**
     * This method starts sound recording. If there is not any active track, this method stops `onaudioprocess` event handler.
     * @return {Recorder} Return value is for method chain.
     */
    start(): Recorder;
    /**
     * This method turns off active track, and stops `onaudioprocess` event handler.
     * @return {Recorder} Return value is for method chain.
     */
    stop(): Recorder;
    /**
     * This method gets or sets parameters for recorder.
     * This method is overloaded for type interface and type check.
     * @param {keyof RecorderParams|RecorderParams} params This argument is string if getter. Otherwise, setter.
     * @return {RecorderParams[keyof RecorderParams]|Recorder} Return value is parameter for recorder if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: '0' | '1'): number;
    param(params: RecorderParams): Recorder;
    /**
     * This method determines whether active track exists.
     * @return {number} Return value is active track number.
     */
    get(): number;
    /**
     * This method clears record track.
     * @param {number} trackNumber This argument is track for clearing. If this argument is -1, target is the all of tracks.
     * @return {Recorder} Return value is for method chain.
     */
    clear(trackNumber: number): Recorder;
    /**
     * This method creates WAVE file as one of Base64, Data URL, Blob, Object URL.
     * @param {number} trackNumber This argument is track number for mixing. If this argument is -1, target is the all of tracks.
     * @param {RecordType} numberOfChannels This argument is in order to select monaural or stereo.
     * @param {QuantizationBit} qbits This argument is quantization bit for PCM.
     * @param {WaveExportType} type This argument is one of 'base64', 'dataURL', 'blob', 'objectURL'.
     * @return {string|Blob} Return value is one of Base64, Data URL, Blob, Object URL as WAVE file.
     */
    create(trackNumber: number, numberOfChannels: RecordType, qbits: QuantizationBit, type: WaveExportType): string | Blob;
    /**
     * This method determines whether track has recorded data.
     * @param {ChanneNumber} channelNumber This argument is target channel number (if this argument is -1, target is the all of channels).
     * @param {number} trackNumber This argument is target track number (if this argument is -1, target is the all of tracks).
     * @return {boolean} If there is track that has recorded data at least, this method returns `true`. Otherwise this value is `false`.
     */
    has(channelNumber: ChannelNumber, trackNumber: number): boolean;
    /**
     * This method determines whether designated channel number is valid.
     * @param {ChanneNumber} channelNumber This argument is channel number for validation.
     * @return {boolean} If designated channel is valid, this value is `true`. Otherwise, this value is `false`.
     */
    hasChannel(channelNumber: ChannelNumber): boolean;
    /**
     * This method determines whether designated track number is valid.
     * @param {number} trackNumber This argument is track number for validation.
     * @return {boolean} If designated track is valid, this value is `true`. Otherwise, this value is `false`.
     */
    hasTrack(trackNumber: number): boolean;
    /** @override */
    get INPUT(): AudioWorkletNode;
    /** @override */
    get OUTPUT(): AudioWorkletNode;
    /**
     * This method flats recorded sound data (data block of `Float32Array`) that track contains.
     * @param {ChanneNumber} channelNumber This argument is channel number for mixing.
     * @param {number} trackNumber This argument is track number.
     * @return {Float32Array} Return value is instance of `Float32Array` that contains flatten sound data.
     */
    private flatTrack;
    /**
     * This method synthesizes recorded sound data that plural track contains.
     * @param {ChannelNumber} channelNumber This argument is channel number for mixing.
     * @return {Float32Array} Return value is instance of `Float32Array` that contains synthesized sound data.
     */
    private mixTrack;
}
//# sourceMappingURL=index.d.ts.map