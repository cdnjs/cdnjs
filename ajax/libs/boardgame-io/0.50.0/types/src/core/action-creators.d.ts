import type { SyncInfo, State, LogEntry } from '../types';
import type { Operation } from 'rfc6902';
/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
export declare const makeMove: (type: string, args?: any, playerID?: string | null, credentials?: string) => {
    type: "MAKE_MOVE";
    payload: {
        type: string;
        args: any;
        playerID: string;
        credentials: string;
    };
};
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
export declare const gameEvent: (type: string, args?: any, playerID?: string | null, credentials?: string) => {
    type: "GAME_EVENT";
    payload: {
        type: string;
        args: any;
        playerID: string;
        credentials: string;
    };
};
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
export declare const automaticGameEvent: (type: string, args: any, playerID?: string | null, credentials?: string) => {
    type: "GAME_EVENT";
    payload: {
        type: string;
        args: any;
        playerID: string;
        credentials: string;
    };
    automatic: boolean;
};
export declare const sync: (info: SyncInfo) => {
    type: "SYNC";
    state: State<any>;
    log: LogEntry[];
    initialState: State<any>;
    clientOnly: true;
};
/**
 * Used to update the Redux store's state with patch in response to
 * an action coming from another player.
 * @param prevStateID previous stateID
 * @param stateID stateID after this patch
 * @param {Operation[]} patch - The patch to apply.
 * @param {LogEntry[]} deltalog - A log delta.
 */
export declare const patch: (prevStateID: number, stateID: number, patch: Operation[], deltalog: LogEntry[]) => {
    type: "PATCH";
    prevStateID: number;
    stateID: number;
    patch: Operation[];
    deltalog: LogEntry[];
    clientOnly: true;
};
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */
export declare const update: (state: State, deltalog: LogEntry[]) => {
    type: "UPDATE";
    state: State<any>;
    deltalog: LogEntry[];
    clientOnly: true;
};
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */
export declare const reset: (state: State) => {
    type: "RESET";
    state: State<any>;
    clientOnly: true;
};
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
export declare const undo: (playerID?: string | null, credentials?: string) => {
    type: "UNDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
        credentials: string;
    };
};
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
export declare const redo: (playerID?: string | null, credentials?: string) => {
    type: "REDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
        credentials: string;
    };
};
/**
 * Allows plugins to define their own actions and intercept them.
 */
export declare const plugin: (type: string, args?: any, playerID?: string | null, credentials?: string) => {
    type: "PLUGIN";
    payload: {
        type: string;
        args: any;
        playerID: string;
        credentials: string;
    };
};
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */
export declare const stripTransients: () => {
    type: "STRIP_TRANSIENTS";
};
