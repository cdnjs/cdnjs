import type { Server, State, Game } from '../types';
/**
 * Creates a new match metadata object.
 */
export declare const createMetadata: ({ game, unlisted, setupData, numPlayers, }: {
    game: Game;
    numPlayers: number;
    setupData?: any;
    unlisted?: boolean;
}) => Server.MatchData;
/**
 * Creates initial state and metadata for a new match.
 * If the provided `setupData` doesn’t pass the game’s validation,
 * an error object is returned instead.
 */
export declare const createMatch: ({ game, numPlayers, setupData, unlisted, }: {
    game: Game;
    numPlayers: number;
    setupData: any;
    unlisted: boolean;
}) => {
    metadata: Server.MatchData;
    initialState: State;
} | {
    setupDataError: string;
};
/**
 * Given players, returns the count of players.
 */
export declare const getNumPlayers: (players: Server.MatchData['players']) => number;
/**
 * Given players, tries to find the ID of the first player that can be joined.
 * Returns `undefined` if there’s no available ID.
 */
export declare const getFirstAvailablePlayerID: (players: Server.MatchData['players']) => string | undefined;
