/**
 * Track
 *
 * @description An object that mimics the `track` tag attributes.
 * @interface Track
 * @export
 */
export default interface Track {
    readonly srclang: string;
    readonly src: string;
    /**
     * Possible values (although, OpenPlayerJS only supports the first one):
     *  - `subtitles`
     *  - `captions`
     *  - `descriptions`
     *  - `chapters`
     *  - `metadata`
     *
     * @see https://mzl.la/2HyGCbg
     */
    readonly kind: string;
    readonly label: string;
    readonly default?: boolean;
}
