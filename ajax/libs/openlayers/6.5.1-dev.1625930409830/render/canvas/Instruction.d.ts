/**
 * @type {Array<Instruction>}
 */
export const fillInstruction: Array<Instruction>;
/**
 * @type {Array<Instruction>}
 */
export const strokeInstruction: Array<Instruction>;
/**
 * @type {Array<Instruction>}
 */
export const beginPathInstruction: Array<Instruction>;
/**
 * @type {Array<Instruction>}
 */
export const closePathInstruction: Array<Instruction>;
export default Instruction;
export type Instruction = number;
declare namespace Instruction {
    export const BEGIN_GEOMETRY: number;
    export const BEGIN_PATH: number;
    export const CIRCLE: number;
    export const CLOSE_PATH: number;
    export const CUSTOM: number;
    export const DRAW_CHARS: number;
    export const DRAW_IMAGE: number;
    export const END_GEOMETRY: number;
    export const FILL: number;
    export const MOVE_TO_LINE_TO: number;
    export const SET_FILL_STYLE: number;
    export const SET_STROKE_STYLE: number;
    export const STROKE: number;
}
//# sourceMappingURL=Instruction.d.ts.map