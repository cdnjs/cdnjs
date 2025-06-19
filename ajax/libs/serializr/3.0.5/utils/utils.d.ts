import { AdditionalPropArgs, ModelSchema, PropSchema } from "../api/types";
import invariant from "./invariant";
export declare function GUARDED_NOOP(err?: any): void;
export declare function once<F extends (...args: any[]) => any>(fn: F): F;
export declare function parallel<T, R>(ar: T[], processor: (val: T, cb2: (err?: any, result?: R) => void, idx: number) => void, cb: (err?: any, result?: R[]) => void): undefined;
export declare function isPrimitive(value: any): value is number | string | undefined | null | bigint;
export declare function isModelSchema(thing: any): thing is ModelSchema<any>;
export declare function isPropSchema(thing: any): thing is PropSchema;
export declare function isAliasedPropSchema(propSchema: any): propSchema is PropSchema & {
    jsonname: string;
};
export declare function isIdentifierPropSchema(propSchema: any): propSchema is PropSchema;
export declare function isAssignableTo(actualType: ModelSchema<any>, expectedType: ModelSchema<any>): boolean;
export type MapLike = Pick<Map<any, any>, "keys" | "clear" | "forEach" | "set">;
export declare function isMapLike(thing: any): thing is MapLike;
export declare function getIdentifierProp(modelSchema: ModelSchema<any>): string | undefined;
export declare function processAdditionalPropArgs<T extends PropSchema>(propSchema: T, additionalArgs?: AdditionalPropArgs): T;
export declare function isRegExp(obj: any): obj is RegExp;
export { invariant };
