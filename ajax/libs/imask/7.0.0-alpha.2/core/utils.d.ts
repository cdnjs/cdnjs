/** Checks if value is string */
export declare function isString(str: unknown): str is string;
/** Checks if value is object */
export declare function isObject(obj: unknown): obj is Object;
export declare function pick<T, K extends keyof T, V>(obj: T, keys: K[] | ((v: V, k: K) => boolean)): Pick<T, K>;
/**
  Direction
  @prop {string} NONE
  @prop {string} LEFT
  @prop {string} FORCE_LEFT
  @prop {string} RIGHT
  @prop {string} FORCE_RIGHT
*/
export declare const DIRECTION: {
    readonly NONE: "NONE";
    readonly LEFT: "LEFT";
    readonly FORCE_LEFT: "FORCE_LEFT";
    readonly RIGHT: "RIGHT";
    readonly FORCE_RIGHT: "FORCE_RIGHT";
};
/**
  Direction
  @enum {string}
*/
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