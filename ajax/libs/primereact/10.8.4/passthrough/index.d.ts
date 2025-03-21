export interface PassThroughOptions {
    /**
     * Should the passthrough merge sections?
     */
    mergeSections?: boolean | undefined;
    /**
     * Should the passthrough merge properties?
     */
    mergeProps?: boolean | undefined;
    /**
     * Custom merge function such as twMerge for Tailwind merging.
     * @param className1 the first className to merge
     * @param className2 the second className to merge to className1
     * @returns the merged className
     */
    classNameMergeFunction?: (className1: string, className2: string) => string | undefined;
}

export declare function usePassThrough(pt1: object, pt2: object, options?: PassThroughOptions): object;
