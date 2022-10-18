import { ModelSchema } from "./types";
/**
 * Returns the standard model schema associated with a class / constructor function
 *
 */
export default function getDefaultModelSchema<T>(thing: any): ModelSchema<T> | undefined;
