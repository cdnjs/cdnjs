/**
 * Copyright 2012 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * log4javascript
 *
 * log4javascript is a logging framework for JavaScript based on log4j
 * for Java. This file contains all core log4javascript code and is the only
 * file required to use log4javascript, unless you require support for
 * document.domain, in which case you will also need console.html, which must be
 * stored in the same directory as the main log4javascript.js file.
 *
 * Author: Tim Down <tim@log4javascript.org>
 * Version: 1.4.3
 * Edition: log4javascript_production
 * Build date: 18 September 2012
 * Website: http://log4javascript.org
 */

/* -------------------------------------------------------------------------- */
// Array-related stuff

// Next three methods are solely for IE5, which is missing them
if (!Array.prototype.push) {
	Array.prototype.push = function() {
		for (var i = 0, len = arguments.length; i < len; i++){
			this[this.length] = arguments[i];
		}
		return this.length;
	};
}

if (!Array.prototype.shift) {
	Array.prototype.shift = function() {
		if (this.length > 0) {
			var firstItem = this[0];
			for (var i = 0, len = this.length - 1; i < len; i++) {
				this[i] = this[i + 1];
			}
			this.length = this.length - 1;
			return firstItem;
		}
	};
}

if (!Array.prototype.splice) {
	Array.prototype.splice = function(startIndex, deleteCount) {
		var itemsAfterDeleted = this.slice(startIndex + deleteCount);
		var itemsDeleted = this.slice(startIndex, startIndex + deleteCount);
		this.length = startIndex;
		// Copy the arguments into a proper Array object
		var argumentsArray = [];
		for (var i = 0, len = arguments.length; i < len; i++) {
			argumentsArray[i] = arguments[i];
		}
		var itemsToAppend = (argumentsArray.length > 2) ?
			itemsAfterDeleted = argumentsArray.slice(2).concat(itemsAfterDeleted) : itemsAfterDeleted;
		for (i = 0, len = itemsToAppend.length; i < len; i++) {
			this.push(itemsToAppend[i]);
		}
		return itemsDeleted;
	};
}

/* -------------------------------------------------------------------------- */

