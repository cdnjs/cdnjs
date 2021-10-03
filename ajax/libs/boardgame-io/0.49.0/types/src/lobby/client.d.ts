import type { LobbyAPI } from '../types';
export declare class LobbyClientError extends Error {
    readonly details: any;
    constructor(message: string, details: any);
}
/**
 * Create a boardgame.io Lobby API client.
 * @param server The API’s base URL, e.g. `http://localhost:8000`.
 */
export declare class LobbyClient {
    private server;
    constructor({ server }?: {
        server?: string;
    });
    private request;
    private post;
    /**
     * Get a list of the game names available on this server.
     * @param  init Optional RequestInit interface to override defaults.
     * @return Array of game names.
     *
     * @example
     * lobbyClient.listGames()
     *   .then(console.log); // => ['chess', 'tic-tac-toe']
     */
    listGames(init?: RequestInit): Promise<string[]>;
    /**
     * Get a list of the matches for a specific game type on the server.
     * @param  gameName The game to list for, e.g. 'tic-tac-toe'.
     * @param  where    Options to filter matches by update time or gameover state
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Array of match metadata objects.
     *
     * @example
     * lobbyClient.listMatches('tic-tac-toe', where: { isGameover: false })
     *   .then(data => console.log(data.matches));
     * // => [
     * //   {
     * //     matchID: 'xyz',
     * //     gameName: 'tic-tac-toe',
     * //     players: [{ id: 0, name: 'Alice' }, { id: 1 }]
     * //   },
     * //   ...
     * // ]
     */
    listMatches(gameName: string, where?: {
        /**
         * If true, only games that have ended will be returned.
         * If false, only games that have not yet ended will be returned.
         * Leave undefined to receive both finished and unfinished games.
         */
        isGameover?: boolean;
        /**
         * List matches last updated before a specific time.
         * Value should be a timestamp in milliseconds after January 1, 1970.
         */
        updatedBefore?: number;
        /**
         * List matches last updated after a specific time.
         * Value should be a timestamp in milliseconds after January 1, 1970.
         */
        updatedAfter?: number;
    }, init?: RequestInit): Promise<LobbyAPI.MatchList>;
    /**
     * Get metadata for a specific match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to fetch.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return A match metadata object.
     *
     * @example
     * lobbyClient.getMatch('tic-tac-toe', 'xyz').then(console.log);
     * // => {
     * //   matchID: 'xyz',
     * //   gameName: 'tic-tac-toe',
     * //   players: [{ id: 0, name: 'Alice' }, { id: 1 }]
     * // }
     */
    getMatch(gameName: string, matchID: string, init?: RequestInit): Promise<LobbyAPI.Match>;
    /**
     * Create a new match for a specific game type.
     * @param  gameName The game to create a match for, e.g. 'tic-tac-toe'.
     * @param  body     Options required to configure match creation.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return An object containing the created `matchID`.
     *
     * @example
     * lobbyClient.createMatch('tic-tac-toe', { numPlayers: 2 })
     *   .then(console.log);
     * // => { matchID: 'xyz' }
     */
    createMatch(gameName: string, body: {
        numPlayers: number;
        setupData?: any;
        unlisted?: boolean;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.CreatedMatch>;
    /**
     * Join a match using its matchID.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to join.
     * @param  body     Options required to join match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Object containing `playerCredentials` for the player who joined.
     *
     * @example
     * lobbyClient.joinMatch('tic-tac-toe', 'xyz', {
     *   playerID: '1',
     *   playerName: 'Bob',
     * }).then(console.log);
     * // => { playerID: '1', playerCredentials: 'random-string' }
     */
    joinMatch(gameName: string, matchID: string, body: {
        playerID?: string;
        playerName: string;
        data?: any;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.JoinedMatch>;
    /**
     * Leave a previously joined match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to leave.
     * @param  body     Options required to leave match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Promise resolves if successful.
     *
     * @example
     * lobbyClient.leaveMatch('tic-tac-toe', 'xyz', {
     *   playerID: '1',
     *   credentials: 'credentials-returned-when-joining',
     * })
     *   .then(() => console.log('Left match.'))
     *   .catch(error => console.error('Error leaving match', error));
     */
    leaveMatch(gameName: string, matchID: string, body: {
        playerID: string;
        credentials: string;
        [key: string]: any;
    }, init?: RequestInit): Promise<void>;
    /**
     * Update a player’s name or custom metadata.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to update.
     * @param  body     Options required to update player.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Promise resolves if successful.
     *
     * @example
     * lobbyClient.updatePlayer('tic-tac-toe', 'xyz', {
     *   playerID: '0',
     *   credentials: 'credentials-returned-when-joining',
     *   newName: 'Al',
     * })
     *   .then(() => console.log('Updated player data.'))
     *   .catch(error => console.error('Error updating data', error));
     */
    updatePlayer(gameName: string, matchID: string, body: {
        playerID: string;
        credentials: string;
        newName?: string;
        data?: any;
        [key: string]: any;
    }, init?: RequestInit): Promise<void>;
    /**
     * Create a new match based on the configuration of the current match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to play again.
     * @param  body     Options required to configure match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Object containing `nextMatchID`.
     *
     * @example
     * lobbyClient.playAgain('tic-tac-toe', 'xyz', {
     *   playerID: '0',
     *   credentials: 'credentials-returned-when-joining',
     * })
     *   .then(({ nextMatchID }) => {
     *     return lobbyClient.joinMatch('tic-tac-toe', nextMatchID, {
     *       playerID: '0',
     *       playerName: 'Al',
     *     })
     *   })
     *   .then({ playerCredentials } => {
     *     console.log(playerCredentials);
     *   })
     *   .catch(console.error);
     */
    playAgain(gameName: string, matchID: string, body: {
        playerID: string;
        credentials: string;
        unlisted?: boolean;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.NextMatch>;
}
