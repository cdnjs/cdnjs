'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var Router = _interopDefault(require('@koa/router'));
var koaBody = _interopDefault(require('koa-body'));
var nanoid = require('nanoid');
var cors = _interopDefault(require('@koa/cors'));
var produce = _interopDefault(require('immer'));
var isPlainObject = _interopDefault(require('lodash.isplainobject'));
var IO = _interopDefault(require('koa-socket-2'));
var PQueue = _interopDefault(require('p-queue'));
var rfc6902 = require('rfc6902');
var redux = require('redux');

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
    fnWrap: (move) => (context, ...args) => {
        let isInvalid = false;
        const newG = produce(context.G, (G) => {
            const result = move({ ...context, G }, ...args);
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
                    : Array.from({ length: diceCount }).map(() => Math.floor(random() * spotvalue) + 1);
            };
        }
        function Die(spotvalue = 6, diceCount) {
            return diceCount === undefined
                ? Math.floor(random() * spotvalue) + 1
                : Array.from({ length: diceCount }).map(() => Math.floor(random() * spotvalue) + 1);
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
                const clone = [...deck];
                let sourceIndex = deck.length;
                let destinationIndex = 0;
                const shuffled = Array.from({ length: sourceIndex });
                while (sourceIndex) {
                    const randomIndex = Math.trunc(sourceIndex * random());
                    shuffled[destinationIndex++] = clone[randomIndex];
                    clone[randomIndex] = clone[--sourceIndex];
                }
                return shuffled;
            },
            _private: this,
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
        return api._private.isUsed();
    },
    flush: ({ api }) => {
        return api._private.getState();
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
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */
const stripTransients = () => ({
    type: STRIP_TRANSIENTS,
});

var GameMethod;
(function (GameMethod) {
    GameMethod["MOVE"] = "MOVE";
    GameMethod["GAME_ON_END"] = "GAME_ON_END";
    GameMethod["PHASE_ON_BEGIN"] = "PHASE_ON_BEGIN";
    GameMethod["PHASE_ON_END"] = "PHASE_ON_END";
    GameMethod["TURN_ON_BEGIN"] = "TURN_ON_BEGIN";
    GameMethod["TURN_ON_MOVE"] = "TURN_ON_MOVE";
    GameMethod["TURN_ON_END"] = "TURN_ON_END";
})(GameMethod || (GameMethod = {}));

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Errors;
(function (Errors) {
    Errors["CalledOutsideHook"] = "Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.";
    Errors["EndTurnInOnEnd"] = "`endTurn` is disallowed in `onEnd` hooks \u2014 the turn is already ending.";
    Errors["MaxTurnEndings"] = "Maximum number of turn endings exceeded for this update.\nThis likely means game code is triggering an infinite loop.";
    Errors["PhaseEventInOnEnd"] = "`setPhase` & `endPhase` are disallowed in a phase\u2019s `onEnd` hook \u2014 the phase is already ending.\nIf you\u2019re trying to dynamically choose the next phase when a phase ends, use the phase\u2019s `next` trigger.";
    Errors["StageEventInOnEnd"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.";
    Errors["StageEventInPhaseBegin"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase\u2019s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.";
    Errors["StageEventInTurnBegin"] = "`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead.";
})(Errors || (Errors = {}));
/**
 * Events
 */
class Events {
    constructor(flow, ctx, playerID) {
        this.flow = flow;
        this.playerID = playerID;
        this.dispatch = [];
        this.initialTurn = ctx.turn;
        this.updateTurnContext(ctx, undefined);
        // This is an arbitrarily large upper threshold, which could be made
        // configurable via a game option if the need arises.
        this.maxEndedTurnsPerAction = ctx.numPlayers * 100;
    }
    api() {
        const events = {
            _private: this,
        };
        for (const type of this.flow.eventNames) {
            events[type] = (...args) => {
                this.dispatch.push({
                    type,
                    args,
                    phase: this.currentPhase,
                    turn: this.currentTurn,
                    calledFrom: this.currentMethod,
                    // Used to capture a stack trace in case it is needed later.
                    error: new Error('Events Plugin Error'),
                });
            };
        }
        return events;
    }
    isUsed() {
        return this.dispatch.length > 0;
    }
    updateTurnContext(ctx, methodType) {
        this.currentPhase = ctx.phase;
        this.currentTurn = ctx.turn;
        this.currentMethod = methodType;
    }
    unsetCurrentMethod() {
        this.currentMethod = undefined;
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
    update(state) {
        const initialState = state;
        const stateWithError = ({ stack }, message) => ({
            ...initialState,
            plugins: {
                ...initialState.plugins,
                events: {
                    ...initialState.plugins.events,
                    data: { error: message + '\n' + stack },
                },
            },
        });
        EventQueue: for (let i = 0; i < this.dispatch.length; i++) {
            const event = this.dispatch[i];
            const turnHasEnded = event.turn !== state.ctx.turn;
            // This protects against potential infinite loops if specific events are called on hooks.
            // The moment we exceed the defined threshold, we just bail out of all phases.
            const endedTurns = this.currentTurn - this.initialTurn;
            if (endedTurns >= this.maxEndedTurnsPerAction) {
                return stateWithError(event.error, Errors.MaxTurnEndings);
            }
            if (event.calledFrom === undefined) {
                return stateWithError(event.error, Errors.CalledOutsideHook);
            }
            // Stop processing events once the game has finished.
            if (state.ctx.gameover)
                break EventQueue;
            switch (event.type) {
                case 'endStage':
                case 'setStage':
                case 'setActivePlayers': {
                    switch (event.calledFrom) {
                        // Disallow all stage events in onEnd and phase.onBegin hooks.
                        case GameMethod.TURN_ON_END:
                        case GameMethod.PHASE_ON_END:
                            return stateWithError(event.error, Errors.StageEventInOnEnd);
                        case GameMethod.PHASE_ON_BEGIN:
                            return stateWithError(event.error, Errors.StageEventInPhaseBegin);
                        // Disallow setStage & endStage in turn.onBegin hooks.
                        case GameMethod.TURN_ON_BEGIN:
                            if (event.type === 'setActivePlayers')
                                break;
                            return stateWithError(event.error, Errors.StageEventInTurnBegin);
                    }
                    // If the turn already ended, don't try to process stage events.
                    if (turnHasEnded)
                        continue EventQueue;
                    break;
                }
                case 'endTurn': {
                    if (event.calledFrom === GameMethod.TURN_ON_END ||
                        event.calledFrom === GameMethod.PHASE_ON_END) {
                        return stateWithError(event.error, Errors.EndTurnInOnEnd);
                    }
                    // If the turn already ended some other way,
                    // don't try to end the turn again.
                    if (turnHasEnded)
                        continue EventQueue;
                    break;
                }
                case 'endPhase':
                case 'setPhase': {
                    if (event.calledFrom === GameMethod.PHASE_ON_END) {
                        return stateWithError(event.error, Errors.PhaseEventInOnEnd);
                    }
                    // If the phase already ended some other way,
                    // don't try to end the phase again.
                    if (event.phase !== state.ctx.phase)
                        continue EventQueue;
                    break;
                }
            }
            const action = automaticGameEvent(event.type, event.args, this.playerID);
            state = this.flow.processEvent(state, action);
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
    noClient: ({ api }) => api._private.isUsed(),
    isInvalid: ({ data }) => data.error || false,
    // Update the events plugin’s internal turn context each time a move
    // or hook is called. This allows events called after turn or phase
    // endings to dispatch the current turn and phase correctly.
    fnWrap: (method, methodType) => (context, ...args) => {
        const api = context.events;
        if (api)
            api._private.updateTurnContext(context.ctx, methodType);
        const G = method(context, ...args);
        if (api)
            api._private.unsetCurrentMethod();
        return G;
    },
    dangerouslyFlushRawState: ({ state, api }) => api._private.update(state),
    api: ({ game, ctx, playerID }) => new Events(game.flow, ctx, playerID).api(),
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
    fnWrap: (move) => (context, ...args) => {
        const result = move(context, ...args);
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
 * The APIs created by various plugins are stored in the plugins
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
 * This function retrieves plugin APIs and returns them as an object
 * for consumption as used by move contexts.
 */
const GetAPIs = ({ plugins }) => Object.entries(plugins || {}).reduce((apis, [name, { api }]) => {
    apis[name] = api;
    return apis;
}, {});
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param methodToWrap - The move function or hook to apply the plugins to.
 * @param methodType - The type of the move or hook being wrapped.
 * @param plugins - The list of plugins.
 */
const FnWrap = (methodToWrap, methodType, plugins) => {
    return [...CORE_PLUGINS, ...plugins, EventsPlugin]
        .filter((plugin) => plugin.fnWrap !== undefined)
        .reduce((method, { fnWrap }) => fnWrap(method, methodType), methodToWrap);
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
        .includes(true);
};
/**
 * Allows plugins to indicate if the entire action should be thrown out
 * as invalid. This will cancel the entire state update.
 */
const IsInvalid = (state, opts) => {
    const firstInvalidReturn = [...DEFAULT_PLUGINS, ...opts.game.plugins]
        .filter((plugin) => plugin.isInvalid !== undefined)
        .map((plugin) => {
        const { name } = plugin;
        const pluginState = state.plugins[name];
        const message = plugin.isInvalid({
            G: state.G,
            ctx: state.ctx,
            game: opts.game,
            data: pluginState && pluginState.data,
        });
        return message ? { plugin: name, message } : false;
    })
        .find((value) => value);
    return firstInvalidReturn || false;
};
/**
 * Update plugin state after move/event & check if plugins consider the update to be valid.
 * @returns Tuple of `[updatedState]` or `[originalState, invalidError]`.
 */
const FlushAndValidate = (state, opts) => {
    const updatedState = Flush(state, opts);
    const isInvalid = IsInvalid(updatedState, opts);
    if (!isInvalid)
        return [updatedState];
    const { plugin, message } = isInvalid;
    error(`${plugin} plugin declared action invalid:\n${message}`);
    return [state, isInvalid];
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

/**
 * Adjust the given options to use the new minMoves/maxMoves if a legacy moveLimit was given
 * @param options The options object to apply backwards compatibility to
 * @param enforceMinMoves Use moveLimit to set both minMoves and maxMoves
 */
function supportDeprecatedMoveLimit(options, enforceMinMoves = false) {
    if (options.moveLimit) {
        if (enforceMinMoves) {
            options.minMoves = options.moveLimit;
        }
        options.maxMoves = options.moveLimit;
        delete options.moveLimit;
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function SetActivePlayers(ctx, arg) {
    let activePlayers = {};
    let _prevActivePlayers = [];
    let _nextActivePlayers = null;
    let _activePlayersMinMoves = {};
    let _activePlayersMaxMoves = {};
    if (Array.isArray(arg)) {
        // support a simple array of player IDs as active players
        const value = {};
        arg.forEach((v) => (value[v] = Stage.NULL));
        activePlayers = value;
    }
    else {
        // process active players argument object
        // stages previously did not enforce minMoves, this behaviour is kept intentionally
        supportDeprecatedMoveLimit(arg);
        if (arg.next) {
            _nextActivePlayers = arg.next;
        }
        if (arg.revert) {
            _prevActivePlayers = [
                ...ctx._prevActivePlayers,
                {
                    activePlayers: ctx.activePlayers,
                    _activePlayersMinMoves: ctx._activePlayersMinMoves,
                    _activePlayersMaxMoves: ctx._activePlayersMaxMoves,
                    _activePlayersNumMoves: ctx._activePlayersNumMoves,
                },
            ];
        }
        if (arg.currentPlayer !== undefined) {
            ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, ctx.currentPlayer, arg.currentPlayer);
        }
        if (arg.others !== undefined) {
            for (let i = 0; i < ctx.playOrder.length; i++) {
                const id = ctx.playOrder[i];
                if (id !== ctx.currentPlayer) {
                    ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.others);
                }
            }
        }
        if (arg.all !== undefined) {
            for (let i = 0; i < ctx.playOrder.length; i++) {
                const id = ctx.playOrder[i];
                ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.all);
            }
        }
        if (arg.value) {
            for (const id in arg.value) {
                ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.value[id]);
            }
        }
        if (arg.minMoves) {
            for (const id in activePlayers) {
                if (_activePlayersMinMoves[id] === undefined) {
                    _activePlayersMinMoves[id] = arg.minMoves;
                }
            }
        }
        if (arg.maxMoves) {
            for (const id in activePlayers) {
                if (_activePlayersMaxMoves[id] === undefined) {
                    _activePlayersMaxMoves[id] = arg.maxMoves;
                }
            }
        }
    }
    if (Object.keys(activePlayers).length === 0) {
        activePlayers = null;
    }
    if (Object.keys(_activePlayersMinMoves).length === 0) {
        _activePlayersMinMoves = null;
    }
    if (Object.keys(_activePlayersMaxMoves).length === 0) {
        _activePlayersMaxMoves = null;
    }
    const _activePlayersNumMoves = {};
    for (const id in activePlayers) {
        _activePlayersNumMoves[id] = 0;
    }
    return {
        ...ctx,
        activePlayers,
        _activePlayersMinMoves,
        _activePlayersMaxMoves,
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
    let { activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _activePlayersNumMoves, _prevActivePlayers, _nextActivePlayers, } = ctx;
    if (activePlayers && Object.keys(activePlayers).length === 0) {
        if (_nextActivePlayers) {
            ctx = SetActivePlayers(ctx, _nextActivePlayers);
            ({
                activePlayers,
                _activePlayersMinMoves,
                _activePlayersMaxMoves,
                _activePlayersNumMoves,
                _prevActivePlayers,
            } = ctx);
        }
        else if (_prevActivePlayers.length > 0) {
            const lastIndex = _prevActivePlayers.length - 1;
            ({
                activePlayers,
                _activePlayersMinMoves,
                _activePlayersMaxMoves,
                _activePlayersNumMoves,
            } = _prevActivePlayers[lastIndex]);
            _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
        }
        else {
            activePlayers = null;
            _activePlayersMinMoves = null;
            _activePlayersMaxMoves = null;
        }
    }
    return {
        ...ctx,
        activePlayers,
        _activePlayersMinMoves,
        _activePlayersMaxMoves,
        _activePlayersNumMoves,
        _prevActivePlayers,
    };
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMinMoves
 * @param {Object} _activePlayersMaxMoves
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */
function ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, playerID, arg) {
    if (typeof arg !== 'object' || arg === Stage.NULL) {
        arg = { stage: arg };
    }
    if (arg.stage !== undefined) {
        // stages previously did not enforce minMoves, this behaviour is kept intentionally
        supportDeprecatedMoveLimit(arg);
        activePlayers[playerID] = arg.stage;
        if (arg.minMoves)
            _activePlayersMinMoves[playerID] = arg.minMoves;
        if (arg.maxMoves)
            _activePlayersMaxMoves[playerID] = arg.maxMoves;
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
    const { numPlayers } = ctx;
    const pluginAPIs = GetAPIs(state);
    const context = { ...pluginAPIs, G, ctx };
    const order = turn.order;
    let playOrder = [...Array.from({ length: numPlayers })].map((_, i) => i + '');
    if (order.playOrder !== undefined) {
        playOrder = order.playOrder(context);
    }
    const playOrderPos = order.first(context);
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
        const pluginAPIs = GetAPIs(state);
        const context = { ...pluginAPIs, G, ctx };
        const t = order.next(context);
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
        first: ({ ctx }) => ctx.turn === 0
            ? ctx.playOrderPos
            : (ctx.playOrderPos + 1) % ctx.playOrder.length,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * RESET
     *
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: {
        first: () => 0,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * CONTINUE
     *
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: {
        first: ({ ctx }) => ctx.playOrderPos,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    },
    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
        first: () => 0,
        next: ({ ctx }) => {
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
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
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
        playOrder: ({ G }) => G[playOrderField],
        first: () => 0,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
    }),
};
const Stage = {
    NULL: null,
};

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow({ moves, phases, endIf, onEnd, turn, events, plugins, }) {
    // Attach defaults.
    if (moves === undefined) {
        moves = {};
    }
    if (events === undefined) {
        events = {};
    }
    if (plugins === undefined) {
        plugins = [];
    }
    if (phases === undefined) {
        phases = {};
    }
    if (!endIf)
        endIf = () => undefined;
    if (!onEnd)
        onEnd = ({ G }) => G;
    if (!turn)
        turn = {};
    const phaseMap = { ...phases };
    if ('' in phaseMap) {
        error('cannot specify phase with empty name');
    }
    phaseMap[''] = {};
    const moveMap = {};
    const moveNames = new Set();
    let startingPhase = null;
    Object.keys(moves).forEach((name) => moveNames.add(name));
    const HookWrapper = (hook, hookType) => {
        const withPlugins = FnWrap(hook, hookType, plugins);
        return (state) => {
            const pluginAPIs = GetAPIs(state);
            return withPlugins({
                ...pluginAPIs,
                G: state.G,
                ctx: state.ctx,
                playerID: state.playerID,
            });
        };
    };
    const TriggerWrapper = (trigger) => {
        return (state) => {
            const pluginAPIs = GetAPIs(state);
            return trigger({
                ...pluginAPIs,
                G: state.G,
                ctx: state.ctx,
            });
        };
    };
    const wrapped = {
        onEnd: HookWrapper(onEnd, GameMethod.GAME_ON_END),
        endIf: TriggerWrapper(endIf),
    };
    for (const phase in phaseMap) {
        const phaseConfig = phaseMap[phase];
        if (phaseConfig.start === true) {
            startingPhase = phase;
        }
        if (phaseConfig.moves !== undefined) {
            for (const move of Object.keys(phaseConfig.moves)) {
                moveMap[phase + '.' + move] = phaseConfig.moves[move];
                moveNames.add(move);
            }
        }
        if (phaseConfig.endIf === undefined) {
            phaseConfig.endIf = () => undefined;
        }
        if (phaseConfig.onBegin === undefined) {
            phaseConfig.onBegin = ({ G }) => G;
        }
        if (phaseConfig.onEnd === undefined) {
            phaseConfig.onEnd = ({ G }) => G;
        }
        if (phaseConfig.turn === undefined) {
            phaseConfig.turn = turn;
        }
        if (phaseConfig.turn.order === undefined) {
            phaseConfig.turn.order = TurnOrder.DEFAULT;
        }
        if (phaseConfig.turn.onBegin === undefined) {
            phaseConfig.turn.onBegin = ({ G }) => G;
        }
        if (phaseConfig.turn.onEnd === undefined) {
            phaseConfig.turn.onEnd = ({ G }) => G;
        }
        if (phaseConfig.turn.endIf === undefined) {
            phaseConfig.turn.endIf = () => false;
        }
        if (phaseConfig.turn.onMove === undefined) {
            phaseConfig.turn.onMove = ({ G }) => G;
        }
        if (phaseConfig.turn.stages === undefined) {
            phaseConfig.turn.stages = {};
        }
        // turns previously treated moveLimit as both minMoves and maxMoves, this behaviour is kept intentionally
        supportDeprecatedMoveLimit(phaseConfig.turn, true);
        for (const stage in phaseConfig.turn.stages) {
            const stageConfig = phaseConfig.turn.stages[stage];
            const moves = stageConfig.moves || {};
            for (const move of Object.keys(moves)) {
                const key = phase + '.' + stage + '.' + move;
                moveMap[key] = moves[move];
                moveNames.add(move);
            }
        }
        phaseConfig.wrapped = {
            onBegin: HookWrapper(phaseConfig.onBegin, GameMethod.PHASE_ON_BEGIN),
            onEnd: HookWrapper(phaseConfig.onEnd, GameMethod.PHASE_ON_END),
            endIf: TriggerWrapper(phaseConfig.endIf),
        };
        phaseConfig.turn.wrapped = {
            onMove: HookWrapper(phaseConfig.turn.onMove, GameMethod.TURN_ON_MOVE),
            onBegin: HookWrapper(phaseConfig.turn.onBegin, GameMethod.TURN_ON_BEGIN),
            onEnd: HookWrapper(phaseConfig.turn.onEnd, GameMethod.TURN_ON_END),
            endIf: TriggerWrapper(phaseConfig.turn.endIf),
        };
        if (typeof phaseConfig.next !== 'function') {
            const { next } = phaseConfig;
            phaseConfig.next = () => next || null;
        }
        phaseConfig.wrapped.next = TriggerWrapper(phaseConfig.next);
    }
    function GetPhase(ctx) {
        return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
    }
    function OnMove(state) {
        return state;
    }
    function Process(state, events) {
        const phasesEnded = new Set();
        const turnsEnded = new Set();
        for (let i = 0; i < events.length; i++) {
            const { fn, arg, ...rest } = events[i];
            // Detect a loop of EndPhase calls.
            // This could potentially even be an infinite loop
            // if the endIf condition of each phase blindly
            // returns true. The moment we detect a single
            // loop, we just bail out of all phases.
            if (fn === EndPhase) {
                turnsEnded.clear();
                const phase = state.ctx.phase;
                if (phasesEnded.has(phase)) {
                    const ctx = { ...state.ctx, phase: null };
                    return { ...state, ctx };
                }
                phasesEnded.add(phase);
            }
            // Process event.
            const next = [];
            state = fn(state, {
                ...rest,
                arg,
                next,
            });
            if (fn === EndGame) {
                break;
            }
            // Check if we should end the game.
            const shouldEndGame = ShouldEndGame(state);
            if (shouldEndGame) {
                events.push({
                    fn: EndGame,
                    arg: shouldEndGame,
                    turn: state.ctx.turn,
                    phase: state.ctx.phase,
                    automatic: true,
                });
                continue;
            }
            // Check if we should end the phase.
            const shouldEndPhase = ShouldEndPhase(state);
            if (shouldEndPhase) {
                events.push({
                    fn: EndPhase,
                    arg: shouldEndPhase,
                    turn: state.ctx.turn,
                    phase: state.ctx.phase,
                    automatic: true,
                });
                continue;
            }
            // Check if we should end the turn.
            if ([OnMove, UpdateStage, UpdateActivePlayers].includes(fn)) {
                const shouldEndTurn = ShouldEndTurn(state);
                if (shouldEndTurn) {
                    events.push({
                        fn: EndTurn,
                        arg: shouldEndTurn,
                        turn: state.ctx.turn,
                        phase: state.ctx.phase,
                        automatic: true,
                    });
                    continue;
                }
            }
            events.push(...next);
        }
        return state;
    }
    ///////////
    // Start //
    ///////////
    function StartGame(state, { next }) {
        next.push({ fn: StartPhase });
        return state;
    }
    function StartPhase(state, { next }) {
        let { G, ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Run any phase setup code provided by the user.
        G = phaseConfig.wrapped.onBegin(state);
        next.push({ fn: StartTurn });
        return { ...state, G, ctx };
    }
    function StartTurn(state, { currentPlayer }) {
        let { ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Initialize the turn order state.
        if (currentPlayer) {
            ctx = { ...ctx, currentPlayer };
            if (phaseConfig.turn.activePlayers) {
                ctx = SetActivePlayers(ctx, phaseConfig.turn.activePlayers);
            }
        }
        else {
            // This is only called at the beginning of the phase
            // when there is no currentPlayer yet.
            ctx = InitTurnOrderState(state, phaseConfig.turn);
        }
        const turn = ctx.turn + 1;
        ctx = { ...ctx, turn, numMoves: 0, _prevActivePlayers: [] };
        const G = phaseConfig.turn.wrapped.onBegin({ ...state, ctx });
        return { ...state, G, ctx, _undo: [], _redo: [] };
    }
    ////////////
    // Update //
    ////////////
    function UpdatePhase(state, { arg, next, phase }) {
        const phaseConfig = GetPhase({ phase });
        let { ctx } = state;
        if (arg && arg.next) {
            if (arg.next in phaseMap) {
                ctx = { ...ctx, phase: arg.next };
            }
            else {
                error('invalid phase: ' + arg.next);
                return state;
            }
        }
        else {
            ctx = { ...ctx, phase: phaseConfig.wrapped.next(state) || null };
        }
        state = { ...state, ctx };
        // Start the new phase.
        next.push({ fn: StartPhase });
        return state;
    }
    function UpdateTurn(state, { arg, currentPlayer, next }) {
        let { G, ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Update turn order state.
        const { endPhase, ctx: newCtx } = UpdateTurnOrderState(state, currentPlayer, phaseConfig.turn, arg);
        ctx = newCtx;
        state = { ...state, G, ctx };
        if (endPhase) {
            next.push({ fn: EndPhase, turn: ctx.turn, phase: ctx.phase });
        }
        else {
            next.push({ fn: StartTurn, currentPlayer: ctx.currentPlayer });
        }
        return state;
    }
    function UpdateStage(state, { arg, playerID }) {
        if (typeof arg === 'string' || arg === Stage.NULL) {
            arg = { stage: arg };
        }
        if (typeof arg !== 'object')
            return state;
        // `arg` should be of type `StageArg`, loose typing as `any` here for historic reasons
        // stages previously did not enforce minMoves, this behaviour is kept intentionally
        supportDeprecatedMoveLimit(arg);
        let { ctx } = state;
        let { activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _activePlayersNumMoves, } = ctx;
        // Checking if stage is valid, even Stage.NULL
        if (arg.stage !== undefined) {
            if (activePlayers === null) {
                activePlayers = {};
            }
            activePlayers[playerID] = arg.stage;
            _activePlayersNumMoves[playerID] = 0;
            if (arg.minMoves) {
                if (_activePlayersMinMoves === null) {
                    _activePlayersMinMoves = {};
                }
                _activePlayersMinMoves[playerID] = arg.minMoves;
            }
            if (arg.maxMoves) {
                if (_activePlayersMaxMoves === null) {
                    _activePlayersMaxMoves = {};
                }
                _activePlayersMaxMoves[playerID] = arg.maxMoves;
            }
        }
        ctx = {
            ...ctx,
            activePlayers,
            _activePlayersMinMoves,
            _activePlayersMaxMoves,
            _activePlayersNumMoves,
        };
        return { ...state, ctx };
    }
    function UpdateActivePlayers(state, { arg }) {
        return { ...state, ctx: SetActivePlayers(state.ctx, arg) };
    }
    ///////////////
    // ShouldEnd //
    ///////////////
    function ShouldEndGame(state) {
        return wrapped.endIf(state);
    }
    function ShouldEndPhase(state) {
        const phaseConfig = GetPhase(state.ctx);
        return phaseConfig.wrapped.endIf(state);
    }
    function ShouldEndTurn(state) {
        const phaseConfig = GetPhase(state.ctx);
        // End the turn if the required number of moves has been made.
        const currentPlayerMoves = state.ctx.numMoves || 0;
        if (phaseConfig.turn.maxMoves &&
            currentPlayerMoves >= phaseConfig.turn.maxMoves) {
            return true;
        }
        return phaseConfig.turn.wrapped.endIf(state);
    }
    /////////
    // End //
    /////////
    function EndGame(state, { arg, phase }) {
        state = EndPhase(state, { phase });
        if (arg === undefined) {
            arg = true;
        }
        state = { ...state, ctx: { ...state.ctx, gameover: arg } };
        // Run game end hook.
        const G = wrapped.onEnd(state);
        return { ...state, G };
    }
    function EndPhase(state, { arg, next, turn: initialTurn, automatic }) {
        // End the turn first.
        state = EndTurn(state, { turn: initialTurn, force: true, automatic: true });
        const { phase, turn } = state.ctx;
        if (next) {
            next.push({ fn: UpdatePhase, arg, phase });
        }
        // If we aren't in a phase, there is nothing else to do.
        if (phase === null) {
            return state;
        }
        // Run any cleanup code for the phase that is about to end.
        const phaseConfig = GetPhase(state.ctx);
        const G = phaseConfig.wrapped.onEnd(state);
        // Reset the phase.
        const ctx = { ...state.ctx, phase: null };
        // Add log entry.
        const action = gameEvent('endPhase', arg);
        const { _stateID } = state;
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, G, ctx, deltalog };
    }
    function EndTurn(state, { arg, next, turn: initialTurn, force, automatic, playerID }) {
        // This is not the turn that EndTurn was originally
        // called for. The turn was probably ended some other way.
        if (initialTurn !== state.ctx.turn) {
            return state;
        }
        const { currentPlayer, numMoves, phase, turn } = state.ctx;
        const phaseConfig = GetPhase(state.ctx);
        // Prevent ending the turn if minMoves haven't been reached.
        const currentPlayerMoves = numMoves || 0;
        if (!force &&
            phaseConfig.turn.minMoves &&
            currentPlayerMoves < phaseConfig.turn.minMoves) {
            info(`cannot end turn before making ${phaseConfig.turn.minMoves} moves`);
            return state;
        }
        // Run turn-end triggers.
        const G = phaseConfig.turn.wrapped.onEnd(state);
        if (next) {
            next.push({ fn: UpdateTurn, arg, currentPlayer });
        }
        // Reset activePlayers.
        let ctx = { ...state.ctx, activePlayers: null };
        // Remove player from playerOrder
        if (arg && arg.remove) {
            playerID = playerID || currentPlayer;
            const playOrder = ctx.playOrder.filter((i) => i != playerID);
            const playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
            ctx = { ...ctx, playOrder, playOrderPos };
            if (playOrder.length === 0) {
                next.push({ fn: EndPhase, turn, phase });
                return state;
            }
        }
        // Create log entry.
        const action = gameEvent('endTurn', arg);
        const { _stateID } = state;
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, G, ctx, deltalog, _undo: [], _redo: [] };
    }
    function EndStage(state, { arg, next, automatic, playerID }) {
        playerID = playerID || state.ctx.currentPlayer;
        let { ctx, _stateID } = state;
        let { activePlayers, _activePlayersNumMoves, _activePlayersMinMoves, _activePlayersMaxMoves, phase, turn, } = ctx;
        const playerInStage = activePlayers !== null && playerID in activePlayers;
        const phaseConfig = GetPhase(ctx);
        if (!arg && playerInStage) {
            const stage = phaseConfig.turn.stages[activePlayers[playerID]];
            if (stage && stage.next) {
                arg = stage.next;
            }
        }
        // Checking if arg is a valid stage, even Stage.NULL
        if (next) {
            next.push({ fn: UpdateStage, arg, playerID });
        }
        // If player isn’t in a stage, there is nothing else to do.
        if (!playerInStage)
            return state;
        // Prevent ending the stage if minMoves haven't been reached.
        const currentPlayerMoves = _activePlayersNumMoves[playerID] || 0;
        if (_activePlayersMinMoves &&
            _activePlayersMinMoves[playerID] &&
            currentPlayerMoves < _activePlayersMinMoves[playerID]) {
            info(`cannot end stage before making ${_activePlayersMinMoves[playerID]} moves`);
            return state;
        }
        // Remove player from activePlayers.
        activePlayers = { ...activePlayers };
        delete activePlayers[playerID];
        if (_activePlayersMinMoves) {
            // Remove player from _activePlayersMinMoves.
            _activePlayersMinMoves = { ..._activePlayersMinMoves };
            delete _activePlayersMinMoves[playerID];
        }
        if (_activePlayersMaxMoves) {
            // Remove player from _activePlayersMaxMoves.
            _activePlayersMaxMoves = { ..._activePlayersMaxMoves };
            delete _activePlayersMaxMoves[playerID];
        }
        ctx = UpdateActivePlayersOnceEmpty({
            ...ctx,
            activePlayers,
            _activePlayersMinMoves,
            _activePlayersMaxMoves,
        });
        // Create log entry.
        const action = gameEvent('endStage', arg);
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, ctx, deltalog };
    }
    /**
     * Retrieves the relevant move that can be played by playerID.
     *
     * If ctx.activePlayers is set (i.e. one or more players are in some stage),
     * then it attempts to find the move inside the stages config for
     * that turn. If the stage for a player is '', then the player is
     * allowed to make a move (as determined by the phase config), but
     * isn't restricted to a particular set as defined in the stage config.
     *
     * If not, it then looks for the move inside the phase.
     *
     * If it doesn't find the move there, it looks at the global move definition.
     *
     * @param {object} ctx
     * @param {string} name
     * @param {string} playerID
     */
    function GetMove(ctx, name, playerID) {
        const phaseConfig = GetPhase(ctx);
        const stages = phaseConfig.turn.stages;
        const { activePlayers } = ctx;
        if (activePlayers &&
            activePlayers[playerID] !== undefined &&
            activePlayers[playerID] !== Stage.NULL &&
            stages[activePlayers[playerID]] !== undefined &&
            stages[activePlayers[playerID]].moves !== undefined) {
            // Check if moves are defined for the player's stage.
            const stage = stages[activePlayers[playerID]];
            const moves = stage.moves;
            if (name in moves) {
                return moves[name];
            }
        }
        else if (phaseConfig.moves) {
            // Check if moves are defined for the current phase.
            if (name in phaseConfig.moves) {
                return phaseConfig.moves[name];
            }
        }
        else if (name in moves) {
            // Check for the move globally.
            return moves[name];
        }
        return null;
    }
    function ProcessMove(state, action) {
        const { playerID, type } = action;
        const { currentPlayer, activePlayers, _activePlayersMaxMoves } = state.ctx;
        const move = GetMove(state.ctx, type, playerID);
        const shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
        let { numMoves, _activePlayersNumMoves } = state.ctx;
        if (shouldCount) {
            if (playerID === currentPlayer)
                numMoves++;
            if (activePlayers)
                _activePlayersNumMoves[playerID]++;
        }
        state = {
            ...state,
            ctx: {
                ...state.ctx,
                numMoves,
                _activePlayersNumMoves,
            },
        };
        if (_activePlayersMaxMoves &&
            _activePlayersNumMoves[playerID] >= _activePlayersMaxMoves[playerID]) {
            state = EndStage(state, { playerID, automatic: true });
        }
        const phaseConfig = GetPhase(state.ctx);
        const G = phaseConfig.turn.wrapped.onMove({ ...state, playerID });
        state = { ...state, G };
        const events = [{ fn: OnMove }];
        return Process(state, events);
    }
    function SetStageEvent(state, playerID, arg) {
        return Process(state, [{ fn: EndStage, arg, playerID }]);
    }
    function EndStageEvent(state, playerID) {
        return Process(state, [{ fn: EndStage, playerID }]);
    }
    function SetActivePlayersEvent(state, _playerID, arg) {
        return Process(state, [{ fn: UpdateActivePlayers, arg }]);
    }
    function SetPhaseEvent(state, _playerID, newPhase) {
        return Process(state, [
            {
                fn: EndPhase,
                phase: state.ctx.phase,
                turn: state.ctx.turn,
                arg: { next: newPhase },
            },
        ]);
    }
    function EndPhaseEvent(state) {
        return Process(state, [
            { fn: EndPhase, phase: state.ctx.phase, turn: state.ctx.turn },
        ]);
    }
    function EndTurnEvent(state, _playerID, arg) {
        return Process(state, [
            { fn: EndTurn, turn: state.ctx.turn, phase: state.ctx.phase, arg },
        ]);
    }
    function PassEvent(state, _playerID, arg) {
        return Process(state, [
            {
                fn: EndTurn,
                turn: state.ctx.turn,
                phase: state.ctx.phase,
                force: true,
                arg,
            },
        ]);
    }
    function EndGameEvent(state, _playerID, arg) {
        return Process(state, [
            { fn: EndGame, turn: state.ctx.turn, phase: state.ctx.phase, arg },
        ]);
    }
    const eventHandlers = {
        endStage: EndStageEvent,
        setStage: SetStageEvent,
        endTurn: EndTurnEvent,
        pass: PassEvent,
        endPhase: EndPhaseEvent,
        setPhase: SetPhaseEvent,
        endGame: EndGameEvent,
        setActivePlayers: SetActivePlayersEvent,
    };
    const enabledEventNames = [];
    if (events.endTurn !== false) {
        enabledEventNames.push('endTurn');
    }
    if (events.pass !== false) {
        enabledEventNames.push('pass');
    }
    if (events.endPhase !== false) {
        enabledEventNames.push('endPhase');
    }
    if (events.setPhase !== false) {
        enabledEventNames.push('setPhase');
    }
    if (events.endGame !== false) {
        enabledEventNames.push('endGame');
    }
    if (events.setActivePlayers !== false) {
        enabledEventNames.push('setActivePlayers');
    }
    if (events.endStage !== false) {
        enabledEventNames.push('endStage');
    }
    if (events.setStage !== false) {
        enabledEventNames.push('setStage');
    }
    function ProcessEvent(state, action) {
        const { type, playerID, args } = action.payload;
        if (typeof eventHandlers[type] !== 'function')
            return state;
        return eventHandlers[type](state, playerID, ...(Array.isArray(args) ? args : [args]));
    }
    function IsPlayerActive(_G, ctx, playerID) {
        if (ctx.activePlayers) {
            return playerID in ctx.activePlayers;
        }
        return ctx.currentPlayer === playerID;
    }
    return {
        ctx: (numPlayers) => ({
            numPlayers,
            turn: 0,
            currentPlayer: '0',
            playOrder: [...Array.from({ length: numPlayers })].map((_, i) => i + ''),
            playOrderPos: 0,
            phase: startingPhase,
            activePlayers: null,
        }),
        init: (state) => {
            return Process(state, [{ fn: StartGame }]);
        },
        isPlayerActive: IsPlayerActive,
        eventHandlers,
        eventNames: Object.keys(eventHandlers),
        enabledEventNames,
        moveMap,
        moveNames: [...moveNames.values()],
        processMove: ProcessMove,
        processEvent: ProcessEvent,
        getMove: GetMove,
    };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function IsProcessed(game) {
    return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */
function ProcessGameConfig(game) {
    // The Game() function has already been called on this
    // config object, so just pass it through.
    if (IsProcessed(game)) {
        return game;
    }
    if (game.name === undefined)
        game.name = 'default';
    if (game.deltaState === undefined)
        game.deltaState = false;
    if (game.disableUndo === undefined)
        game.disableUndo = false;
    if (game.setup === undefined)
        game.setup = () => ({});
    if (game.moves === undefined)
        game.moves = {};
    if (game.playerView === undefined)
        game.playerView = ({ G }) => G;
    if (game.plugins === undefined)
        game.plugins = [];
    game.plugins.forEach((plugin) => {
        if (plugin.name === undefined) {
            throw new Error('Plugin missing name attribute');
        }
        if (plugin.name.includes(' ')) {
            throw new Error(plugin.name + ': Plugin name must not include spaces');
        }
    });
    if (game.name.includes(' ')) {
        throw new Error(game.name + ': Game name must not include spaces');
    }
    const flow = Flow(game);
    return {
        ...game,
        flow,
        moveNames: flow.moveNames,
        pluginNames: game.plugins.map((p) => p.name),
        processMove: (state, action) => {
            let moveFn = flow.getMove(state.ctx, action.type, action.playerID);
            if (IsLongFormMove(moveFn)) {
                moveFn = moveFn.move;
            }
            if (moveFn instanceof Function) {
                const fn = FnWrap(moveFn, GameMethod.MOVE, game.plugins);
                let args = [];
                if (action.args !== undefined) {
                    args = Array.isArray(action.args) ? action.args : [action.args];
                }
                const context = {
                    ...GetAPIs(state),
                    G: state.G,
                    ctx: state.ctx,
                    playerID: action.playerID,
                };
                return fn(context, ...args);
            }
            error(`invalid move object: ${action.type}`);
            return state.G;
        },
    };
}
function IsLongFormMove(move) {
    return move instanceof Object && move.move !== undefined;
}

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
    const pluginAPIs = GetAPIs(state);
    state.G = game.setup({ ...pluginAPIs, ctx: state.ctx }, setupData);
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
    [initial] = FlushAndValidate(initial, { game });
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
 * Creates initial state and metadata for a new match.
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
/**
 * Given players, returns the count of players.
 */
const getNumPlayers = (players) => Object.keys(players).length;
/**
 * Given players, tries to find the ID of the first player that can be joined.
 * Returns `undefined` if there’s no available ID.
 */
const getFirstAvailablePlayerID = (players) => {
    const numPlayers = getNumPlayers(players);
    // Try to get the first index available
    for (let i = 0; i < numPlayers; i++) {
        if (typeof players[i].name === 'undefined' || players[i].name === null) {
            return String(i);
        }
    }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Creates a new match.
 *
 * @param {object} db - The storage API.
 * @param {object} game - The game config object.
 * @param {number} numPlayers - The number of players.
 * @param {object} setupData - User-defined object that's available
 *                             during game setup.
 * @param {object } lobbyConfig - Configuration options for the lobby.
 * @param {boolean} unlisted - Whether the match should be excluded from public listing.
 */
const CreateMatch = async ({ ctx, db, uuid, ...opts }) => {
    const matchID = uuid();
    const match = createMatch(opts);
    if ('setupDataError' in match) {
        ctx.throw(400, match.setupDataError);
    }
    else {
        await db.createMatch(matchID, match);
        return matchID;
    }
};
/**
 * Create a metadata object without secret credentials to return to the client.
 *
 * @param {string} matchID - The identifier of the match the metadata belongs to.
 * @param {object} metadata - The match metadata object to strip credentials from.
 * @return - A metadata object without player credentials.
 */
const createClientMatchData = (matchID, metadata) => {
    return {
        ...metadata,
        matchID,
        players: Object.values(metadata.players).map((player) => {
            // strip away credentials
            const { credentials, ...strippedInfo } = player;
            return strippedInfo;
        }),
    };
};
/** Utility extracting `string` from a query if it is `string[]`. */
const unwrapQuery = (query) => (Array.isArray(query) ? query[0] : query);
const configureRouter = ({ router, db, auth, games, uuid = () => nanoid.nanoid(11), }) => {
    /**
     * List available games.
     *
     * @return - Array of game names as string.
     */
    router.get('/games', async (ctx) => {
        const body = games.map((game) => game.name);
        ctx.body = body;
    });
    /**
     * Create a new match of a given game.
     *
     * @param {string} name - The name of the game of the new match.
     * @param {number} numPlayers - The number of players.
     * @param {object} setupData - User-defined object that's available
     *                             during game setup.
     * @param {boolean} unlisted - Whether the match should be excluded from public listing.
     * @return - The ID of the created match.
     */
    router.post('/games/:name/create', koaBody(), async (ctx) => {
        // The name of the game (for example: tic-tac-toe).
        const gameName = ctx.params.name;
        // User-data to pass to the game setup function.
        const setupData = ctx.request.body.setupData;
        // Whether the game should be excluded from public listing.
        const unlisted = ctx.request.body.unlisted;
        // The number of players for this game instance.
        const numPlayers = Number.parseInt(ctx.request.body.numPlayers);
        const game = games.find((g) => g.name === gameName);
        if (!game)
            ctx.throw(404, 'Game ' + gameName + ' not found');
        if (ctx.request.body.numPlayers !== undefined &&
            (Number.isNaN(numPlayers) ||
                (game.minPlayers && numPlayers < game.minPlayers) ||
                (game.maxPlayers && numPlayers > game.maxPlayers))) {
            ctx.throw(400, 'Invalid numPlayers');
        }
        const matchID = await CreateMatch({
            ctx,
            db,
            game,
            numPlayers,
            setupData,
            uuid,
            unlisted,
        });
        const body = { matchID };
        ctx.body = body;
    });
    /**
     * List matches for a given game.
     *
     * This does not return matches that are marked as unlisted.
     *
     * @param {string} name - The name of the game.
     * @return - Array of match objects.
     */
    router.get('/games/:name', async (ctx) => {
        const gameName = ctx.params.name;
        const isGameoverString = unwrapQuery(ctx.query.isGameover);
        const updatedBeforeString = unwrapQuery(ctx.query.updatedBefore);
        const updatedAfterString = unwrapQuery(ctx.query.updatedAfter);
        let isGameover;
        if (isGameoverString) {
            if (isGameoverString.toLowerCase() === 'true') {
                isGameover = true;
            }
            else if (isGameoverString.toLowerCase() === 'false') {
                isGameover = false;
            }
        }
        let updatedBefore;
        if (updatedBeforeString) {
            const parsedNumber = Number.parseInt(updatedBeforeString, 10);
            if (parsedNumber > 0) {
                updatedBefore = parsedNumber;
            }
        }
        let updatedAfter;
        if (updatedAfterString) {
            const parsedNumber = Number.parseInt(updatedAfterString, 10);
            if (parsedNumber > 0) {
                updatedAfter = parsedNumber;
            }
        }
        const matchList = await db.listMatches({
            gameName,
            where: {
                isGameover,
                updatedAfter,
                updatedBefore,
            },
        });
        const matches = [];
        for (const matchID of matchList) {
            const { metadata } = await db.fetch(matchID, {
                metadata: true,
            });
            if (!metadata.unlisted) {
                matches.push(createClientMatchData(matchID, metadata));
            }
        }
        const body = { matches };
        ctx.body = body;
    });
    /**
     * Get data about a specific match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @return - A match object.
     */
    router.get('/games/:name/:id', async (ctx) => {
        const matchID = ctx.params.id;
        const { metadata } = await db.fetch(matchID, {
            metadata: true,
        });
        if (!metadata) {
            ctx.throw(404, 'Match ' + matchID + ' not found');
        }
        const body = createClientMatchData(matchID, metadata);
        ctx.body = body;
    });
    /**
     * Join a given match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @param {string} playerID - The ID of the player who joins. If not sent, will be assigned to the first index available.
     * @param {string} playerName - The name of the player who joins.
     * @param {object} data - The default data of the player in the match.
     * @return - Player ID and credentials to use when interacting in the joined match.
     */
    router.post('/games/:name/:id/join', koaBody(), async (ctx) => {
        let playerID = ctx.request.body.playerID;
        const playerName = ctx.request.body.playerName;
        const data = ctx.request.body.data;
        const matchID = ctx.params.id;
        if (!playerName) {
            ctx.throw(403, 'playerName is required');
        }
        const { metadata } = await db.fetch(matchID, {
            metadata: true,
        });
        if (!metadata) {
            ctx.throw(404, 'Match ' + matchID + ' not found');
        }
        if (typeof playerID === 'undefined' || playerID === null) {
            playerID = getFirstAvailablePlayerID(metadata.players);
            if (playerID === undefined) {
                const numPlayers = getNumPlayers(metadata.players);
                ctx.throw(409, `Match ${matchID} reached maximum number of players (${numPlayers})`);
            }
        }
        if (!metadata.players[playerID]) {
            ctx.throw(404, 'Player ' + playerID + ' not found');
        }
        if (metadata.players[playerID].name) {
            ctx.throw(409, 'Player ' + playerID + ' not available');
        }
        if (data) {
            metadata.players[playerID].data = data;
        }
        metadata.players[playerID].name = playerName;
        const playerCredentials = await auth.generateCredentials(ctx);
        metadata.players[playerID].credentials = playerCredentials;
        await db.setMetadata(matchID, metadata);
        const body = { playerID, playerCredentials };
        ctx.body = body;
    });
    /**
     * Leave a given match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @param {string} playerID - The ID of the player who leaves.
     * @param {string} credentials - The credentials of the player who leaves.
     * @return - Nothing.
     */
    router.post('/games/:name/:id/leave', koaBody(), async (ctx) => {
        const matchID = ctx.params.id;
        const playerID = ctx.request.body.playerID;
        const credentials = ctx.request.body.credentials;
        const { metadata } = await db.fetch(matchID, {
            metadata: true,
        });
        if (typeof playerID === 'undefined' || playerID === null) {
            ctx.throw(403, 'playerID is required');
        }
        if (!metadata) {
            ctx.throw(404, 'Match ' + matchID + ' not found');
        }
        if (!metadata.players[playerID]) {
            ctx.throw(404, 'Player ' + playerID + ' not found');
        }
        const isAuthorized = await auth.authenticateCredentials({
            playerID,
            credentials,
            metadata,
        });
        if (!isAuthorized) {
            ctx.throw(403, 'Invalid credentials ' + credentials);
        }
        delete metadata.players[playerID].name;
        delete metadata.players[playerID].credentials;
        const hasPlayers = Object.values(metadata.players).some(({ name }) => name);
        await (hasPlayers
            ? db.setMetadata(matchID, metadata) // Update metadata.
            : db.wipe(matchID)); // Delete match.
        ctx.body = {};
    });
    /**
     * Start a new match based on another existing match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @param {string} playerID - The ID of the player creating the match.
     * @param {string} credentials - The credentials of the player creating the match.
     * @param {boolean} unlisted - Whether the match should be excluded from public listing.
     * @return - The ID of the new match.
     */
    router.post('/games/:name/:id/playAgain', koaBody(), async (ctx) => {
        const gameName = ctx.params.name;
        const matchID = ctx.params.id;
        const playerID = ctx.request.body.playerID;
        const credentials = ctx.request.body.credentials;
        const unlisted = ctx.request.body.unlisted;
        const { metadata } = await db.fetch(matchID, {
            metadata: true,
        });
        if (typeof playerID === 'undefined' || playerID === null) {
            ctx.throw(403, 'playerID is required');
        }
        if (!metadata) {
            ctx.throw(404, 'Match ' + matchID + ' not found');
        }
        if (!metadata.players[playerID]) {
            ctx.throw(404, 'Player ' + playerID + ' not found');
        }
        const isAuthorized = await auth.authenticateCredentials({
            playerID,
            credentials,
            metadata,
        });
        if (!isAuthorized) {
            ctx.throw(403, 'Invalid credentials ' + credentials);
        }
        // Check if nextMatch is already set, if so, return that id.
        if (metadata.nextMatchID) {
            ctx.body = { nextMatchID: metadata.nextMatchID };
            return;
        }
        // User-data to pass to the game setup function.
        const setupData = ctx.request.body.setupData || metadata.setupData;
        // The number of players for this game instance.
        const numPlayers = Number.parseInt(ctx.request.body.numPlayers) ||
            // eslint-disable-next-line unicorn/explicit-length-check
            Object.keys(metadata.players).length;
        const game = games.find((g) => g.name === gameName);
        const nextMatchID = await CreateMatch({
            ctx,
            db,
            game,
            numPlayers,
            setupData,
            uuid,
            unlisted,
        });
        metadata.nextMatchID = nextMatchID;
        await db.setMetadata(matchID, metadata);
        const body = { nextMatchID };
        ctx.body = body;
    });
    const updatePlayerMetadata = async (ctx) => {
        const matchID = ctx.params.id;
        const playerID = ctx.request.body.playerID;
        const credentials = ctx.request.body.credentials;
        const newName = ctx.request.body.newName;
        const data = ctx.request.body.data;
        const { metadata } = await db.fetch(matchID, {
            metadata: true,
        });
        if (typeof playerID === 'undefined') {
            ctx.throw(403, 'playerID is required');
        }
        if (data === undefined && !newName) {
            ctx.throw(403, 'newName or data is required');
        }
        if (newName && typeof newName !== 'string') {
            ctx.throw(403, `newName must be a string, got ${typeof newName}`);
        }
        if (!metadata) {
            ctx.throw(404, 'Match ' + matchID + ' not found');
        }
        if (!metadata.players[playerID]) {
            ctx.throw(404, 'Player ' + playerID + ' not found');
        }
        const isAuthorized = await auth.authenticateCredentials({
            playerID,
            credentials,
            metadata,
        });
        if (!isAuthorized) {
            ctx.throw(403, 'Invalid credentials ' + credentials);
        }
        if (newName) {
            metadata.players[playerID].name = newName;
        }
        if (data) {
            metadata.players[playerID].data = data;
        }
        await db.setMetadata(matchID, metadata);
        ctx.body = {};
    };
    /**
     * Change the name of a player in a given match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @param {string} playerID - The ID of the player.
     * @param {string} credentials - The credentials of the player.
     * @param {object} newName - The new name of the player in the match.
     * @return - Nothing.
     */
    router.post('/games/:name/:id/rename', koaBody(), async (ctx) => {
        console.warn('This endpoint /rename is deprecated. Please use /update instead.');
        await updatePlayerMetadata(ctx);
    });
    /**
     * Update the player's data for a given match.
     *
     * @param {string} name - The name of the game.
     * @param {string} id - The ID of the match.
     * @param {string} playerID - The ID of the player.
     * @param {string} credentials - The credentials of the player.
     * @param {object} newName - The new name of the player in the match.
     * @param {object} data - The new data of the player in the match.
     * @return - Nothing.
     */
    router.post('/games/:name/:id/update', koaBody(), updatePlayerMetadata);
    return router;
};
const configureApp = (app, router, origins) => {
    app.use(cors({
        // Set Access-Control-Allow-Origin header for allowed origins.
        origin: (ctx) => {
            const origin = ctx.get('Origin');
            return isOriginAllowed(origin, origins) ? origin : '';
        },
    }));
    // If API_SECRET is set, then require that requests set an
    // api-secret header that is set to the same value.
    app.use(async (ctx, next) => {
        if (!!process.env.API_SECRET &&
            ctx.request.headers['api-secret'] !== process.env.API_SECRET) {
            ctx.throw(403, 'Invalid API secret');
        }
        await next();
    });
    app.use(router.routes()).use(router.allowedMethods());
};
/**
 * Check if a request’s origin header is allowed for CORS.
 * Adapted from `cors` package: https://github.com/expressjs/cors
 * @param origin Request origin to test.
 * @param allowedOrigin Origin(s) that are allowed to connect via CORS.
 * @returns `true` if the origin matched at least one of the allowed origins.
 */
function isOriginAllowed(origin, allowedOrigin) {
    if (Array.isArray(allowedOrigin)) {
        for (const entry of allowedOrigin) {
            if (isOriginAllowed(origin, entry)) {
                return true;
            }
        }
        return false;
    }
    else if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
    }
    else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    }
    else {
        return !!allowedOrigin;
    }
}

var Type;
(function (Type) {
    Type[Type["SYNC"] = 0] = "SYNC";
    Type[Type["ASYNC"] = 1] = "ASYNC";
})(Type || (Type = {}));
/**
 * Type guard that checks if a storage implementation is synchronous.
 */
function isSynchronous(storageAPI) {
    return storageAPI.type() === Type.SYNC;
}
class Async {
    /* istanbul ignore next */
    type() {
        /* istanbul ignore next */
        return Type.ASYNC;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
    async createMatch(matchID, opts) {
        if (this.createGame) {
            console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
            return this.createGame(matchID, opts);
        }
        else {
            console.error('The database connector does not implement a createMatch method.');
        }
    }
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
    async listMatches(opts) {
        if (this.listGames) {
            console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
            return this.listGames(opts);
        }
        else {
            console.error('The database connector does not implement a listMatches method.');
        }
    }
}
class Sync {
    type() {
        return Type.SYNC;
    }
    /**
     * Connect.
     */
    connect() {
        return;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
    createMatch(matchID, opts) {
        if (this.createGame) {
            console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
            return this.createGame(matchID, opts);
        }
        else {
            console.error('The database connector does not implement a createMatch method.');
        }
    }
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
    listMatches(opts) {
        if (this.listGames) {
            console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
            return this.listGames(opts);
        }
        else {
            console.error('The database connector does not implement a listMatches method.');
        }
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * InMemory data storage.
 */
class InMemory extends Sync {
    /**
     * Creates a new InMemory storage.
     */
    constructor() {
        super();
        this.state = new Map();
        this.initial = new Map();
        this.metadata = new Map();
        this.log = new Map();
    }
    /**
     * Create a new match.
     *
     * @override
     */
    createMatch(matchID, opts) {
        this.initial.set(matchID, opts.initialState);
        this.setState(matchID, opts.initialState);
        this.setMetadata(matchID, opts.metadata);
    }
    /**
     * Write the match metadata to the in-memory object.
     */
    setMetadata(matchID, metadata) {
        this.metadata.set(matchID, metadata);
    }
    /**
     * Write the match state to the in-memory object.
     */
    setState(matchID, state, deltalog) {
        if (deltalog && deltalog.length > 0) {
            const log = this.log.get(matchID) || [];
            this.log.set(matchID, [...log, ...deltalog]);
        }
        this.state.set(matchID, state);
    }
    /**
     * Fetches state for a particular matchID.
     */
    fetch(matchID, opts) {
        const result = {};
        if (opts.state) {
            result.state = this.state.get(matchID);
        }
        if (opts.metadata) {
            result.metadata = this.metadata.get(matchID);
        }
        if (opts.log) {
            result.log = this.log.get(matchID) || [];
        }
        if (opts.initialState) {
            result.initialState = this.initial.get(matchID);
        }
        return result;
    }
    /**
     * Remove the match state from the in-memory object.
     */
    wipe(matchID) {
        this.state.delete(matchID);
        this.metadata.delete(matchID);
    }
    /**
     * Return all keys.
     *
     * @override
     */
    listMatches(opts) {
        return [...this.metadata.entries()]
            .filter(([, metadata]) => {
            if (!opts) {
                return true;
            }
            if (opts.gameName !== undefined &&
                metadata.gameName !== opts.gameName) {
                return false;
            }
            if (opts.where !== undefined) {
                if (opts.where.isGameover !== undefined) {
                    const isGameover = metadata.gameover !== undefined;
                    if (isGameover !== opts.where.isGameover) {
                        return false;
                    }
                }
                if (opts.where.updatedBefore !== undefined &&
                    metadata.updatedAt >= opts.where.updatedBefore) {
                    return false;
                }
                if (opts.where.updatedAfter !== undefined &&
                    metadata.updatedAt <= opts.where.updatedAfter) {
                    return false;
                }
            }
            return true;
        })
            .map(([key]) => key);
    }
}

/**
 * FlatFile data storage.
 */
class FlatFile extends Async {
    constructor({ dir, logging, ttl }) {
        super();
        this.games = require('node-persist');
        this.dir = dir;
        this.logging = logging || false;
        this.ttl = ttl || false;
        this.fileQueues = {};
    }
    async chainRequest(key, request) {
        if (!(key in this.fileQueues))
            this.fileQueues[key] = Promise.resolve();
        this.fileQueues[key] = this.fileQueues[key].then(request, request);
        return this.fileQueues[key];
    }
    async getItem(key) {
        return this.chainRequest(key, () => this.games.getItem(key));
    }
    async setItem(key, value) {
        return this.chainRequest(key, () => this.games.setItem(key, value));
    }
    async removeItem(key) {
        return this.chainRequest(key, () => this.games.removeItem(key));
    }
    async connect() {
        await this.games.init({
            dir: this.dir,
            logging: this.logging,
            ttl: this.ttl,
        });
        return;
    }
    /**
     * Create new match.
     *
     * @param matchID
     * @param opts
     * @override
     */
    async createMatch(matchID, opts) {
        // Store initial state separately for easy retrieval later.
        const key = InitialStateKey(matchID);
        await this.setItem(key, opts.initialState);
        await this.setState(matchID, opts.initialState);
        await this.setMetadata(matchID, opts.metadata);
    }
    async fetch(matchID, opts) {
        const result = {};
        if (opts.state) {
            result.state = (await this.getItem(matchID));
        }
        if (opts.metadata) {
            const key = MetadataKey(matchID);
            result.metadata = (await this.getItem(key));
        }
        if (opts.log) {
            const key = LogKey(matchID);
            result.log = (await this.getItem(key));
        }
        if (opts.initialState) {
            const key = InitialStateKey(matchID);
            result.initialState = (await this.getItem(key));
        }
        return result;
    }
    async clear() {
        return this.games.clear();
    }
    async setState(id, state, deltalog) {
        if (deltalog && deltalog.length > 0) {
            const key = LogKey(id);
            const log = (await this.getItem(key)) || [];
            await this.setItem(key, [...log, ...deltalog]);
        }
        return await this.setItem(id, state);
    }
    async setMetadata(id, metadata) {
        const key = MetadataKey(id);
        return await this.setItem(key, metadata);
    }
    async wipe(id) {
        const keys = await this.games.keys();
        if (!keys.includes(id))
            return;
        await this.removeItem(id);
        await this.removeItem(InitialStateKey(id));
        await this.removeItem(LogKey(id));
        await this.removeItem(MetadataKey(id));
    }
    /**
     * List matches IDs.
     *
     * @param opts
     * @override
     */
    async listMatches(opts) {
        const keys = await this.games.keys();
        const suffix = ':metadata';
        const arr = await Promise.all(keys.map(async (k) => {
            if (!k.endsWith(suffix)) {
                return false;
            }
            const matchID = k.slice(0, k.length - suffix.length);
            if (!opts) {
                return matchID;
            }
            const game = await this.fetch(matchID, {
                state: true,
                metadata: true,
            });
            if (opts.gameName && opts.gameName !== game.metadata.gameName) {
                return false;
            }
            if (opts.where !== undefined) {
                if (typeof opts.where.isGameover !== 'undefined') {
                    const isGameover = typeof game.metadata.gameover !== 'undefined';
                    if (isGameover !== opts.where.isGameover) {
                        return false;
                    }
                }
                if (typeof opts.where.updatedBefore !== 'undefined' &&
                    game.metadata.updatedAt >= opts.where.updatedBefore) {
                    return false;
                }
                if (typeof opts.where.updatedAfter !== 'undefined' &&
                    game.metadata.updatedAt <= opts.where.updatedAfter) {
                    return false;
                }
            }
            return matchID;
        }));
        return arr.filter((r) => typeof r === 'string');
    }
}
function InitialStateKey(matchID) {
    return `${matchID}:initial`;
}
function MetadataKey(matchID) {
    return `${matchID}:metadata`;
}
function LogKey(matchID) {
    return `${matchID}:log`;
}

const DBFromEnv = () => {
    return process.env.FLATFILE_DIR
        ? new FlatFile({
            dir: process.env.FLATFILE_DIR,
        })
        : new InMemory();
};

/**
 * Verifies that a match has metadata and is using credentials.
 */
const doesMatchRequireAuthentication = (matchData) => {
    if (!matchData)
        return false;
    const { players } = matchData;
    const hasCredentials = Object.values(players).some((player) => !!(player && player.credentials));
    return hasCredentials;
};
/**
 * The default `authenticateCredentials` method.
 * Verifies that the provided credentials match the player’s metadata.
 */
const areCredentialsAuthentic = (actionCredentials, playerMetadata) => {
    if (!actionCredentials)
        return false;
    if (!playerMetadata)
        return false;
    return actionCredentials === playerMetadata.credentials;
};
/**
 * Extracts a player’s metadata from the match data object.
 */
const extractPlayerMetadata = (matchData, playerID) => {
    if (matchData && matchData.players) {
        return matchData.players[playerID];
    }
};
/**
 * Class that provides authentication methods to the lobby server & transport.
 */
class Auth {
    constructor(opts = {}) {
        this.shouldAuthenticate = doesMatchRequireAuthentication;
        this.authenticate = areCredentialsAuthentic;
        /**
         * Generate credentials string from the Koa context.
         */
        this.generateCredentials = () => nanoid.nanoid();
        if (typeof opts.authenticateCredentials === 'function') {
            this.authenticate = opts.authenticateCredentials;
            this.shouldAuthenticate = () => true;
        }
        if (typeof opts.generateCredentials === 'function') {
            this.generateCredentials = opts.generateCredentials;
        }
    }
    /**
     * Resolves to true if the provided credentials are valid for the given
     * metadata and player IDs, or if the match does not require authentication.
     */
    authenticateCredentials({ playerID, credentials, metadata, }) {
        const playerMetadata = extractPlayerMetadata(metadata, playerID);
        return this.shouldAuthenticate(metadata)
            ? this.authenticate(credentials, playerMetadata)
            : true;
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var UpdateErrorType;
(function (UpdateErrorType) {
    // The action’s credentials were missing or invalid
    UpdateErrorType["UnauthorizedAction"] = "update/unauthorized_action";
    // The action’s matchID was not found
    UpdateErrorType["MatchNotFound"] = "update/match_not_found";
    // Could not apply Patch operation (rfc6902).
    UpdateErrorType["PatchFailed"] = "update/patch_failed";
})(UpdateErrorType || (UpdateErrorType = {}));
var ActionErrorType;
(function (ActionErrorType) {
    // The action contained a stale state ID
    ActionErrorType["StaleStateId"] = "action/stale_state_id";
    // The requested move is unknown or not currently available
    ActionErrorType["UnavailableMove"] = "action/unavailable_move";
    // The move declared it was invalid (INVALID_MOVE constant)
    ActionErrorType["InvalidMove"] = "action/invalid_move";
    // The player making the action is not currently active
    ActionErrorType["InactivePlayer"] = "action/inactive_player";
    // The game has finished
    ActionErrorType["GameOver"] = "action/gameover";
    // The requested action is disabled (e.g. undo/redo, events)
    ActionErrorType["ActionDisabled"] = "action/action_disabled";
    // The requested action is not currently possible
    ActionErrorType["ActionInvalid"] = "action/action_invalid";
    // The requested action was declared invalid by a plugin
    ActionErrorType["PluginActionInvalid"] = "action/plugin_invalid";
})(ActionErrorType || (ActionErrorType = {}));

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Check if the payload for the passed action contains a playerID.
 */
const actionHasPlayerID = (action) => action.payload.playerID !== null && action.payload.playerID !== undefined;
/**
 * Returns true if a move can be undone.
 */
const CanUndoMove = (G, ctx, move) => {
    function HasUndoable(move) {
        return move.undoable !== undefined;
    }
    function IsFunction(undoable) {
        return undoable instanceof Function;
    }
    if (!HasUndoable(move)) {
        return true;
    }
    if (IsFunction(move.undoable)) {
        return move.undoable({ G, ctx });
    }
    return move.undoable;
};
/**
 * Update the undo and redo stacks for a move or event.
 */
function updateUndoRedoState(state, opts) {
    if (opts.game.disableUndo)
        return state;
    const undoEntry = {
        G: state.G,
        ctx: state.ctx,
        plugins: state.plugins,
        playerID: opts.action.payload.playerID || state.ctx.currentPlayer,
    };
    if (opts.action.type === 'MAKE_MOVE') {
        undoEntry.moveType = opts.action.payload.type;
    }
    return {
        ...state,
        _undo: [...state._undo, undoEntry],
        // Always reset redo stack when making a move or event
        _redo: [],
    };
}
/**
 * Process state, adding the initial deltalog for this action.
 */
function initializeDeltalog(state, action, move) {
    // Create a log entry for this action.
    const logEntry = {
        action,
        _stateID: state._stateID,
        turn: state.ctx.turn,
        phase: state.ctx.phase,
    };
    const pluginLogMetadata = state.plugins.log.data.metadata;
    if (pluginLogMetadata !== undefined) {
        logEntry.metadata = pluginLogMetadata;
    }
    if (typeof move === 'object' && move.redact === true) {
        logEntry.redact = true;
    }
    else if (typeof move === 'object' && move.redact instanceof Function) {
        logEntry.redact = move.redact({ G: state.G, ctx: state.ctx });
    }
    return {
        ...state,
        deltalog: [logEntry],
    };
}
/**
 * Update plugin state after move/event & check if plugins consider the action to be valid.
 * @param state Current version of state in the reducer.
 * @param oldState State to revert to in case of error.
 * @param pluginOpts Plugin configuration options.
 * @returns Tuple of the new state updated after flushing plugins and the old
 * state augmented with an error if a plugin declared the action invalid.
 */
function flushAndValidatePlugins(state, oldState, pluginOpts) {
    const [newState, isInvalid] = FlushAndValidate(state, pluginOpts);
    if (!isInvalid)
        return [newState];
    return [
        newState,
        WithError(oldState, ActionErrorType.PluginActionInvalid, isInvalid),
    ];
}
/**
 * ExtractTransientsFromState
 *
 * Split out transients from the a TransientState
 */
function ExtractTransients(transientState) {
    if (!transientState) {
        // We preserve null for the state for legacy callers, but the transient
        // field should be undefined if not present to be consistent with the
        // code path below.
        return [null, undefined];
    }
    const { transients, ...state } = transientState;
    return [state, transients];
}
/**
 * WithError
 *
 * Augment a State instance with transient error information.
 */
function WithError(state, errorType, payload) {
    const error = {
        type: errorType,
        payload,
    };
    return {
        ...state,
        transients: {
            error,
        },
    };
}
/**
 * Middleware for processing TransientState associated with the reducer
 * returned by CreateGameReducer.
 * This should pretty much be used everywhere you want realistic state
 * transitions and error handling.
 */
const TransientHandlingMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    switch (action.type) {
        case STRIP_TRANSIENTS: {
            return result;
        }
        default: {
            const [, transients] = ExtractTransients(store.getState());
            if (typeof transients !== 'undefined') {
                store.dispatch(stripTransients());
                // Dev Note: If parent middleware needs to correlate the spawned
                // StripTransients action to the triggering action, instrument here.
                //
                // This is a bit tricky; for more details, see:
                //   https://github.com/boardgameio/boardgame.io/pull/940#discussion_r636200648
                return {
                    ...result,
                    transients,
                };
            }
            return result;
        }
    }
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */
function CreateGameReducer({ game, isClient, }) {
    game = ProcessGameConfig(game);
    /**
     * GameReducer
     *
     * Redux reducer that maintains the overall game state.
     * @param {object} state - The state before the action.
     * @param {object} action - A Redux action.
     */
    return (stateWithTransients = null, action) => {
        let [state /*, transients */] = ExtractTransients(stateWithTransients);
        switch (action.type) {
            case STRIP_TRANSIENTS: {
                // This action indicates that transient metadata in the state has been
                // consumed and should now be stripped from the state..
                return state;
            }
            case GAME_EVENT: {
                state = { ...state, deltalog: [] };
                // Process game events only on the server.
                // These events like `endTurn` typically
                // contain code that may rely on secret state
                // and cannot be computed on the client.
                if (isClient) {
                    return state;
                }
                // Disallow events once the game is over.
                if (state.ctx.gameover !== undefined) {
                    error(`cannot call event after game end`);
                    return WithError(state, ActionErrorType.GameOver);
                }
                // Ignore the event if the player isn't active.
                if (actionHasPlayerID(action) &&
                    !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
                    error(`disallowed event: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.InactivePlayer);
                }
                // Execute plugins.
                state = Enhance(state, {
                    game,
                    isClient: false,
                    playerID: action.payload.playerID,
                });
                // Process event.
                let newState = game.flow.processEvent(state, action);
                // Execute plugins.
                let stateWithError;
                [newState, stateWithError] = flushAndValidatePlugins(newState, state, {
                    game,
                    isClient: false,
                });
                if (stateWithError)
                    return stateWithError;
                // Update undo / redo state.
                newState = updateUndoRedoState(newState, { game, action });
                return { ...newState, _stateID: state._stateID + 1 };
            }
            case MAKE_MOVE: {
                const oldState = (state = { ...state, deltalog: [] });
                // Check whether the move is allowed at this time.
                const move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);
                if (move === null) {
                    error(`disallowed move: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.UnavailableMove);
                }
                // Don't run move on client if move says so.
                if (isClient && move.client === false) {
                    return state;
                }
                // Disallow moves once the game is over.
                if (state.ctx.gameover !== undefined) {
                    error(`cannot make move after game end`);
                    return WithError(state, ActionErrorType.GameOver);
                }
                // Ignore the move if the player isn't active.
                if (actionHasPlayerID(action) &&
                    !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
                    error(`disallowed move: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.InactivePlayer);
                }
                // Execute plugins.
                state = Enhance(state, {
                    game,
                    isClient,
                    playerID: action.payload.playerID,
                });
                // Process the move.
                const G = game.processMove(state, action.payload);
                // The game declared the move as invalid.
                if (G === INVALID_MOVE) {
                    error(`invalid move: ${action.payload.type} args: ${action.payload.args}`);
                    // TODO(#723): Marshal a nice error payload with the processed move.
                    return WithError(state, ActionErrorType.InvalidMove);
                }
                const newState = { ...state, G };
                // Some plugin indicated that it is not suitable to be
                // materialized on the client (and must wait for the server
                // response instead).
                if (isClient && NoClient(newState, { game })) {
                    return state;
                }
                state = newState;
                // If we're on the client, just process the move
                // and no triggers in multiplayer mode.
                // These will be processed on the server, which
                // will send back a state update.
                if (isClient) {
                    let stateWithError;
                    [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
                        game,
                        isClient: true,
                    });
                    if (stateWithError)
                        return stateWithError;
                    return {
                        ...state,
                        _stateID: state._stateID + 1,
                    };
                }
                // On the server, construct the deltalog.
                state = initializeDeltalog(state, action, move);
                // Allow the flow reducer to process any triggers that happen after moves.
                state = game.flow.processMove(state, action.payload);
                let stateWithError;
                [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
                    game,
                });
                if (stateWithError)
                    return stateWithError;
                // Update undo / redo state.
                state = updateUndoRedoState(state, { game, action });
                return {
                    ...state,
                    _stateID: state._stateID + 1,
                };
            }
            case RESET:
            case UPDATE:
            case SYNC: {
                return action.state;
            }
            case UNDO: {
                state = { ...state, deltalog: [] };
                if (game.disableUndo) {
                    error('Undo is not enabled');
                    return WithError(state, ActionErrorType.ActionDisabled);
                }
                const { G, ctx, _undo, _redo, _stateID } = state;
                if (_undo.length < 2) {
                    error(`No moves to undo`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                const last = _undo[_undo.length - 1];
                const restore = _undo[_undo.length - 2];
                // Only allow players to undo their own moves.
                if (actionHasPlayerID(action) &&
                    action.payload.playerID !== last.playerID) {
                    error(`Cannot undo other players' moves`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                // If undoing a move, check it is undoable.
                if (last.moveType) {
                    const lastMove = game.flow.getMove(restore.ctx, last.moveType, last.playerID);
                    if (!CanUndoMove(G, ctx, lastMove)) {
                        error(`Move cannot be undone`);
                        return WithError(state, ActionErrorType.ActionInvalid);
                    }
                }
                state = initializeDeltalog(state, action);
                return {
                    ...state,
                    G: restore.G,
                    ctx: restore.ctx,
                    plugins: restore.plugins,
                    _stateID: _stateID + 1,
                    _undo: _undo.slice(0, -1),
                    _redo: [last, ..._redo],
                };
            }
            case REDO: {
                state = { ...state, deltalog: [] };
                if (game.disableUndo) {
                    error('Redo is not enabled');
                    return WithError(state, ActionErrorType.ActionDisabled);
                }
                const { _undo, _redo, _stateID } = state;
                if (_redo.length === 0) {
                    error(`No moves to redo`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                const first = _redo[0];
                // Only allow players to redo their own undos.
                if (actionHasPlayerID(action) &&
                    action.payload.playerID !== first.playerID) {
                    error(`Cannot redo other players' moves`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                state = initializeDeltalog(state, action);
                return {
                    ...state,
                    G: first.G,
                    ctx: first.ctx,
                    plugins: first.plugins,
                    _stateID: _stateID + 1,
                    _undo: [..._undo, first],
                    _redo: _redo.slice(1),
                };
            }
            case PLUGIN: {
                // TODO(#723): Expose error semantics to plugin processing.
                return ProcessAction(state, action, { game });
            }
            case PATCH: {
                const oldState = state;
                const newState = JSON.parse(JSON.stringify(oldState));
                const patchError = rfc6902.applyPatch(newState, action.patch);
                const hasError = patchError.some((entry) => entry !== null);
                if (hasError) {
                    error(`Patch ${JSON.stringify(action.patch)} apply failed`);
                    return WithError(oldState, UpdateErrorType.PatchFailed, patchError);
                }
                else {
                    return newState;
                }
            }
            default: {
                return state;
            }
        }
    };
}

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
        if (!credAction || !credAction.payload) {
            return { error: 'missing action or action payload' };
        }
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
        const middleware = redux.applyMiddleware(TransientHandlingMiddleware);
        const store = redux.createStore(reducer, state, middleware);
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
        if (this.game.deltaState) {
            this.transportAPI.sendAll({
                type: 'patch',
                args: [matchID, stateID, prevState, state],
            });
        }
        else {
            this.transportAPI.sendAll({
                type: 'update',
                args: [matchID, state],
            });
        }
        const { deltalog, ...stateWithoutDeltalog } = state;
        let newMetadata;
        if (metadata &&
            (metadata.gameover === undefined || metadata.gameover === null)) {
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
        const syncInfo = {
            state,
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
        this.transportAPI.sendAll({
            type: 'matchData',
            args: [matchID, filteredMetadata],
        });
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
            if (!(chatMessage && typeof chatMessage.sender === 'string')) {
                return { error: 'unauthorized' };
            }
            const isAuthentic = await this.auth.authenticateCredentials({
                playerID: chatMessage.sender,
                credentials,
                metadata,
            });
            if (!isAuthentic) {
                return { error: 'unauthorized' };
            }
        }
        this.transportAPI.sendAll({
            type: 'chat',
            args: [matchID, chatMessage],
        });
    }
}

const applyPlayerView = (game, playerID, state) => ({
    ...state,
    G: game.playerView({ G: state.G, ctx: state.ctx, playerID }),
    plugins: PlayerView(state, { playerID, game }),
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

class InMemoryPubSub {
    constructor() {
        this.callbacks = new Map();
    }
    publish(channelId, payload) {
        if (!this.callbacks.has(channelId)) {
            return;
        }
        const allCallbacks = this.callbacks.get(channelId);
        for (const callback of allCallbacks) {
            callback(payload);
        }
    }
    subscribe(channelId, callback) {
        if (!this.callbacks.has(channelId)) {
            this.callbacks.set(channelId, []);
        }
        this.callbacks.get(channelId).push(callback);
    }
    unsubscribeAll(channelId) {
        if (this.callbacks.has(channelId)) {
            this.callbacks.delete(channelId);
        }
    }
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const PING_TIMEOUT = 20 * 1e3;
const PING_INTERVAL = 10 * 1e3;
const emit = (socket, { type, args }) => {
    socket.emit(type, ...args);
};
function getPubSubChannelId(matchID) {
    return `MATCH-${matchID}`;
}
/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
const TransportAPI = (matchID, socket, filterPlayerView, pubSub) => {
    const send = ({ playerID, ...data }) => {
        emit(socket, filterPlayerView(playerID, data));
    };
    /**
     * Send a message to all clients.
     */
    const sendAll = (payload) => {
        pubSub.publish(getPubSubChannelId(matchID), payload);
    };
    return { send, sendAll };
};
/**
 * Transport interface that uses socket.io
 */
class SocketIO {
    constructor({ https, socketAdapter, socketOpts, pubSub } = {}) {
        this.clientInfo = new Map();
        this.roomInfo = new Map();
        this.perMatchQueue = new Map();
        this.https = https;
        this.socketAdapter = socketAdapter;
        this.socketOpts = socketOpts;
        this.pubSub = pubSub || new InMemoryPubSub();
    }
    /**
     * Unregister client data for a socket.
     */
    removeClient(socketID) {
        // Get client data for this socket ID.
        const client = this.clientInfo.get(socketID);
        if (!client)
            return;
        // Remove client from list of connected sockets for this match.
        const { matchID } = client;
        const matchClients = this.roomInfo.get(matchID);
        matchClients.delete(socketID);
        // If the match is now empty, delete its promise queue & client ID list.
        if (matchClients.size === 0) {
            this.unsubscribePubSubChannel(matchID);
            this.roomInfo.delete(matchID);
            this.deleteMatchQueue(matchID);
        }
        // Remove client data from the client map.
        this.clientInfo.delete(socketID);
    }
    /**
     * Register client data for a socket.
     */
    addClient(client, game) {
        const { matchID, socket } = client;
        // Add client to list of connected sockets for this match.
        let matchClients = this.roomInfo.get(matchID);
        if (matchClients === undefined) {
            this.subscribePubSubChannel(matchID, game);
            matchClients = new Set();
            this.roomInfo.set(matchID, matchClients);
        }
        matchClients.add(socket.id);
        // Register data for this socket in the client map.
        this.clientInfo.set(socket.id, client);
    }
    subscribePubSubChannel(matchID, game) {
        const filterPlayerView = getFilterPlayerView(game);
        const broadcast = (payload) => {
            this.roomInfo.get(matchID).forEach((clientID) => {
                const client = this.clientInfo.get(clientID);
                const data = filterPlayerView(client.playerID, payload);
                emit(client.socket, data);
            });
        };
        this.pubSub.subscribe(getPubSubChannelId(matchID), broadcast);
    }
    unsubscribePubSubChannel(matchID) {
        this.pubSub.unsubscribeAll(getPubSubChannelId(matchID));
    }
    init(app, games, origins = []) {
        const io = new IO({
            ioOptions: {
                pingTimeout: PING_TIMEOUT,
                pingInterval: PING_INTERVAL,
                cors: {
                    origins,
                },
                ...this.socketOpts,
            },
        });
        app.context.io = io;
        io.attach(app, !!this.https, this.https);
        if (this.socketAdapter) {
            io.adapter(this.socketAdapter);
        }
        for (const game of games) {
            const nsp = app._io.of(game.name);
            const filterPlayerView = getFilterPlayerView(game);
            nsp.on('connection', (socket) => {
                socket.on('update', async (...args) => {
                    const [action, stateID, matchID, playerID] = args;
                    const master = new Master(game, app.context.db, TransportAPI(matchID, socket, filterPlayerView, this.pubSub), app.context.auth);
                    const matchQueue = this.getMatchQueue(matchID);
                    await matchQueue.add(() => master.onUpdate(action, stateID, matchID, playerID));
                });
                socket.on('sync', async (...args) => {
                    const [matchID, playerID, credentials] = args;
                    socket.join(matchID);
                    this.removeClient(socket.id);
                    const requestingClient = { socket, matchID, playerID, credentials };
                    const transport = TransportAPI(matchID, socket, filterPlayerView, this.pubSub);
                    const master = new Master(game, app.context.db, transport, app.context.auth);
                    const syncResponse = await master.onSync(...args);
                    if (syncResponse && syncResponse.error === 'unauthorized') {
                        return;
                    }
                    this.addClient(requestingClient, game);
                    await master.onConnectionChange(matchID, playerID, credentials, true);
                });
                socket.on('disconnect', async () => {
                    const client = this.clientInfo.get(socket.id);
                    this.removeClient(socket.id);
                    if (client) {
                        const { matchID, playerID, credentials } = client;
                        const master = new Master(game, app.context.db, TransportAPI(matchID, socket, filterPlayerView, this.pubSub), app.context.auth);
                        await master.onConnectionChange(matchID, playerID, credentials, false);
                    }
                });
                socket.on('chat', async (...args) => {
                    const [matchID] = args;
                    const master = new Master(game, app.context.db, TransportAPI(matchID, socket, filterPlayerView, this.pubSub), app.context.auth);
                    master.onChatMessage(...args);
                });
            });
        }
    }
    /**
     * Create a PQueue for a given matchID if none exists and return it.
     * @param matchID
     * @returns
     */
    getMatchQueue(matchID) {
        if (!this.perMatchQueue.has(matchID)) {
            // PQueue should process only one action at a time.
            this.perMatchQueue.set(matchID, new PQueue({ concurrency: 1 }));
        }
        return this.perMatchQueue.get(matchID);
    }
    /**
     * Delete a PQueue for a given matchID.
     * @param matchID
     */
    deleteMatchQueue(matchID) {
        this.perMatchQueue.delete(matchID);
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Build config object from server run arguments.
 */
const createServerRunConfig = (portOrConfig, callback) => portOrConfig && typeof portOrConfig === 'object'
    ? {
        ...portOrConfig,
        callback: portOrConfig.callback || callback,
    }
    : { port: portOrConfig, callback };
const getPortFromServer = (server) => {
    const address = server.address();
    if (typeof address === 'string')
        return address;
    if (address === null)
        return null;
    return address.port;
};
/**
 * Instantiate a game server.
 *
 * @param games - The games that this server will handle.
 * @param db - The interface with the database.
 * @param transport - The interface with the clients.
 * @param authenticateCredentials - Function to test player credentials.
 * @param origins - Allowed origins to use this server, e.g. `['http://localhost:3000']`.
 * @param apiOrigins - Allowed origins to use the Lobby API, defaults to `origins`.
 * @param generateCredentials - Method for API to generate player credentials.
 * @param https - HTTPS configuration options passed through to the TLS module.
 * @param lobbyConfig - Configuration options for the Lobby API server.
 */
function Server({ games, db, transport, https, uuid, origins, apiOrigins = origins, generateCredentials = uuid, authenticateCredentials, }) {
    const app = new Koa();
    games = games.map((game) => ProcessGameConfig(game));
    if (db === undefined) {
        db = DBFromEnv();
    }
    app.context.db = db;
    const auth = new Auth({ authenticateCredentials, generateCredentials });
    app.context.auth = auth;
    if (transport === undefined) {
        transport = new SocketIO({ https });
    }
    if (origins === undefined) {
        console.warn('Server `origins` option is not set.\n' +
            'Since boardgame.io@0.45, CORS is not enabled by default and you must ' +
            'explicitly set the origins that are allowed to connect to the server.\n' +
            'See https://boardgame.io/documentation/#/api/Server');
    }
    transport.init(app, games, origins);
    const router = new Router();
    return {
        app,
        db,
        auth,
        router,
        transport,
        run: async (portOrConfig, callback) => {
            const serverRunConfig = createServerRunConfig(portOrConfig, callback);
            configureRouter({ router, db, games, uuid, auth });
            // DB
            await db.connect();
            // Lobby API
            const lobbyConfig = serverRunConfig.lobbyConfig;
            let apiServer;
            if (!lobbyConfig || !lobbyConfig.apiPort) {
                configureApp(app, router, apiOrigins);
            }
            else {
                // Run API in a separate Koa app.
                const api = new Koa();
                api.context.db = db;
                api.context.auth = auth;
                configureApp(api, router, apiOrigins);
                await new Promise((resolve) => {
                    apiServer = api.listen(lobbyConfig.apiPort, resolve);
                });
                if (lobbyConfig.apiCallback)
                    lobbyConfig.apiCallback();
                info(`API serving on ${getPortFromServer(apiServer)}...`);
            }
            // Run Game Server (+ API, if necessary).
            let appServer;
            await new Promise((resolve) => {
                appServer = app.listen(serverRunConfig.port, resolve);
            });
            if (serverRunConfig.callback)
                serverRunConfig.callback();
            info(`App serving on ${getPortFromServer(appServer)}...`);
            return { apiServer, appServer };
        },
        kill: (servers) => {
            if (servers.apiServer) {
                servers.apiServer.close();
            }
            servers.appServer.close();
        },
    };
}

const LOCALHOST = /localhost:\d+/;
const Origins = {
    LOCALHOST,
    LOCALHOST_IN_DEVELOPMENT: process.env.NODE_ENV === 'production' ? false : LOCALHOST,
};

exports.FlatFile = FlatFile;
exports.Origins = Origins;
exports.Server = Server;
exports.SocketIO = SocketIO;
