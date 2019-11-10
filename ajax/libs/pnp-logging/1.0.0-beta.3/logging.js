/**
 * A set of logging levels
 *
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Off"] = 99] = "Off";
})(LogLevel || (LogLevel = {}));

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
    static write(message, level = LogLevel.Verbose) {
        Logger.instance.log({ level: level, message: message });
    }
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param json The json object to stringify and write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    static writeJSON(json, level = LogLevel.Verbose) {
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
     * Logs performance tracking data for the the execution duration of the supplied function using console.profile
     *
     * @param name The name of this profile boundary
     * @param f The function to execute and track within this performance boundary
     */
    static measure(name, f) {
        return Logger.instance.measure(name, f);
    }
}
class LoggerImpl {
    constructor(activeLogLevel = LogLevel.Warning, subscribers = []) {
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
    write(message, level = LogLevel.Verbose) {
        this.log({ level: level, message: message });
    }
    log(entry) {
        if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
            return;
        }
        this.subscribers.map(subscriber => subscriber.log(entry));
    }
    measure(name, f) {
        console.profile(name);
        try {
            return f();
        }
        finally {
            console.profileEnd();
        }
    }
}

/**
 * Implementation of ILogListener which logs to the browser console
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
            case LogLevel.Verbose:
            case LogLevel.Info:
                console.log(msg);
                break;
            case LogLevel.Warning:
                console.warn(msg);
                break;
            case LogLevel.Error:
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
 * Implementation of ILogListener which logs to the supplied function
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

export { Logger, LogLevel, ConsoleListener, FunctionListener };
//# sourceMappingURL=logging.js.map