var log4javascript = (function() {

	function isUndefined(obj) {
		return typeof obj == "undefined";
	}

	/* ---------------------------------------------------------------------- */
	// Custom event support

	function EventSupport() {}

	EventSupport.prototype = {
		eventTypes: [],
		eventListeners: {},
		setEventTypes: function(eventTypesParam) {
			if (eventTypesParam instanceof Array) {
				this.eventTypes = eventTypesParam;
				this.eventListeners = {};
				for (var i = 0, len = this.eventTypes.length; i < len; i++) {
					this.eventListeners[this.eventTypes[i]] = [];
				}
			} else {
				handleError("log4javascript.EventSupport [" + this + "]: setEventTypes: eventTypes parameter must be an Array");
			}
		},

		addEventListener: function(eventType, listener) {
			if (typeof listener == "function") {
				if (!array_contains(this.eventTypes, eventType)) {
					handleError("log4javascript.EventSupport [" + this + "]: addEventListener: no event called '" + eventType + "'");
				}
				this.eventListeners[eventType].push(listener);
			} else {
				handleError("log4javascript.EventSupport [" + this + "]: addEventListener: listener must be a function");
			}
		},

		removeEventListener: function(eventType, listener) {
			if (typeof listener == "function") {
				if (!array_contains(this.eventTypes, eventType)) {
					handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: no event called '" + eventType + "'");
				}
				array_remove(this.eventListeners[eventType], listener);
			} else {
				handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: listener must be a function");
			}
		},

		dispatchEvent: function(eventType, eventArgs) {
			if (array_contains(this.eventTypes, eventType)) {
				var listeners = this.eventListeners[eventType];
				for (var i = 0, len = listeners.length; i < len; i++) {
					listeners[i](this, eventType, eventArgs);
				}
			} else {
				handleError("log4javascript.EventSupport [" + this + "]: dispatchEvent: no event called '" + eventType + "'");
			}
		}
	};

	/* -------------------------------------------------------------------------- */

	var applicationStartDate = new Date();
	var uniqueId = "log4javascript_" + applicationStartDate.getTime() + "_" +
		Math.floor(Math.random() * 100000000);
	var emptyFunction = function() {};
	var newLine = "\r\n";
	var pageLoaded = false;

	// Create main log4javascript object; this will be assigned public properties
	function Log4JavaScript() {}
	Log4JavaScript.prototype = new EventSupport();

	log4javascript = new Log4JavaScript();
	log4javascript.version = "1.4.3";
	log4javascript.edition = "log4javascript_production";

	/* -------------------------------------------------------------------------- */
	// Utility functions

	function toStr(obj) {
		if (obj && obj.toString) {
			return obj.toString();
		} else {
			return String(obj);
		}
	}

	function getExceptionMessage(ex) {
		if (ex.message) {
			return ex.message;
		} else if (ex.description) {
			return ex.description;
		} else {
			return toStr(ex);
		}
	}

	// Gets the portion of the URL after the last slash
	function getUrlFileName(url) {
		var lastSlashIndex = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
		return url.substr(lastSlashIndex + 1);
	}

	// Returns a nicely formatted representation of an error
	function getExceptionStringRep(ex) {
		if (ex) {
			var exStr = "Exception: " + getExceptionMessage(ex);
			try {
				if (ex.lineNumber) {
					exStr += " on line number " + ex.lineNumber;
				}
				if (ex.fileName) {
					exStr += " in file " + getUrlFileName(ex.fileName);
				}
			} catch (localEx) {
				logLog.warn("Unable to obtain file and line information for error");
			}
			if (showStackTraces && ex.stack) {
				exStr += newLine + "Stack trace:" + newLine + ex.stack;
			}
			return exStr;
		}
		return null;
	}

	function bool(obj) {
		return Boolean(obj);
	}

	function trim(str) {
		return str.replace(/^\s+/, "").replace(/\s+$/, "");
	}

	function splitIntoLines(text) {
		// Ensure all line breaks are \n only
		var text2 = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		return text2.split("\n");
	}

	var urlEncode = (typeof window.encodeURIComponent != "undefined") ?
		function(str) {
			return encodeURIComponent(str);
		}: 
		function(str) {
			return escape(str).replace(/\+/g, "%2B").replace(/"/g, "%22").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/=/g, "%3D");
		};

	var urlDecode = (typeof window.decodeURIComponent != "undefined") ?
		function(str) {
			return decodeURIComponent(str);
		}: 
		function(str) {
			return unescape(str).replace(/%2B/g, "+").replace(/%22/g, "\"").replace(/%27/g, "'").replace(/%2F/g, "/").replace(/%3D/g, "=");
		};

	function array_remove(arr, val) {
		var index = -1;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] === val) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			arr.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}

	function array_contains(arr, val) {
		for(var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] == val) {
				return true;
			}
		}
		return false;
	}

	function extractBooleanFromParam(param, defaultValue) {
		if (isUndefined(param)) {
			return defaultValue;
		} else {
			return bool(param);
		}
	}

	function extractStringFromParam(param, defaultValue) {
		if (isUndefined(param)) {
			return defaultValue;
		} else {
			return String(param);
		}
	}

	function extractIntFromParam(param, defaultValue) {
		if (isUndefined(param)) {
			return defaultValue;
		} else {
			try {
				var value = parseInt(param, 10);
				return isNaN(value) ? defaultValue : value;
			} catch (ex) {
				logLog.warn("Invalid int param " + param, ex);
				return defaultValue;
			}
		}
	}

	function extractFunctionFromParam(param, defaultValue) {
		if (typeof param == "function") {
			return param;
		} else {
			return defaultValue;
		}
	}

	function isError(err) {
		return (err instanceof Error);
	}

	if (!Function.prototype.apply){
		Function.prototype.apply = function(obj, args) {
			var methodName = "__apply__";
			if (typeof obj[methodName] != "undefined") {
				methodName += String(Math.random()).substr(2);
			}
			obj[methodName] = this;

			var argsStrings = [];
			for (var i = 0, len = args.length; i < len; i++) {
				argsStrings[i] = "args[" + i + "]";
			}
			var script = "obj." + methodName + "(" + argsStrings.join(",") + ")";
			var returnValue = eval(script);
			delete obj[methodName];
			return returnValue;
		};
	}

	if (!Function.prototype.call){
		Function.prototype.call = function(obj) {
			var args = [];
			for (var i = 1, len = arguments.length; i < len; i++) {
				args[i - 1] = arguments[i];
			}
			return this.apply(obj, args);
		};
	}

	function getListenersPropertyName(eventName) {
		return "__log4javascript_listeners__" + eventName;
	}

	function addEvent(node, eventName, listener, useCapture, win) {
		win = win ? win : window;
		if (node.addEventListener) {
			node.addEventListener(eventName, listener, useCapture);
		} else if (node.attachEvent) {
			node.attachEvent("on" + eventName, listener);
		} else {
			var propertyName = getListenersPropertyName(eventName);
			if (!node[propertyName]) {
				node[propertyName] = [];
				// Set event handler
				node["on" + eventName] = function(evt) {
					evt = getEvent(evt, win);
					var listenersPropertyName = getListenersPropertyName(eventName);

					// Clone the array of listeners to leave the original untouched
					var listeners = this[listenersPropertyName].concat([]);
					var currentListener;

					// Call each listener in turn
					while ((currentListener = listeners.shift())) {
						currentListener.call(this, evt);
					}
				};
			}
			node[propertyName].push(listener);
		}
	}

	function removeEvent(node, eventName, listener, useCapture) {
		if (node.removeEventListener) {
			node.removeEventListener(eventName, listener, useCapture);
		} else if (node.detachEvent) {
			node.detachEvent("on" + eventName, listener);
		} else {
			var propertyName = getListenersPropertyName(eventName);
			if (node[propertyName]) {
				array_remove(node[propertyName], listener);
			}
		}
	}

	function getEvent(evt, win) {
		win = win ? win : window;
		return evt ? evt : win.event;
	}

	function stopEventPropagation(evt) {
		if (evt.stopPropagation) {
			evt.stopPropagation();
		} else if (typeof evt.cancelBubble != "undefined") {
			evt.cancelBubble = true;
		}
		evt.returnValue = false;
	}

	/* ---------------------------------------------------------------------- */
	// Simple logging for log4javascript itself

	var logLog = {
		quietMode: false,

		debugMessages: [],

		setQuietMode: function(quietMode) {
			this.quietMode = bool(quietMode);
		},

		numberOfErrors: 0,

		alertAllErrors: false,

		setAlertAllErrors: function(alertAllErrors) {
			this.alertAllErrors = alertAllErrors;
		},

		debug: function(message) {
			this.debugMessages.push(message);
		},

		displayDebug: function() {
			alert(this.debugMessages.join(newLine));
		},

		warn: function(message, exception) {
		},

		error: function(message, exception) {
			if (++this.numberOfErrors == 1 || this.alertAllErrors) {
				if (!this.quietMode) {
					var alertMessage = "log4javascript error: " + message;
					if (exception) {
						alertMessage += newLine + newLine + "Original error: " + getExceptionStringRep(exception);
					}
					alert(alertMessage);
				}
			}
		}
	};
	log4javascript.logLog = logLog;

	log4javascript.setEventTypes(["load", "error"]);

	function handleError(message, exception) {
		logLog.error(message, exception);
		log4javascript.dispatchEvent("error", { "message": message, "exception": exception });
	}

	log4javascript.handleError = handleError;

	/* ---------------------------------------------------------------------- */

	var enabled = !((typeof log4javascript_disabled != "undefined") &&
					log4javascript_disabled);

	log4javascript.setEnabled = function(enable) {
		enabled = bool(enable);
	};

	log4javascript.isEnabled = function() {
		return enabled;
	};

	var useTimeStampsInMilliseconds = true;

	log4javascript.setTimeStampsInMilliseconds = function(timeStampsInMilliseconds) {
		useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds);
	};

	log4javascript.isTimeStampsInMilliseconds = function() {
		return useTimeStampsInMilliseconds;
	};
	

	// This evaluates the given expression in the current scope, thus allowing
	// scripts to access private variables. Particularly useful for testing
	log4javascript.evalInScope = function(expr) {
		return eval(expr);
	};

	var showStackTraces = false;

	log4javascript.setShowStackTraces = function(show) {
		showStackTraces = bool(show);
	};

	/* ---------------------------------------------------------------------- */
	// Levels

	var Level = function(level, name) {
		this.level = level;
		this.name = name;
	};

	Level.prototype = {
		toString: function() {
			return this.name;
		},
		equals: function(level) {
			return this.level == level.level;
		},
		isGreaterOrEqual: function(level) {
			return this.level >= level.level;
		}
	};

	Level.ALL = new Level(Number.MIN_VALUE, "ALL");
	Level.TRACE = new Level(10000, "TRACE");
	Level.DEBUG = new Level(20000, "DEBUG");
	Level.INFO = new Level(30000, "INFO");
	Level.WARN = new Level(40000, "WARN");
	Level.ERROR = new Level(50000, "ERROR");
	Level.FATAL = new Level(60000, "FATAL");
	Level.OFF = new Level(Number.MAX_VALUE, "OFF");

	log4javascript.Level = Level;

	/* ---------------------------------------------------------------------- */
	// Timers

	function Timer(name, level) {
		this.name = name;
		this.level = isUndefined(level) ? Level.INFO : level;
		this.start = new Date();
	}

	Timer.prototype.getElapsedTime = function() {
		return new Date().getTime() - this.start.getTime();
	};

	/* ---------------------------------------------------------------------- */
	// Loggers

	var anonymousLoggerName = "[anonymous]";
	var defaultLoggerName = "[default]";
	var nullLoggerName = "[null]";
	var rootLoggerName = "root";

	function Logger(name) {
		this.name = name;
		this.parent = null;
		this.children = [];

		var appenders = [];
		var loggerLevel = null;
		var isRoot = (this.name === rootLoggerName);
		var isNull = (this.name === nullLoggerName);

		var appenderCache = null;
		var appenderCacheInvalidated = false;
		
		this.addChild = function(childLogger) {
			this.children.push(childLogger);
			childLogger.parent = this;
			childLogger.invalidateAppenderCache();
		};

		// Additivity
		var additive = true;
		this.getAdditivity = function() {
			return additive;
		};

		this.setAdditivity = function(additivity) {
			var valueChanged = (additive != additivity);
			additive = additivity;
			if (valueChanged) {
				this.invalidateAppenderCache();
			}
		};

		// Create methods that use the appenders variable in this scope
		this.addAppender = function(appender) {
			if (isNull) {
				handleError("Logger.addAppender: you may not add an appender to the null logger");
			} else {
				if (appender instanceof log4javascript.Appender) {
					if (!array_contains(appenders, appender)) {
						appenders.push(appender);
						appender.setAddedToLogger(this);
						this.invalidateAppenderCache();
					}
				} else {
					handleError("Logger.addAppender: appender supplied ('" +
						toStr(appender) + "') is not a subclass of Appender");
				}
			}
		};

		this.removeAppender = function(appender) {
			array_remove(appenders, appender);
			appender.setRemovedFromLogger(this);
			this.invalidateAppenderCache();
		};

		this.removeAllAppenders = function() {
			var appenderCount = appenders.length;
			if (appenderCount > 0) {
				for (var i = 0; i < appenderCount; i++) {
					appenders[i].setRemovedFromLogger(this);
				}
				appenders.length = 0;
				this.invalidateAppenderCache();
			}
		};

		this.getEffectiveAppenders = function() {
			if (appenderCache === null || appenderCacheInvalidated) {
				// Build appender cache
				var parentEffectiveAppenders = (isRoot || !this.getAdditivity()) ?
					[] : this.parent.getEffectiveAppenders();
				appenderCache = parentEffectiveAppenders.concat(appenders);
				appenderCacheInvalidated = false;
			}
			return appenderCache;
		};
		
		this.invalidateAppenderCache = function() {
			appenderCacheInvalidated = true;
			for (var i = 0, len = this.children.length; i < len; i++) {
				this.children[i].invalidateAppenderCache();
			}
		};

		this.log = function(level, params) {
			if (enabled && level.isGreaterOrEqual(this.getEffectiveLevel())) {
				// Check whether last param is an exception
				var exception;
				var finalParamIndex = params.length - 1;
				var lastParam = params[finalParamIndex];
				if (params.length > 1 && isError(lastParam)) {
					exception = lastParam;
					finalParamIndex--;
				}

				// Construct genuine array for the params
				var messages = [];
				for (var i = 0; i <= finalParamIndex; i++) {
					messages[i] = params[i];
				}

				var loggingEvent = new LoggingEvent(
					this, new Date(), level, messages, exception);

				this.callAppenders(loggingEvent);
			}
		};

		this.callAppenders = function(loggingEvent) {
			var effectiveAppenders = this.getEffectiveAppenders();
			for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
				effectiveAppenders[i].doAppend(loggingEvent);
			}
		};

		this.setLevel = function(level) {
			// Having a level of null on the root logger would be very bad.
			if (isRoot && level === null) {
				handleError("Logger.setLevel: you cannot set the level of the root logger to null");
			} else if (level instanceof Level) {
				loggerLevel = level;
			} else {
				handleError("Logger.setLevel: level supplied to logger " +
					this.name + " is not an instance of log4javascript.Level");
			}
		};

		this.getLevel = function() {
			return loggerLevel;
		};

		this.getEffectiveLevel = function() {
			for (var logger = this; logger !== null; logger = logger.parent) {
				var level = logger.getLevel();
				if (level !== null) {
					return level;
				}
			}
		};

		this.group = function(name, initiallyExpanded) {
			if (enabled) {
				var effectiveAppenders = this.getEffectiveAppenders();
				for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
					effectiveAppenders[i].group(name, initiallyExpanded);
				}
			}
		};

		this.groupEnd = function(name) {
			if (enabled) {
				var effectiveAppenders = this.getEffectiveAppenders();
				for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
					effectiveAppenders[i].groupEnd();
				}
			}
		};

		var timers = {};

		this.time = function(name, level) {
			if (enabled) {
				if (isUndefined(name)) {
					handleError("Logger.time: a name for the timer must be supplied");
				} else if (level && !(level instanceof Level)) {
					handleError("Logger.time: level supplied to timer " +
						name + " is not an instance of log4javascript.Level");
				} else {
					timers[name] = new Timer(name, level);
				}
			}
		};

		this.timeEnd = function(name) {
			if (enabled) {
				if (isUndefined(name)) {
					handleError("Logger.timeEnd: a name for the timer must be supplied");
				} else if (timers[name]) {
					var timer = timers[name];
					var milliseconds = timer.getElapsedTime();
					this.log(timer.level, ["Timer " + toStr(name) + " completed in " + milliseconds + "ms"]);
					delete timers[name];
				} else {
					logLog.warn("Logger.timeEnd: no timer found with name " + name);
				}
			}
		};

		this.assert = function(expr) {
			if (enabled && !expr) {
				var args = [];
				for (var i = 1, len = arguments.length; i < len; i++) {
					args.push(arguments[i]);
				}
				args = (args.length > 0) ? args : ["Assertion Failure"];
				args.push(newLine);
				args.push(expr);
				this.log(Level.ERROR, args);
			}
		};

		this.toString = function() {
			return "Logger[" + this.name + "]";
		};
	}

	Logger.prototype = {
		trace: function() {
			this.log(Level.TRACE, arguments);
		},

		debug: function() {
			this.log(Level.DEBUG, arguments);
		},

		info: function() {
			this.log(Level.INFO, arguments);
		},

		warn: function() {
			this.log(Level.WARN, arguments);
		},

		error: function() {
			this.log(Level.ERROR, arguments);
		},

		fatal: function() {
			this.log(Level.FATAL, arguments);
		},

		isEnabledFor: function(level) {
			return level.isGreaterOrEqual(this.getEffectiveLevel());
		},

		isTraceEnabled: function() {
			return this.isEnabledFor(Level.TRACE);
		},

		isDebugEnabled: function() {
			return this.isEnabledFor(Level.DEBUG);
		},

		isInfoEnabled: function() {
			return this.isEnabledFor(Level.INFO);
		},

		isWarnEnabled: function() {
			return this.isEnabledFor(Level.WARN);
		},

		isErrorEnabled: function() {
			return this.isEnabledFor(Level.ERROR);
		},

		isFatalEnabled: function() {
			return this.isEnabledFor(Level.FATAL);
		}
	};

	Logger.prototype.trace.isEntryPoint = true;
	Logger.prototype.debug.isEntryPoint = true;
	Logger.prototype.info.isEntryPoint = true;
	Logger.prototype.warn.isEntryPoint = true;
	Logger.prototype.error.isEntryPoint = true;
	Logger.prototype.fatal.isEntryPoint = true;

	/* ---------------------------------------------------------------------- */
	// Logger access methods

	// Hashtable of loggers keyed by logger name
	var loggers = {};
	var loggerNames = [];

	var ROOT_LOGGER_DEFAULT_LEVEL = Level.DEBUG;
	var rootLogger = new Logger(rootLoggerName);
	rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);

	log4javascript.getRootLogger = function() {
		return rootLogger;
	};

	log4javascript.getLogger = function(loggerName) {
		// Use default logger if loggerName is not specified or invalid
		if (!(typeof loggerName == "string")) {
			loggerName = anonymousLoggerName;
			logLog.warn("log4javascript.getLogger: non-string logger name "	+
				toStr(loggerName) + " supplied, returning anonymous logger");
		}

		// Do not allow retrieval of the root logger by name
		if (loggerName == rootLoggerName) {
			handleError("log4javascript.getLogger: root logger may not be obtained by name");
		}

		// Create the logger for this name if it doesn't already exist
		if (!loggers[loggerName]) {
			var logger = new Logger(loggerName);
			loggers[loggerName] = logger;
			loggerNames.push(loggerName);

			// Set up parent logger, if it doesn't exist
			var lastDotIndex = loggerName.lastIndexOf(".");
			var parentLogger;
			if (lastDotIndex > -1) {
				var parentLoggerName = loggerName.substring(0, lastDotIndex);
				parentLogger = log4javascript.getLogger(parentLoggerName); // Recursively sets up grandparents etc.
			} else {
				parentLogger = rootLogger;
			}
			parentLogger.addChild(logger);
		}
		return loggers[loggerName];
	};

	var defaultLogger = null;
	log4javascript.getDefaultLogger = function() {
		if (!defaultLogger) {
			defaultLogger = log4javascript.getLogger(defaultLoggerName);
			var a = new log4javascript.PopUpAppender();
			defaultLogger.addAppender(a);
		}
		return defaultLogger;
	};

	var nullLogger = null;
	log4javascript.getNullLogger = function() {
		if (!nullLogger) {
			nullLogger = new Logger(nullLoggerName);
			nullLogger.setLevel(Level.OFF);
		}
		return nullLogger;
	};

	// Destroys all loggers
	log4javascript.resetConfiguration = function() {
		rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
		loggers = {};
	};

	/* ---------------------------------------------------------------------- */
	// Logging events

	var LoggingEvent = function(logger, timeStamp, level, messages,
			exception) {
		this.logger = logger;
		this.timeStamp = timeStamp;
		this.timeStampInMilliseconds = timeStamp.getTime();
		this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000);
		this.milliseconds = this.timeStamp.getMilliseconds();
		this.level = level;
		this.messages = messages;
		this.exception = exception;
	};

	LoggingEvent.prototype = {
		getThrowableStrRep: function() {
			return this.exception ?
				getExceptionStringRep(this.exception) : "";
		},
		getCombinedMessages: function() {
			return (this.messages.length == 1) ? this.messages[0] :
				   this.messages.join(newLine);
		},
		toString: function() {
			return "LoggingEvent[" + this.level + "]";
		}
	};

	log4javascript.LoggingEvent = LoggingEvent;

	/* ---------------------------------------------------------------------- */
	// Layout prototype

	var Layout = function() {
	};

	Layout.prototype = {
		defaults: {
			loggerKey: "logger",
			timeStampKey: "timestamp",
			millisecondsKey: "milliseconds",
			levelKey: "level",
			messageKey: "message",
			exceptionKey: "exception",
			urlKey: "url"
		},
		loggerKey: "logger",
		timeStampKey: "timestamp",
		millisecondsKey: "milliseconds",
		levelKey: "level",
		messageKey: "message",
		exceptionKey: "exception",
		urlKey: "url",
		batchHeader: "",
		batchFooter: "",
		batchSeparator: "",
		returnsPostData: false,
		overrideTimeStampsSetting: false,
		useTimeStampsInMilliseconds: null,

		format: function() {
			handleError("Layout.format: layout supplied has no format() method");
		},

		ignoresThrowable: function() {
			handleError("Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method");
		},

		getContentType: function() {
			return "text/plain";
		},

		allowBatching: function() {
			return true;
		},

		setTimeStampsInMilliseconds: function(timeStampsInMilliseconds) {
			this.overrideTimeStampsSetting = true;
			this.useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds);
		},

		isTimeStampsInMilliseconds: function() {
			return this.overrideTimeStampsSetting ?
				this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds;
		},

		getTimeStampValue: function(loggingEvent) {
			return this.isTimeStampsInMilliseconds() ?
				loggingEvent.timeStampInMilliseconds : loggingEvent.timeStampInSeconds;
		},

		getDataValues: function(loggingEvent, combineMessages) {
			var dataValues = [
				[this.loggerKey, loggingEvent.logger.name],
				[this.timeStampKey, this.getTimeStampValue(loggingEvent)],
				[this.levelKey, loggingEvent.level.name],
				[this.urlKey, window.location.href],
				[this.messageKey, combineMessages ? loggingEvent.getCombinedMessages() : loggingEvent.messages]
			];
			if (!this.isTimeStampsInMilliseconds()) {
				dataValues.push([this.millisecondsKey, loggingEvent.milliseconds]);
			}
			if (loggingEvent.exception) {
				dataValues.push([this.exceptionKey, getExceptionStringRep(loggingEvent.exception)]);
			}
			if (this.hasCustomFields()) {
				for (var i = 0, len = this.customFields.length; i < len; i++) {
					var val = this.customFields[i].value;

					// Check if the value is a function. If so, execute it, passing it the
					// current layout and the logging event
					if (typeof val === "function") {
						val = val(this, loggingEvent);
					}
					dataValues.push([this.customFields[i].name, val]);
				}
			}
			return dataValues;
		},

		setKeys: function(loggerKey, timeStampKey, levelKey, messageKey,
				exceptionKey, urlKey, millisecondsKey) {
			this.loggerKey = extractStringFromParam(loggerKey, this.defaults.loggerKey);
			this.timeStampKey = extractStringFromParam(timeStampKey, this.defaults.timeStampKey);
			this.levelKey = extractStringFromParam(levelKey, this.defaults.levelKey);
			this.messageKey = extractStringFromParam(messageKey, this.defaults.messageKey);
			this.exceptionKey = extractStringFromParam(exceptionKey, this.defaults.exceptionKey);
			this.urlKey = extractStringFromParam(urlKey, this.defaults.urlKey);
			this.millisecondsKey = extractStringFromParam(millisecondsKey, this.defaults.millisecondsKey);
		},

		setCustomField: function(name, value) {
			var fieldUpdated = false;
			for (var i = 0, len = this.customFields.length; i < len; i++) {
				if (this.customFields[i].name === name) {
					this.customFields[i].value = value;
					fieldUpdated = true;
				}
			}
			if (!fieldUpdated) {
				this.customFields.push({"name": name, "value": value});
			}
		},

		hasCustomFields: function() {
			return (this.customFields.length > 0);
		},

		toString: function() {
			handleError("Layout.toString: all layouts must override this method");
		}
	};

	log4javascript.Layout = Layout;

	/* ---------------------------------------------------------------------- */
	// Appender prototype

	var Appender = function() {};

	Appender.prototype = new EventSupport();

	Appender.prototype.layout = new PatternLayout();
	Appender.prototype.threshold = Level.ALL;
	Appender.prototype.loggers = [];

	// Performs threshold checks before delegating actual logging to the
	// subclass's specific append method.
	Appender.prototype.doAppend = function(loggingEvent) {
		if (enabled && loggingEvent.level.level >= this.threshold.level) {
			this.append(loggingEvent);
		}
	};

	Appender.prototype.append = function(loggingEvent) {};

	Appender.prototype.setLayout = function(layout) {
		if (layout instanceof Layout) {
			this.layout = layout;
		} else {
			handleError("Appender.setLayout: layout supplied to " +
				this.toString() + " is not a subclass of Layout");
		}
	};

	Appender.prototype.getLayout = function() {
		return this.layout;
	};

	Appender.prototype.setThreshold = function(threshold) {
		if (threshold instanceof Level) {
			this.threshold = threshold;
		} else {
			handleError("Appender.setThreshold: threshold supplied to " +
				this.toString() + " is not a subclass of Level");
		}
	};

	Appender.prototype.getThreshold = function() {
		return this.threshold;
	};

	Appender.prototype.setAddedToLogger = function(logger) {
		this.loggers.push(logger);
	};

	Appender.prototype.setRemovedFromLogger = function(logger) {
		array_remove(this.loggers, logger);
	};

	Appender.prototype.group = emptyFunction;
	Appender.prototype.groupEnd = emptyFunction;

	Appender.prototype.toString = function() {
		handleError("Appender.toString: all appenders must override this method");
	};

	log4javascript.Appender = Appender;

	/* ---------------------------------------------------------------------- */
	// SimpleLayout 

	function SimpleLayout() {
		this.customFields = [];
	}

	SimpleLayout.prototype = new Layout();

	SimpleLayout.prototype.format = function(loggingEvent) {
		return loggingEvent.level.name + " - " + loggingEvent.getCombinedMessages();
	};

	SimpleLayout.prototype.ignoresThrowable = function() {
	    return true;
	};

	SimpleLayout.prototype.toString = function() {
	    return "SimpleLayout";
	};

	log4javascript.SimpleLayout = SimpleLayout;
	/* ----------------------------------------------------------------------- */
	// NullLayout 

	function NullLayout() {
		this.customFields = [];
	}

	NullLayout.prototype = new Layout();

	NullLayout.prototype.format = function(loggingEvent) {
		return loggingEvent.messages;
	};

	NullLayout.prototype.ignoresThrowable = function() {
	    return true;
	};

	NullLayout.prototype.toString = function() {
	    return "NullLayout";
	};

	log4javascript.NullLayout = NullLayout;
