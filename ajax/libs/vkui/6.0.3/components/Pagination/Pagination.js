import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from '@vkontakte/icons';
import { usePagination } from '../../hooks/usePagination';
import { Button } from '../Button/Button';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { PaginationPageButton } from './PaginationPage/PaginationPageButton';
import { PaginationPageEllipsis } from './PaginationPage/PaginationPageEllipsis';
import { getPageLabelDefault } from './utils';
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */ export const Pagination = (_param)=>{
    var { currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, getPageLabel = getPageLabelDefault, navigationLabel = 'Навигация по страницам', navigationLabelComponent = 'h2', prevButtonLabel = 'Перейти на предыдущую страницу', nextButtonLabel = 'Перейти на следующую страницу', onChange } = _param, resetProps = _object_without_properties(_param, [
        "currentPage",
        "siblingCount",
        "boundaryCount",
        "totalPages",
        "disabled",
        "getPageLabel",
        "navigationLabel",
        "navigationLabelComponent",
        "prevButtonLabel",
        "nextButtonLabel",
        "onChange"
    ]);
    const pages = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount
    });
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const handlePrevClick = React.useCallback(()=>{
        if (onChange && !isFirstPage) {
            onChange(currentPage - 1);
        }
    }, [
        currentPage,
        isFirstPage,
        onChange
    ]);
    const handleClick = React.useCallback((event)=>{
        const page = event.currentTarget.dataset.page || '1';
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
    }, [
        onChange
    ]);
    const handleNextClick = React.useCallback(()=>{
        if (onChange && !isLastPage) {
            onChange(currentPage + 1);
        }
    }, [
        currentPage,
        isLastPage,
        onChange
    ]);
    const renderPages = React.useCallback((page)=>{
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ React.createElement("li", {
                    key: page
                }, /*#__PURE__*/ React.createElement(PaginationPageEllipsis, {
                    disabled: disabled
                }));
            default:
                {
                    const isCurrent = page === currentPage;
                    return /*#__PURE__*/ React.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ React.createElement(PaginationPageButton, {
                        getPageLabel: getPageLabel,
                        isCurrent: isCurrent,
                        onClick: handleClick,
                        disabled: disabled
                    }, page));
                }
        }
    }, [
        currentPage,
        disabled,
        getPageLabel,
        handleClick
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "nav",
        role: "navigation"
    }, resetProps), /*#__PURE__*/ React.createElement(VisuallyHidden, {
        Component: navigationLabelComponent
    }, navigationLabel), /*#__PURE__*/ React.createElement("ul", {
        className: "vkuiPagination__list"
    }, /*#__PURE__*/ React.createElement("li", {
        className: "vkuiPagination__prevButtonContainer"
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(VisuallyHidden, null, prevButtonLabel), ' ', /*#__PURE__*/ React.createElement(Icon24ChevronCompactLeft, {
            width: 24
        })),
        appearance: "accent",
        mode: "tertiary",
        disabled: isFirstPage || disabled,
        onClick: handlePrevClick
    })), pages.map(renderPages), /*#__PURE__*/ React.createElement("li", {
        className: "vkuiPagination__nextButtonContainer"
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(VisuallyHidden, null, nextButtonLabel), /*#__PURE__*/ React.createElement(Icon24ChevronCompactRight, {
            width: 24
        })),
        appearance: "accent",
        mode: "tertiary",
        disabled: isLastPage || disabled,
        onClick: handleNextClick
    }))));
};

//# sourceMappingURL=Pagination.js.map