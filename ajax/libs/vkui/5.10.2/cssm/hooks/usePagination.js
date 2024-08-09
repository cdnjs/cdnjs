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
 */ export const usePagination = ({ currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages: endPage = 1 } = {})=>React.useMemo(()=>{
        const startPages = rangeIncrement(1, Math.min(boundaryCount, endPage));
        const endPages = rangeIncrement(Math.max(endPage - boundaryCount + 1, boundaryCount + 1), endPage);
        const lowerBoundaryWhenCurrentPageHigh = endPage - boundaryCount - 1 - 2 * siblingCount;
        const siblingsStart = clamp(currentPage - siblingCount, boundaryCount + 2, lowerBoundaryWhenCurrentPageHigh);
        const upperBoundaryWhenCurrentPageLow = boundaryCount + 2 + 2 * siblingCount;
        const siblingsEnd = Math.min(Math.max(currentPage + siblingCount, upperBoundaryWhenCurrentPageLow), endPages.length > 0 ? endPages[0] - 2 : endPage - 1);
        const pages = startPages;
        if (siblingsStart > boundaryCount + 2) {
            pages.push('start-ellipsis');
        } else if (boundaryCount + 1 < endPage - boundaryCount) {
            pages.push(boundaryCount + 1);
        }
        pages.push(...rangeIncrement(siblingsStart, siblingsEnd));
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