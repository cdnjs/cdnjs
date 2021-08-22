import type { Server, State, Game } from '../types';
/**
 * Creates a new match metadata object.
 */
export declare const createMetadata: ({ game, unlisted, setupData, numPlayers, }: {
    game: Game<any, import("../types").Ctx, any>;
    numPlayers: number;
    setupData?: any;
    unlisted?: boolean;
}) => Server.MatchData;
/**
 * Creates matchID, initial state and metadata for a new match.
 * If the provided `setupData` doesn’t pass the game’s validation,
 * an error object is returned instead.
 */
export declare const createMatch: ({ game, numPlayers, setupData, unlisted, }: {
    game: Game<any, import("../types").Ctx, any>;
    numPlayers: number;
    setupData: any;
    unlisted: boolean;
}) => {
    metadata: Server.MatchData;
    initialState: State<any, import("../types").Ctx>;
} | {
    setupDataError: string;
};
