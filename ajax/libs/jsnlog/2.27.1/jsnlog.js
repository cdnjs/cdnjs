/* 
 * JSNLog 2.27.1
 * Open source under the MIT License.
 * Copyright 2012-2017 Mattijs Perdeck All rights reserved.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function JL(loggerName) {
    // If name is empty, return the root logger
    if (!loggerName) {
        return JL.__;
    }
    // Implements Array.reduce. JSNLog supports IE8+ and reduce is not supported in that browser.
    // Same interface as the standard reduce, except that 
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, initialValue) {
            var previousValue = initialValue;
            for (var i = 0; i < this.length; i++) {
                previousValue = callback(previousValue, this[i], i, this);
            }
            return previousValue;
        };
    }
    var accumulatedLoggerName = '';
    var logger = ('.' + loggerName).split('.').reduce(function (prev, curr, idx, arr) {
        // if loggername is a.b.c, than currentLogger will be set to the loggers
        // root   (prev: JL, curr: '')
        // a      (prev: JL.__, curr: 'a')
        // a.b    (prev: JL.__.__a, curr: 'b')
        // a.b.c  (prev: JL.__.__a.__a.b, curr: 'c')
        // Note that when a new logger name is encountered (such as 'a.b.c'),
        // a new logger object is created and added as a property to the parent ('a.b').
        // The root logger is added as a property of the JL object itself.
        // It is essential that the name of the property containing the child logger
        // contains the full 'path' name of the child logger ('a.b.c') instead of
        // just the bit after the last period ('c').
        // This is because the parent inherits properties from its ancestors.
        // So if the root has a child logger 'c' (stored in a property 'c' of the root logger),
        // then logger 'a.b' has that same property 'c' through inheritance.
        // The names of the logger properties start with __, so the root logger 
        // (which has name ''), has a nice property name '__'.              
        // accumulatedLoggerName evaluates false ('' is falsy) in first iteration when prev is the root logger.
        // accumulatedLoggerName will be the logger name corresponding with the logger in currentLogger.
        // Keep in mind that the currentLogger may not be defined yet, so can't get the name from
        // the currentLogger object itself. 
        if (accumulatedLoggerName) {
            accumulatedLoggerName += '.' + curr;
        }
        else {
            accumulatedLoggerName = curr;
        }
        var currentLogger = prev['__' + accumulatedLoggerName];
        // If the currentLogger (or the actual logger being sought) does not yet exist, 
        // create it now.
        if (currentLogger === undefined) {
            // Set the prototype of the Logger constructor function to the parent of the logger
            // to be created. This way, __proto of the new logger object will point at the parent.
            // When logger.level is evaluated and is not present, the JavaScript runtime will 
            // walk down the prototype chain to find the first ancestor with a level property.
            //
            // Note that prev at this point refers to the parent logger.
            JL.Logger.prototype = prev;
            currentLogger = new JL.Logger(accumulatedLoggerName);
            prev['__' + accumulatedLoggerName] = currentLogger;
        }
        return currentLogger;
    }, JL.__);
    return logger;
}
(function (JL) {
    // Initialise requestId to empty string. If you don't do this and the user
    // does not set it via setOptions, then the JSNLog-RequestId header will
    // have value "undefined", which doesn't look good in a log.
    //
    // Note that you always want to send a requestId as part of log requests,
    // otherwise the server side component doesn't know this is a log request
    // and may create a new request id for the log request, causing confusion
    // in the log.
    JL.requestId = '';
    // Number uniquely identifying every log entry within the request.
    JL.entryId = 0;
    // Allow property injection of these classes, to enable unit testing
    JL._createXMLHttpRequest = function () { return new XMLHttpRequest(); };
    JL._getTime = function () { return (new Date).getTime(); };
    JL._console = console;
    // ----- private variables
    JL._appenderNames = [];
    /**
    Copies the value of a property from one object to the other.
    This is used to copy property values as part of setOption for loggers and appenders.

    Because loggers inherit property values from their parents, it is important never to
    create a property on a logger if the intent is to inherit from the parent.

    Copying rules:
    1) if the from property is undefined (for example, not mentioned in a JSON object), the
       to property is not affected at all.
    2) if the from property is null, the to property is deleted (so the logger will inherit from
       its parent).
    3) Otherwise, the from property is copied to the to property.
    */
    function copyProperty(propertyName, from, to) {
        if (from[propertyName] === undefined) {
            return;
        }
        if (from[propertyName] === null) {
            delete to[propertyName];
            return;
        }
        to[propertyName] = from[propertyName];
    }
    /**
    Returns true if a log should go ahead.
    Does not check level.

    @param filters
        Filters that determine whether a log can go ahead.
    */
    function allow(filters) {
        // If enabled is not null or undefined, then if it is false, then return false
        // Note that undefined==null (!)
        if (!(JL.enabled == null)) {
            if (!JL.enabled) {
                return false;
            }
        }
        // If the regex contains a bug, that will throw an exception.
        // Ignore this, and pass the log item (better too much than too little).
        try {
            if (filters.userAgentRegex) {
                if (!new RegExp(filters.userAgentRegex).test(navigator.userAgent)) {
                    return false;
                }
            }
        }
        catch (e) { }
        try {
            if (filters.ipRegex && JL.clientIP) {
                if (!new RegExp(filters.ipRegex).test(JL.clientIP)) {
                    return false;
                }
            }
        }
        catch (e) { }
        return true;
    }
    /**
    Returns true if a log should go ahead, based on the message.

    @param filters
        Filters that determine whether a log can go ahead.

    @param message
        Message to be logged.
    */
    function allowMessage(filters, message) {
        // If the regex contains a bug, that will throw an exception.
        // Ignore this, and pass the log item (better too much than too little).
        try {
            if (filters.disallow) {
                if (new RegExp(filters.disallow).test(message)) {
                    return false;
                }
            }
        }
        catch (e) { }
        return true;
    }
    // If logObject is a function, the function is evaluated (without parameters)
    // and the result returned.
    // Otherwise, logObject itself is returned.
    function stringifyLogObjectFunction(logObject) {
        if (typeof logObject == "function") {
            if (logObject instanceof RegExp) {
                return logObject.toString();
            }
            else {
                return logObject();
            }
        }
        return logObject;
    }
    var StringifiedLogObject = /** @class */ (function () {
        // * msg - 
        //      if the logObject is a scalar (after possible function evaluation), this is set to
        //      string representing the scalar. Otherwise it is left undefined.
        // * meta -
        //      if the logObject is an object (after possible function evaluation), this is set to
        //      that object. Otherwise it is left undefined.
        // * finalString -
        //      This is set to the string representation of logObject (after possible function evaluation),
        //      regardless of whether it is an scalar or an object. An object is stringified to a JSON string.
        //      Note that you can't call this field "final", because as some point this was a reserved
        //      JavaScript keyword and using final trips up some minifiers.
        function StringifiedLogObject(msg, meta, finalString) {
            this.msg = msg;
            this.meta = meta;
            this.finalString = finalString;
        }
        return StringifiedLogObject;
    }());
    // Takes a logObject, which can be 
    // * a scalar
    // * an object
    // * a parameterless function, which returns the scalar or object to log.
    // Returns a stringifiedLogObject
    function stringifyLogObject(logObject) {
        // Note that this works if logObject is null.
        // typeof null is object.
        // JSON.stringify(null) returns "null".
        var actualLogObject = stringifyLogObjectFunction(logObject);
        var finalString;
        // Note that typeof actualLogObject should not be "function", because that has 
        // been resolved with stringifyLogObjectFunction.
        switch (typeof actualLogObject) {
            case "string":
                return new StringifiedLogObject(actualLogObject, null, actualLogObject);
            case "number":
                finalString = actualLogObject.toString();
                return new StringifiedLogObject(finalString, null, finalString);
            case "boolean":
                finalString = actualLogObject.toString();
                return new StringifiedLogObject(finalString, null, finalString);
            case "undefined":
                return new StringifiedLogObject("undefined", null, "undefined");
            case "object":
                if ((actualLogObject instanceof RegExp) ||
                    (actualLogObject instanceof String) ||
                    (actualLogObject instanceof Number) ||
                    (actualLogObject instanceof Boolean)) {
                    finalString = actualLogObject.toString();
                    return new StringifiedLogObject(finalString, null, finalString);
                }
                else {
                    if (typeof JL.serialize === 'function') {
                        finalString = JL.serialize.call(this, actualLogObject);
                    }
                    else {
                        finalString = JSON.stringify(actualLogObject);
                    }
                    // Set the msg field to "" instead of null. Some Winston transports
                    // assume that the msg field is not null.
                    return new StringifiedLogObject("", actualLogObject, finalString);
                }
            default:
                return new StringifiedLogObject("unknown", null, "unknown");
        }
    }
    function setOptions(options) {
        copyProperty("enabled", options, this);
        copyProperty("maxMessages", options, this);
        copyProperty("defaultAjaxUrl", options, this);
        copyProperty("clientIP", options, this);
        copyProperty("requestId", options, this);
        copyProperty("defaultBeforeSend", options, this);
        copyProperty("serialize", options, this);
        return this;
    }
    JL.setOptions = setOptions;
    function getAllLevel() { return -2147483648; }
    JL.getAllLevel = getAllLevel;
    function getTraceLevel() { return 1000; }
    JL.getTraceLevel = getTraceLevel;
    function getDebugLevel() { return 2000; }
    JL.getDebugLevel = getDebugLevel;
    function getInfoLevel() { return 3000; }
    JL.getInfoLevel = getInfoLevel;
    function getWarnLevel() { return 4000; }
    JL.getWarnLevel = getWarnLevel;
    function getErrorLevel() { return 5000; }
    JL.getErrorLevel = getErrorLevel;
    function getFatalLevel() { return 6000; }
    JL.getFatalLevel = getFatalLevel;
    function getOffLevel() { return 2147483647; }
    JL.getOffLevel = getOffLevel;
    function levelToString(level) {
        if (level <= 1000) {
            return "trace";
        }
        if (level <= 2000) {
            return "debug";
        }
        if (level <= 3000) {
            return "info";
        }
        if (level <= 4000) {
            return "warn";
        }
        if (level <= 5000) {
            return "error";
        }
        return "fatal";
    }
    // ---------------------
    var Exception = /** @class */ (function () {
        // data replaces message. It takes not just strings, but also objects and functions, just like the log function.
        // internally, the string representation is stored in the message property (inherited from Error)
        //
        // inner: inner exception. Can be null or undefined. 
        function Exception(data, inner) {
            this.inner = inner;
            this.name = "JL.Exception";
            this.message = stringifyLogObject(data).finalString;
        }
        return Exception;
    }());
    JL.Exception = Exception;
    // Derive Exception from Error (a Host object), so browsers
    // are more likely to produce a stack trace for it in their console.
    //
    // Note that instanceof against an object created with this constructor
    // will return true in these cases:
    // <object> instanceof JL.Exception);
    // <object> instanceof Error);
    Exception.prototype = new Error();
    // ---------------------
    var LogItem = /** @class */ (function () {
        // l: level
        // m: message
        // n: logger name
        // t (timeStamp) is number of milliseconds since 1 January 1970 00:00:00 UTC
        // u: number uniquely identifying this entry for this request.
        //
        // Keeping the property names really short, because they will be sent in the
        // JSON payload to the server.
        function LogItem(l, m, n, t, u) {
            this.l = l;
            this.m = m;
            this.n = n;
            this.t = t;
            this.u = u;
        }
        return LogItem;
    }());
    JL.LogItem = LogItem;
    function newLogItem(levelNbr, message, loggerName) {
        JL.entryId++;
        return new LogItem(levelNbr, message, loggerName, JL._getTime(), JL.entryId);
    }
    function clearTimer(timer) {
        if (timer.id) {
            clearTimeout(timer.id);
            timer.id = null;
        }
    }
    function setTimer(timer, timeoutMs, callback) {
        var that = this;
        if (!timer.id) {
            timer.id = setTimeout(function () {
                // use call to ensure that the this as used inside sendBatch when it runs is the
                // same this at this point.
                callback.call(that);
            }, timeoutMs);
        }
    }
    var Appender = /** @class */ (function () {
        // sendLogItems takes an array of log items. It will be called when
        // the appender has items to process (such as, send to the server).
        // sendLogItems will call successCallback after the items have been successfully sent.
        //
        // Note that after sendLogItems returns, the appender may truncate
        // the LogItem array, so the function has to copy the content of the array
        // in some fashion (eg. serialize) before returning.
        function Appender(appenderName, sendLogItems) {
            this.appenderName = appenderName;
            this.sendLogItems = sendLogItems;
            this.level = JL.getTraceLevel();
            // set to super high level, so if user increases level, level is unlikely to get 
            // above sendWithBufferLevel
            this.sendWithBufferLevel = 2147483647;
            this.storeInBufferLevel = -2147483648;
            this.bufferSize = 0; // buffering switch off by default
            this.batchSize = 1;
            this.maxBatchSize = 20;
            this.batchTimeout = 2147483647;
            this.sendTimeout = 5000;
            // Holds all log items with levels higher than storeInBufferLevel 
            // but lower than level. These items may never be sent.
            this.buffer = [];
            // Holds all items that we do want to send, until we have a full
            // batch (as determined by batchSize).
            this.batchBuffer = [];
            // Holds the id of the timer implementing the batch timeout.
            // Can be null.
            // This is an object, so it can be passed to a method that updated the timer variable.
            this.batchTimeoutTimer = { id: null };
            // Holds the id of the timer implementing the send timeout.
            // Can be null.
            this.sendTimeoutTimer = { id: null };
            // Number of log items that has been skipped due to batch buffer at max size,
            // since appender creation or since creation of the last "skipped" warning log entry.
            this.nbrLogItemsSkipped = 0;
            // Will be 0 if no log request is outstanding at the moment.
            // Otherwise the number of log items in the outstanding request.
            this.nbrLogItemsBeingSent = 0;
            var emptyNameErrorMessage = "Trying to create an appender without a name or with an empty name";
            // This evaluates to true if appenderName is either null or undefined!
            // Do not check here if the name is "", because that would stop you creating the 
            // default appender.
            if (appenderName == undefined) {
                throw emptyNameErrorMessage;
            }
            if (JL._appenderNames.indexOf(appenderName) != -1) {
                // If user passed in "", that will now have been picked up as a duplicate
                // because default appender also uses "".
                if (!appenderName) {
                    throw emptyNameErrorMessage;
                }
                throw "Multiple appenders use the same name " + appenderName;
            }
            JL._appenderNames.push(appenderName);
        }
        Appender.prototype.addLogItemsToBuffer = function (logItems) {
            // If the batch buffer has reached its maximum limit, 
            // skip the log item and increase the "skipped items" counter.
            if (this.batchBuffer.length >= this.maxBatchSize) {
                this.nbrLogItemsSkipped += logItems.length;
                return;
            }
            // If maxMessages is not null or undefined, then decrease it by the batch size.
            // This can result in a negative maxMessages.
            // Note that undefined==null (!)
            //
            // Note that we may be sending more messages than the maxMessages limit allows,
            // if we stored trace messages. Rationale is the buffer for trace messages is limited,
            // and if we cut off at exactly maxMessages, we'd also loose the high severity message
            // that caused the trace messages to be sent (unless we cater for this specifically, which
            // is more complexity).
            //
            // If there are multiple appenders sending the same message, maxMessage will be decreased
            // by each appender for the same message. This is:
            // 1) only appenders know whether a message will actually be sent (based on storeInBufferLevel),
            //    so the loggers couldn't do this update;
            // 2) if you have multiple appenders hitting the same server, this may be what you want.
            //
            // In most cases there is only 1 appender, so this then doesn't matter.
            if (!(JL.maxMessages == null)) {
                if (JL.maxMessages < 1) {
                    return;
                }
                JL.maxMessages -= logItems.length;
            }
            this.batchBuffer = this.batchBuffer.concat(logItems);
            // If this is the first item in the buffer, set the timer
            // to ensure it will be sent within the timeout period.
            // If it is not the first item, leave the timer alone so to not to 
            // increase the timeout for the first item.
            //
            // To determine if this is the first item, look at the timer variable.
            // Do not look at the buffer length, because we also put items in the buffer
            // via a concat (bypassing this function).
            //
            // The setTimer method only sets the timer if it is not already running.
            var that = this;
            setTimer(this.batchTimeoutTimer, this.batchTimeout, function () {
                that.sendBatch.call(that);
            });
        };
        ;
        Appender.prototype.batchBufferHasOverdueMessages = function () {
            for (var i = 0; i < this.batchBuffer.length; i++) {
                var messageAgeMs = JL._getTime() - this.batchBuffer[i].t;
                if (messageAgeMs > this.batchTimeout) {
                    return true;
                }
            }
            return false;
        };
        // Returns true if no more message will ever be added to the batch buffer,
        // but the batch buffer has messages now - so if there are not enough to make up a batch,
        // and there is no batch timeout, then they will never be sent. This is especially important if 
        // maxMessages was reached while jsnlog.js was retrying sending messages to the server.
        Appender.prototype.batchBufferHasStrandedMessage = function () {
            return (!(JL.maxMessages == null)) && (JL.maxMessages < 1) && (this.batchBuffer.length > 0);
        };
        Appender.prototype.sendBatchIfComplete = function () {
            if ((this.batchBuffer.length >= this.batchSize) ||
                this.batchBufferHasOverdueMessages() ||
                this.batchBufferHasStrandedMessage()) {
                this.sendBatch();
            }
        };
        Appender.prototype.onSendingEnded = function () {
            clearTimer(this.sendTimeoutTimer);
            this.nbrLogItemsBeingSent = 0;
            this.sendBatchIfComplete();
        };
        Appender.prototype.setOptions = function (options) {
            copyProperty("level", options, this);
            copyProperty("ipRegex", options, this);
            copyProperty("userAgentRegex", options, this);
            copyProperty("disallow", options, this);
            copyProperty("sendWithBufferLevel", options, this);
            copyProperty("storeInBufferLevel", options, this);
            copyProperty("bufferSize", options, this);
            copyProperty("batchSize", options, this);
            copyProperty("maxBatchSize", options, this);
            copyProperty("batchTimeout", options, this);
            copyProperty("sendTimeout", options, this);
            if (this.bufferSize < this.buffer.length) {
                this.buffer.length = this.bufferSize;
            }
            if (this.maxBatchSize < this.batchSize) {
                throw new JL.Exception({
                    "message": "maxBatchSize cannot be smaller than batchSize",
                    "maxBatchSize": this.maxBatchSize,
                    "batchSize": this.batchSize
                });
            }
            return this;
        };
        /**
        Called by a logger to log a log item.
        If in response to this call one or more log items need to be processed
        (eg., sent to the server), this method calls this.sendLogItems
        with an array with all items to be processed.

        Note that the name and parameters of this function must match those of the log function of
        a Winston transport object, so that users can use these transports as appenders.
        That is why there are many parameters that are not actually used by this function.

        level - string with the level ("trace", "debug", etc.) Only used by Winston transports.
        msg - human readable message. Undefined if the log item is an object. Only used by Winston transports.
        meta - log object. Always defined, because at least it contains the logger name. Only used by Winston transports.
        callback - function that is called when the log item has been logged. Only used by Winston transports.
        levelNbr - level as a number. Not used by Winston transports.
        message - log item. If the user logged an object, this is the JSON string.  Not used by Winston transports.
        loggerName: name of the logger.  Not used by Winston transports.
        */
        Appender.prototype.log = function (level, msg, meta, callback, levelNbr, message, loggerName) {
            var logItem;
            if (!allow(this)) {
                return;
            }
            if (!allowMessage(this, message)) {
                return;
            }
            if (levelNbr < this.storeInBufferLevel) {
                // Ignore the log item completely
                return;
            }
            logItem = newLogItem(levelNbr, message, loggerName);
            if (levelNbr < this.level) {
                // Store in the hold buffer. Do not send.
                if (this.bufferSize > 0) {
                    this.buffer.push(logItem);
                    // If we exceeded max buffer size, remove oldest item
                    if (this.buffer.length > this.bufferSize) {
                        this.buffer.shift();
                    }
                }
                return;
            }
            // Want to send the item
            this.addLogItemsToBuffer([logItem]);
            if (levelNbr >= this.sendWithBufferLevel) {
                // Want to send the contents of the buffer.
                //
                // Send the buffer AFTER sending the high priority item.
                // If you were to send the high priority item after the buffer,
                // if we're close to maxMessages or maxBatchSize,
                // then the trace messages in the buffer could crowd out the actual high priority item.
                if (this.buffer.length) {
                    this.addLogItemsToBuffer(this.buffer);
                    this.buffer.length = 0;
                }
            }
            this.sendBatchIfComplete();
        };
        ;
        // Processes the batch buffer
        //
        // Make this public, so it can be called from outside the library,
        // when the page is unloaded.
        Appender.prototype.sendBatch = function () {
            // Do not clear the batch timer if you don't go ahead here because
            // a send is already in progress. Otherwise the messages that were stopped from going out
            // may get ignored because the batch timer never went off.
            if (this.nbrLogItemsBeingSent > 0) {
                return;
            }
            clearTimer(this.batchTimeoutTimer);
            if (this.batchBuffer.length == 0) {
                return;
            }
            // Decided at this point to send contents of the buffer
            this.nbrLogItemsBeingSent = this.batchBuffer.length;
            var that = this;
            setTimer(this.sendTimeoutTimer, this.sendTimeout, function () {
                that.onSendingEnded.call(that);
            });
            this.sendLogItems(this.batchBuffer, function () {
                // Log entries have been successfully sent to server
                // Remove the first (nbrLogItemsBeingSent) items in the batch buffer, because they are the ones
                // that were sent.
                that.batchBuffer.splice(0, that.nbrLogItemsBeingSent);
                // If items had to be skipped, add a WARN message
                if (that.nbrLogItemsSkipped > 0) {
                    that.batchBuffer.push(newLogItem(getWarnLevel(), "Lost " + that.nbrLogItemsSkipped + " messages. Either connection with the server was down or logging was disabled via the enabled option. Reduce lost messages by increasing the ajaxAppender option maxBatchSize.", that.appenderName));
                    that.nbrLogItemsSkipped = 0;
                }
                that.onSendingEnded.call(that);
            });
        };
        return Appender;
    }());
    JL.Appender = Appender;
    // ---------------------
    var AjaxAppender = /** @class */ (function (_super) {
        __extends(AjaxAppender, _super);
        function AjaxAppender(appenderName) {
            var _this = _super.call(this, appenderName, AjaxAppender.prototype.sendLogItemsAjax) || this;
            _this.xhr = JL._createXMLHttpRequest();
            return _this;
        }
        AjaxAppender.prototype.setOptions = function (options) {
            copyProperty("url", options, this);
            copyProperty("beforeSend", options, this);
            _super.prototype.setOptions.call(this, options);
            return this;
        };
        AjaxAppender.prototype.sendLogItemsAjax = function (logItems, successCallback) {
            // JSON.stringify is only supported on IE8+
            // Use try-catch in case we get an exception here.
            //
            // The "r" field is now obsolete. When writing a server side component, 
            // read the HTTP header "JSNLog-RequestId"
            // to get the request id.
            //
            // The .Net server side component
            // now uses the JSNLog-RequestId HTTP Header, because this allows it to
            // detect whether the incoming request has a request id.
            // If the request id were in the json payload, it would have to read the json
            // from the stream, interfering with normal non-logging requests.
            //
            // To see what characters you can use in the HTTP header, visit:
            // http://stackoverflow.com/questions/3561381/custom-http-headers-naming-conventions/3561399#3561399
            //
            // It needs this ability, so users of NLog can set a requestId variable in NLog
            // before the server side component tries to log the client side log message
            // through an NLog logger.
            // Unlike Log4Net, NLog doesn't allow you to register an object whose ToString()
            // is only called when it tries to log something, so the requestId has to be 
            // determined right at the start of request processing.
            try {
                // Do not send logs, if JL.enabled is set to false.
                //
                // Do not call successCallback here. After each timeout, jsnlog will retry sending the message.
                // If jsnlog gets re-enabled, it will then log the number of messages logged.
                // If it doesn't get re-enabled, amount of cpu cycles wasted is minimal.
                if (!allow(this)) {
                    return;
                }
                // If a request is in progress, abort it.
                // Otherwise, it may call the success callback, which will be very confusing.
                // It may also stop the inflight request from resulting in a log at the server.
                var xhrState = this.xhr.readyState;
                if ((xhrState != 0) && (xhrState != 4)) {
                    this.xhr.abort();
                }
                // Only determine the url right before you send a log request.
                // Do not set the url when constructing the appender.
                //
                // This is because the server side component sets defaultAjaxUrl
                // in a call to setOptions, AFTER the JL object and the default appender
                // have been created. 
                var ajaxUrl = "/jsnlog.logger";
                // This evaluates to true if defaultAjaxUrl is null or undefined
                if (!(JL.defaultAjaxUrl == null)) {
                    ajaxUrl = JL.defaultAjaxUrl;
                }
                if (this.url) {
                    ajaxUrl = this.url;
                }
                this.xhr.open('POST', ajaxUrl);
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                this.xhr.setRequestHeader('JSNLog-RequestId', JL.requestId);
                var that = this;
                this.xhr.onreadystatechange = function () {
                    // On most browsers, if the request fails (eg. internet is gone),
                    // it will set xhr.readyState == 4 and xhr.status != 200 (0 if request could not be sent) immediately.
                    // However, Edge and IE will not change the readyState at all if the internet goes away while waiting
                    // for a response.
                    // Some servers will return a 204 (success, no content) when the JSNLog endpoint
                    // returns the empty response. So check on any code in the 2.. range, not just 200.
                    if ((that.xhr.readyState == 4) && (that.xhr.status >= 200 && that.xhr.status < 300)) {
                        successCallback();
                    }
                };
                var json = {
                    r: JL.requestId,
                    lg: logItems
                };
                // call beforeSend callback
                // first try the callback on the appender
                // then the global defaultBeforeSend callback
                if (typeof this.beforeSend === 'function') {
                    this.beforeSend.call(this, this.xhr, json);
                }
                else if (typeof JL.defaultBeforeSend === 'function') {
                    JL.defaultBeforeSend.call(this, this.xhr, json);
                }
                var finalmsg = JSON.stringify(json);
                this.xhr.send(finalmsg);
            }
            catch (e) { }
        };
        return AjaxAppender;
    }(Appender));
    JL.AjaxAppender = AjaxAppender;
    // ---------------------
    var ConsoleAppender = /** @class */ (function (_super) {
        __extends(ConsoleAppender, _super);
        function ConsoleAppender(appenderName) {
            return _super.call(this, appenderName, ConsoleAppender.prototype.sendLogItemsConsole) || this;
        }
        ConsoleAppender.prototype.clog = function (logEntry) {
            JL._console.log(logEntry);
        };
        ConsoleAppender.prototype.cerror = function (logEntry) {
            if (JL._console.error) {
                JL._console.error(logEntry);
            }
            else {
                this.clog(logEntry);
            }
        };
        ConsoleAppender.prototype.cwarn = function (logEntry) {
            if (JL._console.warn) {
                JL._console.warn(logEntry);
            }
            else {
                this.clog(logEntry);
            }
        };
        ConsoleAppender.prototype.cinfo = function (logEntry) {
            if (JL._console.info) {
                JL._console.info(logEntry);
            }
            else {
                this.clog(logEntry);
            }
        };
        // IE11 has a console.debug function. But its console doesn't have 
        // the option to show/hide debug messages (the same way Chrome and FF do),
        // even though it does have such buttons for Error, Warn, Info.
        //
        // For now, this means that debug messages can not be hidden on IE.
        // Live with this, seeing that it works fine on FF and Chrome, which
        // will be much more popular with developers.
        ConsoleAppender.prototype.cdebug = function (logEntry) {
            if (JL._console.debug) {
                JL._console.debug(logEntry);
            }
            else {
                this.cinfo(logEntry);
            }
        };
        ConsoleAppender.prototype.sendLogItemsConsole = function (logItems, successCallback) {
            try {
                // Do not send logs, if JL.enabled is set to false
                //
                // Do not call successCallback here. After each timeout, jsnlog will retry sending the message.
                // If jsnlog gets re-enabled, it will then log the number of messages logged.
                // If it doesn't get re-enabled, amount of cpu cycles wasted is minimal.
                if (!allow(this)) {
                    return;
                }
                if (!JL._console) {
                    return;
                }
                var i;
                for (i = 0; i < logItems.length; ++i) {
                    var li = logItems[i];
                    var msg = li.n + ": " + li.m;
                    // Only log the timestamp if we're on the server
                    // (window is undefined). On the browser, the user
                    // sees the log entry probably immediately, so in that case
                    // the timestamp is clutter.
                    if (typeof window === 'undefined') {
                        msg = new Date(li.t) + " | " + msg;
                    }
                    if (li.l <= JL.getDebugLevel()) {
                        this.cdebug(msg);
                    }
                    else if (li.l <= JL.getInfoLevel()) {
                        this.cinfo(msg);
                    }
                    else if (li.l <= JL.getWarnLevel()) {
                        this.cwarn(msg);
                    }
                    else {
                        this.cerror(msg);
                    }
                }
            }
            catch (e) {
            }
            successCallback();
        };
        return ConsoleAppender;
    }(Appender));
    JL.ConsoleAppender = ConsoleAppender;
    // --------------------
    var Logger = /** @class */ (function () {
        function Logger(loggerName) {
            this.loggerName = loggerName;
            // Create seenRexes, otherwise this logger will use the seenRexes
            // of its parent via the prototype chain.
            this.seenRegexes = [];
        }
        Logger.prototype.setOptions = function (options) {
            copyProperty("level", options, this);
            copyProperty("userAgentRegex", options, this);
            copyProperty("disallow", options, this);
            copyProperty("ipRegex", options, this);
            copyProperty("appenders", options, this);
            copyProperty("onceOnly", options, this);
            // Reset seenRegexes, in case onceOnly has been changed.
            this.seenRegexes = [];
            return this;
        };
        // Turns an exception into an object that can be sent to the server.
        Logger.prototype.buildExceptionObject = function (e) {
            var excObject = {};
            if (e.stack) {
                excObject.stack = e.stack;
            }
            else {
                excObject.e = e;
            }
            if (e.message) {
                excObject.message = e.message;
            }
            if (e.name) {
                excObject.name = e.name;
            }
            if (e.data) {
                excObject.data = e.data;
            }
            if (e.inner) {
                excObject.inner = this.buildExceptionObject(e.inner);
            }
            return excObject;
        };
        // Logs a log item.
        // Parameter e contains an exception (or null or undefined).
        //
        // Reason that processing exceptions is done at this low level is that
        // 1) no need to spend the cpu cycles if the logger is switched off
        // 2) fatalException takes both a logObject and an exception, and the logObject
        //    may be a function that should only be executed if the logger is switched on.
        //
        // If an exception is passed in, the contents of logObject is attached to the exception
        // object in a new property logData.
        // The resulting exception object is than worked into a message to the server.
        //
        // If there is no exception, logObject itself is worked into the message to the server.
        Logger.prototype.log = function (level, logObject, e) {
            var i = 0;
            var compositeMessage;
            var excObject;
            // If we can't find any appenders, do nothing
            if (!this.appenders) {
                return this;
            }
            if (((level >= this.level)) && allow(this)) {
                if (e) {
                    excObject = this.buildExceptionObject(e);
                    excObject.logData = stringifyLogObjectFunction(logObject);
                }
                else {
                    excObject = logObject;
                }
                compositeMessage = stringifyLogObject(excObject);
                if (allowMessage(this, compositeMessage.finalString)) {
                    // See whether message is a duplicate
                    if (this.onceOnly) {
                        i = this.onceOnly.length - 1;
                        while (i >= 0) {
                            if (new RegExp(this.onceOnly[i]).test(compositeMessage.finalString)) {
                                if (this.seenRegexes[i]) {
                                    return this;
                                }
                                this.seenRegexes[i] = true;
                            }
                            i--;
                        }
                    }
                    // Pass message to all appenders
                    // Note that these appenders could be Winston transports
                    // https://github.com/flatiron/winston
                    compositeMessage.meta = compositeMessage.meta || {};
                    // Note that if the user is logging an object, compositeMessage.meta will hold a reference to that object.
                    // Do not add fields to compositeMessage.meta, otherwise the user's object will get that field out of the blue.
                    i = this.appenders.length - 1;
                    while (i >= 0) {
                        this.appenders[i].log(levelToString(level), compositeMessage.msg, compositeMessage.meta, function () { }, level, compositeMessage.finalString, this.loggerName);
                        i--;
                    }
                }
            }
            return this;
        };
        Logger.prototype.trace = function (logObject) { return this.log(getTraceLevel(), logObject); };
        Logger.prototype.debug = function (logObject) { return this.log(getDebugLevel(), logObject); };
        Logger.prototype.info = function (logObject) { return this.log(getInfoLevel(), logObject); };
        Logger.prototype.warn = function (logObject) { return this.log(getWarnLevel(), logObject); };
        Logger.prototype.error = function (logObject) { return this.log(getErrorLevel(), logObject); };
        Logger.prototype.fatal = function (logObject) { return this.log(getFatalLevel(), logObject); };
        Logger.prototype.fatalException = function (logObject, e) { return this.log(getFatalLevel(), logObject, e); };
        return Logger;
    }());
    JL.Logger = Logger;
    function createAjaxAppender(appenderName) {
        return new AjaxAppender(appenderName);
    }
    JL.createAjaxAppender = createAjaxAppender;
    function createConsoleAppender(appenderName) {
        return new ConsoleAppender(appenderName);
    }
    JL.createConsoleAppender = createConsoleAppender;
    // -----------------------
    // In the browser, the default appender is the AjaxAppender.
    // Under nodejs (where there is no "window"), use the ConsoleAppender instead.
    // 
    // Do NOT create an AjaxAppender object if you are not on a browser (that is, window is not defined).
    // That would try to create an XmlHttpRequest object, which will crash outside a browser.
    var defaultAppender;
    if (typeof window !== 'undefined') {
        defaultAppender = new AjaxAppender("");
    }
    else {
        defaultAppender = new ConsoleAppender("");
    }
    // Create root logger
    //
    // Note that this is the parent of all other loggers.
    // Logger "x" will be stored at
    // JL.__.x
    // Logger "x.y" at
    // JL.__.x.y
    JL.__ = new JL.Logger("");
    JL.__.setOptions({
        level: JL.getDebugLevel(),
        appenders: [defaultAppender]
    });
})(JL || (JL = {}));
if (typeof exports !== 'undefined') {
    // Allows SystemJs to import jsnlog.js. See
    // https://github.com/mperdeck/jsnlog.js/issues/56
    exports.__esModule = true;
    exports.JL = JL;
}
// Support AMD module format
var define;
if (typeof define == 'function' && define.amd) {
    define('jsnlog', [], function () {
        return JL;
    });
}
// If the __jsnlog_configure global function has been
// created, call it now. This allows you to create a global function
// setting logger options etc. inline in the page before jsnlog.js
// has been loaded.
if (typeof __jsnlog_configure == 'function') {
    __jsnlog_configure(JL);
}
// Create onerror handler to log uncaught exceptions to the server side log, but only if there 
// is no such handler already.
// Must use "typeof window" here, because in NodeJs, window is not defined at all, so cannot refer to window in any way.
if (typeof window !== 'undefined' && !window.onerror) {
    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        // Send object with all data to server side log, using severity fatal, 
        // from logger "onerrorLogger"
        JL("onerrorLogger").fatalException({
            "msg": "Uncaught Exception",
            "errorMsg": errorMsg, "url": url,
            "line number": lineNumber, "column": column
        }, errorObj);
        // Tell browser to run its own error handler as well   
        return false;
    };
}
// Deal with unhandled exceptions thrown in promises
if (typeof window !== 'undefined' && !window.onunhandledrejection) {
    window.onunhandledrejection = function (event) {
        // Send object with all data to server side log, using severity fatal, 
        // from logger "onerrorLogger".
        // Need to check both event.reason.message and event.message,
        // because SystemJs wraps exceptions and throws a new object which doesn't have a reason property.
        // See https://github.com/systemjs/systemjs/issues/1309
        JL("onerrorLogger").fatalException({
            "msg": "unhandledrejection",
            "errorMsg": event.reason ? event.reason.message : event.message || null
        }, event.reason);
    };
}
