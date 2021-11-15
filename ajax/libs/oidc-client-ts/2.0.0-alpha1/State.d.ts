import { StateStore } from "./StateStore";
export declare class State {
    readonly id: string;
    readonly data: any;
    readonly created: number;
    readonly request_type: string;
    constructor(args: {
        id?: string;
        data?: any;
        created?: number;
        request_type: string;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): State;
    static clearStaleState(storage: StateStore, age: number): Promise<void>;
}
