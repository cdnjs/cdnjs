/**
 * Event type
 */
export declare type EventType = string | symbol;
/**
 * Event handler
 */
export declare type EventHandler<T = unknown> = (payload?: T) => void;
/**
 * Wildcard event handler
 */
export declare type WildcardEventHandler<T = Record<string, unknown>> = (event: keyof T, payload?: T[keyof T]) => void;
/**
 * Event handler list
 */
export declare type EventHandlerList<T = unknown> = Array<EventHandler<T>>;
/**
 * Wildcard event handler list
 */
export declare type WildcardEventHandlerList<T = Record<string, unknown>> = Array<WildcardEventHandler<T>>;
/**
 * Event handler map
 */
export declare type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<keyof Events | '*', EventHandlerList<Events[keyof Events]> | WildcardEventHandlerList<Events>>;
/**
 * Event emitter interface
 */
export interface Emittable<Events extends Record<EventType, unknown> = {}> {
    /**
     * A map of event names of registered event handlers
     */
    events: EventHandlerMap<Events>;
    /**
     * Register an event handler with the event type
     *
     * @param event - An {@link EventType}
     * @param handler - An {@link EventHandler}, or a {@link WildcardEventHandler} if you are specified "*"
     */
    on<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    /**
     * Unregister an event handler for the event type
     *
     * @param event - An {@link EventType}
     * @param handler - An {@link EventHandler}, or a {@link WildcardEventHandler} if you are specified "*"
     */
    off<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    /**
     * Invoke all handlers with the event type
     *
     * @remarks
     * Note Manually firing "*" handlers should be not supported
     *
     * @param event - An {@link EventType}
     * @param payload - An event payload, optional
     */
    emit<Key extends keyof Events>(event: Key, payload?: Events[keyof Events]): void;
}
//# sourceMappingURL=emittable.d.ts.map