"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _useDrag = _interopRequireWildcard(require("./useDrag"));
Object.keys(_useDrag).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDrag[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDrag[key];
        }
    });
});
var _useDrop = _interopRequireWildcard(require("./useDrop"));
Object.keys(_useDrop).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDrop[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDrop[key];
        }
    });
});
var _useDragLayer = _interopRequireWildcard(require("./useDragLayer"));
Object.keys(_useDragLayer).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDragLayer[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDragLayer[key];
        }
    });
});
var _useDragDropManager = _interopRequireWildcard(require("./useDragDropManager"));
Object.keys(_useDragDropManager).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDragDropManager[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDragDropManager[key];
        }
    });
});
var _types = _interopRequireWildcard(require("./types"));
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

//# sourceMappingURL=index.js.map