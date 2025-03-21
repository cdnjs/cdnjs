/**
 * Create a custom event for any purpose.
 *
 * @export
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 * @param {string} event  The name of the event
 * @param {?CustomEventInit} details  If passed, it must contain `detail` (event-dependent value associated with the event).
 * @returns {CustomEvent}
 */
export declare function addEvent(event: string, details?: CustomEventInit): CustomEvent;
/**
 * Media's default events.
 *
 * @type string[]
 * @default
 */
export declare const events: string[];
