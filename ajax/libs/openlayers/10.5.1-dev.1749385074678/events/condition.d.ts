/**
 * A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * `{boolean}`. If the condition is met, true should be returned.
 *
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default): boolean} Condition
 */
/**
 * Creates a condition function that passes when all provided conditions pass.
 * @param {...Condition} var_args Conditions to check.
 * @return {Condition} Condition function.
 */
export function all(...args: Condition[]): Condition;
export function altKeyOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function altShiftKeysOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function focus(event: import("../MapBrowserEvent.js").default): boolean;
export function focusWithTabindex(event: import("../MapBrowserEvent.js").default): boolean;
/**
 * Return always true.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True.
 * @api
 */
export const always: typeof TRUE;
export function click(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function mouseActionButton(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
/**
 * Return always false.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} False.
 * @api
 */
export const never: typeof FALSE;
export function pointerMove(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function singleClick(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function doubleClick(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function noModifierKeys(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function platformModifierKeyOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function platformModifierKey(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function shiftKeyOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function targetNotEditable(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function mouseOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function touchOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function penOnly(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
export function primaryAction(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
/**
 * A function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * `{boolean}`. If the condition is met, true should be returned.
 */
export type Condition = (this: unknown, arg1: import("../MapBrowserEvent.js").default) => boolean;
import { TRUE } from '../functions.js';
import { FALSE } from '../functions.js';
//# sourceMappingURL=condition.d.ts.map