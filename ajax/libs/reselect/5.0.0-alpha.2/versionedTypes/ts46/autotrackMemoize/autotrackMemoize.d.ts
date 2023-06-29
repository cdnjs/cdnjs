export declare function autotrackMemoize<F extends (...args: any[]) => any>(func: F): F & {
    clearCache: () => void;
};
