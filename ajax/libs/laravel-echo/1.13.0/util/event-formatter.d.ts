/**
 * Event name formatter
 */
export declare class EventFormatter {
    /**
     * Event namespace.
     */
    namespace: string | boolean;
    /**
     * Create a new class instance.
     */
    constructor(namespace: string | boolean);
    /**
     * Format the given event name.
     */
    format(event: string): string;
    /**
     * Set the event namespace.
     */
    setNamespace(value: string | boolean): void;
}
