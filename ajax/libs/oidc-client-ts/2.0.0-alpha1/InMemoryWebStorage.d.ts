export declare class InMemoryWebStorage implements Storage {
    private _data;
    constructor();
    clear(): void;
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    get length(): number;
    key(index: number): string;
}
