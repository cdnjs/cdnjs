"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _dndContextJs = _interopRequireWildcard(require("./DndContext.js"));
Object.keys(_dndContextJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dndContextJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dndContextJs[key];
        }
    });
});
var _dndProviderJs = _interopRequireWildcard(require("./DndProvider.js"));
Object.keys(_dndProviderJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dndProviderJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dndProviderJs[key];
        }
    });
});
var _dragPreviewImageJs = _interopRequireWildcard(require("./DragPreviewImage.js"));
Object.keys(_dragPreviewImageJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dragPreviewImageJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dragPreviewImageJs[key];
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