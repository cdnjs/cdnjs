import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React from 'react';
import { getMillisecondsToTomorrow } from '../lib/date';

/**
 * Опционально обновляемая дата сегодняшнего дня
 *
 * Дата - сегодня (в соответствии с системным временем)
 *
 * Часы, минуты, секунды, миллисекунды - произвольные
 *
 * @param listenDayChangesForUpdate - флаг по которому определяется, будет ли создаваться подписка на смену календарного дня
 */
export function useTodayDate() {
  var listenDayChangesForUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = React.useState(function () {
      return new Date();
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    todayDate = _React$useState2[0],
    setTodayDate = _React$useState2[1];
  React.useEffect(function () {
    if (!listenDayChangesForUpdate) {
      return;
    }
    var timeToDayChange = getMillisecondsToTomorrow(todayDate);
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