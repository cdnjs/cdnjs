import type { Ctx, ActivePlayersArg, PlayerID, State, TurnConfig } from '../types';
/**
 * Event to change the active players (and their stages) in the current turn.
 */
export declare function SetActivePlayersEvent(state: State, _playerID: PlayerID, arg: ActivePlayersArg | PlayerID[]): {
    ctx: {
        activePlayers: {};
        _activePlayersMoveLimit: {};
        _activePlayersNumMoves: {};
        _prevActivePlayers: {
            activePlayers: import("../types").ActivePlayers;
            _activePlayersMoveLimit?: Record<string, number>;
            _activePlayersNumMoves?: Record<string, number>;
        }[];
        _nextActivePlayers: ActivePlayersArg;
        numPlayers: number;
        playOrder: string[];
        playOrderPos: number;
        playerID?: string;
        currentPlayer: string;
        numMoves?: number;
        gameover?: any;
        turn: number;
        phase: string;
        _random?: {
            seed: string | number;
        };
        events?: import("../plugins/plugin-events").EventsAPI;
        log?: import("../plugins/plugin-log").LogAPI;
        random?: import("../plugins/random/random").RandomAPI;
    };
    G: any;
    deltalog?: import("../types").LogEntry[];
    plugins: {
        [pluginName: string]: import("../types").PluginState;
    };
    _undo: import("../types").Undo<any>[];
    _redo: import("../types").Undo<any>[];
    _stateID: number;
};
export declare function SetActivePlayers(ctx: Ctx, arg: ActivePlayersArg | PlayerID[]): {
    activePlayers: {};
    _activePlayersMoveLimit: {};
    _activePlayersNumMoves: {};
    _prevActivePlayers: {
        activePlayers: import("../types").ActivePlayers;
        _activePlayersMoveLimit?: Record<string, number>;
        _activePlayersNumMoves?: Record<string, number>;
    }[];
    _nextActivePlayers: ActivePlayersArg;
    numPlayers: number;
    playOrder: string[];
    playOrderPos: number;
    playerID?: string;
    currentPlayer: string;
    numMoves?: number;
    gameover?: any;
    turn: number;
    phase: string;
    _random?: {
        seed: string | number;
    };
    events?: import("../plugins/plugin-events").EventsAPI;
    log?: import("../plugins/plugin-log").LogAPI;
    random?: import("../plugins/random/random").RandomAPI;
};
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */
export declare function UpdateActivePlayersOnceEmpty(ctx: Ctx): {
    activePlayers: import("../types").ActivePlayers;
    _activePlayersMoveLimit: Record<string, number>;
    _activePlayersNumMoves: Record<string, number>;
    _prevActivePlayers: {
        activePlayers: import("../types").ActivePlayers;
        _activePlayersMoveLimit?: Record<string, number>;
        _activePlayersNumMoves?: Record<string, number>;
    }[];
    numPlayers: number;
    playOrder: string[];
    playOrderPos: number;
    playerID?: string;
    currentPlayer: string;
    numMoves?: number;
    gameover?: any;
    turn: number;
    phase: string;
    _nextActivePlayers?: ActivePlayersArg;
    _random?: {
        seed: string | number;
    };
    events?: import("../plugins/plugin-events").EventsAPI;
    log?: import("../plugins/plugin-log").LogAPI;
    random?: import("../plugins/random/random").RandomAPI;
};
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */
export declare function InitTurnOrderState(state: State, turn: TurnConfig): Ctx;
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */
export declare function UpdateTurnOrderState(state: State, currentPlayer: PlayerID, turn: TurnConfig, endTurnArg?: true | {
    remove?: any;
    next?: string;
}): {
    endPhase: boolean;
    ctx: Ctx;
};
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
export declare const TurnOrder: {
    /**
     * DEFAULT
     *
     * The default round-robin turn order.
     */
    DEFAULT: {
        first: (G: any, ctx: Ctx) => number;
        next: (G: any, ctx: Ctx) => number;
    };
    /**
     * RESET
     *
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: {
        first: () => number;
        next: (G: any, ctx: Ctx) => number;
    };
    /**
     * CONTINUE
     *
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: {
        first: (G: any, ctx: Ctx) => number;
        next: (G: any, ctx: Ctx) => number;
    };
    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
        first: () => number;
        next: (G: any, ctx: Ctx) => number;
    };
    /**
     * CUSTOM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     *
     * @param {Array} playOrder - The play order.
     */
    CUSTOM: (playOrder: string[]) => {
        playOrder: () => string[];
        first: () => number;
        next: (G: any, ctx: Ctx) => number;
    };
    /**
     * CUSTOM_FROM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     *
     * @param {string} playOrderField - Field in G.
     */
    CUSTOM_FROM: (playOrderField: string) => {
        playOrder: (G: any) => any;
        first: () => number;
        next: (G: any, ctx: Ctx) => number;
    };
};
export declare const Stage: {
    NULL: any;
};
export declare const ActivePlayers: {
    /**
     * ALL
     *
     * The turn stays with one player, but any player can play (in any order)
     * until the phase ends.
     */
    ALL: {
        all: any;
    };
    /**
     * ALL_ONCE
     *
     * The turn stays with one player, but any player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every player in the game.
     */
    ALL_ONCE: {
        all: any;
        moveLimit: number;
    };
    /**
     * OTHERS
     *
     * The turn stays with one player, and every *other* player can play (in any order)
     * until the phase ends.
     */
    OTHERS: {
        others: any;
    };
    /**
     * OTHERS_ONCE
     *
     * The turn stays with one player, and every *other* player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every *other* player in the game.
     */
    OTHERS_ONCE: {
        others: any;
        moveLimit: number;
    };
};
