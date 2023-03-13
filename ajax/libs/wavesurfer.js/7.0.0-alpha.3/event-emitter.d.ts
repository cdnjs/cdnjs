export interface GeneralEventTypes {
    [eventType: string]: unknown;
}
declare class EventEmitter<EventTypes extends GeneralEventTypes> {
    private eventTarget;
    constructor();
    protected emit<T extends keyof EventTypes>(eventType: T, detail?: EventTypes[T]): void;
    /** Subscribe to an event and return a function to unsubscribe */
    on<T extends keyof EventTypes>(eventType: T, callback: (detail: EventTypes[T]) => void): () => void;
    /** Subscribe to an event once and return a function to unsubscribe */
    once<T extends keyof EventTypes>(eventType: T, callback: (detail: EventTypes[T]) => void): () => void;
}
export default EventEmitter;
