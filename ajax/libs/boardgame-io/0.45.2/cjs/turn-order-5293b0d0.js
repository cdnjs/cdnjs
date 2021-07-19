'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var produce = _interopDefault(require('immer'));
var isPlainObject = _interopDefault(require('lodash.isplainobject'));

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const MAKE_MOVE = 'MAKE_MOVE';
const GAME_EVENT = 'GAME_EVENT';
const REDO = 'REDO';
const RESET = 'RESET';
const SYNC = 'SYNC';
const UNDO = 'UNDO';
const UPDATE = 'UPDATE';
const PATCH = 'PATCH';
const PLUGIN = 'PLUGIN';
const STRIP_TRANSIENTS = 'STRIP_TRANSIENTS';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const makeMove = (type, args, playerID, credentials) => ({
    type: MAKE_MOVE,
    payload: { type, args, playerID, credentials },
});
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const gameEvent = (type, args, playerID, credentials) => ({
    type: GAME_EVENT,
    payload: { type, args, playerID, credentials },
});
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const automaticGameEvent = (type, args, playerID, credentials) => ({
    type: GAME_EVENT,
    payload: { type, args, playerID, credentials },
    automatic: true,
});
const sync = (info) => ({
    type: SYNC,
    state: info.state,
    log: info.log,
    initialState: info.initialState,
    clientOnly: true,
});
/**
 * Used to update the Redux store's state with patch in response to
 * an action coming from another player.
 * @param prevStateID previous stateID
 * @param stateID stateID after this patch
 * @param {Operation[]} patch - The patch to apply.
 * @param {LogEntry[]} deltalog - A log delta.
 */
const patch = (prevStateID, stateID, patch, deltalog) => ({
    type: PATCH,
    prevStateID,
    stateID,
    patch,
    deltalog,
    clientOnly: true,
});
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */
const update = (state, deltalog) => ({
    type: UPDATE,
    state,
    deltalog,
    clientOnly: true,
});
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */
const reset = (state) => ({
    type: RESET,
    state,
    clientOnly: true,
});
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const undo = (playerID, credentials) => ({
    type: UNDO,
    payload: { type: null, args: null, playerID, credentials },
});
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const redo = (playerID, credentials) => ({
    type: REDO,
    payload: { type: null, args: null, playerID, credentials },
});
/**
 * Allows plugins to define their own actions and intercept them.
 */
const plugin = (type, args, playerID, credentials) => ({
    type: PLUGIN,
    payload: { type, args, playerID, credentials },
});
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */
const stripTransients = () => ({
    type: STRIP_TRANSIENTS,
});

var ActionCreators = /*#__PURE__*/Object.freeze({
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  patch: patch,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin,
  stripTransients: stripTransients
});

/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */
const INVALID_MOVE = 'INVALID_MOVE';

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */
const ImmerPlugin = {
    name: 'plugin-immer',
    fnWrap: (move) => (G, ctx, ...args) => {
        let isInvalid = false;
        const newG = produce(G, (G) => {
            const result = move(G, ctx, ...args);
            if (result === INVALID_MOVE) {
                isInvalid = true;
                return;
            }
            return result;
        });
        if (isInvalid)
            return INVALID_MOVE;
        return newG;
    },
};

