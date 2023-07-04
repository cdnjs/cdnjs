export function drawRect(elem: any, rectData: any): any;
export function drawFace(element: any, faceData: any): any;
export function drawCircle(element: any, circleData: any): any;
export function drawText(elem: any, textData: any): any;
export function drawLabel(elem: any, txtObject: any): void;
export function drawSection(elem: any, section: any, conf: any): void;
export function drawTask(elem: any, task: any, conf: any): void;
export function drawBackgroundRect(elem: any, bounds: any): void;
declare namespace _default {
    export { drawRect };
    export { drawCircle };
    export { drawSection };
    export { drawText };
    export { drawLabel };
    export { drawTask };
    export { drawBackgroundRect };
    export { initGraphics };
}
export default _default;
declare function initGraphics(graphics: any): void;
