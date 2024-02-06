export interface PassThroughOptions {
    mergeSections?: boolean | undefined;
    mergeProps?: boolean | undefined;
    classNameMergeFunction?: (className1: string, className2: string) => string | undefined;
}

export declare function usePassThrough(pt1: object, pt2: object, options?: PassThroughOptions): object;
