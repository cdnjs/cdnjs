"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePagination = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var React = _interopRequireWildcard(require("react"));

/**
 * Хук взаимствован у @mui с некоторыми изменениями.
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
var usePagination = function usePagination() {
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
    var range = function range(from, to) {
      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var range = [];
      var i = from;

      while (i <= to) {
        range.push(i);
        i += step;
      }

      return range;
    };

    var startPages = range(1, Math.min(boundaryCount, endPage));
    var endPages = range(Math.max(endPage - boundaryCount + 1, boundaryCount + 1), endPage);
    var lowerBoundaryWhenCurrentPageHigh = endPage - boundaryCount - 1 - 2 * siblingCount;
    var siblingsStart = Math.max(Math.min(currentPage - siblingCount, lowerBoundaryWhenCurrentPageHigh), boundaryCount + 2);
    var upperBounadryWhenCurrentPageLow = boundaryCount + 2 + 2 * siblingCount;
    var siblingsEnd = Math.min(Math.max(currentPage + siblingCount, upperBounadryWhenCurrentPageLow), endPages.length > 0 ? endPages[0] - 2 : endPage - 1);
    var pages = startPages;

    if (siblingsStart > boundaryCount + 2) {
      pages.push("start-ellipsis");
    } else if (boundaryCount + 1 < endPage - boundaryCount) {
      pages.push(boundaryCount + 1);
    }

    pages.push.apply(pages, (0, _toConsumableArray2.default)(range(siblingsStart, siblingsEnd)));

    if (siblingsEnd < endPage - boundaryCount - 1) {
      pages.push("end-ellipsis");
    } else if (endPage - boundaryCount > boundaryCount) {
      pages.push(endPage - boundaryCount);
    }

    pages.push.apply(pages, (0, _toConsumableArray2.default)(endPages));
    return pages;
  }, [currentPage, endPage, siblingCount, boundaryCount]);
};

exports.usePagination = usePagination;
//# sourceMappingURL=usePagination.js.map