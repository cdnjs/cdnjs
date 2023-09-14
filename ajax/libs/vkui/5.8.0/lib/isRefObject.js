import * as React from "react";
export var isRefObject = function(refObject) {
    return typeof refObject === "object" && refObject !== null && refObject.hasOwnProperty("current");
};

//# sourceMappingURL=isRefObject.js.map