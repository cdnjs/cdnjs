export type ElementEvent = 'selectionChange' | 'input' | 'drop' | 'click' | 'focus' | 'commit';
/**  Generic element API to use with mask */
export default abstract class MaskElement {
    /** */
    abstract _unsafeSelectionStart: number | null;
    /** */
    abstract _unsafeSelectionEnd: number | null;
    /** */
    abstract value: string;
    /** Safely returns selection start */
    get selectionStart(): number;
    /** Safely returns selection end */
    get selectionEnd(): number;
    /** Safely sets element selection */
    select(start: number, end: number): void;
    /** */
    get isActive(): boolean;
    /** */
    abstract _unsafeSelect(start: number, end: number): void;
    /** */
    abstract bindEvents(handlers: {
        [key in ElementEvent]: Function;
    }): void;
    /** */
    abstract unbindEvents(): void;
}
//# sourceMappingURL=mask-element.d.ts.map