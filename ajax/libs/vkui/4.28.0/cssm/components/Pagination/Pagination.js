import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["currentPage", "siblingCount", "boundaryCount", "totalPages", "disabled", "getPageAriaLabel", "prevButtonAriaLabel", "nextButtonAriaLabel", "getRootRef", "onChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from "@vkontakte/icons";
import { classNames } from "../../lib/classNames";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePagination } from "../../hooks/usePagination";
import Tappable from "../Tappable/Tappable";
import Button from "../Button/Button";
import "./Pagination.css";

function getPageAriaLabelDefault(page, isCurrent) {
  return isCurrent ? "".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430") : "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 ".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443");
}

export var Pagination = function Pagination(_ref) {
  var _ref$currentPage = _ref.currentPage,
      currentPage = _ref$currentPage === void 0 ? 1 : _ref$currentPage,
      _ref$siblingCount = _ref.siblingCount,
      siblingCount = _ref$siblingCount === void 0 ? 1 : _ref$siblingCount,
      _ref$boundaryCount = _ref.boundaryCount,
      boundaryCount = _ref$boundaryCount === void 0 ? 1 : _ref$boundaryCount,
      _ref$totalPages = _ref.totalPages,
      totalPages = _ref$totalPages === void 0 ? 1 : _ref$totalPages,
      disabled = _ref.disabled,
      _ref$getPageAriaLabel = _ref.getPageAriaLabel,
      getPageAriaLabel = _ref$getPageAriaLabel === void 0 ? getPageAriaLabelDefault : _ref$getPageAriaLabel,
      _ref$prevButtonAriaLa = _ref.prevButtonAriaLabel,
      prevButtonAriaLabel = _ref$prevButtonAriaLa === void 0 ? "Перейти на предыдущую страницу" : _ref$prevButtonAriaLa,
      _ref$nextButtonAriaLa = _ref.nextButtonAriaLabel,
      nextButtonAriaLabel = _ref$nextButtonAriaLa === void 0 ? "Перейти на следующую страницу" : _ref$nextButtonAriaLa,
      getRootRef = _ref.getRootRef,
      onChange = _ref.onChange,
      resetProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var pages = usePagination({
    currentPage: currentPage,
    totalPages: totalPages,
    siblingCount: siblingCount,
    boundaryCount: boundaryCount
  });
  var isFirstPage = currentPage === 1;
  var isLastPage = currentPage === totalPages;
  var handlePrevClick = React.useCallback(function () {
    if (onChange && !isFirstPage) {
      onChange(currentPage - 1);
    }
  }, [currentPage, isFirstPage, onChange]);
  var handleClick = React.useCallback(function (event) {
    var page = event.currentTarget.dataset.page || "1";
    onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
  }, [onChange]);
  var handleNextClick = React.useCallback(function () {
    if (onChange && !isLastPage) {
      onChange(currentPage + 1);
    }
  }, [currentPage, isLastPage, onChange]);
  var renderPages = React.useCallback(function (page) {
    switch (page) {
      case "start-ellipsis":
      case "end-ellipsis":
        return createScopedElement("li", {
          key: page
        }, createScopedElement("div", {
          vkuiClass: classNames("Pagination__page", "Pagination__page--type-ellipsis", "Pagination__page--sizeY-".concat(sizeY), disabled && "Pagination__page--disabled")
        }, "..."));

      default:
        {
          var _isCurrent = page === currentPage;

          return createScopedElement("li", {
            key: page
          }, createScopedElement(Tappable, {
            vkuiClass: classNames("Pagination__page", "Pagination__page--sizeY-".concat(sizeY), _isCurrent && "Pagination__page--current", disabled && "Pagination__page--disabled"),
            activeMode: "Pagination__page--state-active",
            hoverMode: "Pagination__page--state-hover",
            hasActive: !_isCurrent,
            hasHover: !_isCurrent,
            focusVisibleMode: "outside",
            disabled: disabled,
            "data-page": page,
            "aria-current": _isCurrent ? true : undefined,
            "aria-label": getPageAriaLabel(page, _isCurrent),
            onClick: handleClick
          }, page));
        }
    }
  }, [sizeY, currentPage, disabled, getPageAriaLabel, handleClick]);
  return createScopedElement("nav", _extends({
    vkuiClass: "Pagination",
    role: "navigation",
    "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u043C",
    ref: getRootRef
  }, resetProps), createScopedElement("ul", {
    vkuiClass: "Pagination__list"
  }, createScopedElement("li", {
    vkuiClass: "Pagination__prevButtonContainer"
  }, createScopedElement(Button, {
    size: "l",
    before: createScopedElement(Icon24ChevronCompactLeft, {
      width: 24
    }),
    appearance: "accent",
    mode: "tertiary",
    stretched: true,
    disabled: isFirstPage || disabled,
    "aria-label": prevButtonAriaLabel,
    onClick: handlePrevClick
  })), pages.map(renderPages), createScopedElement("li", {
    vkuiClass: "Pagination__nextButtonContainer"
  }, createScopedElement(Button, {
    size: "l",
    after: createScopedElement(Icon24ChevronCompactRight, {
      width: 24
    }),
    appearance: "accent",
    mode: "tertiary",
    stretched: true,
    disabled: isLastPage || disabled,
    "aria-label": nextButtonAriaLabel,
    onClick: handleNextClick
  }))));
};
//# sourceMappingURL=Pagination.js.map