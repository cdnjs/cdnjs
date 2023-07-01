export type ElementEvent = 'selectionChange' | 'input' | 'drop' | 'click' | 'focus' | 'commit';
/**
  Generic element API to use with mask
  @interface
*/
export default class MaskElement {
    /** */
    readonly _unsafeSelectionStart: number;
    /** */
    readonly _unsafeSelectionEnd: number;
    /** */
    value: string;
    /** Safely returns selection start */
    get selectionStart(): number;
    /** Safely returns selection end */
    get selectionEnd(): number;
    /** Safely sets element selection */
    select(start: number, end: number): void;
    /** Should be overriden in subclasses */
    _unsafeSelect(start: number, end: number): void;
    /** Should be overriden in subclasses */
    get isActive(): boolean;
    /** Should be overriden in subclasses */
    bindEvents(handlers: {
        [key in ElementEvent]: Function;
    }): void;
    /** Should be overriden in subclasses */
    unbindEvents(): void;
}
//# sourceMappingURL=mask-element.d.ts.map