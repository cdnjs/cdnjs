import Cue from './cue';
/**
 * Cue List
 *
 * @description A collection of cues per language code.
 * @interface CueList
 * @export
 */
export default interface CueList {
    [language: string]: Cue[];
}
