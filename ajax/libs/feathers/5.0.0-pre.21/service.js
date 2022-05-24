"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapService = exports.getServiceOptions = exports.getHookMethods = exports.protectedMethods = exports.defaultEventMap = exports.defaultServiceMethods = exports.defaultServiceArguments = exports.SERVICE = void 0;
const dependencies_1 = require("./dependencies");
exports.SERVICE = (0, dependencies_1.createSymbol)('@feathersjs/service');
exports.defaultServiceArguments = {
    find: ['params'],
    get: ['id', 'params'],
    create: ['data', 'params'],
    update: ['id', 'data', 'params'],
    patch: ['id', 'data', 'params'],
    remove: ['id', 'params']
};
exports.defaultServiceMethods = Object.keys(exports.defaultServiceArguments);
exports.defaultEventMap = {
    create: 'created',
    update: 'updated',
    patch: 'patched',
    remove: 'removed'
};
exports.protectedMethods = Object.keys(Object.prototype)
    .concat(Object.keys(dependencies_1.EventEmitter.prototype))
    .concat([
    'all',
    'before',
    'after',
    'error',
    'hooks',
    'setup',
    'teardown',
    'publish'
]);
function getHookMethods(service, options) {
    const { methods } = options;
    return exports.defaultServiceMethods.filter(m => typeof service[m] === 'function' && !methods.includes(m)).concat(methods);
}
exports.getHookMethods = getHookMethods;
function getServiceOptions(service, options = {}) {
    const existingOptions = service[exports.SERVICE];
    if (existingOptions) {
        return existingOptions;
    }
    const { methods = exports.defaultServiceMethods.filter(method => typeof service[method] === 'function'), events = service.events || [] } = options;
    const { serviceEvents = Object.values(exports.defaultEventMap).concat(events) } = options;
    return {
        ...options,
        events,
        methods,
        serviceEvents
    };
}
exports.getServiceOptions = getServiceOptions;
function wrapService(location, service, options) {
    // Do nothing if this is already an initialized
    if (service[exports.SERVICE]) {
        return service;
    }
    const protoService = Object.create(service);
    const serviceOptions = getServiceOptions(service, options);
    if (Object.keys(serviceOptions.methods).length === 0 && typeof service.setup !== 'function') {
        throw new Error(`Invalid service object passed for path \`${location}\``);
    }
    Object.defineProperty(protoService, exports.SERVICE, {
        value: serviceOptions
    });
    return protoService;
}
exports.wrapService = wrapService;
//# sourceMappingURL=service.js.map