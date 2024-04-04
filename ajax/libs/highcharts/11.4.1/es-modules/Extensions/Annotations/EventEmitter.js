/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
const { doc, isTouchDevice } = H;
import U from '../../Core/Utilities.js';
const { addEvent, fireEvent, objectEach, pick, removeEvent } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 */
class EventEmitter {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add emitter events.
     * @private
     */
    addEvents() {
        const emitter = this, addMouseDownEvent = function (element) {
            addEvent(element, isTouchDevice ? 'touchstart' : 'mousedown', (e) => {
                emitter.onMouseDown(e);
            }, { passive: false });
        };
        addMouseDownEvent(this.graphic.element);
        (emitter.labels || []).forEach((label) => {
            if (label.options.useHTML && label.graphic.text) {
                // Mousedown event bound to HTML element (#13070).
                addMouseDownEvent(label.graphic.text.element);
            }
        });
        objectEach(emitter.options.events, (event, type) => {
            const eventHandler = function (e) {
                if (type !== 'click' || !emitter.cancelClick) {
                    event.call(emitter, emitter.chart.pointer?.normalize(e), emitter.target);
                }
            };
            if ((emitter.nonDOMEvents || []).indexOf(type) === -1) {
                addEvent(emitter.graphic.element, type, eventHandler, { passive: false });
                if (emitter.graphic.div) {
                    addEvent(emitter.graphic.div, type, eventHandler, { passive: false });
                }
            }
            else {
                addEvent(emitter, type, eventHandler, { passive: false });
            }
        });
        if (emitter.options.draggable) {
            addEvent(emitter, 'drag', emitter.onDrag);
            if (!emitter.graphic.renderer.styledMode) {
                const cssPointer = {
                    cursor: {
                        x: 'ew-resize',
                        y: 'ns-resize',
                        xy: 'move'
                    }[emitter.options.draggable]
                };
                emitter.graphic.css(cssPointer);
                (emitter.labels || []).forEach((label) => {
                    if (label.options.useHTML && label.graphic.text) {
                        label.graphic.text.css(cssPointer);
                    }
                });
            }
        }
        if (!emitter.isUpdating) {
            fireEvent(emitter, 'add');
        }
    }
    /**
     * Destroy the event emitter.
     */
    destroy() {
        this.removeDocEvents();
        removeEvent(this);
        this.hcEvents = null;
    }
    /**
     * Map mouse move event to the radians.
     * @private
     */
    mouseMoveToRadians(e, cx, cy) {
        let prevDy = e.prevChartY - cy, prevDx = e.prevChartX - cx, dy = e.chartY - cy, dx = e.chartX - cx, temp;
        if (this.chart.inverted) {
            temp = prevDx;
            prevDx = prevDy;
            prevDy = temp;
            temp = dx;
            dx = dy;
            dy = temp;
        }
        return Math.atan2(dy, dx) - Math.atan2(prevDy, prevDx);
    }
    /**
     * Map mouse move to the scale factors.
     * @private
     */
    mouseMoveToScale(e, cx, cy) {
        const prevDx = e.prevChartX - cx, prevDy = e.prevChartY - cy, dx = e.chartX - cx, dy = e.chartY - cy;
        let sx = (dx || 1) / (prevDx || 1), sy = (dy || 1) / (prevDy || 1);
        if (this.chart.inverted) {
            const temp = sy;
            sy = sx;
            sx = temp;
        }
        return {
            x: sx,
            y: sy
        };
    }
    /**
     * Map mouse move event to the distance between two following events.
     * @private
     */
    mouseMoveToTranslation(e) {
        let dx = e.chartX - e.prevChartX, dy = e.chartY - e.prevChartY, temp;
        if (this.chart.inverted) {
            temp = dy;
            dy = dx;
            dx = temp;
        }
        return {
            x: dx,
            y: dy
        };
    }
    /**
     * Drag and drop event. All basic annotations should share this
     * capability as well as the extended ones.
     * @private
     */
    onDrag(e) {
        if (this.chart.isInsidePlot(e.chartX - this.chart.plotLeft, e.chartY - this.chart.plotTop, {
            visiblePlotOnly: true
        })) {
            const translation = this.mouseMoveToTranslation(e);
            if (this.options.draggable === 'x') {
                translation.y = 0;
            }
            if (this.options.draggable === 'y') {
                translation.x = 0;
            }
            const emitter = this;
            if (emitter.points.length) {
                emitter.translate(translation.x, translation.y);
            }
            else {
                emitter.shapes.forEach((shape) => shape.translate(translation.x, translation.y));
                emitter.labels.forEach((label) => label.translate(translation.x, translation.y));
            }
            this.redraw(false);
        }
    }
    /**
     * Mouse down handler.
     * @private
     */
    onMouseDown(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        // On right click, do nothing:
        if (e.button === 2) {
            return;
        }
        const emitter = this, pointer = emitter.chart.pointer, 
        // Using experimental property on event object to check if event was
        // created by touch on screen on hybrid device (#18122)
        firesTouchEvents = (e?.sourceCapabilities?.firesTouchEvents) || false;
        e = pointer?.normalize(e) || e;
        let prevChartX = e.chartX, prevChartY = e.chartY;
        emitter.cancelClick = false;
        emitter.chart.hasDraggedAnnotation = true;
        emitter.removeDrag = addEvent(doc, isTouchDevice || firesTouchEvents ? 'touchmove' : 'mousemove', function (e) {
            emitter.hasDragged = true;
            e = pointer?.normalize(e) || e;
            e.prevChartX = prevChartX;
            e.prevChartY = prevChartY;
            fireEvent(emitter, 'drag', e);
            prevChartX = e.chartX;
            prevChartY = e.chartY;
        }, isTouchDevice || firesTouchEvents ? { passive: false } : void 0);
        emitter.removeMouseUp = addEvent(doc, isTouchDevice || firesTouchEvents ? 'touchend' : 'mouseup', function () {
            // Sometimes the target is the annotation and sometimes its the
            // controllable
            const annotation = pick(emitter.target && emitter.target.annotation, emitter.target);
            if (annotation) {
                // Keep annotation selected after dragging control point
                annotation.cancelClick = emitter.hasDragged;
            }
            emitter.cancelClick = emitter.hasDragged;
            emitter.hasDragged = false;
            emitter.chart.hasDraggedAnnotation = false;
            // ControlPoints vs Annotation:
            fireEvent(pick(annotation, // #15952
            emitter), 'afterUpdate');
            emitter.onMouseUp();
        }, isTouchDevice || firesTouchEvents ? { passive: false } : void 0);
    }
    /**
     * Mouse up handler.
     */
    onMouseUp() {
        const chart = this.chart, annotation = this.target || this, annotationsOptions = chart.options.annotations, index = chart.annotations.indexOf(annotation);
        this.removeDocEvents();
        annotationsOptions[index] = annotation.options;
    }
    /**
     * Remove emitter document events.
     * @private
     */
    removeDocEvents() {
        if (this.removeDrag) {
            this.removeDrag = this.removeDrag();
        }
        if (this.removeMouseUp) {
            this.removeMouseUp = this.removeMouseUp();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default EventEmitter;
