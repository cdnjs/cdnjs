export declare class WebStorageStateStore {
    private _store;
    private _prefix;
    constructor({ prefix, store }?: {
        prefix?: string | undefined;
        store?: Storage | undefined;
    });
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}
