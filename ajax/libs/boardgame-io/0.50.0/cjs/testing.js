'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluginRandom = require('./plugin-random-7425844d.js');

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
    const { flush, ...rest } = pluginRandom.RandomPlugin;
    return {
        ...rest,
        api: (context) => ({ ...pluginRandom.RandomPlugin.api(context), ...overrides }),
    };
};

exports.MockRandom = MockRandom;
