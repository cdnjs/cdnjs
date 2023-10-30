/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
/* eslint-disable require-jsdoc, max-len */
'use strict';
import U from '../../Core/Utilities.js';
const { addEvent } = U;
/**
 * Utility function that returns the first row index
 * if the table has been modified by a range modifier
 *
 * @param {DataTable} table
 * The table to get the offset from.
     *
 * @param {RangeModifierOptions} modifierOptions
 * The modifier options to use
 *
 * @return {number}
 * The row offset of the modified table.
 */
function getModifiedTableOffset(table, modifierOptions) {
    const { ranges } = modifierOptions;
    if (ranges) {
        const minRange = ranges.reduce((minRange, currentRange) => {
            if (currentRange.minValue > minRange.minValue) {
                minRange = currentRange;
            }
            return minRange;
        }, ranges[0]);
        const tableRowIndex = table.getRowIndexBy(minRange.column, minRange.minValue);
        if (tableRowIndex) {
            return tableRowIndex;
        }
    }
    return 0;
}
/* *
 *
 *  Constants
 *
 * */
const configs = {
    emitters: {
        highlightEmitter: [
            'highlightEmitter',
            function () {
                if (this.type === 'Highcharts') {
                    const { chart, board } = this;
                    if (board) {
                        const { dataCursor: cursor } = board;
                        this.on('afterRender', () => {
                            const table = this.connector && this.connector.table;
                            if (chart && chart.series && table) {
                                chart.series.forEach((series) => {
                                    series.update({
                                        point: {
                                            events: {
                                                // Emit table cursor
                                                mouseOver: function () {
                                                    let offset = 0;
                                                    const modifier = table.getModifier();
                                                    if (modifier && modifier.options.type === 'Range') {
                                                        offset = getModifiedTableOffset(table, modifier.options);
                                                    }
                                                    cursor.emitCursor(table, {
                                                        type: 'position',
                                                        row: offset + this.index,
                                                        column: series.name,
                                                        state: 'point.mouseOver'
                                                    });
                                                },
                                                mouseOut: function () {
                                                    let offset = 0;
                                                    const modifier = table.getModifier();
                                                    if (modifier && modifier.options.type === 'Range') {
                                                        offset = getModifiedTableOffset(table, modifier.options);
                                                    }
                                                    cursor.emitCursor(table, {
                                                        type: 'position',
                                                        row: offset + this.index,
                                                        column: series.name,
                                                        state: 'point.mouseOut'
                                                    });
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                        });
                        // Return function that handles cleanup
                        return function () {
                            if (chart && chart.series) {
                                chart.series.forEach((series) => {
                                    series.update({
                                        point: {
                                            events: {
                                                mouseOver: void 0,
                                                mouseOut: void 0
                                            }
                                        }
                                    });
                                });
                            }
                        };
                    }
                }
            }
        ],
        seriesVisibilityEmitter: function () {
            if (this.type === 'Highcharts') {
                const component = this;
                return this.on('afterRender', () => {
                    const { chart, connector, board } = component;
                    const table = connector && connector.table;
                    if (table && // Has a connector
                        board &&
                        chart) {
                        const { dataCursor: cursor } = board;
                        const { series } = chart;
                        series.forEach((series) => {
                            series.update({
                                events: {
                                    show: function () {
                                        cursor.emitCursor(table, {
                                            type: 'position',
                                            state: 'series.show',
                                            column: this.name
                                        });
                                    },
                                    hide: function () {
                                        cursor.emitCursor(table, {
                                            type: 'position',
                                            state: 'series.hide',
                                            column: this.name
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            }
        },
        extremesEmitter: function () {
            if (this.type === 'Highcharts') {
                const component = this;
                const callbacks = [];
                this.on('afterRender', () => {
                    const { chart, connector, board } = component;
                    const table = connector && connector.table;
                    const { dataCursor: cursor } = board;
                    if (table && chart) {
                        const extremesEventHandler = (e) => {
                            const reset = !!e.resetSelection;
                            if ((!e.trigger || (e.trigger && e.trigger !== 'dashboards-sync')) && !reset) {
                                // TODO: investigate this type?
                                const axis = e.target;
                                // Prefer a series that's in a related table,
                                // but allow for other data
                                const seriesInTable = axis.series
                                    .filter((series) => table.hasColumns([series.name]));
                                const [series] = seriesInTable.length ?
                                    seriesInTable :
                                    axis.series;
                                if (series) {
                                    // Get the indexes of the first and last drawn points
                                    const visiblePoints = series.points
                                        .filter((point) => point.isInside || false);
                                    const minCursorData = {
                                        type: 'position',
                                        state: `${axis.coll}.extremes.min`
                                    };
                                    const maxCursorData = {
                                        type: 'position',
                                        state: `${axis.coll}.extremes.max`
                                    };
                                    if (seriesInTable.length && axis.coll === 'xAxis' && visiblePoints.length) {
                                        const columnName = axis.dateTime && table.hasColumns(['x']) ?
                                            'x' :
                                            series.name;
                                        minCursorData.row = visiblePoints[0].index;
                                        minCursorData.column = columnName;
                                        maxCursorData.row = visiblePoints[visiblePoints.length - 1].index;
                                        maxCursorData.column = columnName;
                                    }
                                    // Emit as lasting cursors
                                    cursor.emitCursor(table, minCursorData, e, true).emitCursor(table, maxCursorData, e, true);
                                }
                            }
                        };
                        const addExtremesEvent = () => chart.axes.map((axis) => addEvent(axis, 'afterSetExtremes', extremesEventHandler));
                        let addExtremesEventCallbacks = addExtremesEvent();
                        const resetExtremesEvent = () => {
                            addExtremesEventCallbacks.forEach((callback) => {
                                callback();
                            });
                            addExtremesEventCallbacks = [];
                        };
                        const handleChartResetSelection = (e) => {
                            if (e.resetSelection) {
                                resetExtremesEvent();
                                cursor.emitCursor(table, {
                                    type: 'position',
                                    state: 'chart.zoomOut'
                                }, e);
                                addExtremesEventCallbacks.push(...addExtremesEvent());
                            }
                        };
                        callbacks.push(addEvent(chart, 'selection', handleChartResetSelection));
                        callbacks.push(() => {
                            cursor.remitCursor(table.id, {
                                type: 'position',
                                state: 'xAxis.extremes.min'
                            });
                            cursor.remitCursor(table.id, {
                                type: 'position',
                                state: 'xAxis.extremes.max'
                            });
                            resetExtremesEvent();
                        });
                    }
                });
                // Return cleanup
                return function () {
                    // Call back the cleanup callbacks
                    callbacks.forEach((callback) => callback());
                };
            }
        }
    },
    handlers: {
        seriesVisibilityHandler: function () {
            const component = this;
            const { board } = this;
            const findSeries = (seriesArray, name) => {
                for (const series of seriesArray) {
                    if (series.name === name) {
                        return series;
                    }
                }
            };
            const handleShow = (e) => {
                const chart = component.chart;
                if (!chart) {
                    return;
                }
                if (e.cursor.type === 'position' && e.cursor.column !== void 0) {
                    const series = findSeries(chart.series, e.cursor.column);
                    if (series) {
                        series.setVisible(true, true);
                    }
                }
            };
            const handleHide = (e) => {
                const chart = component.chart;
                if (!chart) {
                    return;
                }
                if (e.cursor.type === 'position' && e.cursor.column !== void 0) {
                    const series = findSeries(chart.series, e.cursor.column);
                    if (series) {
                        series.setVisible(false, true);
                    }
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor } = board;
                if (!dataCursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                dataCursor.addListener(table.id, 'series.show', handleShow);
                dataCursor.addListener(table.id, 'series.hide', handleHide);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                if (table) {
                    board.dataCursor.removeListener(table.id, 'series.show', handleShow);
                    board.dataCursor.removeListener(table.id, 'series.hide', handleHide);
                }
            };
            if (board) {
                registerCursorListeners();
                this.on('setConnector', () => unregisterCursorListeners());
                this.on('afterSetConnector', () => registerCursorListeners());
            }
        },
        highlightHandler: function () {
            const { chart, board } = this;
            const handleCursor = (e) => {
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                let offset = 0;
                const modifier = table.getModifier();
                if (modifier && modifier.options.type === 'Range') {
                    offset = getModifiedTableOffset(table, modifier.options);
                }
                if (chart && chart.series.length) {
                    const cursor = e.cursor;
                    if (cursor.type === 'position') {
                        const [series] = chart.series.length > 1 && cursor.column ?
                            chart.series.filter((series) => series.name === cursor.column) :
                            chart.series;
                        if (series && series.visible && cursor.row !== void 0) {
                            const point = series.points[cursor.row - offset];
                            if (point) {
                                chart.tooltip && chart.tooltip.refresh(point);
                            }
                        }
                    }
                }
            };
            const handleCursorOut = () => {
                if (chart && chart.series.length) {
                    chart.tooltip && chart.tooltip.hide();
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                // @todo wrap in a listener on component.update with
                // connector change
                if (cursor) {
                    const table = this.connector && this.connector.table;
                    if (table) {
                        cursor.addListener(table.id, 'point.mouseOver', handleCursor);
                        cursor.addListener(table.id, 'dataGrid.hoverRow', handleCursor);
                        cursor.addListener(table.id, 'point.mouseOut', handleCursorOut);
                        cursor.addListener(table.id, 'dataGrid.hoverOut', handleCursorOut);
                    }
                }
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                if (table) {
                    board.dataCursor.removeListener(table.id, 'point.mouseOver', handleCursor);
                    board.dataCursor.removeListener(table.id, 'dataGrid.hoverRow', handleCursor);
                    board.dataCursor.removeListener(table.id, 'point.mouseOut', handleCursorOut);
                    board.dataCursor.removeListener(table.id, 'dataGrid.hoverOut', handleCursorOut);
                }
            };
            if (board) {
                registerCursorListeners();
                this.on('setConnector', () => unregisterCursorListeners());
                this.on('afterSetConnector', () => registerCursorListeners());
            }
        },
        extremesHandler: function () {
            const { chart, board } = this;
            if (chart && board && chart.zooming?.type) {
                const dimensions = chart.zooming.type.split('')
                    .map((c) => c + 'Axis');
                dimensions.forEach((dimension) => {
                    const callbacks = [];
                    const handleUpdateExtremes = (e) => {
                        const { cursor, event } = e;
                        if (cursor.type === 'position') {
                            const eventTarget = event && event.target;
                            if (eventTarget && chart) {
                                const axes = chart[dimension];
                                let didZoom = false;
                                axes.forEach((axis) => {
                                    if (eventTarget.coll === axis.coll &&
                                        eventTarget !== axis &&
                                        eventTarget.min !== null &&
                                        eventTarget.max !== null && (axis.max !== eventTarget.max ||
                                        axis.min !== eventTarget.min)) {
                                        axis.setExtremes(eventTarget.min, eventTarget.max, false, void 0, {
                                            trigger: 'dashboards-sync'
                                        });
                                        didZoom = true;
                                    }
                                });
                                if (didZoom && !chart.resetZoomButton) {
                                    chart.showResetZoom();
                                }
                                chart.redraw();
                            }
                        }
                    };
                    const addCursorListeners = () => {
                        const { dataCursor: cursor } = board;
                        const { connector } = this;
                        if (connector) {
                            const { table } = connector;
                            cursor.addListener(table.id, `${dimension}.extremes.min`, handleUpdateExtremes);
                            cursor.addListener(table.id, `${dimension}.extremes.max`, handleUpdateExtremes);
                            const handleChartZoomOut = () => {
                                chart.zoomOut();
                                setTimeout(() => {
                                    // Workaround for zoom button not being removed
                                    const resetZoomButtons = this.element
                                        .querySelectorAll('.highcharts-reset-zoom');
                                    resetZoomButtons.forEach((button) => {
                                        button.remove();
                                    });
                                });
                            };
                            cursor.addListener(table.id, 'chart.zoomOut', handleChartZoomOut);
                            callbacks.push(() => {
                                cursor.removeListener(table.id, `${dimension}.extremes.min`, handleUpdateExtremes);
                                cursor.removeListener(table.id, `${dimension}.extremes.max`, handleUpdateExtremes);
                                cursor.removeListener(table.id, 'chart.zoomOut', handleChartZoomOut);
                            });
                        }
                    };
                    const unregisterCursorListeners = () => {
                        callbacks.forEach((callback) => callback());
                    };
                    if (board) {
                        addCursorListeners();
                        this.on('setConnector', () => unregisterCursorListeners());
                        this.on('afterSetConnector', () => addCursorListeners());
                    }
                });
            }
        }
    }
};
const defaults = {
    extremes: { emitter: configs.emitters.extremesEmitter, handler: configs.handlers.extremesHandler },
    highlight: { emitter: configs.emitters.highlightEmitter, handler: configs.handlers.highlightHandler },
    visibility: { emitter: configs.emitters.seriesVisibilityEmitter, handler: configs.handlers.seriesVisibilityHandler }
};
export default defaults;