// Inlined version of Alea from https://github.com/davidbau/seedrandom.
// Converted to Typescript October 2020.
class Alea {
    constructor(seed) {
        const mash = Mash();
        // Apply the seeding algorithm from Baagoe.
        this.c = 1;
        this.s0 = mash(' ');
        this.s1 = mash(' ');
        this.s2 = mash(' ');
        this.s0 -= mash(seed);
        if (this.s0 < 0) {
            this.s0 += 1;
        }
        this.s1 -= mash(seed);
        if (this.s1 < 0) {
            this.s1 += 1;
        }
        this.s2 -= mash(seed);
        if (this.s2 < 0) {
            this.s2 += 1;
        }
    }
    next() {
        const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
        this.s0 = this.s1;
        this.s1 = this.s2;
        return (this.s2 = t - (this.c = Math.trunc(t)));
    }
}
function Mash() {
    let n = 0xefc8249d;
    const mash = function (data) {
        const str = data.toString();
        for (let i = 0; i < str.length; i++) {
            n += str.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
    return mash;
}
function copy(f, t) {
    t.c = f.c;
    t.s0 = f.s0;
    t.s1 = f.s1;
    t.s2 = f.s2;
    return t;
}
function alea(seed, state) {
    const xg = new Alea(seed);
    const prng = xg.next.bind(xg);
    if (state)
        copy(state, xg);
    prng.state = () => copy(xg, {});
    return prng;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */
class Random {
    /**
     * constructor
     * @param {object} ctx - The ctx object to initialize from.
     */
    constructor(state) {
        // If we are on the client, the seed is not present.
        // Just use a temporary seed to execute the move without
        // crashing it. The move state itself is discarded,
        // so the actual value doesn't matter.
        this.state = state || { seed: '0' };
        this.used = false;
    }
    /**
     * Generates a new seed from the current date / time.
     */
    static seed() {
        return Date.now().toString(36).slice(-10);
    }
    isUsed() {
        return this.used;
    }
    getState() {
        return this.state;
    }
    /**
     * Generate a random number.
     */
    _random() {
        this.used = true;
        const R = this.state;
        const seed = R.prngstate ? '' : R.seed;
        const rand = alea(seed, R.prngstate);
        const number = rand();
        this.state = {
            ...R,
            prngstate: rand.state(),
        };
        return number;
    }
    api() {
        const random = this._random.bind(this);
        const SpotValue = {
            D4: 4,
            D6: 6,
            D8: 8,
            D10: 10,
            D12: 12,
            D20: 20,
        };
        // Generate functions for predefined dice values D4 - D20.
        const predefined = {};
        for (const key in SpotValue) {
            const spotvalue = SpotValue[key];
            predefined[key] = (diceCount) => {
                return diceCount === undefined
                    ? Math.floor(random() * spotvalue) + 1
                    : [...new Array(diceCount).keys()].map(() => Math.floor(random() * spotvalue) + 1);
            };
        }
        function Die(spotvalue = 6, diceCount) {
            return diceCount === undefined
                ? Math.floor(random() * spotvalue) + 1
                : [...new Array(diceCount).keys()].map(() => Math.floor(random() * spotvalue) + 1);
        }
        return {
            /**
             * Similar to Die below, but with fixed spot values.
             * Supports passing a diceCount
             *    if not defined, defaults to 1 and returns the value directly.
             *    if defined, returns an array containing the random dice values.
             *
             * D4: (diceCount) => value
             * D6: (diceCount) => value
             * D8: (diceCount) => value
             * D10: (diceCount) => value
             * D12: (diceCount) => value
             * D20: (diceCount) => value
             */
            ...predefined,
            /**
             * Roll a die of specified spot value.
             *
             * @param {number} spotvalue - The die dimension (default: 6).
             * @param {number} diceCount - number of dice to throw.
             *                             if not defined, defaults to 1 and returns the value directly.
             *                             if defined, returns an array containing the random dice values.
             */
            Die,
            /**
             * Generate a random number between 0 and 1.
             */
            Number: () => {
                return random();
            },
            /**
             * Shuffle an array.
             *
             * @param {Array} deck - The array to shuffle. Does not mutate
             *                       the input, but returns the shuffled array.
             */
            Shuffle: (deck) => {
                const clone = deck.slice(0);
                let srcIndex = deck.length;
                let dstIndex = 0;
                const shuffled = new Array(srcIndex);
                while (srcIndex) {
                    const randIndex = Math.trunc(srcIndex * random());
                    shuffled[dstIndex++] = clone[randIndex];
                    clone[randIndex] = clone[--srcIndex];
                }
                return shuffled;
            },
            _obj: this,
        };
    }
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const RandomPlugin = {
    name: 'random',
    noClient: ({ api }) => {
        return api._obj.isUsed();
    },
    flush: ({ api }) => {
        return api._obj.getState();
    },
    api: ({ data }) => {
        const random = new Random(data);
        return random.api();
    },
    setup: ({ game }) => {
        let { seed } = game;
        if (seed === undefined) {
            seed = Random.seed();
        }
        return { seed };
    },
    playerView: () => undefined,
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Events
 */
class Events {
    constructor(flow, playerID) {
        this.flow = flow;
        this.playerID = playerID;
        this.dispatch = [];
    }
    /**
     * Attaches the Events API to ctx.
     * @param {object} ctx - The ctx object to attach to.
     */
    api(ctx) {
        const events = {
            _obj: this,
        };
        const { phase, turn } = ctx;
        for (const key of this.flow.eventNames) {
            events[key] = (...args) => {
                this.dispatch.push({ key, args, phase, turn });
            };
        }
        return events;
    }
    isUsed() {
        return this.dispatch.length > 0;
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
    update(state) {
        for (let i = 0; i < this.dispatch.length; i++) {
            const item = this.dispatch[i];
            // If the turn already ended some other way,
            // don't try to end the turn again.
            if (item.key === 'endTurn' && item.turn !== state.ctx.turn) {
                continue;
            }
            // If the phase already ended some other way,
            // don't try to end the phase again.
            if ((item.key === 'endPhase' || item.key === 'setPhase') &&
                item.phase !== state.ctx.phase) {
                continue;
            }
            const action = automaticGameEvent(item.key, item.args, this.playerID);
            state = {
                ...state,
                ...this.flow.processEvent(state, action),
            };
        }
        return state;
    }
}

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const EventsPlugin = {
    name: 'events',
    noClient: ({ api }) => {
        return api._obj.isUsed();
    },
    dangerouslyFlushRawState: ({ state, api }) => {
        return api._obj.update(state);
    },
    api: ({ game, playerID, ctx }) => {
        return new Events(game.flow, playerID).api(ctx);
    },
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that makes it possible to add metadata to log entries.
 * During a move, you can set metadata using ctx.log.setMetadata and it will be
 * available on the log entry for that move.
 */
const LogPlugin = {
    name: 'log',
    flush: () => ({}),
    api: ({ data }) => {
        return {
            setMetadata: (metadata) => {
                data.metadata = metadata;
            },
        };
    },
    setup: () => ({}),
};

/**
 * Check if a value can be serialized (e.g. using `JSON.stringify`).
 * Adapted from: https://stackoverflow.com/a/30712764/3829557
 */
function isSerializable(value) {
    // Primitives are OK.
    if (value === undefined ||
        value === null ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        typeof value === 'string') {
        return true;
    }
    // A non-primitive value that is neither a POJO or an array cannot be serialized.
    if (!isPlainObject(value) && !Array.isArray(value)) {
        return false;
    }
    // Recurse entries if the value is an object or array.
    for (const key in value) {
        if (!isSerializable(value[key]))
            return false;
    }
    return true;
}
/**
 * Plugin that checks whether state is serializable, in order to avoid
 * network serialization bugs.
 */
const SerializablePlugin = {
    name: 'plugin-serializable',
    fnWrap: (move) => (G, ctx, ...args) => {
        const result = move(G, ctx, ...args);
        // Check state in non-production environments.
        if (process.env.NODE_ENV !== 'production' && !isSerializable(result)) {
            throw new Error('Move state is not JSON-serialiazable.\n' +
                'See https://boardgame.io/documentation/#/?id=state for more information.');
        }
        return result;
    },
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * List of plugins that are always added.
 */
const CORE_PLUGINS = [ImmerPlugin, RandomPlugin, LogPlugin, SerializablePlugin];
const DEFAULT_PLUGINS = [...CORE_PLUGINS, EventsPlugin];
/**
 * Allow plugins to intercept actions and process them.
 */
const ProcessAction = (state, action, opts) => {
    // TODO(#723): Extend error handling to plugins.
    opts.game.plugins
        .filter((plugin) => plugin.action !== undefined)
        .filter((plugin) => plugin.name === action.payload.type)
        .forEach((plugin) => {
        const name = plugin.name;
        const pluginState = state.plugins[name] || { data: {} };
        const data = plugin.action(pluginState.data, action.payload);
        state = {
            ...state,
            plugins: {
                ...state.plugins,
                [name]: { ...pluginState, data },
            },
        };
    });
    return state;
};
/**
 * The API's created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function takes these API's and stuffs them back into
 * ctx for consumption inside a move function or hook.
 */
const EnhanceCtx = (state) => {
    const ctx = { ...state.ctx };
    const plugins = state.plugins || {};
    Object.entries(plugins).forEach(([name, { api }]) => {
        ctx[name] = api;
    });
    return ctx;
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param {function} fn - The move function or trigger to apply the plugins to.
 * @param {object} plugins - The list of plugins.
 */
const FnWrap = (fn, plugins) => {
    const reducer = (acc, { fnWrap }) => fnWrap(acc);
    return [...DEFAULT_PLUGINS, ...plugins]
        .filter((plugin) => plugin.fnWrap !== undefined)
        .reduce(reducer, fn);
};
/**
 * Allows the plugin to generate its initial state.
 */
const Setup = (state, opts) => {
    [...DEFAULT_PLUGINS, ...opts.game.plugins]
        .filter((plugin) => plugin.setup !== undefined)
        .forEach((plugin) => {
        const name = plugin.name;
        const data = plugin.setup({
            G: state.G,
            ctx: state.ctx,
            game: opts.game,
        });
        state = {
            ...state,
            plugins: {
                ...state.plugins,
                [name]: { data },
            },
        };
    });
    return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */
const Enhance = (state, opts) => {
    [...DEFAULT_PLUGINS, ...opts.game.plugins]
        .filter((plugin) => plugin.api !== undefined)
        .forEach((plugin) => {
        const name = plugin.name;
        const pluginState = state.plugins[name] || { data: {} };
        const api = plugin.api({
            G: state.G,
            ctx: state.ctx,
            data: pluginState.data,
            game: opts.game,
            playerID: opts.playerID,
        });
        state = {
            ...state,
            plugins: {
                ...state.plugins,
                [name]: { ...pluginState, api },
            },
        };
    });
    return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */
const Flush = (state, opts) => {
    // We flush the events plugin first, then custom plugins and the core plugins.
    // This means custom plugins cannot use the events API but will be available in event hooks.
    // Note that plugins are flushed in reverse, to allow custom plugins calling each other.
    [...CORE_PLUGINS, ...opts.game.plugins, EventsPlugin]
        .reverse()
        .forEach((plugin) => {
        const name = plugin.name;
        const pluginState = state.plugins[name] || { data: {} };
        if (plugin.flush) {
            const newData = plugin.flush({
                G: state.G,
                ctx: state.ctx,
                game: opts.game,
                api: pluginState.api,
                data: pluginState.data,
            });
            state = {
                ...state,
                plugins: {
                    ...state.plugins,
                    [plugin.name]: { data: newData },
                },
            };
        }
        else if (plugin.dangerouslyFlushRawState) {
            state = plugin.dangerouslyFlushRawState({
                state,
                game: opts.game,
                api: pluginState.api,
                data: pluginState.data,
            });
            // Remove everything other than data.
            const data = state.plugins[name].data;
            state = {
                ...state,
                plugins: {
                    ...state.plugins,
                    [plugin.name]: { data },
                },
            };
        }
    });
    return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */
const NoClient = (state, opts) => {
    return [...DEFAULT_PLUGINS, ...opts.game.plugins]
        .filter((plugin) => plugin.noClient !== undefined)
        .map((plugin) => {
        const name = plugin.name;
        const pluginState = state.plugins[name];
        if (pluginState) {
            return plugin.noClient({
                G: state.G,
                ctx: state.ctx,
                game: opts.game,
                api: pluginState.api,
                data: pluginState.data,
            });
        }
        return false;
    })
        .some((value) => value === true);
};
/**
 * Allows plugins to customize their data for specific players.
 * For example, a plugin may want to share no data with the client, or
 * want to keep some player data secret from opponents.
 */
const PlayerView = ({ G, ctx, plugins = {} }, { game, playerID }) => {
    [...DEFAULT_PLUGINS, ...game.plugins].forEach(({ name, playerView }) => {
        if (!playerView)
            return;
        const { data } = plugins[name] || { data: {} };
        const newData = playerView({ G, ctx, game, data, playerID });
        plugins = {
            ...plugins,
            [name]: { data: newData },
        };
    });
    return plugins;
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const production = process.env.NODE_ENV === 'production';
const logfn = production ? () => { } : (...msg) => console.log(...msg);
const errorfn = (...msg) => console.error(...msg);
function info(msg) {
    logfn(`INFO: ${msg}`);
}
function error(error) {
    errorfn('ERROR:', error);
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Event to change the active players (and their stages) in the current turn.
 */
function SetActivePlayersEvent(state, _playerID, arg) {
    return { ...state, ctx: SetActivePlayers(state.ctx, arg) };
}
function SetActivePlayers(ctx, arg) {
    let { _prevActivePlayers } = ctx;
    let activePlayers = {};
    let _nextActivePlayers = null;
    let _activePlayersMoveLimit = {};
    if (Array.isArray(arg)) {
        // support a simple array of player IDs as active players
        const value = {};
        arg.forEach((v) => (value[v] = Stage.NULL));
        activePlayers = value;
    }
    else {
        // process active players argument object
        if (arg.next) {
            _nextActivePlayers = arg.next;
        }
        _prevActivePlayers = arg.revert
            ? _prevActivePlayers.concat({
                activePlayers: ctx.activePlayers,
                _activePlayersMoveLimit: ctx._activePlayersMoveLimit,
                _activePlayersNumMoves: ctx._activePlayersNumMoves,
            })
            : [];
        if (arg.currentPlayer !== undefined) {
            ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, ctx.currentPlayer, arg.currentPlayer);
        }
        if (arg.others !== undefined) {
            for (let i = 0; i < ctx.playOrder.length; i++) {
                const id = ctx.playOrder[i];
                if (id !== ctx.currentPlayer) {
                    ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.others);
                }
            }
        }
        if (arg.all !== undefined) {
            for (let i = 0; i < ctx.playOrder.length; i++) {
                const id = ctx.playOrder[i];
                ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.all);
            }
        }
        if (arg.value) {
            for (const id in arg.value) {
                ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.value[id]);
            }
        }
        if (arg.moveLimit) {
            for (const id in activePlayers) {
                if (_activePlayersMoveLimit[id] === undefined) {
                    _activePlayersMoveLimit[id] = arg.moveLimit;
                }
            }
        }
    }
    if (Object.keys(activePlayers).length == 0) {
        activePlayers = null;
    }
    if (Object.keys(_activePlayersMoveLimit).length == 0) {
        _activePlayersMoveLimit = null;
    }
    const _activePlayersNumMoves = {};
    for (const id in activePlayers) {
        _activePlayersNumMoves[id] = 0;
    }
    return {
        ...ctx,
        activePlayers,
        _activePlayersMoveLimit,
        _activePlayersNumMoves,
        _prevActivePlayers,
        _nextActivePlayers,
    };
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */
function UpdateActivePlayersOnceEmpty(ctx) {
    let { activePlayers, _activePlayersMoveLimit, _activePlayersNumMoves, _prevActivePlayers, } = ctx;
    if (activePlayers && Object.keys(activePlayers).length == 0) {
        if (ctx._nextActivePlayers) {
            ctx = SetActivePlayers(ctx, ctx._nextActivePlayers);
            ({
                activePlayers,
                _activePlayersMoveLimit,
                _activePlayersNumMoves,
                _prevActivePlayers,
            } = ctx);
        }
        else if (_prevActivePlayers.length > 0) {
            const lastIndex = _prevActivePlayers.length - 1;
            ({
                activePlayers,
                _activePlayersMoveLimit,
                _activePlayersNumMoves,
            } = _prevActivePlayers[lastIndex]);
            _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
        }
        else {
            activePlayers = null;
            _activePlayersMoveLimit = null;
        }
    }
    return {
        ...ctx,
        activePlayers,
        _activePlayersMoveLimit,
        _activePlayersNumMoves,
        _prevActivePlayers,
    };
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMoveLimit
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */
function ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, playerID, arg) {
    if (typeof arg !== 'object' || arg === Stage.NULL) {
        arg = { stage: arg };
    }
    if (arg.stage !== undefined) {
        activePlayers[playerID] = arg.stage;
        if (arg.moveLimit)
            _activePlayersMoveLimit[playerID] = arg.moveLimit;
    }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */
function getCurrentPlayer(playOrder, playOrderPos) {
    // convert to string in case playOrder is set to number[]
    return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */
function InitTurnOrderState(state, turn) {
    let { G, ctx } = state;
    const ctxWithAPI = EnhanceCtx(state);
    const order = turn.order;
    let playOrder = [...new Array(ctx.numPlayers)].map((_, i) => i + '');
    if (order.playOrder !== undefined) {
        playOrder = order.playOrder(G, ctxWithAPI);
    }
    const playOrderPos = order.first(G, ctxWithAPI);
    const posType = typeof playOrderPos;
    if (posType !== 'number') {
        error(`invalid value returned by turn.order.first — expected number got ${posType} “${playOrderPos}”.`);
    }
    const currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
    ctx = { ...ctx, currentPlayer, playOrderPos, playOrder };
    ctx = SetActivePlayers(ctx, turn.activePlayers || {});
    return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */
function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
    const order = turn.order;
    let { G, ctx } = state;
    let playOrderPos = ctx.playOrderPos;
    let endPhase = false;
    if (endTurnArg && endTurnArg !== true) {
        if (typeof endTurnArg !== 'object') {
            error(`invalid argument to endTurn: ${endTurnArg}`);
        }
        Object.keys(endTurnArg).forEach((arg) => {
            switch (arg) {
                case 'remove':
                    currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
                    break;
                case 'next':
                    playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
                    currentPlayer = endTurnArg.next;
                    break;
                default:
                    error(`invalid argument to endTurn: ${arg}`);
            }
        });
    }
    else {
        const ctxWithAPI = EnhanceCtx(state);
        const t = order.next(G, ctxWithAPI);
        const type = typeof t;
        if (t !== undefined && type !== 'number') {
            error(`invalid value returned by turn.order.next — expected number or undefined got ${type} “${t}”.`);
        }
        if (t === undefined) {
            endPhase = true;
        }
        else {
            playOrderPos = t;
            currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
        }
    }
    ctx = {
        ...ctx,
        playOrderPos,
        currentPlayer,
    };
    return { endPhase, ctx };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */
const TurnOrder = {
    /**
     * DEFAULT
     *
     * The default round-robin turn order.
     */
    DEFAULT: {
        first: (G, ctx) => ctx.turn === 0
            ? ctx.playOrderPos
            : (ctx.playOrderPos + 1) % ctx.playOrder.length,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * RESET
     *
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: {
        first: () => 0,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * CONTINUE
     *
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: {
        first: (G, ctx) => ctx.playOrderPos,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
        first: () => 0,
        next: (G, ctx) => {
            if (ctx.playOrderPos < ctx.playOrder.length - 1) {
                return ctx.playOrderPos + 1;
            }
        },
    },
    /**
     * CUSTOM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     *
     * @param {Array} playOrder - The play order.
     */
    CUSTOM: (playOrder) => ({
        playOrder: () => playOrder,
        first: () => 0,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    }),
    /**
     * CUSTOM_FROM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     *
     * @param {string} playOrderField - Field in G.
     */
    CUSTOM_FROM: (playOrderField) => ({
        playOrder: (G) => G[playOrderField],
        first: () => 0,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    }),
};
const Stage = {
    NULL: null,
};
const ActivePlayers = {
    /**
     * ALL
     *
     * The turn stays with one player, but any player can play (in any order)
     * until the phase ends.
     */
    ALL: { all: Stage.NULL },
    /**
     * ALL_ONCE
     *
     * The turn stays with one player, but any player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every player in the game.
     */
    ALL_ONCE: { all: Stage.NULL, moveLimit: 1 },
    /**
     * OTHERS
     *
     * The turn stays with one player, and every *other* player can play (in any order)
     * until the phase ends.
     */
    OTHERS: { others: Stage.NULL },
    /**
     * OTHERS_ONCE
     *
     * The turn stays with one player, and every *other* player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every *other* player in the game.
     */
    OTHERS_ONCE: { others: Stage.NULL, moveLimit: 1 },
};

exports.ActionCreators = ActionCreators;
exports.ActivePlayers = ActivePlayers;
exports.Enhance = Enhance;
exports.EnhanceCtx = EnhanceCtx;
exports.Flush = Flush;
exports.FnWrap = FnWrap;
exports.GAME_EVENT = GAME_EVENT;
exports.INVALID_MOVE = INVALID_MOVE;
exports.InitTurnOrderState = InitTurnOrderState;
exports.MAKE_MOVE = MAKE_MOVE;
exports.NoClient = NoClient;
exports.PATCH = PATCH;
exports.PLUGIN = PLUGIN;
exports.PlayerView = PlayerView;
exports.ProcessAction = ProcessAction;
exports.REDO = REDO;
exports.RESET = RESET;
exports.STRIP_TRANSIENTS = STRIP_TRANSIENTS;
exports.SYNC = SYNC;
exports.SetActivePlayers = SetActivePlayers;
exports.SetActivePlayersEvent = SetActivePlayersEvent;
exports.Setup = Setup;
exports.Stage = Stage;
exports.TurnOrder = TurnOrder;
exports.UNDO = UNDO;
exports.UPDATE = UPDATE;
exports.UpdateActivePlayersOnceEmpty = UpdateActivePlayersOnceEmpty;
exports.UpdateTurnOrderState = UpdateTurnOrderState;
exports.alea = alea;
exports.error = error;
exports.gameEvent = gameEvent;
exports.info = info;
exports.makeMove = makeMove;
exports.patch = patch;
exports.redo = redo;
exports.reset = reset;
exports.stripTransients = stripTransients;
exports.sync = sync;
exports.undo = undo;
exports.update = update;
