import type { Ctx, Game, State } from '../types';
/**
 * Creates the initial game state.
 */
export declare function InitializeGame({ game, numPlayers, setupData, }: {
    game: Game;
    numPlayers?: number;
    setupData?: any;
}): State<any, Ctx>;
