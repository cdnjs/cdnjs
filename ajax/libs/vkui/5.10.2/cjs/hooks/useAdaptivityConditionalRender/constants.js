"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    deviceTypeClassNames: function() {
        return deviceTypeClassNames;
    },
    sizeXCompactClassNames: function() {
        return sizeXCompactClassNames;
    },
    sizeXRegularClassNames: function() {
        return sizeXRegularClassNames;
    },
    sizeYCompactClassNames: function() {
        return sizeYCompactClassNames;
    },
    sizeYRegularClassNames: function() {
        return sizeYRegularClassNames;
    },
    viewWidthClassNames: function() {
        return viewWidthClassNames;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _adaptivity = require("../../lib/adaptivity");
var sizeXCompactClassNames = _define_property._({
    mq: {
        className: "vkui-sizeX--compact-mq"
    }
}, _adaptivity.SizeType.COMPACT, {
    className: "vkui-sizeX--compact-forced"
});
var sizeXRegularClassNames = _define_property._({
    mq: {
        className: "vkui-sizeX--regular-mq"
    }
}, _adaptivity.SizeType.REGULAR, {
    className: "vkui-sizeX--regular-forced"
});
var sizeYCompactClassNames = _define_property._({
    mq: {
        className: "vkui-sizeY--compact-mq"
    }
}, _adaptivity.SizeType.COMPACT, {
    className: "vkui-sizeY--compact-forced"
});
var sizeYRegularClassNames = _define_property._({
    mq: {
        className: "vkui-sizeY--regular-mq"
    }
}, _adaptivity.SizeType.REGULAR, {
    className: "vkui-sizeY--regular-forced"
});
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

//# sourceMappingURL=constants.js.map