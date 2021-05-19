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
        key: string;
        args: any[];
        phase: string;
        turn: number;
    }>;
    constructor(flow: Game['flow'], playerID?: PlayerID);
    /**
     * Attaches the Events API to ctx.
     * @param {object} ctx - The ctx object to attach to.
     */
    api(ctx: Ctx): EventsAPI & PrivateEventsAPI;
    isUsed(): boolean;
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
    update(state: State): State<any, Ctx>;
}
