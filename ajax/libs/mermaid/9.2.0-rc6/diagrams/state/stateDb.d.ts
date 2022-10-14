export function parseDirective(statement: any, context: any, type: any): void;
export function addState(id: any, type: any, doc: any, descr: any, note: any): void;
export function clear(saveCommon: any): void;
export function getState(id: any): any;
export function getStates(): {};
export function logDocuments(): void;
export function getRelations(): never[];
export function addRelation(_id1: any, _id2: any, title: any): void;
export function cleanupLabel(label: any): any;
export namespace lineType {
    const LINE: number;
    const DOTTED_LINE: number;
}
export namespace relationType {
    const AGGREGATION: number;
    const EXTENSION: number;
    const COMPOSITION: number;
    const DEPENDENCY: number;
}
declare namespace _default {
    export { parseDirective };
    export function getConfig(): import("../../config.type").StateDiagramConfig | undefined;
    export { addState };
    export { clear };
    export { getState };
    export { getStates };
    export { getRelations };
    export { getClasses };
    export { getDirection };
    export { addRelation };
    export { getDividerId };
    export { setDirection };
    export { cleanupLabel };
    export { lineType };
    export { relationType };
    export { logDocuments };
    export { getRootDoc };
    export { setRootDoc };
    export { getRootDocV2 };
    export { extract };
    export { trimColon };
    export { getAccTitle };
    export { setAccTitle };
    export { getAccDescription };
    export { setAccDescription };
}
export default _default;
declare function getClasses(): any[];
declare function getDirection(): string;
declare function getDividerId(): string;
declare function setDirection(dir: any): void;
declare function getRootDoc(): any[];
declare function setRootDoc(o: any): void;
declare function getRootDocV2(): {
    id: string;
    doc: any[];
};
declare function extract(_doc: any): void;
declare function trimColon(str: any): any;
import { getAccTitle } from "../../commonDb";
import { setAccTitle } from "../../commonDb";
import { getAccDescription } from "../../commonDb";
import { setAccDescription } from "../../commonDb";
