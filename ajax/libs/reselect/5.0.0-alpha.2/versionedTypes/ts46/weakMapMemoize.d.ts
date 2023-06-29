export declare function weakMapMemoize<F extends (...args: any[]) => any>(func: F): F & {
    clearCache: () => void;
};
