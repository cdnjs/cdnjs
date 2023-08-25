// TODO [>=6]: удалить этот хеллпер
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPlatformClassName", {
    enumerable: true,
    get: function() {
        return getPlatformClassName;
    }
});
var _platform = require("../lib/platform");
function getPlatformClassName(base) {
    var osname = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, _platform.platform)(), /**
   * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
   *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
   */ styles = arguments.length > 2 ? arguments[2] : void 0;
    var platformClassName = "".concat(String(base), "--").concat(osname);
    return styles ? styles[platformClassName] : platformClassName;
}

//# sourceMappingURL=getPlatformClassName.js.map