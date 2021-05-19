import type { Ctx } from '../types';
/**
 * PlayerView reducers.
 */
export declare const PlayerView: {
    /**
     * STRIP_SECRETS
     *
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: (G: any, ctx: Ctx, playerID: string) => any;
};
