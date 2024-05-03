"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapService = exports.normalizeServiceOptions = exports.getServiceOptions = exports.getHookMethods = exports.protectedMethods = exports.defaultServiceEvents = exports.defaultEventMap = exports.defaultServiceMethods = exports.defaultServiceArguments = exports.SERVICE = void 0;
const events_1 = require("events");
const commons_1 = require("@feathersjs/commons");
exports.SERVICE = (0, commons_1.createSymbol)('@feathersjs/service');
exports.defaultServiceArguments = {
    find: ['params'],
    get: ['id', 'params'],
    create: ['data', 'params'],
    update: ['id', 'data', 'params'],
    patch: ['id', 'data', 'params'],
    remove: ['id', 'params']
};
exports.defaultServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'];
exports.defaultEventMap = {
    create: 'created',
    update: 'updated',
    patch: 'patched',
    remove: 'removed'
};
exports.defaultServiceEvents = Object.values(exports.defaultEventMap);
exports.protectedMethods = Object.keys(Object.prototype)
    .concat(Object.keys(events_1.EventEmitter.prototype))
    .concat(['all', 'around', 'before', 'after', 'error', 'hooks', 'setup', 'teardown', 'publish']);
function getHookMethods(service, options) {
    const { methods } = options;
    return exports.defaultServiceMethods
        .filter((m) => typeof service[m] === 'function' && !methods.includes(m))
        .concat(methods);
}
exports.getHookMethods = getHookMethods;
function getServiceOptions(service) {
    return service[exports.SERVICE];
}
exports.getServiceOptions = getServiceOptions;
const normalizeServiceOptions = (service, options = {}) => {
    const { methods = exports.defaultServiceMethods.filter((method) => typeof service[method] === 'function'), events = service.events || [] } = options;
    const serviceEvents = options.serviceEvents || exports.defaultServiceEvents.concat(events);
    return {
        ...options,
        events,
        methods,
        serviceEvents
    };
};
exports.normalizeServiceOptions = normalizeServiceOptions;
function wrapService(location, service, options) {
    // Do nothing if this is already an initialized
    if (service[exports.SERVICE]) {
        return service;
    }
    const protoService = Object.create(service);
    const serviceOptions = (0, exports.normalizeServiceOptions)(service, options);
    if (Object.keys(serviceOptions.methods).length === 0 &&
        ![...exports.defaultServiceMethods, 'setup', 'teardown'].some((method) => typeof service[method] === 'function')) {
        throw new Error(`Invalid service object passed for path \`${location}\``);
    }
    Object.defineProperty(protoService, exports.SERVICE, {
        value: serviceOptions
    });
    return protoService;
}
exports.wrapService = wrapService;
//# sourceMappingURL=service.js.map