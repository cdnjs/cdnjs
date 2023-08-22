export declare const EQUAL_TEMPERAMENT: 12;
export declare const FREQUENCY_RATIO: 1.0594630943592953;
export declare const MIN_A: 27.5;
export declare const QUARTER_NOTE: 4;
export declare const SHARP: "#";
export declare const HALF_UP: "+";
export declare const HALF_DOWN: "-";
export declare const DOT: ".";
export type PitchChar = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'R';
export type ConvertedTime = {
    minutes: number;
    seconds: number;
    milliseconds: number;
};
/**
 * This predicate method determine whether is `PitchChar` type.
 * @param {string} pitchChar This argument is any string.
 * @return {boolean}
 */
export declare function isPitchChar(pitchChar: string): pitchChar is PitchChar;
/**
 * This class (static) method computes index by octave and `PitchChar` string.
 * @param {number} octave This argument is octave.
 * @param {PitchChar} pitchChar This argument is `PitchChar` string.
 * @return {number} Return value is index that is computed by octave and pitch character.
 */
export declare function computeIndex(octave: number, pitchChar: PitchChar): number;
/**
 * This class (static) method computes frequency from index that corresponds to 12 equal temperament.
 * @param {number} index This argument is index that corresponds to 12 equal temperament.
 *     For example, this value is between 0 and 88 in case of piano.
 * @return {number} Return value is frequency.
 */
export declare function computeFrequency(index: number): number;
export interface FileEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
export type FileReaderType = 'arraybuffer' | 'dataURL' | 'text' | 'json';
export type FileReaderErrorText = 'NOT_FOUND_ERR' | 'SECURITY_ERR' | 'ABORT_ERR' | 'NOT_READABLE_ERR' | 'ERR' | '';
/**
 * This class (static) method executes FFT.
 * @param {Float32Array} reals This argument is instance of `Float32Array` for real number.
 * @param {Float32Array} imags This argument is instance of `Float32Array` for imaginary number.
 * @param {number} size This argument is FFT size (power of two).
 */
export declare function fft(reals: Float32Array, imags: Float32Array, size: number): void;
/**
 * This class (static) method executes IFFT.
 * @param {Float32Array} reals This argument is instance of `Float32Array` for real number.
 * @param {Float32Array} imags This argument is instance of `Float32Array` for imaginary number.
 * @param {number} size This argument is IFFT size (power of two).
 */
export declare function ifft(reals: Float32Array, imags: Float32Array, size: number): void;
/**
 * This class (static) method retrieves resource on web by Ajax.
 * @property {string} url This argument is URL for resource.
 * @property {XMLHttpRequestResponseType} type This argument is response type that is one of 'arraybuffer', 'blob', 'document', 'json', 'text'. The default value is 'arraybuffer'.
 * @property {number} timeout This argument is timeout of Ajax. The default value is 60000 msec (1 minutes).
 * @property {function} successCallback This argument is invoked on success.
 * @property {function} errorCallback This argument is invoked on failure.
 * @property {function} progressCallback This argument is invoked during receiving data.
 */
export declare function ajax(params: {
    url: string;
    type?: XMLHttpRequestResponseType;
    timeout?: number;
    successCallback?(event: ProgressEvent, respsonse: ArrayBuffer | Blob | Document | string): void;
    errorCallback?(event: ProgressEvent, textStatus: 'error' | 'timeout'): void;
    progressCallback?(event: ProgressEvent): void;
}): void;
/**
 * This class (static) method calculates minutes, seconds and milliseconds from designated time (seconds).
 * @param {number} time This argument is time (seconds).
 * @return {ConvertedTime} Return value is converted time as associative array
 */
export declare function convertTime(time: number): ConvertedTime;
/**
 * This class (static) method decodes instance of `ArrayBuffer` to instance of `AudioBuffer`.
 * @param {AudioContext} context This argument is instance of `AudioContext` for `decodeAudioData` method.
 * @param {ArrayBuffer} arraybuffer This argument is decoded to instance of `AudioBuffer`.
 * @param {function} successCallback This argument is invoked on success.
 * @param {function} errorCallback This argument is invoked on failure.
 */
