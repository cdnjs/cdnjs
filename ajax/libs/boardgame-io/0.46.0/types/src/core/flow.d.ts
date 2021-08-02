import { SetActivePlayersEvent } from './turn-order';
import type { State, Ctx, Game, Move } from '../types';
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
export declare function Flow({ moves, phases, endIf, onEnd, turn, events, plugins, }: Game): {
    ctx: (numPlayers: number) => Ctx;
    init: (state: State<any, Ctx>) => State<any, Ctx>;
    isPlayerActive: (_G: any, ctx: Ctx, playerID: string) => boolean;
    eventHandlers: {
        endStage: (state: State<any, Ctx>, playerID: string) => State<any, Ctx>;
        setStage: (state: State<any, Ctx>, playerID: string, arg: any) => State<any, Ctx>;
        endTurn: (state: State<any, Ctx>, _playerID: string, arg: any) => State<any, Ctx>;
        pass: (state: State<any, Ctx>, _playerID: string, arg: any) => State<any, Ctx>;
        endPhase: (state: State<any, Ctx>) => State<any, Ctx>;
        setPhase: (state: State<any, Ctx>, _playerID: string, newPhase: string) => State<any, Ctx>;
        endGame: (state: State<any, Ctx>, _playerID: string, arg: any) => State<any, Ctx>;
        setActivePlayers: typeof SetActivePlayersEvent;
    };
    eventNames: string[];
    enabledEventNames: any[];
    moveMap: {};
    moveNames: unknown[];
    processMove: (state: State<any, Ctx>, action: {
        type: string;
        args: any;
        playerID: string;
    }) => State<any, Ctx>;
    processEvent: (state: State<any, Ctx>, action: {
        type: "GAME_EVENT";
        payload: {
            type: string;
            args: any;
            playerID: string;
        };
    }) => any;
    getMove: (ctx: Ctx, name: string, playerID: string) => Move<any, Ctx>;
};
