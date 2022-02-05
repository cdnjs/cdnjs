"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _indexJs = _interopRequireWildcard(require("./useDrag/index.js"));
Object.keys(_indexJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _indexJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _indexJs[key];
        }
    });
});
var _indexJs1 = _interopRequireWildcard(require("./useDrop/index.js"));
Object.keys(_indexJs1).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _indexJs1[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _indexJs1[key];
        }
    });
});
var _useDragLayerJs = _interopRequireWildcard(require("./useDragLayer.js"));
Object.keys(_useDragLayerJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDragLayerJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDragLayerJs[key];
        }
    });
});
var _useDragDropManagerJs = _interopRequireWildcard(require("./useDragDropManager.js"));
Object.keys(_useDragDropManagerJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _useDragDropManagerJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _useDragDropManagerJs[key];
        }
    });
});
var _typesJs = _interopRequireWildcard(require("./types.js"));
Object.keys(_typesJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _typesJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _typesJs[key];
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