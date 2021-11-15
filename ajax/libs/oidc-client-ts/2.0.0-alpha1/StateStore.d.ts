export interface StateStore {
    set(key: string, value: any): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<any>;
    getAllKeys(): Promise<string[]>;
}
