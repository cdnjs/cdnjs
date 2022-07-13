"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookMixin = exports.FeathersHookManager = exports.createContext = exports.enableHooks = exports.convertHookData = exports.collectHooks = void 0;
const hooks_1 = require("@feathersjs/hooks");
const service_1 = require("./service");
function collectHooks(target, method) {
    return target.__hooks.hooks[method] || [];
}
exports.collectHooks = collectHooks;
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
const types = ['before', 'after', 'error', 'around'];
const isType = (value) => types.includes(value);
const createMap = (input, methods) => {
    const map = {};
    Object.keys(input).forEach((type) => {
        if (!isType(type)) {
            throw new Error(`'${type}' is not a valid hook type`);
        }
        const data = convertHookData(input[type]);
        Object.keys(data).forEach((method) => {
            if (method !== 'all' && !methods.includes(method) && !service_1.defaultServiceMethods.includes(method)) {
                throw new Error(`'${method}' is not a valid hook method`);
            }
        });
        map[type] = data;
    });
    return map;
};
const updateStore = (store, map) => Object.keys(store.hooks).forEach((method) => {
    Object.keys(map).forEach((key) => {
        var _a;
        const type = key;
        const allHooks = map[type].all || [];
        const methodHooks = map[type][method] || [];
        if (allHooks.length || methodHooks.length) {
            const list = [...allHooks, ...methodHooks];
            const hooks = ((_a = store[type])[method] || (_a[method] = []));
            hooks.push(...list);
        }
    });
    const collected = (0, hooks_1.collect)({
        before: store.before[method] || [],
        after: store.after[method] || [],
        error: store.error[method] || []
    });
    store.hooks[method] = [...(store.around[method] || []), collected];
});
// Add `.hooks` functionality to an object
function enableHooks(object, methods = service_1.defaultServiceMethods) {
    const store = {
        around: {},
        before: {},
        after: {},
        error: {},
        hooks: {}
    };
    for (const method of methods) {
        store.hooks[method] = [];
    }
    Object.defineProperty(object, '__hooks', {
        configurable: true,
        value: store,
        writable: true
    });
    return function registerHooks(input) {
        const store = this.__hooks;
        const map = createMap(input, methods);
        updateStore(store, map);
        return this;
    };
}
exports.enableHooks = enableHooks;
function createContext(service, method, data = {}) {
    const createContext = service[method].createContext;
    if (typeof createContext !== 'function') {
        throw new Error(`Can not create context for method ${method}`);
    }
    return createContext(data);
}
exports.createContext = createContext;
class FeathersHookManager extends hooks_1.HookManager {
    constructor(app, method) {
        super();
        this.app = app;
        this.method = method;
        this._middleware = [];
    }
    collectMiddleware(self, args) {
        const appHooks = collectHooks(this.app, this.method);
        const middleware = super.collectMiddleware(self, args);
        const methodHooks = collectHooks(self, this.method);
        return [...appHooks, ...middleware, ...methodHooks];
    }
    initializeContext(self, args, context) {
        const ctx = super.initializeContext(self, args, context);
        ctx.params = ctx.params || {};
        return ctx;
    }
    middleware(mw) {
        this._middleware.push(...mw);
        return this;
    }
}
exports.FeathersHookManager = FeathersHookManager;
function hookMixin(service, path, options) {
    if (typeof service.hooks === 'function') {
        return service;
    }
    const hookMethods = (0, service_1.getHookMethods)(service, options);
    const serviceMethodHooks = hookMethods.reduce((res, method) => {
        const params = service_1.defaultServiceArguments[method] || ['data', 'params'];
        res[method] = new FeathersHookManager(this, method).params(...params).props({
            app: this,
            path,
            method,
            service,
            event: null,
            type: null,
            get statusCode() {
                var _a;
                return (_a = this.http) === null || _a === void 0 ? void 0 : _a.status;
            },
            set statusCode(value) {
                this.http = this.http || {};
                this.http.status = value;
            }
        });
        return res;
    }, {});
    const registerHooks = enableHooks(service, hookMethods);
    (0, hooks_1.hooks)(service, serviceMethodHooks);
    service.hooks = function (hookOptions) {
        if (hookOptions.before || hookOptions.after || hookOptions.error || hookOptions.around) {
            return registerHooks.call(this, hookOptions);
        }
        if (Array.isArray(hookOptions)) {
            return (0, hooks_1.hooks)(this, hookOptions);
        }
        Object.keys(hookOptions).forEach((method) => {
            const manager = (0, hooks_1.getManager)(this[method]);
            if (!(manager instanceof FeathersHookManager)) {
                throw new Error(`Method ${method} is not a Feathers hooks enabled service method`);
            }
            manager.middleware(hookOptions[method]);
        });
        return this;
    };
    return service;
}
exports.hookMixin = hookMixin;
//# sourceMappingURL=hooks.js.map