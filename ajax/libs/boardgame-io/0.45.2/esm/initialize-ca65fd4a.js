import { r as Setup, f as Enhance, E as EnhanceCtx, h as Flush } from './turn-order-62966a9c.js';
import { P as ProcessGameConfig } from './reducer-763b001e.js';

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Creates the initial game state.
 */
function InitializeGame({ game, numPlayers, setupData, }) {
    game = ProcessGameConfig(game);
    if (!numPlayers) {
        numPlayers = 2;
    }
    const ctx = game.flow.ctx(numPlayers);
    let state = {
        // User managed state.
        G: {},
        // Framework managed state.
        ctx,
        // Plugin related state.
        plugins: {},
    };
    // Run plugins over initial state.
    state = Setup(state, { game });
    state = Enhance(state, { game, playerID: undefined });
    const enhancedCtx = EnhanceCtx(state);
    state.G = game.setup(enhancedCtx, setupData);
    let initial = {
        ...state,
        // List of {G, ctx} pairs that can be undone.
        _undo: [],
        // List of {G, ctx} pairs that can be redone.
        _redo: [],
        // A monotonically non-decreasing ID to ensure that
        // state updates are only allowed from clients that
        // are at the same version that the server.
        _stateID: 0,
    };
    initial = game.flow.init(initial);
    initial = Flush(initial, { game });
    // Initialize undo stack.
    if (!game.disableUndo) {
        initial._undo = [
            {
                G: initial.G,
                ctx: initial.ctx,
                plugins: initial.plugins,
            },
        ];
    }
    return initial;
}

export { InitializeGame as I };
