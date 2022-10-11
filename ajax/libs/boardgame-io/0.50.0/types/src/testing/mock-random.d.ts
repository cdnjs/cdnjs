import type { RandomAPI } from '../plugins/random/random';
import RandomPlugin from '../plugins/plugin-random';
/**
 * Test helper that creates a plugin to override the built-in random API.
 *
 * @param overrides - A map of method names to mock functions.
 *
 * @example
 * const game = {
 *   plugins: [
 *     MockRandom({ D6: () => 1 }),
 *   ],
 * };
 */
export declare const MockRandom: (overrides?: Partial<Record<"D4" | "D6" | "D10" | "D12" | "D20" | "Die" | "Number" | "Shuffle", (...args: any[]) => any>>) => Omit<typeof RandomPlugin, 'flush'>;
