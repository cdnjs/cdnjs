'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var turnOrder = require('./turn-order-4ab12333.js');
require('immer');
require('./plugin-random-7425844d.js');
require('lodash.isplainobject');

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * PlayerView reducers.
 */
const PlayerView = {
    /**
     * STRIP_SECRETS
     *
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: ({ G, playerID }) => {
        const r = { ...G };
        if (r.secret !== undefined) {
            delete r.secret;
        }
        if (r.players) {
            r.players = playerID
                ? {
                    [playerID]: r.players[playerID],
                }
                : {};
        }
        return r;
    },
};

exports.ActivePlayers = turnOrder.ActivePlayers;
Object.defineProperty(exports, 'GameMethod', {
  enumerable: true,
  get: function () {
    return turnOrder.GameMethod;
  }
});
exports.INVALID_MOVE = turnOrder.INVALID_MOVE;
exports.Stage = turnOrder.Stage;
exports.TurnOrder = turnOrder.TurnOrder;
exports.PlayerView = PlayerView;
