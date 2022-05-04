"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableRegularHooks = exports.convertHookData = exports.collectRegularHooks = exports.fromErrorHooks = exports.fromAfterHooks = exports.fromBeforeHooks = exports.fromErrorHook = exports.fromAfterHook = exports.fromBeforeHook = void 0;
const service_1 = require("../service");
const runHook = (hook, context, type) => {
    if (type)
        context.type = type;
    return Promise.resolve(hook.call(context.self, context))
        .then((res) => {
        if (type)
            context.type = null;
        if (res && res !== context) {
            Object.assign(context, res);
        }
    });
};
function fromBeforeHook(hook) {
    return (context, next) => {
        return runHook(hook, context, 'before').then(next);
    };
}
exports.fromBeforeHook = fromBeforeHook;
function fromAfterHook(hook) {
    return (context, next) => {
        return next().then(() => runHook(hook, context, 'after'));
    };
}
exports.fromAfterHook = fromAfterHook;
function fromErrorHook(hook) {
    return (context, next) => {
        return next().catch((error) => {
            if (context.error !== error || context.result !== undefined) {
                context.original = { ...context };
                context.error = error;
                delete context.result;
            }
            return runHook(hook, context, 'error').then(() => {
                if (context.result === undefined && context.error !== undefined) {
                    throw context.error;
                }
            });
        });
    };
}
exports.fromErrorHook = fromErrorHook;
const RunHooks = (hooks) => (context) => {
    return hooks.reduce((promise, hook) => {
        return promise.then(() => runHook(hook, context));
    }, Promise.resolve(undefined));
};
function fromBeforeHooks(hooks) {
    return fromBeforeHook(RunHooks(hooks));
}
exports.fromBeforeHooks = fromBeforeHooks;
function fromAfterHooks(hooks) {
    return fromAfterHook(RunHooks(hooks));
}
exports.fromAfterHooks = fromAfterHooks;
function fromErrorHooks(hooks) {
    return fromErrorHook(RunHooks(hooks));
}
exports.fromErrorHooks = fromErrorHooks;
function collectRegularHooks(target, method) {
    return target.__hooks.hooks[method] || [];
}
exports.collectRegularHooks = collectRegularHooks;
// Converts different hook registration formats into the
// same internal format
function convertHookData(input) {
    const result = {};
    if (Array.isArray(input)) {
        result.all = input;
    }
    else if (typeof input !== 'object') {
        result.all = [input];
    }
    else {
        for (const key of Object.keys(input)) {
            const value = input[key];
            result[key] = Array.isArray(value) ? value : [value];
        }
    }
    return result;
}
exports.convertHookData = convertHookData;
const types = ['before', 'after', 'error'];
const isType = (value) => types.includes(value);
const wrappers = {
    before: fromBeforeHooks,
    after: fromAfterHooks,
    error: fromErrorHooks
};
const createStore = (methods) => {
    const store = {
        before: {},
        after: {},
        error: {},
        hooks: {}
    };
    for (const method of methods) {
        store.hooks[method] = [];
    }
    return store;
};
const setStore = (object, store) => {
    Object.defineProperty(object, '__hooks', {
        configurable: true,
        value: store,
        writable: true
    });
};
const getStore = (object) => object.__hooks;
const createMap = (input, methods) => {
    const map = {};
    Object.keys(input).forEach((type) => {
        if (!isType(type)) {
            throw new Error(`'${type}' is not a valid hook type`);
        }
        const data = convertHookData(input[type]);
        Object.keys(data).forEach((method) => {
            if (method !== 'all' && !methods.includes(method)) {
                throw new Error(`'${method}' is not a valid hook method`);
            }
        });
        map[type] = data;
    });
    return map;
};
const createAdapter = (type) => {
    const hooks = [];
    const hook = wrappers[type](hooks);
    const adapter = Object.assign(hook, { hooks });
    return adapter;
};
const updateStore = (store, map) => {
    Object.keys(store.hooks).forEach((method) => {
        let adapted = false;
        Object.keys(map).forEach((key) => {
            var _a;
            const type = key;
            const allHooks = map[type].all || [];
            const methodHooks = map[type][method] || [];
            if (allHooks.length || methodHooks.length) {
                const adapter = (_a = store[type])[method] || (_a[method] = (adapted = true, createAdapter(type)));
                adapter.hooks.push(...allHooks, ...methodHooks);
            }
        });
        if (adapted) {
            store.hooks[method] = [
                store.error[method],
                store.before[method],
                store.after[method]
            ].filter(hook => hook);
        }
    });
};
// Add `.hooks` functionality to an object
function enableRegularHooks(object, methods = service_1.defaultServiceMethods) {
    const store = createStore(methods);
    setStore(object, store);
    return function regularHooks(input) {
        const store = getStore(this);
        const map = createMap(input, methods);
        updateStore(store, map);
        return this;
    };
}
exports.enableRegularHooks = enableRegularHooks;
//# sourceMappingURL=regular.js.map