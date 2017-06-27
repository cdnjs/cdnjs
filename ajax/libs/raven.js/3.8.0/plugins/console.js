/*! Raven.js 3.8.0 (d78f15c) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2016 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.Raven||(g.Raven = {}));g=(g.Plugins||(g.Plugins = {}));g.Console = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * console plugin
 *
 * Monkey patches console.* calls into Sentry messages with
 * their appropriate log levels. (Experimental)
 *
 * Options:
 *
 *   `levels`: An array of levels (methods on `console`) to report to Sentry.
 *     Defaults to debug, info, warn, and error.
 */
'use strict';

var wrapConsoleMethod = _dereq_(2).wrapMethod;

function consolePlugin(Raven, console, pluginOptions) {
    console = console || window.console || {};
    pluginOptions = pluginOptions || {};

    var logLevels = pluginOptions.levels || ['debug', 'info', 'warn', 'error'],
        level = logLevels.pop();

    var callback = function (msg, data) {
        Raven.captureMessage(msg, data);
    };

    while(level) {
        wrapConsoleMethod(console, level, callback);
        level = logLevels.pop();
    }
}

module.exports = consolePlugin;

},{"2":2}],2:[function(_dereq_,module,exports){
'use strict';

var wrapMethod = function(console, level, callback) {
    var originalConsoleLevel = console[level];
    var originalConsole = console;

    if (!(level in console)) {
        return;
    }

    var sentryLevel = level === 'warn'
        ? 'warning'
        : level;

    console[level] = function () {
        var args = [].slice.call(arguments);

        var msg = '' + args.join(' ');
        var data = {level: sentryLevel, logger: 'console', extra: {'arguments': args}};
        callback && callback(msg, data);

        // this fails for some browsers. :(
        if (originalConsoleLevel) {
            // IE9 doesn't allow calling apply on console functions directly
            // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
            Function.prototype.apply.call(
                originalConsoleLevel,
                originalConsole,
                args
            );
        }
    };
};

module.exports = {
    wrapMethod: wrapMethod
};

},{}]},{},[1])(1)
});