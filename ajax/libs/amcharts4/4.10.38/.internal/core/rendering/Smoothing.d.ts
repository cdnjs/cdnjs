import { IPoint } from "../defs/IPoint";
/**
 * ============================================================================
 * PATH FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export interface ISmoothing {
    smooth(points: Array<IPoint>): string;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class Tension implements ISmoothing {
    /**
     * [_tensionX description]
     *
     * @todo Description
     */
    private _tensionX;
    /**
     * [_tensionY description]
     *
     * @todo Description
     */
    private _tensionY;
    /**
     * Constructor.
     *
     * @param tensionX [description]
     * @param tensionY [description]
     */
    constructor(tensionX: number, tensionY: number);
    /**
     * [smooth description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param points  [description]
     * @return [description]
     */
    smooth(points: Array<IPoint>): string;
}
/**
 * Returns a waved line SVG path between two points.
 *
 * @ignore Exclude from docs
 * @param point1            Starting point
 * @param point2            Ending point
 * @param waveLength        Wave length
 * @param waveHeight        Wave height
 * @param adjustWaveLength  Adjust wave length based on the actual line length
 * @return SVG path
 */
export declare function wavedLine(point1: IPoint, point2: IPoint, waveLength: number, waveHeight: number, tension: number, adjustWaveLength?: boolean): string;
export declare class Monotone implements ISmoothing {
    private _reversed;
    private _closed;
    constructor(reversed: boolean, info: {
        closed: boolean;
    });
    private _curve;
    smooth(points: Array<IPoint>): string;
}
export declare class MonotoneX extends Monotone {
    constructor(info: {
        closed: boolean;
    });
}
export declare class MonotoneY extends Monotone {
    constructor(info: {
        closed: boolean;
    });
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class Basis implements ISmoothing {
    /**
     * [_closed description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    private _closed;
    /**
     * Constructor.
     *
     * @param info  [description]
     */
    constructor(info: {
        closed: boolean;
    });
    /**
     * [smooth description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param points  [description]
     * @return [description]
     */
    smooth(points: Array<IPoint>): string;
}
