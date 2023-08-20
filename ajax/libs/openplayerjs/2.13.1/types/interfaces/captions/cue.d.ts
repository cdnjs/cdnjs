/**
 * Cue
 *
 * @description Object that mimics the native HTML5 Cue.
 * @interface Cue
 * @export
 */
export default interface Cue {
    readonly endTime: number;
    readonly identifier: string;
    readonly settings: object;
    readonly startTime: number;
    readonly text: string;
}
