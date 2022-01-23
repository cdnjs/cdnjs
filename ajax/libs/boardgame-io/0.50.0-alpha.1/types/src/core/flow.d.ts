import type { ActionPayload, ActionShape, ActivePlayersArg, State, Ctx, Game, PlayerID, Move } from '../types';
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
export declare function Flow({ moves, phases, endIf, onEnd, turn, events, plugins, }: Game): {
    ctx: (numPlayers: number) => Ctx;
    init: (state: State) => State;
    isPlayerActive: (_G: any, ctx: Ctx, playerID: PlayerID) => boolean;
    eventHandlers: {
        endStage: (state: State, playerID: PlayerID) => State;
        setStage: (state: State, playerID: PlayerID, arg: any) => State;
        endTurn: (state: State, _playerID: PlayerID, arg: any) => State;
        pass: (state: State, _playerID: PlayerID, arg: any) => State;
        endPhase: (state: State) => State;
        setPhase: (state: State, _playerID: PlayerID, newPhase: string) => State;
        endGame: (state: State, _playerID: PlayerID, arg: any) => State;
        setActivePlayers: (state: State, _playerID: PlayerID, arg: ActivePlayersArg) => State;
    };
    eventNames: string[];
    enabledEventNames: any[];
    moveMap: {};
    moveNames: unknown[];
    processMove: (state: State, action: ActionPayload.MakeMove) => State;
    processEvent: (state: State, action: ActionShape.GameEvent) => State;
    getMove: (ctx: Ctx, name: string, playerID: PlayerID) => null | Move;
};
