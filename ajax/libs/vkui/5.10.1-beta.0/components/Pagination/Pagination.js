import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from "@vkontakte/icons";
import { usePagination } from "../../hooks/usePagination";
import { Button } from "../Button/Button";
import { RootComponent } from "../RootComponent/RootComponent";
import { PaginationPageButton } from "./PaginationPage/PaginationPageButton";
import { PaginationPageEllipsis } from "./PaginationPage/PaginationPageEllipsis";
import { getPageAriaLabelDefault } from "./utils";
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */ export var Pagination = function(_param) {
    var _param_currentPage = _param.currentPage, currentPage = _param_currentPage === void 0 ? 1 : _param_currentPage, _param_siblingCount = _param.siblingCount, siblingCount = _param_siblingCount === void 0 ? 1 : _param_siblingCount, _param_boundaryCount = _param.boundaryCount, boundaryCount = _param_boundaryCount === void 0 ? 1 : _param_boundaryCount, _param_totalPages = _param.totalPages, totalPages = _param_totalPages === void 0 ? 1 : _param_totalPages, disabled = _param.disabled, _param_getPageAriaLabel = _param.getPageAriaLabel, getPageAriaLabel = _param_getPageAriaLabel === void 0 ? getPageAriaLabelDefault : _param_getPageAriaLabel, _param_prevButtonAriaLabel = _param.prevButtonAriaLabel, prevButtonAriaLabel = _param_prevButtonAriaLabel === void 0 ? "Перейти на предыдущую страницу" : _param_prevButtonAriaLabel, _param_nextButtonAriaLabel = _param.nextButtonAriaLabel, nextButtonAriaLabel = _param_nextButtonAriaLabel === void 0 ? "Перейти на следующую страницу" : _param_nextButtonAriaLabel, onChange = _param.onChange, resetProps = _object_without_properties(_param, [
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
    var pages = usePagination({
        currentPage: currentPage,
        totalPages: totalPages,
        siblingCount: siblingCount,
        boundaryCount: boundaryCount
    });
    var isFirstPage = currentPage === 1;
    var isLastPage = currentPage === totalPages;
    var handlePrevClick = React.useCallback(function() {
        if (onChange && !isFirstPage) {
            onChange(currentPage - 1);
        }
    }, [
        currentPage,
        isFirstPage,
        onChange
    ]);
    var handleClick = React.useCallback(function(event) {
        var page = event.currentTarget.dataset.page || "1";
        onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
    }, [
        onChange
    ]);
    var handleNextClick = React.useCallback(function() {
        if (onChange && !isLastPage) {
            onChange(currentPage + 1);
        }
    }, [
        currentPage,
        isLastPage,
        onChange
    ]);
    var renderPages = React.useCallback(function(page) {
        switch(page){
            case "start-ellipsis":
            case "end-ellipsis":
                return /*#__PURE__*/ React.createElement("li", {
                    key: page
                }, /*#__PURE__*/ React.createElement(PaginationPageEllipsis, {
                    disabled: disabled
                }));
            default:
                {
                    var isCurrent = page === currentPage;
                    return /*#__PURE__*/ React.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ React.createElement(PaginationPageButton, {
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "nav",
        role: "navigation",
        "aria-label": "Навигация по страницам"
    }, resetProps), /*#__PURE__*/ React.createElement("ul", {
        className: "vkuiPagination__list"
    }, /*#__PURE__*/ React.createElement("li", {
        className: "vkuiPagination__prevButtonContainer"
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        before: /*#__PURE__*/ React.createElement(Icon24ChevronCompactLeft, {
            width: 24
        }),
        appearance: "accent",
        mode: "tertiary",
        disabled: isFirstPage || disabled,
        "aria-label": prevButtonAriaLabel,
        onClick: handlePrevClick
    })), pages.map(renderPages), /*#__PURE__*/ React.createElement("li", {
        className: "vkuiPagination__nextButtonContainer"
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        after: /*#__PURE__*/ React.createElement(Icon24ChevronCompactRight, {
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