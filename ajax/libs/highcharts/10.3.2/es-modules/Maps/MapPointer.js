/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Pointer from '../Core/Pointer.js';
import U from '../Core/Utilities.js';
var defined = U.defined, extend = U.extend, pick = U.pick, wrap = U.wrap;
/* eslint-disable no-invalid-this */
var normalize = Pointer.prototype.normalize;
var totalWheelDelta = 0;
var totalWheelDeltaTimer;
// Extend the Pointer
extend(Pointer.prototype, {
    // Add lon and lat information to pointer events
    normalize: function (e, chartPosition) {
        var chart = this.chart;
        e = normalize.call(this, e, chartPosition);
        if (chart && chart.mapView) {
            var lonLat = chart.mapView.pixelsToLonLat({
                x: e.chartX - chart.plotLeft,
                y: e.chartY - chart.plotTop
            });
            if (lonLat) {
                extend(e, lonLat);
            }
        }
        return e;
    },
    // The event handler for the doubleclick event
    onContainerDblClick: function (e) {
        var chart = this.chart;
        e = this.normalize(e);
        if (chart.options.mapNavigation.enableDoubleClickZoomTo) {
            if (chart.pointer.inClass(e.target, 'highcharts-tracker') &&
                chart.hoverPoint) {
                chart.hoverPoint.zoomTo();
            }
        }
        else if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
            chart.mapZoom(0.5, void 0, void 0, e.chartX, e.chartY);
        }
    },
    // The event handler for the mouse scroll event
    onContainerMouseWheel: function (e) {
        var chart = this.chart;
        e = this.normalize(e);
        // Firefox uses e.deltaY or e.detail, WebKit and IE uses wheelDelta
        // try wheelDelta first #15656
        var delta = (defined(e.wheelDelta) && -e.wheelDelta / 120) ||
            e.deltaY || e.detail;
        // Wheel zooming on trackpads have different behaviours in Firefox vs
        // WebKit. In Firefox the delta increments in steps by 1, so it is not
        // distinguishable from true mouse wheel. Therefore we use this timer
        // to avoid trackpad zooming going too fast and out of control. In
        // WebKit however, the delta is < 1, so we simply disable animation in
        // the `chart.mapZoom` call below.
        if (Math.abs(delta) >= 1) {
            totalWheelDelta += Math.abs(delta);
            if (totalWheelDeltaTimer) {
                clearTimeout(totalWheelDeltaTimer);
            }
            totalWheelDeltaTimer = setTimeout(function () {
                totalWheelDelta = 0;
            }, 50);
        }
        if (totalWheelDelta < 10 && chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop) && chart.mapView) {
            chart.mapView.zoomBy((chart.options.mapNavigation.mouseWheelSensitivity -
                1) * -delta, void 0, [e.chartX, e.chartY], 
            // Delta less than 1 indicates stepless/trackpad zooming, avoid
            // animation delaying the zoom
            Math.abs(delta) < 1 ? false : void 0);
        }
    }
});
// The pinchType is inferred from mapNavigation options.
wrap(Pointer.prototype, 'zoomOption', function (proceed) {
    var mapNavigation = this.chart.options.mapNavigation;
    // Pinch status
    if (pick(mapNavigation.enableTouchZoom, mapNavigation.enabled)) {
        this.chart.options.chart.zooming.pinchType = 'xy';
    }
    proceed.apply(this, [].slice.call(arguments, 1));
});
// Extend the pinchTranslate method to preserve fixed ratio when zooming
wrap(Pointer.prototype, 'pinchTranslate', function (proceed, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch) {
    var xBigger;
    proceed.call(this, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);
    // Keep ratio
    if (this.chart.options.chart.type === 'map' && this.hasZoom) {
        xBigger = transform.scaleX > transform.scaleY;
        this.pinchTranslateDirection(!xBigger, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch, xBigger ? transform.scaleX : transform.scaleY);
    }
});
