import 'setimmediate';
import { Bot } from './bot';
import type { BotAction } from './bot';
import type { Game, PlayerID, Ctx, State } from '../types';
export interface Node {
    /** Game state at this node. */
    state: State;
    /** Parent of the node. */
    parent?: Node;
    /** Move used to get to this node. */
    parentAction?: BotAction;
    /** Unexplored actions. */
    actions: BotAction[];
    /** Current objectives. */
    objectives: Objectives | Objectives[];
    /** Children of the node. */
    children: Node[];
    /** Number of simulations that pass through this node. */
    visits: number;
    /** Number of wins for this node. */
    value: number;
}
interface Objective {
    checker: (G: any, ctx: Ctx) => boolean;
    weight: number;
}
declare type Objectives = Record<string, Objective>;
/**
 * Bot that uses Monte-Carlo Tree Search to find promising moves.
 */
export declare class MCTSBot extends Bot {
    private objectives;
    private iterationCallback;
    private reducer;
    iterations: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
    playoutDepth?: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
    constructor({ enumerate, seed, objectives, game, iterations, playoutDepth, iterationCallback, }: {
        enumerate: Game['ai']['enumerate'];
        seed?: string | number;
        game: Game;
        objectives?: (G: any, ctx: Ctx, playerID?: PlayerID) => Objectives;
        iterations?: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
        playoutDepth?: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
        iterationCallback?: (data: {
            iterationCounter: number;
            numIterations: number;
            metadata: Node;
        }) => void;
    });
    private createNode;
    private select;
    private expand;
    playout({ state }: Node): any;
    private backpropagate;
    play(state: State, playerID: PlayerID): Promise<{
        action: BotAction;
        metadata: Node;
    }>;
}
export {};
