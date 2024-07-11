export type DebuggingError = Error;
/**
 * @typedef {Error} DebuggingError
 */
/**
 *
 * @param {string} type
 * @param {DebuggingError|null} [debug]
 * @param {EventInit} [evInit]
 * @returns {Event & {
 *   __legacyOutputDidListenersThrowError?: boolean
 * }}
 */
export function createEvent(type: string, debug?: Error | null | undefined, evInit?: EventInit | undefined): Event & {
    __legacyOutputDidListenersThrowError?: boolean;
};
import { ShimEvent } from 'eventtargeter';
import { ShimCustomEvent } from 'eventtargeter';
import { ShimEventTarget } from 'eventtargeter';
export { ShimEvent, ShimCustomEvent, ShimEventTarget };
//# sourceMappingURL=Event.d.ts.map