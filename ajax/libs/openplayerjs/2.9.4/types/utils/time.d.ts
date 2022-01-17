/**
 * Generate a human-readable time based on media current time.
 *
 * @export
 * @param {number} seconds  The time to be converted to a human-readable format (STMPE).
 * @param {?number} frameRate  The numbers of frames per second.
 * @returns {string}
 */
export declare function formatTime(seconds: number, frameRate?: number): string;
/**
 * Convert STMPE string into seconds
 *
 * @see https://en.wikipedia.org/wiki/SMPTE_timecode
 * @export
 * @param {string} timecode  The STMPE string to be converted.
 * @returns {number}
 */
export declare function timeToSeconds(timecode: string): number;
