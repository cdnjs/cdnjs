import { Bot } from './bot';
import type { Game, PlayerID, State, Store } from '../types';
/**
 * Make a single move on the client with a bot.
 *
 * @param {...object} client - The game client.
 * @param {...object} bot - The bot.
 */
export declare function Step(client: {
    store: Store;
}, bot: Bot): Promise<{
    payload: {
        metadata: any;
        type: string;
        args: any;
        playerID: string;
    } | {
        metadata: any;
        type: string;
        args: any;
        playerID: string;
    };
    type: "MAKE_MOVE";
} | {
    payload: {
        metadata: any;
        type: string;
        args: any;
        playerID: string;
    } | {
        metadata: any;
        type: string;
        args: any;
        playerID: string;
    };
    type: "GAME_EVENT";
}>;
/**
 * Simulates the game till the end or a max depth.
 *
 * @param {...object} game - The game object.
 * @param {...object} bots - An array of bots.
 * @param {...object} state - The game state to start from.
 */
export declare function Simulate({ game, bots, state, depth, }: {
    game: Game;
    bots: Bot | Record<PlayerID, Bot>;
    state: State;
    depth?: number;
}): Promise<{
    state: State<any>;
    metadata: any;
}>;
