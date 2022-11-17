var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/proj/epsg4326
 */
import Projection from './Projection.js';
import Units from './Units.js';
/**
 * Semi-major radius of the WGS84 ellipsoid.
 *
 * @const
 * @type {number}
 */
export var RADIUS = 6378137;
/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {import("../extent.js").Extent}
 */
export var EXTENT = [-180, -90, 180, 90];
/**
 * @const
 * @type {number}
 */
export var METERS_PER_UNIT = (Math.PI * RADIUS) / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */
var EPSG4326Projection = /** @class */ (function (_super) {
    __extends(EPSG4326Projection, _super);
    /**
     * @param {string} code Code.
     * @param {string} [opt_axisOrientation] Axis orientation.
     */
    function EPSG4326Projection(code, opt_axisOrientation) {
        return _super.call(this, {
            code: code,
            units: Units.DEGREES,
            extent: EXTENT,
            axisOrientation: opt_axisOrientation,
            global: true,
            metersPerUnit: METERS_PER_UNIT,
            worldExtent: EXTENT,
        }) || this;
    }
    return EPSG4326Projection;
}(Projection));
/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
export var PROJECTIONS = [
    new EPSG4326Projection('CRS:84'),
    new EPSG4326Projection('EPSG:4326', 'neu'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:1.3:CRS84'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:2:84'),
    new EPSG4326Projection('http://www.opengis.net/def/crs/OGC/1.3/CRS84', 'neu'),
    new EPSG4326Projection('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'),
    new EPSG4326Projection('http://www.opengis.net/def/crs/EPSG/0/4326', 'neu'),
];
//# sourceMappingURL=epsg4326.js.map