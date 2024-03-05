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
    let BEGIN_GEOMETRY: number;
    let BEGIN_PATH: number;
    let CIRCLE: number;
    let CLOSE_PATH: number;
    let CUSTOM: number;
    let DRAW_CHARS: number;
    let DRAW_IMAGE: number;
    let END_GEOMETRY: number;
    let FILL: number;
    let MOVE_TO_LINE_TO: number;
    let SET_FILL_STYLE: number;
    let SET_STROKE_STYLE: number;
    let STROKE: number;
}
//# sourceMappingURL=Instruction.d.ts.map