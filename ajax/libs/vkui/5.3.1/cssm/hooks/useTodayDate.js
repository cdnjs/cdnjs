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
 */ export function useTodayDate(listenDayChangesForUpdate = false) {
    const [todayDate, setTodayDate] = React.useState(()=>new Date());
    React.useEffect(()=>{
        if (!listenDayChangesForUpdate) {
            return;
        }
        const timeToDayChange = getMillisecondsToTomorrow(todayDate);
        const timeout = setTimeout(()=>{
            setTodayDate(new Date());
        }, timeToDayChange);
        return ()=>{
            clearTimeout(timeout);
        };
    }, [
        listenDayChangesForUpdate,
        todayDate
    ]);
    return todayDate;
}

//# sourceMappingURL=useTodayDate.js.map