
/*!
 * inferno-create-class v1.3.0-rc.10
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno-component')) :
	typeof define === 'function' && define.amd ? define(['inferno-component'], factory) :
	(global['inferno-create-class'] = factory(global.Inferno.Component));
}(this, (function (Component) { 'use strict';

Component = 'default' in Component ? Component['default'] : Component;

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';


// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though



function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}

function isFunction(obj) {
    return typeof obj === 'function';
}



function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return obj === undefined;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
    constructor: 1,
    render: 1,
    shouldComponentUpdate: 1,
    componentWillReceiveProps: 1,
    componentWillUpdate: 1,
    componentDidUpdate: 1,
    componentWillMount: 1,
    componentDidMount: 1,
    componentWillUnmount: 1,
    componentDidUnmount: 1
};
function extend(base, props, all) {
    for (var key in props) {
        if (all === true || !isNullOrUndef(props[key])) {
            base[key] = props[key];
        }
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

    for (var i = 0, len = mixins.length; i < len; i++) {
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
function multihook(inst, hooks, mergeFn) {
    return function () {
        var arguments$1 = arguments;

        var ret;
        for (var i = 0, len = hooks.length; i < len; i++) {
            var hook = hooks[i];
            var r = hook.apply(inst, arguments$1);
            if (mergeFn) {
                ret = mergeFn(ret, r);
            }
            else if (isUndefined(r)) {
                ret = r;
            }
        }
        return ret;
    };
}
function mergeNoDupes(previous, current) {
    if (!isUndefined(current)) {
        if (!isObject(current)) {
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
    var hooks = isUndefined(inst[key]) ? mixin : mixin.concat(inst[key]);
    if (key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext') {
        inst[key] = multihook(inst, hooks, mergeNoDupes);
    }
    else {
        inst[key] = multihook(inst, hooks);
    }
}
function applyMixins(inst, mixins) {
    for (var key in mixins) {
        if (mixins.hasOwnProperty(key)) {
            var mixin = mixins[key];
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
    var Cl = (function (Component$$1) {
        function Cl(props, context) {
            Component$$1.call(this, props, context);
            extend(this, obj);
            bindAll(this);
            if (Cl.getInitialState) {
                this.state = Cl.getInitialState.call(this);
            }
        }

        if ( Component$$1 ) Cl.__proto__ = Component$$1;
        Cl.prototype = Object.create( Component$$1 && Component$$1.prototype );
        Cl.prototype.constructor = Cl;
        Cl.prototype.replaceState = function replaceState (nextState, callback) {
            this.setState(nextState, callback);
        };
        Cl.prototype.isMounted = function isMounted () {
            return !this._unmounted;
        };

        return Cl;
    }(Component));
    Cl.displayName = obj.displayName || 'Component';
    Cl.propTypes = obj.propTypes;
    Cl.mixins = obj.mixins && collateMixins(obj.mixins);
    Cl.getDefaultProps = obj.getDefaultProps;
    Cl.getInitialState = obj.getInitialState;
    if (obj.mixins) {
        applyMixins(Cl, collateMixins(obj.mixins));
    }
    if (obj.statics) {
        extend(Cl, obj.statics);
    }
    Cl.getInitialState = isUndefined(Cl.getInitialState) ? undefined : Cl.getInitialState;
    Cl.defaultProps = isUndefined(Cl.getDefaultProps) ? undefined : Cl.getDefaultProps();
    return Cl;
}

return createClass;

})));
