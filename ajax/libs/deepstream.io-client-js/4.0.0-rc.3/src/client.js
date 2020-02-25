"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_options_1 = require("./client-options");
const logger_1 = require("./util/logger");
const timeout_registry_1 = require("./util/timeout-registry");
const timer_registry_1 = require("./util/timer-registry");
const connection_1 = require("./connection/connection");
const socket_factory_1 = require("./connection/socket-factory");
const event_handler_1 = require("./event/event-handler");
const rpc_handler_1 = require("./rpc/rpc-handler");
const record_handler_1 = require("./record/record-handler");
const storage_service_1 = require("./record/storage-service");
const presence_handler_1 = require("./presence/presence-handler");
const EventEmitter = require("component-emitter2");
const noop_storage_service_1 = require("./record/noop-storage-service");
class Client extends EventEmitter {
    constructor(url, options = {}) {
        super();
        this.options = Object.assign({}, client_options_1.DefaultOptions, options);
        // @ts-ignore
        const services = {};
        services.logger = new logger_1.Logger(this);
        services.timerRegistry = new timer_registry_1.TimerRegistry(this.options.timerResolution);
        services.timeoutRegistry = new timeout_registry_1.TimeoutRegistry(services, this.options);
        services.socketFactory = this.options.socketFactory || socket_factory_1.socketFactory;
        services.connection = new connection_1.Connection(services, this.options, url, this);
        if (this.options.offlineEnabled) {
            services.storage = this.options.storage || new storage_service_1.Storage(this.options);
        }
        else {
            services.storage = new noop_storage_service_1.NoopStorage();
        }
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
    pause() {
        this.services.connection.pause();
    }
    resume(callback) {
        if (callback) {
            this.services.connection.resume(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            this.services.connection.resume(error => {
                error ? reject(error) : resolve();
            });
        });
    }
    /**
    * Returns a random string. The first block of characters
    * is a timestamp, in order to allow databases to optimize for semi-
    * sequential numberings
    */
    getUid() {
        const timestamp = (new Date()).getTime().toString(36);
        const randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');
        return `${timestamp}-${randomString}`;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map