/**
 * dd-base-impl.ts 11.1.2
 * Copyright (c) 2021-2024  Alain Dumesny - see GridStack root license
 */
export type EventCallback = (event: Event) => boolean | void;
export declare abstract class DDBaseImplement {
    /** returns the enable state, but you have to call enable()/disable() to change (as other things need to happen) */
    get disabled(): boolean;
    on(event: string, callback: EventCallback): void;
    off(event: string): void;
    enable(): void;
    disable(): void;
    destroy(): void;
    triggerEvent(eventName: string, event: Event): boolean | void;
}
export interface HTMLElementExtendOpt<T> {
    el: HTMLElement;
    option: T;
    updateOption(T: any): DDBaseImplement;
}
