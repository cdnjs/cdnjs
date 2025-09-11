import * as React from "react";
import { isSameDate } from "@vkontakte/vkjs";
import { startOfTomorrow } from "../lib/date.js";
import { useDOM } from "../lib/dom.js";
/**
 * Опционально обновляемая дата сегодняшнего дня
 *
 * Дата - сегодня (в соответствии с системным временем)
 *
 * Часы, минуты, секунды, миллисекунды - произвольные
 *
 * @param listenDayChangesForUpdate - флаг по которому определяется, будет ли создаваться подписка на смену календарного дня
 */ export function useTodayDate(listenDayChangesForUpdate = false) {
    const { document, window } = useDOM();
    const [todayDate, setTodayDate] = React.useState(()=>new Date());
    React.useEffect(function setupTodaysDateRecalculationListener() {
        if (!listenDayChangesForUpdate || !document || !window) {
            return;
        }
        let timeout = undefined;
        const recalcTimeout = ()=>{
            if (document.visibilityState === 'visible') {
                const now = new Date();
                const timeToDayChange = Number(startOfTomorrow()) - Number(now);
                // Удаляем старый таймаут
                window.clearTimeout(timeout);
                // Создаем новый таймаут
                timeout = window.setTimeout(()=>{
                    setTodayDate(new Date());
                }, timeToDayChange);
                // Если todayDate не обновился в таймаут - обновить при заходе на вкладку
                if (!isSameDate(todayDate, now)) {
                    setTodayDate(now);
                }
            }
        };
        recalcTimeout();
        // Создаем слушатель visibilitychange, чтобы предотвратить пропуск обновления стейта после заморозки вкладки
        // Если человек ее долго не трогал или закрывал крышку ноута и тп
        // https://developer.chrome.com/blog/page-lifecycle-api/
        document.addEventListener('visibilitychange', recalcTimeout);
        return ()=>{
            window.clearTimeout(timeout);
            document.removeEventListener('visibilitychange', recalcTimeout);
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