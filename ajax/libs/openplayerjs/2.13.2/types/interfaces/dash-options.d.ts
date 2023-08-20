/**
 * M(PEG)-DASH options
 *
 * @description An object that stores configuration settings for M(PEG)-DASH player
 * @interface DashOptions
 * @export
 */
export default interface DashOptions {
    /**
     * Key-system-specific string that specifies a required security level for video/audio.
     */
    readonly robustnessLevel?: string;
    /**
     * Digital rights management object to allow play restricted media.
     */
    readonly drm?: Record<string, unknown>;
}
