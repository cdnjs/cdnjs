/** @class
 *  @subcategory  Math
 * */
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: any, y: any): this;
    subVectors(a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }): this;
    copy(v: {
        x: any;
        y: any;
    }): this;
    clone(): Vector2;
}
