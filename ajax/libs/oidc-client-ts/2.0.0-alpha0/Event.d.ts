export declare class Event {
    protected _name: string;
    private _callbacks;
    constructor(name: string);
    addHandler(cb: (...ev: any[]) => void): void;
    removeHandler(cb: (...ev: any[]) => void): void;
    raise(...params: any[]): void;
}
