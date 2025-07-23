/**
 * This class is entity for recording frame.
 * Namely, this class has recorded sound data.
 */
export declare class Frame {
    private id;
    private dataBlocks;
    /**
     * @param {id} id This argument is frame ID.
     */
    constructor(id: string);
    /**
     * This method gets array that contains recorded sound data.
     * @return {Array<Float32Array>}
     */
    get(): Float32Array[];
    /**
     * This method appends recorded sound data as `Float32Array`.
     * @param {Float32Array} dataBlock This argument is instance of `Float32Array` that has recorded sound data.
     * @return {Frame} Return value is for method chain.
     */
    append(dataBlock: Float32Array): Frame;
    /**
     * This method clears data blocks.
     */
    clear(): void;
    /**
     * This method determines whether contains recorded sound data.
     * @return {boolean} If frame has recorded data, this value is `true`. Otherwise, this value is `false`.
     */
    has(): boolean;
    /** @override */
    toString(): string;
}
//# sourceMappingURL=Frame.d.ts.map