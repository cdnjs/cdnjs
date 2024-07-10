"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Pagination", {
    enumerable: true,
    get: function() {
        return Pagination;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePagination = require("../../hooks/usePagination");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const _PaginationNavigationButton = require("./PaginationNavigationButton/PaginationNavigationButton");
const _PaginationPageButton = require("./PaginationPage/PaginationPageButton");
const _PaginationPageEllipsis = require("./PaginationPage/PaginationPageEllipsis");
const _utils = require("./utils");
const Pagination = (_param)=>{
    var { currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, prevButtonCaption = 'Назад', nextButtonCaption = 'Вперёд', navigationButtonsStyle = 'icon', getPageLabel = _utils.getPageLabelDefault, navigationLabel = 'Навигация по страницам', navigationLabelComponent = 'h2', prevButtonLabel = 'Перейти на предыдущую страницу', nextButtonLabel = 'Перейти на следующую страницу', onChange, renderPageButton, renderNavigationButton } = _param, resetProps = _object_without_properties._(_param, [
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
    const pages = (0, _usePagination.usePagination)({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount
    });
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const prevPage = isFirstPage ? undefined : currentPage - 1;
    const nextPage = isLastPage ? undefined : currentPage + 1;
    const handlePrevClick = _react.useCallback((event)=>{
        if (onChange && prevPage !== undefined) {
            onChange(prevPage, event);
        }
    }, [
        prevPage,
        onChange
    ]);
    const handleClick = _react.useCallback((event)=>{
        const page = event.currentTarget.dataset.page || '1';
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page), event);
    }, [
        onChange
    ]);
    const handleNextClick = _react.useCallback((event)=>{
        if (onChange && nextPage !== undefined) {
            onChange(nextPage, event);
        }
    }, [
        nextPage,
        onChange
    ]);
    const { sizeY } = (0, _useAdaptivity.useAdaptivity)();
    const renderPages = _react.useCallback((page)=>{
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("li", {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PaginationPageEllipsis.PaginationPageEllipsis, {
                        disabled: disabled
                    })
                }, page);
            default:
                {
                    const isCurrent = page === currentPage;
                    return /*#__PURE__*/ (0, _jsxruntime.jsx)("li", {
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PaginationPageButton.PaginationPageButton, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "nav",
        role: "navigation"
    }, resetProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                Component: navigationLabelComponent,
                children: navigationLabel
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("ul", {
                className: "vkuiPagination__list",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("li", {
                        className: "vkuiPagination__prevButtonContainer",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PaginationNavigationButton.PaginationNavigationButton, {
                            type: "prev",
                            style: navigationButtonsStyle,
                            caption: prevButtonCaption,
                            Icon: _icons.Icon24ChevronCompactLeft,
                            a11yLabel: prevButtonLabel,
                            disabled: isFirstPage || disabled,
                            onClick: handlePrevClick,
                            "data-page": prevPage,
                            renderNavigationButton: renderNavigationButton
                        })
                    }),
                    pages.map(renderPages),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("li", {
                        className: "vkuiPagination__nextButtonContainer",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PaginationNavigationButton.PaginationNavigationButton, {
                            type: "next",
                            style: navigationButtonsStyle,
                            caption: nextButtonCaption,
                            Icon: _icons.Icon24ChevronCompactRight,
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