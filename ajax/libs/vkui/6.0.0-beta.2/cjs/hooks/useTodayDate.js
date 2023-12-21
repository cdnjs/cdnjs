"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTodayDate", {
    enumerable: true,
    get: function() {
        return useTodayDate;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _date = require("../lib/date");
const _dom = require("../lib/dom");
function useTodayDate(listenDayChangesForUpdate = false) {
    const { document, window } = (0, _dom.useDOM)();
    const [todayDate, setTodayDate] = _react.useState(()=>new Date());
    _react.useEffect(()=>{
        if (!listenDayChangesForUpdate || !document || !window) {
            return;
        }
        let timeout = undefined;
        const recalcTimeout = ()=>{
            if (document.visibilityState === 'visible') {
                const now = new Date();
                const timeToDayChange = (0, _date.getMillisecondsToTomorrow)(now);
                // Удаляем старый таймаут
                window.clearTimeout(timeout);
                // Создаем новый таймаут
                timeout = window.setTimeout(()=>{
                    setTodayDate(now);
                }, timeToDayChange);
                // Если todayDate не обновился в таймаут - обновить при заходе на вкладку
                if (!(0, _date.isSameDay)(todayDate, now)) {
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