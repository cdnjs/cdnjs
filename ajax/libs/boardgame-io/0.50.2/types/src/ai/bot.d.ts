import type { ActionShape, Game, Ctx, PlayerID, State } from '../types';
export declare type BotAction = ActionShape.GameEvent | ActionShape.MakeMove;
/**
 * Base class that bots can extend.
 */
export declare abstract class Bot {
    private enumerateFn;
    private seed?;
    protected iterationCounter: number;
    private _opts;
    private prngstate?;
    constructor({ enumerate, seed, }: {
        enumerate: Game['ai']['enumerate'];
        seed?: string | number;
    });
    abstract play(state: State, playerID: PlayerID): Promise<{
        action: BotAction;
        metadata?: any;
    }>;
    addOpt({ key, range, initial, }: {
        key: string;
        range?: {
            min: number;
            max: number;
        };
        initial: any;
    }): void;
    getOpt(key: string): any;
    setOpt(key: string, value: any): void;
    opts(): Record<string, {
        range?: {
            min: number;
            max: number;
        };
        value: any;
    }>;
    enumerate(G: any, ctx: Ctx, playerID: PlayerID): BotAction[];
    random<T extends any = any>(arg: T[]): T;
    random(arg?: number): number;
}
