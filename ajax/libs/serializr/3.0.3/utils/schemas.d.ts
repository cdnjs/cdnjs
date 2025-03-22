import { ClazzOrModelSchema, ModelSchema } from "../api/types";
/**
 * A simple util that retrieve the existing schema or create a default one.
 * @param src
 * @returns
 */
export declare const getOrCreateSchema: <T extends object>(src: ClazzOrModelSchema<T>) => ModelSchema<T>;
