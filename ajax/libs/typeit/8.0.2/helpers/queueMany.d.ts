import { QueueItem } from "../types";
declare const _default: <ArrayType>(arrayTemplate: ArrayType[], actionToQueue: Function, metaObject?: {}, shouldBookEnd?: boolean) => QueueItem[];
/**
 * Create several queue items containing a specific action. If an array is passed,
 * each item in that array will be used as the argument for the action. If a number
 * is passed, the action will be copied that many times with no argument.
 */
export default _default;
