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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _math = require("../helpers/math");
const _range = require("../helpers/range");
const usePagination = ({ currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages: endPage = 1 } = {})=>_react.useMemo(()=>{
        const startPages = (0, _range.rangeIncrement)(1, Math.min(boundaryCount, endPage));
        const endPages = (0, _range.rangeIncrement)(Math.max(endPage - boundaryCount + 1, boundaryCount + 1), endPage);
        const lowerBoundaryWhenCurrentPageHigh = endPage - boundaryCount - 1 - 2 * siblingCount;
        const siblingsStart = (0, _math.clamp)(currentPage - siblingCount, boundaryCount + 2, lowerBoundaryWhenCurrentPageHigh);
        const upperBoundaryWhenCurrentPageLow = boundaryCount + 2 + 2 * siblingCount;
        const siblingsEnd = Math.min(Math.max(currentPage + siblingCount, upperBoundaryWhenCurrentPageLow), endPages.length > 0 ? endPages[0] - 2 : endPage - 1);
        const pages = startPages;
        if (siblingsStart > boundaryCount + 2) {
            pages.push('start-ellipsis');
        } else if (boundaryCount + 1 < endPage - boundaryCount) {
            pages.push(boundaryCount + 1);
        }
        pages.push(...(0, _range.rangeIncrement)(siblingsStart, siblingsEnd));
        if (siblingsEnd < endPage - boundaryCount - 1) {
            pages.push('end-ellipsis');
        } else if (endPage - boundaryCount > boundaryCount) {
            pages.push(endPage - boundaryCount);
        }
        pages.push(...endPages);
        return pages;
    }, [
        currentPage,
        endPage,
        siblingCount,
        boundaryCount
    ]);

//# sourceMappingURL=usePagination.js.map