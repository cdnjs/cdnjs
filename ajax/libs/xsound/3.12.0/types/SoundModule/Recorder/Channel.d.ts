import type { Frame } from './Frame';
/**
 * This class is entity for recording channel.
 */
export declare class Channel {
    private id;
    private frames;
    private channelGain;
    /**
     * @param {string} id This argument is channel ID.
     */
    constructor(id: string);
    /**
     * This method appends instance of `Frame`.
     * @param {Frame} frame This argument is instance of `Frame` as recording frame.
     * @return {Channel} Return value is for method chain.
     */
    append(frame: Frame): Channel;
    /**
     * This method gets designated frame or array that contains the all of frames.
     * This method is overloaded for type interface and type check.
     * @param {number} frameNumber This argument is target frame number.
     * @return {Frame|Array<Frame>}
     */
    get(frameNumber: number): Frame;
    get(): Frame[];
    /**
     * This method gets or sets channel gain.
     * This method is overloaded for type interface and type check.
     * @param {number} param This argument is channel gain.
     * @return {number} Return value is channel gain.
     */
    gain(): number;
    gain(param: number): void;
    /**
     * This method gets the number of frames.
     * @return {number}
     */
    length(): number;
    /** @override */
    toString(): string;
}
//# sourceMappingURL=Channel.d.ts.map