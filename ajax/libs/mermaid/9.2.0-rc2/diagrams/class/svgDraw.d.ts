export function drawEdge(elem: any, path: any, relation: any, conf: any, diagObj: any): void;
export function drawClass(elem: SVGSVGElement, classDef: any, conf: any, diagObj: any): {
    id: any;
    label: any;
    width: number;
    height: number;
};
export function parseMember(text: any): {
    displayText: string;
    cssStyle: string;
};
declare namespace _default {
    export { drawClass };
    export { drawEdge };
    export { parseMember };
}
export default _default;
