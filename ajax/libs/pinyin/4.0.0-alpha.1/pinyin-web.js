var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "./PinyinBase", "./util"], function (require, exports, PinyinBase_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compact = exports.compare = exports.pinyin = exports.Pinyin = void 0;
    PinyinBase_1 = __importStar(PinyinBase_1);
    var Pinyin = (function (_super) {
        __extends(Pinyin, _super);
        function Pinyin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Pinyin;
    }(PinyinBase_1.default));
    exports.Pinyin = Pinyin;
    exports.pinyin = (0, PinyinBase_1.getPinyinInstance)(new Pinyin());
    exports.default = exports.pinyin;
    exports.compare = exports.pinyin.compare;
    Object.defineProperty(exports, "compact", { enumerable: true, get: function () { return util_1.compact; } });
});
//# sourceMappingURL=pinyin-web.js.map