/**
 * This class is entity for sequence that has musical note.
 * @constructor
 */
export declare class Sequence {
    private _id;
    private _note;
    private _indexes;
    private _frequencies;
    private _start;
    private _stop;
    private _duration;
    /**
     * @property {string} id This argument is string that identifies sequence.
     * @property {string} note This argument is string that corresponds to MML token.
     * @property {Array<number>} indexes This argument is array that contains index that corresponds to 12 equal temperament.
     * @property {Array<number>} frequencies This argument is array that contains frequency.
     * @property {number} start This argument is start time.
     * @property {number} stop This argument is stop time.
     * @property {number} duration This argument is duration.
     */
    constructor(params: {
        id: string;
        note: string;
        indexes: number[];
        frequencies: number[];
        start: number;
        stop: number;
        duration: number;
    });
    /**
     * This method concatenates sequence in case of tie.
     * @param {Sequence} sequence This argument is instance of `Sequence`.
     * @return {Sequence} Return value is new instance of `Sequence` that concatenates previous sequence.
     */
    concat(sequence: Sequence): Sequence;
    /**
     * This method is getter for musical note as MML token.
     */
    get note(): string;
    /**
     * This method is getter for array that contains index that corresponds to 12 equal temperament.
     */
    get indexes(): number[];
    /**
     * This method is getter for array that contains frequency.
     */
    get frequencies(): number[];
    /**
     * This method is getter for start time.
     */
    get start(): number;
    /**
     * This method is getter for stop time.
     */
    get stop(): number;
    /**
     * This method is getter for duration,
     */
    get duration(): number;
    /**
     * This method returns fields that `Sequence` has as JSON.
     */
    toString(): string;
}
//# sourceMappingURL=Sequence.d.ts.map