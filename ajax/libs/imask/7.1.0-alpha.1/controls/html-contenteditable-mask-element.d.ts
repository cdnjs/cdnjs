import HTMLMaskElement from './html-mask-element';
export default class HTMLContenteditableMaskElement extends HTMLMaskElement {
    input: HTMLElement;
    /** Returns HTMLElement selection start */
    get _unsafeSelectionStart(): number | null;
    /** Returns HTMLElement selection end */
    get _unsafeSelectionEnd(): number | null;
    /** Sets HTMLElement selection */
    _unsafeSelect(start: number, end: number): void;
    /** HTMLElement value */
    get value(): string;
    set value(value: string);
}
//# sourceMappingURL=html-contenteditable-mask-element.d.ts.map