import { Character } from "../types";
declare type ProcessResult = {
    isString: boolean;
    numberOfSteps: number;
    canKeepMoving: boolean;
};
declare const _default: (movementArg: number | string, currentCursorPosition: number, allChars: Character[]) => ProcessResult;
export default _default;
