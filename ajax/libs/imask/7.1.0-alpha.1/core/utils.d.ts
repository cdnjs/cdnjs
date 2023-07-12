/** Checks if value is string */
export declare function isString(str: unknown): str is string;
/** Checks if value is object */
export declare function isObject(obj: unknown): obj is object;
export declare function pick<T extends Record<string, any>, K extends keyof T, V extends T[keyof T]>(obj: T, keys: K[] | ((v: V, k: K) => boolean)): Pick<T, K>;
/** Direction */
export declare const DIRECTION: {
    readonly NONE: "NONE";
    readonly LEFT: "LEFT";
    readonly FORCE_LEFT: "FORCE_LEFT";
    readonly RIGHT: "RIGHT";
    readonly FORCE_RIGHT: "FORCE_RIGHT";
};
/** Direction */
export type Direction = typeof DIRECTION[keyof typeof DIRECTION];
export declare function forceDirection(direction: Direction): Direction;
/** Escapes regular expression control chars */
export declare function escapeRegExp(str: string): string;
export declare function objectIncludes(b: any, a: any): boolean;
/** Selection range */
export type Selection = {
    start: number;
    end: number;
};
//# sourceMappingURL=utils.d.ts.map