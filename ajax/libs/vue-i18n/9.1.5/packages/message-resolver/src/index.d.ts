/** @VueI18nGeneral */
export declare type Path = string;
/**
 * Parse a string path into an array of segments
 */
export declare function parse(path: Path): string[] | undefined;
export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];
export declare function resolveValue(obj: unknown, path: Path): PathValue;
/**
 * Transform flat json in obj to normal json in obj
 */
export declare function handleFlatJson(obj: unknown): unknown;
//# sourceMappingURL=index.d.ts.map