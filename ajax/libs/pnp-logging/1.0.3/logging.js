/**
@license
 * @pnp/logging v1.0.3 - pnp - light-weight, subscribable logging framework
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
/**
 * Class used to subscribe ILogListener and log messages throughout an application
 *
 */
class Logger {
    /**
     * Gets or sets the active log level to apply for log filtering
     */
    static get activeLogLevel() {
        return Logger.instance.activeLogLevel;
    }
    static set activeLogLevel(value) {
        Logger.instance.activeLogLevel = value;
    }
    static get instance() {
        if (typeof Logger._instance === "undefined" || Logger._instance === null) {
            Logger._instance = new LoggerImpl();
        }
        return Logger._instance;
    }
    /**
     * Adds ILogListener instances to the set of subscribed listeners
     *
     * @param listeners One or more listeners to subscribe to this log
     */
    static subscribe(...listeners) {
        listeners.map(listener => Logger.instance.subscribe(listener));
    }
    /**
     * Clears the subscribers collection, returning the collection before modifiction
     */
    static clearSubscribers() {
        return Logger.instance.clearSubscribers();
    }
    /**
     * Gets the current subscriber count
     */
    static get count() {
        return Logger.instance.count;
    }
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param message The message to write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    static write(message, level = 0 /* Verbose */) {
        Logger.instance.log({ level: level, message: message });
    }
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param json The json object to stringify and write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    static writeJSON(json, level = 0 /* Verbose */) {
        Logger.instance.log({ level: level, message: JSON.stringify(json) });
    }
    /**
     * Logs the supplied entry to the subscribed listeners
     *
     * @param entry The message to log
     */
    static log(entry) {
        Logger.instance.log(entry);
    }
    /**
     * Logs an error object to the subscribed listeners
     *
     * @param err The error object
     */
    static error(err) {
        Logger.instance.log({ data: err, level: 3 /* Error */, message: err.message });
    }
}
class LoggerImpl {
    constructor(activeLogLevel = 2 /* Warning */, subscribers = []) {
        this.activeLogLevel = activeLogLevel;
        this.subscribers = subscribers;
    }
    subscribe(listener) {
        this.subscribers.push(listener);
    }
    clearSubscribers() {
        const s = this.subscribers.slice(0);
        this.subscribers.length = 0;
        return s;
    }
    get count() {
        return this.subscribers.length;
    }
    write(message, level = 0 /* Verbose */) {
        this.log({ level: level, message: message });
    }
    log(entry) {
        if (typeof entry !== "undefined" && this.activeLogLevel <= entry.level) {
            this.subscribers.map(subscriber => subscriber.log(entry));
        }
    }
}

/**
 * Implementation of LogListener which logs to the console
 *
 */
class ConsoleListener {
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     *
     * @param entry The information to be logged
     */
    log(entry) {
        const msg = this.format(entry);
        switch (entry.level) {
            case 0 /* Verbose */:
            case 1 /* Info */:
                console.log(msg);
                break;
            case 2 /* Warning */:
                console.warn(msg);
                break;
            case 3 /* Error */:
                console.error(msg);
                break;
        }
    }
    /**
     * Formats the message
     *
     * @param entry The information to format into a string
     */
    format(entry) {
        const msg = [];
        msg.push("Message: " + entry.message);
        if (typeof entry.data !== "undefined") {
            msg.push(" Data: " + JSON.stringify(entry.data));
        }
        return msg.join("");
    }
}
/**
 * Implementation of LogListener which logs to the supplied function
 *
 */
class FunctionListener {
    /**
     * Creates a new instance of the FunctionListener class
     *
     * @constructor
     * @param  method The method to which any logging data will be passed
     */
    constructor(method) {
        this.method = method;
    }
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     *
     * @param entry The information to be logged
     */
    log(entry) {
        this.method(entry);
    }
}

export { Logger, ConsoleListener, FunctionListener };
//# sourceMappingURL=logging.js.map
