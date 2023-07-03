import MaskElement, { type ElementEvent } from './mask-element';
/** Bridge between HTMLElement and {@link Masked} */
export default abstract class HTMLMaskElement extends MaskElement {
    /** Mapping between HTMLElement events and mask internal events */
    static EVENTS_MAP: {
        readonly selectionChange: "keydown";
        readonly input: "input";
        readonly drop: "drop";
        readonly click: "click";
        readonly focus: "focus";
        readonly commit: "blur";
    };
    /** HTMLElement to use mask on */
    input: HTMLElement;
    _handlers: {
        [k: string]: EventListener;
    };
    abstract value: string;
    constructor(input: HTMLElement);
    get rootElement(): HTMLDocument;
    /**
      Is element in focus
    */
    get isActive(): boolean;
    /**
      Binds HTMLElement events to mask internal events
    */
    bindEvents(handlers: {
        [key in ElementEvent]: EventListener;
    }): void;
    /**
      Unbinds HTMLElement events to mask internal events
    */
    unbindEvents(): void;
    _toggleEventHandler(event: string, handler?: EventListener): void;
}
//# sourceMappingURL=html-mask-element.d.ts.map