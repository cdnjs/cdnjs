export default IDBVersionChangeEvent;
export type Integer = number;
/**
 * Babel apparently having a problem adding `hasInstance` to a class,
 * so we are redefining as a function.
 * @class
 * @param {string} type
 */
declare function IDBVersionChangeEvent(type: string, ...args: any[]): void;
declare class IDBVersionChangeEvent {
    /**
     * Babel apparently having a problem adding `hasInstance` to a class,
     * so we are redefining as a function.
     * @class
     * @param {string} type
     */
    constructor(type: string, ...args: any[]);
    toString: () => string;
    __eventInitDict: any;
    [Symbol.toStringTag]: string;
}
//# sourceMappingURL=IDBVersionChangeEvent.d.ts.map