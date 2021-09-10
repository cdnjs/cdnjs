(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('chart.js/auto')) :
    typeof define === 'function' && define.amd ? define('primeng/chart', ['exports', '@angular/core', '@angular/common', 'chart.js/auto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.chart = {}), global.ng.core, global.ng.common, global.Chart));
}(this, (function (exports, i0, common, Chart) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Chart__default = /*#__PURE__*/_interopDefaultLegacy(Chart);

    var UIChart = /** @class */ (function () {
        function UIChart(el) {
            this.el = el;
            this.plugins = [];
            this.responsive = true;
            this.onDataSelect = new i0.EventEmitter();
            this._options = {};
        }
        Object.defineProperty(UIChart.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this._data = val;
                this.reinit();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UIChart.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (val) {
                this._options = val;
                this.reinit();
            },
            enumerable: false,
            configurable: true
        });
        UIChart.prototype.ngAfterViewInit = function () {
            this.initChart();
            this.initialized = true;
        };
        UIChart.prototype.onCanvasClick = function (event) {
            if (this.chart) {
                var element = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
                var dataset = this.chart.getElementsAtEventForMode(event, 'dataset', { intersect: true }, false);
                if (element && element[0] && dataset) {
                    this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
                }
            }
        };
        UIChart.prototype.initChart = function () {
            var opts = this.options || {};
            opts.responsive = this.responsive;
            // allows chart to resize in responsive mode
            if (opts.responsive && (this.height || this.width)) {
                opts.maintainAspectRatio = false;
            }
            this.chart = new Chart__default['default'](this.el.nativeElement.children[0].children[0], {
                type: this.type,
                data: this.data,
                options: this.options
            });
        };
        UIChart.prototype.getCanvas = function () {
            return this.el.nativeElement.children[0].children[0];
        };
        UIChart.prototype.getBase64Image = function () {
            return this.chart.toBase64Image();
        };
        UIChart.prototype.generateLegend = function () {
            if (this.chart) {
                return this.chart.generateLegend();
            }
        };
        UIChart.prototype.refresh = function () {
            if (this.chart) {
                this.chart.update();
            }
        };
        UIChart.prototype.reinit = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initChart();
            }
        };
        UIChart.prototype.ngOnDestroy = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initialized = false;
                this.chart = null;
            }
        };
        return UIChart;
    }());
    UIChart.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: UIChart, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    UIChart.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: UIChart, selector: "p-chart", inputs: { type: "type", plugins: "plugins", width: "width", height: "height", responsive: "responsive", data: "data", options: "options" }, outputs: { onDataSelect: "onDataSelect" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\n            <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    ", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: UIChart, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-chart',
                        template: "\n        <div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\n            <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { type: [{
                    type: i0.Input
                }], plugins: [{
                    type: i0.Input
                }], width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], responsive: [{
                    type: i0.Input
                }], onDataSelect: [{
                    type: i0.Output
                }], data: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }] } });
    var ChartModule = /** @class */ (function () {
        function ChartModule() {
        }
        return ChartModule;
    }());
    ChartModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChartModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ChartModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChartModule, declarations: [UIChart], imports: [common.CommonModule], exports: [UIChart] });
    ChartModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChartModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ChartModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [UIChart],
                        declarations: [UIChart]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ChartModule = ChartModule;
    exports.UIChart = UIChart;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chart.umd.js.map
