import { PlayerComponent } from '../interfaces';
import Player from '../player';
declare class Time implements PlayerComponent {
    #private;
    constructor(player: Player, position: string, layer: string);
    create(): void;
    destroy(): void;
}
export default Time;
