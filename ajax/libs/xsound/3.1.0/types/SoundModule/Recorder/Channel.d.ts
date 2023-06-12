import { Track } from './Track';
/**
 * This class is entity for recording channel.
 * @constructor
 */
export declare class Channel {
    private id;
    private tracks;
    private channelGain;
    /**
     * @param {string} id This argument is channel ID.
     */
    constructor(id: string);
    /**
     * This method appends instance of `Track`.
     * @param {Track} track This argument is instance of `Track` as recording track.
     * @return {Channel} Return value is for method chain.
     */
    append(track: Track): Channel;
    /**
     * This method gets designated track or array that contains the all of tracks.
     * This method is overloaded for type interface and type check.
     * @param {number} trackNumber This argument is target track number.
     * @return {Track|Array<Track>}
     */
    get(trackNumber: number): Track;
    get(): Track[];
    /**
     * This method gets or sets channel gain.
     * This method is overloaded for type interface and type check.
     * @param {number} param This argument is channel gain.
     * @return {number} Return value is channel gain.
     */
    gain(): number;
    gain(param: number): void;
    /**
     * This method gets the number of tracks.
     * @return {number}
     */
    length(): number;
    /** @override */
    toString(): string;
}
//# sourceMappingURL=Channel.d.ts.map