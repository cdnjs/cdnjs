import type { AleaState } from './random.alea';
export interface RandomState {
    seed: string | number;
    prngstate?: AleaState;
}
export interface RandomAPI {
    D4(): number;
    D4(diceCount: number): number[];
    D6(): number;
    D6(diceCount: number): number[];
    D10(): number;
    D10(diceCount: number): number[];
    D12(): number;
    D12(diceCount: number): number[];
    D20(): number;
    D20(diceCount: number): number[];
    Die(spotvalue?: number): number;
    Die(spotvalue: number, diceCount: number): number[];
    Number(): number;
    Shuffle<T>(deck: T[]): T[];
}
export interface PrivateRandomAPI {
    _private: {
        isUsed(): boolean;
        getState(): RandomState;
    };
}
/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */
export declare class Random {
    state: RandomState;
    used: boolean;
    /**
     * Generates a new seed from the current date / time.
     */
    static seed(): string;
    /**
     * constructor
     * @param {object} ctx - The ctx object to initialize from.
     */
    constructor(state?: RandomState);
    isUsed(): boolean;
    getState(): RandomState;
    /**
     * Generate a random number.
     */
    _random(): number;
    api(): RandomAPI & PrivateRandomAPI;
}
