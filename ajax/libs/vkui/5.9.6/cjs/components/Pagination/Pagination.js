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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _usePagination = require("../../hooks/usePagination");
var _Button = require("../Button/Button");
var _RootComponent = require("../RootComponent/RootComponent");
var _PaginationPageButton = require("./PaginationPage/PaginationPageButton");
var _PaginationPageEllipsis = require("./PaginationPage/PaginationPageEllipsis");
var _utils = require("./utils");
var Pagination = function(_param) {
    var _param_currentPage = _param.currentPage, currentPage = _param_currentPage === void 0 ? 1 : _param_currentPage, _param_siblingCount = _param.siblingCount, siblingCount = _param_siblingCount === void 0 ? 1 : _param_siblingCount, _param_boundaryCount = _param.boundaryCount, boundaryCount = _param_boundaryCount === void 0 ? 1 : _param_boundaryCount, _param_totalPages = _param.totalPages, totalPages = _param_totalPages === void 0 ? 1 : _param_totalPages, disabled = _param.disabled, _param_getPageAriaLabel = _param.getPageAriaLabel, getPageAriaLabel = _param_getPageAriaLabel === void 0 ? _utils.getPageAriaLabelDefault : _param_getPageAriaLabel, _param_prevButtonAriaLabel = _param.prevButtonAriaLabel, prevButtonAriaLabel = _param_prevButtonAriaLabel === void 0 ? "Перейти на предыдущую страницу" : _param_prevButtonAriaLabel, _param_nextButtonAriaLabel = _param.nextButtonAriaLabel, nextButtonAriaLabel = _param_nextButtonAriaLabel === void 0 ? "Перейти на следующую страницу" : _param_nextButtonAriaLabel, onChange = _param.onChange, resetProps = _object_without_properties._(_param, [
        "currentPage",
        "siblingCount",
        "boundaryCount",
        "totalPages",
        "disabled",
        "getPageAriaLabel",
        "prevButtonAriaLabel",
        "nextButtonAriaLabel",
        "onChange"
    ]);
    var pages = (0, _usePagination.usePagination)({
        currentPage: currentPage,
        totalPages: totalPages,
        siblingCount: siblingCount,
        boundaryCount: boundaryCount
    });
    var isFirstPage = currentPage === 1;
    var isLastPage = currentPage === totalPages;
    var handlePrevClick = _react.useCallback(function() {
        if (onChange && !isFirstPage) {
            onChange(currentPage - 1);
        }
    }, [
        currentPage,
        isFirstPage,
        onChange
    ]);
    var handleClick = _react.useCallback(function(event) {
        var page = event.currentTarget.dataset.page || "1";
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
    }, [
        onChange
    ]);
    var handleNextClick = _react.useCallback(function() {
        if (onChange && !isLastPage) {
            onChange(currentPage + 1);
        }
    }, [
        currentPage,
        isLastPage,
        onChange
    ]);
    var renderPages = _react.useCallback(function(page) {
        switch(page){
            case "start-ellipsis":
            case "end-ellipsis":
                return /*#__PURE__*/ _react.createElement("li", {
                    key: page
                }, /*#__PURE__*/ _react.createElement(_PaginationPageEllipsis.PaginationPageEllipsis, {
                    disabled: disabled
                }));
            default:
                {
                    var isCurrent = page === currentPage;
                    return /*#__PURE__*/ _react.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ _react.createElement(_PaginationPageButton.PaginationPageButton, {
                        getPageAriaLabel: getPageAriaLabel,
                        isCurrent: isCurrent,
                        onClick: handleClick,
                        disabled: disabled
                    }, page));
                }
        }
    }, [
        currentPage,
        disabled,
        getPageAriaLabel,
        handleClick
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "nav",
        role: "navigation",
        "aria-label": "Навигация по страницам"
    }, resetProps), /*#__PURE__*/ _react.createElement("ul", {
        className: "vkuiPagination__list"
    }, /*#__PURE__*/ _react.createElement("li", {
        className: "vkuiPagination__prevButtonContainer"
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        size: "l",
        before: /*#__PURE__*/ _react.createElement(_icons.Icon24ChevronCompactLeft, {
            width: 24
        }),
        appearance: "accent",
        mode: "tertiary",
        disabled: isFirstPage || disabled,
        "aria-label": prevButtonAriaLabel,
        onClick: handlePrevClick
    })), pages.map(renderPages), /*#__PURE__*/ _react.createElement("li", {
        className: "vkuiPagination__nextButtonContainer"
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        size: "l",
        after: /*#__PURE__*/ _react.createElement(_icons.Icon24ChevronCompactRight, {
            width: 24
        }),
        appearance: "accent",
        mode: "tertiary",
        disabled: isLastPage || disabled,
        "aria-label": nextButtonAriaLabel,
        onClick: handleNextClick
    }))));
};

//# sourceMappingURL=Pagination.js.map