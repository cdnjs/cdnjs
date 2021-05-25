import { ProcessGameConfig } from '../core/game';
import type { SyncInfo, FilteredMetadata, Game, State, ActionShape, CredentialedActionShape, LogEntry, PlayerID, ChatMessage } from '../types';
import type { Auth } from '../server/auth';
import * as StorageAPI from '../server/db/base';
import type { Operation } from 'rfc6902';
/**
 * Redact the log.
 *
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
export declare function redactLog(log: LogEntry[], playerID: PlayerID): {
    action: {
        payload: {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        };
        type: "MAKE_MOVE";
    } | {
        payload: {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        };
        type: "GAME_EVENT";
    } | {
        payload: {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        };
        type: "UNDO";
    } | {
        payload: {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: string;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        } | {
            args: any;
            type: any;
            playerID: string;
        };
        type: "REDO";
    };
    _stateID: number;
    turn: number;
    phase: string;
    automatic?: boolean;
    metadata?: any;
    patch?: Operation[];
}[];
declare type CallbackFn = (arg: {
    state: State;
    matchID: string;
    action?: ActionShape.Any | CredentialedActionShape.Any;
}) => void;
export declare type TransportData = {
    type: 'update';
    args: [string, State, LogEntry[]];
} | {
    type: 'patch';
    args: [string, number, number, Operation[], LogEntry[]];
} | {
    type: 'sync';
    args: [string, SyncInfo];
} | {
    type: 'matchData';
    args: [string, FilteredMetadata];
} | {
    type: 'chat';
    args: [string, ChatMessage];
};
export interface TransportAPI {
    send: (playerData: {
        playerID: PlayerID;
    } & TransportData) => void;
    sendAll: (makePlayerData: (playerID: PlayerID) => TransportData) => void;
}
/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */
export declare class Master {
    game: ReturnType<typeof ProcessGameConfig>;
    storageAPI: StorageAPI.Sync | StorageAPI.Async;
    transportAPI: TransportAPI;
    subscribeCallback: CallbackFn;
    auth?: Auth;
    constructor(game: Game, storageAPI: StorageAPI.Sync | StorageAPI.Async, transportAPI: TransportAPI, auth?: Auth);
    subscribe(fn: CallbackFn): void;
    /**
     * Called on each move / event made by the client.
     * Computes the new value of the game state and returns it
     * along with a deltalog.
     */
    onUpdate(credAction: CredentialedActionShape.Any, stateID: number, matchID: string, playerID: string): Promise<void | {
        error: string;
    }>;
    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */
    onSync(matchID: string, playerID: string | null | undefined, credentials?: string, numPlayers?: number): Promise<void | {
        error: string;
    }>;
    /**
     * Called when a client connects or disconnects.
     * Updates and sends out metadata to reflect the player’s connection status.
     */
    onConnectionChange(matchID: string, playerID: string | null | undefined, credentials: string | undefined, connected: boolean): Promise<void | {
        error: string;
    }>;
    onChatMessage(matchID: string, chatMessage: ChatMessage, credentials: string | undefined): Promise<void | {
        error: string;
    }>;
}
export {};
