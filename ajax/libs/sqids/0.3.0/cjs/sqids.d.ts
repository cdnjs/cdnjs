interface SqidsOptions {
    alphabet?: string;
    minLength?: number;
    blocklist?: Set<string>;
}
export declare const defaultOptions: {
    alphabet: string;
    minLength: number;
    blocklist: Set<string>;
};
export default class Sqids {
    private alphabet;
    private minLength;
    private blocklist;
    constructor(options?: SqidsOptions);
    encode(numbers: number[]): string;
    decode(id: string): number[];
    private encodeNumbers;
    private shuffle;
    private toId;
    private toNumber;
    private isBlockedId;
    private maxValue;
}
export {};
