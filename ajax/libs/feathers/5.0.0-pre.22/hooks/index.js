"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookMixin = exports.FeathersHookManager = exports.createContext = exports.fromErrorHooks = exports.fromErrorHook = exports.fromAfterHooks = exports.fromAfterHook = exports.fromBeforeHooks = exports.fromBeforeHook = void 0;
const dependencies_1 = require("../dependencies");
const service_1 = require("../service");
const regular_1 = require("./regular");
var regular_2 = require("./regular");
Object.defineProperty(exports, "fromBeforeHook", { enumerable: true, get: function () { return regular_2.fromBeforeHook; } });
Object.defineProperty(exports, "fromBeforeHooks", { enumerable: true, get: function () { return regular_2.fromBeforeHooks; } });
Object.defineProperty(exports, "fromAfterHook", { enumerable: true, get: function () { return regular_2.fromAfterHook; } });
Object.defineProperty(exports, "fromAfterHooks", { enumerable: true, get: function () { return regular_2.fromAfterHooks; } });
Object.defineProperty(exports, "fromErrorHook", { enumerable: true, get: function () { return regular_2.fromErrorHook; } });
Object.defineProperty(exports, "fromErrorHooks", { enumerable: true, get: function () { return regular_2.fromErrorHooks; } });
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
        const regularAppHooks = (0, regular_1.collectRegularHooks)(this.app, this.method);
        const middleware = super.collectMiddleware(self, args);
        const regularHooks = (0, regular_1.collectRegularHooks)(self, this.method);
        return [...appHooks, ...regularAppHooks, ...middleware, ...regularHooks];
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
    const hookMethods = (0, service_1.getHookMethods)(service, options);
    const serviceMethodHooks = hookMethods.reduce((res, method) => {
        const params = service_1.defaultServiceArguments[method] || ['data', 'params'];
        res[method] = new FeathersHookManager(app, method)
            .params(...params)
            .props({
            app,
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
                (this.http || (this.http = {})).status = value;
            }
        });
        return res;
    }, {});
    const handleRegularHooks = (0, regular_1.enableRegularHooks)(service, hookMethods);
    (0, dependencies_1.hooks)(service, serviceMethodHooks);
    service.hooks = function (hookOptions) {
        if (hookOptions.before || hookOptions.after || hookOptions.error) {
            return handleRegularHooks.call(this, hookOptions);
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