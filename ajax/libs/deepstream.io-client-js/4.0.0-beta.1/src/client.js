"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
const client_options_1 = require("./client-options");
const constants_1 = require("./constants");
exports.EVENT = constants_1.EVENT;
exports.CONNECTION_STATE = constants_1.CONNECTION_STATE;
const C = require("../binary-protocol/src/message-constants");
exports.C = C;
const logger_1 = require("./util/logger");
const timeout_registry_1 = require("./util/timeout-registry");
const timer_registry_1 = require("./util/timer-registry");
const connection_1 = require("./connection/connection");
const socket_factory_1 = require("./connection/socket-factory");
const event_handler_1 = require("./event/event-handler");
const rpc_handler_1 = require("./rpc/rpc-handler");
const record_handler_1 = require("./record/record-handler");
const presence_handler_1 = require("./presence/presence-handler");
const EventEmitter = require("component-emitter2");
class Client extends EventEmitter {
    constructor(url, options = {}) {
        super();
        this.options = Object.assign({}, client_options_1.DefaultOptions, options);
        const services = {};
        services.logger = new logger_1.Logger(this);
        services.timerRegistry = new timer_registry_1.TimerRegistry();
        services.timeoutRegistry = new timeout_registry_1.TimeoutRegistry(services, this.options);
        services.socketFactory = options.socketFactory || socket_factory_1.socketFactory;
        services.connection = new connection_1.Connection(services, this.options, url, this);
        this.services = services;
        this.services.connection.onLost(services.timeoutRegistry.onConnectionLost.bind(services.timeoutRegistry));
        this.event = new event_handler_1.EventHandler(this.services, this.options);
        this.rpc = new rpc_handler_1.RPCHandler(this.services, this.options);
        this.record = new record_handler_1.RecordHandler(this.services, this.options);
        this.presence = new presence_handler_1.PresenceHandler(this.services, this.options);
    }
    login(detailsOrCallback, callback) {
        if (detailsOrCallback && typeof detailsOrCallback === 'object') {
            if (callback) {
                this.services.connection.authenticate(detailsOrCallback, callback);
            }
            else {
                return new Promise((resolve, reject) => {
                    this.services.connection.authenticate(detailsOrCallback, (success, data) => {
                        success ? resolve(data) : reject(data);
                    });
                });
            }
        }
        else {
            if (typeof detailsOrCallback === 'function') {
                this.services.connection.authenticate({}, detailsOrCallback);
            }
            else {
                return new Promise((resolve, reject) => {
                    this.services.connection.authenticate({}, (success, data) => {
                        success ? resolve(data) : reject(data);
                    });
                });
            }
        }
    }
    getConnectionState() {
        return this.services.connection.getConnectionState();
    }
    close() {
        this.services.connection.close();
    }
    /**
    * Returns a random string. The first block of characters
    * is a timestamp, in order to allow databases to optimize for semi-
    * sequentuel numberings
    */
    getUid() {
        const timestamp = (new Date()).getTime().toString(36);
        const randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');
        return `${timestamp}-${randomString}`;
    }
}
exports.Client = Client;
function deepstream(url, options) {
    return new Client(url, options);
}
exports.deepstream = deepstream;
//# sourceMappingURL=client.js.map