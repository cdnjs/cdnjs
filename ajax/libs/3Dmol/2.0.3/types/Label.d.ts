import { Vector2 } from "./WebGL";
import { ColorSpec } from "./colors";
import { XYZ } from "./WebGL/math";
export declare let LabelCount: number;
/** Label style specification */
export interface LabelSpec {
    /** font name, default sans-serif */
    font?: string;
    /** height of text, default 18 */
    fontSize?: number;
    /** font color, default white */
    fontColor?: ColorSpec;
    /** font opacity, default 1 */
    fontOpacity?: number;
    /** line width of border around label, default 0  */
    borderThickness?: number;
    /** color of border, default backgroundColor */
    borderColor?: ColorSpec;
    /** opacity of border */
    borderOpacity?: number;
    /** color of background, default black */
    backgroundColor?: ColorSpec;
    /** opacity of background, default 1.0 */
    backgroundOpacity?: number;
    /** coordinates for label */
    position?: XYZ;
    /** x,y pixel offset of label from position */
    screenOffset?: Vector2;
    /** always put labels in front of model */
    inFront?: boolean;
    /** show background rounded rectangle, default true */
    showBackground?: boolean;
    /** position is in screen (not model) coordinates which are pixel offsets from the upper left corner */
    useScreen?: boolean;
    /** An elment to draw into the label. Any CanvasImageSource is allowed.  Label is resized to size of image */
    backgroundImage?: any;
    /** how to orient the label w/respect to position: "topLeft" (default),
     * "topCenter", "topRight", "centerLeft", "center", "centerRight",
     * "bottomLeft", "bottomCenter", "bottomRight", or an arbitrary offset */
    alignment?: string | Vector2;
    /** if set, only display in this frame of an animation */
    frame?: number;
}
/**
 * Renderable labels
 * @constructor $3Dmol.Label
 * @param {string} tag - Label text
 * @param {LabelSpec} parameters Label style and font specifications
 */
export declare class Label {
    id: number;
    stylespec: any;
    canvas: HTMLCanvasElement;
    context: any;
    sprite: any;
    text: any;
    frame: any;
    constructor(text: any, parameters: any);
    getStyle(): any;
    setContext(): void;
    dispose(): void;
}
