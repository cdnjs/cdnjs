"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeCalls", {
    enumerable: true,
    get: function() {
        return mergeCalls;
    }
});
const _callMultiple = require("./callMultiple");
function mergeCalls(...props) {
    const objectToArrays = props.reduce((record, obj)=>{
        Object.entries(obj).forEach(([key, value])=>{
            if (!record.hasOwnProperty(key)) {
                record[key] = [];
            }
            record[key].push(value);
        });
        return record;
    }, {});
    return Object.entries(objectToArrays).reduce((record, [key, array])=>{
        record[key] = (0, _callMultiple.callMultiple)(...array);
        return record;
    }, {});
}

//# sourceMappingURL=mergeCalls.js.map