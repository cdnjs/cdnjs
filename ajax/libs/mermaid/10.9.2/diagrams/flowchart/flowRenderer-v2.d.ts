export function setConf(cnf: any): void;
export function addVertices(vert: any, g: any, svgId: any, root: any, doc: any, diagObj: any): Promise<void>;
export function addEdges(edges: object, g: object, diagObj: any): Promise<void>;
export function getClasses(text: any, diagObj: any): Record<string, import('../../diagram-api/types.js').DiagramStyleClassDef>;
export function draw(text: any, id: any, _version: any, diagObj: any): Promise<void>;
declare namespace _default {
    export { setConf };
    export { addVertices };
    export { addEdges };
    export { getClasses };
    export { draw };
}
export default _default;
