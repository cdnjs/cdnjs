/*! shepherd.js 12.0.0-alpha.9 */

'use strict';

var utils_typeCheck = require('./utils/type-check.js');

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
        if (utils_typeCheck.isUndefined(this.bindings)) {
            this.bindings = {};
        }
        if (utils_typeCheck.isUndefined(this.bindings[event])) {
            this.bindings[event] = [];
        }
        this.bindings[event]?.push({ handler, ctx, once });
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
        if (utils_typeCheck.isUndefined(this.bindings) || utils_typeCheck.isUndefined(this.bindings[event])) {
            return this;
        }
        if (utils_typeCheck.isUndefined(handler)) {
            delete this.bindings[event];
        }
        else {
            this.bindings[event]?.forEach((binding, index) => {
                if (binding.handler === handler) {
                    this.bindings[event]?.splice(index, 1);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger(event, ...args) {
        if (!utils_typeCheck.isUndefined(this.bindings) && this.bindings[event]) {
            this.bindings[event]?.forEach((binding, index) => {
                const { ctx, handler, once } = binding;
                const context = ctx || this;
                handler.apply(context, args);
                if (once) {
                    this.bindings[event]?.splice(index, 1);
                }
            });
        }
        return this;
    }
}

exports.Evented = Evented;
//# sourceMappingURL=evented.js.map
