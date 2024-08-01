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
const sizeXCompactClassNames = {
    mq: {
        className: "vkui-sizeX--compact-mq"
    },
    ['compact']: {
        className: "vkui-sizeX--compact-forced"
    }
};
const sizeXRegularClassNames = {
    mq: {
        className: "vkui-sizeX--regular-mq"
    },
    ['regular']: {
        className: "vkui-sizeX--regular-forced"
    }
};
const sizeYCompactClassNames = {
    mq: {
        className: "vkui-sizeY--compact-mq"
    },
    ['compact']: {
        className: "vkui-sizeY--compact-forced"
    }
};
const sizeYRegularClassNames = {
    mq: {
        className: "vkui-sizeY--regular-mq"
    },
    ['regular']: {
        className: "vkui-sizeY--regular-forced"
    }
};
const viewWidthClassNames = {
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
const deviceTypeClassNames = {
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