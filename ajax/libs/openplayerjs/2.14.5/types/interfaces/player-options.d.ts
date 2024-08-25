import AdsOptions from './ads-options';
import DashOptions from './dash-options';
/**
 * Player options
 *
 * @description An object that stores potential configuration for Ads, HLS and M(PEG)-DASH players, among others.
 * @interface PlayerOptions
 * @export
 */
export default interface PlayerOptions {
    readonly dash?: DashOptions;
    readonly hls?: any;
    readonly ads?: AdsOptions;
    [key: string]: any;
}