export declare function decode(context: AudioContext, arraybuffer: ArrayBuffer, successCallback?: (buffer: AudioBuffer) => void, errorCallback?: (error: Error) => void): void;
/**
 * This class (static) method shows designated `Element` in full screen.
 * @param {Element} element This argument is instance of `Element` that is target of full screen.
 * @return {Promise} Return value is instance of `Promise`.
 */
export declare function requestFullscreen(element: Element): Promise<void>;
/**
 * This class (static) method shows `Document` in original size from full screen.
 * @return {Promise} Return value is instance of `Promise`.
 */
export declare function exitFullscreen(): Promise<void>;
/**
 * This class (static) method reads file.
 * @property {File} file This argument is instance of `File`.
 * @property {FileReaderType} type This argument is one of 'arraybuffer', 'dataURL', 'text', 'json'.
 * @property {function} successCallback This argument is invoked on success.
 * @property {function} errorCallback This argument is invoked on failure.
 * @property {function} progressCallback This argument is invoked as `onprogress` event handler in instance of `FileReader`.
 */
export declare function read(params: {
    file: File;
    type: FileReaderType;
    successCallback?(event: ProgressEvent, result: ArrayBuffer | ReturnType<typeof JSON.parse> | string | null): void;
    errorCallback?(event: ProgressEvent, textStatus: FileReaderErrorText): void;
    progressCallback?(event: ProgressEvent): void;
}): void;
/**
 * This class (static) method gets instance of `File` from `DataTransfer`.
 * @property {DragEvent} event This argument is instance of `DragEvent`.
 * @property {FileReaderType|string} type This argument is one of 'arraybuffer', 'dataURL', 'objectURL', 'text', 'json'.
 * @property {function} successCallback This argument is invoked on success.
 * @property {function} errorCallback This argument is invoked on failure.
 * @property {function} progressCallback This argument is invoked as `onprogress` event handler in instance of `FileReader`.
 * @return {string|File|null} Return value is Object URL or instance of `File` on success. Otherwise, it is `null`.
 */
export declare function drop(params: {
    event: DragEvent;
    type: FileReaderType | 'objectURL';
    successCallback?(event: ProgressEvent, result: ArrayBuffer | ReturnType<typeof JSON.parse> | string | null): void;
    errorCallback?(event: ProgressEvent, textStatus: FileReaderErrorText): void;
    progressCallback?(event: ProgressEvent): void;
}): string | File | null;
/**
 * This class (static) method gets instance of `File`.
 * @property {Event} event This argument is instance of `Event` by `HTMLInputElement`.
 * @property {FileReaderType|string} type This argument is one of 'arraybuffer', 'dataURL', 'objectURL', 'text', 'json'.
 * @property {function} successCallback This argument is invoked on success.
 * @property {function} errorCallback This argument is invoked on failure.
 * @property {function} progressCallback This argument is invoked as `onprogress` event handler in instance of `FileReader`.
 * @return {string|File|null} Return value is Object URL or instance of `File` on success. Otherwise, it is `null`.
 */
export declare function file(params: {
    event: FileEvent;
    type: FileReaderType | 'objectURL';
    successCallback?(event: ProgressEvent, result: ArrayBuffer | ReturnType<typeof JSON.parse> | string | null): void;
    errorCallback?(event: ProgressEvent, textStatus: FileReaderErrorText): void;
    progressCallback?(event: ProgressEvent): void;
}): string | File | null;
/**
 * This class (static) method calculates frequency from index that corresponds to 12 equal temperament.
 * @param {Array<number>} indexes This argument is array that contains index that corresponds to 12 equal temperament.
 *     For example, this value is between 0 and 88 in case of piano.
 * @return {Array<number>} Return value is array that contains frequency.
 */
export declare function toFrequencies(indexes: number[]): number[];
/**
 * This class (static) method creates text file.
 * @param {string} text This argument is string.
 * @param {boolean} asObjectURL This argument is `true` in case of getting text file as Object URL.
 * @return {string} Return value is text file as Data URL or Object URL.
 */
export declare function toTextFile(text: string, asObjectURL: boolean): string;
//# sourceMappingURL=index.d.ts.map