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
export function calculateSourceResolution(sourceProj: import("./proj/Projection.js").default, targetProj: import("./proj/Projection.js").default, targetCenter: number[], targetResolution: number): number;
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
export function calculateSourceExtentResolution(sourceProj: import("./proj/Projection.js").default, targetProj: import("./proj/Projection.js").default, targetExtent: number[], targetResolution: number): number;
/**
 * @typedef {Object} ImageExtent
 * @property {import("./extent.js").Extent} extent Extent.
 * @property {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
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
 * @param {boolean} [opt_renderEdges] Render reprojection edges.
 * @param {object} [opt_interpolate] Use linear interpolation when resampling.
 * @return {HTMLCanvasElement} Canvas with reprojected data.
 */
export function render(width: number, height: number, pixelRatio: number, sourceResolution: number, sourceExtent: number[], targetResolution: number, targetExtent: number[], triangulation: import("./reproj/Triangulation.js").default, sources: ImageExtent[], gutter: number, opt_renderEdges?: boolean | undefined, opt_interpolate?: any): HTMLCanvasElement;
export type ImageExtent = {
    /**
     * Extent.
     */
    extent: number[];
    /**
     * Image.
     */
    image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
};
//# sourceMappingURL=reproj.d.ts.map