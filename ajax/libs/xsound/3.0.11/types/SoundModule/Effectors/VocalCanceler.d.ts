import { Statable } from '../../interfaces';
export declare type VocalCancelerParams = {
    state?: boolean;
    depth?: number;
};
/**
 * This private class is for Vocal Canceler.
 * @constructor
 * @implements {Statable}
 */
export declare class VocalCanceler implements Statable {
    private depth;
    private isActive;
    constructor();
    /**
     * This method removes vocal part from audio on playing.
     * @param {number} dataL This argument is gain level for Left channel.
     * @param {number} dataR This argument is gain level for Right channel.
     * @return {number} Return value is audio data except vocal part.
     */
    start(dataL: number, dataR: number): number;
    /**
     * This method gets or sets parameters for vocal canceler.
     * @param {keyof VocalCancelerParams|VocalCancelerParams} params This argument is string if getter. Otherwise, setter.
     * @return {VocalCancelerParams[keyof VocalCancelerParams]|VocalCanceler} Return value is parameter for vocal canceler if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'depth'): number;
    param(params: VocalCancelerParams): VocalCanceler;
    /**
     * This method gets vocal canceler parameters as associative array.
     * @return {VocalCancelerParams}
     */
    params(): Required<VocalCancelerParams>;
    /**
     * This method gets vocal canceler state. If returns `true`, vocal canceler is active.
     * @return {boolean}
     */
    state(): boolean;
    /**
     * This method activates vocal canceler.
     * @return {VocalCanceler} Return value is for method chain.
     */
    activate(): VocalCanceler;
    /**
     * This method deactivates vocal canceler.
     * @return {VocalCanceler} Return value is for method chain.
     */
    deactivate(): VocalCanceler;
}
//# sourceMappingURL=VocalCanceler.d.ts.map