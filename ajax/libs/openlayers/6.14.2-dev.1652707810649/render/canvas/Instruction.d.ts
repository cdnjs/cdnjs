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
type Instruction = number;
declare namespace Instruction {
    const BEGIN_GEOMETRY: number;
    const BEGIN_PATH: number;
    const CIRCLE: number;
    const CLOSE_PATH: number;
    const CUSTOM: number;
    const DRAW_CHARS: number;
    const DRAW_IMAGE: number;
    const END_GEOMETRY: number;
    const FILL: number;
    const MOVE_TO_LINE_TO: number;
    const SET_FILL_STYLE: number;
    const SET_STROKE_STYLE: number;
    const STROKE: number;
}
//# sourceMappingURL=Instruction.d.ts.map