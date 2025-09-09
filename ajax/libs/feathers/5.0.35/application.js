"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feathers = void 0;
const version_1 = __importDefault(require("./version"));
const events_1 = require("events");
const commons_1 = require("@feathersjs/commons");
const hooks_1 = require("@feathersjs/hooks");
const events_2 = require("./events");
const hooks_2 = require("./hooks");
const service_1 = require("./service");
const hooks_3 = require("./hooks");
const debug = (0, commons_1.createDebug)('@feathersjs/feathers');
class Feathers extends events_1.EventEmitter {
    constructor() {
        super();
        this.services = {};
        this.settings = {};
        this.mixins = [hooks_2.hookMixin, events_2.eventMixin];
        this.version = version_1.default;
        this._isSetup = false;
        this.registerHooks = (0, hooks_3.enableHooks)(this);
        this.registerHooks({
            around: [events_2.eventHook]
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
        const path = ((0, commons_1.stripSlashes)(location) || '/');
        const current = this.services.hasOwnProperty(path) ? this.services[path] : undefined;
        if (typeof current === 'undefined') {
            this.use(path, this.defaultService(path));
            return this.service(path);
        }
        return current;
    }
    _setup() {
        this._isSetup = true;
        return Object.keys(this.services)
            .reduce((current, path) => current.then(() => {
            const service = this.service(path);
            if (typeof service.setup === 'function') {
                debug(`Setting up service for \`${path}\``);
                return service.setup(this, path);
            }
        }), Promise.resolve())
            .then(() => this);
    }
    get setup() {
        return this._setup;
    }
    set setup(value) {
        this._setup = value[hooks_1.HOOKS]
            ? value
            : (0, hooks_1.hooks)(value, (0, hooks_1.middleware)().params('server').props({
                app: this
            }));
    }
    _teardown() {
        this._isSetup = false;
        return Object.keys(this.services)
            .reduce((current, path) => current.then(() => {
            const service = this.service(path);
            if (typeof service.teardown === 'function') {
                debug(`Tearing down service for \`${path}\``);
                return service.teardown(this, path);
            }
        }), Promise.resolve())
            .then(() => this);
    }
    get teardown() {
        return this._teardown;
    }
    set teardown(value) {
        this._teardown = value[hooks_1.HOOKS]
            ? value
            : (0, hooks_1.hooks)(value, (0, hooks_1.middleware)().params('server').props({
                app: this
            }));
    }
    use(path, service, options) {
        if (typeof path !== 'string') {
            throw new Error(`'${path}' is not a valid service path.`);
        }
        const location = ((0, commons_1.stripSlashes)(path) || '/');
        const subApp = service;
        const isSubApp = typeof subApp.service === 'function' && subApp.services;
        if (isSubApp) {
            Object.keys(subApp.services).forEach((subPath) => this.use(`${location}/${subPath}`, subApp.service(subPath)));
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
        this.mixins.forEach((fn) => fn.call(this, protoService, location, serviceOptions));
        this.services[location] = protoService;
        // If we ran setup already, set this service up explicitly, this will not `await`
        if (this._isSetup && typeof protoService.setup === 'function') {
            debug(`Setting up service for \`${location}\``);
            protoService.setup(this, location);
        }
        return this;
    }
    async unuse(location) {
        const path = ((0, commons_1.stripSlashes)(location) || '/');
        const service = this.services[path];
        if (service && typeof service.teardown === 'function') {
            await service.teardown(this, path);
        }
        delete this.services[path];
        return service;
    }
    hooks(hookMap) {
        const untypedMap = hookMap;
        if (untypedMap.before || untypedMap.after || untypedMap.error || untypedMap.around) {
            // regular hooks for all service methods
            this.registerHooks(untypedMap);
        }
        else if (untypedMap.setup || untypedMap.teardown) {
            // .setup and .teardown application hooks
            (0, hooks_1.hooks)(this, untypedMap);
        }
        else {
            // Other registration formats are just `around` hooks
            this.registerHooks({
                around: untypedMap
            });
        }
        return this;
    }
}
exports.Feathers = Feathers;
//# sourceMappingURL=application.js.map