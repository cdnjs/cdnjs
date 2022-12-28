export default BuilderGroup;
declare class BuilderGroup {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Max extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: import("../../extent.js").Extent, resolution: number, pixelRatio: number);
    /**
     * @private
     * @type {number}
     */
    private tolerance_;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private maxExtent_;
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @private
     * @type {number}
     */
    private resolution_;
    /**
     * @private
     * @type {!Object<string, !Object<import("./BuilderType").default, Builder>>}
     */
    private buildersByZIndex_;
    /**
     * @return {!Object<string, !Object<import("./BuilderType").default, import("./Builder.js").SerializableInstructions>>} The serializable instructions
     */
    finish(): {
        [x: string]: any;
    };
    /**
     * @param {number|undefined} zIndex Z index.
     * @param {import("./BuilderType.js").default} builderType Replay type.
     * @return {import("../VectorContext.js").default} Replay.
     */
    getBuilder(zIndex: number | undefined, builderType: any): import("../VectorContext.js").default;
}
//# sourceMappingURL=BuilderGroup.d.ts.map