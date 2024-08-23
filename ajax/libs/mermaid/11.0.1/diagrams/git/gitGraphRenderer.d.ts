export function draw(txt: any, id: any, ver: any, diagObj: any): void;
declare namespace _default {
    export { draw };
}
export default _default;
export type CommitMap = Map<string, {
    id: string;
    message: string;
    seq: number;
    type: number;
    tag: string;
    parents: string[];
    branch: string;
}>;
