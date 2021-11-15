import { StateStore } from './StateStore';
export declare class State {
    private _id;
    private _data;
    private _created;
    private _request_type;
    constructor({ id, data, created, request_type }?: any);
    get id(): any;
    get data(): any;
    get created(): number;
    get request_type(): any;
    toStorageString(): string;
    static fromStorageString(storageString: string): State;
    static clearStaleState(storage: StateStore, age: number): Promise<void>;
}
