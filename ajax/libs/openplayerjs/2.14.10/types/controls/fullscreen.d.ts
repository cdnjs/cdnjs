import { PlayerComponent } from '../interfaces';
import Player from '../player';
declare class Fullscreen implements PlayerComponent {
    #private;
    fullScreenEnabled: boolean;
    constructor(player: Player, position: string, layer: string);
    create(): void;
    destroy(): void;
    toggleFullscreen(): void;
    private _fullscreenChange;
    private _setFullscreenData;
    private _resize;
    private _enterSpaceKeyEvent;
    private _setFullscreen;
    private _unsetFullscreen;
}
export default Fullscreen;
