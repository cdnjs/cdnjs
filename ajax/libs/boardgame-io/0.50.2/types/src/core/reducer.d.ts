import type { Dispatch } from 'redux';
import type { ActionShape, Game, LogEntry, State, Store, TransientMetadata, TransientState } from '../types';
/**
 * Middleware for processing TransientState associated with the reducer
 * returned by CreateGameReducer.
 * This should pretty much be used everywhere you want realistic state
 * transitions and error handling.
 */
export declare const TransientHandlingMiddleware: (store: Store) => (next: Dispatch<ActionShape.Any>) => (action: ActionShape.Any) => {
    type: "MAKE_MOVE";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    type: "GAME_EVENT";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    type: "UNDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
    };
} | {
    type: "REDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
    };
} | {
    type: "SYNC";
    state: State<any>;
    log: LogEntry[];
    initialState: State<any>;
    clientOnly: true;
} | {
    type: "UPDATE";
    state: State<any>;
    deltalog: LogEntry[];
    clientOnly: true;
} | {
    type: "PATCH";
    prevStateID: number;
    stateID: number;
    patch: import("rfc6902").Operation[];
    deltalog: LogEntry[];
    clientOnly: true;
} | {
    type: "RESET";
    state: State<any>;
    clientOnly: true;
} | {
    type: "PLUGIN";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    type: "STRIP_TRANSIENTS";
} | {
    transients: TransientMetadata;
    type: "MAKE_MOVE";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    transients: TransientMetadata;
    type: "GAME_EVENT";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    transients: TransientMetadata;
    type: "UNDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
    };
} | {
    transients: TransientMetadata;
    type: "REDO";
    payload: {
        type: any;
        args: any;
        playerID: string;
    };
} | {
    transients: TransientMetadata;
    type: "GAME_EVENT";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
    automatic: boolean;
} | {
    transients: TransientMetadata;
    type: "SYNC";
    state: State<any>;
    log: LogEntry[];
    initialState: State<any>;
    clientOnly: true;
} | {
    transients: TransientMetadata;
    type: "UPDATE";
    state: State<any>;
    deltalog: LogEntry[];
    clientOnly: true;
} | {
    transients: TransientMetadata;
    type: "PATCH";
    prevStateID: number;
    stateID: number;
    patch: import("rfc6902").Operation[];
    deltalog: LogEntry[];
    clientOnly: true;
} | {
    transients: TransientMetadata;
    type: "RESET";
    state: State<any>;
    clientOnly: true;
} | {
    transients: TransientMetadata;
    type: "PLUGIN";
    payload: {
        type: string;
        args: any;
        playerID: string;
    };
} | {
    transients: TransientMetadata;
    type: "STRIP_TRANSIENTS";
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */
export declare function CreateGameReducer({ game, isClient, }: {
    game: Game;
    isClient?: boolean;
}): (stateWithTransients: TransientState | null, action: ActionShape.Any) => TransientState;
