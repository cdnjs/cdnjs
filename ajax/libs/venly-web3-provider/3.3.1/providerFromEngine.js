"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_event_emitter_1 = __importDefault(require("@metamask/safe-event-emitter"));
/**
 * Construct an Ethereum provider from the given JSON-RPC engine.
 *
 * @param engine - The JSON-RPC engine to construct a provider from.
 * @returns An Ethereum provider.
 */
function providerFromEngine(engine) {
    return new SafeEventEmitterProvider({ engine });
}
exports.default = providerFromEngine;
class SafeEventEmitterProvider extends safe_event_emitter_1.default {
    /**
     * Construct a SafeEventEmitterProvider from a JSON-RPC engine.
     *
     * @param options - Options.
     * @param options.engine - The JSON-RPC engine used to process requests.
     */
    constructor({ engine }) {
        super();
        this.request = (req) => {
            return new Promise((resolve, reject) => {
                this.sendAsync(req, (err, res) => {
                    if (err)
                        reject(res.error);
                    else
                        resolve(res.result);
                });
            });
        };
        /**
         * Send a provider request asynchronously.
         *
         * @param req - The request to send.
         * @param callback - A function that is called upon the success or failure of the request.
         */
        this.sendAsync = (req, callback) => {
            this.engine.handle(req, callback);
        };
        /**
         * Send a provider request asynchronously.
         *
         * This method serves the same purpose as `sendAsync`. It only exists for
         * legacy reasons.
         *
         * @deprecated Use `sendAsync` instead.
         * @param req - The request to send.
         * @param callback - A function that is called upon the success or failure of the request.
         */
        this.send = (req, callback) => {
            if (typeof callback !== 'function') {
                throw new Error('Must provide callback to "send" method.');
            }
            this.engine.handle(req, callback);
        };
        this.engine = engine;
        if (engine.on) {
            engine.on('notification', (message) => {
                this.emit('data', null, message);
            });
        }
    }
}
