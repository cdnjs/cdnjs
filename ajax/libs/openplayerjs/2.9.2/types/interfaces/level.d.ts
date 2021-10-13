/**
 * Level
 *
 * @description Media level a source can have.
 * @interface Level
 * @export
 */
export default interface Level {
    /**
     * Media's height to display level based on standards:
     *  - 8K
     *  - 4K
     *  - 1440p
     *  - 1080p
     *  - 720p
     *  - 480p
     *  - 360p
     *  - 240p
     *  - 144p
     */
    readonly height: number;
    readonly id: string;
    readonly label: string;
}
