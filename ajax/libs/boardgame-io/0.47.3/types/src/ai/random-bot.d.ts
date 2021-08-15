import { Bot } from './bot';
import type { Ctx, PlayerID } from '../types';
/**
 * Bot that picks a move at random.
 */
export declare class RandomBot extends Bot {
    play({ G, ctx }: {
        G: any;
        ctx: Ctx;
    }, playerID: PlayerID): Promise<{
        action: {
            type: "MAKE_MOVE";
            payload: {
                type: string;
                args: any;
                playerID: string;
            };
        } | {
            type: "GAME_EVENT";
            payload: {
                type: string;
                args: any;
                playerID: string;
            };
        };
    }>;
}
