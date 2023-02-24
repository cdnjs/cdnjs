"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookMixin = exports.FeathersHookManager = exports.createContext = exports.enableHooks = exports.collectHooks = exports.convertHookData = void 0;
const hooks_1 = require("@feathersjs/hooks");
const service_1 = require("./service");
const types = ['before', 'after', 'error', 'around'];
const isType = (value) => types.includes(value);
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
function collectHooks(target, method) {
    const { collected, collectedAll, around } = target.__hooks;
    return [
        ...(around.all || []),
        ...(around[method] || []),
        ...(collectedAll.before || []),
        ...(collected[method] || []),
        ...(collectedAll.after || [])
    ];
}
exports.collectHooks = collectHooks;
// Add `.hooks` functionality to an object
function enableHooks(object) {
    const store = {
        around: {},
        before: {},
        after: {},
        error: {},
        collected: {},
        collectedAll: {}
    };
    Object.defineProperty(object, '__hooks', {
        configurable: true,
        value: store,
        writable: true
    });
    return function registerHooks(input) {
        const store = this.__hooks;
        const map = Object.keys(input).reduce((map, type) => {
            if (!isType(type)) {
                throw new Error(`'${type}' is not a valid hook type`);
            }
            map[type] = convertHookData(input[type]);
            return map;
        }, {});
        const types = Object.keys(map);
        types.forEach((type) => Object.keys(map[type]).forEach((method) => {
            var _a;
            const mapHooks = map[type][method];
            const storeHooks = ((_a = store[type])[method] || (_a[method] = []));
            storeHooks.push(...mapHooks);
            if (method === 'all') {
                if (store.before[method] || store.error[method]) {
                    const beforeAll = (0, hooks_1.collect)({
                        before: store.before[method] || [],
                        error: store.error[method] || []
                    });
                    store.collectedAll.before = [beforeAll];
                }
                if (store.after[method]) {
                    const afterAll = (0, hooks_1.collect)({
                        after: store.after[method] || []
                    });
                    store.collectedAll.after = [afterAll];
                }
            }
            else {
                if (store.before[method] || store.after[method] || store.error[method]) {
                    const collected = (0, hooks_1.collect)({
                        before: store.before[method] || [],
                        after: store.after[method] || [],
                        error: store.error[method] || []
                    });
                    store.collected[method] = [collected];
                }
            }
        }));
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
            type: 'around',
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
    const registerHooks = enableHooks(service);
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