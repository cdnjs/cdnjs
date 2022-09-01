import { PlayerComponent, SettingsItem } from '../interfaces';
import Player from '../player';
declare class Captions implements PlayerComponent {
    #private;
    constructor(player: Player, position: string, layer: string);
    create(): void;
    destroy(): void;
    addSettings(): SettingsItem | unknown;
    private _getCuesFromText;
    private _getNativeCues;
    private _displayCaptions;
    private _hideCaptions;
    private _search;
    private _prepareTrack;
    private _formatMenuItems;
}
export default Captions;
