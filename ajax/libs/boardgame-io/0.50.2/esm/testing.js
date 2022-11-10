import { R as RandomPlugin } from './plugin-random-087f861e.js';

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
const MockRandom = (overrides = {}) => {
    // Don’t include the original flush method, otherwise when the
    // built-in random plugin flushes, it won’t have access to the
    // state it needs.
    const { flush, ...rest } = RandomPlugin;
    return {
        ...rest,
        api: (context) => ({ ...RandomPlugin.api(context), ...overrides }),
    };
};

export { MockRandom };
