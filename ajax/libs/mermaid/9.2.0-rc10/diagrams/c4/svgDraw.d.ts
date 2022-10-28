export function drawRect(elem: any, rectData: any): any;
export function drawImage(elem: any, width: any, height: any, x: any, y: any, link: any): void;
export function drawEmbeddedImage(elem: any, x: any, y: any, link: any): void;
export function drawText(elem: any, textData: any): any[];
export function drawLabel(elem: any, txtObject: any): any;
export function drawRels(elem: any, rels: any, conf: any): void;
export function drawC4Shape(elem: any, c4Shape: any, conf: any): any;
export function insertDatabaseIcon(elem: any): void;
export function insertComputerIcon(elem: any): void;
export function insertClockIcon(elem: any): void;
export function insertArrowHead(elem: any): void;
export function insertArrowEnd(elem: any): void;
export function insertArrowFilledHead(elem: any): void;
export function insertDynamicNumber(elem: any): void;
export function insertArrowCrossHead(elem: any): void;
export function getTextObj(): {
    x: number;
    y: number;
    fill: undefined;
    anchor: undefined;
    style: string;
    width: undefined;
    height: undefined;
    textMargin: number;
    rx: number;
    ry: number;
    tspan: boolean;
    valign: undefined;
};
export function getNoteRect(): {
    x: number;
    y: number;
    fill: string;
    stroke: string;
    width: number;
    anchor: string;
    height: number;
    rx: number;
    ry: number;
};
declare namespace _default {
    export { drawRect };
    export { drawText };
    export { drawLabel };
    export { drawBoundary };
    export { drawC4Shape };
    export { drawRels };
    export { drawImage };
    export { drawEmbeddedImage };
    export { insertArrowHead };
    export { insertArrowEnd };
    export { insertArrowFilledHead };
    export { insertDynamicNumber };
    export { insertArrowCrossHead };
    export { insertDatabaseIcon };
    export { insertComputerIcon };
    export { insertClockIcon };
    export { getTextObj };
    export { getNoteRect };
    export { sanitizeUrl };
}
export default _default;
/**
 * Draws an boundary in the diagram
 *
 * @param {any} elem - The diagram we'll draw to.
 * @param {any} boundary - The boundary to draw.
 * @param {any} conf - DrawText implementation discriminator object
 */
declare function drawBoundary(elem: any, boundary: any, conf: any): void;
import { sanitizeUrl } from "@braintree/sanitize-url";
