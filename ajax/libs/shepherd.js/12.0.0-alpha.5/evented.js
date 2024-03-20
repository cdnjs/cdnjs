/*! shepherd.js 12.0.0-alpha.5 */

import { isUndefined } from './utils/type-check.js';

// @ts-nocheck
class Evented {
    /**
     * Adds an event listener for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @param ctx
     * @param {boolean} once
     * @returns
     */
    on(event, handler, ctx, once = false) {
        if (isUndefined(this.bindings)) {
            this.bindings = {};
        }
        if (isUndefined(this.bindings[event])) {
            this.bindings[event] = [];
        }
        this.bindings[event].push({ handler, ctx, once });
        return this;
    }
    /**
     * Adds an event listener that only fires once for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @param ctx
     * @returns
     */
    once(event, handler, ctx) {
        return this.on(event, handler, ctx, true);
    }
    /**
     * Removes an event listener for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @returns
     */
    off(event, handler) {
        if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
            return this;
        }
        if (isUndefined(handler)) {
            delete this.bindings[event];
        }
        else {
            this.bindings[event].forEach((binding, index) => {
                if (binding.handler === handler) {
                    this.bindings[event].splice(index, 1);
                }
            });
        }
        return this;
    }
    /**
     * Triggers an event listener for the given event string.
     *
     * @param {string} event
     * @returns
     */
    trigger(event, ...args) {
        if (!isUndefined(this.bindings) && this.bindings[event]) {
            this.bindings[event].forEach((binding, index) => {
                const { ctx, handler, once } = binding;
                const context = ctx || this;
                handler.apply(context, args);
                if (once) {
                    this.bindings[event].splice(index, 1);
                }
            });
        }
        return this;
    }
}

export { Evented };
//# sourceMappingURL=evented.js.map
