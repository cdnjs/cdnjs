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
    addClassNameToElement: function() {
        return addClassNameToElement;
    },
    debounce: function() {
        return debounce;
    },
    excludeKeysWithUndefined: function() {
        return excludeKeysWithUndefined;
    },
    getTitleFromChildren: function() {
        return getTitleFromChildren;
    },
    multiRef: function() {
        return multiRef;
    },
    removeClassNameFromElement: function() {
        return removeClassNameFromElement;
    },
    setRef: function() {
        return setRef;
    },
    stopPropagation: function() {
        return stopPropagation;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function debounce(fn, delay) {
    var timeout;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            return fn.apply(void 0, _to_consumable_array._(args));
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
function addClassNameToElement(element1, className) {
    var elementClassName = element1.getAttribute("class") || "";
    var updatedClassName = "".concat(elementClassName).concat(elementClassName ? " " : "").concat(className);
    element1.setAttribute("class", updatedClassName);
}
function removeClassNameFromElement(element1, classNameToRemove) {
    var classNamesArray = (element1.getAttribute("class") || "").split(/\s+/);
    var elementIndexToRemove = classNamesArray.findIndex(function(className) {
        return className === classNameToRemove;
    });
    if (elementIndexToRemove === -1) {
        return;
    }
    classNamesArray.splice(elementIndexToRemove, 1);
    element1.setAttribute("class", classNamesArray.join(" "));
}
var excludeKeysWithUndefined = function(obj) {
    var filteredObj = {};
    for(var key in obj){
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
};

//# sourceMappingURL=utils.js.map