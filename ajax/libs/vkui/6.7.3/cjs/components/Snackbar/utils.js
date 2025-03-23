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
    getInitialShiftData: function() {
        return getInitialShiftData;
    },
    getMovedShiftData: function() {
        return getMovedShiftData;
    },
    resolveOffsetYCssStyle: function() {
        return resolveOffsetYCssStyle;
    },
    shouldBeClosedByShiftData: function() {
        return shouldBeClosedByShiftData;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _animation = require("../../lib/animation");
function resolveOffsetYCssStyle(placement, style, offsetY) {
    if (offsetY === undefined) {
        return style;
    }
    switch(placement){
        case 'top-start':
        case 'top':
        case 'top-end':
            return _object_spread_props._(_object_spread._({}, style), {
                top: offsetY
            });
        case 'bottom-start':
        case 'bottom':
        case 'bottom-end':
            return _object_spread_props._(_object_spread._({}, style), {
                bottom: offsetY
            });
    }
}
function getInitialShiftData(width, height, mediaQueries) {
    return {
        shifted: false,
        direction: null,
        isDesktop: mediaQueries.smallTabletPlus.matches,
        x: 0,
        y: 0,
        width,
        height
    };
}
function getMovedShiftData(placement, shiftData, nextShift) {
    /* istanbul ignore else: TODO чтобы протестировать кейс в блоке else, нужно мокать useMediaQueries(), чтобы перебивать mediaQueries.smallTabletPlus.matches */ if (shiftData.isDesktop) {
        if (placement.endsWith('start')) {
            shiftData.x = (0, _animation.rubberbandIfOutOfBounds)(nextShift.x, -shiftData.width, 0);
        } else if (placement.endsWith('end')) {
            shiftData.x = (0, _animation.rubberbandIfOutOfBounds)(nextShift.x, 0, shiftData.width);
        }
        if (placement.startsWith('bottom')) {
            shiftData.y = (0, _animation.rubberbandIfOutOfBounds)(nextShift.y, 0, shiftData.height);
        }
    } else if (placement.startsWith('bottom')) {
        shiftData.x = nextShift.x;
        const movingToLeft = nextShift.x < 0 ? -1 : null;
        const movingToRight = nextShift.x > 0 ? 1 : null;
        shiftData.direction = movingToLeft || movingToRight;
    }
    if (placement.startsWith('top')) {
        shiftData.y = (0, _animation.rubberbandIfOutOfBounds)(nextShift.y, -shiftData.height, 0);
    }
    shiftData.shifted = true;
    return shiftData;
}
const MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE = 200;
function shouldBeClosedByShiftData(placement, shiftData, relativeClientRect, velocity) {
    if (!shiftData.shifted) {
        return false;
    }
    const shouldBeClosedThreshold = {
        x: false,
        y: false
    };
    const shouldBeClosedByVelocity = {
        x: false,
        y: false
    };
    /* istanbul ignore else: TODO чтобы протестировать кейс в блоке else, нужно мокать useMediaQueries(), чтобы перебивать mediaQueries.smallTabletPlus.matches */ if (shiftData.isDesktop) {
        if (placement.endsWith('start')) {
            shouldBeClosedThreshold.x = relativeClientRect.x < -relativeClientRect.width / 2;
            shouldBeClosedByVelocity.x = relativeClientRect.x < 0 ? velocity.x < -MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE : false;
        } else if (placement.endsWith('end')) {
            shouldBeClosedThreshold.x = relativeClientRect.x > relativeClientRect.width / 2;
            shouldBeClosedByVelocity.x = relativeClientRect.x > 0 ? velocity.x > MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE : false;
        }
        if (placement.startsWith('bottom')) {
            shouldBeClosedThreshold.y = relativeClientRect.y > relativeClientRect.height / 2;
            shouldBeClosedByVelocity.y = relativeClientRect.y > 0 ? velocity.y > MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE : false;
        }
    } else if (placement.startsWith('bottom')) {
        shouldBeClosedThreshold.x = relativeClientRect.x < -relativeClientRect.width / 2 || relativeClientRect.x > relativeClientRect.width / 2;
        shouldBeClosedByVelocity.x = relativeClientRect.x < 0 && velocity.x < -MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE || relativeClientRect.x > 0 && velocity.x > MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE;
    }
    if (placement.startsWith('top')) {
        shouldBeClosedThreshold.y = relativeClientRect.y < -relativeClientRect.height / 2;
        shouldBeClosedByVelocity.y = relativeClientRect.y < 0 ? velocity.y < -MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE : false;
    }
    return shouldBeClosedThreshold.x || shouldBeClosedByVelocity.x || shouldBeClosedThreshold.y || /* istanbul ignore next: подсвечивает жёлтым и пишет "branch not covered" */ shouldBeClosedByVelocity.y;
}

//# sourceMappingURL=utils.js.map