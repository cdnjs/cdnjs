import { applyMiddleware, createStore } from 'redux';
import { e as error, m as UNDO, n as REDO, M as MAKE_MOVE, w as PlayerView } from './turn-order-62966a9c.js';
import { P as ProcessGameConfig, C as CreateGameReducer, T as TransientHandlingMiddleware, I as IsLongFormMove } from './reducer-763b001e.js';
import { createPatch } from 'rfc6902';
import { I as InitializeGame } from './initialize-ca65fd4a.js';
import { i as isSynchronous } from './base-13e38c3e.js';

/**
 * Creates a new match metadata object.
 */
const createMetadata = ({ game, unlisted, setupData, numPlayers, }) => {
    const metadata = {
        gameName: game.name,
        unlisted: !!unlisted,
        players: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    if (setupData !== undefined)
        metadata.setupData = setupData;
    for (let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
        metadata.players[playerIndex] = { id: playerIndex };
    }
    return metadata;
};
/**
 * Creates matchID, initial state and metadata for a new match.
 * If the provided `setupData` doesn’t pass the game’s validation,
 * an error object is returned instead.
 */
const createMatch = ({ game, numPlayers, setupData, unlisted, }) => {
    if (!numPlayers || typeof numPlayers !== 'number')
        numPlayers = 2;
    const setupDataError = game.validateSetupData && game.validateSetupData(setupData, numPlayers);
    if (setupDataError !== undefined)
        return { setupDataError };
    const metadata = createMetadata({ game, numPlayers, setupData, unlisted });
    const initialState = InitializeGame({ game, numPlayers, setupData });
    return { metadata, initialState };
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Filter match data to get a player metadata object with credentials stripped.
 */
const filterMatchData = (matchData) => Object.values(matchData.players).map((player) => {
    const { credentials, ...filteredData } = player;
    return filteredData;
});
/**
 * Redact the log.
 *
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
function redactLog(log, playerID) {
    if (log === undefined) {
        return log;
    }
    return log.map((logEvent) => {
        // filter for all other players and spectators.
        if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
            return logEvent;
        }
        if (logEvent.redact !== true) {
            return logEvent;
        }
        const payload = {
            ...logEvent.action.payload,
            args: null,
        };
        const filteredEvent = {
            ...logEvent,
            action: { ...logEvent.action, payload },
        };
        const { redact, ...remaining } = filteredEvent;
        return remaining;
    });
}
/**
 * Remove player credentials from action payload
 */
const stripCredentialsFromAction = (action) => {
    const { credentials, ...payload } = action.payload;
    return { ...action, payload };
};
/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */
class Master {
    constructor(game, storageAPI, transportAPI, auth) {
        this.game = ProcessGameConfig(game);
        this.storageAPI = storageAPI;
        this.transportAPI = transportAPI;
        this.subscribeCallback = () => { };
        this.auth = auth;
    }
    subscribe(fn) {
        this.subscribeCallback = fn;
    }
    /**
     * Called on each move / event made by the client.
     * Computes the new value of the game state and returns it
     * along with a deltalog.
     */
    async onUpdate(credAction, stateID, matchID, playerID) {
        let metadata;
        if (isSynchronous(this.storageAPI)) {
            ({ metadata } = this.storageAPI.fetch(matchID, { metadata: true }));
        }
        else {
            ({ metadata } = await this.storageAPI.fetch(matchID, { metadata: true }));
        }
        if (this.auth) {
            const isAuthentic = await this.auth.authenticateCredentials({
                playerID,
                credentials: credAction.payload.credentials,
                metadata,
            });
            if (!isAuthentic) {
                return { error: 'unauthorized action' };
            }
        }
        const action = stripCredentialsFromAction(credAction);
        const key = matchID;
        let state;
        if (isSynchronous(this.storageAPI)) {
            ({ state } = this.storageAPI.fetch(key, { state: true }));
        }
        else {
            ({ state } = await this.storageAPI.fetch(key, { state: true }));
        }
        if (state === undefined) {
            error(`game not found, matchID=[${key}]`);
            return { error: 'game not found' };
        }
        if (state.ctx.gameover !== undefined) {
            error(`game over - matchID=[${key}] - playerID=[${playerID}]` +
                ` - action[${action.payload.type}]`);
            return;
        }
        const reducer = CreateGameReducer({
            game: this.game,
        });
        const middleware = applyMiddleware(TransientHandlingMiddleware);
        const store = createStore(reducer, state, middleware);
        // Only allow UNDO / REDO if there is exactly one player
        // that can make moves right now and the person doing the
        // action is that player.
        if (action.type == UNDO || action.type == REDO) {
            const hasActivePlayers = state.ctx.activePlayers !== null;
            const isCurrentPlayer = state.ctx.currentPlayer === playerID;
            if (
            // If activePlayers is empty, non-current players can’t undo.
            (!hasActivePlayers && !isCurrentPlayer) ||
                // If player is not active or multiple players are active, can’t undo.
                (hasActivePlayers &&
                    (state.ctx.activePlayers[playerID] === undefined ||
                        Object.keys(state.ctx.activePlayers).length > 1))) {
                error(`playerID=[${playerID}] cannot undo / redo right now`);
                return;
            }
        }
        // Check whether the player is active.
        if (!this.game.flow.isPlayerActive(state.G, state.ctx, playerID)) {
            error(`player not active - playerID=[${playerID}]` +
                ` - action[${action.payload.type}]`);
            return;
        }
        // Get move for further checks
        const move = action.type == MAKE_MOVE
            ? this.game.flow.getMove(state.ctx, action.payload.type, playerID)
            : null;
        // Check whether the player is allowed to make the move.
        if (action.type == MAKE_MOVE && !move) {
            error(`move not processed - canPlayerMakeMove=false - playerID=[${playerID}]` +
                ` - action[${action.payload.type}]`);
            return;
        }
        // Check if action's stateID is different than store's stateID
        // and if move does not have ignoreStaleStateID truthy.
        if (state._stateID !== stateID &&
            !(move && IsLongFormMove(move) && move.ignoreStaleStateID)) {
            error(`invalid stateID, was=[${stateID}], expected=[${state._stateID}]` +
                ` - playerID=[${playerID}] - action[${action.payload.type}]`);
            return;
        }
        const prevState = store.getState();
        // Update server's version of the store.
        store.dispatch(action);
        state = store.getState();
        this.subscribeCallback({
            state,
            action,
            matchID,
        });
        this.transportAPI.sendAll((playerID) => {
            const log = redactLog(state.deltalog, playerID);
            const filteredState = {
                ...state,
                G: this.game.playerView(state.G, state.ctx, playerID),
                plugins: PlayerView(state, { playerID, game: this.game }),
                deltalog: undefined,
                _undo: [],
                _redo: [],
            };
            if (this.game.deltaState) {
                const newStateID = state._stateID;
                const prevFilteredState = {
                    ...prevState,
                    G: this.game.playerView(prevState.G, prevState.ctx, playerID),
                    plugins: PlayerView(prevState, { playerID, game: this.game }),
                    deltalog: undefined,
                    _undo: [],
                    _redo: [],
                };
                const patch = createPatch(prevFilteredState, filteredState);
                return {
                    type: 'patch',
                    args: [matchID, stateID, newStateID, patch, log],
                };
            }
            else {
                return {
                    type: 'update',
                    args: [matchID, filteredState, log],
                };
            }
        });
        const { deltalog, ...stateWithoutDeltalog } = state;
        let newMetadata;
        if (metadata && !('gameover' in metadata)) {
            newMetadata = {
                ...metadata,
                updatedAt: Date.now(),
            };
            if (state.ctx.gameover !== undefined) {
                newMetadata.gameover = state.ctx.gameover;
            }
        }
        if (isSynchronous(this.storageAPI)) {
            this.storageAPI.setState(key, stateWithoutDeltalog, deltalog);
            if (newMetadata)
                this.storageAPI.setMetadata(key, newMetadata);
        }
        else {
            const writes = [
                this.storageAPI.setState(key, stateWithoutDeltalog, deltalog),
            ];
            if (newMetadata) {
                writes.push(this.storageAPI.setMetadata(key, newMetadata));
            }
            await Promise.all(writes);
        }
    }
    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */
    async onSync(matchID, playerID, credentials, numPlayers = 2) {
        const key = matchID;
        const fetchOpts = {
            state: true,
            metadata: true,
            log: true,
            initialState: true,
        };
        const fetchResult = isSynchronous(this.storageAPI)
            ? this.storageAPI.fetch(key, fetchOpts)
            : await this.storageAPI.fetch(key, fetchOpts);
        let { state, initialState, log, metadata } = fetchResult;
        if (this.auth && playerID !== undefined && playerID !== null) {
            const isAuthentic = await this.auth.authenticateCredentials({
                playerID,
                credentials,
                metadata,
            });
            if (!isAuthentic) {
                return { error: 'unauthorized' };
            }
        }
        // If the game doesn't exist, then create one on demand.
        // TODO: Move this out of the sync call.
        if (state === undefined) {
            const match = createMatch({
                game: this.game,
                unlisted: true,
                numPlayers,
                setupData: undefined,
            });
            if ('setupDataError' in match) {
                return { error: 'game requires setupData' };
            }
            initialState = state = match.initialState;
            metadata = match.metadata;
            this.subscribeCallback({ state, matchID });
            if (isSynchronous(this.storageAPI)) {
                this.storageAPI.createMatch(key, { initialState, metadata });
            }
            else {
                await this.storageAPI.createMatch(key, { initialState, metadata });
            }
        }
        const filteredMetadata = metadata ? filterMatchData(metadata) : undefined;
        const filteredState = {
            ...state,
            G: this.game.playerView(state.G, state.ctx, playerID),
            plugins: PlayerView(state, { playerID, game: this.game }),
            deltalog: undefined,
            _undo: [],
            _redo: [],
        };
        log = redactLog(log, playerID);
        const syncInfo = {
            state: filteredState,
            log,
            filteredMetadata,
            initialState,
        };
        this.transportAPI.send({
            playerID,
            type: 'sync',
            args: [matchID, syncInfo],
        });
        return;
    }
    /**
     * Called when a client connects or disconnects.
     * Updates and sends out metadata to reflect the player’s connection status.
     */
    async onConnectionChange(matchID, playerID, credentials, connected) {
        const key = matchID;
        // Ignore changes for clients without a playerID, e.g. spectators.
        if (playerID === undefined || playerID === null) {
            return;
        }
        let metadata;
        if (isSynchronous(this.storageAPI)) {
            ({ metadata } = this.storageAPI.fetch(key, { metadata: true }));
        }
        else {
            ({ metadata } = await this.storageAPI.fetch(key, { metadata: true }));
        }
        if (metadata === undefined) {
            error(`metadata not found for matchID=[${key}]`);
            return { error: 'metadata not found' };
        }
        if (metadata.players[playerID] === undefined) {
            error(`Player not in the match, matchID=[${key}] playerID=[${playerID}]`);
            return { error: 'player not in the match' };
        }
        if (this.auth) {
            const isAuthentic = await this.auth.authenticateCredentials({
                playerID,
                credentials,
                metadata,
            });
            if (!isAuthentic) {
                return { error: 'unauthorized' };
            }
        }
        metadata.players[playerID].isConnected = connected;
        const filteredMetadata = filterMatchData(metadata);
        this.transportAPI.sendAll(() => ({
            type: 'matchData',
            args: [matchID, filteredMetadata],
        }));
        if (isSynchronous(this.storageAPI)) {
            this.storageAPI.setMetadata(key, metadata);
        }
        else {
            await this.storageAPI.setMetadata(key, metadata);
        }
    }
    async onChatMessage(matchID, chatMessage, credentials) {
        const key = matchID;
        if (this.auth) {
            const { metadata } = await this.storageAPI.fetch(key, {
                metadata: true,
            });
            const isAuthentic = await this.auth.authenticateCredentials({
                playerID: chatMessage.sender,
                credentials,
                metadata,
            });
            if (!isAuthentic) {
                return { error: 'unauthorized' };
            }
        }
        this.transportAPI.sendAll(() => ({
            type: 'chat',
            args: [matchID, chatMessage],
        }));
    }
}

export { Master as M };
