import { Sprite } from "../Sprite";
export interface IWavedShape extends Sprite {
    waveLength: number;
    waveHeight: number;
    tension: number;
}
