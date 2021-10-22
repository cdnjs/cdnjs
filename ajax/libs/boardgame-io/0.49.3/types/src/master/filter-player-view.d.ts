import type { Game, LogEntry, PlayerID } from '../types';
import type { TransportData, IntermediateTransportData } from './master';
/** Gets a function that filters the TransportData for a given player and game. */
export declare const getFilterPlayerView: (game: Game) => (playerID: string | null, payload: IntermediateTransportData) => TransportData;
/**
 * Redact the log.
 *
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
export declare function redactLog(log: LogEntry[], playerID: PlayerID | null): {
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
    patch?: import("rfc6902").Operation[];
}[];
