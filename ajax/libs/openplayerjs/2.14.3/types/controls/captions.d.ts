import { PlayerComponent, SettingsItem } from '../interfaces';
import Player from '../player';
declare class Captions implements PlayerComponent {
    #private;
    constructor(player: Player, position: string, layer: string);
    custom?: boolean | undefined;
    create(): void;
    destroy(): void;
    addSettings(): SettingsItem | unknown;
    private _formatMenuItems;
    private _setDefaultTrack;
}
export default Captions;
