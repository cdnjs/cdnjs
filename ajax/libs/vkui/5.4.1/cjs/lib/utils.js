"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    debounce: function() {
        return debounce;
    },
    setRef: function() {
        return setRef;
    },
    multiRef: function() {
        return multiRef;
    },
    getTitleFromChildren: function() {
        return getTitleFromChildren;
    },
    stopPropagation: function() {
        return stopPropagation;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
function debounce(fn, delay) {
    var timeout;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            return fn.apply(void 0, _toConsumableArray(args));
        }, delay);
    };
}
function setRef(element1, ref) {
    if (ref) {
        if (typeof ref === "function") {
            ref(element1);
        } else {
            ref.current = element1;
        }
    }
}
function multiRef() {
    for(var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++){
        refs[_key] = arguments[_key];
    }
    var current = null;
    return {
        get current () {
            return current;
        },
        set current (element){
            current = element;
            refs.forEach(function(ref) {
                return ref && setRef(element, ref);
            });
        }
    };
}
function getTitleFromChildren(children) {
    var label = "";
    _react.Children.map(children, function(child) {
        if (typeof child === "string") {
            label += " " + child;
        }
    });
    return label.trim();
}
var stopPropagation = function(event) {
    return event.stopPropagation();
};

//# sourceMappingURL=utils.js.map