/**
 * Copyright 2022 Design Barn Inc.
 */
import { LottiePlayer } from "./lottie-player";
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
    static get styles(): import("lit").CSSResult;
    protected formatCheck(data: any): string[];
    private checkLayer;
    private checkItems;
}
//# sourceMappingURL=tgs-player.d.ts.map