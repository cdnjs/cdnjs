import { LottiePlayer } from './lottie-player';
/**
 * TGSPlayer web component class
 *
 * @export
 * @class TGSPlayer
 * @extends {LottiePlayer}
 */
export declare class TGSPlayer extends LottiePlayer {
    /**
     * Strict format checks for TGS.
     */
    strict: boolean;
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(src: string | object): Promise<void>;
    /**
     * Returns the styles for the component.
     */
    static get styles(): import("lit-element").CSSResult;
    protected formatCheck(data: any): string[];
    private checkLayer;
    private checkItems;
}
//# sourceMappingURL=tgs-player.d.ts.map