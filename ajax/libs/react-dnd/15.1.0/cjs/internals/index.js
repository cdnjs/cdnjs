"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
var _dragSourceMonitorImplJs = _interopRequireWildcard(require("./DragSourceMonitorImpl.js"));
Object.keys(_dragSourceMonitorImplJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dragSourceMonitorImplJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dragSourceMonitorImplJs[key];
        }
    });
});
var _dropTargetMonitorImplJs = _interopRequireWildcard(require("./DropTargetMonitorImpl.js"));
Object.keys(_dropTargetMonitorImplJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _dropTargetMonitorImplJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _dropTargetMonitorImplJs[key];
        }
    });
});
var _sourceConnectorJs = _interopRequireWildcard(require("./SourceConnector.js"));
Object.keys(_sourceConnectorJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _sourceConnectorJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _sourceConnectorJs[key];
        }
    });
});
var _targetConnectorJs = _interopRequireWildcard(require("./TargetConnector.js"));
Object.keys(_targetConnectorJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _targetConnectorJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _targetConnectorJs[key];
        }
    });
});
var _registrationJs = _interopRequireWildcard(require("./registration.js"));
Object.keys(_registrationJs).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _registrationJs[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _registrationJs[key];
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