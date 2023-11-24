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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _date = require("../lib/date");
var _dom = require("../lib/dom");
function useTodayDate() {
    var listenDayChangesForUpdate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _useDOM = (0, _dom.useDOM)(), document = _useDOM.document, window = _useDOM.window;
    var _React_useState = _sliced_to_array._(_react.useState(function() {
        return new Date();
    }), 2), todayDate = _React_useState[0], setTodayDate = _React_useState[1];
    _react.useEffect(function() {
        if (!listenDayChangesForUpdate || !document || !window) {
            return;
        }
        var timeout = undefined;
        var recalcTimeout = function() {
            if (document.visibilityState === "visible") {
                var now = new Date();
                var timeToDayChange = (0, _date.getMillisecondsToTomorrow)(now);
                // Удаляем старый таймаут
                window.clearTimeout(timeout);
                // Создаем новый таймаут
                timeout = window.setTimeout(function() {
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