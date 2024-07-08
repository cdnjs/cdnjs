import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from '@vkontakte/icons';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePagination } from '../../hooks/usePagination';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { PaginationNavigationButton } from './PaginationNavigationButton/PaginationNavigationButton';
import { PaginationPageButton } from './PaginationPage/PaginationPageButton';
import { PaginationPageEllipsis } from './PaginationPage/PaginationPageEllipsis';
import { getPageLabelDefault } from './utils';
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */ export const Pagination = (_param)=>{
    var { currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, prevButtonCaption = 'Назад', nextButtonCaption = 'Вперёд', navigationButtonsStyle = 'icon', getPageLabel = getPageLabelDefault, navigationLabel = 'Навигация по страницам', navigationLabelComponent = 'h2', prevButtonLabel = 'Перейти на предыдущую страницу', nextButtonLabel = 'Перейти на следующую страницу', onChange, renderPageButton, renderNavigationButton } = _param, resetProps = _object_without_properties(_param, [
        "currentPage",
        "siblingCount",
        "boundaryCount",
        "totalPages",
        "disabled",
        "prevButtonCaption",
        "nextButtonCaption",
        "navigationButtonsStyle",
        "getPageLabel",
        "navigationLabel",
        "navigationLabelComponent",
        "prevButtonLabel",
        "nextButtonLabel",
        "onChange",
        "renderPageButton",
        "renderNavigationButton"
    ]);
    const pages = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount
    });
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const prevPage = isFirstPage ? undefined : currentPage - 1;
    const nextPage = isLastPage ? undefined : currentPage + 1;
    const handlePrevClick = React.useCallback((event)=>{
        if (onChange && prevPage !== undefined) {
            onChange(prevPage, event);
        }
    }, [
        prevPage,
        onChange
    ]);
    const handleClick = React.useCallback((event)=>{
        const page = event.currentTarget.dataset.page || '1';
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page), event);
    }, [
        onChange
    ]);
    const handleNextClick = React.useCallback((event)=>{
        if (onChange && nextPage !== undefined) {
            onChange(nextPage, event);
        }
    }, [
        nextPage,
        onChange
    ]);
    const { sizeY } = useAdaptivity();
    const renderPages = React.useCallback((page)=>{
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ _jsx("li", {
                    children: /*#__PURE__*/ _jsx(PaginationPageEllipsis, {
                        disabled: disabled
                    })
                }, page);
            default:
                {
                    const isCurrent = page === currentPage;
                    return /*#__PURE__*/ _jsx("li", {
                        children: /*#__PURE__*/ _jsx(PaginationPageButton, {
                            getPageLabel: getPageLabel,
                            isCurrent: isCurrent,
                            onClick: handleClick,
                            disabled: disabled,
                            sizeY: sizeY,
                            renderPageButton: renderPageButton,
                            children: page
                        })
                    }, page);
                }
        }
    }, [
        currentPage,
        disabled,
        getPageLabel,
        handleClick,
        renderPageButton,
        sizeY
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "nav",
        role: "navigation"
    }, resetProps), {
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                Component: navigationLabelComponent,
                children: navigationLabel
            }),
            /*#__PURE__*/ _jsxs("ul", {
                className: "vkuiPagination__list",
                children: [
                    /*#__PURE__*/ _jsx("li", {
                        className: "vkuiPagination__prevButtonContainer",
                        children: /*#__PURE__*/ _jsx(PaginationNavigationButton, {
                            type: "prev",
                            style: navigationButtonsStyle,
                            caption: prevButtonCaption,
                            Icon: Icon24ChevronCompactLeft,
                            a11yLabel: prevButtonLabel,
                            disabled: isFirstPage || disabled,
                            onClick: handlePrevClick,
                            "data-page": prevPage,
                            renderNavigationButton: renderNavigationButton
                        })
                    }),
                    pages.map(renderPages),
                    /*#__PURE__*/ _jsx("li", {
                        className: "vkuiPagination__nextButtonContainer",
                        children: /*#__PURE__*/ _jsx(PaginationNavigationButton, {
                            type: "next",
                            style: navigationButtonsStyle,
                            caption: nextButtonCaption,
                            Icon: Icon24ChevronCompactRight,
                            a11yLabel: nextButtonLabel,
                            disabled: isLastPage || disabled,
                            onClick: handleNextClick,
                            "data-page": nextPage,
                            renderNavigationButton: renderNavigationButton
                        })
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=Pagination.js.map