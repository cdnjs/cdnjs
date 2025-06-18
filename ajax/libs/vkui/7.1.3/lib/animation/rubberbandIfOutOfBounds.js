/**
 * @author @aholachek
 *
 * @link https://twitter.com/chpwn/status/285540192096497664
 * @link https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
 */ import { clamp } from "../../helpers/math.js";
function rubberband(distance, dimension, constant) {
    if (dimension === 0 || Math.abs(dimension) === Infinity) {
        return Math.pow(distance, constant * 5);
    }
    return distance * dimension * constant / (dimension + constant * distance);
}
export function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
    if (constant === 0) {
        return clamp(position, min, max);
    }
    if (position < min) {
        return -rubberband(min - position, max - min, constant) + min;
    }
    if (position > max) {
        return +rubberband(position - max, max - min, constant) + max;
    }
    return position;
}

//# sourceMappingURL=rubberbandIfOutOfBounds.js.map