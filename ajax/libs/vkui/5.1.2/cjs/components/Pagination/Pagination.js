"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _usePagination = require("../../hooks/usePagination");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _Tappable = require("../Tappable/Tappable");
var _Button = require("../Button/Button");
var _excluded = ["currentPage", "siblingCount", "boundaryCount", "totalPages", "disabled", "getPageAriaLabel", "prevButtonAriaLabel", "nextButtonAriaLabel", "getRootRef", "onChange", "className"];
function getPageAriaLabelDefault(page, isCurrent) {
  return isCurrent ? "".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430") : "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 ".concat(page, " \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443");
}
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */
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
    prevButtonAriaLabel = _ref$prevButtonAriaLa === void 0 ? 'Перейти на предыдущую страницу' : _ref$prevButtonAriaLa,
    _ref$nextButtonAriaLa = _ref.nextButtonAriaLabel,
    nextButtonAriaLabel = _ref$nextButtonAriaLa === void 0 ? 'Перейти на следующую страницу' : _ref$nextButtonAriaLa,
    getRootRef = _ref.getRootRef,
    onChange = _ref.onChange,
    className = _ref.className,
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
    var page = event.currentTarget.dataset.page || '1';
    onChange === null || onChange === void 0 ? void 0 : onChange(Number(page));
  }, [onChange]);
  var handleNextClick = React.useCallback(function () {
    if (onChange && !isLastPage) {
      onChange(currentPage + 1);
    }
  }, [currentPage, isLastPage, onChange]);
  var renderPages = React.useCallback(function (page) {
    switch (page) {
      case 'start-ellipsis':
      case 'end-ellipsis':
        return /*#__PURE__*/React.createElement("li", {
          key: page
        }, /*#__PURE__*/React.createElement("div", {
          className: (0, _vkjs.classNames)("vkuiPagination__page", "vkuiPagination__page--type-ellipsis", (0, _getSizeYClassName.getSizeYClassName)("vkuiPagination__page", sizeY), disabled && "vkuiPagination__page--disabled")
        }, "..."));
      default:
        {
          var _isCurrent = page === currentPage;
          return /*#__PURE__*/React.createElement("li", {
            key: page
          }, /*#__PURE__*/React.createElement(_Tappable.Tappable, {
            className: (0, _vkjs.classNames)("vkuiPagination__page", (0, _getSizeYClassName.getSizeYClassName)("vkuiPagination__page", sizeY), _isCurrent && "vkuiPagination__page--current", disabled && "vkuiPagination__page--disabled"),
            activeMode: "vkuiPagination__page--state-active",
            hoverMode: "vkuiPagination__page--state-hover",
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
  return /*#__PURE__*/React.createElement("nav", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiPagination", className),
    role: "navigation",
    "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u043C",
    ref: getRootRef
  }, resetProps), /*#__PURE__*/React.createElement("ul", {
    className: "vkuiPagination__list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "vkuiPagination__prevButtonContainer"
  }, /*#__PURE__*/React.createElement(_Button.Button, {
    size: "l",
    before: /*#__PURE__*/React.createElement(_icons.Icon24ChevronCompactLeft, {
      width: 24
    }),
    appearance: "accent",
    mode: "tertiary",
    disabled: isFirstPage || disabled,
    "aria-label": prevButtonAriaLabel,
    onClick: handlePrevClick
  })), pages.map(renderPages), /*#__PURE__*/React.createElement("li", {
    className: "vkuiPagination__nextButtonContainer"
  }, /*#__PURE__*/React.createElement(_Button.Button, {
    size: "l",
    after: /*#__PURE__*/React.createElement(_icons.Icon24ChevronCompactRight, {
      width: 24
    }),
    appearance: "accent",
    mode: "tertiary",
    disabled: isLastPage || disabled,
    "aria-label": nextButtonAriaLabel,
    onClick: handleNextClick
  }))));
};
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map