export default RenderBox;
declare class RenderBox extends Disposable {
    /**
     * @param {string} className CSS class name.
     */
    constructor(className: string);
    /**
     * @type {import("../geom/Polygon.js").default}
     * @private
     */
    private geometry_;
    /**
     * @type {HTMLDivElement}
     * @private
     */
    private element_;
    /**
     * @private
     * @type {import("../PluggableMap.js").default|null}
     */
    private map_;
    /**
     * @private
     * @type {import("../pixel.js").Pixel}
     */
    private startPixel_;
    /**
     * @private
     * @type {import("../pixel.js").Pixel}
     */
    private endPixel_;
    /**
     * @private
     */
    private render_;
    /**
     * @param {import("../PluggableMap.js").default|null} map Map.
     */
    setMap(map: import("../PluggableMap.js").default | null): void;
    /**
     * @param {import("../pixel.js").Pixel} startPixel Start pixel.
     * @param {import("../pixel.js").Pixel} endPixel End pixel.
     */
    setPixels(startPixel: import("../pixel.js").Pixel, endPixel: import("../pixel.js").Pixel): void;
    /**
     * Creates or updates the cached geometry.
     */
    createOrUpdateGeometry(): void;
    /**
     * @return {import("../geom/Polygon.js").default} Geometry.
     */
    getGeometry(): import("../geom/Polygon.js").default;
}
import Disposable from "../Disposable.js";
//# sourceMappingURL=Box.d.ts.map