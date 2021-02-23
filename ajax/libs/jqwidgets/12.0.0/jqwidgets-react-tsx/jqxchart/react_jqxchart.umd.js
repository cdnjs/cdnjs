require('../../jqwidgets/jqxcore');
require('../../jqwidgets/jqxdata');
require('../../jqwidgets/jqxdata.export');
require('../../jqwidgets/jqxdraw');
require('../../jqwidgets/jqxchart.core');
require('../../jqwidgets/jqxchart.api');
require('../../jqwidgets/jqxchart.annotations');
require('../../jqwidgets/jqxchart.rangeselector');
require('../../jqwidgets/jqxchart.waterfall');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (factory((global.react_jqxchart = {}),global.React));
}(this, (function (exports,React) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var JqxChart = /** @class */ (function (_super) {
        __extends(JqxChart, _super);
        function JqxChart(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:disable:variable-name */
            _this._jqx = JQXLite;
            _this._id = 'JqxChart' + _this._jqx.generateID();
            _this._componentSelector = '#' + _this._id;
            _this.state = { lastProps: props };
            return _this;
        }
        JqxChart.getDerivedStateFromProps = function (props, state) {
            if (!Object.is) {
                Object.is = function (x, y) {
                    if (x === y) {
                        return x !== 0 || 1 / x === 1 / y;
                    }
                    else {
                        return x !== x && y !== y;
                    }
                };
            }
            var areEqual = Object.is(props, state.lastProps);
            if (!areEqual) {
                var newState = { lastProps: props };
                return newState;
            }
            return null;
        };
        JqxChart.prototype.componentDidMount = function () {
            var widgetOptions = this._manageProps();
            this._jqx(this._componentSelector).jqxChart(widgetOptions);
            this._wireEvents();
        };
        JqxChart.prototype.componentDidUpdate = function () {
            var widgetOptions = this._manageProps();
            this.setOptions(widgetOptions);
            this._wireEvents();
        };
        JqxChart.prototype.render = function () {
            return (React.createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
        };
        JqxChart.prototype.setOptions = function (options) {
            this._jqx(this._componentSelector).jqxChart(options);
        };
        JqxChart.prototype.getOptions = function (option) {
            return this._jqx(this._componentSelector).jqxChart(option);
        };
        JqxChart.prototype.getInstance = function () {
            return this._jqx(this._componentSelector).jqxChart('getInstance');
        };
        JqxChart.prototype.refresh = function () {
            this._jqx(this._componentSelector).jqxChart('refresh');
        };
        JqxChart.prototype.update = function () {
            this._jqx(this._componentSelector).jqxChart('update');
        };
        JqxChart.prototype.destroy = function () {
            this._jqx(this._componentSelector).jqxChart('destroy');
        };
        JqxChart.prototype.addColorScheme = function (schemeName, colors) {
            this._jqx(this._componentSelector).jqxChart('addColorScheme', schemeName, colors);
        };
        JqxChart.prototype.removeColorScheme = function (schemeName) {
            this._jqx(this._componentSelector).jqxChart('removeColorScheme', schemeName);
        };
        JqxChart.prototype.getItemsCount = function (groupIndex, serieIndex) {
            return this._jqx(this._componentSelector).jqxChart('getItemsCount', groupIndex, serieIndex);
        };
        JqxChart.prototype.getItemCoord = function (groupIndex, serieIndex, itemIndex) {
            return this._jqx(this._componentSelector).jqxChart('getItemCoord', groupIndex, serieIndex, itemIndex);
        };
        JqxChart.prototype.getXAxisRect = function (groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getXAxisRect', groupIndex);
        };
        JqxChart.prototype.getXAxisLabels = function (groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getXAxisLabels', groupIndex);
        };
        JqxChart.prototype.getValueAxisRect = function (groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getValueAxisRect', groupIndex);
        };
        JqxChart.prototype.getValueAxisLabels = function (groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getValueAxisLabels', groupIndex);
        };
        JqxChart.prototype.getColorScheme = function (colorScheme) {
            return this._jqx(this._componentSelector).jqxChart('getColorScheme', colorScheme);
        };
        JqxChart.prototype.hideSerie = function (groupIndex, serieIndex, itemIndex) {
            this._jqx(this._componentSelector).jqxChart('hideSerie', groupIndex, serieIndex, itemIndex);
        };
        JqxChart.prototype.showSerie = function (groupIndex, serieIndex, itemIndex) {
            this._jqx(this._componentSelector).jqxChart('showSerie', groupIndex, serieIndex, itemIndex);
        };
        JqxChart.prototype.hideToolTip = function (hideDelay) {
            this._jqx(this._componentSelector).jqxChart('hideToolTip', hideDelay);
        };
        JqxChart.prototype.showToolTip = function (groupIndex, serieIndex, itemIndex, showDelay, hideDelay) {
            this._jqx(this._componentSelector).jqxChart('showToolTip', groupIndex, serieIndex, itemIndex, showDelay, hideDelay);
        };
        JqxChart.prototype.saveAsJPEG = function (fileName, exportServerUrl) {
            this._jqx(this._componentSelector).jqxChart('saveAsJPEG', fileName, exportServerUrl);
        };
        JqxChart.prototype.saveAsPNG = function (fileName, exportServerUrl) {
            this._jqx(this._componentSelector).jqxChart('saveAsPNG', fileName, exportServerUrl);
        };
        JqxChart.prototype.saveAsPDF = function (fileName, exportServerUrl) {
            this._jqx(this._componentSelector).jqxChart('saveAsPDF', fileName, exportServerUrl);
        };
        JqxChart.prototype.getXAxisValue = function (offset, groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getXAxisValue', offset, groupIndex);
        };
        JqxChart.prototype.getValueAxisValue = function (offset, groupIndex) {
            return this._jqx(this._componentSelector).jqxChart('getValueAxisValue', offset, groupIndex);
        };
        JqxChart.prototype._manageProps = function () {
            var widgetProps = ['title', 'description', 'source', 'showBorderLine', 'borderLineColor', 'borderLineWidth', 'backgroundColor', 'backgroundImage', 'showLegend', 'legendLayout', 'padding', 'titlePadding', 'colorScheme', 'greyScale', 'showToolTips', 'toolTipShowDelay', 'toolTipHideDelay', 'toolTipMoveDuration', 'drawBefore', 'draw', 'rtl', 'enableCrosshairs', 'crosshairsColor', 'crosshairsDashStyle', 'crosshairsLineWidth', 'columnSeriesOverlap', 'enabled', 'enableAnimations', 'animationDuration', 'enableAxisTextAnimation', 'renderEngine', 'xAxis', 'valueAxis', 'categoryAxis', 'seriesGroups'];
            var options = {};
            for (var prop in this.props) {
                if (widgetProps.indexOf(prop) !== -1) {
                    options[prop] = this.props[prop];
                }
            }
            return options;
        };
        JqxChart.prototype._wireEvents = function () {
            for (var prop in this.props) {
                if (prop.indexOf('on') === 0) {
                    var originalEventName = prop.slice(2);
                    originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                    this._jqx(this._componentSelector).off(originalEventName);
                    this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
                }
            }
        };
        return JqxChart;
    }(React.PureComponent));
    var jqx = window.jqx;
    var JQXLite = window.JQXLite;

    exports.default = JqxChart;
    exports.jqx = jqx;
    exports.JQXLite = JQXLite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
