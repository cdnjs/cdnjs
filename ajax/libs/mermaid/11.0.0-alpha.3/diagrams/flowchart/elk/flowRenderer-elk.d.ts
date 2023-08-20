export function setConf(cnf: any): void;
export function addVertices(vert: any, svgId: any, root: any, doc: any, diagObj: any, parentLookupDb: any, graph: any): Promise<any>;
export function addEdges(edges: object, diagObj: any, graph: any, svg: any): any;
export function getClasses(text: any, diagObj: any): object;
export function draw(text: any, id: any, _version: any, diagObj: any): Promise<void>;
declare namespace _default {
    export { getClasses };
    export { draw };
}
export default _default;
