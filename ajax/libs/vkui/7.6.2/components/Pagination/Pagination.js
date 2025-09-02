'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from "@vkontakte/icons";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { usePagination } from "../../hooks/usePagination.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { PaginationNavigationButton } from "./PaginationNavigationButton/PaginationNavigationButton.js";
import { PaginationPageButton } from "./PaginationPage/PaginationPageButton.js";
import { PaginationPageEllipsis } from "./PaginationPage/PaginationPageEllipsis.js";
/**
 * @see https://vkui.io/components/pagination
 */ export const Pagination = (_param)=>{
    var { currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, prevButtonCaption = 'Назад', nextButtonCaption = 'Вперёд', navigationButtonsStyle = 'icon', getPageLabel, navigationLabel = 'Страницы', navigationLabelComponent = 'h2', prevButtonLabel = 'Перейти на предыдущую страницу', nextButtonLabel = 'Перейти на следующую страницу', onChange, renderPageButton, pageButtonTestId, prevButtonTestId, nextButtonTestId, renderNavigationButton } = _param, resetProps = _object_without_properties(_param, [
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
        "pageButtonTestId",
        "prevButtonTestId",
        "nextButtonTestId",
        "renderNavigationButton"
    ]);
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
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
        const isCurrent = page === currentPage;
        const dataTestId = pageButtonTestId === null || pageButtonTestId === void 0 ? void 0 : pageButtonTestId(page, isCurrent);
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ _jsx("li", {
                    children: /*#__PURE__*/ _jsx(PaginationPageEllipsis, {
                        disabled: disabled,
                        "data-testid": dataTestId
                    })
                }, page);
            default:
                {
                    return /*#__PURE__*/ _jsx("li", {
                        children: /*#__PURE__*/ _jsx(PaginationPageButton, {
                            getPageLabel: getPageLabel,
                            isCurrent: isCurrent,
                            onClick: handleClick,
                            disabled: disabled,
                            sizeY: sizeY,
                            renderPageButton: renderPageButton,
                            "data-testid": dataTestId,
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
        sizeY,
        pageButtonTestId
    ]);
    const navigationLabelId = React.useId();
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "nav",
        role: "navigation",
        "aria-labelledby": navigationLabelId
    }, resetProps), {
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                id: navigationLabelId,
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
                            Icon: isRtl ? Icon24ChevronCompactRight : Icon24ChevronCompactLeft,
                            a11yLabel: prevButtonLabel,
                            disabled: isFirstPage || disabled,
                            onClick: handlePrevClick,
                            "data-page": prevPage,
                            "data-testid": prevButtonTestId,
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
                            Icon: isRtl ? Icon24ChevronCompactLeft : Icon24ChevronCompactRight,
                            a11yLabel: nextButtonLabel,
                            disabled: isLastPage || disabled,
                            onClick: handleNextClick,
                            "data-page": nextPage,
                            "data-testid": nextButtonTestId,
                            renderNavigationButton: renderNavigationButton
                        })
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=Pagination.js.map