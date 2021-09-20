"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLegacyHooks = exports.convertHookData = exports.collectLegacyHooks = exports.fromErrorHooks = exports.fromAfterHook = exports.fromBeforeHook = void 0;
const dependencies_1 = require("../dependencies");
const { each } = dependencies_1._;
function fromBeforeHook(hook) {
    return (context, next) => {
        context.type = 'before';
        return Promise.resolve(hook.call(context.self, context)).then(() => {
            context.type = null;
            return next();
        });
    };
}
exports.fromBeforeHook = fromBeforeHook;
function fromAfterHook(hook) {
    return (context, next) => {
        return next().then(() => {
            context.type = 'after';
            return hook.call(context.self, context);
        }).then(() => {
            context.type = null;
        });
    };
}
exports.fromAfterHook = fromAfterHook;
function fromErrorHooks(hooks) {
    return (context, next) => {
        return next().catch((error) => {
            let promise = Promise.resolve();
            context.original = { ...context };
            context.error = error;
            context.type = 'error';
            delete context.result;
            for (const hook of hooks) {
                promise = promise.then(() => hook.call(context.self, context));
            }
            return promise.then(() => {
                context.type = null;
                if (context.result === undefined) {
                    throw context.error;
                }
            });
        });
    };
}
exports.fromErrorHooks = fromErrorHooks;
function collectLegacyHooks(target, method) {
    const { before: { [method]: before = [] }, after: { [method]: after = [] }, error: { [method]: error = [] } } = target.__hooks;
    const beforeHooks = before;
    const afterHooks = [...after].reverse();
    const errorHook = fromErrorHooks(error);
    return [errorHook, ...beforeHooks, ...afterHooks];
}
exports.collectLegacyHooks = collectLegacyHooks;
// Converts different hook registration formats into the
// same internal format
function convertHookData(obj) {
    let hook = {};
    if (Array.isArray(obj)) {
        hook = { all: obj };
    }
    else if (typeof obj !== 'object') {
        hook = { all: [obj] };
    }
    else {
        each(obj, function (value, key) {
            hook[key] = !Array.isArray(value) ? [value] : value;
        });
    }
    return hook;
}
exports.convertHookData = convertHookData;
// Add `.hooks` functionality to an object
function enableLegacyHooks(obj, methods = ['find', 'get', 'create', 'update', 'patch', 'remove'], types = ['before', 'after', 'error']) {
    const hookData = {};
    types.forEach(type => {
        // Initialize properties where hook functions are stored
        hookData[type] = {};
    });
    // Add non-enumerable `__hooks` property to the object
    Object.defineProperty(obj, '__hooks', {
        configurable: true,
        value: hookData,
        writable: true
    });
    return function legacyHooks(allHooks) {
        each(allHooks, (current, type) => {
            if (!this.__hooks[type]) {
                throw new Error(`'${type}' is not a valid hook type`);
            }
            const hooks = convertHookData(current);
            each(hooks, (_value, method) => {
                if (method !== 'all' && methods.indexOf(method) === -1) {
                    throw new Error(`'${method}' is not a valid hook method`);
                }
            });
            methods.forEach(method => {
                let currentHooks = [...(hooks.all || []), ...(hooks[method] || [])];
                this.__hooks[type][method] = this.__hooks[type][method] || [];
                if (type === 'before') {
                    currentHooks = currentHooks.map(fromBeforeHook);
                }
                if (type === 'after') {
                    currentHooks = currentHooks.map(fromAfterHook);
                }
                this.__hooks[type][method].push(...currentHooks);
            });
        });
        return this;
    };
}
exports.enableLegacyHooks = enableLegacyHooks;
//# sourceMappingURL=legacy.js.map