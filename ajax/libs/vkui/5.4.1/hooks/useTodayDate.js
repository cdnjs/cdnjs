import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import React from "react";
import { getMillisecondsToTomorrow } from "../lib/date";
/**
 * Опционально обновляемая дата сегодняшнего дня
 *
 * Дата - сегодня (в соответствии с системным временем)
 *
 * Часы, минуты, секунды, миллисекунды - произвольные
 *
 * @param listenDayChangesForUpdate - флаг по которому определяется, будет ли создаваться подписка на смену календарного дня
 */ export function useTodayDate() {
    var listenDayChangesForUpdate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array(React.useState(function() {
        return new Date();
    }), 2), todayDate = _React_useState[0], setTodayDate = _React_useState[1];
    React.useEffect(function() {
        if (!listenDayChangesForUpdate) {
            return;
        }
        var timeToDayChange = getMillisecondsToTomorrow(todayDate);
        var timeout = setTimeout(function() {
            setTodayDate(new Date());
        }, timeToDayChange);
        return function() {
            clearTimeout(timeout);
        };
    }, [
        listenDayChangesForUpdate,
        todayDate
    ]);
    return todayDate;
}

//# sourceMappingURL=useTodayDate.js.map