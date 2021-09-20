"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookMixin = exports.FeathersHookManager = exports.createContext = exports.fromErrorHooks = exports.fromBeforeHook = exports.fromAfterHook = void 0;
const dependencies_1 = require("../dependencies");
const service_1 = require("../service");
const legacy_1 = require("./legacy");
Object.defineProperty(exports, "fromAfterHook", { enumerable: true, get: function () { return legacy_1.fromAfterHook; } });
Object.defineProperty(exports, "fromBeforeHook", { enumerable: true, get: function () { return legacy_1.fromBeforeHook; } });
Object.defineProperty(exports, "fromErrorHooks", { enumerable: true, get: function () { return legacy_1.fromErrorHooks; } });
function createContext(service, method, data = {}) {
    const createContext = service[method].createContext;
    if (typeof createContext !== 'function') {
        throw new Error(`Can not create context for method ${method}`);
    }
    return createContext(data);
}
exports.createContext = createContext;
class FeathersHookManager extends dependencies_1.HookManager {
    constructor(app, method) {
        super();
        this.app = app;
        this.method = method;
        this._middleware = [];
    }
    collectMiddleware(self, args) {
        const app = this.app;
        const appHooks = app.appHooks[dependencies_1.HOOKS].concat(app.appHooks[this.method] || []);
        const legacyAppHooks = (0, legacy_1.collectLegacyHooks)(this.app, this.method);
        const middleware = super.collectMiddleware(self, args);
        const legacyHooks = (0, legacy_1.collectLegacyHooks)(self, this.method);
        return [...appHooks, ...legacyAppHooks, ...middleware, ...legacyHooks];
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
    const app = this;
    const serviceMethodHooks = (0, service_1.getHookMethods)(service, options).reduce((res, method) => {
        const params = service_1.defaultServiceArguments[method] || ['data', 'params'];
        res[method] = new FeathersHookManager(app, method)
            .params(...params)
            .props({
            app,
            path,
            method,
            service,
            event: null,
            type: null
        });
        return res;
    }, {});
    const handleLegacyHooks = (0, legacy_1.enableLegacyHooks)(service);
    (0, dependencies_1.hooks)(service, serviceMethodHooks);
    service.hooks = function (hookOptions) {
        if (hookOptions.before || hookOptions.after || hookOptions.error) {
            return handleLegacyHooks.call(this, hookOptions);
        }
        if (Array.isArray(hookOptions)) {
            return (0, dependencies_1.hooks)(this, hookOptions);
        }
        Object.keys(hookOptions).forEach(method => {
            const manager = (0, dependencies_1.getManager)(this[method]);
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
//# sourceMappingURL=index.js.map