"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _dragSourceMonitorImpl = _interopRequireWildcard(require("./DragSourceMonitorImpl"));
Object.keys(_dragSourceMonitorImpl).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dragSourceMonitorImpl[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dragSourceMonitorImpl[key];
        }
    });
});
var _dropTargetMonitorImpl = _interopRequireWildcard(require("./DropTargetMonitorImpl"));
Object.keys(_dropTargetMonitorImpl).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dropTargetMonitorImpl[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dropTargetMonitorImpl[key];
        }
    });
});
var _sourceConnector = _interopRequireWildcard(require("./SourceConnector"));
Object.keys(_sourceConnector).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _sourceConnector[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _sourceConnector[key];
        }
    });
});
var _targetConnector = _interopRequireWildcard(require("./TargetConnector"));
Object.keys(_targetConnector).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _targetConnector[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _targetConnector[key];
        }
    });
});
var _registration = _interopRequireWildcard(require("./registration"));
Object.keys(_registration).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _registration[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _registration[key];
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