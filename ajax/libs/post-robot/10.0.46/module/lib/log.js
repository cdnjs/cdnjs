'use strict';

exports.__esModule = true;
exports.log = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _conf = require('../conf');

var _util = require('./util');

var LOG_DISABLE = 'disabled';
var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

// eslint-disable-next-line no-console
if (Function.prototype.bind && window.console && _typeof(console.log) === 'object') {
    ['log', 'info', 'warn', 'error'].forEach(function bindConsole(method) {
        // $FlowFixMe
        console[method] = this.bind(console[method], console); // eslint-disable-line no-console
    }, Function.prototype.call);
}

var log = exports.log = {
    clearLogs: function clearLogs() {

        if (window.console && window.console.clear) {
            window.console.clear();
        }

        if (_conf.CONFIG.LOG_TO_PAGE) {
            var container = document.getElementById('postRobotLogs');

            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
    },
    writeToPage: function writeToPage(level, args) {
        setTimeout(function () {
            var container = document.getElementById('postRobotLogs');

            if (!container) {
                container = document.createElement('div');
                container.id = 'postRobotLogs';
                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
                if (document.body) {
                    document.body.appendChild(container);
                }
            }

            var el = document.createElement('div');

            var date = new Date().toString().split(' ')[4];

            var payload = Array.prototype.slice.call(args).map(function (item) {
                if (typeof item === 'string') {
                    return item;
                }
                if (!item) {
                    return Object.prototype.toString.call(item);
                }
                var json = void 0;
                try {
                    json = (0, _util.jsonStringify)(item, null, 2);
                } catch (err) {
                    json = '[object]';
                }

                return '\n\n' + json + '\n\n';
            }).join(' ');

            var msg = date + ' ' + level + ' ' + payload;
            el.innerHTML = msg;

            var color = {
                log: '#ddd',
                warn: 'orange',
                error: 'red',
                info: 'blue',
                debug: '#aaa'
            }[level];

            el.style.cssText = 'margin-top: 10px; color: ' + color + ';';

            if (!container.childNodes.length) {
                container.appendChild(el);
            } else {
                container.insertBefore(el, container.childNodes[0]);
            }
        });
    },
    logLevel: function logLevel(level, args) {
        setTimeout(function () {
            try {
                var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;

                if (logLevel === LOG_DISABLE || LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) {
                    return;
                }

                args = Array.prototype.slice.call(args);

                args.unshift('' + window.location.host + window.location.pathname);
                args.unshift('::');
                args.unshift('' + (0, _util.getWindowType)().toLowerCase());
                args.unshift('[post-robot]');

                if (_conf.CONFIG.LOG_TO_PAGE) {
                    log.writeToPage(level, args);
                }

                if (!window.console) {
                    return;
                }

                if (!window.console[level]) {
                    level = 'log';
                }

                if (!window.console[level]) {
                    return;
                }

                window.console[level].apply(window.console, args);
            } catch (err) {
                // pass
            }
        }, 1);
    },
    debug: function debug() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        log.logLevel('debug', args);
    },
    info: function info() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        log.logLevel('info', args);
    },
    warn: function warn() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        log.logLevel('warn', args);
    },
    error: function error() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        log.logLevel('error', args);
    }
};