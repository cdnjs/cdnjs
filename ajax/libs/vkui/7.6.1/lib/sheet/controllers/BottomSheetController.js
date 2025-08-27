import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { noop } from "@vkontakte/vkjs";
import { clamp } from "../../../helpers/math.js";
import { rubberbandIfOutOfBounds } from "../../animation/index.js";
import { getNearestOverflowAncestor, hasSelectionWithRangeType } from "../../dom.js";
import { UIPanGestureRecognizer } from "../../touch/UIPanGestureRecognizer.js";
import { BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE_KEY, DRAG_THRESHOLDS, DYNAMIC_SNAP_POINT_DATA, SNAP_POINT_DETENTS } from "../constants.js";
export class BottomSheetController {
    init(snapPoint) {
        this.isInitialized = true;
        if (snapPoint === 'auto') {
            this.unit = 'px';
            this.currentSnapPoint = DYNAMIC_SNAP_POINT_DATA.IDLE_POINT_VALUE;
            this.snapPointDetents = [
                SNAP_POINT_DETENTS.MIN,
                DYNAMIC_SNAP_POINT_DATA.IDLE_POINT_VALUE
            ];
        } else {
            this.unit = '%';
            this.currentSnapPoint = snapPoint.initial;
            this.snapPointDetents = snapPoint.detents;
        }
    }
    destroy() {
        var _this_backdropTransitionController;
        this.isInitialized = false;
        this.pannedEl = null;
        this.sheetTransitionController.cleanup();
        (_this_backdropTransitionController = this.backdropTransitionController) === null || _this_backdropTransitionController === void 0 ? void 0 : _this_backdropTransitionController.cleanup();
        this.disableVerticalScrollBouncingDispose();
        this.disableVerticalScrollBouncingDispose = noop;
    }
    panStart(event) {
        if (!this.isInitialized || this.panState !== 'idle' || hasSelectionWithRangeType(event.target)) {
            return;
        }
        this.panState = 'start';
        this.pannedEl = event.target;
        this.panGestureRecognizer.setStartCoords(event);
    }
    panMove(event) {
        switch(this.panState){
            case 'start':
                this.panGestureRecognizer.setInitialTimeOnce();
                this.panGestureRecognizer.setEndCoords(event);
                if (this.preventUntilPanGestureBecomesExpected()) {
                    return;
                }
                if (this.preventImmediatelyIfPannedElIsNotValid()) {
                    this.panState = 'idle';
                    return;
                }
                if (this.preventUntilVerticalScrollingOnSheetScrollElBecomesExpected()) {
                    return;
                }
                if (this.preventImmediatelyIfVerticalScrollingOnPannedElIsScrolled()) {
                    this.panState = 'idle';
                    return;
                }
                this.panState = 'moving';
                this.panGestureRecognizer.setStartCoords(event);
                this.sheetHeight = this.sheetEl.offsetHeight;
                this.disableVerticalScrollBouncingDispose = BottomSheetController.disableVerticalScrollBouncingIfNeeded(this.sheetScrollEl, this.pannedEl);
                if (this.isDynamicSnapPoint) {
                    this.currentSnapPoint = this.sheetHeight;
                    this.snapPointDetents[DYNAMIC_SNAP_POINT_DATA.COMPUTED_INDEX] = this.sheetHeight;
                }
                break;
            case 'moving':
                this.panGestureRecognizer.setEndCoords(event);
                const { y1, y2 } = this.panGestureRecognizer;
                this.nextSnapPoint = rubberbandIfOutOfBounds(this.currentSnapPoint - (y2 - y1) / this.sheetHeight * this.currentSnapPoint, SNAP_POINT_DETENTS.MIN, this.isDynamicSnapPoint ? this.sheetHeight : SNAP_POINT_DETENTS.LARGE);
                this.calculateSnapPoint(this.nextSnapPoint, true);
                break;
        }
    }
    panEnd() {
        switch(this.panState){
            case 'moving':
                const prevCurrentSnapPoint = this.currentSnapPoint;
                this.currentSnapPoint = this.getSnapPointTo(this.nextSnapPoint);
                if (prevCurrentSnapPoint !== this.currentSnapPoint && this.currentSnapPoint > SNAP_POINT_DETENTS.MIN) {
                    this.onSnapPointChange(this.currentSnapPoint);
                }
                this.calculateSnapPoint(this.currentSnapPoint);
                break;
        }
        this.panState = 'idle';
        this.panGestureRecognizer.reset();
        this.disableVerticalScrollBouncingDispose();
        this.disableVerticalScrollBouncingDispose = noop;
    }
    get isDynamicSnapPoint() {
        return this.unit === 'px';
    }
    calculateSnapPoint(nextSnapPoint, immediately = false) {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
        if (nextSnapPoint <= SNAP_POINT_DETENTS.MIN) {
            var _this_backdropTransitionController;
            this.sheetTransitionController.enableTransition();
            (_this_backdropTransitionController = this.backdropTransitionController) === null || _this_backdropTransitionController === void 0 ? void 0 : _this_backdropTransitionController.enableTransition();
            this.panState = 'idle';
            this.onDismiss();
            return;
        }
        const backdropOpacity = clamp(this.isDynamicSnapPoint ? nextSnapPoint / this.sheetHeight : nextSnapPoint * 2 / SNAP_POINT_DETENTS.LARGE, 0, 1);
        this.rafId = requestAnimationFrame(()=>{
            var _this_backdropTransitionController;
            if (immediately) {
                var _this_backdropTransitionController1;
                (_this_backdropTransitionController1 = this.backdropTransitionController) === null || _this_backdropTransitionController1 === void 0 ? void 0 : _this_backdropTransitionController1.disableTransition().set(backdropOpacity);
                this.sheetTransitionController.disableTransition().set(`${nextSnapPoint}${this.unit}`);
                return;
            }
            if (this.isDynamicSnapPoint) {
                this.sheetTransitionController.cleanupOnTransitionEnd();
            }
            (_this_backdropTransitionController = this.backdropTransitionController) === null || _this_backdropTransitionController === void 0 ? void 0 : _this_backdropTransitionController.unset();
            this.sheetTransitionController.enableTransition().set(`${this.currentSnapPoint}${this.unit}`);
        });
    }
    getSnapPointTo(nextSnapPoint) {
        const closestSnapPoint = BottomSheetController.getClosestSnapPoint(this.snapPointDetents, nextSnapPoint);
        if (closestSnapPoint !== this.currentSnapPoint) {
            return closestSnapPoint;
        }
        const panDirection = this.panGestureRecognizer.direction();
        if (panDirection.axis !== 'y' || panDirection.direction === null) {
            return this.currentSnapPoint;
        }
        const velocity = this.panGestureRecognizer.velocity();
        if (Math.abs(velocity.y) < DRAG_THRESHOLDS.VELOCITY) {
            return this.currentSnapPoint;
        }
        const closestSnapPointByDirection = BottomSheetController.getClosestSnapPointByDirection(this.snapPointDetents, closestSnapPoint, panDirection.direction);
        return closestSnapPointByDirection;
    }
    preventUntilPanGestureBecomesExpected() {
        return this.panGestureRecognizer.direction().axis === 'x' || this.panGestureRecognizer.distance() < DRAG_THRESHOLDS.DISTANCE_FOR_MOVING_START;
    }
    preventImmediatelyIfPannedElIsNotValid() {
        return this.pannedEl === null || // Элемент со специальным атрибутом
        this.pannedEl.closest(`[${BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE_KEY}=true]`) !== null || // eslint-disable-line no-restricted-properties
        // Элемент за пределами панели.
        !this.sheetEl.contains(this.pannedEl);
    }
    preventUntilVerticalScrollingOnSheetScrollElBecomesExpected() {
        if (this.sheetScrollEl === null || !this.sheetScrollEl.contains(this.pannedEl) || this.sheetScrollEl.scrollHeight <= this.sheetScrollEl.clientHeight) {
            return false;
        }
        if (this.sheetScrollEl.scrollTop === 0) {
            return this.panGestureRecognizer.direction().direction === -1 && BottomSheetController.isLastSnapPointDetents(this.snapPointDetents, this.currentSnapPoint);
        }
        return true;
    }
    preventImmediatelyIfVerticalScrollingOnPannedElIsScrolled() {
        if (/* istanbul ignore next: покрываем TypeScript */ this.pannedEl === null || this.pannedEl === this.sheetEl || this.pannedEl === this.sheetScrollEl) {
            return false;
        }
        const overflowAncestor = getNearestOverflowAncestor(this.pannedEl, this.sheetEl);
        if (overflowAncestor === null || this.sheetScrollEl === overflowAncestor || overflowAncestor.scrollHeight <= overflowAncestor.clientHeight) {
            return false;
        }
        return overflowAncestor.scrollTop !== 0 || this.panGestureRecognizer.direction().direction === -1;
    }
    static disableVerticalScrollBouncingIfNeeded(sheetScrollEl, targetEl) {
        if (sheetScrollEl !== null && sheetScrollEl.scrollTop <= 0 && sheetScrollEl.contains(targetEl) && sheetScrollEl.scrollHeight > sheetScrollEl.clientHeight) {
            sheetScrollEl.style.setProperty('overflow-y', 'hidden');
            return function dispose() {
                sheetScrollEl.style.removeProperty('overflow-y');
            };
        }
        return noop;
    }
    static isLastSnapPointDetents(snapPointDetents, currentY) {
        return currentY === snapPointDetents[snapPointDetents.length - 1];
    }
    static getClosestSnapPointByDirection(snapPointDetents, currentY, direction) {
        const foundIndex = snapPointDetents.findIndex((i)=>i === currentY);
        switch(direction){
            case -1:
                var _snapPointDetents_;
                return (_snapPointDetents_ = snapPointDetents[foundIndex + 1]) !== null && _snapPointDetents_ !== void 0 ? _snapPointDetents_ : snapPointDetents[snapPointDetents.length - 1];
            case 1:
                var _snapPointDetents_1;
                return (_snapPointDetents_1 = snapPointDetents[foundIndex - 1]) !== null && _snapPointDetents_1 !== void 0 ? _snapPointDetents_1 : snapPointDetents[0];
        }
    }
    static getClosestSnapPoint(snapPointDetents, currentY) {
        let closest = snapPointDetents[0];
        let minDifference = Math.abs(snapPointDetents[0] - currentY);
        for(let i = 1; i < snapPointDetents.length; i += 1){
            const difference = Math.abs(snapPointDetents[i] - currentY);
            if (difference < minDifference) {
                closest = snapPointDetents[i];
                minDifference = difference;
            }
        }
        return closest;
    }
    constructor(sheetEl, { sheetScrollEl, sheetTransitionController, backdropTransitionController, onSnapPointChange, onDismiss }){
        _define_property(this, "sheetEl", void 0);
        _define_property(this, "isInitialized", false);
        _define_property(this, "panState", 'idle');
        _define_property(this, "pannedEl", null);
        _define_property(this, "sheetHeight", 0);
        _define_property(this, "rafId", null);
        _define_property(this, "currentSnapPoint", 0);
        _define_property(this, "nextSnapPoint", 0);
        _define_property(this, "snapPointDetents", [
            0,
            0
        ]);
        _define_property(this, "unit", '%');
        _define_property(this, "disableVerticalScrollBouncingDispose", noop);
        _define_property(this, "sheetScrollEl", void 0);
        _define_property(this, "sheetTransitionController", void 0);
        _define_property(this, "backdropTransitionController", void 0);
        _define_property(this, "panGestureRecognizer", void 0);
        _define_property(this, "onSnapPointChange", void 0);
        _define_property(this, "onDismiss", void 0);
        this.sheetEl = sheetEl;
        this.onSnapPointChange = onSnapPointChange;
        this.onDismiss = onDismiss;
        this.panGestureRecognizer = new UIPanGestureRecognizer();
        this.sheetScrollEl = sheetScrollEl;
        this.sheetTransitionController = sheetTransitionController;
        this.backdropTransitionController = backdropTransitionController;
    }
}

//# sourceMappingURL=BottomSheetController.js.map