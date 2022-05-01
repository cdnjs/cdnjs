"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feathers = void 0;
const version_1 = __importDefault(require("./version"));
const dependencies_1 = require("./dependencies");
const events_1 = require("./events");
const index_1 = require("./hooks/index");
const service_1 = require("./service");
const regular_1 = require("./hooks/regular");
const debug = (0, dependencies_1.createDebug)('@feathersjs/feathers');
class Feathers extends dependencies_1.EventEmitter {
    constructor() {
        super();
        this.services = {};
        this.settings = {};
        this.mixins = [index_1.hookMixin, events_1.eventMixin];
        this.version = version_1.default;
        this._isSetup = false;
        this.appHooks = {
            [dependencies_1.HOOKS]: [events_1.eventHook]
        };
        this.regularHooks = (0, regular_1.enableRegularHooks)(this);
        (0, dependencies_1.hooks)(this, {
            setup: (0, dependencies_1.middleware)().params('server').props({
                app: this
            }),
            teardown: (0, dependencies_1.middleware)().params('server').props({
                app: this
            })
        });
    }
    get(name) {
        return this.settings[name];
    }
    set(name, value) {
        this.settings[name] = value;
        return this;
    }
    configure(callback) {
        callback.call(this, this);
        return this;
    }
    defaultService(location) {
        throw new Error(`Can not find service '${location}'`);
    }
    service(location) {
        const path = ((0, dependencies_1.stripSlashes)(location) || '/');
        const current = this.services[path];
        if (typeof current === 'undefined') {
            this.use(path, this.defaultService(path));
            return this.service(path);
        }
        return current;
    }
    use(path, service, options) {
        if (typeof path !== 'string') {
            throw new Error(`'${path}' is not a valid service path.`);
        }
        const location = ((0, dependencies_1.stripSlashes)(path) || '/');
        const subApp = service;
        const isSubApp = typeof subApp.service === 'function' && subApp.services;
        if (isSubApp) {
            Object.keys(subApp.services).forEach(subPath => this.use(`${location}/${subPath}`, subApp.service(subPath)));
            return this;
        }
        const protoService = (0, service_1.wrapService)(location, service, options);
        const serviceOptions = (0, service_1.getServiceOptions)(protoService);
        for (const name of service_1.protectedMethods) {
            if (serviceOptions.methods.includes(name)) {
                throw new Error(`'${name}' on service '${location}' is not allowed as a custom method name`);
            }
        }
        debug(`Registering new service at \`${location}\``);
        // Add all the mixins
        this.mixins.forEach(fn => fn.call(this, protoService, location, serviceOptions));
        this.services[location] = protoService;
        // If we ran setup already, set this service up explicitly, this will not `await`
        if (this._isSetup && typeof protoService.setup === 'function') {
            debug(`Setting up service for \`${location}\``);
            protoService.setup(this, location);
        }
        return this;
    }
    hooks(hookMap) {
        const untypedMap = hookMap;
        if (untypedMap.before || untypedMap.after || untypedMap.error) {
            this.regularHooks(untypedMap);
        }
        else if (untypedMap.setup || untypedMap.teardown) {
            (0, dependencies_1.hooks)(this, untypedMap);
        }
        else if (Array.isArray(hookMap)) {
            this.appHooks[dependencies_1.HOOKS].push(...hookMap);
        }
        else {
            const methodHookMap = hookMap;
            Object.keys(methodHookMap).forEach(key => {
                const methodHooks = this.appHooks[key] || [];
                this.appHooks[key] = methodHooks.concat(methodHookMap[key]);
            });
        }
        return this;
    }
    setup() {
        this._isSetup = true;
        return Object.keys(this.services).reduce((current, path) => current
            .then(() => {
            const service = this.service(path);
            if (typeof service.setup === 'function') {
                debug(`Setting up service for \`${path}\``);
                return service.setup(this, path);
            }
        }), Promise.resolve()).then(() => this);
    }
    teardown() {
        this._isSetup = false;
        return Object.keys(this.services).reduce((current, path) => current
            .then(() => {
            const service = this.service(path);
            if (typeof service.teardown === 'function') {
                debug(`Tearing down service for \`${path}\``);
                return service.teardown(this, path);
            }
        }), Promise.resolve()).then(() => this);
    }
}
exports.Feathers = Feathers;
//# sourceMappingURL=application.js.map