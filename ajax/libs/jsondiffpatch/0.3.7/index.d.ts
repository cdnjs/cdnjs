export type Formatter = (delta: Delta, original: any) => string;

export interface Delta {
    [key: string]: any;
    [key: number]: any;
}

export interface DiffContext {
    left: any;
    right: any;
}

export interface Config {
    // used to match objects when diffing arrays, by default only === operator is used
    objectHash?: (item: any) => string;
    arrays?: {
        // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
        detectMove: boolean,
        // default false, the value of items moved is not included in deltas
        includeValueOnMove: boolean,
    };
    textDiff?: {
        // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
        minLength: number,
    };
    /*
        this optional function can be specified to ignore object properties (eg. volatile data)
        name: property name, present in either context.left or context.right objects
        context: the diff context (has context.left and context.right objects)
    */
    propertyFilter?: (name: string, context: DiffContext) => boolean;
    /*
        default false. if true, values in the obtained delta will be cloned (using jsondiffpatch.clone by default),
        to ensure delta keeps no references to left or right objects. this becomes useful if you're diffing and patching
        the same objects multiple times without serializing deltas.

        instead of true, a function can be specified here to provide a custom clone(value)
     */
    cloneDiffValues?: boolean | ((value: any) => any);
}

export class DiffPatcher {
    constructor(options?: any);

    clone: (value: any) => any;
    dateReviver: (key: string, value: any) => any;
    diff: (left: any, right: any) => Delta | undefined;
    formatters: {
        annotated: Formatter;
        console: Formatter;
        html: Formatter;
    };
    patch: (left: any, delta: Delta) => any;
    reverse: (delta: Delta) => Delta | undefined;
    unpatch: (right: any, delta: Delta) => any;
}
