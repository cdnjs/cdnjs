export type SnapEventType = string;
export namespace SnapEventType {
    let SNAP: string;
    let UNSNAP: string;
}
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Snap~Snap} instances are instances of this
 */
export class SnapEvent extends Event {
    /**
     * @param {SnapEventType} type Type.
     * @param {Object} options Options.
     * @param {import("../coordinate.js").Coordinate} options.vertex The snapped vertex.
     * @param {import("../coordinate.js").Coordinate} options.vertexPixel The pixel of the snapped vertex.
     * @param {import("../Feature.js").default} options.feature The feature being snapped.
     * @param {Array<import("../coordinate.js").Coordinate>|null} options.segment Segment, or `null` if snapped to a vertex.
     */
    constructor(type: SnapEventType, options: {
        vertex: import("../coordinate.js").Coordinate;
        vertexPixel: import("../coordinate.js").Coordinate;
        feature: import("../Feature.js").default;
        segment: Array<import("../coordinate.js").Coordinate> | null;
    });
    /**
     * The Map coordinate of the snapped point.
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    vertex: import("../coordinate.js").Coordinate;
    /**
     * The Map pixel of the snapped point.
     * @type {Array<number>&Array<number>}
     * @api
     */
    vertexPixel: Array<number> & Array<number>;
    /**
     * The feature closest to the snapped point.
     * @type {import("../Feature.js").default<import("../geom/Geometry.js").default>}
     * @api
     */
    feature: import("../Feature.js").default<import("../geom/Geometry.js").default>;
    /**
     * The segment closest to the snapped point, if snapped to a segment.
     * @type {Array<import("../coordinate.js").Coordinate>|null}
     * @api
     */
    segment: Array<import("../coordinate.js").Coordinate> | null;
}
import Event from './Event.js';
//# sourceMappingURL=SnapEvent.d.ts.map