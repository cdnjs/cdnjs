"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewWidthClassNames = exports.sizeYRegularClassNames = exports.sizeYCompactClassNames = exports.sizeXRegularClassNames = exports.sizeXCompactClassNames = exports.deviceTypeClassNames = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _adaptivity = require("../../lib/adaptivity");
var sizeXCompactClassNames = (0, _defineProperty2.default)({
  mq: {
    className: "vkui-sizeX--compact-mq"
  }
}, _adaptivity.SizeType.COMPACT, {
  className: "vkui-sizeX--compact-forced"
});
exports.sizeXCompactClassNames = sizeXCompactClassNames;
var sizeXRegularClassNames = (0, _defineProperty2.default)({
  mq: {
    className: "vkui-sizeX--regular-mq"
  }
}, _adaptivity.SizeType.REGULAR, {
  className: "vkui-sizeX--regular-forced"
});
exports.sizeXRegularClassNames = sizeXRegularClassNames;
var sizeYCompactClassNames = (0, _defineProperty2.default)({
  mq: {
    className: "vkui-sizeY--compact-mq"
  }
}, _adaptivity.SizeType.COMPACT, {
  className: "vkui-sizeY--compact-forced"
});
exports.sizeYCompactClassNames = sizeYCompactClassNames;
var sizeYRegularClassNames = (0, _defineProperty2.default)({
  mq: {
    className: "vkui-sizeY--regular-mq"
  }
}, _adaptivity.SizeType.REGULAR, {
  className: "vkui-sizeY--regular-forced"
});
exports.sizeYRegularClassNames = sizeYRegularClassNames;
var viewWidthClassNames = {
  tabletMinus: {
    mq: {
      className: "vkui-viewWidth--tabletMinus-mq"
    },
    forced: {
      className: "vkui-viewWidth--tabletMinus-forced"
    }
  },
  tabletPlus: {
    mq: {
      className: "vkui-viewWidth--tabletPlus-mq"
    },
    forced: {
      className: "vkui-viewWidth--tabletPlus-forced"
    }
  }
};
exports.viewWidthClassNames = viewWidthClassNames;
var deviceTypeClassNames = {
  mobile: {
    mq: {
      className: "vkui-deviceType--mobile-mq"
    },
    forced: {
      className: "vkui-deviceType--mobile-forced"
    }
  },
  desktop: {
    mq: {
      className: "vkui-deviceType--desktop-mq"
    },
    forced: {
      className: "vkui-deviceType--desktop-forced"
    }
  }
};
exports.deviceTypeClassNames = deviceTypeClassNames;
//# sourceMappingURL=constants.js.map