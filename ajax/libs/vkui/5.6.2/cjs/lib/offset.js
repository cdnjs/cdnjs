"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOffsetRect", {
    enumerable: true,
    get: function() {
        return getOffsetRect;
    }
});
function getOffsetRect(elem) {
    var _elem, _box, _box1, _elem1, _elem2;
    var box = (_elem = elem) === null || _elem === void 0 ? void 0 : _elem.getBoundingClientRect();
    return {
        top: (_box = box) === null || _box === void 0 ? void 0 : _box.top,
        left: (_box1 = box) === null || _box1 === void 0 ? void 0 : _box1.left,
        width: (_elem1 = elem) === null || _elem1 === void 0 ? void 0 : _elem1.offsetWidth,
        height: (_elem2 = elem) === null || _elem2 === void 0 ? void 0 : _elem2.offsetHeight
    };
}

//# sourceMappingURL=offset.js.map