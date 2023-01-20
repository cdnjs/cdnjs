export default ZoomSlider;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * Function called when the control
     * should be re-rendered. This is called in a `requestAnimationFrame` callback.
     */
    render?: ((arg0: import("../MapEvent.js").default) => void) | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoomslider'] CSS class name.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 */
/**
 * @classdesc
 * A slider type of control for zooming.
 *
 * Example:
 *
 *     map.addControl(new ZoomSlider());
 *
 * @api
 */
declare class ZoomSlider extends Control {
    /**
     * @param {Options} [opt_options] Zoom slider options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @type {!Array<import("../events.js").EventsKey>}
     * @private
     */
    private dragListenerKeys_;
    /**
     * Will hold the current resolution of the view.
     *
     * @type {number|undefined}
     * @private
     */
    private currentResolution_;
    /**
     * The direction of the slider. Will be determined from actual display of the
     * container and defaults to Direction.VERTICAL.
     *
     * @type {Direction}
     * @private
     */
    private direction_;
    /**
     * @type {boolean}
     * @private
     */
    private dragging_;
    /**
     * @type {number}
     * @private
     */
    private heightLimit_;
    /**
     * @type {number}
     * @private
     */
    private widthLimit_;
    /**
     * @type {number|undefined}
     * @private
     */
    private startX_;
    /**
     * @type {number|undefined}
     * @private
     */
    private startY_;
    /**
     * The calculated thumb size (border box plus margins).  Set when initSlider_
     * is called.
     * @type {import("../size.js").Size}
     * @private
     */
    private thumbSize_;
    /**
     * Whether the slider is initialized.
     * @type {boolean}
     * @private
     */
    private sliderInitialized_;
    /**
     * @type {number}
     * @private
     */
    private duration_;
    /**
     * Initializes the slider element. This will determine and set this controls
     * direction_ and also constrain the dragging of the thumb to always be within
     * the bounds of the container.
     *
     * @return {boolean} Initialization successful
     * @private
     */
    private initSlider_;
    /**
     * @param {PointerEvent} event The browser event to handle.
     * @private
     */
    private handleContainerClick_;
    /**
     * Handle dragger start events.
     * @param {PointerEvent} event The drag event.
     * @private
     */
    private handleDraggerStart_;
    /**
     * Handle dragger drag events.
     *
     * @param {PointerEvent} event The drag event.
     * @private
     */
    private handleDraggerDrag_;
    /**
     * Handle dragger end events.
     * @param {PointerEvent} event The drag event.
     * @private
     */
    private handleDraggerEnd_;
    /**
     * Positions the thumb inside its container according to the given resolution.
     *
     * @param {number} res The res.
     * @private
     */
    private setThumbPosition_;
    /**
     * Calculates the relative position of the thumb given x and y offsets.  The
     * relative position scales from 0 to 1.  The x and y offsets are assumed to be
     * in pixel units within the dragger limits.
     *
     * @param {number} x Pixel position relative to the left of the slider.
     * @param {number} y Pixel position relative to the top of the slider.
     * @return {number} The relative position of the thumb.
     * @private
     */
    private getRelativePosition_;
    /**
     * Calculates the corresponding resolution of the thumb given its relative
     * position (where 0 is the minimum and 1 is the maximum).
     *
     * @param {number} position The relative position of the thumb.
     * @return {number} The corresponding resolution.
     * @private
     */
    private getResolutionForPosition_;
    /**
     * Determines the relative position of the slider for the given resolution.  A
     * relative position of 0 corresponds to the minimum view resolution.  A
     * relative position of 1 corresponds to the maximum view resolution.
     *
     * @param {number} res The resolution.
     * @return {number} The relative position value (between 0 and 1).
     * @private
     */
    private getPositionForResolution_;
}
import Control from "./Control.js";
//# sourceMappingURL=ZoomSlider.d.ts.map