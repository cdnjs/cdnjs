/* *
 *
 *  (c) 2009-2025 Øystein Moseng
 *
 *  Accessibility component for series and points.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AccessibilityComponent from '../../AccessibilityComponent.js';
import ChartUtilities from '../../Utils/ChartUtilities.js';
const { hideSeriesFromAT } = ChartUtilities;
import ForcedMarkers from './ForcedMarkers.js';
import NewDataAnnouncer from './NewDataAnnouncer.js';
import SeriesDescriber from './SeriesDescriber.js';
const { describeSeries } = SeriesDescriber;
import SeriesKeyboardNavigation from './SeriesKeyboardNavigation.js';
/* *
 *
 *  Class
 *
 * */
/**
 * The SeriesComponent class
 *
 * @private
 * @class
 * @name Highcharts.SeriesComponent
 */
class SeriesComponent extends AccessibilityComponent {
    /* *
     *
     *  Static Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    static compose(ChartClass, PointClass, SeriesClass) {
        NewDataAnnouncer.compose(SeriesClass);
        ForcedMarkers.compose(SeriesClass);
        SeriesKeyboardNavigation.compose(ChartClass, PointClass, SeriesClass);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Init the component.
     */
    init() {
        this.newDataAnnouncer = new NewDataAnnouncer(this.chart);
        this.newDataAnnouncer.init();
        this.keyboardNavigation = new SeriesKeyboardNavigation(this.chart, this.keyCodes);
        this.keyboardNavigation.init();
        this.hideTooltipFromATWhenShown();
        this.hideSeriesLabelsFromATWhenShown();
    }
    /**
     * @private
     */
    hideTooltipFromATWhenShown() {
        const component = this;
        if (this.chart.tooltip) {
            this.addEvent(this.chart.tooltip.constructor, 'refresh', function () {
                if (this.chart === component.chart &&
                    this.label &&
                    this.label.element) {
                    this.label.element.setAttribute('aria-hidden', true);
                }
            });
        }
    }
    /**
     * @private
     */
    hideSeriesLabelsFromATWhenShown() {
        this.addEvent(this.chart, 'afterDrawSeriesLabels', function () {
            this.series.forEach(function (series) {
                if (series.labelBySeries) {
                    series.labelBySeries.attr('aria-hidden', true);
                }
            });
        });
    }
    /**
     * Called on chart render. It is necessary to do this for render in case
     * markers change on zoom/pixel density.
     */
    onChartRender() {
        const chart = this.chart;
        chart.series.forEach(function (series) {
            const shouldDescribeSeries = (series.options.accessibility &&
                series.options.accessibility.enabled) !== false &&
                series.visible && series.getPointsCollection().length !== 0;
            if (shouldDescribeSeries) {
                describeSeries(series);
            }
            else {
                hideSeriesFromAT(series);
            }
        });
    }
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    getKeyboardNavigation() {
        return this.keyboardNavigation.getKeyboardNavigationHandler();
    }
    /**
     * Remove traces
     * @private
     */
    destroy() {
        this.newDataAnnouncer.destroy();
        this.keyboardNavigation.destroy();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default SeriesComponent;
