'use strict';

var turnOrder = require('./turn-order-4ab12333.js');
var rfc6902 = require('rfc6902');

const applyPlayerView = (game, playerID, state) => ({
    ...state,
    G: game.playerView({ G: state.G, ctx: state.ctx, playerID }),
    plugins: turnOrder.PlayerView(state, { playerID, game }),
    deltalog: undefined,
    _undo: [],
    _redo: [],
});
/** Gets a function that filters the TransportData for a given player and game. */
const getFilterPlayerView = (game) => (playerID, payload) => {
    switch (payload.type) {
        case 'patch': {
            const [matchID, stateID, prevState, state] = payload.args;
            const log = redactLog(state.deltalog, playerID);
            const filteredState = applyPlayerView(game, playerID, state);
            const newStateID = state._stateID;
            const prevFilteredState = applyPlayerView(game, playerID, prevState);
            const patch = rfc6902.createPatch(prevFilteredState, filteredState);
            return {
                type: 'patch',
                args: [matchID, stateID, newStateID, patch, log],
            };
        }
        case 'update': {
            const [matchID, state] = payload.args;
            const log = redactLog(state.deltalog, playerID);
            const filteredState = applyPlayerView(game, playerID, state);
            return {
                type: 'update',
                args: [matchID, filteredState, log],
            };
        }
        case 'sync': {
            const [matchID, syncInfo] = payload.args;
            const filteredState = applyPlayerView(game, playerID, syncInfo.state);
            const log = redactLog(syncInfo.log, playerID);
            const newSyncInfo = {
                ...syncInfo,
                state: filteredState,
                log,
            };
            return {
                type: 'sync',
                args: [matchID, newSyncInfo],
            };
        }
        default: {
            return payload;
        }
    }
};
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

exports.getFilterPlayerView = getFilterPlayerView;
