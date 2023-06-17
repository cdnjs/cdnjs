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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _date = require("../lib/date");
function useTodayDate() {
    var listenDayChangesForUpdate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _slicedToArray(_react.default.useState(function() {
        return new Date();
    }), 2), todayDate = _React_useState[0], setTodayDate = _React_useState[1];
    _react.default.useEffect(function() {
        if (!listenDayChangesForUpdate) {
            return;
        }
        var timeToDayChange = (0, _date.getMillisecondsToTomorrow)(todayDate);
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