/* ---------------------------------------------------------------------- */
	// XmlLayout

	function XmlLayout(combineMessages) {
		this.combineMessages = extractBooleanFromParam(combineMessages, true);
		this.customFields = [];
	}

	XmlLayout.prototype = new Layout();

	XmlLayout.prototype.isCombinedMessages = function() {
		return this.combineMessages;
	};

	XmlLayout.prototype.getContentType = function() {
		return "text/xml";
	};

	XmlLayout.prototype.escapeCdata = function(str) {
		return str.replace(/\]\]>/, "]]>]]&gt;<![CDATA[");
	};

	XmlLayout.prototype.format = function(loggingEvent) {
		var layout = this;
		var i, len;
		function formatMessage(message) {
			message = (typeof message === "string") ? message : toStr(message);
			return "<log4javascript:message><![CDATA[" +
				layout.escapeCdata(message) + "]]></log4javascript:message>";
		}

		var str = "<log4javascript:event logger=\"" + loggingEvent.logger.name +
			"\" timestamp=\"" + this.getTimeStampValue(loggingEvent) + "\"";
		if (!this.isTimeStampsInMilliseconds()) {
			str += " milliseconds=\"" + loggingEvent.milliseconds + "\"";
		}
		str += " level=\"" + loggingEvent.level.name + "\">" + newLine;
		if (this.combineMessages) {
			str += formatMessage(loggingEvent.getCombinedMessages());
		} else {
			str += "<log4javascript:messages>" + newLine;
			for (i = 0, len = loggingEvent.messages.length; i < len; i++) {
				str += formatMessage(loggingEvent.messages[i]) + newLine;
			}
			str += "</log4javascript:messages>" + newLine;
		}
		if (this.hasCustomFields()) {
			for (i = 0, len = this.customFields.length; i < len; i++) {
				str += "<log4javascript:customfield name=\"" +
					this.customFields[i].name + "\"><![CDATA[" +
					this.customFields[i].value.toString() +
					"]]></log4javascript:customfield>" + newLine;
			}
		}
		if (loggingEvent.exception) {
			str += "<log4javascript:exception><![CDATA[" +
				getExceptionStringRep(loggingEvent.exception) +
				"]]></log4javascript:exception>" + newLine;
		}
		str += "</log4javascript:event>" + newLine + newLine;
		return str;
	};

	XmlLayout.prototype.ignoresThrowable = function() {
	    return false;
	};

	XmlLayout.prototype.toString = function() {
	    return "XmlLayout";
	};

	log4javascript.XmlLayout = XmlLayout;
	/* ---------------------------------------------------------------------- */
	// JsonLayout related

	function escapeNewLines(str) {
		return str.replace(/\r\n|\r|\n/g, "\\r\\n");
	}

	function JsonLayout(readable, combineMessages) {
		this.readable = extractBooleanFromParam(readable, false);
		this.combineMessages = extractBooleanFromParam(combineMessages, true);
		this.batchHeader = this.readable ? "[" + newLine : "[";
		this.batchFooter = this.readable ? "]" + newLine : "]";
		this.batchSeparator = this.readable ? "," + newLine : ",";
		this.setKeys();
		this.colon = this.readable ? ": " : ":";
		this.tab = this.readable ? "\t" : "";
		this.lineBreak = this.readable ? newLine : "";
		this.customFields = [];
	}

	/* ---------------------------------------------------------------------- */
	// JsonLayout

	JsonLayout.prototype = new Layout();

	JsonLayout.prototype.isReadable = function() {
		return this.readable;
	};

	JsonLayout.prototype.isCombinedMessages = function() {
		return this.combineMessages;
	};

    JsonLayout.prototype.format = function(loggingEvent) {
        var layout = this;
        var dataValues = this.getDataValues(loggingEvent, this.combineMessages);
        var str = "{" + this.lineBreak;
        var i, len;

        function formatValue(val, prefix, expand) {
            // Check the type of the data value to decide whether quotation marks
            // or expansion are required
            var formattedValue;
            var valType = typeof val;
            if (val instanceof Date) {
                formattedValue = String(val.getTime());
            } else if (expand && (val instanceof Array)) {
                formattedValue = "[" + layout.lineBreak;
                for (var i = 0, len = val.length; i < len; i++) {
                    var childPrefix = prefix + layout.tab;
                    formattedValue += childPrefix + formatValue(val[i], childPrefix, false);
                    if (i < val.length - 1) {
                        formattedValue += ",";
                    }
                    formattedValue += layout.lineBreak;
                }
                formattedValue += prefix + "]";
            } else if (valType !== "number" && valType !== "boolean") {
                formattedValue = "\"" + escapeNewLines(toStr(val).replace(/\"/g, "\\\"")) + "\"";
            } else {
                formattedValue = val;
            }
            return formattedValue;
        }

        for (i = 0, len = dataValues.length - 1; i <= len; i++) {
            str += this.tab + "\"" + dataValues[i][0] + "\"" + this.colon + formatValue(dataValues[i][1], this.tab, true);
            if (i < len) {
                str += ",";
            }
            str += this.lineBreak;
        }

        str += "}" + this.lineBreak;
        return str;
    };

	JsonLayout.prototype.ignoresThrowable = function() {
	    return false;
	};

	JsonLayout.prototype.toString = function() {
	    return "JsonLayout";
	};

	JsonLayout.prototype.getContentType = function() {
		return "application/json";
	};

	log4javascript.JsonLayout = JsonLayout;
	/* ---------------------------------------------------------------------- */
	// HttpPostDataLayout

	function HttpPostDataLayout() {
		this.setKeys();
		this.customFields = [];
		this.returnsPostData = true;
	}

	HttpPostDataLayout.prototype = new Layout();

	// Disable batching
	HttpPostDataLayout.prototype.allowBatching = function() {
		return false;
	};

	HttpPostDataLayout.prototype.format = function(loggingEvent) {
		var dataValues = this.getDataValues(loggingEvent);
		var queryBits = [];
		for (var i = 0, len = dataValues.length; i < len; i++) {
			var val = (dataValues[i][1] instanceof Date) ?
				String(dataValues[i][1].getTime()) : dataValues[i][1];
			queryBits.push(urlEncode(dataValues[i][0]) + "=" + urlEncode(val));
		}
		return queryBits.join("&");
	};

	HttpPostDataLayout.prototype.ignoresThrowable = function(loggingEvent) {
	    return false;
	};

	HttpPostDataLayout.prototype.toString = function() {
	    return "HttpPostDataLayout";
	};

	log4javascript.HttpPostDataLayout = HttpPostDataLayout;
	/* ---------------------------------------------------------------------- */
	// formatObjectExpansion

	function formatObjectExpansion(obj, depth, indentation) {
		var objectsExpanded = [];

		function doFormat(obj, depth, indentation) {
			var i, j, len, childDepth, childIndentation, childLines, expansion,
				childExpansion;

			if (!indentation) {
				indentation = "";
			}

			function formatString(text) {
				var lines = splitIntoLines(text);
				for (var j = 1, jLen = lines.length; j < jLen; j++) {
					lines[j] = indentation + lines[j];
				}
				return lines.join(newLine);
			}

			if (obj === null) {
				return "null";
			} else if (typeof obj == "undefined") {
				return "undefined";
			} else if (typeof obj == "string") {
				return formatString(obj);
			} else if (typeof obj == "object" && array_contains(objectsExpanded, obj)) {
				try {
					expansion = toStr(obj);
				} catch (ex) {
					expansion = "Error formatting property. Details: " + getExceptionStringRep(ex);
				}
				return expansion + " [already expanded]";
			} else if ((obj instanceof Array) && depth > 0) {
				objectsExpanded.push(obj);
				expansion = "[" + newLine;
				childDepth = depth - 1;
				childIndentation = indentation + "  ";
				childLines = [];
				for (i = 0, len = obj.length; i < len; i++) {
					try {
						childExpansion = doFormat(obj[i], childDepth, childIndentation);
						childLines.push(childIndentation + childExpansion);
					} catch (ex) {
						childLines.push(childIndentation + "Error formatting array member. Details: " +
							getExceptionStringRep(ex) + "");
					}
				}
				expansion += childLines.join("," + newLine) + newLine + indentation + "]";
				return expansion;
            } else if (Object.prototype.toString.call(obj) == "[object Date]") {
                return obj.toString();
			} else if (typeof obj == "object" && depth > 0) {
				objectsExpanded.push(obj);
				expansion = "{" + newLine;
				childDepth = depth - 1;
				childIndentation = indentation + "  ";
				childLines = [];
				for (i in obj) {
					try {
						childExpansion = doFormat(obj[i], childDepth, childIndentation);
						childLines.push(childIndentation + i + ": " + childExpansion);
					} catch (ex) {
						childLines.push(childIndentation + i + ": Error formatting property. Details: " +
							getExceptionStringRep(ex));
					}
				}
				expansion += childLines.join("," + newLine) + newLine + indentation + "}";
				return expansion;
			} else {
				return formatString(toStr(obj));
			}
		}
		return doFormat(obj, depth, indentation);
	}
	/* ---------------------------------------------------------------------- */
	// Date-related stuff

	var SimpleDateFormat;

	(function() {
		var regex = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/;
		var monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];
		var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var TEXT2 = 0, TEXT3 = 1, NUMBER = 2, YEAR = 3, MONTH = 4, TIMEZONE = 5;
		var types = {
			G : TEXT2,
			y : YEAR,
			M : MONTH,
			w : NUMBER,
			W : NUMBER,
			D : NUMBER,
			d : NUMBER,
			F : NUMBER,
			E : TEXT3,
			a : TEXT2,
			H : NUMBER,
			k : NUMBER,
			K : NUMBER,
			h : NUMBER,
			m : NUMBER,
			s : NUMBER,
			S : NUMBER,
			Z : TIMEZONE
		};
		var ONE_DAY = 24 * 60 * 60 * 1000;
		var ONE_WEEK = 7 * ONE_DAY;
		var DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK = 1;

		var newDateAtMidnight = function(year, month, day) {
			var d = new Date(year, month, day, 0, 0, 0);
			d.setMilliseconds(0);
			return d;
		};

		Date.prototype.getDifference = function(date) {
			return this.getTime() - date.getTime();
		};

		Date.prototype.isBefore = function(d) {
			return this.getTime() < d.getTime();
		};

		Date.prototype.getUTCTime = function() {
			return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(),
					this.getSeconds(), this.getMilliseconds());
		};

		Date.prototype.getTimeSince = function(d) {
			return this.getUTCTime() - d.getUTCTime();
		};

		Date.prototype.getPreviousSunday = function() {
			// Using midday avoids any possibility of DST messing things up
			var midday = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0);
			var previousSunday = new Date(midday.getTime() - this.getDay() * ONE_DAY);
			return newDateAtMidnight(previousSunday.getFullYear(), previousSunday.getMonth(),
					previousSunday.getDate());
		};

		Date.prototype.getWeekInYear = function(minimalDaysInFirstWeek) {
			if (isUndefined(this.minimalDaysInFirstWeek)) {
				minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
			}
			var previousSunday = this.getPreviousSunday();
			var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
			var numberOfSundays = previousSunday.isBefore(startOfYear) ?
				0 : 1 + Math.floor(previousSunday.getTimeSince(startOfYear) / ONE_WEEK);
			var numberOfDaysInFirstWeek =  7 - startOfYear.getDay();
			var weekInYear = numberOfSundays;
			if (numberOfDaysInFirstWeek < minimalDaysInFirstWeek) {
				weekInYear--;
			}
			return weekInYear;
		};

		Date.prototype.getWeekInMonth = function(minimalDaysInFirstWeek) {
			if (isUndefined(this.minimalDaysInFirstWeek)) {
				minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;
			}
			var previousSunday = this.getPreviousSunday();
			var startOfMonth = newDateAtMidnight(this.getFullYear(), this.getMonth(), 1);
			var numberOfSundays = previousSunday.isBefore(startOfMonth) ?
				0 : 1 + Math.floor(previousSunday.getTimeSince(startOfMonth) / ONE_WEEK);
			var numberOfDaysInFirstWeek =  7 - startOfMonth.getDay();
			var weekInMonth = numberOfSundays;
			if (numberOfDaysInFirstWeek >= minimalDaysInFirstWeek) {
				weekInMonth++;
			}
			return weekInMonth;
		};

		Date.prototype.getDayInYear = function() {
			var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
			return 1 + Math.floor(this.getTimeSince(startOfYear) / ONE_DAY);
		};

		/* ------------------------------------------------------------------ */

		SimpleDateFormat = function(formatString) {
			this.formatString = formatString;
		};

		/**
		 * Sets the minimum number of days in a week in order for that week to
		 * be considered as belonging to a particular month or year
		 */
		SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function(days) {
			this.minimalDaysInFirstWeek = days;
		};

		SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function() {
			return isUndefined(this.minimalDaysInFirstWeek)	?
				DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK : this.minimalDaysInFirstWeek;
		};

		var padWithZeroes = function(str, len) {
			while (str.length < len) {
				str = "0" + str;
			}
			return str;
		};

		var formatText = function(data, numberOfLetters, minLength) {
			return (numberOfLetters >= 4) ? data : data.substr(0, Math.max(minLength, numberOfLetters));
		};

		var formatNumber = function(data, numberOfLetters) {
			var dataString = "" + data;
			// Pad with 0s as necessary
			return padWithZeroes(dataString, numberOfLetters);
		};

		SimpleDateFormat.prototype.format = function(date) {
			var formattedString = "";
			var result;
			var searchString = this.formatString;
			while ((result = regex.exec(searchString))) {
				var quotedString = result[1];
				var patternLetters = result[2];
				var otherLetters = result[3];
				var otherCharacters = result[4];

				// If the pattern matched is quoted string, output the text between the quotes
				if (quotedString) {
					if (quotedString == "''") {
						formattedString += "'";
					} else {
						formattedString += quotedString.substring(1, quotedString.length - 1);
					}
				} else if (otherLetters) {
					// Swallow non-pattern letters by doing nothing here
				} else if (otherCharacters) {
					// Simply output other characters
					formattedString += otherCharacters;
				} else if (patternLetters) {
					// Replace pattern letters
					var patternLetter = patternLetters.charAt(0);
					var numberOfLetters = patternLetters.length;
					var rawData = "";
					switch(patternLetter) {
						case "G":
							rawData = "AD";
							break;
						case "y":
							rawData = date.getFullYear();
							break;
						case "M":
							rawData = date.getMonth();
							break;
						case "w":
							rawData = date.getWeekInYear(this.getMinimalDaysInFirstWeek());
							break;
						case "W":
							rawData = date.getWeekInMonth(this.getMinimalDaysInFirstWeek());
							break;
						case "D":
							rawData = date.getDayInYear();
							break;
						case "d":
							rawData = date.getDate();
							break;
						case "F":
							rawData = 1 + Math.floor((date.getDate() - 1) / 7);
							break;
						case "E":
							rawData = dayNames[date.getDay()];
							break;
						case "a":
							rawData = (date.getHours() >= 12) ? "PM" : "AM";
							break;
						case "H":
							rawData = date.getHours();
							break;
						case "k":
							rawData = date.getHours() || 24;
							break;
						case "K":
							rawData = date.getHours() % 12;
							break;
						case "h":
							rawData = (date.getHours() % 12) || 12;
							break;
						case "m":
							rawData = date.getMinutes();
							break;
						case "s":
							rawData = date.getSeconds();
							break;
						case "S":
							rawData = date.getMilliseconds();
							break;
						case "Z":
							rawData = date.getTimezoneOffset(); // This returns the number of minutes since GMT was this time.
							break;
					}
					// Format the raw data depending on the type
					switch(types[patternLetter]) {
						case TEXT2:
							formattedString += formatText(rawData, numberOfLetters, 2);
							break;
						case TEXT3:
							formattedString += formatText(rawData, numberOfLetters, 3);
							break;
						case NUMBER:
							formattedString += formatNumber(rawData, numberOfLetters);
							break;
						case YEAR:
							if (numberOfLetters <= 3) {
								// Output a 2-digit year
								var dataString = "" + rawData;
								formattedString += dataString.substr(2, 2);
							} else {
								formattedString += formatNumber(rawData, numberOfLetters);
							}
							break;
						case MONTH:
							if (numberOfLetters >= 3) {
								formattedString += formatText(monthNames[rawData], numberOfLetters, numberOfLetters);
							} else {
								// NB. Months returned by getMonth are zero-based
								formattedString += formatNumber(rawData + 1, numberOfLetters);
							}
							break;
						case TIMEZONE:
							var isPositive = (rawData > 0);
							// The following line looks like a mistake but isn't
							// because of the way getTimezoneOffset measures.
							var prefix = isPositive ? "-" : "+";
							var absData = Math.abs(rawData);

							// Hours
							var hours = "" + Math.floor(absData / 60);
							hours = padWithZeroes(hours, 2);
							// Minutes
							var minutes = "" + (absData % 60);
							minutes = padWithZeroes(minutes, 2);

							formattedString += prefix + hours + minutes;
							break;
					}
				}
				searchString = searchString.substr(result.index + result[0].length);
			}
			return formattedString;
		};
	})();

	log4javascript.SimpleDateFormat = SimpleDateFormat;

	/* ---------------------------------------------------------------------- */
	// PatternLayout

	function PatternLayout(pattern) {
		if (pattern) {
			this.pattern = pattern;
		} else {
			this.pattern = PatternLayout.DEFAULT_CONVERSION_PATTERN;
		}
		this.customFields = [];
	}

	PatternLayout.TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
	PatternLayout.DEFAULT_CONVERSION_PATTERN = "%m%n";
	PatternLayout.ISO8601_DATEFORMAT = "yyyy-MM-dd HH:mm:ss,SSS";
	PatternLayout.DATETIME_DATEFORMAT = "dd MMM yyyy HH:mm:ss,SSS";
	PatternLayout.ABSOLUTETIME_DATEFORMAT = "HH:mm:ss,SSS";

	PatternLayout.prototype = new Layout();

	PatternLayout.prototype.format = function(loggingEvent) {
		var regex = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/;
		var formattedString = "";
		var result;
		var searchString = this.pattern;

		// Cannot use regex global flag since it doesn't work with exec in IE5
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var padding = result[1];
			var truncation = result[2];
			var conversionCharacter = result[3];
			var specifier = result[5];
			var text = result[6];

			// Check if the pattern matched was just normal text
			if (text) {
				formattedString += "" + text;
			} else {
				// Create a raw replacement string based on the conversion
				// character and specifier
				var replacement = "";
				switch(conversionCharacter) {
					case "a": // Array of messages
					case "m": // Message
						var depth = 0;
						if (specifier) {
							depth = parseInt(specifier, 10);
							if (isNaN(depth)) {
								handleError("PatternLayout.format: invalid specifier '" +
									specifier + "' for conversion character '" + conversionCharacter +
									"' - should be a number");
								depth = 0;
							}
						}
						var messages = (conversionCharacter === "a") ? loggingEvent.messages[0] : loggingEvent.messages;
						for (var i = 0, len = messages.length; i < len; i++) {
							if (i > 0 && (replacement.charAt(replacement.length - 1) !== " ")) {
								replacement += " ";
							}
							if (depth === 0) {
								replacement += messages[i];
							} else {
								replacement += formatObjectExpansion(messages[i], depth);
							}
						}
						break;
					case "c": // Logger name
						var loggerName = loggingEvent.logger.name;
						if (specifier) {
							var precision = parseInt(specifier, 10);
							var loggerNameBits = loggingEvent.logger.name.split(".");
							if (precision >= loggerNameBits.length) {
								replacement = loggerName;
							} else {
								replacement = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
							}
						} else {
							replacement = loggerName;
						}
						break;
					case "d": // Date
						var dateFormat = PatternLayout.ISO8601_DATEFORMAT;
						if (specifier) {
							dateFormat = specifier;
							// Pick up special cases
							if (dateFormat == "ISO8601") {
								dateFormat = PatternLayout.ISO8601_DATEFORMAT;
							} else if (dateFormat == "ABSOLUTE") {
								dateFormat = PatternLayout.ABSOLUTETIME_DATEFORMAT;
							} else if (dateFormat == "DATE") {
								dateFormat = PatternLayout.DATETIME_DATEFORMAT;
							}
						}
						// Format the date
						replacement = (new SimpleDateFormat(dateFormat)).format(loggingEvent.timeStamp);
						break;
					case "f": // Custom field
						if (this.hasCustomFields()) {
							var fieldIndex = 0;
							if (specifier) {
								fieldIndex = parseInt(specifier, 10);
								if (isNaN(fieldIndex)) {
									handleError("PatternLayout.format: invalid specifier '" +
										specifier + "' for conversion character 'f' - should be a number");
								} else if (fieldIndex === 0) {
									handleError("PatternLayout.format: invalid specifier '" +
										specifier + "' for conversion character 'f' - must be greater than zero");
								} else if (fieldIndex > this.customFields.length) {
									handleError("PatternLayout.format: invalid specifier '" +
										specifier + "' for conversion character 'f' - there aren't that many custom fields");
								} else {
									fieldIndex = fieldIndex - 1;
								}
							}
                            var val = this.customFields[fieldIndex].value;
                            if (typeof val == "function") {
                                val = val(this, loggingEvent);
                            }
                            replacement = val;
						}
						break;
					case "n": // New line
						replacement = newLine;
						break;
					case "p": // Level
						replacement = loggingEvent.level.name;
						break;
					case "r": // Milliseconds since log4javascript startup
						replacement = "" + loggingEvent.timeStamp.getDifference(applicationStartDate);
						break;
					case "%": // Literal % sign
						replacement = "%";
						break;
					default:
						replacement = matchedString;
						break;
				}
				// Format the replacement according to any padding or
				// truncation specified
				var l;

				// First, truncation
				if (truncation) {
					l = parseInt(truncation.substr(1), 10);
					var strLen = replacement.length;
					if (l < strLen) {
						replacement = replacement.substring(strLen - l, strLen);
					}
				}
				// Next, padding
				if (padding) {
					if (padding.charAt(0) == "-") {
						l = parseInt(padding.substr(1), 10);
						// Right pad with spaces
						while (replacement.length < l) {
							replacement += " ";
						}
					} else {
						l = parseInt(padding, 10);
						// Left pad with spaces
						while (replacement.length < l) {
							replacement = " " + replacement;
						}
					}
				}
				formattedString += replacement;
			}
			searchString = searchString.substr(result.index + result[0].length);
		}
		return formattedString;
	};

	PatternLayout.prototype.ignoresThrowable = function() {
	    return true;
	};

	PatternLayout.prototype.toString = function() {
	    return "PatternLayout";
	};

	log4javascript.PatternLayout = PatternLayout;
	/* ---------------------------------------------------------------------- */
	// AjaxAppender related

	var xmlHttpFactories = [
		function() { return new XMLHttpRequest(); },
		function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
		function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
	];

	var getXmlHttp = function(errorHandler) {
		// This is only run the first time; the value of getXmlHttp gets
		// replaced with the factory that succeeds on the first run
		var xmlHttp = null, factory;
		for (var i = 0, len = xmlHttpFactories.length; i < len; i++) {
			factory = xmlHttpFactories[i];
			try {
				xmlHttp = factory();
				getXmlHttp = factory;
				return xmlHttp;
			} catch (e) {
			}
		}
		// If we're here, all factories have failed, so throw an error
		if (errorHandler) {
			errorHandler();
		} else {
			handleError("getXmlHttp: unable to obtain XMLHttpRequest object");
		}
	};

	function isHttpRequestSuccessful(xmlHttp) {
		return (isUndefined(xmlHttp.status) || xmlHttp.status === 0 ||
			(xmlHttp.status >= 200 && xmlHttp.status < 300));
	}

	/* ---------------------------------------------------------------------- */
	// AjaxAppender

	function AjaxAppender(url) {
		var appender = this;
		var isSupported = true;
		if (!url) {
			handleError("AjaxAppender: URL must be specified in constructor");
			isSupported = false;
		}

		var timed = this.defaults.timed;
		var waitForResponse = this.defaults.waitForResponse;
		var batchSize = this.defaults.batchSize;
		var timerInterval = this.defaults.timerInterval;
		var requestSuccessCallback = this.defaults.requestSuccessCallback;
		var failCallback = this.defaults.failCallback;
		var postVarName = this.defaults.postVarName;
		var sendAllOnUnload = this.defaults.sendAllOnUnload;
		var sessionId = null;

		var queuedLoggingEvents = [];
		var queuedRequests = [];
		var headers = [];
		var sending = false;
		var initialized = false;

		// Configuration methods. The function scope is used to prevent
		// direct alteration to the appender configuration properties.
		function checkCanConfigure(configOptionName) {
			if (initialized) {
				handleError("AjaxAppender: configuration option '" +
					configOptionName +
					"' may not be set after the appender has been initialized");
				return false;
			}
			return true;
		}

		this.getSessionId = function() { return sessionId; };
		this.setSessionId = function(sessionIdParam) {
			sessionId = extractStringFromParam(sessionIdParam, null);
			this.layout.setCustomField("sessionid", sessionId);
		};

		this.setLayout = function(layoutParam) {
			if (checkCanConfigure("layout")) {
				this.layout = layoutParam;
				// Set the session id as a custom field on the layout, if not already present
				if (sessionId !== null) {
					this.setSessionId(sessionId);
				}
			}
		};

		this.isTimed = function() { return timed; };
		this.setTimed = function(timedParam) {
			if (checkCanConfigure("timed")) {
				timed = bool(timedParam);
			}
		};

		this.getTimerInterval = function() { return timerInterval; };
		this.setTimerInterval = function(timerIntervalParam) {
			if (checkCanConfigure("timerInterval")) {
				timerInterval = extractIntFromParam(timerIntervalParam, timerInterval);
			}
		};

		this.isWaitForResponse = function() { return waitForResponse; };
		this.setWaitForResponse = function(waitForResponseParam) {
			if (checkCanConfigure("waitForResponse")) {
				waitForResponse = bool(waitForResponseParam);
			}
		};

		this.getBatchSize = function() { return batchSize; };
		this.setBatchSize = function(batchSizeParam) {
			if (checkCanConfigure("batchSize")) {
				batchSize = extractIntFromParam(batchSizeParam, batchSize);
			}
		};

		this.isSendAllOnUnload = function() { return sendAllOnUnload; };
		this.setSendAllOnUnload = function(sendAllOnUnloadParam) {
			if (checkCanConfigure("sendAllOnUnload")) {
				sendAllOnUnload = extractBooleanFromParam(sendAllOnUnloadParam, sendAllOnUnload);
			}
		};

		this.setRequestSuccessCallback = function(requestSuccessCallbackParam) {
			requestSuccessCallback = extractFunctionFromParam(requestSuccessCallbackParam, requestSuccessCallback);
		};

		this.setFailCallback = function(failCallbackParam) {
			failCallback = extractFunctionFromParam(failCallbackParam, failCallback);
		};

		this.getPostVarName = function() { return postVarName; };
		this.setPostVarName = function(postVarNameParam) {
			if (checkCanConfigure("postVarName")) {
				postVarName = extractStringFromParam(postVarNameParam, postVarName);
			}
		};

		this.getHeaders = function() { return headers; };
		this.addHeader = function(name, value) {
			headers.push( { name: name, value: value } );
		};

		// Internal functions
		function sendAll() {
			if (isSupported && enabled) {
				sending = true;
				var currentRequestBatch;
				if (waitForResponse) {
					// Send the first request then use this function as the callback once
					// the response comes back
					if (queuedRequests.length > 0) {
						currentRequestBatch = queuedRequests.shift();
						sendRequest(preparePostData(currentRequestBatch), sendAll);
					} else {
						sending = false;
						if (timed) {
							scheduleSending();
						}
					}
				} else {
					// Rattle off all the requests without waiting to see the response
					while ((currentRequestBatch = queuedRequests.shift())) {
						sendRequest(preparePostData(currentRequestBatch));
					}
					sending = false;
					if (timed) {
						scheduleSending();
					}
				}
			}
		}

		this.sendAll = sendAll;

		// Called when the window unloads. At this point we're past caring about
		// waiting for responses or timers or incomplete batches - everything
		// must go, now
		function sendAllRemaining() {
			var sendingAnything = false;
			if (isSupported && enabled) {
				// Create requests for everything left over, batched as normal
				var actualBatchSize = appender.getLayout().allowBatching() ? batchSize : 1;
				var currentLoggingEvent;
				var batchedLoggingEvents = [];
				while ((currentLoggingEvent = queuedLoggingEvents.shift())) {
					batchedLoggingEvents.push(currentLoggingEvent);
					if (queuedLoggingEvents.length >= actualBatchSize) {
						// Queue this batch of log entries
						queuedRequests.push(batchedLoggingEvents);
						batchedLoggingEvents = [];
					}
				}
				// If there's a partially completed batch, add it
				if (batchedLoggingEvents.length > 0) {
					queuedRequests.push(batchedLoggingEvents);
				}
				sendingAnything = (queuedRequests.length > 0);
				waitForResponse = false;
				timed = false;
				sendAll();
			}
			return sendingAnything;
		}

		function preparePostData(batchedLoggingEvents) {
			// Format the logging events
			var formattedMessages = [];
			var currentLoggingEvent;
			var postData = "";
			while ((currentLoggingEvent = batchedLoggingEvents.shift())) {
				var currentFormattedMessage = appender.getLayout().format(currentLoggingEvent);
				if (appender.getLayout().ignoresThrowable()) {
					currentFormattedMessage += currentLoggingEvent.getThrowableStrRep();
				}
				formattedMessages.push(currentFormattedMessage);
			}
			// Create the post data string
			if (batchedLoggingEvents.length == 1) {
				postData = formattedMessages.join("");
			} else {
				postData = appender.getLayout().batchHeader +
					formattedMessages.join(appender.getLayout().batchSeparator) +
					appender.getLayout().batchFooter;
			}
			postData = appender.getLayout().returnsPostData ? postData :
				urlEncode(postVarName) + "=" + urlEncode(postData);
			// Add the layout name to the post data
			if (postData.length > 0) {
				postData += "&";
			}
			return postData + "layout=" + urlEncode(appender.getLayout().toString());
		}

		function scheduleSending() {
			window.setTimeout(sendAll, timerInterval);
		}

		function xmlHttpErrorHandler() {
			var msg = "AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled";
			handleError(msg);
			isSupported = false;
			if (failCallback) {
				failCallback(msg);
			}
		}

		function sendRequest(postData, successCallback) {
			try {
				var xmlHttp = getXmlHttp(xmlHttpErrorHandler);
				if (isSupported) {
					if (xmlHttp.overrideMimeType) {
						xmlHttp.overrideMimeType(appender.getLayout().getContentType());
					}
					xmlHttp.onreadystatechange = function() {
						if (xmlHttp.readyState == 4) {
							if (isHttpRequestSuccessful(xmlHttp)) {
								if (requestSuccessCallback) {
									requestSuccessCallback(xmlHttp);
								}
								if (successCallback) {
									successCallback(xmlHttp);
								}
							} else {
								var msg = "AjaxAppender.append: XMLHttpRequest request to URL " +
									url + " returned status code " + xmlHttp.status;
								handleError(msg);
								if (failCallback) {
									failCallback(msg);
								}
							}
							xmlHttp.onreadystatechange = emptyFunction;
							xmlHttp = null;
						}
					};
					xmlHttp.open("POST", url, true);
					try {
						xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						for (var i = 0, header; header = headers[i++]; ) {
							xmlHttp.setRequestHeader(header.name, header.value);
						}
					} catch (headerEx) {
						var msg = "AjaxAppender.append: your browser's XMLHttpRequest implementation" +
							" does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled";
						handleError(msg);
						isSupported = false;
						if (failCallback) {
							failCallback(msg);
						}
						return;
					}
					xmlHttp.send(postData);
				}
			} catch (ex) {
				var errMsg = "AjaxAppender.append: error sending log message to " + url;
				handleError(errMsg, ex);
				isSupported = false;
				if (failCallback) {
					failCallback(errMsg + ". Details: " + getExceptionStringRep(ex));
				}
			}
		}

		this.append = function(loggingEvent) {
			if (isSupported) {
				if (!initialized) {
					init();
				}
				queuedLoggingEvents.push(loggingEvent);
				var actualBatchSize = this.getLayout().allowBatching() ? batchSize : 1;

				if (queuedLoggingEvents.length >= actualBatchSize) {
					var currentLoggingEvent;
					var batchedLoggingEvents = [];
					while ((currentLoggingEvent = queuedLoggingEvents.shift())) {
						batchedLoggingEvents.push(currentLoggingEvent);
					}
					// Queue this batch of log entries
					queuedRequests.push(batchedLoggingEvents);

					// If using a timer, the queue of requests will be processed by the
					// timer function, so nothing needs to be done here.
					if (!timed && (!waitForResponse || (waitForResponse && !sending))) {
						sendAll();
					}
				}
			}
		};

		function init() {
			initialized = true;
			// Add unload event to send outstanding messages
			if (sendAllOnUnload) {
				var oldBeforeUnload = window.onbeforeunload;
				window.onbeforeunload = function() {
					if (oldBeforeUnload) {
						oldBeforeUnload();
					}
					if (sendAllRemaining()) {
						return "Sending log messages";
					}
				};
			}
			// Start timer
			if (timed) {
				scheduleSending();
			}
		}
	}

	AjaxAppender.prototype = new Appender();

	AjaxAppender.prototype.defaults = {
		waitForResponse: false,
		timed: false,
		timerInterval: 1000,
		batchSize: 1,
		sendAllOnUnload: false,
		requestSuccessCallback: null,
		failCallback: null,
		postVarName: "data"
	};

	AjaxAppender.prototype.layout = new HttpPostDataLayout();

	AjaxAppender.prototype.toString = function() {
		return "AjaxAppender";
	};

	log4javascript.AjaxAppender = AjaxAppender;

	/* ---------------------------------------------------------------------- */
	// Main load

   log4javascript.setDocumentReady = function() {
       pageLoaded = true;
       log4javascript.dispatchEvent("load", {});
   };

    if (window.addEventListener) {
        window.addEventListener("load", log4javascript.setDocumentReady, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", log4javascript.setDocumentReady);
    } else {
        var oldOnload = window.onload;
        if (typeof window.onload != "function") {
            window.onload = log4javascript.setDocumentReady;
        } else {
            window.onload = function(evt) {
                if (oldOnload) {
                    oldOnload(evt);
                }
                log4javascript.setDocumentReady();
            };
        }
    }

    // Ensure that the log4javascript object is available in the window. This
    // is necessary for log4javascript to be available in IE if loaded using
    // Dojo's module system
    window.log4javascript = log4javascript;

    return log4javascript;
})();