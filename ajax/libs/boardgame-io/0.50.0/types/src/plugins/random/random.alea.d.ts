export interface AleaState {
    c: number;
    s0: number;
    s1: number;
    s2: number;
}
declare class Alea {
    c: number;
    s0: number;
    s1: number;
    s2: number;
    constructor(seed: string | number);
    next(): number;
}
declare type PRNG = Alea['next'] & {
    state?: () => AleaState;
};
export declare function alea(seed: string | number, state?: AleaState): PRNG;
export {};
