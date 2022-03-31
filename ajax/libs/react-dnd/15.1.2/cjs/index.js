"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _indexJs = _interopRequireWildcard(require("./types/index.js"));
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
var _indexJs1 = _interopRequireWildcard(require("./core/index.js"));
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
var _indexJs2 = _interopRequireWildcard(require("./hooks/index.js"));
Object.keys(_indexJs2).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _indexJs2[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _indexJs2[key];
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