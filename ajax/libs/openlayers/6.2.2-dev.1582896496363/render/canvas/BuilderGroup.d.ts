export default BuilderGroup;
declare class BuilderGroup {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Max extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} declutter Decluttering enabled.
     */
    constructor(tolerance: number, maxExtent: number[], resolution: number, pixelRatio: number, declutter: boolean);
    /**
     * @type {boolean}
     * @private
     */
    private declutter_;
    /**
     * @type {import("../canvas.js").DeclutterGroups}
     * @private
     */
    private declutterGroups_;
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
     * @param {boolean} group Group with previous builder.
     * @return {import("../canvas").DeclutterGroups} The resulting instruction groups.
     */
    addDeclutter(group: boolean): any[][];
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
    getBuilder(zIndex: number, builderType: any): import("../VectorContext.js").default;
}
//# sourceMappingURL=BuilderGroup.d.ts.map