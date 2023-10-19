"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePagination", {
    enumerable: true,
    get: function() {
        return usePagination;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _math = require("../helpers/math");
var _range = require("../helpers/range");
var usePagination = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref_currentPage = _ref.currentPage, currentPage = _ref_currentPage === void 0 ? 1 : _ref_currentPage, _ref_siblingCount = _ref.siblingCount, siblingCount = _ref_siblingCount === void 0 ? 1 : _ref_siblingCount, _ref_boundaryCount = _ref.boundaryCount, boundaryCount = _ref_boundaryCount === void 0 ? 1 : _ref_boundaryCount, tmp = _ref.totalPages, endPage = tmp === void 0 ? 1 : tmp;
    return _react.useMemo(function() {
        var _pages, _pages1;
        var startPages = (0, _range.rangeIncrement)(1, Math.min(boundaryCount, endPage));
        var endPages = (0, _range.rangeIncrement)(Math.max(endPage - boundaryCount + 1, boundaryCount + 1), endPage);
        var lowerBoundaryWhenCurrentPageHigh = endPage - boundaryCount - 1 - 2 * siblingCount;
        var siblingsStart = (0, _math.clamp)(currentPage - siblingCount, boundaryCount + 2, lowerBoundaryWhenCurrentPageHigh);
        var upperBoundaryWhenCurrentPageLow = boundaryCount + 2 + 2 * siblingCount;
        var siblingsEnd = Math.min(Math.max(currentPage + siblingCount, upperBoundaryWhenCurrentPageLow), endPages.length > 0 ? endPages[0] - 2 : endPage - 1);
        var pages = startPages;
        if (siblingsStart > boundaryCount + 2) {
            pages.push("start-ellipsis");
        } else if (boundaryCount + 1 < endPage - boundaryCount) {
            pages.push(boundaryCount + 1);
        }
        (_pages = pages).push.apply(_pages, _to_consumable_array._((0, _range.rangeIncrement)(siblingsStart, siblingsEnd)));
        if (siblingsEnd < endPage - boundaryCount - 1) {
            pages.push("end-ellipsis");
        } else if (endPage - boundaryCount > boundaryCount) {
            pages.push(endPage - boundaryCount);
        }
        (_pages1 = pages).push.apply(_pages1, _to_consumable_array._(endPages));
        return pages;
    }, [
        currentPage,
        endPage,
        siblingCount,
        boundaryCount
    ]);
};

//# sourceMappingURL=usePagination.js.map