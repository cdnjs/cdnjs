import type { State, Ctx, PlayerID, Game } from '../../types';
export interface EventsAPI {
    endGame?(...args: any[]): void;
    endPhase?(...args: any[]): void;
    endStage?(...args: any[]): void;
    endTurn?(...args: any[]): void;
    pass?(...args: any[]): void;
    setActivePlayers?(...args: any[]): void;
    setPhase?(...args: any[]): void;
    setStage?(...args: any[]): void;
}
export interface PrivateEventsAPI {
    _obj: {
        isUsed(): boolean;
        updateTurnContext(ctx: Ctx): void;
        update(state: State): State;
    };
}
/**
 * Events
 */
export declare class Events {
    flow: Game['flow'];
    playerID: PlayerID | undefined;
    dispatch: Array<{
        type: string;
        args: any[];
        phase: string;
        turn: number;
    }>;
    maxEndedTurnsPerAction: number;
    initialTurn: number;
    currentPhase: string;
    currentTurn: number;
    constructor(flow: Game['flow'], ctx: Ctx, playerID?: PlayerID);
    api(): EventsAPI & PrivateEventsAPI;
    isUsed(): boolean;
    updateTurnContext(ctx: Ctx): void;
    stateWithError(state: State): State;
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
    update(state: State): State;
}
