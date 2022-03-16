"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _classNames = require("../../lib/classNames");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _usePagination = require("../../hooks/usePagination");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _excluded = ["currentPage", "siblingCount", "boundaryCount", "totalPages", "disabled", "getPageAriaLabel", "prevButtonAriaLabel", "nextButtonAriaLabel", "getRootRef", "onChange"];

function getPageAriaLabelDefault(page, isCurrent) {
  return isCurrent ? "".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430") : "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 ".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443");
}

var Pagination = function Pagination(_ref) {
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
      resetProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var pages = (0, _usePagination.usePagination)({
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
        return (0, _jsxRuntime.createScopedElement)("li", {
          key: page
        }, (0, _jsxRuntime.createScopedElement)("div", {
          vkuiClass: (0, _classNames.classNames)("Pagination__page", "Pagination__page--type-ellipsis", "Pagination__page--sizeY-".concat(sizeY), disabled && "Pagination__page--disabled")
        }, "..."));

      default:
        {
          var _isCurrent = page === currentPage;

          return (0, _jsxRuntime.createScopedElement)("li", {
            key: page
          }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
            vkuiClass: (0, _classNames.classNames)("Pagination__page", "Pagination__page--sizeY-".concat(sizeY), _isCurrent && "Pagination__page--current", disabled && "Pagination__page--disabled"),
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
  return (0, _jsxRuntime.createScopedElement)("nav", (0, _extends2.default)({
    vkuiClass: "Pagination",
    role: "navigation",
    "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u043C",
    ref: getRootRef
  }, resetProps), (0, _jsxRuntime.createScopedElement)("ul", {
    vkuiClass: "Pagination__list"
  }, (0, _jsxRuntime.createScopedElement)("li", {
    vkuiClass: "Pagination__prevButtonContainer"
  }, (0, _jsxRuntime.createScopedElement)(_Button.default, {
    size: "l",
    before: (0, _jsxRuntime.createScopedElement)(_icons.Icon24ChevronCompactLeft, {
      width: 24
    }),
    appearance: "accent",
    mode: "tertiary",
    stretched: true,
    disabled: isFirstPage || disabled,
    "aria-label": prevButtonAriaLabel,
    onClick: handlePrevClick
  })), pages.map(renderPages), (0, _jsxRuntime.createScopedElement)("li", {
    vkuiClass: "Pagination__nextButtonContainer"
  }, (0, _jsxRuntime.createScopedElement)(_Button.default, {
    size: "l",
    after: (0, _jsxRuntime.createScopedElement)(_icons.Icon24ChevronCompactRight, {
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

exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map