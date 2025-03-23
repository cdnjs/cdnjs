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
    calculateGap: function() {
        return _gaps.calculateGap;
    },
    columnGapClassNames: function() {
        return _gaps.columnGapClassNames;
    },
    rowGapClassNames: function() {
        return _gaps.rowGapClassNames;
    }
});
const _gaps = require("./gaps");

//# sourceMappingURL=index.js.map