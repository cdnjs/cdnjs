import type { Game } from '../types';
import type { State, Ctx } from '../types';
/**
 * Creates the initial game state.
 */
export declare function InitializeGame({ game, numPlayers, setupData, }: {
    game: Game;
    numPlayers?: number;
    setupData?: any;
}): State<any, Ctx>;
