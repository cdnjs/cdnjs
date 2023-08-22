import { OscillatorModule } from '/src/OscillatorModule';
import { OneshotModule } from '/src/OneshotModule';
import { NoiseModule } from '/src/NoiseModule';
import { MMLSyntaxError } from '/src/MML/Tree';
import { Sequence } from '/src/MML/Sequence';
import { MMLScheduleWorkerMessageEventType, MMLScheduleWorkerMessageEventData } from '/src/MML/ScheduleWorker';
export type { MMLScheduleWorkerMessageEventType, MMLScheduleWorkerMessageEventData };
/**
 * This class starts and stops each MML part.
 * @constructor
 */
export declare class Part {
    private sequences;
    private source;
    private mml;
    private syntaxTree;
    private previous;
    private scheduleWorker;
    private currentIndex;
    private currentPosition;
    private offset;
    private startCallback;
    private stopCallback;
    private endedCallback;
    private errorCallback;
    /**
     * @property {OscillatorModule|OneshotModule|NoiseModule} source This argument selects sound source.
     * @property {string} mml This argument is MML string.
     * @property {number} offset This argument corrects index of one-shot audio.
     * @property {function} startCallback This argument is invoked on start musical note.
     * @property {function} stopCallback This argument is invoked on stop musical note.
     * @property {function} endedCallback This argument is invoked on ended.
     * @property {function} errorCallback This argument is invoked on syntax error.
     */
    constructor(params: {
        source: OscillatorModule | OneshotModule | NoiseModule;
        mml: string;
        offset?: number;
        startCallback?(sequence: Sequence, offset?: number): void;
        stopCallback?(sequence: Sequence, offset?: number): void;
        endedCallback?(): void;
        errorCallback?(error: MMLSyntaxError): void;
    });
    /**
     * This method starts MML. Moreover, this method schedules next sequence.
     * @param {boolean} highlight This argument is `true` in case of surrounding by `span.x-highlight` HTML.
     */
    start(highlight: boolean): void;
    /**
     * This method stops MML.
     */
    stop(): void;
    /**
     * This method is getter for MML string.
     */
    getMML(): string;
    /**
     * This method is getter for array that contains sequence.
     */
    getSequences(): Sequence[];
    /**
     * This method is getter for string that represents MML syntax tree.
     */
    getSyntaxTree(): string;
    /**
     * This method determines whether sequence exists.
     * @return {boolean} If sequence exists, this value is `true`. Otherwise, this value is `false`.
     */
    has(): boolean;
    /**
     * This method determines whether MML part is paused.
     * @return {boolean} If MML part are paused, this value is `true`. Otherwise, this value is `false`.
     */
    paused(): boolean;
    /**
     * This method is getter for current sequence index.
     */
    getCurrentIndex(): number;
    /**
     * This method is setter for current sequence index.
     * @param {number} index This argument is new sequence index.
     */
    setCurrentIndex(index: number): void;
}
//# sourceMappingURL=Part.d.ts.map