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
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _usePagination = require("../../hooks/usePagination");
const _Button = require("../Button/Button");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const _PaginationPageButton = require("./PaginationPage/PaginationPageButton");
const _PaginationPageEllipsis = require("./PaginationPage/PaginationPageEllipsis");
const _utils = require("./utils");
const Pagination = (_param)=>{
    var { currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, getPageLabel = _utils.getPageLabelDefault, navigationLabel = 'Навигация по страницам', navigationLabelComponent = 'h2', prevButtonLabel = 'Перейти на предыдущую страницу', nextButtonLabel = 'Перейти на следующую страницу', onChange } = _param, resetProps = _object_without_properties._(_param, [
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
    const pages = (0, _usePagination.usePagination)({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount
    });
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const handlePrevClick = _react.useCallback(()=>{
        if (onChange && !isFirstPage) {
            onChange(currentPage - 1);
        }
    }, [
        currentPage,
        isFirstPage,
        onChange
    ]);
    const handleClick = _react.useCallback((event)=>{
        const page = event.currentTarget.dataset.page || '1';
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
    }, [
        onChange
    ]);
    const handleNextClick = _react.useCallback(()=>{
        if (onChange && !isLastPage) {
            onChange(currentPage + 1);
        }
    }, [
        currentPage,
        isLastPage,
        onChange
    ]);
    const renderPages = _react.useCallback((page)=>{
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ _react.createElement("li", {
                    key: page
                }, /*#__PURE__*/ _react.createElement(_PaginationPageEllipsis.PaginationPageEllipsis, {
                    disabled: disabled
                }));
            default:
                {
                    const isCurrent = page === currentPage;
                    return /*#__PURE__*/ _react.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ _react.createElement(_PaginationPageButton.PaginationPageButton, {
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
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "nav",
        role: "navigation"
    }, resetProps), /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, {
        Component: navigationLabelComponent
    }, navigationLabel), /*#__PURE__*/ _react.createElement("ul", {
        className: "vkuiPagination__list"
    }, /*#__PURE__*/ _react.createElement("li", {
        className: "vkuiPagination__prevButtonContainer"
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        size: "l",
        before: /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, prevButtonLabel), ' ', /*#__PURE__*/ _react.createElement(_icons.Icon24ChevronCompactLeft, {
            width: 24
        })),
        appearance: "accent",
        mode: "tertiary",
        disabled: isFirstPage || disabled,
        onClick: handlePrevClick
    })), pages.map(renderPages), /*#__PURE__*/ _react.createElement("li", {
        className: "vkuiPagination__nextButtonContainer"
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        size: "l",
        after: /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, nextButtonLabel), /*#__PURE__*/ _react.createElement(_icons.Icon24ChevronCompactRight, {
            width: 24
        })),
        appearance: "accent",
        mode: "tertiary",
        disabled: isLastPage || disabled,
        onClick: handleNextClick
    }))));
};

//# sourceMappingURL=Pagination.js.map