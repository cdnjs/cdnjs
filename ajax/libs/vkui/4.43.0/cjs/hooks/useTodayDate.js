"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTodayDate = useTodayDate;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _date = require("../lib/date");
/**
 * Опционально обновляемая дата сегодняшнего дня
 *
 * Дата - сегодня (в соответствии с системным временем)
 *
 * Часы, минуты, секунды, миллисекунды - произвольные
 *
 * @param listenDayChangesForUpdate - флаг по которому определяется, будет ли создаваться подписка на смену календарного дня
 */
function useTodayDate() {
  var listenDayChangesForUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = _react.default.useState(function () {
      return new Date();
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    todayDate = _React$useState2[0],
    setTodayDate = _React$useState2[1];
  _react.default.useEffect(function () {
    if (!listenDayChangesForUpdate) {
      return;
    }
    var timeToDayChange = (0, _date.getMillisecondsToTomorrow)(todayDate);
    var timeout = setTimeout(function () {
      setTodayDate(new Date());
    }, timeToDayChange);
    return function () {
      clearTimeout(timeout);
    };
  }, [listenDayChangesForUpdate, todayDate]);
  return todayDate;
}
//# sourceMappingURL=useTodayDate.js.map