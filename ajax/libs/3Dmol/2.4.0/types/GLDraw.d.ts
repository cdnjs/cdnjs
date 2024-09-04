import { Geometry } from "./WebGL";
import { Color, Colored } from "colors";
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
export interface Point {
    x: number;
    y: number;
    z: number;
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
     * @param {Geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {number}
     *            radius
     * @param {Color}
     *            color
     * @param {CAP} fromCap - 0 for none, 1 for flat, 2 for round
     * @param {CAP} toCap = 0 for none, 1 for flat, 2 for round
     *
     * */
    function drawCylinder(geo: Geometry, from: any, to: any, radius: number, color: Color | Color[], fromCap?: CAP | string, toCap?: CAP | string): void;
    /** Create a cone
     * @memberof GLDraw
     * @param {Geometry}
     *            geo
     * @param {Point}
     *            from
     * @param {Point}
     *            to
     * @param {number}
     *            radius
     * @param {Color}
     *            color
     *            */
    function drawCone(geo: Geometry, from: any, to: any, radius: number, color?: Color): void;
    /** Create a sphere.
     * @memberof GLDraw
     * @param {Geometry}
     *            geo
     * @param {Point}
     *            pos
     * @param {number}
     *            radius
     * @param {Color}
     *            color
     * @param {number}
     *            sphereQuality - Quality of sphere (default 2, higher increases number of triangles)
     */
    function drawSphere(geo: Geometry, pos: any, radius: number, color: Colored, sphereQuality?: number): void;
}
