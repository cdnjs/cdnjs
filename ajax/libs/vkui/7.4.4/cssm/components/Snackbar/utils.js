import { rubberbandIfOutOfBounds } from "../../lib/animation/index.js";
export function resolveOffsetYCssStyle(placement, offsetY) {
    if (offsetY === undefined) {
        return undefined;
    }
    switch(placement){
        case 'top-start':
        case 'top':
        case 'top-end':
            return {
                top: offsetY
            };
        case 'bottom-start':
        case 'bottom':
        case 'bottom-end':
            return {
                bottom: offsetY
            };
    }
}
export function revertRtlValue(value, isRtl) {
    return isRtl ? -1 * value : value;
}
export function getInitialShiftData(width, height, mediaQueries) {
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
export function getMovedShiftData(placement, shiftData, nextShift, isRtl = false) {
    /* istanbul ignore else: TODO чтобы протестировать кейс в блоке else, нужно мокать useMediaQueries(), чтобы перебивать mediaQueries.smallTabletPlus.matches */ if (shiftData.isDesktop) {
        if (placement.endsWith('start')) {
            shiftData.x = isRtl ? rubberbandIfOutOfBounds(nextShift.x, 0, shiftData.width) : rubberbandIfOutOfBounds(nextShift.x, -shiftData.width, 0);
        } else if (placement.endsWith('end')) {
            shiftData.x = isRtl ? rubberbandIfOutOfBounds(nextShift.x, -shiftData.width, 0) : rubberbandIfOutOfBounds(nextShift.x, 0, shiftData.width);
        }
        if (placement.startsWith('bottom')) {
            shiftData.y = rubberbandIfOutOfBounds(nextShift.y, 0, shiftData.height);
        }
    } else if (placement.startsWith('bottom')) {
        shiftData.x = nextShift.x;
        const movingToLeft = nextShift.x < 0 ? -1 : null;
        const movingToRight = nextShift.x > 0 ? 1 : null;
        shiftData.direction = movingToLeft || movingToRight;
    }
    if (placement.startsWith('top')) {
        shiftData.y = rubberbandIfOutOfBounds(nextShift.y, -shiftData.height, 0);
    }
    shiftData.shifted = true;
    return shiftData;
}
const MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE = 200;
export function shouldBeClosedByShiftData(placement, shiftData, relativeClientRect, velocity, isRtl = false) {
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
            shouldBeClosedThreshold.x = revertRtlValue(relativeClientRect.x, isRtl) < -relativeClientRect.width / 2;
            shouldBeClosedByVelocity.x = revertRtlValue(relativeClientRect.x, isRtl) < 0 ? revertRtlValue(velocity.x, isRtl) < revertRtlValue(-MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE, isRtl) : false;
        } else if (placement.endsWith('end')) {
            shouldBeClosedThreshold.x = revertRtlValue(relativeClientRect.x, isRtl) > relativeClientRect.width / 2;
            shouldBeClosedByVelocity.x = revertRtlValue(relativeClientRect.x, isRtl) > 0 ? revertRtlValue(velocity.x, isRtl) > revertRtlValue(MINIMUM_PAN_GESTURE_FOR_TRIGGER_CLOSE, isRtl) : false;
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