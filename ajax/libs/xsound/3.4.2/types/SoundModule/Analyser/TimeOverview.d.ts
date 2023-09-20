import { ChannelNumber } from '/src/types';
import { Visualizer, VisualizerParams, Color, GraphicsStyles } from '/src/SoundModule/Analyser/Visualizer';
export type MouseEventTypes = 'mousedown' | 'mousemove' | 'mouseup' | 'touchstart' | 'touchmove' | 'touchend';
export type DragMode = 'update' | 'sprite';
export type DragCallbackFunction = (event: MouseEvent | TouchEvent, startTime: number, endTime: number, mode: DragMode, direction: boolean) => void;
export type CurrentTimeStyles = {
    width?: number;
    color?: Color;
};
export type TimeOverviewParams = VisualizerParams & {
    currentTime?: CurrentTimeStyles;
    sprite?: Color;
    plotInterval?: number;
    textInterval?: number;
    mode?: DragMode;
};
/**
 * This private class visualizes audio wave overview in time domain.
 * @constructor
 * @extends {Visualizer}
 */
export declare class TimeOverview extends Visualizer {
    private callback;
    private currentImageData;
    private currentSVGElement;
    private currentDataSize;
    private currentTime;
    private sprite;
    private plotInterval;
    private textInterval;
    private isDown;
    private mode;
    private offsetX;
    private startTime;
    private endTime;
    /**
     * @param {number} sampleRate This argument is sample rate.
     * @param {ChannelNumber} channel This argument is channel number (Left: 0, Right: 1 ...).
     */
    constructor(sampleRate: number, channel: ChannelNumber);
    /** @override */
    setup(element: HTMLCanvasElement | SVGSVGElement): TimeOverview;
    /**
     * This method gets or sets parameters for visualizing audio wave.
     * This method is overloaded for type interface and type check.
     * @param {keyof TimeOverviewParams|TimeOverviewParams} params This argument is string if getter. Otherwise, setter.
     * @return {TimeOverviewParams[keyof TimeOverviewParams]|TimeOverview} Return value is parameter for visualizing audio wave if getter.
     *     Otherwise, return value is for method chain.
     * @override
     */
    param(params: 'interval'): number;
    param(params: 'styles'): GraphicsStyles;
    param(params: 'currentTime'): CurrentTimeStyles;
    param(params: 'sprite'): Color;
    param(params: 'plotInterval'): number;
    param(params: 'textInterval'): number;
    param(params: 'mode'): DragMode;
    param(params: TimeOverviewParams): TimeOverview;
    /**
     * This method visualizes audio current time on Canvas or SVG.
     * @param {number} time This argument is audio current time.
     * @return {TimeOverview} Return value is for method chain.
     */
    update(time: number): TimeOverview;
    /**
     * This method registers event listener for updating current time or spriting audio by drag.
     * @param {DragCallbackFunction} callback This argument is invoked during drag.
     * @return {TimeOverview} Return value is for method chain.
     */
    drag(callback?: DragCallbackFunction): TimeOverview;
    /** @override */
    clear(): TimeOverview;
    /** @override */
    activate(): TimeOverview;
    /** @override */
    deactivate(): TimeOverview;
    /**
     * This method visualizes audio wave overview to Canvas.
     * @param {Float32Array} data This argument is audio data for visualization.
     * @override
     */
    protected visualizeOnCanvas(data: Uint8Array | Float32Array, _minDecibels?: number, _maxDecibels?: number): void;
    /**
     * This method visualizes audio wave overview to SVG.
     * @param {Float32Array} data This argument is audio data for visualization.
     * @override
     */
    protected visualizeBySVG(data: Uint8Array | Float32Array, _minDecibels?: number, _maxDecibels?: number): void;
    /**
     * This method visualizes rectangle for audio current time.
     * @param {MouseEvent|TouchEvent} event This argument is instance of `MouseEvent` or `TouchEvent`.
     * @param {MouseEventTypes} type This argument is one of 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'.
     * @param {number} offsetX This argument is X coordinate on Canvas or SVG from window.
     */
    private visualize;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {MouseEvent} event This argument is instance of `MouseEvent`.
     */
    private onMouseStart;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {MouseEvent} event This argument is instance of `MouseEvent`.
     */
    private onMouseMove;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {MouseEvent} event This argument is instance of `MouseEvent`.
     */
    private onMouseUp;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {TouchEvent} event This argument is instance of `TouchEvent`.
     */
    private onTouchStart;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {TouchEvent} event This argument is instance of `TouchEvent`.
     */
    private onTouchMove;
    /**
     * This method is event listener for visualizing rectangle.
     * @param {TouchEvent} event This argument is instance of `TouchEvent`.
     */
    private onTouchEnd;
    /**
     * This method returns X coordinate from instance of `MouseEvent` or `TouchEvent`.
     * @param {MouseEvent|TouchEvent} event This argument is instance of `MouseEvent` or `TouchEvent`.
     * @return {number} Return value is X coordinate as mouse or touch position.
     */
    private getOffsetX;
}
//# sourceMappingURL=TimeOverview.d.ts.map