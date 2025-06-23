/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./coordinate.js").Coordinate} targetCenter Target center.
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */
export function calculateSourceResolution(sourceProj: import("./proj/Projection.js").default, targetProj: import("./proj/Projection.js").default, targetCenter: import("./coordinate.js").Coordinate, targetResolution: number): number;
/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./extent.js").Extent} targetExtent Target extent
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */
export function calculateSourceExtentResolution(sourceProj: import("./proj/Projection.js").default, targetProj: import("./proj/Projection.js").default, targetExtent: import("./extent.js").Extent, targetResolution: number): number;
/**
 * @typedef {Object} ImageExtent
 * @property {import("./extent.js").Extent} extent Extent.
 * @property {import("./extent.js").Extent} [clipExtent] Clip extent.
 * @property {import('./DataTile.js').ImageLike} image Image.
 */
/**
 * Renders the source data into new canvas based on the triangulation.
 *
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @param {number} pixelRatio Pixel ratio.
 * @param {number} sourceResolution Source resolution.
 * @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
 * @param {number} targetResolution Target resolution.
 * @param {import("./extent.js").Extent} targetExtent Target extent.
 * @param {import("./reproj/Triangulation.js").default} triangulation Calculated triangulation.
 * @param {Array<ImageExtent>} sources Array of sources.
 * @param {number} gutter Gutter of the sources.
 * @param {boolean} [renderEdges] Render reprojection edges.
 * @param {boolean} [interpolate] Use linear interpolation when resampling.
 * @param {boolean} [drawSingle] Draw single source images directly without stitchContext.
 * @param {boolean} [clipExtent] Clip stitchContext to sourceExtent.
 * @return {HTMLCanvasElement} Canvas with reprojected data.
 */
export function render(width: number, height: number, pixelRatio: number, sourceResolution: number, sourceExtent: import("./extent.js").Extent, targetResolution: number, targetExtent: import("./extent.js").Extent, triangulation: import("./reproj/Triangulation.js").default, sources: Array<ImageExtent>, gutter: number, renderEdges?: boolean, interpolate?: boolean, drawSingle?: boolean, clipExtent?: boolean): HTMLCanvasElement;
/**
 * @type {Array<HTMLCanvasElement>}
 */
export const canvasPool: Array<HTMLCanvasElement>;
export type ImageExtent = {
    /**
     * Extent.
     */
    extent: import("./extent.js").Extent;
    /**
     * Clip extent.
     */
    clipExtent?: import("./extent.js").Extent | undefined;
    /**
     * Image.
     */
    image: import("./DataTile.js").ImageLike;
};
//# sourceMappingURL=reproj.d.ts.map