import { type Direction, type Selection } from './utils';
export type ActionDetailsOptions = Pick<ActionDetails, 'value' | 'cursorPos' | 'oldValue' | 'oldSelection'>;
/** Provides details of changing input */
export default class ActionDetails {
    /** Current input value */
    value: string;
    /** Current cursor position */
    cursorPos: number;
    /** Old input value */
    oldValue: string;
    /** Old selection */
    oldSelection: Selection;
    constructor(opts: ActionDetailsOptions);
    /** Start changing position */
    get startChangePos(): number;
    /** Inserted symbols count */
    get insertedCount(): number;
    /** Inserted symbols */
    get inserted(): string;
    /** Removed symbols count */
    get removedCount(): number;
    /** Removed symbols */
    get removed(): string;
    /** Unchanged head symbols */
    get head(): string;
    /** Unchanged tail symbols */
    get tail(): string;
    /** Remove direction */
    get removeDirection(): Direction;
}
//# sourceMappingURL=action-details.d.ts.map