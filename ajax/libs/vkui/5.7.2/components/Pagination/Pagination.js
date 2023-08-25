import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePagination } from "../../hooks/usePagination";
import { SizeType } from "../../lib/adaptivity";
import { Button } from "../Button/Button";
import { Tappable } from "../Tappable/Tappable";
import { Text } from "../Typography/Text/Text";
function getPageAriaLabelDefault(page, isCurrent) {
    return isCurrent ? "".concat(page, " страница") : "Перейти на ".concat(page, " страницу");
}
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */ export var Pagination = function(_param) {
    var _param_currentPage = _param.currentPage, currentPage = _param_currentPage === void 0 ? 1 : _param_currentPage, _param_siblingCount = _param.siblingCount, siblingCount = _param_siblingCount === void 0 ? 1 : _param_siblingCount, _param_boundaryCount = _param.boundaryCount, boundaryCount = _param_boundaryCount === void 0 ? 1 : _param_boundaryCount, _param_totalPages = _param.totalPages, totalPages = _param_totalPages === void 0 ? 1 : _param_totalPages, disabled = _param.disabled, _param_getPageAriaLabel = _param.getPageAriaLabel, getPageAriaLabel = _param_getPageAriaLabel === void 0 ? getPageAriaLabelDefault : _param_getPageAriaLabel, _param_prevButtonAriaLabel = _param.prevButtonAriaLabel, prevButtonAriaLabel = _param_prevButtonAriaLabel === void 0 ? "Перейти на предыдущую страницу" : _param_prevButtonAriaLabel, _param_nextButtonAriaLabel = _param.nextButtonAriaLabel, nextButtonAriaLabel = _param_nextButtonAriaLabel === void 0 ? "Перейти на следующую страницу" : _param_nextButtonAriaLabel, getRootRef = _param.getRootRef, onChange = _param.onChange, resetProps = _object_without_properties(_param, [
        "currentPage",
        "siblingCount",
        "boundaryCount",
        "totalPages",
        "disabled",
        "getPageAriaLabel",
        "prevButtonAriaLabel",
        "nextButtonAriaLabel",
        "getRootRef",
        "onChange"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
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
        var _onChange;
        var page = event.currentTarget.dataset.page || "1";
        (_onChange = onChange) === null || _onChange === void 0 ? void 0 : _onChange(Number(page));
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
                }, /*#__PURE__*/ React.createElement(Text, {
                    className: classNames("vkuiPagination__page", "vkuiPagination__page--type-ellipsis", sizeY === "none" && "vkuiPagination__page--sizeY-none", sizeY === SizeType.COMPACT && "vkuiPagination__page--sizeY-compact", disabled && "vkuiPagination__page--disabled")
                }, "…"));
            default:
                {
                    var isCurrent = page === currentPage;
                    return /*#__PURE__*/ React.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ React.createElement(Tappable, {
                        className: classNames("vkuiPagination__page", sizeY === "none" && "vkuiPagination__page--sizeY-none", sizeY === SizeType.COMPACT && "vkuiPagination__page--sizeY-compact", isCurrent && "vkuiPagination__page--current", disabled && "vkuiPagination__page--disabled"),
                        activeMode: "vkuiPagination__page--state-active",
                        hoverMode: "vkuiPagination__page--state-hover",
                        hasActive: !isCurrent,
                        hasHover: !isCurrent,
                        focusVisibleMode: "outside",
                        disabled: disabled,
                        "data-page": page,
                        "aria-current": isCurrent ? true : undefined,
                        "aria-label": getPageAriaLabel(page, isCurrent),
                        onClick: handleClick
                    }, /*#__PURE__*/ React.createElement(Text, {
                        normalize: false
                    }, page)));
                }
        }
    }, [
        sizeY,
        currentPage,
        disabled,
        getPageAriaLabel,
        handleClick
    ]);
    return /*#__PURE__*/ React.createElement("nav", _object_spread({
        role: "navigation",
        "aria-label": "Навигация по страницам",
        ref: getRootRef
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