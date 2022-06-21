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
        (0, hooks_1.hooks)(this, {
            setup: (0, hooks_1.middleware)().params('server').props({
                app: this
            }),
            teardown: (0, hooks_1.middleware)().params('server').props({
                app: this
            })
        });
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
    setup() {
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
    teardown() {
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
}
exports.Feathers = Feathers;
//# sourceMappingURL=application.js.map