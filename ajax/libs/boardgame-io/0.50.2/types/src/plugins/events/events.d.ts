import type { State, Ctx, PlayerID, Game, ActivePlayersArg } from '../../types';
import { GameMethod } from '../../core/game-methods';
export interface EventsAPI {
    endGame(gameover?: any): void;
    endPhase(): void;
    endStage(): void;
    endTurn(arg?: {
        next: PlayerID;
    }): void;
    pass(arg?: {
        remove: true;
    }): void;
    setActivePlayers(arg: ActivePlayersArg): void;
    setPhase(newPhase: string): void;
    setStage(newStage: string): void;
}
export interface PrivateEventsAPI {
    _private: {
        isUsed(): boolean;
        updateTurnContext(ctx: Ctx, methodType: GameMethod | undefined): void;
        unsetCurrentMethod(): void;
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
        calledFrom: GameMethod | undefined;
        error: Error;
    }>;
    maxEndedTurnsPerAction: number;
    initialTurn: number;
    currentPhase: string;
    currentTurn: number;
    currentMethod?: GameMethod;
    constructor(flow: Game['flow'], ctx: Ctx, playerID?: PlayerID);
    api(): EventsAPI & PrivateEventsAPI;
    isUsed(): boolean;
    updateTurnContext(ctx: Ctx, methodType: GameMethod | undefined): void;
    unsetCurrentMethod(): void;
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
    update(state: State): State;
}
