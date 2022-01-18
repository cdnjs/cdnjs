import { Element } from "../types";
declare type calculateCursorStepsArgs = {
    el: Element;
    move: number | string;
    cursorPos: number;
    to: string;
};
declare const _default: ({ el, move, cursorPos, to, }: calculateCursorStepsArgs) => number;
export default _default;
