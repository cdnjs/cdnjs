import { PlayerComponent } from '../interfaces';
import Player from '../player';
declare class Play implements PlayerComponent {
    #private;
    constructor(player: Player, position: string, layer: string);
    create(): void;
    destroy(): void;
    private _enterSpaceKeyEvent;
}
export default Play;
