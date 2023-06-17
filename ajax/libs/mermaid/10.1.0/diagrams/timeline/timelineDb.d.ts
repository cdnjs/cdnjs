export function getCommonDb(): typeof commonDb;
export function parseDirective(statement: any, context: any, type: any): void;
export function clear(): void;
export function addSection(txt: any): void;
export function getSections(): any[];
export function getTasks(): any[];
export function addTask(period: any, length: any, event: any): void;
export function addEvent(event: any): void;
export function addTaskOrg(descr: any): void;
declare namespace _default {
    export { clear };
    export { getCommonDb };
    export { addSection };
    export { getSections };
    export { getTasks };
    export { addTask };
    export { addTaskOrg };
    export { addEvent };
    export { parseDirective };
}
export default _default;
import * as commonDb from "../../commonDb";
