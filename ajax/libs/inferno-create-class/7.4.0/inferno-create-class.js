(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (global = global || self, factory(global.Inferno = global.Inferno || {}, global.Inferno));
}(this, (function (exports, inferno) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    function isFunction(o) {
        return typeof o === 'function';
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }

    // don't autobind these methods since they already have guaranteed context.
    var AUTOBIND_BLACKLIST = {
        componentDidMount: 1,
        componentDidUnmount: 1,
        componentDidUpdate: 1,
        componentWillMount: 1,
        componentWillUnmount: 1,
        componentWillUpdate: 1,
        constructor: 1,
        render: 1,
        shouldComponentUpdate: 1
    };
    function extend(base, props) {
        for (var key in props) {
            base[key] = props[key];
        }
        return base;
    }
    function bindAll(ctx) {
        for (var i in ctx) {
            var v = ctx[i];
            if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST[i]) {
                (ctx[i] = v.bind(ctx)).__bound = true;
            }
        }
    }
    function collateMixins(mixins, keyed) {
        if ( keyed === void 0 ) keyed = {};

        for (var i = 0, len = mixins.length; i < len; ++i) {
            var mixin = mixins[i];
            // Surprise: Mixins can have mixins
            if (mixin.mixins) {
                // Recursively collate sub-mixins
                collateMixins(mixin.mixins, keyed);
            }
            for (var key in mixin) {
                if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
                    (keyed[key] || (keyed[key] = [])).push(mixin[key]);
                }
            }
        }
        return keyed;
    }
    function multihook(hooks, mergeFn) {
        return function () {
            var arguments$1 = arguments;

            var ret;
            for (var i = 0, len = hooks.length; i < len; ++i) {
                var hook = hooks[i];
                var r = hook.apply(this, arguments$1);
                if (mergeFn) {
                    ret = mergeFn(ret, r);
                }
                else if (r) {
                    ret = r;
                }
            }
            return ret;
        };
    }
    function mergeNoDupes(previous, current) {
        if (current) {
            if (typeof current !== 'object') {
                throwError('Expected Mixin to return value to be an object or null.');
            }
            if (!previous) {
                previous = {};
            }
            for (var key in current) {
                if (current.hasOwnProperty(key)) {
                    if (previous.hasOwnProperty(key)) {
                        throwError(("Mixins return duplicate key " + key + " in their return values"));
                    }
                    previous[key] = current[key];
                }
            }
        }
        return previous;
    }
    function applyMixin(key, inst, mixin) {
        var hooks = inst[key] !== void 0 ? mixin.concat(inst[key]) : mixin;
        if (key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext') {
            inst[key] = multihook(hooks, mergeNoDupes);
        }
        else {
            inst[key] = multihook(hooks);
        }
    }
    function applyMixins(Cl, mixins) {
        for (var key in mixins) {
            if (mixins.hasOwnProperty(key)) {
                var mixin = mixins[key];
                var inst = (void 0);
                if (key === 'getDefaultProps') {
                    inst = Cl;
                }
                else {
                    inst = Cl.prototype;
                }
                if (isFunction(mixin[0])) {
                    applyMixin(key, inst, mixin);
                }
                else {
                    inst[key] = mixin;
                }
            }
        }
    }
    function createClass(obj) {
        var Cl = /*@__PURE__*/(function (Component) {
            function Cl(props, context) {
                Component.call(this, props, context);
                bindAll(this);
                if (this.getInitialState) {
                    this.state = this.getInitialState();
                }
            }

            if ( Component ) Cl.__proto__ = Component;
            Cl.prototype = Object.create( Component && Component.prototype );
            Cl.prototype.constructor = Cl;
            Cl.prototype.replaceState = function replaceState (nextState, callback) {
                this.setState(nextState, callback);
            };
            Cl.prototype.isMounted = function isMounted () {
                return this.$LI !== null && !this.$UN;
            };

            return Cl;
        }(inferno.Component));
        Cl.displayName = obj.name || obj.displayName || 'Component';
        Cl.propTypes = obj.propTypes;
        Cl.mixins = obj.mixins && collateMixins(obj.mixins);
        Cl.getDefaultProps = obj.getDefaultProps;
        extend(Cl.prototype, obj);
        if (obj.statics) {
            extend(Cl, obj.statics);
        }
        if (obj.mixins) {
            applyMixins(Cl, collateMixins(obj.mixins));
        }
        if (Cl.getDefaultProps) {
            Cl.defaultProps = Cl.getDefaultProps();
        }
        return Cl;
    }

    exports.createClass = createClass;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
