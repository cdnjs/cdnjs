'use strict';

const assertString = (str, label) => {
    if (!str || typeof str !== 'string') {
        throw new Error(`Expected ${label} string, got "${str}".`);
    }
};
const assertGameName = (name) => assertString(name, 'game name');
const assertMatchID = (id) => assertString(id, 'match ID');
const validateBody = (body, schema) => {
    if (!body)
        throw new Error(`Expected body, got “${body}”.`);
    for (const key in schema) {
        const propSchema = schema[key];
        const types = Array.isArray(propSchema) ? propSchema : [propSchema];
        const received = body[key];
        if (!types.includes(typeof received)) {
            const union = types.join('|');
            throw new TypeError(`Expected body.${key} to be of type ${union}, got “${received}”.`);
        }
    }
};
class LobbyClientError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
    }
}
/**
 * Create a boardgame.io Lobby API client.
 * @param server The API’s base URL, e.g. `http://localhost:8000`.
 */
class LobbyClient {
    constructor({ server = '' } = {}) {
        // strip trailing slash if passed
        this.server = server.replace(/\/$/, '');
    }
    async request(route, init) {
        const response = await fetch(this.server + route, init);
        if (!response.ok) {
            let details;
            try {
                details = await response.clone().json();
            }
            catch {
                try {
                    details = await response.text();
                }
                catch (error) {
                    details = error.message;
                }
            }
            throw new LobbyClientError(`HTTP status ${response.status}`, details);
        }
        return response.json();
    }
    async post(route, opts) {
        let init = {
            method: 'post',
            body: JSON.stringify(opts.body),
            headers: { 'Content-Type': 'application/json' },
        };
        if (opts.init)
            init = {
                ...init,
                ...opts.init,
                headers: { ...init.headers, ...opts.init.headers },
            };
        return this.request(route, init);
    }
    /**
     * Get a list of the game names available on this server.
     * @param  init Optional RequestInit interface to override defaults.
     * @return Array of game names.
     *
     * @example
     * lobbyClient.listGames()
     *   .then(console.log); // => ['chess', 'tic-tac-toe']
     */
    async listGames(init) {
        return this.request('/games', init);
    }
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
    async listMatches(gameName, where, init) {
        assertGameName(gameName);
        let query = '';
        if (where) {
            const queries = [];
            const { isGameover, updatedBefore, updatedAfter } = where;
            if (isGameover !== undefined)
                queries.push(`isGameover=${isGameover}`);
            if (updatedBefore)
                queries.push(`updatedBefore=${updatedBefore}`);
            if (updatedAfter)
                queries.push(`updatedAfter=${updatedAfter}`);
            if (queries.length > 0)
                query = '?' + queries.join('&');
        }
        return this.request(`/games/${gameName}${query}`, init);
    }
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
    async getMatch(gameName, matchID, init) {
        assertGameName(gameName);
        assertMatchID(matchID);
        return this.request(`/games/${gameName}/${matchID}`, init);
    }
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
    async createMatch(gameName, body, init) {
        assertGameName(gameName);
        validateBody(body, { numPlayers: 'number' });
        return this.post(`/games/${gameName}/create`, { body, init });
    }
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
    async joinMatch(gameName, matchID, body, init) {
        assertGameName(gameName);
        assertMatchID(matchID);
        validateBody(body, {
            playerID: ['string', 'undefined'],
            playerName: 'string',
        });
        return this.post(`/games/${gameName}/${matchID}/join`, { body, init });
    }
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
    async leaveMatch(gameName, matchID, body, init) {
        assertGameName(gameName);
        assertMatchID(matchID);
        validateBody(body, { playerID: 'string', credentials: 'string' });
        await this.post(`/games/${gameName}/${matchID}/leave`, { body, init });
    }
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
    async updatePlayer(gameName, matchID, body, init) {
        assertGameName(gameName);
        assertMatchID(matchID);
        validateBody(body, { playerID: 'string', credentials: 'string' });
        await this.post(`/games/${gameName}/${matchID}/update`, { body, init });
    }
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
    async playAgain(gameName, matchID, body, init) {
        assertGameName(gameName);
        assertMatchID(matchID);
        validateBody(body, { playerID: 'string', credentials: 'string' });
        return this.post(`/games/${gameName}/${matchID}/playAgain`, { body, init });
    }
}

exports.LobbyClient = LobbyClient;
exports.LobbyClientError = LobbyClientError;
