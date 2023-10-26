import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { getMillisecondsToTomorrow, isSameDay } from "../lib/date";
import { useDOM } from "../lib/dom";
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
    var _useDOM = useDOM(), document = _useDOM.document, window = _useDOM.window;
    var _React_useState = _sliced_to_array(React.useState(function() {
        return new Date();
    }), 2), todayDate = _React_useState[0], setTodayDate = _React_useState[1];
    React.useEffect(function() {
        if (!listenDayChangesForUpdate || !document || !window) {
            return;
        }
        var timeout = undefined;
        var recalcTimeout = function() {
            if (document.visibilityState === "visible") {
                var now = new Date();
                var timeToDayChange = getMillisecondsToTomorrow(now);
                // Удаляем старый таймаут
                window.clearTimeout(timeout);
                // Создаем новый таймаут
                timeout = window.setTimeout(function() {
                    setTodayDate(now);
                }, timeToDayChange);
                // Если todayDate не обновился в таймаут - обновить при заходе на вкладку
                if (!isSameDay(todayDate, now)) {
                    setTodayDate(now);
                }
            }
        };
        recalcTimeout();
        // Создаем слушатель visibilitychange, чтобы предотвратить пропуск обновления стейта после заморозки вкладки
        // Если человек ее долго не трогал или закрывал крышку ноута и тп
        // https://developer.chrome.com/blog/page-lifecycle-api/
        document.addEventListener("visibilitychange", recalcTimeout);
        return function() {
            window.clearTimeout(timeout);
            document.removeEventListener("visibilitychange", recalcTimeout);
        };
    }, [
        document,
        listenDayChangesForUpdate,
        todayDate,
        window
    ]);
    return todayDate;
}

//# sourceMappingURL=useTodayDate.js.map