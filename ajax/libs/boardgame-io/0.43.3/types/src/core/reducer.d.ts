import type { ActionShape, Ctx, Game, State } from '../types';
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */
export declare function CreateGameReducer({ game, isClient, }: {
    game: Game;
    isClient?: boolean;
}): (state: State<any, Ctx>, action: ActionShape.Any) => State<any, Ctx>;
