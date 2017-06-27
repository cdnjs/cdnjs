(function () {
'use strict';

var isDefined = function (a) {
    return !!a || a === 0 || a === false;
};
var getTypeString = function (val) {
    return Object.prototype.toString.call(val);
};
var isFunction = function (a) {
    return getTypeString(a) === '[object Function]';
};
var isNumber = function (a) { return typeof a === 'number'; };
var isObject = function (a) { return typeof a === 'object' && !!a; };
var isString = function (a) { return typeof a === 'string'; };
var isArray = function (a) {
    return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length);
};

var deepCopyProperty = function (prop, origin, dest) {
    var originProp = origin[prop];
    var destProp = dest[prop];
    var originType = getTypeString(originProp);
    var destType = getTypeString(destProp);
    if (originType !== destType) {
        destProp = undefined;
    }
    if (isArray(originProp)) {
        dest[prop] = originProp.slice(0);
    }
    else if (isObject(originProp)) {
        dest[prop] = deepCopyObject(originProp, destProp);
    }
    else {
        dest[prop] = originProp;
    }
};
var deepCopyObject = function (origin, dest) {
    dest = dest || {};
    for (var prop in origin) {
        deepCopyProperty(prop, origin, dest);
    }
    return dest;
};

var animateVue = {
    install: function (vue) {
        vue.directive('animate', {
            bind: function (el, binding) {
                var events = binding['value'];
                var eventListeners = [];
                var player;
                var _loop_1 = function (e) {
                    var eventName = e;
                    var options = events[eventName];
                    if (typeof options === 'string') {
                        options = {
                            mixins: options,
                            fill: 'both'
                        };
                    }
                    var eventListener = function (event) {
                        if (player) {
                            player.cancel();
                        }
                        var animationOptions = deepCopyObject(options);
                        animationOptions.targets = event.target;
                        player = just.animate(animationOptions);
                    };
                    eventListeners.push({
                        eventName: eventName,
                        eventListener: eventListener
                    });
                    el.addEventListener(eventName, eventListener);
                };
                for (var e in events) {
                    _loop_1(e);
                }
                el['jaListeners'] = eventListeners;
            },
            unbind: function (el) {
                for (var _i = 0, _a = el['jaListeners']; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    el.removeEventListener(listener.eventName, listener.eventListener);
                }
            }
        });
    }
};
window.just.AnimateVue = animateVue;

}());
