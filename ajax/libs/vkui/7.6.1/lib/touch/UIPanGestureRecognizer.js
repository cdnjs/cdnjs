import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { millisecondsInSecond } from "../date.js";
import { getFirstTouchEventData } from "../dom.js";
const DEFAULT_INITIAL_TIME = 0;
/**
 * JS имплементация класса из UIKIt iOS.
 *
 * https://developer.apple.com/documentation/uikit/uipangesturerecognizer
 */ export class UIPanGestureRecognizer {
    setInitialTimeOnce() {
        if (this.initialTime === DEFAULT_INITIAL_TIME) {
            this.initialTime = Date.now();
        }
    }
    setStartCoords(event) {
        const { clientX, clientY } = getFirstTouchEventData(event);
        this.x1 = clientX;
        this.y1 = clientY;
    }
    setEndCoords(event) {
        const { clientX, clientY } = getFirstTouchEventData(event);
        this.x2 = clientX;
        this.y2 = clientY;
    }
    delta() {
        return {
            x: this.x2 - this.x1,
            y: this.y2 - this.y1
        };
    }
    distance() {
        const { x, y } = this.delta();
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    velocity() {
        const deltaTime = (Date.now() - this.initialTime) / millisecondsInSecond;
        if (deltaTime <= 0) {
            return {
                x: 0,
                y: 0
            };
        }
        const { x, y } = this.delta();
        return {
            x: x / deltaTime,
            y: y / deltaTime
        };
    }
    angle() {
        const deltaX = this.x2 - this.x1;
        const deltaY = this.y2 - this.y1;
        const radians = Math.atan2(deltaY, deltaX);
        const degrees = radians * 180 / Math.PI;
        return degrees < 0 ? 360 + degrees : degrees;
    }
    direction() {
        const { x, y } = this.delta();
        return Math.abs(x) > Math.abs(y) ? {
            axis: 'x',
            direction: x > 0 ? 1 : x < 0 ? -1 : null
        } : {
            axis: 'y',
            direction: y > 0 ? 1 : y < 0 ? -1 : null
        };
    }
    reset() {
        this.initialTime = DEFAULT_INITIAL_TIME;
        this.x1 = this.y1 = 0;
        this.x2 = this.y2 = 0;
    }
    constructor(){
        _define_property(this, "initialTime", DEFAULT_INITIAL_TIME);
        _define_property(this, "x1", 0);
        _define_property(this, "y1", 0);
        _define_property(this, "x2", 0);
        _define_property(this, "y2", 0);
    }
}

//# sourceMappingURL=UIPanGestureRecognizer.js.map