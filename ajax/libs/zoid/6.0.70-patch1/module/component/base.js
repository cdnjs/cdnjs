function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { ZalgoPromise } from 'zalgo-promise/src';
import { on } from 'post-robot/src';
import 'cross-domain-utils/src';

import { copyProp, eventEmitter, stringifyError, noop } from '../lib';


function cleanup(obj) {

    var tasks = [];
    var cleaned = false;

    return {
        set: function set(name, item) {

            if (cleaned) {
                return item;
            }

            obj[name] = item;
            this.register(function () {
                delete obj[name];
            });
            return item;
        },
        register: function register(name, method) {

            if (typeof name === 'function') {
                method = name;
                name = '<anonymous-cleanup-handler>';
            }

            if (typeof method !== 'function') {
                throw new TypeError('Expected to be passed function to clean.register');
            }

            if (cleaned) {
                method();
                return;
            }

            tasks.push({
                complete: false,

                name: name,

                run: function run() {

                    if (this.complete) {
                        return;
                    }

                    this.complete = true;

                    if (method) {
                        method();
                    }
                }
            });
        },
        hasTasks: function hasTasks() {
            return Boolean(tasks.filter(function (item) {
                return !item.complete;
            }).length);
        },
        all: function all() {
            var results = [];

            cleaned = true;

            while (tasks.length) {
                results.push(tasks.pop().run());
            }

            return ZalgoPromise.all(results).then(function () {/* pass */});
        },
        run: function run(name) {
            var results = [];

            for (var _i2 = 0, _length2 = tasks == null ? 0 : tasks.length; _i2 < _length2; _i2++) {
                var item = tasks[_i2];
                if (item.name === name) {
                    results.push(item.run());
                }
            }

            return ZalgoPromise.all(results).then(noop);
        }
    };
}

/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

export var BaseComponent = function () {
    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        this.clean = cleanup(this);
        this.event = eventEmitter();
    }

    BaseComponent.prototype.addProp = function addProp(options, name, def) {
        copyProp(options, this, name, def);
    };

    BaseComponent.prototype.on = function on(eventName, handler) {
        return this.event.on(eventName, handler);
    };

    BaseComponent.prototype.listeners = function listeners() {
        throw new Error('Expected listeners to be implemented');
    };

    BaseComponent.prototype.error = function error(err) {
        throw new Error('Expected error to be implemented - got ' + stringifyError(err));
    };

    /*  Listen
        ------
         Listen for any post messages defined in this.listeners(). All (most) of our communication is done via
        post-messages, so this sets up an easy way to create a collection of listeners in one go.
         All post-messaging is done using post-robot.
    */

    BaseComponent.prototype.listen = function listen(win, domain) {
        var _this = this;

        if (!win) {
            throw this.component.createError('window to listen to not set');
        }

        if (!domain) {
            throw new Error('Must pass domain to listen to');
        }

        if (!this.listeners) {
            return;
        }

        var listeners = this.listeners();

        var _loop = function _loop(_i4, _Object$keys2, _length4) {
            var listenerName = _Object$keys2[_i4];

            var name = listenerName.replace(/^zoid_/, '');

            var errorHandler = function errorHandler(err) {
                _this.error(err);
            };

            var listener = on(listenerName, { window: win, domain: domain, errorHandler: errorHandler }, function (_ref) {
                var source = _ref.source,
                    data = _ref.data;

                _this.component.log('listener_' + name);
                return listeners[listenerName].call(_this, source, data);
            });

            var errorListener = on(listenerName, { window: win, errorHandler: errorHandler }, function (_ref2) {
                var origin = _ref2.origin;

                _this.component.logError('unexpected_listener_' + name, { origin: origin, domain: domain.toString() });
                _this.error(new Error('Unexpected ' + name + ' message from domain ' + origin + ' -- expected message from ' + domain.toString()));
            });

            _this.clean.register(function () {
                listener.cancel();
                errorListener.cancel();
            });
        };

        for (var _i4 = 0, _Object$keys2 = Object.keys(listeners), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
            _loop(_i4, _Object$keys2, _length4);
        }
    };

    return BaseComponent;
}();