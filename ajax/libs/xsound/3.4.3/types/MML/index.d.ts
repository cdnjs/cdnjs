import { OscillatorModule } from '../OscillatorModule';
import { OneshotModule } from '../OneshotModule';
import { NoiseModule } from '../NoiseModule';
import { TokenType, TokenMap, Token } from './Token';
import { Tree, MMLSyntaxError } from './Tree';
import { Sequence } from './Sequence';
import { Part, MMLScheduleWorkerMessageEventType, MMLScheduleWorkerMessageEventData } from './Part';
export type { Part, Sequence, MMLSyntaxError, Tree, TokenType, TokenMap, Token, MMLScheduleWorkerMessageEventType, MMLScheduleWorkerMessageEventData };
/**
 * This class manages instance of `Part` for playing MML (Music Macro Language).
 * @constructor
 */
export declare class MML {
    private parts;
    private startCallback;
    private stopCallback;
    private endedCallback;
    private errorCallback;
    constructor();
    /**
     * @property {function} startCallback This argument is invoked on starting MML.
     * @property {function} stopCallback This argument is invoked on stopping MML.
     * @property {function} endedCallback This argument is invoked on ending MML.
     * @property {function} errorCallback This argument is invoked on occurring MML syntax error.
     */
    setup(callbacks?: {
        startCallback?(sequence: Sequence, offset?: number): void;
        stopCallback?(sequence: Sequence, offset?: number): void;
        endedCallback?(): void;
        errorCallback?(error: MMLSyntaxError): void;
    }): MML;
    /**
     * This method parses MML string.
     * @property {OscillatorModule|OneshotModule|NoiseModule} source This argument selects sound source.
     * @property {Array<string>} mmls This argument is MML strings.
     * @property {number} offset This argument is in order to adjust index of one-shot audio.
     * @return {MML} Return value is for method chain.
     */
    ready(params: {
        source: OscillatorModule | OneshotModule | NoiseModule;
        mmls: string[];
        offset?: number;
    }): MML;
    /**
     * This method starts designated MML part. Moreover, this method schedules next sequence.
     * @param {number} partNumber This argument is part of MML.
     * @param {boolean} highlight This argument is `true` in case of surrounding by `span.x-highlight` HTML. The default value is `false`.
     * @return {MML} Return value is for method chain.
     */
    start(partNumber: number, highlight?: boolean): MML;
    /**
     * This method stops the all of MML parts.
     * @return {MML} Return value is for method chain.
     */
    stop(): MML;
    /**
     * This method gets MML string.
     * @param {number} index This argument selects MML part.
     * @return {string}
     */
    getMML(index: number): string;
    /**
     * This method gets array that contains MML string.
     * @return {Array<string>}
     */
    getMMLs(): string[];
    /**
     * This method determines whether sequences exist.
     * @return {boolean} If sequences exist, this value is `true`. Otherwise, this value is `false`.
     */
    has(): boolean;
    /**
     * This method gets array that contains instance of `Sequence`.
     * @param {number} index This argument selects MML part.
     * @return {Array<Sequence>}
     */
    getSequences(index: number): Sequence[];
    /**
     * This method gets array that contains instance of `Sequence` from the all of MML parts.
     * @return {Array<Array<Sequence>>}
     */
    getAllSequences(): Sequence[][];
    /**
     * This method gets string that represents MML syntax tree.
     * @param {number} index This argument selects MML part.
     * @return {string}
     */
    getSyntaxTree(index: number): string;
    /**
     * This method determines whether MMLs are paused.
     * @return {boolean} If MMLs are paused, this value is `true`. Otherwise, this value is `false`.
     */
    paused(): boolean;
    /**
     * This method gets or sets current sequence index.
     * This method is overloaded for type interface and type check.
     * @param {number} partNumber This argument is part of MML.
     * @param {number} sequenceIndex This argument is sequence index.
     *     If this argument is omitted, this method is getter for current sequence index.
     * @return {number|MML} Return value is for current sequence index. Otherwise, Return value is for method chain.
     */
    currentIndex(partNumber: number): number;
    currentIndex(partNumber: number, sequenceIndex: number): MML;
    /**
     * This method clears instance of `Part`.
     * @return {MML} Return value is for method chain.
     */
    clear(): MML;
    /**
     * This method converts MML to ABC Notation.
     * @param {string} mml This argument is MML string.
     * @param {number} X This argument is file number in ABC Notation.
     * @param {string} T This argument is title in ABC Notation.
     * @param {string} M This argument is beat in ABC Notation.
     * @param {string} L This argument is note duration in ABC Notation.
     * @param {string} K This argument is tone in ABC Notation.
     * @return {string} This is returned as ABC Notation.
     */
    toABC(mml: string, X?: number, T?: string, M?: string, L?: string, K?: string): string;
}
//# sourceMappingURL=index.d.ts.map