/**
 * Event emitter, forked from the below:
 * - original repository url: https://github.com/developit/mitt
 * - code url: https://github.com/developit/mitt/blob/master/src/index.ts
 * - author: Jason Miller (https://github.com/developit)
 * - license: MIT
 */
import type { EventType, Emittable } from './emittable';
/**
 * Create a event emitter
 *
 * @returns An event emitter
 */
export declare function createEmitter<Events extends Record<EventType, unknown>>(): Emittable<Events>;
//# sourceMappingURL=emitter.d.ts.map