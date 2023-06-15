import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import * as React from 'react';
import { clamp } from '../helpers/math';
import { rangeIncrement } from '../helpers/range';
/**
 * Хук позаимствован у @mui с некоторыми изменениями.
 *  [usePagination.js](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js).
 *
 * Примеры вывода:
 *           v
 * [1, 2, 3, 4, 5, 'end-ellipsis', 10]
 *                          v
 * [1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]
 *                          v
 * [1, 'start-ellipsis', 6, 7, 8, 9, 10]
 */
export var usePagination = function usePagination() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$currentPage = _ref.currentPage,
    currentPage = _ref$currentPage === void 0 ? 1 : _ref$currentPage,
    _ref$siblingCount = _ref.siblingCount,
    siblingCount = _ref$siblingCount === void 0 ? 1 : _ref$siblingCount,
    _ref$boundaryCount = _ref.boundaryCount,
    boundaryCount = _ref$boundaryCount === void 0 ? 1 : _ref$boundaryCount,
    _ref$totalPages = _ref.totalPages,
    endPage = _ref$totalPages === void 0 ? 1 : _ref$totalPages;
  return React.useMemo(function () {
    var startPages = rangeIncrement(1, Math.min(boundaryCount, endPage));
    var endPages = rangeIncrement(Math.max(endPage - boundaryCount + 1, boundaryCount + 1), endPage);
    var lowerBoundaryWhenCurrentPageHigh = endPage - boundaryCount - 1 - 2 * siblingCount;
    var siblingsStart = clamp(currentPage - siblingCount, boundaryCount + 2, lowerBoundaryWhenCurrentPageHigh);
    var upperBoundaryWhenCurrentPageLow = boundaryCount + 2 + 2 * siblingCount;
    var siblingsEnd = Math.min(Math.max(currentPage + siblingCount, upperBoundaryWhenCurrentPageLow), endPages.length > 0 ? endPages[0] - 2 : endPage - 1);
    var pages = startPages;
    if (siblingsStart > boundaryCount + 2) {
      pages.push('start-ellipsis');
    } else if (boundaryCount + 1 < endPage - boundaryCount) {
      pages.push(boundaryCount + 1);
    }
    pages.push.apply(pages, _toConsumableArray(rangeIncrement(siblingsStart, siblingsEnd)));
    if (siblingsEnd < endPage - boundaryCount - 1) {
      pages.push('end-ellipsis');
    } else if (endPage - boundaryCount > boundaryCount) {
      pages.push(endPage - boundaryCount);
    }
    pages.push.apply(pages, _toConsumableArray(endPages));
    return pages;
  }, [currentPage, endPage, siblingCount, boundaryCount]);
};
//# sourceMappingURL=usePagination.js.map