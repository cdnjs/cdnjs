import { Geometry } from "./WebGL";
/**
 * Enum for cylinder cap styles.
 * @readonly
 * @enum
 * @property NONE
 * @property FLAT
 * @property ROUND
 */
export declare enum CAP {
    NONE = 0,
    FLAT = 1,
    ROUND = 2
}
/**
 * Lower level utilities for creating WebGL shape geometries.
 * These are not intended for general consumption.
 * @namespace
  */
export declare namespace GLDraw {
    /**
     * Create a cylinder
     * @memberof GLDraw
     * @param {geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {float}
     *            radius
     * @param {Color}
     *            color
     * @param {CAP} fromCap - 0 for none, 1 for flat, 2 for round
     * @param {CAP} toCap = 0 for none, 1 for flat, 2 for round
     *
     * */
    function drawCylinder(geo: Geometry, from: any, to: any, radius: number, color: any, fromCap?: CAP, toCap?: CAP): void;
    /** Create a cone
     * @memberof GLDraw
     * @param {geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {float}
     *            radius
     * @param {Color}
     *            color
     *            */
    function drawCone(geo: Geometry, from: any, to: any, radius: number, color?: any): void;
    /** Create a sphere.
     * @memberof GLDraw
     * @param {geometry}
     *            geo
     * @param {Point}
     *            pos
     * @param {float}
     *            radius
     * @param {Color}
     *            color
     * @param {number} quality of sphere (default 2, higher increases number of triangles)
     */
    function drawSphere(geo: Geometry, pos: any, radius: any, color: any, sphereQuality?: any): void;
}
