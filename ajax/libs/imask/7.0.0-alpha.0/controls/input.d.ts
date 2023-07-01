import { type Selection } from '../core/utils';
import { type FactoryArg, type FactoryReturnMasked } from '../masked/factory';
import MaskElement from './mask-element';
import { type InputElement } from './html-input-mask-element';
export type InputMaskElement = MaskElement | InputElement | HTMLElement;
/** Listens to element events and controls changes between element and {@link Masked} */
export default class InputMask<Opts extends FactoryArg> {
    /**
      View element
    */
    el: MaskElement;
    /** Internal {@link Masked} model */
    masked: FactoryReturnMasked<Opts>;
    _listeners: Record<string, Array<EventListener>>;
    _value: string;
    _changingCursorPos: number;
    _unmaskedValue: string;
    _selection: Selection;
    _cursorChanging?: ReturnType<typeof setTimeout>;
    _inputEvent?: InputEvent;
    constructor(el: InputMaskElement, opts: Opts);
    /** Read or update mask */
    get mask(): Opts['mask'];
    maskEquals(mask: Opts['mask']): boolean;
    set mask(mask: Opts['mask']);
    /** Raw value */
    get value(): string;
    set value(str: string);
    /** Unmasked value */
    get unmaskedValue(): string;
    set unmaskedValue(str: string);
    /** Typed unmasked value */
    get typedValue(): FactoryReturnMasked<Opts>['typedValue'];
    set typedValue(val: FactoryReturnMasked<Opts>['typedValue']);
    /** Display value */
    get displayValue(): string;
    /** Starts listening to element events */
    _bindEvents(): void;
    /** Stops listening to element events */
    _unbindEvents(): void;
    /** Fires custom event */
    _fireEvent(ev: string, e: InputEvent): void;
    /** Current selection start */
    get selectionStart(): number;
    /** Current cursor position */
    get cursorPos(): number;
    set cursorPos(pos: number);
    /** Stores current selection */
    _saveSelection(): void;
    /** Syncronizes model value from view */
    updateValue(): void;
    /** Syncronizes view from model value, fires change events */
    updateControl(): void;
    /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */
    updateOptions(opts: Partial<Opts>): void;
    /** Updates cursor */
    updateCursor(cursorPos: number): void;
    /** Delays cursor update to support mobile browsers */
    _delayUpdateCursor(cursorPos: number): void;
    /** Fires custom events */
    _fireChangeEvents(): void;
    /** Aborts delayed cursor update */
    _abortUpdateCursor(): void;
    /** Aligns cursor to nearest available position */
    alignCursor(): void;
    /** Aligns cursor only if selection is empty */
    alignCursorFriendly(): void;
    /** Adds listener on custom event */
    on(ev: string, handler: EventListener): this;
    /** Removes custom event listener */
    off(ev: string, handler: EventListener): this;
    /** Handles view input event */
    _onInput(e: InputEvent): void;
    /** Handles view change event and commits model value */
    _onChange(): void;
    /** Handles view drop event, prevents by default */
    _onDrop(ev: Event): void;
    /** Restore last selection on focus */
    _onFocus(ev: Event): void;
    /** Restore last selection on focus */
    _onClick(ev: Event): void;
    /** Unbind view events and removes element reference */
    destroy(): void;
}
//# sourceMappingURL=input.d.ts.map